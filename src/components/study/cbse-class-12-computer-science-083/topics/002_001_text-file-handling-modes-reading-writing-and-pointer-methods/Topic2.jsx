import React from 'react';
import {
  FolderOpen, ShieldAlert, CheckCircle2, AlertTriangle, HelpCircle,
  Layers, Lock, Unlock, FileCheck, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";
import pythonCode from "./topic2_files/open_close_mechanics_lab.py?raw";

export default function Topic2() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · File Handling · Topic 2
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Resource Lifecycle
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Opening and Closing Files: open() Function, File Handles &amp; close() Method
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the exact mechanics of file binding in Python. Inspect stream attributes (<code>f.name</code>, <code>f.mode</code>, <code>f.closed</code>), explore buffer synchronization, and understand OS file descriptor management.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture & Attributes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
              <Unlock size={20} />
            </div>
            <h3 className="text-base font-bold text-white">1. open() Invocation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Allocates an OS file descriptor, binds an I/O buffer in memory, and returns a Python file object reference.
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-[11px] text-sky-300">
              f = open('data.txt', 'r')
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <FileCheck size={20} />
            </div>
            <h3 className="text-base font-bold text-white">2. Stream Inspection</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Built-in attributes query properties: <code>f.name</code>, <code>f.mode</code>, and boolean <code>f.closed</code>.
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-[11px] text-amber-300">
              print(f.closed) # False
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Lock size={20} />
            </div>
            <h3 className="text-base font-bold text-white">3. close() Cleanup</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Flushes uncommitted buffer writes to disk, deallocates kernel handles, and locks further stream operations.
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-[11px] text-emerald-300">
              f.close() # f.closed == True
            </div>
          </div>
        </div>

        {/* 3. Stream Attributes Reference Table */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
            <Layers size={18} /> Standard File Object Attributes (CBSE 1-Mark MCQ Favorite)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
              <span className="font-mono font-bold text-sky-300">f.name</span>
              <p className="text-slate-400">Returns the string representing file name or path specified when opening.</p>
              <span className="text-[10px] text-slate-500 font-mono">Output: 'scores.txt'</span>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
              <span className="font-mono font-bold text-sky-300">f.mode</span>
              <p className="text-slate-400">Returns the exact mode string used to instantiate the file stream.</p>
              <span className="text-[10px] text-slate-500 font-mono">Output: 'w' or 'r+'</span>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
              <span className="font-mono font-bold text-emerald-300">f.closed</span>
              <p className="text-slate-400">Returns boolean <code>True</code> if file has been closed, <code>False</code> otherwise.</p>
              <span className="text-[10px] text-slate-500 font-mono">Output: True / False</span>
            </div>
          </div>
        </div>

        {/* 4. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FolderOpen size={18} className="text-sky-400" /> File Lifecycle Laboratory
            </h3>
            <span className="text-xs text-slate-400 font-mono">open_close_mechanics_lab.py</span>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="open_close_mechanics_lab.py"
            highlightLines={[14, 18, 30, 36]}
          />
        </div>

        {/* 5. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} /> Common Pitfalls
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Forgetting <code>f.close()</code>, causing trailing writes to be lost during abrupt script termination.</li>
              <li>• Attempting to invoke <code>f.write()</code> after <code>f.close()</code> raises <code>ValueError: I/O operation on closed file</code>.</li>
              <li>• Writing <code>f.closed()</code> with parentheses: <code>closed</code> is an attribute, not a callable function!</li>
            </ul>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Always wrap manual file operations in a <code>try...finally: f.close()</code> block.</li>
              <li>• Check <code>f.closed</code> before performing conditional cleanup steps.</li>
              <li>• Explicitly call <code>f.flush()</code> if real-time disk persistence is required before closure.</li>
            </ul>
          </div>
        </div>

        {/* 6. Examiner's Hint */}
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5 text-xs text-slate-300 space-y-1.5">
          <h4 className="font-bold text-sky-400 flex items-center gap-2">
            <HelpCircle size={16} /> CBSE Board Examination Warning
          </h4>
          <p>
            CBSE frequently tests the distinction between an attribute and a method. Remember: <strong><code>f.name</code>, <code>f.mode</code>, and <code>f.closed</code> are ATTRIBUTES (no parentheses)</strong>, whereas <strong><code>f.close()</code>, <code>f.read()</code>, and <code>f.write()</code> are METHODS</strong>.
          </p>
        </div>

        {/* 7. FAQ Template */}
        <FAQTemplate
          title="CBSE Class XII CS 083 · Topic 2 FAQs: open(), Handles & close()"
          questions={questions}
        />

        {/* 8. Printable Plain Text Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII CS 083 – Topic 2 Quick Revision Document"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Plain Text Note"
          downloadFileName="topic2_open_close.txt"
        />

        {/* 9. Teacher's Note */}
        <Teacher
          note="Notice carefully: In the exam paper, if you see 'print(f.closed())', spot the error immediately! 'closed' has no parentheses. Also remember that f.close() releases OS resources so other programs can read your file. — Sukanta Hui"
        />

      </div>
    </div>
  );
}
