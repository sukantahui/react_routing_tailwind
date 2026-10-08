import React, { useState } from 'react';
import { 
  Download, FileText, CheckCircle2, Circle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  RefreshCw, Layers, Printer, FileCode, Check, 
  HelpCircle, AlertTriangle, Cpu
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";
import masterSummaryText from "./topic8_files/003_003_decision_switch_master_summary.txt?raw";

const DownloadRevisionHub = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const checklist = [
    { id: 1, text: "No Semicolon After If: Know why 'if (x > 5);' prematurely terminates the if statement, causing the block below to run unconditionally." },
    { id: 2, text: "Assignment vs Equality Trap: Understand why 'if (a = 5)' fails to compile for ints, but 'if (flag = true)' compiles and evaluates to true." },
    { id: 3, text: "Dangling Else Pairing: Master the rule that an 'else' always attaches to the closest preceding unmatched 'if' within the same block." },
    { id: 4, text: "Switch Equality Focus: Understand that switch only tests for exact equality (==) and cannot test continuous ranges (like 'x >= 90')." },
    { id: 5, text: "Constant Case Labels: Remember that case labels MUST be compile-time constants (literals or final variables); variables cause compiler errors." },
    { id: 6, text: "Permissible Data Types: Memorize the allowed types (int, char, short, byte, String, enum) and the 4 forbidden types (float, double, boolean, long)." },
    { id: 7, text: "Fall-Through Mechanics: Master why omitting 'break;' causes Java to execute following cases blindly without re-checking case labels." },
    { id: 8, text: "Default Placement Trap: Know that if 'default:' is at the top or in the middle without a 'break;', it will fall through into the next case." },
    { id: 9, text: "5-Step Conversion Algorithm: Master converting 'if-else' ladders into 'switch-case' by mapping '==' to 'case:', inserting 'break;', and 'else' to 'default:'." },
    { id: 10, text: "GUI Textfield Integration: Master 'Integer.parseInt(jTextField1.getText().trim())' and remember to declare variables before switch to preserve scope." }
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
          Module 003_003 Master Revision Pack
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
              Complete theoretical summary of branching, switch pillars, permissible types, fall-through mechanics, and the 5-point conversion algorithm.
            </p>
          </div>
          <button
            onClick={() => downloadTextFile("003_003_decision_switch_master_summary.txt", masterSummaryText)}
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
              High-yield exam review sheet highlighting the top 10 CBSE examiner favorite traps, semicolon errors, missing break bugs, and textfield scoping rules.
            </p>
          </div>
          <button
            onClick={() => downloadTextFile("003_003_exam_golden_rules.txt", noteText)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-sky-950/40"
          >
            <Download className="w-3.5 h-3.5" /> Download Golden Rules
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between sm:col-span-2 lg:col-span-1">
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-fit">
              <Printer className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Browser Print-Ready Copy</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Print direct revision notes using your browser's print dialog (Ctrl+P / Cmd+P) formatted cleanly for A4 study handouts.
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-emerald-950/40"
          >
            <Printer className="w-3.5 h-3.5" /> Print Revision Handout
          </button>
        </div>
      </div>

      {/* Interactive 10-Point Checklist */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              10-Point CBSE Exam Readiness Checklist
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Check off each concept before appearing for your CBSE Class 12 IT-802 board or pre-board examination.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const all = {};
                checklist.forEach(item => { all[item.id] = true; });
                setCheckedItems(all);
              }}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              Check All
            </button>
            <button
              onClick={() => setCheckedItems({})}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Mastery Progress: {completedCount} of {checklist.length} Complete</span>
            <span className={progressPercent === 100 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
              {progressPercent}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
            <div 
              className={`h-full transition-all duration-300 rounded-full ${
                progressPercent === 100 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                  : 'bg-gradient-to-r from-amber-500 to-orange-400'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Checklist Items */}
        <div className="grid gap-2.5 pt-2">
          {checklist.map((item) => {
            const isDone = !!checkedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isDone 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-200' 
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600" />
                  )}
                </div>
                <div className="flex-1 text-xs sm:text-sm">
                  <span className={`font-semibold mr-1.5 ${isDone ? 'text-emerald-400' : 'text-slate-400'}`}>
                    #{item.id}.
                  </span>
                  <span className={isDone ? 'line-through text-slate-400' : ''}>
                    {item.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function Topic8() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Download className="w-4 h-4" /> CBSE Class 12 IT (Code 802) • Unit 3: Java Programming
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Downloadable Documents & Revision Hub
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
          Download the master cheatsheet for decision branching and switch conversion, review top 10 golden exam rules, and assess your CBSE Class 12 IT-802 readiness with our 10-point checklist.
        </p>
      </div>

      {/* Interactive Download & Checklist Hub */}
      <div className="max-w-6xl mx-auto">
        <DownloadRevisionHub />
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: Decision Structures Golden Rules Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 Comprehensive Retention Exam Questions" 
          description="Master 25 retention questions covering if-else ladders, switch constant rules, permissible types, fall-through output prediction, and GUI conversion with bilingual explanations." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="Before sitting for your board exam, download the Master Cheatsheet and run through the 10-point checklist! If you can explain why 'double' is illegal in switch, spot an accidental semicolon after an 'if', and convert a 4-slab GUI billing ladder without forgetting 'break;', you are guaranteed full marks in this unit!" 
        />
      </div>
    </div>
  );
}
