
import React, { useState, useRef, useEffect } from 'react';
import { Language, UserPreferences, PlanOutput } from './types';
import { TRANSLATIONS, FOCUS_AREAS, COMMITMENT_LEVELS } from './constants';
import { generatePlan } from './services/geminiService';
import LanguageToggle from './components/LanguageToggle';
import Hero from './components/Hero';
import PlanDisplay from './components/PlanDisplay';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<PlanOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<UserPreferences>({
    name: '',
    age: '',
    primaryGoal: '',
    focusArea: 'Health',
    currentHabits: '',
    targetHabits: '',
    timeCommitment: 'medium'
  });

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStart = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const generatedPlan = await generatePlan(formData, lang);
      setPlan(generatedPlan);
      setTimeout(() => {
        document.getElementById('plan-result')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError(lang === 'en' ? "Failed to generate plan. Please try again." : "Неуспешно генериране на план. Моля, опитайте отново.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const navLinks = [
    { name: lang === 'en' ? 'Home' : 'Начало', id: 'home' },
    { name: lang === 'en' ? 'Planner' : 'Планировчик', id: 'planner' },
    { name: plan ? (lang === 'en' ? 'Your Plan' : 'Вашият план') : null, id: 'plan-result' }
  ].filter(link => link.name !== null);

  return (
    <div className="min-h-screen relative pb-20 overflow-x-hidden selection:bg-[#ee6c4d] selection:text-white">
      {/* Header / Nav */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0d1b2a]/95 backdrop-blur-md shadow-2xl py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <img 
              src="Groovie Merchant IconBG.png" 
              alt="Groovie Logo" 
              className="w-10 h-10 rounded-xl shadow-lg object-cover ring-2 ring-[#f2a65a]/20"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent && !parent.querySelector('.fallback-logo')) {
                  const fallback = document.createElement('div');
                  fallback.className = "fallback-logo w-10 h-10 rounded-xl bg-gradient-to-br from-[#ee6c4d] to-[#f2a65a] shadow-lg flex items-center justify-center font-groovy text-white text-xl";
                  fallback.innerText = "G";
                  parent.prepend(fallback);
                }
              }}
            />
            <span className="font-groovy text-2xl tracking-tighter text-[#e0e1dd]">Groovie</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <button 
                key={link.id} 
                onClick={() => scrollToSection(link.id!)}
                className="text-slate-300 hover:text-[#f2a65a] font-medium transition-colors text-sm uppercase tracking-widest"
              >
                {link.name}
              </button>
            ))}
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            <LanguageToggle current={lang} onToggle={setLang} />
            <button
              onClick={handleStart}
              className="px-6 py-2.5 bg-[#ee6c4d] text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg text-sm"
            >
              {t.ctaButton}
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center space-x-4">
            <LanguageToggle current={lang} onToggle={setLang} />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`md:hidden fixed inset-0 z-40 bg-[#0d1b2a] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col items-center justify-center h-full space-y-10 px-6 text-center">
            {navLinks.map(link => (
              <button 
                key={link.id} 
                onClick={() => scrollToSection(link.id!)}
                className="text-4xl font-groovy text-slate-100 hover:text-[#f2a65a]"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={handleStart}
              className="w-full py-5 bg-[#ee6c4d] text-white font-groovy text-2xl rounded-2xl"
            >
              {t.ctaButton}
            </button>
          </div>
        </div>
      </header>

      <Hero t={t} onStart={handleStart} />

      {/* Form Section */}
      <div id="planner" ref={formRef} className="max-w-4xl mx-auto px-4 py-32 scroll-mt-20">
        <div className="glass-card rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden border-t border-white/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ee6c4d] opacity-5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
          
          <div className="text-center mb-12">
            <h2 className="font-groovy text-4xl md:text-5xl text-[#f2a65a] mb-4">{t.formTitle}</h2>
            <p className="text-slate-400 max-w-xl mx-auto">{lang === 'en' ? 'Tell us a bit about your lifestyle and goals, and let our AI curate the perfect groovie plan for you.' : 'Разкажете ни малко за вашия начин на живот и цели, и оставете нашия AI да състави перфектния план за вас.'}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-400 ml-1 uppercase tracking-wider">{t.nameLabel}</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#ee6c4d] transition-all text-lg"
                  placeholder="e.g. Alex"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-400 ml-1 uppercase tracking-wider">{t.ageLabel}</label>
                <input
                  required
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#ee6c4d] transition-all text-lg"
                  placeholder="e.g. 28"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-400 ml-1 uppercase tracking-wider">{t.goalLabel}</label>
              <textarea
                required
                value={formData.primaryGoal}
                onChange={(e) => setFormData({...formData, primaryGoal: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#f2a65a] transition-all h-32 resize-none text-lg"
                placeholder="e.g. Run a marathon next year"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-400 ml-1 uppercase tracking-wider">{t.focusLabel}</label>
                <div className="relative">
                  <select
                    value={formData.focusArea}
                    onChange={(e) => setFormData({...formData, focusArea: e.target.value as any})}
                    className="w-full bg-slate-800 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#ee6c4d] transition-all appearance-none cursor-pointer text-lg"
                  >
                    {FOCUS_AREAS.map(area => <option key={area} value={area}>{area}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-400 ml-1 uppercase tracking-wider">{t.commitmentLabel}</label>
                <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10">
                  {COMMITMENT_LEVELS.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setFormData({...formData, timeCommitment: level.value as any})}
                      className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${
                        formData.timeCommitment === level.value 
                        ? 'bg-[#f2a65a] text-black shadow-xl scale-105' 
                        : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {level.label[lang]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-400 ml-1 uppercase tracking-wider">{t.currentHabitsLabel}</label>
                <textarea
                  value={formData.currentHabits}
                  onChange={(e) => setFormData({...formData, currentHabits: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#ee6c4d] transition-all h-24 resize-none text-lg"
                  placeholder="e.g. Daily coffee, late nights"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-400 ml-1 uppercase tracking-wider">{t.targetHabitsLabel}</label>
                <textarea
                  value={formData.targetHabits}
                  onChange={(e) => setFormData({...formData, targetHabits: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#ee6c4d] transition-all h-24 resize-none text-lg"
                  placeholder="e.g. 5am wake up, meditation"
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-6 bg-gradient-to-r from-[#ee6c4d] to-[#f2a65a] text-white font-groovy text-3xl rounded-[2rem] transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(238,108,77,0.4)] disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{t.loading}</span>
                </div>
              ) : (
                <span>{t.generateButton}</span>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-center text-red-400 font-medium animate-bounce">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Plan Section */}
      {plan && (
        <div id="plan-result" className="scroll-mt-32">
          <PlanDisplay plan={plan} t={t} />
        </div>
      )}

      {/* Footer Strip */}
      <footer className="mt-32 py-16 text-center text-slate-500 bg-slate-900/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-4">
             <div className="flex items-center space-x-2">
               <img src="Groovie Merchant IconBG.png" className="w-8 h-8 rounded-lg" alt="Logo" />
               <span className="font-groovy text-xl text-slate-300">Groovie</span>
             </div>
             <p className="text-sm max-w-xs text-slate-500">Your AI-powered companion for a balanced and groovie lifestyle. Reach your goals with style.</p>
          </div>
          
          <div className="flex justify-center space-x-8 text-sm font-bold uppercase tracking-widest">
            <button onClick={() => scrollToSection('home')} className="hover:text-[#f2a65a] transition-colors">About</button>
            <button onClick={() => scrollToSection('planner')} className="hover:text-[#f2a65a] transition-colors">Terms</button>
            <button onClick={() => window.open('https://google.com')} className="hover:text-[#f2a65a] transition-colors">Privacy</button>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm">© 2024 Groovie AI Planner</p>
            <div className="mt-4 flex space-x-3 opacity-30">
               <div className="w-8 h-1 bg-[#ee6c4d] rounded-full"></div>
               <div className="w-8 h-1 bg-[#f2a65a] rounded-full"></div>
               <div className="w-8 h-1 bg-slate-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
