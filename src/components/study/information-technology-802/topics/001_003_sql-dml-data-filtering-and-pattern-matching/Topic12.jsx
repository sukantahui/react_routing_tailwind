import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Play, ArrowRight 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

const InteractiveSandbox = () => {
  const [streamOrder, setStreamOrder] = useState('ASC');
  const [marksOrder, setMarksOrder] = useState('DESC');

  const students = [
    { roll: 101, name: 'Amit Kumar', stream: 'Science', marks: 92 },
    { roll: 102, name: 'Susmita Roy', stream: 'Science', marks: 88 },
    { roll: 103, name: 'Debangshu Pal', stream: 'Commerce', marks: 95 },
    { roll: 104, name: 'Mamata Sharma', stream: 'Commerce', marks: 91 },
    { roll: 105, name: 'Ajoy Sen', stream: 'Humanities', marks: 78 }
  ];

  const sorted = [...students].sort((a, b) => {
    if (a.stream !== b.stream) {
      return streamOrder === 'ASC' ? a.stream.localeCompare(b.stream) : b.stream.localeCompare(a.stream);
    }
    return marksOrder === 'ASC' ? a.marks - b.marks : b.marks - a.marks;
  });

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Layers size={20} />
          <span>Interactive Multi-Column Sorting Workbench</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400 font-semibold">Primary Sort (Stream):</span>
            <div className="flex gap-1">
              {['ASC', 'DESC'].map(dir => (
                <button
                  key={dir}
                  onClick={() => setStreamOrder(dir)}
                  className={"px-3 py-1.5 rounded-lg font-mono font-bold cursor-pointer " + (streamOrder === dir ? 'bg-sky-500 text-white' : 'bg-slate-900 border border-slate-700 text-slate-400')}
                >
                  {dir}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 font-semibold">Secondary Sort (TotalMarks):</span>
            <div className="flex gap-1">
              {['ASC', 'DESC'].map(dir => (
                <button
                  key={dir}
                  onClick={() => setMarksOrder(dir)}
                  className={"px-3 py-1.5 rounded-lg font-mono font-bold cursor-pointer " + (marksOrder === dir ? 'bg-emerald-500 text-white' : 'bg-slate-900 border border-slate-700 text-slate-400')}
                >
                  {dir}
                </button>
              ))}
            </div>
          </div>
        </div>

        <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-emerald-400">
          <code>{"SELECT RollNo, FullName, Stream, TotalMarks\nFROM Student\nORDER BY Stream " + streamOrder + ", TotalMarks " + marksOrder + ";"}</code>
        </pre>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-2">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-sky-400">
                <th className="p-2">Sequence</th>
                <th className="p-2">RollNo</th>
                <th className="p-2">FullName</th>
                <th className="p-2">Stream (Primary)</th>
                <th className="p-2">TotalMarks (Secondary)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-slate-300">
              {sorted.map((s, idx) => (
                <tr key={s.roll}>
                  <td className="p-2 font-bold text-sky-400">#{idx + 1}</td>
                  <td className="p-2">{s.roll}</td>
                  <td className="p-2 font-bold text-white">{s.name}</td>
                  <td className="p-2 text-sky-300">{s.stream}</td>
                  <td className="p-2 font-bold text-amber-300">{s.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default function Topic12() {
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
                Module 003 · Topic 12
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Result Sorting
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Sorting Results: The ORDER BY Clause (ASC, DESC & Multi-Column)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Sort query results in ascending or descending sequence, handle multiple sorting keys, and understand NULL placement.
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
                <code>{"-- Single Column Sort\nSELECT * FROM Student ORDER BY TotalMarks DESC;\n\n-- Multi-Column Sort\nSELECT * FROM Student ORDER BY Stream ASC, TotalMarks DESC;"}</code>
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
                <strong>Mentor Advice:</strong> ORDER BY is always written as the LAST clause in a SELECT query. ASC is default. — Sukanta Hui
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 12 FAQs" questions={questions} />
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
              downloadFileName="topic12_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="ORDER BY is always written as the LAST clause in a SELECT query. ASC is default. — Sukanta Hui" />

      </div>
    </div>
  );
}
