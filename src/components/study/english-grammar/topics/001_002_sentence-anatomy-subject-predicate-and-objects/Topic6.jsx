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
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

export default function Topic6() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);

  // 8 Multi-Domain SVOC Examples
  const svocExamples = [
    {
      id: 0,
      title: "Verbs of Designation / Election (Elect/Appoint/Name)",
      domain: "Corporate & Civic Leadership",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      sentence: "The executive board appointed Debangshu lead technical director.",
      verb: "appointed (Complex-Transitive)",
      directObject: "Debangshu",
      objectComplement: "lead technical director (Noun Phrase)",
      equalityFormula: "Debangshu == lead technical director",
      passiveTransformation: "Debangshu was appointed lead technical director by the executive board. (SVOC $\rightarrow$ SVC)",
      analysisBn: "'appointed' Complex-Transitive Verb Direct Object 'Debangshu'-র নতুন পদমর্যাদা প্রকাশ করতে 'lead technical director' Object Complement গ্রহণ করেছে ('as' ব্যবহার করা বাহুল্য)।"
    },
    {
      id: 1,
      title: "Verbs of Resultative Transformation (Paint/Make/Render)",
      domain: "Civil Engineering & Architecture",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      sentence: "The interior decorator painted the entire seminar hall immaculate white.",
      verb: "painted (Resultative Complex-Transitive)",
      directObject: "the entire seminar hall",
      objectComplement: "immaculate white (Adjective Phrase)",
      equalityFormula: "Hall == immaculate white",
      passiveTransformation: "The entire seminar hall was painted immaculate white by the decorator.",
      analysisBn: "'immaculate white' Adjective-টি 'painted' কাজের ফলস্বরূপ হলের নতুন রূপ প্রকাশ করে Object Complement হিসেবে বসেছে।"
    },
    {
      id: 2,
      title: "Verbs of Mental Evaluation / Judgement (Consider/Deem/Judge)",
      domain: "Law & Philosophy",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      sentence: "The appellate tribunal considered the proposed regulation unconstitutional.",
      verb: "considered (Cognitive Complex-Transitive)",
      directObject: "the proposed regulation",
      objectComplement: "unconstitutional (Adjective)",
      equalityFormula: "Regulation == unconstitutional",
      passiveTransformation: "The proposed regulation was considered unconstitutional by the tribunal.",
      analysisBn: "'considered' Verb Direct Object 'regulation'-এর ওপর বিচারিক মূল্যায়ন প্রকাশ করতে Object Complement 'unconstitutional' নিয়েছে।"
    },
    {
      id: 3,
      title: "Verbs of State-Altering Causation (Drive/Make/Keep)",
      domain: "Psychology & Everyday Life",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      sentence: "The continuous server alarms drove the on-call engineer frantic.",
      verb: "drove (Causative State Verb)",
      directObject: "the on-call engineer",
      objectComplement: "frantic (Adjective of Mental State)",
      equalityFormula: "Engineer == frantic",
      passiveTransformation: "The on-call engineer was driven frantic by the continuous server alarms.",
      analysisBn: "'drove' এখানে গাড়ি চালানো নয়, বরং কর্তার অবস্থা পরিবর্তনকারী Verb; 'frantic' হলো Engineer-এর মানসিক অবস্থা নির্দেশক Object Complement।"
    },
    {
      id: 4,
      title: "Perception Verb with Bare Infinitive Complement (See/Hear/Watch)",
      domain: "Aviation & Observation",
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      sentence: "The air traffic controller watched the supersonic jet land safely on the runway.",
      verb: "watched (Sensory Complex-Transitive)",
      directObject: "the supersonic jet",
      objectComplement: "land safely on the runway (Bare Infinitive Clause Complement)",
      equalityFormula: "Jet == [land safely]",
      passiveTransformation: "The supersonic jet was watched TO LAND safely on the runway.",
      analysisBn: "Active Voice-এ 'watched'-এর পর Bare Infinitive ('land') Object Complement হিসেবে বসে; কিন্তু Passive-এ 'to land' রূপ নেয়।"
    },
    {
      id: 5,
      title: "Perception Verb with Present Participle Complement (Ongoing Action)",
      domain: "Classroom Observation",
      badge: "bg-teal-500/20 text-teal-300 border-teal-500/30",
      sentence: "Mentor Sukanta Sir observed the programming cohort debugging asynchronous APIs.",
      verb: "observed",
      directObject: "the programming cohort",
      objectComplement: "debugging asynchronous APIs (Participial Phrase Complement)",
      equalityFormula: "Cohort == [debugging APIs]",
      passiveTransformation: "The programming cohort was observed debugging asynchronous APIs by Sukanta Sir.",
      analysisBn: "চলমান কাজের ক্ষেত্রে Present Participle Phrase ('debugging...') Direct Object-এর তাৎক্ষণিক অবস্থা প্রকাশ করতে Object Complement হিসেবে বসে।"
    },
    {
      id: 6,
      title: "SVOO vs SVOC Contrastive Demonstration (Cake vs Leader)",
      domain: "Syntactic Ambiguity",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      sentence: "Contrast: 'I made him a cake' (SVOO: him ≠ cake) vs 'I made him a leader' (SVOC: him == leader).",
      verb: "made (Ditransitive vs Complex-Transitive)",
      directObject: "In SVOC: 'him' (DO) + 'a leader' (OC)",
      objectComplement: "'a leader' (OC in SVOC)",
      equalityFormula: "SVOO: IO ≠ DO | SVOC: DO == OC",
      passiveTransformation: "SVOO: A cake was made for him | SVOC: He was made a leader.",
      analysisBn: "'made him a cake' হলো SVOO (কেক এবং সে দুটি আলাদা জিনিস); কিন্তু 'made him a leader' হলো SVOC (সে নিজেই লিডার হলো: him == leader)।"
    },
    {
      id: 7,
      title: "Resultative Idiomatic SVOC Expression (Wipe/Knock)",
      domain: "Sports & Physical Action",
      badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      sentence: "The champion boxer knocked his formidable opponent unconscious in the third round.",
      verb: "knocked (Resultative Complex-Transitive)",
      directObject: "his formidable opponent",
      objectComplement: "unconscious (Adjective Result)",
      equalityFormula: "Opponent == unconscious",
      passiveTransformation: "His formidable opponent was knocked unconscious in the third round.",
      analysisBn: "'unconscious' Adjective-টি 'knocked' আঘাতের ফলে প্রতিপক্ষের অচেতন অবস্থা নির্দেশ করে Object Complement হিসেবে বসেছে।"
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
                  Module 001_002 · Topic 6
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Object Complements & Complex-Transitive Structures (SVOC)
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Deconstruct complex-transitive verbs (appoint, elect, make, consider, paint), the Direct Object == Object Complement equality formula, and passive transformations.
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
                  <strong>Object Complement:</strong> Complex-Transitive Verb-এর পর Direct Object-এর পরিচয় পুনর্নির্ধারণ বা গুণ প্রকাশ করার জন্য যে শব্দ বসে (যেমন: <em>appointed Debangshu director</em> বা <em>painted the door white</em>)। এখানে Direct Object == Object Complement।
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
                Object Complements in Very Simple Words
              </h2>
              <p className="text-slate-300 text-sm">
                An Object Complement is a title badge or paint job given directly to the Direct Object ($DO == OC$).
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 self-start sm:self-auto">
              Badge for Object ($==$)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Model 1: Title/Role Complement */}
            <div className="p-6 rounded-2xl bg-slate-950/90 border border-pink-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-pink-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-pink-400" />
                  1. Object Complement Noun (New Title)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-mono">
                  DO == New Title
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-white">
                "The board appointed Debangshu team captain."
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/30 space-y-1">
                  <span className="font-bold text-blue-300 font-mono">[The board]</span> $\rightarrow$ SUBJECT (Authority making appointment)
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
                  <span className="font-bold text-emerald-300 font-mono">[appointed]</span> $\rightarrow$ COMPLEX-TRANSITIVE VERB
                </div>
                <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-1">
                  <span className="font-bold text-purple-300 font-mono">[Debangshu]</span> $\rightarrow$ DIRECT OBJECT (The person chosen)
                </div>
                <div className="p-2.5 rounded-xl bg-pink-950/40 border border-pink-500/30 space-y-1">
                  <span className="font-bold text-pink-300 font-mono">[team captain]</span> $\rightarrow$ OBJECT COMPLEMENT (Debangshu == team captain)
                </div>
              </div>

              {showBengali && (
                <div className="p-3 rounded-xl bg-pink-950/40 border border-pink-500/30 text-[11px] text-pink-200 leading-relaxed">
                  <strong>সহজ ভাষায়:</strong> 'team captain' হলো Direct Object 'Debangshu'-র নতুন পদবি। এখানে 'as' ব্যবহার করা সম্পূর্ণ ভুল।
                </div>
              )}
            </div>

            {/* Model 2: Resultative Adjective Complement */}
            <div className="p-6 rounded-2xl bg-slate-950/90 border border-emerald-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-emerald-400" />
                  2. Resultative Adjective (New State)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  DO == New State
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center text-white">
                "The students painted the seminar hall bright white."
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/30 space-y-1">
                  <span className="font-bold text-blue-300 font-mono">[The students]</span> $\rightarrow$ SUBJECT
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
                  <span className="font-bold text-emerald-300 font-mono">[painted]</span> $\rightarrow$ VERB
                </div>
                <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-1">
                  <span className="font-bold text-purple-300 font-mono">[the seminar hall]</span> $\rightarrow$ DIRECT OBJECT (Target)
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
                  <span className="font-bold text-emerald-300 font-mono">[bright white]</span> $\rightarrow$ OBJECT COMPLEMENT (Hall == bright white)
                </div>
              </div>

              {showBengali && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-200 leading-relaxed">
                  <strong>সহজ ভাষায়:</strong> রং করার পর সেমিনার হলের নতুন রূপ প্রকাশ করছে 'bright white' (Object Complement)।
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Practice Questions */}
        <FAQTemplate
          questions={questions}
          showBengali={showBengali}
          title="Topic 6 Diagnostic Assessment"
        />

        <PlainTextPrint
          content={noteText}
          title="Topic 6: Object Complements & Complex-Transitive Comprehensive Note"
        />

        <Teacher />
      </div>
    </div>
  );
}
