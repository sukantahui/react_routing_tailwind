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
  Boxes,
  ShieldCheck,
  Tag
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

export default function Topic1() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedPhraseType, setSelectedPhraseType] = useState(0);

  const phraseTypes = [
    {
      title: "Noun Phrase (NP)",
      head: "Head Noun or Pronoun",
      example: "The brilliant young scientist from Barrackpore",
      role: "Functions as Subject, Direct Object, or Predicate Noun",
      roleBn: "বাক্যের Subject, Object বা Complement হিসেবে ব্যবহৃত বিশেষ্যমূলক শব্দগুচ্ছ।",
      breakdown: "[The (Determiner) + brilliant young (Adjectives) + scientist (Head Noun) + from Barrackpore (PP)]"
    },
    {
      title: "Verb Phrase (VP)",
      head: "Lexical Main Verb + Auxiliaries",
      example: "has been diligently preparing",
      role: "Forms the complete verbal predicate of the clause",
      roleBn: "অক্সিলিয়ারি এবং মূল ভার্ব সমন্বয়ে গঠিত ক্রিয়ামূলক শব্দগুচ্ছ।",
      breakdown: "[has (Aux) + been (Aux) + diligently (Adverb) + preparing (Main Lexical Verb)]"
    },
    {
      title: "Prepositional Phrase (PP)",
      head: "Preposition + Object of Preposition",
      example: "with remarkable speed & accuracy",
      role: "Functions either adjectivally (modifying Noun) or adverbially (modifying Verb)",
      roleBn: "Preposition দিয়ে গঠিত; Noun-কে বিশেষিত করলে Adjective Phrase এবং Verb-কে বিশেষিত করলে Adverb Phrase হয়।",
      breakdown: "[with (Preposition) + remarkable speed & accuracy (Noun Phrase Object)]"
    },
    {
      title: "Adjective Phrase (AdjP)",
      head: "Adjective or Prepositional Modifier",
      example: "a leader of immense courage and vision",
      role: "Modifies and enriches the meaning of a noun or pronoun",
      roleBn: "কোনো Noun বা Pronoun-এর গুণ, অবস্থা বা প্রকৃতি নির্দেশ করে।",
      breakdown: "[of immense courage and vision -> modifies 'leader']"
    },
    {
      title: "Adverb Phrase (AdvP)",
      head: "Adverb or Adverbial Cluster",
      example: "arrived much too early for the session",
      role: "Modifies a verb, adjective, or another adverb (answers When, Where, How, Why)",
      roleBn: "ক্রিয়া কখন, কোথায়, কীভাবে বা কেন সম্পন্ন হয়েছে তা বর্ণনা করে।",
      breakdown: "[much (Degree Adv) + too (Degree Adv) + early (Adv of Time)]"
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
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Segment 1 · Foundations
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Module 001_004 · Topic 1
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                The 5 Major Phrase Types in English
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Deconstruct sentences into functional phrase clusters: Noun Phrases, Verb Phrases, Prepositional Phrases, Adjective Phrases, and Adverb Phrases without finite verb confusion.
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
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400/50 shadow-blue-950/50 ring-2 ring-blue-500/20"
                    : "bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white"
                }`}
              >
                <Languages className={`w-4 h-4 transition-transform duration-300 ${showBengali ? "rotate-180 text-white" : "text-indigo-400"}`} />
                <span>{showBengali ? "বাংলা ব্যাখ্যা সক্রিয় (Active)" : "বাংলা ব্যাখ্যা দেখুন (Toggle বাংলা)"}</span>
              </button>
            </div>
          </div>

          {showBengali && (
            <div className="mt-6 p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-blue-200 text-sm flex items-start gap-3 animate-fade-in">
              <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-300">Phrase (শব্দগুচ্ছ) সম্পর্কিত বাংলা গাইড:</p>
                <p className="text-blue-200/90 text-xs mt-1 leading-relaxed">
                  <strong>Phrase</strong> হল একাধিক শব্দের এমন এক দল যা একটি মাত্র Part of Speech হিসেবে কাজ করে। মনে রাখবেন, Phrase-এ কোনো <em>Subject + Finite Verb</em>-এর যুগল থাকে না।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Phrase Explorer */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Boxes className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Interactive Phrase Architecture Studio</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">5 Functional Classes</span>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {phraseTypes.map((pt, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPhraseType(idx)}
                className={`p-3.5 rounded-2xl text-left text-xs font-semibold transition border ${
                  selectedPhraseType === idx
                    ? "bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-950"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="text-[10px] uppercase font-mono opacity-75">Type #{idx + 1}</div>
                <div className="mt-1 font-bold truncate">{pt.title}</div>
              </button>
            ))}
          </div>

          {/* Active Card Breakdown */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-md bg-blue-500/20 text-blue-300 text-xs font-bold font-mono">
                {phraseTypes[selectedPhraseType].title}
              </span>
              <span className="text-xs text-slate-400 font-mono">Core: {phraseTypes[selectedPhraseType].head}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Illustrative Example in Context</span>
              <p className="font-mono text-sm text-emerald-300 font-bold">"{phraseTypes[selectedPhraseType].example}"</p>
              <p className="font-mono text-xs text-slate-400 pt-1 border-t border-slate-800/80">{phraseTypes[selectedPhraseType].breakdown}</p>
            </div>

            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 space-y-1.5">
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">Functional Role & Syntax Mechanics</span>
              <p className="text-xs text-slate-300 leading-relaxed">{phraseTypes[selectedPhraseType].role}</p>
              {showBengali && (
                <p className="text-xs text-blue-300/90 pt-1 border-t border-slate-800 leading-relaxed">
                  <strong>বাংলা তাৎপর্য:</strong> {phraseTypes[selectedPhraseType].roleBn}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Topic 1 Diagnostic Phrase Assessment (10 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 1: The 5 Major Phrase Types Notes"
          />

          <WordDictionary />

          <Teacher
            note="Remember: a phrase has meaning, but not complete predication. Master phrases, and long sentences will never intimidate you! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_004_phrases-vs-clauses-and-sentence-transformation-basics/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 0 (Overview)</span>
          </a>

          <a
            href="/english-grammar/topic/001_004_phrases-vs-clauses-and-sentence-transformation-basics/2"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 2 (What is a Clause)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
