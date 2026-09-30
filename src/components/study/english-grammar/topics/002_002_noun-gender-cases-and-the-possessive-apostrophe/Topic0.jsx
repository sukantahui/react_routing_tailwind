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
  FileCheck,
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
  const [selectedApostropheRule, setSelectedApostropheRule] = useState(0);

  // Apostrophe Precision Simulator Data
  const apostropheRules = [
    {
      category: "Singular Noun",
      formula: "Singular Noun + 's",
      example: "The student's laboratory manual",
      explanation: "Applies to any standard singular entity. Add an apostrophe followed by 's'.",
      explanationBn: "যে কোনো সাধারণ একবচন Noun-এর সাথে `'s` যুক্ত করে Possessive করতে হয়।"
    },
    {
      category: "Regular Plural ending in -s",
      formula: "Plural Noun + ' (apostrophe only)",
      example: "The students' common room in Barrackpore center",
      explanation: "When a plural noun already ends in 's', add strictly the apostrophe tick without a redundant second 's'.",
      explanationBn: "যেসব বহুবচন Noun-এর শেষে আগে থেকেই '-s' থাকে, সেগুলোতে শুধুমাত্র Apostrophe (') বসে।"
    },
    {
      category: "Irregular Plural (No -s)",
      formula: "Irregular Plural Noun + 's",
      example: "The women's research committee",
      explanation: "Irregular plurals like women, children, men, people do not end in 's'; therefore they take apostrophe + 's'.",
      explanationBn: "Women, children, men-এর মতো যেসব Plural-এর শেষে '-s' নেই, সেগুলোতে `'s` যুক্ত করতে হয়।"
    },
    {
      category: "Joint Ownership",
      formula: "Noun A and Noun B + 's",
      example: "Swadeep and Debangshu's joint venture",
      explanation: "When two entities share joint possession of the SAME single item, only the last noun takes 's.",
      explanationBn: "দুজন ব্যক্তি যৌথভাবে একই জিনিসের মালিক হলে শুধুমাত্র শেষের নামের সাথে `'s` বসে।"
    },
    {
      category: "Separate Ownership",
      formula: "Noun A's and Noun B's",
      example: "Swadeep's and Debangshu's individual laptops",
      explanation: "Whendenoting distinct, separate possessions, both nouns require their own apostrophe + 's'.",
      explanationBn: "পৃথক পৃথক মালিকানা বোঝালে প্রত্যেকের নামের সাথে আলাদাভাবে `'s` যুক্ত করতে হয়।"
    },
    {
      category: "Compound Noun",
      formula: "Compound Noun Head-Phrase's",
      example: "My brother-in-law's new automobile",
      explanation: "While the plural marker attaches to the head noun ('brothers-in-law'), the possessive attaches strictly to the final word.",
      explanationBn: "Compound Noun-এর ক্ষেত্রে Possessive Apostrophe সর্বদাই শেষ শব্দের সাথে যুক্ত হয়।"
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
                  Segment 2 · Nominal Domain
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Module 002_002
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Estimated: 2.5 Hours
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Noun Gender, Cases & The Possessive Apostrophe Mechanics
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Master the 4 grammatical cases (Nominative, Accusative, Dative, Vocative), gender classifications, and the precise legal rules of the possessive apostrophe.
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
                  Noun Cases (যেমন: <strong>Nominative</strong>, <strong>Accusative</strong>, <strong>Dative</strong>, <strong>Vocative</strong>, <strong>Genitive</strong>) এবং <strong>Possessive Apostrophe</strong>-এর সমস্ত মূল ব্যাকরণিক টার্ম ইংরেজিতে রাখা হয়েছে। বাংলা ভাষা অপোস্ট্রফির নিখুঁত ব্যবহার ও সম্বন্ধ পদের জটিল নিয়ম ব্যাখ্যার জন্য ব্যবহৃত হয়েছে।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 2. THE FOUR NOUN CASES MATRIX                                             */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                <Layers className="w-6 h-6 text-indigo-400" />
                The Four Core Noun Cases
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Syntactic relation between a noun and other words in the sentence:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nominative */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                  1. NOMINATIVE CASE
                </span>
                <span className="text-xs text-slate-500 font-mono">Subject</span>
              </div>
              <h4 className="text-white font-semibold text-sm">Grammatical Subject of Finite Verb</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Answers 'Who?' or 'What?' performs the action of the verb.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 text-xs font-mono text-slate-300">
                • <strong className="text-blue-300">Swadeep</strong> solved the algorithm.
              </div>
            </div>

            {/* Accusative */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">
                  2. ACCUSATIVE CASE
                </span>
                <span className="text-xs text-slate-500 font-mono">Direct Object</span>
              </div>
              <h4 className="text-white font-semibold text-sm">Direct Receiver of Transitive Action</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Answers 'Whom?' or 'What?' receives the action directly from the verb.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 text-xs font-mono text-slate-300">
                • Swadeep wrote <strong className="text-purple-300">the algorithm</strong>.
              </div>
            </div>

            {/* Dative */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                  3. DATIVE CASE
                </span>
                <span className="text-xs text-slate-500 font-mono">Indirect Object</span>
              </div>
              <h4 className="text-white font-semibold text-sm">Beneficiary Receiving Direct Object</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Answers 'To whom?' or 'For whom?' the action is executed.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 text-xs font-mono text-slate-300">
                • Sukanta Sir gave <strong className="text-amber-300">Tuhina</strong> a certificate.
              </div>
            </div>

            {/* Vocative */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono">
                  4. VOCATIVE CASE
                </span>
                <span className="text-xs text-slate-500 font-mono">Case of Address</span>
              </div>
              <h4 className="text-white font-semibold text-sm">Direct Person/Entity Addressed</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Used when calling or invoking someone directly by name or title.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 text-xs font-mono text-slate-300">
                • <strong className="text-rose-300">Debangshu</strong>, please compile the code.
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE POSSESSIVE APOSTROPHE SIMULATOR                            */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                Genitive Precision Lab
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                The Possessive Apostrophe Master Rules
              </h2>
            </div>
            <p className="text-slate-400 text-xs max-w-xs">
              Click a category below to see exact punctuation formulas and examples:
            </p>
          </div>

          {/* Category Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {apostropheRules.map((rule, rIdx) => (
              <button
                key={rIdx}
                type="button"
                onClick={() => setSelectedApostropheRule(rIdx)}
                className={`p-3 rounded-xl text-left border text-xs font-bold transition-all duration-200 ${
                  selectedApostropheRule === rIdx
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-950 scale-105"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                {rule.category}
              </button>
            ))}
          </div>

          {/* Active Card Display */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-indigo-500/30 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">
                Category: {apostropheRules[selectedApostropheRule].category}
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Formula: {apostropheRules[selectedApostropheRule].formula}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm font-mono text-emerald-300 font-bold">
              "{apostropheRules[selectedApostropheRule].example}"
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Rule Rationale:</strong> {apostropheRules[selectedApostropheRule].explanation}
            </p>

            {showBengali && (
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-200 text-xs animate-fade-in flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>বাংলা নিয়ম:</strong> {apostropheRules[selectedApostropheRule].explanationBn}</span>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. 'IT'S' VS 'ITS' DEFENSIVE WARNING                                      */}
        {/* ========================================================================= */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              High-Frequency Fatal Error
            </div>
            <h3 className="text-lg font-bold text-white">The Crucial Distinction: "It's" vs "Its"</h3>
            <p className="text-slate-400 text-xs">
              <strong className="text-emerald-400">It's</strong> = Contraction for "It is" | <strong className="text-amber-400">Its</strong> = Possessive pronoun (NO apostrophe, like hers, yours, ours).
            </p>
          </div>
          <div className="shrink-0">
            <span className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-slate-950 text-slate-300 border border-slate-800">
              The cat licked ITS paws ✔️
            </span>
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
                Classroom Dialogue: Mentor Sukanta Sir & Students
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Dissecting Joint vs Separate Possession and Inanimate Noun limits
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed">
            {/* Dialogue: Debangshu */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-400">Debangshu (Student):</span>
                <span className="text-slate-500 font-mono">Question on Joint vs Separate Possession</span>
              </div>
              <p className="text-slate-300">
                "Sir, in legal agreements, what is the exact difference between <em>'Swadeep and Abhronila's thesis'</em> versus <em>'Swadeep's and Abhronila's theses'</em>?"
              </p>
            </div>

            {/* Response: Sukanta Sir */}
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-1.5 ml-4 sm:ml-8">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400">Sukanta Sir (Mentor):</span>
                <span className="text-indigo-400 font-mono font-semibold">The Ownership Multiplicity Law</span>
              </div>
              <p className="text-slate-200">
                "Crucial legal distinction, Debangshu! <em>'Swadeep and Abhronila's thesis'</em> means both co-authored a <strong>single joint paper</strong> together. But <em>'Swadeep's and Abhronila's theses'</em> means Swadeep wrote one independent thesis and Abhronila wrote another separate thesis—<strong>two distinct documents</strong>. In competitive exams, check whether the possessed noun is singular joint or plural separate!"
              </p>
              {showBengali && (
                <p className="text-xs text-emerald-300 border-t border-indigo-900/50 pt-1.5 mt-1">
                  বাংলা টিপস: যৌথ মালিকানা (Joint) হলে শুধুমাত্র দ্বিতীয় নামের সাথে `'s` বসে; কিন্তু আলাদা আলাদা মালিকানা (Separate) হলে উভয়ের নামের সাথেই `'s` বসে।
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. AUXILIARY SYSTEMS: FAQS, PRINT NOTES, DICTIONARY, TEACHER PROFILE       */}
        {/* ========================================================================= */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Module 002_002 Diagnostic Assessment & Practice Bank (25 MCQs)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Module 002_002: Noun Gender, Cases & The Possessive Apostrophe"
          />

          <WordDictionary />

          <Teacher
            note="Precision with possessive apostrophes and noun cases is the hallmark of professional grammatical literacy and legal clarity. — Sukanta Hui"
          />
        </div>

        {/* ========================================================================= */}
        {/* 7. NEXT MODULE NAVIGATION LINK                                            */}
        {/* ========================================================================= */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Next Step in Curriculum</span>
            <h3 className="text-xl font-bold text-white">
              Module 002_003: Pronoun Classification, Antecedent Harmony & Politeness Order
            </h3>
            <p className="text-slate-400 text-xs max-w-xl">
              Master the 9 pronoun families, the 231 politeness rule, 123 confession rule, Who vs Whom, and relative 'That' vs 'Which'.
            </p>
          </div>

          <a
            href="/english-grammar/module/002_003_pronoun-classification-and-case-harmony"
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-950/50 hover:shadow-indigo-900/80 hover:scale-105 shrink-0"
          >
            <span>Proceed to Module 002_003</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
