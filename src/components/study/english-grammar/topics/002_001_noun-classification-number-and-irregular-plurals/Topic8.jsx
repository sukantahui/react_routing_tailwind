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
  Scissors,
  Eye,
  Shield,
  Layers,
  Coins
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

export default function Topic8() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeCategory, setActiveCategory] = useState("tools");
  const [pairMode, setPairMode] = useState("bare"); // bare | single_pair | multi_pairs
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* HERO HEADER */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Module 002_001 · Topic 8
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Pluralia Tantum Invariants
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Pluralia Tantum: Nouns Existing Only in Plural Form
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                Explore dual-part tools (<em>scissors, tongs</em>), garments (<em>trousers, jeans</em>), and unmarked plurals (<em>cattle, police, poultry</em>) that invariably govern plural verbs.
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

        {/* 1. INTERACTIVE "A PAIR OF" HEAD NOUN SIMULATOR */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Scissors className="w-5 h-5 text-indigo-400" />
                <span>The "A Pair Of" Syntactic Head Noun Simulator</span>
              </h2>
              <p className="text-xs text-slate-400">See how adding a classifier shifts the grammatical subject head noun and verb concord</p>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800">
              <button
                onClick={() => setPairMode("bare")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  pairMode === "bare" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Bare Plural
              </button>
              <button
                onClick={() => setPairMode("single_pair")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  pairMode === "single_pair" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                "A pair of..."
              </button>
              <button
                onClick={() => setPairMode("multi_pairs")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  pairMode === "multi_pairs" ? "bg-amber-600 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                "Three pairs of..."
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Scissors */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-indigo-400 text-sm font-mono">SCISSORS</span>
              <p className="text-slate-200 font-mono text-xs">
                {pairMode === "bare" && "The scissors ARE sharp."}
                {pairMode === "single_pair" && "A pair of scissors IS on the desk."}
                {pairMode === "multi_pairs" && "Three pairs of scissors ARE in the drawer."}
              </p>
              <p className="text-[11px] text-slate-400 italic">
                {pairMode === "bare" && "Head: 'Scissors' (Plural) → ARE"}
                {pairMode === "single_pair" && "Head: 'A pair' (Singular) → IS"}
                {pairMode === "multi_pairs" && "Head: 'Three pairs' (Plural) → ARE"}
              </p>
            </div>

            {/* Spectacles */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400 text-sm font-mono">SPECTACLES</span>
              <p className="text-slate-200 font-mono text-xs">
                {pairMode === "bare" && "His spectacles WERE misplaced."}
                {pairMode === "single_pair" && "A pair of spectacles WAS purchased."}
                {pairMode === "multi_pairs" && "Two pairs of spectacles WERE ordered."}
              </p>
              <p className="text-[11px] text-slate-400 italic">
                {pairMode === "bare" && "Head: 'Spectacles' → WERE"}
                {pairMode === "single_pair" && "Head: 'A pair' → WAS"}
                {pairMode === "multi_pairs" && "Head: 'Two pairs' → WERE"}
              </p>
            </div>

            {/* Trousers */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-400 text-sm font-mono">TROUSERS</span>
              <p className="text-slate-200 font-mono text-xs">
                {pairMode === "bare" && "These trousers ARE tailored."}
                {pairMode === "single_pair" && "This pair of trousers IS stylish."}
                {pairMode === "multi_pairs" && "Five pairs of trousers ARE washed."}
              </p>
              <p className="text-[11px] text-slate-400 italic">
                {pairMode === "bare" && "Head: 'Trousers' → ARE"}
                {pairMode === "single_pair" && "Head: 'This pair' → IS"}
                {pairMode === "multi_pairs" && "Head: 'Five pairs' → ARE"}
              </p>
            </div>
          </div>

          {showBengali && (
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 text-xs">
              <strong>বাংলা নিয়ম:</strong> কাঁচি বা প্যান্টের মতো দুই অংশযুক্ত জিনিসে শুধু নাম থাকলে Plural Verb ('are') বসে; কিন্তু 'A pair of' থাকলে মূল Subject হয় 'A pair' (একবচন), তাই Singular Verb ('is') বসে।
            </div>
          )}
        </div>

        {/* 2. PLURALIA TANTUM CATEGORY CATALOG */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                <span>The 4 Taxonomies of Plural-Only Nouns</span>
              </h2>
              <p className="text-xs text-slate-400">Select a category below to explore specific vocabulary and concord examples</p>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "tools", label: "A. Dual-Part Tools (Scissors, Pincers, Tongs)" },
              { id: "garments", label: "B. Garments & Eyewear (Trousers, Jeans, Glasses)" },
              { id: "unmarked", label: "C. Unmarked Plurals (Cattle, Police, Poultry, Gentry)" },
              { id: "misc", label: "D. Miscellaneous (Assets, Alms, Proceeds, Riches)" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all border ${
                  activeCategory === tab.id
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-950 scale-105"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-4">
            {activeCategory === "tools" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { n: "Scissors", ex: "The surgical scissors are sterilized in the autoclave." },
                  { n: "Pincers", ex: "Iron pincers are used to extract embedded nails." },
                  { n: "Tongs", ex: "Coal tongs are kept beside the fireplace." },
                  { n: "Bellows", ex: "The blacksmith's bellows blow air into the forge." },
                  { n: "Tweezers", ex: "Fine tweezers are needed to hold delicate clock parts." },
                  { n: "Pliers", ex: "Insulated pliers are safe for electrical repairs." }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-indigo-400 font-mono">{item.n}</span>
                    <p className="text-slate-300 text-[11px] italic">"{item.ex}"</p>
                  </div>
                ))}
              </div>
            )}

            {activeCategory === "garments" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { n: "Trousers / Pants", ex: "His formal trousers are pressed and hung in the wardrobe." },
                  { n: "Jeans / Shorts", ex: "Denim jeans are durable for rugged terrain." },
                  { n: "Pyjamas", ex: "Comfortable cotton pyjamas are worn at night." },
                  { n: "Spectacles / Glasses", ex: "My reading spectacles have high-index lenses." },
                  { n: "Goggles", ex: "Chemical safety goggles are mandatory in the lab." },
                  { n: "Binoculars", ex: "High-magnification binoculars are ideal for astronomy." }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-emerald-400 font-mono">{item.n}</span>
                    <p className="text-slate-300 text-[11px] italic">"{item.ex}"</p>
                  </div>
                ))}
              </div>
            )}

            {activeCategory === "unmarked" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { n: "Cattle", ex: "The dairy cattle are grazing peacefully (NEVER *cattles)." },
                  { n: "Police", ex: "The police are patrolling the Barrackpore station area." },
                  { n: "Poultry", ex: "Farm poultry are checked weekly by veterinarians." },
                  { n: "Gentry", ex: "The landed gentry were present at the grand gala." },
                  { n: "Peasantry", ex: "The rural peasantry were exempted from the new toll tax." },
                  { n: "Vermin", ex: "Harmful vermin destroy stored grain in granaries." }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-amber-400 font-mono">{item.n} (Unmarked Plural)</span>
                    <p className="text-slate-300 text-[11px] italic">"{item.ex}"</p>
                  </div>
                ))}
              </div>
            )}

            {activeCategory === "misc" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { n: "Assets", ex: "All corporate assets were liquidated to settle debts." },
                  { n: "Alms", ex: "Generous alms were distributed to the destitute." },
                  { n: "Proceeds", ex: "The net proceeds were donated to the relief fund." },
                  { n: "Riches", ex: "Riches have wings and often vanish swiftly." },
                  { n: "Thanks", ex: "Sincere thanks were offered to the keynote speakers." },
                  { n: "Surroundings", ex: "The scenic surroundings are peaceful and refreshing." }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-rose-400 font-mono">{item.n}</span>
                    <p className="text-slate-300 text-[11px] italic">"{item.ex}"</p>
                  </div>
                ))}
              </div>
            )}
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
                  Topic 8 Diagnostic Quiz: Pluralia Tantum
                </h2>
                <p className="text-xs text-slate-400">Test your mastery of dual-part tools, garments, and unmarked plurals</p>
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
                  <p className="text-sm font-semibold text-slate-100 whitespace-pre-line">{q.question}</p>
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
            title="Module 002_001 Topic 8 Assessment & Practice Bank"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 8: Pluralia Tantum: Nouns Existing Only in Plural Form"
          />

          <WordDictionary />

          <Teacher
            note="Pluralia tantum words have no singular counterpart. Never drop the '-s' from scissors or spectacles, and always verify if 'a pair of' is present! — Sukanta Hui"
          />
        </div>

        {/* BIDIRECTIONAL NAVIGATION FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <a
            href="/english-grammar/module/002_001_noun-classification-number-and-irregular-plurals/topic-7"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-all hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 7 (Foreign Plurals)</span>
          </a>

          <a
            href="/english-grammar/module/002_001_noun-classification-number-and-irregular-plurals/topic-9"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-950"
          >
            <span>Next: Topic 9 (Plural in Form but Singular in Meaning)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
