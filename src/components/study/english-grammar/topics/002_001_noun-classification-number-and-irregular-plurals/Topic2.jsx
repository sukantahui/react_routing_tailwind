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
  Scale,
  Hash,
  Droplets,
  Package,
  FileText
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

export default function Topic2() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedDualNoun, setSelectedDualNoun] = useState("paper");
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

  const dualNouns = {
    paper: {
      noun: "PAPER",
      uncountable: "Material substance for writing / printing",
      uncountableEx: "We bought two reams of paper for the office.",
      uncountableBn: "কাঁচামাল বা কাগজ উপাদান অর্থে Uncountable: 'We need paper'.",
      countable: "An individual newspaper or academic research document",
      countableEx: "He published three research papers in international journals.",
      countableBn: "গবেষণাপত্র বা সংবাদপত্র অর্থে Countable: 'three research papers'।"
    },
    hair: {
      noun: "HAIR",
      uncountable: "The entire mass / head of hair considered as a whole",
      uncountableEx: "She has long, glossy black hair.",
      uncountableBn: "মাথার সম্পূর্ণ চুল অর্থে Uncountable: 'Her hair is black'.",
      countable: "Individual detached strands of hair",
      countableEx: "I found two white hairs on his navy blazer.",
      countableBn: "আলাদা আলাদা কয়েকটি চুল বা পশম বোঝাতে Countable: 'two white hairs'।"
    },
    glass: {
      noun: "GLASS",
      uncountable: "The brittle transparent mineral material",
      uncountableEx: "The skyscraper's facade is constructed from reinforced glass.",
      uncountableBn: "কাঁচ উপাদান হিসেবে Uncountable: 'Window made of glass'.",
      countable: "A drinking tumbler or container",
      countableEx: "Please pour me a glass of filtered water.",
      countableBn: "পানীয়ের গ্লাস অর্থে Countable: 'a glass of water'।"
    },
    iron: {
      noun: "IRON",
      uncountable: "The metallic chemical element (Fe)",
      uncountableEx: "Iron is essential for industrial engineering.",
      uncountableBn: "লোহা ধাতু অর্থে Uncountable: 'Iron is a hard metal'.",
      countable: "A household electrical appliance used for pressing clothes",
      countableEx: "She bought a cordless steam iron yesterday.",
      countableBn: "ইস্ত্রি করার যন্ত্র অর্থে Countable: 'an electric iron'।"
    },
    room: {
      noun: "ROOM",
      uncountable: "Unoccupied empty space or capacity",
      uncountableEx: "Is there room for one more passenger in the car?",
      uncountableBn: "ফাঁকা জায়গা বা স্থান অর্থে Uncountable: 'Is there room?'",
      countable: "A partitioned chamber in a building",
      countableEx: "Our new apartment has four spacious rooms.",
      countableBn: "ঘরের কক্ষ অর্থে Countable: 'four rooms'।"
    }
  };

  const partitiveCatalog = [
    { mass: "Information / Advice", partitive: "A piece of information / advice" },
    { mass: "Furniture / Equipment", partitive: "An item / piece of furniture" },
    { mass: "Bread", partitive: "A loaf of bread / two slices of bread" },
    { mass: "Soap", partitive: "A bar of soap / cake of soap" },
    { mass: "Paper", partitive: "A sheet of paper / ream of paper" },
    { mass: "Luggage", partitive: "A piece of luggage / article of baggage" }
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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-cyan-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                <Hash className="w-3.5 h-3.5" />
                Module 002.001 • Topic 2
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Countable vs Uncountable (Mass) Nouns
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the syntactic boundaries between countable entities and uncountable mass nouns. Learn partitive classifiers, quantifier pairing (*Many/Few vs Much/Little*), and dual-mode semantic shifts.
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
              <p className="font-semibold text-amber-300 mb-1">💡 বাংলা নির্দেশিকা (Topic 2):</p>
              যেসব Noun গণনা করা যায় তাদের <strong>Countable</strong> বলে (যেমন: Book, Chair); এদের বহুবচনে 's/es' বসে। যেসব Noun গণনা করা যায় না তাদের <strong>Uncountable (Mass)</strong> বলে (যেমন: Water, Information, Furniture); এদের সাথে কখনো 's/es' বা সরাসরি 'a/an' বসে না।
            </div>
          )}
        </header>

        {/* Section 1: Comparison Matrix */}
        <section className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Scale className="w-6 h-6 text-cyan-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. Countable vs Uncountable Syntactic Invariants</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Core grammatical rules governing number, determiners, and verbal concord.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Countable Card */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                Countable Nouns (গণনাযোগ্য)
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Pluralization: Freely takes plural '-s' / '-es' (e.g. <em>books, cities, cars</em>).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Articles: Takes indefinite 'a' / 'an' in singular (<em>a student, an apple</em>).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Quantifiers: Pairs with <strong>Many, Few, A few, Several</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Verb Concord: Takes singular OR plural verb depending on count.</span>
                </li>
              </ul>
            </div>

            {/* Uncountable Card */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                Uncountable Mass Nouns (অগণনযোগ্য)
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>Pluralization: <strong>NEVER</strong> takes plural '-s' (<em>informations, furnitures</em> [Wrong!]).</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>Articles: <strong>CANNOT</strong> take 'a' / 'an' directly without a classifier.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Quantifiers: Pairs with <strong>Much, Little, A little, A lot of</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Verb Concord: <strong>STRICTLY</strong> takes a Singular Verb (<em>The news IS good</em>).</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Partitive Classifiers Studio */}
        <section className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Package className="w-6 h-6 text-purple-400" />
            <div>
              <h2 className="text-xl font-bold text-white">2. Partitive Classifiers (How to Count Mass Nouns)</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                To isolate individual units of an uncountable noun, standard English attaches specialized partitive counters.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {partitiveCatalog.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-slate-400 font-mono block">
                  Mass: {item.mass}
                </span>
                <span className="text-xs font-semibold text-purple-300 font-mono">
                  {item.partitive}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Dual Meaning Shift Studio */}
        <section className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <FileText className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">3. Dual Countable & Uncountable Semantic Shifts</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Observe how words shift from uncountable raw substances to countable discrete objects.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.keys(dualNouns).map(key => (
              <button
                key={key}
                onClick={() => setSelectedDualNoun(key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                  selectedDualNoun === key
                    ? "bg-amber-600 text-white shadow-lg shadow-amber-950"
                    : "bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                {dualNouns[key].noun}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Uncountable Sense */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-2">
              <span className="text-xs font-bold text-cyan-400 uppercase font-mono tracking-wider">
                Uncountable Sense (Mass / Substance)
              </span>
              <p className="text-xs text-slate-300">
                {dualNouns[selectedDualNoun].uncountable}
              </p>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-white">
                "{dualNouns[selectedDualNoun].uncountableEx}"
              </div>
              {showBengali && (
                <p className="text-xs text-cyan-200/90 pt-1">
                  <strong>বাংলা:</strong> {dualNouns[selectedDualNoun].uncountableBn}
                </p>
              )}
            </div>

            {/* Countable Sense */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider">
                Countable Sense (Discrete Item / Unit)
              </span>
              <p className="text-xs text-slate-300">
                {dualNouns[selectedDualNoun].countable}
              </p>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-white">
                "{dualNouns[selectedDualNoun].countableEx}"
              </div>
              {showBengali && (
                <p className="text-xs text-emerald-200/90 pt-1">
                  <strong>বাংলা:</strong> {dualNouns[selectedDualNoun].countableBn}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Section 4: Interactive MCQ Diagnostic Assessment */}
        <section className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-amber-400" />
              <div>
                <h2 className="text-xl font-bold text-white">4. Topic Diagnostic Assessment</h2>
                <p className="text-xs text-slate-400">
                  10 Examination Questions on Countable vs Uncountable Invariants
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

        {/* Section 5: Auxiliary Tools */}
        <section className="space-y-8">
          <PlainTextPrint content={noteText} title="Module 002.001 Topic 2 Study Note - Countable vs Uncountable Nouns" />
          <WordDictionary />
          <Teacher note="Never write 'furnitures', 'informations', or 'sceneries' in competitive examinations. If you need to count them, write 'pieces of furniture' or 'items of information'! — Sukanta Hui" />
          <FAQTemplate
            faqList={[
              {
                question: "Why can't we say 'an advice' or 'many advices'?",
                answer: "'Advice' in standard English is an uncountable mass noun. To indicate a single unit, say 'a piece of advice'; for multiple units, say 'pieces of advice' or 'words of advice'."
              },
              {
                question: "What is the difference between 'much' and 'many'?",
                answer: "'Many' is strictly used with countable plural nouns (e.g. 'many questions', 'many students'). 'Much' is strictly used with uncountable mass nouns (e.g. 'much water', 'much time')."
              },
              {
                question: "How does 'hair' function as both countable and uncountable?",
                answer: "When referring to the complete collective hair on a person's head, it is uncountable ('Her hair is dark'). When referring to individual detached strands, it is countable ('There are two white hairs on your collar')."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/002_001_noun-classification-number-and-irregular-plurals/1"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 1 (5 Classes of Nouns)</span>
          </a>

          <a
            href="/english-grammar/topic/002_001_noun-classification-number-and-irregular-plurals/3"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 3 (Uncountable Noun Traps)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
