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
  Scale,
  ShieldCheck,
  Columns,
  Table,
  Sliders,
  Volume2
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedConfusableIndex, setSelectedConfusableIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (questionId, optionIdx) => {
    if (submitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  const confusablePairs = [
    {
      title: "Lie (Recline) vs Lay (Place) vs Lie (Untruth)",
      verbs: [
        {
          name: "Lie (Recline / Rest)",
          transitivity: "Intransitive (No Object)",
          v1: "lie",
          v2: "lay",
          v3: "lain",
          v4: "lying",
          v5: "lies",
          example: "The tired scholar lay under the banyan tree yesterday.",
          exampleBn: "ক্লান্ত পণ্ডিতমশাই গতকাল বটগাছের নিচে শুয়েছিলেন।"
        },
        {
          name: "Lay (Put / Place something)",
          transitivity: "Transitive (Requires Object)",
          v1: "lay",
          v2: "laid",
          v3: "laid",
          v4: "laying",
          v5: "lays",
          example: "Please lay the manuscripts carefully on the desk.",
          exampleBn: "দয়া করে পাণ্ডুলিপিগুলো সতর্কতার সাথে টেবিলের ওপর রাখুন।"
        },
        {
          name: "Lie (Tell an Untruth)",
          transitivity: "Intransitive (No Object)",
          v1: "lie",
          v2: "lied",
          v3: "lied",
          v4: "lying",
          v5: "lies",
          example: "He lied under oath in the courtroom.",
          exampleBn: "তিনি আদালতে শপথ নিয়ে মিথ্যা বলেছিলেন।"
        }
      ],
      rule: "The Transitivity Test: If there is an object receiving the action (placing something), use LAY. If the subject itself is resting or reclining, use LIE.",
      ruleBn: "মনে রাখুন: কোনো কিছু রাখা বোঝালে এবং Object থাকলে 'Lay' (Laid, Laid); কিন্তু নিজে শোয়া বা বিশ্রাম নেওয়া বোঝালে 'Lie' (Lay, Lain)।"
    },
    {
      title: "Rise (Ascend) vs Raise (Elevate)",
      verbs: [
        {
          name: "Rise (Go Up / Ascend)",
          transitivity: "Intransitive (No Object)",
          v1: "rise",
          v2: "rose",
          v3: "risen",
          v4: "rising",
          v5: "rises",
          example: "The morning sun rises majestically over the Ganges.",
          exampleBn: "গঙ্গার ওপর প্রভাতসূর্য মহিমান্বিতভাবে উদিত হয়।"
        },
        {
          name: "Raise (Lift / Elevate / Collect)",
          transitivity: "Transitive (Requires Object)",
          v1: "raise",
          v2: "raised",
          v3: "raised",
          v4: "raising",
          v5: "raises",
          example: "The delegates raised critical questions about education policy.",
          exampleBn: "প্রতিনিধিরা শিক্ষানীতি নিয়ে গুরুত্বপূর্ণ প্রশ্ন উত্থাপন করেছিলেন।"
        }
      ],
      rule: "Rise is intransitive (action happens by itself); Raise is transitive (agent lifts an external object).",
      ruleBn: "'Rise' স্বয়ং উদিত হওয়া বা ওঠা (Intransitive); 'Raise' কোনো কিছুকে তোলা বা বাড়ানো (Transitive)।"
    },
    {
      title: "Fall (Drop by Gravity) vs Fell (Cut Down / Knock Down)",
      verbs: [
        {
          name: "Fall (Drop down)",
          transitivity: "Intransitive (No Object)",
          v1: "fall",
          v2: "fell",
          v3: "fallen",
          v4: "falling",
          v5: "falls",
          example: "Ripe mangoes fell from the orchard trees.",
          exampleBn: "বাগান থেকে পাকা আমগুলো নিচে পড়ে গেল।"
        },
        {
          name: "Fell (Cut / Chop Down)",
          transitivity: "Transitive (Requires Object)",
          v1: "fell",
          v2: "felled",
          v3: "felled",
          v4: "felling",
          v5: "fells",
          example: "The workers felled five old trees to widen the highway.",
          exampleBn: "হাইওয়ে চওড়া করার জন্য কর্মীরা পাঁচটি পুরনো গাছ কেটে ফেললেন।"
        }
      ],
      rule: "Fell as a present base verb is transitive and means to chop or knock down (felled, felled).",
      ruleBn: "'Fall' নিজে থেকে নিচে পড়া (Fell, Fallen); 'Fell' কোনো কিছুকে কেটে বা আঘাত করে ফেলে দেওয়া (Felled, Felled)।"
    },
    {
      title: "Hang (Execution) vs Hang (Suspend Object)",
      verbs: [
        {
          name: "Hang (Capital Punishment)",
          transitivity: "Transitive (Human Execution)",
          v1: "hang",
          v2: "hanged",
          v3: "hanged",
          v4: "hanging",
          v5: "hangs",
          example: "The conspirator was hanged by the court's decree.",
          exampleBn: "আদালতের নির্দেশে ষড়যন্ত্রকারীকে ফাঁসি দেওয়া হয়েছিল।"
        },
        {
          name: "Hang (Suspend Item on Wall/Peg)",
          transitivity: "Transitive / Intransitive",
          v1: "hang",
          v2: "hung",
          v3: "hung",
          v4: "hanging",
          v5: "hangs",
          example: "She hung the oil painting in the central gallery.",
          exampleBn: "তিনি কেন্দ্রীয় গ্যালারিতে তৈলচিত্রটি টাঙিয়ে দিলেন।"
        }
      ],
      rule: "Hanged is strictly reserved for death by hanging. Hung is used for pictures, clothes, and suspended objects.",
      ruleBn: "ফাঁসি দেওয়া অর্থে সর্বদা 'hanged'; ছবি বা কোনো জিনিস টাঙানো অর্থে 'hung'।"
    },
    {
      title: "Find (Discover) vs Found (Establish / Set Up)",
      verbs: [
        {
          name: "Find (Discover / Locate)",
          transitivity: "Transitive",
          v1: "find",
          v2: "found",
          v3: "found",
          v4: "finding",
          v5: "finds",
          example: "The archaeologist found ancient coins near Barrackpore.",
          exampleBn: "প্রত্নতাত্ত্বিক ব্যারাকপুরের কাছে প্রাচীন মুদ্রা খুঁজে পেলেন।"
        },
        {
          name: "Found (Establish / Build Basis)",
          transitivity: "Transitive (Regular)",
          v1: "found",
          v2: "founded",
          v3: "founded",
          v4: "founding",
          v5: "founds",
          example: "The trust founded this premier academy in 1998.",
          exampleBn: "ট্রাস্টটি ১৯৯৮ সালে এই শীর্ষ অ্যাকাডেমিটি প্রতিষ্ঠা করেছিল।"
        }
      ],
      rule: "'Found' as a base verb is regular (founded, founded) and means establishing an institution.",
      ruleBn: "খুঁজে পাওয়া অর্থে 'find → found → found'; কোনো প্রতিষ্ঠান স্থাপন করা অর্থে মূল Verb 'found → founded → founded'।"
    }
  ];

  const invariantVerbs = [
    { verb: "Burst", v2: "burst", v3: "burst", meaning: "ফেটে যাওয়া / হঠাৎ বের হওয়া" },
    { verb: "Broadcast", v2: "broadcast", v3: "broadcast", meaning: "সম্প্রচার করা" },
    { verb: "Cast", v2: "cast", v3: "cast", meaning: "নিক্ষেপ করা / ভোট দেওয়া" },
    { verb: "Cost", v2: "cost", v3: "cost", meaning: "দাম হওয়া / খরচ হওয়া" },
    { verb: "Cut", v2: "cut", v3: "cut", meaning: "কাটা" },
    { verb: "Hit", v2: "hit", v3: "hit", meaning: "আঘাত করা" },
    { verb: "Hurt", v2: "hurt", v3: "hurt", meaning: "আঘাত দেওয়া / কষ্ট পাওয়া" },
    { verb: "Let", v2: "let", v3: "let", meaning: "অনুমতি দেওয়া" },
    { verb: "Put", v2: "put", v3: "put", meaning: "রাখা" },
    { verb: "Set", v2: "set", v3: "set", meaning: "স্থাপন করা / অস্ত যাওয়া" },
    { verb: "Shed", v2: "shed", v3: "shed", meaning: "ঝরানো (অশ্রু/রক্ত/পাতা)" },
    { verb: "Shut", v2: "shut", v3: "shut", meaning: "বন্ধ করা" },
    { verb: "Slit", v2: "slit", v3: "slit", meaning: "চিড়ে ফেলা / ফালি করা" },
    { verb: "Spread", v2: "spread", v3: "spread", meaning: "ছড়িয়ে দেওয়া" },
    { verb: "Split", v2: "split", v3: "split", meaning: "বিভক্ত করা" },
    { verb: "Telecast", v2: "telecast", v3: "telecast", meaning: "টিভিতে সম্প্রচার করা" },
    { verb: "Thrust", v2: "thrust", v3: "thrust", meaning: "গুঁজে দেওয়া / ধাক্কা দেওয়া" }
  ];

  const phoneticRules = [
    {
      sound: "/t/ ending",
      trigger: "After voiceless consonants (/p/, /k/, /s/, /ʃ/, /tʃ/, /f/)",
      examples: "worked (/wɜːkt/), stopped (/stɒpt/), laughed (/lɑːft/), washed (/wɒʃt/)"
    },
    {
      sound: "/d/ ending",
      trigger: "After voiced consonants (/b/, /g/, /v/, /z/, /m/, /n/, /l/) & all vowels",
      examples: "played (/pleɪd/), cleaned (/kliːnd/), robbed (/rɒbd/), called (/kɔːld/)"
    },
    {
      sound: "/ɪd/ ending",
      trigger: "After dental stops (/t/, /d/) — creates an extra syllable",
      examples: "wanted (/ˈwɒntɪd/), decided (/dɪˈsaɪdɪd/), planted (/ˈplɑːntɪd/)"
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
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Segment 4 · Dynamic Core
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Module 004_002 · Master Reference
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Regular vs Irregular Verbs, 5 Principal Forms & Confusable Pairs
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Master the morphological mutations of English verbs: Weak vs Strong roots, 3-form invariable verbs, and eliminate the most notorious competitive exam traps (Lie vs Lay, Rise vs Raise, Fall vs Fell, Hang vs Hung/Hanged).
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
                    ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-white border-amber-400/50 shadow-amber-950/50 ring-2 ring-amber-500/20"
                    : "bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white"
                }`}
              >
                <Languages className={`w-4 h-4 transition-transform duration-300 ${showBengali ? "rotate-180 text-white" : "text-indigo-400"}`} />
                <span>{showBengali ? "বাংলা ব্যাখ্যা সক্রিয় (Active)" : "বাংলা ব্যাখ্যা দেখুন (Toggle বাংলা)"}</span>
              </button>
            </div>
          </div>

          {showBengali && (
            <div className="mt-6 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-sm flex items-start gap-3 animate-fade-in">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-300">ক্রিয়া রূপান্তর ও ভ্রান্তি দূরীকরণ নির্দেশিকা:</p>
                <p className="text-amber-200/90 text-xs mt-1 leading-relaxed">
                  ইংরেজি ব্যাকরণে সবচেয়ে বেশি ভুল হয় <strong>Irregular Verbs</strong> এবং বিভ্রান্তিকর জোড়া (Confusable Pairs) যেমন <em>Lie/Lay</em> বা <em>Rise/Raise</em>-এর ক্ষেত্রে। নিচের ইন্টারেক্টিভ ল্যাবের সাহায্যে Transitive বনাম Intransitive পার্থক্য, উচ্চারণের নিয়মাবলী ও ৫টি রূপ (V1-V5) নিখুঁতভাবে আয়ত্ত করুন।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Confusable Pairs Workbench */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Scale className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white">Confusable Verb Pairs Diagnostic Studio</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Exam Trap Dissector</span>
          </div>

          {/* Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {confusablePairs.map((pair, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedConfusableIndex(idx)}
                className={`p-3 rounded-2xl text-left text-xs font-semibold transition border ${
                  selectedConfusableIndex === idx
                    ? "bg-amber-600 text-white border-amber-400 shadow-lg shadow-amber-950"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="text-[10px] uppercase font-mono opacity-75">Trap #{idx + 1}</div>
                <div className="mt-1 font-bold truncate">{pair.title.split(" vs ")[0]}</div>
              </button>
            ))}
          </div>

          {/* Active Card Breakdown */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-5 animate-fade-in">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
              {confusablePairs[selectedConfusableIndex].title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {confusablePairs[selectedConfusableIndex].verbs.map((v, vIdx) => (
                <div key={vIdx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">{v.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                      {v.transitivity.split(" ")[0]}
                    </span>
                  </div>

                  {/* 5-Forms Pills */}
                  <div className="grid grid-cols-5 gap-1 text-center font-mono text-[11px]">
                    <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                      <div className="text-[9px] text-slate-500">V1</div>
                      <div className="text-amber-200 font-bold">{v.v1}</div>
                    </div>
                    <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                      <div className="text-[9px] text-slate-500">V2</div>
                      <div className="text-indigo-300 font-bold">{v.v2}</div>
                    </div>
                    <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                      <div className="text-[9px] text-slate-500">V3</div>
                      <div className="text-emerald-300 font-bold">{v.v3}</div>
                    </div>
                    <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                      <div className="text-[9px] text-slate-500">V4</div>
                      <div className="text-cyan-300">{v.v4}</div>
                    </div>
                    <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                      <div className="text-[9px] text-slate-500">V5</div>
                      <div className="text-pink-300">{v.v5}</div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                    <div className="font-semibold text-white">"{v.example}"</div>
                    {showBengali && <div className="text-amber-300/80 text-[11px] mt-1">{v.exampleBn}</div>}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Sukanta Sir's Diagnostic Invariant</span>
              <p className="text-xs text-slate-200 leading-relaxed">{confusablePairs[selectedConfusableIndex].rule}</p>
              {showBengali && (
                <p className="text-xs text-amber-300/90 pt-1 border-t border-amber-500/20 leading-relaxed">
                  <strong>বাংলা টিপস:</strong> {confusablePairs[selectedConfusableIndex].ruleBn}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Invariable 3-Form Verbs Catalog */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Table className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">The Invariable 3-Form Verbs Catalog (V1 = V2 = V3)</h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold font-mono">
              Never add '-ed'
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {invariantVerbs.map((inv, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white font-mono text-sm">{inv.verb}</span>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  V2: {inv.v2} · V3: {inv.v3}
                </div>
                {showBengali && (
                  <div className="text-[10px] text-emerald-300/80 truncate">{inv.meaning}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Regular Verb Phonetics Studio */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Volume2 className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Phonetics of Regular Past Endings (-ed Rules)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {phoneticRules.map((pr, pIdx) => (
              <div key={pIdx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-300 font-mono">{pr.sound}</span>
                <p className="text-xs text-slate-300 leading-relaxed">{pr.trigger}</p>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-200">
                  {pr.examples}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive MCQ Diagnostic Assessment */}
        <section className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-amber-400" />
              <div>
                <h2 className="text-xl font-bold text-white">Interactive Diagnostic Assessment</h2>
                <p className="text-xs text-slate-400">
                  25 Board & Competitive Examination Level Questions with Instant Feedback
                </p>
              </div>
            </div>

            {submitted && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
                  Score: {calculateScore()} / {questions.length} (
                  {Math.round((calculateScore() / questions.length) * 100)}%)
                </span>
                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all border border-slate-700"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Retry
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {questions.map((q, qIndex) => {
              const selectedOpt = userAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = submitted && selectedOpt === q.correctAnswer;
              const isWrong = submitted && isAnswered && selectedOpt !== q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border transition-all ${
                    submitted
                      ? isCorrect
                        ? "bg-emerald-950/20 border-emerald-500/40"
                        : "bg-rose-950/20 border-rose-500/40"
                      : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-bold text-amber-400 font-mono">Q{qIndex + 1}.</span>
                    <p className="text-sm sm:text-base font-semibold text-slate-100 flex-1">
                      {q.question}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isThisSelected = selectedOpt === optIdx;
                      let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800";

                      if (submitted) {
                        if (optIdx === q.correctAnswer) {
                          btnStyle = "bg-emerald-900/40 border-emerald-500 text-emerald-200 font-semibold";
                        } else if (isThisSelected) {
                          btnStyle = "bg-rose-900/40 border-rose-500 text-rose-200";
                        } else {
                          btnStyle = "bg-slate-900/40 border-slate-800/40 text-slate-500 opacity-60";
                        }
                      } else if (isThisSelected) {
                        btnStyle = "bg-amber-500/20 border-amber-500 text-amber-200 font-semibold";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={submitted}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm border transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {submitted && optIdx === q.correctAnswer && (
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {submitted && (
                    <div className="mt-3 pt-3 border-t border-slate-800 text-xs space-y-1.5 animate-fade-in">
                      <p className="text-slate-300">
                        <strong className="text-amber-400">Explanation:</strong> {q.explanation}
                      </p>
                      {showBengali && q.explanationBn && (
                        <p className="text-amber-300/90 font-medium">
                          <strong>বাংলা ব্যাখ্যা:</strong> {q.explanationBn}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!submitted && (
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(userAnswers).length === 0}
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-600/30 transition-all"
              >
                Submit Answers ({Object.keys(userAnswers).length} / {questions.length} answered)
              </button>
            </div>
          )}
        </section>

        {/* Auxiliary Components */}
        <section className="space-y-8">
          <PlainTextPrint
            content={noteText}
            title="Module 004.002 Study Note: Regular vs Irregular Verbs & Confusables"
          />

          <WordDictionary />

          <Teacher
            note="Never stumble over 'lie' and 'lay' again! Remember: if there is an object to receive the action, choose LAY. If resting, choose LIE. — Sukanta Hui"
          />

          <FAQTemplate
            faqList={[
              {
                question: "What is the past tense of 'lie' (to recline) versus 'lay' (to place)?",
                answer: "The past tense of intransitive 'lie' (recline/rest) is 'lay' ('Yesterday he lay in bed'). The past tense of transitive 'lay' (put something down) is 'laid' ('She laid the keys on the desk')."
              },
              {
                question: "When is 'hanged' used instead of 'hung'?",
                answer: "'Hanged' is strictly reserved for human capital punishment or suicide by rope ('The murderer was hanged at dawn'). 'Hung' is used for suspending objects or pictures ('She hung the picture on the wall')."
              },
              {
                question: "Why is 'broadcasted' or 'telecasted' considered incorrect in formal English?",
                answer: "Compounds formed with the root 'cast' follow the invariable 3-form pattern (cast -> cast → cast). In standard formal English, the past forms remain 'broadcast' and 'telecast' without adding '-ed'."
              },
              {
                question: "What is the difference between 'drunk' and 'drunken'?",
                answer: "'Drunk' is the verbal past participle used with auxiliaries ('He has drunk all the water'). 'Drunken' is an attributive adjective placed directly before a noun ('A drunken brawl broke out')."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/004_001_verb-classification-and-characteristics/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Module 004_001 (Verb Classification)</span>
          </a>

          <a
            href="/english-grammar/topic/004_003_causative-inchoative-and-ergative-verbs/0"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Module 004_003 (Causative & Ergative Verbs)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
