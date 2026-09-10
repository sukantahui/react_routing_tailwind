import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic12_files/training_validation_and_testing_data_lab.py?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions.js";

const Topic12 = () => {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");

  // Novice Classroom Tab State
  const [selectedLessonTab, setSelectedLessonTab] = useState("threeWaySplit");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Interactive Split Studio State
  const [trainPercent, setTrainPercent] = useState(70);
  const [valPercent, setValPercent] = useState(15);
  // Test is automatically (100 - train - val)
  const testPercent = Math.max(5, 100 - trainPercent - valPercent);

  const [selectedKFold, setSelectedKFold] = useState(5);
  const [activeFoldIndex, setActiveFoldIndex] = useState(0);
  const [stratificationEnabled, setStratificationEnabled] = useState(true);

  const svgId = useId();

  // Smooth scroll handler
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 3-Way Partition Taxonomy
  const partitionTaxonomy = [
    {
      id: "train",
      name: "1. Training Set (𝒟_train)",
      percentage: `${trainPercent}%`,
      icon: "📚",
      color: "bg-indigo-950 border-indigo-700 text-indigo-300",
      purpose: "Used by the optimization algorithm (e.g. Gradient Descent) to compute loss gradients and learn model internal parameters (weights w and bias b).",
      analogy: "Textbook chapters and worked exercise questions studied by a student during the semester.",
      goldenRule: "This is the ONLY data partition allowed to touch model weight updates or feature scalers."
    },
    {
      id: "val",
      name: "2. Validation Set (𝒟_val)",
      percentage: `${valPercent}%`,
      icon: "🎯",
      color: "bg-amber-950 border-amber-700 text-amber-300",
      purpose: "Used by the human data scientist to tune hyperparameters (learning rate α, tree depth, regularization λ) and trigger Early Stopping.",
      analogy: "Mock practice tests taken before exams to identify weak topics and adjust study strategy.",
      goldenRule: "Weights are NOT updated on validation data. It acts as an unbiased scoreboard to prevent overfitting."
    },
    {
      id: "test",
      name: "3. Test Set (𝒟_test)",
      percentage: `${testPercent}%`,
      icon: "🔒",
      color: "bg-emerald-950 border-emerald-700 text-emerald-300",
      purpose: "Used exclusively once at the very end to provide an unbiased estimate of the final model's real-world generalization performance.",
      analogy: "The final official sealed university board exam that the student has never seen before.",
      goldenRule: "Must remain completely locked in a vault during model tuning. Never tune knobs to improve test score!"
    }
  ];

  // Comprehensive Jargon Glossary
  const jargonTerms = [
    {
      id: "k-fold-cv",
      term: "k-Fold Cross-Validation",
      category: "cv",
      badge: "Validation Standard",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "keɪ fəʊld krɒs ˌvæl.ɪˈdeɪ.ʃən",
      plainEnglish: "Splitting the training data into k equal parts, training k separate models, where each part takes a turn being the validation set, and averaging the k scores.",
      everydayAnalogy: "Having 5 different teachers independently evaluate a student's mock tests and taking the average grade to eliminate teacher bias.",
      whyItMatters: "Gives a far more reliable, robust estimate of model accuracy on small or medium datasets without wasting valuable data."
    },
    {
      id: "stratification",
      term: "Stratified Sampling",
      category: "splits",
      badge: "Imbalance Defense",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      pronunciation: "ˌstræt.ɪ.fɪˈkeɪ.ʃən",
      plainEnglish: "Ensuring that each partition (Train, Val, Test) contains the exact same percentage of class labels as the original whole dataset.",
      everydayAnalogy: "If a school has 10% honors students and 90% regular students, ensuring every small study group also has exactly 10% honors students.",
      whyItMatters: "Without stratification, an imbalanced 1% fraud class might accidentally end up with 0 fraud cases in the test set."
    },
    {
      id: "data-snooping",
      term: "Data Snooping / Test Set Contamination",
      category: "pitfall",
      badge: "Critical Bug",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "ˈdeɪ.tə snuː.pɪŋ",
      plainEnglish: "Repeatedly tweaking model hyperparameters to get a higher score on the test set, turning the test set into a hidden training set.",
      everydayAnalogy: "A student looking at the official board exam questions, studying only those exact questions, and pretending their 100% score proves high intelligence.",
      whyItMatters: "Destroys the statistical validity of the test set, leading to false confidence and production failure."
    },
    {
      id: "hyperparameter",
      term: "Hyperparameter vs Model Parameter",
      category: "theory",
      badge: "Core Distinction",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "ˌhaɪ.pə.pəˈræm.ɪ.tər",
      plainEnglish: "Parameters (w, b) are learned automatically by the algorithm from data. Hyperparameters (learning rate, tree depth, k in KNN) are knobs set by the engineer before training.",
      everydayAnalogy: "In cooking: Ingredients and heat setting are hyperparameters (chosen by chef). The internal temperature and crispiness of the food are parameters (developed by cooking).",
      whyItMatters: "Hyperparameters must be tuned using the Validation set, NEVER using the Test set."
    },
    {
      id: "time-series-split",
      term: "Temporal / Time-Series Split",
      category: "splits",
      badge: "Sequential Data",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      pronunciation: "ˈtɛm.pər.əl splɪt",
      plainEnglish: "Splitting sequential data strictly by time (e.g., Train on Jan-Oct, Test on Nov-Dec) rather than random shuffling.",
      everydayAnalogy: "You cannot train a weather model using tomorrow's weather to predict yesterday's rain—you must always predict the future from the past.",
      whyItMatters: "Random shuffling on financial or time-series data leaks future prices into past training."
    }
  ];

  // Diagnostic Quiz Questions
  const quizQuestions = [
    {
      question: "Why do we need a 3-way split (Train, Validation, Test) instead of just a 2-way split (Train, Test)?",
      options: [
        "Because Python scikit-learn throws an error if there are only 2 partitions.",
        "To tune hyperparameters without contaminating or overfitting to the final unseen Test set.",
        "To make the dataset 3 times larger in file size.",
        "Because computers require data sizes to be divisible by 3."
      ],
      correctIndex: 1,
      explanation: "If you tune hyperparameters repeatedly on the Test set, your choices will overfit to the quirks of that test set. The Validation set is used for tuning knobs, preserving the Test set as a truly untouched evaluation benchmark."
    },
    {
      question: "What is Stratified Sampling, and when is it most vital?",
      options: [
        "Sorting data alphabetically before training.",
        "Preserving target class proportions across all splits, essential for imbalanced datasets.",
        "Deleting 50% of the dataset to save memory.",
        "Converting continuous numbers into strings."
      ],
      correctIndex: 1,
      explanation: "In imbalanced datasets (e.g. 98% non-fraud, 2% fraud), random splitting could result in a test set with zero fraud samples. Stratification guarantees that every split maintains the exact 98:2 ratio."
    },
    {
      question: "Why should random shuffling NEVER be used when splitting time-series or financial stock data?",
      options: [
        "Shuffling causes random numbers to take longer to compute.",
        "It causes temporal data leakage by allowing the model to train on future knowledge to predict the past.",
        "Stock prices are always integers.",
        "Time-series models cannot process shuffled arrays."
      ],
      correctIndex: 1,
      explanation: "In time-series problems, the goal is always to forecast the future using only past history. Randomly shuffling rows allows future timestamps into the training set, creating severe temporal leakage."
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
              BCAC701B • Introduction to Machine Learning • Topic 12
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Validation Protocol
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              k-Fold &amp; Stratification
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Training, Validation &amp; Testing Data
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Master the mathematics and engineering protocols of dataset partitioning: 3-way hold-out splits, k-Fold Cross-Validation, stratified sampling, and leak-proof generalization auditing.
          </p>

          {/* Quick Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-3">
            {[
              { id: "noviceMasterclass", label: "🎓 Master Teacher's Classroom", icon: "👨‍🏫" },
              { id: "interactiveStudio", label: "⚡ Partition & k-Fold Studio", icon: "🔬" },
              { id: "theory", label: "📐 Mathematical Formulation", icon: "⚙️" },
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
                Why We Split Data: The Board Exam Analogy
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/90 px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 font-mono">
            <span>⏱️ 14 min essential lesson</span>
          </div>
        </div>

        {/* Teacher's Welcome Dialogue */}
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/60 p-6 rounded-2xl border border-indigo-800/40 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <span>👋 Welcome, student! Let us understand how to properly test a machine learning model.</span>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Imagine a teacher gives you 50 math questions to practice at home, and then gives you the <em>exact same 50 questions</em> on your final semester exam. If you score 100%, does that prove you understand mathematics? No! You might have simply memorized the answers. A true test of intelligence requires testing you on <strong>brand new, unseen questions</strong>.
          </p>
          <p className="text-sm text-indigo-200 font-medium">
            This is why we split our data into <strong>Training</strong> (study material), <strong>Validation</strong> (mock practice test), and <strong>Testing</strong> (the final official board exam).
          </p>
        </div>

        {/* Sub-Lesson Tabs */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
            {[
              { id: "threeWaySplit", label: "1. The 3-Way Partition Strategy", icon: "📊" },
              { id: "kfold", label: "2. k-Fold Cross-Validation Intuition", icon: "🔄" },
              { id: "stratified", label: "3. Stratified Sampling & Imbalance", icon: "⚖️" },
              { id: "jargon", label: "4. Jargon Buster Glossary", icon: "📖" }
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

          {/* Sub-Lesson 1: The 3-Way Partition Strategy */}
          {selectedLessonTab === "threeWaySplit" && (
            <div className="space-y-6 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>📊</span> The 3 Data Partitions: Roles, Rules &amp; Analogies
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {partitionTaxonomy.map((part) => (
                    <div key={part.id} className={clsx("p-5 rounded-2xl border space-y-3", part.color)}>
                      <div className="flex items-center justify-between">
                        <span className="text-xl">{part.icon}</span>
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900/80">
                          {part.percentage}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{part.name}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{part.purpose}</p>
                      <div className="text-xs pt-1 border-t border-slate-800">
                        <strong className="text-amber-300">Everyday Analogy: </strong>
                        <span className="text-slate-300">{part.analogy}</span>
                      </div>
                      <div className="text-xs text-cyan-300 bg-slate-900/90 p-2 rounded-lg border border-slate-800 font-mono">
                        Rule: {part.goldenRule}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sub-Lesson 2: k-Fold Cross-Validation */}
          {selectedLessonTab === "kfold" && (
            <div className="space-y-4 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🔄</span> Why k-Fold Cross-Validation is the Gold Standard
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  On small or medium datasets, a single fixed train/validation split might accidentally put all the "easy" examples in the validation set or all the "difficult" examples in the training set.
                </p>
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase">The 5-Fold Procedure:</span>
                  <ol className="text-xs sm:text-sm text-slate-300 space-y-2 list-decimal list-inside">
                    <li>Split your dataset into 5 equal buckets (Folds 1 to 5).</li>
                    <li><strong>Round 1:</strong> Train on Folds 2, 3, 4, 5 ➔ Validate on Fold 1.</li>
                    <li><strong>Round 2:</strong> Train on Folds 1, 3, 4, 5 ➔ Validate on Fold 2.</li>
                    <li>Repeat until all 5 folds have served as the validation set.</li>
                    <li><strong>Final CV Score:</strong> Calculate the average of all 5 validation scores.</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Lesson 3: Stratified Sampling */}
          {selectedLessonTab === "stratified" && (
            <div className="space-y-4 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-indigo-900/40 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>⚖️</span> Stratified Sampling: Protecting Rare Classes
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  In fraud detection or rare cancer screening, positive cases might represent only 1% of the data. If you perform a naive random split, by random chance your validation or test split might end up with ZERO positive cases!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-rose-950/40 p-4 rounded-xl border border-rose-800/60 space-y-1">
                    <span className="text-xs font-bold text-rose-300 uppercase">❌ Naive Random Split</span>
                    <p className="text-xs text-slate-300">
                      Randomly flips coins. May put 99% of fraud cases in training, leaving validation blind to rare classes.
                    </p>
                  </div>
                  <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/60 space-y-1">
                    <span className="text-xs font-bold text-emerald-300 uppercase">✔ StratifiedKFold</span>
                    <p className="text-xs text-slate-300">
                      Guarantees that every single fold preserves the exact 99:1 class ratio of the original dataset.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Lesson 4: Jargon Buster */}
          {selectedLessonTab === "jargon" && (
            <div className="space-y-6 pt-2">
              {/* Category Filter Pills & Search */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "All Terms" },
                    { id: "cv", label: "Cross-Validation" },
                    { id: "splits", label: "Splitting Techniques" },
                    { id: "theory", label: "Parameters" },
                    { id: "pitfall", label: "Pitfalls" }
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
                    placeholder="Search validation jargon..."
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

              {/* Glossary Grid */}
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

      {/* SECTION 1: INTERACTIVE PARTITION & K-FOLD STUDIO */}
      <section
        id="interactiveStudio"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Dataset Partitioning &amp; k-Fold Visualizer
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Experiment with dynamic Train/Val/Test split ratios and rotate through cross-validation folds
            </p>
          </div>
        </div>

        {/* Dynamic Split Ratio Sliders */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-cyan-400">
            1. 3-Way Partition Ratio Allocator
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-indigo-400 font-bold">Training Set Share:</span>
                <span className="text-white font-bold">{trainPercent}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="85"
                value={trainPercent}
                onChange={(e) => setTrainPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold">Validation Set Share:</span>
                <span className="text-white font-bold">{valPercent}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                value={valPercent}
                onChange={(e) => setValPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          {/* Visual Partition Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Partition Breakdown (Total 100%):</span>
              <span className="text-emerald-400">Locked Test Vault: {testPercent}%</span>
            </div>
            <div className="w-full h-8 rounded-xl overflow-hidden flex border border-slate-800 shadow-inner">
              <div
                className="bg-indigo-600 flex items-center justify-center text-xs font-bold text-white transition-all duration-300"
                style={{ width: `${trainPercent}%` }}
              >
                Train ({trainPercent}%)
              </div>
              <div
                className="bg-amber-600 flex items-center justify-center text-xs font-bold text-white transition-all duration-300"
                style={{ width: `${valPercent}%` }}
              >
                Val ({valPercent}%)
              </div>
              <div
                className="bg-emerald-600 flex items-center justify-center text-xs font-bold text-white transition-all duration-300"
                style={{ width: `${testPercent}%` }}
              >
                Test ({testPercent}%)
              </div>
            </div>
          </div>
        </div>

        {/* k-Fold Interactive Rotation */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-indigo-400">
              2. k-Fold Cross-Validation Inspector
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Select k:</span>
              {[3, 5, 10].map((k) => (
                <button
                  key={k}
                  onClick={() => {
                    setSelectedKFold(k);
                    setActiveFoldIndex(0);
                  }}
                  className={clsx(
                    "px-2.5 py-1 text-xs font-mono rounded border transition-all cursor-pointer",
                    selectedKFold === k
                      ? "bg-indigo-600 text-white border-indigo-400"
                      : "bg-slate-900 text-slate-400 border-slate-700 hover:text-white"
                  )}
                >
                  k = {k}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-300">
            Click on any fold row below to see which fold is held out for validation during that iteration:
          </p>

          <div className="space-y-2">
            {Array.from({ length: selectedKFold }).map((_, foldIdx) => (
              <div
                key={foldIdx}
                onClick={() => setActiveFoldIndex(foldIdx)}
                className={clsx(
                  "p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between",
                  activeFoldIndex === foldIdx
                    ? "bg-indigo-950/60 border-indigo-500 shadow-lg"
                    : "bg-slate-900 border-slate-800 hover:border-slate-700"
                )}
              >
                <span className="text-xs font-mono font-bold text-cyan-400">
                  Iteration {foldIdx + 1} of {selectedKFold}
                </span>

                <div className="flex gap-1.5 flex-1 max-w-md mx-4">
                  {Array.from({ length: selectedKFold }).map((_, segmentIdx) => (
                    <div
                      key={segmentIdx}
                      className={clsx(
                        "h-5 flex-1 rounded text-[10px] font-mono flex items-center justify-center font-bold text-white transition-all",
                        segmentIdx === foldIdx
                          ? "bg-amber-500 shadow-md shadow-amber-500/30"
                          : "bg-indigo-700/70"
                      )}
                    >
                      {segmentIdx === foldIdx ? "VAL" : "TRAIN"}
                    </div>
                  ))}
                </div>

                <span className="text-xs font-mono text-slate-400">
                  {activeFoldIndex === foldIdx ? "Active Iteration" : "Click to view"}
                </span>
              </div>
            ))}
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
              Theoretical Foundation &amp; Mathematical Objectives
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Disjoint set relations, empirical error averaging, and cross-validation estimators
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">1. Disjoint Partition Axiom</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The complete dataset {"𝒟"} of cardinality N must be partitioned into pairwise mutually exclusive subsets:
            </p>
            <div className="text-xs font-mono text-indigo-300 bg-slate-900 p-3 rounded-lg border border-slate-800 overflow-x-auto">
              {"𝒟 = 𝒟_train ∪ 𝒟_val ∪ 𝒟_test"}<br />
              {"𝒟_train ∩ 𝒟_val = ∅,  𝒟_train ∩ 𝒟_test = ∅,  𝒟_val ∩ 𝒟_test = ∅"}
            </div>
            <p className="text-xs text-slate-400">
              Any non-empty intersection between training and testing sets violates the statistical independence condition of generalization error.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">2. k-Fold Cross-Validation Estimator</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The aggregate cross-validation risk {"CV_{(k)}"} is the arithmetic mean of empirical losses evaluated on each held-out fold {"F_i"}:
            </p>
            <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-3 rounded-lg border border-slate-800 overflow-x-auto">
              {"CV_{(k)} = (1 / k) ∑_{i=1}^k [ (1 / |F_i|) ∑_{(x,y) ∈ F_i} L(h_{(-i)}(x), y) ]"}
            </div>
            <p className="text-xs text-slate-400">
              Where {"h_{(-i)}"} denotes the hypothesis trained on all folds except fold i.
            </p>
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
              Applied validation and testing strategies across West Bengal technology hubs
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Barrackpore Academic Lab</span>
            <h3 className="text-base font-bold text-white">Stratified 5-Fold Student Grade Validation</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mamata and Mahima utilized StratifiedKFold to validate an academic intervention classifier across 1,200 student records, guaranteeing that honors, average, and at-risk student categories were proportionally represented across all 5 folds.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Kolkata Salt Lake Sector V</span>
            <h3 className="text-base font-bold text-white">Temporal Walk-Forward Split for Fintech Fraud</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Debangshu deployed a time-series walk-forward validation strategy for UPI payments, training on transactions from months 1-6, validating on month 7, and testing on month 8, eliminating the severe future-leakage risks of random splitting.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Ichapur Retail Center</span>
            <h3 className="text-base font-bold text-white">GroupKFold for Multi-Outlet Retail</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Susmita applied GroupKFold grouped by supermarket store ID to ensure that customer records from the same physical retail outlet were never split across training and validation sets simultaneously.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Jadavpur Medical Diagnostic Lab</span>
            <h3 className="text-base font-bold text-white">Patient-Wise Splitting in Radiology</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Abhronila enforced patient-level splitting across 8,000 chest radiographs, ensuring that multiple scans of the same individual patient were never present in both training and test sets.
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
              Test your understanding of data splits, cross-validation, and validation leakage
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
            <span>Question {selectedQuizIndex + 1} of {quizQuestions.length}</span>
            <span className="text-indigo-400 font-bold">Validation Concept Check</span>
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
              Common Validation Pitfalls &amp; Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Critical protocols for leak-free generalization evaluation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> 4 Dangerous Validation Traps
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-rose-300">Overfitting the Test Set:</strong> Repeatedly changing model hyperparameters to get higher test scores.</li>
              <li><strong className="text-rose-300">Random Shuffling on Time-Series:</strong> Using future prices to predict past stock movements.</li>
              <li><strong className="text-rose-300">Patient/Entity Splitting Leak:</strong> Placing scans of the same human patient in both train and test partitions.</li>
              <li><strong className="text-rose-300">Unstratified Imbalanced Splits:</strong> Causing minority class samples to vanish from validation folds.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> 4 Best Practice Protocols
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-emerald-300">Lock Test Set in a Vault:</strong> Touch the test partition ONLY once when all hyperparameter tuning is 100% complete.</li>
              <li><strong className="text-emerald-300">Default to StratifiedKFold:</strong> Use 5-fold or 10-fold stratified cross-validation for tabular classification.</li>
              <li><strong className="text-emerald-300">Use TimeSeriesSplit:</strong> Respect temporal ordering for sequential and financial forecasting datasets.</li>
              <li><strong className="text-emerald-300">Wrap in Scikit-Learn Pipelines:</strong> Prevent preprocessing leakage inside cross-validation loops automatically.</li>
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
              Interactive standalone lab script for cross-validation and split strategies
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="training_validation_and_testing_data_lab.py"
          highlightLines={[18, 25, 34, 48]}
        />
      </section>

      {/* FAQ TEMPLATE */}
      <section className="space-y-4">
        <FAQTemplate
          title="Training, Validation & Testing Data — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* PRINTABLE NOTE */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Training, Validation and Testing Data"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 12 Note"
          downloadFileName="topic12_note.txt"
        />
      </section>

      {/* TEACHER NOTE */}
      <section>
        <Teacher
          note="Rigorous data partitioning is the ultimate guardian of scientific truth in Machine Learning. Never let your models cheat on the exam! Treat your test set like a sealed vault, use cross-validation for hyperparameter tuning, and you will build models that perform reliably in the real world."
        />
      </section>
    </div>
  );
};

export default Topic12;
