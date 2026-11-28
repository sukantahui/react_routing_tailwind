import React from 'react';
import {
  Code, Terminal, CheckCircle2, AlertTriangle, HelpCircle,
  GitCommit, ArrowRight, ShieldCheck, Check, X, FastForward
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";
import pythonCode from "./topic2_files/function_call_control_flow_lab.py?raw";

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
                Execution Mechanics
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Function Call, Control Flow &amp; Value Returning Mechanism
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Trace the lifecycle of a function invocation. Understand Call Stack frame allocation, the exact moment of parameter binding, immediate return termination, unreachable code traps, and fruitful vs void functions.
            </p>
          </div>
        </div>

        {/* 2. Visual Control Flow Diagram */}
        <div className="bg-slate-950/90 rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FastForward size={18} className="text-sky-400" /> Procedural Control Flow Lifecycle
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold block uppercase text-[11px]">1. Call Invoked</span>
              <p className="text-slate-300">Caller suspends.<br/>Arguments evaluated.<br/>Stack frame pushed.</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold block uppercase text-[11px]">2. Body Executed</span>
              <p className="text-slate-300">Parameters bound.<br/>Local statements execute sequentially.</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <span className="text-pink-400 font-bold block uppercase text-[11px]">3. Return Hit</span>
              <p className="text-slate-300">Function halts.<br/>Stack frame popped.<br/>Result sent back.</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block uppercase text-[11px]">4. Caller Resumes</span>
              <p className="text-slate-300">Return value replaces call expression.<br/>Script continues.</p>
            </div>
          </div>
        </div>

        {/* 3. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Executable Laboratory Script: Control Flow &amp; Early Returns</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="function_call_control_flow_lab.py"
            highlightLines={[8, 12, 17, 24, 27, 34]}
          />
        </div>

        {/* 4. 25-Question FAQ Assessment */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <FAQTemplate
            title="CBSE Class XII CS (083) – 25 Diagnostic Questions: Control Flow & Returns"
            questions={questions}
          />
        </div>

        {/* 5. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="When tracing function output in CBSE board exams, watch out for code written after a return statement! Any line placed after 'return' within the same block will NEVER execute. It is unreachable dead code. — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Quick Revision Document (Module 2 Topic 2)"
            filename="topic2_control_flow_returns_notes.txt"
          />
        </div>

      </div>
    </div>
  );
}
