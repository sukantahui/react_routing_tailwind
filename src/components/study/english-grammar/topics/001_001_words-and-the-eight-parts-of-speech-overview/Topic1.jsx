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
  Unlock,
  Lock,
  Boxes,
  Cpu,
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
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

export default function Topic1() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeTab, setActiveTab] = useState("open");

  const openClasses = [
    {
      name: "Nouns",
      desc: "Naming words for entities, people, places, concepts, and technologies.",
      modernExamples: ["smartphone", "algorithm", "cybersecurity", "webinar", "cryptocurrency"],
      descBn: "ব্যক্তি, বস্তু, স্থান, প্রযুক্তি বা ধারণার নাম। নতুন আবিষ্কারের সাথে সাথে নিত্যনতুন Noun যুক্ত হয়।"
    },
    {
      name: "Lexical Verbs",
      desc: "Action and state words expressing operations, events, and dynamic processes.",
      modernExamples: ["to google", "to download", "to livestream", "to debug", "to optimize"],
      descBn: "সক্রিয় কাজ বা অবস্থা নির্দেশক Verb। ইন্টারনেটের যুগে অসংখ্য নতুন Verb যুক্ত হয়েছে।"
    },
    {
      name: "Adjectives",
      desc: "Qualifying and describing words modifying nominal entities.",
      modernExamples: ["algorithmic", "viral", "user-friendly", "cloud-native", "photogenic"],
      descBn: "Noun-এর বৈশিষ্ট্য, দোষ বা গুণ প্রকাশক শব্দ।"
    },
    {
      name: "Adverbs",
      desc: "Modifiers for verbs, adjectives, and other adverbs expressing manner, degree, or time.",
      modernExamples: ["seamlessly", "algorithmically", "cybernetically", "wirelessly", "globally"],
      descBn: "Verb বা Adjective-এর ধরন, মাত্রা বা গতি নির্দেশক পদ।"
    }
  ];

  const closedClasses = [
    {
      name: "Pronouns",
      desc: "Deictic nominal substitutes maintaining sentence cohesion without endless repetition.",
      examples: ["he", "she", "it", "they", "someone", "whose", "themselves"],
      descBn: "Noun-এর পুনরাবৃত্তি এড়ানোর জন্য ব্যবহৃত সর্বনাম। এর সংখ্যা নির্দিষ্ট।"
    },
    {
      name: "Prepositions",
      desc: "Syntactic relators expressing spatial, temporal, causal, and logical positioning.",
      examples: ["in", "on", "at", "through", "beneath", "despite", "towards"],
      descBn: "বাক্যের মধ্যে স্থান, কাল বা সম্পর্ক স্থাপনকারী পদান্বয়ী অব্যয়।"
    },
    {
      name: "Conjunctions",
      desc: "Clause and phrase binders establishing coordination, subordination, and correlation.",
      examples: ["and", "but", "although", "because", "unless", "neither...nor"],
      descBn: "বাক্যাংশ বা শব্দগুচ্ছ যুক্তকারী সংযোজক অব্যয়।"
    },
    {
      name: "Determiners & Articles",
      desc: "Nominal specifiers establishing definiteness, quantity, and reference scope.",
      examples: ["the", "a / an", "this", "these", "every", "some", "few"],
      descBn: "Noun-এর পূর্বে বসে তার নির্দিষ্টতা বা সংখ্যা নির্দেশ করে।"
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
                  Module 001_001 · Topic 1
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Word Classes: Open Classes vs Closed Classes
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Discover the fundamental architectural division of the English lexicon. Understand why content words expand infinitely while structural function words remain constant.
              </p>
            </div>

            {/* Language Switcher Button */}
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
                  ইংরেজি ভাষার শব্দসমূহকে প্রধান দুটি ভাগে ভাগ করা হয়: <strong>Open Class (উন্মুক্ত শ্রেণী)</strong> যা সর্বদা নতুন শব্দ গ্রহণ করতে পারে (Noun, Verb, Adjective, Adverb), এবং <strong>Closed Class (বদ্ধ শ্রেণী)</strong> যার সদস্য সংখ্যা নির্দিষ্ট ও অপরিবর্তনীয় (Pronoun, Preposition, Conjunction, Determiner)।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Tab Switcher */}
        <div className="flex gap-3 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab("open")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "open"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-950 border border-blue-400"
                : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
            }`}
          >
            <Unlock className="w-4 h-4" />
            <span>Open Classes (Content Words)</span>
          </button>
          <button
            onClick={() => setActiveTab("closed")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "closed"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-950 border border-purple-400"
                : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Closed Classes (Function Words)</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "open" ? (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-3xl bg-blue-950/20 border border-blue-500/30">
              <h2 className="text-xl font-bold text-blue-300 flex items-center gap-2">
                <Boxes className="w-5 h-5 text-blue-400" />
                The Four Open Classes (Dynamic Content Creators)
              </h2>
              <p className="text-slate-300 text-sm mt-2">
                These word classes carry primary semantic meaning and are infinitely expandable as technology, science, and society evolve.
              </p>
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
                Nouns & Pronouns in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                Nouns are the official name tags of everything. Pronouns are the helpful substitutes.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              Names vs Stand-ins
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Nouns = The Official Name Tags</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                A Noun is simply any word that names a person, place, physical object, or abstract concept (e.g. Swadeep, Kolkata, computer, freedom).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 [Swadeep] bought a new [laptop] in [Barrackpore].
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Pronouns = The Smart Substitutes</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Without pronouns, you would have to say: "Swadeep took Swadeep's bag because Swadeep was late." Pronouns fix this: "Swadeep took HIS bag because HE was late."
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 [He] loves [his] mentor because [he] guides [him].
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
                <span className="text-xs font-bold text-blue-400 block font-mono">Proper Noun</span>
                <p className="text-xs text-slate-300">Specific Capitalized Name: Swadeep, Barrackpore</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block font-mono">Common Noun</span>
                <p className="text-xs text-slate-300">General Category: student, city, computer</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">Personal Pronoun</span>
                <p className="text-xs text-slate-300">Direct Person: I, you, he, she, they, we</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Possessive Pronoun</span>
                <p className="text-xs text-slate-300">Ownership: his, her, their, my, our</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "Debangshu opened his laptop because he wanted to test the program."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>খুব সহজ ভাষায় নাম ও সর্বনাম:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                Noun হলো যেকোনো কিছুর আসল নাম (ব্যক্তি, বস্তু, স্থান, ভাব)। আর একই নাম বারবার না বলে তার জায়গায় যে শব্দ বসাই (He, She, It, They) তা-ই হলো Pronoun।
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
                Nouns & Pronouns in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                Nouns are the official name tags of everything. Pronouns are the helpful substitutes.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              Names vs Stand-ins
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Nouns = The Official Name Tags</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                A Noun is simply any word that names a person, place, physical object, or abstract concept (e.g. Swadeep, Kolkata, computer, freedom).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 [Swadeep] bought a new [laptop] in [Barrackpore].
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Pronouns = The Smart Substitutes</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Without pronouns, you would have to say: "Swadeep took Swadeep's bag because Swadeep was late." Pronouns fix this: "Swadeep took HIS bag because HE was late."
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 [He] loves [his] mentor because [he] guides [him].
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
                <span className="text-xs font-bold text-blue-400 block font-mono">Proper Noun</span>
                <p className="text-xs text-slate-300">Specific Capitalized Name: Swadeep, Barrackpore</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block font-mono">Common Noun</span>
                <p className="text-xs text-slate-300">General Category: student, city, computer</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">Personal Pronoun</span>
                <p className="text-xs text-slate-300">Direct Person: I, you, he, she, they, we</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Possessive Pronoun</span>
                <p className="text-xs text-slate-300">Ownership: his, her, their, my, our</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "Debangshu opened his laptop because he wanted to test the program."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>খুব সহজ ভাষায় নাম ও সর্বনাম:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                Noun হলো যেকোনো কিছুর আসল নাম (ব্যক্তি, বস্তু, স্থান, ভাব)। আর একই নাম বারবার না বলে তার জায়গায় যে শব্দ বসাই (He, She, It, They) তা-ই হলো Pronoun।
              </p>
            </div>
          )}
        </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {openClasses.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-xs font-bold font-mono">
                      Class #{idx + 1}
                    </span>
                    <span className="text-xs text-slate-500">Open & Expandable</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.name}</h3>
                  <p className="text-slate-300 text-sm">{item.desc}</p>
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-xs font-semibold text-slate-400">Modern Digital Examples:</span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {item.modernExamples.map((ex, exIdx) => (
                        <span key={exIdx} className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-blue-200 text-xs font-mono">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                  {showBengali && (
                    <p className="text-xs text-emerald-300 border-t border-slate-800/80 pt-2">
                      <strong>বাংলা নোট:</strong> {item.descBn}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-3xl bg-purple-950/20 border border-purple-500/30">
              <h2 className="text-xl font-bold text-purple-300 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-400" />
                The Core Closed Classes (Syntactic Architecture & Connectors)
              </h2>
              <p className="text-slate-300 text-sm mt-2">
                These word classes provide the structural skeleton of English. Their total inventory is finite (~300 words) and forms the invariant rules of grammar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {closedClasses.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold font-mono">
                      Class #{idx + 1}
                    </span>
                    <span className="text-xs text-slate-500">Fixed & Stable</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.name}</h3>
                  <p className="text-slate-300 text-sm">{item.desc}</p>
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-xs font-semibold text-slate-400">Core Examples:</span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {item.examples.map((ex, exIdx) => (
                        <span key={exIdx} className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-purple-200 text-xs font-mono">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                  {showBengali && (
                    <p className="text-xs text-emerald-300 border-t border-slate-800/80 pt-2">
                      <strong>বাংলা নোট:</strong> {item.descBn}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visual Architecture & Lexicon Tree Diagram */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white">Visual Architecture: The Two Great Lexicon Hemispheres</h2>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-center overflow-x-auto">
            <svg viewBox="0 0 800 240" className="w-full max-w-3xl text-xs font-mono select-none" xmlns="http://www.w3.org/2000/svg">
              {/* Root */}
              <rect x="290" y="10" width="220" height="40" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
              <text x="400" y="35" fill="#e0e7ff" textAnchor="middle" fontWeight="bold" fontSize="13">THE ENGLISH LEXICON</text>

              {/* Branch Left: Open */}
              <path d="M 330 50 L 200 90" stroke="#3b82f6" strokeWidth="2" fill="none" />
              <rect x="70" y="90" width="260" height="45" rx="8" fill="#172554" stroke="#3b82f6" strokeWidth="2" />
              <text x="200" y="112" fill="#93c5fd" textAnchor="middle" fontWeight="bold" fontSize="12">OPEN CLASSES (Content)</text>
              <text x="200" y="127" fill="#60a5fa" textAnchor="middle" fontSize="10">Infinite · Meaning Carriers · Dynamic</text>

              {/* Branch Right: Closed */}
              <path d="M 470 50 L 600 90" stroke="#a855f7" strokeWidth="2" fill="none" />
              <rect x="470" y="90" width="260" height="45" rx="8" fill="#3b0764" stroke="#a855f7" strokeWidth="2" />
              <text x="600" y="112" fill="#d8b4fe" textAnchor="middle" fontWeight="bold" fontSize="12">CLOSED CLASSES (Structure)</text>
              <text x="600" y="127" fill="#c084fc" textAnchor="middle" fontSize="10">~300 Items · Grammatical Scaffolding</text>

              {/* Open Class Items */}
              <rect x="30" y="160" width="75" height="40" rx="6" fill="#0f172a" stroke="#38bdf8" />
              <text x="67" y="185" fill="#38bdf8" textAnchor="middle" fontWeight="bold">NOUN</text>
              <rect x="115" y="160" width="75" height="40" rx="6" fill="#0f172a" stroke="#38bdf8" />
              <text x="152" y="185" fill="#38bdf8" textAnchor="middle" fontWeight="bold">VERB</text>
              <rect x="200" y="160" width="75" height="40" rx="6" fill="#0f172a" stroke="#38bdf8" />
              <text x="237" y="185" fill="#38bdf8" textAnchor="middle" fontWeight="bold">ADJECTIVE</text>
              <rect x="285" y="160" width="75" height="40" rx="6" fill="#0f172a" stroke="#38bdf8" />
              <text x="322" y="185" fill="#38bdf8" textAnchor="middle" fontWeight="bold">ADVERB</text>

              {/* Closed Class Items */}
              <rect x="440" y="160" width="75" height="40" rx="6" fill="#0f172a" stroke="#c084fc" />
              <text x="477" y="185" fill="#c084fc" textAnchor="middle" fontWeight="bold">PRONOUN</text>
              <rect x="525" y="160" width="75" height="40" rx="6" fill="#0f172a" stroke="#c084fc" />
              <text x="562" y="185" fill="#c084fc" textAnchor="middle" fontWeight="bold">PREP</text>
              <rect x="610" y="160" width="75" height="40" rx="6" fill="#0f172a" stroke="#c084fc" />
              <text x="647" y="185" fill="#c084fc" textAnchor="middle" fontWeight="bold">CONJ</text>
              <rect x="695" y="160" width="75" height="40" rx="6" fill="#0f172a" stroke="#c084fc" />
              <text x="732" y="185" fill="#c084fc" textAnchor="middle" fontWeight="bold">DET/ART</text>
            </svg>
          </div>
        </div>

        {/* High-Level Comparison Matrix */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Comparative Matrix: Content vs Structure</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950 text-slate-400 text-xs uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3">Criterion</th>
                  <th className="p-3 text-blue-400">Open Classes</th>
                  <th className="p-3 text-purple-400">Closed Classes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300 text-xs sm:text-sm">
                <tr>
                  <td className="p-3 font-semibold text-white">Membership</td>
                  <td className="p-3">Infinite, continuously expanding</td>
                  <td className="p-3">Fixed, strictly limited (~300 items)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Primary Role</td>
                  <td className="p-3">Carries conceptual & lexical meaning</td>
                  <td className="p-3">Provides grammatical relationships & glue</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Spoken Stress</td>
                  <td className="p-3">Typically stressed (Content words)</td>
                  <td className="p-3">Typically unstressed (Function words)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Learning Strategy</td>
                  <td className="p-3">Acquire via continuous reading & vocabulary</td>
                  <td className="p-3">Master structural rules & paradigms thoroughly</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Topic 1 Diagnostic Assessment (25 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 1: Open Classes vs Closed Classes — Quick Revision Notes"
          />

          <WordDictionary />

          <Teacher
            note="Closed classes form the grammatical skeleton of English. Master pronouns, prepositions, and conjunctions first, and your syntax will never collapse! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_001_words-and-the-eight-parts-of-speech-overview/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 0 (What is Grammar)</span>
          </a>

          <a
            href="/english-grammar/topic/001_001_words-and-the-eight-parts-of-speech-overview/2"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 2 (Form vs Function)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
