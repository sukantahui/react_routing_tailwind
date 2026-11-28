import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Key, Shield, Award, Sparkles, Database
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";
import pythonCode from "./topic7_files/keys_uniqueness_engine.py?raw";

export default function Topic7() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-amber-400 mb-2">
          <Key className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-800/60">
            Relational Integrity · Uniqueness & Identification
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Concept of Keys in RDBMS: Need for Unique Identification
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Why can't databases rely on names or phone numbers for identification? Explore the fundamental
          mathematical need for Keys in relational database design, the hierarchy from Super Keys to
          Candidate Keys, and how keys enforce Entity Integrity.
        </p>
      </header>

      {/* 2. Teacher Guidance */}
      <Teacher
        teacherName="Sukanta Hui"
        experienceYears="27+"
        designation="Senior Computer Science Faculty & Academic Consultant"
        institution="Coder & AccoTax, Barrackpore"
        message="Keys form the backbone of the entire Relational Data Model. In your board exam, questions will ask you to identify Candidate Keys from a table or distinguish between a Super Key and a Candidate Key. Remember the core definition: A Candidate Key is a MINIMAL Super Key. If you add extra columns to a candidate key, it becomes a Super Key, but loses its candidate key status because it is no longer minimal!"
      />

      {/* 3. Key Hierarchy Grid */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 shadow-lg space-y-6">
        <div className="flex items-center space-x-3 text-sky-400">
          <Layers className="w-6 h-6" />
          <h2 className="text-xl font-bold text-white">The Relational Key Hierarchy</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-sky-500/50 transition-all">
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm mb-2">
              <Shield className="w-4 h-4" />
              <span>1. SUPER KEY (Broadest)</span>
            </div>
            <p className="text-white font-semibold">Any Unique Combination</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Any set of one or more attributes that uniquely identifies a tuple.
              Can contain redundant columns (e.g. <code className="text-sky-300">(RollNo, Name)</code>).
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-amber-500/50 transition-all">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm mb-2">
              <Key className="w-4 h-4" />
              <span>2. CANDIDATE KEY (Minimal)</span>
            </div>
            <p className="text-white font-semibold">Minimal Super Key</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              A super key with zero redundant attributes.
              Removing even one attribute breaks the uniqueness guarantee (e.g. <code className="text-amber-300">RollNo</code> or <code className="text-amber-300">Email</code>).
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-2">
              <Award className="w-4 h-4" />
              <span>3. PRIMARY KEY (Chosen)</span>
            </div>
            <p className="text-white font-semibold">The Chosen Candidate Key</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Exactly ONE candidate key selected by the DBA to uniquely identify rows.
              Strictly enforces <code className="text-emerald-300">UNIQUE</code> and <code className="text-emerald-300">NOT NULL</code>.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Real-world Keys Table */}
      <section className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Database className="w-5 h-5 text-emerald-400" />
          <span>Real-World Standard Primary Keys</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse border border-slate-700 font-mono text-xs">
            <thead className="bg-slate-800 text-slate-200">
              <tr>
                <th className="p-3 border border-slate-700">Domain / System</th>
                <th className="p-3 border border-slate-700 text-amber-300">Candidate / Primary Key</th>
                <th className="p-3 border border-slate-700">Why Names Cannot Be Used</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-white">Citizen National Registry</td>
                <td className="p-3 text-amber-300">Aadhaar Number (12 Digits)</td>
                <td className="p-3">Millions share identical first and last names.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Taxation & Finance</td>
                <td className="p-3 text-amber-300">PAN (Permanent Account Number)</td>
                <td className="p-3">Financial transactions require permanent non-repudiation.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Banking System</td>
                <td className="p-3 text-amber-300">Account Number</td>
                <td className="p-3">Customer names and phone numbers change frequently.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Vehicle Registration</td>
                <td className="p-3 text-amber-300">Registration Number / Chassis No</td>
                <td className="p-3">Vehicle ownership transfers between multiple individuals.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Python Simulation */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-sky-400" />
          <span>Interactive Python Simulator: Key Discovery & Minimality Tester</span>
        </h3>
        <p className="text-sm text-slate-300">
          Run this simulation script to automatically discover Super Keys, filter out redundant attributes
          for Candidate Keys, and recommend Primary Keys:
        </p>
        <PythonFileLoader
          filename="keys_uniqueness_engine.py"
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
          title="Concept of Keys - Quick Revision"
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
          Master the concepts of Super Keys, Candidate Keys, and Unique Identification:
        </p>
        <FAQTemplate questions={questions} />
      </section>
    </div>
  );
}
