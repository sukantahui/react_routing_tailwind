import React from 'react';
import {
  Code, Terminal, CheckCircle2, AlertTriangle, HelpCircle,
  Share2, ArrowRight, ShieldCheck, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";
import pythonCode from "./topic9_files/parameter_passing_object_reference_lab.py?raw";

export default function Topic9() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Topic 9
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Argument Mechanics
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Parameter Passing Mechanics: Pass-by-Object-Reference
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understand Python's Call-by-Sharing model. Contrast the behavior of immutable arguments (integers, strings, tuples) with mutable arguments (lists, dictionaries), and master in-place mutations vs local rebinding.
            </p>
          </div>
        </div>

        {/* 2. Visual Mechanics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-300 flex items-center gap-2">
              <ShieldCheck size={18} className="text-sky-400" /> Immutable Arguments (Protected)
            </h3>
            <p className="text-xs text-slate-400">int, float, str, tuple cannot be changed in-place.</p>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>• Operations like <code className="text-sky-300">x += 1</code> create a new local object.</li>
              <li>• Caller's original variable remains <strong>UNCHANGED</strong>.</li>
              <li>• Simulates Pass-by-Value behavior.</li>
            </ul>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <Share2 size={18} className="text-emerald-400" /> Mutable Arguments (Shared)
            </h3>
            <p className="text-xs text-slate-400">list, dict, set share memory addresses.</p>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>• In-place methods like <code className="text-emerald-300">L.append()</code> alter the caller's object!</li>
              <li>• Reassignment <code className="text-amber-300">L = [1, 2]</code> breaks the reference without altering caller.</li>
              <li>• To protect data, pass a shallow copy: <code className="text-sky-300">func(L[:])</code>.</li>
            </ul>
          </div>
        </div>

        {/* 3. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Executable Laboratory Script: Pass-by-Object-Reference</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="parameter_passing_object_reference_lab.py"
            highlightLines={[10, 11, 20, 21, 30]}
          />
        </div>

        {/* 4. 25-Question FAQ Assessment */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <FAQTemplate
            title="CBSE Class XII CS (083) – 25 Diagnostic Questions: Parameter Passing Mechanics"
            questions={questions}
          />
        </div>

        {/* 5. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="In CBSE board output tracing questions: if a function performs 'L.append(5)' on a passed list, the caller's list IS MODIFIED! But if the function does 'L = [5]', only the local parameter is changed, and the caller's list is untouched! Master this distinction! — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Quick Revision Document (Module 2 Topic 9)"
            filename="topic9_parameter_passing_notes.txt"
          />
        </div>

      </div>
    </div>
  );
}
