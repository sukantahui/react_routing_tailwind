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
  Activity,
  UserCheck,
  Tag,
  MessageSquare
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

export default function Topic3() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState("nouns");

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
                  Module 001_001 · Topic 3
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                High-Level Overview of Nouns, Pronouns, and Verbs
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                The primary architectural triad of English syntax. Discover how nominal entities (Nouns & Pronouns) pair with dynamic predicate engines (Verbs) to generate complete clauses.
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
                  যেকোনো ইংরেজি বাক্যের প্রাণকেন্দ্র হলো এই তিনটি পদ: <strong>Noun (বিশেষ্য)</strong> ও <strong>Pronoun (সর্বনাম)</strong> বাক্যের কর্তা বা কর্ম হিসেবে বসে, আর <strong>Verb (ক্রিয়া)</strong> ছাড়া কোনো পূর্ণাঙ্গ Clause গঠিত হতে পারে না।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 3 Pillars Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => setSelectedPillar("nouns")}
            className={`p-5 rounded-2xl text-left border transition-all ${
              selectedPillar === "nouns"
                ? "bg-blue-950/50 border-blue-500/60 ring-2 ring-blue-500/20 shadow-xl"
                : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-blue-400">PILLAR 1</span>
              <Tag className="w-4 h-4 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Nouns (Nominal Anchors)</h3>
            <p className="text-xs text-slate-400 mt-1">Naming entities, classes, substances & concepts.</p>
          </button>

          <button
            onClick={() => setSelectedPillar("pronouns")}
            className={`p-5 rounded-2xl text-left border transition-all ${
              selectedPillar === "pronouns"
                ? "bg-purple-950/50 border-purple-500/60 ring-2 ring-purple-500/20 shadow-xl"
                : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-purple-400">PILLAR 2</span>
              <UserCheck className="w-4 h-4 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Pronouns (Substitutes)</h3>
            <p className="text-xs text-slate-400 mt-1">Deictic pointers preserving clause cohesion.</p>
          </button>

          <button
            onClick={() => setSelectedPillar("verbs")}
            className={`p-5 rounded-2xl text-left border transition-all ${
              selectedPillar === "verbs"
                ? "bg-emerald-950/50 border-emerald-500/60 ring-2 ring-emerald-500/20 shadow-xl"
                : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-emerald-400">PILLAR 3</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Verbs (Predicate Engine)</h3>
            <p className="text-xs text-slate-400 mt-1">Actions, tenses, states & modal operators.</p>
          </button>
        </div>

        {/* Pillar Details Card */}
        {selectedPillar === "nouns" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-blue-500/30 space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-blue-300">The 5 Noun Families & Syntactic Roles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-white block">1. Proper Nouns vs Common Nouns</span>
                <p className="text-slate-300 text-xs">
                  Specific individuals (<em>Kolkata, Barrackpore</em>) vs universal categories (<em>city, institute</em>).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-white block">2. Collective & Material Nouns</span>
                <p className="text-slate-300 text-xs">
                  Unitary groups (<em>committee, jury</em>) and raw matter/substances (<em>gold, water, iron</em>).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-white block">3. Abstract Nouns</span>
                <p className="text-slate-300 text-xs">
                  Intangible ideas, qualities, and emotional states (<em>integrity, wisdom, courage</em>).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-white block">4. Syntactic Duty Matrix</span>
                <p className="text-slate-300 text-xs">
                  Nouns act as <strong>Subject</strong>, <strong>Direct Object</strong>, <strong>Indirect Object</strong>, <strong>Subject Complement</strong>, and <strong>Prepositional Object</strong>.
                </p>
              </div>
            </div>
            {showBengali && (
              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-blue-200">
                <strong>বাংলা সারসংক্ষেপ:</strong> Noun হলো বাক্যের মূল বিষয়বস্তু। কোনো বাক্য শুরু করতে বা কার ওপর কাজ হচ্ছে তা বোঝাতে Noun অত্যাবশ্যক।
              </div>
            )}
          </div>
        )}

        {selectedPillar === "pronouns" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-purple-500/30 space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-purple-300">Pronoun Types & Case Harmonization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-white block">1. Personal & Possessive Case</span>
                <p className="text-slate-300 text-xs">
                  Nominative (<em>I, he, they</em>), Objective (<em>me, him, them</em>), Possessive (<em>mine, hers, theirs</em>).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-white block">2. Relative & Interrogative Pronouns</span>
                <p className="text-slate-300 text-xs">
                  Linking subordinate clauses (<em>who, whom, which, that</em>) and querying entities (<em>what, which, who</em>).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-white block">3. Reflexive vs Emphatic Pronouns</span>
                <p className="text-slate-300 text-xs">
                  Self-directed actions (<em>He hurt himself</em>) vs emphasis (<em>The mentor himself checked the code</em>).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-white block">4. Indefinite & Distributive Pronouns</span>
                <p className="text-slate-300 text-xs">
                  General non-specific reference (<em>everyone, someone, nobody, each, either</em>).
                </p>
              </div>
            </div>
            {showBengali && (
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
                <strong>বাংলা সারসংক্ষেপ:</strong> বারবার Noun-এর নাম না বলে বাক্যকে মার্জিত ও সংক্ষেপ করার জন্য Pronoun ব্যবহৃত হয়।
              </div>
            )}
          </div>
        )}

        {selectedPillar === "verbs" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/30 space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-emerald-300">Verbs: Finite, Transitive & Auxiliary Mechanics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-white block">1. Finite vs Non-Finite</span>
                <p className="text-slate-300 text-xs">
                  Finite verbs carry tense/person/number; Non-finites (<em>Infinitives, Gerunds, Participles</em>) are untensed.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-white block">2. Transitive vs Intransitive vs Linking</span>
                <p className="text-slate-300 text-xs">
                  Taking Direct Objects (<em>built</em>), Complete in itself (<em>slept</em>), or Copular state (<em>is, looks</em>).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-white block">3. Primary Auxiliaries (Be, Do, Have)</span>
                <p className="text-slate-300 text-xs">
                  Form continuous aspects, perfect tenses, negative questions, and passive voice.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-white block">4. Modal Auxiliaries</span>
                <p className="text-slate-300 text-xs">
                  Express ability, obligation, permission, and probability (<em>can, must, should, might</em>).
                </p>
              </div>
            </div>
            {showBengali && (
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-200">
                <strong>বাংলা সারসংক্ষেপ:</strong> Verb হলো বাক্যের ইঞ্জিন। Finite Verb ছাড়া কোনো Independent Clause তৈরি হতে পারে না।
              </div>
            )}
          </div>
        )}

        {/* Auxiliary Components */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Topic 3 Diagnostic Assessment (10 Questions)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 3: Overview of Nouns, Pronouns & Verbs — Quick Notes"
          />

          <WordDictionary />

          <Teacher
            note="Every English sentence is an equation between nominal actors (Nouns/Pronouns) and verbal actions (Verbs). Master their concord, and your writing will be unassailable! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_001_words-and-the-eight-parts-of-speech-overview/2"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 2 (Form vs Function)</span>
          </a>

          <a
            href="/english-grammar/topic/001_001_words-and-the-eight-parts-of-speech-overview/4"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 4 (Adjectives & Adverbs)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
