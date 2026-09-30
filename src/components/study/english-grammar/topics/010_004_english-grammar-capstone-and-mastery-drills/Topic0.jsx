import React, { useState, useMemo } from 'react';
import {
  Trophy,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Search,
  Check,
  Languages,
  Award,
  ArrowRight,
  Lightbulb,
  Shield,
  GraduationCap,
  Flame,
  MessageSquareQuote,
  Zap,
  Target
} from 'lucide-react';
import { topic0Questions } from './topic0_files/topic0_questions';
import PlainTextPrint from '../../../common/PlainTextPrint';
import Teacher from '../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../common/FAQTemplate';

const SEGMENTS_MAP = [
  {
    num: '01',
    title: 'Sentence Architecture & 8 Parts of Speech',
    focus: 'SVO syntax, 5 functional sentence types, phrase vs. clause anatomy.'
  },
  {
    num: '02',
    title: 'Nominal Domain & Articles',
    focus: 'Countable vs. mass nouns, foreign plurals, joint apostrophe, pronoun cases.'
  },
  {
    num: '03',
    title: 'Modifying Sphere & Inversion',
    focus: 'OSASCOMP royal order, Latin comparatives, MPT adverbs, negative fronting.'
  },
  {
    num: '04',
    title: 'Dynamic Core: Verbs & 25 Concord Rules',
    focus: 'Stative vs. dynamic verbs, 25 agreement rules, 12-tense timeline matrix.'
  },
  {
    num: '05',
    title: 'Voice, Modals & Non-Finites',
    focus: 'Active/passive mechanics, causatives (make/have/get), gerunds, conditionals.'
  },
  {
    num: '06',
    title: 'Prepositions & Phrasal Collocations',
    focus: 'Fixed appropriate prepositions, phrasal verbs, confusable word pairs.'
  },
  {
    num: '07',
    title: 'Synthesis & Clause Transformation',
    focus: 'Correlative parallelism, noun/adjective/adverb clauses, simple/compound/complex.'
  },
  {
    num: '08',
    title: 'Reported Speech & Dialogues',
    focus: 'Tense backshift exceptions, interrogative/imperative/exclamatory narration.'
  },
  {
    num: '09',
    title: 'Mechanics, Orthography & Editing Lab',
    focus: '14 punctuation marks, 1-1-1 doubling, error spotting, zombie noun slaying.'
  },
  {
    num: '10',
    title: 'Stylistics, Etymology & Capstone',
    focus: 'Latin/Greek roots, Plain English, MEAL paragraph architecture, discourse cohesion.'
  }
];

const VIVA_QUESTIONS = [
  {
    q: 'Why is "Between you and I" considered ungrammatical in standard English?',
    a: 'Prepositions strictly govern the objective case. "Between" is a preposition, so the pronouns following it must be in the objective case: "Between you and me".',
    aBn: 'Preposition-এর পরে Pronoun সর্বদা Objective Case-এ বসে। তাই "Between"-এর পর "you and me" হবে।'
  },
  {
    q: 'What is the grammatical difference between "He has gone to London" and "He has been to London"?',
    a: '"Has gone" signifies a one-way journey where the subject is currently in London or en route. "Has been" indicates a completed round trip where the subject has visited and returned.',
    aBn: '"Has gone" মানে সে এখনো লন্ডনে আছে বা পথে রয়েছে; আর "Has been" মানে সে লন্ডনে ঘুরে ফিরে এসেছে।'
  },
  {
    q: 'When do collective nouns take a plural verb in British/International English?',
    a: 'When the individual members of the collective group act separately, discordantly, or in disagreement (e.g. "The jury were divided in their opinions"). When acting as a single unified entity, it takes a singular verb.',
    aBn: 'Collective Noun যখন বিভক্ত বা আলাদাভাবে কাজ করে তখন Plural Verb বসে ("The jury were divided"); ঐক্যবদ্ধ থাকলে Singular Verb বসে।'
  },
  {
    q: 'Why does negative fronting ("Under no circumstances", "Hardly") trigger inversion?',
    a: 'Placing a negative or restrictive adverb at the sentence opening places primary rhetorical weight on the negation, requiring Subject-Auxiliary Inversion (Auxiliary + Subject + Main Verb) for emphasis.',
    aBn: 'নেতিবাচক Adverb বাক্যের শুরুতে বসলে জোর দেওয়ার জন্য Auxiliary Verb-টি Subject-এর আগে চলে আসে (Inversion)।'
  },
  {
    q: 'What are the 4 fundamental pillars of the academic MEAL paragraph plan?',
    a: 'M = Main Idea (Topic Sentence), E = Evidence (Data/Citations), A = Analysis (Critical interpretation explaining how evidence proves the thesis), and L = Link (Synthesis & transitional bridge).',
    aBn: 'MEAL হলো: Main Idea (মূল দাবি) + Evidence (তথ্যপ্রমাণ) + Analysis (ব্যাখ্যা ও বিশ্লেষণ) + Link (সারসংক্ষেপ ও পরবর্তী সংযোগ)।'
  }
];

const COMMANDMENTS = [
  'Never drop the linking "be" verb in zero-copula Bengali thoughts ("He is honest", NOT *He honest).',
  'Never use continuous (-ing) tenses with Stative Verbs of cognition, emotion, or possession (*I am knowing -> I know).',
  'Never place a preposition after direct transitive verbs (*discuss about -> discuss, *reach to -> reach).',
  'Never omit "other" when comparing a subject to its own class (*taller than any boy -> taller than any other boy).',
  'Always balance correlative conjunctions (not only...but also) before identical grammatical parts of speech.',
  'Always place the true human agent immediately after an introductory participial modifier (curing dangling modifiers).',
  'Always use possessive pronouns before a gerund ("insist on my going", NOT *me going).',
  'Always keep the bare infinitive without "to" after causative "make" ("made him cry", NOT *made him to cry).',
  'Never use "would have" inside the conditional If-clause ("If he had worked hard...", NOT *If he would have...).',
  'Always prioritize active, vigorous verbs over sluggish zombie nominalizations ("investigate", NOT *conduct an investigation).'
];

const FAQS = [
  {
    question: 'How should a Bengali-medium student prepare for competitive English grammar exams?',
    answer: 'Master the core Subject-Verb Concord (25 rules), Stative Verbs, Tense Timelines, Voice/Narration transformation formulas, and the 10-point diagnostic scanner. Avoid word-for-word translation from Bengali and internalize standard English SVO architecture.'
  },
  {
    question: 'What is the passing benchmark for the Grand Capstone Assessment?',
    answer: 'A score of 80% or higher (at least 24/30) certifies full comprehensive mastery across all 10 Segments of the curriculum track.'
  },
  {
    question: 'What is the most common reason for scoring low in Sentence Correction?',
    answer: 'Failing to scan systematically. Students often focus on vocabulary while missing subtle concord violations, pronoun case mismatches, dangling modifiers, or pleonastic redundancies.'
  },
  {
    question: 'How does mastering the 8-Pillar Verb Framework transform spoken and written fluency?',
    answer: 'Verbs are the power engine of English. Eliminating stative tense errors, mastering auxiliary "do-support", and mastering the 5 principal verb forms (V1–V5) removes over 90% of structural errors.'
  },
  {
    question: 'Where can I access printable revision notes for all modules?',
    answer: 'Every module includes a dedicated "Print ASCII Notes" button powered by PlainTextPrint, containing structured formulas, rules, and bilingual explanations.'
  }
];

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(true);
  const [selectedTab, setSelectedTab] = useState('arena'); // 'arena' | 'commandments' | 'viva' | 'practice'
  const [activeVivaIndex, setActiveVivaIndex] = useState(0);
  const [revealedViva, setRevealedViva] = useState(false);

  // Practice Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [filterMode, setFilterMode] = useState('all');

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
        <header className="relative bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/20 rounded-xl border border-amber-500/40 text-amber-400">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Segment 010 &bull; Module 004 &bull; Ultimate Capstone
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  English Grammar Capstone Assessment & Viva Voce Tournament
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  The crowning milestone of the Zero-to-Expert English Grammar Track across all 10 Segments.
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
                filePath="e:/React Project/react_routing_tailwind/src/components/study/english-grammar/topics/010_004_english-grammar-capstone-and-mastery-drills/topic0_files/topic0_note.txt"
                buttonText="Print ASCII Notes"
              />
            </div>
          </div>

          {/* Bilingual Alert / Pedagogical Intro */}
          {showBengali && (
            <div className="mt-4 p-4 bg-amber-950/60 border border-amber-500/30 rounded-xl text-amber-200 text-sm leading-relaxed flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">সুকান্ত স্যারের সমাপনী বার্তা ও নির্দেশিকা:</p>
                <p className="mt-0.5 text-amber-200/90">
                  অভিনন্দন! তোমরা ইংরেজি ব্যাকরণের ১০টি স্তম্ভের প্রতিটি জটিল নিয়ম ও ব্যবহারিক কৌশল সফলভাবে অতিক্রম করেছ। এই চূড়ান্ত ক্যাপস্টোন মডিউলে পুরো কোর্সের সার্বিক পর্যালোচনা, ১০টি অলঙ্ঘনীয় অনুশাসন (10 Commandments), এবং মৌখিক পরীক্ষার (Viva Voce) মাধ্যমে তোমাদের আত্মবিশ্বাস চূড়ান্ত রূপ পাবে।
                </p>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <nav className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
            {[
              { id: 'arena', label: '10-Segment Curriculum Arena', icon: Award },
              { id: 'commandments', label: 'The 10 Invariant Commandments', icon: Shield },
              { id: 'viva', label: 'Viva Voce Oral Defense Lab', icon: MessageSquareQuote },
              { id: 'practice', label: `Grand Capstone Exam (${topic0Questions.length} MCQs)`, icon: Trophy }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = selectedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 border border-amber-400/30'
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

        {/* TAB 1: 10-Segment Curriculum Arena */}
        {selectedTab === 'arena' && (
          <section className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-amber-400" />
                The 10-Segment Master Curriculum Track Overview
              </h2>
              <p className="text-sm text-slate-300">
                A birds-eye synthesis of all 10 architectural domains covered across the 95-hour zero-to-expert English Grammar track.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SEGMENTS_MAP.map(seg => (
                <div
                  key={seg.num}
                  className="bg-slate-800/40 border border-slate-700/80 hover:border-amber-500/50 rounded-2xl p-5 space-y-2 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Segment {seg.num}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-base font-bold text-white">{seg.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{seg.focus}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 2: The 10 Invariant Commandments */}
        {selectedTab === 'commandments' && (
          <section className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-amber-400" />
                The 10 Invariant Commandments for Bengali Learners
              </h2>
              <p className="text-sm text-slate-300">
                Non-negotiable grammar rules that eliminate L1 Bengali interference and ensure absolute syntactic correctness.
              </p>
            </div>

            <div className="space-y-3">
              {COMMANDMENTS.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-800/40 border border-slate-700 hover:border-amber-500/60 rounded-xl flex items-start gap-3 transition-all"
                >
                  <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-amber-500/30 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed font-medium">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 3: Viva Voce Oral Defense Lab */}
        {selectedTab === 'viva' && (
          <section className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <MessageSquareQuote className="w-5 h-5 text-amber-400" />
                Interactive Viva Voce Oral Defense Flashcards
              </h2>
              <p className="text-sm text-slate-300">
                Test your oral explanatory agility on high-yield competitive grammar interview questions.
              </p>
            </div>

            {/* Flashcard Component */}
            <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono uppercase text-amber-400 font-bold">
                  Viva Voce Question {activeVivaIndex + 1} of {VIVA_QUESTIONS.length}
                </span>
                <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 text-xs rounded-full border border-slate-700 font-mono">
                  Interview Defense
                </span>
              </div>

              <div className="text-lg font-bold text-white leading-relaxed">
                "{VIVA_QUESTIONS[activeVivaIndex].q}"
              </div>

              {revealedViva ? (
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-sm text-emerald-200 leading-relaxed">
                    <strong className="text-emerald-400">Expert English Defense: </strong>
                    {VIVA_QUESTIONS[activeVivaIndex].a}
                  </div>
                  {showBengali && (
                    <div className="p-4 bg-amber-950/40 border border-amber-500/30 rounded-xl text-xs text-amber-200/90 leading-relaxed">
                      <strong className="text-amber-400">বাংলা যুক্তি ও ব্যাখ্যা: </strong>
                      {VIVA_QUESTIONS[activeVivaIndex].aBn}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setRevealedViva(true)}
                  className="w-full py-3 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 rounded-xl text-sm font-semibold text-amber-300 transition-colors"
                >
                  Reveal Expert Model Answer & Bengali Explanation
                </button>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => {
                    setActiveVivaIndex(prev => Math.max(0, prev - 1));
                    setRevealedViva(false);
                  }}
                  disabled={activeVivaIndex === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-xl text-xs font-semibold text-slate-300"
                >
                  &larr; Previous Question
                </button>
                <button
                  onClick={() => {
                    setActiveVivaIndex(prev => Math.min(VIVA_QUESTIONS.length - 1, prev + 1));
                    setRevealedViva(false);
                  }}
                  disabled={activeVivaIndex === VIVA_QUESTIONS.length - 1}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 rounded-xl text-xs font-semibold text-white shadow-lg"
                >
                  Next Question &rarr;
                </button>
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: Grand Capstone Exam (30 MCQs) */}
        {selectedTab === 'practice' && (
          <section className="space-y-6">
            {/* Quiz Action Bar */}
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  Grand Capstone Assessment ({topic0Questions.length} Questions)
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  The ultimate comprehensive test spanning all 10 segments of the curriculum track.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {!submitted ? (
                  <button
                    onClick={() => setSubmitted(true)}
                    disabled={Object.keys(selectedAnswers).length === 0}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg ${
                      Object.keys(selectedAnswers).length > 0
                        ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
                        : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    }`}
                  >
                    Submit Capstone ({Object.keys(selectedAnswers).length}/{topic0Questions.length})
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-slate-900 border border-amber-500/40 rounded-xl text-sm font-bold text-white">
                      Score: <span className="text-amber-400">{quizScore}</span> / {topic0Questions.length} (
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
                        ? 'bg-amber-600 text-white'
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
                        <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-mono text-xs font-bold flex items-center justify-center border border-amber-500/30">
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
                          btnStyle = 'bg-amber-600/30 border-amber-500 text-white font-semibold shadow-md shadow-amber-950';
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
                          <strong className="text-amber-400">English Analysis: </strong>
                          {q.explanation}
                        </div>
                        {showBengali && q.explanationBn && (
                          <div className="text-xs text-amber-200/90 bg-amber-950/40 p-3 rounded-xl border border-amber-900/50">
                            <strong className="text-emerald-400 font-semibold">বাংলা ব্যাখ্যা: </strong>
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
          <FAQTemplate questions={FAQS} title="Frequently Asked Questions on the Capstone & Final Preparation" />
        </section>

        {/* Teacher Component */}
        <Teacher />

      </div>
    </div>
  );
}
