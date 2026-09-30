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
  Compass,
  MessageSquare,
  ShieldCheck,
  GitBranch,
  Split,
  Lightbulb,
  Target,
  Heart,
  Eye,
  Activity,
  Award,
  Terminal,
  Cpu,
  Info,
  CheckSquare
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedPatternIndex, setSelectedPatternIndex] = useState(0);
  const [equalityTestId, setEqualityTestId] = useState(0);
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);

  // 8 Multi-Domain Dissected Sentences
  const masterExamples = [
    {
      id: 0,
      domain: "Technology & Coding",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      sentence: "The senior software engineer developed an ultra-fast search algorithm in the Barrackpore lab.",
      tokens: [
        { text: "The senior software engineer", role: "Complete Subject", type: "NP (Hero)", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { text: "developed", role: "Finite Verb", type: "V (Transitive)", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { text: "an ultra-fast search algorithm", role: "Direct Object", type: "DO (Target)", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
        { text: "in the Barrackpore lab", role: "Adverbial of Place", type: "A (Setting)", color: "bg-teal-500/20 text-teal-300 border-teal-500/30" }
      ],
      pattern: "S + V + DO + A (SVOA)",
      analysisEn: "The complete subject centers on the head noun 'engineer' with definite article and compound adjective modifiers. 'Developed' acts as a transitive verb taking the accusative direct object 'algorithm', followed by a prepositional phrase of location.",
      analysisBn: "Complete Subject হলো 'The senior software engineer' (মূল Noun: engineer)। Transitive Verb 'developed' সরাসরি 'algorithm' Direct Object গ্রহণ করেছে এবং বাক্যের শেষে স্থান নির্দেশক Adverbial রয়েছে।"
    },
    {
      id: 1,
      domain: "Education & Mentorship",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      sentence: "Sukanta Sir gifted Swadeep a comprehensive reference handbook on English syntax.",
      tokens: [
        { text: "Sukanta Sir", role: "Complete Subject", type: "NP (Agent)", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { text: "gifted", role: "Ditransitive Verb", type: "V (Dual Action)", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { text: "Swadeep", role: "Indirect Object", type: "IO (Recipient)", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
        { text: "a comprehensive reference handbook on English syntax", role: "Direct Object", type: "DO (Entity)", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" }
      ],
      pattern: "S + V + IO + DO (SVOO)",
      analysisEn: "A classic ditransitive structure. 'Swadeep' is the human beneficiary receiving the gift, while the extended noun phrase starting with 'a comprehensive reference handbook' is the direct object entity transferred.",
      analysisBn: "'gifted' Ditransitive Verb দুটি Object নেয়: 'Swadeep' হলো গ্রহীতা বা Indirect Object (ব্যক্তি), এবং 'handbook...' হলো সরাসরি উপহার দেওয়া বস্তু বা Direct Object।"
    },
    {
      id: 2,
      domain: "Medical & Health",
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      sentence: "The dedicated chief cardiologist remained calm throughout the complex surgical operation.",
      tokens: [
        { text: "The dedicated chief cardiologist", role: "Complete Subject", type: "NP (Subject)", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { text: "remained", role: "Linking Verb (Copula)", type: "V (State)", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { text: "calm", role: "Subject Complement", type: "SC (Adjective)", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
        { text: "throughout the complex surgical operation", role: "Adverbial of Time/Duration", type: "A (Context)", color: "bg-teal-500/20 text-teal-300 border-teal-500/30" }
      ],
      pattern: "S + V + SC + A (SVA / SVC)",
      analysisEn: "'Remained' does not transfer any physical action; it links the mental state 'calm' directly back to the cardiologist (Cardiologist == Calm). 'Calm' is a Predicate Adjective functioning as Subject Complement.",
      analysisBn: "'remained' একটি Linking Verb যা কোনো কাজ বোঝাচ্ছে না, বরং কর্তার শান্ত মানসিক অবস্থাকে যুক্ত করেছে (Cardiologist == Calm)। তাই 'calm' হলো Subject Complement।"
    },
    {
      id: 3,
      domain: "Corporate & Leadership",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      sentence: "The executive board appointed Debangshu principal architect of the cloud infrastructure.",
      tokens: [
        { text: "The executive board", role: "Complete Subject", type: "NP (Authority)", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { text: "appointed", role: "Complex-Transitive Verb", type: "V (Designation)", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { text: "Debangshu", role: "Direct Object", type: "DO (Target)", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
        { text: "principal architect of the cloud infrastructure", role: "Object Complement", type: "OC (New Role)", color: "bg-pink-500/20 text-pink-300 border-pink-500/30" }
      ],
      pattern: "S + V + DO + OC (SVOC)",
      analysisEn: "The complex-transitive verb 'appointed' takes the direct object 'Debangshu' and completes his new designation with the object complement noun phrase 'principal architect...'. Note that no preposition 'as' is required.",
      analysisBn: "'appointed' Complex-Transitive Verb Direct Object 'Debangshu'-এর নতুন পদমর্যাদা নির্দেশ করতে Object Complement 'principal architect' গ্রহণ করেছে (Debangshu == principal architect)।"
    },
    {
      id: 4,
      domain: "Literature & Sensory",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      sentence: "The freshly ground Darjeeling tea leaves smell remarkably sweet.",
      tokens: [
        { text: "The freshly ground Darjeeling tea leaves", role: "Complete Subject", type: "NP (Entity)", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { text: "smell", role: "Sensory Linking Verb", type: "V (Perception)", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { text: "remarkably sweet", role: "Subject Complement", type: "SC (AP)", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" }
      ],
      pattern: "S + V + SC (SVC)",
      analysisEn: "Sensory verbs like 'smell', 'taste', 'sound', 'feel', and 'look' act as copulas. The adjective phrase 'remarkably sweet' describes the innate attribute of the tea leaves, proving why the adverb 'sweetly' would be a grammatical error.",
      analysisBn: "অনুভূতিবাচক Sensory Linking Verb 'smell'-এর পর কর্তার সুগন্ধময় বৈশিষ্ট্য প্রকাশ করতে Adjective 'sweet' Subject Complement হিসেবে বসেছে ('sweetly' Adverb ব্যবহার করা ব্যাকরণগত ভুল)।"
    },
    {
      id: 5,
      domain: "Law & Jurisprudence",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      sentence: "The honorable high court judge declared the controversial ordinance entirely unconstitutional.",
      tokens: [
        { text: "The honorable high court judge", role: "Complete Subject", type: "NP (Judge)", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { text: "declared", role: "Complex-Transitive Verb", type: "V (Judicial Verdict)", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { text: "the controversial ordinance", role: "Direct Object", type: "DO (Target Statute)", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
        { text: "entirely unconstitutional", role: "Object Complement", type: "OC (Legal Status)", color: "bg-pink-500/20 text-pink-300 border-pink-500/30" }
      ],
      pattern: "S + V + DO + OC (SVOC)",
      analysisEn: "The judicial verb 'declared' links the statute (Direct Object) to its new legal standing (Object Complement adjective phrase).",
      analysisBn: "'declared' Verb-টি 'the controversial ordinance' Direct Object-এর সাংবিধানিক বৈধতাহীন অবস্থা প্রকাশ করতে 'unconstitutional' Object Complement Adjective নিয়েছে।"
    },
    {
      id: 6,
      domain: "Science & Aerospace",
      badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      sentence: "The lunar exploration rover safely landed on the south pole of the moon.",
      tokens: [
        { text: "The lunar exploration rover", role: "Complete Subject", type: "NP (Rover)", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { text: "safely landed", role: "Intransitive Verb + Manner Adv", type: "VP (Action)", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { text: "on the south pole of the moon", role: "Obligatory Adverbial", type: "A (Locative Target)", color: "bg-teal-500/20 text-teal-300 border-teal-500/30" }
      ],
      pattern: "S + V + A (SVA)",
      analysisEn: "The verb 'landed' functions intransitively with an optional manner adverb 'safely' and a crucial locative adverbial phrase indicating touchdown destination.",
      analysisBn: "'landed' Intransitive Verb যা কোনো Direct Object ছাড়াই সম্পন্ন হয়েছে; সাথে স্থান নির্দেশক Adverbial Phrase যুক্ত রয়েছে।"
    },
    {
      id: 7,
      domain: "Classroom & Study Center",
      badge: "bg-teal-500/20 text-teal-300 border-teal-500/30",
      sentence: "Tuhina and Abhronila solved all thirty complex syntax exercises before sundown.",
      tokens: [
        { text: "Tuhina and Abhronila", role: "Compound Subject", type: "NP (Compound)", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { text: "solved", role: "Transitive Verb", type: "V (Action)", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { text: "all thirty complex syntax exercises", role: "Direct Object", type: "DO (Receiver)", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
        { text: "before sundown", role: "Adverbial of Time", type: "A (Time Limit)", color: "bg-teal-500/20 text-teal-300 border-teal-500/30" }
      ],
      pattern: "S + V + DO + A (SVOA)",
      analysisEn: "A compound subject joined by the coordinating conjunction 'and' acts upon a quantified direct object noun phrase, bounded by a temporal prepositional adjunct.",
      analysisBn: "'Tuhina and Abhronila' দুটি Noun নিয়ে Compound Subject গঠিত হয়েছে, যারা 'solved' Verb-এর মাধ্যমে 'thirty exercises' Direct Object সম্পন্ন করেছে।"
    }
  ];

  // 7 Fundamental Patterns
  const sentencePatterns = [
    {
      code: "SV",
      title: "Subject + Intransitive Verb",
      example: "The express train arrived on schedule.",
      components: [
        { label: "Subject", text: "The express train", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { label: "Intransitive Verb", text: "arrived", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { label: "Optional Adverbial", text: "on schedule", color: "bg-slate-800 text-slate-400 border-slate-700" }
      ],
      explanation: "The verb 'arrived' is self-sufficient. It requires no object to form a complete, grammatically sound predication.",
      explanationBn: "'arrived' একটি Intransitive Verb (অকর্মক ক্রিয়া), যা সম্পূর্ণ অর্থ প্রকাশের জন্য কোনো Object দাবি করে না।"
    },
    {
      code: "SVO",
      title: "Subject + Transitive Verb + Direct Object",
      example: "Swadeep developed an interactive application.",
      components: [
        { label: "Subject", text: "Swadeep", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { label: "Transitive Verb", text: "developed", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { label: "Direct Object", text: "an interactive application", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" }
      ],
      explanation: "The action transfers directly from the agent 'Swadeep' onto the receiver entity 'an interactive application'.",
      explanationBn: "'developed' Transitive Verb-এর কাজটি সরাসরি 'an interactive application' Direct Object-এর ওপর প্রযুক্ত হয়েছে।"
    },
    {
      code: "SVOO",
      title: "Subject + Ditransitive Verb + Indirect Object + Direct Object",
      example: "Sukanta Sir taught Tuhina English Grammar.",
      components: [
        { label: "Subject", text: "Sukanta Sir", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { label: "Ditransitive Verb", text: "taught", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { label: "Indirect Object (Beneficiary)", text: "Tuhina", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
        { label: "Direct Object (Entity)", text: "English Grammar", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" }
      ],
      explanation: "Two objects: 'Tuhina' is the beneficiary person (IO), while 'English Grammar' is the direct topic taught (DO).",
      explanationBn: "Ditransitive Verb দুটি Object নেয়: 'Tuhina' হলো Indirect Object (ব্যক্তি) এবং 'English Grammar' হলো Direct Object (বিষয়)।"
    },
    {
      code: "SVC",
      title: "Subject + Linking/Copular Verb + Subject Complement",
      example: "Abhronila is an exceptional researcher.",
      components: [
        { label: "Subject", text: "Abhronila", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { label: "Linking Verb (Copula)", text: "is", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { label: "Subject Complement (Noun)", text: "an exceptional researcher", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" }
      ],
      explanation: "No action passes. 'is' connects the subject to the predicate noun that renames her (Abhronila == researcher).",
      explanationBn: "এখানে কোনো কাজ হচ্ছে না; 'is' Linking Verb Subject-এর পরিচয় পূর্ণ করতে Subject Complement যুক্ত করেছে (Abhronila == researcher)।"
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
      explanation: "'team leader' renames and describes the direct object 'Debangshu' (Debangshu == team leader).",
      explanationBn: "'team leader' পদটি Direct Object 'Debangshu'-এর নতুন পদমর্যাদা প্রকাশ করে Object Complement হিসেবে বসেছে।"
    },
    {
      code: "SVA",
      title: "Subject + Intransitive Verb + Obligatory Adverbial",
      example: "The modern coaching academy resides in Barrackpore.",
      components: [
        { label: "Subject", text: "The modern coaching academy", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
        { label: "Verb", text: "resides", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
        { label: "Obligatory Adverbial (Place)", text: "in Barrackpore", color: "bg-teal-500/20 text-teal-300 border-teal-500/30" }
      ],
      explanation: "Without the spatial adverbial 'in Barrackpore', the clause would collapse semantically.",
      explanationBn: "'in Barrackpore' স্থান নির্দেশক Adverbial ছাড়া বাক্যটির অর্থ অসম্পূর্ণ থেকে যায়, তাই এটি Obligatory Adverbial।"
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
      explanation: "The verb 'placed' strictly mandates both a direct object (what was placed) and a location (where it was placed).",
      explanationBn: "'placed' Verb-এর পর Direct Object এবং স্থান নির্দেশক Adverbial উভয়েই ব্যাকরণগতভাবে বাধ্যতামূলক।"
    }
  ];

  // Direct Object vs Subject Complement Test Matrix
  const equalityTests = [
    {
      sentence: "The surgeon examined the patient.",
      verb: "examined (Action / Transitive)",
      subject: "The surgeon",
      entity: "the patient",
      type: "Direct Object (SVO)",
      relation: "Subject ≠ Entity",
      proof: "The surgeon and the patient are TWO separate human beings.",
      proofBn: "সার্জন এবং রোগী দুজন সম্পূর্ণ আলাদা ব্যক্তি (Subject ≠ Object), তাই এটি Transitive Verb + Direct Object।"
    },
    {
      sentence: "The patient became impatient.",
      verb: "became (State / Linking Copula)",
      subject: "The patient",
      entity: "impatient",
      type: "Subject Complement (SVC)",
      relation: "Subject == Entity",
      proof: "The adjective 'impatient' directly describes the state of 'The patient'.",
      proofBn: "'impatient' শব্দটি 'The patient'-এর নিজস্ব মানসিক অবস্থা নির্দেশ করছে (Subject == Complement), তাই এটি Linking Verb + Subject Complement।"
    },
    {
      sentence: "The Darjeeling tea smells sweet.",
      verb: "smells (Sensory Linking Copula)",
      subject: "The Darjeeling tea",
      entity: "sweet (Adjective)",
      type: "Subject Complement (SVC)",
      relation: "Subject == Quality",
      proof: "The tea possesses the quality of sweetness. (Never use 'sweetly'!).",
      proofBn: "চায়ের মিষ্টি ঘ্রাণের গুণ প্রকাশ করছে। Sensory Linking Verb-এর পর Adverb নয়, Subject Complement Adjective বসে।"
    },
    {
      sentence: "The professor considered Swadeep brilliant.",
      verb: "considered (Complex-Transitive)",
      subject: "The professor",
      entity: "Swadeep == brilliant",
      type: "Object Complement (SVOC)",
      relation: "Direct Object == Complement",
      proof: "'Brilliant' is the attribute of the Direct Object 'Swadeep', not the professor.",
      proofBn: "'brilliant' গুণটি Direct Object 'Swadeep'-এর ওপর প্রযুক্ত হচ্ছে, তাই এটি Object Complement।"
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
                  Module 001_002
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Master Overview · 10 Topics Complete
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Sentence Anatomy: Subject, Predicate, Objects & Complements
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Deconstruct the syntactic blueprint of English sentences. Master the 7 fundamental sentence patterns, direct vs indirect objects, and the crucial distinction between objects and complements.
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
                <p className="font-semibold text-emerald-300">বাংলা মাধ্যম শিক্ষার্থীদের জন্য বিশেষ নির্দেশিকা সক্রিয় করা হয়েছে:</p>
                <p className="text-emerald-200/90 text-xs mt-1 leading-relaxed">
                  Sentence-এর মূল উপাদানসমূহ (যেমন: <strong>Subject</strong>, <strong>Predicate</strong>, <strong>Direct Object</strong>, <strong>Indirect Object</strong>, <strong>Subject Complement</strong>, <strong>Object Complement</strong>) এর টেকনিক্যাল নাম অপরিবর্তিত রাখা হয়েছে। বাক্যের অভ্যন্তরীণ সম্পর্ক ও ভুল সংশোধনের নিয়ম সহজ বাংলায় বিশদভাবে ব্যাখ্যা করা হয়েছে।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* IN VERY SIMPLE LANGUAGE: ULTRA-CLEAR EXPLODED MULTI-PART BREAKDOWN       */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Beginner Friendly · Deep Step-by-Step Intuition</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Sentence Anatomy in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                Every sentence is an action scene. Let's break down each character, action, target, and mirror.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              All Parts Explained
            </span>
          </div>

          {/* 2 Master Exploded Example Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Card 1: Action Transfer (Transitive & Double Object) */}
            <div className="p-6 rounded-2xl bg-slate-950/90 border border-indigo-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-amber-400" />
                  Model 1: Double Object Transfer (SVOO)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                  Giver $\rightarrow$ Receiver $\rightarrow$ Gift
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-white">
                "Sukanta Sir taught Swadeep English Grammar."
              </div>

              {/* Exploded Parts */}
              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-300 font-mono">1. [Sukanta Sir]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-200">SUBJECT (The Doer)</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    <strong>Why Subject?</strong> He is the instructor performing the teaching action. Ask: <em>"WHO taught?" $\rightarrow$ Sukanta Sir</em>.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300 font-mono">2. [taught]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200">VERB (Ditransitive Action)</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    <strong>Why Ditransitive?</strong> An action that transfers a subject matter to a human learner (2 targets!).
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 font-mono">3. [Swadeep]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-200">INDIRECT OBJECT (Recipient)</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    <strong>Why Indirect Object?</strong> The living person receiving the benefit. Ask: <em>"Taught WHOM?" $\rightarrow$ Swadeep</em>.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-300 font-mono">4. [English Grammar]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-200">DIRECT OBJECT (Transferred Entity)</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    <strong>Why Direct Object?</strong> The exact knowledge entity that was taught. Ask: <em>"Taught WHAT?" $\rightarrow$ English Grammar</em>.
                  </p>
                </div>
              </div>

              {showBengali && (
                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-[11px] text-indigo-200 leading-relaxed">
                  <strong>সহজ বাংলায়:</strong> 'Sukanta Sir' কর্তা, 'taught' ক্রিয়া, 'Swadeep' হলো ব্যক্তিবাচক Indirect Object এবং 'English Grammar' হলো বিষয়বাচক Direct Object।
                </div>
              )}
            </div>

            {/* Card 2: Identity & Linking (SVC & SVOC) */}
            <div className="p-6 rounded-2xl bg-slate-950/90 border border-emerald-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-emerald-400" />
                  Model 2: The Mirror Complement ($==$)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  Subject == Complement
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-white">
                "Abhronila is an exceptional researcher."
              </div>

              {/* Exploded Parts */}
              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-300 font-mono">1. [Abhronila]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-200">SUBJECT (The Person)</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    <strong>Why Subject?</strong> The person about whom this factual statement is made.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300 font-mono">2. [is]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200">LINKING VERB (Copula / Bridge)</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    <strong>Why Linking Verb?</strong> No physical action occurs! 'Is' functions purely as an equal sign ($==$).
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-300 font-mono">3. [an exceptional researcher]</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-200">SUBJECT COMPLEMENT (Mirror Title)</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    <strong>Why Complement (NOT Object)?</strong> It is NOT a second person! Abhronila and the researcher are the exact same individual ($Abhronila == researcher$).
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-bold text-emerald-400 font-mono text-[11px] block">⚖️ The Equality Equation Proof:</span>
                  <p className="text-slate-300 text-[11px]">
                    In SVO (<em>Swadeep coded an app</em>), Swadeep $\neq$ app (2 things). In SVC (<em>Abhronila is a researcher</em>), Abhronila == researcher (1 person!).
                  </p>
                </div>
              </div>

              {showBengali && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-200 leading-relaxed">
                  <strong>সহজ বাংলায়:</strong> 'researcher' কোনো কর্ম (Object) নয়; এটি কর্তারই নিজস্ব পেশাগত পরিচয় (Subject Complement)।
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE MULTI-DOMAIN DISSECTED SENTENCE WORKBENCH                     */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Split className="w-4 h-4" />
                Multi-Domain Sentence Dissection Workbench
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Token-by-Token Structural Deconstruction (8 Real-World Domains)
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Click any example to examine syntactic tokens
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {masterExamples.map((ex, idx) => (
              <button
                key={ex.id}
                onClick={() => setSelectedExampleIndex(idx)}
                className={`p-3 rounded-2xl text-left border transition-all duration-200 space-y-1 ${
                  selectedExampleIndex === idx
                    ? "bg-indigo-600/30 border-indigo-400 shadow-lg ring-2 ring-indigo-500/20"
                    : "bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${ex.badge}`}>
                  {ex.domain}
                </span>
                <p className="text-xs font-medium text-white truncate">
                  {ex.sentence.slice(0, 32)}...
                </p>
              </button>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider font-mono">
                Pattern Blueprint: {masterExamples[selectedExampleIndex].pattern}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Domain: {masterExamples[selectedExampleIndex].domain}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-base text-center text-white">
              "{masterExamples[selectedExampleIndex].sentence}"
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {masterExamples[selectedExampleIndex].tokens.map((tok, tIdx) => (
                <div key={tIdx} className={`p-3.5 rounded-xl border space-y-1.5 ${tok.color}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-bold opacity-80">{tok.type}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40">Token {tIdx + 1}</span>
                  </div>
                  <div className="text-sm font-bold text-white font-mono">{tok.text}</div>
                  <div className="text-[11px] opacity-90">{tok.role}</div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
              <span className="font-bold text-indigo-300 uppercase tracking-wider block">Syntactic Analysis:</span>
              <p className="text-slate-300 leading-relaxed">
                {masterExamples[selectedExampleIndex].analysisEn}
              </p>
              {showBengali && (
                <p className="text-emerald-300 border-t border-slate-800 pt-2 leading-relaxed">
                  <strong>বাংলা বিশ্লেষণ:</strong> {masterExamples[selectedExampleIndex].analysisBn}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* THE 7 FUNDAMENTAL SENTENCE PATTERNS EXPLORER                               */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <GitBranch className="w-6 h-6 text-indigo-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">The 7 Canonical English Sentence Patterns</h2>
              <p className="text-xs text-slate-400 mt-0.5">Every standard English declarative clause conforms to one of these 7 blueprints</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {sentencePatterns.map((pat, idx) => (
              <button
                key={pat.code}
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

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-mono">
                {sentencePatterns[selectedPatternIndex].code}
              </span>
              {sentencePatterns[selectedPatternIndex].title}
            </h3>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-white">
              "{sentencePatterns[selectedPatternIndex].example}"
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {sentencePatterns[selectedPatternIndex].components.map((c, cIdx) => (
                <div key={cIdx} className={`p-3 rounded-xl border text-center ${c.color}`}>
                  <div className="text-[10px] uppercase font-bold tracking-wider opacity-75">{c.label}</div>
                  <div className="text-sm font-bold mt-1 text-white font-mono">{c.text}</div>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-300 pt-2 border-t border-slate-800 leading-relaxed">
              {sentencePatterns[selectedPatternIndex].explanation}
            </p>
            {showBengali && (
              <p className="text-xs text-emerald-300 font-medium leading-relaxed">
                {sentencePatterns[selectedPatternIndex].explanationBn}
              </p>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DIAGNOSTIC EQUALITY LAB: OBJECT VS COMPLEMENT                              */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">Diagnostic Litmus Lab: Object vs Complement</h2>
              <p className="text-xs text-slate-400 mt-0.5">The fundamental equality formula: Subject $\neq$ Object vs Subject $==$ Complement</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {equalityTests.map((t, idx) => (
              <button
                key={idx}
                onClick={() => setEqualityTestId(idx)}
                className={`p-4 rounded-2xl text-left border transition-all duration-200 space-y-2 ${
                  equalityTestId === idx
                    ? "bg-emerald-950/40 border-emerald-500/50 shadow-lg ring-1 ring-emerald-500/30"
                    : "bg-slate-950 border-slate-800 hover:border-slate-700"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Test Case {idx + 1}</span>
                <p className="text-xs font-semibold text-white truncate">"{t.sentence}"</p>
                <div className="text-[11px] font-mono text-emerald-400">{t.type}</div>
              </button>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-white font-mono">
                Sentence: "{equalityTests[equalityTestId].sentence}"
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
                Formula: {equalityTests[equalityTestId].relation}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-500 block uppercase text-[10px]">Subject</span>
                <p className="font-bold text-blue-300">{equalityTests[equalityTestId].subject}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-500 block uppercase text-[10px]">Verb Category</span>
                <p className="font-bold text-emerald-300">{equalityTests[equalityTestId].verb}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-500 block uppercase text-[10px]">Predicate Entity</span>
                <p className="font-bold text-purple-300">{equalityTests[equalityTestId].entity}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-slate-400 uppercase text-[10px] block">Linguistic Proof:</span>
              <p className="text-slate-200">{equalityTests[equalityTestId].proof}</p>
              {showBengali && (
                <p className="text-emerald-300 border-t border-slate-800 pt-1.5">{equalityTests[equalityTestId].proofBn}</p>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SOCRATIC DIALOGUE: MENTOR SUKANTA SIR & COHORT                            */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <MessageSquare className="w-6 h-6 text-indigo-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">Socratic Dialogue: Sukanta Sir & Barrackpore Students</h2>
              <p className="text-xs text-slate-400 mt-0.5">Real classroom discussions on syntactic ambiguities and exam traps</p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                <Terminal className="w-4 h-4" />
                <span>Swadeep (Student):</span>
              </div>
              <p className="text-slate-200">
                "Sir, why is <em>'The coffee tastes bitterly'</em> marked wrong in competitive exams when coffee genuinely tastes bitter and we usually use '-ly' adverbs after verbs?"
              </p>
              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-1 mt-2">
                <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Mentor Sukanta Sir:
                </span>
                <p>
                  "Excellent question, Swadeep! Verbs like <em>taste, smell, look, feel, sound</em> here are not action verbs. The coffee is not performing an action with a tongue! It is a <strong>Sensory Linking Verb (Copula)</strong>. The word following it is describing the <em>Subject (the coffee)</em>, not modifying the verb. Therefore, it requires a <strong>Subject Complement Adjective ('bitter')</strong>, not an adverb ('bitterly')."
                </p>
                {showBengali && (
                  <p className="text-emerald-300 text-[11px] pt-1 border-t border-indigo-800/40">
                    বাংলায়: কফি নিজে কোনো কাজ করছে না। 'tastes' এখানে Linking Verb যা Subject-এর স্বাদ নির্দেশ করতে Adjective 'bitter' গ্রহণ করে।
                  </p>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-pink-400">
                <Terminal className="w-4 h-4" />
                <span>Tuhina (Student):</span>
              </div>
              <p className="text-slate-200">
                "Sir, in <em>'Sukanta Sir explained me the problem'</em>, why is that considered ungrammatical by British Council & SSC standards?"
              </p>
              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs space-y-1 mt-2">
                <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Mentor Sukanta Sir:
                </span>
                <p>
                  "Latinate verbs of communication such as <em>explain, describe, introduce, confess, suggest</em> do NOT permit the double-object (SVOO) dative alternation. You must say: <strong>'explained the problem TO me'</strong> (SVO + Prepositional Phrase). Never place the person directly after 'explain' without 'to'!"
                </p>
                {showBengali && (
                  <p className="text-emerald-300 text-[11px] pt-1 border-t border-indigo-800/40">
                    বাংলায়: explain, describe ইত্যাদি ল্যাটিনজাত Verb সরাসরি ব্যক্তিবাচক Indirect Object নেয় না; এদের সাথে 'to me' Prepositional Phrase ব্যবহার করতে হয়।
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Practice Questions */}
        <FAQTemplate
          questions={questions}
          showBengali={showBengali}
          title="Interactive Examination Practice"
        />

        <PlainTextPrint
          content={noteText}
          title="Module 001_002: Sentence Anatomy Comprehensive Study Note"
        />

        <Teacher />
      </div>
    </div>
  );
}
