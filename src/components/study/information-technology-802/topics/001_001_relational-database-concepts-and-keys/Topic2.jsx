import React, { useState } from 'react';
import { 
  Table, Rows, Columns, CheckCircle2, AlertTriangle, 
  Layers, BookOpen, Code, HelpCircle, FileText, ArrowRight, Sparkles 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

const RelationalGridSVG = () => {
  const [highlight, setHighlight] = useState('all');

  return (
    <div className="w-full bg-slate-950/80 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <h4 className="text-sm font-bold text-white">Interactive Relational Grid Visualizer</h4>
          <p className="text-xs text-slate-400">Click elements to highlight Tuples (Rows), Attributes (Columns), or Domains</p>
        </div>
        <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          {[
            { id: 'all', label: 'Full Relation' },
            { id: 'attribute', label: 'Highlight Attributes (Columns)' },
            { id: 'tuple', label: 'Highlight Tuples (Rows)' },
            { id: 'domain', label: 'Highlight Attribute Domains' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setHighlight(item.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                highlight === item.id
                  ? 'bg-sky-500 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40 p-3">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className={`p-3 font-bold transition-all ${highlight === 'attribute' ? 'bg-sky-500/20 text-sky-300 border-x border-sky-500/40' : ''}`}>
                RollNo <span className="text-[10px] block text-slate-500">INT (PK)</span>
              </th>
              <th className={`p-3 font-bold transition-all ${highlight === 'attribute' ? 'bg-sky-500/20 text-sky-300 border-x border-sky-500/40' : ''}`}>
                StudentName <span className="text-[10px] block text-slate-500">VARCHAR(60)</span>
              </th>
              <th className={`p-3 font-bold transition-all ${highlight === 'attribute' ? 'bg-sky-500/20 text-sky-300 border-x border-sky-500/40' : ''}`}>
                Class <span className="text-[10px] block text-slate-500">VARCHAR(5)</span>
              </th>
              <th className={`p-3 font-bold transition-all ${highlight === 'attribute' ? 'bg-sky-500/20 text-sky-300 border-x border-sky-500/40' : ''}`}>
                TheoryMarks <span className="text-[10px] block text-slate-500">DECIMAL(5,2)</span>
              </th>
              <th className={`p-3 font-bold transition-all ${highlight === 'attribute' ? 'bg-sky-500/20 text-sky-300 border-x border-sky-500/40' : ''}`}>
                PracticalMarks <span className="text-[10px] block text-slate-500">DECIMAL(5,2)</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {[
              { roll: 101, name: "Mamata Das", cls: "XII", th: "68.50", pr: "30.00" },
              { roll: 102, name: "Susmita Roy", cls: "XII", th: "65.00", pr: "29.50" },
              { roll: 103, name: "Debangshu Pal", cls: "XII", th: "62.00", pr: "28.00" },
              { roll: 104, name: "Sachin Roy", cls: "XII", th: "58.00", pr: "27.00" }
            ].map((row, idx) => (
              <tr 
                key={idx}
                className={`transition-all ${
                  highlight === 'tuple' && idx === 0 
                    ? 'bg-emerald-500/20 text-emerald-200 border-y border-emerald-500/40 font-bold' 
                    : 'hover:bg-slate-800/50 text-slate-300'
                }`}
              >
                <td className="p-3">{row.roll}</td>
                <td className="p-3 text-white">{row.name}</td>
                <td className="p-3">{row.cls}</td>
                <td className={`p-3 ${highlight === 'domain' ? 'text-amber-300 font-bold bg-amber-500/10' : ''}`}>
                  {row.th}
                </td>
                <td className={`p-3 ${highlight === 'domain' ? 'text-amber-300 font-bold bg-amber-500/10' : ''}`}>
                  {row.pr}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
          <span className="text-sky-400 font-bold flex items-center gap-1.5">
            <Columns size={14} /> Degree = 5 Attributes
          </span>
          <p className="text-slate-400 text-[11px]">RollNo, StudentName, Class, TheoryMarks, PracticalMarks</p>
        </div>
        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
            <Rows size={14} /> Cardinality = 4 Tuples
          </span>
          <p className="text-slate-400 text-[11px]">4 individual student records stored in table</p>
        </div>
        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
          <span className="text-amber-400 font-bold flex items-center gap-1.5">
            <Sparkles size={14} /> Atomic Cell Values
          </span>
          <p className="text-slate-400 text-[11px]">Every cell contains exactly one scalar atomic value</p>
        </div>
      </div>
    </div>
  );
};

export default function Topic2() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 001 · Topic 2
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                E.F. Codd Relational Model
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Relational Model Terminology: Relation (Table), Tuple (Row/Record), Attribute (Column/Field)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the foundational building blocks of the relational database model: Relations, Tuples, Attributes, Domains, and Cartesian products.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'overview', label: '1. Relational Concepts', icon: BookOpen },
            { id: 'grid', label: '2. Interactive Grid', icon: Layers },
            { id: 'code', label: '3. SQL Schema Lab', icon: Code },
            { id: 'realworld', label: '4. Case Studies', icon: Sparkles },
            { id: 'pitfalls', label: '5. Board Pitfalls & Tips', icon: AlertTriangle },
            { id: 'faqs', label: '6. FAQs & Practice (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '7. Printable Document', icon: FileText }
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

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
                  <Table size={20} />
                </div>
                <h3 className="text-base font-bold text-white">Relation (Table)</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A named two-dimensional tabular structure composed of rows and columns representing an entity set.
                </p>
                <div className="text-xs font-mono text-sky-400">Synonym: Table / Entity Set</div>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                  <Rows size={20} />
                </div>
                <h3 className="text-base font-bold text-white">Tuple (Row / Record)</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A single horizontal row representing an individual entity instance (e.g. Mamata's entire row).
                </p>
                <div className="text-xs font-mono text-emerald-400">Synonym: Row / Record / Entity</div>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
                  <Columns size={20} />
                </div>
                <h3 className="text-base font-bold text-white">Attribute (Column / Field)</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A named vertical column representing a specific property or characteristic (e.g. StudentName).
                </p>
                <div className="text-xs font-mono text-purple-400">Synonym: Column / Field</div>
              </div>

            </div>

            {/* Terminology Reference Table */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white">Terminology Cross-Reference for CBSE Examination</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left font-sans">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="p-3">Theoretical Term (Codd)</th>
                      <th className="p-3">Practical SQL Term</th>
                      <th className="p-3">File System Term</th>
                      <th className="p-3">Definition Summary</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="p-3 font-bold text-sky-400">Relation</td>
                      <td className="p-3 text-white">Table</td>
                      <td className="p-3 text-slate-400">File</td>
                      <td className="p-3">2D structure containing data about an entity</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-emerald-400">Tuple</td>
                      <td className="p-3 text-white">Row</td>
                      <td className="p-3 text-slate-400">Record</td>
                      <td className="p-3">Single horizontal data record</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-purple-400">Attribute</td>
                      <td className="p-3 text-white">Column</td>
                      <td className="p-3 text-slate-400">Field</td>
                      <td className="p-3">Named vertical property</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-amber-400">Domain</td>
                      <td className="p-3 text-white">Data Type & Range</td>
                      <td className="p-3 text-slate-400">Type Specification</td>
                      <td className="p-3">Permissible pool of atomic scalar values</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <Teacher note="Always remember: In the Relational Model, tables cannot have duplicate tuples, rows have no inherent ordering, and all attribute cells must hold single atomic values (1NF). — Sukanta Hui" />
          </div>
        )}

        {/* TAB 2: GRID VISUALIZER */}
        {activeTab === 'grid' && (
          <div className="space-y-6">
            <RelationalGridSVG />
          </div>
        )}

        {/* TAB 3: CODE DEMO */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Relational Terminology in SQL</h3>
                <span className="text-xs text-slate-400 font-mono">03_relational_model_terminology.sql</span>
              </div>
              <pre className="bg-slate-950 p-4 rounded-xl text-slate-200 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800 leading-relaxed">
                <code>{`-- Creating Relation with 5 Attributes (Degree = 5)
CREATE TABLE StudentMarksheet (
    RollNo INT PRIMARY KEY,
    StudentName VARCHAR(60) NOT NULL,
    Class VARCHAR(5) NOT NULL,
    TheoryMarks DECIMAL(5,2) CHECK (TheoryMarks BETWEEN 0 AND 70),
    PracticalMarks DECIMAL(5,2) CHECK (PracticalMarks BETWEEN 0 AND 30)
);

-- Inserting 3 Tuples (Cardinality = 3)
INSERT INTO StudentMarksheet VALUES 
(101, 'Mamata Das', 'XII', 68.50, 30.00),
(102, 'Susmita Roy', 'XII', 65.00, 29.50),
(103, 'Debangshu Pal', 'XII', 62.00, 28.00);`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 4: CASE STUDIES */}
        {activeTab === 'realworld' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-sky-400 font-mono">CASE 1 · BARRACKPORE SCHOOL MARKSHEET</span>
                <h4 className="text-sm font-bold text-white">Tuples vs Attributes in CBSE IT (802)</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  In a class of 40 students with 6 subjects, the relation has Degree = 6 and Cardinality = 40. Each row is a student tuple; each column is a subject attribute.
                </p>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-emerald-400 font-mono">CASE 2 · HOSPITAL PATIENT REGISTRY</span>
                <h4 className="text-sm font-bold text-white">Atomic Domain Values in EHR</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Storing blood group as 'O+' satisfies the atomic rule, whereas storing 'O+, BP 120/80, Pulse 72' in one cell violates 1NF.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PITFALLS & TIPS */}
        {activeTab === 'pitfalls' && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
              <AlertTriangle size={18} />
              Board Exam Pitfalls: Relational Model Terminology
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              <p>• <strong>Never confuse Tuple with Attribute:</strong> A Tuple is a row (horizontal); an Attribute is a column (vertical).</p>
              <p>• <strong>Table vs Relation:</strong> In CBSE exams, "Relation" and "Table" are used interchangeably.</p>
            </div>
          </div>
        )}

        {/* TAB 6: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate
              title="Topic 2 · Relational Model Terminology FAQs & Board Questions"
              questions={questions}
            />
          </div>
        )}

        {/* TAB 7: PRINTABLE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              filename="topic2_relational_model_terminology_note.txt"
              title="CBSE Class XII IT 802 – Topic 2 Printable Quick Revision Note"
              hidePreview={false}
              showDownload={true}
            />
          </div>
        )}

      </div>
    </div>
  );
}
