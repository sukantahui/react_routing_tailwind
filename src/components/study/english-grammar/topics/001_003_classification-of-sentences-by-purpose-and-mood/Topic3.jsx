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
  Send,
  ShieldAlert,
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
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

export default function Topic3() {
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
                  Module 001_003 · Topic 3
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Imperative Sentences: Commands, Requests & The Implied 'You'
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Explore the functional spectrum of imperatives: commands, polite requests, advice, prohibitions, and cohort suggestions with base verb constructions.
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
                  <strong>Imperative Sentence (অনুজ্ঞাবাচক বাক্য)</strong> আদেশ, উপদেশ, অনুরোধ বা প্রস্তাব প্রকাশ করে। এতে Subject 'You' সর্বদা উহ্য থাকে এবং বাক্যটি সরাসরি মূল Verb (Base Form V1) দিয়ে শুরু হয়।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 4 Functional Categories */}
        
        
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
                Commands & Requests in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                In imperative sentences, you give direct orders or requests to the listener, so the word 'You' is understood and hidden.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              The Invisible You
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Start Directly with the Base Verb (V1)</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                No subject needed! The second-person subject '(You)' is implied: "[You] Open the door" → "Open the door."
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 Base Verb (V1) + Object / Complement.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Politeness & Warnings</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Add 'Please' or 'Kindly' for courteous requests; start with 'Don't' for negative prohibitions.
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 "Please help me." | "Don't touch that cable!"
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
                <span className="text-xs font-bold text-rose-400 block font-mono">Direct Order</span>
                <p className="text-xs text-slate-300">"Submit the code immediately."</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block font-mono">Polite Request</span>
                <p className="text-xs text-slate-300">"Please pass the reference notes."</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-blue-400 block font-mono">Instruction / Guide</span>
                <p className="text-xs text-slate-300">"First click install, then restart."</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Cohort Proposal</span>
                <p className="text-xs text-slate-300">"Let's solve this bug together."</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "Execute the automated test suite before pushing your branch to production."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় আদেশ ও অনুরোধমূলক বাক্য:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                Imperative বাক্যে Subject হিসেবে 'You' উহ্য থাকে এবং বাক্য সরাসরি মূল Verb দিয়ে শুরু হয়। যেমন: 'Come here', 'Please help me', 'Don't make noise'।
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
                Commands & Requests in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                In imperative sentences, you give direct orders or requests to the listener, so the word 'You' is understood and hidden.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              The Invisible You
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Start Directly with the Base Verb (V1)</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                No subject needed! The second-person subject '(You)' is implied: "[You] Open the door" → "Open the door."
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 Base Verb (V1) + Object / Complement.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Politeness & Warnings</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Add 'Please' or 'Kindly' for courteous requests; start with 'Don't' for negative prohibitions.
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 "Please help me." | "Don't touch that cable!"
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
                <span className="text-xs font-bold text-rose-400 block font-mono">Direct Order</span>
                <p className="text-xs text-slate-300">"Submit the code immediately."</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block font-mono">Polite Request</span>
                <p className="text-xs text-slate-300">"Please pass the reference notes."</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-blue-400 block font-mono">Instruction / Guide</span>
                <p className="text-xs text-slate-300">"First click install, then restart."</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Cohort Proposal</span>
                <p className="text-xs text-slate-300">"Let's solve this bug together."</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "Execute the automated test suite before pushing your branch to production."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় আদেশ ও অনুরোধমূলক বাক্য:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                Imperative বাক্যে Subject হিসেবে 'You' উহ্য থাকে এবং বাক্য সরাসরি মূল Verb দিয়ে শুরু হয়। যেমন: 'Come here', 'Please help me', 'Don't make noise'।
              </p>
            </div>
          )}
        </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-300 text-xs font-bold font-mono">
              1. Direct Command / Order
            </span>
            <h3 className="text-lg font-bold text-white">Authoritarian Instruction</h3>
            <p className="text-slate-300 text-xs font-mono">
              "Execute the compilation script immediately."
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold font-mono">
              2. Polite Request / Invitation
            </span>
            <h3 className="text-lg font-bold text-white">Deference & Hospitality</h3>
            <p className="text-slate-300 text-xs font-mono">
              "Please share the presentation slides with the cohort."
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold font-mono">
              3. Advice & Best Practice
            </span>
            <h3 className="text-lg font-bold text-white">Guidance & Caution</h3>
            <p className="text-slate-300 text-xs font-mono">
              "Always test edge cases before final deployment."
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold font-mono">
              4. Cohort Proposal ('Let's')
            </span>
            <h3 className="text-lg font-bold text-white">Collective Joint Action</h3>
            <p className="text-slate-300 text-xs font-mono">
              "Let's review the syntax rules together."
            </p>
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
            title="Topic 3: Imperative Sentences & Moods — Quick Notes"
          />

          <WordDictionary />

          <Teacher
            note="Imperatives give direct voice to action. Keep the implied 'You' in mind when converting imperatives to passive voice! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_003_classification-of-sentences-by-purpose-and-mood/2"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 2 (Question Tags)</span>
          </a>

          <a
            href="/english-grammar/topic/001_003_classification-of-sentences-by-purpose-and-mood/4"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 4 (Exclamatory Sentences)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
