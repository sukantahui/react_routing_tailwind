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
  ArrowRightLeft,
  ShieldCheck,
  Sliders,
  Lightbulb,
  Target,
  Heart,
  Compass
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

export default function Topic7() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedTransformationIndex, setSelectedTransformationIndex] = useState(0);

  const transformations = [
    {
      category: "Assertive ↔ Interrogative",
      original: "Everyone respects an honest teacher.",
      transformed: "Who does not respect an honest teacher?",
      rule: "Universal positive statement ('Everyone') converts to a negative rhetorical question ('Who does not...?').",
      ruleBn: "'Everyone'-যুক্ত সাধারণ বিবৃতিকে অলংকারিক প্রশ্নবোধকে রূপান্তরের সময় 'Who does not...?' ব্যবহৃত হয়।",
      formula: "Everyone + V1/s --> Who does not + V1...?"
    },
    {
      category: "Exclamatory ↔ Assertive",
      original: "How wonderfully the choir performed tonight!",
      transformed: "The choir performed very wonderfully tonight.",
      rule: "Exclamatory clause introduced by 'How + Adverb' converts into an assertive clause with 'very + adverb'.",
      ruleBn: "'How + Adverb' যুক্ত বিস্ময়সূচক বাক্যকে 'very + adverb' সহ সাধারণ বর্ণনামূলক বাক্যে পরিবর্তন করা হয়।",
      formula: "How + Adj/Adv + S + V! --> S + V + very + Adj/Adv."
    },
    {
      category: "Affirmative ↔ Negative",
      original: "Knowledge is always invaluable.",
      transformed: "Knowledge is never worthless.",
      rule: "Convert 'always' to 'never' and replace the core adjective with its antonym ('invaluable' -> 'worthless') without altering meaning.",
      ruleBn: "অর্থ অক্ষুণ্ণ রাখতে 'always'-এর স্থলে 'never' এবং মূল শব্দের বিপরীত শব্দ (Antonym) বসাতে হয়।",
      formula: "Always + Positive --> Never + Antonym"
    },
    {
      category: "Optative ↔ Assertive",
      original: "May the truth triumph!",
      transformed: "I pray that the truth may triumph.",
      rule: "Optative invocation starting with 'May' transforms into an assertive matrix statement with 'I pray / wish that...'.",
      ruleBn: "'May' দিয়ে শুরু হওয়া প্রার্থনাসূচক বাক্যকে 'I pray that...' বা 'We wish that...' দিয়ে Assertive-এ রূপান্তর করা হয়।",
      formula: "May + S + V! --> I pray that + S + may + V."
    },
    {
      category: "Imperative ↔ Assertive",
      original: "Obey the traffic regulations immediately.",
      transformed: "You ought to / must obey the traffic regulations immediately.",
      rule: "Direct command converts into an assertive obligation sentence using modal auxiliary 'must' or 'ought to'.",
      ruleBn: "প্রত্যক্ষ আদেশকে 'You must' বা 'You ought to' যুক্ত বর্ণনামূলক বাক্যে রূপান্তর করা হয়।",
      formula: "V1 + Object --> You must/should + V1 + Object."
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
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Segment 1 · Foundations
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  Module 001_003 · Topic 7
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Interactive Sentence Transformation Workbench
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Experience dynamic structural conversions across the 5 communicative sentence classes. Learn to alter syntactic framing while preserving 100% semantic truth.
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
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-violet-400/50 shadow-violet-950/50 ring-2 ring-violet-500/20"
                    : "bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white"
                }`}
              >
                <Languages className={`w-4 h-4 transition-transform duration-300 ${showBengali ? "rotate-180 text-white" : "text-indigo-400"}`} />
                <span>{showBengali ? "বাংলা ব্যাখ্যা সক্রিয় (Active)" : "বাংলা ব্যাখ্যা দেখুন (Toggle বাংলা)"}</span>
              </button>
            </div>
          </div>

          {showBengali && (
            <div className="mt-6 p-4 rounded-2xl bg-violet-950/40 border border-violet-500/30 text-violet-200 text-sm flex items-start gap-3 animate-fade-in">
              <Sparkles className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-violet-300">ট্রান্সফরমেশন ওয়ার্কবেঞ্চ নির্দেশিকা:</p>
                <p className="text-violet-200/90 text-xs mt-1 leading-relaxed">
                  বাক্যের বাহ্যিক রূপ (Assertive, Interrogative, Imperative, Exclamatory, Optative) বদলালেও বাক্যের অন্তর্নিহিত অর্থ অপরিবর্তিত রাখাটাই ব্যাকরণের আসল পরীক্ষা। নিচে বিভিন্ন প্রকার রূপান্তর নির্বাচন করে নিয়মগুলো লক্ষ্য করুন।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Workbench Container */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <ArrowRightLeft className="w-6 h-6 text-violet-400" />
              <h2 className="text-xl font-bold text-white">Live Transformation Synthesizer</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">5 Syntactic Patterns</span>
          </div>

          {/* Pattern Buttons */}
          
        
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
                Sentence Transformation in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                How to change the outward costume of a sentence without changing its inner meaning by even 1%.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              Same Truth, New Clothes
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Statement to Negative (Use Opposite + Not)</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                "Man is mortal" -> "Man is NOT immortal". Meaning remains 100% unchanged!
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 Affirmative <===> Negative Equivalence.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Statement to Question (Rhetorical Emphasis)</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                "Everyone loves freedom" -> "Who does NOT love freedom?".
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 Assertive <===> Interrogative Rhetorical.
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
                <span className="text-xs font-bold text-blue-400 block font-mono">Affirmative -> Negative</span>
                <p className="text-xs text-slate-300">"He is honest" -> "He is not dishonest"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block font-mono">Assertive -> Question</span>
                <p className="text-xs text-slate-300">"Nobody can fly" -> "Who can fly?"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">Exclamatory -> Assertive</span>
                <p className="text-xs text-slate-300">"What a storm!" -> "It was a great storm"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Optative -> Assertive</span>
                <p className="text-xs text-slate-300">"May you prosper" -> "I pray you may..."</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "None but the brave deserve the fair. (= Only the brave deserve the fair)."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় বাক্য রূপান্তর:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                Transformation হলো বাক্যের বাহ্যিক রূপ বা পোশাক বদলানো, কিন্তু অন্তর্নিহিত অর্থ সম্পূর্ণ অপরিবর্তিত রাখা। যেমন: 'সে সৎ' -> 'সে অসৎ নয়'।
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
                Sentence Transformation in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                How to change the outward costume of a sentence without changing its inner meaning by even 1%.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              Same Truth, New Clothes
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Statement to Negative (Use Opposite + Not)</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                "Man is mortal" -> "Man is NOT immortal". Meaning remains 100% unchanged!
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 Affirmative <===> Negative Equivalence.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Statement to Question (Rhetorical Emphasis)</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                "Everyone loves freedom" -> "Who does NOT love freedom?".
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 Assertive <===> Interrogative Rhetorical.
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
                <span className="text-xs font-bold text-blue-400 block font-mono">Affirmative -> Negative</span>
                <p className="text-xs text-slate-300">"He is honest" -> "He is not dishonest"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block font-mono">Assertive -> Question</span>
                <p className="text-xs text-slate-300">"Nobody can fly" -> "Who can fly?"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">Exclamatory -> Assertive</span>
                <p className="text-xs text-slate-300">"What a storm!" -> "It was a great storm"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Optative -> Assertive</span>
                <p className="text-xs text-slate-300">"May you prosper" -> "I pray you may..."</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "None but the brave deserve the fair. (= Only the brave deserve the fair)."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় বাক্য রূপান্তর:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                Transformation হলো বাক্যের বাহ্যিক রূপ বা পোশাক বদলানো, কিন্তু অন্তর্নিহিত অর্থ সম্পূর্ণ অপরিবর্তিত রাখা। যেমন: 'সে সৎ' -> 'সে অসৎ নয়'।
              </p>
            </div>
          )}
        </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {transformations.map((t, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTransformationIndex(idx)}
                className={`p-3 rounded-2xl text-left text-xs font-semibold transition border ${
                  selectedTransformationIndex === idx
                    ? "bg-violet-600 text-white border-violet-400 shadow-lg shadow-violet-950"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="text-[10px] uppercase font-mono opacity-70">Pattern #{idx + 1}</div>
                <div className="mt-1 truncate">{t.category}</div>
              </button>
            ))}
          </div>

          {/* Active Transformation Studio Card */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-violet-500/30 space-y-5 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="px-3 py-1 rounded-md bg-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-wider">
                {transformations[selectedTransformationIndex].category}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Formula: {transformations[selectedTransformationIndex].formula}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Original Source Statement</span>
                <p className="font-mono text-sm text-white">{transformations[selectedTransformationIndex].original}</p>
              </div>

              <div className="p-5 rounded-xl bg-violet-950/40 border border-violet-500/40 space-y-2">
                <span className="text-[11px] font-bold text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Transformed Equivalence
                </span>
                <p className="font-mono text-sm text-emerald-300 font-bold">{transformations[selectedTransformationIndex].transformed}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-violet-300 uppercase tracking-wider">Syntactic Invariant Mechanics</span>
              <p className="text-xs text-slate-300 leading-relaxed">{transformations[selectedTransformationIndex].rule}</p>
              {showBengali && (
                <p className="text-xs text-violet-300/90 pt-1 border-t border-slate-800 leading-relaxed">
                  <strong>বাংলা বিশ্লেষণ:</strong> {transformations[selectedTransformationIndex].ruleBn}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Topic 7 Diagnostic Transformation Assessment (25 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 7: Interactive Transformation Notes"
          />

          <WordDictionary />

          <Teacher
            note="Transformation tests your flexibility with language. Keep the meaning holy, and play freely with the structure! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_003_classification-of-sentences-by-purpose-and-mood/6"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 6 (Classroom Practice Lab)</span>
          </a>

          <a
            href="/english-grammar/topic/001_003_classification-of-sentences-by-purpose-and-mood/8"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 8 (Module Capstone Assessment)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
