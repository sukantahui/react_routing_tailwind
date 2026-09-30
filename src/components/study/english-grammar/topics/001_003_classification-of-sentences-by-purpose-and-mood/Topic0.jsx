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
  MessageSquare,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  HelpCircle as QuestionIcon,
  Lightbulb,
  Target,
  Heart,
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
  const [selectedTagIndex, setSelectedTagIndex] = useState(0);

  // 5 Communicative Sentence Types
  const sentenceTypes = [
    {
      type: "Assertive / Declarative",
      purpose: "States a fact, opinion, routine, or scientific principle.",
      example: "Swadeep studies artificial intelligence at Coder & AccoTax.",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      punctuation: "Period (.)",
      descBn: "সাধারণ বিবৃতি বা তথ্যমূলক বাক্য। হ্যাঁ-বোধক (Affirmative) বা না-বোধক (Negative) হতে পারে।"
    },
    {
      type: "Interrogative",
      purpose: "Asks a direct question (Wh- inquiry, Yes/No inversion, or Rhetorical).",
      example: "Are you attending the grammar masterclass today?",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      punctuation: "Question Mark (?)",
      descBn: "তথ্য জানতে বা নিশ্চিত হতে চাওয়া প্রশ্নবোধক বাক্য (Subject-Auxiliary Inversion ঘটে)।"
    },
    {
      type: "Imperative",
      purpose: "Issues a command, polite request, piece of advice, or suggestion.",
      example: "Please submit your assignments before the deadline.",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      punctuation: "Period (.) or Exclamation (!)",
      descBn: "আদেশ, উপদেশ, অনুরোধ বা প্রস্তাবমূলক বাক্য। এতে Subject 'You' উহ্য থাকে।"
    },
    {
      type: "Exclamatory",
      purpose: "Expresses sudden strong emotion, amazement, joy, or grief.",
      example: "What an extraordinary demonstration of problem-solving!",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      punctuation: "Exclamation Mark (!)",
      descBn: "আকস্মিক আবেগ, বিস্ময় বা অনুভূতি প্রকাশকারী বাক্য (What a / How দিয়ে শুরু হয়)।"
    },
    {
      type: "Optative",
      purpose: "Expresses an earnest prayer, wish, blessing, or curse.",
      example: "May you achieve the highest distinction in your career!",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      punctuation: "Exclamation (!) or Period (.)",
      descBn: "প্রার্থনা, আশীর্বাদ বা আন্তরিক শুভকামনামূলক বাক্য (সাধারণত 'May' দিয়ে শুরু হয়)।"
    }
  ];

  // Question Tag Simulator Items
  const questionTagItems = [
    {
      statement: "I am right",
      tag: "aren't I?",
      rule: "'I am' exception",
      explanation: "Standard English rejects 'amn't I'. It contracts to 'aren't I?' (or formal 'am I not?').",
      explanationBn: "'I am'-এর Negative Tag সর্বদাই 'aren't I?' হয় ('amn't I' স্ট্যান্ডার্ড ব্যাকরণে গ্রাহ্য নয়)।"
    },
    {
      statement: "Let's begin the experiment",
      tag: "shall we?",
      rule: "Proposal with 'Let's'",
      explanation: "Proposals using 'Let us' take the invariant question tag 'shall we?'.",
      explanationBn: "'Let's' (Let us) প্রস্তাবমূলক বাক্যে নির্দিষ্ট Tag 'shall we?' বসে।"
    },
    {
      statement: "She seldom speaks in public",
      tag: "does she?",
      rule: "Semi-Negative statement",
      explanation: "'Seldom' is negative in meaning, so the polarity shifts to a POSITIVE tag.",
      explanationBn: "'Seldom' না-বোধক অর্থ বহন করে, তাই Tag হবে হ্যাঁ-বোধক 'does she?'।"
    },
    {
      statement: "Nobody called for him",
      tag: "did they?",
      rule: "Indefinite Pronoun (Negative)",
      explanation: "'Nobody' is negative, and indefinite personal pronouns take the plural tag pronoun 'they'.",
      explanationBn: "'Nobody' Negative এবং এর জন্য Plural Tag Pronoun 'they' বসে, তাই 'did they?'।"
    },
    {
      statement: "Close the classroom door",
      tag: "will you?",
      rule: "Imperative Request / Order",
      explanation: "Imperative sentences take 'will you?' (or polite invitation 'won't you?').",
      explanationBn: "Imperative Sentence-এর ক্ষেত্রে অনুরোধ বা নির্দেশের জন্য 'will you?' বসে।"
    },
    {
      statement: "There is some ice in the pitcher",
      tag: "isn't there?",
      rule: "Introductory 'There'",
      explanation: "Introductory dummy subject 'There' is repeated as the subject pronoun in the tag.",
      explanationBn: "Dummy Subject 'There' থাকলে Tag-এও 'there' বসে ('isn't there?')।"
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
                The 5 Types of Sentences in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                Depending on whether you are telling, asking, ordering, cheering, or blessing, you pick one of these 5 sentence types.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              The 5 Communicative Modes
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Facts, Questions & Commands</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Assertive states a fact (He codes.), Interrogative asks a question (Does he code?), Imperative gives a command (Code now!).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 Statements, Inquiries & Instructions.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Strong Emotions & Heartfelt Prayers</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Exclamatory shows excitement (What a coder he is!), Optative expresses blessings/wishes (May you succeed!).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 Emotions & Benedictions.
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
                <span className="text-xs font-bold text-blue-400 block font-mono">1. Assertive / Decl.</span>
                <p className="text-xs text-slate-300">States a fact (.)</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-indigo-400 block font-mono">2. Interrogative</span>
                <p className="text-xs text-slate-300">Asks a question (?)</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block font-mono">3. Imperative</span>
                <p className="text-xs text-slate-300">Command / Request (.)</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">4. Exclamatory / Optative</span>
                <p className="text-xs text-slate-300">Emotion (!) / Blessing (!)</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "May you master all 5 communicative sentence types to express your ideas with absolute clarity!"
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় ৫ প্রকার বাক্য:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                ১. Assertive: সাধারণ বিবৃতি (He is good). ২. Interrogative: প্রশ্নবোধক (Is he good?). ৩. Imperative: আদেশ/অনুরোধ (Be good). ৪. Exclamatory: বিস্ময় (How good he is!). ৫. Optative: প্রার্থনা (May you be good!).
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
                The 5 Types of Sentences in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                Depending on whether you are telling, asking, ordering, cheering, or blessing, you pick one of these 5 sentence types.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              The 5 Communicative Modes
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Facts, Questions & Commands</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Assertive states a fact (He codes.), Interrogative asks a question (Does he code?), Imperative gives a command (Code now!).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 Statements, Inquiries & Instructions.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Strong Emotions & Heartfelt Prayers</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Exclamatory shows excitement (What a coder he is!), Optative expresses blessings/wishes (May you succeed!).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 Emotions & Benedictions.
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
                <span className="text-xs font-bold text-blue-400 block font-mono">1. Assertive / Decl.</span>
                <p className="text-xs text-slate-300">States a fact (.)</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-indigo-400 block font-mono">2. Interrogative</span>
                <p className="text-xs text-slate-300">Asks a question (?)</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block font-mono">3. Imperative</span>
                <p className="text-xs text-slate-300">Command / Request (.)</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">4. Exclamatory / Optative</span>
                <p className="text-xs text-slate-300">Emotion (!) / Blessing (!)</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "May you master all 5 communicative sentence types to express your ideas with absolute clarity!"
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় ৫ প্রকার বাক্য:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                ১. Assertive: সাধারণ বিবৃতি (He is good). ২. Interrogative: প্রশ্নবোধক (Is he good?). ৩. Imperative: আদেশ/অনুরোধ (Be good). ৪. Exclamatory: বিস্ময় (How good he is!). ৫. Optative: প্রার্থনা (May you be good!).
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
                  Module 001_003
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Estimated: 2.0 Hours
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Classification of Sentences by Purpose & Communicative Mood
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Master the 5 communicative sentence classes: Assertive, Interrogative, Imperative, Exclamatory, and Optative, alongside the polarity shift laws of Question Tags.
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

          {/* Bengali Alert */}
          {showBengali && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-sm flex items-start gap-3 animate-fade-in">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-300">বাংলা মাধ্যম শিক্ষার্থীদের জন্য বিশেষ নির্দেশিকা সক্রিয় করা হয়েছে:</p>
                <p className="text-emerald-200/90 text-xs mt-1 leading-relaxed">
                  Sentence Types (যেমন: <strong>Assertive</strong>, <strong>Interrogative</strong>, <strong>Imperative</strong>, <strong>Exclamatory</strong>, <strong>Optative</strong>) এবং <strong>Question Tags</strong>-এর সমস্ত মূল টার্ম ইংরেজিতেই রাখা হয়েছে। বাংলা অংশটি সহজ ভাবার্থ ও পরীক্ষার ভুল এড়ানোর জন্য প্রযোজ্য।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 2. THE FIVE COMMUNICATIVE SENTENCE CLASSES                                 */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                <Layers className="w-6 h-6 text-indigo-400" />
                The Five Communicative Sentence Classes
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Every sentence in human discourse fulfills one of these five communicative purposes:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {sentenceTypes.map((st, sIdx) => (
              <div
                key={sIdx}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className={`px-3 py-1 text-xs font-bold rounded-lg border font-mono ${st.badge}`}>
                      Type {sIdx + 1}: {st.type}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      Punctuation: {st.punctuation}
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  <strong className="text-white">Purpose:</strong> {st.purpose}
                </p>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 font-mono text-xs text-slate-300">
                  <strong className="text-emerald-400">Example:</strong> "{st.example}"
                </div>

                {showBengali && (
                  <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-indigo-200 text-xs animate-fade-in">
                    <strong>বাংলা ব্যাখ্যা:</strong> {st.descBn}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE QUESTION TAG POLARITY SHIFTER                               */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                Polarity Shifter Lab
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Question Tag Generator & Polarity Rules
              </h2>
            </div>
            <p className="text-slate-400 text-xs max-w-xs">
              Click a statement to see its exact matching tag and grammatical rationale:
            </p>
          </div>

          {/* Statement Selectors */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {questionTagItems.map((item, qIdx) => (
              <button
                key={qIdx}
                type="button"
                onClick={() => setSelectedTagIndex(qIdx)}
                className={`p-3 rounded-xl text-left border text-xs font-mono transition-all duration-200 ${
                  selectedTagIndex === qIdx
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-950 scale-105"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                "{item.statement}"
              </button>
            ))}
          </div>

          {/* Active Tag Result Card */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-indigo-500/30 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="text-lg font-mono text-white">
                "{questionTagItems[selectedTagIndex].statement},{" "}
                <span className="text-emerald-400 font-extrabold underline decoration-emerald-500 underline-offset-4">
                  {questionTagItems[selectedTagIndex].tag}
                </span>"
              </div>
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Rule: {questionTagItems[selectedTagIndex].rule}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Grammatical Logic:</strong> {questionTagItems[selectedTagIndex].explanation}
            </p>

            {showBengali && (
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-200 text-xs animate-fade-in flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>বাংলা নিয়ম:</strong> {questionTagItems[selectedTagIndex].explanationBn}</span>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. CLASSROOM DIALOGUE WITH SUKANTA SIR                                    */}
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
                Resolving colloquial translation errors and rhetorical question subtleties
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed">
            {/* Dialogue: Tuhina */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-400">Tuhina (Student):</span>
                <span className="text-slate-500 font-mono">Question on Bengali Translation</span>
              </div>
              <p className="text-slate-300">
                "Sir, in Bengali we casually add 'তাই তো?' or 'না কি?' at the end of sentences. Many students write <em>'You are coming, is it?'</em> or <em>'isn't it?'</em> for everything. Why is that rejected in competitive exams?"
              </p>
            </div>

            {/* Response: Sukanta Sir */}
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-1.5 ml-4 sm:ml-8">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400">Sukanta Sir (Mentor):</span>
                <span className="text-indigo-400 font-mono font-semibold">The Subject-Operator Echo Rule</span>
              </div>
              <p className="text-slate-200">
                "That is the classic Indian English translation error, Tuhina! In English, a Question Tag is not a static phrase like 'is it?'. A Question Tag must <strong>echo the exact auxiliary operator and subject pronoun</strong> of the main clause with inverted polarity: <em>'You are coming, <strong>aren't you?</strong>'</em>. If the main verb is lexical, you must use <strong>Do-support</strong>: <em>'You like tea, <strong>don't you?</strong>'</em>."
              </p>
              {showBengali && (
                <p className="text-xs text-emerald-300 border-t border-indigo-900/50 pt-1.5 mt-1">
                  বাংলা টিপস: বাংলায় 'তাই তো?' এর ইংরেজি কখনো 'is it?' বা 'isn't it?' নয়। বাক্যের Subject ও Helping Verb অনুযায়ী Tag তৈরি করতে হবে।
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. AUXILIARY SYSTEMS: FAQS, PRINT NOTES, DICTIONARY, TEACHER PROFILE       */}
        {/* ========================================================================= */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Module 001_003 Diagnostic Assessment & Practice Bank (25 MCQs)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Module 001_003: Classification of Sentences by Purpose & Communicative Mood"
          />

          <WordDictionary />

          <Teacher
            note="Classifying sentences by communicative intent and mastering question tags provides the foundational framework for reported speech and advanced transformation. — Sukanta Hui"
          />
        </div>

        {/* ========================================================================= */}
        {/* 6. NEXT MODULE NAVIGATION LINK                                            */}
        {/* ========================================================================= */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Next Step in Curriculum</span>
            <h3 className="text-xl font-bold text-white">
              Module 001_004: Phrases vs Clauses & Sentence Transformation Basics
            </h3>
            <p className="text-slate-400 text-xs max-w-xl">
              Distinguish phrases from dependent and independent clauses; master foundational sentence transformation without altering semantic meaning.
            </p>
          </div>

          <a
            href="/english-grammar/module/001_004_phrases-vs-clauses-and-sentence-transformation-basics"
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-950/50 hover:shadow-indigo-900/80 hover:scale-105 shrink-0"
          >
            <span>Proceed to Module 001_004</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
