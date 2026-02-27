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
  const router = useRouter();

  const handleCalculate = () => {
    if (!day || !month || !year) return;
    const dateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const tzolkinResult = getTzolkinDate(dateString);
    setResult(tzolkinResult);
  };

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

  return (
    <div className="w-full flex flex-col items-center space-y-16 px-6">
      
      {/* BACK BUTTON */}
      <button
        onClick={() => router.push("/")}
        className="fixed top-8 left-8 flex items-center gap-2 text-white/70 hover:text-white transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      
      {/* INPUT CARD — SHOW ONLY IF NO RESULT */}
      {!result && (
        <div
          className="
            w-full max-w-xl
            rounded-2xl
            p-8
            space-y-6
            bg-white/5
            backdrop-blur-xl
            border border-white/10
            shadow-2xl
            text-center
            animate-in fade-in slide-in-from-bottom-4 duration-700
          "
        >
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
              className="
                bg-black/40
                text-white
                border border-white/20
                rounded-xl px-4 py-4 pr-10
                focus:outline-none
                focus:ring-2 focus:ring-teal-400/60
                backdrop-blur-md
                [color-scheme:dark]
                appearance-none
                bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27white%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')]
                bg-[length:1.2em] bg-[right_0.5rem_center] bg-no-repeat
              "
            >
              <option value="">Month</option>
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder="Day"
              min="1"
              max="31"
              className="
                bg-black/40
                text-white
                border border-white/20
                rounded-xl px-4 py-4
                focus:outline-none
                focus:ring-2 focus:ring-teal-400/60
                backdrop-blur-md
                [color-scheme:dark]
                placeholder:text-white/40
              "
            />

            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Year"
              min="1900"
              max={currentYear}
              className="
                bg-black/40
                text-white
                border border-white/20
                rounded-xl px-4 py-4
                focus:outline-none
                focus:ring-2 focus:ring-teal-400/60
                backdrop-blur-md
                [color-scheme:dark]
                placeholder:text-white/40
              "
            />
          </div>

          <button
            onClick={handleCalculate}
            className="
              w-full py-4 rounded-xl
              bg-gradient-to-r from-amber-400 to-teal-400
              text-black font-semibold tracking-wide
              hover:scale-[1.02]
              active:scale-95
              transition
              shadow-lg
            "
          >
            ✨ Reveal My Spacetime Signature
          </button>
        </div>
      )}

      {/* RESULT */}
      {result && (
        <div className="w-full flex flex-col items-center space-y-20">

          {/* CARD 1: QUICK IDENTITY */}
          <div
            className="
              w-full max-w-2xl
              rounded-2xl
              p-10
              space-y-8
              bg-white/5
              backdrop-blur-xl
              border border-white/10
              shadow-xl
              text-center
              animate-in fade-in slide-in-from-bottom-4 duration-700
            "
          >
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              Born on {new Date(`${year}-${month}-${day}`).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <h2 className="text-4xl font-serif font-bold bg-gradient-to-r from-amber-400 to-teal-400 bg-clip-text text-transparent">
              {result.tone.name} · {result.sign.name}
            </h2>

            <div className="space-y-6 text-left">
              <div>
                <h3 className="text-amber-400 font-semibold tracking-wide">
                  Galactic Tone — {result.tone.action}
                </h3>
                <p className="text-white/80">
                  {result.tone.personality.core}
                </p>
              </div>

              <div>
                <h3 className="text-teal-400 font-semibold tracking-wide">
                  Day Sign — {result.sign.archetype}
                </h3>
                <p className="text-white/80">
                  {result.sign.personality.essence}
                </p>
              </div>
            </div>
          </div>

          {/* CARD 2: COMPLETE PROFILE — WIDE */}
          <div
            className="
              w-full
              max-w-6xl
              rounded-2xl
              p-16
              space-y-12
              bg-gradient-to-b from-black/40 to-black/80
              backdrop-blur-xl
              border border-white/10
              shadow-2xl
            "
          >
            <div className="text-center space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                Mayan Spacetime Reading
              </p>
              <h3 className="text-4xl font-serif font-semibold text-white">
                Your Complete Profile
              </h3>
            </div>
<div className="flex justify-center">
  <div className="h-px w-40 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
</div>
<p className="text-white/90 text-xl">
  {highlightText(narrative?.intro || "", highlightRules)}
</p>

<p className="text-white/80 text-lg">
  {highlightText(narrative?.tone || "", highlightRules)}
</p>

<p className="text-white/80 text-lg">
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

          {/* CARD 3: WORK & LOVE */}
          <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
            {/* WORK CARD */}
            <div
              className="
                rounded-2xl
                p-10
                space-y-6
                bg-gradient-to-br from-amber-900/20 to-amber-950/40
                backdrop-blur-xl
                border border-amber-400/20
                shadow-xl
              "
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">💼</div>
                <h3 className="text-2xl font-serif font-semibold text-amber-400">Work & Career</h3>
              </div>
              <p className="text-white/80 leading-relaxed">
                {WORK_LOVE_BY_SIGN[result.sign.name as keyof typeof WORK_LOVE_BY_SIGN]?.work}
              </p>
            </div>

            {/* LOVE CARD */}
            <div
              className="
                rounded-2xl
                p-10
                space-y-6
                bg-gradient-to-br from-pink-900/20 to-purple-950/40
                backdrop-blur-xl
                border border-pink-400/20
                shadow-xl
              "
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">💖</div>
                <h3 className="text-2xl font-serif font-semibold text-pink-400">Love & Relationships</h3>
              </div>
              <p className="text-white/80 leading-relaxed">
                {WORK_LOVE_BY_SIGN[result.sign.name as keyof typeof WORK_LOVE_BY_SIGN]?.love}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}