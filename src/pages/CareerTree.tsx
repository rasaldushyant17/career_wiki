import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Minus,
  Plus,
  Search,
} from "lucide-react";
import HUDPanel from "@/components/HUDPanel";
import { careerTree, CareerTreeNode } from "@/data/careerTree";

const flattenIds = (node: CareerTreeNode): string[] => [
  node.id,
  ...(node.children?.flatMap(flattenIds) ?? []),
];

const findNodeById = (
  node: CareerTreeNode,
  targetId: string,
): CareerTreeNode | null => {
  if (node.id === targetId) return node;
  for (const child of node.children ?? []) {
    const found = findNodeById(child, targetId);
    if (found) return found;
  }
  return null;
};

const filterTree = (
  node: CareerTreeNode,
  normalizedQuery: string,
): CareerTreeNode | null => {
  if (!normalizedQuery) return node;

  const selfMatches = `${node.label} ${node.note ?? ""}`
    .toLowerCase()
    .includes(normalizedQuery);

  const filteredChildren = (node.children ?? [])
    .map((child) => filterTree(child, normalizedQuery))
    .filter(Boolean) as CareerTreeNode[];

  if (selfMatches || filteredChildren.length > 0) {
    return {
      ...node,
      children: filteredChildren.length > 0 ? filteredChildren : node.children,
    };
  }

  return null;
};

const stageBadgeClass = (stage?: CareerTreeNode["stage"]) => {
  if (stage === "start") return "border-primary/40 bg-primary/10 text-primary";
  if (stage === "decision") return "border-secondary/40 bg-secondary/10 text-secondary";
  if (stage === "outcome") return "border-accent/40 bg-accent/10 text-accent";
  return "border-border/60 bg-background/40 text-muted-foreground";
};

const stageGuidance: Record<string, string[]> = {
  start: [
    "Identify your strongest subjects and interests.",
    "Discuss stream decision with parents/mentor.",
    "Pick one primary path and one backup path.",
  ],
  decision: [
    "Compare 2-3 possible branches before final selection.",
    "Check eligibility and entrance timeline early.",
    "Note budget, location, and course duration.",
  ],
  path: [
    "Shortlist colleges/courses and admission routes.",
    "Track entrance dates, syllabus, and required documents.",
    "Build skills and portfolio relevant to this path.",
  ],
  outcome: [
    "Review job roles, salary ranges, and growth path.",
    "Plan internships/certifications to improve readiness.",
    "Set 6-month and 12-month career milestones.",
  ],
  default: [
    "Explore roadmap, eligibility, and official sources.",
    "Compare this option with alternatives.",
    "Take action on the next concrete step today.",
  ],
};

const buildStageSearchLinks = (node: CareerTreeNode) => {
  const base = node.label;
  return [
    {
      label: "Roadmap Search",
      url: `https://www.google.com/search?q=${encodeURIComponent(`${base} career roadmap India`)}`,
    },
    {
      label: "Eligibility Search",
      url: `https://www.google.com/search?q=${encodeURIComponent(`${base} eligibility criteria India`)}`,
    },
    {
      label: "Colleges/Courses Search",
      url: `https://www.google.com/search?q=${encodeURIComponent(`${base} top colleges courses India`)}`,
    },
    {
      label: "Jobs/Profession Search",
      url: `https://www.google.com/search?q=${encodeURIComponent(`${base} jobs profession scope India`)}`,
    },
  ];
};

const CareerTree = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState("start");
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    flattenIds(careerTree).reduce<Record<string, boolean>>((acc, id) => {
      acc[id] = id === "start";
      return acc;
    }, {}),
  );

  const normalizedQuery = query.trim().toLowerCase();

  const visibleTree = useMemo(
    () => filterTree(careerTree, normalizedQuery),
    [normalizedQuery],
  );
  const selectedNode = useMemo(
    () => findNodeById(careerTree, selectedNodeId) ?? careerTree,
    [selectedNodeId],
  );
  const selectedNodeGuidance =
    stageGuidance[selectedNode.stage ?? "default"] ?? stageGuidance.default;
  const selectedNodeSearchLinks = buildStageSearchLinks(selectedNode);

  const allIds = useMemo(() => flattenIds(careerTree), []);

  const expandAll = () => {
    setExpanded(
      allIds.reduce<Record<string, boolean>>((acc, id) => {
        acc[id] = true;
        return acc;
      }, {}),
    );
  };

  const collapseAll = () => {
    setExpanded(
      allIds.reduce<Record<string, boolean>>((acc, id) => {
        acc[id] = id === "start";
        return acc;
      }, {}),
    );
  };

  const toggleNode = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderNode = (node: CareerTreeNode, depth = 0) => {
    const hasChildren = Boolean(node.children?.length);
    const isOpen = expanded[node.id] || Boolean(normalizedQuery);
    const isCollapsed = hasChildren && !isOpen;
    const nodeTone = hasChildren
      ? isOpen
        ? "border-primary/60 bg-primary/12 shadow-[0_0_0_1px_hsl(185_100%_50%_/_0.18)]"
        : "border-muted/70 bg-muted/20"
      : "border-border/60 bg-card/60";

    return (
      <div key={node.id} className="space-y-2">
        <div
          className={`flex items-start gap-2 rounded-md border p-3 transition-colors cursor-pointer ${
            selectedNodeId === node.id
              ? "ring-1 ring-secondary/40"
              : ""
          } ${nodeTone}`}
          style={{ marginLeft: depth * 14 }}
          onClick={() => setSelectedNodeId(node.id)}
        >
          {hasChildren ? (
            <button
              type="button"
              onClick={() => toggleNode(node.id)}
              className={`mt-0.5 rounded-sm p-0.5 transition-colors ${
                isOpen
                  ? "text-primary bg-primary/15 hover:bg-primary/20"
                  : "text-muted-foreground bg-muted/30 hover:bg-muted/45"
              }`}
              aria-label={isOpen ? "Collapse node" : "Expand node"}
            >
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          ) : (
            <div className="mt-1 h-2 w-2 rounded-full bg-primary/70" />
          )}

            <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <div
                className={`font-display text-sm ${
                  isOpen && hasChildren
                    ? "text-primary"
                    : isCollapsed
                      ? "text-foreground/80"
                      : "text-foreground"
                }`}
              >
                {node.label}
              </div>
              {hasChildren ? (
                <span
                  className={`rounded-md border px-2 py-0.5 font-mono text-[10px] ${
                    isOpen
                      ? "border-primary/50 bg-primary/12 text-primary"
                      : "border-muted/80 bg-muted/25 text-muted-foreground"
                  }`}
                >
                  {isOpen ? "OPEN" : "CLOSED"}
                </span>
              ) : null}
              {node.stage ? (
                <span
                  className={`rounded-md border px-2 py-0.5 font-mono text-[10px] ${stageBadgeClass(
                    node.stage,
                  )}`}
                >
                  {node.stage.toUpperCase()}
                </span>
              ) : null}
            </div>
            {node.note ? (
              <div className="font-body text-xs text-muted-foreground">
                {node.note}
              </div>
            ) : null}
            {node.careerId ? (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => navigate(`/career/${node.careerId}`)}
                  className="rounded-md border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-xs text-primary"
                >
                  Open Internal Guide
                </button>
                <button
                  onClick={() => navigate(`/?path=${node.careerId}#keyword-explorer`)}
                  className="rounded-md border border-secondary/40 bg-secondary/10 px-3 py-2 font-mono text-xs text-secondary"
                >
                  Open Pathfinder Professions
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {hasChildren && isOpen ? (
          <div className="space-y-2">
            {node.children!.map((child) => renderNode(child, depth + 1))}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background hud-scanlines hud-grid-bg">
      <header className="border-b border-border/50 bg-background/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>BACK</span>
            </button>
            <div className="h-4 w-px bg-border" />
            <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
              Career / Tree View
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-6xl space-y-5">
        <HUDPanel title="CAREER TREE - START TO END">
          <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="space-y-4 lg:col-span-8">
            <p className="font-body text-sm text-muted-foreground">
              Expanded journey map inspired by your chart. Start from 10th and
              follow stream, course, and career outcomes till end.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="md:col-span-2 flex items-center gap-2 border border-border bg-background/60 px-3 py-2 rounded-md">
                <Search className="h-4 w-4 text-primary" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search branch, stream, exam, or outcome..."
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={expandAll}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md border border-primary/40 bg-primary/10 px-3 py-2.5 font-mono text-xs text-primary"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Expand
                </button>
                <button
                  onClick={collapseAll}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md border border-border/70 bg-background/50 px-3 py-2.5 font-mono text-xs text-muted-foreground"
                >
                  <Minus className="h-3.5 w-3.5" />
                  Collapse
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-md border border-primary/40 bg-primary/10 px-2 py-1 text-[10px] font-mono text-primary">START</span>
              <span className="rounded-md border border-secondary/40 bg-secondary/10 px-2 py-1 text-[10px] font-mono text-secondary">DECISION</span>
              <span className="rounded-md border border-border/60 bg-background/40 px-2 py-1 text-[10px] font-mono text-muted-foreground">PATH</span>
              <span className="rounded-md border border-accent/40 bg-accent/10 px-2 py-1 text-[10px] font-mono text-accent">OUTCOME</span>
            </div>

            <div className="space-y-2">
              {visibleTree ? (
                renderNode(visibleTree)
              ) : (
                <p className="font-body text-sm text-muted-foreground">
                  No match in tree. Try keywords like `commerce`, `pcm`,
                  `mbbs`, `law`, `nda`, `diploma`.
                </p>
              )}
            </div>
            </div>

            <div className="lg:col-span-4">
              <div className="space-y-3 rounded-md border border-border/60 bg-card/60 p-3 lg:sticky lg:top-24">
                <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
                  STAGE HELPER
                </div>

                <div className="space-y-1">
                  <div className="font-display text-sm text-foreground">
                    {selectedNode.label}
                  </div>
                  {selectedNode.stage ? (
                    <span
                      className={`inline-flex rounded-md border px-2 py-0.5 font-mono text-[10px] ${stageBadgeClass(
                        selectedNode.stage,
                      )}`}
                    >
                      {selectedNode.stage.toUpperCase()}
                    </span>
                  ) : null}
                  {selectedNode.note ? (
                    <div className="font-body text-xs text-muted-foreground">
                      {selectedNode.note}
                    </div>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <div className="font-mono text-[10px] tracking-widest text-secondary">
                    WHAT TO DO NOW
                  </div>
                  <div className="space-y-1">
                    {selectedNodeGuidance.map((tip) => (
                      <div
                        key={tip}
                        className="rounded-md border border-border/40 bg-background/40 px-2.5 py-2 text-xs text-foreground/85"
                      >
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>

                {selectedNode.careerId ? (
                  <button
                    onClick={() => navigate(`/?path=${selectedNode.careerId}#keyword-explorer`)}
                    className="w-full rounded-md border border-secondary/40 bg-secondary/10 px-3 py-2 text-xs font-mono text-secondary"
                  >
                    Open Pathfinder For This Stage
                  </button>
                ) : null}

                <div className="space-y-2">
                  <div className="font-mono text-[10px] tracking-widest text-primary">
                    QUICK SEARCH ACTIONS
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedNodeSearchLinks.map((item) => (
                      <a
                        key={item.label}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-md border border-primary/40 bg-primary/10 px-2.5 py-2 text-xs text-primary"
                      >
                        {item.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HUDPanel>
      </main>
    </div>
  );
};

export default CareerTree;
