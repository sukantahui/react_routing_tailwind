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
  Sparkle,
  Flame,
  MessageSquare,
  Lightbulb,
  Target,
  Heart,
  Compass
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

export default function Topic4() {
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
                  Module 001_003 · Topic 4
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Exclamatory Sentences: 'What a...' vs 'How...' Mechanics
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Transform everyday assertions into vivid emotional expressions. Master the two structural blueprints of exclamatory syntax, terminal verb placement, and interjection punctuation.
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
                  <strong>Exclamatory Sentence (আবেগসূচক বাক্য)</strong> আকস্মিক বিস্ময় বা আনন্দ প্রকাশ করে। Noun Phrase-এর পূর্বে <strong>'What a'</strong> এবং শুধুমাত্র Adjective বা Adverb-এর পূর্বে <strong>'How'</strong> বসে।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Two Templates Grid */}
        
        
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
                Exclamatory Sentences in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                Used when your emotions overflow with wonder, joy, or shock: always ending with an exclamation mark (!).
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              Spontaneous Excitement
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Template A: 'What (a/an)' + Noun Phrase</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Used when exclaiming about a person or thing: "What a spectacular demonstration it was!".
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 What a/an + Adjective + Noun + Subject + Verb !
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Template B: 'How' + Bare Adjective / Adverb</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Used when describing a quality or action alone without a noun: "How brilliantly the student coded!".
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 How + Adjective/Adverb + Subject + Verb !
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
                <span className="text-xs font-bold text-amber-400 block font-mono">What a... (Singular)</span>
                <p className="text-xs text-slate-300">"What a lovely sunset it is!"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-teal-400 block font-mono">What... (Uncountable)</span>
                <p className="text-xs text-slate-300">"What pleasant weather!" (No 'a')</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block font-mono">How... (Adjective)</span>
                <p className="text-xs text-slate-300">"How sweet the song is!"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Interjection Lead</span>
                <p className="text-xs text-slate-300">"Hurrah! We won the match."</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "What an extraordinary breakthrough the engineering cohort accomplished today!"
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় বিস্ময়সূচক বাক্য:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                তীব্র আবেগ প্রকাশের জন্য Exclamatory বাক্য ব্যবহৃত হয়। Noun থাকলে 'What a/an' বসে (What a great idea!), আর শুধু Adjective থাকলে 'How' বসে (How beautiful!)। শেষে (!) আবশ্যক।
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
                Exclamatory Sentences in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                Used when your emotions overflow with wonder, joy, or shock: always ending with an exclamation mark (!).
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              Spontaneous Excitement
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Template A: 'What (a/an)' + Noun Phrase</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Used when exclaiming about a person or thing: "What a spectacular demonstration it was!".
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 What a/an + Adjective + Noun + Subject + Verb !
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Template B: 'How' + Bare Adjective / Adverb</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Used when describing a quality or action alone without a noun: "How brilliantly the student coded!".
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 How + Adjective/Adverb + Subject + Verb !
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
                <span className="text-xs font-bold text-amber-400 block font-mono">What a... (Singular)</span>
                <p className="text-xs text-slate-300">"What a lovely sunset it is!"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-teal-400 block font-mono">What... (Uncountable)</span>
                <p className="text-xs text-slate-300">"What pleasant weather!" (No 'a')</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block font-mono">How... (Adjective)</span>
                <p className="text-xs text-slate-300">"How sweet the song is!"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Interjection Lead</span>
                <p className="text-xs text-slate-300">"Hurrah! We won the match."</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "What an extraordinary breakthrough the engineering cohort accomplished today!"
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় বিস্ময়সূচক বাক্য:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                তীব্র আবেগ প্রকাশের জন্য Exclamatory বাক্য ব্যবহৃত হয়। Noun থাকলে 'What a/an' বসে (What a great idea!), আর শুধু Adjective থাকলে 'How' বসে (How beautiful!)। শেষে (!) আবশ্যক।
              </p>
            </div>
          )}
        </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-amber-500/30 space-y-4">
            <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold font-mono">
              Template A: 'What (a/an)' + Noun Phrase
            </span>
            <h3 className="text-lg font-bold text-white">Modifies Noun Heads</h3>
            <p className="text-slate-300 text-sm">
              Used when an adjective is paired with a noun entity.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-200 space-y-1">
              <div>Formula: What a/an + Adj + Noun + S + V !</div>
              <div className="text-white font-bold">"What an extraordinary demonstration it was!"</div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/30 space-y-4">
            <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold font-mono">
              Template B: 'How' + Bare Adjective/Adverb
            </span>
            <h3 className="text-lg font-bold text-white">Modifies Pure Adjectives or Adverbs</h3>
            <p className="text-slate-300 text-sm">
              Used when qualifying a solitary adjective or adverb without a nominal head.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-200 space-y-1">
              <div>Formula: How + Adj/Adv + S + V !</div>
              <div className="text-white font-bold">"How brilliantly the student coded the solution!"</div>
            </div>
          </div>
        </div>

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Topic 4 Diagnostic Assessment (25 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 4: Exclamatory Sentences — Quick Notes"
          />

          <WordDictionary />

          <Teacher
            note="Notice how the subject and verb migrate to the end of the sentence in exclamatory structures. This fronting creates intense dramatic impact! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_003_classification-of-sentences-by-purpose-and-mood/3"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 3 (Imperative Sentences)</span>
          </a>

          <a
            href="/english-grammar/topic/001_003_classification-of-sentences-by-purpose-and-mood/5"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 5 (Optative Sentences)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
