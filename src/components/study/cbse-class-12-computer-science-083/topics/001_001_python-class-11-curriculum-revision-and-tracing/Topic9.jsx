import React from 'react';
import {
  Code, Terminal, CheckCircle2, AlertTriangle, HelpCircle,
  FolderTree, ArrowRight, ShieldCheck, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";
import pythonCode from "./topic9_files/dictionary_mappings_and_methods_lab.py?raw";

export default function Topic9() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Topic 9
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Mapping Types
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Dictionary Key-Value Mappings: Accessing, Updating, Traversing &amp; Built-in Methods
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master associative hash-table data structures. Learn immutable key restrictions, KeyError prevention with get(), traversing keys/values/items views, and frequency counter algorithms.
            </p>
          </div>
        </div>

        {/* 2. Key Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-300 flex items-center gap-2">
              <FolderTree size={18} className="text-sky-400" /> Key Restrictions
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li><strong className="text-white">Must be Hashable:</strong> Strings, Numbers, and Tuples (immutable items only).</li>
              <li><strong className="text-rose-400">Illegal Keys:</strong> Lists, Dictionaries, and Sets (<code className="text-rose-400">TypeError: unhashable type</code>).</li>
              <li><strong className="text-white">Uniqueness:</strong> Duplicate keys overwrite previous values.</li>
            </ul>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-400" /> Essential Methods
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li><code className="text-emerald-400 font-bold">d.get(k, default)</code>: Safe lookup, avoids KeyError crash.</li>
              <li><code className="text-sky-400 font-bold">d.pop(k)</code>: Removes key and returns its value.</li>
              <li><code className="text-amber-400 font-bold">d.popitem()</code>: Removes &amp; returns last inserted (k, v) pair in LIFO order.</li>
              <li><code className="text-purple-400 font-bold">d.update(other)</code>: In-place dictionary merge.</li>
            </ul>
          </div>
        </div>

        {/* 3. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Executable Laboratory Script: Dictionary Methods &amp; Frequency Counter</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="dictionary_mappings_and_methods_lab.py"
            highlightLines={[14, 18, 24, 30, 31, 35, 37]}
          />
        </div>

        {/* 4. 25-Question FAQ Assessment */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <FAQTemplate
            title="CBSE Class XII CS (083) – 25 Diagnostic Questions: Dictionaries"
            questions={questions}
          />
        </div>

        {/* 5. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="Frequency counter questions appear in almost every CBSE Class 12 board exam! Master the one-liner: freq[x] = freq.get(x, 0) + 1. It is clean, avoids KeyError, and earns full credit from examiners! — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Quick Revision Document (Topic 9)"
            filename="topic9_dictionaries_notes.txt"
          />
        </div>

      </div>
    </div>
  );
}
