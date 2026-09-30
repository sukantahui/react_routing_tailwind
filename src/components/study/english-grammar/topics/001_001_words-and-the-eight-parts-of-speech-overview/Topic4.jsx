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
  Sliders,
  Sparkle,
  Compass,
  MessageSquare,
  Eye
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

export default function Topic4() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeTab, setActiveTab] = useState("adjectives");

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
                  Module 001_001 · Topic 4
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                High-Level Overview of Adjectives and Adverbs
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                The modifying powerhouse of the English language. Understand the fine division between qualifying nouns (Adjectives) and modifying actions, states, and degrees (Adverbs).
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
                  <strong>Adjective (নাম-বিশেষণ)</strong> সর্বদা কোনো Noun বা Pronoun-এর দোষ, গুণ বা সংখ্যা প্রকাশ করে। অন্যদিকে <strong>Adverb (ভাব-বিশেষণ)</strong> কোনো Verb-এর কাজ কীভাবে, কখন বা কোথায় হচ্ছে তা বোঝায়, অথবা কোনো Adjective/Adverb-এর মাত্রা নির্ধারণ করে।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Tab Selector */}
        <div className="flex gap-3 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab("adjectives")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "adjectives"
                ? "bg-amber-600 text-white shadow-lg shadow-amber-950 border border-amber-400"
                : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
            }`}
          >
            <Sparkle className="w-4 h-4" />
            <span>Adjectives (Nominal Qualifiers)</span>
          </button>
          <button
            onClick={() => setActiveTab("adverbs")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "adverbs"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-950 border border-purple-400"
                : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Adverbs (Verbal & Degree Modifiers)</span>
          </button>
        </div>

        {/* Tab Panels */}
        {activeTab === "adjectives" ? (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-4">
                <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold font-mono">
                  Position 1: Attributive
                </span>
                <h3 className="text-lg font-bold text-white">Directly Precedes the Noun</h3>
                <p className="text-slate-300 text-sm">
                  The adjective sits immediately in front of its nominal head (e.g., <em>"A brilliant scholar from Barrackpore"</em>).
                </p>
                {showBengali && (
                  <p className="text-xs text-emerald-300 border-t border-slate-800 pt-2">
                    Noun-এর পূর্বে বসে সরাসরি গুণ প্রকাশ করে।
                  </p>
                )}
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-4">
                <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold font-mono">
                  Position 2: Predicative
                </span>
                <h3 className="text-lg font-bold text-white">Follows a Linking Verb</h3>
                <p className="text-slate-300 text-sm">
                  The adjective connects back to the subject via a copula (e.g., <em>"The scholar is exceptionally brilliant"</em>).
                </p>
                {showBengali && (
                  <p className="text-xs text-emerald-300 border-t border-slate-800 pt-2">
                    Linking Verb (is, looks, smells)-এর পর বসে Subject Complement হিসেবে কাজ করে।
                  </p>
                )}
              </div>
            </div>

            {/* Special Invariant Box */}
            <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-300">PREDICATIVE-ONLY ADJECTIVES INVARIANT:</span>
              <p className="text-sm text-slate-200">
                Certain 'a-' prefixed adjectives can NEVER appear attributively: <em>afraid, asleep, alive, awake, aware, alone, glad</em>.
                <br />
                <span className="text-rose-300 font-mono text-xs">❌ "An afraid boy ran away."</span> &rarr;{" "}
                <span className="text-emerald-300 font-mono text-xs">✔️ "The boy was afraid and ran away."</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-4">
              <h3 className="text-lg font-bold text-purple-300">The Royal M-P-T Adverb Sequence</h3>
              <p className="text-sm text-slate-300">
                When a sentence contains multiple adverbial modifiers, English strictly mandates the order:
              </p>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs flex flex-wrap gap-4 text-purple-200">
                <span className="p-2 rounded bg-purple-900/40 border border-purple-500/30">1. Manner (How)</span>
                <span>&rarr;</span>
                <span className="p-2 rounded bg-purple-900/40 border border-purple-500/30">2. Place (Where)</span>
                <span>&rarr;</span>
                <span className="p-2 rounded bg-purple-900/40 border border-purple-500/30">3. Time (When)</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Example: "Swadeep spoke [fluently - M] [in the seminar - P] [yesterday - T]."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="font-bold text-white block">Adverb of Degree</span>
                <p className="text-slate-300">Modifies adjectives or adverbs: <em>very, extremely, completely, slightly, exceptionally</em>.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="font-bold text-white block">Adverb of Frequency</span>
                <p className="text-slate-300">Precedes main verb or follows Be-verb: <em>always, usually, seldom, rarely, never</em>.</p>
              </div>
            </div>
          </div>
        )}

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Topic 4 Diagnostic Assessment (10 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 4: Adjectives & Adverbs — Quick Notes"
          />

          <WordDictionary />

          <Teacher
            note="Adjectives paint the portrait of nouns; Adverbs choreograph the motion of verbs. Keep their boundaries crystal clear! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_001_words-and-the-eight-parts-of-speech-overview/3"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 3 (Nouns, Pronouns, Verbs)</span>
          </a>

          <a
            href="/english-grammar/topic/001_001_words-and-the-eight-parts-of-speech-overview/5"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 5 (Prepositions, Conjunctions, Interjections)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
