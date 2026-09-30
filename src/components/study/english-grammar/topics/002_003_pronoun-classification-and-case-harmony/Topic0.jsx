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
  Shuffle,
  Users,
  UserCheck
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedOrderMode, setSelectedOrderMode] = useState("polite");

  // 9 Pronoun Families Data
  const pronounFamilies = [
    { name: "Personal", examples: "I, you, he, she, it, we, they", function: "Replaces specific persons or entities." },
    { name: "Demonstrative", examples: "this, that, these, those", function: "Points to specific items in space/time." },
    { name: "Relative", examples: "who, whom, whose, which, that", function: "Links subordinate relative clauses." },
    { name: "Interrogative", examples: "who, whom, whose, which, what", function: "Asks direct or indirect questions." },
    { name: "Reflexive", examples: "myself, yourself, himself, themselves", function: "Turns action back upon the subject." },
    { name: "Emphatic", examples: "I myself, she herself", function: "Adds dramatic emphasis to nominal subject." },
    { name: "Indefinite", examples: "everyone, somebody, nobody, none, all", function: "Refers to non-specific quantities/entities." },
    { name: "Distributive", examples: "each, either, neither", function: "Refers to members of a group individually." },
    { name: "Reciprocal", examples: "each other (two), one another (>two)", function: "Expresses mutual iterative relationship." }
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
                  Module 002_003
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Estimated: 2.5 Hours
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Pronoun Classification, Antecedent Harmony & Politeness Order
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Master the 9 pronoun families, the 231 politeness sequencing rule, 123 confession rule, Who vs Whom mechanics, and relative pronoun invariants.
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
                  Pronoun-এর সমস্ত টেকনিক্যাল টার্ম (যেমন: <strong>Personal</strong>, <strong>Relative</strong>, <strong>Reflexive</strong>, <strong>Emphatic</strong>, <strong>Indefinite</strong>, <strong>231 Politeness Rule</strong>, <strong>Who vs Whom</strong>) মূল ইংরেজিতে রাখা হয়েছে। বাংলা ভাষা সর্বনামের পারস্পরিক ক্রম ও ব্যাকরণিক ঐক্য (Antecedent Harmony) স্পষ্ট করার জন্য ব্যবহৃত হয়েছে।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 2. THE 231 POLITENESS VS 123 CONFESSION INTERACTIVE LAB                   */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Shuffle className="w-4 h-4" />
                Sequencing Protocol
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                The 231 Politeness Rule vs 123 Confession Rule
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedOrderMode("polite")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedOrderMode === "polite"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950"
                    : "bg-slate-950 text-slate-400 hover:text-white"
                }`}
              >
                231 Rule (Positive/Neutral)
              </button>
              <button
                type="button"
                onClick={() => setSelectedOrderMode("confess")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedOrderMode === "confess"
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-950"
                    : "bg-slate-950 text-slate-400 hover:text-white"
                }`}
              >
                123 Rule (Blame/Plural)
              </button>
            </div>
          </div>

          {selectedOrderMode === "polite" ? (
            <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-indigo-900/40 pb-3">
                <span className="text-sm font-bold text-indigo-300">
                  Politeness Hierarchy: 2nd Person $\rightarrow$ 3rd Person $\rightarrow$ 1st Person
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-indigo-500/20 text-indigo-200">
                  Code: 2-3-1
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-base font-mono text-emerald-300 font-bold">
                "You (2), he (3), and I (1) will coordinate the Barrackpore seminar."
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong className="text-white">Rationale:</strong> English etiquette requires placing the listener first ('You'), third-party individuals next ('He/She'), and humility dictates placing oneself last ('I').
              </p>
              {showBengali && (
                <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/20 text-indigo-200 text-xs flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>বাংলা শিষ্টাচার নিয়ম:</strong> কোনো ভালো বা সাধারণ কাজে সর্বদা নিজেকে সবার শেষে ('I') এবং শ্রোতাকে সবার প্রথমে ('You') রাখতে হয়: <em>"You, he, and I"</em>।</span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-rose-900/40 pb-3">
                <span className="text-sm font-bold text-rose-300">
                  Responsibility Hierarchy: 1st Person $\rightarrow$ 2nd Person $\rightarrow$ 3rd Person
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-rose-500/20 text-rose-200">
                  Code: 1-2-3
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-base font-mono text-rose-300 font-bold">
                "I (1), you (2), and he (3) are to blame for this calculation error."
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong className="text-white">Rationale:</strong> When confessing a fault, admitting a blunder, or using plural pronouns ('We, you, and they'), the speaker takes initial responsibility by placing 'I' first.
              </p>
              {showBengali && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/20 text-rose-200 text-xs flex items-start gap-2">
                  <Check className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>বাংলা দায়বদ্ধতা নিয়ম:</strong> কোনো ভুল, অপরাধ বা ত্রুটির দায়িত্ব নেওয়ার সময় নিজেকে সবার প্রথমে ('I') রাখতে হয়: <em>"I, you, and he are to blame"</em>।</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 3. THE NINE PRONOUN FAMILIES GRID                                         */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                <Layers className="w-6 h-6 text-indigo-400" />
                The Nine Pronoun Families Taxonomy
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pronounFamilies.map((pf, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono">
                  {idx + 1}. {pf.name}
                </span>
                <p className="text-slate-400 text-xs font-mono pt-1 text-emerald-400">
                  {pf.examples}
                </p>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {pf.function}
                </p>
              </div>
            ))}
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
                The He/Him shortcut for Who vs Whom and 'Between you and me'
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed">
            {/* Dialogue: Swadeep */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-400">Swadeep (Student):</span>
                <span className="text-slate-500 font-mono">Question on Who vs Whom</span>
              </div>
              <p className="text-slate-300">
                "Sir, in long complex sentences, I often get confused whether to write <em>'Who'</em> or <em>'Whom'</em>. Is there a foolproof mental shortcut?"
              </p>
            </div>

            {/* Response: Sukanta Sir */}
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-1.5 ml-4 sm:ml-8">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400">Sukanta Sir (Mentor):</span>
                <span className="text-indigo-400 font-mono font-semibold">The He/Him Shortcut</span>
              </div>
              <p className="text-slate-200">
                "Yes! Use the <strong>He/Him test</strong>, Swadeep: Rephrase the relative clause into a simple answer sentence. If the answer requires <strong>HE</strong> (Subject), use <strong>WHO</strong>. If the answer requires <strong>HIM</strong> (Object), use <strong>WHOM</strong>. Example: <em>'The boy [who/whom] won the medal'</em> $\rightarrow$ <em>'HE won the medal'</em> $\rightarrow$ Use <strong>WHO</strong>. <em>'The boy [who/whom] I invited'</em> $\rightarrow$ <em>'I invited HIM'</em> $\rightarrow$ Use <strong>WHOM</strong>."
              </p>
              {showBengali && (
                <p className="text-xs text-emerald-300 border-t border-indigo-900/50 pt-1.5 mt-1">
                  বাংলা শর্টকাট: বাক্যাংশের উত্তর যদি 'He' হয় তবে 'Who' বসবে; উত্তর যদি 'Him' হয় তবে 'Whom' বসবে।
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
            title="Module 002_003 Diagnostic Assessment & Practice Bank (25 MCQs)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Module 002_003: Pronoun Classification, Antecedent Harmony & Politeness Order"
          />

          <WordDictionary />

          <Teacher
            note="Pronoun case harmony and politeness order reflect both syntactic mastery and formal communicative elegance. — Sukanta Hui"
          />
        </div>

        {/* ========================================================================= */}
        {/* 6. NEXT MODULE NAVIGATION LINK                                            */}
        {/* ========================================================================= */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Next Step in Curriculum</span>
            <h3 className="text-xl font-bold text-white">
              Module 002_004: Articles (A, An, The), Zero Article & Quantifiers
            </h3>
            <p className="text-slate-400 text-xs max-w-xl">
              Master phonetic initial sound rules for A/An, the 20+ invariants of The, zero article omission rules, and Few vs Little quantifiers.
            </p>
          </div>

          <a
            href="/english-grammar/module/002_004_articles-and-quantifying-determiners"
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-950/50 hover:shadow-indigo-900/80 hover:scale-105 shrink-0"
          >
            <span>Proceed to Module 002_004</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
