import React, { useState } from 'react';
import {
  Sparkles, Zap, BookOpen, Code, CheckCircle2,
  AlertTriangle, HelpCircle, ShieldCheck, FileText,
  Activity, ArrowRight, Layers, Cpu, Check, Play, RefreshCw
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";
import pythonCode from "./topic7_files/demorgan_verifier.py?raw";

// Interactive De Morgan Dual Transformer Component
const DeMorganTransformer = () => {
  const [activeLaw, setActiveLaw] = useState('law1'); // 'law1' or 'law2'
  const [inputA, setInputA] = useState(1);
  const [inputB, setInputB] = useState(0);

  // Compute LHS and RHS values
  const computeValues = () => {
    if (activeLaw === 'law1') {
      // First Law: (A + B)' == A' · B'
      const lhs = 1 - (inputA | inputB);
      const rhs = (1 - inputA) & (1 - inputB);
      return {
        name: "De Morgan's First Law: (A + B)' = A' · B'",
        gateLHS: "NOR Gate (IC 7402)",
        gateRHS: "Bubbled AND Gate",
        lhs,
        rhs,
        lhsExp: `(${inputA} + ${inputB})' = (${inputA | inputB})' = ${lhs}`,
        rhsExp: `${inputA}' · ${inputB}' = ${1 - inputA} · ${1 - inputB} = ${rhs}`
      };
    } else {
      // Second Law: (A · B)' == A' + B'
      const lhs = 1 - (inputA & inputB);
      const rhs = (1 - inputA) | (1 - inputB);
      return {
        name: "De Morgan's Second Law: (A · B)' = A' + B'",
        gateLHS: "NAND Gate (IC 7400)",
        gateRHS: "Bubbled OR Gate",
        lhs,
        rhs,
        lhsExp: `(${inputA} · ${inputB})' = (${inputA & inputB})' = ${lhs}`,
        rhsExp: `${inputA}' + ${inputB}' = ${1 - inputA} + ${1 - inputB} = ${rhs}`
      };
    }
  };

  const current = computeValues();

  return (
    <div className="bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <Sparkles size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive De Morgan Dual Gate Transformer
            </h3>
            <p className="text-xs text-slate-400">
              Toggle between First and Second Laws and verify standard gate vs bubbled equivalent gate equivalence.
            </p>
          </div>
        </div>

        {/* Law Selector */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveLaw('law1')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
              activeLaw === 'law1' ? 'bg-sky-500 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            1st Law: (A+B)&apos; = A&apos;·B&apos;
          </button>
          <button
            onClick={() => setActiveLaw('law2')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
              activeLaw === 'law2' ? 'bg-sky-500 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            2nd Law: (A·B)&apos; = A&apos;+B&apos;
          </button>
        </div>
      </div>

      {/* Input Toggles & Verification */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        {/* Controls */}
        <div className="md:col-span-4 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Input Signals:</span>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-bold text-white">Input A:</span>
            <button
              onClick={() => setInputA(inputA === 0 ? 1 : 0)}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                inputA === 1 ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              State: {inputA}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-bold text-white">Input B:</span>
            <button
              onClick={() => setInputB(inputB === 0 ? 1 : 0)}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                inputB === 1 ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              State: {inputB}
            </button>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
            <div className="text-slate-400 text-[10px] uppercase">LHS Calculation:</div>
            <div className="text-sky-300 font-bold">{current.lhsExp}</div>
            <div className="text-slate-400 text-[10px] uppercase pt-1">RHS Calculation:</div>
            <div className="text-emerald-300 font-bold">{current.rhsExp}</div>
          </div>
        </div>

        {/* Dual Gate Schematics SVG */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[220px]">
          <svg viewBox="0 0 320 180" className="w-full max-w-[300px] h-auto">
            {/* Top: LHS Gate */}
            <text x="10" y="20" fill="#94a3b8" fontSize="10" fontWeight="bold">LHS: {current.gateLHS}</text>
            {activeLaw === 'law1' ? (
              // NOR Gate
              <g transform="translate(10, 25)">
                <line x1="0" y1="20" x2="40" y2="20" stroke={inputA === 1 ? "#38bdf8" : "#64748b"} strokeWidth="2.5" />
                <line x1="0" y1="45" x2="40" y2="45" stroke={inputB === 1 ? "#38bdf8" : "#64748b"} strokeWidth="2.5" />
                <path d="M 35 10 Q 50 32 35 55 Q 70 55 95 32 Q 70 10 35 10 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="101" cy="32" r="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <line x1="106" y1="32" x2="140" y2="32" stroke={current.lhs === 1 ? "#10b981" : "#ef4444"} strokeWidth="3" />
                <text x="145" y="36" fill={current.lhs === 1 ? "#10b981" : "#ef4444"} fontSize="11" fontWeight="bold">Y={current.lhs}</text>
              </g>
            ) : (
              // NAND Gate
              <g transform="translate(10, 25)">
                <line x1="0" y1="20" x2="40" y2="20" stroke={inputA === 1 ? "#38bdf8" : "#64748b"} strokeWidth="2.5" />
                <line x1="0" y1="45" x2="40" y2="45" stroke={inputB === 1 ? "#38bdf8" : "#64748b"} strokeWidth="2.5" />
                <path d="M 35 10 L 65 10 A 22 22 0 0 1 65 54 L 35 54 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="93" cy="32" r="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <line x1="98" y1="32" x2="140" y2="32" stroke={current.lhs === 1 ? "#10b981" : "#ef4444"} strokeWidth="3" />
                <text x="145" y="36" fill={current.lhs === 1 ? "#10b981" : "#ef4444"} fontSize="11" fontWeight="bold">Y={current.lhs}</text>
              </g>
            )}

            {/* Middle Equivalence Symbol */}
            <text x="100" y="105" fill="#f59e0b" fontSize="16" fontWeight="bold">≡ (Identical)</text>

            {/* Bottom: RHS Gate (Bubbled Gate) */}
            <text x="10" y="120" fill="#94a3b8" fontSize="10" fontWeight="bold">RHS: {current.gateRHS}</text>
            {activeLaw === 'law1' ? (
              // Bubbled AND Gate
              <g transform="translate(10, 125)">
                <line x1="0" y1="18" x2="25" y2="18" stroke={inputA === 1 ? "#38bdf8" : "#64748b"} strokeWidth="2.5" />
                <circle cx="30" cy="18" r="4" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <line x1="0" y1="42" x2="25" y2="42" stroke={inputB === 1 ? "#38bdf8" : "#64748b"} strokeWidth="2.5" />
                <circle cx="30" cy="42" r="4" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <path d="M 35 8 L 65 8 A 22 22 0 0 1 65 52 L 35 52 Z" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <line x1="87" y1="30" x2="140" y2="30" stroke={current.rhs === 1 ? "#10b981" : "#ef4444"} strokeWidth="3" />
                <text x="145" y="34" fill={current.rhs === 1 ? "#10b981" : "#ef4444"} fontSize="11" fontWeight="bold">Y={current.rhs}</text>
              </g>
            ) : (
              // Bubbled OR Gate
              <g transform="translate(10, 125)">
                <line x1="0" y1="18" x2="25" y2="18" stroke={inputA === 1 ? "#38bdf8" : "#64748b"} strokeWidth="2.5" />
                <circle cx="30" cy="18" r="4" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <line x1="0" y1="42" x2="25" y2="42" stroke={inputB === 1 ? "#38bdf8" : "#64748b"} strokeWidth="2.5" />
                <circle cx="30" cy="42" r="4" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <path d="M 35 8 Q 50 30 35 52 Q 70 52 95 30 Q 70 8 35 8 Z" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <line x1="95" y1="30" x2="140" y2="30" stroke={current.rhs === 1 ? "#10b981" : "#ef4444"} strokeWidth="3" />
                <text x="145" y="34" fill={current.rhs === 1 ? "#10b981" : "#ef4444"} fontSize="11" fontWeight="bold">Y={current.rhs}</text>
              </g>
            )}
          </svg>
        </div>

        {/* Status Verification */}
        <div className="md:col-span-3 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
          <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 size={32} />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dual Truth Match:</span>
          <span className="text-2xl font-mono font-extrabold text-emerald-400">
            LHS = {current.lhs} | RHS = {current.rhs}
          </span>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Law 100% Proven
          </span>
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
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002 · Topic 7
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                De Morgan&apos;s Laws
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              De Morgan&apos;s Laws: First &amp; Second Laws (Algebraic &amp; Truth Table Proofs)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master De Morgan&apos;s First Law $(A + B)&apos; = A&apos; \\cdot B&apos;$ and Second Law $(A \\cdot B)&apos; = A&apos; + B&apos;$. Explore rigorous algebraic proofs via Huntington&apos;s complement postulates, truth table perfect induction, and bubbled gate equivalents.
            </p>
          </div>
        </div>

        {/* 2. Deep Conceptual Breakdown */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                The Core Philosophy of De Morgan&apos;s Duality
              </h2>
              <p className="text-xs text-slate-400">
                How breaking the inversion bar interchanges Conjunction and Disjunction.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">First Law</span>
                <span className="text-xs font-mono text-slate-400">NOR ≡ Bubbled AND</span>
              </div>
              <h3 className="text-base font-bold text-white">De Morgan&apos;s First Law</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <em>&quot;The complement of a sum is equal to the product of individual complements.&quot;</em>
              </p>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-sky-300 font-bold text-center">
                (A + B)&apos; = A&apos; · B&apos;
              </div>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">Second Law</span>
                <span className="text-xs font-mono text-slate-400">NAND ≡ Bubbled OR</span>
              </div>
              <h3 className="text-base font-bold text-white">De Morgan&apos;s Second Law</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <em>&quot;The complement of a product is equal to the sum of individual complements.&quot;</em>
              </p>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 font-bold text-center">
                (A · B)&apos; = A&apos; + B&apos;
              </div>
            </div>
          </div>
        </div>

        {/* 3. Interactive Transformer */}
        <DeMorganTransformer />

        {/* 4. Deep Technical Breakdown: Algebraic Proof Steps */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Rigorous Algebraic Proof (Huntington&apos;s Postulates)
              </h2>
              <p className="text-xs text-slate-400">
                Board examination proof required for 3-mark theory questions.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Proof of (A + B)&apos; = A&apos; · B&apos;
            </h3>
            <p className="text-xs text-slate-300">
              According to Boolean complement postulates, to prove $Y = X&apos;$, we must prove: (1) $X + Y = 1$ and (2) $X \\cdot Y = 0$.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold block text-[11px] uppercase">Part 1: Prove (A+B) + (A&apos;B&apos;) = 1</span>
                <div className="text-slate-300 space-y-1">
                  <div>= ((A + B) + A&apos;) · ((A + B) + B&apos;) <span className="text-slate-500">[Distributive]</span></div>
                  <div>= (B + (A + A&apos;)) · (A + (B + B&apos;)) <span className="text-slate-500">[Associative]</span></div>
                  <div>= (B + 1) · (A + 1) <span className="text-slate-500">[Complement: A+A&apos;=1]</span></div>
                  <div>= 1 · 1 = 1 <span className="text-emerald-400 font-bold">[Null Law: B+1=1]</span></div>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold block text-[11px] uppercase">Part 2: Prove (A+B) · (A&apos;B&apos;) = 0</span>
                <div className="text-slate-300 space-y-1">
                  <div>= (A · (A&apos;B&apos;)) + (B · (A&apos;B&apos;)) <span className="text-slate-500">[Distributive]</span></div>
                  <div>= ((A · A&apos;) · B&apos;) + (A&apos; · (B · B&apos;)) <span className="text-slate-500">[Associative]</span></div>
                  <div>= (0 · B&apos;) + (A&apos; · 0) <span className="text-slate-500">[Complement: A·A&apos;=0]</span></div>
                  <div>= 0 + 0 = 0 <span className="text-emerald-400 font-bold">[Null Law: 0·B&apos;=0]</span></div>
                </div>
              </div>
            </div>
            <p className="text-xs text-emerald-400 font-semibold pt-1">
              Conclusion: Since both condition 1 and condition 2 are satisfied, $A&apos; \\cdot B&apos;$ is the unique complement of $(A + B)$. Hence proved!
            </p>
          </div>
        </div>

        {/* 5. Python File Loader */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Code size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">
              De Morgan&apos;s Laws Verification Script
            </h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="demorgan_verifier.py"
            highlightLines={[12, 19, 21, 31, 38, 40]}
          />
        </div>

        {/* 6. Real-World Applications */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Software &amp; Hardware Engineering Applications
              </h2>
              <p className="text-xs text-slate-400">
                Where De Morgan&apos;s laws solve everyday programming and synthesis bottlenecks.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Python Code Optimization</span>
              <h3 className="text-base font-bold text-white">Refactoring Complex Conditionals</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Writing <code className="text-sky-300">if not (is_valid and has_permission):</code> can be refactored via De Morgan into <code className="text-sky-300">if not is_valid or not has_permission:</code>, eliminating nested evaluations and enabling short-circuit speedups.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">IC Circuit Conversion</span>
              <h3 className="text-base font-bold text-white">AND-OR to Pure NAND-NAND Conversion</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Applying De Morgan&apos;s laws converts standard Sum-of-Products expressions ($AB + CD$) into all-NAND circuits ($((AB)&apos; \\cdot (CD)&apos;)&apos;$), drastically slashing silicon mask costs in ASICs.
              </p>
            </div>
          </div>
        </div>

        {/* 7. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle size={18} /> Common Algebra Mistakes
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-rose-300">Breaking the Bar without Changing the Sign:</strong> Writing <code className="font-mono text-rose-300">(A + B)&apos; = A&apos; + B&apos;</code> is WRONG! You must change <code className="font-mono text-rose-300">+</code> to <code className="font-mono text-rose-300">·</code>.
              </li>
              <li>
                <strong className="text-rose-300">Incomplete Algebraic Proofs:</strong> In exams, proving only $X + Y = 1$ without proving $X \\cdot Y = 0$ results in half marks deduction.
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 size={18} /> Exam Proof Best Practices
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-emerald-300">Write Both Parts:</strong> For algebraic proof, clearly label &quot;Part 1: To prove X + Y = 1&quot; and &quot;Part 2: To prove X · Y = 0&quot;.
              </li>
              <li>
                <strong className="text-emerald-300">Include Bubbled Schematics:</strong> If asked for circuit equivalence, draw the NOR gate and beside it the Bubbled AND gate with the $\equiv$ sign.
              </li>
            </ul>
          </div>
        </div>

        {/* 8. Hint Section */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3">
          <Sparkles className="text-amber-400 shrink-0 mt-0.5" size={18} />
          <div className="text-xs text-slate-300">
            <strong className="text-amber-400 font-semibold">Teacher&apos;s Memory Jingle:</strong>
            <p className="mt-1">
              <em>&quot;Break the line, change the sign! Plus becomes dot, dot becomes plus, and every single variable gets an individual bar!&quot;</em>
            </p>
          </div>
        </div>

        {/* 9. Frequently Asked Questions */}
        <FAQTemplate
          title="CBSE Class XI Computer Science (083) – De Morgan's Laws FAQs"
          questions={questions}
        />

        {/* 10. Plain Text Printable Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XI CS 083 – De Morgan's Laws Quick Revision"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 7 Plain Text Note"
          downloadFileName="topic7_note.txt"
        />

        {/* 11. Teacher's Note */}
        <Teacher
          note="De Morgan's Laws are tested almost every year in CBSE Class XI Computer Science (083) examinations. Prepare both the truth table proof (Perfect Induction) and the algebraic proof (using Huntington's postulates). Keep the two proof conditions (X + Y = 1 and X · Y = 0) at your fingertips! — Sukanta Hui"
        />

      </div>
    </div>
  );
}
