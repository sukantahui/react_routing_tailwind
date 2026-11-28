import React from 'react';
import {
  Code, Terminal, CheckCircle2, AlertTriangle, HelpCircle,
  Sliders, ArrowRight, ShieldCheck, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";
import pythonCode from "./topic4_files/default_parameters_placement_lab.py?raw";

export default function Topic4() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Topic 4
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Default Values
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Default Parameters: Rules for Placement &amp; The Mutable Default Trap
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understand how to configure optional fallback parameters in Python function signatures. Master the statutory placement rule (non-default arguments cannot follow default arguments) and prevent shared mutable state bugs.
            </p>
          </div>
        </div>

        {/* 2. Visual Rules Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-300 flex items-center gap-2">
              <Sliders size={18} className="text-sky-400" /> Placement Rules (Right-to-Left)
            </h3>
            <p className="text-xs text-slate-400">All default parameters MUST appear at the end.</p>
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs space-y-1 border border-slate-800">
              <p><span className="text-emerald-400 font-bold">✓ def calc(a, b=10):</span> (VALID)</p>
              <p><span className="text-emerald-400 font-bold">✓ def calc(a, b, c=20, d=30):</span> (VALID)</p>
              <p><span className="text-rose-400 font-bold">✗ def calc(a=10, b):</span> (SyntaxError!)</p>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-400" /> Mutable Default Trap
            </h3>
            <p className="text-xs text-slate-300">
              Default values evaluate ONCE at definition time. Never use mutable defaults like <code className="text-rose-400">L=[]</code>!
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg text-xs font-mono space-y-1">
              <p><span className="text-rose-400">def add(x, L=[]):</span> (Shared list across calls!)</p>
              <p><span className="text-emerald-400">def add(x, L=None):</span> (Idiomatic safe fix)</p>
            </div>
          </div>
        </div>

        {/* 3. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Executable Laboratory Script: Default Arguments &amp; Mutable Trap</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="default_parameters_placement_lab.py"
            highlightLines={[10, 11, 23, 26, 33, 40]}
          />
        </div>

        {/* 4. 25-Question FAQ Assessment */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <FAQTemplate
            title="CBSE Class XII CS (083) – 25 Diagnostic Questions: Default Parameters"
            questions={questions}
          />
        </div>

        {/* 5. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="Remember: 'Non-default arguments cannot follow default arguments!' If a board exam question asks you to identify errors in a function definition, look immediately at the header for a parameter like 'def calc(rate=0.05, amount):'. That is an immediate SyntaxError! — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Quick Revision Document (Module 2 Topic 4)"
            filename="topic4_default_parameters_notes.txt"
          />
        </div>

      </div>
    </div>
  );
}
