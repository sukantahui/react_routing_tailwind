import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Database, Server, Cpu, HardDrive, Key
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";
import pythonCode from "./topic2_files/rdbms_architecture_engine_sim.py?raw";

export default function Topic2() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-sky-400 mb-2">
          <Database className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-sky-950/80 px-2.5 py-1 rounded-md border border-sky-800/60">
            Relational Architecture · ANSI-SPARC Standard
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Relational Database Management System (RDBMS) Concept and Architecture
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Explore the mathematical foundations of Dr. E.F. Codd's Relational Model.
          Understand the classic ANSI-SPARC three-level schema architecture (External, Conceptual, Internal),
          the Data Dictionary, and the internal engine lifecycle of an SQL query.
        </p>
      </header>

      {/* 2. Teacher Guidance */}
      <Teacher
        teacherName="Sukanta Hui"
        experienceYears="27+"
        designation="Senior Computer Science Faculty & Academic Consultant"
        institution="Coder & AccoTax, Barrackpore"
        message="CBSE board questions regularly ask students to distinguish between 'Schema' and 'Instance', or explain the three levels of database architecture. Remember the golden rule: Schema is the permanent structural blueprint (table and column definitions), while Instance is the actual data stored at any given moment. Dr. E.F. Codd's name is a classic 1-mark question favorite!"
      />

      {/* 3. The 3-Level Architecture Grid */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 shadow-lg space-y-6">
        <div className="flex items-center space-x-3 text-emerald-400">
          <Layers className="w-6 h-6" />
          <h2 className="text-xl font-bold text-white">ANSI-SPARC Three-Level Database Architecture</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-sky-500/50 transition-all">
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm mb-2">
              <Server className="w-4 h-4" />
              <span>1. External Level (View Level)</span>
            </div>
            <p className="text-white font-semibold">User-Specific Views</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Tailored subsets of the database presented to specific users or applications. Hides internal complexities and restricts sensitive data.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-2">
              <Cpu className="w-4 h-4" />
              <span>2. Conceptual Level (Logical Level)</span>
            </div>
            <p className="text-white font-semibold">Global Enterprise Design</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              The complete logical design of the entire database. Defines all tables, columns, data types, constraints, and relationships.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-amber-500/50 transition-all">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm mb-2">
              <HardDrive className="w-4 h-4" />
              <span>3. Internal Level (Physical Level)</span>
            </div>
            <p className="text-white font-semibold">Physical Storage Details</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Describes how data is physically stored on disk: file organizations, record blocks, B-tree indexes, compression, and allocation.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Core Concepts: Schema vs Instance */}
      <section className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Key className="w-5 h-5 text-amber-400" />
          <span>Key Examination Distinction: Schema vs Instance</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-2">
            <p className="font-bold text-sky-400">Database Schema (Intension)</p>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>The overall skeletal blueprint and structural design of the database.</li>
              <li>Defines table names, attribute names, data types, and integrity constraints.</li>
              <li>Specified during database design and modified very rarely.</li>
              <li>Example: <code className="text-sky-300 font-mono">CREATE TABLE Student (RollNo INT, Name VARCHAR(30));</code></li>
            </ul>
          </div>

          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-2">
            <p className="font-bold text-emerald-400">Database Instance (Extension)</p>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>The actual collection of data stored in the database at a specific moment.</li>
              <li>Consists of populated tuples/rows inside relations.</li>
              <li>Changes continuously whenever records are inserted, updated, or deleted.</li>
              <li>Example: The current 45 student records present in the Student table today.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Python Simulation */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-sky-400" />
          <span>Interactive Python Simulator: RDBMS Query Lifecycle & Buffer Engine</span>
        </h3>
        <p className="text-sm text-slate-300">
          Run this simulation script to trace how the SQL Parser, Catalog metadata, Query Optimizer,
          and Buffer Pool cooperate to execute a query:
        </p>
        <PythonFileLoader
          filename="rdbms_architecture_engine_sim.py"
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
          title="RDBMS Architecture - Quick Revision"
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
          Master RDBMS architecture, ANSI-SPARC levels, and schema concepts with these board exam questions:
        </p>
        <FAQTemplate questions={questions} />
      </section>
    </div>
  );
}
