import React from 'react';
import {
  Cable, CheckCircle2, AlertTriangle, HelpCircle,
  Layers, ArrowRight, Zap, Cpu, ShieldCheck
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";
import pythonCode from "./topic2_files/rj45_pinout_verifier_lab.py?raw";

export default function Topic2() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 2
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Physical Network Connectors
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              RJ45 Connector &amp; Modular Jack Architecture
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Explore the universal 8P8C modular connector powering global local area networks. Master the T568A and T568B color standards, understand the difference between Straight-Through and Crossover patch cords, and contrast RJ45 against RJ11 in CBSE board examinations.
            </p>
          </div>
        </div>

        {/* 2. Core Concepts: The 8P8C Modular Standard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Cable size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">8P8C Architecture</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Stands for <strong className="text-white">8 Position, 8 Contact</strong>. Houses 8 gold-plated pins that pierce the insulation of all 4 twisted pairs during crimping.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Zap size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Straight-Through Cable</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Identical pinouts at both ends (T568B to T568B). Connects <strong className="text-white">dissimilar devices</strong> such as a Workstation to a Switch or Hub.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Crossover Cable</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              T568A at one end and T568B at the other. Swaps transmit and receive pairs to connect <strong className="text-white">similar devices directly</strong> (e.g. PC to PC).
            </p>
          </div>
        </div>

        {/* 3. Deep Dive: T568A vs T568B Pinout Table */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Layers size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">TIA/EIA-568 Color-Coding Standards</h2>
              <p className="text-xs text-slate-400">Official 8-pin color configurations for Ethernet terminations</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                  <th className="py-3 px-4 font-semibold">Pin #</th>
                  <th className="py-3 px-4 font-semibold text-emerald-400">T568A Standard</th>
                  <th className="py-3 px-4 font-semibold text-amber-400">T568B Standard (Most Popular)</th>
                  <th className="py-3 px-4 font-semibold text-blue-400">100BASE-TX Function</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono text-xs">
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-white">Pin 1</td>
                  <td className="py-2.5 px-4 text-emerald-300">White / Green</td>
                  <td className="py-2.5 px-4 text-amber-300">White / Orange</td>
                  <td className="py-2.5 px-4 text-blue-300">Transmit Data + (Tx+)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-white">Pin 2</td>
                  <td className="py-2.5 px-4 text-emerald-300">Green</td>
                  <td className="py-2.5 px-4 text-amber-300">Orange</td>
                  <td className="py-2.5 px-4 text-blue-300">Transmit Data - (Tx-)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-white">Pin 3</td>
                  <td className="py-2.5 px-4 text-emerald-300">White / Orange</td>
                  <td className="py-2.5 px-4 text-amber-300">White / Green</td>
                  <td className="py-2.5 px-4 text-blue-300">Receive Data + (Rx+)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-white">Pin 4</td>
                  <td className="py-2.5 px-4 text-slate-400">Blue</td>
                  <td className="py-2.5 px-4 text-slate-400">Blue</td>
                  <td className="py-2.5 px-4 text-slate-400">Unused (or PoE)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-white">Pin 5</td>
                  <td className="py-2.5 px-4 text-slate-400">White / Blue</td>
                  <td className="py-2.5 px-4 text-slate-400">White / Blue</td>
                  <td className="py-2.5 px-4 text-slate-400">Unused (or PoE)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-white">Pin 6</td>
                  <td className="py-2.5 px-4 text-emerald-300">Orange</td>
                  <td className="py-2.5 px-4 text-amber-300">Green</td>
                  <td className="py-2.5 px-4 text-blue-300">Receive Data - (Rx-)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-white">Pin 7</td>
                  <td className="py-2.5 px-4 text-slate-400">White / Brown</td>
                  <td className="py-2.5 px-4 text-slate-400">White / Brown</td>
                  <td className="py-2.5 px-4 text-slate-400">Unused (or PoE)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-white">Pin 8</td>
                  <td className="py-2.5 px-4 text-slate-400">Brown</td>
                  <td className="py-2.5 px-4 text-slate-400">Brown</td>
                  <td className="py-2.5 px-4 text-slate-400">Unused (or PoE)</td>
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
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Traps: RJ45 vs RJ11</h2>
              <p className="text-xs text-amber-400/80">Frequently tested 1-mark distinction</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: Writing RJ11 for Ethernet</p>
              <p className="text-slate-400">
                <strong className="text-white">RJ11</strong> is a 4-pin or 6-pin connector used exclusively for telephone voice lines. <strong className="text-white">RJ45</strong> is an 8-pin connector used for Ethernet computer networking!
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: Cable for PC to PC connection</p>
              <p className="text-slate-400">
                Connecting two PCs directly without a switch historically requires a <strong className="text-white">Crossover Cable</strong>. Connecting a PC to a switch requires a <strong className="text-white">Straight-Through Cable</strong>.
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
              <h2 className="text-xl font-bold text-white">Laboratory Simulation: RJ45 Cable Type &amp; Pinout Analyzer</h2>
              <p className="text-xs text-slate-400">Execute this simulator to test T568A/T568B configurations and verify cable purposes</p>
            </div>
          </div>
          <PythonFileLoader
            code={pythonCode}
            filename="rj45_pinout_verifier_lab.py"
          />
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In 1-mark CBSE questions, when asked 'Identify the connector used to terminate UTP cables in an Ethernet LAN', write: 'RJ-45 (Registered Jack 45)'. Do not write RJ-11 or BNC. If asked for its pin count, specify 8 pins (8P8C)."
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_rj45_connector_notes.txt"
          title="Download Topic 2 RJ45 Connector Revision Notes"
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