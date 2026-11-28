import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Link, Shield, XCircle, Check, Database
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";
import pythonCode from "./topic11_files/foreign_key_referential_integrity_sim.py?raw";

export default function Topic11() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-indigo-400 mb-2">
          <Link className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-indigo-950/80 px-2.5 py-1 rounded-md border border-indigo-800/60">
            Relational Integrity · Table Relationships
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Foreign Key: Linking Tables, Parent vs Child Relation & Referential Integrity
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Master how relational databases link tables together.
          Understand Parent vs Child relations, how Foreign Keys enforce the Referential Integrity Rule,
          and how database engines handle <code className="text-indigo-300 font-mono">ON DELETE CASCADE</code> and <code className="text-indigo-300 font-mono">RESTRICT</code>.
        </p>
      </header>

      {/* 2. Teacher Guidance */}
      <Teacher
        teacherName="Sukanta Hui"
        experienceYears="27+"
        designation="Senior Computer Science Faculty & Academic Consultant"
        institution="Coder & AccoTax, Barrackpore"
        message="Foreign Key and Referential Integrity is the central relational concept of Unit III. In board exams, you are given two tables (like DEPARTMENT and EMPLOYEE) and asked: (1) Identify parent and child tables, (2) Identify primary and foreign keys, (3) State the referential integrity rule. Remember: The table with the Primary Key being referenced is the PARENT; the table holding the Foreign Key is the CHILD. A foreign key value must either exist in the parent or be NULL!"
      />

      {/* 3. The Core Concept Grid */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 shadow-lg space-y-6">
        <div className="flex items-center space-x-3 text-sky-400">
          <Layers className="w-6 h-6" />
          <h2 className="text-xl font-bold text-white">The Three Pillars of Referential Integrity</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-indigo-500/50 transition-all">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm mb-2">
              <Link className="w-4 h-4" />
              <span>1. Foreign Key (FK)</span>
            </div>
            <p className="text-white font-semibold">The Cross-Table Bridge</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              An attribute in a child table whose values point directly to the Primary Key of a parent table.
              Permits duplicates (many-to-one relationship) and NULLs.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-sky-500/50 transition-all">
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm mb-2">
              <Database className="w-4 h-4" />
              <span>2. Parent vs Child</span>
            </div>
            <p className="text-white font-semibold">Direction of Reference</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              <span className="text-sky-300 font-bold">Parent Table:</span> Contains the Primary Key (e.g. DEPARTMENT).<br />
              <span className="text-indigo-300 font-bold">Child Table:</span> Contains the Foreign Key (e.g. EMPLOYEE).
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>3. Referential Integrity</span>
            </div>
            <p className="text-white font-semibold">Zero Orphan Records</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Every foreign key value must either match an existing primary key value in the parent table, or be NULL.
              Prevents dangling references.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Visual Walkthrough of Table Linking */}
      <section className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Link className="w-5 h-5 text-indigo-400" />
          <span>Visual Link: DEPARTMENT (Parent) and EMPLOYEE (Child)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-slate-900 p-4 rounded-lg border border-sky-500/30 space-y-2">
            <p className="font-bold text-sky-400 text-sm">Parent Table: DEPARTMENT</p>
            <table className="w-full text-left border border-slate-700">
              <thead className="bg-slate-800 text-slate-300">
                <tr><th className="p-2 border border-slate-700 text-amber-300">DeptId (PK)</th><th className="p-2 border border-slate-700">DeptName</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr><td className="p-2 text-emerald-300">10</td><td className="p-2">Computer Science</td></tr>
                <tr><td className="p-2 text-emerald-300">20</td><td className="p-2">Physics</td></tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-900 p-4 rounded-lg border border-indigo-500/30 space-y-2">
            <p className="font-bold text-indigo-400 text-sm">Child Table: EMPLOYEE</p>
            <table className="w-full text-left border border-slate-700">
              <thead className="bg-slate-800 text-slate-300">
                <tr><th className="p-2 border border-slate-700 text-amber-300">EmpId (PK)</th><th className="p-2 border border-slate-700">Name</th><th className="p-2 border border-slate-700 text-indigo-300">DeptId (FK)</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr><td className="p-2">101</td><td className="p-2">Amit</td><td className="p-2 text-emerald-300 font-bold">10 -> Valid</td></tr>
                <tr><td className="p-2">102</td><td className="p-2">Pooja</td><td className="p-2 text-emerald-300 font-bold">20 -> Valid</td></tr>
                <tr><td className="p-2">103</td><td className="p-2">Sneha</td><td className="p-2 text-slate-400 font-bold">NULL -> Valid</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Python Simulation */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-sky-400" />
          <span>Interactive Python Simulator: Foreign Key & Referential Integrity Engine</span>
        </h3>
        <p className="text-sm text-slate-300">
          Run this simulation script to experience how an RDBMS enforces referential integrity on insertions and parent deletions:
        </p>
        <PythonFileLoader
          filename="foreign_key_referential_integrity_sim.py"
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
          title="Foreign Key & Referential Integrity - Quick Revision"
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
          Master Foreign Keys, Parent/Child relations, and Referential Integrity with these board questions:
        </p>
        <FAQTemplate questions={questions} />
      </section>
    </div>
  );
}
