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
  Search,
  Cpu,
  Compass,
  MessageSquare,
  Lightbulb,
  Target,
  Heart
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

export default function Topic7() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeSentenceId, setActiveSentenceId] = useState(0);

  const sentences = [
    {
      fullText: "The exceptionally brilliant scholar solved the complex calculus problem with remarkable ease.",
      tokens: [
        { word: "The", pos: "Definite Article / Determiner", cat: "Closed", color: "text-slate-400 bg-slate-900 border-slate-700" },
        { word: "exceptionally", pos: "Adverb of Degree", cat: "Open", color: "text-purple-300 bg-purple-950/40 border-purple-500/40" },
        { word: "brilliant", pos: "Attributive Adjective", cat: "Open", color: "text-amber-300 bg-amber-950/40 border-amber-500/40" },
        { word: "scholar", pos: "Noun (Subject)", cat: "Open", color: "text-blue-300 bg-blue-950/40 border-blue-500/40" },
        { word: "solved", pos: "Finite Transitive Verb", cat: "Open", color: "text-emerald-300 bg-emerald-950/40 border-emerald-500/40" },
        { word: "the", pos: "Definite Article / Determiner", cat: "Closed", color: "text-slate-400 bg-slate-900 border-slate-700" },
        { word: "complex", pos: "Attributive Adjective", cat: "Open", color: "text-amber-300 bg-amber-950/40 border-amber-500/40" },
        { word: "calculus", pos: "Noun-Adjunct Modifier", cat: "Open", color: "text-amber-300 bg-amber-950/40 border-amber-500/40" },
        { word: "problem", pos: "Noun (Direct Object)", cat: "Open", color: "text-blue-300 bg-blue-950/40 border-blue-500/40" },
        { word: "with", pos: "Preposition", cat: "Closed", color: "text-rose-300 bg-rose-950/40 border-rose-500/40" },
        { word: "remarkable", pos: "Attributive Adjective", cat: "Open", color: "text-amber-300 bg-amber-950/40 border-amber-500/40" },
        { word: "ease", pos: "Abstract Noun (Object of Prep)", cat: "Open", color: "text-blue-300 bg-blue-950/40 border-blue-500/40" }
      ]
    },
    {
      fullText: "Bravo! Tuhina executed the algorithm flawlessly, and she won the prestigious first prize.",
      tokens: [
        { word: "Bravo!", pos: "Interjection", cat: "Closed/Emotive", color: "text-pink-300 bg-pink-950/40 border-pink-500/40" },
        { word: "Tuhina", pos: "Proper Noun (Subject)", cat: "Open", color: "text-blue-300 bg-blue-950/40 border-blue-500/40" },
        { word: "executed", pos: "Finite Transitive Verb", cat: "Open", color: "text-emerald-300 bg-emerald-950/40 border-emerald-500/40" },
        { word: "the", pos: "Definite Article", cat: "Closed", color: "text-slate-400 bg-slate-900 border-slate-700" },
        { word: "algorithm", pos: "Noun (Direct Object)", cat: "Open", color: "text-blue-300 bg-blue-950/40 border-blue-500/40" },
        { word: "flawlessly,", pos: "Adverb of Manner", cat: "Open", color: "text-purple-300 bg-purple-950/40 border-purple-500/40" },
        { word: "and", pos: "Coordinating Conjunction", cat: "Closed", color: "text-cyan-300 bg-cyan-950/40 border-cyan-500/40" },
        { word: "she", pos: "Personal Pronoun (Subject)", cat: "Closed", color: "text-purple-300 bg-purple-950/40 border-purple-500/40" },
        { word: "won", pos: "Finite Transitive Verb", cat: "Open", color: "text-emerald-300 bg-emerald-950/40 border-emerald-500/40" },
        { word: "the", pos: "Definite Article", cat: "Closed", color: "text-slate-400 bg-slate-900 border-slate-700" },
        { word: "prestigious", pos: "Attributive Adjective", cat: "Open", color: "text-amber-300 bg-amber-950/40 border-amber-500/40" },
        { word: "first", pos: "Ordinal Numeral Adjective", cat: "Open", color: "text-amber-300 bg-amber-950/40 border-amber-500/40" },
        { word: "prize.", pos: "Noun (Direct Object)", cat: "Open", color: "text-blue-300 bg-blue-950/40 border-blue-500/40" }
      ]
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
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Segment 1 · Foundations
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Module 001_001 · Topic 7
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Interactive Word Classification Workbench & Diagnostics
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Deconstruct complete real-world sentences token-by-token. Assign syntactic labels with mathematical precision and eliminate grammatical ambiguity.
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
                <p className="font-semibold text-emerald-300">ইন্টারেক্টিভ পার্সিং ওয়ার্কবেঞ্চ নির্দেশিকা:</p>
                <p className="text-emerald-200/90 text-xs mt-1 leading-relaxed">
                  নিচের বাক্যের প্রতিটি শব্দের ওপর ক্লিক করে দেখে নিন তার সুনির্দিষ্ট ব্যাকরণগত পরিচয় (Token Parsing)। এই পদ্ধতি আয়ত্ত করলে জটিল বাক্যের গঠন বোঝা অত্যন্ত সহজ হয়ে যায়।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Workbench Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                Live Syntactic Token Parser
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Deconstruct Sentences in Real-Time
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveSentenceId(0)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                  activeSentenceId === 0
                    ? "bg-indigo-600 text-white border-indigo-400"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                }`}
              >
                Sample 1 (Academic)
              </button>
              <button
                onClick={() => setActiveSentenceId(1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                  activeSentenceId === 1
                    ? "bg-indigo-600 text-white border-indigo-400"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                }`}
              >
                Sample 2 (Compound)
              </button>
            </div>
          </div>

          {/* Full Sentence Display */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm text-indigo-200">
            "{sentences[activeSentenceId].fullText}"
          </div>

          {/* Token Grid */}
          
        
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
                Articles & Determiners in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                Determiners point out which noun you are talking about and tell you how many or how much.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              The Signposts
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Articles (A, An, The)</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                'A/An' means any general single item (a book, an apple). 'The' points to a specific, known item (the book on my desk).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 Give me [a] pen. Give me [the] blue pen.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Quantifiers & Demonstratives</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Telling which or how many: this, that, these, those, some, many, every, each, few, all.
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 [Every] student passed [this] exam.
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
                <span className="text-xs font-bold text-blue-400 block font-mono">Indefinite Article</span>
                <p className="text-xs text-slate-300">a, an (general singular)</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block font-mono">Definite Article</span>
                <p className="text-xs text-slate-300">the (specific & unique)</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">Demonstratives</span>
                <p className="text-xs text-slate-300">this, that, these, those</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Quantifiers</span>
                <p className="text-xs text-slate-300">some, many, all, few, every</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "The mentor provided several reference books to each student in the classroom."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>খুব সহজ ভাষায় ডিটারমিনার ও আর্টিকেল:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                Determiner হলো Noun-এর পূর্বে বসে তাকে নির্দিষ্ট (The/This) বা অনির্দিষ্ট (A/An) করা অথবা তার সংখ্যা/পরিমাণ (some, many, every) স্পষ্ট করে দেওয়ার শব্দ।
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
                Articles & Determiners in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                Determiners point out which noun you are talking about and tell you how many or how much.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              The Signposts
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Articles (A, An, The)</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                'A/An' means any general single item (a book, an apple). 'The' points to a specific, known item (the book on my desk).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 Give me [a] pen. Give me [the] blue pen.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Quantifiers & Demonstratives</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Telling which or how many: this, that, these, those, some, many, every, each, few, all.
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 [Every] student passed [this] exam.
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
                <span className="text-xs font-bold text-blue-400 block font-mono">Indefinite Article</span>
                <p className="text-xs text-slate-300">a, an (general singular)</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block font-mono">Definite Article</span>
                <p className="text-xs text-slate-300">the (specific & unique)</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">Demonstratives</span>
                <p className="text-xs text-slate-300">this, that, these, those</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Quantifiers</span>
                <p className="text-xs text-slate-300">some, many, all, few, every</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "The mentor provided several reference books to each student in the classroom."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>খুব সহজ ভাষায় ডিটারমিনার ও আর্টিকেল:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                Determiner হলো Noun-এর পূর্বে বসে তাকে নির্দিষ্ট (The/This) বা অনির্দিষ্ট (A/An) করা অথবা তার সংখ্যা/পরিমাণ (some, many, every) স্পষ্ট করে দেওয়ার শব্দ।
              </p>
            </div>
          )}
        </div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {sentences[activeSentenceId].tokens.map((tok, idx) => (
              <div key={idx} className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 ${tok.color}`}>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-white">{tok.word}</span>
                  <span className="text-[10px] uppercase tracking-wider font-mono opacity-75">{tok.cat}</span>
                </div>
                <span className="text-xs font-medium opacity-90">{tok.pos}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Topic 7 Diagnostic Assessment (25 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 7: Interactive Parsing Workbench — Quick Notes"
          />

          <WordDictionary />

          <Teacher
            note="When you can parse every token of a sentence into its precise grammatical function, you possess true mastery over the language! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_001_words-and-the-eight-parts-of-speech-overview/6"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 6 (Classroom Dialogue)</span>
          </a>

          <a
            href="/english-grammar/topic/001_001_words-and-the-eight-parts-of-speech-overview/8"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 8 (Self-Assessment Quiz)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
