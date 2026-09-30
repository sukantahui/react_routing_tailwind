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
  Equal,
  Sparkle,
  MessageSquare,
  ShieldCheck
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

export default function Topic6() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState(0);

  const tests = [
    {
      sentence: "The surgeon examined the patient.",
      type: "Direct Object (SVO Pattern)",
      formula: "Subject ≠ Entity",
      proof: "The surgeon and the patient are TWO separate living entities. An action is transferred.",
      passive: "Possible ('The patient was examined by the surgeon')",
      proofBn: "সার্জন ও রোগী দুজন সম্পূর্ণ আলাদা ব্যক্তি (Subject ≠ Object), তাই এটি Direct Object।"
    },
    {
      sentence: "The patient became impatient.",
      type: "Subject Complement (SVC Pattern)",
      formula: "Subject == Quality / State",
      proof: "'impatient' describes the psychological condition of the exact same subject.",
      passive: "IMPOSSIBLE (No direct object exists to become passive subject)",
      proofBn: "'impatient' শব্দটি রোগীর নিজস্ব মানসিক অবস্থা নির্দেশ করছে (Subject == Complement)।"
    },
    {
      sentence: "Abhronila is an exceptional researcher.",
      type: "Subject Complement (Predicate Noun)",
      formula: "Subject == Identity",
      proof: "'Abhronila' and 'researcher' refer to the exact same human being.",
      passive: "IMPOSSIBLE",
      proofBn: "'Abhronila' এবং 'researcher' একই সত্তা, তাই এটি Predicate Noun Subject Complement।"
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
                  Module 001_002 · Topic 6
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Subject Complements & Linking (Copular) Verbs
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Master the diagnostic Equality Test ($Subject = Complement$). Distinguish between predicate nouns and predicate adjectives following stative, inchoative, and sensory verbs.
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
                  Linking Verb কোনো কাজ করে না; এটি Subject-এর পরিচয় বা গুণ প্রকাশক শব্দের সাথে সংযোগ স্থাপন করে। Subject ও Complement একই ব্যক্তি বা অবস্থা বোঝায় ($Subject = Complement$), তাই এর কোনো Passive Voice হয় না।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* The Master Equality Diagnostic Matrix */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Equal className="w-4 h-4" />
                Diagnostic Equality Workbench
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Direct Object vs Subject Complement Proof
              </h2>
            </div>
            <div className="flex gap-2">
              {tests.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTestId(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                    selectedTestId === idx
                      ? "bg-indigo-600 text-white border-indigo-400"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  Proof {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-indigo-300 font-bold">"{tests[selectedTestId].sentence}"</span>
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 text-indigo-200 border border-indigo-500/30">
                Formula: {tests[selectedTestId].formula}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <span className="text-slate-500 block mb-1">Syntactic Classification:</span>
                <strong className="text-white">{tests[selectedTestId].type}</strong>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <span className="text-slate-500 block mb-1">Passive Voice Viability:</span>
                <strong className="text-amber-300">{tests[selectedTestId].passive}</strong>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              <strong>Grammatical Rationale:</strong> {tests[selectedTestId].proof}
            </p>

            {showBengali && (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-300 flex items-start gap-2 font-sans">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>বাংলা যুক্তি:</strong> {tests[selectedTestId].proofBn}</span>
              </div>
            )}
          </div>
        </div>

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Topic 6 Diagnostic Assessment (10 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 6: Subject Complements & Linking Verbs — Quick Notes"
          />

          <WordDictionary />

          <Teacher
            note="When you master the Equality Test, you will never confuse a direct object with a subject complement again! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_002_sentence-anatomy-subject-predicate-and-objects/5"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 5 (Ditransitive Positioning)</span>
          </a>

          <a
            href="/english-grammar/topic/001_002_sentence-anatomy-subject-predicate-and-objects/7"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 7 (Object Complements)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
