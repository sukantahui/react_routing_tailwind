import React from 'react';
import {
  Send, Radio, MessageSquare, Layers, ShieldCheck,
  CheckCircle2, AlertTriangle, HelpCircle, ArrowRight, Zap, Cpu
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";
import pythonCode from "./topic1_files/data_comm_components_simulation.py?raw";

export default function Topic1() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 1
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Core Telecommunication Framework
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Data Communication System Components: Sender, Receiver, Message, Medium &amp; Protocol
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Every transmission across the globe—from a WhatsApp text to satellite telemetry—relies on five universal elements. Master the roles of Sender, Receiver, Message, Transmission Medium, and governing Protocols.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards: The 5 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-4 space-y-2">
            <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400 w-fit">
              <Send size={18} />
            </div>
            <h4 className="text-sm font-bold text-white">1. Sender</h4>
            <p className="text-xs text-slate-400">Source node generating and transmitting data.</p>
          </div>

          <div className="bg-slate-950/80 border border-indigo-500/30 rounded-2xl p-4 space-y-2">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 w-fit">
              <Cpu size={18} />
            </div>
            <h4 className="text-sm font-bold text-white">2. Receiver</h4>
            <p className="text-xs text-slate-400">Destination device accepting the incoming payload.</p>
          </div>

          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-4 space-y-2">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 w-fit">
              <MessageSquare size={18} />
            </div>
            <h4 className="text-sm font-bold text-white">3. Message</h4>
            <p className="text-xs text-slate-400">The actual information payload (text, audio, video).</p>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-4 space-y-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
              <Radio size={18} />
            </div>
            <h4 className="text-sm font-bold text-white">4. Medium</h4>
            <p className="text-xs text-slate-400">Physical transmission path (guided cable or unguided air).</p>
          </div>

          <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-4 space-y-2">
            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400 w-fit">
              <ShieldCheck size={18} />
            </div>
            <h4 className="text-sm font-bold text-white">5. Protocol</h4>
            <p className="text-xs text-slate-400">Agreed rules governing syntax, timing, and error checks.</p>
          </div>
        </div>

        {/* 3. Deep Dive Theory: Effectiveness Criteria */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-sky-400" size={22} />
            Four Hallmarks of Effective Data Communications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <p className="font-bold text-sky-400">1. Delivery</p>
              <p className="text-slate-400">Data must arrive at the correct destination and only that destination.</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <p className="font-bold text-emerald-400">2. Accuracy</p>
              <p className="text-slate-400">Data must be delivered intact without altered or corrupted bits.</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <p className="font-bold text-amber-400">3. Timeliness</p>
              <p className="text-slate-400">Data must arrive on time without disruptive lag (vital for video/voice).</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <p className="font-bold text-purple-400">4. Low Jitter</p>
              <p className="text-slate-400">Packet delay variation must be minimal to avoid playback stutter.</p>
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
            <span className="text-xs text-slate-400 font-mono">data_comm_components_simulation.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="data_comm_components_simulation.py"
            title="Sender-Receiver Protocol & Integrity Simulation"
          />
        </div>

        {/* 5. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="Whenever you define 'Protocol' in CBSE exams, remember this golden analogy: 'A protocol is the shared language of computers. Just as two human diplomats cannot communicate without an agreed spoken language, two connected computers cannot communicate without an agreed protocol.' Include examples like TCP/IP and HTTP for maximum marks!"
        />

        {/* 6. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_data_comm_components.txt"
          title="Download Topic 1 Concise Revision Notes"
        />

        {/* 7. CBSE Board Examination Quality FAQ Set */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400">
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