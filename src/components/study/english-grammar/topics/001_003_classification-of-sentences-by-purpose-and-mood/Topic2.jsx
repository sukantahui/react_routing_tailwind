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
  ToggleLeft,
  ShieldCheck,
  MessageSquare
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

export default function Topic2() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedTagIndex, setSelectedTagIndex] = useState(0);

  const tags = [
    {
      statement: "I am right",
      tag: "aren't I?",
      rule: "Standard 'I am' Contracted Invariant",
      desc: "Contracted negative tag for 'I am' is strictly 'aren't I?' (never *amn't I*).",
      descBn: "'I am'-এর Negative Tag সর্বদাই 'aren't I?' হয়।"
    },
    {
      statement: "Let's begin the coding session",
      tag: "shall we?",
      rule: "Proposal with 'Let's'",
      desc: "Proposals using 'Let us' mandate the invariant future tag 'shall we?'.",
      descBn: "'Let's' (Let us) প্রস্তাবমূলক বাক্যে নির্দিষ্ট Tag 'shall we?' বসে।"
    },
    {
      statement: "She seldom speaks during the lecture",
      tag: "does she?",
      rule: "Semi-Negative Polarity Flip",
      desc: "'Seldom' is negative, shifting polarity to a POSITIVE tag 'does she?'.",
      descBn: "'Seldom' না-বোধক অর্থ প্রকাশ করে, তাই Tag হবে হ্যাঁ-বোধক 'does she?'।"
    },
    {
      statement: "Nobody attended the optional tutorial",
      tag: "did they?",
      rule: "Indefinite Pronoun Agreement",
      desc: "'Nobody' takes plural tag pronoun 'they' with past affirmative operator 'did'.",
      descBn: "'Nobody'-এর জন্য Plural Pronoun 'they' বসে, তাই 'did they?'।"
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
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Segment 1 · Foundations
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Module 001_003 · Topic 2
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Question Tags: Polarity Dynamics & Special Exceptions
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Master the golden polarity reversal law ($Positive \leftrightarrow Negative$), high-frequency exceptions (*aren't I?*, *shall we?*), and semi-negative adverb traps.
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
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400/50 shadow-emerald-950/50 ring-2 ring-emerald-500/20"
                    : "bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white"
                }`}
              >
                <Languages className={`w-4 h-4 transition-transform duration-300 ${showBengali ? "rotate-180 text-white" : "text-indigo-400"}`} />
                <span>{showBengali ? "বাংলা ব্যাখ্যা সক্রিয় (Active)" : "বাংলা ব্যাখ্যা দেখুন (Toggle বাংলা)"}</span>
              </button>
            </div>
          </div>

          {showBengali && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-sm flex items-start gap-3 animate-fade-in">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-300">বাংলা মাধ্যম শিক্ষার্থীদের জন্য বিশেষ নির্দেশিকা:</p>
                <p className="text-emerald-200/90 text-xs mt-1 leading-relaxed">
                  Question Tag হলো বাক্যের শেষে জুড়ে দেওয়া ছোট প্রশ্ন। হ্যাঁ-বোধক বাক্য না-বোধক Tag নেয়, আর না-বোধক বাক্য হ্যাঁ-বোধক Tag নেয়। <em>'I am right, aren't I?'</em> এবং <em>'Let's go, shall we?'</em> হলো সর্বাধিক প্রচলিত ব্যতিক্রম।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Tag Simulator Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <ToggleLeft className="w-4 h-4" />
                Polarity Shift Simulator
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                High-Frequency Question Tag Lab
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTagIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                    selectedTagIndex === idx
                      ? "bg-indigo-600 text-white border-indigo-400"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  Rule {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-base flex flex-wrap items-center justify-between gap-3">
              <span className="text-slate-200">"{tags[selectedTagIndex].statement},"</span>
              <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                {tags[selectedTagIndex].tag}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-400 uppercase font-mono">
                {tags[selectedTagIndex].rule}
              </span>
              <p className="text-sm text-slate-300">
                {tags[selectedTagIndex].desc}
              </p>
            </div>

            {showBengali && (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-300 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>বাংলা নিয়ম:</strong> {tags[selectedTagIndex].descBn}</span>
              </div>
            )}
          </div>
        </div>

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Topic 2 Diagnostic Assessment (10 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 2: Question Tags & Polarity Rules — Quick Notes"
          />

          <WordDictionary />

          <Teacher
            note="Watch out for words like 'hardly' and 'seldom' — they turn the sentence negative silently and demand a positive tag! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_003_classification-of-sentences-by-purpose-and-mood/1"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 1 (Interrogative Inversion)</span>
          </a>

          <a
            href="/english-grammar/topic/001_003_classification-of-sentences-by-purpose-and-mood/3"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 3 (Imperative Sentences)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
