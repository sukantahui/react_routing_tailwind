import React, { useState } from 'react';
import {
  Zap, ToggleLeft, ToggleRight, Sparkles, BookOpen,
  Code, CheckCircle2, AlertTriangle, HelpCircle,
  ShieldCheck, FileText, Activity, ArrowRight, Layers
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/boolean_logic_engine.py?raw";

// Interactive Logic Gate Sandbox Component
const LogicGateSandbox = () => {
  const [gateType, setGateType] = useState('AND');
  const [inputA, setInputA] = useState(0);
  const [inputB, setInputB] = useState(0);

  // Compute logic gate output
  const computeOutput = (gate, a, b) => {
    switch (gate) {
      case 'NOT': return 1 - a;
      case 'AND': return a & b;
      case 'OR': return a | b;
      case 'NAND': return 1 - (a & b);
      case 'NOR': return 1 - (a | b);
      case 'XOR': return a ^ b;
      case 'XNOR': return 1 - (a ^ b);
      default: return 0;
    }
  };

  const outputVal = computeOutput(gateType, inputA, inputB);

  const gateMeta = {
    NOT: { eq: "Y = A'", desc: "Inverter: Inverts the single input bit.", category: "Primary" },
    AND: { eq: "Y = A · B", desc: "Conjunction: 1 only if all inputs are 1.", category: "Primary" },
    OR: { eq: "Y = A + B", desc: "Disjunction: 0 only if both inputs are 0.", category: "Primary" },
    NAND: { eq: "Y = (A · B)'", desc: "Universal: Inverted AND. 0 only if all inputs are 1.", category: "Universal" },
    NOR: { eq: "Y = (A + B)'", desc: "Universal: Inverted OR. 1 only if both inputs are 0.", category: "Universal" },
    XOR: { eq: "Y = A ⊕ B = A'B + AB'", desc: "Exclusive-OR: 1 if inputs are DIFFERENT (odd parity).", category: "Exclusive" },
    XNOR: { eq: "Y = (A ⊕ B)' = AB + A'B'", desc: "Coincidence: 1 if inputs are IDENTICAL.", category: "Exclusive" }
  };

  return (
    <div className="bg-slate-950/90 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Zap size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Logic Gate Circuit Simulator
            </h3>
            <p className="text-xs text-slate-400">
              Select a digital logic gate, toggle input switches (0 or 1), and observe real-time circuit output.
            </p>
          </div>
        </div>
      </div>

      {/* Gate Selector Tabs */}
      <div className="flex flex-wrap gap-1.5">
        {Object.keys(gateMeta).map((g) => (
          <button
            key={g}
            onClick={() => setGateType(g)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
              gateType === g
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md scale-105'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            {g} Gate
          </button>
        ))}
      </div>

      {/* Circuit Simulation Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        {/* Input Controls */}
        <div className="md:col-span-4 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Input Terminals:</span>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-bold text-white">Input A:</span>
            <button
              onClick={() => setInputA(inputA === 0 ? 1 : 0)}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                inputA === 1 ? 'bg-sky-500 text-white shadow' : 'bg-slate-800 text-slate-400'
              }`}
            >
              State: {inputA} ({inputA === 1 ? 'HIGH / 5V' : 'LOW / 0V'})
            </button>
          </div>

          {gateType !== 'NOT' && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-bold text-white">Input B:</span>
              <button
                onClick={() => setInputB(inputB === 0 ? 1 : 0)}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                  inputB === 1 ? 'bg-sky-500 text-white shadow' : 'bg-slate-800 text-slate-400'
                }`}
              >
                State: {inputB} ({inputB === 1 ? 'HIGH / 5V' : 'LOW / 0V'})
              </button>
            </div>
          )}
        </div>

        {/* Central Gate Logic Card */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950 border border-amber-500/30 text-center space-y-2">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">{gateMeta[gateType].category} Gate</span>
          <h4 className="text-2xl font-extrabold text-white tracking-wider font-mono">{gateType} GATE</h4>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
            {gateMeta[gateType].eq}
          </span>
          <p className="text-[11px] text-slate-400 leading-tight pt-1">{gateMeta[gateType].desc}</p>
        </div>

        {/* Output Lamp */}
        <div className="md:col-span-4 flex flex-col items-center justify-center space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Circuit Output (Y):</span>
          <div
            className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border shadow-2xl ${
              outputVal === 1
                ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-emerald-500/50 scale-110'
                : 'bg-slate-950 text-slate-600 border-slate-800'
            }`}
          >
            <Zap size={28} className={outputVal === 1 ? 'animate-bounce text-slate-950' : 'text-slate-700'} />
            <span className="font-mono text-xl font-black">{outputVal}</span>
          </div>
          <span className={`text-xs font-bold ${outputVal === 1 ? 'text-emerald-400' : 'text-slate-500'}`}>
            {outputVal === 1 ? 'SIGNAL: HIGH (TRUE)' : 'SIGNAL: LOW (FALSE)'}
          </span>
        </div>
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
                Unit I: CSO · 10 Marks
              </span>
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                Module 002_003 · Topic 0
              </span>
              <span className="px-3 py-1 bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-full">
                CBSE Core Syllabus
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Boolean Logic, Logic Gates, Truth Tables &amp; De Morgan’s Laws
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
              Master the algebra of digital circuits. Explore primary gates (AND, OR, NOT), Universal gates (NAND, NOR), Exclusive gates (XOR, XNOR), rigorous Boolean algebra theorems, and analytical proofs of De Morgan's Laws.
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
              <h2 className="text-lg font-bold text-white tracking-tight">In Simple Words: Electrical Water Valves</h2>
              <p className="text-xs text-slate-400">Physical intuitive understanding of AND vs OR logic</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Imagine a water pipe delivering water to a garden in Barrackpore:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <span className="font-bold text-sky-400 text-sm">Series Valves (AND Logic)</span>
              <p className="text-slate-300 leading-relaxed">
                Two valves connected one after another in a single line. Water flows <strong>ONLY IF BOTH</strong> Valve A AND Valve B are opened ($Y = A \cdot B$).
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <span className="font-bold text-emerald-400 text-sm">Parallel Valves (OR Logic)</span>
              <p className="text-slate-300 leading-relaxed">
                Two valves connected on parallel bypass pipes. Water flows if <strong>EITHER</strong> Valve A OR Valve B is opened ($Y = A + B$).
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: INTERACTIVE LOGIC GATE SIMULATOR */}
        <div className="space-y-4">
          <LogicGateSandbox />
        </div>

        {/* SECTION 4: BOOLEAN POSTULATES & DE MORGAN'S THEOREMS */}
        <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-sky-400" />
            <h3 className="text-base font-bold text-white">De Morgan’s Theorems (High-Frequency CBSE Exam Area)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-sky-500/30 space-y-2">
              <span className="font-bold text-sky-400 text-sm">De Morgan's First Law (NAND = Bubbled OR)</span>
              <p className="font-mono text-amber-300 text-sm font-extrabold">(A · B)' = A' + B'</p>
              <p className="text-slate-300 leading-relaxed">
                The complement of a logical product of variables equals the logical sum of their individual complements.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
              <span className="font-bold text-emerald-400 text-sm">De Morgan's Second Law (NOR = Bubbled AND)</span>
              <p className="font-mono text-emerald-300 text-sm font-extrabold">(A + B)' = A' · B'</p>
              <p className="text-slate-300 leading-relaxed">
                The complement of a logical sum of variables equals the logical product of their individual complements.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 5: PYTHON LAB CODE LOADER */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Code size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Python Laboratory: Automated Truth Table &amp; De Morgan Engine
              </h2>
              <p className="text-xs text-slate-400">
                Python program generating truth tables for all 7 logic gates and verifying De Morgan's theorem mathematically.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <PythonFileLoader
              fileModule={pythonCode}
              title="boolean_logic_engine.py – Truth Tables & Theorem Proofs"
              highlightLines={[12, 26, 42, 57]}
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
              Real-World Case Studies: Logic Circuits in Industry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-sky-400">1. Digital ALU Half-Adder</span>
              <p className="text-slate-300 leading-relaxed">
                Every binary addition of two bits $A$ and $B$ uses an XOR gate for calculating the <strong>Sum</strong> ($S = A \oplus B$) and an AND gate for the <strong>Carry</strong> ($C = A \cdot B$).
              </p>
            </div>

            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400">2. Nuclear Plant Safety Voting (Triple Redundancy)</span>
              <p className="text-slate-300 leading-relaxed">
                Three independent thermal sensors ($A, B, C$) monitor reactor core temperature. The coolant pump trips if at least two sensors agree: $Y = AB + BC + CA$ (Majority Voting Gate).
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
                <span><strong>Writing $(A+B)' = A' + B'$:</strong> Incorrect. De Morgan's Law flips the operator: $(A+B)' = A' \cdot B'$.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span><strong>Calling XOR a Universal Gate:</strong> Only <strong>NAND</strong> and <strong>NOR</strong> are Universal Gates.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices &amp; Proof Technique
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Proof by Truth Table:</strong> When asked to prove De Morgan's law, construct the complete 4-row truth table showing LHS column matches RHS column.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Duality Principle Rule:</strong> Replace $+$ with $\cdot$, $\cdot$ with $+$, $0$ with $1$, and $1$ with $0$.</span>
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
                Test your mastery of logic gates, truth tables, Boolean algebraic minimization, and circuit schematics.
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
              filename="002_003_boolean_logic_and_gates_notes.txt"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
