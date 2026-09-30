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
  Search,
  Sliders,
  ShieldAlert,
  Boxes,
  Split,
  Tag
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeVerbFamily, setActiveVerbFamily] = useState("break");
  const [sandwichMode, setSandwichMode] = useState("noun");
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

  const verbFamilies = {
    break: {
      name: "BREAK",
      color: "from-rose-500 to-red-600",
      items: [
        { particle: "down", meaning: "Fail mechanically (engine) or collapse emotionally", eg: "The bus broke down on GT Road.", bn: "যন্ত্র বিকল হওয়া বা কান্নায় ভেঙে পড়া" },
        { particle: "out", meaning: "Erupt suddenly (war, epidemic, fire, riot)", eg: "Cholera broke out in the slum.", bn: "যুদ্ধ, আগুন বা মহামারী হঠাৎ ছড়িয়ে পড়া" },
        { particle: "into", meaning: "Force illegal entry into a building", eg: "Thieves broke into the jewellery showroom.", bn: "চুরির উদ্দেশ্যে জোর করে প্রবেশ করা" },
        { particle: "up", meaning: "Disperse a crowd / end a relationship / vacation starts", eg: "College breaks up for Puja vacation.", bn: "ছুটি হওয়া বা ভিড় ছত্রভঙ্গ হওয়া" },
        { particle: "off", meaning: "Stop speaking abruptly / terminate an engagement", eg: "He broke off in the middle of his sentence.", bn: "হঠাৎ কথা বন্ধ করা বা বাগদান ভাঙা" }
      ]
    },
    bring: {
      name: "BRING",
      color: "from-amber-500 to-orange-600",
      items: [
        { particle: "about", meaning: "Cause to happen / produce a result", eg: "New policies brought about economic revival.", bn: "কোনো ঘটনা ঘটানো" },
        { particle: "up", meaning: "Rear/nurture a child OR introduce a topic", eg: "She was brought up by her aunt.", bn: "সন্তান লালন-পালন করা বা আলোচনার বিষয় তোলা" },
        { particle: "out", meaning: "Publish a book or reveal hidden talent", eg: "The publisher brought out a new grammar book.", bn: "বই প্রকাশ করা বা গুণ প্রকাশ করা" },
        { particle: "round", meaning: "Restore consciousness or persuade someone", eg: "Smelling salts brought him round.", bn: "জ্ঞান ফিরিয়ে আনা বা মত পরিবর্তন করানো" }
      ]
    },
    call: {
      name: "CALL",
      color: "from-sky-500 to-blue-600",
      items: [
        { particle: "off", meaning: "Cancel an event, meeting, or strike", eg: "The workers called off the hunger strike.", bn: "বাতিল বা প্রত্যাহার করা" },
        { particle: "on", meaning: "Visit someone formally in person", eg: "I called on the District Magistrate yesterday.", bn: "কারো সাথে দেখা করতে যাওয়া" },
        { particle: "for", meaning: "Demand or require urgently", eg: "The scam calls for a judicial probe.", bn: "দাবি করা বা প্রয়োজন হওয়া" },
        { particle: "in", meaning: "Summon a specialist or doctor", eg: "Please call in a doctor without delay.", bn: "ডাক্তার বা বিশেষজ্ঞ ডেকে পাঠানো" }
      ]
    },
    come: {
      name: "COME",
      color: "from-emerald-500 to-teal-600",
      items: [
        { particle: "across", meaning: "Meet or find unexpectedly by chance", eg: "I came across an old manuscript in the library.", bn: "হঠাৎ অপ্রত্যাশিতভাবে খুঁজে পাওয়া" },
        { particle: "by", meaning: "Acquire or obtain something scarce", eg: "How did you come by this vintage watch?", bn: "কষ্টে বা কৌশলে কিছু অর্জন/পাওয়া" },
        { particle: "of", meaning: "Originate or descend from lineage", eg: "She comes of an aristocratic family.", bn: "অভিজাত বা নির্দিষ্ট পরিবারে জন্ম নেওয়া" },
        { particle: "round", meaning: "Recover consciousness or agree to terms", eg: "The patient will soon come round.", bn: "জ্ঞান ফিরে পাওয়া" }
      ]
    },
    get: {
      name: "GET",
      color: "from-indigo-500 to-purple-600",
      items: [
        { particle: "over", meaning: "Recover from shock, sorrow, or illness", eg: "He has finally got over his depression.", bn: "শোক বা রোগ কাটিয়ে ওঠা" },
        { particle: "along with", meaning: "Maintain friendly harmonious relations", eg: "She gets along with all her colleagues.", bn: "কারো সাথে সদ্ভাব বজায় রাখা" },
        { particle: "through", meaning: "Pass an examination or connect by phone", eg: "He got through the Civil Services exam.", bn: "পরীক্ষায় উত্তীর্ণ হওয়া" },
        { particle: "away with", meaning: "Escape penalty for a crime/misdeed", eg: "You cannot get away with tax fraud.", bn: "অন্যায় করে শাস্তি এড়ানো" }
      ]
    },
    look: {
      name: "LOOK",
      color: "from-cyan-500 to-sky-600",
      items: [
        { particle: "after", meaning: "Take care of / nurture someone", eg: "Nurse looked after the injured child.", bn: "কারো যত্ন বা দেখভাল করা" },
        { particle: "into", meaning: "Investigate facts of a matter or crime", eg: "Police are looking into the bank robbery.", bn: "তদন্ত করা" },
        { particle: "down upon", meaning: "Despise or treat with contempt", eg: "Never look down upon the underprivileged.", bn: "কাউকে হেয় বা অবজ্ঞা করা" },
        { particle: "up to", meaning: "Admire and respect as a role model", eg: "Students look up to Sukanta Sir.", bn: "কাউকে শ্রদ্ধা বা সম্মান করা" },
        { particle: "up", meaning: "Search for word/data in reference book", eg: "Look up the word in the dictionary.", bn: "অভিধানে কোনো শব্দ খোঁজা" }
      ]
    },
    put: {
      name: "PUT",
      color: "from-yellow-500 to-amber-600",
      items: [
        { particle: "off", meaning: "Postpone or delay an action", eg: "Never put off till tomorrow your duties.", bn: "স্থগিত রাখা বা দেরি করা" },
        { particle: "out", meaning: "Extinguish a fire, candle, or cigarette", eg: "Firemen put out the blazing fire.", bn: "আগুন নেভানো" },
        { particle: "up with", meaning: "Tolerate or bear unpleasant behavior", eg: "I cannot put up with such arrogance.", bn: "সহ্য করা বা মানিয়ে নেওয়া" },
        { particle: "on", meaning: "Wear clothing or feign an emotion", eg: "Put on your warm jacket.", bn: "পোশাক পরিধান করা" }
      ]
    },
    turn: {
      name: "TURN",
      color: "from-purple-500 to-pink-600",
      items: [
        { particle: "down", meaning: "Reject a proposal, job, or application", eg: "She turned down the lucrative offer.", bn: "প্রস্তাব প্রত্যাখ্যান করা" },
        { particle: "up", meaning: "Arrive or appear unexpectedly", eg: "The lost puppy turned up after two days.", bn: "হঠাৎ হাজির হওয়া" },
        { particle: "off", meaning: "Switch off electrical device / disinterest", eg: "Turn off the air conditioner.", bn: "সুইচ বন্ধ করা" },
        { particle: "out", meaning: "Prove to be in the end / produce", eg: "The rumor turned out to be completely false.", bn: "শেষ পর্যন্ত প্রমাণিত হওয়া" }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* ========================================================================= */}
        {/* 1. HERO HEADER WITH BILINGUAL SWITCHER                                   */}
        {/* ========================================================================= */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-rose-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-rose-500/10 text-rose-300 border border-rose-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Module 006.003 • Particle Mechanics
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Phrasal Verbs & Idiomatic Expressions
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the architectural mechanics of <span className="text-rose-400 font-semibold">Verb + Particle</span> combinations, the infallible <span className="text-amber-400 font-semibold">Pronoun Sandwich Rule</span>, and the 8 Grand Phrasal Verb Families.
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
        {/* 2. INTERACTIVE PRONOUN SANDWICH LAW SIMULATOR                             */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Flame className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">The Pronoun Sandwich Law Simulator</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Observe the structural shift when the direct object changes from a Noun to a Pronoun.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setSandwichMode("noun")}
              className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                sandwichMode === "noun"
                  ? "bg-indigo-600 text-white border-indigo-500 shadow-md"
                  : "bg-slate-950/60 text-slate-400 border-slate-800"
              }`}
            >
              Object is a NOUN ("the light")
            </button>
            <button
              onClick={() => setSandwichMode("pronoun")}
              className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                sandwichMode === "pronoun"
                  ? "bg-amber-600 text-white border-amber-500 shadow-md"
                  : "bg-slate-950/60 text-slate-400 border-slate-800"
              }`}
            >
              Object is a PRONOUN ("it")
            </button>
          </div>

          {sandwichMode === "noun" ? (
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Flexible Placement Allowed (Both are 100% Correct)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span className="font-mono text-xs sm:text-sm text-emerald-300">
                    "Please <strong className="text-white">turn off</strong> the light."
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
                    VALID
                  </span>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span className="font-mono text-xs sm:text-sm text-emerald-300">
                    "Please <strong className="text-white">turn the light off</strong>."
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
                    VALID
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Strict Pronoun Sandwich Constraint (Mandatory Separation)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
                  <span className="font-mono text-xs sm:text-sm text-emerald-200">
                    "Please <strong className="text-amber-400 underline">turn it off</strong>."
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                    100% CORRECT
                  </span>
                </div>
                <div className="p-3.5 rounded-lg bg-rose-950/40 border border-rose-500/40 flex items-center justify-between">
                  <span className="font-mono text-xs sm:text-sm text-rose-200 line-through">
                    "Please turn off it."
                  </span>
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-bold">
                    VIOLATION
                  </span>
                </div>
              </div>
              {showBengali && (
                <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800">
                  <strong className="text-amber-400">Golden Rule:</strong> যখন Object কোনো Pronoun (it, them, him, her) হয়, তখন তাকে Verb এবং Particle-এর ঠিক মাঝখানে বসাতেই হবে (Sandwich Rule)।
                </div>
              )}
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE 8 GRAND PHRASAL VERB FAMILIES                              */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Boxes className="w-6 h-6 text-indigo-400" />
            <div>
              <h2 className="text-xl font-bold text-white">The 8 Grand Phrasal Verb Families</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Explore high-yield collocations categorized by their base verbal roots.
              </p>
            </div>
          </div>

          {/* Family Selectors */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {Object.keys(verbFamilies).map((key) => (
              <button
                key={key}
                onClick={() => setActiveVerbFamily(key)}
                className={`py-2 px-1 text-center rounded-xl text-xs font-extrabold uppercase transition-all ${
                  activeVerbFamily === key
                    ? "bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-400/40"
                    : "bg-slate-950/60 text-slate-400 border border-slate-800 hover:border-slate-700"
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Active Family Particle Cards */}
          <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-base">
                Base Verb: <span className="text-indigo-400 font-mono">{verbFamilies[activeVerbFamily].name}</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {verbFamilies[activeVerbFamily].items.length} High-Yield Collocations
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {verbFamilies[activeVerbFamily].items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black font-mono text-amber-400">
                      {verbFamilies[activeVerbFamily].name} + {item.particle.toUpperCase()}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      Collocation
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    {item.meaning}
                  </div>
                  <div className="text-xs font-mono text-sky-300 bg-slate-950 p-2 rounded border border-slate-800/80">
                    "{item.eg}"
                  </div>
                  {showBengali && (
                    <div className="text-[11px] text-emerald-400/90 pt-1 border-t border-slate-800">
                      <strong>অর্থ:</strong> {item.bn}
                    </div>
                  )}
                </div>
              ))}
            </div>
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
              <span className="font-bold text-rose-400">Student (Barrackpore): </span>
              "Sir, in Bengali we have compound verbs like 'ফেলে দেওয়া', 'তুলে নেওয়া'. Are Phrasal Verbs equivalent to that, and why are 3-part phrasal verbs always inseparable?"
            </div>

            <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/40">
              <span className="font-bold text-indigo-300">Sukanta Sir: </span>
              "Exactly! Bengali uses compound verbal sequences (সংযুক্ত ক্রিয়া), whereas English attaches adverbial and prepositional particles to alter the core verb's semantics:
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
                <li><strong>Literal (Compositional):</strong> 'Look up at the plane' simply means directing your eyes upward.</li>
                <li><strong>Figurative (Non-Compositional):</strong> 'Look up a word' or 'Business is looking up' represents fused idiomatic meaning.</li>
                <li><strong>Three-Part Multi-Word Verbs:</strong> Structures like <span className="text-amber-400 font-semibold">'Put up with'</span>, <span className="text-sky-400 font-semibold">'Look down upon'</span>, and <span className="text-emerald-400 font-semibold">'Run out of'</span> possess two chained particles (Adverb + Preposition). The final preposition binds tightly to its object, making the entire compound 100% INSEPARABLE.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. SELF-ASSESSMENT MCQ DIAGNOSTIC LAB                                     */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-rose-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Module Mastery Diagnostics</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Solve 25 diagnostic phrasal verb and particle mechanics problems.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono bg-rose-500/10 text-rose-300 px-3 py-1.5 rounded-full border border-rose-500/20">
              25 Questions
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
                      <span className="text-rose-400 mr-2">Q{q.id}.</span>
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
                q: "What is an adverb particle in phrasal verbs?",
                a: "An adverb particle is a spatial word (like 'up', 'down', 'off', 'out') functioning not to indicate a physical path, but to modify or transform the lexical meaning of the base verb ('break down', 'give in')."
              },
              {
                q: "Why can't we say 'give up it'?",
                a: "English grammar enforces the 'Pronoun Sandwich Rule': pronouns have low phonological stress and cannot be stranded after the heavy particle at the end of a clause. They must be embraced between the verb and particle ('give IT up')."
              },
              {
                q: "How do I know if a phrasal verb is separable or inseparable?",
                a: "Most transitive 'Verb + Adverb' combinations (turn off, pick up, put on) are separable with nouns. However, all 'Verb + Preposition' (look after) and '3-Part Verbs' (put up with, look forward to) are strictly inseparable."
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
