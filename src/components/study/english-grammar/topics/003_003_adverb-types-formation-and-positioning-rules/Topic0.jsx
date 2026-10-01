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
  MapPin,
  Smile,
  Sliders,
  Compass,
  ArrowUpDown
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);

  // MPT Builder State
  const [mptState, setMptState] = useState({
    manner: "beautifully",
    place: "in the auditorium",
    time: "yesterday"
  });

  const mptOptions = {
    manner: ["beautifully", "eloquently", "furiously", "patiently", "flawlessly"],
    place: ["in the auditorium", "at the international conference", "on the stage", "in the laboratory", "across the bridge"],
    time: ["yesterday", "last evening", "at dawn", "before noon", "recently"]
  };

  // 'Only' Shifter State
  const [onlyPos, setOnlyPos] = useState(0);

  const onlyVariations = [
    {
      sentence: "ONLY he told me that he loved her.",
      meaning: "Nobody else told me this fact; he was the sole informant.",
      meaningBn: "কেবলমাত্র সেই আমাকে বলেছিল (অন্য কেউ বলেনি)।"
    },
    {
      sentence: "He ONLY told me that he loved her.",
      meaning: "He merely spoke the words; he didn't write a letter or prove it.",
      meaningBn: "সে কেবল মুখে বলেছিল (লিখে দেয়নি বা অন্য কিছু করেনি)।"
    },
    {
      sentence: "He told ONLY me that he loved her.",
      meaning: "He confided this secret to me and to no other person.",
      meaningBn: "সে শুধুমাত্র আমাকে বলেছিল (অন্য কাউকে জানায়নি)।"
    },
    {
      sentence: "He told me ONLY that he loved her.",
      meaning: "He stated nothing else; that was his solitary remark.",
      meaningBn: "সে আমাকে কেবল এইটুকুই বলেছিল (আর কিছু বলেনি)।"
    },
    {
      sentence: "He told me that ONLY he loved her.",
      meaning: "He claimed that no other person in the world loved her.",
      meaningBn: "সে আমাকে বলল যে একমাত্র সেই তাকে ভালোবাসে (অন্য কেউ নয়)।"
    },
    {
      sentence: "He told me that he ONLY loved her.",
      meaning: "He merely loved her (e.g. didn't intend to marry or support her).",
      meaningBn: "সে আমাকে বলল সে তাকে শুধু ভালোবাসে (বিয়ে ইত্যাদি কোনো প্রতিশ্রুতি নয়)।"
    },
    {
      sentence: "He told me that he loved ONLY her.",
      meaning: "His love was devoted exclusively to her and to no other woman.",
      meaningBn: "সে আমাকে বলল সে একমাত্র তাকেই ভালোবাসে (অন্য কোনো নারীকে নয়)।"
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
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-sky-500/10 text-sky-300 border border-sky-500/30">
                <Compass className="w-3.5 h-3.5" />
                Module 003.003 • Modifying Sphere
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Adverb Types, Formation & Positioning (MPT)
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the 7 core adverb classes, flat adverbs vs tricky <span className="text-sky-400 font-semibold">-ly pairs</span> (hard vs hardly), the <span className="text-emerald-400 font-semibold">MPT Royal Order</span>, and the microscopic precision of the limiting adverb <span className="text-amber-300 font-semibold">only</span>.
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
              Adverb বা ভাববিশেষণ Verb, Adjective বা অপর কোনো Adverb-কে বিশেষিত করে। একাধিক Adverb বাক্যের শেষে বসলে তারা নির্দিষ্ট ক্রম <strong>MPT</strong> (Manner → Place → Time) মেনে চলে।
            </div>
          )}
        </header>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: INTERACTIVE MPT ORDER BUILDER STUDIO                        */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Sliders className="w-6 h-6 text-sky-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. The Royal Order of Adverbs (MPT)</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Manner (How?) → Place (Where?) → Time (When?)
              </p>
            </div>
          </div>

          {/* Live Sentence Preview */}
          <div className="bg-slate-950 rounded-xl p-6 border border-sky-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
                Synthesized MPT Sentence
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-300 font-mono">
                Manner + Place + Time
              </span>
            </div>
            <p className="text-lg sm:text-2xl font-bold text-white leading-relaxed">
              "The distinguished professor spoke{" "}
              <span className="text-emerald-400 underline decoration-emerald-500/50" title="Manner">
                {mptState.manner}
              </span>{" "}
              <span className="text-sky-400 underline decoration-sky-500/50" title="Place">
                {mptState.place}
              </span>{" "}
              <span className="text-amber-400 underline decoration-amber-500/50" title="Time">
                {mptState.time}
              </span>
              ."
            </p>

            {showBengali && (
              <p className="text-xs text-amber-200/90 pt-2 border-t border-slate-800 animate-fade-in">
                <strong>বাংলা নিয়ম:</strong> বাক্যে ক্রিয়া সম্পাদনের পদ্ধতি (Manner) প্রথমে, তারপর স্থান (Place), এবং সর্বশেষে সময় (Time) উল্লেখ করতে হয়।
              </p>
            )}
          </div>

          {/* MPT Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Manner */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <Smile className="w-3.5 h-3.5" /> 1. Manner (How)
                </span>
              </div>
              <select
                value={mptState.manner}
                onChange={(e) => setMptState((prev) => ({ ...prev, manner: e.target.value }))}
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg p-2 focus:ring-1 focus:ring-emerald-400 focus:outline-none"
              >
                {mptOptions.manner.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Place */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-sky-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> 2. Place (Where)
                </span>
              </div>
              <select
                value={mptState.place}
                onChange={(e) => setMptState((prev) => ({ ...prev, place: e.target.value }))}
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg p-2 focus:ring-1 focus:ring-sky-400 focus:outline-none"
              >
                {mptOptions.place.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Time */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> 3. Time (When)
                </span>
              </div>
              <select
                value={mptState.time}
                onChange={(e) => setMptState((prev) => ({ ...prev, time: e.target.value }))}
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg p-2 focus:ring-1 focus:ring-amber-400 focus:outline-none"
              >
                {mptOptions.time.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: THE 7 POSITIONS OF 'ONLY' INTERACTIVE SHIFTER               */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <ArrowUpDown className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">2. The 7 Semantic Variations of 'Only'</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Shift the position of 'only' to observe how moving a single word radically alters the entire meaning.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Position Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {onlyVariations.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setOnlyPos(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    onlyPos === idx
                      ? "bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700"
                  }`}
                >
                  Position {idx + 1}
                </button>
              ))}
            </div>

            {/* Visualizer Display Card */}
            <div className="p-5 rounded-xl bg-slate-950/90 border border-amber-500/30 space-y-3">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                Sentence Variation #{onlyPos + 1}
              </span>
              <h3 className="text-base sm:text-xl font-bold text-white">
                "{onlyVariations[onlyPos].sentence}"
              </h3>
              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Precise Semantic Meaning:
                </span>
                <p className="text-sm text-slate-200 font-medium">
                  {onlyVariations[onlyPos].meaning}
                </p>
                {showBengali && (
                  <p className="text-xs text-amber-200/90 pt-1">
                    <strong>বাংলা তাৎপর্য:</strong> {onlyVariations[onlyPos].meaningBn}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SECTION 3: FLAT ADVERBS & TRICKY '-LY' PAIRS                           */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <AlertTriangle className="w-6 h-6 text-rose-400" />
            <div>
              <h2 className="text-xl font-bold text-white">3. Flat Adverbs vs Divergent '-ly' Pairs</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Adding '-ly' often changes the word's meaning entirely, leading to serious errors.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Hard vs Hardly</span>
              <p className="text-xs text-slate-300">
                ✓ <strong>"He works HARD."</strong> (= with great energy & diligence)<br />
                ✓ <strong>"He HARDLY works."</strong> (= scarcely works / lazy)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Late vs Lately</span>
              <p className="text-xs text-slate-300">
                ✓ <strong>"He arrived LATE."</strong> (= after scheduled time)<br />
                ✓ <strong>"I haven't seen him LATELY."</strong> (= in recent times)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Near vs Nearly</span>
              <p className="text-xs text-slate-300">
                ✓ <strong>"Come NEAR."</strong> (= close in physical space)<br />
                ✓ <strong>"He NEARLY missed the flight."</strong> (= almost missed)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Fast vs 'Fastly'</span>
              <p className="text-xs text-slate-300">
                ✓ <strong>"He drives FAST."</strong> (Flat adverb)<br />
                ✗ <em>"He drives fastly."</em> (Strictly Non-Existent in English!)
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. SECTION 4: 25-QUESTION INTERACTIVE MASTERY QUIZ                        */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-amber-400" />
              <div>
                <h2 className="text-xl font-bold text-white">4. Module 003.003 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive test on MPT sequencing, frequency adverb placement, flat adverbs, and 'only' restrictions.
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
        {/* 6. PRINT & AUXILIARY STUDY TOOLS                                          */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <PlainTextPrint content={noteText} title="Module 003.003 Study Note - Adverb Types & MPT Positioning" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            faqList={[
              {
                question: "What does the MPT rule stand for in English grammar?",
                answer: "MPT stands for Manner (how), Place (where), and Time (when). When multiple adverbs follow a verb in the end position, they naturally arrange in the sequence: Manner -> Place → Time (e.g. 'She sang beautifully in the auditorium yesterday')."
              },
              {
                question: "Why is 'He works hardly' grammatically incorrect when describing a hard worker?",
                answer: "'Hard' is a flat adverb meaning with great diligence ('He works hard'). 'Hardly' is a negative adverb meaning scarcely or almost never ('He hardly works' means he is lazy)."
              },
              {
                question: "Where should adverbs of frequency be placed in sentences?",
                answer: "Adverbs of frequency (always, never, often, seldom) are placed AFTER the verb 'to be' (am/is/are/was/were) and other auxiliaries, but BEFORE standard main lexical verbs (e.g. 'She is always punctual', 'She always studies hard')."
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
