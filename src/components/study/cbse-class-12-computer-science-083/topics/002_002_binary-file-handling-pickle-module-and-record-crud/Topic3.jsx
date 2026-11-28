import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle,
  Layers, ArrowRight, Eye, RefreshCw, Terminal, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";
import pythonCode from "./topic3_files/pickle_load_eof_lab.py?raw";

export default function Topic3() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Binary Files · Topic 3
              </span>
              <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-semibold rounded-full">
                Guaranteed Board Question
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Reading Binary Records: pickle.load(file_handle) &amp; Handling EOFError
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master sequential deserialization in Python. Understand why <code>pickle.load()</code> raises <code>EOFError</code> upon completion, and implement the canonical <code>try ... while True ... except EOFError</code> traversal loop.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture: Canonical Pattern */}
        <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
            <Eye size={18} /> The Canonical CBSE Binary Read Blueprint (Section C Standard)
          </h3>
          <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 space-y-2 border border-slate-800">
            <p className="text-purple-400 font-bold">with open('student.dat', 'rb') as f:</p>
            <p className="pl-4 text-emerald-400 font-bold">try:</p>
            <p className="pl-8 text-sky-300 font-bold">while True:</p>
            <p className="pl-12">record = <span className="text-purple-300 font-bold">pickle.load(f)</span></p>
            <p className="pl-12 text-slate-400"># Process individual record dictionary</p>
            <p className="pl-12">print(record['roll'], record['name'], record['marks'])</p>
            <p className="pl-4 text-rose-400 font-bold">except EOFError:</p>
            <p className="pl-8 text-emerald-400 font-bold">pass <span className="text-slate-400"># Clean normal exit when all records read!</span></p>
          </div>
        </div>

        {/* 3. Deep Technical Breakdown: Text vs Binary EOF */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-sky-500/20 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
              <FileText size={18} /> Text File EOF Mechanics
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li>• <span className="font-semibold text-white">Signal:</span> Returns an empty string <code>''</code> (length 0).</li>
              <li>• <span className="font-semibold text-white">Exception:</span> Raises ZERO exceptions; loop condition tests <code>while line != '':</code>.</li>
              <li>• <span className="font-semibold text-white">Safety:</span> Trailing calls keep returning <code>''</code> safely.</li>
            </ul>
          </div>

          <div className="bg-slate-950/80 border border-purple-500/20 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-purple-400 flex items-center gap-2">
              <ShieldCheck size={18} /> Binary Pickle EOF Mechanics
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li>• <span className="font-semibold text-white">Signal:</span> Raises <code>EOFError: Ran out of input</code>.</li>
              <li>• <span className="font-semibold text-white">Why An Exception?</span> Because <code>None</code> or <code>''</code> can be valid pickled values!</li>
              <li>• <span className="font-semibold text-white">Requirement:</span> Must wrap in <code>try ... except EOFError:</code> to prevent crash.</li>
            </ul>
          </div>
        </div>

        {/* 4. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Terminal size={18} className="text-purple-400" /> Binary Reading Laboratory
            </h3>
            <span className="text-xs text-slate-400 font-mono">pickle_load_eof_lab.py</span>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="pickle_load_eof_lab.py"
            highlightLines={[25, 26, 27, 31, 41]}
          />
        </div>

        {/* 5. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} /> Pitfalls
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Putting <code>try/except</code> inside <code>while True:</code> without a <code>break</code> statement, causing an infinite loop!</li>
              <li>• Omitting <code>EOFError</code> handling entirely, which crashes the script and loses 1 mark in the board exam.</li>
              <li>• Attempting to iterate <code>for rec in f:</code> on binary files expecting pickled objects.</li>
            </ul>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Place the <code>try:</code> block directly before <code>while True:</code> for clean, standard loop termination.</li>
              <li>• Always open in mode <code>'rb'</code>.</li>
              <li>• If counting records, increment a counter inside the loop and output it after the <code>except EOFError:</code> block.</li>
            </ul>
          </div>
        </div>

        {/* 6. Examiner's Hint */}
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5 text-xs text-slate-300 space-y-1.5">
          <h4 className="font-bold text-sky-400 flex items-center gap-2">
            <HelpCircle size={16} /> CBSE Board Examination Golden Rule
          </h4>
          <p>
            In every CBSE question involving <code>pickle.load()</code>, examiners look for the <code>try ... except EOFError:</code> block. If it is missing, evaluators automatically deduct 1 mark! Always write this block whenever reading binary records.
          </p>
        </div>

        {/* 7. FAQ Template */}
        <FAQTemplate
          title="CBSE Class XII CS 083 · Topic 3 FAQs: pickle.load() & EOFError"
          questions={questions}
        />

        {/* 8. Printable Plain Text Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII CS 083 – Topic 3 Quick Revision Document"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Plain Text Note"
          downloadFileName="topic3_pickle_load_eof.txt"
        />

        {/* 9. Teacher's Note */}
        <Teacher
          note="Swadeep, Tuhina, and Abhronila: Remember the difference between text files and binary files at EOF. In text files, we check if line == ''. In binary files, we must write except EOFError:! This is the most frequently tested concept in CBSE Class 12 file handling. — Sukanta Hui"
        />

      </div>
    </div>
  );
}
