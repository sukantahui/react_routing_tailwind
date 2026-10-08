import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, RefreshCw, Trash2, Edit3 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

export default function Topic7() {
  const [activeTab, setActiveTab] = useState('clauses');

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002 · Topic 7
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                ALTER TABLE Refactoring
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Modifying Columns, Renaming Columns (CHANGE), and Dropping Columns
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the exact distinctions between MODIFY, CHANGE, and DROP COLUMN. Learn how to resize datatypes, rename attributes, and remove redundant columns.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'clauses', label: '1. MODIFY vs CHANGE vs DROP', icon: BookOpen },
            { id: 'code', label: '2. SQL Schema Lab', icon: Code },
            { id: 'pitfalls', label: '3. Data Truncation Pitfalls', icon: AlertTriangle },
            { id: 'faqs', label: '4. FAQs (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '5. Printable Notes', icon: FileText }
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

        {/* TAB 1: CLAUSES */}
        {activeTab === 'clauses' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* MODIFY */}
              <div className="bg-slate-800/40 border border-sky-500/30 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-sky-400">
                  <Edit3 size={20} />
                  <h3 className="font-bold text-white text-base">1. MODIFY</h3>
                </div>
                <p className="text-xs text-slate-300">
                  Changes the <strong>datatype, width, or constraints</strong> of an existing column <em>without</em> changing its name.
                </p>
                <div className="p-3 bg-slate-950 rounded font-mono text-xs text-sky-300">
                  ALTER TABLE Student<br />
                  &nbsp;&nbsp;MODIFY StudentName VARCHAR(80) NOT NULL;
                </div>
              </div>

              {/* CHANGE */}
              <div className="bg-slate-800/40 border border-amber-500/30 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-400">
                  <RefreshCw size={20} />
                  <h3 className="font-bold text-white text-base">2. CHANGE</h3>
                </div>
                <p className="text-xs text-slate-300">
                  <strong>Renames</strong> an existing column AND optionally alters its datatype and constraints.
                </p>
                <div className="p-3 bg-slate-950 rounded font-mono text-xs text-amber-300">
                  ALTER TABLE Student<br />
                  &nbsp;&nbsp;CHANGE SName FullName VARCHAR(80);
                </div>
              </div>

              {/* DROP COLUMN */}
              <div className="bg-slate-800/40 border border-rose-500/30 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-rose-400">
                  <Trash2 size={20} />
                  <h3 className="font-bold text-white text-base">3. DROP COLUMN</h3>
                </div>
                <p className="text-xs text-slate-300">
                  <strong>Permanently deletes</strong> a column and all data stored in it. Decreases Degree by -1.
                </p>
                <div className="p-3 bg-slate-950 rounded font-mono text-xs text-rose-300">
                  ALTER TABLE Student<br />
                  &nbsp;&nbsp;DROP COLUMN Remarks;
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: CODE LAB */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-sky-400 text-sm font-bold">
                  <Terminal size={18} />
                  <span>ALTER TABLE MODIFY, CHANGE, DROP Script</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">MySQL 8.0</span>
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl overflow-x-auto text-xs sm:text-sm text-emerald-400 font-mono leading-relaxed border border-slate-800/80">
                <code>{`CREATE TABLE BookStore (
    BookID INT PRIMARY KEY,
    Title VARCHAR(30),
    Price INT,
    AuthorName VARCHAR(40),
    OldRemarks VARCHAR(100)
);

-- 1. MODIFY: Expand Title width from 30 to 80 chars
ALTER TABLE BookStore MODIFY Title VARCHAR(80) NOT NULL;

-- 2. MODIFY: Change Price datatype to DECIMAL(8,2)
ALTER TABLE BookStore MODIFY Price DECIMAL(8,2) NOT NULL DEFAULT 199.00;

-- 3. CHANGE: Rename AuthorName to PrimaryAuthor
ALTER TABLE BookStore CHANGE AuthorName PrimaryAuthor VARCHAR(60) NOT NULL;

-- 4. DROP COLUMN: Permanently remove OldRemarks column (Degree decreases by 1)
ALTER TABLE BookStore DROP COLUMN OldRemarks;

DESCRIBE BookStore;`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: PITFALLS */}
        {activeTab === 'pitfalls' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-amber-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertTriangle size={22} />
                <h3 className="text-lg font-bold text-white">Board Examination Pitfalls & Tips</h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 space-y-1">
                  <h4 className="font-bold">1. Shrinking Column Width with MODIFY</h4>
                  <p className="text-slate-300">
                    If you shrink a column (e.g. VARCHAR(100) down to VARCHAR(20)) and an existing row has 25 characters, MySQL aborts with Error 1265: Data truncated!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 7 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5: PRINTABLE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              title="CBSE Class XII IT 802 – ALTER TABLE MODIFY & CHANGE Notes"
              stampEnabled={true}
              showDownload={true}
              downloadButtonText="Download Plain Text Note"
              downloadFileName="topic7_alter_table_modify_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="MODIFY changes datatype/size without renaming. CHANGE renames column + changes datatype. DROP COLUMN permanently removes the column! — Sukanta Hui" />

      </div>
    </div>
  );
}