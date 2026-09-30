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
  History,
  Clock,
  MapPin,
  Calendar,
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
  const [selectedTenseDirect, setSelectedTenseDirect] = useState("simple_present");
  const [activeException, setActiveException] = useState("universal");
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

  const backshiftData = {
    simple_present: {
      directTense: "Simple Present (V1)",
      indirectTense: "Simple Past (V2)",
      directEg: "He said, 'I live in Barrackpore.'",
      indirectEg: "He said that he lived in Barrackpore.",
      bnNote: "Present Indefinite পরিবর্তিত হয়ে Past Indefinite হয়।"
    },
    present_continuous: {
      directTense: "Present Continuous (is/am/are V-ing)",
      indirectTense: "Past Continuous (was/were V-ing)",
      directEg: "She said, 'I am preparing my research paper.'",
      indirectEg: "She said that she was preparing her research paper.",
      bnNote: "Present Continuous পরিবর্তিত হয়ে Past Continuous হয়।"
    },
    present_perfect: {
      directTense: "Present Perfect (have/has + V3)",
      indirectTense: "Past Perfect (had + V3)",
      directEg: "Rohan said, 'I have solved the mathematical puzzle.'",
      indirectEg: "Rohan said that he had solved the mathematical puzzle.",
      bnNote: "Present Perfect পরিবর্তিত হয়ে Past Perfect হয়।"
    },
    simple_past: {
      directTense: "Simple Past (V2)",
      indirectTense: "Past Perfect (had + V3)",
      directEg: "The tourist said, 'I visited the Victoria Memorial yesterday.'",
      indirectEg: "The tourist said that he had visited the Victoria Memorial the previous day.",
      bnNote: "Past Indefinite পরিবর্তিত হয়ে Past Perfect হয়।"
    },
    past_continuous: {
      directTense: "Past Continuous (was/were V-ing)",
      indirectTense: "Past Perfect Continuous (had been V-ing)",
      directEg: "They said, 'We were playing football.'",
      indirectEg: "They said that they had been playing football.",
      bnNote: "Past Continuous পরিবর্তিত হয়ে Past Perfect Continuous হয়।"
    },
    modals: {
      directTense: "Modals (Will / Can / May)",
      indirectTense: "Modals (Would / Could / Might)",
      directEg: "He said, 'I will / can / may assist you tomorrow.'",
      indirectEg: "He said that he would / could / might assist me the following day.",
      bnNote: "Will -> Would, Can -> Could, May -> Might হয়।"
    }
  };

  const exceptionsData = {
    universal: {
      title: "1. Universal Scientific Truths & Laws",
      direct: "The teacher said, 'The earth revolves round the sun.'",
      indirect: "The teacher said that the earth revolves round the sun.",
      rule: "Geographical, physical, and scientific eternal truths NEVER backshift.",
      bnNote: "চিরন্তন বৈজ্ঞানিক বা ভৌগোলিক সত্যের ক্ষেত্রে কোনো Tense পরিবর্তন হয় না।"
    },
    habitual: {
      title: "2. Habitual Facts & Daily Routines",
      direct: "He said, 'I wake up at 5:00 AM every morning.'",
      indirect: "He said that he wakes up at 5:00 AM every morning.",
      rule: "Repeated, routine daily actions maintain simple present tense.",
      bnNote: "দৈনন্দিন অভ্যাসগত কাজের ক্ষেত্রে Tense অপরিবর্তিত থাকে।"
    },
    historical: {
      title: "3. Historical Facts with Dates",
      direct: "The professor said, 'India became independent in 1947.'",
      indirect: "The professor said that India became independent in 1947.",
      rule: "Established historical events with specific years retain simple past.",
      bnNote: "নির্দিষ্ট সনযুক্ত ঐতিহাসিক ঘটনার ক্ষেত্রে Past Indefinite বজায় থাকে।"
    },
    present_verb: {
      title: "4. Present or Future Reporting Verb",
      direct: "The doctor says, 'The patient is recovering rapidly.'",
      indirect: "The doctor says that the patient is recovering rapidly.",
      rule: "If the reporting verb is 'says / will say', NO tense change occurs in reported clause.",
      bnNote: "Reporting Verb যদি 'says' বা 'will say' হয়, তবে Tense অপরিবর্তিত থাকে।"
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* ========================================================================= */}
        {/* 1. HERO HEADER WITH BILINGUAL SWITCHER                                   */}
        {/* ========================================================================= */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-cyan-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Module 008.001 • Reported Discourse
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Reported Speech & Tense Backshift
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the architectural rules of <span className="text-cyan-400 font-semibold">Tense Backshift</span>, the <span className="text-amber-400 font-semibold">4 Invariable Universal Exceptions</span>, and time/place adverbial conversions.
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
        {/* 2. INTERACTIVE WORKBENCH: THE TENSE BACKSHIFT STUDIO                      */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <History className="w-6 h-6 text-cyan-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Interactive Tense Backshift Studio</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Observe how direct speech tenses systematically backshift when the reporting verb is in the past tense.
              </p>
            </div>
          </div>

          {/* Tense Selectors */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {Object.keys(backshiftData).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedTenseDirect(key)}
                className={`p-3 rounded-xl text-left border text-xs font-bold transition-all ${
                  selectedTenseDirect === key
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md ring-1 ring-cyan-500/30"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div>{backshiftData[key].directTense.split(" (")[0]}</div>
                <div className="text-[10px] font-normal text-slate-500 truncate mt-0.5">
                  {key.replace("_", " ").toUpperCase()}
                </div>
              </button>
            ))}
          </div>

          {/* Active Backshift Card */}
          <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-base">
                Shift: <span className="text-cyan-400">{backshiftData[selectedTenseDirect].directTense}</span> ➔ <span className="text-emerald-400">{backshiftData[selectedTenseDirect].indirectTense}</span>
              </span>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                1-Step Past Shift
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Direct */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                  Direct Speech (Quote)
                </div>
                <div className="text-xs sm:text-sm font-mono text-amber-200 bg-slate-950 p-2.5 rounded border border-slate-800">
                  {backshiftData[selectedTenseDirect].directEg}
                </div>
              </div>

              {/* Indirect */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
                  Reported Indirect Speech
                </div>
                <div className="text-xs sm:text-sm font-mono text-emerald-200 bg-slate-950 p-2.5 rounded border border-slate-800">
                  "{backshiftData[selectedTenseDirect].indirectEg}"
                </div>
              </div>
            </div>

            {showBengali && (
              <div className="p-3 bg-emerald-950/30 rounded-lg text-xs text-emerald-200 border border-emerald-800/40">
                <strong>বাংলা নিয়ম:</strong> {backshiftData[selectedTenseDirect].bnNote}
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE 4 INVARIABLE EXCEPTIONS STUDIO                             */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">The 4 Invariable Exceptions (Zero Backshift)</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Scenarios where the reported clause retains its original present/past tense without backshift.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.keys(exceptionsData).map((key) => (
              <button
                key={key}
                onClick={() => setActiveException(key)}
                className={`p-3 rounded-xl text-left border text-xs font-bold transition-all ${
                  activeException === key
                    ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-md ring-1 ring-amber-500/30"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div>{exceptionsData[key].title.split(". ")[1]}</div>
              </button>
            ))}
          </div>

          <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-4">
            <div className="text-sm font-bold text-white border-b border-slate-800 pb-3">
              {exceptionsData[activeException].title}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">
                <span className="text-amber-400 font-bold block mb-1">Direct:</span>
                {exceptionsData[activeException].direct}
              </div>
              <div className="p-3 bg-emerald-950/30 rounded-lg border border-emerald-500/30 text-emerald-200">
                <span className="text-emerald-400 font-bold block mb-1">Indirect (No Backshift):</span>
                "{exceptionsData[activeException].indirect}"
              </div>
            </div>

            <div className="text-xs text-slate-300">
              <strong>Grammatical Law:</strong> {exceptionsData[activeException].rule}
            </div>

            {showBengali && (
              <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800">
                <strong className="text-amber-400">বাংলা নোট:</strong> {exceptionsData[activeException].bnNote}
              </div>
            )}
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
              <span className="font-bold text-cyan-400">Student (Barrackpore): </span>
              "Sir, why do students repeatedly lose marks on 'He said to me' vs 'He told me', and what happens to time words like 'today' or 'yesterday'?"
            </div>

            <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/40">
              <span className="font-bold text-indigo-300">Sukanta Sir: </span>
              "Here are two universal laws to etch in your mind:
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
                <li><strong>The Say vs Tell Law:</strong> 'Said' is intransitive; it does not take an object without 'to' ('He said to me'). 'Tell/Told' is strictly transitive; it takes a personal object directly without any preposition ('He told me'). Never write <span className="text-rose-400">'He told to me'</span>!</li>
                <li><strong>Temporal Perspective Shift:</strong> Because indirect speech reports events from a past point of observation, all immediate deictic words shift to distant markers:
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-300">
                    <li><span className="text-amber-400 font-semibold">Today</span> ➔ That day</li>
                    <li><span className="text-amber-400 font-semibold">Tomorrow</span> ➔ The next day / The following day</li>
                    <li><span className="text-amber-400 font-semibold">Yesterday</span> ➔ The previous day / The day before</li>
                    <li><span className="text-amber-400 font-semibold">Here</span> ➔ There</li>
                  </ul>
                </li>
              </ul>
              Remember: Keep universal facts in the present tense!"
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. SELF-ASSESSMENT MCQ DIAGNOSTIC LAB                                     */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-cyan-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Module Mastery Diagnostics</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Solve 25 diagnostic reported speech and tense backshift problems.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono bg-cyan-500/10 text-cyan-300 px-3 py-1.5 rounded-full border border-cyan-500/20">
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
                      <span className="text-cyan-400 mr-2">Q{q.id}.</span>
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
                q: "Why does Past Perfect not change in indirect speech?",
                a: "Past Perfect ('had + V3') represents the past-of-the-past, which is the most remote past tense available in English grammar. Since there is no further past tense, it remains unchanged."
              },
              {
                q: "What happens to 'must' in indirect speech?",
                a: "If 'must' refers to a specific immediate obligation in the past, it changes to 'had to'. If it refers to an eternal moral law or universal principle ('We must obey the laws of physics'), it remains 'must'."
              },
              {
                q: "Do proverbs change their tense in reported speech?",
                a: "No. Proverbs (e.g., 'A stitch in time saves nine') represent universal truths and always stay in the simple present tense."
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
