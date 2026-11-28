import React from 'react';
import {
  Eye, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, ShieldCheck
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";
import pythonCode from "./topic6_files/stack_peek_implementation_lab.py?raw";

export default function Topic6() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Segment 3 · Topic 6
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Non-Destructive Inspection
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Implementing Peek Operation: Inspecting the Top Element without Removal (<code className="text-sky-300 font-mono">stack[-1]</code>)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Inspect the summit without disturbing the structure. Master the read-only mechanics of <code className="text-sky-300 font-mono">Peek()</code>, understand negative indexing <code className="text-sky-300 font-mono">stack[-1]</code>, and contrast it with mutating <code className="text-rose-300 font-mono">Pop()</code>.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400 w-fit">
              <Eye size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Non-Destructive</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unlike <code className="text-rose-300">Pop()</code>, <code className="text-sky-300">Peek()</code> does NOT delete the element. Stack size remains 100% unaltered.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Negative Index -1</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Python's native <code className="text-emerald-300">stk[-1]</code> accesses the tail element directly in O(1) constant time.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 w-fit">
              <AlertTriangle size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Empty Guard</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calling <code className="text-amber-300">stk[-1]</code> on an empty list throws <code className="text-red-400">IndexError</code>. Always check <code className="text-amber-300">len(stk) == 0</code> first!
            </p>
          </div>
        </div>

        {/* 3. Deep Dive Theory */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-sky-400" size={22} />
            Pop() vs Peek(): Detailed Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4 text-rose-400 font-bold">Pop()</th>
                  <th className="py-3 px-4 text-sky-400 font-bold">Peek() / Top()</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                <tr>
                  <td className="py-3 px-4 font-sans text-xs">Stack Mutation</td>
                  <td className="py-3 px-4 text-rose-300">YES (Removes element)</td>
                  <td className="py-3 px-4 text-sky-300">NO (Read-only)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans text-xs">Stack Length</td>
                  <td className="py-3 px-4 text-rose-300">Decreases by 1</td>
                  <td className="py-3 px-4 text-sky-300">Remains unchanged</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans text-xs">Python Syntax</td>
                  <td className="py-3 px-4 text-slate-400">stk.pop()</td>
                  <td className="py-3 px-4 text-slate-400">stk[-1]</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans text-xs">Empty State Exception</td>
                  <td className="py-3 px-4 text-red-400">IndexError: pop from empty list</td>
                  <td className="py-3 px-4 text-red-400">IndexError: list index out of range</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Code Lab Example */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="text-amber-400" size={20} />
              Practical Lab Demonstration
            </h2>
            <span className="text-xs text-slate-400 font-mono">stack_peek_implementation_lab.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="stack_peek_implementation_lab.py"
            title="Peek Operation & Non-Destructive Inspection"
          />
        </div>

        {/* 5. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="Students frequently confuse Peek with Pop during oral vivas. Remember: Peek only LOOKS at the top value; it leaves the plate on the stack! Pop PICKS the plate up and removes it. In Python, write return stk[-1] for Peek and return stk.pop() for Pop."
        />

        {/* 6. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_stack_peek_method.txt"
          title="Download Topic 6 Concise Revision Notes"
        />

        {/* 7. CBSE Board Examination Quality FAQ Set */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400">
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