"use client";

import { useState } from 'react';
import { getTzolkinDate } from '@/lib/mayan-utils';

export default function MayanCalculator() {
  const [date, setDate] = useState<string>('');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (!date) return;
    const calculated = getTzolkinDate(date);
    setResult(calculated);
  };

  return (
    <main className="min-h-screen bg-[#1a120b] text-[#e5d3b3] p-8 flex flex-col items-center">
      <div className="max-w-xl w-full bg-[#2c241a] border-2 border-[#d4af37] rounded-xl p-8 shadow-2xl">
        <h1 className="text-3xl font-serif text-[#d4af37] text-center uppercase tracking-widest mb-2">
          Mayan Spacetime Oracle
        </h1>
        <p className="text-center text-sm italic text-orange-700/80 mb-8">Next.js TypeScript Edition</p>

        <div className="flex flex-col gap-4 mb-8">
          <input 
            type="date" 
            className="bg-[#1a120b] border border-[#d4af37] p-3 rounded text-white outline-none focus:ring-2 ring-[#d4af37]"
            onChange={(e) => setDate(e.target.value)}
          />
          <button 
            onClick={handleCalculate}
            className="bg-[#d4af37] text-[#1a120b] font-bold py-3 px-6 rounded hover:bg-[#f1c40f] transition-all transform active:scale-95"
          >
            DISCOVER KIN
          </button>
        </div>

        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-8">
              <span className="text-5xl font-bold text-[#d4af37]">
                {result.tone} {result.sign}
              </span>
            </div>

            <div className="space-y-6">
              <section className="border-l-4 border-[#d4af37] pl-4">
                <h3 className="text-[#d4af37] font-bold uppercase text-sm tracking-tighter">Galactic Tone {result.tone}</h3>
                <p className="text-lg font-semibold">{result.toneData.name}</p>
                <p className="text-sm opacity-80">{result.toneData.meaning}</p>
                <p className="mt-2 inline-block px-2 py-1 bg-[#d4af37] text-[#1a120b] text-xs font-bold rounded">
                  ACTION: {result.toneData.action}
                </p>
              </section>

              <section className="border-l-4 border-[#d4af37] pl-4">
                <h3 className="text-[#d4af37] font-bold uppercase text-sm tracking-tighter">Solar Day Sign</h3>
                <p className="text-lg font-semibold">{result.sign}</p>
                <p className="text-sm opacity-80">This sign represents your solar identity and the archetype you embody in this spacetime cycle.</p>
              </section>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}