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
  Sliders,
  Crown,
  Eye,
  Activity
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);

  // OSASCOMP Royal Order Builder State
  const [selectedOSASCOMP, setSelectedOSASCOMP] = useState({
    opinion: "charming",
    size: "small",
    age: "antique",
    shape: "round",
    color: "brown",
    origin: "Italian",
    material: "wooden",
    purpose: "dining"
  });

  const osascompOptions = {
    opinion: ["charming", "elegant", "magnificent", "luxurious", "rustic"],
    size: ["small", "gigantic", "compact", "massive", "tiny"],
    age: ["antique", "vintage", "modern", "ancient", "contemporary"],
    shape: ["round", "square", "oval", "rectangular", "cylindrical"],
    color: ["brown", "jet-black", "golden", "emerald", "crimson"],
    origin: ["Italian", "Indian", "French", "Japanese", "Scandinavian"],
    material: ["wooden", "marble", "silk", "leather", "porcelain"],
    purpose: ["dining", "coffee", "study", "display", "conference"]
  };

  // Participial Adjective State
  const [activeParticipleTab, setActiveParticipleTab] = useState("boring");

  const participlePairs = {
    boring: {
      active: "Boring",
      activeContext: "The lecture is boring. (Source: It causes tiredness/disinterest).",
      activeBn: "লেকচারটি একঘেয়ে (এটি ক্লান্তির কারণ)।",
      passive: "Bored",
      passiveContext: "The student is bored. (Receiver: Experiencing boredom).",
      passiveBn: "ছাত্রটি ক্লান্ত/বিরক্ত (সে একঘেয়েমি অনুভব করছে)।"
    },
    exciting: {
      active: "Exciting",
      activeContext: "The football match is exciting. (Source: Generates thrill).",
      activeBn: "ফুটবল ম্যাচটি উত্তেজনাপূর্ণ (উত্তেজনা সৃষ্টি করছে)।",
      passive: "Excited",
      passiveContext: "The spectators are excited. (Receivers: Experiencing thrill).",
      passiveBn: "দর্শকেরা উত্তেজিত (তারা আনন্দ অনুভব করছে)।"
    },
    exhausting: {
      active: "Exhausting",
      activeContext: "The Himalayan trek was exhausting. (Source: Demands immense energy).",
      activeBn: "হিমালয় পর্বতারোহণ ছিল ক্লান্তিকর (শক্তি ক্ষয়কারী)।",
      passive: "Exhausted",
      passiveContext: "The trekkers were exhausted. (Receivers: Physically drained).",
      passiveBn: "পর্বতারোহীরা ক্লান্ত ও পরিশ্রান্ত ছিল (শারীরিক ক্লান্তিপ্রাপ্ত)।"
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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-amber-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <Crown className="w-3.5 h-3.5" />
                Module 003.001 • Modifying Sphere
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Adjective Types, Positioning & OSASCOMP Order
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the 8 functional classes of adjectives, attributive vs predicative positions, the <span className="text-amber-300 font-semibold">OSASCOMP Royal Order</span>, participial <span className="text-cyan-400 font-semibold">-ing vs -ed</span> dynamics, and compound modifier hyphenation.
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
              Adjective বা বিশেষণ Noun বা Pronoun-এর গুণ, অবস্থা, পরিমাণ বা নির্দিষ্টতা প্রকাশ করে। একাধিক Adjective একসাথে ব্যবহারের সময় ইংরেজি ভাষায় একটি নির্দিষ্ট আন্তর্জাতিক ক্রম (<strong>OSASCOMP</strong>) অনুসরণ করতে হয়।
            </div>
          )}
        </header>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: INTERACTIVE OSASCOMP ROYAL ADJECTIVE ORDER STUDIO          */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Crown className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. The Royal Order of Adjectives (OSASCOMP)</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Opinion → Size → Age → Shape → Color → Origin → Material → Purpose + Head Noun
              </p>
            </div>
          </div>

          {/* Real-time Sentence Preview Box */}
          <div className="bg-slate-950 rounded-xl p-6 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                Synthesized Sentence Output
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-mono">
                OSASCOMP Compliant
              </span>
            </div>
            <p className="text-lg sm:text-2xl font-bold text-white leading-relaxed">
              "She bought a{" "}
              <span className="text-rose-400 underline decoration-rose-500/50" title="Opinion">{selectedOSASCOMP.opinion}</span>{" "}
              <span className="text-sky-400 underline decoration-sky-500/50" title="Size">{selectedOSASCOMP.size}</span>{" "}
              <span className="text-emerald-400 underline decoration-emerald-500/50" title="Age">{selectedOSASCOMP.age}</span>{" "}
              <span className="text-purple-400 underline decoration-purple-500/50" title="Shape">{selectedOSASCOMP.shape}</span>{" "}
              <span className="text-amber-400 underline decoration-amber-500/50" title="Color">{selectedOSASCOMP.color}</span>{" "}
              <span className="text-cyan-400 underline decoration-cyan-500/50" title="Origin">{selectedOSASCOMP.origin}</span>{" "}
              <span className="text-orange-400 underline decoration-orange-500/50" title="Material">{selectedOSASCOMP.material}</span>{" "}
              <span className="text-pink-400 underline decoration-pink-500/50" title="Purpose">{selectedOSASCOMP.purpose}</span>{" "}
              table."
            </p>

            {showBengali && (
              <p className="text-xs text-amber-200/90 pt-2 border-t border-slate-800 animate-fade-in">
                <strong>বাংলা ব্যাখ্যা:</strong> একাধিক Adjective সাজানোর সূত্র: মতামত (Opinion) → আকার (Size) → বয়স/কাল (Age) → আকৃতি (Shape) → রঙ (Color) → উৎপত্তি (Origin) → উপাদান (Material) → উদ্দেশ্য (Purpose) + Noun।
              </p>
            )}
          </div>

          {/* OSASCOMP Selectors Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {Object.keys(osascompOptions).map((category, idx) => (
              <div key={category} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold capitalize text-slate-400">
                  <span>{idx + 1}. {category}</span>
                </div>
                <select
                  value={selectedOSASCOMP[category]}
                  onChange={(e) =>
                    setSelectedOSASCOMP((prev) => ({ ...prev, [category]: e.target.value }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg p-2 focus:ring-1 focus:ring-amber-400 focus:outline-none"
                >
                  {osascompOptions[category].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: ATTRIBUTIVE VS PREDICATIVE & "A-" ADJECTIVES               */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Layers className="w-6 h-6 text-indigo-400" />
            <div>
              <h2 className="text-xl font-bold text-white">2. Attributive vs Predicative Positions</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Discover why certain adjectives (especially those starting with 'a-') are strictly forbidden before a noun.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attributive vs Predicative Rules */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">
                Position Matrix
              </h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="font-bold text-cyan-400">Attributive Position:</span> Placed directly <strong>before</strong> the noun.
                  <p className="text-slate-300 mt-1 italic">"The <span className="text-cyan-300 font-semibold">brave</span> soldier advanced."</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="font-bold text-emerald-400">Predicative Position:</span> Placed <strong>after</strong> a linking verb as subject complement.
                  <p className="text-slate-300 mt-1 italic">"The soldier was <span className="text-emerald-300 font-semibold">brave</span>."</p>
                </div>
              </div>
            </div>

            {/* The 'A-' Prefix Invariants */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-amber-900/40 space-y-3">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Predicative-Only 'A-' Adjectives
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Words like <strong>asleep, afraid, alive, alike, aware, ashamed, alone</strong> cannot precede a noun:
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded bg-rose-950/30 border border-rose-500/30 text-rose-300">
                  ✗ <em>"The asleep child looked peaceful."</em> (Grammatically Incorrect)
                </div>
                <div className="p-2 rounded bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
                  ✓ <em>"The sleeping child looked peaceful."</em> (Attributive uses participle)
                </div>
                <div className="p-2 rounded bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
                  ✓ <em>"The child was asleep."</em> (Predicative position is correct)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SECTION 3: PARTICIPIAL ADJECTIVES (-ING VS -ED)                        */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Activity className="w-6 h-6 text-cyan-400" />
            <div>
              <h2 className="text-xl font-bold text-white">3. Participial Adjectives: -ing vs -ed</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                -ing = Cause/Source of emotion (Active) | -ed = Experiencing the emotion (Passive)
              </p>
            </div>
          </div>

          {/* Interactive Participle Switcher */}
          <div className="flex gap-2 border-b border-slate-800 pb-4">
            {Object.keys(participlePairs).map((key) => (
              <button
                key={key}
                onClick={() => setActiveParticipleTab(key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                  activeParticipleTab === key
                    ? "bg-cyan-600 text-white shadow-lg"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {key} / {participlePairs[key].passive.toLowerCase()}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* -ing Card */}
            <div className="p-5 rounded-xl bg-slate-950 border border-cyan-900/40 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                -ing Participle (Active / Source)
              </span>
              <h4 className="text-xl font-extrabold text-white">
                {participlePairs[activeParticipleTab].active}
              </h4>
              <p className="text-sm text-slate-300">
                {participlePairs[activeParticipleTab].activeContext}
              </p>
              {showBengali && (
                <p className="text-xs text-amber-200/90 pt-1">
                  <strong>বাংলা:</strong> {participlePairs[activeParticipleTab].activeBn}
                </p>
              )}
            </div>

            {/* -ed Card */}
            <div className="p-5 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                -ed Participle (Passive / Receiver)
              </span>
              <h4 className="text-xl font-extrabold text-white">
                {participlePairs[activeParticipleTab].passive}
              </h4>
              <p className="text-sm text-slate-300">
                {participlePairs[activeParticipleTab].passiveContext}
              </p>
              {showBengali && (
                <p className="text-xs text-amber-200/90 pt-1">
                  <strong>বাংলা:</strong> {participlePairs[activeParticipleTab].passiveBn}
                </p>
              )}
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
                <h2 className="text-xl font-bold text-white">4. Module 003.001 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive test on OSASCOMP hierarchy, predicative 'a-' adjectives, participial modifiers, and compound adjective units.
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
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-amber-600/30 transition-all"
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
          <PlainTextPrint content={noteText} title="Module 003.001 Study Note - Adjective Classification & OSASCOMP" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            faqList={[
              {
                question: "What does the OSASCOMP acronym stand for?",
                answer: "OSASCOMP stands for Opinion, Size, Age, Shape, Color, Origin, Material, and Purpose. It is the natural syntactic sequence for ordering multiple adjectives before a noun in English."
              },
              {
                question: "Why can't we say 'The afraid dog barked'?",
                answer: "Adjectives derived with the 'a-' prefix (afraid, asleep, alive, alike, aware) are purely predicative. They can only function following a linking verb (e.g. 'The dog was afraid'). Attributively, we use a participle or alternative adjective ('The frightened dog')."
              },
              {
                question: "Why is 'a five-star hotel' singular rather than 'five-stars'?",
                answer: "When a noun acts as part of a compound adjective modifier before a head noun, it functions adjectivally and cannot take plural inflection in English."
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
