import React, { useState } from 'react';
import { 
  ShieldAlert, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Code, Zap, Layers, RefreshCw, AlertOctagon, Check
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

const ProjectMythBusterWorkbench = () => {
  const [selectedStatement, setSelectedStatement] = useState(0);

  const statements = [
    {
      id: 0,
      claim: "Projects are perpetual and continue indefinitely without an end date.",
      isValid: false,
      verdict: "FALSE (Invalid Characteristic)",
      explanation: "Projects are strictly temporary endeavors with defined start and completion dates. Continuous, indefinite activities are classified as ongoing business operations.",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30"
    },
    {
      id: 1,
      claim: "Projects have distinct boundaries and defined scope limits.",
      isValid: true,
      verdict: "TRUE (Valid Characteristic)",
      explanation: "Every project has distinct boundaries that specify what is included (in-scope) and what is excluded (out-of-scope), guarding against scope creep.",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30"
    },
    {
      id: 2,
      claim: "Projects have unlimited, infinite funding and human resources.",
      isValid: false,
      verdict: "FALSE (Invalid Characteristic)",
      explanation: "Real-world projects operate under strictly finite financial budgets, fixed developer team size, and rigid calendar deadlines.",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30"
    },
    {
      id: 3,
      claim: "Projects produce a unique deliverable (product, service, or result).",
      isValid: true,
      verdict: "TRUE (Valid Characteristic)",
      explanation: "A project produces a customized, non-repetitive result tailored to specific client or organizational requirements.",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30"
    }
  ];

  const curr = statements[selectedStatement];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-2">
            <AlertOctagon className="w-3.5 h-3.5" /> Project MythBuster &amp; Invalidation Lab
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Valid vs Invalid Project Characteristics
          </h2>
        </div>

        <div className="flex gap-2">
          {statements.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setSelectedStatement(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedStatement === idx
                  ? 'bg-rose-500 text-slate-950 font-bold shadow-md shadow-rose-950'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              Claim {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Claim Evaluation Card */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Statement / Board Question Claim:
          </span>
          <p className="text-base font-semibold text-white leading-relaxed">
            &ldquo;{curr.claim}&rdquo;
          </p>
        </div>

        <div className={`p-4 rounded-xl border flex items-start gap-3 ${curr.bg} ${curr.border}`}>
          {curr.isValid ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
          )}
          <div className="space-y-1">
            <strong className={`text-sm font-bold block ${curr.color}`}>{curr.verdict}</strong>
            <p className="text-xs text-slate-300 leading-relaxed">{curr.explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic4 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 005_001 • Topic 4
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What is NOT a Characteristic of a Project (e.g. Projects Always Have Boundaries, Projects are NOT Perpetual)
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Identify common misconceptions in CBSE board examination questions, understand why software projects must have distinct boundaries, and learn how to recognize non-project operational tasks.
          </p>
        </div>

        {/* MythBuster Workbench */}
        <ProjectMythBusterWorkbench />

        {/* 3 Red Flag Misconceptions */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <div className="text-rose-400 font-bold text-sm flex items-center gap-2">
              <XCircle className="w-4 h-4" /> 1. Perpetual Nature
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Projects always end. If an activity continues endlessly without a closing date, it is an <strong>ongoing operation</strong>.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <div className="text-rose-400 font-bold text-sm flex items-center gap-2">
              <XCircle className="w-4 h-4" /> 2. Boundary-less Scope
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Projects always have fixed boundaries. Lack of boundaries triggers <strong>Scope Creep</strong> and leads to project failure.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <div className="text-rose-400 font-bold text-sm flex items-center gap-2">
              <XCircle className="w-4 h-4" /> 3. Infinite Resources
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Projects never have infinite funds or time. Every project operates within a finite, pre-approved resource envelope.
            </p>
          </div>
        </div>

        {/* Teacher Sukanta Hui Component */}
        <Teacher
          quote="CBSE Class XII IT objective questions love testing you with: 'Which of the following is NOT a project characteristic?' Look for options containing 'perpetual', 'unlimited resources', or 'no boundaries' — those are the classic false traps!"
        />

        {/* CBSE Exam FAQs */}
        <FAQTemplate questions={questions} />

        {/* Printable Revision Notes */}
        <PlainTextPrint
          title="CBSE Class 12 IT (802) • What is NOT a Project Characteristic"
          content={noteText}
        />
      </div>
    </div>
  );
};

export default Topic4;
