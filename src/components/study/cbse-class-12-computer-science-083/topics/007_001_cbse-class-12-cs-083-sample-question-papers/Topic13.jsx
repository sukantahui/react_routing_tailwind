import React from 'react';
import {
  FileText, CheckCircle2, AlertTriangle, HelpCircle,
  Layers, ArrowRight, Database, Server, Key, Shield, Code, Download, PlayCircle, Wrench, Edit3, Trash2, Award, Clock
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

export default function Topic13() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-sky-400 mb-2">
          <Award className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-sky-950/80 px-2.5 py-1 rounded-md border border-sky-800/60">
            Segment 7: Examination Mastery · Topic 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Downloadable Documents: CBSE Class 12 CS 083 Examination Mastery Pack
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          Printable Mock Papers · Model Solutions · Formula & Syntax Quick Cards. Master this essential CBSE examination topic with verified model solutions, marking rubrics, and authentic board exam question sets.
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
          message="Segment 7 is your final examination launchpad. Every student aiming for 95+ in CBSE Class 12 Computer Science (083) must master the section-wise time distribution, understand step-marking rubrics, and practice full-length simulations under strict 3-hour exam conditions."
        />
      </section>

      {/* 3. Core Concepts */}
      <section className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Layers className="w-5 h-5 text-sky-400" />
          <span>Complete Examination Mastery Resource Pack</span>
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
          Curated collection of downloadable PDFs and printable notes containing full-length mock papers, marking schemes, and syllabus cheat sheets.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">Printable full-length 70-mark mock papers 1, 2, and 3 with complete answer keys.</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">Section-by-section time management cheatsheet for the 3-hour examination.</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">Top 100 CBSE Class 12 CS theory and output questions with verified solutions.</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300">Master teacher tips by Sukanta Hui for achieving 100/100 in the CBSE board exam.</span>
          </div>
        </div>
      </section>

      {/* 4. Code & Exam Demonstration */}
      <section className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Code className="w-5 h-5 text-amber-400" />
          <span>Model Examination Solutions & Pattern Analysis</span>
        </h2>
        <p className="text-slate-300 text-sm">
          Examine the official pattern and model solutions tested frequently in CBSE Class 12 examinations:
        </p>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto">
          <pre className="text-emerald-400 font-mono text-sm leading-relaxed">
{`# Master Examination Timing Plan (3 Hours = 180 Minutes):
# 10:15 - 10:30 AM: 15-Minute Reading Time (Analyze Section E case study & plan optional questions)
# 10:30 - 11:00 AM: Section A (18 MCQs - 30 mins)
# 11:00 - 11:30 AM: Section B (7 VSA - 30 mins)
# 11:30 - 12:15 PM: Section C (5 SA - 45 mins)
# 12:15 - 12:55 PM: Section D (2 LA - 40 mins)
# 12:55 - 1:20 PM:  Section E (3 Case Studies - 25 mins)
# 1:20  - 1:30 PM:  Revision & Checking (10 mins)`}
          </pre>
        </div>
      </section>

      {/* 5. CBSE Pitfalls & Common Mistakes */}
      <section className="bg-amber-950/30 border border-amber-800/50 rounded-xl p-6 space-y-3">
        <div className="flex items-center space-x-3 text-amber-400">
          <AlertTriangle className="w-6 h-6" />
          <h2 className="text-lg font-bold">CBSE Board Exam Traps & Examiner Pitfalls</h2>
        </div>
        <p className="text-sm text-amber-200/90 leading-relaxed">
          Avoid getting stuck on 1-mark MCQs; adhere strictly to your 3-hour timing roadmap and verify all function headers and SQL quotes.
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
          filename="CBSE_Class12_CS_Topic13_Revision_Notes.txt"
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
          title="Topic 13: Self-Evaluation & CBSE Board Pattern MCQ Challenge"
        />
      </section>
    </div>
  );
}
