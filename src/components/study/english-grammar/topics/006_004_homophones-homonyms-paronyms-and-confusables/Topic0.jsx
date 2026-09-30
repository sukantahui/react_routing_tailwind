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
  Search,
  Sliders,
  Volume2,
  Split,
  Eye,
  ShieldAlert,
  Boxes
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeConfusablePair, setActiveConfusablePair] = useState("affect_effect");
  const [activeHeteronym, setActiveHeteronym] = useState("object");
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

  const confusableData = {
    affect_effect: {
      title: "Affect vs Effect",
      tag: "Verb vs Noun Primary Boundary",
      word1: {
        word: "AFFECT",
        pos: "Verb",
        meaning: "To influence, alter, or produce an impact on",
        example: "The heavy rainfall will severely affect the paddy crop.",
        mnemonic: "Affect is an Action (A for Action = Verb)"
      },
      word2: {
        word: "EFFECT",
        pos: "Noun",
        meaning: "The result, outcome, or consequence produced",
        example: "The new medicine had an immediate therapeutic effect.",
        mnemonic: "Effect is the End result (E for End result = Noun)"
      },
      bnNote: "'Affect' হলো কাজ বা প্রভাব ফেলা (Verb); আর 'Effect' হলো তার ফলাফল বা প্রভাব (Noun)।"
    },
    principal_principle: {
      title: "Principal vs Principle",
      tag: "Chief Authority vs Moral Rule",
      word1: {
        word: "PRINCIPAL",
        pos: "Noun / Adjective",
        meaning: "Head of an institution, main, primary, capital sum",
        example: "The school principal delivered an inspiring speech.",
        mnemonic: "The PrinciPAL is your PAL (Person / Leader)"
      },
      word2: {
        word: "PRINCIPLE",
        pos: "Noun",
        meaning: "A fundamental moral law, rule of conduct, or doctrine",
        example: "He is a man of unyielding moral principles.",
        mnemonic: "A PrincipLE is a ruLE (both end in -le)"
      },
      bnNote: "'Principal' মানে বিদ্যালয়ের প্রধান বা মূল কারণ; আর 'Principle' মানে জীবনের নীতি বা আদর্শ।"
    },
    compliment_complement: {
      title: "Compliment vs Complement",
      tag: "Praise vs Completion",
      word1: {
        word: "COMPLIMENT",
        pos: "Noun / Verb",
        meaning: "An expression of praise, admiration, or polite flattery",
        example: "She received a sincere compliment on her research paper.",
        mnemonic: "'I' like to receive complIments (with an 'i')"
      },
      word2: {
        word: "COMPLEMENT",
        pos: "Noun / Verb",
        meaning: "To complete, balance, or enhance something when combined",
        example: "The red wine complements the roast steak beautifully.",
        mnemonic: "ComplEment with an 'e' helps ComplEte something"
      },
      bnNote: "'Compliment' (i যুক্ত) মানে প্রশংসা; আর 'Complement' (e যুক্ত) মানে কোনো কিছুকে পূর্ণাঙ্গ বা শোভিত করা।"
    },
    stationary_stationery: {
      title: "Stationary vs Stationery",
      tag: "Fixed Position vs Writing Supplies",
      word1: {
        word: "STATIONARY",
        pos: "Adjective",
        meaning: "Not moving, fixed in one place, immobile",
        example: "The bicycle crashed into a stationary automobile.",
        mnemonic: "StationARy = At Rest (AR)"
      },
      word2: {
        word: "STATIONERY",
        pos: "Noun",
        meaning: "Writing materials, paper, envelopes, pens",
        example: "Purchase three notebooks from the stationery store.",
        mnemonic: "StationERy has 'e' for Envelopes and Erasers"
      },
      bnNote: "'Stationary' (ar যুক্ত) মানে স্থির বা নিশ্চল; আর 'Stationery' (er যুক্ত) মানে খাতা-কলম বা লেখার সামগ্রী।"
    },
    site_sight_cite: {
      title: "Site vs Sight vs Cite",
      tag: "Place vs Vision vs Quoting",
      word1: {
        word: "SITE",
        pos: "Noun",
        meaning: "A physical location, construction area, or website",
        example: "The archaeological site revealed ancient Harappan relics.",
        mnemonic: "Site = Situational location"
      },
      word2: {
        word: "SIGHT / CITE",
        pos: "Noun / Verb",
        meaning: "Sight = vision/view; Cite = quote or mention an authority",
        example: "The sunset was a breathtaking sight. The lawyer will cite the law.",
        mnemonic: "You SEE a Sight; you Quote a Citation"
      },
      bnNote: "'Site' মানে স্থান, 'Sight' মানে দৃশ্য বা দৃষ্টিশক্তি, এবং 'Cite' মানে উদ্ধৃত করা।"
    }
  };

  const heteronyms = {
    object: {
      word: "OBJECT",
      noun: { stress: "OB-ject", meaning: "A physical thing or syntactic complement", eg: "Identify the direct object of the verb." },
      verb: { stress: "ob-JECT", meaning: "To express disapproval or opposition", eg: "I strongly object to this unfair clause." }
    },
    record: {
      word: "RECORD",
      noun: { stress: "RE-cord", meaning: "An authentic archive or documented data", eg: "Keep an accurate record of daily expenses." },
      verb: { stress: "re-CORD", meaning: "To store sounds, video, or data on media", eg: "Please record the live session." }
    },
    present: {
      word: "PRESENT",
      noun: { stress: "PRE-sent", meaning: "A gift or the current time period", eg: "He received a magnificent birthday present." },
      verb: { stress: "pre-SENT", meaning: "To introduce, display, or demonstrate formally", eg: "The team will present their findings tomorrow." }
    },
    project: {
      word: "PROJECT",
      noun: { stress: "PRO-ject", meaning: "A planned enterprise or collaborative work", eg: "We completed the grammar module project." },
      verb: { stress: "pro-JECT", meaning: "To throw forward, forecast, or beam an image", eg: "The analyst projected strong economic growth." }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* ========================================================================= */}
        {/* 1. HERO HEADER WITH BILINGUAL SWITCHER                                   */}
        {/* ========================================================================= */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-amber-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Module 006.004 • Lexical Precision Lab
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Homophones, Paronyms & Confusables
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master subtle semantic boundaries across <span className="text-amber-400 font-semibold">Homophones</span>, the syllable-stress laws of <span className="text-sky-400 font-semibold">Heteronyms</span>, and the precision nuance of <span className="text-emerald-400 font-semibold">Paronyms</span>.
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
        {/* 2. INTERACTIVE CONFUSABLE PAIRS DUAL-LENS STUDIO                          */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Split className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Confusable Pairs Dual-Lens Studio</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Select a confusable pair to examine syntactic distinctions, definitions, and memory mnemonics.
              </p>
            </div>
          </div>

          {/* Pair Selectors */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(confusableData).map((key) => (
              <button
                key={key}
                onClick={() => setActiveConfusablePair(key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeConfusablePair === key
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-md ring-1 ring-amber-500/30"
                    : "bg-slate-950/60 text-slate-400 border border-slate-800 hover:border-slate-700"
                }`}
              >
                {confusableData[key].title}
              </button>
            ))}
          </div>

          {/* Active Dual Lens Display */}
          <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-base">
                {confusableData[activeConfusablePair].title}
              </span>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                {confusableData[activeConfusablePair].tag}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Word 1 */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black font-mono text-sky-400">
                    {confusableData[activeConfusablePair].word1.word}
                  </span>
                  <span className="text-xs uppercase font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                    {confusableData[activeConfusablePair].word1.pos}
                  </span>
                </div>
                <div className="text-xs text-slate-300">
                  {confusableData[activeConfusablePair].word1.meaning}
                </div>
                <div className="text-xs font-mono text-sky-200 bg-slate-950 p-2.5 rounded border border-slate-800">
                  "{confusableData[activeConfusablePair].word1.example}"
                </div>
                <div className="text-[11px] font-semibold text-amber-400/90 pt-1">
                  💡 Mnemonic: {confusableData[activeConfusablePair].word1.mnemonic}
                </div>
              </div>

              {/* Word 2 */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black font-mono text-emerald-400">
                    {confusableData[activeConfusablePair].word2.word}
                  </span>
                  <span className="text-xs uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {confusableData[activeConfusablePair].word2.pos}
                  </span>
                </div>
                <div className="text-xs text-slate-300">
                  {confusableData[activeConfusablePair].word2.meaning}
                </div>
                <div className="text-xs font-mono text-emerald-200 bg-slate-950 p-2.5 rounded border border-slate-800">
                  "{confusableData[activeConfusablePair].word2.example}"
                </div>
                <div className="text-[11px] font-semibold text-amber-400/90 pt-1">
                  💡 Mnemonic: {confusableData[activeConfusablePair].word2.mnemonic}
                </div>
              </div>
            </div>

            {showBengali && (
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-200 text-xs sm:text-sm">
                <strong>বাংলা ব্যাখ্যা:</strong> {confusableData[activeConfusablePair].bnNote}
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE HETERONYM SYLLABLE-STRESS STUDIO                           */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Volume2 className="w-6 h-6 text-sky-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Heteronym Syllable-Stress Law</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                In 2-syllable homographs: Nouns receive stress on the 1st syllable, Verbs on the 2nd syllable.
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {Object.keys(heteronyms).map((key) => (
              <button
                key={key}
                onClick={() => setActiveHeteronym(key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                  activeHeteronym === key
                    ? "bg-sky-600 text-white shadow-md ring-2 ring-sky-400/40"
                    : "bg-slate-950/60 text-slate-400 border border-slate-800 hover:border-slate-700"
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-4">
            <div className="text-sm font-bold text-slate-200">
              Pronunciation Shift for: <span className="text-sky-400 font-mono text-base">{heteronyms[activeHeteronym].word}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Noun Stress */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-amber-400">NOUN Form (1st Syllable Stress)</span>
                  <span className="font-mono text-sm font-extrabold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    /{heteronyms[activeHeteronym].noun.stress}/
                  </span>
                </div>
                <div className="text-xs text-slate-300">{heteronyms[activeHeteronym].noun.meaning}</div>
                <div className="text-xs font-mono text-slate-300 bg-slate-950 p-2 rounded border border-slate-800">
                  "{heteronyms[activeHeteronym].noun.eg}"
                </div>
              </div>

              {/* Verb Stress */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-emerald-400">VERB Form (2nd Syllable Stress)</span>
                  <span className="font-mono text-sm font-extrabold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    /{heteronyms[activeHeteronym].verb.stress}/
                  </span>
                </div>
                <div className="text-xs text-slate-300">{heteronyms[activeHeteronym].verb.meaning}</div>
                <div className="text-xs font-mono text-slate-300 bg-slate-950 p-2 rounded border border-slate-800">
                  "{heteronyms[activeHeteronym].verb.eg}"
                </div>
              </div>
            </div>
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
              <span className="font-bold text-amber-400">Student (Barrackpore): </span>
              "Sir, in exams why do questions constantly test pairs like 'Historic vs Historical' or 'Sensible vs Sensitive'? How do we never make a mistake?"
            </div>

            <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/40">
              <span className="font-bold text-indigo-300">Sukanta Sir: </span>
              "These words are called <span className="text-emerald-400 font-semibold">Paronyms</span>—words born from the same etymological root that developed specialized semantic jobs:
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
                <li><strong>Historic vs Historical:</strong> <span className="text-amber-400 font-semibold">'Historic'</span> means memorable, momentous, and famous in human history (a historic victory). <span className="text-sky-400 font-semibold">'Historical'</span> means simply pertaining to history or past events (a historical novel).</li>
                <li><strong>Continual vs Continuous:</strong> <span className="text-sky-400 font-semibold">'Continuous'</span> means unbroken without a single pause (continuous 24-hour rainfall). <span className="text-amber-400 font-semibold">'Continual'</span> means occurring repeatedly at short intervals (continual interruptions in class).</li>
                <li><strong>Disinterested vs Uninterested:</strong> <span className="text-emerald-400 font-semibold">'Disinterested'</span> means impartial, unbiased, and having no personal stake (a disinterested judge). <span className="text-rose-400 font-semibold">'Uninterested'</span> means bored or not caring.</li>
              </ul>
              Remember: Grammar mastery is lexical precision!"
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. SELF-ASSESSMENT MCQ DIAGNOSTIC LAB                                     */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-amber-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Module Mastery Diagnostics</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Test your lexical precision across 25 confusable word pairs, paronyms, and heteronyms.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono bg-amber-500/10 text-amber-300 px-3 py-1.5 rounded-full border border-amber-500/20">
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
                      <span className="text-amber-400 mr-2">Q{q.id}.</span>
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
                q: "Can 'effect' ever be used as a verb?",
                a: "Yes, in formal and administrative English, 'effect' as a verb means 'to bring about or accomplish' ('The diplomat effected a peaceful resolution'). However, 95% of standard usage requires 'affect' for the action of influencing."
              },
              {
                q: "What is the mnemonic to remember 'stationery' vs 'stationary'?",
                a: "Remember that 'stationERy' (with an E) is used for Envelopes and Erasers; 'stationARy' (with an A) means At Rest (not moving)."
              },
              {
                q: "What makes 'childlike' different from 'childish'?",
                a: "'Childlike' conveys positive, pure, and innocent qualities ('childlike wonder'). 'Childish' carries a negative, derogatory connotation of immaturity or petulance ('childish behavior')."
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
