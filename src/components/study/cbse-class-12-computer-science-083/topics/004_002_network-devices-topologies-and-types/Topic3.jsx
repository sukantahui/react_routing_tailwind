import React from 'react';
import {
  Share2, AlertTriangle, HelpCircle, Layers,
  Cpu, CheckCircle2, ArrowRight, Zap, ShieldAlert, Radio
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";
import pythonCode from "./topic3_files/hub_broadcast_collision_lab.py?raw";

export default function Topic3() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 3
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Layer-1 Connecting Devices
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Network Hub: Active vs Passive Hubs &amp; Collision Domain
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Examine the classic multiport repeater of legacy networks. Understand why a hub is termed a 'dumb' Layer-1 device that blindly broadcasts packets, compare Active versus Passive hubs, and discover the fatal performance bottleneck of a single shared collision domain.
            </p>
          </div>
        </div>

        {/* 2. Core Concepts: What Makes a Hub 'Dumb'? */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Share2 size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Blind Broadcast Device</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              A hub has <strong className="text-white">no MAC address intelligence</strong>. When an electrical signal enters one port, it blindly copies and broadcasts it out of every single other port.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertTriangle size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Single Collision Domain</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              All connected ports share one single electrical channel. If two nodes transmit simultaneously, their frames <strong className="text-white">collide and corrupt</strong> across the entire network.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ShieldAlert size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Security Vulnerability</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Because every computer receives all traffic, any workstation running packet sniffer software (e.g. Wireshark) can <strong className="text-white">eavesdrop on private data</strong> intended for other users.
            </p>
          </div>
        </div>

        {/* 3. Deep Dive: Active vs Passive Hubs */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Layers size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Technical Comparison: Active Hub vs Passive Hub</h2>
              <p className="text-xs text-slate-400">Essential 2-mark comparison frequently asked in board papers</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                  <th className="py-3 px-4 font-semibold">Parameter</th>
                  <th className="py-3 px-4 font-semibold text-blue-400">Active Hub</th>
                  <th className="py-3 px-4 font-semibold text-amber-400">Passive Hub</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Signal Handling</td>
                  <td className="py-3 px-4">Cleans, regenerates, and amplifies the electrical signal</td>
                  <td className="py-3 px-4">Simply splits the physical signal without any regeneration</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Power Supply Required</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Yes (Needs AC power to operate electronics)</td>
                  <td className="py-3 px-4 text-amber-400 font-bold">No (Operates passively without external power)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Network Distance Effect</td>
                  <td className="py-3 px-4">Extends maximum allowable network cable distance</td>
                  <td className="py-3 px-4">Reduces allowable segment distance by half</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Role as a Repeater</td>
                  <td className="py-3 px-4 font-bold text-blue-400">Acts as a Multiport Repeater</td>
                  <td className="py-3 px-4">Acts only as a physical wiring concentrator</td>
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
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Traps: Hub vs Switch</h2>
              <p className="text-xs text-amber-400/80">Never confuse these two central connectivity devices</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: Believing a Hub inspects destination addresses</p>
              <p className="text-slate-400">
                A hub operates at <strong className="text-white">Layer 1 (Physical)</strong>. It is completely blind to MAC addresses and blindly repeats bits. A <strong className="text-white">Switch</strong> operates at Layer 2 and maintains a MAC address table!
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: Bandwidth Distribution on a Hub</p>
              <p className="text-slate-400">
                Hub ports <strong className="text-white">SHARE total bandwidth</strong>. On a 10 Mbps hub with 10 active PCs, each PC gets only ~1 Mbps. On a switch, each port receives dedicated full speed!
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
              <h2 className="text-xl font-bold text-white">Laboratory Simulation: Blind Broadcast &amp; Collision Domain</h2>
              <p className="text-xs text-slate-400">Run this interactive script to visualize multi-port signal broadcasting and collision scenarios</p>
            </div>
          </div>
          <PythonFileLoader
            code={pythonCode}
            filename="hub_broadcast_collision_lab.py"
          />
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In 5-mark Case Studies where an organization wants to connect 80 computers in a department with high bandwidth and zero collisions, if a question asks 'Between Hub and Switch, which device should be installed?', ALWAYS recommend 'Switch'! Justify by stating: 1) A switch provides dedicated bandwidth per port, and 2) A switch eliminates collisions by creating separate collision domains for each port!"
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_network_hub_notes.txt"
          title="Download Topic 3 Network Hub Revision Notes"
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