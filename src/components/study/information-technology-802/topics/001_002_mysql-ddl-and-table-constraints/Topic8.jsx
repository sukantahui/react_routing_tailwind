import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Trash2 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

export default function Topic8() {
  const [activeTab, setActiveTab] = useState('compare');

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-rose-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002 · Topic 8
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                High-Weightage Board Comparison
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Removing Tables: DROP TABLE (DDL) vs DELETE FROM (DML)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the critical 3-way distinction between DROP TABLE, TRUNCATE TABLE, and DELETE FROM regarding schema destruction, row filtering, rollback ability, and performance.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'compare', label: '1. 3-Way Comparison Table', icon: Layers },
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
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25 border-b-2 border-rose-400'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/40'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: 3-WAY COMPARISON */}
        {activeTab === 'compare' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">DROP vs TRUNCATE vs DELETE Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-950/60 text-sky-300 font-mono">
                      <th className="p-3">Parameter</th>
                      <th className="p-3 text-rose-400">DROP TABLE</th>
                      <th className="p-3 text-amber-400">TRUNCATE TABLE</th>
                      <th className="p-3 text-emerald-400">DELETE FROM</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 text-xs">
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3 font-bold text-white font-sans">Command Category</td>
                      <td className="p-3 font-mono font-bold text-rose-300">DDL</td>
                      <td className="p-3 font-mono font-bold text-amber-300">DDL</td>
                      <td className="p-3 font-mono font-bold text-emerald-300">DML</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3 font-bold text-white font-sans">Table Structure / Schema</td>
                      <td className="p-3 text-rose-400 font-bold">Destroyed Permanently</td>
                      <td className="p-3 text-emerald-400">Preserved Intact</td>
                      <td className="p-3 text-emerald-400">Preserved Intact</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3 font-bold text-white font-sans">WHERE Clause Filter?</td>
                      <td className="p-3 text-rose-400">NOT Supported</td>
                      <td className="p-3 text-rose-400">NOT Supported</td>
                      <td className="p-3 text-emerald-400 font-bold">SUPPORTED (WHERE col = val)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3 font-bold text-white font-sans">Can Rollback?</td>
                      <td className="p-3 text-rose-400 font-bold">NO (Auto-committed)</td>
                      <td className="p-3 text-rose-400 font-bold">NO (Auto-committed)</td>
                      <td className="p-3 text-emerald-400 font-bold">YES (In transactions)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3 font-bold text-white font-sans">Auto-Increment Counter</td>
                      <td className="p-3 text-slate-500">N/A (Table deleted)</td>
                      <td className="p-3 text-amber-300 font-bold">Resets back to 1</td>
                      <td className="p-3 text-slate-400">Does NOT reset counter</td>
                    </tr>
                  </tbody>
                </table>
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
                  <span>DROP vs TRUNCATE vs DELETE Demonstration</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">MySQL 8.0</span>
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl overflow-x-auto text-xs sm:text-sm text-emerald-400 font-mono leading-relaxed border border-slate-800/80">
                <code>{`CREATE TABLE BatchTest (
    BatchID INT PRIMARY KEY AUTO_INCREMENT,
    BatchName VARCHAR(30)
);

INSERT INTO BatchTest (BatchName) VALUES ('Batch A'), ('Batch B'), ('Batch C');

-- 1. DELETE (DML): Removes specific row; schema stays; can ROLLBACK
DELETE FROM BatchTest WHERE BatchName = 'Batch C';

-- 2. TRUNCATE (DDL): Empties all rows instantly; resets AUTO_INCREMENT to 1
TRUNCATE TABLE BatchTest;

-- 3. DROP TABLE (DDL): Table definition completely erased from catalog
DROP TABLE IF EXISTS BatchTest;`}</code>
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
                  <h4 className="font-bold">1. DROP TABLE vs DELETE FROM</h4>
                  <p className="text-slate-300">
                    If asked: <em>"Which command removes the records but retains table structure for future insertions?"</em> &rarr; The answer is <strong>DELETE FROM table_name;</strong> (or TRUNCATE). If asked: <em>"Which command destroys both structure and data?"</em> &rarr; <strong>DROP TABLE table_name;</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 8 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5: PRINTABLE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              title="CBSE Class XII IT 802 – DROP vs DELETE Notes"
              stampEnabled={true}
              showDownload={true}
              downloadButtonText="Download Plain Text Note"
              downloadFileName="topic8_drop_vs_delete_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="DROP TABLE destroys table structure and data permanently. DELETE FROM removes tuples while keeping the structure ready for new rows! — Sukanta Hui" />

      </div>
    </div>
  );
}