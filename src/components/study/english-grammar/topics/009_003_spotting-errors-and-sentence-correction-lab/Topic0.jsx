import React, { useState, useMemo } from 'react';
import {
  ScanSearch,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ShieldAlert,
  Search,
  Check,
  Languages,
  Activity,
  Zap,
  Target
} from 'lucide-react';
import { topic0Questions } from './topic0_files/topic0_questions';
import PlainTextPrint from '../../../common/PlainTextPrint';
import Teacher from '../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../common/FAQTemplate';

const SCANNER_SAMPLES = [
  {
    id: 's1',
    label: 'Concord & Proximity Error',
    rawSentence: 'Neither the teacher nor the students was present in the auditorium.',
    correctedSentence: 'Neither the teacher nor the students were present in the auditorium.',
    detectedCategory: 'Subject-Verb Concord',
    brokenPart: 'was present',
    fixedPart: 'were present',
    reason: 'Under the Proximity Rule for "neither...nor", the verb agrees with the closer plural subject ("students").',
    reasonBn: '"Neither...nor" ব্যবহারের ক্ষেত্রে নিকটতম Subject বহুবচন ("students") হওয়ায় ক্রিয়াটি বহুবচন ("were") হবে।'
  },
  {
    id: 's2',
    label: 'Dangling Modifier Error',
    rawSentence: 'Walking briskly in the morning park, a heavy tree branch struck his shoulder.',
    correctedSentence: 'While he was walking briskly in the morning park, a heavy tree branch struck his shoulder.',
    detectedCategory: 'Dangling Modifier',
    brokenPart: 'Walking briskly in the morning park, a heavy tree branch...',
    fixedPart: 'While he was walking briskly in the morning park, a heavy tree branch...',
    reason: 'The introductory participial phrase illogically modified "branch" instead of the human subject.',
    reasonBn: 'সূচনাকারী অসমাপিকা ক্রিয়ার সাথে মূল বাক্যের Subject-এর সামঞ্জস্য না থাকায় বিভ্রান্তিকর অর্থ সৃষ্টি হয়েছিল (মনে হচ্ছিল ডালটি হাঁটছিল)।'
  },
  {
    id: 's3',
    label: 'Pleonastic Redundancy Error',
    rawSentence: 'Please return back the library books and repeat your request again.',
    correctedSentence: 'Please return the library books and repeat your request.',
    detectedCategory: 'Redundancy & Pleonasm',
    brokenPart: 'return back / repeat...again',
    fixedPart: 'return / repeat',
    reason: '"Return" inherently contains "back", and "repeat" inherently contains "again".',
    reasonBn: '"Return"-এর সাথে "back" এবং "repeat"-এর সাথে "again" যোগ করা অনাবশ্যক দ্বিরুক্তি।'
  },
  {
    id: 's4',
    label: 'Prepositional Superfluity Error',
    rawSentence: 'The senior board members discussed about the financial audit for two hours.',
    correctedSentence: 'The senior board members discussed the financial audit for two hours.',
    detectedCategory: 'Preposition Superfluity',
    brokenPart: 'discussed about',
    fixedPart: 'discussed',
    reason: '"Discuss" is a transitive verb that directly takes a direct object without "about".',
    reasonBn: '"Discuss" একটি Transitive Verb, যার পর সরাসরি Object বসে; "about" প্রিপজিশন বসে না।'
  },
  {
    id: 's5',
    label: 'Conditional Clause Mismatch',
    rawSentence: 'If he would have arrived on time, he would have secured the admission.',
    correctedSentence: 'If he had arrived on time, he would have secured the admission.',
    detectedCategory: 'Third Conditional Invariant',
    brokenPart: 'If he would have arrived',
    fixedPart: 'If he had arrived',
    reason: 'In a Third Conditional, the "if-clause" takes Past Perfect (had + V3), never modal "would have".',
    reasonBn: 'Third Conditional বাক্যের If-ক্লজে কখনোই "would have" বসে না, সর্বদা Past Perfect (had + V3) বসে।'
  }
];

const REDUNDANCY_LIST = [
  { wrong: 'Repeat again', right: 'Repeat / Say again', rule: '"Re-" prefix implies recurrence.' },
  { wrong: 'Return back', right: 'Return / Go back', rule: '"Return" means come/go back.' },
  { wrong: 'Revert back', right: 'Revert / Reply', rule: '"Revert" already means reply/return.' },
  { wrong: 'Cope up with', right: 'Cope with', rule: 'Standard idiom is "cope with".' },
  { wrong: 'Discuss about', right: 'Discuss', rule: '"Discuss" is transitive.' },
  { wrong: 'Enter into the room', right: 'Enter the room', rule: 'Physical entry takes no "into".' },
  { wrong: 'Reason because...', right: 'Reason is that / Reason why', rule: '"Reason" already indicates causation.' },
  { wrong: 'Mutual agreement between both', right: 'Mutual agreement / Agreement', rule: '"Mutual" implies both parties.' },
  { wrong: 'Past history', right: 'History', rule: 'History is inherently past.' },
  { wrong: 'Free gift', right: 'Gift', rule: 'Gifts are inherently free.' },
  { wrong: 'Advance reservation', right: 'Reservation', rule: 'Reservations are always in advance.' },
  { wrong: 'Passed out from college', right: 'Graduated from college', rule: '"Pass out" means faint.' }
];

const FAQS = [
  {
    question: 'What is the most effective scanning order for competitive error-spotting questions?',
    answer: 'Always scan in this prioritized order: 1) Identify the true Subject and check Subject-Verb Concord, 2) Check Tense Sequence and Time Markers, 3) Check Pronoun Cases and Antecedents, 4) Check Modifiers and Dangling Participles, 5) Check Parallelism and Correlative Conjunctions, and 6) Check Prepositional Collocations and Redundancy.'
  },
  {
    question: 'Why is "He is having a car" considered incorrect in formal English?',
    answer: 'Because "have" denoting possession or ownership is a Stative Verb. Stative verbs express a continuous condition or relationship rather than a dynamic action, so they do not take continuous (-ing) tenses in standard English.'
  },
  {
    question: 'What is a dangling modifier and how is it corrected?',
    answer: 'A dangling modifier occurs when an introductory phrase (like a participial phrase "Walking in the park...") is placed next to a subject that could not logically perform the action. Correct it either by supplying the proper human subject immediately after the comma ("Walking in the park, he saw...") or by converting the phrase into a full subordinate clause ("While he was walking in the park...").'
  },
  {
    question: 'Why do we say "senior to me" instead of "senior than me"?',
    answer: 'Comparative adjectives borrowed from Latin ending in -or (senior, junior, superior, inferior, prior, posterior, preferable) take the preposition "to" rather than the conjunction "than".'
  },
  {
    question: 'What is the Proximity Rule in Subject-Verb Agreement?',
    answer: 'When compound subjects are connected by "either...or", "neither...nor", or "not only...but also", the finite verb agrees in number and person with the closest subject.'
  }
];

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(true);
  const [selectedTab, setSelectedTab] = useState('scanner'); // 'scanner' | 'redundancy' | 'practice'
  const [activeSampleId, setActiveSampleId] = useState('s1');
  const [redundancySearch, setRedundancySearch] = useState('');

  // Practice Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [filterMode, setFilterMode] = useState('all');

  const activeSample = useMemo(() => {
    return SCANNER_SAMPLES.find(s => s.id === activeSampleId) || SCANNER_SAMPLES[0];
  }, [activeSampleId]);

  const filteredRedundancies = useMemo(() => {
    if (!redundancySearch.trim()) return REDUNDANCY_LIST;
    const term = redundancySearch.toLowerCase();
    return REDUNDANCY_LIST.filter(
      r => r.wrong.toLowerCase().includes(term) ||
           r.right.toLowerCase().includes(term) ||
           r.rule.toLowerCase().includes(term)
    );
  }, [redundancySearch]);

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
        <header className="relative bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 border border-rose-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-rose-500/20">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-500/20 rounded-xl border border-rose-500/40 text-rose-400">
                <ScanSearch className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                  Segment 009 &bull; Module 003
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Spotting Errors & Sentence Correction Grand Diagnostic Lab
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Master the 10-point diagnostic scanner, weed out pleonasms, and conquer competitive sentence correction.
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
                filePath="e:/React Project/react_routing_tailwind/src/components/study/english-grammar/topics/009_003_spotting-errors-and-sentence-correction-lab/topic0_files/topic0_note.txt"
                buttonText="Print ASCII Notes"
              />
            </div>
          </div>

          {/* Bilingual Alert / Pedagogical Intro */}
          {showBengali && (
            <div className="mt-4 p-4 bg-rose-950/60 border border-rose-500/30 rounded-xl text-rose-200 text-sm leading-relaxed flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">বাংলা মাধ্যম শিক্ষার্থীদের জন্য বিশেষ নির্দেশিকা:</p>
                <p className="mt-0.5 text-rose-200/90">
                  Spotting Errors হলো ইংরেজি ব্যাকরণের চূড়ান্ত পরীক্ষা। বাংলায় কথা বলার সহজাত অভ্যাস থেকে কিছু মারাত্মক ভুল (যেমন: "discuss about", "pass out from college", "repeat again", "sleep is coming") ইংরেজি লেখার সময় প্রবেশ করে। এই ল্যাবে আমরা ১০টি ধাপে বাক্য স্ক্যান করার কৌশল ও ব্যাকরণিক যুক্তি শিখব।
                </p>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <nav className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
            {[
              { id: 'scanner', label: '10-Point Diagnostic Scanner Lab', icon: Activity },
              { id: 'redundancy', label: 'Top Redundancies & Indian English Traps', icon: ShieldAlert },
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
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 border border-rose-400/30'
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

        {/* TAB 1: 10-Point Diagnostic Scanner Lab */}
        {selectedTab === 'scanner' && (
          <section className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-rose-400" />
                Interactive Sentence Dissection & Error Diagnostic Scanner
              </h2>
              <p className="text-sm text-slate-300">
                Select a flawed sentence sample to see how our 10-point diagnostic scanner identifies the exact structural violation.
              </p>
            </div>

            {/* Sample Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {SCANNER_SAMPLES.map(sample => (
                <button
                  key={sample.id}
                  onClick={() => setActiveSampleId(sample.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    activeSampleId === sample.id
                      ? 'bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-950'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {sample.label}
                </button>
              ))}
            </div>

            {/* Diagnostic Scanner Terminal Card */}
            <div className="bg-slate-900 border border-rose-500/40 rounded-2xl p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  DIAGNOSTIC SCANNER ACTIVE &bull; CATEGORY: {activeSample.detectedCategory}
                </div>
                <span className="px-2.5 py-0.5 bg-rose-500/10 text-rose-300 border border-rose-500/20 text-xs rounded-full font-mono">
                  {activeSample.id.toUpperCase()}
                </span>
              </div>

              {/* Raw vs Corrected Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-red-950/30 border border-red-500/40 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" /> Flawed Input Sentence
                    </span>
                    <span className="text-[11px] text-red-400/80 font-mono">Status: ERROR DETECTED</span>
                  </div>
                  <p className="text-sm font-mono text-red-200 leading-relaxed bg-red-950/50 p-3 rounded-lg border border-red-900/60">
                    "{activeSample.rawSentence}"
                  </p>
                  <div className="text-xs text-red-300">
                    <strong className="text-red-400">Broken Segment: </strong>
                    <code className="bg-red-900/60 px-1.5 py-0.5 rounded text-red-100 font-mono">
                      {activeSample.brokenPart}
                    </code>
                  </div>
                </div>

                <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Syntactically Standard Sentence
                    </span>
                    <span className="text-[11px] text-emerald-400/80 font-mono">Status: PASSED</span>
                  </div>
                  <p className="text-sm font-mono text-emerald-200 leading-relaxed bg-emerald-950/50 p-3 rounded-lg border border-emerald-900/60">
                    "{activeSample.correctedSentence}"
                  </p>
                  <div className="text-xs text-emerald-300">
                    <strong className="text-emerald-400">Corrected Form: </strong>
                    <code className="bg-emerald-900/60 px-1.5 py-0.5 rounded text-emerald-100 font-mono">
                      {activeSample.fixedPart}
                    </code>
                  </div>
                </div>
              </div>

              {/* Explanatory Synthesis */}
              <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-4 space-y-2">
                <div className="text-xs font-semibold text-indigo-300">Linguistic Diagnostic Analysis:</div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {activeSample.reason}
                </p>
                {showBengali && (
                  <div className="pt-2 border-t border-slate-700/60 text-xs text-emerald-300/90 leading-relaxed">
                    <strong>বাংলা ব্যাখ্যা: </strong> {activeSample.reasonBn}
                  </div>
                )}
              </div>
            </div>

            {/* The 10-Point Checklist Reference Card */}
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                The 10-Point Master Scanning Hierarchy
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                {[
                  '1. Subject-Verb Concord',
                  '2. Tense Sequence & Statives',
                  '3. Pronoun Cases & Antecedents',
                  '4. Dangling Modifiers',
                  '5. Parallelism & Correlatives',
                  '6. Preposition Superfluity',
                  '7. Pleonastic Redundancies',
                  '8. Conditionals (Zero to 3)',
                  '9. Adverb Inversion (Hardly...)',
                  '10. Comparative Self-Exclusion'
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl font-mono text-slate-300 flex items-center gap-2 hover:border-slate-600 transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="truncate">{step.slice(3)}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: Top Redundancies & Indian English Traps */}
        {selectedTab === 'redundancy' && (
          <section className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                  <ShieldAlert className="w-5 h-5 text-rose-400" />
                  Pleonastic Redundancies & Indian English (L1) Traps
                </h2>
                <p className="text-sm text-slate-300">
                  Eliminate colloquial spoken habits and redundant tautologies from your formal writing.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={redundancySearch}
                  onChange={(e) => setRedundancySearch(e.target.value)}
                  placeholder="Search redundancy / phrase..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-700/60 shadow-xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800/80 text-xs font-semibold uppercase tracking-wider text-slate-300 border-b border-slate-700">
                  <tr>
                    <th className="p-4 text-red-400">Flawed / Redundant Expression</th>
                    <th className="p-4 text-emerald-400">Standard English Form</th>
                    <th className="p-4 text-slate-400">Grammatical Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                  {filteredRedundancies.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-mono text-xs font-bold text-red-300 line-through">
                        {item.wrong}
                      </td>
                      <td className="p-4 font-medium text-emerald-300">{item.right}</td>
                      <td className="p-4 text-xs text-slate-400">{item.rule}</td>
                    </tr>
                  ))}
                  {filteredRedundancies.length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-6 text-center text-slate-500 text-sm">
                        No expressions found matching "{redundancySearch}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 3: Interactive Practice Lab (30 MCQs) */}
        {selectedTab === 'practice' && (
          <section className="space-y-6">
            {/* Quiz Action Bar */}
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Grand Diagnostic Assessment ({topic0Questions.length} Questions)
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  High-yield questions covering every major error category found in competitive and board exams.
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
                    <div className="px-4 py-2 bg-slate-900 border border-rose-500/40 rounded-xl text-sm font-bold text-white">
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
                        ? 'bg-rose-600 text-white'
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
                        <span className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 font-mono text-xs font-bold flex items-center justify-center border border-rose-500/30">
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
                          btnStyle = 'bg-rose-600/30 border-rose-500 text-white font-semibold shadow-md shadow-rose-950';
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
                          <strong className="text-rose-400">English Analysis: </strong>
                          {q.explanation}
                        </div>
                        {showBengali && q.explanationBn && (
                          <div className="text-xs text-rose-200/90 bg-rose-950/40 p-3 rounded-xl border border-rose-900/50">
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
          <FAQTemplate questions={FAQS} title="Frequently Asked Questions & Exam Strategies" />
        </section>

        {/* Teacher Component */}
        <Teacher />

      </div>
    </div>
  );
}
