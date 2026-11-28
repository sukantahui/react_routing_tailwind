import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, Cpu
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";
import pythonCode from "./topic1_files/tcp_handshake_sim.py?raw";

export default function Topic1() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 1
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Protocol Architecture
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                CBSE Code 083
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              TCP/IP Protocol Suite: Transmission Control Protocol &amp; Internet Protocol
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Examine the backbone of the global Internet. Master the division of responsibilities between TCP (reliable, connection-oriented, ordered delivery) and IP (logical addressing, routing, best-effort packet delivery), along with the 3-Way Handshake.
            </p>
          </div>
        </div>

        {/* 2. Real-World Analogy */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
            <Zap size={18} />
            <span>Real-World Pedagogical Analogy</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Think of ordering an expensive custom laptop online. The postal postal delivery truck driver is like the <strong>Internet Protocol (IP)</strong>—they navigate city roads and deliver envelopes containing separate components to your street address without knowing what is inside or caring if box #2 arrives before box #1. <strong>TCP (Transmission Control Protocol)</strong> is the master logistics engineer: it numbers every single box with a sequence code, inspects each component for damage upon arrival, sends signed receipts (ACKs), requests immediate replacement if a part is lost, and guarantees that the laptop is assembled in perfect working order.
          </p>
        </div>

        {/* 3. Deep-Dive Theory & Architectural Model */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Layers size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">The 4-Layer TCP/IP Model</h2>
              <p className="text-xs text-slate-400">Architectural breakdown vs OSI 7-layer reference model</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-900/60 border border-blue-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-blue-300">TCP: The Transport Workhorse</h3>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li><strong>Connection-Oriented:</strong> Requires 3-Way Handshake (SYN, SYN-ACK, ACK) before data flow.</li>
                <li><strong>100% Reliable:</strong> Automatically retransmits unacknowledged segments using timers.</li>
                <li><strong>Sequenced Byte Stream:</strong> Assigns 32-bit sequence numbers to reconstruct scrambled packets.</li>
                <li><strong>Flow &amp; Congestion Control:</strong> Sliding window prevents overwhelming receivers.</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-900/60 border border-emerald-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-emerald-300">IP: The Global Addressing Router</h3>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li><strong>Connectionless &amp; Best-Effort:</strong> Does not establish sessions or guarantee delivery.</li>
                <li><strong>Logical Addressing:</strong> Uses 32-bit IPv4 or 128-bit IPv6 host and network identifiers.</li>
                <li><strong>Packet Routing:</strong> Directs datagrams hop-by-hop across intermediate routers.</li>
                <li><strong>TTL (Time To Live):</strong> Decremented at each hop to eliminate endless packet loops.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation Component */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Cpu size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">TCP 3-Way Handshake Simulator</h2>
              <p className="text-xs text-slate-400">Execute client-server SYN, SYN-ACK, and ACK sequence synchronization</p>
            </div>
          </div>
          <PythonFileLoader
            filename="tcp_handshake_sim.py"
            code={pythonCode}
            description="Python simulation of socket initialization, SYN segment dispatch, server acknowledgement, and sequence number matching."
          />
        </div>

        {/* 5. Detailed TCP vs UDP vs IP Comparison Table */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">Comparative Matrix: TCP vs UDP vs IP</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                  <th className="p-3">Feature</th>
                  <th className="p-3">TCP (Transport)</th>
                  <th className="p-3">UDP (Transport)</th>
                  <th className="p-3">IP (Internet)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Connection Type</td>
                  <td className="p-3 text-emerald-400">Connection-Oriented</td>
                  <td className="p-3 text-amber-400">Connectionless</td>
                  <td className="p-3 text-amber-400">Connectionless</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Delivery Guarantee</td>
                  <td className="p-3 text-emerald-400">100% Reliable (ACKs)</td>
                  <td className="p-3 text-rose-400">Unreliable (Best-effort)</td>
                  <td className="p-3 text-rose-400">Best-Effort (No ACKs)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Ordering Guarantee</td>
                  <td className="p-3 text-emerald-400">Guaranteed in order</td>
                  <td className="p-3 text-rose-400">No ordering guarantee</td>
                  <td className="p-3 text-rose-400">No ordering guarantee</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Header Size</td>
                  <td className="p-3">20 to 60 bytes</td>
                  <td className="p-3 font-bold text-blue-400">8 bytes (Ultra-light)</td>
                  <td className="p-3">20 to 60 bytes (IPv4)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Typical Protocols</td>
                  <td className="p-3">HTTP, HTTPS, FTP, SMTP</td>
                  <td className="p-3">VoIP, Video Streaming, DNS</td>
                  <td className="p-3">ICMP, OSPF, BGP</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Step-by-Step 3-Way Handshake Walkthrough */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white">Step-by-Step: The TCP 3-Way Handshake</h2>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">1</span>
              <div>
                <strong className="text-white">SYN (Synchronize):</strong> The client selects an Initial Sequence Number (e.g., Seq=1000) and transmits a TCP segment with the SYN flag set to the server's listening port (e.g. 80).
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">2</span>
              <div>
                <strong className="text-white">SYN-ACK (Synchronize-Acknowledge):</strong> The server responds with its own Initial Sequence Number (e.g., Seq=5000) and acknowledges the client's SYN by setting Ack=1001.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">3</span>
              <div>
                <strong className="text-white">ACK (Acknowledge):</strong> The client confirms receipt of the server's SYN by transmitting an ACK packet with Ack=5001. Both endpoints enter the ESTABLISHED state, and payload data transmission begins.
              </div>
            </div>
          </div>
        </div>

        {/* 7. Common Pitfalls & Misconceptions */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertTriangle size={18} />
            <span>Common Board Examination Pitfalls &amp; Misconceptions</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
            <li><strong>Misconception:</strong> Thinking IP handles retransmissions. IP never retransmits; it is strictly best-effort. Only TCP (Transport Layer) detects packet loss and triggers retransmission.</li>
            <li><strong>Pitfall:</strong> Confusing Port numbers with IP addresses. An IP address specifies the host machine on the network; a Port number specifies the exact software application running on that host.</li>
            <li><strong>Pitfall:</strong> Stating that IPv4 is 128 bits. IPv4 is strictly 32 bits (4 octets, e.g., 192.168.1.1); IPv6 is 128 bits.</li>
          </ul>
        </div>

        {/* 8. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="CBSE board papers frequently ask to differentiate between TCP and IP. Summarize precisely: 'TCP handles reliable end-to-end data transfer, sequencing, flow control, and retransmission at the Transport Layer; IP handles logical addressing and packet routing across intermediate networks at the Internet Layer.'"
        />

        {/* 9. CBSE Board Examination Practice & FAQs */}
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

        {/* 10. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_tcp_ip_suite_notes.txt"
          title="Download Topic 1 Revision Notes"
        />

      </div>
    </div>
  );
}
