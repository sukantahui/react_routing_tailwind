import React, { useState, useMemo } from 'react';
import {
  Type,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Globe,
  FileText,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Layers,
  Search,
  Check,
  Languages,
  Wand2,
  Split
} from 'lucide-react';
import { topic0Questions } from './topic0_files/topic0_questions';
import PlainTextPrint from '../../../common/PlainTextPrint';
import Teacher from '../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../common/FAQTemplate';

const DIALECT_DATA = [
  { uk: 'Colour', us: 'Color', rule: '-our vs -or', note: 'British retains French -our; American simplifies to -or.' },
  { uk: 'Flavour', us: 'Flavor', rule: '-our vs -or', note: 'Standard suffix divergence in sensory words.' },
  { uk: 'Centre', us: 'Center', rule: '-re vs -er', note: 'British maintains French -re ending; American uses phonetic -er.' },
  { uk: 'Theatre', us: 'Theater', rule: '-re vs -er', note: 'Public venue nouns.' },
  { uk: 'Realise', us: 'Realize', rule: '-ise vs -ize', note: 'British accepts both -ise and -ize; American strictly enforces -ize.' },
  { uk: 'Organise', us: 'Organize', rule: '-ise vs -ize', note: 'Greek verb derivation (-izein).' },
  { uk: 'Analyse', us: 'Analyze', rule: '-yse vs -yze', note: 'Greek lysis origin; US changes to -yze.' },
  { uk: 'Licence (Noun)', us: 'License (Noun/Verb)', rule: '-ce vs -se (Noun/Verb)', note: 'UK distinguishes noun (licence) and verb (license). US uses -se for both.' },
  { uk: 'Practice (Noun) / Practise (Verb)', us: 'Practice (Noun/Verb)', rule: '-ce vs -se (Noun/Verb)', note: 'Crucial exam distinction in UK English.' },
  { uk: 'Defence', us: 'Defense', rule: '-ce vs -se', note: 'Military/legal terminology.' },
  { uk: 'Travelling', us: 'Traveling', rule: 'Double -l- in unaccented syllables', note: 'UK doubles terminal L even without accent; US does not double unless stressed.' },
  { uk: 'Cancelled', us: 'Canceled', rule: 'Double -l- in unaccented syllables', note: 'Past tense of cancel.' },
  { uk: 'Catalogue', us: 'Catalog', rule: '-ogue vs -og', note: 'French loan words shortened in American spelling.' },
  { uk: 'Dialogue', us: 'Dialog', rule: '-ogue vs -og', note: 'Standard conversational/digital term.' },
  { uk: 'Paediatric', us: 'Pediatric', rule: 'Ligatures -ae- vs -e-', note: 'Classical Greek diphthongs simplified in US.' }
];

const SPELLING_TRAPS = [
  {
    word: 'Embarrass',
    mistake: 'Embarass / Embaras',
    formula: 'Em + BAR (2 R\'s) + RASS (2 S\'s)',
    meaning: 'লজ্জিত বা অস্বস্তিকর অবস্থায় ফেলা',
    rule: 'Double \'r\' and Double \'s\' are mandatory.'
  },
  {
    word: 'Accommodate',
    mistake: 'Acommodate / Accomodate',
    formula: 'Ac (2 C\'s) + com (2 M\'s) + o + date',
    meaning: 'স্থান দেওয়া বা মানিয়ে নেওয়া',
    rule: 'Double \'c\' AND Double \'m\'.'
  },
  {
    word: 'Definitely',
    mistake: 'Definately / Definitly',
    formula: 'De + FINITE + ly',
    meaning: 'অবশ্যই বা নিশ্চিতভাবে',
    rule: 'Root contains "FINITE" (সীমিত বা নির্দিষ্ট); never write \'a\'.'
  },
  {
    word: 'Separate',
    mistake: 'Seperate',
    formula: 'Sep + A + RAT + e ("There is a RAT in separate")',
    meaning: 'পৃথক বা আলাদা করা',
    rule: 'Middle vowel is \'A\', not \'E\'.'
  },
  {
    word: 'Receive',
    mistake: 'Recieve',
    formula: 'Re + C + EI + ve ("I before E except after C")',
    meaning: 'গ্রহণ করা বা পাওয়া',
    rule: 'Follows the "after C, use EI" rule.'
  },
  {
    word: 'Privilege',
    mistake: 'Priviledge / Privledge',
    formula: 'Priv + i + lege (No \'d\'!)',
    meaning: 'বিশেষ অধিকার বা সুবিধা',
    rule: 'There is NO letter \'D\' in privilege.'
  },
  {
    word: 'Occurrence',
    mistake: 'Occurence / Occurrance',
    formula: 'Oc (2 C\'s) + cur (2 R\'s) + ence',
    meaning: 'ঘটনা বা সংঘটন',
    rule: '1-1-1 stress doubling on \'cur\' + suffix \'-ence\'.'
  },
  {
    word: 'Maintenance',
    mistake: 'Maintainance',
    formula: 'Main + TEN + ance (NOT maintain + ance)',
    meaning: 'রক্ষণাবেক্ষণ',
    rule: 'The diphthong \'ai\' in maintain collapses into \'ten\' in maintenance.'
  },
  {
    word: 'Bureaucracy',
    mistake: 'Beurocracy / Bureaucrasy',
    formula: 'Bureau (French desk) + cracy',
    meaning: 'আমলাতন্ত্র',
    rule: 'Begins with B-U-R-E-A-U.'
  },
  {
    word: 'Millennium',
    mistake: 'Millenium / Milennium',
    formula: 'Mil (2 L\'s) + len (2 N\'s) + ium',
    meaning: 'সহস্রাব্দ (১০০০ বছর)',
    rule: 'Double \'l\' and Double \'n\'.'
  },
  {
    word: 'Weird',
    mistake: 'Wierd',
    formula: 'W + EI + rd',
    meaning: 'অদ্ভুত বা অস্বাভাবিক',
    rule: 'One of the primary 8 exceptions to "I before E".'
  },
  {
    word: 'Mischievous',
    mistake: 'Mischievious',
    formula: 'Mis + chiev + ous (3 syllables only)',
    meaning: 'দুষ্টু বা ক্ষতিকর চঞ্চল',
    rule: 'Only 3 syllables! No \'i\' after \'v\'.'
  }
];

const FAQS = [
  {
    question: 'When should compass directions (North, South, East, West) be capitalized?',
    answer: 'Capitalize them when they refer to specific, recognized geographical regions, political entities, or cultural blocs (e.g., "the Middle East", "Western Europe", "tensions between the North and the South"). Keep them lowercase when indicating general compass direction or movement (e.g., "drive north for two miles", "southern Bengal").'
  },
  {
    question: 'Why is "mother" capitalized in "I spoke to Mother" but lowercase in "I spoke to my mother"?',
    answer: 'When used without a possessive pronoun (my, your, his, her) or article, "Mother" functions as a direct proper name. When preceded by a modifier like "my", it acts as a common noun and remains lowercase.'
  },
  {
    question: 'What is the 1-1-1 doubling rule in English spelling?',
    answer: 'For a one-syllable word ending in 1 vowel + 1 consonant (e.g., run, hop), double the final consonant before adding a vowel suffix (running, hopped). For multi-syllable words, double only if the stress is on the final syllable (pre-FER -> preferring vs. VI-sit -> visited).'
  },
  {
    question: 'What are the main exceptions to "I before E except after C"?',
    answer: 'The primary exceptions tested in competitive exams are: weird, seize, leisure, forfeit, sovereign, species, caffeine, foreign, and neighbor/weigh (sounding like /ay/).'
  },
  {
    question: 'Is it acceptable to mix British and American spellings in the same document?',
    answer: 'No. Consistency is essential in academic and professional writing. Choose either British English (colour, centre, realise, travelled) or American English (color, center, realize, traveled) and adhere to it throughout.'
  }
];

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(true);
  const [selectedTab, setSelectedTab] = useState('rules'); // 'rules' | 'dialects' | 'traps' | 'titlecase' | 'practice'
  const [searchTerm, setSearchTerm] = useState('');
  
  // Title case tool state
  const [inputTitle, setInputTitle] = useState('the old man and the sea: an epic journey into the deep waters of cuba');
  
  // Practice Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'unanswered' | 'incorrect'

  // Title Case Formatter Engine
  const formattedTitle = useMemo(() => {
    if (!inputTitle.trim()) return '';
    const minorWords = new Set([
      'a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for', 'so', 'yet',
      'as', 'at', 'by', 'in', 'of', 'off', 'on', 'per', 'to', 'up', 'via', 'with'
    ]);
    
    const words = inputTitle.trim().split(/\s+/);
    return words.map((word, index) => {
      const cleanWord = word.toLowerCase();
      // Check if first or last word, or after a colon
      const isFirst = index === 0;
      const isLast = index === words.length - 1;
      const prevWordHadColon = index > 0 && words[index - 1].endsWith(':');
      
      if (isFirst || isLast || prevWordHadColon || !minorWords.has(cleanWord)) {
        return cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1);
      }
      return cleanWord;
    }).join(' ');
  }, [inputTitle]);

  // Dialect Filtered Data
  const filteredDialects = useMemo(() => {
    if (!searchTerm.trim()) return DIALECT_DATA;
    const term = searchTerm.toLowerCase();
    return DIALECT_DATA.filter(
      item => item.uk.toLowerCase().includes(term) ||
              item.us.toLowerCase().includes(term) ||
              item.rule.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Quiz Handling
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
        <header className="relative bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-indigo-500/20">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/20 rounded-xl border border-indigo-500/40 text-indigo-400">
                <Type className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  Segment 009 &bull; Module 002
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Capitalization Rules & Spelling Mechanics
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Master title case, the 6 core orthographic rules, British vs. American divergence, and high-frequency exam traps.
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
                filePath="e:/React Project/react_routing_tailwind/src/components/study/english-grammar/topics/009_002_capitalization-and-spelling-mechanics/topic0_files/topic0_note.txt"
                buttonText="Print ASCII Notes"
              />
            </div>
          </div>

          {/* Bilingual Alert / Pedagogical Intro */}
          {showBengali && (
            <div className="mt-4 p-4 bg-indigo-950/60 border border-indigo-500/30 rounded-xl text-indigo-200 text-sm leading-relaxed flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">বাংলা মাধ্যম শিক্ষার্থীদের জন্য বিশেষ নির্দেশিকা:</p>
                <p className="mt-0.5 text-indigo-200/90">
                  ইংরেজি বানান ও ক্যাপিটালাইজেশন শুধুমাত্র মুখস্থ করার বিষয় নয়, এর পেছনে সুস্পষ্ট ব্যাকরণিক যুক্তি ও ধ্বনিতাত্ত্বিক (phonetic) নিয়ম রয়েছে। এখানে আমরা সব ব্যাকরণিক পারিভাষিক শব্দ ইংরেজিতে বজায় রেখে বাংলা ব্যাখ্যার সাহায্যে 1-1-1 Doubling, Silent \'E\', এবং ব্রিটিশ বনাম আমেরিকান বানানের সূক্ষ্ম পার্থক্যগুলো আয়ত্ত করব।
                </p>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <nav className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
            {[
              { id: 'rules', label: '6 Core Orthographic Rules', icon: BookOpen },
              { id: 'titlecase', label: 'Title Case Formatter Lab', icon: Wand2 },
              { id: 'dialects', label: 'UK vs. US Spelling Matrix', icon: Split },
              { id: 'traps', label: 'Exam Spelling Traps', icon: AlertTriangle },
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
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/30'
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

        {/* TAB 1: 6 Core Orthographic Rules */}
        {selectedTab === 'rules' && (
          <section className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                The 6 Master Spelling Rules Architecture
              </h2>
              <p className="text-sm text-slate-300">
                Master these foundational phonological and morphological guidelines to eliminate 95% of common orthographic errors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rule 1: 1-1-1 Doubling */}
              <div className="bg-slate-800/40 border border-indigo-500/30 rounded-2xl p-6 hover:border-indigo-500/60 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/40">
                      Rule 1
                    </span>
                    <span className="text-xs text-slate-400">Morphology</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">The 1-1-1 Doubling Rule</h3>
                  <p className="text-sm text-slate-300">
                    A monosyllabic word (1 syllable) with <strong>1 single vowel</strong> followed by <strong>1 single consonant</strong> doubles the final consonant when adding a vowel suffix (-ed, -ing, -er, -est).
                  </p>
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700 text-xs space-y-1 font-mono text-emerald-300">
                    <div>run + ing &rarr; run<span className="text-amber-400 font-bold">n</span>ing</div>
                    <div>hop + ed &rarr; hop<span className="text-amber-400 font-bold">p</span>ed (vs. hope + ed &rarr; hoped)</div>
                    <div>fat + est &rarr; fat<span className="text-amber-400 font-bold">t</span>est</div>
                  </div>
                  {showBengali && (
                    <p className="text-xs text-indigo-300/90 italic bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-900/50">
                      <strong>বাংলা নিয়ম:</strong> এক শব্দের শব্দাংশে ১টি স্বরবর্ণ + ১টি ব্যঞ্জনবর্ণ থাকলে suffix যোগের সময় শেষ অক্ষর দ্বৈত হয়। দুই সিলেবলের ক্ষেত্রে স্ট্রেস শেষের দিকে থাকলে দ্বৈত হয় (pre-FER &rarr; preferring), কিন্তু শুরুতে থাকলে হয় না (VI-sit &rarr; visited)।
                    </p>
                  )}
                </div>
              </div>

              {/* Rule 2: Silent 'E' */}
              <div className="bg-slate-800/40 border border-indigo-500/30 rounded-2xl p-6 hover:border-indigo-500/60 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/40">
                      Rule 2
                    </span>
                    <span className="text-xs text-slate-400">Vowel Elision</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Silent 'E' (Drop vs. Retain)</h3>
                  <p className="text-sm text-slate-300">
                    <strong>Drop</strong> silent 'e' when adding a suffix starting with a vowel (-ing, -able, -ous). <strong>Keep</strong> silent 'e' before consonant suffixes (-ment, -ful, -ly).
                  </p>
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700 text-xs space-y-1 font-mono text-emerald-300">
                    <div>write + ing &rarr; writing | hope + ful &rarr; hopeful</div>
                    <div className="text-amber-300">CRITICAL: Keep 'e' after soft c/g: courage + ous &rarr; courageous, notice + able &rarr; noticeable</div>
                  </div>
                  {showBengali && (
                    <p className="text-xs text-indigo-300/90 italic bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-900/50">
                      <strong>বাংলা নিয়ম:</strong> নরম উচ্চারণ (soft \'c\' = /s/, soft \'g\' = /dʒ/) বজায় রাখার জন্য -able বা -ous এর পূর্বে \'e\' বজায় রাখতে হয় (noticeable, changeable)।
                    </p>
                  )}
                </div>
              </div>

              {/* Rule 3: 'Y' to 'I' Mutation */}
              <div className="bg-slate-800/40 border border-indigo-500/30 rounded-2xl p-6 hover:border-indigo-500/60 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/40">
                      Rule 3
                    </span>
                    <span className="text-xs text-slate-400">Mutation</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">'Y' to 'I' Mutation Rule</h3>
                  <p className="text-sm text-slate-300">
                    If a consonant precedes 'y', change 'y' to 'i' before any suffix (except -ing). If a vowel precedes 'y', keep the 'y'.
                  </p>
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700 text-xs space-y-1 font-mono text-emerald-300">
                    <div>study + es &rarr; studies | happy + ly &rarr; happily</div>
                    <div>play + ed &rarr; played (vowel \'a\' + \'y\')</div>
                    <div className="text-amber-300">carry + ing &rarr; carrying (avoids \'ii\')</div>
                  </div>
                  {showBengali && (
                    <p className="text-xs text-indigo-300/90 italic bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-900/50">
                      <strong>বাংলা নিয়ম:</strong> ব্যঞ্জনবর্ণের পর \'y\' থাকলে তা \'i\' হয় (cry &rarr; cries), কিন্তু -ing যোগ করার সময় ডাবল \'i\' এড়াতে \'y\' অক্ষত থাকে (crying)।
                    </p>
                  )}
                </div>
              </div>

              {/* Rule 4: I Before E */}
              <div className="bg-slate-800/40 border border-indigo-500/30 rounded-2xl p-6 hover:border-indigo-500/60 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/40">
                      Rule 4
                    </span>
                    <span className="text-xs text-slate-400">Phonemic Order</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">"I Before E Except After C"</h3>
                  <p className="text-sm text-slate-300">
                    Use <em>IE</em> for the long /ee/ sound (achieve, believe). Use <em>EI</em> after 'C' (receive, ceiling) or when sounding like /ay/ (neighbor, weigh).
                  </p>
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700 text-xs space-y-1 font-mono text-amber-300">
                    <div>8 EXAM EXCEPTIONS: weird, seize, leisure, forfeit, sovereign, species, caffeine, foreign</div>
                  </div>
                  {showBengali && (
                    <p className="text-xs text-indigo-300/90 italic bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-900/50">
                      <strong>বাংলা নিয়ম:</strong> \'C\' এর পরে সর্বদা \'EI\' বসে (receipt, deceive)। কিন্তু weird, seize, leisure প্রভৃতি ব্যতিক্রমগুলো পরীক্ষায় সবচেয়ে বেশি আসে।
                    </p>
                  )}
                </div>
              </div>

              {/* Rule 5: Suffix Selection */}
              <div className="bg-slate-800/40 border border-indigo-500/30 rounded-2xl p-6 hover:border-indigo-500/60 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/40">
                      Rule 5
                    </span>
                    <span className="text-xs text-slate-400">Suffix Mechanics</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">-able vs. -ible / -ceed vs. -cede</h3>
                  <p className="text-sm text-slate-300">
                    <strong>-able</strong> attaches to standalone base words (dependable, acceptable). <strong>-ible</strong> attaches to non-standalone root stems (audible, visible).
                  </p>
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700 text-xs space-y-1 font-mono text-emerald-300">
                    <div>1 -SEDE: supersede | 3 -CEED: exceed, proceed, succeed</div>
                    <div>ALL OTHERS: -cede (precede, concede, accede, recede)</div>
                  </div>
                  {showBengali && (
                    <p className="text-xs text-indigo-300/90 italic bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-900/50">
                      <strong>বাংলা নিয়ম:</strong> পুরো ইংরেজি ভাষায় একমাত্র \'supersede\' শব্দটিতে \'-sede\' বসে, এবং শুধুমাত্র তিনটি শব্দে \'-ceed\' বসে (exceed, proceed, succeed)। বাকি সবই \'-cede\'।
                    </p>
                  )}
                </div>
              </div>

              {/* Rule 6: Latin/Greek Plurals */}
              <div className="bg-slate-800/40 border border-indigo-500/30 rounded-2xl p-6 hover:border-indigo-500/60 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/40">
                      Rule 6
                    </span>
                    <span className="text-xs text-slate-400">Classical Inflections</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Latin & Greek Pluralizations</h3>
                  <p className="text-sm text-slate-300">
                    Scientific and academic vocabulary preserves original Latin and Greek inflections.
                  </p>
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700 text-xs space-y-1 font-mono text-emerald-300">
                    <div>-sis &rarr; -ses: crisis &rarr; crises, analysis &rarr; analyses</div>
                    <div>-on / -um &rarr; -a: criterion &rarr; criteria, datum &rarr; data</div>
                    <div>-us &rarr; -i: stimulus &rarr; stimuli, radius &rarr; radii</div>
                  </div>
                  {showBengali && (
                    <p className="text-xs text-indigo-300/90 italic bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-900/50">
                      <strong>বাংলা নিয়ম:</strong> \'Criteria\' এবং \'Data\' বহুবচন (Plural)। এদের সাথে বহুবচন ক্রিয়াপদ ব্যবহৃত হয় (These criteria are met)।
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: Title Case Formatter Lab */}
        {selectedTab === 'titlecase' && (
          <section className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Wand2 className="w-5 h-5 text-indigo-400" />
                Interactive Title Case Standard Engine (Chicago / APA Style)
              </h2>
              <p className="text-sm text-slate-300">
                Type any unformatted book title, article headline, or academic paper title to see real-time algorithmic headline capitalization.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 space-y-4">
                <label className="text-sm font-semibold text-slate-200 block">
                  Input Raw Text / Lowercase Title:
                </label>
                <textarea
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors resize-none font-mono"
                  placeholder="Type a title here..."
                />
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Standard: Chicago Manual of Style (CMS)</span>
                  <button
                    onClick={() => setInputTitle('to kill a mockingbird: an inquiry into southern justice')}
                    className="text-indigo-400 hover:text-indigo-300 underline"
                  >
                    Load Sample
                  </button>
                </div>
              </div>

              <div className="bg-slate-800/40 border border-indigo-500/40 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                    Algorithmic Output (Standard Title Case)
                  </span>
                  <div className="p-4 bg-slate-900 border border-indigo-500/30 rounded-xl text-lg font-bold text-white font-serif tracking-wide shadow-inner">
                    {formattedTitle || <span className="text-slate-500 italic">Output will appear here...</span>}
                  </div>
                </div>

                <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-xs space-y-2 text-slate-300">
                  <div className="font-semibold text-indigo-300">Capitalization Rules Applied:</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    <li>First and last words are always capitalized.</li>
                    <li>All major words (nouns, verbs, adjectives, adverbs) capitalized.</li>
                    <li>Articles (<code className="text-amber-300">a, an, the</code>), conjunctions (<code className="text-amber-300">and, but, for</code>), and short prepositions (<code className="text-amber-300">in, of, into, to</code>) remain lowercase.</li>
                    <li>Word immediately following a colon (<code className="text-amber-300">:</code>) is capitalized.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: UK vs US Spelling Matrix */}
        {selectedTab === 'dialects' && (
          <section className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                  <Split className="w-5 h-5 text-indigo-400" />
                  British (UK) vs. American (US) Systematic Orthography
                </h2>
                <p className="text-sm text-slate-300">
                  Compare historical and phonological divergences between UK and US spelling standards.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search words or rules..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-700/60 shadow-xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800/80 text-xs font-semibold uppercase tracking-wider text-slate-300 border-b border-slate-700">
                  <tr>
                    <th className="p-4">Pattern / Rule</th>
                    <th className="p-4 text-sky-400">British English (UK)</th>
                    <th className="p-4 text-emerald-400">American English (US)</th>
                    <th className="p-4 text-slate-400">Linguistic Analysis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                  {filteredDialects.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-mono text-xs font-bold text-indigo-300">{item.rule}</td>
                      <td className="p-4 font-medium text-sky-300">{item.uk}</td>
                      <td className="p-4 font-medium text-emerald-300">{item.us}</td>
                      <td className="p-4 text-xs text-slate-400">{item.note}</td>
                    </tr>
                  ))}
                  {filteredDialects.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-6 text-center text-slate-500 text-sm">
                        No spelling pairs found matching "{searchTerm}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 4: Exam Spelling Traps */}
        {selectedTab === 'traps' && (
          <section className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                Top High-Frequency Exam Spelling Traps & Mnemonic Formulas
              </h2>
              <p className="text-sm text-slate-300">
                Detailed breakdowns of the 12 most commonly misspelled words in competitive government, banking, and academic exams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SPELLING_TRAPS.map((trap, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/40 border border-slate-700 hover:border-amber-500/50 rounded-2xl p-5 space-y-3 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-emerald-400 font-mono tracking-wide">
                        {trap.word}
                      </span>
                      <span className="px-2 py-0.5 bg-red-500/10 text-red-400 text-xs rounded border border-red-500/20 font-mono line-through">
                        {trap.mistake}
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-amber-300">
                      <div className="text-[10px] uppercase text-slate-500 font-sans font-bold">Mnemonic Formula:</div>
                      {trap.formula}
                    </div>

                    {showBengali && (
                      <div className="text-xs text-indigo-300">
                        <span className="font-semibold text-slate-400">অর্থ: </span>
                        {trap.meaning}
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 border-t border-slate-800/60 pt-2">
                    {trap.rule}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 5: Interactive Practice Lab (25 MCQs) */}
        {selectedTab === 'practice' && (
          <section className="space-y-6">
            {/* Quiz Banner & Action Bar */}
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Interactive Diagnostic Assessment ({topic0Questions.length} Questions)
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  Test your mastery of capitalization, doubling rules, silent 'e', 'ie/ei' sequences, and British vs. American orthography.
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
                    <div className="px-4 py-2 bg-slate-900 border border-indigo-500/40 rounded-xl text-sm font-bold text-white">
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

            {/* Filter Tabs when submitted */}
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
                        ? 'bg-indigo-600 text-white'
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
                        <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 font-mono text-xs font-bold flex items-center justify-center border border-indigo-500/30">
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
                          btnStyle = 'bg-indigo-600/30 border-indigo-500 text-white font-semibold shadow-md shadow-indigo-950';
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

                    {/* Explanations (Dual English & Bengali) */}
                    {submitted && (
                      <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                        <div className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                          <strong className="text-indigo-400">English Analysis: </strong>
                          {q.explanation}
                        </div>
                        {showBengali && q.explanationBn && (
                          <div className="text-xs text-indigo-200/90 bg-indigo-950/40 p-3 rounded-xl border border-indigo-900/50">
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
          <FAQTemplate questions={FAQS} title="Frequently Asked Questions & Exam Mechanics" />
        </section>

        {/* Teacher Component */}
        <Teacher />

      </div>
    </div>
  );
}
