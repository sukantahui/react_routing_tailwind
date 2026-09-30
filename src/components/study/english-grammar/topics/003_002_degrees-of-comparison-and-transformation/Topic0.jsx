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
  Scale,
  Sliders,
  TrendingUp,
  Award,
  Equal
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeTransformationType, setActiveTransformationType] = useState("type1");
  const [activeDegreeTab, setActiveDegreeTab] = useState("superlative");

  // Transformation Data
  const transformationData = {
    type1: {
      title: "Type 1: Universal / Absolute Superlative (The Best / The Highest)",
      subject: "Shakespeare",
      positive: "No other dramatist in English is as great as Shakespeare.",
      comparative: "Shakespeare is greater than any other dramatist in English.",
      superlative: "Shakespeare is the greatest dramatist in English.",
      positiveBn: "ইংরেজি সাহিত্যের অন্য কোনো নাট্যকার শেক্সপিয়ারের মতো এত মহান নন।",
      comparativeBn: "শেক্সপিয়ার ইংরেজি সাহিত্যের অন্য যেকোনো নাট্যকারের চেয়ে অধিক মহান।",
      superlativeBn: "শেক্সপিয়ার ইংরেজি সাহিত্যের সর্বশ্রেষ্ঠ নাট্যকার।",
      ruleTag: "Formula: 'No other... as' <-> 'than any other' <-> 'the + superlative'"
    },
    type2: {
      title: "Type 2: Group / 'One of the...' Superlative (Among the top tier)",
      subject: "Kolkata",
      positive: "Very few cities in India are as large as Kolkata.",
      comparative: "Kolkata is larger than most other cities in India.",
      superlative: "Kolkata is one of the largest cities in India.",
      positiveBn: "ভারতের খুব কম শহরই কলকাতার মতো এত বড়।",
      comparativeBn: "কলকাতা ভারতের অধিকাংশ শহরের চেয়ে বড়।",
      superlativeBn: "কলকাতা ভারতের অন্যতম বৃহত্তম শহর।",
      ruleTag: "Formula: 'Very few... as' <-> 'than most other' <-> 'one of the + superlative'"
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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-emerald-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                <TrendingUp className="w-3.5 h-3.5" />
                Module 003.002 • Modifying Sphere
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Degrees of Comparison & Syntactic Transformation
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the 3 degrees of comparison, irregular sets, Latin comparatives (<span className="text-emerald-400 font-semibold">senior to</span>), non-gradable absolutes, illogical comparison fixes (<span className="text-cyan-400 font-semibold">that of</span>), and seamless sentence transformations.
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
              Degrees of Comparison মূলত Adjective-এর তারতম্য নির্দেশ করে: সাধারণ অবস্থা (Positive), দুজনের তুলনা (Comparative), এবং বহু জনের মধ্যে শ্রেষ্ঠত্ব (Superlative)। বোর্ড ও প্রতিযোগিতামূলক পরীক্ষায় অর্থ অপরিবর্তিত রেখে এই তিনটির মধ্যে রূপান্তর (Transformation) একটি অত্যন্ত গুরুত্বপূর্ণ বিষয়।
            </div>
          )}
        </header>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: INTERACTIVE DEGREE TRANSFORMATION STUDIO                    */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Scale className="w-6 h-6 text-emerald-400" />
              <div>
                <h2 className="text-xl font-bold text-white">1. Interactive Transformation Studio</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Switch between Universal and Group-tier superlatives to inspect the exact grammatical formulas.
                </p>
              </div>
            </div>

            {/* Type Selector */}
            <div className="inline-flex rounded-lg bg-slate-800 p-1 border border-slate-700">
              <button
                onClick={() => setActiveTransformationType("type1")}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  activeTransformationType === "type1"
                    ? "bg-emerald-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Type 1: Universal Best
              </button>
              <button
                onClick={() => setActiveTransformationType("type2")}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  activeTransformationType === "type2"
                    ? "bg-emerald-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Type 2: 'One of the...'
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {transformationData[activeTransformationType].title}
              </span>
              <span className="text-[11px] font-mono px-3 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {transformationData[activeTransformationType].ruleTag}
              </span>
            </div>

            {/* 3 Tier Transformation Visualizer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Positive */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  Positive Degree
                </span>
                <p className="text-sm font-semibold text-white">
                  "{transformationData[activeTransformationType].positive}"
                </p>
                {showBengali && (
                  <p className="text-xs text-amber-200/90 pt-1 border-t border-slate-800/80">
                    {transformationData[activeTransformationType].positiveBn}
                  </p>
                )}
              </div>

              {/* Comparative */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Comparative Degree
                </span>
                <p className="text-sm font-semibold text-white">
                  "{transformationData[activeTransformationType].comparative}"
                </p>
                {showBengali && (
                  <p className="text-xs text-amber-200/90 pt-1 border-t border-slate-800/80">
                    {transformationData[activeTransformationType].comparativeBn}
                  </p>
                )}
              </div>

              {/* Superlative */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                  Superlative Degree
                </span>
                <p className="text-sm font-semibold text-white">
                  "{transformationData[activeTransformationType].superlative}"
                </p>
                {showBengali && (
                  <p className="text-xs text-amber-200/90 pt-1 border-t border-slate-800/80">
                    {transformationData[activeTransformationType].superlativeBn}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: LATIN COMPARATIVES & ILLOGICAL COMPARISONS                  */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Equal className="w-6 h-6 text-indigo-400" />
            <div>
              <h2 className="text-xl font-bold text-white">2. High-Frequency Traps: Latin Comparatives & Illogical Pairs</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Crucial grammar invariants strictly tested in competitive examinations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Latin Comparatives */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Latin Comparatives (+ TO)
              </span>
              <h4 className="text-sm font-bold text-white">Senior, Junior, Preferable</h4>
              <p className="text-xs text-slate-300">
                ✗ <em>"He is senior than me."</em><br />
                ✓ <strong>"He is senior TO me."</strong><br />
                ✓ <strong>"Milk is preferable TO tea."</strong> (No 'more', no 'than')
              </p>
            </div>

            {/* Illogical Comparisons */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Illogical Comparison
              </span>
              <h4 className="text-sm font-bold text-white">That of / Those of</h4>
              <p className="text-xs text-slate-300">
                ✗ <em>"The climate of Chennai is hotter than Kolkata."</em><br />
                ✓ <strong>"The climate of Chennai is hotter than THAT OF Kolkata."</strong>
              </p>
            </div>

            {/* Absolute Adjectives */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Non-Gradable Absolutes
              </span>
              <h4 className="text-sm font-bold text-white">Unique, Perfect, Dead</h4>
              <p className="text-xs text-slate-300">
                ✗ <em>"This is the most unique idea."</em><br />
                ✓ <strong>"This is a unique idea."</strong><br />
                (Cannot logically take 'more' or 'most')
              </p>
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
                <h2 className="text-xl font-bold text-white">3. Module 003.002 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive test on positive, comparative, and superlative degree transformations, Latin comparatives, and absolute adjectives.
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
                    <span className="text-xs font-bold text-emerald-400 font-mono">Q{qIndex + 1}.</span>
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
                        btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold";
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
                        <strong className="text-emerald-400">Explanation:</strong> {q.explanation}
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
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all"
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
          <PlainTextPrint content={noteText} title="Module 003.002 Study Note - Degrees of Comparison" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            faqList={[
              {
                question: "Why is 'senior than me' incorrect?",
                answer: "Adjectives borrowed directly from Latin with comparative endings in '-ior' (senior, junior, superior, inferior, prior) require the preposition 'to' instead of 'than'."
              },
              {
                question: "How do you transform 'Iron is the most useful metal' into Positive degree?",
                answer: "The positive transformation is: 'No other metal is as useful as iron.' (Formula: No other + singular noun + as/so ... as)."
              },
              {
                question: "What is an illogical comparison?",
                answer: "An illogical comparison occurs when comparing two entities of different categories, such as 'The climate of Chennai is hotter than Kolkata'. It must be corrected to 'hotter than that of Kolkata' to compare climate to climate."
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
