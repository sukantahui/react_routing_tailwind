import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Play, ArrowRight 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

const InteractiveSandbox = () => {
  const [minMarks, setMinMarks] = useState(85);
  const [maxMarks, setMaxMarks] = useState(95);

  const students = [
    { roll: 101, name: 'Amit Kumar', marks: 92.50, city: 'Barrackpore' },
    { roll: 102, name: 'Susmita Roy', marks: 88.00, city: 'Shyamnagar' },
    { roll: 103, name: 'Debangshu Pal', marks: 95.00, city: 'Kolkata' },
    { roll: 104, name: 'Mamata Sharma', marks: 91.00, city: 'Barrackpore' },
    { roll: 105, name: 'Ajoy Sen', marks: 78.50, city: 'Naihati' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Layers size={20} />
          <span>Set Membership (IN) & Inclusive Range (BETWEEN ... AND) Explorer</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
            <span className="text-slate-400 font-semibold block">Range Slider: BETWEEN {minMarks} AND {maxMarks}</span>
            <div className="flex items-center gap-3">
              <input 
                type="range" 
                min="70" 
                max="90" 
                value={minMarks} 
                onChange={(e) => setMinMarks(Number(e.target.value))} 
                className="w-full cursor-pointer accent-sky-400"
              />
              <input 
                type="range" 
                min="90" 
                max="100" 
                value={maxMarks} 
                onChange={(e) => setMaxMarks(Number(e.target.value))} 
                className="w-full cursor-pointer accent-emerald-400"
              />
            </div>
          </div>
        </div>

        <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-emerald-400">
          <code>{"-- INCLUSIVE RANGE: Includes both " + minMarks + " and " + maxMarks + "\nSELECT * FROM Student\nWHERE TotalMarks BETWEEN " + minMarks + " AND " + maxMarks + ";\n\n-- SET MEMBERSHIP:\nSELECT * FROM Student\nWHERE City IN ('Barrackpore', 'Kolkata');"}</code>
        </pre>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-2">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-sky-400">
                <th className="p-2">RollNo</th>
                <th className="p-2">FullName</th>
                <th className="p-2">City</th>
                <th className="p-2">Marks</th>
                <th className="p-2">BETWEEN Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-slate-300">
              {students.map((s) => {
                const inRange = s.marks >= minMarks && s.marks <= maxMarks;
                return (
                  <tr key={s.roll} className={inRange ? 'bg-emerald-500/10 text-emerald-300' : 'opacity-40'}>
                    <td className="p-2 font-bold">{s.roll}</td>
                    <td className="p-2">{s.name}</td>
                    <td className="p-2">{s.city}</td>
                    <td className="p-2 font-bold text-amber-300">{s.marks.toFixed(2)}</td>
                    <td className="p-2">{inRange ? '✓ IN RANGE (Inclusive)' : '✗ Out of bounds'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default function Topic9() {
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
                Module 003 · Topic 9
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Set & Range Operators
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Set Membership & Range Filtering: IN, NOT IN, BETWEEN ... AND
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Filter data efficiently across discrete sets and continuous inclusive numerical/date ranges.
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
                <code>{"-- Set Membership\nSELECT * FROM Student WHERE City IN ('Barrackpore', 'Kolkata');\n\n-- Inclusive Range\nSELECT * FROM Student WHERE TotalMarks BETWEEN 85.00 AND 95.00;"}</code>
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
                <strong>Mentor Advice:</strong> Never forget: BETWEEN 50 AND 100 INCLUDES both 50 and 100! — Sukanta Hui
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 9 FAQs" questions={questions} />
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
              downloadFileName="topic9_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="Never forget: BETWEEN 50 AND 100 INCLUDES both 50 and 100! — Sukanta Hui" />

      </div>
    </div>
  );
}
