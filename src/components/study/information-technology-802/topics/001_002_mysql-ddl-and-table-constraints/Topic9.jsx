import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Search 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

export default function Topic9() {
  const [activeTab, setActiveTab] = useState('describe');

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002 · Topic 9
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Schema Diagnostics & Metadata
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Viewing and Verifying Database Schema: DESCRIBE and SHOW CREATE TABLE
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master schema inspection commands. Learn how to interpret the 6 columns of DESCRIBE output (Field, Type, Null, Key: PRI/UNI/MUL, Default, Extra) and reverse-engineer DDL scripts.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'describe', label: '1. Deconstructing DESCRIBE', icon: Search },
            { id: 'code', label: '2. SQL Schema Lab', icon: Code },
            { id: 'pitfalls', label: '3. Board Pitfalls', icon: AlertTriangle },
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

        {/* TAB 1: DESCRIBE OUTPUT */}
        {activeTab === 'describe' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">The 6 Metadata Columns in DESCRIBE Output</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse font-mono">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-950/60 text-sky-300">
                      <th className="p-3">Field</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Null</th>
                      <th className="p-3 text-amber-300">Key</th>
                      <th className="p-3">Default</th>
                      <th className="p-3">Extra</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 text-xs">
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3 font-bold text-white">RollNo</td>
                      <td className="p-3 text-sky-400">int</td>
                      <td className="p-3 text-rose-400">NO</td>
                      <td className="p-3 text-amber-400 font-bold">PRI</td>
                      <td className="p-3 text-slate-500">NULL</td>
                      <td className="p-3 text-emerald-400">auto_increment</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3 font-bold text-white">FullName</td>
                      <td className="p-3 text-sky-400">varchar(50)</td>
                      <td className="p-3 text-rose-400">NO</td>
                      <td className="p-3 text-slate-500">-</td>
                      <td className="p-3 text-slate-500">NULL</td>
                      <td className="p-3 text-slate-500">-</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3 font-bold text-white">Email</td>
                      <td className="p-3 text-sky-400">varchar(80)</td>
                      <td className="p-3 text-emerald-400">YES</td>
                      <td className="p-3 text-amber-400 font-bold">UNI</td>
                      <td className="p-3 text-slate-500">NULL</td>
                      <td className="p-3 text-slate-500">-</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3 font-bold text-white">City</td>
                      <td className="p-3 text-sky-400">varchar(30)</td>
                      <td className="p-3 text-emerald-400">YES</td>
                      <td className="p-3 text-slate-500">-</td>
                      <td className="p-3 text-purple-300">'Barrackpore'</td>
                      <td className="p-3 text-slate-500">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <strong className="text-amber-400 block font-mono">Key = 'PRI'</strong>
                  <span className="text-slate-400">Identifies the Primary Key column.</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <strong className="text-amber-400 block font-mono">Key = 'UNI'</strong>
                  <span className="text-slate-400">Identifies a UNIQUE constraint column.</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <strong className="text-amber-400 block font-mono">Key = 'MUL'</strong>
                  <span className="text-slate-400">Identifies a Foreign Key or non-unique index.</span>
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
                  <span>Schema Inspection Commands</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">MySQL 8.0</span>
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl overflow-x-auto text-xs sm:text-sm text-emerald-400 font-mono leading-relaxed border border-slate-800/80">
                <code>{`-- 1. Tabular column inspection
DESCRIBE Student;
-- Shorthand equivalent:
DESC Student;

-- 2. Exact DDL Re-generation Script
SHOW CREATE TABLE Student;`}</code>
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
                  <h4 className="font-bold">1. DESCRIBE vs SHOW TABLES</h4>
                  <p className="text-slate-300">
                    <code className="text-sky-300 font-mono">SHOW TABLES;</code> lists the names of all tables in the active database. <code className="text-amber-300 font-mono">DESCRIBE table_name;</code> displays the internal columns, types, and constraints of one specific table.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 9 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5: PRINTABLE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              title="CBSE Class XII IT 802 – Schema Verification Notes"
              stampEnabled={true}
              showDownload={true}
              downloadButtonText="Download Plain Text Note"
              downloadFileName="topic9_describe_schema_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="In practical exams and viva: DESCRIBE table_name shows columns and types; SHOW CREATE TABLE gives the exact SQL statement! — Sukanta Hui" />

      </div>
    </div>
  );
}