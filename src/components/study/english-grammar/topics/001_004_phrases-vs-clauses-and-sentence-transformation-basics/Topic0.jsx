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
  Repeat,
  MessageSquare,
  ShieldCheck,
  ArrowRightLeft,
  BookA,
  FileCode,
  GraduationCap,
  Sparkle,
  Compass
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedTransformIndex, setSelectedTransformIndex] = useState(0);
  const [selectedPhraseClauseIndex, setSelectedPhraseClauseIndex] = useState(0);

  // Module 001_004 Detailed Topic Syllabus Breakdown
  const syllabusTopics = [
    {
      topicNumber: 1,
      title: "What is a Phrase?",
      titleBn: "Phrase (শব্দগুচ্ছ) কী?",
      slug: "1",
      description: "A group of related words acting as a single grammatical unit without a Subject-Finite Verb pair.",
      descriptionBn: "Phrase হলো একাধিক সম্পর্কিত শব্দের এমন একটি দল যা বাক্যে একটি একক পদ (Part of Speech) হিসেবে কাজ করে কিন্তু যার নিজস্ব কোনো Subject ও Finite Verb (সমাপিকা ক্রিয়া) থাকে না।",
      tags: ["no-finite-verb", "syntactic-unit"]
    },
    {
      topicNumber: 2,
      title: "The 5 Major Phrase Types",
      titleBn: "৫টি প্রধান Phrase প্রকারভেদ",
      slug: "2",
      description: "Deconstructing Noun Phrases, Verb Phrases, Prepositional Phrases, Adjective Phrases, and Adverb Phrases.",
      descriptionBn: "Noun Phrase, Verb Phrase, Prepositional Phrase, Adjective Phrase এবং Adverb Phrase—এই ৫টি মৌলিক শব্দগুচ্ছের গঠন ও বাক্যে তাদের কার্যকরী প্রয়োগ।",
      tags: ["noun-phrase", "prep-phrase", "adj-phrase"]
    },
    {
      topicNumber: 3,
      title: "What is a Clause?",
      titleBn: "Clause কী?",
      slug: "3",
      description: "A syntactic structure containing its own Subject and a Finite Predicate Verb.",
      descriptionBn: "Clause হলো বাক্যের এমন একটি অংশ যার নিজস্ব একটি Subject (কর্তা) এবং একটি Finite Verb (সমাপিকা ক্রিয়া) আবশ্যিকভাবে বিদ্যমান থাকে।",
      tags: ["subject-predicate", "finite-verb"]
    },
    {
      topicNumber: 4,
      title: "Independent vs Dependent Clauses",
      titleBn: "Principal বনাম Subordinate Clause",
      slug: "4",
      description: "Distinguishing Main (Independent) clauses that stand alone from Subordinate (Dependent) clauses.",
      descriptionBn: "যে Clause নিজেই সম্পূর্ণ অর্থ প্রকাশ করতে পারে তা Independent/Principal Clause; আর যা অর্থের জন্য Principal Clause-এর ওপর নির্ভরশীল তা Dependent/Subordinate Clause।",
      tags: ["main-clause", "subordinate-clause"]
    },
    {
      topicNumber: 5,
      title: "Transformation Basics & The Golden Rule",
      titleBn: "Transformation-এর মূলনীতি ও Golden Rule",
      slug: "5",
      description: "The Cardinal Law: Altering grammatical structure while keeping the semantic truth value 100% unchanged.",
      descriptionBn: "Transformation-এর Golden Rule: বাক্যের অভ্যন্তরীণ অর্থ বা ভাব সম্পূর্ণ অপরিবর্তিত রেখে কেবল তার বাহ্যিক ব্যাকরণিক কাঠামোর রূপান্তর সাধন করা।",
      tags: ["meaning-invariance", "golden-rule"]
    },
    {
      topicNumber: 6,
      title: "Affirmative to Negative Transformation",
      titleBn: "হ্যাঁ-সূচক থেকে না-সূচক রূপান্তর",
      slug: "6",
      description: "Converting affirmative statements using Antonyms, 'None but', 'No sooner had...than', and 'Too...to'.",
      descriptionBn: "Not + বিপরীত শব্দ (Antonym), Only-এর স্থলে None but, As soon as-এর স্থলে No sooner had, এবং Too...to-এর স্থলে So...that cannot ব্যবহার করে রূপান্তর।",
      tags: ["affirmative-negative", "antonyms", "none-but"]
    },
    {
      topicNumber: 7,
      title: "Assertive to Interrogative Transformation",
      titleBn: "বর্ণনামূলক থেকে প্রশ্নবোধক রূপান্তর",
      slug: "7",
      description: "Using rhetorical questioning and polarity shifts to transform statements into compelling questions.",
      descriptionBn: "হ্যাঁ-বোধক বাক্যকে না-বোধক প্রশ্ন এবং না-বোধক বাক্যকে হ্যাঁ-বোধক অলঙ্কারিক প্রশ্নে (Rhetorical Question) রূপান্তরের মাধ্যমে ভাব অক্ষুণ্ণ রাখা।",
      tags: ["rhetorical-question", "polarity-shift"]
    },
    {
      topicNumber: 8,
      title: "Exclamatory to Assertive Transformation",
      titleBn: "আবেগসূচক থেকে বর্ণনামূলক রূপান্তর",
      slug: "8",
      description: "Converting exclamations introduced by 'What a' or 'How' into assertive sentences with intensifiers.",
      descriptionBn: "'What a' বা 'How' দিয়ে শুরু হওয়া বিস্ময়বোধক বাক্যকে 'very', 'great' বা 'extremely' যোগ করে বর্ণনামূলক বাক্যে রূপান্তর।",
      tags: ["exclamatory-assertive", "intensifiers"]
    },
    {
      topicNumber: 9,
      title: "Classroom Dialogue & Diagnostic Drills",
      titleBn: "ক্লাসরুম আলোচনা ও সমন্বিত রূপান্তর ল্যাব",
      slug: "9",
      description: "Interactive student-mentor discussions, error diagnosis, and capstone transformation drills.",
      descriptionBn: "সুকান্ত স্যারের সাথে শিক্ষার্থীদের ক্লাসরুম কথোপকথন, বোর্ড ও প্রতিযোগিতামূলক পরীক্ষার সাধারণ ভুল বিশ্লেষণ এবং চূড়ান্ত ডায়াগনস্টিক প্র্যাকটিস।",
      tags: ["classroom-dialogue", "practice-drills"]
    }
  ];

  // Phrase vs Clause Parallel Comparison Data
  const phraseClauseComparisons = [
    {
      type: "Adjective Modifier",
      phraseExample: "The scholar [with immense wisdom] spoke gracefully.",
      clauseExample: "The scholar [who possessed immense wisdom] spoke gracefully.",
      analysis: "The phrase lacks a finite verb; the clause contains the relative pronoun subject 'who' and finite verb 'possessed'.",
      analysisBn: "Phrase-এ কোনো Finite Verb নেই ('with immense wisdom'); কিন্তু Clause-এ Subject 'who' এবং Finite Verb 'possessed' রয়েছে।"
    },
    {
      type: "Adverbial Modifier",
      phraseExample: "He left the hall [because of his fatigue].",
      clauseExample: "He left the hall [because he was fatigued].",
      analysis: "The phrase uses a prepositional construct ('because of'); the clause uses a subordinating conjunction followed by subject + finite verb ('because he was').",
      analysisBn: "Phrase-এ Prepositional গঠন রয়েছে ('because of his fatigue'); Clause-এ Conjunction-এর পর Subject ও Finite Verb রয়েছে ('because he was fatigued')।"
    },
    {
      type: "Noun Equivalent",
      phraseExample: "I observed [his outstanding performance].",
      clauseExample: "I observed [how he performed outstandingly].",
      analysis: "The phrase is a noun phrase acting as direct object; the clause is a dependent noun clause with subject 'he' and finite verb 'performed'.",
      analysisBn: "Phrase-টি একটি Noun Phrase; অন্যদিকে Clause-টি একটি পূর্ণাঙ্গ Noun Clause যার নিজস্ব Subject ও Finite Verb রয়েছে।"
    }
  ];

  // Transformation Matrix Data
  const transformationRules = [
    {
      ruleName: "Affirmative ↔ Negative (By Antonym)",
      affirmative: "Man is mortal.",
      negative: "Man is not immortal.",
      formula: "Subject + Verb + [not + Antonym]",
      formulaBn: "Not + বিপরীত শব্দ (Antonym) ব্যবহার করে অর্থ অপরিবর্তিত রাখা।"
    },
    {
      ruleName: "As soon as ↔ No sooner had... than",
      affirmative: "As soon as the bell rang, the students entered.",
      negative: "No sooner had the bell rung than the students entered.",
      formula: "No sooner had + Subject + V3... than + Subject + V2",
      formulaBn: "'As soon as'-এর পরিবর্তে 'No sooner had + V3... than' ব্যবহার।"
    },
    {
      ruleName: "Only / Alone (Person) ↔ None but",
      affirmative: "Only Swadeep can solve this equation.",
      negative: "None but Swadeep can solve this equation.",
      formula: "None but + Person + Predicate",
      formulaBn: "ব্যক্তির ক্ষেত্রে 'Only'-এর বদলে 'None but' বসে।"
    },
    {
      ruleName: "Too... to ↔ So... that... cannot",
      affirmative: "She is too weak to walk without support.",
      negative: "She is so weak that she cannot walk without support.",
      formula: "so + Adjective + that + Subject + cannot/could not + V1",
      formulaBn: "'Too... to' পরিবর্তন হয়ে 'so... that... cannot' হয়।"
    },
    {
      ruleName: "Assertive ↔ Interrogative (Universal)",
      affirmative: "Everyone loves flowers.",
      negative: "Who does not love flowers?",
      formula: "Who + does/do/did not + V1...?",
      formulaBn: "'Everyone'-যুক্ত বাক্যকে 'Who does not...?' দিয়ে প্রশ্নবোধকে রূপান্তর।"
    },
    {
      ruleName: "Exclamatory ↔ Assertive",
      affirmative: "What a glorious sunset over the Ganges!",
      negative: "It is a very glorious sunset over the Ganges.",
      formula: "Subject + Verb + a very/extremely + Adjective + Noun",
      formulaBn: "'What a / How'-এর পরিবর্তে 'very' বা 'extremely' ব্যবহার।"
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
        {/* 1. HERO HEADER WITH FULL BILINGUAL DEFINITION SWITCHER                    */}
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
                  Module 001_004 Overview
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Estimated: 2.0 Hours · 9 Core Topics
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Phrases vs Clauses & Sentence Transformation Basics
              </h1>

              {/* Dynamic Bilingual Topic Subtitle & Definition */}
              {showBengali ? (
                <div className="space-y-2 pt-1 animate-fade-in">
                  <h2 className="text-lg font-bold text-emerald-400">
                    Phrase বনাম Clause এবং Sentence Transformation-এর প্রাথমিক কলাকৌশল
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                    এই মডিউলে আমরা শিখব কীভাবে <strong>Phrase</strong> (Finite Verb হীন শব্দগুচ্ছ) এবং <strong>Clause</strong> (Subject ও Finite Verb যুক্ত অংশ)-এর গঠনগত পার্থক্য শনাক্ত করতে হয়। এছাড়াও বাক্যের মূল অর্থ সম্পূর্ণ অপরিবর্তিত রেখে <strong>Affirmative</strong> থেকে <strong>Negative</strong>, <strong>Assertive</strong> থেকে <strong>Interrogative</strong> এবং <strong>Exclamatory</strong> থেকে <strong>Assertive</strong> বাক্যে নিখুঁতভাবে রূপান্তর করার <strong>Golden Rule</strong>-গুলো বিস্তারিতভাবে আলোচনা করা হয়েছে।
                  </p>
                </div>
              ) : (
                <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                  Understand the structural boundary between phrases and clauses. Master foundational sentence transformation techniques without altering semantic meaning.
                </p>
              )}
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

          {/* Bengali Alert & Pedagogy Guidelines */}
          {showBengali && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-sm flex items-start gap-3 animate-fade-in">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-emerald-300">বাংলা মাধ্যম শিক্ষার্থীদের জন্য বিশেষ নির্দেশিকা সক্রিয় রয়েছে:</p>
                <p className="text-emerald-200/90 text-xs leading-relaxed">
                  ব্যাকরণের টেকনিক্যাল পারিভাষিক শব্দ (যেমন: <strong>Phrase</strong>, <strong>Clause</strong>, <strong>Transformation</strong>, <strong>Finite Verb</strong>, <strong>Affirmative</strong>, <strong>Negative</strong>, <strong>Assertive</strong>, <strong>Interrogative</strong>) মূল ইংরেজিতে বজায় রাখা হয়েছে। বাংলা ভাষা বাক্যের রূপান্তরের অন্তর্নিহিত নিয়ম, যুক্তি ও পরীক্ষার ট্র্যাপ ব্যাখ্যা করার জন্য ব্যবহৃত হয়েছে।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 2. CORE CONCEPT DEFINITION PILLARS (PHRASE, CLAUSE, TRANSFORMATION)       */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <BookA className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Fundamental Concept Definitions: The 3 Pillars of Module 001_004
              </h2>
              <p className="text-xs text-slate-400">
                {showBengali
                  ? "Phrase, Clause এবং Sentence Transformation-এর মূল সংজ্ঞা ও মৌলিক পার্থক্য"
                  : "Precise grammatical definitions and core operational mechanics"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pillar 1: Phrase */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  PILLAR 1 · PHRASE
                </span>
                <span className="text-[10px] text-slate-500 uppercase font-mono">No Finite Verb</span>
              </div>
              <h3 className="text-base font-bold text-white">What is a Phrase?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A group of two or more words acting as a single unit within a sentence that does <strong>NOT contain a Subject-Finite Verb pair</strong>.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-blue-300">
                Ex: <em>"in the morning"</em>, <em>"with great joy"</em>
              </div>
              {showBengali && (
                <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-300 leading-relaxed animate-fade-in">
                  <strong>বাংলা সংজ্ঞা:</strong> Phrase হলো দুই বা ততোধিক সম্পর্কিত শব্দের সমষ্টি যা একটি একক পদের মতো কাজ করে, কিন্তু যার মধ্যে কোনো Subject ও Finite Verb থাকে না।
                </div>
              )}
            </div>

            {/* Pillar 2: Clause */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  PILLAR 2 · CLAUSE
                </span>
                <span className="text-[10px] text-slate-500 uppercase font-mono">Subject + Verb</span>
              </div>
              <h3 className="text-base font-bold text-white">What is a Clause?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A syntactic group of words that <strong>MUST contain both a Subject and a Finite Verb</strong>. It forms either a complete sentence or part of a complex sentence.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-300">
                Ex: <em>"when the sun rises"</em>, <em>"he arrived late"</em>
              </div>
              {showBengali && (
                <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-300 leading-relaxed animate-fade-in">
                  <strong>বাংলা সংজ্ঞা:</strong> Clause হলো বাক্যের এমন একটি অংশ যার মধ্যে আবশ্যিকভাবে একটি Subject (কর্তা) এবং একটি Finite Verb (সমাপিকা ক্রিয়া) থাকে।
                </div>
              )}
            </div>

            {/* Pillar 3: Sentence Transformation */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  PILLAR 3 · TRANSFORMATION
                </span>
                <span className="text-[10px] text-slate-500 uppercase font-mono">Meaning Invariance</span>
              </div>
              <h3 className="text-base font-bold text-white">What is Transformation?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The process of altering a sentence's grammatical form or communicative structure <strong>without altering its core semantic meaning or truth value</strong>.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-purple-300">
                Ex: <em>"He is rich"</em> → <em>"He is not poor"</em>
              </div>
              {showBengali && (
                <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-300 leading-relaxed animate-fade-in">
                  <strong>বাংলা সংজ্ঞা:</strong> Transformation of Sentences হলো বাক্যের অর্থ বা অন্তর্নিহিত সত্যতা সম্পূর্ণ অক্ষুণ্ণ রেখে ব্যাকরণিক রূপ বা শৈলী পরিবর্তন করা।
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. COMPLETE MODULE SYLLABUS & TOPIC ROADMAP (9 TOPICS WITH BENGALI)       */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                Curriculum Structure
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Module 001_004 Topic Syllabus & Navigation Catalog
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {showBengali
                  ? "এই মডিউলের ৯টি অধ্যায়ের সম্পূর্ণ পাঠ্যসূচি ও বিষয়ভিত্তিক সারসংক্ষেপ"
                  : "Explore all 9 topics covered in Module 001_004 with instant access links"}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
              9 Full Topics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {syllabusTopics.map((topic) => (
              <a
                key={topic.topicNumber}
                href={`/english-grammar/topic/001_004_phrases-vs-clauses-and-sentence-transformation-basics/${topic.slug}`}
                className="group p-5 rounded-2xl bg-slate-950/90 border border-slate-800/90 hover:border-indigo-500/60 transition-all duration-200 flex flex-col justify-between space-y-3 hover:shadow-xl hover:shadow-indigo-950/40"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800 flex items-center justify-center text-xs font-bold font-mono group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      {topic.topicNumber}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors group-hover:translate-x-1" />
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-200 transition-colors">
                    {topic.title}
                  </h3>

                  {showBengali && (
                    <div className="text-xs font-semibold text-emerald-400 font-sans">
                      {topic.titleBn}
                    </div>
                  )}

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {showBengali ? topic.descriptionBn : topic.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-900">
                  {topic.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-400 border border-slate-800">
                      #{tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. PHRASES VS CLAUSES COMPARATIVE LAB                                     */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                Structural Comparator
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Phrase vs Clause: The Subject-Finite Verb Test
              </h2>
            </div>
            <div className="flex gap-2">
              {phraseClauseComparisons.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedPhraseClauseIndex(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedPhraseClauseIndex === i
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-950"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {c.type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phrase Card */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-blue-500/30 space-y-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-500/20 text-blue-300 font-mono">
                PHRASE FORMULATION (No Finite Verb)
              </span>
              <p className="text-sm font-mono text-white pt-1">
                "{phraseClauseComparisons[selectedPhraseClauseIndex].phraseExample}"
              </p>
            </div>

            {/* Clause Card */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-300 font-mono">
                CLAUSE FORMULATION (Subject + Finite Verb)
              </span>
              <p className="text-sm font-mono text-white pt-1">
                "{phraseClauseComparisons[selectedPhraseClauseIndex].clauseExample}"
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <strong className="text-white">Structural Diagnostic:</strong> {phraseClauseComparisons[selectedPhraseClauseIndex].analysis}
          </div>

          {showBengali && (
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-200 text-xs animate-fade-in flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>বাংলা বিশ্লেষণ:</strong> {phraseClauseComparisons[selectedPhraseClauseIndex].analysisBn}</span>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 5. LIVE SENTENCE TRANSFORMATION WORKBENCH                                  */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <ArrowRightLeft className="w-4 h-4" />
                Transformation Engine
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Sentence Transformation Without Meaning Change
              </h2>
            </div>
            <p className="text-slate-400 text-xs max-w-xs">
              Select a rule to see how syntactic structure shifts while preserving truth value:
            </p>
          </div>

          {/* Transformation Rule Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {transformationRules.map((rule, rIdx) => (
              <button
                key={rIdx}
                type="button"
                onClick={() => setSelectedTransformIndex(rIdx)}
                className={`p-3 rounded-xl text-left border text-xs font-medium transition-all duration-200 ${
                  selectedTransformIndex === rIdx
                    ? "bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-950 scale-105"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                {rule.ruleName}
              </button>
            ))}
          </div>

          {/* Transformation Live Display */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">
                {transformationRules[selectedTransformIndex].ruleName}
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Formula: {transformationRules[selectedTransformIndex].formula}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-blue-400 font-bold block uppercase tracking-wider text-[10px]">
                  Original Structure
                </span>
                <p className="text-white text-sm">
                  "{transformationRules[selectedTransformIndex].affirmative}"
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold block uppercase tracking-wider text-[10px]">
                  Transformed Structure (Same Meaning)
                </span>
                <p className="text-emerald-300 text-sm font-bold">
                  "{transformationRules[selectedTransformIndex].negative}"
                </p>
              </div>
            </div>

            {showBengali && (
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-200 text-xs animate-fade-in flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>বাংলা নিয়ম:</strong> {transformationRules[selectedTransformIndex].formulaBn}</span>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. CLASSROOM DIALOGUE WITH SUKANTA SIR                                    */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Classroom Dialogue: Mentor Sukanta Sir & Students
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                The Golden Principle of Sentence Transformation: Meaning Invariance
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed">
            {/* Dialogue: Swadeep */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-400">Swadeep (Student):</span>
                <span className="text-slate-500 font-mono">Question on Transformation</span>
              </div>
              <p className="text-slate-300">
                "Sir, in board exams and competitive exams like WBCS and SSC CGL, when asked to turn an affirmative sentence into negative, students often write <em>'He is not a good boy'</em> for <em>'He is a good boy'</em>. Why does that get zero marks?"
              </p>
            </div>

            {/* Response: Sukanta Sir */}
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-1.5 ml-4 sm:ml-8">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400">Sukanta Sir (Mentor):</span>
                <span className="text-indigo-400 font-mono font-semibold">The Law of Semantic Invariance</span>
              </div>
              <p className="text-slate-200">
                "Because changing the meaning of a sentence is <strong>Conversion</strong>, not <strong>Transformation</strong>, Swadeep! Transformation mandates that the <strong>semantic truth value must remain 100% unchanged</strong> while the grammatical apparel changes. <em>'He is a good boy'</em> becomes negative by using not + antonym: <em>'He is not a bad boy'</em>. Always remember: Transform the shell, never the soul of the sentence!"
              </p>
              {showBengali && (
                <p className="text-xs text-emerald-300 border-t border-indigo-900/50 pt-1.5 mt-1">
                  বাংলা টিপস: Transformation-এর মূল শর্ত হলো বাক্যের অর্থ কোনোভাবেই পরিবর্তন করা যাবে না। কেবল ব্যাকরণিক গঠন পরিবর্তন হবে (যেমন: "He is honest" → "He is not dishonest")।
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 7. SUMMARY TAKEAWAYS CARD                                                 */}
        {/* ========================================================================= */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Segment 1 Milestone</span>
            <h3 className="text-lg font-bold text-white">Sentence Architecture & Fundamentals Completed!</h3>
            <p className="text-slate-400 text-xs">
              You have mastered 8 Parts of Speech, 7 Sentence Patterns, Subject/Predicate parsing, and Transformation principles.
            </p>
          </div>
          <div className="shrink-0">
            <span className="px-4 py-2 rounded-xl text-xs font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Segment 1: 100% Ready
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 8. AUXILIARY SYSTEMS: FAQS, PRINT NOTES, DICTIONARY, TEACHER PROFILE       */}
        {/* ========================================================================= */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Module 001_004 Diagnostic Assessment & Practice Bank (25 MCQs)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Module 001_004: Phrases vs Clauses & Sentence Transformation Basics"
          />

          <WordDictionary />

          <Teacher
            note="Sentence transformation without meaning change is the ultimate test of syntactic agility and defensive English writing. — Sukanta Hui"
          />
        </div>

        {/* ========================================================================= */}
        {/* 9. BIDIRECTIONAL NAVIGATION FOOTERS                                       */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_003_classification-of-sentences-by-purpose-and-mood/8"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Previous: Module 001_003 Capstone</span>
          </a>

          <a
            href="/english-grammar/topic/001_004_phrases-vs-clauses-and-sentence-transformation-basics/1"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 1 (What is a Phrase?)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
