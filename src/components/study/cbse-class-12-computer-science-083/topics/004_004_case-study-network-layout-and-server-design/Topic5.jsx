import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, Cpu, Network
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";
import pythonCode from "./topic5_files/switch_placement_sim.py?raw";

export default function Topic5() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 5
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Concentration Devices
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                CBSE Code 083
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Hub / Switch Placement Rules: Required in Every Block with Multiple Computers
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Master Sub-Question (c) regarding concentration hardware placement. Understand why a network Switch is mandatory in every individual block, how local star topologies are formed, and why Switches are always preferred over legacy Hubs.
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
            Imagine an electrical power grid for a multi-building hospital: you do not run 500 separate power lines from the central municipal generator to every individual light bulb in every ward! Instead, a single heavy-duty cable runs from the generator to a central circuit breaker panel (Switch) inside each building. That local breaker panel then distributes power to individual rooms. Similarly, a <strong>Switch in each block</strong> gathers all local computer cables and connects the entire building to the central server room through a single high-speed backbone link!
          </p>
        </div>

        {/* 3. Deep-Dive Theory: The "Every Block" Rule */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Cpu size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Why Every Block Requires Its Own Switch</h2>
              <p className="text-xs text-slate-400">Local concentration, collision isolation, and structured cabling</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-900/60 border border-blue-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-blue-300">1. Local Concentration &amp; Aggregation</h3>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li>Workstations inside a building cannot run 100 individual outdoor cables to another wing.</li>
                <li>All local desktop patch cables plug into the building's local switch.</li>
                <li>The switch aggregates traffic and sends it across a single <strong>high-speed backbone uplink</strong> to the server room.</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-900/60 border border-emerald-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-emerald-300">2. Why Switch over Hub?</h3>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li><strong>Dedicated Bandwidth:</strong> Full 1 Gbps on every single port.</li>
                <li><strong>Zero Collisions:</strong> Micro-segments each workstation into an independent collision domain.</li>
                <li><strong>Intelligent MAC Forwarding:</strong> Unicasts frames directly to destination endpoints without flooding.</li>
                <li>Always recommend a <strong>Switch</strong> over a Hub for full marks!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation Component */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Network size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Campus Switch Sizing Simulator</h2>
              <p className="text-xs text-slate-400">Calculate switch hardware and port density requirements across blocks</p>
            </div>
          </div>
          <PythonFileLoader
            filename="switch_placement_sim.py"
            code={pythonCode}
            description="Python simulation determining switch density (8, 16, 24, 48 ports) for each building and validating collision domain isolation."
          />
        </div>

        {/* 5. Golden Answer Template Box */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">CBSE Board Exam Golden Answer Template</h2>
          <div className="p-5 bg-slate-900/80 border border-emerald-500/30 rounded-xl space-y-3 text-xs leading-relaxed">
            <span className="text-emerald-400 font-bold uppercase tracking-wider">Exact Phrasing for Full 1.0 Mark:</span>
            <p className="text-slate-200 font-mono bg-slate-950 p-3 rounded-lg border border-slate-800">
              "A <strong>Switch (or Hub)</strong> should be installed in <strong>EACH AND EVERY BLOCK / WING</strong> of the campus.<br/><br/>
              <strong>Reason:</strong> A switch is required inside each block to connect all local workstations together into a local network (internal Star topology) and to aggregate their traffic for transmission to the central server via the backbone link."
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
            <li><strong>Misconception:</strong> Writing that a switch is only needed in the Server block. Every building with computers needs its own local switch!</li>
            <li><strong>Pitfall:</strong> Recommending a Hub instead of a Switch. Modern CBSE marking schemes award full credit for Switch; Hub is legacy and deprecated.</li>
            <li><strong>Pitfall:</strong> Omitting the reason. If you state 'In every block' without explaining 'to connect all local computers together', you lose half a mark!</li>
          </ul>
        </div>

        {/* 7. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="Sub-question (c) usually asks two things together: where to place a Repeater, and where to place a Switch/Hub. Memorize the two sentences: (1) 'Switch in EACH block to connect local computers together.' (2) 'Repeater on link [X]-[Y] because distance exceeds 100 meters, to regenerate attenuated signals.' Writing these two sentences guarantees you full marks in Sub-Question (c) every time!"
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
          filename="cbse_class12_switch_placement_notes.txt"
          title="Download Topic 5 Revision Notes"
        />

      </div>
    </div>
  );
}
