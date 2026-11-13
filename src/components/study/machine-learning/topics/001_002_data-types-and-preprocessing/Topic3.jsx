import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic3_files/categorical_data_lab.py?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions.js";

const Topic3 = () => {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");

  // Novice Classroom State
  const [selectedLessonTab, setSelectedLessonTab] = useState("intuition");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");

  // Interactive Studio State
  const [studioMode, setStudioMode] = useState("inspector"); // "inspector" | "cardinality"
  const [selectedColumn, setSelectedColumn] = useState("city");
  const [cardinalitySlider, setCardinalitySlider] = useState(250);
  const [rowsSlider, setRowsSlider] = useState(10000);

  // Diagnostic Quiz State
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const svgId = useId();

  // Smooth scroll handler
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Sample Regional Tabular Cohort Data
  const sampleCohort = [
    { id: "WB-101", name: "Mamata Banerjee", city: "Kolkata", education: "Masters", blood: "O+", tier: "Platinum", churn: "Retained" },
    { id: "WB-102", name: "Mahima Sen", city: "Barrackpore", education: "Bachelors", blood: "B+", tier: "Gold", churn: "Retained" },
    { id: "WB-103", name: "Susmita Das", city: "Howrah", education: "Higher Secondary", blood: "A+", tier: "Silver", churn: "Churned" },
    { id: "WB-104", name: "Debangshu Roy", city: "Kolkata", education: "Bachelors", blood: "O+", tier: "Gold", churn: "Retained" },
    { id: "WB-105", name: "Abhronila Ghosh", city: "Naihati", education: "Masters", blood: "AB+", tier: "Platinum", churn: "Retained" },
    { id: "WB-106", name: "Rohan Mukherjee", city: "Barrackpore", education: "Secondary", blood: "B+", tier: "Bronze", churn: "Churned" }
  ];

  // Column Metadata & Frequency Distributions for Inspector
  const columnMetadata = {
    city: {
      name: "City Location (city)",
      taxonomy: "Nominal (Unordered)",
      taxonomyColor: "text-cyan-400 bg-cyan-950/60 border-cyan-800",
      description: "Geographic residential city in Greater Kolkata region. Categories have no mathematical hierarchy.",
      cardinality: 4,
      mode: "Kolkata & Barrackpore (Tied)",
      meanStatus: "STRICTLY INVALID ❌",
      medianStatus: "INVALID ❌",
      modeStatus: "VALID ✔",
      frequencies: [
        { label: "Kolkata", count: 2, pct: 33.3 },
        { label: "Barrackpore", count: 2, pct: 33.3 },
        { label: "Howrah", count: 1, pct: 16.7 },
        { label: "Naihati", count: 1, pct: 16.7 }
      ]
    },
    education: {
      name: "Education Level (education)",
      taxonomy: "Ordinal (Ranked)",
      taxonomyColor: "text-purple-400 bg-purple-950/60 border-purple-800",
      description: "Highest academic qualification. Demonstrates a meaningful natural hierarchy: Secondary < Higher Secondary < Bachelors < Masters.",
      cardinality: 4,
      mode: "Bachelors & Masters (Tied)",
      meanStatus: "INVALID ❌",
      medianStatus: "VALID ✔ (Bachelors)",
      modeStatus: "VALID ✔",
      frequencies: [
        { label: "Bachelors", count: 2, pct: 33.3 },
        { label: "Masters", count: 2, pct: 33.3 },
        { label: "Higher Secondary", count: 1, pct: 16.7 },
        { label: "Secondary", count: 1, pct: 16.7 }
      ]
    },
    blood: {
      name: "Blood Group (blood)",
      taxonomy: "Nominal (Unordered)",
      taxonomyColor: "text-cyan-400 bg-cyan-950/60 border-cyan-800",
      description: "ABO biological antigen blood classification. Strictly nominal classes with zero numerical order.",
      cardinality: 4,
      mode: "O+ & B+ (Tied)",
      meanStatus: "STRICTLY INVALID ❌",
      medianStatus: "INVALID ❌",
      modeStatus: "VALID ✔",
      frequencies: [
        { label: "O+", count: 2, pct: 33.3 },
        { label: "B+", count: 2, pct: 33.3 },
        { label: "A+", count: 1, pct: 16.7 },
        { label: "AB+", count: 1, pct: 16.7 }
      ]
    },
    tier: {
      name: "Membership Tier (tier)",
      taxonomy: "Ordinal (Ranked)",
      taxonomyColor: "text-purple-400 bg-purple-950/60 border-purple-800",
      description: "Customer loyalty program status. Possesses clear order: Bronze < Silver < Gold < Platinum.",
      cardinality: 4,
      mode: "Gold & Platinum (Tied)",
      meanStatus: "INVALID ❌",
      medianStatus: "VALID ✔ (Gold)",
      modeStatus: "VALID ✔",
      frequencies: [
        { label: "Platinum", count: 2, pct: 33.3 },
        { label: "Gold", count: 2, pct: 33.3 },
        { label: "Silver", count: 1, pct: 16.7 },
        { label: "Bronze", count: 1, pct: 16.7 }
      ]
    },
    churn: {
      name: "Customer Churn (churn)",
      taxonomy: "Binary / Dichotomous",
      taxonomyColor: "text-emerald-400 bg-emerald-950/60 border-emerald-800",
      description: "Two mutually exclusive states: Retained vs Churned. Directly maps to binary indicator target {0, 1}.",
      cardinality: 2,
      mode: "Retained (4/6)",
      meanStatus: "VALID as Proportion (66.7%) ✔",
      medianStatus: "VALID ✔",
      modeStatus: "VALID ✔",
      frequencies: [
        { label: "Retained (0)", count: 4, pct: 66.7 },
        { label: "Churned (1)", count: 2, pct: 33.3 }
      ]
    }
  };

  // Comprehensive Jargon Glossary Data
  const jargonTerms = [
    {
      id: "nominal-data",
      term: "Nominal Data",
      category: "core",
      badge: "Unordered Classes",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "ˈnɒm.ɪ.nəl ˈdeɪ.tə",
      plainEnglish: "Categorical labels that have no natural order, rank, or numerical scale. One category is not 'higher' or 'greater' than another.",
      everydayAnalogy: "Different sweet shops in Barrackpore: Sen Mahasay vs Jalajog vs Mithai. You can name them, but there is no universal mathematical ranking.",
      whyItMatters: "Using numbers like 1, 2, 3 for nominal data misleads algorithms into assuming false geometric hierarchies."
    },
    {
      id: "ordinal-data",
      term: "Ordinal Data",
      category: "core",
      badge: "Ranked Classes",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "ˈɔː.dɪ.nəl ˈdeɪ.tə",
      plainEnglish: "Categories that possess a clear, logical ranking or sequence, but where the exact mathematical distance between steps is unknown or unequal.",
      everydayAnalogy: "Karate belt levels: White < Yellow < Green < Black. Black is higher than Yellow, but you cannot subtract Yellow from Black to get Green.",
      whyItMatters: "Must be encoded preserving rank order (0 < 1 < 2 < 3) while avoiding false numerical step assumptions."
    },
    {
      id: "binary-data",
      term: "Binary / Dichotomous",
      category: "core",
      badge: "Two States",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "ˈbaɪ.nər.i / daɪˈkɒt.ə.məs",
      plainEnglish: "Variables that take on exactly two mutually exclusive states (e.g., Yes/No, True/False, Default/Paid).",
      everydayAnalogy: "A railway signal light at Barrackpore station: either Green (Go) or Red (Stop).",
      whyItMatters: "Forms the bedrock of binary classification algorithms and boolean mask filters."
    },
    {
      id: "cardinality",
      term: "Cardinality (|C|)",
      category: "core",
      badge: "Unique Count",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-800",
      pronunciation: "ˌkɑː.dɪˈnæl.ə.ti",
      plainEnglish: "The total number of unique, distinct category values present in a feature column.",
      everydayAnalogy: "Blood group has a cardinality of 8 (A+, A-, B+, B-, AB+, AB-, O+, O-). Indian postal PIN codes have a cardinality of 19,000+.",
      whyItMatters: "Determines whether One-Hot Encoding is safe or whether it will explode your server's RAM."
    },
    {
      id: "arbitrary-integer-trap",
      term: "Arbitrary Integer Trap",
      category: "hazards",
      badge: "Critical Failure",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "ˈɑː.bɪ.trər.i ˈɪn.tɪ.dʒər træp",
      plainEnglish: "Assigning random numbers (e.g. Kolkata=1, Barrackpore=2, Howrah=3) to nominal classes, tricking linear models into assuming false linear distances.",
      everydayAnalogy: "Telling an alien that a Mango is 1, an Apple is 2, and an Orange is 3, leading the alien to conclude that 1 Mango + 2 Apples = 1 Orange.",
      whyItMatters: "Distorts linear model weights, ruins decision boundaries, and corrupts nearest neighbor distances."
    },
    {
      id: "one-hot-encoding",
      term: "One-Hot Encoding (OHE)",
      category: "encodings",
      badge: "Orthogonal Basis",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      pronunciation: "wʌn hɒt ɪnˈkəʊ.dɪŋ",
      plainEnglish: "Transforming K categories into K separate binary columns where exactly one column is 1 and all others are 0.",
      everydayAnalogy: "A light switchboard with 4 buttons: pressing the 'Fan' button turns only the Fan light on while the others remain dark.",
      whyItMatters: "Ensures all nominal categories are mathematically equidistant from each other in vector space."
    },
    {
      id: "dummy-variable-trap",
      term: "Dummy Variable Trap",
      category: "hazards",
      badge: "Multicollinearity",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      pronunciation: "ˈdʌm.i ˈveə.ri.ə.bəl træp",
      plainEnglish: "A scenario in linear regression where all K one-hot columns sum to 1.0, duplicating the intercept column and causing singular matrix failure.",
      everydayAnalogy: "If a light switch has only 'ON' and 'OFF', having an 'Is_ON' light and an 'Is_OFF' light is redundant because if it's not ON, it is guaranteed to be OFF.",
      whyItMatters: "Solved by dropping one reference column (using K - 1 dummy columns in linear regression)."
    },
    {
      id: "unseen-categories",
      term: "Unseen Categories (Zero-Shot)",
      category: "hazards",
      badge: "Pipeline Crash",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "ʌnˈsiːn ˈkæt.ə.ɡər.iz",
      plainEnglish: "When a new test or live production sample contains a category that never appeared during training.",
      everydayAnalogy: "A customer registering from a brand-new town like 'Kalyani' when the model was trained strictly on 'Kolkata' and 'Howrah'.",
      whyItMatters: "Causes production models to throw runtime exceptions unless handle_unknown='ignore' is configured."
    }
  ];

  // Filtered Jargon List
  const filteredJargon = useMemo(() => {
    return jargonTerms.filter((item) => {
      const matchesCat = selectedJargonCategory === "all" || item.category === selectedJargonCategory;
      const matchesSearch =
        item.term.toLowerCase().includes(jargonSearchQuery.toLowerCase()) ||
        item.plainEnglish.toLowerCase().includes(jargonSearchQuery.toLowerCase()) ||
        item.everydayAnalogy.toLowerCase().includes(jargonSearchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedJargonCategory, jargonSearchQuery]);

  // Novice Classroom Step-by-Step Lessons
  const classroomLessons = {
    intuition: {
      id: "intuition",
      title: "1. The Big Picture: Labels vs Quantities",
      tagline: "The Barrackpore Grocery Store Analogy",
      icon: "🛒",
      intro: "Imagine you are running a grocery shop in Barrackpore Bazar. A customer walks up to your counter with two different requests. Understanding the mathematical difference between these requests is the key to machine learning feature engineering.",
      steps: [
        {
          num: "Request 1",
          title: "The Quantitative Request: 'Give me 3.5 kg of Potatoes'",
          desc: "3.5 is a Numerical value. You can place it on a physical scale, add 1.5 kg to get 5.0 kg, or multiply it by ₹20/kg. Arithmetic operations are completely valid."
        },
        {
          num: "Request 2",
          title: "The Qualitative Request: 'Give me Chandramukhi, not Jyoti'",
          desc: "'Chandramukhi' and 'Jyoti' are Categorical Labels. They are potato varieties. You cannot add Chandramukhi + Jyoti, nor can you calculate the 'Average Potato Variety'."
        },
        {
          num: "The Core Law",
          title: "Categories Represent Groups, Not Quantities",
          desc: "Categorical data partitions observations into distinct buckets. They possess identity and frequency, but lack continuous measurement scales."
        },
        {
          num: "The Challenge",
          title: "Computers Only Understand Numbers",
          desc: "Because machine learning algorithms run linear algebra (dot products and matrix multiplications), strings like 'Chandramukhi' must be carefully transformed without inventing false relationships."
        }
      ],
      coreTakeaway: "Numerical data measures 'How much / How many'; Categorical data answers 'Which class / What kind'."
    },
    kingdoms: {
      id: "kingdoms",
      title: "2. The Two Kingdoms: Nominal vs Ordinal",
      tagline: "Unordered Names vs Meaningful Hierarchies",
      icon: "👑",
      intro: "Not all categorical variables behave the same way. Machine learning divides them into two distinct kingdoms: Nominal (names without order) and Ordinal (ranks with order).",
      methods: [
        {
          title: "Kingdom 1: Nominal Data (Unordered Equality)",
          badge: "No Ranking",
          color: "border-cyan-500/50 bg-cyan-950/20 text-cyan-300",
          desc: "Categories with NO natural mathematical order. Examples include Blood Groups (A, B, AB, O), Cities (Kolkata, Barrackpore, Howrah), and Device OS (Android, iOS, Windows).",
          howItWorks: "Mathematical Rule: You can only test for Equality (== or !=). You can NEVER ask if Kolkata > Barrackpore."
        },
        {
          title: "Kingdom 2: Ordinal Data (Natural Rank Order)",
          badge: "Has Ranking",
          color: "border-purple-500/50 bg-purple-950/20 text-purple-300",
          desc: "Categories with a logical, intrinsic hierarchy or ranking sequence. Examples include Customer Rating (Poor < Average < Good < Excellent) and Education (Secondary < Bachelors < Masters < PhD).",
          howItWorks: "Mathematical Rule: Relational comparisons (<, <=, >, >=) are valid, but step distances are unequal and uncalibrated."
        }
      ],
      coreTakeaway: "Nominal data has equality only; Ordinal data possesses sortable rank order."
    },
    dangerZone: {
      id: "dangerZone",
      title: "3. The Danger Zone: The Arbitrary Integer Trap",
      tagline: "Why Passing Fake Numbers Poisons Linear Models",
      icon: "⚠️",
      intro: "A common catastrophic mistake made by novice data scientists in Kolkata is using LabelEncoder to convert nominal city names directly into arbitrary numbers (e.g. Kolkata=1, Barrackpore=2, Howrah=3).",
      assumptions: [
        {
          num: "Trap 1",
          name: "False Geometric Hierarchy",
          desc: "A linear model calculates w * x. With Howrah=3 and Kolkata=1, the model falsely assumes Howrah has 3x the numerical magnitude of Kolkata!"
        },
        {
          num: "Trap 2",
          name: "False Equidistant Distances",
          desc: "The model assumes d(Howrah, Kolkata) = 2, while d(Barrackpore, Kolkata) = 1. In reality, all nominal cities are equidistant!"
        },
        {
          num: "Trap 3",
          name: "The Antidote: One-Hot Encoding",
          desc: "One-Hot Encoding maps each city to an orthogonal vector ([1,0,0], [0,1,0], [0,0,1]), keeping all cities at an identical Euclidean distance of √2."
        }
      ],
      coreTakeaway: "Never use arbitrary integer encoding on nominal data in linear models, SVMs, or KNN algorithms."
    }
  };

  // Diagnostic Quiz Questions
  const quizQuestions = [
    {
      id: 0,
      title: "Diagnostic 1: University Student Feature Classification",
      scenario: "MAKAUT university in West Bengal maintains a student database with columns: [Student_ID, Blood_Group, Academic_Grade (A/B/C/F), Age, City]. Which columns are Nominal, and which are Ordinal?",
      options: [
        { id: "correct", label: "Blood_Group & City are Nominal; Academic_Grade is Ordinal", isCorrect: true, explanation: "Correct! Blood_Group and City have no natural order (Nominal). Academic_Grade has a clear ranking F < C < B < A (Ordinal). Age is continuous numerical." },
        { id: "wrong1", label: "All four columns are Ordinal", isCorrect: false, explanation: "Incorrect. Blood Group and City have no natural hierarchy; 'O+' is not greater than 'B+'." },
        { id: "wrong2", label: "Academic_Grade is Nominal; City is Ordinal", isCorrect: false, explanation: "Incorrect. Academic grades have an undeniable logical rank hierarchy." }
      ]
    },
    {
      id: 1,
      title: "Diagnostic 2: The Arbitrary Integer Trap in Linear Regression",
      scenario: "Debangshu is training a linear regression model to predict flat rent in Kolkata based on Location. He maps: Dum Dum = 1, Salt Lake = 2, Park Street = 3. What severe modeling flaw will his regression coefficients exhibit?",
      options: [
        { id: "trap", label: "The model falsely assumes Park Street has 3x the slope effect of Dum Dum and forces an artificial linear order", isCorrect: true, explanation: "Spot on! In linear regression (y = w * x + b), an integer encoding forces Park Street to exert 3w effect and Dum Dum to exert 1w effect. One-Hot Encoding must be used instead." },
        { id: "noFlaw", label: "No flaw; linear regression automatically recognizes string meanings", isCorrect: false, explanation: "Incorrect. Regression algorithms only perform arithmetic on numbers; they have no semantic awareness of real estate locations." },
        { id: "overfit", label: "It causes GPU hardware memory exhaustion", isCorrect: false, explanation: "Incorrect. This is a mathematical geometric bias, not a GPU hardware fault." }
      ]
    },
    {
      id: 2,
      title: "Diagnostic 3: The Dummy Variable Trap in OLS Regression",
      scenario: "Susmita encodes Payment_Method (Cash, UPI, Card) into 3 binary columns using One-Hot Encoding and includes an intercept term w_0 in Ordinary Least Squares (OLS). Why does the matrix inversion fail?",
      options: [
        { id: "multicollinearity", label: "Perfect Multicollinearity: The 3 dummy columns sum exactly to 1.0 (the intercept), causing singular matrix Xᵀ X", isCorrect: true, explanation: "Exactly right! If a customer doesn't pay with Cash or UPI, they must have paid with Card. The 3 columns are linearly dependent with the intercept, making Xᵀ X non-invertible. Solution: Drop one category (k - 1 columns)." },
        { id: "sparsity", label: "Because the matrix contains negative numbers", isCorrect: false, explanation: "Incorrect. One-hot columns contain only 0 and 1." },
        { id: "cardinality", label: "Payment_Method has too high cardinality", isCorrect: false, explanation: "Incorrect. Cardinality is only 3, which is low." }
      ]
    },
    {
      id: 3,
      title: "Diagnostic 4: High-Cardinality Postal PIN Codes",
      scenario: "An e-commerce company in Kolkata has 12,000 unique postal PIN codes in its customer dataset of 100,000 orders. What will happen if an intern applies standard One-Hot Encoding?",
      options: [
        { id: "explosion", label: "Dimensionality explosion: The matrix expands by 12,000 columns (1.2 Billion cells, >99.9% sparse), causing severe memory bloat and overfitting", isCorrect: true, explanation: "Correct! One-Hot Encoding 12,000 categories creates 12,000 sparse columns, triggering the Curse of Dimensionality. Frequency Encoding, Target Encoding, or Entity Embeddings should be used instead." },
        { id: "perfectModel", label: "The model reaches 100% test accuracy effortlessly", isCorrect: false, explanation: "Incorrect. Extreme sparsity causes severe overfitting on training data." },
        { id: "autoCluster", label: "Scikit-Learn automatically converts PIN codes into GPS coordinates", isCorrect: false, explanation: "Incorrect. Scikit-Learn performs literal encoding without geographic knowledge." }
      ]
    },
    {
      id: 4,
      title: "Diagnostic 5: Unseen Categories in Live Production",
      scenario: "A medical triage classifier trained on patients from Kolkata and Barrackpore receives a patient from Durgapur in the live emergency room. By default, what will standard OneHotEncoder do, and how must it be prevented?",
      options: [
        { id: "handleUnknown", label: "It throws a runtime ValueError; prevent it by setting handle_unknown='ignore' to produce an all-zero vector", isCorrect: true, explanation: "Spot on! Default encoders crash when encountering unobserved categories. Setting handle_unknown='ignore' ensures robust zero-shot fallback." },
        { id: "randomGuess", label: "It guesses a random city from the training set", isCorrect: false, explanation: "Incorrect. Encoders do not guess." },
        { id: "ignoreLabel", label: "It deletes the patient record from the hospital database", isCorrect: false, explanation: "Incorrect. Encoders transform features; they cannot delete database rows." }
      ]
    }
  ];

  const currentQuiz = quizQuestions[selectedQuizIndex];
  const activeClassroomLesson = classroomLessons[selectedLessonTab];
  const activeColMeta = columnMetadata[selectedColumn];

  // Cardinality Calculator Dynamic Values
  const totalMatrixCells = rowsSlider * cardinalitySlider;
  const sparsityPercent = ((cardinalitySlider - 1) / cardinalitySlider) * 100;
  const memoryEstMb = ((totalMatrixCells * 4) / (1024 * 1024)).toFixed(1);

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-12">
      {/* ========================================================================= */}
      {/* HEADER SECTION */}
      {/* ========================================================================= */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Module 2 • Topic 3
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Data Types &amp; Preprocessing
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full">
              Qualitative Features &amp; Taxonomy
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Academic Core
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Categorical Data: Nominal, Ordinal, Binary &amp; Encoding Mechanics
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Master qualitative feature engineering in Machine Learning. Explore the mathematical boundaries between Nominal labels, Ordinal hierarchies, and Binary indicators. Understand why models cannot read text strings, avoid the destructive Arbitrary Integer Trap, navigate the Dummy Variable Trap, and manage High Cardinality safely.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "noviceMasterclass", label: "🎓 Novice Classroom & Jargon Buster" },
              { id: "interactiveStudio", label: "1. Interactive Categorical Studio" },
              { id: "theory", label: "2. Formal Mathematical Foundations" },
              { id: "caseStudies", label: "3. Regional Industrial Cases" },
              { id: "diagnosticQuiz", label: "4. Interactive Diagnostic Quiz" },
              { id: "bestPractices", label: "5. Pitfalls & Best Practices" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={clsx(
                  "px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer",
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400 scale-105"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SECTION: NOVICE CLASSROOM & JARGON BUSTER */}
      {/* ========================================================================= */}
      <section id="noviceMasterclass" className="bg-slate-900/95 p-6 sm:p-8 rounded-2xl border border-indigo-500/40 shadow-2xl space-y-8 scroll-mt-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-purple-500/30 border border-purple-400">
              🏷️
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                The Master Teacher&apos;s Novice Classroom: Categorical Data
              </h2>
              <p className="text-xs sm:text-sm text-purple-300/90 font-medium">
                Plain-English visual intuition, real-world grocery analogies, and zero-jargon explanations
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Lesson Tabs */}
        <div className="flex flex-wrap gap-2.5">
          {Object.keys(classroomLessons).map((key) => {
            const lesson = classroomLessons[key];
            const isSelected = selectedLessonTab === key;
            return (
              <button
                key={lesson.id}
                onClick={() => setSelectedLessonTab(key)}
                className={clsx(
                  "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2",
                  isSelected
                    ? "bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/30 border border-purple-400"
                    : "bg-slate-800/90 text-slate-300 hover:bg-slate-700/80 border border-slate-700/80 hover:text-white"
                )}
              >
                <span>{lesson.icon}</span>
                <span>{lesson.title.split(":")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Lesson Display */}
        <div className="bg-slate-950/80 p-6 sm:p-7 rounded-2xl border border-slate-800/90 space-y-6">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 bg-purple-950/60 text-purple-300 border border-purple-800/80 rounded-full text-xs font-mono font-bold">
              {activeClassroomLesson.tagline}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {activeClassroomLesson.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
              {activeClassroomLesson.intro}
            </p>
          </div>

          {/* Intuition Lesson Steps */}
          {activeClassroomLesson.steps && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeClassroomLesson.steps.map((st, idx) => (
                <div key={idx} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-mono text-purple-400 font-bold uppercase">{st.num}</span>
                  <h4 className="text-sm font-bold text-white">{st.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Kingdoms Lesson Methods */}
          {activeClassroomLesson.methods && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeClassroomLesson.methods.map((m, idx) => (
                <div key={idx} className={clsx("p-5 rounded-xl border space-y-2.5", m.color)}>
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-white">{m.title}</h4>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                      {m.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">{m.desc}</p>
                  <div className="text-[11px] font-mono bg-slate-950/80 p-2.5 rounded border border-slate-800 text-slate-300">
                    💡 {m.howItWorks}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Danger Zone Traps */}
          {activeClassroomLesson.assumptions && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {activeClassroomLesson.assumptions.map((a, idx) => (
                <div key={idx} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono font-bold text-rose-400 uppercase">{a.num}</span>
                  <h4 className="text-sm font-bold text-white">{a.name}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Core Takeaway */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-purple-950/40 border border-purple-500/30 flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <span className="text-xs font-mono font-bold text-purple-300 uppercase block">Teacher Sukanta Hui&apos;s Core Takeaway:</span>
              <p className="text-xs sm:text-sm text-slate-200 font-medium pt-0.5">{activeClassroomLesson.coreTakeaway}</p>
            </div>
          </div>
        </div>

        {/* SUB-SECTION: JARGON BUSTER */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>📖</span> Categorical Data Jargon Buster
              </h3>
              <p className="text-xs text-slate-400">
                Demystifying technical terms with plain English translations and everyday analogies
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "all", label: "All" },
                { id: "core", label: "Core Taxonomy" },
                { id: "encodings", label: "Encodings" },
                { id: "hazards", label: "Hazards" }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedJargonCategory(c.id)}
                  className={clsx(
                    "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                    selectedJargonCategory === c.id
                      ? "bg-purple-600 text-white font-bold"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <input
            type="text"
            placeholder="Search terms: 'Nominal', 'One-Hot', 'Cardinality', 'Dummy'..."
            value={jargonSearchQuery}
            onChange={(e) => setJargonSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredJargon.map((item) => (
              <div key={item.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.term}</h4>
                    <span className="text-[11px] font-mono text-slate-500">{item.pronunciation}</span>
                  </div>
                  <span className={clsx("px-2 py-0.5 rounded text-[10px] font-bold font-mono border", item.badgeColor)}>
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{item.plainEnglish}</p>
                <div className="text-[11px] text-purple-300/90 bg-purple-950/30 p-2 rounded border border-purple-900/40">
                  <span className="font-bold">Everyday Analogy:</span> {item.everydayAnalogy}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: INTERACTIVE CATEGORICAL STUDIO */}
      {/* ========================================================================= */}
      <section id="interactiveStudio" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
              01
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Interactive Categorical Feature Studio
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Explore feature taxonomy, central tendency validity, frequency distributions, and high-cardinality explosion
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setStudioMode("inspector")}
              className={clsx(
                "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                studioMode === "inspector"
                  ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30 font-bold"
                  : "text-slate-400 hover:text-white"
              )}
            >
              🔍 Feature Inspector &amp; Frequencies
            </button>
            <button
              onClick={() => setStudioMode("cardinality")}
              className={clsx(
                "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                studioMode === "cardinality"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 font-bold"
                  : "text-slate-400 hover:text-white"
              )}
            >
              💥 Cardinality &amp; Sparsity Simulator
            </button>
          </div>
        </div>

        {studioMode === "inspector" ? (
          <div className="space-y-6">
            {/* Interactive Cohort Table */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                  West Bengal Consumer Dataset (Click any column header to inspect):
                </span>
                <span className="text-xs font-mono text-cyan-400">
                  Currently Inspecting: <strong className="text-white underline">{activeColMeta.name}</strong>
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-[11px] bg-slate-900/60">
                      <th className="p-3">ID</th>
                      <th className="p-3">Name</th>
                      {Object.keys(columnMetadata).map((key) => (
                        <th
                          key={key}
                          onClick={() => setSelectedColumn(key)}
                          className={clsx(
                            "p-3 cursor-pointer transition-all",
                            selectedColumn === key
                              ? "text-cyan-300 font-bold bg-cyan-950/40 border-b-2 border-cyan-400"
                              : "hover:text-white hover:bg-slate-800/40"
                          )}
                        >
                          {key.toUpperCase()} {selectedColumn === key && "▼"}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {sampleCohort.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-900/40">
                        <td className="p-3 font-mono text-slate-500">{row.id}</td>
                        <td className="p-3 font-sans text-white">{row.name}</td>
                        <td className={clsx("p-3", selectedColumn === "city" && "bg-cyan-950/20 font-bold text-cyan-200")}>{row.city}</td>
                        <td className={clsx("p-3", selectedColumn === "education" && "bg-cyan-950/20 font-bold text-cyan-200")}>{row.education}</td>
                        <td className={clsx("p-3", selectedColumn === "blood" && "bg-cyan-950/20 font-bold text-cyan-200")}>{row.blood}</td>
                        <td className={clsx("p-3", selectedColumn === "tier" && "bg-cyan-950/20 font-bold text-cyan-200")}>{row.tier}</td>
                        <td className={clsx("p-3", selectedColumn === "churn" && "bg-cyan-950/20 font-bold text-cyan-200")}>{row.churn}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inspector Details Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono text-slate-500 uppercase">Selected Attribute</span>
                    <h4 className="text-base font-bold text-white">{activeColMeta.name}</h4>
                  </div>
                  <span className={clsx("px-3 py-1 rounded-full text-xs font-bold font-mono border", activeColMeta.taxonomyColor)}>
                    {activeColMeta.taxonomy}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  {activeColMeta.description}
                </p>

                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 block font-bold">Cardinality</span>
                    <span className="text-lg font-bold font-mono text-cyan-400">{activeColMeta.cardinality}</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 block font-bold">Mode</span>
                    <span className="text-xs font-bold text-emerald-400 block truncate">{activeColMeta.mode}</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 block font-bold">Mean Validity</span>
                    <span className="text-[11px] font-bold text-rose-400 block truncate">{activeColMeta.meanStatus}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Mode Validity:</span>
                    <span className="font-mono text-emerald-400 font-bold">{activeColMeta.modeStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Median Validity:</span>
                    <span className="font-mono text-slate-300">{activeColMeta.medianStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mean Validity:</span>
                    <span className="font-mono text-rose-400 font-bold">{activeColMeta.meanStatus}</span>
                  </div>
                </div>
              </div>

              {/* Live Horizontal Frequency Bar Chart */}
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase block">
                  Category Frequency Distribution (Cohort Sample)
                </span>

                <div className="space-y-3 pt-1">
                  {activeColMeta.frequencies.map((freq, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-white font-bold">{freq.label}</span>
                        <span className="text-cyan-400">{freq.count} ({freq.pct.toFixed(1)}%)</span>
                      </div>
                      <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(5, freq.pct * 2.5)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                  💡 Notice: Frequencies count occurrences. No mathematical continuous bell curve exists for qualitative groups.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Mode B: Cardinality & Sparsity Simulator */
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase block">
                The High-Cardinality Explosion Simulator
              </span>
              <p className="text-xs text-slate-300">
                Adjust unique categories (e.g. Postal PIN codes, Product SKUs) and dataset row counts to observe how standard One-Hot Encoding inflates matrix dimensions and causes extreme sparsity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-900 p-5 rounded-xl border border-slate-800">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Unique Categories (|C|):</span>
                    <span className="text-cyan-400 font-bold">{cardinalitySlider} unique classes</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="1000"
                    step="5"
                    value={cardinalitySlider}
                    onChange={(e) => setCardinalitySlider(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block">E.g., 5 cities vs 1,000 postal PIN codes</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Total Dataset Rows (N):</span>
                    <span className="text-purple-400 font-bold">{rowsSlider.toLocaleString()} records</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={rowsSlider}
                    onChange={(e) => setRowsSlider(parseInt(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block">Customer order volume</span>
                </div>
              </div>

              {/* Dynamic Scorecard Results */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1 text-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">New OHE Feature Columns</span>
                  <div className="text-2xl font-mono font-bold text-cyan-400">+{cardinalitySlider} Columns</div>
                  <span className="text-[10px] text-slate-500">From just 1 raw text column!</span>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1 text-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Matrix Sparsity (% Zeroes)</span>
                  <div className="text-2xl font-mono font-bold text-amber-400">{sparsityPercent.toFixed(2)}%</div>
                  <span className="text-[10px] text-slate-500">Fraction of empty 0 cells per row</span>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1 text-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Memory RAM Footprint</span>
                  <div className="text-2xl font-mono font-bold text-rose-400">{memoryEstMb} MB</div>
                  <span className="text-[10px] text-slate-500">{(totalMatrixCells).toLocaleString()} float elements</span>
                </div>
              </div>

              {/* Warning Alert if Cardinality is dangerous */}
              {cardinalitySlider > 100 ? (
                <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/50 text-rose-200 text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-rose-300">
                    <span>⚠️ CRITICAL RISK: CURSE OF DIMENSIONALITY TRIGGERED!</span>
                  </div>
                  <p>
                    With {cardinalitySlider} categories, the one-hot matrix becomes {sparsityPercent.toFixed(2)}% sparse! Standard linear models will overfit, and distance-based algorithms (KNN/K-Means) will lose statistical power. Use <strong>Frequency Encoding</strong>, <strong>Rare Category Pruning (&lt;1%)</strong>, or <strong>Entity Embeddings</strong> instead!
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-200 text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                    <span>✅ SAFE CARDINALITY ZONE</span>
                  </div>
                  <p>
                    Low cardinality ({cardinalitySlider} categories) allows clean One-Hot Encoding without memory exhaustion or severe sparsity risks.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: FORMAL MATHEMATICAL FOUNDATIONS */}
      {/* ========================================================================= */}
      <section id="theory" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Formal Mathematical Foundations
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Discrete metric spaces, ordinal monotonicity, and orthogonal basis vectors
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Nominal Discrete Metric Space</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Nominal categories belong to an unordered finite set <span className="font-mono text-cyan-300">C = {"{c_1, c_2, ..., c_k}"}</span> equipped with the Kronecker delta metric:
            </p>
            <div className="text-xs font-mono text-cyan-300 bg-slate-900 p-3 rounded border border-slate-800 overflow-x-auto">
              {"d(c_i, c_j) = 1 if i ≠ j else 0"}
            </div>
            <p className="text-[11px] text-slate-400">
              All distinct categories are uniformly equidistant. Any numerical scheme where d(c_1, c_2) ≠ d(c_1, c_3) introduces false geometric bias.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">One-Hot Orthogonal Vector Basis</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              One-Hot Encoding maps each category <span className="font-mono text-purple-300">c_k</span> to standard basis vectors <span className="font-mono text-purple-300">e_k &isin; {"{0, 1}"}ᴷ</span>:
            </p>
            <div className="text-xs font-mono text-purple-300 bg-slate-900 p-3 rounded border border-slate-800 overflow-x-auto">
              {"||e_i - e_j||₂ = √[ (1-0)² + (0-1)² ] = √2 ≈ 1.4142 (∀ i ≠ j)"}
            </div>
            <p className="text-[11px] text-slate-400">
              Orthogonality condition: <span className="font-mono text-purple-300">e_iᵀ e_j = 0</span> for all <span className="font-mono text-purple-300">i ≠ j</span>. Preserves geometric neutrality!
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase">The Dummy Variable Trap Formulation</span>
          <p className="text-xs text-slate-300 leading-relaxed">
            In an Ordinary Least Squares (OLS) model with an intercept column <span className="font-mono text-emerald-300">x_0 = 1</span>, the sum of all K one-hot columns equals the intercept column identically:
          </p>
          <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-2.5 rounded border border-slate-800">
            {"∑_{k=1}^K x_{i, k} = 1.0 = x_{i, 0}  ⟹  rank(X) < K + 1  ⟹  det(Xᵀ X) = 0"}
          </div>
          <p className="text-[11px] text-slate-400">
            Because matrix <span className="font-mono text-emerald-300">Xᵀ X</span> is singular (non-invertible), the normal equation <span className="font-mono text-emerald-300">w = (Xᵀ X)⁻¹ Xᵀ y</span> fails. Dropping one reference category restores full column rank!
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: REAL-WORLD REGIONAL CASE STUDIES */}
      {/* ========================================================================= */}
      <section id="caseStudies" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">
            03
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Real-World Regional Industrial Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Categorical feature engineering across West Bengal utilities, e-commerce, and healthcare
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">Case 1: Power Grid Analytics</span>
            <h3 className="text-base font-bold text-white">WBSEDCL Tariff &amp; Feeder Triage</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Scenario:</strong> Classifying electricity default risk across 4 Tariff types (Domestic, Commercial, Industrial, Agriculture) and 1,400 Sub-station Feeders.
            </p>
            <div className="text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1">
              <div><strong>Nominal Tariff:</strong> 4 categories OHE (drop=&apos;first&apos;).</div>
              <div><strong>High Cardinality Feeders:</strong> Feeder IDs pruned by grouping long-tail rural feeders into &apos;Other_Feeders&apos;, cutting dimensions from 1,400 to 45.</div>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono font-bold text-purple-400 uppercase">Case 2: Retail E-Commerce</span>
            <h3 className="text-base font-bold text-white">Barrackpore Shopping Loyalty Churn</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Scenario:</strong> Predicting customer churn using Membership Tier (Bronze, Silver, Gold, Platinum) and Payment Mode (UPI, Cash, Card).
            </p>
            <div className="text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1">
              <div><strong>Ordinal Tier:</strong> Mapped via OrdinalEncoder([&apos;Bronze&apos;, &apos;Silver&apos;, &apos;Gold&apos;, &apos;Platinum&apos;]) preserving natural 0 &lt; 1 &lt; 2 &lt; 3 hierarchy.</div>
              <div><strong>Result:</strong> Boosted model accuracy by 14% compared to arbitrary label encoding.</div>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Case 3: Hospital Pathology</span>
            <h3 className="text-base font-bold text-white">Jadavpur Medical Diagnostics Audit</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Scenario:</strong> Patient intake records with Blood Group (A+, B+, O+, AB+) and Severity Tier (Mild &lt; Moderate &lt; Severe).
            </p>
            <div className="text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1">
              <div><strong>Trap Prevented:</strong> Prior intern imputed missing blood groups with Mean, creating &quot;Blood 2.3&quot;!</div>
              <div><strong>Fix:</strong> Implemented Mode Imputation (&apos;O+&apos;) and One-Hot representation, eliminating corrupted records.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: INTERACTIVE DIAGNOSTIC QUIZ */}
      {/* ========================================================================= */}
      <section id="diagnosticQuiz" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-lg">
            04
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Categorical Diagnostic Quiz
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Test your engineering intuition: Solve real-world data preparation dilemmas
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-5">
          <div className="flex flex-wrap gap-2">
            {quizQuestions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => {
                  setSelectedQuizIndex(idx);
                  setUserAnswer(null);
                  setShowFeedback(false);
                }}
                className={clsx(
                  "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  selectedQuizIndex === idx
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                )}
              >
                Question {idx + 1}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Scenario Problem</span>
              <h3 className="text-base sm:text-lg font-bold text-white">{currentQuiz.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                {currentQuiz.scenario}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 block">Select the correct engineering decision:</span>
              <div className="grid grid-cols-1 gap-2.5">
                {currentQuiz.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setUserAnswer(opt.id);
                      setShowFeedback(true);
                    }}
                    className={clsx(
                      "p-3.5 rounded-xl border text-left transition-all text-xs sm:text-sm font-medium cursor-pointer flex items-center justify-between",
                      userAnswer === opt.id
                        ? opt.isCorrect
                          ? "bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40"
                          : "bg-rose-950/70 border-rose-500 text-rose-200 ring-2 ring-rose-500/40"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                    )}
                  >
                    <span>{opt.label}</span>
                    {showFeedback && userAnswer === opt.id && (
                      <span className="font-bold text-sm">
                        {opt.isCorrect ? "✅ Correct!" : "❌ Try again"}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {showFeedback && userAnswer && (
              <div className={clsx(
                "p-4 rounded-xl border space-y-1.5 animate-fadeIn text-xs sm:text-sm",
                currentQuiz.options.find((o) => o.id === userAnswer)?.isCorrect
                  ? "bg-emerald-950/40 border-emerald-800 text-emerald-200"
                  : "bg-rose-950/40 border-rose-800 text-rose-200"
              )}>
                <div className="font-bold flex items-center gap-1.5">
                  <span>💡 Teacher&apos;s Feedback:</span>
                </div>
                <p className="leading-relaxed">
                  {currentQuiz.options.find((o) => o.id === userAnswer)?.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: PITFALLS & BEST PRACTICES */}
      {/* ========================================================================= */}
      <section id="bestPractices" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">
            05
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Common Pitfalls &amp; Industry Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Crucial engineering rules to prevent data leakage and mathematical distortion
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Mistakes to Avoid
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Mean Imputation on Categories:</strong> Imputing missing categorical values with the arithmetic mean of arbitrary numbers.</li>
              <li><strong className="text-white">Alphabetical Ordinal Distortion:</strong> Relying on default alphabetical sorting for OrdinalEncoder, which orders &apos;High&apos; before &apos;Low&apos;.</li>
              <li><strong className="text-white">Blind One-Hot Encoding on High Cardinality:</strong> One-hot encoding features with 5,000+ classes without rare-category pruning.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Production Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Always Configure handle_unknown=&apos;ignore&apos;:</strong> Protects production inference pipelines against novel unseen categories.</li>
              <li><strong className="text-white">Drop First in Linear Models:</strong> Always use drop=&apos;first&apos; in OneHotEncoder to prevent the Dummy Variable Trap.</li>
              <li><strong className="text-white">Prune Rare Categories:</strong> Group long-tail categories appearing in &lt;1% of rows into a consolidated &apos;Other&apos; category.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: PYTHON LABORATORY */}
      {/* ========================================================================= */}
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
              Interactive standalone lab script executing frequency distributions, integer distortion proof, and high-cardinality pruning
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="categorical_data_lab.py"
          highlightLines={[25, 60, 105, 145, 190, 240]}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: FAQ TEMPLATE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <FAQTemplate
          title="Categorical Data &amp; Preprocessing — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: PRINTABLE NOTE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Categorical Data Study Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 3 Note"
          downloadFileName="topic3_note.txt"
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: TEACHER NOTE */}
      {/* ========================================================================= */}
      <section>
        <Teacher
          note="Categorical data is where real-world machine learning models either shine or catastrophically fail. Remember: mathematics has no concept of a city name, a blood group, or an education tier. Every time you feed categorical data into an algorithm, you are making an architectural assumption. If it's nominal, respect geometric symmetry with One-Hot vectors. If it's ordinal, explicitly define the hierarchy. And always protect your production servers from high-cardinality memory explosion!"
        />
      </section>
    </div>
  );
};

export default Topic3;
