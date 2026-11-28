import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, Server, Activity
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";
import pythonCode from "./topic2_files/server_placement_sim.py?raw";

export default function Topic2() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 2
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Core Design Strategy
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                CBSE Code 083
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Server Placement Strategy: The 80-20 Rule (Block with Maximum Computers)
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Master the foundational engineering logic of server placement. Learn why placing the central server in the block with the maximum number of workstations minimizes inter-building network traffic under the 80-20 rule, and formulate model answers for full marks.
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
            Imagine an educational publisher distributing printed books to a school. If 90% of book readers are high-school students sitting in Building C and only 10% are administrators in Building A, building the central book storage warehouse in Building C makes immense sense: 90% of students simply walk down the hallway to pick up books without ever stepping outside. If you mistakenly placed the warehouse in Building A, hundreds of students would be forced to cross the outdoor pedestrian bridge every day, causing massive hallway traffic jams!
          </p>
        </div>

        {/* 3. Deep-Dive Theory: The 80-20 Networking Rule */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Server size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">The Engineering Logic of the 80-20 Rule</h2>
              <p className="text-xs text-slate-400">Why workstation density dictates server infrastructure location</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-900/60 border border-emerald-500/20 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 size={18} />
                <h3>Optimal Placement: Block with MAX Computers</h3>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li>~80% of total campus traffic remains <strong>internal to the local building switch</strong>.</li>
                <li>Operates at wire speed (1 Gbps / 10 Gbps) with zero packet collision.</li>
                <li>Outdoor backbone cables carry only ~20% of secondary traffic, preventing bottlenecks.</li>
                <li>Lowest overall latency for the largest student/staff population.</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-900/60 border border-rose-500/20 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <AlertTriangle size={18} />
                <h3>Sub-Optimal Placement: Admin / Low-PC Block</h3>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li>Hundreds of heavy users must traverse outdoor inter-building links continuously.</li>
                <li>Inter-building cables suffer <strong>severe bandwidth saturation</strong> and packet drops.</li>
                <li>High latency during peak hours (e.g., computer lab practical exams).</li>
                <li>CBSE examiners deduct 0.5 to 1.0 mark!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation Component */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Activity size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">80-20 Traffic Saturation Simulator</h2>
              <p className="text-xs text-slate-400">Simulate packet flow when server is in Max-PC block vs Min-PC block</p>
            </div>
          </div>
          <PythonFileLoader
            filename="server_placement_sim.py"
            code={pythonCode}
            description="Python simulation calculating local switch packet load vs backbone transit saturation under different server placement scenarios."
          />
        </div>

        {/* 5. Model Answer Formulation Box */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">CBSE Board Exam Golden Answer Template</h2>
          <div className="p-5 bg-slate-900/80 border border-blue-500/30 rounded-xl space-y-3 text-xs leading-relaxed">
            <span className="text-blue-400 font-bold uppercase tracking-wider">Exact Phrasing for 1.0 / 1.0 Mark:</span>
            <p className="text-slate-200 font-mono bg-slate-950 p-3 rounded-lg border border-slate-800">
              "The server should be installed in <strong>Block [Name of Block]</strong> because it contains the <strong>maximum number of computers ([Number] PCs)</strong>.<br/><br/>
              <strong>Justification:</strong> According to the <strong>80-20 networking rule</strong>, placing the server where computer density is greatest ensures that the majority of network traffic remains local to the building switch, thereby minimizing inter-building cable congestion and latency."
            </p>
          </div>
        </div>

        {/* 6. Common Pitfalls & Misconceptions */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertTriangle size={18} />
            <span>Common Board Examination Pitfalls &amp; Misconceptions</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
            <li><strong>Misconception:</strong> Choosing the 'Admin Block' automatically. Always inspect the computer table! If Admin has 20 PCs and Science has 110 PCs, Science Block is the only correct answer.</li>
            <li><strong>Pitfall:</strong> Giving only the block name without justification. If you write 'Science Block' without adding 'because it has the maximum number of computers', you lose 0.5 marks!</li>
            <li><strong>Pitfall:</strong> Writing vague reasons like 'because it is safe' or 'because it is in the center'. Always cite the <strong>maximum computer count and 80-20 rule</strong>.</li>
          </ul>
        </div>

        {/* 7. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="Server placement is the single most predictable 1 mark on the entire CBSE Class 12 Computer Science paper. The rule is absolute: find the highest number in the computer count table, write that block name, and write the magic sentence: 'because it contains the maximum number of computers, minimizing inter-block traffic (80-20 rule).' You will never lose a mark!"
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
          filename="cbse_class12_server_placement_notes.txt"
          title="Download Topic 2 Revision Notes"
        />

      </div>
    </div>
  );
}
