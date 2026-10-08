import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Play, ArrowRight, ArrowDown 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

const InteractiveSandbox = () => {
  const [functionType, setFunctionType] = useState('multi');

  const employees = [
    { id: 1, name: 'amit kumar', salary: 65000 },
    { id: 2, name: 'susmita roy', salary: 48000 },
    { id: 3, name: 'debangshu pal', salary: 72000 },
    { id: 4, name: 'mamata sharma', salary: 62000 },
    { id: 5, name: 'ajoy sen', salary: 53000 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Layers size={20} />
          <span>Single-Row (Scalar) vs Multi-Row (Aggregate) Function Pipeline</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFunctionType('single')}
            className={"px-4 py-2 rounded-xl text-xs font-bold cursor-pointer " + (functionType === 'single' ? 'bg-sky-500 text-white shadow-lg' : 'bg-slate-900 border border-slate-700 text-slate-400')}
          >
            1. Single-Row Function: UPPER(Name) [N In → N Out]
          </button>
          <button
            onClick={() => setFunctionType('multi')}
            className={"px-4 py-2 rounded-xl text-xs font-bold cursor-pointer " + (functionType === 'multi' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-900 border border-slate-700 text-slate-400')}
          >
            2. Multi-Row (Aggregate): SUM(Salary) [N In → 1 Out]
          </button>
        </div>

        {functionType === 'single' ? (
          <div className="space-y-4">
            <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-sky-300">
              <code>{"-- Single-Row Transformation: Produces 5 Output Rows\nSELECT EmpName, UPPER(EmpName) AS UppercaseName, LENGTH(EmpName) AS NameLength\nFROM Employee;"}</code>
            </pre>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-2">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-sky-400">
                    <th className="p-2">Row #</th>
                    <th className="p-2">Input Tuple (EmpName)</th>
                    <th className="p-2">Scalar Output UPPER(EmpName)</th>
                    <th className="p-2">LENGTH()</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 text-slate-300">
                  {employees.map((e, idx) => (
                    <tr key={e.id}>
                      <td className="p-2 font-bold text-slate-500">#{idx + 1}</td>
                      <td className="p-2 text-amber-300">"{e.name}"</td>
                      <td className="p-2 font-bold text-sky-300">"{e.name.toUpperCase()}"</td>
                      <td className="p-2 text-emerald-300">{e.name.length} chars</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-emerald-300">
              <code>{"-- Multi-Row (Aggregate) Function: Condenses 5 Rows into 1 Scalar Summary\nSELECT COUNT(*) AS TotalStaff, SUM(BasicSalary) AS TotalPayroll, AVG(BasicSalary) AS AvgSalary\nFROM Employee;"}</code>
            </pre>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-2">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-emerald-400">
                    <th className="p-2">TotalStaff COUNT(*)</th>
                    <th className="p-2">TotalPayroll SUM(Salary)</th>
                    <th className="p-2">AvgSalary AVG(Salary)</th>
                    <th className="p-2">MaxSalary MAX(Salary)</th>
                    <th className="p-2">MinSalary MIN(Salary)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 text-slate-300">
                  <tr className="bg-emerald-500/10 font-bold text-emerald-300">
                    <td className="p-2 text-amber-300">5 employees</td>
                    <td className="p-2">₹300,000</td>
                    <td className="p-2">₹60,000</td>
                    <td className="p-2 text-sky-300">₹72,000</td>
                    <td className="p-2 text-rose-300">₹48,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default function Topic0() {
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
                Module 004 · Topic 0
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Scalar vs Vector Logic
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Single-Row Functions vs Multi-Row (Aggregate) Functions in SQL
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understand the fundamental architectural difference between scalar single-row transformations and multi-row aggregate condensations.
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
                <code>{"-- Single-Row Functions: N Rows In -> N Rows Out\nSELECT EmpName, UPPER(EmpName) FROM Employee;\n\n-- Multi-Row Functions: N Rows In -> 1 Row Out\nSELECT COUNT(*), SUM(BasicSalary), AVG(BasicSalary) FROM Employee;"}</code>
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
                <strong>Mentor Advice:</strong> Single-row functions change individual row text or numbers (e.g. UPPER(Name)). Aggregate functions boil down the whole table into ONE summary number (e.g. SUM(Salary)). Keep this distinction crystal clear for board exams! — Sukanta Hui
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 0 FAQs" questions={questions} />
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
              downloadFileName="topic0_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="Single-row functions change individual row text or numbers (e.g. UPPER(Name)). Aggregate functions boil down the whole table into ONE summary number (e.g. SUM(Salary)). Keep this distinction crystal clear for board exams! — Sukanta Hui" />

      </div>
    </div>
  );
}
