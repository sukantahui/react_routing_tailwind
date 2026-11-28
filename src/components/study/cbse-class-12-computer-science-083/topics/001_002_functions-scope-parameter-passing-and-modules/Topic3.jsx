import React from 'react';
import {
  Code, Terminal, CheckCircle2, AlertTriangle, HelpCircle,
  Tag, ArrowRight, ShieldCheck, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";
import pythonCode from "./topic3_files/positional_vs_keyword_arguments_lab.py?raw";

export default function Topic3() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Topic 3
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Call Semantics
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Positional Arguments vs Keyword (Named) Arguments
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the mechanisms of argument binding in Python. Contrast order-dependent positional arguments with name-bound keyword arguments, and learn the statutory syntactic rule when mixing both styles.
            </p>
          </div>
        </div>

        {/* 2. Visual Rule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-300 flex items-center gap-2">
              <Tag size={18} className="text-sky-400" /> Positional vs Keyword Mapping
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li><strong className="text-white">Positional:</strong> <code className="text-sky-300">func(10, 20)</code>. Bound strictly by left-to-right order.</li>
              <li><strong className="text-white">Keyword:</strong> <code className="text-emerald-300">func(b=20, a=10)</code>. Bound by name; order does not matter!</li>
            </ul>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-400" /> The Cardinal Mixing Rule
            </h3>
            <p className="text-xs text-slate-300">
              Positional arguments MUST appear <strong>BEFORE</strong> any keyword arguments!
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg text-xs font-mono space-y-1">
              <p><span className="text-emerald-400">✓ func(10, b=20)</span> (LEGAL)</p>
              <p><span className="text-rose-400">✗ func(a=10, 20)</span> (SyntaxError!)</p>
            </div>
          </div>
        </div>

        {/* 3. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Executable Laboratory Script: Positional &amp; Keyword Arguments</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="positional_vs_keyword_arguments_lab.py"
            highlightLines={[7, 12, 17, 18, 23, 34]}
          />
        </div>

        {/* 4. 25-Question FAQ Assessment */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <FAQTemplate
            title="CBSE Class XII CS (083) – 25 Diagnostic Questions: Positional vs Keyword Arguments"
            questions={questions}
          />
        </div>

        {/* 5. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="Remember the Golden Rule of Python arguments: Positional arguments must ALWAYS come BEFORE keyword arguments. Writing 'display(marks=95, 101)' will crash your code with a SyntaxError immediately before it even runs! — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Quick Revision Document (Module 2 Topic 3)"
            filename="topic3_positional_vs_keyword_notes.txt"
          />
        </div>

      </div>
    </div>
  );
}
