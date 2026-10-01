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
  MessageSquare,
  Award,
  GitBranch,
  Workflow
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

export default function Topic7() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Classroom Dialogue Scenarios
  const dialogueSteps = [
    {
      speaker: "Swadeep",
      role: "Student (Barrackpore)",
      avatarColor: "bg-cyan-600",
      query: "Sir, I often get confused between Simple Past and Past Perfect. If an incident happened 100 years ago, shouldn't I always use Past Perfect because it is very old?",
      sirResponse: "That is one of the most widespread misconceptions! Tense is NOT about absolute chronological distance; it is about relative temporal relationship. If you describe a single isolated past event, even if it occurred in 500 BC, you use Simple Past (e.g. 'Alexander invaded India in 326 BC'). You ONLY deploy Past Perfect when there are TWO past events and you need to signal that one took place BEFORE the other!",
      sirResponseBn: "না, সময় কত পুরনো তা দিয়ে Past Perfect নির্ধারিত হয় না। অতীতকালের একটি মাত্র একক ঘটনা হলে যত পুরনোই হোক Simple Past হবে (যেমন: 'Alexander invaded India in 326 BC')। কিন্তু অতীতে দুটি কাজের মধ্যে যেটি অপেক্ষাকৃত পূর্বে ঘটেছিল, শুধুমাত্র তার জন্যই Past Perfect (had + V3) ব্যবহৃত হয়।"
    },
    {
      speaker: "Abhronila",
      role: "Student (Ichapore)",
      avatarColor: "bg-emerald-600",
      query: "Sir, why do people say 'No sooner did he arrive than...' and sometimes 'No sooner had he arrived than...'? Which one is standard in exams?",
      sirResponse: "Both are 100% standard and grammatically pristine! 'No sooner had + S + V3' and 'No sooner did + S + V1' are equal in validity. The critical exam traps to watch out for are: (1) Did takes V1, Had takes V3, and (2) 'No sooner' strictly pairs with THAN, while 'Hardly/Scarcely' strictly pairs with WHEN!",
      sirResponseBn: "দুটিই সম্পূর্ণ ব্যাকরণসম্মত! 'No sooner had + S + V3' এবং 'No sooner did + S + V1' দুটিই পরীক্ষায় গ্রহণযোগ্য। খেয়াল রাখতে হবে: Did-এর সাথে V1 এবং Had-এর সাথে V3 বসে; এবং No sooner-এর সাথে সর্বদা 'THAN' বসে।"
    },
    {
      speaker: "Priyabrata",
      role: "Student (Naihati)",
      avatarColor: "bg-amber-600",
      query: "Sir, can I say 'When I was seven years old, I would live in a huge mansion'?",
      sirResponse: "Never! 'Live' is a stative verb describing residence and state. 'Would' is exclusively reserved for repeated dynamic actions (like 'would walk', 'would swim', 'would read'). For past states, existence, and beliefs, you must strictly use 'Used to' ('I used to live in a huge mansion').",
      sirResponseBn: "'Live' একটি stative verb (অবস্থা নির্দেশক)। 'Would' শুধুমাত্র গতিশীল কাজের (dynamic actions) ক্ষেত্রে বসে। অতীতের বাসস্থান বা অবস্থার জন্য সর্বদা 'Used to live' বলতে হবে।"
    },
    {
      speaker: "Sneha",
      role: "Student (Kolkata)",
      avatarColor: "bg-purple-600",
      query: "Sir, what about stative verbs in Past Perfect Continuous? Like 'He had been knowing the truth for years before speaking out'?",
      sirResponse: "Stative verbs do NOT accept any continuous (-ing) forms—even when there is an extended duration ('for years')! In such cases, you downgrade from Past Perfect Continuous to Past Perfect Simple: 'He had known the truth for years before speaking out.'",
      sirResponseBn: "যেসব ক্রিয়া অনুভূতির বা অবস্থার (Stative Verbs), তাদের কোনো continuous (-ing) হয় না। সময় উল্লেখ থাকলেও Past Perfect Continuous না হয়ে Past Perfect Simple ('had known') হবে।"
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                Module 004.006 • Topic 7 of 7 (Capstone)
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
              Classroom Dialogue & Past Invariant Capstone
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Consolidate the complete past tense continuum—Simple Past narrative chains, Past Continuous interrupts, Past Perfect relative priorities, negative inversions, and habitual modals—through Sukanta Sir's interactive masterclass and 25 comprehensive diagnostic questions.
            </p>

            {showBengali && (
              <div className="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-700/50 text-indigo-200 text-sm leading-relaxed animate-fade-in">
                <span className="font-bold text-amber-300">মডিউল ৭ ক্যাপস্টোন সারসংক্ষেপ: </span>
                অতীতকালের চারটি রূপভেদ (Simple Past, Past Continuous, Past Perfect, Past Perfect Continuous), নেতিবাচক রূপান্তর (Inversion: No sooner / Hardly), এবং অতীতের অভ্যাসগত গঠন (Used to vs Would)-এর সামগ্রিক সংশ্লেষণ ও তুলনামূলক প্রয়োগের চূড়ান্ত মূল্যায়ন পর্ব।
              </div>
            )}
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 1. MASTERCLASS CLASSROOM DIALOGUE WITH SUKANTA SIR                         */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl font-bold text-white">1. Masterclass Dialogue: Resolving Core Past Tense Dilemmas</h2>
          </div>

          {/* Dialogue Steps Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {dialogueSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-3 rounded-xl text-left text-xs transition border ${
                  activeStep === idx
                    ? "bg-indigo-600 text-white font-bold border-indigo-400 shadow-lg shadow-indigo-900/40"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800"
                }`}
              >
                <div className="font-semibold text-xs">{step.speaker}</div>
                <div className="text-[11px] opacity-80 truncate">{step.role}</div>
              </button>
            ))}
          </div>

          {/* Active Dialogue Card */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 animate-fade-in">
            {/* Student Question */}
            <div className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-2xl ${dialogueSteps[activeStep].avatarColor} flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0`}
              >
                {dialogueSteps[activeStep].speaker[0]}
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{dialogueSteps[activeStep].speaker}</span>
                  <span className="text-xs text-slate-400">({dialogueSteps[activeStep].role})</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm italic">
                  "{dialogueSteps[activeStep].query}"
                </div>
              </div>
            </div>

            {/* Sukanta Sir Explanation */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
                S
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-indigo-300">Sukanta Sir</span>
                  <span className="text-xs font-mono text-amber-400 px-2 py-0.5 rounded bg-amber-950/50 border border-amber-800/40">
                    Lead Grammar Mentor
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 text-slate-200 text-sm leading-relaxed space-y-2">
                  <p>{dialogueSteps[activeStep].sirResponse}</p>
                  {showBengali && (
                    <p className="text-xs text-amber-300/90 pt-2 border-t border-indigo-800/40">
                      <strong>বাংলা তাৎপর্য: </strong> {dialogueSteps[activeStep].sirResponseBn}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. THE 4-ASPECT DECISION TREE WORKBENCH                                    */}
        {/* ========================================================================= */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-indigo-900/60 space-y-6">
          <div className="flex items-center gap-3">
            <GitBranch className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              2. The 4-Aspect Past Decision Tree Workbench
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                Branch 1: Single Discrete Past Action
              </span>
              <h3 className="font-bold text-white text-base">Simple Past (Subject + V2)</h3>
              <p className="text-slate-300">
                Completed action at a specified past moment or sequential narrative steps (A → B → C).
              </p>
              <div className="font-mono text-xs text-indigo-300 bg-slate-900 p-2.5 rounded-lg">
                "Subhendu <strong>arrived</strong>, <strong>unlocked</strong> the laboratory, and <strong>commenced</strong> the analysis."
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                Branch 2: Background Ongoing Activity
              </span>
              <h3 className="font-bold text-white text-base">Past Continuous (was/were + V1-ing)</h3>
              <p className="text-slate-300">
                Action in progress during a past timeframe or interrupted by a sudden discrete event (When + V2).
              </p>
              <div className="font-mono text-xs text-cyan-300 bg-slate-900 p-2.5 rounded-lg">
                "While Swadeep <strong>was calibrating</strong> the voltmeter, the power <strong>tripped</strong>."
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                Branch 3: Past of the Past (Priority)
              </span>
              <h3 className="font-bold text-white text-base">Past Perfect (Subject + had + V3)</h3>
              <p className="text-slate-300">
                Earlier completed action before another past event (V2) or before a past deadline (By 6 PM).
              </p>
              <div className="font-mono text-xs text-amber-300 bg-slate-900 p-2.5 rounded-lg">
                "The express train <strong>had departed</strong> before Tathagata <strong>reached</strong> the platform."
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">
                Branch 4: Accumulated Duration to Past Milestone
              </span>
              <h3 className="font-bold text-white text-base">Past Perfect Continuous (had been + V-ing)</h3>
              <p className="text-slate-300">
                Continuous activity with duration (for/since) leading directly up to a secondary past milestone.
              </p>
              <div className="font-mono text-xs text-purple-300 bg-slate-900 p-2.5 rounded-lg">
                "Priyabrata <strong>had been cycling</strong> for four hours when he finally <strong>reached</strong> the camp."
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. 25 CAPSTONE COMPREHENSIVE PRACTICE MCQS                                */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-bold text-white">
                3. Past Invariant Capstone Assessment (25 Questions)
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
          <PlainTextPrint content={noteText} title="Module 004.006 Topic 7 Note - Past Invariants Capstone" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            questions={[
              {
                question: "When is Past Perfect strictly required?",
                answer: "Past Perfect (had + V3) is required ONLY when it is necessary to establish that one past action occurred before another past event or before a specific past time milestone."
              },
              {
                question: "Can 'No sooner' ever take 'when'?",
                answer: "Never. 'No sooner' incorporates the comparative suffix '-er' and must strictly be paired with 'than'. 'Hardly', 'Scarcely', and 'Barely' pair with 'when'."
              },
              {
                question: "What is the key rule for 'would' describing past habits?",
                answer: "'Would' can ONLY describe repeated dynamic actions (actions you physically perform) within an established past context. It can never be used with stative verbs (verbs of state, condition, feeling, or location)."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/6"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 6 (Used to vs Would)</span>
          </a>

          <a
            href="/english-grammar/topic/004_007_future-expressions-modal-aspects-and-timelines/0"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold shadow-xl shadow-emerald-950 transition"
          >
            <span>Next Module: 004.007 Future Expressions & Modal Aspects</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
