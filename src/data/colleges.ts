export type CollegeType = "Government" | "Private";
export type Category = "OPEN" | "OBC" | "SC" | "ST" | "EWS";

export interface CollegeRecord {
  college: string;
  branch: string;
  category: Category;
  cutoff_current: number;
  cutoff_previous: number;
  ai_cutoff_current?: number;
  ai_cutoff_previous?: number;
  location: string;
  seats: number;
  fees: number;
  type: CollegeType;
}

export const collegesData: CollegeRecord[] = [
  { college: "COEP Technological University", branch: "Computer Engineering", category: "OPEN", cutoff_current: 99.4, cutoff_previous: 99.2, location: "Pune", seats: 120, fees: 95000, type: "Government" },
  { college: "VJTI", branch: "Computer Engineering", category: "OPEN", cutoff_current: 99.3, cutoff_previous: 99.1, location: "Mumbai", seats: 120, fees: 90000, type: "Government" },
  { college: "PCCOE", branch: "Computer Engineering", category: "OPEN", cutoff_current: 97.1, cutoff_previous: 96.8, location: "Pune", seats: 180, fees: 142000, type: "Private" },
  { college: "PICT", branch: "IT", category: "OPEN", cutoff_current: 98.4, cutoff_previous: 98.1, location: "Pune", seats: 180, fees: 148000, type: "Private" },
  { college: "Walchand College of Engineering", branch: "Mechanical", category: "OPEN", cutoff_current: 96.1, cutoff_previous: 95.7, location: "Sangli", seats: 90, fees: 87000, type: "Government" },
  { college: "Government College of Engineering, Amravati", branch: "Civil", category: "OPEN", cutoff_current: 91.8, cutoff_previous: 91.1, location: "Amravati", seats: 120, fees: 78000, type: "Government" },
  { college: "Cummins College of Engineering", branch: "AI/DS", category: "OPEN", cutoff_current: 96.2, cutoff_previous: 95.6, location: "Pune", seats: 120, fees: 156000, type: "Private" },
  { college: "KJ Somaiya College of Engineering", branch: "Computer Engineering", category: "OPEN", cutoff_current: 95.5, cutoff_previous: 95, location: "Mumbai", seats: 120, fees: 192000, type: "Private" },
  { college: "RCOEM", branch: "IT", category: "OPEN", cutoff_current: 95.2, cutoff_previous: 94.9, location: "Nagpur", seats: 120, fees: 175000, type: "Private" },
  { college: "MET Bhujbal Knowledge City", branch: "Mechanical", category: "OPEN", cutoff_current: 84.7, cutoff_previous: 83.6, location: "Nashik", seats: 120, fees: 112000, type: "Private" },

  { college: "COEP Technological University", branch: "Computer Engineering", category: "OBC", cutoff_current: 98.7, cutoff_previous: 98.4, location: "Pune", seats: 120, fees: 95000, type: "Government" },
  { college: "VJTI", branch: "Computer Engineering", category: "OBC", cutoff_current: 98.4, cutoff_previous: 98.1, location: "Mumbai", seats: 120, fees: 90000, type: "Government" },
  { college: "PCCOE", branch: "Computer Engineering", category: "OBC", cutoff_current: 95.4, cutoff_previous: 95.1, location: "Pune", seats: 180, fees: 142000, type: "Private" },
  { college: "PICT", branch: "IT", category: "OBC", cutoff_current: 97, cutoff_previous: 96.7, location: "Pune", seats: 180, fees: 148000, type: "Private" },
  { college: "Government College of Engineering, Karad", branch: "Mechanical", category: "OBC", cutoff_current: 89.2, cutoff_previous: 88.9, location: "Satara", seats: 120, fees: 76000, type: "Government" },
  { college: "Cummins College of Engineering", branch: "AI/DS", category: "OBC", cutoff_current: 94.9, cutoff_previous: 94.1, location: "Pune", seats: 120, fees: 156000, type: "Private" },
  { college: "RCOEM", branch: "IT", category: "OBC", cutoff_current: 93.8, cutoff_previous: 93.2, location: "Nagpur", seats: 120, fees: 175000, type: "Private" },
  { college: "KJ Somaiya College of Engineering", branch: "Computer Engineering", category: "OBC", cutoff_current: 93.1, cutoff_previous: 92.3, location: "Mumbai", seats: 120, fees: 192000, type: "Private" },
  { college: "MET Bhujbal Knowledge City", branch: "Mechanical", category: "OBC", cutoff_current: 80.8, cutoff_previous: 79.9, location: "Nashik", seats: 120, fees: 112000, type: "Private" },
  { college: "Government College of Engineering, Aurangabad", branch: "Civil", category: "OBC", cutoff_current: 86.7, cutoff_previous: 85.8, location: "Aurangabad", seats: 120, fees: 82000, type: "Government" },

  { college: "COEP Technological University", branch: "Computer Engineering", category: "SC", cutoff_current: 96.4, cutoff_previous: 96.1, location: "Pune", seats: 120, fees: 95000, type: "Government" },
  { college: "VJTI", branch: "Computer Engineering", category: "SC", cutoff_current: 95.9, cutoff_previous: 95.4, location: "Mumbai", seats: 120, fees: 90000, type: "Government" },
  { college: "PCCOE", branch: "Computer Engineering", category: "SC", cutoff_current: 91.5, cutoff_previous: 91.1, location: "Pune", seats: 180, fees: 142000, type: "Private" },
  { college: "PICT", branch: "IT", category: "SC", cutoff_current: 93.6, cutoff_previous: 93.1, location: "Pune", seats: 180, fees: 148000, type: "Private" },
  { college: "Government College of Engineering, Amravati", branch: "Civil", category: "SC", cutoff_current: 80.6, cutoff_previous: 79.8, location: "Amravati", seats: 120, fees: 78000, type: "Government" },
  { college: "Cummins College of Engineering", branch: "AI/DS", category: "SC", cutoff_current: 90.3, cutoff_previous: 89.7, location: "Pune", seats: 120, fees: 156000, type: "Private" },
  { college: "RCOEM", branch: "IT", category: "SC", cutoff_current: 88.5, cutoff_previous: 87.8, location: "Nagpur", seats: 120, fees: 175000, type: "Private" },
  { college: "KJ Somaiya College of Engineering", branch: "Computer Engineering", category: "SC", cutoff_current: 87.2, cutoff_previous: 86.3, location: "Mumbai", seats: 120, fees: 192000, type: "Private" },
  { college: "MET Bhujbal Knowledge City", branch: "Mechanical", category: "SC", cutoff_current: 74.5, cutoff_previous: 73.3, location: "Nashik", seats: 120, fees: 112000, type: "Private" },
  { college: "Government College of Engineering, Karad", branch: "Mechanical", category: "SC", cutoff_current: 82.7, cutoff_previous: 82.1, location: "Satara", seats: 120, fees: 76000, type: "Government" },

  { college: "COEP Technological University", branch: "Computer Engineering", category: "ST", cutoff_current: 94.2, cutoff_previous: 93.7, location: "Pune", seats: 120, fees: 95000, type: "Government" },
  { college: "VJTI", branch: "Computer Engineering", category: "ST", cutoff_current: 93.7, cutoff_previous: 93.1, location: "Mumbai", seats: 120, fees: 90000, type: "Government" },
  { college: "PCCOE", branch: "Computer Engineering", category: "ST", cutoff_current: 88.4, cutoff_previous: 87.8, location: "Pune", seats: 180, fees: 142000, type: "Private" },
  { college: "PICT", branch: "IT", category: "ST", cutoff_current: 90.2, cutoff_previous: 89.5, location: "Pune", seats: 180, fees: 148000, type: "Private" },
  { college: "Government College of Engineering, Amravati", branch: "Civil", category: "ST", cutoff_current: 76.6, cutoff_previous: 75.4, location: "Amravati", seats: 120, fees: 78000, type: "Government" },
  { college: "Cummins College of Engineering", branch: "AI/DS", category: "ST", cutoff_current: 86.9, cutoff_previous: 86, location: "Pune", seats: 120, fees: 156000, type: "Private" },
  { college: "RCOEM", branch: "IT", category: "ST", cutoff_current: 84.8, cutoff_previous: 83.7, location: "Nagpur", seats: 120, fees: 175000, type: "Private" },
  { college: "KJ Somaiya College of Engineering", branch: "Computer Engineering", category: "ST", cutoff_current: 83.1, cutoff_previous: 82.4, location: "Mumbai", seats: 120, fees: 192000, type: "Private" },
  { college: "MET Bhujbal Knowledge City", branch: "Mechanical", category: "ST", cutoff_current: 69.3, cutoff_previous: 68.1, location: "Nashik", seats: 120, fees: 112000, type: "Private" },
  { college: "Government College of Engineering, Karad", branch: "Mechanical", category: "ST", cutoff_current: 78.4, cutoff_previous: 77.2, location: "Satara", seats: 120, fees: 76000, type: "Government" },

  { college: "COEP Technological University", branch: "Computer Engineering", category: "EWS", cutoff_current: 98.8, cutoff_previous: 98.3, location: "Pune", seats: 120, fees: 95000, type: "Government" },
  { college: "VJTI", branch: "Computer Engineering", category: "EWS", cutoff_current: 98.6, cutoff_previous: 98.2, location: "Mumbai", seats: 120, fees: 90000, type: "Government" },
  { college: "PCCOE", branch: "Computer Engineering", category: "EWS", cutoff_current: 95.8, cutoff_previous: 95.3, location: "Pune", seats: 180, fees: 142000, type: "Private" },
  { college: "PICT", branch: "IT", category: "EWS", cutoff_current: 97.3, cutoff_previous: 96.8, location: "Pune", seats: 180, fees: 148000, type: "Private" },
  { college: "Government College of Engineering, Aurangabad", branch: "Civil", category: "EWS", cutoff_current: 87.9, cutoff_previous: 87.2, location: "Aurangabad", seats: 120, fees: 82000, type: "Government" },
  { college: "Cummins College of Engineering", branch: "AI/DS", category: "EWS", cutoff_current: 95.1, cutoff_previous: 94.5, location: "Pune", seats: 120, fees: 156000, type: "Private" },
  { college: "RCOEM", branch: "IT", category: "EWS", cutoff_current: 94.2, cutoff_previous: 93.6, location: "Nagpur", seats: 120, fees: 175000, type: "Private" },
  { college: "KJ Somaiya College of Engineering", branch: "Computer Engineering", category: "EWS", cutoff_current: 93.7, cutoff_previous: 92.9, location: "Mumbai", seats: 120, fees: 192000, type: "Private" },
  { college: "MET Bhujbal Knowledge City", branch: "Mechanical", category: "EWS", cutoff_current: 81.6, cutoff_previous: 80.7, location: "Nashik", seats: 120, fees: 112000, type: "Private" },
  { college: "Government College of Engineering, Karad", branch: "Mechanical", category: "EWS", cutoff_current: 89.1, cutoff_previous: 88.6, location: "Satara", seats: 120, fees: 76000, type: "Government" },
];
