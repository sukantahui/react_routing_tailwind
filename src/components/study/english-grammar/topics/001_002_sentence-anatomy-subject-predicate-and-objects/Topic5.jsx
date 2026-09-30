import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Languages,
  Zap,
  RotateCcw,
  Check,
  Layers,
  Repeat,
  ShieldAlert,
  Send,
  MessageSquare
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

export default function Topic5() {
  const [showBengali, setShowBengali] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.4s ease-out forwards;
          }
        `}
      </style>

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header with Bilingual Switcher */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Segment 1 · Foundations
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Module 001_002 · Topic 5
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Ditransitive Positioning: 'TO' vs 'FOR' & Non-Dative Invariants
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Why some ditransitive verbs demand 'to' while others take 'for', and why Latinate verbs like <em>explain</em> and <em>suggest</em> forbid the pure SVOO pattern.
              </p>
            </div>

            {/* Language Switcher */}
            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-indigo-400" />
                Language Explanation
              </span>
              <button
                type="button"
                onClick={() => setShowBengali(!showBengali)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 border shadow-lg ${
                  showBengali
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400/50 shadow-emerald-950/50 ring-2 ring-emerald-500/20"
                    : "bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white"
                }`}
              >
                <Languages className={`w-4 h-4 transition-transform duration-300 ${showBengali ? "rotate-180 text-white" : "text-indigo-400"}`} />
                <span>{showBengali ? "বাংলা ব্যাখ্যা সক্রিয় (Active)" : "বাংলা ব্যাখ্যা দেখুন (Toggle বাংলা)"}</span>
              </button>
            </div>
          </div>

          {showBengali && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-sm flex items-start gap-3 animate-fade-in">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-300">বাংলা মাধ্যম শিক্ষার্থীদের জন্য বিশেষ নির্দেশিকা:</p>
                <p className="text-emerald-200/90 text-xs mt-1 leading-relaxed">
                  হস্তান্তরসূচক ক্রিয়ায় (give, lend) 'to' বসে এবং তৈরি বা সেবা প্রদানের ক্রিয়ায় (buy, cook) 'for' বসে। সবচেয়ে বড় পরীক্ষার ফাঁদ হলো <em>explain, suggest, describe</em> — এদের পর কখনো 'He explained me' বলা যায় না; 'He explained to me' বলা বাধ্যতামূলক।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* The 'Explain / Suggest' High-Frequency Trap Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-rose-950/20 border border-rose-500/40 space-y-4">
          <div className="flex items-center gap-2.5 text-rose-400 font-bold font-mono text-sm uppercase">
            <ShieldAlert className="w-5 h-5" />
            <span>High-Frequency Exam Trap: Non-Dative Latinate Verbs</span>
          </div>
          <p className="text-slate-200 text-sm leading-relaxed">
            In competitive exams (SSC CGL, WBCS, Banking), examiners frequently insert ungrammatical SVOO structures using <strong>explain, suggest, describe, announce, introduce, confess</strong>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/60 text-rose-300 space-y-1">
              <span className="font-bold text-rose-400 block">❌ INCORRECT (Common False Habit):</span>
              <p>"The mentor explained me the complex algorithm."</p>
              <p>"She suggested him a new career roadmap."</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/60 text-emerald-300 space-y-1">
              <span className="font-bold text-emerald-400 block">✔️ CORRECT (Standard English Syntax):</span>
              <p>"The mentor explained the complex algorithm <strong>to me</strong>."</p>
              <p>"She suggested a new career roadmap <strong>to him</strong>."</p>
            </div>
          </div>
        </div>

        {/* Preposition Selection Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-blue-500/30 space-y-3">
            <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-xs font-bold font-mono">
              Verbs taking 'TO' (Transmission)
            </span>
            <h3 className="text-lg font-bold text-white">Direct Handover / Communication</h3>
            <p className="text-slate-300 text-xs">
              give, send, lend, pass, pay, promise, show, teach, tell, write, read.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-blue-200">
              "Swadeep sent the project files <strong>to the supervisor</strong>."
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-amber-500/30 space-y-3">
            <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold font-mono">
              Verbs taking 'FOR' (Beneficiary)
            </span>
            <h3 className="text-lg font-bold text-white">Creation / Acquisition for Someone</h3>
            <p className="text-slate-300 text-xs">
              buy, cook, bake, build, choose, find, fetch, order, prepare, make.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-200">
              "Tuhina prepared a summary report <strong>for the cohort</strong>."
            </div>
          </div>
        </div>

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Topic 5 Diagnostic Assessment (10 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 5: Ditransitive Positioning & Invariants — Quick Notes"
          />

          <WordDictionary />

          <Teacher
            note="Never say 'He explained me'! Say 'He explained it to me'. This single rule will save you marks in every competitive examination. — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_002_sentence-anatomy-subject-predicate-and-objects/4"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 4 (Direct vs Indirect Objects)</span>
          </a>

          <a
            href="/english-grammar/topic/001_002_sentence-anatomy-subject-predicate-and-objects/6"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 6 (Subject Complements)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
