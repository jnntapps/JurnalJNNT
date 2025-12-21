
import React from 'react';
import { FileText, User, Users } from 'lucide-react';
import { DashboardStats } from '../types';

interface StatsCardsProps {
  stats: DashboardStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="space-y-4 mb-6">
      {/* Primary Stat: Total Titles */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
        <div className="bg-yellow-100 p-3 rounded-xl">
          <FileText className="w-8 h-8 text-yellow-600" />
        </div>
        <div>
          <div className="text-3xl font-black text-slate-800 leading-none">{stats.totalTitles}</div>
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Jumlah Tajuk</div>
        </div>
      </div>
      
      {/* Secondary Stats: Individu & Kumpulan */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
          <div className="bg-blue-50 p-2 rounded-full mb-2">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-xl font-bold text-slate-800">{stats.totalIndividu}</div>
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Individu</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
          <div className="bg-teal-50 p-2 rounded-full mb-2">
            <Users className="w-5 h-5 text-teal-600" />
          </div>
          <div className="text-xl font-bold text-slate-800">{stats.totalKumpulan}</div>
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Kumpulan</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
