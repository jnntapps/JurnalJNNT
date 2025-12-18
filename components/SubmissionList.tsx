
import React, { useState } from 'react';
import { Submission, SubmissionType } from '../types';
import { User, Search, Filter, BookOpen } from 'lucide-react';

interface SubmissionListProps {
  submissions: Submission[];
}

const SubmissionList: React.FC<SubmissionListProps> = ({ submissions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | SubmissionType>('ALL');

  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = 
      sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.name1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sub.name2 && sub.name2.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterType === 'ALL' || sub.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 px-1">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text"
            placeholder="Cari tajuk atau nama..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-yellow-400 transition-all shadow-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button 
            onClick={() => setFilterType('ALL')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              filterType === 'ALL' ? 'bg-slate-800 text-white border-slate-800 shadow-md' : 'bg-white text-slate-500 border-slate-200'
            }`}
          >
            Semua
          </button>
          <button 
            onClick={() => setFilterType(SubmissionType.INDIVIDU)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              filterType === SubmissionType.INDIVIDU ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-slate-500 border-slate-200'
            }`}
          >
            Individu
          </button>
          <button 
            onClick={() => setFilterType(SubmissionType.BERKUMPULAN)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              filterType === SubmissionType.BERKUMPULAN ? 'bg-teal-600 text-white border-teal-600 shadow-md' : 'bg-white text-slate-500 border-slate-200'
            }`}
          >
            Berkumpulan
          </button>
        </div>
      </div>
      
      {filteredSubmissions.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 shadow-inner">
          <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Filter className="text-slate-300" size={20} />
          </div>
          <p className="text-slate-400 text-sm font-medium">Tiada rekod ditemui.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSubmissions.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative z-0 hover:border-yellow-200 transition-colors">
              <div className="flex flex-col gap-3">
                {/* Badge Kategori */}
                <div className="flex justify-between items-start">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${
                    item.type === SubmissionType.INDIVIDU 
                      ? 'bg-blue-50 text-blue-700 border-blue-100' 
                      : 'bg-teal-50 text-teal-700 border-teal-100'
                  }`}>
                     {item.type === SubmissionType.INDIVIDU ? 'Individu' : 'Berkumpulan'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-300">#{item.id.substring(0, 6)}</span>
                </div>

                {/* Bahagian Tajuk (Sekarang lebih menonjol) */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <BookOpen size={12} className="text-yellow-500" /> Tajuk Penulisan
                  </div>
                  <h4 className="text-slate-900 font-bold text-base leading-snug break-words">
                    {item.title}
                  </h4>
                </div>
                
                {/* Bahagian Nama Pegawai */}
                <div className="pt-3 border-t border-slate-50">
                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Pegawai Terlibat</div>
                   <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 truncate">{item.name1}</span>
                    </div>
                    {item.type === SubmissionType.BERKUMPULAN && item.name2 && (
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                          <User className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 truncate">{item.name2}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer Kad */}
              <div className="mt-4 pt-3 border-t border-slate-50 text-[10px] text-slate-400 flex justify-between items-center">
                <span className="font-medium bg-slate-50 px-2 py-0.5 rounded italic">
                  Dihantar pada {new Date(item.timestamp).toLocaleDateString('ms-MY', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmissionList;
