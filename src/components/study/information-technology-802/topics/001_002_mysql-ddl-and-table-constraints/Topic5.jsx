import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Key, GitBranch 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

export default function Topic5() {
  const [activeTab, setActiveTab] = useState('cascade');

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002 · Topic 5
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Referential Integrity & Cascades
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Foreign Key Constraints & Cascade Operations: ON DELETE CASCADE
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understand parent-child table relationships, referential integrity rules, and what happens when rows are deleted or updated under CASCADE, RESTRICT, and SET NULL.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'cascade', label: '1. The 4 Cascade Actions', icon: GitBranch },
            { id: 'example', label: '2. Parent-Child Visual Flow', icon: Layers },
            { id: 'code', label: '3. SQL Schema Lab', icon: Code },
            { id: 'pitfalls', label: '4. Board Pitfalls', icon: AlertTriangle },
            { id: 'faqs', label: '5. FAQs (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '6. Printable Notes', icon: FileText }
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

        {/* TAB 1: 4 ACTIONS */}
        {activeTab === 'cascade' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="bg-slate-800/40 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-emerald-400 font-mono">1. ON DELETE CASCADE</span>
                <h4 className="font-bold text-white text-base">Automatic Child Row Deletion</h4>
                <p className="text-xs text-slate-300">
                  When a parent row is deleted, MySQL <strong>automatically deletes all matching child records</strong> referencing that parent. Prevents orphan records.
                </p>
              </div>

              <div className="bg-slate-800/40 border border-rose-500/30 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-rose-400 font-mono">2. ON DELETE RESTRICT (Default)</span>
                <h4 className="font-bold text-white text-base">Blocks Deletion with Error</h4>
                <p className="text-xs text-slate-300">
                  If any child records reference the parent row, MySQL <strong>blocks the deletion</strong> with Error 1451. Protects against accidental data destruction.
                </p>
              </div>

              <div className="bg-slate-800/40 border border-amber-500/30 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-amber-400 font-mono">3. ON DELETE SET NULL</span>
                <h4 className="font-bold text-white text-base">Converts Child Foreign Key to NULL</h4>
                <p className="text-xs text-slate-300">
                  When the parent row is deleted, the matching child foreign key values are automatically updated to <strong>NULL</strong>.
                </p>
              </div>

              <div className="bg-slate-800/40 border border-sky-500/30 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-sky-400 font-mono">4. ON UPDATE CASCADE</span>
                <h4 className="font-bold text-white text-base">Synchronizes Primary Key Changes</h4>
                <p className="text-xs text-slate-300">
                  If a parent's Primary Key value is changed, all referencing child Foreign Key values are <strong>automatically updated</strong> to match.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: VISUAL FLOW */}
        {activeTab === 'example' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">Department (Parent) & Staff (Child) Example</h3>
              <p className="text-xs text-slate-300">
                Suppose <code className="text-sky-300 font-mono">Department (Parent)</code> has DeptID = 10 ('Computer Science'), and <code className="text-emerald-300 font-mono">Staff (Child)</code> has 2 teachers in DeptID = 10:
              </p>
              
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                <div className="text-rose-400 font-bold">SQL Execution: DELETE FROM Department WHERE DeptID = 10;</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                  <div className="p-3 bg-slate-900 rounded border border-slate-800">
                    <span className="text-emerald-400 font-bold block mb-1">If ON DELETE CASCADE:</span>
                    MySQL deletes Dept 10 AND automatically deletes both staff members in Dept 10!
                  </div>
                  <div className="p-3 bg-slate-900 rounded border border-slate-800">
                    <span className="text-rose-400 font-bold block mb-1">If ON DELETE RESTRICT (Default):</span>
                    MySQL blocks the delete command and throws: <em>Cannot delete or update a parent row: a foreign key constraint fails</em>!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CODE LAB */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-sky-400 text-sm font-bold">
                  <Terminal size={18} />
                  <span>ON DELETE CASCADE Master Script</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">MySQL 8.0</span>
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl overflow-x-auto text-xs sm:text-sm text-emerald-400 font-mono leading-relaxed border border-slate-800/80">
                <code>{`-- 1. Parent Table: Department
CREATE TABLE Department (
    DeptID INT PRIMARY KEY,
    DeptName VARCHAR(40) NOT NULL
);

-- 2. Child Table: Staff with CASCADE
CREATE TABLE Staff (
    StaffID INT PRIMARY KEY,
    StaffName VARCHAR(50) NOT NULL,
    DeptID INT,
    CONSTRAINT FK_StaffDept FOREIGN KEY (DeptID)
        REFERENCES Department(DeptID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO Department VALUES (10, 'Computer Science');
INSERT INTO Staff VALUES (1001, 'Sukanta Hui', 10), (1002, 'Mamata Sharma', 10);

-- Deleting Dept 10 will automatically delete Staff 1001 and 1002!
DELETE FROM Department WHERE DeptID = 10;`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 4: PITFALLS */}
        {activeTab === 'pitfalls' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-amber-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertTriangle size={22} />
                <h3 className="text-lg font-bold text-white">Board Examination Pitfalls & Tips</h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 space-y-1">
                  <h4 className="font-bold">1. Which table contains the Foreign Key?</h4>
                  <p className="text-slate-300">
                    The <strong>Child table</strong> contains the Foreign Key column referencing the Primary Key of the <strong>Parent table</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 5 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 6: PRINTABLE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              title="CBSE Class XII IT 802 – Foreign Keys & CASCADE Revision Sheet"
              stampEnabled={true}
              showDownload={true}
              downloadButtonText="Download Plain Text Note"
              downloadFileName="topic5_foreign_key_cascade_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="In board exams, ON DELETE CASCADE means deleting a parent automatically wipes matching child records. RESTRICT blocks the delete! — Sukanta Hui" />

      </div>
    </div>
  );
}