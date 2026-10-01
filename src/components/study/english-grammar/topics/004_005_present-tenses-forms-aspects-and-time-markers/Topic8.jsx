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
  MessageSquare,
  Award,
  Sliders,
  CheckCircle,
  XCircle,
  Workflow,
  GraduationCap
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

export default function Topic8() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // Classroom Dialogue Data
  const dialogueSessions = [
    {
      student: "Abhronila",
      question: "Sir, in Bengali we often say 'আমি তাকে চিনছি' (I am knowing him). Why is this fatal in standard English?",
      response: "Because 'know' is a stative verb of mental cognition. Knowing someone is an enduring state of memory, not an active physical event with a start and stop point. Stative verbs strictly resist progressive (-ing) forms in standard English. You must say: 'I know him well.'",
      bnTip: "'Know' একটি Stative Verb, তাই 'I am knowing' নয়, 'I know' লিখতে হবে।"
    },
    {
      student: "Swadeep",
      question: "Sir, what if I lost my keys yesterday but still don't have them? Can I say 'I have lost my keys yesterday'?",
      response: "No! The word 'yesterday' acts as a temporal fence that seals the event in the past. Even if the consequence persists, specifying 'yesterday' forces the Simple Past: 'I lost my keys yesterday (and I still cannot find them).' If you omit yesterday, you can say 'I have lost my keys.'",
      bnTip: "'Yesterday' উল্লেখ থাকলে কোনোভাবেই Present Perfect হবে না; Simple Past (lost) হবে।"
    },
    {
      student: "Tuhina",
      question: "Sir, how do we distinguish 'He has gone to Delhi' from 'He has been to Delhi' when talking to someone?",
      response: "Look at the subject's physical whereabouts right now! If the person is currently in Delhi or traveling there, they have 'gone to' Delhi. If the person visited Delhi in the past and is now standing right in front of you in Barrackpore, they have 'been to' Delhi!",
      bnTip: "ব্যক্তি এখনো দিল্লিতে থাকলে 'has gone to'; ফিরে এসে থাকলে 'has been to'।"
    },
    {
      student: "Debopam",
      question: "Sir, why do we use Simple Present in 'If it rains tomorrow, we will stay indoors'?",
      response: "English syntax enforces an invariant rule: Subordinate clauses of time and condition (introduced by if, when, unless, as soon as, etc.) forbid 'will' and must use Simple Present, while the main clause carries the future modal 'will'.",
      bnTip: "'If' শর্তমূলক ক্লজে কখনো 'will' বসে না; Simple Present ব্যবহৃত হয়।"
    }
  ];

  // 4-Step Algorithmic Decision Tree
  const decisionTreeSteps = [
    {
      step: 1,
      title: "Step 1: Check for Past Time Anchor",
      query: "Is there a specific closed past time marker (yesterday, ago, last night, in 1947)?",
      yes: "MANDATORY SIMPLE PAST (V2). Stop here!",
      no: "Proceed to Step 2."
    },
    {
      step: 2,
      title: "Step 2: Check for Habit or Timeless Law",
      query: "Is the action an unvarying habit, universal law, or official timetable?",
      yes: "MANDATORY SIMPLE PRESENT (V1 / V5).",
      no: "Proceed to Step 3."
    },
    {
      step: 3,
      title: "Step 3: Check for Speech-Moment Activity",
      query: "Is the action happening right now or temporarily around now?",
      yes: "If Dynamic verb -> PRESENT CONTINUOUS (am/is/are + V-ing). If Stative verb -> SIMPLE PRESENT.",
      no: "Proceed to Step 4."
    },
    {
      step: 4,
      title: "Step 4: Check for Consequence or Duration",
      query: "Does it express present result, life experience, or ongoing duration (since/for)?",
      yes: "Result/Experience -> PRESENT PERFECT (have/has + V3). Ongoing Duration with Dynamic verb -> PRESENT PERFECT CONTINUOUS (have/has been + V-ing).",
      no: "Re-evaluate contextual markers."
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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-sky-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                <GraduationCap className="w-3.5 h-3.5" />
                Topic 004_005_08 • Capstone & Classroom Diagnostics Lab
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Present Aspects Capstone Lab
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Live Barrackpore masterclass dialogues with Sukanta Sir, the <span className="text-sky-400 font-semibold">4-Step Aspectual Decision Algorithm</span>, and the 25-question comprehensive mastery certification.
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
              এই ক্যাপস্টোন পর্বে আমরা সুকান্ত স্যারের লাইভ ক্লাসরুম আলোচনার মাধ্যমে সকল ৪টি Present Aspect-এর জটিল দ্বন্দ্বগুলো সমাধান করব এবং ২৪টি সুনির্দিষ্ট নিয়মের সমন্বয়ে একটি Decision Algorithm প্রতিষ্ঠা করব।
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
              href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-300 border border-sky-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Topic 0: Aspect Matrix</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Module 004_006: Past Tenses</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/004_008_tense-synergy-sequence-of-tenses-and-aspectual-harmony/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Sequence of Tenses</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: CLASSROOM DIALOGUE WITH SUKANTA SIR                         */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <MessageSquare className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. Masterclass Dialogue: Sukanta Sir with Students</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Authentic classroom discussions unraveling common tense misconceptions and exam traps.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {dialogueSessions.map((diag, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-amber-500/40 transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 text-xs font-bold font-mono shrink-0">
                    {diag.student}
                  </span>
                  <p className="text-sm font-semibold text-slate-200 leading-relaxed">
                    "{diag.question}"
                  </p>
                </div>

                <div className="pl-4 border-l-2 border-amber-500/60 ml-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400 font-mono">Sukanta Sir:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {diag.response}
                  </p>
                  {showBengali && (
                    <p className="text-xs text-amber-300/90 pt-1">
                      <strong>বাংলা সারসংক্ষেপ:</strong> {diag.bnTip}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: THE 4-STEP ASPECTUAL DECISION ALGORITHM                     */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Workflow className="w-6 h-6 text-sky-400" />
            <div>
              <h2 className="text-xl font-bold text-white">2. The 4-Step Aspectual Decision Algorithm Studio</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                A systematic algorithmic flowchart to deduce the accurate tense for any sentence.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {decisionTreeSteps.map((st) => (
              <button
                key={st.step}
                onClick={() => setActiveStep(st.step)}
                className={`p-3 rounded-xl text-left border text-xs transition ${
                  activeStep === st.step
                    ? "bg-sky-600 text-white border-sky-400 font-bold shadow-md shadow-sky-600/20"
                    : "bg-slate-950 text-slate-400 hover:bg-slate-800 border-slate-800"
                }`}
              >
                <div className="text-[10px] font-mono opacity-80">STEP {st.step}</div>
                <div className="text-xs font-bold mt-1">{st.title.split(": ")[1]}</div>
              </button>
            ))}
          </div>

          {/* Active Step Details */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-sky-500/40 space-y-4">
            <h3 className="text-base font-bold text-white">
              {decisionTreeSteps[activeStep - 1].title}
            </h3>
            <p className="text-sm font-semibold text-sky-300">
              Query: "{decisionTreeSteps[activeStep - 1].query}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-emerald-400">If YES:</span>
                <p className="text-xs text-slate-200">{decisionTreeSteps[activeStep - 1].yes}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-amber-400">If NO:</span>
                <p className="text-xs text-slate-300">{decisionTreeSteps[activeStep - 1].no}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SECTION 3: 25-QUESTION CAPSTONE MASTERY QUIZ                           */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-amber-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Module 004_005 Capstone Mastery Exam (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive test spanning all 4 present aspects, stative constraints, since/for, and time anchors.
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
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-600/30 transition-all"
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
          <PlainTextPrint content={noteText} title="Module 004.005 Topic 8 Note - Capstone & Aspect Diagnostics" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            faqList={[
              {
                question: "What is the single most common error made by students in the Present Tense system?",
                answer: "Using the Present Perfect with finished past time markers (e.g. 'I have completed my homework yesterday'). Remember: finished past time anchors strictly demand the Simple Past ('I completed my homework yesterday')."
              },
              {
                question: "How do I choose between Present Continuous and Present Perfect Continuous?",
                answer: "Ask: Is duration mentioned? If the sentence focuses simply on an action in progress right now without mentioning how long it has been going on, use Present Continuous ('It is raining'). If duration is specified with since or for, use Present Perfect Continuous ('It has been raining since 6 AM')."
              },
              {
                question: "What comes next after Module 004_005?",
                answer: "Module 004_006 covers 'The Past Tense System & Narrative Timelines', exploring the Simple Past, Past Continuous, Past Perfect (Pluperfect 'Past of the Past'), Before/After chronological formulas, and negative inversions."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/7"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 7 (Past Time Anchor Prohibition)</span>
          </a>

          <a
            href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Module 004_006 (Past Tenses & Narrative Timelines)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
