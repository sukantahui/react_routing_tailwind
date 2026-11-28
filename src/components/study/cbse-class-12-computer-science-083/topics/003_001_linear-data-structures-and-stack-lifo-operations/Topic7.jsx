import React from 'react';
import {
  ListFilter, Eye, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, ArrowDown
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";
import pythonCode from "./topic7_files/stack_display_traversal_lab.py?raw";

export default function Topic7() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Segment 3 · Topic 7
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                Stack Traversal
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Displaying Stack Contents: Traversing from TOP down to Bottom
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the non-destructive traversal of Stacks. Understand why iteration must proceed in reverse from index <code className="text-indigo-300 font-mono">len-1</code> down to <code className="text-indigo-300 font-mono">0</code>, how to label the active <code className="text-emerald-300 font-mono">TOP</code> pointer, and safeguard against destructive pops.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/80 border border-indigo-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 w-fit">
              <ArrowDown size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Reverse Order</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stacks must be presented from <code className="text-indigo-300">TOP</code> down to bottom. Start at index <code className="text-indigo-300">len-1</code> and step by <code className="text-indigo-300">-1</code>.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
              <CheckCircle2 size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Non-Destructive</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Never use <code className="text-rose-400">pop()</code> inside Display! Traversal is an inspection operation; the original stack must remain intact.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400 w-fit">
              <ListFilter size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">TOP Pointer Marker</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Annotating the first printed element with <code className="text-sky-300">&lt;-- TOP</code> demonstrates complete algorithmic maturity on board answer sheets.
            </p>
          </div>
        </div>

        {/* 3. Deep Dive Theory */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-indigo-400" size={22} />
            The Textbook CBSE Display Pattern
          </h2>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 space-y-2">
            <p><span className="text-purple-400">def</span> <span className="text-amber-300">Display</span>(stk):</p>
            <p className="pl-4 text-slate-400"># 1. Guard against empty stack</p>
            <p className="pl-4"><span className="text-purple-400">if</span> len(stk) == <span className="text-amber-300">0</span>:</p>
            <p className="pl-8">print(<span className="text-indigo-300">"Stack is empty / Underflow"</span>)</p>
            <p className="pl-8"><span className="text-purple-400">return</span></p>
            <p className="pl-4 text-slate-400"># 2. Print top element with pointer</p>
            <p className="pl-4">top = len(stk) - <span className="text-amber-300">1</span></p>
            <p className="pl-4">print(stk[top], <span className="text-emerald-300">"&lt;-- TOP"</span>)</p>
            <p className="pl-4 text-slate-400"># 3. Loop in reverse from top-1 down to 0</p>
            <p className="pl-4"><span className="text-purple-400">for</span> i <span className="text-purple-400">in</span> range(top - <span className="text-amber-300">1</span>, -<span className="text-amber-300">1</span>, -<span className="text-amber-300">1</span>):</p>
            <p className="pl-8">print(stk[i])</p>
          </div>
        </div>

        {/* 4. Code Lab Example */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="text-amber-400" size={20} />
              Practical Lab Demonstration
            </h2>
            <span className="text-xs text-slate-400 font-mono">stack_display_traversal_lab.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="stack_display_traversal_lab.py"
            title="Non-Destructive TOP-to-Bottom Traversal"
          />
        </div>

        {/* 5. Common Pitfalls & Traps */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
            <AlertTriangle size={22} />
            Destructive Display Bug
          </h2>
          <div className="p-4 bg-slate-900/80 rounded-xl border border-amber-500/20 text-xs sm:text-sm text-slate-300 space-y-2">
            <p className="font-bold text-red-400">Never write: while stk: print(stk.pop()) inside Display()!</p>
            <p className="text-slate-400 leading-relaxed font-mono">
              While <code className="text-rose-400">while stk: print(stk.pop())</code> prints elements in reverse order, it has a catastrophic side effect: it completely destroys and empties the stack! After calling Display, the user has lost all their data!
            </p>
            <p className="text-emerald-400 font-semibold pt-1">
              Display must always read without deleting, using index looping or <code className="text-emerald-300">reversed()</code>!
            </p>
          </div>
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="When writing the Display function on paper during the board exam, always check your loop bounds: range(top-1, -1, -1). If you write range(top-1, 0, -1), your loop will stop before index 0, missing the bottom-most element! Stopping before -1 ensures index 0 is included."
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_stack_display_method.txt"
          title="Download Topic 7 Concise Revision Notes"
        />

        {/* 8. CBSE Board Examination Quality FAQ Set */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
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