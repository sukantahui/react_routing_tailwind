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
  Dna,
  Layers,
  Sparkle,
  Compass
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

export default function Topic6() {
  const [showBengali, setShowBengali] = useState(false);
  const [zeroPluralQty, setZeroPluralQty] = useState(1);
  const [selectedMutationFamily, setSelectedMutationFamily] = useState("ablaut");
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
                  Module 002_001 · Topic 6
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Ablaut & Zero Plurals
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Irregular Plural Mutations & Zero-Plural Invariants
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                Explore root-vowel mutations (<em>foot → feet</em>, <em>mouse → mice</em>), archaic Old English <em>-en</em> suffixes (<em>oxen</em>, <em>children</em>), and invariable zero-plurals (<em>sheep</em>, <em>deer</em>, <em>aircraft</em>).
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

        {/* 1. VOWEL MUTATION LAB */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Dna className="w-5 h-5 text-indigo-400" />
                <span>Historical Vowel Mutation (Ablaut/Umlaut)</span>
              </h2>
              <p className="text-xs text-slate-400">Core Germanic nouns forming plurals via internal root-vowel shifts rather than -s</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {[
              { s: "Foot", p: "Feet", shift: "oo → ee", context: "Measured six feet in length." },
              { s: "Tooth", p: "Teeth", shift: "oo → ee", context: "The dentist examined all his teeth." },
              { s: "Goose", p: "Geese", shift: "oo → ee", context: "A flock of migratory geese landed." },
              { s: "Man", p: "Men", shift: "a → e", context: "Distinguished men of science." },
              { s: "Woman", p: "Women", shift: "a → e", context: "Pronounced /ˈwɪm.ɪn/." },
              { s: "Mouse", p: "Mice", shift: "ou → i", context: "Laser mice installed at the workstation." },
              { s: "Louse", p: "Lice", shift: "ou → i", context: "Microscopic parasitic lice." }
            ].map((m, mIdx) => (
              <div key={mIdx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 hover:border-indigo-500/40 transition-all">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 font-mono">
                  <span className="text-slate-400">{m.s}</span>
                  <span className="text-emerald-400 font-bold">→ {m.p}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-indigo-300">
                  <span>Shift: {m.shift}</span>
                  <span className="text-slate-400 italic">"{m.context}"</span>
                </div>
              </div>
            ))}
          </div>

          {/* Nationality Trap Alert */}
          <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>The Nationality False-Compound Trap</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Words like <strong>German</strong>, <strong>Norman</strong>, and <strong>Mussulman</strong> are proper nationalities, NOT compounds of the noun 'man'. They form plurals with regular <strong>'-s'</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono pt-1 text-slate-200">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                German → <strong className="text-emerald-400">Germans</strong> (NOT *Germen)
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                Norman → <strong className="text-emerald-400">Normans</strong> (NOT *Normen)
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                Mussulman → <strong className="text-emerald-400">Mussulmans</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 2. ZERO-PLURAL INTERACTIVE CONCORD SIMULATOR */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-400" />
                <span>Zero-Plural Invariable Concord Studio</span>
              </h2>
              <p className="text-xs text-slate-400">Adjust the numerical quantity to see how zero-plural nouns alter their governing verbs without changing their spelling</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Quantity:</span>
              <button
                onClick={() => setZeroPluralQty(1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  zeroPluralQty === 1 ? "bg-indigo-600 text-white" : "bg-slate-950 text-slate-400 border border-slate-800"
                }`}
              >
                1 (Singular)
              </button>
              <button
                onClick={() => setZeroPluralQty(5)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  zeroPluralQty === 5 ? "bg-indigo-600 text-white" : "bg-slate-950 text-slate-400 border border-slate-800"
                }`}
              >
                5 (Plural)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-indigo-400 text-sm">SHEEP (Zero Plural)</span>
              <p className="font-mono text-slate-200">
                {zeroPluralQty === 1 ? "One sheep IS grazing on the hill." : "Five sheep ARE grazing on the hill."}
              </p>
              <p className="text-[11px] text-slate-400 italic">
                Rule: Spelling remains 'sheep' in both. Never add *-s!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400 text-sm">DEER (Zero Plural)</span>
              <p className="font-mono text-slate-200">
                {zeroPluralQty === 1 ? "A wild deer WAS spotted in the forest." : "Five wild deer WERE spotted in the forest."}
              </p>
              <p className="text-[11px] text-slate-400 italic">
                Rule: 'A deer was' vs 'Five deer were'. Never *deers!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-400 text-sm">AIRCRAFT (Zero Plural)</span>
              <p className="font-mono text-slate-200">
                {zeroPluralQty === 1 ? "One supersonic aircraft HAS landed." : "Five supersonic aircraft HAVE landed."}
              </p>
              <p className="text-[11px] text-slate-400 italic">
                Rule: 'Aircraft has' vs 'Five aircraft have'. Never *aircrafts!
              </p>
            </div>
          </div>

          {showBengali && (
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 text-xs">
              <strong>বাংলা ব্যাখ্যা:</strong> Sheep, Deer, এবং Aircraft-এর সাথে কখনো 's' বসে না। এদের পূর্বে একবচনবাচক সংখ্যা থাকলে Singular Verb (is / was / has) এবং বহুবচনবাচক সংখ্যা থাকলে Plural Verb (are / were / have) বসে।
            </div>
          )}
        </div>

        {/* 3. ARCHAIC -EN SUFFIX & DUAL SIBLING LAB */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Archaic Germanic '-en' Plurals & Brothers vs Brethren
              </h2>
              <p className="text-xs text-slate-400">Old English grammatical relics and nuanced semantic splits</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-sm font-bold text-white font-mono">Brothers vs Brethren</div>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-indigo-400 font-bold">1. Brothers:</span>
                  <p className="text-slate-300 text-[11px] pt-0.5">Biological sons of the same parents (e.g., "His two brothers are engineers").</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-emerald-400 font-bold">2. Brethren:</span>
                  <p className="text-slate-300 text-[11px] pt-0.5">Members of a fraternal religious community, society, or philosophical guild (e.g., "The brethren gathered in prayer").</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-sm font-bold text-white font-mono">Fish vs Fishes Distinction</div>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-indigo-400 font-bold">1. Fish (Collective / Same species):</span>
                  <p className="text-slate-300 text-[11px] pt-0.5">"The fisherman caught ten fish in the river."</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-emerald-400 font-bold">2. Fishes (Distinct biological species):</span>
                  <p className="text-slate-300 text-[11px] pt-0.5">"Marine biologists studied the diverse fishes of the coral reef."</p>
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
                  Topic 6 Diagnostic Quiz: Irregular Plurals & Zero Plurals
                </h2>
                <p className="text-xs text-slate-400">Test your mastery of vowel mutations, zero plurals, and semantic dual forms</p>
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
            title="Module 002_001 Topic 6 Assessment & Practice Bank"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 6: Irregular Plural Mutations & Zero Plurals"
          />

          <WordDictionary />

          <Teacher
            note="Irregular and zero-plural nouns test deep historical morphological awareness. Always check the subject-verb concord for sheep, deer, and aircraft! — Sukanta Hui"
          />
        </div>

        {/* BIDIRECTIONAL NAVIGATION FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <a
            href="/english-grammar/module/002_001_noun-classification-number-and-irregular-plurals/topic-5"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-all hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 5 (Formation of Regular Plurals)</span>
          </a>

          <a
            href="/english-grammar/module/002_001_noun-classification-number-and-irregular-plurals/topic-7"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-950"
          >
            <span>Next: Topic 7 (Foreign Plurals from Latin & Greek)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
