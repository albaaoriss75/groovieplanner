
import React from 'react';
import { PlanOutput, Translation } from '../types';

interface PlanDisplayProps {
  plan: PlanOutput;
  t: Translation;
}

const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan, t }) => {
  return (
    <div className="max-w-5xl mx-auto mt-12 mb-20 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="glass-card rounded-3xl p-8 md:p-12 border-l-8 border-l-[#f2a65a] shadow-2xl">
        <div className="mb-10 text-center">
          <h2 className="font-groovy text-4xl md:text-5xl text-[#f2a65a] mb-4">{plan.title}</h2>
          <p className="text-xl text-slate-300 italic">"{plan.summary}"</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Routine Blocks */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#ee6c4d] border-b border-white/10 pb-2">{t.morning}</h3>
            <ul className="space-y-3">
              {plan.dailyRoutine.morning.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-slate-300">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#f2a65a]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#f2a65a] border-b border-white/10 pb-2">{t.afternoon}</h3>
            <ul className="space-y-3">
              {plan.dailyRoutine.afternoon.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-slate-300">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#ee6c4d]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#415a77] border-b border-white/10 pb-2">{t.evening}</h3>
            <ul className="space-y-3">
              {plan.dailyRoutine.evening.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-slate-300">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-slate-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="glass-card p-6 rounded-2xl bg-white/5">
            <h3 className="font-groovy text-2xl text-[#f2a65a] mb-6 flex items-center space-x-3">
               <span>✨</span>
               <span>{t.habitsTitle}</span>
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {plan.habits.map((habit, idx) => (
                <div key={idx} className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center space-x-3">
                  <span className="text-[#ee6c4d] font-bold">#0{idx + 1}</span>
                  <span className="text-slate-200">{habit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl bg-white/5">
            <h3 className="font-groovy text-2xl text-[#ee6c4d] mb-6 flex items-center space-x-3">
               <span>🚀</span>
               <span>{t.milestonesTitle}</span>
            </h3>
            <div className="space-y-4">
              {plan.milestones.map((ms, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-[#415a77]">
                  <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-[#f2a65a]" />
                  <p className="text-slate-200 leading-tight">{ms}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center p-8 bg-gradient-to-br from-[#ee6c4d]/10 to-transparent rounded-2xl border border-[#ee6c4d]/20">
          <p className="text-2xl font-medium text-slate-100 italic">"{plan.quote}"</p>
        </div>
      </div>
    </div>
  );
};

export default PlanDisplay;
