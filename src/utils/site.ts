export const SITE = {
  name: "Career Wiki",
  defaultTitle: "Career Wiki | Career Options After 10th & 12th",
  defaultDescription: "Explore career options after 10th and 12th with smart search, roadmaps, stream guides, detailed career pages, and FAQs for students & parents.",
  baseUrl: import.meta.env.VITE_SITE_URL || "https://careerwiki-site.vercel.app",
  defaultImagePath: "/assets/icons/favicon.svg?v=3",
} as const;

export const toAbsoluteUrl = (pathOrUrl: string) => {
  if (!pathOrUrl) return SITE.baseUrl;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const base = SITE.baseUrl.replace(/\/+$/, "");
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
};
