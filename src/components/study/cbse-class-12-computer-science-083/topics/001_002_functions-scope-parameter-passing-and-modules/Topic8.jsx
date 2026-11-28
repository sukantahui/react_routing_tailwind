import React from 'react';
import {
  Code, Terminal, CheckCircle2, AlertTriangle, HelpCircle,
  Globe, ArrowRight, ShieldCheck, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";
import pythonCode from "./topic8_files/global_keyword_and_scope_pitfalls_lab.py?raw";

export default function Topic8() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Topic 8
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Global Modification
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Modifying Global Variables using the 'global' Keyword &amp; Common Pitfalls
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the exact rules for rebinding global identifiers from inside local function suites. Understand the mechanics of the global statement, dynamic global variable creation, and avoiding UnboundLocalError traps.
            </p>
          </div>
        </div>

        {/* 2. Visual Rules & Pitfall Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-300 flex items-center gap-2">
              <Globe size={18} className="text-sky-400" /> The 'global' Statement
            </h3>
            <p className="text-xs text-slate-400">Explicitly declares that an identifier refers to global scope.</p>
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs space-y-1 border border-slate-800">
              <p><span className="text-pink-400 font-bold">def</span> update_score(points):</p>
              <p className="pl-4 text-emerald-400 font-bold">global score</p>
              <p className="pl-4 text-slate-300">score += points</p>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-400" /> UnboundLocalError Trap
            </h3>
            <p className="text-xs text-slate-300">
              Any assignment <code className="text-rose-400">x = ...</code> marks <code className="text-rose-400">x</code> as local. Reading it before assignment causes a crash!
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg text-xs font-mono space-y-1">
              <p className="text-rose-400 font-bold">UnboundLocalError: local variable 'x' referenced before assignment</p>
            </div>
          </div>
        </div>

        {/* 3. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Executable Laboratory Script: Global Keyword Mechanics</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="global_keyword_and_scope_pitfalls_lab.py"
            highlightLines={[9, 10, 18, 19, 29]}
          />
        </div>

        {/* 4. 25-Question FAQ Assessment */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <FAQTemplate
            title="CBSE Class XII CS (083) – 25 Diagnostic Questions: The 'global' Keyword"
            questions={questions}
          />
        </div>

        {/* 5. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="Remember: You do NOT need the 'global' keyword to READ a global variable or mutate a global list using append()! You ONLY need 'global' when you REBIND the variable name using an assignment operator like '=' or '+='. — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Quick Revision Document (Module 2 Topic 8)"
            filename="topic8_global_keyword_notes.txt"
          />
        </div>

      </div>
    </div>
  );
}
