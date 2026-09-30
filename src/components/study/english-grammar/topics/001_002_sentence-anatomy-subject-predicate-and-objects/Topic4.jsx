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
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

export default function Topic4() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);
  const [activeDiagnosticIndex, setActiveDiagnosticIndex] = useState(0);

  // 8 Multi-Domain Indirect Object Examples
  const dativeExamples = [
    {
      id: 0,
      title: "Canonical Transfer Verb (Give/Send)",
      domain: "Academia & Guidance",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      sentence: "Mentor Sukanta Sir gave Swadeep an advanced textbook on sentence syntax.",
      dativeShiftParaphrase: "Mentor Sukanta Sir gave an advanced textbook on sentence syntax TO Swadeep.",
      indirectObject: "Swadeep (Recipient Person)",
      directObject: "an advanced textbook on sentence syntax (Transferred Entity)",
      prepositionType: "'TO' Dative (Transfer of Possession / Recipient)",
      dualPassive: "1. Swadeep was given an advanced textbook... | 2. An advanced textbook was given to Swadeep...",
      analysisBn: "Ditransitive Verb 'gave' দুটি রূপ নেয়: SVOO (gave Swadeep a textbook) অথবা SVO + to-PP (gave a textbook to Swadeep)।"
    },
    {
      id: 1,
      title: "Benefactive Creation Verb (Bake/Build/Buy)",
      domain: "Culinary & Family",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      sentence: "Tuhina baked her classmates a batch of delicious cookies.",
      dativeShiftParaphrase: "Tuhina baked a batch of delicious cookies FOR her classmates.",
      indirectObject: "her classmates (Beneficiary)",
      directObject: "a batch of delicious cookies (Created Item)",
      prepositionType: "'FOR' Dative (Benefactive Action performed for someone's benefit)",
      dualPassive: "A batch of delicious cookies was baked FOR her classmates by Tuhina.",
      analysisBn: "'bake', 'buy', 'build' ইত্যাদি Creation Verb 'FOR' Dative নেয় (baked for her classmates)।"
    },
    {
      id: 2,
      title: "Latinate Verb Blocking Dative Shift (Explain)",
      domain: "Academic Fatal Trap",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      sentence: "The professor explained the complex grammatical derivation to the students.",
      dativeShiftParaphrase: "❌ Fatal Error: *'The professor explained the students the derivation' (Dative Shift Strictly BLOCKED!)",
      indirectObject: "the students (Must be governed by preposition 'to')",
      directObject: "the complex grammatical derivation",
      prepositionType: "Strictly 'TO' Prepositional Phrase Required",
      dualPassive: "The complex derivation was explained TO the students by the professor.",
      analysisBn: "ল্যাটিনজাত Verb 'explain', 'describe', 'introduce' কখনো SVOO ডাবল অবজেক্ট নেয় না; এদের সাথে সর্বদা 'to' বসাতে হয়।"
    },
    {
      id: 3,
      title: "Pronoun Direct Object Constraint",
      domain: "Linguistic Word Order",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      sentence: "Sukanta Sir handed it to Debangshu immediately.",
      dativeShiftParaphrase: "❌ Unidiomatic: *'Sukanta Sir handed Debangshu it' (Pronoun DO mandates Prepositional Dative!)",
      indirectObject: "Debangshu",
      directObject: "it (Pronominal Direct Object)",
      prepositionType: "'TO' Dative strictly mandatory when DO is a weak pronoun ('it' / 'them')",
      dualPassive: "It was handed to Debangshu immediately.",
      analysisBn: "Direct Object যদি দুর্বল Pronoun (যেমন: 'it' বা 'them') হয়, তবে Dative Shift না করে 'handed it to Debangshu' লিখতে হয়।"
    },
    {
      id: 4,
      title: "Communication / Information Verb (Teach/Tell)",
      domain: "Classroom Instruction",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      sentence: "The master instructor taught the Barrackpore scholars the seven sentence patterns.",
      dativeShiftParaphrase: "The master instructor taught the seven sentence patterns TO the Barrackpore scholars.",
      indirectObject: "the Barrackpore scholars (Learners)",
      directObject: "the seven sentence patterns (Subject Matter)",
      prepositionType: "'TO' Dative",
      dualPassive: "1. The scholars were taught the seven patterns... | 2. The seven patterns were taught to the scholars...",
      analysisBn: "'teach' Verb-এর পর ব্যক্তিবাচক IO (the scholars) এবং বিষয়বাচক DO (the seven patterns) উভয়কেই Passive-এর Subject করা যায়।"
    },
    {
      id: 5,
      title: "Procurement / Purchase Verb (Procure/Buy)",
      domain: "Enterprise IT",
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      sentence: "The department purchased the senior developers dedicated cloud workstations.",
      dativeShiftParaphrase: "The department purchased dedicated cloud workstations FOR the senior developers.",
      indirectObject: "the senior developers",
      directObject: "dedicated cloud workstations",
      prepositionType: "'FOR' Dative (Procurement on behalf of beneficiaries)",
      dualPassive: "Dedicated cloud workstations were purchased FOR the developers by the department.",
      analysisBn: "উপকারভোগীর জন্য কেনাকাটা বোঝালে 'FOR' Preposition যুক্ত Dative Shift হয়।"
    },
    {
      id: 6,
      title: "Latinate Verb Blocking Dative Shift (Suggest/Propose)",
      domain: "Corporate Strategy",
      badge: "bg-teal-500/20 text-teal-300 border-teal-500/30",
      sentence: "The consultant suggested a novel architectural roadmap to the board.",
      dativeShiftParaphrase: "❌ Ungrammatical: *'The consultant suggested the board a novel roadmap'",
      indirectObject: "the board (Governed by 'to')",
      directObject: "a novel architectural roadmap",
      prepositionType: "Mandatory Preposition 'TO'",
      dualPassive: "A novel roadmap was suggested TO the board by the consultant.",
      analysisBn: "'suggest', 'propose' ইত্যাদি Verb-এর পরেও ব্যক্তিবাচক অবজেক্টের পূর্বে বাধ্যতামূলকভাবে 'to' বসে।"
    },
    {
      id: 7,
      title: "Directional Adverbial vs True Indirect Object Distinction",
      domain: "Syntactic Ambiguity",
      badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      sentence: "Swadeep sent a parcel to London vs Swadeep sent a parcel to Debangshu.",
      dativeShiftParaphrase: "'to Debangshu' $\rightarrow$ 'sent Debangshu a parcel' (True IO!) | 'to London' $\rightarrow$ *'sent London a parcel' (Locative Adverbial!)",
      indirectObject: "Debangshu (Animate Recipient) vs London (Inanimate Location)",
      directObject: "a parcel",
      prepositionType: "Recipient 'to' vs Locative Preposition 'to'",
      dualPassive: "Debangshu was sent a parcel. (London cannot be sent a parcel).",
      analysisBn: "'to London' স্থান নির্দেশক Adverbial (Dative Shift অসম্ভব), কিন্তু 'to Debangshu' ব্যক্তিবাচক Indirect Object (Dative Shift সম্ভব)।"
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
                  Module 001_002 · Topic 4
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Indirect Objects & Dative Shift: Ditransitive Mechanics
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Deconstruct double-object structures (SVOO), the dative alternation (to/for shifts), recipient vs beneficiary dynamics, and Latinate verb constraints.
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
                  <strong>Indirect Object (গৌণ কর্ম):</strong> Verb-এর কাজের ফল বা উপহার যে ব্যক্তি পায় (যেমন: <em>gave me a book</em>-এ 'me')। Dative Shift-এর মাধ্যমে একে <em>'gave a book to me'</em> রূপ দেওয়া যায়।
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
                Indirect Objects in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                When someone gives, buys, or passes something, there is a living receiver (Indirect Object) and an item (Direct Object).
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              Who Gets What?
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Standard Ditransitive SVOO */}
            <div className="p-6 rounded-2xl bg-slate-950/90 border border-amber-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-amber-400" />
                  1. SVOO: Giver $\rightarrow$ Recipient $\rightarrow$ Thing
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                  Double Object
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-white">
                "Sukanta Sir gifted Swadeep a high-end laptop."
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-300 font-mono">Part 1: [Sukanta Sir]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-200">SUBJECT (The Giver)</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">The person who performs the gifting action.</p>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300 font-mono">Part 2: [gifted]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200">DITRANSITIVE VERB</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">An action transferring an item to a beneficiary.</p>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 font-mono">Part 3: [Swadeep]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-200">INDIRECT OBJECT (Who gets it?)</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">Ask: <em>"Gifted WHOM?"</em> $\rightarrow$ <strong>Swadeep</strong>.</p>
                </div>

                <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-300 font-mono">Part 4: [a high-end laptop]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-200">DIRECT OBJECT (What was gifted?)</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">Ask: <em>"Gifted WHAT?"</em> $\rightarrow$ <strong>a high-end laptop</strong>.</p>
                </div>
              </div>

              {showBengali && (
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-[11px] text-amber-200 leading-relaxed">
                  <strong>সহজ ভাষায়:</strong> Swadeep হলো ব্যক্তিবাচক Indirect Object (গ্রহীতা) এবং laptop হলো বস্তুবাচক Direct Object।
                </div>
              )}
            </div>

            {/* Dative Shift Permutation */}
            <div className="p-6 rounded-2xl bg-slate-950/90 border border-indigo-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-indigo-400" />
                  2. Dative Shift: SVO + Prepositional Phrase
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                  TO / FOR Shift
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-white">
                "Sukanta Sir gifted a high-end laptop TO Swadeep."
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-indigo-300 font-mono text-xs block">🔄 How the Swap Works:</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    When the Direct Object (<em>a laptop</em>) moves right next to the verb, the person (<em>Swadeep</em>) gets pushed to the back with a preposition: <strong>'TO'</strong> for transfer, or <strong>'FOR'</strong> for buying/baking.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-1.5">
                  <span className="font-bold text-rose-300 font-mono text-xs block">⚠️ The Latinate Verb Trap (EXPLAIN / DESCRIBE):</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Latinate verbs like <em>explain, describe, introduce</em> <strong>FORBID</strong> SVOO! You can NEVER say *'explained me the problem'. You MUST say: <strong>'explained the problem TO me'</strong>.
                  </p>
                </div>
              </div>

              {showBengali && (
                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-[11px] text-indigo-200 leading-relaxed">
                  <strong>সহজ ভাষায়:</strong> বস্তুবাচক Object আগে আসলে ব্যক্তির পূর্বে 'to' বা 'for' বসে (gave a book TO me)। 'explain me' বলা মারাত্মক ভুল; 'explain to me' বলতে হয়।
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Practice Questions */}
        <FAQTemplate
          questions={questions}
          showBengali={showBengali}
          title="Topic 4 Diagnostic Assessment"
        />

        <PlainTextPrint
          content={noteText}
          title="Topic 4: Indirect Objects & Dative Shift Comprehensive Note"
        />

        <Teacher />
      </div>
    </div>
  );
}
