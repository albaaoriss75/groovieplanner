
import React from 'react';
import { Language } from '../types';

interface LanguageToggleProps {
  current: Language;
  onToggle: (lang: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ current, onToggle }) => {
  return (
    <div className="flex items-center space-x-2 bg-slate-800 p-1 rounded-full border border-slate-700">
      <button
        onClick={() => onToggle('en')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
          current === 'en' ? 'bg-[#f2a65a] text-black' : 'text-slate-400 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onToggle('bg')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
          current === 'bg' ? 'bg-[#ee6c4d] text-white' : 'text-slate-400 hover:text-white'
        }`}
      >
        БГ
      </button>
    </div>
  );
};

export default LanguageToggle;
