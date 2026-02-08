
import React, { useState, useEffect, useCallback } from 'react';
import { ACCOUNTING_TERMS } from '../constants';
import { AccountingTerm } from '../types';

const Quiz: React.FC = () => {
  const [currentTerm, setCurrentTerm] = useState<AccountingTerm | null>(null);
  const [options, setOptions] = useState<AccountingTerm[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const generateQuestion = useCallback(() => {
    const correct = ACCOUNTING_TERMS[Math.floor(Math.random() * ACCOUNTING_TERMS.length)];
    const others = ACCOUNTING_TERMS
      .filter((t) => t.abbr !== correct.abbr)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    const allOptions = [correct, ...others].sort(() => 0.5 - Math.random());
    
    setCurrentTerm(correct);
    setOptions(allOptions);
    setSelectedIdx(null);
    setIsCorrect(null);
  }, []);

  useEffect(() => {
    generateQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (idx: number) => {
    if (selectedIdx !== null) return;
    
    setSelectedIdx(idx);
    const correct = options[idx].abbr === currentTerm?.abbr;
    setIsCorrect(correct);
    setTotal(prev => prev + 1);
    if (correct) setScore(prev => prev + 1);
  };

  if (!currentTerm) return null;

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="text-slate-600">
          <span className="font-bold text-blue-600 text-2xl">{score}</span> / {total}
        </div>
        <h2 className="text-xl font-bold text-slate-800">Quiz / اختبار</h2>
        <button 
          onClick={() => { setScore(0); setTotal(0); generateQuestion(); }}
          className="text-sm text-blue-600 hover:underline"
        >
          Reset
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 mb-8 text-center transition-all">
        <p className="text-sm text-slate-500 mb-2">Was bedeutet diese Abkürzung? / ماذا يعني هذا الاختصار؟</p>
        <h3 className="text-6xl font-black text-slate-800 tracking-tight mb-8">{currentTerm.abbr}</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {options.map((opt, idx) => {
            let btnClass = "w-full p-4 rounded-xl border-2 transition-all flex justify-between items-center ";
            if (selectedIdx === idx) {
              btnClass += isCorrect ? "bg-green-50 border-green-500 text-green-700" : "bg-red-50 border-red-500 text-red-700";
            } else if (selectedIdx !== null && opt.abbr === currentTerm.abbr) {
              btnClass += "bg-green-50 border-green-500 text-green-700";
            } else {
              btnClass += "bg-slate-50 border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700";
            }

            return (
              <button
                key={idx}
                disabled={selectedIdx !== null}
                onClick={() => handleSelect(idx)}
                className={btnClass}
              >
                <span className="font-medium text-sm md:text-base text-left">{opt.de}</span>
                <span className="font-bold text-lg" dir="rtl">{opt.ar}</span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedIdx !== null && (
        <button
          onClick={generateQuestion}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
        >
          Nächste Frage / السؤال التالي
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Quiz;
