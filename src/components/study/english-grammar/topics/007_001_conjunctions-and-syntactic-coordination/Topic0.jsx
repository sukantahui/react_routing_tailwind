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
      example: "He was determined to succeed, for he had promised his parents.",
      commaRule: "Comma precedes 'for' when linking two independent clauses.",
      bnNote: "কারণ বা ব্যাখ্যা প্রকাশ করে (যেহেতু/কারণ)।"
    },
    and: {
      letter: "A",
      name: "AND",
      role: "Addition of similar or sequential ideas",
      example: "She designed the blueprint, and the team built the prototype.",
      commaRule: "Comma precedes 'and' when joining two full independent clauses.",
      bnNote: "দুটি সমধর্মী বাক্য বা ভাবকে যুক্ত করতে ব্যবহৃত হয়।"
    },
    nor: {
      letter: "N",
      name: "NOR",
      role: "Negative addition (triggers subject-auxiliary inversion)",
      example: "He does not accept defeat, nor does he surrender to despair.",
      commaRule: "Comma precedes 'nor' + inverted auxiliary verb.",
      bnNote: "নেতিবাচক ধারণার সাথে অপর একটি নেতিবাচক বাক্য যোগ করে (Inversion ঘটে)।"
    },
    but: {
      letter: "B",
      name: "BUT",
      role: "Direct contrast or unexpected qualification",
      example: "The problem was formidable, but the mathematicians solved it.",
      commaRule: "Comma precedes 'but' when linking independent clauses.",
      bnNote: "সরাসরি বৈপরীত্য বা প্রতিকূল ভাব প্রকাশ করে।"
    },
    or: {
      letter: "O",
      name: "OR",
      role: "Alternative, choice, or condition",
      example: "You must submit the thesis today, or you will forfeit the grant.",
      commaRule: "Comma precedes 'or' when connecting independent clauses.",
      bnNote: "বিকল্প পছন্দ বা শর্ত নির্দেশ করে।"
    },
    yet: {
      letter: "Y",
      name: "YET",
      role: "Adversative concession (similar to 'nevertheless')",
      example: "He is unimaginably wealthy, yet he lives in austere simplicity.",
      commaRule: "Comma precedes 'yet' in compound sentences.",
      bnNote: "সত্ত্বেও বা প্রতিকূল ফলাফল নির্দেশ করে।"
    },
    so: {
      letter: "S",
      name: "SO",
      role: "Result, consequence, or logical conclusion",
      example: "The deadline was imminent, so we worked throughout the night.",
      commaRule: "Comma precedes 'so' when introducing a result clause.",
      bnNote: "ফলাফল বা পরিণতি প্রকাশ করে।"
    }
  };

  const parallelCases = {
    not_only: {
      title: "Not Only ... But Also",
      wrong: "He not only lost his wallet but also his passport.",
      right: "He lost not only his wallet but also his passport.",
      reason: "In the correct sentence, both 'his wallet' and 'his passport' are Noun Phrases balanced symmetrically after the connectors.",
      bn: "উভয় প্রান্তে হুবহু একই Part of Speech (Noun Phrase) বসেছে।"
    },
    either_or: {
      title: "Either ... Or",
      wrong: "You either can choose physics or chemistry.",
      right: "You can choose either physics or chemistry.",
      reason: "Placing 'either' before the noun 'physics' and 'or' before 'chemistry' creates balanced nominal coordination.",
      bn: "Noun-এর ঠিক আগে 'either' এবং অপর Noun-এর আগে 'or' রাখা বাধ্যতামূলক।"
    },
    both_and: {
      title: "Both ... And (Never 'As well as')",
      wrong: "He is both a brilliant scholar as well as a gifted athlete.",
      right: "He is both a brilliant scholar and a gifted athlete.",
      reason: "'Both' strictly pairs with 'and'. Pairing 'both' with 'as well as' is a severe correlative violation.",
      bn: "'Both'-এর সাথে সর্বদা 'and' বসে; 'as well as' সম্পূর্ণ ভুল।"
    },
    scarcely_when: {
      title: "Scarcely / Hardly ... When",
      wrong: "Scarcely had he reached the platform than the train departed.",
      right: "Scarcely had he reached the platform when the train departed.",
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

            <div className="space-y-3">
              <div className="text-xs sm:text-sm text-slate-300">
                <strong>Semantic Function:</strong> {fanboysData[activeFanboys].role}
              </div>
              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs sm:text-sm font-mono text-sky-200">
                "{fanboysData[activeFanboys].example}"
              </div>
              <div className="text-xs text-amber-400/90 font-medium">
                📌 <strong>Punctuation Law:</strong> {fanboysData[activeFanboys].commaRule}
              </div>
              {showBengali && (
                <div className="p-3 bg-emerald-950/30 rounded-lg text-xs text-emerald-200 border border-emerald-800/40">
                  <strong>বাংলা অর্থ:</strong> {fanboysData[activeFanboys].bnNote}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Faulty Architecture */}
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                    Unbalanced (Parallelism Violation)
                  </span>
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-bold">
                    WRONG
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-mono text-rose-200 bg-slate-950 p-2.5 rounded border border-rose-900/40 line-through">
                  "{parallelCases[selectedParallelCase].wrong}"
                </div>
              </div>

              {/* Balanced Architecture */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Symmetrical (Flawless Parallelism)
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                    CORRECT
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-mono text-emerald-200 bg-slate-950 p-2.5 rounded border border-emerald-900/40">
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
