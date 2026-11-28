import React from 'react';
import {
  Code, Terminal, CheckCircle2, AlertTriangle, HelpCircle,
  Layers, ArrowRight, ShieldCheck, Check, X, Box
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/functions_definition_and_need_lab.py?raw";

export default function Topic0() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Topic 0
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Modular Architecture
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Understanding Functions: Need, Advantages &amp; Definition using 'def' Keyword
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the foundational principles of procedural abstraction in Python. Learn the syntax of the def header, docstring conventions, the five structural benefits of modular programming, and void vs fruitful functions.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-300 flex items-center gap-2">
              <Box size={18} className="text-sky-400" /> Anatomical Anatomy of a Function
            </h3>
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 space-y-1.5 border border-slate-800">
              <p><span className="text-pink-400 font-bold">def</span> <span className="text-sky-300 font-bold">calc_volume</span>(radius, height):</p>
              <p className="text-emerald-400 pl-4">"""Docstring: computes volume."""</p>
              <p className="text-slate-300 pl-4">v = 3.14159 * (radius ** 2) * height</p>
              <p className="text-pink-400 pl-4 font-bold">return <span className="text-amber-300">v</span></p>
            </div>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• <code className="text-pink-400">def</code>: Keyword initiating definition.</li>
              <li>• <code className="text-sky-300">calc_volume</code>: Function identifier.</li>
              <li>• <code className="text-white">(radius, height)</code>: Formal parameter list.</li>
              <li>• <code className="text-amber-300">return</code>: Passes control and result back.</li>
            </ul>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-400" /> The 5 Modularity Advantages
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li><strong className="text-white">1. Reusability:</strong> Write once; invoke anywhere.</li>
              <li><strong className="text-white">2. Redundancy Reduction:</strong> Eliminates duplicate copy-pasted code.</li>
              <li><strong className="text-white">3. Isolated Debugging:</strong> Bug fixes are contained inside functions.</li>
              <li><strong className="text-white">4. Abstraction:</strong> Hides complex internal execution mechanics.</li>
              <li><strong className="text-white">5. Team Collaboration:</strong> Independent developer workflows.</li>
            </ul>
          </div>
        </div>

        {/* 3. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Executable Laboratory Script: Functions Definition &amp; Void Return</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="functions_definition_and_need_lab.py"
            highlightLines={[7, 8, 13, 20, 24, 28]}
          />
        </div>

        {/* 4. 25-Question FAQ Assessment */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <FAQTemplate
            title="CBSE Class XII CS (083) – 25 Diagnostic Questions: Functions Definition & Need"
            questions={questions}
          />
        </div>

        {/* 5. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="Never confuse 'print()' with 'return'! A function that prints a value still returns None unless it explicitly contains a 'return' statement. In CBSE board marking, writing 'print(x)' when the question asks to 'return the result' leads to a 1-mark penalty! — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Quick Revision Document (Module 2 Topic 0)"
            filename="topic0_functions_definition_notes.txt"
          />
        </div>

      </div>
    </div>
  );
}
