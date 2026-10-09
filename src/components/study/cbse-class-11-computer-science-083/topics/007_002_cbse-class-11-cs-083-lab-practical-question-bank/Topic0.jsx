import React, { useState } from 'react';
import {
  Terminal, Code, Download, Copy, Check, Sparkles,
  BookOpen, CheckCircle2, AlertTriangle, HelpCircle,
  ShieldCheck, FileText, Layers, Award, Play, ChevronRight
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/cbse_20_practical_lab_bank.py?raw";

// Interactive 20-Program Bank Navigator Component
const PracticalBankNavigator = () => {
  const [selectedProg, setSelectedProg] = useState(0);

  const programs = [
    { id: 1, title: "Arithmetic Calculations on 2 Numbers", cat: "Basics", desc: "Performs +, -, *, /, //, %, ** on two user-input floats." },
    { id: 2, title: "Largest & Smallest Among Three Numbers", cat: "Conditionals", desc: "Finds max and min using nested if-elif-else logic." },
    { id: 3, title: "Quadratic Equation Solver (ax² + bx + c = 0)", cat: "Math", desc: "Computes discriminant D = b² - 4ac and roots." },
    { id: 4, title: "Prime Number Verification & Range Generator", cat: "Loops", desc: "Optimized trial division up to sqrt(N)." },
    { id: 5, title: "Fibonacci Sequence Generator up to N terms", cat: "Loops", desc: "Computes 0, 1, 1, 2, 3, 5, 8, 13, ..." },
    { id: 6, title: "Armstrong Number Verifier (e.g. 153)", cat: "Loops", desc: "Sum of digits raised to power of total digits." },
    { id: 7, title: "Palindrome Verifier for Strings & Numbers", cat: "Strings", desc: "Tests symmetry using string slicing [::-1]." },
    { id: 8, title: "GCD & LCM using Euclid's Modulo Algorithm", cat: "Algorithms", desc: "Euclidean remainder reduction in logarithmic time." },
    { id: 9, title: "Sum of Geometric Series (1 + x + x² + ... + xⁿ)", cat: "Series", desc: "Accumulates exponential series." },
    { id: 10, title: "Sum of Alternating Series (1 - x + x² - ...)", cat: "Series", desc: "Alternating signs using (-1)ⁱ." },
    { id: 11, title: "Factorial Calculation (Iterative N!)", cat: "Loops", desc: "Iterative product from 1 to N." },
    { id: 12, title: "Perfect Number Verifier (e.g. 28)", cat: "Math", desc: "Sum of proper divisors equals number." },
    { id: 13, title: "String Glyphs & Vowels Counter", cat: "Strings", desc: "Counts uppercase, lowercase, vowels, consonants, digits." },
    { id: 14, title: "Right-Angled Triangle Pattern Generator", cat: "Patterns", desc: "Nested loop geometric star matrix." },
    { id: 15, title: "List Statistics: Max, Min, Mean & 2nd Largest", cat: "Lists", desc: "Computes list metrics and second highest value." },
    { id: 16, title: "Linear Search on List with Index Reporting", cat: "Algorithms", desc: "Sequential search with index tracking." },
    { id: 17, title: "List Frequency Counter using Dictionary", cat: "Dictionaries", desc: "Builds histogram mapping item -> count." },
    { id: 18, title: "Tuple Swapping, Slicing & Concatenation", cat: "Tuples", desc: "Tuple packing, unpacking, and slicing." },
    { id: 19, title: "Student Record Manager (Nested Dict)", cat: "Dictionaries", desc: "Manages student rolls, streams, and marks." },
    { id: 20, title: "Random Simulation: 6-Sided Dice Roll", cat: "Modules", desc: "Uses random.randint() for dice statistics." }
  ];

  const curr = programs[selectedProg];

  return (
    <div className="bg-slate-950/90 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Award size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              20-Program Practical Repository Aligned with CBSE Suggested Programs
            </h3>
            <p className="text-xs text-slate-400">
              Select any prescribed laboratory program to inspect its algorithmic design, category, and objective.
            </p>
          </div>
        </div>
      </div>

      {/* Program Chips Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
        {programs.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setSelectedProg(idx)}
            className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
              selectedProg === idx
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-lg scale-105'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <span className="text-[10px] font-mono opacity-80">Prog #{p.id}</span>
            <span className="text-xs truncate font-semibold block">{p.title.split('(')[0]}</span>
          </button>
        ))}
      </div>

      {/* Selected Program Details */}
      <div className="bg-slate-900/80 p-5 rounded-2xl border border-emerald-500/30 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-base font-bold text-white">Program {curr.id}: {curr.title}</h4>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            Category: {curr.cat}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{curr.desc}</p>
      </div>
    </div>
  );
};

export default function Topic0() {
  const [copiedScript, setCopiedScript] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([pythonCode], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "cbse_xi_cs083_20_practical_lab_bank.py";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* SECTION 1: HEADER & BREADCRUMB */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold rounded-full uppercase tracking-wider">
                Practical Examination · 30 Marks
              </span>
              <span className="px-3 py-1 bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold rounded-full">
                Module 007_002 · Topic 0
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Class XI CS (083) 30-Mark Practical Examination Lab Bank: 20-Program Practical Repository Aligned with CBSE Suggested Programs
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
              Master the official 30-mark CBSE practical examination requirements. Explore the complete 20-program practical laboratory repository aligned with CBSE's suggested problem list, report file guidelines, and comprehensive Viva Voce preparation.
            </p>
          </div>
        </div>

        {/* SECTION 2: 30-MARK PRACTICAL MARKING SCHEME */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <Award size={20} className="text-emerald-400" />
            <h3 className="text-base font-bold text-white">CBSE Practical Examination Blueprint (30 Marks)</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-1">
              <span className="text-emerald-400 font-bold block text-sm">1. Lab Problem Solving</span>
              <span className="text-xl font-extrabold text-white">12 Marks</span>
              <p className="text-slate-400 text-[11px] pt-1">Python hands-on program on lab workstation (Logic, code execution, and output).</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-sky-500/40 space-y-1">
              <span className="text-sky-400 font-bold block text-sm">2. Practical Report File</span>
              <span className="text-xl font-extrabold text-white">07 Marks</span>
              <p className="text-slate-400 text-[11px] pt-1">Minimum 20 Python programs verified and signed by subject teacher.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/40 space-y-1">
              <span className="text-amber-400 font-bold block text-sm">3. Term Project</span>
              <span className="text-xl font-extrabold text-white">03 Marks</span>
              <p className="text-slate-400 text-[11px] pt-1">Python terminal-based mini project applying data structures and modules.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-purple-500/40 space-y-1">
              <span className="text-purple-400 font-bold block text-sm">4. Viva Voce</span>
              <span className="text-xl font-extrabold text-white">08 Marks</span>
              <p className="text-slate-400 text-[11px] pt-1">Oral examination covering Python concepts, algorithm tracing, and CSO.</p>
            </div>
          </div>
        </div>

        {/* SECTION 3: INTERACTIVE 20-PROGRAM NAVIGATOR */}
        <div className="space-y-4">
          <PracticalBankNavigator />
        </div>

        {/* SECTION 4: MASTER PYTHON CODE LOADER */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Code size={18} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Master Laboratory Script: All 20 Python Practical Programs
                </h2>
                <p className="text-xs text-slate-400">
                  Fully verified, docstring-documented, runnable implementation of all 20 practical programs.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 hover:border-emerald-500 text-slate-200 transition-all"
              >
                {copiedScript ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copiedScript ? 'Copied All 20 Programs!' : 'Copy Code'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md"
              >
                <Download size={14} />
                <span>Download .py File</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <PythonFileLoader
              fileModule={pythonCode}
              title="cbse_20_practical_lab_bank.py – 20-Program Master Repository"
              highlightLines={[12, 25, 45, 65]}
            />
          </div>
        </div>

        {/* SECTION 5: VIVA VOCE ASSESSMENT */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              <HelpCircle size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Practical Viva Voce Master Preparation (25 Questions)
              </h2>
              <p className="text-xs text-slate-400">
                High-frequency questions asked by examiners during the 8-mark Viva Voce examination.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <FAQTemplate questions={questions} />
          </div>
        </div>

        {/* SECTION 6: TEACHER'S NOTE & PRINTABLE SUMMARY */}
        <div className="space-y-6">
          <Teacher />

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <PlainTextPrint
              content={noteText}
              filename="007_002_cbse_20_practical_lab_manual.txt"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
