import React from 'react';
import {
  Zap, Radio, AlertTriangle, HelpCircle,
  Layers, ArrowRight, Activity, ShieldCheck, CheckCircle2
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";
import pythonCode from "./topic5_files/repeater_signal_regeneration_lab.py?raw";

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
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Layer-1 Signal Extension
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Network Repeater: Signal Regeneration &amp; the 5-4-3 Rule
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Understand the Layer-1 device engineered to conquer distance limitations. Master the crucial distinction between analog Amplifiers and digital Repeaters, learn when to recommend a repeater in CBSE case studies, and explore the classic 5-4-3 rule of Ethernet networks.
            </p>
          </div>
        </div>

        {/* 2. Core Concepts: Amplifier vs Repeater */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-500/10 rounded-xl text-rose-400">
                <Activity size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Analog Amplifier</h3>
                <p className="text-xs text-rose-400 font-mono">Analog Waves (Multiplies All)</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              An amplifier simply multiplies incoming electrical voltage by a gain factor. Crucially, it <strong className="text-white">amplifies both the original signal AND the accumulated background noise</strong>, leading to severe signal degradation over cascaded distances.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Digital Repeater</h3>
                <p className="text-xs text-emerald-400 font-mono">Digital Bits (Threshold Regeneration)</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              A repeater is a digital device. It does not blindly amplify; instead, it <strong className="text-white">decodes incoming voltages against a threshold</strong>, strips away noise completely, and <strong className="text-white">reconstructs a pristine, brand-new digital square wave</strong>.
            </p>
          </div>
        </div>

        {/* 3. Deep Dive: Comparison Table */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Layers size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Technical Comparison: Amplifier vs Repeater</h2>
              <p className="text-xs text-slate-400">One of the most frequent 2-mark conceptual questions in CBSE Computer Science</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                  <th className="py-3 px-4 font-semibold">Parameter</th>
                  <th className="py-3 px-4 font-semibold text-rose-400">Amplifier</th>
                  <th className="py-3 px-4 font-semibold text-emerald-400">Repeater</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Signal Type Handled</td>
                  <td className="py-3 px-4">Analog continuous signals (sine waves)</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">Digital binary bitstreams (square pulses)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Noise Handling</td>
                  <td className="py-3 px-4 text-rose-400">Amplifies both signal and noise together</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">Filters out noise completely</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Output Signal Quality</td>
                  <td className="py-3 px-4">Larger version of distorted incoming wave</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">Brand-new, reshaped pristine square wave</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Noise Accumulation</td>
                  <td className="py-3 px-4">Noise accumulates rapidly over hops</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">Zero noise accumulation across hops</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Operating OSI Layer</td>
                  <td className="py-3 px-4">Physical transmission line</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">Physical Layer (Layer 1)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Common CBSE Traps */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Case Study Rule: When to Suggest a Repeater</h2>
              <p className="text-xs text-amber-400/80">Frequently tested 1-mark question in Section D case studies</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Rule 1: Copper distance exceeding 100 meters</p>
              <p className="text-slate-400">
                If a case study states: <strong className="text-white">"Distance between Block A and Block B is 140 meters and Cat-6 UTP cable is used. Suggest a device to prevent signal loss."</strong> Answer: <strong className="text-white">Repeater</strong> (placed at 70m or 100m).
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Rule 2: Is a repeater needed for Optical Fiber?</p>
              <p className="text-slate-400">
                If the layout uses <strong className="text-white">Optical Fiber</strong> between buildings (e.g., 200m or 1.5km), state clearly that <strong className="text-white">NO REPEATER IS NEEDED</strong> because optical fiber can travel kilometers without regeneration!
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
              <h2 className="text-xl font-bold text-white">Laboratory Simulation: Digital Repeater vs Analog Amplifier</h2>
              <p className="text-xs text-slate-400">Trace electrical attenuation over 140m and verify how repeaters eliminate noise</p>
            </div>
          </div>
          <PythonFileLoader
            code={pythonCode}
            filename="repeater_signal_regeneration_lab.py"
          />
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In 5-mark Case Studies, Question (d) often asks: 'Where should a repeater be placed?' Check the distance table between buildings. Look for any distance that exceeds 100 meters (e.g. 110m, 160m). Recommend placing a repeater along that link. If all distances are under 100m, state: 'No repeater is required as all distances are under 100 meters'!"
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_repeater_device_notes.txt"
          title="Download Topic 5 Network Repeater Revision Notes"
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