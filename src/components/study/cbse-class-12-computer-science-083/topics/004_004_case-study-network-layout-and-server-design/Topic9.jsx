import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Award, Server, Network, Cable, Shield
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";
import pythonCode from "./topic9_files/case_study_solver_engine.py?raw";

export default function Topic9() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-amber-400 mb-2">
          <Award className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-800/60">
            CBSE Examination Mastery · Guaranteed 4/4 Marks
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Solving 10 Past CBSE Board Examination 4-Mark Case Studies with Model Answers
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Comprehensive step-by-step solutions to authentic CBSE Board exam case studies. Master the
          standard 4-part structure: Server Placement, Cable Layout, Repeater & Switch placement, and
          Advanced Technology recommendations.
        </p>
      </header>

      {/* 2. Teacher Guidance */}
      <Teacher
        teacherName="Sukanta Hui"
        experienceYears="27+"
        designation="Senior Computer Science Faculty & Academic Consultant"
        institution="Coder & AccoTax, Barrackpore"
        message="The 4-mark case study question in Section E is the most reliable scoring question in the entire 70-mark CBSE Computer Science paper. The questions are 100% predictable: Sub-question (a) is always Server Placement, (b) is Cable Layout, (c) is Repeater/Switch placement, and (d) is Protocol or Medium selection. If you follow the systematic 4-step algorithm shown on this page, you are guaranteed 4 out of 4 marks!"
      />

      {/* 3. The 4-Part Scoring Blueprint */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 shadow-lg space-y-6">
        <div className="flex items-center space-x-3 text-sky-400">
          <Layers className="w-6 h-6" />
          <h2 className="text-xl font-bold text-white">The Proven 4-Mark Examination Rubric</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between text-emerald-400 font-bold text-sm mb-2">
              <span className="flex items-center space-x-2">
                <Server className="w-4 h-4" />
                <span>Sub-Part (a): Server Placement</span>
              </span>
              <span className="bg-emerald-950 px-2 py-0.5 rounded text-xs border border-emerald-800">1 Mark</span>
            </div>
            <p className="text-white font-semibold">The 80-20 Rule</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Name the block containing the <span className="text-emerald-400 font-bold">maximum number of computers</span>.
              Mandatory justification: "Placing the server in the block with maximum workstations minimizes
              inter-building network traffic and bandwidth congestion."
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-sky-500/50 transition-all">
            <div className="flex items-center justify-between text-sky-400 font-bold text-sm mb-2">
              <span className="flex items-center space-x-2">
                <Network className="w-4 h-4" />
                <span>Sub-Part (b): Cable Layout</span>
              </span>
              <span className="bg-sky-950 px-2 py-0.5 rounded text-xs border border-sky-800">1 Mark</span>
            </div>
            <p className="text-white font-semibold">Star or Bus Topology</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Draw neat labeled boxes with connecting lines. Star layout connects every block to the Server block.
              Bus layout connects blocks sequentially with minimum total cable distance (MST).
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-amber-500/50 transition-all">
            <div className="flex items-center justify-between text-amber-400 font-bold text-sm mb-2">
              <span className="flex items-center space-x-2">
                <Cable className="w-4 h-4" />
                <span>Sub-Part (c): Repeater & Switch</span>
              </span>
              <span className="bg-amber-950 px-2 py-0.5 rounded text-xs border border-amber-800">1 Mark</span>
            </div>
            <p className="text-white font-semibold">Distance & Concentration Rules</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              <span className="text-amber-400 font-bold">Repeater:</span> Required only on links &gt; 100 meters to amplify weakened signals.
              <br />
              <span className="text-amber-400 font-bold">Hub / Switch:</span> Required in <span className="underline">every block</span> having multiple computers.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-purple-500/50 transition-all">
            <div className="flex items-center justify-between text-purple-400 font-bold text-sm mb-2">
              <span className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Sub-Part (d): Protocol / Service / Medium</span>
              </span>
              <span className="bg-purple-950 px-2 py-0.5 rounded text-xs border border-purple-800">1 Mark</span>
            </div>
            <p className="text-white font-semibold">Domain-Specific Recommendation</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Video calls: VoIP protocol, Webcam, Mic. Perimeter security: Firewall. Long-distance branch: Radio waves or Satellite. High-speed inter-block link: Optical Fiber Cable.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Solved Case Study Walkthrough */}
      <section className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Case Study Walkthrough: 'Vidya Bharati University' (CBSE 2023)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-900 p-4 rounded border border-slate-700">
            <p className="font-bold text-slate-200 mb-2">Table 1: Distances between Blocks</p>
            <ul className="space-y-1 text-slate-300">
              <li>• Admin Block to Academic Wing: 45 m</li>
              <li>• Admin Block to Library Wing: 125 m</li>
              <li>• Admin Block to Hostel Wing: 160 m</li>
              <li>• Academic Wing to Library Wing: 60 m</li>
              <li>• Library Wing to Hostel Wing: 50 m</li>
            </ul>
          </div>
          <div className="bg-slate-900 p-4 rounded border border-slate-700">
            <p className="font-bold text-slate-200 mb-2">Table 2: Number of Computers</p>
            <ul className="space-y-1 text-slate-300">
              <li>• Academic Wing: 130 computers</li>
              <li>• Admin Block: 35 computers</li>
              <li>• Library Wing: 40 computers</li>
              <li>• Hostel Wing: 20 computers</li>
            </ul>
          </div>
        </div>
        <div className="bg-slate-900/90 p-4 rounded border border-slate-700 text-sm space-y-2">
          <p className="text-emerald-400 font-bold">Examiner's Model Answer:</p>
          <p><strong>(a) Server:</strong> Academic Wing (hosts maximum computers: 130), as per 80-20 rule.</p>
          <p><strong>(b) Cable Layout:</strong> Star layout connected to Academic Wing, OR Bus layout connecting Academic - Admin (45m), Academic - Library (60m), and Library - Hostel (50m) = 155m total.</p>
          <p><strong>(c) Devices:</strong> Repeater needed if directly connecting Admin to Hostel (160m &gt; 100m). Hub/Switch in EVERY block.</p>
          <p><strong>(d) Connecting City Branch 20 km away:</strong> Radio Waves / Microwave or Optical Fiber.</p>
        </div>
      </section>

      {/* 5. Python Case Study Solver */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-sky-400" />
          <span>Interactive Python Simulator: CBSE Case Study Solver Engine</span>
        </h3>
        <p className="text-sm text-slate-300">
          Run this automated solver script to calculate server placement, Star vs Bus distances, and repeater requirements for any CBSE problem:
        </p>
        <PythonFileLoader
          filename="case_study_solver_engine.py"
          code={pythonCode}
        />
      </section>

      {/* 6. Quick Revision Notes */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-emerald-400" />
          <span>Quick Revision Summary Note</span>
        </h3>
        <PlainTextPrint
          title="10 Solved CBSE Case Studies - Quick Revision"
          content={noteText}
        />
      </section>

      {/* 7. Comprehensive FAQ & Exam Questions */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 mb-2">
          <HelpCircle className="w-6 h-6" />
          <h3 className="text-xl font-bold text-white">25 Authentic CBSE Board Assessment Questions</h3>
        </div>
        <p className="text-sm text-slate-300">
          Test your diagnostic skills across past CBSE case study scenarios:
        </p>
        <FAQTemplate questions={questions} />
      </section>
    </div>
  );
}
