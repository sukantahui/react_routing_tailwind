import React, { useState } from 'react';
import { 
  Play, Repeat, Layers, CheckCircle2, AlertTriangle, 
  HelpCircle, Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Code, Zap, RefreshCw, Activity, Check
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

const CallStackVisualizer = () => {
  const [invocationType, setInvocationType] = useState('start'); // 'start' | 'run'

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Layers className="w-3.5 h-3.5" /> JVM Call Stack Visualizer
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            `t.start()` vs `t.run()` Internal Execution Trace
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setInvocationType('start')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              invocationType === 'start'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950'
                : 'bg-slate-950 text-slate-400 border border-slate-800'
            }`}
          >
            Invoking `t.start()` (Concurrent)
          </button>
          <button
            onClick={() => setInvocationType('run')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              invocationType === 'run'
                ? 'bg-rose-500 text-slate-950 shadow-md shadow-rose-950'
                : 'bg-slate-950 text-slate-400 border border-slate-800'
            }`}
          >
            Calling `t.run()` Directly (Synchronous)
          </button>
        </div>
      </div>

      {/* Visual Stacks */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Main Thread Stack */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
            <span>Call Stack: "main" Thread</span>
            <span className="text-emerald-400">Main Thread Stack</span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {invocationType === 'run' ? (
              <>
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold animate-pulse">
                  &uarr; Worker.run() [Executing on main stack!]
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300">
                  Main.main() [BLOCKED waiting for run() to finish]
                </div>
              </>
            ) : (
              <>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold">
                  &uarr; Main.main() [Continues executing concurrently!]
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-[11px]">
                  Thread.start() returned immediately after registering worker
                </div>
              </>
            )}
          </div>
        </div>

        {/* Worker Thread Stack */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
            <span>Call Stack: "Thread-0" (New Stack)</span>
            <span className={invocationType === 'start' ? 'text-sky-400 font-bold' : 'text-slate-600'}>
              {invocationType === 'start' ? 'SPAWNED & ACTIVE' : 'DOES NOT EXIST'}
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {invocationType === 'start' ? (
              <div className="p-3 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-300 font-bold animate-pulse">
                &uarr; Worker.run() [Executing asynchronously on Thread-0]
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-slate-900/40 border border-dashed border-slate-800 text-center text-slate-600 text-xs">
                No new call stack created. Everything is running synchronously on the main thread stack.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Key Diagnostic Banner */}
      <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
        invocationType === 'start'
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
          : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
      }`}>
        <strong className="font-bold block mb-1">
          {invocationType === 'start' ? '✅ Correct Multithreading Pattern:' : '⚠️ Common Anti-Pattern Trap:'}
        </strong>
        {invocationType === 'start' ? (
          <span>`t.start()` requests the JVM to allocate a brand new native call stack and then invokes `run()` on that stack. The main method continues executing concurrently without waiting.</span>
        ) : (
          <span>Calling `t.run()` directly does NOT create a new thread. It simply executes the statements inside `run()` sequentially on the current (main) thread stack, blocking main until finished.</span>
        )}
      </div>
    </div>
  );
};

const Topic2 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_004 • Topic 2
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Overriding the `run()` Method and Invoking Threads using `start()`
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Understand the exact mechanics of overriding `run()` and why invoking `start()` is mandatory to initiate a new thread call stack in Java.
          </p>
        </div>

        {/* Visualizer */}
        <CallStackVisualizer />

        {/* Core Rules & Common Pitfalls */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-emerald-400" />
              The `public void run()` Rules
            </h3>
            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>No Arguments:</strong> The method signature must be strictly `public void run()`.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>No Checked Exceptions:</strong> Because `run()` in `Runnable` does not declare `throws Exception`, your overridden `run()` cannot throw checked exceptions without handling them inside `try-catch`.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>Entry Point:</strong> Contains the complete task instructions the thread will perform.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              The `start()` Invariant & Lifecycle Trap
            </h3>
            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Called Only Once:</strong> Calling `start()` on an active or terminated thread throws <code className="text-rose-300">IllegalThreadStateException</code>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Never Override start():</strong> Unless you explicitly call `super.start()`, overriding `start()` will prevent the JVM from initializing a new thread stack.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Teacher Sukanta Hui Component */}
        <Teacher
          quote="A favorite CBSE board exam question tests your understanding with: 'What happens if we call t.run() instead of t.start()?' Your answer must mention that NO new thread is created; the statements inside run() execute like normal sequential code on the caller thread's stack!"
        />

        {/* CBSE Exam FAQs */}
        <FAQTemplate questions={questions} />

        {/* Printable Revision Notes */}
        <PlainTextPrint
          title="CBSE Class 12 IT (802) • Overriding run() vs Calling start()"
          content={noteText}
        />
      </div>
    </div>
  );
};

export default Topic2;
