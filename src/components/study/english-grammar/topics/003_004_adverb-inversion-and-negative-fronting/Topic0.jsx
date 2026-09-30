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
  Flame,
  ArrowUpDown,
  Shuffle,
  ShieldAlert,
  Compass
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeInversionKey, setActiveInversionKey] = useState("no_sooner_had");

  // Inversion Templates Data
  const inversionTemplates = {
    no_sooner_had: {
      name: "No sooner had ... than (Past Perfect)",
      trigger: "No sooner",
      auxiliary: "had",
      subject: "I",
      mainVerb: "entered the station",
      correlative: "than",
      secondClause: "the train departed.",
      formula: "No sooner + HAD + Subject + V3 + THAN + Subject + V2",
      explanationBn: "'No sooner'-এর সাথে সর্বদা 'than' বসে। 'had'-এর পর মূল Verb-এর V3 (Past Participle) বসে।"
    },
    no_sooner_did: {
      name: "No sooner did ... than (Simple Past)",
      trigger: "No sooner",
      auxiliary: "did",
      subject: "the bell",
      mainVerb: "ring",
      correlative: "than",
      secondClause: "the students left the hall.",
      formula: "No sooner + DID + Subject + V1 (Base) + THAN + Subject + V2",
      explanationBn: "'did' বসালে মূল Verb-এর Base Form (V1) বসে এবং জোড় হিসেবে 'than' বসে।"
    },
    hardly_when: {
      name: "Hardly had ... when",
      trigger: "Hardly",
      auxiliary: "had",
      subject: "he",
      mainVerb: "closed his eyes",
      correlative: "when",
      secondClause: "the telephone rang.",
      formula: "Hardly + HAD + Subject + V3 + WHEN + Subject + V2",
      explanationBn: "'Hardly' এবং 'Scarcely'-র সাথে নির্ধারিত জোড় হলো 'when', কখনোই 'than' বা 'then' নয়।"
    },
    not_only: {
      name: "Not only did ... but also",
      trigger: "Not only",
      auxiliary: "did",
      subject: "she",
      mainVerb: "win the national championship",
      correlative: "but she also",
      secondClause: "set a world record.",
      formula: "Not only + DID + Subject + V1 ..., BUT (Subject) ALSO...",
      explanationBn: "'Not only' শুরুতে বসলে কেবল প্রথম অংশটিতে Inversion ঘটে।"
    },
    never: {
      name: "Never have ... (Negative Fronting)",
      trigger: "Never",
      auxiliary: "have",
      subject: "I",
      mainVerb: "witnessed",
      correlative: "",
      secondClause: "such extraordinary resilience and fortitude.",
      formula: "Never + HAVE/HAS/HAD + Subject + V3 + ...",
      explanationBn: "'Never', 'Seldom', 'Rarely' দিয়ে বাক্য শুরু হলে Auxiliary Subject-এর আগে চলে আসে।"
    },
    conditional_had: {
      name: "Conditional Inversion (Had I known)",
      trigger: "Had",
      auxiliary: "",
      subject: "I",
      mainVerb: "known about your arrival",
      correlative: ",",
      secondClause: "I would have welcomed you at the airport.",
      formula: "HAD + Subject + V3 ..., Subject + would have + V3 (Omits 'If')",
      explanationBn: "Third Conditional-এ 'If' তুলে দিয়ে 'Had' প্রথমে এনে বাক্য গঠন করা হয়।"
    },
    locative: {
      name: "Locative Full Verb Inversion",
      trigger: "Down",
      auxiliary: "",
      subject: "the torrential monsoon rain",
      mainVerb: "came",
      correlative: "",
      secondClause: "",
      formula: "Directional Adverb + FULL VERB + Noun Subject",
      explanationBn: "দিকবাচক Adverb-এর পর Noun Subject থাকলে মূল Verb-টি সরাসরি Subject-এর পূর্বে বসে।"
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

  const currentTemplate = inversionTemplates[activeInversionKey];

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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-rose-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-rose-500/10 text-rose-300 border border-rose-500/30">
                <Flame className="w-3.5 h-3.5" />
                Module 003.004 • Modifying Sphere
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Adverb Inversion & Negative Fronting
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the advanced rhetorical power of <span className="text-rose-400 font-semibold">Subject-Auxiliary Inversion</span> triggered by <span className="text-amber-300 font-semibold">No sooner... than</span>, <span className="text-sky-400 font-semibold">Hardly... when</span>, fronted negatives, and conditional inversions.
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
              Inversion হলো স্বাভাবিক বাক্যরীতির (Subject + Verb) বিপরীতকরণ, যেখানে Auxiliary Verb Subject-এর পূর্বে বসে। যখন কোনো নেতিবাচক বা সীমাবদ্ধতাবোধক শব্দ (যেমন: <strong>No sooner, Hardly, Never, Seldom</strong>) দিয়ে বাক্য শুরু হয়, তখন Inversion হওয়া বাধ্যতামূলক।
            </div>
          )}
        </header>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: INTERACTIVE INVERSION ENGINE & GENERATOR                    */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <ArrowUpDown className="w-6 h-6 text-rose-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. Interactive Inversion Architecture Engine</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Select a structural template to inspect the precise constituent order: Trigger + Auxiliary + Subject + Main Verb + Correlative.
              </p>
            </div>
          </div>

          {/* Template Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(inversionTemplates).map((key) => (
              <button
                key={key}
                onClick={() => setActiveInversionKey(key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeInversionKey === key
                    ? "bg-rose-600 text-white font-bold shadow-lg shadow-rose-600/20"
                    : "bg-slate-800/70 text-slate-300 hover:bg-slate-800 border border-slate-700"
                }`}
              >
                {inversionTemplates[key].name}
              </button>
            ))}
          </div>

          {/* Real-time Inversion Visualizer Box */}
          <div className="bg-slate-950 rounded-xl p-6 border border-rose-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-rose-400">
                Syntactic Dissection
              </span>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                {currentTemplate.formula}
              </span>
            </div>

            {/* Inverted Sentence Display with Colored Tokens */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center gap-2 text-base sm:text-xl font-bold text-white">
              <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30" title="Fronted Trigger">
                {currentTemplate.trigger}
              </span>
              {currentTemplate.auxiliary && (
                <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30" title="Inverted Auxiliary">
                  {currentTemplate.auxiliary}
                </span>
              )}
              <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30" title="Subject">
                {currentTemplate.subject}
              </span>
              <span className="text-white" title="Main Verb Phrase">
                {currentTemplate.mainVerb}
              </span>
              {currentTemplate.correlative && (
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-extrabold" title="Correlative Particle">
                  {currentTemplate.correlative}
                </span>
              )}
              {currentTemplate.secondClause && (
                <span className="text-slate-300 font-normal">
                  {currentTemplate.secondClause}
                </span>
              )}
            </div>

            {showBengali && (
              <p className="text-xs text-amber-200/90 pt-1 animate-fade-in">
                <strong>বাংলা তাৎপর্য:</strong> {currentTemplate.explanationBn}
              </p>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: THE 3 FATAL CORRELATIVE TRAPS                               */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <ShieldAlert className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">2. High-Frequency Exam Invariant Traps</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Never confuse these correlative pairings in board or competitive examinations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Trap 1 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Trap 1: No Sooner Pairs</span>
              <h4 className="text-sm font-bold text-white">No Sooner ... THAN</h4>
              <p className="text-xs text-slate-300">
                ✗ <em>"No sooner had he arrived WHEN..."</em> (Wrong)<br />
                ✗ <em>"No sooner had he arrived THEN..."</em> (Wrong)<br />
                ✓ <strong>"No sooner had he arrived THAN..."</strong> (Correct)
              </p>
            </div>

            {/* Trap 2 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Trap 2: Hardly/Scarcely Pairs</span>
              <h4 className="text-sm font-bold text-white">Hardly / Scarcely ... WHEN</h4>
              <p className="text-xs text-slate-300">
                ✗ <em>"Hardly had we stepped out THAN..."</em> (Wrong)<br />
                ✓ <strong>"Hardly had we stepped out WHEN it rained."</strong> (Correct)
              </p>
            </div>

            {/* Trap 3 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Trap 3: Did + V1 Law</span>
              <h4 className="text-sm font-bold text-white">No Sooner DID + Base Verb</h4>
              <p className="text-xs text-slate-300">
                ✗ <em>"No sooner did the bell rang than..."</em> (Wrong)<br />
                ✓ <strong>"No sooner did the bell RING than..."</strong> (Correct)
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
                <h2 className="text-xl font-bold text-white">3. Module 003.004 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive test on negative fronting, correlative pairings (than vs when), conditional inversion, and locative inversion.
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
                className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all"
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
          <PlainTextPrint content={noteText} title="Module 003.004 Study Note - Adverb Inversion & Fronting" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            faqList={[
              {
                question: "Why does 'No sooner' pair with 'than' while 'Hardly' pairs with 'when'?",
                answer: "'No sooner' contains the comparative form 'sooner' and therefore requires the comparative particle 'than'. 'Hardly' and 'Scarcely' are restrictive adverbs of time and pair with the temporal conjunction 'when'."
              },
              {
                question: "What is the formula for Subject-Auxiliary Inversion after fronted negative words?",
                answer: "The formula is: Negative Adverb (Never, Seldom, Rarely, Hardly) + Auxiliary Verb (do/does/did/have/has/had/can) + Subject + Main Verb."
              },
              {
                question: "How does conditional inversion work without 'if'?",
                answer: "By moving the auxiliary to the beginning of the clause: 'If I had known' becomes 'Had I known', 'If you should need' becomes 'Should you need', and 'If I were' becomes 'Were I'."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/003_003_adverb-types-formation-and-positioning-rules/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Previous: Module 003_003 (Adverb Types & MPT)</span>
          </a>

          <a
            href="/english-grammar/topic/004_001_verb-classification-and-characteristics/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Module 004_001 (Verb Classification)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
