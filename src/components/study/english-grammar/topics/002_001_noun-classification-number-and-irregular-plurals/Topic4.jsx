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
  Users,
  UserCheck,
  Scale,
  SplitSquareVertical,
  ShieldCheck
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

export default function Topic4() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedNounKey, setSelectedNounKey] = useState("jury");
  const [mode, setMode] = useState("unitary"); // "unitary" | "divided"
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

  const collectiveData = {
    jury: {
      name: "The Jury",
      unitarySentence: "The jury has reached its unanimous verdict.",
      unitaryAnalysis: "The jurors acted collectively as one unified decision-making body.",
      unitaryVerb: "has reached (Singular)",
      unitaryPronoun: "its (Singular Neuter)",
      unitaryBn: "জুরি যখন ঐক্যবদ্ধ হয়ে একটিমাত্র রায় দেয়, তখন এটি Singular (has / its)।",
      dividedSentence: "The jury were divided in their opinions regarding the verdict.",
      dividedAnalysis: "Individual members held conflicting viewpoints, acting as distinct persons.",
      dividedVerb: "were divided (Plural)",
      dividedPronoun: "their (Plural)",
      dividedBn: "সদস্যদের মধ্যে মতভেদ থাকলে একে 'Noun of Multitude' বলে, তাই Plural (were / their)।"
    },
    committee: {
      name: "The Committee",
      unitarySentence: "The committee has submitted its official annual report.",
      unitaryAnalysis: "A single unified publication representing the entire board.",
      unitaryVerb: "has submitted (Singular)",
      unitaryPronoun: "its (Singular Neuter)",
      unitaryBn: "কমিটি একক সংস্থা হিসেবে যৌথ রিপোর্ট পেশ করেছে (has / its)।",
      dividedSentence: "The committee are arguing among themselves over the new budget.",
      dividedAnalysis: "Individual committee members are disputing against one another.",
      dividedVerb: "are arguing (Plural)",
      dividedPronoun: "themselves (Plural)",
      dividedBn: "সদস্যরা নিজেদের মধ্যে তর্কে লিপ্ত (are / themselves)।"
    },
    team: {
      name: "The Team",
      unitarySentence: "The football team is celebrating its tournament victory.",
      unitaryAnalysis: "Celebrated as a single corporate champion entity.",
      unitaryVerb: "is celebrating (Singular)",
      unitaryPronoun: "its (Singular Neuter)",
      unitaryBn: "দল চ্যাম্পিয়ন হিসেবে একযোগে জয় উদযাপন করছে (is / its)।",
      dividedSentence: "The team are putting on their new personalized jerseys.",
      dividedAnalysis: "Each athlete is wearing their own individual uniform.",
      dividedVerb: "are putting on (Plural)",
      dividedPronoun: "their (Plural)",
      dividedBn: "খেলোয়াড়রা প্রত্যেকে আলাদা আলাদা জার্সি পরছে (are / their)।"
    },
    crew: {
      name: "The Crew",
      unitarySentence: "The flight crew is well-trained to manage emergencies.",
      unitaryAnalysis: "The entire operational staff assessed as a single unit.",
      unitaryVerb: "is well-trained (Singular)",
      unitaryPronoun: "its (Singular Neuter)",
      unitaryBn: "ক্রু দল সামগ্রিকভাবে দক্ষ ও প্রশিক্ষিত (is)।",
      dividedSentence: "The rescue crew were scrambling into their respective lifeboats.",
      dividedAnalysis: "Individual crew members running to separate boats.",
      dividedVerb: "were scrambling (Plural)",
      dividedPronoun: "their (Plural)",
      dividedBn: "নাবিকরা প্রত্যেকে নিজের নিজের লাইফবোটে উঠেছিল (were / their)।"
    },
    audience: {
      name: "The Audience",
      unitarySentence: "The audience was spellbound by the maestro's symphony.",
      unitaryAnalysis: "The entire hall experienced one collective emotional state.",
      unitaryVerb: "was spellbound (Singular)",
      unitaryPronoun: "its (Singular Neuter)",
      unitaryBn: "সমস্ত দর্শক একসঙ্গে মুগ্ধ হয়েছিল (was)।",
      dividedSentence: "The audience were clapping their hands and waving flags.",
      dividedAnalysis: "Thousands of separate individuals performing personal physical actions.",
      dividedVerb: "were clapping (Plural)",
      dividedPronoun: "their (Plural)",
      dividedBn: "দর্শকরা যে যার মতো হাততালি দিচ্ছিল (were / their)।"
    }
  };

  const currentNoun = collectiveData[selectedNounKey];

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
                  Module 002_001 · Topic 4
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Syntactic Concord Mechanics
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Collective Nouns: Singular vs Plural Concord
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the dual personality of collective nouns: when they act as an undivided unit (Singular) versus a <em>Noun of Multitude</em> (Plural).
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

        {/* INTERACTIVE CONCORD LAB */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Scale className="w-5 h-5 text-indigo-400" />
                <span>Interactive Collective Concord Studio</span>
              </h2>
              <p className="text-xs text-slate-400">Select a collective noun and toggle between Unitary Body and Divided Multitude</p>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800">
              <button
                onClick={() => setMode("unitary")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  mode === "unitary"
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Unitary Whole (Singular)</span>
              </button>
              <button
                onClick={() => setMode("divided")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  mode === "divided"
                    ? "bg-rose-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <SplitSquareVertical className="w-3.5 h-3.5" />
                <span>Noun of Multitude (Plural)</span>
              </button>
            </div>
          </div>

          {/* Collective Noun Selector */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(collectiveData).map(key => (
              <button
                key={key}
                onClick={() => setSelectedNounKey(key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all border ${
                  selectedNounKey === key
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-950 scale-105"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                {collectiveData[key].name}
              </button>
            ))}
          </div>

          {/* Dynamic Interactive Card */}
          <div className={`p-6 rounded-2xl border transition-all space-y-4 ${
            mode === "unitary"
              ? "bg-emerald-950/20 border-emerald-500/40"
              : "bg-rose-950/20 border-rose-500/40"
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-base font-extrabold text-white">
                {currentNoun.name} · {mode === "unitary" ? "Acting as One Body" : "Members Divided / Individual Actions"}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                mode === "unitary"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
              }`}>
                {mode === "unitary" ? "Governs Singular Concord" : "Governs Plural Concord"}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 font-mono">Exemplar Sentence:</div>
              <div className="text-sm sm:text-base font-semibold text-white font-serif tracking-wide">
                "{mode === "unitary" ? currentNoun.unitarySentence : currentNoun.dividedSentence}"
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-medium">Verb Agreement:</span>
                <p className={`font-bold font-mono ${mode === "unitary" ? "text-emerald-400" : "text-rose-400"}`}>
                  {mode === "unitary" ? currentNoun.unitaryVerb : currentNoun.dividedVerb}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-medium">Pronoun Agreement:</span>
                <p className={`font-bold font-mono ${mode === "unitary" ? "text-emerald-400" : "text-rose-400"}`}>
                  {mode === "unitary" ? currentNoun.unitaryPronoun : currentNoun.dividedPronoun}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 italic pt-1">
              <strong>Context Analysis:</strong> {mode === "unitary" ? currentNoun.unitaryAnalysis : currentNoun.dividedAnalysis}
            </p>

            {showBengali && (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-emerald-200 text-xs leading-relaxed">
                <strong>বাংলা ব্যাখ্যা:</strong> {mode === "unitary" ? currentNoun.unitaryBn : currentNoun.dividedBn}
              </div>
            )}
          </div>
        </div>

        {/* PRONOUN-VERB HARMONY TRAP ALERT */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                The Pronoun-Verb Harmony Rule (Zero Mixed Discord)
              </h2>
              <p className="text-xs text-slate-400">Never pair a singular verb with a plural pronoun or vice-versa</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-rose-500/30 space-y-2">
              <span className="text-rose-400 font-bold uppercase tracking-wider text-[11px]">❌ Mixed Discord (Error)</span>
              <p className="font-mono text-slate-300 line-through">
                "The committee <span className="text-rose-400 font-bold">has</span> submitted <span className="text-rose-400 font-bold">their</span> report."
              </p>
              <p className="text-slate-400 text-[11px]">
                Why wrong: 'has' is singular, but 'their' is plural. Concord is broken!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">✔ Harmonious Concord (Correct)</span>
              <p className="font-mono text-slate-200">
                "The committee <span className="text-emerald-400 font-bold">has</span> submitted <span className="text-emerald-400 font-bold">its</span> report."
              </p>
              <p className="text-slate-400 text-[11px]">
                Why right: Singular verb 'has' perfectly matches singular pronoun 'its'.
              </p>
            </div>
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
                  Topic 4 Diagnostic Quiz: Collective Noun Concord
                </h2>
                <p className="text-xs text-slate-400">Test your command over Unitary Wholes and Nouns of Multitude</p>
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
                  <p className="text-sm font-semibold text-slate-100">{q.question}</p>
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
            title="Module 002_001 Topic 4 Assessment & Practice Bank"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 4: Collective Nouns: Singular vs Plural Concord"
          />

          <WordDictionary />

          <Teacher
            note="Remember: The verb follows the meaning, not just the outward form. If the body is undivided, use singular; if members dispute or act on their own, use plural! — Sukanta Hui"
          />
        </div>

        {/* BIDIRECTIONAL NAVIGATION FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <a
            href="/english-grammar/module/002_001_noun-classification-number-and-irregular-plurals/topic-3"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-all hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 3 (Uncountable Traps)</span>
          </a>

          <a
            href="/english-grammar/module/002_001_noun-classification-number-and-irregular-plurals/topic-5"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-950"
          >
            <span>Next: Topic 5 (Formation of Regular Plurals)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
