import React, { useState } from 'react';
import { 
  Download, FileText, Code, BookOpen, CheckCircle2, 
  Layers, HelpCircle, ShieldCheck, Printer, Copy, Check 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";
import sqlMasterScript from "./topic9_files/module_001_master_lab.sql?raw";

export default function Topic9() {
  const [copiedSql, setCopiedSql] = useState(false);
  const [activeTab, setActiveTab] = useState('resources');

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlMasterScript);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const handleDownloadSql = () => {
    const blob = new Blob([sqlMasterScript], { type: 'text/sql;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "001_relational_database_master.sql";
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
                Module 001 · Topic 9
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Downloadable Revision Hub
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Downloadable Documents &amp; Master Laboratory Scripts
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Export offline study notes, printable formula cheat sheets, and complete SQL initialization scripts for hands-on practice.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'resources', label: '1. Download Center', icon: Download },
            { id: 'sql', label: '2. Master SQL Script', icon: Code },
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
                <h3 className="text-base font-bold text-white">Module 001 Complete Note</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Comprehensive 15-page textbook-aligned revision guide covering all 9 theoretical concepts with diagrams.
                </p>
                <button
                  onClick={() => setActiveTab('notes')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold rounded-xl transition"
                >
                  <Printer size={14} />
                  Print / Download Text Note
                </button>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-emerald-500/40 transition">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                  <Code size={20} />
                </div>
                <h3 className="text-base font-bold text-white">Master SQL Lab Script</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ready-to-run .sql file creating all master tables, foreign keys, cascade triggers, and sample data.
                </p>
                <button
                  onClick={handleDownloadSql}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl transition"
                >
                  <Download size={14} />
                  Download Master .sql File
                </button>
              </div>

            </div>

            <Teacher note="Before sitting for your CBSE Class XII IT (802) board exam or pre-board test, ensure you have executed the master SQL script on your local MySQL server! — Sukanta Hui" />
          </div>
        )}

        {/* TAB 2: SQL MASTER */}
        {activeTab === 'sql' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white">001_relational_database_master.sql</h3>
                  <p className="text-xs text-slate-400">Complete SQL DDL and DML Environment Setup</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopySql}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700 transition"
                  >
                    {copiedSql ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    {copiedSql ? 'Copied' : 'Copy SQL'}
                  </button>
                  <button
                    onClick={handleDownloadSql}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold rounded-lg transition"
                  >
                    <Download size={14} />
                    Download .sql
                  </button>
                </div>
              </div>

              <pre className="bg-slate-950 p-4 rounded-xl text-slate-200 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800 leading-relaxed max-h-[500px]">
                <code>{sqlMasterScript}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate
              title="Topic 9 · Module 001 Review FAQs &amp; Board Questions"
              questions={questions}
            />
          </div>
        )}

        {/* TAB 4: PRINTABLE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              filename="topic9_module001_full_revision_note.txt"
              title="CBSE Class XII IT 802 – Module 001 Complete Revision Handbook"
              hidePreview={false}
              showDownload={true}
            />
          </div>
        )}

      </div>
    </div>
  );
}
