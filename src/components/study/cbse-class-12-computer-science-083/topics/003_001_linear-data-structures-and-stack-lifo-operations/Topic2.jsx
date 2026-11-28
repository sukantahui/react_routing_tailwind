import React from 'react';
import {
  Compass, ArrowUpCircle, ArrowDownCircle, Eye, AlertOctagon,
  CheckCircle2, AlertTriangle, HelpCircle, Layers, ArrowRight, Zap
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";
import pythonCode from "./topic2_files/stack_terminology_lab.py?raw";

export default function Topic2() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Segment 3 · Topic 2
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Core Vocabulary
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Stack Terminology: TOP Pointer, Push, Pop, Peek, Overflow &amp; Underflow
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the exact technical vocabulary tested in CBSE examinations. Understand the mechanics of the <code className="text-sky-300 font-mono">TOP</code> pointer, the distinction between <code className="text-emerald-300 font-mono">Pop</code> and <code className="text-amber-300 font-mono">Peek</code>, and boundary hazards like <code className="text-rose-300 font-mono">Underflow</code>.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
              <ArrowUpCircle size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">PUSH</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Adds an element to the TOP of the stack. Stack depth increases by 1.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-rose-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-rose-500/10 rounded-xl text-rose-400 w-fit">
              <ArrowDownCircle size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">POP</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Removes and returns the top-most element. Requires Underflow check.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400 w-fit">
              <Eye size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">PEEK</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inspects the value of the top element without removing it. Read-only.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 w-fit">
              <AlertOctagon size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">UNDERFLOW</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Error triggered when attempting to Pop or Peek from an empty stack.
            </p>
          </div>
        </div>

        {/* 3. Deep Dive Theory: Pointer Mechanics */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-sky-400" size={22} />
            TOP Pointer Indexing in Python Lists
          </h2>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 space-y-2">
            <p className="text-sky-400 font-semibold">// State 1: Empty Stack</p>
            <p>stack = []  -&gt; len(stack) == 0  -&gt; <span className="text-amber-400">TOP = -1 (or None)</span></p>
            <p className="text-emerald-400 font-semibold pt-2">// State 2: Pushed 3 items [10, 20, 30]</p>
            <p>Indices: [0]=10, [1]=20, <span className="text-emerald-300">[2]=30</span>  -&gt; <span className="text-emerald-400">TOP index = 2 (or -1)</span></p>
            <p className="text-rose-400 font-semibold pt-2">// State 3: Pop() removes 30</p>
            <p>Remaining: [10, 20]  -&gt; <span className="text-rose-400">TOP index shifts down to 1</span></p>
          </div>
        </div>

        {/* 4. Code Lab Example */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="text-amber-400" size={20} />
              Practical Lab Demonstration
            </h2>
            <span className="text-xs text-slate-400 font-mono">stack_terminology_lab.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="stack_terminology_lab.py"
            title="Stack Terminology & Pointer Mechanics"
          />
        </div>

        {/* 5. Common Pitfalls & Traps */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
            <AlertTriangle size={22} />
            Board Examination Rubric Trap
          </h2>
          <div className="p-4 bg-slate-900/80 rounded-xl border border-amber-500/20 text-xs sm:text-sm text-slate-300 space-y-2">
            <p className="font-bold text-red-400">Unchecked Pop Crash:</p>
            <p className="text-slate-400 leading-relaxed">
              If a student writes <code className="text-red-400">def Pop(stk): return stk.pop()</code> without checking whether the stack is empty, Python crashes with <code className="text-red-400 font-bold">IndexError: pop from empty list</code> when tested on an empty stack! Board examiners routinely deduct 1 full mark for missing the Underflow guard.
            </p>
            <p className="text-emerald-400 font-semibold pt-1">
              Always write: <code className="text-sky-300">if len(stk) == 0: print("Underflow")</code> before calling pop!
            </p>
          </div>
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In board exams, you will often be asked: 'What is Underflow and when does it occur?' Memorize this answer: 'Underflow is the error state that occurs when an attempt is made to delete/pop an element from an empty stack.' Always pair your answer with a small Python example showing len(stk) == 0."
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_stack_terminology.txt"
          title="Download Topic 2 Concise Revision Notes"
        />

        {/* 8. CBSE Board Examination Quality FAQ Set */}
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