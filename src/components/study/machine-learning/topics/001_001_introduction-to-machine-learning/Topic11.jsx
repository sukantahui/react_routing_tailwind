import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic11_files/data_features_labels_and_target_variables_lab.py?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions.js";

const Topic11 = () => {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");

  // Novice Classroom Tab State
  const [selectedLessonTab, setSelectedLessonTab] = useState("buildingBlocks");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Interactive Feature Matrix Studio State
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [encodingType, setEncodingType] = useState("standard"); // "standard" or "onehot"
  const [selectedFeatureType, setSelectedFeatureType] = useState("all");

  const svgId = useId();

  // Smooth scroll handler
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Sample Student Dataset (Design Matrix X and Target y)
  const datasetSamples = [
    {
      id: 1,
      name: "Mamata (Barrackpore)",
      attendance: 92,
      studyHours: 16.5,
      gradeLevel: "Bachelors",
      city: "Barrackpore",
      quizScore: 88,
      targetPass: 1, // Pass
      predictedProb: 0.94
    },
    {
      id: 2,
      name: "Debangshu (Salt Lake)",
      attendance: 64,
      studyHours: 7.0,
      gradeLevel: "Masters",
      city: "Kolkata",
      quizScore: 52,
      targetPass: 0, // Fail
      predictedProb: 0.28
    },
    {
      id: 3,
      name: "Mahima (Jadavpur)",
      attendance: 96,
      studyHours: 19.0,
      gradeLevel: "Masters",
      city: "Kolkata",
      quizScore: 94,
      targetPass: 1, // Pass
      predictedProb: 0.98
    },
    {
      id: 4,
      name: "Susmita (Ichapur)",
      attendance: 78,
      studyHours: 11.0,
      gradeLevel: "Bachelors",
      city: "Ichapur",
      quizScore: 71,
      targetPass: 1, // Pass
      predictedProb: 0.76
    },
    {
      id: 5,
      name: "Abhronila (Kalyani)",
      attendance: 58,
      studyHours: 5.5,
      gradeLevel: "High School",
      city: "Kalyani",
      quizScore: 45,
      targetPass: 0, // Fail
      predictedProb: 0.18
    }
  ];

  // Feature Type Taxonomy
  const featureTaxonomy = [
    {
      id: "continuous",
      name: "Continuous Numerical",
      icon: "📏",
      badge: "Real Numbers ℝ",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      description: "Measurements that can take any floating-point value within a continuum (e.g. Study Hours = 16.5 hrs, Temperature = 32.4°C).",
      examples: ["Study Hours per week", "Salary in ₹ Lakhs", "House Carpet Area in sq.ft", "Temperature in °C"],
      scalingMethod: "StandardScaler ((x - μ) / σ) or MinMaxScaler ((x - min) / (max - min))"
    },
    {
      id: "discrete",
      name: "Discrete Numerical",
      icon: "🔢",
      badge: "Integers ℤ",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      description: "Countable integer numbers that cannot have fractions (e.g. Number of children = 2, Quiz attempts = 3).",
      examples: ["Number of Bedrooms", "Website Page Clicks", "Previous Exam Attempts", "Number of Customer Complaints"],
      scalingMethod: "StandardScaler or RobustScaler for outlier-heavy counts"
    },
    {
      id: "ordinal",
      name: "Ordinal Categorical",
      icon: "🎖️",
      badge: "Ordered Categories",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      description: "Categorical text labels with a strict, meaningful intrinsic ranking (e.g. Low < Medium < High).",
      examples: ["Education (High School < Bachelors < Masters < PhD)", "Customer Satisfaction (Poor < Fair < Good < Excellent)", "T-Shirt Size (S < M < L < XL)"],
      scalingMethod: "OrdinalEncoder mapping categories to ordered integers [0, 1, 2, 3]"
    },
    {
      id: "nominal",
      name: "Nominal Categorical",
      icon: "🏷️",
      badge: "Unordered Labels",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      description: "Categorical labels with no mathematical hierarchy or order (e.g. Kolkata, Barrackpore, Ichapur).",
      examples: ["City of Residence", "Payment Method (UPI, Card, NetBanking)", "Car Color (Red, Blue, Green)", "Blood Group (A+, B+, O+)"],
      scalingMethod: "OneHotEncoder (creating binary dummy columns) or Target/Frequency Encoding"
    }
  ];

  // Comprehensive Jargon Glossary
  const jargonTerms = [
    {
      id: "feature-vector",
      term: "Feature Vector (x_i)",
      category: "core",
      badge: "Input Representation",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      pronunciation: "ˈfiː.tʃər ˈvɛk.tər",
      plainEnglish: "An ordered list of numerical measurements that describe a single person, object, or event to the computer.",
      everydayAnalogy: "A doctor's patient medical chart listing [Body Temperature: 98.6°F, Blood Pressure: 120 mmHg, Heart Rate: 72 bpm].",
      whyItMatters: "Computers cannot understand objects directly; they only perceive objects through their feature vectors."
    },
    {
      id: "design-matrix",
      term: "Design Matrix (X)",
      category: "math",
      badge: "Data Matrix ℝ^(N×d)",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "dɪˈzaɪn ˈmeɪ.trɪks",
      plainEnglish: "A giant 2D grid/table where each row is one individual sample (e.g. one student) and each column is one feature (e.g. attendance, hours).",
      everydayAnalogy: "An entire Excel spreadsheet where rows are student names and columns are their subject marks.",
      whyItMatters: "Every machine learning algorithm performs matrix multiplications directly against this design matrix X."
    },
    {
      id: "target-variable",
      term: "Target Variable / Ground Truth (y)",
      category: "core",
      badge: "Supervision Signal",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "ˈtɑː.ɡɪt ˈvɛə.ri.ə.bəl",
      plainEnglish: "The true answer or outcome that the machine learning model is trying to learn to predict.",
      everydayAnalogy: "The answer key at the back of a textbook that the student checks their homework against.",
      whyItMatters: "Without ground truth labels y, supervised learning cannot compute errors or optimize model weights."
    },
    {
      id: "target-leakage",
      term: "Target Leakage",
      category: "pitfall",
      badge: "Critical Bug",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "ˈtɑː.ɡɪt ˈliː.kɪdʒ",
      plainEnglish: "An accident where an input feature contains information that is only known AFTER the target event has already occurred.",
      everydayAnalogy: "Using 'Hospital Discharge Date' as a feature to predict whether a patient will be admitted to the hospital. You only know the discharge date if they were already admitted!",
      whyItMatters: "Causes fake 100% accuracy during testing, but completely breaks when deployed in the real world."
    },
    {
      id: "one-hot-encoding",
      term: "One-Hot Encoding (OHE)",
      category: "preprocessing",
      badge: "Categorical Transform",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "wʌn hɒt ɪnˈkəʊ.dɪŋ",
      plainEnglish: "Converting unordered text categories into separate binary 0 and 1 columns to prevent false mathematical math comparisons.",
      everydayAnalogy: "Creating 3 checkbox columns: [Is_Barrackpore], [Is_Kolkata], [Is_Ichapur]. Only one box receives a 1, the rest 0.",
      whyItMatters: "If you encode Kolkata=1, Barrackpore=2, Ichapur=3, a linear model falsely assumes Ichapur is 3 times bigger than Kolkata!"
    },
    {
      id: "high-cardinality",
      term: "High Cardinality",
      category: "preprocessing",
      badge: "Data Challenge",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      pronunciation: "haɪ ˌkɑː.dɪˈnæl.ə.ti",
      plainEnglish: "A categorical column that contains an overwhelmingly large number of distinct unique values (like 100,000 postal PIN codes or user IDs).",
      everydayAnalogy: "A telephone directory with millions of unique names—One-Hot Encoding it would create millions of useless columns.",
      whyItMatters: "Explodes memory usage and leads to severe curse of dimensionality."
    }
  ];

  // Diagnostic Quiz Questions
  const quizQuestions = [
    {
      question: "Why should nominal categories like ['Kolkata', 'Barrackpore', 'Ichapur'] NOT be assigned raw integer numbers like [1, 2, 3] in Linear Regression?",
      options: [
        "Computers cannot store integers larger than 2.",
        "The model will falsely assume an arithmetic order (e.g. Ichapur is 3x Kolkata or greater than Barrackpore).",
        "Linear Regression only accepts text strings and rejects numbers.",
        "It causes the dataset to be deleted from disk."
      ],
      correctIndex: 1,
      explanation: "Nominal categories have no mathematical rank. Labeling them 1, 2, 3 forces the linear model to treat them as an ordered numeric sequence (3 > 2 > 1), which creates false mathematical relationships. One-Hot Encoding must be used instead."
    },
    {
      question: "Which of the following is an example of Target Leakage?",
      options: [
        "Using student study hours per week to predict semester pass/fail.",
        "Using house square footage to predict house market price in ₹.",
        "Using 'Total Claims Payout in ₹' to predict whether an insurance claim will be approved.",
        "Using customer age and monthly billing amount to predict churn."
      ],
      correctIndex: 2,
      explanation: "'Total Claims Payout' is only calculated AFTER an insurance claim has already been approved. Using it as an input feature is target leakage because that information does not exist when a new claim first arrives."
    },
    {
      question: "In standard ML mathematical notation, what does the symbol 'd' represent in 'X ∈ ℝ^(N×d)'?",
      options: [
        "The number of days the model took to train.",
        "The number of rows/samples in the dataset.",
        "The dimensionality (total number of input features/columns).",
        "The default learning rate parameter."
      ],
      correctIndex: 2,
      explanation: "In 'X ∈ ℝ^(N×d)', N represents the number of samples (rows) and d represents the feature dimension (number of columns)."
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

  const activeSample = datasetSamples[selectedSampleIndex];

  return (
    <div className="space-y-10 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16 px-4 sm:px-6">
      {/* HEADER BANNER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-3xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Introduction to Machine Learning • Topic 11
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Data Representation
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Feature Engineering Core
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Data, Features, Labels &amp; Target Variables
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Understand how real-world observations are transformed into mathematical matrices: feature vectors {"x_i"}, design matrix {"X ∈ ℝ^(N×d)"}, ground truth labels {"y"}, and categorical encodings.
          </p>

          {/* Quick Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-3">
            {[
              { id: "noviceMasterclass", label: "🎓 Master Teacher's Classroom", icon: "👨‍🏫" },
              { id: "interactiveStudio", label: "⚡ Design Matrix Studio", icon: "🔬" },
              { id: "taxonomy", label: "📊 Feature Type Taxonomy", icon: "📐" },
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
                How Computers "See" the World: Data, Features &amp; Labels
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/90 px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 font-mono">
            <span>⏱️ 12 min intuitive guide</span>
          </div>
        </div>

        {/* Teacher's Welcome Dialogue */}
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/60 p-6 rounded-2xl border border-indigo-800/40 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <span>👋 Welcome, student! Let us understand the mathematical alphabet of Machine Learning.</span>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            When you look at a mango in a fruit market in Barrackpore, your human brain immediately sees its golden color, feels its softness, smells its sweet fragrance, and estimates its weight. A computer processor cannot smell or feel a mango. A computer can only process <strong>numbers</strong> organized in rows and columns!
          </p>
          <p className="text-sm text-indigo-200 font-medium">
            In this masterclass, we will learn how real-world facts are translated into <strong>Features</strong> (the clues), <strong>Feature Vectors</strong> (one individual's profile), the <strong>Design Matrix</strong> (the whole database), and <strong>Target Variables</strong> (the answer we want to predict).
          </p>
        </div>

        {/* Sub-Lesson Tabs */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
            {[
              { id: "buildingBlocks", label: "1. The 4 Fundamental Building Blocks", icon: "🧱" },
              { id: "types", label: "2. Numerical vs Categorical Features", icon: "📊" },
              { id: "leakage", label: "3. Target Leakage: The Silent Killer", icon: "🚨" },
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

          {/* Sub-Lesson 1: The 4 Fundamental Building Blocks */}
          {selectedLessonTab === "buildingBlocks" && (
            <div className="space-y-6 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🧱</span> The 4 Core Building Blocks of Every ML Problem
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Let us understand the 4 essential terms using a simple classroom report card example:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">1. Sample / Instance / Row (i)</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      A single entity or observation in your dataset. For example: Student Mamata from Barrackpore is sample {"i = 1"}. If you have 500 students, {"N = 500"}.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase">2. Feature / Input Variable (x_j)</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      An individual measurable property or clue. For Mamata: Feature 1 is Attendance (92%), Feature 2 is Study Hours (16.5 hrs), Feature 3 is Quiz Score (88%).
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-indigo-400 uppercase">3. Feature Vector (x_i) &amp; Design Matrix (X)</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      The list of all features for one sample is {"x_i = [92, 16.5, 88]^T"}. Stacking all N students together creates the giant 2D Design Matrix {"X ∈ ℝ^(N×d)"}.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase">4. Target Variable / Label (y)</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      The outcome we want the model to predict. For semester classification: {"y = 1"} (Pass) or {"y = 0"} (Fail). For exam score regression: {"y = 88.5"} marks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Lesson 2: Feature Types */}
          {selectedLessonTab === "types" && (
            <div className="space-y-4 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>📊</span> Why Feature Types Dictate Algorithm Behavior
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Different types of data require completely different mathematical handling:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Numerical (Continuous &amp; Discrete)</span>
                    <p className="text-xs text-slate-300">
                      Math operations like addition, subtraction, and multiplication are valid. (e.g. 10 hours of study is twice as much as 5 hours). Must be scaled using StandardScaler to prevent gradient explosions.
                    </p>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-purple-400 uppercase">Categorical (Nominal &amp; Ordinal)</span>
                    <p className="text-xs text-slate-300">
                      Text labels that cannot be fed directly into math equations. Ordinal categories (Low, Medium, High) have ranking. Nominal categories (Kolkata, Mumbai) require One-Hot Encoding into binary 0/1 columns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Lesson 3: Target Leakage */}
          {selectedLessonTab === "leakage" && (
            <div className="space-y-4 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-rose-900/40 space-y-4">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                  <span>🚨</span> Target Leakage: When Features Accidentally Cheat
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Target leakage occurs when an input feature includes information that would NOT be available at the exact moment a real-world prediction is required.
                </p>
                <div className="bg-rose-950/40 p-4 rounded-xl border border-rose-800/60 text-xs text-slate-200 space-y-2">
                  <p>
                    <strong className="text-rose-300">Classic Real-World Leakage Example:</strong>
                  </p>
                  <p>
                    Suppose you are building an AI model to predict whether a website visitor will buy a smartphone. If you include <code className="text-amber-300 bg-slate-900 px-1 rounded">checkout_receipt_number</code> or <code className="text-amber-300 bg-slate-900 px-1 rounded">delivery_tracking_id</code> as an input feature, your model will score 100% accuracy in lab testing! But when a new visitor arrives on your homepage, they do not have a receipt number yet, causing your model to fail completely.
                  </p>
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
                    { id: "core", label: "Core Notation" },
                    { id: "math", label: "Matrix Math" },
                    { id: "preprocessing", label: "Preprocessing" },
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
                    placeholder="Search feature jargon..."
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

      {/* SECTION 1: INTERACTIVE DESIGN MATRIX STUDIO */}
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
              Interactive Design Matrix &amp; Feature Vector Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Inspect how raw table rows transform into mathematical vectors {"x_i"} and design matrix {"X ∈ ℝ^(5×4)"}
            </p>
          </div>
        </div>

        {/* Dataset Table View */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 overflow-x-auto">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300 font-bold">Select a Student Sample to View Vector Transformation:</span>
            <span className="text-indigo-400">Matrix Dimensions: N = 5 samples, d = 4 features</span>
          </div>

          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase bg-slate-900/60">
                <th className="p-3">Sample (i)</th>
                <th className="p-3">Name</th>
                <th className="p-3">Attendance (x₁)</th>
                <th className="p-3">Study Hrs (x₂)</th>
                <th className="p-3">Quiz Score (x₃)</th>
                <th className="p-3">City (Categorical)</th>
                <th className="p-3 text-amber-400">Target Label (y)</th>
              </tr>
            </thead>
            <tbody>
              {datasetSamples.map((student, idx) => (
                <tr
                  key={student.id}
                  onClick={() => setSelectedSampleIndex(idx)}
                  className={clsx(
                    "border-b border-slate-900 cursor-pointer transition-all",
                    selectedSampleIndex === idx
                      ? "bg-indigo-950/60 text-white font-semibold"
                      : "hover:bg-slate-900/40 text-slate-300"
                  )}
                >
                  <td className="p-3 font-mono text-cyan-400">i = {idx + 1}</td>
                  <td className="p-3">{student.name}</td>
                  <td className="p-3 font-mono">{student.attendance}%</td>
                  <td className="p-3 font-mono">{student.studyHours} hrs</td>
                  <td className="p-3 font-mono">{student.quizScore}/100</td>
                  <td className="p-3 font-mono text-purple-300">{student.city}</td>
                  <td className="p-3 font-mono font-bold">
                    <span
                      className={clsx(
                        "px-2 py-0.5 rounded text-[11px]",
                        student.targetPass === 1
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : "bg-rose-950 text-rose-300 border border-rose-800"
                      )}
                    >
                      {student.targetPass === 1 ? "1 (Pass)" : "0 (Fail)"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Sample Vector Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-indigo-900/50 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-indigo-400 flex items-center justify-between">
              <span>Feature Vector x_{selectedSampleIndex + 1}</span>
              <span className="text-xs text-slate-400">{activeSample.name}</span>
            </h3>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 space-y-2">
              <div className="text-slate-400">// Mathematical Column Vector representation:</div>
              <div className="text-sm text-emerald-300 font-bold">
                {"x_" + (selectedSampleIndex + 1) + " = ["}
                <br />
                {"  " + activeSample.attendance + ",   // x₁ (Attendance %)"}
                <br />
                {"  " + activeSample.studyHours + ",   // x₂ (Study Hours/wk)"}
                <br />
                {"  " + activeSample.quizScore + ",   // x₃ (Quiz Score)"}
                <br />
                {"  " + (activeSample.city === "Barrackpore" ? 1 : 0) + "    // x₄ (Is_Barrackpore OHE)"}
                <br />
                {"]^T ∈ ℝ⁴"}
              </div>
            </div>

            <div className="flex justify-between items-center text-xs font-mono text-slate-300 pt-1">
              <span>Ground Truth Label:</span>
              <span className="font-bold text-amber-400">
                {"y_" + (selectedSampleIndex + 1) + " = " + activeSample.targetPass}
              </span>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-cyan-400">
              Live Model Prediction on {"x_" + (selectedSampleIndex + 1)}
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-300 font-mono">
                <span>Model Hypothesis Score {"h(x_i)"}:</span>
                <span className="text-emerald-400 font-bold">{(activeSample.predictedProb * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={clsx(
                    "h-full transition-all duration-500",
                    activeSample.predictedProb >= 0.5 ? "bg-emerald-500" : "bg-rose-500"
                  )}
                  style={{ width: `${activeSample.predictedProb * 100}%` }}
                />
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                The model computes the linear dot product {"z = w^T x_i + b"}, then applies the sigmoid function {"σ(z)"} to output the predicted probability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURE TAXONOMY */}
      <section
        id="taxonomy"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The 4 Core Feature Types Taxonomy
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Comprehensive reference for continuous, discrete, ordinal, and nominal feature transformations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featureTaxonomy.map((feat) => (
            <div key={feat.id} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>{feat.icon}</span> {feat.name}
                </h3>
                <span className={clsx("px-2.5 py-0.5 text-xs font-mono font-bold rounded border", feat.badgeColor)}>
                  {feat.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{feat.description}</p>

              <div className="space-y-2 text-xs">
                <div>
                  <strong className="text-cyan-400">Real-World Examples:</strong>
                  <ul className="list-disc list-inside text-slate-300 mt-1 space-y-0.5">
                    {feat.examples.map((ex, idx) => (
                      <li key={idx}>{ex}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <strong className="text-emerald-400">Recommended Preprocessing:</strong>
                  <p className="text-slate-300 font-mono mt-0.5">{feat.scalingMethod}</p>
                </div>
              </div>
            </div>
          ))}
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
              Applied feature engineering pipelines across West Bengal technology centers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Barrackpore Academic Hub</span>
            <h3 className="text-base font-bold text-white">Multi-Modal Student Feature Engineering</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mamata and Mahima converted raw timestamped attendance logs and weekly quiz submissions into 12 engineered features: rolling 4-week attendance variance, homework turnaround speed, and relative percentile rank.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Salt Lake Sector V Fintech</span>
            <h3 className="text-base font-bold text-white">High-Frequency UPI Fraud Feature Store</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Debangshu designed a sub-10ms feature store calculating user velocity features: count of transactions in the last 15 minutes, standard deviation from usual purchase amount in ₹, and geographic distance between successive IP logins.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Ichapur Retail Analytics</span>
            <h3 className="text-base font-bold text-white">Customer Lifetime Value &amp; Recency Matrix</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Susmita constructed RFM (Recency, Frequency, Monetary) feature vectors for 35,000 retail customers, normalizing purchase amounts and One-Hot Encoding preferred shopping categories.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Jadavpur Clinical Research</span>
            <h3 className="text-base font-bold text-white">Biomarker Feature Scaling in Diabetes Risk</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Abhronila implemented robust quantile scaling for highly skewed clinical laboratory measurements (such as fasting insulin and triglycerides) to prevent extreme outlier patients from distorting logistic regression weights.
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
              Test your understanding of data structures, feature encoding, and target variables
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
            <span>Question {selectedQuizIndex + 1} of {quizQuestions.length}</span>
            <span className="text-indigo-400 font-bold">Feature Concept Check</span>
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
              Common Feature Engineering Pitfalls &amp; Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Essential guidelines for designing robust feature representations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> 4 Critical Feature Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-rose-300">Ordinal Encoding on Nominal Data:</strong> Assigning 1, 2, 3 to cities or colors, introducing false numerical order.</li>
              <li><strong className="text-rose-300">Target Leakage:</strong> Including features that are consequences of the target rather than precursors.</li>
              <li><strong className="text-rose-300">Ignoring Outliers in Distance Models:</strong> Leaving massive unscaled numbers in KNN or SVM, letting one column dominate distance.</li>
              <li><strong className="text-rose-300">High Cardinality One-Hot Explosion:</strong> Creating 50,000 binary columns for customer names, causing memory collapse.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> 4 Best Practice Rules
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-emerald-300">Fit Scalers ONLY on X_train:</strong> Never use test set statistics when standardizing features.</li>
              <li><strong className="text-emerald-300">Inspect Missingness Patterns:</strong> Understand whether data is Missing Completely at Random (MCAR) before choosing an imputation strategy.</li>
              <li><strong className="text-emerald-300">Combine Correlated Features:</strong> Use ratio features (e.g. Debt-to-Income, Price-per-SqFt) to enrich domain signal.</li>
              <li><strong className="text-emerald-300">Document Feature Lineage:</strong> Maintain clear data dictionaries defining units, ranges, and update frequencies.</li>
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
              Interactive standalone lab script for data preprocessing and feature transformations
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="data_features_labels_and_target_variables_lab.py"
          highlightLines={[15, 22, 30, 42]}
        />
      </section>

      {/* FAQ TEMPLATE */}
      <section className="space-y-4">
        <FAQTemplate
          title="Data, Features, Labels & Target Variables — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* PRINTABLE NOTE */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Data, Features, Labels and Target Variables"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 11 Note"
          downloadFileName="topic11_note.txt"
        />
      </section>

      {/* TEACHER NOTE */}
      <section>
        <Teacher
          note="Data is the fuel of artificial intelligence, and features are how we refine that crude oil into jet fuel! Always inspect your feature types carefully, beware of target leakage, and ensure your categorical variables are encoded properly before fitting any model."
        />
      </section>
    </div>
  );
};

export default Topic11;
