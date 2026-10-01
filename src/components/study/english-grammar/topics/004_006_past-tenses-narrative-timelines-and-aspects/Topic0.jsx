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
  Clock,
  Calendar,
  History,
  TrendingUp,
  Compass,
  ArrowLeftRight,
  ShieldAlert,
  GitCommit,
  CheckCircle
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeAspect, setActiveAspect] = useState("past_perf");
  const [seqFormula, setSeqFormula] = useState("before");
  const [habitVerb, setHabitVerb] = useState("play");

  // 4 Past Aspects Data
  const aspectData = {
    past_simp: {
      name: "Simple Past (V2)",
      formula: "Subject + V2 (Past Form)",
      negative: "Subject + did not + V1",
      concept: "Completed actions at definite past times, sequential narrative chains.",
      example: "Alexander invaded India in 326 BC. / I met Swadeep yesterday.",
      exampleBn: "অতীতে নির্দিষ্ট সময়ে সম্পন্ন কাজ: 'I met him yesterday' (কখনই have met হবে না)।"
    },
    past_cont: {
      name: "Past Continuous",
      formula: "Subject + was/were + V-ing",
      negative: "Subject + was/were not + V-ing",
      concept: "Ongoing background actions, actions interrupted by a sudden Simple Past event.",
      example: "I was coding when the power went out. / While she was speaking, they listened.",
      exampleBn: "অতীতে কোনো নির্দিষ্ট সময়ে চলমান ক্রিয়া বা অন্য ঘটনার দ্বারা বাধাগ্রস্ত কাজ।"
    },
    past_perf: {
      name: "Past Perfect (Past of the Past)",
      formula: "Subject + had + V3 (Past Participle)",
      negative: "Subject + had not + V3",
      concept: "The earlier of two past actions. Clarifies chronological order.",
      example: "The train had left before we reached the station.",
      exampleBn: "অতীতের দুটি কাজের মধ্যে যেটি অপেক্ষাকৃত পূর্বে ঘটেছিল: 'had left'."
    },
    past_pcont: {
      name: "Past Perfect Continuous",
      formula: "Subject + had + been + V-ing",
      negative: "Subject + had not + been + V-ing",
      concept: "Ongoing past action over a duration leading up to another past moment.",
      example: "He had been running for an hour before he took a rest.",
      exampleBn: "অতীতের একটি সময়ের আগে পর্যন্ত কোনো ক্রিয়া একটানা কতক্ষণ চলছিল তা বোঝাতে।"
    }
  };

  // Past of the Past Sequencing Scenarios
  const seqScenarios = {
    before: {
      title: "Sequence with 'BEFORE'",
      pattern: "[Earlier Action: Past Perfect] + BEFORE + [Later Action: Simple Past]",
      example: "The patient HAD DIED before the doctor ARRIVED.",
      bn: "পূর্বে (Before)-এর আগের ক্লজটি Past Perfect (had + V3) এবং পরের ক্লজটি Simple Past (V2) হয়।"
    },
    after: {
      title: "Sequence with 'AFTER'",
      pattern: "[Later Action: Simple Past] + AFTER + [Earlier Action: Past Perfect]",
      example: "The doctor ARRIVED after the patient HAD DIED.",
      bn: "পরে (After)-এর আগের ক্লজটি Simple Past (V2) এবং পরের ক্লজটি Past Perfect (had + V3) হয়।"
    },
    by_the_time: {
      title: "Sequence with 'BY THE TIME'",
      pattern: "BY THE TIME + [Later: Simple Past (V2)], [Earlier: Past Perfect (had + V3)]",
      example: "By the time the fire engines arrived, the neighbors HAD EXTINGUISHED the fire.",
      bn: "'By the time' ক্লজে Simple Past এবং মূল ক্লজে Past Perfect বসে।"
    },
    hardly: {
      title: "Inversion with 'HARDLY / SCARCELY ... WHEN'",
      pattern: "Hardly / Scarcely + HAD + Subject + V3 + ... + WHEN + Subject + V2",
      example: "Hardly HAD Swadeep ENTERED the examination hall WHEN the bell RANG.",
      bn: "Hardly/Scarcely-এর পর Had + Subject + V3 এবং সংযোগকারী শব্দ 'when' হয়।"
    },
    no_sooner: {
      title: "Inversion with 'NO SOONER ... THAN'",
      pattern: "No sooner + HAD + Subject + V3 + ... + THAN + Subject + V2",
      example: "No sooner HAD the teacher ARRIVED THAN the students STOOD up.",
      bn: "No sooner-এর সাথে সর্বদা 'than' (then/when নয়) বসে এবং Inversion ঘটে।"
    }
  };

  // 25 Interactive Questions State
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (qId, optionIdx) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-sky-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-sky-500/10 text-sky-300 border border-sky-500/30">
                <History className="w-3.5 h-3.5" />
                Segment 5 • Module 004.006 • Past Tenses
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                The Past Tense System & Narrative Timelines
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the <span className="text-sky-400 font-semibold">4 Past Aspects</span>, the Pluperfect <span className="text-amber-300 font-semibold">"Past of the Past"</span> sequencing (Before, After, By the time), the <span className="text-emerald-400 font-semibold">Hardly/No Sooner</span> inversions, and the distinction between <span className="text-rose-400 font-semibold">Used to</span> and <span className="text-purple-400 font-semibold">Would</span>.
              </p>
            </div>

            <button
              onClick={() => setShowBengali(!showBengali)}
              className="self-start md:self-center flex items-center gap-2.5 px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-amber-300 border border-amber-500/40 shadow-lg hover:shadow-amber-500/10 transition-all duration-200 text-sm font-medium"
            >
              <Languages className="w-4 h-4 text-amber-400" />
              <span>{showBengali ? "Switch to English View" : "বাংলা ব্যাখ্যা দেখুন (Bengali Help)"}</span>
            </button>
          </div>

          {showBengali && (
            <div className="mt-6 p-4 rounded-xl bg-amber-950/40 border border-amber-600/40 text-amber-200 text-sm leading-relaxed animate-fade-in">
              <p className="font-semibold text-amber-300 mb-1">💡 বাংলা নির্দেশিকা (Past Tense Guide):</p>
              অতীতে সম্পন্ন যেকোনো কাজের জন্য Simple Past (V2) বসে। কিন্তু অতীতে দুটি ভিন্ন কাজ সম্পন্ন হলে যেটি অপেক্ষাকৃত পূর্বে ঘটেছিল তার জন্য Past Perfect (had + V3) এবং পরেরটির জন্য Simple Past (V2) বসে। 'Did'-এর পরে সর্বদা V1 বসে এবং 'No sooner'-এর পর সর্বদা 'than' ব্যবহার করতে হয়।
            </div>
          )}
        </header>

        {/* ========================================================================= */}
        {/* SYNTACTIC CROSS-REFERENCE MATRIX                                          */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Grammar Nexus: Past Narrative Cross-References</h3>
              <p className="text-xs text-slate-300">Direct links to syntactic mechanics applied in this module</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/english-grammar/topic/003_004_adverb-inversion-and-negative-fronting/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-300 border border-sky-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Hardly / No Sooner Inversion</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/005_002_modal-auxiliaries-and-semi-modals/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Used To vs Would Modals</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/007_002_clause-analysis-noun-adjective-and-adverb-clauses/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Adverbial Time Clauses</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. INTERACTIVE ASPECT SELECTOR                                           */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="w-6 h-6 text-sky-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              1. The 4 Past Aspects & Structural Mechanics
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.keys(aspectData).map((key) => {
              const item = aspectData[key];
              const isActive = activeAspect === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveAspect(key)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
                    isActive
                      ? "bg-sky-500/20 border-sky-400/80 shadow-lg shadow-sky-500/10 text-white"
                      : "bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <p className="text-xs uppercase tracking-wider font-semibold text-sky-400">
                    Aspect {key.replace("past_", "").toUpperCase()}
                  </p>
                  <p className="font-bold text-sm sm:text-base mt-1">{item.name}</p>
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-300">
                  {aspectData[activeAspect].name}
                </span>
                <h3 className="text-xl font-bold text-white mt-2">
                  Formula: {aspectData[activeAspect].formula}
                </h3>
              </div>
              <div className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 font-mono">
                Neg: {aspectData[activeAspect].negative}
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {aspectData[activeAspect].concept}
            </p>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Canonical Example:
              </p>
              <p className="text-emerald-300 font-mono text-sm sm:text-base">
                {aspectData[activeAspect].example}
              </p>
              {showBengali && (
                <p className="text-amber-300/90 text-xs sm:text-sm pt-1 border-t border-slate-800">
                  🇧🇩 {aspectData[activeAspect].exampleBn}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. PAST OF THE PAST (PLUPERFECT) SEQUENCING WORKBENCH                     */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <GitCommit className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                2. "Past of the Past" Chronological Sequencing Workbench
              </h2>
            </div>
            {seqFormula === "hardly" || seqFormula === "no_sooner" ? (
              <a
                href="/english-grammar/topic/003_004_adverb-inversion-and-negative-fronting/0"
                className="text-xs px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition flex items-center gap-1.5"
              >
                <span>Explore Adverb Inversion Chapter</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            ) : (
              <a
                href="/english-grammar/topic/007_002_clause-analysis-noun-adjective-and-adverb-clauses/0"
                className="text-xs px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 transition flex items-center gap-1.5"
              >
                <span>Explore Clause Chapter</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            )}
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            When two actions happened in the past, chronological logic demands that the earlier action is marked with <span className="text-amber-300 font-semibold font-mono">had + V3</span> (Past Perfect), and the later action takes <span className="text-sky-300 font-semibold font-mono">V2</span> (Simple Past). Choose a formula pattern below to observe syntactic behavior across{" "}
            <a
              href="/english-grammar/topic/007_002_clause-analysis-noun-adjective-and-adverb-clauses/0"
              className="text-sky-400 hover:text-sky-300 underline underline-offset-4 font-semibold"
            >
              subordinate time clauses
            </a>{" "}
            and{" "}
            <a
              href="/english-grammar/topic/003_004_adverb-inversion-and-negative-fronting/0"
              className="text-amber-400 hover:text-amber-300 underline underline-offset-4 font-semibold"
            >
              negative inversion
            </a>:
          </p>

          <div className="flex flex-wrap gap-2.5">
            {Object.keys(seqScenarios).map((key) => {
              const isActive = seqFormula === key;
              return (
                <button
                  key={key}
                  onClick={() => setSeqFormula(key)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                    isActive
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-lg shadow-amber-500/10"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {seqScenarios[key].title}
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 animate-fade-in">
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs sm:text-sm text-amber-400 border border-slate-800">
              Pattern: {seqScenarios[seqFormula].pattern}
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <p className="text-xs uppercase text-slate-400 font-semibold">Worked Sentence:</p>
              <p className="text-lg font-bold text-white mt-1">
                {seqScenarios[seqFormula].example}
              </p>
              {showBengali && (
                <p className="text-sm text-amber-300/90 mt-2">
                  🇧🇩 {seqScenarios[seqFormula].bn}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. PAST HABITS: USED TO VS WOULD                                         */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <RotateCcw className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                3. Expressing Past Habits: "Used to" vs "Would" Matrix
              </h2>
            </div>
            <a
              href="/english-grammar/topic/005_002_modal-auxiliaries-and-semi-modals/0"
              className="text-xs px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 transition flex items-center gap-1.5"
            >
              <span>Study Semi-Modals Chapter</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold">
                <CheckCircle className="w-5 h-5" />
                <span>USED TO + V1 (Universal Past Habit)</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Works for <span className="text-white font-semibold">BOTH past actions AND past states (stative verbs)</span> that no longer exist in the present.
              </p>
              <div className="p-3 rounded-xl bg-slate-950 text-xs font-mono text-purple-300 border border-slate-800 space-y-1">
                <p>✓ "I <span className="text-purple-400 font-bold">used to live</span> in Barrackpore." (Past State)</p>
                <p>✓ "He <span className="text-purple-400 font-bold">used to play</span> badminton daily." (Past Action)</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <AlertTriangle className="w-5 h-5" />
                <span>WOULD + V1 (Dynamic Actions ONLY)</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Works <span className="text-white font-semibold">ONLY for repeated dynamic actions</span>. Strictly forbidden with{" "}
                <a
                  href="/english-grammar/topic/004_001_verb-classification-and-characteristics/0"
                  className="text-amber-400 hover:text-amber-300 underline font-semibold"
                >
                  stative verbs
                </a>{" "}
                (live, have, know, be).
              </p>
              <div className="p-3 rounded-xl bg-slate-950 text-xs font-mono text-rose-300 border border-slate-800 space-y-1">
                <p>✓ "In childhood, we <span className="text-emerald-400 font-bold">would go</span> fishing every Sunday."</p>
                <p>✗ "He <span className="text-rose-400 line-through">would live</span> in London." (INCORRECT!)</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. CLASSROOM DIALOGUE WITH SUKANTA SIR                                   */}
        {/* ========================================================================= */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-indigo-900/40 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-sky-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Classroom Dialogue: Resolving the "Did + V2" and "No Sooner" Traps
            </h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="font-bold text-amber-400">Swadeep (Student):</span> "Sir, in our school exams, why does writing 'Did you saw him?' get marked as completely wrong?"
            </div>
            <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-slate-200">
              <span className="font-bold text-sky-400">Sukanta Sir:</span> "Because the auxiliary verb <span className="text-amber-300 font-bold">Did</span> already carries the past tense feature for the whole clause! Adding another V2 creates double past-marking, which is grammatically illegal. Always write: <span className="text-emerald-400 font-bold">Did you SEE him?</span> (Did + Subject + V1)."
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="font-bold text-amber-400">Debangshu (Student):</span> "And what about 'No sooner had I reached *when* it rained'?"
            </div>
            <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-slate-200">
              <span className="font-bold text-sky-400">Sukanta Sir:</span> "Remember this rule for life: <span className="text-amber-300 font-bold">'No sooner'</span> contains a comparative adverb (-er) and therefore strictly takes <span className="text-emerald-400 font-bold">'THAN'</span>. Only <span className="text-purple-300 font-bold">'Hardly'</span> and <span className="text-purple-300 font-bold">'Scarcely'</span> take <span className="text-purple-400 font-bold">'WHEN'</span>."
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. INTERACTIVE 25-QUESTION DIAGNOSTIC QUIZ                               */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-sky-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                4. Self-Assessment Quiz (25 Diagnostic MCQs)
              </h2>
            </div>
            <div className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 font-mono">
              Target: 75% Mastery (19/25)
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((q, qIndex) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isCorrect = userAnswers[q.id] === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    submitted
                      ? isCorrect
                        ? "bg-emerald-950/20 border-emerald-500/40"
                        : "bg-rose-950/20 border-rose-500/40"
                      : "bg-slate-900/80 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-semibold text-white text-sm sm:text-base">
                      <span className="text-sky-400 mr-2">Q{qIndex + 1}.</span>
                      {q.question}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAnswers[q.id] === optIdx;
                      let btnStyle = "bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700";

                      if (submitted) {
                        if (optIdx === q.correctAnswer) {
                          btnStyle = "bg-emerald-900/40 border-emerald-500 text-emerald-200 font-semibold";
                        } else if (isSelected) {
                          btnStyle = "bg-rose-900/40 border-rose-500 text-rose-200";
                        } else {
                          btnStyle = "bg-slate-950/40 border-slate-900 text-slate-500";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-sky-500/20 border-sky-400 text-white font-medium shadow-sm";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={submitted}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all ${btnStyle}`}
                        >
                          <span className="font-mono text-xs opacity-60 mr-2">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <span className="font-bold text-sky-400">Explanation: </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {!submitted ? (
              <button
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(userAnswers).length === 0}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-lg shadow-sky-500/20 transition-all"
              >
                Submit & Check Answers ({Object.keys(userAnswers).length}/{questions.length})
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-between">
                <div className="text-sm font-semibold text-white">
                  Score:{" "}
                  <span
                    className={`text-lg font-bold ${
                      calculateScore() >= 19 ? "text-emerald-400" : "text-amber-400"
                    }`}
                  >
                    {calculateScore()} / {questions.length} (
                    {Math.round((calculateScore() / questions.length) * 100)}%)
                  </span>
                </div>
                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retake Assessment
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. TEACHER & REPOSITORY METADATA                                          */}
        {/* ========================================================================= */}
        <Teacher />

        {/* ========================================================================= */}
        {/* 8. COMPLETE TOPIC STUDY NOTE DOWNLOAD                                     */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            fileName="module-004-006-past-tenses.txt"
            content={noteText}
            title="Module 004.006 Study Notes"
          />
        </section>

        {/* ========================================================================= */}
        {/* 9. WORD DICTIONARY COMPONENT                                              */}
        {/* ========================================================================= */}
        <section>
          <WordDictionary />
        </section>

        {/* ========================================================================= */}
        {/* 10. FAQ SECTION                                                           */}
        {/* ========================================================================= */}
        <section>
          <FAQTemplate
            faqs={[
              {
                question: "Why can't I use the Present Perfect with 'yesterday' or 'in 1995'?",
                answer:
                  "Present Perfect connects past events to the present moment. A specific finished past anchor like 'yesterday' or 'in 1995' breaks the connection with the present, making Simple Past strictly mandatory."
              },
              {
                question: "When should I use Past Perfect instead of Simple Past?",
                answer:
                  "Past Perfect is only necessary when you need to make clear that one past event preceded another past event. If actions are simply narrated in natural chronological order with 'and' or 'then', Simple Past is sufficient."
              },
              {
                question: "What is the key difference between 'used to' and 'would' for past habits?",
                answer:
                  "'Used to' works for both past states (e.g. 'I used to live in Paris') and past actions. 'Would' can ONLY be used for repeated dynamic actions (e.g. 'we would go swimming') and NEVER for stative verbs."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Previous: Module 004_005 (Present Tenses)</span>
          </a>

          <a
            href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/1"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 1 (Past Continuous Tense)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
