import React, { useState } from 'react';
import { 
  Download, FileText, CheckCircle2, Circle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  RefreshCw, Layers, Printer, FileCode, Check, 
  HelpCircle, AlertTriangle, Cpu, Activity
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";
import masterSummaryText from "./topic8_files/004_004_multithreading_assertions_master_summary.txt?raw";

const DownloadRevisionHub = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const checklist = [
    { id: 1, text: "Thread Definition: A lightweight sub-process sharing common heap memory while maintaining an isolated stack." },
    { id: 2, text: "5 Lifecycle States: Master New, Runnable, Running, Blocked/Timed Waiting, and Terminated states." },
    { id: 3, text: "Thread vs Runnable: Explain why Runnable is preferred due to Java single class inheritance." },
    { id: 4, text: "run() vs start(): Know that start() allocates a new call stack, while calling run() directly does not create a thread." },
    { id: 5, text: "Start Once Invariant: Calling start() more than once throws IllegalThreadStateException." },
    { id: 6, text: "Assertion Purpose: Verify internal invariants and logical assumptions during development and QA." },
    { id: 7, text: "Disabled by Default: Assertions are disabled by default in JRE to eliminate performance overhead in production." },
    { id: 8, text: "JVM Flags: Use -ea / -enableassertions to enable assertions and -da to disable them." },
    { id: 9, text: "Guaranteed Finally: Understand that finally block ALWAYS executes (even with return statements)." },
    { id: 10, text: "Big Three Exceptions: Recognize NullPointerException, ArrayIndexOutOfBoundsException, and NumberFormatException." }
  ];

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  const downloadTextFile = (filename, content) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8 mb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
            <Download className="w-4 h-4" />
            <span>Master Revision & Download Center</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Module 004_004: Multithreading, Assertions & Exceptions
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-slate-400">Mastery Progress</div>
            <div className="text-sm font-bold font-mono text-emerald-400">{completedCount} of 10 Complete</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center font-mono font-bold text-xs text-amber-400">
            {progressPercent}%
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
        <div 
          className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Checklist */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          10-Point CBSE Exam Readiness Checklist
        </h4>

        <div className="grid gap-2.5">
          {checklist.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`w-full text-left p-3.5 rounded-2xl border transition flex items-start gap-3 cursor-pointer ${
                  isChecked
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-950 hover:text-slate-300'
                }`}
              >
                {isChecked ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
                )}
                <span className={`text-xs leading-relaxed ${isChecked ? 'font-medium text-white' : ''}`}>
                  {item.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Download Center Cards */}
      <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Summary Text Document</span>
            </div>
            <h4 className="text-base font-bold text-white">
              004_004_multithreading_assertions_master_summary.txt
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete reference summary including multithreading code snippets, assertion flags, and exception diagnostics.
            </p>
          </div>

          <button
            onClick={() => downloadTextFile("004_004_multithreading_assertions_master_summary.txt", masterSummaryText)}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50"
          >
            <Download className="w-3.5 h-3.5" /> Download Master Summary (.txt)
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <FileCode className="w-4 h-4" />
              <span>Topic Revision Note</span>
            </div>
            <h4 className="text-base font-bold text-white">
              topic8_note.txt
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Quick review checklist and high-yield examination pointers for CBSE Class XII IT 802.
            </p>
          </div>

          <button
            onClick={() => downloadTextFile("topic8_note.txt", noteText)}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50"
          >
            <Download className="w-3.5 h-3.5" /> Download Topic 8 Notes (.txt)
          </button>
        </div>
      </div>
    </div>
  );
};

const Topic8 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_004 • Topic 8
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Downloadable Documents & Revision Center
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Consolidate your mastery of multithreading, assertions, and exceptions with our 10-point checklist, and download full text summaries for offline board examination prep.
          </p>
        </div>

        {/* Revision Hub */}
        <DownloadRevisionHub />

        {/* Teacher Sukanta Hui Component */}
        <Teacher
          quote="Download the master summary text file and review the 10-point checklist before your board exam practicals and theory tests. Make sure you can write both thread creation methods from memory and recite the JVM assertion flags without hesitation!"
        />

        {/* CBSE Exam FAQs */}
        <FAQTemplate questions={questions} />

        {/* Printable Revision Notes */}
        <PlainTextPrint
          title="CBSE Class 12 IT (802) • Multithreading & Assertions Revision Hub"
          content={noteText}
        />
      </div>
    </div>
  );
};

export default Topic8;
