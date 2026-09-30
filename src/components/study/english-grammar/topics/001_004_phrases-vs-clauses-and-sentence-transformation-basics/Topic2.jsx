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
  Cpu,
  ShieldCheck
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

export default function Topic2() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);

  const pairComparisons = [
    {
      label: "Time Modification",
      phrase: "during the torrential downpour",
      phraseAnalysis: "Prepositional Phrase (No subject, no finite verb)",
      clause: "while torrential rain was pouring down",
      clauseAnalysis: "Finite Adverbial Clause (Subject: 'torrential rain' | Finite Verb: 'was pouring')",
      analysisBn: "'During the downpour'-এ কোনো Verb নেই (Phrase); কিন্তু 'while rain was pouring'-এ Subject ও Finite Verb রয়েছে (Clause)।"
    },
    {
      label: "Reason / Cause",
      phrase: "owing to his immense dedication",
      phraseAnalysis: "Prepositional Phrase (Non-predicated noun phrase object)",
      clause: "because he was immensely dedicated",
      clauseAnalysis: "Finite Causal Clause (Subject: 'he' | Finite Verb: 'was')",
      analysisBn: "'Owing to his dedication' একটি Phrase; 'because he was dedicated'-এ Subject 'he' এবং Verb 'was' থাকায় এটি Clause।"
    },
    {
      label: "Adjective Description",
      phrase: "a student of exceptional talent",
      phraseAnalysis: "Adjective Prepositional Phrase modifying 'student'",
      clause: "a student who exhibits exceptional talent",
      clauseAnalysis: "Relative Adjective Clause (Subject: 'who' | Finite Verb: 'exhibits')",
      analysisBn: "'Of exceptional talent' একটি Phrase; 'who exhibits talent'-এ 'who' (Subject) ও 'exhibits' (Verb) থাকায় এটি Clause।"
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
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Segment 1 · Foundations
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Module 001_004 · Topic 2
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                What is a Clause? The Subject + Finite Verb Nexus
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Understand the syntactic anatomy of a clause. Learn why a finite verb is the indispensable engine of predication, and how clauses contrast with phrases.
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
                    ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white border-cyan-400/50 shadow-cyan-950/50 ring-2 ring-cyan-500/20"
                    : "bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white"
                }`}
              >
                <Languages className={`w-4 h-4 transition-transform duration-300 ${showBengali ? "rotate-180 text-white" : "text-indigo-400"}`} />
                <span>{showBengali ? "বাংলা ব্যাখ্যা সক্রিয় (Active)" : "বাংলা ব্যাখ্যা দেখুন (Toggle বাংলা)"}</span>
              </button>
            </div>
          </div>

          {showBengali && (
            <div className="mt-6 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-sm flex items-start gap-3 animate-fade-in">
              <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-cyan-300">Clause (উপবাক্য) সম্পর্কিত বাংলা নির্দেশিকা:</p>
                <p className="text-cyan-200/90 text-xs mt-1 leading-relaxed">
                  <strong>Clause</strong> হল একটি বাক্যের অংশ যাতে নিজস্ব একটি <em>Subject (কর্তা)</em> এবং একটি <em>Finite Verb (সমাপিকা ক্রিয়া)</em> থাকা বাধ্যতামূলক। Finite Verb ছাড়া কোনো Clause গঠিত হতে পারে না।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Phrase vs Clause Contrast Matrix */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Side-by-Side: Phrase vs Clause Diagnostics</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Pair Comparisons</span>
          </div>

          {/* Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {pairComparisons.map((pair, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPairIndex(idx)}
                className={`p-3.5 rounded-2xl text-left text-xs font-semibold transition border ${
                  selectedPairIndex === idx
                    ? "bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-950"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="text-[10px] uppercase font-mono opacity-75">Case #{idx + 1}</div>
                <div className="mt-1 font-bold truncate">{pair.label}</div>
              </button>
            ))}
          </div>

          {/* Active Diagnostic Comparison */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-5 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phrase Card */}
              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <span className="px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 text-[11px] font-bold uppercase font-mono">
                  Phrase (No Finite Verb)
                </span>
                <p className="font-mono text-sm text-white pt-2 font-semibold">
                  "{pairComparisons[selectedPairIndex].phrase}"
                </p>
                <p className="text-xs text-rose-200/80">{pairComparisons[selectedPairIndex].phraseAnalysis}</p>
              </div>

              {/* Clause Card */}
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-[11px] font-bold uppercase font-mono">
                  Clause (Subject + Finite Verb)
                </span>
                <p className="font-mono text-sm text-white pt-2 font-semibold">
                  "{pairComparisons[selectedPairIndex].clause}"
                </p>
                <p className="text-xs text-emerald-200/80">{pairComparisons[selectedPairIndex].clauseAnalysis}</p>
              </div>
            </div>

            {showBengali && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-cyan-300 leading-relaxed">
                <strong>বাংলা ব্যাকরণগত বিশ্লেষণ:</strong> {pairComparisons[selectedPairIndex].analysisBn}
              </div>
            )}
          </div>
        </div>

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Topic 2 Diagnostic Clause Assessment (10 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 2: What is a Clause Notes"
          />

          <WordDictionary />

          <Teacher
            note="Spotting the finite verb is your superpower in clause analysis. Find the finite verb, find its subject, and you've found the clause! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_004_phrases-vs-clauses-and-sentence-transformation-basics/1"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 1 (Phrase Types)</span>
          </a>

          <a
            href="/english-grammar/topic/001_004_phrases-vs-clauses-and-sentence-transformation-basics/3"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 3 (Independent vs Subordinate Clauses)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
