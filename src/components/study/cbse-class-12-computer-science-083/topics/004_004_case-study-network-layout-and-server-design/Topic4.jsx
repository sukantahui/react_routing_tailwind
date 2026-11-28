import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, Radio, Activity
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";
import pythonCode from "./topic4_files/repeater_attenuation_sim.py?raw";

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
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Hardware Placement Rules
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                CBSE Code 083
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Repeater Placement Rules: Distance Threshold (&gt;70-100 meters) between Blocks
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Master Sub-Question (c) regarding signal booster placement. Understand cable attenuation physics, why standard UTP cables enforce a 100-meter ceiling, why fiber optic cables do not need repeaters, and formulate perfect scoring answers.
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
            Imagine whispering a secret down a long corridor. If the listener stands 40 meters away, they hear your voice clearly. But if they stand 140 meters away, your acoustic sound waves fade and scatter into silence (attenuation), making the words completely unintelligible. To solve this, you place a relay person standing midway at 70 meters: they listen to your whisper, understand the words, and speak them out loud with full energy down the rest of the hall. That relay runner is exactly what a <strong>Repeater</strong> does for digital pulses!
          </p>
        </div>

        {/* 3. Deep-Dive Theory: The 100m Threshold Rule */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
              <Radio size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">The Engineering Physics of Repeaters</h2>
              <p className="text-xs text-slate-400">Why Category 5e/6 UTP cables enforce a strict 100-meter limit</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-900/60 border border-blue-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-blue-300">How a Repeater Operates (Layer 1)</h3>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li>Operates strictly at the <strong>Physical Layer (Layer 1)</strong>.</li>
                <li>Does not inspect MAC or IP addresses; works purely with electrical voltage bits.</li>
                <li><strong>Regenerates:</strong> Samples incoming weak pulses, strips out noise, and outputs fresh, crisp 5V square waves.</li>
                <li>Superior to analog amplifiers which amplify both signal and noise.</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-900/60 border border-emerald-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-emerald-300">CBSE Exam Decision Threshold</h3>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li><strong>Distance &lt;= 100m:</strong> NO Repeater needed. Signals arrive strong and healthy.</li>
                <li><strong>Distance &gt; 100m:</strong> REPEATER MANDATORY to overcome attenuation on UTP links.</li>
                <li><strong>Fiber Optic Exception:</strong> If fiber is used, NO repeater needed even for 500m - 2km!</li>
                <li>State both the link name and the numerical meterage in your answer.</li>
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
              <h2 className="text-xl font-bold text-white">Signal Attenuation &amp; Regeneration Simulator</h2>
              <p className="text-xs text-slate-400">Observe voltage drop over distance and clean pulse regeneration by a repeater</p>
            </div>
          </div>
          <PythonFileLoader
            filename="repeater_attenuation_sim.py"
            code={pythonCode}
            description="Python simulation modeling signal voltage loss over 60m vs 140m and showing how midway repeater regeneration restores TTL signal health."
          />
        </div>

        {/* 5. Golden Answer Template Box */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">CBSE Board Exam Golden Answer Template</h2>
          <div className="p-5 bg-slate-900/80 border border-amber-500/30 rounded-xl space-y-3 text-xs leading-relaxed">
            <span className="text-amber-400 font-bold uppercase tracking-wider">Exact Phrasing for Full 1.0 Mark:</span>
            <p className="text-slate-200 font-mono bg-slate-950 p-3 rounded-lg border border-slate-800">
              "A <strong>Repeater</strong> should be placed along the link between <strong>Block [A]</strong> and <strong>Block [B]</strong> because the distance between them is <strong>[X] meters</strong>, which <strong>exceeds the 100-meter transmission limit</strong> of standard twisted pair (UTP) cabling.<br/><br/>
              <strong>Reason:</strong> Over extended distances, electrical signals suffer attenuation (signal loss). The repeater will regenerate and amplify the digital signals, preventing packet loss and ensuring reliable data transmission."
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
            <li><strong>Misconception:</strong> Recommending repeaters when all campus links are under 100 meters. If all distances are 40m, 60m, 80m, state: <em>"No repeater is needed as all distances are under 100 meters."</em></li>
            <li><strong>Pitfall:</strong> Recommending repeaters for Fiber Optic cables. Fiber optic spans kilometers without repeaters. Only recommend repeaters for copper UTP cabling.</li>
            <li><strong>Pitfall:</strong> Forgetting to mention the reason 'to regenerate attenuated signals'. Stating the location alone loses half a mark!</li>
          </ul>
        </div>

        {/* 7. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="Whenever a case study asks where to place a repeater, scan Table 2 for any distance greater than 100 meters. If you find one (e.g. 140m), write: 'Repeater between Block A and Block B because distance (140m) > 100m, to regenerate attenuated signals.' If ALL distances are under 100m, write: 'No repeater required because all distances are within the 100m limit.' Both scenarios frequently appear in board papers!"
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
          filename="cbse_class12_repeater_placement_notes.txt"
          title="Download Topic 4 Revision Notes"
        />

      </div>
    </div>
  );
}
