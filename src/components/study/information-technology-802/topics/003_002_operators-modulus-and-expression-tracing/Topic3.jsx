import React, { useState } from 'react';
import { 
  PlusCircle, MinusCircle, CheckCircle2, AlertTriangle, 
  HelpCircle, Sparkles, BookOpen, ArrowRight, 
  ShieldCheck, RefreshCw, Code, Terminal, FileCode, 
  Check, Layers, ArrowDown
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

const IncrementDecrementVisualizer = () => {
  const [selectedDemoIdx, setSelectedDemoIdx] = useState(0);

  const demos = [
    {
      title: "1. Prefix: int y = ++x; (Initial x = 5)",
      initial: "int x = 5;",
      code: "int y = ++x;",
      type: "Prefix (++x)",
      rule: "Change then Use",
      color: "text-sky-400",
      border: "border-sky-500/40",
      bg: "bg-sky-500/10",
      steps: [
        { action: "1. Pre-increment step", desc: "x in memory increments from 5 to 6 first.", memX: "6", valY: "pending" },
        { action: "2. Value fetch step", desc: "The new updated value (6) is returned.", memX: "6", valY: "6" },
        { action: "3. Assignment step", desc: "6 is assigned to variable y.", memX: "6", valY: "6" }
      ],
      finalX: 6,
      finalY: 6,
      summary: "Both x and y receive value 6."
    },
    {
      title: "2. Postfix: int y = x++; (Initial x = 5)",
      initial: "int x = 5;",
      code: "int y = x++;",
      type: "Postfix (x++)",
      rule: "Use then Change",
      color: "text-amber-400",
      border: "border-amber-500/40",
      bg: "bg-amber-500/10",
      steps: [
        { action: "1. Value fetch step", desc: "The current value (5) of x is fetched first.", memX: "5", valY: "5" },
        { action: "2. Assignment step", desc: "5 is assigned to variable y.", memX: "5", valY: "5" },
        { action: "3. Post-increment step", desc: "x in memory increments from 5 to 6 afterwards.", memX: "6", valY: "5" }
      ],
      finalX: 6,
      finalY: 5,
      summary: "y gets original 5, and x increments to 6."
    },
    {
      title: "3. Chained: b = a++ + ++a; (Initial a = 5)",
      initial: "int a = 5;",
      code: "int b = a++ + ++a;",
      type: "Compound Trace",
      rule: "Multi-Term Evaluation",
      color: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
      steps: [
        { action: "Term 1: a++", desc: "Yields 5, then increments a from 5 to 6 in memory.", memX: "6", valY: "5 + ..." },
        { action: "Term 2: ++a", desc: "Increments a from 6 to 7 first, then yields 7.", memX: "7", valY: "5 + 7" },
        { action: "Addition: 5 + 7", desc: "Evaluates to 12 and assigns to b.", memX: "7", valY: "12" }
      ],
      finalX: 7,
      finalY: 12,
      summary: "Final values: a = 7, b = 12."
    },
    {
      title: "4. Decrement: y = --x + x--; (Initial x = 8)",
      initial: "int x = 8;",
      code: "int y = --x + x--;",
      type: "Decrement Trace",
      rule: "Prefix & Postfix Decrement",
      color: "text-purple-400",
      border: "border-purple-500/40",
      bg: "bg-purple-500/10",
      steps: [
        { action: "Term 1: --x", desc: "Decrements 8 to 7 first, yields 7 (x is 7).", memX: "7", valY: "7 + ..." },
        { action: "Term 2: x--", desc: "Yields 7, then decrements x to 6 in memory.", memX: "6", valY: "7 + 7" },
        { action: "Addition: 7 + 7", desc: "Evaluates to 14 and assigns to y.", memX: "6", valY: "14" }
      ],
      finalX: 6,
      finalY: 14,
      summary: "Final values: x = 6, y = 14."
    }
  ];

  const cur = demos[selectedDemoIdx];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs tracking-wider uppercase">
            <RefreshCw className="w-4 h-4" />
            <span>Step-by-Step Operator Tracker</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Prefix (<code className="text-sky-300">++x</code>) vs Postfix (<code className="text-amber-300">x++</code>) Timeline
          </h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          Memory Timeline
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {demos.map((d, idx) => {
          const isActive = selectedDemoIdx === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedDemoIdx(idx)}
              className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between gap-1.5 ${
                isActive
                  ? `${d.bg} ${d.border} border-2 shadow-lg`
                  : "bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isActive ? "bg-slate-950 text-white" : "bg-slate-900 text-slate-500"
                }`}>
                  Demo {idx + 1}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{d.rule}</span>
              </div>
              <p className={`text-xs font-mono font-bold ${isActive ? "text-white" : "text-slate-300"}`}>
                {d.code}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Demo Visualizer */}
      <div className={`p-6 rounded-2xl border ${cur.border} ${cur.bg} space-y-5`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">{cur.type}</span>
            <h4 className={`text-xl font-black ${cur.color}`}>{cur.title}</h4>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
              Initial: {cur.initial}
            </span>
          </div>
        </div>

        {/* Step Timeline */}
        <div className="space-y-3">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
            Execution Steps Inside JVM Engine:
          </span>
          <div className="space-y-2">
            {cur.steps.map((st, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-bold text-white block">{st.action}</span>
                    <span className="text-slate-400">{st.desc}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px] bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 shrink-0">
                  <span>RAM [x]: <strong className="text-amber-300">{st.memX}</strong></span>
                  <span>|</span>
                  <span>Value [y]: <strong className="text-emerald-300">{st.valY}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Values Output Card */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-200 font-semibold">{cur.summary}</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
              x = {cur.finalX}
            </span>
            <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              y = {cur.finalY}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic3() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-10">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <PlusCircle className="w-4 h-4" />
          <span>CBSE Class 12 Information Technology (Code 802) • Module 003_002 • Topic 3</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          Increment & Decrement Operators: <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Prefix (++x) vs Postfix (x++)</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-4xl leading-relaxed">
          Master the exact difference between "Change then Use" (Prefix) and "Use then Change" (Postfix) with step-by-step memory register tracking and chained expression evaluations.
        </p>
      </div>

      {/* Interactive Visualizer */}
      <div className="max-w-6xl mx-auto">
        <IncrementDecrementVisualizer />
      </div>

      {/* Rule Cards */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <PlusCircle className="w-4 h-4" />
            <span>Prefix Increment (++x)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            1. Increments <code className="text-amber-300">x</code> in memory by 1 immediately.<br />
            2. Returns the updated new value to the surrounding statement.<br />
            <span className="text-slate-500">Mnemonic: "Change first, then use."</span>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <RefreshCw className="w-4 h-4" />
            <span>Postfix Increment (x++)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            1. Returns the original current value to the surrounding statement.<br />
            2. Increments <code className="text-amber-300">x</code> in memory by 1 afterwards.<br />
            <span className="text-slate-500">Mnemonic: "Use first, then change."</span>
          </p>
        </div>
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: Java Increment & Decrement Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: Increment & Decrement Operators" 
          description="Test your ability to trace complex chained prefix and postfix evaluations with instant bilingual explanations." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="Whenever you trace expressions like 'b = a++ + ++a;' in CBSE exams, write two rows on your rough sheet: Row 1 for the value yielded by each term, and Row 2 for the live value of the variable in RAM. This foolproof method guarantees you will never make an error!" 
        />
      </div>
    </div>
  );
}
