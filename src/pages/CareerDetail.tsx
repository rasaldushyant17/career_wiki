/**
 * CareerDetail.tsx - Career Detail Page
 * ======================================
 * URL: /career/:id  (e.g., /career/commerce, /career/law)
 * 
 * This page shows ALL information about ONE career field:
 * degrees, exams, colleges, specialisations, and career prospects.
 * 
 * REACT CONCEPTS → HTML/CSS/JS EQUIVALENTS:
 * ──────────────────────────────────────────
 * 
 * useParams():
 *   Gets the career ID from the URL.
 *   Plain JS: const id = window.location.pathname.split("/")[2];
 * 
 * .find():
 *   Searches an array for a matching item.
 *   Plain JS: let career = null;
 *             for (let i = 0; i < careers.length; i++) {
 *               if (careers[i].id === id) { career = careers[i]; break; }
 *             }
 * 
 * .map():
 *   Loops through an array and creates HTML for each item.
 *   Plain JS: let html = "";
 *             for (let i = 0; i < items.length; i++) {
 *               html += "<div>" + items[i].name + "</div>";
 *             }
 * 
 * Conditional rendering {x && <div>...</div>}:
 *   Only shows HTML if condition is true.
 *   Plain JS: if (x) { element.style.display = "block"; }
 * 
 * target="_blank":
 *   Same as HTML! Opens link in a new tab.
 *   rel="noopener noreferrer" = security best practice for external links.
 */

import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,       // ← arrow icon
  GraduationCap,   // 🎓 graduation cap icon
  ExternalLink,    // ↗ external link icon
  School,          // 🏫 school building icon
  Info,            // ℹ info circle icon
  ClipboardList,   // 📋 clipboard icon
  Calendar,        // 📅 calendar icon
  IndianRupee,     // ₹ rupee symbol icon
  CheckCircle,     // ✅ checkmark icon
  BookOpen,        // 📖 open book icon
} from "lucide-react";
import { careerFields } from "@/data/careers";
import HUDPanel from "@/components/HUDPanel";

/**
 * ExternalLinkIcon — A small ↗ icon shown next to external links
 * This is a tiny COMPONENT — a reusable piece of HTML.
 * 
 * In plain HTML you'd write: <span class="external-icon">↗</span>
 * In React, we make it a function so we can reuse it: <ExternalLinkIcon />
 */
const ExternalLinkIcon = () => (
  <ExternalLink className="inline h-3 w-3 ml-1 opacity-60 group-hover:opacity-100 transition-opacity" />
);

const CareerDetail = () => {
  // Get the career ID from URL (e.g., "commerce" from /career/commerce)
  const { id } = useParams();

  // Navigation function (like window.location.href but without page reload)
  const navigate = useNavigate();

  // Search our data array for the career matching the URL
  // .find() returns the first match, or undefined if not found
  const career = careerFields.find((c) => c.id === id);

  // ========== CAREER NOT FOUND ==========
  // If no career matches the URL, show a "Coming Soon" message
  if (!career) {
    return (
      <div className="min-h-screen bg-background hud-scanlines hud-grid-bg flex items-center justify-center">
        <div className="text-center">
          <div className="font-display text-lg text-accent tracking-widest">COMING SOON</div>
          <p className="font-body text-sm text-muted-foreground mt-2">
            This career module is under development.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 font-mono text-xs text-primary hover:underline"
          >
            ← RETURN TO DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  // ========== MAIN CAREER PAGE ==========
  return (
    <div className="min-h-screen bg-background hud-scanlines hud-grid-bg">

      {/* ==================== HEADER / NAVIGATION BAR ====================
          Same as a regular HTML <header> with a back button and breadcrumb.
          "sticky top-0" = stays at top when scrolling (position: sticky; top: 0;)
      */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Back button — same as <a href="/"> but without page reload */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>BACK</span>
            </button>

            {/* Vertical line separator (a 1px wide, 16px tall div) */}
            <div className="h-4 w-px bg-border" />

            {/* Breadcrumb: Career / commerce */}
            <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
              Career / {career.id}
            </span>
          </div>
        </div>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="container mx-auto px-4 py-6 space-y-6 max-w-5xl">

        {/* ──────────────────────────────────────────────
            SECTION 1: HERO BANNER
            Shows the career title, subtitle, and badge.
            Has a fade-in animation and cyan glow effect.
            ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border border-border bg-card/60 backdrop-blur-sm p-6 hud-bracket glow-cyan"
        >
          <div className="flex items-center gap-3">
            {/* Icon box */}
            <div className="w-12 h-12 border border-border rounded-sm flex items-center justify-center bg-muted/30">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              {/* Career Title (e.g., "Commerce") */}
              <h1 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-wide glow-text-cyan">
                {career.title}
              </h1>
              {/* Subtitle (e.g., "Finance, Accounting & Business Studies") */}
              <p className="font-body text-sm text-muted-foreground mt-0.5">
                {career.subtitle}
              </p>
            </div>
          </div>

          {/* Badge label (e.g., "Commerce Stream") — only shown if it exists */}
          {career.badge && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-primary/30 bg-primary/10 text-[10px] font-mono tracking-wider text-primary uppercase">
              {career.badge}
            </div>
          )}
        </motion.div>

        {/* ──────────────────────────────────────────────
            SECTION 2: INFO BOX (Yellow alert box)
            Shows important eligibility information.
            Only rendered if career.infoBox has a value.
            ────────────────────────────────────────────── */}
        {career.infoBox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-2.5 border border-accent/30 bg-accent/5 rounded-sm p-4"
          >
            <Info className="h-4 w-4 text-accent shrink-0 mt-0.5" />
            <p className="font-body text-sm text-foreground/80">{career.infoBox}</p>
          </motion.div>
        )}

        {/* ──────────────────────────────────────────────
            SECTION 3: DEGREES TABLE
            A <table> showing degree name, duration, and career options.
            
            This is a standard HTML table! <table>, <thead>, <tbody>, <tr>, <td>
            Same as what you'd write in plain HTML.
            
            overflow-x-auto = adds horizontal scroll on small screens
            ────────────────────────────────────────────── */}
        <HUDPanel title="DEGREES & CAREER PATHS" delay={0.1}>
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header Row */}
              <thead>
                <tr className="border-b border-primary/30">
                  <th className="px-4 py-3 text-left font-mono text-[10px] tracking-widest text-primary bg-primary/10">
                    DEGREE
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-[10px] tracking-widest text-primary bg-primary/10">
                    DURATION
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-[10px] tracking-widest text-primary bg-primary/10">
                    PROFESSIONS
                  </th>
                </tr>
              </thead>

              {/* Table Body — one row per degree */}
              {/* .map() loops through career.degrees array:
                  In plain JS: for (let i = 0; i < career.degrees.length; i++) { ... } */}
              <tbody>
                {career.degrees.map((deg, i) => (
                  <tr key={i} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    {/* Degree name — if URL exists, make it a clickable link */}
                    <td className="px-4 py-3 font-body text-sm font-semibold text-foreground">
                      {deg.url ? (
                        // <a> tag with target="_blank" opens in new tab (standard HTML!)
                        <a href={deg.url} target="_blank" rel="noopener noreferrer" className="group text-primary hover:underline">
                          {deg.name}<ExternalLinkIcon />
                        </a>
                      ) : (
                        // No URL? Just show plain text
                        deg.name
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {deg.duration}
                    </td>
                    <td className="px-4 py-3 font-body text-sm text-foreground/80">
                      {deg.professions}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </HUDPanel>

        {/* ──────────────────────────────────────────────
            SECTION 4: SPECIALISATIONS / CERTIFICATIONS
            Shows tags/chips for each specialisation.
            
            flex flex-wrap = flexbox that wraps to next line when full
            (like text wrapping in a paragraph)
            ────────────────────────────────────────────── */}
        {career.specialisations && career.specialisations.length > 0 && (
          <HUDPanel
            title={career.id === "commerce" ? "PROFESSIONAL CERTIFICATIONS" : "SPECIALISATIONS"}
            delay={0.2}
          >
            <div className="p-4 flex flex-wrap gap-2">
              {career.specialisations.map((spec) =>
                spec.url ? (
                  <a
                    key={spec.name}
                    href={spec.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-3 py-1.5 rounded-sm border border-border bg-muted/30 font-body text-sm text-primary border-l-2 border-l-primary hover:bg-primary/10 transition-colors"
                  >
                    {spec.name}<ExternalLinkIcon />
                  </a>
                ) : (
                  <span
                    key={spec.name}
                    className="px-3 py-1.5 rounded-sm border border-border bg-muted/30 font-body text-sm text-foreground/80 border-l-2 border-l-primary"
                  >
                    {spec.name}
                  </span>
                )
              )}
            </div>
          </HUDPanel>
        )}

        {/* ──────────────────────────────────────────────
            SECTION 5: CAREER PROSPECTS
            Pill-shaped tags showing job opportunities.
            rounded-full = border-radius: 9999px (fully rounded pill shape)
            ────────────────────────────────────────────── */}
        <HUDPanel title="CAREER PROSPECTS" delay={0.3}>
          <div className="p-4 flex flex-wrap gap-2">
            {career.prospects.map((prospect) =>
              prospect.url ? (
                <a
                  key={prospect.name}
                  href={prospect.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-3 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 font-body text-sm text-secondary hover:bg-secondary/20 transition-colors"
                >
                  {prospect.name}<ExternalLinkIcon />
                </a>
              ) : (
                <span
                  key={prospect.name}
                  className="px-3 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 font-body text-sm text-secondary"
                >
                  {prospect.name}
                </span>
              )
            )}
          </div>
        </HUDPanel>

        {/* ──────────────────────────────────────────────
            SECTION 6: ENTRANCE EXAMS (Detail Cards)
            Each exam gets its own card with:
            - Name (linked to official website)
            - Subjects covered
            - Eligibility, Pattern, Dates, Fees
            
            grid grid-cols-1 md:grid-cols-2 = 
              1 column on mobile, 2 columns on tablet+
            ────────────────────────────────────────────── */}
        <HUDPanel title="ENTRANCE EXAMS" delay={0.4}>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {career.exams.map((exam) => (
              <div
                key={exam.name}
                className="border border-border/50 bg-muted/20 rounded-sm p-4 space-y-3"
              >
                {/* Exam Name */}
                <div className="flex items-start justify-between gap-2">
                  <div className="font-display text-sm font-semibold text-foreground tracking-wide">
                    {exam.url ? (
                      <a href={exam.url} target="_blank" rel="noopener noreferrer" className="group text-primary hover:underline">
                        {exam.name}<ExternalLinkIcon />
                      </a>
                    ) : (
                      exam.name
                    )}
                  </div>
                </div>

                {/* Exam Subjects */}
                <div className="font-mono text-[11px] text-muted-foreground">
                  {exam.detail}
                </div>

                {/* Detailed info (only shown if at least one field exists) */}
                {(exam.eligibility || exam.pattern || exam.dates || exam.fees) && (
                  <div className="space-y-2 pt-2 border-t border-border/30">

                    {/* ✅ Eligibility */}
                    {exam.eligibility && (
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-secondary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-mono text-[10px] text-secondary tracking-wider">ELIGIBILITY</span>
                          <p className="font-body text-xs text-foreground/80">{exam.eligibility}</p>
                        </div>
                      </div>
                    )}

                    {/* 📋 Exam Pattern */}
                    {exam.pattern && (
                      <div className="flex items-start gap-2">
                        <ClipboardList className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-mono text-[10px] text-primary tracking-wider">PATTERN</span>
                          <p className="font-body text-xs text-foreground/80">{exam.pattern}</p>
                        </div>
                      </div>
                    )}

                    {/* 📅 Exam Dates */}
                    {exam.dates && (
                      <div className="flex items-start gap-2">
                        <Calendar className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <span className="font-mono text-[10px] text-accent tracking-wider">DATES</span>
                          <p className="font-body text-xs text-foreground/80">{exam.dates}</p>
                        </div>
                      </div>
                    )}

                    {/* ₹ Application Fees */}
                    {exam.fees && (
                      <div className="flex items-start gap-2">
                        <IndianRupee className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <span className="font-mono text-[10px] text-muted-foreground tracking-wider">FEES</span>
                          <p className="font-body text-xs text-foreground/80">{exam.fees}</p>
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>
            ))}
          </div>
        </HUDPanel>

        {/* ──────────────────────────────────────────────
            SECTION 7: TOP COLLEGES
            List of college names, each linking to their website.
            Also includes ranking website links (NIRF, CollegeDunia, etc.)
            ────────────────────────────────────────────── */}
        {career.colleges && career.colleges.length > 0 && (
          <HUDPanel title="TOP COLLEGES" delay={0.5}>
            <div className="p-4">
              {/* College name tags */}
              <div className="flex flex-wrap gap-2">
                {career.colleges.map((college) => (
                  <a
                    key={college.name}
                    href={college.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-3 py-1.5 rounded-sm border border-border bg-muted/20 font-body text-sm text-primary hover:bg-primary/10 hover:border-primary/40 transition-colors"
                  >
                    <School className="inline h-3 w-3 mr-1.5 text-primary/60" />
                    {college.name}
                    <ExternalLinkIcon />
                  </a>
                ))}
              </div>

              {/* Ranking website links */}
              {career.rankingLinks && career.rankingLinks.length > 0 && (
                <div className="mt-4 pt-3 border-t border-border/30">
                  <div className="font-mono text-[10px] text-muted-foreground tracking-widest mb-2">
                    VIEW COMPLETE RANKINGS
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {career.rankingLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-secondary/30 bg-secondary/10 font-mono text-[11px] text-secondary hover:bg-secondary/20 transition-colors"
                      >
                        <BookOpen className="h-3 w-3" />
                        {link.label}
                        <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </HUDPanel>
        )}

        {/* ──────────────────────────────────────────────
            SECTION 8: EXTRA SECTIONS
            Some careers have additional sub-sections
            (e.g., "After Diploma" pathways).
            
            career.extraSections?.map() — the ?. is "optional chaining"
            It means: "if extraSections exists, loop through it.
            If it doesn't exist, do nothing (don't crash)."
            
            In plain JS: if (career.extraSections) { career.extraSections.forEach(...) }
            ────────────────────────────────────────────── */}
        {career.extraSections?.map((extra, i) => (
          <HUDPanel key={extra.title} title={extra.title.toUpperCase()} delay={0.6 + i * 0.1}>
            <div className="space-y-4">

              {/* Optional badge */}
              {extra.badge && (
                <div className="px-4 pt-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-sm border border-primary/30 bg-primary/10 text-[10px] font-mono tracking-wider text-primary uppercase">
                    {extra.badge}
                  </span>
                </div>
              )}

              {/* Extra degrees table (same structure as Section 3) */}
              {extra.degrees && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-primary/30">
                        <th className="px-4 py-2 text-left font-mono text-[10px] tracking-widest text-primary bg-primary/10">DEGREE</th>
                        <th className="px-4 py-2 text-left font-mono text-[10px] tracking-widest text-primary bg-primary/10">DURATION</th>
                        <th className="px-4 py-2 text-left font-mono text-[10px] tracking-widest text-primary bg-primary/10">PROFESSIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {extra.degrees.map((deg, j) => (
                        <tr key={j} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                          <td className="px-4 py-2.5 font-body text-sm font-semibold text-foreground">
                            {deg.url ? (
                              <a href={deg.url} target="_blank" rel="noopener noreferrer" className="group text-primary hover:underline">
                                {deg.name}<ExternalLinkIcon />
                              </a>
                            ) : (
                              deg.name
                            )}
                          </td>
                          <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{deg.duration}</td>
                          <td className="px-4 py-2.5 font-body text-sm text-foreground/80">{deg.professions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Extra career prospects */}
              {extra.prospects && (
                <div className="px-4 pb-4 flex flex-wrap gap-2">
                  {extra.prospects.map((p) =>
                    p.url ? (
                      <a
                        key={p.name}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group px-3 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 font-body text-sm text-secondary hover:bg-secondary/20 transition-colors"
                      >
                        {p.name}<ExternalLinkIcon />
                      </a>
                    ) : (
                      <span
                        key={p.name}
                        className="px-3 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 font-body text-sm text-secondary"
                      >
                        {p.name}
                      </span>
                    )
                  )}
                </div>
              )}

            </div>
          </HUDPanel>
        ))}

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

export default CareerDetail;
