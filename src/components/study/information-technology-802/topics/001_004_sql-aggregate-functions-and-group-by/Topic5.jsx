import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Play, ArrowRight 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

const InteractiveSandbox = () => {
  const [cutoffDate, setCutoffDate] = useState('2012-01-03');

  const employees = [
    { id: 1, name: 'Rajesh', job: 'Analyst', hireDate: '2013-05-10', salary: 65000 },
    { id: 2, name: 'Priya', job: 'Analyst', hireDate: '2010-02-15', salary: 60000 },
    { id: 3, name: 'Suresh', job: 'Clerk', hireDate: '2014-08-20', salary: 35000 },
    { id: 4, name: 'Sunita', job: 'Analyst', hireDate: '2015-11-01', salary: 70000 }
  ];

  const phase1Filtered = employees.filter(e => e.job === 'Analyst' && e.hireDate > cutoffDate);
  const totalSalary = phase1Filtered.reduce((acc, curr) => acc + curr.salary, 0);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Layers size={20} />
          <span>The Two-Phase Execution Pipeline: WHERE Row Filter → GROUP BY Aggregation</span>
        </div>

        <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-emerald-400">
          <code>{"-- CBSE Board Benchmark Query\nSELECT Job, SUM(Salary) AS TotalSalary, COUNT(*) AS Headcount\nFROM Emp\nWHERE Job = 'Analyst' AND HireDate > '" + cutoffDate + "'\nGROUP BY Job;"}</code>
        </pre>

        {/* 2-Phase Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-900 rounded-xl border border-sky-500/30 space-y-2">
            <span className="font-bold text-sky-400">Phase 1: WHERE Filter (Row-by-Row)</span>
            <p className="text-slate-300">
              Evaluates: Job = 'Analyst' AND HireDate &gt; '{cutoffDate}'. <br />
              • Row #1 (Rajesh): Pass ✓<br />
              • Row #2 (Priya): <span className="text-rose-400 font-bold">Discarded (Hired before {cutoffDate}) ✗</span><br />
              • Row #3 (Suresh): Discarded (Not an Analyst) ✗<br />
              • Row #4 (Sunita): Pass ✓
            </p>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-emerald-500/30 space-y-2">
            <span className="font-bold text-emerald-400">Phase 2: GROUP BY & Aggregation</span>
            <p className="text-slate-300">
              Groups surviving rows (Rajesh + Sunita):<br />
              • Headcount: <strong>{phase1Filtered.length} Analysts</strong><br />
              • SUM(Salary): <strong>₹{totalSalary.toLocaleString()}</strong> (₹65,000 + ₹70,000)
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function Topic5() {
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
                Module 004 · Topic 5
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                2-Phase Query Pipeline
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Combining WHERE Filtering with GROUP BY Aggregations
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Execute the two-phase query pipeline: filter individual tuples with WHERE before aggregating with GROUP BY.
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
                <code>{"-- Combining WHERE with GROUP BY\nSELECT Job, SUM(Salary) FROM Emp WHERE Job='Analyst' AND HireDate > '2012-01-03' GROUP BY Job;"}</code>
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
                <strong>Mentor Advice:</strong> Remember the order: WHERE filters the raw rows first. Then GROUP BY groups only the surviving rows. — Sukanta Hui
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 5 FAQs" questions={questions} />
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
              downloadFileName="topic5_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="Remember the order: WHERE filters the raw rows first. Then GROUP BY groups only the surviving rows. — Sukanta Hui" />

      </div>
    </div>
  );
}
