import React from 'react';
import {
  Layers, CheckCircle2, AlertTriangle, HelpCircle,
  Cpu, ArrowRight, Zap, Scale, Award, ShieldCheck, Check
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";
import pythonCode from "./topic10_files/transmission_media_selection_engine.py?raw";

export default function Topic10() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 10
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Architectural Decision Mastery
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Comparative Analysis of Transmission Media for Campus &amp; Long-Distance Connectivity
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Consolidate all guided and unguided communication media. Master the decision rules tested in CBSE 5-mark Case Studies: cost, bandwidth, distance thresholds, terrain obstacles, EMI noise, and security requirements to pick the winning medium every time.
            </p>
          </div>
        </div>

        {/* 2. Comprehensive Comparison Table */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Scale size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Master Comparison Matrix Across All Media</h2>
              <p className="text-xs text-slate-400">Essential CBSE examination reference table for Unit II</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                  <th className="py-3 px-4 font-semibold">Medium</th>
                  <th className="py-3 px-4 font-semibold">Category</th>
                  <th className="py-3 px-4 font-semibold">Data Rate</th>
                  <th className="py-3 px-4 font-semibold">Max Segment / Reach</th>
                  <th className="py-3 px-4 font-semibold">EMI Immunity</th>
                  <th className="py-3 px-4 font-semibold">Relative Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-blue-400">Twisted Pair (UTP)</td>
                  <td className="py-3 px-4">Guided</td>
                  <td className="py-3 px-4">100 Mbps - 1 Gbps</td>
                  <td className="py-3 px-4">100 meters</td>
                  <td className="py-3 px-4">Moderate</td>
                  <td className="py-3 px-4 text-emerald-400">Lowest (Very Cheap)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-blue-400">Shielded TP (STP)</td>
                  <td className="py-3 px-4">Guided</td>
                  <td className="py-3 px-4">1 Gbps - 10 Gbps</td>
                  <td className="py-3 px-4">100 meters</td>
                  <td className="py-3 px-4">Very High</td>
                  <td className="py-3 px-4">Moderate</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-blue-400">Coaxial Cable</td>
                  <td className="py-3 px-4">Guided</td>
                  <td className="py-3 px-4">10 Mbps - 100 Mbps</td>
                  <td className="py-3 px-4">185m - 500m</td>
                  <td className="py-3 px-4">High</td>
                  <td className="py-3 px-4">Moderate</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400">Optical Fiber</td>
                  <td className="py-3 px-4">Guided</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">1 Gbps - 100+ Tbps</td>
                  <td className="py-3 px-4">2 km to 100+ km</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">100% (Immune)</td>
                  <td className="py-3 px-4 text-rose-400">High (Installation)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-400">Radio Waves</td>
                  <td className="py-3 px-4">Unguided</td>
                  <td className="py-3 px-4">1 Mbps - 100 Mbps</td>
                  <td className="py-3 px-4">Omnidirectional / City</td>
                  <td className="py-3 px-4 text-rose-400">Prone to interference</td>
                  <td className="py-3 px-4">Moderate (Licensing)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-400">Microwaves</td>
                  <td className="py-3 px-4">Unguided</td>
                  <td className="py-3 px-4">100 Mbps - 10 Gbps</td>
                  <td className="py-3 px-4">40 - 50 km (Line of Sight)</td>
                  <td className="py-3 px-4 text-amber-400">Rain fade sensitive</td>
                  <td className="py-3 px-4">Tower Infrastructure</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-400">Satellite Link</td>
                  <td className="py-3 px-4">Unguided</td>
                  <td className="py-3 px-4">10 Mbps - 1 Gbps</td>
                  <td className="py-3 px-4">Global (High Latency)</td>
                  <td className="py-3 px-4 text-amber-400">Rain fade / Delay</td>
                  <td className="py-3 px-4 text-rose-400">Highest (Spacecraft)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. The 4 Golden CBSE Case Study Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-bold">
              <CheckCircle2 size={20} />
              <span>Rule 1: Under 100m within Same Building</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Always suggest <strong className="text-white">Twisted Pair (Cat-6 UTP) with RJ-45</strong>. Justify with low cost, flexibility, and sufficient speed without repeaters.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 size={20} />
              <span>Rule 2: Between Campus Buildings (100m - 5km)</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Always suggest <strong className="text-white">Optical Fiber Cable</strong>. Justify with multi-gigabit throughput, low signal loss over distance, and immunity to outdoor electrical noise/lightning.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <CheckCircle2 size={20} />
              <span>Rule 3: Rugged Terrain / River Crossing (5 - 30km)</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Suggest <strong className="text-white">Terrestrial Microwave Link</strong>. Justify with elimination of physical cabling permissions across public roads or rivers, providing direct line-of-sight data flow.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-purple-400 font-bold">
              <CheckCircle2 size={20} />
              <span>Rule 4: Remote Island / Mining Camp (> 100km)</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Suggest <strong className="text-white">Satellite Communication (VSAT)</strong>. Justify with ubiquitous worldwide reach independent of terrestrial terrain, wire lines, or cellular towers.
            </p>
          </div>
        </div>

        {/* 4. Python Laboratory Experiment */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Cpu size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Laboratory Simulation: Automated Case-Study Recommendation Engine</h2>
              <p className="text-xs text-slate-400">Execute the decision engine to evaluate multi-building campus layouts and long-distance links</p>
            </div>
          </div>
          <PythonFileLoader
            code={pythonCode}
            filename="transmission_media_selection_engine.py"
          />
        </div>

        {/* 5. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In Section D of the Class 12 board paper (the 5-mark Case Study), Question (b) almost always asks: 'Suggest the most suitable cable/medium to connect Block A and Block B'. Memorize the distance rule: if distance is <= 100m, write 'Cat-6 UTP cable (economical)'; if distance > 100m (e.g. 250m, 1.2km), write 'Optical Fiber Cable (high speed, immune to noise)'. You will score 100% full marks!"
        />

        {/* 6. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_media_comparative_analysis.txt"
          title="Download Topic 10 Comparative Analysis Revision Notes"
        />

        {/* 7. CBSE Board Examination Practice & FAQs */}
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

      </div>
    </div>
  );
}