import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, Play, ArrowRight 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
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
                Module 003 · Topic 0
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                DML Data Ingestion
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              INSERT INTO Statement (Handling String, Date, and Decimal Literals)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master inserting row tuples into MySQL tables, respecting single quotes for strings/dates and precision for numerics.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Conceptual Rules', icon: BookOpen },
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

        {/* TAB 1: CONCEPTUAL RULES */}
        {activeTab === 'concept' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 text-sky-400">
                <Layers size={20} />
                <span>Core Rules & Architectural Takeaways</span>
              </h3>

              <div className="grid grid-cols-1 gap-3 text-xs sm:text-sm">
                
                  <div key="INSERT INTO is a cor" className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex items-start gap-2.5 text-slate-300">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{"INSERT INTO is a core DML command that appends new row tuples to an existing table."}</span>
                  </div>
                
                  <div key="Syntax 1 (All column" className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex items-start gap-2.5 text-slate-300">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{"Syntax 1 (All columns in schema order): INSERT INTO table_name VALUES (v1, v2, v3...);"}</span>
                  </div>
                
                  <div key="Syntax 2 (Explicit c" className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex items-start gap-2.5 text-slate-300">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{"Syntax 2 (Explicit column projection): INSERT INTO table_name (col1, col3) VALUES (v1, v3);"}</span>
                  </div>
                
                  <div key="Literal Quoting Rule" className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex items-start gap-2.5 text-slate-300">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{"Literal Quoting Rule: Character strings ('Amit') and Dates ('2026-10-08') MUST be enclosed in single quotes."}</span>
                  </div>
                
                  <div key="Numeric Literals (In" className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex items-start gap-2.5 text-slate-300">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{"Numeric Literals (Integers, Decimals) and the keyword NULL must NOT be enclosed in quotes."}</span>
                  </div>
                
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CODE LAB */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-sky-400 text-sm font-bold">
                  <Terminal size={18} />
                  <span>MySQL DML Workbench Script</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">MySQL 8.0</span>
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl overflow-x-auto text-xs sm:text-sm text-emerald-400 font-mono leading-relaxed border border-slate-800/80">
                <code>{"-- Master INSERT INTO Demonstration\nUSE SchoolDB;\n\n-- 1. Inserting full row tuples in exact column order\nINSERT INTO Student VALUES \n  (101, 'Mamata Sharma', '2008-04-12', 92.50, 'Barrackpore', 'Science'),\n  (102, 'Susmita Roy', '2007-11-23', 88.00, 'Shyamnagar', 'Science'),\n  (103, 'Debangshu Pal', '2008-01-19', 95.00, 'Kolkata', 'Commerce');\n\n-- 2. Inserting with explicit column list (Omitted columns take DEFAULT or NULL)\nINSERT INTO Student (RollNo, FullName, Stream) \nVALUES (104, 'Ajoy Sen', 'Humanities');\n\n-- Verify inserted tuples\nSELECT * FROM Student;"}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: PITFALLS */}
        {activeTab === 'pitfalls' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-amber-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertTriangle size={22} />
                <h3 className="text-lg font-bold text-white">Board Examination Pitfalls & Tips</h3>
              </div>
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs sm:text-sm text-amber-200">
                <strong>Mentor Advice:</strong> {"In CBSE board exams, forgetting single quotes around Date literals ('YYYY-MM-DD') or strings is the #1 reason students lose marks. Numbers and NULL never take quotes! — Sukanta Hui"}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5: PRINTABLE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              title="CBSE Class XII IT 802 – Quick Revision Document"
              stampEnabled={true}
              showDownload={true}
              downloadButtonText="Download Plain Text Note"
              downloadFileName="topic0_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note={"In CBSE board exams, forgetting single quotes around Date literals ('YYYY-MM-DD') or strings is the #1 reason students lose marks. Numbers and NULL never take quotes! — Sukanta Hui"} />

      </div>
    </div>
  );
}
