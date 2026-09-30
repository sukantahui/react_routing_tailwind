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
  MessageSquare,
  ShieldCheck,
  Volume2,
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
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);

  const labScenarios = [
    {
      title: "Negative Inherent Words Traps",
      student: "Swadeep",
      mistake: "He hardly works, doesn't he? ❌",
      correction: "He hardly works, does he? ✅",
      rule: "Words like 'hardly', 'scarcely', 'barely', 'seldom', and 'rarely' make the clause negative in meaning. Thus, the tag must be positive.",
      ruleBn: "'Hardly', 'scarcely', 'barely', 'seldom' থাকলে বাক্যটি নেগেটিভ অর্থ প্রকাশ করে, তাই ট্যাগ সর্বদা পজিটিভ ('does he?') হবে।"
    },
    {
      title: "Suggestions vs Third-Person Permission ('Let' Constructions)",
      student: "Debangshu",
      mistake: "Let us organize the seminar, will you? ❌",
      correction: "Let us organize the seminar, shall we? ✅",
      rule: "'Let us' / 'Let's' expresses inclusive suggestion, taking 'shall we?'. By contrast, 'Let him / Let them' expresses permission and takes 'will you?'.",
      ruleBn: "'Let us' (Let's) দিয়ে প্রস্তাব বা সাজেশন বোঝালে 'shall we?' বসে। কিন্তু 'Let him / Let them' দিয়ে অনুমতি বোঝালে 'will you?' বসে।"
    },
    {
      title: "Indefinite Pronoun Concord in Tags",
      student: "Tuhina",
      mistake: "Everybody is attending the session, isn't he? ❌",
      correction: "Everybody is attending the session, aren't they? ✅",
      rule: "Indefinite personal pronouns ('everybody', 'somebody', 'nobody', 'anyone') take the plural pronoun 'they' in the question tag, demanding plural auxiliary agreement ('aren't they?').",
      ruleBn: "'Everybody', 'somebody', 'nobody' ইত্যাদির জন্য ট্যাগ-এ 'they' বসে, যার ফলে অক্সিলিয়ারি ভার্বটিও প্লুরাল হয়ে 'aren't they?' হয়।"
    },
    {
      title: "Spoken Tone: Rising (↗) vs Falling (↘) Dynamics",
      student: "Ankita",
      mistake: "Flat intonation in spoken tags",
      correction: "Rising ↗ = Genuine Question | Falling ↘ = Seeking Rhetorical Confirmation",
      rule: "Rising pitch invites new information when uncertain. Falling pitch asserts confidence and simply expects the listener to agree.",
      ruleBn: "ট্যাগে স্বর উঁচুতে উঠলে (Rising ↗) প্রকৃত প্রশ্ন বোঝায়; স্বর নিচে নামলে (Falling ↘) শুধুই সহমত বা সম্মতি প্রত্যাশা করা হয়।"
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
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Segment 1 · Foundations
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Module 001_003 · Topic 6
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Classroom Practice Lab: Tone Modulation & Question Tags
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Step inside Sukanta Sir's Barrackpore classroom. Analyze real-time student diagnostics, resolve tricky polarity edge cases, and master acoustic intonation curves.
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
                    ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-teal-400/50 shadow-teal-950/50 ring-2 ring-teal-500/20"
                    : "bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white"
                }`}
              >
                <Languages className={`w-4 h-4 transition-transform duration-300 ${showBengali ? "rotate-180 text-white" : "text-indigo-400"}`} />
                <span>{showBengali ? "বাংলা ব্যাখ্যা সক্রিয় (Active)" : "বাংলা ব্যাখ্যা দেখুন (Toggle বাংলা)"}</span>
              </button>
            </div>
          </div>

          {showBengali && (
            <div className="mt-6 p-4 rounded-2xl bg-teal-950/40 border border-teal-500/30 text-teal-200 text-sm flex items-start gap-3 animate-fade-in">
              <Sparkles className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-teal-300">ক্লাসরুম ডায়ালগ ও বাস্তব অনুশীলন গাইড:</p>
                <p className="text-teal-200/90 text-xs mt-1 leading-relaxed">
                  ব্যারাকপুর ক্লাসরুমের বাস্তব উদাহরণ থেকে শিক্ষার্থীরা শিখছে কীভাবে বাক্যের সুর (Intonation) এবং গোপন ব্যাকরণগত ফাঁদ (Polarity traps) শনাক্ত করে নির্ভুল Question Tag প্রয়োগ করা যায়।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Case Study Selector */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <MessageSquare className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Barrackpore Classroom Diagnostic Scenarios</h2>
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
                Spoken Tone & Polarity in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                In real conversations, your voice pitch (intonation) changes what a question tag really means.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              Real-Life Speech
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Falling Tone (Pitch goes DOWN ↘)</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                You are confident and already know the answer; you are just inviting friendly agreement: "It's a nice day, isn't it? ↘".
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 Falling Pitch = Friendly Confirmation.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Rising Tone (Pitch goes UP ↗)</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                You are genuinely unsure and asking a real question: "You haven't seen my keys, have you? ↗".
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 Rising Pitch = Genuine Uncertainty.
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
                <span className="text-xs font-bold text-emerald-400 block font-mono">Falling Intonation (↘)</span>
                <p className="text-xs text-slate-300">Speaker expects agreement (Confident)</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">Rising Intonation (↗)</span>
                <p className="text-xs text-slate-300">Speaker genuinely asks (Uncertain)</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-blue-400 block font-mono">1st Person Matrix</span>
                <p className="text-xs text-slate-300">"I think he will win, won't he?"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Imperative Softener</span>
                <p className="text-xs text-slate-300">"Pass the notes, will you?"</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              ""Swadeep is preparing diligently, isn't he?" — Mentoring dialogue analysis."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় সুরের উঠানামা ও ট্যাগ:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                কথোপকথনে কণ্ঠস্বরের সুর নিচে নামলে (Falling Tone) বক্তা নিশ্চিত থাকে এবং সম্মতি চায়। আর সুর উপরে উঠলে (Rising Tone) বক্তা সত্যই জানে না এবং উত্তর জানতে চায়।
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
                Spoken Tone & Polarity in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                In real conversations, your voice pitch (intonation) changes what a question tag really means.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              Real-Life Speech
            </span>
          </div>

          {/* Simple 2-Part Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>1. Falling Tone (Pitch goes DOWN ↘)</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                You are confident and already know the answer; you are just inviting friendly agreement: "It's a nice day, isn't it? ↘".
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-blue-200">
                👉 Falling Pitch = Friendly Confirmation.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Rising Tone (Pitch goes UP ↗)</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                You are genuinely unsure and asking a real question: "You haven't seen my keys, have you? ↗".
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-200">
                👉 Rising Pitch = Genuine Uncertainty.
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
                <span className="text-xs font-bold text-emerald-400 block font-mono">Falling Intonation (↘)</span>
                <p className="text-xs text-slate-300">Speaker expects agreement (Confident)</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">Rising Intonation (↗)</span>
                <p className="text-xs text-slate-300">Speaker genuinely asks (Uncertain)</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-blue-400 block font-mono">1st Person Matrix</span>
                <p className="text-xs text-slate-300">"I think he will win, won't he?"</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-purple-400 block font-mono">Imperative Softener</span>
                <p className="text-xs text-slate-300">"Pass the notes, will you?"</p>
              </div>
            </div>
          </div>

          {/* Real World Example Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              Everyday Exemplar in Context
            </span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-emerald-300">
              ""Swadeep is preparing diligently, isn't he?" — Mentoring dialogue analysis."
            </div>
          </div>

          {/* Bilingual Guidance Box */}
          {showBengali && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>সহজ ভাষায় সুরের উঠানামা ও ট্যাগ:</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                কথোপকথনে কণ্ঠস্বরের সুর নিচে নামলে (Falling Tone) বক্তা নিশ্চিত থাকে এবং সম্মতি চায়। আর সুর উপরে উঠলে (Rising Tone) বক্তা সত্যই জানে না এবং উত্তর জানতে চায়।
              </p>
            </div>
          )}
        </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {labScenarios.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCaseIndex(idx)}
                className={`p-3.5 rounded-2xl text-left text-xs font-semibold transition border ${
                  selectedCaseIndex === idx
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-950"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="text-[10px] uppercase opacity-75 font-mono">Case #{idx + 1} ({sc.student})</div>
                <div className="mt-1 truncate">{sc.title}</div>
              </button>
            ))}
          </div>

          {/* Active Diagnostic Breakdown */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-bold">
                Scenario Focus: {labScenarios[selectedCaseIndex].title}
              </span>
              <span className="text-xs text-slate-400 font-mono">Student: {labScenarios[selectedCaseIndex].student}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-1.5">
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Common Student Trap
                </span>
                <p className="font-mono text-xs text-rose-200">{labScenarios[selectedCaseIndex].mistake}</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Correct Form & Tag
                </span>
                <p className="font-mono text-xs text-emerald-200 font-bold">{labScenarios[selectedCaseIndex].correction}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Sukanta Sir's Explanatory Invariant</span>
              <p className="text-xs text-slate-300 leading-relaxed">{labScenarios[selectedCaseIndex].rule}</p>
              {showBengali && (
                <p className="text-xs text-teal-300/90 pt-1 border-t border-slate-800 leading-relaxed">
                  <strong>বাংলা ব্যাখ্যা:</strong> {labScenarios[selectedCaseIndex].ruleBn}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Topic 6 Diagnostic Lab Assessment (25 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 6: Classroom Practice Lab Notes"
          />

          <WordDictionary />

          <Teacher
            note="Classroom drills turn theoretical rules into spontaneous reflexes. Master the polarity flip, and you will never make an error in tags! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_003_classification-of-sentences-by-purpose-and-mood/5"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 5 (Optative Sentences)</span>
          </a>

          <a
            href="/english-grammar/topic/001_003_classification-of-sentences-by-purpose-and-mood/7"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 7 (Interactive Transformation Workbench)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
