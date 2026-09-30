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
  MessageSquare,
  User,
  GraduationCap,
  HelpCircle as QuestionIcon
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

export default function Topic6() {
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
                  Module 001_001 · Topic 6
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Classroom Dialogue: Mentor Sukanta Sir & Students
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Step inside the Barrackpore seminar hall. Experience how Mentor Sukanta Sir dissects real student misconceptions, flat adverb traps, and word-class boundaries.
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
                <p className="font-semibold text-emerald-300">বাংলা মাধ্যম শিক্ষার্থীদের জন্য শ্রেণীকক্ষের প্রশ্নোত্তর:</p>
                <p className="text-emerald-200/90 text-xs mt-1 leading-relaxed">
                  ব্যারাকপুরের ক্লাসরুমে শিক্ষক ও শিক্ষার্থীদের আলোচনার মাধ্যমে 'fastly' বনাম 'fast', 'friendly' কেন Adjective, এবং 'before'-এর দ্বৈত রূপের মতো বিভ্রান্তিকর প্রশ্নগুলোর বাস্তব সমাধান উপস্থাপন করা হয়েছে।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Dialogue Stream */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <MessageSquare className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Live Classroom Socratic Dialogue</h2>
          </div>

          {/* Dialogue 1 */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                <User className="w-3.5 h-3.5" />
                <span>Swadeep (Student):</span>
              </div>
              <p className="text-slate-200 text-sm">
                "Sir, why is <em>'He ran fastly'</em> considered wrong when 'slowly', 'quickly', and 'bravely' all take '-ly'?"
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-1.5 ml-4 sm:ml-8">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <GraduationCap className="w-4 h-4" />
                <span>Sukanta Sir (Mentor):</span>
              </div>
              <p className="text-slate-100 text-sm">
                "Excellent observation, Swadeep! English possesses a group of historical <strong>flat adverbs</strong> that share the exact same spelling as their adjective counterparts. <em>'Fast'</em> is one of them. We say <em>'a fast train'</em> (Adjective) and <em>'he ran fast'</em> (Adverb). The form <em>'fastly'</em> never existed in English lexicography. Memorize this invariant: <strong>fast $\rightarrow$ fast</strong>."
              </p>
              {showBengali && (
                <p className="text-xs text-emerald-300 border-t border-indigo-900/50 pt-2 mt-1">
                  বাংলা টিপস: 'Fast'-এর কোনো '-ly' রূপ নেই। Adjective ও Adverb উভয় ক্ষেত্রেই 'fast' বসে।
                </p>
              )}
            </div>
          </div>

          {/* Dialogue 2 */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
                <User className="w-3.5 h-3.5" />
                <span>Tuhina (Student):</span>
              </div>
              <p className="text-slate-200 text-sm">
                "Sir, what about <em>'friendly'</em> and <em>'lonely'</em>? Why do competitive exams flag <em>'He talked friendly'</em> as an error?"
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-1.5 ml-4 sm:ml-8">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <GraduationCap className="w-4 h-4" />
                <span>Sukanta Sir (Mentor):</span>
              </div>
              <p className="text-slate-100 text-sm">
                "Because of the morphological root rule, Tuhina! When you attach <em>'-ly'</em> to an Adjective, you create an Adverb (<em>Quick + ly = Quickly</em>). But when you attach <em>'-ly'</em> to a Noun, you create an <strong>Adjective</strong> (<em>Friend + ly = Friendly, Love + ly = Lovely, Coward + ly = Cowardly</em>). Since <em>'friendly'</em> is an adjective, you cannot use it to modify the verb <em>'talked'</em> directly. You must say: <em>'He talked <strong>in a friendly manner</strong>'</em>."
              </p>
              {showBengali && (
                <p className="text-xs text-emerald-300 border-t border-indigo-900/50 pt-2 mt-1">
                  বাংলা টিপস: Noun + '-ly' = Adjective। তাই 'He spoke friendly' ভুল; সঠিক হবে 'He spoke in a friendly manner'।
                </p>
              )}
            </div>
          </div>

          {/* Dialogue 3 */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <User className="w-3.5 h-3.5" />
                <span>Debangshu (Student):</span>
              </div>
              <p className="text-slate-200 text-sm">
                "Sir, how can I instantly distinguish whether <em>'before'</em> is a Preposition or a Conjunction?"
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-1.5 ml-4 sm:ml-8">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <GraduationCap className="w-4 h-4" />
                <span>Sukanta Sir (Mentor):</span>
              </div>
              <p className="text-slate-100 text-sm">
                "Look at what immediately follows it, Debangshu! If <em>'before'</em> is followed by a nominal noun phrase without a finite verb (<em>'He left before sunset'</em>), it is a <strong>Preposition</strong>. If it is followed by a complete clause containing its own subject and finite verb (<em>'He left before the train arrived'</em>), it is a <strong>Subordinating Conjunction</strong>!"
              </p>
              {showBengali && (
                <p className="text-xs text-emerald-300 border-t border-indigo-900/50 pt-2 mt-1">
                  বাংলা টিপস: 'Before'-এর পর শুধু Noun থাকলে তা Preposition, কিন্তু Subject + Finite Verb থাকলে তা Conjunction।
                </p>
              )}
            </div>
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
            title="Topic 6: Classroom Dialogue & Mentor Lab — Quick Notes"
          />

          <WordDictionary />

          <Teacher
            note="Classroom doubts are the fertile soil where deep grammatical insights take root. Never hesitate to ask why! — Sukanta Hui"
          />
        </div>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/001_001_words-and-the-eight-parts-of-speech-overview/5"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 5 (Prepositions & Conjunctions)</span>
          </a>

          <a
            href="/english-grammar/topic/001_001_words-and-the-eight-parts-of-speech-overview/7"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 7 (Word Classification Workbench)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
