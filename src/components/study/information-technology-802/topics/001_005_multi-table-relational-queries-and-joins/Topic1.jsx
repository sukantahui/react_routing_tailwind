import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Play, ArrowRight, Key, Link 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const EquiJoinBridgeSimulator = () => {
  const [selectedParentId, setSelectedParentId] = useState('P1');

  const parents = [
    { pid: 'P1', father: 'Rajesh Kumar', phone: '9830011223', city: 'Kolkata' },
    { pid: 'P2', father: 'Bimal Roy', phone: '9831122334', city: 'Barrackpore' },
    { pid: 'P3', father: 'Chandan Pal', phone: '9832233445', city: 'Shyamnagar' },
    { pid: 'P4', father: 'Tapan Sen', phone: '9833344556', city: 'Kolkata' }
  ];

  const students = [
    { roll: 101, name: 'Amit Kumar', pid: 'P1', class: 'XII' },
    { roll: 102, name: 'Susmita Roy', pid: 'P2', class: 'XI' },
    { roll: 103, name: 'Debangshu Pal', pid: 'P3', class: 'XII' },
    { roll: 104, name: 'Mamata Sharma', pid: 'P1', class: 'X' },
    { roll: 105, name: 'Ajoy Sen', pid: 'P4', class: 'XII' }
  ];

  const matchingStudents = students.filter(s => s.pid === selectedParentId);
  const activeParent = parents.find(p => p.pid === selectedParentId);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Link size={20} />
          <span>Equi-Join Primary Key &rarr; Foreign Key Relational Bridge</span>
        </div>

        {/* Parent Selector Buttons */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-400">Click a Parent record to observe Foreign Key linkage:</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {parents.map(p => (
              <button
                key={p.pid}
                onClick={() => setSelectedParentId(p.pid)}
                className={"p-3 rounded-xl text-left border transition-all cursor-pointer " + (
                  selectedParentId === p.pid 
                    ? "bg-emerald-500/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-400 text-xs">{p.pid} (PK)</span>
                  <Key size={14} className="text-amber-400" />
                </div>
                <div className="text-xs font-bold text-slate-200 truncate mt-1">{p.father}</div>
                <div className="text-[10px] text-slate-500">{p.city}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Equi-Join Query Display */}
        <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-emerald-300">
          <code>{"-- Equi-Join Query linking on Common Column ParentID\nSELECT S.RollNo, S.Name, S.Class, P.FatherName, P.Phone\nFROM STUDENT S, PARENTS P\nWHERE S.ParentID = P.ParentID\n  AND P.ParentID = '\" + selectedParentId + \"';"}</code>
        </pre>

        {/* Live Relational Match Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Database size={16} /> Selected Parent Entity (PARENTS Table)
            </div>
            {activeParent && (
              <div className="space-y-1.5 text-xs">
                <div><span className="text-slate-500">ParentID (PK):</span> <span className="font-mono font-bold text-amber-300">{activeParent.pid}</span></div>
                <div><span className="text-slate-500">Father Name:</span> <span className="text-white font-bold">{activeParent.father}</span></div>
                <div><span className="text-slate-500">Contact Phone:</span> <span className="text-slate-300">{activeParent.phone}</span></div>
                <div><span className="text-slate-500">Residence City:</span> <span className="text-slate-300">{activeParent.city}</span></div>
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
              <Layers size={16} /> Associated Student Children ({matchingStudents.length} match)
            </div>
            <div className="space-y-2">
              {matchingStudents.map(s => (
                <div key={s.roll} className="p-2.5 bg-slate-950 rounded-lg border border-sky-500/30 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white">Roll #{s.roll}: {s.name}</span>
                    <span className="block text-[10px] text-slate-400">Class: {s.class}</span>
                  </div>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">
                    FK: {s.pid}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function Topic1() {
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
                Module 001_005 · Topic 1
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Relational Keys
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Equi-Join Fundamentals: Linking Tables via Common Foreign Key Columns
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master how Equi-Joins filter out Cartesian artifacts by requiring equality between Primary Keys and Foreign Keys across relational entities.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Equi-Join Bridge Lab', icon: BookOpen },
            { id: 'code', label: '2. SQL Equi-Join Syntax', icon: Code },
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
            <EquiJoinBridgeSimulator />
            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="An Equi-Join is simply a Cartesian product filtered by an equality operator '=' on matching key columns. Without this condition, MySQL outputs meaningless combinations."
            />
          </div>
        )}

        {/* TAB 2 */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-sky-400 text-sm font-bold">
                <Terminal size={18} />
                <span>Equi-Join Query Formulations</span>
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl overflow-x-auto text-xs sm:text-sm text-emerald-400 font-mono leading-relaxed border border-slate-800/80">
                <code>{"-- Standard Equi-Join across STUDENT and PARENTS\nSELECT S.RollNo, S.Name, S.Class, P.FatherName, P.Phone\nFROM STUDENT S, PARENTS P\nWHERE S.ParentID = P.ParentID;"}</code>
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
                <p>• <strong>Primary Key / Foreign Key Mismatch:</strong> In board exams, identify which table has the PRIMARY KEY (e.g. PARENTS.ParentID) and which holds the FOREIGN KEY (e.g. STUDENT.ParentID).</p>
                <p>• <strong>One-to-Many Relationships:</strong> One parent (e.g. P1 Rajesh Kumar) can have multiple children in the student table (Amit and Mamata).</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 1 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5 */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic1_Equi_Join_Fundamentals_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
