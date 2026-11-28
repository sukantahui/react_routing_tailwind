import React from 'react';
import {
  Replace, Filter, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, FileText, Check, X, RefreshCw
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";
import pythonCode from "./topic9_files/word_search_and_replacement_lab.py?raw";

export default function Topic9() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · File Handling · Topic 9
              </span>
              <span className="px-3 py-1 bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-semibold rounded-full">
                Core Practical Program
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Word Search and File Content Replacement Algorithms
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore stream rewriting mechanics in Python. Master the CBSE practical requirement of copying files with word exclusions (e.g. filtering lines with 'this' or 'that') and implementing atomic file replacements via staging files.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture: Two Core Patterns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-teal-500/20 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-teal-400 flex items-center gap-2">
              <Filter size={18} /> Pattern 1: Exclusion Line Filter (Practical Exam)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Read lines sequentially from source file. If a banned word (e.g. 'this', 'that') exists in the line, discard it. Otherwise, write line to target destination.
            </p>
            <div className="p-3 bg-slate-900 rounded font-mono text-xs text-teal-300 space-y-1">
              <p>if 'this' not in line and 'that' not in line:</p>
              <p className="pl-4">fout.write(line)</p>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-sky-500/20 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
              <Replace size={18} /> Pattern 2: Atomic In-Memory Replacement
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Read the entire text string into RAM, perform <code>str.replace(old, new)</code>, and rewrite to the target file in <code>'w'</code> mode.
            </p>
            <div className="p-3 bg-slate-900 rounded font-mono text-xs text-sky-300 space-y-1">
              <p>text = fin.read().replace('was', 'is')</p>
              <p>fout.write(text)</p>
            </div>
          </div>
        </div>

        {/* 3. Deep Technical Breakdown: Staging File Architecture */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
            <Layers size={18} /> The Staging File Pattern (Safe Industrial Standard)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
              <span className="font-bold text-amber-300">Step 1: Stream to Temp</span>
              <p className="text-slate-400">Lines are read from <code>data.txt</code>, modified, and written into a temporary file <code>temp.txt</code>.</p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
              <span className="font-bold text-rose-300">Step 2: Remove Original</span>
              <p className="text-slate-400">Once both handles close, delete the old file with <code>os.remove('data.txt')</code>.</p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
              <span className="font-bold text-emerald-300">Step 3: Rename Temp</span>
              <p className="text-slate-400">Atomically promote the temp file: <code>os.rename('temp.txt', 'data.txt')</code>.</p>
            </div>
          </div>
        </div>

        {/* 4. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText size={18} className="text-sky-400" /> Search &amp; Replacement Laboratory
            </h3>
            <span className="text-xs text-slate-400 font-mono">word_search_and_replacement_lab.py</span>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="word_search_and_replacement_lab.py"
            highlightLines={[22, 33, 44, 47]}
          />
        </div>

        {/* 5. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={16} /> Pitfalls
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Attempting to remove or rename files while their file handles are still open inside a <code>with</code> block (causes <code>PermissionError</code> on Windows).</li>
              <li>• Expecting <code>'r+'</code> write to push existing text forward instead of overwriting existing bytes.</li>
              <li>• Forgetting that <code>replace()</code> is case-sensitive unless normalized.</li>
            </ul>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• Always perform <code>os.remove()</code> and <code>os.rename()</code> outside the <code>with</code> blocks after files are guaranteed closed.</li>
              <li>• In line exclusion practicals, use <code>line.lower()</code> for checking banned keywords.</li>
              <li>• Use <code>os.replace(temp, target)</code> for atomic replacement on modern OS systems.</li>
            </ul>
          </div>
        </div>

        {/* 6. Examiner's Hint */}
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-2xl p-5 text-xs text-slate-300 space-y-1.5">
          <h4 className="font-bold text-sky-400 flex items-center gap-2">
            <HelpCircle size={16} /> CBSE Practical Examination Standard (Program #3 in Lab Manual)
          </h4>
          <p>
            "Write a Python program to read lines from a text file STORY.TXT and copy those lines to CLEAN.TXT which do NOT contain the word 'this' or 'that'." This is an official CBSE suggested lab program worth 8 marks in the practical exam!
          </p>
        </div>

        {/* 7. FAQ Template */}
        <FAQTemplate
          title="CBSE Class XII CS 083 · Topic 9 FAQs: Search & Replace Algorithms"
          questions={questions}
        />

        {/* 8. Printable Plain Text Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII CS 083 – Topic 9 Quick Revision Document"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Plain Text Note"
          downloadFileName="topic9_search_replace.txt"
        />

        {/* 9. Teacher's Note */}
        <Teacher
          note="Debangshu and Sachin: Pay close attention to Program #3 in your practical record book. The question says 'copy lines NOT containing this or that'. Notice how we use 'with open(src) as fin, open(dst, 'w') as fout:' to stream lines cleanly. Practice this script on your computers! — Sukanta Hui"
        />

      </div>
    </div>
  );
}
