import React, { useState } from 'react';
import {
  Download, FileText, Code, BookOpen, CheckCircle2,
  Layers, HelpCircle, ShieldCheck, Printer, Copy, Check, Terminal, Sparkles
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";
import masterScript from "./topic10_files/binary_file_handling_complete_master_lab.py?raw";

export default function Topic10() {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(masterScript);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadPython = () => {
    const blob = new Blob([masterScript], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "binary_file_handling_complete_master_lab.py";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Binary Files · Topic 10
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Laboratory Package
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Downloadable Documents: Master Binary File Handling Script &amp; Complete Revision Pack
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Equip your local workstation with the complete binary file CRUD codebase. Download the executable Python laboratory script, inspect the full source code, and print out the consolidated offline revision guide.
            </p>
          </div>
        </div>

        {/* 2. Download Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <Terminal size={24} />
              </div>
              <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 text-xs font-mono rounded-full font-semibold">
                .py Executable
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Master Binary CRUD Script</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Contains complete runnable demonstrations for <code>pickle.dump()</code>, <code>pickle.load()</code> with <code>EOFError</code>, searching records, in-place vs staging updates, and permanent deletions.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleDownloadPython}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all transform active:scale-95"
              >
                <Download size={15} /> Download .py Script
              </button>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all"
              >
                {copiedCode ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                {copiedCode ? "Copied!" : "Copy Code"}
              </button>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <FileText size={24} />
              </div>
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-xs font-mono rounded-full font-semibold">
                .txt Printable Note
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Consolidated Revision Document</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                A clean, unformatted plain-text revision document summarizing pickle protocols, access modes, EOFError templates, and the top 5 CRUD code patterns.
              </p>
            </div>
            <div className="pt-2">
              <a
                href="#printable-doc"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold rounded-xl border border-amber-500/30 transition-all"
              >
                <Printer size={15} /> Jump to Printable Note
              </a>
            </div>
          </div>
        </div>

        {/* 3. Live Code Viewer */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-purple-400 flex items-center gap-2">
              <Code size={18} /> Master Script Preview (binary_file_handling_complete_master_lab.py)
            </h3>
            <span className="text-xs font-mono text-slate-500">Python 3.x Compliant</span>
          </div>
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 max-h-96 overflow-y-auto">
            <pre className="font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
              {masterScript}
            </pre>
          </div>
        </div>

        {/* 4. FAQ Template */}
        <FAQTemplate
          title="CBSE Class XII CS 083 · Topic 10 FAQs: Binary Laboratory Reference"
          questions={questions}
        />

        {/* 5. Printable Plain Text Document */}
        <div id="printable-doc">
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Module 2 Master Revision Document"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Master Text Note"
            downloadFileName="binary_file_handling_master_revision.txt"
          />
        </div>

        {/* 6. Teacher's Note */}
        <Teacher
          note="To Mamata, Mahima, Susmita, and Debangshu: This master script covers 100% of all practical examination questions asked on Binary Files by CBSE external examiners! Practice running this on your computers in Barrackpore. — Sukanta Hui"
        />

      </div>
    </div>
  );
}
