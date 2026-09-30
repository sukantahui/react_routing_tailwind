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
  Sliders,
  Split,
  GitBranch,
  ShieldCheck
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeCondType, setActiveCondType] = useState("type3");

  // Conditionals Data
  const conditionalTypes = {
    type0: {
      name: "Zero Conditional (Scientific Truths)",
      formula: "If + Simple Present ..., Simple Present",
      example: "If you heat ice to 0°C, it melts.",
      explanationBn: "চিরন্তন বৈজ্ঞানিক সত্য: উভয় অংশে Simple Present ('heats ... melts')।"
    },
    type1: {
      name: "First Conditional (Real Future Possibility)",
      formula: "If + Simple Present ..., will / can / may + Base Verb",
      example: "If it rains tomorrow, the cricket tournament will be postponed.",
      explanationBn: "বাস্তব ভবিষ্যৎ সম্ভাবনা: 'If it rains' (will rain নয়) + 'will be postponed'।"
    },
    type2: {
      name: "Second Conditional (Hypothetical / Unreal Present)",
      formula: "If + Simple Past / Were ..., would / could + Base Verb",
      example: "If I were a bird, I would fly across the oceans.",
      explanationBn: "অবাস্তব কল্পনা: 'If I were' (was নয়) + 'would fly'।"
    },
    type3: {
      name: "Third Conditional (Past Unreal Condition & Result)",
      formula: "If + had + V3 ..., would have + V3",
      example: "If I had known the truth, I would have warned you immediately.",
      explanationBn: "অতীতের অপূর্ণ কাজ: 'If I had known' + 'would have warned'।"
    },
    mixed: {
      name: "Mixed Conditional (Past Action -> Present Result)",
      formula: "If + had + V3 (Past) ..., would + Base Verb (Present)",
      example: "If I had taken that flight yesterday, I would be in London today.",
      explanationBn: "অতীতের সিদ্ধান্তের বর্তমান ফল: 'If I had taken... I would be in London now'।"
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

  const currentCond = conditionalTypes[activeCondType];

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
                <Sparkles className="w-3.5 h-3.5" />
                Module 005.005 • Voice & Mood
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Subjunctive Mood & Conditional Sentences
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the <span className="text-purple-400 font-semibold">Mandative Subjunctive</span> (demand that he <em>resign</em>), the counterfactual <span className="text-sky-400 font-semibold">Were-Subjunctive</span>, and the complete spectrum of <span className="text-emerald-400 font-semibold">Conditionals 0 to 3 & Mixed types</span>.
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
              Subjunctive Mood কোনো বাস্তব ঘটনা নয়, বরং ইচ্ছা, সুপারিশ, আদেশ বা অবাস্তব কল্পনা প্রকাশ করে। আদেশসূচক Mandative Subjunctive-এ ৩য় পুরুষেও Verb-এর সাথে '-s' বসে না (যেমন: 'recommend that he <strong>go</strong>'); আর অবাস্তব শর্তে সর্বদা 'If I <strong>were</strong>' ব্যবহৃত হয়।
            </div>
          )}
        </header>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: INTERACTIVE 5-TIER CONDITIONALS STUDIO                      */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <GitBranch className="w-6 h-6 text-purple-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. The 5-Tier Conditionals Architecture</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Select a conditional tier to inspect clauses, formulas, and time markers.
              </p>
            </div>
          </div>

          {/* Conditional Type Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(conditionalTypes).map((key) => (
              <button
                key={key}
                onClick={() => setActiveCondType(key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCondType === key
                    ? "bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/20"
                    : "bg-slate-800/70 text-slate-300 hover:bg-slate-800 border border-slate-700"
                }`}
              >
                {conditionalTypes[key].name.split(" (")[0]}
              </button>
            ))}
          </div>

          {/* Active Conditional Card */}
          <div className="p-6 rounded-xl bg-slate-950 border border-purple-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-purple-300">
                {currentCond.name}
              </h3>
              <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                Condition Paradigm
              </span>
            </div>

            {/* Formula Banner */}
            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-purple-300">
              Formula: {currentCond.formula}
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Canonical Example:</span>
              <p className="text-sm sm:text-base font-bold text-white">"{currentCond.example}"</p>
            </div>

            {showBengali && (
              <p className="text-xs text-amber-200/90 pt-1 border-t border-slate-800 animate-fade-in">
                <strong>বাংলা তাৎপর্য:</strong> {currentCond.explanationBn}
              </p>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: MANDATIVE & WERE-SUBJUNCTIVE BENCHMARK                      */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">2. Mandative Subjunctive & The Were-Rule</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                The most sophisticated verbal mood in formal, legal, and academic English.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mandative Card */}
            <div className="p-5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Mandative Subjunctive (Bare Base Form)
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                After verbs like <em>demand, insist, recommend, propose, suggest</em>:
              </p>
              <div className="space-y-1 text-xs">
                <div className="p-2 rounded bg-rose-950/30 border border-rose-500/30 text-rose-300">
                  ✗ <em>"He demanded that Rahul resigns."</em> (Resigns is Wrong!)
                </div>
                <div className="p-2 rounded bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
                  ✓ <strong>"He demanded that Rahul RESIGN."</strong> (Base verb with no '-s')
                </div>
              </div>
            </div>

            {/* Were-Subjunctive Card */}
            <div className="p-5 rounded-xl bg-slate-950 border border-sky-500/30 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                The Were-Subjunctive (Irrealis 'Were')
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                For counterfactual unreality and wishes contrary to fact:
              </p>
              <div className="space-y-1 text-xs">
                <div className="p-2 rounded bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
                  ✓ <strong>"If I WERE you, I would accept."</strong> (Use 'were' for all persons)
                </div>
                <div className="p-2 rounded bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
                  ✓ <strong>"He talks as if he WERE the boss."</strong> (Counterfactual state)
                </div>
              </div>
            </div>
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
                <h2 className="text-xl font-bold text-white">3. Module 005.005 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive test on mandative subjunctives, were-subjunctive, conditionals 0-3, and inverted conditionals.
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
          <PlainTextPrint content={noteText} title="Module 005.005 Study Note - Subjunctive Mood & Conditionals" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            faqList={[
              {
                question: "Why do we say 'I demand that he resign' instead of 'resigns'?",
                answer: "Verbs and adjectives of urgency and recommendation trigger the Mandative Subjunctive, which strictly requires the bare base root verb without third-person singular '-s'."
              },
              {
                question: "What is the formula for the Third Conditional?",
                answer: "The Third Conditional formula is: 'If + Past Perfect (had + V3) ..., Subject + would/could/might have + V3'."
              },
              {
                question: "Why do we say 'If I were you' instead of 'If I was you'?",
                answer: "'Were' in this context is the Past Subjunctive (Irrealis 'were'), used across all persons (I, he, she, it) in formal standard English to denote counterfactual, imaginary conditions."
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
