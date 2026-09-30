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
  Search,
  Eye,
  Info
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

export default function Topic1() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);
  const [activeDiagnosticIndex, setActiveDiagnosticIndex] = useState(0);

  // 8 Multi-Domain Dissected Examples
  const partitionExamples = [
    {
      id: 0,
      title: "Academic Complex Sentence",
      domain: "Academic & Research",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      sentence: "The dedicated young software engineering student from Barrackpore has been developing an innovative web application in the laboratory.",
      completeSubject: "The dedicated young software engineering student from Barrackpore",
      completePredicate: "has been developing an innovative web application in the laboratory",
      simpleSubject: "student (Head Noun)",
      simplePredicate: "has been developing (Finite Verb Group)",
      subjectModifiers: "Determiner ('The') + Adjectives ('dedicated', 'young', 'software engineering') + Prepositional Phrase ('from Barrackpore')",
      predicateComponents: "Finite Verb Group ('has been developing') + Direct Object ('an innovative web application') + Adverbial of Place ('in the laboratory')",
      analysisBn: "Complete Subject-এ মূল Noun 'student'-এর সাথে Determiner ও Adjective যুক্ত আছে; Complete Predicate-এ Finite Verb 'has been developing'-এর সাথে Direct Object ও স্থানিক Adverbial রয়েছে।"
    },
    {
      id: 1,
      title: "Inverted Dramatic Sentence",
      domain: "Literature & Drama",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      sentence: "Into the quiet computer seminar hall walked Mentor Sukanta Sir with a stack of advanced syntax books.",
      completeSubject: "Mentor Sukanta Sir with a stack of advanced syntax books",
      completePredicate: "walked Into the quiet computer seminar hall",
      simpleSubject: "Mentor Sukanta Sir",
      simplePredicate: "walked",
      subjectModifiers: "Proper Noun ('Mentor Sukanta Sir') + Prepositional Phrase ('with a stack of advanced syntax books')",
      predicateComponents: "Directional Locative Adverbial Phrase ('Into the quiet computer seminar hall') + Finite Verb ('walked')",
      analysisBn: "এখানে নাটকীয় বর্ণনার জন্য Predicate অংশটি বাক্যের শুরুতে বসেছে, কিন্তু কাজের আসল কর্তা হলো 'Mentor Sukanta Sir'।"
    },
    {
      id: 2,
      title: "Introductory 'There' Expletive",
      domain: "Technical & Systems",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      sentence: "There are five high-performance workstation computers running automated benchmark scripts.",
      completeSubject: "five high-performance workstation computers running automated benchmark scripts",
      completePredicate: "are located in the system (introductory 'There' + 'are')",
      simpleSubject: "computers",
      simplePredicate: "are",
      subjectModifiers: "Quantifier ('five') + Compound Adjective ('high-performance') + Noun Adjunct ('workstation') + Participial Phrase ('running automated benchmark scripts')",
      predicateComponents: "Copula/Auxiliary ('are') linked to post-verbal subject via expletive 'There'",
      analysisBn: "'There' কোনো প্রকৃত Subject নয়; আসল Subject হলো 'computers', যার কারণে Plural Verb 'are' বসেছে।"
    },
    {
      id: 3,
      title: "Introductory Dummy 'It' Cleft",
      domain: "Analytical Writing",
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      sentence: "It is extremely essential to verify every grammatical edge case before the final examination.",
      completeSubject: "to verify every grammatical edge case before the final examination (Extraposed Infinitive Subject)",
      completePredicate: "is extremely essential (with dummy anticipatory 'It')",
      simpleSubject: "to verify (Infinitive phrase head)",
      simplePredicate: "is",
      subjectModifiers: "Full Infinitive Phrase with Direct Object ('every grammatical edge case') and Temporal Adjunct ('before the final examination')",
      predicateComponents: "Linking Verb ('is') + Subject Complement Adjective Phrase ('extremely essential')",
      analysisBn: "বাক্যটিতে 'It' হলো Dummy/Anticipatory Subject; মূল ব্যাকরণগত কর্তা হলো পেছনের Infinitive Phrase: 'to verify every grammatical edge case...'।"
    },
    {
      id: 4,
      title: "Gerund Phrase as Subject",
      domain: "Software Engineering",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      sentence: "Refactoring legacy enterprise source code without unit tests poses severe architectural risks.",
      completeSubject: "Refactoring legacy enterprise source code without unit tests",
      completePredicate: "poses severe architectural risks",
      simpleSubject: "Refactoring (Gerund Head)",
      simplePredicate: "poses",
      subjectModifiers: "Gerund ('Refactoring') + Direct Object of Gerund ('legacy enterprise source code') + Prepositional Modifier ('without unit tests')",
      predicateComponents: "Transitive Verb ('poses') + Direct Object Noun Phrase ('severe architectural risks')",
      analysisBn: "এখানে 'Refactoring' Gerund-টি তার নিজস্ব Object ও Prepositional Modifier নিয়ে সম্পূর্ণ Subject গঠন করেছে। Singular Gerund হওয়ার কারণে Verb 'poses' বসেছে।"
    },
    {
      id: 5,
      title: "Compound Subject with Correlatives",
      domain: "Competitive Exam Trap",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      sentence: "Neither the lead database architect nor the frontend developers have resolved the synchronization glitch.",
      completeSubject: "Neither the lead database architect nor the frontend developers",
      completePredicate: "have resolved the synchronization glitch",
      simpleSubject: "architect, developers (Compound Head)",
      simplePredicate: "have resolved",
      subjectModifiers: "Correlative Conjunction ('Neither...nor') linking singular 'architect' and plural 'developers' (Proximity rule applies)",
      predicateComponents: "Present Perfect Verb Group ('have resolved') + Direct Object ('the synchronization glitch')",
      analysisBn: "'Neither...nor' যুক্ত Compound Subject-এ Verb-এর নিকটবর্তী Subject ('developers' - Plural) অনুযায়ী Plural Verb 'have resolved' বসেছে।"
    },
    {
      id: 6,
      title: "Interrogative Clause Partition",
      domain: "Classroom Dialogue",
      badge: "bg-teal-500/20 text-teal-300 border-teal-500/30",
      sentence: "Did the newly enrolled cohort of programming scholars master the sentence patterns?",
      completeSubject: "the newly enrolled cohort of programming scholars",
      completePredicate: "Did master the sentence patterns (Split Predicate)",
      simpleSubject: "cohort (Collective Noun Head)",
      simplePredicate: "Did master",
      subjectModifiers: "Determiner ('the') + Adverb-Participle Modifier ('newly enrolled') + Prepositional Phrase ('of programming scholars')",
      predicateComponents: "Split Auxiliary ('Did') + Lexical Verb ('master') + Direct Object ('the sentence patterns')",
      analysisBn: "প্রশ্নবোধক বাক্যে Predicate-এর Auxiliary Verb 'Did' Subject-এর পূর্বে চলে আসে; কিন্তু আসল Complete Subject হলো 'the newly enrolled cohort...'।"
    },
    {
      id: 7,
      title: "Imperative / Understood Subject",
      domain: "Direct Instructions",
      badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      sentence: "Review the seven fundamental sentence patterns carefully before submitting the assignment.",
      completeSubject: "[You] (Understood / Elliptical Second Person Subject)",
      completePredicate: "Review the seven fundamental sentence patterns carefully before submitting the assignment",
      simpleSubject: "[You]",
      simplePredicate: "Review",
      subjectModifiers: "Implicit second-person pronoun 'You' understood in imperative mood",
      predicateComponents: "Base Verb ('Review') + Direct Object ('the seven fundamental sentence patterns') + Manner Adverb ('carefully') + Temporal Prepositional Clause ('before submitting...')",
      analysisBn: "আদেশ বা নির্দেশমূলক Imperative বাক্যে Subject হিসেবে 'You' উহ্য (understood/elliptical) থাকে; সম্পূর্ণ দৃশ্যমান অংশটিই Predicate।"
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
                  Module 001_002 · Topic 1
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                The Two Structural Halves: Complete Subject vs Complete Predicate
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Partition every English sentence cleanly into who or what is performing the action (Subject) and what is asserted or done (Predicate).
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
                  একটি সম্পূর্ণ বাক্যের দুটি অংশ: <strong>Subject (উদ্দেশ্য/কর্তা)</strong> অর্থাৎ যার সম্পর্কে কিছু বলা হচ্ছে, এবং <strong>Predicate (বিধেয়)</strong> অর্থাৎ Subject সম্পর্কে যা কিছু বলা হচ্ছে (যার মধ্যে Finite Verb থাকা বাধ্যতামূলক)।
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
                Complete Subject vs Complete Predicate in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                Every sentence divides cleanly into two halves: the hero team vs the entire action story.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              Hero vs Action Expansion
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/90 border border-indigo-500/30 space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-white">
              "The dedicated young student from Barrackpore has developed an innovative web app in the lab."
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Subject Breakdown */}
              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 space-y-2.5">
                <div className="flex items-center justify-between border-b border-blue-500/20 pb-2">
                  <span className="font-bold text-blue-400 uppercase tracking-wider font-mono">
                    HALF 1: COMPLETE SUBJECT (উদ্দেশ্য)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                    The Entire Hero Team
                  </span>
                </div>
                <p className="text-sm font-bold text-white font-mono">
                  "The dedicated young student from Barrackpore"
                </p>
                <div className="space-y-1.5 text-[11px] text-slate-300 pt-2 border-t border-blue-950">
                  <div>• <strong>Simple Subject (Head):</strong> <span className="text-blue-300 font-bold">student</span> (The core noun)</div>
                  <div>• <strong>Determiner:</strong> 'The' (Definite article)</div>
                  <div>• <strong>Adjectives:</strong> 'dedicated', 'young' (Describe the student)</div>
                  <div>• <strong>Prepositional Modifier:</strong> 'from Barrackpore' (Tells where the student is from)</div>
                </div>
              </div>

              {/* Predicate Breakdown */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2.5">
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider font-mono">
                    HALF 2: COMPLETE PREDICATE (বিধেয়)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                    The Whole Action & Setting
                  </span>
                </div>
                <p className="text-sm font-bold text-white font-mono">
                  "has developed an innovative web app in the lab"
                </p>
                <div className="space-y-1.5 text-[11px] text-slate-300 pt-2 border-t border-emerald-950">
                  <div>• <strong>Simple Predicate (Verb):</strong> <span className="text-emerald-300 font-bold">has developed</span> (Finite verb group)</div>
                  <div>• <strong>Direct Object:</strong> 'an innovative web app' (What was built)</div>
                  <div>• <strong>Adverbial of Place:</strong> 'in the lab' (Where it happened)</div>
                </div>
              </div>
            </div>

            {showBengali && (
              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-[11px] text-indigo-200 leading-relaxed">
                <strong>সহজ ভাষায়:</strong> মূল Noun 'student'-এর সাথে Determiner ও Adjective যুক্ত হয়ে Complete Subject তৈরি হয়েছে; আর Finite Verb 'has developed'-এর সাথে Object ও স্থান নির্দেশক Adverbial যুক্ত হয়ে Complete Predicate তৈরি হয়েছে।
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE SENTENCE PARTITION WORKBENCH (8 DIVERSE EXAMPLES)            */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Split className="w-4 h-4" />
                Sentence Partition Workbench
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Visual Dual-Half Deconstruction (8 Distinct Structural Types)
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Click tabs to explore syntactic varieties
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {partitionExamples.map((ex, idx) => (
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
              "{partitionExamples[selectedExampleIndex].sentence}"
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
                <div className="flex items-center justify-between border-b border-blue-500/20 pb-2">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider font-mono">
                    COMPLETE SUBJECT (উদ্দেশ্য)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                    Half 1
                  </span>
                </div>
                <p className="text-sm font-bold text-white font-mono leading-relaxed">
                  "{partitionExamples[selectedExampleIndex].completeSubject}"
                </p>
                <div className="space-y-1.5 pt-2 border-t border-blue-950 text-xs">
                  <div>
                    <span className="text-slate-400">Simple Subject (Head): </span>
                    <strong className="text-blue-300 font-mono">{partitionExamples[selectedExampleIndex].simpleSubject}</strong>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    <span className="text-slate-400">Modifiers: </span>
                    {partitionExamples[selectedExampleIndex].subjectModifiers}
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                    COMPLETE PREDICATE (বিধেয়)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                    Half 2
                  </span>
                </div>
                <p className="text-sm font-bold text-white font-mono leading-relaxed">
                  "{partitionExamples[selectedExampleIndex].completePredicate}"
                </p>
                <div className="space-y-1.5 pt-2 border-t border-emerald-950 text-xs">
                  <div>
                    <span className="text-slate-400">Simple Predicate (Verb): </span>
                    <strong className="text-emerald-300 font-mono">{partitionExamples[selectedExampleIndex].simplePredicate}</strong>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    <span className="text-slate-400">Components: </span>
                    {partitionExamples[selectedExampleIndex].predicateComponents}
                  </div>
                </div>
              </div>
            </div>

            {showBengali && (
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-emerald-300 leading-relaxed">
                <strong>বাংলা ব্যাকরণগত বিশ্লেষণ:</strong> {partitionExamples[selectedExampleIndex].analysisBn}
              </div>
            )}
          </div>
        </div>

        {/* Practice Questions */}
        <FAQTemplate
          questions={questions}
          showBengali={showBengali}
          title="Topic 1 Diagnostic Assessment"
        />

        <PlainTextPrint
          content={noteText}
          title="Topic 1: Complete Subject vs Complete Predicate Comprehensive Note"
        />

        <Teacher />
      </div>
    </div>
  );
}
