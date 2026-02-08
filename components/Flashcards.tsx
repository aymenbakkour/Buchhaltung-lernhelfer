
import React, { useState } from 'react';
import { ACCOUNTING_TERMS } from '../constants';

const Flashcards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const term = ACCOUNTING_TERMS[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % ACCOUNTING_TERMS.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + ACCOUNTING_TERMS.length) % ACCOUNTING_TERMS.length);
    }, 150);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Karteikarten / بطاقات تعليمية</h2>
        <p className="text-slate-500">Klicken Sie zum Umdrehen / اضغط لقلب البطاقة</p>
      </div>

      <div 
        className="w-full max-w-sm h-72 perspective-1000 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full transition-transform duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute inset-0 bg-white border-2 border-blue-500 rounded-3xl shadow-xl flex items-center justify-center backface-hidden">
            <div className="text-6xl font-black text-blue-600 tracking-tighter">
              {term.abbr}
            </div>
          </div>
          
          {/* Back */}
          <div className="absolute inset-0 bg-slate-800 border-2 border-slate-700 rounded-3xl shadow-xl flex flex-col items-center justify-center p-6 backface-hidden rotate-y-180 text-white text-center">
            <h3 className="text-xl font-medium mb-2 border-b border-white/20 pb-2 w-full">{term.de}</h3>
            <p className="text-2xl font-bold text-blue-400" dir="rtl">{term.ar}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="p-4 bg-white rounded-full shadow-md hover:bg-blue-50 text-blue-600 transition-colors border border-slate-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-slate-600 font-semibold text-lg">
          {currentIndex + 1} / {ACCOUNTING_TERMS.length}
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="p-4 bg-white rounded-full shadow-md hover:bg-blue-50 text-blue-600 transition-colors border border-slate-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <button 
        onClick={() => {
          const rand = Math.floor(Math.random() * ACCOUNTING_TERMS.length);
          setIsFlipped(false);
          setTimeout(() => setCurrentIndex(rand), 150);
        }}
        className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-full text-sm font-semibold transition-colors"
      >
        Zufällig / عشوائي
      </button>
    </div>
  );
};

export default Flashcards;
