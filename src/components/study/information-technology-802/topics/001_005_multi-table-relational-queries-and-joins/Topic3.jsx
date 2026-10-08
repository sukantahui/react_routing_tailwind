import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Play, ArrowRight, GitMerge, Check 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

const SyntaxComparator = () => {
  const [syntaxMode, setSyntaxMode] = useState('explicit');

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <GitMerge size={20} />
          <span>Explicit ANSI SQL-92 (INNER JOIN ... ON) vs Implicit (WHERE)</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSyntaxMode('explicit')}
            className={"px-4 py-2 rounded-xl text-xs font-bold cursor-pointer " + (
              syntaxMode === 'explicit' ? "bg-emerald-500 text-white shadow-lg" : "bg-slate-900 border border-slate-700 text-slate-400"
            )}
          >
            1. Explicit ANSI SQL-92: INNER JOIN ... ON ...
          </button>
          <button
            onClick={() => setSyntaxMode('implicit')}
            className={"px-4 py-2 rounded-xl text-xs font-bold cursor-pointer " + (
              syntaxMode === 'implicit' ? "bg-sky-500 text-white shadow-lg" : "bg-slate-900 border border-slate-700 text-slate-400"
            )}
          >
            2. Implicit SQL-89: FROM Table1, Table2 WHERE
          </button>
        </div>

        {syntaxMode === 'explicit' ? (
          <div className="space-y-4">
            <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-emerald-300">
              <code>{"-- ANSI SQL-92 Explicit Inner Join Syntax\nSELECT S.RollNo, S.Name, S.Class, P.FatherName, P.Phone\nFROM STUDENT S\nINNER JOIN PARENTS P ON S.ParentID = P.ParentID\nWHERE S.Class = 'XII';"}</code>
            </pre>
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300">
              <strong>Key Advantage:</strong> Clean separation between <em>structural join criteria</em> (in the <code>ON</code> clause) and <em>business data filters</em> (in the <code>WHERE</code> clause).
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-sky-300">
              <code>{"-- Classic Implicit Comma Join Syntax\nSELECT S.RollNo, S.Name, S.Class, P.FatherName, P.Phone\nFROM STUDENT S, PARENTS P\nWHERE S.ParentID = P.ParentID\n  AND S.Class = 'XII';"}</code>
            </pre>
            <div className="p-4 bg-sky-500/10 border border-sky-500/30 rounded-xl text-xs text-sky-300">
              <strong>Note:</strong> In implicit syntax, both the relational linking condition (<code>S.ParentID = P.ParentID</code>) and the filter condition (<code>S.Class = 'XII'</code>) are combined inside <code>WHERE</code>.
            </div>
          </div>
        )}

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-2">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="p-2">Feature</th>
                <th className="p-2 text-emerald-400">Explicit INNER JOIN</th>
                <th className="p-2 text-sky-400">Implicit WHERE Join</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-slate-300">
              <tr>
                <td className="p-2 font-bold text-white">ANSI Standard</td>
                <td className="p-2 text-emerald-300">SQL-92 Standard</td>
                <td className="p-2 text-sky-300">SQL-89 Legacy</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-white">Join Predicate Location</td>
                <td className="p-2 text-emerald-300">ON clause</td>
                <td className="p-2 text-sky-300">WHERE clause</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-white">Accidental Cross Join Risk</td>
                <td className="p-2 text-emerald-300">Low (Requires ON)</td>
                <td className="p-2 text-rose-300">High (Easy to forget WHERE)</td>
              </tr>
            </tbody>
          </table>
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
                Module 001_005 · Topic 3
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                ANSI SQL-92
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Explicit Join Syntax using INNER JOIN ... ON ...
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the modern ANSI SQL-92 explicit INNER JOIN syntax, cleanly decoupling table structural relationships from data filtering predicates.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Explicit Join Lab', icon: BookOpen },
            { id: 'code', label: '2. SQL Syntax Variations', icon: Code },
            { id: 'pitfalls', label: '3. Board Tips & Pitfalls', icon: AlertTriangle },
            { id: 'faqs', label: '4. FAQs (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '5. Plain Text Notes', icon: FileText }
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
        {activeTab === 'concept' && (
          <div className="space-y-6">
            <SyntaxComparator />
            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="Both implicit and explicit INNER JOIN syntax produce 100% identical results and performance execution plans in MySQL 8.0. For board answers, either syntax earns full credit!"
            />
          </div>
        )}

        {/* TAB 2 */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-sky-400 text-sm font-bold">
                <Terminal size={18} />
                <span>Explicit INNER JOIN Syntax Benchmark</span>
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl overflow-x-auto text-xs sm:text-sm text-emerald-400 font-mono leading-relaxed border border-slate-800/80">
                <code>{"-- Explicit INNER JOIN with ON condition\nSELECT S.RollNo, S.Name, S.Class, P.FatherName, P.Phone\nFROM STUDENT S\nINNER JOIN PARENTS P ON S.ParentID = P.ParentID\nWHERE S.Class = 'XII'\nORDER BY S.RollNo ASC;"}</code>
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
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <p>• <strong>The 'INNER' keyword is optional:</strong> In MySQL, writing <code>FROM Student JOIN Parents ON ...</code> is identical to <code>INNER JOIN</code>.</p>
                <p>• <strong>Do not put non-join filters in ON:</strong> While syntactically allowed, keep business filters (like <code>BirthYear &lt; 2019</code>) in the <code>WHERE</code> clause for clear, maintainable SQL.</p>
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
            <PlainTextPrint content={noteText} fileName="Topic3_Explicit_Join_Syntax_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
