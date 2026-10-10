import React, { useState } from 'react';
import {
  Cpu, Zap, BookOpen, Code, CheckCircle2,
  AlertTriangle, HelpCircle, ShieldCheck, FileText,
  Activity, ArrowRight, Layers, Sparkles, Check, Play
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";
import pythonCode from "./topic2_files/primary_logic_gates_engine.py?raw";

// Interactive Primary Logic Gate Stage Component
const PrimaryGateSimulator = () => {
  const [selectedGate, setSelectedGate] = useState('AND'); // 'NOT', 'AND', 'OR'
  const [inputCount, setInputCount] = useState(2); // 2 or 3 inputs (for AND/OR)
  const [inA, setInA] = useState(1);
  const [inB, setInB] = useState(1);
  const [inC, setInC] = useState(0);

  // Compute logic gate output
  const calculateOutput = () => {
    if (selectedGate === 'NOT') {
      return inA === 0 ? 1 : 0;
    } else if (selectedGate === 'AND') {
      if (inputCount === 2) return inA === 1 && inB === 1 ? 1 : 0;
      return inA === 1 && inB === 1 && inC === 1 ? 1 : 0;
    } else if (selectedGate === 'OR') {
      if (inputCount === 2) return inA === 1 || inB === 1 ? 1 : 0;
      return inA === 1 || inB === 1 || inC === 1 ? 1 : 0;
    }
    return 0;
  };

  const outputVal = calculateOutput();

  return (
    <div className="bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <Cpu size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Primary Logic Gate Simulator
            </h3>
            <p className="text-xs text-slate-400">
              Select gate type, switch input logic levels (0 / 1), and observe real-time ANSI schematic symbol response.
            </p>
          </div>
        </div>

        {/* Gate Selection Buttons */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          {[
            { id: 'NOT', label: 'NOT Gate (7404)' },
            { id: 'AND', label: 'AND Gate (7408)' },
            { id: 'OR', label: 'OR Gate (7432)' }
          ].map(g => (
            <button
              key={g.id}
              onClick={() => setSelectedGate(g.id)}
              className={`px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
                selectedGate === g.id ? 'bg-sky-500 text-white shadow-md font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Simulation Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        {/* Left: Input Terminals */}
        <div className="md:col-span-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Input Terminals:</span>
            {selectedGate !== 'NOT' && (
              <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[11px]">
                <button
                  onClick={() => setInputCount(2)}
                  className={`px-2 py-0.5 rounded cursor-pointer ${inputCount === 2 ? 'bg-sky-500 text-white font-bold' : 'text-slate-400'}`}
                >
                  2-Input
                </button>
                <button
                  onClick={() => setInputCount(3)}
                  className={`px-2 py-0.5 rounded cursor-pointer ${inputCount === 3 ? 'bg-sky-500 text-white font-bold' : 'text-slate-400'}`}
                >
                  3-Input
                </button>
              </div>
            )}
          </div>

          {/* Terminal A */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-bold text-white">Input A:</span>
            <button
              onClick={() => setInA(inA === 0 ? 1 : 0)}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                inA === 1 ? 'bg-sky-500 text-white shadow' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Level: {inA} ({inA === 1 ? 'HIGH / 5V' : 'LOW / 0V'})
            </button>
          </div>

          {/* Terminal B */}
          {selectedGate !== 'NOT' && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-bold text-white">Input B:</span>
              <button
                onClick={() => setInB(inB === 0 ? 1 : 0)}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                  inB === 1 ? 'bg-sky-500 text-white shadow' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Level: {inB} ({inB === 1 ? 'HIGH / 5V' : 'LOW / 0V'})
              </button>
            </div>
          )}

          {/* Terminal C (for 3-input) */}
          {selectedGate !== 'NOT' && inputCount === 3 && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-bold text-white">Input C:</span>
              <button
                onClick={() => setInC(inC === 0 ? 1 : 0)}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                  inC === 1 ? 'bg-sky-500 text-white shadow' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Level: {inC} ({inC === 1 ? 'HIGH / 5V' : 'LOW / 0V'})
              </button>
            </div>
          )}

          {/* Equation Badge */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
            <span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-1">Boolean Equation:</span>
            <span className="font-mono text-amber-400 font-bold text-sm">
              {selectedGate === 'NOT' && "Y = A'"}
              {selectedGate === 'AND' && (inputCount === 2 ? "Y = A · B" : "Y = A · B · C")}
              {selectedGate === 'OR' && (inputCount === 2 ? "Y = A + B" : "Y = A + B + C")}
            </span>
          </div>
        </div>

        {/* Center: ANSI Gate SVG Graphic */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[220px]">
          <svg viewBox="0 0 300 160" className="w-full max-w-[260px] h-auto">
            {/* NOT Gate SVG */}
            {selectedGate === 'NOT' && (
              <g transform="translate(40, 20)">
                {/* Input line */}
                <line x1="0" y1="60" x2="60" y2="60" stroke={inA === 1 ? "#38bdf8" : "#64748b"} strokeWidth="4" />
                <text x="10" y="48" fill="#38bdf8" fontSize="12" fontWeight="bold">A={inA}</text>

                {/* Triangle Body */}
                <polygon points="60,20 140,60 60,100" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />

                {/* Inversion Bubble */}
                <circle cx="150" cy="60" r="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />

                {/* Output line */}
                <line x1="160" y1="60" x2="220" y2="60" stroke={outputVal === 1 ? "#10b981" : "#ef4444"} strokeWidth="4" />
                <text x="175" y="48" fill={outputVal === 1 ? "#10b981" : "#ef4444"} fontSize="12" fontWeight="bold">Y={outputVal}</text>
              </g>
            )}

            {/* AND Gate SVG */}
            {selectedGate === 'AND' && (
              <g transform="translate(30, 15)">
                {/* Inputs */}
                {inputCount === 2 ? (
                  <>
                    <line x1="0" y1="40" x2="70" y2="40" stroke={inA === 1 ? "#38bdf8" : "#64748b"} strokeWidth="4" />
                    <text x="10" y="32" fill="#38bdf8" fontSize="11" fontWeight="bold">A={inA}</text>
                    <line x1="0" y1="90" x2="70" y2="90" stroke={inB === 1 ? "#38bdf8" : "#64748b"} strokeWidth="4" />
                    <text x="10" y="82" fill="#38bdf8" fontSize="11" fontWeight="bold">B={inB}</text>
                  </>
                ) : (
                  <>
                    <line x1="0" y1="30" x2="70" y2="30" stroke={inA === 1 ? "#38bdf8" : "#64748b"} strokeWidth="4" />
                    <text x="10" y="22" fill="#38bdf8" fontSize="10" fontWeight="bold">A={inA}</text>
                    <line x1="0" y1="65" x2="70" y2="65" stroke={inB === 1 ? "#38bdf8" : "#64748b"} strokeWidth="4" />
                    <text x="10" y="57" fill="#38bdf8" fontSize="10" fontWeight="bold">B={inB}</text>
                    <line x1="0" y1="100" x2="70" y2="100" stroke={inC === 1 ? "#38bdf8" : "#64748b"} strokeWidth="4" />
                    <text x="10" y="92" fill="#38bdf8" fontSize="10" fontWeight="bold">C={inC}</text>
                  </>
                )}

                {/* AND Shape: Flat back, curved front */}
                <path
                  d="M 70 20 L 120 20 A 45 45 0 0 1 120 110 L 70 110 Z"
                  fill="#1e293b"
                  stroke="#38bdf8"
                  strokeWidth="3"
                />

                {/* Output */}
                <line x1="165" y1="65" x2="235" y2="65" stroke={outputVal === 1 ? "#10b981" : "#ef4444"} strokeWidth="4" />
                <text x="180" y="52" fill={outputVal === 1 ? "#10b981" : "#ef4444"} fontSize="12" fontWeight="bold">Y={outputVal}</text>
              </g>
            )}

            {/* OR Gate SVG */}
            {selectedGate === 'OR' && (
              <g transform="translate(30, 15)">
                {/* Inputs */}
                {inputCount === 2 ? (
                  <>
                    <line x1="0" y1="40" x2="78" y2="40" stroke={inA === 1 ? "#38bdf8" : "#64748b"} strokeWidth="4" />
                    <text x="10" y="32" fill="#38bdf8" fontSize="11" fontWeight="bold">A={inA}</text>
                    <line x1="0" y1="90" x2="78" y2="90" stroke={inB === 1 ? "#38bdf8" : "#64748b"} strokeWidth="4" />
                    <text x="10" y="82" fill="#38bdf8" fontSize="11" fontWeight="bold">B={inB}</text>
                  </>
                ) : (
                  <>
                    <line x1="0" y1="30" x2="73" y2="30" stroke={inA === 1 ? "#38bdf8" : "#64748b"} strokeWidth="4" />
                    <text x="10" y="22" fill="#38bdf8" fontSize="10" fontWeight="bold">A={inA}</text>
                    <line x1="0" y1="65" x2="85" y2="65" stroke={inB === 1 ? "#38bdf8" : "#64748b"} strokeWidth="4" />
                    <text x="10" y="57" fill="#38bdf8" fontSize="10" fontWeight="bold">B={inB}</text>
                    <line x1="0" y1="100" x2="73" y2="100" stroke={inC === 1 ? "#38bdf8" : "#64748b"} strokeWidth="4" />
                    <text x="10" y="92" fill="#38bdf8" fontSize="10" fontWeight="bold">C={inC}</text>
                  </>
                )}

                {/* OR Shape: Curved back, pointed front */}
                <path
                  d="M 65 20 Q 90 65 65 110 Q 120 110 170 65 Q 120 20 65 20 Z"
                  fill="#1e293b"
                  stroke="#38bdf8"
                  strokeWidth="3"
                />

                {/* Output */}
                <line x1="170" y1="65" x2="235" y2="65" stroke={outputVal === 1 ? "#10b981" : "#ef4444"} strokeWidth="4" />
                <text x="180" y="52" fill={outputVal === 1 ? "#10b981" : "#ef4444"} fontSize="12" fontWeight="bold">Y={outputVal}</text>
              </g>
            )}
          </svg>
        </div>

        {/* Right: Output Pin Status */}
        <div className="md:col-span-3 flex flex-col items-center justify-center p-5 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
          <div className={`p-3.5 rounded-full ${outputVal === 1 ? 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/30 animate-pulse' : 'bg-rose-500/20 text-rose-400'}`}>
            <Zap size={32} />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Output Terminal (Y):</span>
          <span className={`text-2xl font-mono font-extrabold ${outputVal === 1 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {outputVal === 1 ? 'LOGIC 1 (5V)' : 'LOGIC 0 (0V)'}
          </span>
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${outputVal === 1 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'}`}>
            {outputVal === 1 ? 'HIGH / ACTIVE' : 'LOW / INACTIVE'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Topic2() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002 · Topic 2
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Primary Logic Gates
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Primary Logic Gates: NOT, AND, and OR Gates
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the schematic symbols, algebraic transfer equations, multi-input truth tables, and TTL integrated circuit implementations (7404, 7408, 7432) for the three primary logic gates.
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
                Architectural Anatomy of Primary Gates
              </h2>
              <p className="text-xs text-slate-400">
                Understanding symbol morphology, input-output behavior, and electrical thresholding.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">IC 7404</span>
                <span className="text-xs font-mono text-slate-400">1 Input</span>
              </div>
              <h3 className="text-base font-bold text-white">NOT Gate (Hex Inverter)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Features a triangular amplifier body with an <strong>Inversion Bubble</strong> at the apex. The bubble mathematically converts True to False and vice versa ($Y = A&apos;$).
              </p>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
                Rule: Output is 1 ONLY when Input is 0.
              </div>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">IC 7408</span>
                <span className="text-xs font-mono text-slate-400">&ge; 2 Inputs</span>
              </div>
              <h3 className="text-base font-bold text-white">AND Gate (Conjunction)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Features a <strong>flat vertical back</strong> and curved front. Performs Boolean product ($Y = A \\cdot B$). Output is pulled HIGH only when all inputs are 1.
              </p>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
                Rule: Any input 0 &rarr; Output collapses to 0.
              </div>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">IC 7432</span>
                <span className="text-xs font-mono text-slate-400">&ge; 2 Inputs</span>
              </div>
              <h3 className="text-base font-bold text-white">OR Gate (Disjunction)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Features a <strong>curved concave back</strong> and pointed apex. Performs Boolean sum ($Y = A + B$). Output is HIGH if at least one input is 1.
              </p>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
                Rule: All inputs 0 &rarr; Output is 0; otherwise 1.
              </div>
            </div>
          </div>
        </div>

        {/* 3. Interactive Gate Simulator */}
        <PrimaryGateSimulator />

        {/* 4. Comprehensive Comparison Matrix */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Technical Specifications &amp; Multi-Input Truth Matrices
              </h2>
              <p className="text-xs text-slate-400">
                Quick reference for CBSE Class XI examination and circuit analysis.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Gate Name</th>
                  <th className="p-3">Graphic Symbol Shape</th>
                  <th className="p-3">Boolean Equation</th>
                  <th className="p-3">Output = 1 Condition</th>
                  <th className="p-3">Standard TTL IC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-rose-400 font-bold">NOT Gate</td>
                  <td className="p-3 text-white">Triangle + Inversion Bubble</td>
                  <td className="p-3 text-sky-400">Y = A&apos;</td>
                  <td className="p-3">Input is 0 (LOW)</td>
                  <td className="p-3 text-amber-400 font-bold">IC 7404</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-sky-400 font-bold">AND Gate</td>
                  <td className="p-3 text-white">Flat back, curved front</td>
                  <td className="p-3 text-sky-400">Y = A · B</td>
                  <td className="p-3">ALL inputs are 1 (HIGH)</td>
                  <td className="p-3 text-amber-400 font-bold">IC 7408</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-emerald-400 font-bold">OR Gate</td>
                  <td className="p-3 text-white">Concave back, pointed apex</td>
                  <td className="p-3 text-sky-400">Y = A + B</td>
                  <td className="p-3">ANY input is 1 (HIGH)</td>
                  <td className="p-3 text-amber-400 font-bold">IC 7432</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Python File Loader */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Code size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">
              Primary Logic Gates Simulation Script
            </h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="primary_logic_gates_engine.py"
            highlightLines={[16, 21, 26, 45, 59, 73]}
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
                Real-World Applications &amp; Engineering Use Cases
              </h2>
              <p className="text-xs text-slate-400">
                How primary logic gates drive everyday embedded systems.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Application 1 · Enable / Inhibit Gate</span>
              <h3 className="text-base font-bold text-white">Digital Clock Pulse Gating</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                An AND gate is used as a pulse transmission gatekeeper. When <code className="text-sky-300">Enable = 1</code>, the high-frequency clock pulses pass through to the counter. When <code className="text-sky-300">Enable = 0</code>, clock pulses are inhibited.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Application 2 · Alarm Aggregation</span>
              <h3 className="text-base font-bold text-white">Multi-Zone Home Intrusion System</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                An 8-input OR gate connects to window, door, and motion sensors in 8 separate rooms. If any zone detects unauthorized entry (<code className="text-emerald-300">Zone_i = 1</code>), the OR gate output triggers the master siren.
              </p>
            </div>
          </div>
        </div>

        {/* 7. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle size={18} /> Symbol Drawing Mistakes
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-rose-300">Confusing AND and OR Shapes:</strong> Never draw an AND gate with a curved back or an OR gate with a flat back.
              </li>
              <li>
                <strong className="text-rose-300">Missing NOT Bubble:</strong> Drawing just a triangle without a bubble creates a non-inverting buffer, not an inverter!
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 size={18} /> Board Exam Drawing Tips
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-emerald-300">Label All Input &amp; Output Pins:</strong> Always label inputs clearly as A, B, C and the output as Y.
              </li>
              <li>
                <strong className="text-emerald-300">Include Boolean Equations:</strong> Write the transfer equation (e.g. $Y = A \\cdot B$) right beside the output lead.
              </li>
            </ul>
          </div>
        </div>

        {/* 8. Hint Section */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3">
          <Sparkles className="text-amber-400 shrink-0 mt-0.5" size={18} />
          <div className="text-xs text-slate-300">
            <strong className="text-amber-400 font-semibold">Teacher&apos;s Memory Hook:</strong>
            <p className="mt-1">
              Remember: <strong>AND</strong> has a <em>flat</em> back like the letter &apos;D&apos;. <strong>OR</strong> has a <em>curved curved</em> back and pointed tip like an arrow. <strong>NOT</strong> is a triangle with an inversion bubble.
            </p>
          </div>
        </div>

        {/* 9. Frequently Asked Questions */}
        <FAQTemplate
          title="CBSE Class XI Computer Science (083) – Primary Logic Gates FAQs"
          questions={questions}
        />

        {/* 10. Plain Text Printable Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XI CS 083 – Primary Logic Gates Quick Revision"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 2 Plain Text Note"
          downloadFileName="topic2_note.txt"
        />

        {/* 11. Teacher's Note */}
        <Teacher
          note="In CBSE Class XI CS 083 exams, question papers frequently ask students to draw standard gate symbols and state their truth tables. Remember the IC identifiers: 7404 (NOT), 7408 (AND), and 7432 (OR). Practice drawing clean curves for OR gates and distinct flat edges for AND gates. — Sukanta Hui"
        />

      </div>
    </div>
  );
}
