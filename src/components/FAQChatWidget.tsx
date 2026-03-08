import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import faqResponses from "@/data/faqResponses.json";

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
};

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

const FAQChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Hello, cadet. Ask a career FAQ or tap one of the quick prompts below.",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const widgetRef = useRef<HTMLDivElement | null>(null);

  const responseMap = faqResponses as Record<string, string>;
  const quickQuestions = useMemo(() => Object.keys(responseMap), [responseMap]);

  const normalizeText = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const findPredefinedResponse = (question: string) => {
    const normalizedQuestion = normalizeText(question);
    const faqEntries = Object.entries(responseMap);

    const exactEntry = faqEntries.find(
      ([key]) => normalizeText(key) === normalizedQuestion,
    );
    if (exactEntry) return exactEntry[1];

    // Fallback: pick the FAQ with the highest token overlap for flexible matching.
    const inputTokens = new Set(normalizedQuestion.split(" ").filter(Boolean));
    let bestMatch = "";
    let bestScore = 0;

    faqEntries.forEach(([key, answer]) => {
      const keyTokens = normalizeText(key).split(" ").filter(Boolean);
      const overlap = keyTokens.filter((token) => inputTokens.has(token)).length;
      const score = keyTokens.length > 0 ? overlap / keyTokens.length : 0;

      if (score > bestScore) {
        bestScore = score;
        bestMatch = answer;
      }
    });

    if (bestScore >= 0.45) {
      return bestMatch;
    }

    return null;
  };

  const askGemini = async (question: string) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
    if (!apiKey) {
      return "AI key missing. Add VITE_GEMINI_API_KEY in .env and restart the Vite server.";
    }

    const faqContext = Object.entries(responseMap)
      .map(([q, a], index) => `Q${index + 1}: ${q}\nA${index + 1}: ${a}`)
      .join("\n\n");

    const promptText = `You are a concise career guidance assistant.
Use the FAQ context first. If context is not enough, still give practical guidance.

FAQ CONTEXT:
${faqContext}

USER QUESTION:
${question}`;

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
        },
      );

      const data = (await response.json()) as GeminiResponse;
      const text = data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? "")
        .join("")
        .trim();

      if (response.ok && text) {
        answerText = text;
        break;
      }

      lastError =
        data?.error?.message || `Gemini request failed with status ${response.status}.`;

      if (response.status === 404) {
        continue;
      }

      break;
    }

    if (!answerText) {
      throw new Error(lastError);
    }

    return answerText;
  };

  const askQuestion = async (question: string) => {
    const cleaned = question.trim();
    if (!cleaned) return;

    setMessages((prev) => [...prev, { sender: "user", text: cleaned }]);
    setInput("");

    const predefinedReply = findPredefinedResponse(cleaned);
    if (predefinedReply) {
      setMessages((prev) => [...prev, { sender: "bot", text: predefinedReply }]);
      return;
    }

    setIsAiLoading(true);
    setAiError("");

    try {
      const aiReply = await askGemini(cleaned);
      setMessages((prev) => [...prev, { sender: "bot", text: aiReply }]);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to get a response from AI right now.";
      setAiError(message);
      setMessages((prev) => [...prev, { sender: "bot", text: message }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleQuickQuestionClick = (question: string) => {
    const botReply =
      responseMap[question] ||
      findPredefinedResponse(question) ||
      "No predefined response available.";
    setSelectedQuestion(question);
    setSelectedAnswer(botReply);
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: question },
      { sender: "bot", text: botReply },
    ]);
    setInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isAiLoading) return;
    void askQuestion(input);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (widgetRef.current?.contains(target)) return;
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-[120] max-[360px]:bottom-2 max-[360px]:right-2"
    >
      {isOpen && (
        <div className="mb-3 sm:mb-4 w-[calc(100vw-1.5rem)] sm:w-[22rem] max-w-[22rem] max-h-[82vh] border border-primary/40 bg-background/95 backdrop-blur-md shadow-[0_0_24px_hsl(185_100%_50%_/_0.35)] hud-bracket overflow-hidden flex flex-col max-[360px]:w-[calc(100vw-1rem)]">
          <div className="flex items-center justify-between border-b border-primary/25 px-4 py-3 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 max-[360px]:px-3 max-[360px]:py-2">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              <div>
                <p className="font-display text-xs tracking-[0.15em] text-foreground max-[360px]:text-[10px]">
                  FAQ BOT
                </p>
                <p className="font-mono text-[10px] text-secondary tracking-widest max-[360px]:text-[9px]">
                  FAQ + AI HYBRID MODE
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close FAQ chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="min-h-0 h-64 sm:h-72 overflow-y-auto space-y-2 px-3 py-3 bg-[radial-gradient(circle_at_top,_hsl(185_100%_50%_/_0.09),_transparent_45%)] max-[360px]:h-56 max-[360px]:px-2.5 max-[360px]:py-2.5">
            {messages.map((message, index) => (
              <div
                key={`${message.sender}-${index}`}
                className={`max-w-[90%] rounded-sm px-3 py-2 text-sm max-[360px]:px-2 max-[360px]:py-1.5 max-[360px]:text-xs ${
                  message.sender === "user"
                    ? "ml-auto border border-primary/30 bg-primary/15 text-primary"
                    : "border border-secondary/30 bg-card/80 text-card-foreground"
                }`}
              >
                {message.text}
              </div>
            ))}
            {isAiLoading && (
              <div className="max-w-[90%] rounded-sm px-3 py-2 text-sm border border-secondary/30 bg-card/80 text-card-foreground">
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-border/50 px-3 py-3 space-y-3 overflow-y-auto max-[360px]:px-2.5 max-[360px]:py-2.5 max-[360px]:space-y-2">
            <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pr-1 max-[360px]:gap-1.5">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => handleQuickQuestionClick(question)}
                  className="border border-secondary/30 bg-secondary/10 px-2 py-1 text-[11px] text-secondary hover:bg-secondary/20 transition-colors max-[360px]:text-[10px] max-[360px]:px-1.5"
                >
                  {question}
                </button>
              ))}
            </div>

            {selectedAnswer && (
              <div className="border border-primary/30 bg-primary/10 px-3 py-2 max-h-36 overflow-y-auto max-[360px]:px-2 max-[360px]:py-1.5">
                <p className="font-mono text-[10px] text-primary tracking-widest max-[360px]:text-[9px]">
                  SELECTED FAQ
                </p>
                <p className="font-body text-xs text-foreground mt-1 max-[360px]:text-[11px]">
                  {selectedQuestion}
                </p>
                <p className="font-body text-sm text-foreground/90 mt-2 max-[360px]:text-xs">
                  {selectedAnswer}
                </p>
              </div>
            )}

            {aiError && (
              <p className="font-body text-xs text-destructive">{aiError}</p>
            )}

            <form onSubmit={handleSubmit} className="flex items-center gap-2 max-[360px]:gap-1.5">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask anything..."
                className="flex-1 border border-border bg-background/70 px-3 py-2 text-sm outline-none focus:border-primary/60 max-[360px]:px-2 max-[360px]:py-1.5 max-[360px]:text-xs"
              />
              <button
                type="submit"
                disabled={isAiLoading || !input.trim()}
                className="border border-primary/40 bg-primary/20 px-3 py-2 text-primary hover:bg-primary/30 transition-colors max-[360px]:px-2 max-[360px]:py-1.5"
                aria-label="Send message"
              >
                <Send className="h-4 w-4 max-[360px]:h-3.5 max-[360px]:w-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-gradient-to-br from-primary/25 to-secondary/20 text-primary glow-cyan-strong hover:scale-105 transition-transform max-[360px]:h-12 max-[360px]:w-12"
        aria-label={isOpen ? "Close FAQ chat widget" : "Open FAQ chat widget"}
      >
        <MessageCircle className="h-6 w-6 max-[360px]:h-5 max-[360px]:w-5" />
      </button>
    </div>
  );
};

export default FAQChatWidget;
