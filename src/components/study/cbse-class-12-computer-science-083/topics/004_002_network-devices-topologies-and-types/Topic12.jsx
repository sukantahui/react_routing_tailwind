import React from 'react';
import {
  Network, RotateCw, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, ShieldCheck, Calculator
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";
import pythonCode from "./topic12_files/mesh_ring_topology_simulator.py?raw";

export default function Topic12() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 12
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                High-Reliability Architectures
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Mesh &amp; Ring Topologies: Redundancy, Token Passing &amp; Fault Tolerance
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Explore two specialized architectural layouts. Master the Full Mesh cabling formula (N(N-1)/2), examine maximum redundancy for mission-critical backbones, and discover how circular Ring topologies eliminate collisions through deterministic Token Passing in CBSE board exams.
            </p>
          </div>
        </div>

        {/* 2. Core Concepts: Mesh vs Ring */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                <Network size={24} />
              </div>
              <h2 className="text-xl font-bold text-white">Full Mesh Topology</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every single computer is connected directly to every other computer via dedicated point-to-point cables. For <strong className="text-white">(N) nodes</strong>, it requires strictly <strong className="text-white">(N(N-1)/2) physical links</strong> and <strong className="text-white">(N-1) I/O ports</strong> per device.
            </p>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-blue-500/20 text-xs text-blue-300">
              Key Benefit: Unbeatable fault tolerance. If any link snaps, traffic instantly reroutes through peer nodes.
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                <RotateCw size={24} />
              </div>
              <h2 className="text-xl font-bold text-white">Ring Topology &amp; Token Passing</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Nodes form a closed circular loop where data travels unidirectionally. Controlled by <strong className="text-white">Token Passing</strong>: only the node holding the circulating token can transmit, guaranteeing <strong className="text-white">zero packet collisions</strong>.
            </p>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-emerald-500/20 text-xs text-emerald-300">
              Dual-Ring (FDDI): Uses counter-rotating rings that wrap around cable breaks to achieve self-healing.
            </div>
          </div>
        </div>

        {/* 3. Deep Dive: The Mesh Link Formula */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Calculator size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">The CBSE Full Mesh Mathematical Formula</h2>
              <p className="text-xs text-slate-400">Frequently tested 1-mark &amp; 2-mark numerical calculation in board papers</p>
            </div>
          </div>

          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4 text-center">
            <div className="font-mono text-2xl font-extrabold text-blue-400">
              Total Links = rac&#123;N 	imes (N - 1)&#125;&#123;2&#125;
            </div>
            <p className="text-xs text-slate-300 max-w-xl mx-auto">
              Where <strong className="text-white">(N)</strong> is the total number of connected network nodes. Each individual device requires <strong className="text-emerald-400 font-mono">(N - 1)</strong> network interface cards/ports!
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">4 Nodes:</span> <strong className="text-white">6 Cables</strong>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">6 Nodes:</span> <strong className="text-white">15 Cables</strong>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">10 Nodes:</span> <strong className="text-white">45 Cables</strong>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">20 Nodes:</span> <strong className="text-rose-400">190 Cables!</strong>
              </div>
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
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Traps: Mesh vs Star Cost Reality</h2>
              <p className="text-xs text-amber-400/80">Frequently tested in analytical questions</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: Suggesting Full Mesh for an Office LAN</p>
              <p className="text-slate-400">
                Students often write 'Full Mesh' because it has the highest fault tolerance. <strong className="text-white">Incorrect!</strong> For a 50-computer office, a full mesh requires 1,225 cables and 49 NICs per PC—an engineering and financial absurdity. Always suggest <strong className="text-white">Star</strong>!
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: Collisions in Ring Topology</p>
              <p className="text-slate-400">
                In Token Ring networks, do collisions occur? <strong className="text-white">NO!</strong> Because only the workstation possessing the Token frame is permitted to transmit, collisions are physically impossible.
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
              <h2 className="text-xl font-bold text-white">Laboratory Simulation: Mesh Scaling &amp; Dual-Ring Self-Healing</h2>
              <p className="text-xs text-slate-400">Calculate physical cable requirements and simulate counter-rotating ring wrap operations</p>
            </div>
          </div>
          <PythonFileLoader
            code={pythonCode}
            filename="mesh_ring_topology_simulator.py"
          />
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In 1-mark numerical questions: 'Calculate the number of links required for a fully connected mesh network of 8 computers.' Apply the formula: N*(N-1)/2 = 8*7/2 = 28 links. If asked for ports per device, write: N-1 = 7 ports. Memorize this formula to secure an easy full mark!"
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_mesh_ring_topology_notes.txt"
          title="Download Topic 12 Mesh & Ring Topology Revision Notes"
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