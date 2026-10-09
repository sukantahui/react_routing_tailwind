import React, { useState } from 'react';
import { 
  Download, FileText, CheckCircle2, Circle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  RefreshCw, Layers, Printer, FileCode, Check, 
  HelpCircle, AlertTriangle, Briefcase, FolderKanban
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";
import masterSummaryText from "./topic7_files/005_001_wil_project_management_master_summary.txt?raw";

const DownloadRevisionHub = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const checklist = [
    { id: 1, text: "WIL Definition: Articulate that WIL combines classroom academic studies with authentic workplace practice." },
    { id: 2, text: "Tripartite Model: State the three stakeholders (Student, Educational Institute, and Industry Partner)." },
    { id: 3, text: "Industry Benefits: Explain talent pipeline creation and reduced corporate onboarding costs." },
    { id: 4, text: "Project Definition: Recite 'A temporary endeavor undertaken to create a unique product, service, or result'." },
    { id: 5, text: "4 Core Characteristics: Definite start/end, defined scope, finite resources, and distinct boundaries." },
    { id: 6, text: "What a Project is NOT: Explain why projects are NOT perpetual and cannot have infinite resources." },
    { id: 7, text: "Scope Creep: Define uncontrolled scope expansion and explain how project boundaries prevent it." },
    { id: 8, text: "Triple Constraint: Draw and explain the Scope-Time-Cost (Iron Triangle) relationship." },
    { id: 9, text: "6 SDLC Phases: List Conception -> Requirements (SRS) -> Design (ER/UI) -> Implementation (Code) -> Testing -> Deployment." },
    { id: 10, text: "School IT Capstone: Detail the architecture of a School Library or Fee Management System linking Java GUI to MySQL." }
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
            <span>Master Revision &amp; Download Center</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Module 005_001: Work-Integrated Learning &amp; Project Management
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
              005_001_wil_project_management_master_summary.txt
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete reference summary including WIL models, project characteristics, SDLC phases, and school capstone architectures.
            </p>
          </div>

          <button
            onClick={() => downloadTextFile("005_001_wil_project_management_master_summary.txt", masterSummaryText)}
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
              topic7_note.txt
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Quick review checklist and high-yield examination pointers for CBSE Class XII IT 802.
            </p>
          </div>

          <button
            onClick={() => downloadTextFile("topic7_note.txt", noteText)}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50"
          >
            <Download className="w-3.5 h-3.5" /> Download Topic 7 Notes (.txt)
          </button>
        </div>
      </div>
    </div>
  );
};

const Topic7 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 005_001 • Topic 7
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Downloadable Documents &amp; Revision Center
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Consolidate your mastery of Work-Integrated Learning (WIL), project characteristics, SDLC phases, and school IT capstone projects with our 10-point checklist and download full text summaries.
          </p>
        </div>

        {/* Revision Hub */}
        <DownloadRevisionHub />

        {/* Teacher Sukanta Hui Component */}
        <Teacher
          quote="This summary brings together all non-programming vocational project management concepts required for the CBSE Class XII IT 802 exam. Download the summary document and use the 10-point checklist for quick last-minute review!"
        />

        {/* CBSE Exam FAQs */}
        <FAQTemplate questions={questions} />

        {/* Printable Revision Notes */}
        <PlainTextPrint
          title="CBSE Class 12 IT (802) • WIL & Project Management Revision Hub"
          content={noteText}
        />
      </div>
    </div>
  );
};

export default Topic7;
