
async function explainField(fieldName) {

    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            field: fieldName
        })
    });

    const data = await res.json();

    console.log(data.message);
}

// content.js — ForMai Content Script
// Input modes: click on field OR snip an area of the page

let activeSuggestion = null;
let activeField = null;
let isExtensionActive = true;
let isSnipMode = false;
let snipOverlay = null;
let snipStart = null;

// ── Quota savers ──────────────────────────────────────────────
// Cache: fieldKey → {field_purpose, instructions} — never calls API twice for same field
const fieldCache = new Map();
// Debounce: only call Gemini if user stays on a field for 600ms
let debounceTimer = null;
// Request lock: prevents multiple simultaneous API calls
// Only one call can be in-flight at a time — new field focus cancels the previous
let requestInFlight = false;
let requestToken = 0; // increments each time — stale responses are ignored

// ── State sync ────────────────────────────────────────────────
chrome.runtime.sendMessage({ type: "GET_STATE" }, (res) => {
    if (res) isExtensionActive = res.active;
});

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "STATE_CHANGED") {
        isExtensionActive = msg.active;
        if (!isExtensionActive) { removeSuggestion(); stopSnip(); }
    }
    if (msg.type === "START_SNIP") {
        startSnipMode();
    }
});

// ── Inject styles (once) ──────────────────────────────────────
function injectStyles() {
    if (document.getElementById("formai-styles")) return;
    const s = document.createElement("style");
    s.id = "formai-styles";
    s.textContent = `
        .formai-box {
            position: absolute;
            max-width: 310px; min-width: 220px;
            background: #0D1420;
            border: 1.5px solid #3DA9FF;
            border-radius: 12px;
            color: #EAF2FF;
            font-family: 'Segoe UI', system-ui, sans-serif;
            font-size: 13px; line-height: 1.55;
            box-shadow: 0 8px 28px rgba(0,100,220,0.25);
            z-index: 2147483647;
            opacity: 0; transform: translateY(-6px) scale(0.97);
            transition: opacity .18s ease, transform .18s ease;
        }
        .formai-box.show { opacity: 1; transform: none; }
        .formai-head {
            display: flex; align-items: center; justify-content: space-between;
            padding: 8px 12px 6px;
            border-bottom: 1px solid rgba(61,169,255,.2);
        }
        .formai-logo { font-weight:700; font-size:12px; color:#3DA9FF; letter-spacing:.03em; }
        .formai-close {
            background:none; border:none; color:#6a8aaa; cursor:pointer;
            font-size:14px; padding:0 2px; line-height:1; transition:color .15s;
        }
        .formai-close:hover { color:#EAF2FF; }
        .formai-body { padding: 10px 12px 13px; word-break: break-word; }
        .formai-section { margin-bottom: 9px; }
        .formai-section:last-child { margin-bottom: 0; }
        .formai-section-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: #3DA9FF; margin-bottom: 3px; }
        .formai-section-text { font-size: 13px; line-height: 1.55; color: #EAF2FF; }
        .formai-loading { display:flex; align-items:center; gap:8px; color:#6a8aaa; font-style:italic; }
        .formai-spinner {
            width:14px; height:14px; flex-shrink:0;
            border:2px solid rgba(61,169,255,.3); border-top-color:#3DA9FF;
            border-radius:50%; animation: fmspin .7s linear infinite;
        }
        @keyframes fmspin { to { transform:rotate(360deg); } }

        /* ── Snip overlay ── */
        #formai-snip-overlay {
            position: fixed; inset:0; z-index:2147483646;
            cursor: crosshair;
            background: rgba(0,0,0,.35);
        }
        #formai-snip-rect {
            position: fixed; border: 2px dashed #3DA9FF;
            background: rgba(61,169,255,.08);
            pointer-events: none; z-index: 2147483647;
        }
        #formai-snip-hint {
            position: fixed; top: 16px; left: 50%; transform:translateX(-50%);
            background: #0D1420; border: 1.5px solid #3DA9FF;
            color: #EAF2FF; font-family: 'Segoe UI', system-ui, sans-serif;
            font-size: 13px; padding: 8px 20px; border-radius: 30px;
            z-index: 2147483648; pointer-events:none;
            box-shadow: 0 4px 16px rgba(0,100,220,.3);
        }
    `;
    document.head.appendChild(s);
}

// ── Field click mode ──────────────────────────────────────────
document.addEventListener("focusin", (e) => {
    if (!isExtensionActive || isSnipMode) return;
    const t = e.target;
    if (!(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement)) return;
    if (["hidden", "submit", "button", "reset", "image", "range", "color"].includes(t.type)) return;

    clearTimeout(debounceTimer);
    removeSuggestion();
    activeField = t;

    // Increment token — any in-flight request with an old token will be discarded
    requestToken++;

    // Check cache first — show instantly with zero API calls
    const key = getFieldKey(t);
    if (fieldCache.has(key)) {
        showFieldSuggestion(t, fieldCache.get(key), requestToken);
        return;
    }

    if (target.tagName === "INPUT") {

        explainField(target.name || "form field");

    }

    // Debounce 600ms — only fires if user stays on this field
    const myToken = requestToken;
    debounceTimer = setTimeout(() => {
        // If another field was focused during the wait, token won't match — skip
        if (myToken !== requestToken) return;
        // If a request is already running, skip — don't stack calls
        if (requestInFlight) return;
        showFieldSuggestion(t, null, myToken);
    }, 600);
});

document.addEventListener("focusout", () => {
    clearTimeout(debounceTimer);
    if (!activeField) return;
    setTimeout(() => {
        if (activeSuggestion && activeField && !activeSuggestion.contains(document.activeElement)) {
            removeSuggestion();
        }
    }, 150);
});

window.addEventListener("scroll", () => {
    if (activeSuggestion && activeField) positionBox(activeSuggestion, activeField);
}, { passive: true });

async function showFieldSuggestion(field, cachedResult, token) {
    injectStyles();
    const box = cachedResult ? createBox(null) : createBox();
    positionBox(box, field);
    document.body.appendChild(box);
    activeSuggestion = box;
    requestAnimationFrame(() => box.classList.add("show"));

    let result = cachedResult;

    if (!result) {
        // Lock — block any other field from firing a call while this one runs
        requestInFlight = true;
        try {
            const ctx = getFieldContext(field);
            ctx.context = document.title ? `Page: ${document.title}` : "General web form";
            result = await getFieldExplanation(ctx);
        } finally {
            requestInFlight = false; // always unlock even if call fails
        }

        // Discard if user moved to a different field while waiting
        if (token !== requestToken) { removeSuggestion(); return; }

        // Cache result so this field never calls API again this session
        if (result) fieldCache.set(getFieldKey(field), result);
    }

    if (activeSuggestion !== box) return;
    if (result === null) { removeSuggestion(); return; }

    const body = box.querySelector(".formai-body");
    body.className = "formai-body";
    body.innerHTML = `
        <div class="formai-section">
            <div class="formai-section-label">What this field is for</div>
            <div class="formai-section-text">${escapeHtml(result.field_purpose)}</div>
        </div>
        <div class="formai-section">
            <div class="formai-section-label">How to fill it</div>
            <div class="formai-section-text">${escapeHtml(result.instructions)}</div>
        </div>
    `;
    positionBox(box, field);
}

// Unique key for a field — used for cache lookup
function getFieldKey(f) {
    return [f.type, f.name, f.id, f.placeholder].join("|");
}

function escapeHtml(str) {
    return (str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ── Snip mode ─────────────────────────────────────────────────
function startSnipMode() {
    if (isSnipMode) return;
    isSnipMode = true;
    removeSuggestion();
    injectStyles();

    snipOverlay = document.createElement("div");
    snipOverlay.id = "formai-snip-overlay";

    const rect = document.createElement("div");
    rect.id = "formai-snip-rect";

    const hint = document.createElement("div");
    hint.id = "formai-snip-hint";
    hint.textContent = "ForMai — Drag to select a form area. Press Esc to cancel.";

    document.body.appendChild(snipOverlay);
    document.body.appendChild(rect);
    document.body.appendChild(hint);

    snipOverlay.addEventListener("mousedown", onSnipDown);
    document.addEventListener("keydown", onSnipEsc);
}

function stopSnip() {
    isSnipMode = false;
    snipStart = null;
    document.getElementById("formai-snip-overlay")?.remove();
    document.getElementById("formai-snip-rect")?.remove();
    document.getElementById("formai-snip-hint")?.remove();
    document.removeEventListener("mousemove", onSnipMove);
    document.removeEventListener("mouseup", onSnipUp);
    document.removeEventListener("keydown", onSnipEsc);
}

function onSnipEsc(e) { if (e.key === "Escape") stopSnip(); }

function onSnipDown(e) {
    e.preventDefault();
    snipStart = { x: e.clientX, y: e.clientY };
    document.addEventListener("mousemove", onSnipMove);
    document.addEventListener("mouseup", onSnipUp);
}

function onSnipMove(e) {
    if (!snipStart) return;
    const r = document.getElementById("formai-snip-rect");
    if (!r) return;
    const x = Math.min(e.clientX, snipStart.x);
    const y = Math.min(e.clientY, snipStart.y);
    const w = Math.abs(e.clientX - snipStart.x);
    const h = Math.abs(e.clientY - snipStart.y);
    r.style.cssText += `left:${x}px;top:${y}px;width:${w}px;height:${h}px;`;
}

async function onSnipUp(e) {
    if (!snipStart) return;
    document.removeEventListener("mousemove", onSnipMove);
    document.removeEventListener("mouseup", onSnipUp);

    const x1 = Math.min(e.clientX, snipStart.x);
    const y1 = Math.min(e.clientY, snipStart.y);
    const w = Math.abs(e.clientX - snipStart.x);
    const h = Math.abs(e.clientY - snipStart.y);
    stopSnip();

    if (w < 20 || h < 20) return; // too small

    // Capture via chrome.tabs.captureVisibleTab message
    const base64 = await captureRegion(x1, y1, w, h);
    if (!base64) return;

    showSnipResult(base64, x1, y1, w);
}

async function captureRegion(x, y, w, h) {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ type: "CAPTURE_TAB" }, async (res) => {
            if (!res?.dataUrl) { resolve(null); return; }
            try {
                const dpr = window.devicePixelRatio || 1;
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = w * dpr;
                    canvas.height = h * dpr;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, x * dpr, y * dpr, w * dpr, h * dpr, 0, 0, w * dpr, h * dpr);
                    const cropped = canvas.toDataURL("image/png").split(",")[1];
                    resolve(cropped);
                };
                img.onerror = () => resolve(null);
                img.src = res.dataUrl;
            } catch {
                resolve(null);
            }
        });
    });
}

async function showSnipResult(base64Image, x, y, w) {
    injectStyles();
    const box = createBox("Analyzing form area...");
    box.style.position = "fixed";
    box.style.top = Math.max(8, y - 10) + "px";
    box.style.left = Math.min(x + w + 12, window.innerWidth - 330) + "px";
    document.body.appendChild(box);
    activeSuggestion = box;
    // activeField stays null for snip boxes — prevents focusout from killing them
    activeField = null;
    requestAnimationFrame(() => box.classList.add("show"));

    const text = await analyzeSnippedForm(base64Image);
    // Don't check activeSuggestion here — snip box should always show result
    const body = box.querySelector(".formai-body");
    body.className = "formai-body";
    body.textContent = text || "Could not analyze the selected area.";
}

// ── Helpers ───────────────────────────────────────────────────
function createBox(loadingText = "Analyzing field...") {
    const box = document.createElement("div");
    box.className = "formai-box";
    // loadingText=null means instant render (cached) — skip spinner entirely
    const bodyContent = loadingText === null
        ? `<div class="formai-body"></div>`
        : `<div class="formai-body formai-loading"><div class="formai-spinner"></div><span>${loadingText}</span></div>`;
    box.innerHTML = `
        <div class="formai-head">
            <span class="formai-logo">ForMai</span>
            <button class="formai-close" title="Close">✕</button>
        </div>
        ${bodyContent}
    `;
    box.querySelector(".formai-close").addEventListener("click", (e) => {
        e.stopPropagation();
        removeSuggestion();
    });
    return box;
}

function removeSuggestion() {
    if (!activeSuggestion) return;
    activeSuggestion.style.opacity = "0";
    activeSuggestion.style.transform = "translateY(-6px) scale(0.97)";
    const ref = activeSuggestion;
    setTimeout(() => ref.remove(), 190);
    activeSuggestion = null;
    activeField = null;
}

function positionBox(box, field) {
    const rect = field.getBoundingClientRect();
    const center = window.innerWidth / 2;
    const bw = 318;
    let left, top;
    top = window.scrollY + rect.top;
    left = rect.left > center
        ? window.scrollX + rect.left - bw - 12
        : window.scrollX + rect.right + 12;
    left = Math.max(window.scrollX + 8, Math.min(left, window.scrollX + window.innerWidth - bw - 8));
    box.style.top = top + "px";
    box.style.left = left + "px";
}

function getFieldContext(f) {
    let label = "";
    if (f.id) {
        const el = document.querySelector(`label[for="${CSS.escape(f.id)}"]`);
        if (el) label = el.innerText.trim();
    }
    if (!label) {
        const p = f.closest("label");
        if (p) { const c = p.cloneNode(true); c.querySelectorAll("input,textarea,select").forEach(e => e.remove()); label = c.innerText.trim(); }
    }
    if (!label) {
        const id = f.getAttribute("aria-labelledby");
        if (id) { const el = document.getElementById(id); if (el) label = el.innerText.trim(); }
    }
    const aria = f.getAttribute("aria-label") || "";
    const ph = f.placeholder || "";
    const name = f.name || "";
    if (!label && !ph) {
        if (/user|username|login/i.test(name)) label = "Username";
        else if (/email/i.test(name)) label = "Email Address";
        else if (/phone|tel/i.test(name)) label = "Phone Number";
        else if (/first.?name/i.test(name)) label = "First Name";
        else if (/last.?name/i.test(name)) label = "Last Name";
        else if (/address/i.test(name)) label = "Address";
        else if (/city/i.test(name)) label = "City";
        else if (/zip|postal/i.test(name)) label = "ZIP / Postal Code";
        else if (/dob|birth/i.test(name)) label = "Date of Birth";
    }
    return { label, placeholder: ph, name, aria, type: f.type || "text" };
}

// ── MutationObserver — dynamic forms (React/Angular/Vue) ──────
new MutationObserver(() => { /* focusin listener covers new inputs automatically */ })
    .observe(document.body, { childList: true, subtree: true });
