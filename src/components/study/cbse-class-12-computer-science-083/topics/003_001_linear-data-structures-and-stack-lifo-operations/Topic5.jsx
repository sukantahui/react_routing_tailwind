import React from 'react';
import {
  ArrowDownCircle, AlertOctagon, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, ShieldCheck
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";
import pythonCode from "./topic5_files/stack_pop_implementation_lab.py?raw";

export default function Topic5() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-rose-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Segment 3 · Topic 5
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Stack Deletion Mechanics
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Implementing Pop Operation: Removing Elements using <code className="text-rose-300 font-mono">list.pop()</code> with Underflow Guard
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the extraction mechanics of Stacks. Learn how <code className="text-rose-300 font-mono">stk.pop()</code> removes from the top in O(1) time, how to implement bulletproof Underflow guards, and avoid fatal runtime crashes on empty collections.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/80 border border-rose-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-rose-500/10 rounded-xl text-rose-400 w-fit">
              <ArrowDownCircle size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">stk.pop()</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Extracts and returns the element at index <code className="text-rose-300">-1</code> (TOP). Stack depth decreases by 1.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 w-fit">
              <AlertOctagon size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Underflow Guard</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Checking <code className="text-amber-300">len(stk) == 0</code> before popping prevents the dreaded <code className="text-red-400">IndexError</code> crash.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">O(1) Tail Removal</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Removing the tail element incurs zero element shifts in memory, achieving optimal O(1) execution speed.
            </p>
          </div>
        </div>

        {/* 3. Deep Dive Theory */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-rose-400" size={22} />
            The Standard CBSE Pop Blueprint
          </h2>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 space-y-2">
            <p><span className="text-purple-400">def</span> <span className="text-amber-300">Pop</span>(stk):</p>
            <p className="pl-4 text-slate-400"># 1. Underflow Guard Check (1 Mark in Board Rubric)</p>
            <p className="pl-4"><span className="text-purple-400">if</span> len(stk) == <span className="text-amber-300">0</span>:</p>
            <p className="pl-8">print(<span className="text-rose-300">"Underflow: Stack is empty"</span>)</p>
            <p className="pl-8"><span className="text-purple-400">return</span> <span className="text-purple-400">None</span></p>
            <p className="pl-4"><span className="text-purple-400">else</span>:</p>
            <p className="pl-8 text-slate-400"># 2. Extract and return top element</p>
            <p className="pl-8"><span className="text-purple-400">return</span> stk.pop()</p>
          </div>
        </div>

        {/* 4. Code Lab Example */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="text-amber-400" size={20} />
              Practical Lab Demonstration
            </h2>
            <span className="text-xs text-slate-400 font-mono">stack_pop_implementation_lab.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="stack_pop_implementation_lab.py"
            title="Pop Implementation with Underflow Protection"
          />
        </div>

        {/* 5. Common Pitfalls & Traps */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
            <AlertTriangle size={22} />
            Board Examination Traps in Pop()
          </h2>
          <div className="p-4 bg-slate-900/80 rounded-xl border border-amber-500/20 text-xs sm:text-sm text-slate-300 space-y-2">
            <p className="font-bold text-red-400">Trap: Forgetting to return None in Underflow branch</p>
            <p className="text-slate-400 leading-relaxed">
              If your function prints "Underflow" but forgets to <code className="text-amber-300">return None</code> or use <code className="text-purple-300">else:</code>, Python continues executing into <code className="text-red-400">stk.pop()</code>, throwing <code className="text-red-400 font-bold">IndexError: pop from empty list</code> right after printing the error message!
            </p>
          </div>
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In board exams, read carefully whether the question asks you to 'return the deleted item' or 'display the deleted item'. If it asks to return, write 'return stk.pop()'. If it asks to display, write 'print("Deleted item:", stk.pop())'. Matching the exact wording avoids minor mark deductions!"
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_stack_pop_method.txt"
          title="Download Topic 5 Concise Revision Notes"
        />

        {/* 8. CBSE Board Examination Quality FAQ Set */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-500/10 rounded-xl text-rose-400">
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