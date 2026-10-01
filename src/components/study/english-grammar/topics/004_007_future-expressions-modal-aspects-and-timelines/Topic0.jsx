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
  Compass,
  TrendingUp,
  Target,
  ShieldCheck,
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
  const [selectedWay, setSelectedWay] = useState("going_to");
  const [deadlineTarget, setDeadlineTarget] = useState("friday");

  // The 5 Ways to Express Future Data
  const futureWays = {
    will: {
      title: "1. Simple Future (will + V1)",
      formula: "Subject + will / shall + V1",
      scenario: "Spontaneous decision, promise, threat, opinion-based prediction.",
      example: "'The bell is ringing. I will answer it.' / 'I think it will rain.'",
      bn: "মুহূর্তের সিদ্ধান্ত বা অনুমানের ক্ষেত্রে: 'I will answer the phone'."
    },
    going_to: {
      title: "2. 'Be going to + V1'",
      formula: "Subject + am / is / are + going to + V1",
      scenario: "Pre-meditated plan/intention OR prediction with visible present evidence.",
      example: "'Look at those dark clouds! It is going to rain.' / 'I am going to buy a laptop.'",
      bn: "পূর্ব পরিকল্পনা বা চাক্ষুষ প্রমাণের ভিত্তিতে ভবিষ্যৎ: 'It is going to rain'."
    },
    pres_cont: {
      title: "3. Present Continuous for Future",
      formula: "Subject + am / is / are + V-ing",
      scenario: "Fixed personal arrangement with specific time, venue, and people.",
      example: "'We are meeting the doctor tomorrow at 4:30 PM.' (Appointment fixed)",
      bn: "নির্দিষ্ট বন্দোবস্ত বা পূর্বনির্ধারিত সাক্ষাতের জন্য: 'are meeting tomorrow'."
    },
    pres_simp: {
      title: "4. Simple Present for Timetables",
      formula: "Subject + V1 / V5 (-s/-es)",
      scenario: "Official public timetables, transport schedules, calendar events.",
      example: "'The Howrah Express departs at 6:15 AM tomorrow.'",
      bn: "অফিসিয়াল সময়সূচি বা ট্রেনের টাইমেবল: 'The train departs at 6:15 AM'."
    },
    about_to: {
      title: "5. 'Be about to / Be to + V1'",
      formula: "Subject + am/is/are + about to + V1",
      scenario: "Immediate impending future OR official formal duties/instructions.",
      example: "'The rocket is about to launch!' / 'The Prime Minister is to visit Tokyo.'",
      bn: "অবিলম্বে ঘটতে চলা ক্রিয়া বা রাষ্ট্রীয় কর্মসূচি: 'is about to launch'."
    }
  };

  // Future Perfect Deadline Data
  const deadlineScenarios = {
    friday: {
      marker: "By next Friday",
      subordinate: "before the sprint closes",
      result: "Swadeep WILL HAVE COMPLETED his React project.",
      bn: "আগামী শুক্রবারের পূর্বে কাজটি সম্পন্ন হয়ে থাকবে।"
    },
    home: {
      marker: "By the time you reach home",
      subordinate: "when you arrive",
      result: "Mother WILL HAVE PREPARED dinner.",
      bn: "তুমি বাড়ি পৌঁছানোর আগেই মা রান্না শেষ করে রাখবেন।"
    },
    year2030: {
      marker: "By the year 2030",
      subordinate: "over the next decade",
      result: "They WILL HAVE BEEN RESEARCHING AI for 15 years.",
      bn: "২০৩০ সাল নাগাদ তারা একটানা ১৫ বছর ধরে গবেষণা করতে থাকবে।"
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
                <Target className="w-3.5 h-3.5" />
                Segment 5 • Module 004.007 • Future Expressions
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Future Expressions, Modal Aspects & Prospective Timelines
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the <span className="text-sky-400 font-semibold">5 distinct ways</span> to express future in English, the fatal <span className="text-rose-400 font-semibold">"No Will in If/When clauses"</span> rule, and the <span className="text-amber-300 font-semibold">Future Perfect "By the time"</span> deadline mechanics.
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
              <p className="font-semibold text-amber-300 mb-1">💡 বাংলা নির্দেশিকা (Future Expressions):</p>
              ইংরেজিতে ভবিষ্যৎ বোঝানোর জন্য কেবল 'will' যথেষ্ট নয়। তাত্ক্ষণিক সিদ্ধান্তের জন্য 'will', পূর্ব পরিকল্পনার জন্য 'be going to', ব্যক্তিগত অ্যাপয়েন্টমেন্টের জন্য Present Continuous, এবং অফিসিয়াল সময়সূচির জন্য Simple Present ব্যবহৃত হয়। মনে রাখবেন: 'If/When/As soon as'-এর পরে কখনই 'will' বসে না!
            </div>
          )}
        </header>

        {/* ========================================================================= */}
        {/* 2. THE 5 WAYS TO EXPRESS FUTURE TIME WORKBENCH                            */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="w-6 h-6 text-sky-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              1. The 5 Distinct Ways to Express Future Time
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {Object.keys(futureWays).map((key) => {
              const item = futureWays[key];
              const isActive = selectedWay === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedWay(key)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    isActive
                      ? "bg-sky-500/20 border-sky-400 text-white shadow-lg shadow-sky-500/10"
                      : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  <p className="text-[11px] uppercase font-semibold text-sky-400">Option</p>
                  <p className="font-bold text-xs sm:text-sm mt-0.5 truncate">{item.title}</p>
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">
                {futureWays[selectedWay].title}
              </h3>
              <div className="text-xs px-3 py-1 rounded-md bg-sky-950 text-sky-300 font-mono border border-sky-800">
                Formula: {futureWays[selectedWay].formula}
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              <span className="text-sky-400 font-semibold">Core Pragmatic Function: </span>
              {futureWays[selectedWay].scenario}
            </p>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Canonical Context & Example:
              </p>
              <p className="text-emerald-300 font-mono text-sm sm:text-base">
                {futureWays[selectedWay].example}
              </p>
              {showBengali && (
                <p className="text-amber-300/90 text-xs sm:text-sm pt-1 border-t border-slate-800">
                  🇧🇩 {futureWays[selectedWay].bn}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. FUTURE PERFECT "BY THE TIME" DEADLINE SIMULATOR                       */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              2. Future Perfect "By The Time" Deadline Simulator
            </h2>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">
            The <span className="text-amber-300 font-semibold font-mono">Future Perfect (will have + V3)</span> marks an action that will be completed <em>prior</em> to a future benchmark. Select a scenario below:
          </p>

          <div className="flex flex-wrap gap-2.5">
            {Object.keys(deadlineScenarios).map((key) => {
              const isActive = deadlineTarget === key;
              return (
                <button
                  key={key}
                  onClick={() => setDeadlineTarget(key)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                    isActive
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-lg"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {deadlineScenarios[key].marker}
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 animate-fade-in">
            <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs sm:text-sm text-amber-400 border border-slate-800">
              <span className="text-slate-400">{deadlineScenarios[deadlineTarget].marker}, </span>
              <span className="text-emerald-300 font-bold">{deadlineScenarios[deadlineTarget].result}</span>
            </div>

            {showBengali && (
              <p className="text-xs sm:text-sm text-amber-300/90 p-3 rounded-xl bg-amber-950/20 border border-amber-900/40">
                🇧🇩 {deadlineScenarios[deadlineTarget].bn}
              </p>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. THE FATAL TRAP: NO WILL IN SUBORDINATE TIME/CONDITIONAL CLAUSES       */}
        {/* ========================================================================= */}
        <section className="p-6 sm:p-8 rounded-3xl bg-rose-950/20 border border-rose-600/30 space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-rose-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white">
              The Golden Rule: Subordinate Clauses of Time & Condition Prohibition
            </h3>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            In competitive exams (SSC CGL, WBCS, Banking), this is tested constantly. When a sentence refers to future time, conjunctions like <span className="text-amber-300 font-bold">if, unless, when, as soon as, until, before, after</span> strictly take <span className="text-emerald-400 font-bold">SIMPLE PRESENT (V1/V5)</span>, NOT 'will/shall':
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/40 text-xs font-mono space-y-2">
              <p className="text-rose-400 font-bold uppercase">✗ INCORRECT (Double Will):</p>
              <p className="text-rose-200">"If it <span className="underline decoration-rose-500">will rain</span> tomorrow, we will stay at home."</p>
              <p className="text-rose-200">"As soon as he <span className="underline decoration-rose-500">will reach</span>, we will start."</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-xs font-mono space-y-2">
              <p className="text-emerald-400 font-bold uppercase">✓ CORRECT (Present Simple in Sub-Clause):</p>
              <p className="text-emerald-200">"If it <span className="font-bold text-emerald-400">RAINS</span> tomorrow, we will stay at home."</p>
              <p className="text-emerald-200">"As soon as he <span className="font-bold text-emerald-400">REACHES</span>, we will start."</p>
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
              Classroom Dialogue: "Will" vs "Going To" vs "Present Continuous"
            </h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="font-bold text-amber-400">Swadeep (Student):</span> "Sir, both 'I will leave tomorrow' and 'I am leaving tomorrow' sound natural. Which one is technically more precise?"
            </div>
            <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-slate-200">
              <span className="font-bold text-sky-400">Sukanta Sir:</span> "Great nuance! If you say <span className="text-sky-300 font-bold">'I am leaving tomorrow'</span> (Present Continuous), it means tickets are booked, leave is approved, and it is a 100% fixed arrangement. If you say <span className="text-amber-300 font-bold">'I will leave tomorrow'</span>, it sounds like a decision you just made this second. Choose the aspect that matches your reality!"
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
                3. Self-Assessment Quiz (25 Diagnostic MCQs)
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
            fileName="module-004-007-future-expressions.txt"
            content={noteText}
            title="Module 004.007 Study Notes"
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
                question: "Why does English grammar prohibit 'will' in 'if' clauses?",
                answer:
                  "Condition clauses (if/unless) set a hypothetical condition, not a factual future event. The future modality is expressed in the main consequence clause, while the condition clause takes the Simple Present."
              },
              {
                question: "When should I use 'is going to' instead of 'will' for predictions?",
                answer:
                  "Use 'is going to' when you have sensory, physical present evidence right in front of you (e.g., dark clouds, dizzy person, broken rope). Use 'will' when you are expressing a subjective belief or gut feeling."
              },
              {
                question: "What is the formula for the Future Perfect tense?",
                answer:
                  "Subject + will have + V3 (Past Participle). It is almost always accompanied by a time prepositional phrase with 'by' (e.g., 'by tomorrow', 'by 2030', 'by the time you arrive')."
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
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Previous: Module 004_006 (Past Tense System)</span>
          </a>

          <a
            href="/english-grammar/topic/004_008_tense-synergy-sequence-of-tenses-and-aspectual-harmony/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Module 004_008 (Tense Synergy & Sequence of Tenses)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
