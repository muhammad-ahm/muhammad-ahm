
const SAFETY = [
    { category: "HARM_CATEGORY_HARASSMENT",        threshold: "BLOCK_MEDIUM_AND_ABOVE" },
    { category: "HARM_CATEGORY_HATE_SPEECH",        threshold: "BLOCK_MEDIUM_AND_ABOVE" },
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT",  threshold: "BLOCK_MEDIUM_AND_ABOVE" }
];

/**
 * Called when user clicks/focuses a form field.
 * Sends field context to background.js which calls Gemini and returns result.
 */
async function getFieldExplanation(ctx) {

    if (["hidden", "submit", "button", "reset", "image", "range", "color"].includes(ctx.type)) {
        return null;
    }

    const prompt = `You are an expert virtual assistant specialized in guiding users to fill form fields correctly.
The user is focusing on an input field in a web form.

Field Details:
- Field Label: ${ctx.label || "Unknown"}
- Field Name / ID: ${ctx.name || "Unknown"}
- Placeholder / Example: ${ctx.placeholder || "None"}
- Field Type: ${ctx.type || "text"} (text, email, number, password, dropdown, checkbox, date, etc.)
- Context: ${ctx.context || "General web form"}

Your task:
1. Explain in plain language what this field is for.
2. Provide clear instructions on how the user should fill it.
3. If applicable, give examples of valid inputs.
4. Keep your explanation concise, actionable, and user-friendly (2-4 sentences max).

Respond ONLY in this exact JSON format with no markdown, no code fences, no extra text:
{"field_purpose": "explanation here", "instructions": "how to fill it here"}`;

    // Wrap in a helper that retries once if service worker was sleeping
    return sendWithRetry({ type: "GEMINI_REQUEST", prompt })
        .then(res => {
            const raw = res.text || "";
            const cleaned = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
            try {
                const parsed = JSON.parse(cleaned);
                return {
                    field_purpose: parsed.field_purpose || parsed.purpose || raw,
                    instructions:  parsed.instructions  || parsed.how_to_fill || ""
                };
            } catch {
                return { field_purpose: raw, instructions: "" };
            }
        })
        .catch(err => {
            const msg = err?.message || "";
            if (msg === "CONTEXT_INVALID") {
                return { field_purpose: "ForMai was updated or reloaded.", instructions: "Please refresh this page (F5) to reconnect." };
            }
            if (msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED")) {
                return { field_purpose: "AI quota reached on all providers.", instructions: "Please wait a few minutes and try again." };
            }
            if (msg.includes("Receiving end") || msg.includes("channel closed")) {
                return { field_purpose: "ForMai is waking up.", instructions: "Please click the field one more time." };
            }
            return { field_purpose: "AI is temporarily unavailable.", instructions: "Please try again in a moment." };
        });
}

/**
 * Sends a message to background.js, retrying once if the service worker was sleeping.
 * MV3 service workers go inactive after ~30s — the first message may fail, retry wakes it.
 */
function sendWithRetry(message, retries = 1) {
    return new Promise((resolve, reject) => {

        // Always normalize any rejection to a proper Error object
        function fail(reason) {
            const e = reason instanceof Error ? reason : new Error(String(reason || "Unknown error"));
            reject(e);
        }

        // Check extension context is still alive
        try {
            if (!chrome.runtime?.id) { fail(new Error("CONTEXT_INVALID")); return; }
        } catch {
            fail(new Error("CONTEXT_INVALID")); return;
        }

        chrome.runtime.sendMessage(message, (res) => {
            if (chrome.runtime.lastError) {
                const errMsg = chrome.runtime.lastError.message || "";

                if (errMsg.includes("Extension context invalidated") || errMsg.includes("context invalidated")) {
                    fail(new Error("CONTEXT_INVALID")); return;
                }

                if (retries > 0 && errMsg.includes("Receiving end does not exist")) {
                    // Service worker was sleeping — wait 300ms and retry once
                    setTimeout(() => {
                        sendWithRetry(message, retries - 1).then(resolve).catch(fail);
                    }, 300);
                    return;
                }

                fail(new Error(errMsg)); return;
            }

            if (!res || res.error) {
                fail(new Error(res?.error || "Empty response from background")); return;
            }

            resolve(res);
        });
    });
}

/**
 * Multimodal — analyze a snipped area via vision.
 * Also routes through background.js.
 */
async function analyzeSnippedForm(base64Image) {
    // Build a prompt using the page title and URL as context
    // OpenRouter is text-only — we give it real page context instead of image data
    const pageTitle = document.title || "Unknown page";
    const pageUrl   = window.location.hostname || "Unknown site";

    const prompt = `You are a form assistant helping a user fill out a web form on "${pageTitle}" (${pageUrl}).

Based on the page context, identify the form fields likely visible and explain each one:
- What the field is asking for
- How to fill it correctly  
- A valid example input

Be specific to this website. Format as a simple list, one entry per field. Do not ask for any image or file — just answer directly based on the page context.`;

    return sendWithRetry({ type: "GEMINI_VISION_REQUEST", prompt, base64Image })
        .then(res => res.text || "Could not analyze the form area.")
        .catch(err => "Snip analysis failed: " + (err?.message || String(err)));
}
