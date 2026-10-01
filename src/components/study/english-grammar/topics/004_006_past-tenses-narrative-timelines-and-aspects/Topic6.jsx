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
  Repeat,
  Sparkle,
  Workflow
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

export default function Topic6() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedVerbType, setSelectedVerbType] = useState("dynamic");

  // Dynamic vs Stative Matrix Examples
  const verbComparisonData = {
    dynamic: [
      {
        verb: "Swim in the river",
        usedTo: "We used to swim in the Ganges every Sunday morning.",
        would: "During summer holidays, we would swim in the Ganges every Sunday morning.",
        validity: "BOTH VALID",
        explanation: "Dynamic physical actions in the past can take either 'used to' or 'would' (with an established past timeframe)."
      },
      {
        verb: "Cycle across Barrackpore",
        usedTo: "Swadeep used to cycle fifteen kilometres every evening.",
        would: "In his student days, Swadeep would cycle fifteen kilometres every evening.",
        validity: "BOTH VALID",
        explanation: "Repeated dynamic actions accept both modal forms seamlessly."
      },
      {
        verb: "Bake homemade cookies",
        usedTo: "Grandmother used to bake coconut cookies during Durga Puja.",
        would: "Every autumn, Grandmother would bake coconut cookies during Durga Puja.",
        validity: "BOTH VALID",
        explanation: "Nostalgic culinary rituals are dynamic actions perfectly expressed by 'would'."
      }
    ],
    stative: [
      {
        verb: "Live in Shyamnagar (Location)",
        usedTo: "Priyabrata used to live in Shyamnagar before moving to Kolkata.",
        would: "❌ Priyabrata would live in Shyamnagar... (INVALID)",
        validity: "'USED TO' ONLY",
        explanation: "'Live' is a verb of residence/state. 'Would' cannot be used with stative verbs."
      },
      {
        verb: "Be afraid of thunder (Emotion/State)",
        usedTo: "Ananya used to be afraid of severe thunderstorms.",
        would: "❌ Ananya would be afraid of thunderstorms... (INVALID)",
        validity: "'USED TO' ONLY",
        explanation: "Past mental or emotional states are invariant and strictly require 'used to be'."
      },
      {
        verb: "Have / Own a vintage car (Possession)",
        usedTo: "Sukanta Sir used to own an antique Ambassador car.",
        would: "❌ Sukanta Sir would own an antique car... (INVALID)",
        validity: "'USED TO' ONLY",
        explanation: "Possession is a continuous state, not a dynamic repeated action."
      },
      {
        verb: "There be / Exist (Past existence)",
        usedTo: "There used to be an ancient banyan tree outside our school.",
        would: "❌ There would be an ancient banyan tree... (INVALID)",
        validity: "'USED TO' ONLY",
        explanation: "Past existence or geographical presence never accepts 'would'."
      }
    ]
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
        {/* Header Section */}
        <header className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-800/40 shadow-2xl overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
                <Repeat className="w-3.5 h-3.5" />
                Module 004.006 • Topic 6 of 7
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
              Expressing Past Habits: <span className="text-indigo-400">Used to</span> vs <span className="text-emerald-400">Would</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Master the exact semantic boundaries between <code className="text-indigo-300 font-mono font-bold">used to</code> (habits + past states) and <code className="text-emerald-300 font-mono font-bold">would</code> (dynamic narrative habits ONLY), alongside the critical distinction between <code className="text-amber-300 font-mono">be used to</code> and <code className="text-amber-300 font-mono">get used to</code>.
            </p>

            {showBengali && (
              <div className="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-700/50 text-indigo-200 text-sm leading-relaxed animate-fade-in">
                <span className="font-bold text-amber-300">বাংলা ব্যাকরণগত নির্দেশিকা: </span>
                অতীতের কোনো অভ্যাস বা নিয়মিত কাজ বোঝাতে <strong>'Used to'</strong> এবং <strong>'Would'</strong> দুটিই ব্যবহৃত হয়। কিন্তু অতীতের কোনো অবস্থা, বাসস্থান, অস্তিত্ব বা মানসিক অনুভূতি (Stative Verbs) বোঝাতে <strong>শুধুমাত্র 'Used to'</strong> বসবে—সেখানে 'Would' ব্যবহার করা মারাত্মক ব্যাকরণগত ভুল।
              </div>
            )}
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 1. THREE TRIAD CONSTRUCTIONS COMPARED                                      */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl font-bold text-white">1. The Three Confusable 'Used To' Constructions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Box 1: Used to + V1 */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-indigo-800/40 hover:border-indigo-500/60 transition space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">Modal Semi-Auxiliary</span>
                <Clock className="w-4 h-4 text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Used to + Base Verb (V1)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Refers to past routines or states that are <strong className="text-rose-300">discontinued</strong> in the present.
              </p>
              <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-indigo-200 border border-slate-800">
                "I <strong>used to play</strong> badminton." (I don't play anymore.)
              </div>
              {showBengali && (
                <p className="text-[11px] text-amber-300/90">অতীতে করতাম কিন্তু এখন আর করি না।</p>
              )}
            </div>

            {/* Box 2: Be used to + V-ing */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-emerald-800/40 hover:border-emerald-500/60 transition space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">Adjective + Preposition</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Be used to + V-ing / Noun</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Means to be <strong className="text-emerald-300">accustomed to</strong> or comfortable with something now.
              </p>
              <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-emerald-200 border border-slate-800">
                "I <strong>am used to waking up</strong> early." (It is normal for me.)
              </div>
              {showBengali && (
                <p className="text-[11px] text-amber-300/90">বর্তমানে কোনো কিছুর সাথে সু-অভ্যস্ত থাকা।</p>
              )}
            </div>

            {/* Box 3: Get used to + V-ing */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-800/40 hover:border-amber-500/60 transition space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">Process of Adaptation</span>
                <Workflow className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Get used to + V-ing / Noun</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Expresses the <strong className="text-amber-300">gradual process</strong> of adapting to a new condition.
              </p>
              <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-amber-200 border border-slate-800">
                "She is <strong>getting used to living</strong> alone." (Adapting over time.)
              </div>
              {showBengali && (
                <p className="text-[11px] text-amber-300/90">নতুন পরিস্থিতির সাথে ক্রমান্বয়ে অভ্যস্ত হয়ে ওঠার প্রক্রিয়া।</p>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. DYNAMIC VS STATIVE INTERACTIVE WORKBENCH                                */}
        {/* ========================================================================= */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-indigo-900/60 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Sliders className="w-6 h-6 text-indigo-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                2. Interactive Stative vs Dynamic Habitual Matrix
              </h2>
            </div>
            <div className="flex gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button
                onClick={() => setSelectedVerbType("dynamic")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedVerbType === "dynamic"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Dynamic Verbs (Actions)
              </button>
              <button
                onClick={() => setSelectedVerbType("stative")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedVerbType === "stative"
                    ? "bg-rose-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Stative Verbs (States/Locations)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {verbComparisonData[selectedVerbType].map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3 animate-fade-in"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-mono font-bold text-indigo-300 px-2.5 py-1 rounded-md bg-indigo-950/60 border border-indigo-800/50">
                    Verb Context: {item.verb}
                  </span>
                  <span
                    className={`text-xs font-bold px-3 py-0.5 rounded-full ${
                      item.validity.includes("BOTH")
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-700"
                        : "bg-rose-950 text-rose-300 border border-rose-700"
                    }`}
                  >
                    {item.validity}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-indigo-400 font-mono text-[11px]">With 'USED TO':</span>
                    <p className="text-slate-200">"{item.usedTo}"</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-emerald-400 font-mono text-[11px]">With 'WOULD':</span>
                    <p className="text-slate-200">"{item.would}"</p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 italic pt-1 border-t border-slate-900">
                  <strong className="text-slate-300">Rule Analysis: </strong> {item.explanation}
                </p>
              </div>
            ))}
          </div>

          {/* Critical Negative/Interrogative Invariant Box */}
          <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-800/40 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <ShieldAlert className="w-5 h-5 flex-shrink-0" />
              <span>Crucial Spelling Rule: Negative & Interrogative Forms</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When the auxiliary verb <code className="text-amber-300 font-mono font-bold">did</code> is present, the letter 'd' is dropped from <code className="text-indigo-300">used to</code>, returning to the base form <code className="text-amber-300 font-mono font-bold">use to</code>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-800/60 text-rose-200">
                ❌ "We <strike>didn't used to</strike> drink green tea."
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-200">
                ✓ "We <strong>didn't use to</strong> drink green tea."
              </div>
              <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-800/60 text-rose-200">
                ❌ "<strike>Did you used to</strike> play chess?"
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-200">
                ✓ "<strong>Did you use to</strong> play chess?"
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
                3. Past Habits & Modal Distinctions Lab (25 Questions)
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
          <PlainTextPrint content={noteText} title="Module 004.006 Topic 6 Note - Used to vs Would" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            questions={[
              {
                question: "Can 'would' be used to express past states or feelings?",
                answer: "No. 'Would' is strictly restricted to dynamic, repeated physical actions (e.g. 'would walk', 'would swim'). Past states, beliefs, and emotions must use 'used to' (e.g. 'used to love', 'used to know', 'used to believe')."
              },
              {
                question: "Why does 'didn't use to' lose the letter 'd'?",
                answer: "Because 'did' is already the past tense auxiliary verb. English grammar rules require the main lexical verb following 'do/does/did' to remain in its base dictionary form (V1)."
              },
              {
                question: "What is the difference between 'I used to cycle' and 'I am used to cycling'?",
                answer: "'I used to cycle' refers to a past habit that has stopped. 'I am used to cycling' means cycling is familiar and customary to me in the present."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/5"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 5 (Past Perfect Continuous)</span>
          </a>

          <a
            href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/7"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 7 (Classroom Dialogue & Capstone Lab)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
