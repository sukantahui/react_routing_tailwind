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
  Repeat,
  Compass,
  MessageSquare,
  ShieldCheck,
  FileCode,
  Lightbulb,
  Target,
  Heart
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

export default function Topic2() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedWordIndex, setSelectedWordIndex] = useState(0);

  const words = [
    {
      word: "WATER",
      variants: [
        {
          pos: "Noun",
          color: "border-blue-500/40 bg-blue-950/30 text-blue-300",
          sentence: "Drink clean water daily for optimal health.",
          roleDesc: "Direct Object naming a physical substance.",
          roleDescBn: "ভৌত পদার্থের নাম বুঝিয়ে Direct Object Noun হিসেবে কাজ করছে।"
        },
        {
          pos: "Verb",
          color: "border-emerald-500/40 bg-emerald-950/30 text-emerald-300",
          sentence: "Please water the flowerbeds before noon.",
          roleDesc: "Imperative finite verb expressing irrigation.",
          roleDescBn: "জল দেওয়ার সক্রিয় কাজটি বুঝিয়ে Imperative Verb হিসেবে কাজ করছে।"
        },
        {
          pos: "Adjective (Noun Adjunct)",
          color: "border-amber-500/40 bg-amber-950/30 text-amber-300",
          sentence: "They installed a high-capacity water pipe.",
          roleDesc: "Attributive noun-adjunct modifying 'pipe'.",
          roleDescBn: "'pipe' Noun-এর প্রকৃতি বর্ণনা করায় Adjective-এর মতো কাজ করছে।"
        }
      ]
    },
    {
      word: "FAST",
      variants: [
        {
          pos: "Adjective",
          color: "border-amber-500/40 bg-amber-950/30 text-amber-300",
          sentence: "This is a fast train to Barrackpore.",
          roleDesc: "Attributive adjective qualifying 'train'.",
          roleDescBn: "'train' Noun-এর দ্রুত গতি বুঝিয়ে Adjective হিসেবে ব্যবহৃত।"
        },
        {
          pos: "Adverb",
          color: "border-purple-500/40 bg-purple-950/30 text-purple-300",
          sentence: "Swadeep ran fast and caught the bus.",
          roleDesc: "Adverb of manner modifying 'ran'. (No 'fastly'!).",
          roleDescBn: "'ran' Action Verb-কে modify করছে, তাই Adverb।"
        },
        {
          pos: "Noun",
          color: "border-blue-500/40 bg-blue-950/30 text-blue-300",
          sentence: "He broke his solemn fast at sunset.",
          roleDesc: "Direct object noun meaning abstinence from food.",
          roleDescBn: "উপবাস অর্থে Direct Object Noun হিসেবে ব্যবহৃত।"
        },
        {
          pos: "Verb",
          color: "border-emerald-500/40 bg-emerald-950/30 text-emerald-300",
          sentence: "Many people fast on religious occasions.",
          roleDesc: "Finite verb denoting the act of fasting.",
          roleDescBn: "উপবাস করার কাজ বুঝিয়ে Action Verb হিসেবে ব্যবহৃত।"
        }
      ]
    },
    {
      word: "ROUND",
      variants: [
        {
          pos: "Adjective",
          color: "border-amber-500/40 bg-amber-950/30 text-amber-300",
          sentence: "We sat around a large round table.",
          roleDesc: "Describes geometric shape of 'table'.",
          roleDescBn: "'table'-এর গোলাকার রূপ বর্ণনা করে Adjective।"
        },
        {
          pos: "Noun",
          color: "border-blue-500/40 bg-blue-950/30 text-blue-300",
          sentence: "The nurse made her hourly round in the ward.",
          roleDesc: "Denotes a routine circuit or inspection.",
          roleDescBn: "হাসপাতালের নিয়মিত পরিদর্শন অর্থে Noun।"
        },
        {
          pos: "Verb",
          color: "border-emerald-500/40 bg-emerald-950/30 text-emerald-300",
          sentence: "The vehicles round the bend very carefully.",
          roleDesc: "Expresses turning motion around an obstacle.",
          roleDescBn: "বাঁক ঘোরার সক্রিয় কাজ বুঝিয়ে Verb।"
        },
        {
          pos: "Preposition",
          color: "border-rose-500/40 bg-rose-950/30 text-rose-300",
          sentence: "The earth revolves round the sun.",
          roleDesc: "Spatial relator governing 'the sun'.",
          roleDescBn: "'the sun'-এর সাথে স্থানিক ঘূর্ণন সম্পর্ক বুঝিয়ে Preposition।"
        }
      ]
    },
    {
      word: "BUT",
      variants: [
        {
          pos: "Conjunction",
          color: "border-cyan-500/40 bg-cyan-950/30 text-cyan-300",
          sentence: "Debangshu tried diligently, but time ran out.",
          roleDesc: "Coordinating conjunction indicating contrast.",
          roleDescBn: "বিপরীত ভাব বোঝাতে দুটি Clause যুক্ত করেছে।"
        },
        {
          pos: "Preposition",
          color: "border-rose-500/40 bg-rose-950/30 text-rose-300",
          sentence: "Everyone attended the lecture but Swadeep.",
          roleDesc: "Means 'except' followed by noun object.",
          roleDescBn: "'Except' (ব্যতীত) অর্থে ব্যবহৃত হয়ে Preposition।"
        },
        {
          pos: "Adverb",
          color: "border-purple-500/40 bg-purple-950/30 text-purple-300",
          sentence: "Life is but an fleeting shadow.",
          roleDesc: "Means 'only' or 'merely'.",
          roleDescBn: "'Only' বা কেবলমাত্র অর্থে Adverb।"
        }
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
                  Module 001_001 · Topic 2
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Form vs Function: The Dynamic Word Matrix
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Why a word is NOT locked into a single part of speech. Explore how syntactic placement and relational duty determine whether a word acts as a Noun, Verb, Adjective, Adverb, or Preposition.
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
                  ইংরেজিতে কোনো শব্দের বাহ্যিক রূপ (Form) দেখে তার পদ (Part of Speech) নির্ধারণ করা যায় না। বাক্যে শব্দটি ঠিক কী দায়িত্ব পালন করছে (Function) — সেটাই আসল। যেমন 'water' শব্দটি একই সাথে Noun (জল), Verb (জল দেওয়া), এবং Adjective (water filter) হিসেবে ব্যবহৃত হতে পারে।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Multi-Function Interactive Word Studio */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Repeat className="w-4 h-4" />
                Syntactic Chameleon Explorer
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Multi-Functional Word Inspector
              </h2>
            </div>
            <p className="text-slate-400 text-xs max-w-xs">
              Select a word below to observe how its syntactic class mutates across different sentences:
            </p>
          </div>

          {/* Word Pills */}
          <div className="flex flex-wrap gap-2.5">
            {words.map((w, idx) => (
              <button
                key={w.word}
                type="button"
                onClick={() => setSelectedWordIndex(idx)}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold font-mono transition-all duration-200 border ${
                  selectedWordIndex === idx
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-950 scale-105"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                WORD: {w.word}
              </button>
            ))}
          </div>

          {/* Active Word Roles Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-400">
              Contextual Transformations for "{words[selectedWordIndex].word}":
            </h3>

            
        
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
                Verbs & Helping Verbs in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                Without a verb, there is no life in a sentence. Verbs show what is happening or what is true.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              The Action Engine
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Main Action Verbs (Doing & Being)</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Physical movements (runs, builds, types), mental states (thinks, understands), or states of being (is, exists).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 Swadeep [builds] web applications.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Auxiliary / Helping Verbs</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Little helper words (is, am, are, was, were, has, have, will, can) that tell us the exact time (tense) or possibility of the action.
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 Swadeep [is] coding. Swadeep [will] code tomorrow.
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
                <span className="text-xs font-bold text-emerald-400 block font-mono">Action Verb</span>
                <p className="text-xs text-slate-300">Doing something: writes, debugs, solves</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-blue-400 block font-mono">State / Copula Verb</span>
                <p className="text-xs text-slate-300">Condition / Being: is, feels, seems</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">Primary Helping Verb</span>
                <p className="text-xs text-slate-300">Tense helpers: is, are, was, has, have</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Modal Helping Verb</span>
                <p className="text-xs text-slate-300">Ability / Duty: can, must, should, will</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "The student has been practicing coding every day to achieve mastery."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>খুব সহজ ভাষায় ক্রিয়াপদ:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                Verb হলো বাক্যের আসল চালিকাশক্তি। কোনো কাজ করা (write, run) বা হওয়া (is, become) বোঝাতে Verb ব্যবহৃত হয়। সাথে থাকা Helping Verb (is, have, will) সময় ও সম্ভাবনা বোঝায়।
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
                Verbs & Helping Verbs in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                Without a verb, there is no life in a sentence. Verbs show what is happening or what is true.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              The Action Engine
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Main Action Verbs (Doing & Being)</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Physical movements (runs, builds, types), mental states (thinks, understands), or states of being (is, exists).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 Swadeep [builds] web applications.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Auxiliary / Helping Verbs</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Little helper words (is, am, are, was, were, has, have, will, can) that tell us the exact time (tense) or possibility of the action.
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 Swadeep [is] coding. Swadeep [will] code tomorrow.
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
                <span className="text-xs font-bold text-emerald-400 block font-mono">Action Verb</span>
                <p className="text-xs text-slate-300">Doing something: writes, debugs, solves</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-blue-400 block font-mono">State / Copula Verb</span>
                <p className="text-xs text-slate-300">Condition / Being: is, feels, seems</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">Primary Helping Verb</span>
                <p className="text-xs text-slate-300">Tense helpers: is, are, was, has, have</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Modal Helping Verb</span>
                <p className="text-xs text-slate-300">Ability / Duty: can, must, should, will</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "The student has been practicing coding every day to achieve mastery."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>খুব সহজ ভাষায় ক্রিয়াপদ:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                Verb হলো বাক্যের আসল চালিকাশক্তি। কোনো কাজ করা (write, run) বা হওয়া (is, become) বোঝাতে Verb ব্যবহৃত হয়। সাথে থাকা Helping Verb (is, have, will) সময় ও সম্ভাবনা বোঝায়।
              </p>
            </div>
          )}
        </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {words[selectedWordIndex].variants.map((v, vIdx) => (
                <div key={vIdx} className={`p-5 rounded-2xl border space-y-3 ${v.color}`}>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-lg bg-slate-950/60 text-xs font-bold font-mono">
                      Role {vIdx + 1}: {v.pos}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-sm text-white font-semibold">
                    "{v.sentence}"
                  </div>
                  <p className="text-xs opacity-90 leading-relaxed">
                    <strong>Syntactic Explanation:</strong> {v.roleDesc}
                  </p>
                  {showBengali && (
                    <div className="text-xs text-emerald-300 border-t border-slate-800/60 pt-2 flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span><strong>বাংলা ব্যাখ্যা:</strong> {v.roleDescBn}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Topic 2 Diagnostic Assessment (25 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 2: Form vs Function — Quick Revision Notes"
          />

          <WordDictionary />

          <Teacher
            note="Never judge a word by its spelling alone. Ask yourself: 'What action is it performing in this exact sentence?' — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_001_words-and-the-eight-parts-of-speech-overview/1"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 1 (Word Classes)</span>
          </a>

          <a
            href="/english-grammar/topic/001_001_words-and-the-eight-parts-of-speech-overview/3"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 3 (Nouns, Pronouns, Verbs)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
