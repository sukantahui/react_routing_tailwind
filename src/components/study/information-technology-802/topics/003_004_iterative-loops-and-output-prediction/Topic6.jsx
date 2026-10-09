import React, { useState } from 'react';
import { 
  Terminal, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, RefreshCw, 
  Code, Zap, Layers, Check, Flame, ShieldAlert, Cpu
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

const LoopSafetyInspector = () => {
  const [direction, setDirection] = useState('correct'); // 'correct' (decrement), 'wrong' (increment), 'none' (missing)
  const [startVal, setStartVal] = useState(8);
  const [stepVal, setStepVal] = useState(2);

  // Compute safety
  const safetyReport = {
    isInfinite: direction !== 'correct',
    reason: direction === 'wrong' 
      ? 'Updating in wrong direction: incrementing increases distance from lower boundary.'
      : direction === 'none'
      ? 'Missing update: variable remains constant, condition is perpetually true.'
      : 'Safe: decrement progresses variable towards condition termination.'
  };

  // Safe sample trace
  const safeLogs = [];
  if (direction === 'correct') {
    let curr = startVal;
    while (curr >= 2 && safeLogs.length < 10) {
      safeLogs.push(curr);
      curr -= stepVal;
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-2">
            <ShieldAlert className="w-3.5 h-3.5" /> Loop Termination & Safety Analyzer
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Detecting Infinite Loops & Decrement Tracing
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          Static Analysis & Loop Invariant Check
        </div>
      </div>

      {/* Control Selection */}
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        {[
          { id: 'correct', label: '1. Safe Decrement (x -= step)', color: 'border-emerald-500 bg-emerald-500/10 text-emerald-400' },
          { id: 'wrong', label: '2. Wrong Direction (x += step)', color: 'border-rose-500 bg-rose-500/10 text-rose-400' },
          { id: 'none', label: '3. Missing Update (x unmodified)', color: 'border-amber-500 bg-amber-500/10 text-amber-400' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setDirection(item.id)}
            className={`p-3 rounded-xl border text-xs font-bold transition text-left cursor-pointer ${
              direction === item.id 
                ? `${item.color} shadow-lg shadow-black/40` 
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/40'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Code and Evaluation */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Simulated Java Code Snippet:
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`int x = ${startVal};
while (x >= 2) {
    System.out.print(x + " ");
    ${direction === 'correct' ? `x -= ${stepVal}; // Moves towards termination` : direction === 'wrong' ? `x += ${stepVal}; // ❌ WRONG: increases infinitely!` : `// ❌ BUG: Forgotten update!`}
}`}
          </pre>

          <div className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
            safetyReport.isInfinite
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          }`}>
            {safetyReport.isInfinite ? (
              <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
            )}
            <div>
              <strong className="block font-bold mb-0.5">
                {safetyReport.isInfinite ? '⚠️ CRITICAL: Infinite Loop Detected' : '✅ SAFE: Normal Termination Guaranteed'}
              </strong>
              <span className="text-[11px] leading-relaxed opacity-90">{safetyReport.reason}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Loop Output Stream:
            </span>
            {direction === 'correct' ? (
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-emerald-400 flex flex-wrap gap-2">
                {safeLogs.map((val, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded">
                    {val}
                  </span>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 font-mono text-xs space-y-1">
                <div>💥 High CPU Utilization (100%)</div>
                <div>Process frozen: condition (x &gt;= 2) never becomes false!</div>
              </div>
            )}
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
            💡 <strong>Board Tip:</strong> If a question asks "How many times does this loop run?", look for update direction. If updating moves away from condition, answer is <strong>Infinite times</strong>.
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic6 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 003_004 • Topic 6
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Preventing Infinite Loops & Tracing Decrementing Loop Variables
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Identify and avoid the three most common causes of accidental infinite loops, explore intentional while(true) loops with guarded break statements, and trace step-decrementing loop variables.
          </p>
        </div>

        {/* Interactive Analyzer */}
        <LoopSafetyInspector />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Loop Termination & Safety"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Loop Safety Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 6 Note (.txt)"
          downloadFileName="003_004_topic6_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Whenever you encounter a while loop in the exam paper, check the increment/decrement line first! If the condition checks `x >= 1` but the body has `x++`, it will never stop. That's a classic 1-mark objective trap. — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic6;
