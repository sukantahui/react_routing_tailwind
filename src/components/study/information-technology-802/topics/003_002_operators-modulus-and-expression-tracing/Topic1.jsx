import React, { useState } from 'react';
import { 
  Divide, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  RefreshCw, Code, Terminal, FileCode, Check, 
  Layers, Percent, CornerDownLeft
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const DivisionCastingSimulator = () => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);

  const cases = [
    {
      title: "1. 12 / 5 (Pure Integer Division)",
      expression: "12 / 5",
      type: "int / int",
      result: "2",
      badge: "Truncation: .4 Discarded",
      badgeColor: "bg-rose-500/20 text-rose-300",
      steps: [
        "Operand 1: 12 (int)",
        "Operand 2: 5 (int)",
        "Both operands are integers -> Integer Division rules apply",
        "12 / 5 = 2.4 -> Truncates towards zero -> 2"
      ],
      explanation: "Because both operands are whole integers, Java completely discards the decimal fraction (.4). No rounding occurs!"
    },
    {
      title: "2. 12.0 / 5 (Floating-Point Division)",
      expression: "12.0 / 5",
      type: "double / int",
      result: "2.4",
      badge: "Promoted to double",
      badgeColor: "bg-emerald-500/20 text-emerald-300",
      steps: [
        "Operand 1: 12.0 (double)",
        "Operand 2: 5 (int)",
        "Binary numeric promotion: 5 is promoted to 5.0 (double)",
        "12.0 / 5.0 = 2.4 (double precision preserved)"
      ],
      explanation: "Having at least one floating-point operand (12.0) forces Java to perform floating-point division, returning the exact decimal 2.4."
    },
    {
      title: "3. (double) 12 / 5 (Cast First)",
      expression: "(double) 12 / 5",
      type: "cast / int",
      result: "2.4",
      badge: "Explicit Cast on 12",
      badgeColor: "bg-sky-500/20 text-sky-300",
      steps: [
        "Explicit cast '(double)' has higher precedence than division '/'",
        "Step 1: (double) 12 -> 12.0",
        "Step 2: 12.0 / 5 -> 12.0 / 5.0",
        "Result: 2.4"
      ],
      explanation: "The cast binds to 12 first, turning it into 12.0 before division occurs."
    },
    {
      title: "4. (double)(12 / 5) (Classic CBSE Trap)",
      expression: "(double)(12 / 5)",
      type: "cast after division",
      result: "2.0",
      badge: "Decimal Already Lost!",
      badgeColor: "bg-amber-500/20 text-amber-300",
      steps: [
        "Parentheses '(12 / 5)' have highest precedence and evaluate first",
        "Step 1: 12 / 5 (integer division) -> 2",
        "Step 2: (double) 2 -> 2.0",
        "Result: 2.0 (The .4 was already lost inside parentheses!)"
      ],
      explanation: "CBSE Board Favorite! The integer division inside parentheses throws away the .4 before the cast ever sees it."
    },
    {
      title: "5. (485 / 500) * 100 (The Percentage Bug)",
      expression: "(485 / 500) * 100",
      type: "integer calculation",
      result: "0",
      badge: "Evaluates to Zero!",
      badgeColor: "bg-rose-500/20 text-rose-300",
      steps: [
        "Step 1: 485 / 500 (both ints) -> 0.97 -> truncates to 0",
        "Step 2: 0 * 100 -> 0",
        "Fix: ((double) 485 / 500) * 100 -> 97.0"
      ],
      explanation: "Students frequently write this formula for student percentage. 485 / 500 becomes 0, ruining the entire calculation!"
    },
    {
      title: "6. 10 / 0 vs 10.0 / 0 (Division by Zero)",
      expression: "10.0 / 0",
      type: "floating by zero",
      result: "Infinity",
      badge: "IEEE 754 Standard",
      badgeColor: "bg-purple-500/20 text-purple-300",
      steps: [
        "Integer 10 / 0 -> Throws java.lang.ArithmeticException: / by zero",
        "Floating 10.0 / 0 -> Evaluates safely to Infinity",
        "-10.0 / 0 -> -Infinity",
        "0.0 / 0.0 -> NaN (Not a Number)"
      ],
      explanation: "Integer division by zero crashes with ArithmeticException, while floating division produces Infinity."
    }
  ];

  const cur = cases[selectedCaseIdx];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs tracking-wider uppercase">
            <Divide className="w-4 h-4" />
            <span>Division Mechanics & Type Casting Simulator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Predicting Outputs: <code className="text-sky-300">12 / 5</code> vs <code className="text-sky-300">12.0 / 5</code> vs <code className="text-sky-300">(double)(12 / 5)</code>
          </h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold">
          CBSE High-Yield Trap
        </div>
      </div>

      {/* Case Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {cases.map((c, idx) => {
          const isActive = selectedCaseIdx === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedCaseIdx(idx)}
              className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between gap-1.5 ${
                isActive
                  ? "bg-sky-500/15 border-sky-500/50 border-2 shadow-lg shadow-sky-500/10"
                  : "bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50 text-slate-400"
              }`}
            >
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${
                isActive ? "bg-sky-500/20 text-sky-300" : "bg-slate-800 text-slate-500"
              }`}>
                Case {idx + 1}
              </span>
              <p className={`text-xs font-mono font-bold truncate ${isActive ? "text-white" : "text-slate-300"}`}>
                {c.expression}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Case Deep Dive */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Expression Box */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{cur.type}</span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${cur.badgeColor}`}>
              {cur.badge}
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-slate-500 font-mono">Expression:</div>
            <div className="text-2xl font-black text-amber-300 font-mono">{cur.expression}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
              Step-by-Step Execution Trace:
            </span>
            <div className="space-y-1.5 text-xs font-mono">
              {cur.steps.map((st, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-300">
                  <ArrowRight className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Console Screen & Explanation */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-sky-500/30 space-y-4 shadow-xl shadow-sky-500/5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Terminal className="w-4 h-4 text-sky-400" />
              <span>Console Output Simulation</span>
            </div>
            <span className="text-xs font-mono text-emerald-400">Exit Code: 0</span>
          </div>

          <div className="p-4 rounded-xl bg-black border border-slate-800 font-mono text-xs space-y-1">
            <div className="text-slate-600">// System.out.println({cur.expression});</div>
            <div className="text-2xl font-black text-emerald-400 pt-2">{cur.result}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1 text-xs">
            <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
              CBSE Examiner Insight:
            </span>
            <p className="text-slate-200 leading-relaxed">{cur.explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic1() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-10">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold">
          <Divide className="w-4 h-4" />
          <span>CBSE Class 12 Information Technology (Code 802) • Module 003_002 • Topic 1</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          Integer Division vs Floating-Point Division: <span className="bg-gradient-to-r from-sky-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">12 / 5 (2) vs 12.0 / 5 (2.4)</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-4xl leading-relaxed">
          Master why integer division truncates fractions towards zero, how casting alters precedence (<code className="text-sky-300 font-mono">(double) 12 / 5</code> vs <code className="text-amber-300 font-mono">(double)(12 / 5)</code>), and division by zero exceptions.
        </p>
      </div>

      {/* Interactive Division Simulator */}
      <div className="max-w-6xl mx-auto">
        <DivisionCastingSimulator />
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: Division Mechanics Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: Division & Casting" 
          description="Test your ability to predict exact integer and floating division outputs in tricky CBSE Class 12 IT board expressions." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="Whenever you write percentage or average calculation in Java, NEVER write '(marks / 500) * 100' because 'marks / 500' evaluates to 0! Always cast at least one operand: '((double)marks / 500) * 100' to preserve precision!" 
        />
      </div>
    </div>
  );
}
