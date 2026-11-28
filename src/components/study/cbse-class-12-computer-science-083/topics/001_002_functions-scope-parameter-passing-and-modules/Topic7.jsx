import React from 'react';
import {
  Code, Terminal, CheckCircle2, AlertTriangle, HelpCircle,
  Search, ArrowRight, ShieldCheck, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";
import pythonCode from "./topic7_files/legb_rule_namespace_resolution_lab.py?raw";

export default function Topic7() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Topic 7
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Name Resolution
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              The LEGB Rule: Local, Enclosing, Global &amp; Built-in Namespace Resolution
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master Python's four concentric namespace scopes. Understand the strict sequential search hierarchy: Local (L) → Enclosing (E) → Global (G) → Built-in (B), and learn how identifier shadowing impacts code execution.
            </p>
          </div>
        </div>

        {/* 2. Visual LEGB Concentric Rings */}
        <div className="bg-slate-950/90 rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Search size={18} className="text-sky-400" /> The 4 Concentric Scopes Hierarchy
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 bg-slate-900 rounded-xl border border-sky-500/40 space-y-1">
              <span className="text-sky-400 font-bold block uppercase text-[11px]">1. Local (L)</span>
              <p className="text-slate-300">Checked FIRST.<br/>Inside current executing function.</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-indigo-500/40 space-y-1">
              <span className="text-indigo-400 font-bold block uppercase text-[11px]">2. Enclosing (E)</span>
              <p className="text-slate-300">Checked SECOND.<br/>Outer enclosing functions (nested).</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-amber-500/40 space-y-1">
              <span className="text-amber-400 font-bold block uppercase text-[11px]">3. Global (G)</span>
              <p className="text-slate-300">Checked THIRD.<br/>Module top-level variables.</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-emerald-500/40 space-y-1">
              <span className="text-emerald-400 font-bold block uppercase text-[11px]">4. Built-in (B)</span>
              <p className="text-slate-300">Checked LAST.<br/>len, range, print, sum.</p>
            </div>
          </div>
        </div>

        {/* 3. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Executable Laboratory Script: LEGB Scope Resolution</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="legb_rule_namespace_resolution_lab.py"
            highlightLines={[8, 12, 17, 21, 26]}
          />
        </div>

        {/* 4. 25-Question FAQ Assessment */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <FAQTemplate
            title="CBSE Class XII CS (083) – 25 Diagnostic Questions: The LEGB Rule"
            questions={questions}
          />
        </div>

        {/* 5. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="Remember the LEGB lookup order: Local first, Enclosing second, Global third, Built-in fourth! If an identifier is not found in ANY of these four namespaces, Python halts with a NameError! — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Quick Revision Document (Module 2 Topic 7)"
            filename="topic7_legb_rule_notes.txt"
          />
        </div>

      </div>
    </div>
  );
}
