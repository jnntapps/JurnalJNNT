
import React from 'react';
import { Users, FileText } from 'lucide-react';
import { DashboardStats } from '../types';

interface StatsCardsProps {
  stats: DashboardStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center">
        <div className="bg-blue-50 p-2 rounded-full mb-2">
          <Users className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-slate-800">{stats.totalOfficers}</span>
        </div>
        <span className="text-xs text-slate-500 font-medium uppercase tracking-wider text-center">Jumlah Pegawai</span>
      </div>
      
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center">
        <div className="bg-teal-50 p-2 rounded-full mb-2">
          <FileText className="w-6 h-6 text-teal-600" />
        </div>
        <span className="text-3xl font-bold text-slate-800">{stats.totalTitles}</span>
        <span className="text-xs text-slate-500 font-medium uppercase tracking-wider text-center">Jumlah Tajuk</span>
      </div>
    </div>
  );
};

export default StatsCards;
