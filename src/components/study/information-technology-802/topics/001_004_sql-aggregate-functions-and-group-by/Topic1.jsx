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
  const [dataValues, setDataValues] = useState([100, 200, null, 300]);

  const nonNullValues = dataValues.filter(v => v !== null);
  const sum = nonNullValues.reduce((acc, curr) => acc + curr, 0);
  const countCol = nonNullValues.length;
  const countStar = dataValues.length;
  const avg = countCol > 0 ? (sum / countCol).toFixed(2) : 0;
  const wrongAvg = countStar > 0 ? (sum / countStar).toFixed(2) : 0;

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Sparkles size={20} />
          <span>Null-Aware Mathematical Calculator: How SUM & AVG Handle Missing Data</span>
        </div>

        {/* Value Dissector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {dataValues.map((val, idx) => (
            <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-1">
              <span className="text-slate-500 font-mono">Row #{idx + 1}</span>
              <div className={"text-lg font-bold font-mono " + (val === null ? 'text-rose-400' : 'text-emerald-400')}>
                {val === null ? 'NULL' : val}
              </div>
              <button
                onClick={() => {
                  const updated = [...dataValues];
                  updated[idx] = updated[idx] === null ? (idx + 1) * 100 : null;
                  setDataValues(updated);
                }}
                className="text-[10px] text-sky-400 hover:underline cursor-pointer"
              >
                {val === null ? '+ Set to 400' : '✕ Set to NULL'}
              </button>
            </div>
          ))}
        </div>

        {/* Live Calculation Box */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-semibold">1. SUM(col):</span>
            <div className="text-xl font-bold text-emerald-400 font-mono">{sum}</div>
            <p className="text-[11px] text-slate-500">Sums only non-null numbers: {nonNullValues.join(' + ')}</p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/40 space-y-1">
            <span className="text-emerald-400 font-semibold">2. Correct AVG(col):</span>
            <div className="text-xl font-bold text-emerald-300 font-mono">{avg}</div>
            <p className="text-[11px] text-slate-300 font-mono">Formula: SUM ({sum}) / COUNT(col) ({countCol})</p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/40 space-y-1">
            <span className="text-rose-400 font-semibold">3. WRONG Mistake (Dividing by COUNT(*)):</span>
            <div className="text-xl font-bold text-rose-300 line-through font-mono">{wrongAvg}</div>
            <p className="text-[11px] text-slate-400 font-mono">Mistake: {sum} / {countStar} (Counting NULL in denominator)</p>
          </div>
        </div>

        <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-emerald-400">
          <code>{"-- SQL ignores NULL when calculating AVG\nSELECT SUM(Commission), AVG(Commission), COUNT(Commission), COUNT(*)\nFROM Employee;"}</code>
        </pre>

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
                Module 004 · Topic 1
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Null-Aware Calculations
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Mathematical Aggregate Functions: SUM(col), AVG(col) (Ignoring NULL values)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master sum and average calculations across numeric columns and understand how NULL values are omitted from the denominator.
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
                <code>{"-- SUM and AVG with NULL Commission\nSELECT SUM(Commission), AVG(Commission), COUNT(Commission), COUNT(*)\nFROM Employee;"}</code>
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
                <strong>Mentor Advice:</strong> CBSE Board Favorite: 'Does AVG include NULL in the denominator?' The answer is strictly NO! AVG divides by COUNT(column), which ignores NULLs. — Sukanta Hui
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
        <Teacher note="CBSE Board Favorite: 'Does AVG include NULL in the denominator?' The answer is strictly NO! AVG divides by COUNT(column), which ignores NULLs. — Sukanta Hui" />

      </div>
    </div>
  );
}
