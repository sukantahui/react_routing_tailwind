import React from 'react';
import {
  Code, Terminal, CheckCircle2, AlertTriangle, HelpCircle,
  Eye, ArrowRight, ShieldCheck, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";
import pythonCode from "./topic6_files/variable_scope_local_vs_global_lab.py?raw";

export default function Topic6() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Topic 6
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Namespaces &amp; Scope
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Variable Scope &amp; Lifetime: Local Scope vs Global Scope
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understand spatial visibility and temporal existence of Python variables. Distinguish between local stack frame lifetimes and module-level global variables, and master name shadowing rules.
            </p>
          </div>
        </div>

        {/* 2. Visual Scope Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-300 flex items-center gap-2">
              <Eye size={18} className="text-sky-400" /> Local Scope (Inside Function)
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li><strong className="text-white">Definition:</strong> Created inside a function or as formal parameters.</li>
              <li><strong className="text-white">Visibility:</strong> Accessible ONLY within that specific function body.</li>
              <li><strong className="text-white">Lifetime:</strong> Exists while the function runs; destroyed upon return.</li>
              <li><strong className="text-rose-400">External Access:</strong> Raises <code className="text-rose-400">NameError</code> if called from outside!</li>
            </ul>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-400" /> Global Scope (Top-Level)
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li><strong className="text-white">Definition:</strong> Created at the top level of the Python module.</li>
              <li><strong className="text-white">Visibility:</strong> Accessible across all functions throughout the file.</li>
              <li><strong className="text-white">Lifetime:</strong> Persists from creation until the entire program exits.</li>
              <li><strong className="text-amber-300">Shadowing:</strong> A local variable with identical name masks the global.</li>
            </ul>
          </div>
        </div>

        {/* 3. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Executable Laboratory Script: Scope &amp; Name Shadowing</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="variable_scope_local_vs_global_lab.py"
            highlightLines={[8, 12, 19, 23, 29]}
          />
        </div>

        {/* 4. 25-Question FAQ Assessment */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <FAQTemplate
            title="CBSE Class XII CS (083) – 25 Diagnostic Questions: Variable Scope & Lifetime"
            questions={questions}
          />
        </div>

        {/* 5. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="Remember the classic CBSE board definition: 'Scope is where a variable can be seen (spatial); Lifetime is how long it lives in memory (temporal).' Local variables live only while their function executes! — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Quick Revision Document (Module 2 Topic 6)"
            filename="topic6_scope_lifetime_notes.txt"
          />
        </div>

      </div>
    </div>
  );
}
