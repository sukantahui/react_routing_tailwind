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
  Gauge,
  Sliders,
  ShieldAlert,
  Brain,
  Award,
  Scale
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [certaintyLevel, setCertaintyLevel] = useState("100");
  const [activePastModalKey, setActivePastModalKey] = useState("should_have");

  // Certainty Spectrum Data
  const certaintyData = {
    "100": {
      modal: "MUST BE",
      percentage: "100% Positive Deduction",
      sentence: "The lights are on and his car is outside. He MUST BE at home.",
      explanation: "Conclusive logical deduction based on undeniable evidence.",
      explanationBn: "প্রমাণের ভিত্তিতে শতভাগ নিশ্চিত অনুমান প্রকাশে 'MUST' ব্যবহৃত হয়।"
    },
    "50": {
      modal: "MAY BE",
      percentage: "50% Realistic Possibility",
      sentence: "Take an umbrella with you; it MAY rain later this evening.",
      explanation: "Realistic, standard possibility.",
      explanationBn: "৫০% সাধারণ সম্ভাবনা প্রকাশে 'MAY' ব্যবহৃত হয়।"
    },
    "30": {
      modal: "MIGHT BE",
      percentage: "30% Tentative / Remote Possibility",
      sentence: "If he studies relentlessly, he MIGHT secure a rank.",
      explanation: "Weaker, more remote or hesitant possibility.",
      explanationBn: "ক্ষীণ বা দূরবর্তী সম্ভাবনা প্রকাশে 'MIGHT' ব্যবহৃত হয়।"
    },
    "0": {
      modal: "CAN'T BE",
      percentage: "0% Logical Impossibility",
      sentence: "He only left the room five minutes ago; he CAN'T BE in Delhi!",
      explanation: "Complete logical impossibility based on facts.",
      explanationBn: "যৌক্তিক সম্পূর্ণ অসম্ভবতা প্রকাশে 'CAN'T BE' বসে ('must not' কেবল নিষেধ বোঝায়)।"
    }
  };

  // Past Modals Data
  const pastModalsData = {
    should_have: {
      name: "Should have + V3",
      meaning: "Unfulfilled past moral obligation / Regret & criticism",
      example: "You SHOULD HAVE TOLD the truth when asked.",
      meaningBn: "অতীতে করা উচিত ছিল কিন্তু করা হয়নি (আক্ষেপ/কর্তব্যচ্যুতি)।"
    },
    must_have: {
      name: "Must have + V3",
      meaning: "Logical positive past deduction from evidence",
      example: "The streets are flooded; it MUST HAVE RAINED heavily last night.",
      meaningBn: "বর্তমানের প্রমাণের ভিত্তিতে অতীতের নিশ্চিত অনুমান।"
    },
    could_have: {
      name: "Could have + V3",
      meaning: "Unutilized past opportunity/capability (had ability, didn't do it)",
      example: "You COULD HAVE HELPED him when he was in distress.",
      meaningBn: "অতীতে সামর্থ্য বা সুযোগ থাকা সত্ত্বেও সাহায্য করা হয়নি।"
    },
    neednt_have: {
      name: "Needn't have + V3 vs Didn't need to",
      meaning: "Needn't have = Action WAS done unnecessarily | Didn't need to = Action was NOT done",
      example: "I NEEDN'T HAVE BOUGHT the book (I bought it, but it was already in the library).",
      meaningBn: "'Needn't have done' = অপ্রয়োজনে করা হয়েছিল; 'Didn't need to do' = অপ্রয়োজনীয় জেনে করাই হয়নি।"
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

  const currentCertainty = certaintyData[certaintyLevel];
  const currentPastModal = pastModalsData[activePastModalKey];

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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-amber-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <Gauge className="w-3.5 h-3.5" />
                Module 005.002 • Voice & Modals
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Modal Auxiliaries & Degrees of Modality
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the 4 invariants of modals, the certainty spectrum (<span className="text-emerald-400 font-semibold">Must 100%</span> to <span className="text-rose-400 font-semibold">Can't 0%</span>), past modal regrets (<span className="text-amber-300 font-semibold">Should have</span>), and semi-modals (<span className="text-sky-400 font-semibold">Dare & Need</span>).
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
              Modal Verbs হলো বিশেষ সহায়ক ক্রিয়া যা সামর্থ্য, সম্ভাবনা, অনুমতি, বাধ্যবাধকতা ও যৌক্তিক অনুমান প্রকাশ করে। এদের কোনো ৩য় পুরুষীয় '-s' হয় না এবং এদের পর 'to' ছাড়া Bare Infinitive বসে (যেমন: 'He can swim', 'must go')।
            </div>
          )}
        </header>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: INTERACTIVE CERTAINTY SPECTRUM GAUGE                        */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Gauge className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. The Epistemic Certainty Spectrum</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Slide or click between deduction levels to observe the exact modal nuance.
              </p>
            </div>
          </div>

          {/* Level Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { val: "100", label: "Must (100%)", color: "emerald" },
              { val: "50", label: "May (50%)", color: "sky" },
              { val: "30", label: "Might (30%)", color: "purple" },
              { val: "0", label: "Can't (0%)", color: "rose" }
            ].map((lvl) => (
              <button
                key={lvl.val}
                onClick={() => setCertaintyLevel(lvl.val)}
                className={`p-3 rounded-xl text-xs font-bold transition-all border text-center ${
                  certaintyLevel === lvl.val
                    ? "bg-amber-600 text-slate-950 border-amber-400 shadow-md font-extrabold"
                    : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>

          {/* Active Level Card */}
          <div className="p-6 rounded-xl bg-slate-950 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-extrabold text-amber-400 font-mono">
                {currentCertainty.modal}
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                {currentCertainty.percentage}
              </span>
            </div>

            <p className="text-sm font-semibold text-white">
              "{currentCertainty.sentence}"
            </p>
            <p className="text-xs text-slate-400">
              {currentCertainty.explanation}
            </p>

            {showBengali && (
              <p className="text-xs text-amber-200/90 pt-1 border-t border-slate-800 animate-fade-in">
                <strong>বাংলা:</strong> {currentCertainty.explanationBn}
              </p>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: PAST MODALS & UNREALIZED ACTIONS LAB                        */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Sliders className="w-6 h-6 text-sky-400" />
            <div>
              <h2 className="text-xl font-bold text-white">2. Past Modals: Regrets, Deductions & Unused Ability</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Explore 'Should have', 'Must have', 'Could have', and the famous 'Needn't have vs Didn't need to' distinction.
              </p>
            </div>
          </div>

          {/* Sub-item Selector */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(pastModalsData).map((key) => (
              <button
                key={key}
                onClick={() => setActivePastModalKey(key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activePastModalKey === key
                    ? "bg-sky-600 text-white font-bold shadow-lg shadow-sky-600/20"
                    : "bg-slate-800/70 text-slate-300 hover:bg-slate-800 border border-slate-700"
                }`}
              >
                {pastModalsData[key].name}
              </button>
            ))}
          </div>

          {/* Active Past Modal Card */}
          <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/30 space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-sky-300">
              {currentPastModal.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Meaning: {currentPastModal.meaning}
            </p>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Illustrative Example:</span>
              <p className="text-sm font-semibold text-white mt-0.5">
                "{currentPastModal.example}"
              </p>
            </div>

            {showBengali && (
              <p className="text-xs text-amber-200/90 pt-1 border-t border-slate-800 animate-fade-in">
                <strong>বাংলা তাৎপর্য:</strong> {currentPastModal.meaningBn}
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
                <h2 className="text-xl font-bold text-white">3. Module 005.002 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive test on modal nuances, past deductions, regrets, and semi-modals (Dare, Need, Used to).
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
                    <span className="text-xs font-bold text-amber-400 font-mono">Q{qIndex + 1}.</span>
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
                        btnStyle = "bg-amber-500/20 border-amber-500 text-amber-200 font-semibold";
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
                        <strong className="text-amber-400">Explanation:</strong> {q.explanation}
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
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-600/30 transition-all"
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
          <PlainTextPrint content={noteText} title="Module 005.002 Study Note - Modal Auxiliaries & Semi-Modals" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            faqList={[
              {
                question: "What is the negative deduction corresponding to 'He must be at home'?",
                answer: "The negative deduction is 'He can't be at home' (it is logically impossible). 'Must not' expresses prohibition (it is forbidden), not negative logical deduction."
              },
              {
                question: "What is the difference between 'needn't have done' and 'didn't need to do'?",
                answer: "'Needn't have done' means an action was completed, but in hindsight was discovered to be unnecessary. 'Didn't need to do' means the action was never performed because it was already known to be unnecessary."
              },
              {
                question: "Why can't we say 'He can be able to do this'?",
                answer: "'Can' and 'be able to' both denote capability. Combining them creates a redundant double-modal error. Use either 'He can do this' or 'He is able to do this'."
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
