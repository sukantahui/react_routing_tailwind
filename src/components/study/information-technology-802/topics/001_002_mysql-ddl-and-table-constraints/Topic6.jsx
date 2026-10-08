import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, PlusCircle 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

export default function Topic6() {
  const [activeTab, setActiveTab] = useState('add');

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002 · Topic 6
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                ALTER TABLE ADD Master
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Modifying Live Table Structure with ALTER TABLE: Adding Columns
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Learn how to expand existing relations using ALTER TABLE ADD. Master column positioning with FIRST and AFTER, and understand why Degree increases while Cardinality remains intact.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'add', label: '1. ALTER TABLE ADD Syntax', icon: PlusCircle },
            { id: 'position', label: '2. FIRST & AFTER Positioning', icon: Layers },
            { id: 'code', label: '3. SQL Schema Lab', icon: Code },
            { id: 'pitfalls', label: '4. Board Pitfalls', icon: AlertTriangle },
            { id: 'faqs', label: '5. FAQs (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '6. Printable Notes', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 border-b-2 border-sky-400'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/40'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: SYNTAX */}
        {activeTab === 'add' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 text-sky-400">
                <PlusCircle size={20} />
                <span>The Standard Syntax for Adding a Column</span>
              </h3>
              
              <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30 font-mono text-xs sm:text-sm text-slate-300">
                <span className="text-sky-400 font-bold">ALTER TABLE</span> <span className="text-amber-300">table_name</span> <span className="text-emerald-400 font-bold">ADD</span> <span className="text-purple-300">column_name</span> <span className="text-sky-300">DATA_TYPE</span> [<span className="text-slate-400">constraints</span>];
              </div>

              <div className="p-4 bg-sky-500/10 border border-sky-500/20 rounded-xl space-y-2 text-xs">
                <h4 className="font-bold text-sky-400">Classic Board Question:</h4>
                <p className="text-slate-300">
                  <em>"Write the SQL command to add a new column 'BloodGroup' of type CHAR(2) to the 'Student' table."</em>
                </p>
                <div className="p-2.5 bg-slate-950 rounded font-mono text-emerald-300">
                  ALTER TABLE Student ADD BloodGroup CHAR(2);
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block">Effect on Degree:</span>
                  <p className="text-slate-400">Degree (number of columns) increases by <strong>+1</strong> for each column added.</p>
                </div>
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold block">Effect on Cardinality:</span>
                  <p className="text-slate-400">Cardinality (number of rows) remains <strong>completely unchanged</strong>. Existing rows receive NULL.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: POSITIONING */}
        {activeTab === 'position' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">Positioning New Columns: FIRST and AFTER</h3>
              <p className="text-xs text-slate-300">
                By default, MySQL appends new columns to the end of the table. You can control exact placement:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-sky-400 font-mono block">1. Make it the FIRST Column</span>
                  <div className="p-2 bg-slate-950 rounded font-mono text-emerald-300">
                    ALTER TABLE Student ADD SerialNo INT FIRST;
                  </div>
                  <p className="text-slate-400">Places SerialNo at index 1 before all other columns.</p>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-400 font-mono block">2. Place AFTER an Existing Column</span>
                  <div className="p-2 bg-slate-950 rounded font-mono text-emerald-300">
                    ALTER TABLE Student ADD DOB DATE AFTER StudentName;
                  </div>
                  <p className="text-slate-400">Places DOB immediately following the StudentName column.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CODE LAB */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-sky-400 text-sm font-bold">
                  <Terminal size={18} />
                  <span>ALTER TABLE ADD Laboratory</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">MySQL 8.0</span>
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl overflow-x-auto text-xs sm:text-sm text-emerald-400 font-mono leading-relaxed border border-slate-800/80">
                <code>{`CREATE TABLE Student (
    RollNo INT PRIMARY KEY,
    StudentName VARCHAR(50) NOT NULL
);

-- 1. Standard Add (Appended to end) -> Degree = 3
ALTER TABLE Student ADD BloodGroup CHAR(2);

-- 2. Add with DEFAULT and NOT NULL -> Degree = 4
ALTER TABLE Student ADD City VARCHAR(30) NOT NULL DEFAULT 'Barrackpore';

-- 3. Add column at specific position AFTER StudentName -> Degree = 5
ALTER TABLE Student ADD DateOfBirth DATE AFTER StudentName;

DESCRIBE Student;`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 4: PITFALLS */}
        {activeTab === 'pitfalls' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-amber-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertTriangle size={22} />
                <h3 className="text-lg font-bold text-white">Board Examination Pitfalls & Tips</h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 space-y-1">
                  <h4 className="font-bold">1. Confusing ALTER TABLE (DDL) with UPDATE (DML)</h4>
                  <p className="text-slate-300">
                    To add a new <strong>column</strong> (structural change), use <code className="text-emerald-300 font-mono">ALTER TABLE ... ADD</code>. To add or change <strong>row values</strong>, use <code className="text-amber-300 font-mono">UPDATE</code> or <code className="text-amber-300 font-mono">INSERT</code>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 6 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 6: PRINTABLE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              title="CBSE Class XII IT 802 – ALTER TABLE ADD Column Revision Sheet"
              stampEnabled={true}
              showDownload={true}
              downloadButtonText="Download Plain Text Note"
              downloadFileName="topic6_alter_table_add_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="ALTER TABLE Student ADD BloodGroup CHAR(2); modifies table schema and increases Degree by 1. Existing rows get NULL! — Sukanta Hui" />

      </div>
    </div>
  );
}