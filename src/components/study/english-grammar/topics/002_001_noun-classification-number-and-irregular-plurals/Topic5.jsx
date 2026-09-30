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
  Sparkle,
  Sliders,
  Type
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

export default function Topic5() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeTab, setActiveTab] = useState("sibilant"); // sibilant | y_rule | o_rule | f_rule
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

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
                  Module 002_001 · Topic 5
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Morphological Orthography
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Formation of Regular Plurals: -s, -es, -ies, -ves
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the 5 systematic spelling rules for plural suffixes, sibilant sound mechanics, and phonetic exceptions like <em>monarchs</em>, <em>photos</em>, and <em>chiefs</em>.
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

        {/* INTERACTIVE RULE EXPLORER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-400" />
                <span>Regular Pluralization Rules Studio</span>
              </h2>
              <p className="text-xs text-slate-400">Select a morphological rule to explore spelling patterns, exemplars, and competitive exam traps</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "sibilant", label: "1. Sibilants & -es (-s, -sh, -ch, -x, -z)" },
              { id: "y_rule", label: "2. The -y Rule (-ies vs -s)" },
              { id: "o_rule", label: "3. The -o Rule (-es vs -s loanwords)" },
              { id: "f_rule", label: "4. The -f / -fe Rule (-ves vs -s)" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-950 scale-105"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: SIBILANTS & THE /K/ EXCEPTION */}
          {activeTab === "sibilant" && (
            <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <span className="text-base font-bold text-white">
                  Rule: Sibilant Endings (-s, -ss, -sh, -ch, -x, -z) add "-es"
                </span>
                <span className="text-xs text-indigo-300 font-mono">
                  Phonetic necessity: Adds extra /ɪz/ syllable
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {[
                  { s: "Bus", p: "Buses" },
                  { s: "Glass", p: "Glasses" },
                  { s: "Brush", p: "Brushes" },
                  { s: "Church", p: "Churches" },
                  { s: "Box", p: "Boxes" },
                  { s: "Quiz", p: "Quizzes (double 'z')" }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300 font-mono">{item.s}</span>
                    <span className="text-emerald-400 font-bold font-mono">→ {item.p}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4" />
                  <span>The /k/ Phonetic Trap (Crucial for Competitive Exams)</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  When <code>-ch</code> is pronounced as a hard <strong>/k/</strong> sound (not soft /tʃ/), add <strong>ONLY '-s'</strong>:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                    Monarch (/ˈmɒn.ək/) → <strong className="text-emerald-400">Monarchs</strong> (NOT *monarches)
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                    Stomach (/ˈstʌm.ək/) → <strong className="text-emerald-400">Stomachs</strong> (NOT *stomaches)
                  </div>
                </div>
              </div>

              {showBengali && (
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 text-xs">
                  <strong>বাংলা টিপস:</strong> হিসহিস শব্দযুক্ত (Sibilant) শব্দের শেষে '-es' বসে। তবে '-ch'-এর উচ্চারণ যদি 'চ'-এর বদলে 'ক'-এর মতো হয়, তবে '-es' না হয়ে কেবল '-s' হবে (Monarchs, Stomachs)।
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Y-RULE */}
          {activeTab === "y_rule" && (
            <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <span className="text-base font-bold text-white">
                  The -y Rule: Consonant + y (-ies) vs Vowel + y (-s)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[11px]">
                    A. Consonant + 'y' → Drop 'y' & add '-ies'
                  </span>
                  <div className="space-y-1.5 font-mono">
                    <div className="flex justify-between"><span>Baby</span><strong className="text-emerald-400">Babies</strong></div>
                    <div className="flex justify-between"><span>City</span><strong className="text-emerald-400">Cities</strong></div>
                    <div className="flex justify-between"><span>Story (tale)</span><strong className="text-emerald-400">Stories</strong></div>
                    <div className="flex justify-between"><span>Country</span><strong className="text-emerald-400">Countries</strong></div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                    B. Vowel (a, e, i, o, u) + 'y' → Keep 'y' & add '-s'
                  </span>
                  <div className="space-y-1.5 font-mono">
                    <div className="flex justify-between"><span>Boy</span><strong className="text-emerald-400">Boys</strong></div>
                    <div className="flex justify-between"><span>Key</span><strong className="text-emerald-400">Keys</strong></div>
                    <div className="flex justify-between"><span>Storey (floor)</span><strong className="text-emerald-400">Storeys</strong></div>
                    <div className="flex justify-between"><span>Monkey</span><strong className="text-emerald-400">Monkeys</strong></div>
                  </div>
                </div>
              </div>

              {showBengali && (
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 text-xs">
                  <strong>বাংলা টিপস:</strong> 'y'-এর আগে Consonant থাকলে 'y' উঠে '-ies' হয় (যেমন: City → Cities)। কিন্তু 'y'-এর আগে Vowel থাকলে শুধু '-s' বসে (যেমন: Boy → Boys, Monkey → Monkeys)।
                </div>
              )}
            </div>
          )}

          {/* TAB 3: O-RULE */}
          {activeTab === "o_rule" && (
            <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <span className="text-base font-bold text-white">
                  The -o Termination: General '-es' vs Loanwords/Music '-s'
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[11px]">
                    A. Consonant + 'o' (General) → Add '-es'
                  </span>
                  <div className="space-y-1.5 font-mono">
                    <div className="flex justify-between"><span>Hero</span><strong className="text-emerald-400">Heroes</strong></div>
                    <div className="flex justify-between"><span>Potato</span><strong className="text-emerald-400">Potatoes</strong></div>
                    <div className="flex justify-between"><span>Mango</span><strong className="text-emerald-400">Mangoes</strong></div>
                    <div className="flex justify-between"><span>Echo</span><strong className="text-emerald-400">Echoes</strong></div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
                    B. Abbreviations & Musical Terms → Add ONLY '-s'
                  </span>
                  <div className="space-y-1.5 font-mono">
                    <div className="flex justify-between"><span>Photo (photograph)</span><strong className="text-emerald-400">Photos</strong></div>
                    <div className="flex justify-between"><span>Piano (Italian music)</span><strong className="text-emerald-400">Pianos</strong></div>
                    <div className="flex justify-between"><span>Kilo (kilogram)</span><strong className="text-emerald-400">Kilos</strong></div>
                    <div className="flex justify-between"><span>Radio (Vowel + o)</span><strong className="text-emerald-400">Radios</strong></div>
                  </div>
                </div>
              </div>

              {showBengali && (
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 text-xs">
                  <strong>বাংলা টিপস:</strong> সাধারণ Noun-এ '-o' থাকলে '-es' হয় (Heroes, Potatoes); তবে সংক্ষিপ্ত শব্দ (Photo → Photos, Kilo → Kilos) বা বাদ্যযন্ত্রের নামে (Piano → Pianos) কেবল '-s' যুক্ত হয়।
                </div>
              )}
            </div>
          )}

          {/* TAB 4: F / FE RULE */}
          {activeTab === "f_rule" && (
            <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <span className="text-base font-bold text-white">
                  The -f / -fe Suffix: Mutating '-ves' vs Invariable '-s'
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-400 uppercase text-[11px]">Mutates to -ves</span>
                  <div className="space-y-1 font-mono text-[11px]">
                    <div>Knife → Knives</div>
                    <div>Wife → Wives</div>
                    <div>Leaf → Leaves</div>
                    <div>Calf → Calves</div>
                    <div>Thief → Thieves</div>
                    <div>Half → Halves</div>
                    <div>Wolf → Wolves</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-rose-400 uppercase text-[11px]">Invariable (Adds ONLY -s)</span>
                  <div className="space-y-1 font-mono text-[11px]">
                    <div>Chief → Chiefs</div>
                    <div>Roof → Roofs</div>
                    <div>Cliff → Cliffs</div>
                    <div>Belief → Beliefs</div>
                    <div>Safe (strongbox) → Safes</div>
                    <div>Gulf → Gulfs</div>
                    <div>Proof → Proofs</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-amber-400 uppercase text-[11px]">Dual Form Permitted</span>
                  <div className="space-y-1 font-mono text-[11px]">
                    <div>Dwarf → Dwarfs / Dwarves</div>
                    <div>Scarf → Scarfs / Scarves</div>
                    <div>Wharf → Wharfs / Wharves</div>
                    <div>Hoof → Hoofs / Hooves</div>
                  </div>
                </div>
              </div>

              {showBengali && (
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 text-xs">
                  <strong>বাংলা টিপস:</strong> Knife, Leaf, Thief ইত্যাদিতে '-f/-fe' উঠে '-ves' হয়। কিন্তু Chief, Roof, Cliff, Safe, Belief ইত্যাদিতে শুধু '-s' বসে।
                </div>
              )}
            </div>
          )}
        </div>

        {/* PRACTICE ASSESSMENT WITH 10 QUESTIONS */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Topic 5 Diagnostic Quiz: Regular Plural Suffixes
                </h2>
                <p className="text-xs text-slate-400">Test your mastery over -s, -es, -ies, -ves rules & exceptions</p>
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
                  <p className="text-sm font-semibold text-slate-100">{q.question}</p>
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
            title="Module 002_001 Topic 5 Assessment & Practice Bank"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 5: Formation of Regular Plurals (-s, -es, -ies, -ves)"
          />

          <WordDictionary />

          <Teacher
            note="Spelling accuracy in plural nouns is a foundational marker of polished English. Master the phonetic exceptions like monarchs, pianos, and cliffs! — Sukanta Hui"
          />
        </div>

        {/* BIDIRECTIONAL NAVIGATION FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <a
            href="/english-grammar/module/002_001_noun-classification-number-and-irregular-plurals/topic-4"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-all hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 4 (Collective Nouns & Concord)</span>
          </a>

          <a
            href="/english-grammar/module/002_001_noun-classification-number-and-irregular-plurals/topic-6"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-950"
          >
            <span>Next: Topic 6 (Irregular Plural Mutations)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
