import React from 'react';
import {
  ShieldCheck, Lock, Unlock, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, FileCheck, Check, X
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";
import pythonCode from "./topic7_files/with_statement_context_manager_lab.py?raw";

export default function Topic7() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · File Handling · Topic 7
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Best Practice Standard
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Safe Resource Management: Using the 'with' Statement for Automatic File Closure
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore Python's Context Manager Protocol (<code>__enter__</code> and <code>__exit__</code>). Learn why the <code>with</code> statement is the industry and CBSE board benchmark for guaranteed file closure and leak prevention.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture: Manual vs With */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-red-500/20 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-red-400 flex items-center gap-2">
              <Unlock size={18} /> Legacy Manual Pattern (Risky)
            </h3>
            <div className="p-3 bg-slate-900 rounded font-mono text-xs text-slate-300 space-y-1">
              <p>f = open("data.txt", "r")</p>
              <p>data = f.read()</p>
              <p className="text-red-400"># IF AN EXCEPTION CRASHES HERE...</p>
              <p className="text-red-400"># f.close() IS NEVER REACHED!</p>
              <p>f.close()</p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Failing to reach <code>f.close()</code> leaves OS file descriptors locked in memory, risking <code>OSError: Too many open files</code>.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/20 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <Lock size={18} /> Pythonic 'with' Pattern (Guaranteed)
            </h3>
            <div className="p-3 bg-slate-900 rounded font-mono text-xs text-slate-300 space-y-1">
              <p className="text-emerald-400 font-bold">with open("data.txt", "r") as f:</p>
              <p className="pl-4">data = f.read()</p>
              <p className="pl-4 text-emerald-300"># Even if crash occurs here,</p>
              <p className="pl-4 text-emerald-300"># Python GUARANTEES f.close()!</p>
              <p>print(f.closed) # True</p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The Context Manager guarantees closure on normal exits, loop breaks, function returns, or unhandled exceptions.
            </p>
          </div>
        </div>

        {/* 3. Deep Technical Breakdown: Context Manager Protocol */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
            <Layers size={18} /> Anatomy of the Context Manager Protocol (PEP 343)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="font-mono font-bold text-sky-300">1. __enter__(self) Execution</span>
              <p className="text-slate-400 leading-relaxed">
                Invoked the instant the <code>with</code> statement is entered. Calls OS kernel to acquire file descriptor, binds memory buffer, and returns file object to the <code>as</code> alias.
              </p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="font-mono font-bold text-emerald-300">2. __exit__(self, exc_type, exc_val, tb)</span>
              <p className="text-slate-400 leading-relaxed">
                Invoked as soon as control leaves the block. Flushes pending dirty write buffers to physical disk, closes the file handle, and frees kernel table entries.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCheck size={18} className="text-sky-400" /> Context Manager Laboratory
            </h3>
            <span className="text-xs text-slate-400 font-mono">with_statement_context_manager_lab.py</span>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="with_statement_context_manager_lab.py"
            highlightLines={[15, 20, 27, 43]}
          />
        </div>

        {/* 5. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} /> Pitfalls
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Trying to call <code>f.write()</code> or <code>f.read()</code> outside the indented <code>with</code> block.</li>
              <li>• Writing <code>f.close()</code> inside the <code>with</code> block (redundant code).</li>
              <li>• Forgetting the colon (<code>:</code>) after the <code>with</code> header.</li>
            </ul>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Use <code>with open(...) as f:</code> as your default template for all CBSE file programming questions.</li>
              <li>• Open multiple files cleanly with commas: <code>with open('in') as f1, open('out', 'w') as f2:</code>.</li>
              <li>• Keep the code inside the <code>with</code> block as concise as possible to release locks promptly.</li>
            </ul>
          </div>
        </div>

        {/* 6. Examiner's Hint */}
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5 text-xs text-slate-300 space-y-1.5">
          <h4 className="font-bold text-sky-400 flex items-center gap-2">
            <HelpCircle size={16} /> CBSE Board Examination Strategy
          </h4>
          <p>
            Whenever a question paper asks you to write a function (e.g. <code>COUNT_LINES()</code>, <code>FILTER_WORDS()</code>), always write your solution with the <code>with</code> statement! Board evaluators award full marks immediately because it demonstrates mastery of Python context managers and eliminates any possibility of unclosed file penalties.
          </p>
        </div>

        {/* 7. FAQ Template */}
        <FAQTemplate
          title="CBSE Class XII CS 083 · Topic 7 FAQs: The 'with' Statement"
          questions={questions}
        />

        {/* 8. Printable Plain Text Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII CS 083 – Topic 7 Quick Revision Document"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Plain Text Note"
          downloadFileName="topic7_with_statement.txt"
        />

        {/* 9. Teacher's Note */}
        <Teacher
          note="To all my Class 12 students at Coder & AccoTax: make the 'with' statement your second nature! In board exams, examiners love seeing 'with open(...) as f:'. It proves you understand modern Python resource management. — Sukanta Hui"
        />

      </div>
    </div>
  );
}
