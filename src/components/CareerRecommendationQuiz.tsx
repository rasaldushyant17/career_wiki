import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Target,
} from "lucide-react";
import HUDPanel from "@/components/HUDPanel";

type Stream =
  | "Science A"
  | "Science B"
  | "Commerce"
  | "Arts"
  | "Law"
  | "Design";

type QuizOption = {
  label: string;
  stream: Stream;
};

type QuizQuestion = {
  id: number;
  text: string;
  options: QuizOption[];
};

type Recommendation = {
  stream: Stream;
  score: number;
  explanation: string;
};

const streamInfo: Record<Stream, string> = {
  "Science A":
    "Best fit for strong math, physics, and problem-solving interests. Leads to engineering, technology, and technical research careers.",
  "Science B":
    "Ideal for students interested in biology and healthcare. Supports paths like medicine, pharmacy, biotechnology, and life sciences.",
  Commerce:
    "Great for business, finance, and management orientation. Opens careers in accounting, banking, economics, and entrepreneurship.",
  Arts:
    "Good for communication, social sciences, and humanities interests. Useful for media, psychology, civil services, and public policy.",
  Law:
    "Recommended for students who enjoy argument, logic, and justice-oriented thinking. Supports legal practice, judiciary, and policy careers.",
  Design:
    "Best for creative and visual thinkers. Leads to UI/UX, product, fashion, interior, and communication design roles.",
};

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: "Which activity do you enjoy most?",
    options: [
      { label: "Solving math puzzles and equations", stream: "Science A" },
      { label: "Reading about the human body and health", stream: "Science B" },
      { label: "Tracking business trends and money topics", stream: "Commerce" },
      { label: "Sketching ideas and visual concepts", stream: "Design" },
    ],
  },
  {
    id: 2,
    text: "What type of school project excites you most?",
    options: [
      { label: "Building a working model with circuits", stream: "Science A" },
      { label: "Creating a biology experiment report", stream: "Science B" },
      { label: "Presenting a startup or market plan", stream: "Commerce" },
      { label: "Writing and presenting social issues", stream: "Arts" },
    ],
  },
  {
    id: 3,
    text: "How do you usually solve conflicts?",
    options: [
      { label: "I analyze facts and evidence carefully", stream: "Law" },
      { label: "I focus on practical and logical solutions", stream: "Science A" },
      { label: "I negotiate for a win-win outcome", stream: "Commerce" },
      { label: "I understand emotions and perspectives first", stream: "Arts" },
    ],
  },
  {
    id: 4,
    text: "Which future workplace sounds most interesting?",
    options: [
      { label: "Research lab or hospital environment", stream: "Science B" },
      { label: "Tech company building digital products", stream: "Science A" },
      { label: "Corporate office handling strategy and finance", stream: "Commerce" },
      { label: "Creative studio for branding and visuals", stream: "Design" },
    ],
  },
  {
    id: 5,
    text: "How strong is your interest in technology?",
    options: [
      { label: "Very high, I enjoy coding and systems", stream: "Science A" },
      { label: "I like medical tech and diagnostics", stream: "Science B" },
      { label: "I like business analytics tools", stream: "Commerce" },
      { label: "I like design tools for digital content", stream: "Design" },
    ],
  },
  {
    id: 6,
    text: "Which subject feels naturally easy for you?",
    options: [
      { label: "Mathematics", stream: "Science A" },
      { label: "Biology", stream: "Science B" },
      { label: "Accountancy or Economics", stream: "Commerce" },
      { label: "Political Science or Sociology", stream: "Arts" },
    ],
  },
  {
    id: 7,
    text: "What kind of impact do you want to create?",
    options: [
      { label: "Develop innovative products and machines", stream: "Science A" },
      { label: "Improve healthcare and save lives", stream: "Science B" },
      { label: "Build successful businesses and jobs", stream: "Commerce" },
      { label: "Protect rights and ensure justice", stream: "Law" },
    ],
  },
  {
    id: 8,
    text: "How do you feel about public speaking and debate?",
    options: [
      { label: "I enjoy legal argument and structured debate", stream: "Law" },
      { label: "I can explain data and technical topics", stream: "Science A" },
      { label: "I like pitching ideas and persuading people", stream: "Commerce" },
      { label: "I express opinions and stories confidently", stream: "Arts" },
    ],
  },
  {
    id: 9,
    text: "Which extracurricular activity sounds best?",
    options: [
      { label: "Robotics or coding club", stream: "Science A" },
      { label: "Health awareness or science club", stream: "Science B" },
      { label: "Entrepreneurship or investment club", stream: "Commerce" },
      { label: "Theatre, writing, or media club", stream: "Arts" },
    ],
  },
  {
    id: 10,
    text: "What describes your personality best?",
    options: [
      { label: "Analytical and logic-driven", stream: "Science A" },
      { label: "Empathetic and observant", stream: "Science B" },
      { label: "Goal-focused and practical", stream: "Commerce" },
      { label: "Creative and imaginative", stream: "Design" },
    ],
  },
];

const allStreams: Stream[] = [
  "Science A",
  "Science B",
  "Commerce",
  "Arts",
  "Law",
  "Design",
];

const CareerRecommendationQuiz = () => {
  const [answers, setAnswers] = useState<Record<number, Stream>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const answeredCount = Object.keys(answers).length;
  const progress = Math.round(
    ((currentQuestionIndex + 1) / quizQuestions.length) * 100,
  );
  const canSubmit = answeredCount === quizQuestions.length;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
  const isCurrentAnswered = Boolean(answers[currentQuestion.id]);

  const scoreMap = useMemo(() => {
    return allStreams.reduce<Record<Stream, number>>((acc, stream) => {
      acc[stream] = 0;
      return acc;
    }, {} as Record<Stream, number>);
  }, []);

  const handleSelectOption = (questionId: number, stream: Stream) => {
    setAnswers((prev) => ({ ...prev, [questionId]: stream }));
    setIsSubmitted(false);
    setRecommendations([]);
  };

  const handleNext = () => {
    if (!isCurrentAnswered || isLastQuestion) return;
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex === 0) return;
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const handleSubmitQuiz = () => {
    if (!canSubmit) return;

    const finalScores = { ...scoreMap };
    Object.values(answers).forEach((stream) => {
      finalScores[stream] += 1;
    });

    const ranked = Object.entries(finalScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([stream, score]) => ({
        stream: stream as Stream,
        score,
        explanation: streamInfo[stream as Stream],
      }));

    setRecommendations(ranked);
    setIsSubmitted(true);
  };

  const handleResetQuiz = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setRecommendations([]);
    setIsSubmitted(false);
  };

  return (
    <HUDPanel title="CAREER RECOMMENDATION QUIZ" delay={0.08}>
      <div className="p-4 md:p-6 space-y-6">
        <div className="border border-primary/25 bg-background/70 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="font-mono text-xs tracking-widest text-primary">
              QUIZ PROGRESS
            </p>
            <p className="font-mono text-xs text-secondary">
              STEP {currentQuestionIndex + 1}/{quizQuestions.length}
            </p>
          </div>
          <div className="h-2 w-full bg-muted/40 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-mono text-[10px] text-muted-foreground tracking-widest mt-2">
            {answeredCount}/{quizQuestions.length} ANSWERS LOCKED
          </p>
        </div>

        <div className="border border-border/70 bg-card/60 p-4 hud-bracket">
          <p className="font-mono text-[10px] text-muted-foreground tracking-widest mb-1">
            QUESTION {currentQuestionIndex + 1}
          </p>
          <h3 className="font-display text-sm md:text-base text-foreground mb-3">
            {currentQuestion.text}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {currentQuestion.options.map((option) => {
              const isActive = answers[currentQuestion.id] === option.stream;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() =>
                    handleSelectOption(currentQuestion.id, option.stream)
                  }
                  className={`text-left px-3 py-2 border transition-all ${
                    isActive
                      ? "border-primary bg-primary/20 text-foreground glow-cyan"
                      : "border-border/70 bg-background/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  <span className="font-body text-sm">{option.label}</span>
                  <span className="ml-2 font-mono text-[10px] text-secondary">
                    [{option.stream}]
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 border border-border bg-background/70 text-muted-foreground font-mono text-xs tracking-widest disabled:opacity-40 disabled:cursor-not-allowed hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            PREVIOUS
          </button>

          {!isLastQuestion && (
            <button
              type="button"
              onClick={handleNext}
              disabled={!isCurrentAnswered}
              className="px-4 py-2 border border-primary/40 bg-primary/15 text-primary font-mono text-xs tracking-widest disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/25 transition-colors inline-flex items-center gap-1"
            >
              NEXT
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={handleSubmitQuiz}
            disabled={!isLastQuestion || !canSubmit}
            className="px-4 py-2 border border-primary/40 bg-primary/15 text-primary font-mono text-xs tracking-widest disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/25 transition-colors"
          >
            SUBMIT QUIZ
          </button>
          <button
            type="button"
            onClick={handleResetQuiz}
            className="px-4 py-2 border border-secondary/40 bg-secondary/10 text-secondary font-mono text-xs tracking-widest hover:bg-secondary/20 transition-colors"
          >
            RESET
          </button>
        </div>

        {isSubmitted && recommendations.length > 0 && (
          <div className="space-y-3 border border-primary/30 bg-primary/5 p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="font-display text-base text-foreground tracking-wide">
                TOP 3 RECOMMENDED STREAMS
              </h3>
            </div>

            {recommendations.map((item, idx) => (
              <div
                key={item.stream}
                className="border border-border/70 bg-card/70 p-3"
              >
                <div className="flex items-center gap-2 mb-1">
                  {idx === 0 ? (
                    <Target className="h-4 w-4 text-accent" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                  )}
                  <p className="font-display text-sm text-foreground">
                    #{idx + 1} {item.stream}
                  </p>
                  <p className="font-mono text-[10px] text-primary ml-auto">
                    SCORE: {item.score}/10
                  </p>
                </div>
                <p className="font-body text-sm text-foreground/85">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </HUDPanel>
  );
};

export default CareerRecommendationQuiz;
