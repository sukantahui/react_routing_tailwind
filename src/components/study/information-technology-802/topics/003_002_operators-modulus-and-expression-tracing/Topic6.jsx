import React, { useState } from 'react';
import { 
  Zap, ShieldAlert, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, RefreshCw, 
  Code, Terminal, Layers, Play, Check, Flame, XCircle
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

const ShortCircuitVisualizer = () => {
  const [operator, setOperator] = useState('&&'); // '&&', '||', '&', '|'
  const [leftValue, setLeftValue] = useState(false);
  const [rightEffectType, setRightEffectType] = useState('counter'); // 'counter' or 'divZero'
  const [counterInitial, setCounterInitial] = useState(10);

  // Calculate execution flow
  let isShortCircuited = false;
  let finalResult = false;
  let rightEvaluated = false;
  let hasException = false;
  let finalCounter = counterInitial;

  if (operator === '&&') {
    if (leftValue === false) {
      isShortCircuited = true;
      rightEvaluated = false;
      finalResult = false;
    } else {
      isShortCircuited = false;
      rightEvaluated = true;
      if (rightEffectType === 'divZero') {
        hasException = true;
      } else {
        finalCounter = counterInitial + 1;
        finalResult = finalCounter > 10;
      }
    }
  } else if (operator === '||') {
    if (leftValue === true) {
      isShortCircuited = true;
      rightEvaluated = false;
      finalResult = true;
    } else {
      isShortCircuited = false;
      rightEvaluated = true;
      if (rightEffectType === 'divZero') {
        hasException = true;
      } else {
        finalCounter = counterInitial + 1;
        finalResult = finalCounter > 10;
      }
    }
  } else if (operator === '&') {
    // Non-short-circuit bitwise AND
    isShortCircuited = false;
    rightEvaluated = true;
    if (rightEffectType === 'divZero') {
      hasException = true;
    } else {
      finalCounter = counterInitial + 1;
      finalResult = leftValue && (finalCounter > 10);
    }
  } else if (operator === '|') {
    // Non-short-circuit bitwise OR
    isShortCircuited = false;
    rightEvaluated = true;
    if (rightEffectType === 'divZero') {
      hasException = true;
    } else {
      finalCounter = counterInitial + 1;
      finalResult = leftValue || (finalCounter > 10);
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Zap className="w-3.5 h-3.5" /> Interactive Logic & Short-Circuit Studio
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Short-Circuit Evaluation vs Non-Short-Circuit Simulation
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setLeftValue(false);
              setOperator('&&');
              setRightEffectType('counter');
              setCounterInitial(10);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Demo
          </button>
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* Step 1: Left Operand */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            1. Left Condition (Operand A)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setLeftValue(true)}
              className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all border ${
                leftValue === true 
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-950'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
              }`}
            >
              true
            </button>
            <button
              onClick={() => setLeftValue(false)}
              className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all border ${
                leftValue === false 
                  ? 'bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-950'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
              }`}
            >
              false
            </button>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Value evaluated first on the left side.
          </p>
        </div>

        {/* Step 2: Operator */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            2. Operator Selection
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { op: '&&', label: '&& (AND)', type: 'Short-Circuit' },
              { op: '||', label: '|| (OR)', type: 'Short-Circuit' },
              { op: '&', label: '& (Bit)', type: 'Eager' },
              { op: '|', label: '| (Bit)', type: 'Eager' }
            ].map(({ op, label }) => (
              <button
                key={op}
                onClick={() => setOperator(op)}
                className={`py-2 px-1 text-center rounded-lg text-xs font-mono font-bold transition-all border ${
                  operator === op 
                    ? 'bg-sky-600 text-white border-sky-400 shadow-md shadow-sky-950'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {op}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            {operator === '&&' || operator === '||' 
              ? '⚡ Short-circuit enabled: stops early if possible.' 
              : '⚠️ Eager evaluation: always evaluates both sides.'}
          </p>
        </div>

        {/* Step 3: Right Operand Side Effect */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            3. Right Operand (Operand B)
          </label>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setRightEffectType('counter')}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold text-left transition-all border ${
                rightEffectType === 'counter'
                  ? 'bg-purple-600 text-white border-purple-400'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
              }`}
            >
              Side Effect: <code className="font-mono text-purple-200">++counter &gt; 10</code>
            </button>
            <button
              onClick={() => setRightEffectType('divZero')}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold text-left transition-all border ${
                rightEffectType === 'divZero'
                  ? 'bg-amber-600 text-white border-amber-400'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
              }`}
            >
              Division Hazard: <code className="font-mono text-amber-200">100 / 0 &gt; 2</code>
            </button>
          </div>
        </div>
      </div>

      {/* Code Display & Live Execution Trace */}
      <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 mb-6 font-mono text-sm">
        <div className="text-xs text-slate-400 uppercase tracking-widest font-sans mb-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Code className="w-4 h-4 text-emerald-400" /> Java Execution Trace
          </span>
          <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${
            isShortCircuited 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : hasException 
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
          }`}>
            {isShortCircuited ? '⚡ SHORT-CIRCUITED' : hasException ? '💥 CRASH OCCURRED' : '🔄 FULLY EVALUATED'}
          </span>
        </div>

        <div className="bg-slate-900/90 p-4 rounded-lg border border-slate-800/80 overflow-x-auto text-slate-200">
          <p className="text-slate-500">// Variable initializations</p>
          {rightEffectType === 'counter' ? (
            <p className="text-purple-300">int counter = {counterInitial};</p>
          ) : (
            <p className="text-amber-300">int divisor = 0;</p>
          )}
          <p className="mt-2 text-slate-300">
            boolean result = <span className={leftValue ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{String(leftValue)}</span>{' '}
            <span className="text-sky-400 font-bold">{operator}</span>{' '}
            {rightEffectType === 'counter' ? (
              <span className={rightEvaluated ? 'text-purple-300 font-bold underline' : 'text-slate-500 line-through'}>
                (++counter &gt; 10)
              </span>
            ) : (
              <span className={rightEvaluated ? 'text-rose-400 font-bold underline' : 'text-slate-500 line-through'}>
                (100 / divisor &gt; 2)
              </span>
            )};
          </p>
        </div>

        {/* Diagnostic Breakdown */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-900/70 p-3 rounded-lg border border-slate-800">
            <span className="text-[11px] text-slate-400 font-sans block">Left Operand Result:</span>
            <span className={`text-base font-bold ${leftValue ? 'text-emerald-400' : 'text-rose-400'}`}>
              {String(leftValue)}
            </span>
          </div>

          <div className="bg-slate-900/70 p-3 rounded-lg border border-slate-800">
            <span className="text-[11px] text-slate-400 font-sans block">Right Operand Evaluated?</span>
            <span className={`text-base font-bold ${rightEvaluated ? 'text-amber-400' : 'text-emerald-400'}`}>
              {rightEvaluated ? 'YES (Evaluated)' : 'NO (BYPASSED / SKIPPED)'}
            </span>
          </div>

          <div className="bg-slate-900/70 p-3 rounded-lg border border-slate-800">
            <span className="text-[11px] text-slate-400 font-sans block">
              {rightEffectType === 'counter' ? 'Final counter Value:' : 'Runtime Status:'}
            </span>
            {hasException ? (
              <span className="text-xs font-bold text-rose-400 flex items-center gap-1 mt-1">
                <AlertTriangle className="w-3.5 h-3.5" /> ArithmeticException!
              </span>
            ) : (
              <span className="text-base font-bold text-sky-400">
                {rightEffectType === 'counter' ? finalCounter : (finalResult ? 'true' : 'false')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* CBSE Key Takeaways */}
      <div className={`p-4 rounded-xl border text-sm leading-relaxed ${
        hasException 
          ? 'bg-rose-500/10 border-rose-500/30 text-rose-200'
          : isShortCircuited 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
            : 'bg-sky-500/10 border-sky-500/30 text-sky-200'
      }`}>
        <div className="flex items-start gap-2.5">
          {hasException ? (
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          ) : isShortCircuited ? (
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <Zap className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
          )}
          <div>
            <h4 className="font-semibold text-white mb-1">
              {hasException 
                ? 'CRASH! Why single `&` or eager evaluation failed:' 
                : isShortCircuited 
                  ? 'CBSE Exam Secret: Short-Circuit Protection' 
                  : 'Full Evaluation Flow'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              {hasException ? (
                <>Because single <code className="text-amber-300 font-bold font-mono">&</code> or <code className="text-amber-300 font-bold font-mono">|</code> does NOT short-circuit, Java attempted to compute <code className="text-rose-300 font-mono">100 / 0</code>, throwing <code className="text-rose-400 font-mono">java.lang.ArithmeticException: / by zero</code>. Using double <code className="text-emerald-400 font-mono">&&</code> completely prevents this crash!</>
              ) : isShortCircuited ? (
                operator === '&&' 
                  ? <>In <code className="text-emerald-300 font-mono">false && ...</code>, since the left side is already <code className="text-rose-300 font-mono">false</code>, the overall expression can never be true! Java skips the right side entirely. Notice that any side effects (like <code className="text-purple-300 font-mono">++counter</code>) are NEVER executed!</>
                  : <>In <code className="text-emerald-300 font-mono">true || ...</code>, since the left side is already <code className="text-emerald-300 font-mono">true</code>, the overall expression is already guaranteed to be true! Java skips evaluating the right operand entirely.</>
              ) : (
                <>Both operands had to be evaluated. With <code className="text-sky-300 font-mono">{operator}</code>, the right side was executed, updating variables accordingly.</>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic6() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <ShieldAlert className="w-4 h-4" /> CBSE Class 12 IT (Code 802) • Unit 3: Java Programming
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Relational & Logical Operators in Java
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
          Master the exact behavior of relational comparisons (<code className="text-emerald-400 font-mono">==</code>, <code className="text-emerald-400 font-mono">!=</code>, <code className="text-emerald-400 font-mono">&lt;</code>, <code className="text-emerald-400 font-mono">&gt;=</code>), boolean logic (<code className="text-sky-400 font-mono">&amp;&amp;</code>, <code className="text-sky-400 font-mono">||</code>, <code className="text-amber-400 font-mono">!</code>), and short-circuit evaluation traps.
        </p>
      </div>

      {/* Interactive Studio */}
      <div className="max-w-6xl mx-auto">
        <ShortCircuitVisualizer />
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: Relational & Logical Operators Revision Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: Relational & Logical Operators" 
          description="Master 25 exam-style questions on relational comparison, short-circuit evaluation bypass, side-effects, and De Morgan's laws with bilingual explanations." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="CBSE Board Examiner Favorite Trap: Notice the expression '(a > 15) && (++b > 20)'. When 'a > 15' is false, Java's '&&' short-circuits and skips '++b' completely! If the exam asks what the value of 'b' is after the statement, remember that 'b' did NOT increment! Always inspect the left operand first." 
        />
      </div>
    </div>
  );
}
