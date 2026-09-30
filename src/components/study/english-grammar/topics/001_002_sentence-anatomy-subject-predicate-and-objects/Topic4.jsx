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
  ArrowRightLeft,
  Box,
  UserCheck,
  MessageSquare
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

export default function Topic4() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeShiftIndex, setActiveShiftIndex] = useState(0);

  const dativeExamples = [
    {
      verb: "GIVE",
      svoo: "Sukanta Sir gave Tuhina the reference notebook.",
      svoPrep: "Sukanta Sir gave the reference notebook to Tuhina.",
      io: "Tuhina (Beneficiary / Person)",
      do: "the reference notebook (Entity transferred)",
      analysisBn: "SVOO-তে ব্যক্তি আগে বসলে কোনো Preposition বসে না ('gave Tuhina the notebook'); বস্তু আগে বসলে 'to' বসে ('gave the notebook to Tuhina')।"
    },
    {
      verb: "BUY",
      svoo: "Swadeep bought his mother a smartphone.",
      svoPrep: "Swadeep bought a smartphone for his mother.",
      io: "his mother (Beneficiary)",
      do: "a smartphone (Item purchased)",
      analysisBn: "'Buy' Verb-এর ক্ষেত্রে বস্তু আগে বসলে 'for' Preposition বসে ('bought a smartphone for his mother')।"
    },
    {
      verb: "TEACH",
      svoo: "The instructor taught the cohort computational algorithms.",
      svoPrep: "The instructor taught computational algorithms to the cohort.",
      io: "the cohort (Students / Recipient)",
      do: "computational algorithms (Knowledge content)",
      analysisBn: "জ্ঞানদানের ক্ষেত্রেও একই নিয়ম প্রযোজ্য: 'to the cohort' বা 'the cohort'।"
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
                  Module 001_002 · Topic 4
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Direct Objects vs Indirect Objects
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Master the dual object mechanics of ditransitive verbs. Distinguish between what entity is transferred (Direct Object) and who receives the benefit (Indirect Object).
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
                  Verb-কে 'কী' দিয়ে প্রশ্ন করলে পাওয়া যায় <strong>Direct Object (মুখ্য কর্ম)</strong> এবং 'কাকে/কার জন্য' দিয়ে প্রশ্ন করলে পাওয়া যায় <strong>Indirect Object (গৌণ কর্ম)</strong>। ব্যক্তি আগে বসলে কোনো Preposition বসে না, কিন্তু বস্তু আগে বসলে 'to' বা 'for' বসে।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Dual Object Simulator */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <ArrowRightLeft className="w-4 h-4" />
                The Dative Shift Principle
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                SVOO vs SVO + Prepositional Variant
              </h2>
            </div>
            <div className="flex gap-2">
              {dativeExamples.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveShiftIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                    activeShiftIndex === idx
                      ? "bg-indigo-600 text-white border-indigo-400"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  Verb: {item.verb}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-sm">
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase">Pattern A: Pure SVOO (No Preposition)</span>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-white">
                "{dativeExamples[activeShiftIndex].svoo}"
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase">Pattern B: SVO + Prepositional Phrase</span>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-white">
                "{dativeExamples[activeShiftIndex].svoPrep}"
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 text-amber-200">
                • Indirect Object: <strong className="text-white">{dativeExamples[activeShiftIndex].io}</strong>
              </div>
              <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-500/30 text-purple-200">
                • Direct Object: <strong className="text-white">{dativeExamples[activeShiftIndex].do}</strong>
              </div>
            </div>

            {showBengali && (
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-300 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>বাংলা নিয়ম:</strong> {dativeExamples[activeShiftIndex].analysisBn}</span>
              </div>
            )}
          </div>
        </div>

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Topic 4 Diagnostic Assessment (10 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 4: Direct vs Indirect Objects — Quick Notes"
          />

          <WordDictionary />

          <Teacher
            note="Remember: The indirect object is the receiver person; the direct object is the entity given. Master their dual placement! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_002_sentence-anatomy-subject-predicate-and-objects/3"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 3 (Simple vs Complete Predicate)</span>
          </a>

          <a
            href="/english-grammar/topic/001_002_sentence-anatomy-subject-predicate-and-objects/5"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 5 (Ditransitive Positioning)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
