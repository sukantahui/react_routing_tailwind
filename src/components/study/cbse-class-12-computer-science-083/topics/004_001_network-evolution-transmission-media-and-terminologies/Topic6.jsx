import React from 'react';
import {
  Sparkles, Layers, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Cpu, ArrowRight, Zap, Eye, Lock
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";
import pythonCode from "./topic6_files/fiber_optic_reflection_lab.py?raw";

export default function Topic6() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 6
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Guided Transmission Media
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Optical Fiber Cable: Core, Cladding, Buffer &amp; Total Internal Reflection
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Explore the premier high-speed transmission medium of modern telecommunications. Master the physics of Total Internal Reflection (TIR), compare Single-Mode (SMF) vs Multi-Mode (MMF) fiber, and understand why optical fiber is completely immune to electrical noise and wiretapping.
            </p>
          </div>
        </div>

        {/* 2. Core Physics: Total Internal Reflection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Sparkles size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Total Internal Reflection (TIR)</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Light pulses reflect completely inside the core when traveling into a lower refractive index cladding at an angle of incidence <strong className="text-white">greater than the critical angle</strong>.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">100% EMI Immunity</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Because data is carried by photons (light) through non-conductive glass/silica, fiber is <strong className="text-white">totally immune to lightning, electrical motors, and electromagnetic noise</strong>.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Lock size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Maximum Security</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Fiber cables do not radiate electromagnetic fields. Tapping into a glass fiber requires physically severing it, which causes an immediate detectable drop in optical power.
            </p>
          </div>
        </div>

        {/* 3. The 3 Structural Layers */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Layers size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Structural Anatomy of an Optical Fiber</h2>
              <p className="text-xs text-slate-400">The three vital concentric layers required in CBSE descriptive questions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-blue-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Layer 1 (Center)</span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">n1 ≈ 1.48</span>
              </div>
              <h3 className="text-lg font-bold text-white">Core</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Ultra-pure cylindrical silica glass strand where light propagates. Has the highest refractive index (<strong className="text-white">n1 &gt; n2</strong>).
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-emerald-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Layer 2 (Middle)</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">n2 ≈ 1.46</span>
              </div>
              <h3 className="text-lg font-bold text-white">Cladding</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Optically transparent glass surrounding the core with a <strong className="text-white">lower refractive index</strong>. Keeps the light confined to the core via TIR.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-purple-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Layer 3 (Outer)</span>
                <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Physical Shield</span>
              </div>
              <h3 className="text-lg font-bold text-white">Buffer Coating &amp; Jacket</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Multi-layer protective coating made of silicone buffer, Kevlar strength yarn, and a tough PVC/polyethylene jacket to resist physical tensile stress.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Comparison: Single-Mode vs Multi-Mode */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Zap size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Single-Mode Fiber (SMF) vs Multi-Mode Fiber (MMF)</h2>
              <p className="text-xs text-slate-400">CBSE technical distinction between long-haul and campus fiber</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                  <th className="py-3 px-4 font-semibold">Parameter</th>
                  <th className="py-3 px-4 font-semibold text-blue-400">Single-Mode Fiber (SMF)</th>
                  <th className="py-3 px-4 font-semibold text-emerald-400">Multi-Mode Fiber (MMF)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Core Diameter</td>
                  <td className="py-3 px-4">Tiny: 8 to 10 micrometers (µm)</td>
                  <td className="py-3 px-4">Larger: 50 to 62.5 micrometers (µm)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Light Source</td>
                  <td className="py-3 px-4">Infrared Laser Diode</td>
                  <td className="py-3 px-4">Light Emitting Diode (LED)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Modal Dispersion</td>
                  <td className="py-3 px-4">Zero modal dispersion (single ray path)</td>
                  <td className="py-3 px-4">High modal dispersion (multiple bounce angles)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Max Distance Reach</td>
                  <td className="py-3 px-4">40 km to 100+ km without repeater</td>
                  <td className="py-3 px-4">300 m to 2000 m (campus networks)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Primary Use Case</td>
                  <td className="py-3 px-4">Telco backbones, inter-city, subsea links</td>
                  <td className="py-3 px-4">Campus building interconnects, data centers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Common CBSE Traps */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Traps: Refractive Index Comparison</h2>
              <p className="text-xs text-amber-400/80">Frequently tested 1-mark question</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: Writing that Cladding has higher index than Core</p>
              <p className="text-slate-400">
                Total Internal Reflection is physically impossible if light goes from a rarer to denser medium. The <strong className="text-white">Core refractive index (n1) MUST be greater than Cladding (n2)</strong>.
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: Forgetting the Critical Angle condition</p>
              <p className="text-slate-400">
                Light rays will refract and escape through the cladding unless the angle of incidence is strictly <strong className="text-white">greater than the critical angle</strong>: ( 	heta_i &gt; 	heta_c ).
              </p>
            </div>
          </div>
        </div>

        {/* 6. Python Laboratory Experiment */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Cpu size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Laboratory Simulation: Critical Angle &amp; Ray Tracing</h2>
              <p className="text-xs text-slate-400">Run this interactive Snell's Law and Total Internal Reflection calculation</p>
            </div>
          </div>
          <PythonFileLoader
            code={pythonCode}
            filename="fiber_optic_reflection_lab.py"
          />
        </div>

        {/* 7. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In 5-mark Case Studies where a university campus connects buildings located 2 km or 5 km apart with high bandwidth needs, ALWAYS recommend Optical Fiber Cable! State two supporting reasons: 1) High data rate (gigabits/terabits), and 2) Immune to lightning/EMI over long outdoor spans."
        />

        {/* 8. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_optical_fiber.txt"
          title="Download Topic 6 Optical Fiber Revision Notes"
        />

        {/* 9. CBSE Board Examination Practice & FAQs */}
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