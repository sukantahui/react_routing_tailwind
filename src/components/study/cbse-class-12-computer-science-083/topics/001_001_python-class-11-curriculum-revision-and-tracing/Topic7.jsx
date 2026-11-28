import React from 'react';
import {
  Code, Terminal, CheckCircle2, AlertTriangle, HelpCircle,
  List, ArrowRight, ShieldCheck, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";
import pythonCode from "./topic7_files/list_operations_and_comprehensions_lab.py?raw";

export default function Topic7() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Topic 7
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Linear Collections
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              List Operations: Nested Lists, Comprehensions, Slicing &amp; Common Methods
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master dynamic mutable linear collections. Explore in-place modification methods, append() vs extend(), nested matrix traversal, slicing expansion, and expressive list comprehensions.
            </p>
          </div>
        </div>

        {/* 2. Key Method Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider">
              append() vs extend()
            </h3>
            <p className="text-xs text-slate-300">
              <code className="text-sky-300 font-bold">append(x)</code> adds x as single item.<br/>
              <code className="text-emerald-300 font-bold">extend(L)</code> unpacks all items!
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
              pop() vs remove()
            </h3>
            <p className="text-xs text-slate-300">
              <code className="text-amber-300 font-bold">pop(idx)</code> removes by index &amp; returns it.<br/>
              <code className="text-rose-300 font-bold">remove(val)</code> searches by value!
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
              Comprehensions
            </h3>
            <p className="text-xs text-slate-300 font-mono">
              [x**2 for x in L if x%2==0]<br/>
              Elegant, fast &amp; pythonic!
            </p>
          </div>
        </div>

        {/* 3. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Executable Laboratory Script: List Operations &amp; Comprehensions</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="list_operations_and_comprehensions_lab.py"
            highlightLines={[10, 11, 15, 20, 22, 28, 38]}
          />
        </div>

        {/* 4. 25-Question FAQ Assessment */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <FAQTemplate
            title="CBSE Class XII CS (083) – 25 Diagnostic Questions: List Operations"
            questions={questions}
          />
        </div>

        {/* 5. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="Beware of 'L = L.sort()'! Because list.sort() operates in-place, its return value is None. Writing 'L = L.sort()' will wipe out your list and set L to None, costing you full marks in board exams! — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Quick Revision Document (Topic 7)"
            filename="topic7_list_operations_notes.txt"
          />
        </div>

      </div>
    </div>
  );
}
