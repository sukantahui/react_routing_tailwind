import React, { useState } from 'react';
import {
  Calculator, CheckCircle2, AlertTriangle, HelpCircle,
  ShieldCheck, FileText, Sparkles, Code, Terminal,
  Layers, ArrowRight, RefreshCw, Hash, Binary
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/operators_and_precedence_lab.py?raw";

// Interactive Negative Modulo & Floor Division Calculator
const ModuloFloorDivisionWidget = () => {
  const [numA, setNumA] = useState(-7);
  const [numB, setNumB] = useState(2);

  const a = Number(numA) || 0;
  const b = Number(numB) || 1;

  // Python floor division: Math.floor(a / b)
  const floorDiv = Math.floor(a / b);
  // Python modulo: a - (floorDiv * b)
  const moduloRes = a - (floorDiv * b);
  const trueDiv = (a / b).toFixed(2);

  return (
    <div className="bg-slate-950/90 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Negative Floor Division (//) &amp; Modulo (%) Analyzer
            </h3>
            <p className="text-xs text-slate-400">
              Master CBSE's most frequent arithmetic traps: Floor division rounding toward $-\infty$ and divisor-signed modulo.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Numerator / Dividend (A):</label>
          <input
            type="number"
            value={numA}
            onChange={(e) => setNumA(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono font-bold focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Denominator / Divisor (B ≠ 0):</label>
          <input
            type="number"
            value={numB}
            onChange={(e) => setNumB(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono font-bold focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Preset Quick Buttons */}
      <div className="flex flex-wrap gap-1.5">
        {[
          { a: -7, b: 2 },
          { a: 7, b: -2 },
          { a: -7, b: -2 },
          { a: 7, b: 2 },
          { a: -11, b: 3 },
          { a: 15, b: 4 }
        ].map((p, idx) => (
          <button
            key={idx}
            onClick={() => { setNumA(p.a); setNumB(p.b); }}
            className="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300"
          >
            {p.a} and {p.b}
          </button>
        ))}
      </div>

      {/* Computed Outputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase">1. True Float Division (/)</span>
          <span className="text-lg font-mono font-bold text-sky-400 block">{a} / {b} = {trueDiv}</span>
          <span className="text-[10px] text-slate-400">Standard floating-point quotient</span>
        </div>

        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-amber-500/40 space-y-1">
          <span className="text-[11px] font-semibold text-amber-400 block uppercase">2. Floor Division (//)</span>
          <span className="text-lg font-mono font-bold text-amber-300 block">{a} // {b} = {floorDiv}</span>
          <span className="text-[10px] text-slate-400">Rounds down towards -Infinity</span>
        </div>

        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-emerald-500/40 space-y-1">
          <span className="text-[11px] font-semibold text-emerald-400 block uppercase">3. Modulo Remainder (%)</span>
          <span className="text-lg font-mono font-bold text-emerald-300 block">{a} % {b} = {moduloRes}</span>
          <span className="text-[10px] text-slate-400">Shares sign with Divisor B ({b})</span>
        </div>
      </div>

      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
        <span className="text-emerald-400 font-bold">Python Identity Check:</span>{' '}
        ({floorDiv} * {b}) + {moduloRes} = {floorDiv * b + moduloRes} ({floorDiv * b + moduloRes === a ? 'EQUAL TO DIVIDEND A ✓' : 'MISMATCH'})
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
                Unit II: Python · 45 Marks
              </span>
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                Module 004_003 · Topic 0
              </span>
              <span className="px-3 py-1 bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-full">
                Core CBSE Syllabus
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Python Data Types, Operators, Precedence Hierarchy &amp; Expressions
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
              Explore numbers (int, float, complex), boolean values, type conversions, comprehensive operators (arithmetic, relational, logical, bitwise, identity, membership), and the strict hierarchy of operator precedence.
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
              <h2 className="text-lg font-bold text-white tracking-tight">In Simple Words: Mathematical Traffic Signals</h2>
              <p className="text-xs text-slate-400">Why operator precedence rules exist</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            When multiple cars arrive at a four-way junction in Barrackpore, traffic lights dictate who moves first. Similarly, when an expression contains `+`, `*`, `**`, and `//`, Python’s <strong>Operator Precedence Table</strong> dictates the exact order of execution to eliminate mathematical ambiguity.
          </p>
        </div>

        {/* SECTION 3: INTERACTIVE NEGATIVE MODULO & FLOOR DIVISION CALCULATOR */}
        <div className="space-y-4">
          <ModuloFloorDivisionWidget />
        </div>

        {/* SECTION 4: OPERATOR PRECEDENCE TABLE */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80 shadow-md">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800 uppercase text-[11px]">
              <tr>
                <th className="py-3 px-4">Precedence Level</th>
                <th className="py-3 px-4">Operator Symbols</th>
                <th className="py-3 px-4">Operation Description</th>
                <th className="py-3 px-4">Associativity Direction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-bold text-sky-400">1 (Highest)</td>
                <td className="py-2.5 px-4 text-white">( )</td>
                <td className="py-2.5 px-4 font-sans text-slate-300">Parentheses / Grouping</td>
                <td className="py-2.5 px-4 font-sans text-slate-400">Left to Right</td>
              </tr>
              <tr className="hover:bg-slate-800/30 bg-purple-950/20">
                <td className="py-2.5 px-4 font-bold text-purple-400">2</td>
                <td className="py-2.5 px-4 text-purple-300 font-bold">**</td>
                <td className="py-2.5 px-4 font-sans text-purple-200">Exponentiation (Power)</td>
                <td className="py-2.5 px-4 font-sans text-amber-400 font-bold">RIGHT TO LEFT</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-bold text-sky-400">3</td>
                <td className="py-2.5 px-4 text-white">+x, -x, ~x</td>
                <td className="py-2.5 px-4 font-sans text-slate-300">Unary Plus, Minus, Bitwise NOT</td>
                <td className="py-2.5 px-4 font-sans text-slate-400">Right to Left</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-bold text-sky-400">4</td>
                <td className="py-2.5 px-4 text-white">*, /, //, %</td>
                <td className="py-2.5 px-4 font-sans text-slate-300">Multiply, True Div, Floor Div, Modulo</td>
                <td className="py-2.5 px-4 font-sans text-slate-400">Left to Right</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-bold text-sky-400">5</td>
                <td className="py-2.5 px-4 text-white">+, -</td>
                <td className="py-2.5 px-4 font-sans text-slate-300">Binary Addition, Subtraction</td>
                <td className="py-2.5 px-4 font-sans text-slate-400">Left to Right</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-bold text-sky-400">6</td>
                <td className="py-2.5 px-4 text-white">==, !=, &lt;, &gt;, is, in</td>
                <td className="py-2.5 px-4 font-sans text-slate-300">Relational, Identity, Membership</td>
                <td className="py-2.5 px-4 font-sans text-slate-400">Left to Right</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-bold text-sky-400">7</td>
                <td className="py-2.5 px-4 text-white">not, and, or</td>
                <td className="py-2.5 px-4 font-sans text-slate-300">Boolean Logical Operators</td>
                <td className="py-2.5 px-4 font-sans text-slate-400">Left to Right</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SECTION 5: PYTHON LAB SCRIPT */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Code size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Python Laboratory: Operator Precedence &amp; Identity Tracing
              </h2>
              <p className="text-xs text-slate-400">
                A Python program testing operator precedence, right-to-left exponentiation, and `is` vs `==` mechanics.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <PythonFileLoader
              fileModule={pythonCode}
              title="operators_and_precedence_lab.py – Operator Precedence & Modulo Engine"
              highlightLines={[12, 22, 38, 52]}
            />
          </div>
        </div>

        {/* SECTION 6: COMMON PITFALLS & EXAM ALERTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
              <AlertTriangle size={16} /> Common Examination Pitfalls
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span><strong>Evaluating `2 ** 3 ** 2` as 64:</strong> `**` has <strong>right-to-left</strong> associativity: $2^{(3^2)} = 2^9 = 512$.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span><strong>Floor Division of Negatives:</strong> `-7 // 2` is <strong>-4</strong> (not -3), because -3.5 rounds down toward $-\infty$.</span>
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
                <span><strong>Remember `is` vs `==`:</strong> `==` tests values; `is` tests memory address identity (`id(a) == id(b)`).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>True Division (`/`) Always Produces `float`:</strong> Even `4 / 2` evaluates to float `2.0`.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 7: FAQ ASSESSMENT */}
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
                Test your mastery of Python data types, operator precedence, short-circuit evaluation, and identity checks.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <FAQTemplate questions={questions} />
          </div>
        </div>

        {/* SECTION 8: TEACHER'S NOTE & PRINTABLE SUMMARY */}
        <div className="space-y-6">
          <Teacher />

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <PlainTextPrint
              content={noteText}
              filename="004_003_python_data_types_operators_notes.txt"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
