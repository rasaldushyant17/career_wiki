/**
 * Index.tsx - Home Page (Dashboard)
 * ==================================
 * This is the LANDING PAGE — the first page users see.
 * 
 * REACT vs HTML/CSS/JS COMPARISON:
 * ─────────────────────────────────
 * HTML:  <div class="box">         →  React: <div className="box">
 * HTML:  <a href="/page">          →  React: navigate("/page")  (no page reload)
 * JS:    document.addEventListener →  React: onClick={handleClick}
 * JS:    for loop + innerHTML      →  React: array.map() inside JSX
 * JS:    let myVar = "hello"       →  React: const [myVar, setMyVar] = useState("hello")
 * CSS:   <link rel="stylesheet">   →  React: import "./styles.css"
 * 
 * WHAT IS A "COMPONENT"?
 * A component is a reusable piece of HTML.
 * Instead of copy-pasting the same HTML, you create a function that returns it.
 * Example: <HUDPanel> is a component we made — it's a styled box with a title bar.
 */

import { motion } from "framer-motion";           // Animation library (like CSS animations but in JS)
import { useLocation, useNavigate } from "react-router-dom";    // For changing pages (like window.location but smoother)
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Radio, ChevronRight, Search, X, Compass, Brain, Tags, LayoutGrid, Sparkles, Github, ExternalLink, UserRound } from "lucide-react"; // Icon library (SVG icons as components)
import { dashboardSections } from "@/data/careers"; // Our career data (like a JSON file)
import HUDPanel from "@/components/HUDPanel";       // Reusable panel component we built
import CareerLogo from "@/components/CareerLogo";
import CareerRecommendationQuiz from "@/components/CareerRecommendationQuiz";
import CareerKeywordExplorer from "@/components/CareerKeywordExplorer";
import AICareerRecommender from "@/components/AICareerRecommender";

const Index = () => {
  // useNavigate = gives us a function to change pages
  // In plain JS, you'd write: window.location.href = "/career/commerce"
  // In React:                  navigate("/career/commerce")  ← no page reload!
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNavSection, setActiveNavSection] = useState("smart-search");
  const pathCareerId = new URLSearchParams(location.search).get("path");

  /**
   * handleCardClick — runs when user clicks a career card
   * 
   * In plain JavaScript, this would be:
   *   document.querySelector('.card').addEventListener('click', function() {
   *     window.location.href = '/career/' + id;
   *   });
   * 
   * In React, we attach it directly: onClick={() => handleCardClick(id, type)}
   */
  const handleCardClick = (id: string, type: string) => {
    if (type === "faq") {
      navigate(`/faq/${id}`);      // Go to FAQ page
    } else {
      navigate(`/career/${id}`);   // Go to Career Detail page
    }
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredSections = useMemo(() => {
    if (!normalizedQuery) {
      return dashboardSections;
    }

    return dashboardSections
      .map((section) => {
        const cards = section.cards.filter((card) => {
          const haystack = `${section.heading} ${card.title} ${card.description} ${card.id} ${card.type}`.toLowerCase();
          return haystack.includes(normalizedQuery);
        });

        return { ...section, cards };
      })
      .filter((section) => section.cards.length > 0);
  }, [normalizedQuery]);

  const quickResults = useMemo(() => {
    const allCards = filteredSections.flatMap((section) =>
      section.cards.map((card) => ({ ...card, heading: section.heading })),
    );

    if (!normalizedQuery) {
      return allCards.slice(0, 6);
    }

    const scoreCard = (title: string, id: string, description: string) => {
      const q = normalizedQuery;
      const t = title.toLowerCase();
      const i = id.toLowerCase();
      const d = description.toLowerCase();

      if (t === q || i === q) return 0;
      if (t.startsWith(q) || i.startsWith(q)) return 1;
      if (t.includes(q)) return 2;
      if (d.includes(q)) return 3;
      return 4;
    };

    return allCards
      .sort(
        (a, b) =>
          scoreCard(a.title, a.id, a.description) -
          scoreCard(b.title, b.id, b.description),
      )
      .slice(0, 6);
  }, [filteredSections, normalizedQuery]);
  const quickSuggestions = useMemo(() => dashboardSections.flatMap((section) => section.cards).slice(0, 8), []);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!normalizedQuery) {
      navigate("/career-tree");
      return;
    }
    if (quickResults.length > 0) {
      handleCardClick(quickResults[0].id, quickResults[0].type);
    }
  };

  const jumpToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveNavSection(id);
  };

  const navItems = [
    { id: "smart-search", label: "SEARCH", icon: Compass },
    { id: "keyword-explorer", label: "PATHFINDER", icon: Tags },
    { id: "career-streams", label: "STREAMS", icon: LayoutGrid },
    { id: "ai-recommendation", label: "AI MATCH", icon: Sparkles },
    { id: "quiz-zone", label: "QUIZ", icon: Brain },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionOffsets = navItems
        .map((item) => {
          const element = document.getElementById(item.id);
          if (!element) return null;
          const offset = Math.abs(element.getBoundingClientRect().top - 130);
          return { id: item.id, offset };
        })
        .filter(Boolean) as { id: string; offset: number }[];

      if (sectionOffsets.length === 0) return;
      sectionOffsets.sort((a, b) => a.offset - b.offset);
      setActiveNavSection(sectionOffsets[0].id);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!pathCareerId) return;
    document.getElementById("keyword-explorer")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setActiveNavSection("keyword-explorer");
  }, [pathCareerId]);

  // Everything inside return() is JSX — it looks like HTML!
  // KEY DIFFERENCES FROM HTML:
  //   class=""  →  className=""
  //   style=""  →  style={{ }}
  //   onclick   →  onClick
  return (
    <div className="min-h-screen bg-background hud-scanlines hud-grid-bg">
      {/* ↑ min-h-screen = min-height: 100vh (full screen height)
            bg-background = background-color: var(--background)
            hud-scanlines = our custom CSS class (adds scanline overlay)
            hud-grid-bg   = our custom CSS class (adds grid pattern) */}

      {/* ==================== HEADER ==================== 
          This is like <header> in HTML — sticky navigation bar.
          
          sticky top-0 = position: sticky; top: 0; (stays at top when scrolling)
          z-50 = z-index: 50 (appears above other content)
          backdrop-blur-md = backdrop-filter: blur(12px) (glass effect)
      */}
      <header className="border-b border-border/50 bg-gradient-to-r from-background/95 via-background/90 to-background/95 backdrop-blur-md sticky top-0 z-50 shadow-[0_8px_30px_hsl(185_100%_50%_/_0.1)]">
        <div className="container mx-auto px-4 py-4">
          {/* container mx-auto = max-width with auto margins (centers content)
              px-4 = padding-left & padding-right: 1rem
              py-4 = padding-top & padding-bottom: 1rem */}

          <div className="flex items-center justify-between">
            {/* flex = display: flex
                items-center = align-items: center (vertically centered)
                justify-between = justify-content: space-between */}

            {/* Left side: Logo + Title */}
            <div className="flex items-center gap-3">
              {/* gap-3 = gap: 0.75rem (space between flex children) */}

              {/* motion.div = animated div (from Framer Motion library)
                  initial = starting state, animate = ending state
                  This makes the icon "pop in" with a spring bounce */}
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.1 }}>
                <CareerLogo />
              </motion.div>

              <div>
                <h1 className="font-display text-lg font-bold tracking-[0.08em] text-foreground glow-text-cyan">
                  {/* font-display = font-family: 'Orbitron'
                      text-lg = font-size: 1.125rem
                      font-bold = font-weight: 700
                      tracking-[0.15em] = letter-spacing: 0.15em
                      glow-text-cyan = our custom text-shadow class */}
                  CAREER WIKI
                </h1>
                <p className="font-mono text-[10px] text-muted-foreground tracking-[0.15em]">
                  {/* font-mono = monospace font
                      text-[10px] = font-size: 10px (custom size)
                      tracking-widest = letter-spacing: 0.1em */}
                  GUIDED CAREER OPTIONS AFTER 10TH & 12TH
                </p>
                <p className="font-mono text-[10px] text-primary/80 tracking-[0.2em] mt-1">
                  DISCOVER YOUR BEST PATH
                </p>
              </div>
            </div>

            {/* Right side: Status indicator (hidden on mobile screens) */}
            <div className="hidden md:flex items-center gap-4">
              {/* hidden = display: none (hidden by default)
                  md:flex = display: flex on medium+ screens (768px+)
                  This is RESPONSIVE DESIGN — different styles for different screen sizes */}
              <div className="flex items-center gap-1.5">
                <Radio className="h-3 w-3 text-secondary animate-pulse" />
                {/* animate-pulse = CSS animation that fades in/out */}
                <span className="font-mono text-[10px] text-secondary">LIVE</span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">v3.0</span>
            </div>

          </div>

          <div className="mt-3 border-t border-border/40 pt-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">QUICK NAVIGATION</span>
              <div className="h-px flex-1 bg-border/50" />
            </div>
            <div className="flex flex-wrap gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNavSection === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => jumpToSection(item.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border text-xs font-mono tracking-wide transition-colors ${
                      isActive
                        ? "border-primary/60 bg-gradient-to-r from-primary/20 to-secondary/15 text-primary"
                        : "border-border/60 bg-background/50 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="container mx-auto px-4 py-8 space-y-10">
        <HUDPanel title="START HERE" delay={0.03}>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
            <button
              onClick={() => jumpToSection("smart-search")}
              className="min-h-24 rounded-md border border-primary/40 bg-gradient-to-br from-primary/15 to-primary/5 p-3.5 text-left hover:from-primary/20 hover:to-primary/10 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-primary" />
                <p className="font-display text-sm text-foreground tracking-wide">Find Fast</p>
              </div>
              <p className="font-body text-sm text-foreground/80 mt-1">Search and open the right stream instantly.</p>
            </button>
            <button
              onClick={() => jumpToSection("keyword-explorer")}
              className="min-h-24 rounded-md border border-accent/40 bg-gradient-to-br from-accent/15 to-accent/5 p-3.5 text-left hover:from-accent/20 hover:to-accent/10 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Tags className="h-4 w-4 text-accent" />
                <p className="font-display text-sm text-foreground tracking-wide">Pathfinder Hub</p>
              </div>
              <p className="font-body text-sm text-foreground/80 mt-1">Explore paths with roadmap and eligibility shortcuts.</p>
            </button>
            <button
              onClick={() => jumpToSection("career-streams")}
              className="min-h-24 rounded-md border border-primary/40 bg-gradient-to-br from-primary/15 to-primary/5 p-3.5 text-left hover:from-primary/20 hover:to-primary/10 transition-colors"
            >
              <div className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 text-primary" />
                <p className="font-display text-sm text-foreground tracking-wide">Career Streams</p>
              </div>
              <p className="font-body text-sm text-foreground/80 mt-1">Browse all structured stream cards quickly.</p>
            </button>
            <button
              onClick={() => jumpToSection("ai-recommendation")}
              className="min-h-24 rounded-md border border-primary/40 bg-gradient-to-br from-primary/15 to-primary/5 p-3.5 text-left hover:from-primary/20 hover:to-primary/10 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <p className="font-display text-sm text-foreground tracking-wide">AI Match</p>
              </div>
              <p className="font-body text-sm text-foreground/80 mt-1">Get career recommendations from your profile.</p>
            </button>
            <button
              onClick={() => jumpToSection("quiz-zone")}
              className="min-h-24 rounded-md border border-secondary/40 bg-gradient-to-br from-secondary/15 to-secondary/5 p-3.5 text-left hover:from-secondary/20 hover:to-secondary/10 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-secondary" />
                <p className="font-display text-sm text-foreground tracking-wide">Quick Quiz</p>
              </div>
              <p className="font-body text-sm text-foreground/80 mt-1">Answer simple questions for path suggestions.</p>
            </button>
          </div>
        </HUDPanel>

        <section id="smart-search" className="space-y-2 scroll-mt-24">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-primary" />
            <h2 className="font-display text-sm text-foreground tracking-wide">Smart Search</h2>
          </div>
          <p className="font-body text-xs text-muted-foreground">Type any stream, exam, or career term to jump to the best match.</p>
        </section>

        <HUDPanel title="SMART SEARCH" delay={0.05}>
          <div className="p-4 space-y-3">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 border border-border bg-background/60 px-3 py-2">
                <Search className="h-4 w-4 text-primary" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search careers, exams, streams, or FAQs..."
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="border border-border px-2.5 py-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
                <button type="submit" className="rounded-md border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-xs text-primary">
                  {normalizedQuery ? "Open Best Match" : "Open Career Tree"}
                </button>
            </form>

            {normalizedQuery ? (
              quickResults.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {quickResults.map((card) => (
                    <button
                      key={card.id}
                      onClick={() => handleCardClick(card.id, card.type)}
                      className="border border-secondary/30 bg-secondary/10 px-3 py-1.5 text-left"
                    >
                      <div className="font-body text-xs text-foreground">{card.title}</div>
                      <div className="font-mono text-[10px] text-secondary">{card.heading}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="font-body text-sm text-muted-foreground">No match found. Try keywords like law, commerce, science, or parents.</p>
              )
            ) : (
              <p className="font-body text-sm text-muted-foreground">
                Type and press Enter to open the best match instantly.
              </p>
            )}

            {!normalizedQuery && (
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleCardClick(item.id, item.type)}
                    className="border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] text-primary hover:bg-primary/10"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </HUDPanel>

        <section id="keyword-explorer" className="space-y-2 scroll-mt-24">
          <div className="flex items-center gap-2">
            <Tags className="h-4 w-4 text-accent" />
            <h2 className="font-display text-sm text-foreground tracking-wide">Career Pathfinder Hub</h2>
          </div>
          <p className="font-body text-xs text-muted-foreground">Pick a path and instantly open roadmap, eligibility, and official result pages.</p>
        </section>

        <CareerKeywordExplorer pathCareerId={pathCareerId} />

        <section id="career-streams" className="space-y-2 scroll-mt-24">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-primary" />
            <h2 className="font-display text-sm text-foreground tracking-wide">Career Streams</h2>
          </div>
          <p className="font-body text-xs text-muted-foreground">Browse all structured stream cards and open detailed internal guides.</p>
        </section>

        {/* space-y-10 = adds vertical spacing between child elements
            Same as: > * + * { margin-top: 2.5rem; } */}

        {/* LOOPING THROUGH DATA:
            In plain JS:  for (let i = 0; i < sections.length; i++) { ... }
            In React JSX: {sections.map((section, index) => ( <div>...</div> ))}
            
            .map() creates one <div> for EACH section in our data array */}
        {filteredSections.map((section, sectionIdx) => (
          <div key={section.heading}>
            {/* key={} is required by React when creating lists
                It helps React track which items changed */}

            {/* ---------- Section Heading ---------- */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: sectionIdx * 0.15 }}
              className="flex items-center gap-3 mb-5"
            >
              {/* Gradient accent bar (thin vertical line) */}
              <div className="h-8 w-1 bg-gradient-to-b from-primary to-secondary rounded-full" />
              {/* bg-gradient-to-b = background: linear-gradient(to bottom, ...)
                  from-primary = starts with var(--primary) color
                  to-secondary = ends with var(--secondary) color */}

              <div>
                <div className="font-mono text-[10px] text-muted-foreground tracking-widest">
                  SECTION {sectionIdx + 1}
                  {/* sectionIdx starts at 0, so +1 makes it human-readable */}
                </div>
                <h2 className="font-display text-sm md:text-base tracking-wide text-foreground">
                  {section.heading}
                </h2>
              </div>
            </motion.div>

            {/* ---------- Cards Grid ---------- 
                RESPONSIVE GRID LAYOUT:
                grid-cols-1   = 1 column on small screens (mobile)
                sm:grid-cols-2 = 2 columns on 640px+ screens
                lg:grid-cols-3 = 3 columns on 1024px+ screens
                xl:grid-cols-4 = 4 columns on 1280px+ screens
                gap-4 = 1rem gap between cards
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

              {section.cards.map((card, cardIdx) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: sectionIdx * 0.1 + cardIdx * 0.05 }}
                  onClick={() => handleCardClick(card.id, card.type)}
                  className="group cursor-pointer border border-border bg-card/60 backdrop-blur-sm p-5 transition-all duration-300 hover:bg-card/90 hud-bracket hover:glow-cyan"
                >
                  {/* "group" class = lets child elements react to parent hover
                      cursor-pointer = cursor: pointer (hand icon)
                      transition-all duration-300 = smooth transitions over 300ms
                      hover:bg-card/90 = darker background on hover
                      hover:glow-cyan = cyan glow effect on hover */}

                  {/* Card Title */}
                  <h3 className="font-display text-sm font-semibold text-foreground tracking-wide mb-2 group-hover:glow-text-cyan transition-all">
                    {/* group-hover:glow-text-cyan = when PARENT (.group) is hovered,
                        add cyan text glow to THIS element */}
                    {card.title}
                  </h3>

                  {/* Card Description */}
                  <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">
                    {/* leading-relaxed = line-height: 1.625 (easier to read) */}
                    {card.description}
                  </p>

                  {/* Call-to-Action (CTA) */}
                  <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-primary group-hover:text-secondary transition-colors">
                    <ChevronRight className="h-3 w-3" />
                    <span>{card.buttonText.toUpperCase()}</span>
                    {/* .toUpperCase() = JavaScript string method, makes text ALL CAPS */}
                  </div>

                  {/* Hover glow overlay — invisible by default, appears on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                    {/* opacity-0 = invisible
                        group-hover:opacity-100 = visible when parent hovered
                        pointer-events-none = clicks pass through */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
                  </div>
                </motion.div>
              ))}

            </div>
          </div>
        ))}

        <section id="ai-recommendation" className="space-y-2 scroll-mt-24">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="font-display text-sm text-foreground tracking-wide">AI Career Recommendation</h2>
          </div>
          <p className="font-body text-xs text-muted-foreground">
            Fill in your interests, skills, and stream to get personalized career matches.
          </p>
        </section>

        <AICareerRecommender />

        <section id="quiz-zone" className="space-y-2 scroll-mt-24">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-secondary" />
            <h2 className="font-display text-sm text-foreground tracking-wide">Career Quiz</h2>
          </div>
          <p className="font-body text-xs text-muted-foreground">Answer 10 quick questions to discover your top-fit streams.</p>
        </section>

        <CareerRecommendationQuiz />

        <section id="about-developer" className="space-y-2 scroll-mt-24">
          <div className="flex items-center gap-2">
            <UserRound className="h-4 w-4 text-primary" />
            <h2 className="font-display text-sm text-foreground tracking-wide">About Developer</h2>
          </div>
          <p className="font-body text-xs text-muted-foreground">
            Project ownership, credits, and developer profile.
          </p>
        </section>

        <HUDPanel title="ABOUT DEVELOPER & PROJECT CREDITS" delay={0.16}>
          <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <article className="lg:col-span-2 rounded-xl border border-white/40 bg-white/55 backdrop-blur-xl p-4 md:p-5">
              <p className="font-mono text-[10px] tracking-widest text-primary">PROJECT OVERVIEW</p>
              <h3 className="font-display text-base md:text-lg text-foreground mt-2">
                Designed and Developed by Dushyant Rasal
              </h3>
              <p className="font-body text-sm text-foreground/80 mt-2 leading-relaxed">
                Career Wiki is a modern guidance platform created to help students explore career
                streams, compare opportunities, and make confident academic decisions using
                structured roadmaps, smart search, and AI-assisted recommendations.
              </p>
            </article>

            <article className="rounded-xl border border-white/40 bg-white/55 backdrop-blur-xl p-4 md:p-5">
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4 text-foreground" />
                <p className="font-display text-sm text-foreground">GitHub Profile</p>
              </div>
              <p className="font-body text-xs text-muted-foreground mt-2">
                Follow project updates, code contributions, and portfolio work.
              </p>
              <a
                href="https://github.com/rasaldushyant17/career_wiki"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-xs text-primary hover:bg-primary/20 transition-colors"
              >
                Visit GitHub
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </article>
          </div>
        </HUDPanel>

      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-border/30 mt-12 py-6 bg-gradient-to-r from-white/40 via-white/30 to-white/40 backdrop-blur-lg">
        <div className="container mx-auto px-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-[11px] text-foreground/80 tracking-widest">
              © {new Date().getFullYear()} Career Wiki. All Rights Reserved.
            </p>
            <p className="font-body text-sm text-muted-foreground mt-1">
              Designed and Developed by Dushyant Rasal
            </p>
          </div>
          <a
            href="https://github.com/rasaldushyant17/career_wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border/70 bg-white/60 px-3 py-2 font-mono text-xs text-foreground hover:border-primary/40 hover:text-primary transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            github.com/rasaldushyant17/career_wiki
          </a>
        </div>
      </footer>

    </div>
  );
};

export default Index;
