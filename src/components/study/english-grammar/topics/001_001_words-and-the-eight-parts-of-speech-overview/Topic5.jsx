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
  Link,
  Flame,
  Compass,
  MessageSquare,
  ShieldCheck
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

export default function Topic5() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedSection, setSelectedSection] = useState("prepositions");

  const fanboys = [
    { letter: "F", word: "For", role: "Reason / Cause", example: "He persevered, for he had unwavering faith." },
    { letter: "A", word: "And", role: "Addition / Harmony", example: "Swadeep coded the app, and Debangshu tested it." },
    { letter: "N", word: "Nor", role: "Negative Continuation", example: "He did not complain, nor did he surrender." },
    { letter: "B", word: "But", role: "Direct Contrast", example: "The problem was complex, but she solved it." },
    { letter: "O", word: "Or", role: "Alternative Choice", example: "Submit your thesis today, or request an extension." },
    { letter: "Y", word: "Yet", role: "Unexpected Concession", example: "He was exhausted, yet he finished the lecture." },
    { letter: "S", word: "So", role: "Logical Result", example: "The storm intensified, so the class moved indoors." }
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
                  Module 001_001 · Topic 5
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Overview of Prepositions, Conjunctions & Interjections
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                The relational glue and emotional markers of English syntax. Master how prepositions link nominals, conjunctions synthesize clauses, and interjections convey raw emotion.
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
                  <strong>Preposition (পদান্বয়ী অব্যয়)</strong> শব্দের আগে বসে স্থান বা কাল নির্দেশ করে; <strong>Conjunction (সংযোজক অব্যয়)</strong> দুটি বাক্য বা বাক্যখণ্ডকে যুক্ত করে; আর <strong>Interjection (আবেগসূচক অব্যয়)</strong> বাক্যের কাঠামোর বাইরে থেকে তীব্র মানসিক আবেগ বা বিস্ময় প্রকাশ করে।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 3 Section Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => setSelectedSection("prepositions")}
            className={`p-5 rounded-2xl text-left border transition-all ${
              selectedSection === "prepositions"
                ? "bg-rose-950/50 border-rose-500/60 ring-2 ring-rose-500/20 shadow-xl"
                : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-rose-400">CONNECTIVE 1</span>
              <Compass className="w-4 h-4 text-rose-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Prepositions (Relators)</h3>
            <p className="text-xs text-slate-400 mt-1">Spatial, temporal & directional placement.</p>
          </button>

          <button
            onClick={() => setSelectedSection("conjunctions")}
            className={`p-5 rounded-2xl text-left border transition-all ${
              selectedSection === "conjunctions"
                ? "bg-cyan-950/50 border-cyan-500/60 ring-2 ring-cyan-500/20 shadow-xl"
                : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-cyan-400">CONNECTIVE 2</span>
              <Link className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Conjunctions (Binders)</h3>
            <p className="text-xs text-slate-400 mt-1">FANBOYS, Subordinators & Correlatives.</p>
          </button>

          <button
            onClick={() => setSelectedSection("interjections")}
            className={`p-5 rounded-2xl text-left border transition-all ${
              selectedSection === "interjections"
                ? "bg-amber-950/50 border-amber-500/60 ring-2 ring-amber-500/20 shadow-xl"
                : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-amber-400">CONNECTIVE 3</span>
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Interjections (Emotions)</h3>
            <p className="text-xs text-slate-400 mt-1">Independent emotional outbursts.</p>
          </button>
        </div>

        {/* Dynamic Section Content */}
        {selectedSection === "conjunctions" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/30 space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-cyan-300">The 7 Coordinating Conjunctions: FANBOYS Matrix</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
              {fanboys.map((item) => (
                <div key={item.word} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-cyan-400 font-bold">
                    <span>{item.letter} = {item.word}</span>
                    <span className="text-[10px] text-slate-500">{item.role}</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">"{item.example}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedSection === "prepositions" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-rose-500/30 space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-rose-300">Prepositional Relations & Pronoun Objective Case</h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-sm">
              <span className="font-bold text-white block">The Objective Pronoun Invariant</span>
              <p className="text-slate-300 text-xs">
                Pronouns functioning as objects of prepositions MUST be in the objective case:
                <br />
                <span className="text-rose-300 font-mono">❌ "Divide the sweets between you and I."</span> &rarr;{" "}
                <span className="text-emerald-300 font-mono">✔️ "Divide the sweets between you and me."</span>
              </p>
            </div>
          </div>
        )}

        {selectedSection === "interjections" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-amber-500/30 space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-amber-300">Interjections: Grammatically Autonomous Emotives</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-amber-400 font-bold block text-sm">Alas!</span>
                <span className="text-slate-400">Grief / Sorrow</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-emerald-400 font-bold block text-sm">Hurrah!</span>
                <span className="text-slate-400">Joy / Triumph</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-blue-400 font-bold block text-sm">Bravo!</span>
                <span className="text-slate-400">Praise / Approval</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-purple-400 font-bold block text-sm">Hush!</span>
                <span className="text-slate-400">Silence / Warning</span>
              </div>
            </div>
          </div>
        )}

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Topic 5 Diagnostic Assessment (10 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 5: Prepositions, Conjunctions & Interjections — Quick Notes"
          />

          <WordDictionary />

          <Teacher
            note="Prepositions build bridges between words; Conjunctions build highways between clauses! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_001_words-and-the-eight-parts-of-speech-overview/4"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 4 (Adjectives & Adverbs)</span>
          </a>

          <a
            href="/english-grammar/topic/001_001_words-and-the-eight-parts-of-speech-overview/6"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 6 (Classroom Dialogue)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
