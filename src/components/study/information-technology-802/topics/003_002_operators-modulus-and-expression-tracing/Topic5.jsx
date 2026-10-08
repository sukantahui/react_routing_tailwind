import React, { useState } from 'react';
import { 
  Equal, Plus, Minus, X, Divide, Percent, 
  CheckCircle2, AlertTriangle, HelpCircle, Sparkles, 
  BookOpen, ArrowRight, ShieldCheck, RefreshCw, 
  Code, Terminal, FileCode, Check, Layers
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

const CompoundAssignmentStudio = () => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);

  const cases = [
    {
      title: "1. The Byte Casting Trap: b += 5 vs b = b + 5",
      badge: "Implicit Narrowing Cast",
      color: "text-amber-400",
      border: "border-amber-500/40",
      bg: "bg-amber-500/10",
      comparison: [
        {
          label: "Normal Assignment: b = b + 5;",
          status: "COMPILE ERROR",
          statusColor: "text-rose-400 bg-rose-500/20 border-rose-500/40",
          code: "byte b = 10;\nb = b + 5; // ERROR!",
          diag: "error: incompatible types: possible lossy conversion from int to byte (b + 5 evaluates to int)"
        },
        {
          label: "Compound Assignment: b += 5;",
          status: "SUCCESS (PASSED)",
          statusColor: "text-emerald-400 bg-emerald-500/20 border-emerald-500/40",
          code: "byte b = 10;\nb += 5; // Valid! b becomes 15",
          diag: "Java automatically injects implicit cast: b = (byte)(b + 5);"
        }
      ],
      explanation: "Compound assignment operators (+=, -=, *=, /=, %=) automatically inject an implicit narrowing type cast back to the target variable's type, eliminating the lossy conversion error!"
    },
    {
      title: "2. Right-Hand Parentheses Rule: a *= b + 2",
      badge: "Grouping Priority",
      color: "text-sky-400",
      border: "border-sky-500/40",
      bg: "bg-sky-500/10",
      comparison: [
        {
          label: "Common Student Misconception:",
          status: "WRONG: 17",
          statusColor: "text-rose-400 bg-rose-500/20 border-rose-500/40",
          code: "a = a * b + 2;\n// 5 * 3 + 2 = 15 + 2 = 17 (WRONG!)",
          diag: "Incorrectly multiplies first without parentheses"
        },
        {
          label: "Actual Java Evaluation:",
          status: "CORRECT: 25",
          statusColor: "text-emerald-400 bg-emerald-500/20 border-emerald-500/40",
          code: "a = a * (b + 2);\n// 5 * (3 + 2) = 5 * 5 = 25 (CORRECT!)",
          diag: "JLS §15.26.2: Right side is strictly treated as parenthesized (b + 2)"
        }
      ],
      explanation: "In compound assignment, the ENTIRE expression to the right of the operator is treated as if enclosed in parentheses: a *= b + 2 means a = a * (b + 2)."
    },
    {
      title: "3. Compound Modulus: x = 10, y = 80; x %= y;",
      badge: "Dividend < Divisor",
      color: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
      comparison: [
        {
          label: "Expression Expansion:",
          status: "EXPANSION",
          statusColor: "text-sky-400 bg-sky-500/20 border-sky-500/40",
          code: "x %= y;\n// Expands to: x = x % y",
          diag: "x = 10 % 80"
        },
        {
          label: "Result Evaluation:",
          status: "x = 10",
          statusColor: "text-emerald-400 bg-emerald-500/20 border-emerald-500/40",
          code: "System.out.println(x); // Prints 10",
          diag: "Since 10 < 80, 10 / 80 is 0 and full dividend 10 remains!"
        }
      ],
      explanation: "Classic CBSE board question! 10 % 80 returns 10, so x retains its original value of 10."
    }
  ];

  const cur = cases[selectedCaseIdx];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
            <Equal className="w-4 h-4" />
            <span>Interactive Compound Operator Studio</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Compound Assignment Operators: <code className="text-amber-300">+=, -=, *=, /=, %=</code>
          </h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          Shorthand Mechanics
        </div>
      </div>

      {/* Case Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {cases.map((c, idx) => {
          const isActive = selectedCaseIdx === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedCaseIdx(idx)}
              className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between gap-1.5 ${
                isActive
                  ? `${c.bg} ${c.border} border-2 shadow-lg`
                  : "bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50 text-slate-400"
              }`}
            >
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${
                isActive ? "bg-slate-950 text-white" : "bg-slate-900 text-slate-500"
              }`}>
                Case {idx + 1}
              </span>
              <p className={`text-xs font-bold ${isActive ? "text-white" : "text-slate-300"}`}>
                {c.title.split(": ")[1]}
              </p>
            </button>
          );
        })}
      </div>

      {/* Comparison Grid */}
      <div className={`p-6 rounded-2xl border ${cur.border} ${cur.bg} space-y-4`}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <h4 className={`text-lg font-bold ${cur.color}`}>{cur.title}</h4>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-amber-300">
            {cur.badge}
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {cur.comparison.map((cmp, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">{cmp.label}</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${cmp.statusColor}`}>
                  {cmp.status}
                </span>
              </div>
              <pre className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-amber-200/90 whitespace-pre-wrap">
                {cmp.code}
              </pre>
              <div className="text-[11px] text-slate-400 font-mono bg-slate-900/50 p-2 rounded-lg border border-slate-800/60">
                {cmp.diag}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">
            JLS Specification Rule:
          </span>
          <p className="leading-relaxed">{cur.explanation}</p>
        </div>
      </div>
    </div>
  );
};

export default function Topic5() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-10">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Equal className="w-4 h-4" />
          <span>CBSE Class 12 Information Technology (Code 802) • Module 003_002 • Topic 5</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          Compound Assignment Operators: <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">+=, -=, *=, /=, %=</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-4xl leading-relaxed">
          Master the hidden automatic type casting of compound operators (<code className="text-amber-300 font-mono">b += 5</code> vs <code className="text-rose-400 font-mono">b = b + 5</code>), right-hand parentheses expansion (<code className="text-sky-300 font-mono">a *= b + 2</code>), and compound modulus.
        </p>
      </div>

      {/* Interactive Studio */}
      <div className="max-w-6xl mx-auto">
        <CompoundAssignmentStudio />
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: Compound Assignment Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: Compound Assignment" 
          description="Master high-yield questions on implicit type casting, right-hand parenthesization, and compound modulus with bilingual explanations." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="Remember this two-in-one rule for CBSE exams: 'b += 5;' automatically does '(byte)(b + 5)' under the hood, saving you from a lossy conversion compile error! And when you have 'a *= b + 2;', always wrap 'b + 2' in parentheses before multiplying with 'a'!" 
        />
      </div>
    </div>
  );
}
