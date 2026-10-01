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
  TrendingUp,
  MessageSquare,
  AlertCircle,
  Calendar,
  Flame,
  Sliders
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

export default function Topic3() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeTab, setActiveTab] = useState("speech_time");
  const [irritationMode, setIrritationMode] = useState(false);

  // 5 Dimensions of Present Continuous
  const dimensions = {
    speech_time: {
      title: "1. Speech-Moment Actions",
      icon: Clock,
      badge: "Real-Time Activity",
      badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
      desc: "Physical actions happening right at this split-second of utterance.",
      markers: "now, right now, Look!, Listen!, at present, currently",
      example: "Listen! The professor is explaining the derivation on the whiteboard.",
      exampleBn: "শোনো! শিক্ষক মহাশয় ঠিক এই মুহূর্তে ব্ল্যাকবোর্ডে বুঝিয়ে দিচ্ছেন।"
    },
    temporary: {
      title: "2. Temporary Situations (Around Now)",
      icon: Calendar,
      badge: "Non-Permanent State",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      desc: "Actions ongoing during the general present epoch, though not at this exact second.",
      markers: "these days, this week, this semester, currently, nowadays",
      example: "Abhronila is staying with her relatives in Barrackpore this month.",
      exampleBn: "অভ্রনীলা এই মাসে সাময়িকভাবে ব্যারাকপুরে আত্মীয়দের বাড়ি আছে।"
    },
    trends: {
      title: "3. Evolving Situations & Macro Trends",
      icon: TrendingUp,
      badge: "Dynamic Progression",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      desc: "Societal evolutions, climatic changes, or ongoing gradual advancements.",
      markers: "increasingly, day by day, steadily, getting, becoming, rising",
      example: "Global sea levels and atmospheric temperatures are rising steadily.",
      exampleBn: "বিশ্বব্যাপী সমুদ্রপৃষ্ঠের উচ্চতা ও তাপমাত্রা ক্রমাগত বৃদ্ধি পাচ্ছে।"
    },
    future_plan: {
      title: "4. Confirmed Personal Future Plans",
      icon: Compass,
      badge: "Personal Arrangement",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      desc: "Personal future commitments with agreed-upon time and venue.",
      markers: "tonight, tomorrow morning, next Friday, this weekend",
      example: "We are meeting the senior linguistic consultant tomorrow at 4:00 PM.",
      exampleBn: "আমরা কাল বিকেল ৪টায় সিনিয়র কনসালটেন্টের সাথে মিটিং করছি।"
    },
    irritation: {
      title: "5. Annoyance & Irritation with 'Always'",
      icon: Flame,
      badge: "Emotional Exasperation",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      desc: "Expresses intense emotional frustration toward an unwelcome, unreasonable habit.",
      markers: "always, constantly, continually, forever (with exclamation!)",
      example: "He is always interrupting others in the middle of their sentences!",
      exampleBn: "সে সবসময় কথা বলার মাঝে বাধা দিয়ে বিরক্তি সৃষ্টি করে!"
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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-sky-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-sky-500/10 text-sky-300 border border-sky-500/30">
                <Clock className="w-3.5 h-3.5" />
                Topic 004_005_03 • Present Continuous Tense
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Present Continuous Dynamics
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Speech-time actions, temporary situations, changing macro trends, confirmed future appointments, and the nuanced <span className="text-rose-400 font-semibold">'Always + V-ing' irritation formula</span>.
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
              Present Continuous (am/is/are + V-ing) শুধু "এখন হচ্ছে" এমন কাজ নয়, সাময়িক অবস্থা (Temporary), ক্রমবর্ধমান পরিবর্তন (Trends), নির্ধারিত ভবিষ্যৎ এবং 'Always' সহযোগে কারো বিরক্তিকর স্বভাব প্রকাশেও অত্যন্ত গুরুত্বপূর্ণ।
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
              href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/6"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Present Perfect Continuous (Since/For)</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/004_007_future-expressions-modal-aspects-and-timelines/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Future Expressions</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: 5 CORE FUNCTIONAL DIMENSIONS MATRIX                         */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Layers className="w-6 h-6 text-sky-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. The 5 Functional Dimensions of Present Continuous</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Understand how speaker intention dictates the choice between immediate, temporary, and emotional contexts.
              </p>
            </div>
          </div>

          {/* Dimension Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {Object.keys(dimensions).map((key) => {
              const DimIcon = dimensions[key].icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all border flex flex-col items-center gap-1.5 ${
                    activeTab === key
                      ? "bg-sky-600 text-white border-sky-400 shadow-lg shadow-sky-600/20"
                      : "bg-slate-950 text-slate-300 hover:bg-slate-800 border-slate-800"
                  }`}
                >
                  <DimIcon className="w-4 h-4" />
                  <span>{dimensions[key].title.split(". ")[1].split(" (")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Dimension Details */}
          <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/30 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-white">
                {dimensions[activeTab].title}
              </h3>
              <span className={`text-xs font-mono px-3 py-1 rounded-full border ${dimensions[activeTab].badgeColor}`}>
                {dimensions[activeTab].badge}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {dimensions[activeTab].desc}
            </p>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Diagnostic Time Markers:
              </span>
              <p className="text-xs font-mono text-amber-300">{dimensions[activeTab].markers}</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Authentic Example:</span>
              <p className="text-sm font-semibold text-white">
                "{dimensions[activeTab].example}"
              </p>
              {showBengali && (
                <p className="text-xs text-amber-200/90 pt-1">
                  <strong>বাংলা:</strong> {dimensions[activeTab].exampleBn}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: THE 'ALWAYS + V-ING' IRRITATION COMPARATOR                  */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-rose-400" />
              <div>
                <h2 className="text-xl font-bold text-white">2. Nuance Lab: Neutral Habit vs Emotional Irritation</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Compare how switching between Simple Present and Continuous transforms emotional tone.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIrritationMode(!irritationMode)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold border border-slate-700 text-slate-200 flex items-center gap-2 transition"
            >
              <span>Toggle Mode:</span>
              <span className={irritationMode ? "text-rose-400" : "text-sky-400"}>
                {irritationMode ? "IRRITATED TONE (Continuous)" : "NEUTRAL TONE (Simple)"}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Neutral Statement */}
            <div className={`p-5 rounded-2xl border transition-all ${
              !irritationMode ? "bg-sky-950/20 border-sky-500/50" : "bg-slate-950 border-slate-800 opacity-60"
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold font-mono px-2.5 py-1 rounded bg-sky-500/20 text-sky-300">
                  SIMPLE PRESENT · NEUTRAL FACT
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Objective Frequency</span>
              </div>
              <p className="text-base font-bold text-white my-2">
                "Swadeep always checks his email at 9:00 AM."
              </p>
              <p className="text-xs text-slate-300">
                Tone: Objective, neutral, calm observation of a daily schedule. No emotional complaint.
              </p>
            </div>

            {/* Irritated Statement */}
            <div className={`p-5 rounded-2xl border transition-all ${
              irritationMode ? "bg-rose-950/30 border-rose-500/60 shadow-lg shadow-rose-950/30" : "bg-slate-950 border-slate-800 opacity-60"
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold font-mono px-2.5 py-1 rounded bg-rose-500/20 text-rose-300">
                  CONTINUOUS + ALWAYS · IRRITATION!
                </span>
                <span className="text-[10px] text-rose-400 font-mono">Exasperated Complaint</span>
              </div>
              <p className="text-base font-bold text-rose-200 my-2">
                "Swadeep is always checking his phone during our lectures!"
              </p>
              <p className="text-xs text-slate-300">
                Tone: Frustrated, annoyed, critical. Implies the action occurs far too frequently and bothers the speaker.
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
              <HelpCircle className="w-6 h-6 text-sky-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Topic 004_005_03 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive test on speech-time actions, trends, future plans, spelling mechanics, and emotional irritation.
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
          <PlainTextPrint content={noteText} title="Module 004.005 Topic 3 Note - Present Continuous Tense" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            faqList={[
              {
                question: "How does 'He is always talking' differ from 'He always talks'?",
                answer: "'He always talks' is a neutral, factual statement about someone's routine or habit. 'He is always talking!' uses the Present Continuous with 'always' to express irritation, annoyance, or emotional criticism from the speaker."
              },
              {
                question: "Can Present Continuous describe actions not happening at this exact second?",
                answer: "Yes! When describing temporary situations or trends happening 'around now' (e.g. 'I am studying for my civil service exam this year' or 'She is writing a novel these days'), the action is considered in progress in the broader timeframe."
              },
              {
                question: "What is the spelling rule for doubling consonants before adding '-ing'?",
                answer: "In one-syllable verbs ending in a single consonant preceded by a single vowel (CVC, like run -> running, sit -> sitting), double the consonant. In two-syllable verbs, double only if the stress falls on the second syllable (be'gin -> beginning, re'fer -> referring)."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/2"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 2 (Stative vs Dynamic)</span>
          </a>

          <a
            href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/4"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 4 (Present Perfect Tense)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
