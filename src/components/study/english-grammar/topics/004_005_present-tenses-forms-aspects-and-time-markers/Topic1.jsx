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
  Calendar,
  Compass,
  Repeat,
  Globe,
  Radio,
  Sliders,
  CheckCircle
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

export default function Topic1() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeCategory, setActiveCategory] = useState("habits");

  // Conjugation Builder State
  const [selectedSubject, setSelectedSubject] = useState("He");
  const [selectedVerb, setSelectedVerb] = useState("study");
  const [isNegative, setIsNegative] = useState(false);
  const [isQuestion, setIsQuestion] = useState(false);

  // 5 Pillars of Simple Present
  const pillars = {
    habits: {
      title: "1. Habitual Routines & Frequency",
      badge: "Routine / Habit",
      badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
      formula: "Subject + Base Verb (V1 / V5) + Frequency Adverb",
      desc: "Actions repeated on a regular cadence, general customs, or personal character traits.",
      markers: "always, usually, often, seldom, rarely, every day, twice a week",
      example: "Tuhina practices transcription drills every single morning.",
      exampleBn: "তুহিনা প্রতিদিন সকালে নিয়ম করে প্র্যাকটিস করে।"
    },
    facts: {
      title: "2. Universal Scientific Laws & Timeless Facts",
      badge: "Universal Law",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      formula: "Subject (Singular/Plural) + V1/V5 (Timeless Present)",
      desc: "Invariable physical constants, astronomical truths, and permanent geographical realities.",
      markers: "at 100°C, around the sun, from east to west, speed of light",
      example: "Water boils at 100°C and freezes at 0°C under 1 atm pressure.",
      exampleBn: "জল ১০০ ডিগ্রি সেলসিয়াসে ফোটে — এটি চিরন্তন বৈজ্ঞানিক সত্য।"
    },
    timetables: {
      title: "3. Scheduled Official Timetables (Future)",
      badge: "Fixed Schedule",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      formula: "Subject + V1/V5 + Future Time Marker (Official / Fixed)",
      desc: "Events fixed in advance by a public calendar, railway timetable, airline schedule, or board exam schedule.",
      markers: "tomorrow at 6 AM, next Monday, on July 15th",
      example: "The Rajdhani Express departs from Sealdah at 04:50 PM tomorrow.",
      exampleBn: "ট্রেনটি কাল বিকেলে ছাড়বে — নির্দিষ্ট সরকারি সময়সূচি বোঝাতে Simple Present।"
    },
    commentary: {
      title: "4. Live Dramatic Commentary & Quotes",
      badge: "Real-Time / Exclamatory",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      formula: "Commentary: S + V1/V5 | Inversion: Here / There + V1/V5 + Subject!",
      desc: "Instant live sport play-by-play, literary analysis ('Keats writes...'), and dramatic exclamations.",
      markers: "Here comes..., There goes..., Keats says...",
      example: "Here comes the champion runner into the final stretch!",
      exampleBn: "ঐ যে প্রধান অতিথি আসছেন! (Here comes the chief guest!)"
    },
    clauses: {
      title: "5. Conditional & Time Subordinate Clauses",
      badge: "Strict Invariant",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      formula: "If / When / As soon as / Unless + S + V1/V5 (No 'will' permitted!)",
      desc: "In subordinate time and conditional clauses, 'will' is prohibited. Simple Present must be used even for future events.",
      markers: "if, when, as soon as, unless, until, before, after",
      example: "If it rains tomorrow, we will conduct the Barrackpore seminar online.",
      exampleBn: "যদি কাল বৃষ্টি হয়, আমরা ক্লাস অনলাইনে করব (কখনোই If it will rain নয়)।"
    }
  };

  // Helper for interactive conjugation
  const getConjugation = () => {
    const is3rdSingular = ["He", "She", "It", "Swadeep"].includes(selectedSubject);
    let conjugated = selectedVerb;

    if (selectedVerb === "study") conjugated = is3rdSingular ? "studies" : "study";
    if (selectedVerb === "teach") conjugated = is3rdSingular ? "teaches" : "teach";
    if (selectedVerb === "play") conjugated = is3rdSingular ? "plays" : "play";
    if (selectedVerb === "fix") conjugated = is3rdSingular ? "fixes" : "fix";
    if (selectedVerb === "go") conjugated = is3rdSingular ? "goes" : "go";

    if (isQuestion) {
      const aux = is3rdSingular ? "Does" : "Do";
      return `${aux} ${selectedSubject.toLowerCase()} ${selectedVerb} grammar diligently?`;
    }

    if (isNegative) {
      const aux = is3rdSingular ? "does not" : "do not";
      return `${selectedSubject} ${aux} ${selectedVerb} without deep analysis.`;
    }

    return `${selectedSubject} ${conjugated} grammar principles with complete focus.`;
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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-sky-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-sky-500/10 text-sky-300 border border-sky-500/30">
                <Clock className="w-3.5 h-3.5" />
                Topic 004_005_01 • Simple Present Tense
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Simple Present Tense Mastery
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Habitual routines, timeless scientific laws, scheduled timetables, dramatic live commentary, and the absolute <span className="text-rose-400 font-semibold">'No Will in Time Clauses'</span> rule.
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
              Simple Present Tense কেবল অভ্যাস বা চিরন্তন সত্য নয়; পূর্বনির্ধারিত সরকারি সময়সূচি (Timetable), খেলার ধারাভাষ্য এবং 'If / When' যুক্ত শর্তমূলক ক্লজেও অপরিহার্যভাবে ব্যবহৃত হয়।
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
              href="/english-grammar/topic/004_004_subject-verb-agreement-the-twenty-five-rules-of-concord/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-300 border border-sky-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>3rd Sing Subject Concord (-s/-es)</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/2"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Stative vs Dynamic Verbs</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/007_002_clause-analysis-noun-adjective-and-adverb-clauses/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Subordinate Time Clauses</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: THE 5 PILLARS OF SIMPLE PRESENT                            */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Layers className="w-6 h-6 text-sky-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. The 5 Core Functional Pillars of Simple Present</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Explore each semantic use-case with formulas, frequency markers, and contextual examples.
              </p>
            </div>
          </div>

          {/* Pillar Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {Object.keys(pillars).map((key) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all border text-center ${
                  activeCategory === key
                    ? "bg-sky-600 text-white border-sky-400 shadow-lg shadow-sky-600/20"
                    : "bg-slate-950 text-slate-300 hover:bg-slate-800 border-slate-800"
                }`}
              >
                {pillars[key].title.split(". ")[1]}
              </button>
            ))}
          </div>

          {/* Active Pillar Card */}
          <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/30 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-white">
                {pillars[activeCategory].title}
              </h3>
              <span className={`text-xs font-mono px-3 py-1 rounded-full border ${pillars[activeCategory].badgeColor}`}>
                {pillars[activeCategory].badge}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {pillars[activeCategory].desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Formula:</span>
                <p className="text-xs font-mono text-sky-300">{pillars[activeCategory].formula}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Common Markers:</span>
                <p className="text-xs font-mono text-amber-300">{pillars[activeCategory].markers}</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Authentic Example:</span>
              <p className="text-sm font-semibold text-white">
                "{pillars[activeCategory].example}"
              </p>
              {showBengali && (
                <p className="text-xs text-amber-200/90 pt-1">
                  <strong>বাংলা:</strong> {pillars[activeCategory].exampleBn}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: INTERACTIVE CONJUGATION & SYNTAX STUDIO                     */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Sliders className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">2. Interactive Simple Present Conjugation Lab</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Observe the 3rd person singular -s/-es shifts, auxiliary 'do/does' insertion, and interrogative inversions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Subject Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">1. Select Subject:</label>
              <div className="grid grid-cols-2 gap-2">
                {["I", "We", "You", "They", "He", "She", "Swadeep"].map((subj) => (
                  <button
                    key={subj}
                    onClick={() => setSelectedSubject(subj)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${
                      selectedSubject === subj
                        ? "bg-indigo-600 text-white border-indigo-400 shadow-md"
                        : "bg-slate-950 text-slate-300 hover:bg-slate-800 border-slate-800"
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>

            {/* Verb Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">2. Select Base Verb:</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "study", rule: "Consonant+y -> -ies" },
                  { name: "teach", rule: "Ending in -ch -> -es" },
                  { name: "play", rule: "Vowel+y -> -s" },
                  { name: "fix", rule: "Ending in -x -> -es" },
                  { name: "go", rule: "Ending in -o -> -es" }
                ].map((v) => (
                  <button
                    key={v.name}
                    onClick={() => setSelectedVerb(v.name)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold border text-left transition-all ${
                      selectedVerb === v.name
                        ? "bg-amber-600 text-white border-amber-400 shadow-md"
                        : "bg-slate-950 text-slate-300 hover:bg-slate-800 border-slate-800"
                    }`}
                  >
                    <div>{v.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{v.rule}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Toggle Options */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">3. Sentence Polarity & Mode:</label>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setIsNegative(!isNegative);
                    if (!isNegative) setIsQuestion(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-lg text-xs font-bold border transition-all flex items-center justify-between ${
                    isNegative
                      ? "bg-rose-600 text-white border-rose-400"
                      : "bg-slate-950 text-slate-300 hover:bg-slate-800 border-slate-800"
                  }`}
                >
                  <span>Negative (do/does not + V1)</span>
                  <span>{isNegative ? "ON" : "OFF"}</span>
                </button>

                <button
                  onClick={() => {
                    setIsQuestion(!isQuestion);
                    if (!isQuestion) setIsNegative(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-lg text-xs font-bold border transition-all flex items-center justify-between ${
                    isQuestion
                      ? "bg-purple-600 text-white border-purple-400"
                      : "bg-slate-950 text-slate-300 hover:bg-slate-800 border-slate-800"
                  }`}
                >
                  <span>Interrogative (Do/Does + S + V1?)</span>
                  <span>{isQuestion ? "ON" : "OFF"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Generated Sentence Result */}
          <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
              Syntactically Generated Output:
            </span>
            <p className="text-lg font-extrabold text-white font-mono">
              "{getConjugation()}"
            </p>
            <p className="text-xs text-slate-400">
              Notice: Whenever auxiliary <span className="text-amber-300 font-mono">do/does</span> is used in negatives or questions, the main verb reverts to base form (V1).
            </p>
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
                <h2 className="text-xl font-bold text-white">3. Topic 004_005_01 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Test your mastery on habits, scientific laws, timetables, live commentary, spelling rules, and conditional clauses.
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
                className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-sky-600/30 transition-all"
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
          <PlainTextPrint content={noteText} title="Module 004.005 Topic 1 Note - Simple Present Tense" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            faqList={[
              {
                question: "Why can't we use 'will' in 'If it will rain tomorrow'?",
                answer: "English grammar enforces a strict rule: Subordinate clauses of time and condition (introduced by if, when, unless, as soon as, until, etc.) must use the Simple Present tense even when referring to future events. The modal auxiliary 'will' is reserved exclusively for the main clause."
              },
              {
                question: "When does a future event take Simple Present instead of 'will' or 'is going to'?",
                answer: "When the future event is part of a fixed, official timetable or public itinerary (e.g. train schedules, flight departures, board exam timetables, or academic term dates), the Simple Present is the standard formal choice."
              },
              {
                question: "What is the spelling rule for 3rd person singular verbs ending in 'y'?",
                answer: "If the verb ends in Consonant + y (e.g. study, fly, carry), change 'y' to 'i' and add -es (studies, flies, carries). If the verb ends in Vowel + y (e.g. play, enjoy, buy), simply add -s (plays, enjoys, buys)."
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
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 0 (Aspect Matrix)</span>
          </a>

          <a
            href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/2"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 2 (Stative vs Dynamic Verbs)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
