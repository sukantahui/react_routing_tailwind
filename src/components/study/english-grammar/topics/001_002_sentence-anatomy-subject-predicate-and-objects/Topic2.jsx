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
  Split,
  Compass,
  MessageSquare,
  ShieldCheck,
  Lightbulb,
  Target,
  Heart,
  Terminal,
  Activity,
  Cpu
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

export default function Topic2() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);

  // 8 Multi-Domain Predicate Examples
  const predicateExamples = [
    {
      id: 0,
      title: "Multi-Auxiliary Verb Chain",
      domain: "Computer Science",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      sentence: "The senior database engine has been continuously executing transactional queries for three hours.",
      completeSubject: "The senior database engine",
      simplePredicate: "has been executing (Present Perfect Continuous Verb Group)",
      completePredicate: "has been continuously executing transactional queries for three hours",
      verbChain: "Auxiliary 1 ('has') + Auxiliary 2 ('been') + Adverb ('continuously') + Lexical Participle ('executing')",
      complementsAndAdjuncts: "Direct Object ('transactional queries') + Durational Temporal Adverbial ('for three hours')",
      analysisBn: "'has been executing' হলো Simple Predicate (Finite Verb Group); এর সাথে Intervening Adverb 'continuously', Direct Object এবং Adverbial যুক্ত হয়ে Complete Predicate গঠিত হয়েছে।"
    },
    {
      id: 1,
      title: "Compound Predicate (Shared Subject)",
      domain: "Software Development",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      sentence: "Swadeep inspected the algorithmic bug and deployed an optimized patch immediately.",
      completeSubject: "Swadeep",
      simplePredicate: "inspected ... and deployed (Two Finite Verbs sharing one Subject)",
      completePredicate: "inspected the algorithmic bug and deployed an optimized patch immediately",
      verbChain: "Verb 1 ('inspected') + Coordinator ('and') + Verb 2 ('deployed')",
      complementsAndAdjuncts: "DO 1 ('the algorithmic bug') + DO 2 ('an optimized patch') + Manner/Time Adjunct ('immediately')",
      analysisBn: "এখানে 'Swadeep' একই Subject দুটি Verb ('inspected' এবং 'deployed') সম্পাদন করেছে। এটি Compound Predicate, কোনো Compound Sentence নয় (কারণ দ্বিতীয় অংশে নতুন Subject নেই)।"
    },
    {
      id: 2,
      title: "Modal Auxiliary Chain with Passive Voice",
      domain: "Aviation & Systems",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      sentence: "The automated landing gear must have been rigorously inspected before takeoff.",
      completeSubject: "The automated landing gear",
      simplePredicate: "must have been inspected (Modal Past Passive Verb Group)",
      completePredicate: "must have been rigorously inspected before takeoff",
      verbChain: "Modal ('must') + Perfect Aux ('have') + Passive Aux ('been') + Intervening Adverb ('rigorously') + Lexical Participle ('inspected')",
      complementsAndAdjuncts: "Manner Adverb ('rigorously') + Temporal Prepositional Adjunct ('before takeoff')",
      analysisBn: "Modal Verb 'must'-এর সাথে 'have been inspected' মিলে ৪-শব্দ বিশিষ্ট জটিল Simple Predicate গঠিত হয়েছে।"
    },
    {
      id: 3,
      title: "Split Predicate in Interrogative Syntax",
      domain: "Classroom Socratic Query",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      sentence: "Have the programming scholars at Barrackpore truly mastered the predicate structures?",
      completeSubject: "the programming scholars at Barrackpore",
      simplePredicate: "Have ... mastered (Split Verb Group around Subject)",
      completePredicate: "Have ... truly mastered the predicate structures",
      verbChain: "Initial Auxiliary ('Have') ... Subject ... Adverb ('truly') + Lexical Verb ('mastered')",
      complementsAndAdjuncts: "Adverb ('truly') + Direct Object ('the predicate structures')",
      analysisBn: "প্রশ্নবোধক বাক্যে Simple Predicate-টি দুই ভাগে বিভক্ত হয়ে যায়: প্রথম Auxiliary 'Have' Subject-এর আগে বসে এবং মূল Verb 'mastered' Subject-এর পরে বসে।"
    },
    {
      id: 4,
      title: "Predicate with Direct Object and Object Complement",
      domain: "Corporate Governance",
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      sentence: "The executive committee unanimously elected Debangshu lead technical director.",
      completeSubject: "The executive committee",
      simplePredicate: "elected (Complex-Transitive Finite Verb)",
      completePredicate: "unanimously elected Debangshu lead technical director",
      verbChain: "Manner Adverb ('unanimously') + Lexical Past Verb ('elected')",
      complementsAndAdjuncts: "Direct Object ('Debangshu') + Object Complement Noun Phrase ('lead technical director')",
      analysisBn: "Complete Predicate-এ Finite Verb 'elected'-এর পর Direct Object 'Debangshu' এবং তার নতুন পদবি প্রকাশক Object Complement 'lead technical director' অন্তর্ভুক্ত রয়েছে।"
    },
    {
      id: 5,
      title: "Predicate with Dual Prepositional Complements",
      domain: "Academic Administration",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      sentence: "Mentor Sukanta Sir spoke to the anxious candidates about effective exam strategies in the seminar.",
      completeSubject: "Mentor Sukanta Sir",
      simplePredicate: "spoke (Intransitive Verb of Communication)",
      completePredicate: "spoke to the anxious candidates about effective exam strategies in the seminar",
      verbChain: "Lexical Past Verb ('spoke')",
      complementsAndAdjuncts: "Prepositional Recipient ('to the anxious candidates') + Topic PP ('about effective exam strategies') + Locative Adjunct ('in the seminar')",
      analysisBn: "'spoke' Verb-এর সাথে যুক্ত তিনটি Prepositional Phrase মিলে সম্পূর্ণ Predicate গঠন করেছে।"
    },
    {
      id: 6,
      title: "Negative Inverted Predicate",
      domain: "Formal Academic Literature",
      badge: "bg-teal-500/20 text-teal-300 border-teal-500/30",
      sentence: "Seldom had the research cohort witnessed such an elegant algorithmic optimization.",
      completeSubject: "the research cohort",
      simplePredicate: "had ... witnessed (Split Auxiliary & Lexical Verb)",
      completePredicate: "Seldom had ... witnessed such an elegant algorithmic optimization",
      verbChain: "Negative Adverb ('Seldom') + Auxiliary ('had') ... Subject ... Lexical Verb ('witnessed')",
      complementsAndAdjuncts: "Direct Object ('such an elegant algorithmic optimization')",
      analysisBn: "নেতিবাচক Adverb 'Seldom' বাক্যের শুরুতে বসায় Auxiliary Verb 'had' Subject-এর পূর্বে চলে এসেছে (Negative Inversion)।"
    },
    {
      id: 7,
      title: "Triple Action Compound Predicate",
      domain: "Daily Discipline & Routine",
      badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      sentence: "Tuhina reviewed the syntax lecture, solved twenty MCQs, and noted down all critical edge cases.",
      completeSubject: "Tuhina",
      simplePredicate: "reviewed, solved, and noted down (3 Coordinated Finite Verbs)",
      completePredicate: "reviewed the syntax lecture, solved twenty MCQs, and noted down all critical edge cases",
      verbChain: "Verb 1 ('reviewed') + Verb 2 ('solved') + Coordinator + Verb 3 ('noted down')",
      complementsAndAdjuncts: "Three parallel Direct Objects corresponding to each verb action",
      analysisBn: "একটিমাত্র Subject 'Tuhina' কমা ও 'and' দ্বারা যুক্ত তিনটি সমান্তরাল Verb সম্পাদন করেছে।"
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
        {/* Header */}
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
                  Module 001_002 · Topic 2
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                The Predicate Core: Simple, Complete & Compound Predicates
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Deconstruct the engine of the sentence: auxiliary chains, lexical verbs, compound actions, and the full predicate expansion.
              </p>
            </div>

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
                  <strong>Simple Predicate:</strong> শুধুমাত্র Finite Verb গ্রুপ (Auxiliary + Main Verb)। <strong>Complete Predicate:</strong> Verb-এর সাথে যুক্ত Object, Complement ও Adverbial সহ সম্পূর্ণ অংশ। <strong>Compound Predicate:</strong> একই কর্তার একাধিক সমান্তরাল ক্রিয়াপদ।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* IN VERY SIMPLE LANGUAGE: ULTRA-CLEAR EXPLODED BREAKDOWN                   */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Beginner Friendly · Deep Step-by-Step Intuition</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                The Predicate in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                The Predicate is the entire action engine and movie storyline of the sentence.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              Engine & Story
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/90 border border-emerald-500/30 space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-white">
              "Swadeep has been developing an interactive web application in the lab."
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1.5">
                <span className="font-bold text-emerald-300 font-mono text-xs block">1. SIMPLE PREDICATE</span>
                <p className="text-white font-mono font-bold">"has been developing"</p>
                <p className="text-[11px] text-slate-300">
                  <strong>Why Simple Predicate?</strong> Strictly the verb group carrying tense & aspect (has + been + developing).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-1.5">
                <span className="font-bold text-purple-300 font-mono text-xs block">2. DIRECT OBJECT</span>
                <p className="text-white font-mono font-bold">"an interactive web application"</p>
                <p className="text-[11px] text-slate-300">
                  <strong>Why Object?</strong> The target entity being built by the verb action.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-500/30 space-y-1.5">
                <span className="font-bold text-teal-300 font-mono text-xs block">3. ADVERBIAL SETTING</span>
                <p className="text-white font-mono font-bold">"in the lab"</p>
                <p className="text-[11px] text-slate-300">
                  <strong>Why Adverbial?</strong> Tells WHERE the action takes place.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              📌 <strong>Complete Predicate:</strong> The entire combined phrase <em>"has been developing an interactive web application in the lab"</em>.
            </div>

            {showBengali && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-200 leading-relaxed">
                <strong>সহজ ভাষায়:</strong> Simple Predicate হলো শুধুমাত্র Verb Chain ('has been developing'); আর তার সাথে যুক্ত কর্ম (Object) ও স্থান (Adverbial) সহ পুরো অংশটিই হলো Complete Predicate।
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE PREDICATE WORKBENCH (8 DIVERSE EXAMPLES)                      */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Split className="w-4 h-4" />
                Predicate Deconstruction Workbench
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Visual Predicate Anatomy (8 Architectural Patterns)
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Click tabs to inspect verb groups
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {predicateExamples.map((ex, idx) => (
              <button
                key={ex.id}
                onClick={() => setSelectedExampleIndex(idx)}
                className={`p-3 rounded-2xl text-left border transition-all duration-200 space-y-1 ${
                  selectedExampleIndex === idx
                    ? "bg-indigo-600/30 border-indigo-400 shadow-lg ring-2 ring-indigo-500/20"
                    : "bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${ex.badge}`}>
                  {ex.domain}
                </span>
                <p className="text-xs font-semibold text-white truncate">
                  {ex.title}
                </p>
              </button>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-white">
              "{predicateExamples[selectedExampleIndex].sentence}"
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono block border-b border-emerald-500/20 pb-2">
                  SIMPLE PREDICATE (VERB CORE)
                </span>
                <p className="text-base font-bold text-emerald-300 font-mono">
                  "{predicateExamples[selectedExampleIndex].simplePredicate}"
                </p>
                <div className="text-xs text-slate-300 pt-2 border-t border-emerald-950">
                  <span className="text-slate-400">Verb Chain Breakdown: </span>
                  {predicateExamples[selectedExampleIndex].verbChain}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-3">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider font-mono block border-b border-purple-500/20 pb-2">
                  COMPLETE PREDICATE (FULL EXPANSION)
                </span>
                <p className="text-sm font-bold text-purple-200 font-mono leading-relaxed">
                  "{predicateExamples[selectedExampleIndex].completePredicate}"
                </p>
                <div className="text-xs text-slate-300 pt-2 border-t border-purple-950">
                  <span className="text-slate-400">Complements & Settings: </span>
                  {predicateExamples[selectedExampleIndex].complementsAndAdjuncts}
                </div>
              </div>
            </div>

            {showBengali && (
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-emerald-300 leading-relaxed">
                <strong>বাংলা ব্যাকরণগত বিশ্লেষণ:</strong> {predicateExamples[selectedExampleIndex].analysisBn}
              </div>
            )}
          </div>
        </div>

        {/* Practice Questions */}
        <FAQTemplate
          questions={questions}
          showBengali={showBengali}
          title="Topic 2 Diagnostic Assessment"
        />

        <PlainTextPrint
          content={noteText}
          title="Topic 2: The Predicate Core Comprehensive Note"
        />

        <Teacher />
      </div>
    </div>
  );
}
