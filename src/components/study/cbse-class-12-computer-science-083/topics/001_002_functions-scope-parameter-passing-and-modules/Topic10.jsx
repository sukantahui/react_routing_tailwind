import React from 'react';
import {
  Code, Terminal, CheckCircle2, AlertTriangle, HelpCircle,
  FileCode2, ArrowRight, ShieldCheck, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";
import pythonCode from "./topic10_files/user_defined_modules_and_importing_lab.py?raw";

export default function Topic10() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Topic 10
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Modular Architecture
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Creating User-Defined Modules (.py files) &amp; Importing Mechanisms
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore how Python structures reusable code across independent source files. Master the differences between 'import module', 'from module import function', module aliasing, the __name__ == '__main__' guard, and standard library modules (math, random).
            </p>
          </div>
        </div>

        {/* 2. Visual Import Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-300 flex items-center gap-2">
              <FileCode2 size={18} className="text-sky-400" /> import module_name
            </h3>
            <p className="text-xs text-slate-400">Namespace qualification required.</p>
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
              <p><span className="text-pink-400 font-bold">import</span> math</p>
              <p>res = <span className="text-sky-400 font-bold">math.sqrt(25)</span></p>
            </div>
            <ul className="text-xs text-slate-300 space-y-1">
              <li>• Prevents namespace collisions.</li>
              <li>• Always clear which module a function comes from.</li>
            </ul>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-400" /> from module import function
            </h3>
            <p className="text-xs text-slate-400">Direct function access without module prefix.</p>
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
              <p><span className="text-pink-400 font-bold">from</span> math <span className="text-pink-400 font-bold">import</span> sqrt</p>
              <p>res = <span className="text-emerald-400 font-bold">sqrt(25)</span></p>
            </div>
            <ul className="text-xs text-slate-300 space-y-1">
              <li>• More concise at the call site.</li>
              <li>• Beware of local variable shadowing!</li>
            </ul>
          </div>
        </div>

        {/* 3. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Executable Laboratory Script: Module Creation &amp; Import Styles</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="user_defined_modules_and_importing_lab.py"
            highlightLines={[9, 14, 18, 24, 30, 44]}
          />
        </div>

        {/* 4. 25-Question FAQ Assessment */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <FAQTemplate
            title="CBSE Class XII CS (083) – 25 Diagnostic Questions: Modules & Importing"
            questions={questions}
          />
        </div>

        {/* 5. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="Never name your script 'random.py' or 'math.py'! When you write 'import random', Python searches your current directory FIRST. If it finds your script, it will import itself and crash with an AttributeError when you try to call random.randint()! — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Quick Revision Document (Module 2 Topic 10)"
            filename="topic10_modules_importing_notes.txt"
          />
        </div>

      </div>
    </div>
  );
}
