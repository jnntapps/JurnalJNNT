
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
  icNumber1?: string; 
  icNumber2?: string;
  title: string;
}

export interface DashboardStats {
  totalTitles: number;
  totalIndividu: number;
  totalKumpulan: number;
}
