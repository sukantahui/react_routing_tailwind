import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Table, Columns, Rows, Check, Database
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";
import pythonCode from "./topic3_files/relation_tuple_attribute_inspector.py?raw";

export default function Topic3() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-cyan-400 mb-2">
          <Table className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-800/60">
            Relational Vocabulary · Core Foundations
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Relational Data Model Terminology: Relation, Tuple & Attribute
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Master the formal mathematical terminology of the Relational Model.
          Understand the precise equivalence of Table ↔ Relation, Row ↔ Tuple, and Column ↔ Attribute,
          along with the fundamental mathematical properties that govern all relational tables.
        </p>
      </header>

      {/* 2. Teacher Guidance */}
      <Teacher
        teacherName="Sukanta Hui"
        experienceYears="27+"
        designation="Senior Computer Science Faculty & Academic Consultant"
        institution="Coder & AccoTax, Barrackpore"
        message="In almost every CBSE board examination, Section A contains a question like: 'State the technical terms used in RDBMS for a row and a column of a table.' Students who write 'record' and 'field' only get partial marks! The official marking scheme strictly expects 'Tuple' for row and 'Attribute' for column. Memorize this three-way equivalence: Table is Relation, Row is Tuple, Column is Attribute!"
      />

      {/* 3. The Three Pillars of Relational Vocabulary */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 shadow-lg space-y-6">
        <div className="flex items-center space-x-3 text-sky-400">
          <Layers className="w-6 h-6" />
          <h2 className="text-xl font-bold text-white">The Three Core Relational Terms</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-cyan-500/50 transition-all">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm mb-2">
              <Table className="w-4 h-4" />
              <span>1. Table = RELATION</span>
            </div>
            <p className="text-white font-semibold text-lg">Two-Dimensional Table</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              A mathematical set of tuples representing an entity set (e.g. Student, Employee, Item).
              Characterized by a unique name and a fixed schema of attributes.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-2">
              <Rows className="w-4 h-4" />
              <span>2. Row = TUPLE</span>
            </div>
            <p className="text-white font-semibold text-lg">Horizontal Record</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              A single row in a table representing a single entity instance.
              Each tuple is an ordered sequence of atomic values matching the relation's attributes.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-amber-500/50 transition-all">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm mb-2">
              <Columns className="w-4 h-4" />
              <span>3. Column = ATTRIBUTE</span>
            </div>
            <p className="text-white font-semibold text-lg">Vertical Named Field</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              A named vertical column representing a specific property of an entity.
              All values in an attribute must be atomic and belong to the same Domain.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Visual Anatomy of a Relation */}
      <section className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Database className="w-5 h-5 text-emerald-400" />
          <span>Visual Anatomy: Relation STUDENT</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse border border-slate-700">
            <thead className="bg-slate-800 text-slate-200">
              <tr>
                <th className="p-3 border border-slate-700 text-amber-400 font-mono">RollNo (Attr 1)</th>
                <th className="p-3 border border-slate-700 text-amber-400 font-mono">Name (Attr 2)</th>
                <th className="p-3 border border-slate-700 text-amber-400 font-mono">Stream (Attr 3)</th>
                <th className="p-3 border border-slate-700 text-amber-400 font-mono">Marks (Attr 4)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 text-white">101</td>
                <td className="p-3 text-emerald-300">Aman Sharma</td>
                <td className="p-3">Science</td>
                <td className="p-3 text-sky-400">94</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 text-white">102</td>
                <td className="p-3 text-emerald-300">Pooja Verma</td>
                <td className="p-3">Commerce</td>
                <td className="p-3 text-sky-400">88</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 text-white">103</td>
                <td className="p-3 text-emerald-300">Rohan Das</td>
                <td className="p-3">Science</td>
                <td className="p-3 text-sky-400">91</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          In this table: Relation Name = <span className="text-white font-bold">STUDENT</span>,
          Number of Attributes (Columns) = <span className="text-amber-400 font-bold">4</span>,
          Number of Tuples (Rows) = <span className="text-emerald-400 font-bold">3</span>.
        </p>
      </section>

      {/* 5. Python Simulator */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-sky-400" />
          <span>Interactive Python Simulator: Relational Table Structure Inspector</span>
        </h3>
        <p className="text-sm text-slate-300">
          Run this simulation script to verify table schemas, atomic values, and mathematical uniqueness of tuples:
        </p>
        <PythonFileLoader
          filename="relation_tuple_attribute_inspector.py"
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
          title="Relational Terminology - Quick Revision"
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
          Test your mastery of Relation, Tuple, and Attribute terminology with these board exam questions:
        </p>
        <FAQTemplate questions={questions} />
      </section>
    </div>
  );
}
