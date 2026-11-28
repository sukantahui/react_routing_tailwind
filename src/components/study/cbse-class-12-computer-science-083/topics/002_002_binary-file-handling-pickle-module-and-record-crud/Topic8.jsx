import React from 'react';
import {
  Trash2, ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle,
  Layers, ArrowRight, UserMinus, Database, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";
import pythonCode from "./topic8_files/binary_delete_records_lab.py?raw";

export default function Topic8() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Binary Files · Topic 8
              </span>
              <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-semibold rounded-full">
                Core CRUD Deletion
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Deleting Records in Binary Files: Utilizing Temporary File &amp; os.remove() / os.rename()
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master non-destructive data filtering in Python. Learn how to purge obsolete student or employee records by transferring surviving records to a staging file and performing atomic file swaps.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture: Deletion Filter */}
        <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
            <UserMinus size={18} /> The Exclusion Copy Deletion Logic
          </h3>
          <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 space-y-2 border border-slate-800">
            <p className="text-purple-400 font-bold">while True:</p>
            <p className="pl-4">rec = pickle.load(fin)</p>
            <p className="pl-4 text-rose-400 font-bold">if rec['roll'] == target_roll:</p>
            <p className="pl-8 text-rose-300 font-bold">deleted = True <span className="text-slate-500"># OMIT / SKIP: Do NOT dump to temp!</span></p>
            <p className="pl-4 text-emerald-400 font-bold">else:</p>
            <p className="pl-8 text-emerald-300 font-bold">pickle.dump(rec, fout) <span className="text-slate-500"># Keep valid record in temp!</span></p>
          </div>
        </div>

        {/* 3. Deep Technical Breakdown: Complete Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
            <span className="font-bold text-sky-300">Phase 1: Filtered Stream</span>
            <p className="text-slate-400 leading-relaxed">
              Open source file in <code>'rb'</code> and staging file in <code>'wb'</code>. Stream records, skipping the target match.
            </p>
          </div>
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
            <span className="font-bold text-amber-300">Phase 2: Safe Closure</span>
            <p className="text-slate-400 leading-relaxed">
              Exit the <code>with</code> block to release OS locks, ensuring Windows permits renaming and deletion.
            </p>
          </div>
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
            <span className="font-bold text-emerald-300">Phase 3: Atomic Swap</span>
            <p className="text-slate-400 leading-relaxed">
              <code>os.remove('student.dat')</code> purges old database; <code>os.rename('temp.dat', 'student.dat')</code> promotes new clean database.
            </p>
          </div>
        </div>

        {/* 4. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Trash2 size={18} className="text-rose-400" /> Binary Deletion Laboratory
            </h3>
            <span className="text-xs text-slate-400 font-mono">binary_delete_records_lab.py</span>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="binary_delete_records_lab.py"
            highlightLines={[29, 30, 33, 38, 39]}
          />
        </div>

        {/* 5. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} /> Pitfalls
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Inverting condition: writing <code>if rec['roll'] == target: dump()</code> (deletes everyone except target!).</li>
              <li>• Leaving <code>temp.dat</code> dangling on disk when deletion is aborted.</li>
              <li>• Calling <code>os.remove()</code> before the file handles have closed.</li>
            </ul>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> Pro Tips
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Test with <code>if rec['roll'] != target: pickle.dump(rec, fout)</code> for concise logic.</li>
              <li>• Track with <code>deleted = False</code> to confirm deletion status.</li>
              <li>• Clean up <code>temp.dat</code> with <code>os.remove(temp)</code> if no records matched.</li>
            </ul>
          </div>
        </div>

        {/* 6. Examiner's Hint */}
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5 text-xs text-slate-300 space-y-1.5">
          <h4 className="font-bold text-sky-400 flex items-center gap-2">
            <HelpCircle size={16} /> CBSE Practical Exam Standard (Program #7 in Lab Manual)
          </h4>
          <p>
            "Write a Python program to delete a student record from a binary file given the roll number using a temporary file." This question is worth 8 marks in practical exams! Follow this exact 5-step template for full credit.
          </p>
        </div>

        {/* 7. FAQ Template */}
        <FAQTemplate
          title="CBSE Class XII CS 083 · Topic 8 FAQs: Deleting Binary Records"
          questions={questions}
        />

        {/* 8. Printable Plain Text Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII CS 083 – Topic 8 Quick Revision Document"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Plain Text Note"
          downloadFileName="topic8_binary_delete.txt"
        />

        {/* 9. Teacher's Note */}
        <Teacher
          note="To Swadeep and Tuhina: Look closely at the logic of deletion! We do NOT delete anything inside the loop. We simply copy everything we WANT TO KEEP into temp.dat. The record we want to delete is simply IGNORED. That is the safest way to delete records in secondary storage. — Sukanta Hui"
        />

      </div>
    </div>
  );
}
