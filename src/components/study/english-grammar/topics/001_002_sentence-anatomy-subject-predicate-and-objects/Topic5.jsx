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
  ShieldCheck,
  Lightbulb,
  Target,
  Heart,
  Terminal,
  Activity,
  CheckSquare,
  Info
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

export default function Topic5() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);

  // 8 Multi-Domain Subject Complement Examples
  const complementExamples = [
    {
      id: 0,
      title: "Copula 'Be' with Predicate Noun (Renaming)",
      domain: "Academia & Research",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      sentence: "Abhronila is an exceptional machine learning researcher.",
      verb: "is (Primary Copula)",
      subjectComplement: "an exceptional machine learning researcher",
      complementType: "Predicate Noun / Predicative Nominative (NP)",
      equalityEquation: "Abhronila == researcher",
      contrastWithObject: "No action passes; the noun phrase renames the subject's identity.",
      analysisBn: "'is' Linking Verb Subject 'Abhronila'-র পরিচয় পুনর্নির্ধারণ করতে Predicate Noun 'researcher' যুক্ত করেছে (Abhronila == researcher)।"
    },
    {
      id: 1,
      title: "Copula 'Be' with Predicate Adjective (Qualifying)",
      domain: "Software Development",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      sentence: "The newly deployed search algorithm is exceptionally fast and reliable.",
      verb: "is (Primary Copula)",
      subjectComplement: "exceptionally fast and reliable",
      complementType: "Predicate Adjectives / Predicative Adjectives (AP)",
      equalityEquation: "Algorithm == fast & reliable",
      contrastWithObject: "Describes the innate attribute of the algorithm, not a separate entity.",
      analysisBn: "'fast and reliable' Adjective দুটি Subject-এর গুণ প্রকাশ করে Subject Complement হিসেবে বসেছে।"
    },
    {
      id: 2,
      title: "Sensory Linking Verb: Smell (Aroma)",
      domain: "Culinary & Agriculture",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      sentence: "The freshly brewed Darjeeling organic tea smells remarkably sweet.",
      verb: "smells (Sensory Linking Copula)",
      subjectComplement: "remarkably sweet",
      complementType: "Predicate Adjective Phrase (Never use adverb 'sweetly'!)",
      equalityEquation: "Tea == sweet",
      contrastWithObject: "The tea is not performing a smelling action with a nose; it emits sweet aroma.",
      analysisBn: "'smells' এখানে Sensory Linking Verb; তাই এর পর Adverb (sweetly) নয়, Adjective (sweet) Subject Complement হিসেবে বসে।"
    },
    {
      id: 3,
      title: "Dual-Behavior Verb (Action vs Linking: Taste)",
      domain: "Culinary Arts",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      sentence: "Contrast: 'The soup tasted delicious' (Linking: SVC) vs 'The chef tasted the soup' (Action: SVO).",
      verb: "tasted (Dual Role Verb)",
      subjectComplement: "delicious (in Linking use)",
      complementType: "Case A: SVC (Soup == delicious) | Case B: SVO (Chef ≠ soup)",
      equalityEquation: "Linking: Subject == Quality | Action: Subject ≠ Object",
      contrastWithObject: "In Case A, soup has the quality of deliciousness. In Case B, the chef tastes a target object.",
      analysisBn: "'taste' Verb-টি দুটি ভূমিকা পালন করে: ক. স্যুপের স্বাদ সুস্বাদু (Linking: SVC), খ. শেফ স্যুপ চেখে দেখলেন (Action: SVO)।"
    },
    {
      id: 4,
      title: "Change-of-State Linking Verb (Become/Turn/Grow)",
      domain: "Meteorology & Ecology",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      sentence: "The autumn leaves turned bright golden yellow after the first frost.",
      verb: "turned (Inchoative / Change-of-State Copula)",
      subjectComplement: "bright golden yellow",
      complementType: "Predicate Adjective Phrase (Resulting State)",
      equalityEquation: "Leaves == golden yellow",
      contrastWithObject: "No physical spinning rotation occurred; the leaves underwent a state change.",
      analysisBn: "'turned' এখানে ঘোরা নয়, বরং রঙ পরিবর্তনের রূপান্তর নির্দেশ করে Inchoative Linking Verb হিসেবে বসেছে।"
    },
    {
      id: 5,
      title: "Continuation-of-State Verb (Remain/Stay/Keep)",
      domain: "Clinical Medicine",
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      sentence: "The senior surgeon remained completely calm during the critical procedure.",
      verb: "remained (Stative Durative Copula)",
      subjectComplement: "completely calm",
      complementType: "Predicate Adjective Phrase",
      equalityEquation: "Surgeon == calm",
      contrastWithObject: "Indicates persistence in a state of calmness (Surgeon == calm).",
      analysisBn: "'remained' কর্তার অবিচল মানসিক অবস্থা নির্দেশ করে Subject Complement 'calm' গ্রহণ করেছে।"
    },
    {
      id: 6,
      title: "Perception Linking Verb (Seem/Appear/Look)",
      domain: "Logic & Philosophy",
      badge: "bg-teal-500/20 text-teal-300 border-teal-500/30",
      sentence: "The proposed mathematical proof seems entirely valid.",
      verb: "seems (Epistemic / Perception Copula)",
      subjectComplement: "entirely valid",
      complementType: "Predicate Adjective",
      equalityEquation: "Proof == valid",
      contrastWithObject: "'Seems' connects the proposition to its evaluation of validity.",
      analysisBn: "'seems' অনুভূতির মাধ্যমে প্রাপ্ত মূল্যায়ন নির্দেশ করতে Subject Complement 'valid' নিয়েছে।"
    },
    {
      id: 7,
      title: "Predicative Pronoun Case (Formal vs Informal)",
      domain: "Prescriptive Grammar",
      badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      sentence: "It was I who resolved the critical production outage. (Informal: 'It was me')",
      verb: "was (Copula)",
      subjectComplement: "I (Prescriptive Nominative Pronoun)",
      complementType: "Predicative Nominative Pronoun",
      equalityEquation: "It == I",
      contrastWithObject: "Traditional formal grammar mandates nominative pronoun 'I' after copula 'be'.",
      analysisBn: "ঐতিহ্যবাহী আনুষ্ঠানিক ব্যাকরণে Linking Verb 'be'-এর পর Objective 'me' নয়, Nominative 'I' বসে (It was I)।"
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
        {/* Header */}
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
                  Module 001_002 · Topic 5
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Subject Complements & Linking Verbs: Predicative Nominatives & Adjectives
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Master copular verbs (be, become, seem, smell, taste, feel), predicate nouns vs predicate adjectives, and the equality formula (Subject == Complement).
              </p>
            </div>

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
                  <strong>Subject Complement:</strong> Linking Verb-এর পর বসে যে শব্দ Subject-এর পরিচয় পুনর্নির্ধারণ করে (Predicate Noun: <em>He is a teacher</em>) অথবা Subject-এর গুণ প্রকাশ করে (Predicate Adjective: <em>The rose smells sweet</em>)। এখানে Subject এবং Complement একই সত্তা (Subject == Complement)।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* IN VERY SIMPLE LANGUAGE: ULTRA-CLEAR EXPLODED BREAKDOWN                   */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Beginner Friendly · Deep Step-by-Step Intuition</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Subject Complements in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                A Subject Complement is not a target. It is a mirror holding an equal sign ($==$) directly to the subject.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              The Mirror ($==$)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Model 1: Predicate Noun (Identity) */}
            <div className="p-6 rounded-2xl bg-slate-950/90 border border-cyan-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-cyan-400" />
                  1. Predicate Noun (Renames Identity)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                  Person == Title
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-white">
                "Abhronila is a machine learning researcher."
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-300 font-mono">Part 1: [Abhronila]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-200">SUBJECT</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">The person being identified.</p>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300 font-mono">Part 2: [is]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200">LINKING COPULA ($==$)</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">Connects the subject to her title without any physical action.</p>
                </div>

                <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-300 font-mono">Part 3: [a researcher]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-200">SUBJECT COMPLEMENT (Noun)</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    <strong>Why NOT an Object?</strong> Because Abhronila and the researcher are the EXACT SAME person! ($Abhronila == researcher$).
                  </p>
                </div>
              </div>

              {showBengali && (
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-[11px] text-cyan-200 leading-relaxed">
                  <strong>সহজ ভাষায়:</strong> 'researcher' কোনো কর্ম নয়; এটি কর্তারই পেশাগত নাম (Subject == Complement)।
                </div>
              )}
            </div>

            {/* Model 2: Predicate Adjective (Sensory Quality) */}
            <div className="p-6 rounded-2xl bg-slate-950/90 border border-emerald-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-emerald-400" />
                  2. Predicate Adjective (Describes Quality)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  Subject == Quality
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-white">
                "The Darjeeling tea smells remarkably sweet."
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-300 font-mono">Part 1: [The Darjeeling tea]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-200">SUBJECT</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">The beverage possessing the aroma.</p>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300 font-mono">Part 2: [smells]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200">SENSORY LINKING VERB</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">Emits fragrance (the tea is not sniffing with a nose!).</p>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300 font-mono">Part 3: [remarkably sweet]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200">SUBJECT COMPLEMENT (Adjective)</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    <strong>Why Adjective (NOT 'sweetly')?</strong> Sensory linking verbs describe the state of the subject, so an adjective ('sweet') is mandatory!
                  </p>
                </div>
              </div>

              {showBengali && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-200 leading-relaxed">
                  <strong>সহজ ভাষায়:</strong> Sensory Verb-এর পর Adverb (sweetly) নয়, Adjective (sweet) বসে কারণ এটি চায়ের সুবাসের গুণ প্রকাশ করে।
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Practice Questions */}
        <FAQTemplate
          questions={questions}
          showBengali={showBengali}
          title="Topic 5 Diagnostic Assessment"
        />

        <PlainTextPrint
          content={noteText}
          title="Topic 5: Subject Complements & Linking Verbs Comprehensive Note"
        />

        <Teacher />
      </div>
    </div>
  );
}
