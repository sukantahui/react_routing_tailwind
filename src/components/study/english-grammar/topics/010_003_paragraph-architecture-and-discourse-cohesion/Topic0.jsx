import React, { useState, useMemo } from 'react';
import {
  Layers,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Search,
  Check,
  Languages,
  GitBranch,
  ArrowRight,
  Lightbulb,
  Boxes,
  Compass,
  FileSpreadsheet,
  Link2
} from 'lucide-react';
import { topic0Questions } from './topic0_files/topic0_questions';
import PlainTextPrint from '../../../common/PlainTextPrint';
import Teacher from '../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../common/FAQTemplate';

const MEAL_DATA = {
  main: {
    letter: 'M',
    title: 'Main Idea (Topic Sentence)',
    color: 'border-sky-500 bg-sky-950/30 text-sky-300',
    badge: 'Controlling Idea',
    text: 'Automated static code analysis represents an indispensable pillar in modern secure software development.',
    role: 'Asserts the governing thesis of the paragraph, establishing what will be proven.'
  },
  evidence: {
    letter: 'E',
    title: 'Evidence (Data & Verified Facts)',
    color: 'border-amber-500 bg-amber-950/30 text-amber-300',
    badge: 'Empirical Grounding',
    text: 'According to a 2023 NIST cybersecurity benchmark, engineering teams integrating automated linters during early sprint cycles identified 68% of memory vulnerabilities prior to production release.',
    role: 'Provides hard, verifiable empirical evidence or expert citations to ground the claim.'
  },
  analysis: {
    letter: 'A',
    title: 'Analysis (The Critical Engine)',
    color: 'border-emerald-500 bg-emerald-950/30 text-emerald-300',
    badge: 'Interpretation & Causation',
    text: 'This sharp decline in post-deployment defects demonstrates that automated tooling prevents human cognitive fatigue during repetitive syntax audits. Rather than forcing developers to manually inspect thousands of lines of boilerplate code, algorithmic analysis flags security vulnerabilities instantaneously, freeing engineers to focus on architectural resilience.',
    role: 'Interprets the data, explains causality, and establishes why the evidence validates the main thesis.'
  },
  link: {
    letter: 'L',
    title: 'Link (Synthesis & Transitional Pivot)',
    color: 'border-purple-500 bg-purple-950/30 text-purple-300',
    badge: 'Synthesis & Bridge',
    text: 'Consequently, transitioning from manual code reviews to automated continuous integration pipelines not only fortifies cybersecurity but also accelerates software delivery cadences.',
    role: 'Synthesizes the core analytical insight and pivots seamlessly to the subsequent paragraph.'
  }
};

const TRANSITION_DATA = [
  { class: 'Additive', markers: 'Furthermore, Moreover, In addition, Additionally, Besides, What is more', use: 'Expanding an argument with parallel supporting points.' },
  { class: 'Adversative / Contrast', markers: 'However, Conversely, On the contrary, In stark contrast, Nonetheless, Whereas', use: 'Introducing a direct counter-argument or concession.' },
  { class: 'Causal / Resultative', markers: 'Consequently, Therefore, As a result, Accordingly, Hence, Thus, It follows that', use: 'Deducing an analytical cause-and-effect relationship.' },
  { class: 'Sequential / Chronological', markers: 'Initially, Subsequently, Concurrently, Meanwhile, Prior to this, Eventually', use: 'Ordering processes, historical events, or workflows in time.' },
  { class: 'Exemplification', markers: 'For instance, To illustrate, Specifically, As demonstrated by, A case in point is', use: 'Introducing a concrete case study or real-world example.' },
  { class: 'Concluding / Summary', markers: 'In essence, To synthesize, Ultimately, In the final analysis, On balance', use: 'Wrapping up discourse and drawing definitive conclusions.' }
];

const FAQS = [
  {
    question: 'What is the MEAL paragraph framework and why is it standard in universities?',
    answer: 'The MEAL framework (Main Idea, Evidence, Analysis, Link) provides a proven formula for rigorous academic paragraphs. It ensures that every paragraph has a focused topic sentence, empirical evidence, deep explanatory analysis (often 50% of the paragraph), and a smooth transitional conclusion.'
  },
  {
    question: 'What is the difference between Cohesion and Coherence in discourse?',
    answer: 'Cohesion is the grammatical and lexical glue linking sentences (pronouns, connectors, lexical chains). Coherence is the deep semantic logic, thematic unity, and intellectual clarity that makes the entire passage understandable.'
  },
  {
    question: 'What is the Theme-Rheme (Given-New) information flow principle?',
    answer: 'It is a functional linguistics principle where a sentence begins with familiar, previously established context (the Theme/Given info) and concludes with the new, complex information (the Rheme/New info), maximizing reading comfort and comprehension.'
  },
  {
    question: 'What is "Transition Addiction" and how can it be prevented?',
    answer: 'Transition addiction is the mechanical over-placement of connectors (However, Moreover, Furthermore, Thus) at the beginning of every single sentence. It is cured by relying on logical idea sequencing, pronouns, and lexical chains rather than repetitive transitional crutches.'
  },
  {
    question: 'How long should an optimal paragraph be in digital and professional communication?',
    answer: 'An ideal paragraph spans 3 to 6 sentences (roughly 75 to 150 words) focused strictly on one single controlling idea.'
  }
];

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(true);
  const [selectedTab, setSelectedTab] = useState('meal'); // 'meal' | 'transitions' | 'themerheme' | 'practice'
  const [activeMealPart, setActiveMealPart] = useState('all'); // 'all' | 'main' | 'evidence' | 'analysis' | 'link'
  const [transitionSearch, setTransitionSearch] = useState('');

  // Practice Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [filterMode, setFilterMode] = useState('all');

  const filteredTransitions = useMemo(() => {
    if (!transitionSearch.trim()) return TRANSITION_DATA;
    const term = transitionSearch.toLowerCase();
    return TRANSITION_DATA.filter(
      t => t.class.toLowerCase().includes(term) ||
           t.markers.toLowerCase().includes(term) ||
           t.use.toLowerCase().includes(term)
    );
  }, [transitionSearch]);

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
        <header className="relative bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 border border-sky-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-sky-500/20">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-sky-500/20 rounded-xl border border-sky-500/40 text-sky-400">
                <Boxes className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                  Segment 010 &bull; Module 003
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Paragraph Architecture, Discourse Cohesion & MEAL Framework
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Master the MEAL paragraph framework, Theme-Rheme flow, and seamless transitional cohesion.
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
                filePath="e:/React Project/react_routing_tailwind/src/components/study/english-grammar/topics/010_003_paragraph-architecture-and-discourse-cohesion/topic0_files/topic0_note.txt"
                buttonText="Print ASCII Notes"
              />
            </div>
          </div>

          {/* Bilingual Alert / Pedagogical Intro */}
          {showBengali && (
            <div className="mt-4 p-4 bg-sky-950/60 border border-sky-500/30 rounded-xl text-sky-200 text-sm leading-relaxed flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">বাংলা মাধ্যম শিক্ষার্থীদের জন্য বিশেষ নির্দেশিকা:</p>
                <p className="mt-0.5 text-sky-200/90">
                  একটি ভালো প্রবন্ধ বা নিবন্ধ কেবল সঠিক ব্যাকরণের বাক্য দিয়ে তৈরি হয় না; প্রতিটি অনুচ্ছেদের সুনির্দিষ্ট স্থাপত্য (MEAL Structure) এবং বাক্যগুলোর মাঝে মসৃণ যৌক্তিক বন্ধন (Cohesion & Coherence) থাকা আবশ্যক। এই মডিউলে আমরা আন্তর্জাতিক মানের প্রা প্রাঞ্জল অনুচ্ছেদ রচনার নিয়ম শিখব।
                </p>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <nav className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
            {[
              { id: 'meal', label: 'Interactive MEAL Paragraph Blueprint', icon: Boxes },
              { id: 'transitions', label: '6-Class Transition Taxonomy', icon: Link2 },
              { id: 'themerheme', label: 'Theme-Rheme Flow Architecture', icon: GitBranch },
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
                      ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30 border border-sky-400/30'
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

        {/* TAB 1: MEAL Paragraph Blueprint */}
        {selectedTab === 'meal' && (
          <section className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Boxes className="w-5 h-5 text-sky-400" />
                The MEAL Academic Paragraph Framework
              </h2>
              <p className="text-sm text-slate-300">
                Click any pillar of the MEAL framework below to highlight its specific rhetorical role in constructing an elite academic paragraph.
              </p>
            </div>

            {/* MEAL Control Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                onClick={() => setActiveMealPart('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  activeMealPart === 'all'
                    ? 'bg-sky-600 text-white border-sky-400 shadow-md shadow-sky-950'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                View Full MEAL Assembly
              </button>
              {Object.entries(MEAL_DATA).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setActiveMealPart(key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border text-left flex items-center justify-between ${
                    activeMealPart === key
                      ? 'bg-slate-800 text-white border-sky-400 shadow-lg ring-1 ring-sky-400'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{data.letter} - {data.title.split(' ')[0]}</span>
                  <span className="text-[10px] opacity-70 font-mono">[{data.letter}]</span>
                </button>
              ))}
            </div>

            {/* Assembled Annotated Paragraph Canvas */}
            <div className="bg-slate-900 border border-sky-500/40 rounded-2xl p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono uppercase text-sky-400 font-bold">
                  Annotated Model Academic Paragraph (Computer Science & Cybersecurity)
                </span>
                <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 text-xs rounded-full border border-slate-700 font-mono">
                  MEAL Protocol
                </span>
              </div>

              {/* Four MEAL Segments */}
              <div className="space-y-4 font-serif text-base leading-relaxed">
                {(activeMealPart === 'all' || activeMealPart === 'main') && (
                  <div className={`p-4 rounded-xl border transition-all ${MEAL_DATA.main.color} ${activeMealPart === 'main' ? 'ring-2 ring-sky-400' : ''}`}>
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-400 mb-1 font-sans flex items-center justify-between">
                      <span>[M] Main Idea / Topic Sentence</span>
                      <span className="text-slate-400">{MEAL_DATA.main.badge}</span>
                    </div>
                    <p className="text-white font-medium">"{MEAL_DATA.main.text}"</p>
                    <p className="text-xs text-sky-200/80 font-sans mt-2 italic">&bull; {MEAL_DATA.main.role}</p>
                  </div>
                )}

                {(activeMealPart === 'all' || activeMealPart === 'evidence') && (
                  <div className={`p-4 rounded-xl border transition-all ${MEAL_DATA.evidence.color} ${activeMealPart === 'evidence' ? 'ring-2 ring-amber-400' : ''}`}>
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 mb-1 font-sans flex items-center justify-between">
                      <span>[E] Evidence & Empirical Citations</span>
                      <span className="text-slate-400">{MEAL_DATA.evidence.badge}</span>
                    </div>
                    <p className="text-white font-medium">"{MEAL_DATA.evidence.text}"</p>
                    <p className="text-xs text-amber-200/80 font-sans mt-2 italic">&bull; {MEAL_DATA.evidence.role}</p>
                  </div>
                )}

                {(activeMealPart === 'all' || activeMealPart === 'analysis') && (
                  <div className={`p-4 rounded-xl border transition-all ${MEAL_DATA.analysis.color} ${activeMealPart === 'analysis' ? 'ring-2 ring-emerald-400' : ''}`}>
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 mb-1 font-sans flex items-center justify-between">
                      <span>[A] Critical Analysis & Interpretation</span>
                      <span className="text-slate-400">{MEAL_DATA.analysis.badge}</span>
                    </div>
                    <p className="text-white font-medium">"{MEAL_DATA.analysis.text}"</p>
                    <p className="text-xs text-emerald-200/80 font-sans mt-2 italic">&bull; {MEAL_DATA.analysis.role}</p>
                  </div>
                )}

                {(activeMealPart === 'all' || activeMealPart === 'link') && (
                  <div className={`p-4 rounded-xl border transition-all ${MEAL_DATA.link.color} ${activeMealPart === 'link' ? 'ring-2 ring-purple-400' : ''}`}>
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-400 mb-1 font-sans flex items-center justify-between">
                      <span>[L] Link, Synthesis & Transition</span>
                      <span className="text-slate-400">{MEAL_DATA.link.badge}</span>
                    </div>
                    <p className="text-white font-medium">"{MEAL_DATA.link.text}"</p>
                    <p className="text-xs text-purple-200/80 font-sans mt-2 italic">&bull; {MEAL_DATA.link.role}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: 6-Class Transition Taxonomy */}
        {selectedTab === 'transitions' && (
          <section className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                  <Link2 className="w-5 h-5 text-sky-400" />
                  Master 6-Class Transitional Taxonomy
                </h2>
                <p className="text-sm text-slate-300">
                  Select appropriate logical connectors to ensure seamless semantic flow across sentences.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={transitionSearch}
                  onChange={(e) => setTransitionSearch(e.target.value)}
                  placeholder="Search transition class..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-700/60 shadow-xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800/80 text-xs font-semibold uppercase tracking-wider text-slate-300 border-b border-slate-700">
                  <tr>
                    <th className="p-4 text-sky-400">Taxonomic Class</th>
                    <th className="p-4 text-emerald-400">Core Transitional Markers</th>
                    <th className="p-4 text-slate-400">Rhetorical Function</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                  {filteredTransitions.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-mono text-xs font-bold text-sky-300">{item.class}</td>
                      <td className="p-4 font-mono text-xs text-emerald-300">{item.markers}</td>
                      <td className="p-4 text-xs text-slate-400">{item.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 3: Theme-Rheme Flow Architecture */}
        {selectedTab === 'themerheme' && (
          <section className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <GitBranch className="w-5 h-5 text-sky-400" />
                The Theme-Rheme (Given &rarr; New) Information Highway
              </h2>
              <p className="text-sm text-slate-300">
                To create effortless cognitive flow, every new sentence should open with familiar (Given) context before delivering the novel (New) analytical payload.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  step: 'Sentence 1',
                  given: 'Machine learning algorithms',
                  new: 'rely heavily on complex statistical matrix transformations.',
                  role: 'Establishes initial anchor and introduces novel concept (matrix transformations).'
                },
                {
                  step: 'Sentence 2',
                  given: 'These matrix transformations',
                  new: 'allow neural networks to classify multi-dimensional datasets with near-human accuracy.',
                  role: 'Picks up previous "matrix transformations" as Given, introduces "dataset classification" as New.'
                },
                {
                  step: 'Sentence 3',
                  given: 'Such dataset classification',
                  new: 'powers modern autonomous vehicle navigation and medical diagnostic imaging.',
                  role: 'Picks up "classification" as Given, introduces real-world applications as New.'
                }
              ].map((s, idx) => (
                <div key={idx} className="p-5 bg-slate-800/40 border border-slate-700/80 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-sky-400">{s.step}</span>
                    <span className="text-[11px] text-slate-400 font-mono">Cognitive Chain</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm font-serif">
                    <span className="px-2.5 py-1 bg-sky-950/80 border border-sky-500/40 rounded-lg text-sky-300 font-mono text-xs">
                      [THEME / GIVEN]: {s.given}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                    <span className="px-2.5 py-1 bg-emerald-950/80 border border-emerald-500/40 rounded-lg text-emerald-300 font-mono text-xs">
                      [RHEME / NEW]: {s.new}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 pt-1 border-t border-slate-800">
                    &bull; {s.role}
                  </p>
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
                  Discourse & Paragraph Mastery ({topic0Questions.length} Questions)
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  Test your mastery of the MEAL plan, cohesion vs. coherence, transitions, and Theme-Rheme architecture.
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
                    <div className="px-4 py-2 bg-slate-900 border border-sky-500/40 rounded-xl text-sm font-bold text-white">
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
                        ? 'bg-sky-600 text-white'
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
                        <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 font-mono text-xs font-bold flex items-center justify-center border border-sky-500/30">
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
                          btnStyle = 'bg-sky-600/30 border-sky-500 text-white font-semibold shadow-md shadow-sky-950';
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
                          <strong className="text-sky-400">English Analysis: </strong>
                          {q.explanation}
                        </div>
                        {showBengali && q.explanationBn && (
                          <div className="text-xs text-sky-200/90 bg-sky-950/40 p-3 rounded-xl border border-sky-900/50">
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
          <FAQTemplate questions={FAQS} title="Frequently Asked Questions on Paragraph & Discourse Architecture" />
        </section>

        {/* Teacher Component */}
        <Teacher />

      </div>
    </div>
  );
}
