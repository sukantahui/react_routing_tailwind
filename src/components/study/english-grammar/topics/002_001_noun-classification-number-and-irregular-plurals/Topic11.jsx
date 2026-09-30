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
  MessageSquare,
  Award,
  ShieldCheck,
  Flame,
  CheckCircle
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

export default function Topic11() {
  const [showBengali, setShowBengali] = useState(false);
  const [revealedErrors, setRevealedErrors] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const toggleRevealError = (id) => {
    setRevealedErrors(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectOption = (qId, optionIdx) => {
    if (submitted) return;
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  const spotTheErrorDrills = [
    {
      id: 1,
      badSentence: "The furnitures of our new Barrackpore computer laboratory were imported from Japan.",
      correctedSentence: "The furniture of our new Barrackpore computer laboratory was imported from Japan.",
      analysis: "'Furniture' is an uncountable mass noun. It never takes '-s' (*furnitures) and strictly governs a singular verb ('was').",
      bnAnalysis: "'Furniture' কখনো বহুবচন হয় না এবং এর সাথে Singular Verb 'was' বসে।"
    },
    {
      id: 2,
      badSentence: "The police has arrested the thieves and recovered the stolen jewellerys.",
      correctedSentence: "The police have arrested the thieves and recovered the stolen jewellery.",
      analysis: "'Police' is pluralia tantum taking plural 'have', and 'jewellery' is uncountable without '-s'.",
      bnAnalysis: "'Police' সর্বদা Plural Verb 'have' গ্রহণ করে এবং 'jewellery'-র সাথে 's' বসে না।"
    },
    {
      id: 3,
      badSentence: "All the commander-in-chiefs gathered to review the new military aircrafts.",
      correctedSentence: "All the commanders-in-chief gathered to review the new military aircraft.",
      analysis: "Plural suffix belongs to head noun 'commanders', and 'aircraft' is an invariable zero-plural without '-s'.",
      bnAnalysis: "সঠিক রূপ হলো 'commanders-in-chief' (মূল শব্দে 's') এবং 'aircraft' (zero plural, 's' ছাড়া)।"
    },
    {
      id: 4,
      badSentence: "This scientific criterias is not sufficient to validate the empirical datas.",
      correctedSentence: "These scientific criteria are not sufficient to validate the empirical data.",
      analysis: "'Criteria' and 'data' are classical Latin/Greek plurals governing 'These criteria are'.",
      bnAnalysis: "'Criteria' বহুবচন, তাই 'These criteria are' হবে এবং 'datas' এর বদলে 'data' হবে।"
    },
    {
      id: 5,
      badSentence: "His mathematics is weak, but his knowledges of physics are remarkable.",
      correctedSentence: "His mathematics are weak, but his knowledge of physics is remarkable.",
      analysis: "'His mathematics' (calculation skills) takes 'are'; 'knowledge' is uncountable and takes 'is'.",
      bnAnalysis: "হিসাবের দক্ষতা অর্থে 'mathematics are'; কিন্তু 'knowledge' Uncountable হওয়ায় 'knowledge is' হবে।"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* HERO HEADER */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Module 002_001 · Topic 11 (Capstone)
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Classroom & Diagnostic Lab
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Classroom Dialogue & Module Diagnostic Practice Lab
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                Synthesize all 10 topics of Module 002_001 through real classroom dialogues with Sukanta Sir, interactive error-spotting drills, and a comprehensive 10-question capstone diagnostic test.
              </p>
            </div>

            <button
              onClick={() => setShowBengali(prev => !prev)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs font-bold transition-all shadow-lg hover:border-indigo-400 shrink-0 self-start md:self-auto"
            >
              <Languages className="w-4 h-4 text-indigo-400" />
              <span>{showBengali ? "Hide Bengali / বাংলা লুকান" : "Show Bengali / বাংলা দেখুন"}</span>
            </button>
          </div>
        </div>

        {/* 1. CLASSROOM DIALOGUE WITH SUKANTA SIR */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Live Classroom Dialogue: Mentor Sukanta Sir & Barrackpore Students
              </h2>
              <p className="text-xs text-slate-400">Dissecting competitive exam noun dilemmas in real time</p>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed">
            {/* Dialogue 1: Abhronila */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-400">Abhronila (Student):</span>
                <span className="text-slate-500 font-mono text-[11px]">Uncountable Trap Dilemma</span>
              </div>
              <p className="text-slate-300">
                "Sir, why is 'The sceneries of Kashmir are charming' marked wrong in competitive exams? Don't we see multiple scenes in Kashmir?"
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-1.5 ml-4 sm:ml-8">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400">Sukanta Sir (Mentor):</span>
                <span className="text-indigo-400 font-mono font-semibold text-[11px]">Mass Aggregate Law</span>
              </div>
              <p className="text-slate-200">
                "Excellent inquiry, Abhronila! <em>'Scenery'</em> is an aggregate abstract noun that encompasses the entirety of nature's panorama as an indivisible whole. You cannot count individual units of scenery. Hence, English syntax dictates: <strong>'The scenery of Kashmir is charming.'</strong> If you wish to count, you must say <em>'The charming views/landscapes of Kashmir'</em>."
              </p>
              {showBengali && (
                <p className="text-xs text-emerald-300 border-t border-indigo-900/50 pt-1.5 mt-1">
                  বাংলা: Scenery একটি সামগ্রিক প্রাকৃতিক দৃশ্য বোঝায়, তাই এটি সর্বদা Uncountable ও Singular ('The scenery is')।
                </p>
              )}
            </div>

            {/* Dialogue 2: Swadeep */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-400">Swadeep (Student):</span>
                <span className="text-slate-500 font-mono text-[11px]">Compound Head Noun Question</span>
              </div>
              <p className="text-slate-300">
                "Sir, why is it 'passers-by' and not 'passer-bies'? Why does '-s' attach to 'passer'?"
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-1.5 ml-4 sm:ml-8">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400">Sukanta Sir (Mentor):</span>
                <span className="text-indigo-400 font-mono font-semibold text-[11px]">The Principal Head Word Rule</span>
              </div>
              <p className="text-slate-200">
                "Brilliant question, Swadeep! Always locate the <strong>Grammatical Head Noun</strong>. In <em>'Passer-by'</em>, 'passer' is the living human being walking along, while 'by' is merely an adverbial particle. You pluralize the human being, not the adverb! Hence: <strong>'Passers-by'</strong>. The same applies to <em>'Commanders-in-chief'</em> and <em>'Sons-in-law'</em>."
              </p>
              {showBengali && (
                <p className="text-xs text-emerald-300 border-t border-indigo-900/50 pt-1.5 mt-1">
                  বাংলা: Compound Noun-এ মূল বিশেষ্য পদটি বহুবচন হয়, কোনো Preposition বা Adverb নয় (Passers-by, Sons-in-law)।
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 2. INTERACTIVE SPOT-THE-ERROR DIAGNOSTIC LAB */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Interactive Spot-the-Error Diagnostic Studio
              </h2>
              <p className="text-xs text-slate-400">Read each exam sentence, spot the nominal discord, and click to reveal the full grammatical analysis</p>
            </div>
          </div>

          <div className="space-y-4">
            {spotTheErrorDrills.map((drill) => (
              <div key={drill.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-rose-400 font-bold uppercase tracking-wider">Flawed Sentence #{drill.id}:</span>
                    <p className="text-sm font-semibold text-slate-200 font-serif line-through decoration-rose-500">
                      "{drill.badSentence}"
                    </p>
                  </div>

                  <button
                    onClick={() => toggleRevealError(drill.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shrink-0"
                  >
                    {revealedErrors[drill.id] ? "Hide Analysis" : "Reveal Fix"}
                  </button>
                </div>

                {revealedErrors[drill.id] && (
                  <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-2 text-xs animate-fade-in">
                    <div className="flex items-start gap-2 text-emerald-400 font-semibold">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Corrected: "{drill.correctedSentence}"</span>
                    </div>
                    <p className="text-slate-300 italic pt-1">
                      <strong>Grammar Insight:</strong> {drill.analysis}
                    </p>
                    {showBengali && (
                      <p className="text-emerald-300 border-t border-slate-800 pt-1 mt-1 text-[11px]">
                        বাংলা: {drill.bnAnalysis}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3. CAPSTONE PRACTICE ASSESSMENT WITH 10 QUESTIONS */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Module 002_001 Capstone Diagnostic Assessment (10 MCQs)
                </h2>
                <p className="text-xs text-slate-400">Comprehensive diagnostic exam evaluating all noun and number mechanics</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {submitted && (
                <span className="px-3.5 py-1.5 rounded-xl bg-indigo-950 border border-indigo-500/40 text-indigo-200 text-xs font-bold">
                  Score: {calculateScore()} / {questions.length}
                </span>
              )}
              <button
                onClick={resetQuiz}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div key={q.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm font-semibold text-slate-100 whitespace-pre-line">{q.question}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[q.id] === optIdx;
                    const isCorrect = q.correctAnswer === optIdx;
                    let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";

                    if (submitted) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-rose-950/60 border-rose-500 text-rose-200";
                      } else {
                        btnStyle = "bg-slate-900/40 border-slate-800/40 text-slate-500";
                      }
                    } else if (isSelected) {
                      btnStyle = "bg-indigo-950 border-indigo-500 text-indigo-200 font-semibold shadow-md";
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={submitted}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`text-left p-3 rounded-xl border text-xs transition-all leading-relaxed flex items-start gap-2.5 ${btnStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
                    <div className="text-emerald-400 font-semibold">Explanation: {q.explanation}</div>
                    {showBengali && q.explanationBn && (
                      <div className="text-slate-400 border-t border-slate-800 pt-1 mt-1 text-[11px]">
                        বাংলা: {q.explanationBn}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {!submitted && (
              <button
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(userAnswers).length === 0}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-950 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answers & View Diagnostics
              </button>
            )}
          </div>
        </div>

        {/* AUXILIARY SYSTEMS */}
        <div className="space-y-8 pt-4">
          <FAQTemplate
            title="Module 002_001 Capstone Diagnostic Assessment Bank"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 11: Classroom Dialogue & Module Diagnostic Practice Lab"
          />

          <WordDictionary />

          <Teacher
            note="Heartiest congratulations on completing all 11 topics of Module 002_001! You have mastered noun countability, irregular plurals, foreign loanwords, pluralia tantum, and compound nouns. Proceed to Module 002_002 to master Noun Gender, Cases, and the Possessive Apostrophe! — Sukanta Hui"
          />
        </div>

        {/* BIDIRECTIONAL NAVIGATION FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <a
            href="/english-grammar/module/002_001_noun-classification-number-and-irregular-plurals/topic-10"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-all hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 10 (Compound Nouns)</span>
          </a>

          <a
            href="/english-grammar/module/002_002_noun-gender-cases-and-the-possessive-apostrophe"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-950"
          >
            <span>Proceed to Module 002_002: Noun Gender & Cases</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
