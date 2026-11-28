import React from 'react';
import {
  FileText, CheckCircle2, AlertTriangle, HelpCircle,
  Layers, ArrowRight, Database, Server, Key, Shield, Code, Download, PlayCircle, Wrench, Edit3, Trash2
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

export default function Topic10() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-sky-400 mb-2">
          <Database className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-sky-950/80 px-2.5 py-1 rounded-md border border-sky-800/60">
            Unit III: Database Management (20 Marks) · Topic 10
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          The Equi-Join: Linking Tables via Common Attributes (WHERE table1.id = table2.id)
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Relational Joins · Primary-Foreign Key Match · Filtering Cross Product. Master this essential CBSE examination topic with verified query patterns, execution order analysis, and authentic board exam question sets.
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
          message="SQL Aggregate functions, GROUP BY, and Multi-Table Joins form the core of 3-mark and 6-mark questions in the CBSE Class 12 board examination. Remember the fundamental rule: columns in the SELECT clause must appear in the GROUP BY clause unless they are wrapped inside an aggregate function!"
        />
      </section>

      {/* 3. Core Concepts */}
      <section className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Layers className="w-5 h-5 text-sky-400" />
          <span>Connecting Tables with Equi-Join</span>
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
          An Equi-Join links records from two or more tables based on equality comparison between common attributes (typically Primary Key and Foreign Key).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">An Equi-Join is effectively a Cartesian Product filtered by a join predicate: 'WHERE Table1.CommonCol = Table2.CommonCol'.</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">Number of Join Conditions Rule: To join N tables, at least (N - 1) join conditions are required in the WHERE clause to avoid Cartesian explosion.</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">Syntax: 'SELECT T1.Col1, T2.Col2 FROM Table1 T1, Table2 T2 WHERE T1.Key = T2.Key;'</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">Only records that have matching keys in both tables appear in the equi-join result set.</span>
          </div>
        </div>
      </section>

      {/* 4. Syntax & Live Code Demonstration */}
      <section className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Code className="w-5 h-5 text-amber-400" />
          <span>SQL Syntax & Multi-Table Demonstration</span>
        </h2>
        <p className="text-slate-300 text-sm">
          Examine the syntax and authentic query examples tested frequently in CBSE Class 12 examinations:
        </p>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto">
          <pre className="text-emerald-400 font-mono text-sm leading-relaxed">
{`-- Two-table Equi-Join
SELECT S.RollNo, S.SName, C.CourseName, C.Fees 
FROM Student S, Course C 
WHERE S.CourseId = C.CourseId;

-- Three-table Equi-Join (Requires 3 - 1 = 2 Join conditions)
SELECT O.OrderId, C.CustName, I.ItemName, O.Qty 
FROM Orders O, Customer C, Item I 
WHERE O.CustId = C.CustId AND O.ItemId = I.ItemId;`}
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
          Never write aggregate functions in the WHERE clause. Always use HAVING for group-level filtering, and always ensure (N - 1) join conditions for N tables.
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
          filename="CBSE_Class12_CS_Topic10_Revision_Notes.txt"
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
          title="Topic 10: Self-Evaluation & CBSE Board Pattern MCQ Challenge"
        />
      </section>
    </div>
  );
}
