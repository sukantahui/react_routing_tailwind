import React, { useState } from 'react';
import {
  Binary, Calculator, Hash, ArrowRight, RefreshCw,
  BookOpen, Code, CheckCircle2, AlertTriangle, HelpCircle,
  ShieldCheck, FileText, Sparkles, Terminal, Layers
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/radix_converter_suite.py?raw";

// Interactive Live Radix Converter Calculator Component
const LiveRadixConverter = () => {
  const [decimalInput, setDecimalInput] = useState(156);

  const dec = Math.max(0, Math.floor(Number(decimalInput) || 0));
  const binStr = dec.toString(2);
  const octStr = dec.toString(8);
  const hexStr = dec.toString(16).toUpperCase();

  // Generate division steps for Decimal to Binary
  const generateDivisionSteps = (num, base) => {
    if (num === 0) return [{ current: 0, quotient: 0, rem: 0 }];
    const steps = [];
    let cur = num;
    while (cur > 0) {
      const q = Math.floor(cur / base);
      const r = cur % base;
      const symbol = r > 9 ? String.fromCharCode(55 + r) : r;
      steps.push({ current: cur, quotient: q, remainder: symbol });
      cur = q;
    }
    return steps;
  };

  const binSteps = generateDivisionSteps(dec, 2);

  return (
    <div className="w-full bg-slate-950/90 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Multi-Base Radix Calculator &amp; Step Visualizer
            </h3>
            <p className="text-xs text-slate-400">
              Type any positive decimal number to dynamically view binary, octal, hexadecimal representations and step-by-step division.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-md">
        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Enter Decimal Number (Base 10):</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            max="1000000"
            value={decimalInput}
            onChange={(e) => setDecimalInput(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-base text-white focus:outline-none focus:border-sky-500 font-mono font-bold"
            placeholder="e.g. 156"
          />
          <button
            onClick={() => setDecimalInput(Math.floor(Math.random() * 255) + 1)}
            className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 shrink-0"
          >
            <RefreshCw size={14} /> Random
          </button>
        </div>
      </div>

      {/* Output Radix Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-sky-950/30 p-4 rounded-xl border border-sky-500/40 space-y-1">
          <div className="flex items-center justify-between text-xs text-sky-400 font-semibold">
            <span>BINARY (Base 2)</span>
            <span className="font-mono text-[10px] bg-sky-500/20 px-2 py-0.5 rounded">0b</span>
          </div>
          <p className="text-lg font-mono font-extrabold text-white tracking-wider break-all">
            {binStr} <sub className="text-sky-400 text-xs font-sans">2</sub>
          </p>
          <span className="text-[11px] text-slate-400 block pt-1">Grouping: {binStr.replace(/(.{4})/g, '$1 ').trim()}</span>
        </div>

        <div className="bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/40 space-y-1">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold">
            <span>OCTAL (Base 8)</span>
            <span className="font-mono text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">0o</span>
          </div>
          <p className="text-lg font-mono font-extrabold text-white tracking-wider">
            {octStr} <sub className="text-emerald-400 text-xs font-sans">8</sub>
          </p>
          <span className="text-[11px] text-slate-400 block pt-1">3-bit chunks: {octStr.split('').map(d => Number(d).toString(2).padStart(3, '0')).join(' ')}</span>
        </div>

        <div className="bg-purple-950/30 p-4 rounded-xl border border-purple-500/40 space-y-1">
          <div className="flex items-center justify-between text-xs text-purple-400 font-semibold">
            <span>HEXADECIMAL (Base 16)</span>
            <span className="font-mono text-[10px] bg-purple-500/20 px-2 py-0.5 rounded">0x</span>
          </div>
          <p className="text-lg font-mono font-extrabold text-white tracking-wider">
            {hexStr} <sub className="text-purple-400 text-xs font-sans">16</sub>
          </p>
          <span className="text-[11px] text-slate-400 block pt-1">4-bit nibbles: {hexStr.split('').map(d => parseInt(d, 16).toString(2).padStart(4, '0')).join(' ')}</span>
        </div>
      </div>

      {/* Step-by-Step Repeated Division Visualizer */}
      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Binary size={15} className="text-sky-400" /> Repeated Division by 2 (Decimal {dec} → Binary)
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2 px-3">Division Expression</th>
                <th className="py-2 px-3">Quotient</th>
                <th className="py-2 px-3 text-sky-400 font-bold">Remainder</th>
                <th className="py-2 px-3">Significance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {binSteps.map((step, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30">
                  <td className="py-2 px-3">{step.current} ÷ 2</td>
                  <td className="py-2 px-3">{step.quotient}</td>
                  <td className="py-2 px-3 font-bold text-sky-300">{step.remainder}</td>
                  <td className="py-2 px-3 text-slate-400 text-[11px]">
                    {idx === 0 ? 'LSB (Least Significant Bit)' : idx === binSteps.length - 1 ? 'MSB (Most Significant Bit)' : `Bit position ${idx}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
          <span>Read remainders from <strong>BOTTOM (MSB) to TOP (LSB)</strong>:</span>
          <span className="font-mono font-bold text-sky-400">({binStr})₂</span>
        </div>
      </div>
    </div>
  );
};

export default function Topic0() {
  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* SECTION 1: HEADER & BREADCRUMB */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/50 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
                Unit I: CSO · 10 Marks
              </span>
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                Module 002_001 · Topic 0
              </span>
              <span className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-full">
                CBSE Core + Enrichment
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Number Systems &amp; Radix Conversions: Binary, Octal, Decimal &amp; Hexadecimal
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
              Master the mathematical foundations of digital data representation. Learn rigorous integer radix conversions, 3-bit octal / 4-bit hexadecimal shortcuts, and fractional base transformations.
            </p>
          </div>
        </div>

        {/* SECTION 2: IN SIMPLE WORDS */}
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">In Simple Words: Counting in Different Currencies</h2>
              <p className="text-xs text-slate-400">Understanding positional weights and number system bases</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Humans count in <strong>Decimal (Base 10)</strong> because we evolved with 10 fingers. Computers, however, operate using electronic transistors that only understand two physical states: <strong>ON (1)</strong> and <strong>OFF (0)</strong>. Octal (Base 8) and Hexadecimal (Base 16) are convenient shorthand dialects designed for humans to write long binary bitstreams cleanly.
          </p>
        </div>

        {/* SECTION 3: INTERACTIVE RADIX CALCULATOR */}
        <div className="space-y-4">
          <LiveRadixConverter />
        </div>

        {/* SECTION 4: FRACTIONAL RADIX CONVERSIONS (ENRICHMENT) */}
        <div className="bg-slate-900/60 p-6 rounded-2xl border border-purple-500/30 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
              Enrichment / Advanced Concept
            </span>
            <h3 className="text-base font-bold text-white">Fractional Radix Conversions (Successive Multiplication)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-sky-400 text-sm">Fractional Decimal to Binary</span>
              <p className="leading-relaxed">
                To convert $(0.625)_{10}$ to binary, multiply by 2 successively and extract the integer portion:
              </p>
              <div className="font-mono bg-slate-900 p-2 rounded text-[11px] space-y-0.5">
                <div>0.625 × 2 = 1.250 → Extracted: <strong>1</strong></div>
                <div>0.250 × 2 = 0.500 → Extracted: <strong>0</strong></div>
                <div>0.500 × 2 = 1.000 → Extracted: <strong>1</strong> (Done)</div>
                <div className="text-emerald-400 pt-1">Read Top-to-Bottom: (0.101)₂</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400 text-sm">Fractional Binary to Decimal</span>
              <p className="leading-relaxed">
                Multiply digits following the radix point by decreasing negative powers of 2 ($2^{-1}=0.5$, $2^{-2}=0.25$, $2^{-3}=0.125$):
              </p>
              <div className="font-mono bg-slate-900 p-2 rounded text-[11px] space-y-0.5">
                <div>(0.101)₂ = 1×2⁻¹ + 0×2⁻² + 1×2⁻³</div>
                <div>= 0.5 + 0 + 0.125</div>
                <div className="text-sky-400 pt-1">= (0.625)₁₀</div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: PYTHON LAB SCRIPT */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Code size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Python Laboratory: Automated Radix Conversion Suite
              </h2>
              <p className="text-xs text-slate-400">
                A Python script executing integer repeated division and fractional successive multiplication algorithms.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <PythonFileLoader
              fileModule={pythonCode}
              title="radix_converter_suite.py – Radix Mathematics & Fractional Engine"
              highlightLines={[12, 24, 38, 55]}
            />
          </div>
        </div>

        {/* SECTION 6: REAL WORLD CASE STUDIES */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Hash size={18} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Real-World Case Studies: Number Systems in Engineering
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-sky-400">1. HTML/CSS Hex Color Codes</span>
              <p className="text-slate-300 leading-relaxed">
                Colors are represented by 24-bit RGB values. `#38BDF8` breaks into three 8-bit hex pairs: Red `38` (56), Green `BD` (189), and Blue `F8` (248).
              </p>
            </div>

            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400">2. Unix File Permissions (Octal)</span>
              <p className="text-slate-300 leading-relaxed">
                Linux permissions (`chmod 755`) use 3-digit octal. `7` = `111` (Read, Write, Execute), `5` = `101` (Read, Execute).
              </p>
            </div>

            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-purple-400">3. IPv6 &amp; MAC Addresses</span>
              <p className="text-slate-300 leading-relaxed">
                Hardware Network MAC addresses (`00:1A:2B:3C:4D:5E`) utilize 48-bit hexadecimal strings to uniquely identify network interface cards.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 7: COMMON PITFALLS & EXAM ALERTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
              <AlertTriangle size={16} /> Common Examination Pitfalls
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span><strong>Reading Remainders Downwards:</strong> When converting decimal to binary/octal/hex, write remainders from <strong>bottom to top</strong> (MSB to LSB).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span><strong>Invalid Digits in Base:</strong> Writing digit 8 in octal or G in hexadecimal. Octal digits are only 0–7; Hex digits are 0–9 and A–F.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices &amp; Answering Strategy
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Use 3-bit / 4-bit Grouping:</strong> Convert Octal ↔ Binary in 3-bit chunks; Hexadecimal ↔ Binary in 4-bit nibbles.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Pad with Leading Zeros:</strong> Always pad integer binary groupings on the left (e.g. `11` → `0011` for hex or `011` for octal).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 8: FAQ ASSESSMENT */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              <HelpCircle size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Exam Preparation &amp; Conceptual Self-Assessment (25 Questions)
              </h2>
              <p className="text-xs text-slate-400">
                Test your mastery of number system conversions, binary math, and hexadecimal representation.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <FAQTemplate questions={questions} />
          </div>
        </div>

        {/* SECTION 9: TEACHER'S NOTE & PRINTABLE SUMMARY */}
        <div className="space-y-6">
          <Teacher />

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <PlainTextPrint
              content={noteText}
              filename="002_001_number_systems_conversion_notes.txt"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
