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
  Wrench,
  ShieldAlert,
  ArrowLeftRight,
  Eye
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeDiagnosticWord, setActiveDiagnosticWord] = useState(0);
  const [danglingRepairMode, setDanglingRepairMode] = useState("method1");

  // Diagnostic Test Data
  const diagnosticExamples = [
    {
      sentence: "Swimming is an exceptional full-body aerobic workout.",
      word: "Swimming",
      role: "Gerund (Verbal Noun)",
      test: "Replace with 'IT': 'IT is an exceptional workout.' (Perfect sense!)",
      explanationBn: "'Swimming'-কে 'IT' বা Noun দিয়ে প্রতিস্থাপন করা যায়, তাই এটি Gerund।"
    },
    {
      sentence: "We watched the swimming ducks glide across the tranquil lake.",
      word: "Swimming",
      role: "Present Participle (Verbal Adjective)",
      test: "Qualifies Noun 'ducks': 'ducks that were swimming'. (Adjectival action!)",
      explanationBn: "'Swimming' Noun 'ducks'-এর চলমান অবস্থা নির্দেশ করায় এটি Present Participle।"
    },
    {
      sentence: "Barking dogs seldom bite dangerous intruders.",
      word: "Barking",
      role: "Present Participle (Verbal Adjective)",
      test: "Modifies Noun 'dogs': 'dogs that bark'. (Adjectival modifier!)",
      explanationBn: "'Barking' Noun 'dogs'-কে বিশেষিত করায় এটি Present Participle।"
    },
    {
      sentence: "Her favorite leisure activity is reading classical Bengali literature.",
      word: "Reading",
      role: "Gerund (Subject Complement)",
      test: "Replace with 'IT': 'Her activity is IT.' (Verbal Noun naming the hobby!)",
      explanationBn: "'Reading' শখের নাম নির্দেশ করায় Subject Complement হিসেবে Gerund।"
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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-amber-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <Wrench className="w-3.5 h-3.5" />
                Module 005.004 • Non-Finite Domain
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Gerunds, Participles & Dangling Modifiers
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the distinction between <span className="text-amber-300 font-semibold">Gerunds (Verbal Nouns)</span> and <span className="text-sky-400 font-semibold">Participles (Verbal Adjectives)</span>, the possessive case rule (<span className="text-emerald-400 font-semibold">his coming</span>), and the repair of comical <span className="text-rose-400 font-semibold">Dangling Modifiers</span>.
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
              '-ing' যুক্ত শব্দ যদি Noun-এর কাজ করে (যেমন: 'Swimming is good'), তবে তা <strong>Gerund</strong>; আর যদি Adjective বা চলমান ক্রিয়ার কাজ করে (যেমন: 'a swimming duck'), তবে তা <strong>Present Participle</strong>। কোনো বাক্যের শুরুতে Participle যুক্ত থাকলে তার কর্তা অবশ্যই মূল বাক্যের Subject-এর সাথে মিলতে হবে, নইলে <strong>Dangling Modifier</strong> ত্রুটি ঘটবে।
            </div>
          )}
        </header>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: GERUND VS PARTICIPLE DIAGNOSTIC LAB                         */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <ArrowLeftRight className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. The "Replace with IT" Diagnostic Workbench</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Click any sentence to test whether the '-ing' word functions as a Gerund (Noun) or Participle (Adjective).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {diagnosticExamples.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDiagnosticWord(idx)}
                className={`text-left p-5 rounded-xl border transition-all space-y-2 ${
                  activeDiagnosticWord === idx
                    ? "bg-slate-950 border-amber-500/60 shadow-lg shadow-amber-500/10"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">"{item.sentence}"</span>
                  <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold ${
                    item.role.includes("Gerund") ? "bg-amber-500/20 text-amber-300" : "bg-sky-500/20 text-sky-300"
                  }`}>
                    {item.role.split(" (")[0]}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  {item.test}
                </p>
                {showBengali && (
                  <p className="text-[11px] text-amber-200/90 pt-1">
                    <strong>বাংলা:</strong> {item.explanationBn}
                  </p>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: DANGLING MODIFIER REPAIR HOSPITAL                           */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <ShieldAlert className="w-6 h-6 text-rose-400" />
            <div>
              <h2 className="text-xl font-bold text-white">2. Dangling Modifier Diagnostic & Repair Lab</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                When a participial modifier fails to attach to the correct subject, it creates comical and ungrammatical chaos.
              </p>
            </div>
          </div>

          {/* Faulty Sentence Alert */}
          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-2">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Faulty Dangling Sentence (Exam Trap):
            </span>
            <p className="text-base sm:text-lg font-bold text-rose-200">
              ✗ "Walking in the garden, a snake bit Swadeep."
            </p>
            <p className="text-xs text-rose-300/80">
              Grammatical absurdity: The participial phrase 'Walking in the garden' grammatically attaches to 'a snake', falsely implying that the snake was leisurely taking a stroll in the garden!
            </p>
          </div>

          {/* Repair Mode Toggles */}
          <div className="inline-flex rounded-lg bg-slate-800 p-1 border border-slate-700">
            <button
              onClick={() => setDanglingRepairMode("method1")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                danglingRepairMode === "method1"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Method 1: Adverbial Clause Conversion
            </button>
            <button
              onClick={() => setDanglingRepairMode("method2")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                danglingRepairMode === "method2"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Method 2: Passive Subject Alignment
            </button>
          </div>

          {/* Repaired Output Box */}
          <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              ✓ Repaired Flawless Sentence:
            </span>
            <p className="text-base sm:text-xl font-bold text-white">
              {danglingRepairMode === "method1" ? (
                <>
                  "<strong>While Swadeep was walking</strong> in the garden, a snake bit him."
                </>
              ) : (
                <>
                  "Walking in the garden, <strong>Swadeep was bitten</strong> by a snake."
                </>
              )}
            </p>
            {showBengali && (
              <p className="text-xs text-amber-200/90 pt-1 border-t border-slate-800 animate-fade-in">
                <strong>বাংলা সংস্কার:</strong> প্রথম পদ্ধতিতে 'While he was walking' Clause-এ রূপান্তর করা হয়েছে; দ্বিতীয় পদ্ধতিতে মূল বাক্যের Subject হিসেবে 'Swadeep'-কে এনে Passive করা হয়েছে।
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
                <h2 className="text-xl font-bold text-white">3. Module 005.004 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive test on gerunds, participles, possessive case before gerunds, dangling modifiers, and nominative absolutes.
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
          <PlainTextPrint content={noteText} title="Module 005.004 Study Note - Gerunds, Participles & Dangling Modifiers" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            faqList={[
              {
                question: "Why must a possessive pronoun precede a gerund?",
                answer: "Because a gerund is a verbal noun, any word modifying it behaves as a possessive determiner (e.g. 'I appreciate your helping me', not 'you helping me')."
              },
              {
                question: "How do you distinguish a Gerund from a Present Participle?",
                answer: "A Gerund functions as a noun and can be replaced by a noun or the pronoun 'IT' (e.g. 'Swimming is healthy' -> 'It is healthy'). A Present Participle functions as an adjective or continuous verb describing an action (e.g. 'a swimming bird')."
              },
              {
                question: "What is a dangling participle?",
                answer: "A dangling participle occurs when a participial phrase at the start of a sentence fails to logically and grammatically modify the subject of the following main clause (e.g. 'Walking in the garden, a snake bit him')."
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
