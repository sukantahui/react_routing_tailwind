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
  Repeat,
  ShieldCheck,
  GitBranch,
  Split,
  Sliders,
  Flame,
  Shuffle
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeCausative, setActiveCausative] = useState("make");
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (questionId, optionIdx) => {
    if (submitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  const causativeTypes = {
    make: {
      verb: "MAKE (Force / Compulsion)",
      activeFormula: "Subject + MAKE + Person + Base Verb (V1 / Bare Infinitive)",
      activeExample: "The mentor made Swadeep write the summary again.",
      passiveFormula: "Subject + BE MADE + TO + Base Verb (V1)",
      passiveExample: "Swadeep was made TO write the summary again by the mentor.",
      bengaliNote: "Active Voice-এ 'make'-এর পর Bare Infinitive ('make him write'); কিন্তু Passive Voice-এ রূপান্তরিত হলে অবশ্যই To-Infinitive ('was made TO write') বসবে।"
    },
    have: {
      verb: "HAVE (Delegation / Service)",
      activeFormula: "Subject + HAVE + Person + Base Verb (V1 / Bare Infinitive)",
      activeExample: "I had the technician inspect the broadband router.",
      passiveFormula: "Subject + HAVE + Object (Thing) + Past Participle (V3)",
      passiveExample: "I had the broadband router inspected by the technician.",
      bengaliNote: "পেশাদার ব্যক্তিকে দিয়ে কোনো কাজ করানো অর্থে Active-এ 'have + ব্যক্তি + V1' এবং Passive Causative-এ 'have + বস্তু + V3' ('had my car repaired')।"
    },
    get: {
      verb: "GET (Persuasion / Convincing)",
      activeFormula: "Subject + GET + Person + TO + Base Verb (V1 / To-Infinitive)",
      activeExample: "She got her brother to clean the study table.",
      passiveFormula: "Subject + GET + Object (Thing) + Past Participle (V3)",
      passiveExample: "She got the study table cleaned by her brother.",
      bengaliNote: "'Get' দিয়ে কোনো ব্যক্তিকে বুঝিয়ে-শুনিয়ে কাজ করানো বোঝালে Active-এ 'get + ব্যক্তি + to + V1' বসে।"
    },
    let: {
      verb: "LET (Permission / Allowance)",
      activeFormula: "Subject + LET + Person + Base Verb (V1 / Bare Infinitive)",
      activeExample: "The librarian let the students borrow three books.",
      passiveFormula: "Subject + BE ALLOWED TO + Base Verb (V1)",
      passiveExample: "The students were allowed to borrow three books.",
      bengaliNote: "'Let' অনুমতি দেওয়া বোঝায় এবং Bare Infinitive নেয়। Passive Voice-এ 'let'-এর স্থানে 'be allowed to' ব্যবহার করা হয়।"
    },
    help: {
      verb: "HELP (Assistance / Aid)",
      activeFormula: "Subject + HELP + Person + (TO) + Base Verb (V1)",
      activeExample: "He helped me solve the complex theorem. / He helped me to solve the complex theorem.",
      passiveFormula: "Subject + BE HELPED + TO + Base Verb (V1)",
      passiveExample: "I was helped to solve the complex theorem.",
      bengaliNote: "'Help'-এর পর আধুনিক ইংরেজিতে Bare Infinitive ও To-Infinitive উভয়ই সমানভাবে ব্যাকরণসিদ্ধ।"
    }
  };

  const ergativePairs = [
    { verb: "Open", trans: "The guard opened the heavy gate.", intra: "The heavy gate opened silently." },
    { verb: "Break", trans: "The storm broke the branches.", intra: "The branches broke in the wind." },
    { verb: "Melt", trans: "The hot tea melted the sugar.", intra: "The sugar melted in the hot tea." },
    { verb: "Boil", trans: "The cook boiled the water.", intra: "The water boiled at 100°C." },
    { verb: "Ring", trans: "The peon rang the brass bell.", intra: "The brass bell rang loudly." },
    { verb: "Start", trans: "The driver started the engine.", intra: "The engine started with a roar." }
  ];

  const inchoativeExamples = [
    { verb: "Turn", example: "The leaves turned red in autumn.", meaning: "রং বা অবস্থার পরিবর্তন" },
    { verb: "Grow", example: "The sky grew dark before the thunderstorm.", meaning: "ধীরে ধীরে পরিবর্তন" },
    { verb: "Become", example: "He became a distinguished scholar.", meaning: "নতুন পরিচয়ে পদার্পণ" },
    { verb: "Fall", example: "The tired child fell asleep instantly.", meaning: "আকস্মিক বা স্বাভাবিক অবস্থালাভ" },
    { verb: "Go", example: "The fresh milk went sour in the heat.", meaning: "নেতিবাচক অবক্ষয়" },
    { verb: "Come", example: "Her childhood dreams came true.", meaning: "বাস্তবায়ন বা সিদ্ধি" }
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
        {/* Header with Bilingual Switcher */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Segment 4 · Dynamic Core
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Module 004_003 · Master Reference
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Causative Verbs, Inchoative Verbs & Ergative (Middle Voice) Mechanics
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Master the syntax of caused actions (Make, Have, Let, Get, Help - প্রযোজক ক্রিয়া), active bare infinitive vs passive to-infinitive rules, passive causatives (have something done), inchoative state transitions, and ergative middle voice verbs.
              </p>
            </div>

            {/* Language Switcher */}
            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-indigo-400" />
                Language Explanation
              </span>
              <button
                type="button"
                onClick={() => setShowBengali(!showBengali)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 border shadow-lg ${
                  showBengali
                    ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-white border-amber-400/50 shadow-amber-950/50 ring-2 ring-amber-500/20"
                    : "bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white"
                }`}
              >
                <Languages className={`w-4 h-4 transition-transform duration-300 ${showBengali ? "rotate-180 text-white" : "text-indigo-400"}`} />
                <span>{showBengali ? "বাংলা ব্যাখ্যা সক্রিয় (Active)" : "বাংলা ব্যাখ্যা দেখুন (Toggle বাংলা)"}</span>
              </button>
            </div>
          </div>

          {showBengali && (
            <div className="mt-6 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-sm flex items-start gap-3 animate-fade-in">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-300">প্রযোজক ক্রিয়া ও উভমুখী ক্রিয়া নির্দেশিকা:</p>
                <p className="text-amber-200/90 text-xs mt-1 leading-relaxed">
                  বাংলা ভাষায় প্রযোজক ক্রিয়া প্রত্যয় দিয়ে গঠিত হয় (যেমন: 'করা' থেকে 'করানো', 'দেখা' থেকে 'দেখানো')। কিন্তু ইংরেজিতে এটি <strong>Make, Have, Let, Get, Help</strong> ইত্যাদি সাহায্যকারী ক্রিয়ার সাহায্যে গঠিত হয়। বিশেষ করে 'Make'-এর ক্ষেত্রে Active-এ Bare Verb কিন্তু Passive-এ বাধ্যতামূলক 'to' বসানোর নিয়মটি প্রতিযোগিতামূলক পরীক্ষায় সবচেয়ে বেশি আসে।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Causative Lab */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Repeat className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white">Interactive Causative Architecture Studio</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">5-Causative Matrix</span>
          </div>

          {/* Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {Object.keys(causativeTypes).map(key => (
              <button
                key={key}
                onClick={() => setActiveCausative(key)}
                className={`p-3.5 rounded-2xl text-left text-xs font-semibold transition border ${
                  activeCausative === key
                    ? "bg-amber-600 text-white border-amber-400 shadow-lg shadow-amber-950"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="font-mono text-[10px] uppercase opacity-75">Causative</div>
                <div className="mt-0.5 font-bold uppercase">{key}</div>
              </button>
            ))}
          </div>

          {/* Active Causative Breakdown */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-amber-300">
                {causativeTypes[activeCausative].verb}
              </h3>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800 font-mono">
                Syntax Breakdown
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Active Voice Box */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Active Voice Formula</span>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300">
                  {causativeTypes[activeCausative].activeFormula}
                </div>
                <div className="text-xs text-slate-300 pt-1">
                  <strong>Example:</strong> "{causativeTypes[activeCausative].activeExample}"
                </div>
              </div>

              {/* Passive Voice Box */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Passive Voice Formula</span>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300">
                  {causativeTypes[activeCausative].passiveFormula}
                </div>
                <div className="text-xs text-slate-300 pt-1">
                  <strong>Example:</strong> "{causativeTypes[activeCausative].passiveExample}"
                </div>
              </div>
            </div>

            {/* Sukanta Sir's Diagnostic Tip */}
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Sukanta Sir's Syntactic Invariant</span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {causativeTypes[activeCausative].bengaliNote}
              </p>
            </div>
          </div>
        </div>

        {/* Ergative & Middle Voice Matrix */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Split className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Ergative / Middle Voice Verbs (Labile Syntax)</h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold font-mono">
              Transitive ↔ Intransitive
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ergativePairs.map((p, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white font-mono text-sm">{p.verb}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-cyan-300 font-mono border border-slate-800">
                    Dual-Voice
                  </span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    <span className="text-[10px] text-emerald-400 font-mono block">Transitive (Agent-Driven):</span>
                    <span className="text-slate-200">"{p.trans}"</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    <span className="text-[10px] text-indigo-400 font-mono block">Intransitive (Middle Voice):</span>
                    <span className="text-slate-200">"{p.intra}"</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inchoative Verbs Studio */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-rose-400" />
              <h2 className="text-xl font-bold text-white">Inchoative Verbs (Verbs of State Transition)</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Beginning of Action / Becoming</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {inchoativeExamples.map((inc, iIdx) => (
              <div key={iIdx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-300 font-mono text-sm">{inc.verb}</span>
                  {showBengali && (
                    <span className="text-[10px] text-slate-400 font-mono">{inc.meaning}</span>
                  )}
                </div>
                <p className="text-xs text-slate-200 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  "{inc.example}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive MCQ Diagnostic Assessment */}
        <section className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-amber-400" />
              <div>
                <h2 className="text-xl font-bold text-white">Interactive Diagnostic Assessment</h2>
                <p className="text-xs text-slate-400">
                  25 Board & Competitive Examination Level Questions with Instant Feedback
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
              const isWrong = submitted && isAnswered && selectedOpt !== q.correctAnswer;

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

        {/* Auxiliary Components */}
        <section className="space-y-8">
          <PlainTextPrint
            content={noteText}
            title="Module 004.003 Study Note: Causative, Inchoative & Ergative Verbs"
          />

          <WordDictionary />

          <Teacher
            note="Remember the Golden Causative Rule: 'Make' takes a bare infinitive in active voice ('made him write'), but MUST take a to-infinitive in passive voice ('was made to write')! — Sukanta Hui"
          />

          <FAQTemplate
            faqList={[
              {
                question: "Why does 'He was made to wash the car' have 'to', but 'He made me wash the car' does not?",
                answer: "In active voice, 'make' takes a bare infinitive (without 'to'). But when transformed into passive voice ('be made'), English grammar mandatorily restores the full to-infinitive ('was made to wash')."
              },
              {
                question: "What is the structure of a Passive Causative?",
                answer: "Subject + have/get + Object (Thing) + Past Participle (V3). For example: 'I had my laptop repaired' or 'She got her dress stitched'."
              },
              {
                question: "What is an Ergative verb?",
                answer: "An Ergative (or labile) verb is one where the same lexical item can be used transitively with an agent ('The chef boiled the water') or intransitively where the patient becomes the grammatical subject ('The water boiled') without changing the verb form."
              },
              {
                question: "How does 'let' transform into passive voice?",
                answer: "In standard English, passive sentences avoid using 'let'; instead, 'let' is replaced by 'be allowed to' or 'be permitted to' (e.g. 'We were allowed to leave early')."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/004_002_regular-vs-irregular-verbs-and-conjugation-mechanics/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Module 004_002 (Regular vs Irregular Verbs)</span>
          </a>

          <a
            href="/english-grammar/topic/004_004_subject-verb-agreement-the-twenty-five-rules-of-concord/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Module 004_004 (25 Rules of Concord)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
