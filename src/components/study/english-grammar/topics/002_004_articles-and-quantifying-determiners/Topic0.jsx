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
  Volume2,
  Compass,
  Building,
  Scale
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [activePhoneticWord, setActivePhoneticWord] = useState(0);
  const [selectedInstitutionMode, setSelectedInstitutionMode] = useState("primary");
  const [selectedQuantifierType, setSelectedQuantifierType] = useState("uncountable");
  const [selectedQuantifierLevel, setSelectedQuantifierLevel] = useState("few");

  // Phonetic Sound Law Interactive Data
  const phoneticWords = [
    {
      word: "European",
      article: "a",
      phonetic: "/ˌjʊərəˈpiːən/",
      initialSound: "Consonant glide /j/ (yoo sound)",
      explanation: "Although it begins with the vowel letters 'Eu', the initial sound is the semi-vowel consonant /j/. Hence 'a European'.",
      explanationBn: "শব্দটি 'Eu' দিয়ে শুরু হলেও এর উচ্চারণ /j/ (ইউ) ব্যঞ্জনধ্বনির মতো। তাই এর আগে 'a' বসে।"
    },
    {
      word: "MBA graduate",
      article: "an",
      phonetic: "/ˌem.biːˈeɪ/",
      initialSound: "Vowel sound /e/ (em sound)",
      explanation: "The letter 'M' in abbreviations is pronounced /em/, beginning with the short vowel /e/. Hence 'an MBA'.",
      explanationBn: "সংক্ষিপ্ত রূপ 'MBA'-এর প্রথম বর্ণ 'M' উচ্চারণে /e/ (এম্) স্বরধ্বনি আসে। তাই এর আগে 'an' বসে।"
    },
    {
      word: "Honest man",
      article: "an",
      phonetic: "/ˈɒnɪst/",
      initialSound: "Silent 'H', vowel sound /ɒ/",
      explanation: "The 'h' is completely silent. The word begins with the open vowel sound /ɒ/. Hence 'an honest man'.",
      explanationBn: "'Honest' শব্দে 'h' অনুচ্চারিত (silent) থাকে এবং উচ্চারণ /ɒ/ (অ) স্বরধ্বনি দিয়ে শুরু হয়। তাই 'an' বসে।"
    },
    {
      word: "University",
      article: "a",
      phonetic: "/ˌjuːnɪˈvɜːrsəti/",
      initialSound: "Consonant sound /j/ (yoo sound)",
      explanation: "The initial letter 'u' produces the consonant diphthong /juː/ (you). Hence 'a university'.",
      explanationBn: "'University'-এর 'u'-এর উচ্চারণ যখন 'ইউ' (/juː/)-এর মতো হয়, তখন তা ব্যঞ্জনধ্বনি গণ্য হয় এবং 'a' বসে।"
    },
    {
      word: "One-rupee note",
      article: "a",
      phonetic: "/wʌn/",
      initialSound: "Consonant sound /w/ (wa sound)",
      explanation: "The word 'one' begins with the consonant glide /w/ (wun). Hence 'a one-rupee note'.",
      explanationBn: "'One' শব্দের উচ্চারণ 'ওয়া' (/w/)-এর মতো, যা ব্যঞ্জনধ্বনি। তাই 'a one-rupee note' হয়।"
    },
    {
      word: "FIR",
      article: "an",
      phonetic: "/ˌef.aɪˈɑːr/",
      initialSound: "Vowel sound /e/ (ef sound)",
      explanation: "The abbreviation 'FIR' starts with the spoken letter sound /ef/ (vowel /e/). Hence 'an FIR'.",
      explanationBn: "'FIR' বলতে প্রথমে /e/ (এফ) স্বরধ্বনি আসে। তাই 'an FIR' সঠিক।"
    }
  ];

  // Institution Primary vs Secondary Purpose Interactive Data
  const institutionExamples = {
    primary: [
      { place: "School / College", sentence: "The children go to school at 8 AM.", context: "Primary purpose: Going there to study as students. (No article)" },
      { place: "Hospital", sentence: "The injured victim was rushed to hospital.", context: "Primary purpose: Admitted as a patient for medical treatment. (No article)" },
      { place: "Prison / Jail", sentence: "The burglar was sentenced to three years in prison.", context: "Primary purpose: Incarcerated as a convicted inmate. (No article)" },
      { place: "Church / Temple", sentence: "They go to church every Sunday morning.", context: "Primary purpose: Worship and prayer. (No article)" }
    ],
    secondary: [
      { place: "The School", sentence: "The father went to the school to meet the principal.", context: "Secondary purpose: Visiting for administrative/parental inquiry. (Requires 'the')" },
      { place: "The Hospital", sentence: "I went to the hospital to visit my sick colleague.", context: "Secondary purpose: Visiting a patient, not admitted as a patient. (Requires 'the')" },
      { place: "The Prison", sentence: "The human rights inspector visited the prison.", context: "Secondary purpose: Inspecting facilities, not serving a prison sentence. (Requires 'the')" },
      { place: "The Church", sentence: "Tourists gathered outside the church to admire its architecture.", context: "Secondary purpose: Sightseeing/architecture, not religious worship. (Requires 'the')" }
    ]
  };

  // Quantifier Matrix Data
  const quantifierData = {
    uncountable: {
      scarce: {
        term: "Little",
        meaning: "Almost none / virtually zero (Negative implication)",
        example: "There is little water in the desert. (Hardly any to survive)",
        meaningBn: "নেই বললেই চলে (নেতিবাচক অর্থ)"
      },
      positive: {
        term: "A little",
        meaning: "A small quantity / some (Positive implication)",
        example: "There is a little milk left, enough to make a cup of tea.",
        meaningBn: "কিছুটা আছে / অল্প পরিমাণ (ইতিবাচক অর্থ)"
      },
      specific: {
        term: "The little",
        meaning: "All of that specific remaining quantity",
        example: "The kitten drank the little milk that was in the bowl.",
        meaningBn: "যেটুকু অল্প ছিল তার সম্পূর্ণ অংশ"
      }
    },
    countable: {
      scarce: {
        term: "Few",
        meaning: "Almost none / negligible number (Negative implication)",
        example: "He is an introvert and has few friends.",
        meaningBn: "নেই বললেই চলে / সংখ্যায় নগণ্য (নেতিবাচক অর্থ)"
      },
      positive: {
        term: "A few",
        meaning: "A small number / some (Positive implication)",
        example: "A few students cleared the preliminary round.",
        meaningBn: "অল্প কিছু / কয়েকটি (ইতিবাচক অর্থ)"
      },
      specific: {
        term: "The few",
        meaning: "All of that specific remaining small number",
        example: "The few books he possessed were destroyed in the fire.",
        meaningBn: "যে কটি অল্প সংখ্যায় ছিল তার সবগুলো"
      }
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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-cyan-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Module 002.004 • Nominal Domain
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Articles & Quantifying Determiners
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the phonetic sound rules for <span className="text-cyan-400 font-semibold">A / An</span>, the 20+ invariant laws of <span className="text-indigo-400 font-semibold">The</span>, zero-article omission contexts, and the precise matrix of <span className="text-emerald-400 font-semibold">Little vs Few</span>.
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
              বাংলা ভাষায় নির্দিষ্ট বা অনির্দিষ্টতা বোঝাতে পদাশ্রিত নির্দেশক (যেমন: ‘-টি’, ‘-টা’, ‘-খানা’) ব্যবহৃত হয়। কিন্তু ইংরেজিতে <strong>Articles</strong> (A, An, The) ও <strong>Determiners</strong> শব্দ গঠনের চেয়ে ধ্বনিগত উচ্চারণ (Phonetics) এবং ব্যাকরণিক সুনির্দিষ্টতার ওপর ভিত্তি করে নিয়ন্ত্রিত হয়।
            </div>
          )}
        </header>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: PHONETIC SOUND LAW LAB (A vs AN)                            */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Volume2 className="w-6 h-6 text-cyan-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. The Phonetic Sound Law: 'A' vs 'An'</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                The choice between 'a' and 'an' depends strictly on the <strong>initial sound</strong> of the following word, not its written spelling.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Word Selector List */}
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Select Test Word:</span>
              <div className="flex flex-col gap-2">
                {phoneticWords.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhoneticWord(idx)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                      activePhoneticWord === idx
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50"
                        : "bg-slate-800/60 text-slate-300 hover:bg-slate-800 border border-slate-700/50"
                    }`}
                  >
                    <span>{item.word}</span>
                    <span className={`px-2 py-0.5 rounded text-xs uppercase font-mono ${item.article === "an" ? "bg-amber-500/20 text-amber-300" : "bg-cyan-500/20 text-cyan-300"}`}>
                      {item.article}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Phonetic Breakdown Card */}
            <div className="md:col-span-2 bg-slate-950/80 rounded-xl p-6 border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-slate-500 font-mono">Phonetic Sound Analysis</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
                    {phoneticWords[activePhoneticWord].phonetic}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-3xl font-extrabold text-cyan-400">
                    {phoneticWords[activePhoneticWord].article.toUpperCase()}
                  </span>
                  <span className="text-2xl font-bold text-white">
                    {phoneticWords[activePhoneticWord].word}
                  </span>
                </div>
                <p className="mt-2 text-sm text-cyan-300 font-medium">
                  Initial Sound: {phoneticWords[activePhoneticWord].initialSound}
                </p>
                <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                  {phoneticWords[activePhoneticWord].explanation}
                </p>
              </div>

              {showBengali && (
                <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 animate-fade-in">
                  <strong>বাংলা নিয়ম:</strong> {phoneticWords[activePhoneticWord].explanationBn}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: THE DEFINITE ARTICLE & ZERO ARTICLE DOMAIN                 */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Compass className="w-6 h-6 text-indigo-400" />
            <div>
              <h2 className="text-xl font-bold text-white">2. Definite Article ('The') vs Zero Article (Ø)</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Key geographic invariants, parallel comparative structures, and the famous <strong>Primary vs Secondary Purpose</strong> distinction.
              </p>
            </div>
          </div>

          {/* Interactive Primary vs Secondary Purpose Explorer */}
          <div className="bg-slate-950/70 rounded-xl p-5 border border-indigo-900/40 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                <Building className="w-4 h-4 text-indigo-400" />
                Institutional Context Law (School, Hospital, Prison, Church)
              </span>
              <div className="inline-flex rounded-lg bg-slate-800 p-1 border border-slate-700">
                <button
                  onClick={() => setSelectedInstitutionMode("primary")}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    selectedInstitutionMode === "primary"
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Primary Purpose (Ø No Article)
                </button>
                <button
                  onClick={() => setSelectedInstitutionMode("secondary")}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    selectedInstitutionMode === "secondary"
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Secondary Purpose (Use 'The')
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {institutionExamples[selectedInstitutionMode].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-300">{item.place}</span>
                    <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${selectedInstitutionMode === "primary" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
                      {selectedInstitutionMode === "primary" ? "Zero Article" : "Definite 'The'"}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">"{item.sentence}"</p>
                  <p className="text-xs text-slate-400">{item.context}</p>
                </div>
              ))}
            </div>

            {showBengali && (
              <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 animate-fade-in">
                <strong>মনে রাখার কৌশল:</strong> কোনো প্রতিষ্ঠান যদি তার মূল উদ্দেশ্যে ব্যবহৃত হয় (যেমন রোগী হিসেবে হাসপাতালে ভর্তি হওয়া, ছাত্র হিসেবে স্কুলে যাওয়া) তখন কোনো Article বসে না। কিন্তু অভিভাবক বা পরিদর্শক হিসেবে গেলে 'The' অবশ্যই বসবে।
              </div>
            )}
          </div>

          {/* Quick Reference Invariant Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Geography Trap</span>
              <h4 className="text-sm font-bold text-white">Mountain Range vs Single Peak</h4>
              <p className="text-xs text-slate-300">
                ✓ <strong>The Himalayas</strong> (Mountain Range)<br />
                ✗ <em>The Mount Everest</em> (Wrong)<br />
                ✓ <strong>Mount Everest</strong> (Single Peak takes NO article)
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Parallel Comparison</span>
              <h4 className="text-sm font-bold text-white">The + Comparative Formula</h4>
              <p className="text-xs text-slate-300">
                "<strong>The</strong> higher you climb, <strong>the</strong> colder it gets."<br />
                "<strong>The</strong> more you practice, <strong>the</strong> better you perform."
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Plural Nominal Adjective</span>
              <h4 className="text-sm font-bold text-white">The + Adjective = Plural Noun</h4>
              <p className="text-xs text-slate-300">
                "<strong>The rich</strong> are not always happy." (= rich people)<br />
                "We must support <strong>the underprivileged</strong>."
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SECTION 3: QUANTIFYING DETERMINERS LAB (LITTLE VS FEW MATRIX)          */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Scale className="w-6 h-6 text-emerald-400" />
            <div>
              <h2 className="text-xl font-bold text-white">3. Quantifying Determiner Spectrum</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Understand the delicate semantic boundaries between negative scarcity, positive sufficiency, and specific total quantities.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="inline-flex rounded-lg bg-slate-800 p-1 border border-slate-700">
              <button
                onClick={() => setSelectedQuantifierType("uncountable")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  selectedQuantifierType === "uncountable"
                    ? "bg-emerald-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Uncountable (Little / Quantity)
              </button>
              <button
                onClick={() => setSelectedQuantifierType("countable")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  selectedQuantifierType === "countable"
                    ? "bg-emerald-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Countable Plural (Few / Number)
              </button>
            </div>

            {/* Level Selector */}
            <div className="flex gap-2">
              {["scarce", "positive", "specific"].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedQuantifierLevel(level)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize border transition-all ${
                    selectedQuantifierLevel === level
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                      : "bg-slate-800/60 text-slate-400 border-slate-700/50 hover:text-slate-200"
                  }`}
                >
                  {level === "scarce" ? "1. Bare (Scarce)" : level === "positive" ? "2. 'A' (Some)" : "3. 'The' (Specific)"}
                </button>
              ))}
            </div>
          </div>

          {/* Active Quantifier Display Card */}
          <div className="bg-slate-950/80 rounded-xl p-6 border border-emerald-900/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold text-emerald-400">
                {quantifierData[selectedQuantifierType][selectedQuantifierLevel].term}
              </span>
              <span className="text-xs uppercase font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                {selectedQuantifierType.toUpperCase()}
              </span>
            </div>
            <p className="text-base text-slate-200 font-medium">
              Meaning: {quantifierData[selectedQuantifierType][selectedQuantifierLevel].meaning}
            </p>
            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Illustrative Sentence:</span>
              <p className="mt-1 text-sm font-semibold text-white">
                "{quantifierData[selectedQuantifierType][selectedQuantifierLevel].example}"
              </p>
            </div>
            {showBengali && (
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-600/30 text-xs text-emerald-200 animate-fade-in">
                <strong>বাংলা অর্থ:</strong> {quantifierData[selectedQuantifierType][selectedQuantifierLevel].meaningBn}
              </div>
            )}
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
                <h2 className="text-xl font-bold text-white">4. Module 002.004 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive evaluation covering phonetics, geographical definite articles, zero article omission, and quantifier logic.
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
                    <span className="text-xs font-bold text-cyan-400 font-mono">Q{qIndex + 1}.</span>
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
                        btnStyle = "bg-cyan-500/20 border-cyan-500 text-cyan-200 font-semibold";
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
                        <strong className="text-cyan-400">Explanation:</strong> {q.explanation}
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
                className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-cyan-600/30 transition-all"
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
          <PlainTextPrint content={noteText} title="Module 002.004 Study Note - Articles & Determiners" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            faqList={[
              {
                question: "Why do we say 'an MBA' but 'a Master of Business Administration'?",
                answer: "In the abbreviation 'MBA', the initial letter 'M' is pronounced starting with the short vowel /e/ ('em-bee-ay'). In full form, 'Master' begins with the consonant sound /m/ ('mas-ter'). Articles always follow phonetic spoken sound."
              },
              {
                question: "Why does 'Mount Everest' take no article, but 'The Himalayas' takes 'The'?",
                answer: "Standard English grammar dictates that solitary mountain peaks (Mount Everest, K2, Mount Blanc) take zero article (Ø). Plural mountain ranges (The Himalayas, The Alps, The Andes) always take the definite article 'The'."
              },
              {
                question: "What is the difference between 'few' and 'a few'?",
                answer: "'Few' has a negative sense and means 'almost none' or 'hardly any'. 'A few' has a positive sense and means 'at least some' or 'a small number'."
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
