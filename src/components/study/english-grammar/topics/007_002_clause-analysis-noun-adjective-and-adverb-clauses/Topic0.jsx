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
  GitBranch,
  Split,
  Sliders,
  ShieldCheck,
  Eye,
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
  const [activeClauseClass, setActiveClauseClass] = useState("noun");
  const [selectedNounRole, setSelectedNounRole] = useState("subject");
  const [selectedRelativeType, setSelectedRelativeType] = useState("defining");
  const [selectedAdvType, setSelectedAdvType] = useState("time");
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

  const nounRoles = {
    subject: {
      title: "1. Subject of a Finite Verb",
      example: "That he will recover soon is certain.",
      analysis: "The whole clause 'That he will recover soon' acts as the subject of the linking verb 'is'.",
      bnNote: "ক্লজটি মূল ভার্বের কর্তা (Subject) হিসেবে কাজ করছে।"
    },
    object: {
      title: "2. Object of a Transitive Verb",
      example: "I know that honesty is the best policy.",
      analysis: "The clause answers 'What do I know?' and serves as the direct object of the verb 'know'.",
      bnNote: "ক্লজটি সকর্মক ক্রিয়ার কর্ম (Direct Object) হিসেবে কাজ করছে।"
    },
    prep_object: {
      title: "3. Object of a Preposition",
      example: "Pay close attention to what your mentor explains.",
      analysis: "The clause is governed by and acts as the syntactic object of the preposition 'to'.",
      bnNote: "Preposition-এর অবজেক্ট হিসেবে বসেছে।"
    },
    complement: {
      title: "4. Subject Complement",
      example: "The harsh reality is that we lack sufficient resources.",
      analysis: "Follows the linking verb 'is' to complete the meaning and definition of 'reality'.",
      bnNote: "Linking Verb-এর পরে বসে Subject-এর অর্থ সম্পূর্ণ করছে।"
    },
    apposition: {
      title: "5. In Apposition to a Noun",
      example: "The rumor that the minister resigned is completely unfounded.",
      analysis: "Explains the exact internal content of the antecedent noun 'rumor'.",
      bnNote: "Noun-এর পাশে বসে তার ভেতরের বিষয়বস্তু প্রকাশ করছে (Apposition)।"
    }
  };

  const relativeTypes = {
    defining: {
      title: "Defining (Restrictive) Relative Clause",
      status: "Essential to Sentence Meaning",
      commas: "NO COMMAS ALLOWED",
      pronouns: "'That', 'Which', 'Who', 'Whom', 'Whose'",
      omission: "Pronoun can be omitted if functioning as clause object",
      example: "The scientist who discovered penicillin saved millions of lives.",
      bnNote: "কোন নির্দিষ্ট ব্যক্তি বা বস্তুকে চিহ্নিত করতে অপরিহার্য; এতে কোনো কমা বসে না।"
    },
    non_defining: {
      title: "Non-Defining (Parenthetical) Relative Clause",
      status: "Extra, Non-Essential Information",
      commas: "ENCLOSED IN COMMAS ( , )",
      pronouns: "'Who', 'Whom', 'Whose', 'Which' (NEVER 'That'!)",
      omission: "Pronoun can NEVER be omitted",
      example: "Dr. Alexander Fleming, who discovered penicillin, was a Scottish physician.",
      bnNote: "অতিরিক্ত তথ্য দেয় যা বাদ দিলেও মূল বাক্য স্বয়ংসম্পূর্ণ থাকে; কমা দিয়ে ঘেরা থাকে এবং এতে 'that' ব্যবহার করা সম্পূর্ণ নিষেধ।"
    }
  };

  const advTypes = {
    time: { name: "Time", connectors: "when, while, before, after, as soon as, until", eg: "As soon as the bell rang, the students departed." },
    place: { name: "Place", connectors: "where, wherever, whither", eg: "Fools rush in where angels fear to tread." },
    reason: { name: "Cause / Reason", connectors: "because, since, as, for", eg: "He was awarded because he showed exemplary courage." },
    purpose: { name: "Purpose", connectors: "so that, in order that, lest (+ should)", eg: "Work systematically so that you may achieve mastery." },
    result: { name: "Result / Consequence", connectors: "so... that, such... that", eg: "He was so exhausted that he fell asleep immediately." },
    condition: { name: "Condition", connectors: "if, unless, provided that, in case", eg: "Unless you prepare thoroughly, success is elusive." },
    concession: { name: "Concession / Contrast", connectors: "although, though, even though, whereas", eg: "Although he is wealthy, he lives modestly." },
    manner: { name: "Manner", connectors: "as, as if, as though", eg: "He spoke as though he had witnessed the entire crime." }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* ========================================================================= */}
        {/* 1. HERO HEADER WITH BILINGUAL SWITCHER                                   */}
        {/* ========================================================================= */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-purple-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-purple-500/10 text-purple-300 border border-purple-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Module 007.002 • Clause Architecture
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Clause Analysis: Noun, Relative & Adverb Clauses
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Deconstruct complex sentences: the <span className="text-purple-400 font-semibold">5 Syntactic Roles of Noun Clauses</span>, <span className="text-sky-400 font-semibold">Defining vs Non-Defining Relative Clauses</span>, and the 9-class <span className="text-emerald-400 font-semibold">Adverbial Spectrum</span>.
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
        {/* 2. INTERACTIVE WORKBENCH: THE CLAUSE PARSER STUDIO                        */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <GitBranch className="w-6 h-6 text-purple-400" />
              <div>
                <h2 className="text-xl font-bold text-white">Interactive Clause Parser Studio</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Select a subordinate clause family to explore its internal syntactic mechanics.
                </p>
              </div>
            </div>

            <div className="flex gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveClauseClass("noun")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeClauseClass === "noun"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Noun Clauses (5 Roles)
              </button>
              <button
                onClick={() => setActiveClauseClass("relative")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeClauseClass === "relative"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Relative Clauses
              </button>
              <button
                onClick={() => setActiveClauseClass("adverb")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeClauseClass === "adverb"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Adverbial Clauses
              </button>
            </div>
          </div>

          {activeClauseClass === "noun" && (
            <div className="space-y-6">
              {/* Noun Role Selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {Object.keys(nounRoles).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedNounRole(key)}
                    className={`p-2.5 rounded-xl text-xs font-bold uppercase transition-all ${
                      selectedNounRole === key
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-md ring-1 ring-purple-500/30"
                        : "bg-slate-950/60 text-slate-400 border border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {key.replace("_", " ")}
                  </button>
                ))}
              </div>

              {/* Active Role Card */}
              <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-base">
                    {nounRoles[selectedNounRole].title}
                  </h3>
                  <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">
                    Nominal Function
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-sm font-mono text-purple-200">
                  "{nounRoles[selectedNounRole].example}"
                </div>

                <div className="text-xs text-slate-300">
                  <strong>Syntactic Diagnostic:</strong> {nounRoles[selectedNounRole].analysis}
                </div>

                {showBengali && (
                  <div className="p-3 bg-emerald-950/30 rounded-lg text-xs text-emerald-200 border border-emerald-800/40">
                    <strong>বাংলা ব্যাখ্যা:</strong> {nounRoles[selectedNounRole].bnNote}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeClauseClass === "relative" && (
            <div className="space-y-6">
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedRelativeType("defining")}
                  className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                    selectedRelativeType === "defining"
                      ? "bg-sky-600 text-white border-sky-500 shadow-md"
                      : "bg-slate-950/60 text-slate-400 border-slate-800"
                  }`}
                >
                  Defining (Restrictive)
                </button>
                <button
                  onClick={() => setSelectedRelativeType("non_defining")}
                  className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                    selectedRelativeType === "non_defining"
                      ? "bg-amber-600 text-white border-amber-500 shadow-md"
                      : "bg-slate-950/60 text-slate-400 border-slate-800"
                  }`}
                >
                  Non-Defining (Parenthetical)
                </button>
              </div>

              <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-base">
                    {relativeTypes[selectedRelativeType].title}
                  </h3>
                  <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded border border-sky-500/20">
                    {relativeTypes[selectedRelativeType].status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400 font-semibold">Punctuation Rule:</span>
                    <div className="text-amber-300 font-bold mt-1">{relativeTypes[selectedRelativeType].commas}</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400 font-semibold">Permitted Pronouns:</span>
                    <div className="text-sky-300 font-bold mt-1">{relativeTypes[selectedRelativeType].pronouns}</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-sm font-mono text-emerald-300">
                  "{relativeTypes[selectedRelativeType].example}"
                </div>

                {showBengali && (
                  <div className="p-3 bg-emerald-950/30 rounded-lg text-xs text-emerald-200 border border-emerald-800/40">
                    <strong>বাংলা ব্যাখ্যা:</strong> {relativeTypes[selectedRelativeType].bnNote}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeClauseClass === "adverb" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.keys(advTypes).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedAdvType(key)}
                    className={`p-2.5 rounded-xl text-xs font-bold uppercase transition-all ${
                      selectedAdvType === key
                        ? "bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/40"
                        : "bg-slate-950/60 text-slate-400 border border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {advTypes[key].name}
                  </button>
                ))}
              </div>

              <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-base">
                    Adverbial Clause of {advTypes[selectedAdvType].name}
                  </h3>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                    Adverbial Modifier
                  </span>
                </div>

                <div className="text-xs text-slate-300">
                  <strong>Trigger Connectives:</strong> <span className="font-mono text-emerald-300">{advTypes[selectedAdvType].connectors}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-sm font-mono text-sky-200">
                  "{advTypes[selectedAdvType].eg}"
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 3. CLASSROOM BREAKDOWN WITH SUKANTA SIR                                    */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-br from-slate-900 to-indigo-950/30 rounded-2xl border border-indigo-900/40 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-indigo-900/50 pb-4">
            <Teacher />
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <span className="font-bold text-purple-400">Student (Barrackpore): </span>
              "Sir, how do we distinguish between an Adjective Clause introduced by 'that' and a Noun Clause in Apposition introduced by 'that'?"
            </div>

            <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/40">
              <span className="font-bold text-indigo-300">Sukanta Sir: </span>
              "This is the ultimate diagnostic test for competitive exams:
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
                <li><strong>In an Adjective (Relative) Clause:</strong> 'THAT' is a Relative Pronoun replacing the antecedent noun within the clause. You can substitute 'that' with 'which' ('The report THAT/WHICH he prepared was accurate').</li>
                <li><strong>In a Noun Clause in Apposition:</strong> 'THAT' is a pure Subordinating Conjunction. It does NOT replace the noun; it merely introduces the internal content/statement of the noun ('The report THAT he had resigned was true'). You CANNOT replace 'that' with 'which' here!</li>
              </ul>
              Always apply the 'Which-Replacement Diagnostic'!"
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SELF-ASSESSMENT MCQ DIAGNOSTIC LAB                                     */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-purple-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Module Mastery Diagnostics</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Solve 25 diagnostic clause parsing and syntactic role problems.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono bg-purple-500/10 text-purple-300 px-3 py-1.5 rounded-full border border-purple-500/20">
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
                      <span className="text-purple-400 mr-2">Q{q.id}.</span>
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
        {/* 5. AUXILIARY TOOLS: WORD DICTIONARY, PRINTABLE NOTE & FAQS               */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <WordDictionary />
          <PlainTextPrint noteText={noteText} />
          <FAQTemplate
            faqList={[
              {
                q: "What is a Contact Clause?",
                a: "A Contact Clause is a defining relative clause where the relative pronoun (whom/which/that) is omitted because it functions as the grammatical object of the clause (e.g., 'The book I bought' instead of 'The book that I bought')."
              },
              {
                q: "Why can't 'that' be used in non-defining relative clauses?",
                a: "'That' by historical syntax is exclusively a restrictive (defining) relative pronoun in modern standard English. Non-defining clauses require the parenthetical relative pronouns 'who' or 'which' enclosed in commas."
              },
              {
                q: "How can I easily find the number of clauses in a complex sentence?",
                a: "Count the number of FINITE VERBS. Every finite verb belongs to exactly one clause. Therefore, Number of Clauses = Number of Finite Verbs."
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
