import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Play, ArrowRight, RefreshCw 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

const InteractiveSandbox = () => {
  const [selectedCommand, setSelectedCommand] = useState('DELETE_WHERE');

  const comparison = {
    DELETE_WHERE: {
      sql: "DELETE FROM Student WHERE RollNo = 105;",
      type: "DML (Tuple Level)",
      structure: "Intact (Schema Preserved)",
      cardinality: "Decreases by matching rows",
      degree: "Unchanged (Columns preserved)",
      rollback: "Yes (Transactional)"
    },
    DELETE_ALL: {
      sql: "DELETE FROM Student;",
      type: "DML (Tuple Level)",
      structure: "Intact (Empty table remains)",
      cardinality: "Becomes exactly 0",
      degree: "Unchanged",
      rollback: "Yes (Transactional)"
    },
    TRUNCATE: {
      sql: "TRUNCATE TABLE Student;",
      type: "DDL (Structural Reset)",
      structure: "Deallocated & Recreated",
      cardinality: "Becomes exactly 0 (Fast)",
      degree: "Unchanged",
      rollback: "No (Auto-committed)"
    },
    DROP: {
      sql: "DROP TABLE Student;",
      type: "DDL (Schema Destruction)",
      structure: "Completely Removed from DB",
      cardinality: "Table ceases to exist",
      degree: "Destroyed (Schema gone)",
      rollback: "No (Permanent)"
    }
  };

  const curr = comparison[selectedCommand];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Layers size={20} />
          <span>3-Way Command Matrix: DELETE vs TRUNCATE vs DROP</span>
        </div>

        {/* Command Selector Buttons */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'DELETE_WHERE', label: '1. DELETE FROM ... WHERE', color: 'sky' },
            { id: 'DELETE_ALL', label: '2. DELETE FROM (All Rows)', color: 'amber' },
            { id: 'TRUNCATE', label: '3. TRUNCATE TABLE', color: 'purple' },
            { id: 'DROP', label: '4. DROP TABLE (Destructive)', color: 'rose' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setSelectedCommand(btn.id)}
              className={"px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer " + (selectedCommand === btn.id ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25' : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white')}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Code Box */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-sky-400">SQL Statement:</div>
          <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-emerald-400">
            <code>{curr.sql}</code>
          </pre>
        </div>

        {/* Comparison Properties */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-400 block font-semibold">Language Category:</span>
            <span className="font-bold text-sky-300">{curr.type}</span>
          </div>
          <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-400 block font-semibold">Table Schema Structure:</span>
            <span className="font-bold text-emerald-300">{curr.structure}</span>
          </div>
          <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-400 block font-semibold">Cardinality (Row Count):</span>
            <span className="font-bold text-amber-300">{curr.cardinality}</span>
          </div>
          <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-400 block font-semibold">Degree (Column Count):</span>
            <span className="font-bold text-sky-300">{curr.degree}</span>
          </div>
          <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-400 block font-semibold">Rollback Support:</span>
            <span className="font-bold text-emerald-400">{curr.rollback}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function Topic3() {
  const [activeTab, setActiveTab] = useState('concept');

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 003 · Topic 3
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                DML Row Removal
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              DELETE FROM Statement: Removing Specific Rows
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understand row deletion with DELETE WHERE and master the 3-way contrast between DELETE, DROP, and TRUNCATE.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Conceptual Rules & Sandbox', icon: BookOpen },
            { id: 'code', label: '2. SQL Script Lab', icon: Code },
            { id: 'pitfalls', label: '3. Board Pitfalls & Tips', icon: AlertTriangle },
            { id: 'faqs', label: '4. FAQs (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '5. Printable Notes', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={"flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer " + (
                  activeTab === tab.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 border-b-2 border-sky-400'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/40'
                )}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1 */}
        {activeTab === 'concept' && <InteractiveSandbox />}

        {/* TAB 2 */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-sky-400 text-sm font-bold">
                  <Terminal size={18} />
                  <span>MySQL 8.0 Workbench Master Script</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">DML Laboratory</span>
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl overflow-x-auto text-xs sm:text-sm text-emerald-400 font-mono leading-relaxed border border-slate-800/80">
                <code>{"-- Removing a specific record by primary key\nDELETE FROM Student WHERE RollNo = 105;\n\n-- Removing records meeting criteria\nDELETE FROM Student WHERE TotalMarks < 40;"}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3 */}
        {activeTab === 'pitfalls' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-amber-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertTriangle size={22} />
                <h3 className="text-lg font-bold text-white">Board Examination Pitfalls & Tips</h3>
              </div>
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs sm:text-sm text-amber-200">
                <strong>Mentor Advice:</strong> DELETE clears rows (Cardinality = 0, Degree intact). DROP destroys the entire table schema definition! — Sukanta Hui
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 3 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5 */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              title="CBSE Class XII IT 802 – Quick Revision Document"
              stampEnabled={true}
              showDownload={true}
              downloadButtonText="Download Plain Text Note"
              downloadFileName="topic3_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="DELETE clears rows (Cardinality = 0, Degree intact). DROP destroys the entire table schema definition! — Sukanta Hui" />

      </div>
    </div>
  );
}
