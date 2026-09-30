import React, { useState, useMemo } from 'react';
import {
  Feather,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Scissors,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Search,
  Check,
  Languages,
  Wand2,
  FileCheck2,
  Activity
} from 'lucide-react';
import { topic0Questions } from './topic0_files/topic0_questions';
import PlainTextPrint from '../../../common/PlainTextPrint';
import Teacher from '../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../common/FAQTemplate';

const MAKEOVER_CASES = [
  {
    id: 'm1',
    title: 'Zombie Noun Extermination (Nominalization)',
    flabby: 'The committee conducted an investigation into the matter and reached a decision to make a reduction in expenses.',
    lean: 'The committee investigated the matter and decided to reduce expenses.',
    wordsBefore: 18,
    wordsAfter: 10,
    reduction: '44%',
    analysis: 'Three lifeless zombie nouns ("conducted an investigation", "reached a decision", "make a reduction") were transformed into punchy active verbs ("investigated", "decided", "reduce").'
  },
  {
    id: 'm2',
    title: 'Expletive Opener & Throat-Clearing Pruning',
    flabby: 'There are many scholars who are of the opinion that it is necessary for students to read widely.',
    lean: 'Many scholars believe students must read widely.',
    wordsBefore: 17,
    wordsAfter: 7,
    reduction: '59%',
    analysis: 'Deleted dummy expletive "There are...who" and bloated phrase "are of the opinion that it is necessary for...".'
  },
  {
    id: 'm3',
    title: 'Prepositional Clutter Elimination',
    flabby: 'In the event of the occurrence of non-compliance on the part of the tenant with respect to payment...',
    lean: 'If the tenant fails to pay rent...',
    wordsBefore: 17,
    wordsAfter: 7,
    reduction: '59%',
    analysis: 'Collapsed 4 chained prepositional phrases into a concise conditional subordinate clause.'
  },
  {
    id: 'm4',
    title: 'Ambiguous Pronoun Resolution',
    flabby: 'When the CEO met the venture capitalist in London, he expressed deep anxiety about the market downturn.',
    lean: 'Deeply anxious about the market downturn, the CEO met the venture capitalist in London.',
    wordsBefore: 17,
    wordsAfter: 13,
    reduction: '24%',
    analysis: 'Eliminated the ambiguous pronoun "he" by attaching the participial adjective modifier directly to "the CEO".'
  },
  {
    id: 'm5',
    title: 'Defensive Contract Drafting Clause',
    flabby: 'The agency might perhaps try to deliver the software release within an appropriate timeframe.',
    lean: 'The agency shall deliver the Software Release (v2.0) within fourteen (14) calendar days following deposit receipt.',
    wordsBefore: 14,
    wordsAfter: 16,
    reduction: 'Airtight Legal Precision',
    analysis: 'Replaced weak, evasive modals ("might perhaps try") with mandatory obligation ("shall deliver") and concrete triggers.'
  }
];

const FLABBY_DICTIONARY = [
  { flabby: 'In the event that', lean: 'If', saving: '75%' },
  { flabby: 'Owing to the fact that', lean: 'Because / Since', saving: '80%' },
  { flabby: 'Due to the fact that', lean: 'Because', saving: '80%' },
  { flabby: 'At this point in time', lean: 'Now / Currently', saving: '83%' },
  { flabby: 'For the purpose of', lean: 'To / For', saving: '75%' },
  { flabby: 'In close proximity to', lean: 'Near / Close to', saving: '75%' },
  { flabby: 'In spite of the fact that', lean: 'Although', saving: '83%' },
  { flabby: 'Has the capability to', lean: 'Can', saving: '75%' },
  { flabby: 'Is of the opinion that', lean: 'Believes / Thinks', saving: '75%' },
  { flabby: 'Prior to the start of', lean: 'Before', saving: '80%' },
  { flabby: 'Subsequent to the end of', lean: 'After', saving: '80%' },
  { flabby: 'Give consideration to', lean: 'Consider', saving: '66%' },
  { flabby: 'Make inquiries regarding', lean: 'Inquire / Ask', saving: '66%' },
  { flabby: 'In the majority of instances', lean: 'Usually / Mostly', saving: '80%' },
  { flabby: 'Until such time as', lean: 'Until', saving: '75%' }
];

const FAQS = [
  {
    question: 'What is a "Zombie Noun" (Nominalization) and why is it harmful to style?',
    answer: 'A zombie noun is an active verb that has been smothered into an abstract noun ending in -tion, -ment, -ance, or -ity (e.g. "perform an analysis" instead of "analyze"). It drains prose of energy, increases word count, and hides the human agent performing the action.'
  },
  {
    question: 'What is the difference between active voice and legitimate passive voice?',
    answer: 'Active voice is preferred for vigor and direct accountability ("The auditor flagged the error"). Passive voice is legitimately justified in science, history, or formal reports when the receiver or outcome is significantly more important than the agent ("Penicillin was discovered in 1928").'
  },
  {
    question: 'What is Richard Lanham’s Paramedic Method?',
    answer: 'It is a 6-step prose editing protocol designed to revive bloated academic and administrative sentences by circling prepositions, identifying "to be" verbs, finding the real action, transforming that action into a direct active verb, and eliminating dummy openers like "There are".'
  },
  {
    question: 'How do you avoid ambiguous pronoun references when multiple subjects are present?',
    answer: 'Either repeat the proper noun, restructure the sentence with participial introductory phrases, or replace the pronoun with a specific categorical term (e.g. "the former", "the latter", or "the company").'
  },
  {
    question: 'What is "Defensive Writing" in professional communication?',
    answer: 'Defensive writing is the discipline of structuring clauses with precise definitions, unambiguous condition chains, and standard legal modals (shall, must, may) to eliminate any possibility of misunderstanding or liability.'
  }
];

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(true);
  const [selectedTab, setSelectedTab] = useState('makeover'); // 'makeover' | 'dictionary' | 'paramedic' | 'practice'
  const [searchTerm, setSearchTerm] = useState('');

  // Practice Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [filterMode, setFilterMode] = useState('all');

  const filteredFlabby = useMemo(() => {
    if (!searchTerm.trim()) return FLABBY_DICTIONARY;
    const term = searchTerm.toLowerCase();
    return FLABBY_DICTIONARY.filter(
      item => item.flabby.toLowerCase().includes(term) || item.lean.toLowerCase().includes(term)
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
        <header className="relative bg-gradient-to-r from-violet-950 via-slate-900 to-indigo-950 border border-violet-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-violet-500/20">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-violet-500/20 rounded-xl border border-violet-500/40 text-violet-400">
                <Feather className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
                  Segment 009 &bull; Module 004
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Stylistic Flaws, Nominalization & Defensive Writing
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Slay zombie nouns, prune flabby prepositional chains, and craft airtight defensive prose.
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
                filePath="e:/React Project/react_routing_tailwind/src/components/study/english-grammar/topics/009_004_stylistic-flaws-and-defensive-writing/topic0_files/topic0_note.txt"
                buttonText="Print ASCII Notes"
              />
            </div>
          </div>

          {/* Bilingual Alert / Pedagogical Intro */}
          {showBengali && (
            <div className="mt-4 p-4 bg-violet-950/60 border border-violet-500/30 rounded-xl text-violet-200 text-sm leading-relaxed flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">বাংলা মাধ্যম শিক্ষার্থীদের জন্য বিশেষ নির্দেশিকা:</p>
                <p className="mt-0.5 text-violet-200/90">
                  অনেকে মনে করেন ভারী ভারী শব্দ ও দীর্ঘ বাক্য লিখলেই ইংরেজি লেখা ভালো হয়—যা একটি মারাত্মক ভুল ধারণা। আধুনিক বিশ্বমানের ইংরেজি রচনাশৈলী নির্ভর করে প্রত্যক্ষ ক্রিয়াপদ (Active Verbs), বাহুল্যবর্জন (Pruning) এবং দ্ব্যর্থহীন স্পষ্টতার (Defensive Writing) ওপর। এই মডিউলে আমরা প্রাতিষ্ঠানিক ও পেশাদার লেখার সর্বোত্তম শৈলী আয়ত্ত করব।
                </p>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <nav className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
            {[
              { id: 'makeover', label: 'Prose Makeover Clinic', icon: Wand2 },
              { id: 'dictionary', label: 'Flabby Phrase Pruning Directory', icon: Scissors },
              { id: 'paramedic', label: 'Paramedic Method Protocol', icon: Activity },
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
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30 border border-violet-400/30'
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

        {/* TAB 1: Prose Makeover Clinic */}
        {selectedTab === 'makeover' && (
          <section className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Wand2 className="w-5 h-5 text-violet-400" />
                Live Prose Makeover Clinic: Before vs. After
              </h2>
              <p className="text-sm text-slate-300">
                Observe how real-world flabby, bureaucratic sentences are transformed into lean, vigorous, and precise English.
              </p>
            </div>

            <div className="space-y-6">
              {MAKEOVER_CASES.map(item => (
                <div
                  key={item.id}
                  className="bg-slate-800/40 border border-slate-700/80 rounded-2xl p-6 hover:border-violet-500/50 transition-all space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-violet-400" />
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-violet-500/20 text-violet-300 text-xs font-bold rounded-full border border-violet-500/30">
                        Savings / Impact: {item.reduction}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-4 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-red-400">
                        <span>BEFORE (Flabby & Bloated)</span>
                        <span>{item.wordsBefore} Words</span>
                      </div>
                      <p className="text-sm text-red-200/90 font-mono leading-relaxed bg-red-950/40 p-3 rounded-lg border border-red-900/50">
                        "{item.flabby}"
                      </p>
                    </div>

                    <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                        <span>AFTER (Lean & Vigorous)</span>
                        <span>{item.wordsAfter} Words</span>
                      </div>
                      <p className="text-sm text-emerald-200 font-mono leading-relaxed bg-emerald-950/40 p-3 rounded-lg border border-emerald-900/50">
                        "{item.lean}"
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 bg-slate-900/70 p-3 rounded-xl border border-slate-800/80">
                    <strong className="text-violet-400">Editorial Analysis: </strong>
                    {item.analysis}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 2: Flabby Phrase Pruning Directory */}
        {selectedTab === 'dictionary' && (
          <section className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                  <Scissors className="w-5 h-5 text-violet-400" />
                  Flabby Phrase Pruning & Wordiness Directory
                </h2>
                <p className="text-sm text-slate-300">
                  Instant lookup to replace verbose connectors with crisp 1-word equivalents.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search flabby phrase..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-700/60 shadow-xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800/80 text-xs font-semibold uppercase tracking-wider text-slate-300 border-b border-slate-700">
                  <tr>
                    <th className="p-4 text-red-400">Bloated / Wordy Phrase</th>
                    <th className="p-4 text-emerald-400">Lean Plain English Alternative</th>
                    <th className="p-4 text-violet-300">Word Count Reduction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                  {filteredFlabby.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-mono text-xs font-bold text-red-300 line-through">
                        {item.flabby}
                      </td>
                      <td className="p-4 font-medium text-emerald-300">{item.lean}</td>
                      <td className="p-4 font-mono text-xs text-violet-400 font-bold">{item.saving} leaner</td>
                    </tr>
                  ))}
                  {filteredFlabby.length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-6 text-center text-slate-500 text-sm">
                        No phrases found matching "{searchTerm}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 3: Paramedic Method Protocol */}
        {selectedTab === 'paramedic' && (
          <section className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                Richard Lanham's 6-Step Paramedic Method
              </h2>
              <p className="text-sm text-slate-300">
                A legendary algorithmic procedure developed by Richard Lanham (UCLA) to resuscitate suffocated, lifeless sentences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: 'Circle Prepositions',
                  desc: 'Find all prepositions (of, in, for, on, at, about, with). If you have more than two in a row, prune the chain.',
                  badge: 'Preposition Audit'
                },
                {
                  step: '02',
                  title: 'Locate "To Be" Verbs',
                  desc: 'Highlight all forms of "is, are, was, were, been, being". They often prop up passive voice and zombie nouns.',
                  badge: 'Verb Scan'
                },
                {
                  step: '03',
                  title: 'Find the Real Action',
                  desc: 'Ask: "What is actually happening in this sentence?" Strip away the abstract packaging.',
                  badge: 'Semantic Action'
                },
                {
                  step: '04',
                  title: 'Activate the Action',
                  desc: 'Convert the discovered action into a strong, dynamic active verb (e.g. "perform an evaluation" -> "evaluate").',
                  badge: 'Verb Activation'
                },
                {
                  step: '05',
                  title: 'Position True Doer as Subject',
                  desc: 'Ensure the actual human agent or entity performing the action occupies the grammatical Subject slot.',
                  badge: 'Agent Alignment'
                },
                {
                  step: '06',
                  title: 'Exterminate Expletives',
                  desc: 'Delete empty filler openers such as "There is", "There are", "It is important to remember that".',
                  badge: 'Opener Purge'
                }
              ].map(item => (
                <div
                  key={item.step}
                  className="bg-slate-800/40 border border-slate-700 hover:border-violet-500/60 rounded-2xl p-6 space-y-3 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                        Step {item.step}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">{item.badge}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 4: Interactive Practice Lab (25 MCQs) */}
        {selectedTab === 'practice' && (
          <section className="space-y-6">
            {/* Quiz Action Bar */}
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Stylistic Mastery Assessment ({topic0Questions.length} Questions)
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  Evaluate your ability to detect zombie nouns, resolve pronoun ambiguities, and craft defensive sentences.
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
                    <div className="px-4 py-2 bg-slate-900 border border-violet-500/40 rounded-xl text-sm font-bold text-white">
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
                        ? 'bg-violet-600 text-white'
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
                        <span className="w-7 h-7 rounded-lg bg-violet-500/20 text-violet-400 font-mono text-xs font-bold flex items-center justify-center border border-violet-500/30">
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
                          btnStyle = 'bg-violet-600/30 border-violet-500 text-white font-semibold shadow-md shadow-violet-950';
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
                          <strong className="text-violet-400">English Analysis: </strong>
                          {q.explanation}
                        </div>
                        {showBengali && q.explanationBn && (
                          <div className="text-xs text-violet-200/90 bg-violet-950/40 p-3 rounded-xl border border-violet-900/50">
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
          <FAQTemplate questions={FAQS} title="Frequently Asked Questions on Style & Plain English" />
        </section>

        {/* Teacher Component */}
        <Teacher />

      </div>
    </div>
  );
}
