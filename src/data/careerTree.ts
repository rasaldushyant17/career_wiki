export interface CareerTreeNode {
  id: string;
  label: string;
  note?: string;
  careerId?: string;
  stage?: "start" | "decision" | "path" | "outcome";
  children?: CareerTreeNode[];
}

export const careerTree: CareerTreeNode = {
  id: "start",
  label: "Start: After 10th (SSC)",
  note: "Choose stream or direct skill path",
  stage: "start",
  children: [
    {
      id: "direct-after-10th",
      label: "Direct After 10th Options",
      stage: "decision",
      children: [
        {
          id: "iti",
          label: "ITI / Trade Courses",
          note: "Fitter, Machinist, Electrician, Stenography",
          stage: "path",
          children: [
            { id: "iti-job", label: "Technical Job", stage: "outcome" },
            { id: "iti-diploma", label: "Lateral Diploma Entry", stage: "outcome" },
          ],
        },
        {
          id: "poly-diploma",
          label: "Diploma Engineering",
          note: "Civil, Mechanical, Electrical, Electronics",
          stage: "path",
          children: [
            { id: "diploma-job", label: "Junior Engineer Job", stage: "outcome" },
            { id: "diploma-be", label: "Direct 2nd Year B.E./B.Tech", stage: "outcome" },
          ],
        },
        {
          id: "defence-entry",
          label: "Army / Navy (Entry Routes)",
          stage: "path",
          children: [
            { id: "defence-job", label: "Defence Service Career", stage: "outcome" },
          ],
        },
        {
          id: "govt-clerk",
          label: "Railway / Clerk / Govt Grade Jobs",
          stage: "path",
          children: [
            { id: "govt-growth", label: "Govt Service Progression", stage: "outcome" },
          ],
        },
        {
          id: "short-courses",
          label: "MS-CIT / Vocational Courses",
          note: "Computer operator, office support, technical helper",
          stage: "path",
        },
      ],
    },
    {
      id: "after-12th-science",
      label: "12th Science",
      stage: "decision",
      children: [
        {
          id: "science-pcm",
          label: "With PCM",
          note: "Physics, Chemistry, Maths",
          stage: "path",
          children: [
            { id: "engg", label: "B.E. / B.Tech", careerId: "science-a", stage: "path" },
            { id: "arch", label: "B.Arch", careerId: "science-a", stage: "path" },
            { id: "nda", label: "NDA / Defence Entry", careerId: "sports-nda", stage: "path" },
            { id: "merchant", label: "Merchant Navy", stage: "path" },
            { id: "bsc-math", label: "B.Sc (Maths/Physics)", stage: "path" },
            { id: "tech-end", label: "Engineer / Officer / Tech Career", stage: "outcome" },
          ],
        },
        {
          id: "science-pcb",
          label: "With PCB",
          note: "Physics, Chemistry, Biology",
          stage: "path",
          children: [
            { id: "mbbs", label: "MBBS / BDS", careerId: "science-b", stage: "path" },
            { id: "ayush", label: "BAMS / BHMS / BUMS", careerId: "science-b", stage: "path" },
            { id: "nursing", label: "B.Sc Nursing / GNM", careerId: "science-b", stage: "path" },
            { id: "pharmacy", label: "B.Pharm / D.Pharm", careerId: "science-b", stage: "path" },
            { id: "allied", label: "Paramedical / Lab Tech", careerId: "science-b", stage: "path" },
            { id: "medical-end", label: "Doctor / Healthcare Career", stage: "outcome" },
          ],
        },
        {
          id: "science-pcmb",
          label: "With PCMB",
          note: "Keeps both engineering + medical routes open",
          stage: "path",
          children: [
            { id: "choose-engineering", label: "Choose Engineering Route", stage: "outcome" },
            { id: "choose-medical", label: "Choose Medical Route", stage: "outcome" },
          ],
        },
      ],
    },
    {
      id: "after-12th-commerce",
      label: "12th Commerce",
      stage: "decision",
      children: [
        {
          id: "commerce-core",
          label: "Commerce Degree Paths",
          careerId: "commerce",
          stage: "path",
          children: [
            { id: "bcom", label: "B.Com / B.Com (Hons)", careerId: "commerce", stage: "path" },
            { id: "bba", label: "BBA / BMS", careerId: "business-management", stage: "path" },
            { id: "economics", label: "B.A./B.Sc Economics", careerId: "economics", stage: "path" },
            { id: "ca-cs-cma", label: "CA / CS / CMA", careerId: "commerce", stage: "path" },
            { id: "commerce-end", label: "Banking / Finance / Business Career", stage: "outcome" },
          ],
        },
        {
          id: "commerce-alt",
          label: "Commerce Related Paths",
          stage: "path",
          children: [
            { id: "llb-commerce", label: "LLB / Corporate Law", careerId: "law", stage: "path" },
            { id: "hotel-commerce", label: "Hotel / Travel Management", careerId: "hotel-management", stage: "path" },
            { id: "commerce-govt", label: "MPSC / UPSC / Banking Exams", stage: "outcome" },
          ],
        },
      ],
    },
    {
      id: "after-12th-arts",
      label: "12th Arts / Humanities",
      stage: "decision",
      children: [
        {
          id: "arts-core",
          label: "Arts Degree Paths",
          stage: "path",
          children: [
            { id: "ba", label: "B.A. (Languages / Social Sciences)", stage: "path" },
            { id: "law-arts", label: "LLB / Legal Career", careerId: "law", stage: "path" },
            { id: "journalism", label: "Journalism / Mass Communication", careerId: "mass-communication", stage: "path" },
            { id: "social-work", label: "BSW / Social Work", careerId: "social-work", stage: "path" },
            { id: "design-arts", label: "Design / Fine Arts", careerId: "design-arts", stage: "path" },
            { id: "arts-end", label: "Media / Public Service / Creative Career", stage: "outcome" },
          ],
        },
        {
          id: "arts-alt",
          label: "Applied Routes",
          stage: "path",
          children: [
            { id: "event", label: "Event Management", stage: "path" },
            { id: "foreign-lang", label: "Foreign Language + Jobs", stage: "path" },
            { id: "bpo", label: "Call Center / BPO Jobs", stage: "outcome" },
          ],
        },
      ],
    },
    {
      id: "competitive",
      label: "Competitive / Government Track",
      note: "Possible after graduation from any stream",
      stage: "decision",
      children: [
        { id: "upsc", label: "UPSC / Civil Services", stage: "path" },
        { id: "mpsc", label: "MPSC / State Services", stage: "path" },
        { id: "ssc", label: "SSC / Railway / Banking", stage: "path" },
        { id: "govt-outcome", label: "Officer / Govt Career", stage: "outcome" },
      ],
    },
  ],
};
