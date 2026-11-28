import React from 'react';
import {
  Share2, AlertTriangle, HelpCircle, Layers,
  Cpu, CheckCircle2, ArrowRight, Zap, ShieldCheck, ShieldAlert
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";
import pythonCode from "./topic10_files/star_topology_fault_isolation_lab.py?raw";

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
                Universal Enterprise Topology
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Star Topology: Central Switch, Fault Isolation &amp; Scalability
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Explore the universal standard layout of modern local area networks. Master how dedicated point-to-point links radiate from a central switch, why a single cable break never halts the rest of the network, the central point of failure vulnerability, and case-study layout calculations in CBSE exams.
            </p>
          </div>
        </div>

        {/* 2. Core Concepts: The Star Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Share2 size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Dedicated Point-to-Point</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every computer has its <strong className="text-white">own private cable run</strong> connecting directly to the central switch, avoiding any shared electrical medium.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Superb Fault Isolation</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              If an individual workstation's cable breaks or becomes disconnected, <strong className="text-white">only that one node goes offline</strong>. The rest of the network operates seamlessly.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <ShieldAlert size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Central Point of Failure</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              The entire network depends on the central controller. If the <strong className="text-white">central switch or its power supply fails</strong>, the entire network goes down.
            </p>
          </div>
        </div>

        {/* 3. Advantages vs Disadvantages */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Layers size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Evaluation: Advantages vs Disadvantages of Star Topology</h2>
              <p className="text-xs text-slate-400">High-frequency comparison topic in board examination papers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-emerald-500/20 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 size={18} />
                <span>Advantages of Star Topology</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong className="text-white">Fault Isolation:</strong> A single cable break disables only that single workstation.</li>
                <li><strong className="text-white">High Scalability:</strong> New nodes can be plugged into available switch ports at any time with zero network downtime.</li>
                <li><strong className="text-white">Easy Troubleshooting:</strong> Status LEDs on switch ports pinpoint disconnected or malfunctioning lines immediately.</li>
                <li><strong className="text-white">High Performance:</strong> When paired with an intelligent switch, every node enjoys dedicated line-rate bandwidth with zero collisions.</li>
              </ul>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-rose-500/20 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <AlertTriangle size={18} />
                <span>Disadvantages of Star Topology</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong className="text-white">Central Point of Failure:</strong> If the central switch fails, all connected computers lose network communication.</li>
                <li><strong className="text-white">Higher Cable Consumption:</strong> Consumes substantially more physical cable than Bus topology because separate wires run from the center to every device.</li>
                <li><strong className="text-white">Higher Hardware Cost:</strong> Requires investing in central connecting equipment (switches/patch panels).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Common CBSE Traps */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Traps: Case Study Topology Selection</h2>
              <p className="text-xs text-amber-400/80">Frequently tested 1-mark question in Section D case studies</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: Star vs Bus for building layout</p>
              <p className="text-slate-400">
                In 95% of CBSE Case Study questions asking: <strong className="text-white">"Suggest the most suitable topology to connect all the computers in the new department/building."</strong> The board-preferred answer is: <strong className="text-white">Star Topology</strong>!
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: Cable length calculation</p>
              <p className="text-slate-400">
                If the question asks: <strong className="text-white">"Suggest a topology that requires the minimum cable length"</strong>, only then write <strong className="text-white">Bus Topology</strong>. Otherwise, default to <strong className="text-white">Star</strong>!
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
              <h2 className="text-xl font-bold text-white">Laboratory Simulation: Star Fault Isolation &amp; Cable Length Modeling</h2>
              <p className="text-xs text-slate-400">Trace point-to-point communication, isolate cable cuts, and model central switch power failures</p>
            </div>
          </div>
          <PythonFileLoader
            code={pythonCode}
            filename="star_topology_fault_isolation_lab.py"
          />
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In Section D 5-mark Case Studies, Question (a) often asks to draw the cable layout or name the topology. Always write 'Star Topology'. For the drawing, place the central switch in the middle (or in the server room) and draw straight lines radiating outward to each computer or block. Examiners award full marks for this clean diagram!"
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_star_topology_notes.txt"
          title="Download Topic 10 Star Topology Revision Notes"
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