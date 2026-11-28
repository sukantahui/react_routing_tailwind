import React from 'react';
import {
  Radio, Wifi, Globe, ShieldAlert, CheckCircle2, AlertTriangle,
  HelpCircle, Cpu, ArrowRight, Zap, Signal, Compass
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";
import pythonCode from "./topic7_files/radio_waves_propagation_lab.py?raw";

export default function Topic7() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 7
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Unguided Transmission Media
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Unguided Media: Radio Waves (Omnidirectional &amp; Long-Distance)
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Step into wireless communication. Understand how electromagnetic radio waves propagate without physical cables, why omnidirectional antennas don't require line-of-sight alignment, how waves penetrate walls and buildings, and examine government frequency spectrum licensing in CBSE board exams.
            </p>
          </div>
        </div>

        {/* 2. Concept Overview: Key Characteristics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Compass size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Omnidirectional Propagation</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Radio waves radiate in all directions simultaneously. Sending and receiving antennas <strong className="text-white">do NOT require precise line-of-sight alignment</strong>, making them ideal for mobile devices and wide broadcast.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Signal size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Wall &amp; Obstacle Penetration</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Due to longer wavelengths, radio waves can <strong className="text-white">pass through solid walls, office partitions, and trees</strong>, enabling seamless indoor coverage without direct visibility.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Globe size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Government Spectrum Licensing</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Because radio waves travel over large areas and can easily interfere with other transmitters, radio frequencies are <strong className="text-white">strictly regulated and licensed</strong> by government authorities (DoT / FCC).
            </p>
          </div>
        </div>

        {/* 3. Three Modes of Radio Wave Propagation */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Radio size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Three Propagation Modes of Radio Waves</h2>
              <p className="text-xs text-slate-400">CBSE classification based on operating frequency</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-blue-500/20 space-y-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Mode 1: Under 2 MHz</span>
              <h3 className="text-lg font-bold text-white">Ground Wave Propagation</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Follows the curvature of the earth by hugging the planetary surface. Ideal for maritime navigation and low-frequency AM broadcast.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-emerald-500/20 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Mode 2: 2 MHz to 30 MHz</span>
              <h3 className="text-lg font-bold text-white">Sky Wave Propagation</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Radio signals bounce back and forth between the earth's surface and the charged <strong className="text-white">ionosphere</strong>, traveling thousands of kilometers for international shortwave radio.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-purple-500/20 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Mode 3: Above 30 MHz</span>
              <h3 className="text-lg font-bold text-white">Space Wave Propagation</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Line-of-sight propagation directly from transmitting antenna to receiving antenna. Used for FM radio, VHF television, and cellular networks.
              </p>
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
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Traps: Radio Waves vs Microwaves</h2>
              <p className="text-xs text-amber-400/80">Crucial distinction tested in 1-mark &amp; 2-mark theory questions</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: Confusing Antenna Alignment</p>
              <p className="text-slate-400">
                <strong className="text-white">Radio waves are Omnidirectional</strong>: They do NOT require antennas to point directly at each other. <strong className="text-white">Microwaves are Unidirectional</strong>: They require sharp line-of-sight horn/dish antenna alignment!
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: Wall Penetration Ability</p>
              <p className="text-slate-400">
                Radio waves easily penetrate walls and obstacles. Microwaves and Infrared waves cannot easily pass through thick obstacles or buildings without heavy attenuation or blockage.
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
              <h2 className="text-xl font-bold text-white">Laboratory Simulation: Free-Space Path Loss &amp; Wavelength</h2>
              <p className="text-xs text-slate-400">Simulate Friis transmission formula calculations for AM, FM, and Wi-Fi radio frequencies</p>
            </div>
          </div>
          <PythonFileLoader
            code={pythonCode}
            filename="radio_waves_propagation_lab.py"
          />
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In CBSE Section A, when asked to define Radio Waves, always include two keywords: 1) 'Omnidirectional' (transmits in all directions without antenna alignment), and 2) 'Frequency range between 3 KHz and 1 GHz'. Mentioning these two keywords guarantees full 1 mark from the examiner!"
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_radio_waves.txt"
          title="Download Topic 7 Radio Waves Revision Notes"
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