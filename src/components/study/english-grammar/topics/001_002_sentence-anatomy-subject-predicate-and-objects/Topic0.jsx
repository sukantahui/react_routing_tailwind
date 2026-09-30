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
  Compass,
  MessageSquare,
  ShieldCheck,
  GitBranch,
  Split
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedPatternIndex, setSelectedPatternIndex] = useState(0);
  const [equalityTestId, setEqualityTestId] = useState(0);

  // The 7 Fundamental Sentence Patterns
  const sentencePatterns = [
    {
      code: "SV",
      title: "Subject + Intransitive Verb",
      example: "The express train arrived.",
      components: [
        { label: "Subject", text: "The express train", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { label: "Intransitive Verb", text: "arrived", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" }
      ],
      explanation: "The verb 'arrived' is complete in itself and requires no direct object to make sense.",
      explanationBn: "'arrived' একটি Intransitive Verb (অকর্মক ক্রিয়া), যা সম্পূর্ণ অর্থ প্রকাশের জন্য কোনো Object দাবি করে না।"
    },
    {
      code: "SVO",
      title: "Subject + Transitive Verb + Direct Object",
      example: "Swadeep developed a web application.",
      components: [
        { label: "Subject", text: "Swadeep", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { label: "Transitive Verb", text: "developed", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { label: "Direct Object", text: "a web application", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" }
      ],
      explanation: "The action of 'developed' passes directly to the receiver noun phrase 'a web application'.",
      explanationBn: "'developed' Transitive Verb-এর কাজটি সরাসরি 'a web application' Direct Object-এর ওপর প্রযুক্ত হয়েছে।"
    },
    {
      code: "SVOO",
      title: "Subject + Ditransitive Verb + Indirect Object + Direct Object",
      example: "Sukanta Sir taught Tuhina English Grammar.",
      components: [
        { label: "Subject", text: "Sukanta Sir", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { label: "Ditransitive Verb", text: "taught", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { label: "Indirect Object (Beneficiary)", text: "Tuhina", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
        { label: "Direct Object (Entity)", text: "English Grammar", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" }
      ],
      explanation: "Two objects: 'Tuhina' is the beneficiary person (IO), while 'English Grammar' is the direct topic taught (DO).",
      explanationBn: "Ditransitive Verb দুটি Object নেয়: 'Tuhina' হলো Indirect Object (ব্যক্তি) এবং 'English Grammar' হলো Direct Object (বিষয়)।"
    },
    {
      code: "SVC",
      title: "Subject + Linking/Copular Verb + Subject Complement",
      example: "Abhronila is an exceptional researcher.",
      components: [
        { label: "Subject", text: "Abhronila", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { label: "Linking Verb (Copula)", text: "is", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { label: "Subject Complement (Noun)", text: "an exceptional researcher", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" }
      ],
      explanation: "No action passes. 'is' connects the subject to the predicate noun that renames her (Abhronila == researcher).",
      explanationBn: "এখানে কোনো কাজ হচ্ছে না; 'is' Linking Verb Subject-এর পরিচয় পূর্ণ করতে Subject Complement যুক্ত করেছে (Abhronila == researcher)।"
    },
    {
      code: "SVOC",
      title: "Subject + Complex-Transitive Verb + Direct Object + Object Complement",
      example: "The committee appointed Debangshu team leader.",
      components: [
        { label: "Subject", text: "The committee", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { label: "Complex-Transitive Verb", text: "appointed", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { label: "Direct Object", text: "Debangshu", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
        { label: "Object Complement", text: "team leader", color: "bg-pink-500/20 text-pink-300 border-pink-500/30" }
      ],
      explanation: "'team leader' renames and describes the direct object 'Debangshu' (Debangshu == team leader).",
      explanationBn: "'team leader' পদটি Direct Object 'Debangshu'-এর নতুন পদমর্যাদা প্রকাশ করে Object Complement হিসেবে বসেছে।"
    },
    {
      code: "SVA",
      title: "Subject + Intransitive Verb + Obligatory Adverbial",
      example: "The coaching center is located in Barrackpore.",
      components: [
        { label: "Subject", text: "The coaching center", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { label: "Verb", text: "is located", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { label: "Obligatory Adverbial (Place)", text: "in Barrackpore", color: "bg-teal-500/20 text-teal-300 border-teal-500/30" }
      ],
      explanation: "Without the spatial adverbial 'in Barrackpore', the clause would be semantically incomplete.",
      explanationBn: "'in Barrackpore' স্থান নির্দেশক Adverbial ছাড়া বাক্যটির অর্থ অসম্পূর্ণ থেকে যায়, তাই এটি Obligatory Adverbial।"
    },
    {
      code: "SVOA",
      title: "Subject + Transitive Verb + Direct Object + Obligatory Adverbial",
      example: "He placed the reference books on the study table.",
      components: [
        { label: "Subject", text: "He", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { label: "Transitive Verb", text: "placed", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { label: "Direct Object", text: "the reference books", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
        { label: "Obligatory Adverbial", text: "on the study table", color: "bg-teal-500/20 text-teal-300 border-teal-500/30" }
      ],
      explanation: "The verb 'placed' strictly mandates both a direct object (what was placed) and a location (where it was placed).",
      explanationBn: "'placed' Verb-এর পর Direct Object এবং স্থান নির্দেশক Adverbial উভয়েই ব্যাকরণগতভাবে বাধ্যতামূলক।"
    }
  ];

  // Direct Object vs Subject Complement Test Matrix
  const equalityTests = [
    {
      sentence: "The surgeon examined the patient.",
      verb: "examined (Action / Transitive)",
      subject: "The surgeon",
      entity: "the patient",
      type: "Direct Object (SVO)",
      relation: "Subject ≠ Entity",
      proof: "The surgeon and the patient are TWO separate human beings.",
      proofBn: "সার্জন এবং রোগী দুজন সম্পূর্ণ আলাদা ব্যক্তি (Subject ≠ Object), তাই এটি Transitive Verb + Direct Object।"
    },
    {
      sentence: "The patient became impatient.",
      verb: "became (State / Linking Copula)",
      subject: "The patient",
      entity: "impatient",
      type: "Subject Complement (SVC)",
      relation: "Subject == Entity",
      proof: "The adjective 'impatient' directly describes the state of 'The patient'.",
      proofBn: "'impatient' শব্দটি 'The patient'-এর নিজস্ব মানসিক অবস্থা নির্দেশ করছে (Subject == Complement), তাই এটি Linking Verb + Subject Complement।"
    },
    {
      sentence: "The rose smells sweet.",
      verb: "smells (Sensory Linking Copula)",
      subject: "The rose",
      entity: "sweet (Adjective)",
      type: "Subject Complement (SVC)",
      relation: "Subject == Quality",
      proof: "The rose possesses the quality of sweetness. (Never use 'sweetly'!).",
      proofBn: "গোলাপের মিষ্টি ঘ্রাণের গুণ প্রকাশ করছে। Sensory Linking Verb-এর পর Adverb নয়, Subject Complement Adjective বসে।"
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
                  Module 001_002
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Estimated: 2.0 Hours
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Sentence Anatomy: Subject, Predicate, Objects & Complements
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Deconstruct the structural blueprint of English sentences. Master the 7 fundamental sentence patterns, direct vs indirect objects, and the crucial distinction between objects and complements.
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

          {/* Bengali Active Alert */}
          {showBengali && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-sm flex items-start gap-3 animate-fade-in">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-300">বাংলা মাধ্যম শিক্ষার্থীদের জন্য বিশেষ নির্দেশিকা সক্রিয় করা হয়েছে:</p>
                <p className="text-emerald-200/90 text-xs mt-1 leading-relaxed">
                  Sentence-এর মূল অংশ (যেমন: <strong>Subject</strong>, <strong>Predicate</strong>, <strong>Direct Object</strong>, <strong>Indirect Object</strong>, <strong>Subject Complement</strong>, <strong>Object Complement</strong>) এর টেকনিক্যাল নাম ইংরেজিতেই বজায় রাখা হয়েছে। বাংলা ভাষা বাক্যের অভ্যন্তরীণ সম্পর্ক ও ভুল সংশোধনের সহজ ব্যাখ্যার জন্য ব্যবহৃত হয়েছে।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 2. THE DUAL FOUNDATION: COMPLETE SUBJECT VS COMPLETE PREDICATE            */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 text-xs font-bold rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                THE SUBJECT (কর্তৃপক্ষ)
              </span>
              <span className="text-xs text-slate-500 font-mono">Who or What</span>
            </div>
            <h3 className="text-xl font-bold text-white">Simple Subject vs Complete Subject</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              The <strong>Simple Subject</strong> is the core noun or pronoun head alone. The <strong>Complete Subject</strong> includes the simple subject plus all its articles, attributive adjectives, and prepositional modifiers.
            </p>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-xs space-y-2">
              <div className="text-slate-400">
                Example: <span className="text-blue-300 font-bold">[The young brilliant scholar from Barrackpore]</span> won the scholarship.
              </div>
              <div className="pt-2 border-t border-slate-800 text-slate-500 text-[11px]">
                • Simple Subject: <strong className="text-white">scholar</strong>
                <br />
                • Complete Subject: <strong className="text-blue-300">The young brilliant scholar from Barrackpore</strong>
              </div>
            </div>
            {showBengali && (
              <p className="text-xs text-emerald-300 border-t border-slate-800 pt-2">
                বাংলা টিপস: Verb-কে 'কে' বা 'কী' দিয়ে প্রশ্ন করলে Subject পাওয়া যায়।
              </p>
            )}
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                THE PREDICATE (বিধেয়)
              </span>
              <span className="text-xs text-slate-500 font-mono">Assertion / Action</span>
            </div>
            <h3 className="text-xl font-bold text-white">Simple Predicate vs Complete Predicate</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              The <strong>Simple Predicate</strong> is strictly the verb group (auxiliaries + lexical verb). The <strong>Complete Predicate</strong> includes the verb group plus all objects, complements, and adverbial modifiers.
            </p>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-xs space-y-2">
              <div className="text-slate-400">
                Example: The researcher <span className="text-emerald-300 font-bold">[has been analyzing the data meticulously in the lab]</span>.
              </div>
              <div className="pt-2 border-t border-slate-800 text-slate-500 text-[11px]">
                • Simple Predicate: <strong className="text-white">has been analyzing</strong>
                <br />
                • Complete Predicate: <strong className="text-emerald-300">has been analyzing the data meticulously in the lab</strong>
              </div>
            </div>
            {showBengali && (
              <p className="text-xs text-emerald-300 border-t border-slate-800 pt-2">
                বাংলা টিপস: বাক্যের Subject বাদে বাকি সম্পূর্ণ অংশটিই হলো Predicate (যার মধ্যে Finite Verb থাকা বাধ্যতামূলক)।
              </p>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. THE 7 FUNDAMENTAL SENTENCE PATTERNS EXPLORER                           */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <GitBranch className="w-4 h-4" />
                Structural Syntactic Taxonomy
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                The Seven Fundamental English Sentence Patterns
              </h2>
            </div>
            <p className="text-slate-400 text-xs max-w-xs">
              Every grammatical sentence in English conforms to one of these 7 structural blueprints:
            </p>
          </div>

          {/* Pattern Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {sentencePatterns.map((pat, idx) => (
              <button
                key={pat.code}
                type="button"
                onClick={() => setSelectedPatternIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 border ${
                  selectedPatternIndex === idx
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-950 scale-105"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                Pattern {idx + 1}: {pat.code}
              </button>
            ))}
          </div>

          {/* Active Pattern Card */}
          <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-mono">
                  {sentencePatterns[selectedPatternIndex].code}
                </span>
                {sentencePatterns[selectedPatternIndex].title}
              </h3>
            </div>

            {/* Sentence Component Blocks */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {sentencePatterns[selectedPatternIndex].components.map((comp, cI) => (
                <div key={cI} className={`p-3 rounded-xl border flex flex-col gap-1 ${comp.color}`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                    {comp.label}
                  </span>
                  <span className="text-sm font-bold font-mono text-white">
                    "{comp.text}"
                  </span>
                </div>
              ))}
            </div>

            <p className="text-sm text-slate-300 leading-relaxed pt-2">
              <strong className="text-white">Syntactic Analysis:</strong> {sentencePatterns[selectedPatternIndex].explanation}
            </p>

            {showBengali && (
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-200 text-xs animate-fade-in flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>বাংলা বিশ্লেষণ:</strong> {sentencePatterns[selectedPatternIndex].explanationBn}</span>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. DIRECT OBJECT VS SUBJECT COMPLEMENT: THE EQUALITY TEST                  */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Split className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                The Master Equality Test: Direct Object vs Subject Complement
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                The single most reliable method to distinguish transitive action from copular states:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {equalityTests.map((t, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setEqualityTestId(i)}
                className={`p-4 rounded-2xl text-left border transition-all duration-200 space-y-1.5 ${
                  equalityTestId === i
                    ? "bg-purple-950/40 border-purple-500/50 shadow-lg shadow-purple-950/50 ring-1 ring-purple-500/30"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="text-xs font-bold text-purple-300 font-mono">Example {i + 1}</div>
                <div className="text-sm font-semibold text-white truncate font-mono">"{t.sentence}"</div>
                <div className="text-xs text-slate-400">{t.type}</div>
              </button>
            ))}
          </div>

          {/* Test Breakdown Panel */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-purple-500/30 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-sm font-mono text-purple-300 font-bold">
                "{equalityTests[equalityTestId].sentence}"
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-extrabold bg-purple-500/20 text-purple-200 border border-purple-500/30">
                Formula: {equalityTests[equalityTestId].relation}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block mb-1">Subject Entity:</span>
                <span className="text-white font-bold">{equalityTests[equalityTestId].subject}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block mb-1">Verb Nature:</span>
                <span className="text-emerald-300 font-bold">{equalityTests[equalityTestId].verb}</span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Diagnostic Proof:</strong> {equalityTests[equalityTestId].proof}
            </p>

            {showBengali && (
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-200 text-xs animate-fade-in flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>বাংলা যুক্তি:</strong> {equalityTests[equalityTestId].proofBn}</span>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. CLASSROOM DIALOGUE WITH SUKANTA SIR                                    */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Classroom Dialogue: Mentor Sukanta Sir & Barrackpore Students
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Dissecting high-frequency exam traps on Subject Complements and Ditransitive Verbs
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed">
            {/* Dialogue 1: Abhronila */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-400">Abhronila (Student):</span>
                <span className="text-slate-500 font-mono">Question on SVOO vs SVO + Prep</span>
              </div>
              <p className="text-slate-300">
                "Sir, what is the difference between <em>'I lent Swadeep my laptop'</em> and <em>'I lent my laptop to Swadeep'</em>? Are both patterns grammatically identical?"
              </p>
            </div>

            {/* Response 1: Sukanta Sir */}
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-1.5 ml-4 sm:ml-8">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400">Sukanta Sir (Mentor):</span>
                <span className="text-indigo-400 font-mono font-semibold">The Dative Shift Principle</span>
              </div>
              <p className="text-slate-200">
                "Both express the exact same semantic meaning, Abhronila! In <em>'I lent Swadeep (IO) my laptop (DO)'</em>, we use the pure <strong>SVOO pattern</strong> without prepositions. When you shift the direct object forward, English requires a preposition (usually <em>'to'</em> or <em>'for'</em>): <em>'I lent my laptop (DO) to Swadeep (Prepositional Object)'</em> (Pattern: <strong>SVO + Prep Phrase</strong>). In competitive exams, never insert 'to' when the person comes first: <em>'I lent to Swadeep my laptop'</em> is incorrect!"
              </p>
              {showBengali && (
                <p className="text-xs text-emerald-300 border-t border-indigo-900/50 pt-1.5 mt-1">
                  বাংলা টিপস: ব্যক্তি (Indirect Object) আগে বসলে কোনো Preposition বসে না (যেমন: "gave him the pen")। কিন্তু বস্তু (Direct Object) আগে বসলে Preposition বসে (যেমন: "gave the pen to him")।
                </p>
              )}
            </div>

            {/* Dialogue 2: Debangshu */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-400">Debangshu (Student):</span>
                <span className="text-slate-500 font-mono">Question on Sensory Verbs</span>
              </div>
              <p className="text-slate-300">
                "Sir, why is <em>'The soup tastes deliciously'</em> wrong in English when 'deliciously' is an adverb?"
              </p>
            </div>

            {/* Response 2: Sukanta Sir */}
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-1.5 ml-4 sm:ml-8">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400">Sukanta Sir (Mentor):</span>
                <span className="text-indigo-400 font-mono font-semibold">The Copular Rule</span>
              </div>
              <p className="text-slate-200">
                "Because the soup is not actively performing the biological action of tasting with a tongue, Debangshu! Here, <em>'tastes'</em> is a <strong>Linking Verb</strong> of sensation. Linking verbs connect the subject to an adjective describing its inherent quality (<strong>Subject Complement</strong>). Therefore, it must be <em>'The soup tastes delicious'</em> (SVC pattern), just like <em>'The flower smells sweet'</em>."
              </p>
              {showBengali && (
                <p className="text-xs text-emerald-300 border-t border-indigo-900/50 pt-1.5 mt-1">
                  বাংলা টিপস: Sense Verbs (taste, smell, look, feel, sound) যখন অবস্থা বোঝায়, তখন তার পরে Adverb বসে না; Subject Complement Adjective বসে।
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. SUMMARY FORMULA CARD                                                   */}
        {/* ========================================================================= */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Sentence Parsing Law</span>
            <h3 className="text-lg font-bold text-white">The Golden Parsing Hierarchy</h3>
            <p className="text-slate-400 text-xs">
              Find the Finite Verb Group $\rightarrow$ Ask 'Who/What' for Subject $\rightarrow$ Check for Copula (SVC) or Transitive Action (SVO/SVOO/SVOC).
            </p>
          </div>
          <div className="shrink-0">
            <span className="px-4 py-2 rounded-xl text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
              7 Structural Patterns Mastered
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 7. AUXILIARY SYSTEMS: FAQS, PRINT NOTES, DICTIONARY, TEACHER PROFILE       */}
        {/* ========================================================================= */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Module 001_002 Diagnostic Assessment & Practice Bank (25 MCQs)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Module 001_002: Sentence Anatomy — Subject, Predicate & Objects"
          />

          <WordDictionary />

          <Teacher
            note="Deconstructing sentences into subjects, predicates, objects, and complements is the master key to eliminating sentence fragments and mastering voice transformations. — Sukanta Hui"
          />
        </div>

        {/* ========================================================================= */}
        {/* 8. NEXT MODULE NAVIGATION LINK                                            */}
        {/* ========================================================================= */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Next Step in Curriculum</span>
            <h3 className="text-xl font-bold text-white">
              Module 001_003: Classification of Sentences by Purpose & Mood
            </h3>
            <p className="text-slate-400 text-xs max-w-xl">
              Master Assertive, Interrogative (Wh- & Inversion), Imperative, Exclamatory, and Optative sentences, plus Question Tag polarity shifts.
            </p>
          </div>

          <a
            href="/english-grammar/module/001_003_classification-of-sentences-by-purpose-and-mood"
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-950/50 hover:shadow-indigo-900/80 hover:scale-105 shrink-0"
          >
            <span>Proceed to Module 001_003</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
