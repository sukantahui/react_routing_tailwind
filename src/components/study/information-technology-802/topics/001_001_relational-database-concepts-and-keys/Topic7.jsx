import React, { useState } from 'react';
import { 
  Network, Users, ShieldCheck, AlertTriangle, CheckCircle2, 
  Layers, BookOpen, Code, HelpCircle, FileText, ArrowRight, Sparkles 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

export default function Topic7() {
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
                Module 001 · Topic 7
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Recursive Relational Schemas
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Self-Referencing Foreign Keys: Primary Key References Column in Same Table
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Learn how recursive table relationships model employee-manager reporting chains, hierarchical category trees, and self-joins in SQL.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'overview', label: '1. Recursive Concepts', icon: BookOpen },
            { id: 'code', label: '2. Self-Join SQL Lab', icon: Code },
            { id: 'pitfalls', label: '3. Board Pitfalls & Tips', icon: AlertTriangle },
            { id: 'faqs', label: '4. FAQs & Practice (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '5. Printable Document', icon: FileText }
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
                <span className="text-xs font-bold text-sky-400 uppercase">Concept</span>
                <h3 className="text-base font-bold text-white">What is a Self-Referencing Key?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A foreign key column in a table that points directly to the Primary Key of the <strong>exact same table</strong>. It allows storing hierarchical relationships inside a single table.
                </p>
                <div className="text-xs font-mono text-sky-400">FOREIGN KEY (ManagerID) REFERENCES Employee(EmpID)</div>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase">The Root Node</span>
                <h3 className="text-base font-bold text-white">Why ManagerID is NULL for CEO</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The top executive (CEO/Director) does not report to anyone. Thus, their <code className="text-sky-300">ManagerID</code> is set to <code className="text-amber-300">NULL</code>, which naturally terminates the hierarchy tree.
                </p>
                <div className="text-xs font-mono text-emerald-400">CEO: ManagerID IS NULL</div>
              </div>

            </div>

            <Teacher note="In CBSE Class XII IT (802), when asked: 'Can a table reference itself in a foreign key constraint?' Answer: 'Yes, a self-referencing foreign key references the primary key of the same table to model recursive hierarchical relationships.' — Sukanta Hui" />
          </div>
        )}

        {/* TAB 2: CODE */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white">Self-Referencing Schema &amp; Self-Join Query</h3>
              <pre className="bg-slate-950 p-4 rounded-xl text-slate-200 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800 leading-relaxed">
                <code>{`CREATE TABLE CompanyHierarchy (
    EmpID INT PRIMARY KEY,
    EmpName VARCHAR(60) NOT NULL,
    Designation VARCHAR(40) NOT NULL,
    ManagerID INT,
    FOREIGN KEY (ManagerID) REFERENCES CompanyHierarchy(EmpID) ON DELETE SET NULL
);

-- Self-Join with LEFT JOIN
SELECT E.EmpName AS Employee, E.Designation, IFNULL(M.EmpName, 'Top Director') AS Manager
FROM CompanyHierarchy E
LEFT JOIN CompanyHierarchy M ON E.ManagerID = M.EmpID;`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: PITFALLS */}
        {activeTab === 'pitfalls' && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
              <AlertTriangle size={18} />
              Board Exam Traps: Self-Referencing Foreign Keys
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Always use LEFT JOIN instead of INNER JOIN; otherwise the CEO row (where ManagerID is NULL) will be filtered out!
            </p>
          </div>
        )}

        {/* TAB 4: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate
              title="Topic 7 · Self-Referencing Keys FAQs &amp; Board Questions"
              questions={questions}
            />
          </div>
        )}

        {/* TAB 5: PRINTABLE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              filename="topic7_self_referencing_keys_note.txt"
              title="CBSE Class XII IT 802 – Topic 7 Printable Quick Revision Note"
              hidePreview={false}
              showDownload={true}
            />
          </div>
        )}

      </div>
    </div>
  );
}
