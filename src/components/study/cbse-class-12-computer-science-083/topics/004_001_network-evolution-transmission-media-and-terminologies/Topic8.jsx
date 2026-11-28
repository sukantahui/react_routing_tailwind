import React from 'react';
import {
  Radio, Zap, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Cpu, ArrowRight, Eye, TowerControl, Layers
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";
import pythonCode from "./topic8_files/microwave_infrared_simulation_lab.py?raw";

export default function Topic8() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 8
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Unguided Transmission Media
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Microwaves (Line of Sight &amp; Towers) &amp; Infrared Transmission
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Examine two critical unguided communication media. Master terrestrial microwave systems, parabolic dish alignment, repeaters necessitated by the Earth's curvature, and discover why infrared waves provide short-range security inside single rooms.
            </p>
          </div>
        </div>

        {/* 2. Core Concepts: Microwave vs Infrared */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
                <TowerControl size={24} />
              </div>
              <h2 className="text-xl font-bold text-white">Microwave Transmission (1 - 300 GHz)</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Microwaves propagate in a <strong className="text-white">unidirectional narrow beam</strong>. The transmitting and receiving parabolic dish antennas must be in sharp, uninterrupted <strong className="text-white">Line of Sight (LoS)</strong>. Because the curvature of the Earth blocks straight signals, relay repeater towers must be installed every <strong className="text-white">40 to 50 km</strong>.
            </p>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-blue-500/20 text-xs text-blue-300">
              Key Use Case: Linking buildings across cities or rough terrain without trenching cables.
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
                <Eye size={24} />
              </div>
              <h2 className="text-xl font-bold text-white">Infrared Transmission (300 GHz - 400 THz)</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Infrared waves operate at extremely high frequencies and have very short wavelengths. They are <strong className="text-white">completely blocked by solid walls</strong>, confining signals strictly to a single room (within 5 to 10 meters). This makes infrared immune to eavesdropping from outside the room.
            </p>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-amber-500/20 text-xs text-amber-300">
              Key Use Case: TV remote controls, wireless mouse/keyboards, secure in-room device pairing.
            </div>
          </div>
        </div>

        {/* 3. Detailed CBSE Comparison Table */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Layers size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Comparison: Radio Waves vs Microwaves vs Infrared</h2>
              <p className="text-xs text-slate-400">High-frequency comparison question across board examination papers</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                  <th className="py-3 px-4 font-semibold">Parameter</th>
                  <th className="py-3 px-4 font-semibold text-blue-400">Radio Waves</th>
                  <th className="py-3 px-4 font-semibold text-emerald-400">Microwaves</th>
                  <th className="py-3 px-4 font-semibold text-amber-400">Infrared</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Frequency Range</td>
                  <td className="py-3 px-4">3 kHz to 1 GHz</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">1 GHz to 300 GHz</td>
                  <td className="py-3 px-4 font-bold text-amber-400">300 GHz to 400 THz</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Beam Directionality</td>
                  <td className="py-3 px-4">Omnidirectional (all directions)</td>
                  <td className="py-3 px-4">Unidirectional (focused beam)</td>
                  <td className="py-3 px-4">Unidirectional / Line-of-Sight</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Wall Penetration</td>
                  <td className="py-3 px-4 text-emerald-400">Easily penetrates walls</td>
                  <td className="py-3 px-4">Severely attenuated by walls</td>
                  <td className="py-3 px-4 text-rose-400">Zero (completely blocked)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Antenna Alignment</td>
                  <td className="py-3 px-4">Not required</td>
                  <td className="py-3 px-4 text-amber-400">Strict Line of Sight required</td>
                  <td className="py-3 px-4 text-amber-400">Direct pointing needed</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Typical Reach</td>
                  <td className="py-3 px-4">City / Global (sky wave)</td>
                  <td className="py-3 px-4">40 - 50 km per tower hop</td>
                  <td className="py-3 px-4">Under 10 meters (single room)</td>
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
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Traps: The Earth Curvature Rule</h2>
              <p className="text-xs text-amber-400/80">Frequently tested reason for repeater towers</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: Why are microwave repeaters placed every 40-50 km?</p>
              <p className="text-slate-400">
                Students often write 'because the signal runs out of battery'. <strong className="text-white">Incorrect!</strong> Microwaves travel in a straight line, while the Earth is spherical. Past ~50 km, the <strong className="text-white">curvature of the Earth physically blocks</strong> the line of sight between tower antennas.
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: Why TV remotes don't interfere with the neighbor's TV</p>
              <p className="text-slate-400">
                Because infrared waves <strong className="text-white">cannot penetrate solid walls</strong>. The signals remain 100% contained within the living room, preventing accidental channel changes next door!
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
              <h2 className="text-xl font-bold text-white">Laboratory Simulation: Tower Heights &amp; Infrared Obstacle Modeling</h2>
              <p className="text-xs text-slate-400">Run this interactive simulator to calculate optical horizon limits and infrared attenuation</p>
            </div>
          </div>
          <PythonFileLoader
            code={pythonCode}
            filename="microwave_infrared_simulation_lab.py"
          />
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In 5-mark Case Studies where two branch offices are situated on opposite sides of a busy municipal highway or river at a distance of 15 km, and physical cabling is forbidden by municipal authorities, recommend 'Microwave Transmission Link'! Justify by stating: 1) High data rate, 2) Direct Line of Sight across 15 km is well within the 50 km repeater threshold."
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_microwaves_infrared.txt"
          title="Download Topic 8 Microwaves & Infrared Revision Notes"
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