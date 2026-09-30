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
  Link,
  Users,
  Layers,
  Sparkle
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

export default function Topic10() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeCategory, setActiveCategory] = useState("head_first");
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* HERO HEADER */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Module 002_001 · Topic 10
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Morphological Compounding
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Pluralization of Compound Nouns
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the Head Noun Rule (<em>sons-in-law</em>, <em>commanders-in-chief</em>), double-plural mutations (<em>men-servants</em>), and container suffix rules (<em>spoonfuls</em>).
              </p>
            </div>

            <button
              onClick={() => setShowBengali(prev => !prev)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs font-bold transition-all shadow-lg hover:border-indigo-400 shrink-0 self-start md:self-auto"
            >
              <Languages className="w-4 h-4 text-indigo-400" />
              <span>{showBengali ? "Hide Bengali / বাংলা লুকান" : "Show Bengali / বাংলা দেখুন"}</span>
            </button>
          </div>
        </div>

        {/* 1. INTERACTIVE COMPOUND CATEGORY STUDIO */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Link className="w-5 h-5 text-indigo-400" />
                <span>The 4 Compound Pluralization Paradigms</span>
              </h2>
              <p className="text-xs text-slate-400">Select a structural paradigm below to examine how the plural suffix attaches to compound elements</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "head_first", label: "1. Head Noun First (Sons-in-law, Passers-by)" },
              { id: "head_second", label: "2. Head Noun Second (Maid-servants, Step-sons)" },
              { id: "both_mutate", label: "3. Double Plural (Men-servants, Women-doctors)" },
              { id: "ful_suffix", label: "4. Capacity & Idiomatic (Spoonfuls, Forget-me-nots)" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all border ${
                  activeCategory === tab.id
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-950 scale-105"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Box */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-4">
            {activeCategory === "head_first" && (
              <div className="space-y-4">
                <div className="border-b border-slate-800 pb-2 flex justify-between items-center text-xs">
                  <span className="font-bold text-white">Rule: Attach '-s' to the First Principal Noun Head</span>
                  <span className="text-rose-400 font-mono">Trap: Never attach '-s' to 'in-law' or 'by'</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  {[
                    { s: "Son-in-law", p: "Sons-in-law", head: "Son" },
                    { s: "Daughter-in-law", p: "Daughters-in-law", head: "Daughter" },
                    { s: "Brother-in-law", p: "Brothers-in-law", head: "Brother" },
                    { s: "Commander-in-chief", p: "Commanders-in-chief", head: "Commander" },
                    { s: "Passer-by", p: "Passers-by", head: "Passer" },
                    { s: "Looker-on", p: "Lookers-on", head: "Looker" },
                    { s: "Runner-up", p: "Runners-up", head: "Runner" },
                    { s: "Governor-general", p: "Governors-general", head: "Governor" },
                    { s: "Coat-of-mail", p: "Coats-of-mail", head: "Coat" }
                  ].map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="flex justify-between font-mono">
                        <span className="text-slate-400">{item.s}</span>
                        <span className="text-emerald-400 font-bold">→ {item.p}</span>
                      </div>
                      <span className="text-[10px] text-indigo-300">Head Word: {item.head}</span>
                    </div>
                  ))}
                </div>
                {showBengali && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 text-xs">
                    <strong>বাংলা ব্যাখ্যা:</strong> Son-in-law বা Passer-by এর ক্ষেত্রে মূল শব্দ হলো 'Son' এবং 'Passer'। তাই বহুবচনে Sons-in-law ও Passers-by হবে (*Son-in-laws লেখা সম্পূর্ণ ভুল)।
                  </div>
                )}
              </div>
            )}

            {activeCategory === "head_second" && (
              <div className="space-y-4">
                <div className="border-b border-slate-800 pb-2 text-xs font-bold text-white">
                  Rule: Attach '-s' to the Second Word (When it serves as the principal head)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  {[
                    { s: "Maid-servant", p: "Maid-servants", head: "Servant" },
                    { s: "Step-son", p: "Step-sons", head: "Son" },
                    { s: "Step-daughter", p: "Step-daughters", head: "Daughter" },
                    { s: "Book-case", p: "Book-cases", head: "Case" },
                    { s: "Arm-chair", p: "Arm-chairs", head: "Chair" },
                    { s: "Boy-friend", p: "Boy-friends", head: "Friend" }
                  ].map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="flex justify-between font-mono">
                        <span className="text-slate-400">{item.s}</span>
                        <span className="text-emerald-400 font-bold">→ {item.p}</span>
                      </div>
                      <span className="text-[10px] text-indigo-300">Head Word: {item.head}</span>
                    </div>
                  ))}
                </div>
                {showBengali && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 text-xs">
                    <strong>বাংলা ব্যাখ্যা:</strong> Maid-servant বা Step-son এ মূল Noun টি দ্বিতীয় স্থানে রয়েছে (servant, son), তাই দ্বিতীয় শব্দের সাথে '-s' যুক্ত হয়ে Maid-servants ও Step-sons গঠিত হয়।
                  </div>
                )}
              </div>
            )}

            {activeCategory === "both_mutate" && (
              <div className="space-y-4">
                <div className="border-b border-slate-800 pb-2 text-xs font-bold text-white">
                  Rule: Double Plural (Both elements mutate when expressing title/gender + role)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    { s: "Man-servant", p: "Men-servants", note: "Both 'Man' and 'Servant' mutate" },
                    { s: "Woman-servant", p: "Women-servants", note: "Both 'Woman' and 'Servant' mutate" },
                    { s: "Man-doctor", p: "Men-doctors", note: "Both 'Man' and 'Doctor' mutate" },
                    { s: "Woman-doctor", p: "Women-doctors", note: "Both 'Woman' and 'Doctor' mutate" },
                    { s: "Lord-justice", p: "Lords-justices", note: "Both 'Lord' and 'Justice' pluralize" },
                    { s: "Knight-templar", p: "Knights-templars", note: "Both 'Knight' and 'Templar' pluralize" }
                  ].map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="flex justify-between font-mono">
                        <span className="text-slate-400">{item.s}</span>
                        <span className="text-emerald-400 font-bold">→ {item.p}</span>
                      </div>
                      <span className="text-[10px] text-amber-300">{item.note}</span>
                    </div>
                  ))}
                </div>
                {showBengali && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 text-xs">
                    <strong>বাংলা ব্যাখ্যা:</strong> Man-servant, Woman-doctor ইত্যাদি ক্ষেত্রে লিঙ্গবাচক ও পেশাগত উভয় পদই বহুবচনে রূপান্তরিত হয়ে Men-servants ও Women-doctors হয়।
                  </div>
                )}
              </div>
            )}

            {activeCategory === "ful_suffix" && (
              <div className="space-y-4">
                <div className="border-b border-slate-800 pb-2 text-xs font-bold text-white">
                  Rule: Container Suffix '-ful' & Idiomatic Phrases (Append '-s' at the very end)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    { s: "Spoonful", p: "Spoonfuls", ex: "Add two spoonfuls of sugar." },
                    { s: "Handful", p: "Handfuls", ex: "Only a few handfuls of grain remained." },
                    { s: "Mouthful", p: "Mouthfuls", ex: "Swallowed three mouthfuls of water." },
                    { s: "Merry-go-round", p: "Merry-go-rounds", ex: "Fairground merry-go-rounds." },
                    { s: "Forget-me-not", p: "Forget-me-nots", ex: "Blue forget-me-nots in bloom." },
                    { s: "Good-for-nothing", p: "Good-for-nothings", ex: "A group of idle good-for-nothings." }
                  ].map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="flex justify-between font-mono">
                        <span className="text-slate-400">{item.s}</span>
                        <span className="text-emerald-400 font-bold">→ {item.p}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 italic">"{item.ex}"</p>
                    </div>
                  ))}
                </div>
                {showBengali && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 text-xs">
                    <strong>বাংলা ব্যাখ্যা:</strong> Spoonful বা Handful পরিমাপের একক হিসেবে গণ্য হয়, তাই এর শেষে '-s' বসে Spoonfuls ও Handfuls হয় (*Spoonsful লেখা ভুল)।
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* PRACTICE ASSESSMENT WITH 10 QUESTIONS */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Topic 10 Diagnostic Quiz: Compound Noun Pluralization
                </h2>
                <p className="text-xs text-slate-400">Test your mastery of head words, double plurals, and -ful suffixes</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {submitted && (
                <span className="px-3.5 py-1.5 rounded-xl bg-indigo-950 border border-indigo-500/40 text-indigo-200 text-xs font-bold">
                  Score: {calculateScore()} / {questions.length}
                </span>
              )}
              <button
                onClick={resetQuiz}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div key={q.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm font-semibold text-slate-100 whitespace-pre-line">{q.question}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[q.id] === optIdx;
                    const isCorrect = q.correctAnswer === optIdx;
                    let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";

                    if (submitted) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-rose-950/60 border-rose-500 text-rose-200";
                      } else {
                        btnStyle = "bg-slate-900/40 border-slate-800/40 text-slate-500";
                      }
                    } else if (isSelected) {
                      btnStyle = "bg-indigo-950 border-indigo-500 text-indigo-200 font-semibold shadow-md";
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={submitted}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`text-left p-3 rounded-xl border text-xs transition-all leading-relaxed flex items-start gap-2.5 ${btnStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
                    <div className="text-emerald-400 font-semibold">Explanation: {q.explanation}</div>
                    {showBengali && q.explanationBn && (
                      <div className="text-slate-400 border-t border-slate-800 pt-1 mt-1 text-[11px]">
                        বাংলা: {q.explanationBn}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {!submitted && (
              <button
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(userAnswers).length === 0}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-950 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answers & View Diagnostics
              </button>
            )}
          </div>
        </div>

        {/* AUXILIARY SYSTEMS */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Module 002_001 Topic 10 Assessment & Practice Bank"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 10: Pluralization of Compound Nouns"
          />

          <WordDictionary />

          <Teacher
            note="When pluralizing compound nouns, always identify which word carries the primary meaning. It's 'sons-in-law' and 'passers-by', but 'spoonfuls' and 'men-servants'! — Sukanta Hui"
          />
        </div>

        {/* BIDIRECTIONAL NAVIGATION FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <a
            href="/english-grammar/module/002_001_noun-classification-number-and-irregular-plurals/topic-9"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-all hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 9 (Plural in Form, Singular in Meaning)</span>
          </a>

          <a
            href="/english-grammar/module/002_001_noun-classification-number-and-irregular-plurals/topic-11"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-950"
          >
            <span>Next: Topic 11 (Classroom Dialogue & Diagnostic Lab)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
