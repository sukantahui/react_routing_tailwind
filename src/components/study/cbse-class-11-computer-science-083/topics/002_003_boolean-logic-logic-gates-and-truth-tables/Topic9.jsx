import React, { useState } from 'react';
import {
  Cpu, Zap, BookOpen, Code, CheckCircle2,
  AlertTriangle, HelpCircle, ShieldCheck, FileText,
  Activity, ArrowRight, Layers, Sparkles, Check, Play, RefreshCw
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";
import pythonCode from "./topic9_files/circuit_synthesis_engine.py?raw";

// Interactive Logic Circuit Synthesizer Sandbox
const CircuitSynthesisSandbox = () => {
  const [selectedCircuit, setSelectedCircuit] = useState('sop');
  const [inputA, setInputA] = useState(1);
  const [inputB, setInputB] = useState(0);
  const [inputC, setInputC] = useState(1);

  // Compute intermediate node signals and final output
  const computeCircuit = () => {
    if (selectedCircuit === 'sop') {
      // Y = A'B + AC'
      const nA = 1 - inputA;
      const nC = 1 - inputC;
      const g1 = nA & inputB;
      const g2 = inputA & nC;
      const y = g1 | g2;
      return {
        name: "Y = A'B + AC' (AND-OR SOP Synthesis)",
        nodes: { "A' (N1)": nA, "C' (N2)": nC, "A'B (G1)": g1, "AC' (G2)": g2 },
        output: y
      };
    } else if (selectedCircuit === 'pos') {
      // Y = (A + B') · (A' + C)
      const nB = 1 - inputB;
      const nA = 1 - inputA;
      const g1 = inputA | nB;
      const g2 = nA | inputC;
      const y = g1 & g2;
      return {
        name: "Y = (A + B') · (A' + C) (OR-AND POS Synthesis)",
        nodes: { "B' (N1)": nB, "A' (N2)": nA, "A+B' (G1)": g1, "A'+C (G2)": g2 },
        output: y
      };
    } else {
      // Half Adder Circuit
      const sum = inputA ^ inputB;
      const carry = inputA & inputB;
      return {
        name: "Half Adder Circuit (Sum = A ⊕ B, Carry = A · B)",
        nodes: { "Sum (XOR)": sum, "Carry (AND)": carry },
        output: sum
      };
    }
  };

  const sim = computeCircuit();

  return (
    <div className="bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <Cpu size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Logic Circuit Synthesizer &amp; Schematic Sandbox
            </h3>
            <p className="text-xs text-slate-400">
              Select a circuit topology, toggle input pin voltages, and trace digital signal propagation across intermediate gate nodes.
            </p>
          </div>
        </div>

        {/* Circuit Selector */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setSelectedCircuit('sop')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
              selectedCircuit === 'sop' ? 'bg-sky-500 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            SOP (AND-OR)
          </button>
          <button
            onClick={() => setSelectedCircuit('pos')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
              selectedCircuit === 'pos' ? 'bg-sky-500 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            POS (OR-AND)
          </button>
          <button
            onClick={() => setSelectedCircuit('adder')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
              selectedCircuit === 'adder' ? 'bg-sky-500 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Half Adder
          </button>
        </div>
      </div>

      {/* Stage Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        {/* Left: Input Terminals */}
        <div className="md:col-span-4 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Input Pin Controls:</span>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-bold text-white">Input Pin A:</span>
            <button
              onClick={() => setInputA(inputA === 0 ? 1 : 0)}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-lg cursor-pointer ${
                inputA === 1 ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              A = {inputA}
            </button>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-bold text-white">Input Pin B:</span>
            <button
              onClick={() => setInputB(inputB === 0 ? 1 : 0)}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-lg cursor-pointer ${
                inputB === 1 ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              B = {inputB}
            </button>
          </div>

          {selectedCircuit !== 'adder' && (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-bold text-white">Input Pin C:</span>
              <button
                onClick={() => setInputC(inputC === 0 ? 1 : 0)}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-lg cursor-pointer ${
                  inputC === 1 ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                C = {inputC}
              </button>
            </div>
          )}

          {/* Intermediate Node Output Badges */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Internal Gate Nodes:</span>
            {Object.entries(sim.nodes).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between">
                <span className="text-slate-300">{k}:</span>
                <span className={`font-bold ${v === 1 ? 'text-amber-400' : 'text-slate-500'}`}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Circuit Schematic SVG */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[220px]">
          <svg viewBox="0 0 320 180" className="w-full max-w-[300px] h-auto">
            {selectedCircuit === 'sop' && (
              <g transform="translate(10, 10)">
                {/* Inputs */}
                <text x="0" y="25" fill="#38bdf8" fontSize="10" fontWeight="bold">A={inputA}</text>
                <text x="0" y="75" fill="#38bdf8" fontSize="10" fontWeight="bold">B={inputB}</text>
                <text x="0" y="125" fill="#38bdf8" fontSize="10" fontWeight="bold">C={inputC}</text>

                {/* Inverter 1 for A */}
                <polygon points="25,15 45,25 25,35" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="48" cy="25" r="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />

                {/* Inverter 2 for C */}
                <polygon points="25,115 45,125 25,135" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="48" cy="125" r="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />

                {/* AND Gate 1 (A'B) */}
                <line x1="51" y1="25" x2="80" y2="25" stroke="#e2e8f0" strokeWidth="2" />
                <line x1="15" y1="75" x2="80" y2="45" stroke="#e2e8f0" strokeWidth="2" />
                <path d="M 80 15 L 110 15 A 20 20 0 0 1 110 55 L 80 55 Z" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="85" y="38" fill="#10b981" fontSize="9" fontWeight="bold">AND 1</text>

                {/* AND Gate 2 (AC') */}
                <line x1="15" y1="25" x2="20" y2="25" stroke="#e2e8f0" strokeWidth="2" />
                <line x1="20" y1="25" x2="20" y2="95" stroke="#e2e8f0" strokeWidth="2" />
                <line x1="20" y1="95" x2="80" y2="95" stroke="#e2e8f0" strokeWidth="2" />
                <line x1="51" y1="125" x2="80" y2="115" stroke="#e2e8f0" strokeWidth="2" />
                <path d="M 80 85 L 110 85 A 20 20 0 0 1 110 125 L 80 125 Z" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="85" y="108" fill="#10b981" fontSize="9" fontWeight="bold">AND 2</text>

                {/* Connecting to Output OR */}
                <path d="M 130 35 L 180 35 L 180 60 L 195 60" stroke="#f59e0b" strokeWidth="2" fill="none" />
                <path d="M 130 105 L 180 105 L 180 80 L 195 80" stroke="#f59e0b" strokeWidth="2" fill="none" />

                {/* OR Gate Output */}
                <path d="M 195 45 Q 210 70 195 95 Q 240 95 265 70 Q 240 45 195 45 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <line x1="265" y1="70" x2="300" y2="70" stroke={sim.output === 1 ? "#10b981" : "#ef4444"} strokeWidth="3.5" />
                <text x="270" y="58" fill={sim.output === 1 ? "#10b981" : "#ef4444"} fontSize="12" fontWeight="bold">Y={sim.output}</text>
              </g>
            )}

            {selectedCircuit === 'pos' && (
              <g transform="translate(10, 10)">
                <text x="0" y="25" fill="#38bdf8" fontSize="10" fontWeight="bold">A={inputA}</text>
                <text x="0" y="75" fill="#38bdf8" fontSize="10" fontWeight="bold">B={inputB}</text>
                <text x="0" y="125" fill="#38bdf8" fontSize="10" fontWeight="bold">C={inputC}</text>

                {/* OR 1 & OR 2 to AND */}
                <path d="M 70 15 Q 85 35 70 55 Q 105 55 125 35 Q 105 15 70 15 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="75" y="38" fill="#38bdf8" fontSize="9" fontWeight="bold">OR 1</text>

                <path d="M 70 85 Q 85 105 70 125 Q 105 125 125 105 Q 105 85 70 85 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="75" y="108" fill="#38bdf8" fontSize="9" fontWeight="bold">OR 2</text>

                {/* Final AND */}
                <path d="M 125 35 L 180 35 L 180 60 L 195 60" stroke="#f59e0b" strokeWidth="2" fill="none" />
                <path d="M 125 105 L 180 105 L 180 80 L 195 80" stroke="#f59e0b" strokeWidth="2" fill="none" />
                <path d="M 195 50 L 230 50 A 20 20 0 0 1 230 90 L 195 90 Z" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <line x1="250" y1="70" x2="300" y2="70" stroke={sim.output === 1 ? "#10b981" : "#ef4444"} strokeWidth="3.5" />
                <text x="270" y="58" fill={sim.output === 1 ? "#10b981" : "#ef4444"} fontSize="12" fontWeight="bold">Y={sim.output}</text>
              </g>
            )}

            {selectedCircuit === 'adder' && (
              <g transform="translate(10, 10)">
                <text x="0" y="45" fill="#38bdf8" fontSize="11" fontWeight="bold">A={inputA}</text>
                <text x="0" y="105" fill="#38bdf8" fontSize="11" fontWeight="bold">B={inputB}</text>

                {/* XOR for Sum */}
                <path d="M 70 20 Q 88 50 70 80" stroke="#c084fc" strokeWidth="2" fill="none" />
                <path d="M 80 20 Q 98 50 80 80 Q 120 80 145 50 Q 120 20 80 20 Z" fill="#1e293b" stroke="#c084fc" strokeWidth="2" />
                <line x1="145" y1="50" x2="210" y2="50" stroke={sim.nodes["Sum (XOR)"] === 1 ? "#10b981" : "#ef4444"} strokeWidth="3" />
                <text x="215" y="54" fill="#c084fc" fontSize="11" fontWeight="bold">Sum={sim.nodes["Sum (XOR)"]}</text>

                {/* AND for Carry */}
                <path d="M 80 100 L 115 100 A 20 20 0 0 1 115 140 L 80 140 Z" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <line x1="135" y1="120" x2="210" y2="120" stroke={sim.nodes["Carry (AND)"] === 1 ? "#10b981" : "#ef4444"} strokeWidth="3" />
                <text x="215" y="124" fill="#10b981" fontSize="11" fontWeight="bold">Carry={sim.nodes["Carry (AND)"]}</text>
              </g>
            )}
          </svg>
        </div>

        {/* Right: Output Voltage Status */}
        <div className="md:col-span-3 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
          <div className={`p-3 rounded-full ${sim.output === 1 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
            <Zap size={32} />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Final Output Y:</span>
          <span className={`text-2xl font-mono font-extrabold ${sim.output === 1 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {sim.output === 1 ? '1 (HIGH / 5V)' : '0 (LOW / 0V)'}
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            {sim.name.split(' ')[0]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Topic9() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002 · Topic 9
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Circuit Synthesis &amp; Schematic Analysis
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Logic Circuit Synthesis: Drawing Diagrams from Expressions &amp; Deriving Boolean Functions
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the dual engineering workflows: translating Boolean algebraic equations into multi-level schematic diagrams (AND-OR, OR-AND, Adders), and reverse-engineering logic circuit diagrams to extract mathematical Boolean expressions.
            </p>
          </div>
        </div>

        {/* 2. Deep Conceptual Explanation */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Two-Way Engineering Synthesis Workflows
              </h2>
              <p className="text-xs text-slate-400">
                Forward synthesis (Math &rarr; Silicon) and Backward analysis (Silicon &rarr; Math).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-3">
              <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30 uppercase">Forward Workflow</span>
              <h3 className="text-base font-bold text-white">Expression &rarr; Circuit Diagram</h3>
              <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
                <li>Draw input variable rails on the left margin (A, B, C).</li>
                <li>Add Inverter (NOT) gates to generate complemented rails (A&apos;, B&apos;).</li>
                <li>Synthesize first-level AND gates (for SOP) or OR gates (for POS).</li>
                <li>Combine term outputs into the final rightmost OR/AND output gate.</li>
              </ol>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-3">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 uppercase">Reverse Workflow</span>
              <h3 className="text-base font-bold text-white">Circuit Diagram &rarr; Boolean Expression</h3>
              <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
                <li>Trace signal paths from LEFT (Inputs) to RIGHT (Outputs).</li>
                <li>Write down intermediate expressions at the output pin of each gate.</li>
                <li>Combine intermediate expressions entering the final stage gate.</li>
                <li>Simplify the extracted Boolean expression if requested.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* 3. Interactive Circuit Simulator */}
        <CircuitSynthesisSandbox />

        {/* 4. Deep Technical Breakdown: Two-Level Logic */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Two-Level Logic Circuit Architectures: SOP vs POS
              </h2>
              <p className="text-xs text-slate-400">
                Standard digital canonical structures for minimizing propagation delay.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">AND-OR Architecture (SOP)</h3>
                <span className="text-xs font-mono text-sky-400">Y = AB + CD + EF</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Level 1 consists of multiple parallel AND gates generating product terms. Level 2 consists of a single OR gate summing all products. Total propagation delay is fixed at $2 \\cdot t_{pd}$.
              </p>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">OR-AND Architecture (POS)</h3>
                <span className="text-xs font-mono text-emerald-400">Y = (A+B)(C+D)(E+F)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Level 1 consists of multiple parallel OR gates generating sum terms. Level 2 consists of a single AND gate multiplying all sums together.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Python File Loader */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Code size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">
              Logic Circuit Simulator &amp; Full Adder Engine
            </h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="circuit_synthesis_engine.py"
            highlightLines={[19, 23, 24, 25, 36, 40]}
          />
        </div>

        {/* 6. Real-World Applications */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Industrial Microprocessor Synthesis
              </h2>
              <p className="text-xs text-slate-400">
                How RTL netlists translate code into physical transistors.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">EDA Toolchains</span>
              <h3 className="text-base font-bold text-white">Logic Synthesis from Verilog / VHDL</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Modern chip design tools (Synopsys Design Compiler, Cadence Genus) take register-transfer level code and automatically synthesize optimized gate netlists using standard cell libraries.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Arithmetic Units</span>
              <h3 className="text-base font-bold text-white">ALU 64-Bit Binary Carry-Lookahead Adders</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                By synthesizing parallel two-level AND-OR carry generation logic ($G_i = A_i B_i, P_i = A_i \\oplus B_i$), modern CPU adders compute 64-bit sums in just a few nanoseconds.
              </p>
            </div>
          </div>
        </div>

        {/* 7. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle size={18} /> Common Circuit Drawing Mistakes
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-rose-300">Missing Bus Dots:</strong> Drawing T-junctions without solid connection dots (•) makes connections ambiguous.
              </li>
              <li>
                <strong className="text-rose-300">Confusing Gate Symbols:</strong> Drawing OR gates with flat backs or AND gates with pointed fronts.
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 size={18} /> Board Exam Drawing Tips
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-emerald-300">Label All Intermediate Outputs:</strong> Write intermediate expressions (e.g. $A&apos;B$) directly above gate output wires for step marks.
              </li>
              <li>
                <strong className="text-emerald-300">Keep Rails Neat:</strong> Draw straight vertical rails for inputs and horizontal branch lines into gate pins.
              </li>
            </ul>
          </div>
        </div>

        {/* 8. Hint Section */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3">
          <Sparkles className="text-amber-400 shrink-0 mt-0.5" size={18} />
          <div className="text-xs text-slate-300">
            <strong className="text-amber-400 font-semibold">Teacher&apos;s Drawing Strategy:</strong>
            <p className="mt-1">
              Always inspect the main outermost operation first: if the outermost operator is &apos;+&apos;, your rightmost gate MUST be an OR gate. If the outermost operator is &apos;·&apos;, your rightmost gate MUST be an AND gate.
            </p>
          </div>
        </div>

        {/* 9. Frequently Asked Questions */}
        <FAQTemplate
          title="CBSE Class XI Computer Science (083) – Logic Circuit Synthesis FAQs"
          questions={questions}
        />

        {/* 10. Plain Text Printable Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XI CS 083 – Logic Circuit Synthesis Quick Revision"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 9 Plain Text Note"
          downloadFileName="topic9_note.txt"
        />

        {/* 11. Teacher's Note */}
        <Teacher
          note="Circuit drawing questions are guaranteed 2 to 3-mark questions in CBSE Class XI Computer Science (083) papers. Use a ruler and pencil for clean horizontal/vertical bus wiring, draw distinct gate curvatures, and always label every input and output node. — Sukanta Hui"
        />

      </div>
    </div>
  );
}
