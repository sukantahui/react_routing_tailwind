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
  Grid,
  TrendingUp,
  Compass,
  ArrowLeftRight,
  ShieldAlert,
  GitMerge,
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
  const [selectedTense, setSelectedTense] = useState("pres_simp");
  const [selectedSeqRule, setSelectedSeqRule] = useState("past_dominance");
  const [condType, setCondType] = useState("cond_3");

  // Grand 12-Tense Matrix Data
  const tenseMatrix = {
    pres_simp: {
      name: "1. Present Simple",
      formula: "S + V1 / V5 (-s/-es)",
      time: "Present",
      aspect: "Simple",
      example: "She writes research papers daily.",
      explanationBn: "বর্তমান অভ্যাস বা সাধারণ সত্য: 'writes'."
    },
    pres_cont: {
      name: "2. Present Continuous",
      formula: "S + am/is/are + V-ing",
      time: "Present",
      aspect: "Continuous",
      example: "She is writing a research paper right now.",
      explanationBn: "বর্তমান মুহূর্তে চলমান ক্রিয়া: 'is writing'."
    },
    pres_perf: {
      name: "3. Present Perfect",
      formula: "S + have/has + V3",
      time: "Present",
      aspect: "Perfect",
      example: "She has written five research papers.",
      explanationBn: "অতীতের কাজ যার ফল বর্তমান: 'has written'."
    },
    pres_pcont: {
      name: "4. Present Perfect Continuous",
      formula: "S + have/has + been + V-ing",
      time: "Present",
      aspect: "Perf. Cont.",
      example: "She has been writing since 8 AM.",
      explanationBn: "অতীত থেকে বর্তমান পর্যন্ত চলমান: 'has been writing'."
    },
    past_simp: {
      name: "5. Past Simple",
      formula: "S + V2 (Past Form)",
      time: "Past",
      aspect: "Simple",
      example: "She wrote a groundbreaking paper yesterday.",
      explanationBn: "অতীতে সম্পন্ন কাজ: 'wrote yesterday'."
    },
    past_cont: {
      name: "6. Past Continuous",
      formula: "S + was/were + V-ing",
      time: "Past",
      aspect: "Continuous",
      example: "She was writing when the storm began.",
      explanationBn: "অতীতে চলমান কাজ: 'was writing'."
    },
    past_perf: {
      name: "7. Past Perfect (Past of the Past)",
      formula: "S + had + V3",
      time: "Past",
      aspect: "Perfect",
      example: "The train had left before we reached the station.",
      explanationBn: "অতীতের দুটি কাজের মধ্যে অপেক্ষাকৃত পূর্ববর্তী কাজ: 'had left'."
    },
    past_pcont: {
      name: "8. Past Perfect Continuous",
      formula: "S + had + been + V-ing",
      time: "Past",
      aspect: "Perf. Cont.",
      example: "They had been waiting for two hours before the bus arrived.",
      explanationBn: "অতীতের নির্দিষ্ট সময়ের পূর্ব পর্যন্ত চলমান: 'had been waiting'."
    },
    fut_simp: {
      name: "9. Future Simple",
      formula: "S + will/shall + V1",
      time: "Future",
      aspect: "Simple",
      example: "She will write another article tomorrow.",
      explanationBn: "ভবিষ্যতে সাধারণ কাজ: 'will write'."
    },
    fut_cont: {
      name: "10. Future Continuous",
      formula: "S + will be + V-ing",
      time: "Future",
      aspect: "Continuous",
      example: "This time tomorrow, she will be writing her final exam.",
      explanationBn: "ভবিষ্যতে কোনো নির্দিষ্ট সময়ে চলমান কাজ: 'will be writing'."
    },
    fut_perf: {
      name: "11. Future Perfect",
      formula: "S + will have + V3",
      time: "Future",
      aspect: "Perfect",
      example: "By next week, she will have written the complete thesis.",
      explanationBn: "ভবিষ্যতের নির্দিষ্ট সময়ের মধ্যে সম্পন্ন কাজ: 'will have written by next week'."
    },
    fut_pcont: {
      name: "12. Future Perfect Continuous",
      formula: "S + will have + been + V-ing",
      time: "Future",
      aspect: "Perf. Cont.",
      example: "By 2028, she will have been writing for over a decade.",
      explanationBn: "ভবিষ্যতের সময়কাল পর্যন্ত একটানা চলমান: 'will have been writing'."
    }
  };

  // Sequence of Tenses Rules Data
  const seqRules = {
    past_dominance: {
      title: "Rule 1: Past Principal Clause Dominance",
      rule: "When the Principal clause is in the Past tense, the Subordinate clause MUST also be in the Past tense.",
      example: "He told me that he WAS preparing for competitive exams. (NOT 'is preparing')",
      bn: "মূল ক্লজ Past Tense হলে আশ্রিত ক্লজটিও Past Tense হতে হবে।"
    },
    universal_truth: {
      title: "Exception 1: Universal Truths & Scientific Laws",
      rule: "A past principal clause DOES NOT alter the tense of a subordinate clause expressing an unchanging truth or natural law.",
      example: "The teacher explained that the earth REVOLVES around the sun. (NOT 'revolved')",
      bn: "চিরন্তন সত্য বা বৈজ্ঞানিক তথ্যে Past Principal থাকা সত্ত্বেও Subordinate ক্লজে Present Simple বসে।"
    },
    comparison: {
      title: "Exception 2: Clauses of Comparison (Than / As)",
      rule: "Subordinate clauses expressing comparison with 'than' or 'as' may take ANY tense required by the sense.",
      example: "He respected you more in the past than he RESPECTS you today.",
      bn: "তুলনামূলক ক্লজে ('than'-এর পর) অর্থ অনুযায়ী যেকোনো কাল বসতে পারে।"
    },
    purpose: {
      title: "Rule 3: Purpose Clauses (So that / In order that)",
      rule: "Present in main -> 'MAY + V1'; Past in main → 'MIGHT + V1'.",
      example: "We eat so that we MAY live. / He worked hard that he MIGHT pass.",
      bn: "উদ্দেশ্যমূলক ক্লজে Present হলে 'may' এবং Past হলে 'might' বসে।"
    }
  };

  // Conditionals Concord Data
  const condData = {
    cond_0: {
      title: "Zero Conditional (General Facts)",
      ifTense: "Simple Present (V1/V5)",
      mainTense: "Simple Present (V1/V5)",
      example: "If you heat ice, it melts into water."
    },
    cond_1: {
      title: "1st Conditional (Real Future Possibility)",
      ifTense: "Simple Present (V1/V5)",
      mainTense: "Simple Future (will + V1)",
      example: "If Swadeep practices daily, he will top the exam."
    },
    cond_2: {
      title: "2nd Conditional (Unreal Hypothetical Present)",
      ifTense: "Simple Past (V2 / were)",
      mainTense: "Conditional (would + V1)",
      example: "If I were the Prime Minister, I would increase the education budget."
    },
    cond_3: {
      title: "3rd Conditional (Unfulfilled Past Regret)",
      ifTense: "Past Perfect (had + V3)",
      mainTense: "Perfect Conditional (would have + V3)",
      example: "If they had left on time, they would have caught the flight."
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
                <GitMerge className="w-3.5 h-3.5" />
                Segment 5 • Module 004.008 • Tense Synergy
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Tense Synergy & Sequence of Tenses Harmony
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the complete <span className="text-sky-400 font-semibold">12-Tense Cross-Matrix</span>, the immutable rules of <span className="text-amber-300 font-semibold">Sequence of Tenses</span>, Universal Truth exceptions, and <span className="text-emerald-400 font-semibold">Conditional Sentence Concord</span>.
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
              <p className="font-semibold text-amber-300 mb-1">💡 বাংলা নির্দেশিকা (Tense Synergy & Sequence):</p>
              একটি জটিল বাক্যে Principal Clause এবং Subordinate Clause-এর ক্রিয়ার কালের মধ্যে যে পারস্পরিক সংগতি রক্ষা করা হয় তাকে Sequence of Tenses বলে। মূল ক্লজ অতীতে থাকলে আশ্রিত ক্লজও অতীতে রূপান্তরিত হয়; কেবল চিরন্তন সত্য বা বৈজ্ঞানিক সূত্রে এটি অপরিবর্তিত থাকে।
            </div>
          )}
        </header>

        {/* ========================================================================= */}
        {/* 2. GRAND 12-TENSE CROSS-MATRIX EXPLORER                                  */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Grid className="w-6 h-6 text-sky-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              1. The Grand 12-Tense Aspectual Cross-Matrix
            </h2>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">
            Click any of the 12 tenses below to inspect its exact morphological formula, aspectual viewpoint, and canonical example:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.keys(tenseMatrix).map((key) => {
              const item = tenseMatrix[key];
              const isActive = selectedTense === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedTense(key)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isActive
                      ? "bg-sky-500/20 border-sky-400 text-white shadow-lg shadow-sky-500/10"
                      : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-sky-300">
                    {item.time} • {item.aspect}
                  </span>
                  <p className="font-bold text-xs sm:text-sm mt-1.5 truncate">{item.name}</p>
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">
                {tenseMatrix[selectedTense].name}
              </h3>
              <div className="text-xs px-3 py-1 rounded-md bg-sky-950 text-sky-300 font-mono border border-sky-800">
                Formula: {tenseMatrix[selectedTense].formula}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Canonical Model Sentence:
              </p>
              <p className="text-emerald-300 font-mono text-sm sm:text-base">
                {tenseMatrix[selectedTense].example}
              </p>
              {showBengali && (
                <p className="text-amber-300/90 text-xs sm:text-sm pt-1 border-t border-slate-800">
                  🇧🇩 {tenseMatrix[selectedTense].explanationBn}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SEQUENCE OF TENSES WORKBENCH                                          */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <ArrowLeftRight className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              2. Universal Rules of Sequence of Tenses
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            {Object.keys(seqRules).map((key) => {
              const item = seqRules[key];
              const isActive = selectedSeqRule === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedSeqRule(key)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    isActive
                      ? "bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-lg"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <p className="font-bold text-xs sm:text-sm truncate">{item.title}</p>
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 animate-fade-in">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center justify-between flex-wrap gap-2">
              <span>{seqRules[selectedSeqRule].title}</span>
              <a
                href="/english-grammar/topic/007_002_clause-analysis-noun-adjective-and-adverb-clauses/0"
                className="text-xs px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-300 hover:bg-sky-500/20 border border-sky-500/30 transition flex items-center gap-1.5 font-normal"
                title="Open Clause Analysis Chapter"
              >
                <span>Explore Clause Chapter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {selectedSeqRule === "past_dominance" ? (
                <>
                  When the Principal{" "}
                  <a
                    href="/english-grammar/topic/007_002_clause-analysis-noun-adjective-and-adverb-clauses/0"
                    className="text-sky-400 hover:text-sky-300 underline underline-offset-4 font-semibold transition inline-flex items-center gap-0.5"
                    title="Read about Principal (Main) Clauses in Clause Analysis Chapter"
                  >
                    clause
                  </a>{" "}
                  is in the Past tense, the Subordinate{" "}
                  <a
                    href="/english-grammar/topic/007_002_clause-analysis-noun-adjective-and-adverb-clauses/0"
                    className="text-sky-400 hover:text-sky-300 underline underline-offset-4 font-semibold transition inline-flex items-center gap-0.5"
                    title="Read about Subordinate (Dependent) Clauses in Clause Analysis Chapter"
                  >
                    clause
                  </a>{" "}
                  MUST also be in the Past tense.
                </>
              ) : (
                seqRules[selectedSeqRule].rule
              )}
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <p className="text-xs uppercase text-slate-400 font-semibold">Exemplary Sentence:</p>
              <p className="text-emerald-300 font-mono text-sm sm:text-base mt-1">
                {seqRules[selectedSeqRule].example}
              </p>
              {showBengali && (
                <p className="text-xs sm:text-sm text-amber-300/90 mt-2">
                  🇧🇩 {seqRules[selectedSeqRule].bn}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. CONDITIONAL SENTENCE CONCORD WORKBENCH                                 */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Compass className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              3. Conditional Sentence Tense Concord (Zero to 3rd)
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.keys(condData).map((key) => {
              const item = condData[key];
              const isActive = condType === key;
              return (
                <button
                  key={key}
                  onClick={() => setCondType(key)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    isActive
                      ? "bg-purple-500/20 border-purple-500 text-purple-200 shadow-lg"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <p className="font-bold text-xs sm:text-sm truncate">{item.title}</p>
                </button>
              );
            })}
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
                <span className="text-purple-400 font-bold uppercase">If-Clause Tense:</span>
                <p className="text-white text-sm">{condData[condType].ifTense}</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
                <span className="text-sky-400 font-bold uppercase">Main-Clause Tense:</span>
                <p className="text-white text-sm">{condData[condType].mainTense}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs uppercase text-slate-400 font-semibold">Example Sentence:</span>
              <p className="text-emerald-300 font-mono text-sm sm:text-base mt-1">
                {condData[condType].example}
              </p>
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
              Classroom Dialogue: "Time vs Tense Discord" Explained
            </h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="font-bold text-amber-400">Debangshu (Student):</span> "Sir, why do linguists say that 'Time' and 'Tense' are completely different things?"
            </div>
            <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-slate-200">
              <span className="font-bold text-sky-400">Sukanta Sir:</span> "Because <span className="text-amber-300 font-bold">Time</span> is a universal non-linguistic continuum (past, present, future seconds), while <span className="text-sky-300 font-bold">Tense</span> is merely the grammatical form of the verb. For example, when you say: <span className="text-emerald-400 font-bold">'The flight departs at 6 AM tomorrow'</span>, the grammatical tense is <span className="text-purple-300 font-bold">Present Simple</span>, but the real-world time is <span className="text-purple-300 font-bold">Future</span>! Grammar is flexible and context-driven."
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
            fileName="module-004-008-tense-synergy.txt"
            content={noteText}
            title="Module 004.008 Study Notes"
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
                question: "What is the Sequence of Tenses in English grammar?",
                answer:
                  "It is the syntactic rule that the tense of the verb in a subordinate clause depends upon and harmonizes with the tense of the verb in the principal clause."
              },
              {
                question: "Why doesn't 'The sun rises in the east' backshift to past in indirect speech?",
                answer:
                  "Because it is an immutable universal truth / physical law of nature. Universal truths are exempt from tense backshifting."
              },
              {
                question: "What modal is used in purpose clauses after a past main verb?",
                answer:
                  "The modal 'might + V1' is used (e.g., 'He ran that he MIGHT catch the train'). If the main verb is present, 'may + V1' is used."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/004_007_future-expressions-modal-aspects-and-timelines/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Previous: Module 004_007 (Future Expressions)</span>
          </a>

          <a
            href="/english-grammar/topic/005_001_active-and-passive-voice-complete-mechanics/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Module 005_001 (Active & Passive Voice)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
