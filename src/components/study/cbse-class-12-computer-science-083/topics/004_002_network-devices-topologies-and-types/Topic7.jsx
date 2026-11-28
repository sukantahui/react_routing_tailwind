import React from 'react';
import {
  DoorOpen, Cpu, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, ShieldCheck
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";
import pythonCode from "./topic7_files/gateway_protocol_translator_lab.py?raw";

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
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                Protocol Translation Mastery
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Network Gateway: Protocol Translation Between Dissimilar Architectures
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Explore the ultimate protocol converter of computer networks. Master how a Gateway bridges completely incompatible network architectures across all OSI layers, contrast it with a router, and understand real-world VoIP, Payment, and Cloud gateways in CBSE examinations.
            </p>
          </div>
        </div>

        {/* 2. Core Concepts: The Universal Translator */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <RefreshCw size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Protocol Converter</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Acts as a <strong className="text-white">translator between incompatible protocol suites</strong>. Converts data formats, control signals, and framing from one architecture to another.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Layers size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Full OSI Stack Operation</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Unlike routers which stop at Layer 3, a gateway operates across <strong className="text-white">all layers of the OSI model</strong> (including Transport and Application layers 4 through 7).
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <DoorOpen size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Network Entry Point</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Serves as the designated entry and exit security boundary between private enterprise architectures and external networks.
            </p>
          </div>
        </div>

        {/* 3. Master Comparison: Router vs Gateway */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Layers size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Technical Comparison: Router vs Gateway</h2>
              <p className="text-xs text-slate-400">One of the most frequently asked 2-mark conceptual questions in board examinations</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                  <th className="py-3 px-4 font-semibold">Parameter</th>
                  <th className="py-3 px-4 font-semibold text-blue-400">Router</th>
                  <th className="py-3 px-4 font-semibold text-purple-400">Gateway</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Primary Function</td>
                  <td className="py-3 px-4">Routes packets using optimal path selection</td>
                  <td className="py-3 px-4 font-bold text-purple-400">Translates protocols between dissimilar networks</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Protocol Compatibility</td>
                  <td className="py-3 px-4">Requires both networks to share the same protocol (TCP/IP)</td>
                  <td className="py-3 px-4 font-bold text-purple-400">Connects networks running completely different protocols</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Operating OSI Layers</td>
                  <td className="py-3 px-4">Up to Layer 3 (Network Layer)</td>
                  <td className="py-3 px-4 font-bold text-purple-400">All 7 Layers (Physical up to Application Layer)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Payload Handling</td>
                  <td className="py-3 px-4">Inspects headers only; does not modify data payload</td>
                  <td className="py-3 px-4 font-bold text-purple-400">Converts and reformats payload data structure</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Real-World Examples</td>
                  <td className="py-3 px-4">Cisco Edge Router, Home Wi-Fi Router</td>
                  <td className="py-3 px-4 font-bold text-purple-400">VoIP to PSTN Gateway, Payment Gateway, SMS Gateway</td>
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
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Traps: Router vs Gateway</h2>
              <p className="text-xs text-amber-400/80">Crucial point often confused by students in written examinations</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: Confusing Similar vs Dissimilar Protocols</p>
              <p className="text-slate-400">
                If two networks use the <strong className="text-white">same protocol suite (TCP/IP)</strong>, use a <strong className="text-white">Router</strong>. If they use <strong className="text-white">fundamentally different protocol architectures</strong>, use a <strong className="text-white">Gateway</strong>!
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: Is a Gateway strictly a piece of hardware?</p>
              <p className="text-slate-400">
                A gateway can be implemented as a <strong className="text-white">dedicated hardware appliance</strong>, or as a <strong className="text-white">software service</strong> running on a server (e.g. email gateway, payment gateway).
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
              <h2 className="text-xl font-bold text-white">Laboratory Simulation: VoIP-to-PSTN Protocol Translation</h2>
              <p className="text-xs text-slate-400">Run this interactive simulator to trace how a gateway converts SIP IP voice packets into circuit-switched phone calls</p>
            </div>
          </div>
          <PythonFileLoader
            code={pythonCode}
            filename="gateway_protocol_translator_lab.py"
          />
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In CBSE Section A, when asked: 'What is a Gateway?', write: 'A Gateway is a device that connects two completely dissimilar networks using different communication protocols by performing protocol translation across all layers.' This keyword-dense definition ensures full credit!"
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_gateway_device_notes.txt"
          title="Download Topic 7 Gateway Device Revision Notes"
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