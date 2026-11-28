import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, Network, GitBranch
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";
import pythonCode from "./topic3_files/topology_layout_designer_sim.py?raw";

export default function Topic3() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 3
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Cable Layout Engineering
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                CBSE Code 083
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Optimal Cable Layout Design: Star vs Bus Topology Minimizing Cable Length
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Master Sub-Question (b) of the 4-mark case study. Compare Star Topology (point-to-point links from server, high fault isolation) with Bus/Tree Topology (shortest adjacent connections, minimum cable expenditure), and learn how to sketch perfect scoring diagrams.
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
            Think of connecting airport shuttle buses: under a <strong>Star Layout</strong>, every passenger terminal has its own dedicated express highway directly to the Central Airport Hub. If one highway is closed for repairs, only that one terminal is affected; all others continue flying. Under a <strong>Bus Layout</strong>, a single shared highway winds through Terminal 1, then Terminal 2, then Terminal 3. It uses fewer miles of asphalt, but if a bridge collapses between Terminals 1 and 2, the entire airport network is paralyzed!
          </p>
        </div>

        {/* 3. Deep-Dive Theory & Layout Schematics */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Network size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Visualizing the Two Approved Topologies</h2>
              <p className="text-xs text-slate-400">Examination drawing conventions and comparative trade-offs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-900/60 border border-emerald-500/30 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 size={18} />
                <h3>1. Star Topology (Recommended)</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connects each block directly to the central Server block via dedicated point-to-point cables.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-300 whitespace-pre">
                {"   [Admin] <== (60m) ==> [Technical] <== (85m) ==> [Finance]\n                           (SERVER)\n                              ||\n                           (95m)\n                              ||\n                              \\/\n                          [Academic]"}
              </div>
              <p className="text-[11px] text-slate-400">Total Cable: 60m + 85m + 95m = <strong>240 meters</strong></p>
            </div>

            <div className="p-5 bg-slate-900/60 border border-blue-500/30 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold">
                <GitBranch size={18} />
                <h3>2. Bus Topology (Minimum Cable)</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connects blocks sequentially along the shortest adjacent links (Minimum Spanning Tree).
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-blue-300 whitespace-pre">
                {"[Admin] --(50m)--> [Finance] --(60m)--> [Academic] --(85m)--> [Technical]\n                                                               (SERVER)"}
              </div>
              <p className="text-[11px] text-slate-400">Total Cable: 50m + 60m + 85m = <strong>195 meters</strong></p>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation Component */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Network size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Topology Layout Designer Simulator</h2>
              <p className="text-xs text-slate-400">Generate architectural cable reports and compare total meterage</p>
            </div>
          </div>
          <PythonFileLoader
            filename="topology_layout_designer_sim.py"
            code={pythonCode}
            description="Python simulation generating ASCII topology schematics and computing exact cable length comparisons."
          />
        </div>

        {/* 5. Comprehensive Comparison Table */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">Comparative Matrix: Star Layout vs Bus Layout</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                  <th className="p-3">Design Parameter</th>
                  <th className="p-3">Star Layout (from Server)</th>
                  <th className="p-3">Bus / Tree Layout</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Cable Meterage Required</td>
                  <td className="p-3 text-amber-400 font-mono">Higher (e.g. 240 m)</td>
                  <td className="p-3 text-emerald-400 font-mono">Lowest (e.g. 195 m)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Fault Tolerance</td>
                  <td className="p-3 text-emerald-400 font-bold">High: Cable cut isolates only one block</td>
                  <td className="p-3 text-rose-400 font-bold">Low: Cut halts downstream blocks</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Troubleshooting Ease</td>
                  <td className="p-3 text-emerald-400">Simple: Dedicated switch ports per building</td>
                  <td className="p-3 text-rose-400">Difficult: Must isolate along linear bus</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">CBSE Exam Acceptance</td>
                  <td className="p-3 text-emerald-400 font-bold">100% Accepted (Full Credit)</td>
                  <td className="p-3 text-emerald-400 font-bold">100% Accepted (Full Credit)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Step-by-Step Drawing Guide */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white">Step-by-Step: How to Draw the Layout for 1.0 Mark</h2>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">1</span>
              <div>
                <strong className="text-white">Draw Labeled Boxes:</strong> Draw a clean rectangle for each building: <code>[Admin]</code>, <code>[Technical (SERVER)]</code>, <code>[Finance]</code>, <code>[Academic]</code>.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">2</span>
              <div>
                <strong className="text-white">Draw Connecting Lines:</strong> Draw straight lines connecting the blocks according to your chosen topology (Star or Bus).
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">3</span>
              <div>
                <strong className="text-white">Annotate Distances &amp; Sum:</strong> Label the distance in meters on each line and write the total: <code>Total cable required = 60m + 85m + 95m = 240 meters</code>.
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
            <li><strong>Pitfall:</strong> Forgetting to mark the Server block on the diagram. Always write <code>(SERVER)</code> inside the designated server block!</li>
            <li><strong>Pitfall:</strong> Drawing a closed loop (Ring). Connecting all blocks in a full circle can create broadcast storms unless managed by STP. Stick to Star or Bus.</li>
            <li><strong>Pitfall:</strong> Leaving out one of the blocks. Ensure all N blocks mentioned in the question appear in your diagram.</li>
          </ul>
        </div>

        {/* 8. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In your board examination, draw a clean Star Topology with the Server block at the center. State clearly: 'Star Topology is recommended because it provides dedicated bandwidth and ensures that a cable break in one block does not affect communication in any other block. Total cable length = [Sum of lengths] meters.' This guarantees full marks!"
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
          filename="cbse_class12_cable_layout_notes.txt"
          title="Download Topic 3 Revision Notes"
        />

      </div>
    </div>
  );
}
