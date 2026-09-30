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
  Award,
  GitBranch,
  ShieldCheck,
  MessageSquare,
  GraduationCap,
  User
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

export default function Topic9() {
  const [showBengali, setShowBengali] = useState(false);

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
                  Module 001_002 · Topic 9 (Capstone)
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Classroom Dialogue & Visual Sentence Tree Diagnostics
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Step into the mentoring lab with Sukanta Sir. Deconstruct hierarchical syntactic sentence trees and master the diagnostic resolution of high-frequency exam traps.
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
                <p className="font-semibold text-emerald-300">মডিউল ২ চূড়ান্ত সিনট্যাক্স ল্যাব নির্দেশিকা:</p>
                <p className="text-emerald-200/90 text-xs mt-1 leading-relaxed">
                  মডিউল 001_002-এর সমাপনী এই টপিকে সেন্টেন্স ট্রি ডায়াগ্রামের মাধ্যমে বাক্যের অভ্যন্তরীণ হায়ারার্কি এবং শিক্ষক-শিক্ষার্থীর বাস্তব প্রশ্নোত্তর নিয়ে আলোচনা করা হয়েছে।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Visual Tree Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <GitBranch className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Hierarchical Sentence Tree Architecture</h2>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-200 space-y-3 overflow-x-auto">
            <div className="text-center font-bold text-amber-300 pb-2 border-b border-slate-800">
              S [SENTENCE CLAUSE]
            </div>
            <div className="grid grid-cols-2 gap-6 text-center">
              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 space-y-2">
                <span className="font-bold text-blue-300 block">NP [SUBJECT]</span>
                <p className="text-white text-xs">"The young scholar from Barrackpore"</p>
                <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  Head Noun: <strong>scholar</strong>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                <span className="font-bold text-emerald-300 block">VP [PREDICATE]</span>
                <p className="text-white text-xs">"developed a brilliant web application"</p>
                <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  Verb: <strong>developed</strong> | DO: <strong>application</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Classroom Dialogue */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <MessageSquare className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Socratic Dialogue: Sukanta Sir & Barrackpore Cohort</h2>
          </div>

          <div className="space-y-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                <User className="w-3.5 h-3.5" />
                <span>Swadeep (Student):</span>
              </div>
              <p className="text-slate-200">
                "Sir, why is <em>'The coffee tastes bitterly'</em> wrong when coffee genuinely tastes bitter?"
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-1 ml-4 sm:ml-8">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <GraduationCap className="w-4 h-4" />
                <span>Sukanta Sir (Mentor):</span>
              </div>
              <p className="text-slate-100">
                "Because coffee is not actively tasting with a physical tongue, Swadeep! <em>'Tastes'</em> here is a <strong>Sensory Copular Verb</strong>. Linking verbs require a Subject Complement Adjective describing the coffee's quality: <em>'The coffee tastes <strong>bitter</strong>'</em> (SVC pattern)!"
              </p>
            </div>
          </div>
        </div>

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Module 001_002 Diagnostic Assessment (10 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Module 001_002: Sentence Tree & Diagnostics — Quick Notes"
          />

          <WordDictionary />

          <Teacher
            note="Hearty congratulations on mastering all 10 topics of Module 001_002! You have acquired the structural blueprint of English syntax. Ready for Module 001_003! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_002_sentence-anatomy-subject-predicate-and-objects/8"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 8 (The 7 Sentence Patterns)</span>
          </a>

          <a
            href="/english-grammar/module/001_003_classification-of-sentences-by-purpose-and-mood"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-950 transition"
          >
            <span>Proceed to Module 001_003</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
