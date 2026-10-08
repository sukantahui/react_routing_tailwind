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
  const stockItems = [
    { id: 101, name: 'Alpha Growth', type: 'Equity', val: 1250 },
    { id: 102, name: 'Beta Tech', type: 'Equity', val: 3000 },
    { id: 103, name: 'Govt Bond A', type: 'Debt', val: 550 },
    { id: 104, name: 'State Treasury', type: 'Debt', val: 880 },
    { id: 105, name: 'Gold ETF', type: 'Commodity', val: 5200 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Layers size={20} />
          <span>Categorical Bucket Aggregator: GROUP BY In Action</span>
        </div>

        <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-emerald-400">
          <code>{"-- CBSE Board Benchmark Query\nSELECT Type, COUNT(*) AS ItemCount, SUM(Value) AS TotalValue, AVG(Value) AS AvgValue\nFROM STOCKDATA\nGROUP BY Type;"}</code>
        </pre>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 bg-slate-900 rounded-xl border border-sky-500/30 space-y-2">
            <span className="font-bold text-sky-400 text-sm">Bucket 1: Equity</span>
            <div className="text-slate-300 font-mono">
              • Items: 2 (Alpha, Beta)<br />
              • SUM(Value): ₹4,250<br />
              • AVG(Value): ₹2,125
            </div>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-emerald-500/30 space-y-2">
            <span className="font-bold text-emerald-400 text-sm">Bucket 2: Debt</span>
            <div className="text-slate-300 font-mono">
              • Items: 2 (Govt, Treasury)<br />
              • SUM(Value): ₹1,430<br />
              • AVG(Value): ₹715
            </div>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-amber-500/30 space-y-2">
            <span className="font-bold text-amber-400 text-sm">Bucket 3: Commodity</span>
            <div className="text-slate-300 font-mono">
              • Items: 1 (Gold ETF)<br />
              • SUM(Value): ₹5,200<br />
              • AVG(Value): ₹5,200
            </div>
          </div>
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
                Module 004 · Topic 4
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Categorical Aggregation
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Grouping Records by Categories using the GROUP BY Clause
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Divide datasets into categorical buckets and compute summary statistics for each distinct group.
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
                <code>{"-- Grouping by Stream in Student Table\nSELECT Stream, COUNT(*), AVG(TotalMarks) FROM Student GROUP BY Stream;"}</code>
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
                <strong>Mentor Advice:</strong> Rule of Thumb: Whatever column you put in GROUP BY (e.g. Stream), you can safely write in SELECT (SELECT Stream, AVG(Marks) ...). Never put un-grouped columns in SELECT! — Sukanta Hui
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
        <Teacher note="Rule of Thumb: Whatever column you put in GROUP BY (e.g. Stream), you can safely write in SELECT (SELECT Stream, AVG(Marks) ...). Never put un-grouped columns in SELECT! — Sukanta Hui" />

      </div>
    </div>
  );
}
