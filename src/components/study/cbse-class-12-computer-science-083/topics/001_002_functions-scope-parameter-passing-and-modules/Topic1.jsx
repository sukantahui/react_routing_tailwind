import React from 'react';
import {
  Code, Terminal, CheckCircle2, AlertTriangle, HelpCircle,
  Layers, ArrowRight, ShieldCheck, Check, X, ArrowLeftRight
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";
import pythonCode from "./topic1_files/formal_parameters_vs_actual_arguments_lab.py?raw";

export default function Topic1() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Topic 1
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Function Signature
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Function Header, Formal Parameters vs Actual Arguments
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Examine the statutory distinction between formal parameters declared in function definitions and actual arguments supplied during function invocations. Learn argument evaluation order and count mismatch rules.
            </p>
          </div>
        </div>

        {/* 2. Visual Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-300 flex items-center gap-2">
              <Code size={18} className="text-sky-400" /> Formal Parameters (Definition)
            </h3>
            <p className="text-xs text-slate-400">Placeholders waiting for values inside function header.</p>
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 border border-slate-800">
              <span className="text-pink-400 font-bold">def</span> area(<span className="text-sky-400 font-bold">length, width</span>):
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>• Declared in the function header line.</li>
              <li>• Act as local variables with local function scope.</li>
              <li>• Created when called; destroyed upon return.</li>
            </ul>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <ArrowLeftRight size={18} className="text-emerald-400" /> Actual Arguments (Call)
            </h3>
            <p className="text-xs text-slate-400">Real values or expressions passed during function call.</p>
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 border border-slate-800">
              res = area(<span className="text-emerald-400 font-bold">10, 5 * 2</span>)
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>• Supplied inside parentheses during invocation.</li>
              <li>• Can be literals, variables, expressions, or function calls.</li>
              <li>• Evaluated before binding to formal parameters.</li>
            </ul>
          </div>
        </div>

        {/* 3. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Executable Laboratory Script: Parameters vs Arguments</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="formal_parameters_vs_actual_arguments_lab.py"
            highlightLines={[8, 17, 23, 28, 34]}
          />
        </div>

        {/* 4. 25-Question FAQ Assessment */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <FAQTemplate
            title="CBSE Class XII CS (083) – 25 Diagnostic Questions: Parameters vs Arguments"
            questions={questions}
          />
        </div>

        {/* 5. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="Remember: Formal parameters are in the function DEF line (the blueprint). Actual arguments are in the function CALL (the execution)! Mixing these two terms up in definition questions is a very common source of lost marks in CBSE board exams. — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Quick Revision Document (Module 2 Topic 1)"
            filename="topic1_parameters_vs_arguments_notes.txt"
          />
        </div>

      </div>
    </div>
  );
}
