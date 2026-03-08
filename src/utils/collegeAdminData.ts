import { CollegeRecord, collegesData } from "@/data/colleges";
import { mhtcetExtractedData } from "@/data/mhtcetExtracted";

const STORAGE_KEY = "mhtcet_admin_college_dataset_v1";

const isNumber = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

const isCategory = (value: unknown): value is CollegeRecord["category"] =>
  value === "OPEN" || value === "OBC" || value === "SC" || value === "ST" || value === "EWS";

const isType = (value: unknown): value is CollegeRecord["type"] => value === "Government" || value === "Private";

export const isCollegeRecord = (value: unknown): value is CollegeRecord => {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.college === "string" &&
    typeof item.branch === "string" &&
    isCategory(item.category) &&
    isNumber(item.cutoff_current) &&
    isNumber(item.cutoff_previous) &&
    typeof item.location === "string" &&
    isNumber(item.seats) &&
    isNumber(item.fees) &&
    isType(item.type)
  );
};

const sanitize = (item: CollegeRecord): CollegeRecord => ({
  ...item,
  college: item.college.trim(),
  branch: item.branch.trim(),
  location: item.location.trim(),
  seats: Math.max(0, Math.round(item.seats)),
  fees: Math.max(0, Math.round(item.fees)),
  cutoff_current: Math.max(0, Math.min(100, item.cutoff_current)),
  cutoff_previous: Math.max(0, Math.min(100, item.cutoff_previous)),
  ai_cutoff_current:
    typeof item.ai_cutoff_current === "number" ? Math.max(0, Math.min(100, item.ai_cutoff_current)) : undefined,
  ai_cutoff_previous:
    typeof item.ai_cutoff_previous === "number" ? Math.max(0, Math.min(100, item.ai_cutoff_previous)) : undefined,
});

export const loadCollegeData = (): CollegeRecord[] => {
  const fallback = mhtcetExtractedData.length > 0 ? mhtcetExtractedData : collegesData;
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return fallback;

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return fallback;
    const valid = parsed.filter(isCollegeRecord).map(sanitize);
    return valid.length > 0 ? valid : fallback;
  } catch {
    return fallback;
  }
};

export const saveCollegeDataFromJson = (jsonText: string): { ok: true; count: number } | { ok: false; error: string } => {
  if (typeof window === "undefined") return { ok: false, error: "Browser storage is not available." };

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    return { ok: false, error: "Invalid JSON format." };
  }

  if (!Array.isArray(parsed)) return { ok: false, error: "Dataset must be a JSON array." };
  const valid = parsed.filter(isCollegeRecord).map(sanitize);
  if (valid.length === 0) {
    return { ok: false, error: "No valid college records found. Check required fields." };
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(valid));
  return { ok: true, count: valid.length };
};

export const resetCollegeData = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
};

export const getAdminDatasetTemplate = () =>
  JSON.stringify(
    [
      {
        college: "Example College",
        branch: "Computer Engineering",
        category: "OPEN",
        cutoff_current: 95.2,
        cutoff_previous: 94.8,
        location: "Pune",
        seats: 120,
        fees: 120000,
        type: "Private",
      },
    ],
    null,
    2,
  );
