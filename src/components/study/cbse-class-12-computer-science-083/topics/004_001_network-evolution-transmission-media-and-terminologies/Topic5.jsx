import React from 'react';
import {
  Radio, Shield, Layers, AlertTriangle, HelpCircle,
  Cpu, CheckCircle2, ArrowRight, Zap, Network, Disc
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";
import pythonCode from "./topic5_files/coaxial_cable_analyzer_lab.py?raw";

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
                Guided Transmission Media
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Coaxial Cable: Physical Construction, Baseband vs Broadband &amp; BNC
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Understand the concentric geometry of coaxial cables. Master the four structural layers (core, dielectric, shield, jacket), compare 50-Ohm Baseband (10BASE2/10BASE5) against 75-Ohm Broadband systems, and learn the critical purpose of BNC terminators in CBSE exams.
            </p>
          </div>
        </div>

        {/* 2. Concentric Structure of Coaxial Cable */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Disc size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">The Four Concentric Layers of Coaxial Cable</h2>
              <p className="text-xs text-slate-400">Essential diagram and structure frequently tested in CBSE 2-mark questions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-blue-500/20 space-y-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Layer 1 (Innermost)</span>
              <h3 className="text-base font-bold text-white">Central Conductor</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Solid or stranded copper wire positioned at the exact geometric center. Carries the high-frequency electrical electromagnetic signal.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-emerald-500/20 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Layer 2 (Insulator)</span>
              <h3 className="text-base font-bold text-white">Dielectric Insulator</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                A non-conductive layer of solid or foamed polyethylene/Teflon. Keeps the central wire precisely spaced from the outer shield.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-purple-500/20 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Layer 3 (Shield)</span>
              <h3 className="text-base font-bold text-white">Braided Metallic Mesh</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Conductive copper/aluminium woven mesh. Shields against EMI/RFI and serves as the electrical ground return conductor.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-amber-500/20 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Layer 4 (Outermost)</span>
              <h3 className="text-base font-bold text-white">Protective Jacket</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Durable outer plastic (PVC or Teflon) sheath that guards the inner components against moisture, UV rays, and physical abrasion.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Baseband vs Broadband Comparison */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Layers size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Baseband vs Broadband Coaxial Transmission</h2>
              <p className="text-xs text-slate-400">Core architectural distinction emphasized in the CBSE Code 083 curriculum</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                  <th className="py-3 px-4 font-semibold">Parameter</th>
                  <th className="py-3 px-4 font-semibold text-blue-400">Baseband Coaxial</th>
                  <th className="py-3 px-4 font-semibold text-emerald-400">Broadband Coaxial</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Characteristic Impedance</td>
                  <td className="py-3 px-4 font-bold text-blue-400">50 Ohms (RG-58, RG-8)</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">75 Ohms (RG-6, RG-59)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Signaling Mode</td>
                  <td className="py-3 px-4">Digital bitstream (Manchester code)</td>
                  <td className="py-3 px-4">Analog modulated RF carrier waves</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Channel Multiplexing</td>
                  <td className="py-3 px-4">Single channel occupying entire bandwidth</td>
                  <td className="py-3 px-4">Frequency Division Multiplexing (FDM) multi-channel</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Historical Ethernet Standard</td>
                  <td className="py-3 px-4">10BASE2 (Thinnet), 10BASE5 (Thicknet)</td>
                  <td className="py-3 px-4">Cable TV networks, DOCSIS Cable Internet</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Maximum Reach</td>
                  <td className="py-3 px-4">185m (Thinnet) to 500m (Thicknet)</td>
                  <td className="py-3 px-4">Tens of kilometers with analog RF amplifiers</td>
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
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Traps: The 50-Ohm Terminator Rule</h2>
              <p className="text-xs text-amber-400/80">Critical point often tested in Bus topology &amp; Coaxial questions</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: Forgetting the function of a Terminator</p>
              <p className="text-slate-400">
                In a coaxial bus network, leaving the cable ends open creates <strong className="text-white">signal reflections (echoes)</strong> that bounce back and destroy active frames. A <strong className="text-white">50-Ohm terminator</strong> absorbs electrical energy to prevent this.
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: Confusing 10BASE2 and 10BASE5 distances</p>
              <p className="text-slate-400">
                <strong className="text-white">10BASE5</strong> is Thicknet (500 meters segment limit). <strong className="text-white">10BASE2</strong> is Thinnet (185 meters, rounded up to ~200m). Both operate at 10 Mbps baseband.
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
              <h2 className="text-xl font-bold text-white">Laboratory Simulation: Characteristic Impedance &amp; Ghost Reflections</h2>
              <p className="text-xs text-slate-400">Simulate reflection coefficients (Gamma) and signal power absorption at cable endpoints</p>
            </div>
          </div>
          <PythonFileLoader
            code={pythonCode}
            filename="coaxial_cable_analyzer_lab.py"
          />
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="When asked in CBSE exams why Coaxial cable is less popular than Twisted Pair in modern offices, give two clear points: 1) Coaxial is stiffer and harder to install around corners, and 2) Coaxial traditionally used bus topology where a single cable break brings down the entire network, whereas star UTP networks localize failures."
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_coaxial_cable.txt"
          title="Download Topic 5 Coaxial Cable Revision Notes"
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