
import React from 'react';
import { Translation } from '../types';

interface HeroProps {
  t: Translation;
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ t, onStart }) => {
  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#ee6c4d] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#415a77] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="w-full h-full retro-stripes"></div>
      </div>

      <div className="relative z-10 max-w-5xl flex flex-col items-center">
        {/* Hero Logo */}
        <div className="mb-8 animate-float">
          <img 
            src="Groovie Merchant IconBG.png" 
            alt="Groovie Logo" 
            className="w-24 h-24 md:w-32 md:h-32 rounded-3xl shadow-2xl border-4 border-[#f2a65a]/20 object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <h1 className="font-groovy text-5xl md:text-8xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#ee6c4d] via-[#f2a65a] to-[#e0e1dd] drop-shadow-2xl leading-tight">
          {t.heroTitle}
        </h1>
        
        <p className="text-xl md:text-3xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          {t.heroSub}
        </p>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={onStart}
            className="group relative px-10 py-5 bg-[#ee6c4d] text-white font-bold text-xl rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(238,108,77,0.5)] overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              {t.ctaButton}
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </button>
          
          <button 
            onClick={() => document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-5 border-2 border-slate-700 text-slate-300 font-bold text-xl rounded-2xl hover:bg-white/5 transition-all"
          >
            {/* Fix: use translation instead of undefined variable 'lang' */}
            {t.learnMore}
          </button>
        </div>
      </div>

      {/* Decorative stripe line at the bottom */}
      <div className="absolute bottom-0 w-full px-10">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
