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
  Globe,
  Sliders,
  Compass,
  FileCheck
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

export default function Topic7() {
  const [showBengali, setShowBengali] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState("us_i");
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

  const foreignFamilies = {
    us_i: {
      title: "1. Latin -us → -i (Masculine)",
      rule: "Singular ends in '-us', plural mutates to '-i' (pronounced /aɪ/).",
      items: [
        { s: "Radius", p: "Radii", ex: "Calculated the dual radii of the circle." },
        { s: "Focus", p: "Foci / Focuses", ex: "The primary foci of the elliptical orbit." },
        { s: "Alumnus (male)", p: "Alumni", ex: "Distinguished alumni attended the reunion." },
        { s: "Syllabus", p: "Syllabi / Syllabuses", ex: "Reviewing all semester course syllabi." },
        { s: "Stimulus", p: "Stimuli", ex: "Neural stimuli triggered rapid reflexes." },
        { s: "Fungus", p: "Fungi", ex: "Microscopic fungi thriving in humid zones." },
        { s: "Nucleus", p: "Nuclei", ex: "Atomic nuclei fission and fusion reactions." },
        { s: "Bacillus", p: "Bacilli", ex: "Rod-shaped bacterial bacilli under microscope." }
      ],
      bn: "Latin শব্দ যার শেষে '-us' থাকে, তাদের বহুবচনে '-i' বসে (যেমন: Radius → Radii, Alumnus → Alumni)।"
    },
    is_es: {
      title: "2. Greek/Latin -is → -es (/iːz/ sound)",
      rule: "Singular ends in '-is', plural mutates to '-es' (pronounced like 'eez').",
      items: [
        { s: "Crisis", p: "Crises", ex: "Managing severe economic crises globally." },
        { s: "Basis", p: "Bases", ex: "The theoretical bases of molecular physics." },
        { s: "Analysis", p: "Analyses", ex: "Conducting rigorous chemical analyses." },
        { s: "Axis", p: "Axes", ex: "The Cartesian coordinate X and Y axes." },
        { s: "Thesis", p: "Theses", ex: "Submitting three doctoral research theses." },
        { s: "Oasis", p: "Oases", ex: "Lush green oases in the Sahara desert." },
        { s: "Hypothesis", p: "Hypotheses", ex: "Testing multiple scientific hypotheses." },
        { s: "Diagnosis", p: "Diagnoses", ex: "Physicians confirmed their clinical diagnoses." }
      ],
      bn: "Greek ও Latin শব্দ যার শেষে '-is' থাকে, বহুবচনে '-es' (উচ্চারণ /iːz/) হয় (Crisis → Crises, Oasis → Oases)।"
    },
    on_um_a: {
      title: "3. Greek -on & Latin -um → -a",
      rule: "Singular ends in '-on' or '-um', plural mutates to neuter '-a'.",
      items: [
        { s: "Phenomenon", p: "Phenomena", ex: "Atmospheric optical phenomena." },
        { s: "Criterion", p: "Criteria", ex: "Meeting all rigorous academic criteria." },
        { s: "Datum", p: "Data", ex: "Empirical data points gathered from the survey." },
        { s: "Medium", p: "Media", ex: "Mass broadcasting and digital media." },
        { s: "Bacterium", p: "Bacteria", ex: "Beneficial gut bacteria aiding digestion." },
        { s: "Stratum", p: "Strata", ex: "Geological rock strata dating back millennia." },
        { s: "Curriculum", p: "Curricula / Curriculums", ex: "Aligning school curricula across boards." },
        { s: "Memorandum", p: "Memoranda", ex: "Diplomatic memoranda exchanged." }
      ],
      bn: "Greek '-on' এবং Latin '-um' শেষ হওয়া শব্দে বহুবচনে '-a' যুক্ত হয় (Phenomenon → Phenomena, Datum → Data, Criterion → Criteria)।"
    },
    a_ae: {
      title: "4. Latin -a → -ae",
      rule: "Singular ends in '-a', plural mutates to feminine '-ae'.",
      items: [
        { s: "Formula", p: "Formulae / Formulas", ex: "Complex chemical formulae." },
        { s: "Vertebra", p: "Vertebrae", ex: "The thirty-three interlocking vertebrae of the spine." },
        { s: "Larva", p: "Larvae", ex: "Insect larvae developing in the pupal stage." },
        { s: "Nebula", p: "Nebulae / Nebulas", ex: "Gaseous interstellar nebulae in deep space." },
        { s: "Alumna (female)", p: "Alumnae", ex: "Proud alumnae of the women's college." }
      ],
      bn: "Latin স্ত্রীলিঙ্গ শব্দ '-a'-তে শেষ হলে বহুবচনে '-ae' যুক্ত হয় (Formula → Formulae, Larva → Larvae)।"
    },
    ex_ix_ices: {
      title: "5. Latin -ex / -ix → -ices",
      rule: "Singular ends in '-ex' or '-ix', plural mutates to '-ices'.",
      items: [
        { s: "Index", p: "Indices (math) / Indexes (books)", ex: "Polynomial indices vs alphabetical book indexes." },
        { s: "Matrix", p: "Matrices", ex: "Algebraic matrices computed in software." },
        { s: "Appendix", p: "Appendices / Appendixes", ex: "Supplementary appendices attached to the report." },
        { s: "Vortex", p: "Vortices", ex: "Swirling oceanic and atmospheric vortices." }
      ],
      bn: "Latin '-ex' ও '-ix' শেষ হওয়া শব্দের বহুবচন '-ices' দিয়ে গঠিত হয় (Matrix → Matrices, Index → Indices)।"
    }
  };

  const activeData = foreignFamilies[selectedFamily];

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
                  Module 002_001 · Topic 7
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Classical Loanword Invariants
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Foreign Plurals from Latin and Greek
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master classical loanword morphology: <em>radii</em>, <em>crises</em>, <em>phenomena</em>, <em>criteria</em>, <em>matrices</em>, and eliminate concord errors in competitive exams.
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

        {/* 1. INTERACTIVE FOREIGN PLURAL FAMILY LAB */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-400" />
                <span>The 5 Classical Loanword Families</span>
              </h2>
              <p className="text-xs text-slate-400">Select a family pattern to view its singular-to-plural transformation and context</p>
            </div>
          </div>

          {/* Family Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "us_i", label: "-us → -i (Radius/Radii)" },
              { id: "is_es", label: "-is → -es (Crisis/Crises)" },
              { id: "on_um_a", label: "-on/-um → -a (Phenomenon/Phenomena)" },
              { id: "a_ae", label: "-a → -ae (Formula/Formulae)" },
              { id: "ex_ix_ices", label: "-ex/-ix → -ices (Matrix/Matrices)" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFamily(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all border ${
                  selectedFamily === tab.id
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-950 scale-105"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Selected Family Display */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{activeData.title}</span>
              <span className="text-xs text-indigo-300 font-mono">{activeData.rule}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {activeData.items.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-slate-400">{item.s}</span>
                    <span className="text-emerald-400 font-bold">→ {item.p}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 italic pt-1">
                    "{item.ex}"
                  </p>
                </div>
              ))}
            </div>

            {showBengali && (
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 text-xs">
                <strong>বাংলা ব্যাখ্যা:</strong> {activeData.bn}
              </div>
            )}
          </div>
        </div>

        {/* 2. DUAL PLURAL MEANINGS (ANTENNAE vs ANTENNAS, INDICES vs INDEXES) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Dual Plurals with Specialized Semantic Distinctions
              </h2>
              <p className="text-xs text-slate-400">When Latin/Greek plurals diverge from modernized English forms</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-bold text-indigo-400 text-sm font-mono">ANTENNA</span>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-emerald-400">1. Antennae (Biology):</strong>
                  <p className="text-slate-300 text-[11px]">Feelers on insects or crustaceans ("The beetle's long antennae").</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-indigo-300">2. Antennas (Electronics):</strong>
                  <p className="text-slate-300 text-[11px]">Radio/TV transmitting towers and aerials ("Rooftop TV antennas").</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-bold text-emerald-400 text-sm font-mono">INDEX</span>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-emerald-400">1. Indices (Mathematics):</strong>
                  <p className="text-slate-300 text-[11px]">Exponents / algebraic powers ("Laws of indices in algebra").</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-indigo-300">2. Indexes (Publishing):</strong>
                  <p className="text-slate-300 text-[11px]">Alphabetical reference lists at back of books ("Consult book indexes").</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-bold text-amber-400 text-sm font-mono">FORMULA</span>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-emerald-400">1. Formulae (Science):</strong>
                  <p className="text-slate-300 text-[11px]">Mathematical equations and chemical reactions ("Thermodynamic formulae").</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-indigo-300">2. Formulas (General):</strong>
                  <p className="text-slate-300 text-[11px]">Business protocols or baby milk recipes ("Infant nutritional formulas").</p>
                </div>
              </div>
            </div>
          </div>
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
                  Topic 7 Diagnostic Quiz: Foreign Plurals from Latin & Greek
                </h2>
                <p className="text-xs text-slate-400">Test your mastery of classical loanword plurals and concord rules</p>
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
            title="Module 002_001 Topic 7 Assessment & Practice Bank"
            questions={questions}
          />

          <PlainTextPrint
            text={noteText}
            title="Topic 7: Foreign Plurals from Latin and Greek"
          />

          <WordDictionary />

          <Teacher
            note="Foreign loanwords retain their ancient grammatical inflection. Never write 'criterias' or 'phenomenas' in formal writing! — Sukanta Hui"
          />
        </div>

        {/* BIDIRECTIONAL NAVIGATION FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <a
            href="/english-grammar/module/002_001_noun-classification-number-and-irregular-plurals/topic-6"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-all hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Topic 6 (Irregular Plurals)</span>
          </a>

          <a
            href="/english-grammar/module/002_001_noun-classification-number-and-irregular-plurals/topic-8"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-950"
          >
            <span>Next: Topic 8 (Pluralia Tantum & Plural-Only Nouns)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
