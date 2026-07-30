# ForMai

**ForMai** is a **privacy-first AI assistant** that helps users fill out web forms by suggesting realistic values for input fields. The AI suggestions are **temporary and display-only**, giving the user full control over their input.  

---

## **Features**

- Detects any input or textarea field on a webpage
- Suggests realistic values using **Google Gemini AI**
- Suggestions appear **on click** and disappear when clicked again
- Works on **dynamic websites** (React, Angular, etc.)
- **Privacy-first**:  
  - No login required  
  - No email or personal data stored  
  - Suggestions exist only in the current browser session
- Smooth overlay with fade-in animation
- Floating “AI ON” badge indicates active status
- Optional **enable/disable toggle** in popup

---

## **Installation (for Chrome / Edge)**

1. Download or clone the `ForMai` folder
2. Open `chrome://extensions/` in your browser
3. Enable **Developer mode** (top-right corner)
4. Click **Load unpacked**
5. Select the `ForMai` folder
6. The extension will now appear in your toolbar

---

## **Usage**

1. Navigate to any form (sign-up, contact, feedback, etc.)
2. Click on any input field
3. **AI suggestion** appears above the field
4. Click again to remove the suggestion
5. Toggle the extension on/off via the popup

---

## **Demo**

**Suggested workflow for demo video or presentation:**

1. Open a form webpage
2. Click an input field → AI suggestion appears
3. Click the field again → suggestion disappears
4. Repeat for multiple fields
5. Highlight dynamic forms and privacy-first aspect
6. Show popup toggle (optional)

---

## **Folder Structure**
ForMai/
│
├─ manifest.json
├─ background.js
├─ content.js
├─ ai.js
├─ popup.html
├─ popup.js
├─ style.css
├─ icons/ (extension icons)
└─ README.md

---

## **Technology Stack**

- **JavaScript** (Vanilla)  
- **Chrome Extension API** (Manifest v3)  
- **Google Gemini AI** for generating form suggestions  
- **MutationObserver** for dynamic forms  
- **HTML/CSS** for popup and overlay UI

---

## **Privacy & Security**

- No personal data is sent or stored permanently
- AI suggestions are generated **per session**
- Extension works without login or email
- Users remain fully in control of all form inputs

---

## **Notes for Judges / Reviewers**

- This extension demonstrates **AI-assisted UX** without violating privacy
- All suggestions are **human-in-control** (display-only)
- Works on multiple websites and dynamic forms
- Smooth, professional overlay UI and animations
