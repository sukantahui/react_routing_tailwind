import React from 'react';
import {
  FileText, CheckCircle2, AlertTriangle, HelpCircle,
  Layers, ArrowRight, Database, Server, Key, Shield, Code, Download, PlayCircle, Wrench, Edit3, Trash2
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

export default function Topic12() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-sky-400 mb-2">
          <Database className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-sky-950/80 px-2.5 py-1 rounded-md border border-sky-800/60">
            Unit III: Database Management (20 Marks) · Topic 12
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Downloadable Documents: Python-MySQL Connectivity Reference Guide & Cheatsheet
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Quick Revision Sheets · Method Cheatsheets · Complete Exam Templates. Master this essential CBSE examination topic with verified Python-MySQL scripts, fetch methods, transaction control, and board exam question sets.
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
          <span>Comprehensive Python-MySQL Connectivity Reference Guide</span>
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
          Printable revision sheets with connection parameter tables, cursor fetch method comparisons, commit rules, and template code for board exams.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">Summary of all connect() parameters: host, user, password, database, port.</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">Comparison matrix of fetchone() vs fetchmany() vs fetchall().</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">Template code snippets for 3-mark and 5-mark board programming questions.</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">Master teacher tips by Sukanta Hui on avoiding common syntax errors in board exams.</span>
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
{`# Quick Reference Card:
# 1. con = mysql.connector.connect(...)
# 2. cur = con.cursor()
# 3. cur.execute(sql, params)
# 4. con.commit()       (for DML)
# 5. cur.fetchall()     (for SELECT)
# 6. cur.close(); con.close()`}
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
          Always remember con.commit() for DML operations (INSERT, UPDATE, DELETE). Without it, MySQL will not write your changes to disk!
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
          filename="CBSE_Class12_CS_Topic12_Revision_Notes.txt"
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
          title="Topic 12: Self-Evaluation & CBSE Board Pattern MCQ Challenge"
        />
      </section>
    </div>
  );
}
