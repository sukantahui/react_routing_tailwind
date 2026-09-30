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
  Clock,
  Calendar,
  Compass,
  ArrowRightCircle,
  Activity,
  CheckCircle
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeAspect, setActiveAspect] = useState("simple");
  const [testSinceForIdx, setTestSinceForIdx] = useState(0);

  // 4 Present Aspects Data
  const aspectData = {
    simple: {
      name: "Simple Present",
      formula: "Subject + Base Verb (V1) / 3rd Sing (V5)",
      concept: "Habits, universal truths, planned timetables, and subordinate time/condition clauses.",
      example: "Water boils at 100°C. / If it rains, we will stay indoors.",
      exampleBn: "চিরন্তন সত্য ও অভ্যাস: 'Water boils at 100°C'।"
    },
    continuous: {
      name: "Present Continuous",
      formula: "Subject + am / is / are + V-ing",
      concept: "Actions happening at the moment of speaking, temporary situations, or annoyance with 'always'.",
      example: "She is writing an essay right now. / He is always losing his keys!",
      exampleBn: "বর্তমান মুহূর্তে চলমান ক্রিয়া: 'She is writing right now'।"
    },
    perfect: {
      name: "Present Perfect",
      formula: "Subject + have / has + V3 (Past Participle)",
      concept: "Completed actions with direct present consequence, life experiences, and unfinished periods.",
      example: "I have lived here for 10 years. / She has just finished her research.",
      exampleBn: "অতীতের কাজ যার ফল বর্তমান: 'I have lost my key (আমার কাছে এখন চাবি নেই)'।"
    },
    perfect_cont: {
      name: "Present Perfect Continuous",
      formula: "Subject + have / has + been + V-ing",
      concept: "Actions begun in the past and continuing up to the present, or recently stopped with physical evidence.",
      example: "It has been raining since morning. / Why are you sweating? -> I have been running.",
      exampleBn: "অতীত থেকে বর্তমান পর্যন্ত একটানা চলা কাজ: 'has been raining since morning'।"
    }
  };

  // Since vs For Interactive Test Data
  const sinceForDrills = [
    { phrase: "2015", correct: "since", type: "Point of Time (Year)" },
    { phrase: "five years", correct: "for", type: "Period of Time (Duration)" },
    { phrase: "Monday morning", correct: "since", type: "Point of Time (Day & Time)" },
    { phrase: "three hours", correct: "for", type: "Period of Time (Duration)" },
    { phrase: "childhood", correct: "since", type: "Point of Time (Life Stage)" },
    { phrase: "a decade", correct: "for", type: "Period of Time (Duration)" },
    { phrase: "8:30 AM", correct: "since", type: "Point of Time (Clock Time)" }
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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-sky-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-sky-500/10 text-sky-300 border border-sky-500/30">
                <Clock className="w-3.5 h-3.5" />
                Module 004.003 • Dynamic Core
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                The Present Tense System & Aspect
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the 4 present aspects, the <span className="text-sky-400 font-semibold">Since vs For</span> axis of time, the fatal <span className="text-rose-400 font-semibold">Yesterday + Present Perfect trap</span>, and the distinction between <span className="text-amber-300 font-semibold">has gone</span> and <span className="text-emerald-400 font-semibold">has been</span>.
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
              Present Tense কেবল বর্তমান সময় নির্দেশ করে না, এর ৪টি Aspect (Simple, Continuous, Perfect, Perfect Continuous) ক্রিয়ার সম্পন্নতা ও ধারাবাহিকতার সঠিক রূপ প্রকাশ করে। বিশেষ করে ‘Since’ (নির্দিষ্ট সূচনা সময়) ও ‘For’ (সময়ের ব্যাপ্তি)-এর প্রয়োগে সতর্কতা জরুরি।
            </div>
          )}
        </header>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: 4-ASPECT PRESENT TIMELINE STUDIO                            */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Activity className="w-6 h-6 text-sky-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. Present Tense Aspectual Matrix</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Inspect the formulas, syntactic functions, and timeline dynamics across all 4 present aspects.
              </p>
            </div>
          </div>

          {/* Aspect Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.keys(aspectData).map((key) => (
              <button
                key={key}
                onClick={() => setActiveAspect(key)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  activeAspect === key
                    ? "bg-sky-600 text-white border-sky-400 shadow-lg shadow-sky-600/20"
                    : "bg-slate-950 text-slate-300 hover:bg-slate-800 border-slate-800"
                }`}
              >
                {aspectData[key].name}
              </button>
            ))}
          </div>

          {/* Active Aspect Card */}
          <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                {aspectData[activeAspect].name}
              </h3>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-sky-300">
                {aspectData[activeAspect].formula}
              </span>
            </div>

            <p className="text-sm text-slate-300">
              {aspectData[activeAspect].concept}
            </p>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Example:</span>
              <p className="text-sm font-semibold text-white">
                "{aspectData[activeAspect].example}"
              </p>
              {showBengali && (
                <p className="text-xs text-amber-200/90 pt-1">
                  <strong>বাংলা:</strong> {aspectData[activeAspect].exampleBn}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: SINCE VS FOR INTERACTIVE PRECISION SORTER                   */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Calendar className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">2. The 'Since' vs 'For' Axis Sorter</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Since = Specific Point in Time | For = Measured Duration / Period
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {sinceForDrills.map((drill, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                    drill.correct === "since" ? "bg-sky-500/20 text-sky-300" : "bg-amber-500/20 text-amber-300"
                  }`}>
                    {drill.correct.toUpperCase()}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">"{drill.phrase}"</h4>
                </div>
                <p className="text-[11px] text-slate-400">{drill.type}</p>
              </div>
            ))}
          </div>

          {/* Fatal Error Warning Card */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-rose-300 uppercase tracking-wider">Crucial Exam Invariant: Finished Past Time Anchor</span>
              <p className="text-slate-300">
                Never use Present Perfect with past time adverbs (yesterday, ago, in 2010):<br />
                ✗ <em>"I have seen him yesterday."</em> (Wrong) &nbsp;|&nbsp; ✓ <strong>"I saw him yesterday."</strong> (Correct)
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
                <h2 className="text-xl font-bold text-white">3. Module 004.003 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive test on present aspectual choices, since vs for, past time anchors, and stative verb perfects.
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
          <PlainTextPrint content={noteText} title="Module 004.005 Study Note - Present Tense System & Aspect" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            faqList={[
              {
                question: "Why is 'I have seen him yesterday' grammatically wrong?",
                answer: "The Present Perfect tense cannot be paired with a finished past time marker (like 'yesterday', 'two days ago', or 'in 2018'). Specific past time points require the Simple Past tense: 'I saw him yesterday'."
              },
              {
                question: "What is the difference between 'since' and 'for'?",
                answer: "'Since' denotes a specific starting point in time (e.g. since 2015, since Monday, since 8 AM). 'For' denotes a measured duration or length of time (e.g. for five years, for three hours)."
              },
              {
                question: "What is the difference between 'He has gone to Delhi' and 'He has been to Delhi'?",
                answer: "'He has gone to Delhi' means he is currently in Delhi or traveling there (he has not returned). 'He has been to Delhi' means he visited Delhi in the past and has now returned."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/004_004_subject-verb-agreement-the-twenty-five-rules-of-concord/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Previous: Module 004_004 (25 Rules of Concord)</span>
          </a>

          <a
            href="/english-grammar/topic/004_006_past-and-future-tenses-narrative-timelines/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Module 004_006 (Past & Future Tenses)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
