import React, { useState } from 'react';
import { 
  Network, ShieldCheck, AlertTriangle, CheckCircle2, XCircle, 
  Layers, BookOpen, Code, HelpCircle, FileText, ArrowRight, Trash2, Sparkles 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

const ParentChildSchemaSVG = () => {
  const [cascadeDeleted, setCascadeDeleted] = useState(false);

  return (
    <div className="w-full bg-slate-950/80 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <h4 className="text-sm font-bold text-white">Referential Integrity & ON DELETE CASCADE Simulation</h4>
          <p className="text-xs text-slate-400">Observe parent-child relational links and cascade deletion behavior</p>
        </div>
        <button
          onClick={() => setCascadeDeleted(!cascadeDeleted)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            cascadeDeleted
              ? 'bg-emerald-500 text-white shadow'
              : 'bg-rose-500 hover:bg-rose-600 text-white shadow'
          }`}
        >
          {cascadeDeleted ? (
            <>
              <CheckCircle2 size={14} />
              Restore Parent P001 & Children
            </>
          ) : (
            <>
              <Trash2 size={14} />
              Simulate: DELETE Parent P001 (Subhash Das)
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Parent Table Box */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-sky-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 bg-sky-500/20 text-sky-300 text-xs font-bold rounded uppercase">
              Parent Table (Referenced)
            </span>
            <span className="text-xs font-mono text-slate-400">PARENTS</span>
          </div>

          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="p-2 text-left text-sky-400">ParentID (PK)</th>
                <th className="p-2 text-left">ParentName</th>
                <th className="p-2 text-left">City</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {!cascadeDeleted && (
                <tr className="bg-sky-500/10 text-sky-200">
                  <td className="p-2 font-bold text-sky-400">P001</td>
                  <td className="p-2">Subhash Das</td>
                  <td className="p-2">Barrackpore</td>
                </tr>
              )}
              <tr>
                <td className="p-2 font-bold text-sky-400">P002</td>
                <td className="p-2 text-slate-300">Biplab Roy</td>
                <td className="p-2 text-slate-400">Barrackpore</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-sky-400">P003</td>
                <td className="p-2 text-slate-300">Tapan Pal</td>
                <td className="p-2 text-slate-400">Naihati</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Child Table Box */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-emerald-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded uppercase">
              Child Table (Dependent)
            </span>
            <span className="text-xs font-mono text-slate-400">STUDENT</span>
          </div>

          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="p-2 text-left text-emerald-400">StudentID</th>
                <th className="p-2 text-left">StudentName</th>
                <th className="p-2 text-left text-amber-400">ParentID (FK)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {!cascadeDeleted && (
                <tr className="bg-sky-500/10 text-sky-200">
                  <td className="p-2 font-bold">S101</td>
                  <td className="p-2">Mamata Das</td>
                  <td className="p-2 font-bold text-amber-400">P001 → [PARENTS]</td>
                </tr>
              )}
              <tr>
                <td className="p-2 font-bold text-slate-300">S102</td>
                <td className="p-2 text-slate-300">Susmita Roy</td>
                <td className="p-2 font-bold text-amber-400">P002 → [PARENTS]</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-slate-300">S103</td>
                <td className="p-2 text-slate-300">Debangshu Pal</td>
                <td className="p-2 font-bold text-amber-400">P003 → [PARENTS]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 font-sans flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Network size={16} className="text-sky-400" />
          <span>
            {cascadeDeleted
              ? "⚡ CASCADE TRIGGERED: When Parent 'P001' was deleted, Student 'S101' was purged automatically!"
              : "✓ Referential Integrity Active: Foreign key ParentID in STUDENT strictly matches Primary Key in PARENTS."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Topic6() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 001 · Topic 6
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Relational Integrity Rules
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Foreign Key & Referential Integrity: Parent vs Dependent (Child) Tables
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understand cross-table linkages, referential integrity rules, sequence constraints, and ON DELETE CASCADE behaviors in MySQL.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'overview', label: '1. Foreign Key Rules', icon: BookOpen },
            { id: 'simulation', label: '2. Parent-Child Visualizer', icon: Layers },
            { id: 'code', label: '3. SQL Schema Lab', icon: Code },
            { id: 'cascade', label: '4. Cascade Actions', icon: Sparkles },
            { id: 'pitfalls', label: '5. Board Pitfalls & Tips', icon: AlertTriangle },
            { id: 'faqs', label: '6. FAQs & Practice (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '7. Printable Document', icon: FileText }
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

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-3">
                <span className="text-xs font-bold text-sky-400 uppercase">Referenced Table</span>
                <h3 className="text-base font-bold text-white">Parent Table</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Holds the master record and defines the Primary Key. Rows in this table must be created BEFORE child rows can reference them.
                </p>
                <div className="text-xs font-mono text-sky-400">Example: PARENTS (ParentID is PK)</div>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase">Referencing Table</span>
                <h3 className="text-base font-bold text-white">Child (Dependent) Table</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Holds the Foreign Key column pointing to the Parent table's Primary Key. Enforces referential integrity.
                </p>
                <div className="text-xs font-mono text-emerald-400">Example: STUDENT (ParentID is FK)</div>
              </div>

            </div>

            {/* Sequence Rules */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck size={18} className="text-sky-400" />
                Data Operation Sequencing Rules
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <strong className="text-emerald-400 block mb-1">Insertion Rule:</strong>
                  Insert into Parent table FIRST, then into Child table.
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <strong className="text-rose-400 block mb-1">Deletion Rule:</strong>
                  Delete from Child table FIRST, then from Parent table (unless CASCADE is active).
                </div>
              </div>
            </div>

            <Teacher note="In the CBSE IT (802) board exam, remember: Foreign keys CAN contain duplicate values (representing 1-to-many relationships) and CAN contain NULL values. Primary keys NEVER allow duplicates or NULLs! — Sukanta Hui" />
          </div>
        )}

        {/* TAB 2: SIMULATION */}
        {activeTab === 'simulation' && (
          <div className="space-y-6">
            <ParentChildSchemaSVG />
          </div>
        )}

        {/* TAB 3: CODE DEMO */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Defining Foreign Keys with ON DELETE CASCADE</h3>
                <span className="text-xs text-slate-400 font-mono">07_foreign_keys_referential_integrity.sql</span>
              </div>
              <pre className="bg-slate-950 p-4 rounded-xl text-slate-200 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800 leading-relaxed">
                <code>{`-- 1. Create Parent Table First
CREATE TABLE PARENTS (
    ParentID VARCHAR(10) PRIMARY KEY,
    ParentName VARCHAR(60) NOT NULL
);

-- 2. Create Dependent Child Table with FK
CREATE TABLE STUDENT (
    StudentID VARCHAR(10) PRIMARY KEY,
    StudentName VARCHAR(60) NOT NULL,
    ParentID VARCHAR(10),
    CONSTRAINT fk_student_parent 
        FOREIGN KEY (ParentID) 
        REFERENCES PARENTS(ParentID)
        ON DELETE CASCADE
);`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 4: CASCADE ACTIONS */}
        {activeTab === 'cascade' && (
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Foreign Key Referential Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <span className="font-bold text-rose-400">ON DELETE CASCADE</span>
                <p className="text-slate-300">Automatically deletes corresponding child records when parent is removed.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <span className="font-bold text-amber-400">ON DELETE SET NULL</span>
                <p className="text-slate-300">Automatically sets child foreign key to NULL when parent is deleted.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <span className="font-bold text-sky-400">ON DELETE RESTRICT</span>
                <p className="text-slate-300">Prevents deletion of parent as long as any child references exist.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PITFALLS & TIPS */}
        {activeTab === 'pitfalls' && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
              <AlertTriangle size={18} />
              Board Exam Traps: Foreign Keys
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              <p>• <strong>Table Drop Order:</strong> You CANNOT drop a Parent table before dropping its Child table.</p>
              <p>• <strong>Data Type Matching:</strong> Foreign Key and referenced Primary Key must share identical data types.</p>
            </div>
          </div>
        )}

        {/* TAB 6: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate
              title="Topic 6 · Foreign Keys & Integrity FAQs & Board Questions"
              questions={questions}
            />
          </div>
        )}

        {/* TAB 7: PRINTABLE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              filename="topic6_foreign_keys_note.txt"
              title="CBSE Class XII IT 802 – Topic 6 Printable Quick Revision Note"
              hidePreview={false}
              showDownload={true}
            />
          </div>
        )}

      </div>
    </div>
  );
}
