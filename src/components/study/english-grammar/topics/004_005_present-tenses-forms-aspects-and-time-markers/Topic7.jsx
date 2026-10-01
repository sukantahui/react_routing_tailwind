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
  ShieldAlert,
  XCircle,
  Calendar,
  Hourglass,
  Sliders,
  CheckCircle
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

export default function Topic7() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedAnchorIdx, setSelectedAnchorIdx] = useState(0);

  // Past Time Anchor Collision Cases
  const anchorCases = [
    {
      marker: "Yesterday",
      wrong: "✗ I have seen him yesterday.",
      correct: "✓ I saw him yesterday.",
      rule: "'Yesterday' is a closed, finished past period. Present Perfect is strictly prohibited.",
      ruleBn: "'Yesterday' একটি সমাপ্ত অতীত দিন; তাই 'have seen' মারাত্মক ভুল, 'saw' হবে।"
    },
    {
      marker: "... Ago",
      wrong: "✗ The train has arrived ten minutes ago.",
      correct: "✓ The train arrived ten minutes ago.",
      rule: "Any phrase with 'ago' counts back from the present to a discrete past point, requiring Simple Past (V2).",
      ruleBn: "'Ago' অতীতের নির্দিষ্ট সময়ের হিসাব বোঝায়, তাই Simple Past 'arrived' আবশ্যক।"
    },
    {
      marker: "Specific Historical Year (in 1947)",
      wrong: "✗ India has won independence in 1947.",
      correct: "✓ India won independence in 1947.",
      rule: "Historical calendar years seal the event in the past, mandating Simple Past.",
      ruleBn: "নির্দিষ্ট ঐতিহাসিক সাল বা সন উল্লেখ থাকলে সর্বদা Simple Past ব্যবহার করতে হবে।"
    },
    {
      marker: "Interrogative 'WHEN'",
      wrong: "✗ When have you bought this laptop?",
      correct: "✓ When did you buy this laptop?",
      rule: "'When' specifically asks for the exact point in past time, making Present Perfect illegal.",
      ruleBn: "'When' দিয়ে অতীতের নির্দিষ্ট সময় জানতে চাওয়া হয়, তাই 'When did you...' হবে।"
    },
    {
      marker: "Last Night / Last Week",
      wrong: "✗ We have visited the museum last week.",
      correct: "✓ We visited the museum last week.",
      rule: "'Last' creates a closed temporal boundary requiring Simple Past.",
      ruleBn: "'Last week' অতীত সময়সীমা নির্দিষ্ট করে দেয়, তাই 'visited' সঠিক।"
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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-950/60 via-slate-900 to-indigo-950/40 p-8 sm:p-12 border border-rose-600/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-rose-500/10 text-rose-300 border border-rose-500/30">
                <Clock className="w-3.5 h-3.5" />
                Topic 004_005_07 • The Finished Past Time Anchor Prohibition
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                The Past Time Anchor Invariant
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Why pairing <span className="text-rose-400 font-semibold">'Yesterday' / 'Ago' / 'In 1947'</span> with Present Perfect is a fatal grammatical error, and how to maintain strict tense separation.
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
              ইংরেজি ব্যাকরণের অন্যতম প্রধান নিয়ম হলো: কোনো নির্দিষ্ট সমাপ্ত অতীত সময়ের উল্লেখ (যেমন: Yesterday, Two days ago, In 1947, Last night) থাকলে কখনোই Present Perfect (have/has + V3) ব্যবহার করা যাবে না; সেখানে চোখ বন্ধ করে Simple Past (V2) লিখতে হবে।
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
              href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/4"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Present Perfect Consequence</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/004_006_past-tenses-narrative-timelines-and-aspects/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-300 border border-sky-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Simple Past Narratives</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/009_003_spotting-errors-and-sentence-correction-lab/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-rose-300 border border-rose-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Error Spotting Lab</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: PAST TIME ANCHOR COLLISION STUDIO                           */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <ShieldAlert className="w-6 h-6 text-rose-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. Past Time Anchor Collision Diagnostic Studio</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Select a past time anchor to inspect the fatal error pattern and its grammatically pure correction.
              </p>
            </div>
          </div>

          {/* Anchor Buttons */}
          <div className="flex flex-wrap gap-2">
            {anchorCases.map((ac, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAnchorIdx(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition border ${
                  selectedAnchorIdx === idx
                    ? "bg-rose-600 text-white border-rose-400 shadow-lg shadow-rose-600/20"
                    : "bg-slate-950 text-slate-400 hover:bg-slate-800 border-slate-800"
                }`}
              >
                {ac.marker}
              </button>
            ))}
          </div>

          {/* Active Collision Case Card */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-rose-500/30 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/40 space-y-1">
                <span className="text-[10px] uppercase font-mono text-rose-400 font-bold flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Fatal Error (Present Perfect + Past Anchor)
                </span>
                <p className="text-base font-extrabold text-rose-200 font-mono">
                  "{anchorCases[selectedAnchorIdx].wrong}"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 space-y-1">
                <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Pure Grammar (Mandatory Simple Past V2)
                </span>
                <p className="text-base font-extrabold text-emerald-200 font-mono">
                  "{anchorCases[selectedAnchorIdx].correct}"
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Linguistic Rationale:</span>
              <p className="text-sm text-slate-200">
                {anchorCases[selectedAnchorIdx].rule}
              </p>
              {showBengali && (
                <p className="text-xs text-amber-200/90 pt-1">
                  <strong>বাংলা:</strong> {anchorCases[selectedAnchorIdx].ruleBn}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: THE UNFINISHED TIME PERIOD EXCEPTION STUDIO                 */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Hourglass className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">2. The "This Morning" Time Window Dilemma</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                How the exact time of speech determines whether a period is ongoing (Present Perfect) or finished (Simple Past).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300">
                SCENARIO A · IT IS 10:00 AM (Still Morning)
              </span>
              <p className="text-base font-bold text-white my-2">
                ✓ "I have drunk two cups of coffee this morning."
              </p>
              <p className="text-xs text-slate-300">
                Because the morning is not yet finished, the time window is open. Present Perfect is valid.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-sky-500/40 space-y-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-sky-500/20 text-sky-300">
                SCENARIO B · IT IS 05:00 PM (Morning is Over!)
              </span>
              <p className="text-base font-bold text-white my-2">
                ✓ "I drank two cups of coffee this morning."
              </p>
              <p className="text-xs text-slate-300">
                At 5:00 PM, the morning is closed history. Simple Past ('drank') is mandatory.
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
              <HelpCircle className="w-6 h-6 text-rose-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Topic 004_005_07 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive test on finished past time anchors, historical dates, 'When' questions, and error spotting.
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
                    <span className="text-xs font-bold text-rose-400 font-mono">Q{qIndex + 1}.</span>
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
                        btnStyle = "bg-rose-500/20 border-rose-500 text-rose-200 font-semibold";
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
                        <strong className="text-rose-400">Explanation:</strong> {q.explanation}
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
                className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all"
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
          <PlainTextPrint content={noteText} title="Module 004.005 Topic 7 Note - Finished Past Time Anchor Prohibition" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            faqList={[
              {
                question: "Why can't 'yesterday' and 'have seen' exist in the same clause?",
                answer: "'Yesterday' places the action inside a closed past box. 'Have seen' (Present Perfect) requires a temporal link extending to the present moment. Combining them creates a direct syntactic contradiction. You must say 'I saw him yesterday'."
              },
              {
                question: "How do we ask when an event happened in the past?",
                answer: "Always use Simple Past: 'When did you buy this?' or 'When did the train arrive?'. Never use Present Perfect with 'when' (*When have you bought this?)."
              },
              {
                question: "Can 'today' or 'this week' ever take Simple Past?",
                answer: "Yes! If you refer to an action that occurred within a part of today that is already over (e.g. 'I woke up at 6 AM today' or 'I saw him this morning' when spoken in the evening), Simple Past is appropriate."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/6"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 6 (Since vs For Axis)</span>
          </a>

          <a
            href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/8"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 8 (Classroom Dialogue & Capstone Lab)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
