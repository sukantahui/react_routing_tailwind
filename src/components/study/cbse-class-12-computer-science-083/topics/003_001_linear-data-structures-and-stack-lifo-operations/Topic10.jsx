import React from 'react';
import {
  FileCode2, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, Target, Award
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";
import pythonCode from "./topic10_files/cbse_board_stack_patterns_lab.py?raw";

export default function Topic10() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Segment 3 · Topic 10
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Board Exam Mastery
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              CBSE Board Standard Stack Question Patterns (Conditional Push &amp; Filtering)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Crack the exact 3-mark and 4-mark questions appearing in CBSE Class 12 board examination papers. Master conditional pushes from dictionaries, numerical divisibility filtering, string vowel parsing, and full stack drain algorithms.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 w-fit">
              <Target size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Pattern 1: Dictionary Filter</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Iterate <code className="text-amber-300">d.items()</code>. Filter by threshold (e.g. <code className="text-amber-300">marks &gt; 75</code>) and push matching keys.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400 w-fit">
              <Zap size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Pattern 2: Numerical Filter</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Iterate list. Check divisibility using modulo <code className="text-sky-300">n % 5 == 0</code> or even/odd parity before pushing.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
              <Award size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Pattern 3: Pop All (Drain)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Draining the stack in LIFO order with <code className="text-emerald-300">while len(stk) &gt; 0: print(stk.pop())</code> until empty.
            </p>
          </div>
        </div>

        {/* 3. Deep Dive Theory: Board Blueprints */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-amber-400" size={22} />
            CBSE Official Sample Paper Blueprint
          </h2>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 space-y-2">
            <p className="text-amber-400 font-semibold"># Archetype: Push from Dictionary &amp; Pop with Underflow</p>
            <p><span className="text-purple-400">def</span> <span className="text-sky-300">Push_Elements</span>(DictData, Stk):</p>
            <p className="pl-4"><span className="text-purple-400">for</span> key, val <span className="text-purple-400">in</span> DictData.items():</p>
            <p className="pl-8"><span className="text-purple-400">if</span> val &gt;= <span className="text-amber-300">80</span>:</p>
            <p className="pl-12">Stk.append(key)  <span className="text-slate-500"># 2 Marks allotted</span></p>
            <br />
            <p><span className="text-purple-400">def</span> <span className="text-rose-300">Pop_Elements</span>(Stk):</p>
            <p className="pl-4"><span className="text-purple-400">if</span> len(Stk) == <span className="text-amber-300">0</span>:</p>
            <p className="pl-8">print(<span className="text-rose-300">"Underflow: Stack is empty"</span>)  <span className="text-slate-500"># 1 Mark</span></p>
            <p className="pl-8"><span className="text-purple-400">return</span> <span className="text-purple-400">None</span></p>
            <p className="pl-4"><span className="text-purple-400">else</span>:</p>
            <p className="pl-8"><span className="text-purple-400">return</span> Stk.pop()  <span className="text-slate-500"># 1 Mark</span></p>
          </div>
        </div>

        {/* 4. Code Lab Example */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="text-amber-400" size={20} />
              Practical Lab Demonstration
            </h2>
            <span className="text-xs text-slate-400 font-mono">cbse_board_stack_patterns_lab.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="cbse_board_stack_patterns_lab.py"
            title="CBSE Board Standard Stack Question Patterns"
          />
        </div>

        {/* 5. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In your CBSE board paper, the Stack question in Section C (often Q30 or Q31) has an internal choice. One option asks you to push from a dictionary, while the other asks to push from a list of tuples. Both are very straightforward if you use .items() or tuple indexing. This question is a guaranteed 3 or 4 marks if you remember the Underflow check!"
        />

        {/* 6. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_stack_board_patterns.txt"
          title="Download Topic 10 Concise Revision Notes"
        />

        {/* 7. CBSE Board Examination Quality FAQ Set */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
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