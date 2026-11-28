import React from 'react';
import {
  Code, Terminal, CheckCircle2, AlertTriangle, HelpCircle,
  Package, ArrowRight, ShieldCheck, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";
import pythonCode from "./topic8_files/tuple_packing_unpacking_lab.py?raw";

export default function Topic8() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Topic 8
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Immutable Sequences
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Tuple Immutability, Tuple Packing &amp; Unpacking, and Operations
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore immutable ordered collections. Learn the mandatory singleton comma rule, tuple packing and positional/extended unpacking mechanics, and why tuples with mutable items require careful handling.
            </p>
          </div>
        </div>

        {/* 2. Key Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-300 flex items-center gap-2">
              <Package size={18} className="text-sky-400" /> Singleton Tuple Rule
            </h3>
            <p className="text-xs text-slate-400">Parentheses alone do NOT make a tuple—commas do!</p>
            <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono space-y-1">
              <p><span className="text-rose-400">t = (100)</span>  → <span className="text-slate-400">type &lt;class 'int'&gt;</span></p>
              <p><span className="text-emerald-400">t = (100,)</span> → <span className="text-slate-400">type &lt;class 'tuple'&gt;</span></p>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-400" /> Packing &amp; Unpacking
            </h3>
            <p className="text-xs text-slate-400">Positional binding and starred extended unpacking.</p>
            <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono space-y-1">
              <p><span className="text-emerald-300">p = 10, 20, 30</span> (Packed)</p>
              <p><span className="text-sky-300">a, b, c = p</span> (Unpacked)</p>
              <p><span className="text-amber-300">head, *tail = p</span> (tail is [20, 30])</p>
            </div>
          </div>
        </div>

        {/* 3. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Executable Laboratory Script: Tuple Mechanics</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="tuple_packing_unpacking_lab.py"
            highlightLines={[8, 9, 13, 17, 22, 28]}
          />
        </div>

        {/* 4. 25-Question FAQ Assessment */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <FAQTemplate
            title="CBSE Class XII CS (083) – 25 Diagnostic Questions: Tuples"
            questions={questions}
          />
        </div>

        {/* 5. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="Remember: tuples only have TWO methods: count() and index()! If a board exam question asks: 'Which method adds an element to a tuple?', the answer is: NO SUCH METHOD EXISTS because tuples are immutable! — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Quick Revision Document (Topic 8)"
            filename="topic8_tuples_immutability_notes.txt"
          />
        </div>

      </div>
    </div>
  );
}
