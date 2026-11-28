import React from 'react';
import {
  Code, Terminal, CheckCircle2, AlertTriangle, HelpCircle,
  Repeat, ArrowRight, ShieldCheck, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";
import pythonCode from "./topic5_files/loops_range_break_continue_lab.py?raw";

export default function Topic5() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Topic 5
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Iteration Constructs
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Iterative Constructs: for with range(), while Loops, break, continue &amp; loop-else
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master counted and conditional loops. Learn range() boundary semantics, negative stepping, loop flow manipulation with break and continue, and the execution rules of Python's unique loop-else suite.
            </p>
          </div>
        </div>

        {/* 2. Range & Control Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-300 flex items-center gap-2">
              <Repeat size={18} className="text-sky-400" /> range([start], stop, [step]) Mechanics
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li><strong className="text-white">Stop is Exclusive:</strong> <code className="text-sky-300">range(1, 5)</code> generates <code className="text-sky-300">1, 2, 3, 4</code>.</li>
              <li><strong className="text-white">Negative Step:</strong> <code className="text-sky-300">range(10, 0, -2)</code> generates <code className="text-sky-300">10, 8, 6, 4, 2</code>.</li>
              <li><strong className="text-white">Empty Progression:</strong> If step is positive and start &gt;= stop, result is empty.</li>
              <li><strong className="text-white">Zero Step Error:</strong> <code className="text-rose-400">range(1, 5, 0)</code> raises <code className="text-rose-400">ValueError</code>.</li>
            </ul>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-400" /> The Loop-Else Suite
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li><strong className="text-emerald-400">Normal Exit:</strong> Executes when loop finishes all iterations.</li>
              <li><strong className="text-rose-400">Break Exit:</strong> Completely SKIPPED if loop exits via <code className="text-rose-400">break</code>!</li>
              <li><strong className="text-white">Search Pattern:</strong> Ideal for searching collections without flag variables.</li>
              <li><strong className="text-white">While Loops:</strong> Executes when the while condition becomes False.</li>
            </ul>
          </div>
        </div>

        {/* 3. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Executable Laboratory Script: Iteration &amp; Loop-Else Suite</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="loops_range_break_continue_lab.py"
            highlightLines={[8, 9, 10, 19, 21, 31, 33]}
          />
        </div>

        {/* 4. 25-Question FAQ Assessment */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <FAQTemplate
            title="CBSE Class XII CS (083) – 25 Diagnostic Questions: Loops & Iteration"
            questions={questions}
          />
        </div>

        {/* 5. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="In CBSE output tracing questions with loops, ALWAYS maintain a trace table with columns: 'Iteration', 'Loop Var', 'Inner State', and 'Output Stream'. Never try to do 3+ iterations mentally—it is the #1 source of lost marks! — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Quick Revision Document (Topic 5)"
            filename="topic5_loops_iteration_notes.txt"
          />
        </div>

      </div>
    </div>
  );
}
