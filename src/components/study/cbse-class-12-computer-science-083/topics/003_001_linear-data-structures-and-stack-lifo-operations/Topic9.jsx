import React from 'react';
import {
  Table2, Layers, CheckCircle2, AlertTriangle,
  HelpCircle, ArrowRight, Zap, Database, UserCheck
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";
import pythonCode from "./topic9_files/stack_record_based_lab.py?raw";

export default function Topic9() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Segment 3 · Topic 9
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Composite Record Mechanics
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Record-Based Stack (Storing Lists of <code className="text-purple-300 font-mono">[ItemNo, ItemName, Price]</code> or <code className="text-purple-300 font-mono">[RollNo, Name, Marks]</code>)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Step into real-world data structures. Master multi-attribute composite records, multi-dimensional indexing <code className="text-purple-300 font-mono">stk[-1][1]</code>, tuple unpacking, and professional tabular formatting for CBSE Class 12 exams.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400 w-fit">
              <Table2 size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Composite Elements</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Each stack element is a sub-list: <code className="text-purple-300">[101, 'Aarav', 95.5]</code>. Pushed and popped as a single cohesive unit.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400 w-fit">
              <Layers size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">2D Indexing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              <code className="text-sky-300">stk[-1][0]</code> is Roll No, <code className="text-sky-300">stk[-1][1]</code> is Name, and <code className="text-sky-300">stk[-1][2]</code> is Marks of the top student.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
              <UserCheck size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Unpacking on Pop</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unpack fields directly: <code className="text-emerald-300">rno, name, score = stk.pop()</code> for clean processing.
            </p>
          </div>
        </div>

        {/* 3. Deep Dive Theory */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-purple-400" size={22} />
            Structure of a Record Stack in Memory
          </h2>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 space-y-2">
            <p className="text-sky-400 font-semibold">// Composite List Representation in Python Memory:</p>
            <p>stack = [</p>
            <p className="pl-4">[101, "Aarav Sharma", 95.5],  <span className="text-slate-500">// Bottom of Stack (index 0)</span></p>
            <p className="pl-4">[102, "Pooja Roy", 88.0],</p>
            <p className="pl-4">[103, "Tanmay Sen", 92.0]     <span className="text-emerald-400">// TOP of Stack (index -1)</span></p>
            <p>]</p>
            <p className="text-purple-400 font-semibold pt-2">// Accessing Top Student's Name:</p>
            <p>top_name = stack[-1][1]  -&gt; <span className="text-emerald-300">"Tanmay Sen"</span></p>
          </div>
        </div>

        {/* 4. Code Lab Example */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="text-amber-400" size={20} />
              Practical Lab Demonstration
            </h2>
            <span className="text-xs text-slate-400 font-mono">stack_record_based_lab.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="stack_record_based_lab.py"
            title="Record-Based Stack Implementation & Tabular Formatting"
          />
        </div>

        {/* 5. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In CBSE board questions like 'Write a function Push(stk) to take ItemNo and Price and push as a list', students sometimes mistakenly write stk.append(item, price). Remember: append() takes only ONE argument! You must wrap them in a list: stk.append([item, price])."
        />

        {/* 6. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_stack_record_based.txt"
          title="Download Topic 9 Concise Revision Notes"
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