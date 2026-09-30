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
  GitFork,
  ShieldCheck,
  Split,
  Lightbulb,
  Target,
  Heart,
  Compass
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

export default function Topic3() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedClauseCase, setSelectedClauseCase] = useState(0);

  const clauseCases = [
    {
      title: "Adverbial Clause of Concession",
      sentence: "Although the storm raged fiercely, the rescue boats departed.",
      subordinate: "Although the storm raged fiercely",
      subordinateRole: "Subordinate Adverbial Clause (Introduced by 'Although')",
      main: "the rescue boats departed",
      mainRole: "Independent Main Clause (Stands alone as a full sentence)",
      analysisBn: "'Although the storm raged' একা বসলে অপূর্ণ থাকে (Subordinate); কিন্তু 'the rescue boats departed' সম্পূর্ণ অর্থ প্রকাশ করে (Main Clause)।"
    },
    {
      title: "Noun Clause Object",
      sentence: "The mentor proved that consistency overcomes raw talent.",
      subordinate: "that consistency overcomes raw talent",
      subordinateRole: "Subordinate Noun Clause (Direct Object of 'proved')",
      main: "The mentor proved [something]",
      mainRole: "Independent Main Clause Predicate Structure",
      analysisBn: "'that consistency overcomes...' অংশটি 'proved' ক্রিয়ার Object হিসেবে Noun Clause-এর কাজ করছে।"
    },
    {
      title: "Relative Adjective Clause",
      sentence: "The library which houses ancient manuscripts reopened today.",
      subordinate: "which houses ancient manuscripts",
      subordinateRole: "Subordinate Relative Adjective Clause (Modifies 'library')",
      main: "The library reopened today",
      mainRole: "Independent Matrix Clause",
      analysisBn: "'which houses ancient manuscripts' অংশটি 'library'-কে বর্ণনা করায় এটি Subordinate Adjective Clause।"
    }
  ];

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
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Segment 1 · Foundations
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Module 001_004 · Topic 3
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Independent vs Subordinate (Dependent) Clauses
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Master the architectural distinction between self-sufficient matrix clauses and dependent subordinate clauses that form the bedrock of complex sentences.
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
                    ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-teal-400/50 shadow-teal-950/50 ring-2 ring-teal-500/20"
                    : "bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white"
                }`}
              >
                <Languages className={`w-4 h-4 transition-transform duration-300 ${showBengali ? "rotate-180 text-white" : "text-indigo-400"}`} />
                <span>{showBengali ? "বাংলা ব্যাখ্যা সক্রিয় (Active)" : "বাংলা ব্যাখ্যা দেখুন (Toggle বাংলা)"}</span>
              </button>
            </div>
          </div>

          {showBengali && (
            <div className="mt-6 p-4 rounded-2xl bg-teal-950/40 border border-teal-500/30 text-teal-200 text-sm flex items-start gap-3 animate-fade-in">
              <Sparkles className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-teal-300">Principal ও Subordinate Clause গাইড:</p>
                <p className="text-teal-200/90 text-xs mt-1 leading-relaxed">
                  <strong>Principal Clause</strong> সম্পূর্ণ অর্থ প্রকাশের জন্য অন্য কারও মুখাপেক্ষী নয়। কিন্তু <strong>Subordinate Clause</strong> কোনো Conjunction বা Relative Pronoun দ্বারা যুক্ত হয়ে Principal Clause-এর ওপর নির্ভরশীল থাকে।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Clause Dissector */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <GitFork className="w-6 h-6 text-teal-400" />
              <h2 className="text-xl font-bold text-white">Interactive Clause Hierarchy Dissector</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Clause Partitioning</span>
          </div>

          {/* Case Buttons */}
          
        
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
                Independent vs Subordinate Clauses in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                An independent clause is the boss that stands alone. A subordinate clause is the helper that needs the boss.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              Standalone vs Helper
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Independent (Main) Clause = Stands on Its Own</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Makes complete, satisfying sense by itself: "Swadeep deployed the application."
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 Independent = Complete Sentence.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Subordinate (Dependent) Clause = Incomplete Helper</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Starts with a connector (because, although, if, who): "...because the code passed all unit tests." (Needs the main clause!).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 Subordinate = Connective + Subject + Verb.
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
                <span className="text-xs font-bold text-emerald-400 block font-mono">Main Clause</span>
                <p className="text-xs text-slate-300">Can be a full sentence alone</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-blue-400 block font-mono">Noun Clause</span>
                <p className="text-xs text-slate-300">"I know [that he is honest]."</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">Adjective Clause</span>
                <p className="text-xs text-slate-300">"The student [who won the award]..."</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Adverb Clause</span>
                <p className="text-xs text-slate-300">"We started [when the bell rang]."</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "Although the syntax was challenging, Swadeep mastered it because he practiced every day."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় প্রধান ও অপ্রধান ক্লজ:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                Main Clause সম্পূর্ণ স্বাধীনভাবে একা অর্থ প্রকাশ করতে পারে। আর Subordinate Clause 'because', 'although', 'if', 'who' ইত্যাদি দিয়ে শুরু হয় এবং Main Clause ছাড়া একা দাঁড়াতে পারে না।
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
                Independent vs Subordinate Clauses in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                An independent clause is the boss that stands alone. A subordinate clause is the helper that needs the boss.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              Standalone vs Helper
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Independent (Main) Clause = Stands on Its Own</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Makes complete, satisfying sense by itself: "Swadeep deployed the application."
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 Independent = Complete Sentence.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Subordinate (Dependent) Clause = Incomplete Helper</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Starts with a connector (because, although, if, who): "...because the code passed all unit tests." (Needs the main clause!).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 Subordinate = Connective + Subject + Verb.
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
                <span className="text-xs font-bold text-emerald-400 block font-mono">Main Clause</span>
                <p className="text-xs text-slate-300">Can be a full sentence alone</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-blue-400 block font-mono">Noun Clause</span>
                <p className="text-xs text-slate-300">"I know [that he is honest]."</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">Adjective Clause</span>
                <p className="text-xs text-slate-300">"The student [who won the award]..."</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Adverb Clause</span>
                <p className="text-xs text-slate-300">"We started [when the bell rang]."</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "Although the syntax was challenging, Swadeep mastered it because he practiced every day."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় প্রধান ও অপ্রধান ক্লজ:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                Main Clause সম্পূর্ণ স্বাধীনভাবে একা অর্থ প্রকাশ করতে পারে। আর Subordinate Clause 'because', 'although', 'if', 'who' ইত্যাদি দিয়ে শুরু হয় এবং Main Clause ছাড়া একা দাঁড়াতে পারে না।
              </p>
            </div>
          )}
        </div>

<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {clauseCases.map((c, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedClauseCase(idx)}
                className={`p-3.5 rounded-2xl text-left text-xs font-semibold transition border ${
                  selectedClauseCase === idx
                    ? "bg-teal-600 text-white border-teal-400 shadow-lg shadow-teal-950"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="text-[10px] uppercase font-mono opacity-75">Case #{idx + 1}</div>
                <div className="mt-1 font-bold truncate">{c.title}</div>
              </button>
            ))}
          </div>

          {/* Active Partition Breakdown */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-teal-500/30 space-y-5 animate-fade-in">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider block mb-1">Full Complex Sentence</span>
              <p className="font-mono text-sm text-white font-bold">"{clauseCases[selectedClauseCase].sentence}"</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Independent Main Clause */}
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-[11px] font-bold uppercase font-mono">
                  Independent (Main) Clause
                </span>
                <p className="font-mono text-sm text-white pt-2 font-semibold">
                  "{clauseCases[selectedClauseCase].main}"
                </p>
                <p className="text-xs text-emerald-200/80">{clauseCases[selectedClauseCase].mainRole}</p>
              </div>

              {/* Dependent Subordinate Clause */}
              <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-[11px] font-bold uppercase font-mono">
                  Dependent (Subordinate) Clause
                </span>
                <p className="font-mono text-sm text-white pt-2 font-semibold">
                  "{clauseCases[selectedClauseCase].subordinate}"
                </p>
                <p className="text-xs text-amber-200/80">{clauseCases[selectedClauseCase].subordinateRole}</p>
              </div>
            </div>

            {showBengali && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-teal-300 leading-relaxed">
                <strong>বাংলা বিশ্লেষণ:</strong> {clauseCases[selectedClauseCase].analysisBn}
              </div>
            )}
          </div>
        </div>

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Topic 3 Diagnostic Assessment (25 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 3: Independent vs Subordinate Clauses Notes"
          />

          <WordDictionary />

          <Teacher
            note="Never leave a subordinate clause dangling without its main clause in formal writing. That is the secret to eliminating sentence fragments! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_004_phrases-vs-clauses-and-sentence-transformation-basics/2"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 2 (What is a Clause)</span>
          </a>

          <a
            href="/english-grammar/topic/001_004_phrases-vs-clauses-and-sentence-transformation-basics/4"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 4 (Transformation Basics)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
