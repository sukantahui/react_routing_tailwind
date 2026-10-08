import React, { useState } from 'react';
import { 
  HelpCircle, AlertTriangle, CheckCircle2, XCircle, 
  Layers, BookOpen, Code, FileText, ArrowRight, ShieldCheck, Sparkles 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

const ThreeValuedLogicSVG = () => {
  const [operator, setOperator] = useState('AND');

  const truthTables = {
    AND: [
      { a: "TRUE", b: "TRUE", res: "TRUE", color: "text-emerald-400" },
      { a: "TRUE", b: "FALSE", res: "FALSE", color: "text-rose-400" },
      { a: "TRUE", b: "UNKNOWN", res: "UNKNOWN", color: "text-amber-400" },
      { a: "FALSE", b: "UNKNOWN", res: "FALSE", color: "text-rose-400" },
      { a: "UNKNOWN", b: "UNKNOWN", res: "UNKNOWN", color: "text-amber-400" }
    ],
    OR: [
      { a: "TRUE", b: "TRUE", res: "TRUE", color: "text-emerald-400" },
      { a: "TRUE", b: "FALSE", res: "TRUE", color: "text-emerald-400" },
      { a: "TRUE", b: "UNKNOWN", res: "TRUE", color: "text-emerald-400" },
      { a: "FALSE", b: "UNKNOWN", res: "UNKNOWN", color: "text-amber-400" },
      { a: "UNKNOWN", b: "UNKNOWN", res: "UNKNOWN", color: "text-amber-400" }
    ]
  };

  return (
    <div className="w-full bg-slate-950/80 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <h4 className="text-sm font-bold text-white">Three-Valued Logic (3VL) Interactive Truth Table</h4>
          <p className="text-xs text-slate-400">Inspect how SQL handles UNKNOWN (NULL comparisons) in boolean logic</p>
        </div>
        <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setOperator('AND')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              operator === 'AND' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            3VL AND Logic
          </button>
          <button
            onClick={() => setOperator('OR')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              operator === 'OR' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            3VL OR Logic
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="p-3 text-left">Operand A</th>
              <th className="p-3 text-center">Operator</th>
              <th className="p-3 text-left">Operand B</th>
              <th className="p-3 text-left">Evaluation Result</th>
              <th className="p-3 text-left">WHERE Clause Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {truthTables[operator].map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-900/50">
                <td className="p-3 text-slate-300 font-bold">{row.a}</td>
                <td className="p-3 text-center text-sky-400 font-bold">{operator}</td>
                <td className="p-3 text-slate-300 font-bold">{row.b}</td>
                <td className={`p-3 font-bold ${row.color}`}>{row.res}</td>
                <td className="p-3 text-slate-400">
                  {row.res === 'TRUE' ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      ✓ Row INCLUDED
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                      ✗ Row FILTERED OUT
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function Topic4() {
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
                Module 001 · Topic 4
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Three-Valued Logic &amp; Operators
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              The Concept of NULL in SQL: Unknown Values (Why '= NULL' Fails)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understand why NULL is not zero or empty string, how Three-Valued Logic operates, and why <code className="text-sky-300 font-mono">IS NULL</code> is mandatory.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'overview', label: '1. NULL Semantics', icon: BookOpen },
            { id: 'logic', label: '2. Three-Valued Logic', icon: Layers },
            { id: 'code', label: '3. SQL NULL Lab', icon: Code },
            { id: 'aggregates', label: '4. Aggregate Functions', icon: Sparkles },
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-3">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">1. NULL is Missing</span>
                <h4 className="text-sm font-bold text-white">Absence of Any Value</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Represents unassigned, unavailable, or inapplicable data. For example, a student without a registered landline number.
                </p>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">2. Zero is NOT NULL</span>
                <h4 className="text-sm font-bold text-white">0 is a Definite Number</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Scoring 0 marks in an exam is a definite measured score, whereas having NULL marks means the student was absent.
                </p>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-3">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">3. Empty String is NOT NULL</span>
                <h4 className="text-sm font-bold text-white">'' is a Known String</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  An empty string <code className="text-sky-300">''</code> is a known character string of length 0, not missing data.
                </p>
              </div>

            </div>

            {/* Why = NULL Fails Card */}
            <div className="bg-rose-950/20 border border-rose-900/60 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <XCircle size={20} />
                Why does <code className="bg-slate-900 px-2 py-0.5 rounded text-rose-300 font-mono">WHERE col = NULL</code> FAIL?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In SQL, the equality operator <code className="text-sky-300 font-mono">=</code> compares two known values. When comparing an unknown value with NULL, SQL answers: <strong className="text-amber-400 font-mono">UNKNOWN</strong>.
              </p>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-2">
                <p className="text-rose-400">❌ WRONG: SELECT * FROM Student WHERE Email = NULL; -- Returns 0 rows always!</p>
                <p className="text-emerald-400">✓ CORRECT: SELECT * FROM Student WHERE Email IS NULL; -- Returns missing emails</p>
                <p className="text-sky-400">✓ CORRECT: SELECT * FROM Student WHERE Email IS NOT NULL; -- Returns present emails</p>
              </div>
            </div>

            <Teacher note="In the CBSE IT (802) board exam, questions often give a table where some rows have NULL commission and ask for the output of 'WHERE Commission = NULL'. Always write that it returns 0 rows, because comparison with NULL yields UNKNOWN! — Sukanta Hui" />
          </div>
        )}

        {/* TAB 2: 3VL */}
        {activeTab === 'logic' && (
          <div className="space-y-6">
            <ThreeValuedLogicSVG />
          </div>
        )}

        {/* TAB 3: CODE DEMO */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Demonstrating NULL & IFNULL() in MySQL</h3>
                <span className="text-xs text-slate-400 font-mono">05_null_semantics_three_valued_logic.sql</span>
              </div>
              <pre className="bg-slate-950 p-4 rounded-xl text-slate-200 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800 leading-relaxed">
                <code>{`-- Calculating Total Salary when Commission can be NULL
SELECT 
    EmpName, 
    BasicSalary, 
    Commission,
    -- BasicSalary + Commission yields NULL if Commission is NULL!
    (BasicSalary + IFNULL(Commission, 0.00)) AS FinalPayable
FROM StaffCompensation;

-- Filtering for NULLs
SELECT * FROM StaffCompensation WHERE Commission IS NULL;
SELECT * FROM StaffCompensation WHERE Commission IS NOT NULL;`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 4: AGGREGATES */}
        {activeTab === 'aggregates' && (
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">How SQL Aggregate Functions Treat NULL Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-sky-400 font-bold">SUM, AVG, MIN, MAX, COUNT(col)</span>
                <p className="text-slate-300">Completely IGNORE NULL values. They do not add 0 or include NULL in the average denominator.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold">COUNT(*)</span>
                <p className="text-slate-300">Counts ALL rows in the table, regardless of whether some columns contain NULL values.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PITFALLS & TIPS */}
        {activeTab === 'pitfalls' && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
              <AlertTriangle size={18} />
              Board Exam Pitfalls: NULL in SQL
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              <p>• <strong>Never use `= NULL` or `!= NULL`:</strong> Always write `IS NULL` or `IS NOT NULL`.</p>
              <p>• <strong>Primary Keys cannot be NULL:</strong> A Primary Key column enforces NOT NULL automatically.</p>
            </div>
          </div>
        )}

        {/* TAB 6: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate
              title="Topic 4 · NULL Semantics & 3VL FAQs & Board Questions"
              questions={questions}
            />
          </div>
        )}

        {/* TAB 7: PRINTABLE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              filename="topic4_null_concepts_note.txt"
              title="CBSE Class XII IT 802 – Topic 4 Printable Quick Revision Note"
              hidePreview={false}
              showDownload={true}
            />
          </div>
        )}

      </div>
    </div>
  );
}
