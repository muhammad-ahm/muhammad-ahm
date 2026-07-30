
const checkbox   = document.getElementById("toggle-checkbox");
const statusLbl  = document.getElementById("status-label");
const snipBtn    = document.getElementById("snip-btn");
const pageLink   = document.getElementById("page-link");

chrome.runtime.sendMessage({ type: "GET_STATE" }, (res) => {
    const active = res ? res.active : true;
    checkbox.checked = active;
    setStatus(active);
});

checkbox.addEventListener("change", () => {
    const active = checkbox.checked;
    setStatus(active);
    chrome.runtime.sendMessage({ type: "SET_STATE", active });
});

function setStatus(active) {
    statusLbl.textContent = active ? "Active" : "Paused";
    statusLbl.className   = "status-label " + (active ? "status-active" : "status-paused");
    snipBtn.disabled      = !active;
    snipBtn.style.opacity = active ? "1" : "0.45";
}

snipBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "TRIGGER_SNIP" });
    window.close(); // close popup so user can draw the selection
});

pageLink.addEventListener("click", (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: chrome.runtime.getURL("page.html") });
});
