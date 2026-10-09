import React, { useState } from 'react';
import { 
  Cpu, Zap, Gauge, CheckCircle2, AlertTriangle, 
  HelpCircle, Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Code, Layers, RefreshCw, Sliders, Shield, AlertCircle
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

const ProductionPerformanceSimulator = () => {
  const [assertionsEnabled, setAssertionsEnabled] = useState(false);
  const [arraySize, setArraySize] = useState(10000);

  // Simulated execution time
  const baseTimeMs = 12;
  const assertionCheckTimeMs = assertionsEnabled ? Math.round((arraySize / 1000) * 4) : 0;
  const totalTimeMs = baseTimeMs + assertionCheckTimeMs;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
            <Gauge className="w-3.5 h-3.5" /> Runtime Overhead Simulator
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Why Assertions are Disabled by Default in Production
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setAssertionsEnabled(false)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              !assertionsEnabled
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950'
                : 'bg-slate-950 text-slate-400 border border-slate-800'
            }`}
          >
            Production Mode (Disabled - Default)
          </button>
          <button
            onClick={() => setAssertionsEnabled(true)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              assertionsEnabled
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950'
                : 'bg-slate-950 text-slate-400 border border-slate-800'
            }`}
          >
            Debug / QA Mode (Enabled `-ea`)
          </button>
        </div>
      </div>

      {/* Interactive Simulation Dashboard */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Runtime Execution Profile</span>
            <span className={assertionsEnabled ? 'text-amber-400 font-mono' : 'text-emerald-400 font-mono'}>
              {assertionsEnabled ? 'JVM Flag: -ea (Assertions Active)' : 'JVM Default: (Assertions Bypassed)'}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Array Dataset Size:</span>
                <span className="font-mono text-cyan-400 font-bold">{arraySize.toLocaleString()} elements</span>
              </div>
              <input
                type="range"
                min="5000"
                max="50000"
                step="5000"
                value={arraySize}
                onChange={(e) => setArraySize(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`// Heavy Invariant Check:
assert isArraySorted(largeDataArray) : "Data corrupted!";

// Business Processing:
processBankingTransactions(largeDataArray);`}
            </pre>
          </div>
        </div>

        {/* Metrics Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              CPU Performance Comparison
            </span>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Core Processing Time:</span>
                <span className="font-mono text-slate-200">{baseTimeMs} ms</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Assertion Evaluation Time:</span>
                <span className={`font-mono font-bold ${assertionsEnabled ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {assertionsEnabled ? `+${assertionCheckTimeMs} ms (Overhead)` : '0 ms (Bypassed by JVM)'}
                </span>
              </div>
              <div className="border-t border-slate-800 pt-2 flex justify-between items-center text-sm font-bold">
                <span className="text-white">Total Execution Time:</span>
                <span className={`font-mono ${assertionsEnabled ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {totalTimeMs} ms
                </span>
              </div>
            </div>
          </div>

          <div className={`p-3 rounded-xl border text-[11px] leading-relaxed ${
            assertionsEnabled 
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          }`}>
            {assertionsEnabled
              ? '⚠️ In QA/Dev mode, assertions help developers catch state corruption early, but consume measurable CPU cycles.'
              : '⚡ In Production mode, the JVM completely ignores assert statements, guaranteeing maximum processing throughput.'}
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic4 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_004 • Topic 4
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why the Assertion Feature is Disabled by Default in Java Runtime
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Understand the architectural reasons why the Java Virtual Machine keeps assertions disabled by default and how this preserves production performance without modifying bytecode.
          </p>
        </div>

        {/* Interactive Simulator */}
        <ProductionPerformanceSimulator />

        {/* 3 Pillars of Default Disablement */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
              <Zap className="w-4 h-4" /> 1. Maximum Performance
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Production servers processing millions of user requests per second incur zero overhead from developmental test checks.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <div className="text-sky-400 font-bold text-sm flex items-center gap-2">
              <Cpu className="w-4 h-4" /> 2. Zero Recompilation
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              The exact same `.class` bytecode binary runs in testing (assertions on) and production (assertions off) without rebuilds.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <div className="text-purple-400 font-bold text-sm flex items-center gap-2">
              <Shield className="w-4 h-4" /> 3. Clean Separation
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Prevents diagnostic debugging checks from interfering with live user exceptions and business validation rules.
            </p>
          </div>
        </div>

        {/* Teacher Sukanta Hui Component */}
        <Teacher
          quote="CBSE board examiners frequently ask: 'Why does Java disable assertions by default?' State clearly: To eliminate performance overhead in production environments and ensure the system runs at peak CPU speed without re-evaluating diagnostic invariants!"
        />

        {/* CBSE Exam FAQs */}
        <FAQTemplate questions={questions} />

        {/* Printable Revision Notes */}
        <PlainTextPrint
          title="CBSE Class 12 IT (802) • Why Assertions are Disabled by Default"
          content={noteText}
        />
      </div>
    </div>
  );
};

export default Topic4;
