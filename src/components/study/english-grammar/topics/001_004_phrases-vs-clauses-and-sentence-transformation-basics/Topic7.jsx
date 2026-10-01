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
  Flame,
  ShieldCheck,
  Sparkle,
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
  const [selectedExclamatoryIndex, setSelectedExclamatoryIndex] = useState(0);

  const exclamatoryCases = [
    {
      title: "What a... (Adjective + Noun)",
      exclamatory: "What an astounding discovery the scientists have made!",
      assertive: "The scientists have made a very astounding discovery.",
      formula: "What a + Adj + Noun --> Subject + Verb + a very + Adj + Noun.",
      formulaBn: "'What an astounding discovery'-এর রূপান্তর হিসেবে 'a very astounding discovery' বসে।"
    },
    {
      title: "How... (Adjective / Adverb)",
      exclamatory: "How eloquently the debater presented her arguments!",
      assertive: "The debater presented her arguments very eloquently.",
      formula: "How + Adv/Adj + S + V -→ S + V + very + Adv/Adj.",
      formulaBn: "'How eloquently' পরিবর্তিত হয়ে 'very eloquently' হয়।"
    },
    {
      title: "Unreal Subjunctive Wishes (O that / If only)",
      exclamatory: "O that I were a youth once again!",
      assertive: "I earnestly wish that I were a youth once again.",
      formula: "O that / If only + S + were -→ I earnestly wish that + S + were...",
      formulaBn: "'O that I were' অবাস্তব ইচ্ছা প্রকাশ করে, যা 'I earnestly wish that...' দিয়ে রূপান্তরিত হয়।"
    },
    {
      title: "Emotive Interjection ('Alas!')",
      exclamatory: "Alas! The noble philanthropist is no more.",
      assertive: "It is a matter of profound sorrow that the noble philanthropist is no more.",
      formula: "Alas! -→ It is a matter of profound sorrow that...",
      formulaBn: "'Alas!' উঠে গিয়ে 'It is a matter of profound sorrow that...' বসে।"
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
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Segment 1 · Foundations
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Module 001_004 · Topic 7
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Exclamatory ↔ Assertive Sentence Transformation
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Learn how to convert high-emotion exclamations ('What a', 'How', 'O that', 'Alas!') into balanced, dignified assertive statements using intensifiers.
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
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400/50 shadow-purple-950/50 ring-2 ring-purple-500/20"
                    : "bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white"
                }`}
              >
                <Languages className={`w-4 h-4 transition-transform duration-300 ${showBengali ? "rotate-180 text-white" : "text-indigo-400"}`} />
                <span>{showBengali ? "বাংলা ব্যাখ্যা সক্রিয় (Active)" : "বাংলা ব্যাখ্যা দেখুন (Toggle বাংলা)"}</span>
              </button>
            </div>
          </div>

          {showBengali && (
            <div className="mt-6 p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-purple-200 text-sm flex items-start gap-3 animate-fade-in">
              <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-purple-300">Exclamatory থেকে Assertive রূপান্তর গাইড:</p>
                <p className="text-purple-200/90 text-xs mt-1 leading-relaxed">
                  বিস্ময়সূচক বাক্যের আবেগীয় তীব্রতাকে প্রকাশ করতে বর্ণনামূলক বাক্যে <strong>'very'</strong>, <strong>'extremely'</strong> বা <strong>'great'</strong> শব্দগুলো ব্যবহার করা হয় এবং শেষ বিরামচিহ্ন হিসেবে বিস্ময়চিহ্ন (!) উঠে গিয়ে দাঁড়ি/ফুলস্টপ (.) বসে।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Transformation Studio */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Exclamation Intensity Synthesizer</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">4 Core Patterns</span>
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
                Exclamatory to Assertive in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                Converting sudden emotional excitement into a measured, calm, and formal statement.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              Taming the Emotion
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          
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
                Exclamatory to Assertive in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                Converting sudden emotional excitement into a measured, calm, and formal statement.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              Taming the Emotion
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. 'How' becomes 'VERY / EXTREMELY'</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                "How sweet the rose is!" → Tone down the excitement: "The rose is VERY sweet.".
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 How + Adjective =→ Subject + Verb + VERY + Adjective.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. 'What a' becomes 'A VERY / A GREAT'</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                "What a fool he was!" → "He was a GREAT fool.". "What a pity!" → "It is a GREAT pity.".
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 What a + Noun =→ It is a GREAT / VERY + Noun.
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
                <span className="text-xs font-bold text-emerald-400 block font-mono">How → Very</span>
                <p className="text-xs text-slate-300">"How fast he runs!" → "He runs very fast."</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-blue-400 block font-mono">What a → Great</span>
                <p className="text-xs text-slate-300">"What a victory!" → "It was a great victory."</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-rose-400 block font-mono">Alas! → Sorrow</span>
                <p className="text-xs text-slate-300">"Alas!" → "It is a matter of sorrow that..."</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">If only → Wish</span>
                <p className="text-xs text-slate-300">"If only I were young!" → "I wish I were young."</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "What a magnificent demonstration Swadeep presented! ↔ Swadeep presented a truly magnificent demonstration."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় বিস্ময় থেকে সরল বিবৃতি:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                Exclamatory বাক্যকে শান্ত সাধারণ বিবৃতিতে রূপান্তর করতে 'How'-এর জায়গায় 'very/extremely' এবং 'What a'-এর জায়গায় 'a great/wonderful' বসানো হয়।
              </p>
            </div>
          )}
        </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. 'How' becomes 'VERY / EXTREMELY'</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                "How sweet the rose is!" → Tone down the excitement: "The rose is VERY sweet.".
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 How + Adjective =→ Subject + Verb + VERY + Adjective.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. 'What a' becomes 'A VERY / A GREAT'</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                "What a fool he was!" → "He was a GREAT fool.". "What a pity!" → "It is a GREAT pity.".
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 What a + Noun =→ It is a GREAT / VERY + Noun.
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
                <span className="text-xs font-bold text-emerald-400 block font-mono">How → Very</span>
                <p className="text-xs text-slate-300">"How fast he runs!" → "He runs very fast."</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-blue-400 block font-mono">What a → Great</span>
                <p className="text-xs text-slate-300">"What a victory!" → "It was a great victory."</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-rose-400 block font-mono">Alas! → Sorrow</span>
                <p className="text-xs text-slate-300">"Alas!" → "It is a matter of sorrow that..."</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">If only → Wish</span>
                <p className="text-xs text-slate-300">"If only I were young!" → "I wish I were young."</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "What a magnificent demonstration Swadeep presented! ↔ Swadeep presented a truly magnificent demonstration."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় বিস্ময় থেকে সরল বিবৃতি:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                Exclamatory বাক্যকে শান্ত সাধারণ বিবৃতিতে রূপান্তর করতে 'How'-এর জায়গায় 'very/extremely' এবং 'What a'-এর জায়গায় 'a great/wonderful' বসানো হয়।
              </p>
            </div>
          )}
        </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {exclamatoryCases.map((ec, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedExclamatoryIndex(idx)}
                className={`p-3.5 rounded-2xl text-left text-xs font-semibold transition border ${
                  selectedExclamatoryIndex === idx
                    ? "bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-950"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="text-[10px] uppercase font-mono opacity-75">Pattern #{idx + 1}</div>
                <div className="mt-1 font-bold truncate">{ec.title}</div>
              </button>
            ))}
          </div>

          {/* Active Studio Card */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-5 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-2">
                <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" /> Exclamatory Form
                </span>
                <p className="font-mono text-sm text-pink-300 font-bold">"{exclamatoryCases[selectedExclamatoryIndex].exclamatory}"</p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Assertive Equivalence
                </span>
                <p className="font-mono text-sm text-white font-bold">"{exclamatoryCases[selectedExclamatoryIndex].assertive}"</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Conversion Rule</span>
              <p className="text-xs text-slate-300 leading-relaxed">{exclamatoryCases[selectedExclamatoryIndex].formula}</p>
              {showBengali && (
                <p className="text-xs text-purple-300/90 pt-1 border-t border-slate-800 leading-relaxed">
                  <strong>বাংলা নির্দেশিকা:</strong> {exclamatoryCases[selectedExclamatoryIndex].formulaBn}
                </p>
              )}
            </div>
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
            title="Topic 7: Exclamatory ↔ Assertive Notes"
          />

          <WordDictionary />

          <Teacher
            note="Exclamations capture raw passion; assertive statements deliver measured intellect. Both are essential colors on your grammatical palette! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_004_phrases-vs-clauses-and-sentence-transformation-basics/6"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 6 (Assertive ↔ Interrogative)</span>
          </a>

          <a
            href="/english-grammar/topic/001_004_phrases-vs-clauses-and-sentence-transformation-basics/8"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 8 (Classroom Transformation Drills)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
