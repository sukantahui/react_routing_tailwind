import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, Cpu
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/protocol_encapsulation_sim.py?raw";

export default function Topic0() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 0
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Core Foundations
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                CBSE Code 083
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Understanding Protocols: Need for Standard Rules in Digital Communication
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Explore why heterogeneous digital devices require formalized communication rules. Master the triad of Syntax, Semantics, and Timing, and examine how protocol encapsulation enables seamless data exchange across the global Internet.
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
            Imagine two ambassadors meeting from different countries who speak completely different native languages. Without an agreed diplomatic protocol—a shared common language (syntax), agreed definitions of diplomatic gestures (semantics), and rules on who speaks when (timing)—constructive dialogue is impossible. Similarly, a Linux web server and a Windows laptop require universal protocols like TCP/IP and HTTP to format, sequence, and understand each other's bitstreams.
          </p>
        </div>

        {/* 3. Deep-Dive Theory & The Protocol Triad */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Layers size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">The Three Pillars of a Protocol</h2>
              <p className="text-xs text-slate-400">Formal technical definition as mandated by CBSE Curriculum</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-900/60 border border-blue-500/20 rounded-xl space-y-2">
              <h3 className="text-base font-bold text-blue-300">1. Syntax</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Refers to the structure, formatting, and layout of data. It specifies field lengths, delimiter markers, and the exact order in which bits and bytes must appear.
              </p>
              <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2 rounded border border-slate-800">
                Example: Port number = 16 bits, IPv4 address = 32 bits.
              </div>
            </div>

            <div className="p-5 bg-slate-900/60 border border-emerald-500/20 rounded-xl space-y-2">
              <h3 className="text-base font-bold text-emerald-300">2. Semantics</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Refers to the meaning of each section of bits. It dictates what specific action the sender, router, or receiver must take when a flag or command is parsed.
              </p>
              <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2 rounded border border-slate-800">
                Example: SYN flag = initiate session, FIN flag = terminate session.
              </div>
            </div>

            <div className="p-5 bg-slate-900/60 border border-purple-500/20 rounded-xl space-y-2">
              <h3 className="text-base font-bold text-purple-300">3. Timing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Refers to two key characteristics: when data should be transmitted, and how fast it can be transmitted (flow control and synchronization to prevent buffer overflow).
              </p>
              <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2 rounded border border-slate-800">
                Example: TCP Sliding Window flow control &amp; retransmission timeout.
              </div>
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
              <h2 className="text-xl font-bold text-white">Laboratory Protocol Simulator</h2>
              <p className="text-xs text-slate-400">Execute protocol encapsulation and decapsulation in Python</p>
            </div>
          </div>
          <PythonFileLoader
            filename="protocol_encapsulation_sim.py"
            code={pythonCode}
            description="Simulates the 4-layer encapsulation of HTTP application data into transport segments, network packets, and data-link frames."
          />
        </div>

        {/* 5. Layered PDU Hierarchy Comparison Table */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">Encapsulation Hierarchy: Protocol Data Units (PDUs)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                  <th className="p-3">OSI / TCP Layer</th>
                  <th className="p-3">PDU Designation</th>
                  <th className="p-3">Added Header / Trailer Fields</th>
                  <th className="p-3">Key Addressing Scheme</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-blue-400">Application (Layer 7/5)</td>
                  <td className="p-3">Message / Payload</td>
                  <td className="p-3">HTTP, SMTP, FTP request/response headers</td>
                  <td className="p-3 font-mono">URL / Email address</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-emerald-400">Transport (Layer 4)</td>
                  <td className="p-3">Segment (TCP) / Datagram (UDP)</td>
                  <td className="p-3">Source/Dest Port, Sequence #, TCP Checksum</td>
                  <td className="p-3 font-mono">16-bit Port (e.g. 80, 443, 25)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-amber-400">Network / Internet (Layer 3)</td>
                  <td className="p-3">Packet / Datagram</td>
                  <td className="p-3">Source/Dest IP, TTL, Protocol ID, Header Checksum</td>
                  <td className="p-3 font-mono">32-bit IPv4 / 128-bit IPv6</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-purple-400">Data Link (Layer 2)</td>
                  <td className="p-3">Frame</td>
                  <td className="p-3">Source/Dest MAC, EtherType, CRC FCS Trailer</td>
                  <td className="p-3 font-mono">48-bit MAC Hardware Address</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-slate-400">Physical (Layer 1)</td>
                  <td className="p-3">Bits</td>
                  <td className="p-3">Preamble, Start Frame Delimiter, Clock synch pulses</td>
                  <td className="p-3 font-mono">Electrical / Optical Signals</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Step-by-Step Packet Traversal Analysis */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white">Step-by-Step: The Life of a Packet</h2>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">1</span>
              <div>
                <strong className="text-white">Application Generation:</strong> User clicks a link in Chrome. The browser drafts an HTTP GET request message.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">2</span>
              <div>
                <strong className="text-white">Transport Segmentation:</strong> TCP breaks the HTTP message into segments, assigning Source Port (ephemeral) and Destination Port (80/443) with sequence numbers.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">3</span>
              <div>
                <strong className="text-white">Network Packetization:</strong> IP attaches Source IP (client) and Destination IP (server), determining routing paths and Time To Live (TTL).
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">4</span>
              <div>
                <strong className="text-white">Data Link Framing:</strong> Ethernet attaches local Source MAC and Default Gateway MAC, appending CRC checksum trailer.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">5</span>
              <div>
                <strong className="text-white">Physical Transmission:</strong> Transceiver encodes bits into light pulses on fiber or voltages on copper cables.
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
            <li><strong>Misconception:</strong> Confusing Syntax with Semantics. Syntax is the structural arrangement of bits; Semantics is what those bits actually instruct the receiver to do.</li>
            <li><strong>Misconception:</strong> Thinking a protocol is a physical device or cable. A protocol is purely software rules and conventions.</li>
            <li><strong>Pitfall:</strong> Omitting the word 'standardized' or 'formal set of rules' in the 1-mark definition question. Always state: <em>"A protocol is a formal set of rules and conventions governing communication between networked devices."</em></li>
          </ul>
        </div>

        {/* 8. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In CBSE Class 12 board examinations, examiners frequently ask: 'What is a protocol? Why is it needed?' Memorize the two-part answer: (1) Formal rules for data communication, (2) Essential to enable heterogeneous computers across different manufacturers and OS platforms to communicate reliably without errors."
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
          filename="cbse_class12_understanding_protocols_notes.txt"
          title="Download Topic 0 Revision Notes"
        />

      </div>
    </div>
  );
}
