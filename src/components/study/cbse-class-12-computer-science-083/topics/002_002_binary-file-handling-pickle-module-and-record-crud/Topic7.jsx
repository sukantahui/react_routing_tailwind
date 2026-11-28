import React from 'react';
import {
  RefreshCw, ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle,
  Layers, ArrowRight, FileEdit, Database, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";
import pythonCode from "./topic7_files/binary_update_records_lab.py?raw";

export default function Topic7() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Binary Files · Topic 7
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Core CRUD Mutation
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Updating Records in Binary Files: In-place Rewriting vs Temporary File Mechanism
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the art of modifying binary records safely. Understand why variable byte lengths make in-place overwriting perilous, and implement the bulletproof Temporary File Staging pattern using <code>os.remove()</code> and <code>os.rename()</code>.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture: 3-Step Lifecycle */}
        <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
            <RefreshCw size={18} /> The 3-Step Staging Update Lifecycle
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="font-bold text-sky-300">1. Stream &amp; Mutate</span>
              <p className="text-slate-400 leading-relaxed">
                Open <code>student.dat</code> in <code>'rb'</code> and <code>temp.dat</code> in <code>'wb'</code>. Read records sequentially, update the target record, and write all records into <code>temp.dat</code>.
              </p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="font-bold text-amber-300">2. Close &amp; Unlock</span>
              <p className="text-slate-400 leading-relaxed">
                Exit the <code>with</code> block. Both file handles are formally closed, releasing OS kernel locks so Windows permits file renaming.
              </p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="font-bold text-emerald-300">3. Remove &amp; Promote</span>
              <p className="text-slate-400 leading-relaxed">
                Execute <code>os.remove('student.dat')</code> to delete the outdated file, then call <code>os.rename('temp.dat', 'student.dat')</code> to promote the updated database.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Deep Technical Breakdown: In-Place vs Temp File */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={18} /> In-Place 'rb+' Overwrite (High Risk)
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li>• Requires saving <code>pos = f.tell()</code> before every load.</li>
              <li>• If new record has more bytes, it <strong className="text-red-400">overwrites the next record</strong>!</li>
              <li>• If new record has fewer bytes, trailing garbage bytes remain.</li>
            </ul>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <ShieldCheck size={18} /> Temporary File Staging (100% Safe)
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li>• Serializes records cleanly into a fresh stream.</li>
              <li>• Completely immune to byte length variations.</li>
              <li>• If a power cut occurs during processing, original database remains safe.</li>
            </ul>
          </div>
        </div>

        {/* 4. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileEdit size={18} className="text-purple-400" /> Binary Update Laboratory
            </h3>
            <span className="text-xs text-slate-400 font-mono">binary_update_records_lab.py</span>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="binary_update_records_lab.py"
            highlightLines={[29, 31, 35, 41, 42]}
          />
        </div>

        {/* 5. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} /> Pitfalls
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Calling <code>os.remove()</code> inside the <code>with</code> block (causes <code>PermissionError</code> on Windows).</li>
              <li>• Forgetting to dump the unmodified records into <code>temp.dat</code>, accidentally deleting all other students!</li>
              <li>• Not removing <code>temp.dat</code> if the student was not found.</li>
            </ul>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> Pro Tips
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Remember the golden rule: dump <strong>every record</strong> to <code>temp.dat</code>, modifying only the target.</li>
              <li>• Always perform file operations (<code>remove</code>, <code>rename</code>) outside the <code>with</code> block.</li>
              <li>• Use <code>os.replace(temp, orig)</code> if you want a one-step atomic rename.</li>
            </ul>
          </div>
        </div>

        {/* 6. Examiner's Hint */}
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5 text-xs text-slate-300 space-y-1.5">
          <h4 className="font-bold text-sky-400 flex items-center gap-2">
            <HelpCircle size={16} /> CBSE Practical Exam Standard (Program #6 in Lab Manual)
          </h4>
          <p>
            "Write a function to update the marks of a student given the roll number in a binary file <code>STUDENT.DAT</code>." Evaluators look for: 1) opening temp file, 2) copying and modifying, 3) <code>os.remove()</code>, and 4) <code>os.rename()</code>.
          </p>
        </div>

        {/* 7. FAQ Template */}
        <FAQTemplate
          title="CBSE Class XII CS 083 · Topic 7 FAQs: Updating Binary Records"
          questions={questions}
        />

        {/* 8. Printable Plain Text Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII CS 083 – Topic 7 Quick Revision Document"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Plain Text Note"
          downloadFileName="topic7_binary_update.txt"
        />

        {/* 9. Teacher's Note */}
        <Teacher
          note="Susmita, Sachin, and Debangshu: Make sure you never forget to dump the UNMODIFIED records into temp.dat! If you only dump the updated record, all other students disappear from your database. Look at line 35 of the laboratory code: pickle.dump(rec, fout) executes for EVERY iteration! — Sukanta Hui"
        />

      </div>
    </div>
  );
}
