import React, { useState } from 'react';
import {
  Calculator, Layers, CheckCircle2, AlertTriangle,
  HelpCircle, FileText, Terminal, BookOpen, Sparkles,
  Database, ArrowRight, ArrowLeftRight, RefreshCw
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";
import pythonCode from "./topic7_files/memory_unit_converter.py?raw";

// Interactive Memory Unit Conversion Engine
const MemoryUnitConverter = () => {
  const [inputValue, setInputValue] = useState(1);
  const [fromUnit, setFromUnit] = useState('GB');

  const unitMultipliers = {
    Bit: 1 / 8,
    Nibble: 4 / 8,
    Byte: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4,
    PB: 1024 ** 5,
    EB: 1024 ** 6,
    ZB: 1024 ** 7,
    YB: 1024 ** 8
  };

  const baseBytes = Number(inputValue || 0) * (unitMultipliers[fromUnit] || 1);

  const formatNumber = (num) => {
    if (num === 0) return "0";
    if (num < 0.000001 || num >= 1e12) {
      return num.toExponential(4);
    }
    return num.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  return (
    <div className="w-full bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Calculator size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Digital Memory Unit Conversion Engine
            </h3>
            <p className="text-xs text-slate-400">
              Enter any quantity and unit to instantly calculate binary (2¹⁰ = 1024) and decimal storage equivalencies.
            </p>
          </div>
        </div>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Enter Storage Quantity:</label>
          <input
            type="number"
            min="0"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-amber-500"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Select Input Unit:</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-amber-300 font-bold font-mono text-sm focus:outline-none focus:border-amber-500"
          >
            {Object.keys(unitMultipliers).map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Grid */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
          Computed Equivalencies Across Complete Hierarchy:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {Object.entries(unitMultipliers).map(([unit, mult]) => {
            const val = baseBytes / mult;
            return (
              <div
                key={unit}
                className={`p-3 rounded-xl border text-xs transition ${
                  fromUnit === unit
                    ? 'bg-amber-500/15 border-amber-500/80 text-amber-200'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex justify-between items-center text-slate-400 font-mono text-[11px] mb-1">
                  <span className="font-bold text-white">{unit}</span>
                  <span>{mult >= 1 ? `2^${Math.round(Math.log2(mult))} B` : ''}</span>
                </div>
                <div className="font-mono font-bold text-sm text-white truncate">
                  {formatNumber(val)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Power of 2 Quick Reference */}
      <div className="bg-gradient-to-r from-slate-900 to-amber-950/30 border border-amber-500/30 rounded-xl p-4 text-xs space-y-2">
        <span className="font-bold text-amber-300 flex items-center gap-1.5">
          <Sparkles size={14} />
          <span>CBSE Exam Formula Cheat Sheet:</span>
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px] text-slate-300">
          <div>1 KB = 2^10 Bytes (1,024 B)</div>
          <div>1 MB = 2^20 Bytes (1,024 KB)</div>
          <div>1 GB = 2^30 Bytes (1,024 MB)</div>
          <div>1 TB = 2^40 Bytes (1,024 GB)</div>
          <div>1 PB = 2^50 Bytes (1,024 TB)</div>
          <div>1 EB = 2^60 Bytes (1,024 PB)</div>
          <div>1 ZB = 2^70 Bytes (1,024 EB)</div>
          <div>1 YB = 2^80 Bytes (1,024 ZB)</div>
        </div>
      </div>
    </div>
  );
};

export default function Topic7() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 001 · Topic 7
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                Unit I: Computer Systems and Organisation (10 Marks)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Units of Memory Measurement: Bit, Nibble, Byte, KB, MB, GB, TB, PB, EB, ZB, YB &amp; Conversion Formulas
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the universal mathematical language of digital storage. Learn exact powers-of-two conversions, understand why 1 KB = 1024 Bytes in binary architecture, and solve board exam numerical word problems with confidence.
            </p>
          </div>
        </div>

        {/* 2. Deep Conceptual Explanation */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <Layers className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">1. Fundamental Units of Digital Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold font-mono">
                0/1
              </div>
              <h3 className="text-base font-bold text-white">Bit (Binary Digit)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The atomic unit of digital computing. Represents a single electrical high/low voltage state (Logic 0 or Logic 1).
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold font-mono">
                4b
              </div>
              <h3 className="text-base font-bold text-white">Nibble (4 Bits)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A grouping of exactly 4 bits. Encodes one single Hexadecimal digit (0 through F) or one BCD numeral.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono">
                8b
              </div>
              <h3 className="text-base font-bold text-white">Byte (8 Bits)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A group of 8 bits (2 Nibbles). The fundamental addressable unit of memory in modern CPUs, sufficient to store 1 ASCII character.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Interactive Visualizer */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calculator className="text-amber-400" size={20} />
            <h2 className="text-lg font-bold text-white">2. Interactive Memory Unit Conversion Engine</h2>
          </div>
          <MemoryUnitConverter />
        </div>

        {/* 4. Deep Technical Breakdown */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <Calculator className="text-sky-400" size={24} />
            <h2 className="text-xl font-bold text-white">3. Complete Memory Hierarchy &amp; Exponent Conversion Table</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/80 text-amber-300">
                  <th className="p-3 font-bold">Unit Name</th>
                  <th className="p-3 font-bold">Symbol</th>
                  <th className="p-3 font-bold">Power of 2 (Binary)</th>
                  <th className="p-3 font-bold">Exact Bytes</th>
                  <th className="p-3 font-bold">Immediate Multiplier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">Kilobyte</td>
                  <td className="p-3 font-mono text-sky-400">KB</td>
                  <td className="p-3 font-mono text-emerald-400">2^10 Bytes</td>
                  <td className="p-3 font-mono">1,024 Bytes</td>
                  <td className="p-3">1,024 Bytes</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">Megabyte</td>
                  <td className="p-3 font-mono text-sky-400">MB</td>
                  <td className="p-3 font-mono text-emerald-400">2^20 Bytes</td>
                  <td className="p-3 font-mono">1,048,576 Bytes</td>
                  <td className="p-3">1,024 KB</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">Gigabyte</td>
                  <td className="p-3 font-mono text-sky-400">GB</td>
                  <td className="p-3 font-mono text-emerald-400">2^30 Bytes</td>
                  <td className="p-3 font-mono">1,073,741,824 Bytes</td>
                  <td className="p-3">1,024 MB</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">Terabyte</td>
                  <td className="p-3 font-mono text-sky-400">TB</td>
                  <td className="p-3 font-mono text-emerald-400">2^40 Bytes</td>
                  <td className="p-3 font-mono">1,099,511,627,776 Bytes</td>
                  <td className="p-3">1,024 GB</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">Petabyte</td>
                  <td className="p-3 font-mono text-sky-400">PB</td>
                  <td className="p-3 font-mono text-emerald-400">2^50 Bytes</td>
                  <td className="p-3 font-mono">1,125,899,906,842,624 Bytes</td>
                  <td className="p-3">1,024 TB</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">Exabyte</td>
                  <td className="p-3 font-mono text-sky-400">EB</td>
                  <td className="p-3 font-mono text-emerald-400">2^60 Bytes</td>
                  <td className="p-3 font-mono">~1.152 × 10^18 Bytes</td>
                  <td className="p-3">1,024 PB</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">Zettabyte</td>
                  <td className="p-3 font-mono text-sky-400">ZB</td>
                  <td className="p-3 font-mono text-emerald-400">2^70 Bytes</td>
                  <td className="p-3 font-mono">~1.180 × 10^21 Bytes</td>
                  <td className="p-3">1,024 EB</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">Yottabyte</td>
                  <td className="p-3 font-mono text-sky-400">YB</td>
                  <td className="p-3 font-mono text-emerald-400">2^80 Bytes</td>
                  <td className="p-3 font-mono">~1.208 × 10^24 Bytes</td>
                  <td className="p-3">1,024 ZB</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Code Demonstration */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Terminal className="text-emerald-400" size={20} />
            <h2 className="text-lg font-bold text-white">4. Python Code Demonstration: Conversion Calculator</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="memory_unit_converter.py"
            highlightLines={[12, 18, 48, 55, 62]}
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
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Case 1: The "Missing" GB on Hard Drives</span>
              <h4 className="text-sm font-bold text-white">1 TB HDD Shows Only 931 GB in Windows</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                HDD packaging uses decimal SI (10¹² = 1,000,000,000,000 bytes). Windows calculates in binary base-2 (1024³), showing 10¹² / 1024³ ≈ 931.32 GB.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Case 2: Internet Speed vs Download Speed</span>
              <h4 className="text-sm font-bold text-white">100 Mbps Broadband Downloads at 12.5 MB/s</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                ISPs advertise in Megabits (Mbps with lowercase 'b'). File downloads measure in Megabytes (MB/s with capital 'B'). 100 Mbps / 8 = 12.5 MB/s.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Case 3: YouTube Global Video Storage</span>
              <h4 className="text-sm font-bold text-white">Exabytes Uploaded Daily</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                With 500 hours of video uploaded every minute globally, video platforms ingest multiple Exabytes (EB) of raw video streams every month across distributed datacenters.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Case 4: Smartphone Camera Raw Photos</span>
              <h4 className="text-sm font-bold text-white">50 Megapixel RAW Image Sizes</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                A 50 MP smartphone camera capturing 14-bit RAW color depth produces a 75 Megabyte (MB) file per single photo, filling a 128 GB phone after only ~1,700 shots.
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
                <span>Common Calculation Mistakes</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Multiplying by 1000 instead of 1024:</strong> In CBSE exams, always multiply or divide by 1024 (2¹⁰).</li>
                <li><strong>Forgetting to multiply Bytes by 8 to get Bits:</strong> A Byte is 8 bits, not 1 bit.</li>
                <li><strong>Confusing Nibble with Byte:</strong> 1 Nibble = 4 bits (1/2 byte).</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Best Practice Steps</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Show powers of 2 clearly:</strong> Write 1 TB = 2⁴⁰ Bytes, 1 GB = 2³⁰ Bytes, 1 MB = 2²⁰ Bytes.</li>
                <li><strong>Include complete intermediate steps:</strong> In word problems, write out unit cancellations step-by-step.</li>
                <li><strong>State binary justification:</strong> Mention that 1024 is used because computer memory addressing relies on base-2 binary numbering.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 8. Hint Section */}
        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Sparkles size={18} />
            <span>Mnemonic for Memory Hierarchy Order</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Remember: <strong>"King Mary Gave The Prince Every Zebra Yearly"</strong> (<strong>K</strong>B ➔ <strong>M</strong>B ➔ <strong>G</strong>B ➔ <strong>T</strong>B ➔ <strong>P</strong>B ➔ <strong>E</strong>B ➔ <strong>Z</strong>B ➔ <strong>Y</strong>B)!
          </p>
        </div>

        {/* 9. Frequently Asked Questions */}
        <div className="space-y-4">
          <FAQTemplate
            title="Topic 7 · Units of Memory Measurement FAQs"
            questions={questions}
          />
        </div>

        {/* 10. Plain Text Printable Document */}
        <div className="space-y-4">
          <PlainTextPrint
            content={noteText}
            filename="topic7_memory_units_note.txt"
            title="CBSE Class XI CS 083 – Topic 7 Revision Handbook"
            hidePreview={false}
            showDownload={true}
          />
        </div>

        {/* 11. Teacher's Note */}
        <Teacher
          note="Questions like 'How many 4 MB files can fit on a 16 GB pendrive?' or 'Convert 2 TB into Kilobytes' are guaranteed 1-mark and 2-mark scoring questions in CBSE Class XI Computer Science (083). Always convert to common base units (Bytes or MB) before dividing! — Sukanta Hui"
        />

      </div>
    </div>
  );
}
