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
import pythonMasterScript from "./topic9_files/module_001_002_master_lab.py?raw";

export default function Topic9() {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState('resources');

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonMasterScript);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadFile = (filename, text) => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const resourceList = [
    {
      title: "Module 001_002 Consolidated Theory & Exam Notes",
      desc: "Complete 11-topic textbook summary with software classifications, language processors, OS 4 pillars, and concurrency comparisons.",
      file: "CBSE_Class11_CS_Module_001_002_Master_Notes.txt",
      content: noteText,
      tag: "Comprehensive Note"
    },
    {
      title: "Full Python Interactive Simulation Master Lab",
      desc: "Ready-to-run Python script featuring OS scheduling, memory allocation, trap transitions, and language translator benchmarks.",
      file: "module_001_002_master_lab.py",
      content: pythonMasterScript,
      tag: "Python Lab Script"
    }
  ];

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header & Breadcrumb */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
                Unit I: CSO · Module 001_002
              </span>
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                Topic 9
              </span>
              <span className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-full">
                Resource Repository
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Downloadable Documents &amp; Lab Code Repository
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Access and download full study notes, printable cheat sheets, and verified Python simulation code for Module 001_002 (Types of Software &amp; OS Functions).
              </p>
            </div>
          </div>
        </div>

        {/* 2. Download Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resourceList.map((res, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-sky-500/50 transition-all shadow-xl"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {res.tag}
                  </span>
                  <FileText className="text-slate-500" size={18} />
                </div>
                <h3 className="text-base font-bold text-white">{res.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{res.desc}</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleDownloadFile(res.file, res.content)}
                  className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow"
                >
                  <Download size={14} /> Download {res.file}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Embedded Master Python Code Viewer */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="text-emerald-400" size={20} />
              <h3 className="text-base font-bold text-white">module_001_002_master_lab.py (Direct Source Preview)</h3>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition cursor-pointer"
            >
              {copiedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copiedCode ? "Copied to Clipboard" : "Copy Code"}</span>
            </button>
          </div>

          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-850 font-mono text-xs text-slate-300 overflow-x-auto max-h-96 leading-relaxed">
            {pythonMasterScript}
          </pre>
        </div>

        {/* 4. Frequently Asked Questions */}
        <div className="space-y-4">
          <FAQTemplate questions={questions} />
        </div>

        {/* 5. Plain Text Printable */}
        <div className="space-y-4">
          <PlainTextPrint
            fileName="CBSE_Class11_CS_Module_001_002_Consolidated_Notes.txt"
            content={noteText}
          />
        </div>

        {/* 6. Teacher's Note */}
        <div className="space-y-4">
          <Teacher
            topicName="Module 001_002 Downloadable Resources"
            subject="CBSE Class 11 Computer Science (083)"
          />
        </div>

      </div>
    </div>
  );
}
