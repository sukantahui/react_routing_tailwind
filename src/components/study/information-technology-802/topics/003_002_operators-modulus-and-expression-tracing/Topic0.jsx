import React, { useState } from 'react';
import { 
  Calculator, Plus, Minus, X, Divide, Percent, 
  CheckCircle2, AlertTriangle, Sparkles, BookOpen, 
  ArrowRight, ShieldCheck, RefreshCw, Code, Terminal, 
  FileCode, Layers
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

const ArithmeticWorkbench = () => {
  const [valA, setValA] = useState(17);
  const [valB, setValB] = useState(5);

  const numA = Number(valA);
  const numB = Number(valB);

  const isBZero = numB === 0;

  const addition = numA + numB;
  const subtraction = numA - numB;
  const multiplication = numA * numB;
  const intDivision = isBZero ? "ArithmeticException: / by zero" : Math.trunc(numA / numB);
  const floatDivision = isBZero ? (numA === 0 ? "NaN" : "Infinity") : (numA / numB).toFixed(4);
  const modulus = isBZero ? "ArithmeticException: / by zero" : numA % numB;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
            <Calculator className="w-4 h-4" />
            <span>Interactive Operator Workbench</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Live Java Arithmetic Operations: <code className="text-amber-300">+, -, *, /, %</code>
          </h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          Binary Operators
        </div>
      </div>

      {/* Input Controls */}
      <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-slate-400">Operand A (Numerator / Dividend):</label>
          <input
            type="number"
            value={valA}
            onChange={(e) => setValA(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-amber-400"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-slate-400">Operand B (Denominator / Divisor):</label>
          <input
            type="number"
            value={valB}
            onChange={(e) => setValB(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Addition */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-sky-400 font-bold">
              <Plus className="w-3.5 h-3.5" /> Addition (+)
            </span>
            <span>a + b</span>
          </div>
          <div className="text-xl font-black text-white font-mono">{addition}</div>
          <p className="text-[11px] text-slate-500">Sum of two operands</p>
        </div>

        {/* Subtraction */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-rose-400 font-bold">
              <Minus className="w-3.5 h-3.5" /> Subtraction (-)
            </span>
            <span>a - b</span>
          </div>
          <div className="text-xl font-black text-white font-mono">{subtraction}</div>
          <p className="text-[11px] text-slate-500">Difference between operands</p>
        </div>

        {/* Multiplication */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-purple-400 font-bold">
              <X className="w-3.5 h-3.5" /> Multiplication (*)
            </span>
            <span>a * b</span>
          </div>
          <div className="text-xl font-black text-white font-mono">{multiplication}</div>
          <p className="text-[11px] text-slate-500">Mathematical product</p>
        </div>

        {/* Integer Division */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Divide className="w-3.5 h-3.5" /> Integer Division (/)
            </span>
            <span>(int)a / b</span>
          </div>
          <div className={`text-xl font-black font-mono ${isBZero ? "text-rose-400 text-sm" : "text-amber-300"}`}>
            {intDivision}
          </div>
          <p className="text-[11px] text-slate-400">Truncates all decimal fractions</p>
        </div>

        {/* Floating Division */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Divide className="w-3.5 h-3.5" /> Floating Division (/)
            </span>
            <span>(double)a / b</span>
          </div>
          <div className="text-xl font-black text-emerald-300 font-mono">{floatDivision}</div>
          <p className="text-[11px] text-slate-400">Preserves precision decimals</p>
        </div>

        {/* Modulus */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-teal-500/30 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-teal-400 font-bold">
              <Percent className="w-3.5 h-3.5" /> Modulus Remainder (%)
            </span>
            <span>a % b</span>
          </div>
          <div className={`text-xl font-black font-mono ${isBZero ? "text-rose-400 text-sm" : "text-teal-300"}`}>
            {modulus}
          </div>
          <p className="text-[11px] text-slate-400">Remainder after integer division</p>
        </div>
      </div>

      {/* Automatic Type Promotion Visualizer */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>CBSE Core Concept: Java Automatic Arithmetic Type Promotion</span>
        </h4>
        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="font-bold text-rose-400">The byte / short Trap:</span>
            <p className="text-slate-300 leading-relaxed">
              When evaluating <code className="text-amber-300">byte b3 = b1 + b2;</code>, Java automatically promotes smaller types to <code className="text-sky-300">int</code>. Hence, assigning the result back to <code className="text-amber-300">byte</code> fails without explicit cast <code className="text-emerald-300">(byte)(b1 + b2)</code>.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="font-bold text-emerald-400">Wider Type Rule:</span>
            <p className="text-slate-300 leading-relaxed">
              In mixed expressions, the resulting type is elevated to the widest operand: <br />
              <code className="text-slate-400">int + long $\to$ </code> <span className="text-indigo-300 font-bold">long</span> | 
              <code className="text-slate-400"> long + float $\to$ </code> <span className="text-teal-300 font-bold">float</span> | 
              <code className="text-slate-400"> float + double $\to$ </code> <span className="text-amber-300 font-bold">double</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic0() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-10">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Calculator className="w-4 h-4" />
          <span>CBSE Class 12 Information Technology (Code 802) • Module 003_002 • Topic 0</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          Arithmetic Operators in Java: <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">+, -, *, /, %</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-4xl leading-relaxed">
          Explore the mechanics of Java's 5 binary arithmetic operators, automatic type promotion rules (<code className="text-amber-300 font-mono">byte + byte $\to$ int</code>), integer truncation versus floating division, and remainder evaluation.
        </p>
      </div>

      {/* Interactive Workbench */}
      <div className="max-w-6xl mx-auto">
        <ArithmeticWorkbench />
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: Java Arithmetic Operators Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: Arithmetic Operators" 
          description="Master high-yield questions on integer division, type promotion, modulus evaluation, and unary negation with bilingual explanations." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="Remember for CBSE IT-802: whenever two whole numbers are divided (like 17 / 5), Java ALWAYS performs integer division and returns an integer quotient (3), throwing away the decimal remainder. To get 3.4, at least one operand must be a decimal (17.0 / 5)!" 
        />
      </div>
    </div>
  );
}
