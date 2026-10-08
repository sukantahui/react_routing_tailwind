import React, { useState } from 'react';
import { 
  ShieldAlert, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, RefreshCw, 
  Code, Terminal, Check, Layers, ArrowDown, Shuffle
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

const DefaultClauseStudio = () => {
  const [placement, setPlacement] = useState('bottom'); // 'bottom', 'middle', 'top'
  const [hasBreakInDefault, setHasBreakInDefault] = useState(false);
  const [inputVal, setInputVal] = useState(99);

  // Compute execution flow
  const getTrace = () => {
    const steps = [];
    const output = [];

    // Case matching logic
    const is1 = inputVal === 1;
    const is2 = inputVal === 2;
    const isMatched = is1 || is2;

    if (is1) {
      steps.push("Matched `case 1:` directly!");
      output.push("One");
      // case 1 always has break in our standard demo
    } else if (is2) {
      steps.push("Matched `case 2:` directly!");
      output.push("Two");
    } else {
      // Jumps to default
      steps.push("No case matched! Control transfers directly to `default:`");
      output.push("DefaultFallback");

      if (!hasBreakInDefault) {
        if (placement === 'top') {
          steps.push("⚠️ Fall-Through! No `break;` in default at top -> falls into `case 1:`");
          output.push("One");
        } else if (placement === 'middle') {
          steps.push("⚠️ Fall-Through! No `break;` in default in middle -> falls into `case 2:`");
          output.push("Two");
        }
      }
    }

    return { steps, output: output.join(" -> ") };
  };

  const trace = getTrace();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
            <ShieldAlert className="w-3.5 h-3.5" /> Fallback Mechanics & Placement Explorer
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            The Role of the Default Clause & The "No Break" Fall-Through Trap
          </h2>
        </div>
        
        <div className="text-xs text-slate-400">
          Simulating CBSE Board Exam Output Prediction Questions
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Control 1: Default Placement */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            1. Placement of `default:`
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'top', label: 'Top' },
              { id: 'middle', label: 'Middle' },
              { id: 'bottom', label: 'Bottom' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setPlacement(p.id)}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition cursor-pointer border ${
                  placement === p.id 
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-950' 
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-500">
            {placement === 'bottom' ? 'Standard textbook placement' : 'Examiner favorite trap layout'}
          </p>
        </div>

        {/* Control 2: Break in Default */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            2. Break Statement in `default`
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setHasBreakInDefault(true)}
              className={`py-2 px-2 rounded-lg text-xs font-bold transition cursor-pointer border ${
                hasBreakInDefault 
                  ? 'bg-emerald-600 text-white border-emerald-500' 
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
              }`}
            >
              Has break;
            </button>
            <button
              onClick={() => setHasBreakInDefault(false)}
              className={`py-2 px-2 rounded-lg text-xs font-bold transition cursor-pointer border ${
                !hasBreakInDefault 
                  ? 'bg-rose-600 text-white border-rose-500 animate-pulse' 
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
              }`}
            >
              No break; (Trap!)
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            Omitting break causes cascade if not at bottom.
          </p>
        </div>

        {/* Control 3: Test Input */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            3. Test Value (`int val`)
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[1, 2, 99].map(num => (
              <button
                key={num}
                onClick={() => setInputVal(num)}
                className={`py-1.5 px-2 rounded-lg text-xs font-mono font-bold transition cursor-pointer border ${
                  inputVal === num 
                    ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-950' 
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {num === 99 ? '99 (No Match)' : `val = ${num}`}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-500">
            {inputVal === 99 ? 'Forces execution into default!' : 'Matches a specific case.'}
          </p>
        </div>
      </div>

      {/* Code Layout & Execution Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source Code */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
          <span className="text-slate-500">// Generated Java Switch Layout</span>
          <p className="text-purple-300">int val = {inputVal};</p>
          <p className="text-sky-300">switch (val) {'{'}</p>

          {/* Top Default */}
          {placement === 'top' && (
            <div className={`pl-4 p-2 rounded border my-1 ${
              inputVal === 99 ? 'bg-amber-500/15 border-amber-500 text-amber-200' : 'bg-slate-900/50 border-slate-800 text-slate-400'
            }`}>
              <span className="font-bold text-amber-400">default:</span>
              <p className="pl-4 text-emerald-300">System.out.print("DefaultFallback ");</p>
              {hasBreakInDefault && <p className="pl-4 text-purple-300 font-bold">break;</p>}
            </div>
          )}

          {/* Case 1 */}
          <div className={`pl-4 p-2 rounded border my-1 ${
            inputVal === 1 || (inputVal === 99 && placement === 'top' && !hasBreakInDefault)
              ? 'bg-sky-500/15 border-sky-500 text-sky-200' 
              : 'bg-slate-900/50 border-slate-800 text-slate-400'
          }`}>
            <span className="font-bold text-sky-400">case 1:</span>
            <p className="pl-4 text-emerald-300">System.out.print("One ");</p>
            <p className="pl-4 text-purple-300 font-bold">break;</p>
          </div>

          {/* Middle Default */}
          {placement === 'middle' && (
            <div className={`pl-4 p-2 rounded border my-1 ${
              inputVal === 99 ? 'bg-amber-500/15 border-amber-500 text-amber-200' : 'bg-slate-900/50 border-slate-800 text-slate-400'
            }`}>
              <span className="font-bold text-amber-400">default:</span>
              <p className="pl-4 text-emerald-300">System.out.print("DefaultFallback ");</p>
              {hasBreakInDefault && <p className="pl-4 text-purple-300 font-bold">break;</p>}
            </div>
          )}

          {/* Case 2 */}
          <div className={`pl-4 p-2 rounded border my-1 ${
            inputVal === 2 || (inputVal === 99 && placement === 'middle' && !hasBreakInDefault)
              ? 'bg-sky-500/15 border-sky-500 text-sky-200' 
              : 'bg-slate-900/50 border-slate-800 text-slate-400'
          }`}>
            <span className="font-bold text-sky-400">case 2:</span>
            <p className="pl-4 text-emerald-300">System.out.print("Two ");</p>
            <p className="pl-4 text-purple-300 font-bold">break;</p>
          </div>

          {/* Bottom Default */}
          {placement === 'bottom' && (
            <div className={`pl-4 p-2 rounded border my-1 ${
              inputVal === 99 ? 'bg-amber-500/15 border-amber-500 text-amber-200' : 'bg-slate-900/50 border-slate-800 text-slate-400'
            }`}>
              <span className="font-bold text-amber-400">default:</span>
              <p className="pl-4 text-emerald-300">System.out.print("DefaultFallback ");</p>
              {hasBreakInDefault && <p className="pl-4 text-purple-300 font-bold">break;</p>}
            </div>
          )}

          <p className="text-sky-300">{'}'}</p>
        </div>

        {/* Execution Output & Diagnostics */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Evaluated Program Output:
            </span>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-emerald-400 font-extrabold text-sm sm:text-base">
              {trace.output}
            </div>
          </div>

          {/* Execution Trace Timeline */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Step-by-Step JVM Dispatch Trace:
            </span>
            <div className="space-y-1.5 font-sans text-xs">
              {trace.steps.map((st, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
            <strong>Board Exam Takeaway:</strong> Notice that Java checks all specific case constants first. Even when <code className="text-amber-200 font-mono font-bold">default:</code> is written at the top, if <code className="text-sky-300 font-mono">val == 1</code>, Java skips default and jumps directly to <code className="text-sky-300 font-mono">case 1:</code>!
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic3() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <ShieldAlert className="w-4 h-4" /> CBSE Class 12 IT (Code 802) • Unit 3: Java Programming
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          The Role of the Default Clause in Switch Statements
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
          Master how the fallback <code className="text-amber-400 font-mono">default:</code> clause defends against unrecognized inputs, functions as the equivalent of a final <code className="text-rose-400 font-mono">else</code>, and creates subtle fall-through output traps when placed at the top or middle without a <code className="text-purple-400 font-mono">break;</code>.
        </p>
      </div>

      {/* Interactive Default Studio */}
      <div className="max-w-6xl mx-auto">
        <DefaultClauseStudio />
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: The Default Clause Revision Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: The Default Clause" 
          description="Master 25 exam-style questions on default fallback behavior, placement versatility, missing break fall-through traps, and defensive GUI coding with bilingual explanations." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="Whenever you see a switch statement in a question paper with 'default:' placed at the top or in the middle, raise your alert level! If there is no 'break;' after that default clause and an unhandled input enters, Java will execute default and then fall through into the next case, printing both! Always trace whether a break exists." 
        />
      </div>
    </div>
  );
}
