import React from 'react';
import {
  Menu, Play, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, Terminal, RefreshCw
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";
import pythonCode from "./topic8_files/stack_menu_driven_system_lab.py?raw";

export default function Topic8() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Segment 3 · Topic 8
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Interactive System Architecture
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Menu-Driven Stack Implementation for Numeric and String Elements
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Synthesize all core stack operations into a unified, interactive console application. Master the continuous <code className="text-indigo-300 font-mono">while True</code> event loop, defensive menu selection, and modular function dispatching.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
              <Play size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">1. Push Option</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Takes user value and appends to the top of the stack.</p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-rose-500/10 rounded-xl text-rose-400 w-fit">
              <RefreshCw size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">2. Pop Option</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Guards underflow, pops top item, and displays removed value.</p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400 w-fit">
              <Terminal size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">3. Peek Option</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Reads top element without modifying stack depth.</p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 w-fit">
              <Menu size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">4. Display Option</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Traverses and prints elements from TOP down to bottom.</p>
          </div>
        </div>

        {/* 3. Deep Dive Theory */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-indigo-400" size={22} />
            Complete Menu Event Loop Architecture
          </h2>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 space-y-2">
            <p className="text-slate-400 font-semibold">stack = []  # Initialized OUTSIDE the loop!</p>
            <p><span className="text-purple-400">while</span> <span className="text-emerald-400">True</span>:</p>
            <p className="pl-4">print(<span className="text-indigo-300">"1.Push  2.Pop  3.Peek  4.Display  5.Exit"</span>)</p>
            <p className="pl-4">choice = input(<span className="text-indigo-300">"Choice (1-5): "</span>).strip()</p>
            <p className="pl-4"><span className="text-purple-400">if</span> choice == <span className="text-emerald-300">'1'</span>: Push(stack, input(<span className="text-indigo-300">"Enter: "</span>))</p>
            <p className="pl-4"><span className="text-purple-400">elif</span> choice == <span className="text-emerald-300">'2'</span>: Pop(stack)</p>
            <p className="pl-4"><span className="text-purple-400">elif</span> choice == <span className="text-emerald-300">'3'</span>: print(Peek(stack))</p>
            <p className="pl-4"><span className="text-purple-400">elif</span> choice == <span className="text-emerald-300">'4'</span>: Display(stack)</p>
            <p className="pl-4"><span className="text-purple-400">elif</span> choice == <span className="text-emerald-300">'5'</span>: <span className="text-purple-400">break</span>  <span className="text-slate-500"># Exits cleanly</span></p>
          </div>
        </div>

        {/* 4. Code Lab Example */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="text-amber-400" size={20} />
              Practical Lab Demonstration
            </h2>
            <span className="text-xs text-slate-400 font-mono">stack_menu_driven_system_lab.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="stack_menu_driven_system_lab.py"
            title="Complete Menu-Driven Stack Application"
          />
        </div>

        {/* 5. Common Pitfalls & Traps */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
            <AlertTriangle size={22} />
            Common Pitfall: Initializing Stack Inside the Loop
          </h2>
          <div className="p-4 bg-slate-900/80 rounded-xl border border-amber-500/20 text-xs sm:text-sm text-slate-300 space-y-2">
            <p className="font-bold text-red-400">Never place stack = [] inside while True:</p>
            <p className="text-slate-400 leading-relaxed font-mono">
              If <code className="text-red-400">stack = []</code> is placed inside the while loop, your stack will be wiped clean back to zero elements on every single iteration! Always declare <code className="text-emerald-300">stack = []</code> BEFORE entering the while loop!
            </p>
          </div>
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="For your Class 12 board practical examination, writing a clean menu-driven stack program with proper function headers (Push, Pop, Peek, Display) is an examiner favorite. Always format your output cleanly and handle empty inputs gracefully!"
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_stack_menu_driven.txt"
          title="Download Topic 8 Concise Revision Notes"
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