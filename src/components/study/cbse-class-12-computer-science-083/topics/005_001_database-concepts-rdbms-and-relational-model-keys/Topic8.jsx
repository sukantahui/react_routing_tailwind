import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Key, Shield, Sparkles, Filter, Database
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";
import pythonCode from "./topic8_files/candidate_key_finder_sim.py?raw";

export default function Topic8() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-sky-400 mb-2">
          <Key className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-sky-950/80 px-2.5 py-1 rounded-md border border-sky-800/60">
            Relational Keys · Definition & Minimality
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Candidate Key: Definition, Minimal Superkey Concept & Identification
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Explore why a Candidate Key is formally defined as a Minimal Super Key.
          Learn how to test for minimality by eliminating redundant attributes, discover composite
          candidate keys, and identify candidate keys from authentic CBSE board data tables.
        </p>
      </header>

      {/* 2. Teacher Guidance */}
      <Teacher
        teacherName="Sukanta Hui"
        experienceYears="27+"
        designation="Senior Computer Science Faculty & Academic Consultant"
        institution="Coder & AccoTax, Barrackpore"
        message="The definition of Candidate Key is one of the most frequently asked 1-mark and 2-mark questions in CBSE Computer Science: 'A Candidate Key is a minimal super key that uniquely identifies each tuple in a relation.' If a question asks whether (RollNo, Name) is a candidate key when RollNo is unique, the answer is NO! Because 'Name' is redundant, violating the minimality condition!"
      />

      {/* 3. The Core Concept Grid */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 shadow-lg space-y-6">
        <div className="flex items-center space-x-3 text-emerald-400">
          <Layers className="w-6 h-6" />
          <h2 className="text-xl font-bold text-white">The Two Mandatory Tests for a Candidate Key</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-sky-500/50 transition-all">
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Test 1: UNIQUENESS</span>
            </div>
            <p className="text-white font-semibold text-lg">Unambiguous Row Identification</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              No two tuples in the relation can have identical values for the candidate key attributes.
              It must uniquely differentiate every single row in the database.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-2">
              <Filter className="w-4 h-4" />
              <span>Test 2: MINIMALITY</span>
            </div>
            <p className="text-white font-semibold text-lg">Zero Redundant Attributes</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              No proper subset of the attributes can uniquely identify the tuples.
              Removing even one attribute must destroy the uniqueness guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Super Key vs Candidate Key Walkthrough */}
      <section className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Database className="w-5 h-5 text-amber-400" />
          <span>Super Key vs Candidate Key: The Minimality Difference</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-2">
            <p className="font-bold text-sky-400 text-sm">Super Keys for Relation STUDENT:</p>
            <ul className="text-slate-300 space-y-1 list-disc list-inside">
              <li><code className="text-sky-300 font-bold">RollNo</code> (Unique)</li>
              <li><code className="text-slate-400">(RollNo, Name)</code> (Unique, but Name is redundant)</li>
              <li><code className="text-slate-400">(RollNo, Class)</code> (Unique, but Class is redundant)</li>
              <li><code className="text-slate-400">(RollNo, Name, Marks)</code> (Unique, but 2 redundant attributes)</li>
            </ul>
          </div>

          <div className="bg-slate-900 p-4 rounded-lg border border-emerald-500/40 space-y-2">
            <p className="font-bold text-emerald-400 text-sm">Candidate Keys (Only Minimal Ones):</p>
            <ul className="text-slate-300 space-y-1 list-disc list-inside">
              <li><code className="text-emerald-300 font-bold">RollNo</code> (Minimal - Candidate Key #1)</li>
              <li><code className="text-emerald-300 font-bold">AdmNo</code> (Minimal - Candidate Key #2)</li>
              <li><code className="text-emerald-300 font-bold">AadhaarNo</code> (Minimal - Candidate Key #3)</li>
            </ul>
            <p className="text-xs text-slate-400 font-sans mt-2">
              All Candidate Keys are Super Keys, but Super Keys with redundant columns are NOT Candidate Keys!
            </p>
          </div>
        </div>
      </section>

      {/* 5. Python Simulation */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-sky-400" />
          <span>Interactive Python Simulator: Candidate Key Discovery & Minimality Tester</span>
        </h3>
        <p className="text-sm text-slate-300">
          Run this simulation script to discover all Candidate Keys and inspect rejected non-minimal super keys:
        </p>
        <PythonFileLoader
          filename="candidate_key_finder_sim.py"
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
          title="Candidate Key & Minimality - Quick Revision"
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
          Test your mastery of Candidate Key identification, composite keys, and minimality:
        </p>
        <FAQTemplate questions={questions} />
      </section>
    </div>
  );
}
