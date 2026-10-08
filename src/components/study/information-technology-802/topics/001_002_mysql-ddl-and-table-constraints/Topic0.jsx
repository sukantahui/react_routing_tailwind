import React, { useState } from 'react';
import { 
  Database, HardDrive, ShieldCheck, RefreshCw, Layers, AlertTriangle, 
  CheckCircle2, FileText, ArrowRight, Zap, BookOpen, Code, HelpCircle, Terminal 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";


const DdlVsDmlSvg = () => {
  const [activeMode, setActiveMode] = useState('ddl');
  return (
    <div className="w-full bg-slate-950/80 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <Layers size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">DDL vs DML Command Visualizer</h4>
            <p className="text-xs text-slate-400">Schema Structural Changes vs Tuple Data Manipulation</p>
          </div>
        </div>
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveMode('ddl')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeMode === 'ddl' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            DDL (Schema Engine)
          </button>
          <button
            onClick={() => setActiveMode('dml')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeMode === 'dml' ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            DML (Tuple Engine)
          </button>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-xl bg-slate-900/60 p-4 border border-slate-800/60">
        <svg viewBox="0 0 700 240" className="w-full h-auto max-w-2xl mx-auto">
          {activeMode === 'ddl' ? (
            <g>
              <rect x="50" y="30" width="260" height="180" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <text x="180" y="60" textAnchor="middle" fill="#38bdf8" fontSize="14" fontWeight="bold">DDL: Structural Architecture</text>
              <rect x="70" y="80" width="220" height="28" rx="6" fill="#1e293b" />
              <text x="80" y="98" fill="#7dd3fc" fontSize="11" fontFamily="monospace">CREATE TABLE (Builds Blueprint)</text>
              <rect x="70" y="115" width="220" height="28" rx="6" fill="#1e293b" />
              <text x="80" y="133" fill="#7dd3fc" fontSize="11" fontFamily="monospace">ALTER TABLE (Expands Degree)</text>
              <rect x="70" y="150" width="220" height="28" rx="6" fill="#1e293b" />
              <text x="80" y="168" fill="#7dd3fc" fontSize="11" fontFamily="monospace">DROP TABLE (Destroys Blueprint)</text>

              <path d="M 320 120 L 380 120" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4" />

              <rect x="390" y="50" width="260" height="140" rx="10" fill="#0369a1" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="520" y="85" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">Database Data Dictionary</text>
              <text x="520" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="11">✓ Auto-Committed Immediately</text>
              <text x="520" y="135" textAnchor="middle" fill="#cbd5e1" fontSize="11">✓ Affects Table Degree & Meta Catalog</text>
              <text x="520" y="155" textAnchor="middle" fill="#f87171" fontSize="11">✗ ROLLBACK Not Supported</text>
            </g>
          ) : (
            <g>
              <rect x="50" y="30" width="260" height="180" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
              <text x="180" y="60" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="bold">DML: Instance Operations</text>
              <rect x="70" y="80" width="220" height="28" rx="6" fill="#1e293b" />
              <text x="80" y="98" fill="#a7f3d0" fontSize="11" fontFamily="monospace">INSERT INTO (Adds Row Tuples)</text>
              <rect x="70" y="115" width="220" height="28" rx="6" fill="#1e293b" />
              <text x="80" y="133" fill="#a7f3d0" fontSize="11" fontFamily="monospace">UPDATE (Modifies Values)</text>
              <rect x="70" y="150" width="220" height="28" rx="6" fill="#1e293b" />
              <text x="80" y="168" fill="#a7f3d0" fontSize="11" fontFamily="monospace">DELETE FROM (Removes Tuples)</text>

              <path d="M 320 120 L 380 120" stroke="#10b981" strokeWidth="3" />

              <rect x="390" y="50" width="260" height="140" rx="10" fill="#065f46" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
              <text x="520" y="85" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">Active Table Instance</text>
              <text x="520" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="11">✓ Modifies Cardinality (Row Count)</text>
              <text x="520" y="135" textAnchor="middle" fill="#cbd5e1" fontSize="11">✓ Zero Effect on Table Degree</text>
              <text x="520" y="155" textAnchor="middle" fill="#34d399" fontSize="11">✓ Can be Rolled Back (Transactional)</text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

export default function Topic0() {
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
                Module 002 · Topic 0
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                SQL Command Classification
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Classification of SQL Commands: Data Definition Language (DDL) vs Data Manipulation Language (DML)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understanding the distinction between schema-defining structural commands (DDL) and data-manipulating instance commands (DML, DQL, DCL, TCL).
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
                  
                    <div key="1. The 5 Major Subsets of Structured Query Language (SQL)" className="space-y-1">
                      <h4 className="font-bold text-sky-300 text-sm">1. The 5 Major Subsets of Structured Query Language (SQL)</h4>
                      <p className="whitespace-pre-line">{"SQL is a domain-specific declarative language used to manage relational databases. SQL statements are categorized into 5 functional families:\n\n1. **Data Definition Language (DDL):** Builds the structural skeleton (tables, indexes, views, constraints). Operations change database catalog metadata.\n2. **Data Manipulation Language (DML):** Operates on the data values stored inside the skeleton. Modifies row tuples.\n3. **Data Query Language (DQL):** Queries and filters data without altering underlying records.\n4. **Transaction Control Language (TCL):** Controls logical units of work to maintain ACID consistency.\n5. **Data Control Language (DCL):** Manages user authentication, role privileges, and security boundaries."}</p>
                    </div>
                  
                    <div key="2. DDL vs DML: The Critical Board Comparison Table" className="space-y-1">
                      <h4 className="font-bold text-sky-300 text-sm">2. DDL vs DML: The Critical Board Comparison Table</h4>
                      <p className="whitespace-pre-line">{"| Parameter | Data Definition Language (DDL) | Data Manipulation Language (DML) |\n| :--- | :--- | :--- |\n| **Core Purpose** | Defines & modifies table structure/schema | Manages and modifies rows/tuples within tables |\n| **Keywords** | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME` | `INSERT`, `UPDATE`, `DELETE` |\n| **Target Level** | Database schema & metadata catalog | Data instance (tuples / records) |\n| **Auto-Commit** | Implicitly auto-committed (Cannot ROLLBACK) | Explicit commit needed (Can ROLLBACK) |\n| **Effect on Degree** | Can change Degree (`ALTER TABLE ADD/DROP`) | Has ZERO effect on Degree |\n| **Effect on Cardinality** | `TRUNCATE` / `DROP` sets Cardinality to 0 | Modifies Cardinality (`INSERT` / `DELETE`) |"}</p>
                    </div>
                  
                    <div key="3. Auto-Commit Mechanics & Rollback Implications" className="space-y-1">
                      <h4 className="font-bold text-sky-300 text-sm">3. Auto-Commit Mechanics & Rollback Implications</h4>
                      <p className="whitespace-pre-line">{"In relational database engines like MySQL (InnoDB), DDL commands issue an implicit `COMMIT` both immediately before and immediately after execution.\n\nTherefore:\n- Executing `ALTER TABLE Student ADD BloodGroup CHAR(2);` permanently commits all pending transaction changes.\n- You cannot issue a `ROLLBACK` to undo a `DROP TABLE` or `ALTER TABLE` command.\n- In contrast, `DELETE FROM Student WHERE City = 'Barrackpore';` can be undone with `ROLLBACK;` if executed inside an active transaction."}</p>
                    </div>
                  
                </div>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition">
                <div className="flex items-center gap-3 text-emerald-400">
                  <ShieldCheck size={22} />
                  <h3 className="text-lg font-bold text-white">Key Summary Takeaways</h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  
                    <li key="DDL (Data Definition" className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{"DDL (Data Definition Language): Commands that define, alter, and destroy database structures/schemas (CREATE, ALTER, DROP, TRUNCATE, RENAME)."}</span>
                    </li>
                  
                    <li key="DML (Data Manipulati" className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{"DML (Data Manipulation Language): Commands that insert, modify, and delete row tuples within tables (INSERT, UPDATE, DELETE)."}</span>
                    </li>
                  
                    <li key="DQL (Data Query Lang" className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{"DQL (Data Query Language): Commands used to retrieve records from relations (SELECT)."}</span>
                    </li>
                  
                    <li key="TCL (Transaction Con" className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{"TCL (Transaction Control Language): Commands that manage database transactions (COMMIT, ROLLBACK, SAVEPOINT)."}</span>
                    </li>
                  
                    <li key="DCL (Data Control La" className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{"DCL (Data Control Language): Commands that manage permissions and privileges (GRANT, REVOKE)."}</span>
                    </li>
                  
                    <li key="Auto-Commit Behavior" className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{"Auto-Commit Behavior: DDL commands implicitly execute COMMIT immediately—they cannot be rolled back. DML operations can be rolled back before COMMIT."}</span>
                    </li>
                  
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VISUALIZER */}
        {activeTab === 'visualizer' && (
          <div className="space-y-6">
            <DdlVsDmlSvg />
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
                <code>{"-- DDL vs DML Comprehensive Lab Demonstration\n\n-- 1. DDL OPERATIONS (Structural Schema Definition - Auto-committed)\nCREATE DATABASE IF NOT EXISTS AcademyDB;\nUSE AcademyDB;\n\nCREATE TABLE CourseMaster (\n    CourseID INT PRIMARY KEY,\n    CourseName VARCHAR(50) NOT NULL,\n    DurationMonths INT DEFAULT 6,\n    CourseFee DECIMAL(8,2) NOT NULL\n);\n\nALTER TABLE CourseMaster ADD InstructorName VARCHAR(40);\n\n-- 2. DML OPERATIONS (Data Instance Manipulation - Transactional)\nINSERT INTO CourseMaster (CourseID, CourseName, DurationMonths, CourseFee, InstructorName)\nVALUES (101, 'Python & Data Science', 12, 18500.00, 'Sukanta Hui'),\n       (102, 'RDBMS & MySQL 802', 6, 9500.00, 'Debangshu Pal');\n\nUPDATE CourseMaster \nSET CourseFee = 8999.00 \nWHERE CourseID = 102;\n\nDELETE FROM CourseMaster \nWHERE CourseID = 101;\n\nSELECT * FROM CourseMaster;"}</code>
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
                <strong>Mentor Advice:</strong> {"In CBSE board questions, remember: CREATE, ALTER, DROP, and TRUNCATE are DDL commands because they modify the database schema or structure and are auto-committed. INSERT, UPDATE, and DELETE are DML commands because they alter table rows and can be rolled back inside transactions!"}
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
              downloadFileName="topic0_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note={"In CBSE board questions, remember: CREATE, ALTER, DROP, and TRUNCATE are DDL commands because they modify the database schema or structure and are auto-committed. INSERT, UPDATE, and DELETE are DML commands because they alter table rows and can be rolled back inside transactions!"} />

      </div>
    </div>
  );
}