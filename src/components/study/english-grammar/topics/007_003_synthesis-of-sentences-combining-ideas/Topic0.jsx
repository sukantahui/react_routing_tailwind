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
  Workflow,
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
  const [activeMethod, setActiveMethod] = useState("participle");
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

  const simpleMethods = {
    participle: {
      name: "1. Participles",
      tag: "Same Subject / Sequential Action",
      input: ["He heard a loud explosion.", "He rushed outside immediately."],
      output: "Hearing a loud explosion, he rushed outside immediately.",
      mechanism: "Converts finite verb 1 into present participle phrase 'Hearing...', leaving exactly 1 finite verb ('rushed').",
      bnNote: "একই Subject দুটি কাজ পর পর করলে ১ম Verb-টিকে Participle (V-ing)-এ রূপান্তর করা হয়।"
    },
    apposition: {
      name: "2. Noun in Apposition",
      tag: "Renaming or Describing Subject",
      input: ["Rabindranath Tagore was a Nobel laureate.", "He founded Visva-Bharati."],
      output: "Rabindranath Tagore, a Nobel laureate, founded Visva-Bharati.",
      mechanism: "Replaces the copular verb clause with an appositive noun phrase modifying Tagore.",
      bnNote: "Noun-এর পাশে পরিচয়জ্ঞাপক Phrase কমার মধ্যে বসিয়ে 'was' ভার্বটিকে বর্জন করা হয়।"
    },
    prep_gerund: {
      name: "3. Preposition + Gerund",
      tag: "Immediate Sequence / Concession",
      input: ["He received the appointment letter.", "He celebrated with his family."],
      output: "On receiving the appointment letter, he celebrated with his family.",
      mechanism: "Uses preposition 'On' + gerund 'receiving' to establish temporal sequence without a second finite verb.",
      bnNote: "'On / After / In spite of' + Gerund (V-ing) ব্যবহার করে Simple Sentence গঠন।"
    },
    nominative_absolute: {
      name: "4. Nominative Absolute",
      tag: "Different Subjects + Cause-Effect",
      input: ["The sun set.", "The farmers returned to their village."],
      output: "The sun having set, the farmers returned to their village.",
      mechanism: "Because subjects are different ('The sun' vs 'The farmers'), 'The sun having set' stands as an absolute participle phrase.",
      bnNote: "উভয় বাক্যের Subject আলাদা হলে ১ম Subject + having + V3 (Nominative Absolute) বসে।"
    },
    infinitive: {
      name: "5. Infinitives (to + V1)",
      tag: "Expressing Purpose or Outcome",
      input: ["He went to Oxford University.", "He wanted to study astrophysics."],
      output: "He went to Oxford University to study astrophysics.",
      mechanism: "Compresses the secondary clause into a purposeful infinitive phrase ('to study').",
      bnNote: "উদ্দেশ্য প্রকাশ করতে Infinitive ('to + V1') ব্যবহার করা হয়।"
    },
    adverb: {
      name: "6. Adverb / Adverbial Phrase",
      tag: "Modifying Action Concisely",
      input: ["The gladiator died in the arena.", "His death was heroic."],
      output: "The gladiator died heroically in the arena.",
      mechanism: "Converts the predicate adjective 'heroic' into the single manner adverb 'heroically'.",
      bnNote: "একটি পূর্ণাঙ্গ বাক্যকে একটিমাত্র Adverb (যেমন: heroically, undoubtedly)-এ রূপান্তর।"
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
                Module 007.003 • Sentence Architecture Studio
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Synthesis of Sentences
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master combining multiple simple sentences into <span className="text-amber-400 font-semibold">One Simple Sentence</span> (using the 6 classic non-finite methods), <span className="text-sky-400 font-semibold">One Compound Sentence</span>, and <span className="text-emerald-400 font-semibold">One Complex Sentence</span>.
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
        {/* 2. INTERACTIVE WORKBENCH: THE 6-METHOD SIMPLE SENTENCE SYNTHESIZER        */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Workflow className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">The 6-Method Simple Sentence Synthesis Engine</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Cardinal Rule: The synthesized simple sentence must possess EXACTLY ONE finite verb.
              </p>
            </div>
          </div>

          {/* Method Selectors */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {Object.keys(simpleMethods).map((key) => (
              <button
                key={key}
                onClick={() => setActiveMethod(key)}
                className={`p-3 rounded-xl text-left border text-xs font-bold transition-all ${
                  activeMethod === key
                    ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-md ring-1 ring-amber-500/30"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div>{simpleMethods[key].name}</div>
                <div className="text-[10px] font-normal text-slate-500 truncate mt-0.5">
                  {simpleMethods[key].tag}
                </div>
              </button>
            ))}
          </div>

          {/* Active Synthesis Card */}
          <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-base">
                {simpleMethods[activeMethod].name}
              </span>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                {simpleMethods[activeMethod].tag}
              </span>
            </div>

            {/* Input Sentences */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Input Sentences:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {simpleMethods[activeMethod].input.map((sent, idx) => (
                  <div key={idx} className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                    <span className="text-amber-400 mr-2">[{idx + 1}]</span> "{sent}"
                  </div>
                ))}
              </div>
            </div>

            {/* Synthesized Output */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Synthesized Simple Sentence:</span>
              <div className="p-4 bg-emerald-950/30 rounded-xl border border-emerald-500/40 text-sm font-mono text-emerald-200">
                "{simpleMethods[activeMethod].output}"
              </div>
            </div>

            <div className="text-xs text-slate-300">
              <strong>Grammatical Mechanism:</strong> {simpleMethods[activeMethod].mechanism}
            </div>

            {showBengali && (
              <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800">
                <strong className="text-emerald-400">বাংলা নোট:</strong> {simpleMethods[activeMethod].bnNote}
              </div>
            )}
          </div>
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
              "Sir, in board exams like ICSE/ISC, they frequently give questions like 'Join into a simple sentence without using and, but, or so'. What is the secret trick?"
            </div>

            <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/40">
              <span className="font-bold text-indigo-300">Sukanta Sir: </span>
              "The golden rule is <span className="text-amber-400 font-semibold">The Finite Verb Budget Law</span>:
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
                <li>You are allocated a budget of <strong className="text-white">EXACTLY ONE Finite Verb</strong> for the entire synthesized sentence.</li>
                <li>Every other verb in the input sentences must be disarmed and converted into a non-finite weapon:
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-300">
                    <li>Convert to a <span className="text-sky-400 font-semibold">Participle</span> (Hearing the alarm...)</li>
                    <li>Convert to an <span className="text-emerald-400 font-semibold">Infinitive</span> (...to study astrophysics)</li>
                    <li>Convert to a <span className="text-purple-400 font-semibold">Prepositional Gerund</span> (On hearing the news...)</li>
                    <li>Convert to an <span className="text-amber-400 font-semibold">Appositive Noun Phrase</span> (Tagore, a great poet, ...)</li>
                  </ul>
                </li>
                <li>Watch out for <strong className="text-rose-400">Dangling Participles</strong>: If the subjects of both sentences are different, you cannot use a simple participle; you must use the <span className="text-emerald-400 font-semibold">Nominative Absolute</span> ('The sun having set, we returned')."</li>
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
              <HelpCircle className="w-6 h-6 text-amber-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Module Mastery Diagnostics</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Solve 25 synthesis problems covering simple, compound, and complex sentence transformations.
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
                q: "What is a Nominative Absolute and when is it required?",
                a: "A Nominative Absolute consists of a noun or pronoun followed by a participle, grammatically independent from the main sentence predicate. It is required during simple sentence synthesis when the two original sentences have DIFFERENT subjects ('The sun having set, the birds returned')."
              },
              {
                q: "Can a simple sentence contain multiple clauses?",
                a: "No. By definition, a clause requires a finite verb. Since a simple sentence can have only one finite verb, it can contain only one independent clause and zero subordinate clauses."
              },
              {
                q: "What is the difference between cumulative, adversative, disjunctive, and illative conjunctions?",
                a: "Cumulative adds thoughts together (and, both...and); Adversative expresses contrast (but, yet); Disjunctive offers alternative choices (or, either...or); Illative draws logical conclusions or causes (therefore, so)."
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
