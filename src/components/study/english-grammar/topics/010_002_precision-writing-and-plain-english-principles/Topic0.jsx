import React, { useState, useMemo } from 'react';
import {
  Gauge,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Search,
  Check,
  Languages,
  Sliders,
  ArrowRight,
  Lightbulb,
  Zap,
  Target,
  FileText,
  Mail
} from 'lucide-react';
import { topic0Questions } from './topic0_files/topic0_questions';
import PlainTextPrint from '../../../common/PlainTextPrint';
import Teacher from '../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../common/FAQTemplate';

const TONE_SCENARIOS = [
  {
    id: 'deadline',
    title: 'Missed Project Milestone',
    tones: {
      aggressive: 'You completely missed the project deadline and delayed the client presentation for everyone.',
      passiveAggressive: 'It would have been wonderful if certain team members respected the project timeline like the rest of us.',
      neutral: 'The milestone deliverables were not submitted by the 5:00 PM deadline yesterday.',
      diplomatic: 'We missed yesterday’s submission window; could you share your current draft so we can collaborate on finalizing it today?',
      executive: 'To maintain our client launch schedule, we need the final draft submitted by 12:00 PM today without further delay.'
    }
  },
  {
    id: 'bug',
    title: 'Defective Code / Software Bug',
    tones: {
      aggressive: 'Your terrible pull request broke production and caused downtime for all customers.',
      passiveAggressive: 'I suppose testing code before deploying is no longer considered necessary around here.',
      neutral: 'The latest deployment introduced an uncaught null reference exception on the checkout route.',
      diplomatic: 'The recent commit triggered an issue on the checkout route; let’s roll back and pair program to patch it immediately.',
      executive: 'Production stability is our top priority. We have rolled back commit #842 and require a hotfix and test suite before 3:00 PM.'
    }
  },
  {
    id: 'invoice',
    title: 'Client Payment Discrepancy',
    tones: {
      aggressive: 'You failed to pay our invoice on time. Pay now or we will sue.',
      passiveAggressive: 'We assume you noticed our invoice, even if nobody bothered to process it.',
      neutral: 'Invoice #1042 remains outstanding 15 days past the agreed net-30 terms.',
      diplomatic: 'We wanted to follow up on Invoice #1042 to ensure you received it and check if any additional documentation is needed from our side.',
      executive: 'To avoid service disruption under Section 4.2 of our agreement, please remit the balance of Invoice #1042 within 48 business hours.'
    }
  }
];

const FAQS = [
  {
    question: 'What is the Plain English standard in professional communication?',
    answer: 'Plain English emphasizes clear, direct, and unambiguous language tailored to the audience. It favors active voice, everyday vocabulary over archaic jargon, an average sentence length of 15–20 words, and well-structured headings.'
  },
  {
    question: 'How is the Flesch Reading Ease score calculated and interpreted?',
    answer: 'The Flesch formula scores text from 0 to 100 based on Average Sentence Length (words/sentence) and Average Syllables per Word. A score of 60–70 represents standard Plain English (easily understood by an 8th–9th grade level, typical of BBC and major newspapers).'
  },
  {
    question: 'What is the BLUF (Bottom Line Up Front) communication framework?',
    answer: 'BLUF places the core message, decision, or actionable request in the very first 1–2 sentences, followed by brief bulleted evidence and clear deadlines, respecting the reader’s cognitive bandwidth.'
  },
  {
    question: 'How can you disagree constructively in professional writing without causing offense?',
    answer: 'Acknowledge the other party’s perspective or effort, ground your critique in objective empirical data or policy references, and propose a collaborative path forward rather than making personal attacks.'
  },
  {
    question: 'Why is active voice preferred in executive summaries and proposals?',
    answer: 'Active voice clearly establishes who is responsible for each action, requires fewer words, enhances momentum, and eliminates bureaucratic ambiguity.'
  }
];

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(true);
  const [selectedTab, setSelectedTab] = useState('analyzer'); // 'analyzer' | 'tone' | 'pillars' | 'practice'
  
  // Real-time Readability Analyzer State
  const [inputText, setInputText] = useState(
    'Plain English is clear and direct. It helps readers understand your message the first time they read it. Keep your sentences concise and use active verbs.'
  );

  // Tone Modulator State
  const [activeScenarioId, setActiveScenarioId] = useState('deadline');
  const [selectedTone, setSelectedTone] = useState('diplomatic');

  // Practice Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [filterMode, setFilterMode] = useState('all');

  // Real-time Readability Calculations
  const stats = useMemo(() => {
    const text = inputText.trim();
    if (!text) return { words: 0, sentences: 0, syllables: 0, asl: 0, asw: 0, flesch: 100, label: 'N/A' };

    const words = text.split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    // Syllable counter approximation
    let totalSyllables = 0;
    words.forEach(w => {
      const clean = w.toLowerCase().replace(/[^a-z]/g, '');
      if (clean.length <= 3) {
        totalSyllables += 1;
      } else {
        const matches = clean.match(/[aeiouy]{1,2}/g);
        totalSyllables += matches ? matches.length : 1;
      }
    });

    const wordCount = words.length || 1;
    const sentenceCount = sentences.length || 1;
    const asl = wordCount / sentenceCount;
    const asw = totalSyllables / wordCount;
    
    // Flesch Reading Ease Formula
    let flesch = Math.round(206.835 - (1.015 * asl) - (84.6 * asw));
    if (flesch > 100) flesch = 100;
    if (flesch < 0) flesch = 0;

    let label = 'Standard Plain English (Optimal)';
    let color = 'text-emerald-400';
    if (flesch >= 80) {
      label = 'Very Easy & Conversational';
      color = 'text-sky-400';
    } else if (flesch >= 60) {
      label = 'Standard Plain English (Optimal)';
      color = 'text-emerald-400';
    } else if (flesch >= 40) {
      label = 'Fairly Difficult (High School / College)';
      color = 'text-amber-400';
    } else {
      label = 'Dense / Academic Fog (Pruning Needed)';
      color = 'text-red-400';
    }

    return {
      words: wordCount,
      sentences: sentenceCount,
      syllables: totalSyllables,
      asl: Math.round(asl * 10) / 10,
      asw: Math.round(asw * 100) / 100,
      flesch,
      label,
      color
    };
  }, [inputText]);

  const activeScenario = useMemo(() => {
    return TONE_SCENARIOS.find(s => s.id === activeScenarioId) || TONE_SCENARIOS[0];
  }, [activeScenarioId]);

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
        <header className="relative bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 border border-teal-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-teal-500/20">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-teal-500/20 rounded-xl border border-teal-500/40 text-teal-400">
                <Gauge className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                  Segment 010 &bull; Module 002
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Precision Writing, Plain English Principles & Tone Modulation
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Evaluate readability metrics, master the 5 registers of tone, and craft high-impact executive prose.
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
                filePath="e:/React Project/react_routing_tailwind/src/components/study/english-grammar/topics/010_002_precision-writing-and-plain-english-principles/topic0_files/topic0_note.txt"
                buttonText="Print ASCII Notes"
              />
            </div>
          </div>

          {/* Bilingual Alert / Pedagogical Intro */}
          {showBengali && (
            <div className="mt-4 p-4 bg-teal-950/60 border border-teal-500/30 rounded-xl text-teal-200 text-sm leading-relaxed flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">বাংলা মাধ্যম শিক্ষার্থীদের জন্য বিশেষ নির্দেশিকা:</p>
                <p className="mt-0.5 text-teal-200/90">
                  ইংরেজি লেখার আসল সৌন্দর্য কঠিন শব্দে নয়, স্পষ্টতায়। আন্তর্জাতিক কর্মক্ষেত্রে ও উচ্চশিক্ষায় Plain English নীতি এবং Tone Modulation (পরিস্থিতি অনুযায়ী স্বর নিয়ন্ত্রণ) সবচেয়ে মূল্যবান দক্ষতা। এই ল্যাবে আমরা Flesch Readability স্কোর এবং পেশাদার ইমেইল লেখার আধুনিক কলাকৌশল শিখব।
                </p>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <nav className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
            {[
              { id: 'analyzer', label: 'Live Readability Analyzer', icon: Gauge },
              { id: 'tone', label: 'Tone Modulation Workbench', icon: Sliders },
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
                      ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 border border-teal-400/30'
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

        {/* TAB 1: Live Readability Analyzer */}
        {selectedTab === 'analyzer' && (
          <section className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Gauge className="w-5 h-5 text-teal-400" />
                Real-Time Flesch Reading Ease & Syntax Gauge
              </h2>
              <p className="text-sm text-slate-300">
                Type or paste any paragraph below to compute words per sentence, syllables per word, and the exact Flesch Readability Index.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Text Input Area */}
              <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-200 block">
                    Input Your Prose for Analysis:
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={6}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-teal-500 transition-colors resize-none font-mono"
                    placeholder="Type or paste your text here..."
                  />
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => setInputText('Plain English is clear and direct. It helps readers understand your message the first time they read it. Keep your sentences concise and use active verbs.')}
                    className="px-3 py-1.5 bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg text-slate-300 transition-colors"
                  >
                    Load Standard Sample
                  </button>
                  <button
                    onClick={() => setInputText('The aforementioned implementation of the regulatory framework shall be effectuated subsequent to the comprehensive adjudication of all concomitant legal stipulations.')}
                    className="px-3 py-1.5 bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg text-slate-300 transition-colors"
                  >
                    Load Dense Jargon Sample
                  </button>
                </div>
              </div>

              {/* Metrics Display Card */}
              <div className="bg-slate-900 border border-teal-500/40 rounded-2xl p-6 shadow-2xl flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-teal-400">
                    Flesch Reading Ease Score
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold text-white font-mono">
                      {stats.flesch}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">/ 100</span>
                  </div>
                  <div className={`text-xs font-bold ${stats.color}`}>
                    {stats.label}
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-800 text-xs font-mono text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Words:</span>
                    <span className="text-white font-bold">{stats.words}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Sentences:</span>
                    <span className="text-white font-bold">{stats.sentences}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Avg Words/Sentence (ASL):</span>
                    <span className="text-teal-300 font-bold">{stats.asl}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Avg Syllables/Word (ASW):</span>
                    <span className="text-teal-300 font-bold">{stats.asw}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700 text-[11px] text-slate-400">
                  Target for Professional Writing: <strong>60 - 70</strong> (ASL under 20).
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: Tone Modulation Workbench */}
        {selectedTab === 'tone' && (
          <section className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Sliders className="w-5 h-5 text-teal-400" />
                The 5 Registers of Tone Modulation
              </h2>
              <p className="text-sm text-slate-300">
                Select a business communication scenario and slide across the 5 tonal registers to calibrate your message.
              </p>
            </div>

            {/* Scenario Selection */}
            <div className="flex flex-wrap gap-2">
              {TONE_SCENARIOS.map(sc => (
                <button
                  key={sc.id}
                  onClick={() => setActiveScenarioId(sc.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    activeScenarioId === sc.id
                      ? 'bg-teal-600 text-white border-teal-400 shadow-md shadow-teal-950'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {sc.title}
                </button>
              ))}
            </div>

            {/* Tone Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'aggressive', label: '1. Aggressive', color: 'border-red-500/50 text-red-300' },
                { id: 'passiveAggressive', label: '2. Passive-Aggressive', color: 'border-amber-500/50 text-amber-300' },
                { id: 'neutral', label: '3. Neutral / Factual', color: 'border-slate-500/50 text-slate-300' },
                { id: 'diplomatic', label: '4. Diplomatic (Standard)', color: 'border-emerald-500/50 text-emerald-300' },
                { id: 'executive', label: '5. Executive / Decisive', color: 'border-indigo-500/50 text-indigo-300' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTone(t.id)}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all text-center ${
                    selectedTone === t.id
                      ? 'bg-slate-800 border-teal-400 text-white shadow-lg ring-1 ring-teal-400'
                      : `bg-slate-900/60 ${t.color} hover:bg-slate-800/60`
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Rendered Tone Card */}
            <div className="bg-slate-900 border border-teal-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono uppercase text-teal-400 font-bold">
                  Tone Result &bull; {selectedTone.toUpperCase()} REGISTER
                </span>
                <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 text-xs rounded-full border border-slate-700 font-mono">
                  Scenario: {activeScenario.title}
                </span>
              </div>

              <div className="p-5 bg-slate-800/60 border border-slate-700 rounded-xl text-base font-medium text-white leading-relaxed font-sans">
                "{activeScenario.tones[selectedTone]}"
              </div>

              <div className="text-xs text-slate-400 pt-2">
                {selectedTone === 'diplomatic' && '✓ Recommended for daily professional collaboration, email correspondence, and problem solving.'}
                {selectedTone === 'executive' && '✓ Recommended for senior leadership communication, urgent contract deadlines, and strategic mandates.'}
                {selectedTone === 'neutral' && '✓ Recommended for audit logs, police reports, and factual incident summaries.'}
                {selectedTone === 'aggressive' && '⚠️ Toxic: Escalates conflict and destroys professional relationships.'}
                {selectedTone === 'passiveAggressive' && '⚠️ Toxic: Evades direct responsibility and creates resentment.'}
              </div>
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
                  Plain English & Tone Mastery ({topic0Questions.length} Questions)
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  Test your mastery of Plain English principles, tone modulation, and professional executive drafting.
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
                    <div className="px-4 py-2 bg-slate-900 border border-teal-500/40 rounded-xl text-sm font-bold text-white">
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
                        ? 'bg-teal-600 text-white'
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
                        <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 font-mono text-xs font-bold flex items-center justify-center border border-teal-500/30">
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
                          btnStyle = 'bg-teal-600/30 border-teal-500 text-white font-semibold shadow-md shadow-teal-950';
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
                          <strong className="text-teal-400">English Analysis: </strong>
                          {q.explanation}
                        </div>
                        {showBengali && q.explanationBn && (
                          <div className="text-xs text-teal-200/90 bg-teal-950/40 p-3 rounded-xl border border-teal-900/50">
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
          <FAQTemplate questions={FAQS} title="Frequently Asked Questions on Plain English" />
        </section>

        {/* Teacher Component */}
        <Teacher />

      </div>
    </div>
  );
}
