import MayanCalculator from "@/components/MayanCalculator";

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-950 via-slate-950 to-teal-950 text-white px-6 py-24 flex justify-center relative overflow-hidden">
      <div className="relative z-10 w-full">
        <MayanCalculator />
      </div>
    </main>
  );
}