import React from 'react';
import {
  ArrowUpCircle, Plus, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, Code2, ShieldAlert
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";
import pythonCode from "./topic4_files/stack_push_implementation_lab.py?raw";

export default function Topic4() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Segment 3 · Topic 4
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                Stack Insertion Mechanics
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Implementing Push Operation: Appending Elements to a Python List
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the foundational insertion operation of Stacks. Learn why <code className="text-emerald-300 font-mono">stk.append()</code> provides optimal O(1) performance, how mutable lists pass by reference, and standard CBSE question patterns.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
              <ArrowUpCircle size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">stk.append(val)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Appends to the end of the list (index <code className="text-emerald-300">-1</code>), which acts as the designated <code className="text-emerald-300">TOP</code> of our stack.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400 w-fit">
              <Zap size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">O(1) Constant Time</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Appending at the tail avoids shifting elements in memory. Runs instantly regardless of how many elements are already in the stack.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400 w-fit">
              <Code2 size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Pass by Reference</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Python lists are mutable objects. Any <code className="text-purple-300">stk.append()</code> call directly updates the caller's list in memory.
            </p>
          </div>
        </div>

        {/* 3. Deep Dive Theory */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-emerald-400" size={22} />
            Standard CBSE Push Implementation Patterns
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-sky-400">Pattern A: Value passed as Argument</h4>
              <pre className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-emerald-300 overflow-x-auto">
{`def Push(stk, item):
    stk.append(item)
    print(f"Pushed {item} to stack.")`}
              </pre>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-emerald-400">Pattern B: Input taken inside Function</h4>
              <pre className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-emerald-300 overflow-x-auto">
{`def Push(stk):
    val = int(input("Enter number: "))
    stk.append(val)`}
              </pre>
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
            <span className="text-xs text-slate-400 font-mono">stack_push_implementation_lab.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="stack_push_implementation_lab.py"
            title="Push Operation Mechanics & Demonstration"
          />
        </div>

        {/* 5. Common Pitfalls & Traps */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
            <AlertTriangle size={22} />
            Fatal Mistake: Overwriting Stack with None
          </h2>
          <div className="p-4 bg-slate-900/80 rounded-xl border border-amber-500/20 text-xs sm:text-sm text-slate-300 space-y-2">
            <p className="font-bold text-red-400">Never write: stk = stk.append(x)</p>
            <p className="text-slate-400 leading-relaxed font-mono">
              In Python, the <code className="text-emerald-300">append()</code> method mutates the list in-place and returns <strong className="text-red-400">None</strong>! Writing <code className="text-red-400">stk = stk.append(x)</code> assigns <code className="text-red-400">None</code> to your stack, destroying the entire data structure!
            </p>
            <p className="text-emerald-400 font-semibold pt-1">
              Correct Syntax: Simply write <code className="text-emerald-300">stk.append(x)</code> on its own line!
            </p>
          </div>
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In CBSE board exams, questions usually ask you to filter elements before pushing—such as 'push all numbers divisible by 5' or 'push all employee records whose salary exceeds 50000'. The template is always: test the condition first with 'if', and if True, call 'stk.append(item)'. Mastering this simple pattern guarantees full marks in Section C!"
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_stack_push_method.txt"
          title="Download Topic 4 Concise Revision Notes"
        />

        {/* 8. CBSE Board Examination Quality FAQ Set */}
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