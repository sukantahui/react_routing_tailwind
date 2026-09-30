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
  GitBranch,
  Split,
  MessageSquare
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

export default function Topic8() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedPatternIndex, setSelectedPatternIndex] = useState(0);

  const patterns = [
    {
      code: "SV",
      title: "Subject + Intransitive Verb",
      example: "The express train arrived.",
      components: [
        { label: "Subject", text: "The express train", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { label: "Intransitive Verb", text: "arrived", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" }
      ],
      descBn: "'arrived' একটি Intransitive Verb, যা সম্পূর্ণ অর্থ প্রকাশের জন্য কোনো Object দাবি করে না।"
    },
    {
      code: "SVO",
      title: "Subject + Transitive Verb + Direct Object",
      example: "Swadeep developed a web application.",
      components: [
        { label: "Subject", text: "Swadeep", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { label: "Transitive Verb", text: "developed", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { label: "Direct Object", text: "a web application", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" }
      ],
      descBn: "'developed' Transitive Verb-এর কাজটি সরাসরি 'a web application' Direct Object-এর ওপর প্রযুক্ত হয়েছে।"
    },
    {
      code: "SVOO",
      title: "Subject + Ditransitive Verb + Indirect Object + Direct Object",
      example: "Sukanta Sir taught Tuhina English Grammar.",
      components: [
        { label: "Subject", text: "Sukanta Sir", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { label: "Ditransitive Verb", text: "taught", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { label: "Indirect Object", text: "Tuhina", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
        { label: "Direct Object", text: "English Grammar", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" }
      ],
      descBn: "Ditransitive Verb দুটি Object নেয়: 'Tuhina' হলো Indirect Object (ব্যক্তি) এবং 'English Grammar' হলো Direct Object (বিষয়)।"
    },
    {
      code: "SVC",
      title: "Subject + Linking Verb + Subject Complement",
      example: "Abhronila is an exceptional researcher.",
      components: [
        { label: "Subject", text: "Abhronila", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { label: "Linking Verb", text: "is", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { label: "Subject Complement", text: "an exceptional researcher", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" }
      ],
      descBn: "এখানে কোনো কাজ হচ্ছে না; 'is' Linking Verb Subject-এর পরিচয় পূর্ণ করেছে (Abhronila == researcher)।"
    },
    {
      code: "SVOC",
      title: "Subject + Complex-Transitive Verb + Direct Object + Object Complement",
      example: "The committee appointed Debangshu team leader.",
      components: [
        { label: "Subject", text: "The committee", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { label: "Complex-Transitive Verb", text: "appointed", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { label: "Direct Object", text: "Debangshu", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
        { label: "Object Complement", text: "team leader", color: "bg-pink-500/20 text-pink-300 border-pink-500/30" }
      ],
      descBn: "'team leader' পদটি Direct Object 'Debangshu'-এর নতুন পদমর্যাদা প্রকাশ করে Object Complement হিসেবে বসেছে।"
    },
    {
      code: "SVA",
      title: "Subject + Intransitive Verb + Obligatory Adverbial",
      example: "The coaching center is located in Barrackpore.",
      components: [
        { label: "Subject", text: "The coaching center", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { label: "Verb", text: "is located", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { label: "Obligatory Adverbial", text: "in Barrackpore", color: "bg-teal-500/20 text-teal-300 border-teal-500/30" }
      ],
      descBn: "'in Barrackpore' স্থান নির্দেশক Adverbial ছাড়া বাক্যটির অর্থ অসম্পূর্ণ থেকে যায়, তাই এটি Obligatory Adverbial।"
    },
    {
      code: "SVOA",
      title: "Subject + Transitive Verb + Direct Object + Obligatory Adverbial",
      example: "He placed the reference books on the study table.",
      components: [
        { label: "Subject", text: "He", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { label: "Transitive Verb", text: "placed", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { label: "Direct Object", text: "the reference books", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
        { label: "Obligatory Adverbial", text: "on the study table", color: "bg-teal-500/20 text-teal-300 border-teal-500/30" }
      ],
      descBn: "'placed' Verb-এর পর Direct Object এবং স্থান নির্দেশক Adverbial উভয়েই ব্যাকরণগতভাবে বাধ্যতামূলক।"
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
                  Module 001_002 · Topic 8
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                The Seven Fundamental English Sentence Patterns
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                The complete syntactic taxonomy of English clauses: SV, SVO, SVOO, SVC, SVOC, SVA, and SVOA. Every grammatical declarative sentence conforms to one of these blueprints.
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
                <p className="font-semibold text-emerald-300">৭টি মৌলিক বাক্যের প্যাটার্ন নির্দেশিকা:</p>
                <p className="text-emerald-200/90 text-xs mt-1 leading-relaxed">
                  ইংরেজি ভাষার প্রতিটি বাক্য এই ৭টি মৌলিক কাঠামোর কোনো একটির অন্তর্ভুক্ত। এই প্যাটার্নগুলো আয়ত্ত করলে ইংরেজি বাক্য গঠন ও অনুবাদে আর কখনো দ্বিধা থাকবে না।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 7 Patterns Explorer */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-wrap gap-2">
            {patterns.map((pat, idx) => (
              <button
                key={pat.code}
                type="button"
                onClick={() => setSelectedPatternIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 border ${
                  selectedPatternIndex === idx
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-950 scale-105"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                Pattern {idx + 1}: {pat.code}
              </button>
            ))}
          </div>

          {/* Active Card */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-mono">
                {patterns[selectedPatternIndex].code}
              </span>
              {patterns[selectedPatternIndex].title}
            </h3>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {patterns[selectedPatternIndex].components.map((comp, cI) => (
                <div key={cI} className={`p-3 rounded-xl border flex flex-col gap-1 ${comp.color}`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">{comp.label}</span>
                  <span className="text-sm font-bold font-mono text-white">"{comp.text}"</span>
                </div>
              ))}
            </div>

            {showBengali && (
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-200 text-xs animate-fade-in flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>বাংলা বিশ্লেষণ:</strong> {patterns[selectedPatternIndex].descBn}</span>
              </div>
            )}
          </div>
        </div>

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Topic 8 Diagnostic Assessment (10 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 8: The 7 Fundamental Sentence Patterns — Quick Notes"
          />

          <WordDictionary />

          <Teacher
            note="These 7 sentence blueprints are the periodic table of English syntax. Master them, and no sentence structure in literature can confound you! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_002_sentence-anatomy-subject-predicate-and-objects/7"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 7 (Object Complements)</span>
          </a>

          <a
            href="/english-grammar/topic/001_002_sentence-anatomy-subject-predicate-and-objects/9"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 9 (Classroom Dialogue & Diagnostics)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
