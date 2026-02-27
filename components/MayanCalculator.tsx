"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getTzolkinDate } from "@/lib/mayan/tzolkin";
import { generateMayanNarrative } from "@/lib/mayan/profileNarrative";
import { highlightText } from "@/lib/mayan/highlightText";
import { WORK_LOVE_BY_SIGN } from "@/lib/mayan/workLoveBySign";

export default function MayanCalculator() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [showFullReading, setShowFullReading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  const handleCalculate = () => {
    if (!day || !month || !year) return;
    setIsFlipping(true);
    setTimeout(() => {
      const dateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      const tzolkinResult = getTzolkinDate(dateString);
      setResult(tzolkinResult);
      setIsFlipping(false);
      setShowReveal(true);
    }, 800);
  };

  const handleReset = () => {
    setResult(null);
    setIsFlipping(false);
    setShowReveal(false);
    setShowFullReading(false);
    setCurrentPage(0);
  };

  const handleViewReading = () => {
    setShowReveal(false);
    setTimeout(() => {
      setShowFullReading(true);
      setCurrentPage(0);
    }, 300);
  };

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, 3));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 0));

  const narrative = result
    ? generateMayanNarrative(result.toneNumber, result.sign)
    : null;

  const highlightRules = result
    ? [
        {
          word: `${result.toneNumber} ${result.sign.name}`,
          className: "text-[#EC4899] font-bold",
        },
        {
          word: `Tone ${result.toneNumber}`,
          className: "text-amber-400 font-semibold",
        },
        {
          word: result.tone.action,
          className: "text-amber-200 italic",
        },
        {
          word: result.sign.name,
          className: "text-teal-300 font-semibold",
        },
        {
          word: result.sign.archetype,
          className: "text-teal-200 font-semibold",
        },
      ]
    : [];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  // Render page content based on currentPage
  const renderPageContent = () => {
    if (!result) return null;

    switch (currentPage) {
      case 0: // Overview
        return (
          <div className="flex flex-col h-[350px] text-center">
            <div className="space-y-8">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                Born on {new Date(`${year}-${month}-${day}`).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold bg-gradient-to-r from-amber-400 to-teal-400 bg-clip-text text-transparent">
                {result.tone.name} · {result.sign.name}
              </h2>
            </div>
            <div className="space-y-4 md:space-y-6 text-center max-w-2xl mx-auto py-12 md:py-20 px-4">
              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl text-amber-400 font-semibold tracking-wide">
                  Galactic Tone — {result.tone.action}
                </h3>
                <p className="text-white/80 text-base md:text-lg leading-relaxed">
                  {result.tone.personality.core}
                </p>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl text-teal-400 font-semibold tracking-wide">
                  Day Sign — {result.sign.archetype}
                </h3>
                <p className="text-white/80 text-base md:text-lg leading-relaxed">
                  {result.sign.personality.essence}
                </p>
              </div>
            </div>
          </div>
        );
      
      case 1: // Complete Profile
        return (
          <div className="h-[350px] flex flex-col">
            <div className="space-y-6 text-left overflow-y-auto flex-1 pr-4">
              <div className="text-center space-y-3">
                <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                  Mayan Spacetime Reading
                </p>
                <h3 className="text-3xl font-serif font-semibold text-white">
                  Your Complete Profile
                </h3>
                <div className="flex justify-center">
                  <div className="h-px w-40 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
                </div>
              </div>
              <p className="text-white/90 text-lg">
                {highlightText(narrative?.intro || "", highlightRules)}
              </p>
              <p className="text-white/80">
                {highlightText(narrative?.tone || "", highlightRules)}
              </p>
              <p className="text-white/80">
                {highlightText(narrative?.sign || "", highlightRules)}
              </p>
              <p className="text-purple-300 italic">
                {highlightText(narrative?.interaction || "", highlightRules)}
              </p>
              <p className="text-white/70">
                {highlightText(narrative?.lifeTheme || "", highlightRules)}
              </p>
              <p className="text-white/50 italic">
                {highlightText(narrative?.closing || "", highlightRules)}
              </p>
            </div>
          </div>
        );
      
      case 2: // Work & Career
        return (
          <div className="flex flex-col justify-between h-[350px]">
            <div className="space-y-8">
              <div className="flex items-center gap-3 justify-center">
                <div className="text-4xl">💼</div>
                <h3 className="text-2xl md:text-3xl font-serif font-semibold text-amber-400">Work & Career</h3>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
              <p className="text-white/80 leading-relaxed text-base md:text-lg">
                {WORK_LOVE_BY_SIGN[result.sign.name as keyof typeof WORK_LOVE_BY_SIGN]?.work}
              </p>
            </div>
            <div className="flex justify-center items-center gap-4 opacity-30">
              <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" className="text-amber-400" />
                <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1.5" className="text-amber-300" />
                <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" className="text-amber-200" />
                <path d="M50 5 L50 25 M50 75 L50 95 M5 50 L25 50 M75 50 L95 50" stroke="currentColor" strokeWidth="2" className="text-amber-400" />
                <circle cx="50" cy="50" r="8" fill="currentColor" className="text-amber-400" />
              </svg>
              <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
                <path d="M50 10 L65 40 L95 45 L72.5 67 L78 97 L50 82 L22 97 L27.5 67 L5 45 L35 40 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" className="text-amber-400/40" />
              </svg>
              <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
                <rect x="15" y="15" width="70" height="70" stroke="currentColor" strokeWidth="2" className="text-amber-400" transform="rotate(45 50 50)" />
                <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="1.5" className="text-amber-300" transform="rotate(45 50 50)" />
                <circle cx="50" cy="50" r="6" fill="currentColor" className="text-amber-400" />
              </svg>
            </div>
          </div>
        );
      
      case 3: // Love & Relationships
        return (
          <div className="flex flex-col justify-between h-[350px]">
            <div className="space-y-8">
              <div className="flex items-center gap-3 justify-center">
                <div className="text-4xl">💖</div>
                <h3 className="text-2xl md:text-3xl font-serif font-semibold text-pink-400">Love & Relationships</h3>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-pink-400/40 to-transparent" />
              <p className="text-white/80 leading-relaxed text-base md:text-lg">
                {WORK_LOVE_BY_SIGN[result.sign.name as keyof typeof WORK_LOVE_BY_SIGN]?.love}
              </p>
            </div>
            <div className="flex justify-center items-center gap-4 opacity-30">
              <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none">
                <path d="M50 85 C50 85, 20 60, 20 40 C20 25, 30 15, 42 15 C48 15, 50 20, 50 20 C50 20, 52 15, 58 15 C70 15, 80 25, 80 40 C80 60, 50 85, 50 85 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" className="text-pink-400/40" />
              </svg>
              <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
                <circle cx="35" cy="40" r="20" stroke="currentColor" strokeWidth="2" className="text-pink-400" />
                <circle cx="65" cy="40" r="20" stroke="currentColor" strokeWidth="2" className="text-pink-400" />
                <circle cx="50" cy="65" r="15" stroke="currentColor" strokeWidth="2" className="text-pink-300" />
                <path d="M35 40 L50 65 M65 40 L50 65" stroke="currentColor" strokeWidth="1.5" className="text-pink-300" />
              </svg>
              <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none">
                <path d="M50 20 L60 45 L85 50 L60 55 L50 80 L40 55 L15 50 L40 45 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" className="text-pink-400/40" />
              </svg>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-16 px-6">
      
      {/* BACK BUTTON */}
      {!isFlipping && (
        <button
          onClick={() => result ? handleReset() : router.push("/")}
          className="fixed top-8 left-8 flex items-center gap-2 text-white/70 hover:text-white transition z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {result ? "Calculate Again" : "Back"}
        </button>
      )}
      
      {/* INPUT CARD */}
      {!result && !isFlipping && (
        <div className="w-full max-w-4xl space-y-12 text-center">
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-amber-400 to-teal-400 bg-clip-text text-transparent">
              Discover Your <br /> Maya Spacetime Identity
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Enter your birth date to reveal your unique energetic signature in the Tzolk'in calendar — a 260-day sacred cycle that maps the rhythm of consciousness itself.
            </p>
          </div>

          <div className="w-full max-w-xl mx-auto rounded-2xl p-8 space-y-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="space-y-2">
              <label className="block text-lg font-semibold tracking-wide text-white-400">
                Your Date of Birth
              </label>
              <p className="text-sm text-white/60">
                This date anchors your position in Maya spacetime
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="bg-black/40 text-white border border-white/20 rounded-xl px-4 py-4 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-400/60 backdrop-blur-md [color-scheme:dark] appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27white%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.2em] bg-[right_0.5rem_center] bg-no-repeat"
              >
                <option value="">Month</option>
                {months.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>

              <input
                type="number"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="Day"
                min="1"
                max="31"
                className="bg-black/40 text-white border border-white/20 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-teal-400/60 backdrop-blur-md [color-scheme:dark] placeholder:text-white/40"
              />

              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Year"
                min="1900"
                max={currentYear}
                className="bg-black/40 text-white border border-white/20 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-teal-400/60 backdrop-blur-md [color-scheme:dark] placeholder:text-white/40"
              />
            </div>

            <button
              onClick={handleCalculate}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-teal-400 text-black font-semibold tracking-wide hover:scale-[1.02] active:scale-95 transition shadow-lg"
            >
              ✨ Reveal My Spacetime Signature
            </button>
          </div>

          <div className="flex justify-center gap-8 text-white/90 text-sm animate-in fade-in duration-700 delay-500">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌙</span>
              <span>20 Day Signs</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <span>13 Galactic Tones</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔮</span>
              <span>260 Sacred Days</span>
            </div>
          </div>
        </div>
      )}

      {/* CARD FLIP ANIMATION */}
      {isFlipping && !result && (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-950 via-slate-950 to-teal-950 z-50">
          <div className="animate-flip-card w-full max-w-xl h-96 rounded-2xl bg-gradient-to-br from-amber-400/20 to-teal-400/20 backdrop-blur-xl border-2 border-white/30 shadow-2xl flex items-center justify-center">
            <div className="text-6xl">✨</div>
          </div>
        </div>
      )}

      {/* CARD REVEAL */}
      {showReveal && result && (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-950 via-slate-950 to-teal-950 z-50">
          <div className="w-full max-w-xl h-96 rounded-2xl bg-gradient-to-br from-amber-400/20 to-teal-400/20 backdrop-blur-xl border-2 border-white/30 shadow-2xl flex flex-col items-center justify-center p-10 animate-in fade-in zoom-in duration-500 relative overflow-hidden">
            <div className="absolute top-8 left-12 text-amber-400 animate-pulse">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0l1.545 7.455L21 9l-7.455 1.545L12 18l-1.545-7.455L3 9l7.455-1.545L12 0z" />
              </svg>
            </div>
            <div className="absolute top-16 right-16 text-teal-400 animate-pulse" style={{animationDelay: '0.3s'}}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0l1.545 7.455L21 9l-7.455 1.545L12 18l-1.545-7.455L3 9l7.455-1.545L12 0z" />
              </svg>
            </div>
            <div className="absolute bottom-12 left-20 text-amber-300 animate-pulse" style={{animationDelay: '0.6s'}}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0l1.545 7.455L21 9l-7.455 1.545L12 18l-1.545-7.455L3 9l7.455-1.545L12 0z" />
              </svg>
            </div>
            <div className="absolute bottom-16 right-12 text-teal-300 animate-pulse" style={{animationDelay: '0.9s'}}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0l1.545 7.455L21 9l-7.455 1.545L12 18l-1.545-7.455L3 9l7.455-1.545L12 0z" />
              </svg>
            </div>
            
            <p className="text-white/60 text-sm uppercase tracking-widest mb-8">Your Maya Signature</p>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
              <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0l1.545 7.455L21 9l-7.455 1.545L12 18l-1.545-7.455L3 9l7.455-1.545L12 0z" />
              </svg>
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>
            </div>
            
            <h2 className="text-6xl font-serif font-bold bg-gradient-to-r from-amber-400 to-teal-400 bg-clip-text text-transparent mb-6 animate-in zoom-in duration-700 drop-shadow-[0_0_30px_rgba(251,191,36,0.3)]">
              {result.tone.name} · {result.sign.name}
            </h2>
            
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
              <svg className="w-3 h-3 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0l1.545 7.455L21 9l-7.455 1.545L12 18l-1.545-7.455L3 9l7.455-1.545L12 0z" />
              </svg>
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>
            </div>
            <button
              onClick={handleViewReading}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-teal-400 text-black font-semibold hover:scale-105 transition shadow-lg"
            >
              View Full Reading →
            </button>
          </div>
        </div>
      )}

      {/* PAGINATED READING CARD */}
      {showFullReading && result && (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-950 via-slate-950 to-teal-950 z-50 p-6">
          <div className="w-full max-w-4xl min-h-[600px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col relative">
            {/* Page Content */}
            <div className="flex-1 p-12 overflow-hidden">
              <div key={currentPage} className="animate-in fade-in slide-in-from-right-4 duration-500">
                {renderPageContent()}
              </div>
            </div>

            {/* Navigation */}
            <div className="p-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="px-6 py-2 rounded-lg bg-white/10 text-white font-semibold hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                ← Previous
              </button>
              
              <div className="flex gap-2">
                {[0, 1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-2 h-2 rounded-full transition ${
                      currentPage === page ? 'bg-amber-400 w-8' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === 3}
                className="px-6 py-2 rounded-lg bg-white/10 text-white font-semibold hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
