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
  MessageSquare,
  ShieldCheck,
  GraduationCap,
  Lightbulb,
  Target,
  Heart,
  Compass
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

export default function Topic8() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedDrillIndex, setSelectedDrillIndex] = useState(0);

  const classroomDrills = [
    {
      student: "Swadeep",
      task: "As soon as ↔ No sooner had... than with Base Verb Trap",
      badAttempt: "No sooner did the train arrived then he boarded. ❌",
      solution: "No sooner did the train arrive than he boarded. ✅",
      breakdown: "Two classic traps: 1. 'did' requires base verb 'arrive' (not 'arrived'); 2. 'No sooner' demands 'than' (not 'then').",
      breakdownBn: "দুটি মারাত্মক ভুল: ১. 'did'-এর পর Base verb 'arrive' হবে; ২. 'No sooner'-এর সাথে 'than' বসবে, 'then' নয়।"
    },
    {
      student: "Debangshu",
      task: "Double Negative 'Too... not to' Resolution",
      badAttempt: "He is too intelligent not to solve it. -> He is so intelligent that he cannot solve it. ❌",
      solution: "He is so intelligent that he CAN / WILL DEFINITELY solve it. ✅",
      breakdown: "The negative inside the infinitive ('not to') flips the semantic result into positive affirmative certainty.",
      breakdownBn: "'Too... not to' আসলে ইতিবাচক সক্ষমতা প্রকাশ করে, তাই রূপান্তরের সময় 'that he can solve' হবে।"
    },
    {
      student: "Tuhina",
      task: "Hardly... when vs No sooner... than Harmony",
      badAttempt: "Hardly had she entered the room than the phone rang. ❌",
      solution: "Hardly had she entered the room WHEN the phone rang. ✅",
      breakdown: "'Hardly' and 'Scarcely' correlate with 'when' / 'before', whereas 'No sooner' strictly pairs with 'than'.",
      breakdownBn: "'Hardly' এবং 'Scarcely'-র সাথে 'when' বসে; কেবল 'No sooner'-এর সাথে 'than' বসে।"
    },
    {
      student: "Ankita",
      task: "Universal Rhetorical Interrogative Transformation",
      badAttempt: "Everyone wishes to be happy. → Does everyone wish to be happy? ❌",
      solution: "Who does not wish to be happy? ✅",
      breakdown: "A yes/no question alters the pragmatic intent. 'Everyone' demands the negative rhetorical formula 'Who does not...?'.",
      breakdownBn: "'Everyone' থাকলে শুধু সাধারণ প্রশ্ন নয়, বরং 'Who does not...?' অলংকারিক প্রশ্ন করতে হয়।"
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
                  Module 001_004 · Topic 8
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Classroom Transformation Clinic & Worked Drills
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Step into Sukanta Sir's Barrackpore workshop. Analyze common exam traps, dissect student errors in real-time, and master flawless 'Do as Directed' mechanics.
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
                <p className="font-semibold text-emerald-300">হাতে-কলমে রূপান্তর ক্লিনিক গাইড:</p>
                <p className="text-emerald-200/90 text-xs mt-1 leading-relaxed">
                  পরীক্ষায় ছাত্রছাত্রীরা যেসব ছোট ছোট ভুলে নম্বর হারায় (যেমন: <em>did-এর পর past tense লেখা</em> বা <em>No sooner-এর সাথে then বসানো</em>), এখানে সেগুলো সমাধান করে দেখানো হয়েছে।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Case Breakdown */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Barrackpore Student Clinic Scenarios</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">4 Drills</span>
          </div>

          {/* Grid Selector */}
          
        
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
                Exam Transformation Drills in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                The 4-point safety checklist to never lose a single mark in 'Do as Directed' questions.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              The Exam Clinic
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Check Connectors & Correlatives</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                'No sooner' MUST have 'than'. 'Hardly' MUST have 'when'. 'Not only' MUST have 'but also'.
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 Pair your connectors accurately.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Check Tense Harmony & Negation</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Don't use 'cannot' for a past sentence (use 'could not'). Avoid accidental double negatives (*didn't see nobody).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 Meaning, Tense, Connectors, Punctuation.
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
                <span className="text-xs font-bold text-emerald-400 block font-mono">Step 1: Meaning Check</span>
                <p className="text-xs text-slate-300">Does the transformed sentence say the exact same truth?</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-blue-400 block font-mono">Step 2: Tense Check</span>
                <p className="text-xs text-slate-300">Is the verb tense identical to the original prompt?</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">Step 3: Connector Check</span>
                <p className="text-xs text-slate-300">Are correlative pairs (than/when/but also) correct?</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Step 4: Punctuation Check</span>
                <p className="text-xs text-slate-300">Is the final mark (. or ? or !) appropriate?</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "No sooner had the mentor entered the classroom than the students stood up to greet him."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় পরীক্ষার প্রস্তুতি চেকলিস্ট:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                যেকোনো Transformation সম্পন্ন করার পর ৪টি বিষয় মিলিয়ে নিন: ১. অর্থ অপরিবর্তিত আছে কিনা, ২. Tense ঠিক আছে কিনা, ৩. Conjunction জোড়া (যেমন: no sooner...than) সঠিক কিনা, এবং ৪. শেষে সঠিক যতিচিহ্ন বসেছে কিনা।
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
                Exam Transformation Drills in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                The 4-point safety checklist to never lose a single mark in 'Do as Directed' questions.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              The Exam Clinic
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Check Connectors & Correlatives</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                'No sooner' MUST have 'than'. 'Hardly' MUST have 'when'. 'Not only' MUST have 'but also'.
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 Pair your connectors accurately.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Check Tense Harmony & Negation</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Don't use 'cannot' for a past sentence (use 'could not'). Avoid accidental double negatives (*didn't see nobody).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 Meaning, Tense, Connectors, Punctuation.
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
                <span className="text-xs font-bold text-emerald-400 block font-mono">Step 1: Meaning Check</span>
                <p className="text-xs text-slate-300">Does the transformed sentence say the exact same truth?</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-blue-400 block font-mono">Step 2: Tense Check</span>
                <p className="text-xs text-slate-300">Is the verb tense identical to the original prompt?</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">Step 3: Connector Check</span>
                <p className="text-xs text-slate-300">Are correlative pairs (than/when/but also) correct?</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Step 4: Punctuation Check</span>
                <p className="text-xs text-slate-300">Is the final mark (. or ? or !) appropriate?</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "No sooner had the mentor entered the classroom than the students stood up to greet him."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় পরীক্ষার প্রস্তুতি চেকলিস্ট:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                যেকোনো Transformation সম্পন্ন করার পর ৪টি বিষয় মিলিয়ে নিন: ১. অর্থ অপরিবর্তিত আছে কিনা, ২. Tense ঠিক আছে কিনা, ৩. Conjunction জোড়া (যেমন: no sooner...than) সঠিক কিনা, এবং ৪. শেষে সঠিক যতিচিহ্ন বসেছে কিনা।
              </p>
            </div>
          )}
        </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {classroomDrills.map((d, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDrillIndex(idx)}
                className={`p-3.5 rounded-2xl text-left text-xs font-semibold transition border ${
                  selectedDrillIndex === idx
                    ? "bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-950"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="text-[10px] uppercase font-mono opacity-75">Student: {d.student}</div>
                <div className="mt-1 font-bold truncate">{d.task}</div>
              </button>
            ))}
          </div>

          {/* Active Drill Card */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-5 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase font-mono">
                {classroomDrills[selectedDrillIndex].task}
              </span>
              <span className="text-xs font-mono text-slate-400">Student: {classroomDrills[selectedDrillIndex].student}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Common Exam Error
                </span>
                <p className="font-mono text-xs text-rose-200">{classroomDrills[selectedDrillIndex].badAttempt}</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Immaculate Solution
                </span>
                <p className="font-mono text-xs text-emerald-200 font-bold">{classroomDrills[selectedDrillIndex].solution}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Sukanta Sir's Architectural Diagnosis</span>
              <p className="text-xs text-slate-300 leading-relaxed">{classroomDrills[selectedDrillIndex].breakdown}</p>
              {showBengali && (
                <p className="text-xs text-emerald-300/90 pt-1 border-t border-slate-800 leading-relaxed">
                  <strong>বাংলা বিশ্লেষণ:</strong> {classroomDrills[selectedDrillIndex].breakdownBn}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Topic 8 Diagnostic Assessment (25 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 8: Classroom Transformation Clinic Notes"
          />

          <WordDictionary />

          <Teacher
            note="Errors in transformation tests are almost never due to lack of knowledge; they are due to lack of diagnostic vigilance. Practice parsing every word! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_004_phrases-vs-clauses-and-sentence-transformation-basics/7"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 7 (Exclamatory ↔ Assertive)</span>
          </a>

          <a
            href="/english-grammar/topic/001_004_phrases-vs-clauses-and-sentence-transformation-basics/9"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 9 (Module 001_004 Capstone Assessment)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
