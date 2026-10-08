import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Play, ArrowRight, Table, Tag 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

const ImplicitJoinSandbox = () => {
  const [useAlias, setUseAlias] = useState(true);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Tag size={20} />
          <span>Implicit Join Syntax & Table Aliasing Explorer</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setUseAlias(true)}
            className={"px-4 py-2 rounded-xl text-xs font-bold cursor-pointer " + (
              useAlias ? "bg-sky-500 text-white shadow-lg" : "bg-slate-900 border border-slate-700 text-slate-400"
            )}
          >
            1. With Short Aliases (S, P) [Recommended]
          </button>
          <button
            onClick={() => setUseAlias(false)}
            className={"px-4 py-2 rounded-xl text-xs font-bold cursor-pointer " + (
              !useAlias ? "bg-emerald-500 text-white shadow-lg" : "bg-slate-900 border border-slate-700 text-slate-400"
            )}
          >
            2. Full Table Names (STUDENT, PARENTS)
          </button>
        </div>

        <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-sky-300">
          <code>{useAlias 
            ? "-- Implicit Join with Aliases S and P\nSELECT S.RollNo, S.Name, S.Class, P.FatherName, P.Phone\nFROM STUDENT S, PARENTS P\nWHERE S.ParentID = P.ParentID;"
            : "-- Implicit Join with Full Table Names\nSELECT STUDENT.RollNo, STUDENT.Name, STUDENT.Class, PARENTS.FatherName, PARENTS.Phone\nFROM STUDENT, PARENTS\nWHERE STUDENT.ParentID = PARENTS.ParentID;"
          }</code>
        </pre>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-sky-400">Why Use Comma (FROM T1, T2)?</span>
            <p className="text-slate-300 leading-relaxed">
              In SQL-89 implicit syntax, listing tables separated by commas in the FROM clause establishes the table sources, while the WHERE clause filters out non-matching permutations.
            </p>
          </div>
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-400">Why Dot Notation (S.ParentID)?</span>
            <p className="text-slate-300 leading-relaxed">
              When both tables contain a column named <code>ParentID</code>, referencing just <code>ParentID</code> causes MySQL to throw <code>ERROR 1052: Column in field list is ambiguous</code>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function Topic2() {
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
                Module 001_005 · Topic 2
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                SQL-89 Standard
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understand the classic SQL-89 comma-based multi-table query syntax, table alias conventions, and disambiguating common column names.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Implicit Join Lab', icon: BookOpen },
            { id: 'code', label: '2. SQL Syntax Rules', icon: Code },
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
            <ImplicitJoinSandbox />
            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="CBSE board exam questions frequently use the comma syntax in the FROM clause (e.g. FROM Student S, Parents P WHERE S.ParentID = P.ParentID). Always write the join condition first before adding any other filters."
            />
          </div>
        )}

        {/* TAB 2 */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-sky-400 text-sm font-bold">
                <Terminal size={18} />
                <span>Implicit Multi-Table Syntax Benchmark</span>
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl overflow-x-auto text-xs sm:text-sm text-emerald-400 font-mono leading-relaxed border border-slate-800/80">
                <code>{"-- Joining 2 Tables (Requires 1 Join Condition)\nSELECT S.RollNo, S.Name, P.FatherName, P.Phone\nFROM STUDENT S, PARENTS P\nWHERE S.ParentID = P.ParentID;\n\n-- Joining 3 Tables (Requires 2 Join Conditions)\nSELECT S.Name, C.CourseName, T.TeacherName\nFROM STUDENT S, ENROLLMENT E, TEACHER T\nWHERE S.RollNo = E.RollNo\n  AND E.TeacherID = T.TeacherID;"}</code>
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
                <p>• <strong>Ambiguous Column Name Error:</strong> Writing <code>SELECT Name, ParentID FROM Student, Parents</code> fails because <code>ParentID</code> is present in both tables. Always prefix with <code>Student.ParentID</code> or <code>S.ParentID</code>.</p>
                <p>• <strong>N-1 Join Rule:</strong> When joining N tables, you must have at least N-1 equality conditions in the WHERE clause, or you will trigger a partial Cartesian explosion.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 2 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5 */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic2_Implicit_Join_Syntax_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
