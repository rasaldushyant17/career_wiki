/**
 * FAQPage.tsx - Frequently Asked Questions Page
 * ===============================================
 * URL: /faq/:id  (e.g., /faq/general)
 * 
 * REACT CONCEPTS USED (explained with HTML/CSS/JS equivalents):
 * ──────────────────────────────────────────────────────────────
 * 
 * useState:
 *   React: const [openIndex, setOpenIndex] = useState(null);
 *   Plain JS: let openIndex = null;
 *   
 *   The difference: In React, calling setOpenIndex() automatically
 *   re-renders the page. In plain JS, you'd need to manually call
 *   document.getElementById().style.display = "block" etc.
 * 
 * useParams:
 *   React: const { id } = useParams();
 *   Plain JS: const id = window.location.pathname.split("/")[2];
 * 
 * Conditional Rendering:
 *   React: {openIndex === index && <div>Answer</div>}
 *   Plain JS: if (openIndex === index) { element.style.display = "block"; }
 * 
 * AnimatePresence:
 *   Allows elements to animate OUT when they're removed.
 *   In CSS, you can animate IN with @keyframes, but animating OUT
 *   (when element is removed from DOM) is hard — AnimatePresence solves this.
 */

import { useParams, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle, Bot } from "lucide-react";
import { faqSections } from "@/data/careers";
import HUDPanel from "@/components/HUDPanel";

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  error?: {
    message?: string;
  };
};

const FAQPage = () => {
  // Get the FAQ section ID from the URL
  // If URL is /faq/general, then id = "general"
  const { id } = useParams();

  // Function to navigate to other pages
  const navigate = useNavigate();

  // Find the matching FAQ section from our data array
  // .find() returns the first item where s.id matches our URL id
  const section = faqSections.find((s) => s.id === id);

  // STATE: tracks which question is currently open
  // null = no question is open
  // 0 = first question is open, 1 = second, etc.
  //
  // In plain JS you'd do: let openIndex = null;
  // But React's useState makes the page automatically update when this changes
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [geminiAnswer, setGeminiAnswer] = useState("");
  const [geminiError, setGeminiError] = useState("");
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);

  const isGeminiEnabledSection = section.id === "faqs-students" || section.id === "faqs-parents";

  const handleAskGemini = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query.trim() || isGeminiLoading) return;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
    if (!apiKey) {
      setGeminiError("Gemini key missing. Add VITE_GEMINI_API_KEY in .env and restart the Vite server.");
      return;
    }

    const faqContext = section.faqs
      .map((faq, index) => `Q${index + 1}: ${faq.question}\nA${index + 1}: ${faq.answer}`)
      .join("\n\n");

    setIsGeminiLoading(true);
    setGeminiError("");
    setGeminiAnswer("");

    try {
      const promptText = `You are a helpful and concise education and career guidance assistant for Indian students and parents.
Use the FAQ context below first. If context is not enough, provide practical guidance and clearly mention assumptions.

FAQ CONTEXT:
${faqContext}

USER QUESTION:
${query}`;

      const models = ["gemini-2.0-flash", "gemini-1.5-flash"];
      let answerText = "";
      let lastError = "Gemini API request failed.";

      for (const model of models) {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [{ text: promptText }],
                },
              ],
            }),
          }
        );

        const data = (await response.json()) as GeminiResponse;
        const text = data?.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim();

        if (response.ok && text) {
          answerText = text;
          break;
        }

        lastError = data?.error?.message || `Gemini request failed with status ${response.status}.`;

        // If model was not found/available, try next fallback model.
        if (response.status === 404) {
          continue;
        }

        break;
      }

      if (!answerText) {
        throw new Error(lastError);
      }

      setGeminiAnswer(answerText);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to get a response from Gemini right now.";
      setGeminiError(message);
    } finally {
      setIsGeminiLoading(false);
    }
  };

  // ---------- SECTION NOT FOUND ----------
  // If the URL doesn't match any FAQ section, show an error
  if (!section) {
    return (
      <div className="min-h-screen bg-background hud-scanlines hud-grid-bg flex items-center justify-center">
        <div className="text-center">
          <div className="font-display text-lg text-destructive tracking-widest">FAQ NOT FOUND</div>
          <button onClick={() => navigate("/")} className="mt-4 font-mono text-xs text-primary hover:underline">
            ← RETURN TO DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  // ---------- MAIN FAQ PAGE ----------
  return (
    <div className="min-h-screen bg-background hud-scanlines hud-grid-bg">

      {/* ==================== HEADER (Navigation Bar) ==================== */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Back button — onClick runs navigate("/") to go home */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>BACK</span>
            </button>
            {/* Vertical separator line */}
            <div className="h-4 w-px bg-border" />
            {/* Breadcrumb showing current location */}
            <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
              FAQ / {section.id}
            </span>
          </div>
        </div>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="container mx-auto px-4 py-6 max-w-3xl space-y-6">
        {/* max-w-3xl = max-width: 48rem (keeps content readable width) */}

        {/* ---- Hero Banner ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border border-border bg-card/60 backdrop-blur-sm p-6 hud-bracket glow-cyan text-center"
        >
          <HelpCircle className="h-8 w-8 text-primary mx-auto mb-3" />
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-wide glow-text-cyan">
            {section.title}
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-1">{section.subtitle}</p>
        </motion.div>

        {/* ---- FAQ ACCORDION ----
            An accordion = only one item open at a time.
            Click a question → it expands to show the answer.
            Click it again → it collapses.
            
            HOW THE TOGGLE WORKS:
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            
            Translation: "If this question is already open (openIndex === index),
            close it (set to null). Otherwise, open it (set to this index)."
            
            In plain JS this would be:
            button.addEventListener('click', function() {
              if (openIndex === index) {
                openIndex = null;
                answerDiv.style.display = 'none';
              } else {
                openIndex = index;
                answerDiv.style.display = 'block';
              }
            });
        */}
        <div className="space-y-3">
          {section.faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div
                className={`border bg-card/60 backdrop-blur-sm overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "border-primary/50 glow-cyan"            /* OPEN state: cyan border + glow */
                    : "border-border hover:border-primary/30"  /* CLOSED state: default border */
                }`}
              >
                {/* QUESTION BUTTON — click to expand/collapse */}
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-muted/20"
                >
                  {/* Question number in a circle */}
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 border border-primary/30 font-mono text-xs text-primary shrink-0">
                    {index + 1}
                  </span>

                  {/* Question text */}
                  <span className="font-body text-sm font-semibold text-foreground flex-1">
                    {faq.question}
                  </span>

                  {/* Arrow icon: ▲ when open, ▼ when closed */}
                  {openIndex === index ? (
                    <ChevronUp className="h-4 w-4 text-primary shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                </button>

                {/* ANSWER SECTION — animated expand/collapse */}
                {/* AnimatePresence allows the exit animation to play
                    before the element is removed from the page */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}       /* Start: collapsed & invisible */
                      animate={{ height: "auto", opacity: 1 }}  /* Open: expand & show */
                      exit={{ height: 0, opacity: 0 }}          /* Close: collapse & hide */
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 pt-0 border-t border-border/30">
                        <p className="font-body text-sm text-foreground/80 leading-relaxed mt-3">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {isGeminiEnabledSection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="border border-border bg-card/60 backdrop-blur-sm p-5 hud-bracket"
          >
            <div className="flex items-center gap-2 mb-3">
              <Bot className="h-5 w-5 text-primary" />
              <h2 className="font-display text-lg tracking-wide text-foreground">Ask Gemini (AI Doubt Solver)</h2>
            </div>

            <form onSubmit={handleAskGemini} className="space-y-3">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask your question here..."
                className="w-full min-h-28 rounded-md border border-border bg-background/70 px-3 py-2 font-body text-sm text-foreground outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={isGeminiLoading || !query.trim()}
                className="rounded-md border border-primary/50 px-4 py-2 font-mono text-xs tracking-widest text-primary transition-colors hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeminiLoading ? "ASKING GEMINI..." : "ASK GEMINI"}
              </button>
            </form>

            {geminiError && (
              <p className="mt-3 font-body text-sm text-destructive">
                {geminiError}
              </p>
            )}

            {geminiAnswer && (
              <div className="mt-4 border border-primary/30 rounded-md p-3 bg-primary/5">
                <p className="font-body text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">{geminiAnswer}</p>
              </div>
            )}
          </motion.div>
        )}

      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-border/30 mt-12 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="font-mono text-[10px] text-muted-foreground/50 tracking-widest">
            CAREER HANDBOOK // EDUCATIONAL PURPOSE ONLY // © {new Date().getFullYear()}
          </p>
        </div>
      </footer>

    </div>
  );
};

export default FAQPage;
