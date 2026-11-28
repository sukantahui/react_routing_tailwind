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
import masterScript from "./topic10_files/master_network_design_package.py?raw";

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
    link.download = 'cbse12_network_case_study_solver.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadNote = () => {
    const blob = new Blob([noteText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cbse12_network_case_study_quick_notes.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-cyan-400 mb-2">
          <Download className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-800/60">
            Offline Study Package & Laboratory Tools
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Downloadable Documents: Master Laboratory Package & Revision Notes
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Download the complete CBSE Class 12 Network Case Study solver suite, quick revision cheat sheets,
          and exam-ready algorithmic packages for offline revision.
        </p>
      </header>

      {/* 2. Teacher Guidance */}
      <Teacher
        teacherName="Sukanta Hui"
        experienceYears="27+"
        designation="Senior Computer Science Faculty & Academic Consultant"
        institution="Coder & AccoTax, Barrackpore"
        message="Keep this revision cheat sheet printed in your practical record file. The Python solver script included here implements Kruskal's algorithm and Star layout calculation so you can double-check your answers to any textbook problem in seconds. Use it to build intuition before writing answers by hand."
      />

      {/* 3. Action Download Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-6 rounded-xl border border-cyan-500/30 shadow-lg space-y-4">
          <div className="flex items-center space-x-3 text-cyan-400">
            <Code className="w-6 h-6" />
            <h3 className="text-xl font-bold text-white">Master Python Case Study Solver</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Full Python suite with Kruskal's MST algorithm, 80-20 rule server selector,
            repeater distance tester, and automated CBSE model answer generator.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={handleDownloadPython}
              className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download .py Script</span>
            </button>
            <button
              onClick={handleCopyCode}
              className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-6 rounded-xl border border-emerald-500/30 shadow-lg space-y-4">
          <div className="flex items-center space-x-3 text-emerald-400">
            <BookOpen className="w-6 h-6" />
            <h3 className="text-xl font-bold text-white">Quick Revision Notes & Cheat Sheet</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Compact ASCII text handbook summarizing server placement rules, layout calculation formulas,
            repeater & switch criteria, and exam answer keywords.
          </p>
          <div className="pt-2">
            <button
              onClick={handleDownloadNote}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download Notes (.txt)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Code Preview Section */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sky-400">
            <Terminal className="w-5 h-5" />
            <h3 className="text-lg font-bold text-white">Source Code Preview: master_network_design_package.py</h3>
          </div>
          <button
            onClick={handleCopyCode}
            className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? "Copied" : "Copy"}</span>
          </button>
        </div>
        <pre className="bg-slate-950 p-4 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto max-h-96 border border-slate-800">
          {masterScript}
        </pre>
      </section>

      {/* 5. Printable Revision Note */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-emerald-400" />
          <span>Embedded Quick Revision Note</span>
        </h3>
        <PlainTextPrint
          title="Case Study Quick Revision Handbook"
          content={noteText}
        />
      </section>

      {/* 6. Comprehensive FAQ & Exam Questions */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 mb-2">
          <HelpCircle className="w-6 h-6" />
          <h3 className="text-xl font-bold text-white">25 Practice Questions on Implementation & Review</h3>
        </div>
        <p className="text-sm text-slate-300">
          Reinforce your algorithmic and conceptual mastery with these 25 review questions:
        </p>
        <FAQTemplate questions={questions} />
      </section>
    </div>
  );
}
