import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Play, ArrowRight 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

const InteractiveSandbox = () => {
  const [selectedRecipe, setSelectedRecipe] = useState('%Kumar%');

  const dataset = [
    'Amit Kumar Sharma',
    'Susmita Roy',
    'Debangshu Pal',
    'Mamata Sharma',
    'Ajoy Kumar Sen',
    'Alok Roy',
    'Swadeep Gupta'
  ];

  const matchPat = (str, pat) => {
    const re = new RegExp('^' + pat.replace(/%/g, '.*').replace(/_/g, '.') + '$', 'i');
    return re.test(str);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <BookOpen size={20} />
          <span>CBSE Class XII Pattern Search Cookbook & Live Matcher</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { pat: 'A%', desc: 'Starts with A' },
            { pat: '%a', desc: 'Ends with a' },
            { pat: '%Kumar%', desc: 'Contains Kumar' },
            { pat: '_a%', desc: '2nd letter is a' },
            { pat: 'S%a', desc: 'Starts with S, ends with a' },
            { pat: '________', desc: 'Exactly 8 letters' }
          ].map((item) => (
            <button
              key={item.pat}
              onClick={() => setSelectedRecipe(item.pat)}
              className={"px-3.5 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer " + (selectedRecipe === item.pat ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 'bg-slate-900 border border-slate-700 text-slate-300')}
            >
              '{item.pat}' ({item.desc})
            </button>
          ))}
        </div>

        <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-emerald-400">
          <code>{"SELECT * FROM Student\nWHERE FullName LIKE '" + selectedRecipe + "';"}</code>
        </pre>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {dataset.map((name) => {
            const isMatch = matchPat(name, selectedRecipe);
            return (
              <div key={name} className={"p-3 rounded-xl border flex items-center justify-between font-mono " + (isMatch ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 font-bold' : 'bg-slate-900/40 border-slate-800 text-slate-500')}>
                <span>{name}</span>
                <span>{isMatch ? '✓ MATCH' : '✗ No match'}</span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default function Topic8() {
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
                Module 003 · Topic 8
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Board Recipes
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Searching for Patterns: Recipes ('A%', '%a', '%Kumar%', '_a%')
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Common CBSE Class XII pattern search recipes for board exam question solving.
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
                <code>{"-- Containing Substring\nSELECT * FROM Student WHERE FullName LIKE '%Kumar%';\n\n-- Second Character is 'a'\nSELECT * FROM Student WHERE FullName LIKE '_a%';"}</code>
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
                <strong>Mentor Advice:</strong> Board favorite: 'Names containing Kumar' -&gt; WHERE Name LIKE '%Kumar%'. Note the % on both sides! — Sukanta Hui
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 8 FAQs" questions={questions} />
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
              downloadFileName="topic8_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="Board favorite: 'Names containing Kumar' -> WHERE Name LIKE '%Kumar%'. Note the % on both sides! — Sukanta Hui" />

      </div>
    </div>
  );
}
