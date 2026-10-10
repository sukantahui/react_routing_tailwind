import React, { useState } from 'react';
import {
  Download, FileText, Code, BookOpen, CheckCircle2,
  Layers, HelpCircle, ShieldCheck, Printer, Copy, Check, Terminal, Sparkles, Cpu
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";
import pythonMasterScript from "./topic10_files/module_002_boolean_logic_master_lab.py?raw";

export default function Topic10() {
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
    link.download = "module_002_boolean_logic_master_lab.py";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002 · Topic 10
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Downloadable Revision Hub
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Downloadable Documents &amp; Master Laboratory Scripts
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Export offline study notes, formula cheat sheets, universal realization proofs, and the complete Python digital logic laboratory suite for Unit 1 Computer Systems and Organisation (CSO).
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'resources', label: '1. Download Center', icon: Download },
            { id: 'python', label: '2. Master Python Script', icon: Code },
            { id: 'faqs', label: '3. Revision FAQs (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '4. Printable Document', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 border-b-2 border-sky-400'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/40'
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

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-sky-500/40 transition">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
                  <FileText size={20} />
                </div>
                <h3 className="text-base font-bold text-white">Module 002 Complete Revision Handbook</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Comprehensive textbook-aligned revision guide covering all Boolean logic gates, truth tables, universal realizations (NAND/NOR), postulates, and circuit synthesis diagrams.
                </p>
                <button
                  onClick={() => setActiveTab('notes')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-xs font-semibold rounded-xl border border-sky-500/30 transition cursor-pointer"
                >
                  <Printer size={14} /> Open Printable Document
                </button>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-emerald-500/40 transition">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                  <Code size={20} />
                </div>
                <h3 className="text-base font-bold text-white">Master Python Digital Logic Suite</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Self-contained Python executable containing gate simulators, truth table generators, algebraic theorem verifiers, and Full Adder simulations.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleDownloadPython}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl shadow transition cursor-pointer"
                  >
                    <Download size={14} /> Download (.py)
                  </button>
                  <button
                    onClick={() => setActiveTab('python')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition cursor-pointer"
                  >
                    <Terminal size={14} /> View Code
                  </button>
                </div>
              </div>

            </div>

            {/* Quick Gate IC Cheat Sheet */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Cpu size={16} className="text-amber-400" /> Standard TTL 7400-Series IC Quick Reference
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-rose-400 font-bold text-base">7404</div>
                  <div className="text-slate-400 text-[10px]">Hex NOT Gate</div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-sky-400 font-bold text-base">7408</div>
                  <div className="text-slate-400 text-[10px]">Quad AND Gate</div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-emerald-400 font-bold text-base">7432</div>
                  <div className="text-slate-400 text-[10px]">Quad OR Gate</div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-amber-400 font-bold text-base">7400</div>
                  <div className="text-slate-400 text-[10px]">Quad NAND Gate</div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-cyan-400 font-bold text-base">7402</div>
                  <div className="text-slate-400 text-[10px]">Quad NOR Gate</div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-purple-400 font-bold text-base">7486</div>
                  <div className="text-slate-400 text-[10px]">Quad XOR Gate</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MASTER PYTHON SCRIPT */}
        {activeTab === 'python' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-emerald-400" />
                <span className="text-xs font-mono font-bold text-white">module_002_boolean_logic_master_lab.py</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition cursor-pointer"
                >
                  {copiedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
                <button
                  onClick={handleDownloadPython}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg shadow transition cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download .py</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 overflow-x-auto max-h-[600px] overflow-y-auto font-mono text-xs text-slate-300">
              <pre className="whitespace-pre">{pythonMasterScript}</pre>
            </div>
          </div>
        )}

        {/* TAB 3: FAQS */}
        {activeTab === 'faqs' && (
          <FAQTemplate
            title="CBSE Class XI Computer Science (083) – Module 002 Comprehensive FAQs"
            questions={questions}
          />
        )}

        {/* TAB 4: PRINTABLE DOCUMENT */}
        {activeTab === 'notes' && (
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XI CS 083 – Module 002 Complete Revision Handbook"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Revision Note"
            downloadFileName="module_002_boolean_logic_handbook.txt"
          />
        )}

        {/* Teacher Note */}
        <Teacher
          note="Make sure to download and test the master Python digital logic suite locally using 'python module_002_boolean_logic_master_lab.py'. It reinforces how Boolean algebra powers binary circuits and helps you excel in CBSE Class XI Computer Science practicals and theory examinations alike! — Sukanta Hui"
        />

      </div>
    </div>
  );
}
