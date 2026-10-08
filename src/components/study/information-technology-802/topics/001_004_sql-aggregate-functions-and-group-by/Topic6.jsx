import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Play, ArrowRight 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

const InteractiveSandbox = () => {
  const [useHaving, setUseHaving] = useState(true);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <AlertTriangle size={20} />
          <span>The Golden CBSE Rule: WHERE (Row Filter) vs HAVING (Group Filter)</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setUseHaving(true)}
            className={"px-4 py-2 rounded-xl text-xs font-bold cursor-pointer " + (useHaving ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-900 border border-slate-700 text-slate-400')}
          >
            ✓ Correct Query (Using HAVING for Aggregate)
          </button>
          <button
            onClick={() => setUseHaving(false)}
            className={"px-4 py-2 rounded-xl text-xs font-bold cursor-pointer " + (!useHaving ? 'bg-rose-500 text-white shadow-lg animate-pulse' : 'bg-slate-900 border border-slate-700 text-slate-400')}
          >
            ✗ Common Mistake (Putting AVG in WHERE)
          </button>
        </div>

        <pre className={"p-4 rounded-xl border text-xs sm:text-sm font-mono " + (useHaving ? 'bg-slate-950 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/40 border-rose-500/50 text-rose-300')}>
          <code>{useHaving
            ? "-- CORRECT SYNTAX\nSELECT Department, AVG(BasicSalary)\nFROM Employee\nGROUP BY Department\nHAVING AVG(BasicSalary) > 50000;"
            : "-- FATAL SYNTAX ERROR\nSELECT Department, AVG(BasicSalary)\nFROM Employee\nWHERE AVG(BasicSalary) > 50000 -- ERROR 1111 (HY000): Invalid use of group function!\nGROUP BY Department;"}</code>
        </pre>

        {!useHaving ? (
          <div className="p-4 bg-rose-500/20 border border-rose-500 rounded-xl text-xs text-rose-300 space-y-1">
            <span className="font-bold flex items-center gap-1.5"><XCircle size={16} /> Why WHERE AVG(Salary) &gt; 50000 is ILLEGAL:</span>
            <p className="text-slate-300">
              The WHERE clause executes on individual rows <strong>before</strong> groups are formed. It has no access to the aggregated group average. Any aggregate function in WHERE results in ERROR 1111: Invalid use of group function.
            </p>
          </div>
        ) : (
          <div className="p-4 bg-emerald-500/20 border border-emerald-500 rounded-xl text-xs text-emerald-300 space-y-1">
            <span className="font-bold flex items-center gap-1.5"><CheckCircle2 size={16} /> Why HAVING AVG(Salary) &gt; 50000 is CORRECT:</span>
            <p className="text-slate-300">
              HAVING executes <strong>after</strong> GROUP BY has formed the summary groups, allowing it to inspect and filter computed aggregate metrics like AVG(), COUNT(), and SUM().
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default function Topic6() {
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
                Module 004 · Topic 6
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                HAVING vs WHERE Master Rule
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Filtering Grouped Data using the HAVING Clause vs Row-Level WHERE
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understand the strict division: WHERE filters rows before grouping; HAVING filters summary groups after aggregation.
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
                <code>{"-- GROUP BY with HAVING\nSELECT Department, COUNT(*), AVG(BasicSalary)\nFROM Employee\nGROUP BY Department\nHAVING AVG(BasicSalary) > 50000;"}</code>
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
                <strong>Mentor Advice:</strong> 100% Guaranteed Board Question: 'Difference between WHERE and HAVING'. WHERE filters records BEFORE grouping. HAVING filters groups AFTER aggregation. Aggregate functions are NEVER allowed in WHERE! — Sukanta Hui
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 6 FAQs" questions={questions} />
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
              downloadFileName="topic6_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="100% Guaranteed Board Question: 'Difference between WHERE and HAVING'. WHERE filters records BEFORE grouping. HAVING filters groups AFTER aggregation. Aggregate functions are NEVER allowed in WHERE! — Sukanta Hui" />

      </div>
    </div>
  );
}
