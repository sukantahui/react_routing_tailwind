import React, { useState } from 'react';
import {
  GitBranch, ArrowRight, Play, CheckCircle2, AlertTriangle,
  HelpCircle, ShieldCheck, FileText, Code, Sparkles,
  Terminal, Layers, RefreshCw, Calculator
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/problem_solving_suite.py?raw";

// Interactive Flowchart Symbol Selector Component
const FlowchartSymbolExplorer = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('decision');

  const symbolData = {
    terminal: {
      name: "Oval / Rounded Capsule",
      role: "Start / Stop (Terminal)",
      shape: "Oval",
      color: "border-sky-500 text-sky-400 bg-sky-500/10",
      description: "Represents the absolute entry (START) and termination (STOP / END) points of the flowchart. A flowchart must contain exactly one START and at least one STOP symbol.",
      syntaxExample: "START\nSTOP"
    },
    io: {
      name: "Parallelogram",
      role: "Input / Output Operation",
      shape: "Parallelogram",
      color: "border-emerald-500 text-emerald-400 bg-emerald-500/10",
      description: "Represents data acquisition from users or devices (Input) and emission of calculated results to screens or printers (Output).",
      syntaxExample: "INPUT A, B\nREAD Mark\nPRINT Sum\nDISPLAY 'Passed'"
    },
    processing: {
      name: "Rectangle",
      role: "Processing / Computational Action",
      shape: "Rectangle",
      color: "border-amber-500 text-amber-400 bg-amber-500/10",
      description: "Represents internal arithmetic calculations, variable initializations, data manipulation, or memory assignments.",
      syntaxExample: "SUM = A + B\nI = I + 1\nFACT = 1\nAREA = PI * R * R"
    },
    decision: {
      name: "Diamond (Rhombus)",
      role: "Decision / Conditional Branching",
      shape: "Diamond",
      color: "border-rose-500 text-rose-400 bg-rose-500/10",
      description: "Evaluates a relational or boolean condition (True/False, Yes/No). It possesses one entry flowline and two or more exiting flowlines labeled with condition outcomes.",
      syntaxExample: "Is A > B ?\nIs Num % 2 == 0 ?\nIs Count <= 10 ?"
    },
    connector: {
      name: "Small Circle",
      role: "Connector (On-Page / Off-Page)",
      shape: "Circle",
      color: "border-purple-500 text-purple-400 bg-purple-500/10",
      description: "Used to connect intersecting or distant flowlines cleanly without drawing messy overlapping lines across the diagram.",
      syntaxExample: "Circle with letter 'A'\nLinks to matching 'A' elsewhere"
    }
  };

  return (
    <div className="bg-slate-950/90 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <GitBranch size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Standard Flowchart Geometric Notation Explorer
            </h3>
            <p className="text-xs text-slate-400">
              Click any standard flowchart symbol to inspect its standard CBSE drawing rules, role, and pseudocode equivalent.
            </p>
          </div>
        </div>
      </div>

      {/* Symbol Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {Object.keys(symbolData).map((key) => {
          const item = symbolData[key];
          const isSelected = selectedSymbol === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedSymbol(key)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? `${item.color} shadow-lg scale-105 font-bold`
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="text-xs block font-bold text-white truncate">{item.shape}</span>
              <span className="text-[10px] text-slate-400 block truncate">{item.role.split('(')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Symbol Detail Stage */}
      <div className={`p-5 rounded-2xl border ${symbolData[selectedSymbol].color} space-y-4`}>
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-white">{symbolData[selectedSymbol].name}</h4>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20">
            {symbolData[selectedSymbol].role}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {symbolData[selectedSymbol].description}
        </p>

        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-white/10 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Standard Pseudocode Example:</span>
          <pre className="font-mono text-xs text-sky-300 whitespace-pre-wrap">{symbolData[selectedSymbol].syntaxExample}</pre>
        </div>
      </div>
    </div>
  );
};

// Interactive Euclid GCD Trace Table Simulator
const LiveGcdTraceSimulator = () => {
  const [numA, setNumA] = useState(48);
  const [numB, setNumB] = useState(18);

  const a = Math.max(1, Math.floor(Number(numA) || 1));
  const b = Math.max(1, Math.floor(Number(numB) || 1));

  // Generate trace steps
  const steps = [];
  let curA = a;
  let curB = b;
  let stepCount = 1;

  while (curB !== 0) {
    const q = Math.floor(curA / curB);
    const r = curA % curB;
    steps.push({ step: stepCount, a: curA, b: curB, quotient: q, remainder: r, nextA: curB, nextB: r });
    curA = curB;
    curB = r;
    stepCount++;
  }

  const finalGcd = curA;

  return (
    <div className="bg-slate-900/90 rounded-2xl p-5 border border-sky-500/30 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Calculator size={18} className="text-sky-400" />
          <h4 className="text-sm font-bold text-white">Live Algorithm Trace Table (Euclid's GCD)</h4>
        </div>
        <span className="text-xs text-slate-400 font-mono">Manual Dry Run Simulation</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Number A:</label>
          <input
            type="number"
            min="1"
            value={numA}
            onChange={(e) => setNumA(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Number B:</label>
          <input
            type="number"
            min="1"
            value={numB}
            onChange={(e) => setNumB(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
          />
        </div>
      </div>

      {/* Trace Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono text-slate-300">
          <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-2 px-3">Step</th>
              <th className="py-2 px-3">A</th>
              <th className="py-2 px-3">B</th>
              <th className="py-2 px-3">Quotient (A // B)</th>
              <th className="py-2 px-3 text-sky-400">Remainder (A % B)</th>
              <th className="py-2 px-3">Next State (B, Rem)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {steps.map((s) => (
              <tr key={s.step} className="hover:bg-slate-800/30">
                <td className="py-2 px-3">{s.step}</td>
                <td className="py-2 px-3 font-bold text-white">{s.a}</td>
                <td className="py-2 px-3 font-bold text-emerald-400">{s.b}</td>
                <td className="py-2 px-3">{s.quotient}</td>
                <td className="py-2 px-3 text-sky-300 font-bold">{s.remainder}</td>
                <td className="py-2 px-3 text-slate-400">({s.nextA}, {s.nextB})</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-300">Remainder reached 0. Algorithm Terminated!</span>
        <span className="font-bold text-emerald-400 text-sm">GCD({a}, {b}) = {finalGcd}</span>
      </div>
    </div>
  );
};

export default function Topic0() {
  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* SECTION 1: HEADER & BREADCRUMB */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/50 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
                Unit II: Python · 45 Marks
              </span>
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                Module 004_001 · Topic 0
              </span>
              <span className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-full">
                Computational Thinking
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Problem-Solving Methodology, Algorithm Design, Flowcharts &amp; Trace Tables
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
              Master the computational thinking lifecycle: Problem Analysis, Algorithm Formulation, Standard Flowchart Geometry, Structured Pseudocode, and rigorous Manual Dry-Run Trace Table testing.
            </p>
          </div>
        </div>

        {/* SECTION 2: IN SIMPLE WORDS */}
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">In Simple Words: The Architectural Blueprint Analogy</h2>
              <p className="text-xs text-slate-400">Why planning algorithms must precede coding in Python</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            An architect never starts laying bricks on a construction site without first drawing a detailed structural blueprint. In computer science, <strong>Algorithms</strong> and <strong>Flowcharts</strong> are the engineering blueprints that prove logical correctness before writing a single line of Python code.
          </p>
        </div>

        {/* SECTION 3: INTERACTIVE FLOWCHART SYMBOL EXPLORER */}
        <div className="space-y-4">
          <FlowchartSymbolExplorer />
        </div>

        {/* SECTION 4: LIVE GCD TRACE SIMULATOR */}
        <div className="space-y-4">
          <LiveGcdTraceSimulator />
        </div>

        {/* SECTION 5: PYTHON LAB SCRIPT */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Code size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Python Laboratory: Classic Algorithms &amp; Automated Tracing
              </h2>
              <p className="text-xs text-slate-400">
                A Python suite implementing Euclid's GCD, Optimized Prime check, and Factorial with step-by-step trace tables.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <PythonFileLoader
              fileModule={pythonCode}
              title="problem_solving_suite.py – Algorithms & Trace Tables"
              highlightLines={[12, 25, 41, 58]}
            />
          </div>
        </div>

        {/* SECTION 6: REAL-WORLD CASE STUDIES */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Layers size={18} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Real-World Case Studies: Algorithmic Thinking in Action
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-sky-400">1. Bank ATM Cash Dispensation</span>
              <p className="text-slate-300 leading-relaxed">
                When a user requests ₹3,500, the ATM algorithm executes greedy denomination division: dispensing three ₹1000 notes and one ₹500 note, verifying account balance and daily limits via conditional branches.
              </p>
            </div>

            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400">2. GPS Navigation Shortest Route</span>
              <p className="text-slate-300 leading-relaxed">
                Google Maps uses Dijkstra's / A* graph search algorithms to compute the fastest route from Barrackpore to Kolkata Airport, dynamically weighting road congestion data in real time.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 7: COMMON PITFALLS & EXAM ALERTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
              <AlertTriangle size={16} /> Common Examination Pitfalls
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span><strong>Using Rectangles for Input:</strong> Drawing a rectangle for `READ N`. Input/Output must strictly use a <strong>Parallelogram</strong>.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span><strong>Missing Decision Branch Labels:</strong> Leaving diamond decision output arrows unlabeled. Always write <strong>'True / Yes'</strong> and <strong>'False / No'</strong>.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices &amp; Trace Tables
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Always Draw Trace Tables:</strong> In CBSE dry run questions, construct a neat table with columns for line numbers, variables, and condition evaluations.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Check Edge Cases:</strong> Test algorithms with $N = 0$, $N = 1$, and negative integers to verify boundary stability.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 8: FAQ ASSESSMENT */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              <HelpCircle size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Exam Preparation &amp; Conceptual Self-Assessment (25 Questions)
              </h2>
              <p className="text-xs text-slate-400">
                Test your mastery of problem-solving steps, algorithm design, flowchart symbols, and trace table dry runs.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <FAQTemplate questions={questions} />
          </div>
        </div>

        {/* SECTION 9: TEACHER'S NOTE & PRINTABLE SUMMARY */}
        <div className="space-y-6">
          <Teacher />

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <PlainTextPrint
              content={noteText}
              filename="004_001_problem_solving_and_flowcharts_notes.txt"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
