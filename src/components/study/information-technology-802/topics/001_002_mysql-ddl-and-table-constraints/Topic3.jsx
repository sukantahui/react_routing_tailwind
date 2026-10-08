import React, { useState } from 'react';
import { 
  Database, HardDrive, ShieldCheck, RefreshCw, Layers, AlertTriangle, 
  CheckCircle2, FileText, ArrowRight, Zap, BookOpen, Code, HelpCircle, Terminal 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";


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

export default function Topic3() {
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
                Module 002 · Topic 3
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                CREATE TABLE DDL Master
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Creating Tables with CREATE TABLE and Defining Column & Table Constraints
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Writing production-grade DDL table creation scripts with column-level and table-level constraint definitions.
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
                  
                    <div key="1. Standard ANSI / MySQL CREATE TABLE Syntax" className="space-y-1">
                      <h4 className="font-bold text-sky-300 text-sm">1. Standard ANSI / MySQL CREATE TABLE Syntax</h4>
                      <p className="whitespace-pre-line">{"The complete syntax pattern for `CREATE TABLE` is:\n```sql\nCREATE TABLE [IF NOT EXISTS] table_name (\n    column_name_1 data_type [COLUMN_CONSTRAINTS],\n    column_name_2 data_type [COLUMN_CONSTRAINTS],\n    ...\n    [CONSTRAINT constraint_name] PRIMARY KEY (col_a, col_b),\n    [CONSTRAINT constraint_name] FOREIGN KEY (col_fk) REFERENCES parent_table(parent_pk)\n);\n```"}</p>
                    </div>
                  
                    <div key="2. Column-Level vs Table-Level Constraints" className="space-y-1">
                      <h4 className="font-bold text-sky-300 text-sm">2. Column-Level vs Table-Level Constraints</h4>
                      <p className="whitespace-pre-line">{"- **Column-Level:** Applied to a single individual column during its type specification. Examples:\n  `RollNo INT PRIMARY KEY`, `Email VARCHAR(80) UNIQUE NOT NULL`.\n- **Table-Level:** Applied to one or more columns simultaneously at the end of the `CREATE TABLE` block. Necessary when defining multi-column composite primary keys or named foreign keys:\n  `CONSTRAINT PK_Enrollment PRIMARY KEY (StudentID, CourseID)`.\n\n*Note:* `NOT NULL` can ONLY be applied as a column-level constraint."}</p>
                    </div>
                  
                </div>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition">
                <div className="flex items-center gap-3 text-emerald-400">
                  <ShieldCheck size={22} />
                  <h3 className="text-lg font-bold text-white">Key Summary Takeaways</h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  
                    <li key="CREATE TABLE stateme" className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{"CREATE TABLE statement creates a new relation schema in the active database."}</span>
                    </li>
                  
                    <li key="Syntax Structure: CR" className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{"Syntax Structure: CREATE TABLE table_name (col1 datatype constraints, col2 datatype constraints, ..., [table_constraints]);"}</span>
                    </li>
                  
                    <li key="Column-Level Constra" className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{"Column-Level Constraint: Declared immediately after the column's data type definition."}</span>
                    </li>
                  
                    <li key="Table-Level Constrai" className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{"Table-Level Constraint: Declared as a separate clause at the end of the table definition. Mandatory for Composite Primary Keys."}</span>
                    </li>
                  
                    <li key="IF NOT EXISTS clause" className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{"IF NOT EXISTS clause: Prevents runtime error 1050 if the table already exists."}</span>
                    </li>
                  
                    <li key="AUTO_INCREMENT: Auto" className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{"AUTO_INCREMENT: Automatically generates sequential unique integer keys on row insertion in MySQL."}</span>
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
                <code>{"-- Comprehensive CREATE TABLE Script\nCREATE DATABASE IF NOT EXISTS HospitalManagement;\nUSE HospitalManagement;\n\nCREATE TABLE Doctor (\n    DoctorID INT PRIMARY KEY AUTO_INCREMENT,\n    DoctorName VARCHAR(50) NOT NULL,\n    Specialization VARCHAR(40) NOT NULL,\n    Phone CHAR(10) UNIQUE NOT NULL,\n    ConsultationFee DECIMAL(8,2) DEFAULT 500.00,\n    JoinedDate DATE NOT NULL\n);\n\nCREATE TABLE PatientAdmission (\n    AdmissionID INT AUTO_INCREMENT,\n    PatientName VARCHAR(60) NOT NULL,\n    Age INT NOT NULL,\n    Gender CHAR(1) NOT NULL,\n    AssignedDoctorID INT NOT NULL,\n    RoomType VARCHAR(20) DEFAULT 'General Ward',\n    AdmissionDate DATE NOT NULL,\n    DischargeDate DATE,\n    \n    CONSTRAINT PK_Admission PRIMARY KEY (AdmissionID),\n    CONSTRAINT CHK_PatientAge CHECK (Age >= 0 AND Age <= 125),\n    CONSTRAINT CHK_Gender CHECK (Gender IN ('M', 'F', 'O')),\n    CONSTRAINT FK_DoctorAssigned FOREIGN KEY (AssignedDoctorID) \n        REFERENCES Doctor(DoctorID) ON DELETE RESTRICT ON UPDATE CASCADE\n);"}</code>
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
                <strong>Mentor Advice:</strong> {"When writing CREATE TABLE in CBSE board exams, make sure every column has a valid datatype. Column-level constraints are written directly after datatype (e.g. RollNo INT PRIMARY KEY). Table-level constraints are written at the end of the column list (e.g. PRIMARY KEY (RollNo, Class))."}
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
              downloadFileName="topic3_note.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note={"When writing CREATE TABLE in CBSE board exams, make sure every column has a valid datatype. Column-level constraints are written directly after datatype (e.g. RollNo INT PRIMARY KEY). Table-level constraints are written at the end of the column list (e.g. PRIMARY KEY (RollNo, Class))."} />

      </div>
    </div>
  );
}