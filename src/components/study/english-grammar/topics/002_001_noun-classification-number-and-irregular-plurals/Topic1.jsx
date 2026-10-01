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
  Box,
  Feather,
  Gem,
  Heart,
  Users,
  Building,
  Tag
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

export default function Topic1() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeClassTab, setActiveClassTab] = useState("proper");
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (qId, optionIdx) => {
    if (submitted) return;
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  const nounClasses = {
    proper: {
      name: "1. Proper Nouns (সংজ্ঞাবাচক বিশেষ্য)",
      tagline: "Unique, specific entities requiring initial capitalization",
      definition: "Names a specific person, place, day, month, monument, ocean, or organization.",
      rule: "Always begins with a capital letter regardless of position in a sentence.",
      examples: ["Sukanta Hui", "Barrackpore", "The Indian Ocean", "Sunday", "Microsoft"],
      bengaliExplanation: "নির্দিষ্ট কোনো ব্যক্তি, স্থান, নদী, পাহাড় বা প্রতিষ্ঠানের নিজস্ব নাম নির্দেশ করে। সর্বদা Capital Letter দিয়ে শুরু হয়।"
    },
    common: {
      name: "2. Common Nouns (জাতিবাচক বিশেষ্য)",
      tagline: "General names shared by every member of a category",
      definition: "Names any member of a generalized class of persons, animals, places, or things.",
      rule: "Can freely be singular or plural (city/cities, student/students, book/books).",
      examples: ["teacher", "engineer", "river", "mountain", "laptop", "university"],
      bengaliExplanation: "একজাতীয় কোনো ব্যক্তি, প্রাণী বা বস্তুর সাধারণ নাম। এটি একবচন ও বহুবচন উভয়ই হতে পারে।"
    },
    collective: {
      name: "3. Collective Nouns (সমষ্টিবাচক বিশেষ্য)",
      tagline: "Group of individuals regarded as a single unified body",
      definition: "Names a collection, assembly, or group of persons, animals, or objects.",
      rule: "Takes a singular verb when acting with single unified intent; takes plural verb when members act discordantly.",
      examples: ["A fleet of ships", "A pride of lions", "A herd of cattle", "Jury", "Committee", "Audience"],
      bengaliExplanation: "একজাতীয় ব্যক্তি, প্রাণী বা বস্তুর অবিভাজ্য সমষ্টিকে বোঝায় (যেমন: বিচারকমণ্ডলী, নৌবহর)।"
    },
    material: {
      name: "4. Material Nouns (বস্তুবাচক বা উপাদানবাচক বিশেষ্য)",
      tagline: "Raw substances & physical matter from which items are made",
      definition: "Names the uncounted matter, chemical substance, or raw commodity used to manufacture goods.",
      rule: "Typically uncountable in raw form; do not take indefinite articles 'a/an' directly.",
      examples: ["Gold", "Silver", "Iron", "Cotton", "Teak wood", "Milk", "Cement"],
      bengaliExplanation: "যে মূল পদার্থ বা উপাদান দিয়ে কোনো বস্তু তৈরি হয় তাকে Material Noun বলে (যেমন: কাঠ, সোনা, দুধ)।"
    },
    abstract: {
      name: "5. Abstract Nouns (গুণবাচক বা ভাববাচক বিশেষ্য)",
      tagline: "Intangible qualities, states, emotions, and concepts",
      definition: "Names qualities, actions, conditions, emotions, or academic disciplines that cannot be perceived by 5 physical senses.",
      rule: "Formed from adjectives (Honesty), verbs (Growth), or common nouns (Friendship).",
      examples: ["Bravery", "Integrity", "Kindness", "Freedom", "Childhood", "Wisdom", "Geometry"],
      bengaliExplanation: "যে গুণ, অবস্থা বা অনুভূতি ইন্দ্রিয় দিয়ে স্পর্শ বা দেখা যায় না, কেবল অনুভব করা যায় (যেমন: সততা, শৈশব)।"
    }
  };

  const derivationCatalog = [
    { type: "From Adjectives", list: ["Brave → Bravery", "Honest → Honesty", "Cruel → Cruelty", "Wise → Wisdom", "Strong → Strength"] },
    { type: "From Verbs", list: ["Obey → Obedience", "Grow → Growth", "Live → Life", "Choose → Choice", "Decide → Decision"] },
    { type: "From Common Nouns", list: ["Child -> Childhood", "Friend -> Friendship", "King -> Kingship", "Leader -> Leadership", "Hero -> Heroism"] }
  ];

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
        {/* Header with Language Switcher */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-amber-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <Tag className="w-3.5 h-3.5" />
                Module 002.001 • Topic 1
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                The 5 Traditional Classes of Nouns
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Deconstruct Proper, Common, Collective, Material, and Abstract nouns. Master abstract derivation patterns and avoid common categorization traps in competitive exams.
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
              <p className="font-semibold text-amber-300 mb-1">💡 বাংলা নির্দেশিকা (Topic 1):</p>
              ইংরেজি ব্যাকরণে বিশেষ্য পদকে ৫টি প্রধান শ্রেণীতে ভাগ করা হয়: <strong>Proper</strong> (নির্দিষ্ট নাম), <strong>Common</strong> (সাধারণ নাম), <strong>Collective</strong> (সমষ্টিবাচক), <strong>Material</strong> (উপাদানবাচক), এবং <strong>Abstract</strong> (গুণ/ভাববাচক)। নিচের ইন্টারেক্টিভ ল্যাবের সাহায্যে এদের বৈশিষ্ট্যগুলো শিখুন।
            </div>
          )}
        </header>

        {/* Section 1: The 5 Noun Classes Interactive Studio */}
        <section className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Box className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. The 5 Noun Classes Interactive Studio</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Click across the 5 categories to analyze syntactic characteristics, capitalization invariants, and exemplar sets.
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {Object.keys(nounClasses).map((key) => (
              <button
                key={key}
                onClick={() => setActiveClassTab(key)}
                className={`p-3 rounded-xl text-left text-xs font-semibold transition-all border ${
                  activeClassTab === key
                    ? "bg-amber-600 text-white border-amber-400 shadow-lg shadow-amber-950"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="font-mono text-[10px] uppercase opacity-75">Class</div>
                <div className="mt-0.5 font-bold truncate">{key.toUpperCase()}</div>
              </button>
            ))}
          </div>

          {/* Active Card */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-amber-300">
                {nounClasses[activeClassTab].name}
              </h3>
              <span className="text-xs text-slate-400 italic">
                {nounClasses[activeClassTab].tagline}
              </span>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed">
              <strong>Definition:</strong> {nounClasses[activeClassTab].definition}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                Grammatical Invariant Rule
              </span>
              <p className="text-xs text-slate-300">{nounClasses[activeClassTab].rule}</p>
            </div>

            {/* Exemplar Pills */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Exemplar Catalog:
              </span>
              <div className="flex flex-wrap gap-2">
                {nounClasses[activeClassTab].examples.map((ex, exIdx) => (
                  <span
                    key={exIdx}
                    className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-300"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            {showBengali && (
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed animate-fade-in">
                <strong>বাংলা সারসংক্ষেপ:</strong> {nounClasses[activeClassTab].bengaliExplanation}
              </div>
            )}
          </div>
        </section>

        {/* Section 2: Abstract Noun Derivation Matrix */}
        <section className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Feather className="w-6 h-6 text-purple-400" />
            <div>
              <h2 className="text-xl font-bold text-white">2. Abstract Noun Derivation Matrix</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                How abstract concepts are formed through morphological suffixation from Adjectives, Verbs, and Common Nouns.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {derivationCatalog.map((cat, cIdx) => (
              <div key={cIdx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-purple-400 uppercase font-mono tracking-wider block">
                  {cat.type}
                </span>
                <div className="space-y-1.5">
                  {cat.list.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Interactive MCQ Diagnostic Assessment */}
        <section className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-amber-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Topic Diagnostic Assessment</h2>
                <p className="text-xs text-slate-400">
                  10 Examination Questions with Instant Scoring and Bilingual Feedback
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
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-600/30 transition-all"
              >
                Submit Answers ({Object.keys(userAnswers).length} / {questions.length} answered)
              </button>
            </div>
          )}
        </section>

        {/* Section 4: Auxiliary Tools */}
        <section className="space-y-8">
          <PlainTextPrint content={noteText} title="Module 002.001 Topic 1 Study Note - 5 Classes of Nouns" />
          <WordDictionary />
          <Teacher note="Always remember: Proper Nouns represent specific identities and MUST be capitalized. Abstract Nouns represent intangible concepts that you can think about, but cannot touch! — Sukanta Hui" />
          <FAQTemplate
            faqList={[
              {
                question: "Can a Proper Noun ever be used as a Common Noun?",
                answer: "Yes. When a proper noun is used representatively to signify a person possessing the unique attributes of the original individual, it functions as a common noun and takes an article (e.g. 'He is the Newton of our college' or 'He thinks he is a Shakespeare')."
              },
              {
                question: "What is the difference between a Material Noun and a Common Noun?",
                answer: "A Material Noun denotes the unmanufactured raw substance from which objects are fabricated (e.g. 'wood', 'gold', 'cotton'). A Common Noun denotes the finished, countable individual object made from that material (e.g. 'chair', 'ring', 'shirt')."
              },
              {
                question: "How do you test if a word is an Abstract Noun?",
                answer: "The 5-Sense Test: If you cannot touch, taste, smell, hear, or physically see the entity itself (such as 'honesty', 'courage', 'freedom', 'wisdom'), it is an Abstract Noun."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/002_001_noun-classification-number-and-irregular-plurals/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Module 002_001 Overview (Topic 0)</span>
          </a>

          <a
            href="/english-grammar/topic/002_001_noun-classification-number-and-irregular-plurals/2"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 2 (Countable vs Uncountable Nouns)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
