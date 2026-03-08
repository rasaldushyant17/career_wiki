export interface Degree {
  name: string;
  duration: string;
  professions: string;
  url?: string;
}

export interface Exam {
  name: string;
  detail: string;
  url?: string;
  eligibility?: string;
  pattern?: string;
  dates?: string;
  fees?: string;
}

export interface College {
  name: string;
  url: string;
}

export interface LinkedItem {
  name: string;
  url?: string;
}

export interface CareerField {
  id: string;
  title: string;
  subtitle: string;
  category: "foundation" | "professional" | "resource";
  badge?: string;
  infoBox?: string;
  degrees: Degree[];
  specialisations?: LinkedItem[];
  prospects: LinkedItem[];
  exams: Exam[];
  colleges?: College[];
  rankingLinks?: { label: string; url: string }[];
  extraSections?: {
    title: string;
    badge?: string;
    degrees?: Degree[];
    prospects?: LinkedItem[];
    specialisations?: LinkedItem[];
  }[];
}

export const careerFields: CareerField[] = [
  {
    id: "commerce",
    title: "Commerce",
    subtitle: "Finance, Accounting & Business Studies",
    category: "foundation",
    badge: "Commerce Stream",
    degrees: [
      { name: "B.Com (Bachelor of Commerce)", duration: "3 Years", professions: "Accountant, Finance Officer, Tax Consultant, Auditor", url: "https://www.google.com/search?q=B.Com+Bachelor+of+Commerce+course+India" },
      { name: "B.Com (Hons)", duration: "3 Years", professions: "Chartered Accountant (after CA), Financial Analyst", url: "https://www.shiksha.com/b-com-hons-chp" },
      { name: "B.Sc. Finance", duration: "3 Years", professions: "Financial Analyst, Investment Banker, Risk Manager", url: "https://www.google.com/search?q=B.Sc+Finance+degree+India" },
      { name: "BBA (Finance)", duration: "3 Years", professions: "Business Analyst, Finance Manager, Entrepreneur", url: "https://www.google.com/search?q=Best+BBA+colleges+in+India" },
      { name: "BFA (Financial Accounting)", duration: "3 Years", professions: "Accountant, Auditor, Tax Specialist", url: "https://www.google.com/search?q=BFA+Financial+Accounting+India" },
      { name: "B.Com (Professional)", duration: "3 Years", professions: "CA, CS, CWA – integrated pathways", url: "https://www.google.com/search?q=B.Com+Professional+India+courses" },
    ],
    specialisations: [
      { name: "CA – Chartered Accountant", url: "https://www.icai.org/" },
      { name: "CS – Company Secretary", url: "https://www.icsi.edu/" },
      { name: "CWA – Cost & Works Accountant", url: "https://icmai.in/" },
      { name: "CFA – Certified Finance Analyst", url: "https://www.cfainstitute.org/" },
      { name: "CFP – Certified Financial Planner", url: "https://www.fpsb.co.in/" },
      { name: "CIB – Certified Investment Banker", url: "https://www.google.com/search?q=Certified+Investment+Banker+India" },
      { name: "CSB – Certified Stock Broker", url: "https://www.nseindia.com/" },
      { name: "Certified Actuary", url: "https://www.actuariesindia.org/" },
    ],
    prospects: [
      { name: "Higher Studies in Finance / Economics", url: "https://www.google.com/search?q=MBA+Finance+course+India" },
      { name: "Govt Organizations (CAG, Planning Commission, IMF)", url: "https://www.cag.gov.in/" },
      { name: "Banks & Insurance", url: "https://www.ibps.in/" },
      { name: "Stock Broking", url: "https://www.google.com/search?q=NSE+Academy+certification+courses" },
      { name: "Corporate Finance & Accounting", url: "https://www.google.com/search?q=corporate+finance+careers+India" },
      { name: "Start own Venture", url: "https://www.startupindia.gov.in/" },
    ],
    exams: [
      { name: "NPAT – Narsee Monjee", detail: "English · Quant · Reasoning", url: "https://www.nmims.edu/npat/", eligibility: "10+2 with min 50% aggregate", pattern: "MCQ – English, Quantitative & Reasoning Aptitude", dates: "Twice a year (Jan–May window)", fees: "₹2,000 approx" },
      { name: "PDPU", detail: "GK · Verbal · Quant · Logical Reasoning · Creative Writing", url: "https://www.pdpu.ac.in/", eligibility: "10+2 any stream", pattern: "MCQ + Descriptive", dates: "April–May", fees: "₹1,200 approx" },
      { name: "PUBDET – Presidency University", detail: "Maths · English", url: "https://www.presiuniv.ac.in/", eligibility: "10+2 with Commerce subjects", pattern: "MCQ – Maths, English", dates: "May–June", fees: "₹500 approx" },
      { name: "CUET", detail: "Skill Assessment · Personal Interview", url: "https://cuet.nta.nic.in/", eligibility: "10+2 any stream with min 50%", pattern: "MCQ + Domain-specific + GK + Language", dates: "May–June (NTA conducts)", fees: "₹650–₹1,500" },
      { name: "Ahmedabad University", detail: "Personal Statement · Personal Interview", url: "https://ahduni.edu.in/", eligibility: "10+2 any stream", pattern: "Personal Statement + Interview", dates: "March–May", fees: "Contact university" },
    ],
    colleges: [
      { name: "SRCC – Delhi", url: "https://www.srcc.edu/" },
      { name: "Lady Shriram College (LSR) – Delhi", url: "https://www.lsr.edu.in/" },
      { name: "Hansraj College – Delhi", url: "https://www.hansrajcollege.ac.in/" },
      { name: "Hindu College – Delhi", url: "https://www.hinducollege.ac.in/" },
      { name: "Loyola College – Chennai", url: "https://www.loyolacollege.edu/" },
      { name: "St. Joseph's – Bangalore", url: "https://www.sjc.ac.in/" },
      { name: "Christ University – Bangalore", url: "https://christuniversity.in/" },
      { name: "MCC – Chennai", url: "https://www.mcc.edu.in/" },
      { name: "JD Birla – Kolkata", url: "https://www.jdbirlaschool.com/" },
      { name: "Mithibai – Mumbai", url: "https://www.mithibai.ac.in/" },
      { name: "Narsee Monjee – Mumbai", url: "https://www.nmims.edu/" },
      { name: "Symbiosis – Pune", url: "https://www.symbiosis.ac.in/" },
    ],
    rankingLinks: [
      { label: "NIRF Commerce Rankings", url: "https://www.google.com/search?q=NIRF+University+Ranking+India" },
      { label: "CollegeDunia Commerce Colleges", url: "https://collegedunia.com/bcom-colleges" },
      { label: "Shiksha Commerce Colleges", url: "https://www.google.com/search?q=B.Com+Bachelor+of+Commerce+course+India" },
    ],
  },
  {
    id: "law",
    title: "Law",
    subtitle: "Legal Practice, Judiciary & Corporate Law",
    category: "professional",
    badge: "Any Stream · 10+2",
    infoBox: "Eligibility: 10+2 from Any Stream. Minimum age may apply. Integrated law programs are 5 years.",
    degrees: [
      { name: "BA (Hons) LLB", duration: "5 Years", professions: "Lawyer, Advocate, Judge, Legal Advisor", url: "https://www.google.com/search?q=BA+LLB+course+India" },
      { name: "B.Com (Hons) LLB", duration: "5 Years", professions: "Corporate Legal Consultant, Tax Lawyer", url: "https://www.google.com/search?q=B.Com+LLB+integrated+India" },
      { name: "BBA (Hons) LLB", duration: "5 Years", professions: "Corporate Lawyer, Business Litigator", url: "https://www.google.com/search?q=BBA+LLB+integrated+India+colleges" },
      { name: "BLS (Hons) LLB", duration: "5 Years", professions: "Litigator, Public Prosecutor", url: "https://www.google.com/search?q=BLS+LLB+India" },
      { name: "B.Sc. (Hons) LLB", duration: "5 Years", professions: "Environmental Lawyer, IP Attorney", url: "https://www.google.com/search?q=B.Sc+LLB+India" },
      { name: "B.Tech LLB", duration: "5–6 Years", professions: "Technology Lawyer, Cyber Law Specialist, Patent Attorney", url: "https://www.google.com/search?q=B.Tech+LLB+India" },
    ],
    specialisations: [
      { name: "Constitutional Law", url: "https://www.google.com/search?q=Constitutional+Law+India+courses" },
      { name: "Environmental Law", url: "https://www.google.com/search?q=Environmental+Law+India+courses" },
      { name: "International Law", url: "https://www.google.com/search?q=International+Law+India+courses" },
      { name: "Administrative Law", url: "https://www.google.com/search?q=Administrative+Law+India+courses" },
      { name: "Human Rights", url: "https://nhrc.nic.in/" },
      { name: "Business Laws", url: "https://www.google.com/search?q=Business+Law+India+courses" },
      { name: "Intellectual Property", url: "https://ipindia.gov.in/" },
      { name: "Labour Law", url: "https://www.google.com/search?q=Labour+Law+India+courses" },
      { name: "Criminal Law", url: "https://www.google.com/search?q=Criminal+Law+India+courses" },
      { name: "Cyber Law", url: "https://www.google.com/search?q=Cyber+Law+India+courses" },
    ],
    prospects: [
      { name: "Litigation", url: "https://www.google.com/search?q=Litigation+career+India+roadmap" },
      { name: "Corporate Law", url: "https://www.google.com/search?q=Corporate+Law+career+India" },
      { name: "Social Work & NGOs", url: "https://www.google.com/search?q=Law+NGO+career+India" },
      { name: "Research & Academics", url: "https://www.google.com/search?q=Legal+research+career+India" },
      { name: "Judiciary", url: "https://www.google.com/search?q=How+to+become+judge+India" },
      { name: "International Organizations", url: "https://www.google.com/search?q=International+Law+organizations+career" },
      { name: "Legal Process Outsourcing (LPO)", url: "https://www.google.com/search?q=LPO+career+India" },
    ],
    exams: [
      { name: "CLAT – NLUs", detail: "Maths · English · Logic · GK · Legal · 200 Marks", url: "https://consortiumofnlus.ac.in/", eligibility: "10+2 with min 45% (40% for SC/ST)", pattern: "150 MCQs – English, Current Affairs, Legal Reasoning, Logical Reasoning, Quantitative", dates: "December (annually)", fees: "₹4,000 (₹3,500 SC/ST)" },
      { name: "AILET – NLU Delhi", detail: "Elementary Maths · English · Reasoning · GK · Legal · 150 Marks", url: "https://nludelhi.ac.in/", eligibility: "10+2 with min 50%", pattern: "150 MCQs in 90 minutes", dates: "June (annually)", fees: "₹3,050" },
      { name: "LSAT – Private Colleges", detail: "Analytical Reasoning · Logical Reasoning · Reading Comprehension", url: "https://www.lsac.org/lsat", eligibility: "10+2 completed or appearing", pattern: "Analytical Reasoning, Logical Reasoning, Reading Comprehension", dates: "January & June", fees: "₹3,999" },
      { name: "SET – Symbiosis Pune", detail: "Analytical · Reading · Logic · GK · Legal", url: "https://www.set-test.org/", eligibility: "10+2 any stream", pattern: "MCQ – Analytical, Logical, GK, Legal", dates: "May", fees: "₹2,250" },
      { name: "MH-CET (Law)", detail: "Legal Aptitude · GK · Logic · English · Maths", url: "https://cetcell.mahacet.org/", eligibility: "10+2 from Maharashtra domicile preferred", pattern: "MCQ – 150 questions in 2 hours", dates: "April–May", fees: "₹800" },
      { name: "CUET – Christ University", detail: "English · GK · Quant · Reasoning · Data Analysis", url: "https://cuet.nta.nic.in/", eligibility: "10+2 any stream", pattern: "MCQ domain + GK + Language", dates: "May–June", fees: "₹650–₹1,500" },
      { name: "UL-SAT – UPES Dehradun", detail: "Language · Quant · Logic · Legal GK", url: "https://www.upes.ac.in/", eligibility: "10+2 with min 50%", pattern: "MCQ + PI", dates: "Multiple slots", fees: "₹1,850" },
      { name: "MSU Baroda", detail: "English · Legal Aptitude · GK · Mental Aptitude", url: "https://www.msubaroda.ac.in/", eligibility: "10+2 any stream", pattern: "MCQ + Interview", dates: "May–June", fees: "₹500 approx" },
    ],
    colleges: [
      { name: "NLSIU Bangalore", url: "https://www.nls.ac.in/" },
      { name: "NLU Delhi", url: "https://nludelhi.ac.in/" },
      { name: "NALSAR Hyderabad", url: "https://www.nalsar.ac.in/" },
      { name: "NLU Jodhpur", url: "https://www.nlujodhpur.ac.in/" },
      { name: "NUJS Kolkata", url: "https://www.nujs.edu/" },
      { name: "Symbiosis Law School – Pune", url: "https://www.symlaw.ac.in/" },
      { name: "Auro University – Surat", url: "https://aurouniversity.edu.in/" },
      { name: "GLS Law College – Ahmedabad", url: "https://www.glslaw.org/" },
      { name: "LJ Institute – Ahmedabad", url: "https://www.ljinstitutes.edu.in/" },
      { name: "MS Ramaiah – Bangalore", url: "https://www.msruas.ac.in/" },
      { name: "ILS Law College – Pune", url: "https://www.ilslaw.in/" },
      { name: "Faculty of Law – DU", url: "https://lawfac.du.ac.in/" },
    ],
    rankingLinks: [
      { label: "NIRF Law Rankings", url: "https://www.google.com/search?q=NIRF+Law+Ranking+India" },
      { label: "CollegeDunia Law Colleges", url: "https://collegedunia.com/law-colleges" },
      { label: "Shiksha Law Colleges", url: "https://www.google.com/search?q=Top+Law+colleges+in+India" },
    ],
  },
  {
    id: "business-management",
    title: "Business Management",
    subtitle: "BBA, BMS, MBA Pathways & Management Careers",
    category: "professional",
    badge: "Any Stream · 10+2",
    infoBox: "Eligibility: 10+2 from Any Stream. Some programs require Maths/Statistics.",
    degrees: [
      { name: "IPM (Integrated Program in Management)", duration: "5 Years", professions: "Manager, Executive, Consultant, Entrepreneur", url: "https://www.iimidr.ac.in/academic-programmes/five-year-integrated-programme-in-management-ipm/" },
      { name: "BBA + MBA (Integrated)", duration: "5 Years", professions: "Business Analyst, Operations Manager, Marketing Head", url: "https://www.google.com/search?q=Integrated+BBA+MBA+India" },
      { name: "BBA (Bachelor of Business Administration)", duration: "3 Years", professions: "Administrator, HR Executive, Finance Associate", url: "https://www.google.com/search?q=Best+BBA+colleges+in+India" },
      { name: "BMS (Bachelor of Management Studies)", duration: "3 Years", professions: "Business Manager, Marketing Manager, Entrepreneur", url: "https://www.google.com/search?q=BMS+degree+India+colleges" },
      { name: "BBS (Bachelor of Business Studies)", duration: "3 Years", professions: "Sales Manager, Operations Executive", url: "https://www.google.com/search?q=BBS+degree+India" },
      { name: "BBM (Bachelor of Business Management)", duration: "3 Years", professions: "Brand Manager, Business Strategist", url: "https://www.google.com/search?q=BBM+degree+India+colleges" },
    ],
    specialisations: [
      { name: "Finance & Accounting", url: "https://www.google.com/search?q=BBA+Finance+specialisation+India" },
      { name: "Marketing & Advertising", url: "https://www.google.com/search?q=BBA+Marketing+specialisation+India" },
      { name: "International Business", url: "https://www.google.com/search?q=International+Business+degree+India" },
      { name: "Systems & Operations", url: "https://www.google.com/search?q=Operations+Management+career+India" },
      { name: "Information Technology", url: "https://www.google.com/search?q=IT+Management+career+India" },
      { name: "Human Resource", url: "https://www.google.com/search?q=HR+Management+career+India" },
      { name: "Event Management", url: "https://www.google.com/search?q=Event+Management+career+India" },
      { name: "Entrepreneurship", url: "https://www.startupindia.gov.in/" },
    ],
    prospects: [
      { name: "Government / Public Sector", url: "https://www.google.com/search?q=Government+management+jobs+India" },
      { name: "Multinational Corporations", url: "https://www.google.com/search?q=MNC+management+careers+India" },
      { name: "Entrepreneurship", url: "https://www.startupindia.gov.in/" },
      { name: "Family Business", url: "https://www.google.com/search?q=Family+business+management+India" },
      { name: "NGO Management", url: "https://www.google.com/search?q=NGO+Management+career+India" },
      { name: "International Business", url: "https://www.google.com/search?q=International+Business+career+roadmap" },
    ],
    exams: [
      { name: "IPM-AT – IIM Indore", detail: "Quant · Verbal", url: "https://www.iimidr.ac.in/academic-programmes/five-year-integrated-programme-in-management-ipm/", eligibility: "10+2 with min 60% (55% SC/ST)", pattern: "MCQ – Quantitative Ability & Verbal Ability", dates: "May (annually)", fees: "₹4,130" },
      { name: "UGAT – Private Colleges", detail: "English · Logical Reasoning · GK · Data Analysis", url: "https://www.aima.in/", eligibility: "10+2 any stream", pattern: "MCQ – English, Reasoning, GK, Quantitative, Data Analysis", dates: "May–June", fees: "₹1,300" },
      { name: "JSAT – Jindal Global", detail: "Verbal · Logic · Maths", url: "https://www.jgu.edu.in/", eligibility: "10+2 any stream", pattern: "MCQ + Essay + Interview", dates: "Multiple rounds", fees: "₹2,500" },
      { name: "NPAT – Narsee Monjee", detail: "English · Quant · Reasoning", url: "https://www.nmims.edu/npat/", eligibility: "10+2 with min 50%", pattern: "MCQ – English, Quant, Reasoning", dates: "Jan–May window", fees: "₹2,000 approx" },
      { name: "JAT – Shaheed Sukhdev (Delhi)", detail: "Quant · Reasoning · English · Business Awareness", url: "https://www.google.com/search?q=Shaheed+Sukhdev+CBS+JAT+exam", eligibility: "10+2 with Commerce/Maths preferred", pattern: "MCQ + GD + Interview", dates: "June", fees: "₹1,000 approx" },
      { name: "CUET", detail: "English · GK · Quant · Reasoning · Data Analysis", url: "https://cuet.nta.nic.in/", eligibility: "10+2 any stream", pattern: "MCQ domain + GK + Language", dates: "May–June", fees: "₹650–₹1,500" },
      { name: "SET – Symbiosis", detail: "General English · Quant · GK · Analytical Reasoning", url: "https://www.set-test.org/", eligibility: "10+2 any stream with min 50%", pattern: "MCQ – 4 sections", dates: "May", fees: "₹2,250" },
      { name: "Ahmedabad University", detail: "Personal Statement · Personal Interview", url: "https://ahduni.edu.in/", eligibility: "10+2 any stream", pattern: "SOP + Interview", dates: "March–May", fees: "Contact university" },
    ],
    colleges: [
      { name: "IIM Indore (IPM)", url: "https://www.iimidr.ac.in/" },
      { name: "Narsee Monjee – Mumbai", url: "https://www.nmims.edu/" },
      { name: "Symbiosis – Pune", url: "https://www.symbiosis.ac.in/" },
      { name: "Christ University – Bangalore", url: "https://christuniversity.in/" },
      { name: "Amity – Noida", url: "https://www.amity.edu/" },
      { name: "SRM – Chennai", url: "https://www.srmist.edu.in/" },
      { name: "Mount Carmel – Bangalore", url: "https://www.mountcarmelcollegeblr.co.in/" },
      { name: "Ness Wadia – Pune", url: "https://www.nesswadia.com/" },
      { name: "St. Francis – Hyderabad", url: "https://www.stfrancisdegreecollegehyd.com/" },
      { name: "JD Birla – Kolkata", url: "https://www.jdbi.ac.in/" },
      { name: "MCC – Chennai", url: "https://www.mcc.edu.in/" },
      { name: "Shaheed Sukhdev CBS – Delhi", url: "https://www.sscbsdu.ac.in/" },
    ],
    rankingLinks: [
      { label: "NIRF Management Rankings", url: "https://www.google.com/search?q=NIRF+Management+Ranking+India" },
      { label: "CollegeDunia BBA Colleges", url: "https://collegedunia.com/bba-colleges" },
      { label: "Shiksha BBA Colleges", url: "https://www.google.com/search?q=Best+BBA+colleges+in+India" },
    ],
  },
  {
    id: "hotel-management",
    title: "Hotel Management",
    subtitle: "Hospitality, Catering & Tourism",
    category: "professional",
    badge: "Any Stream · 10+2",
    degrees: [
      { name: "B.Sc. Hospitality & Hotel Administration", duration: "3 Years", professions: "Hotelier, Front Office Manager, Events Manager", url: "https://www.shiksha.com/hospitality-travel/bsc-hotel-management-chp" },
      { name: "BA (Hons) Hotel Management", duration: "4 Years", professions: "Hotel Director, Resort Manager, Travel Manager", url: "https://www.google.com/search?q=BA+Hotel+Management+India" },
      { name: "Culinary Arts", duration: "4 Years", professions: "Chef, Executive Chef, Food Consultant", url: "https://www.google.com/search?q=Culinary+Arts+degree+India" },
      { name: "B.Tech Hospitality", duration: "4 Years", professions: "Hospitality Engineer, Catering Manager, F&B Manager", url: "https://www.google.com/search?q=B.Tech+Hospitality+India" },
    ],
    prospects: [
      { name: "Restaurants & Fast Food", url: "https://www.google.com/search?q=Restaurant+Management+career+India" },
      { name: "Entrepreneurship", url: "https://www.startupindia.gov.in/" },
      { name: "Armed Forces Catering", url: "https://www.joinindianarmy.nic.in/" },
      { name: "Teaching", url: "https://www.google.com/search?q=Hotel+Management+teaching+career" },
      { name: "Flight Kitchen", url: "https://www.google.com/search?q=Flight+Kitchen+catering+career" },
      { name: "Marketing / Sales", url: "https://www.google.com/search?q=Hospitality+Marketing+career+India" },
      { name: "Hospital Catering", url: "https://www.google.com/search?q=Hospital+Catering+career" },
      { name: "Railway Catering", url: "https://www.irctc.co.in/" },
      { name: "Cruise Lines", url: "https://www.google.com/search?q=Cruise+Ship+career+India" },
    ],
    exams: [
      { name: "JEE (NCHM)", detail: "Numerical Ability · Reasoning · GK · English · Aptitude for Service Sector", url: "https://www.nchm.nic.in/", eligibility: "10+2 any stream with min 50%", pattern: "MCQ – 200 questions in 3 hours – Numerical, Reasoning, English, GK, Aptitude", dates: "April (NTA conducts)", fees: "₹1,100 (₹550 SC/ST)" },
      { name: "STEP – Oberoi Group", detail: "Group Discussion · Interview", url: "https://www.oberoihotels.com/step/", eligibility: "10+2 with min 50%, age 17–20", pattern: "Aptitude Test + GD + Interview", dates: "Jan–March", fees: "Contact Oberoi" },
      { name: "IHM-A – Taj Group", detail: "Profiling · SOP · Group Discussion · Interview", url: "https://www.ihma.ac.in/", eligibility: "10+2 any stream", pattern: "Profiling + SOP + GD + Interview", dates: "March–May", fees: "Contact IHM-A" },
      { name: "CUET", detail: "English · GK · Quant · Reasoning", url: "https://cuet.nta.nic.in/", eligibility: "10+2 any stream", pattern: "MCQ", dates: "May–June", fees: "₹650–₹1,500" },
      { name: "MH-CET (Hotel Mgmt)", detail: "English · Reasoning · GK", url: "https://cetcell.mahacet.org/", eligibility: "10+2 any stream, Maharashtra domicile preferred", pattern: "MCQ – 150 questions", dates: "April–May", fees: "₹800" },
      { name: "SET-GEN – Symbiosis", detail: "English · Logic · GK", url: "https://www.set-test.org/", eligibility: "10+2 any stream", pattern: "MCQ", dates: "May", fees: "₹2,250" },
      { name: "CET-BVP – Bharati Vidyapeeth", detail: "Reasoning · Numerical · Scientific Aptitude · GK · English", url: "https://www.bfrch.com/", eligibility: "10+2 any stream", pattern: "MCQ – 200 questions", dates: "May–June", fees: "₹1,200" },
    ],
    colleges: [
      { name: "IHM Delhi (Pusa)", url: "https://www.ihmdelhi.net/" },
      { name: "IHM Mumbai", url: "https://www.ihmmumbai.com/" },
      { name: "IHM Bangalore", url: "https://www.ihmbangalore.com/" },
      { name: "IHM Kolkata", url: "https://www.ihm-kolkata.com/" },
      { name: "IHM Goa", url: "https://www.ihmgoa.gov.in/" },
      { name: "IHM Srinagar", url: "https://www.ihmsrinagar.org/" },
      { name: "IHM Gandhinagar", url: "https://www.ihmgandhinagar.com/" },
      { name: "IHM Jaipur", url: "https://www.ihmjaipur.com/" },
      { name: "Welcome Group – Manipal", url: "https://manipal.edu/wgsha.html" },
      { name: "Auro University – Surat", url: "https://aurouniversity.edu.in/" },
      { name: "Rizvi College – Mumbai", url: "https://www.rizvi.edu.in/" },
      { name: "Oberoi Centre (STEP)", url: "https://www.oberoihotels.com/step/" },
    ],
    rankingLinks: [
      { label: "NIRF Hotel Management", url: "https://www.google.com/search?q=NIRF+Overall+Ranking+India" },
      { label: "CollegeDunia Hotel Management", url: "https://collegedunia.com/hotel-management-colleges" },
      { label: "Shiksha Hotel Management", url: "https://www.google.com/search?q=Top+Hotel+Management+colleges+in+India" },
    ],
  },
  {
    id: "mass-communication",
    title: "Mass Communication",
    subtitle: "Journalism, Media, Broadcasting & PR",
    category: "professional",
    badge: "Any Stream · 10+2",
    degrees: [
      { name: "BMM (Bachelor of Mass Media)", duration: "3 Years", professions: "Journalist, Reporter, Media Manager", url: "https://www.google.com/search?q=BMM+course+India" },
      { name: "BMC (Bachelor of Mass Communication)", duration: "3 Years", professions: "Anchor, Content Writer, PR Specialist", url: "https://www.google.com/search?q=BMC+degree+India" },
      { name: "BMS (Bachelor of Media Studies)", duration: "3 Years", professions: "Brand Manager, Editor, Copywriter", url: "https://www.google.com/search?q=BMS+Media+Studies+India" },
      { name: "BJMC (Journalism & Mass Communication)", duration: "3 Years", professions: "Journalist, News Editor, TV Reporter", url: "https://www.google.com/search?q=BJMC+course+India" },
      { name: "BA in Journalism", duration: "3 Years", professions: "Reporter, Correspondent, News Anchor, Photographer", url: "https://www.google.com/search?q=BA+Journalism+India+colleges" },
    ],
    specialisations: [
      { name: "Radio", url: "https://www.google.com/search?q=Radio+Journalism+career+India" },
      { name: "Design", url: "https://www.google.com/search?q=Media+Design+career+India" },
      { name: "Television", url: "https://www.google.com/search?q=Television+Journalism+career+India" },
      { name: "Writing & Editing", url: "https://www.google.com/search?q=Writing+Editing+career+India" },
      { name: "Print Media", url: "https://www.google.com/search?q=Print+Media+career+India" },
      { name: "Public Relations", url: "https://www.google.com/search?q=Public+Relations+career+India" },
      { name: "Sound Production", url: "https://www.google.com/search?q=Sound+Production+career+India" },
      { name: "Digital Media", url: "https://www.google.com/search?q=Digital+Media+career+India" },
    ],
    prospects: [
      { name: "Anchor / Reporter", url: "https://www.google.com/search?q=News+Anchor+career+roadmap+India" },
      { name: "Journalist", url: "https://www.google.com/search?q=Journalism+career+roadmap+India" },
      { name: "Copy Writer", url: "https://www.google.com/search?q=Copywriting+career+India" },
      { name: "Director / Cinematographer", url: "https://www.google.com/search?q=Cinematography+career+India" },
      { name: "Brand Manager", url: "https://www.google.com/search?q=Brand+Manager+career+India" },
      { name: "PR Specialist", url: "https://www.google.com/search?q=Public+Relations+career+roadmap" },
      { name: "Content Creator", url: "https://www.google.com/search?q=Content+Creator+career+India" },
    ],
    exams: [
      { name: "St. Xavier's – Mumbai", detail: "Data Interpretation · GK · Maths · English · Reasoning · Creative Thinking", url: "https://xaviers.edu/", eligibility: "10+2 any stream", pattern: "MCQ + Creative Writing + Interview", dates: "June", fees: "₹1,000 approx" },
      { name: "SET – Symbiosis", detail: "General English · Quant · GK · Analytical", url: "https://www.set-test.org/", eligibility: "10+2 any stream", pattern: "MCQ – 4 sections", dates: "May", fees: "₹2,250" },
      { name: "JSAT – Jindal", detail: "Verbal · Logical · Maths", url: "https://www.jgu.edu.in/", eligibility: "10+2 any stream", pattern: "MCQ + Essay + Interview", dates: "Multiple rounds", fees: "₹2,500" },
      { name: "CUET", detail: "English · Conceptual · GK · Case Study", url: "https://cuet.nta.nic.in/", eligibility: "10+2 any stream", pattern: "MCQ domain + GK + Language", dates: "May–June", fees: "₹650–₹1,500" },
      { name: "MU-OET – Manipal", detail: "Numeracy · GK · English · Conceptual", url: "https://manipal.edu/mu/admissions.html", eligibility: "10+2 any stream", pattern: "MCQ online test", dates: "March–May", fees: "₹1,500" },
      { name: "DU Entrance – Indraprastha", detail: "General Awareness · Media Awareness · English · Analytical Skills", url: "https://www.ipu.ac.in/", eligibility: "10+2 any stream with min 50%", pattern: "MCQ – 100 questions", dates: "June", fees: "₹1,200" },
    ],
    colleges: [
      { name: "IIMC – New Delhi", url: "https://www.iimc.nic.in/" },
      { name: "Symbiosis Institute – Pune", url: "https://www.google.com/search?q=SIMC+Symbiosis+Institute+of+Media+and+Communication" },
      { name: "Xavier Institute – Mumbai", url: "https://xaviers.edu/" },
      { name: "Jamia Millia Islamia – Delhi", url: "https://www.jmi.ac.in/" },
      { name: "Manipal Institute – Manipal", url: "https://manipal.edu/somc.html" },
      { name: "Jindal School – Sonipat", url: "https://www.jgu.edu.in/" },
      { name: "Christ University – Bangalore", url: "https://christuniversity.in/" },
      { name: "Lady Shriram (LSR) – Delhi", url: "https://www.lsr.edu.in/" },
      { name: "IP University – Delhi", url: "https://www.ipu.ac.in/" },
      { name: "Amity School – Noida", url: "https://www.amity.edu/" },
    ],
    rankingLinks: [
      { label: "NIRF Media Rankings", url: "https://www.google.com/search?q=NIRF+Overall+Ranking+India" },
      { label: "CollegeDunia Mass Comm", url: "https://collegedunia.com/mass-communication-colleges" },
      { label: "Shiksha Journalism Colleges", url: "https://www.google.com/search?q=Top+Mass+Communication+colleges+in+India" },
    ],
  },
  {
    id: "design-arts",
    title: "Design & Fine Arts",
    subtitle: "Creative, Applied & Performing Arts Careers",
    category: "professional",
    badge: "Any Stream · 3–4 Years",
    degrees: [
      { name: "B.I.D – Bachelor of Interior Design", duration: "4 Years", professions: "Interior Designer, Space Planner", url: "https://www.google.com/search?q=BID+Interior+Design+India+colleges" },
      { name: "B.Des – Bachelor of Design", duration: "4 Years", professions: "Fashion, Graphic, Product, Game Designer", url: "https://www.nid.edu/" },
      { name: "BFA – Bachelor of Fine Arts", duration: "4 Years", professions: "Artist, Illustrator, Art Director", url: "https://www.google.com/search?q=BFA+Bachelor+of+Fine+Arts+course+India" },
      { name: "BVA – Bachelor of Visual Arts", duration: "3 Years", professions: "Visual Artist, Photographer, Creative Director", url: "https://www.google.com/search?q=BVA+Visual+Arts+India" },
      { name: "B.Cr.A – Bachelor of Creative Arts", duration: "3 Years", professions: "Creative Consultant, Designer", url: "https://www.google.com/search?q=Bachelor+Creative+Arts+India" },
    ],
    specialisations: [
      { name: "Apparel Design", url: "https://www.google.com/search?q=Apparel+Design+career+India" },
      { name: "Fashion Design", url: "https://www.nift.ac.in/" },
      { name: "Industrial Design", url: "https://www.nid.edu/" },
      { name: "Textile Design", url: "https://www.nift.ac.in/" },
      { name: "Automobile Design", url: "https://www.google.com/search?q=Automobile+Design+career+India" },
      { name: "Furniture Design", url: "https://www.google.com/search?q=Furniture+Design+career+India" },
      { name: "Interior Design", url: "https://www.google.com/search?q=Interior+Design+career+India" },
      { name: "Ceramic Design", url: "https://www.google.com/search?q=Ceramic+Design+career+India" },
      { name: "Game Design", url: "https://www.google.com/search?q=Game+Design+career+India" },
      { name: "Jewellery Design", url: "https://www.google.com/search?q=Jewellery+Design+career+India" },
      { name: "Photography", url: "https://www.google.com/search?q=Photography+career+India" },
      { name: "Graphic Design", url: "https://www.google.com/search?q=Graphic+Design+career+India" },
      { name: "Product Design", url: "https://www.google.com/search?q=Product+Design+career+India" },
      { name: "Knitwear Design", url: "https://www.google.com/search?q=Knitwear+Design+career+India" },
      { name: "Exhibition Design", url: "https://www.google.com/search?q=Exhibition+Design+career+India" },
    ],
    prospects: [
      { name: "Higher Studies", url: "https://www.google.com/search?q=Design+higher+studies+India" },
      { name: "Advertising Agency", url: "https://www.google.com/search?q=Advertising+agency+career+India" },
      { name: "Television & Film Industry", url: "https://www.google.com/search?q=Film+industry+design+career" },
      { name: "Art Industry", url: "https://www.google.com/search?q=Art+industry+career+India" },
      { name: "Fashion Houses", url: "https://www.google.com/search?q=Fashion+House+career+India" },
      { name: "Creative Departments", url: "https://www.google.com/search?q=Creative+department+career+India" },
      { name: "Studios", url: "https://www.google.com/search?q=Design+Studio+career+India" },
      { name: "Self-employed Artist", url: "https://www.google.com/search?q=Freelance+artist+career+India" },
    ],
    exams: [
      { name: "DAT – NID", detail: "MCQ + Subjective + Studio Test", url: "https://admissions.nid.edu/", eligibility: "10+2 any stream", pattern: "Prelims (MCQ + Subjective) → Studio Test + Interview", dates: "December–January (prelims), April (mains)", fees: "₹3,150" },
      { name: "UCEED – IIT Mumbai", detail: "Numerical + Multiple Selection + Design Aptitude", url: "https://www.uceed.iitb.ac.in/", eligibility: "10+2 any stream, max 2 attempts", pattern: "MCQ + MSQ + Numerical + Drawing", dates: "January", fees: "₹3,500 (₹1,750 SC/ST)" },
      { name: "GAT – NIFT", detail: "Quantitative, Communication, English, Analytical, GK", url: "https://www.nift.ac.in/", eligibility: "10+2 any stream", pattern: "GAT (MCQ) + Situation Test / Studio Test", dates: "February", fees: "₹3,000 (₹1,500 SC/ST)" },
      { name: "MIT Design Aptitude", detail: "Design Aptitude Test + Studio Test", url: "https://www.mitid.edu.in/", eligibility: "10+2 any stream", pattern: "Design Aptitude + Studio + Interview", dates: "January–February", fees: "₹2,500" },
      { name: "SET – Symbiosis", detail: "Design Aptitude · Symbiosis Pune", url: "https://www.set-test.org/", eligibility: "10+2 any stream", pattern: "MCQ + Portfolio review", dates: "May", fees: "₹2,250" },
      { name: "Nirma-ET", detail: "Written Test + Interview", url: "https://www.nirmauni.ac.in/", eligibility: "10+2 any stream", pattern: "Written Test + Personal Interview", dates: "April–May", fees: "₹1,500" },
    ],
    colleges: [
      { name: "NID Ahmedabad", url: "https://www.nid.edu/" },
      { name: "NIFT Delhi", url: "https://www.nift.ac.in/" },
      { name: "IDC IIT Bombay", url: "https://www.idc.iitb.ac.in/" },
      { name: "Srishti Manipal – Bangalore", url: "https://srishtimanipalinstitute.in/" },
      { name: "MIT Institute – Pune", url: "https://www.mitid.edu.in/" },
      { name: "Pearl Academy – Delhi/Mumbai", url: "https://www.pearlacademy.com/" },
      { name: "JJ School of Art – Mumbai", url: "https://www.jjiipa.org/" },
      { name: "Faculty of Fine Arts – BHU", url: "https://www.google.com/search?q=Banaras+Hindu+University+official+website" },
      { name: "Symbiosis Institute of Design – Pune", url: "https://www.sid.edu.in/" },
      { name: "Nirma University – Ahmedabad", url: "https://www.nirmauni.ac.in/" },
    ],
    rankingLinks: [
      { label: "NIRF Design Rankings", url: "https://www.google.com/search?q=NIRF+Overall+Ranking+India" },
      { label: "CollegeDunia Design Colleges", url: "https://collegedunia.com/design-colleges" },
      { label: "Shiksha Design Colleges", url: "https://www.google.com/search?q=Top+Design+colleges+in+India" },
    ],
    extraSections: [
      {
        title: "Performing Arts",
        badge: "BPA · 3 Years",
        degrees: [
          { name: "BPA – Bachelor of Performing Arts", duration: "3 Years", professions: "Actor, Musician, Dancer, Choreographer", url: "https://www.google.com/search?q=BPA+Performing+Arts+India" },
          { name: "BA in Performing Arts (Music / Dance / Theatre)", duration: "3 Years", professions: "Composer, Singer, Stage Artist", url: "https://www.google.com/search?q=BA+Performing+Arts+India" },
        ],
        prospects: [
          { name: "Acting Industry", url: "https://www.google.com/search?q=Acting+career+India" },
          { name: "Music & Composition", url: "https://www.google.com/search?q=Music+career+India" },
          { name: "Talent Management", url: "https://www.google.com/search?q=Talent+Management+career" },
          { name: "Dancing & Choreography", url: "https://www.google.com/search?q=Dance+career+India" },
          { name: "Entertainment Industry", url: "https://www.google.com/search?q=Entertainment+industry+career+India" },
          { name: "Sculpting", url: "https://www.google.com/search?q=Sculpting+career+India" },
        ],
      },
    ],
  },
  {
    id: "economics",
    title: "Economics",
    subtitle: "Financial Analysis, Research & Policy",
    category: "professional",
    badge: "Any Stream · 10+2",
    degrees: [
      { name: "BA (Hons) Economics", duration: "3 Years", professions: "Economist, Financial Analyst, Data Analyst, Journalist", url: "https://www.google.com/search?q=Best+Economics+colleges+in+India" },
      { name: "B.Sc (Hons) Economics", duration: "3 Years", professions: "Risk Analyst, Investment Analyst, Economic Researcher", url: "https://www.google.com/search?q=BSc+Economics+India" },
    ],
    prospects: [
      { name: "Multinational Trading", url: "https://www.google.com/search?q=International+Trading+career+India" },
      { name: "Export / Import", url: "https://www.google.com/search?q=Export+Import+career+India" },
      { name: "International Monetary Fund (IMF)", url: "https://www.imf.org/en/About/Recruitment" },
      { name: "Planning Commission", url: "https://www.niti.gov.in/" },
      { name: "Govt / Private Sector Banks", url: "https://www.ibps.in/" },
      { name: "Journalism", url: "https://www.google.com/search?q=Economic+Journalism+career+India" },
      { name: "Economic Research", url: "https://www.google.com/search?q=Economic+Research+career+India" },
      { name: "International Economics", url: "https://www.google.com/search?q=International+Economics+career" },
    ],
    exams: [
      { name: "NPAT – Narsee Monjee", detail: "English · Quant · Reasoning", url: "https://www.nmims.edu/npat/", eligibility: "10+2 with min 50%", pattern: "MCQ – English, Quant, Reasoning", dates: "Jan–May", fees: "₹2,000" },
      { name: "SET – Symbiosis", detail: "English · Quant · GK · Analytical", url: "https://www.set-test.org/", eligibility: "10+2 any stream", pattern: "MCQ – 4 sections", dates: "May", fees: "₹2,250" },
      { name: "JSAT – Jindal", detail: "Verbal · Logical · Maths", url: "https://www.jgu.edu.in/", eligibility: "10+2 any stream", pattern: "MCQ + Essay + Interview", dates: "Multiple rounds", fees: "₹2,500" },
      { name: "CUET", detail: "Interview · Academic Performance", url: "https://cuet.nta.nic.in/", eligibility: "10+2 any stream", pattern: "MCQ domain + GK + Language", dates: "May–June", fees: "₹650–₹1,500" },
      { name: "CET-IP – IP University", detail: "General English · Economics & Statistics · Mathematics", url: "https://www.ipu.ac.in/", eligibility: "10+2 with Economics/Maths", pattern: "MCQ – English, Economics, Maths", dates: "June", fees: "₹1,200" },
      { name: "NET – Azim Premji University", detail: "English · Quant", url: "https://azimpremjiuniversity.edu.in/", eligibility: "10+2 any stream", pattern: "Analytical + Written + Interview", dates: "March–April", fees: "₹1,200" },
    ],
    colleges: [
      { name: "SRCC – Delhi", url: "https://www.srcc.edu/" },
      { name: "Hindu College – Delhi", url: "https://www.hinducollege.ac.in/" },
      { name: "St. Stephen's – Delhi", url: "https://www.ststephens.edu/" },
      { name: "Presidency University – Kolkata", url: "https://www.presiuniv.ac.in/" },
      { name: "Madras Christian College – Chennai", url: "https://www.mcc.edu.in/" },
      { name: "Loyola College – Chennai", url: "https://www.loyolacollege.edu/" },
      { name: "Symbiosis School of Economics – Pune", url: "https://www.sse.ac.in/" },
      { name: "Christ University – Bangalore", url: "https://christuniversity.in/" },
      { name: "Narsee Monjee – Mumbai", url: "https://www.nmims.edu/" },
      { name: "Azim Premji University – Bangalore", url: "https://azimpremjiuniversity.edu.in/" },
    ],
    rankingLinks: [
      { label: "NIRF University Rankings", url: "https://www.google.com/search?q=NIRF+University+Ranking+India" },
      { label: "CollegeDunia Economics Colleges", url: "https://collegedunia.com/ba-economics-colleges" },
      { label: "Shiksha Economics Colleges", url: "https://www.google.com/search?q=Best+Economics+colleges+in+India" },
    ],
  },
  {
    id: "science-a",
    title: "Science – A Group",
    subtitle: "Engineering, Technology, Architecture & Design",
    category: "foundation",
    badge: "PCM Stream · 10+2",
    degrees: [
      { name: "B.Tech / B.E", duration: "4 Years", professions: "Engineer, Mathematician, Scientist, Architect, Commercial Pilot, Astronaut", url: "https://www.google.com/search?q=Best+BTech+colleges+in+India" },
      { name: "B.F.Tech (Fashion Technology)", duration: "4 Years", professions: "Physicist, Statistician, Interior Designer, Fashion Designer", url: "https://www.nift.ac.in/" },
      { name: "B.Arch (Architecture)", duration: "5 Years", professions: "Architect, Town Planner, Urban Designer", url: "https://www.google.com/search?q=B.Arch+course+India" },
      { name: "B.Plan (Planning)", duration: "4 Years", professions: "Town Planner, Urban Planner", url: "https://www.google.com/search?q=B.Plan+Planning+India+colleges" },
      { name: "B.I.D (Interior Design)", duration: "4 Years", professions: "Interior Designer", url: "https://www.google.com/search?q=BID+Interior+Design+India" },
      { name: "B.Des (Design)", duration: "4 Years", professions: "Product Designer, UX Designer", url: "https://www.nid.edu/" },
    ],
    specialisations: [
      { name: "Aerospace", url: "https://www.google.com/search?q=Aerospace+Engineering+India+best+colleges" },
      { name: "Computer Science", url: "https://www.google.com/search?q=Computer+Science+Engineering+India+best+colleges" },
      { name: "Electrical", url: "https://www.google.com/search?q=Electrical+Engineering+career+India" },
      { name: "Electronics & Communication", url: "https://www.google.com/search?q=ECE+Engineering+career+India" },
      { name: "Mechanical", url: "https://www.google.com/search?q=Mechanical+Engineering+career+India" },
      { name: "Civil", url: "https://www.google.com/search?q=Civil+Engineering+career+India" },
      { name: "Chemical", url: "https://www.google.com/search?q=Chemical+Engineering+career+India" },
      { name: "Biotechnology", url: "https://www.google.com/search?q=Biotechnology+Engineering+career+India" },
      { name: "Agricultural & Food", url: "https://www.google.com/search?q=Agricultural+Engineering+career+India" },
      { name: "Architecture", url: "https://www.google.com/search?q=Architecture+career+India" },
      { name: "Automobile", url: "https://www.google.com/search?q=Automobile+Engineering+career+India" },
      { name: "Biochemical", url: "https://www.google.com/search?q=Biochemical+Engineering+India" },
      { name: "Biological Sciences", url: "https://www.google.com/search?q=Biological+Sciences+Engineering+India" },
      { name: "Ceramic", url: "https://www.google.com/search?q=Ceramic+Engineering+India" },
      { name: "Electronics", url: "https://www.google.com/search?q=Electronics+Engineering+India" },
      { name: "Electronics & Electrical", url: "https://www.google.com/search?q=EEE+Engineering+career+India" },
      { name: "Electronics & Instrumentation", url: "https://www.google.com/search?q=Electronics+Instrumentation+Engineering" },
      { name: "Engineering Physics", url: "https://www.google.com/search?q=Engineering+Physics+career+India" },
      { name: "Environmental", url: "https://www.google.com/search?q=Environmental+Engineering+career+India" },
      { name: "Industrial", url: "https://www.google.com/search?q=Industrial+Engineering+career+India" },
      { name: "Instrumentation", url: "https://www.google.com/search?q=Instrumentation+Engineering+India" },
      { name: "Manufacturing Science", url: "https://www.google.com/search?q=Manufacturing+Engineering+India" },
      { name: "Material Science", url: "https://www.google.com/search?q=Material+Science+Engineering+India" },
      { name: "Mathematics & Computing", url: "https://www.google.com/search?q=Mathematics+Computing+Engineering+India" },
      { name: "Metallurgical", url: "https://www.google.com/search?q=Metallurgical+Engineering+India" },
      { name: "Mineral / Mining", url: "https://www.google.com/search?q=Mining+Engineering+India" },
      { name: "Mining Machinery", url: "https://www.google.com/search?q=Mining+Machinery+Engineering+India" },
      { name: "Naval Architecture", url: "https://www.google.com/search?q=Naval+Architecture+Engineering+India" },
      { name: "Ocean Engineering", url: "https://www.google.com/search?q=Ocean+Engineering+India" },
      { name: "Petroleum", url: "https://www.google.com/search?q=Petroleum+Engineering+India" },
      { name: "Plastic", url: "https://www.google.com/search?q=Plastic+Engineering+India" },
      { name: "Polymer Science", url: "https://www.google.com/search?q=Polymer+Science+Engineering+India" },
      { name: "Production", url: "https://www.google.com/search?q=Production+Engineering+India" },
      { name: "Textile Technology", url: "https://www.google.com/search?q=Textile+Technology+Engineering+India" },
    ],
    prospects: [
      { name: "Engineering & Technology Firms", url: "https://www.google.com/search?q=Engineering+career+India" },
      { name: "Research & Academics", url: "https://www.google.com/search?q=Engineering+research+career+India" },
      { name: "Government PSUs", url: "https://www.google.com/search?q=PSU+jobs+engineers+India" },
      { name: "Defence & Space (ISRO, DRDO)", url: "https://www.isro.gov.in/Careers.html" },
      { name: "IT & Software Industry", url: "https://www.google.com/search?q=Software+Engineering+career+India" },
      { name: "Architecture & Design Firms", url: "https://www.google.com/search?q=Architecture+firms+career+India" },
    ],
    exams: [
      { name: "JEE Main", detail: "Physics + Chemistry + Maths · 300 Marks · NTA conducts twice a year", url: "https://jeemain.nta.nic.in/", eligibility: "10+2 with PCM, min 75% (65% SC/ST) or top 20 percentile", pattern: "Paper 1 (B.E/B.Tech): 90 MCQs – Physics 30, Chemistry 30, Maths 30. Paper 2 (B.Arch): Maths, Aptitude, Drawing", dates: "January & April (twice a year)", fees: "₹1,000 (₹500 SC/ST/PwD)" },
      { name: "JEE Advanced", detail: "For IITs · Top 2.5 lakh JEE Main qualifiers eligible", url: "https://jeeadv.ac.in/", eligibility: "Top 2,50,000 in JEE Main, max 2 consecutive attempts, age < 25", pattern: "2 papers of 3 hours each – Physics, Chemistry, Maths (MCQ + Numerical)", dates: "June (annually)", fees: "₹2,800 (₹1,400 SC/ST)" },
      { name: "NATA", detail: "National Aptitude Test in Architecture · Drawing + MCQ", url: "https://www.nata.in/", eligibility: "10+2 with Maths, min 50%", pattern: "Drawing + MCQ (Maths, General Aptitude, Logical Reasoning)", dates: "April (twice a year)", fees: "₹2,000" },
      { name: "BITSAT", detail: "Physics + Chemistry + Maths + English + Logical Reasoning", url: "https://www.bitsadmission.com/", eligibility: "10+2 with PCM, min 75% aggregate + 60% each in PCM", pattern: "150 MCQs in 3 hours – Physics (40), Chemistry (40), Maths (45), English (15), Logical Reasoning (10)", dates: "May–June", fees: "₹3,400" },
      { name: "VITEEE", detail: "Physics + Chemistry + Maths + English + Aptitude", url: "https://viteee.vit.ac.in/", eligibility: "10+2 with PCM/PCB, min 60%", pattern: "125 MCQs – Physics, Chemistry, Maths/Bio, English, Aptitude", dates: "April", fees: "₹1,150" },
    ],
    colleges: [
      { name: "IIT Bombay", url: "https://www.iitb.ac.in/" },
      { name: "IIT Delhi", url: "https://home.iitd.ac.in/" },
      { name: "IIT Madras", url: "https://www.iitm.ac.in/" },
      { name: "IIT Kanpur", url: "https://www.iitk.ac.in/" },
      { name: "IIT Kharagpur", url: "https://www.iitkgp.ac.in/" },
      { name: "IIT Roorkee", url: "https://www.iitr.ac.in/" },
      { name: "IIT Guwahati", url: "https://www.iitg.ac.in/" },
      { name: "NIT Trichy", url: "https://www.nitt.edu/" },
      { name: "NIT Warangal", url: "https://www.nitw.ac.in/" },
      { name: "NIT Surathkal", url: "https://www.nitk.ac.in/" },
      { name: "BITS Pilani", url: "https://www.bits-pilani.ac.in/" },
      { name: "VIT Vellore", url: "https://vit.ac.in/" },
      { name: "SPA Delhi", url: "https://spa.ac.in/" },
      { name: "DTU Delhi", url: "https://www.dtu.ac.in/" },
      { name: "NSUT Delhi", url: "https://www.nsut.ac.in/" },
    ],
    rankingLinks: [
      { label: "NIRF Engineering Rankings", url: "https://www.google.com/search?q=NIRF+Engineering+Ranking+India" },
      { label: "CollegeDunia Engineering", url: "https://collegedunia.com/engineering-colleges" },
      { label: "Shiksha Engineering Colleges", url: "https://www.google.com/search?q=Top+Engineering+colleges+in+India" },
    ],
  },
  {
    id: "science-b",
    title: "Science – B Group",
    subtitle: "Medicine, Nursing, Pharmacy, Agriculture & Allied Health",
    category: "foundation",
    badge: "PCB Stream",
    degrees: [
      { name: "MBBS", duration: "5.5 Years", professions: "Doctor, Surgeon, Medical Officer, Physician", url: "https://www.google.com/search?q=MBBS+course+India" },
      { name: "BDS (Dental Surgery)", duration: "5 Years", professions: "Dentist, Oral Surgeon, Dental Consultant", url: "https://www.google.com/search?q=BDS+course+India" },
      { name: "BAMS (Ayurvedic Medicine)", duration: "5.5 Years", professions: "Ayurvedic Doctor, Wellness Consultant", url: "https://www.google.com/search?q=BAMS+Ayurveda+India+colleges" },
      { name: "BHMS (Homeopathic Medicine)", duration: "5.5 Years", professions: "Homeopathic Doctor, Practitioner", url: "https://www.google.com/search?q=BHMS+Homeopathy+India" },
      { name: "BUMS (Unani Medicine)", duration: "5.5 Years", professions: "Unani Physician", url: "https://www.google.com/search?q=BUMS+Unani+Medicine+India" },
      { name: "BSMS (Siddha Medicine)", duration: "5.5 Years", professions: "Siddha Physician", url: "https://www.google.com/search?q=BSMS+Siddha+Medicine+India" },
      { name: "BNYS (Naturopathy & Yoga)", duration: "5.5 Years", professions: "Naturopathist, Yoga Therapist", url: "https://www.google.com/search?q=BNYS+Naturopathy+India" },
      { name: "B.Sc. Nursing", duration: "4 Years", professions: "Staff Nurse, Nursing Officer, Midwife", url: "https://www.google.com/search?q=BSc+Nursing+course+India" },
      { name: "BPT (Physiotherapy)", duration: "4.5 Years", professions: "Physiotherapist, Rehab Specialist", url: "https://www.google.com/search?q=BPT+Physiotherapy+India+colleges" },
      { name: "BOT (Occupational Therapy)", duration: "4.5 Years", professions: "Occupational Therapist", url: "https://www.google.com/search?q=BOT+Occupational+Therapy+India" },
      { name: "B. Optom (Optometry)", duration: "4 Years", professions: "Optometrist, Vision Therapist", url: "https://www.google.com/search?q=B.Optom+Optometry+India" },
      { name: "Pharm. D (Pharmacy)", duration: "6 Years", professions: "Clinical Pharmacist, Drug Inspector", url: "https://www.google.com/search?q=Pharm.D+India+colleges" },
      { name: "B. Pharm (Pharmacy)", duration: "4 Years", professions: "Pharmacist, Pharmaceutical Sales, R&D", url: "https://www.google.com/search?q=B.Pharm+course+India" },
      { name: "B.Sc. Agriculture", duration: "4 Years", professions: "Agronomist, Agricultural Officer", url: "https://www.google.com/search?q=BSc+Agriculture+India+colleges" },
      { name: "B.V.Sc (Veterinary Science)", duration: "5.5 Years", professions: "Veterinarian, Animal Researcher", url: "https://www.google.com/search?q=BVSc+Veterinary+Science+India" },
      { name: "B.F.Sc (Fisheries Science)", duration: "4 Years", professions: "Fisheries Officer, Marine Biologist", url: "https://www.google.com/search?q=BFSc+Fisheries+Science+India" },
    ],
    prospects: [
      { name: "State / Central Civil Medical Service", url: "https://www.google.com/search?q=Civil+Medical+Services+career+India" },
      { name: "Civil Service Exams", url: "https://www.upsc.gov.in/" },
      { name: "Start own Hospital / Clinic", url: "https://www.google.com/search?q=How+to+start+hospital+India" },
      { name: "Pharmaceutical Sales & Marketing", url: "https://www.google.com/search?q=Pharmaceutical+Sales+career+India" },
      { name: "Research & Academics", url: "https://www.google.com/search?q=Medical+Research+career+India" },
      { name: "Corporate / Private Hospital", url: "https://www.google.com/search?q=Private+Hospital+career+India" },
    ],
    exams: [
      { name: "NEET UG", detail: "Physics (45) + Chemistry (45) + Biology (90) = 180 Questions · 720 Marks", url: "https://neet.nta.nic.in/", eligibility: "10+2 with PCB, min 50% (40% SC/ST/OBC), age 17+, no upper age limit", pattern: "180 MCQs (Physics 45, Chemistry 45, Botany 45, Zoology 45) – 720 Marks in 3 hours 20 min", dates: "May (annually, NTA conducts)", fees: "₹1,700 (₹1,000 SC/ST/PwD)" },
      { name: "AIIMS (merged with NEET)", detail: "Now part of NEET UG counselling", url: "https://www.aiims.edu/", eligibility: "Through NEET UG score", pattern: "NEET UG score based", dates: "Same as NEET", fees: "Through NEET" },
      { name: "JIPMER (merged with NEET)", detail: "Now part of NEET UG counselling", url: "https://www.jipmer.edu.in/", eligibility: "Through NEET UG score", pattern: "NEET UG score based", dates: "Same as NEET", fees: "Through NEET" },
    ],
    colleges: [
      { name: "AIIMS New Delhi", url: "https://www.aiims.edu/" },
      { name: "Maulana Azad Medical – Delhi", url: "https://www.mamc.ac.in/" },
      { name: "CMC Vellore", url: "https://www.cmch-vellore.edu/" },
      { name: "AFMC Pune", url: "https://www.afmc.nic.in/" },
      { name: "JIPMER Puducherry", url: "https://www.jipmer.edu.in/" },
      { name: "Kasturba Medical College – Manipal", url: "https://manipal.edu/kmc-manipal.html" },
      { name: "Grant Medical College – Mumbai", url: "https://www.google.com/search?q=Grant+Medical+College+Mumbai" },
      { name: "Lady Hardinge – Delhi", url: "https://www.lhmc-hosp.gov.in/" },
      { name: "King George's – Lucknow", url: "https://www.kgmu.org/" },
      { name: "BJ Medical College – Pune", url: "https://www.bjmcpune.org/" },
      { name: "KEM Hospital – Mumbai", url: "https://www.kem.edu/" },
      { name: "Govt Medical College – Chandigarh", url: "https://gmch.gov.in/" },
      { name: "PGIMER – Chandigarh", url: "https://pgimer.edu.in/" },
      { name: "Madras Medical College – Chennai", url: "https://www.mmc.ac.in/" },
      { name: "BHU Medical – Varanasi", url: "https://www.google.com/search?q=Banaras+Hindu+University+official+website" },
    ],
    rankingLinks: [
      { label: "NIRF Medical Rankings", url: "https://www.google.com/search?q=NIRF+Medical+Ranking+India" },
      { label: "CollegeDunia Medical Colleges", url: "https://collegedunia.com/medical-colleges" },
      { label: "Shiksha Medical Colleges", url: "https://www.google.com/search?q=Top+Medical+colleges+in+India" },
    ],
  },
  {
    id: "social-work",
    title: "Social Work",
    subtitle: "Community Development, NGOs & Social Change",
    category: "resource",
    badge: "Any Stream · 3–5 Years",
    degrees: [
      { name: "BA (Hons) Social Work", duration: "3 Years", professions: "Social Worker, Community Organiser, Counsellor", url: "https://www.google.com/search?q=BA+Social+Work+India+colleges" },
      { name: "BSW – Bachelor of Social Work", duration: "3 Years", professions: "NGO Volunteer, Child Welfare Officer", url: "https://www.google.com/search?q=BSW+degree+India" },
      { name: "Integrated BA–MA Social Work", duration: "5 Years", professions: "Senior Social Worker, Policy Analyst, Researcher", url: "https://admissions.tiss.edu/" },
      { name: "BRS – Bachelor of Rural Studies", duration: "3 Years", professions: "Rural Development Officer, Field Researcher", url: "https://www.google.com/search?q=BRS+Rural+Studies+India" },
    ],
    prospects: [
      { name: "Higher Education / Research", url: "https://www.google.com/search?q=Social+Work+higher+studies+India" },
      { name: "Civil Services", url: "https://www.upsc.gov.in/" },
      { name: "Community Organisation", url: "https://www.google.com/search?q=Community+Organisation+career+India" },
      { name: "NGOs & Non-Profits", url: "https://www.google.com/search?q=NGO+career+India" },
      { name: "Child & Women Welfare", url: "https://wcd.nic.in/" },
      { name: "Criminology", url: "https://www.google.com/search?q=Criminology+career+India" },
      { name: "Disability Services", url: "https://www.google.com/search?q=Disability+Services+career+India" },
      { name: "Social Activism", url: "https://www.google.com/search?q=Social+Activism+career+India" },
    ],
    exams: [
      { name: "TISS-BAT", detail: "GK, Analytical Reasoning, Logical Reasoning, English", url: "https://admissions.tiss.edu/", eligibility: "10+2 any stream with min 50% (45% SC/ST)", pattern: "MCQ – GK, Analytical, Logical, English (100 questions in 2 hours)", dates: "January–February", fees: "₹1,120" },
      { name: "MSU Baroda", detail: "Group Discussion + Personal Interview", url: "https://www.msubaroda.ac.in/", eligibility: "10+2 any stream", pattern: "GD + PI", dates: "May–June", fees: "₹500 approx" },
      { name: "Aligarh Muslim University", detail: "General Awareness, Numerical, Data Interpretation, English, Reasoning", url: "https://www.amu.ac.in/", eligibility: "10+2 any stream", pattern: "MCQ entrance test", dates: "May", fees: "₹600" },
    ],
    colleges: [
      { name: "TISS Mumbai", url: "https://www.tiss.edu/" },
      { name: "Delhi School of Social Work – DU", url: "https://socialwork.du.ac.in/" },
      { name: "Madras School of Social Work", url: "https://www.mssw.in/" },
      { name: "Aditi Mahavidyalaya – Delhi", url: "https://www.aditimahavidyalaya.com/" },
      { name: "Osmania University – Hyderabad", url: "https://www.osmania.ac.in/" },
      { name: "MSU Baroda – Gujarat", url: "https://www.msubaroda.ac.in/" },
      { name: "Anand Institute of Social Work", url: "https://www.google.com/search?q=Anand+Institute+Social+Work" },
      { name: "Lucknow University", url: "https://www.lkouniv.ac.in/" },
    ],
    rankingLinks: [
      { label: "CollegeDunia Social Work", url: "https://collegedunia.com/social-work-colleges" },
      { label: "Shiksha Social Work Colleges", url: "https://www.google.com/search?q=Best+Social+Work+colleges+in+India" },
    ],
  },
  {
    id: "sports-nda",
    title: "Sports & NDA (Defence Forces)",
    subtitle: "Physical Education, Defence & Sports Management",
    category: "resource",
    badge: "Any Stream · Defence & Sports",
    degrees: [
      { name: "BBA in Sports Management", duration: "3 Years", professions: "Sports Manager, Brand Manager, Agent", url: "https://www.google.com/search?q=BBA+Sports+Management+India" },
      { name: "BSM – Bachelor of Sports Management", duration: "3 Years", professions: "Athlete Director, Sports Promoter", url: "https://www.google.com/search?q=BSM+Sports+Management+India" },
      { name: "BA in Sports Management", duration: "3 Years", professions: "Coach, Recreation Manager", url: "https://www.google.com/search?q=BA+Sports+Management+India" },
      { name: "BPE – Bachelor of Physical Education", duration: "3 Years", professions: "Physical Trainer, PE Teacher, Coach", url: "https://www.lnipe.edu.in/" },
    ],
    prospects: [
      { name: "Managing Sports Teams", url: "https://www.google.com/search?q=Sports+Team+Management+career" },
      { name: "Research & Analytics", url: "https://www.google.com/search?q=Sports+Analytics+career+India" },
      { name: "Athlete Director", url: "https://www.google.com/search?q=Athlete+Director+career" },
      { name: "Brand Management", url: "https://www.google.com/search?q=Sports+Brand+Management+career" },
      { name: "Parks & Recreation", url: "https://www.google.com/search?q=Parks+Recreation+career+India" },
      { name: "Sports Agency", url: "https://www.google.com/search?q=Sports+Agency+career+India" },
      { name: "Sports Promotion", url: "https://www.google.com/search?q=Sports+Promotion+career+India" },
      { name: "Professional Athlete", url: "https://www.google.com/search?q=Professional+Athlete+career+India" },
      { name: "Fitness & Personal Training", url: "https://www.google.com/search?q=Fitness+Trainer+career+India" },
    ],
    exams: [
      { name: "NDA Mathematics Paper (UPSC)", detail: "300 Marks · Class 11–12 level Maths · Conducted twice a year", url: "https://www.upsc.gov.in/", eligibility: "10+2 any stream (for Army), 10+2 with Physics & Maths (for Navy/Air Force), age 16.5–19.5, unmarried males", pattern: "120 MCQs in 2.5 hours – Algebra, Matrices, Trigonometry, Calculus, Statistics, Probability", dates: "April & September (UPSC conducts twice)", fees: "₹100 (Free for SC/ST)" },
      { name: "NDA General Ability Test", detail: "600 Marks · English + GK (History, Geography, Physics, Chemistry, Biology, Current Events)", url: "https://www.upsc.gov.in/", eligibility: "Same as NDA Maths paper", pattern: "Part A: English (200 marks) + Part B: GK (400 marks – Physics, Chemistry, Biology, History, Geography, Current Events)", dates: "Same day as Maths paper", fees: "Included with NDA registration" },
      { name: "SSB Interview", detail: "900 Marks · Intelligence, Psychological Tests, Group Tasks, Personal Interview · 5-day process", url: "https://www.joinindianarmy.nic.in/", eligibility: "Qualified NDA written exam", pattern: "Day 1: Screening (OIR + PPDT) → Day 2-4: Psychological Tests, GTO Tasks, Personal Interview → Day 5: Conference", dates: "Post NDA results", fees: "No fee (travel allowance provided)" },
    ],
    colleges: [
      { name: "National Defence Academy – Khadakwasla", url: "https://nda.nic.in/" },
      { name: "Indian Military Academy – Dehradun", url: "https://www.ima.nic.in/" },
      { name: "National Academy of Sports Management – Mumbai", url: "https://www.nasm.in/" },
      { name: "IISM – Mumbai", url: "https://www.iismworld.com/" },
      { name: "Lakshmibai National Institute – Gwalior", url: "https://www.lnipe.edu.in/" },
      { name: "Indira Gandhi Institute – Delhi", url: "https://igipess.du.ac.in/" },
      { name: "Salesian College – West Bengal", url: "https://www.salesiancollege.ac.in/" },
    ],
    rankingLinks: [
      { label: "Join Indian Army Official", url: "https://www.joinindianarmy.nic.in/" },
      { label: "Join Indian Navy", url: "https://www.joinindiannavy.gov.in/" },
      { label: "Join Indian Air Force", url: "https://afcat.cdac.in/" },
      { label: "CollegeDunia Sports Colleges", url: "https://collegedunia.com/physical-education-colleges" },
    ],
    extraSections: [
      {
        title: "NDA – National Defence Academy",
        badge: "Defence",
        degrees: [
          { name: "Indian Army", duration: "10+2 Any Stream", professions: "BA / B.Sc. / B.E.", url: "https://www.joinindianarmy.nic.in/" },
          { name: "Indian Navy", duration: "10+2 with Physics & Maths", professions: "B.Sc. / B.E.", url: "https://www.joinindiannavy.gov.in/" },
          { name: "Indian Naval Academy", duration: "10+2 with Physics & Maths", professions: "B.Tech", url: "https://www.joinindiannavy.gov.in/" },
          { name: "Indian Air Force", duration: "10+2 with Physics & Maths", professions: "B.Sc. / B.E.", url: "https://afcat.cdac.in/" },
        ],
      },
    ],
  },
];

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

export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQSection {
  id: string;
  title: string;
  subtitle: string;
  faqs: FAQ[];
}

export const faqSections: FAQSection[] = [
  {
    id: "faqs-students",
    title: "Students' FAQs",
    subtitle: "Your Career Doubts — Solved",
    faqs: [
      { question: "Which stream should I choose if I want to appear for IAS/IPS/Civil Services (UPSC)?", answer: "Any candidate with minimum 21 years of age who has completed graduation from ANY STREAM can appear for the UPSC exam. Traditionally, students preferred BA (giving more time for preparation), but today students from Medicine, Engineering, and Commerce are also cracking it. One growing trend: pursue a 5-year Law degree after 12th, then give UPSC. This helps in three ways — legal studies align with UPSC preparation, it opens doors to Judiciary exams, and if UPSC doesn't work out, you have a professional law degree to fall back on." },
      { question: "What are the prerequisites for Architecture?", answer: "Students who are good in both creativity and technical subjects (Physics, Chemistry and Maths) are the right candidates for Architecture. You need to pursue Science-A Group after 10th to appear for Architecture entrance exams like NATA and JEE-Main (Paper 2). Architecture combines engineering precision with artistic vision." },
      { question: "How can I get into the Teaching profession?", answer: "If you are passionate about a subject, pursue higher education in that field. For school teaching, you need a Bachelor's degree + B.Ed. For college teaching, a Master's or Doctorate degree is required. Key qualities for a great teacher: ability to build relationships, patient and caring personality, deep knowledge of learners, and dedication to the craft." },
      { question: "Where can I get a degree in Interior Design or Fashion Design?", answer: "In India, there is no specific degree in Interior Design or Fashion Design alone at the bachelor level. You must pursue a broader degree in Design (B.Des) and choose Interior or Fashion as your elective/specialisation. Apart from this, several private institutes offer diploma and certification programmes in these areas specifically." },
      { question: "How can I become an Ethical Hacker or pursue Cyber Security?", answer: "In India, there is no specific bachelor-level degree in Hacking or Cyber Security. The ideal path is to pursue a degree in Computer Applications (BCA) or Information Technology (B.Tech IT) and take elective subjects in Hacking or Cyber Security. Some universities now offer specialised modules within these programmes." },
      { question: "How can I become a Game Designer or Application Designer?", answer: "There is no specific degree in Game Design or Application Design in India at the bachelor level. Ideally, pursue a degree in Computer Applications (BCA) or Information Technology (B.Tech) and take elective subjects in Game Design or App Development. Alternatively, Design (B.Des) with a Game Design specialisation is offered by select institutions." },
      { question: "Where can I study Event Management?", answer: "Pursue a degree in Business Management (BBA/BMS) and take Event Management as an elective or specialisation subject. Apart from this, several private institutes offer standalone diploma and certification programmes in Event Management that are industry-recognised." },
      { question: "How can I become an Air Hostess / Flight Steward?", answer: "Any candidate who has passed grade 12 with English as a compulsory subject and has good command over the language can pursue this career. Since this is a skill-based role, no specific educational degree or diploma is required. Several private training centres groom candidates. Key qualities: pleasing personality, good appearance, pleasant voice, friendly nature, and excellent communication skills." },
      { question: "How can I become a Pilot?", answer: "Any student with Physics and Mathematics in grade 12 (Science-A Group) can attain a Pilot Licence. The three stages are: Student Pilot Licence → Private Pilot Licence → Commercial Pilot Licence, from any flying school approved by DGCA in India. Alternatively, you can join the Indian Air Force and become a commissioned pilot through the NDA route." },
    ],
  },
  {
    id: "faqs-parents",
    title: "Parents' FAQs",
    subtitle: "Guidance for Parents of 9th–12th Grade Students",
    faqs: [
      { question: "How do I help my child choose the right career option after school?", answer: "Identifying the Aptitude, Personality and Interest (API) of the child is the key. Their comfort in particular subjects at grades 9–10 and further at grades 11–12 will help understand their aptitude. Observing the child while engaged in different activities gives insight about personality. Activities that genuinely interest them reveal their interest area. By aligning these three aspects, you can help choose the right stream. You may also consult an Expert Career Counsellor for scientific brain mapping." },
      { question: "What are the different career options available after 10th?", answer: "In the Indian education system, there are 4 streams available after 10th. The child can choose: Science A-Group (Physics, Chemistry, Mathematics), Science B-Group (Physics, Chemistry, Biology), Commerce Group (Accounts, Statistics, Economics, Business Studies), or Arts/Humanities Group (History, Geography, Psychology, Political Science)." },
      { question: "My child is not good at Maths. Will a lot of streams get closed for them?", answer: "No. For all general degree courses open to any stream, no Mathematics is required in grades 11/12. The child will not be at a loss in any general stream. Fields like Medicine (Science B), Arts, Commerce, Law, Mass Communication, Hotel Management, and Social Work are fully accessible without Maths." },
      { question: "My child wants to follow their friends into a stream. What should I do?", answer: "Peer influence is natural but can be misleading when it comes to career decisions. The right approach is to have the child's Aptitude, Personality and Interest (API) assessed scientifically. Get professional guidance and brain mapping done so the decision is based on the child's actual strengths and interests — not social pressure." },
      { question: "We want our child to join our family business. Which course is best?", answer: "The course the child has the best interest in is the most suitable. Pushing a child into a degree programme matching family business may not be the right thing to do. Rather, give them a course of their interest — it will make them smart and capable. Subsequently, they will be in a much better position to take the business forward with fresh ideas and skills." },
      { question: "My child has a very wavering mind and changes career choices constantly. What should I do?", answer: "This is very common at this age. The solution is to get a scientific brain mapping and API (Aptitude, Personality, Interest) assessment done by an expert career counsellor. This gives concrete data-backed clarity rather than relying on momentary emotions or opinions." },
    ],
  },
];
