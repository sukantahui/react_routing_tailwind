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
  Repeat,
  Lightbulb,
  Target,
  Heart,
  Compass
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

export default function Topic5() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState(0);

  const patterns = [
    {
      title: "Only / Alone ↔ None But / Nothing But",
      affirmative: "Only meritorious students shall receive this fellowship.",
      negative: "None but meritorious students shall receive this fellowship.",
      formula: "Only (Person) --> None but | Only (Thing) --> Nothing but",
      formulaBn: "ব্যক্তির ক্ষেত্রে 'Only'-এর বদলে 'None but' এবং বস্তুর ক্ষেত্রে 'Nothing but' বসে।"
    },
    {
      title: "Too... to ↔ So... that... cannot / could not",
      affirmative: "The mathematical theorem is too intricate for beginners to grasp.",
      negative: "The mathematical theorem is so intricate that beginners cannot grasp it.",
      formula: "too + Adj + to + V1 --> so + Adj + that + S + cannot/could not + V1",
      formulaBn: "'Too... to' পরিবর্তিত হয়ে 'so... that + cannot/could not' গঠন ধারণ করে।"
    },
    {
      title: "As soon as ↔ No sooner had... than",
      affirmative: "As soon as the siren sounded, the workforce assembled.",
      negative: "No sooner had the siren sounded than the workforce assembled.",
      formula: "No sooner had + S + V3... than + S + V2",
      formulaBn: "'As soon as'-এর স্থলে 'No sooner had + V3... than' বসে।"
    },
    {
      title: "Every ↔ There is no... without / but",
      affirmative: "Every cloud has a silver lining.",
      negative: "There is no cloud without a silver lining.",
      formula: "Every + Noun --> There is no + Noun + without...",
      formulaBn: "'Every'-যুক্ত বাক্যকে 'There is no... without' দিয়ে রূপান্তর করা হয়।"
    },
    {
      title: "Must ↔ Cannot but / Cannot help",
      affirmative: "We must adapt to technological innovation.",
      negative: "We cannot but adapt to technological innovation.",
      formula: "must + V1 --> cannot but + V1 (or cannot help + V-ing)",
      formulaBn: "'Must'-এর বদলে 'cannot but + V1' বসে।"
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
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Segment 1 · Foundations
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Module 001_004 · Topic 5
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Affirmative ↔ Negative Sentence Transformation
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Master the core conversion archetypes: 'None but', 'Too... to', 'As soon as', 'There is no... without', and antonym pairs with zero meaning drift.
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
                    ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white border-rose-400/50 shadow-rose-950/50 ring-2 ring-rose-500/20"
                    : "bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white"
                }`}
              >
                <Languages className={`w-4 h-4 transition-transform duration-300 ${showBengali ? "rotate-180 text-white" : "text-indigo-400"}`} />
                <span>{showBengali ? "বাংলা ব্যাখ্যা সক্রিয় (Active)" : "বাংলা ব্যাখ্যা দেখুন (Toggle বাংলা)"}</span>
              </button>
            </div>
          </div>

          {showBengali && (
            <div className="mt-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-sm flex items-start gap-3 animate-fade-in">
              <Sparkles className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-rose-300">হ্যাঁ-বোধক থেকে না-বোধক রূপান্তরের নিয়ম:</p>
                <p className="text-rose-200/90 text-xs mt-1 leading-relaxed">
                  পরীক্ষায় সবচেয়ে বেশি আসা রূপান্তর হল Affirmative থেকে Negative। মনে রাখতে হবে, <em>'None but'</em>, <em>'So... that... cannot'</em>, এবং <em>'No sooner had... than'</em>-এর মতো নির্দিষ্ট সূত্র ব্যবহার করলে বাক্যের অর্থ হুবহু বজায় থাকে।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Formula Studio */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Repeat className="w-6 h-6 text-rose-400" />
              <h2 className="text-xl font-bold text-white">Affirmative ↔ Negative Formula Matrix</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">5 Exam Archetypes</span>
          </div>

          {/* Grid Selection */}
          
        
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
                Affirmative to Negative in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                How to make a sentence negative without making the statement false.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              Opposites & Negatives
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Use Opposites (Antonyms) with 'Not'</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                "He is honest" -> "He is NOT dishonest". "I will remember" -> "I will NEVER forget".
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 Not + Opposite Word = Original Meaning.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Special Word Rules (Only, As soon as, Too...to)</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                'Only person' -> 'None but'; 'Only thing' -> 'Nothing but'; 'As soon as' -> 'No sooner did...than'; 'Too weak to walk' -> 'So weak that he cannot walk'.
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 "Only Swadeep" -> "None but Swadeep".
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
                <span className="text-xs font-bold text-blue-400 block font-mono">Antonym + Not</span>
                <p className="text-xs text-slate-300">"mortal" -> "not immortal"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block font-mono">None but (Person)</span>
                <p className="text-xs text-slate-300">"Only Swadeep" -> "None but Swadeep"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">No sooner...than</span>
                <p className="text-xs text-slate-300">"As soon as" -> "No sooner did...than"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Too...to -> So...that</span>
                <p className="text-xs text-slate-300">"too tired to code" -> "so tired that..."</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "No sooner did the bell ring than the students rushed into the computer laboratory."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় হ্যাঁ থেকে না বোধক রূপান্তর:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                অর্থ ঠিক রেখে Negative করার প্রধান উপায়: 'not' বসিয়ে মূল শব্দের বিপরীত শব্দ (Antonym) বসানো (যেমন: He is present -> He is not absent)। 'Only'-এর জায়গায় ব্যক্তি হলে 'None but' এবং বস্তু হলে 'Nothing but' বসে।
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
                Affirmative to Negative in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                How to make a sentence negative without making the statement false.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              Opposites & Negatives
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Use Opposites (Antonyms) with 'Not'</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                "He is honest" -> "He is NOT dishonest". "I will remember" -> "I will NEVER forget".
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 Not + Opposite Word = Original Meaning.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Special Word Rules (Only, As soon as, Too...to)</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                'Only person' -> 'None but'; 'Only thing' -> 'Nothing but'; 'As soon as' -> 'No sooner did...than'; 'Too weak to walk' -> 'So weak that he cannot walk'.
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 "Only Swadeep" -> "None but Swadeep".
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
                <span className="text-xs font-bold text-blue-400 block font-mono">Antonym + Not</span>
                <p className="text-xs text-slate-300">"mortal" -> "not immortal"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block font-mono">None but (Person)</span>
                <p className="text-xs text-slate-300">"Only Swadeep" -> "None but Swadeep"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">No sooner...than</span>
                <p className="text-xs text-slate-300">"As soon as" -> "No sooner did...than"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Too...to -> So...that</span>
                <p className="text-xs text-slate-300">"too tired to code" -> "so tired that..."</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "No sooner did the bell ring than the students rushed into the computer laboratory."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় হ্যাঁ থেকে না বোধক রূপান্তর:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                অর্থ ঠিক রেখে Negative করার প্রধান উপায়: 'not' বসিয়ে মূল শব্দের বিপরীত শব্দ (Antonym) বসানো (যেমন: He is present -> He is not absent)। 'Only'-এর জায়গায় ব্যক্তি হলে 'None but' এবং বস্তু হলে 'Nothing but' বসে।
              </p>
            </div>
          )}
        </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {patterns.map((pat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPattern(idx)}
                className={`p-3 rounded-2xl text-left text-xs font-semibold transition border ${
                  selectedPattern === idx
                    ? "bg-rose-600 text-white border-rose-400 shadow-lg shadow-rose-950"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="text-[10px] uppercase font-mono opacity-75">Formula #{idx + 1}</div>
                <div className="mt-1 truncate">{pat.title.split("↔")[0]}</div>
              </button>
            ))}
          </div>

          {/* Active Formula View */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-rose-500/30 space-y-5 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="px-3 py-1 rounded-md bg-rose-500/20 text-rose-300 text-xs font-bold uppercase font-mono">
                {patterns[selectedPattern].title}
              </span>
              <span className="text-xs font-mono text-slate-400">Formula: {patterns[selectedPattern].formula}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">Affirmative Form</span>
                <p className="font-mono text-sm text-white">"{patterns[selectedPattern].affirmative}"</p>
              </div>

              <div className="p-5 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-2">
                <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Negative Equivalent
                </span>
                <p className="font-mono text-sm text-emerald-300 font-bold">"{patterns[selectedPattern].negative}"</p>
              </div>
            </div>

            {showBengali && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-rose-300 leading-relaxed">
                <strong>বাংলা প্রয়োগবিধি:</strong> {patterns[selectedPattern].formulaBn}
              </div>
            )}
          </div>
        </div>

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Topic 5 Diagnostic Assessment (25 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 5: Affirmative ↔ Negative Transformation Notes"
          />

          <WordDictionary />

          <Teacher
            note="Pay special attention to 'No sooner had... than'. In competitive exams, examiners love testing the difference between 'than' and 'then'! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_004_phrases-vs-clauses-and-sentence-transformation-basics/4"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 4 (Transformation Basics)</span>
          </a>

          <a
            href="/english-grammar/topic/001_004_phrases-vs-clauses-and-sentence-transformation-basics/6"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 6 (Assertive ↔ Interrogative)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
