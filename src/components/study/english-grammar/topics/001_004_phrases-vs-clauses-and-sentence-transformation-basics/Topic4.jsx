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
  Scale,
  ShieldCheck,
  Compass,
  Lightbulb,
  Target,
  Heart
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

export default function Topic4() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedTransformationTab, setSelectedTransformationTab] = useState(0);

  const transformationPrinciples = [
    {
      title: "Transformation vs Conversion",
      formula: "Form Changes | Meaning = 100% Invariant",
      conversion: "He is solvent. -> He is not solvent. ❌ (Conversion - Meaning destroyed)",
      transformation: "He is solvent. → He is not insolvent. ✅ (Transformation - Meaning preserved)",
      rule: "Never negate a predicate without pairing it with an opposing semantic antonym or litotic structure.",
      ruleBn: "বাক্য রূপান্তরের প্রধান শর্ত হল অর্থের সম্পূর্ণ সংরক্ষণ। কেবল 'not' বসালে অর্থ বদলে যায়, কিন্তু 'not + antonym' বসালে অর্থ অক্ষুণ্ণ থাকে।"
    },
    {
      title: "Tense Integrity Rule",
      formula: "Source Tense = Transformed Tense",
      conversion: "She worked hard. → She does not neglect work. ❌ (Tense shifted from Past to Present)",
      transformation: "She worked hard. → She did not neglect work. ✅ (Past tense maintained)",
      rule: "The grammatical tense of the finite matrix verb must be preserved unless explicitly instructed otherwise.",
      ruleBn: "মূল বাক্যের Tense কোনো অবস্থাতেই রূপান্তরের সময় পরিবর্তন করা যাবে না।"
    },
    {
      title: "Double Negative & Litotes",
      formula: "Not without / Never fails to + Base Concept",
      conversion: "He remembered his promise. → He did not forget his promise. ✅",
      transformation: "She loves classical music. → She is not without love for classical music. ✅",
      rule: "Double negation softens or elevates the tone while reinforcing certainty in academic prose.",
      ruleBn: "Litotes বা দ্বৈত নেতিবাচক গঠন বাক্যে আভিজাত্য ও জোরালো স্বীকৃতি প্রদান করে।"
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
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Segment 1 · Foundations
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Module 001_004 · Topic 4
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Transformation Basics & The Golden Rule of Grammar
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Discover the foundational law of sentence transformation: structural metamorphosis with 100% semantic fidelity and tense preservation.
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
                <p className="font-semibold text-amber-300">The Golden Rule of Grammar:</p>
                <p className="text-amber-200/90 text-xs mt-1 leading-relaxed">
                  Sentence Transformation-এর একমাত্র মূল কথা হল: <em>"অর্থের কোনো পরিবর্তন হবে না, কেবল গঠন বদলাবে।"</em> পরীক্ষার খাতায় রূপান্তরের সময় অর্থ পরিবর্তন করলে পুরো নম্বর কাটা যায়।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Principle Studio */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Scale className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white">The 3 Transformation Invariants</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Core Principles</span>
          </div>

          {/* Principle Tabs */}
          
        
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
                The Golden Rule of Transformation in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                You can change the shape, the words, or the clause structure, but you MUST protect the original meaning with 100% fidelity.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              The Golden Law
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Transformation vs Conversion</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Conversion changes meaning (making a true fact false). Transformation keeps the exact truth alive in a new grammatical skin.
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 "He is rich" → "He is NOT poor" (100% Meaning Preserved).
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Tense & Polarity Safeguard</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                If the original sentence was in the past, your transformed sentence MUST stay in the past. Never change historical facts or tenses.
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 Past stays Past; Present stays Present.
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
                <span className="text-xs font-bold text-emerald-400 block font-mono">Meaning Invariant</span>
                <p className="text-xs text-slate-300">Never alter the factual message</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-blue-400 block font-mono">Tense Invariant</span>
                <p className="text-xs text-slate-300">Past remains past; present remains present</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">Degree Interchange</span>
                <p className="text-xs text-slate-300">Superlative ↔ Comparative ↔ Positive</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Structure Shift</span>
                <p className="text-xs text-slate-300">Simple ↔ Compound ↔ Complex</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "Iron is the most useful metal" ↔ "No other metal is as useful as iron".
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় রূপান্তরের স্বর্ণসূত্র:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                Transformation-এর একমাত্র মূল নিয়ম: বাক্যের গঠন বা বাহ্যিক রূপ যতই বদলানো হোক না কেন, বাক্যের আসল অর্থ এবং Tense একচুলও পরিবর্তন করা যাবে না।
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
                The Golden Rule of Transformation in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                You can change the shape, the words, or the clause structure, but you MUST protect the original meaning with 100% fidelity.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              The Golden Law
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Transformation vs Conversion</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Conversion changes meaning (making a true fact false). Transformation keeps the exact truth alive in a new grammatical skin.
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 "He is rich" → "He is NOT poor" (100% Meaning Preserved).
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Tense & Polarity Safeguard</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                If the original sentence was in the past, your transformed sentence MUST stay in the past. Never change historical facts or tenses.
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 Past stays Past; Present stays Present.
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
                <span className="text-xs font-bold text-emerald-400 block font-mono">Meaning Invariant</span>
                <p className="text-xs text-slate-300">Never alter the factual message</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-blue-400 block font-mono">Tense Invariant</span>
                <p className="text-xs text-slate-300">Past remains past; present remains present</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">Degree Interchange</span>
                <p className="text-xs text-slate-300">Superlative ↔ Comparative ↔ Positive</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Structure Shift</span>
                <p className="text-xs text-slate-300">Simple ↔ Compound ↔ Complex</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "Iron is the most useful metal" ↔ "No other metal is as useful as iron".
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় রূপান্তরের স্বর্ণসূত্র:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                Transformation-এর একমাত্র মূল নিয়ম: বাক্যের গঠন বা বাহ্যিক রূপ যতই বদলানো হোক না কেন, বাক্যের আসল অর্থ এবং Tense একচুলও পরিবর্তন করা যাবে না।
              </p>
            </div>
          )}
        </div>

<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {transformationPrinciples.map((tp, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTransformationTab(idx)}
                className={`p-3.5 rounded-2xl text-left text-xs font-semibold transition border ${
                  selectedTransformationTab === idx
                    ? "bg-amber-600 text-white border-amber-400 shadow-lg shadow-amber-950"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="text-[10px] uppercase font-mono opacity-75">Law #{idx + 1}</div>
                <div className="mt-1 font-bold truncate">{tp.title}</div>
              </button>
            ))}
          </div>

          {/* Active Principle Card */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-5 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold uppercase font-mono">
                {transformationPrinciples[selectedTransformationTab].title}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Invariant: {transformationPrinciples[selectedTransformationTab].formula}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Flawed / Invalid Attempt
                </span>
                <p className="font-mono text-xs text-rose-200">{transformationPrinciples[selectedTransformationTab].conversion}</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Valid Equivalent Transformation
                </span>
                <p className="font-mono text-xs text-emerald-200 font-bold">{transformationPrinciples[selectedTransformationTab].transformation}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Sukanta Sir's Axiom</span>
              <p className="text-xs text-slate-300 leading-relaxed">{transformationPrinciples[selectedTransformationTab].rule}</p>
              {showBengali && (
                <p className="text-xs text-amber-300/90 pt-1 border-t border-slate-800 leading-relaxed">
                  <strong>বাংলা গাইড:</strong> {transformationPrinciples[selectedTransformationTab].ruleBn}
                </p>
              )}
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
            title="Topic 4: Transformation Basics Notes"
          />

          <WordDictionary />

          <Teacher
            note="Grammar is an exact science: change the casing, change the packaging, but guard the meaning with your life! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_004_phrases-vs-clauses-and-sentence-transformation-basics/3"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 3 (Independent vs Subordinate)</span>
          </a>

          <a
            href="/english-grammar/topic/001_004_phrases-vs-clauses-and-sentence-transformation-basics/5"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 5 (Affirmative ↔ Negative)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
