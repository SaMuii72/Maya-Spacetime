"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-950 via-slate-950 to-teal-950 text-white flex items-center justify-center px-6 relative overflow-hidden">
      <section className="max-w-4xl text-center space-y-10 relative z-10">
        
        {/* Brand Tagline */}
        <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-amber-400 to-teal-400 bg-clip-text text-transparent">
            LifeForCode
          </h1>
          <p className="text-xl md:text-2xl text-white/70 italic">
            Your life has a code. Let's decode it.
          </p>
        </div>
        
        <p className="text-lg md:text-xl text-white/70 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          In the Maya worldview, your birth date is not random.  
          It carries a <span className="text-amber-400">Tone</span> and a
          <span className="text-teal-400"> Sign</span> —  
          a unique energetic signature that shapes how you think, feel, and move through life.
        </p>

        <button
          onClick={() => router.push("/calculator")}
          className="px-10 py-4 rounded-full bg-gradient-to-r from-amber-400 to-teal-400 
          text-black font-semibold text-lg shadow-lg hover:scale-105 transition animate-in fade-in zoom-in duration-700 delay-300"
        >
          🔍 Discover Your True Self
        </button>

        <p className="text-sm text-white/40 italic animate-in fade-in duration-700 delay-500">
          Based on Maya Spacetime & Tzolkʼin Calendar
        </p>
      </section>
    </main>
  );
}