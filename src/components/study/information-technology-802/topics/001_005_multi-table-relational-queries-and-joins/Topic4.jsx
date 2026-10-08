import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Play, ArrowRight, UserCheck, PhoneCall 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

const StudentParentsWorkbench = () => {
  const [selectedClass, setSelectedClass] = useState('All');

  const joinedData = [
    { roll: 101, name: 'Amit Kumar', pid: 'P1', class: 'XII', birthYear: 2007, father: 'Rajesh Kumar', phone: '9830011223' },
    { roll: 102, name: 'Susmita Roy', pid: 'P2', class: 'XI', birthYear: 2008, father: 'Bimal Roy', phone: '9831122334' },
    { roll: 103, name: 'Debangshu Pal', pid: 'P3', class: 'XII', birthYear: 2007, father: 'Chandan Pal', phone: '9832233445' },
    { roll: 104, name: 'Mamata Sharma', pid: 'P1', class: 'X', birthYear: 2009, father: 'Rajesh Kumar', phone: '9830011223' },
    { roll: 105, name: 'Ajoy Sen', pid: 'P4', class: 'XII', birthYear: 2006, father: 'Tapan Sen', phone: '9833344556' }
  ];

  const filtered = selectedClass === 'All' ? joinedData : joinedData.filter(d => d.class === selectedClass);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <UserCheck size={20} />
          <span>CBSE Benchmark: STUDENT &times; PARENTS Academic Directory</span>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold">Filter Class:</span>
          {['All', 'X', 'XI', 'XII'].map(c => (
            <button
              key={c}
              onClick={() => setSelectedClass(c)}
              className={"px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer " + (
                selectedClass === c ? "bg-sky-500 text-white shadow" : "bg-slate-900 text-slate-400 border border-slate-700"
              )}
            >
              {c === 'All' ? 'All Classes' : "Class " + c}
            </button>
          ))}
        </div>

        {/* Live SQL */}
        <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-emerald-300">
          <code>{"-- Case Study Relational Query\nSELECT S.RollNo, S.Name, S.Class, S.BirthYear, P.FatherName, P.Phone\nFROM STUDENT S, PARENTS P\nWHERE S.ParentID = P.ParentID\" + (selectedClass !== 'All' ? \"\n  AND S.Class = '\" + selectedClass + \"'\" : \"\") + \";"}</code>
        </pre>

        {/* Result Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                <th className="p-3 text-sky-400">RollNo</th>
                <th className="p-3 text-sky-400">Student Name</th>
                <th className="p-3">Class</th>
                <th className="p-3">BirthYear</th>
                <th className="p-3 text-emerald-400">ParentID</th>
                <th className="p-3 text-emerald-400">Father Name</th>
                <th className="p-3 text-emerald-400">Parent Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-slate-300">
              {filtered.map(row => (
                <tr key={row.roll} className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-sky-300">#{row.roll}</td>
                  <td className="p-3 text-white font-semibold">{row.name}</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">{row.class}</span></td>
                  <td className="p-3 text-amber-300">{row.birthYear}</td>
                  <td className="p-3 font-bold text-emerald-400">{row.pid}</td>
                  <td className="p-3 text-slate-200">{row.father}</td>
                  <td className="p-3 text-slate-400 flex items-center gap-1.5">
                    <PhoneCall size={12} className="text-emerald-400" /> {row.phone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                Module 001_005 · Topic 4
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                CBSE Board Case Study
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Real-World Multi-Table Case Study: Querying STUDENT and PARENTS Tables on ParentID
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Analyze the canonical CBSE Class XII board examination schema: linking student academic records with parental contact information via ParentID.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Case Study Lab', icon: BookOpen },
            { id: 'code', label: '2. Schema & Queries', icon: Code },
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
            <StudentParentsWorkbench />
            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="This STUDENT and PARENTS schema appears repeatedly in CBSE Class XII IT (802) board question papers. Pay close attention to how ParentID acts as the relational glue between child and parent!"
            />
          </div>
        )}

        {/* TAB 2 */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-sky-400 text-sm font-bold">
                <Terminal size={18} />
                <span>STUDENT & PARENTS Complete SQL Queries</span>
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl overflow-x-auto text-xs sm:text-sm text-emerald-400 font-mono leading-relaxed border border-slate-800/80">
                <code>{"-- Display Student Name, Class, and Father Name for all Class XII students\nSELECT S.Name, S.Class, P.FatherName\nFROM STUDENT S, PARENTS P\nWHERE S.ParentID = P.ParentID\n  AND S.Class = 'XII';\n\n-- Find Father Name and Phone for student 'Amit Kumar'\nSELECT P.FatherName, P.Phone\nFROM STUDENT S, PARENTS P\nWHERE S.ParentID = P.ParentID\n  AND S.Name = 'Amit Kumar';"}</code>
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
                <p>• <strong>Case Sensitivity in String Literals:</strong> Remember string values in WHERE (like <code>'XII'</code> or <code>'Amit Kumar'</code>) must match exact quotes.</p>
                <p>• <strong>Projections:</strong> Only project the columns requested by the board question (e.g. <code>SELECT S.Name, P.FatherName</code> instead of <code>SELECT *</code>).</p>
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
            <PlainTextPrint content={noteText} fileName="Topic4_Student_Parents_Case_Study_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
