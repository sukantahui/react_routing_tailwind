import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Play, ArrowRight 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

const InteractiveSandbox = () => {
  const [showHra, setShowHra] = useState(true);
  const [showDa, setShowDa] = useState(true);
  const [showAnnual, setShowAnnual] = useState(true);

  const sampleStaff = [
    { id: 1, name: 'Rajesh Khanna', basic: 60000 },
    { id: 2, name: 'Priya Nair', basic: 45000 },
    { id: 3, name: 'Suresh Menon', basic: 80000 }
  ];

  const cols = ['EmpName', 'BasicSalary'];
  if (showHra) cols.push('BasicSalary * 0.15 AS HRA');
  if (showDa) cols.push('BasicSalary * 0.08 AS DA');
  if (showAnnual) cols.push('BasicSalary * 12 AS AnnualCTC');

  const sqlQuery = "SELECT " + cols.join(",\n       ") + "\nFROM Employee;";

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Terminal size={20} />
          <span>Dynamic SELECT Projection & Arithmetic Expression Playground</span>
        </div>

        {/* Checkbox Toggles */}
        <div className="flex flex-wrap gap-4 text-xs">
          <label className="flex items-center gap-2 cursor-pointer bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
            <input 
              type="checkbox" 
              checked={showHra} 
              onChange={(e) => setShowHra(e.target.checked)} 
              className="rounded bg-slate-950 border-slate-700 text-sky-500"
            />
            <span>Include HRA (15%)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
            <input 
              type="checkbox" 
              checked={showDa} 
              onChange={(e) => setShowDa(e.target.checked)} 
              className="rounded bg-slate-950 border-slate-700 text-sky-500"
            />
            <span>Include DA (8%)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
            <input 
              type="checkbox" 
              checked={showAnnual} 
              onChange={(e) => setShowAnnual(e.target.checked)} 
              className="rounded bg-slate-950 border-slate-700 text-sky-500"
            />
            <span>Include Annual CTC (* 12)</span>
          </label>
        </div>

        {/* Live SQL Preview */}
        <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-emerald-400 overflow-x-auto">
          <code>{sqlQuery}</code>
        </pre>

        {/* Result Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-2">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-sky-400">
                <th className="p-2">EmpName</th>
                <th className="p-2">BasicSalary</th>
                {showHra && <th className="p-2 text-emerald-400">HRA</th>}
                {showDa && <th className="p-2 text-amber-400">DA</th>}
                {showAnnual && <th className="p-2 text-sky-300">AnnualCTC</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-slate-300">
              {sampleStaff.map((staff) => (
                <tr key={staff.id}>
                  <td className="p-2 font-bold text-white">{staff.name}</td>
                  <td className="p-2 text-slate-400">₹{staff.basic.toLocaleString()}</td>
                  {showHra && <td className="p-2 text-emerald-300">₹{(staff.basic * 0.15).toLocaleString()}</td>}
                  {showDa && <td className="p-2 text-amber-300">₹{(staff.basic * 0.08).toLocaleString()}</td>}
                  {showAnnual && <td className="p-2 font-bold text-sky-300">₹{(staff.basic * 12).toLocaleString()}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default function Topic4() {
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
                Module 003 · Topic 4
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Query Projections
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              SELECT Projections, Arithmetic Expressions & Aliases (AS)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Query table columns, perform mathematical projections, and rename result headers using column aliases.
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
                <code>{"-- Dynamic Projection with Aliases\nSELECT EmpName, BasicSalary, BasicSalary * 0.15 AS HRA, BasicSalary * 12 AS AnnualCTC FROM Employee;"}</code>
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
                <strong>Mentor Advice:</strong> Column aliases with spaces must be enclosed in quotes (AS 'Annual Package'). SELECT never changes stored data! — Sukanta Hui
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 4 FAQs" questions={questions} />
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
              downloadFileName="topic4_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="Column aliases with spaces must be enclosed in quotes (AS 'Annual Package'). SELECT never changes stored data! — Sukanta Hui" />

      </div>
    </div>
  );
}
