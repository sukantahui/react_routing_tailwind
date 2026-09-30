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
  Award,
  ShieldCheck,
  GraduationCap,
  Lightbulb,
  Target,
  Heart,
  Compass
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

export default function Topic8() {
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
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Segment 1 · Foundations
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Module 001_003 · Capstone Topic 8
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Module 001_003 Capstone Self-Assessment & Synthesis
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Test your mastery across all 5 sentence types (Assertive, Interrogative, Imperative, Exclamatory, Optative), polarity invariants, intonation tags, and syntactic transformations.
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
                    ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-white border-amber-400/50 shadow-amber-950/50 ring-2 ring-amber-500/20"
                    : "bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white"
                }`}
              >
                <Languages className={`w-4 h-4 transition-transform duration-300 ${showBengali ? "rotate-180 text-white" : "text-indigo-400"}`} />
                <span>{showBengali ? "বাংলা ব্যাখ্যা সক্রিয় (Active)" : "বাংলা ব্যাখ্যা দেখুন (Toggle বাংলা)"}</span>
              </button>
            </div>
          </div>

          {showBengali && (
            <div className="mt-6 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-sm flex items-start gap-3 animate-fade-in">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-300">মডিউল মূল্যায়ন ও সারসংক্ষেপ গাইড:</p>
                <p className="text-amber-200/90 text-xs mt-1 leading-relaxed">
                  এই চূড়ান্ত মূল্যায়নের মাধ্যমে আপনি বাক্যের ৫টি প্রকার, প্রশ্ন গঠনের নিয়ম (Inversion), Question Tag, এবং রূপান্তরের সামগ্রিক দক্ষতা যাচাই করতে পারবেন।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 5-Type Summary Matrix */}
        
        
        {/* ========================================================================= */}
        {/* IN VERY SIMPLE LANGUAGE: CORE INTUITIVE BREAKDOWN                         */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Beginner Friendly · Core Intuition</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Communicative Mastery in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                The grand synthesis of all 5 functional sentence types and their communicative power.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              The Full Spectrum
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. The 5 Tools in Your Toolbox</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Assertive (share facts), Interrogative (gather info), Imperative (drive action), Exclamatory (share passion), Optative (share blessings).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 5 Voices for Every Situation.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Punctuation & Polarity Invariants</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Statements (.) | Questions (?) | Commands (.) | Exclamations (!) | Wishes (!).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 Immaculate Punctuation & Polarity Control.
              </div>
            </div>
          </div>

          {/* 4 Building Blocks Matrix */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              Key Pillars at a Glance
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-blue-400 block font-mono">Fact Sharing</span>
                <p className="text-xs text-slate-300">Assertive statements with clean periods</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-indigo-400 block font-mono">Inquiry & Tags</span>
                <p className="text-xs text-slate-300">Wh- questions, inversions, and tags</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block font-mono">Direct Directives</span>
                <p className="text-xs text-slate-300">Courteous and clear imperative instructions</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">Emotion & Blessing</span>
                <p className="text-xs text-slate-300">Exclamatory awe and optative prayers</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "Mastering these 5 modes transforms you from a basic speaker into an articulate communicator."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় ৫টি ভাবের সারাংশ:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                এই মডিউলের মাধ্যমে আপনি ইংরেজি যোগাযোগের ৫টি মৌলিক সুর—তথ্য প্রদান, প্রশ্ন জিজ্ঞাসা, নির্দেশ প্রদান, বিস্ময় প্রকাশ এবং প্রার্থনা করা—সম্পূর্ণরূপে আয়ত্ত করেছেন।
              </p>
            </div>
          )}
        </div>

{/* ========================================================================= */}
        {/* IN VERY SIMPLE LANGUAGE: CORE INTUITIVE BREAKDOWN                         */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Beginner Friendly · Core Intuition</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Communicative Mastery in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                The grand synthesis of all 5 functional sentence types and their communicative power.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              The Full Spectrum
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. The 5 Tools in Your Toolbox</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Assertive (share facts), Interrogative (gather info), Imperative (drive action), Exclamatory (share passion), Optative (share blessings).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 5 Voices for Every Situation.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Punctuation & Polarity Invariants</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Statements (.) | Questions (?) | Commands (.) | Exclamations (!) | Wishes (!).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 Immaculate Punctuation & Polarity Control.
              </div>
            </div>
          </div>

          {/* 4 Building Blocks Matrix */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              Key Pillars at a Glance
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-blue-400 block font-mono">Fact Sharing</span>
                <p className="text-xs text-slate-300">Assertive statements with clean periods</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-indigo-400 block font-mono">Inquiry & Tags</span>
                <p className="text-xs text-slate-300">Wh- questions, inversions, and tags</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block font-mono">Direct Directives</span>
                <p className="text-xs text-slate-300">Courteous and clear imperative instructions</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">Emotion & Blessing</span>
                <p className="text-xs text-slate-300">Exclamatory awe and optative prayers</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "Mastering these 5 modes transforms you from a basic speaker into an articulate communicator."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় ৫টি ভাবের সারাংশ:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                এই মডিউলের মাধ্যমে আপনি ইংরেজি যোগাযোগের ৫টি মৌলিক সুর—তথ্য প্রদান, প্রশ্ন জিজ্ঞাসা, নির্দেশ প্রদান, বিস্ময় প্রকাশ এবং প্রার্থনা করা—সম্পূর্ণরূপে আয়ত্ত করেছেন।
              </p>
            </div>
          )}
        </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { name: "Assertive", icon: "Statement", rule: "Fact / Opinion (.)", color: "border-blue-500/30 bg-blue-950/20 text-blue-300" },
            { name: "Interrogative", icon: "Question", rule: "Inversion / Wh- (?)", color: "border-indigo-500/30 bg-indigo-950/20 text-indigo-300" },
            { name: "Imperative", icon: "Command", rule: "Base V1 / (You) (.)", color: "border-emerald-500/30 bg-emerald-950/20 text-emerald-300" },
            { name: "Exclamatory", icon: "Emotion", rule: "What a / How (!)", color: "border-purple-500/30 bg-purple-950/20 text-purple-300" },
            { name: "Optative", icon: "Prayer", rule: "May + S + V1 (!)", color: "border-amber-500/30 bg-amber-950/20 text-amber-300" }
          ].map((item, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border ${item.color} space-y-1 text-center`}>
              <div className="text-xs font-bold uppercase tracking-wider">{item.name}</div>
              <div className="text-[11px] opacity-80 font-mono">{item.rule}</div>
            </div>
          ))}
        </div>

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Module 001_003 Capstone Mastery Assessment (30 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Module 001_003 Capstone Summary Notes"
          />

          <WordDictionary />

          <Teacher
            note="Hearty congratulations on mastering sentence classifications and moods! Next, we explore the boundary between Phrases and Clauses in Module 001_004. — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_003_classification-of-sentences-by-purpose-and-mood/7"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 7 (Transformation Workbench)</span>
          </a>

          <a
            href="/english-grammar/topic/001_004_phrases-vs-clauses-and-sentence-transformation-basics/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-950 transition"
          >
            <span>Advance to Next Module: 001_004 (Phrases & Clauses)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
