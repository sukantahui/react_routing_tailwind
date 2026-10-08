import React, { useState } from 'react';
import { 
  Terminal, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, RefreshCw, 
  Code, Zap, Layers, Check, ArrowDownRight, CornerDownRight
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const SwitchJumpTableStudio = () => {
  const [selectedDay, setSelectedDay] = useState(3);

  const daysData = [
    { val: 1, label: "Monday", color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/30" },
    { val: 2, label: "Tuesday", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30" },
    { val: 3, label: "Wednesday", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
    { val: 4, label: "Thursday", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
    { val: 5, label: "Friday", color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/30" },
    { val: 99, label: "Weekend / Invalid", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30" }
  ];

  const currentSelection = daysData.find(d => d.val === selectedDay) || daysData[5];

  // Number of checks for if-else ladder
  const ifElseChecks = selectedDay === 1 ? 1 : selectedDay === 2 ? 2 : selectedDay === 3 ? 3 : selectedDay === 4 ? 4 : selectedDay === 5 ? 5 : 5;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
            <Zap className="w-3.5 h-3.5" /> High-Performance Dispatch Studio
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            How the Switch Jump-Table Works vs If-Else Ladder
          </h2>
        </div>
        
        <div className="text-xs text-slate-400">
          Comparing $O(1)$ Direct Jump Table vs $O(N)$ Sequential Traversal
        </div>
      </div>

      {/* Value Selector */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Select Day Number to Test (`int day`):
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {daysData.map(d => (
            <button
              key={d.val}
              onClick={() => setSelectedDay(d.val)}
              className={`p-3 rounded-xl border text-center transition cursor-pointer font-mono ${
                selectedDay === d.val
                  ? `${d.bg} ${d.border} border-2 text-white shadow-lg shadow-black/40`
                  : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/60 text-slate-400'
              }`}
            >
              <div className="text-sm font-bold">day = {d.val}</div>
              <div className={`text-[11px] font-sans ${selectedDay === d.val ? d.color : 'text-slate-500'}`}>
                {d.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Dual Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* If-Else Ladder Side */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> Sequential If-Else Ladder
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
              Evaluations: {ifElseChecks} step(s)
            </span>
          </div>

          <div className="font-mono text-xs space-y-1.5 text-slate-300">
            {[1, 2, 3, 4, 5].map(stepVal => {
              const isChecked = selectedDay >= stepVal || selectedDay === 99;
              const isThisMatch = selectedDay === stepVal;
              return (
                <div 
                  key={stepVal}
                  className={`p-2 rounded-lg border transition-all ${
                    isThisMatch 
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200' 
                      : isChecked 
                        ? 'bg-rose-500/5 border-rose-500/20 text-rose-300/60' 
                        : 'bg-slate-900/40 border-slate-800/40 text-slate-600'
                  }`}
                >
                  <span className="text-slate-500">{stepVal === 1 ? 'if' : 'else if'}</span> (day == {stepVal}) {'{'}
                  <span className="pl-4 block text-amber-300">System.out.println("{daysData[stepVal - 1].label}");</span>
                  {'}'}
                  {isThisMatch && (
                    <span className="text-[10px] text-emerald-400 font-sans block mt-1 font-bold">
                      ✓ Checked step #{stepVal}: TRUE! Breaks out.
                    </span>
                  )}
                  {isChecked && !isThisMatch && (
                    <span className="text-[10px] text-rose-400/80 font-sans block mt-1">
                      ✗ Checked step #{stepVal}: FALSE. Evaluates next.
                    </span>
                  )}
                </div>
              );
            })}
            <div className={`p-2 rounded-lg border ${
              selectedDay === 99 ? 'bg-amber-500/10 border-amber-500/40 text-amber-200' : 'bg-slate-900/40 border-slate-800/40 text-slate-600'
            }`}>
              <span className="text-slate-500">else</span> {'{'}
              <span className="pl-4 block text-amber-300">System.out.println("Invalid / Other");</span>
              {'}'}
            </div>
          </div>
        </div>

        {/* Switch Jump-Table Side */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-sky-400" /> Switch Jump Table (tableswitch)
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
              Evaluations: EXACTLY 1 (O(1))
            </span>
          </div>

          <div className="font-mono text-xs space-y-1.5 text-slate-300">
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-sky-300">
              switch (day) {'{'} <span className="text-slate-500 text-[11px] font-sans">// Evaluates `day` once ({selectedDay}) & jumps instantly</span>
            </div>

            {[1, 2, 3, 4, 5].map(stepVal => {
              const isTargetCase = selectedDay === stepVal;
              return (
                <div 
                  key={stepVal}
                  className={`p-2 rounded-lg border transition-all ${
                    isTargetCase 
                      ? 'bg-sky-500/15 border-sky-500/50 text-sky-200 shadow-md shadow-sky-950/40' 
                      : 'bg-slate-900/30 border-slate-800/30 text-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>case {stepVal}:</span>
                    {isTargetCase && (
                      <span className="text-[10px] text-sky-400 font-sans font-bold flex items-center gap-1">
                        <CornerDownRight className="w-3.5 h-3.5" /> Direct O(1) Jump!
                      </span>
                    )}
                  </div>
                  <span className="pl-4 block text-amber-300">System.out.println("{daysData[stepVal - 1].label}");</span>
                  <span className="pl-4 block text-purple-300">break;</span>
                </div>
              );
            })}

            <div className={`p-2 rounded-lg border ${
              selectedDay === 99 
                ? 'bg-amber-500/15 border-amber-500/50 text-amber-200 shadow-md shadow-amber-950/40' 
                : 'bg-slate-900/30 border-slate-800/30 text-slate-600'
            }`}>
              <div className="flex items-center justify-between">
                <span>default:</span>
                {selectedDay === 99 && (
                  <span className="text-[10px] text-amber-400 font-sans font-bold flex items-center gap-1">
                    <CornerDownRight className="w-3.5 h-3.5" /> Jump to default
                  </span>
                )}
              </div>
              <span className="pl-4 block text-amber-300">System.out.println("Invalid / Other");</span>
              <span className="pl-4 block text-purple-300">break;</span>
            </div>
            <div className="text-sky-300">{'}'}</div>
          </div>
        </div>
      </div>

      {/* Insight Banner */}
      <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-white mb-1">
            CBSE Theory takeaway: Why `switch` beats long `if-else` chains for discrete values
          </h4>
          <p className="text-slate-400 leading-relaxed">
            In an `if-else` ladder testing 5 options, selecting the 5th option requires executing 5 sequential relational comparisons. In contrast, the Java Virtual Machine can optimize a `switch` into a single indexed jump table (<code className="text-sky-300 font-mono">tableswitch</code>), jumping directly to the target case in constant $O(1)$ time regardless of whether it is case 1 or case 50!
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Topic1() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
          <Terminal className="w-4 h-4" /> CBSE Class 12 IT (Code 802) • Unit 3: Java Programming
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          The Switch Statement: Multi-Way Selection in Java
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
          Master how Java's <code className="text-sky-400 font-mono">switch</code> evaluates expressions once, jumps directly via bytecode tables, replaces unwieldy <code className="text-rose-400 font-mono">if-else</code> chains, and enforces compile-time constant case labels.
        </p>
      </div>

      {/* Interactive Jump Table Studio */}
      <div className="max-w-6xl mx-auto">
        <SwitchJumpTableStudio />
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: The Switch Statement Revision Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: The Switch Statement" 
          description="Master 25 exam-style questions on switch statement mechanics, constant labels, duplicate restrictions, tableswitch optimization, and default behavior with bilingual explanations." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="Remember this fundamental rule for your CBSE theory exam: Case labels in a switch statement MUST be compile-time constants! You cannot write 'case x:' where x is a variable, unless x is declared 'final' and initialized with a constant literal. Also, switch only tests for equality (==); it cannot test ranges like 'x >= 10' directly!" 
        />
      </div>
    </div>
  );
}
