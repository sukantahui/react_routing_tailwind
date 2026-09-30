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
  MessageSquareQuote,
  Search,
  BookMarked,
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
  const [activeVerbCategory, setActiveVerbCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [reverseStep, setReverseStep] = useState(0);
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

  const reportingVerbs = [
    { verb: "Acknowledged", category: "truth", meaning: "Recognizing a truth or reality", example: "He acknowledged his lack of experience." },
    { verb: "Admitted", category: "truth", meaning: "Conceding an error or mistake", example: "She admitted that she had made a calculation error." },
    { verb: "Apologized", category: "polite", meaning: "Expressing regret or sorrow", example: "He apologized for arriving late." },
    { verb: "Confessed", category: "legal", meaning: "Admitting a crime or wrongful act", example: "The accused confessed that he had stolen the necklace." },
    { verb: "Congratulated", category: "polite", meaning: "Commending someone's achievement", example: "Congratulated her on her stellar rank." },
    { verb: "Denied", category: "legal", meaning: "Repudiating an accusation strongly", example: "He denied having broken into the vault." },
    { verb: "Insisted", category: "demand", meaning: "Demanding firmly with persistence", example: "She insisted on paying the bill." },
    { verb: "Objected", category: "demand", meaning: "Opposing a decision or rule", example: "They objected to the new unfair tax policy." },
    { verb: "Promised", category: "commitment", meaning: "Giving a firm assurance", example: "He promised to return the borrowed sum by Monday." },
    { verb: "Refused", category: "demand", meaning: "Firmly declining a request", example: "The workers refused to accept the terms." },
    { verb: "Reminded", category: "guidance", meaning: "Prompting someone's memory", example: "Father reminded me to lock the main gate." },
    { verb: "Threatened", category: "danger", meaning: "Issuing a menacing ultimatum", example: "Threatened to report the matter to the police." },
    { verb: "Urged", category: "guidance", meaning: "Earnestly advising action", example: "The mentor urged the students to persevere." },
    { verb: "Warned", category: "danger", meaning: "Cautioning against a hazard", example: "The guard warned him not to cross the barrier." },
    { verb: "Welcomed", category: "polite", meaning: "Greeting hospitably", example: "The institution welcomed the international delegates." }
  ];

  const filteredVerbs = reportingVerbs.filter((v) => {
    const matchesCat = activeVerbCategory === "all" || v.category === activeVerbCategory;
    const matchesSearch =
      v.verb.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.meaning.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* ========================================================================= */}
        {/* 1. HERO HEADER WITH BILINGUAL SWITCHER                                   */}
        {/* ========================================================================= */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-emerald-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Module 008.004 • Master Dialogue Narration
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Passage Narration & Nuanced Reporting Verbs
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master continuous multi-speaker <span className="text-emerald-400 font-semibold">Passage Narration</span>, vocatives and conversational responses, the high-tier <span className="text-amber-400 font-semibold">Nuanced Reporting Verbs Arsenal</span>, and <span className="text-sky-400 font-semibold">Reverse Narration</span>.
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
        {/* 2. INTERACTIVE WORKBENCH: CONTINUOUS PASSAGE NARRATION BLUEPRINT          */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <MessageSquareQuote className="w-6 h-6 text-emerald-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Continuous Passage Narration Studio</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Compare multi-speaker dialogue scripts against their polished reported narrative prose.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Direct Dialogue */}
            <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Direct Multi-Speaker Dialogue
                </span>
                <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-mono">
                  Original Script
                </span>
              </div>
              <div className="space-y-2.5 text-xs font-mono text-slate-300">
                <p className="p-2.5 bg-slate-900/80 rounded border border-slate-800">
                  <strong className="text-amber-400">Hermit:</strong> "Where are you going, my young friend?"
                </p>
                <p className="p-2.5 bg-slate-900/80 rounded border border-slate-800">
                  <strong className="text-sky-400">Youth:</strong> "I am going to the capital to seek fortune, Sir."
                </p>
                <p className="p-2.5 bg-slate-900/80 rounded border border-slate-800">
                  <strong className="text-amber-400">Hermit:</strong> "Do not go there. The metropolis is full of peril."
                </p>
                <p className="p-2.5 bg-slate-900/80 rounded border border-slate-800">
                  <strong className="text-sky-400">Youth:</strong> "Thank you for the counsel, but I must take the risk."
                </p>
              </div>
            </div>

            {/* Reported Prose */}
            <div className="p-5 rounded-2xl bg-slate-950/90 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Reported Narrative Paragraph
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                  Synthesized Prose
                </span>
              </div>
              <div className="p-4 bg-emerald-950/20 rounded-xl border border-emerald-900/40 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2">
                <p>
                  The old hermit <strong className="text-amber-300">affectionately asked</strong> the youth where he was going.
                </p>
                <p>
                  The youth <strong className="text-sky-300">respectfully replied</strong> that he was going to the capital to seek fortune.
                </p>
                <p>
                  The hermit then <strong className="text-rose-300">warned him not to go there</strong>, explaining that the metropolis was full of peril.
                </p>
                <p>
                  The youth <strong className="text-emerald-300">thanked him for the counsel</strong>, but politely added that he had to take the risk.
                </p>
              </div>
            </div>
          </div>

          {showBengali && (
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-200 text-xs sm:text-sm space-y-1">
              <strong>প্যাসেজ ন্যারেশনের মূল কৌশল:</strong> 'Sir'-এর জন্য 'respectfully', 'my young friend'-এর জন্য 'affectionately', এবং প্রতি বাক্যে আলাদা Reporting Verb (asked, replied, warned, thanked) ব্যবহার করে অনুচ্ছেদটি একটি মসৃণ গল্পে রূপান্তর করা হয়েছে।
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE NUANCED REPORTING VERBS ARSENAL                            */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <BookMarked className="w-6 h-6 text-indigo-400" />
              <div>
                <h2 className="text-xl font-bold text-white">Nuanced Reporting Verbs Arsenal</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Search through 15+ advanced verbs to eliminate repetitive 'said / told' constructs.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search verb or meaning..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 w-44"
                />
              </div>

              <select
                value={activeVerbCategory}
                onChange={(e) => setActiveVerbCategory(e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Categories</option>
                <option value="truth">Truth / Admission</option>
                <option value="polite">Politeness / Greetings</option>
                <option value="legal">Legal / Accusations</option>
                <option value="demand">Demands / Refusals</option>
                <option value="guidance">Guidance / Advice</option>
                <option value="danger">Warnings / Threats</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-96 overflow-y-auto pr-1">
            {filteredVerbs.map((v, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-emerald-400 font-mono">{v.verb}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {v.category}
                  </span>
                </div>
                <div className="text-xs text-slate-400">{v.meaning}</div>
                <div className="text-xs font-mono text-indigo-300 bg-slate-900/80 p-2 rounded border border-slate-800/60">
                  "{v.example}"
                </div>
              </div>
            ))}
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
              <span className="font-bold text-emerald-400">Student (Barrackpore): </span>
              "Sir, in board exams and competitive passages, how do we handle single-word dialogue answers like 'Yes' or 'No', and how do we do Reverse Narration?"
            </div>

            <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/40">
              <span className="font-bold text-indigo-300">Sukanta Sir: </span>
              "Passage narration transforms conversation into literary journalism:
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
                <li><strong>Handling 'Yes' and 'No':</strong> Transform 'Yes' into <span className="text-emerald-400 font-semibold">'replied in the affirmative'</span> and 'No' into <span className="text-rose-400 font-semibold">'replied in the negative'</span>, followed by the expanded clause ('replied in the affirmative that he was ready').</li>
                <li><strong>Reverse Narration (Indirect to Direct):</strong> Reconstruct the original direct drama by working backwards:
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-300">
                    <li>Re-insert quotation marks (" ").</li>
                    <li>Un-backshift tenses (Past Perfect ➔ Simple Past / Present Perfect).</li>
                    <li>Restore 1st & 2nd person pronouns ('he' ➔ 'I', 'his' ➔ 'my').</li>
                    <li>Restore question inversion with a Question Mark (?).</li>
                  </ul>
                </li>
              </ul>
              Master these techniques, and you will command the English Language paper!"
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. SELF-ASSESSMENT MCQ DIAGNOSTIC LAB                                     */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-emerald-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Module Mastery Diagnostics</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Solve 25 diagnostic passage narration, dialogue conversion, and reverse narration problems.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono bg-emerald-500/10 text-emerald-300 px-3 py-1.5 rounded-full border border-emerald-500/20">
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
                      <span className="text-emerald-400 mr-2">Q{q.id}.</span>
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
                q: "What is the formula for Reverse Narration of questions?",
                a: "Convert the reporting verb back to 'said to', insert quotation marks (\"), restore 1st/2nd person pronouns, un-backshift the tense, restore auxiliary inversion (Aux + Subj), and conclude with a question mark (?)."
              },
              {
                q: "Why are nuanced reporting verbs preferred over 'said'?",
                a: "Verbs like 'confessed', 'warned', 'refused', and 'apologized' convey precise emotional tone and legal/communicative intent, eliminating dull repetition."
              },
              {
                q: "How do you handle 'Thank you' in reported speech?",
                a: "'Thank you' transforms into the active reporting verb 'thanked' (e.g. 'He thanked the teacher for his guidance')."
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
