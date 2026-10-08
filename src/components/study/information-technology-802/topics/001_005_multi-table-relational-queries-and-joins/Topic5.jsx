import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Play, ArrowRight, Filter, Calendar 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

const FilteredJoinSimulator = () => {
  const [maxBirthYear, setMaxBirthYear] = useState(2008);
  const [excludeClass, setExcludeClass] = useState('X');

  const students = [
    { roll: 101, name: 'Amit Kumar', pid: 'P1', class: 'XII', birthYear: 2007, father: 'Rajesh Kumar', phone: '9830011223' },
    { roll: 102, name: 'Susmita Roy', pid: 'P2', class: 'XI', birthYear: 2008, father: 'Bimal Roy', phone: '9831122334' },
    { roll: 103, name: 'Debangshu Pal', pid: 'P3', class: 'XII', birthYear: 2007, father: 'Chandan Pal', phone: '9832233445' },
    { roll: 104, name: 'Mamata Sharma', pid: 'P1', class: 'X', birthYear: 2009, father: 'Rajesh Kumar', phone: '9830011223' },
    { roll: 105, name: 'Ajoy Sen', pid: 'P4', class: 'XII', birthYear: 2006, father: 'Tapan Sen', phone: '9833344556' }
  ];

  const filtered = students.filter(s => s.birthYear <= maxBirthYear && s.class !== excludeClass);

  const queryCode = "-- Compound Filtered Equi-Join Query\n" +
    "SELECT S.RollNo, S.Name, S.Class, S.BirthYear, P.FatherName, P.Phone\n" +
    "FROM STUDENT S, PARENTS P\n" +
    "WHERE S.ParentID = P.ParentID\n" +
    "  AND S.BirthYear <= " + maxBirthYear +
    (excludeClass !== 'None' ? "\n  AND S.Class <> '" + excludeClass + "'" : "") + ";";

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Filter size={20} />
          <span>Multi-Condition Filtered Join Explorer</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-900 border border-slate-700/60 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold">Max BirthYear (S.BirthYear &le;):</span>
              <span className="font-mono text-sky-400 font-bold">{maxBirthYear}</span>
            </div>
            <input 
              type="range" 
              min="2005" 
              max="2010" 
              value={maxBirthYear} 
              onChange={(e) => setMaxBirthYear(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>

          <div className="p-4 bg-slate-900 border border-slate-700/60 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold">Exclude Class (S.Class &lt;&gt;):</span>
              <span className="font-mono text-rose-400 font-bold">{excludeClass}</span>
            </div>
            <select
              value={excludeClass}
              onChange={(e) => setExcludeClass(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
            >
              <option value="None">Do not exclude any class</option>
              <option value="X">Class X</option>
              <option value="XI">Class XI</option>
              <option value="XII">Class XII</option>
            </select>
          </div>
        </div>

        <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-emerald-300">
          <code>{queryCode}</code>
        </pre>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
            <span>Filtered Tuples Returned ({filtered.length} matching rows):</span>
            <span className="text-emerald-400 font-mono text-xs">{filtered.length} of {students.length} students</span>
          </div>
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                  <th className="p-2.5 text-sky-400">RollNo</th>
                  <th className="p-2.5 text-sky-400">Student Name</th>
                  <th className="p-2.5">Class</th>
                  <th className="p-2.5 text-amber-400">BirthYear</th>
                  <th className="p-2.5 text-emerald-400">Father Name</th>
                  <th className="p-2.5 text-emerald-400">Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-slate-300">
                {filtered.map(s => (
                  <tr key={s.roll} className="hover:bg-slate-900/40">
                    <td className="p-2.5 font-bold text-sky-300">#{s.roll}</td>
                    <td className="p-2.5 text-white font-semibold">{s.name}</td>
                    <td className="p-2.5">{s.class}</td>
                    <td className="p-2.5 text-amber-300 font-bold">{s.birthYear}</td>
                    <td className="p-2.5 text-slate-200">{s.father}</td>
                    <td className="p-2.5 text-slate-400">{s.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
        
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 001_005 · Topic 5
              </span>
              <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-semibold rounded-full">
                Compound Filtering
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Filtering Joined Records: Selecting Students by BirthYear and Class with Parent Names
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Learn how to chain multiple logical predicates (AND, OR, NOT, &lt;&gt;) with table join conditions to build powerful analytical queries.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Filtered Join Lab', icon: BookOpen },
            { id: 'code', label: '2. SQL Filter Queries', icon: Code },
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
            <FilteredJoinSimulator />
            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="When combining joins with AND conditions, always verify that the join condition (S.ParentID = P.ParentID) is present first! Without it, adding filters on a Cartesian product still gives corrupt pairings."
            />
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-sky-400 text-sm font-bold">
                <Terminal size={18} />
                <span>Compound Filter Join Queries</span>
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl overflow-x-auto text-xs sm:text-sm text-emerald-400 font-mono leading-relaxed border border-slate-800/80">
                <code>{"-- Display students born before 2019 who are NOT in Class II\nSELECT S.RollNo, S.Name, S.Class, S.BirthYear, P.FatherName, P.Phone\nFROM STUDENT S, PARENTS P\nWHERE S.ParentID = P.ParentID\n  AND S.BirthYear < 2019\n  AND S.Class <> 'II';"}</code>
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
                <p>• <strong>Operator Precedence:</strong> AND has higher precedence than OR. When mixing AND and OR in WHERE, always use parentheses: <code>WHERE S.ParentID = P.ParentID AND (S.Class = 'XI' OR S.Class = 'XII')</code>.</p>
                <p>• <strong>Inequality Operators:</strong> Both <code>&lt;&gt;</code> and <code>!=</code> are supported in MySQL, but <code>&lt;&gt;</code> is the ANSI SQL standard preferred by CBSE examiners.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 5 FAQs" questions={questions} />
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic5_Filtering_Joined_Records_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
