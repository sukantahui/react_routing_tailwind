import React from 'react';
import {
  GitFork, Layers, CheckCircle2, AlertTriangle,
  HelpCircle, Cpu, ArrowRight, Zap, ShieldCheck, ShieldAlert
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";
import pythonCode from "./topic11_files/tree_topology_hierarchy_simulator.py?raw";

export default function Topic11() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 11
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Hierarchical Campus Networks
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Tree Topology: Hierarchical Combination of Star &amp; Bus
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Explore the hierarchical topology powering university campuses and large corporate networks. Master how star-configured departmental clusters cascade into a central backbone or root core switch, understand branch fault isolation, and examine multi-building case studies in CBSE exams.
            </p>
          </div>
        </div>

        {/* 2. Core Concepts: The Hierarchical Structure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <GitFork size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Hybrid Star-Bus Architecture</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Combines characteristics of <strong className="text-white">Star and Bus topologies</strong>. Multiple star-wired departmental clusters branch off from a central root backbone cable or core switch.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Layers size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Branch Fault Isolation</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              If an entire departmental switch or branch line fails, <strong className="text-white">only that specific branch is isolated</strong>. The other departmental branches continue communicating through the core.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Zap size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Infinite Scalability</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              New departments, wings, and computer labs can be added seamlessly by <strong className="text-white">attaching new star sub-branches</strong> to the core switch without disrupting existing operations.
            </p>
          </div>
        </div>

        {/* 3. Deep Dive: Hierarchy Levels */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Layers size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">The Three Levels of a Campus Tree Topology</h2>
              <p className="text-xs text-slate-400">Standard enterprise hierarchy reflected in CBSE curriculum</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-blue-500/20 space-y-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Level 0: Core</span>
              <h4 className="text-base font-bold text-white">Root Core Switch / Server</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Positioned in the central server room (or Main Administrative Block). Manages inter-building traffic and acts as the gateway to the Internet.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-emerald-500/20 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Level 1: Distribution</span>
              <h4 className="text-base font-bold text-white">Departmental Switches</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Switches located in each individual building or floor (e.g., Science Block, Library, Hostels). Connected to the core via optical fiber backbones.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-purple-500/20 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Level 2: Access</span>
              <h4 className="text-base font-bold text-white">Workstation Star Endpoints</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Individual student and faculty PCs connected in local star layouts using Cat-6 UTP patch cables to their departmental distribution switch.
              </p>
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
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Traps: Tree vs Star Topology</h2>
              <p className="text-xs text-amber-400/80">Frequently tested distinction in multi-building network designs</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: Star inside a building vs Tree across buildings</p>
              <p className="text-slate-400">
                Inside a single room/building, computers form a <strong className="text-white">Star Topology</strong>. Across an entire campus connecting multiple departmental buildings to a central server building, the overall network forms a <strong className="text-white">Tree (Hierarchical) Topology</strong>!
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: What happens if the Root Node fails?</p>
              <p className="text-slate-400">
                If the root core switch fails, computers within the same departmental branch can still communicate locally, but <strong className="text-white">all communication between different branches is completely halted</strong>.
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
              <h2 className="text-xl font-bold text-white">Laboratory Simulation: Hierarchical Tree Routing &amp; Root Failure</h2>
              <p className="text-xs text-slate-400">Simulate local intra-branch communication, cross-department routing, and branch failure isolation</p>
            </div>
          </div>
          <PythonFileLoader
            code={pythonCode}
            filename="tree_topology_hierarchy_simulator.py"
          />
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In Section D 5-mark Case Studies, when connecting 4 or 5 separate campus blocks (e.g. Admin, HR, Sales, Tech) to a central Server block, if asked to suggest the overall network topology for the campus, recommend 'Tree Topology' (or 'Star-Bus / Hierarchical Topology'). It perfectly accommodates independent departmental expansion!"
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_tree_topology_notes.txt"
          title="Download Topic 11 Tree Topology Revision Notes"
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