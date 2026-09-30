import React, { useState, useMemo } from 'react';
import {
  Compass,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Search,
  Check,
  Languages,
  Layers,
  ArrowRight,
  Lightbulb,
  Split,
  Dna,
  Zap,
  Globe
} from 'lucide-react';
import { topic0Questions } from './topic0_files/topic0_questions';
import PlainTextPrint from '../../../common/PlainTextPrint';
import Teacher from '../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../common/FAQTemplate';

const ROOT_DATABASE = [
  {
    root: 'CHRON',
    origin: 'Greek',
    meaning: 'Time',
    derivatives: ['Chronology', 'Anachronism', 'Synchronize', 'Chronic'],
    breakdown: 'Ana- (against) + chron (time) = out of historical time',
    meaningBn: 'সময় (যেমন: Chronological = সময়ানুক্রমিক, Anachronism = কালগত অসংগতি)'
  },
  {
    root: 'LOQU / LOCUT',
    origin: 'Latin',
    meaning: 'Speak / Talk',
    derivatives: ['Eloquent', 'Circumlocution', 'Loquacious', 'Soliloquy'],
    breakdown: 'Circum- (around) + loqu (speak) = talking in circles',
    meaningBn: 'কথা বলা (যেমন: Loquacious = বাচাল, Eloquent = সুবক্তা)'
  },
  {
    root: 'SPEC / SPECT',
    origin: 'Latin',
    meaning: 'Look / See',
    derivatives: ['Circumspect', 'Retrospect', 'Spectator', 'Perspective'],
    breakdown: 'Circum- (around) + spect (look) = looking all around cautiously',
    meaningBn: 'দেখা বা পর্যবেক্ষণ করা (যেমন: Circumspect = সতর্ক, Retrospect = অতীতের পর্যালোচনা)'
  },
  {
    root: 'DUC / DUCT',
    origin: 'Latin',
    meaning: 'Lead / Pull',
    derivatives: ['Induce', 'Deduce', 'Conduct', 'Seduce', 'Ductile'],
    breakdown: 'In- (into) + ducere (lead) = lead someone into an action',
    meaningBn: 'পরিচালিত করা বা পথ দেখানো (যেমন: Induce = প্ররোচিত করা, Deduce = অনুমান করা)'
  },
  {
    root: 'PATH',
    origin: 'Greek',
    meaning: 'Feeling / Suffering',
    derivatives: ['Apathy', 'Empathy', 'Sympathy', 'Antipathy', 'Pathology'],
    breakdown: 'A- (without) + path (feeling) = lack of interest or emotion',
    meaningBn: 'অনুভূতি বা কষ্ট (যেমন: Apathy = উদাসীনতা, Empathy = সহমর্মিতা)'
  },
  {
    root: 'ANTHROP',
    origin: 'Greek',
    meaning: 'Human / Humankind',
    derivatives: ['Misanthrope', 'Philanthropy', 'Anthropology'],
    breakdown: 'Misein (hate) + anthrop (human) = one who hates humanity',
    meaningBn: 'মানুষ বা মানবজাতি (যেমন: Misanthrope = নরবিদ্বেষী, Philanthropy = মানবপ্রেম)'
  },
  {
    root: 'BENE / BON',
    origin: 'Latin',
    meaning: 'Good / Well',
    derivatives: ['Benefactor', 'Benevolent', 'Beneficent', 'Benediction'],
    breakdown: 'Bene (well) + facere (to do) = one who does good deeds',
    meaningBn: 'ভালো বা মঙ্গল (যেমন: Benevolent = দয়ালু, Benefactor = দাতা)'
  },
  {
    root: 'MAL',
    origin: 'Latin',
    meaning: 'Bad / Evil / Ill',
    derivatives: ['Malfeasance', 'Malevolent', 'Malice', 'Malignant'],
    breakdown: 'Mal (bad) + faisance (doing) = official wrongdoing',
    meaningBn: 'খারাপ বা ক্ষতিকর (যেমন: Malevolent = পরশ্রীকাতর, Malfeasance = অসদাচরণ)'
  },
  {
    root: 'CRED',
    origin: 'Latin',
    meaning: 'Believe / Trust',
    derivatives: ['Credulous', 'Incredible', 'Credence', 'Incredulous'],
    breakdown: 'Cred (trust) + -ulous (inclined to) = too quick to believe',
    meaningBn: 'বিশ্বাস বা আস্থা (যেমন: Credulous = অতি-বিশ্বাসপ্রবণ, Incredible = অবিশ্বাস্য)'
  },
  {
    root: 'GNOS',
    origin: 'Greek',
    meaning: 'Knowledge',
    derivatives: ['Agnostic', 'Diagnosis', 'Prognosis', 'Gnostic'],
    breakdown: 'A- (without) + gnos (knowledge) = one who believes truth is unknown',
    meaningBn: 'জ্ঞান (যেমন: Agnostic = অজ্ঞেয়বাদী, Diagnosis = রোগ নির্ণয়)'
  },
  {
    root: 'VERT / VERS',
    origin: 'Latin',
    meaning: 'Turn',
    derivatives: ['Introvert', 'Extrovert', 'Subvert', 'Aversion', 'Versatile'],
    breakdown: 'Intro- (inward) + vertere (turn) = thoughts turned inward',
    meaningBn: 'ঘোরানো বা রূপান্তর (যেমন: Introvert = অন্তর্মুখী, Versatile = বহুমুখী)'
  },
  {
    root: 'VOC / VOK',
    origin: 'Latin',
    meaning: 'Call / Voice',
    derivatives: ['Equivocal', 'Provoke', 'Evoke', 'Vociferous', 'Advocate'],
    breakdown: 'Aequus (equal) + vocare (call) = speaking ambiguously',
    meaningBn: 'কণ্ঠ বা আহ্বান (যেমন: Equivocal = দ্ব্যর্থবোধক, Provoke = উস্কানি দেওয়া)'
  }
];

const CONNOTATION_DATA = [
  { positive: 'Slim / Slender', neutral: 'Thin', negative: 'Skinny / Emaciated', topic: 'Physical Appearance' },
  { positive: 'Thrifty / Frugal', neutral: 'Economical', negative: 'Miserly / Stingy', topic: 'Financial Prudence' },
  { positive: 'Inquisitive / Curious', neutral: 'Interested', negative: 'Nosy / Prying', topic: 'Desire for Knowledge' },
  { positive: 'Statesman', neutral: 'Elected Official', negative: 'Politician / Demagogue', topic: 'Leadership' },
  { positive: 'Meticulous / Precise', neutral: 'Detailed', negative: 'Pedantic / Nitpicking', topic: 'Attention to Detail' },
  { positive: 'Courageous / Brave', neutral: 'Risk-taking', negative: 'Foolhardy / Reckless', topic: 'Bravery' }
];

const FAQS = [
  {
    question: 'How does learning Latin and Greek roots improve English grammar and reading comprehension?',
    answer: 'Classical roots form the structural foundation for over 60% of English vocabulary and 90% of academic/scientific words. Mastering core roots allows you to deduce the definitions of unfamiliar complex words analytically without rote memorization.'
  },
  {
    question: 'What is Prefix Assimilation in English morphology?',
    answer: 'Prefix assimilation is the phonological adaptation of a prefix’s final consonant to harmonize with the following root sound (e.g. "in-" becoming "im-" before p/m/b in "impossible", "il-" before l in "illegal", and "ir-" before r in "irregular").'
  },
  {
    question: 'What is the distinction between Denotation and Connotation?',
    answer: 'Denotation is the explicit, objective literal dictionary definition of a word. Connotation represents the emotional, social, or cultural aura and valence (positive, neutral, or negative) attached to the word.'
  },
  {
    question: 'What is a "false friend" or "false cognate" in vocabulary?',
    answer: 'False friends are word pairs that sound or look remarkably similar due to phonological resemblance but possess completely different roots and meanings (e.g. "ingenious" meaning brilliant vs. "ingenuous" meaning naive/candid).'
  },
  {
    question: 'Why are words like "anachronism" and "circumlocution" frequent in competitive exams?',
    answer: 'Because they test high-level morphological decomposition (Prefix + Root + Suffix) and directly measure reading comprehension and precision in formal writing.'
  }
];

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(true);
  const [selectedTab, setSelectedTab] = useState('roots'); // 'roots' | 'connotation' | 'practice'
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRoot, setActiveRoot] = useState(ROOT_DATABASE[0]);

  // Practice Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [filterMode, setFilterMode] = useState('all');

  const filteredRoots = useMemo(() => {
    if (!searchTerm.trim()) return ROOT_DATABASE;
    const term = searchTerm.toLowerCase();
    return ROOT_DATABASE.filter(
      r => r.root.toLowerCase().includes(term) ||
           r.meaning.toLowerCase().includes(term) ||
           r.derivatives.some(d => d.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  const handleSelectAnswer = (qIndex, optionKey) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qIndex]: optionKey
    }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setFilterMode('all');
  };

  const quizScore = useMemo(() => {
    let correct = 0;
    topic0Questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  }, [selectedAnswers]);

  const displayedQuestions = useMemo(() => {
    return topic0Questions.map((q, idx) => ({ ...q, originalIndex: idx })).filter((q) => {
      const isAnswered = selectedAnswers[q.originalIndex] !== undefined;
      const isCorrect = selectedAnswers[q.originalIndex] === q.correctAnswer;
      if (filterMode === 'unanswered') return !isAnswered;
      if (filterMode === 'incorrect') return submitted && (!isAnswered || !isCorrect);
      return true;
    });
  }, [selectedAnswers, submitted, filterMode]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="relative bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-emerald-500/20">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/40 text-emerald-400">
                <Dna className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Segment 010 &bull; Module 001
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Vocabulary Expansion, Etymology & Morphological Power
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Master Latin & Greek roots, prefix assimilation, and denotation vs. connotation nuances.
                </p>
              </div>
            </div>

            {/* Bilingual Toggle & PlainTextPrint */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowBengali(!showBengali)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                  showBengali
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400/50 shadow-lg shadow-emerald-900/30'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600'
                }`}
                title="Toggle Bengali Explanations"
              >
                <Languages className="w-4 h-4" />
                <span>{showBengali ? 'বাংলা ব্যাখ্যা চালু' : 'English Only'}</span>
              </button>
              
              <PlainTextPrint
                filePath="e:/React Project/react_routing_tailwind/src/components/study/english-grammar/topics/010_001_vocabulary-etymology-and-word-power/topic0_files/topic0_note.txt"
                buttonText="Print ASCII Notes"
              />
            </div>
          </div>

          {/* Bilingual Alert / Pedagogical Intro */}
          {showBengali && (
            <div className="mt-4 p-4 bg-emerald-950/60 border border-emerald-500/30 rounded-xl text-emerald-200 text-sm leading-relaxed flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">বাংলা মাধ্যম শিক্ষার্থীদের জন্য বিশেষ নির্দেশিকা:</p>
                <p className="mt-0.5 text-emerald-200/90">
                  ইংরেজি শব্দভাণ্ডার মুখস্থ করে শেষ করা অসম্ভব। কিন্তু সংস্কৃত ব্যাকরণের মতো গ্রিক ও ল্যাটিন ধাতুমূল (Roots) এবং উপসর্গ (Prefixes) আয়ত্ত করলে যেকোনো নতুন ইংরেজি শব্দের মূল অর্থ নিমিষেই ডিকোড করা যায়। এই মডিউলে আমরা বৈজ্ঞানিক পদ্ধতিতে শব্দ গঠনের রহস্য উন্মোচন করব।
                </p>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <nav className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
            {[
              { id: 'roots', label: 'Classical Root Explorer & Morphizer', icon: Dna },
              { id: 'connotation', label: 'Denotation vs. Connotation Matrix', icon: Split },
              { id: 'practice', label: `Interactive Practice Lab (${topic0Questions.length} MCQs)`, icon: CheckCircle2 }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = selectedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400/30'
                      : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </header>

        {/* TAB 1: Classical Root Explorer & Morphizer */}
        {selectedTab === 'roots' && (
          <section className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                  <Compass className="w-5 h-5 text-emerald-400" />
                  Classical Morphological Root Navigator
                </h2>
                <p className="text-sm text-slate-300">
                  Click on any root or search to see its morphological origin, English derivatives, and semantic breakdown.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search roots or words..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Root Selection Pills */}
            <div className="flex flex-wrap gap-2">
              {filteredRoots.map(item => (
                <button
                  key={item.root}
                  onClick={() => setActiveRoot(item)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                    activeRoot.root === item.root
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-950'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white hover:border-slate-600'
                  }`}
                >
                  {item.root}
                </button>
              ))}
            </div>

            {/* Active Root Anatomy Spotlight Card */}
            <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 shadow-2xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                    Root Origin: {activeRoot.origin}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white font-mono mt-1">
                    {activeRoot.root} &rarr; <span className="text-emerald-400 font-sans">{activeRoot.meaning}</span>
                  </h3>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs rounded-full font-semibold">
                  Morphological Anchor
                </span>
              </div>

              {/* Derivatives Grid */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key English Derivatives:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {activeRoot.derivatives.map((word, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl text-sm font-semibold text-emerald-300 text-center font-mono"
                    >
                      {word}
                    </div>
                  ))}
                </div>
              </div>

              {/* Word Anatomy Example */}
              <div className="bg-slate-800/50 border border-slate-700/80 rounded-xl p-4 space-y-2">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Etymological Deconstruction:
                </div>
                <p className="text-sm font-mono text-slate-200">
                  {activeRoot.breakdown}
                </p>
                {showBengali && (
                  <div className="pt-2 border-t border-slate-700/60 text-xs text-emerald-300/90">
                    <strong>বাংলা অর্থ ও প্রয়োগ: </strong> {activeRoot.meaningBn}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: Denotation vs. Connotation Matrix */}
        {selectedTab === 'connotation' && (
          <section className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Split className="w-5 h-5 text-emerald-400" />
                The Connotation Spectrum: Positive &bull; Neutral &bull; Negative
              </h2>
              <p className="text-sm text-slate-300">
                Words with the same literal dictionary denotation often carry dramatically different emotional and stylistic charges.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-700/60 shadow-xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800/80 text-xs font-semibold uppercase tracking-wider text-slate-300 border-b border-slate-700">
                  <tr>
                    <th className="p-4 text-slate-400">Semantic Domain</th>
                    <th className="p-4 text-emerald-400">Positive Connotation (+)</th>
                    <th className="p-4 text-sky-400">Neutral Denotation (0)</th>
                    <th className="p-4 text-red-400">Negative Connotation (-)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                  {CONNOTATION_DATA.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-mono text-xs font-bold text-slate-300">{item.topic}</td>
                      <td className="p-4 font-medium text-emerald-300">{item.positive}</td>
                      <td className="p-4 font-medium text-sky-300">{item.neutral}</td>
                      <td className="p-4 font-medium text-red-300">{item.negative}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 3: Interactive Practice Lab (25 MCQs) */}
        {selectedTab === 'practice' && (
          <section className="space-y-6">
            {/* Quiz Action Bar */}
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Etymological Diagnostics ({topic0Questions.length} Questions)
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  Evaluate your ability to decode complex words, recognize prefix assimilation, and choose high-register vocabulary.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {!submitted ? (
                  <button
                    onClick={() => setSubmitted(true)}
                    disabled={Object.keys(selectedAnswers).length === 0}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg ${
                      Object.keys(selectedAnswers).length > 0
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                        : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    }`}
                  >
                    Submit Test ({Object.keys(selectedAnswers).length}/{topic0Questions.length})
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-slate-900 border border-emerald-500/40 rounded-xl text-sm font-bold text-white">
                      Score: <span className="text-emerald-400">{quizScore}</span> / {topic0Questions.length} (
                      {Math.round((quizScore / topic0Questions.length) * 100)}%)
                    </div>
                    <button
                      onClick={handleResetQuiz}
                      className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm font-semibold text-slate-200 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Retake</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Filter Mode Buttons */}
            {submitted && (
              <div className="flex gap-2">
                {[
                  { id: 'all', label: 'All Questions' },
                  { id: 'incorrect', label: `Incorrect / Unanswered (${topic0Questions.length - quizScore})` }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFilterMode(f.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      filterMode === f.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}

            {/* Questions List */}
            <div className="space-y-6">
              {displayedQuestions.map((q) => {
                const isAnswered = selectedAnswers[q.originalIndex] !== undefined;
                const userAnswer = selectedAnswers[q.originalIndex];
                const isCorrect = userAnswer === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-6 rounded-2xl border transition-all ${
                      submitted
                        ? isCorrect
                          ? 'bg-emerald-950/20 border-emerald-500/40'
                          : 'bg-red-950/20 border-red-500/40'
                        : 'bg-slate-800/40 border-slate-700/70 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center border border-emerald-500/30">
                          {q.id}
                        </span>
                        <span className="px-2.5 py-0.5 bg-slate-800 text-slate-400 text-[11px] font-semibold rounded-full border border-slate-700">
                          {q.category}
                        </span>
                      </div>

                      {submitted && (
                        <div className="flex items-center gap-1.5 text-xs font-bold">
                          {isCorrect ? (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> Correct
                            </span>
                          ) : (
                            <span className="text-red-400 flex items-center gap-1">
                              <XCircle className="w-4 h-4" /> Incorrect
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <h3 className="text-base font-semibold text-white mb-4 leading-relaxed">
                      {q.question}
                    </h3>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {Object.entries(q.options).map(([key, text]) => {
                        const isSelected = userAnswer === key;
                        const isRightAnswer = key === q.correctAnswer;

                        let btnStyle = 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-600';
                        if (submitted) {
                          if (isRightAnswer) {
                            btnStyle = 'bg-emerald-900/40 border-emerald-500 text-emerald-200 font-semibold';
                          } else if (isSelected && !isRightAnswer) {
                            btnStyle = 'bg-red-900/40 border-red-500 text-red-200';
                          } else {
                            btnStyle = 'bg-slate-900/30 border-slate-800 text-slate-500';
                          }
                        } else if (isSelected) {
                          btnStyle = 'bg-emerald-600/30 border-emerald-500 text-white font-semibold shadow-md shadow-emerald-950';
                        }

                        return (
                          <button
                            key={key}
                            onClick={() => handleSelectAnswer(q.originalIndex, key)}
                            disabled={submitted}
                            className={`flex items-start gap-3 p-3.5 rounded-xl border text-left text-sm transition-all ${btnStyle}`}
                          >
                            <span className="font-mono font-bold text-xs uppercase px-2 py-0.5 rounded bg-slate-800 border border-slate-700 shrink-0 mt-0.5">
                              {key}
                            </span>
                            <span className="flex-1 leading-snug">{text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanations */}
                    {submitted && (
                      <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                        <div className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                          <strong className="text-emerald-400">English Analysis: </strong>
                          {q.explanation}
                        </div>
                        {showBengali && q.explanationBn && (
                          <div className="text-xs text-emerald-200/90 bg-emerald-950/40 p-3 rounded-xl border border-emerald-900/50">
                            <strong className="text-teal-300 font-semibold">বাংলা ব্যাখ্যা: </strong>
                            {q.explanationBn}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="pt-6">
          <FAQTemplate questions={FAQS} title="Frequently Asked Questions on Etymology & Morphology" />
        </section>

        {/* Teacher Component */}
        <Teacher />

      </div>
    </div>
  );
}
