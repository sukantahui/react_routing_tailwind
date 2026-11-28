import React from 'react';
import {
  Layers, ArrowDownUp, CheckCircle2, AlertTriangle,
  HelpCircle, ArrowRight, Zap, History, Undo2
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";
import pythonCode from "./topic1_files/stack_lifo_concept_lab.py?raw";

export default function Topic1() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Segment 3 · Topic 1
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                LIFO Principle
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              The Stack Data Structure: Definition, Real-World Analogies &amp; LIFO Principle
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore the elegance of Last-In-First-Out (LIFO). Understand why all insertions and removals are restricted to a single endpoint designated as <code className="text-purple-300 font-mono">TOP</code>, and see how Stacks power computer execution.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400 w-fit">
              <Layers size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">LIFO Protocol</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Last-In-First-Out. The most recently added element is the first one removed. You cannot access lower items without removing the top.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400 w-fit">
              <Undo2 size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Undo (Ctrl+Z)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Text editors and graphic tools maintain a history stack. When you hit Undo, the last action you performed is popped and reverted.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
              <History size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Call Stack</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When functions call other functions, CPU pushes return addresses and local variables onto the call stack, popping them on return.
            </p>
          </div>
        </div>

        {/* 3. Deep Dive Theory */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ArrowDownUp className="text-purple-400" size={22} />
            The Single Endpoint Contract: Why TOP Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-300">Push Operation (Insertion):</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                A new element is placed on top of the stack. The <code className="text-purple-300">TOP</code> pointer advances by +1 to reference this new item.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400 border border-slate-800">
                stack.append("Book C")  # Placed at TOP
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-amber-300">Pop Operation (Deletion):</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The item referenced by <code className="text-amber-300">TOP</code> is extracted and returned. The pointer retracts by -1 to the previous item.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-amber-400 border border-slate-800">
                item = stack.pop()      # Extracted from TOP
              </div>
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
            <span className="text-xs text-slate-400 font-mono">stack_lifo_concept_lab.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="stack_lifo_concept_lab.py"
            title="Demonstration of the LIFO Principle"
          />
        </div>

        {/* 5. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="When answering 1-mark theory questions: 'Define a Stack', write: 'A Stack is a linear data structure that follows the LIFO (Last In First Out) principle, where insertion and deletion happen only at one end called TOP.' Mentioning both LIFO and TOP guarantees full marks from any board evaluator!"
        />

        {/* 6. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_stack_lifo_concept.txt"
          title="Download Topic 1 Concise Revision Notes"
        />

        {/* 7. CBSE Board Examination Quality FAQ Set */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
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