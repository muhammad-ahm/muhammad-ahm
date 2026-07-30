# ForMai – AI-Powered Form Understanding Tool

**ForMai** helps people clearly understand any online form — whether by pasting a question or uploading a screenshot.  
It explains **what** is being asked, **why** it's asked, **what kind of answer** is expected, and **common mistakes** to avoid — **without ever writing answers for the user**.

## Features

- Two input methods:
  - Paste any form question, label or paragraph (text mode)
  - Upload or drag & drop a screenshot of the form (image mode)
- Structured, consistent explanations with the following sections:
  - What this form / question is asking
  - Why organizations usually ask this
  - Expected type of answer
  - Tips for answering thoughtfully
  - Things to watch out for / common mistakes
- Multimodal AI analysis (text + images)
- Clean, modern UI with dark theme support
- Responsive design (mobile-friendly)
- Loading states, error handling & user-friendly toasts
- Strictly educational — no form-filling, no personal advice

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **UI Library**: Radix UI primitives, Lucide icons
- **Animations**: Framer Motion
- **Notifications**: Sonner
- **Routing**: React Router
- **AI**: Google Gemini API (multimodal – text + image support)

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm / yarn / pnpm

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/formai.git
cd formai

npm install
# or
yarn install
# or
pnpm install

VITE_GEMINI_API_KEY=your-gemini-api-key-here

npm run dev
# or
yarn dev
# or
pnpm dev

// Fast & strong – recommended
`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`

// Strongest reasoning
`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent?key=${apiKey}`

├── src/
│   ├── pages/
│   │   └── Index.tsx           # Main page with UI + Gemini logic
│   ├── components/
│   │   └── ui/                 # shadcn/ui components
│   ├── lib/
│   │   └── utils.ts            # cn helper & other utilities
│   └── main.tsx
├── .env                        # Your Gemini API key goes here
├── vite.config.ts
├── tailwind.config.ts
├── package.json
└── README.md

Future Ideas

Add result copy button
Improve markdown rendering (react-markdown)
Add example questions / demo screenshots
History of previous analyses
Language selection
Rate limit handling & user feedback