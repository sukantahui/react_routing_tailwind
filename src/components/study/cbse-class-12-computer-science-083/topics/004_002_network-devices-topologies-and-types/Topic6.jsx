import React from 'react';
import {
  Compass, Cpu, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, Globe, ShieldCheck
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";
import pythonCode from "./topic6_files/router_routing_table_simulation.py?raw";

export default function Topic6() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 6
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Layer-3 Network Routing
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Network Router: Routing Packets Across Networks &amp; IP Addressing
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Explore the critical orchestrator of the global Internet. Master how a Layer-3 Router inspects logical IP addresses, consults dynamic routing tables, performs longest prefix matches, isolates broadcast domains, and connects private LANs to the public WAN in CBSE board exams.
            </p>
          </div>
        </div>

        {/* 2. Core Concepts: The 3 Core Roles of a Router */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Compass size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Inter-Network Routing</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Operates at <strong className="text-white">Layer 3 (Network Layer)</strong>. Inspects destination IP addresses to route packets between different subnets, distinct campuses, and the Internet.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Globe size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Breaks Broadcast Domains</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Routers <strong className="text-white">do NOT forward broadcast frames</strong>. Every router interface defines an independent broadcast domain, containing local chatter and preventing broadcast storms.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Zap size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Dynamic Routing Tables</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Maintains routing tables updated via algorithms (RIP, OSPF, BGP) to find the <strong className="text-white">best mathematical path</strong> (lowest hop count / highest bandwidth) for each packet.
            </p>
          </div>
        </div>

        {/* 3. Detailed Comparison: Switch vs Router */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Layers size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Technical Comparison: Switch vs Router</h2>
              <p className="text-xs text-slate-400">Essential 2-mark to 3-mark distinction across CBSE board examination papers</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                  <th className="py-3 px-4 font-semibold">Parameter</th>
                  <th className="py-3 px-4 font-semibold text-blue-400">Network Switch</th>
                  <th className="py-3 px-4 font-semibold text-emerald-400">Network Router</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Operating OSI Layer</td>
                  <td className="py-3 px-4">Layer 2 (Data Link Layer)</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">Layer 3 (Network Layer)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Addressing System</td>
                  <td className="py-3 px-4">Physical MAC Addresses (48-bit)</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">Logical IP Addresses (32/128-bit)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Primary Purpose</td>
                  <td className="py-3 px-4">Connects nodes WITHIN the same local network</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">Routes data BETWEEN separate, dissimilar networks</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Broadcast Handling</td>
                  <td className="py-3 px-4">Floods broadcasts to all ports</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">Blocks broadcasts (Breaks broadcast domains)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Decision Table</td>
                  <td className="py-3 px-4">CAM / MAC Address Table</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">IP Routing Table (Next Hop)</td>
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
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Traps: The Default Gateway</h2>
              <p className="text-xs text-amber-400/80">Frequently tested 1-mark conceptual question</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: What is a 'Default Gateway'?</p>
              <p className="text-slate-400">
                The Default Gateway configured on a PC is the <strong className="text-white">IP address of the local router's interface</strong>. Whenever a computer needs to send a packet outside its local subnet (e.g., to google.com), it delivers the packet to this router address!
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: Can a Switch connect a school to the Internet?</p>
              <p className="text-slate-400">
                <strong className="text-white">No!</strong> A Layer-2 switch only forwards frames within the school LAN. Connecting the private school network to an ISP or the public Internet strictly requires a <strong className="text-white">Router</strong>!
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
              <h2 className="text-xl font-bold text-white">Laboratory Simulation: IP Routing Table Lookup &amp; TTL Check</h2>
              <p className="text-xs text-slate-400">Execute this simulator to trace longest prefix matching and packet forwarding decisions</p>
            </div>
          </div>
          <PythonFileLoader
            code={pythonCode}
            filename="router_routing_table_simulation.py"
          />
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In CBSE Case Studies, when asked: 'Suggest a device to connect the school network to the Internet service provider (ISP)', the correct answer is 'Router'. If asked 'Why is a router needed?', write: 'To route data packets between the internal local network and the external WAN using IP addresses'."
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_router_device_notes.txt"
          title="Download Topic 6 Router Device Revision Notes"
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