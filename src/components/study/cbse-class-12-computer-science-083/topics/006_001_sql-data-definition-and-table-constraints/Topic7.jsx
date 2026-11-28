import React from 'react';
import {
  FileText, CheckCircle2, AlertTriangle, HelpCircle,
  Layers, ArrowRight, Database, Server, Key, Shield, Code, Download, PlayCircle, Wrench, Edit3, Trash2
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

export default function Topic7() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-sky-400 mb-2">
          <Database className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-sky-950/80 px-2.5 py-1 rounded-md border border-sky-800/60">
            Unit III: Database Management (20 Marks) · Topic 7
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Data Integrity Constraints: NOT NULL, UNIQUE, CHECK, and DEFAULT
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Preventing Nulls, Enforcing Uniqueness, Value Boundaries & Default Values. Master this essential CBSE examination topic with rigorous syntax breakdowns, real-world examples, and step-by-step marking schemes.
        </p>
      </header>

      {/* 2. Teacher Guidance Card */}
      <Teacher
        teacherName="Sukanta Hui"
        experienceYears="27+"
        designation="Senior Computer Science Faculty & Academic Consultant"
        institution="Coder & AccoTax, Barrackpore"
        message="In Unit III SQL DDL questions, examiners check exact syntax keywords like 'PRIMARY KEY', 'REFERENCES', 'MODIFY', and 'ADD'. Remember that DDL commands auto-commit immediately. When writing CREATE TABLE statements, never omit the semicolon and ensure table-level constraints for composite keys follow all column definitions!"
      />

      {/* 3. Deep Dive Content Section */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 shadow-lg space-y-6">
        <div className="flex items-center space-x-3 text-emerald-400">
          <Layers className="w-6 h-6" />
          <h2 className="text-xl font-bold text-white">Comprehensive Technical Guide</h2>
        </div>
        <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line bg-slate-950/60 p-6 rounded-xl border border-slate-800 font-mono">
          {noteText}
        </div>
      </section>

      {/* 4. Quick Printable Reference */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-indigo-400" />
          <span>Quick Revision & Printable Documentation</span>
        </h3>
        <PlainTextPrint
          title="Data Integrity Constraints: NOT NULL, UNIQUE, CHECK, and DEFAULT - Quick Reference"
          content={noteText}
        />
      </section>

      {/* 5. 25 Practice Assessment Questions */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 mb-2">
          <HelpCircle className="w-6 h-6" />
          <h3 className="text-xl font-bold text-white">25 Practice Questions & Examination Solutions</h3>
        </div>
        <p className="text-sm text-slate-300">
          Reinforce your understanding of Data Integrity Constraints: NOT NULL, UNIQUE, CHECK, and DEFAULT with 25 authentic CBSE examination questions:
        </p>
        <FAQTemplate questions={questions} />
      </section>
    </div>
  );
}
