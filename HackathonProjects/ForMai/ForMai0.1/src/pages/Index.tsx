import { useState, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Camera, Zap, Send, Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Tab = "text" | "screenshot";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass">
    <div className="container mx-auto flex items-center justify-between px-6 py-4">
      <Link to="/" className="flex items-center gap-2">
        <span className="gradient-text font-extrabold text-2xl" style={{ fontFamily: 'sans-serif' }}>
          ForMai
        </span>
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Home
        </Link>
        <a
          href="#app-section"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors glow-blue"
        >
          Try It Free
        </a>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
    <div className="absolute inset-0">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
    </div>

    <div className="container relative z-10 mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs text-muted-foreground">
          <Zap className="h-3 w-3 text-primary" />
          AI-Powered Form Understanding
        </div>

        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          Understand Any
          <br />
          <span className="gradient-text">Online Form</span>
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground leading-relaxed">
          Paste a form question or upload a screenshot. ForMai explains what's being asked,
          what's expected, and how to approach it — without writing answers for you.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#app-section"
            onClick={() => window.history.replaceState(null, '', '/?tab=text#app-section')}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-semibold text-primary-foreground transition-all hover:bg-primary/90 glow-blue"
          >
            <FileText className="h-4 w-4" />
            Explain a Question
          </a>
          <a
            href="#app-section"
            onClick={() => window.history.replaceState(null, '', '/?tab=screenshot#app-section')}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-8 py-3.5 font-semibold text-secondary-foreground transition-all hover:bg-secondary"
          >
            <Camera className="h-4 w-4" />
            Analyze a Screenshot
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const SYSTEM_PROMPT = `
You are ForMai — an AI assistant that helps people understand online forms clearly and safely.

Your ONLY job is to EXPLAIN forms — never suggest or write personal answers, never give legal/financial/medical advice, never fill in data for the user.

Rules:
- Be neutral, factual, educational
- Never assume or guess personal information
- Never give instructions that could be interpreted as filling the form
- Focus on: meaning of questions, why asked, expected format/style, common pitfalls
- Use clear, simple language
- Structure your answer with these exact headings:

## What this form / question is asking
## Why organizations usually ask this
## Expected type of answer
## Tips for answering thoughtfully
## Things to watch out for / common mistakes

If it's a screenshot:
- Briefly describe visible fields and layout
- Identify the likely type of form (job application, registration, survey, visa, etc.)
- Point out required vs optional fields if visible
- Note any unusual or potentially sensitive questions

Keep answers concise, focused, and helpful. Maximum 400–600 words.
`.trim();

const AppSection = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "screenshot" ? "screenshot" : "text";
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [textInput, setTextInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "text" || tab === "screenshot") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    const dropArea = dropRef.current;
    if (!dropArea || activeTab !== "screenshot" || imagePreview) return;

    const preventDefaults = (e: DragEvent) => { e.preventDefault(); e.stopPropagation(); };
    const handleDragEnter = (e: DragEvent) => { preventDefaults(e); setIsDragging(true); };
    const handleDragLeave = (e: DragEvent) => { preventDefaults(e); setIsDragging(false); };
    const handleDrop = (e: DragEvent) => {
      preventDefaults(e);
      setIsDragging(false);
      const file = e.dataTransfer?.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        toast.error("Please drop an image file.");
      }
    };

    dropArea.addEventListener("dragover", preventDefaults);
    dropArea.addEventListener("dragenter", handleDragEnter);
    dropArea.addEventListener("dragleave", handleDragLeave);
    dropArea.addEventListener("drop", handleDrop);

    return () => {
      dropArea.removeEventListener("dragover", preventDefaults);
      dropArea.removeEventListener("dragenter", handleDragEnter);
      dropArea.removeEventListener("dragleave", handleDragLeave);
      dropArea.removeEventListener("drop", handleDrop);
    };
  }, [activeTab, imagePreview]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (activeTab === "text" && !textInput.trim()) {
      toast.error("Please enter a form question first.");
      return;
    }
    if (activeTab === "screenshot" && !imagePreview) {
      toast.error("Please upload a screenshot first.");
      return;
    }

    setLoading(true);
    setResult(null);
    toast.info("Analyzing with Gemini...");

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
      }

      // Debug: log the key (remove this line later)
      console.log("Using API key:", apiKey.substring(0, 10) + "..."); // only first 10 chars for safety

      let parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [];

      if (activeTab === "text") {
        parts.push({
          text: `${SYSTEM_PROMPT}\n\nUser input:\n${textInput.trim()}`,
        });
      } else {
        const matches = imagePreview!.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
          throw new Error("Invalid image format");
        }
        const mimeType = matches[1];
        const base64 = matches[2];

        parts.push({
          text: `${SYSTEM_PROMPT}\n\nThis is a screenshot of a form. Analyze it carefully.`,
        });
        parts.push({
          inlineData: {
            mimeType,
            data: base64,
          },
        });
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts }],
            generationConfig: {
              temperature: 0.4,
              topP: 0.95,
              topK: 32,
              maxOutputTokens: 1200,
            },
            safetySettings: [
              { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
              { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
              { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
              { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Gemini API error:", errorData);
        throw new Error(errorData?.error?.message || `API error (${response.status})`);
      }

      const data = await response.json();
      console.log("Gemini response:", data); // debug

      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (!generatedText) {
        throw new Error("No valid response from Gemini");
      }

      setResult(generatedText);
      toast.success("Analysis complete!");
    } catch (err: any) {
      console.error("Analysis failed:", err);
      const message = err.message || "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} id="app-section" className="py-32 bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="mb-10 flex items-center gap-2 rounded-xl border border-border bg-card p-1.5 shadow-sm">
          {([
            { id: "text" as Tab, icon: FileText, label: "Explain Text" },
            { id: "screenshot" as Tab, icon: Camera, label: "Analyze Screenshot" },
          ]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setResult(null);
                setTextInput("");
                setImagePreview(null);
              }}
              disabled={loading}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-medium transition-all disabled:opacity-50 ${activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-md glow-blue"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
            >
              <tab.icon className="h-4.5 w-4.5" />
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === "text" ? (
              <div className="mb-6">
                <label className="mb-2.5 block text-sm font-medium text-muted-foreground">
                  Paste a form question, label or full paragraph
                </label>
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Example:\nHave you ever been convicted of a felony?\n—or—\nUpload your most recent CV / résumé (PDF or Word format only)"
                  className="w-full rounded-xl border border-border bg-card p-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:ring-1 focus:ring-primary/50 resize-none shadow-sm"
                  rows={5}
                  disabled={loading}
                />
              </div>
            ) : (
              <div className="mb-6">
                <label className="mb-2.5 block text-sm font-medium text-muted-foreground">
                  Upload or drag & drop a screenshot of the form
                </label>
                {imagePreview ? (
                  <div className="group relative rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                    <img
                      src={imagePreview}
                      alt="Form screenshot preview"
                      className="w-full h-auto max-h-[420px] object-contain"
                    />
                    <button
                      onClick={() => {
                        setImagePreview(null);
                        if (fileRef.current) fileRef.current.value = "";
                      }}
                      disabled={loading}
                      className="absolute top-3 right-3 rounded-full bg-background/80 p-2 text-muted-foreground hover:bg-background hover:text-foreground transition-colors opacity-80 hover:opacity-100"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div
                    ref={dropRef}
                    onClick={() => fileRef.current?.click()}
                    className={`flex w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-14 transition-all ${isDragging
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-card/40 text-muted-foreground hover:border-primary/60 hover:bg-muted/30"
                      } ${loading ? "opacity-60 pointer-events-none" : ""}`}
                  >
                    <Upload className="h-10 w-10 opacity-70" />
                    <div className="text-center">
                      <p className="font-medium">Click to upload or drag & drop</p>
                      <p className="text-xs mt-1 text-muted-foreground">PNG, JPG, WebP (max 10 MB recommended)</p>
                    </div>
                  </div>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={loading}
                />
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={loading || (activeTab === "text" && !textInput.trim()) || (activeTab === "screenshot" && !imagePreview)}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-md glow-blue"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analyzing with Gemini 3...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  {activeTab === "text" ? "Explain This Question" : "Analyze This Form Screenshot"}
                </>
              )}
            </button>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.4 }}
              className="mt-10 rounded-2xl border border-border bg-card p-7 shadow-md"
            >
              <h3 className="mb-5 text-xl font-semibold gradient-text flex items-center gap-2">
                <Zap className="h-5 w-5" /> AI Form Analysis
              </h3>
              <div className="prose prose-sm prose-invert max-w-none leading-relaxed
                prose-headings:text-foreground prose-headings:font-semibold
                prose-p:text-muted-foreground prose-p:mb-3
                prose-strong:text-foreground
                prose-ul:ml-5 prose-li:text-muted-foreground prose-li:marker:text-primary/70">
                {result.split("\n").map((line, i) => {
                  const trimmed = line.trim();
                  if (!trimmed) return <br key={i} />;

                  if (trimmed.startsWith("## ")) {
                    return (
                      <h4 key={i} className="mt-7 mb-2.5 text-lg font-semibold text-foreground">
                        {trimmed.replace("## ", "")}
                      </h4>
                    );
                  }
                  if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                    return (
                      <li key={i} className="ml-6 text-sm text-muted-foreground list-disc">
                        {trimmed.replace(/^[-*]\s/, "")}
                      </li>
                    );
                  }
                  if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
                    return <p key={i} className="font-semibold">{trimmed.replace(/\*\*/g, "")}</p>;
                  }

                  return (
                    <p key={i} className="mb-3 text-sm text-muted-foreground leading-relaxed">
                      {trimmed}
                    </p>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!result && !loading && (
          <div className="mt-16 text-center text-sm text-muted-foreground/80 italic">
            Submit a question or screenshot to get a clear explanation.
          </div>
        )}
      </div>
    </section>
  );
};

const features = [
  {
    icon: FileText,
    title: "Text Explanation",
    description:
      "Paste any form question and receive a clear breakdown of meaning, purpose, expected format, and common pitfalls.",
  },
  {
    icon: Camera,
    title: "Screenshot Analysis",
    description:
      "Upload a form screenshot — get context, field types, required/optional indicators, and sensitive areas to watch.",
  },
  {
    icon: Zap,
    title: "Gemini 3 Powered",
    description:
      "Uses the latest Gemini 3 Flash model for fast, accurate, and deep multimodal understanding.",
  },
];

const Features = () => (
  <section className="py-32 bg-gradient-to-b from-background to-muted/30">
    <div className="container mx-auto px-6">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-5 text-4xl font-bold md:text-5xl">
          How <span className="gradient-text">ForMai</span> Helps You
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Two intuitive ways to instantly understand any form — powered by cutting-edge AI.
        </p>
      </motion.div>
      <div className="grid gap-8 md:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4 transition-colors group-hover:bg-primary/20">
              <f.icon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mb-4 text-2xl font-semibold">{f.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-border py-12 bg-muted/20">
    <div className="container mx-auto px-6 text-center">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} <span className="gradient-text font-semibold">ForMai</span> — All rights reserved.
      </p>
    </div>
  </footer>
);

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <AppSection />
    <Features />
    <Footer />
  </div>
);

export default Index;