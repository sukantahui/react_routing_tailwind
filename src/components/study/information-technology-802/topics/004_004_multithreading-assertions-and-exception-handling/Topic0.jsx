import React, { useState } from 'react';
import { 
  Cpu, Play, RefreshCw, CheckCircle2, AlertTriangle, 
  HelpCircle, Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Code, Layers, Zap, Clock, Activity, Check
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

const ThreadLifecycleVisualizer = () => {
  const [currentState, setCurrentState] = useState('New');

  const states = [
    {
      name: 'New',
      badge: 'Born State',
      color: 'text-sky-400',
      border: 'border-sky-500/30',
      bg: 'bg-sky-500/10',
      desc: 'Thread object created (`Thread t = new MyThread()`), but `start()` has not been invoked yet.',
      action: 'Call start()',
      next: 'Runnable'
    },
    {
      name: 'Runnable',
      badge: 'Ready in Queue',
      color: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      desc: 'Thread is registered with the OS/JVM scheduler and waiting for CPU time slice.',
      action: 'JVM Scheduler allocates CPU',
      next: 'Running'
    },
    {
      name: 'Running',
      badge: 'Executing run()',
      color: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
      desc: 'Thread is currently executing instructions inside its `run()` method on a CPU core.',
      action: 'Finish run() or Sleep/Wait',
      next: 'Terminated'
    },
    {
      name: 'Blocked / Timed Waiting',
      badge: 'Suspended / Sleeping',
      color: 'text-rose-400',
      border: 'border-rose-500/30',
      bg: 'bg-rose-500/10',
      desc: 'Thread paused via `Thread.sleep(1000)` or waiting for I/O / resource lock.',
      action: 'Timer expires / I/O completes',
      next: 'Runnable'
    },
    {
      name: 'Terminated',
      badge: 'Dead State',
      color: 'text-purple-400',
      border: 'border-purple-500/30',
      bg: 'bg-purple-500/10',
      desc: '`run()` method execution has completed. Thread cannot be restarted.',
      action: 'Lifecycle Ended',
      next: 'New'
    }
  ];

  const currentObj = states.find(s => s.name === currentState) || states[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Activity className="w-3.5 h-3.5" /> Interactive Thread Lifecycle Simulator
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Java Thread State Transition Engine
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentState('New')}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Thread
          </button>
        </div>
      </div>

      {/* State Pipeline */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
        {states.map((st) => (
          <button
            key={st.name}
            onClick={() => setCurrentState(st.name)}
            className={`p-3 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center justify-between ${
              currentState === st.name
                ? `${st.bg} ${st.border} shadow-lg shadow-emerald-950/40 scale-102`
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-900'
            }`}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">{st.badge}</span>
            <span className={`text-sm font-bold mt-1 ${currentState === st.name ? st.color : 'text-slate-300'}`}>
              {st.name}
            </span>
          </button>
        ))}
      </div>

      {/* Active State Details */}
      <div className="grid lg:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Phase:</span>
            <span className={`text-sm font-bold ${currentObj.color}`}>{currentObj.name} ({currentObj.badge})</span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {currentObj.desc}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            {currentState === 'New' && (
              <button
                onClick={() => setCurrentState('Runnable')}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-emerald-950"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Execute thread.start()
              </button>
            )}

            {currentState === 'Runnable' && (
              <button
                onClick={() => setCurrentState('Running')}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-950"
              >
                <Cpu className="w-3.5 h-3.5" /> JVM Grants CPU Slice &rarr; Running
              </button>
            )}

            {currentState === 'Running' && (
              <>
                <button
                  onClick={() => setCurrentState('Blocked / Timed Waiting')}
                  className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5" /> Thread.sleep(1000) &rarr; Blocked
                </button>
                <button
                  onClick={() => setCurrentState('Terminated')}
                  className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-purple-950"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> run() Completes &rarr; Terminated
                </button>
              </>
            )}

            {currentState === 'Blocked / Timed Waiting' && (
              <button
                onClick={() => setCurrentState('Runnable')}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-950"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Sleep Finishes &rarr; Runnable
              </button>
            )}

            {currentState === 'Terminated' && (
              <button
                onClick={() => setCurrentState('New')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Instantiate New Thread Object
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-2">
          <span className="text-slate-400 font-bold block border-b border-slate-800 pb-1">JVM Thread State Log:</span>
          <div className="text-emerald-400 font-semibold">{`Thread.currentThread().getState()`}</div>
          <div className="text-cyan-300">{`=> State: ${currentState.toUpperCase().replace(' / TIMED WAITING', '_WAITING')}`}</div>
          <div className="text-slate-500 text-[11px] pt-1">
            Stack: Isolated Call Stack allocated in JVM memory.
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic0 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_004 • Topic 0
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Introduction to Multithreading in Java: Concurrent Program Execution & Thread Lifecycle
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Discover the foundational concepts of multithreading in Java, understand how lightweight threads execute concurrently to maximize CPU utilization, and trace the complete lifecycle transitions of a thread.
          </p>
        </div>

        {/* Interactive Visualizer */}
        <ThreadLifecycleVisualizer />

        {/* Core Concepts */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-3 text-sky-400">
              <Cpu className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">What is a Thread?</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              A <strong className="text-sky-300">thread</strong> is a lightweight sub-process, the smallest independent sequence of programmed instructions that can be managed separately by the operating system scheduler.
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>Threads within the same process share common heap memory and open files.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>Each thread maintains its own program counter, call stack, and local variables.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-3 text-emerald-400">
              <Zap className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Why Multithreading Matters in CBSE IT 802</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Multithreading allows multiple operations to run concurrently without blocking the entire application.
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>No CPU Idle Time:</strong> While one thread waits for disk/network I/O, other threads continue crunching data.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>Responsive GUI:</strong> In Java Swing/JavaFX, event dispatch threads stay fluid while background workers perform heavy calculations.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Teacher Sukanta Hui Component */}
        <Teacher
          quote="Always remember that thread concurrency is not the same as creating multiple processes. Threads share common heap memory, which makes context switching lightning fast compared to heavyweight processes. In board exams, focus on the 5 lifecycle states: New, Runnable, Running, Blocked, and Terminated!"
        />

        {/* CBSE Exam FAQs */}
        <FAQTemplate questions={questions} />

        {/* Printable Revision Notes */}
        <PlainTextPrint
          title="CBSE Class 12 IT (802) • Multithreading Introduction & Lifecycle"
          content={noteText}
        />
      </div>
    </div>
  );
};

export default Topic0;
