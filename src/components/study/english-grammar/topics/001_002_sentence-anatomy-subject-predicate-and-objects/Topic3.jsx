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
  CheckSquare,
  Info
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

export default function Topic3() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);
  const [activeDiagnosticIndex, setActiveDiagnosticIndex] = useState(0);

  // 8 Multi-Domain Direct Object & Transitivity Examples
  const transitivityExamples = [
    {
      id: 0,
      title: "Monotransitive Physical Action",
      domain: "Computer Hardware",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      sentence: "The technician assembled the high-performance server motherboard.",
      verb: "assembled",
      transitivityType: "Monotransitive (Requires 1 Direct Object)",
      directObject: "the high-performance server motherboard",
      passivization: "The high-performance server motherboard was assembled by the technician.",
      queryTest: "What did the technician assemble? $\rightarrow$ 'the motherboard'",
      analysisBn: "'assembled' একটি Transitive Verb যা সরাসরি 'the motherboard' Direct Object-এর ওপর প্রযুক্ত হয়েছে। একে সহজে Passive রূপ দেওয়া সম্ভব।"
    },
    {
      id: 1,
      title: "Strictly Intransitive Verb of State/Motion",
      domain: "Physics & Astronomy",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      sentence: "The celestial comet vanished beyond the distant nebula.",
      verb: "vanished",
      transitivityType: "Intransitive (Takes NO Direct Object)",
      directObject: "None (Followed by Prepositional Locative Adjunct)",
      passivization: "❌ Impossible! Intransitive verbs cannot undergo passivization.",
      queryTest: "Where did it vanish? $\rightarrow$ 'beyond the nebula' (Adverbial of place, not an object!)",
      analysisBn: "'vanished' Intransitive Verb হওয়ায় কোনো Object নেই; পেছনের অংশটি স্থান নির্দেশক Adverbial। তাই এর কোনো Passive রূপ হয় না।"
    },
    {
      id: 2,
      title: "Ergative / Ambitransitive Verb (Transitive Use)",
      domain: "Culinary & Chemistry",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      sentence: "The chef boiled the purified water in a copper vessel.",
      verb: "boiled (Transitive Causative)",
      transitivityType: "Ergative (Used with Agent Causing Action)",
      directObject: "the purified water",
      passivization: "The purified water was boiled by the chef in a copper vessel.",
      queryTest: "What did the chef boil? $\rightarrow$ 'the purified water'",
      analysisBn: "'boiled' এখানে Transitive রূপে ব্যবহৃত হয়েছে কারণ রাঁধুনি জল ফোটার কাজটি ঘটাচ্ছে (Agentive Causer)।"
    },
    {
      id: 3,
      title: "Ergative / Ambitransitive Verb (Intransitive Use)",
      domain: "Natural Phenomena",
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      sentence: "The purified water boiled rapidly in the laboratory beaker.",
      verb: "boiled (Intransitive Self-Action)",
      transitivityType: "Ergative (Undergoer as Grammatical Subject)",
      directObject: "None (Followed by Manner Adverb 'rapidly')",
      passivization: "❌ No passivization (The entity undergoing the change is already the subject).",
      queryTest: "How did it boil? $\rightarrow$ 'rapidly' (Manner Adverb)",
      analysisBn: "এখানে 'boiled' স্বয়ংক্রিয়ভাবে ঘটা বোঝাতে Intransitive রূপে বসেছে; কোনো Direct Object নেই।"
    },
    {
      id: 4,
      title: "Cognate Object Construction",
      domain: "Literature & Epic",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      sentence: "The brave revolutionary soldier fought a valiant fight for liberty.",
      verb: "fought",
      transitivityType: "Intransitive Verb with Cognate Object",
      directObject: "a valiant fight (Derived from same root as verb 'fought')",
      passivization: "A valiant fight for liberty was fought by the brave revolutionary soldier.",
      queryTest: "What did he fight? $\rightarrow$ 'a valiant fight'",
      analysisBn: "সাধারণত Intransitive 'fight' Verb-টি সমধাতুজ Noun 'a valiant fight'-কে Cognate Object হিসেবে গ্রহণ করে Transitive আচরণ করেছে।"
    },
    {
      id: 5,
      title: "Reflexive Direct Object",
      domain: "Sports & Physiology",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      sentence: "The sprinter injured himself during the preliminary qualifying heats.",
      verb: "injured",
      transitivityType: "Transitive with Reflexive Pronoun",
      directObject: "himself (Refers back to the subject 'sprinter')",
      passivization: "Rare/Unidiomatic with reflexive pronouns, but syntactically accusative.",
      queryTest: "Whom did he injure? $\rightarrow$ 'himself'",
      analysisBn: "'injured' Verb-এর Direct Object হিসেবে 'himself' Reflexive Pronoun বসেছে (Subject ও Object একই ব্যক্তি হলেও ব্যাকরণগতভাবে Transitive)।"
    },
    {
      id: 6,
      title: "Clausal Direct Object (Noun Clause)",
      domain: "Software Architecture",
      badge: "bg-teal-500/20 text-teal-300 border-teal-500/30",
      sentence: "The senior architect demonstrated that the microservice architecture reduces server latency.",
      verb: "demonstrated",
      transitivityType: "Transitive with Finite That-Clause Object",
      directObject: "that the microservice architecture reduces server latency (Noun Clause)",
      passivization: "That the microservice architecture reduces latency was demonstrated by the architect.",
      queryTest: "What did the architect demonstrate? $\rightarrow$ 'that the microservice...'",
      analysisBn: "এখানে একটি সম্পূর্ণ Noun Clause ('that the microservice...') 'demonstrated' Transitive Verb-এর Direct Object হিসেবে বসেছে।"
    },
    {
      id: 7,
      title: "Pseudo-Transitive / Measure Adverbial Trap",
      domain: "Commerce & Weights",
      badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      sentence: "The comprehensive English reference encyclopedia costs fifty dollars.",
      verb: "costs (Stative Verb of Measure)",
      transitivityType: "Pseudo-Transitive (Takes Adverbial of Value, NOT a Direct Object)",
      directObject: "None! 'fifty dollars' is an Adverbial Objective of Price/Measurement.",
      passivization: "❌ Cannot passivize: *'Fifty dollars is cost by the encyclopedia' (Fatal Error!)",
      queryTest: "How much does it cost? $\rightarrow$ 'fifty dollars' (Measure, NOT receiver of action!)",
      analysisBn: "'costs' Verb-এর পর 'fifty dollars' কোনো Direct Object নয়, বরং পরিমাপক Adverbial Objective; তাই এর কোনো Passive হয় না।"
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
                  Module 001_002 · Topic 3
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Direct Objects & Transitivity: The Accusative Dynamics
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Master the mechanics of transitivity: monotransitive actions, intransitive self-containment, ergative shifts, and the passivization litmus test.
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
                  <strong>Transitive Verb (সকর্মক ক্রিয়া):</strong> যে ক্রিয়ার কাজ সরাসরি কোনো কর্ম বা Direct Object-এর ওপর প্রযুক্ত হয় (যেমন: <em>wrote a letter</em>)। <strong>Intransitive Verb (অকর্মক ক্রিয়া):</strong> যে ক্রিয়া কোনো Object ছাড়াই অর্থ সম্পন্ন করে (যেমন: <em>smiled, arrived</em>)।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* IN VERY SIMPLE LANGUAGE: ULTRA-CLEAR EXPLODED MULTI-PART BREAKDOWN       */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Beginner Friendly · Deep Step-by-Step Intuition</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Direct Objects & Transitivity in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                Transitivity is simply about energy transfer: does the verb's action strike a target or stay with the actor?
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              Energy Transfer
            </span>
          </div>

          {/* Exploded Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Transitive Card */}
            <div className="p-6 rounded-2xl bg-slate-950/90 border border-purple-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <Target className="w-4 h-4 text-purple-400" />
                  1. TRANSITIVE: Action Strikes a Target
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                  Energy Flows Outward
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-white">
                "Swadeep built a high-speed search engine."
              </div>

              {/* Exploded Parts */}
              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-300 font-mono">Part 1: [Swadeep]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-200">SUBJECT (The Doer)</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    <strong>Why Subject?</strong> Swadeep is the software developer who initiates and performs the construction action.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300 font-mono">Part 2: [built]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200">TRANSITIVE VERB (Action Engine)</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    <strong>Why Transitive?</strong> The action of building cannot stop in thin air; it MUST produce or affect an object!
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-300 font-mono">Part 3: [a high-speed search engine]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-200">DIRECT OBJECT (The Target)</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    <strong>Why Direct Object?</strong> This noun phrase receives the direct energy of 'built'.
                  </p>
                </div>

                {/* Diagnostic Tests Box */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 font-mono text-[11px]">
                  <div className="text-amber-300 font-bold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>How to Prove it's a Direct Object:</span>
                  </div>
                  <div className="text-slate-300">
                    • <strong>Question Test:</strong> <em>"Swadeep built WHAT?"</em> $\rightarrow$ <strong className="text-purple-300">"a high-speed search engine"</strong>.
                  </div>
                  <div className="text-slate-300">
                    • <strong>Passive Proof:</strong> <em>"A search engine was built by Swadeep."</em> (Valid Passive Voice!).
                  </div>
                </div>
              </div>

              {showBengali && (
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-[11px] text-purple-200 leading-relaxed">
                  <strong>সহজ ভাষায়:</strong> Swadeep (কর্তা) $\rightarrow$ built (ক্রিয়া) $\rightarrow$ a search engine (কর্ম/Direct Object)। Verb-কে 'কী তৈরি করল?' প্রশ্ন করলে এই উত্তর মেলে।
                </div>
              )}
            </div>

            {/* Intransitive Card */}
            <div className="p-6 rounded-2xl bg-slate-950/90 border border-emerald-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <Heart className="w-4 h-4 text-emerald-400" />
                  2. INTRANSITIVE: Action Stays Self-Contained
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  No External Target
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-white">
                "The express train arrived on time at the station."
              </div>

              {/* Exploded Parts */}
              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-300 font-mono">Part 1: [The express train]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-200">SUBJECT (The Moving Entity)</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    <strong>Why Subject?</strong> The locomotive that performs the arrival motion.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300 font-mono">Part 2: [arrived]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200">INTRANSITIVE VERB (Self-Contained)</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    <strong>Why Intransitive?</strong> The action is 100% complete by itself! No energy leaves to hit or create any object.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-teal-300 font-mono">Part 3: [on time] & [at the station]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-200">ADVERBIALS (NOT Objects!)</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    <strong>Why NOT Objects?</strong> 'on time' tells <em>WHEN</em> (Time), and 'at the station' tells <em>WHERE</em> (Place). They are background settings!
                  </p>
                </div>

                {/* Diagnostic Tests Box */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 font-mono text-[11px]">
                  <div className="text-amber-300 font-bold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Why there is NO Direct Object:</span>
                  </div>
                  <div className="text-slate-300">
                    • <strong>Question Test:</strong> Can you ask <em>"The train arrived WHAT?"</em> $\rightarrow$ ❌ <strong className="text-rose-400">Impossible!</strong> You can only ask <em>"WHEN did it arrive?"</em>
                  </div>
                  <div className="text-slate-300">
                    • <strong>Passive Proof:</strong> ❌ <em>"On time was arrived by the train"</em> (Complete nonsense! Intransitive verbs have NO passive voice).
                  </div>
                </div>
              </div>

              {showBengali && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-200 leading-relaxed">
                  <strong>সহজ ভাষায়:</strong> 'arrived' হলো অকর্মক ক্রিয়া (Intransitive)। 'on time' বা 'at the station' কোনো Object নয়, বরং সময় ও স্থান নির্দেশক Adverbial।
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE TRANSITIVITY WORKBENCH (8 DIVERSE EXAMPLES)                   */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Split className="w-4 h-4" />
                Transitivity & Direct Object Workbench
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Transitivity Archetypes & Passivization Tests (8 Varieties)
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Click tabs to explore verb behaviors
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {transitivityExamples.map((ex, idx) => (
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
              "{transitivityExamples[selectedExampleIndex].sentence}"
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono">
                  Verb & Transitivity Type:
                </span>
                <p className="text-sm font-bold text-white font-mono">
                  {transitivityExamples[selectedExampleIndex].verb} $\rightarrow$ {transitivityExamples[selectedExampleIndex].transitivityType}
                </p>
                <div className="pt-2 border-t border-slate-800 text-xs">
                  <span className="text-slate-400">Direct Object Constituent: </span>
                  <strong className="text-purple-300 font-mono">{transitivityExamples[selectedExampleIndex].directObject}</strong>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                  Passivization Litmus Proof:
                </span>
                <p className="text-xs font-mono text-emerald-300 leading-relaxed">
                  {transitivityExamples[selectedExampleIndex].passivization}
                </p>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  {transitivityExamples[selectedExampleIndex].queryTest}
                </div>
              </div>
            </div>

            {showBengali && (
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-emerald-300 leading-relaxed">
                <strong>বাংলা ব্যাকরণগত বিশ্লেষণ:</strong> {transitivityExamples[selectedExampleIndex].analysisBn}
              </div>
            )}
          </div>
        </div>

        {/* Practice Questions */}
        <FAQTemplate
          questions={questions}
          showBengali={showBengali}
          title="Topic 3 Diagnostic Assessment"
        />

        <PlainTextPrint
          content={noteText}
          title="Topic 3: Direct Objects & Transitivity Comprehensive Note"
        />

        <Teacher />
      </div>
    </div>
  );
}
