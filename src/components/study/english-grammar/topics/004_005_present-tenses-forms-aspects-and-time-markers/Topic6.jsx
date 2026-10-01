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
  Calendar,
  Hourglass,
  Sliders,
  Flame,
  CheckCircle,
  XCircle
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

export default function Topic6() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedDrillCategory, setSelectedDrillCategory] = useState("all");

  // Since vs For Sorter Drill Data
  const drills = [
    { phrase: "2018", type: "since", label: "Point: Exact Calendar Year" },
    { phrase: "six years", type: "for", label: "Period: Elapsed Duration" },
    { phrase: "Monday morning", type: "since", label: "Point: Day & Time origin" },
    { phrase: "three hours", type: "for", label: "Period: Measured Hours" },
    { phrase: "childhood", type: "since", label: "Point: Life Milestone" },
    { phrase: "a decade", type: "for", label: "Period: 10-Year Span" },
    { phrase: "07:30 AM", type: "since", label: "Point: Clock Time" },
    { phrase: "two weeks", type: "for", label: "Period: Fortnight Duration" },
    { phrase: "she graduated", type: "since", label: "Point: Past Event Clause" },
    { phrase: "a very long time", type: "for", label: "Period: Indefinite Span" }
  ];

  const filteredDrills = selectedDrillCategory === "all"
    ? drills
    : drills.filter((d) => d.type === selectedDrillCategory);

  // Stative Fallback Examples
  const stativeFallbacks = [
    {
      verb: "KNOW (Cognition)",
      wrong: "✗ I have been knowing him for five years.",
      correct: "✓ I have known him for five years.",
      note: "Stative cognition verb cannot take -ing. Use Present Perfect with 'for'."
    },
    {
      verb: "HAVE (Possession)",
      wrong: "✗ We have been having this bungalow since 1990.",
      correct: "✓ We have had this bungalow since 1990.",
      note: "Ownership is a state. Converts to have + had (V3)."
    },
    {
      verb: "EXIST (State of Being)",
      wrong: "✗ This temple has been existing for 200 years.",
      correct: "✓ This temple has existed for 200 years.",
      note: "Static existence converts to Present Perfect."
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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-950/60 via-slate-900 to-indigo-950/40 p-8 sm:p-12 border border-sky-600/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-sky-500/10 text-sky-300 border border-sky-500/30">
                <Clock className="w-3.5 h-3.5" />
                Topic 004_005_06 • Present Perfect Continuous
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Present Perfect Continuous & Time Axis
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Ongoing duration from the past, the invariant <span className="text-sky-400 font-semibold">Since (Point) vs For (Period)</span> axis, physical evidence of recent actions, and the mandatory <span className="text-amber-300 font-semibold">Stative Verb fallback rule</span>.
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
              অতীতে শুরু হয়ে বর্তমান পর্যন্ত একটানা চলা কাজ বোঝাতে Present Perfect Continuous (have/has been + V-ing) ব্যবহৃত হয়। নির্দিষ্ট শুরুর সময় বোঝাতে 'Since' (হতে/থেকে) এবং মোট সময়কাল বোঝাতে 'For' (ধরে/যাবৎ) বসে। Stative Verb থাকলে Continuous না হয়ে সরাসরি Present Perfect (have/has + V3) হবে।
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
              href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/2"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Stative Verbs (No -ing)</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/006_001_prepositions-of-time-place-direction-and-agency/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Prepositions of Time</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Past Perfect Continuous</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: THE SINCE VS FOR TIME AXIS SORTER                           */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-sky-400" />
              <div>
                <h2 className="text-xl font-bold text-white">1. The 'Since' (Point) vs 'For' (Period) Precision Axis</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Since = Origin / Starting Milestone | For = Elapsed Duration / Span
                </p>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
              {[
                { key: "all", label: "All Items" },
                { key: "since", label: "SINCE (Point)" },
                { key: "for", label: "FOR (Period)" }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedDrillCategory(tab.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                    selectedDrillCategory === tab.key
                      ? "bg-sky-600 text-white border-sky-400 shadow-md"
                      : "bg-slate-950 text-slate-400 hover:bg-slate-800 border-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {filteredDrills.map((drill, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 flex flex-col justify-between hover:border-sky-500/40 transition-all"
              >
                <div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                    drill.type === "since" ? "bg-sky-500/20 text-sky-300 border border-sky-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}>
                    {drill.type.toUpperCase()}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1.5">"{drill.phrase}"</h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">{drill.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: STATIVE VERB DURATION FALLBACK STUDIO                       */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Sliders className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">2. The Stative Verb Duration Fallback Rule</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                When a stative verb expresses duration with since/for, it CANNOT take -ing. It falls back to Present Perfect.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stativeFallbacks.map((fb, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300">
                    {fb.verb}
                  </span>
                  <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/30 text-xs font-mono text-rose-300">
                    {fb.wrong}
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs font-mono text-emerald-300 font-bold">
                    {fb.correct}
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-900">
                  {fb.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SECTION 3: 25-QUESTION INTERACTIVE MASTERY QUIZ                        */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-sky-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Topic 004_005_06 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive test on Present Perfect Continuous, Since vs For sorting, stative fallbacks, and physical evidence.
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
                    <span className="text-xs font-bold text-sky-400 font-mono">Q{qIndex + 1}.</span>
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
                        btnStyle = "bg-sky-500/20 border-sky-500 text-sky-200 font-semibold";
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
                        <strong className="text-sky-400">Explanation:</strong> {q.explanation}
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
                className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-600/30 transition-all"
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
          <PlainTextPrint content={noteText} title="Module 004.005 Topic 6 Note - Present Perfect Continuous & Since vs For" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            faqList={[
              {
                question: "How do I decide between 'since' and 'for'?",
                answer: "Ask: Is the time expression a specific starting origin/point on the clock or calendar (e.g. 2018, Monday, 8:00 AM, childhood)? If yes, use 'since'. Is it a calculated quantity of elapsed time/duration (e.g. five years, three hours, two decades)? If yes, use 'for'."
              },
              {
                question: "Why is 'I have been knowing him for 5 years' wrong?",
                answer: "'Know' is a stative verb of cognition that cannot take the progressive (-ing) form. When duration is involved, stative verbs fall back to the Present Perfect: 'I have known him for 5 years'."
              },
              {
                question: "Can Present Perfect Continuous describe an action that has just stopped?",
                answer: "Yes! If an ongoing action recently ceased but left vivid, observable physical evidence in the present moment (e.g. 'Why are your clothes covered in mud? - I have been playing football'), Present Perfect Continuous is the standard choice."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/5"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 5 ('Gone To' vs 'Been To')</span>
          </a>

          <a
            href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/7"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 7 (Finished Past Time Anchor Prohibition)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
