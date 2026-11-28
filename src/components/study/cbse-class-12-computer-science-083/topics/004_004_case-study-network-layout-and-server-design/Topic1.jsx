import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, Calculator, Table
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";
import pythonCode from "./topic1_files/cable_length_calculator_sim.py?raw";

export default function Topic1() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 1
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Data Tables &amp; Sizing
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                CBSE Code 083
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Analyzing Distance Matrices &amp; Computer Distribution Tables
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Master how to extract critical engineering decisions from examination tables. Calculate total cable requirements for Star vs Bus layouts, identify repeater threshold violations (&gt;100m), and determine the optimal Server location.
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
            Analyzing these two tables is just like planning water pipelines for a town: the <strong>Computer Count Table</strong> tells you where the greatest number of residents live (water demand)—that is where the main water reservoir (Server) must be built. The <strong>Distance Matrix Table</strong> gives you the exact road distances in meters: if a pipe to a distant neighborhood is longer than 100 meters, water pressure drops, meaning you must install an electric booster pump (Repeater) along that route!
          </p>
        </div>

        {/* 3. Deep-Dive Theory: Dual Table Analysis */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Table size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Sample CBSE Examination Tables</h2>
              <p className="text-xs text-slate-400">Authentic board examination problem tables and analytical derivation</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-900/60 border border-blue-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-blue-300">Table 1: Computer Counts</h3>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2">Wing / Block</th>
                    <th className="p-2">Number of Computers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr><td className="p-2">Admin Wing</td><td className="p-2 font-mono">30</td></tr>
                  <tr className="bg-emerald-950/40 text-emerald-300 font-bold">
                    <td className="p-2">Technical Wing</td>
                    <td className="p-2 font-mono">110 (MAXIMUM -&gt; SERVER)</td>
                  </tr>
                  <tr><td className="p-2">Finance Wing</td><td className="p-2 font-mono">25</td></tr>
                  <tr><td className="p-2">Academic Wing</td><td className="p-2 font-mono">45</td></tr>
                </tbody>
              </table>
            </div>

            <div className="p-5 bg-slate-900/60 border border-amber-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-amber-300">Table 2: Distance Matrix</h3>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2">Link Between Blocks</th>
                    <th className="p-2">Distance (Meters)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="bg-rose-950/40 text-rose-300 font-bold">
                    <td className="p-2">Admin &lt;-&gt; Technical</td>
                    <td className="p-2 font-mono">140 m (&gt;100m -&gt; Repeater)</td>
                  </tr>
                  <tr><td className="p-2">Admin &lt;-&gt; Finance</td><td className="p-2 font-mono">50 m</td></tr>
                  <tr><td className="p-2">Technical &lt;-&gt; Finance</td><td className="p-2 font-mono">85 m</td></tr>
                  <tr><td className="p-2">Academic &lt;-&gt; Technical</td><td className="p-2 font-mono">95 m</td></tr>
                  <tr><td className="p-2">Academic &lt;-&gt; Finance</td><td className="p-2 font-mono">60 m</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation Component */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Calculator size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Cable Length &amp; Topology Sizing Simulator</h2>
              <p className="text-xs text-slate-400">Compare Star layout cable meters vs Bus layout cable meters</p>
            </div>
          </div>
          <PythonFileLoader
            filename="cable_length_calculator_sim.py"
            code={pythonCode}
            description="Python simulation computing exact cable meterage for Star vs Bus topologies and identifying links exceeding 100 meters."
          />
        </div>

        {/* 5. Star vs Bus Cable Requirements Comparison Table */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">Topology Trade-Off Analysis: Star vs Bus</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                  <th className="p-3">Comparison Parameter</th>
                  <th className="p-3">Star Topology (From Server)</th>
                  <th className="p-3">Bus / Linear Topology</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Total Cable Meters</td>
                  <td className="p-3 text-amber-400 font-mono">320 meters (Higher cost)</td>
                  <td className="p-3 text-emerald-400 font-mono">195 meters (Lower cost)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Fault Tolerance</td>
                  <td className="p-3 text-emerald-400 font-bold">Excellent: Cable break isolates only one block</td>
                  <td className="p-3 text-rose-400 font-bold">Poor: Backbone break halts all campus blocks</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Central Server Access</td>
                  <td className="p-3 text-emerald-400">Direct dedicated point-to-point links</td>
                  <td className="p-3 text-amber-400">Shared multi-hop transit</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">CBSE Recommendation</td>
                  <td className="p-3 text-emerald-400 font-bold">HIGHLY RECOMMENDED for modern campuses</td>
                  <td className="p-3">Accepted if question explicitly asks to minimize cable length</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Step-by-Step Table Calculation Workflow */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white">Step-by-Step: Extracting Answers from the Tables</h2>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">1</span>
              <div>
                <strong className="text-white">Scan Computer Count First:</strong> Find the maximum value in Table 1 (e.g. 110 in Technical Wing). This is your Server location!
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">2</span>
              <div>
                <strong className="text-white">Filter Distances from Server:</strong> Find the distances connecting every other block directly to the Technical Wing (140m, 85m, 95m).
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">3</span>
              <div>
                <strong className="text-white">Check 100m Threshold:</strong> Scan all links: 140m &gt; 100m, meaning a <strong>Repeater</strong> must be placed on the Admin-Technical link!
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
            <li><strong>Misconception:</strong> Forgetting to sum cable lengths when the question asks: 'Calculate the total cable length for your suggested layout.' Always add up the numbers and specify the unit (meters).</li>
            <li><strong>Pitfall:</strong> Overlooking that distance tables are bidirectional: distance from Admin to Tech is the same as Tech to Admin.</li>
            <li><strong>Pitfall:</strong> Misreading meters as kilometers. If a question states 15 km, do NOT recommend UTP cable with 150 repeaters; recommend wireless or fiber optic!</li>
          </ul>
        </div>

        {/* 8. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="When answering the cable layout question, both Star topology (from the server) and Bus topology (connecting shortest adjacent links) are accepted by CBSE examiners. However, Star topology is preferred in real-world engineering because of fault isolation. Always compute and write the total meters clearly: e.g. 'Total cable required = 140m + 85m + 95m = 320 meters'."
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
          filename="cbse_class12_distance_and_computer_tables_notes.txt"
          title="Download Topic 1 Revision Notes"
        />

      </div>
    </div>
  );
}
