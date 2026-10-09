import React, { useState } from 'react';
import { 
  Download, FileText, CheckCircle2, Circle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  RefreshCw, Layers, Printer, FileCode, Check, 
  HelpCircle, AlertTriangle, Cpu, Box
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";
import masterSummaryText from "./topic8_files/004_001_oop_constructors_master_summary.txt?raw";

const DownloadRevisionHub = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const checklist = [
    { id: 1, text: "Four Pillars: Define Abstraction, Encapsulation, Inheritance, and Polymorphism precisely." },
    { id: 2, text: "Class vs Object: Explain class as a blueprint and object as an instantiated memory block." },
    { id: 3, text: "Role of 'new': Know that 'new' allocates memory in heap and triggers constructor execution." },
    { id: 4, text: "Constructor Golden Rules: Must share class name, no return type (no void), automatic execution." },
    { id: 5, text: "Default Constructor: Explain compiler-provided default constructor and when it gets suppressed." },
    { id: 6, text: "Parameterized Constructor: Write constructors that accept custom values for fields." },
    { id: 7, text: "Constructor Overloading: Differentiate multiple constructors by parameter count or types." },
    { id: 8, text: "Constructor vs Method: Articulate return type, name matching, and invocation differences." },
    { id: 9, text: "Chaining with this(): Use this(...) to call overloaded constructors within the same class." },
    { id: 10, text: "Encapsulation Recipe: Declare fields private and write public getters and setters." }
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
            Downloadable Revision Sheets & 10-Point CBSE Exam Checklist
          </h3>
        </div>
        <div className="text-xs font-mono px-3 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
          Module 004_001 Master Revision Pack
        </div>
      </div>

      {/* Download Center Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 w-fit">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Master Revision Cheatsheet (.txt)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete theoretical summary of OOP principles, constructors, overloading, and encapsulation rules.
            </p>
          </div>
          <button
            onClick={() => downloadTextFile("004_001_oop_constructors_master_summary.txt", masterSummaryText)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-amber-950/40"
          >
            <Download className="w-3.5 h-3.5" /> Download Master Cheatsheet
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 w-fit">
              <FileCode className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Top 10 Exam Golden Rules (.txt)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              High-yield review sheet highlighting constructor return type traps, method differences, and encapsulation.
            </p>
          </div>
          <button
            onClick={() => downloadTextFile("004_001_oop_exam_golden_rules.txt", noteText)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-sky-950/40"
          >
            <Download className="w-3.5 h-3.5" /> Download Golden Rules
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-fit">
              <Printer className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Printable Reference Card</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Quick print-ready revision sheet for last-minute review before practical lab exams.
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-emerald-950/40"
          >
            <Printer className="w-3.5 h-3.5" /> Print Revision Pack
          </button>
        </div>
      </div>

      {/* 10-Point Checklist */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            10-Point CBSE IT (802) Exam Readiness Checklist
          </h4>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            {completedCount} / {checklist.length} Completed ({progressPercent}%)
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="grid gap-2.5 pt-2">
          {checklist.map(item => (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-3 rounded-xl border text-xs flex items-start gap-3 cursor-pointer transition ${
                checkedItems[item.id]
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-200'
                  : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:bg-slate-900'
              }`}
            >
              <div className="mt-0.5">
                {checkedItems[item.id] ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                )}
              </div>
              <span className="leading-relaxed">{item.text}</span>
            </div>
          ))}
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
            <Sparkles className="w-3.5 h-3.5" /> Module 004_001 • Topic 8
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Downloadable Documents & Revision Center
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Access downloadable summary sheets, top 10 CBSE examination tips, and an interactive 10-point checklist for Module 004_001.
          </p>
        </div>

        {/* Download Hub */}
        <DownloadRevisionHub />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Module 004_001 Downloads"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Module 004_001 Revision Document"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 8 Note (.txt)"
          downloadFileName="004_001_topic8_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Download the summary cheatsheet and review the differences between constructors and methods before your board exam! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic8;
