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
  Repeat,
  ShieldCheck,
  Shuffle,
  Eye,
  Sliders
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeVoiceCategory, setActiveVoiceCategory] = useState("tenses");
  const [activeVoiceItem, setActiveVoiceItem] = useState(0);

  // Voice Transformation Data
  const voiceCategories = {
    tenses: {
      name: "1. 8 Compatible Tenses",
      items: [
        {
          title: "Simple Present",
          active: "She writes a letter.",
          passive: "A letter is written by her.",
          formula: "Active: V1/V5 -> Passive: is/am/are + V3",
          explanationBn: "Simple Present-এ Passive রূপ: is/am/are + V3 (written)।"
        },
        {
          title: "Present Continuous",
          active: "She is writing a letter.",
          passive: "A letter is being written by her.",
          formula: "Active: is/am/are + V-ing -> Passive: is/am/are + BEING + V3",
          explanationBn: "Continuous-এ সর্বদা 'BEING + V3' যুক্ত হয়।"
        },
        {
          title: "Present Perfect",
          active: "She has written a letter.",
          passive: "A letter has been written by her.",
          formula: "Active: have/has + V3 -> Passive: have/has + BEEN + V3",
          explanationBn: "Perfect Tense-এ সর্বদা 'BEEN + V3' যুক্ত হয়।"
        },
        {
          title: "Simple Past",
          active: "She wrote a letter yesterday.",
          passive: "A letter was written by her yesterday.",
          formula: "Active: V2 (wrote) -> Passive: was/were + V3",
          explanationBn: "Simple Past-এ Passive রূপ: was/were + V3।"
        }
      ]
    },
    ditransitive: {
      name: "2. Ditransitive (Two Objects)",
      items: [
        {
          title: "Personal / Indirect Object as Subject (Preferred)",
          active: "The teacher taught us English grammar.",
          passive: "We were taught English grammar by the teacher.",
          formula: "Indirect Object ('us') -> New Subject ('We') + was/were + V3 + Direct Object",
          explanationBn: "ব্যক্তিবাচক Indirect Object 'us'-কে Subject ('We') করে রূপান্তর বেশি স্বাভাবিক।"
        },
        {
          title: "Direct Object as Subject",
          active: "The teacher taught us English grammar.",
          passive: "English grammar was taught to us by the teacher.",
          formula: "Direct Object ('grammar') -> New Subject + was/were + V3 + TO + Indirect Object",
          explanationBn: "Direct Object-কে Subject করলে Indirect Object-এর পূর্বে 'to' বসে।"
        }
      ]
    },
    interrogative: {
      name: "3. Interrogatives (Who / Whom)",
      items: [
        {
          title: "Who -> By Whom",
          active: "Who wrote the Mahabharata?",
          passive: "By whom was the Mahabharata written?",
          formula: "Who -> By whom + Auxiliary + Subject + V3?",
          explanationBn: "'Who' পরিবর্তিত হয়ে 'By whom' দিয়ে প্রশ্নবোধক রূপ তৈরি করে।"
        },
        {
          title: "Whom -> Who",
          active: "Whom did you invite to the seminar?",
          passive: "Who was invited by you to the seminar?",
          formula: "Whom (Object) -> Who (Subject) + was/were + V3?",
          explanationBn: "Object 'Whom' পরিবর্তিত হয়ে Subject 'Who'-তে পরিণত হয়।"
        }
      ]
    },
    imperative: {
      name: "4. Imperatives (Orders & Advice)",
      items: [
        {
          title: "Command / Order (Let Formula)",
          active: "Shut the door.",
          passive: "Let the door be shut.",
          formula: "Let + Object + be + V3",
          explanationBn: "আদেশসূচক বাক্যে 'Let + Object + be + V3' ব্যবহৃত হয়।"
        },
        {
          title: "Moral Advice (Should Formula)",
          active: "Help the poor and needy.",
          passive: "The poor and needy should be helped.",
          formula: "Object + should be + V3",
          explanationBn: "উপদেশ বা কর্তব্যের ক্ষেত্রে 'should be + V3' বসে।"
        },
        {
          title: "Polite Request",
          active: "Please grant me permission.",
          passive: "You are requested to grant me permission.",
          formula: "You are requested to + V1...",
          explanationBn: "অনুরোধে 'You are requested to...' ব্যবহৃত হয়।"
        }
      ]
    },
    special: {
      name: "5. Prepositional & Quasi-Passives",
      items: [
        {
          title: "Prepositional Verb (Retain Preposition!)",
          active: "They laughed at the poor beggar.",
          passive: "The poor beggar was laughed at by them.",
          formula: "Subject + was/were + V3 + FIXED PREPOSITION + by Agent",
          explanationBn: "'laughed at'-এর 'at' Preposition Passive-এ কখনো বাদ যাবে না।"
        },
        {
          title: "Quasi-Passive / Middle Voice",
          active: "Honey tastes sweet.",
          passive: "Honey is sweet when it is tasted.",
          formula: "Subject + is/are + Adjective + when it is/they are + V3",
          explanationBn: "Active গঠনে Passive অর্থ: 'Honey is sweet when it is tasted'।"
        },
        {
          title: "Special Preposition: Known TO",
          active: "I know him.",
          passive: "He is known to me. (NOT: by me)",
          formula: "Subject + is/am/are + known + TO + Agent",
          explanationBn: "'Know'-এর পর 'by'-এর বদলে Preposition 'to' বসে।"
        }
      ]
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

  const currentCategoryData = voiceCategories[activeVoiceCategory];
  const currentItem = currentCategoryData.items[activeVoiceItem] || currentCategoryData.items[0];

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
                <Repeat className="w-3.5 h-3.5" />
                Module 005.001 • Voice & Modals
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Active & Passive Voice Mechanics
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the universal <span className="text-rose-400 font-semibold">Be + V3</span> formula across all 8 passive-compatible tenses, ditransitive objects, interrogatives (<span className="text-sky-400 font-semibold">By whom</span>), imperatives, and quasi-passives.
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
              Voice বা বাচ্য ক্রিয়ার এমন একটি রূপ যা প্রকাশ করে Subject নিজে কাজটি করছে (Active), নাকি তার দ্বারা কাজটি সম্পাদিত হচ্ছে (Passive)। Passive Voice-এর মূল সূত্র হলো: <strong>Active Object → New Subject + Tense অনুযায়ী 'Be' Verb + V3 (Past Participle) + By + Agent</strong>।
            </div>
          )}
        </header>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: INTERACTIVE VOICE TRANSFORMATION STUDIO                     */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Repeat className="w-6 h-6 text-rose-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. Interactive Voice Transformation Studio</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Explore standard tenses, two-object ditransitives, Wh- questions, imperatives, and quasi-passives.
              </p>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(voiceCategories).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActiveVoiceCategory(key);
                  setActiveVoiceItem(0);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeVoiceCategory === key
                    ? "bg-rose-600 text-white font-bold shadow-lg shadow-rose-600/20"
                    : "bg-slate-800/70 text-slate-300 hover:bg-slate-800 border border-slate-700"
                }`}
              >
                {voiceCategories[key].name}
              </button>
            ))}
          </div>

          {/* Sub-item Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {currentCategoryData.items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveVoiceItem(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  activeVoiceItem === idx
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Active Transformation Card */}
          <div className="p-6 rounded-xl bg-slate-950 border border-rose-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {currentItem.title}
              </h3>
              <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
                Voice Paradigm
              </span>
            </div>

            {/* Formula */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-rose-300">
              {currentItem.formula}
            </div>

            {/* Active vs Passive Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  Active Voice (Agent Focus):
                </span>
                <p className="text-base font-semibold text-white">
                  "{currentItem.active}"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/40 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  Passive Voice (Receiver Focus):
                </span>
                <p className="text-base font-bold text-rose-200">
                  "{currentItem.passive}"
                </p>
              </div>
            </div>

            {showBengali && (
              <p className="text-xs text-amber-200/90 pt-2 border-t border-slate-800 animate-fade-in">
                <strong>বাংলা তাৎপর্য:</strong> {currentItem.explanationBn}
              </p>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: 25-QUESTION INTERACTIVE MASTERY QUIZ                        */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-amber-400" />
              <div>
                <h2 className="text-xl font-bold text-white">2. Module 005.001 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive test on active to passive transformations across tenses, modals, imperatives, and quasi-passives.
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
        {/* 4. PRINT & AUXILIARY STUDY TOOLS                                          */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <PlainTextPrint content={noteText} title="Module 005.001 Study Note - Active & Passive Voice Mechanics" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            faqList={[
              {
                question: "Why do Future Continuous and Perfect Continuous tenses lack passive voice?",
                answer: "Because forming a passive in these tenses requires stacking auxiliary forms of 'be' on top of 'being' (e.g. 'will be being written', 'has been being built'), which creates clunky and unidiomatic phrasing in standard English."
              },
              {
                question: "What is the passive form of 'Who wrote this book'?",
                answer: "'By whom was this book written?' (or informally 'Who was this book written by?')."
              },
              {
                question: "Why does 'He is known to me' use 'to' instead of 'by'?",
                answer: "Certain verbs in passive voice take fixed dependent prepositions rather than 'by'. 'Known' takes 'to', 'surprised/shocked' takes 'at', and 'filled/covered' takes 'with'."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/004_006_past-and-future-tenses-narrative-timelines/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Previous: Module 004_006 (Past & Future Tenses)</span>
          </a>

          <a
            href="/english-grammar/topic/005_002_modal-auxiliaries-and-semi-modals/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Module 005_002 (Modal Auxiliaries)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
