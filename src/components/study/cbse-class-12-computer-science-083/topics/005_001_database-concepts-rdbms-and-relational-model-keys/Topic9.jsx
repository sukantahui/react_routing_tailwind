import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Key, Award, XCircle, Check, Database
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";
import pythonCode from "./topic9_files/primary_key_integrity_engine.py?raw";

export default function Topic9() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-emerald-400 mb-2">
          <Award className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/60">
            Core Relational Key · Entity Integrity
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Primary Key: Selection from Candidate Keys & Mandatory Properties
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Master the chosen unique identifier of the Relational Model.
          Understand why exactly one candidate key is selected as the Primary Key, the strict requirements
          of Entity Integrity (UNIQUE and NOT NULL), and composite primary key design.
        </p>
      </header>

      {/* 2. Teacher Guidance */}
      <Teacher
        teacherName="Sukanta Hui"
        experienceYears="27+"
        designation="Senior Computer Science Faculty & Academic Consultant"
        institution="Coder & AccoTax, Barrackpore"
        message="A Primary Key has two non-negotiable properties that CBSE evaluators look for in every answer: It MUST BE UNIQUE and it CANNOT BE NULL. This is called the 'Entity Integrity' rule. When asked to choose between two candidate keys (like Student Admission Number vs Email), always choose the Admission Number because integers are immutable and index faster than email strings!"
      />

      {/* 3. The Two Golden Rules of Primary Keys */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 shadow-lg space-y-6">
        <div className="flex items-center space-x-3 text-sky-400">
          <Layers className="w-6 h-6" />
          <h2 className="text-xl font-bold text-white">Entity Integrity: The Two Mandatory Rules</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Rule 1: STRICTLY UNIQUE</span>
            </div>
            <p className="text-white font-semibold text-lg">No Duplicate Values Permitted</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Every row must have a distinct primary key value. Attempting to insert a duplicate value immediately triggers a constraint violation error.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-rose-500/50 transition-all">
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm mb-2">
              <XCircle className="w-4 h-4" />
              <span>Rule 2: STRICTLY NOT NULL</span>
            </div>
            <p className="text-white font-semibold text-lg">No Missing or Empty Values</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              No row can have an empty, missing, or undefined primary key. If a composite primary key is used, no component attribute can be NULL.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Primary Key vs Unique Comparison */}
      <section className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Key className="w-5 h-5 text-amber-400" />
          <span>CBSE Exam Distinction: PRIMARY KEY vs UNIQUE Constraint</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse border border-slate-700 text-xs">
            <thead className="bg-slate-800 text-slate-200">
              <tr>
                <th className="p-3 border border-slate-700">Feature</th>
                <th className="p-3 border border-slate-700 text-emerald-300">PRIMARY KEY Constraint</th>
                <th className="p-3 border border-slate-700 text-sky-300">UNIQUE Constraint</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-white">Count per Table</td>
                <td className="p-3 text-emerald-300">Strictly ONE primary key per table.</td>
                <td className="p-3 text-sky-300">Multiple UNIQUE constraints permitted.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">NULL Values</td>
                <td className="p-3 text-rose-300">Strictly FORBIDDEN (Implicitly NOT NULL).</td>
                <td className="p-3 text-emerald-300">Permitted (can accept NULL values).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Clustered Index</td>
                <td className="p-3">Automatically creates Clustered B-Tree index.</td>
                <td className="p-3">Creates Non-Clustered index by default.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Foreign Key Reference</td>
                <td className="p-3">The primary target for foreign key links.</td>
                <td className="p-3">Can be referenced, but less common.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Python Simulation */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-sky-400" />
          <span>Interactive Python Simulator: Primary Key Integrity Engine</span>
        </h3>
        <p className="text-sm text-slate-300">
          Run this simulation script to see how an RDBMS enforces Primary Key uniqueness and blocks NULL insertions:
        </p>
        <PythonFileLoader
          filename="primary_key_integrity_engine.py"
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
          title="Primary Key Properties - Quick Revision"
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
          Master Primary Key properties, entity integrity, and SQL constraints with these board questions:
        </p>
        <FAQTemplate questions={questions} />
      </section>
    </div>
  );
}
