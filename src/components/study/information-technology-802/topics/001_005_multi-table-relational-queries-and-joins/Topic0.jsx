import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Play, ArrowRight, Grid3X3, Zap 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

const CartesianSimulator = () => {
  const [table1Count, setTable1Count] = useState(3);
  const [table2Count, setTable2Count] = useState(2);

  const t1Rows = [
    { id: 'S1', name: 'Amit Kumar', class: 'XII' },
    { id: 'S2', name: 'Susmita Roy', class: 'XI' },
    { id: 'S3', name: 'Debangshu Pal', class: 'XII' },
    { id: 'S4', name: 'Mamata Sharma', class: 'X' },
    { id: 'S5', name: 'Ajoy Sen', class: 'XII' }
  ].slice(0, table1Count);

  const t2Rows = [
    { pid: 'P1', father: 'Rajesh Kumar', phone: '9830011223' },
    { pid: 'P2', father: 'Bimal Roy', phone: '9831122334' },
    { pid: 'P3', father: 'Chandan Pal', phone: '9832233445' },
    { pid: 'P4', father: 'Tapan Sen', phone: '9833344556' }
  ].slice(0, table2Count);

  const cartesianTuples = [];
  t1Rows.forEach(s => {
    t2Rows.forEach(p => {
      cartesianTuples.push({
        sId: s.id,
        sName: s.name,
        sClass: s.class,
        pId: p.pid,
        pFather: p.father,
        pPhone: p.phone,
        isValidMatch: s.id.slice(1) === p.pid.slice(1)
      });
    });
  });

  const degree = 3 + 3;
  const cardinality = t1Rows.length * t2Rows.length;

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Grid3X3 size={20} />
          <span>Interactive Cartesian Product (Cross Join) Generator</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-900 border border-slate-700/60 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold">Table 1 (STUDENT) Rows:</span>
              <span className="font-mono text-sky-400 font-bold">{table1Count} rows</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="5" 
              value={table1Count} 
              onChange={(e) => setTable1Count(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>

          <div className="p-4 bg-slate-900 border border-slate-700/60 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold">Table 2 (PARENTS) Rows:</span>
              <span className="font-mono text-emerald-400 font-bold">{table2Count} rows</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="4" 
              value={table2Count} 
              onChange={(e) => setTable2Count(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-sky-950/40 border border-sky-500/30 rounded-xl flex items-center gap-3">
            <Zap className="text-sky-400 shrink-0" size={24} />
            <div>
              <div className="text-xs text-sky-300 uppercase font-bold tracking-wider">Cardinality (Total Rows)</div>
              <div className="text-xl font-extrabold text-white font-mono">
                {t1Rows.length} &times; {t2Rows.length} = <span className="text-sky-400">{cardinality} rows</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center gap-3">
            <Layers className="text-emerald-400 shrink-0" size={24} />
            <div>
              <div className="text-xs text-emerald-300 uppercase font-bold tracking-wider">Degree (Total Columns)</div>
              <div className="text-xl font-extrabold text-white font-mono">
                3 + 3 = <span className="text-emerald-400">{degree} columns</span>
              </div>
            </div>
          </div>
        </div>

        <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-sky-300">
          <code>{"-- Unfiltered Cartesian Product (Cross Join)\nSELECT * FROM STUDENT, PARENTS;"}</code>
        </pre>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
            <span>Resulting Cartesian Product ({cardinality} combined tuples):</span>
            <span className="text-rose-400 font-normal">Notice meaningless pairings (Red) vs Valid relational matches (Green)</span>
          </div>
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 max-h-72 overflow-y-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="sticky top-0 bg-slate-900 border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="p-2">#</th>
                  <th className="p-2 text-sky-400">S.ID</th>
                  <th className="p-2 text-sky-400">S.Name</th>
                  <th className="p-2 text-emerald-400">P.ID</th>
                  <th className="p-2 text-emerald-400">P.Father</th>
                  <th className="p-2 text-emerald-400">P.Phone</th>
                  <th className="p-2">Relational Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-slate-300">
                {cartesianTuples.map((t, idx) => (
                  <tr key={idx} className={t.isValidMatch ? "bg-emerald-500/10" : "hover:bg-slate-900/50"}>
                    <td className="p-2 font-bold text-slate-600">{idx + 1}</td>
                    <td className="p-2 text-sky-300 font-bold">{t.sId}</td>
                    <td className="p-2 text-white">{t.sName}</td>
                    <td className="p-2 text-emerald-300 font-bold">{t.pId}</td>
                    <td className="p-2">{t.pFather}</td>
                    <td className="p-2 text-slate-400">{t.pPhone}</td>
                    <td className="p-2">
                      {t.isValidMatch ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">
                          <CheckCircle2 size={12} /> Valid Equi-Match
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-400 text-[10px] bg-rose-500/10 px-2 py-0.5 rounded">
                          <XCircle size={12} /> Cartesian Artifact
                        </span>
                      )}
                    </td>
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

export default function Topic0() {
  const [activeTab, setActiveTab] = useState('concept');

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 001_005 · Topic 0
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Core Foundation
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Need for Multi-Table Relational Queries & Cartesian Product (Cross Join)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understand why normalized databases partition data across multiple tables, how Cartesian products combine rows mechanically, and how Degree and Cardinality are computed.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Cartesian Product Lab', icon: BookOpen },
            { id: 'code', label: '2. SQL Syntax & Mechanics', icon: Code },
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
            <CartesianSimulator />
            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="Always remember the Golden Rule of Cartesian Products for board MCQs: Cardinality multiplies (M × N), while Degree adds (D1 + D2). Never mix up rows and columns!"
            />
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-sky-400 text-sm font-bold">
                <Terminal size={18} />
                <span>Cartesian Product SQL Queries</span>
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl overflow-x-auto text-xs sm:text-sm text-emerald-400 font-mono leading-relaxed border border-slate-800/80">
                <code>{"-- Method 1: Comma-separated Table List without WHERE\nSELECT *\nFROM STUDENT, PARENTS;\n\n-- Method 2: Explicit CROSS JOIN syntax (ANSI standard)\nSELECT S.RollNo, S.Name, P.FatherName\nFROM STUDENT S\nCROSS JOIN PARENTS P;"}</code>
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
                <p>• <strong>Accidental Cross Joins:</strong> Forgetting the WHERE join condition in multi-table queries is the #1 student mistake, generating massive redundant datasets.</p>
                <p>• <strong>Degree vs Cardinality Calculation:</strong> If Table A has 5 rows and 4 columns, and Table B has 6 rows and 3 columns, the Cartesian product has <strong>30 rows</strong> (5 &times; 6) and <strong>7 columns</strong> (4 + 3).</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 0 FAQs" questions={questions} />
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic0_Cartesian_Product_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
