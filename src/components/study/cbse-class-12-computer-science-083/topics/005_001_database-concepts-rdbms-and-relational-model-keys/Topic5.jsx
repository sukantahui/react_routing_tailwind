import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Columns, Rows, Plus, Minus, X, Database
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";
import pythonCode from "./topic5_files/degree_cardinality_calculator.py?raw";

export default function Topic5() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-amber-400 mb-2">
          <Columns className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-800/60">
            CBSE Board Exam #1 Favorite · Degree vs Cardinality
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Degree of a Relation (Columns) vs Cardinality (Rows)
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          The single most tested conceptual topic in CBSE Class 12 Computer Science.
          Master the exact distinction between Degree (number of columns) and Cardinality (number of rows),
          how they change under table modifications, and the Cartesian Product rules.
        </p>
      </header>

      {/* 2. Teacher Guidance */}
      <Teacher
        teacherName="Sukanta Hui"
        experienceYears="27+"
        designation="Senior Computer Science Faculty & Academic Consultant"
        institution="Coder & AccoTax, Barrackpore"
        message="I guarantee you will see a question on Degree and Cardinality in your board exam! Remember this golden mnemonic: 'Degree' represents Dimensions/Columns (think of degrees of an angle rising vertically), while 'Cardinality' represents Counting rows/records. When computing Cartesian Product (A x B), remember: Degrees ADD (+) and Cardinalities MULTIPLY (*)!"
      />

      {/* 3. The Core Comparison Grid */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 shadow-lg space-y-6">
        <div className="flex items-center space-x-3 text-sky-400">
          <Layers className="w-6 h-6" />
          <h2 className="text-xl font-bold text-white">Degree vs Cardinality at a Glance</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-amber-500/50 transition-all">
            <div className="flex items-center justify-between text-amber-400 font-bold text-sm mb-2">
              <span className="flex items-center space-x-2">
                <Columns className="w-4 h-4" />
                <span>DEGREE</span>
              </span>
              <span className="bg-amber-950 px-2 py-0.5 rounded text-xs border border-amber-800">Vertical</span>
            </div>
            <p className="text-white font-semibold text-xl">Number of Attributes (Columns)</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Total number of column headers in the table schema.
              Remains constant during daily operations; changes only when executing <code className="text-amber-300">ALTER TABLE ADD/DROP COLUMN</code>.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between text-emerald-400 font-bold text-sm mb-2">
              <span className="flex items-center space-x-2">
                <Rows className="w-4 h-4" />
                <span>CARDINALITY</span>
              </span>
              <span className="bg-emerald-950 px-2 py-0.5 rounded text-xs border border-emerald-800">Horizontal</span>
            </div>
            <p className="text-white font-semibold text-xl">Number of Tuples (Rows)</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Total number of data records currently populated in the relation.
              Changes dynamically with every <code className="text-emerald-300">INSERT</code>, <code className="text-emerald-300">DELETE</code>, or <code className="text-emerald-300">TRUNCATE</code>.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Cartesian Product Golden Rules */}
      <section className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Database className="w-5 h-5 text-sky-400" />
          <span>The Cartesian Product (A × B) Examination Rules</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-2">
            <div className="flex items-center space-x-2 text-sky-400 font-bold">
              <Plus className="w-4 h-4" />
              <span>Degree is ADDITIVE (+)</span>
            </div>
            <p className="font-mono text-xs text-emerald-300">
              Degree(A × B) = Degree(A) + Degree(B)
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              All columns from Table A and Table B are juxtaposed side-by-side in the resulting cross-join table.
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-bold">
              <X className="w-4 h-4" />
              <span>Cardinality is MULTIPLICATIVE (×)</span>
            </div>
            <p className="font-mono text-xs text-amber-300">
              Cardinality(A × B) = Cardinality(A) × Cardinality(B)
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every row of Table A combines with every row of Table B, forming all possible row combinations.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Python Simulation */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-sky-400" />
          <span>Interactive Python Simulator: Degree & Cardinality Tracker</span>
        </h3>
        <p className="text-sm text-slate-300">
          Run this simulation script to see how operations modify Degree and Cardinality dynamically,
          and calculate Cartesian Product outcomes:
        </p>
        <PythonFileLoader
          filename="degree_cardinality_calculator.py"
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
          title="Degree vs Cardinality - Quick Revision"
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
          Practice standard board questions on calculating Degree, Cardinality, and Cartesian Products:
        </p>
        <FAQTemplate questions={questions} />
      </section>
    </div>
  );
}
