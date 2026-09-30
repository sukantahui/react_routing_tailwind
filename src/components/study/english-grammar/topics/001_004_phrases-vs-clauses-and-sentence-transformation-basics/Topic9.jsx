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
  Trophy,
  Award,
  ShieldCheck,
  GraduationCap
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

export default function Topic9() {
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
                  Module 001_004 · Capstone Topic 9
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Module 001_004 & Segment 1 Grand Capstone Assessment
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Validate your comprehensive mastery of Phrases, Finite Clauses, Matrix vs Subordinate clauses, and the complete repertoire of Sentence Transformations.
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
                <p className="font-semibold text-emerald-300">সেগমেন্ট ১ চূড়ান্ত মূল্যায়ন ও সাফল্য:</p>
                <p className="text-emerald-200/90 text-xs mt-1 leading-relaxed">
                  অভিনন্দন! আপনি সেগমেন্ট ১-এর ৪টি মডিউল এবং মোট ৩৮টি টপিক সম্পূর্ণ করার দ্বারপ্রান্তে। এই চূড়ান্ত মূল্যায়নের মাধ্যমে আপনার বাক্য বিশ্লেষণ এবং রূপান্তরের সামগ্রিক দক্ষতা যাচাই করুন।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 4-Module Segment 1 Mastery Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { mod: "001_001", title: "Parts of Speech", desc: "8 Functional Word Classes (Open vs Closed)", status: "Mastered" },
            { mod: "001_002", title: "Sentence Anatomy", desc: "Subject, Predicate, Objects & 7 Clause Patterns", status: "Mastered" },
            { mod: "001_003", title: "Sentence Classification", desc: "5 Communicative Classes & Question Tags", status: "Mastered" },
            { mod: "001_004", title: "Phrases & Transformation", desc: "Phrase vs Clause & Invariant Transformations", status: "Capstone" }
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-3xl bg-slate-900/80 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                  {item.mod}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Module 001_004 & Segment 1 Grand Capstone Assessment (15 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Segment 1 Grand Mastery Summary Notes"
          />

          <WordDictionary />

          <Teacher
            note="Heartiest congratulations on completing Segment 1! You now possess a rock-solid foundation in English Sentence Architecture. Prepare for Segment 2: The Nominal Domain! — Sukanta Hui"
          />
        </div>

        {/* Next Segment Unlocked Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Segment 1 Complete · Next Segment Unlocked</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Segment 2: Nominal Domain — Nouns, Pronouns, Cases & Articles
            </h3>
            <p className="text-slate-400 text-xs max-w-xl">
              Proceed to Module 002_001 to master Noun Classification, Mass Noun Traps (Information, Furniture), Pluralia Tantum, and Foreign Plural formations.
            </p>
          </div>

          <a
            href="/english-grammar/topic/002_001_noun-classification-number-and-irregular-plurals/0"
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/50 hover:scale-105 shrink-0"
          >
            <span>Begin Segment 2 (Module 002_001)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_004_phrases-vs-clauses-and-sentence-transformation-basics/8"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 8 (Classroom Drills)</span>
          </a>

          <a
            href="/english-grammar/topic/002_001_noun-classification-number-and-irregular-plurals/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Advance to Segment 2</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
