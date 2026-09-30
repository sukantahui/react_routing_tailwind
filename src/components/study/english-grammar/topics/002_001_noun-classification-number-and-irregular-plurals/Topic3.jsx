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
  Ban,
  ShieldAlert,
  Search,
  PackageCheck
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

export default function Topic3() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeTrapTab, setActiveTrapTab] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");
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

  const traps = [
    {
      noun: "INFORMATION",
      category: "abstract",
      wrong: "informations / an information",
      right: "information / a piece of information",
      example: "The police received reliable information (NOT: informations).",
      verbRule: "Singular verb: 'The information is confirmed.'",
      bengaliNote: "'Information' সর্বদা Uncountable। বহুবচনে 'informations' লেখা সম্পূর্ণ ভুল। একবচন বোঝাতে 'a piece of information' বলুন।"
    },
    {
      noun: "FURNITURE",
      category: "aggregate",
      wrong: "furnitures / a furniture",
      right: "furniture / an item or piece of furniture",
      example: "All the furniture in the classroom was newly polished.",
      verbRule: "Singular verb: 'The furniture looks elegant.'",
      bengaliNote: "আসবাবপত্র সামগ্রিক অর্থে 'Furniture' Uncountable। 'furnitures' শব্দ ইংরেজিতে নেই।"
    },
    {
      noun: "ADVICE",
      category: "abstract",
      wrong: "advices / an advice",
      right: "advice / a piece of advice / some advice",
      example: "He gave me a valuable piece of advice before the exam.",
      verbRule: "Singular verb: 'His advice was indispensable.'",
      bengaliNote: "পরামর্শ বা উপদেশ অর্থে 'advice' সর্বদা Uncountable। গণনা করতে 'a piece of advice' ব্যবহার করুন।"
    },
    {
      noun: "SCENERY",
      category: "aggregate",
      wrong: "sceneries / a scenery",
      right: "scenery / beautiful views",
      example: "The scenery of the Himalayas is awe-inspiring.",
      verbRule: "Singular verb: 'The scenery is picturesque.'",
      bengaliNote: "প্রাকৃতিক দৃশ্য অর্থে 'scenery' Uncountable। 'The sceneries are' ভুল, শুদ্ধ হলো 'The scenery is'।"
    },
    {
      noun: "LUGGAGE / BAGGAGE",
      category: "aggregate",
      wrong: "luggages / baggages",
      right: "luggage / pieces of luggage",
      example: "She carried two heavy pieces of luggage onto the train.",
      verbRule: "Singular verb: 'My luggage has arrived safely.'",
      bengaliNote: "ভ্রমণের মালপত্র অর্থে 'luggage/baggage' সর্বদা Uncountable ও Singular।"
    },
    {
      noun: "HAIR",
      category: "material",
      wrong: "hairs (for full head)",
      right: "hair (mass) / two hairs (individual strands)",
      example: "Her hair is silky and dark.",
      verbRule: "Singular verb for full head: 'His hair has turned silver.'",
      bengaliNote: "মাথার সম্পূর্ণ চুল অর্থে 'hair' Uncountable; আলাদা দুটি-একটি চুল ঝরে পড়লে 'two white hairs' বলা যায়।"
    },
    {
      noun: "MACHINERY",
      category: "aggregate",
      wrong: "machineries",
      right: "machinery / machines (countable)",
      example: "Heavy industrial machinery is imported from Germany.",
      verbRule: "Singular verb: 'The machinery was repaired yesterday.'",
      bengaliNote: "যন্ত্রপাতি সামগ্রিকভাবে 'machinery' (Uncountable)। Countable হিসেবে 'machines' ব্যবহার করা যায়।"
    },
    {
      noun: "STATIONERY / CROCKERY",
      category: "aggregate",
      wrong: "stationeries / crockeries",
      right: "stationery items / sets of crockery",
      example: "The office purchased essential stationery for the staff.",
      verbRule: "Singular verb: 'The crockery is very fragile.'",
      bengaliNote: "লেখার সরঞ্জাম (Stationery) ও চিনামাটির বাসনপত্র (Crockery) সর্বদা Uncountable।"
    },
    {
      noun: "MISCHIEF",
      category: "abstract",
      wrong: "mischiefs / a mischief",
      right: "mischief / an act of mischief",
      example: "The mischievous child caused much mischief in the garden.",
      verbRule: "Singular verb: 'His mischief was caught on camera.'",
      bengaliNote: "দুষ্টুমি অর্থে 'mischief' Uncountable; 'many mischiefs' এর বদলে 'many acts of mischief' বলুন।"
    },
    {
      noun: "BREAD",
      category: "material",
      wrong: "two breads",
      right: "two loaves / slices of bread",
      example: "I toasted two slices of bread for breakfast.",
      verbRule: "Singular verb: 'Bread is staple food in many nations.'",
      bengaliNote: "রুটি অর্থে 'bread' Uncountable; 'two breads' ভুল, 'two loaves / slices of bread' শুদ্ধ।"
    },
    {
      noun: "POETRY",
      category: "abstract",
      wrong: "poetries",
      right: "poetry / poems (countable)",
      example: "Tagore composed immortal poetry and numerous melodious songs.",
      verbRule: "Singular verb: 'Keats's poetry is renowned worldwide.'",
      bengaliNote: "কবিতার সমগ্র ধারা অর্থে 'poetry' Uncountable; পৃথক পৃথক কবিতা বোঝাতে 'poems' বলুন।"
    },
    {
      noun: "WORK",
      category: "abstract",
      wrong: "many works (for tasks)",
      right: "a lot of work / an urgent piece of work",
      example: "I have an urgent piece of work to complete before 5 PM.",
      verbRule: "Singular verb: 'Hard work pays off.'",
      bengaliNote: "কাজ বা দায়িত্ব অর্থে 'work' Uncountable ('an urgent work' ভুল, 'an urgent piece of work' সঠিক)। 'Works' অর্থ কারখানা বা বিখ্যাত সাহিত্যকর্ম।"
    },
    {
      noun: "EQUIPMENT",
      category: "aggregate",
      wrong: "equipments",
      right: "equipment / pieces of equipment",
      example: "Modern laboratory equipment was installed at the Barrackpore center.",
      verbRule: "Singular verb: 'All equipment is calibrated.'",
      bengaliNote: "যন্ত্রপাতি বা সরঞ্জাম বোঝাতে 'equipment' সর্বদা Uncountable ও Singular।"
    },
    {
      noun: "EVIDENCE",
      category: "abstract",
      wrong: "evidences",
      right: "evidence / pieces of evidence",
      example: "The prosecution presented compelling evidence in court.",
      verbRule: "Singular verb: 'The evidence proves his innocence.'",
      bengaliNote: "প্রমাণ বা সাক্ষ্য অর্থে 'evidence' Uncountable; 'many evidences' সম্পূর্ণ অশুদ্ধ।"
    }
  ];

  const filteredTraps = traps.filter(t => {
    const matchesCategory = activeTrapTab === "all" || t.category === activeTrapTab;
    const matchesSearch = t.noun.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.wrong.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.right.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* HERO HEADER */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-rose-950/30 to-slate-900 border border-slate-800 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Module 002_001 · Topic 3
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Competitive Exam Trap Zone
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Uncountable Noun Traps & Error Invariants
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                Learn why words like <em className="text-rose-300 font-serif">information, furniture, advice, scenery, luggage</em> never take plural <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded">-s</code> and how to quantify them using partitive classifiers.
              </p>
            </div>

            <button
              onClick={() => setShowBengali(prev => !prev)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs font-bold transition-all shadow-lg hover:border-indigo-400 shrink-0 self-start md:self-auto"
            >
              <Languages className="w-4 h-4 text-indigo-400" />
              <span>{showBengali ? "Hide Bengali / বাংলা লুকান" : "Show Bengali / বাংলা দেখুন"}</span>
            </button>
          </div>
        </div>

        {/* CORE INVARIANTS TRIPLE RULE */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                The 3 Invariable Laws of Mass & Abstract Nouns
              </h2>
              <p className="text-xs text-slate-400">Essential rules strictly enforced in SSC CGL, Banking, and Board examinations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-rose-500/30 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <Ban className="w-4 h-4 shrink-0" />
                <span>1. Never Pluralize with '-s'</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Forms like <span className="line-through text-rose-400 font-mono">*furnitures</span>, <span className="line-through text-rose-400 font-mono">*informations</span>, <span className="line-through text-rose-400 font-mono">*sceneries</span> are 100% grammatically invalid.
              </p>
              {showBengali && (
                <p className="text-[11px] text-emerald-300 pt-1 border-t border-slate-800">
                  বাংলা: এদের সাথে কখনো 's' বা 'es' যুক্ত করে বহুবচন করা যায় না।
                </p>
              )}
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Ban className="w-4 h-4 shrink-0" />
                <span>2. No Direct 'A' or 'An'</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cannot say <span className="line-through text-amber-400 font-mono">*an advice</span>, <span className="line-through text-amber-400 font-mono">*a luggage</span>, or <span className="line-through text-amber-400 font-mono">*a bread</span>. Must use partitives like <em>'a piece of advice'</em>.
              </p>
              {showBengali && (
                <p className="text-[11px] text-emerald-300 pt-1 border-t border-slate-800">
                  বাংলা: সরাসরি 'a' বা 'an' বসানো যাবে না; 'a piece of' বা 'a slice of' যোগ করতে হবে।
                </p>
              )}
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>3. Always Singular Verb</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mass and abstract nouns govern singular concord: <em>"The machinery <strong>is</strong> operational"</em>, <em>"The information <strong>was</strong> accurate"</em>.
              </p>
              {showBengali && (
                <p className="text-[11px] text-emerald-300 pt-1 border-t border-slate-800">
                  বাংলা: এদের পর সর্বদা Singular Verb (is / was / has) বসে।
                </p>
              )}
            </div>
          </div>
        </div>

        {/* INTERACTIVE TRAP CATALOG & SEARCH FILTER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                The Master Catalog of 14 Uncountable Trap Nouns
              </h2>
              <p className="text-xs text-slate-400">Filter by category or search any noun below to view its error pattern & correct usage</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search noun or error..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Traps" },
              { id: "aggregate", label: "Aggregated Objects (Furniture, Luggage, etc.)" },
              { id: "abstract", label: "Abstract Concepts (Advice, Information, etc.)" },
              { id: "material", label: "Substances & Mass (Bread, Hair, etc.)" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTrapTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  activeTrapTab === tab.id
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-950"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid of Traps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTraps.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-sm font-extrabold text-white tracking-wider font-mono">
                    {item.noun}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
                    {item.category}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold shrink-0">❌ Trap:</span>
                    <span className="text-rose-300 font-mono">{item.wrong}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">✔ Correct:</span>
                    <span className="text-emerald-300 font-medium">{item.right}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/60 text-slate-300 text-xs italic">
                  "{item.example}"
                </div>

                <div className="text-[11px] text-indigo-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{item.verbRule}</span>
                </div>

                {showBengali && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 text-xs leading-relaxed">
                    <strong>বাংলা ব্যাখ্যা:</strong> {item.bengaliNote}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* PARTITIVE EXPRESSION MATRIX */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Partitive Classifiers: How to Count the Uncountable Legally
              </h2>
              <p className="text-xs text-slate-400">Formula: [Countable Classifier Unit] + OF + [Uncountable Mass Noun]</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            {[
              { unit: "A piece of information / advice", example: "He gave me two pieces of advice." },
              { unit: "An item / article of furniture", example: "They bought five items of furniture." },
              { unit: "A piece / item of luggage", example: "Only one piece of luggage is permitted." },
              { unit: "A loaf / slice of bread", example: "Can I have two slices of toasted bread?" },
              { unit: "An act / piece of mischief", example: "He was scolded for an act of mischief." },
              { unit: "A stroke of luck / lightning", example: "By a stroke of luck, he passed the test." },
              { unit: "A strand / lock of hair", example: "A strand of hair was found at the scene." },
              { unit: "A sheet / ream of paper", example: "Please hand me three sheets of paper." },
              { unit: "A block / cube of ice", example: "Add two cubes of ice to the lemon tea." }
            ].map((p, pIdx) => (
              <div key={pIdx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400 font-mono">{p.unit}</span>
                <p className="text-slate-400 text-[11px] italic">"{p.example}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* PRACTICE ASSESSMENT WITH 10 QUESTIONS */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Topic 3 Diagnostic Quiz: Uncountable Traps
                </h2>
                <p className="text-xs text-slate-400">Test your ability to spot mass noun violations in competitive exam formats</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {submitted && (
                <span className="px-3.5 py-1.5 rounded-xl bg-indigo-950 border border-indigo-500/40 text-indigo-200 text-xs font-bold">
                  Score: {calculateScore()} / {questions.length}
                </span>
              )}
              <button
                onClick={resetQuiz}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div key={q.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm font-semibold text-slate-100">{q.question}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[q.id] === optIdx;
                    const isCorrect = q.correctAnswer === optIdx;
                    let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";

                    if (submitted) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-rose-950/60 border-rose-500 text-rose-200";
                      } else {
                        btnStyle = "bg-slate-900/40 border-slate-800/40 text-slate-500";
                      }
                    } else if (isSelected) {
                      btnStyle = "bg-indigo-950 border-indigo-500 text-indigo-200 font-semibold shadow-md";
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={submitted}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`text-left p-3 rounded-xl border text-xs transition-all leading-relaxed flex items-start gap-2.5 ${btnStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
                    <div className="text-emerald-400 font-semibold">Explanation: {q.explanation}</div>
                    {showBengali && q.explanationBn && (
                      <div className="text-slate-400 border-t border-slate-800 pt-1 mt-1 text-[11px]">
                        বাংলা: {q.explanationBn}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {!submitted && (
              <button
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(userAnswers).length === 0}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-950 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answers & View Diagnostics
              </button>
            )}
          </div>
        </div>

        {/* AUXILIARY SYSTEMS */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Module 002_001 Topic 3 Assessment & Practice Bank"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 3: Uncountable Noun Traps in Competitive Exams"
          />

          <WordDictionary />

          <Teacher
            note="Uncountable mass noun traps are the single most frequent error-spotting question in competitive English exams. Never add '-s' to information, advice, or scenery! — Sukanta Hui"
          />
        </div>

        {/* BIDIRECTIONAL NAVIGATION FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <a
            href="/english-grammar/module/002_001_noun-classification-number-and-irregular-plurals/topic-2"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-all hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 2 (Countable vs Uncountable)</span>
          </a>

          <a
            href="/english-grammar/module/002_001_noun-classification-number-and-irregular-plurals/topic-4"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-950"
          >
            <span>Next: Topic 4 (Collective Nouns & Concord)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
