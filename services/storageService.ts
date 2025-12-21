
import { Submission, DashboardStats, SubmissionType } from '../types';

const STORAGE_KEY = 'nazir_submissions_v1';

// URL Google Script anda
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwBoDnGCTP3zDDvyZ-gMywy2RH36TBg31j5sMg4gfhSXpSg5TmSv4kb7kvCdr2HsIWmmQ/exec"; 

export const saveSubmission = async (submission: Submission): Promise<boolean> => {
  try {
    const existingData = localStorage.getItem(STORAGE_KEY);
    const submissions: Submission[] = existingData ? JSON.parse(existingData) : [];
    submissions.unshift(submission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));

    const payload = {
      ...submission,
      formattedDate: new Date(submission.timestamp).toLocaleString('ms-MY'),
    };

    if (GOOGLE_SCRIPT_URL && !GOOGLE_SCRIPT_URL.includes("PASTE_URL")) {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    }
    
    return true;
  } catch (error) {
    console.error("Error saving submission", error);
    return true; 
  }
};

export const getSubmissions = async (): Promise<Submission[]> => {
  const existingData = localStorage.getItem(STORAGE_KEY);
  return existingData ? JSON.parse(existingData) : [];
};

export const calculateStats = (submissions: Submission[]): DashboardStats => {
  const totalTitles = submissions.length;
  const totalIndividu = submissions.filter(sub => sub.type === SubmissionType.INDIVIDU).length;
  const totalKumpulan = submissions.filter(sub => sub.type === SubmissionType.BERKUMPULAN).length;

  return { totalTitles, totalIndividu, totalKumpulan };
};
