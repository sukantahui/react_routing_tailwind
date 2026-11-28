import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Check, XCircle, Filter, Database, Sparkles
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";
import pythonCode from "./topic4_files/domain_atomic_validator.py?raw";

export default function Topic4() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-purple-400 mb-2">
          <Filter className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-purple-950/80 px-2.5 py-1 rounded-md border border-purple-800/60">
            Relational Integrity · Data Types & Domains
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Domain of an Attribute and Atomic Values (First Normal Form)
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Understand how relational databases maintain data accuracy through Domains and Atomic Values.
          Learn why multi-valued attributes and composite fields violate relational principles, and how
          to properly decompose them into First Normal Form (1NF).
        </p>
      </header>

      {/* 2. Teacher Guidance */}
      <Teacher
        teacherName="Sukanta Hui"
        experienceYears="27+"
        designation="Senior Computer Science Faculty & Academic Consultant"
        institution="Coder & AccoTax, Barrackpore"
        message="A very common question asks: 'What is meant by the domain of an attribute? Give an example.' The formal answer is: 'Domain is the set of all permissible atomic values from which an attribute draws its values.' Always give a concrete example like: Domain of Gender = {'M', 'F', 'O'} or Domain of Marks = [0, 100]. Also remember that each cell must contain an atomic (indivisible) value!"
      />

      {/* 3. Core Concepts Grid */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 shadow-lg space-y-6">
        <div className="flex items-center space-x-3 text-sky-400">
          <Layers className="w-6 h-6" />
          <h2 className="text-xl font-bold text-white">The Twin Foundations of Column Data Integrity</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-purple-500/50 transition-all">
            <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm mb-2">
              <Filter className="w-4 h-4" />
              <span>1. Attribute Domain</span>
            </div>
            <p className="text-white font-semibold text-lg">Pool of Permissible Values</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              The predefined set of legal, valid atomic values that an attribute is allowed to hold.
              Enforced via data types (e.g. INT, VARCHAR, DATE) and constraints (CHECK, NOT NULL).
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-2">
              <Sparkles className="w-4 h-4" />
              <span>2. Atomic Values (1NF)</span>
            </div>
            <p className="text-white font-semibold text-lg">Indivisible Scalar Cells</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Every intersection of a row and column must contain exactly one single, indivisible scalar value.
              Lists, arrays, and multi-part values are strictly forbidden in standard relational tables.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Decomposition Walkthrough: Composite & Multi-valued */}
      <section className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Fixing Non-Atomic Values: The 1NF Solution</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-slate-900 p-4 rounded-lg border border-rose-500/30 space-y-2">
            <div className="flex items-center space-x-2 text-rose-400 font-bold">
              <XCircle className="w-4 h-4" />
              <span>INVALID (Violates Atomicity)</span>
            </div>
            <p className="text-slate-300 font-sans text-xs">
              Storing a composite address or multi-valued phones in a single cell:
            </p>
            <div className="bg-slate-950 p-3 rounded text-rose-300 border border-slate-800">
              RollNo: 101<br />
              Name: Aman<br />
              Phones: '983001, 983002'<br />
              Address: '12 Park St, Kolkata, 700016'
            </div>
          </div>

          <div className="bg-slate-900 p-4 rounded-lg border border-emerald-500/30 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold">
              <Check className="w-4 h-4" />
              <span>VALID (1NF Decomposed)</span>
            </div>
            <p className="text-slate-300 font-sans text-xs">
              Decomposed into atomic scalar columns and separate related table:
            </p>
            <div className="bg-slate-950 p-3 rounded text-emerald-300 border border-slate-800">
              RollNo: 101 | Name: Aman<br />
              Street: '12 Park St'<br />
              City: 'Kolkata' | Pin: 700016<br />
              Phones in child table: (101, '983001'), (101, '983002')
            </div>
          </div>
        </div>
      </section>

      {/* 5. Python Simulation */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-sky-400" />
          <span>Interactive Python Simulator: Domain & Atomicity Validator Engine</span>
        </h3>
        <p className="text-sm text-slate-300">
          Run this simulation script to validate attribute domains, detect non-atomic cells, and execute 1NF transformations:
        </p>
        <PythonFileLoader
          filename="domain_atomic_validator.py"
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
          title="Domain and Atomic Values - Quick Revision"
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
          Test your diagnostic skills on attribute domains, check constraints, and atomicity:
        </p>
        <FAQTemplate questions={questions} />
      </section>
    </div>
  );
}
