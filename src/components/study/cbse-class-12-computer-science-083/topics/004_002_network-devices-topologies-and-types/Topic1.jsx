import React from 'react';
import {
  CreditCard, Cpu, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, Hash, ShieldCheck
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";
import pythonCode from "./topic1_files/mac_address_analyzer_lab.py?raw";

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
                Physical Hardware Addressing
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ethernet Card (NIC) &amp; MAC Address Architecture
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Discover the foundational network interface adapter present inside every connected computer. Understand the 48-bit Media Access Control (MAC) address structure, the 24-bit OUI vendor prefix, and master the classic CBSE distinction between MAC and IP addresses.
            </p>
          </div>
        </div>

        {/* 2. Concept Overview: The Network Interface Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <CreditCard size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">The Ethernet Card (NIC)</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              A physical hardware adapter that connects a computer to a local network. Translates digital software frames into electrical or optical signals onto the cable.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Hash size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">48-Bit Physical Address</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every NIC has a permanently burned-in <strong className="text-white">48-bit (6-byte) MAC address</strong> represented as 12 hexadecimal characters (e.g., <code className="text-emerald-300 font-mono">00:1A:2B:3C:4D:5E</code>).
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Global Uniqueness</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              The first 24 bits represent the IEEE-assigned <strong className="text-white">OUI (Manufacturer ID)</strong>; the last 24 bits are serialized uniquely by the manufacturer, guaranteeing worldwide uniqueness.
            </p>
          </div>
        </div>

        {/* 3. Deep Dive: Anatomy of a MAC Address */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Layers size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Anatomy of a 48-Bit MAC Address</h2>
              <p className="text-xs text-slate-400">High-yield technical structure required in CBSE 2-mark questions</p>
            </div>
          </div>

          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
            <div className="text-center font-mono text-xl sm:text-2xl font-bold tracking-widest text-slate-200">
              <span className="text-blue-400">00 : 1A : 2B</span>
              <span className="text-slate-600"> : </span>
              <span className="text-emerald-400">3C : 4D : 5E</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <p className="font-bold text-blue-400 text-sm mb-1">First 24 Bits (3 Bytes / 6 Hex Digits)</p>
                <p className="text-xs text-slate-300">
                  <strong className="text-white">Organizationally Unique Identifier (OUI)</strong>: Assigned by IEEE to the manufacturer (e.g., Intel, Apple, Cisco, Realtek).
                </p>
              </div>
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <p className="font-bold text-emerald-400 text-sm mb-1">Last 24 Bits (3 Bytes / 6 Hex Digits)</p>
                <p className="text-xs text-slate-300">
                  <strong className="text-white">NIC Specific Serial Number</strong>: Uniquely assigned by the manufacturer to each individual network interface card.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Comparison Table: MAC vs IP Address */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Zap size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Technical Comparison: MAC Address vs IP Address</h2>
              <p className="text-xs text-slate-400">One of the most frequent 2-mark theory questions in CBSE Computer Science</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                  <th className="py-3 px-4 font-semibold">Parameter</th>
                  <th className="py-3 px-4 font-semibold text-blue-400">MAC Address (Physical Address)</th>
                  <th className="py-3 px-4 font-semibold text-emerald-400">IP Address (Logical Address)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Address Nature</td>
                  <td className="py-3 px-4">Permanent physical hardware address burned in ROM</td>
                  <td className="py-3 px-4">Logical network address dynamically assigned via DHCP</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Length &amp; Size</td>
                  <td className="py-3 px-4 font-bold text-blue-400">48 bits (6 Bytes)</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">32 bits (IPv4) or 128 bits (IPv6)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Format &amp; Notation</td>
                  <td className="py-3 px-4 font-mono">12 Hexadecimal digits (00:1A:2B:3C:4D:5E)</td>
                  <td className="py-3 px-4 font-mono">Dotted Decimal notation (192.168.1.1)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Operating OSI Layer</td>
                  <td className="py-3 px-4">Data Link Layer (Layer 2)</td>
                  <td className="py-3 px-4">Network Layer (Layer 3)</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">Assigned By</td>
                  <td className="py-3 px-4">Hardware Manufacturer (via IEEE OUI)</td>
                  <td className="py-3 px-4">Network Administrator / ISP / DHCP Server</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Common CBSE Traps */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Traps: Validating MAC Addresses</h2>
              <p className="text-xs text-amber-400/80">Frequently tested 1-mark identification questions</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: Non-Hex Characters (G to Z)</p>
              <p className="text-slate-400">
                Hexadecimal digits ONLY span from <strong className="text-white">0-9 and A-F</strong>. An address like <code className="text-rose-400">00:1A:2B:3C:4D:GG</code> is completely <strong className="text-rose-400">INVALID</strong> because 'G' is not a hexadecimal digit!
              </p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: Wrong Number of Octets / Bytes</p>
              <p className="text-slate-400">
                A MAC address MUST contain exactly <strong className="text-white">6 octets (12 hex digits)</strong>. An address with 4 octets or 8 octets is invalid.
              </p>
            </div>
          </div>
        </div>

        {/* 6. Python Laboratory Experiment */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Cpu size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Laboratory Simulation: MAC Address Parser &amp; OUI Vendor Lookup</h2>
              <p className="text-xs text-slate-400">Execute this script to validate 48-bit MAC addresses and parse manufacturer prefixes</p>
            </div>
          </div>
          <PythonFileLoader
            code={pythonCode}
            filename="mac_address_analyzer_lab.py"
          />
        </div>

        {/* 7. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="When asked in CBSE exams to identify an invalid MAC address among four choices, check two things immediately: 1) Are there letters beyond 'F' (like G, H, K)? If yes, it's invalid. 2) Are there exactly six groups of two digits separated by colons or hyphens? Following this simple rule gives you an instant 1 mark in Section A!"
        />

        {/* 8. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_nic_mac_address.txt"
          title="Download Topic 1 NIC & MAC Address Revision Notes"
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

      </div>
    </div>
  );
}