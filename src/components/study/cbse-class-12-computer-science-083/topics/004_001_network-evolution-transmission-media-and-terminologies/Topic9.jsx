import React from 'react';
import {
  Satellite, Globe, ArrowUpRight, ArrowDownLeft, CheckCircle2,
  AlertTriangle, HelpCircle, Cpu, ArrowRight, Zap, Radio, Clock
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";
import pythonCode from "./topic9_files/satellite_uplink_downlink_lab.py?raw";

export default function Topic9() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 9
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                Satellite Communications
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Satellite Communication: Geostationary Orbit, Uplink, Downlink &amp; Transponders
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Ascend 35,786 km into Geostationary Earth Orbit (GEO). Understand why satellites appear stationary in the sky, why Uplink and Downlink frequencies must differ to prevent self-interference, how onboard transponders amplify signals, and master VSAT applications for CBSE exams.
            </p>
          </div>
        </div>

        {/* 2. Key Concepts: The Big Three */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Globe size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Geostationary Orbit (GEO)</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Positioned at <strong className="text-white">35,786 km</strong> above the Equator. Its 24-hour orbital period exactly matches Earth's rotation, causing the satellite to appear stationary so ground dishes never have to track moving targets.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Radio size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">The Satellite Transponder</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Acts as an airborne repeater. It receives the weak uplink signal from Earth, filters noise, translates the frequency down to the downlink channel, amplifies power, and beams it back to Earth.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Clock size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Latency &amp; Delay (~250-500ms)</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Traveling roughly 72,000 km up and down at the speed of light introduces a one-way latency of <strong className="text-white">~250 ms</strong> (round-trip ping ~500 ms). Ideal for broadcast TV (DTH), but noticeable in phone calls.
            </p>
          </div>
        </div>

        {/* 3. Deep Dive: Uplink vs Downlink */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Satellite size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Uplink vs Downlink Frequency Differentiation</h2>
              <p className="text-xs text-slate-400">Critical concept tested in CBSE 2-mark conceptual questions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-blue-500/20 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold">
                <ArrowUpRight size={20} />
                <span>Uplink Transmission (Earth to Space)</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Earth stations transmit signals UP to the satellite using a <strong className="text-white">higher frequency</strong> (e.g. 6 GHz in C-band, 14 GHz in Ku-band).
              </p>
              <div className="p-3 bg-blue-500/10 rounded-xl text-xs text-blue-300">
                Why Higher? Earth stations have virtually unlimited electrical power from the grid to push higher frequencies through atmospheric attenuation.
              </div>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-emerald-500/20 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ArrowDownLeft size={20} />
                <span>Downlink Transmission (Space to Earth)</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                The satellite beams signals DOWN to Earth dishes using a <strong className="text-white">lower frequency</strong> (e.g. 4 GHz in C-band, 12 GHz in Ku-band).
              </p>
              <div className="p-3 bg-emerald-500/10 rounded-xl text-xs text-emerald-300">
                Why Lower? Satellites rely on limited solar panels and batteries. Lower frequencies suffer lower atmospheric attenuation, conserving satellite battery power!
              </div>
            </div>
          </div>
        </div>

        {/* 4. Common CBSE Traps */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Traps: Why Frequencies Must Differ</h2>
              <p className="text-xs text-amber-400/80">Top scoring question in CBSE Networking papers</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: The Self-Interference / Feedback Loop</p>
              <p className="text-slate-400">
                If the satellite transmitted the downlink on the exact same frequency as the incoming uplink, its own powerful transmitter would <strong className="text-white">swamp and blind its sensitive receiver</strong>. Changing the frequency prevents feedback!
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: How many GEO satellites cover the Earth?</p>
              <p className="text-slate-400">
                Exactly <strong className="text-white">Three (3) Geostationary satellites</strong> spaced 120° apart can cover almost the entire planet, except for the extreme polar caps. Do not write 24 (which is for GPS MEO satellites).
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
              <h2 className="text-xl font-bold text-white">Laboratory Simulation: GEO Propagation Latency Calculator</h2>
              <p className="text-xs text-slate-400">Calculate exact speed-of-light delays across different earth dish elevation angles</p>
            </div>
          </div>
          <PythonFileLoader
            code={pythonCode}
            filename="satellite_uplink_downlink_lab.py"
          />
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In CBSE Case Studies, when an organization needs to connect an isolated branch located in a remote mountainous village, dense forest, or island where NO fiber cables or cellular towers exist, ALWAYS recommend 'Satellite Link (VSAT)'! It provides ubiquitous coverage regardless of harsh terrain."
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_satellite_communication.txt"
          title="Download Topic 9 Satellite Communication Revision Notes"
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