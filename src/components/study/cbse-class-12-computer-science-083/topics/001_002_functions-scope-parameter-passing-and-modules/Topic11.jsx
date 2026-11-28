import React, { useState } from 'react';
import {
  Download, FileText, Code, BookOpen, CheckCircle2,
  Layers, HelpCircle, ShieldCheck, Printer, Copy, Check, Terminal, Sparkles
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";
import masterScript from "./topic11_files/module2_functions_scope_master_lab.py?raw";

export default function Topic11() {
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
    link.download = "module2_functions_scope_master_lab.py";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Topic 11
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Downloadable Hub
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Downloadable Documents &amp; Master Functions Laboratory Suite
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Consolidated offline revision assets for Module 2. Download the complete runnable Python master functions script, copy code directly to your clipboard, and access the high-yield examination cheatsheet.
            </p>
          </div>
        </div>

        {/* 2. Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Code size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Master Python Functions Lab</h3>
                <p className="text-xs text-slate-400">module2_functions_scope_master_lab.py</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Contains verified runnable functions covering positional &amp; keyword arguments, default parameters, LEGB scope resolution, global variables, and pass-by-object-reference.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              <button
                onClick={handleDownloadPython}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition"
              >
                <Download size={14} /> Download .py Script
              </button>
              <button
                onClick={handleCopyCode}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 transition"
              >
                {copiedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copiedCode ? "Copied to Clipboard!" : "Copy Full Code"}
              </button>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Module 2 Revision Cheatsheet</h3>
                <p className="text-xs text-slate-400">topic11_note.txt</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Complete exam-aligned reference document detailing function syntax, formal vs actual parameters, default argument placement rules, and the LEGB hierarchy.
            </p>
            <div className="pt-2">
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Ready for offline download below
              </span>
            </div>
          </div>
        </div>

        {/* 3. 25-Question FAQ Assessment */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <FAQTemplate
            title="CBSE Class XII CS (083) – 25 Diagnostic Questions: Module 2 Resource Utilization"
            questions={questions}
          />
        </div>

        {/* 4. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="Functions, parameter passing, and scope rules form the bedrock of CBSE Class 12 CS! Master the 8 core rules in this cheatsheet, and you will comfortably secure all 15+ marks allocated to function questions in the theory paper. — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Module 2 Functions & Scope Master Document"
            filename="module2_functions_scope_notes.txt"
          />
        </div>

      </div>
    </div>
  );
}
