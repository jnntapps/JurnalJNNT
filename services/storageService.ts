
import { Submission, DashboardStats, SubmissionType } from '../types';

const STORAGE_KEY = 'nazir_submissions_v1';

// URL Google Script anda (Pastikan anda telah 'Deploy' sebagai Web App)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwBoDnGCTP3zDDvyZ-gMywy2RH36TBg31j5sMg4gfhSXpSg5TmSv4kb7kvCdr2HsIWmmQ/exec"; 

export const saveSubmission = async (submission: Submission): Promise<boolean> => {
  try {
    // 1. Simpan ke Local Storage sebagai sandaran (backup)
    const existingData = localStorage.getItem(STORAGE_KEY);
    const submissions: Submission[] = existingData ? JSON.parse(existingData) : [];
    submissions.unshift(submission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));

    // 2. Format data untuk Google Sheets
    const payload = {
      ...submission,
      formattedDate: new Date(submission.timestamp).toLocaleString('ms-MY'),
    };

    // 3. Hantar ke Google Sheet
    if (GOOGLE_SCRIPT_URL && !GOOGLE_SCRIPT_URL.includes("PASTE_URL")) {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Penting untuk Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    }
    
    return true;
  } catch (error) {
    console.error("Error saving submission", error);
    // Jika gagal hantar ke cloud, sekurang-kurangnya ia ada dalam Local Storage
    return true; 
  }
};

export const getSubmissions = async (): Promise<Submission[]> => {
  const existingData = localStorage.getItem(STORAGE_KEY);
  return existingData ? JSON.parse(existingData) : [];
};

export const calculateStats = (submissions: Submission[]): DashboardStats => {
  let totalOfficers = 0;
  let totalTitles = submissions.length;

  submissions.forEach(sub => {
    if (sub.type === SubmissionType.INDIVIDU) {
      totalOfficers += 1;
    } else {
      totalOfficers += (sub.name2 ? 2 : 1);
    }
  });

  return { totalOfficers, totalTitles };
};
