
import React, { useState, useEffect } from 'react';
import { QuickTask, Translation } from '../types';

interface QuickTasksProps {
  t: Translation;
}

const QuickTasks: React.FC<QuickTasksProps> = ({ t }) => {
  const [tasks, setTasks] = useState<QuickTask[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Load tasks on mount
  useEffect(() => {
    const saved = localStorage.getItem('groovie_quick_tasks');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse quick tasks", e);
      }
    }
  }, []);

  // Save tasks on change
  useEffect(() => {
    localStorage.setItem('groovie_quick_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    
    const newTask: QuickTask = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
    };
    
    setTasks([newTask, ...tasks]);
    setInputValue('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border-b-4 border-b-[#f2a65a] shadow-2xl relative overflow-hidden group">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee6c4d] opacity-5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:opacity-10 transition-opacity"></div>
        
        <h2 className="font-groovy text-3xl text-[#f2a65a] mb-8 text-center md:text-left flex items-center justify-center md:justify-start space-x-3">
          <span className="text-4xl">⚡</span>
          <span>{t.quickTasksTitle}</span>
        </h2>

        <form onSubmit={addTask} className="flex space-x-3 mb-10">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t.addTaskPlaceholder}
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#ee6c4d] transition-all text-lg placeholder:text-slate-600"
          />
          <button
            type="submit"
            className="w-14 h-14 bg-[#ee6c4d] text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </form>

        <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {tasks.length === 0 ? (
            <div className="text-center py-10 opacity-20 italic">
               No tasks yet. Stay groovie.
            </div>
          ) : (
            tasks.map((task) => (
              <li 
                key={task.id}
                className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                  task.completed ? 'bg-white/5 border-transparent' : 'bg-white/5 border-white/5 hover:border-white/20'
                }`}
              >
                <div 
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center space-x-4 cursor-pointer flex-1"
                >
                  <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${
                    task.completed ? 'bg-[#f2a65a] border-[#f2a65a]' : 'border-slate-700'
                  }`}>
                    {task.completed && (
                      <svg className="w-4 h-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-lg transition-all ${task.completed ? 'line-through text-slate-600' : 'text-slate-200'}`}>
                    {task.text}
                  </span>
                </div>
                
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-slate-700 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default QuickTasks;
