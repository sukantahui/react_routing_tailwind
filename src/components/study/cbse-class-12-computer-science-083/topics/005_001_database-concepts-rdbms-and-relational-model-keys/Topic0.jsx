import React from 'react';
import {
  FileText, ShieldAlert, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Database, Server, RefreshCw, XCircle, Shield
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/file_vs_dbms_simulation.py?raw";

export default function Topic0() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-rose-400 mb-2">
          <ShieldAlert className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-rose-950/80 px-2.5 py-1 rounded-md border border-rose-800/60">
            Unit III: Database Management (20 Marks) · Foundational Theory
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Need for Database Management Systems: Limitations of File Processing
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Before modern databases, computerized record-keeping relied on traditional file processing systems.
          Explore why file processing failed as data grew, and master the core limitations frequently tested
          in CBSE examinations: Data Redundancy, Data Inconsistency, and Data Isolation.
        </p>
      </header>

      {/* 2. Teacher Guidance */}
      <Teacher
        teacherName="Sukanta Hui"
        experienceYears="27+"
        designation="Senior Computer Science Faculty & Academic Consultant"
        institution="Coder & AccoTax, Barrackpore"
        message="In Unit III, the 2-mark conceptual questions consistently test the differences between File Processing Systems and DBMS. Board examiners expect precise technical terminology: 'Data Redundancy' (duplicate copies) leads directly to 'Data Inconsistency' (conflicting values). Always state both together with a clean real-world example like student records in Fee and Library files!"
      />

      {/* 3. Core Limitations Grid: The 4 Major Flaws */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 shadow-lg space-y-6">
        <div className="flex items-center space-x-3 text-sky-400">
          <Layers className="w-6 h-6" />
          <h2 className="text-xl font-bold text-white">The Four Primary Failure Modes of File Systems</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-rose-500/50 transition-all">
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm mb-2">
              <RefreshCw className="w-4 h-4" />
              <span>1. Data Redundancy</span>
            </div>
            <p className="text-white font-semibold text-lg">Duplicated Storage</p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              The same data (student address, phone) is stored redundantly across multiple departmental files, wasting disk space and multiplying update efforts.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-amber-500/50 transition-all">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm mb-2">
              <XCircle className="w-4 h-4" />
              <span>2. Data Inconsistency</span>
            </div>
            <p className="text-white font-semibold text-lg">Conflicting Copies</p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              When an address change is made in one file but forgotten in another, different departments hold contradictory information for the same student.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-purple-500/50 transition-all">
            <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm mb-2">
              <Server className="w-4 h-4" />
              <span>3. Data Isolation</span>
            </div>
            <p className="text-white font-semibold text-lg">Disparate Formats</p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Data scattered across incompatible formats (text, binary, CSV) prevents cross-departmental queries without custom coding from scratch.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-sky-500/50 transition-all">
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm mb-2">
              <Shield className="w-4 h-4" />
              <span>4. Data Dependence</span>
            </div>
            <p className="text-white font-semibold text-lg">Tight Code Coupling</p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Application code depends on the exact byte-level physical file structure. Changing a field's length requires rewriting and recompiling all programs.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Comparison Table: File System vs DBMS */}
      <section className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Database className="w-5 h-5 text-emerald-400" />
          <span>CBSE Examination Comparison: File Processing vs Modern DBMS</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse border border-slate-700">
            <thead className="bg-slate-800 text-slate-200">
              <tr>
                <th className="p-3 border border-slate-700">Evaluation Criterion</th>
                <th className="p-3 border border-slate-700 text-rose-300">File Processing System</th>
                <th className="p-3 border border-slate-700 text-emerald-300">Database Management System (DBMS)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-white">Data Redundancy</td>
                <td className="p-3 text-rose-300">High: Multiple duplicate copies exist across department files.</td>
                <td className="p-3 text-emerald-300">Minimized: Centralized storage eliminates unnecessary duplicate records.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Data Consistency</td>
                <td className="p-3 text-rose-300">Poor: Uncoordinated updates create conflicting, mismatched values.</td>
                <td className="p-3 text-emerald-300">Guaranteed: Updates propagate automatically across the database.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Query Capability</td>
                <td className="p-3 text-rose-300">Difficult: Requires writing dedicated procedural programs (C/Python).</td>
                <td className="p-3 text-emerald-300">Easy: Standard declarative query language (SQL) allows ad-hoc queries.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Integrity Constraints</td>
                <td className="p-3 text-rose-300">Hardcoded inside programs; easily bypassed by direct file editing.</td>
                <td className="p-3 text-emerald-300">Enforced centrally by the DBMS (NOT NULL, UNIQUE, CHECK, FOREIGN KEY).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Crash Recovery</td>
                <td className="p-3 text-rose-300">Very difficult; file corruption occurs during unexpected power cuts.</td>
                <td className="p-3 text-emerald-300">Automated Write-Ahead Logging (WAL) ensures atomic rollback and recovery.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Security & Access</td>
                <td className="p-3 text-rose-300">Coarse: OS provides file-level access only (all-or-nothing).</td>
                <td className="p-3 text-emerald-300">Fine-grained: Grant/Revoke permissions down to tables, columns, or views.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Python Simulation */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-sky-400" />
          <span>Interactive Python Simulator: Data Inconsistency Demo</span>
        </h3>
        <p className="text-sm text-slate-300">
          Run this simulation script to see how updating a record in one department file creates immediate
          data inconsistency in a traditional file processing system:
        </p>
        <PythonFileLoader
          filename="file_vs_dbms_simulation.py"
          code={pythonCode}
        />
      </section>

      {/* 6. Quick Revision Notes */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-emerald-400" />
          <span>Quick Revision Summary Note</span>
        </h3>
        <PlainTextPrint
          title="Limitations of File Systems - Quick Revision"
          content={noteText}
        />
      </section>

      {/* 7. Comprehensive FAQ & Exam Questions */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 mb-2">
          <HelpCircle className="w-6 h-6" />
          <h3 className="text-xl font-bold text-white">25 Authentic CBSE Board Assessment Questions</h3>
        </div>
        <p className="text-sm text-slate-300">
          Master the concepts of data redundancy, inconsistency, and isolation with these board exam questions:
        </p>
        <FAQTemplate questions={questions} />
      </section>
    </div>
  );
}
