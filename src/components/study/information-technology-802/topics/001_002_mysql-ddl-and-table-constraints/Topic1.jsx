import React, { useState } from 'react';
import { 
  Database, HardDrive, ShieldCheck, RefreshCw, Layers, AlertTriangle, 
  CheckCircle2, FileText, ArrowRight, Zap, BookOpen, Code, HelpCircle, Terminal 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";


const StandardVisualizerSvg = () => {
  return (
    <div className="w-full bg-slate-950/80 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-xl space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
        <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
          <Layers size={18} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">Schema Transformation & Integrity Visualizer</h4>
          <p className="text-xs text-slate-400">Relational DDL & Integrity Pipeline</p>
        </div>
      </div>
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
        <svg viewBox="0 0 600 160" className="w-full h-auto max-w-xl mx-auto">
          <rect x="30" y="30" width="150" height="100" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
          <text x="105" y="65" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">Table Schema</text>
          <text x="105" y="90" textAnchor="middle" fill="#cbd5e1" fontSize="10">Column Types & Sizes</text>
          <text x="105" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">DDL Engine</text>

          <path d="M 190 80 L 250 80" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3" />

          <rect x="260" y="30" width="150" height="100" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
          <text x="335" y="65" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Integrity Rules</text>
          <text x="335" y="90" textAnchor="middle" fill="#cbd5e1" fontSize="10">PK / FK / UNIQUE</text>
          <text x="335" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">CHECK & DEFAULT</text>

          <path d="M 420 80 L 470 80" stroke="#10b981" strokeWidth="2" strokeDasharray="3" />

          <rect x="480" y="30" width="100" height="100" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <text x="530" y="75" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Data Store</text>
          <text x="530" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="9">ACID Compliant</text>
        </svg>
      </div>
    </div>
  );
};

export default function Topic1() {
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
                Module 002 · Topic 1
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                MySQL Data Types & Memory
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Valid MySQL Data Types: CHAR(n), VARCHAR(n), INTEGER / INT, DECIMAL(p,s) / NUMERIC, DATE, TIME
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Comprehensive guide to storage engines, fixed vs variable length text, integer ranges, exact decimals, and temporal types.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'overview', label: '1. Conceptual Theory', icon: BookOpen },
            { id: 'visualizer', label: '2. Architecture Visualizer', icon: Layers },
            { id: 'code', label: '3. SQL Schema Lab', icon: Code },
            { id: 'pitfalls', label: '4. Board Pitfalls & Tips', icon: AlertTriangle },
            { id: 'faqs', label: '5. FAQs & Practice (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '6. Printable Document', icon: FileText }
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

        {/* TAB 1: OVERVIEW & THEORY */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition">
                <div className="flex items-center gap-3 text-sky-400">
                  <Database size={22} />
                  <h3 className="text-lg font-bold text-white">Core Architectural Concepts</h3>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  
                    <div key="1. Text Data Types: CHAR(n) vs VARCHAR(n)" className="space-y-1">
                      <h4 className="font-bold text-sky-300 text-sm">1. Text Data Types: CHAR(n) vs VARCHAR(n)</h4>
                      <p className="whitespace-pre-line">{"Choosing between `CHAR` and `VARCHAR` impacts memory consumption and indexing speed:\n\n- **`CHAR(10)`**: If you store the string `'Amit'` (4 chars), MySQL stores all 4 characters plus 6 trailing spaces (`'Amit      '`). It always consumes exactly 10 bytes on disk.\n- **`VARCHAR(10)`**: If you store `'Amit'`, MySQL stores the 4 characters plus 1 byte recording the length (4). Total storage consumed = 5 bytes.\n\n### When to use which?\n- Use **`CHAR`** when string length is constant: Gender (`CHAR(1)`), Blood Group (`CHAR(2)` - 'A+', 'B+'), State Code (`CHAR(2)` - 'WB', 'DL'), PIN code (`CHAR(6)`).\n- Use **`VARCHAR`** when string length varies: Student Name (`VARCHAR(60)`), Address (`VARCHAR(120)`), Email ID (`VARCHAR(100)`)."}</p>
                    </div>
                  
                    <div key="2. Exact vs Approximate Numeric Types" className="space-y-1">
                      <h4 className="font-bold text-sky-300 text-sm">2. Exact vs Approximate Numeric Types</h4>
                      <p className="whitespace-pre-line">{"Relational databases provide two kinds of fractional numbers:\n1. **Exact Fixed-Point (`DECIMAL` / `NUMERIC`):** Stored as exact binary decimal representations without floating-point rounding errors. Mandatory for financial balances, taxes, prices, and marks.\n2. **Approximate Floating-Point (`FLOAT` / `DOUBLE`):** Stored using IEEE 754 floating point format. Fast for scientific computing but introduces minute rounding discrepancies."}</p>
                    </div>
                  
                    <div key="3. Temporal Types: DATE, TIME, and DATETIME Format Rules" className="space-y-1">
                      <h4 className="font-bold text-sky-300 text-sm">3. Temporal Types: DATE, TIME, and DATETIME Format Rules</h4>
                      <p className="whitespace-pre-line">{"Standard ANSI / MySQL temporal literals must always be enclosed inside single quotes (`'`):\n- **DATE:** `'YYYY-MM-DD'` (e.g. `'2026-03-15'`)\n- **TIME:** `'HH:MM:SS'` (e.g. `'14:30:00'`)\n- **DATETIME:** `'YYYY-MM-DD HH:MM:SS'` (e.g. `'2026-03-15 14:30:00'`)"}</p>
                    </div>
                  
                </div>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition">
                <div className="flex items-center gap-3 text-emerald-400">
                  <ShieldCheck size={22} />
                  <h3 className="text-lg font-bold text-white">Key Summary Takeaways</h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  
                    <li key="CHAR(n): Fixed-lengt" className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{"CHAR(n): Fixed-length string (0 to 255 chars). Always reserves n bytes on disk, right-padding shorter strings with spaces."}</span>
                    </li>
                  
                    <li key="VARCHAR(n): Variable" className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{"VARCHAR(n): Variable-length string (0 to 65,535 chars). Allocates only necessary string length + 1 prefix byte (for length <= 255)."}</span>
                    </li>
                  
                    <li key="INT / INTEGER: 4-byt" className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{"INT / INTEGER: 4-byte signed integer storing values from -2,147,483,648 to 2,147,483,647."}</span>
                    </li>
                  
                    <li key="DECIMAL(p, s) / NUME" className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{"DECIMAL(p, s) / NUMERIC: Exact fixed-point numeric representation where p = precision (total digits) and s = scale (digits after decimal point)."}</span>
                    </li>
                  
                    <li key="DATE: Temporal type " className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{"DATE: Temporal type storing date values in 'YYYY-MM-DD' format (e.g. '2026-10-08')."}</span>
                    </li>
                  
                    <li key="TIME: Temporal type " className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{"TIME: Temporal type storing time values in 'HH:MM:SS' format."}</span>
                    </li>
                  
                    <li key="DATETIME: Combines d" className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{"DATETIME: Combines date and time in 'YYYY-MM-DD HH:MM:SS' format (8 bytes)."}</span>
                    </li>
                  
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VISUALIZER */}
        {activeTab === 'visualizer' && (
          <div className="space-y-6">
            <StandardVisualizerSvg />
          </div>
        )}

        {/* TAB 3: CODE DEMO */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-sky-400 text-sm font-bold">
                  <Terminal size={18} />
                  <span>MySQL DDL Benchmark Laboratory</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">ANSI SQL Standard / MySQL 8.0</span>
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl overflow-x-auto text-xs sm:text-sm text-emerald-400 font-mono leading-relaxed border border-slate-800/80">
                <code>{"-- Valid MySQL Data Types Showcase Table\nCREATE TABLE StudentRegistration (\n    RegistrationID INT PRIMARY KEY AUTO_INCREMENT,\n    Gender CHAR(1) NOT NULL,\n    BloodGroup CHAR(2),\n    StateCode CHAR(2) DEFAULT 'WB',\n    FullName VARCHAR(60) NOT NULL,\n    EmailAddress VARCHAR(80) UNIQUE,\n    PermanentAddress VARCHAR(150),\n    AdmissionFee DECIMAL(8,2) NOT NULL,\n    Class10Percentage DECIMAL(5,2),\n    DateOfBirth DATE NOT NULL,\n    RegistrationTime TIME NOT NULL,\n    CreatedTimestamp DATETIME DEFAULT CURRENT_TIMESTAMP\n);"}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 4: PITFALLS & TIPS */}
        {activeTab === 'pitfalls' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-amber-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertTriangle size={22} />
                <h3 className="text-lg font-bold text-white">Board Examination Pitfalls & Best Practices</h3>
              </div>
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs sm:text-sm text-amber-200">
                <strong>Mentor Advice:</strong> {"The most frequent board question: Difference between CHAR(n) and VARCHAR(n). CHAR is fixed-length (pads with spaces up to n bytes), while VARCHAR is variable-length (stores only actual characters + 1-2 length bytes). Use CHAR for fixed codes like BloodGroup CHAR(2) or Gender CHAR(1); use VARCHAR for Names and Addresses!"}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 6: PRINTABLE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              title="CBSE Class XII IT 802 – Quick Revision Document"
              stampEnabled={true}
              showDownload={true}
              downloadButtonText="Download Plain Text Note"
              downloadFileName="topic1_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note={"The most frequent board question: Difference between CHAR(n) and VARCHAR(n). CHAR is fixed-length (pads with spaces up to n bytes), while VARCHAR is variable-length (stores only actual characters + 1-2 length bytes). Use CHAR for fixed codes like BloodGroup CHAR(2) or Gender CHAR(1); use VARCHAR for Names and Addresses!"} />

      </div>
    </div>
  );
}