import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, Cable, Shield
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";
import pythonCode from "./topic6_files/media_selection_engine_sim.py?raw";

export default function Topic6() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 6
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Physical Layer Decision Matrix
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                CBSE Code 083
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Selecting Communication Medium: Fiber Optic vs Twisted Pair vs Wireless
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Master Sub-Question (d) regarding transmission medium selection. Evaluate distance, bandwidth, cost, and terrain parameters to choose between Cat6 UTP (economical &lt;100m), Fiber Optic (speed, &gt;100m, zero EMI), and Radio/Microwave/Satellite (wireless/hilly terrain).
            </p>
          </div>
        </div>

        {/* 2. Real-World Analogy */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
            <Zap size={18} />
            <span>Real-World Pedagogical Analogy</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Selecting communication media is like choosing transportation: if you are travelling 50 meters across a campus courtyard, walking on a paved footpath is cheap, fast, and sensible <strong>(Twisted Pair UTP)</strong>. If you need to transport thousands of tons of cargo at bullet-train speed without traffic jams, you build a high-speed maglev railway track <strong>(Fiber Optic Cable)</strong>. But if you must cross rugged Himalayan mountain peaks or deep ocean waters where laying tracks is impossible, you book an airplane or satellite link <strong>(Microwave / Satellite Wireless)</strong>!
          </p>
        </div>

        {/* 3. Deep-Dive Theory & Decision Rules */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Cable size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">The Media Decision Matrix for CBSE Exams</h2>
              <p className="text-xs text-slate-400">Exact technical justifications expected by CBSE marking schemes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-900/60 border border-blue-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-blue-300">1. Cat6 Twisted Pair (UTP)</h3>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li><strong>Best For:</strong> Minimum cost; short runs &lt;= 100 meters.</li>
                <li><strong>Speed:</strong> 1 Gbps to 10 Gbps.</li>
                <li><strong>Limitation:</strong> Attenuates past 100m; susceptible to EMI.</li>
                <li><strong>Justification:</strong> "Most economical choice for short intra-campus runs."</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-900/60 border border-emerald-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-emerald-300">2. Fiber Optic Cable</h3>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li><strong>Best For:</strong> Maximum speed; distances &gt; 100m; heavy noise.</li>
                <li><strong>Speed:</strong> 10 Gbps to 100+ Gbps.</li>
                <li><strong>Advantage:</strong> Zero EMI (uses light); spans kilometers without repeaters.</li>
                <li><strong>Justification:</strong> "Highest bandwidth, future-proof, and immunity to interference."</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-900/60 border border-purple-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-purple-300">3. Radio / Microwave / Satellite</h3>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li><strong>Best For:</strong> Hilly terrain, road crossings, distant cities.</li>
                <li><strong>Speed:</strong> High (Microwave) / Moderate (Satellite).</li>
                <li><strong>Advantage:</strong> No physical trenching or cables required.</li>
                <li><strong>Justification:</strong> "Overcomes rough terrain and geographical barriers without trenching."</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation Component */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Shield size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Media Selection Decision Engine</h2>
              <p className="text-xs text-slate-400">Evaluate distance, budget, speed, and terrain to pick optimal media</p>
            </div>
          </div>
          <PythonFileLoader
            filename="media_selection_engine_sim.py"
            code={pythonCode}
            description="Python algorithmic rule engine selecting the optimal transmission medium based on examination constraints."
          />
        </div>

        {/* 5. Comprehensive Comparison Table */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">Comparative Matrix: Transmission Media Characteristics</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                  <th className="p-3">Characteristic</th>
                  <th className="p-3">Twisted Pair (UTP)</th>
                  <th className="p-3">Fiber Optic Cable</th>
                  <th className="p-3">Radio / Microwave / Satellite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Cost</td>
                  <td className="p-3 text-emerald-400 font-bold">Lowest / Very Economical</td>
                  <td className="p-3 text-amber-400">Moderate to High</td>
                  <td className="p-3 text-rose-400">High equipment &amp; satellite bandwidth fees</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Max Distance without Repeater</td>
                  <td className="p-3 text-rose-400 font-mono">100 meters</td>
                  <td className="p-3 text-emerald-400 font-mono">2 km to 10+ km</td>
                  <td className="p-3 text-emerald-400 font-mono">Line-of-sight (40-50 km) / Global</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">EMI / Noise Immunity</td>
                  <td className="p-3 text-rose-400">Susceptible</td>
                  <td className="p-3 text-emerald-400 font-bold">100% Immune (Uses Light)</td>
                  <td className="p-3 text-amber-400">Subject to rain fade / atmospheric noise</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Bandwidth Capacity</td>
                  <td className="p-3">Up to 1-10 Gbps</td>
                  <td className="p-3 text-emerald-400 font-bold">Virtually Unlimited (Tbps)</td>
                  <td className="p-3">Moderate to High</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Step-by-Step Decision Flowchart */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white">Step-by-Step: Decision Rules for Examination Questions</h2>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">1</span>
              <div>
                <strong className="text-white">If question specifies 'Minimum Cost':</strong> Recommend <strong>Twisted Pair (Cat6 UTP) Cable</strong> for links under 100 meters.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">2</span>
              <div>
                <strong className="text-white">If question specifies 'Fastest / High Speed':</strong> Recommend <strong>Fiber Optic Cable</strong>. Explain that it provides maximum bandwidth and avoids repeaters.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">3</span>
              <div>
                <strong className="text-white">If question specifies 'Hilly Terrain / Highway Crossing':</strong> Recommend <strong>Radio Waves / Microwave / Satellite</strong>. Explain that unguided media avoids digging through obstacles.
              </div>
            </div>
          </div>
        </div>

        {/* 7. Common Pitfalls & Misconceptions */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertTriangle size={18} />
            <span>Common Board Examination Pitfalls &amp; Misconceptions</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
            <li><strong>Misconception:</strong> Recommending Fiber Optic as 'economical'. Fiber is NOT the cheapest; Twisted Pair is the economical choice.</li>
            <li><strong>Pitfall:</strong> Recommending UTP for a 150-meter run without mentioning a repeater. If you suggest UTP for &gt;100m, you MUST state a repeater is needed, or simply recommend Fiber Optic.</li>
            <li><strong>Pitfall:</strong> Suggesting Bluetooth or Infrared for connecting buildings. Bluetooth spans only 10 meters; Infrared cannot penetrate walls!</li>
          </ul>
        </div>

        {/* 8. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="When asked to suggest a transmission medium, read the exact wording of the question: If it asks for 'High Speed & Efficiency', write 'Fiber Optic Cable because of maximum bandwidth and immunity to noise.' If it asks for 'Cost-effectiveness / Low Cost', write 'Twisted Pair (Cat6 UTP) Cable because it is highly economical for short distances.' Giving the medium with its specific justification secures the full 1 mark!"
        />

        {/* 9. CBSE Board Examination Practice & FAQs */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <HelpCircle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Practice &amp; FAQs</h2>
              <p className="text-xs text-slate-400">25 Authentic Questions with Complete Explanations &amp; Hints</p>
            </div>
          </div>
          <FAQTemplate questions={questions} />
        </div>

        {/* 10. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_media_selection_notes.txt"
          title="Download Topic 6 Revision Notes"
        />

      </div>
    </div>
  );
}
