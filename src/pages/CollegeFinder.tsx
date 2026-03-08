import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Filter, GraduationCap } from "lucide-react";
import HUDPanel from "@/components/HUDPanel";
import { Category, CollegeRecord } from "@/data/colleges";
import { getAdminDatasetTemplate, loadCollegeData, resetCollegeData, saveCollegeDataFromJson } from "@/utils/collegeAdminData";

type ChanceBucket = "Safe" | "Moderate" | "Dream";
type Eligibility = "Eligible" | "Possible" | "Hard";
type AdmissionChannel = "State" | "All India";

const categories: Category[] = ["OPEN", "OBC", "SC", "ST", "EWS"];
const collegeTypes = ["All Types", "Government", "Private"] as const;
const maxFees = 250000;

interface ScoredCollege {
  item: CollegeRecord;
  diff: number;
  chance: ChanceBucket;
  eligibility: Eligibility;
  matchScore: number;
  activeCurrentCutoff: number;
  activePreviousCutoff: number;
}

const formatFees = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

const getChance = (diff: number): ChanceBucket => {
  if (diff >= 2) return "Safe";
  if (diff >= -2) return "Moderate";
  return "Dream";
};

const getEligibility = (diff: number): Eligibility => {
  if (diff >= 0) return "Eligible";
  if (diff >= -2) return "Possible";
  return "Hard";
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const CollegeFinder = () => {
  const navigate = useNavigate();

  const [percentile, setPercentile] = useState(92);
  const [collegeDataset, setCollegeDataset] = useState<CollegeRecord[]>(() => loadCollegeData());
  const [selectedBranch, setSelectedBranch] = useState("Computer Engineering");
  const [selectedCategory, setSelectedCategory] = useState<Category>("OPEN");
  const [selectedLocation, setSelectedLocation] = useState("All Maharashtra");
  const [selectedType, setSelectedType] = useState<(typeof collegeTypes)[number]>("All Types");
  const [admissionChannel, setAdmissionChannel] = useState<AdmissionChannel>("State");
  const [feeLimit, setFeeLimit] = useState(180000);
  const [adminJson, setAdminJson] = useState(getAdminDatasetTemplate());
  const [adminMessage, setAdminMessage] = useState<string | null>(null);

  const branches = useMemo(() => ["All Branches", ...Array.from(new Set(collegeDataset.map((item) => item.branch))).sort()], [collegeDataset]);
  const locations = useMemo(
    () => ["All Maharashtra", ...Array.from(new Set(collegeDataset.map((item) => item.location))).sort()],
    [collegeDataset],
  );

  useEffect(() => {
    if (!branches.includes(selectedBranch)) {
      setSelectedBranch("All Branches");
    }
  }, [branches, selectedBranch]);

  useEffect(() => {
    if (!locations.includes(selectedLocation)) {
      setSelectedLocation("All Maharashtra");
    }
  }, [locations, selectedLocation]);

  const results = useMemo(() => {
    const branchPreferred = selectedBranch !== "All Branches";
    const locationPreferred = selectedLocation !== "All Maharashtra";
    const filtered = collegeDataset
      .filter((item) => item.category === selectedCategory)
      .filter((item) => (branchPreferred ? item.branch === selectedBranch : true))
      .filter((item) => (locationPreferred ? item.location === selectedLocation : true))
      .filter((item) => (selectedType !== "All Types" ? item.type === selectedType : true))
      .filter((item) => item.fees <= feeLimit)
      .map((item) => {
        const activeCurrentCutoff = admissionChannel === "All India" ? item.ai_cutoff_current ?? 0 : item.cutoff_current;
        const activePreviousCutoff = admissionChannel === "All India" ? item.ai_cutoff_previous ?? 0 : item.cutoff_previous;
        const diff = percentile - activeCurrentCutoff;
        const percentileCloseness = clamp(100 - Math.abs(diff) * 12, 0, 100);
        const branchMatch = selectedBranch === "All Branches" || item.branch === selectedBranch ? 100 : 0;
        const locationMatch = selectedLocation === "All Maharashtra" || item.location === selectedLocation ? 100 : 0;
        const govtBonus = item.type === "Government" ? 100 : 65;
        const matchScore = Math.round(percentileCloseness * 0.55 + branchMatch * 0.2 + locationMatch * 0.15 + govtBonus * 0.1);

        return {
          item,
          diff,
          chance: getChance(diff),
          eligibility: getEligibility(diff),
          matchScore,
          activeCurrentCutoff,
          activePreviousCutoff,
        } satisfies ScoredCollege;
      })
      .sort((a, b) => {
        const branchA = selectedBranch !== "All Branches" && a.item.branch === selectedBranch ? 1 : 0;
        const branchB = selectedBranch !== "All Branches" && b.item.branch === selectedBranch ? 1 : 0;
        if (branchA !== branchB) return branchB - branchA;

        const locationA = selectedLocation !== "All Maharashtra" && a.item.location === selectedLocation ? 1 : 0;
        const locationB = selectedLocation !== "All Maharashtra" && b.item.location === selectedLocation ? 1 : 0;
        if (locationA !== locationB) return locationB - locationA;

        if (a.item.cutoff_current !== b.item.cutoff_current) return b.item.cutoff_current - a.item.cutoff_current;
        if (a.item.type !== b.item.type) return a.item.type === "Government" ? -1 : 1;
        return b.matchScore - a.matchScore;
      });

    return {
      all: filtered,
      safe: filtered.filter((item) => item.chance === "Safe"),
      moderate: filtered.filter((item) => item.chance === "Moderate"),
      dream: filtered.filter((item) => item.chance === "Dream"),
    };
  }, [admissionChannel, collegeDataset, feeLimit, percentile, selectedBranch, selectedCategory, selectedLocation, selectedType]);

  const applyAdminDataset = () => {
    const result = saveCollegeDataFromJson(adminJson);
    if (!result.ok) {
      setAdminMessage(`Error: ${result.error}`);
      return;
    }
    const latest = loadCollegeData();
    setCollegeDataset(latest);
    setAdminMessage(`Admin dataset loaded: ${result.count} records.`);
  };

  const resetAdminDataset = () => {
    resetCollegeData();
    const latest = loadCollegeData();
    setCollegeDataset(latest);
    setAdminMessage("Reset complete. Default bundled dataset is active.");
  };

  const renderCards = (items: ScoredCollege[], tone: "safe" | "moderate" | "dream") => {
    const toneClasses =
      tone === "safe"
        ? "border-secondary/50 bg-secondary/10"
        : tone === "moderate"
          ? "border-primary/50 bg-primary/10"
          : "border-accent/50 bg-accent/10";

    if (items.length === 0) {
      return (
        <div className="border border-border bg-card/50 p-4 font-body text-sm text-muted-foreground">
          No colleges match this bucket for the current filters.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {items.map(({ item, matchScore, diff, eligibility, activeCurrentCutoff, activePreviousCutoff }) => (
          <article key={`${item.college}-${item.branch}-${item.category}`} className={`border ${toneClasses} p-4 hud-bracket`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-display text-sm tracking-wide text-foreground">{item.college}</h4>
                <p className="font-body text-sm text-muted-foreground">{item.branch}</p>
              </div>
              <div className="text-right">
                <div className="font-mono text-xs text-secondary">Match Score: {matchScore}%</div>
                <div className="font-mono text-[11px] text-primary">{eligibility}</div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="border border-border/60 bg-background/50 px-2 py-1 font-mono">Cutoff: {activeCurrentCutoff.toFixed(2)}</div>
              <div className="border border-border/60 bg-background/50 px-2 py-1 font-mono">Prev: {activePreviousCutoff.toFixed(2)}</div>
              <div className="border border-border/60 bg-background/50 px-2 py-1 font-mono">Location: {item.location}</div>
              <div className="border border-border/60 bg-background/50 px-2 py-1 font-mono">Type: {item.type}</div>
              <div className="border border-border/60 bg-background/50 px-2 py-1 font-mono">Fees: {formatFees(item.fees)}</div>
              <div className="border border-border/60 bg-background/50 px-2 py-1 font-mono">Seats: {item.seats}</div>
            </div>

            <p className="mt-3 font-mono text-[11px] text-muted-foreground">
              Your percentile is {diff >= 0 ? "+" : ""}{diff.toFixed(2)} vs this cutoff.
            </p>
          </article>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background hud-scanlines hud-grid-bg">
      <header className="border-b border-border/50 bg-background/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-5 w-5 text-primary" />
            <div>
              <h1 className="font-display text-lg tracking-[0.14em] text-foreground">SMART COLLEGE FINDER</h1>
              <p className="font-mono text-[10px] text-muted-foreground tracking-wider">Filter by percentile, branch, location, category, fees, and type</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 border border-border px-3 py-2 font-mono text-xs text-foreground hover:bg-card/70"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            BACK
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-[330px_1fr] gap-6">
          <HUDPanel title="FILTERS">
            <div className="p-4 space-y-4">
              <div>
                <label className="font-mono text-[11px] text-primary tracking-widest">PERCENTILE</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={0.01}
                  value={percentile}
                  onChange={(event) => setPercentile(clamp(Number(event.target.value), 0, 100))}
                  className="mt-1 w-full border border-border bg-background px-3 py-2 font-body text-sm outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] text-primary tracking-widest">BRANCH</label>
                <select
                  value={selectedBranch}
                  onChange={(event) => setSelectedBranch(event.target.value)}
                  className="mt-1 w-full border border-border bg-background px-3 py-2 font-body text-sm outline-none focus:border-primary"
                >
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-mono text-[11px] text-primary tracking-widest">CATEGORY</label>
                <select
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value as Category)}
                  className="mt-1 w-full border border-border bg-background px-3 py-2 font-body text-sm outline-none focus:border-primary"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-mono text-[11px] text-primary tracking-widest">ADMISSION CHANNEL</label>
                <select
                  value={admissionChannel}
                  onChange={(event) => setAdmissionChannel(event.target.value as AdmissionChannel)}
                  className="mt-1 w-full border border-border bg-background px-3 py-2 font-body text-sm outline-none focus:border-primary"
                >
                  <option value="State">Maharashtra / Minority</option>
                  <option value="All India">All India</option>
                </select>
              </div>

              <div>
                <label className="font-mono text-[11px] text-primary tracking-widest">LOCATION</label>
                <select
                  value={selectedLocation}
                  onChange={(event) => setSelectedLocation(event.target.value)}
                  className="mt-1 w-full border border-border bg-background px-3 py-2 font-body text-sm outline-none focus:border-primary"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-mono text-[11px] text-primary tracking-widest">COLLEGE TYPE</label>
                <select
                  value={selectedType}
                  onChange={(event) => setSelectedType(event.target.value as (typeof collegeTypes)[number])}
                  className="mt-1 w-full border border-border bg-background px-3 py-2 font-body text-sm outline-none focus:border-primary"
                >
                  {collegeTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-mono text-[11px] text-primary tracking-widest">MAX FEES: {formatFees(feeLimit)}</label>
                <input
                  type="range"
                  min={50000}
                  max={maxFees}
                  step={5000}
                  value={feeLimit}
                  onChange={(event) => setFeeLimit(Number(event.target.value))}
                  className="mt-2 w-full accent-primary"
                />
              </div>

              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 border border-primary/60 bg-primary/10 px-3 py-2 font-display text-xs tracking-[0.12em] text-primary"
              >
                <Filter className="h-3.5 w-3.5" />
                REAL-TIME RESULTS ACTIVE
              </button>

              <p className="font-mono text-[10px] text-muted-foreground">
                Note: Predictions based on previous CAP cutoff trends.
              </p>

              <div className="border border-border/70 bg-background/40 p-3 space-y-2">
                <label className="font-mono text-[11px] text-accent tracking-widest">ADMIN DATA (JSON ARRAY)</label>
                <textarea
                  value={adminJson}
                  onChange={(event) => setAdminJson(event.target.value)}
                  rows={10}
                  className="w-full border border-border bg-background px-2 py-2 font-mono text-[11px] outline-none focus:border-accent"
                />
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={applyAdminDataset}
                    className="border border-accent/60 bg-accent/10 px-2 py-2 font-mono text-[11px] text-accent hover:bg-accent/20"
                  >
                    APPLY ADMIN DATA
                  </button>
                  <button
                    type="button"
                    onClick={resetAdminDataset}
                    className="border border-border px-2 py-2 font-mono text-[11px] text-foreground hover:bg-card/70"
                  >
                    RESET DEFAULT
                  </button>
                </div>
                {adminMessage && <p className="font-mono text-[10px] text-primary">{adminMessage}</p>}
              </div>
            </div>
          </HUDPanel>

          <div className="space-y-4">
            <HUDPanel title="RESULT OVERVIEW">
              <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="border border-border bg-card/50 p-3">
                  <p className="font-mono text-[10px] text-muted-foreground">Total Matches</p>
                  <p className="font-display text-xl text-foreground">{results.all.length}</p>
                </div>
                <div className="border border-secondary/40 bg-secondary/10 p-3">
                  <p className="font-mono text-[10px] text-muted-foreground">Safe</p>
                  <p className="font-display text-xl text-secondary">{results.safe.length}</p>
                </div>
                <div className="border border-primary/40 bg-primary/10 p-3">
                  <p className="font-mono text-[10px] text-muted-foreground">Moderate</p>
                  <p className="font-display text-xl text-primary">{results.moderate.length}</p>
                </div>
                <div className="border border-accent/40 bg-accent/10 p-3">
                  <p className="font-mono text-[10px] text-muted-foreground">Dream</p>
                  <p className="font-display text-xl text-accent">{results.dream.length}</p>
                </div>
              </div>
            </HUDPanel>

            <HUDPanel title="SAFE COLLEGES">
              <div className="p-4">{renderCards(results.safe, "safe")}</div>
            </HUDPanel>

            <HUDPanel title="MODERATE COLLEGES">
              <div className="p-4">{renderCards(results.moderate, "moderate")}</div>
            </HUDPanel>

            <HUDPanel title="DREAM COLLEGES">
              <div className="p-4">{renderCards(results.dream, "dream")}</div>
            </HUDPanel>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollegeFinder;
