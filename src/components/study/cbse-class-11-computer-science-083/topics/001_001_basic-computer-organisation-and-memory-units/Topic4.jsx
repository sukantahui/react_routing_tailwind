import React, { useState } from 'react';
import {
  Database, Zap, ShieldCheck, CheckCircle2, AlertTriangle,
  FileText, Terminal, BookOpen, Calculator, Sparkles,
  Layers, RefreshCw, Cpu, HardDrive
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";
import pythonCode from "./topic4_files/ram_rom_characteristics.py?raw";

// Interactive Memory Technology Inspector
const MemoryTechInspector = () => {
  const [selectedTech, setSelectedTech] = useState('sram');

  const techDetails = {
    sram: {
      title: "Static RAM (SRAM)",
      category: "Volatile High-Speed Memory",
      color: "border-sky-500/40 text-sky-400 bg-sky-500/10",
      cell: "6 Transistors (Bistable Flip-Flop Latch)",
      refresh: "NO Refreshing Required (Static state holds as long as power is applied)",
      speed: "0.5 – 5 Nanoseconds (Ultra-Fast)",
      cost: "Very Expensive per Megabyte",
      density: "Low Packing Density (6x larger silicon footprint)",
      role: "CPU Internal L1, L2, L3 Cache Memory",
      cbseTip: "Remember: SRAM does not need periodic refreshing because flip-flops maintain their logic state automatically."
    },
    dram: {
      title: "Dynamic RAM (DRAM)",
      category: "Volatile Main System Memory",
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
      cell: "1 Transistor + 1 Micro-Capacitor per Bit",
      refresh: "MANDATORY Continuous Refreshing (Capacitors leak electrical charge every ~64ms)",
      speed: "10 – 50 Nanoseconds (Moderate)",
      cost: "Inexpensive & Highly Economical",
      density: "Extreme Packing Density (Billions of cells per chip)",
      role: "Main System RAM (DDR4 / DDR5 Modules in Desktops & Laptops)",
      cbseTip: "DRAM uses micro-capacitors that lose charge, requiring thousands of refresh recharge pulses per second."
    },
    prom: {
      title: "Programmable ROM (PROM)",
      category: "Non-Volatile One-Time Memory",
      color: "border-amber-500/40 text-amber-400 bg-amber-500/10",
      cell: "Fusible Semiconductor Links (One-Time Programmable - OTP)",
      refresh: "Zero Refreshing Required (Non-Volatile)",
      speed: "50 – 120 Nanoseconds",
      cost: "Moderate",
      density: "Medium",
      role: "Permanent Hardware Calibration Tables & Video Game Cartridges",
      cbseTip: "Once programmed with a PROM burner (fuse blowing), contents cannot be erased or rewritten."
    },
    eprom: {
      title: "Erasable PROM (EPROM)",
      category: "Non-Volatile UV-Erasable Memory",
      color: "border-purple-500/40 text-purple-400 bg-purple-500/10",
      cell: "Floating-Gate Transistors with Quartz Crystal Window",
      refresh: "Zero Refreshing Required (Non-Volatile)",
      speed: "70 – 150 Nanoseconds",
      cost: "Moderate to High",
      density: "Medium",
      role: "Legacy Microcontroller Firmware & Industrial Controller Chips",
      cbseTip: "Erased by exposing the quartz window to intense Ultraviolet (UV) light for 15-20 minutes."
    },
    eeprom: {
      title: "Electrically Erasable PROM (EEPROM / Flash)",
      category: "Non-Volatile In-Circuit Rewritable Memory",
      color: "border-rose-500/40 text-rose-400 bg-rose-500/10",
      cell: "Floating-Gate Tunnel Oxide MOSFETs",
      refresh: "Zero Refreshing Required (Non-Volatile)",
      speed: "Read: Fast (10-30ns), Write: Slower (milliseconds)",
      cost: "Economical",
      density: "Extremely High (3D NAND Flash)",
      role: "Motherboard BIOS/UEFI Firmware, SSDs, USB Flash Drives, SD Cards",
      cbseTip: "Modern motherboards use Flash EEPROM so the BIOS can be updated electrically without removing the chip."
    }
  };

  return (
    <div className="w-full bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Database size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Primary Memory Taxonomy &amp; Technology Inspector
            </h3>
            <p className="text-xs text-slate-400">
              Select any memory family (SRAM, DRAM, PROM, EPROM, EEPROM) to inspect silicon cell physics and syllabus applications.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {[
          { key: 'sram', label: '1. SRAM', sub: 'Cache (Flip-Flop)' },
          { key: 'dram', label: '2. DRAM', sub: 'Main RAM (Capacitor)' },
          { key: 'prom', label: '3. PROM', sub: 'One-Time OTP' },
          { key: 'eprom', label: '4. EPROM', sub: 'UV Light Erasable' },
          { key: 'eeprom', label: '5. EEPROM', sub: 'Flash BIOS Firmware' }
        ].map(item => (
          <button
            key={item.key}
            onClick={() => setSelectedTech(item.key)}
            className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
              selectedTech === item.key
                ? 'bg-emerald-500/15 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/10'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="font-bold text-xs sm:text-sm text-white truncate">{item.label}</div>
            <span className="text-[10px] text-slate-400 block mt-0.5 truncate">{item.sub}</span>
          </button>
        ))}
      </div>

      {/* Selected Technology Deep Dive */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400 font-mono">▸</span> {techDetails[selectedTech].title}
          </h4>
          <span className="px-3 py-1 bg-slate-800 text-emerald-300 font-mono text-xs rounded-full border border-slate-700">
            {techDetails[selectedTech].category}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-amber-400 font-bold block mb-1">Silicon Storage Circuit:</span>
            <span className="text-slate-300">{techDetails[selectedTech].cell}</span>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-sky-400 font-bold block mb-1">Periodic Refreshing Requirement:</span>
            <span className="text-slate-300">{techDetails[selectedTech].refresh}</span>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-purple-400 font-bold block mb-1">Typical Access Latency:</span>
            <span className="text-white font-mono font-semibold">{techDetails[selectedTech].speed}</span>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-rose-400 font-bold block mb-1">Primary Real-World Role:</span>
            <span className="text-white font-semibold">{techDetails[selectedTech].role}</span>
          </div>
        </div>

        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-200 flex items-start gap-2">
          <Sparkles size={16} className="text-emerald-400 shrink-0 mt-0.5" />
          <span>{techDetails[selectedTech].cbseTip}</span>
        </div>
      </div>
    </div>
  );
};

export default function Topic4() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 001 · Topic 4
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                Unit I: Computer Systems and Organisation (10 Marks)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Memory Hierarchy: Primary Memory (RAM – SRAM vs DRAM, ROM – PROM, EPROM, EEPROM)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the physical foundations of Primary Memory. Explore the silicon physics distinguishing volatile Static RAM from Dynamic RAM, and trace the non-volatile evolution of ROM from Masked ROM and UV-EPROM to modern Flash EEPROM.
            </p>
          </div>
        </div>

        {/* 2. Deep Conceptual Explanation */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <Database className="text-emerald-400" size={24} />
            <h2 className="text-xl font-bold text-white">1. Conceptual Anatomy: RAM vs ROM Foundations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
                <Zap size={22} />
              </div>
              <h3 className="text-base font-bold text-white">Random Access Memory (RAM)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Volatile read/write storage directly addressed by the CPU. It holds the active Operating System kernel, executing applications, and dynamic variables. Data disappears the instant power is disconnected.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-base font-bold text-white">Read-Only Memory (ROM)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Non-volatile permanent storage. Retains its contents indefinitely without electrical power. Houses the Bootstrap Loader and BIOS/UEFI firmware necessary to jumpstart the computer during cold boot.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Interactive Visualizer */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="text-emerald-400" size={20} />
            <h2 className="text-lg font-bold text-white">2. Interactive Memory Taxonomy Inspector</h2>
          </div>
          <MemoryTechInspector />
        </div>

        {/* 4. Deep Technical Breakdown */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <Calculator className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">3. Technical Comparison Matrix: SRAM vs DRAM</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/80 text-emerald-300">
                  <th className="p-3 font-bold">Feature Parameter</th>
                  <th className="p-3 font-bold">Static RAM (SRAM)</th>
                  <th className="p-3 font-bold">Dynamic RAM (DRAM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">Storage Circuit</td>
                  <td className="p-3 font-mono text-sky-300">6 CMOS Transistors (Flip-Flop)</td>
                  <td className="p-3 font-mono text-emerald-300">1 Transistor + 1 Micro-Capacitor</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">Periodic Refreshing</td>
                  <td className="p-3 font-semibold text-emerald-400">NOT Required (Static)</td>
                  <td className="p-3 font-semibold text-rose-400">MANDATORY (Every ~64 ms)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">Access Latency</td>
                  <td className="p-3 font-mono text-sky-400 font-bold">0.5 – 5 Nanoseconds</td>
                  <td className="p-3 font-mono text-amber-400">10 – 50 Nanoseconds</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">Packing Density</td>
                  <td className="p-3">Low (Large silicon footprint)</td>
                  <td className="p-3 text-emerald-300 font-semibold">High (Billions of cells per die)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">Cost per Gigabyte</td>
                  <td className="p-3 text-rose-400 font-bold">Very Expensive</td>
                  <td className="p-3 text-emerald-400 font-bold">Inexpensive &amp; Affordable</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">Primary Computer Use</td>
                  <td className="p-3 font-semibold text-amber-300">CPU L1, L2, L3 Cache</td>
                  <td className="p-3 font-semibold text-sky-300">Main System RAM (DDR4/DDR5)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Code Demonstration */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Terminal className="text-emerald-400" size={20} />
            <h2 className="text-lg font-bold text-white">4. Python Code Demonstration: Primary Memory Audit</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="ram_rom_characteristics.py"
            highlightLines={[12, 18, 24, 45, 52]}
          />
        </div>

        {/* 6. Real-World Case Studies */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <BookOpen className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">5. Real-World Case Studies &amp; Scenarios</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Case 1: Sudden Power Outage in Barrackpore</span>
              <h4 className="text-sm font-bold text-white">RAM Volatility vs Non-Volatile Disk</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                If power trips while typing an essay, text residing only in RAM is wiped instantly. If Auto-Save wrote the file to the SSD, the non-volatile flash cells retain the data.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Case 2: Motherboard BIOS Flashing</span>
              <h4 className="text-sm font-bold text-white">EEPROM In-Circuit Upgradeability</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Updating your motherboard to support a newer processor applies electric voltage pulses to flash new microcode into the SPI EEPROM chip without desoldering any pins.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Case 3: Vintage Arcade Game ROMs</span>
              <h4 className="text-sm font-bold text-white">EPROM Sticker Covers</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Vintage arcade boards contained EPROM chips with silver foil stickers over the quartz window to block ambient sunlight UV rays from accidentally erasing the game code.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Case 4: Smartphone Unified Memory</span>
              <h4 className="text-sm font-bold text-white">LPDDR5 in Modern Mobile Phones</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Modern phones use Low-Power DDR5 (LPDDR5) DRAM stacked directly on top of the processor die (Package-on-Package), slashing battery consumption and trace latency.
              </p>
            </div>
          </div>
        </div>

        {/* 7. Common Pitfalls & Best Practices */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <AlertTriangle className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">6. Common Exam Pitfalls &amp; Best Practices</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertTriangle size={18} />
                <span>Common Exam Errors</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Claiming ROM is secondary storage:</strong> ROM is <em>Primary Memory</em> because it is directly byte-addressable on the system bus.</li>
                <li><strong>Saying SRAM needs refreshing:</strong> SRAM never needs refreshing; only DRAM needs continuous capacitor recharging.</li>
                <li><strong>Confusing EPROM and EEPROM erasure:</strong> EPROM uses Ultraviolet (UV) light; EEPROM uses electric voltage pulses.</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Full-Mark Strategies</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Mention physical components:</strong> State that SRAM uses <em>Flip-Flops</em> and DRAM uses <em>Capacitors</em>.</li>
                <li><strong>Define Volatility clearly:</strong> State whether memory retains or loses bits upon power disconnection.</li>
                <li><strong>Always mention BIOS/Bootstrapping:</strong> When asked about ROM, mention its role in holding the Bootstrap Loader.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 8. Hint Section */}
        <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Sparkles size={18} />
            <span>Memory Retention Tip</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Think of <strong>SRAM like a Whiteboard</strong> (stays written clearly until you erase it or turn off the lights), <strong>DRAM like a Leaky Bucket</strong> (needs a constant tap running to stay full — refreshing), and <strong>ROM like a Stone Inscription</strong> (remains engraved even in the dark!).
          </p>
        </div>

        {/* 9. Frequently Asked Questions */}
        <div className="space-y-4">
          <FAQTemplate
            title="Topic 4 · Primary Memory (RAM &amp; ROM) FAQs"
            questions={questions}
          />
        </div>

        {/* 10. Plain Text Printable Document */}
        <div className="space-y-4">
          <PlainTextPrint
            content={noteText}
            filename="topic4_primary_memory_note.txt"
            title="CBSE Class XI CS 083 – Topic 4 Revision Handbook"
            hidePreview={false}
            showDownload={true}
          />
        </div>

        {/* 11. Teacher's Note */}
        <Teacher
          note="Differences between RAM and ROM, and between SRAM and DRAM, are standard 2-mark and 3-mark questions in CBSE Class XI Computer Science (083) exams. Make sure you memorize the 6-transistor vs 1-transistor+capacitor distinction and the UV vs electrical erasure method! — Sukanta Hui"
        />

      </div>
    </div>
  );
}
