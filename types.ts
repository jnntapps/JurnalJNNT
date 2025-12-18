export enum SubmissionType {
  INDIVIDU = 'INDIVIDU',
  BERKUMPULAN = 'BERKUMPULAN'
}

export interface Submission {
  id: string;
  timestamp: number;
  type: SubmissionType;
  name1: string;
  name2?: string;
  icNumber1?: string; // Optional for this demo, usually needed for official forms
  icNumber2?: string;
  title: string;
  // abstract removed as requested
}

export interface DashboardStats {
  totalOfficers: number;
  totalTitles: number;
}