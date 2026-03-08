import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, GraduationCap, Sparkles, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HUDPanel from "@/components/HUDPanel";

type EducationStream = "science" | "commerce" | "arts" | "any";

type CareerProfile = {
  id: string;
  title: string;
  description: string;
  matchFor: EducationStream[];
  interestTags: string[];
  skillTags: string[];
  pathways: string[];
};

type RecommendationResult = CareerProfile & {
  score: number;
  reason: string;
};

const careerProfiles: CareerProfile[] = [
  {
    id: "science-a",
    title: "Science - A Group",
    description: "Engineering, technology, architecture, data, and technical innovation tracks.",
    matchFor: ["science", "any"],
    interestTags: ["technology", "engineering", "coding", "math", "robotics", "problem solving", "ai"],
    skillTags: ["analytical thinking", "math", "coding", "logic", "physics", "programming"],
    pathways: ["Computer Engineering", "Mechanical", "Civil", "AI/ML", "Architecture"],
  },
  {
    id: "science-b",
    title: "Science - B Group",
    description: "Medicine, pharmacy, biotechnology, and allied healthcare careers.",
    matchFor: ["science", "any"],
    interestTags: ["biology", "medicine", "healthcare", "research", "lab", "doctor"],
    skillTags: ["observation", "precision", "patient care", "biology", "critical thinking"],
    pathways: ["MBBS", "BDS", "Pharmacy", "Nursing", "Biotech"],
  },
  {
    id: "commerce",
    title: "Commerce",
    description: "Finance, accounting, taxation, and business operations.",
    matchFor: ["commerce", "any"],
    interestTags: ["business", "finance", "markets", "economy", "money", "accounts"],
    skillTags: ["numeracy", "analysis", "accounting", "decision making", "organization"],
    pathways: ["B.Com", "CA", "CS", "CFA", "Banking"],
  },
  {
    id: "business-management",
    title: "Business Management",
    description: "Leadership, operations, marketing, and entrepreneurship-oriented roles.",
    matchFor: ["commerce", "arts", "science", "any"],
    interestTags: ["startup", "management", "marketing", "leadership", "sales", "entrepreneurship"],
    skillTags: ["communication", "leadership", "planning", "presentation", "teamwork"],
    pathways: ["BBA", "BMS", "IPM", "MBA pathway", "Brand Management"],
  },
  {
    id: "law",
    title: "Law",
    description: "Litigation, corporate law, policy, and legal advisory careers.",
    matchFor: ["arts", "commerce", "science", "any"],
    interestTags: ["justice", "debate", "policy", "constitution", "rights", "legal"],
    skillTags: ["reasoning", "public speaking", "argumentation", "research", "writing"],
    pathways: ["BA LLB", "BBA LLB", "Corporate Law", "Judiciary", "Legal Research"],
  },
  {
    id: "mass-communication",
    title: "Mass Communication",
    description: "Journalism, content, media production, digital communication, and PR.",
    matchFor: ["arts", "commerce", "any"],
    interestTags: ["media", "journalism", "storytelling", "content", "social media", "public relations"],
    skillTags: ["writing", "communication", "creativity", "editing", "presentation"],
    pathways: ["BJMC", "Digital Media", "Broadcast", "PR", "Advertising"],
  },
  {
    id: "design-arts",
    title: "Design & Fine Arts",
    description: "Visual design, UI/UX, animation, product and creative arts careers.",
    matchFor: ["arts", "science", "commerce", "any"],
    interestTags: ["design", "art", "fashion", "animation", "ui ux", "creative"],
    skillTags: ["creativity", "visual thinking", "drawing", "prototyping", "design tools"],
    pathways: ["B.Des", "Fine Arts", "UI/UX Design", "Animation", "Fashion Design"],
  },
  {
    id: "economics",
    title: "Economics",
    description: "Data-driven policy, market research, analytics, and economic strategy careers.",
    matchFor: ["commerce", "science", "arts", "any"],
    interestTags: ["economics", "policy", "data", "research", "markets", "analytics"],
    skillTags: ["data analysis", "statistics", "logical thinking", "research", "forecasting"],
    pathways: ["BA/BSc Economics", "Policy Research", "Data Analytics", "Consulting"],
  },
  {
    id: "social-work",
    title: "Social Work",
    description: "Community development, welfare, NGOs, and social impact careers.",
    matchFor: ["arts", "commerce", "science", "any"],
    interestTags: ["community", "social impact", "ngo", "human rights", "counselling", "welfare"],
    skillTags: ["empathy", "communication", "fieldwork", "problem solving", "listening"],
    pathways: ["BSW", "MSW", "Community Development", "CSR", "Policy Work"],
  },
  {
    id: "sports-nda",
    title: "Sports & NDA",
    description: "Defence services, physical education, and sports management opportunities.",
    matchFor: ["science", "arts", "commerce", "any"],
    interestTags: ["defence", "army", "sports", "fitness", "discipline", "leadership"],
    skillTags: ["stamina", "discipline", "team spirit", "decision making", "resilience"],
    pathways: ["NDA", "Sports Management", "Physical Education", "Defence Training"],
  },
];

const normalizeTokens = (text: string) =>
  text
    .toLowerCase()
    .split(/[,/\n]| and | & |;/g)
    .map((item) => item.trim())
    .filter(Boolean);

const educationOptions: { value: EducationStream; label: string }[] = [
  { value: "science", label: "Science" },
  { value: "commerce", label: "Commerce" },
  { value: "arts", label: "Arts / Humanities" },
  { value: "any", label: "Not sure / Open to all" },
];

const AICareerRecommender = () => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState("");
  const [skills, setSkills] = useState("");
  const [educationStream, setEducationStream] = useState<EducationStream>("any");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const recommendations = useMemo(() => {
    const interestTokens = normalizeTokens(interests);
    const skillTokens = normalizeTokens(skills);

    if (!interestTokens.length && !skillTokens.length) {
      return [] as RecommendationResult[];
    }

    const scored = careerProfiles
      .map((profile) => {
        let score = 0;

        const interestMatches = profile.interestTags.filter((tag) =>
          interestTokens.some((token) => tag.includes(token) || token.includes(tag)),
        );
        const skillMatches = profile.skillTags.filter((tag) =>
          skillTokens.some((token) => tag.includes(token) || token.includes(tag)),
        );

        score += interestMatches.length * 3;
        score += skillMatches.length * 2;

        if (educationStream === "any") {
          score += 1;
        } else if (profile.matchFor.includes(educationStream)) {
          score += 4;
        }

        const reasonParts = [
          interestMatches.length > 0 ? `${interestMatches.length} interest match` : "",
          skillMatches.length > 0 ? `${skillMatches.length} skill match` : "",
          educationStream !== "any" && profile.matchFor.includes(educationStream)
            ? "stream-aligned"
            : "",
        ].filter(Boolean);

        return {
          ...profile,
          score,
          reason: reasonParts.length > 0 ? reasonParts.join(" • ") : "broad profile fit",
        };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    return scored;
  }, [educationStream, interests, skills]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);
  };

  return (
    <HUDPanel title="AI CAREER RECOMMENDER" delay={0.07}>
      <div className="p-4 md:p-6 space-y-6">
        <div className="rounded-md border border-primary/30 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 p-4">
          <div className="flex items-center gap-2 mb-1">
            <BrainCircuit className="h-4 w-4 text-primary" />
            <p className="font-display text-sm md:text-base tracking-wide text-foreground">
              Personalized Career Suggestions
            </p>
          </div>
          <p className="font-body text-sm text-foreground/80">
            Enter your interests, key skills, and stream to get top-fit career paths.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <label className="space-y-2 lg:col-span-1">
            <span className="font-mono text-[11px] tracking-widest text-primary">INTERESTS</span>
            <textarea
              value={interests}
              onChange={(event) => setInterests(event.target.value)}
              placeholder="AI, biology, design, law, finance..."
              rows={5}
              className="w-full rounded-md border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50"
            />
          </label>

          <label className="space-y-2 lg:col-span-1">
            <span className="font-mono text-[11px] tracking-widest text-secondary">SKILLS</span>
            <textarea
              value={skills}
              onChange={(event) => setSkills(event.target.value)}
              placeholder="communication, coding, creativity, leadership..."
              rows={5}
              className="w-full rounded-md border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-secondary/50"
            />
          </label>

          <div className="space-y-2 lg:col-span-1">
            <label className="block space-y-2">
              <span className="font-mono text-[11px] tracking-widest text-accent">
                EDUCATION STREAM
              </span>
              <div className="relative">
                <GraduationCap className="h-4 w-4 text-accent absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={educationStream}
                  onChange={(event) => setEducationStream(event.target.value as EducationStream)}
                  className="w-full appearance-none rounded-md border border-border/70 bg-background/70 pl-10 pr-3 py-2.5 text-sm text-foreground outline-none focus:border-accent/60"
                >
                  {educationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <button
              type="submit"
              className="w-full rounded-md border border-primary/40 bg-primary/15 px-4 py-2.5 font-mono text-xs tracking-widest text-primary hover:bg-primary/25 transition-colors"
            >
              GENERATE RECOMMENDATIONS
            </button>
            <p className="font-body text-xs text-muted-foreground">
              Tip: Use comma-separated keywords for better accuracy.
            </p>
          </div>
        </form>

        {hasSubmitted && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="font-display text-sm md:text-base text-foreground tracking-wide">
                Recommended Career Paths
              </h3>
            </div>

            {recommendations.length === 0 ? (
              <div className="rounded-md border border-border/70 bg-card/50 p-4">
                <p className="font-body text-sm text-muted-foreground">
                  Add a few interests and skills to generate accurate suggestions.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {recommendations.map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    className="rounded-md border border-primary/25 bg-card/70 backdrop-blur-sm p-4 hud-bracket hover:glow-cyan transition-all"
                  >
                    <div className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-display text-sm text-foreground tracking-wide">
                          {item.title}
                        </h4>
                        <p className="font-mono text-[10px] text-primary mt-1">
                          MATCH SCORE: {item.score}
                        </p>
                      </div>
                    </div>
                    <p className="font-body text-sm text-foreground/85 mt-3">{item.description}</p>
                    <p className="font-mono text-[10px] text-secondary tracking-wide mt-2 uppercase">
                      {item.reason}
                    </p>
                    <p className="font-body text-xs text-muted-foreground mt-3">
                      {item.pathways.slice(0, 3).join(" • ")}
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate(`/career/${item.id}`)}
                      className="mt-4 w-full rounded-md border border-secondary/40 bg-secondary/10 px-3 py-2 font-mono text-xs tracking-widest text-secondary hover:bg-secondary/20 transition-colors"
                    >
                      OPEN CAREER GUIDE
                    </button>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </HUDPanel>
  );
};

export default AICareerRecommender;
