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
  Clock,
  Compass,
  Link,
  ShieldAlert,
  Award,
  Calendar,
  Sliders,
  Flame
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

export default function Topic4() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeBridge, setActiveBridge] = useState("consequence");
  const [selectedScenario, setSelectedScenario] = useState(0);

  // 4 Primary Semantic Bridges
  const bridges = {
    consequence: {
      title: "1. Direct Present Consequence (Resultative)",
      badge: "Active Present Result",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      desc: "The physical event happened in the past, but the resulting state or impact is operative RIGHT NOW.",
      formula: "Past Action + Current Consequence = Present Perfect",
      example: "I have lost my house keys (Result: I cannot enter my home right now).",
      exampleBn: "আমি চাবি হারিয়ে ফেলেছি (এর ফলাফল: বর্তমানে আমি ঘরে ঢুকতে পারছি না)।"
    },
    experience: {
      title: "2. Life Experience up to Now",
      badge: "Indefinite Lifetime",
      badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
      desc: "Actions that have occurred at least once (or never) throughout the subject's entire life up to this point.",
      formula: "Have / Has + Ever / Never / Before + V3",
      example: "Tuhina has visited the Victoria Memorial several times.",
      exampleBn: "তুহিনা তার জীবনে একাধিকবার ভিক্টোরিয়া মেমোরিয়াল পরিদর্শন করেছে।"
    },
    recent: {
      title: "3. Immediate Recent Past & Completion",
      badge: "Just / Already / Yet",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      desc: "Actions completed moments ago or sooner than anticipated.",
      formula: "have/has + just / already + V3 | haven't + V3 ... yet",
      example: "The Rajdhani Express has just arrived on platform 1.",
      exampleBn: "রাজধানী এক্সপ্রেস এইমাত্র ১ নম্বর প্ল্যাটফর্মে পৌঁছাল।"
    },
    unfinished: {
      title: "4. Unfinished Time Period",
      badge: "Period Incomplete",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      desc: "Actions taking place during a period of time that is still continuing at the moment of speaking.",
      formula: "today, this morning (still morning), this week, this year",
      example: "Swadeep has written three research essays this week.",
      exampleBn: "স্বদীপ এই চলতি সপ্তাহে তিনটি গবেষণাধর্মী প্রবন্ধ লিখেছে।"
    }
  };

  // Interactive Consequence Equation Scenarios
  const consequenceScenarios = [
    {
      pastAction: "Surgeon operates on the patient.",
      presentState: "The patient is resting safely in the recovery ward right now.",
      correctTense: "The surgeon HAS OPERATED on the patient.",
      explanation: "The operation is finished, but the safety and recovery state is directly active in the present."
    },
    {
      pastAction: "Debopam misplaces his admit card.",
      presentState: "He cannot enter the examination hall at this moment.",
      correctTense: "Debopam HAS MISPLACED his admit card.",
      explanation: "The lack of admit card prevents entry right now -> Present Perfect."
    },
    {
      pastAction: "Rain clouds pour down water.",
      presentState: "The Barrackpore stadium pitch is completely wet.",
      correctTense: "It HAS RAINED heavily.",
      explanation: "Visible physical evidence in the present moment mandates Present Perfect."
    },
    {
      pastAction: "Faculty publishes new grammar syllabus.",
      presentState: "The curriculum is currently live on the portal.",
      correctTense: "The faculty HAS PUBLISHED the syllabus.",
      explanation: "The live status of the portal is the ongoing present consequence."
    }
  ];

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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-indigo-950/40 p-8 sm:p-12 border border-emerald-600/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                <Clock className="w-3.5 h-3.5" />
                Topic 004_005_04 • Present Perfect Tense
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                The Present Perfect Bridge
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Mastering the syntactic bridge between past actions and present consequence, life experiences, and mandatory adverbs: <span className="text-emerald-400 font-semibold">just, already, yet, ever, never, so far</span>.
              </p>
            </div>

            <button
              onClick={() => setShowBengali(!showBengali)}
              className="self-start md:self-center flex items-center gap-2.5 px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-amber-300 border border-amber-500/40 shadow-lg hover:shadow-amber-500/10 transition-all duration-200 text-sm font-medium"
            >
              <Languages className="w-4 h-4 text-amber-400" />
              <span>{showBengali ? "Switch to English View" : "বাংলা ব্যাখ্যা দেখুন (Bengali View)"}</span>
            </button>
          </div>

          {showBengali && (
            <div className="mt-6 p-4 rounded-xl bg-amber-950/40 border border-amber-600/40 text-amber-200 text-sm leading-relaxed animate-fade-in">
              <p className="font-semibold text-amber-300 mb-1">💡 বাংলা নির্দেশিকা (Bengali Guide):</p>
              Present Perfect Tense (have/has + V3) হলো অতীত ও বর্তমানের মেলবন্ধন। কাজটি অতীতে ঘটলেও তার ফল বা তাৎপর্য যদি বর্তমান মুহূর্তে বিদ্যমান থাকে, তবেই এটি ব্যবহৃত হয় (যেমন: "I have cut my finger" = আঙুল এখনো কাটায় রক্ত পড়ছে)।
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
              <h3 className="text-sm font-bold text-white">Grammar Nexus: Related Chapter Cross-References</h3>
              <p className="text-xs text-slate-300">Jump directly to interconnected syntax foundations</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/5"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>'Has Gone To' vs 'Has Been To'</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/7"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-rose-300 border border-rose-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Past Time Anchor Prohibition</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-300 border border-sky-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Simple Past vs Present Perfect</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: 4 PRIMARY SEMANTIC BRIDGES                                  */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Layers className="w-6 h-6 text-emerald-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. The 4 Semantic Bridges of Present Perfect</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Explore the four conditions that connect an indefinite past action to present reality.
              </p>
            </div>
          </div>

          {/* Bridge Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.keys(bridges).map((key) => (
              <button
                key={key}
                onClick={() => setActiveBridge(key)}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all border text-center ${
                  activeBridge === key
                    ? "bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-600/20"
                    : "bg-slate-950 text-slate-300 hover:bg-slate-800 border-slate-800"
                }`}
              >
                {bridges[key].title.split(". ")[1].split(" (")[0]}
              </button>
            ))}
          </div>

          {/* Active Bridge Card */}
          <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-white">
                {bridges[activeBridge].title}
              </h3>
              <span className={`text-xs font-mono px-3 py-1 rounded-full border ${bridges[activeBridge].badgeColor}`}>
                {bridges[activeBridge].badge}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {bridges[activeBridge].desc}
            </p>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Conceptual Formula:
              </span>
              <p className="text-xs font-mono text-amber-300">{bridges[activeBridge].formula}</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Authentic Example:</span>
              <p className="text-sm font-semibold text-white">
                "{bridges[activeBridge].example}"
              </p>
              {showBengali && (
                <p className="text-xs text-amber-200/90 pt-1">
                  <strong>বাংলা:</strong> {bridges[activeBridge].exampleBn}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: INTERACTIVE PRESENT RESULT RESOLVER STUDIO                  */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Sliders className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">2. Present Result Equation Simulator</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Observe how the coexistence of a past trigger and an active present consequence yields Present Perfect.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            {consequenceScenarios.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedScenario(idx)}
                className={`p-3 rounded-xl text-left border text-xs transition-all ${
                  selectedScenario === idx
                    ? "bg-amber-500/20 text-amber-200 border-amber-500/50 font-bold"
                    : "bg-slate-950 text-slate-400 hover:bg-slate-800 border-slate-800"
                }`}
              >
                Scenario #{idx + 1}
              </button>
            ))}
          </div>

          {/* Active Scenario Display */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-sky-400 font-bold">1. Past Action Event:</span>
                <p className="text-sm font-semibold text-slate-200">{consequenceScenarios[selectedScenario].pastAction}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">2. Active Present State:</span>
                <p className="text-sm font-semibold text-slate-200">{consequenceScenarios[selectedScenario].presentState}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-1">
              <span className="text-xs uppercase font-mono text-emerald-300 font-bold">Syntactic Output:</span>
              <p className="text-lg font-extrabold text-white font-mono">
                "{consequenceScenarios[selectedScenario].correctTense}"
              </p>
              <p className="text-xs text-slate-300 pt-1">
                {consequenceScenarios[selectedScenario].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SECTION 3: 25-QUESTION INTERACTIVE MASTERY QUIZ                        */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-emerald-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Topic 004_005_04 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Test your mastery on resultative consequences, experience markers, already/yet placements, and unfinished periods.
                </p>
              </div>
            </div>

            {submitted && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
                  Score: {calculateScore()} / {questions.length} (
                  {Math.round((calculateScore() / questions.length) * 100)}%)
                </span>
                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all border border-slate-700"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Retry
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {questions.map((q, qIndex) => {
              const selectedOpt = userAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = submitted && selectedOpt === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border transition-all ${
                    submitted
                      ? isCorrect
                        ? "bg-emerald-950/20 border-emerald-500/40"
                        : "bg-rose-950/20 border-rose-500/40"
                      : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-bold text-emerald-400 font-mono">Q{qIndex + 1}.</span>
                    <p className="text-sm sm:text-base font-semibold text-slate-100 flex-1">
                      {q.question}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isThisSelected = selectedOpt === optIdx;
                      let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800";

                      if (submitted) {
                        if (optIdx === q.correctAnswer) {
                          btnStyle = "bg-emerald-900/40 border-emerald-500 text-emerald-200 font-semibold";
                        } else if (isThisSelected) {
                          btnStyle = "bg-rose-900/40 border-rose-500 text-rose-200";
                        } else {
                          btnStyle = "bg-slate-900/40 border-slate-800/40 text-slate-500 opacity-60";
                        }
                      } else if (isThisSelected) {
                        btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={submitted}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm border transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {submitted && optIdx === q.correctAnswer && (
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {submitted && (
                    <div className="mt-3 pt-3 border-t border-slate-800 text-xs space-y-1.5 animate-fade-in">
                      <p className="text-slate-300">
                        <strong className="text-emerald-400">Explanation:</strong> {q.explanation}
                      </p>
                      {showBengali && q.explanationBn && (
                        <p className="text-amber-300/90 font-medium">
                          <strong>বাংলা ব্যাখ্যা:</strong> {q.explanationBn}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!submitted && (
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(userAnswers).length === 0}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all"
              >
                Submit Answers ({Object.keys(userAnswers).length} / {questions.length} answered)
              </button>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 5. PRINT & AUXILIARY STUDY TOOLS                                          */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <PlainTextPrint content={noteText} title="Module 004.005 Topic 4 Note - Present Perfect Tense" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            faqList={[
              {
                question: "Why can't we say 'I have seen him yesterday'?",
                answer: "The Present Perfect tense connects an action to the present moment and strictly forbids finished, specific past time markers (such as yesterday, ago, last week, in 2010). When a finished past point is named, you MUST use the Simple Past ('I saw him yesterday')."
              },
              {
                question: "What is the standard placement for 'already', 'just', and 'yet'?",
                answer: "'Just' and 'already' are typically placed in the mid-position between the auxiliary (have/has) and the past participle (V3) (e.g. 'She has already finished'). 'Yet' is placed at the end of negative clauses and questions (e.g. 'He hasn't called yet')."
              },
              {
                question: "Why is 'Shakespeare has written Hamlet' wrong?",
                answer: "Present Perfect is used for life experiences of people who are alive today. Because Shakespeare is dead, his lifetime is a completed past period, so his works require Simple Past ('Shakespeare wrote Hamlet')."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/3"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 3 (Present Continuous)</span>
          </a>

          <a
            href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/5"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 5 ('Has Gone To' vs 'Has Been To')</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
