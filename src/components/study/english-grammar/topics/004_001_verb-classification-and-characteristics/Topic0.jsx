import React, { useState, useMemo } from "react";
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
  Activity,
  Brain,
  Heart,
  Eye,
  Box,
  Sliders,
  ShieldAlert,
  ArrowLeftRight,
  Table,
  Search,
  Filter,
  CheckCircle
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeDualVerb, setActiveDualVerb] = useState("have");
  const [activeLieTab, setActiveLieTab] = useState("recline");
  const [auxCategoryFilter, setAuxCategoryFilter] = useState("all");
  const [auxSearchQuery, setAuxSearchQuery] = useState("");

  // =========================================================================
  // THE MASTER 26 AUXILIARY VERBS CATALOG DATA
  // =========================================================================
  const auxiliaryVerbsData = [
    // --- 1. PRIMARY AUXILIARIES: BE (8 FORMS) ---
    {
      id: 1,
      name: "be",
      category: "primary_be",
      categoryLabel: "Primary (Be)",
      negative: "(be not)",
      function: "Base infinitive auxiliary / Imperatives / Subjunctive constructions / Modals",
      example: "She will be studying for the civil service exam tomorrow.",
      meaningBn: "মূল ভিত্তি রূপ: হওয়া / থাকা / ভবিষ্যৎ ও অনুজ্ঞামূলক বাক্যে সাহায্যকারী"
    },
    {
      id: 2,
      name: "am",
      category: "primary_be",
      categoryLabel: "Primary (Be)",
      negative: "am not / aren't I? / ain't",
      function: "1st Person Singular Present Continuous auxiliary & Copula",
      example: "I am analyzing the complete 26 auxiliary verb taxonomy.",
      meaningBn: "উত্তম পুরুষ একবচন: আমি হচ্ছি / করছি / আছি"
    },
    {
      id: 3,
      name: "is",
      category: "primary_be",
      categoryLabel: "Primary (Be)",
      negative: "isn't",
      function: "3rd Person Singular Present Continuous auxiliary & Copula",
      example: "Swadeep is revising the 25 invariant rules of concord.",
      meaningBn: "প্রথম পুরুষ একবচন: সে হচ্ছে / করছে / আছে"
    },
    {
      id: 4,
      name: "are",
      category: "primary_be",
      categoryLabel: "Primary (Be)",
      negative: "aren't",
      function: "2nd Person & Plural Present Continuous auxiliary & Copula",
      example: "We are preparing for competitive board and entrance exams.",
      meaningBn: "মধ্যম পুরুষ ও বহুবচন: তোমরা/আমরা হচ্ছি / করছি / আছ"
    },
    {
      id: 5,
      name: "was",
      category: "primary_be",
      categoryLabel: "Primary (Be)",
      negative: "wasn't",
      function: "1st & 3rd Person Singular Past Continuous & Passive voice auxiliary",
      example: "The critical document was transcribed by the chief clerk.",
      meaningBn: "একবচন অতীত কাল: সে করছিল / হচ্ছিল / ছিল"
    },
    {
      id: 6,
      name: "were",
      category: "primary_be",
      categoryLabel: "Primary (Be)",
      negative: "weren't",
      function: "Plural & 2nd Person Past Continuous & Hypothetical Subjunctive",
      example: "If I were in your position, I would accept the scholarship.",
      meaningBn: "বহুবচন অতীত কাল ও কাল্পনিক শর্তে: তারা করছিল / যদি হতাম"
    },
    {
      id: 7,
      name: "been",
      category: "primary_be",
      categoryLabel: "Primary (Be)",
      negative: "(hasn't/haven't been)",
      function: "Past Participle (V3) auxiliary for Perfect Aspects & Passive Voice",
      example: "She has been mentoring Barrackpore students since 2015.",
      meaningBn: "পুরাঘটিত কাল ও কর্মবাচ্যে সহায়ক রূপ (Past Participle V3)"
    },
    {
      id: 8,
      name: "being",
      category: "primary_be",
      categoryLabel: "Primary (Be)",
      negative: "(isn't/wasn't being)",
      function: "Present Participle (V4) auxiliary for Continuous Passive Voice",
      example: "The experimental module is being verified for accuracy.",
      meaningBn: "ঘটমান কর্মবাচ্যে (Continuous Passive) সহায়ক রূপ (V4)"
    },

    // --- 2. PRIMARY AUXILIARIES: HAVE (3 FORMS) ---
    {
      id: 9,
      name: "have",
      category: "primary_have",
      categoryLabel: "Primary (Have)",
      negative: "haven't",
      function: "Present Perfect Aspect auxiliary & Causative delegation",
      example: "I have mastered the complete classification of verbs.",
      meaningBn: "উত্তম ও বহুবচনে পুরাঘটিত কাল (Present Perfect) গঠন"
    },
    {
      id: 10,
      name: "has",
      category: "primary_have",
      categoryLabel: "Primary (Have)",
      negative: "hasn't",
      function: "3rd Person Singular Present Perfect Aspect auxiliary",
      example: "The scholar has completed three authoritative volumes.",
      meaningBn: "প্রথম পুরুষ একবচনে পুরাঘটিত কাল গঠন (has + V3)"
    },
    {
      id: 11,
      name: "had",
      category: "primary_have",
      categoryLabel: "Primary (Have)",
      negative: "hadn't",
      function: "Past Perfect Aspect ('Past of the Past') & Past Conditionals",
      example: "The train had departed before we reached the railway station.",
      meaningBn: "পুরাঘটিত অতীত (Past Perfect) ও অতীত শর্তে সহায়ক (had + V3)"
    },

    // --- 3. PRIMARY AUXILIARIES: DO (3 FORMS) ---
    {
      id: 12,
      name: "do",
      category: "primary_do",
      categoryLabel: "Primary (Do)",
      negative: "don't",
      function: "Dummy auxiliary for Simple Present Negation, Interrogation & Emphasis",
      example: "I do understand the nuances of English sentence architecture.",
      meaningBn: "প্রশ্ন, নাবাচক ও বাক্যে জোর প্রদানকারী সহায়ক ক্রিয়া (Dummy Aux)"
    },
    {
      id: 13,
      name: "does",
      category: "primary_do",
      categoryLabel: "Primary (Do)",
      negative: "doesn't",
      function: "3rd Person Singular Simple Present Negation & Interrogation",
      example: "Does the professor explain the anomalous finites clearly?",
      meaningBn: "৩য় ব্যক্তি একবচনে সাধারণ বর্তমান কালে প্রশ্ন ও নাবাচক সহায়ক"
    },
    {
      id: 14,
      name: "did",
      category: "primary_do",
      categoryLabel: "Primary (Do)",
      negative: "didn't",
      function: "Simple Past Negation, Interrogation & Inverted Emphasis",
      example: "He did not hesitate when the examination commenced.",
      meaningBn: "সাধারণ অতীত কালে প্রশ্ন, নাবাচক ও জোর প্রদানকারী সহায়ক"
    },

    // --- 4. PURE MODAL AUXILIARIES (9 FORMS) ---
    {
      id: 15,
      name: "shall",
      category: "pure_modals",
      categoryLabel: "Pure Modal",
      negative: "shan't",
      function: "1st Person Future determination / Legal decrees / Formal polite offers",
      example: "Shall we proceed with the next advanced grammatical module?",
      meaningBn: "ভবিষ্যৎ সঙ্কল্প, আইনি নির্দেশ ও সৌজন্যমূলক প্রস্তাব (Shall I / Shall we?)"
    },
    {
      id: 16,
      name: "should",
      category: "pure_modals",
      categoryLabel: "Pure Modal",
      negative: "shouldn't",
      function: "Moral obligation, Advisability, Logical expectation & Conditional trigger",
      example: "Every student should practice active error spotting daily.",
      meaningBn: "নৈতিক কর্তব্য, উচিত পরামর্শ ও যৌক্তিক প্রত্যাশা"
    },
    {
      id: 17,
      name: "will",
      category: "pure_modals",
      categoryLabel: "Pure Modal",
      negative: "won't",
      function: "Future certainty, Spontaneous decisions, Willingness & Strong promises",
      example: "I will achieve lifelong fluency in English composition.",
      meaningBn: "ভবিষ্যৎ নিশ্চয়তা, তাৎক্ষণিক সিদ্ধান্ত ও দৃঢ় প্রতিশ্রুতি"
    },
    {
      id: 18,
      name: "would",
      category: "pure_modals",
      categoryLabel: "Pure Modal",
      negative: "wouldn't",
      function: "Past habitual actions, Polite requests, Preferences & Hypothetical conditionals",
      example: "Would you kindly clarify this transitivity distinction once more?",
      meaningBn: "অতীতের অভ্যাস, বিনম্র অনুরোধ ও কাল্পনিক শর্ত (Hypothetical)"
    },
    {
      id: 19,
      name: "can",
      category: "pure_modals",
      categoryLabel: "Pure Modal",
      negative: "can't",
      function: "Present physical / mental ability, Possibility & Informal permission",
      example: "He can deconstruct any complex English periodic sentence.",
      meaningBn: "শারীরিক বা মানসিক সামর্থ্য, সাধারণ সম্ভাবনা ও অনুমতি"
    },
    {
      id: 20,
      name: "could",
      category: "pure_modals",
      categoryLabel: "Pure Modal",
      negative: "couldn't",
      function: "Past ability, High-politeness requests & Tentative / Remote possibility",
      example: "Could you please pass the advanced lexicon dictionary?",
      meaningBn: "অতীতের সামর্থ্য, অতি বিনম্র অনুরোধ ও দূরবর্তী সম্ভাবনা"
    },
    {
      id: 21,
      name: "may",
      category: "pure_modals",
      categoryLabel: "Pure Modal",
      negative: "mayn't",
      function: "Formal permission, Realistic factual possibility & Optative wishes / prayers",
      example: "May you attain the highest honors in your academic pursuits!",
      meaningBn: "আনুষ্ঠানিক অনুমতি, বাস্তব সম্ভাবনা ও শুভেচ্ছা/প্রার্থনা (Optative)"
    },
    {
      id: 22,
      name: "might",
      category: "pure_modals",
      categoryLabel: "Pure Modal",
      negative: "mightn't",
      function: "Remote / Slender possibility, Past reported modal & Tentative suggestions",
      example: "The evening train might be delayed due to dense river fog.",
      meaningBn: "ক্ষীণ বা দূরবর্তী সম্ভাবনা ও অতীতের অপ্রত্যক্ষ রূপ"
    },
    {
      id: 23,
      name: "must",
      category: "pure_modals",
      categoryLabel: "Pure Modal",
      negative: "mustn't",
      function: "Categorical necessity, Compulsory obligation & Strong logical deduction",
      example: "Candidates must preserve their admission cards until enrollment.",
      meaningBn: "অত্যন্ত জরুরি বাধ্যবাধকতা ও ৯৯% নিশ্চিত যৌক্তিক অনুমান"
    },

    // --- 5. SEMI-MODALS & MARGINAL AUXILIARIES (3 FORMS) ---
    {
      id: 24,
      name: "ought (to)",
      category: "semi_modals",
      categoryLabel: "Semi-Modal",
      negative: "oughtn't (to)",
      function: "Moral obligation, Social conscience & Strong ethical duty (with to-infinitive)",
      example: "We ought to respect our parents, teachers, and cultural heritage.",
      meaningBn: "সামাজিক ও নৈতিক কর্তব্যবোধ (সর্বদা To-Infinitive সহ ব্যবহৃত হয়)"
    },
    {
      id: 25,
      name: "used (to)",
      category: "semi_modals",
      categoryLabel: "Semi-Modal",
      negative: "usedn't (to) / didn't use to",
      function: "Discontinued past habit or former state of being no longer existing today",
      example: "He used to swim in the Ganges every morning during his youth.",
      meaningBn: "অতীতের নিয়মিত কিন্তু অধুনা বিলুপ্ত অভ্যাস বা স্থায়ী অবস্থা"
    },
    {
      id: 26,
      name: "need / dare",
      category: "semi_modals",
      categoryLabel: "Semi-Modal",
      negative: "needn't / daren't",
      function: "Semi-modal auxiliaries of absence of obligation (needn't) & boldness/courage (daren't) without dummy 'do'",
      example: "You needn't submit the hardcopy today. / How dare you challenge the decree?",
      meaningBn: "প্রয়োজনহীনতা (needn't) ও সাহস/স্পর্ধা (daren't) বোঝাতে 'do' ছাড়া সরাসরি সহায়ক"
    }
  ];

  // Filtered Auxiliary Verbs
  const filteredAuxiliaries = useMemo(() => {
    return auxiliaryVerbsData.filter((item) => {
      const matchesCategory =
        auxCategoryFilter === "all" || item.category === auxCategoryFilter;
      const matchesSearch =
        item.name.toLowerCase().includes(auxSearchQuery.toLowerCase()) ||
        item.negative.toLowerCase().includes(auxSearchQuery.toLowerCase()) ||
        item.function.toLowerCase().includes(auxSearchQuery.toLowerCase()) ||
        item.example.toLowerCase().includes(auxSearchQuery.toLowerCase()) ||
        item.meaningBn.toLowerCase().includes(auxSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [auxCategoryFilter, auxSearchQuery]);

  // Dual Meaning Verbs Data
  const dualVerbs = {
    have: {
      verb: "HAVE",
      stativeMeaning: "Ownership / Inherent possession",
      stativeEx: "I have two luxury cars. (NO -ing form)",
      stativeBn: "মালিকানা অর্থে Stative: 'I have a car' (I am having a car ভুল)।",
      dynamicMeaning: "Eating, drinking, or active experience",
      dynamicEx: "I am having dinner with my family right now.",
      dynamicBn: "আহার বা অভিজ্ঞতা অর্থে Dynamic: 'I am having lunch/a shower'।"
    },
    think: {
      verb: "THINK",
      stativeMeaning: "Opinion / Fixed belief",
      stativeEx: "I think this decision is prudent.",
      stativeBn: "মতামত বা বিশ্বাস অর্থে Stative: 'I think you are right' (I am thinking নয়)।",
      dynamicMeaning: "Active cognitive mental processing / deliberation",
      dynamicEx: "I am thinking about moving to a new city.",
      dynamicBn: "সক্রিয় চিন্তা-ভাবনা অর্থে Dynamic: 'I am thinking about it'।"
    },
    see: {
      verb: "SEE",
      stativeMeaning: "Involuntary visual perception",
      stativeEx: "I see a solitary bird in the tree.",
      stativeBn: "স্বাভাবিক দর্শন অর্থে Stative: 'I see a bird' (I am seeing নয়)।",
      dynamicMeaning: "Meeting, consulting, or dating someone",
      dynamicEx: "I am seeing the senior cardiologist tomorrow.",
      dynamicBn: "সাক্ষাৎ বা পরামর্শ অর্থে Dynamic: 'I am seeing the doctor'।"
    },
    taste: {
      verb: "TASTE",
      stativeMeaning: "Inherent flavor attribute",
      stativeEx: "The dessert tastes delightfully sweet.",
      stativeBn: "স্বাভাবিক স্বাদ প্রকাশে Stative: 'The soup tastes good' (tastes well নয়)।",
      dynamicMeaning: "Active voluntary tasting action by a person",
      dynamicEx: "The master chef is tasting the soup for salt.",
      dynamicBn: "জিভ দিয়ে চেখে দেখা অর্থে Dynamic: 'The chef is tasting the soup'।"
    }
  };

  // Lie vs Lay Conjugation Data
  const lieData = {
    recline: {
      title: "1. Lie (To Recline / Rest)",
      type: "Intransitive (No Object)",
      v1: "Lie",
      v2: "Lay",
      v3: "Lain",
      v4: "Lying",
      v5: "Lies",
      example: "He lay down on the sofa to rest yesterday.",
      exampleBn: "বিশ্রাম নেওয়া বা শুয়ে থাকা (Intransitive): Yesterday he lay on the bed."
    },
    place: {
      title: "2. Lay (To Put / Place Down)",
      type: "Transitive (Requires Direct Object)",
      v1: "Lay",
      v2: "Laid",
      v3: "Laid",
      v4: "Laying",
      v5: "Lays",
      example: "She laid the fragile crystal vase on the table.",
      exampleBn: "কোনো বস্তু রাখা (Transitive): She laid the book on the table."
    },
    untruth: {
      title: "3. Lie (To Speak Untruth)",
      type: "Intransitive (No Object)",
      v1: "Lie",
      v2: "Lied",
      v3: "Lied",
      v4: "Lying",
      v5: "Lies",
      example: "The witness lied under oath during the cross-examination.",
      exampleBn: "মিথ্যা বলা (Intransitive): He lied to the police officer."
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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-emerald-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                <Activity className="w-3.5 h-3.5" />
                Module 004.001 • Dynamic Core
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Verb Classification, Taxonomy & The 26 Auxiliaries
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Explore transitive vs intransitive vs ergative verbs, linking copular verbs, the complete <span className="text-cyan-300 font-semibold">26 Auxiliary Verbs Master Catalog</span>, the vital <span className="text-emerald-400 font-semibold">Stative vs Dynamic</span> boundaries, and the <span className="text-amber-300 font-semibold">Lie vs Lay</span> matrix.
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
              Verb হলো ইংরেজি বাক্যের মূল চালিকাশক্তি। এই অধ্যায়ে আমরা প্রধান ক্রিয়া (Lexical Verbs) ও ২৬টি সাহায্যকারী ক্রিয়া (26 Auxiliary Verbs / Anomalous Finites), সকর্মক/অকর্মক ক্রিয়ার পার্থক্য এবং Stative বনাম Dynamic ক্রিয়ার ব্যবহারের নিয়মাবলী বিস্তারিতভাবে শিখব।
            </div>
          )}
        </header>

        {/* ========================================================================= */}
        {/* 2. THE MASTER 26 AUXILIARY VERBS INTERACTIVE TABLE                        */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <Table className="w-7 h-7 text-cyan-400" />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    The Grand 26 Auxiliary Verbs Master Catalog
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
                    26 Total
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  The complete 26 helping verbs & anomalous finites: 14 Primary Auxiliaries (Be, Have, Do), 9 Pure Modals, and 3 Semi-Modals.
                </p>
              </div>
            </div>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-400">
                Primary: <strong>14</strong>
              </span>
              <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-purple-400">
                Pure Modals: <strong>9</strong>
              </span>
              <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-amber-400">
                Semi-Modals: <strong>3</strong>
              </span>
            </div>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={auxSearchQuery}
                onChange={(e) => setAuxSearchQuery(e.target.value)}
                placeholder="Search any of the 26 auxiliaries by name, negative, function..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { key: "all", label: "All (26)" },
                { key: "primary_be", label: "Be (8)" },
                { key: "primary_have", label: "Have (3)" },
                { key: "primary_do", label: "Do (3)" },
                { key: "pure_modals", label: "Pure Modals (9)" },
                { key: "semi_modals", label: "Semi-Modals (3)" }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setAuxCategoryFilter(tab.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    auxCategoryFilter === tab.key
                      ? "bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-950"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Auxiliary Verbs Responsive Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-4 font-semibold w-12 text-center">#</th>
                  <th className="py-3.5 px-4 font-semibold">Auxiliary Verb</th>
                  <th className="py-3.5 px-4 font-semibold">Category</th>
                  <th className="py-3.5 px-4 font-semibold">Negative Form</th>
                  <th className="py-3.5 px-4 font-semibold">Primary Function</th>
                  <th className="py-3.5 px-4 font-semibold">Exemplar Sentence</th>
                  {showBengali && (
                    <th className="py-3.5 px-4 font-semibold text-amber-300">বাংলা অর্থ ও তাৎপর্য</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredAuxiliaries.map((aux) => (
                  <tr
                    key={aux.id}
                    className="hover:bg-slate-900/50 transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-mono text-slate-500 text-center text-xs">
                      {aux.id}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-white text-sm">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 group-hover:border-cyan-500/50 group-hover:text-cyan-200 transition-all">
                        {aux.name}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase font-mono ${
                          aux.category.startsWith("primary")
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : aux.category === "pure_modals"
                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {aux.categoryLabel}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-rose-300">
                      {aux.negative}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 text-xs max-w-xs">
                      {aux.function}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 text-xs italic font-sans max-w-sm">
                      "{aux.example}"
                    </td>
                    {showBengali && (
                      <td className="py-3.5 px-4 text-amber-300/90 text-xs font-medium animate-fade-in max-w-xs">
                        {aux.meaningBn}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredAuxiliaries.length === 0 && (
              <div className="p-8 text-center text-slate-500 text-sm space-y-2">
                <AlertTriangle className="w-6 h-6 mx-auto text-amber-400 opacity-60" />
                <p>No auxiliary verbs matching "{auxSearchQuery}".</p>
                <button
                  onClick={() => {
                    setAuxSearchQuery("");
                    setAuxCategoryFilter("all");
                  }}
                  className="text-xs text-cyan-400 hover:underline font-semibold"
                >
                  Clear search filters
                </button>
              </div>
            )}
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200 leading-relaxed flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong>Sukanta Sir's Formula:</strong> Primary Auxiliaries (<em>Be, Do, Have</em>) change their form according to Number, Person, and Tense. Pure Modals (<em>Shall, Should, Will, Would, Can, Could, May, Might, Must</em>) are invariable and NEVER take '-s', '-ed', or '-ing'!
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: STATIVE VS DYNAMIC DUAL MEANING LAB                         */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <ArrowLeftRight className="w-6 h-6 text-emerald-400" />
            <div>
              <h2 className="text-xl font-bold text-white">2. Dual Stative & Dynamic Verbs Lab</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Certain verbs change their behavior and meaning dramatically between Stative (Simple aspect) and Dynamic (Progressive aspect).
              </p>
            </div>
          </div>

          {/* Verb Selector Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
            {Object.keys(dualVerbs).map((key) => (
              <button
                key={key}
                onClick={() => setActiveDualVerb(key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                  activeDualVerb === key
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {dualVerbs[key].verb}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Stative Card */}
            <div className="p-5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Stative Aspect (No -ing Allowed)
              </span>
              <h4 className="text-sm font-semibold text-slate-300">
                Meaning: {dualVerbs[activeDualVerb].stativeMeaning}
              </h4>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <p className="text-sm font-bold text-white">
                  "{dualVerbs[activeDualVerb].stativeEx}"
                </p>
              </div>
              {showBengali && (
                <p className="text-xs text-amber-200/90 pt-1 animate-fade-in">
                  <strong>বাংলা:</strong> {dualVerbs[activeDualVerb].stativeBn}
                </p>
              )}
            </div>

            {/* Dynamic Card */}
            <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Dynamic Aspect (Continuous -ing Allowed)
              </span>
              <h4 className="text-sm font-semibold text-slate-300">
                Meaning: {dualVerbs[activeDualVerb].dynamicMeaning}
              </h4>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <p className="text-sm font-bold text-white">
                  "{dualVerbs[activeDualVerb].dynamicEx}"
                </p>
              </div>
              {showBengali && (
                <p className="text-xs text-emerald-200/90 pt-1 animate-fade-in">
                  <strong>বাংলা:</strong> {dualVerbs[activeDualVerb].dynamicBn}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SECTION 3: THE LIE VS LAY CONJUGATION MATRIX                           */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Box className="w-6 h-6 text-sky-400" />
            <div>
              <h2 className="text-xl font-bold text-white">3. The Legendary Lie vs Lay Matrix</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Master the exact 5 principal forms of Lie (recline), Lay (place), and Lie (untruth).
              </p>
            </div>
          </div>

          {/* Lie/Lay Tab Selector */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(lieData).map((key) => (
              <button
                key={key}
                onClick={() => setActiveLieTab(key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeLieTab === key
                    ? "bg-sky-600 text-white font-bold shadow-lg shadow-sky-600/20"
                    : "bg-slate-800/70 text-slate-300 hover:bg-slate-800 border border-slate-700"
                }`}
              >
                {lieData[key].title}
              </button>
            ))}
          </div>

          {/* Conjugation Card */}
          <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-sky-300">
                {lieData[activeLieTab].title}
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-300">
                {lieData[activeLieTab].type}
              </span>
            </div>

            {/* Conjugation Form Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">V1 Base</span>
                <span className="text-base font-bold text-white">{lieData[activeLieTab].v1}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">V2 Past</span>
                <span className="text-base font-bold text-emerald-400">{lieData[activeLieTab].v2}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">V3 P.P.</span>
                <span className="text-base font-bold text-purple-400">{lieData[activeLieTab].v3}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">V4 -ing</span>
                <span className="text-base font-bold text-sky-400">{lieData[activeLieTab].v4}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">V5 3rd Sing.</span>
                <span className="text-base font-bold text-amber-400">{lieData[activeLieTab].v5}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Example:</span>
              <p className="text-sm font-semibold text-white">"{lieData[activeLieTab].example}"</p>
              {showBengali && (
                <p className="text-xs text-amber-200/90 pt-1">
                  <strong>বাংলা:</strong> {lieData[activeLieTab].exampleBn}
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
                <h2 className="text-xl font-bold text-white">4. Module 004.001 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive test on verb classifications, stative vs dynamic behaviors, the 26 auxiliaries, transitivity, and lie/lay rules.
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
                    <span className="text-xs font-bold text-emerald-400 font-mono">Q{qIndex + 1}.</span>
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
                        btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold";
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
                        <strong className="text-emerald-400">Explanation:</strong> {q.explanation}
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
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all"
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
          <PlainTextPrint content={noteText} title="Module 004.001 Study Note - Verb Classification & 26 Auxiliaries" />
          <WordDictionary />
          <Teacher note="Mastering the 26 Auxiliaries is the master key to forming every English tense, passive voice, and negative sentence without hesitation! — Sukanta Hui" />
          <FAQTemplate
            faqList={[
              {
                question: "What are the 26 Auxiliary Verbs in English grammar?",
                answer: "The 26 Auxiliary Verbs (also known as anomalous finites and helping verbs) comprise: 14 Primary Auxiliaries (be, am, is, are, was, were, been, being, have, has, had, do, does, did), 9 Pure Modal Auxiliaries (shall, should, will, would, can, could, may, might, must), and 3 Semi-Modals / Marginal Auxiliaries (ought to, used to, need/dare)."
              },
              {
                question: "What is the key difference between Primary Auxiliaries and Modal Auxiliaries?",
                answer: "Primary Auxiliaries (Be, Have, Do) change their form according to Number, Person, and Tense (e.g. is/are, has/have, does/do) and can also function as Main Verbs. Pure Modal Auxiliaries (Can, Will, Must, etc.) never change form, never add '-s' or '-ed', and must always be followed by a base bare infinitive."
              },
              {
                question: "Why are stative verbs prohibited in progressive continuous tenses?",
                answer: "Stative verbs denote continuous permanent states of mind, emotion, perception, or ownership rather than dynamic activities with active physical duration. Standard English uses simple aspects for states (e.g. 'I know', 'I understand', 'I own')."
              },
              {
                question: "What is an ergative verb?",
                answer: "An ergative verb is a verb that can be used transitively with an agent ('He opened the door') or intransitively where the affected entity is the subject ('The door opened') without changing the verb form."
              },
              {
                question: "What is the past tense of 'lie' (to recline) versus 'lay' (to place)?",
                answer: "The past tense of 'lie' (recline - intransitive) is 'lay' ('Yesterday he lay in bed'). The past tense of 'lay' (place down - transitive) is 'laid' ('She laid the book on the desk')."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/003_004_adverb-inversion-and-negative-fronting/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Previous: Module 003_004 (Inversion)</span>
          </a>

          <a
            href="/english-grammar/topic/004_002_regular-vs-irregular-verbs-and-conjugation-mechanics/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Module 004_002 (Regular vs Irregular Verbs)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
