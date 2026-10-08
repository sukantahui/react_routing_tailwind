import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Play, ArrowRight 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

const InteractiveSandbox = () => {
  const [operator, setOperator] = useState('IS NULL');

  const employees = [
    { empNo: 1, name: 'Rajesh Khanna', salary: 65000, comm: 5000 },
    { empNo: 2, name: 'Priya Nair', salary: 48000, comm: null },
    { empNo: 3, name: 'Suresh Menon', salary: 72000, comm: 8000 },
    { empNo: 4, name: 'Sunita Rao', salary: 62000, comm: null }
  ];

  const evaluateRow = (comm) => {
    if (operator === 'IS NULL') return comm === null;
    if (operator === 'IS NOT NULL') return comm !== null;
    if (operator === '= NULL') return false; // 3VL UNKNOWN -> WHERE rejects
    if (operator === '!= NULL') return false; // 3VL UNKNOWN -> WHERE rejects
    return false;
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <AlertTriangle size={20} />
          <span>Three-Valued Logic (3VL) Explorer: Why '= NULL' ALWAYS Fails</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'IS NULL', label: '1. WHERE Commission IS NULL (Correct)', color: 'emerald' },
            { id: 'IS NOT NULL', label: '2. WHERE Commission IS NOT NULL (Correct)', color: 'emerald' },
            { id: '= NULL', label: '3. WHERE Commission = NULL (WRONG: 0 Rows)', color: 'rose' },
            { id: '!= NULL', label: '4. WHERE Commission != NULL (WRONG: 0 Rows)', color: 'rose' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setOperator(btn.id)}
              className={"px-3.5 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer " + (operator === btn.id ? 'bg-sky-500 text-white shadow-lg' : 'bg-slate-900 border border-slate-700 text-slate-300')}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-emerald-400">
          <code>{"SELECT * FROM Employee\nWHERE Commission " + operator + ";"}</code>
        </pre>

        {operator.includes('=') && (
          <div className="p-3 bg-rose-500/20 border border-rose-500 rounded-xl text-xs text-rose-300">
            <strong>3-Valued Logic Trap:</strong> In SQL, comparing any value with NULL using '=' or '!=' evaluates to <strong>UNKNOWN</strong>. Since the WHERE clause only returns rows that evaluate strictly to <strong>TRUE</strong>, 0 rows are returned!
          </div>
        )}

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-2">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-sky-400">
                <th className="p-2">EmpNo</th>
                <th className="p-2">EmpName</th>
                <th className="p-2">BasicSalary</th>
                <th className="p-2">Commission</th>
                <th className="p-2">Evaluation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-slate-300">
              {employees.map((e) => {
                const isPass = evaluateRow(e.comm);
                return (
                  <tr key={e.empNo} className={isPass ? 'bg-emerald-500/10 text-emerald-300 font-bold' : 'opacity-40'}>
                    <td className="p-2">{e.empNo}</td>
                    <td className="p-2">{e.name}</td>
                    <td className="p-2">₹{e.salary.toLocaleString()}</td>
                    <td className="p-2 text-amber-300">{e.comm === null ? 'NULL' : ("₹" + e.comm.toLocaleString())}</td>
                    <td className="p-2">{isPass ? '✓ TRUE (Returned)' : '✗ UNKNOWN / FALSE'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default function Topic10() {
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
                Module 003 · Topic 10
              </span>
              <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-semibold rounded-full">
                3-Valued Logic & NULL
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Handling NULL in Queries: IS NULL & IS NOT NULL (Why '= NULL' fails)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understand SQL Three-Valued Logic (3VL), missing data representation, and why equality with NULL always evaluates to UNKNOWN.
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
                <code>{"-- Testing for Missing Values\nSELECT * FROM Employee WHERE Commission IS NULL;\n\n-- Testing for Present Values\nSELECT * FROM Employee WHERE Commission IS NOT NULL;"}</code>
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
                <strong>Mentor Advice:</strong> Never write '= NULL'. Always write 'IS NULL' or 'IS NOT NULL'! — Sukanta Hui
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 10 FAQs" questions={questions} />
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
              downloadFileName="topic10_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="Never write '= NULL'. Always write 'IS NULL' or 'IS NOT NULL'! — Sukanta Hui" />

      </div>
    </div>
  );
}
