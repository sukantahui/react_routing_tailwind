import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic17_files/worked_example_4_spam_email_classification_lab.py?raw";
import noteText from "./topic17_files/topic17_note.txt?raw";
import questions from "./topic17_files/topic17_questions.js";

const Topic17 = () => {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");

  // Novice Classroom Tab State
  const [selectedLessonTab, setSelectedLessonTab] = useState("intuition");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Interactive Spam Classifier State
  const [emailText, setEmailText] = useState("URGENT: Claim your lottery cash prize of 10 Lakhs immediately! Click here to win.");
  const [laplaceSmoothing, setLaplaceSmoothing] = useState(1.0); // alpha = 1
  const [selectedEmailPreset, setSelectedEmailPreset] = useState("lottery");

  const svgId = useId();

  // Presets
  const emailPresets = {
    lottery: {
      name: "Phishing Lottery Alert",
      text: "URGENT: Claim your lottery cash prize of 10 Lakhs immediately! Click here to win free bonus now.",
      type: "Spam"
    },
    academic: {
      name: "Barrackpore College Assignment",
      text: "Dear Mamata, please find attached the machine learning laboratory assignment due next Monday in class.",
      type: "Ham (Legitimate)"
    },
    banking: {
      name: "UPI Transaction Receipt",
      text: "Your account has been debited by INR 350 for groceries at Ichapur market. Transaction reference 89124.",
      type: "Ham (Legitimate)"
    },
    crypto: {
      name: "Crypto Investment Scheme",
      text: "Guaranteed 500% profit in 24 hours! Invest your crypto coins now for free instant bonus cash payout.",
      type: "Spam"
    }
  };

  const handleSelectPreset = (key) => {
    setSelectedEmailPreset(key);
    setEmailText(emailPresets[key].text);
  };

  // Smooth scroll handler
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // High-signal vocabulary weights in Naive Bayes model
  const vocabWeights = {
    urgent: { spamLogProb: -1.2, hamLogProb: -4.5, tag: "High Spam Signal" },
    lottery: { spamLogProb: -0.8, hamLogProb: -6.0, tag: "High Spam Signal" },
    prize: { spamLogProb: -1.0, hamLogProb: -5.2, tag: "High Spam Signal" },
    free: { spamLogProb: -1.1, hamLogProb: -3.8, tag: "High Spam Signal" },
    win: { spamLogProb: -1.3, hamLogProb: -4.2, tag: "High Spam Signal" },
    bonus: { spamLogProb: -1.4, hamLogProb: -4.9, tag: "High Spam Signal" },
    cash: { spamLogProb: -1.5, hamLogProb: -4.0, tag: "Moderate Spam" },
    click: { spamLogProb: -1.6, hamLogProb: -3.5, tag: "Moderate Spam" },
    assignment: { spamLogProb: -5.5, hamLogProb: -1.8, tag: "High Ham Signal" },
    laboratory: { spamLogProb: -6.0, hamLogProb: -1.9, tag: "High Ham Signal" },
    monday: { spamLogProb: -4.8, hamLogProb: -2.1, tag: "High Ham Signal" },
    account: { spamLogProb: -2.8, hamLogProb: -2.0, tag: "Neutral Word" },
    debited: { spamLogProb: -5.2, hamLogProb: -1.7, tag: "High Ham Signal" },
    transaction: { spamLogProb: -3.1, hamLogProb: -1.9, tag: "High Ham Signal" }
  };

  // Tokenize user input
  const tokens = emailText.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);

  // Calculate Naive Bayes Log Likelihoods
  let logProbSpam = Math.log(0.40); // Prior P(Spam) = 40%
  let logProbHam = Math.log(0.60); // Prior P(Ham) = 60%
  const matchedKeywords = [];

  tokens.forEach((t) => {
    if (vocabWeights[t]) {
      logProbSpam += vocabWeights[t].spamLogProb;
      logProbHam += vocabWeights[t].hamLogProb;
      matchedKeywords.push({ word: t, ...vocabWeights[t] });
    } else {
      // Laplace smoothed default for unseen words
      logProbSpam += -4.0;
      logProbHam += -3.5;
    }
  });

  // Softmax / Sigmoid conversion of log-odds
  const logOdds = logProbSpam - logProbHam;
  const spamProbability = 1.0 / (1.0 + Math.exp(-Math.max(-20, Math.min(20, logOdds))));
  const spamProbPct = +(spamProbability * 100).toFixed(1);
  const isSpam = spamProbability >= 0.50;

  // Comprehensive Jargon Glossary
  const jargonTerms = [
    {
      id: "naive-bayes",
      term: "Naive Bayes Classifier",
      category: "core",
      badge: "Probabilistic Model",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      pronunciation: "nɑːˈiːv beɪz",
      plainEnglish: "A fast, probabilistic text classification algorithm based on Bayes' Theorem, making the 'naive' assumption that every word appears independently of other words.",
      everydayAnalogy: "Assuming that finding the word 'Lottery' and the word 'Winner' in an email are two completely independent coin flips.",
      whyItMatters: "Despite its naive assumption, it performs exceptionally well for spam filtering and document triage with ultra-fast training speeds."
    },
    {
      id: "bag-of-words",
      term: "Bag of Words (BoW) Representation",
      category: "nlp",
      badge: "Text Vectorization",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "bæɡ ɒv wɜːdz",
      plainEnglish: "Converting a text sentence into a simple frequency count of words, completely ignoring grammar and sentence word order.",
      everydayAnalogy: "Dumping all the Scrabble letter tiles from an email into a bag and simply counting how many times 'urgent' or 'prize' appears.",
      whyItMatters: "Turns unstructured human text into a structured numerical feature vector X."
    },
    {
      id: "tf-idf",
      term: "TF-IDF (Term Frequency - Inverse Document Frequency)",
      category: "nlp",
      badge: "Keyword Weighting",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "tiː-ɛf aɪ-diː-ɛf",
      plainEnglish: "A weighting formula that rewards words that appear frequently in a specific email (TF) but penalizes common words like 'the', 'is', 'and' that appear in every document (IDF).",
      everydayAnalogy: "Searching for books on 'Mango farming': 'Mango' gets a massive score, while 'farming' and 'the' get discounted because they appear in thousands of other books.",
      whyItMatters: "Filters out uninformative common filler words without needing manual stopword lists."
    },
    {
      id: "laplace-smoothing",
      term: "Laplace (Add-1) Smoothing",
      category: "math",
      badge: "Zero Probability Fix",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "ləˈplɑːs ˈsmuː.ðɪŋ",
      plainEnglish: "Adding a small pseudo-count (e.g. +1) to every vocabulary word to prevent multiplying by 0 when a brand-new unseen word appears.",
      everydayAnalogy: "If you have never seen a black swan before, assuming there is still a tiny 0.001% chance one exists rather than declaring black swans mathematically impossible (0%).",
      whyItMatters: "Without Laplace smoothing, a single unseen word would wipe out the entire email calculation: P(Spam) × 0 = 0."
    },
    {
      id: "log-likelihood",
      term: "Log-Likelihood Summation",
      category: "math",
      badge: "Underflow Defense",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      pronunciation: "lɒɡ ˈlaɪ.kli.hʊd",
      plainEnglish: "Summing the logarithms of probabilities instead of multiplying small decimals (e.g. 0.001 × 0.0004) to prevent computer floating-point underflow.",
      everydayAnalogy: "Adding steps on a fitness tracker (1000 + 2000) rather than multiplying tiny fractions.",
      whyItMatters: "Multiplying 50 tiny word probabilities results in 0.0000000000000000001, causing computer memory errors. Log sums avoid this completely."
    }
  ];

  // Diagnostic Quiz Questions
  const quizQuestions = [
    {
      question: "Why is the Naive Bayes algorithm called 'Naive'?",
      options: [
        "Because it was invented by a beginner programmer.",
        "Because it assumes all words in a document are conditionally independent of each other given the class.",
        "Because it only works on short text messages.",
        "Because it cannot process numbers."
      ],
      correctIndex: 1,
      explanation: "It is called 'Naive' because it makes the simplifying assumption that the presence of one word (e.g. 'Cash') is completely independent of other words (e.g. 'Prize'), even though words in human language are clearly correlated."
    },
    {
      question: "What catastrophic problem does Laplace (Add-1) Smoothing prevent in Naive Bayes?",
      options: [
        "Emails from taking up too much hard drive space.",
        "A single unseen word having a probability of 0, which would zero out the entire product: P(Spam) × 0 = 0.",
        "The computer screen from freezing during matrix multiplication.",
        "Spam emails from being deleted automatically."
      ],
      correctIndex: 1,
      explanation: "If a legitimate email contains just one brand-new word never seen in the spam training database, P(Word|Spam) = 0. Multiplying all probabilities by 0 would make P(Spam|Email) = 0, causing the filter to fail. Laplace smoothing adds +1 to all counts to guarantee non-zero probabilities."
    },
    {
      question: "Why do we add log-probabilities (log P) instead of multiplying raw probabilities (P) in text classifiers?",
      options: [
        "Logarithms make the computer CPU run cooler.",
        "Multiplying hundreds of tiny probabilities causes floating-point numerical underflow (rounding down to zero in memory).",
        "Logarithms convert text strings to uppercase.",
        "Because Bayes' Theorem requires logarithms by law."
      ],
      correctIndex: 1,
      explanation: "Multiplying 100 probabilities of value ~0.001 yields 10^(-300), which exceeds the precision limit of 64-bit floating point numbers (arithmetic underflow). Transforming products into sums via log(A × B) = log A + log B guarantees numerical stability."
    }
  ];

  // Filtered Jargon Glossary
  const filteredJargon = useMemo(() => {
    return jargonTerms.filter((item) => {
      const matchesCategory =
        selectedJargonCategory === "all" || item.category === selectedJargonCategory;
      const matchesSearch =
        item.term.toLowerCase().includes(jargonSearchQuery.toLowerCase()) ||
        item.plainEnglish.toLowerCase().includes(jargonSearchQuery.toLowerCase()) ||
        item.everydayAnalogy.toLowerCase().includes(jargonSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedJargonCategory, jargonSearchQuery]);

  return (
    <div className="space-y-10 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16 px-4 sm:px-6">
      {/* HEADER BANNER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-3xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Module 1 • Topic 17
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Natural Language Processing
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Naive Bayes &amp; Bag of Words
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Worked Example 4: Spam Email Classification
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            A comprehensive, hands-on walkthrough of text classification using Natural Language Processing. Understand tokenization, Bag of Words, Bayes' Theorem, Laplace smoothing, and log-likelihood probability calculations.
          </p>

          <div className="flex flex-wrap gap-2 pt-3">
            {[
              { id: "noviceMasterclass", label: "🎓 Master Teacher's Classroom", icon: "👨‍🏫" },
              { id: "simulator", label: "⚡ Interactive NLP Spam Studio", icon: "🔬" },
              { id: "theory", label: "📐 Bayes' Theorem & Laplace Math", icon: "⚙️" },
              { id: "caseStudies", label: "🏭 Regional Industrial Cases", icon: "🏢" },
              { id: "diagnosticQuiz", label: "📝 Knowledge Diagnostic Check", icon: "✨" },
              { id: "bestPractices", label: "🛡️ Pitfalls & Best Practices", icon: "⚠️" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={clsx(
                  "px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer",
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 border border-indigo-400"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60"
                )}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* SECTION 0: MASTER TEACHER'S CLASSROOM */}
      <section
        id="noviceMasterclass"
        className="bg-slate-900/95 p-6 sm:p-10 rounded-3xl border border-indigo-900/50 shadow-2xl space-y-8 relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-2xl shadow-lg shadow-indigo-600/30">
              👨‍🏫
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">
                Teacher Sukanta Hui's Foundational Lecture
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                How Algorithms Read Text: The Royal Postal Sorter Analogy
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/90 px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 font-mono">
            <span>⏱️ 14 min NLP guide</span>
          </div>
        </div>

        {/* Teacher's Welcome Dialogue */}
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/60 p-6 rounded-2xl border border-indigo-800/40 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <span>👋 Welcome, student! Let us see how machines transform human words into mathematical probabilities.</span>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Imagine an experienced postal inspector at the Central Post Office in Kolkata. When a suspicious envelope arrives, the inspector glaces at the stamp and words on the envelope. If words like <em>"Guaranteed Lottery Winner"</em>, <em>"Urgent Cash Claim"</em>, and <em>"No Bank Verification Needed"</em> are printed in bold, the inspector immediately flags it as a scam with 99% confidence.
          </p>
          <p className="text-sm text-indigo-200 font-medium">
            Natural Language Processing (NLP) with Naive Bayes turns this word-clue inspection into exact mathematical probabilities using Bayes' Rule!
          </p>
        </div>

        {/* Sub-Lesson Tabs */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
            {[
              { id: "intuition", label: "1. The 3 Steps of Text NLP", icon: "📝" },
              { id: "bayes", label: "2. Bayes' Theorem in Plain English", icon: "📐" },
              { id: "jargon", label: "3. Jargon Buster Glossary", icon: "📖" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedLessonTab(tab.id)}
                className={clsx(
                  "px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer",
                  selectedLessonTab === tab.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-slate-800 text-slate-400 hover:text-slate-200"
                )}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Sub-Lesson 1: The 3 Steps of Text NLP */}
          {selectedLessonTab === "intuition" && (
            <div className="space-y-6 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>📝</span> The 3-Step Pipeline: From Raw English to Probabilities
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Step 1: Tokenization &amp; Cleaning</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Convert raw email into lowercase words and strip punctuation: "Win Free Cash!" ➔ <code className="text-cyan-300 bg-slate-950 px-1 rounded">["win", "free", "cash"]</code>.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Step 2: Bag-of-Words Vector</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Map tokens to historical vocabulary frequencies to count how often each word appeared in past spam vs ham emails.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase">Step 3: Naive Bayes Log-Odds</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Sum the log-likelihoods of all words and apply the Sigmoid function to output final P(Spam | Email).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Lesson 2: Bayes' Theorem in Plain English */}
          {selectedLessonTab === "bayes" && (
            <div className="space-y-4 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>📐</span> Bayes' Theorem: Updating Belief with Evidence
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Before reading an email, what is the chance it is spam? That is our <strong>Prior Probability P(Spam)</strong> (e.g. 40%). As we read suspicious words, each word acts as new evidence multiplying our posterior probability:
                </p>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 text-center">
                  {"P(Spam | Words) ∝ P(Spam) × P(Word₁|Spam) × P(Word₂|Spam) × ... × P(Word_k|Spam)"}
                </div>
              </div>
            </div>
          )}

          {/* Sub-Lesson 3: Jargon Buster */}
          {selectedLessonTab === "jargon" && (
            <div className="space-y-6 pt-2">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "All Terms" },
                    { id: "core", label: "Algorithm" },
                    { id: "nlp", label: "NLP Text" },
                    { id: "math", label: "Math & Smoothing" }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedJargonCategory(cat.id)}
                      className={clsx(
                        "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                        selectedJargonCategory === cat.id
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                          : "bg-slate-800 text-slate-400 hover:text-slate-200"
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search Worked Example 4 jargon..."
                    value={jargonSearchQuery}
                    onChange={(e) => setJargonSearchQuery(e.target.value)}
                    className="w-full sm:w-64 bg-slate-950 border border-slate-700 text-xs px-3.5 py-2 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                  {jargonSearchQuery && (
                    <button
                      onClick={() => setJargonSearchQuery("")}
                      className="absolute right-3 top-2 text-xs text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredJargon.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all space-y-3 shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-wide">{item.term}</h4>
                        <span className="text-[11px] font-mono text-slate-400">{item.pronunciation}</span>
                      </div>
                      <span className={clsx("px-2 py-0.5 text-[10px] font-mono uppercase font-bold rounded border", item.badgeColor)}>
                        {item.badge}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div>
                        <strong className="text-cyan-400 font-medium">Simple Meaning: </strong>
                        <span className="text-slate-300">{item.plainEnglish}</span>
                      </div>
                      <div>
                        <strong className="text-amber-400 font-medium">Everyday Analogy: </strong>
                        <span className="text-slate-300">{item.everydayAnalogy}</span>
                      </div>
                      <div>
                        <strong className="text-indigo-400 font-medium">Why It Matters: </strong>
                        <span className="text-slate-400">{item.whyItMatters}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 1: INTERACTIVE NLP SPAM STUDIO */}
      <section
        id="simulator"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive NLP Spam Classifier Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Type or select email text, observe live keyword tokenization, and inspect log-likelihood probability calculations
            </p>
          </div>
        </div>

        {/* Email Preset Selectors */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Select an Email Sample:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.keys(emailPresets).map((key) => {
              const e = emailPresets[key];
              return (
                <button
                  key={key}
                  onClick={() => handleSelectPreset(key)}
                  className={clsx(
                    "p-3 rounded-xl border text-left transition-all cursor-pointer space-y-1",
                    selectedEmailPreset === key
                      ? "bg-indigo-600/30 border-indigo-400 text-white shadow-lg shadow-indigo-600/30"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  )}
                >
                  <div className="text-xs font-bold leading-tight line-clamp-1">{e.name}</div>
                  <div className="text-[10px] text-cyan-400 font-mono">{e.type}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Text Area & Token Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
              1. Email Body Text Input
            </h3>
            <textarea
              rows={3}
              value={emailText}
              onChange={(e) => {
                setEmailText(e.target.value);
                setSelectedEmailPreset("");
              }}
              placeholder="Type any email message here to analyze spam probabilities..."
              className="w-full bg-slate-900 border border-slate-700 text-xs p-3 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 font-mono leading-relaxed"
            />

            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono pt-2 border-t border-slate-800">
              2. Extracted Keyword Token Signals ({matchedKeywords.length} High-Signal Words Found)
            </h3>

            <div className="flex flex-wrap gap-2">
              {matchedKeywords.length === 0 ? (
                <span className="text-xs text-slate-500 italic">No strong spam/ham keyword triggers found. Defaulting to prior base rate.</span>
              ) : (
                matchedKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className={clsx(
                      "px-2.5 py-1 text-xs font-mono rounded-lg border flex items-center gap-1.5",
                      kw.spamLogProb > kw.hamLogProb
                        ? "bg-rose-950/60 text-rose-300 border-rose-800"
                        : "bg-emerald-950/60 text-emerald-300 border-emerald-800"
                    )}
                  >
                    <span>{kw.spamLogProb > kw.hamLogProb ? "🚩" : "✔"}</span>
                    <strong>{kw.word}</strong>
                    <span className="text-[10px] text-slate-400">({kw.tag})</span>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Right: Naive Bayes Output Scorecard */}
          <div className="lg:col-span-5 bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Naive Bayes Posterior Probability
              </span>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-center space-y-1">
                <span className="text-xs text-slate-400 uppercase">Spam Probability P(Spam|Text)</span>
                <div className={clsx("text-3xl font-extrabold", isSpam ? "text-rose-400" : "text-emerald-400")}>
                  {spamProbPct}%
                </div>
                <span className="text-[11px] text-slate-500">
                  Log-Odds: {logOdds.toFixed(2)}
                </span>
              </div>

              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={clsx("h-full transition-all duration-300", isSpam ? "bg-rose-500" : "bg-emerald-500")}
                  style={{ width: `${spamProbPct}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs font-mono pt-1">
                <span className="text-slate-400">Classification Triage:</span>
                <span
                  className={clsx(
                    "px-2.5 py-1 rounded font-bold uppercase",
                    isSpam
                      ? "bg-rose-950 text-rose-300 border border-rose-800"
                      : "bg-emerald-950 text-emerald-300 border border-emerald-800"
                  )}
                >
                  {isSpam ? "🚨 ROUTE TO JUNK FOLDER" : "✔ DELIVER TO INBOX"}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 leading-relaxed font-mono">
              <div>Log P(Spam|D) = {logProbSpam.toFixed(2)}</div>
              <div>Log P(Ham|D) = {logProbHam.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THEORY & MATHEMATICAL FORMULATION */}
      <section
        id="theory"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Mathematical Formulation: Bayes' Theorem &amp; Laplace Smoothing
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Formal mathematical representation of Multinomial Naive Bayes text classification
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">1. Multinomial Naive Bayes Formulation</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Given a document represented by word counts {"d = (w_1, w_2, ..., w_k)"}, the maximum a posteriori (MAP) decision rule is:
            </p>
            <div className="text-xs font-mono text-indigo-300 bg-slate-900 p-3 rounded-lg border border-slate-800 overflow-x-auto">
              {"ŷ = argmax_{c ∈ {Spam, Ham}} [ log P(c) + ∑_{j=1}^k log P(w_j | c) ]"}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">2. Laplace Add-α Smoothed Estimator</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              To prevent zero probabilities for unseen vocabulary words, Laplace smoothing adds pseudo-count α (typically α = 1):
            </p>
            <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-3 rounded-lg border border-slate-800 overflow-x-auto">
              {"P(w_j | c) = ( count(w_j, c) + α ) / ( ∑_{w ∈ V} count(w, c) + α |V| )"}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: REGIONAL INDUSTRIAL CASE STUDIES */}
      <section
        id="caseStudies"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">
            03
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Real-World Regional Industrial Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Applied NLP spam and phishing classification engines deployed across West Bengal
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Salt Lake Sector V Enterprise IT</span>
            <h3 className="text-base font-bold text-white">Corporate Phishing Gateway Filter</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Debangshu deployed a Naive Bayes spam filter protecting 12,000 employee email inboxes, blocking fraudulent phishing emails posing as bank authentication alerts with 99.4% precision.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Barrackpore Academic Portal</span>
            <h3 className="text-base font-bold text-white">Student Helpdesk Ticket Routing</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mamata and Mahima utilized TF-IDF and Naive Bayes to classify and route 8,000 monthly university inquiry emails to correct departments (Examinations, Library, Fees), cutting response times by 65%.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Ichapur Retail Center</span>
            <h3 className="text-base font-bold text-white">Customer Review Sentiment Classifier</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Susmita implemented a multinomial Naive Bayes model sorting online customer reviews into Positive, Neutral, and Negative categories to flag urgent product defects.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Kolkata Regional Banking Hub</span>
            <h3 className="text-base font-bold text-white">SMS Smishing Fraud Detector</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Abhronila engineered a lightweight Naive Bayes engine identifying fraudulent SMS messages containing scam lottery URLs targeting rural banking customers in West Bengal.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: DIAGNOSTIC QUIZ */}
      <section
        id="diagnosticQuiz"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">
            04
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Knowledge Diagnostic Check
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Test your understanding of NLP text classification, Naive Bayes, and Laplace smoothing
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
            <span>Question {selectedQuizIndex + 1} of {quizQuestions.length}</span>
            <span className="text-indigo-400 font-bold">NLP Concept Check</span>
          </div>

          <p className="text-base sm:text-lg font-bold text-white">
            {quizQuestions[selectedQuizIndex].question}
          </p>

          <div className="space-y-3">
            {quizQuestions[selectedQuizIndex].options.map((opt, idx) => {
              const isSelected = userAnswer === idx;
              const isCorrect = idx === quizQuestions[selectedQuizIndex].correctIndex;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setUserAnswer(idx);
                    setShowFeedback(true);
                  }}
                  className={clsx(
                    "w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between",
                    showFeedback
                      ? isCorrect
                        ? "bg-emerald-950/80 border-emerald-500 text-emerald-200"
                        : isSelected
                        ? "bg-rose-950/80 border-rose-500 text-rose-200"
                        : "bg-slate-900 border-slate-800 text-slate-400"
                      : isSelected
                      ? "bg-indigo-600/30 border-indigo-400 text-white"
                      : "bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300"
                  )}
                >
                  <span>{opt}</span>
                  {showFeedback && isCorrect && <span className="font-bold text-emerald-400">✔ Correct</span>}
                  {showFeedback && isSelected && !isCorrect && <span className="font-bold text-rose-400">❌ Incorrect</span>}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase font-mono">Teacher's Explanation:</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {quizQuestions[selectedQuizIndex].explanation}
              </p>
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => {
                setSelectedQuizIndex((prev) => Math.max(0, prev - 1));
                setUserAnswer(null);
                setShowFeedback(false);
              }}
              disabled={selectedQuizIndex === 0}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-xs font-semibold rounded-lg border border-slate-700 text-slate-300 cursor-pointer"
            >
              ← Previous Question
            </button>
            <button
              onClick={() => {
                setSelectedQuizIndex((prev) => Math.min(quizQuestions.length - 1, prev + 1));
                setUserAnswer(null);
                setShowFeedback(false);
              }}
              disabled={selectedQuizIndex === quizQuestions.length - 1}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-xs font-semibold rounded-lg text-white cursor-pointer"
            >
              Next Question →
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: PITFALLS & BEST PRACTICES */}
      <section
        id="bestPractices"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">
            05
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              NLP Classification Pitfalls &amp; Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Key engineering guidelines for building production text classifiers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> 4 Dangerous NLP Traps
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-rose-300">Omitting Laplace Smoothing:</strong> Allowing an unseen word to zero out the entire product.</li>
              <li><strong className="text-rose-300">Multiplying Raw Decimals:</strong> Causing 64-bit floating-point underflow on long text.</li>
              <li><strong className="text-rose-300">Ignoring Class Imbalance:</strong> Spam filters biased toward false positives that send boss emails to junk.</li>
              <li><strong className="text-rose-300">Case-Sensitivity Bugs:</strong> Treating "Urgent", "URGENT", and "urgent" as three separate words.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> 4 Best Practice NLP Rules
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-emerald-300">Always Work in Log-Space:</strong> Compute sums of log-probabilities to prevent numerical underflow.</li>
              <li><strong className="text-emerald-300">Apply TF-IDF Vectorization:</strong> Penalize common uninformative words like "the" and "is".</li>
              <li><strong className="text-emerald-300">High Precision Threshold for Spam:</strong> Set cutoff at 0.85 to avoid accidentally blocking legitimate emails.</li>
              <li><strong className="text-emerald-300">Use N-Gram Word Tuples:</strong> Include bigrams like ("free", "cash") to preserve word sequence context.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PYTHON LABORATORY */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            06
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Executable Python Laboratory Simulation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Interactive standalone lab script for NLP text preprocessing, Bag of Words, and Naive Bayes classification
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="worked_example_4_spam_email_classification_lab.py"
          highlightLines={[20, 28, 42, 55]}
        />
      </section>

      {/* FAQ TEMPLATE */}
      <section className="space-y-4">
        <FAQTemplate
          title="Worked Example 4: Spam Email Classification — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* PRINTABLE NOTE */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Worked Example 4: Spam Email Classification"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 17 Note"
          downloadFileName="topic17_note.txt"
        />
      </section>

      {/* TEACHER NOTE */}
      <section>
        <Teacher
          note="Spam email classification is the classic entry point into Natural Language Processing. Always remember: text must first be cleaned, tokenized, and transformed into numbers. Never forget Laplace smoothing and always compute in log-space to ensure numerical stability!"
        />
      </section>
    </div>
  );
};

export default Topic17;
