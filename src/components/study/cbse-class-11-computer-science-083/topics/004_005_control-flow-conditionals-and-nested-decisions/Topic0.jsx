import React, { useState } from 'react';
import {
  GitFork, Calculator, CheckCircle2, AlertTriangle, HelpCircle,
  ShieldCheck, FileText, Sparkles, Code, Terminal,
  Layers, ArrowRight, RefreshCw, Calendar
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/conditionals_suite.py?raw";

// Interactive Progressive Slab Tariff Calculator Widget
const SlabTariffCalculator = () => {
  const [units, setUnits] = useState(250);

  const u = Math.max(0, parseFloat(units) || 0);

  let b1 = 0, b2 = 0, b3 = 0;
  if (u <= 100) {
    b1 = u * 3;
  } else if (u <= 200) {
    b1 = 100 * 3;
    b2 = (u - 100) * 5;
  } else {
    b1 = 100 * 3;
    b2 = 100 * 5;
    b3 = (u - 200) * 7;
  }

  const totalBill = b1 + b2 + b3;

  return (
    <div className="bg-slate-950/90 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Multi-Tiered Slab Tariff Calculator
            </h3>
            <p className="text-xs text-slate-400">
              Visualizes how `if-elif-else` branches compute progressive rate slabs (e.g. West Bengal State Electricity Board).
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-xs">
        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Units Consumed (kWh):</label>
        <input
          type="number"
          min="0"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white font-mono font-bold focus:outline-none focus:border-amber-500"
          placeholder="e.g. 250"
        />
      </div>

      {/* Progressive Slabs Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className={`p-3.5 rounded-xl border transition-all ${u > 0 ? 'bg-sky-950/30 border-sky-500/40 text-white' : 'bg-slate-900/50 border-slate-800 text-slate-500'}`}>
          <span className="text-[11px] font-semibold block uppercase">Slab 1 (1–100 @ ₹3/unit)</span>
          <span className="text-lg font-mono font-bold text-sky-300 block">₹{b1.toFixed(2)}</span>
          <span className="text-[10px] text-slate-400">{Math.min(u, 100)} units charged</span>
        </div>

        <div className={`p-3.5 rounded-xl border transition-all ${u > 100 ? 'bg-emerald-950/30 border-emerald-500/40 text-white' : 'bg-slate-900/50 border-slate-800 text-slate-500'}`}>
          <span className="text-[11px] font-semibold block uppercase">Slab 2 (101–200 @ ₹5/unit)</span>
          <span className="text-lg font-mono font-bold text-emerald-300 block">₹{b2.toFixed(2)}</span>
          <span className="text-[10px] text-slate-400">{u > 100 ? Math.min(u - 100, 100) : 0} units charged</span>
        </div>

        <div className={`p-3.5 rounded-xl border transition-all ${u > 200 ? 'bg-amber-950/30 border-amber-500/40 text-white' : 'bg-slate-900/50 border-slate-800 text-slate-500'}`}>
          <span className="text-[11px] font-semibold block uppercase">Slab 3 (&gt;200 @ ₹7/unit)</span>
          <span className="text-lg font-mono font-bold text-amber-300 block">₹{b3.toFixed(2)}</span>
          <span className="text-[10px] text-slate-400">{u > 200 ? u - 200 : 0} units charged</span>
        </div>
      </div>

      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-300">Total Calculated Electricity Tariff:</span>
        <span className="text-xl font-mono font-extrabold text-amber-400">₹{totalBill.toFixed(2)}</span>
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
                Module 004_005 · Topic 0
              </span>
              <span className="px-3 py-1 bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-full">
                Control Flow Mastery
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Control Flow: Conditionals, Decision Making &amp; Nested If-Else Ladders
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
              Master branching logic in Python: simple `if`, two-way `if-else`, multi-pathway `if-elif-else` ladders, nested decision hierarchies, short-circuit boolean conditions, and concise inline ternary expressions.
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
              <h2 className="text-lg font-bold text-white tracking-tight">In Simple Words: The Railway Track Switchman</h2>
              <p className="text-xs text-slate-400">How conditional branches guide program paths</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            At Barrackpore railway junction, track switches direct a train toward Sealdah, Naihati, or Ranaghat depending on signals. An <strong>if-elif-else ladder</strong> acts as the code switchman: only the first matching green signal track is taken, and all other bypass tracks are ignored.
          </p>
        </div>

        {/* SECTION 3: INTERACTIVE SLAB TARIFF CALCULATOR */}
        <div className="space-y-4">
          <SlabTariffCalculator />
        </div>

        {/* SECTION 4: PYTHON LAB SCRIPT */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Code size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Python Laboratory: Conditionals &amp; Decision Making Suite
              </h2>
              <p className="text-xs text-slate-400">
                A Python program testing leap year logic, progressive slab calculation, and discriminant quadratic solver.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <PythonFileLoader
              fileModule={pythonCode}
              title="conditionals_suite.py – Conditionals & Decision Engine"
              highlightLines={[12, 22, 35, 48]}
            />
          </div>
        </div>

        {/* SECTION 5: COMMON PITFALLS & EXAM ALERTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
              <AlertTriangle size={16} /> Common Examination Pitfalls
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span><strong>Using `=` instead of `==`:</strong> Writing `if marks = 100:` causes a SyntaxError. Equality comparison must use double equals `==`.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span><strong>Independent `if` vs `elif`:</strong> Multiple sequential `if` statements evaluate every single condition; an `if-elif` ladder terminates at the first True branch.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices &amp; Pythonic Idioms
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Chained Comparison:</strong> Write <code>90 &lt;= marks &lt;= 100</code> instead of <code>marks &gt;= 90 and marks &lt;= 100</code>.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Use Ternary for Simple Choices:</strong> <code>result = 'Pass' if score &gt;= 33 else 'Fail'</code>.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 6: FAQ ASSESSMENT */}
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
                Test your mastery of if, if-else, if-elif-else ladders, nested decisions, and short-circuit evaluation.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <FAQTemplate questions={questions} />
          </div>
        </div>

        {/* SECTION 7: TEACHER'S NOTE & PRINTABLE SUMMARY */}
        <div className="space-y-6">
          <Teacher />

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <PlainTextPrint
              content={noteText}
              filename="004_005_conditionals_and_decision_making_notes.txt"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
