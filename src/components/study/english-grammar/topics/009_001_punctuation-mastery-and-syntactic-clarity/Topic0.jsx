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
  Wrench,
  Sliders,
  ShieldCheck,
  Split,
  Boxes,
  Compass
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeRepairMethod, setActiveRepairMethod] = useState("semicolon");
  const [activePunctuationMark, setActivePunctuationMark] = useState("semicolon_mark");
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

  const spliceRepairs = {
    semicolon: {
      name: "1. Semicolon Repair",
      tag: "Best for closely related thoughts",
      broken: "The research laboratory was closed, the scientists worked from home.",
      repaired: "The research laboratory was closed; the scientists worked from home.",
      mechanism: "Replaces the weak comma with a balanced semicolon, joining two independent clauses.",
      bnNote: "কমা তুলে দিয়ে Semicolon (;) বসিয়ে দুটি স্বাধীন বাক্যকে সংযুক্ত রাখা হয়।"
    },
    period: {
      name: "2. Period (Full Stop) Repair",
      tag: "Best for distinct complete thoughts",
      broken: "The research laboratory was closed, the scientists worked from home.",
      repaired: "The research laboratory was closed. The scientists worked from home.",
      mechanism: "Splits the run-on into two clean, self-sufficient sentences.",
      bnNote: "কমা তুলে দিয়ে Full Stop (.) দিয়ে দুটি আলাদা বাক্য তৈরি করা হয়।"
    },
    fanboys: {
      name: "3. Comma + FANBOYS Repair",
      tag: "Best for explicit coordination",
      broken: "The research laboratory was closed, the scientists worked from home.",
      repaired: "The research laboratory was closed, so the scientists worked from home.",
      mechanism: "Inserts the coordinating conjunction 'so' after the comma to indicate cause-effect.",
      bnNote: "কমা-র পরে উপযুক্ত FANBOYS Conjunction (যেমন: so, and, but) যোগ করা হয়।"
    },
    subordination: {
      name: "4. Subordination Repair",
      tag: "Best for hierarchical depth",
      broken: "The research laboratory was closed, the scientists worked from home.",
      repaired: "Because the research laboratory was closed, the scientists worked from home.",
      mechanism: "Converts the first independent clause into a subordinate causal clause.",
      bnNote: "'Because / Since'-যুক্ত Subordinate Clause তৈরি করে বাক্যটিকে Complex করা হয়।"
    }
  };

  const punctuationMarks = {
    semicolon_mark: {
      name: "Semicolon (;)",
      rule: "Links independent clauses without conjunctions or separates complex lists with internal commas.",
      example: "Delegates arrived from Kolkata, India; London, UK; and Paris, France."
    },
    colon_mark: {
      name: "Colon (:)",
      rule: "Must follow a complete independent clause to introduce lists, amplifications, or formal quotes.",
      example: "She purchased three essential items: pens, notebooks, and ink."
    },
    em_dash: {
      name: "Em Dash (—)",
      rule: "Creates dramatic parenthetical interruption or sudden emphatic shifts in thought.",
      example: "The ultimate objective—world-class grammatical mastery—was achieved."
    },
    en_dash: {
      name: "En Dash (–)",
      rule: "Represents spans, ranges of numbers, dates, scores, or pages.",
      example: "Read pages 45–60 for tomorrow's seminar."
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* ========================================================================= */}
        {/* 1. HERO HEADER WITH BILINGUAL SWITCHER                                   */}
        {/* ========================================================================= */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-amber-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Module 009.001 • Punctuation Engineering
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Punctuation Mastery & Comma Splices
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the architectural road signs of English: the <span className="text-amber-400 font-semibold">4 Comma Splice Repair Mechanisms</span>, the <span className="text-sky-400 font-semibold">Oxford Comma</span>, and the precise deployment of <span className="text-emerald-400 font-semibold">Semicolons, Colons, and Dashes</span>.
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
        {/* 2. INTERACTIVE WORKBENCH: THE COMMA SPLICE REPAIR DOCTOR                  */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Wrench className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">The Comma Splice Hospital</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Observe how an illiterate comma splice is cured using the 4 standard grammatical remedies.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.keys(spliceRepairs).map((key) => (
              <button
                key={key}
                onClick={() => setActiveRepairMethod(key)}
                className={`p-3 rounded-xl text-left border text-xs font-bold transition-all ${
                  activeRepairMethod === key
                    ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-md ring-1 ring-amber-500/30"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div>{spliceRepairs[key].name}</div>
                <div className="text-[10px] font-normal text-slate-500 truncate mt-0.5">
                  {spliceRepairs[key].tag}
                </div>
              </button>
            ))}
          </div>

          <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Broken Splice */}
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                    Faulty Comma Splice (Run-On)
                  </span>
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-bold">
                    CORRUPTED
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-mono text-rose-200 bg-slate-950 p-2.5 rounded border border-rose-900/40 line-through">
                  "{spliceRepairs[activeRepairMethod].broken}"
                </div>
              </div>

              {/* Repaired Form */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Cured Grammatical Structure
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                    REPAIRED
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-mono text-emerald-200 bg-slate-950 p-2.5 rounded border border-emerald-900/40">
                  "{spliceRepairs[activeRepairMethod].repaired}"
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-300">
              <strong>Grammatical Remedy:</strong> {spliceRepairs[activeRepairMethod].mechanism}
            </div>

            {showBengali && (
              <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800">
                <strong className="text-emerald-400">বাংলা নোট:</strong> {spliceRepairs[activeRepairMethod].bnNote}
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE PUNCTUATION TOOLKIT MATRIX                                 */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Boxes className="w-6 h-6 text-sky-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Advanced Punctuation Suite</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Explore precise deployment rules for Semicolons, Colons, Em Dashes, and En Dashes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.keys(punctuationMarks).map((key) => (
              <button
                key={key}
                onClick={() => setActivePunctuationMark(key)}
                className={`p-3 rounded-xl text-left border text-xs font-bold transition-all ${
                  activePunctuationMark === key
                    ? "bg-sky-500/20 border-sky-500 text-sky-300 shadow-md ring-1 ring-sky-500/30"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div>{punctuationMarks[key].name}</div>
              </button>
            ))}
          </div>

          <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-4">
            <div className="text-sm font-bold text-white border-b border-slate-800 pb-3">
              Mark: <span className="text-sky-400">{punctuationMarks[activePunctuationMark].name}</span>
            </div>

            <div className="text-xs text-slate-300">
              <strong>Core Rule:</strong> {punctuationMarks[activePunctuationMark].rule}
            </div>

            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm font-mono text-emerald-300">
              "{punctuationMarks[activePunctuationMark].example}"
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
              <span className="font-bold text-amber-400">Student (Barrackpore): </span>
              "Sir, why is punctuation considered as important as grammar itself? Can a missing comma really change legal meaning?"
            </div>

            <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/40">
              <span className="font-bold text-indigo-300">Sukanta Sir: </span>
              "Punctuation is the structural geometry of human thought:
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
                <li><strong>The Life-Saving Vocative Comma:</strong> Look at: <span className="text-rose-400">'Let's eat grandma!'</span> vs <span className="text-emerald-400">'Let's eat, grandma!'</span> A missing comma literally transforms a dinner invitation into cannibalism!</li>
                <li><strong>The Million-Dollar Oxford Comma:</strong> In 2017, a Maine dairy company lost a $5 Million labor lawsuit solely because their overtime exemption clause lacked an Oxford comma before 'or distribution'.</li>
                <li><strong>The Colon Rule:</strong> Never put a colon immediately after a verb ('The items are: books'). The text preceding a colon MUST be a complete independent sentence ('She bought three items: books...')."</li>
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
              <HelpCircle className="w-6 h-6 text-amber-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Module Mastery Diagnostics</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Solve 25 diagnostic punctuation, comma splice, and syntactic clarity problems.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono bg-amber-500/10 text-amber-300 px-3 py-1.5 rounded-full border border-amber-500/20">
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
                      <span className="text-amber-400 mr-2">Q{q.id}.</span>
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
                q: "What is the difference between an Em Dash (—) and an En Dash (–)?",
                a: "An Em Dash (—) is long and used for dramatic parenthetical interruptions or emphatic breaks in thought. An En Dash (–) is medium-length and used strictly for spans of dates, numbers, pages, or scores (1914–1918)."
              },
              {
                q: "Why is 'Fresh Apple's' called a Grocer's Apostrophe?",
                a: "Because market stall signs frequently misplace apostrophes on simple plural nouns. Apostrophes indicate possession (the teacher's car) or contraction (it's), NEVER simple pluralization (Apples)."
              },
              {
                q: "When can a semicolon be used with a conjunction?",
                a: "When a list of items is long and already contains internal commas, semicolons are used to separate the main items, even before the final 'and' ('Kolkata, India; London, UK; and Paris, France')."
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
