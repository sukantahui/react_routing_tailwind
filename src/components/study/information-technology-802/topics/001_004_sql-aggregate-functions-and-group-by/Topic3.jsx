import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Play, ArrowRight 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

const InteractiveSandbox = () => {
  const staff = [
    { empNo: 101, name: 'Rajesh', dept: 'IT', comm: 5000 },
    { empNo: 102, name: 'Priya', dept: 'HR', comm: null },
    { empNo: 103, name: 'Suresh', dept: 'Finance', comm: 8000 },
    { empNo: 104, name: 'Sunita', dept: 'IT', comm: null },
    { empNo: 105, name: 'Amit', dept: 'IT', comm: 3000 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Layers size={20} />
          <span>COUNT(*) vs COUNT(col) vs COUNT(DISTINCT col) Live Dissector</span>
        </div>

        <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-emerald-400">
          <code>{"SELECT COUNT(*) AS TotalTuples, COUNT(Commission) AS NonNullCommissions, COUNT(DISTINCT Department) AS UniqueDepts\nFROM Employee;"}</code>
        </pre>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 bg-slate-900 rounded-xl border border-sky-500/30 space-y-1">
            <span className="text-sky-400 font-semibold">1. COUNT(*):</span>
            <div className="text-2xl font-bold text-white font-mono">5 Rows</div>
            <p className="text-[11px] text-slate-400">Counts ALL tuples in table (including rows with NULL).</p>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-emerald-500/30 space-y-1">
            <span className="text-emerald-400 font-semibold">2. COUNT(Commission):</span>
            <div className="text-2xl font-bold text-emerald-300 font-mono">3 Rows</div>
            <p className="text-[11px] text-slate-400">Counts only non-null commission values (excludes 2 NULLs).</p>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-purple-500/30 space-y-1">
            <span className="text-purple-400 font-semibold">3. COUNT(DISTINCT Dept):</span>
            <div className="text-2xl font-bold text-purple-300 font-mono">3 Unique</div>
            <p className="text-[11px] text-slate-400">IT (3 times), HR, Finance -&gt; 3 unique departments.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function Topic3() {
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
                Module 004 · Topic 3
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Cardinality vs Attribute Count
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Counting Records: COUNT(*) vs COUNT(col)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Learn the crucial distinction between total tuple cardinality (COUNT(*)) and non-null attribute counts (COUNT(col)).
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
                <code>{"-- Cardinality vs Non-Null Count\nSELECT COUNT(*), COUNT(Commission), COUNT(DISTINCT Department) FROM Employee;"}</code>
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
                <strong>Mentor Advice:</strong> Board Exam Golden Rule: COUNT(*) counts ALL rows. COUNT(col) counts only NON-NULL rows. COUNT(DISTINCT col) counts UNIQUE non-null values! — Sukanta Hui
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 3 FAQs" questions={questions} />
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
              downloadFileName="topic3_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="Board Exam Golden Rule: COUNT(*) counts ALL rows. COUNT(col) counts only NON-NULL rows. COUNT(DISTINCT col) counts UNIQUE non-null values! — Sukanta Hui" />

      </div>
    </div>
  );
}
