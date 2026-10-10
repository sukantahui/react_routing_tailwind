import React, { useState } from 'react';
import {
  Zap, ToggleLeft, ToggleRight, Sparkles, BookOpen,
  Code, CheckCircle2, AlertTriangle, HelpCircle,
  ShieldCheck, FileText, Activity, ArrowRight, Layers,
  Cpu, Check, Lightbulb
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";
import pythonCode from "./topic1_files/fundamental_operations_engine.py?raw";

// Interactive Series vs Parallel Circuit Simulator Component
const CircuitSwitchSimulator = () => {
  const [circuitType, setCircuitType] = useState('AND'); // 'AND' (Series) or 'OR' (Parallel) or 'NOT' (Inverter)
  const [switchA, setSwitchA] = useState(0);
  const [switchB, setSwitchB] = useState(0);

  // Determine bulb state based on circuit logic
  const isBulbOn = () => {
    if (circuitType === 'AND') {
      return switchA === 1 && switchB === 1;
    } else if (circuitType === 'OR') {
      return switchA === 1 || switchB === 1;
    } else if (circuitType === 'NOT') {
      return switchA === 0; // Normally closed inverter relay: conducts when input switch is 0 (open)
    }
    return false;
  };

  const bulbLit = isBulbOn();

  return (
    <div className="bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Zap size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Circuit Switching Analog: Series vs Parallel
            </h3>
            <p className="text-xs text-slate-400">
              Toggle physical electrical switches to observe how Series wiring forms AND logic and Parallel wiring forms OR logic.
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          {[
            { id: 'AND', label: 'Series Switches (AND)' },
            { id: 'OR', label: 'Parallel Switches (OR)' },
            { id: 'NOT', label: 'Inverter Relay (NOT)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCircuitType(tab.id)}
              className={`px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
                circuitType === tab.id ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Circuit Simulation Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        {/* Switch Controls */}
        <div className="md:col-span-4 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Physical Switches:</span>

          {/* Switch A */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-bold text-white">Switch A:</span>
            <button
              onClick={() => setSwitchA(switchA === 0 ? 1 : 0)}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                switchA === 1 ? 'bg-emerald-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {switchA === 1 ? 'CLOSED (1 / ON)' : 'OPEN (0 / OFF)'}
            </button>
          </div>

          {/* Switch B (for AND and OR) */}
          {circuitType !== 'NOT' && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-bold text-white">Switch B:</span>
              <button
                onClick={() => setSwitchB(switchB === 0 ? 1 : 0)}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                  switchB === 1 ? 'bg-emerald-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {switchB === 1 ? 'CLOSED (1 / ON)' : 'OPEN (0 / OFF)'}
              </button>
            </div>
          )}

          {/* Current Flow Explanation */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-300">
            <p className="font-semibold text-amber-400 mb-1">
              {circuitType === 'AND' && "AND Rule (Series): Current must pass through Switch A AND Switch B."}
              {circuitType === 'OR' && "OR Rule (Parallel): Current can flow through Switch A OR Switch B."}
              {circuitType === 'NOT' && "NOT Rule (Inverter): Closed switch (1) shunts current away, open switch (0) lights bulb."}
            </p>
            <p className="text-[11px] text-slate-400 font-mono">
              Formula: {circuitType === 'AND' ? 'Y = A · B' : circuitType === 'OR' ? 'Y = A + B' : 'Y = A\''}
            </p>
          </div>
        </div>

        {/* Dynamic Schematic Diagram */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[190px]">
          <svg viewBox="0 0 320 160" className="w-full max-w-[280px] h-auto text-slate-300">
            {/* Battery / DC Voltage */}
            <line x1="20" y1="30" x2="20" y2="130" stroke="#64748b" strokeWidth="3" />
            <line x1="10" y1="60" x2="30" y2="60" stroke="#38bdf8" strokeWidth="4" />
            <line x1="15" y1="75" x2="25" y2="75" stroke="#64748b" strokeWidth="3" />
            <line x1="10" y1="90" x2="30" y2="90" stroke="#38bdf8" strokeWidth="4" />
            <line x1="15" y1="105" x2="25" y2="105" stroke="#64748b" strokeWidth="3" />
            <text x="25" y="50" fill="#38bdf8" fontSize="10" fontWeight="bold">+5V</text>
            <text x="25" y="125" fill="#94a3b8" fontSize="10">GND</text>

            {/* Top Conductor Wire */}
            <path
              d="M 20 30 L 70 30"
              stroke={bulbLit ? "#f59e0b" : "#475569"}
              strokeWidth="3"
              fill="none"
            />

            {circuitType === 'AND' && (
              <>
                {/* Series Switch A */}
                <circle cx="70" cy="30" r="3" fill="#94a3b8" />
                <line
                  x1="70"
                  y1="30"
                  x2="105"
                  y2={switchA === 1 ? "30" : "15"}
                  stroke={switchA === 1 ? "#10b981" : "#ef4444"}
                  strokeWidth="3"
                />
                <circle cx="110" cy="30" r="3" fill="#94a3b8" />
                <text x="80" y="12" fill="#e2e8f0" fontSize="10" fontWeight="bold">Sw A</text>

                {/* Connecting middle wire */}
                <line x1="110" y1="30" x2="140" y2="30" stroke={switchA === 1 ? "#f59e0b" : "#475569"} strokeWidth="3" />

                {/* Series Switch B */}
                <circle cx="140" cy="30" r="3" fill="#94a3b8" />
                <line
                  x1="140"
                  y1="30"
                  x2="175"
                  y2={switchB === 1 ? "30" : "15"}
                  stroke={switchB === 1 ? "#10b981" : "#ef4444"}
                  strokeWidth="3"
                />
                <circle cx="180" cy="30" r="3" fill="#94a3b8" />
                <text x="150" y="12" fill="#e2e8f0" fontSize="10" fontWeight="bold">Sw B</text>

                {/* Lead to lamp */}
                <path d="M 180 30 L 250 30 L 250 65" stroke={bulbLit ? "#f59e0b" : "#475569"} strokeWidth="3" fill="none" />
              </>
            )}

            {circuitType === 'OR' && (
              <>
                {/* Branch out for Parallel */}
                <path d="M 70 30 L 70 15 L 90 15" stroke={bulbLit ? "#f59e0b" : "#475569"} strokeWidth="3" fill="none" />
                <path d="M 70 30 L 70 45 L 90 45" stroke={bulbLit ? "#f59e0b" : "#475569"} strokeWidth="3" fill="none" />

                {/* Switch A top branch */}
                <circle cx="90" cy="15" r="3" fill="#94a3b8" />
                <line x1="90" y1="15" x2="135" y2={switchA === 1 ? "15" : "2"} stroke={switchA === 1 ? "#10b981" : "#ef4444"} strokeWidth="3" />
                <circle cx="140" cy="15" r="3" fill="#94a3b8" />
                <text x="100" y="0" fill="#e2e8f0" fontSize="9" fontWeight="bold">Sw A</text>

                {/* Switch B bottom branch */}
                <circle cx="90" cy="45" r="3" fill="#94a3b8" />
                <line x1="90" y1="45" x2="135" y2={switchB === 1 ? "45" : "32"} stroke={switchB === 1 ? "#10b981" : "#ef4444"} strokeWidth="3" />
                <circle cx="140" cy="45" r="3" fill="#94a3b8" />
                <text x="100" y="60" fill="#e2e8f0" fontSize="9" fontWeight="bold">Sw B</text>

                {/* Join parallel paths */}
                <path d="M 140 15 L 160 15 L 160 30 L 250 30 L 250 65" stroke={bulbLit ? "#f59e0b" : "#475569"} strokeWidth="3" fill="none" />
                <path d="M 140 45 L 160 45 L 160 30" stroke={bulbLit ? "#f59e0b" : "#475569"} strokeWidth="3" fill="none" />
              </>
            )}

            {circuitType === 'NOT' && (
              <>
                {/* Inverter Relay schematic */}
                <line x1="70" y1="30" x2="110" y2="30" stroke="#f59e0b" strokeWidth="3" />
                <circle cx="110" cy="30" r="3" fill="#94a3b8" />
                <line x1="110" y1="30" x2="155" y2={switchA === 1 ? "12" : "30"} stroke={switchA === 0 ? "#10b981" : "#ef4444"} strokeWidth="3" />
                <circle cx="160" cy="30" r="3" fill="#94a3b8" />
                <text x="115" y="10" fill="#e2e8f0" fontSize="9" fontWeight="bold">NC Relay (Sw A)</text>
                <path d="M 160 30 L 250 30 L 250 65" stroke={bulbLit ? "#f59e0b" : "#475569"} strokeWidth="3" fill="none" />
              </>
            )}

            {/* Lamp / Load Symbol */}
            <circle cx="250" cy="80" r="15" fill={bulbLit ? "#fbbf24" : "#1e293b"} stroke={bulbLit ? "#f59e0b" : "#64748b"} strokeWidth="2" />
            <line x1="240" y1="70" x2="260" y2="90" stroke={bulbLit ? "#92400e" : "#475569"} strokeWidth="2" />
            <line x1="240" y1="90" x2="260" y2="70" stroke={bulbLit ? "#92400e" : "#475569"} strokeWidth="2" />
            <text x="272" y="85" fill={bulbLit ? "#fbbf24" : "#94a3b8"} fontSize="11" fontWeight="bold">LAMP</text>

            {/* Bottom Ground Return Wire */}
            <path d="M 250 95 L 250 130 L 20 130" stroke="#64748b" strokeWidth="3" fill="none" />
          </svg>
        </div>

        {/* Real-Time Output Status */}
        <div className="md:col-span-3 flex flex-col items-center justify-center p-5 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
          <div className={`p-3.5 rounded-full ${bulbLit ? 'bg-amber-500/20 text-amber-400 shadow-lg shadow-amber-500/30 animate-pulse' : 'bg-slate-800 text-slate-500'}`}>
            <Lightbulb size={32} />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Circuit Output (Y):</span>
          <span className={`text-2xl font-mono font-extrabold ${bulbLit ? 'text-amber-400' : 'text-slate-500'}`}>
            {bulbLit ? '1 (HIGH / ON)' : '0 (LOW / OFF)'}
          </span>
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${bulbLit ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'}`}>
            {bulbLit ? 'Bulb Illuminates' : 'Circuit Open / No Flow'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Topic1() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002 · Topic 1
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                Core Digital Logic Foundation
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Fundamental Logic Operations: NOT, AND, and OR
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore the mathematical and physical foundations of digital logic. Understand how binary propositions, Boolean operators (Inversion, Conjunction, Disjunction), operator precedence, and physical switching circuits form the bedrock of modern microprocessors.
            </p>
          </div>
        </div>

        {/* 2. Deep Conceptual Breakdown */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Deep Conceptual Explanation: What, Why &amp; How
              </h2>
              <p className="text-xs text-slate-400">
                The algebra of two states formulated by George Boole and translated to electronic switches by Claude Shannon.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* NOT Operation */}
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30">Unary Operator</span>
                <span className="text-xs font-mono text-slate-400">Y = A&apos;</span>
              </div>
              <h3 className="text-base font-bold text-white">1. Logical NOT (Inversion)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Logical NOT performs <strong>complementation</strong>. It reverses the state of a single binary variable: True becomes False (1 &rarr; 0) and False becomes True (0 &rarr; 1).
              </p>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div>0&apos; = 1 (LOW &rarr; HIGH)</div>
                <div>1&apos; = 0 (HIGH &rarr; LOW)</div>
              </div>
            </div>

            {/* AND Operation */}
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30">Binary Operator</span>
                <span className="text-xs font-mono text-slate-400">Y = A · B</span>
              </div>
              <h3 className="text-base font-bold text-white">2. Logical AND (Conjunction)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Logical AND represents <strong>Boolean multiplication</strong>. The output is 1 (True) if and only if ALL connected input conditions are simultaneously 1.
              </p>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div>0 · 0 = 0 | 0 · 1 = 0</div>
                <div>1 · 0 = 0 | 1 · 1 = 1</div>
              </div>
            </div>

            {/* OR Operation */}
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">Binary Operator</span>
                <span className="text-xs font-mono text-slate-400">Y = A + B</span>
              </div>
              <h3 className="text-base font-bold text-white">3. Logical OR (Disjunction)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Logical OR represents <strong>Boolean addition</strong>. The output is 1 (True) if AT LEAST ONE input condition is 1. Output is 0 only when all inputs are 0.
              </p>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div>0 + 0 = 0 | 0 + 1 = 1</div>
                <div>1 + 0 = 1 | 1 + 1 = 1</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Interactive Circuit Switch Simulator */}
        <CircuitSwitchSimulator />

        {/* 4. Deep Technical Breakdown & Truth Table Matrix */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Operator Precedence &amp; Multi-Variable Truth Tables
              </h2>
              <p className="text-xs text-slate-400">
                Rigorous evaluation rules when combining NOT, AND, and OR in complex expressions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Operator Precedence Table */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Standard Operator Precedence Hierarchy:
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Rank</th>
                      <th className="p-3">Operation</th>
                      <th className="p-3">Symbol</th>
                      <th className="p-3">Python Operator</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 text-amber-400 font-bold">1 (Highest)</td>
                      <td className="p-3 text-white">Parentheses (Grouping)</td>
                      <td className="p-3 text-sky-400">( )</td>
                      <td className="p-3 text-emerald-400">( )</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 text-amber-400 font-bold">2</td>
                      <td className="p-3 text-white">Logical NOT (Inversion)</td>
                      <td className="p-3 text-sky-400">A&apos; / ~A</td>
                      <td className="p-3 text-emerald-400">not</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 text-amber-400 font-bold">3</td>
                      <td className="p-3 text-white">Logical AND (Conjunction)</td>
                      <td className="p-3 text-sky-400">· (Dot)</td>
                      <td className="p-3 text-emerald-400">and</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 text-amber-400 font-bold">4 (Lowest)</td>
                      <td className="p-3 text-white">Logical OR (Disjunction)</td>
                      <td className="p-3 text-sky-400">+ (Plus)</td>
                      <td className="p-3 text-emerald-400">or</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Expression Step-by-Step Tracing Box */}
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Step-by-Step Trace Example: Y = A&apos; · B + C
              </h3>
              <p className="text-xs text-slate-300">
                Let <code className="text-sky-400">A = 0, B = 1, C = 0</code>.
              </p>
              <div className="space-y-2 text-xs font-mono text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[10px] font-bold">1</span>
                  <span>Evaluate NOT: <strong className="text-white">A&apos; = 0&apos; = 1</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-[10px] font-bold">2</span>
                  <span>Evaluate AND: <strong className="text-white">1 · B = 1 · 1 = 1</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">3</span>
                  <span>Evaluate OR: <strong className="text-white">1 + C = 1 + 0 = 1</strong></span>
                </div>
                <div className="pt-2 border-t border-slate-800 text-amber-400 font-bold">
                  Final Evaluated Value Y = 1 (HIGH)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Python File Loader */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Code size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">
              Python Logic Operations &amp; Truth Table Engine
            </h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="fundamental_operations_engine.py"
            highlightLines={[25, 29, 33, 63, 64, 65]}
          />
        </div>

        {/* 6. Real-World Case Studies */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Real-World Practical Case Studies
              </h2>
              <p className="text-xs text-slate-400">
                How fundamental logic operations govern industrial systems and security architectures.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Case 1 · Conjunction (AND)</span>
                <span className="text-[10px] font-mono bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded">Security</span>
              </div>
              <h3 className="text-base font-bold text-white">ATM Two-Factor Cash Dispenser</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                An automated teller machine (ATM) dispenses cash only if <code className="text-sky-300">Valid_PIN_Entered (A) == 1</code> <strong>AND</strong> <code className="text-sky-300">Sufficient_Account_Balance (B) == 1</code>. If either condition is 0, transaction is rejected.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Case 2 · Disjunction (OR)</span>
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Safety</span>
              </div>
              <h3 className="text-base font-bold text-white">Smart Building Fire Alarm Trigger</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A skyscraper fire alarm activates siren if <code className="text-emerald-300">Smoke_Sensor (A) == 1</code> <strong>OR</strong> <code className="text-emerald-300">Heat_Sensor (B) == 1</code> <strong>OR</strong> <code className="text-emerald-300">Manual_Pull_Lever (C) == 1</code>. Any single positive signal sounds the alarm.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Case 3 · Inversion (NOT)</span>
                <span className="text-[10px] font-mono bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded">Automation</span>
              </div>
              <h3 className="text-base font-bold text-white">Refrigerator Interior Light Control</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When the refrigerator door is closed, the mechanical push-pin sensor is depressed (<code className="text-rose-300">Door_Closed == 1</code>), and the inverter turns the internal light OFF (<code className="text-rose-300">Light = 0</code>). Opening the door (<code className="text-rose-300">Sensor = 0</code>) inverts to turn the light ON (<code className="text-rose-300">Light = 1</code>).
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Case 4 · Composite Logic</span>
                <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded">Industrial</span>
              </div>
              <h3 className="text-base font-bold text-white">Factory CNC Machine Emergency Interlock</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A high-speed industrial cutting mill starts only if <code className="text-amber-300">Safety_Guard_Closed (A) == 1</code> <strong>AND</strong> <code className="text-amber-300">Emergency_Stop_NOT_Pressed (E&apos;) == 1</code> <strong>AND</strong> <code className="text-amber-300">Start_Button_Pressed (S) == 1</code>. Formula: <code className="text-amber-300">Motor = A · E&apos; · S</code>.
              </p>
            </div>
          </div>
        </div>

        {/* 7. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle size={18} /> Common Beginner Pitfalls
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-rose-300">Confusing Boolean Addition with Arithmetic Addition:</strong> In Boolean algebra, <code className="font-mono text-rose-300">1 + 1 = 1</code> (True OR True is True), NOT <code className="font-mono text-rose-300">2</code> or <code className="font-mono text-rose-300">10_2</code>.
              </li>
              <li>
                <strong className="text-rose-300">Ignoring Operator Precedence:</strong> In <code className="font-mono text-rose-300">A + B · C</code>, performing OR first gives wrong results. AND has higher precedence than OR.
              </li>
              <li>
                <strong className="text-rose-300">Mixing Bitwise and Logical in Python:</strong> <code className="font-mono text-rose-300">not</code> vs <code className="font-mono text-rose-300">~</code> (bitwise NOT on integer <code className="font-mono text-rose-300">~1 == -2</code> due to two&apos;s complement).
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 size={18} /> Pro Examination Best Practices
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-emerald-300">Check Row Count Formula:</strong> Always verify that an n-variable truth table has exactly <code className="font-mono text-emerald-300">2^n</code> rows.
              </li>
              <li>
                <strong className="text-emerald-300">Use Intermediate Columns:</strong> When constructing truth tables for complex expressions, draw sub-columns for each sub-term (e.g. column for <code className="font-mono text-emerald-300">A&apos;</code>, column for <code className="font-mono text-emerald-300">A&apos;B</code>) before final output.
              </li>
              <li>
                <strong className="text-emerald-300">Explicit Parentheses:</strong> In programming and proof writing, enclose sub-expressions in parentheses for unambiguous readability.
              </li>
            </ul>
          </div>
        </div>

        {/* 8. Hint Section */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3">
          <Sparkles className="text-amber-400 shrink-0 mt-0.5" size={18} />
          <div className="text-xs text-slate-300">
            <strong className="text-amber-400 font-semibold">Teacher&apos;s Quick Hint for Board Exams:</strong>
            <p className="mt-1">
              Remember the physical circuit mnemonic: <em>Series = AND</em> (both switches required in one path), <em>Parallel = OR</em> (either path conducts). When applying precedence, remember the hierarchy <strong>N-A-O</strong> (NOT first, then AND, then OR).
            </p>
          </div>
        </div>

        {/* 9. Frequently Asked Questions */}
        <FAQTemplate
          title="CBSE Class XI Computer Science (083) – Fundamental Operations FAQs"
          questions={questions}
        />

        {/* 10. Plain Text Printable Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XI CS 083 – Fundamental Logic Operations Quick Revision"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 1 Plain Text Note"
          downloadFileName="topic1_note.txt"
        />

        {/* 11. Teacher's Note */}
        <Teacher
          note="Always remember that Boolean algebra is a two-valued deductive logic system. When solving truth table questions for CBSE Class XI CS 083, systematically order your binary input counts (00, 01, 10, 11) using binary counting order. Keep in mind: Series switches represent Conjunction (AND) and Parallel switches represent Disjunction (OR). — Sukanta Hui"
        />

      </div>
    </div>
  );
}
