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
  Scale,
  Sliders,
  ShieldCheck,
  Split,
  Link2,
  GitMerge
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeFanboys, setActiveFanboys] = useState("for");
  const [selectedParallelCase, setSelectedParallelCase] = useState("not_only");
  const [userAnswers, setUserAnswers] = useState({});
  const [revealedExplanations, setRevealedExplanations] = useState({});

  const handleOptionSelect = (qId, option) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const toggleExplanation = (qId) => {
    setRevealedExplanations((prev) => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const fanboysData = {
    for: {
      letter: "F",
      name: "FOR",
      role: "Cause / Explanation (synonymous with 'because')",
      clause1: "He was determined to succeed,",
      clause1Role: "Independent Clause 1 (Result)",
      connector: "for",
      connectorRole: "Coordinating Conjunction (Cause)",
      clause2: "he had promised his parents.",
      clause2Role: "Independent Clause 2 (Reason)",
      full: "He was determined to succeed, for he had promised his parents.",
      commaRule: "Comma precedes 'for' when linking two independent clauses.",
      bnNote: "কারণ বা ব্যাখ্যা প্রকাশ করে (যেহেতু/কারণ)। 'for' কনজাংশনটি দুটি স্বাধীন ক্লজকে যুক্ত করে কারণ নির্দেশ করছে।"
    },
    and: {
      letter: "A",
      name: "AND",
      role: "Addition of similar or sequential ideas",
      clause1: "She designed the blueprint,",
      clause1Role: "Independent Clause 1",
      connector: "and",
      connectorRole: "Coordinating Conjunction (Addition)",
      clause2: "the team built the prototype.",
      clause2Role: "Independent Clause 2",
      full: "She designed the blueprint, and the team built the prototype.",
      commaRule: "Comma precedes 'and' when joining two full independent clauses.",
      bnNote: "দুটি সমধর্মী স্বাধীন বাক্যকে যুক্ত করে ধারাবাহিকতা প্রকাশ করে।"
    },
    nor: {
      letter: "N",
      name: "NOR",
      role: "Negative addition (triggers subject-auxiliary inversion)",
      clause1: "He does not accept defeat,",
      clause1Role: "Independent Clause 1 (Negative)",
      connector: "nor",
      connectorRole: "Coordinating Conjunction (Inversion Trigger)",
      clause2: "does he surrender to despair.",
      clause2Role: "Auxiliary (does) + Subj (he) + Verb (surrender)",
      full: "He does not accept defeat, nor does he surrender to despair.",
      commaRule: "Comma precedes 'nor' + inverted auxiliary verb.",
      bnNote: "নেতিবাচক ধারণার সাথে অপর একটি নেতিবাচক বাক্য যোগ করে (Inversion ঘটে: does + he + surrender)।"
    },
    but: {
      letter: "B",
      name: "BUT",
      role: "Direct contrast or unexpected qualification",
      clause1: "The problem was formidable,",
      clause1Role: "Independent Clause 1",
      connector: "but",
      connectorRole: "Coordinating Conjunction (Contrast)",
      clause2: "the mathematicians solved it.",
      clause2Role: "Independent Clause 2",
      full: "The problem was formidable, but the mathematicians solved it.",
      commaRule: "Comma precedes 'but' when linking independent clauses.",
      bnNote: "সরাসরি বৈপরীত্য বা প্রতিকূল ভাব প্রকাশ করে।"
    },
    or: {
      letter: "O",
      name: "OR",
      role: "Alternative, choice, or condition",
      clause1: "You must submit the thesis today,",
      clause1Role: "Independent Clause 1 (Requirement)",
      connector: "or",
      connectorRole: "Coordinating Conjunction (Alternative/Condition)",
      clause2: "you will forfeit the grant.",
      clause2Role: "Independent Clause 2 (Consequence)",
      full: "You must submit the thesis today, or you will forfeit the grant.",
      commaRule: "Comma precedes 'or' when connecting independent clauses.",
      bnNote: "বিকল্প পছন্দ বা শর্ত নির্দেশ করে।"
    },
    yet: {
      letter: "Y",
      name: "YET",
      role: "Adversative concession (similar to 'nevertheless')",
      clause1: "He is unimaginably wealthy,",
      clause1Role: "Independent Clause 1",
      connector: "yet",
      connectorRole: "Coordinating Conjunction (Concession)",
      clause2: "he lives in austere simplicity.",
      clause2Role: "Independent Clause 2",
      full: "He is unimaginably wealthy, yet he lives in austere simplicity.",
      commaRule: "Comma precedes 'yet' in compound sentences.",
      bnNote: "সত্ত্বেও বা প্রতিকূল ফলাফল নির্দেশ করে।"
    },
    so: {
      letter: "S",
      name: "SO",
      role: "Result, consequence, or logical conclusion",
      clause1: "The deadline was imminent,",
      clause1Role: "Independent Clause 1 (Cause)",
      connector: "so",
      connectorRole: "Coordinating Conjunction (Result)",
      clause2: "we worked throughout the night.",
      clause2Role: "Independent Clause 2 (Effect)",
      full: "The deadline was imminent, so we worked throughout the night.",
      commaRule: "Comma precedes 'so' when introducing a result clause.",
      bnNote: "ফলাফল বা যৌক্তিক পরিণতি প্রকাশ করে।"
    }
  };

  const parallelCases = {
    not_only: {
      title: "Not Only ... But Also",
      wrong: "He not only lost his wallet but also his passport.",
      wrongBreakdown: {
        prefix: "He",
        prefixRole: "Subject",
        conn1: "not only",
        elem1: "lost his wallet",
        elem1Role: "Verb Phrase ⚠️",
        conn2: "but also",
        elem2: "his passport.",
        elem2Role: "Noun Phrase ⚠️"
      },
      right: "He lost not only his wallet but also his passport.",
      rightBreakdown: {
        prefix: "He lost",
        prefixRole: "Subject + Verb",
        conn1: "not only",
        elem1: "his wallet",
        elem1Role: "Noun Phrase A ✓",
        conn2: "but also",
        elem2: "his passport.",
        elem2Role: "Noun Phrase B ✓"
      },
      reason: "In the correct sentence, both 'his wallet' and 'his passport' are Noun Phrases balanced symmetrically after the connectors.",
      bn: "উভয় প্রান্তে হুবহু একই Part of Speech (Noun Phrase) বসেছে।"
    },
    either_or: {
      title: "Either ... Or",
      wrong: "You either can choose physics or chemistry.",
      wrongBreakdown: {
        prefix: "You",
        prefixRole: "Subject",
        conn1: "either",
        elem1: "can choose physics",
        elem1Role: "Verb Phrase ⚠️",
        conn2: "or",
        elem2: "chemistry.",
        elem2Role: "Noun ⚠️"
      },
      right: "You can choose either physics or chemistry.",
      rightBreakdown: {
        prefix: "You can choose",
        prefixRole: "Subject + Modal + Verb",
        conn1: "either",
        elem1: "physics",
        elem1Role: "Noun A ✓",
        conn2: "or",
        elem2: "chemistry.",
        elem2Role: "Noun B ✓"
      },
      reason: "Placing 'either' before the noun 'physics' and 'or' before 'chemistry' creates balanced nominal coordination.",
      bn: "Noun-এর ঠিক আগে 'either' এবং অপর Noun-এর আগে 'or' রাখা বাধ্যতামূলক।"
    },
    both_and: {
      title: "Both ... And (Never 'As well as')",
      wrong: "He is both a brilliant scholar as well as a gifted athlete.",
      wrongBreakdown: {
        prefix: "He is",
        prefixRole: "Subject + Verb",
        conn1: "both",
        elem1: "a brilliant scholar",
        elem1Role: "Noun Phrase",
        conn2: "as well as ❌",
        elem2: "a gifted athlete.",
        elem2Role: "Correlative Error ⚠️"
      },
      right: "He is both a brilliant scholar and a gifted athlete.",
      rightBreakdown: {
        prefix: "He is",
        prefixRole: "Subject + Verb",
        conn1: "both",
        elem1: "a brilliant scholar",
        elem1Role: "Noun Phrase A ✓",
        conn2: "and",
        elem2: "a gifted athlete.",
        elem2Role: "Noun Phrase B ✓"
      },
      reason: "'Both' strictly pairs with 'and'. Pairing 'both' with 'as well as' is a severe correlative violation.",
      bn: "'Both'-এর সাথে সর্বদা 'and' বসে; 'as well as' সম্পূর্ণ ভুল।"
    },
    scarcely_when: {
      title: "Scarcely / Hardly ... When",
      wrong: "Scarcely had he reached the platform than the train departed.",
      wrongBreakdown: {
        prefix: "",
        prefixRole: "",
        conn1: "Scarcely had",
        elem1: "he reached the platform",
        elem1Role: "Inverted Clause",
        conn2: "than ❌",
        elem2: "the train departed.",
        elem2Role: "Correlative Error ('than' is for No sooner) ⚠️"
      },
      right: "Scarcely had he reached the platform when the train departed.",
      rightBreakdown: {
        prefix: "",
        prefixRole: "",
        conn1: "Scarcely had",
        elem1: "he reached the platform",
        elem1Role: "Inverted Clause A ✓",
        conn2: "when",
        elem2: "the train departed.",
        elem2Role: "Past Indefinite Clause B ✓"
      },
      reason: "'Scarcely' and 'Hardly' strictly pair with 'when'. 'No sooner' strictly pairs with 'than'.",
      bn: "'Scarcely/Hardly'-র সাথে সর্বদা 'when' বসে; 'than' বসে শুধু 'No sooner'-এ।"
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* ========================================================================= */}
        {/* 1. HERO HEADER WITH BILINGUAL SWITCHER                                   */}
        {/* ========================================================================= */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-sky-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-sky-500/10 text-sky-300 border border-sky-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Module 007.001 • Syntactic Coordination
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Conjunctions & Correlative Parallelism
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the architectural bridges of English syntax: <span className="text-amber-400 font-semibold">FANBOYS Coordinating Conjunctions</span>, the strict <span className="text-sky-400 font-semibold">Law of Parallelism</span>, and subordinating clause anchors.
              </p>
            </div>

            <button
              onClick={() => setShowBengali(!showBengali)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold transition-all duration-300 border ${
                showBengali
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-lg shadow-emerald-500/10"
                  : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
              }`}
            >
              <Languages className="w-4 h-4 text-emerald-400" />
              <span>{showBengali ? "Bengali Explanations ON" : "বাংলা ব্যাখ্যা দেখুন"}</span>
            </button>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 2. INTERACTIVE WORKBENCH: THE FANBOYS EXPLORER                            */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <GitMerge className="w-6 h-6 text-sky-400" />
            <div>
              <h2 className="text-xl font-bold text-white">The "FANBOYS" Coordinating Conjunction Studio</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Explore the 7 coordinating conjunctions and their mandatory punctuation laws.
              </p>
            </div>
          </div>

          {/* Letter Selectors */}
          <div className="grid grid-cols-7 gap-2">
            {Object.keys(fanboysData).map((key) => (
              <button
                key={key}
                onClick={() => setActiveFanboys(key)}
                className={`py-3 rounded-xl text-center font-extrabold text-sm sm:text-base transition-all ${
                  activeFanboys === key
                    ? "bg-sky-600 text-white shadow-lg ring-2 ring-sky-400/40 scale-105"
                    : "bg-slate-950/60 text-slate-400 border border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="font-mono text-base sm:text-lg">{fanboysData[key].letter}</div>
                <div className="text-[10px] font-normal text-slate-400 uppercase hidden sm:block">
                  {fanboysData[key].name}
                </div>
              </button>
            ))}
          </div>

          {/* Active Detail Display */}
          <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-base">
                Conjunction: <span className="text-sky-400 font-mono text-lg">{fanboysData[activeFanboys].name}</span>
              </span>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                Coordinating Link
              </span>
            </div>

            <div className="space-y-4">
              <div className="text-xs sm:text-sm text-slate-300">
                <strong>Semantic Function:</strong> {fanboysData[activeFanboys].role}
              </div>

              {/* Segmented FANBOYS Visual Pill Breakdown */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Syntactic Decomposition:</span>
                  <span className="text-[10px] font-mono text-sky-300 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                    Sky Box = Coordinating Conjunction
                  </span>
                </span>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm font-mono">
                    <span className="px-3 py-1.5 rounded-lg bg-slate-950 text-slate-200 border border-slate-700/60 shadow-sm flex flex-col sm:flex-row sm:items-center gap-1.5">
                      <span className="font-bold text-white font-mono">"{fanboysData[activeFanboys].clause1}"</span>
                      <span className="text-[10px] uppercase font-sans text-slate-400 font-semibold sm:border-l sm:border-slate-700 sm:pl-1.5">
                        {fanboysData[activeFanboys].clause1Role}
                      </span>
                    </span>

                    <span className="px-3 py-1.5 rounded-lg bg-sky-950/80 text-sky-200 border-2 border-sky-500 shadow-md shadow-sky-900/30 flex flex-col sm:flex-row sm:items-center gap-1.5">
                      <span className="font-extrabold text-sky-100 font-mono text-base">[{fanboysData[activeFanboys].connector}]</span>
                      <span className="text-[10px] uppercase font-sans text-sky-300 font-bold bg-sky-900/90 px-1.5 py-0.5 rounded border border-sky-400">
                        ★ {fanboysData[activeFanboys].connectorRole}
                      </span>
                    </span>

                    <span className="px-3 py-1.5 rounded-lg bg-slate-950 text-slate-200 border border-slate-700/60 shadow-sm flex flex-col sm:flex-row sm:items-center gap-1.5">
                      <span className="font-bold text-white font-mono">"{fanboysData[activeFanboys].clause2}"</span>
                      <span className="text-[10px] uppercase font-sans text-slate-400 font-semibold sm:border-l sm:border-slate-700 sm:pl-1.5">
                        {fanboysData[activeFanboys].clause2Role}
                      </span>
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 space-y-0.5 pt-2 border-t border-slate-800/80">
                    <p className="text-slate-300 font-sans">
                      <strong className="text-slate-400">Complete Compound Sentence:</strong> "{fanboysData[activeFanboys].full}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-xs text-amber-400/90 font-medium">
                📌 <strong>Punctuation Law:</strong> {fanboysData[activeFanboys].commaRule}
              </div>
              {showBengali && (
                <div className="p-3 bg-emerald-950/30 rounded-lg text-xs text-emerald-200 border border-emerald-800/40">
                  <strong>বাংলা বিশ্লেষণ:</strong> {fanboysData[activeFanboys].bnNote}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE CORRELATIVE PARALLELISM BALANCE SCALE                      */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Scale className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">The Correlative Parallelism Balance Scale</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Observe how grammatical balance is achieved or violated in paired correlative constructions.
              </p>
            </div>
          </div>

          {/* Case Selectors */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(parallelCases).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedParallelCase(key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedParallelCase === key
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-md ring-1 ring-amber-500/30"
                    : "bg-slate-950/60 text-slate-400 border border-slate-800 hover:border-slate-700"
                }`}
              >
                {parallelCases[key].title}
              </button>
            ))}
          </div>

          <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Faulty Architecture */}
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                    Unbalanced (Parallelism Violation)
                  </span>
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-bold">
                    WRONG ❌
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                  {parallelCases[selectedParallelCase].wrongBreakdown.prefix && (
                    <span className="px-2 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800">
                      "{parallelCases[selectedParallelCase].wrongBreakdown.prefix}"
                    </span>
                  )}
                  <span className="px-2 py-1 rounded bg-rose-950/80 text-rose-300 border border-rose-600 font-bold">
                    [{parallelCases[selectedParallelCase].wrongBreakdown.conn1}]
                  </span>
                  <span className="px-2 py-1 rounded bg-slate-900 text-rose-200 border border-rose-800/80 line-through">
                    "{parallelCases[selectedParallelCase].wrongBreakdown.elem1}"
                    <span className="block text-[9px] text-rose-400 font-sans not-italic">
                      {parallelCases[selectedParallelCase].wrongBreakdown.elem1Role}
                    </span>
                  </span>
                  <span className="px-2 py-1 rounded bg-rose-950/80 text-rose-300 border border-rose-600 font-bold">
                    [{parallelCases[selectedParallelCase].wrongBreakdown.conn2}]
                  </span>
                  <span className="px-2 py-1 rounded bg-slate-900 text-rose-200 border border-rose-800/80 line-through">
                    "{parallelCases[selectedParallelCase].wrongBreakdown.elem2}"
                    <span className="block text-[9px] text-rose-400 font-sans not-italic">
                      {parallelCases[selectedParallelCase].wrongBreakdown.elem2Role}
                    </span>
                  </span>
                </div>

                <div className="text-xs font-mono text-rose-200 bg-slate-950 p-2.5 rounded border border-rose-900/40 line-through">
                  "{parallelCases[selectedParallelCase].wrong}"
                </div>
              </div>

              {/* Balanced Architecture */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Symmetrical (Flawless Parallelism)
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                    CORRECT ✓
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                  {parallelCases[selectedParallelCase].rightBreakdown.prefix && (
                    <span className="px-2 py-1 rounded bg-slate-900 text-slate-200 border border-slate-800">
                      "{parallelCases[selectedParallelCase].rightBreakdown.prefix}"
                    </span>
                  )}
                  <span className="px-2 py-1 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500 font-bold">
                    [{parallelCases[selectedParallelCase].rightBreakdown.conn1}]
                  </span>
                  <span className="px-2 py-1 rounded bg-emerald-900/40 text-emerald-200 border border-emerald-600 font-semibold">
                    "{parallelCases[selectedParallelCase].rightBreakdown.elem1}"
                    <span className="block text-[9px] text-emerald-300 font-sans">
                      {parallelCases[selectedParallelCase].rightBreakdown.elem1Role}
                    </span>
                  </span>
                  <span className="px-2 py-1 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500 font-bold">
                    [{parallelCases[selectedParallelCase].rightBreakdown.conn2}]
                  </span>
                  <span className="px-2 py-1 rounded bg-emerald-900/40 text-emerald-200 border border-emerald-600 font-semibold">
                    "{parallelCases[selectedParallelCase].rightBreakdown.elem2}"
                    <span className="block text-[9px] text-emerald-300 font-sans">
                      {parallelCases[selectedParallelCase].rightBreakdown.elem2Role}
                    </span>
                  </span>
                </div>

                <div className="text-xs font-mono text-emerald-200 bg-slate-950 p-2.5 rounded border border-emerald-900/40 font-semibold">
                  "{parallelCases[selectedParallelCase].right}"
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-300">
              <strong>Grammatical Diagnostic:</strong> {parallelCases[selectedParallelCase].reason}
            </div>

            {showBengali && (
              <div className="p-3 bg-emerald-950/30 rounded-lg text-xs text-emerald-200 border border-emerald-800/40">
                <strong>বাংলা ব্যাখ্যা:</strong> {parallelCases[selectedParallelCase].bn}
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. CLASSROOM BREAKDOWN WITH SUKANTA SIR                                    */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-br from-slate-900 to-indigo-950/30 rounded-2xl border border-indigo-900/40 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-indigo-900/50 pb-4">
            <Teacher />
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <span className="font-bold text-sky-400">Student (Barrackpore): </span>
              "Sir, why does GMAT/SAT and WBCS emphasize correlative parallelism so aggressively, and what is the rule with 'lest'?"
            </div>

            <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/40">
              <span className="font-bold text-indigo-300">Sukanta Sir: </span>
              "Parallelism is the foundation of cognitive symmetry in language. When you set up a pair like <span className="text-amber-400 font-semibold">'Not only... but also'</span>, the human brain expects identical structural weights on both balance pans:
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
                <li>If 'not only' precedes a <em>Prepositional Phrase</em>, 'but also' MUST precede a <em>Prepositional Phrase</em> ('not only for his talent, but also for his humility').</li>
                <li><strong>The Invariable Rule for 'Lest':</strong> 'Lest' means <em>'so that... not'</em>. It already carries negative polarity, so adding 'not' produces an erroneous double negative! It must strictly take <span className="text-emerald-400 font-semibold">'should'</span> or a bare subjunctive ('Walk carefully lest you should fall')."</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. SELF-ASSESSMENT MCQ DIAGNOSTIC LAB                                     */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-sky-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Module Mastery Diagnostics</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Solve 25 diagnostic conjunction and parallelism coordination problems.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono bg-sky-500/10 text-sky-300 px-3 py-1.5 rounded-full border border-sky-500/20">
              25 Questions
            </span>
          </div>

          <div className="space-y-6">
            {questions.map((q) => {
              const selected = userAnswers[q.id];
              const isAnswered = selected !== undefined;
              const isCorrect = selected === q.correctAnswer;
              const isExpanded = revealedExplanations[q.id];

              return (
                <div
                  key={q.id}
                  className="bg-slate-950/60 rounded-xl border border-slate-800/80 p-5 space-y-4 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-200">
                      <span className="text-sky-400 mr-2">Q{q.id}.</span>
                      {q.question}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, idx) => {
                      const isThisSelected = selected === opt;
                      const isThisCorrect = opt === q.correctAnswer;

                      let btnStyle = "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700";
                      if (isAnswered) {
                        if (isThisCorrect) {
                          btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-semibold";
                        } else if (isThisSelected) {
                          btnStyle = "bg-rose-950/60 border-rose-500 text-rose-300";
                        } else {
                          btnStyle = "bg-slate-900/40 border-slate-800/50 text-slate-500";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(q.id, opt)}
                          className={`p-3 rounded-lg text-left text-xs sm:text-sm border transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && isThisCorrect && (
                            <Check className="w-4 h-4 text-emerald-400 ml-2 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className="pt-2 flex flex-col gap-2">
                      <button
                        onClick={() => toggleExplanation(q.id)}
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 self-start flex items-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        {isExpanded ? "Hide Technical Explanation" : "View Technical Explanation & Bangla Note"}
                      </button>

                      {isExpanded && (
                        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs text-slate-300">
                          <div>
                            <span className="text-emerald-400 font-semibold">Explanation: </span>
                            {q.explanation}
                          </div>
                          {showBengali && q.explanationBn && (
                            <div className="text-slate-400 border-t border-slate-800/80 pt-2">
                              <span className="text-sky-400 font-semibold">বাংলা ব্যাখ্যা: </span>
                              {q.explanationBn}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. AUXILIARY TOOLS: WORD DICTIONARY, PRINTABLE NOTE & FAQS               */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <WordDictionary />
          <PlainTextPrint noteText={noteText} />
          <FAQTemplate
            faqList={[
              {
                q: "What is the difference between a conjunctive adverb and a coordinating conjunction?",
                a: "Coordinating conjunctions (FANBOYS) can grammatically link two independent clauses with just a comma. Conjunctive adverbs (however, therefore, moreover) are transition adverbs and require a semicolon before and a comma after."
              },
              {
                q: "Why is 'both... as well as' considered wrong?",
                a: "'Both' is historically and idiomatically locked to 'and' as a correlative pair ('both X and Y'). Pairing 'both' with 'as well as' creates redundant double addition and breaks parallel syntax."
              },
              {
                q: "What is a Comma Splice?",
                a: "A Comma Splice occurs when two independent clauses (full sentences) are joined solely with a comma without any coordinating conjunction (e.g. 'He was tired, he went to bed' [Wrong] -> 'He was tired, so he went to bed' [Correct])."
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
