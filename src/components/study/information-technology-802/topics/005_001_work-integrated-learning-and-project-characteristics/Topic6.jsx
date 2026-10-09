import React, { useState } from 'react';
import { 
  BookOpen, Users, Database, Sparkles, CheckCircle2, 
  AlertTriangle, HelpCircle, ArrowRight, ShieldCheck, 
  Terminal, Code, Zap, Layers, RefreshCw, School, Check
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

const SchoolCapstoneCaseStudy = () => {
  const [activeProject, setActiveProject] = useState('library');

  const capstones = [
    {
      id: 'library',
      title: '1. School Library Management System',
      badge: 'Database & Java Swing GUI',
      color: 'text-sky-400',
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/30',
      problem: 'Manual card catalogues cause book loss, delays in book return processing, and inaccurate overdue fine calculations.',
      solution: 'A Java Swing GUI connected to MySQL database with automated issue/return tracking and fine computation.',
      tables: ['BOOKS (BookID, Title, Author, Status)', 'MEMBERS (MemberID, Name, Class)', 'ISSUE_RECORD (IssueID, BookID, MemberID, IssueDate, ReturnDate)'],
      sqlFeature: 'Equi-Join between BOOKS and ISSUE_RECORD to display overdue titles.'
    },
    {
      id: 'fee',
      title: '2. Fee Collection & Receipt Engine',
      badge: 'Financial Reporting',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      problem: 'Long queues on fee collection days and human error in tallying monthly cash receipts manually.',
      solution: 'Automated receipt generation system with instant student dues lookup and end-of-day aggregate accounting.',
      tables: ['STUDENT (RollNo, Name, Class, Section)', 'FEE_STRUCTURE (Class, Term, TotalAmount)', 'PAYMENTS (ReceiptNo, RollNo, PaidDate, AmountPaid)'],
      sqlFeature: '`SUM(AmountPaid)` and `GROUP BY Class` to produce instant financial summaries.'
    },
    {
      id: 'marks',
      title: '3. Academic Report Card Generator',
      badge: 'Student Analytics',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      problem: 'Compiling exam marks from different subject teachers takes weeks and leads to transcription errors.',
      solution: 'A centralized portal where teachers input marks, generating formatted PDF report cards automatically.',
      tables: ['STUDENT (AdmNo, RollNo, Name)', 'EXAM_MARKS (AdmNo, SubjectCode, MarksObtained, MaxMarks)'],
      sqlFeature: 'Aggregate `AVG(MarksObtained)` and `ORDER BY TotalMarks DESC` for class ranking.'
    }
  ];

  const current = capstones.find(c => c.id === activeProject) || capstones[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
            <School className="w-3.5 h-3.5" /> Capstone Case Study Blueprint
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Real-World School IT Applications
          </h2>
        </div>

        <div className="flex gap-2">
          {capstones.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveProject(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeProject === c.id
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-950'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {c.title.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Case Study Details */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className={`text-base font-bold ${current.color}`}>{current.title}</h3>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
            {current.badge}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <strong className="text-rose-400 font-bold block">🚨 Operational Problem:</strong>
            <p className="text-slate-300 leading-relaxed">{current.problem}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <strong className="text-emerald-400 font-bold block">💡 Software Solution:</strong>
            <p className="text-slate-300 leading-relaxed">{current.solution}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <strong className="text-amber-400 text-xs font-bold block uppercase tracking-wider">
            Relational MySQL Schema &amp; Key Queries:
          </strong>
          <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
            {current.tables.map((t, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-cyan-300 font-mono">
            Key SQL Operation: {current.sqlFeature}
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic6 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 005_001 • Topic 6
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Role of Project Management in School IT Applications & Capstone Projects
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Discover how standard project management techniques ensure successful delivery of school IT capstone projects (Library Systems, Fee Portals, and Report Card Generators) connecting Java GUI interfaces with relational MySQL backends.
          </p>
        </div>

        {/* Case Study Explorer */}
        <SchoolCapstoneCaseStudy />

        {/* 4 Pillars of Capstone Success */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="text-sky-400 font-bold text-sm">1. WBS Planning</div>
            <p className="text-xs text-slate-300 leading-relaxed">Break down system features into frontend Swing forms and backend SQL tables.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="text-emerald-400 font-bold text-sm">2. Milestone Tracking</div>
            <p className="text-xs text-slate-300 leading-relaxed">Set weekly deadlines for SRS, database creation, coding, and testing.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="text-amber-400 font-bold text-sm">3. User Feedback</div>
            <p className="text-xs text-slate-300 leading-relaxed">Demonstrate prototypes to school librarians and clerks for early validation.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="text-purple-400 font-bold text-sm">4. Documentation</div>
            <p className="text-xs text-slate-300 leading-relaxed">Prepare thorough project reports with ER diagrams, source code, and sample test outputs.</p>
          </div>
        </div>

        {/* Teacher Sukanta Hui Component */}
        <Teacher
          quote="For your CBSE Class XII IT 802 practical examination project submission, ensure your project report contains all required sections: Problem Statement, Feasibility Analysis, SRS Document, ER Diagram with Keys, DDL CREATE TABLE scripts, Java source code, and sample output screenshots!"
        />

        {/* CBSE Exam FAQs */}
        <FAQTemplate questions={questions} />

        {/* Printable Revision Notes */}
        <PlainTextPrint
          title="CBSE Class 12 IT (802) • Role of Project Management in School IT"
          content={noteText}
        />
      </div>
    </div>
  );
};

export default Topic6;
