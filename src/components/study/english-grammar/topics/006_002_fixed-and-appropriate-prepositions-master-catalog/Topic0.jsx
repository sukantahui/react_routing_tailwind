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
  Search,
  Filter,
  ArrowLeftRight,
  ShieldCheck,
  Split,
  BookMarked
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeShiftWord, setActiveShiftWord] = useState("agree");
  const [userAnswers, setUserAnswers] = useState({});
  const [revealedExplanations, setRevealedExplanations] = useState({});

  const handleOptionSelect = (qId, option) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const toggleExplanation = (qId) => {
    setRevealedExplanations((prev) => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const shiftData = {
    agree: {
      word: "AGREE",
      variants: [
        { prep: "WITH", target: "A Person / Viewpoint", eg: "I agree with Sukanta Sir on this methodology.", note: "ব্যক্তির সাথে একমত হওয়া" },
        { prep: "TO", target: "A Proposal / Terms / Plan", eg: "The committee agreed to the new proposal.", note: "কোনো প্রস্তাব বা শর্তে রাজি হওয়া" },
        { prep: "ON", target: "A Specific Subject / Decision", eg: "They finally agreed on a common date.", note: "কোনো চূড়ান্ত বিষয়ে ঐকমত্য" }
      ]
    },
    die: {
      word: "DIE",
      variants: [
        { prep: "OF", target: "Internal Disease / Hunger / Thirst", eg: "He died of cholera / pneumonia.", note: "রোগ বা ক্ষুধায় সরাসরি মৃত্যু" },
        { prep: "FROM", target: "External Factor / Overwork / Wound", eg: "The patient died from severe blood loss.", note: "অতিরিক্ত পরিশ্রম, ক্ষত বা পরোক্ষ কারণ" },
        { prep: "BY", target: "Violence / Weapon / Poison", eg: "He died by poison.", note: "বিষপ্রয়োগ বা হিংসাত্মক মৃত্যু" },
        { prep: "FOR", target: "Noble Cause / Country", eg: "The patriots died for their motherland.", note: "দেশের জন্য আত্মোৎসর্গ" }
      ]
    },
    deal: {
      word: "DEAL",
      variants: [
        { prep: "IN", target: "Commodity / Trade / Business", eg: "This merchant deals in silk textiles.", note: "কোনো দ্রব্যের ব্যবসা করা" },
        { prep: "WITH", target: "Person / Situation / Problem", eg: "The manager will deal with the complaint.", note: "ব্যক্তি বা সমস্যা পরিচালনা/মোকাবিলা" }
      ]
    },
    blind: {
      word: "BLIND",
      variants: [
        { prep: "IN / OF", target: "Physical Eye Impairment", eg: "He is blind in his right eye.", note: "শারীরিক দৃষ্টিহীনতা" },
        { prep: "TO", target: "Metaphorical Ignorance / Faults", eg: "Do not be blind to your own flaws.", note: "দোষত্রুটি দেখেও উপেক্ষা করা" }
      ]
    },
    part: {
      word: "PART",
      variants: [
        { prep: "WITH", target: "A Possession / Money / Object", eg: "He refuses to part with his old books.", note: "কোনো বস্তু বা সম্পত্তি ত্যাগ করা" },
        { prep: "FROM", target: "A Person / Companion", eg: "She wept when she parted from her family.", note: "কোনো ব্যক্তির কাছ থেকে বিচ্ছিন্ন হওয়া" }
      ]
    },
    differ: {
      word: "DIFFER",
      variants: [
        { prep: "WITH", target: "A Person (Opinion)", eg: "I differ with you regarding this decision.", note: "ব্যক্তির সাথে মতের অমিল হওয়া" },
        { prep: "FROM", target: "In Physical Nature / Quality", eg: "Gold differs from iron in malleability.", note: "বৈশিষ্ট্য বা প্রকৃতিতে ভিন্ন হওয়া" }
      ]
    }
  };

  const masterCatalog = [
    { word: "Abide", prep: "by", type: "verb", meaning: "Comply with / Obey rules", example: "You must abide by the court's verdict." },
    { word: "Accused", prep: "of", type: "verb", meaning: "Formally charged with crime", example: "He was accused of grand theft." },
    { word: "Accustomed", prep: "to", type: "adjective", meaning: "Habituated to something", example: "Accustomed to working late hours." },
    { word: "Afraid / Aware", prep: "of", type: "adjective", meaning: "Conscious or fearful", example: "She is aware of the consequences." },
    { word: "Appetite", prep: "for", type: "noun", meaning: "Strong craving / desire", example: "An insatiable appetite for knowledge." },
    { word: "Capable", prep: "of", type: "adjective", meaning: "Having the ability", example: "Capable of handling high stress." },
    { word: "Charged", prep: "with", type: "verb", meaning: "Legally accused of offense", example: "Charged with financial embezzlement." },
    { word: "Congratulate", prep: "on", type: "verb", meaning: "Praise for accomplishment", example: "Congratulated her on her promotion." },
    { word: "Devoid", prep: "of", type: "adjective", meaning: "Completely lacking", example: "A speech devoid of any substance." },
    { word: "Eligible", prep: "for", type: "adjective", meaning: "Qualified to receive", example: "Eligible for the national award." },
    { word: "Endowed", prep: "with", type: "verb", meaning: "Naturally gifted with", example: "Endowed with extraordinary vision." },
    { word: "Good", prep: "at", type: "adjective", meaning: "Skilled in an activity", example: "Rohan is exceptionally good at chess." },
    { word: "Injurious / Detrimental", prep: "to", type: "adjective", meaning: "Harmful or damaging", example: "Smoking is injurious to health." },
    { word: "Insist", prep: "on", type: "verb", meaning: "Demand emphatically", example: "She insisted on settling the account." },
    { word: "Jealous / Envious", prep: "of", type: "adjective", meaning: "Resentful of another's success", example: "Jealous of his rapid progress." },
    { word: "Key", prep: "to", type: "noun", meaning: "Crucial pathway/solution", example: "Consistency is the key to mastery." },
    { word: "Look forward", prep: "to", type: "verb", meaning: "Anticipate with pleasure", example: "Looking forward to meeting you." },
    { word: "Prevent / Abstain", prep: "from", type: "verb", meaning: "Stop or refrain", example: "Refrain from repeating the error." },
    { word: "Proficient", prep: "in", type: "adjective", meaning: "Highly adept in a field", example: "Proficient in Python programming." },
    { word: "Senior / Superior", prep: "to", type: "adjective", meaning: "Higher rank (Latin adj)", example: "He is senior to me by two years." },
    { word: "Succumb", prep: "to", type: "verb", meaning: "Yield to pressure/injury", example: "Succumbed to severe illness." }
  ];

  const filteredCatalog = masterCatalog.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.type === selectedCategory;
    const matchesSearch =
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.prep.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* ========================================================================= */}
        {/* 1. HERO HEADER WITH BILINGUAL SWITCHER                                   */}
        {/* ========================================================================= */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-emerald-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Module 006.002 • Fixed Prepositions Masterclass
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Appropriate & Fixed Prepositions
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the definitive catalog of <span className="text-emerald-400 font-semibold">Dependent Prepositions</span>, context-dependent shifts (<span className="text-amber-400 font-semibold">Agree with / to / on</span>, <span className="text-sky-400 font-semibold">Die of / from</span>), and Latin comparative rules.
              </p>
            </div>

            <button
              onClick={() => setShowBengali(!showBengali)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold transition-all duration-300 border ${
                showBengali
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-lg shadow-emerald-500/10"
                  : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
              }`}
            >
              <Languages className="w-4 h-4 text-emerald-400" />
              <span>{showBengali ? "Bengali Explanations ON" : "বাংলা ব্যাখ্যা দেখুন"}</span>
            </button>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 2. INTERACTIVE WORKBENCH: CONTEXTUAL SHIFT LAB                            */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Split className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Contextual Preposition Shift Visualizer</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                See how a single head verb changes its mandatory preposition depending on the following noun target.
              </p>
            </div>
          </div>

          {/* Trigger Word Selectors */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(shiftData).map((key) => (
              <button
                key={key}
                onClick={() => setActiveShiftWord(key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                  activeShiftWord === key
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-md ring-1 ring-amber-500/30"
                    : "bg-slate-950/60 text-slate-400 border border-slate-800 hover:border-slate-700"
                }`}
              >
                {shiftData[key].word}
              </button>
            ))}
          </div>

          {/* Active Shift Display */}
          <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-4">
            <div className="text-sm font-bold text-slate-200">
              Shift Matrix for: <span className="text-amber-400 font-mono text-base">{shiftData[activeShiftWord].word}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {shiftData[activeShiftWord].variants.map((v, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-extrabold text-emerald-400">
                      + {v.prep}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {v.target}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-300 bg-slate-950 p-2.5 rounded border border-slate-800/80">
                    "{v.eg}"
                  </p>
                  {showBengali && (
                    <p className="text-[11px] text-emerald-300/90 pt-1 border-t border-slate-800">
                      {v.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE MASTER FIXED PREPOSITION REPOSITORY                        */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <BookMarked className="w-6 h-6 text-indigo-400" />
              <div>
                <h2 className="text-xl font-bold text-white">Master Dependent Prepositions Catalog</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Search through high-frequency verb, adjective, and noun collocations.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search word or prep..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 w-44"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Word Classes</option>
                <option value="verb">Verbs</option>
                <option value="adjective">Adjectives</option>
                <option value="noun">Nouns</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-96 overflow-y-auto pr-1">
            {filteredCatalog.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between space-y-2 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{item.word}</span>
                    <span className="font-mono text-xs font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      {item.prep}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-semibold text-slate-500 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    {item.type}
                  </span>
                </div>
                <div className="text-xs text-slate-400">{item.meaning}</div>
                <div className="text-xs font-mono text-indigo-300 bg-slate-900/80 p-2 rounded border border-slate-800/60">
                  "{item.example}"
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. CLASSROOM BREAKDOWN WITH SUKANTA SIR                                    */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-br from-slate-900 to-indigo-950/30 rounded-2xl border border-indigo-900/40 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-indigo-900/50 pb-4">
            <Teacher />
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <span className="font-bold text-emerald-400">Student (Barrackpore): </span>
              "Sir, why does English have so many fixed prepositions that seem to violate normal spatial logic? Like why 'Congratulate ON' instead of 'FOR', or 'Senior TO' instead of 'THAN'?"
            </div>

            <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/40">
              <span className="font-bold text-indigo-300">Sukanta Sir: </span>
              "This is the heart of English Idiomatic Collocation. Fixed prepositions are governed by <span className="text-amber-400 font-semibold">Lexical Affinity</span>, not spatial physics:
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
                <li><strong>Latin Comparative Adjectives:</strong> Words borrowed from Latin ending in <em>-ior</em> (Senior, Junior, Superior, Inferior, Prior) historically took Dative case prepositions in Latin, which transferred to <span className="text-emerald-400 font-semibold">'TO'</span> in English. Never use 'than'!</li>
                <li><strong>The 'Of' Pattern:</strong> Emotions and states of lack or charge (Afraid, Proud, Aware, Devoid, Accused) consistently collocate with <span className="text-sky-400 font-semibold">'OF'</span>.</li>
                <li><strong>The 'From' Barrier Pattern:</strong> Any verb meaning prohibition or prevention (Abstain, Refrain, Prevent, Prohibit, Exempt) strictly binds with <span className="text-purple-400 font-semibold">'FROM'</span> + Gerund.</li>
              </ul>
              Master these clusters, and competitive exam cloze tests become automatic!"
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. SELF-ASSESSMENT MCQ DIAGNOSTIC LAB                                     */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-emerald-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Module Mastery Diagnostics</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Solve 30 high-yield fixed preposition items designed for competitive and board examination mastery.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono bg-emerald-500/10 text-emerald-300 px-3 py-1.5 rounded-full border border-emerald-500/20">
              30 Questions
            </span>
          </div>

          <div className="space-y-6">
            {questions.map((q) => {
              const selected = userAnswers[q.id];
              const isAnswered = selected !== undefined;
              const isCorrect = selected === q.correctAnswer;
              const isExpanded = revealedExplanations[q.id];

              return (
                <div
                  key={q.id}
                  className="bg-slate-950/60 rounded-xl border border-slate-800/80 p-5 space-y-4 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-200">
                      <span className="text-emerald-400 mr-2">Q{q.id}.</span>
                      {q.question}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, idx) => {
                      const isThisSelected = selected === opt;
                      const isThisCorrect = opt === q.correctAnswer;

                      let btnStyle = "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700";
                      if (isAnswered) {
                        if (isThisCorrect) {
                          btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-semibold";
                        } else if (isThisSelected) {
                          btnStyle = "bg-rose-950/60 border-rose-500 text-rose-300";
                        } else {
                          btnStyle = "bg-slate-900/40 border-slate-800/50 text-slate-500";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(q.id, opt)}
                          className={`p-3 rounded-lg text-left text-xs sm:text-sm border transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && isThisCorrect && (
                            <Check className="w-4 h-4 text-emerald-400 ml-2 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className="pt-2 flex flex-col gap-2">
                      <button
                        onClick={() => toggleExplanation(q.id)}
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 self-start flex items-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        {isExpanded ? "Hide Technical Explanation" : "View Technical Explanation & Bangla Note"}
                      </button>

                      {isExpanded && (
                        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs text-slate-300">
                          <div>
                            <span className="text-emerald-400 font-semibold">Explanation: </span>
                            {q.explanation}
                          </div>
                          {showBengali && q.explanationBn && (
                            <div className="text-slate-400 border-t border-slate-800/80 pt-2">
                              <span className="text-sky-400 font-semibold">বাংলা ব্যাখ্যা: </span>
                              {q.explanationBn}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. AUXILIARY TOOLS: WORD DICTIONARY, PRINTABLE NOTE & FAQS               */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <WordDictionary />
          <PlainTextPrint noteText={noteText} />
          <FAQTemplate
            faqList={[
              {
                q: "Why does 'look forward to' take a gerund (V-ing)?",
                a: "Because in 'look forward to', 'to' is a true Preposition (not an infinitive marker). All prepositions in English must take a Noun or Gerund as their syntactic object ('look forward to meeting you')."
              },
              {
                q: "What is the difference between 'good at' and 'proficient in'?",
                a: "'Good at' is standard colloquial and formal English for specific active skills ('good at chess/singing'). 'Proficient in' is higher-register academic English for disciplines, knowledge domains, or languages ('proficient in Spanish')."
              },
              {
                q: "Why do Latin comparatives take 'to' rather than 'than'?",
                a: "Latin comparatives ending in '-ior' (senior, junior, superior, inferior, prior) were borrowed with their historical dative relational case structure, requiring the directional preposition 'to'."
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
