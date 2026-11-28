import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Database, Key, Lock, RefreshCw, Zap
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";
import pythonCode from "./topic1_files/dbms_advantages_acid_sim.py?raw";

export default function Topic1() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-emerald-400 mb-2">
          <ShieldCheck className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/60">
            Unit III: Database Management · Advantages & Architecture
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Key Advantages of DBMS: Sharing, Integrity, Security, Concurrency & Recovery
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Discover why every modern enterprise from Google to State Bank of India relies on a DBMS.
          Master the core advantages tested in CBSE board exams: Data Sharing, Centralized Integrity Constraints,
          Fine-Grained Security, Concurrency Control, and the ACID transactional model.
        </p>
      </header>

      {/* 2. Teacher Guidance */}
      <Teacher
        teacherName="Sukanta Hui"
        experienceYears="27+"
        designation="Senior Computer Science Faculty & Academic Consultant"
        institution="Coder & AccoTax, Barrackpore"
        message="Questions on DBMS advantages appear in both 1-mark MCQs and 3-mark theory questions. The examiners specifically look for the five key points: Controlled Redundancy, Data Sharing, Data Integrity, Security, and Crash Recovery. When answering transaction questions, write the full expansion and meaning of ACID: Atomicity, Consistency, Isolation, and Durability!"
      />

      {/* 3. The Five Pillars of DBMS Advantages */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 shadow-lg space-y-6">
        <div className="flex items-center space-x-3 text-sky-400">
          <Layers className="w-6 h-6" />
          <h2 className="text-xl font-bold text-white">The Five Foundational Pillars of Modern DBMS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-2">
              <RefreshCw className="w-4 h-4" />
              <span>1. Controlled Redundancy</span>
            </div>
            <p className="text-white font-semibold">Single Source of Truth</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Consolidates duplicate departmental files into a unified structure, eliminating redundant storage and preventing inconsistent update anomalies.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-sky-500/50 transition-all">
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm mb-2">
              <Database className="w-4 h-4" />
              <span>2. Data Sharing</span>
            </div>
            <p className="text-white font-semibold">Concurrent Multi-App Access</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Multiple users and applications can query and manipulate the centralized data simultaneously without duplicating private files.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-amber-500/50 transition-all">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm mb-2">
              <Key className="w-4 h-4" />
              <span>3. Data Integrity</span>
            </div>
            <p className="text-white font-semibold">Engine-Level Constraints</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Enforces business rules (PRIMARY KEY, NOT NULL, UNIQUE, CHECK, FOREIGN KEY) centrally, automatically rejecting invalid or corrupt entries.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-purple-500/50 transition-all">
            <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm mb-2">
              <Lock className="w-4 h-4" />
              <span>4. Data Security</span>
            </div>
            <p className="text-white font-semibold">Granular Access Control</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Provides fine-grained authorization using GRANT/REVOKE commands and SQL Views to hide sensitive columns (e.g. salary, password hashes).
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-indigo-500/50 transition-all md:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm mb-2">
              <Zap className="w-4 h-4" />
              <span>5. Concurrency & Crash Recovery (ACID)</span>
            </div>
            <p className="text-white font-semibold">Resilience & Transaction Safety</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Guarantees ACID transaction properties. Automated Write-Ahead Logging (WAL) ensures uncommitted writes are rolled back and committed data survives system crashes.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Deep Dive: The ACID Transaction Model */}
      <section className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>The ACID Transaction Blueprint in CBSE Computer Science</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/90 p-4 rounded-lg border border-slate-700">
            <p className="font-bold text-emerald-400 text-sm">A - Atomicity ('All or Nothing')</p>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              A transaction is an indivisible unit of work. Either all operations execute successfully, or if any failure occurs, all previous steps are completely rolled back.
            </p>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-lg border border-slate-700">
            <p className="font-bold text-sky-400 text-sm">C - Consistency ('Rules Preserved')</p>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Execution of a transaction must preserve database consistency; the database transitions from one valid state to another without violating any integrity constraints.
            </p>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-lg border border-slate-700">
            <p className="font-bold text-amber-400 text-sm">I - Isolation ('Independent Execution')</p>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Multiple transactions running concurrently are executed as if they were running sequentially. Intermediate uncommitted changes remain invisible to other users.
            </p>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-lg border border-slate-700">
            <p className="font-bold text-purple-400 text-sm">D - Durability ('Permanent Persistence')</p>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Once a transaction commits, its modifications are permanently recorded in non-volatile storage and will never be lost, even during a sudden power outage.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Python Simulation */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-sky-400" />
          <span>Interactive Python Simulator: Integrity Constraints & ACID Rollback</span>
        </h3>
        <p className="text-sm text-slate-300">
          Run this simulation script to experience how a DBMS rejects invalid data and rolls back crashed transactions:
        </p>
        <PythonFileLoader
          filename="dbms_advantages_acid_sim.py"
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
          title="Key Advantages of DBMS - Quick Revision"
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
          Test your mastery of DBMS advantages, ACID properties, and data independence:
        </p>
        <FAQTemplate questions={questions} />
      </section>
    </div>
  );
}
