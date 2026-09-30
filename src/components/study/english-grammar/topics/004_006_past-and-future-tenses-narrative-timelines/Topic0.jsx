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
  History,
  Compass,
  ArrowLeftRight
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedTense, setSelectedTense] = useState("past_perf");
  const [beforeAfterMode, setBeforeAfterMode] = useState("before");

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

  const currentTense = tenseMatrix[selectedTense];

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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-purple-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-purple-500/10 text-purple-300 border border-purple-500/30">
                <Grid className="w-3.5 h-3.5" />
                Module 004.004 • Dynamic Core
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Past & Future Tenses & 12-Tense Matrix
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the <span className="text-purple-400 font-semibold">Grand 12-Tense Reference Matrix</span>, the Past Perfect <span className="text-sky-400 font-semibold">"Past of the Past"</span> timeline with Before/After rules, and the 4 ways to express futurity.
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
              <p className="font-semibold text-amber-300 mb-1">💡 বাংলা নির্দেশিকা (Bengali Guide):</p>
              ইংরেজি ব্যাকরণে ৩টি কাল (Present, Past, Future) এবং ৪টি ভাব (Simple, Continuous, Perfect, Perfect Continuous) মিলিয়ে মোট ১২টি Tense গঠিত হয়। অতীতে দুটি কাজের মধ্যে অপেক্ষাকৃত পূর্বে সম্পন্ন কাজটি <strong>Past Perfect</strong> (had + V3) এবং পরের কাজটি <strong>Simple Past</strong> (V2) হয়।
            </div>
          )}
        </header>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: THE GRAND 12-TENSE REFERENCE MATRIX NAVIGATOR               */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Grid className="w-6 h-6 text-purple-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. The Grand 12-Tense Matrix Navigator</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Click any cell in the 3x4 grid to inspect the structural formula, timeline behavior, and examples.
              </p>
            </div>
          </div>

          {/* 3x4 Matrix Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Present Column */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block text-center pb-1 border-b border-slate-800">
                Present Tenses
              </span>
              {["pres_simp", "pres_cont", "pres_perf", "pres_pcont"].map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedTense(key)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all border ${
                    selectedTense === key
                      ? "bg-sky-600/30 text-sky-200 border-sky-500 shadow-md"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  <div className="font-bold">{tenseMatrix[key].name.split(". ")[1]}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">{tenseMatrix[key].formula}</div>
                </button>
              ))}
            </div>

            {/* Past Column */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block text-center pb-1 border-b border-slate-800">
                Past Tenses
              </span>
              {["past_simp", "past_cont", "past_perf", "past_pcont"].map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedTense(key)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all border ${
                    selectedTense === key
                      ? "bg-purple-600/30 text-purple-200 border-purple-500 shadow-md"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  <div className="font-bold">{tenseMatrix[key].name.split(". ")[1]}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">{tenseMatrix[key].formula}</div>
                </button>
              ))}
            </div>

            {/* Future Column */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block text-center pb-1 border-b border-slate-800">
                Future Tenses
              </span>
              {["fut_simp", "fut_cont", "fut_perf", "fut_pcont"].map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedTense(key)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all border ${
                    selectedTense === key
                      ? "bg-emerald-600/30 text-emerald-200 border-emerald-500 shadow-md"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  <div className="font-bold">{tenseMatrix[key].name.split(". ")[1]}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">{tenseMatrix[key].formula}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Tense Inspector Card */}
          <div className="p-6 rounded-xl bg-slate-950 border border-purple-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">{currentTense.name}</h3>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-purple-300">
                {currentTense.formula}
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Example:</span>
              <p className="text-sm font-semibold text-white">"{currentTense.example}"</p>
              {showBengali && (
                <p className="text-xs text-amber-200/90 pt-1">
                  <strong>বাংলা:</strong> {currentTense.explanationBn}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: PAST PERFECT (BEFORE VS AFTER) SIMULATOR                    */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <History className="w-6 h-6 text-sky-400" />
            <div>
              <h2 className="text-xl font-bold text-white">2. Past Perfect: "Past of the Past" Simulator</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Master the classic sequential timeline logic for 'Before' and 'After'.
              </p>
            </div>
          </div>

          {/* Before / After Toggle */}
          <div className="inline-flex rounded-lg bg-slate-800 p-1 border border-slate-700">
            <button
              onClick={() => setBeforeAfterMode("before")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                beforeAfterMode === "before"
                  ? "bg-sky-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              The 'BEFORE' Formula
            </button>
            <button
              onClick={() => setBeforeAfterMode("after")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                beforeAfterMode === "after"
                  ? "bg-sky-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              The 'AFTER' Formula
            </button>
          </div>

          {/* Formula Display Box */}
          <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400">
                Sequential Rule
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-300">
                {beforeAfterMode === "before" ? "Past Perfect + BEFORE + Simple Past" : "Simple Past + AFTER + Past Perfect"}
              </span>
            </div>

            <p className="text-lg sm:text-xl font-bold text-white">
              {beforeAfterMode === "before" ? (
                <>
                  "The patient <span className="text-purple-400 underline">had died</span> (Earlier Past: Action 1) before the doctor <span className="text-emerald-400 underline">arrived</span> (Later Past: Action 2)."
                </>
              ) : (
                <>
                  "The doctor <span className="text-emerald-400 underline">arrived</span> (Later Past: Action 2) after the patient <span className="text-purple-400 underline">had died</span> (Earlier Past: Action 1)."
                </>
              )}
            </p>

            {showBengali && (
              <p className="text-xs text-amber-200/90 pt-1 border-t border-slate-800 animate-fade-in">
                <strong>মনে রাখার কৌশল:</strong> 'Before'-এর পূর্বে Past Perfect বসে; আর 'After'-এর পরে Past Perfect বসে।
              </p>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SECTION 3: 25-QUESTION INTERACTIVE MASTERY QUIZ                        */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-amber-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Module 004.004 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive test on Past Perfect sequencing, Future Perfect milestones, and 12-tense timeline mastery.
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
              const isWrong = submitted && isAnswered && selectedOpt !== q.correctAnswer;

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
                    <span className="text-xs font-bold text-purple-400 font-mono">Q{qIndex + 1}.</span>
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
                        btnStyle = "bg-purple-500/20 border-purple-500 text-purple-200 font-semibold";
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
                        <strong className="text-purple-400">Explanation:</strong> {q.explanation}
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
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all"
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
          <PlainTextPrint content={noteText} title="Module 004.006 Study Note - Past & Future Tenses Matrix" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            faqList={[
              {
                question: "Why is 'The patient died before the doctor had arrived' incorrect?",
                answer: "The earlier of two past events must take the Past Perfect ('had died'), and the later event must take the Simple Past ('arrived'). Reversing this violates standard English temporal sequence."
              },
              {
                question: "What is the trigger for the Future Perfect tense?",
                answer: "The Future Perfect ('will have + V3') is triggered by time expressions starting with 'By' (e.g. 'By next year', 'By 2030', 'By the time he arrives')."
              },
              {
                question: "What is the difference between 'will' and 'be going to'?",
                answer: "'Will' is used for spontaneous decisions made at the moment of speaking or general predictions. 'Be going to' is used for pre-meditated plans/intentions or predictions based on immediate visible evidence."
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
