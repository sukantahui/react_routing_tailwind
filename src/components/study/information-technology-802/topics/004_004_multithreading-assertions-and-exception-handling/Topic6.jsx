import React, { useState } from 'react';
import { 
  ShieldAlert, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, Terminal, 
  Code, Zap, Layers, RefreshCw, Activity, Check, FileCheck
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

const TryCatchFlowSimulator = () => {
  const [scenario, setScenario] = useState('safe'); // 'safe', 'arithmetic_error', 'unhandled'

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            <Activity className="w-3.5 h-3.5" /> Exception Control Flow Simulator
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Tracing `try`, `catch`, and `finally` Execution Steps
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'safe', label: '1. Normal (No Error)' },
            { id: 'arithmetic_error', label: '2. Caught (Divide by 0)' },
            { id: 'unhandled', label: '3. Uncaught Exception' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setScenario(btn.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                scenario === btn.id
                  ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-950 font-bold'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Code and Pipeline Tracing */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center text-slate-400 font-bold uppercase tracking-wider text-[11px]">
            <span>Executing Java Structure</span>
            <span className="text-purple-400 font-normal">Scenario: {scenario.toUpperCase()}</span>
          </div>

          <pre className="text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 leading-relaxed overflow-x-auto">
{`try {
    System.out.println("Line 1: Entering try block");
    ${scenario === 'safe' 
      ? 'int result = 100 / 2; // Success (50)' 
      : scenario === 'arithmetic_error' 
      ? 'int result = 100 / 0; // Throws ArithmeticException!' 
      : 'String s = null; s.length(); // Throws NullPointerException!'}
    System.out.println("Line 2: try completed smoothly");
} 
catch (ArithmeticException e) {
    System.out.println("Line 3: Caught in catch block: " + e.getMessage());
} 
finally {
    System.out.println("Line 4: finally block ALWAYS executes!");
}

System.out.println("Line 5: Program continues normally.");`}
          </pre>
        </div>

        {/* Execution Flow Trace */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Console Output Log
            </span>

            <div className="space-y-1.5 font-mono text-xs">
              <div className="text-emerald-400">&gt; Line 1: Entering try block</div>

              {scenario === 'safe' && (
                <>
                  <div className="text-emerald-400">&gt; Line 2: try completed smoothly</div>
                  <div className="text-slate-600 line-through text-[11px]">&gt; [catch block skipped]</div>
                  <div className="text-purple-400 font-bold">&gt; Line 4: finally block ALWAYS executes!</div>
                  <div className="text-sky-400">&gt; Line 5: Program continues normally.</div>
                </>
              )}

              {scenario === 'arithmetic_error' && (
                <>
                  <div className="text-rose-400 text-[11px]">&gt; [ArithmeticException thrown at divide by 0]</div>
                  <div className="text-amber-400 font-bold">&gt; Line 3: Caught in catch block: / by zero</div>
                  <div className="text-purple-400 font-bold">&gt; Line 4: finally block ALWAYS executes!</div>
                  <div className="text-sky-400">&gt; Line 5: Program continues normally.</div>
                </>
              )}

              {scenario === 'unhandled' && (
                <>
                  <div className="text-rose-400 text-[11px]">&gt; [NullPointerException thrown! No matching catch]</div>
                  <div className="text-purple-400 font-bold">&gt; Line 4: finally block ALWAYS executes!</div>
                  <div className="text-rose-500 font-bold text-[11px] pt-1">
                    &gt; Exception in thread "main" java.lang.NullPointerException
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-200 text-xs leading-relaxed">
            <strong className="font-bold block text-purple-300 mb-1">Guaranteed `finally` Invariant:</strong>
            Notice that regardless of which scenario occurs, <code className="text-white font-mono font-bold">Line 4 (finally)</code> NEVER fails to run!
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_004 • Topic 6
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Java Exception Handling Overview: `try`, `catch`, and `finally` Blocks
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Master the structured error-handling architecture in Java, understand the 5 core keywords, and trace how control jumps between try, catch, and finally blocks.
          </p>
        </div>

        {/* Visualizer */}
        <TryCatchFlowSimulator />

        {/* 5 Keywords Overview */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="text-emerald-400 font-mono font-bold text-sm flex items-center gap-2">
              <Code className="w-4 h-4" /> 1. try
            </div>
            <p className="text-xs text-slate-300">Encloses code that might generate an unexpected runtime exception.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="text-amber-400 font-mono font-bold text-sm flex items-center gap-2">
              <Code className="w-4 h-4" /> 2. catch
            </div>
            <p className="text-xs text-slate-300">Catches and resolves specific exception instances to prevent program crashes.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="text-purple-400 font-mono font-bold text-sm flex items-center gap-2">
              <Code className="w-4 h-4" /> 3. finally
            </div>
            <p className="text-xs text-slate-300">Guaranteed execution block for cleanup operations (closing files/connections).</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="text-rose-400 font-mono font-bold text-sm flex items-center gap-2">
              <Code className="w-4 h-4" /> 4. throw
            </div>
            <p className="text-xs text-slate-300">Explicitly instantiates and triggers an exception object directly in code.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="text-sky-400 font-mono font-bold text-sm flex items-center gap-2">
              <Code className="w-4 h-4" /> 5. throws
            </div>
            <p className="text-xs text-slate-300">Declares the list of potential exceptions in a method signature.</p>
          </div>
        </div>

        {/* Teacher Sukanta Hui Component */}
        <Teacher
          quote="One of the most frequently tested concepts in CBSE Class XII IT 802 is the execution guarantee of the finally block. Remember: the finally block ALWAYS executes, even if the try block or catch block contains a return statement! The only exception is when System.exit(0) forcefully terminates the JVM."
        />

        {/* CBSE Exam FAQs */}
        <FAQTemplate questions={questions} />

        {/* Printable Revision Notes */}
        <PlainTextPrint
          title="CBSE Class 12 IT (802) • Try-Catch-Finally Exception Handling"
          content={noteText}
        />
      </div>
    </div>
  );
};

export default Topic6;
