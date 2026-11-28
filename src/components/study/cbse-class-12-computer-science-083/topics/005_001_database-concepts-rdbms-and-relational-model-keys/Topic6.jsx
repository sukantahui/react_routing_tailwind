import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Calculator, Plus, Minus, X, Database
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";
import pythonCode from "./topic6_files/degree_cardinality_operations_engine.py?raw";

export default function Topic6() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-emerald-400 mb-2">
          <Calculator className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/60">
            Numerical Problem Solving · 100% Exam Formula
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Calculating Degree & Cardinality after Operations, Joins & Modifications
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Master the mathematical rules for calculating Degree and Cardinality after row insertions,
          deletions, column additions, truncations, Cartesian products, and relational joins.
        </p>
      </header>

      {/* 2. Teacher Guidance */}
      <Teacher
        teacherName="Sukanta Hui"
        experienceYears="27+"
        designation="Senior Computer Science Faculty & Academic Consultant"
        institution="Coder & AccoTax, Barrackpore"
        message="In Question 24 or 26 of your board exam, CBSE routinely presents two tables with given rows and columns, then asks you to find the Degree and Cardinality of their Cartesian product or after inserting/deleting records. Students often confuse whether degree adds or multiplies. Remember: Columns ADD side-by-side (Degree = D1 + D2), while rows MULTIPLY combinatorially (Cardinality = C1 × C2)!"
      />

      {/* 3. The 4 Golden Formulas */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 shadow-lg space-y-6">
        <div className="flex items-center space-x-3 text-sky-400">
          <Layers className="w-6 h-6" />
          <h2 className="text-xl font-bold text-white">The Four Universal Examination Formulas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-2">
              <Plus className="w-4 h-4" />
              <span>1. Row Insertions & Deletions</span>
            </div>
            <p className="text-white font-semibold">Degree Unchanged · Cardinality Modifies</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed font-mono">
              New Cardinality = Original Rows + Inserted - Deleted<br />
              New Degree = Original Columns (UNTOUCHED)
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-sky-500/50 transition-all">
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm mb-2">
              <Minus className="w-4 h-4" />
              <span>2. Column Additions & Drops</span>
            </div>
            <p className="text-white font-semibold">Cardinality Unchanged · Degree Modifies</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed font-mono">
              New Degree = Original Columns + Added - Dropped<br />
              New Cardinality = Original Rows (UNTOUCHED)
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-amber-500/50 transition-all">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm mb-2">
              <X className="w-4 h-4" />
              <span>3. Cartesian Product (A × B)</span>
            </div>
            <p className="text-white font-semibold">Degrees Add · Cardinalities Multiply</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed font-mono">
              Degree(A × B) = Degree(A) + Degree(B)<br />
              Cardinality(A × B) = Cardinality(A) × Cardinality(B)
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-purple-500/50 transition-all">
            <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm mb-2">
              <Database className="w-4 h-4" />
              <span>4. Natural Join (A ⨝ B)</span>
            </div>
            <p className="text-white font-semibold">Common Column De-duplicated</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed font-mono">
              Degree(A ⨝ B) = Degree(A) + Degree(B) - 1 (for 1 common col)<br />
              Cardinality = Count of rows matching join condition
            </p>
          </div>
        </div>
      </section>

      {/* 4. Solved CBSE Numerical Example */}
      <section className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>CBSE Model Board Question & Step-by-Step Solution</span>
        </h3>
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 text-sm space-y-3 font-mono">
          <p className="text-amber-400 font-bold">
            Problem: Table DOCTOR has 5 columns and 20 rows. Table PATIENT has 4 columns and 50 rows.
          </p>
          <div className="space-y-1 text-slate-300 text-xs">
            <p>1. Find Degree of DOCTOR × PATIENT: <span className="text-emerald-400 font-bold">5 + 4 = 9</span></p>
            <p>2. Find Cardinality of DOCTOR × PATIENT: <span className="text-emerald-400 font-bold">20 × 50 = 1000</span></p>
            <p>3. If 2 new columns are added to DOCTOR and 5 doctors leave, updated DOCTOR metrics:</p>
            <p className="pl-4 text-sky-300">• New Degree = 5 + 2 = 7</p>
            <p className="pl-4 text-sky-300">• New Cardinality = 20 - 5 = 15</p>
          </div>
        </div>
      </section>

      {/* 5. Python Simulation */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-sky-400" />
          <span>Interactive Python Simulator: Degree & Cardinality Operation Engine</span>
        </h3>
        <p className="text-sm text-slate-300">
          Run this simulation script to test custom table dimensions and verify Cartesian product calculations:
        </p>
        <PythonFileLoader
          filename="degree_cardinality_operations_engine.py"
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
          title="Degree & Cardinality Operations - Quick Revision"
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
          Master numerical operations on Degree and Cardinality with these board exam questions:
        </p>
        <FAQTemplate questions={questions} />
      </section>
    </div>
  );
}
