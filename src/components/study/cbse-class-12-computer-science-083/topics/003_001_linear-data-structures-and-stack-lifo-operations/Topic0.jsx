import React from 'react';
import {
  Boxes, GitFork, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, ListTree, Database
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/ds_intro_lab.py?raw";

export default function Topic0() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Segment 3 · Topic 0
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                Foundational Architecture
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Introduction to Data Structures: Primitive vs Non-Primitive, Linear vs Non-Linear Structures
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Step into the architectural foundations of computer memory organization. Discover the taxonomy of data structures, understand sequential linear orders versus branching hierarchies, and master core operations for CBSE Class 12 CS.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-indigo-500/30 rounded-2xl p-6 space-y-3">
            <h3 className="text-base font-bold text-indigo-400 flex items-center gap-2">
              <Boxes size={20} /> Linear Data Structures (1D Sequential)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Elements form a continuous chain. Every element has a unique predecessor and successor (except first and last).
            </p>
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 border border-indigo-500/20 space-y-1">
              <p className="text-indigo-300 font-semibold">Examples in CS:</p>
              <p>• Python Lists / Arrays: <span className="text-emerald-400">[10, 20, 30, 40]</span></p>
              <p>• Stacks (LIFO): <span className="text-amber-400">Push/Pop at TOP</span></p>
              <p>• Queues (FIFO): <span className="text-sky-400">Enqueue at Rear, Dequeue at Front</span></p>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-6 space-y-3">
            <h3 className="text-base font-bold text-purple-400 flex items-center gap-2">
              <GitFork size={20} /> Non-Linear Data Structures (Multi-Level)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Elements connect across multiple hierarchical levels or interconnected networks rather than a single sequence.
            </p>
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 border border-purple-500/20 space-y-1">
              <p className="text-purple-300 font-semibold">Examples in CS:</p>
              <p>• Trees: <span className="text-sky-400">Parent-Child Root Branching</span></p>
              <p>• Graphs: <span className="text-rose-400">Vertices connected by Edges</span></p>
              <p>• File Systems: <span className="text-amber-400">C:UsersDocumentsFiles</span></p>
            </div>
          </div>
        </div>

        {/* 3. Deep Dive Theory: Core Operations */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-indigo-400" size={22} />
            The 6 Fundamental Operations on Data Structures
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <p className="font-bold text-emerald-400">1. Insertion</p>
              <p className="text-slate-400">Adding a new data element into the collection at an appropriate position.</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <p className="font-bold text-rose-400">2. Deletion</p>
              <p className="text-slate-400">Removing an existing element from the collection.</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <p className="font-bold text-sky-400">3. Traversal</p>
              <p className="text-slate-400">Accessing and processing each element of the structure exactly once.</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <p className="font-bold text-amber-400">4. Searching</p>
              <p className="text-slate-400">Locating the presence and position of a target key within the structure.</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <p className="font-bold text-purple-400">5. Sorting</p>
              <p className="text-slate-400">Arranging elements in an ordered sequence (ascending or descending).</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <p className="font-bold text-teal-400">6. Merging</p>
              <p className="text-slate-400">Combining elements of two pre-sorted structures into a single sorted structure.</p>
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
            <span className="text-xs text-slate-400 font-mono">ds_intro_lab.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="ds_intro_lab.py"
            title="Classification of Data Structures & List Mechanics"
          />
        </div>

        {/* 5. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In Section A of your Class 12 board exam, a frequent 1-mark multiple choice question asks to identify whether a Stack or Queue is linear or non-linear. Always remember: Stacks, Queues, and Lists are LINEAR! Trees and Graphs are NON-LINEAR. Keep this distinction clear!"
        />

        {/* 6. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_ds_intro_revision.txt"
          title="Download Topic 0 Concise Revision Notes"
        />

        {/* 7. CBSE Board Examination Quality FAQ Set */}
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