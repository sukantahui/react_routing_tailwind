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
  Split,
  Compass,
  MessageSquare,
  ShieldCheck
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

export default function Topic1() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);

  const partitionExamples = [
    {
      title: "Academic Complex Sentence",
      subject: "The dedicated young software engineering student from Barrackpore",
      predicate: "has been developing an innovative web application in the laboratory",
      simpleSubject: "student",
      simplePredicate: "has been developing",
      analysisBn: "Complete Subject-এ মূল Noun 'student'-এর সাথে Determiner ও Adjective যুক্ত আছে; Complete Predicate-এ Finite Verb 'has been developing'-এর সাথে Direct Object ও স্থানিক Adverbial রয়েছে।"
    },
    {
      title: "Inverted Dramatic Sentence",
      subject: "the anxious students of the morning batch",
      predicate: "Into the computer laboratory rushed",
      simpleSubject: "students",
      simplePredicate: "rushed",
      analysisBn: "এখানে নাটকীয় বর্ণনার জন্য Predicate অংশটি আগে বসেছে, কিন্তু কাজের আসল কর্তা হলো 'the anxious students'।"
    },
    {
      title: "Introductory 'There' Sentence",
      subject: "five high-performance workstation computers",
      predicate: "are located in the research facility",
      simpleSubject: "computers",
      simplePredicate: "are located",
      analysisBn: "'There' কোনো প্রকৃত Subject নয়; আসল Subject হলো 'computers', যার কারণে Plural Verb 'are' বসেছে।"
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
                  Module 001_002 · Topic 1
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                The Two Structural Halves: Complete Subject vs Complete Predicate
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Partition every English sentence cleanly into who or what is performing the action (Subject) and what is asserted or done (Predicate).
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
                  একটি সম্পূর্ণ বাক্যের দুটি অংশ: <strong>Subject (উদ্দেশ্য/কর্তা)</strong> অর্থাৎ যার সম্পর্কে কিছু বলা হচ্ছে, এবং <strong>Predicate (বিধেয়)</strong> অর্থাৎ Subject সম্পর্কে যা কিছু বলা হচ্ছে (যার মধ্যে Finite Verb থাকা বাধ্যতামূলক)।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Partition Explorer */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Split className="w-4 h-4" />
                Sentence Partition Workbench
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Visual Dual-Half Deconstruction
              </h2>
            </div>
            <div className="flex gap-2">
              {partitionExamples.map((ex, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedExampleIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                    selectedExampleIndex === idx
                      ? "bg-indigo-600 text-white border-indigo-400"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  Example {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {partitionExamples[selectedExampleIndex].title}
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/40 space-y-2">
                <span className="text-xs font-bold font-mono text-blue-300 uppercase tracking-wider">
                  COMPLETE SUBJECT (THEME)
                </span>
                <p className="text-sm font-semibold text-white font-mono">
                  "{partitionExamples[selectedExampleIndex].subject}"
                </p>
                <div className="pt-2 border-t border-blue-900/40 text-xs text-blue-200/80">
                  • Simple Subject: <strong className="text-white">{partitionExamples[selectedExampleIndex].simpleSubject}</strong>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
                <span className="text-xs font-bold font-mono text-emerald-300 uppercase tracking-wider">
                  COMPLETE PREDICATE (RHEME)
                </span>
                <p className="text-sm font-semibold text-white font-mono">
                  "{partitionExamples[selectedExampleIndex].predicate}"
                </p>
                <div className="pt-2 border-t border-emerald-900/40 text-xs text-emerald-200/80">
                  • Simple Predicate: <strong className="text-white">{partitionExamples[selectedExampleIndex].simplePredicate}</strong>
                </div>
              </div>
            </div>

            {showBengali && (
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-300 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>বাংলা বিশ্লেষণ:</strong> {partitionExamples[selectedExampleIndex].analysisBn}</span>
              </div>
            )}
          </div>
        </div>

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Topic 1 Diagnostic Assessment (10 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 1: Complete Subject vs Complete Predicate — Quick Notes"
          />

          <WordDictionary />

          <Teacher
            note="Partitioning the subject from the predicate is the foundational diagnostic tool that cures sentence fragments forever! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_002_sentence-anatomy-subject-predicate-and-objects/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 0 (Sentence Definition)</span>
          </a>

          <a
            href="/english-grammar/topic/001_002_sentence-anatomy-subject-predicate-and-objects/2"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 2 (Simple vs Compound Subjects)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
