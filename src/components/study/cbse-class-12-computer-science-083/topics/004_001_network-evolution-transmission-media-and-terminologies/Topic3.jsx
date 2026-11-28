import React from 'react';
import {
  ArrowRightLeft, ArrowRight, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, Zap, Radio, Phone, Tv
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";
import pythonCode from "./topic3_files/transmission_modes_simulation.py?raw";

export default function Topic3() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 3
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                Signal Directionality
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Transmission Modes: Simplex, Half-Duplex &amp; Full-Duplex Communications
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore the directional flow of information. Understand unidirectional <code className="text-indigo-300 font-mono">Simplex</code>, alternating bidirectional <code className="text-indigo-300 font-mono">Half-Duplex</code>, and simultaneous <code className="text-indigo-300 font-mono">Full-Duplex</code> channels.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-5 space-y-3">
            <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400 w-fit">
              <Tv size={20} />
            </div>
            <h3 className="text-base font-bold text-white">Simplex Mode</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Strictly UNIDIRECTIONAL. Sender transmits; receiver can only listen and cannot reply.
            </p>
            <div className="p-2.5 bg-slate-900 rounded-xl font-mono text-xs text-sky-300 border border-slate-800">
              Sender ──────&gt; Receiver (One Way)
            </div>
            <p className="text-xs text-slate-400">Examples: Television, FM Radio, Keyboard to CPU.</p>
          </div>

          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-5 space-y-3">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 w-fit">
              <Radio size={20} />
            </div>
            <h3 className="text-base font-bold text-white">Half-Duplex Mode</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              BIDIRECTIONAL, but ALTERNATE. Both can send, but only one party at a time.
            </p>
            <div className="p-2.5 bg-slate-900 rounded-xl font-mono text-xs text-amber-300 border border-slate-800">
              Station A &lt;======&gt; Station B (Take Turns)
            </div>
            <p className="text-xs text-slate-400">Examples: Walkie-Talkies ("Over"), Push-to-Talk radios.</p>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
              <Phone size={20} />
            </div>
            <h3 className="text-base font-bold text-white">Full-Duplex Mode</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              BIDIRECTIONAL and SIMULTANEOUS. Both stations transmit and receive concurrently.
            </p>
            <div className="p-2.5 bg-slate-900 rounded-xl font-mono text-xs text-emerald-300 border border-slate-800">
              Station A ⇄ Station B (Simultaneous)
            </div>
            <p className="text-xs text-slate-400">Examples: Mobile phones, Video calls, Gigabit Ethernet.</p>
          </div>
        </div>

        {/* 3. Deep Dive Theory: Road Analogies */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-indigo-400" size={22} />
            Intuitive Highway Analogies for Board Revision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <p className="font-bold text-sky-400">Simplex = One-Way Street</p>
              <p className="text-slate-400">Vehicles can only travel in one legal direction. Traffic moving backward is impossible.</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <p className="font-bold text-amber-400">Half-Duplex = Single-Lane Bridge</p>
              <p className="text-slate-400">Traffic moves in both directions, but one side must wait while the other crosses.</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <p className="font-bold text-emerald-400">Full-Duplex = Two-Lane Highway</p>
              <p className="text-slate-400">Two dedicated lanes allow traffic to flow in both directions simultaneously without stopping.</p>
            </div>
          </div>
        </div>

        {/* 4. Code Lab Example */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="text-amber-400" size={20} />
              Practical Lab Simulation
            </h2>
            <span className="text-xs text-slate-400 font-mono">transmission_modes_simulation.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="transmission_modes_simulation.py"
            title="Simulating Simplex, Half-Duplex & Full-Duplex Channel Flows"
          />
        </div>

        {/* 5. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In board exams, students often get confused between Half-Duplex and Full-Duplex. The key word is SIMULTANEOUS. If both can speak at the exact same moment (like a phone call), it is Full-Duplex. If they must take turns (like a walkie-talkie), it is Half-Duplex. Keep this distinction sharp!"
        />

        {/* 6. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_transmission_modes.txt"
          title="Download Topic 3 Concise Revision Notes"
        />

        {/* 7. CBSE Board Examination Quality FAQ Set */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
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