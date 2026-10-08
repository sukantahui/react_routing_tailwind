import React, { useState } from 'react';
import { 
  Download, FileText, CheckCircle2, Circle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  RefreshCw, Layers, Printer, FileCode, Check, 
  HelpCircle, AlertTriangle, Database
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";
import masterSummaryText from "./topic7_files/003_001_java_env_master_summary.txt?raw";

const DownloadRevisionHub = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const checklist = [
    { id: 1, text: "JVM, Bytecode & WORA: Understand how javac produces .class (0xCAFEBABE) and how the JVM translates it natively." },
    { id: 2, text: "Ecosystem Formulas: Master JDK = JRE + Tools, JRE = JVM + Core Class Libraries." },
    { id: 3, text: "Memory Areas: Distinguish between Heap (objects), Stack (local variables/frames), and Method Area (classes)." },
    { id: 4, text: "8 Primitive Types: Memorize byte(1B), short(2B), int(4B), long(8B), float(4B), double(8B), char(2B), boolean(1b*)." },
    { id: 5, text: "Float Literal Suffix: Remember that decimals default to double; 'f' or 'F' is mandatory (e.g. float f = 12.5f;)." },
    { id: 6, text: "Identifier Rules: Alphanumeric, _, $ only; cannot start with digit; no keywords; case-sensitive." },
    { id: 7, text: "Constants & final: The final keyword makes variables immutable; naming convention is UPPER_SNAKE_CASE." },
    { id: 8, text: "Output Statements: print() stays on same line, println() jumps to next line with newline (\\n)." },
    { id: 9, text: "String Concatenation: Left-to-right evaluation: 'A' + 1 + 2 = 'A12', but 1 + 2 + 'A' = '3A'." },
    { id: 10, text: "Top Compiler Traps: Spot lossy conversions, char quote mismatches, and uninitialized local variables." }
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
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
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
          Module 003_001 Revision Pack
        </div>
      </div>

      {/* Download Center Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 w-fit">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Master Revision Cheatsheet (.txt)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete theoretical summary, memory matrices, identifier rules, and compiler trap fixes in plain text format.
            </p>
          </div>
          <button
            onClick={() => downloadTextFile("003_001_java_env_master_summary.txt", masterSummaryText)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition cursor-pointer shadow-lg shadow-amber-500/10"
          >
            <Download className="w-4 h-4" />
            <span>Download Cheatsheet (.txt)</span>
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 w-fit">
              <FileCode className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">CBSE IT-802 Question Bank (.json)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete bank of high-yield CBSE Class 12 IT (802) multiple choice questions with bilingual explanations.
            </p>
          </div>
          <button
            onClick={() => downloadTextFile("003_001_it802_questions.json", JSON.stringify(questions, null, 2))}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-slate-950 font-bold text-xs transition cursor-pointer shadow-lg shadow-sky-500/10"
          >
            <Download className="w-4 h-4" />
            <span>Download Questions (.json)</span>
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-fit">
              <Printer className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Printable Study Notes</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ready-to-print formatted notes optimized for quick pre-exam reading and classroom revision.
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition cursor-pointer shadow-lg shadow-emerald-500/10"
          >
            <Printer className="w-4 h-4" />
            <span>Print Current Page</span>
          </button>
        </div>
      </div>

      {/* 10-Point Revision Checklist */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Self-Assessment Tool</span>
            <h4 className="text-lg font-bold text-white">10-Point CBSE Exam Readiness Checklist</h4>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-32 bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="text-xs font-mono font-bold text-amber-300">{progressPercent}% Mastered</span>
          </div>
        </div>

        <div className="space-y-2.5">
          {checklist.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-3.5 rounded-xl border flex items-start gap-3 transition cursor-pointer ${
                  isChecked
                    ? "bg-emerald-950/40 border-emerald-800/60 text-slate-200"
                    : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/40 text-slate-300"
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600" />
                  )}
                </div>
                <div className="text-xs leading-relaxed flex-1">
                  <span className={`font-bold mr-1.5 ${isChecked ? "text-emerald-300" : "text-amber-400"}`}>
                    #{item.id}
                  </span>
                  <span className={isChecked ? "line-through text-slate-400" : "text-slate-200"}>
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

export default function Topic7() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-10">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Download className="w-4 h-4" />
          <span>CBSE Class 12 Information Technology (Code 802) • Module 003_001 • Topic 7</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          Downloadable Documents & <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Master Revision Hub</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-4xl leading-relaxed">
          Access complete downloadable summary sheets, full question banks in JSON, printable revision notes, and track your pre-exam confidence with our interactive 10-point checklist.
        </p>
      </div>

      {/* Interactive Download & Revision Hub */}
      <div className="max-w-6xl mx-auto">
        <DownloadRevisionHub />
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={masterSummaryText} 
          title="CBSE Class 12 IT-802: Complete Module 003_001 Master Revision Cheatsheet" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: Comprehensive Module Review" 
          description="Test your comprehensive grasp of the entire module with 25 master review questions covering JVM, WORA, types, rules, final constants, and output statements." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="Before sitting for your CBSE Class 12 IT (802) practical or theory exam, ensure every item on the 10-point checklist is checked off! Keep the downloaded summary text file on your phone for quick 5-minute revision before entering the exam hall." 
        />
      </div>
    </div>
  );
}
