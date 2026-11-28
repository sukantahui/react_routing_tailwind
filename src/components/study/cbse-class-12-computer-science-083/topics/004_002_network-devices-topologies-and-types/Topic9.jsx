import React from 'react';
import {
  GitCommit, AlertTriangle, HelpCircle, Layers,
  Cpu, CheckCircle2, ArrowRight, Zap, ShieldAlert, Split
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";
import pythonCode from "./topic9_files/bus_topology_simulator.py?raw";

export default function Topic9() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 9
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Physical Network Topologies
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Bus Topology: Backbone Cable, Terminators &amp; Collisions
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Explore the classic linear network layout. Understand how all nodes attach to a single continuous transmission backbone, the vital purpose of 50-Ohm terminators, why a single cable break collapses the entire network, and compare cable savings versus vulnerability in CBSE board exams.
            </p>
          </div>
        </div>

        {/* 2. Core Concepts: Linear Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <GitCommit size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Central Backbone Cable</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              All workstations, servers, and printers attach directly to a <strong className="text-white">single continuous linear cable</strong> (traditionally RG-58 coaxial cable) via drop taps.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldAlert size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">50-Ohm Terminators</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Resistors attached to <strong className="text-white">both ends of the backbone</strong> absorb electrical signal energy. Without them, signals bounce back as echoes, corrupting active packets.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertTriangle size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Single Point of Failure</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              If the central backbone cable is severed at any point, or if a single terminator is removed, <strong className="text-white">the ENTIRE network goes down immediately</strong>.
            </p>
          </div>
        </div>

        {/* 3. Advantages vs Disadvantages Comparison */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Layers size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Evaluation: Advantages vs Disadvantages of Bus Topology</h2>
              <p className="text-xs text-slate-400">Core 2-mark conceptual question frequently asked in board papers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-emerald-500/20 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 size={18} />
                <span>Advantages of Bus Topology</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong className="text-white">Minimal Cable Length:</strong> Consumes far less physical cable than Star topology because nodes connect to a single central line.</li>
                <li><strong className="text-white">Low Equipment Cost:</strong> Does not require expensive central hubs or switches.</li>
                <li><strong className="text-white">Easy Installation:</strong> Highly economical and quick to set up for small, temporary linear workgroups.</li>
              </ul>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-rose-500/20 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <AlertTriangle size={18} />
                <span>Disadvantages of Bus Topology</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong className="text-white">Single Point of Failure:</strong> Any break in the backbone halts all communication.</li>
                <li><strong className="text-white">Difficult Troubleshooting:</strong> Pinpointing a faulty tap or cable fault requires testing the entire physical segment.</li>
                <li><strong className="text-white">Heavy Collisions &amp; Poor Scalability:</strong> Adding more nodes increases CSMA/CD collisions dramatically, causing severe slowdowns.</li>
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
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Traps: The Cable Length Rule</h2>
              <p className="text-xs text-amber-400/80">Frequently tested 1-mark question in topology case studies</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: When is Bus suggested in Case Studies?</p>
              <p className="text-slate-400">
                If a question asks: <strong className="text-white">"Suggest the topology that requires the LEAST amount of cable."</strong> The correct answer is: <strong className="text-white">Bus Topology</strong>! (Nodes connect to a single central line rather than running individual cables to a central switch).
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: Is Bus recommended for modern campuses?</p>
              <p className="text-slate-400">
                While Bus saves cable, it is <strong className="text-white">NOT recommended for reliable enterprise networks</strong> because of its single point of failure. Modern schools use <strong className="text-white">Star topology</strong>!
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
              <h2 className="text-xl font-bold text-white">Laboratory Simulation: Backbone Severing &amp; Ghost Reflections</h2>
              <p className="text-xs text-slate-400">Run this interactive simulator to trace how missing terminators and cable cuts collapse a linear bus</p>
            </div>
          </div>
          <PythonFileLoader
            code={pythonCode}
            filename="bus_topology_simulator.py"
          />
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In Section D 5-mark Case Studies, Question (a) often asks: 'Suggest the most suitable topology to connect the computers in the new lab'. Unless the question explicitly demands 'minimum cable length', ALWAYS suggest 'Star Topology'! If the question says 'minimum cable length is required', suggest 'Bus Topology'. This distinction is worth 1 full mark!"
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_bus_topology_notes.txt"
          title="Download Topic 9 Bus Topology Revision Notes"
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