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
  ShieldAlert,
  Flame,
  CheckCircle,
  Workflow
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

export default function Topic4() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedExampleIdx, setSelectedExampleIdx] = useState(0);

  // Inversion Transformation Examples
  const transformExamples = [
    {
      context: "Police Pursuit",
      standard: "As soon as the thief saw the police patrol, he vanished into the dark alley.",
      noSooner: "No sooner HAD the thief SEEN the police patrol THAN he vanished into the dark alley.",
      hardly: "Hardly HAD the thief SEEN the police patrol WHEN he vanished into the dark alley."
    },
    {
      context: "Examination Bell",
      standard: "As soon as the final bell rang, the candidates submitted their answer scripts.",
      noSooner: "No sooner HAD the final bell RUNG THAN the candidates submitted their answer scripts.",
      hardly: "Scarcely HAD the final bell RUNG WHEN the candidates submitted their answer scripts."
    },
    {
      context: "Thunderstorm Arrival",
      standard: "As soon as Abhronila reached home, the torrential downpour started.",
      noSooner: "No sooner HAD Abhronila REACHED home THAN the torrential downpour started.",
      hardly: "Hardly HAD Abhronila REACHED home WHEN the torrential downpour started."
    },
    {
      context: "Laboratory Demonstration",
      standard: "As soon as Sukanta Sir ignited the reagent, a brilliant emerald flame appeared.",
      noSooner: "No sooner HAD Sukanta Sir IGNITED the reagent THAN a brilliant emerald flame appeared.",
      hardly: "Barely HAD Sukanta Sir IGNITED the reagent WHEN a brilliant emerald flame appeared."
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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-950/60 via-slate-900 to-indigo-950/40 p-8 sm:p-12 border border-rose-600/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-rose-500/10 text-rose-300 border border-rose-500/30">
                <Clock className="w-3.5 h-3.5" />
                Topic 004_006_04 • High-Frequency Negative Inversions
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Negative Inversion Mechanics
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Subject-auxiliary inversion formulas with <span className="text-amber-300 font-semibold">'Hardly/Scarcely... when'</span> and <span className="text-rose-400 font-semibold">'No sooner... than'</span>, eliminating fatal connective pairing traps.
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
              "যেইমাত্র... অমনি..." বা "করতে না করতেই..." প্রকাশে Inversion ব্যবহৃত হয়। 'Hardly/Scarcely'-র সাথে সর্বদা 'WHEN' এবং 'No sooner'-এর সাথে সর্বদা 'THAN' বসে। বাক্য এদের দিয়ে শুরু হলে Subject-এর আগেই Auxiliary (Had) চলে আসে।
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
              href="/english-grammar/topic/003_004_adverb-inversion-and-negative-fronting/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Adverb Inversion Foundations</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/3"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-300 border border-sky-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Topic 3: Before / After</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/007_004_transformation-of-sentences-advanced-rules/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Sentence Transformation</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: INVERSION TRANSFORMATION STUDIO                             */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Workflow className="w-6 h-6 text-rose-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. The Inversion Transformation Triangle Studio</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Inspect how standard 'As soon as' transforms into 'No sooner... than' and 'Hardly... when'.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {transformExamples.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedExampleIdx(idx)}
                className={`p-3 rounded-xl text-left border text-xs transition-all ${
                  selectedExampleIdx === idx
                    ? "bg-rose-600 text-white border-rose-400 font-bold shadow-md shadow-rose-600/20"
                    : "bg-slate-950 text-slate-400 hover:bg-slate-800 border-slate-800"
                }`}
              >
                <div className="font-bold text-xs">{ex.context}</div>
              </button>
            ))}
          </div>

          {/* Active Transformation Card */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-rose-500/40 space-y-4">
            <div className="space-y-3">
              {/* Standard */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-sky-400">1. Standard Order (As soon as):</span>
                <p className="text-sm font-semibold text-slate-200 font-mono">
                  "{transformExamples[selectedExampleIdx].standard}"
                </p>
              </div>

              {/* No Sooner ... THAN */}
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-rose-300">2. Comparative Inversion (No sooner ... THAN):</span>
                <p className="text-sm font-extrabold text-white font-mono">
                  "{transformExamples[selectedExampleIdx].noSooner}"
                </p>
              </div>

              {/* Hardly ... WHEN */}
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-amber-300">3. Restrictive Inversion (Hardly/Scarcely ... WHEN):</span>
                <p className="text-sm font-extrabold text-white font-mono">
                  "{transformExamples[selectedExampleIdx].hardly}"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: 25-QUESTION INTERACTIVE MASTERY QUIZ                        */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-rose-400" />
              <div>
                <h2 className="text-xl font-bold text-white">2. Topic 004_006_04 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive test on 'Hardly...when', 'No sooner...than', 'did' variants, and error spotting.
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
                    <span className="text-xs font-bold text-rose-400 font-mono">Q{qIndex + 1}.</span>
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
                        btnStyle = "bg-rose-500/20 border-rose-500 text-rose-200 font-semibold";
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
                        <strong className="text-rose-400">Explanation:</strong> {q.explanation}
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
                className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all"
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
          <PlainTextPrint content={noteText} title="Module 004.006 Topic 4 Note - Negative Inversions" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            questions={[
              {
                question: "Why do 'Hardly' and 'No sooner' require inverted word order?",
                answer: "When restrictive or negative adverbs (hardly, scarcely, no sooner, never, seldom) are placed at the beginning of a sentence for rhetorical emphasis, formal English grammar requires the auxiliary verb to precede the subject (Subject-Auxiliary Inversion)."
              },
              {
                question: "Which correlative conjunctions pair with 'No sooner' vs 'Hardly'?",
                answer: "'No sooner' contains the comparative suffix '-er' and strictly pairs with 'THAN'. 'Hardly', 'Scarcely', and 'Barely' strictly pair with 'WHEN'."
              },
              {
                question: "Can 'did' be used instead of 'had' in 'No sooner' sentences?",
                answer: "Yes! You can say 'No sooner did he arrive than...' (Did + Subject + Base Verb V1 + than). Both are accepted in formal grammar."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/3"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 3 (Before / After Formulas)</span>
          </a>

          <a
            href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/5"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 5 (Past Perfect Continuous)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
