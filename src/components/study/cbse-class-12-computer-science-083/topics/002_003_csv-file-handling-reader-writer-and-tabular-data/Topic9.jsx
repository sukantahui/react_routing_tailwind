import React, { useState } from 'react';
import {
  Download, FileText, Code, BookOpen, CheckCircle2,
  Layers, HelpCircle, ShieldCheck, Printer, Copy, Check, Terminal, Sparkles
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";
import masterScript from "./topic9_files/csv_file_handling_complete_master_lab.py?raw";

export default function Topic9() {
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
    link.download = "csv_file_handling_complete_master_lab.py";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · CSV Files · Topic 9
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Laboratory Package
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Downloadable Documents &amp; Master Laboratory Compendium
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Access the complete collection of production-ready laboratory scripts, cheat sheets, and board revision notes for CSV File Handling in Python.
            </p>
          </div>
        </div>

        {/* 2. Download Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                <Code size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Master Python Laboratory Script</h3>
                <p className="text-xs text-slate-400">Standalone runnable .py file with full CRUD and aggregations</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Includes comprehensive implementations of writerow, writerows, csv.reader, custom delimiters, statistical aggregations, and error handling.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleDownloadPython}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
              >
                <Download size={14} /> Download .py Script
              </button>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all"
              >
                {copiedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copiedCode ? "Copied to Clipboard!" : "Copy Source Code"}
              </button>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-sky-500/10 rounded-xl text-sky-400">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Concise Revision Compendium</h3>
                <p className="text-xs text-slate-400">Formatted study notes ready for printing and revision</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Summarizes all critical CBSE Class 12 board examination rules, RFC 4180 standards, newline parameter mechanics, and marking scheme rubrics.
            </p>
            <div className="pt-2">
              <PlainTextPrint
                content={noteText}
                filename="cbse_class12_csv_complete_master_notes.txt"
                title="Download / Print Master Revision Notes"
              />
            </div>
          </div>
        </div>

        {/* 3. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="Download and run the master laboratory script on your local machine. Try modifying the delimiter to pipe or semicolon, experiment with newline='', and inspect the resulting files in both Notepad and Excel. Hands-on verification builds true algorithmic confidence!"
        />

        {/* 4. CBSE Board Examination Quality FAQ Set */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <HelpCircle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Practice &amp; FAQs</h2>
              <p className="text-xs text-slate-400">25 Authentic Questions with Complete Explanations &amp; Hints</p>
            </div>
          </div>
          <FAQTemplate questions={questions} />
        </div>

      </div>
    </div>
  );
}