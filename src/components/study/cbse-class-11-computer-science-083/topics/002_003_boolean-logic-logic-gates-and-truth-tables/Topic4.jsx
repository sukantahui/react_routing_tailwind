import React, { useState } from 'react';
import {
  Sparkles, Zap, BookOpen, Code, CheckCircle2,
  AlertTriangle, HelpCircle, ShieldCheck, FileText,
  Activity, ArrowRight, Layers, Cpu, Check, Play, Lock
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";
import pythonCode from "./topic4_files/xor_xnor_gate_simulator.py?raw";

// Interactive XOR/XNOR and Two-Way Staircase Switch Component
const SpecialGatesSandbox = () => {
  const [selectedGate, setSelectedGate] = useState('XOR'); // 'XOR' or 'XNOR'
  const [inputA, setInputA] = useState(0);
  const [inputB, setInputB] = useState(1);

  // Compute logic gate output
  const outputVal = selectedGate === 'XOR' ? (inputA ^ inputB) : (inputA === inputB ? 1 : 0);

  return (
    <div className="bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <Sparkles size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Exclusive Logic Gates &amp; Staircase Switch Simulator
            </h3>
            <p className="text-xs text-slate-400">
              Explore XOR (Inequality detector / Odd parity) and XNOR (Equivalence / Coincidence detector) logic.
            </p>
          </div>
        </div>

        {/* Gate Selector */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setSelectedGate('XOR')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
              selectedGate === 'XOR' ? 'bg-purple-500 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            XOR Gate (7486)
          </button>
          <button
            onClick={() => setSelectedGate('XNOR')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
              selectedGate === 'XNOR' ? 'bg-purple-500 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            XNOR Gate (74266)
          </button>
        </div>
      </div>

      {/* Simulation Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        {/* Input Terminals */}
        <div className="md:col-span-4 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Input Signals:</span>

          {/* Input A */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-bold text-white">Switch / Input A:</span>
            <button
              onClick={() => setInputA(inputA === 0 ? 1 : 0)}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                inputA === 1 ? 'bg-purple-500 text-white shadow' : 'bg-slate-800 text-slate-400'
              }`}
            >
              State: {inputA} ({inputA === 1 ? 'HIGH' : 'LOW'})
            </button>
          </div>

          {/* Input B */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-bold text-white">Switch / Input B:</span>
            <button
              onClick={() => setInputB(inputB === 0 ? 1 : 0)}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                inputB === 1 ? 'bg-purple-500 text-white shadow' : 'bg-slate-800 text-slate-400'
              }`}
            >
              State: {inputB} ({inputB === 1 ? 'HIGH' : 'LOW'})
            </button>
          </div>

          {/* Equation & Rule */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Algebraic Expression:</span>
            <p className="font-mono text-purple-400 font-bold">
              {selectedGate === 'XOR' ? "Y = A ⊕ B = A'B + AB'" : "Y = (A ⊕ B)' = AB + A'B'"}
            </p>
            <p className="text-[11px] text-slate-400">
              {selectedGate === 'XOR'
                ? "Outputs 1 if inputs are DIFFERENT (0,1 or 1,0)."
                : "Outputs 1 if inputs are IDENTICAL (0,0 or 1,1)."}
            </p>
          </div>
        </div>

        {/* Center: ANSI Gate SVG Schematic */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[220px]">
          <svg viewBox="0 0 320 160" className="w-full max-w-[280px] h-auto">
            {/* Input lines */}
            <line x1="0" y1="45" x2="52" y2="45" stroke={inputA === 1 ? "#c084fc" : "#64748b"} strokeWidth="3.5" />
            <text x="10" y="36" fill="#c084fc" fontSize="11" fontWeight="bold">A={inputA}</text>

            <line x1="0" y1="95" x2="52" y2="95" stroke={inputB === 1 ? "#c084fc" : "#64748b"} strokeWidth="3.5" />
            <text x="10" y="86" fill="#c084fc" fontSize="11" fontWeight="bold">B={inputB}</text>

            {/* Extra curved input arch line for XOR/XNOR */}
            <path
              d="M 52 20 Q 75 70 52 120"
              stroke="#c084fc"
              strokeWidth="3.5"
              fill="none"
            />

            {/* Main OR body */}
            <path
              d="M 68 20 Q 92 70 68 120 Q 120 120 170 70 Q 120 20 68 20 Z"
              fill="#1e293b"
              stroke="#c084fc"
              strokeWidth="3"
            />

            {/* Inversion Bubble for XNOR */}
            {selectedGate === 'XNOR' && (
              <circle cx="178" cy="70" r="7" fill="#0f172a" stroke="#c084fc" strokeWidth="3" />
            )}

            {/* Output line */}
            <line
              x1={selectedGate === 'XNOR' ? "185" : "170"}
              y1="70"
              x2="245"
              y2="70"
              stroke={outputVal === 1 ? "#10b981" : "#ef4444"}
              strokeWidth="4"
            />
            <text x="195" y="56" fill={outputVal === 1 ? "#10b981" : "#ef4444"} fontSize="12" fontWeight="bold">Y={outputVal}</text>
          </svg>
        </div>

        {/* Right: Output Status */}
        <div className="md:col-span-3 flex flex-col items-center justify-center p-5 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
          <div className={`p-3.5 rounded-full ${outputVal === 1 ? 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/30 animate-pulse' : 'bg-rose-500/20 text-rose-400'}`}>
            <Zap size={32} />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gate Output (Y):</span>
          <span className={`text-2xl font-mono font-extrabold ${outputVal === 1 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {outputVal === 1 ? '1 (HIGH)' : '0 (LOW)'}
          </span>
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${outputVal === 1 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'}`}>
            {inputA === inputB ? 'Identical Inputs' : 'Different Inputs'}
          </span>
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
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002 · Topic 4
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Special Logic Gates
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Special Logic Gates: Exclusive-OR (XOR) and Exclusive-NOR (XNOR)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore the mathematical definitions, circuit symbols, truth tables, and applications of XOR and XNOR gates. Learn how XOR powers binary adders, parity checkers, and controlled inverters.
            </p>
          </div>
        </div>

        {/* 2. Deep Conceptual Explanation */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                XOR vs XNOR: Inequality vs Equivalence
              </h2>
              <p className="text-xs text-slate-400">
                How exclusive operations detect parity and compute single-bit binary sums.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30">IC 7486</span>
                <span className="text-xs font-mono text-slate-400">Y = A ⊕ B</span>
              </div>
              <h3 className="text-base font-bold text-white">XOR Gate (Exclusive-OR)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Known as the <strong>Inequality Detector</strong> or <strong>Odd Parity Detector</strong>. It yields 1 if exactly one input is 1 (inputs are different: $0,1$ or $1,0$).
              </p>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
                Boolean Sum of Products: Y = A&apos;B + AB&apos;
              </div>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">IC 74266</span>
                <span className="text-xs font-mono text-slate-400">Y = A ⊙ B</span>
              </div>
              <h3 className="text-base font-bold text-white">XNOR Gate (Exclusive-NOR)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Known as the <strong>Equivalence Gate</strong> or <strong>Coincidence Detector</strong>. It yields 1 if both inputs are equal ($0,0$ or $1,1$).
              </p>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
                Boolean Sum of Products: Y = AB + A&apos;B&apos;
              </div>
            </div>
          </div>
        </div>

        {/* 3. Interactive Sandbox */}
        <SpecialGatesSandbox />

        {/* 4. Truth Table & Identity Breakdown */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Comparison Matrix &amp; Key Algebraic Identities
              </h2>
              <p className="text-xs text-slate-400">
                High-yield identities tested in CBSE Class XI Computer Science (083) examinations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Input A</th>
                    <th className="p-3">Input B</th>
                    <th className="p-3">XOR (A ⊕ B)</th>
                    <th className="p-3">XNOR (A ⊙ B)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-3">0</td>
                    <td className="p-3">0</td>
                    <td className="p-3 text-rose-400 font-bold">0</td>
                    <td className="p-3 text-emerald-400 font-bold">1</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-3">0</td>
                    <td className="p-3">1</td>
                    <td className="p-3 text-emerald-400 font-bold">1</td>
                    <td className="p-3 text-rose-400 font-bold">0</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-3">1</td>
                    <td className="p-3">0</td>
                    <td className="p-3 text-emerald-400 font-bold">1</td>
                    <td className="p-3 text-rose-400 font-bold">0</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-3">1</td>
                    <td className="p-3">1</td>
                    <td className="p-3 text-rose-400 font-bold">0</td>
                    <td className="p-3 text-emerald-400 font-bold">1</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider">Golden XOR Identities:</h3>
              <ul className="space-y-2 font-mono text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">&bull;</span>
                  <span>A ⊕ 0 = A <span className="text-slate-500">(Pass-through buffer)</span></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">&bull;</span>
                  <span>A ⊕ 1 = A&apos; <span className="text-slate-500">(Controlled Inverter)</span></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">&bull;</span>
                  <span>A ⊕ A = 0 <span className="text-slate-500">(Self-cancellation)</span></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">&bull;</span>
                  <span>A ⊕ A&apos; = 1 <span className="text-slate-500">(Always different)</span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 5. Python File Loader */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Code size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">
              XOR &amp; XNOR Simulator &amp; Half Adder Engine
            </h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="xor_xnor_gate_simulator.py"
            highlightLines={[15, 19, 23, 29, 30]}
          />
        </div>

        {/* 6. Real-World Applications */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Engineering &amp; Cryptographic Applications
              </h2>
              <p className="text-xs text-slate-400">
                Where XOR and XNOR are used in microprocessors and network protocols.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Arithmetic Unit</span>
              <h3 className="text-base font-bold text-white">Binary Adder Sum Bit</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                In CPU Arithmetic Logic Units (ALUs), the sum bit of binary addition is computed using XOR: <code className="text-purple-300">Sum = A ⊕ B</code>.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Data Integrity</span>
              <h3 className="text-base font-bold text-white">Parity Error Detection</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                XOR trees calculate parity bits appended to data packets to detect single-bit noise corruption across serial communication buses.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Cryptography</span>
              <h3 className="text-base font-bold text-white">Stream Cipher Encryption</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Because <code className="text-emerald-300">(Data ⊕ Key) ⊕ Key = Data</code>, XOR is the fundamental core of one-time pad and AES stream encryption.
              </p>
            </div>
          </div>
        </div>

        {/* 7. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle size={18} /> Common Mistakes
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-rose-300">Confusing XOR with OR for (1, 1):</strong> In standard OR, <code className="font-mono text-rose-300">1 + 1 = 1</code>. In XOR, <code className="font-mono text-rose-300">1 ⊕ 1 = 0</code>!
              </li>
              <li>
                <strong className="text-rose-300">Missing the Arch Line:</strong> Drawing an XOR gate without the detached input curved arch makes it look like a regular OR gate.
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 size={18} /> Pro Exam Tips
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-emerald-300">Memorize the SOP forms:</strong> XOR = <code className="font-mono text-emerald-300">A&apos;B + AB&apos;</code>; XNOR = <code className="font-mono text-emerald-300">AB + A&apos;B&apos;</code>.
              </li>
              <li>
                <strong className="text-emerald-300">Odd vs Even 1s:</strong> Multi-input XOR produces 1 when the count of 1s is odd.
              </li>
            </ul>
          </div>
        </div>

        {/* 8. Hint Section */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3">
          <Sparkles className="text-amber-400 shrink-0 mt-0.5" size={18} />
          <div className="text-xs text-slate-300">
            <strong className="text-amber-400 font-semibold">Teacher&apos;s Memory Hook:</strong>
            <p className="mt-1">
              Think of XOR as the &quot;Exclusive&quot; choice: you can have soup <em>OR</em> salad, but <strong>not both</strong> (1,1 gives 0). XNOR is the &quot;Twin Matcher&quot;: 0,0 and 1,1 give 1.
            </p>
          </div>
        </div>

        {/* 9. Frequently Asked Questions */}
        <FAQTemplate
          title="CBSE Class XI Computer Science (083) – XOR & XNOR Gate FAQs"
          questions={questions}
        />

        {/* 10. Plain Text Printable Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XI CS 083 – Special Logic Gates Quick Revision"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 4 Plain Text Note"
          downloadFileName="topic4_note.txt"
        />

        {/* 11. Teacher's Note */}
        <Teacher
          note="XOR and XNOR gates are essential in both digital arithmetic and data transmission questions for CBSE Class XI CS 083. Remember the algebraic expansion: XOR is A'B + AB' and XNOR is AB + A'B'. Be prepared to trace multi-input XOR parity questions! — Sukanta Hui"
        />

      </div>
    </div>
  );
}
