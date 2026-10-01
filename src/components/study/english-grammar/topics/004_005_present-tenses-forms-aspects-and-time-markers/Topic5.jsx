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
  MapPin,
  PlaneTakeoff,
  PlaneLanding,
  Home,
  Navigation,
  Sliders
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

export default function Topic5() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedLocationState, setSelectedLocationState] = useState("at_destination");

  // Whereabouts Scenarios
  const scenarios = {
    at_destination: {
      status: "Currently at Destination / In Transit",
      phrase: "HAS GONE TO",
      trajectory: "Kolkata ──────✈──────> Mumbai (Still There!)",
      color: "border-amber-500/50 bg-amber-950/20 text-amber-300",
      icon: PlaneTakeoff,
      desc: "The subject has departed for the destination and has NOT returned. They are either currently at the destination or en route.",
      example: "Rahul is not in Barrackpore right now; he has gone to Mumbai for a tech summit.",
      exampleBn: "রাহুল বর্তমানে ব্যারাকপুরে নেই; সে মুম্বাই গেছে (এবং এখনো মুম্বাইতেই আছে)।"
    },
    returned_home: {
      status: "Visited and Has Returned Home",
      phrase: "HAS BEEN TO",
      trajectory: "Kolkata ──✈──> Mumbai ──✈──> Kolkata (Back Home!)",
      color: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300",
      icon: PlaneLanding,
      desc: "The subject traveled to the destination in the past, completed the journey, and has returned to the point of origin. Expresses life travel experience.",
      example: "Rahul is standing right here in our classroom; he has been to Mumbai three times.",
      exampleBn: "রাহুল আমাদের সামনেই দাঁড়িয়ে আছে; সে তিনবার মুম্বাই ঘুরে এসেছে (অভিজ্ঞতা)।"
    },
    continuous_residence: {
      status: "Continuous Dwelling / Residence",
      phrase: "HAS BEEN IN",
      trajectory: "Living inside Mumbai for a continuous span of time",
      color: "border-sky-500/50 bg-sky-950/20 text-sky-300",
      icon: Home,
      desc: "The subject has lived or stayed continuously within that geographical location over a stated duration.",
      example: "Professor Roy has been in Mumbai for five years conducting linguistic research.",
      exampleBn: "অধ্যাপক রায় গত পাঁচ বছর ধরে মুম্বাইতে একটানা বসবাস করছেন।"
    }
  };

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
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950/60 via-slate-900 to-indigo-950/40 p-8 sm:p-12 border border-amber-500/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <Clock className="w-3.5 h-3.5" />
                Topic 004_005_05 • 'Has Gone To' vs 'Has Been To'
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                'Has Gone To' vs 'Has Been To'
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                The critical distinction between <span className="text-amber-300 font-semibold">'Has Gone To'</span> (Subject is currently absent / not returned) vs <span className="text-emerald-400 font-semibold">'Has Been To'</span> (Subject visited and has returned home) vs <span className="text-sky-300 font-semibold">'Has Been In'</span> (Dwelling).
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
              'Has gone to' মানে ব্যক্তিটি সেই স্থানে গেছে এবং এখনো সেখানে আছে (ফিরে আসেনি)। আর 'Has been to' মানে ব্যক্তিটি সেই স্থানে গিয়েছিল এবং সেখান থেকে ফিরে এসেছে। অতএব কারো সামনে দাঁড়িয়ে কখনোই "I have gone to London" বলা যাবে না; বলতে হবে "I have been to London"।
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
              href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/4"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Present Perfect Consequence</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/6"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-300 border border-sky-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Since vs For Axis</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <a
              href="/english-grammar/topic/006_001_prepositions-of-time-place-direction-and-agency/0"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 text-xs font-medium transition flex items-center gap-1.5"
            >
              <span>Prepositions of Place (To vs In)</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SECTION 1: TRAJECTORY & WHEREABOUTS SIMULATOR                          */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Sliders className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. Physical Whereabouts & Travel Trajectory Studio</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Select the physical status of the subject to see the exact grammatical formula and travel path.
              </p>
            </div>
          </div>

          {/* Status Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.keys(scenarios).map((key) => {
              const ScIcon = scenarios[key].icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedLocationState(key)}
                  className={`p-4 rounded-xl text-left border transition-all flex items-center gap-3 ${
                    selectedLocationState === key
                      ? "bg-amber-600 text-slate-950 font-bold border-amber-400 shadow-lg shadow-amber-600/20"
                      : "bg-slate-950 text-slate-300 hover:bg-slate-800 border-slate-800"
                  }`}
                >
                  <ScIcon className="w-5 h-5 shrink-0" />
                  <div>
                    <div className="text-xs uppercase font-mono tracking-wider opacity-80">{scenarios[key].phrase}</div>
                    <div className="text-sm font-bold">{scenarios[key].status}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Status Trajectory Card */}
          <div className={`p-6 rounded-2xl border space-y-4 ${scenarios[selectedLocationState].color}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs uppercase font-mono font-bold px-3 py-1 rounded-full bg-slate-950 border border-slate-800">
                Formula: {scenarios[selectedLocationState].phrase}
              </span>
              <span className="text-xs font-bold text-white">
                Trajectory: {scenarios[selectedLocationState].trajectory}
              </span>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed">
              {scenarios[selectedLocationState].desc}
            </p>

            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1 text-white">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Example:</span>
              <p className="text-sm font-semibold text-white">
                "{scenarios[selectedLocationState].example}"
              </p>
              {showBengali && (
                <p className="text-xs text-amber-300/90 pt-1">
                  <strong>বাংলা:</strong> {scenarios[selectedLocationState].exampleBn}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 2: THE FIRST-PERSON PARADOX ALERT CARD                         */}
        {/* ========================================================================= */}
        <section className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex items-start gap-4 shadow-xl">
          <AlertTriangle className="w-7 h-7 text-rose-400 shrink-0 mt-1" />
          <div className="space-y-2">
            <h3 className="text-base font-bold text-rose-300 uppercase tracking-wider">
              The First-Person Paradox: Why "I have gone to London" is Impossible
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              When speaking face-to-face with someone, you CANNOT say <span className="text-rose-400 font-mono font-bold">"I have gone to [Place]"</span> because 'gone to' means the subject is physically absent and currently at the destination. Since you are present before the listener, you must say:
              <br />
              ✓ <strong className="text-emerald-400">"I have been to London."</strong> (I visited in the past and am now standing right here!).
            </p>
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
                <h2 className="text-xl font-bold text-white">3. Topic 004_005_05 Mastery Lab (25 MCQs)</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive test on 'has gone to' (absence), 'has been to' (return/experience), and 'has been in' (dwelling).
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
          <PlainTextPrint content={noteText} title="Module 004.005 Topic 5 Note - 'Has Gone To' vs 'Has Been To'" />
          <WordDictionary />
          <Teacher />
          <FAQTemplate
            faqList={[
              {
                question: "What is the exact physical difference between 'gone to' and 'been to'?",
                answer: "'Has gone to' means the subject departed for the destination and is STILL THERE or on the way (absent). 'Has been to' means the subject visited the destination in the past and has now RETURNED home (completed round-trip)."
              },
              {
                question: "When should we use 'has been in' instead of 'has been to'?",
                answer: "Use 'has been in' when expressing continuous residence, living, or dwelling within a city or country over an extended duration (e.g. 'He has been in Kolkata for ten years')."
              },
              {
                question: "Why do travel experience questions always use 'been to' (e.g. 'Have you ever been to Paris?')?",
                answer: "Because you are asking a person standing in front of you if they have ever visited that place and returned in their lifetime. Asking 'Have you ever gone to Paris?' is unnatural and illogical in standard English."
              }
            ]}
          />
        </section>

        {/* Navigation Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <a
            href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/4"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 4 (Present Perfect)</span>
          </a>

          <a
            href="/english-grammar/topic/004_005_present-tenses-forms-aspects-and-time-markers/6"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950 transition"
          >
            <span>Next: Topic 6 (Present Perfect Continuous & Since/For)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
