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
  Scale,
  Sliders,
  ShieldCheck,
  Split,
  Eye,
  Filter
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeCategory, setActiveCategory] = useState("parenthetical");
  const [activeRuleIdx, setActiveRuleIdx] = useState(0);

  // Concord Categorized Rules Data
  const concordCategories = {
    parenthetical: {
      name: "Parenthetical & Intervening Phrases",
      rules: [
        {
          title: "Rule 4 & 5: Along with / As well as / In addition to",
          formula: "Subject 1 + (along with / as well as + Noun) + VERB (Agrees with Subj 1)",
          example: "The captain, along with his entire crew, WAS rescued.",
          incorrect: "The captain, along with his entire crew, were rescued.",
          explanationBn: "'Along with', 'as well as', 'together with' ইত্যাদি থাকলে মাঝের অংশটি ব্র্যাকেটে রেখে প্রথম Subject ('The captain') অনুসারে Verb (was) নির্ধারণ করতে হয়।"
        },
        {
          title: "Rule 5: Prepositional Phrase Slicer (Of / In / For)",
          formula: "True Head Noun + [of + plural noun] + VERB (Agrees with Head Noun)",
          example: "The quality of these export-grade mangoes IS exceptional.",
          incorrect: "The quality of these export-grade mangoes are exceptional.",
          explanationBn: "আসল Subject হলো 'The quality' (Singular); Preposition 'of'-এর পরের 'mangoes' Verb-কে প্রভাবিত করে না।"
        }
      ]
    },
    proximity: {
      name: "Correlatives & Rule of Proximity",
      rules: [
        {
          title: "Rule 6: Either... Or / Neither... Nor",
          formula: "Either/Neither Subj 1 + or/nor + Subj 2 + VERB (Agrees with NEAREST Subj 2)",
          example: "Neither the teacher nor the students WERE present in the lab.",
          incorrect: "Neither the teacher nor the students was present in the lab.",
          explanationBn: "Rule of Proximity অনুসারে Verb-এর সবচেয়ে নিকটবর্তী Subject ('the students' = Plural) অনুযায়ী Verb (were) বসে।"
        },
        {
          title: "Rule 6B: Proximity Reversed",
          formula: "Either/Neither Plural Subj + or/nor + Singular Subj + SINGULAR VERB",
          example: "Neither the students nor the teacher WAS present.",
          incorrect: "Neither the students nor the teacher were present.",
          explanationBn: "এখানে নিকটতম Subject হলো 'the teacher' (Singular), তাই Verb হলো 'was'।"
        }
      ]
    },
    quantifiers: {
      name: "Quantifiers, Units & Numbers",
      rules: [
        {
          title: "Rule 18: 'A number of' vs 'The number of'",
          formula: "'A number of' + Plural Noun + PLURAL VERB | 'The number of' + Plural Noun + SINGULAR VERB",
          example: "A number of students ARE participating. / The number of students IS fifty.",
          incorrect: "A number of students is participating.",
          explanationBn: "'A number of' অর্থ 'অনেক' (Plural Verb 'are'); আর 'The number of' একটি নির্দিষ্ট সংখ্যা নির্দেশ করে (Singular Verb 'is')।"
        },
        {
          title: "Rule 16: Lump-sum Units (Money, Distance, Time)",
          formula: "Plural Unit of Measurement + SINGULAR VERB (When thought of as a whole)",
          example: "Ten kilometers IS a long distance to walk.",
          incorrect: "Ten kilometers are a long distance to walk.",
          explanationBn: "দূরত্ব, সময় বা টাকার মোট পরিমাণকে একটি একক সমষ্টি ধরলে Singular Verb ('is') বসে।"
        }
      ]
    },
    relatives: {
      name: "Relatives & Distributives",
      rules: [
        {
          title: "Rule 19: 'One of the... who' (Plural)",
          formula: "One of the + Plural Noun + who/that + PLURAL VERB",
          example: "Swadeep is one of the students who WERE selected.",
          incorrect: "Swadeep is one of the students who was selected.",
          explanationBn: "Relative Pronoun 'who'-র Antecedent হলো Plural Noun 'students', তাই Plural Verb 'were' বসবে।"
        },
        {
          title: "Rule 20: 'The ONLY one of the... who' (Singular)",
          formula: "The ONLY one of the + Plural Noun + who/that + SINGULAR VERB",
          example: "Swadeep is the ONLY one of the students who WAS selected.",
          incorrect: "Swadeep is the only one of the students who were selected.",
          explanationBn: "'The ONLY one' কথাটি মূল কর্তা হওয়ায় তা Singular এবং Verb 'was' গ্রহণ করে।"
        }
      ]
    },
    special: {
      name: "Special Nouns & SANAM Pronouns",
      rules: [
        {
          title: "Rule 11: SANAM Variable Pronouns (Some, Any, None, All, Most)",
          formula: "All/Some/None + of + Uncountable -> SINGULAR | of + Countable Plural -> PLURAL",
          example: "All the milk IS spoiled. / All the students ARE present.",
          incorrect: "All the milk are spoiled.",
          explanationBn: "'All of'-এর পর Uncountable Noun থাকলে Singular (is); Plural Noun থাকলে Plural (are) বসে।"
        },
        {
          title: "Rule 14: Always Plural Nouns (Police, Cattle, Scissors)",
          formula: "Police / Cattle / Scissors + PLURAL VERB (Always)",
          example: "The police ARE investigating the incident.",
          incorrect: "The police is investigating the incident.",
          explanationBn: "'Police', 'cattle', 'scissors' সর্বদা Plural Verb গ্রহণ করে।"
        }
      ]
    }
  };

  // 30 Interactive Questions State
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

  const activeCategoryRules = concordCategories[activeCategory].rules;
  const currentRule = activeCategoryRules[activeRuleIdx] || activeCategoryRules[0];

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
                <ShieldCheck className="w-3.5 h-3.5" />
                Module 004.002 • The Master Cornerstone
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Subject-Verb Agreement: 25 Rules of Concord
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                The most intensely tested grammar domain in board and competitive examinations. Master the <span className="text-amber-300 font-semibold">25 Invariant Concord Laws</span>, the Rule of Proximity, parenthetical phrase slicing, and relative pronoun agreement.
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
              Subject-Verb Agreement (বা Concord) হলো ইংরেজি ব্যাকরণের সবচেয়ে গুরুত্বপূর্ণ নিয়ম: Subject Singular হলে Verb Singular হবে, এবং Subject Plural হলে Verb Plural হবে। তবে 'along with', 'neither...nor', 'one of the...who' ইত্যাদি জটিল ক্ষেত্রে বিশেষ ২৫টি নিয়ম মেনে চলতে হয়।
            </div>
          )}
        </header>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: INTERACTIVE 25-RULE CONCORD NAVIGATOR                       */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Scale className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. Master Concord Interactive Navigator</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Filter by rule cluster to dissect formulas, canonical examples, and fatal error traps.
              </p>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(concordCategories).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActiveCategory(key);
                  setActiveRuleIdx(0);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === key
                    ? "bg-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-600/20"
                    : "bg-slate-800/70 text-slate-300 hover:bg-slate-800 border border-slate-700"
                }`}
              >
                {concordCategories[key].name}
              </button>
            ))}
          </div>

          {/* Rule Selector Sub-tabs */}
          <div className="flex gap-2 pt-1">
            {activeCategoryRules.map((r, idx) => (
              <button
                key={idx}
                onClick={() => setActiveRuleIdx(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  activeRuleIdx === idx
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                }`}
              >
                {r.title.split(":")[0]}
              </button>
            ))}
          </div>

          {/* Active Rule Details Card */}
          <div className="p-6 rounded-xl bg-slate-950 border border-amber-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {currentRule.title}
              </h3>
              <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Concord Invariant
              </span>
            </div>

            {/* Formula Banner */}
            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300">
              {currentRule.formula}
            </div>

            {/* Example vs Trap Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  ✓ Standard Correct Usage:
                </span>
                <p className="text-sm font-semibold text-white">
                  "{currentRule.example}"
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-rose-950/20 border border-rose-500/30 space-y-1">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  ✗ Common Fatal Error Trap:
                </span>
                <p className="text-sm font-semibold text-rose-300/90 line-through">
                  "{currentRule.incorrect}"
                </p>
              </div>
            </div>

            {showBengali && (
              <p className="text-xs text-amber-200/90 pt-2 border-t border-slate-800 animate-fade-in">
                <strong>বাংলা ব্যাখ্যা:</strong> {currentRule.explanationBn}
              </p>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: 30-QUESTION CONCORD CERTIFICATION MASTERY LAB               */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-amber-400" />
              <div>
                <h2 className="text-xl font-bold text-white">2. Module 004.002 Concord Certification Lab (30 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive 30-item exam-grade test covering all 25 invariant Subject-Verb Agreement rules.
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
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-600/30 transition-all"
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
          <PlainTextPrint content={noteText} title="Module 004.004 Study Note - 25 Concord Rules" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            faqList={[
              {
                question: "Why does 'The captain, along with his crew, was saved' use a singular verb?",
                answer: "Parenthetical phrases introduced by 'along with', 'as well as', 'together with', or 'in addition to' do not compound the subject. The verb agrees strictly with the first grammatical subject ('The captain' -> 'was saved')."
              },
              {
                question: "What is the difference between 'A number of students' and 'The number of students'?",
                answer: "'A number of students' means 'many students' and takes a PLURAL verb (e.g. 'A number of students ARE participating'). 'The number of students' refers to a specific single statistical count and takes a SINGULAR verb (e.g. 'The number of students IS fifty')."
              },
              {
                question: "How does the Rule of Proximity work with 'Either...or' and 'Neither...nor'?",
                answer: "When two subjects of differing numbers or persons are connected by 'either...or' or 'neither...nor', the finite verb agrees with the subject located physically closest to it (e.g. 'Neither the teacher nor the students WERE present' vs 'Neither the students nor the teacher WAS present')."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/004_003_causative-inchoative-and-ergative-verbs/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Previous: Module 004_003 (Causative & Ergative Verbs)</span>
          </a>

          <a
            href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Module 004_005 (Present Tenses)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
