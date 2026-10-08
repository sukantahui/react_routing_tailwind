import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Play, ArrowRight, RefreshCw 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const InteractiveSandbox = () => {
  const [includeWhere, setIncludeWhere] = useState(true);
  const [targetDept, setTargetDept] = useState('IT');
  const [newSalary, setNewSalary] = useState('75000');

  const initialEmployees = [
    { empNo: 101, name: 'Rajesh Khanna', dept: 'IT', salary: 65000 },
    { empNo: 102, name: 'Priya Nair', dept: 'HR', salary: 48000 },
    { empNo: 103, name: 'Suresh Menon', dept: 'Finance', salary: 72000 },
    { empNo: 104, name: 'Sunita Rao', dept: 'IT', salary: 62000 },
    { empNo: 105, name: 'Amit Sengupta', dept: 'Marketing', salary: 54000 }
  ];

  const [employees, setEmployees] = useState(initialEmployees);
  const [applied, setApplied] = useState(false);

  const handleExecuteUpdate = () => {
    const updated = employees.map(emp => {
      if (!includeWhere || emp.dept === targetDept) {
        return { ...emp, salary: parseInt(newSalary) || emp.salary };
      }
      return emp;
    });
    setEmployees(updated);
    setApplied(true);
  };

  const handleReset = () => {
    setEmployees(initialEmployees);
    setApplied(false);
  };

  const sqlQuery = includeWhere
    ? "UPDATE Employee\nSET BasicSalary = " + newSalary + "\nWHERE Department = '" + targetDept + "';"
    : "-- DANGER: MASS UNCONDITIONAL UPDATE\nUPDATE Employee\nSET BasicSalary = " + newSalary + ";";

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-3">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
            <Layers size={20} />
            <span>The "WHERE Clause Safety Gateway" Simulator</span>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded-lg cursor-pointer"
          >
            <RefreshCw size={14} /> Reset Data
          </button>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
            <label className="block text-slate-400 font-semibold">1. Safety Gate (WHERE Clause):</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIncludeWhere(true)}
                className={"px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer " + (includeWhere ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400')}
              >
                ✓ With WHERE (Safe)
              </button>
              <button
                onClick={() => setIncludeWhere(false)}
                className={"px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer " + (!includeWhere ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-800 text-slate-400')}
              >
                ⚠ Omit WHERE (Mass Update)
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
            <label className="block text-slate-400 font-semibold">2. Target Department (If WHERE Active):</label>
            <select
              disabled={!includeWhere}
              value={targetDept}
              onChange={(e) => setTargetDept(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-sky-300 font-mono focus:outline-none disabled:opacity-40"
            >
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
            <label className="block text-slate-400 font-semibold">3. New Salary (SET BasicSalary =):</label>
            <input
              type="number"
              value={newSalary}
              onChange={(e) => setNewSalary(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-amber-300 font-mono focus:outline-none"
            />
          </div>
        </div>

        {/* SQL Command Display */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-sky-400">Generated SQL Command:</div>
          <pre className={"p-4 rounded-xl border text-xs sm:text-sm font-mono " + (includeWhere ? 'bg-slate-950 border-emerald-500/30 text-emerald-400' : 'bg-rose-950/40 border-rose-500/50 text-rose-300')}>
            <code>{sqlQuery}</code>
          </pre>
        </div>

        <button
          onClick={handleExecuteUpdate}
          className={"flex items-center gap-2 px-5 py-2.5 font-bold text-xs rounded-xl shadow-lg transition cursor-pointer " + (includeWhere ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-rose-500 hover:bg-rose-600 text-white')}
        >
          <Play size={14} /> Execute UPDATE Query
        </button>

        {!includeWhere && applied && (
          <div className="p-3 bg-rose-500/20 border border-rose-500 rounded-xl text-xs text-rose-300 flex items-center gap-2">
            <AlertTriangle size={18} className="shrink-0" />
            <span><strong>CATASTROPHIC ACCIDENT:</strong> All 5 employee salaries were overwritten to ₹{newSalary} because the WHERE clause was omitted!</span>
          </div>
        )}

        {/* Result Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-2">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-sky-400">
                <th className="p-2">EmpNo</th>
                <th className="p-2">EmpName</th>
                <th className="p-2">Department</th>
                <th className="p-2">BasicSalary (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-slate-300">
              {employees.map((emp) => {
                const isModified = applied && (!includeWhere || emp.dept === targetDept);
                return (
                  <tr key={emp.empNo} className={isModified ? (includeWhere ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'bg-rose-500/20 text-rose-300 font-bold') : ''}>
                    <td className="p-2">{emp.empNo}</td>
                    <td className="p-2">{emp.name}</td>
                    <td className="p-2">{emp.dept}</td>
                    <td className="p-2 text-amber-300">₹{emp.salary.toLocaleString()}</td>
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

export default function Topic1() {
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
                Module 003 · Topic 1
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                DML Tuple Mutation
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              UPDATE SET Statement: Safe vs Mass Modifications
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Learn conditional record modification with UPDATE SET WHERE and avoid accidental whole-table overwrites.
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
                <code>{"USE CompanyDB;\n\n-- Safe Conditional Update\nUPDATE Employee\nSET BasicSalary = 65000.00, Department = 'IT'\nWHERE EmpNo = 104;\n\n-- Mass Update (Warning!)\n-- UPDATE Employee SET Status = 'Active';"}</code>
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
                <strong>Mentor Advice:</strong> Always write your WHERE clause before executing UPDATE. An unconditional UPDATE overwrites all data in the table! — Sukanta Hui
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 1 FAQs" questions={questions} />
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
              downloadFileName="topic1_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="Always write your WHERE clause before executing UPDATE. An unconditional UPDATE overwrites all data in the table! — Sukanta Hui" />

      </div>
    </div>
  );
}
