import React, { useState } from 'react';
import {
  Layers, Zap, BookOpen, Code, CheckCircle2,
  AlertTriangle, HelpCircle, ShieldCheck, FileText,
  Activity, ArrowRight, Cpu, Sparkles, Check, Play, RefreshCw
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";
import pythonCode from "./topic3_files/universal_gates_realizer.py?raw";

// Interactive Universal Realization Simulator
const UniversalGateWorkbench = () => {
  const [universalType, setUniversalType] = useState('NAND'); // 'NAND' or 'NOR'
  const [targetFunction, setTargetFunction] = useState('OR'); // 'NOT', 'AND', 'OR'
  const [inputA, setInputA] = useState(1);
  const [inputB, setInputB] = useState(0);

  // Compute realization outputs
  const computeUniversalOutput = () => {
    if (targetFunction === 'NOT') {
      return inputA === 0 ? 1 : 0;
    } else if (targetFunction === 'AND') {
      return inputA === 1 && inputB === 1 ? 1 : 0;
    } else if (targetFunction === 'OR') {
      return inputA === 1 || inputB === 1 ? 1 : 0;
    }
    return 0;
  };

  const outputVal = computeUniversalOutput();

  const getGateCount = () => {
    if (universalType === 'NAND') {
      if (targetFunction === 'NOT') return 1;
      if (targetFunction === 'AND') return 2;
      if (targetFunction === 'OR') return 3;
    } else {
      if (targetFunction === 'NOT') return 1;
      if (targetFunction === 'OR') return 2;
      if (targetFunction === 'AND') return 3;
    }
    return 1;
  };

  return (
    <div className="bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Layers size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Universal Gate Synthesis Workbench
            </h3>
            <p className="text-xs text-slate-400">
              Select universal base (NAND or NOR), choose target function (NOT, AND, OR), and verify equivalent circuit logic in real-time.
            </p>
          </div>
        </div>

        {/* Universal Selector */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setUniversalType('NAND')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
              universalType === 'NAND' ? 'bg-emerald-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            NAND Base (7400)
          </button>
          <button
            onClick={() => setUniversalType('NOR')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
              universalType === 'NOR' ? 'bg-emerald-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            NOR Base (7402)
          </button>
        </div>
      </div>

      {/* Target Function Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
          {['NOT', 'AND', 'OR'].map(f => (
            <button
              key={f}
              onClick={() => setTargetFunction(f)}
              className={`px-4 py-2 font-semibold rounded-lg transition-all cursor-pointer ${
                targetFunction === f ? 'bg-sky-500 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Synthesize {f} Gate
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
          <span className="text-slate-400">Required Gate Count:</span>
          <span className="font-mono font-bold text-amber-400 text-sm">{getGateCount()} {universalType} Gate(s)</span>
        </div>
      </div>

      {/* Circuit Simulation Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        {/* Left: Input Terminals */}
        <div className="md:col-span-4 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Input Signals:</span>

          {/* Input A */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-bold text-white">Input A:</span>
            <button
              onClick={() => setInputA(inputA === 0 ? 1 : 0)}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                inputA === 1 ? 'bg-sky-500 text-white shadow' : 'bg-slate-800 text-slate-400'
              }`}
            >
              State: {inputA} ({inputA === 1 ? 'HIGH' : 'LOW'})
            </button>
          </div>

          {/* Input B */}
          {targetFunction !== 'NOT' && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-bold text-white">Input B:</span>
              <button
                onClick={() => setInputB(inputB === 0 ? 1 : 0)}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                  inputB === 1 ? 'bg-sky-500 text-white shadow' : 'bg-slate-800 text-slate-400'
                }`}
              >
                State: {inputB} ({inputB === 1 ? 'HIGH' : 'LOW'})
              </button>
            </div>
          )}

          {/* Proof Explanation */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Algebraic Proof:</span>
            {universalType === 'NAND' && targetFunction === 'NOT' && (
              <p className="font-mono text-emerald-400">Y = (A · A)&apos; = A&apos;</p>
            )}
            {universalType === 'NAND' && targetFunction === 'AND' && (
              <p className="font-mono text-emerald-400">Y = ((A · B)&apos;)&apos; = A · B</p>
            )}
            {universalType === 'NAND' && targetFunction === 'OR' && (
              <p className="font-mono text-emerald-400">Y = (A&apos; · B&apos;)&apos; = (A&apos;)&apos; + (B&apos;)&apos; = A + B</p>
            )}
            {universalType === 'NOR' && targetFunction === 'NOT' && (
              <p className="font-mono text-emerald-400">Y = (A + A)&apos; = A&apos;</p>
            )}
            {universalType === 'NOR' && targetFunction === 'OR' && (
              <p className="font-mono text-emerald-400">Y = ((A + B)&apos;)&apos; = A + B</p>
            )}
            {universalType === 'NOR' && targetFunction === 'AND' && (
              <p className="font-mono text-emerald-400">Y = (A&apos; + B&apos;)&apos; = (A&apos;)&apos; · (B&apos;)&apos; = A · B</p>
            )}
          </div>
        </div>

        {/* Center: Dynamic Universal Circuit SVG */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[220px]">
          <svg viewBox="0 0 320 160" className="w-full max-w-[290px] h-auto">
            {/* 1. NOT using 1 Gate */}
            {targetFunction === 'NOT' && (
              <g transform="translate(40, 25)">
                {/* Tied input */}
                <line x1="0" y1="55" x2="35" y2="55" stroke={inputA === 1 ? "#38bdf8" : "#64748b"} strokeWidth="4" />
                <path d="M 35 55 L 35 35 L 70 35" stroke={inputA === 1 ? "#38bdf8" : "#64748b"} strokeWidth="3" fill="none" />
                <path d="M 35 55 L 35 75 L 70 75" stroke={inputA === 1 ? "#38bdf8" : "#64748b"} strokeWidth="3" fill="none" />
                <circle cx="35" cy="55" r="4" fill="#38bdf8" />
                <text x="5" y="45" fill="#38bdf8" fontSize="11" fontWeight="bold">A={inputA}</text>

                {/* Gate Shape */}
                {universalType === 'NAND' ? (
                  <path d="M 70 20 L 115 20 A 35 35 0 0 1 115 90 L 70 90 Z" fill="#1e293b" stroke="#10b981" strokeWidth="3" />
                ) : (
                  <path d="M 65 20 Q 85 55 65 90 Q 110 90 145 55 Q 110 20 65 20 Z" fill="#1e293b" stroke="#10b981" strokeWidth="3" />
                )}
                {/* Bubble */}
                <circle cx={universalType === 'NAND' ? "156" : "152"} cy="55" r="7" fill="#0f172a" stroke="#10b981" strokeWidth="3" />

                {/* Output */}
                <line x1="165" y1="55" x2="230" y2="55" stroke={outputVal === 1 ? "#10b981" : "#ef4444"} strokeWidth="4" />
                <text x="180" y="42" fill={outputVal === 1 ? "#10b981" : "#ef4444"} fontSize="12" fontWeight="bold">Y={outputVal}</text>
              </g>
            )}

            {/* 2. 2-Gate Cascaded Realization */}
            {((universalType === 'NAND' && targetFunction === 'AND') || (universalType === 'NOR' && targetFunction === 'OR')) && (
              <g transform="translate(10, 20)">
                {/* Inputs to Gate 1 */}
                <line x1="0" y1="35" x2="45" y2="35" stroke={inputA === 1 ? "#38bdf8" : "#64748b"} strokeWidth="3" />
                <text x="5" y="28" fill="#38bdf8" fontSize="10" fontWeight="bold">A={inputA}</text>
                <line x1="0" y1="75" x2="45" y2="75" stroke={inputB === 1 ? "#38bdf8" : "#64748b"} strokeWidth="3" />
                <text x="5" y="68" fill="#38bdf8" fontSize="10" fontWeight="bold">B={inputB}</text>

                {/* Gate 1 */}
                {universalType === 'NAND' ? (
                  <path d="M 45 20 L 80 20 A 35 35 0 0 1 80 90 L 45 90 Z" fill="#1e293b" stroke="#10b981" strokeWidth="2.5" />
                ) : (
                  <path d="M 40 20 Q 60 55 40 90 Q 80 90 110 55 Q 80 20 40 20 Z" fill="#1e293b" stroke="#10b981" strokeWidth="2.5" />
                )}
                <circle cx={universalType === 'NAND' ? "120" : "117"} cy="55" r="6" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />

                {/* Mid link & Split to Inverter */}
                <line x1="128" y1="55" x2="160" y2="55" stroke="#e2e8f0" strokeWidth="3" />
                <path d="M 160 55 L 160 38 L 180 38" stroke="#e2e8f0" strokeWidth="2.5" fill="none" />
                <path d="M 160 55 L 160 72 L 180 72" stroke="#e2e8f0" strokeWidth="2.5" fill="none" />
                <circle cx="160" cy="55" r="3" fill="#e2e8f0" />

                {/* Gate 2 (Inverter) */}
                {universalType === 'NAND' ? (
                  <path d="M 180 23 L 210 23 A 32 32 0 0 1 210 87 L 180 87 Z" fill="#1e293b" stroke="#10b981" strokeWidth="2.5" />
                ) : (
                  <path d="M 175 23 Q 195 55 175 87 Q 210 87 238 55 Q 210 23 175 23 Z" fill="#1e293b" stroke="#10b981" strokeWidth="2.5" />
                )}
                <circle cx={universalType === 'NAND' ? "247" : "244"} cy="55" r="6" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />

                {/* Final Output */}
                <line x1="254" y1="55" x2="300" y2="55" stroke={outputVal === 1 ? "#10b981" : "#ef4444"} strokeWidth="4" />
                <text x="265" y="42" fill={outputVal === 1 ? "#10b981" : "#ef4444"} fontSize="12" fontWeight="bold">Y={outputVal}</text>
              </g>
            )}

            {/* 3. 3-Gate De Morgan Realization */}
            {((universalType === 'NAND' && targetFunction === 'OR') || (universalType === 'NOR' && targetFunction === 'AND')) && (
              <g transform="translate(10, 10)">
                {/* Gate 1 (Invert A) */}
                <line x1="0" y1="28" x2="25" y2="28" stroke={inputA === 1 ? "#38bdf8" : "#64748b"} strokeWidth="2.5" />
                <path d="M 25 28 L 25 18 L 40 18" stroke={inputA === 1 ? "#38bdf8" : "#64748b"} strokeWidth="2" fill="none" />
                <path d="M 25 28 L 25 38 L 40 38" stroke={inputA === 1 ? "#38bdf8" : "#64748b"} strokeWidth="2" fill="none" />
                <text x="5" y="20" fill="#38bdf8" fontSize="9" fontWeight="bold">A={inputA}</text>
                <path d="M 40 10 L 65 10 A 18 18 0 0 1 65 46 L 40 46 Z" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <circle cx="86" cy="28" r="4" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

                {/* Gate 2 (Invert B) */}
                <line x1="0" y1="112" x2="25" y2="112" stroke={inputB === 1 ? "#38bdf8" : "#64748b"} strokeWidth="2.5" />
                <path d="M 25 112 L 25 102 L 40 102" stroke={inputB === 1 ? "#38bdf8" : "#64748b"} strokeWidth="2" fill="none" />
                <path d="M 25 112 L 25 122 L 40 122" stroke={inputB === 1 ? "#38bdf8" : "#64748b"} strokeWidth="2" fill="none" />
                <text x="5" y="104" fill="#38bdf8" fontSize="9" fontWeight="bold">B={inputB}</text>
                <path d="M 40 94 L 65 94 A 18 18 0 0 1 65 130 L 40 130 Z" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <circle cx="86" cy="112" r="4" fill="#0f172a" stroke="#10b981" strokeWidth="2" />

                {/* Connecting leads into Gate 3 */}
                <path d="M 91 28 L 150 28 L 150 55 L 175 55" stroke="#e2e8f0" strokeWidth="2.5" fill="none" />
                <path d="M 91 112 L 150 112 L 150 85 L 175 85" stroke="#e2e8f0" strokeWidth="2.5" fill="none" />

                {/* Gate 3 */}
                <path d="M 175 40 L 210 40 A 30 30 0 0 1 210 100 L 175 100 Z" fill="#1e293b" stroke="#10b981" strokeWidth="2.5" />
                <circle cx="245" cy="70" r="5" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />

                {/* Final Output */}
                <line x1="251" y1="70" x2="300" y2="70" stroke={outputVal === 1 ? "#10b981" : "#ef4444"} strokeWidth="4" />
                <text x="265" y="55" fill={outputVal === 1 ? "#10b981" : "#ef4444"} fontSize="12" fontWeight="bold">Y={outputVal}</text>
              </g>
            )}
          </svg>
        </div>

        {/* Right: Output Status */}
        <div className="md:col-span-3 flex flex-col items-center justify-center p-5 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
          <div className={`p-3.5 rounded-full ${outputVal === 1 ? 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/30 animate-pulse' : 'bg-rose-500/20 text-rose-400'}`}>
            <Zap size={32} />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Equivalent Output (Y):</span>
          <span className={`text-2xl font-mono font-extrabold ${outputVal === 1 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {outputVal === 1 ? '1 (HIGH)' : '0 (LOW)'}
          </span>
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${outputVal === 1 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'}`}>
            {targetFunction} Logic Satisfied
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Topic3() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002 · Topic 3
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                Universal Logic Gates
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Universal Logic Gates: NAND and NOR Universal Realizations
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understand why NAND and NOR gates are termed &quot;Universal Gates&quot;. Learn how any basic logic gate (NOT, AND, OR) and combinational circuit can be fabricated exclusively using NAND or NOR building blocks.
            </p>
          </div>
        </div>

        {/* 2. Deep Conceptual Explanation */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Why Universal Gates Rule Integrated Circuit Fabrication
              </h2>
              <p className="text-xs text-slate-400">
                The economic, engineering, and silicon manufacturing advantages of single-gate standard cell libraries.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">IC 7400</span>
                <span className="text-xs font-mono text-slate-400">Y = (A · B)&apos;</span>
              </div>
              <h3 className="text-base font-bold text-white">NAND Gate (NOT-AND)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Combines AND logic followed immediately by negation. Produces 0 (LOW) <strong>only when all inputs are 1</strong>. If any input is 0, the output is pulled to 1. In CMOS silicon, NAND gates use high-mobility NMOS pull-down ladders, making them ultra-fast.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">IC 7402</span>
                <span className="text-xs font-mono text-slate-400">Y = (A + B)&apos;</span>
              </div>
              <h3 className="text-base font-bold text-white">NOR Gate (NOT-OR)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Combines OR logic followed immediately by negation. Produces 1 (HIGH) <strong>only when all inputs are 0</strong>. If any input is 1, the output is immediately pulled to 0.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Interactive Workbench */}
        <UniversalGateWorkbench />

        {/* 4. Gate Count Summary Matrix */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Universal Realization Gate Count Reference Table
              </h2>
              <p className="text-xs text-slate-400">
                Minimum 2-input universal gates needed to construct each standard digital logic function.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Target Logic Gate</th>
                  <th className="p-3">NAND Gates Required</th>
                  <th className="p-3">NOR Gates Required</th>
                  <th className="p-3">Key Algebraic Identity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-white font-bold">NOT Gate (Inverter)</td>
                  <td className="p-3 text-emerald-400 font-bold">1</td>
                  <td className="p-3 text-emerald-400 font-bold">1</td>
                  <td className="p-3 text-slate-400">(A · A)&apos; = A&apos; / (A + A)&apos; = A&apos;</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-white font-bold">AND Gate</td>
                  <td className="p-3 text-emerald-400 font-bold">2</td>
                  <td className="p-3 text-amber-400 font-bold">3</td>
                  <td className="p-3 text-slate-400">((A · B)&apos;)&apos; = A · B</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-white font-bold">OR Gate</td>
                  <td className="p-3 text-amber-400 font-bold">3</td>
                  <td className="p-3 text-emerald-400 font-bold">2</td>
                  <td className="p-3 text-slate-400">(A&apos; · B&apos;)&apos; = A + B (De Morgan)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-white font-bold">XOR Gate</td>
                  <td className="p-3 text-amber-400 font-bold">4</td>
                  <td className="p-3 text-rose-400 font-bold">5</td>
                  <td className="p-3 text-slate-400">A&apos;B + AB&apos;</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-white font-bold">XNOR Gate</td>
                  <td className="p-3 text-rose-400 font-bold">5</td>
                  <td className="p-3 text-amber-400 font-bold">4</td>
                  <td className="p-3 text-slate-400">AB + A&apos;B&apos;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Python File Loader */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Code size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">
              Universal Gates Equivalence Verifier
            </h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="universal_gates_realizer.py"
            highlightLines={[19, 25, 31, 38, 44, 50]}
          />
        </div>

        {/* 6. Real-World Case Studies */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Industrial Case Studies: Why Universal Gates Dominate
              </h2>
              <p className="text-xs text-slate-400">
                Real-world semiconductor manufacturing advantages.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Case 1 · Semiconductor ASICs</span>
              <h3 className="text-base font-bold text-white">NAND Flash Memory Cells</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                All modern Solid-State Drives (SSDs) and smartphone storage use <strong>3D NAND Flash memory</strong>. The series-string structure of NAND cells enables compact silicon packing density compared to parallel NOR cells.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Case 2 · PCB Inventory Optimization</span>
              <h3 className="text-base font-bold text-white">Single-IC Microcontroller Boards</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                By purchasing a reel of 1,000 Quad NAND ICs (7400), an electronics factory can synthesize inverters, AND gates, and OR gates across different circuit boards without managing three separate part inventories.
              </p>
            </div>
          </div>
        </div>

        {/* 7. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle size={18} /> Common Examination Mistakes
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-rose-300">Confusing NAND OR with NOR AND:</strong> Realizing OR from NAND requires 3 gates. Realizing AND from NOR requires 3 gates.
              </li>
              <li>
                <strong className="text-rose-300">Missing Inversion Bubbles:</strong> Forgetting the output bubble converts a NAND into an AND gate.
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 size={18} /> Algebraic Proof Tips
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-emerald-300">Always Quote De Morgan&apos;s Law:</strong> When deriving $(A&apos; \\cdot B&apos;)&apos; = A + B$, write &quot;By De Morgan&apos;s First Law&quot; in the step margin.
              </li>
              <li>
                <strong className="text-emerald-300">Memorize the Gate Counts:</strong> 1-2-3-4-5 pattern (NAND: NOT=1, AND=2, OR=3, XOR=4, XNOR=5).
              </li>
            </ul>
          </div>
        </div>

        {/* 8. Hint Section */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3">
          <Sparkles className="text-amber-400 shrink-0 mt-0.5" size={18} />
          <div className="text-xs text-slate-300">
            <strong className="text-amber-400 font-semibold">Teacher&apos;s Memory Trick:</strong>
            <p className="mt-1">
              To remember gate count: <em>NAND builds its own kind (AND) in 2 gates</em>; it needs <em>3 gates to build its opposite (OR)</em>. Similarly, <em>NOR builds OR in 2 gates</em>, and needs <em>3 gates to build AND</em>!
            </p>
          </div>
        </div>

        {/* 9. Frequently Asked Questions */}
        <FAQTemplate
          title="CBSE Class XI Computer Science (083) – Universal Logic Gates FAQs"
          questions={questions}
        />

        {/* 10. Plain Text Printable Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XI CS 083 – Universal Logic Gates Quick Revision"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 3 Plain Text Note"
          downloadFileName="topic3_note.txt"
        />

        {/* 11. Teacher's Note */}
        <Teacher
          note="Universal gate realization questions are a favorite in CBSE Class XI CS 083 theory exams. When asked to 'Realize an OR gate using only NAND gates', always sketch the 3-gate circuit clearly and write out the algebraic proof step-by-step: Y = (A' · B')' = (A')' + (B')' = A + B. — Sukanta Hui"
        />

      </div>
    </div>
  );
}
