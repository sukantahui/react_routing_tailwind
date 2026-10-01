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
  Repeat,
  Sliders,
  History,
  Activity,
  CheckCircle
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

export default function Topic1() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeScenarioMode, setActiveScenarioMode] = useState("interrupted");

  // Interrupted vs Parallel Scenarios
  const scenarios = {
    interrupted: {
      title: "Interrupted Action with 'WHEN'",
      badge: "Background + Sudden Event",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      formula: "[Past Continuous (was/were V-ing)] + WHEN + [Simple Past (V2)]",
      desc: "A longer continuous activity was in progress when a sudden, short event broke the continuity.",
      example: "Swadeep was coding the database architecture when the power supply tripped.",
      exampleBn: "স্বদীপ যখন ডেটাবেস কোডিং করছিল, তখন হঠাৎ বিদ্যুৎ চলে গেল।"
    },
    parallel: {
      title: "Parallel Simultaneous Actions with 'WHILE'",
      badge: "Two Ongoing Activities",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      formula: "WHILE + [Past Continuous], [Past Continuous]",
      desc: "Two distinct continuous actions were occurring simultaneously without interruption.",
      example: "While Abhronila was reciting poetry, Tuhina was accompanying her on the sitar.",
      exampleBn: "যখন অভ্রনীলা কবিতা আবৃত্তি করছিল, তখন তুহিনা সেতারে সঙ্গত করছিল।"
    },
    exact_time: {
      title: "Exact Past Milestone Action",
      badge: "Clock Point In Past",
      badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
      formula: "At [Exact Time] + Subject + was/were + V-ing",
      desc: "Specifies what activity was in progress at a precise minute on the clock yesterday.",
      example: "At exactly 09:30 PM last night, our faculty was reviewing board question banks.",
      exampleBn: "গতকাল রাত ঠিক ৯:৩০ মিনিটে আমাদের শিক্ষকরা প্রশ্নব্যাংক পর্যালোচনা করছিলেন।"
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
                <Clock className="w-3.5 h-3.5" />
                Topic 004_006_01 • Past Continuous Tense
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Past Continuous Mechanics
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Ongoing background activities, interrupted actions with <span className="text-amber-300 font-semibold">'When'</span>, simultaneous parallel actions with <span className="text-emerald-400 font-semibold">'While'</span>, and stative verb constraints.
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
              Past Continuous (was/were + V-ing) অতীতে চলমান কোনো কাজকে নির্দেশ করে। যখন একটি চলমান কাজ অন্য একটি হঠাৎ ঘটা কাজের দ্বারা বাধাগ্রস্ত হয়, তখন চলমানটিতে Past Continuous এবং হঠাৎ ঘটাটিতে Simple Past (V2) বসে।
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
              href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-300 border border-sky-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Topic 0: Simple Past (V2)</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/2"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Topic 2: Past Perfect (had + V3)</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/2"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Stative Verbs (No -ing)</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: INTERRUPTED VS PARALLEL STUDIO                              */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Sliders className="w-6 h-6 text-sky-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. Narrative Timeline Studio: Interrupted vs Parallel</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Observe how 'When' connects an interrupted action while 'While' synchronizes parallel activities.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Object.keys(scenarios).map((key) => (
              <button
                key={key}
                onClick={() => setActiveScenarioMode(key)}
                className={`p-3.5 rounded-xl text-left border text-xs transition-all ${
                  activeScenarioMode === key
                    ? "bg-sky-600 text-white border-sky-400 font-bold shadow-md shadow-sky-600/20"
                    : "bg-slate-950 text-slate-400 hover:bg-slate-800 border-slate-800"
                }`}
              >
                <div className="font-bold text-sm">{scenarios[key].title}</div>
                <div className="text-[11px] opacity-80 mt-1">{scenarios[key].badge}</div>
              </button>
            ))}
          </div>

          {/* Active Scenario Card */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-sky-500/40 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-white">{scenarios[activeScenarioMode].title}</h3>
              <span className={`text-xs font-mono px-3 py-1 rounded-full border ${scenarios[activeScenarioMode].badgeColor}`}>
                {scenarios[activeScenarioMode].badge}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {scenarios[activeScenarioMode].desc}
            </p>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block mb-1">Syntactic Formula:</span>
              <p className="text-xs font-mono text-amber-300">{scenarios[activeScenarioMode].formula}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Example:</span>
              <p className="text-sm font-semibold text-white font-mono">
                "{scenarios[activeScenarioMode].example}"
              </p>
              {showBengali && (
                <p className="text-xs text-amber-300/90 pt-1">
                  <strong>বাংলা:</strong> {scenarios[activeScenarioMode].exampleBn}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: 25-QUESTION INTERACTIVE MASTERY QUIZ                        */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-sky-400" />
              <div>
                <h2 className="text-xl font-bold text-white">2. Topic 004_006_01 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Test your mastery on background actions, 'When' vs 'While' sequencing, and stative verb constraints.
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
                    <span className="text-xs font-bold text-sky-400 font-mono">Q{qIndex + 1}.</span>
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
                        btnStyle = "bg-sky-500/20 border-sky-500 text-sky-200 font-semibold";
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
                        <strong className="text-sky-400">Explanation:</strong> {q.explanation}
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
                className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-600/30 transition-all"
              >
                Submit Answers ({Object.keys(userAnswers).length} / {questions.length} answered)
              </button>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 4. PRINT & AUXILIARY STUDY TOOLS                                          */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <PlainTextPrint content={noteText} title="Module 004.006 Topic 1 Note - Past Continuous Tense" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            questions={[
              {
                question: "How do 'when' and 'while' differ in past narrative structures?",
                answer: "'When' is usually followed by a short, sudden Simple Past action that interrupts a longer ongoing activity (e.g. 'I was studying when the power tripped'). 'While' is followed by a continuous ongoing action in Past Continuous (e.g. 'While I was studying, my sister was cooking')."
              },
              {
                question: "Can stative verbs take Past Continuous?",
                answer: "No. Verbs expressing states, cognition, or involuntary perception (e.g. know, understand, belong, hear) cannot take continuous forms. Use Simple Past: 'I knew the answer' (NOT: *'I was knowing')."
              },
              {
                question: "When are two Simple Past verbs used with 'when'?",
                answer: "When two actions happen immediately one after the other in rapid succession (e.g. 'When the bell rang, the students opened their papers')."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 0 (Simple Past V2)</span>
          </a>

          <a
            href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/2"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 2 (Past Perfect / Pluperfect)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
