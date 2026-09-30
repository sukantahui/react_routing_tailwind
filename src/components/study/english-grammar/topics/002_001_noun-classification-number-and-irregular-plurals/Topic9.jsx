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
  GraduationCap,
  Activity,
  Trophy,
  Scale,
  Layers
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

export default function Topic9() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState("mathematics");
  const [activeTab, setActiveTab] = useState("academic");
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

  const disciplineData = {
    mathematics: {
      title: "MATHEMATICS",
      academic: "Mathematics IS an indispensable foundation for engineering.",
      academicRule: "Academic Science / Discipline → Singular Verb ('IS')",
      possessive: "His mathematics ARE shockingly inaccurate in the accounts.",
      possessiveRule: "Arithmetic Calculation Skills → Plural Verb ('ARE')",
      bn: "সাধারণ শাস্ত্র হিসেবে Mathematics-এর পরে 'is' বসে; কিন্তু ব্যক্তির হিসাবের দক্ষতা (His mathematics) বোঝালে 'are' বসে।"
    },
    statistics: {
      title: "STATISTICS",
      academic: "Statistics IS taught as a core subject in data science degrees.",
      academicRule: "Mathematical Science → Singular Verb ('IS')",
      possessive: "The official statistics REVEAL an unprecedented surge in exports.",
      possessiveRule: "Empirical Numerical Figures / Data Points → Plural Verb ('REVEAL')",
      bn: "পরিসংখ্যান শাস্ত্র অর্থে 'Statistics is'; কিন্তু জনগণনা বা তথ্যের রাশিমাল নির্দেশ করলে 'Statistics reveal' (Plural) বসে।"
    },
    politics: {
      title: "POLITICS",
      academic: "Politics IS a fascinating arena of public administration.",
      academicRule: "General Field of Statecraft → Singular Verb ('IS')",
      possessive: "His politics ARE intensely conservative and controversial.",
      possessiveRule: "Personal Political Ideologies / Motives → Plural Verb ('ARE')",
      bn: "রাজনীতি বিষয় হিসেবে 'Politics is'; কিন্তু ব্যক্তিগত রাজনৈতিক বিশ্বাস বা মতাদর্শ বোঝালে 'His politics are' হয়।"
    },
    ethics: {
      title: "ETHICS",
      academic: "Ethics IS an essential branch of moral philosophy.",
      academicRule: "Philosophical Discipline → Singular Verb ('IS')",
      possessive: "Corporate ethics in that multinational firm ARE deeply compromised.",
      possessiveRule: "Moral Standards / Operational Principles → Plural Verb ('ARE')",
      bn: "নীতিশাস্ত্র হিসেবে 'Ethics is'; কিন্তু কোনো প্রতিষ্ঠানের নৈতিক মানদণ্ড বোঝালে 'Corporate ethics are' হয়।"
    }
  };

  const currentDisc = disciplineData[selectedDiscipline];

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
                  Module 002_001 · Topic 9
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Syntactic Concord Mechanics
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Nouns Plural in Form but Singular in Meaning
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                Discover why words ending in <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded">-s</code> like <em>mathematics, news, measles, billiards, innings</em> take singular verbs, and when determiners trigger plural shifts!
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

        {/* 1. DISCIPLINE CONCORD DUAL SHIFT STUDIO */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-400" />
                <span>Academic Discipline Concord & The Determiner Shift</span>
              </h2>
              <p className="text-xs text-slate-400">Select a discipline below to compare its singular science meaning with its plural determiner shift</p>
            </div>
          </div>

          {/* Discipline Selectors */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(disciplineData).map(key => (
              <button
                key={key}
                onClick={() => setSelectedDiscipline(key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all border ${
                  selectedDiscipline === key
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-950 scale-105"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                {disciplineData[key].title}
              </button>
            ))}
          </div>

          {/* Dual Comparison Box */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-4">
            <div className="text-base font-bold text-white border-b border-slate-800 pb-2">
              {currentDisc.title}: Dual Concord Contrast
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Left: Singular Science */}
              <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-2">
                <span className="font-bold text-emerald-400 uppercase text-[11px] tracking-wider">
                  ✔ 1. As Academic Science → Singular Concord
                </span>
                <p className="text-slate-200 font-mono text-xs">
                  "{currentDisc.academic}"
                </p>
                <div className="text-[11px] text-slate-400 italic">
                  Rule: {currentDisc.academicRule}
                </div>
              </div>

              {/* Right: Plural Shift */}
              <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 space-y-2">
                <span className="font-bold text-amber-400 uppercase text-[11px] tracking-wider">
                  ⚡ 2. With Possessive / The → Plural Concord
                </span>
                <p className="text-slate-200 font-mono text-xs">
                  "{currentDisc.possessive}"
                </p>
                <div className="text-[11px] text-slate-400 italic">
                  Rule: {currentDisc.possessiveRule}
                </div>
              </div>
            </div>

            {showBengali && (
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 text-xs">
                <strong>বাংলা ব্যাখ্যা:</strong> {currentDisc.bn}
              </div>
            )}
          </div>
        </div>

        {/* 2. DISEASES, GAMES & MISCELLANEOUS NOUNS IN -S */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Diseases, Games & Invariable Singulars Ending in '-s'
              </h2>
              <p className="text-xs text-slate-400">All invariably take singular verbs despite their plural spelling</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Diseases */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <Activity className="w-4 h-4" />
                <span>Diseases (Singular Verb)</span>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-white">Measles:</strong>
                  <p className="text-slate-300 text-[11px]">"Measles IS an infectious viral illness."</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-white">Mumps:</strong>
                  <p className="text-slate-300 text-[11px]">"Mumps CAUSES swollen glands."</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-white">Rickets / Shingles:</strong>
                  <p className="text-slate-300 text-[11px]">"Rickets IS prevented by Vitamin D."</p>
                </div>
              </div>
            </div>

            {/* Games */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Trophy className="w-4 h-4" />
                <span>Games & Sports (Singular Verb)</span>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-white">Billiards:</strong>
                  <p className="text-slate-300 text-[11px]">"Billiards IS played on a green cloth table."</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-white">Darts:</strong>
                  <p className="text-slate-300 text-[11px]">"Darts REQUIRES exceptional hand-eye coordination."</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-white">Dominoes / Draughts:</strong>
                  <p className="text-slate-300 text-[11px]">"Dominoes IS a timeless tile pastime."</p>
                </div>
              </div>
            </div>

            {/* Miscellaneous */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Zap className="w-4 h-4" />
                <span>News, Innings & Gallows</span>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-white">News:</strong>
                  <p className="text-slate-300 text-[11px]">"No news IS good news."</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-white">Innings:</strong>
                  <p className="text-slate-300 text-[11px]">"India scored 450 in the first innings."</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-white">Summons:</strong>
                  <p className="text-slate-300 text-[11px]">"A court summons WAS issued yesterday."</p>
                </div>
              </div>
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
                  Topic 9 Diagnostic Quiz: Plural Form with Singular Meaning
                </h2>
                <p className="text-xs text-slate-400">Test your mastery of disciplines, games, diseases, and possessive shifts</p>
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
            title="Module 002_001 Topic 9 Assessment & Practice Bank"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 9: Nouns Plural in Form but Singular in Meaning"
          />

          <WordDictionary />

          <Teacher
            note="Watch out for the possessive determiner shift! 'Mathematics is', but 'His mathematics are'. Mastering this subtlety elevates your score in advanced exams! — Sukanta Hui"
          />
        </div>

        {/* BIDIRECTIONAL NAVIGATION FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <a
            href="/english-grammar/module/002_001_noun-classification-number-and-irregular-plurals/topic-8"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-all hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 8 (Pluralia Tantum)</span>
          </a>

          <a
            href="/english-grammar/module/002_001_noun-classification-number-and-irregular-plurals/topic-10"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-950"
          >
            <span>Next: Topic 10 (Pluralization of Compound Nouns)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
