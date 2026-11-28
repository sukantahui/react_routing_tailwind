import React from 'react';
import {
  ShieldCheck, AlertTriangle, CheckCircle2,
  HelpCircle, Layers, ArrowRight, Zap, Code2, AlertOctagon
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";
import pythonCode from "./topic3_files/stack_empty_check_lab.py?raw";

export default function Topic3() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Segment 3 · Topic 3
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                Defensive Programming
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Condition Checks: Checking for Empty Stack (<code className="text-emerald-300 font-mono">len(stk) == 0</code> or <code className="text-emerald-300 font-mono">not stk</code>)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Eliminate runtime crashes before they happen. Master the exact condition checks for detecting an empty stack, writing defensive <code className="text-emerald-300 font-mono">isEmpty()</code> helper functions, and securing full marks on CBSE board rubrics.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
              <Code2 size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">1. len(stk) == 0</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              The most explicit, readable, and widely expected check in CBSE Class 12 board marking keys.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400 w-fit">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">2. if not stk:</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Idiomatic Python. An empty collection evaluates to False, so <code className="text-sky-300">not stk</code> evaluates to True when empty.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400 w-fit">
              <AlertOctagon size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">3. def isEmpty(stk):</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Encapsulating the check into a clean boolean function adheres to the formal Stack Abstract Data Type (ADT).
            </p>
          </div>
        </div>

        {/* 3. Deep Dive Theory: Crash Comparison */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-emerald-400" size={22} />
            The Anatomy of an Unprotected Pop Crash
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-4 bg-slate-900 rounded-2xl border border-red-500/30 space-y-2">
              <p className="font-bold text-red-400">❌ Unprotected Pop (Crashes on []):</p>
              <pre className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-red-300 overflow-x-auto">
{`def Pop(stk):
    # DANGEROUS: No guard check!
    return stk.pop()`}
              </pre>
              <p className="text-xs text-slate-400">
                Throws <code className="text-red-400">IndexError: pop from empty list</code> when stack is empty. Board penalty: -1 mark!
              </p>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-emerald-500/30 space-y-2">
              <p className="font-bold text-emerald-400">✅ Protected Pop (CBSE Standard):</p>
              <pre className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-emerald-300 overflow-x-auto">
{`def Pop(stk):
    if len(stk) == 0:
        print("Underflow: Stack is empty")
        return None
    return stk.pop()`}
              </pre>
              <p className="text-xs text-slate-400">
                Handles empty state gracefully. Awarded 100% full credit in board rubrics.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Code Lab Example */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="text-amber-400" size={20} />
              Practical Lab Demonstration
            </h2>
            <span className="text-xs text-slate-400 font-mono">stack_empty_check_lab.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="stack_empty_check_lab.py"
            title="Defensive Empty Stack Guards Implementation"
          />
        </div>

        {/* 5. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In board coding questions where you must write def Pop(stk) or def Peek(stk), ALWAYS start with the empty check: 'if len(stk) == 0: print("Underflow"); return None'. Never jump straight to stk.pop()! Examiners check this first before anything else."
        />

        {/* 6. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_stack_empty_check.txt"
          title="Download Topic 3 Concise Revision Notes"
        />

        {/* 7. CBSE Board Examination Quality FAQ Set */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <HelpCircle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Practice &amp; FAQs</h2>
              <p className="text-xs text-slate-400">25 Authentic Questions with Complete Explanations &amp; Hints</p>
            </div>
          </div>
          <FAQTemplate questions={questions} />
        </div>

      </div>
    </div>
  );
}