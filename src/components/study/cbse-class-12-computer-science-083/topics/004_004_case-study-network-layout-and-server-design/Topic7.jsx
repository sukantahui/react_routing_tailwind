import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, Mountain, Globe2
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";
import pythonCode from "./topic7_files/remote_branch_wan_sim.py?raw";

export default function Topic7() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 7
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                Remote Branch Connectivity
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                CBSE Code 083
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Connecting Remote Branches: Hilly Terrain, City-to-City &amp; Global Links
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Master Sub-Question (d) addressing difficult geographical scenarios. Learn why Radio Waves, Microwave, and Satellite links are mandatory for hilly or mountainous terrains, understand MAN vs WAN classifications, and formulate model answers for video conferencing setups.
            </p>
          </div>
        </div>

        {/* 2. Real-World Analogy */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
            <Zap size={18} />
            <span>Real-World Pedagogical Analogy</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Imagine building a postal transport route between two towns: on flat plains, you simply lay asphalt roads and drive delivery vans. But if a steep mountain range with snowy peaks and landslide-prone cliffs separates the towns, paving a continuous highway is nearly impossible and dangerous. Instead, you launch a helicopter delivery line that flies over the mountains straight to the destination without touching the rocky cliffs. That helicopter flight is exactly what <strong>Microwave and Satellite links</strong> do for network data across rough terrain!
          </p>
        </div>

        {/* 3. Deep-Dive Theory: The Three Remote Scenarios */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
              <Mountain size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">The Three Core Remote Scenarios in Board Exams</h2>
              <p className="text-xs text-slate-400">Standard geographical problem setups and official marking keys</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-900/60 border border-amber-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-amber-400">Scenario 1: Hilly Terrain</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Branch located in a mountainous area (e.g. Shimla, Ooty, Darjeeling).
              </p>
              <div className="text-xs text-emerald-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <strong>Recommended:</strong> Radio Wave / Microwave / Satellite.<br/>
                <strong>Reason:</strong> Trenching cables is vulnerable to landslides and cost-prohibitive.
              </div>
            </div>

            <div className="p-5 bg-slate-900/60 border border-blue-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-blue-400">Scenario 2: Across a City (MAN)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Branch located 10 to 40 km away in the same city or metropolitan area.
              </p>
              <div className="text-xs text-emerald-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <strong>Recommended:</strong> Metro Leased Line / Fiber Optic.<br/>
                <strong>Classification:</strong> MAN (Metropolitan Area Network).
              </div>
            </div>

            <div className="p-5 bg-slate-900/60 border border-purple-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-purple-400">Scenario 3: Distant City / Global (WAN)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Branch in another state (e.g. 1,400 km) or another continent (e.g. London).
              </p>
              <div className="text-xs text-emerald-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <strong>Recommended:</strong> Satellite Link / Leased Lines / VPN.<br/>
                <strong>Classification:</strong> WAN (Wide Area Network).
              </div>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation Component */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Globe2 size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Remote Branch WAN Link Selector</h2>
              <p className="text-xs text-slate-400">Evaluate distance and terrain constraints to pick optimal WAN media</p>
            </div>
          </div>
          <PythonFileLoader
            filename="remote_branch_wan_sim.py"
            code={pythonCode}
            description="Python simulation evaluating geographical parameters, assigning network classifications (MAN/WAN), and suggesting WAN technologies."
          />
        </div>

        {/* 5. Golden Answer Template Box */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">CBSE Board Exam Golden Answer Templates</h2>
          <div className="space-y-4 text-xs leading-relaxed">
            <div className="p-4 bg-slate-900/80 border border-amber-500/30 rounded-xl space-y-2">
              <span className="text-amber-400 font-bold uppercase tracking-wider">Hilly Region Question Template:</span>
              <p className="text-slate-200 font-mono bg-slate-950 p-3 rounded-lg border border-slate-800">
                "<strong>Technology:</strong> Radio Wave / Microwave transmission (or Satellite communication).<br/><br/>
                <strong>Reason:</strong> In a hilly region, physical cable trenching is extremely difficult, cost-prohibitive, and vulnerable to frequent physical breaks from landslides and soil erosion. Wireless transmission travels unobstructed through the air, providing reliable line-of-sight communication."
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 border border-blue-500/30 rounded-xl space-y-2">
              <span className="text-blue-400 font-bold uppercase tracking-wider">Video Conferencing Question Template:</span>
              <p className="text-slate-200 font-mono bg-slate-950 p-3 rounded-lg border border-slate-800">
                "<strong>Hardware:</strong> High-definition webcams, noise-canceling microphones, speakers, and display screens.<br/>
                <strong>Protocol / Software:</strong> VoIP (Voice over IP) / SIP protocol, and video conferencing applications like Zoom, Microsoft Teams, or Google Meet with high broadband bandwidth."
              </p>
            </div>
          </div>
        </div>

        {/* 6. Common Pitfalls & Misconceptions */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertTriangle size={18} />
            <span>Common Board Examination Pitfalls &amp; Misconceptions</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
            <li><strong>Misconception:</strong> Recommending physical cables across a hilly mountain range. Laying cables on mountains is impractical; always recommend <strong>Radio Wave, Microwave, or Satellite</strong>.</li>
            <li><strong>Pitfall:</strong> Forgetting the reason. If you state 'Satellite' without explaining 'due to hilly terrain making cabling impossible', you lose 0.5 marks!</li>
            <li><strong>Pitfall:</strong> Recommending Bluetooth or Wi-Fi for connecting branches separated by 15 km or 500 km. Bluetooth spans 10m; standard Wi-Fi spans ~50m. Use Microwave, Leased Line, or Satellite for kilometers.</li>
          </ul>
        </div>

        {/* 7. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="Sub-Question (d) is where examiners test applied knowledge of geographic constraints. If you see the word 'hilly area' or 'mountainous terrain', your answer is immediately 'Radio Wave / Microwave / Satellite because laying cables is physically difficult and vulnerable to landslides.' If it asks about connecting branches 1000 km away, write 'Satellite / Leased lines (WAN).' You are guaranteed full marks!"
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

        {/* 9. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_remote_branch_notes.txt"
          title="Download Topic 7 Revision Notes"
        />

      </div>
    </div>
  );
}
