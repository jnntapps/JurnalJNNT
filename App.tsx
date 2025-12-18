
import React, { useEffect, useState, useCallback } from 'react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import SubmissionForm from './components/SubmissionForm';
import SubmissionList from './components/SubmissionList';
import { Submission, DashboardStats } from './types';
import { getSubmissions, saveSubmission, calculateStats } from './services/storageService';
import { ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [stats, setStats] = useState<DashboardStats>({ totalOfficers: 0, totalTitles: 0 });
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const data = await getSubmissions();
      setSubmissions(data);
      setStats(calculateStats(data));
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = async (data: Submission) => {
    const success = await saveSubmission(data);
    if (success) {
      const updatedSubmissions = [data, ...submissions];
      setSubmissions(updatedSubmissions);
      setStats(calculateStats(updatedSubmissions));
    } else {
      alert("Maaf, terdapat ralat semasa menyimpan data.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      <Header />
      
      <main className="max-w-md mx-auto px-4 -mt-8 relative z-10">
        {/* Dashboard Stats */}
        <StatsCards stats={stats} />

        {/* Input Form */}
        <SubmissionForm onSubmit={handleSubmit} />

        {/* Data List Section Header */}
        <div className="mt-10 mb-4 px-1">
           <h3 className="text-lg font-bold text-slate-800">Senarai Rekod</h3>
        </div>

        {/* Data List */}
        <div>
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-b-yellow-500"></div>
            </div>
          ) : (
            <SubmissionList submissions={submissions} />
          )}
        </div>

        {/* Extra Actions */}
        <div className="mt-12 text-center">
          <a 
            href="https://docs.google.com/spreadsheets"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold text-sm transition-colors py-3 px-6 rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            Lihat Rekod Induk (Sheet) <ExternalLink size={16} />
          </a>
        </div>
      </main>

      <footer className="text-center py-10">
        <div className="h-px w-20 bg-slate-200 mx-auto mb-4"></div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
          © 2025 Unit Standard Dan Jaminan Kualiti JNNT
        </p>
      </footer>
    </div>
  );
};

export default App;
