import React from 'react';
import {
  FileSpreadsheet, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Save, Database, PlusCircle
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";
import pythonCode from "./topic2_files/pickle_dump_syntax_lab.py?raw";

export default function Topic2() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Binary Files · Topic 2
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Core Serialization Syntax
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              The 'pickle' Module: pickle.dump(object, file_handle) Syntax &amp; Mechanics
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the exact syntax and mechanics of <code>pickle.dump()</code>. Understand argument sequencing, binary write modes (<code>'wb'</code> vs <code>'ab'</code>), sequential record streaming, and standard CBSE practical entry loops.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture: dump anatomy */}
        <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
            <Save size={18} /> Anatomy of the pickle.dump() Signature
          </h3>
          <div className="p-4 bg-slate-900 rounded-xl font-mono text-sm text-slate-300 space-y-2 border border-slate-800">
            <p>
              <span className="text-purple-400 font-bold">pickle.dump</span>
              <span className="text-white">(</span>
              <span className="text-amber-300 font-bold">object</span>
              <span className="text-slate-400">, </span>
              <span className="text-sky-300 font-bold">file_handle</span>
              <span className="text-slate-400">, </span>
              <span className="text-slate-500">[protocol=None]</span>
              <span className="text-white">)</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 font-sans">
              <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                <span className="font-mono font-bold text-amber-300">1. object</span>
                <p className="text-slate-400 mt-1">The Python entity to serialize (dictionary, list, or primitive).</p>
              </div>
              <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                <span className="font-mono font-bold text-sky-300">2. file_handle</span>
                <p className="text-slate-400 mt-1">An open binary stream handle (opened with mode <code>'wb'</code> or <code>'ab'</code>).</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Deep Technical Breakdown: wb vs ab */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-amber-500/20 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
              <Database size={18} /> Mode 'wb' (Initial Database Creation)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Creates a brand new binary file. If <code>student.dat</code> already exists, its contents are instantly truncated to zero bytes. Used for fresh file creation.
            </p>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-amber-300">
              with open('student.dat', 'wb') as f:
            </div>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/20 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <PlusCircle size={18} /> Mode 'ab' (Appending New Records)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Positions the file pointer at the very end of the file. Preserves all existing records and appends new pickled objects at the bottom.
            </p>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-emerald-300">
              with open('student.dat', 'ab') as f:
            </div>
          </div>
        </div>

        {/* 4. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileSpreadsheet size={18} className="text-purple-400" /> pickle.dump Laboratory
            </h3>
            <span className="text-xs text-slate-400 font-mono">pickle_dump_syntax_lab.py</span>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="pickle_dump_syntax_lab.py"
            highlightLines={[21, 22, 33, 34]}
          />
        </div>

        {/* 5. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} /> Pitfalls
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Reversing the arguments: writing <code>pickle.dump(f, record)</code> raises a fatal error.</li>
              <li>• Opening in <code>'w'</code> instead of <code>'wb'</code>, triggering <code>TypeError: write() argument must be str, not bytes</code>.</li>
              <li>• Using <code>'wb'</code> when asked to add a new student to an existing file, inadvertently wiping previous records.</li>
            </ul>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Always structure individual records as dictionaries: <code>&#123;'roll': r, 'name': n, 'marks': m&#125;</code>.</li>
              <li>• Use <code>int(input())</code> and <code>float(input())</code> to preserve numerical types before serialization.</li>
              <li>• Wrap your input loop in a <code>while True: ... if choice != 'y': break</code> structure.</li>
            </ul>
          </div>
        </div>

        {/* 6. Examiner's Hint */}
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5 text-xs text-slate-300 space-y-1.5">
          <h4 className="font-bold text-sky-400 flex items-center gap-2">
            <HelpCircle size={16} /> CBSE Board Examination Standard (Program #4 in Practical Manual)
          </h4>
          <p>
            "Write a function <code>InsertRec()</code> to accept student records from the user and append them to <code>STUDENT.DAT</code> using <code>pickle.dump()</code>." Always open in <code>'ab'</code> mode so that prior student records are never erased!
          </p>
        </div>

        {/* 7. FAQ Template */}
        <FAQTemplate
          title="CBSE Class XII CS 083 · Topic 2 FAQs: pickle.dump() Syntax & Mechanics"
          questions={questions}
        />

        {/* 8. Printable Plain Text Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII CS 083 – Topic 2 Quick Revision Document"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Plain Text Note"
          downloadFileName="topic2_pickle_dump.txt"
        />

        {/* 9. Teacher's Note */}
        <Teacher
          note="Debangshu and Sachin: Pay special attention to argument order: object FIRST, file handle SECOND. In the practical examination, writing pickle.dump(f, rec) is the most frequent student slip-up! Remember: 'Dump the RECORD into the FILE'. — Sukanta Hui"
        />

      </div>
    </div>
  );
}
