

// const GEMINI_API_KEY = "Your API key here";
// const GEMINI_MODEL   = "gemini-2.0-flash";
// const GEMINI_URL     = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// ── AICC config (field clicks) ────────────────────────────────
const AICC_API_KEY = "sk-M9...";        // your AICC key
const AICC_MODEL   = "gemini-2.0-flash";
const AICC_URL     = "https://api.aiccio.com/v1/chat/completions";

// ── Gemini config (commented out — keep as backup) ────────────
// const GEMINI_API_KEY = "YOUR_GEMINI_KEY_HERE";
// const GEMINI_MODEL   = "gemini-2.0-flash";
// const GEMINI_URL     = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
// const GEMINI_SAFETY  = [
//     { category: "HARM_CATEGORY_HARASSMENT",       threshold: "BLOCK_MEDIUM_AND_ABOVE" },
//     { category: "HARM_CATEGORY_HATE_SPEECH",       threshold: "BLOCK_MEDIUM_AND_ABOVE" },
//     { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
// ];

// ── OpenRouter config (snip mode) ─────────────────────────────
const OPENROUTER_API_KEY = "sk-or-v1-09..."; // your OpenRouter key
const OPENROUTER_MODEL   = "openrouter/auto";
const OPENROUTER_URL     = "https://openrouter.ai/api/v1/chat/completions";

// ── Keep service worker alive ─────────────────────────────────
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ formai_active: true });
    setupKeepAlive();
});

chrome.runtime.onStartup.addListener(() => {
    setupKeepAlive();
});

function setupKeepAlive() {
    chrome.alarms.get("formai-keepalive", (alarm) => {
        if (!alarm) {
            chrome.alarms.create("formai-keepalive", { periodInMinutes: 0.4 });
        }
    });
}

chrome.alarms.onAlarm.addListener(() => {
    // Keeps service worker awake — no action needed
});

// ── Message handler ───────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg, sender, respond) => {

    if (msg.type === "GET_STATE") {
        chrome.storage.local.get("formai_active", (d) => {
            respond({ active: d.formai_active !== false });
        });
        return true;
    }

    if (msg.type === "SET_STATE") {
        chrome.storage.local.set({ formai_active: msg.active }, () => {
            chrome.tabs.query({}, (tabs) => {
                tabs.forEach(t =>
                    chrome.tabs.sendMessage(t.id, { type: "STATE_CHANGED", active: msg.active }).catch(() => {})
                );
            });
            respond({ success: true });
        });
        return true;
    }

    if (msg.type === "TRIGGER_SNIP") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, { type: "START_SNIP" }).catch(() => {});
            }
        });
        return false;
    }

    if (msg.type === "CAPTURE_TAB") {
        chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
            respond({ dataUrl: dataUrl || null });
        });
        return true;
    }

    // ── Field click — AICC API ────────────────────────────────
    if (msg.type === "GEMINI_REQUEST") {
        callAICC(msg.prompt)
            .then(text => respond({ text }))
            .catch(err => respond({ error: err.message }));
        return true;
    }

    // ── Snip mode — OpenRouter ────────────────────────────────
    if (msg.type === "GEMINI_VISION_REQUEST") {
        callOpenRouter(msg.prompt)
            .then(text => respond({ text }))
            .catch(err => respond({ error: err.message }));
        return true;
    }

});

// ── AICC API call (field clicks) ──────────────────────────────
async function callAICC(prompt) {
    const response = await fetch(AICC_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${AICC_API_KEY}`
        },
        body: JSON.stringify({
            model: AICC_MODEL,
            messages: [{ role: "user", content: prompt }]
        })
    });

    if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`AICC API ${response.status}: ${errBody}`);
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) throw new Error("Empty response from AICC");
    return text;
}

// ── Gemini API call (commented out — restore if needed) ───────
// async function callGemini(parts) {
//     const response = await fetch(GEMINI_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             contents: [{ parts }],
//             generationConfig: { temperature: 0.4, maxOutputTokens: 1200 },
//             safetySettings: GEMINI_SAFETY
//         })
//     });
//     if (!response.ok) {
//         const errBody = await response.text();
//         throw new Error(`Gemini API ${response.status}: ${errBody}`);
//     }
//     const data = await response.json();
//     const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
//     if (!text) throw new Error("Empty response from Gemini");
//     return text;
// }

// ── OpenRouter API call (snip mode) ───────────────────────────
async function callOpenRouter(prompt) {
    const response = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "HTTP-Referer": "chrome-extension://formai",
            "X-Title": "ForMai"
        },
        body: JSON.stringify({
            model: OPENROUTER_MODEL,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.4,
            max_tokens: 1200
        })
    });

    if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`OpenRouter API ${response.status}: ${errBody}`);
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) throw new Error("Empty response from OpenRouter");
    return text;
}
