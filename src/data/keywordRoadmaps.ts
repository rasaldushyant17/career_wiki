import { careerFields, dashboardSections } from "@/data/careers";

export interface KeywordResourceLinks {
  roadmap?: string;
  eligibility?: string;
  official?: string;
  combined?: string;
}

export interface KeywordRoadmapItem {
  keyword: string;
  aliases?: string[];
  category: "After 10th" | "After 12th" | "Entrance Exam" | "Professional" | "Government";
  description: string;
  careerId?: string;
  links: KeywordResourceLinks;
}

export const keywordRoadmaps: KeywordRoadmapItem[] = [
  {
    keyword: "Engineering (B.Tech/B.E.)",
    aliases: ["engineering", "btech", "be"],
    category: "After 12th",
    description: "PCM route with JEE or state CET for engineering colleges.",
    careerId: "science-a",
    links: {
      roadmap: "https://www.aicte-india.org/",
      eligibility: "https://jeemain.nta.nic.in/information-bulletin/",
      official: "https://jeemain.nta.nic.in/",
      combined: "https://www.aicte-india.org/education/approval-process-handbook",
    },
  },
  {
    keyword: "Medical (MBBS/BDS)",
    aliases: ["mbbs", "bds", "doctor", "medical"],
    category: "After 12th",
    description: "PCB route via NEET-UG and NMC approved colleges.",
    careerId: "science-b",
    links: {
      roadmap: "https://www.nmc.org.in/information-desk/for-students-to-study-in-india/",
      eligibility: "https://neet.nta.nic.in/information-bulletin/",
      official: "https://neet.nta.nic.in/",
      combined: "https://mcc.nic.in/",
    },
  },
  {
    keyword: "Law (5-year LLB)",
    aliases: ["law", "llb", "clat"],
    category: "After 12th",
    description: "Integrated law path through CLAT/AILET and private law tests.",
    careerId: "law",
    links: {
      roadmap: "https://www.barcouncilofindia.org/",
      eligibility: "https://consortiumofnlus.ac.in/clat-2026/",
      official: "https://consortiumofnlus.ac.in/",
      combined: "https://nludelhi.ac.in/",
    },
  },
  {
    keyword: "Commerce (B.Com/BBA)",
    aliases: ["commerce", "bcom", "bba"],
    category: "After 12th",
    description: "Business and finance routes with CUET/university-specific admissions.",
    careerId: "commerce",
    links: {
      roadmap: "https://www.ugc.gov.in/",
      eligibility: "https://cuet.nta.nic.in/",
      official: "https://cuet.nta.nic.in/",
      combined: "https://www.icai.org/",
    },
  },
  {
    keyword: "CA (Chartered Accountant)",
    aliases: ["ca", "chartered accountant"],
    category: "Professional",
    description: "Foundation -> Intermediate -> Final under ICAI.",
    careerId: "commerce",
    links: {
      roadmap: "https://www.icai.org/post.html?post_id=20526",
      eligibility: "https://icaiexam.icai.org/",
      official: "https://www.icai.org/",
      combined: "https://eservices.icai.org/",
    },
  },
  {
    keyword: "CS (Company Secretary)",
    aliases: ["cs", "company secretary"],
    category: "Professional",
    description: "CSEET -> Executive -> Professional under ICSI.",
    careerId: "commerce",
    links: {
      roadmap: "https://www.icsi.edu/home/",
      eligibility: "https://www.icsi.edu/media/webmodules/admission/Admission_Structure.pdf",
      official: "https://www.icsi.edu/",
      combined: "https://smash.icsi.edu/",
    },
  },
  {
    keyword: "CMA (Cost Accountant)",
    aliases: ["cma", "cost accountant", "icmai"],
    category: "Professional",
    description: "Foundation -> Intermediate -> Final under ICMAI.",
    careerId: "commerce",
    links: {
      roadmap: "https://icmai.in/studentswebsite/",
      eligibility: "https://icmai.in/studentswebsite/admission.php",
      official: "https://icmai.in/",
      combined: "https://icmai.in/studentswebsite/examination.php",
    },
  },
  {
    keyword: "NDA (Defence Officer)",
    aliases: ["nda", "army", "navy", "air force"],
    category: "Government",
    description: "UPSC NDA exam followed by SSB and academy training.",
    careerId: "sports-nda",
    links: {
      roadmap: "https://www.upsc.gov.in/examinations/active-examinations",
      eligibility: "https://www.upsc.gov.in/examinations/exam-calendar",
      official: "https://www.upsc.gov.in/",
      combined: "https://www.joinindianarmy.nic.in/",
    },
  },
  {
    keyword: "BCA / Computer Applications",
    aliases: ["bca", "computer applications", "software"],
    category: "After 12th",
    description: "Programming, software and IT applications through BCA route.",
    careerId: "science-a",
    links: {
      roadmap: "https://www.ugc.gov.in/",
      eligibility: "https://cuet.nta.nic.in/",
      official: "https://www.nielit.gov.in/",
      combined: "https://www.aicte-india.org/",
    },
  },
  {
    keyword: "Design (B.Des / NID / UCEED)",
    aliases: ["design", "bdes", "nid", "uceed", "nift"],
    category: "After 12th",
    description: "Creative track via design entrance exams and studio portfolios.",
    careerId: "design-arts",
    links: {
      roadmap: "https://www.nid.edu/admissions",
      eligibility: "https://uceed.iitb.ac.in/",
      official: "https://www.nift.ac.in/",
      combined: "https://www.nid.edu/admissions",
    },
  },
  {
    keyword: "Architecture (B.Arch)",
    aliases: ["architecture", "barch", "nata"],
    category: "After 12th",
    description: "Architecture programs through NATA/JEE (Paper 2).",
    careerId: "science-a",
    links: {
      roadmap: "https://www.coa.gov.in/",
      eligibility: "https://www.nata.in/",
      official: "https://www.nata.in/",
      combined: "https://www.coa.gov.in/index.php?lang=1&level=1&sublinkid=1001&lid=66",
    },
  },
  {
    keyword: "Nursing (B.Sc Nursing)",
    aliases: ["nursing", "bsc nursing"],
    category: "After 12th",
    description: "Nursing education and registration under Indian Nursing Council rules.",
    careerId: "science-b",
    links: {
      roadmap: "https://www.indiannursingcouncil.org/",
      eligibility: "https://neet.nta.nic.in/",
      official: "https://www.indiannursingcouncil.org/",
      combined: "https://www.nmc.org.in/information-desk/for-students-to-study-in-india/",
    },
  },
  {
    keyword: "Pharmacy (B.Pharm / D.Pharm)",
    aliases: ["pharmacy", "bpharm", "dpharm"],
    category: "After 12th",
    description: "Pharmacy programs regulated by PCI with state/national entrance paths.",
    careerId: "science-b",
    links: {
      roadmap: "https://www.pci.nic.in/",
      eligibility: "https://jeemain.nta.nic.in/",
      official: "https://www.pci.nic.in/",
      combined: "https://www.aicte-india.org/",
    },
  },
  {
    keyword: "Hotel Management",
    aliases: ["hotel management", "nchmct", "hospitality"],
    category: "After 12th",
    description: "Hospitality careers via NCHM JEE and IHMs.",
    careerId: "hotel-management",
    links: {
      roadmap: "https://www.nchm.gov.in/",
      eligibility: "https://exams.nta.ac.in/NCHM/",
      official: "https://www.nchm.gov.in/",
      combined: "https://tourism.gov.in/",
    },
  },
  {
    keyword: "Mass Communication / Journalism",
    aliases: ["journalism", "mass communication", "media"],
    category: "After 12th",
    description: "Media and journalism route through CUET/university admissions.",
    careerId: "mass-communication",
    links: {
      roadmap: "https://iimc.gov.in/",
      eligibility: "https://cuet.nta.nic.in/",
      official: "https://iimc.gov.in/",
      combined: "https://www.prasarbharati.gov.in/",
    },
  },
  {
    keyword: "Social Work (BSW/MSW)",
    aliases: ["social work", "bsw", "msw", "ngo"],
    category: "After 12th",
    description: "Community development and social impact careers.",
    careerId: "social-work",
    links: {
      roadmap: "https://admissions.tiss.edu/",
      eligibility: "https://cuet.nta.nic.in/",
      official: "https://admissions.tiss.edu/",
      combined: "https://wcd.nic.in/",
    },
  },
  {
    keyword: "UPSC Civil Services",
    aliases: ["upsc", "ias", "ips", "civil services"],
    category: "Government",
    description: "Graduate-level route to IAS/IPS/IFS through CSE.",
    links: {
      roadmap: "https://www.upsc.gov.in/examinations/active-examinations",
      eligibility: "https://www.upsc.gov.in/examinations/Civil-Services-Examination",
      official: "https://www.upsc.gov.in/",
      combined: "https://www.upsc.gov.in/examinations",
    },
  },
  {
    keyword: "SSC Jobs",
    aliases: ["ssc", "chsl", "cgl", "government jobs"],
    category: "Government",
    description: "Central government jobs after 12th/graduation via SSC exams.",
    links: {
      roadmap: "https://ssc.gov.in/",
      eligibility: "https://ssc.gov.in/",
      official: "https://ssc.gov.in/",
      combined: "https://ssc.nic.in/",
    },
  },
  {
    keyword: "Banking (IBPS / SBI)",
    aliases: ["banking", "ibps", "sbi po", "clerical"],
    category: "Government",
    description: "Public-sector banking exams and probationary officer paths.",
    links: {
      roadmap: "https://www.ibps.in/",
      eligibility: "https://www.ibps.in/",
      official: "https://www.ibps.in/",
      combined: "https://sbi.co.in/web/careers",
    },
  },
  {
    keyword: "Railway Jobs (RRB)",
    aliases: ["railway", "rrb", "ntpc", "group d"],
    category: "Government",
    description: "Technical and non-technical jobs in Indian Railways via RRB.",
    links: {
      roadmap: "https://www.rrbcdg.gov.in/",
      eligibility: "https://www.rrbcdg.gov.in/",
      official: "https://www.rrbcdg.gov.in/",
      combined: "https://indianrailways.gov.in/",
    },
  },
  {
    keyword: "ITI / Skilled Trades",
    aliases: ["iti", "ncvt", "skilled trades"],
    category: "After 10th",
    description: "Trade-based jobs via NCVT/SCVT aligned vocational training.",
    links: {
      roadmap: "https://www.ncvtmis.gov.in/",
      eligibility: "https://dgt.gov.in/",
      official: "https://www.ncvtmis.gov.in/",
      combined: "https://skillindia.gov.in/",
    },
  },
  {
    keyword: "Polytechnic Diploma",
    aliases: ["polytechnic", "diploma engineering"],
    category: "After 10th",
    description: "Three-year diploma route with lateral entry into engineering.",
    links: {
      roadmap: "https://www.aicte-india.org/",
      eligibility: "https://cetcell.mahacet.org/",
      official: "https://dte.maharashtra.gov.in/",
      combined: "https://www.aicte-india.org/education/approval-process-handbook",
    },
  },
  {
    keyword: "Merchant Navy",
    aliases: ["merchant navy", "marine", "shipping"],
    category: "After 12th",
    description: "Maritime careers through DG Shipping approved programs.",
    links: {
      roadmap: "https://www.dgshipping.gov.in/",
      eligibility: "https://www.imu.edu.in/",
      official: "https://www.dgshipping.gov.in/",
      combined: "https://www.imu.edu.in/",
    },
  },
  {
    keyword: "Pilot (CPL)",
    aliases: ["pilot", "cpl", "aviation"],
    category: "After 12th",
    description: "Aviation route through SPL/PPL/CPL with DGCA requirements.",
    links: {
      roadmap: "https://www.dgca.gov.in/digigov-portal/?dynamicPage=aircrewCareer",
      eligibility: "https://www.dgca.gov.in/digigov-portal/",
      official: "https://www.dgca.gov.in/",
      combined: "https://www.pariksha.dgca.gov.in/",
    },
  },
  {
    keyword: "Agriculture (B.Sc Agri)",
    aliases: ["agriculture", "bsc agriculture", "icar"],
    category: "After 12th",
    description: "Agriculture sciences through ICAR and state universities.",
    links: {
      roadmap: "https://icar.org.in/",
      eligibility: "https://exams.nta.ac.in/ICAR/",
      official: "https://icar.ntaonline.in/",
      combined: "https://www.icar.org.in/content/education",
    },
  },
  {
    keyword: "Arts / Humanities",
    aliases: ["arts", "humanities", "ba"],
    category: "After 12th",
    description: "General humanities pathway through BA and related programs.",
    links: {
      roadmap: "https://www.ugc.gov.in/",
      eligibility: "https://cuet.nta.nic.in/",
      official: "https://cuet.nta.nic.in/",
      combined: "https://www.nios.ac.in/",
    },
  },
  {
    keyword: "D.Ed / D.El.Ed (Primary Teacher)",
    aliases: ["ded", "deled", "primary teacher"],
    category: "After 12th",
    description: "Diploma route for elementary teaching qualifications.",
    links: {
      roadmap: "https://ncte.gov.in/",
      eligibility: "https://ncte.gov.in/Website/recognition.aspx",
      official: "https://ncte.gov.in/",
      combined: "https://www.education.gov.in/",
    },
  },
  {
    keyword: "B.Ed (Teaching Career)",
    aliases: ["bed", "teacher", "teaching"],
    category: "Professional",
    description: "Bachelor of Education required for most school teaching roles.",
    links: {
      roadmap: "https://ncte.gov.in/",
      eligibility: "https://ctet.nic.in/",
      official: "https://ctet.nic.in/",
      combined: "https://www.education.gov.in/en/school-education",
    },
  },
  {
    keyword: "ANM / GNM Nursing",
    aliases: ["anm", "gnm", "nurse diploma"],
    category: "After 12th",
    description: "Diploma nursing pathways under INC/state nursing councils.",
    links: {
      roadmap: "https://www.indiannursingcouncil.org/",
      eligibility: "https://www.indiannursingcouncil.org/",
      official: "https://www.indiannursingcouncil.org/",
      combined: "https://main.mohfw.gov.in/",
    },
  },
  {
    keyword: "Physiotherapy (BPT)",
    aliases: ["bpt", "physiotherapy"],
    category: "After 12th",
    description: "Allied healthcare pathway after PCB.",
    links: {
      roadmap: "https://main.mohfw.gov.in/",
      eligibility: "https://neet.nta.nic.in/",
      official: "https://neet.nta.nic.in/",
      combined: "https://www.nmc.org.in/",
    },
  },
  {
    keyword: "DMLT / Medical Lab Technology",
    aliases: ["dmlt", "lab technician", "medical laboratory"],
    category: "After 12th",
    description: "Diagnostic laboratory technology programs.",
    links: {
      roadmap: "https://main.mohfw.gov.in/",
      eligibility: "https://cuet.nta.nic.in/",
      official: "https://www.nmc.org.in/",
      combined: "https://www.skillindiadigital.gov.in/",
    },
  },
  {
    keyword: "BAMS (Ayurveda)",
    aliases: ["bams", "ayurveda"],
    category: "After 12th",
    description: "Ayurveda medical degree through AYUSH-aligned admissions.",
    links: {
      roadmap: "https://www.ayush.gov.in/",
      eligibility: "https://neet.nta.nic.in/",
      official: "https://www.ayush.gov.in/",
      combined: "https://aaccc.gov.in/",
    },
  },
  {
    keyword: "BHMS (Homeopathy)",
    aliases: ["bhms", "homeopathy"],
    category: "After 12th",
    description: "Homeopathy degree route through NEET and AYUSH counseling.",
    links: {
      roadmap: "https://www.ayush.gov.in/",
      eligibility: "https://neet.nta.nic.in/",
      official: "https://www.ayush.gov.in/",
      combined: "https://aaccc.gov.in/",
    },
  },
  {
    keyword: "BUMS (Unani)",
    aliases: ["bums", "unani"],
    category: "After 12th",
    description: "Unani medical education pathway under AYUSH framework.",
    links: {
      roadmap: "https://www.ayush.gov.in/",
      eligibility: "https://neet.nta.nic.in/",
      official: "https://www.ayush.gov.in/",
      combined: "https://aaccc.gov.in/",
    },
  },
  {
    keyword: "BVSc & AH (Veterinary)",
    aliases: ["bvsc", "veterinary", "animal husbandry"],
    category: "After 12th",
    description: "Veterinary sciences via NEET/state veterinary admissions.",
    links: {
      roadmap: "https://vci.dadf.gov.in/",
      eligibility: "https://neet.nta.nic.in/",
      official: "https://vci.dadf.gov.in/",
      combined: "https://www.icar.org.in/",
    },
  },
  {
    keyword: "Biotechnology (B.Sc / B.Tech)",
    aliases: ["biotech", "biotechnology"],
    category: "After 12th",
    description: "Life sciences and bioengineering route after science stream.",
    links: {
      roadmap: "https://dbtindia.gov.in/",
      eligibility: "https://jeemain.nta.nic.in/",
      official: "https://dbtindia.gov.in/",
      combined: "https://www.icar.org.in/",
    },
  },
  {
    keyword: "B.Sc Computer Science / IT",
    aliases: ["bsc cs", "bsc it", "computer science"],
    category: "After 12th",
    description: "Computer and software-focused science degree route.",
    links: {
      roadmap: "https://www.ugc.gov.in/",
      eligibility: "https://cuet.nta.nic.in/",
      official: "https://www.nielit.gov.in/",
      combined: "https://www.aicte-india.org/",
    },
  },
  {
    keyword: "Animation / VFX / Multimedia",
    aliases: ["animation", "vfx", "multimedia"],
    category: "After 12th",
    description: "Creative media pathway with design and production skills.",
    links: {
      roadmap: "https://www.ugc.gov.in/",
      eligibility: "https://cuet.nta.nic.in/",
      official: "https://www.nielit.gov.in/",
      combined: "https://www.skillindiadigital.gov.in/",
    },
  },
  {
    keyword: "Interior Design",
    aliases: ["interior", "interior design"],
    category: "After 12th",
    description: "Design specialization through B.Des/B.Arch-related pathways.",
    links: {
      roadmap: "https://www.nid.edu/admissions",
      eligibility: "https://uceed.iitb.ac.in/",
      official: "https://www.nift.ac.in/",
      combined: "https://www.coa.gov.in/",
    },
  },
  {
    keyword: "Fashion Design",
    aliases: ["fashion", "fashion design", "textile design"],
    category: "After 12th",
    description: "Fashion and apparel design pathway through design institutes.",
    links: {
      roadmap: "https://www.nift.ac.in/",
      eligibility: "https://www.nift.ac.in/admission",
      official: "https://www.nift.ac.in/",
      combined: "https://www.nid.edu/admissions",
    },
  },
  {
    keyword: "Fine Arts (BFA)",
    aliases: ["fine arts", "bfa", "applied arts"],
    category: "After 12th",
    description: "Visual arts education route for creative careers.",
    links: {
      roadmap: "https://www.ugc.gov.in/",
      eligibility: "https://cuet.nta.nic.in/",
      official: "https://www.lalitkala.gov.in/",
      combined: "https://www.nid.edu/admissions",
    },
  },
  {
    keyword: "Performing Arts / Music / Dance",
    aliases: ["performing arts", "music", "dance", "drama"],
    category: "After 12th",
    description: "Stage and performance oriented academic/professional track.",
    links: {
      roadmap: "https://www.ugc.gov.in/",
      eligibility: "https://cuet.nta.nic.in/",
      official: "https://www.sangeetnatak.gov.in/",
      combined: "https://www.indiaculture.gov.in/",
    },
  },
  {
    keyword: "Travel & Tourism",
    aliases: ["travel", "tourism", "tour guide"],
    category: "After 12th",
    description: "Tourism operations, hospitality, and destination management.",
    links: {
      roadmap: "https://tourism.gov.in/",
      eligibility: "https://exams.nta.ac.in/NCHM/",
      official: "https://tourism.gov.in/",
      combined: "https://www.nchm.gov.in/",
    },
  },
  {
    keyword: "Event Management",
    aliases: ["event management", "event planner"],
    category: "After 12th",
    description: "Events, production, and corporate activation career routes.",
    links: {
      roadmap: "https://www.ugc.gov.in/",
      eligibility: "https://cuet.nta.nic.in/",
      official: "https://www.skillindiadigital.gov.in/",
      combined: "https://tourism.gov.in/",
    },
  },
  {
    keyword: "Film & Television Production",
    aliases: ["film", "tv", "cinema", "production"],
    category: "After 12th",
    description: "Media production pathway for film and TV careers.",
    links: {
      roadmap: "https://www.ftii.ac.in/",
      eligibility: "https://www.ftii.ac.in/admission",
      official: "https://www.ftii.ac.in/",
      combined: "https://srfti.ac.in/",
    },
  },
  {
    keyword: "Acting / Theatre",
    aliases: ["acting", "theatre", "drama"],
    category: "After 12th",
    description: "Performance pathway through theatre and acting institutes.",
    links: {
      roadmap: "https://nsd.gov.in/",
      eligibility: "https://nsd.gov.in/en/admissions",
      official: "https://nsd.gov.in/",
      combined: "https://www.ftii.ac.in/",
    },
  },
  {
    keyword: "Journalism",
    aliases: ["journalism", "reporter", "news"],
    category: "After 12th",
    description: "Reporting and media communication route through BJMC/BA.",
    links: {
      roadmap: "https://iimc.gov.in/",
      eligibility: "https://cuet.nta.nic.in/",
      official: "https://iimc.gov.in/",
      combined: "https://www.prasarbharati.gov.in/",
    },
  },
  {
    keyword: "LLB (3-year after graduation)",
    aliases: ["llb 3 year", "llb"],
    category: "Professional",
    description: "Graduate-entry legal education and advocacy route.",
    links: {
      roadmap: "https://www.barcouncilofindia.org/",
      eligibility: "https://www.nludelhi.ac.in/",
      official: "https://www.barcouncilofindia.org/",
      combined: "https://consortiumofnlus.ac.in/",
    },
  },
  {
    keyword: "MPSC State Services",
    aliases: ["mpsc", "state psc", "state civil services"],
    category: "Government",
    description: "Maharashtra state administrative recruitment pathway.",
    links: {
      roadmap: "https://mpsc.gov.in/",
      eligibility: "https://mpsc.gov.in/exam",
      official: "https://mpsc.gov.in/",
      combined: "https://mahagov.com/",
    },
  },
  {
    keyword: "Police Services",
    aliases: ["police", "sub inspector", "constable"],
    category: "Government",
    description: "State and central police recruitment exams and training.",
    links: {
      roadmap: "https://www.mha.gov.in/",
      eligibility: "https://ssc.gov.in/",
      official: "https://www.mha.gov.in/",
      combined: "https://www.cisf.gov.in/",
    },
  },
  {
    keyword: "RTO / Motor Vehicle Inspector",
    aliases: ["rto", "motor vehicle inspector", "mvi"],
    category: "Government",
    description: "Transport department technical and inspection posts.",
    links: {
      roadmap: "https://parivahan.gov.in/",
      eligibility: "https://mpsc.gov.in/",
      official: "https://parivahan.gov.in/",
      combined: "https://transport.maharashtra.gov.in/",
    },
  },
  {
    keyword: "Railway Ticket Collector / Clerk",
    aliases: ["ticket collector", "tc", "railway clerk"],
    category: "Government",
    description: "Indian Railways non-technical recruitment route.",
    links: {
      roadmap: "https://www.rrbcdg.gov.in/",
      eligibility: "https://www.rrbcdg.gov.in/",
      official: "https://www.rrbcdg.gov.in/",
      combined: "https://indianrailways.gov.in/",
    },
  },
  {
    keyword: "LIC / Insurance Careers",
    aliases: ["lic", "insurance", "aao", "ado"],
    category: "Government",
    description: "Insurance-sector exams and sales/administrative careers.",
    links: {
      roadmap: "https://licindia.in/careers",
      eligibility: "https://www.irdai.gov.in/",
      official: "https://licindia.in/",
      combined: "https://www.irdai.gov.in/",
    },
  },
  {
    keyword: "Call Center / BPO",
    aliases: ["call center", "bpo", "customer support"],
    category: "After 12th",
    description: "Voice and process operations jobs with skill certifications.",
    links: {
      roadmap: "https://www.skillindiadigital.gov.in/",
      eligibility: "https://www.ncs.gov.in/",
      official: "https://www.ncs.gov.in/",
      combined: "https://www.nsdcindia.org/",
    },
  },
  {
    keyword: "MS-CIT / Computer Literacy",
    aliases: ["ms-cit", "computer literacy", "basic computer course"],
    category: "After 10th",
    description: "Foundation-level digital literacy and office computing.",
    links: {
      roadmap: "https://www.mkcl.org/",
      eligibility: "https://www.mkcl.org/",
      official: "https://www.mkcl.org/",
      combined: "https://www.skillindiadigital.gov.in/",
    },
  },
  {
    keyword: "Armed Forces (Army / Navy / Air Force)",
    aliases: ["armed forces", "defence", "army", "navy", "air force"],
    category: "Government",
    description: "National defence careers through NDA, CDS, AFCAT and entries.",
    links: {
      roadmap: "https://www.upsc.gov.in/",
      eligibility: "https://www.upsc.gov.in/examinations/exam-calendar",
      official: "https://www.joinindianarmy.nic.in/",
      combined: "https://www.joinindiannavy.gov.in/",
    },
  },
  {
    keyword: "AFCAT (Air Force Entry)",
    aliases: ["afcat", "air force officer"],
    category: "Entrance Exam",
    description: "Commissioned officer entry in Indian Air Force.",
    links: {
      roadmap: "https://afcat.cdac.in/",
      eligibility: "https://afcat.cdac.in/AFCAT/",
      official: "https://afcat.cdac.in/",
      combined: "https://indianairforce.nic.in/",
    },
  },
  {
    keyword: "CDS (Combined Defence Services)",
    aliases: ["cds", "combined defence services"],
    category: "Entrance Exam",
    description: "Graduate entry into defence academies through UPSC CDS.",
    links: {
      roadmap: "https://www.upsc.gov.in/examinations/active-examinations",
      eligibility: "https://www.upsc.gov.in/examinations/exam-calendar",
      official: "https://www.upsc.gov.in/",
      combined: "https://www.joinindianarmy.nic.in/",
    },
  },
  {
    keyword: "Library Science (B.Lib / M.Lib)",
    aliases: ["library science", "blib", "mlib", "librarian"],
    category: "Professional",
    description: "Academic and information management career pathway.",
    links: {
      roadmap: "https://www.ugc.gov.in/",
      eligibility: "https://cuet.nta.nic.in/",
      official: "https://www.nationallibrary.gov.in/",
      combined: "https://www.education.gov.in/",
    },
  },
];

const normalizeKey = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const googleQueryUrl = (query: string) =>
  `https://www.google.com/search?q=${encodeURIComponent(query)}`;

const buildAutoLinks = (term: string): KeywordResourceLinks => ({
  roadmap: googleQueryUrl(`${term} career roadmap India`),
  eligibility: googleQueryUrl(`${term} eligibility criteria India`),
  official: googleQueryUrl(`${term} official website India`),
  combined: googleQueryUrl(`${term} roadmap eligibility official India`),
});

const categoryFromCareer = (
  careerCategory: "foundation" | "professional" | "resource",
  label?: string,
): KeywordRoadmapItem["category"] => {
  const normalizedLabel = (label ?? "").toLowerCase();
  if (normalizedLabel.includes("nda") || normalizedLabel.includes("defence")) {
    return "Government";
  }
  if (careerCategory === "professional") return "Professional";
  if (careerCategory === "resource") return "After 12th";
  return "After 12th";
};

const existingKeywords = new Set(keywordRoadmaps.map((item) => normalizeKey(item.keyword)));
const existingCareerIds = new Set(
  keywordRoadmaps.map((item) => item.careerId).filter(Boolean) as string[],
);

const ensureItem = (item: KeywordRoadmapItem) => {
  const normalizedKeyword = normalizeKey(item.keyword);
  if (existingKeywords.has(normalizedKeyword)) return;
  existingKeywords.add(normalizedKeyword);
  if (item.careerId) existingCareerIds.add(item.careerId);
  keywordRoadmaps.push(item);
};

dashboardSections.forEach((section) => {
  section.cards.forEach((card) => {
    if (card.type !== "career") return;
    if (existingCareerIds.has(card.id)) return;

    const matchingCareer = careerFields.find((career) => career.id === card.id);
    ensureItem({
      keyword: card.title,
      aliases: [card.id],
      category: matchingCareer
        ? categoryFromCareer(matchingCareer.category, card.title)
        : "After 12th",
      description: card.description,
      careerId: card.id,
      links: buildAutoLinks(card.title),
    });
  });
});

careerFields.forEach((career) => {
  if (!existingCareerIds.has(career.id)) {
    ensureItem({
      keyword: career.title,
      aliases: [career.id],
      category: categoryFromCareer(career.category, career.title),
      description: career.subtitle,
      careerId: career.id,
      links: buildAutoLinks(career.title),
    });
  }

  career.prospects.forEach((prospect) => {
    ensureItem({
      keyword: prospect.name,
      category: categoryFromCareer(career.category, prospect.name),
      description: `${career.title} career option`,
      careerId: career.id,
      links: buildAutoLinks(prospect.name),
    });
  });

  career.specialisations?.forEach((specialisation) => {
    ensureItem({
      keyword: specialisation.name,
      category: "Professional",
      description: `${career.title} specialisation path`,
      careerId: career.id,
      links: buildAutoLinks(specialisation.name),
    });
  });

  career.exams.forEach((exam) => {
    ensureItem({
      keyword: exam.name,
      category: "Entrance Exam",
      description: `${career.title} entrance exam`,
      careerId: career.id,
      links: buildAutoLinks(exam.name),
    });
  });
});
