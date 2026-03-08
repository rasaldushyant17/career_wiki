import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronDown, ExternalLink, Filter, Info, Search, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HUDPanel from "@/components/HUDPanel";
import { careerFields } from "@/data/careers";
import { keywordRoadmaps } from "@/data/keywordRoadmaps";

type LinkKey = "roadmap" | "eligibility" | "official" | "combined";

const linkLabels: Record<LinkKey, string> = {
  roadmap: "Roadmap",
  eligibility: "Eligibility",
  official: "Official",
  combined: "Combined",
};

const searchIntentByLink: Record<LinkKey, string> = {
  roadmap: "career roadmap after 10th 12th India",
  eligibility: "eligibility criteria India official",
  official: "official website India",
  combined: "roadmap eligibility official links India",
};

const allCategories = Array.from(new Set(keywordRoadmaps.map((item) => item.category)));

interface CareerKeywordExplorerProps {
  pathCareerId?: string | null;
}

const googleSearchUrl = (text: string) =>
  `https://www.google.com/search?q=${encodeURIComponent(text)}`;

const getResourceSearchUrl = (keyword: string, linkType: LinkKey) =>
  googleSearchUrl(`${keyword} ${searchIntentByLink[linkType]}`);

const CareerKeywordExplorer = ({ pathCareerId }: CareerKeywordExplorerProps) => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [pickedKeywords, setPickedKeywords] = useState<string[]>([]);
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([...allCategories]);
  const [activePfNav, setActivePfNav] = useState("pf-library");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredItems = useMemo(() => {
    return keywordRoadmaps.filter((item) => {
      const categoryMatch = activeCategory === "All" || item.category === activeCategory;
      if (!categoryMatch) return false;

      if (!normalizedQuery) return true;

      const searchableText = [
        item.keyword,
        item.description,
        item.category,
        item.careerId ?? "",
        ...(item.aliases ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [activeCategory, normalizedQuery]);

  const groupedItems = useMemo(() => {
    return filteredItems.reduce<Record<string, typeof filteredItems>>((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [filteredItems]);

  const selectedItem = useMemo(() => {
    if (!selectedKeyword) return undefined;
    return filteredItems.find((item) => item.keyword === selectedKeyword);
  }, [filteredItems, selectedKeyword]);

  const pathCareer = useMemo(
    () => (pathCareerId ? careerFields.find((career) => career.id === pathCareerId) : undefined),
    [pathCareerId],
  );
  const pathBestProfessions = useMemo(() => pathCareer?.prospects.slice(0, 8) ?? [], [pathCareer]);

  const recommendedCareerId = useMemo(() => {
    if (pickedKeywords.length === 0) return undefined;

    const scoreByCareer = pickedKeywords.reduce<Record<string, number>>((acc, keyword) => {
      const selected = keywordRoadmaps.find((item) => item.keyword === keyword);
      if (!selected?.careerId) return acc;
      acc[selected.careerId] = (acc[selected.careerId] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(scoreByCareer).sort((a, b) => b[1] - a[1])[0]?.[0];
  }, [pickedKeywords]);

  const recommendedCareer = useMemo(
    () => careerFields.find((career) => career.id === recommendedCareerId),
    [recommendedCareerId],
  );

  const compareGoogleUrl = useMemo(() => {
    if (pickedKeywords.length < 2) return "";
    return googleSearchUrl(`${pickedKeywords.join(" vs ")} roadmap eligibility scope India`);
  }, [pickedKeywords]);

  const toggleKeywordPick = (keyword: string) => {
    setPickedKeywords((prev) => {
      if (prev.includes(keyword)) return prev.filter((entry) => entry !== keyword);
      if (prev.length >= 5) return [...prev.slice(1), keyword];
      return [...prev, keyword];
    });
  };

  const handleSelectKeyword = (keyword: string) => {
    setSelectedKeyword((prev) => (prev === keyword ? null : keyword));
    setPickedKeywords((prev) => {
      if (prev.includes(keyword)) return prev;
      if (prev.length >= 5) return [...prev.slice(1), keyword];
      return [...prev, keyword];
    });
  };

  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((entry) => entry !== category)
        : [...prev, category],
    );
  };

  const pfNavItems = [
    { id: "pf-library", label: "LIBRARY" },
    { id: "pf-selected", label: "SELECTED" },
    { id: "pf-compare", label: "COMPARE" },
  ];
  const howItWorks = [
    "Search or pick a category to find relevant career paths.",
    "Click any keyword to open roadmap and eligibility actions.",
    "Optionally pick up to 5 paths and compare them for clarity.",
  ];

  const jumpToPathfinderBlock = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActivePfNav(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = pfNavItems
        .map((item) => {
          const element = document.getElementById(item.id);
          if (!element) return null;
          const offset = Math.abs(element.getBoundingClientRect().top - 150);
          return { id: item.id, offset };
        })
        .filter(Boolean) as { id: string; offset: number }[];

      if (sections.length === 0) return;
      sections.sort((a, b) => a.offset - b.offset);
      setActivePfNav(sections[0].id);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HUDPanel title="CAREER PATHFINDER HUB" delay={0.12}>
      <div className="p-4 space-y-4">
        <p className="font-body text-sm text-muted-foreground">
          Browse by category, select a path, and use quick roadmap/eligibility actions.
        </p>

        <div className="rounded-md border border-primary/30 bg-primary/10 p-3.5 space-y-3">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            <p className="font-display text-sm text-foreground">How Pathfinder Works</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {howItWorks.map((step, idx) => (
              <div
                key={step}
                className="rounded-md border border-primary/25 bg-background/70 px-3 py-2.5"
              >
                <p className="font-mono text-[10px] text-primary tracking-widest">STEP {idx + 1}</p>
                <p className="font-body text-xs text-foreground/85 mt-1">{step}</p>
              </div>
            ))}
          </div>
          <p className="font-body text-xs text-muted-foreground">
            Tip: Use short terms like <span className="font-mono">ca</span>,{" "}
            <span className="font-mono">neet</span>, <span className="font-mono">nda</span>,{" "}
            <span className="font-mono">design</span>, or <span className="font-mono">diploma</span>.
          </p>
        </div>

        <div className="sticky top-[92px] z-30 w-full">
          <div className="mx-auto w-fit rounded-md border border-primary/30 bg-background/95 backdrop-blur-md p-2 shadow-[0_8px_24px_hsl(185_100%_50%_/_0.18)]">
            <div className="flex flex-wrap gap-2">
              {pfNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => jumpToPathfinderBlock(item.id)}
                  className={`rounded-md border px-3 py-1.5 text-[11px] font-mono transition-colors ${
                    activePfNav === item.id
                      ? "border-primary/50 bg-primary/15 text-primary"
                      : "border-border/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {pathCareer && (
          <div className="rounded-md border border-primary/40 bg-primary/10 p-3 space-y-2">
            <div className="font-display text-sm text-foreground">
              Best Professions For Path: {pathCareer.title}
            </div>
            <p className="font-body text-xs text-foreground/85">
              Suggested from your selected path in Career Tree.
            </p>
            <div className="flex flex-wrap gap-2">
              {pathBestProfessions.map((profession) => (
                <a
                  key={profession.name}
                  href={googleSearchUrl(`${profession.name} career roadmap India`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 border border-primary/40 bg-background/70 text-[11px] text-primary hover:bg-primary/20"
                >
                  {profession.name}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div id="pf-library" className="lg:col-span-7 space-y-3 scroll-mt-36">
            <div className="flex items-center gap-2 border border-border bg-background/60 px-3 py-2">
              <Search className="h-4 w-4 text-primary" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search any path: nda, ca, bams, design, diploma..."
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                <Filter className="h-3.5 w-3.5" />
                CATEGORY
              </span>
              <button
                onClick={() => setActiveCategory("All")}
                className={`px-3 py-2 rounded-md border text-xs font-mono ${
                  activeCategory === "All"
                    ? "border-primary/50 bg-primary/15 text-primary"
                    : "border-border/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                ALL ({keywordRoadmaps.length})
              </button>
              {allCategories.map((category) => {
                const count = keywordRoadmaps.filter((item) => item.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-2 rounded-md border text-xs font-mono ${
                      activeCategory === category
                        ? "border-primary/50 bg-primary/15 text-primary"
                        : "border-border/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {category.toUpperCase()} ({count})
                  </button>
                );
              })}
            </div>

            <div className="max-h-[540px] overflow-y-auto pr-1 space-y-3 border border-border/50 bg-card/40 p-3">
              {Object.entries(groupedItems).map(([category, items]) => {
                const isCollapsed = collapsedCategories.includes(category);

                return (
                  <div key={category} className="space-y-2">
                    <button
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className={`w-full rounded-md flex items-center justify-between border px-3 py-2.5 text-left transition-colors ${
                        isCollapsed
                          ? "border-border/50 bg-background/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                          : "border-secondary/50 bg-secondary/15 text-secondary"
                      }`}
                    >
                      <div className="font-mono text-[10px] tracking-widest text-secondary">
                        {category.toUpperCase()} ({items.length})
                      </div>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform ${
                          isCollapsed ? "-rotate-90 text-muted-foreground" : "text-secondary"
                        }`}
                      />
                    </button>

                    {!isCollapsed && (
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => {
                          const isActive = selectedItem?.keyword === item.keyword;
                          const isPicked = pickedKeywords.includes(item.keyword);

                          return (
                            <button
                              key={item.keyword}
                              onClick={() => handleSelectKeyword(item.keyword)}
                              className={`px-3 py-2 rounded-md border text-xs text-left ${
                                isActive
                                  ? "border-primary/50 bg-primary/15 text-primary"
                                  : "border-border/60 bg-background/40 text-foreground/85 hover:border-primary/30"
                              }`}
                            >
                              {item.keyword}
                              {isPicked ? (
                                <span className="ml-1.5 font-mono text-[10px] text-secondary">
                                  [PICKED]
                                </span>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredItems.length === 0 && (
                <div className="rounded-md border border-border/60 bg-background/60 p-3">
                  <p className="font-body text-sm text-muted-foreground">
                    No matching path found. Try shorter terms like <span className="font-mono">ca</span>,{" "}
                    <span className="font-mono">nda</span>, <span className="font-mono">neet</span>, or{" "}
                    <span className="font-mono">diploma</span>.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <div id="pf-selected" className="border border-border/60 bg-card/60 p-3 space-y-3 scroll-mt-36">
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground">
                SELECTED PATH DETAILS
              </p>
              {selectedItem ? (
                <>
                  <div>
                    <p className="font-display text-sm text-foreground">{selectedItem.keyword}</p>
                    <p className="font-mono text-[10px] text-secondary mt-1">{selectedItem.category}</p>
                  </div>
                  <p className="font-body text-xs text-foreground/80 leading-relaxed">
                    {selectedItem.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(selectedItem.links) as LinkKey[])
                      .filter((key) => Boolean(selectedItem.links[key]))
                      .map((key) => (
                        <a
                          key={key}
                          href={getResourceSearchUrl(selectedItem.keyword, key)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 border border-primary/40 bg-primary/10 text-xs text-primary hover:bg-primary/20"
                        >
                          {linkLabels[key]}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ))}
                  </div>
                  <div className="rounded-md border border-secondary/30 bg-secondary/10 p-2.5">
                    <p className="font-body text-xs text-foreground/85">
                      Next action: open <span className="font-mono">Roadmap</span> first, then check{" "}
                      <span className="font-mono">Eligibility</span> for faster decision-making.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedKeyword(null)}
                      className="px-3 py-2 rounded-md border border-border/70 bg-background/50 text-xs font-mono text-muted-foreground hover:text-foreground"
                    >
                      Clear Selection
                    </button>
                    <button
                      onClick={() => toggleKeywordPick(selectedItem.keyword)}
                      className="px-3 py-2 rounded-md border border-secondary/40 bg-secondary/10 text-xs font-mono text-secondary"
                    >
                      {pickedKeywords.includes(selectedItem.keyword)
                        ? "Remove From Compare"
                        : "Add To Compare"}
                    </button>
                    {selectedItem.careerId && (
                      <button
                        onClick={() => navigate(`/career/${selectedItem.careerId}`)}
                        className="px-3 py-2 rounded-md border border-border/70 bg-background/50 text-xs font-mono text-muted-foreground hover:text-foreground"
                      >
                        Open Internal Guide
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="rounded-md border border-border/60 bg-background/60 p-3">
                  <p className="font-body text-sm text-muted-foreground">
                    Select any keyword from the library to view roadmap, eligibility, and official
                    links here.
                  </p>
                </div>
              )}
            </div>

            <div id="pf-compare" className="border border-border/60 bg-card/60 p-3 space-y-2 scroll-mt-36">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <p className="font-display text-sm text-foreground">Compare & Clarity (Optional)</p>
              </div>
              <p className="font-body text-xs text-muted-foreground">
                Picking paths is optional. You can directly open roadmap, eligibility, and official
                Google results without picking.
              </p>

              {pickedKeywords.length > 0 && (
                <div className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  <span className="font-mono text-[11px] text-primary">
                    {pickedKeywords.length} path(s) selected
                  </span>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {pickedKeywords.length > 0 && (
                  <button
                    onClick={() => setPickedKeywords([])}
                    className="px-3 py-2 rounded-md border border-accent/40 bg-accent/10 text-xs font-mono text-accent"
                  >
                    Clear Picks
                  </button>
                )}
                {pickedKeywords.length >= 2 && (
                  <a
                    href={compareGoogleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 border border-primary/40 bg-primary/10 text-xs font-mono text-primary hover:bg-primary/20"
                  >
                    Compare Picks On Google
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {pickedKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-2.5 py-1 border border-secondary/40 bg-secondary/10 text-[11px] font-mono text-secondary"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              {recommendedCareer && (
                <div className="border border-primary/30 bg-primary/10 p-3 space-y-2">
                  <p className="font-body text-sm text-foreground">
                    Clarity Suggestion: {recommendedCareer.title}
                  </p>
                  <button
                    onClick={() => navigate(`/career/${recommendedCareer.id}`)}
                    className="px-3 py-1.5 rounded-md border border-primary/40 bg-background/50 font-mono text-xs text-primary hover:bg-primary/10"
                  >
                    Open Suggested Stream
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </HUDPanel>
  );
};

export default CareerKeywordExplorer;
