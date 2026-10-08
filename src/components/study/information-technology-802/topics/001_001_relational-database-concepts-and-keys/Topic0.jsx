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

// Interactive Architectural Comparison SVG
const DbmsArchitectureSVG = () => {
  const [activeTab, setActiveTab] = useState('dbms');

  return (
    <div className="w-full bg-slate-950/80 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <Layers size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">System Architecture Visualizer</h4>
            <p className="text-xs text-slate-400">Compare Decentralized Flat Files vs Centralized RDBMS</p>
          </div>
        </div>
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('dbms')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'dbms'
                ? 'bg-sky-500 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Centralized DBMS (MySQL)
          </button>
          <button
            onClick={() => setActiveTab('file')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'file'
                ? 'bg-rose-500 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Traditional Flat Files
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl bg-slate-900/60 p-4 border border-slate-800/60">
        {activeTab === 'dbms' ? (
          <svg viewBox="0 0 700 320" className="w-full h-auto max-w-2xl mx-auto" aria-label="DBMS Architecture Diagram">
            <defs>
              <linearGradient id="dbmsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="appGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f766e" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#115e59" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Client Applications */}
            <g transform="translate(40, 30)">
              <rect x="0" y="0" width="160" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="80" y="24" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">Admissions Portal</text>
              <text x="80" y="40" textAnchor="middle" fill="#94a3b8" fontSize="10">Student Master View</text>
            </g>
            <g transform="translate(40, 110)">
              <rect x="0" y="0" width="160" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="80" y="24" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">Accounts & Fees</text>
              <text x="80" y="40" textAnchor="middle" fill="#94a3b8" fontSize="10">Fee Ledger View</text>
            </g>
            <g transform="translate(40, 190)">
              <rect x="0" y="0" width="160" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="80" y="24" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">Exam Cell (IT 802)</text>
              <text x="80" y="40" textAnchor="middle" fill="#94a3b8" fontSize="10">Marksheet View</text>
            </g>

            {/* Central DBMS Engine */}
            <g transform="translate(280, 50)">
              <rect x="0" y="0" width="180" height="170" rx="12" fill="url(#dbmsGrad)" stroke="#38bdf8" strokeWidth="2" />
              <text x="90" y="30" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">Central DBMS Engine</text>
              <line x1="20" y1="42" x2="160" y2="42" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3" />
              
              <rect x="15" y="55" width="150" height="24" rx="4" fill="#0f172a" stroke="#0284c7" strokeWidth="1" />
              <text x="90" y="71" textAnchor="middle" fill="#7dd3fc" fontSize="10">Query Parser & Optimizer</text>
              
              <rect x="15" y="87" width="150" height="24" rx="4" fill="#0f172a" stroke="#0284c7" strokeWidth="1" />
              <text x="90" y="103" textAnchor="middle" fill="#7dd3fc" fontSize="10">ACID Concurrency Controller</text>
              
              <rect x="15" y="119" width="150" height="24" rx="4" fill="#0f172a" stroke="#0284c7" strokeWidth="1" />
              <text x="90" y="135" textAnchor="middle" fill="#7dd3fc" fontSize="10">Security & Catalog Manager</text>
            </g>

            {/* Physical Storage */}
            <g transform="translate(520, 75)">
              <rect x="0" y="0" width="140" height="120" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
              <text x="70" y="28" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Centralized Storage</text>
              <line x1="15" y1="38" x2="125" y2="38" stroke="#10b981" strokeWidth="1" />
              <text x="70" y="60" textAnchor="middle" fill="#e2e8f0" fontSize="11">Student Master</text>
              <text x="70" y="80" textAnchor="middle" fill="#e2e8f0" fontSize="11">Academic Marks</text>
              <text x="70" y="100" textAnchor="middle" fill="#e2e8f0" fontSize="11">Fee Records</text>
            </g>

            {/* Connecting Arrows & Data Flow */}
            <path d="M 200 55 L 280 90" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4">
              <animate attributeName="stroke-dashoffset" values="16;0" dur="1s" repeatCount="indefinite" />
            </path>
            <path d="M 200 135 L 280 135" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4">
              <animate attributeName="stroke-dashoffset" values="16;0" dur="1s" repeatCount="indefinite" />
            </path>
            <path d="M 200 215 L 280 170" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4">
              <animate attributeName="stroke-dashoffset" values="16;0" dur="1s" repeatCount="indefinite" />
            </path>
            <path d="M 460 135 L 520 135" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6">
              <animate attributeName="stroke-dashoffset" values="24;0" dur="1.2s" repeatCount="indefinite" />
            </path>

            <text x="350" y="280" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
              ✓ Single source of truth · Zero Redundancy · ACID Guaranteed · Role-Based Security
            </text>
          </svg>
        ) : (
          <svg viewBox="0 0 700 320" className="w-full h-auto max-w-2xl mx-auto" aria-label="Flat File System Diagram">
            {/* Flat File Depiction */}
            <g transform="translate(60, 30)">
              <rect x="0" y="0" width="180" height="60" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="90" y="24" textAnchor="middle" fill="#fb7185" fontSize="12" fontWeight="bold">Admissions Program</text>
              <text x="90" y="44" textAnchor="middle" fill="#cbd5e1" fontSize="10">Stores Student Copy 1</text>
            </g>
            <g transform="translate(440, 30)">
              <rect x="0" y="0" width="180" height="60" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4" />
              <text x="90" y="28" textAnchor="middle" fill="#fb7185" fontSize="11" fontWeight="bold">admissions.dat</text>
              <text x="90" y="46" textAnchor="middle" fill="#94a3b8" fontSize="10">Duplicate Name, Phone</text>
            </g>

            <g transform="translate(60, 120)">
              <rect x="0" y="0" width="180" height="60" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="90" y="24" textAnchor="middle" fill="#fb7185" fontSize="12" fontWeight="bold">Accounts Program</text>
              <text x="90" y="44" textAnchor="middle" fill="#cbd5e1" fontSize="10">Stores Student Copy 2</text>
            </g>
            <g transform="translate(440, 120)">
              <rect x="0" y="0" width="180" height="60" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4" />
              <text x="90" y="28" textAnchor="middle" fill="#fb7185" fontSize="11" fontWeight="bold">accounts.txt</text>
              <text x="90" y="46" textAnchor="middle" fill="#f43f5e" fontSize="10">Out-of-Sync Phone No!</text>
            </g>

            <g transform="translate(60, 210)">
              <rect x="0" y="0" width="180" height="60" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="90" y="24" textAnchor="middle" fill="#fb7185" fontSize="12" fontWeight="bold">Exam Program</text>
              <text x="90" y="44" textAnchor="middle" fill="#cbd5e1" fontSize="10">Stores Student Copy 3</text>
            </g>
            <g transform="translate(440, 210)">
              <rect x="0" y="0" width="180" height="60" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4" />
              <text x="90" y="28" textAnchor="middle" fill="#fb7185" fontSize="11" fontWeight="bold">exam_results.csv</text>
              <text x="90" y="46" textAnchor="middle" fill="#94a3b8" fontSize="10">Duplicate DOB & Name</text>
            </g>

            {/* Disconnected lines */}
            <path d="M 240 60 L 440 60" stroke="#f43f5e" strokeWidth="2" />
            <path d="M 240 150 L 440 150" stroke="#f43f5e" strokeWidth="2" />
            <path d="M 240 240 L 440 240" stroke="#f43f5e" strokeWidth="2" />

            <text x="350" y="300" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="bold">
              ⚠ Severe Data Redundancy · Conflicting Inconsistencies · Zero ACID Protection
            </text>
          </svg>
        )}
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
                Module 001 · Topic 0
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                CBSE Class XII IT (802) Core
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Introduction to Database Management Systems (DBMS) & Need over File Systems
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understand why modern computing transitioned from fragile, isolated flat-file systems to centralized, ACID-compliant Relational Database Management Systems.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'overview', label: '1. Conceptual Theory', icon: BookOpen },
            { id: 'visualizer', label: '2. Architecture Visualizer', icon: Layers },
            { id: 'code', label: '3. SQL Schema Lab', icon: Code },
            { id: 'realworld', label: '4. Real-World Case Studies', icon: Zap },
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

        {/* TAB 1: OVERVIEW & THEORY */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition">
                <div className="flex items-center gap-3 text-sky-400">
                  <Database size={22} />
                  <h3 className="text-lg font-bold text-white">What is a Database & DBMS?</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A <strong className="text-sky-300">Database</strong> is an organized collection of logically related data representing real-world entities (e.g., student profiles, board exam marks).
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A <strong className="text-sky-300">DBMS (Database Management System)</strong> is the comprehensive software suite providing data definition, efficient querying, multi-user concurrency, access control, and transaction recovery.
                </p>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 font-mono">
                  <span className="text-amber-400 font-bold">Standard DBMS Examples:</span> MySQL, PostgreSQL, Oracle, SQLite, Microsoft SQL Server.
                </div>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition">
                <div className="flex items-center gap-3 text-rose-400">
                  <HardDrive size={22} />
                  <h3 className="text-lg font-bold text-white">Why Flat-File Systems Failed</h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold mt-0.5">•</span>
                    <span><strong>Data Redundancy:</strong> Identical student data duplicated across multiple independent office files.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold mt-0.5">•</span>
                    <span><strong>Data Inconsistency:</strong> Updating phone number in accounts file misses the examination file.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold mt-0.5">•</span>
                    <span><strong>Atomicity Failures:</strong> Power crashes midway during fee deduction corrupt financial ledgers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold mt-0.5">•</span>
                    <span><strong>Lack of Security:</strong> Inability to restrict student users from modifying teacher mark sheets.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 3-Level ANSI-SPARC Architecture */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <Layers size={20} />
                Three-Level ANSI-SPARC Architecture & Data Abstraction
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                DBMS hides storage complexity from developers and end-users using three distinct levels of abstraction:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl space-y-2">
                  <span className="px-2 py-0.5 bg-sky-500/20 text-sky-300 text-[10px] font-bold rounded uppercase">Tier 1 · Highest</span>
                  <h4 className="font-bold text-white text-sm">View Level (External)</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Customized views tailored for specific user groups (e.g. Mamata views her own marksheet; Principal views school summary).
                  </p>
                </div>
                <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl space-y-2">
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded uppercase">Tier 2 · Middle</span>
                  <h4 className="font-bold text-white text-sm">Logical Level (Conceptual)</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Describes WHAT data is stored in the database and the relationships among tables, primary keys, and constraints.
                  </p>
                </div>
                <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl space-y-2">
                  <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] font-bold rounded uppercase">Tier 3 · Lowest</span>
                  <h4 className="font-bold text-white text-sm">Physical Level (Internal)</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Describes HOW data is physically organized on disk sectors, file allocation tables, B-Trees, and compression blocks.
                  </p>
                </div>
              </div>
            </div>

            {/* ACID Properties */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                <ShieldCheck size={20} />
                ACID Properties: The Guarantee of Reliable Transactions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-1.5">
                  <div className="text-amber-400 font-mono font-bold text-base">A · Atomicity</div>
                  <p className="text-xs text-slate-300">All or nothing. If any transaction step fails, entire operation rolls back.</p>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-1.5">
                  <div className="text-emerald-400 font-mono font-bold text-base">C · Consistency</div>
                  <p className="text-xs text-slate-300">Guarantees database transitions only between valid states satisfying all constraints.</p>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-1.5">
                  <div className="text-sky-400 font-mono font-bold text-base">I · Isolation</div>
                  <p className="text-xs text-slate-300">Concurrent transactions execute without seeing intermediate uncommitted states.</p>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-1.5">
                  <div className="text-purple-400 font-mono font-bold text-base">D · Durability</div>
                  <p className="text-xs text-slate-300">Committed data persists permanently in logs, surviving server crashes.</p>
                </div>
              </div>
            </div>

            <Teacher note="In CBSE Class XII IT (802) board questions, always highlight the three major advantages of DBMS: Elimination of Data Redundancy, Data Independence, and Centralized Security. Remember: A file system manages raw byte streams, but a DBMS manages structured entity relationships!" />
          </div>
        )}

        {/* TAB 2: ARCHITECTURE VISUALIZER */}
        {activeTab === 'visualizer' && (
          <div className="space-y-6">
            <DbmsArchitectureSVG />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl space-y-2">
                <h4 className="text-sm font-bold text-sky-400">Physical Data Independence</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Allows changing physical storage paths, adding B-Tree indexes, or upgrading to NVMe SSD drives without altering conceptual tables or user SQL queries.
                </p>
              </div>
              <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl space-y-2">
                <h4 className="text-sm font-bold text-emerald-400">Logical Data Independence</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Allows adding new columns (e.g. Student Aadhaar number) or splitting tables without breaking existing front-end applications that only read existing columns.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CODE DEMO */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="text-emerald-400" size={20} />
                  <h3 className="text-base font-bold text-white">Centralized Relational Schema Definition (MySQL 8.0)</h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">01_dbms_vs_filesystem.sql</span>
              </div>
              <pre className="bg-slate-950 p-4 rounded-xl text-slate-200 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800 leading-relaxed">
                <code>{`-- 1. Create Normalized Master Table
CREATE TABLE StudentMaster (
    StudentID VARCHAR(10) PRIMARY KEY,
    FullName VARCHAR(60) NOT NULL,
    Gender CHAR(1) CHECK (Gender IN ('M', 'F', 'O')),
    DOB DATE NOT NULL,
    GuardianName VARCHAR(60) NOT NULL,
    ContactPhone VARCHAR(15) NOT NULL,
    Address VARCHAR(100) DEFAULT 'Barrackpore, Kolkata'
);

-- 2. Create Child Academic Marks Table linked via Foreign Key
CREATE TABLE AcademicMarks (
    MarkID INT PRIMARY KEY AUTO_INCREMENT,
    StudentID VARCHAR(10) NOT NULL,
    SubjectCode VARCHAR(10) NOT NULL,
    TheoryMarks DECIMAL(5,2) CHECK (TheoryMarks BETWEEN 0 AND 70),
    PracticalMarks DECIMAL(5,2) CHECK (PracticalMarks BETWEEN 0 AND 30),
    CONSTRAINT fk_marks_student 
        FOREIGN KEY (StudentID) REFERENCES StudentMaster(StudentID)
        ON DELETE CASCADE
);

-- 3. High-Performance Declarative Query
SELECT S.StudentID, S.FullName, M.TheoryMarks + M.PracticalMarks AS TotalScore
FROM StudentMaster S
JOIN AcademicMarks M ON S.StudentID = M.StudentID
WHERE S.Address LIKE '%Barrackpore%'
ORDER BY TotalScore DESC;`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 4: REAL WORLD CASE STUDIES */}
        {activeTab === 'realworld' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-3">
                <span className="px-2.5 py-1 bg-sky-500/10 text-sky-400 text-[11px] font-bold rounded-lg border border-sky-500/20">
                  Case 1 · Education
                </span>
                <h4 className="text-sm font-bold text-white">Coder & AccoTax Student Portal, Barrackpore</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  When students like Mamata and Susmita log in to check their CBSE Class XII IT (802) performance, DBMS views expose only their personal scores while locking administrative fee registers.
                </p>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-3">
                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[11px] font-bold rounded-lg border border-emerald-500/20">
                  Case 2 · Banking & UPI
                </span>
                <h4 className="text-sm font-bold text-white">State Bank of India (Barrackpore Branch)</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  When Debangshu transfers ₹5,000 via Google Pay, Atomicity ensures funds are either deducted from the sender and credited to the receiver, or completely cancelled upon network drop.
                </p>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-3">
                <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 text-[11px] font-bold rounded-lg border border-amber-500/20">
                  Case 3 · Railways (IRCTC)
                </span>
                <h4 className="text-sm font-bold text-white">Tatkal Ticket Concurrency at Kolkata Station</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Millions of simultaneous users try booking the same berth. DBMS row-level locks prevent two passengers from being issued the exact same seat number.
                </p>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-3">
                <span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 text-[11px] font-bold rounded-lg border border-purple-500/20">
                  Case 4 · Telecom Billing
                </span>
                <h4 className="text-sm font-bold text-white">Jio & Airtel Call Detail Records (CDR)</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Billions of call events generated daily in West Bengal circle are logged in partitioned relational databases with automated prepaid rating engines.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PITFALLS & TIPS */}
        {activeTab === 'pitfalls' && (
          <div className="space-y-4">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <AlertTriangle size={18} />
                Common Board Examination Pitfalls in CBSE Class 12 IT (802)
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-amber-500/20">
                  <strong className="text-amber-300">Pitfall 1: Confusing Data Redundancy with Data Inconsistency.</strong>
                  <p className="mt-1 text-slate-400">
                    <em>Redundancy</em> is the duplication of data (e.g., student name stored 3 times). <em>Inconsistency</em> is the contradictory state that happens when one duplicated copy is updated but others remain stale.
                  </p>
                </div>
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-amber-500/20">
                  <strong className="text-amber-300">Pitfall 2: Forgetting the difference between Physical and Logical Data Independence.</strong>
                  <p className="mt-1 text-slate-400">
                    Physical independence is changing disk storage/indexes without affecting tables. Logical independence is altering table schema without breaking existing application views.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: FAQS & ASSESSMENTS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate
              title="Topic 0 · Comprehensive Technical FAQs & Board Questions"
              questions={questions}
            />
          </div>
        )}

        {/* TAB 7: PRINTABLE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              filename="topic0_intro_to_dbms_note.txt"
              title="CBSE Class XII IT 802 – Topic 0 Printable Quick Revision Note"
              hidePreview={false}
              showDownload={true}
            />
          </div>
        )}

      </div>
    </div>
  );
}
