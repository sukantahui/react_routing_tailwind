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
  Sliders,
  ShieldAlert,
  Flame,
  CheckCircle,
  Activity,
  Workflow,
  Timer
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

export default function Topic5() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedDurationIdx, setSelectedDurationIdx] = useState(0);

  // Dynamic interactive scenarios
  const durationScenarios = [
    {
      title: "The Exhausted Cyclist",
      subject: "Priyabrata",
      action: "cycling against severe headwinds across Barrackpore",
      duration: "for four straight hours",
      interruptEvent: "he finally reached his coach's academy",
      sentence: "Priyabrata had been cycling against severe headwinds for four straight hours before he finally reached his coach's academy.",
      pastEvidence: "His legs were trembling and his jersey was soaked with sweat.",
      tenseDiff: "Past Continuous ('was cycling') would only show ongoing action at that moment; Past Perfect Continuous ('had been cycling') highlights the prolonged 4-hour accumulation causing extreme physical exhaustion."
    },
    {
      title: "The Waterlogged Courtyard",
      subject: "The Monsoon Cloudburst",
      action: "pouring torrentially",
      duration: "since daybreak",
      interruptEvent: "the municipality deployed the emergency suction pumps at 2 PM",
      sentence: "It had been pouring torrentially since daybreak before the municipality deployed emergency suction pumps at 2 PM.",
      pastEvidence: "The courtyard ground was completely submerged and knee-deep in murky water.",
      tenseDiff: "Past Perfect ('had poured') would emphasize completion; Past Perfect Continuous emphasizes the unbroken relentless process up to 2 PM."
    },
    {
      title: "The Scholarly Thesis",
      subject: "Sneha",
      action: "analyzing archival Sanskrit manuscripts",
      duration: "for over three years",
      interruptEvent: "she published her breakthrough dissertation",
      sentence: "Sneha had been analyzing archival Sanskrit manuscripts for over three years when she published her breakthrough dissertation.",
      pastEvidence: "Her desk was piled high with centuries-old catalog notes and reference folios.",
      tenseDiff: "Emphasizes the sustained multi-year cognitive effort leading directly to the milestone publication."
    },
    {
      title: "The Malfunctioning Engine",
      subject: "The Steam Boiler",
      action: "emitting abnormal whining noises and vibrating",
      duration: "for twenty minutes",
      interruptEvent: "the safety pressure relief valve burst open",
      sentence: "The boiler had been vibrating violently for twenty minutes before the safety pressure relief valve burst open.",
      pastEvidence: "The gauge room was filled with thick scalding vapor.",
      tenseDiff: "Highlights the preceding build-up period responsible for the catastrophic valve release."
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
        {/* Header Section */}
        <header className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-800/40 shadow-2xl overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
                <Timer className="w-3.5 h-3.5" />
                Module 004.006 • Topic 5 of 7
              </div>
              <button
                onClick={() => setShowBengali(!showBengali)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold border border-indigo-500/30 transition-all shadow-md"
              >
                <Languages className="w-4 h-4 text-indigo-400" />
                <span>{showBengali ? "English Only" : "বাংলা অর্থসহ দেখুন (Bilingual)"}</span>
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Past Perfect Continuous Tense
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Master the formula <code className="text-indigo-300 font-mono font-bold">Subject + had been + V-ing</code> to express continuous, sustained actions that occurred over an extended duration before another specific past point or event, producing visible past evidence or exhaustion.
            </p>

            {showBengali && (
              <div className="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-700/50 text-indigo-200 text-sm leading-relaxed animate-fade-in">
                <span className="font-bold text-amber-300">বাংলা ব্যাকরণগত ব্যাখ্যা: </span>
                অতীতকালে কোনো একটি নির্দিষ্ট কাজের আগে বা অতীত মুহূর্তের পূর্বে অপর একটি কাজ বেশ কিছু সময় ধরে একটানা চলছিল (Duration / Continuity) বোঝালে <strong>Past Perfect Continuous Tense</strong> ব্যবহৃত হয়। এর গঠন হলো: <code className="bg-indigo-900/80 px-2 py-0.5 rounded text-amber-300 font-mono">Subject + had been + Main Verb-এর ing রূপ</code>।
              </div>
            )}
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 1. CORE ARCHITECTURE & THE THREE USAGE PILLARS                             */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl font-bold text-white">1. Structural Formula & Usage Pillars</h2>
          </div>

          {/* Formula Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Affirmative (+)</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="font-mono text-sm text-indigo-200 font-semibold mb-2">
                Sub + had been + V1-ing + (for/since + time)
              </p>
              <p className="text-xs text-slate-400 italic">
                "They <strong className="text-emerald-300">had been debating</strong> for two hours before reaching consensus."
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Negative (-)</span>
                <ShieldAlert className="w-4 h-4 text-rose-400" />
              </div>
              <p className="font-mono text-sm text-indigo-200 font-semibold mb-2">
                Sub + had not (hadn't) been + V1-ing
              </p>
              <p className="text-xs text-slate-400 italic">
                "Subhendu <strong className="text-rose-300">had not been sleeping</strong> well for days before the exam."
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Interrogative (?)</span>
                <HelpCircle className="w-4 h-4 text-amber-400" />
              </div>
              <p className="font-mono text-sm text-indigo-200 font-semibold mb-2">
                Had + Sub + been + V1-ing...?
              </p>
              <p className="text-xs text-slate-400 italic">
                "<strong className="text-amber-300">Had she been waiting</strong> long when the train finally arrived?"
              </p>
            </div>
          </div>

          {/* Three Core Cognitive Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <Clock className="w-5 h-5" />
                <span>Pillar A: Duration Before a Definite Past Cutoff</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Highlights how long an activity had progressed before a secondary past milestone (V2 event) occurred. Time markers like <code className="text-indigo-300">for 5 years</code>, <code className="text-indigo-300">since morning</code>, and <code className="text-indigo-300">all afternoon</code> are common.
              </p>
              {showBengali && (
                <p className="text-xs text-indigo-200 pt-2 border-t border-slate-800">
                  অতীতের কোনো ঘটনার পূর্ব পর্যন্ত কাজটি কতক্ষণ যাবত চলছিল (Duration) তা স্পষ্ট নির্দেশ করা হয়।
                </p>
              )}
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <Flame className="w-5 h-5" />
                <span>Pillar B: Past Action with Visible Past Evidence/Consequence</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Used to explain past emotional, mental, or physical states: <em>"Ananya's eyes were red because she had been crying"</em> or <em>"The ground was wet because it had been raining."</em>
              </p>
              {showBengali && (
                <p className="text-xs text-indigo-200 pt-2 border-t border-slate-800">
                  অতীতের কোনো শারীরিক ক্লান্তি, ভিজে থাকা বা পরিণতির প্রত্যক্ষ কারণ (Visible Cause & Effect) প্রকাশ করতে ব্যবহৃত হয়।
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. INTERACTIVE TIMELINE & DURATION LABORATORY                              */}
        {/* ========================================================================= */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-indigo-900/60 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-indigo-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                2. Interactive Duration & Cause-Effect Laboratory
              </h2>
            </div>
            <span className="text-xs font-mono text-indigo-400 px-3 py-1 rounded-lg bg-indigo-950 border border-indigo-800/40">
              Interactive Timeline Simulator
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300">
            Select a real-world scenario to explore how duration (<code className="text-indigo-300">had been V-ing</code>) connects to a sudden past interrupt (<code className="text-emerald-300">V2</code>) and visible past evidence:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {durationScenarios.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDurationIdx(idx)}
                className={`p-3.5 rounded-xl text-left text-xs font-medium transition-all ${
                  selectedDurationIdx === idx
                    ? "bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-900/50 border border-indigo-400"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Timer className="w-3.5 h-3.5" />
                  <span className="font-semibold">{sc.title}</span>
                </div>
                <div className="text-[11px] opacity-80 truncate">{sc.duration}</div>
              </button>
            ))}
          </div>

          {/* Detailed Scenario Simulator Display */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-900/50 space-y-5 animate-fade-in">
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Grammatically Complete Narrative Sentence:
              </div>
              <p className="text-base sm:text-lg font-mono text-white leading-relaxed bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/40">
                "{durationScenarios[selectedDurationIdx].sentence}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-bold text-indigo-300">1. Ongoing Prior Action (Had Been V-ing)</span>
                <p className="text-slate-300">{durationScenarios[selectedDurationIdx].action}</p>
                <span className="text-[11px] text-amber-300 font-mono">Duration: {durationScenarios[selectedDurationIdx].duration}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400">2. Past Point / Interrupt (V2 Simple Past)</span>
                <p className="text-slate-300">{durationScenarios[selectedDurationIdx].interruptEvent}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-bold text-amber-400">3. Visible Past Result / Physical Evidence</span>
                <p className="text-slate-300">{durationScenarios[selectedDurationIdx].pastEvidence}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/30 text-xs text-indigo-200">
              <strong className="text-indigo-300">Why Not Simple Past Continuous? </strong>
              {durationScenarios[selectedDurationIdx].tenseDiff}
            </div>
          </div>

          {/* Stative Verb Critical Alert */}
          <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-800/40 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <ShieldAlert className="w-5 h-5 flex-shrink-0" />
              <span>Crucial Exam Invariant: Non-Continuous (Stative) Verbs</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Verbs of cognition, emotion, perception, and possession (<em>know, believe, understand, belong, own, want, like</em>) do <strong>NOT</strong> accept the continuous aspect. When expressing prior duration with stative verbs, automatically downgrade to <strong>Past Perfect Simple (had + V3)</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-800/60 text-rose-200">
                ❌ INCORRECT: "We <strike>had been knowing</strike> the professor for ten years before he retired."
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-200">
                ✓ CORRECT: "We <strong>had known</strong> the professor for ten years before he retired."
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. 25 INTERACTIVE PRACTICE MCQS                                            */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-bold text-white">
                3. Past Perfect Continuous Mastery Lab (25 Questions)
              </h2>
            </div>
            {submitted && (
              <div className="flex items-center gap-3 px-4 py-1.5 rounded-xl bg-indigo-950 border border-indigo-700/60 text-indigo-300 font-mono text-sm font-bold animate-fade-in">
                <span>
                  Score: {calculateScore()} / {questions.length} (
                  {Math.round((calculateScore() / questions.length) * 100)}%)
                </span>
                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white ml-2 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {questions.map((q, qIndex) => {
              const selectedOpt = userAnswers[q.id];
              const isCorrect = selectedOpt === q.correctAnswer;
              const hasAnswered = selectedOpt !== undefined;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    submitted
                      ? isCorrect
                        ? "bg-emerald-950/20 border-emerald-800/50"
                        : "bg-rose-950/20 border-rose-800/50"
                      : "bg-slate-900/90 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-800 text-indigo-400 text-xs font-mono font-bold">
                        {qIndex + 1}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        {q.id.toUpperCase()}
                      </span>
                    </div>
                    {submitted && (
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          isCorrect
                            ? "bg-emerald-900/60 text-emerald-300 border border-emerald-700"
                            : "bg-rose-900/60 text-rose-300 border border-rose-700"
                        }`}
                      >
                        {isCorrect ? "Correct ✓" : "Incorrect ✗"}
                      </span>
                    )}
                  </div>

                  <p className="text-slate-100 font-medium text-sm sm:text-base mb-4 leading-relaxed">
                    {q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle = "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800";

                      if (submitted) {
                        if (optIdx === q.correctAnswer) {
                          btnStyle = "bg-emerald-900/40 border-emerald-600 text-emerald-200 font-semibold";
                        } else if (selectedOpt === optIdx) {
                          btnStyle = "bg-rose-900/40 border-rose-600 text-rose-200";
                        } else {
                          btnStyle = "bg-slate-950/30 border-slate-800/40 text-slate-500 opacity-60";
                        }
                      } else if (selectedOpt === optIdx) {
                        btnStyle = "bg-indigo-600/30 border-indigo-500 text-indigo-200 font-semibold";
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          disabled={submitted}
                          className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {submitted && optIdx === q.correctAnswer && (
                            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div className="mt-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs space-y-1.5 animate-fade-in">
                      <div className="text-indigo-300 font-medium">
                        <strong className="text-white">Explanation: </strong> {q.explanation}
                      </div>
                      {showBengali && q.explanationBn && (
                        <div className="text-amber-300/90 pt-1 border-t border-slate-800/60 font-sans">
                          <strong>ব্যাখ্যা: </strong> {q.explanationBn}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!submitted ? (
            <div className="flex justify-center pt-4">
              <button
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(userAnswers).length === 0}
                className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-sm shadow-xl shadow-indigo-950 transition"
              >
                Submit Answers ({Object.keys(userAnswers).length} / {questions.length} answered)
              </button>
            </div>
          ) : (
            <div className="flex justify-center pt-4">
              <button
                onClick={resetQuiz}
                className="px-8 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Try Quiz Again
              </button>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 4. PRINT & AUXILIARY STUDY TOOLS                                          */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <PlainTextPrint content={noteText} title="Module 004.006 Topic 5 Note - Past Perfect Continuous Tense" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            questions={[
              {
                question: "What is the primary difference between Past Continuous and Past Perfect Continuous?",
                answer: "Past Continuous ('was sleeping') simply shows an action in progress at a specific past moment. Past Perfect Continuous ('had been sleeping') highlights the continuous duration or build-up of time ('for nine hours') leading up to a specific past milestone or causing a visible past physical state."
              },
              {
                question: "Why can't we say 'He had been owning that heritage villa for twenty years'?",
                answer: "'Own' is a stative verb expressing permanent possession. Stative verbs do not admit continuous/progressive aspects in English. Instead, the Past Perfect Simple must be used: 'He had owned that heritage villa for twenty years.'"
              },
              {
                question: "Can 'since' and 'for' both be used in Past Perfect Continuous?",
                answer: "Yes. 'For' is used with durations (e.g., 'for three hours', 'for five months'), while 'since' is used with starting points in time (e.g., 'since dawn', 'since 2018', 'since he arrived')."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/4"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 4 (High-Frequency Inversions)</span>
          </a>

          <a
            href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/6"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 6 (Used to vs Would)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
