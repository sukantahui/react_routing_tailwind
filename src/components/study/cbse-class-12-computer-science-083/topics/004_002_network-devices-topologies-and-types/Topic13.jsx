import React from 'react';
import {
  Globe, Building, Home, Smartphone, CheckCircle2,
  AlertTriangle, HelpCircle, Layers, ArrowRight, Zap, ShieldCheck
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";
import pythonCode from "./topic13_files/network_geographical_classification_engine.py?raw";

export default function Topic13() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 13
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Geographical Classification
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Network Classification by Geographical Spread: PAN, LAN, MAN &amp; WAN
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Master the universal taxonomy of computer networks based on physical scale. Compare Personal Area Networks (PAN), Local Area Networks (LAN), Metropolitan Area Networks (MAN), and Wide Area Networks (WAN) on distance thresholds, ownership, speed, and error rates in CBSE board exams.
            </p>
          </div>
        </div>

        {/* 2. Core Concepts: The 4 Geographic Scales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Smartphone size={22} />
            </div>
            <h3 className="text-base font-bold text-white">PAN (&lt; 10 Meters)</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Personal Area Network. Centered around a single individual (Bluetooth headphones, smartwatch, phone hotspot).
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Home size={22} />
            </div>
            <h3 className="text-base font-bold text-white">LAN (&lt; 1 - 2 km)</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Local Area Network. Single room, office, or school campus. Privately owned, highest speed, lowest error rate.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Building size={22} />
            </div>
            <h3 className="text-base font-bold text-white">MAN (&lt; 50 km)</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Metropolitan Area Network. Spans an entire city or municipal town (cable TV networks, city traffic camera grids).
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Globe size={22} />
            </div>
            <h3 className="text-base font-bold text-white">WAN (&gt; 50 km / Global)</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Wide Area Network. Spans countries and continents via subsea fiber and satellites. Prime example: The Internet.
            </p>
          </div>
        </div>

        {/* 3. Master Comparison Table */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Layers size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Master CBSE Technical Comparison: PAN vs LAN vs MAN vs WAN</h2>
              <p className="text-xs text-slate-400">Comprehensive summary matrix tested frequently in board examinations</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                  <th className="py-3 px-4 font-semibold">Parameter</th>
                  <th className="py-3 px-4 font-semibold text-blue-400">PAN</th>
                  <th className="py-3 px-4 font-semibold text-emerald-400">LAN</th>
                  <th className="py-3 px-4 font-semibold text-purple-400">MAN</th>
                  <th className="py-3 px-4 font-semibold text-amber-400">WAN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Geographic Reach</td>
                  <td className="py-3 px-4">Under 10 meters</td>
                  <td className="py-3 px-4">Up to 1 - 2 kilometers</td>
                  <td className="py-3 px-4">Up to 50 km (City)</td>
                  <td className="py-3 px-4">Country / Continental / Global</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Data Transfer Speed</td>
                  <td className="py-3 px-4">Low (few Mbps)</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">Highest (1 Gbps - 10 Gbps)</td>
                  <td className="py-3 px-4">High (100 Mbps - 1 Gbps)</td>
                  <td className="py-3 px-4">Variable / Moderate</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Error Rate</td>
                  <td className="py-3 px-4">Very Low</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">Lowest (Controlled environment)</td>
                  <td className="py-3 px-4">Moderate</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">Highest (Long-distance noise)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Ownership &amp; Control</td>
                  <td className="py-3 px-4">Single Individual</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">Single Enterprise / School</td>
                  <td className="py-3 px-4">Consortium / Municipal Govt</td>
                  <td className="py-3 px-4">Multiple Telcos &amp; ISPs</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Classic Real Example</td>
                  <td className="py-3 px-4">Bluetooth Headphones</td>
                  <td className="py-3 px-4">School Computer Lab</td>
                  <td className="py-3 px-4">City Cable TV Network</td>
                  <td className="py-3 px-4">The Global INTERNET</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Common CBSE Traps */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Traps: Classification by Distance</h2>
              <p className="text-xs text-amber-400/80">Frequently tested 1-mark question in Section A</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: Connecting two bank branches across the city</p>
              <p className="text-slate-400">
                If the question asks: <strong className="text-white">"State the type of network formed when branches of a bank situated across different locations in Mumbai are interconnected."</strong> The answer is: <strong className="text-white">MAN (Metropolitan Area Network)</strong>!
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: Connecting computers inside a school campus</p>
              <p className="text-slate-400">
                A school campus spanning 500 meters or 1 km is strictly a <strong className="text-white">LAN (Local Area Network)</strong>. Do NOT write MAN or WAN!
              </p>
            </div>
          </div>
        </div>

        {/* 5. Python Laboratory Experiment */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Cpu size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Laboratory Simulation: Geographical Network Classifier</h2>
              <p className="text-xs text-slate-400">Run this interactive decision engine to classify networks based on distances and ownership</p>
            </div>
          </div>
          <PythonFileLoader
            code={pythonCode}
            filename="network_geographical_classification_engine.py"
          />
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In Section D 5-mark Case Studies, Question (e) frequently asks: 'Identify the type of network formed if the school connects its Delhi campus with its branch in Bangalore'. Distance spans hundreds of kilometers across states, so write 'WAN (Wide Area Network)'. If it says inside the campus, write 'LAN'!"
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_pan_lan_man_wan_notes.txt"
          title="Download Topic 13 PAN LAN MAN WAN Revision Notes"
        />

        {/* 8. CBSE Board Examination Practice & FAQs */}
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