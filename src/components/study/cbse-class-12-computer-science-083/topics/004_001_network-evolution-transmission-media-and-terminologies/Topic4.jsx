import React from 'react';
import {
  Cable, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, Cpu, Server, Check
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";
import pythonCode from "./topic4_files/twisted_pair_simulation_lab.py?raw";

export default function Topic4() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 4
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Guided Transmission Media
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Twisted Pair Cable: UTP vs STP, Ethernet Categories &amp; RJ-45
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Explore the fundamental wired physical transmission medium used across worldwide LANs. Understand helical twisting, crosstalk cancellation, UTP versus STP shielding, Category 5e/6 specifications, and the standard 100-meter segment rule tested in CBSE board exams.
            </p>
          </div>
        </div>

        {/* 2. Concept Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Cable size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Why are Wires Twisted?</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Twisting two insulated copper conductors creates opposing magnetic fields that cancel out external <strong className="text-white">Electromagnetic Interference (EMI)</strong> and prevent internal <strong className="text-white">Crosstalk</strong> between adjacent wire pairs.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">UTP vs STP Shielding</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              <strong className="text-white">UTP</strong> is low-cost, flexible, and standard in offices. <strong className="text-white">STP</strong> wraps foil/braided mesh around pairs to eliminate extreme industrial electrical noise, requiring strict grounding.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Zap size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">100-Meter Rule &amp; RJ-45</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Due to copper attenuation, the maximum segment length without a repeater is strictly <strong className="text-white">100 meters (328 ft)</strong>. Terminated with an 8-pin modular <strong className="text-white">RJ-45 connector</strong>.
            </p>
          </div>
        </div>

        {/* 3. In-Depth Technical Deep Dive: Comparison Table */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Layers size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Technical Comparison: UTP vs STP</h2>
              <p className="text-xs text-slate-400">High-frequency 2-mark to 3-mark comparison criteria in board examinations</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                  <th className="py-3 px-4 font-semibold">Parameter</th>
                  <th className="py-3 px-4 font-semibold text-blue-400">UTP (Unshielded Twisted Pair)</th>
                  <th className="py-3 px-4 font-semibold text-emerald-400">STP (Shielded Twisted Pair)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Protective Shielding</td>
                  <td className="py-3 px-4">Plastic outer sheath only; no metal foil</td>
                  <td className="py-3 px-4">Metallic foil or braided wire wrapping</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Noise &amp; EMI Immunity</td>
                  <td className="py-3 px-4">Moderate; susceptible to strong industrial motors</td>
                  <td className="py-3 px-4">Extremely high; ideal for heavy interference</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Installation &amp; Flexibility</td>
                  <td className="py-3 px-4">High flexibility, thin diameter, easy to bend</td>
                  <td className="py-3 px-4">Stiff, thick, requires grounding at endpoints</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Cost Factor</td>
                  <td className="py-3 px-4">Most economical wired medium available</td>
                  <td className="py-3 px-4">Significantly higher cost than UTP</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Max Distance Limit</td>
                  <td className="py-3 px-4">100 meters per segment</td>
                  <td className="py-3 px-4">100 meters per segment</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Connector Standard</td>
                  <td className="py-3 px-4">RJ-45 (Registered Jack 45)</td>
                  <td className="py-3 px-4">Shielded RJ-45 with ground tab</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Common CBSE Traps & Misconceptions */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Traps &amp; Common Errors</h2>
              <p className="text-xs text-amber-400/80">Avoid these frequent student mistakes in Unit II</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: Assuming STP has a longer distance than UTP</p>
              <p className="text-slate-400">
                Students often write that STP can reach 200m or 500m because it is shielded. <strong className="text-white">Incorrect!</strong> Both UTP and STP are copper media limited by electrical attenuation to exactly <strong className="text-white">100 meters</strong> without a repeater.
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: Writing RJ-11 instead of RJ-45 for Ethernet</p>
              <p className="text-slate-400">
                RJ-11 is a 4-pin or 6-pin telephone line connector. Ethernet LAN twisted pair cables use the 8-pin <strong className="text-white">RJ-45 (Registered Jack 45)</strong> connector.
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
              <h2 className="text-xl font-bold text-white">Laboratory Simulation: Twisted Pair Attenuation &amp; Noise</h2>
              <p className="text-xs text-slate-400">Run this interactive simulator to evaluate cable category performance and segment distances</p>
            </div>
          </div>
          <PythonFileLoader
            code={pythonCode}
            filename="twisted_pair_simulation_lab.py"
          />
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In 5-mark networking case studies (e.g. connecting Block A to Block B within 80 meters), always recommend 'Twisted Pair Cable (Cat-6 UTP with RJ-45)' because it is the most economical and easiest to maintain for distances under 100 meters. If distance exceeds 100 meters, advise either installing a Repeater or switching to Optical Fiber!"
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_twisted_pair_cable.txt"
          title="Download Topic 4 Twisted Pair Revision Notes"
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