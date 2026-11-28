import React from 'react';
import {
  Cpu, Layers, CheckCircle2, AlertTriangle,
  HelpCircle, ArrowRight, Zap, ShieldCheck, Activity
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";
import pythonCode from "./topic4_files/switch_mac_table_learning_lab.py?raw";

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
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Layer-2 Intelligent Switching
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Network Switch: Intelligent Layer-2 Switching &amp; MAC Table
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Explore the foundational traffic director of modern wired networks. Learn how an intelligent Layer-2 switch dynamically builds its CAM / MAC address table, eliminates collisions through microsegmentation, provides dedicated line-rate bandwidth, and contrast it against legacy hubs in CBSE board exams.
            </p>
          </div>
        </div>

        {/* 2. Core Concepts: The 3 Core Operations of a Switch */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Activity size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">1. Learning</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              When a frame arrives on a port, the switch inspects the <strong className="text-white">Source MAC address</strong>. It dynamically associates that MAC address with that physical port in its CAM table.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">2. Forwarding (Filtering)</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              The switch checks the <strong className="text-white">Destination MAC address</strong>. If found in the table, the frame is directed <strong className="text-white">solely to that specific port</strong>, leaving all other ports silent.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Zap size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">3. Flooding</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              If the Destination MAC is unknown or is a broadcast address (<code className="text-purple-300 font-mono">FF:FF:FF:FF:FF:FF</code>), the switch forwards the frame out of all ports except the incoming port.
            </p>
          </div>
        </div>

        {/* 3. Master Comparison: Hub vs Switch */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Layers size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Master CBSE Technical Comparison: Hub vs Switch</h2>
              <p className="text-xs text-slate-400">One of the most frequently tested 2-mark and 3-mark questions in CBSE Board examinations</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                  <th className="py-3 px-4 font-semibold">Parameter</th>
                  <th className="py-3 px-4 font-semibold text-rose-400">Network Hub</th>
                  <th className="py-3 px-4 font-semibold text-emerald-400">Network Switch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Operating OSI Layer</td>
                  <td className="py-3 px-4">Layer 1 (Physical Layer)</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">Layer 2 (Data Link Layer)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Addressing Intelligence</td>
                  <td className="py-3 px-4">"Dumb" (no address awareness)</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">"Intelligent" (builds MAC address table)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Transmission Mode</td>
                  <td className="py-3 px-4">Blind broadcast to ALL ports</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">Unicast directly to destination port</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Collision Domains</td>
                  <td className="py-3 px-4">1 Single shared collision domain</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">Each port is an isolated collision domain</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Bandwidth Management</td>
                  <td className="py-3 px-4">Bandwidth is shared among all nodes</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">Full dedicated line-rate per port</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Duplex Support</td>
                  <td className="py-3 px-4">Half-Duplex only</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">Full-Duplex simultaneous transmit/receive</td>
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
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Traps: Broadcast vs Collision Domains</h2>
              <p className="text-xs text-amber-400/80">Key distinction tested in multiple-choice and short-answer questions</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: Does a switch break Broadcast Domains?</p>
              <p className="text-slate-400">
                <strong className="text-white">No!</strong> A standard switch breaks <strong className="text-white">Collision Domains</strong> (each port is isolated), but all ports belong to <strong className="text-white">ONE Broadcast Domain</strong>. Only a <strong className="text-white">Router</strong> breaks broadcast domains!
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: Recommending Hub vs Switch in Case Studies</p>
              <p className="text-slate-400">
                In modern CBSE marking schemes, recommending a 'Hub' to connect computers in an office or computer center is marked incorrect. Always recommend an <strong className="text-white">Ethernet Switch</strong>!
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
              <h2 className="text-xl font-bold text-white">Laboratory Simulation: CAM Table Learning &amp; Unicast Forwarding</h2>
              <p className="text-xs text-slate-400">Run this interactive simulator to trace how a switch learns MAC addresses and stops flooding</p>
            </div>
          </div>
          <PythonFileLoader
            code={pythonCode}
            filename="switch_mac_table_learning_lab.py"
          />
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In Section D Case Studies (5 marks), Question (c) often asks: 'Which device will you suggest to install in each building to connect all the computers to each other?' The guaranteed answer is: 'Switch (or Hub/Switch)'. Always write 'Switch' because it provides dedicated bandwidth to every computer and eliminates packet collisions!"
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_switch_device_notes.txt"
          title="Download Topic 4 Network Switch Revision Notes"
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