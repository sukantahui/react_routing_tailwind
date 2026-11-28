import React from 'react';
import {
  Code, Terminal, CheckCircle2, AlertTriangle, HelpCircle,
  Layers, ArrowRight, ShieldCheck, Check, X, Database
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";
import pythonCode from "./topic2_files/mutability_memory_hierarchy_lab.py?raw";

export default function Topic2() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Topic 2
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Type Hierarchy
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Data Types Hierarchy: Mutable vs Immutable Mechanics
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Examine the standard Python data type taxonomy. Distinguish between immutable objects (Numbers, Strings, Tuples) and mutable objects (Lists, Dictionaries), and explore shallow vs deep copying behavior.
            </p>
          </div>
        </div>

        {/* 2. Comparison Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-300 flex items-center gap-2">
              <ShieldCheck size={18} className="text-sky-400" /> Immutable Data Types
            </h3>
            <p className="text-xs text-slate-400">Values cannot be altered in-place after creation.</p>
            <ul className="text-xs text-slate-300 space-y-2">
              <li><strong className="text-white">Types:</strong> <code className="text-sky-300">int, float, complex, bool, str, tuple, frozenset</code></li>
              <li><strong className="text-white">Modification Behavior:</strong> Reassignment creates a new object in memory.</li>
              <li><strong className="text-white">Subscript Assignment:</strong> <code className="text-rose-400">s[0] = 'X'</code> raises <code className="text-rose-400">TypeError</code>.</li>
              <li><strong className="text-white">Dictionary Keys:</strong> Can safely be used as dictionary keys because they are hashable.</li>
            </ul>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <Database size={18} className="text-emerald-400" /> Mutable Data Types
            </h3>
            <p className="text-xs text-slate-400">Contents can be altered in-place without changing memory ID.</p>
            <ul className="text-xs text-slate-300 space-y-2">
              <li><strong className="text-white">Types:</strong> <code className="text-emerald-300">list, dict, set</code></li>
              <li><strong className="text-white">Modification Behavior:</strong> Operations like <code className="text-emerald-300">.append(), .pop()</code> alter the object in-place.</li>
              <li><strong className="text-white">Subscript Assignment:</strong> <code className="text-emerald-300">L[0] = 'X'</code> succeeds cleanly.</li>
              <li><strong className="text-white">Dictionary Keys:</strong> CANNOT be used as keys (<code className="text-rose-400">TypeError: unhashable type</code>).</li>
            </ul>
          </div>
        </div>

        {/* 3. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Executable Laboratory Script: Mutability &amp; Memory ID Verification</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="mutability_memory_hierarchy_lab.py"
            highlightLines={[8, 14, 21, 23, 31, 32]}
          />
        </div>

        {/* 4. 25-Question FAQ Assessment */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <FAQTemplate
            title="CBSE Class XII CS (083) – 25 Diagnostic Questions: Mutable vs Immutable"
            questions={questions}
          />
        </div>

        {/* 5. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="A classic CBSE board trick question: 'Can a tuple contain a mutable object?' YES! For example, t = (10, [20, 30]). The tuple itself cannot have elements added or removed, but the inner list t[1] CAN be modified with t[1].append(40)! — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Quick Revision Document (Topic 2)"
            filename="topic2_mutability_hierarchy_notes.txt"
          />
        </div>

      </div>
    </div>
  );
}
