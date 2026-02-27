"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#0f1c1a] to-black text-white flex items-center justify-center px-6">
      <section className="max-w-4xl text-center space-y-10">
        
        <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight">
          Discover Your
          <span className="block bg-gradient-to-r from-amber-400 to-teal-400 bg-clip-text text-transparent">
            Maya Spacetime Identity
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/70 leading-relaxed">
          In the Maya worldview, your birth date is not random.  
          It carries a <span className="text-amber-400">Tone</span> and a
          <span className="text-teal-400"> Sign</span> —  
          a unique energetic signature that shapes how you think, feel, and move through life.
        </p>

        <button
          onClick={() => router.push("/calculator")}
          className="px-10 py-4 rounded-full bg-gradient-to-r from-amber-400 to-teal-400 
          text-black font-semibold text-lg shadow-lg hover:scale-105 transition"
        >
          🔍 Discover Your True Self
        </button>

        <p className="text-sm text-white/40 italic">
          Based on Maya Spacetime & Tzolkʼin Calendar
        </p>
      </section>
    </main>
  );
}