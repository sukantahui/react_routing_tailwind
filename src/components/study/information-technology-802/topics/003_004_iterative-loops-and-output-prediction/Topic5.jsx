import React, { useState } from 'react';
import { 
  Terminal, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, RefreshCw, 
  Code, Zap, Layers, Check, Scissors, FastForward, Play
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

const JumpStatementSimulator = () => {
  const [jumpAction, setJumpAction] = useState('break'); // 'break', 'continue', 'none'
  const [triggerValue, setTriggerValue] = useState(3);
  const maxLimit = 6;

  // Simulate loop
  const logs = [];
  for (let i = 1; i <= maxLimit; i++) {
    if (i === triggerValue) {
      if (jumpAction === 'break') {
        logs.push({ iter: i, action: 'BREAK executed! Entire loop terminated.', status: 'break' });
        break;
      } else if (jumpAction === 'continue') {
        logs.push({ iter: i, action: 'CONTINUE executed! Iteration skipped.', status: 'continue' });
        continue;
      }
    }
    logs.push({ iter: i, action: `Printed: "${i}"`, status: 'printed', val: i });
  }

  const printedOnly = logs.filter(l => l.status === 'printed').map(l => l.val);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-2">
            <Scissors className="w-3.5 h-3.5" /> Control Flow Interruption Simulator
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            `break` (Loop Termination) vs `continue` (Iteration Skip)
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          Java Jump Statement Diagnostics
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
        <div>
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
            Select Jump Statement to Test:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'none', label: 'No Jump' },
              { id: 'break', label: 'break;' },
              { id: 'continue', label: 'continue;' }
            ].map(btn => (
              <button
                key={btn.id}
                onClick={() => setJumpAction(btn.id)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer font-mono ${
                  jumpAction === btn.id
                    ? btn.id === 'break' ? 'bg-rose-500 text-slate-950 shadow-md shadow-rose-950'
                    : btn.id === 'continue' ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-950'
                    : 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
            Trigger Condition Value (`if (i == {triggerValue})`):
          </label>
          <input
            type="range"
            min="1"
            max="6"
            value={triggerValue}
            onChange={(e) => setTriggerValue(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>i=1</span>
            <span>i=2</span>
            <span>i=3</span>
            <span>i=4</span>
            <span>i=5</span>
            <span>i=6</span>
          </div>
        </div>
      </div>

      {/* Code and Live Trace */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Generated Java Execution Code:
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`for (int i = 1; i <= 6; i++) {
    if (i == ${triggerValue}) {
        ${jumpAction === 'break' ? 'break; // Terminates entire loop' : jumpAction === 'continue' ? 'continue; // Skips current iteration' : '// Normal execution'}
    }
    System.out.print(i + " ");
}`}
          </pre>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Console Output Result:
            </span>
            <div className="font-mono text-base font-bold text-emerald-400">
              {printedOnly.length > 0 ? printedOnly.join(" ") + " " : <span className="text-rose-400 text-xs">No output produced</span>}
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Step-by-Step Loop Event Log:
          </span>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {logs.map((log, idx) => (
              <div 
                key={idx}
                className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                  log.status === 'break'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-300 font-bold'
                    : log.status === 'continue'
                    ? 'bg-sky-500/10 border-sky-500/30 text-sky-300 font-bold'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300'
                }`}
              >
                <span>Pass i = {log.iter}</span>
                <span>{log.action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic5 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 003_004 • Topic 5
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Loop Control Jump Statements: <code className="text-rose-400 font-mono">break</code> and <code className="text-sky-400 font-mono">continue</code>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Understand how jump statements alter iterative loops, explore the contrasting effects of terminating an entire loop versus skipping a single iteration, and master while-loop continue precautions.
          </p>
        </div>

        {/* Interactive Simulator */}
        <JumpStatementSimulator />

        {/* Side by side comparison */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Scissors className="w-5 h-5 text-rose-400" />
              The `break` Statement
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Causes immediate termination of the innermost enclosing loop or switch block. No further iterations are attempted. Control is transferred to the line immediately after the loop closing brace.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FastForward className="w-5 h-5 text-sky-400" />
              The `continue` Statement
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Bypasses the rest of the statements in the current iteration only. In a for loop, it jumps to the update expression (e.g. <code className="text-white font-mono">i++</code>). In a while loop, it jumps to the condition check.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Break and Continue"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Jump Statements Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 5 Note (.txt)"
          downloadFileName="003_004_topic5_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Remember: In a while loop, never place your variable increment after a continue statement without incrementing first! Otherwise, your program will get stuck in an infinite loop because the variable value never changes. — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic5;
