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
  Heart,
  Smile,
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
  const [activeMoodTab, setActiveMoodTab] = useState("imperative");
  const [selectedLetBranch, setSelectedLetBranch] = useState("proposal");
  const [selectedExclamation, setSelectedExclamation] = useState("joy");
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

  const letData = {
    proposal: {
      title: "'Let us...' (Mutual Proposal / Suggestion)",
      formula: "Subject + PROPOSED / SUGGESTED THAT they/we + SHOULD + V1",
      direct: "Rohan said, 'Let us organize a tree plantation campaign.'",
      indirect: "Rohan proposed that they should organize a tree plantation campaign.",
      analysis: "'Let us' signifies collaborative action and mandatorily introduces 'should'.",
      bnNote: "'Let us' যৌথ প্রস্তাব প্রকাশ করে এবং 'proposed that they should...' গঠনে রূপান্তরিত হয়।"
    },
    permission: {
      title: "'Let me / Let him...' (Seeking Permission)",
      formula: "Subject + REQUESTED / BEGGED THAT he/she + MIGHT BE ALLOWED TO + V1",
      direct: "The student said, 'Let me consult my notes.'",
      indirect: "The student requested that he might be allowed to consult his notes.",
      analysis: "'Let me' seeks authorization and transforms using 'might be allowed to'.",
      bnNote: "'Let me' অনুমতি প্রার্থনা বোঝায় এবং 'requested that he might be allowed to...'-এ রূপান্তর হয়।"
    }
  };

  const exclamationData = {
    joy: {
      emotion: "Joy / Celebration",
      interjection: "Hurrah! / Ha!",
      direct: "The team said, 'Hurrah! We have won the championship!'",
      indirect: "The team exclaimed with joy that they had won the championship.",
      bnNote: "আনন্দ বা জয়োল্লাস প্রকাশে 'exclaimed with joy that...' বসে।"
    },
    sorrow: {
      emotion: "Sorrow / Grief",
      interjection: "Alas! / Oh no!",
      direct: "The villager said, 'Alas! My crops are destroyed by the flood!'",
      indirect: "The villager exclaimed with sorrow that his crops were destroyed by the flood.",
      bnNote: "দুঃখ বা শোক প্রকাশে 'exclaimed with sorrow that...' বসে।"
    },
    wonder: {
      emotion: "Wonder / Astonishment",
      interjection: "What a...! / How...!",
      direct: "The traveler said, 'What a magnificent Himalayan peak!'",
      indirect: "The traveler exclaimed with wonder that it was a very magnificent Himalayan peak.",
      bnNote: "বিস্ময় প্রকাশে 'exclaimed with wonder that it was a very...' বসে।"
    },
    applause: {
      emotion: "Praise / Applause",
      interjection: "Bravo! / Well done!",
      direct: "The coach said, 'Bravo! You performed exceptionally!'",
      indirect: "The coach applauded him saying that he had performed exceptionally.",
      bnNote: "প্রশংসা বা বাহবা দিতে 'applauded him saying that...' বসে।"
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
                Module 008.003 • Multi-Mood Narration
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Imperative, Exclamatory & Optative Narration
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the advanced reported discourse of <span className="text-amber-400 font-semibold">Imperatives (To-Infinitive & Forbade)</span>, the dual branches of <span className="text-sky-400 font-semibold">'Let' proposals</span>, <span className="text-rose-400 font-semibold">Exclamatory emotion palettes</span>, and <span className="text-emerald-400 font-semibold">Optative prayers</span>.
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
        {/* 2. INTERACTIVE WORKBENCH: MULTI-MOOD NARRATION STUDIO                     */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Boxes className="w-6 h-6 text-amber-400" />
              <div>
                <h2 className="text-xl font-bold text-white">Multi-Mood Narration Studio</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Switch between Imperatives, 'Let' branches, Exclamations, and Optatives.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveMoodTab("imperative")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeMoodTab === "imperative"
                    ? "bg-amber-600 text-white shadow-md shadow-amber-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Imperatives
              </button>
              <button
                onClick={() => setActiveMoodTab("let")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeMoodTab === "let"
                    ? "bg-amber-600 text-white shadow-md shadow-amber-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                'Let' Dual Branches
              </button>
              <button
                onClick={() => setActiveMoodTab("exclamatory")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeMoodTab === "exclamatory"
                    ? "bg-amber-600 text-white shadow-md shadow-amber-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Exclamations
              </button>
              <button
                onClick={() => setActiveMoodTab("optative")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeMoodTab === "optative"
                    ? "bg-amber-600 text-white shadow-md shadow-amber-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Optatives (Prayers)
              </button>
            </div>
          </div>

          {activeMoodTab === "imperative" && (
            <div className="space-y-4 bg-slate-950/80 p-6 rounded-xl border border-slate-800">
              <div className="text-sm font-bold text-amber-400 border-b border-slate-800 pb-3">
                Imperative Mechanics: To-Infinitive & Forbade Laws
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-sky-400 uppercase">1. Command / Advice</span>
                  <div className="text-xs font-mono text-slate-300">
                    Direct: "Study diligently for finals."
                  </div>
                  <div className="text-xs font-mono text-emerald-300">
                    Indirect: "The teacher advised us <strong className="underline">to study</strong> diligently."
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-rose-400 uppercase">2. Prohibition (Forbade Rule)</span>
                  <div className="text-xs font-mono text-slate-300">
                    Direct: "Do not touch the switch."
                  </div>
                  <div className="text-xs font-mono text-emerald-300">
                    Indirect: "He <strong className="text-rose-400">forbade</strong> me <strong className="underline">to touch</strong> the switch." (No 'not'!)
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMoodTab === "let" && (
            <div className="space-y-6">
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedLetBranch("proposal")}
                  className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                    selectedLetBranch === "proposal"
                      ? "bg-sky-600 text-white border-sky-500 shadow-md"
                      : "bg-slate-950/60 text-slate-400 border-slate-800"
                  }`}
                >
                  'Let us...' (Proposal / Suggestion)
                </button>
                <button
                  onClick={() => setSelectedLetBranch("permission")}
                  className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                    selectedLetBranch === "permission"
                      ? "bg-amber-600 text-white border-amber-500 shadow-md"
                      : "bg-slate-950/60 text-slate-400 border-slate-800"
                  }`}
                >
                  'Let me / Let him...' (Permission Request)
                </button>
              </div>

              <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-4">
                <div className="text-sm font-bold text-white border-b border-slate-800 pb-3">
                  {letData[selectedLetBranch].title}
                </div>
                <div className="text-xs text-amber-400 font-mono">
                  Formula: {letData[selectedLetBranch].formula}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">
                    <span className="text-slate-500 block mb-1">Direct:</span>
                    {letData[selectedLetBranch].direct}
                  </div>
                  <div className="p-3 bg-emerald-950/30 rounded-lg border border-emerald-500/30 text-emerald-200">
                    <span className="text-emerald-400 block mb-1">Indirect:</span>
                    "{letData[selectedLetBranch].indirect}"
                  </div>
                </div>
                {showBengali && (
                  <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800">
                    <strong className="text-sky-400">বাংলা নোট:</strong> {letData[selectedLetBranch].bnNote}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeMoodTab === "exclamatory" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {Object.keys(exclamationData).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedExclamation(key)}
                    className={`p-3 rounded-xl text-left border text-xs font-bold transition-all ${
                      selectedExclamation === key
                        ? "bg-rose-500/20 border-rose-500 text-rose-300 shadow-md ring-1 ring-rose-500/30"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div>{exclamationData[key].emotion}</div>
                    <div className="text-[10px] font-normal text-slate-500 truncate mt-0.5">
                      {exclamationData[key].interjection}
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-4">
                <div className="text-sm font-bold text-white border-b border-slate-800 pb-3">
                  Emotion: <span className="text-rose-400">{exclamationData[selectedExclamation].emotion}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">
                    <span className="text-amber-400 block mb-1">Direct Exclamation:</span>
                    {exclamationData[selectedExclamation].direct}
                  </div>
                  <div className="p-3 bg-emerald-950/30 rounded-lg border border-emerald-500/30 text-emerald-200">
                    <span className="text-emerald-400 block mb-1">Reported Indirect:</span>
                    "{exclamationData[selectedExclamation].indirect}"
                  </div>
                </div>
                {showBengali && (
                  <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800">
                    <strong>বাংলা ব্যাখ্যা:</strong> {exclamationData[selectedExclamation].bnNote}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeMoodTab === "optative" && (
            <div className="space-y-4 bg-slate-950/80 p-6 rounded-xl border border-slate-800">
              <div className="text-sm font-bold text-emerald-400 border-b border-slate-800 pb-3">
                Optative Mechanics: Wishes, Prayers & Blessings
              </div>
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300">
                Formula: Subject + PRAYED / WISHED / BLESSED + THAT + Subject + MIGHT + V1
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">
                  <span className="text-amber-400 block mb-1">Direct Prayer:</span>
                  The hermit said, "May God forgive your mistakes!"
                </div>
                <div className="p-3 bg-emerald-950/30 rounded-lg border border-emerald-500/30 text-emerald-200">
                  <span className="text-emerald-400 block mb-1">Indirect Prayer:</span>
                  "The hermit prayed that God might forgive his mistakes."
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
              <span className="font-bold text-amber-400">Student (Barrackpore): </span>
              "Sir, how do we choose between 'proposed that they should' and 'requested that he might be allowed to' when dealing with 'Let' sentences?"
            </div>

            <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/40">
              <span className="font-bold text-indigo-300">Sukanta Sir: </span>
              "Always check the pronoun following 'Let':
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
                <li>If it is <span className="text-sky-400 font-semibold">'Let us' (or 'Let's')</span>, it expresses a shared invitation or collective proposal. The reporting verb MUST be <strong className="text-white">'proposed / suggested'</strong> and the connective clause uses <strong className="text-white">'that we/they should...'</strong> ('Let us play' &rarr; 'Proposed that they should play').</li>
                <li>If it is <span className="text-amber-400 font-semibold">'Let me / Let him / Let her'</span>, it expresses an individual seeking permission or freedom. The reporting verb is <strong className="text-white">'requested / begged'</strong> and the clause uses <strong className="text-white">'that he might be allowed to...'</strong> ('Let me speak' &rarr; 'Requested that he might be allowed to speak').</li>
              </ul>
              Never confuse these two distinct functional channels!"
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SELF-ASSESSMENT MCQ DIAGNOSTIC LAB                                     */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-amber-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Module Mastery Diagnostics</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Solve 25 diagnostic imperative, exclamatory, and optative narration problems.
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
        {/* 5. AUXILIARY TOOLS: WORD DICTIONARY, PRINTABLE NOTE & FAQS               */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <WordDictionary />
          <PlainTextPrint noteText={noteText} />
          <FAQTemplate
            faqList={[
              {
                q: "Why is 'forbade me not to go' considered a serious error?",
                a: "'Forbade' already contains negative semantic meaning ('ordered NOT to go'). Adding 'not' creates a double negative, which logically reverses the intended prohibition."
              },
              {
                q: "What happens to the exclamation mark (!) in indirect speech?",
                a: "The exclamation mark is always completely eliminated in indirect speech, and the sentence terminates with a standard full stop (period)."
              },
              {
                q: "How are greetings like 'Good morning' or 'Good bye' reported?",
                a: "'Good morning' / 'Good evening' are reported with 'wished' ('wished him a good morning'). 'Good bye' / 'Farewell' are reported with 'bade' ('bade him goodbye')."
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
