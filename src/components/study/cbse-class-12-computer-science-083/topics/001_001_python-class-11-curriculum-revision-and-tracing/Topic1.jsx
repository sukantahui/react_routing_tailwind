import React from 'react';
import {
  Code, Terminal, CheckCircle2, AlertTriangle, HelpCircle,
  Layers, ArrowRight, RefreshCw, Check, X, Compass
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";
import pythonCode from "./topic1_files/lvalue_rvalue_dynamic_typing_lab.py?raw";

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
                Core Memory Model
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Variables, Dynamic Typing &amp; l-value vs r-value Mechanics
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understand how Python binds variable names to memory objects. Contrast statutory l-value assignment requirements with r-value expression evaluation, multiple assignments, and variable reference swapping.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Diagram */}
        <div className="bg-slate-950/90 rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Compass size={18} className="text-sky-400" /> Python Object Reference Model
          </h3>
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                <span className="text-sky-400 font-bold block uppercase text-xs">Valid Assignment (l-value = r-value)</span>
                <p><code className="text-emerald-400">total = 95</code></p>
                <p><code className="text-emerald-400">a, b = 10, 20</code> (Simultaneous Unpack)</p>
                <p><code className="text-emerald-400">my_list[0] = 500</code> (Mutable Subscript)</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-rose-500/30 space-y-1.5">
                <span className="text-rose-400 font-bold block uppercase text-xs">Invalid Assignment (SyntaxError)</span>
                <p><code className="text-rose-400">100 = score</code> (Literal cannot be l-value)</p>
                <p><code className="text-rose-400">a + b = 25</code> (Expression cannot be l-value)</p>
                <p><code className="text-rose-400">len(s) = 5</code> (Function call cannot be l-value)</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Executable Laboratory Script: Variables &amp; Assignments</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="lvalue_rvalue_dynamic_typing_lab.py"
            highlightLines={[7, 10, 22, 23, 27]}
          />
        </div>

        {/* 4. 25-Question FAQ Assessment */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <FAQTemplate
            title="CBSE Class XII CS (083) – 25 Diagnostic Questions: Variables & Dynamic Typing"
            questions={questions}
          />
        </div>

        {/* 5. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="Remember: In Python, variables do not have types—OBJECTS have types! The statement 'a = 10' creates an integer object 10 and binds name 'a' to it. If you later write 'a = 20', 'a' does not overwrite 10; it points to a new object 20. — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Quick Revision Document (Topic 1)"
            filename="topic1_variables_lvalue_notes.txt"
          />
        </div>

      </div>
    </div>
  );
}
