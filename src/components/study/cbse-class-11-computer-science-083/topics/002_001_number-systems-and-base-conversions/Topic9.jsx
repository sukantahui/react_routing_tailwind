import React, { useState } from 'react';
import {
  Download, FileText, Code, BookOpen, CheckCircle2,
  Layers, HelpCircle, ShieldCheck, Printer, Copy, Check, Terminal, Sparkles, Binary, Calculator
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";
import pythonMasterScript from "./topic9_files/module_002_001_master_lab.py?raw";

export default function Topic9() {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState('resources');

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonMasterScript);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadPython = () => {
    const blob = new Blob([pythonMasterScript], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "module_002_001_number_systems_master_lab.py";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002.001 · Topic 09 / 10
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Downloadable Revision Hub
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Downloadable Documents &amp; Master Laboratory Scripts
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Export comprehensive offline study guides, formula sheets, and our complete Python simulation laboratory for all number systems conversions and binary ALU arithmetic.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'resources', label: '1. Download Center', icon: Download },
            { id: 'python', label: '2. Master Python Script', icon: Code },
            { id: 'faqs', label: '3. Revision FAQs', icon: HelpCircle },
            { id: 'notes', label: '4. Printable Document', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 border-b-2 border-indigo-400'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: RESOURCES */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-indigo-500/40 transition">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                  <FileText size={20} />
                </div>
                <h3 className="text-base font-bold text-white">Module Complete Revision Handbook</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Complete printable handbook covering all conversion tables, 8-4-2-1 / 4-2-1 codes, positional weight formulas, fractional rules, and binary arithmetic steps.
                </p>
                <button
                  onClick={() => setActiveTab('notes')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                >
                  <Printer size={14} />
                  Print / View Plain Text Notes
                </button>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-emerald-500/40 transition">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                  <Code size={20} />
                </div>
                <h3 className="text-base font-bold text-white">Master Python Simulation Suite (.py)</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ready-to-run Python educational script containing division ladders, positional weight calculators, binary bridging routines, and ALU ripple-carry addition engines.
                </p>
                <button
                  onClick={handleDownloadPython}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                >
                  <Download size={14} />
                  Download Master .py File
                </button>
              </div>

            </div>

            <Teacher
              topicName="Number Systems & Base Conversions Downloadable Hub"
              subject="CBSE Class 11 Computer Science (083)"
            />
          </div>
        )}

        {/* TAB 2: PYTHON MASTER */}
        {activeTab === 'python' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white font-mono">module_002_001_master_lab.py</h3>
                  <p className="text-xs text-slate-400">Complete Base Conversion &amp; Arithmetic Engine</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700 transition cursor-pointer"
                  >
                    {copiedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    {copiedCode ? 'Copied' : 'Copy Python'}
                  </button>
                  <button
                    onClick={handleDownloadPython}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition cursor-pointer"
                  >
                    <Download size={14} />
                    Download .py
                  </button>
                </div>
              </div>

              <pre className="bg-slate-950 p-4 rounded-xl text-slate-200 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800 leading-relaxed max-h-[500px]">
                <code>{pythonMasterScript}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate questions={questions} />
          </div>
        )}

        {/* TAB 4: PRINTABLE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              fileName="CBSE_Class11_CS_Module_002_001_Complete_Handbook.txt"
            />
          </div>
        )}

      </div>
    </div>
  );
}
