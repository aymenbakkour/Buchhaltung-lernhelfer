
import React, { useState, useMemo } from 'react';
import { ACCOUNTING_TERMS } from '../constants';

const Dictionary: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredTerms = useMemo(() => {
    const query = search.toLowerCase();
    return ACCOUNTING_TERMS.filter(
      (t) =>
        t.abbr.toLowerCase().includes(query) ||
        t.de.toLowerCase().includes(query) ||
        t.ar.includes(query)
    );
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Wörterbuch / قاموس</h2>
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Suchen... / بحث..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
          <span className="absolute right-3 top-2.5 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-sm border border-slate-200">
        <table className="w-full text-left border-collapse bg-white">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Abkürzung</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Deutsch (Vollständig)</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider text-right" dir="rtl">المعنى بالعربية</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredTerms.map((term, idx) => (
              <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-blue-600">{term.abbr}</td>
                <td className="px-6 py-4 text-slate-700">{term.de}</td>
                <td className="px-6 py-4 text-slate-700 text-right font-medium" dir="rtl">{term.ar}</td>
              </tr>
            ))}
            {filteredTerms.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-slate-500 italic">
                  Keine Ergebnisse gefunden / لم يتم العثور على نتائج
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dictionary;
