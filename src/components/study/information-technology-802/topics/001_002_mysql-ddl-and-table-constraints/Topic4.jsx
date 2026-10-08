import React, { useState } from 'react';
import { 
  ShieldCheck, Key, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Layers 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

export default function Topic4() {
  const [activeTab, setActiveTab] = useState('constraints');

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002 · Topic 4
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                SQL Integrity Constraints
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Column Constraints: PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT, and CHECK
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the 5 core integrity constraints. Learn how they prevent invalid data entry, differentiate PRIMARY KEY from UNIQUE, and enforce domain business rules.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'constraints', label: '1. The 5 Core Constraints', icon: ShieldCheck },
            { id: 'pkvsunique', label: '2. PRIMARY KEY vs UNIQUE', icon: Key },
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

        {/* TAB 1: THE 5 CONSTRAINTS */}
        {activeTab === 'constraints' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <div className="bg-slate-800/40 border border-sky-500/30 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-sky-400 font-mono uppercase">1. PRIMARY KEY</span>
                <h4 className="font-bold text-white text-base">Entity Identifier</h4>
                <p className="text-xs text-slate-300">
                  Uniquely identifies each tuple in the relation. Implicitly enforces <strong>UNIQUE + NOT NULL</strong>. Strictly <strong>ONE</strong> per table.
                </p>
                <div className="p-2 bg-slate-950 rounded text-xs font-mono text-sky-300">RollNo INT PRIMARY KEY</div>
              </div>

              <div className="bg-slate-800/40 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-emerald-400 font-mono uppercase">2. NOT NULL</span>
                <h4 className="font-bold text-white text-base">Mandatory Field</h4>
                <p className="text-xs text-slate-300">
                  Rejects blank / missing (NULL) values during row insertion. Guarantees essential fields are always filled.
                </p>
                <div className="p-2 bg-slate-950 rounded text-xs font-mono text-emerald-300">FullName VARCHAR(50) NOT NULL</div>
              </div>

              <div className="bg-slate-800/40 border border-amber-500/30 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-amber-400 font-mono uppercase">3. UNIQUE</span>
                <h4 className="font-bold text-white text-base">No Duplicates</h4>
                <p className="text-xs text-slate-300">
                  Ensures all values are distinct. <strong>Multiple UNIQUE columns allowed</strong> per table. Accepts NULL values.
                </p>
                <div className="p-2 bg-slate-950 rounded text-xs font-mono text-amber-300">Email VARCHAR(80) UNIQUE</div>
              </div>

              <div className="bg-slate-800/40 border border-purple-500/30 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-purple-400 font-mono uppercase">4. DEFAULT</span>
                <h4 className="font-bold text-white text-base">Fallback Value</h4>
                <p className="text-xs text-slate-300">
                  Automatically assigns a predefined literal if the column is omitted in an INSERT command.
                </p>
                <div className="p-2 bg-slate-950 rounded text-xs font-mono text-purple-300">City VARCHAR(30) DEFAULT 'Barrackpore'</div>
              </div>

              <div className="bg-slate-800/40 border border-rose-500/30 rounded-2xl p-5 space-y-2 lg:col-span-2">
                <span className="text-xs font-bold text-rose-400 font-mono uppercase">5. CHECK</span>
                <h4 className="font-bold text-white text-base">Domain Value Validator</h4>
                <p className="text-xs text-slate-300">
                  Validates that inserted values satisfy a Boolean expression (e.g. valid age ranges, marks between 0 and 100).
                </p>
                <div className="p-2 bg-slate-950 rounded text-xs font-mono text-rose-300">
                  Age INT CHECK (Age &gt;= 18 AND Age &lt;= 65)
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: PK VS UNIQUE */}
        {activeTab === 'pkvsunique' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">PRIMARY KEY vs UNIQUE (Board Exam Comparison)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-950/60 text-sky-300">
                      <th className="p-3">Feature</th>
                      <th className="p-3 text-sky-400">PRIMARY KEY</th>
                      <th className="p-3 text-amber-400">UNIQUE Key</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 text-xs">
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3 font-bold text-white">Count per Table</td>
                      <td className="p-3 text-sky-300 font-bold">Strictly ONE primary key per table</td>
                      <td className="p-3 text-amber-300 font-bold">MULTIPLE unique keys allowed per table</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3 font-bold text-white">Accepts NULLs?</td>
                      <td className="p-3 text-rose-400 font-bold">NO (Strictly rejects NULLs)</td>
                      <td className="p-3 text-emerald-400 font-bold">YES (Accepts NULL values)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3 font-bold text-white">Primary Purpose</td>
                      <td className="p-3">Uniquely identifies each record/tuple</td>
                      <td className="p-3">Enforces distinctness on alternate candidate keys</td>
                    </tr>
                  </tbody>
                </table>
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
                  <span>Column Constraints Demonstration</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">MySQL 8.0</span>
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl overflow-x-auto text-xs sm:text-sm text-emerald-400 font-mono leading-relaxed border border-slate-800/80">
                <code>{`CREATE TABLE EmployeeDirectory (
    EmpCode INT PRIMARY KEY,
    FullName VARCHAR(50) NOT NULL,
    OfficialEmail VARCHAR(80) UNIQUE NOT NULL,
    AadhaarNumber CHAR(12) UNIQUE,
    Age INT NOT NULL CHECK (Age >= 18 AND Age <= 65),
    BasicSalary DECIMAL(10,2) NOT NULL CHECK (BasicSalary >= 15000.00),
    City VARCHAR(30) DEFAULT 'Barrackpore',
    Status VARCHAR(15) DEFAULT 'Active'
);

-- Valid Insert
INSERT INTO EmployeeDirectory (EmpCode, FullName, OfficialEmail, AadhaarNumber, Age, BasicSalary)
VALUES (5001, 'Mamata Sharma', 'mamata.sharma@org.in', '987654321012', 24, 45000.00);`}</code>
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
                  <h4 className="font-bold">1. PRIMARY KEY = UNIQUE + NOT NULL</h4>
                  <p className="text-slate-300">
                    If a board question asks: "Which single constraint is equivalent to UNIQUE + NOT NULL and identifies each record?", the answer is <strong>PRIMARY KEY</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 4 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 6: PRINTABLE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              title="CBSE Class XII IT 802 – Column Constraints Revision Sheet"
              stampEnabled={true}
              showDownload={true}
              downloadButtonText="Download Plain Text Note"
              downloadFileName="topic4_column_constraints_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="Remember: A table can have only ONE Primary Key, but multiple UNIQUE keys. PRIMARY KEY rejects NULLs; UNIQUE allows NULLs! — Sukanta Hui" />

      </div>
    </div>
  );
}