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
  HelpCircle as QuestionIcon,
  ShieldCheck,
  MessageCircleQuestion,
  Lightbulb,
  Target,
  Heart,
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
  const [selectedCase, setSelectedCase] = useState(0);

  const cases = [
    {
      title: "Universal Positive ('Everyone')",
      assertive: "Everyone honors an upright judge.",
      interrogative: "Who does not honor an upright judge?",
      rule: "'Everyone' transforms into 'Who does not + base verb...?' to create a forceful rhetorical assertion.",
      ruleBn: "'Everyone' থাকলে প্রশ্নে রূপান্তরের সময় 'Who does not...?' ব্যবহৃত হয়।"
    },
    {
      title: "Universal Negative ('Nobody / None')",
      assertive: "Nobody can alter the past.",
      interrogative: "Who can alter the past? (or Can anyone alter the past?)",
      rule: "'Nobody' transforms into affirmative 'Who + verb...?' or 'Can anyone...?' with positive polarity.",
      ruleBn: "'Nobody' থাকলে রূপান্তরের সময় 'Who...?' বা 'Can anyone...?' বসে।"
    },
    {
      title: "Affirmative Statement with Polarity Inversion",
      assertive: "Courage is required to speak truth to power.",
      interrogative: "Is courage not required to speak truth to power?",
      rule: "Standard affirmative declaration inverts into a negative question using auxiliary fronting.",
      ruleBn: "সাধারণ হ্যাঁ-বোধক বাক্যকে নেগেটিভ প্রশ্নবোধক বাক্যে রূপান্তর করে অর্থ ঠিক রাখা হয়।"
    },
    {
      title: "Temporal Invariant ('Never' ↔ 'Ever / When')",
      assertive: "A true scholar will never despise humble beginnings.",
      interrogative: "Will a true scholar ever despise humble beginnings?",
      rule: "'Never' converts into 'ever' inside an auxiliary-inverted question.",
      ruleBn: "'Never' পরিবর্তিত হয়ে প্রশ্নবোধকে 'ever' গঠন ধারণ করে।"
    }
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
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Segment 1 · Foundations
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Module 001_004 · Topic 6
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Assertive ↔ Interrogative Rhetorical Transformation
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Transform declarative statements into forceful rhetorical questions. Master the polarity inversion rule and universal subject conversions ('Everyone' $\rightarrow$ 'Who does not').
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
                    ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white border-sky-400/50 shadow-sky-950/50 ring-2 ring-sky-500/20"
                    : "bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white"
                }`}
              >
                <Languages className={`w-4 h-4 transition-transform duration-300 ${showBengali ? "rotate-180 text-white" : "text-indigo-400"}`} />
                <span>{showBengali ? "বাংলা ব্যাখ্যা সক্রিয় (Active)" : "বাংলা ব্যাখ্যা দেখুন (Toggle বাংলা)"}</span>
              </button>
            </div>
          </div>

          {showBengali && (
            <div className="mt-6 p-4 rounded-2xl bg-sky-950/40 border border-sky-500/30 text-sky-200 text-sm flex items-start gap-3 animate-fade-in">
              <Sparkles className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sky-300">অলংকারিক প্রশ্ন (Rhetorical Questions) রূপান্তর গাইড:</p>
                <p className="text-sky-200/90 text-xs mt-1 leading-relaxed">
                  বিবৃতিমূলক বাক্যকে প্রশ্নে রূপান্তর করার সময় মনে রাখতে হবে: যদি মূল বাক্যটি <strong>হ্যাঁ-বোধক (+)</strong> হয়, তবে প্রশ্নটি হবে <strong>না-বোধক (-)</strong>; আর মূল বাক্যটি <strong>না-বোধক (-)</strong> হলে প্রশ্নটি হবে <strong>হ্যাঁ-বোধক (+)</strong>।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Case Studio */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <MessageCircleQuestion className="w-6 h-6 text-sky-400" />
              <h2 className="text-xl font-bold text-white">Rhetorical Inversion Studio</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">4 Conversions</span>
          </div>

          {/* Grid Selection */}
          
        
        {/* ========================================================================= */}
        {/* IN VERY SIMPLE LANGUAGE: CORE INTUITIVE BREAKDOWN                         */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Beginner Friendly · Core Intuition</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Rhetorical Questions in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                A rhetorical question is a statement disguised as a question because everyone already knows the answer.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              The Obvious Answer
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Positive Statement → Negative Question</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                "Everyone loves freedom" → Ask: "Who does NOT love freedom?" (Answer: Nobody! So everyone loves it).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 Statement (+) =→ Rhetorical Question (-).
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Negative Statement → Positive Question</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                "Nobody can touch the sun" → Ask: "Who CAN touch the sun?" (Answer: Nobody!).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 Statement (-) =→ Rhetorical Question (+).
              </div>
            </div>
          </div>

          {/* 4 Building Blocks Matrix */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              Key Pillars at a Glance
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-blue-400 block font-mono">Everyone → Who not</span>
                <p className="text-xs text-slate-300">"Everyone knows him" → "Who doesn't know him?"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block font-mono">Nobody → Who can</span>
                <p className="text-xs text-slate-300">"Nobody can do this" → "Who can do this?"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">Never → When / Ever</span>
                <p className="text-xs text-slate-300">"Glory never fades" → "When can glory fade?"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">No use → What is use</span>
                <p className="text-xs text-slate-300">"No use crying" → "What is the use of crying?"</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "Who does not know that honesty is the bedrock of noble character?"
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় Rhetorical প্রশ্ন:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                Rhetorical Question উত্তরের জন্য করা হয় না, বরং বক্তব্যকে জোরদার করতে ব্যবহৃত হয়। যেমন: 'কে না মাকে ভালোবাসে?' = 'সবাই মাকে ভালোবাসে'।
              </p>
            </div>
          )}
        </div>

{/* ========================================================================= */}
        {/* IN VERY SIMPLE LANGUAGE: CORE INTUITIVE BREAKDOWN                         */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Beginner Friendly · Core Intuition</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Rhetorical Questions in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                A rhetorical question is a statement disguised as a question because everyone already knows the answer.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              The Obvious Answer
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Positive Statement → Negative Question</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                "Everyone loves freedom" → Ask: "Who does NOT love freedom?" (Answer: Nobody! So everyone loves it).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 Statement (+) =→ Rhetorical Question (-).
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Negative Statement → Positive Question</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                "Nobody can touch the sun" → Ask: "Who CAN touch the sun?" (Answer: Nobody!).
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 Statement (-) =→ Rhetorical Question (+).
              </div>
            </div>
          </div>

          {/* 4 Building Blocks Matrix */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              Key Pillars at a Glance
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-blue-400 block font-mono">Everyone → Who not</span>
                <p className="text-xs text-slate-300">"Everyone knows him" → "Who doesn't know him?"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block font-mono">Nobody → Who can</span>
                <p className="text-xs text-slate-300">"Nobody can do this" → "Who can do this?"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">Never → When / Ever</span>
                <p className="text-xs text-slate-300">"Glory never fades" → "When can glory fade?"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">No use → What is use</span>
                <p className="text-xs text-slate-300">"No use crying" → "What is the use of crying?"</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              "Who does not know that honesty is the bedrock of noble character?"
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় Rhetorical প্রশ্ন:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                Rhetorical Question উত্তরের জন্য করা হয় না, বরং বক্তব্যকে জোরদার করতে ব্যবহৃত হয়। যেমন: 'কে না মাকে ভালোবাসে?' = 'সবাই মাকে ভালোবাসে'।
              </p>
            </div>
          )}
        </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {cases.map((c, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCase(idx)}
                className={`p-3.5 rounded-2xl text-left text-xs font-semibold transition border ${
                  selectedCase === idx
                    ? "bg-sky-600 text-white border-sky-400 shadow-lg shadow-sky-950"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="text-[10px] uppercase font-mono opacity-75">Case #{idx + 1}</div>
                <div className="mt-1 font-bold truncate">{c.title}</div>
              </button>
            ))}
          </div>

          {/* Active Card View */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-sky-500/30 space-y-5 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Assertive Source</span>
                <p className="font-mono text-sm text-white">"{cases[selectedCase].assertive}"</p>
              </div>

              <div className="p-5 rounded-xl bg-sky-950/30 border border-sky-500/30 space-y-2">
                <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Rhetorical Interrogative
                </span>
                <p className="font-mono text-sm text-emerald-300 font-bold">"{cases[selectedCase].interrogative}"</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-sky-300 uppercase tracking-wider">Syntactic Rule</span>
              <p className="text-xs text-slate-300 leading-relaxed">{cases[selectedCase].rule}</p>
              {showBengali && (
                <p className="text-xs text-sky-300/90 pt-1 border-t border-slate-800 leading-relaxed">
                  <strong>বাংলা ব্যাখ্যা:</strong> {cases[selectedCase].ruleBn}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Topic 6 Diagnostic Assessment (25 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 6: Assertive ↔ Interrogative Notes"
          />

          <WordDictionary />

          <Teacher
            note="A rhetorical question is the sharpest sword of an orator. Use it to make the truth indisputable! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_004_phrases-vs-clauses-and-sentence-transformation-basics/5"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 5 (Affirmative ↔ Negative)</span>
          </a>

          <a
            href="/english-grammar/topic/001_004_phrases-vs-clauses-and-sentence-transformation-basics/7"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 7 (Exclamatory ↔ Assertive)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
