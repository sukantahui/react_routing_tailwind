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
  Scissors,
  Repeat,
  Sliders,
  ShieldCheck,
  Eye,
  GitBranch
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeTab, setActiveTab] = useState("bare");
  const [synthesisMode, setSynthesisMode] = useState("too");

  // Infinitive Forms Data
  const infinitiveCategories = {
    bare: {
      title: "1. The Bare Infinitive (Without 'To')",
      triggers: "Modals, Causative Active (Make, Let, Bid), Sensory (See, Hear), 'Had better', 'Would rather'",
      example: "She made the boy weep. / You had better leave now.",
      trap: "Do NOT insert 'to' after active make/let or had better.",
      explanationBn: "Active Voice-এ Causative Verb (make, let) এবং 'had better', 'would rather'-এর পর 'to' ছাড়া Bare Infinitive বসে।"
    },
    noun: {
      title: "2. To-Infinitive as Noun (Subject / Object)",
      triggers: "Acts as Subject, Direct Object, or Subject Complement",
      example: "To err is human. / She decided to resign from her post.",
      trap: "Must retain full 'to + V1' form.",
      explanationBn: "বাক্যের Subject বা Object হিসেবে Noun-এর মতো কাজ করে: 'To err is human'।"
    },
    modifier: {
      title: "3. To-Infinitive as Modifier (Adjective / Adverb)",
      triggers: "Modifies Noun (Adjective) or Verb/Adjective (Adverb of Purpose/Result)",
      example: "I have no time to waste. (Adj) / He came to learn. (Adv)",
      trap: "Adverbial infinitives answer 'Why' or 'In what respect'.",
      explanationBn: "Noun-কে বিশেষিত করলে Adjective; আর উদ্দেশ্য বোঝালে Adverb of Purpose হিসেবে কাজ করে।"
    },
    complex: {
      title: "4. Complex Infinitives (Continuous & Perfect)",
      triggers: "Continuous (to be doing), Perfect (to have done), Passive (to be done)",
      example: "He claims to have completed the research. / There is work to be done.",
      trap: "Perfect infinitive refers to prior completed past time.",
      explanationBn: "'To have + V3' হলো Perfect Infinitive যা পূর্ববর্তী সম্পন্ন কাজকে প্রকাশ করে।"
    }
  };

  // Synthesis Data
  const synthesisData = {
    too: {
      title: "'Too... to' (Negative Inability: So... that cannot)",
      original: "He is very weak. He cannot walk without support.",
      synthesized: "He is TOO weak TO walk without support.",
      explanationBn: "'Too... to' নেতিবাচক অক্ষমতা প্রকাশে বাক্য সংযোজন করে।"
    },
    enough: {
      title: "'Enough to' (Positive Capability: So... that can)",
      original: "She is very intelligent. She can solve this complex equation.",
      synthesized: "She is intelligent ENOUGH TO solve this complex equation.",
      explanationBn: "ইতিবাচক সক্ষমতা প্রকাশে 'Adjective + enough to' বসে।"
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

  const currentTab = infinitiveCategories[activeTab];

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
                <GitBranch className="w-3.5 h-3.5" />
                Module 005.003 • Non-Finite Domain
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Non-Finite Verbs: The Infinitive
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the <span className="text-sky-400 font-semibold">To-Infinitive vs Bare Infinitive</span> dynamics, causative active vs passive shifts (<span className="text-amber-300 font-semibold">made write vs was made to write</span>), and <span className="text-emerald-400 font-semibold">Too... to / Enough to</span> synthesis.
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
              Infinitive হলো Non-Finite ক্রিয়ার একটি রূপ। এটি সাধারণত ‘to + Base Verb’ আকারে বসে Noun, Adjective বা Adverb-এর কাজ করে। তবে Causative Verb (make, let), Modals এবং 'had better'-এর পর ‘to’ ছাড়া <strong>Bare Infinitive</strong> বসে।
            </div>
          )}
        </header>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: INFINITIVE ARCHITECTURE STUDIO                              */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Layers className="w-6 h-6 text-sky-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. Infinitive Functional Architecture</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Explore the syntax and behavioral rules across all 4 infinitive roles.
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.keys(infinitiveCategories).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`p-3 rounded-xl text-xs font-bold transition-all border text-center ${
                  activeTab === key
                    ? "bg-sky-600 text-white border-sky-400 shadow-md font-extrabold"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                }`}
              >
                {infinitiveCategories[key].title.split(". ")[1]}
              </button>
            ))}
          </div>

          {/* Active Card */}
          <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-sky-300">
                {currentTab.title}
              </h3>
              <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
                Non-Finite Core
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-mono bg-slate-900 p-3 rounded-lg border border-slate-800">
              Triggers / Scope: {currentTab.triggers}
            </p>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Example:</span>
              <p className="text-sm sm:text-base font-semibold text-white">"{currentTab.example}"</p>
            </div>

            {showBengali && (
              <p className="text-xs text-amber-200/90 pt-1 border-t border-slate-800 animate-fade-in">
                <strong>বাংলা তাৎপর্য:</strong> {currentTab.explanationBn}
              </p>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: SYNTHESIS WORKBENCH (TOO... TO VS ENOUGH TO)                */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Repeat className="w-6 h-6 text-emerald-400" />
            <div>
              <h2 className="text-xl font-bold text-white">2. Sentence Synthesis: 'Too... to' vs 'Enough to'</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Combine two sentences into a single compact structure without altering original semantic meaning.
              </p>
            </div>
          </div>

          <div className="inline-flex rounded-lg bg-slate-800 p-1 border border-slate-700">
            <button
              onClick={() => setSynthesisMode("too")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                synthesisMode === "too"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              'Too... to' (Negative Inability)
            </button>
            <button
              onClick={() => setSynthesisMode("enough")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                synthesisMode === "enough"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              'Enough to' (Positive Capability)
            </button>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-4">
            <h3 className="text-base font-bold text-emerald-300">
              {synthesisData[synthesisMode].title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-semibold uppercase">Original Clauses:</span>
                <p className="text-sm text-slate-200">"{synthesisData[synthesisMode].original}"</p>
              </div>

              <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/40 space-y-1">
                <span className="text-xs text-emerald-400 font-semibold uppercase">Synthesized Structure:</span>
                <p className="text-sm font-bold text-emerald-200">"{synthesisData[synthesisMode].synthesized}"</p>
              </div>
            </div>

            {showBengali && (
              <p className="text-xs text-amber-200/90 pt-1 border-t border-slate-800 animate-fade-in">
                <strong>বাংলা ব্যাখ্যা:</strong> {synthesisData[synthesisMode].explanationBn}
              </p>
            )}
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
                <h2 className="text-xl font-bold text-white">3. Module 005.003 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive test on Bare Infinitives, causatives in passive voice, split infinitives, and synthesis.
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
          <PlainTextPrint content={noteText} title="Module 005.003 Study Note - Infinitives" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            faqList={[
              {
                question: "Why does causative 'make' take a bare infinitive in active voice but 'to-infinitive' in passive?",
                answer: "Standard historical English syntax dictates that causative verbs in active voice drop the prepositional particle 'to' ('She made him write'). When converted to passive voice, the particle 'to' is restored ('He was made TO write')."
              },
              {
                question: "What is the difference between 'too weak to walk' and 'strong enough to walk'?",
                answer: "'Too... to' carries a negative semantic meaning ('so weak that he cannot walk'). 'Enough to' carries a positive capability ('so strong that he can walk')."
              },
              {
                question: "What is a bare infinitive?",
                answer: "A bare infinitive is the base root form of a verb without the preceding particle 'to'. It is used after modal auxiliaries, active causative verbs (make, let), sensory verbs (see, hear), and idioms like 'had better' and 'would rather'."
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
