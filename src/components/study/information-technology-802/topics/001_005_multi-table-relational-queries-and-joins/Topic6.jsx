import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Play, ArrowRight, ArrowUpDown, ArrowDownAZ 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

const JoinSortingSimulator = () => {
  const [sortCol, setSortCol] = useState('roll');
  const [sortDir, setSortDir] = useState('DESC');

  const dataset = [
    { roll: 101, name: 'Amit Kumar', pid: 'P1', class: 'XII', father: 'Rajesh Kumar', marks: 92.50 },
    { roll: 102, name: 'Susmita Roy', pid: 'P2', class: 'XI', father: 'Bimal Roy', marks: 88.00 },
    { roll: 103, name: 'Debangshu Pal', pid: 'P3', class: 'XII', father: 'Chandan Pal', marks: 95.00 },
    { roll: 104, name: 'Mamata Sharma', pid: 'P1', class: 'X', father: 'Rajesh Kumar', marks: 91.00 },
    { roll: 105, name: 'Ajoy Sen', pid: 'P4', class: 'XII', father: 'Tapan Sen', marks: 78.50 }
  ];

  const sorted = [...dataset].sort((a, b) => {
    let valA = a[sortCol];
    let valB = b[sortCol];
    if (typeof valA === 'string') {
      return sortDir === 'ASC' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return sortDir === 'ASC' ? valA - valB : valB - valA;
  });

  const queryCode = "-- Join with ORDER BY Clause\n" +
    "SELECT S.RollNo, S.Name, S.Class, S.Marks, P.FatherName\n" +
    "FROM STUDENT S, PARENTS P\n" +
    "WHERE S.ParentID = P.ParentID\n" +
    "ORDER BY " + (sortCol === 'roll' ? 'S.RollNo' : sortCol === 'name' ? 'S.Name' : sortCol === 'marks' ? 'S.Marks' : 'P.FatherName') + " " + sortDir + ";";

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <ArrowUpDown size={20} />
          <span>Multi-Table Join with ORDER BY Sorting Pipeline</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Sort Column:</span>
            {['roll', 'name', 'marks', 'father'].map(col => (
              <button
                key={col}
                onClick={() => setSortCol(col)}
                className={"px-3 py-1.5 rounded-lg font-bold cursor-pointer " + (
                  sortCol === col ? "bg-sky-500 text-white" : "bg-slate-900 text-slate-400 border border-slate-700"
                )}
              >
                {col === 'roll' ? 'S.RollNo' : col === 'name' ? 'S.Name' : col === 'marks' ? 'S.Marks' : 'P.FatherName'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Direction:</span>
            {['DESC', 'ASC'].map(dir => (
              <button
                key={dir}
                onClick={() => setSortDir(dir)}
                className={"px-3 py-1.5 rounded-lg font-bold cursor-pointer " + (
                  sortDir === dir ? "bg-emerald-500 text-white shadow" : "bg-slate-900 text-slate-400 border border-slate-700"
                )}
              >
                {dir === 'DESC' ? 'DESC (Descending)' : 'ASC (Ascending)'}
              </button>
            ))}
          </div>
        </div>

        <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-emerald-300">
          <code>{queryCode}</code>
        </pre>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                <th className="p-3 text-sky-400">RollNo</th>
                <th className="p-3 text-sky-400">Student Name</th>
                <th className="p-3">Class</th>
                <th className="p-3 text-amber-400">Marks</th>
                <th className="p-3 text-emerald-400">Father Name</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-slate-300">
              {sorted.map(s => (
                <tr key={s.roll} className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-sky-300">#{s.roll}</td>
                  <td className="p-3 text-white font-semibold">{s.name}</td>
                  <td className="p-3">{s.class}</td>
                  <td className="p-3 text-amber-300 font-bold">{s.marks}%</td>
                  <td className="p-3 text-emerald-300">{s.father}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default function Topic6() {
  const [activeTab, setActiveTab] = useState('concept');

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 001_005 · Topic 6
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Sorting & Ordering
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Combining Joins with Sorting: Displaying Students in Specific Classes in Descending Order of Roll Number
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the execution flow of sorting multi-table query result sets by columns from either the primary or foreign relation using ORDER BY.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Sorting Workbench', icon: BookOpen },
            { id: 'code', label: '2. SQL Sorting Syntax', icon: Code },
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

        {activeTab === 'concept' && (
          <div className="space-y-6">
            <JoinSortingSimulator />
            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="ORDER BY is always placed at the very end of your SQL statement. In multi-table queries, you can sort by any column present in either joined table, even if it is not projected in SELECT!"
            />
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-sky-400 text-sm font-bold">
                <Terminal size={18} />
                <span>Join with ORDER BY Sorting Queries</span>
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl overflow-x-auto text-xs sm:text-sm text-emerald-400 font-mono leading-relaxed border border-slate-800/80">
                <code>{"-- Display Class XII students sorted in descending order of RollNo\nSELECT S.RollNo, S.Name, S.Class, P.FatherName, P.Phone\nFROM STUDENT S, PARENTS P\nWHERE S.ParentID = P.ParentID\n  AND S.Class = 'XII'\nORDER BY S.RollNo DESC;\n\n-- Multi-Column Sorting: Class ASC, then Marks DESC\nSELECT S.RollNo, S.Name, S.Class, S.Marks, P.FatherName\nFROM STUDENT S, PARENTS P\nWHERE S.ParentID = P.ParentID\nORDER BY S.Class ASC, S.Marks DESC;"}</code>
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'pitfalls' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-amber-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertTriangle size={22} />
                <h3 className="text-lg font-bold text-white">Board Examination Pitfalls & Tips</h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <p>• <strong>Clause Ordering:</strong> The correct order of clauses is <code>SELECT &rarr; FROM &rarr; WHERE &rarr; GROUP BY &rarr; HAVING &rarr; ORDER BY</code>. Putting WHERE after ORDER BY causes a fatal syntax error.</p>
                <p>• <strong>Default Order:</strong> If <code>DESC</code> is omitted, MySQL sorts in ascending order (<code>ASC</code>) by default.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 6 FAQs" questions={questions} />
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic6_Combining_Joins_with_Sorting_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
