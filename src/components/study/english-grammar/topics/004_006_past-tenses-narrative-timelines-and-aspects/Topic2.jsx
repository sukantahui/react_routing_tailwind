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
  History,
  GitCommit,
  ShieldAlert,
  Sliders,
  CheckCircle
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

export default function Topic2() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedSequenceIdx, setSelectedSequenceIdx] = useState(0);

  // 2-Action Sequence Scenarios
  const sequences = [
    {
      context: "Railway Departure",
      earlierAction: "Train departs (07:00 PM)",
      laterAction: "Passengers reach platform (07:15 PM)",
      resultSentence: "The train HAD DEPARTED before the passengers REACHED the platform.",
      analysis: "Departure occurred 15 minutes before arrival, demanding Past Perfect for departure.",
      analysisBn: "ট্রেন আগে ছেড়ে গিয়েছিল (had departed), তাই সেখানে Past Perfect।"
    },
    {
      context: "Medical Emergency",
      earlierAction: "Patient passes away",
      laterAction: "Doctor arrives at clinic",
      resultSentence: "The patient HAD DIED before the doctor ARRIVED.",
      analysis: "Classic Wren & Martin illustration of the earlier past event.",
      analysisBn: "পূর্বে ঘটা কাজে Past Perfect (had died) এবং পরে ঘটা কাজে Simple Past (arrived)।"
    },
    {
      context: "Fire Incident",
      earlierAction: "Neighbors extinguish the flames",
      laterAction: "Fire engines arrive",
      resultSentence: "By the time the fire engines arrived, the neighbors HAD EXTINGUISHED the fire.",
      analysis: "Extinguishing preceded the arrival of fire engines.",
      analysisBn: "আগুন আগে নেভানো হয়েছিল (had extinguished)।"
    },
    {
      context: "Examination Submission",
      earlierAction: "Swadeep solves all problems",
      laterAction: "Invigilator rings final bell",
      resultSentence: "Swadeep HAD SOLVED all 25 problems before the bell RANG.",
      analysis: "Problem solving completed prior to the ringing bell milestone.",
      analysisBn: "ঘণ্টা বাজার আগেই সমাধান শেষ হয়েছিল (had solved)।"
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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950/60 via-slate-900 to-indigo-950/40 p-8 sm:p-12 border border-purple-600/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-purple-500/10 text-purple-300 border border-purple-500/30">
                <Clock className="w-3.5 h-3.5" />
                Topic 004_006_02 • Past Perfect Tense
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Past Perfect (Past of the Past)
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                The formula for Earlier Action (<span className="text-purple-400 font-semibold">had + V3</span>) vs Later Action (<span className="text-sky-400 font-semibold">V2</span>), unfulfilled wishes, and eliminating the fatal <span className="text-rose-400 font-semibold">single isolated past event error</span>.
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
              Past Perfect (had + V3) হলো 'Past of the Past'। অতীতের দুটি কাজের মধ্যে যেটি পূর্বে ঘটেছিল তাতে Past Perfect এবং যেটি পরে ঘটেছিল তাতে Simple Past (V2) বসে। কোনো একক অতীত কাজের জন্য কখনোই 'had + V3' হবে না।
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
              href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/3"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Topic 3: Before/After/By the Time</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/4"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-rose-300 border border-rose-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Topic 4: Negative Inversions</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: TWO-ACTION TIMELINE STUDIO                                  */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Sliders className="w-6 h-6 text-purple-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. The "Past of the Past" Chronology Studio</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Select a narrative context to see how earlier and later past actions sequence with grammatical precision.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {sequences.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSequenceIdx(idx)}
                className={`p-3 rounded-xl text-left border text-xs transition-all ${
                  selectedSequenceIdx === idx
                    ? "bg-purple-600 text-white border-purple-400 font-bold shadow-md shadow-purple-600/20"
                    : "bg-slate-950 text-slate-400 hover:bg-slate-800 border-slate-800"
                }`}
              >
                <div className="font-bold text-xs">{sc.context}</div>
              </button>
            ))}
          </div>

          {/* Active Sequence Card */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/40 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-purple-300">
                  1. Earlier Action (Happened 1st):
                </span>
                <p className="text-sm font-semibold text-white">{sequences[selectedSequenceIdx].earlierAction}</p>
                <span className="text-[11px] font-mono text-purple-400 font-bold">Formula: had + V3 (Past Perfect)</span>
              </div>

              <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-500/40 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-sky-300">
                  2. Later Action (Happened 2nd):
                </span>
                <p className="text-sm font-semibold text-white">{sequences[selectedSequenceIdx].laterAction}</p>
                <span className="text-[11px] font-mono text-sky-400 font-bold">Formula: V2 (Simple Past)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-center">
              <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold">Complete Syntactic Output:</span>
              <p className="text-base font-extrabold text-white font-mono">
                "{sequences[selectedSequenceIdx].resultSentence}"
              </p>
              <p className="text-xs text-slate-300 pt-1">
                {sequences[selectedSequenceIdx].analysis}
              </p>
              {showBengali && (
                <p className="text-xs text-amber-300/90 pt-1">
                  <strong>বাংলা:</strong> {sequences[selectedSequenceIdx].analysisBn}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: THE SINGLE ISOLATED EVENT TRAP                              */}
        {/* ========================================================================= */}
        <section className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex items-start gap-4 shadow-xl">
          <ShieldAlert className="w-7 h-7 text-rose-400 shrink-0 mt-1" />
          <div className="space-y-2">
            <h3 className="text-base font-bold text-rose-300 uppercase tracking-wider">
              The Fatal Isolated Past Event Trap
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Never use Past Perfect for a single, isolated past event without a second reference milestone:<br />
              ✗ <span className="text-rose-400 font-mono">"I had visited Barrackpore yesterday."</span> (Wrong!)<br />
              ✓ <strong className="text-emerald-400 font-mono">"I visited Barrackpore yesterday."</strong> (Correct Simple Past V2).
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SECTION 3: 25-QUESTION INTERACTIVE MASTERY QUIZ                        */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-purple-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Topic 004_006_02 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Test your mastery on Earlier vs Later action formulas, single past traps, and unfulfilled desires.
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
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all"
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
          <PlainTextPrint content={noteText} title="Module 004.006 Topic 2 Note - Past Perfect Tense" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            questions={[
              {
                question: "Can I use the Past Perfect when only one past action is described?",
                answer: "No. The Past Perfect (had + V3) requires two past actions or a past time reference point to show which event happened first. An isolated past action requires the Simple Past (e.g. 'I met him yesterday', NOT *'I had met him yesterday')."
              },
              {
                question: "What is the formula with 'before' vs 'after'?",
                answer: "With 'before': [Earlier: had + V3] + BEFORE + [Later: V2]. With 'after': [Later: V2] + AFTER + [Earlier: had + V3]."
              },
              {
                question: "What does 'I had hoped to see him' express?",
                answer: "It expresses an unfulfilled past hope, desire, or intention that was not realized."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/1"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 1 (Past Continuous)</span>
          </a>

          <a
            href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/3"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 3 (Before, After & By the Time)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
