import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, Layout, Award
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/case_study_solver_sim.py?raw";

export default function Topic0() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 0
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                4-Mark Case Study Blueprint
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                CBSE Code 083
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Anatomy of the 4-Mark CBSE Network Case Study Problem
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Master the blueprint and marking scheme of the mandatory 4-mark networking case study question tested in every single CBSE Class 12 Computer Science examination. Decode the four sub-questions and learn how to secure full 4/4 marks.
            </p>
          </div>
        </div>

        {/* 2. Real-World Analogy */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <Zap size={18} />
            <span>Real-World Pedagogical Analogy</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Think of being hired as the Chief Technology Officer (CTO) for a newly constructed university campus with four separate wings. The board of directors hands you two blueprints: a distance map showing how many meters separate each building, and a staff roster showing how many computers will be placed in each wing. Your job is to decide: where to build the main central server room, how to lay underground cables with minimum cost, where signal boosters (repeaters) are needed, and which internet technology connects to distant branches. That is the exact challenge modeled by the 4-mark case study!
          </p>
        </div>

        {/* 3. Deep-Dive Theory & The 4 Sub-Questions Breakdown */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Layout size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">The Four Universal Case-Study Sub-Questions</h2>
              <p className="text-xs text-slate-400">Marking criteria, expected phrasing, and scoring keys</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-slate-900/60 border border-blue-500/20 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-blue-300">Sub-Question (a): Server Placement</h3>
                <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full font-bold">1 Mark</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Question:</strong> Suggest the most suitable block to install the server with justification.
              </p>
              <div className="text-xs text-emerald-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <strong>Model Answer:</strong> "Block X, because it has the <strong>maximum number of computers</strong> (80-20 rule), which minimizes inter-block network traffic and latency."
              </div>
            </div>

            <div className="p-5 bg-slate-900/60 border border-emerald-500/20 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-emerald-300">Sub-Question (b): Cable Layout</h3>
                <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full font-bold">1 Mark</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Question:</strong> Suggest and draw the most suitable cable layout (topology) to connect all blocks.
              </p>
              <div className="text-xs text-emerald-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <strong>Model Answer:</strong> Draw a clean diagram showing a <strong>Star Topology</strong> with point-to-point links radiating from the Server block, or a <strong>Bus Topology</strong> minimizing total cable length.
              </div>
            </div>

            <div className="p-5 bg-slate-900/60 border border-amber-500/20 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-amber-300">Sub-Question (c): Hardware Placement</h3>
                <span className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded-full font-bold">1 Mark</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Question:</strong> Suggest the ideal location for installing a Repeater and a Hub/Switch.
              </p>
              <div className="text-xs text-emerald-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <strong>Model Answer:</strong> "A Switch/Hub should be placed in <strong>EVERY block</strong> to connect local workstations. A Repeater is needed between Block A and Block B because the distance <strong>exceeds 100 meters</strong>."
              </div>
            </div>

            <div className="p-5 bg-slate-900/60 border border-purple-500/20 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-purple-300">Sub-Question (d): Medium &amp; Services</h3>
                <span className="text-xs px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded-full font-bold">1 Mark</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Question:</strong> Suggest the best medium/service for connecting remote branches or video calling.
              </p>
              <div className="text-xs text-emerald-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <strong>Model Answer:</strong> "For hilly/remote branches: <strong>Microwave / Radio Waves / Satellite</strong>. For internet access: <strong>Router &amp; Firewall</strong>. For video calling: <strong>VoIP / SIP</strong>."
              </div>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation Component */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Award size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Automated Case Study Solution Engine</h2>
              <p className="text-xs text-slate-400">Evaluate campus distance matrices and computer counts automatically</p>
            </div>
          </div>
          <PythonFileLoader
            filename="case_study_solver_sim.py"
            code={pythonCode}
            description="Python algorithm parsing distance matrices, determining server location via max-computer rule, and calculating star cable layout length."
          />
        </div>

        {/* 5. Summary Reference Table */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">Summary Cheat Sheet: The 4 Case Study Rules</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                  <th className="p-3">Component / Question</th>
                  <th className="p-3">Golden Rule for Full Marks</th>
                  <th className="p-3">Required Technical Justification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-blue-400">Server Placement</td>
                  <td className="p-3">Block with MAXIMUM computers</td>
                  <td className="p-3">80-20 rule to minimize inter-building cable traffic</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-emerald-400">Switch / Hub Placement</td>
                  <td className="p-3">In EVERY block/wing</td>
                  <td className="p-3">To connect all workstations inside that building together</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-amber-400">Repeater Placement</td>
                  <td className="p-3">Along links exceeding 70-100 meters</td>
                  <td className="p-3">To regenerate signals and overcome cable attenuation</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-purple-400">Cable Layout (Topology)</td>
                  <td className="p-3">Star Layout (from Server) or Bus Layout</td>
                  <td className="p-3">Clean diagram showing blocks as boxes and connecting links</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Common Pitfalls & Misconceptions */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertTriangle size={18} />
            <span>Common Board Examination Pitfalls &amp; Misconceptions</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
            <li><strong>Misconception:</strong> Placing the server in the Admin block simply because it is called 'Admin'. Always check the computer count table—place the server where the <strong>most computers</strong> are located!</li>
            <li><strong>Pitfall:</strong> Forgetting to state the justification for server placement. Naming the block alone gives only 0.5 marks; stating 'because it has the maximum number of computers' gives the full 1.0 mark!</li>
            <li><strong>Pitfall:</strong> Recommending repeaters for fiber optic links. Fiber optic signals do not attenuate over 100-500 meters; repeaters are only for UTP cables.</li>
          </ul>
        </div>

        {/* 7. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="The 4-mark case study is the easiest 4 marks to score in the entire board examination if you follow the four golden rules systematically. Memorize the exact wording: 'Server in the block with maximum computers (80-20 rule); Switch in every block; Repeater on links >100m; Star layout radiating from the server.' You will effortlessly achieve 100% on this question!"
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
          filename="cbse_class12_case_study_anatomy_notes.txt"
          title="Download Topic 0 Revision Notes"
        />

      </div>
    </div>
  );
}
