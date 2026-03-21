export interface DashboardCard {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  type: "career" | "faq";
}

export interface DashboardSection {
  heading: string;
  cards: DashboardCard[];
}

export const dashboardSections: DashboardSection[] = [
  {
    heading: "CORE STREAMS",
    cards: [
      { id: "commerce", title: "Commerce", description: "Finance, Accounting & Business Studies", buttonText: "Explore", type: "career" },
      { id: "science-a", title: "Science – A Group", description: "Engineering, Technology, Architecture & Design", buttonText: "Explore", type: "career" },
      { id: "science-b", title: "Science – B Group", description: "Medicine, Nursing, Pharmacy & Allied Health", buttonText: "Explore", type: "career" },
    ],
  },
  {
    heading: "PROFESSIONAL FIELDS",
    cards: [
      { id: "law", title: "Law", description: "Legal Practice, Judiciary & Corporate Law", buttonText: "Explore", type: "career" },
      { id: "business-management", title: "Business Management", description: "BBA, BMS, MBA Pathways & Management Careers", buttonText: "Explore", type: "career" },
      { id: "hotel-management", title: "Hotel Management", description: "Hospitality, Catering & Tourism", buttonText: "Explore", type: "career" },
      { id: "mass-communication", title: "Mass Communication", description: "Journalism, Media, Broadcasting & PR", buttonText: "Explore", type: "career" },
      { id: "design-arts", title: "Design & Fine Arts", description: "Creative, Applied & Performing Arts Careers", buttonText: "Explore", type: "career" },
      { id: "economics", title: "Economics", description: "Financial Analysis, Research & Policy", buttonText: "Explore", type: "career" },
    ],
  },
  {
    heading: "MORE RESOURCES",
    cards: [
      { id: "social-work", title: "Social Work", description: "Community Development, NGOs & Social Change", buttonText: "Explore", type: "career" },
      { id: "sports-nda", title: "Sports & NDA", description: "Physical Education, Defence & Sports Management", buttonText: "Explore", type: "career" },
      { id: "faqs-students", title: "Students' FAQs", description: "Your Career Doubts — Solved", buttonText: "Read FAQs", type: "faq" },
      { id: "faqs-parents", title: "Parents' FAQs", description: "Guidance for Parents of 9th–12th Grade Students", buttonText: "Read FAQs", type: "faq" },
    ],
  },
];
