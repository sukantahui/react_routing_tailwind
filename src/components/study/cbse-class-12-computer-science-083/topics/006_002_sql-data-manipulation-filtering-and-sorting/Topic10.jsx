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
          Range Search: BETWEEN ... AND and NOT BETWEEN ... AND Operators
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Continuous Interval Matching · Inclusive Boundaries · Numeric & Date Ranges. Master this essential CBSE examination topic with verified code patterns, theory explanations, and authentic board exam question sets.
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
          message="SQL Data Manipulation and Querying carries substantial weightage in Section C and D of the CBSE Class 12 board examination (Code 083). Pay close attention to wildcard pattern precision, NULL comparison nuances (IS NULL vs = NULL), and boundary rules in BETWEEN ... AND operators."
        />
      </section>

      {/* 3. Core Concepts */}
      <section className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Layers className="w-5 h-5 text-sky-400" />
          <span>Continuous Range Queries with BETWEEN</span>
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
          The BETWEEN operator selects values within a continuous range. In SQL, the boundaries are INCLUSIVE on both ends.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">Syntax: 'WHERE column BETWEEN low_val AND high_val;' — lower value MUST appear first.</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">Inclusive Nature: Equivalent to '(column >= low_val AND column <= high_val)'. Both end points are included.</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">NOT BETWEEN ... AND: Selects values outside the specified range: '(column < low_val OR column > high_val)'.</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">Works on Numbers, Dates ('YYYY-MM-DD'), and Alphabetical text ranges.</span>
          </div>
        </div>
      </section>

      {/* 4. Syntax & Live Code Demonstration */}
      <section className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Code className="w-5 h-5 text-amber-400" />
          <span>SQL Syntax & Practical Query Demonstration</span>
        </h2>
        <p className="text-slate-300 text-sm">
          Examine the syntax and authentic query examples tested frequently in CBSE Class 12 examinations:
        </p>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto">
          <pre className="text-emerald-400 font-mono text-sm leading-relaxed">
{`-- Marks between 80 and 95 (inclusive of 80 and 95)
SELECT SName, Marks 
FROM Student 
WHERE Marks BETWEEN 80.0 AND 95.0;

-- Equivalent explicit relational logic:
SELECT SName, Marks 
FROM Student 
WHERE Marks >= 80.0 AND Marks <= 95.0;

-- Joining dates between two fiscal quarters
SELECT EName, DOJ 
FROM Employee 
WHERE DOJ BETWEEN '2022-01-01' AND '2022-06-30';

-- NOT BETWEEN: Marks strictly below 50 or above 90
SELECT SName, Marks 
FROM Student 
WHERE Marks NOT BETWEEN 50.0 AND 90.0;`}
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
          Always pay attention to string quoting and clause ordering: FROM -> WHERE -> ORDER BY.
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
