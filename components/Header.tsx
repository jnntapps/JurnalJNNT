import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="bg-white shadow-md border-b border-slate-200">
      <div className="max-w-md mx-auto px-6 py-8 flex flex-col items-center text-center">
        
        {/* Text Header Only */}
        <p className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
          Jemaah Nazir Negeri Terengganu
        </p>

        <div className="w-full border-t border-slate-100 mb-4"></div>
        
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
          Penulisan Ilmiah JNNT
        </h2>
        <div className="h-1 w-16 bg-yellow-500 mt-2 rounded-full"></div>
      </div>
    </div>
  );
};

export default Header;