import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  Languages,
  Zap,
  RotateCcw,
  Check,
  Layers,
  Compass,
  MessageSquare,
  ShieldCheck,
  Tag,
  Dna
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedPluralCategory, setSelectedPluralCategory] = useState(0);

  // Plural mutation families
  const pluralFamilies = [
    {
      family: "Latin -us → -i",
      rule: "Singular ends in '-us', plural mutates to '-i'.",
      examples: [
        { singular: "Radius", plural: "Radii", context: "The radii of concentric circles." },
        { singular: "Focus", plural: "Foci", context: "The dual foci of the optical ellipse." },
        { singular: "Alumnus (male)", plural: "Alumni", context: "Distinguished alumni of Barrackpore college." },
        { singular: "Syllabus", plural: "Syllabi", context: "Review the semester syllabi." }
      ],
      descBn: "Latin শব্দ যার শেষে '-us' থাকে, সেগুলোর Plural-এ '-i' হয়।"
    },
    {
      family: "Latin/Greek -is → -es",
      rule: "Singular ends in '-is', plural mutates to '-es' (pronounced /i:z/).",
      examples: [
        { singular: "Crisis", plural: "Crises", context: "Navigating international geopolitical crises." },
        { singular: "Analysis", plural: "Analyses", context: "Perform quantitative data analyses." },
        { singular: "Thesis", plural: "Theses", context: "Doctoral research theses submitted." },
        { singular: "Basis", plural: "Bases", context: "The theoretical bases of thermodynamics." }
      ],
      descBn: "Greek/Latin শব্দ যার শেষে '-is' থাকে, সেগুলোর Plural-এ '-es' হয়।"
    },
    {
      family: "Greek -on / Latin -um → -a",
      rule: "Singular ends in '-on' or '-um', plural mutates to '-a'.",
      examples: [
        { singular: "Phenomenon", plural: "Phenomena", context: "Natural atmospheric phenomena." },
        { singular: "Criterion", plural: "Criteria", context: "Meeting all eligibility criteria." },
        { singular: "Datum", plural: "Data", context: "Empirical data points collected." },
        { singular: "Medium", plural: "Media", context: "Mass communication media." }
      ],
      descBn: "Greek '-on' এবং Latin '-um' শেষ হওয়া শব্দের Plural রূপ '-a' দিয়ে শেষ হয়।"
    },
    {
      family: "Vowel Mutation (Ablaut)",
      rule: "Internal root vowel changes without standard '-s' suffix.",
      examples: [
        { singular: "Foot", plural: "Feet", context: "Measured six feet in height." },
        { singular: "Tooth", plural: "Teeth", context: "Deciduous vs permanent teeth." },
        { singular: "Mouse", plural: "Mice", context: "Optical laser mice in the lab." },
        { singular: "Goose", plural: "Geese", context: "A flock of migratory geese." }
      ],
      descBn: "শব্দের ভেতরের স্বরবর্ণ (Vowel) পরিবর্তনের মাধ্যমে গঠিত অনিয়মিত Plural।"
    },
    {
      family: "Hyphenated Compound Nouns",
      rule: "Attach the plural suffix '-s' strictly to the principal noun head.",
      examples: [
        { singular: "Passer-by", plural: "Passers-by", context: "Helpful passers-by aided the driver." },
        { singular: "Commander-in-chief", plural: "Commanders-in-chief", context: "High-ranking commanders-in-chief." },
        { singular: "Son-in-law", plural: "Sons-in-law", context: "Both his sons-in-law are doctors." },
        { singular: "Looker-on", plural: "Lookers-on", context: "Curious lookers-on gathered around." }
      ],
      descBn: "Compound Noun-এর ক্ষেত্রে মূল Noun Head-এর সাথে '-s' যুক্ত হয়।"
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
        {/* ========================================================================= */}
        {/* 1. HERO HEADER WITH BILINGUAL SWITCHER                                   */}
        {/* ========================================================================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Segment 2 · Nominal Domain
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Module 002_001
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Estimated: 2.5 Hours
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Noun Classification, Number Invariants & Irregular Plurals
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Master the 5 noun families, uncountable mass noun traps, foreign loanword pluralization, and pluralia tantum words in standard and competitive English.
              </p>
            </div>

            {/* Language Switcher Toggle */}
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

          {/* Bengali Alert */}
          {showBengali && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-sm flex items-start gap-3 animate-fade-in">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-300">বাংলা মাধ্যম শিক্ষার্থীদের জন্য বিশেষ নির্দেশিকা সক্রিয় করা হয়েছে:</p>
                <p className="text-emerald-200/90 text-xs mt-1 leading-relaxed">
                  Noun-এর সমস্ত ক্লাসিফিকেশন (যেমন: <strong>Proper</strong>, <strong>Common</strong>, <strong>Collective</strong>, <strong>Material</strong>, <strong>Abstract</strong>, <strong>Countable/Uncountable</strong>, <strong>Pluralia Tantum</strong>) মূল ইংরেজিতে রাখা হয়েছে। বাংলা ভাষা গণনাহীন বিশেষ্য (Uncountable Nouns) এবং অনিয়মিত বহুবচন সংক্রান্ত নিয়ম ব্যাখ্যার জন্য ব্যবহৃত হয়েছে।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 2. THE FIVE TRADITIONAL NOUN FAMILIES                                     */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                <Layers className="w-6 h-6 text-indigo-400" />
                The Five Traditional Noun Families
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Every noun in the English language belongs to one of these five ontological classes:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Proper Noun */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                1. PROPER NOUN
              </span>
              <h4 className="text-white font-semibold text-sm">Unique Individual Names</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Always begins with a capital letter. Names specific persons, places, days, months, and historical events.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 text-xs font-mono text-slate-300">
                • <em>Swadeep</em>, <em>Barrackpore</em>, <em>Wednesday</em>
              </div>
            </div>

            {/* 2. Common Noun */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                2. COMMON NOUN
              </span>
              <h4 className="text-white font-semibold text-sm">General Category Labels</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Names shared by all members of a class or kind. Can be readily counted and pluralized.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 text-xs font-mono text-slate-300">
                • <em>student</em>, <em>city</em>, <em>algorithm</em>, <em>book</em>
              </div>
            </div>

            {/* 3. Collective Noun */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                3. COLLECTIVE NOUN
              </span>
              <h4 className="text-white font-semibold text-sm">Unified Groups & Assemblies</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Names a group of individuals regarded as a single unified body (takes singular verb when undivided).
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 text-xs font-mono text-slate-300">
                • <em>jury</em>, <em>committee</em>, <em>flock</em>, <em>fleet</em>
              </div>
            </div>

            {/* 4. Material Noun */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                4. MATERIAL NOUN
              </span>
              <h4 className="text-white font-semibold text-sm">Raw Substances & Matter</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Names substances from which other manufactured artifacts are produced. Strictly uncountable.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 text-xs font-mono text-slate-300">
                • <em>gold</em>, <em>water</em>, <em>cotton</em>, <em>iron</em>, <em>wood</em>
              </div>
            </div>

            {/* 5. Abstract Noun */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 md:col-span-2 lg:col-span-2">
              <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">
                5. ABSTRACT NOUN
              </span>
              <h4 className="text-white font-semibold text-sm">Intangible Qualities, Concepts & States</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Names qualities, concepts, states of mind, emotions, or arts that cannot be physically touched or held.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 text-xs font-mono text-slate-300">
                • <em>honesty</em>, <em>wisdom</em>, <em>liberty</em>, <em>courage</em>, <em>physics</em>, <em>music</em>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. UNCOUNTABLE MASS NOUN TRAPS                                            */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-900 border border-amber-500/30 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                High-Frequency Uncountable Noun Traps in Competitive Exams
              </h2>
              <p className="text-xs text-amber-300/80 mt-0.5">
                These nouns NEVER take a plural '-s' and NEVER take 'a/an' directly:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { word: "Information", wrong: "informations ❌", right: "pieces of information ✔️" },
              { word: "Furniture", wrong: "furnitures ❌", right: "items of furniture ✔️" },
              { word: "Advice", wrong: "advices / an advice ❌", right: "a word / piece of advice ✔️" },
              { word: "Scenery", wrong: "sceneries ❌", right: "breathtaking scenery ✔️" },
              { word: "Luggage", wrong: "luggages ❌", right: "articles of luggage ✔️" },
              { word: "Poetry", wrong: "poetries ❌", right: "poems / works of poetry ✔️" }
            ].map((trap, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5 font-mono text-xs">
                <div className="text-amber-300 font-bold text-sm">{trap.word}</div>
                <div className="text-rose-400">{trap.wrong}</div>
                <div className="text-emerald-400 font-bold">{trap.right}</div>
              </div>
            ))}
          </div>

          {showBengali && (
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs animate-fade-in space-y-1">
              <strong>বাংলা সতর্কতা:</strong> বাংলায় "অনেক তথ্য", "অনেক উপদেশ", বা "অনেক আসবাবপত্র" বলা গেলেও ইংরেজিতে <em>informations</em>, <em>advices</em>, বা <em>furnitures</em> লেখা চরম ব্যাকরণিক ভুল। এদের গণনা করতে হলে <em>pieces of information</em> বা <em>items of furniture</em> বলতে হবে।
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 4. INTERACTIVE IRREGULAR & FOREIGN PLURAL EXPLORER                        */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Dna className="w-4 h-4" />
                Morphological Mutator
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Irregular & Foreign Loanword Plurals
              </h2>
            </div>
            <p className="text-slate-400 text-xs max-w-xs">
              Select a morphological pattern to explore its Latin, Greek, and Anglo-Saxon plural shifts:
            </p>
          </div>

          {/* Family Selectors */}
          <div className="flex flex-wrap gap-2">
            {pluralFamilies.map((fam, fIdx) => (
              <button
                key={fIdx}
                type="button"
                onClick={() => setSelectedPluralCategory(fIdx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all duration-200 border ${
                  selectedPluralCategory === fIdx
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-950 scale-105"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                {fam.family}
              </button>
            ))}
          </div>

          {/* Family Active Card */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-indigo-500/30 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">
                Family: {pluralFamilies[selectedPluralCategory].family}
              </span>
              <span className="text-xs text-indigo-300 font-mono">
                {pluralFamilies[selectedPluralCategory].rule}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pluralFamilies[selectedPluralCategory].examples.map((ex, eIdx) => (
                <div key={eIdx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Singular: <strong className="text-white">{ex.singular}</strong></span>
                    <span className="text-emerald-400 font-bold">Plural: {ex.plural}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] italic font-sans pt-1">
                    "{ex.context}"
                  </p>
                </div>
              ))}
            </div>

            {showBengali && (
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-200 text-xs animate-fade-in flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>বাংলা নিয়ম:</strong> {pluralFamilies[selectedPluralCategory].descBn}</span>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. CLASSROOM DIALOGUE WITH SUKANTA SIR                                    */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Classroom Dialogue: Mentor Sukanta Sir & Students
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Dissecting Pluralia Tantum and Collective Noun verb agreements
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed">
            {/* Dialogue: Abhronila */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-400">Abhronila (Student):</span>
                <span className="text-slate-500 font-mono">Question on Pluralia Tantum</span>
              </div>
              <p className="text-slate-300">
                "Sir, why is it <em>'The scissors are sharp'</em>, but <em>'A pair of scissors is on the desk'</em>? How does the verb change?"
              </p>
            </div>

            {/* Response: Sukanta Sir */}
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-1.5 ml-4 sm:ml-8">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400">Sukanta Sir (Mentor):</span>
                <span className="text-indigo-400 font-mono font-semibold">The Head Noun Rule</span>
              </div>
              <p className="text-slate-200">
                "Superb question, Abhronila! <em>'Scissors'</em> on its own is a <strong>Pluralia Tantum</strong> (a two-bladed unit) and takes a plural verb. But in <em>'A pair of scissors'</em>, the true grammatical head of the subject phrase is <strong>'A pair'</strong> (singular countable noun). The verb always agrees with the true subject head noun: <em>'A pair (singular) ... IS on the desk'</em>."
              </p>
              {showBengali && (
                <p className="text-xs text-emerald-300 border-t border-indigo-900/50 pt-1.5 mt-1">
                  বাংলা টিপস: শুধু 'Scissors' থাকলে Plural Verb ('are') বসবে; কিন্তু 'A pair of scissors' থাকলে মূল Subject হলো 'A pair', তাই Singular Verb ('is') বসবে।
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. AUXILIARY SYSTEMS: FAQS, PRINT NOTES, DICTIONARY, TEACHER PROFILE       */}
        {/* ========================================================================= */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Module 002_001 Diagnostic Assessment & Practice Bank (25 MCQs)"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Module 002_001: Noun Classification, Number Invariants & Irregular Plurals"
          />

          <WordDictionary />

          <Teacher
            note="Mastering noun countability and foreign plurals is essential for error-free academic composition and competitive examinations. — Sukanta Hui"
          />
        </div>

        {/* ========================================================================= */}
        {/* 7. NEXT MODULE NAVIGATION LINK                                            */}
        {/* ========================================================================= */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Next Step in Curriculum</span>
            <h3 className="text-xl font-bold text-white">
              Module 002_002: Noun Gender, Cases & The Possessive Apostrophe
            </h3>
            <p className="text-slate-400 text-xs max-w-xl">
              Master the 4 noun cases (Nominative, Accusative, Dative, Genitive), singular vs plural apostrophe rules (`'s` vs `s'`), and joint vs separate possession.
            </p>
          </div>

          <a
            href="/english-grammar/module/002_002_noun-gender-cases-and-the-possessive-apostrophe"
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-950/50 hover:shadow-indigo-900/80 hover:scale-105 shrink-0"
          >
            <span>Proceed to Module 002_002</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
