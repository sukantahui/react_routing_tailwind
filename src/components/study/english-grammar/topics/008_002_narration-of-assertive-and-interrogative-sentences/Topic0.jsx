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
  HelpCircle as QuestionIcon,
  MessageSquare,
  Sliders,
  ShieldAlert,
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
  const [activeQuestionTab, setActiveQuestionTab] = useState("wh");
  const [selectedWhWord, setSelectedWhWord] = useState("where");
  const [selectedWhetherCase, setSelectedWhetherCase] = useState("or_not");
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

  const whData = {
    where: {
      word: "WHERE",
      direct: "The officer said to him, 'Where are you going?'",
      indirect: "The officer asked him where he was going.",
      analysis: "'Where' acts as the connective; inversion 'are you' flips to declarative 'he was'.",
      bnNote: "'Where' নিজে সংযোজক; 'are you' পরিবর্তিত হয়ে 'he was' (Subject + Verb) হয়।"
    },
    why: {
      word: "WHY",
      direct: "The teacher said to Rohan, 'Why did you miss the lecture?'",
      indirect: "The teacher asked Rohan why he had missed the lecture.",
      analysis: "'Why' connects; 'did you miss' (Simple Past) backshifts to past perfect 'he had missed'.",
      bnNote: "'Why' Connector; 'did you miss' পরিবর্তিত হয়ে 'he had missed' হয়।"
    },
    what: {
      word: "WHAT",
      direct: "She said to me, 'What is your research proposal?'",
      indirect: "She asked me what my research proposal was.",
      analysis: "'What' connects; copular verb 'was' shifts to the end after subject 'my research proposal'.",
      bnNote: "'What' Connector; 'was' ভার্বটি Subject-এর পরে বসে ('what my research proposal was')।"
    },
    how: {
      word: "HOW",
      direct: "He said to the mechanic, 'How can this engine be repaired?'",
      indirect: "He asked the mechanic how that engine could be repaired.",
      analysis: "'How' connects; modal 'can' backshifts to 'could' in declarative order.",
      bnNote: "'How' Connector; 'can this engine' পরিবর্তিত হয়ে 'that engine could' হয়।"
    }
  };

  const whetherCases = {
    or_not: {
      title: "1. Followed by 'Or Not'",
      example: "He asked whether she was joining the team or not.",
      rule: "'Whether' is strongly preferred over 'if' when the alternative 'or not' is present.",
      bnNote: "'Or not' থাকলে 'if'-এর চেয়ে 'whether' ব্যবহার করা বাধ্যতামূলক।"
    },
    two_options: {
      title: "2. Choice Between Two Distinct Options",
      example: "The host asked whether I preferred Darjeeling tea or filter coffee.",
      rule: "When offering distinct coordinate alternatives (A or B), use 'whether'.",
      bnNote: "চা নাকি কফি—এমন দুটি স্পষ্ট পছন্দের ক্ষেত্রে 'whether' বসে।"
    },
    infinitive: {
      title: "3. Preceding a To-Infinitive",
      example: "She wondered whether to accept the lucrative scholarship.",
      rule: "Only 'whether' can directly precede a to-infinitive (never 'if to accept').",
      bnNote: "'To + V1'-এর আগে শুধুমাত্র 'whether' বসতে পারে ('if to' ভুল)।"
    },
    preposition: {
      title: "4. Following a Preposition",
      example: "They discussed the dilemma of whether they should expand abroad.",
      rule: "Prepositions govern 'whether', never 'if' (e.g., 'of whether', NOT 'of if').",
      bnNote: "Preposition-এর পরে সর্বদা 'whether' বসে ('of whether')।"
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* ========================================================================= */}
        {/* 1. HERO HEADER WITH BILINGUAL SWITCHER                                   */}
        {/* ========================================================================= */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-sky-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-sky-500/10 text-sky-300 border border-sky-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Module 008.002 • Interrogative Narration
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Narration of Assertive & Interrogative Sentences
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the transformation of statements and questions: the <span className="text-sky-400 font-semibold">Cardinal Declarative Word-Order Law</span>, Wh- questions versus Yes/No questions, and the precise <span className="text-amber-400 font-semibold">If vs Whether Decision Engine</span>.
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
        {/* 2. INTERACTIVE WORKBENCH: THE QUESTION NARRATION LAB                      */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <QuestionIcon className="w-6 h-6 text-sky-400" />
              <div>
                <h2 className="text-xl font-bold text-white">Interrogative Narration Studio</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Switch between Wh- Questions and the "If vs Whether" Decision Engine.
                </p>
              </div>
            </div>

            <div className="flex gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveQuestionTab("wh")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeQuestionTab === "wh"
                    ? "bg-sky-600 text-white shadow-md shadow-sky-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Wh- Questions (No 'That')
              </button>
              <button
                onClick={() => setActiveQuestionTab("whether")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeQuestionTab === "whether"
                    ? "bg-sky-600 text-white shadow-md shadow-sky-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                If vs Whether Engine
              </button>
            </div>
          </div>

          {activeQuestionTab === "wh" ? (
            <div className="space-y-6">
              {/* Wh- Word Selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {Object.keys(whData).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedWhWord(key)}
                    className={`p-3 rounded-xl text-center border font-bold uppercase transition-all ${
                      selectedWhWord === key
                        ? "bg-sky-500/20 border-sky-500 text-sky-300 shadow-md ring-1 ring-sky-500/30"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-base tracking-wider">{whData[key].word}</div>
                  </button>
                ))}
              </div>

              {/* Active Wh- Card */}
              <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="font-bold text-white text-base">
                    Connector: <span className="text-sky-400 font-mono">{whData[selectedWhWord].word}</span>
                  </span>
                  <span className="text-xs font-mono text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded border border-rose-500/20">
                    Never Add 'That'
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                      Direct Question (Inverted Order)
                    </div>
                    <div className="text-xs sm:text-sm font-mono text-amber-200 bg-slate-950 p-2.5 rounded border border-slate-800">
                      {whData[selectedWhWord].direct}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
                      Reported Indirect (Declarative Order)
                    </div>
                    <div className="text-xs sm:text-sm font-mono text-emerald-200 bg-slate-950 p-2.5 rounded border border-slate-800">
                      "{whData[selectedWhWord].indirect}"
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-300">
                  <strong>Syntactic Diagnostic:</strong> {whData[selectedWhWord].analysis}
                </div>

                {showBengali && (
                  <div className="p-3 bg-emerald-950/30 rounded-lg text-xs text-emerald-200 border border-emerald-800/40">
                    <strong>বাংলা ব্যাখ্যা:</strong> {whData[selectedWhWord].bnNote}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Whether Case Selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {Object.keys(whetherCases).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedWhetherCase(key)}
                    className={`p-3 rounded-xl text-left border text-xs font-bold transition-all ${
                      selectedWhetherCase === key
                        ? "bg-sky-500/20 border-sky-500 text-sky-300 shadow-md ring-1 ring-sky-500/30"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div>{whetherCases[key].title.split(". ")[1]}</div>
                  </button>
                ))}
              </div>

              <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-base">
                    {whetherCases[selectedWhetherCase].title}
                  </h3>
                  <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                    Mandatory 'Whether'
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm font-mono text-emerald-300">
                  "{whetherCases[selectedWhetherCase].example}"
                </div>

                <div className="text-xs text-slate-300">
                  <strong>Grammar Rule:</strong> {whetherCases[selectedWhetherCase].rule}
                </div>

                {showBengali && (
                  <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800">
                    <strong className="text-amber-400">বাংলা নোট:</strong> {whetherCases[selectedWhetherCase].bnNote}
                  </div>
                )}
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
              <span className="font-bold text-sky-400">Student (Barrackpore): </span>
              "Sir, why is it wrong to say 'He asked me that why I was crying' or 'He asked where was I going'?"
            </div>

            <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/40">
              <span className="font-bold text-indigo-300">Sukanta Sir: </span>
              "These are the two cardinal sins of reported speech:
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
                <li><strong>The Double Connective Sin:</strong> In Wh- questions, the interrogative word ('Why', 'Where', 'What') is ALREADY a subordinating connective! Adding <span className="text-rose-400 font-semibold">'that'</span> creates two conjunctions side by side ('that why'), which violates English syntactic grammar.</li>
                <li><strong>The Word-Order Inversion Sin:</strong> In direct speech, questions invert the auxiliary ('Where <strong className="text-amber-400">are you</strong> going?'). But in indirect speech, it is no longer an active question—it is a statement about a question. Therefore, you MUST restore <span className="text-emerald-400 font-semibold">Declarative Word Order (Subject + Verb)</span>: 'He asked where <strong className="text-emerald-400">I was</strong> going' with a Full Stop (.)!"</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SELF-ASSESSMENT MCQ DIAGNOSTIC LAB                                     */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-sky-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Module Mastery Diagnostics</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Solve 25 diagnostic assertive and interrogative narration problems.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono bg-sky-500/10 text-sky-300 px-3 py-1.5 rounded-full border border-sky-500/20">
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
                      <span className="text-sky-400 mr-2">Q{q.id}.</span>
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
                q: "What happens to auxiliary verbs 'do / does / did' in reported questions?",
                a: "In affirmative indirect questions, 'do / does' are omitted and the verb takes the simple past tense (e.g. 'Where do you live?' -> 'He asked where I lived'). 'Did' is omitted and the verb shifts to the past perfect ('Where did you go?' → 'He asked where I had gone')."
              },
              {
                q: "Can 'whether' be used in simple Yes/No questions?",
                a: "Yes! 'If' and 'whether' are both acceptable for simple Yes/No questions ('He asked if/whether I was ready'). However, 'whether' is strictly mandatory when followed by 'or not' or before infinitives."
              },
              {
                q: "Why is 'said to' changed to 'told' in assertive sentences?",
                a: "'Tell' is a transitive verb that requires a personal listener/object ('told me'). In assertive indirect speech, 'said to me' is converted into 'told me' for natural idiomatic flow."
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
