
import React, { useState } from 'react';
import { SubmissionType, Submission } from '../types';
import { Send, Loader2, User, Users, CheckCircle2, CloudUpload } from 'lucide-react';

interface SubmissionFormProps {
  onSubmit: (submission: Submission) => Promise<void>;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ onSubmit }) => {
  const [type, setType] = useState<SubmissionType>(SubmissionType.INDIVIDU);
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Robust ID generator fallback
  const generateId = () => {
    try {
      if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
      }
    } catch (e) {}
    return Math.random().toString(36).substring(2, 15) + '-' + Date.now().toString(36);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1 || !title) return;
    if (type === SubmissionType.BERKUMPULAN && !name2) return;

    setIsSubmitting(true);

    const newSubmission: Submission = {
      id: generateId(),
      timestamp: Date.now(),
      type,
      name1,
      name2: type === SubmissionType.BERKUMPULAN ? name2 : undefined,
      title
    };

    await onSubmit(newSubmission);
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setName1('');
    setName2('');
    setTitle('');
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="relative">
      {showSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-medium">
            <CheckCircle2 size={20} /> Data Berjaya Disimpan!
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden mb-8">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800">Borang Pendaftaran</h2>
          <div className="flex items-center gap-1 text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded">
            <CloudUpload size={10} /> DATABASE AKTIF
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 text-center">Kategori Penyertaan</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType(SubmissionType.INDIVIDU)}
                className={`flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-all ${
                  type === SubmissionType.INDIVIDU 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                    : 'bg-white text-slate-500 border-slate-200'
                }`}
              >
                <User size={18} /> Individu
              </button>
              <button
                type="button"
                onClick={() => setType(SubmissionType.BERKUMPULAN)}
                className={`flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-all ${
                  type === SubmissionType.BERKUMPULAN 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                    : 'bg-white text-slate-500 border-slate-200'
                }`}
              >
                <Users size={18} /> Berkumpulan
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="name1" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Nama Pegawai {type === SubmissionType.BERKUMPULAN ? 'Pertama' : ''}
              </label>
              <input
                id="name1"
                type="text"
                required
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-yellow-400 outline-none transition-all placeholder:text-slate-300"
                placeholder="NAMA PENUH ANDA"
              />
            </div>

            {type === SubmissionType.BERKUMPULAN && (
              <div className="animate-in fade-in slide-in-from-top-2">
                <label htmlFor="name2" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Nama Pegawai Kedua
                </label>
                <input
                  id="name2"
                  type="text"
                  required
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-yellow-400 outline-none transition-all placeholder:text-slate-300"
                  placeholder="NAMA RAKAN KUMPULAN"
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="title" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Tajuk Penulisan Ilmiah
            </label>
            <textarea
              id="title"
              required
              rows={3}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-yellow-400 outline-none transition-all placeholder:text-slate-300 resize-none"
              placeholder="Contoh: Keberkesanan Bimbingan Klinikal di Sekolah..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-black py-4 rounded-xl shadow-lg transition-all active:scale-[0.97] flex flex-col items-center justify-center gap-0 mt-2 uppercase tracking-tight"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Menghantar...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Hantar Data</span> <Send size={20} />
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;
