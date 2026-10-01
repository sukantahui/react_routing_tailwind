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
  Clock,
  Compass,
  Eye,
  Brain,
  Heart,
  Package,
  Activity,
  ToggleLeft,
  ToggleRight,
  XCircle,
  Sliders
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

export default function Topic2() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedDualVerb, setSelectedDualVerb] = useState("have");

  // Dual-Behavior Verbs Data
  const dualVerbs = {
    have: {
      verb: "HAVE",
      stative: {
        sense: "Possession / Relationship",
        example: "I have two laptops and a fast workstation.",
        exampleBn: "আমার দুটি ল্যাপটপ আছে (অধিকার/মালিকানা)।",
        warning: "✗ Never say: *'I am having two laptops'*"
      },
      dynamic: {
        sense: "Eating / Drinking / Experiencing an event",
        example: "We are having lunch with the Barrackpore faculty right now.",
        exampleBn: "আমরা এখন মধ্যাহ্নভোজন করছি (খাওয়ার চলমান ক্রিয়া)।",
        allowed: "✓ Perfectly valid: 'having a great time', 'having breakfast'"
      }
    },
    think: {
      verb: "THINK",
      stative: {
        sense: "Holding an Opinion / Belief",
        example: "I think that grammatical discipline empowers lucid expression.",
        exampleBn: "আমি মনে করি ব্যাকরণগত শৃঙ্খলা প্রকাশকে স্পষ্ট করে (মতামত)।",
        warning: "✗ Never say: *'I am thinking that you are right'*"
      },
      dynamic: {
        sense: "Active Mental Deliberation / Process",
        example: "Tuhina is thinking deeply about the syntactic problem.",
        exampleBn: "তুহিনা গভীরভাবে সমস্যাটি নিয়ে চিন্তা করছে (মনের সক্রিয় প্রক্রিয়া)।",
        allowed: "✓ Perfectly valid: 'thinking about the future', 'thinking of moving'"
      }
    },
    taste: {
      verb: "TASTE",
      stative: {
        sense: "Possessing an Inherent Flavor / Quality",
        example: "This freshly brewed Darjeeling tea tastes exquisite.",
        exampleBn: "চা-টির স্বাদ অসাধারণ (স্বাদ বা গুণ প্রকাশ)।",
        warning: "✗ Never say: *'This tea is tasting good'*"
      },
      dynamic: {
        sense: "The Action of Sampling / Tasting",
        example: "The master chef is tasting the soup to calibrate the spices.",
        exampleBn: "শেফ মশলার পরিমাণ পরীক্ষা করতে স্যুপ চেখে দেখছেন (সক্রিয় পরীক্ষা)।",
        allowed: "✓ Perfectly valid: 'is tasting the broth'"
      }
    },
    smell: {
      verb: "SMELL",
      stative: {
        sense: "Emitting an Olfactory Scent",
        example: "The garden roses smell wonderful in the morning mist.",
        exampleBn: "গোলাপগুলো চমৎকার সুবাস ছড়াচ্ছে (অন্তর্নিহিত গন্ধ)।",
        warning: "✗ Never say: *'The rose is smelling good'*"
      },
      dynamic: {
        sense: "The Action of Sniffing / Inhaling Scent",
        example: "Swadeep is smelling the perfume sample in the chemistry lab.",
        exampleBn: "স্বদীপ পারফিউমের নমুনাটির গন্ধ শুঁকছে (সক্রিয় শারীরিক কাজ)।",
        allowed: "✓ Perfectly valid: 'is smelling the chemicals'"
      }
    },
    see: {
      verb: "SEE",
      stative: {
        sense: "Visual Perception / Mental Comprehension",
        example: "I see a flock of migratory birds in the sky. / I see your point.",
        exampleBn: "আমি আকাশে পাখি দেখতে পাচ্ছি / আমি তোমার কথা বুঝতে পারছি।",
        warning: "✗ Never say: *'I am seeing what you mean'*"
      },
      dynamic: {
        sense: "Meeting / Consulting / Visiting / Dating",
        example: "Dr. Roy is seeing patients at the clinic this afternoon.",
        exampleBn: "ডাক্তারবাবু আজ বিকেলে রোগী দেখছেন/পরামর্শ দিচ্ছেন (সাক্ষাৎকার)।",
        allowed: "✓ Perfectly valid: 'seeing a specialist tomorrow'"
      }
    },
    be: {
      verb: "BE",
      stative: {
        sense: "Permanent Nature / Characteristic Trait",
        example: "Abhronila is an exceptionally courteous and brilliant student.",
        exampleBn: "অভ্রনীলা চিরকালই নম্র ও ভদ্র স্বভাবের (স্থায়ী গুণ)।",
        warning: "✗ Stative trait: 'She is polite.'"
      },
      dynamic: {
        sense: "Temporary Deliberate Behavior / Acting",
        example: "Why is Rahul being so stubborn and difficult today?",
        exampleBn: "রাহুল আজ সাময়িকভাবে কেন এমন জেদ দেখাচ্ছে? (সাময়িক আচরণ)।",
        allowed: "✓ Perfectly valid: 'is being silly', 'is being rude'"
      }
    },
    weigh: {
      verb: "WEIGH",
      stative: {
        sense: "Static Measured Mass / Property",
        example: "This reference dictionary weighs nearly 2.5 kilograms.",
        exampleBn: "বইটির ওজন প্রায় আড়াই কেজি (স্থির পরিমাণ)।",
        warning: "✗ Never say: *'The dictionary is weighing 2.5 kg'*"
      },
      dynamic: {
        sense: "Active Process of Placing on a Scale",
        example: "The postal clerk is weighing the international parcel.",
        exampleBn: "পোস্টাল ক্লার্ক পার্সেলটির ওজন মাপছেন (ওজন করার কাজ)।",
        allowed: "✓ Perfectly valid: 'is weighing the shipment'"
      }
    }
  };

  // Stative Categories
  const stativeCategories = [
    {
      icon: Eye,
      title: "Perception & Senses",
      verbs: "see, hear, smell, taste, feel, notice, recognize, observe",
      rule: "Involuntary sensory perception cannot take -ing. Use 'I hear music' not *'I am hearing music'."
    },
    {
      icon: Brain,
      title: "Cognition & Thought",
      verbs: "know, understand, believe, suppose, doubt, remember, forget, mean, suspect, agree",
      rule: "Mental processes and convictions are states of mind. Use 'I understand' not *'I am understanding'."
    },
    {
      icon: Heart,
      title: "Emotion & Desire",
      verbs: "love, hate, like, dislike, prefer, want, wish, adore, detest, care, need",
      rule: "Emotional inclinations express enduring states. Use 'I prefer tea' not *'I am preferring tea'."
    },
    {
      icon: Package,
      title: "Possession & Inclusion",
      verbs: "have, own, possess, belong to, contain, consist of, include, hold, owe",
      rule: "Ownership and structural makeup are static facts. Use 'This belongs to me' not *'is belonging'."
    }
  ];

  // 25 Interactive Questions State
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (qId, optionIdx) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950/50 via-slate-900 to-indigo-950/40 p-8 sm:p-12 border border-amber-600/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <Clock className="w-3.5 h-3.5" />
                Topic 004_005_02 • Stative vs Dynamic Verbs
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Stative vs Dynamic Verbs
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Why perceptual, emotional, and cognitive verbs resist continuous aspect (<span className="text-rose-400 font-semibold">-ing</span>), and how to master verbs with <span className="text-amber-300 font-semibold">dual stative/dynamic behavior</span>.
              </p>
            </div>

            <button
              onClick={() => setShowBengali(!showBengali)}
              className="self-start md:self-center flex items-center gap-2.5 px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-amber-300 border border-amber-500/40 shadow-lg hover:shadow-amber-500/10 transition-all duration-200 text-sm font-medium"
            >
              <Languages className="w-4 h-4 text-amber-400" />
              <span>{showBengali ? "Switch to English View" : "বাংলা ব্যাখ্যা দেখুন (Bengali View)"}</span>
            </button>
          </div>

          {showBengali && (
            <div className="mt-6 p-4 rounded-xl bg-amber-950/40 border border-amber-600/40 text-amber-200 text-sm leading-relaxed animate-fade-in">
              <p className="font-semibold text-amber-300 mb-1">💡 বাংলা নির্দেশিকা (Bengali Guide):</p>
              Stative Verb হলো এমন কিছু ক্রিয়া যা কোনো শারীরিক কাজ নয়, বরং মানসিক অনুভূতি, ইন্দ্রিয়গত উপলব্ধি বা অধিকার প্রকাশ করে। এদের সাথে সাধারণত Continuous (-ing) বসে না (যেমন: "I am knowing him" বা "I am having two cars" মারাত্মক ভুল)।
            </div>
          )}
        </header>

        {/* ========================================================================= */}
        {/* SYNTACTIC CROSS-REFERENCE MATRIX                                          */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Grammar Nexus: Related Chapter Cross-References</h3>
              <p className="text-xs text-slate-300">Jump directly to interconnected syntax foundations</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/english-grammar/topic/004_001_verb-classification-and-characteristics/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-300 border border-sky-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Verb Classification</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/3"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Present Continuous Mechanics</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/4"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Present Perfect Consequence</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: 4 STATIVE CATEGORIES MATRIX                                 */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Layers className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. The 4 Major Classes of Stative Verbs</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                These verbs express non-physical states, resisting the progressive (-ing) form.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stativeCategories.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-white">{cat.title}</h3>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                      Key Verbs:
                    </span>
                    <p className="text-xs font-mono text-sky-300">{cat.verbs}</p>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{cat.rule}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: DUAL-BEHAVIOR VERB SIMULATOR STUDIO                         */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Sliders className="w-6 h-6 text-sky-400" />
            <div>
              <h2 className="text-xl font-bold text-white">2. Dual-Behavior Verb Studio: Stative vs Dynamic</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Select a verb to inspect how its meaning completely changes between Stative (State) and Dynamic (Action).
              </p>
            </div>
          </div>

          {/* Verb Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(dualVerbs).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedDualVerb(key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all border ${
                  selectedDualVerb === key
                    ? "bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-lg shadow-amber-500/20"
                    : "bg-slate-950 text-slate-300 hover:bg-slate-800 border-slate-800"
                }`}
              >
                {dualVerbs[key].verb}
              </button>
            ))}
          </div>

          {/* Active Dual Comparison Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Stative Side */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-sky-500/30 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    STATIVE SENSE (State / Property)
                  </span>
                  <span className="text-[10px] text-rose-400 font-mono font-bold">NO -ING FORM</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200">
                  Meaning: {dualVerbs[selectedDualVerb].stative.sense}
                </h4>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-sm font-semibold text-white">
                  "{dualVerbs[selectedDualVerb].stative.example}"
                </div>
                {showBengali && (
                  <p className="text-xs text-amber-200/90">
                    <strong>বাংলা:</strong> {dualVerbs[selectedDualVerb].stative.exampleBn}
                  </p>
                )}
              </div>
              <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300">
                {dualVerbs[selectedDualVerb].stative.warning}
              </div>
            </div>

            {/* Dynamic Side */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    DYNAMIC SENSE (Action / Event)
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">-ING PERMITTED</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200">
                  Meaning: {dualVerbs[selectedDualVerb].dynamic.sense}
                </h4>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-sm font-semibold text-white">
                  "{dualVerbs[selectedDualVerb].dynamic.example}"
                </div>
                {showBengali && (
                  <p className="text-xs text-amber-200/90">
                    <strong>বাংলা:</strong> {dualVerbs[selectedDualVerb].dynamic.exampleBn}
                  </p>
                )}
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300">
                {dualVerbs[selectedDualVerb].dynamic.allowed}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SECTION 3: 25-QUESTION INTERACTIVE MASTERY QUIZ                        */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-amber-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Topic 004_005_02 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Test your diagnostics on stative classifications, dual-behavior verbs, and error-spotting.
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
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-600/30 transition-all"
              >
                Submit Answers ({Object.keys(userAnswers).length} / {questions.length} answered)
              </button>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 5. PRINT & AUXILIARY STUDY TOOLS                                          */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <PlainTextPrint content={noteText} title="Module 004.005 Topic 2 Note - Stative vs Dynamic Verbs" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            faqList={[
              {
                question: "Why is 'I am having two laptops' ungrammatical?",
                answer: "'Have' when expressing possession, ownership, or relationships is a stative verb and cannot take the continuous progressive form (-ing). You must say 'I have two laptops'. You can only use 'having' for dynamic actions like eating ('I am having lunch') or experiences ('I am having fun')."
              },
              {
                question: "Can 'think' ever be used in the continuous tense?",
                answer: "Yes! When 'think' refers to an active, deliberate mental process (e.g. 'I am thinking about your suggestion'), it is dynamic and accepts continuous forms. But when 'think' means 'believe / hold an opinion' (e.g. 'I think he is honest'), it is stative and cannot take -ing."
              },
              {
                question: "What is the difference between 'The soup tastes delicious' and 'The chef is tasting the soup'?",
                answer: "In 'The soup tastes delicious', 'taste' describes the static flavor property of the soup (Stative). In 'The chef is tasting the soup', the chef is physically sampling the food with a spoon (Dynamic action)."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/1"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 1 (Simple Present Tense)</span>
          </a>

          <a
            href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/3"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 3 (Present Continuous Tense)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
