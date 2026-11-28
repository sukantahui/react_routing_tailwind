import React from 'react';
import {
  FileText, CheckCircle2, AlertTriangle, HelpCircle,
  Layers, ArrowRight, Database, Server, Key, Shield, Code, Download, PlayCircle, Wrench, Edit3, Trash2
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-sky-400 mb-2">
          <Database className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-sky-950/80 px-2.5 py-1 rounded-md border border-sky-800/60">
            Unit III: Database Management (20 Marks) · Topic 0
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Need for Database Connectivity: Integrating Python Front-End with MySQL Back-End
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Two-Tier Architecture · Front-End vs Back-End · Persistent Data Storage. Master this essential CBSE examination topic with verified Python-MySQL scripts, fetch methods, transaction control, and board exam question sets.
        </p>
      </header>

      {/* 2. Teacher Note */}
      <section>
        <Teacher
          teacherName="Sukanta Hui"
          designation="Master Teacher & CBSE Computer Science Mentor"
          organization="Coder & AccoTax, Barrackpore"
          experienceYears={27}
          specialization="Python Programming, Relational DBMS & CBSE Class 12 Board Prep"
          message="Python-MySQL Connectivity is the vital bridge connecting Unit I Python Programming with Unit III Relational Databases. In the CBSE board exam, questions on writing a Python function to insert or display database records carry 3 to 5 marks. The number one student error is forgetting con.commit() after an INSERT or UPDATE statement!"
        />
      </section>

      {/* 3. Core Concepts */}
      <section className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Layers className="w-5 h-5 text-sky-400" />
          <span>The Architecture of Database-Driven Applications</span>
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
          Python acts as a versatile front-end programming language while MySQL provides a robust, multi-user relational database management back-end.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">In enterprise software, Python handles user interaction, validation, and business logic, while MySQL handles persistent tabular storage.</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">Two-tier client-server architecture: Python client communicates with MySQL server daemon via TCP/IP sockets (default port 3306).</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">Eliminates data volatility: In-memory Python data structures (lists, dicts) vanish upon program termination; MySQL guarantees persistence.</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">CBSE Exam Syllabus: Python-MySQL connectivity carries 5 to 7 marks in Section C & Section D of the CBSE Class 12 board examination.</span>
          </div>
        </div>
      </section>

      {/* 4. Syntax & Live Code Demonstration */}
      <section className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Code className="w-5 h-5 text-amber-400" />
          <span>Python Code & Connectivity Demonstration</span>
        </h2>
        <p className="text-slate-300 text-sm">
          Examine the syntax and authentic Python connectivity patterns tested frequently in CBSE Class 12 examinations:
        </p>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto">
          <pre className="text-emerald-400 font-mono text-sm leading-relaxed">
{`# Conceptual Two-Tier Data Flow:
# [ User / Terminal ] <---> [ Python Application Layer ] <---> [ MySQL Database Server ]
# Input: RollNo, Marks       Validates & Builds Query           Executes SQL, Stores in B-Tree
# Displays Formatted Table   Fetches Tuples via Cursor          Returns Recordset via TCP/IP`}
          </pre>
        </div>
      </section>

      {/* 5. CBSE Pitfalls & Common Mistakes */}
      <section className="bg-amber-950/30 border border-amber-800/50 rounded-xl p-6 space-y-3">
        <div className="flex items-center space-x-3 text-amber-400">
          <AlertTriangle className="w-6 h-6" />
          <h2 className="text-lg font-bold">CBSE Board Exam Traps & Common Examiner Pitfalls</h2>
        </div>
        <p className="text-sm text-amber-200/90 leading-relaxed">
          Writing Python file handling code when the exam question explicitly asks for MySQL database connectivity using mysql.connector.
        </p>
      </section>

      {/* 6. Printable Study Notes */}
      <section className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Download className="w-5 h-5 text-sky-400" />
            <span>Printable Study Notes & Revision Sheet</span>
          </h2>
        </div>
        <PlainTextPrint
          content={noteText}
          filename="CBSE_Class12_CS_Topic0_Revision_Notes.txt"
        />
      </section>

      {/* 7. Comprehensive Assessment Question Bank */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-white">
          <HelpCircle className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-bold">Practice & Self-Assessment (25 Curated Questions)</h2>
        </div>
        <FAQTemplate
          questions={questions}
          title="Topic 0: Self-Evaluation & CBSE Board Pattern MCQ Challenge"
        />
      </section>
    </div>
  );
}
