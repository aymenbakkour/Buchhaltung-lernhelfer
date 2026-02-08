
import React, { useState } from 'react';
import { AppMode } from './types';
import Dictionary from './components/Dictionary';
import Flashcards from './components/Flashcards';
import Quiz from './components/Quiz';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.DICTIONARY);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-[#2c3e50] text-white shadow-md">
        <div className="max-container mx-auto px-4 py-6 md:py-10 text-center">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
            Buchhaltungsabkürzungen
          </h1>
          <h2 className="text-xl md:text-2xl font-light text-blue-300" dir="rtl">
            اختصارات المحاسبة في ألمانيا
          </h2>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-2xl mx-auto flex">
          <button
            onClick={() => setMode(AppMode.DICTIONARY)}
            className={`flex-1 py-4 text-sm md:text-base font-bold transition-all border-b-4 flex flex-col items-center justify-center ${
              mode === AppMode.DICTIONARY 
              ? 'border-blue-600 text-blue-600 bg-blue-50/30' 
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Dictionary</span>
            <span className="text-xs font-normal" dir="rtl">القاموس</span>
          </button>
          <button
            onClick={() => setMode(AppMode.FLASHCARDS)}
            className={`flex-1 py-4 text-sm md:text-base font-bold transition-all border-b-4 flex flex-col items-center justify-center ${
              mode === AppMode.FLASHCARDS 
              ? 'border-blue-600 text-blue-600 bg-blue-50/30' 
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Flashcards</span>
            <span className="text-xs font-normal" dir="rtl">البطاقات</span>
          </button>
          <button
            onClick={() => setMode(AppMode.QUIZ)}
            className={`flex-1 py-4 text-sm md:text-base font-bold transition-all border-b-4 flex flex-col items-center justify-center ${
              mode === AppMode.QUIZ 
              ? 'border-blue-600 text-blue-600 bg-blue-50/30' 
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Quiz</span>
            <span className="text-xs font-normal" dir="rtl">اختبار</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 mt-8">
        <div className="bg-white/50 backdrop-blur-sm p-4 md:p-8 rounded-3xl min-h-[500px]">
          {mode === AppMode.DICTIONARY && <Dictionary />}
          {mode === AppMode.FLASHCARDS && <Flashcards />}
          {mode === AppMode.QUIZ && <Quiz />}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-slate-400 text-sm py-8 border-t border-slate-200 bg-white">
        <p>© {new Date().getFullYear()} Accounting DE-AR Master</p>
        <p className="mt-1">Lerne die wichtigsten Fachbegriffe für deine Karriere.</p>
      </footer>
    </div>
  );
};

export default App;
