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
  ArrowLeftRight,
  Repeat,
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
  const [activeTransformationTab, setActiveTransformationTab] = useState("triangle");
  const [selectedTriangleCase, setSelectedTriangleCase] = useState("contrast");
  const [selectedTimeCase, setSelectedTimeCase] = useState("as_soon_as");
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

  const triangleData = {
    contrast: {
      title: "Concession & Contrast (In spite of / But / Although)",
      simple: "In spite of his severe poverty, he is remarkably honest.",
      compound: "He is severely poor, yet he is remarkably honest.",
      complex: "Although he is severely poor, he is remarkably honest.",
      bnNote: "'In spite of' (Simple) -> 'yet / but' (Compound) -> 'Although' (Complex)."
    },
    condition: {
      title: "Condition & Alternative (Without / Or / Unless)",
      simple: "Without thorough preparation, you cannot pass the exam.",
      compound: "Prepare thoroughly, or you will not pass the exam.",
      complex: "Unless you prepare thoroughly, you cannot pass the exam.",
      bnNote: "'Without' (Simple) -> 'or / otherwise' (Compound) -> 'Unless / If not' (Complex)."
    },
    sequence: {
      title: "Time Sequence (On hearing / And / As soon as)",
      simple: "On hearing the tragic announcement, she broke into tears.",
      compound: "She heard the tragic announcement, and she broke into tears.",
      complex: "As soon as she heard the tragic announcement, she broke into tears.",
      bnNote: "'On + Gerund' (Simple) -> 'and' (Compound) -> 'As soon as' (Complex)."
    },
    purpose: {
      title: "Purpose & Aim (To / So / So that)",
      simple: "He practices rigorous meditation to attain inner tranquility.",
      compound: "He wants to attain inner tranquility, so he practices meditation.",
      complex: "He practices meditation so that he can attain inner tranquility.",
      bnNote: "'Infinitive to' (Simple) -> 'so / therefore' (Compound) -> 'so that' (Complex)."
    }
  };

  const timeTriggers = {
    as_soon_as: {
      title: "1. Affirmative Form ('As soon as')",
      sentence: "As soon as the judge entered the courtroom, everyone stood up.",
      analysis: "Subordinate temporal clause introduced by 'As soon as'.",
      bnNote: "'যেইমাত্র... সেইমাত্র' বোঝাতে সাধারণ অ্যাফারমেটিভ রূপ।"
    },
    no_sooner_did: {
      title: "2. Negative Inversion with 'Did' ('No sooner did... than')",
      sentence: "No sooner did the judge enter the courtroom than everyone stood up.",
      analysis: "'No sooner did' triggers bare infinitive V1 ('enter') + correlative 'than'.",
      bnNote: "'No sooner did + Subject + V1... than' (Did থাকলে মূল ভার্বের Base form বসে)।"
    },
    no_sooner_had: {
      title: "3. Negative Inversion with 'Had' ('No sooner had... than')",
      sentence: "No sooner had the judge entered the courtroom than everyone stood up.",
      analysis: "'No sooner had' triggers past participle V3 ('entered') + correlative 'than'.",
      bnNote: "'No sooner had + Subject + V3... than' (Had থাকলে Past Participle বসে)।"
    },
    hardly_when: {
      title: "4. Negative Inversion with 'Hardly / Scarcely... when'",
      sentence: "Hardly had the judge entered the courtroom when everyone stood up.",
      analysis: "'Hardly/Scarcely had' strictly pairs with 'when' (never 'than').",
      bnNote: "'Hardly/Scarcely'-র সাথে সর্বদা 'when' বসে (than নয়)।"
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
                Module 007.004 • Master Transformation Lab
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Advanced Sentence Transformation
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master complete syntactic interchange while preserving 100% semantic fidelity: <span className="text-amber-400 font-semibold">Simple-Compound-Complex Triangle</span>, <span className="text-sky-400 font-semibold">Time Trigger Inversions</span>, and <span className="text-rose-400 font-semibold">Parts of Speech Morphing</span>.
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
        {/* 2. INTERACTIVE WORKBENCH: THE TRANSFORMATION MATRIX STUDIO                 */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Repeat className="w-6 h-6 text-rose-400" />
              <div>
                <h2 className="text-xl font-bold text-white">The Master Transformation Studio</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Switch between the Structural Triangle and Time Trigger Inversion studios.
                </p>
              </div>
            </div>

            <div className="flex gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTransformationTab("triangle")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeTransformationTab === "triangle"
                    ? "bg-rose-600 text-white shadow-md shadow-rose-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Simple / Compound / Complex
              </button>
              <button
                onClick={() => setActiveTransformationTab("time")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeTransformationTab === "time"
                    ? "bg-rose-600 text-white shadow-md shadow-rose-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Time Trigger Inversions
              </button>
            </div>
          </div>

          {activeTransformationTab === "triangle" ? (
            <div className="space-y-6">
              {/* Triangle Case Selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {Object.keys(triangleData).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTriangleCase(key)}
                    className={`p-3 rounded-xl text-left border text-xs font-bold transition-all ${
                      selectedTriangleCase === key
                        ? "bg-rose-500/20 border-rose-500 text-rose-300 shadow-md ring-1 ring-rose-500/30"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div>{triangleData[key].title.split(" (")[0]}</div>
                    <div className="text-[10px] font-normal text-slate-500 truncate mt-0.5">
                      {key.toUpperCase()}
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Triangle Multi-Card Display */}
              <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-4">
                <div className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-3">
                  Pattern: <span className="text-rose-400">{triangleData[selectedTriangleCase].title}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {/* Simple */}
                  <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-amber-400 uppercase">SIMPLE FORM</span>
                      <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-mono">
                        1 Finite Verb
                      </span>
                    </div>
                    <p className="text-xs font-mono text-slate-200 bg-slate-950 p-2.5 rounded border border-slate-800/80">
                      "{triangleData[selectedTriangleCase].simple}"
                    </p>
                  </div>

                  {/* Compound */}
                  <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-sky-400 uppercase">COMPOUND FORM</span>
                      <span className="text-[10px] bg-sky-500/10 text-sky-300 px-2 py-0.5 rounded font-mono">
                        Coordinating Link
                      </span>
                    </div>
                    <p className="text-xs font-mono text-slate-200 bg-slate-950 p-2.5 rounded border border-slate-800/80">
                      "{triangleData[selectedTriangleCase].compound}"
                    </p>
                  </div>

                  {/* Complex */}
                  <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-emerald-400 uppercase">COMPLEX FORM</span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded font-mono">
                        Subordinate Link
                      </span>
                    </div>
                    <p className="text-xs font-mono text-slate-200 bg-slate-950 p-2.5 rounded border border-slate-800/80">
                      "{triangleData[selectedTriangleCase].complex}"
                    </p>
                  </div>
                </div>

                {showBengali && (
                  <div className="p-3 bg-emerald-950/30 rounded-lg text-xs text-emerald-200 border border-emerald-800/40">
                    <strong>বাংলা রূপান্তর সূত্র:</strong> {triangleData[selectedTriangleCase].bnNote}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Time Trigger Selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {Object.keys(timeTriggers).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTimeCase(key)}
                    className={`p-3 rounded-xl text-left border text-xs font-bold transition-all ${
                      selectedTimeCase === key
                        ? "bg-rose-500/20 border-rose-500 text-rose-300 shadow-md ring-1 ring-rose-500/30"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div>{timeTriggers[key].title.split(" (")[0]}</div>
                    <div className="text-[10px] font-normal text-slate-500 truncate mt-0.5">
                      {key.replace(/_/g, " ").toUpperCase()}
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-base">
                    {timeTriggers[selectedTimeCase].title}
                  </h3>
                  <span className="text-xs font-mono text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded border border-rose-500/20">
                    Inversion Mechanics
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm font-mono text-rose-200">
                  "{timeTriggers[selectedTimeCase].sentence}"
                </div>

                <div className="text-xs text-slate-300">
                  <strong>Syntax Analysis:</strong> {timeTriggers[selectedTimeCase].analysis}
                </div>

                {showBengali && (
                  <div className="p-3 bg-emerald-950/30 rounded-lg text-xs text-emerald-200 border border-emerald-800/40">
                    <strong>বাংলা ব্যাখ্যা:</strong> {timeTriggers[selectedTimeCase].bnNote}
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
              <span className="font-bold text-rose-400">Student (Barrackpore): </span>
              "Sir, what is the most dangerous trap in competitive exams when converting 'As soon as' into 'No sooner... than'?"
            </div>

            <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/40">
              <span className="font-bold text-indigo-300">Sukanta Sir: </span>
              "There are two catastrophic traps students fall into:
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
                <li><strong>Trap 1 (The Did vs V1 / Had vs V3 trap):</strong> If you write 'No sooner did...', the following verb MUST be in base form V1 ('No sooner did the train <strong className="text-amber-400">arrive</strong>'). If you write 'No sooner had...', the verb MUST be in V3 ('No sooner had the train <strong className="text-amber-400">arrived</strong>'). Writing 'No sooner did the train arrived' is a zero mark!</li>
                <li><strong>Trap 2 (The Conjunction Correlative trap):</strong> 'No sooner' strictly pairs with <span className="text-emerald-400 font-semibold">'THAN'</span> (never 'then' or 'when'). Meanwhile, 'Hardly' and 'Scarcely' strictly pair with <span className="text-sky-400 font-semibold">'WHEN'</span>.</li>
              </ul>
              Master these mathematical formulas, and sentence transformation becomes child's play!"
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SELF-ASSESSMENT MCQ DIAGNOSTIC LAB                                     */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-rose-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Module Mastery Diagnostics</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Test your transformation agility across 25 high-yield sentence interchange problems.
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
        {/* 5. AUXILIARY TOOLS: WORD DICTIONARY, PRINTABLE NOTE & FAQS               */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <WordDictionary />
          <PlainTextPrint noteText={noteText} />
          <FAQTemplate
            faqList={[
              {
                q: "Can 'too...to' be removed in past tense sentences?",
                a: "Yes. In the past tense ('He was too tired to run'), 'too...to' transforms into 'so... that + Subject + could not' ('He was so tired that he COULD NOT run')."
              },
              {
                q: "What is the difference between 'No sooner did' and 'No sooner had'?",
                a: "'No sooner did' requires the base form of the verb V1 ('No sooner did he see...'). 'No sooner had' requires the past participle V3 ('No sooner had he seen...'). Both pair with 'than'."
              },
              {
                q: "What happens to 'only' when converting affirmative to negative?",
                a: "'Only' referring to a person converts to 'None but' ('Only Ram can do this' -> 'None but Ram can do this'). 'Only' referring to a thing converts to 'Nothing but'."
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
