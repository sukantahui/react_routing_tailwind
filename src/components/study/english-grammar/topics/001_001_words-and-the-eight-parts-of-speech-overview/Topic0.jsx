import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  Languages,
  Zap,
  RotateCcw,
  Check,
  Layers,
  Search,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  BookA,
  Compass,
  Lightbulb,
  Target,
  Heart
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedWordIndex, setSelectedWordIndex] = useState(0);
  const [interactiveSentenceId, setInteractiveSentenceId] = useState(0);

  // Multi-function word data for interactive testing
  const multiFunctionWords = [
    {
      word: "WATER",
      roles: [
        {
          pos: "Noun",
          color: "border-blue-500/40 bg-blue-950/30 text-blue-300",
          sentence: "Drink pure water daily to maintain health.",
          explanation: "Functions as the direct object naming a physical substance.",
          explanationBn: "এখানে 'water' একটি ভৌত পদার্থের নাম বুঝিয়ে Direct Object Noun হিসেবে কাজ করছে।"
        },
        {
          pos: "Verb",
          color: "border-emerald-500/40 bg-emerald-950/30 text-emerald-300",
          sentence: "Please water the plants in the rooftop garden.",
          explanation: "Functions as an imperative finite verb expressing the action of irrigating.",
          explanationBn: "এখানে 'water' গাছপালায় জল দেওয়ার সক্রিয় কাজটি বুঝিয়ে Imperative Verb হিসেবে কাজ করছে।"
        },
        {
          pos: "Adjective",
          color: "border-amber-500/40 bg-amber-950/30 text-amber-300",
          sentence: "Swadeep purchased a new water filter for the laboratory.",
          explanation: "Attributive noun-adjunct modifying the noun 'filter'.",
          explanationBn: "এখানে 'water' শব্দটি 'filter' Noun-এর পূর্বে বসে তার গুণ/উদ্দেশ্য বর্ণনা করায় Adjective-এর মতো কাজ করছে।"
        }
      ]
    },
    {
      word: "FAST",
      roles: [
        {
          pos: "Adjective",
          color: "border-amber-500/40 bg-amber-950/30 text-amber-300",
          sentence: "This is a fast train to Barrackpore station.",
          explanation: "Directly qualifies the noun 'train' (What kind of train? A fast train).",
          explanationBn: "'train' Noun-টিকে qualify করছে, তাই এটি Attributive Adjective।"
        },
        {
          pos: "Adverb",
          color: "border-purple-500/40 bg-purple-950/30 text-purple-300",
          sentence: "He ran fast to catch the 8:30 AM local.",
          explanation: "Modifies the action verb 'ran' (How did he run? Fast). Note: 'Fastly' does not exist.",
          explanationBn: "'ran' Action Verb-কে modify করছে, তাই এটি Adverb of Manner। ইংরেজিতে 'Fastly' বলে কোনো শব্দ নেই।"
        },
        {
          pos: "Noun",
          color: "border-blue-500/40 bg-blue-950/30 text-blue-300",
          sentence: "The devotee broke his 24-hour fast at sundown.",
          explanation: "Preceded by possessive and modifier, functioning as the object of 'broke' (period of abstinence).",
          explanationBn: "উপবাস অর্থে 'broke' Verb-এর Direct Object হিসেবে Noun রূপে ব্যবহৃত।"
        },
        {
          pos: "Verb",
          color: "border-emerald-500/40 bg-emerald-950/30 text-emerald-300",
          sentence: "Many people fast during auspicious festivals.",
          explanation: "Expresses the voluntary action of abstaining from food.",
          explanationBn: "উপবাস করার কাজ বুঝিয়ে Action Verb হিসেবে ব্যবহৃত হয়েছে।"
        }
      ]
    },
    {
      word: "ROUND",
      roles: [
        {
          pos: "Adjective",
          color: "border-amber-500/40 bg-amber-950/30 text-amber-300",
          sentence: "The children sat around a large round table.",
          explanation: "Describes the geometric shape of the noun 'table'.",
          explanationBn: "'table' Noun-এর আকৃতি বর্ণনা করে Adjective হিসেবে বসেছে।"
        },
        {
          pos: "Noun",
          color: "border-blue-500/40 bg-blue-950/30 text-blue-300",
          sentence: "The physician made his morning round in the hospital.",
          explanation: "Denotes a recurring circuit or tour of inspection.",
          explanationBn: "হাসপাতালের নিয়মিত পরিদর্শন অর্থে Noun হিসেবে কাজ করছে।"
        },
        {
          pos: "Verb",
          color: "border-emerald-500/40 bg-emerald-950/30 text-emerald-300",
          sentence: "The sleek cars round the sharp curve effortlessly.",
          explanation: "Expresses the action of passing or turning around an obstacle.",
          explanationBn: "বাঁক ঘোরার কাজটি বুঝিয়ে Verb হিসেবে ব্যবহৃত।"
        },
        {
          pos: "Preposition",
          color: "border-rose-500/40 bg-rose-950/30 text-rose-300",
          sentence: "The moon revolves round the earth.",
          explanation: "Followed by the nominal object 'the earth' showing spatial orbital relation.",
          explanationBn: "'the earth' Nominal Object-এর পূর্বে বসে স্থানিক সম্পর্ক বুঝিয়ে Preposition হিসেবে বসেছে।"
        }
      ]
    },
    {
      word: "BUT",
      roles: [
        {
          pos: "Conjunction",
          color: "border-cyan-500/40 bg-cyan-950/30 text-cyan-300",
          sentence: "Tuhina studied diligently, but she missed the distinction.",
          explanation: "Connects two independent clauses expressing contrast (FANBOYS).",
          explanationBn: "দুটি Independent Clauses-কে বিপরীত ভাব সহকারে যুক্ত করে Coordinating Conjunction হিসেবে বসেছে।"
        },
        {
          pos: "Preposition",
          color: "border-rose-500/40 bg-rose-950/30 text-rose-300",
          sentence: "All the students but Swadeep attended the morning seminar.",
          explanation: "Means 'except' followed by the noun 'Swadeep'.",
          explanationBn: "'Except' (ব্যতীত) অর্থে 'Swadeep' Noun-এর পূর্বে বসে Preposition হিসেবে কাজ করছে।"
        },
        {
          pos: "Adverb",
          color: "border-purple-500/40 bg-purple-950/30 text-purple-300",
          sentence: "It is but a minor calculation error.",
          explanation: "Means 'only' or 'merely', modifying the noun phrase / predicate.",
          explanationBn: "'Only' (কেবলমাত্র) অর্থে ব্যবহৃত হয়ে Adverb হিসেবে কাজ করছে।"
        }
      ]
    }
  ];

  // Interactive sentence parsing items
  const diagnosticSentences = [
    {
      sentence: "The exceptionally brilliant student answered every difficult question with utmost confidence.",
      breakdown: [
        { word: "The", pos: "Definite Article / Determiner", desc: "Specifies the singular noun 'student'." },
        { word: "exceptionally", pos: "Adverb of Degree", desc: "Modifies the adjective 'brilliant'." },
        { word: "brilliant", pos: "Attributive Adjective", desc: "Qualifies the noun 'student'." },
        { word: "student", pos: "Common Noun (Subject)", desc: "The syntactic agent performing the action." },
        { word: "answered", pos: "Transitive Verb (Past Simple V2)", desc: "The core finite predicate verb." },
        { word: "every", pos: "Distributive Determiner", desc: "Modifies the object noun 'question'." },
        { word: "difficult", pos: "Adjective", desc: "Describes the nature of the questions." },
        { word: "question", pos: "Noun (Direct Object)", desc: "Receives the action of 'answered'." },
        { word: "with", pos: "Preposition of Manner", desc: "Connects the prepositional object 'confidence'." },
        { word: "utmost", pos: "Adjective", desc: "Quantifies the degree of 'confidence'." },
        { word: "confidence", pos: "Abstract Noun", desc: "Object of the preposition 'with'." }
      ]
    },
    {
      sentence: "Alas! She worked hard, yet she could not arrive on time.",
      breakdown: [
        { word: "Alas!", pos: "Interjection", desc: "Expresses grief/sorrow; grammatically independent." },
        { word: "She", pos: "Personal Pronoun (Subject)", desc: "Replaces the female subject." },
        { word: "worked", pos: "Intransitive Verb (V2)", desc: "Action performed by the subject." },
        { word: "hard,", pos: "Adverb of Manner", desc: "Modifies 'worked' (Not an adjective here!)." },
        { word: "yet", pos: "Coordinating Conjunction", desc: "Links contrasting clauses (FANBOYS)." },
        { word: "she", pos: "Personal Pronoun", desc: "Subject of the second clause." },
        { word: "could", pos: "Modal Auxiliary Verb", desc: "Expresses past ability." },
        { word: "not", pos: "Negative Adverb / Particle", desc: "Negates the predicate." },
        { word: "arrive", pos: "Base Verb (Infinitive)", desc: "Main lexical verb after modal." },
        { word: "on", pos: "Preposition of Time/Condition", desc: "Governs 'time'." },
        { word: "time.", pos: "Abstract Noun", desc: "Object of the preposition 'on'." }
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
                The 8 Parts of Speech in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                Think of English as a sports team: every word has a specific position and duty on the field.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              The 8 Word Roles
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. The Main Players (Nouns, Pronouns, Verbs)</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Nouns name things (Swadeep, laptop), Pronouns substitute for names (he, it), and Verbs do the action or show existence (codes, is).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 [Swadeep] [codes] [his] program.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. The Modifiers & Connectors (Adj, Adv, Prep, Conj, Interj)</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Adjectives describe things (smart), Adverbs describe actions (swiftly), Prepositions show position (in the lab), Conjunctions bridge ideas (and), and Interjections show raw emotion (Wow!).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 Wow! The [smart] student codes [swiftly] [in] the lab [and] succeeds.
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
                <span className="text-xs font-bold text-blue-400 block font-mono">1. Noun / Pronoun</span>
                <p className="text-xs text-slate-300">Who/What: Swadeep, teammates, app</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block font-mono">2. Verb</span>
                <p className="text-xs text-slate-300">The Action: created</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">3. Adj / Adv</span>
                <p className="text-xs text-slate-300">The Qualities: brilliant, swiftly</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">4. Prep / Conj / Interj</span>
                <p className="text-xs text-slate-300">Connect & Emotion: at, and, Wow!</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "Wow! Swadeep and his brilliant teammates swiftly created an app at Barrackpore."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>খুব সহজ ভাষায় ৮টি পার্টস অফ স্পিচ:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                ১. Noun: যেকোনো কিছুর নাম। ২. Pronoun: নামের পরিবর্তে বসা শব্দ (He/She)। ৩. Verb: কাজ বা হওয়া। ৪. Adjective: Noun-এর দোষ/গুণ। ৫. Adverb: Verb-এর কাজের ধরন/সময়। ৬. Preposition: স্থান/সময়ের অবস্থান। ৭. Conjunction: যুক্ত করার সেতু (and/but)। ৮. Interjection: হঠাৎ আবেগ (Wow/Alas)।
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
                The 8 Parts of Speech in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                Think of English as a sports team: every word has a specific position and duty on the field.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              The 8 Word Roles
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. The Main Players (Nouns, Pronouns, Verbs)</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Nouns name things (Swadeep, laptop), Pronouns substitute for names (he, it), and Verbs do the action or show existence (codes, is).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 [Swadeep] [codes] [his] program.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. The Modifiers & Connectors (Adj, Adv, Prep, Conj, Interj)</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Adjectives describe things (smart), Adverbs describe actions (swiftly), Prepositions show position (in the lab), Conjunctions bridge ideas (and), and Interjections show raw emotion (Wow!).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 Wow! The [smart] student codes [swiftly] [in] the lab [and] succeeds.
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
                <span className="text-xs font-bold text-blue-400 block font-mono">1. Noun / Pronoun</span>
                <p className="text-xs text-slate-300">Who/What: Swadeep, teammates, app</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block font-mono">2. Verb</span>
                <p className="text-xs text-slate-300">The Action: created</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">3. Adj / Adv</span>
                <p className="text-xs text-slate-300">The Qualities: brilliant, swiftly</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">4. Prep / Conj / Interj</span>
                <p className="text-xs text-slate-300">Connect & Emotion: at, and, Wow!</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "Wow! Swadeep and his brilliant teammates swiftly created an app at Barrackpore."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>খুব সহজ ভাষায় ৮টি পার্টস অফ স্পিচ:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                ১. Noun: যেকোনো কিছুর নাম। ২. Pronoun: নামের পরিবর্তে বসা শব্দ (He/She)। ৩. Verb: কাজ বা হওয়া। ৪. Adjective: Noun-এর দোষ/গুণ। ৫. Adverb: Verb-এর কাজের ধরন/সময়। ৬. Preposition: স্থান/সময়ের অবস্থান। ৭. Conjunction: যুক্ত করার সেতু (and/but)। ৮. Interjection: হঠাৎ আবেগ (Wow/Alas)।
              </p>
            </div>
          )}
        </div>

{/* ========================================================================= */}
        {/* 1. HERO HEADER WITH BILINGUAL SWITCHER                                   */}
        {/* ========================================================================= */}
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
                  Module 001_001
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Estimated: 2.0 Hours
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Words & The Eight Parts of Speech Overview
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Master the architectural taxonomy of the English language. Understand why syntactic function dictates a word's category rather than its static dictionary form.
              </p>
            </div>

            {/* Language Switcher Toggle */}
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

          {/* Bengali Active Banner Alert */}
          {showBengali && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-sm flex items-start gap-3 animate-fade-in">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-300">বাংলা মাধ্যম শিক্ষার্থীদের জন্য বিশেষ নির্দেশিকা সক্রিয় করা হয়েছে:</p>
                <p className="text-emerald-200/90 text-xs mt-1 leading-relaxed">
                  ইংরেজি ব্যাকরণের সমস্ত টেকনিক্যাল টার্ম (যেমন: <strong>Parts of Speech</strong>, <strong>Open/Closed Classes</strong>, <strong>Noun</strong>, <strong>Verb</strong>, <strong>Adverb</strong>, <strong>Syntactic Function</strong>) মূল ইংরেজিতে রাখা হয়েছে। বাংলা ভাষা ব্যবহার করা হয়েছে মূল কনসেপ্ট পরিষ্কারভাবে বোঝার ও অনুবাদজনিত ভুল এড়ানোর জন্য।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 2. PEDAGOGICAL OBJECTIVES & COURSE OUTCOMES                               */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
              01
            </div>
            <h3 className="text-white font-semibold text-lg">Open vs Closed Classes</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Distinguish between open lexical classes (Nouns, Verbs, Adjectives, Adverbs) that accept new words, and closed grammatical classes (Pronouns, Prepositions, Conjunctions).
            </p>
            {showBengali && (
              <p className="text-emerald-300 text-xs border-t border-slate-800 pt-2 font-medium">
                বাংলা টিপস: Noun, Verb, Adjective-এ নতুন শব্দ তৈরি হয় (Open), কিন্তু Preposition বা Pronoun-এ নতুন শব্দ সচরাচর যোগ হয় না (Closed)।
              </p>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              02
            </div>
            <h3 className="text-white font-semibold text-lg">Form vs Syntactic Function</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Never classify a word in isolation. The exact same word (e.g., <em>fast, water, round, but</em>) functions across multiple parts of speech depending on its syntactic role.
            </p>
            {showBengali && (
              <p className="text-emerald-300 text-xs border-t border-slate-800 pt-2 font-medium">
                বাংলা টিপস: শব্দের বাহ্যিক বানান দেখে নয়, বাক্যে শব্দটি কী কাজ (Function) করছে তা দেখে Part of Speech নির্ণয় করতে হবে।
              </p>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
              03
            </div>
            <h3 className="text-white font-semibold text-lg">Core Sentence Mechanics</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Understand the indispensability of the Finite Verb in English (unlike Bengali zero-copula sentences) and establish a rock-solid base for sentence parsing.
            </p>
            {showBengali && (
              <p className="text-emerald-300 text-xs border-t border-slate-800 pt-2 font-medium">
                বাংলা টিপস: বাংলায় প্রকাশ্য ক্রিয়া ছাড়াও বাক্য হতে পারে ("তিনি শিক্ষক"), কিন্তু ইংরেজিতে Finite Linking Verb বাধ্যতামূলক ("He is a teacher")।
              </p>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. THE 8 PARTS OF SPEECH TAXONOMY GRID                                    */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                <Layers className="w-6 h-6 text-indigo-400" />
                The Eight Parts of Speech Taxonomy
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Every word in English belongs to one of these eight fundamental grammatical families:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Noun */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-colors space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  1. NOUN (Naming Word)
                </span>
                <span className="text-xs text-slate-500 font-mono">Open Class</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Names a person, place, entity, quality, concept, or substance. Serves as Subject, Direct Object, Indirect Object, or Object of Preposition.
              </p>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 font-mono">
                <strong className="text-white">Example:</strong> <em>Barrackpore</em> is famous for its historical <em>cantonment</em> and serene <em>riverfront</em>.
              </div>
              {showBengali && (
                <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/20 text-blue-200 text-xs animate-fade-in">
                  <strong>বাংলা ব্যাখ্যা:</strong> যে পদ কোনো ব্যক্তি, স্থান, বস্তু, গুণ বা ধারণার নাম বোঝায়। বাক্যে Subject বা Object হিসেবে কাজ করে।
                </div>
              )}
            </div>

            {/* 2. Pronoun */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-colors space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  2. PRONOUN (Substitute Word)
                </span>
                <span className="text-xs text-slate-500 font-mono">Closed Class</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Substitutes for a noun or noun phrase (its antecedent) to prevent redundant repetition and ensure cohesive syntactic flow.
              </p>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 font-mono">
                <strong className="text-white">Example:</strong> When <em>Swadeep</em> finished the experiment, <em>he</em> documented <em>it</em> meticulously.
              </div>
              {showBengali && (
                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-cyan-200 text-xs animate-fade-in">
                  <strong>বাংলা ব্যাখ্যা:</strong> Noun-এর পুনরাবৃত্তি এড়াতে তার পরিবর্তে ব্যবহৃত শব্দ। (যেমন: he, she, it, they, which, who)।
                </div>
              )}
            </div>

            {/* 3. Verb */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  3. VERB (The Engine of the Sentence)
                </span>
                <span className="text-xs text-slate-500 font-mono">Open Class (Lexical)</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Expresses physical/mental action, occurrence, state of being (copula), or possession. No complete English clause can exist without a finite verb.
              </p>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 font-mono">
                <strong className="text-white">Example:</strong> Tuhina <em>solved</em> (action) the problem; she <em>is</em> (state) brilliant.
              </div>
              {showBengali && (
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-200 text-xs animate-fade-in">
                  <strong>বাংলা ব্যাখ্যা:</strong> বাক্যের প্রাণকেন্দ্র। কোনো কাজ করা, অবস্থা থাকা বা সম্পর্ক প্রকাশ করাকে Verb বলে। ইংরেজি বাক্যে Finite Verb অপরিহার্য।
                </div>
              )}
            </div>

            {/* 4. Adjective */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-colors space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  4. ADJECTIVE (Descriptive Qualifier)
                </span>
                <span className="text-xs text-slate-500 font-mono">Open Class</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Modifies, qualifies, or specifies a noun or pronoun. Can be used attributively (before a noun) or predicatively (after a linking verb).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 font-mono">
                <strong className="text-white">Example:</strong> The <em>diligent</em> student designed an <em>exceptional</em> algorithm.
              </div>
              {showBengali && (
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/20 text-amber-200 text-xs animate-fade-in">
                  <strong>বাংলা ব্যাখ্যা:</strong> Noun বা Pronoun-এর দোষ, গুণ, অবস্থা, পরিমাণ বা সংখ্যা নির্দেশকারী পদ।
                </div>
              )}
            </div>

            {/* 5. Adverb */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-colors space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  5. ADVERB (Triple-Target Modifier)
                </span>
                <span className="text-xs text-slate-500 font-mono">Open Class</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Modifies a Verb, an Adjective, or another Adverb. Answers the questions: <em>How? When? Where? Why? To what extent?</em>
              </p>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 font-mono">
                <strong className="text-white">Example:</strong> Abhronila explained the concept <em>exceptionally</em> (modifying adv) <em>well</em> (modifying verb).
              </div>
              {showBengali && (
                <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-purple-200 text-xs animate-fade-in">
                  <strong>বাংলা ব্যাখ্যা:</strong> একমাত্র পদ যা Verb, Adjective অথবা অন্য কোনো Adverb-কে modify করতে পারে (কখন, কোথায়, কীভাবে, কতটা)।
                </div>
              )}
            </div>

            {/* 6. Preposition */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/40 transition-colors space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  6. PREPOSITION (Relational Bridge)
                </span>
                <span className="text-xs text-slate-500 font-mono">Closed Class</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Preceding a noun phrase to indicate relationships of time, space, direction, agency, or logical connection to another sentence component.
              </p>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 font-mono">
                <strong className="text-white">Example:</strong> The express train arrived <em>at</em> Barrackpore platform <em>on</em> schedule.
              </div>
              {showBengali && (
                <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/20 text-rose-200 text-xs animate-fade-in">
                  <strong>বাংলা ব্যাখ্যা:</strong> Noun বা Pronoun-এর পূর্বে বসে বাক্যের অন্য পদের সাথে তার স্থান, কাল বা সম্পর্কের বন্ধন স্থাপন করে।
                </div>
              )}
            </div>

            {/* 7. Conjunction */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 transition-colors space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  7. CONJUNCTION (Syntactic Connector)
                </span>
                <span className="text-xs text-slate-500 font-mono">Closed Class</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Connects words, phrases, or clauses. Subdivided into Coordinating (FANBOYS), Subordinating (cause, condition, time), and Correlative pairs.
              </p>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 font-mono">
                <strong className="text-white">Example:</strong> <em>Although</em> the problem was intricate, Debangshu solved it <em>and</em> verified the result.
              </div>
              {showBengali && (
                <div className="p-3 rounded-xl bg-teal-950/30 border border-teal-500/20 text-teal-200 text-xs animate-fade-in">
                  <strong>বাংলা ব্যাখ্যা:</strong> দুই বা ততোধিক শব্দ, Phrase বা Clause-কে যুক্ত করে। (যেমন: and, but, or, because, although, neither...nor)।
                </div>
              )}
            </div>

            {/* 8. Interjection */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-pink-500/40 transition-colors space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
                  8. INTERJECTION (Emotive Outburst)
                </span>
                <span className="text-xs text-slate-500 font-mono">Independent</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                An exclamation expressing spontaneous human emotion (joy, sorrow, surprise, disgust). Has zero grammatical dependency on the clause.
              </p>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 font-mono">
                <strong className="text-white">Example:</strong> <em>Bravo!</em> You completed the diagnostic assessment with 100% accuracy.
              </div>
              {showBengali && (
                <div className="p-3 rounded-xl bg-pink-950/30 border border-pink-500/20 text-pink-200 text-xs animate-fade-in">
                  <strong>বাংলা ব্যাখ্যা:</strong> আকস্মিক আনন্দ, দুঃখ, বিস্ময় বা ক্ষোভ প্রকাশকারী স্বাধীন শব্দ। (যেমন: Alas!, Hurrah!, Oops!, Ouch!)।
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. INTERACTIVE WORD-ROLE SWITCHER (FORM VS FUNCTION)                       */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                Syntactic Lab
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Form vs Syntactic Function: The Multi-Role Switcher
              </h2>
            </div>
            <p className="text-slate-400 text-xs max-w-sm">
              Click a word below to see how its grammatical category transforms when its sentence duty changes:
            </p>
          </div>

          {/* Word Selector Tabs */}
          <div className="flex flex-wrap gap-2.5">
            {multiFunctionWords.map((item, idx) => (
              <button
                key={item.word}
                type="button"
                onClick={() => setSelectedWordIndex(idx)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 border ${
                  selectedWordIndex === idx
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-950/60 scale-105"
                    : "bg-slate-950/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                {item.word}
              </button>
            ))}
          </div>

          {/* Active Word Roles Display */}
          <div className="grid grid-cols-1 gap-4 pt-2">
            {multiFunctionWords[selectedWordIndex].roles.map((role, rIdx) => (
              <div
                key={rIdx}
                className={`p-5 rounded-2xl border transition-all duration-300 ${role.color}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider bg-slate-950/80 border border-white/10 text-white">
                    Role {rIdx + 1}: {role.pos}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Syntactic Duty
                  </span>
                </div>
                <p className="text-lg font-medium text-white mb-2 font-mono">
                  "{role.sentence}"
                </p>
                <p className="text-sm text-slate-300/90 leading-relaxed">
                  <strong className="text-white">Analysis:</strong> {role.explanation}
                </p>
                {showBengali && (
                  <div className="mt-3 pt-3 border-t border-white/10 text-xs text-emerald-300 font-medium animate-fade-in flex items-start gap-2">
                    <Check className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                    <span><strong>বাংলা বিশ্লেষণ:</strong> {role.explanationBn}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. BENGALI LEARNER PEDAGOGICAL TRAPS & WARNING CARDS                      */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-900 border border-amber-500/30 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Bengali-Medium Translation Traps (L1 Interference Matrix)
              </h2>
              <p className="text-xs text-amber-300/80 mt-0.5">
                Critical syntactic mismatches that cause common errors among regional learners:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Trap 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Trap 1: Zero-Copula Error
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                In Bengali, "তিনি একজন শিক্ষক" requires no overt verb. Bengali students often omit the copula in English.
              </p>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300">
                  ❌ Incorrect: <em>"He a teacher."</em>
                </div>
                <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                  ✔️ Correct: <em>"He <strong>is</strong> a teacher."</em>
                </div>
              </div>
              {showBengali && (
                <p className="text-xs text-amber-200/90 pt-1">
                  ইংরেজিতে Linking Verb (is/am/are/was/were) বাক্যের জন্য বাধ্যতামূলক।
                </p>
              )}
            </div>

            {/* Trap 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Trap 2: The '-ly' Suffix Trap
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Assuming all '-ly' words are adverbs. Adding '-ly' to a noun creates an <strong>Adjective</strong>!
              </p>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
                  • <em>Friend + ly = Friendly</em> (Adjective)
                  <br />
                  • <em>Love + ly = Lovely</em> (Adjective)
                </div>
                <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                  ✔️ <em>"He spoke in a friendly manner."</em>
                </div>
              </div>
              {showBengali && (
                <p className="text-xs text-amber-200/90 pt-1">
                  'Friendly' Adverb নয়, তাই "He behaved friendly" ভুল।
                </p>
              )}
            </div>

            {/* Trap 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Trap 3: Word Order (SOV vs SVO)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Bengali syntax follows <strong>Subject + Object + Verb (SOV)</strong>. English strictly mandates <strong>Subject + Verb + Object (SVO)</strong>.
              </p>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
                  বাংলা: <em>আমি (S) চা (O) খাই (V)</em>
                </div>
                <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                  English: <em>I (S) drink (V) tea (O).</em>
                </div>
              </div>
              {showBengali && (
                <p className="text-xs text-amber-200/90 pt-1">
                  বাংলা পদক্রম ইংরেজি বাক্যে সরাসরি প্রয়োগ করলে বাক্য ভুল হয়।
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. INTERACTIVE SENTENCE PARSING WORKBENCH                                  */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                Diagnostic Parsing Workbench
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Deconstruct Real Sentences Word-by-Word
              </h2>
            </div>
            <div className="flex gap-2">
              {diagnosticSentences.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setInteractiveSentenceId(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    interactiveSentenceId === i
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-950"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  Sentence {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-lg font-mono text-emerald-300 leading-relaxed shadow-inner">
            "{diagnosticSentences[interactiveSentenceId].sentence}"
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider">Word</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider">Assigned Part of Speech</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider">Syntactic Function / Proof</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                {diagnosticSentences[interactiveSentenceId].breakdown.map((row, rI) => (
                  <tr key={rI} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-4 font-bold text-white">{row.word}</td>
                    <td className="py-2.5 px-4 text-indigo-300">{row.pos}</td>
                    <td className="py-2.5 px-4 text-slate-400 font-sans">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 7. CLASSROOM DIALOGUE WITH SUKANTA SIR                                    */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Classroom Dialogue: Master Mentor Sukanta Sir & Students
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Live interactive discussion at Coder & AccoTax, Barrackpore Center
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed">
            {/* Dialogue 1: Swadeep */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-400">Swadeep (Student):</span>
                <span className="text-slate-500 font-mono">Question on Classification</span>
              </div>
              <p className="text-slate-300">
                "Sir, when I see the word <em>'iron'</em> in a dictionary, it says it's a noun. But in the sentence <em>'Please iron this shirt'</em>, what is its true Part of Speech?"
              </p>
            </div>

            {/* Response 1: Sukanta Sir */}
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-1.5 ml-4 sm:ml-8">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400">Sukanta Sir (Mentor):</span>
                <span className="text-indigo-400 font-mono font-semibold">The Fundamental Law</span>
              </div>
              <p className="text-slate-200">
                "Excellent observation, Swadeep! A word in isolation in a dictionary is merely potential energy. When placed in a sentence, its <strong>syntactic duty</strong> determines its identity. In <em>'Please iron this shirt'</em>, it commands an action; therefore, it is an <strong>imperative Verb</strong>. Always ask: <em>'What work is this word performing in this sentence?'</em>"
              </p>
              {showBengali && (
                <p className="text-xs text-emerald-300 border-t border-indigo-900/50 pt-1.5 mt-1">
                  বাংলা মর্মার্থ: অভিধানে কোনো শব্দের রূপ দেখে চূড়ান্ত সিদ্ধান্ত নেওয়া যাবে না। বাক্যে তার বাস্তবিক কাজের ওপর ভিত্তি করে পদ নির্ণয় করতে হবে।
                </p>
              )}
            </div>

            {/* Dialogue 2: Tuhina */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-400">Tuhina (Student):</span>
                <span className="text-slate-500 font-mono">Question on Adverbs vs Prepositions</span>
              </div>
              <p className="text-slate-300">
                "Sir, in <em>'He ran down'</em> versus <em>'He ran down the street'</em>, how do I distinguish between an Adverb and a Preposition?"
              </p>
            </div>

            {/* Response 2: Sukanta Sir */}
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-1.5 ml-4 sm:ml-8">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400">Sukanta Sir (Mentor):</span>
                <span className="text-indigo-400 font-mono font-semibold">The Object Test</span>
              </div>
              <p className="text-slate-200">
                "Look for the noun object, Tuhina! In <em>'He ran down the street'</em>, <em>'down'</em> is followed by its prepositional object <em>'the street'</em>, so it is a <strong>Preposition</strong>. In <em>'He ran down'</em>, there is no object following it; it simply modifies the verb <em>'ran'</em> (answering 'Where?'), making it an <strong>Adverb</strong>."
              </p>
              {showBengali && (
                <p className="text-xs text-emerald-300 border-t border-indigo-900/50 pt-1.5 mt-1">
                  বাংলা মর্মার্থ: Preposition-এর পর সর্বদাই একটি Noun Object থাকবে। যদি কোনো Noun Object না থাকে এবং তা Verb-কে modify করে, তবে তা Adverb।
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 8. SUMMARY FORMULAS & MEMORY SLOGAN                                       */}
        {/* ========================================================================= */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Golden Takeaway</span>
            <h3 className="text-lg font-bold text-white">The Syntactic Rule of Categorization</h3>
            <p className="text-slate-400 text-xs">
              "Never judge a word by its spelling; judge it by the syntactic labor it performs in the sentence."
            </p>
          </div>
          <div className="shrink-0">
            <span className="px-4 py-2 rounded-xl text-xs font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Form $\neq$ Function | Syntax Rules All
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 9. AUXILIARY SYSTEM: FAQS, PRINT NOTES, DICTIONARY, TEACHER PROFILE       */}
        {/* ========================================================================= */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Module 001_001 Diagnostic Assessment & Practice Bank (25 MCQs)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Module 001_001: Words & The Eight Parts of Speech Overview"
          />

          <WordDictionary />

          <Teacher
            note="Mastering the 8 parts of speech based on syntactic function rather than static labels is the first foundational step to conquering English grammar. — Sukanta Hui"
          />
        </div>

        {/* ========================================================================= */}
        {/* 10. NEXT MODULE PREVIEW & NAVIGATION LINK                                 */}
        {/* ========================================================================= */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Next Step in Curriculum</span>
            <h3 className="text-xl font-bold text-white">
              Module 001_002: Sentence Anatomy — Subject, Predicate & Objects
            </h3>
            <p className="text-slate-400 text-xs max-w-xl">
              Deconstruct sentences into complete subjects, predicates, direct/indirect objects, subject complements, and master the 7 fundamental structural sentence patterns.
            </p>
          </div>

          <a
            href="/english-grammar/module/001_002_sentence-anatomy-subject-predicate-and-objects"
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-950/50 hover:shadow-indigo-900/80 hover:scale-105 shrink-0"
          >
            <span>Proceed to Module 001_002</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
