import React, { useState } from 'react';
import { 
  Percent, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  RefreshCw, Code, Terminal, FileCode, Check, 
  Layers, Divide, Calculator
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

const ModulusVisualizer = () => {
  const [dividend, setDividend] = useState(10);
  const [divisor, setDivisor] = useState(80);

  const numA = Number(dividend);
  const numB = Number(divisor);

  const isBZero = numB === 0;
  const quotient = isBZero ? 0 : Math.trunc(numA / numB);
  const remainder = isBZero ? "ArithmeticException" : (numA % numB);

  const presetScenarios = [
    { label: "10 % 80 (Dividend < Divisor)", a: 10, b: 80, result: 10, note: "Since 10 < 80, quotient is 0 and full dividend (10) remains!" },
    { label: "x = 10, y = 80; x %= y;", a: 10, b: 80, result: 10, note: "Compound assignment x %= y leaves x with value 10." },
    { label: "-10 % 3 (Negative Dividend)", a: -10, b: 3, result: -1, note: "Sign follows dividend: -10 is negative, so remainder is -1." },
    { label: "10 % -3 (Negative Divisor)", a: 10, b: -3, result: 1, note: "Sign of divisor is ignored! Dividend 10 is positive -> +1." },
    { label: "-10 % -3 (Both Negative)", a: -10, b: -3, result: -1, note: "Dividend -10 is negative -> remainder is -1." },
    { label: "7.5 % 2.0 (Floating Modulus)", a: 7.5, b: 2.0, result: 1.5, note: "Java supports floating-point %: 7.5 - (2.0 * 3) = 1.5." }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-teal-400 font-semibold text-xs tracking-wider uppercase">
            <Percent className="w-4 h-4" />
            <span>Interactive Remainder & Edge-Case Lab</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            The Modulus Operator (<code className="text-teal-300">%</code>): Remainder Evaluation Mechanics
          </h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
          CBSE Board Exam Core
        </div>
      </div>

      {/* Preset Scenario Buttons */}
      <div className="space-y-2">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
          Click to Test Classic CBSE Exam Scenarios:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {presetScenarios.map((sc, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDividend(sc.a);
                setDivisor(sc.b);
              }}
              className="p-3 rounded-2xl border border-slate-800 bg-slate-950/60 hover:bg-slate-800/60 text-left transition cursor-pointer flex flex-col justify-between gap-1"
            >
              <span className="text-[10px] text-teal-400 font-mono font-bold">Preset {idx + 1}</span>
              <p className="text-xs font-mono font-bold text-white truncate">{sc.a} % {sc.b}</p>
              <span className="text-[10px] text-slate-500">= {sc.result}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Inputs */}
      <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-slate-400">Dividend (a):</label>
          <input
            type="number"
            step="any"
            value={dividend}
            onChange={(e) => setDividend(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-teal-400"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-slate-400">Divisor (b):</label>
          <input
            type="number"
            step="any"
            value={divisor}
            onChange={(e) => setDivisor(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-teal-400"
          />
        </div>
      </div>

      {/* Evaluation Breakdown Box */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-teal-500/30 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <span className="text-xs font-mono text-slate-400">
            Expression: <code className="text-amber-300 font-bold">{numA} % {numB}</code>
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Result:</span>
            <span className={`text-xl font-mono font-black ${isBZero ? "text-rose-400" : "text-teal-300"}`}>
              {remainder}
            </span>
          </div>
        </div>

        {/* Mathematical Step Breakdown */}
        {!isBZero ? (
          <div className="grid sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-slate-500 block text-[10px]">1. Truncated Quotient (a / b):</span>
              <span className="text-white font-bold text-sm">{quotient}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-slate-500 block text-[10px]">2. Divisor * Quotient (b * q):</span>
              <span className="text-white font-bold text-sm">{numB * quotient}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-teal-500/40 space-y-1">
              <span className="text-teal-400 block text-[10px]">3. a - (b * q) = Remainder:</span>
              <span className="text-teal-300 font-bold text-sm">{numA} - ({numB * quotient}) = {remainder}</span>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-xs text-rose-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Cannot divide or modulo by zero! Throws ArithmeticException.</span>
          </div>
        )}

        {/* 4 Quadrants Sign Rule Card */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            The Golden Sign Rule: Sign of Remainder ALWAYS Matches the Dividend (a)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-center">
              <span className="text-slate-400 block text-[10px]">+a % +b</span>
              <span className="text-emerald-400 font-bold">10 % 3 = +1</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-center">
              <span className="text-slate-400 block text-[10px]">+a % -b</span>
              <span className="text-emerald-400 font-bold">10 % -3 = +1</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-center">
              <span className="text-slate-400 block text-[10px]">-a % +b</span>
              <span className="text-rose-400 font-bold">-10 % 3 = -1</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-center">
              <span className="text-slate-400 block text-[10px]">-a % -b</span>
              <span className="text-rose-400 font-bold">-10 % -3 = -1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic2() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-10">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
          <Percent className="w-4 h-4" />
          <span>CBSE Class 12 Information Technology (Code 802) • Module 003_002 • Topic 2</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          The Modulus Operator (<code className="text-teal-300 font-mono">%</code>): <span className="bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">Remainder Evaluation Mechanics</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-4xl leading-relaxed">
          Master why expressions like <code className="text-amber-300 font-mono">10 % 80</code> evaluate to <code className="text-emerald-300 font-mono">10</code>, how negative signs are resolved using the dividend sign dominance rule, and how the modulus operator works with floating-point values in Java.
        </p>
      </div>

      {/* Interactive Modulus Visualizer */}
      <div className="max-w-6xl mx-auto">
        <ModulusVisualizer />
      </div>

      {/* Practical Applications Grid */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
            <Calculator className="w-4 h-4" />
            <span>1. Even / Odd Checking</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            if (num % 2 == 0) // Even<br />else // Odd
          </p>
          <span className="text-[11px] text-slate-500 block">Tests if number divides cleanly by 2.</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <Code className="w-4 h-4" />
            <span>2. Extracting Last Digit</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            int digit = num % 10;
          </p>
          <span className="text-[11px] text-slate-500 block">Extracts units digit: 249 % 10 = 9.</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <RefreshCw className="w-4 h-4" />
            <span>3. Circular Wrapping</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            (idx + 1) % arrayLength
          </p>
          <span className="text-[11px] text-slate-500 block">Wraps around circular queue buffers.</span>
        </div>
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: Java Modulus Operator Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: Modulus Operator" 
          description="Master high-yield board exam questions on dividend < divisor, signed negative modulus, and compound assignment modulus (x %= y)." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="Remember the 2 ultimate golden rules of the % operator for your CBSE Class 12 board exam: (1) If the left number is smaller than the right number (e.g. 10 % 80), the answer is always the left number (10)! (2) The sign of the result ALWAYS matches the left number (dividend) — the sign of the right number has zero effect!" 
        />
      </div>
    </div>
  );
}
