import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic23_files/worked_example_3_encoding_city_and_gender_columns_lab.py?raw";
import noteText from "./topic23_files/topic23_note.txt?raw";
import questions from "./topic23_files/topic23_questions.js";

// =============================================================================
// WEST BENGAL CONSUMER COHORT DATASET
// =============================================================================

const WB_CONSUMER_COHORT = [
  { id: "WB-CUST-01", name: "Susmita", city: "Kolkata", gender: "Female", age: 24, spendK: 18.5, target: 1 },
  { id: "WB-CUST-02", name: "Debangshu", city: "Barrackpore", gender: "Male", age: 31, spendK: 28.0, target: 1 },
  { id: "WB-CUST-03", name: "Mahima", city: "Howrah", gender: "Female", age: 22, spendK: 7.2, target: 0 },
  { id: "WB-CUST-04", name: "Mamata", city: "Kolkata", gender: "Female", age: 29, spendK: 22.0, target: 1 },
  { id: "WB-CUST-05", name: "Abhronila", city: "Siliguri", gender: "Female", age: 38, spendK: 35.0, target: 1 },
  { id: "WB-CUST-06", name: "Rohan", city: "Barrackpore", gender: "Male", age: 26, spendK: 12.0, target: 0 },
  { id: "WB-CUST-07", name: "Priyanka", city: "Durgapur", gender: "Female", age: 33, spendK: 15.5, target: 0 },
  { id: "WB-CUST-08", name: "Sourav", city: "Kolkata", gender: "Male", age: 35, spendK: 31.0, target: 1 },
  { id: "WB-CUST-09", name: "Tanmoy", city: "Howrah", gender: "Male", age: 25, spendK: 9.5, target: 0 },
  { id: "WB-CUST-10", name: "Ananya", city: "Kalyani", gender: "Female", age: 28, spendK: 14.0, target: 0 },
  { id: "WB-CUST-11", name: "Subhajit", city: "Siliguri", gender: "Male", age: 42, spendK: 40.0, target: 1 },
  { id: "WB-CUST-12", name: "Kallol", city: "Barrackpore", gender: "Male", age: 30, spendK: 16.5, target: 1 },
];

const KNOWN_CITIES = ["Barrackpore", "Durgapur", "Howrah", "Kalyani", "Kolkata", "Siliguri"];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

const Topic23 = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const svgId = useId();

  // Studio Mode: "dual_inspector" | "dummy_trap" | "target_encoding"
  const [studioMode, setStudioMode] = useState("dual_inspector");

  // Mode A: Dual Encoding Inspector
  const [encodingStrategy, setEncodingStrategy] = useState("drop_first"); // "full_ohe" | "drop_first" | "label_bad"
  const [selectedCityFilter, setSelectedCityFilter] = useState("all");

  // Mode B: Dummy Variable Trap Matrix Arena
  const [matrixDummiesMode, setMatrixDummiesMode] = useState("drop_first"); // "full_k" | "drop_first"

  // Mode C: Target Encoding Sandbox
  const [targetSmoothingM, setTargetSmoothingM] = useState(2.0);
  const [customTestCity, setCustomTestCity] = useState("Asansol");

  // Jargon Glossary Search
  const [jargonQuery, setJargonQuery] = useState("");

  // Diagnostic Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Resource Tabs
  const [resourceTab, setResourceTab] = useState("lab");

  // Global Target Rate
  const globalTargetRate = useMemo(() => {
    return WB_CONSUMER_COHORT.reduce((acc, c) => acc + c.target, 0) / WB_CONSUMER_COHORT.length;
  }, []);

  // City Statistics for Target Encoding
  const cityTargetStats = useMemo(() => {
    const stats = {};
    KNOWN_CITIES.forEach(city => {
      const rows = WB_CONSUMER_COHORT.filter(c => c.city === city);
      const count = rows.length;
      const targetSum = rows.reduce((acc, r) => acc + r.target, 0);
      const rawMean = count > 0 ? targetSum / count : globalTargetRate;
      const smoothed = (count * rawMean + targetSmoothingM * globalTargetRate) / (count + targetSmoothingM);
      stats[city] = { count, rawMean, smoothed };
    });
    return stats;
  }, [targetSmoothingM, globalTargetRate]);

  // Transformed Cohort under Mode A
  const transformedCohort = useMemo(() => {
    return WB_CONSUMER_COHORT.map(c => {
      // Gender Encoding
      const genderCode = c.gender === "Male" ? 1 : 0;

      // City Encoding
      let cityFeatures = {};
      if (encodingStrategy === "full_ohe") {
        KNOWN_CITIES.forEach(cityName => {
          cityFeatures[`city_${cityName}`] = c.city === cityName ? 1 : 0;
        });
      } else if (encodingStrategy === "drop_first") {
        // Dropping Barrackpore as reference
        KNOWN_CITIES.slice(1).forEach(cityName => {
          cityFeatures[`city_${cityName}`] = c.city === cityName ? 1 : 0;
        });
      } else if (encodingStrategy === "label_bad") {
        cityFeatures["city_integer"] = KNOWN_CITIES.indexOf(c.city);
      }

      return {
        ...c,
        genderCode,
        cityFeatures
      };
    });
  }, [encodingStrategy]);

  // Custom Test City Computation (Cold-Start evaluation)
  const customCityEvaluation = useMemo(() => {
    const isKnown = KNOWN_CITIES.includes(customTestCity.trim());
    const oheDropVec = isKnown
      ? KNOWN_CITIES.slice(1).map(cityName => (customTestCity.trim() === cityName ? 1 : 0))
      : [0, 0, 0, 0, 0]; // all zeros cold start vector

    let targetVal = globalTargetRate;
    if (isKnown && cityTargetStats[customTestCity.trim()]) {
      targetVal = cityTargetStats[customTestCity.trim()].smoothed;
    }

    return {
      isKnown,
      oheDropVec,
      targetVal
    };
  }, [customTestCity, cityTargetStats, globalTargetRate]);

  // Glossary Terms
  const jargonTerms = [
    {
      term: "Nominal Measurement Scale",
      def: "Discrete categorical attributes with no intrinsic ordering, rank, or metric distance (e.g., City). Only equality/inequality operations are mathematically valid.",
      badge: "Stevens' Taxonomy"
    },
    {
      term: "The Dummy Variable Trap",
      def: "The mathematical singularity occurring when all K dummy columns are included alongside an intercept, causing perfect multicollinearity and det(X^T X) = 0.",
      badge: "Linear Algebra"
    },
    {
      term: "Drop-First Encoding",
      def: "Omitting one category (K - 1 columns) to restore full matrix rank. The omitted category becomes the baseline reference absorbed into the intercept beta_0.",
      badge: "Production Standard"
    },
    {
      term: "Label Encoding Hazard",
      def: "The dangerous blunder of assigning integer ranks (0, 1, 2) to nominal categories, forcing false metric distances and monotonic gradients in linear models and KNN.",
      badge: "Mathematical Hazard"
    },
    {
      term: "Bayesian m-Estimate Smoothing",
      def: "Shrinking local category target averages toward the global dataset prior using a smoothing hyperparameter m to prevent overfitting on low-frequency levels.",
      badge: "Target Encoding"
    },
    {
      term: "The mtry Feature Dilution Hazard",
      def: "In Random Forests, sparse one-hot dummy columns overwhelm the feature space, reducing the chance that dense continuous features are sampled at tree splits.",
      badge: "Ensemble Risk"
    },
    {
      term: "Cold-Start All-Zeros Vector",
      def: "When handle_unknown='ignore' encounters an unseen city during inference, it outputs all zeros, safely defaulting the prediction to the reference intercept.",
      badge: "Architecture"
    },
    {
      term: "Out-of-Fold (OOF) Target Encoding",
      def: "Calculating category target statistics strictly on out-of-fold training partitions to prevent self-target contamination and extreme target leakage.",
      badge: "Leakage Prevention"
    }
  ];

  const filteredJargon = jargonTerms.filter(j =>
    j.term.toLowerCase().includes(jargonQuery.toLowerCase()) ||
    j.def.toLowerCase().includes(jargonQuery.toLowerCase()) ||
    j.badge.toLowerCase().includes(jargonQuery.toLowerCase())
  );

  // Diagnostic Quiz Scenarios
  const quizQuestions = [
    {
      id: "q1",
      scenario: "A junior analyst uses LabelEncoder on a 'City' column containing [Kolkata, Howrah, Siliguri] encoded as [0, 1, 2] in an Ordinary Least Squares house price regression.",
      prompt: "What mathematical assumption has been improperly imposed on the model?",
      options: [
        { key: "A", text: "The model is strictly forced to assume Siliguri is twice as far from Kolkata as Howrah is, imposing a false monotonic gradient." },
        { key: "B", text: "The Gram matrix becomes singular with det(X^T X) = 0." },
        { key: "C", text: "The model runs out of GPU memory due to sparse matrix explosion." },
        { key: "D", text: "None, Label Encoding is the mathematically optimal choice for nominal features." }
      ],
      correct: "A",
      explanation: "Label Encoding assigns arbitrary integer ranks. In linear regression (y_hat = w * x + b), this forces the model to assume that price changes monotonically with the arbitrary integer index, treating Siliguri (2) as numerically twice Howrah (1)."
    },
    {
      id: "q2",
      scenario: "You are building a loan default classifier with a 'Gender' column {Female, Male}. You decide to encode it with `OneHotEncoder(drop='first')`.",
      prompt: "Why is a single binary column mathematically sufficient rather than two dummy columns?",
      options: [
        { key: "A", text: "Because gender is an ordinal scale with natural ranking." },
        { key: "B", text: "Because binary attributes have exactly 1 degree of freedom; knowing Female=0 completely defines Male=1." },
        { key: "C", text: "Because Scikit-Learn cannot train models on more than 1 column." },
        { key: "D", text: "It prevents tree models from splitting on gender." }
      ],
      correct: "B",
      explanation: "A binary variable has cardinality K = 2 and exactly 1 degree of freedom. Creating two dummy columns with an intercept creates exact linear dependence: d_female + d_male = 1."
    },
    {
      id: "q3",
      scenario: "During linear regression training with 6 cities, an engineer includes all 6 dummy columns AND a constant intercept column vector.",
      prompt: "What happens when the closed-form normal equation (X^T X)^(-1) X^T y is evaluated?",
      options: [
        { key: "A", text: "The weights converge perfectly with zero variance." },
        { key: "B", text: "A LinAlgError occurs because det(X^T X) = 0, meaning the matrix is singular and non-invertible." },
        { key: "C", text: "The model automatically drops the intercept column at runtime." },
        { key: "D", text: "The R-squared score increases to 1.0." }
      ],
      correct: "B",
      explanation: "Because sum(d_k) = 1 (the intercept vector), the design matrix has linearly dependent columns. The Gram matrix X^T X is singular (determinant = 0), making closed-form inversion impossible without L2 regularization."
    },
    {
      id: "q4",
      scenario: "In an e-commerce deployment, an API receives an order from 'Asansol'—a city completely absent from the training dataset.",
      prompt: "How does `OneHotEncoder(handle_unknown='ignore')` safely handle this record?",
      options: [
        { key: "A", text: "It raises a ValueError: Found unknown categories." },
        { key: "B", text: "It outputs an all-zeros vector [0, 0, 0, 0, 0], safely absorbing the record into the reference intercept." },
        { key: "C", text: "It replaces 'Asansol' with the most frequent city in training." },
        { key: "D", text: "It drops the customer's shopping cart permanently." }
      ],
      correct: "B",
      explanation: "Setting `handle_unknown='ignore'` prevents runtime exceptions by returning all zeroes across all one-hot feature columns. In linear models, this gracefully falls back to the baseline reference intercept."
    },
    {
      id: "q5",
      scenario: "A customer database has 500 postal towns. You apply Bayesian Target Encoding with m-smoothing parameter m = 5.0.",
      prompt: "What is the primary benefit of the m-smoothing parameter on a small village with only 1 customer who bought an item (y=1)?",
      options: [
        { key: "A", text: "It prevents assigning an extreme 100% target rate by shrinking the encoded value toward the global population average." },
        { key: "B", text: "It forces the village to be dropped from the dataset." },
        { key: "C", text: "It converts the target variable into a continuous Gaussian curve." },
        { key: "D", text: "It increases matrix sparsity." }
      ],
      correct: "A",
      explanation: "Without smoothing, n=1 with y=1 yields an extreme 100% target value, causing severe target leakage and overfitting. With m=5, S = (1*1.0 + 5*0.58) / (1+5) ≈ 0.65, safely dampening the estimate toward the global prior."
    }
  ];

  const handleQuizSelect = (qId, optionKey) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qId]: optionKey }));
  };

  const quizScore = useMemo(() => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) score++;
    });
    return score;
  }, [quizAnswers]);

  return (
    <div className="space-y-12 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16">
      {/* =====================================================================
          HERO SECTION & 9-SECTION JUMP NAVIGATION
      ===================================================================== */}
      <header className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-10 rounded-3xl border border-indigo-800/40 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Data Types and Preprocessing • Topic 23
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Masterclass Standard
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Nominal vs Binary Dual Dilemma
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Worked Example 3: Encoding City and Gender Columns
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Master the mathematical, structural, and pipeline mechanics of encoding binary and multi-class nominal features. Dissect why Label Encoding fails on cities, mathematically prove the Dummy Variable Trap singularity det(X^T X) = 0, and engineer robust Bayesian Target Encoding with cold-start guards.
          </p>

          {/* Quick Jump Navigation Bar */}
          <div className="pt-4 border-t border-indigo-800/40">
            <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">
              Fast-Travel Navigation (9 Core Sections)
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "novice", label: "1. Novice Masterclass" },
                { id: "studio", label: "2. Interactive Studio" },
                { id: "math", label: "3. Mathematical Proofs" },
                { id: "cases", label: "4. Regional Case Studies" },
                { id: "quiz", label: "5. Diagnostic Assessment" },
                { id: "pitfalls", label: "6. Production Pitfalls" },
                { id: "resources", label: "7. Laboratory & Resources" },
              ].map(sec => (
                <button
                  key={sec.id}
                  onClick={() => {
                    const el = document.getElementById(sec.id);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    setActiveSection(sec.id);
                  }}
                  className={clsx(
                    "px-3 py-1.5 text-xs font-medium rounded-lg transition-all",
                    activeSection === sec.id
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                      : "bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60"
                  )}
                >
                  {sec.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================================
          SECTION 1: NOVICE MASTERCLASS & MENTAL MODELS
      ===================================================================== */}
      <section id="novice" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 rounded-xl border border-indigo-500/30 text-indigo-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              1. Novice Masterclass & Mental Models
            </h2>
            <p className="text-sm text-slate-400">
              Analogies for categorical scales, the nominal hazard, and essential definitions
            </p>
          </div>
        </div>

        {/* 3 Intuitive Real-World Metaphors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all shadow-lg space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="text-base font-bold text-white">The Light Switch (Binary Gender)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              A light switch has only two states: ON or OFF. You don't need two separate meters to know the state; if it is not OFF (0), it is ON (1). Similarly, binary gender has exactly 1 degree of freedom. One column completely resolves the system.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all shadow-lg space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="text-base font-bold text-white">The Compass Points (Nominal City)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              North, South, East, and West have no ranking. Calling East "3" and North "1" does not mean East is "three times more northern"! One-Hot Encoding treats each city as an independent orthogonal axis on a multidimensional compass, guaranteeing perfect equidistance.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all shadow-lg space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="text-base font-bold text-white">The Unseen Traveler (Cold-Start)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Imagine an e-commerce checkout in Kolkata encountering a buyer from Asansol for the very first time. If the system panics because Asansol is not on its list, checkout crashes! With `handle_unknown='ignore'`, the system gracefully assigns zeroes, defaulting to baseline behavior.
            </p>
          </div>
        </div>

        {/* Categorical Measurement Taxonomy Matrix */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
            Categorical Feature Taxonomy Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Variable Type</th>
                  <th className="py-2.5 px-3">Feature Example</th>
                  <th className="py-2.5 px-3">Cardinality (K)</th>
                  <th className="py-2.5 px-3">Degrees of Freedom</th>
                  <th className="py-2.5 px-3">Optimal Encoding Architecture</th>
                  <th className="py-2.5 px-3">Fatal Anti-Pattern</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-semibold text-amber-300">Binary (Dichotomous)</td>
                  <td className="py-2.5 px-3">Gender {`{Female, Male}`}</td>
                  <td className="py-2.5 px-3 font-mono">K = 2</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">1 DoF</td>
                  <td className="py-2.5 px-3 text-emerald-400">Binary Mapping (0 / 1) or OHE drop='first'</td>
                  <td className="py-2.5 px-3 text-rose-400">Full 2-column OHE with Intercept (Collinear)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-semibold text-cyan-300">Low-Cardinality Nominal</td>
                  <td className="py-2.5 px-3">City (6 Municipalities)</td>
                  <td className="py-2.5 px-3 font-mono">3 &le; K &le; 15</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">K - 1 DoF</td>
                  <td className="py-2.5 px-3 text-emerald-400">One-Hot Encoding (drop='first' for Linear Models)</td>
                  <td className="py-2.5 px-3 text-rose-400">LabelEncoder (imposing false metric distance)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-semibold text-rose-300">High-Cardinality Nominal</td>
                  <td className="py-2.5 px-3">Pincodes / Villages across WB</td>
                  <td className="py-2.5 px-3 font-mono">K &gt; 100</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Variable</td>
                  <td className="py-2.5 px-3 text-emerald-400">Bayesian Target Encoding (m-estimate) or Frequency Pooling</td>
                  <td className="py-2.5 px-3 text-rose-400">Sparse OHE (causing mtry dilution in Random Forests)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Jargon Buster with Live Search */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              Machine Learning Jargon Buster
            </h3>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search definitions (e.g., trap, mtry, cold-start)..."
                value={jargonQuery}
                onChange={e => setJargonQuery(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
              {jargonQuery && (
                <button
                  onClick={() => setJargonQuery("")}
                  className="absolute right-2 top-1.5 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredJargon.map((item, idx) => (
              <div key={idx} className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-indigo-300">{item.term}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-700/60 text-slate-300">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-normal">{item.def}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: INTERACTIVE LABORATORY STUDIO (3 DYNAMIC MODES)
      ===================================================================== */}
      <section id="studio" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/20 rounded-xl border border-cyan-500/30 text-cyan-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              2. Interactive Laboratory Studio
            </h2>
            <p className="text-sm text-slate-400">
              Experiment with One-Hot vs Drop-First encoding, simulate the Dummy Variable Trap, and test Bayesian Target Encoding live
            </p>
          </div>
        </div>

        {/* Studio Mode Switcher */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
          {[
            { id: "dual_inspector", label: "Mode A: Dual Encoding Inspector (City & Gender)" },
            { id: "dummy_trap", label: "Mode B: The Dummy Variable Trap Matrix Arena" },
            { id: "target_encoding", label: "Mode C: Bayesian Target Encoding & Cold-Start Sandbox" }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setStudioMode(m.id)}
              className={clsx(
                "flex-1 min-w-[200px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all",
                studioMode === m.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              )}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* MODE A: DUAL ENCODING INSPECTOR */}
        {studioMode === "dual_inspector" && (
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  Encoding Strategy Comparison (West Bengal Consumer Cohort)
                </h3>
                <p className="text-xs text-slate-400">
                  Select an encoding strategy and observe how City and Gender are transformed across all 12 consumer records.
                </p>
              </div>

              {/* Strategy Selector */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "drop_first", label: "Drop-First OHE (K-1 cols) [Safe for OLS]" },
                  { id: "full_ohe", label: "Full OHE (K cols) [Collinear with Intercept]" },
                  { id: "label_bad", label: "Label Encoding (Integer 0..5) [Hazard!]" }
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setEncodingStrategy(s.id)}
                    className={clsx(
                      "px-3 py-1.5 text-xs font-bold rounded-xl border transition-all",
                      encodingStrategy === s.id
                        ? "bg-indigo-600 text-white border-indigo-400 shadow-md"
                        : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Strategy Explanation Alert */}
            <div
              className={clsx(
                "p-4 rounded-xl border text-xs leading-relaxed",
                encodingStrategy === "drop_first" && "bg-emerald-950/30 border-emerald-500/40 text-emerald-200",
                encodingStrategy === "full_ohe" && "bg-amber-950/30 border-amber-500/40 text-amber-200",
                encodingStrategy === "label_bad" && "bg-rose-950/30 border-rose-500/40 text-rose-200"
              )}
            >
              {encodingStrategy === "drop_first" && (
                <p>
                  <strong>Drop-First One-Hot Encoding (Recommended for Linear Models):</strong> Barrackpore is dropped as the baseline reference category. The remaining 5 dummy columns represent marginal contrast against Barrackpore. Matrix is full rank (no dummy variable trap).
                </p>
              )}
              {encodingStrategy === "full_ohe" && (
                <p>
                  <strong>Full One-Hot Encoding (K = 6 Columns):</strong> Generates 6 dummy features. When paired with an unregularized linear regression containing an intercept, the columns sum to 1.0, triggering complete multicollinearity: det(X^T X) = 0!
                </p>
              )}
              {encodingStrategy === "label_bad" && (
                <p>
                  <strong>Label Encoding Hazard (Anti-Pattern):</strong> Imposes arbitrary integers: Barrackpore=0, Durgapur=1, Howrah=2, Kalyani=3, Kolkata=4, Siliguri=5. Linear models will falsely assume Siliguri has 5x the magnitude of Barrackpore!
                </p>
              )}
            </div>

            {/* Filter by City */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Filter City:</span>
              {["all", ...KNOWN_CITIES].map(city => (
                <button
                  key={city}
                  onClick={() => setSelectedCityFilter(city)}
                  className={clsx(
                    "px-2.5 py-1 text-xs rounded-lg transition-all",
                    selectedCityFilter === city
                      ? "bg-cyan-500/30 text-cyan-200 border border-cyan-400/50"
                      : "bg-slate-800 text-slate-400 border border-slate-700 hover:text-white"
                  )}
                >
                  {city === "all" ? "All Cities" : city}
                </button>
              ))}
            </div>

            {/* Transformed Consumer Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/80 text-slate-400 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">ID & Name</th>
                    <th className="py-2.5 px-3">Raw City</th>
                    <th className="py-2.5 px-3">Raw Gender</th>
                    <th className="py-2.5 px-3">Gender Code</th>
                    <th className="py-2.5 px-3">Encoded City Vector / Feature</th>
                    <th className="py-2.5 px-3">Spend (₹k)</th>
                    <th className="py-2.5 px-3">Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {transformedCohort
                    .filter(c => selectedCityFilter === "all" || c.city === selectedCityFilter)
                    .map(c => (
                      <tr key={c.id} className="hover:bg-slate-800/40">
                        <td className="py-2 px-3 font-mono font-semibold">
                          {c.id} ({c.name})
                        </td>
                        <td className="py-2 px-3">{c.city}</td>
                        <td className="py-2 px-3">{c.gender}</td>
                        <td className="py-2 px-3 font-mono text-cyan-300">
                          {c.genderCode} <span className="text-slate-500 text-[10px]">({c.gender === "Male" ? "Male" : "Female"})</span>
                        </td>
                        <td className="py-2 px-3 font-mono text-indigo-300">
                          {encodingStrategy === "label_bad" ? (
                            <span className="text-rose-400 font-bold">{c.cityFeatures.city_integer} (Ordinal Rank)</span>
                          ) : (
                            <span>[{Object.values(c.cityFeatures).join(", ")}]</span>
                          )}
                        </td>
                        <td className="py-2 px-3 font-mono">₹{c.spendK.toFixed(1)}k</td>
                        <td className="py-2 px-3 font-mono">
                          <span
                            className={clsx(
                              "px-2 py-0.5 rounded text-[10px] font-bold",
                              c.target === 1
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                : "bg-slate-700 text-slate-400"
                            )}
                          >
                            {c.target === 1 ? "High-Value" : "Standard"}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODE B: THE DUMMY VARIABLE TRAP MATRIX ARENA */}
        {studioMode === "dummy_trap" && (
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  Gram Matrix (X^T X) Determinant & Invertibility Audit
                </h3>
                <p className="text-xs text-slate-400">
                  Simulating a 4-record, 2-city cohort (Barrackpore & Kolkata) to audit the exact linear dependence and singularity failure.
                </p>
              </div>

              {/* Mode Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setMatrixDummiesMode("full_k")}
                  className={clsx(
                    "px-3 py-1.5 text-xs font-bold rounded-xl border transition-all",
                    matrixDummiesMode === "full_k"
                      ? "bg-rose-600 text-white border-rose-400 shadow-md"
                      : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                  )}
                >
                  Full Dummies (K=2 cols + Intercept)
                </button>
                <button
                  onClick={() => setMatrixDummiesMode("drop_first")}
                  className={clsx(
                    "px-3 py-1.5 text-xs font-bold rounded-xl border transition-all",
                    matrixDummiesMode === "drop_first"
                      ? "bg-emerald-600 text-white border-emerald-400 shadow-md"
                      : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                  )}
                >
                  Drop-First (K-1=1 col + Intercept)
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-1">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Determinant det(X^T X)</p>
                <p
                  className={clsx(
                    "text-2xl font-extrabold",
                    matrixDummiesMode === "full_k" ? "text-rose-400" : "text-emerald-400"
                  )}
                >
                  {matrixDummiesMode === "full_k" ? "0.000000" : "4.000000"}
                </p>
                <p className="text-[10px] text-slate-400">
                  {matrixDummiesMode === "full_k" ? "SINGULAR (Non-Invertible!)" : "POSITIVE DEFINITE (Invertible)"}
                </p>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-1">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Matrix Condition Number κ</p>
                <p
                  className={clsx(
                    "text-2xl font-extrabold",
                    matrixDummiesMode === "full_k" ? "text-rose-400" : "text-cyan-400"
                  )}
                >
                  {matrixDummiesMode === "full_k" ? "∞ (Infinite)" : "5.83 (Well-Conditioned)"}
                </p>
                <p className="text-[10px] text-slate-400">
                  {matrixDummiesMode === "full_k" ? "Total numerical collapse" : "Stable OLS parameter inversion"}
                </p>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-1">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Design Matrix Rank</p>
                <p className="text-2xl font-extrabold text-indigo-400">
                  {matrixDummiesMode === "full_k" ? "Rank = 2 (Dimension = 3)" : "Rank = 2 (Dimension = 2)"}
                </p>
                <p className="text-[10px] text-slate-400">
                  {matrixDummiesMode === "full_k" ? "Rank-Deficient by 1 DoF" : "Full Column Rank"}
                </p>
              </div>
            </div>

            {/* Interactive Design Matrix Visualization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Design Matrix X (4 rows x {matrixDummiesMode === "full_k" ? "3 cols" : "2 cols"})
                </h4>
                <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-indigo-200 space-y-1">
                  {matrixDummiesMode === "full_k" ? (
                    <>
                      <p className="text-slate-400 text-[10px]"># Columns: [Intercept, City_Barrackpore, City_Kolkata]</p>
                      <p>Row 1 (Barrackpore): [ 1.0,  1.0,  0.0 ]</p>
                      <p>Row 2 (Barrackpore): [ 1.0,  1.0,  0.0 ]</p>
                      <p>Row 3 (Kolkata):     [ 1.0,  0.0,  1.0 ]</p>
                      <p>Row 4 (Kolkata):     [ 1.0,  0.0,  1.0 ]</p>
                      <p className="text-rose-400 text-[11px] pt-1 border-t border-slate-800">
                        Notice: Col 2 + Col 3 = Col 1 exactly! (Linear Dependence)
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-slate-400 text-[10px]"># Columns: [Intercept, City_Kolkata] (Barrackpore Dropped)</p>
                      <p>Row 1 (Barrackpore): [ 1.0,  0.0 ]</p>
                      <p>Row 2 (Barrackpore): [ 1.0,  0.0 ]</p>
                      <p>Row 3 (Kolkata):     [ 1.0,  1.0 ]</p>
                      <p>Row 4 (Kolkata):     [ 1.0,  1.0 ]</p>
                      <p className="text-emerald-400 text-[11px] pt-1 border-t border-slate-800">
                        Linearly Independent: Full Column Rank!
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Gram Matrix X^T X
                </h4>
                <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-cyan-200 space-y-1">
                  {matrixDummiesMode === "full_k" ? (
                    <>
                      <p className="text-slate-400 text-[10px]"># Size: 3 x 3</p>
                      <p>[  4.0,  2.0,  2.0 ]</p>
                      <p>[  2.0,  2.0,  0.0 ]</p>
                      <p>[  2.0,  0.0,  2.0 ]</p>
                      <p className="text-rose-300 text-[11px] pt-1 border-t border-slate-800">
                        det(X^T X) = 4(4 - 0) - 2(4 - 0) + 2(0 - 4) = 16 - 8 - 8 = 0.0!
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-slate-400 text-[10px]"># Size: 2 x 2</p>
                      <p>[  4.0,  2.0 ]</p>
                      <p>[  2.0,  2.0 ]</p>
                      <p className="text-emerald-300 text-[11px] pt-1 border-t border-slate-800">
                        det(X^T X) = (4.0 * 2.0) - (2.0 * 2.0) = 8.0 - 4.0 = 4.0!
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE C: BAYESIAN TARGET ENCODING & COLD-START SANDBOX */}
        {studioMode === "target_encoding" && (
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  Bayesian Target Encoding with m-Estimate Smoothing
                </h3>
                <p className="text-xs text-slate-400">
                  Adjust the smoothing hyperparameter m and test cold-start fallback behavior on unseen cities.
                </p>
              </div>

              {/* Slider for m */}
              <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
                <label className="text-xs font-semibold text-slate-300">
                  Smoothing Weight (m): <span className="text-cyan-400 font-mono font-bold">{targetSmoothingM.toFixed(1)}</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="10.0"
                  step="0.5"
                  value={targetSmoothingM}
                  onChange={e => setTargetSmoothingM(Number(e.target.value))}
                  className="accent-indigo-500 cursor-pointer w-28"
                />
              </div>
            </div>

            {/* City Target Representation Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/80 text-slate-400 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">City</th>
                    <th className="py-2.5 px-3">Sample Count (n_i)</th>
                    <th className="py-2.5 px-3">Empirical Target Rate (ȳ_i)</th>
                    <th className="py-2.5 px-3">Global Target Prior (ȳ_global)</th>
                    <th className="py-2.5 px-3">Smoothed Target Encoding (S_i)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {KNOWN_CITIES.map(city => {
                    const stat = cityTargetStats[city];
                    return (
                      <tr key={city} className="hover:bg-slate-800/40">
                        <td className="py-2 px-3 font-semibold text-white">{city}</td>
                        <td className="py-2 px-3 font-mono">{stat.count} records</td>
                        <td className="py-2 px-3 font-mono">{(stat.rawMean * 100).toFixed(1)}%</td>
                        <td className="py-2 px-3 font-mono text-slate-400">{(globalTargetRate * 100).toFixed(1)}%</td>
                        <td className="py-2 px-3 font-mono text-cyan-300 font-bold">{stat.smoothed.toFixed(4)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Cold-Start Interactive Test Bench */}
            <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/70 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Cold-Start Real-Time Inference Test Bench
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Test City Input:</span>
                  <input
                    type="text"
                    value={customTestCity}
                    onChange={e => setCustomTestCity(e.target.value)}
                    placeholder="Enter city (e.g. Asansol, Malda)..."
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">Training Vocabulary Status</p>
                  <p
                    className={clsx(
                      "text-base font-bold",
                      customCityEvaluation.isKnown ? "text-emerald-400" : "text-rose-400"
                    )}
                  >
                    {customCityEvaluation.isKnown ? "Known Category ✓" : "Cold-Start Unseen ⚠"}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {customCityEvaluation.isKnown ? "Seen in training cohort" : "Zero occurrences in training data"}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">OHE Drop-First Vector</p>
                  <p className="text-base font-mono font-bold text-cyan-300">
                    [{customCityEvaluation.oheDropVec.join(", ")}]
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {customCityEvaluation.isKnown ? "Active indicator match" : "Safe all-zeros vector (no crash!)"}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">Target Encoded Output</p>
                  <p className="text-base font-mono font-bold text-indigo-300">
                    {customCityEvaluation.targetVal.toFixed(4)}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {customCityEvaluation.isKnown ? "Smoothed local average" : "Graceful fallback to global prior ȳ_global"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================================
          SECTION 3: MATHEMATICAL FORMULATIONS (KATEX / MATHJAX STYLE)
      ===================================================================== */}
      <section id="math" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 rounded-xl border border-emerald-500/30 text-emerald-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              3. Mathematical Foundations & Analytical Proofs
            </h2>
            <p className="text-sm text-slate-400">
              Rigorous proofs of the Dummy Variable Trap, standard basis geometry, and empirical Bayesian smoothing
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Standard Basis Geometry */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              1. Standard Basis Orthogonality
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {"One-Hot Encoding maps category k to standard basis vector e_k in R^K. All distinct categories are mutually orthogonal and equidistant:"}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-indigo-200 space-y-2">
              <p>{"e_j^T * e_k = 0   ∀ j ≠ k   (Mutual Orthogonality)"}</p>
              <p>{"||e_j - e_k|| = √[ (1)² + (-1)² ] = √2 ≈ 1.4142   ∀ j ≠ k"}</p>
            </div>
            <p className="text-xs text-slate-400">
              This preserves nominal invariants: no category is closer or further from any other, completely avoiding the false proximity of Label Encoding.
            </p>
          </div>

          {/* Card 2: Dummy Variable Trap Singularity Proof */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              2. Singularity Proof: det(X^T X) = 0
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {"Let design matrix X contain an intercept column 1 and all K dummy columns d_1 ... d_K:"}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-cyan-200 space-y-1">
              <p>{"∑_{k=1}^K d_k = 1   ==>   1 * 1 - ∑_{k=1}^K 1 * d_k = 0"}</p>
              <p>{"rank(X) ≤ K < K + 1   (Rank-Deficient Design Matrix)"}</p>
              <p>{"rank(X^T X) = rank(X) ≤ K < K + 1   ==>   det(X^T X) = 0"}</p>
            </div>
            <p className="text-xs text-slate-400">
              Gram matrix is non-invertible; OLS closed-form (X^T X)^(-1) does not exist. Condition number kappa = infinity.
            </p>
          </div>

          {/* Card 3: Reference Category Interpretation */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              3. Drop-First Reference Category Math
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {"Dropping the first dummy column d_1 (reference) restores full column rank rank(X_drop) = K:"}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-amber-200 space-y-1">
              <p>{"ŷ = β₀ + β₂ * d₂ + β₃ * d₃ + ... + β_K * d_K"}</p>
              <p>{"β₀ = E[Y | Category = Reference]"}</p>
              <p>{"β_k = E[Y | Category = k] - E[Y | Category = Reference]"}</p>
            </div>
            <p className="text-xs text-slate-400">
              Coefficients represent marginal deviations relative to the omitted baseline reference class, ensuring direct hypothesis testing via t-statistics.
            </p>
          </div>

          {/* Card 4: Bayesian m-Estimate Smoothing */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              4. Bayesian Target Encoding (m-Estimate)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {"Empirical Bayesian shrinkage formula (Micci-Barreca) dampens noisy estimates on rare categories:"}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-emerald-200 space-y-1">
              <p>{"S_i = [ n_i * ȳ_i + m * ȳ_global ] / [ n_i + m ]"}</p>
              <p>{"lim_{n_i -> ∞} S_i = ȳ_i   (Sample evidence dominates)"}</p>
              <p>{"lim_{n_i -> 0} S_i = ȳ_global   (Prior dominates for rare/unseen)"}</p>
            </div>
            <p className="text-xs text-slate-400">
              A continuous 1D representation with zero matrix sparsity, optimal for tree algorithms and linear models alike.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: REGIONAL INDUSTRIAL CASE STUDIES (WEST BENGAL)
      ===================================================================== */}
      <section id="cases" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 rounded-xl border border-indigo-500/30 text-indigo-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              4. West Bengal Industrial Case Studies
            </h2>
            <p className="text-sm text-slate-400">
              Real-world deployment of categorical encoding across quick-commerce, FinTech, and healthcare
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Case 1 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Case 1: Quick-Commerce COD Fraud</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                Barrackpore & Ichapur
              </span>
            </div>
            <h3 className="text-base font-bold text-white">Cash-on-Delivery RTO Cancellation Classifier</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context & Challenge:</strong> Susmita manages logistics intelligence for a grocery delivery fleet operating along BT Road. Predicting Cash-on-Delivery (COD) return-to-origin cancellations across 18 North 24 Parganas municipalities.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Implementation & Impact:</strong> Gender was binary mapped to {`{0, 1}`}. High-volume municipalities (Barrackpore, Naihati, Titagarh) retained individual One-Hot columns, while rural wards (&lt; 50 orders) were pooled into "Other_Suburban". Model achieved 88.4% AUC, saving ₹14.2 Lakhs in wasted return logistics.
            </p>
          </div>

          {/* Case 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Case 2: FinTech Underwriting Scorecards</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Salt Lake Sector V
              </span>
            </div>
            <h3 className="text-base font-bold text-white">RBI Regulatory Compliance Credit Scorecards</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context & Challenge:</strong> Debangshu develops logistic regression credit scorecards for an NBFC in Salt Lake evaluating loan applicants. Full dummy encoding caused `LinAlgError` due to exact collinearity with the scorecard intercept.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Implementation & Impact:</strong> Switched to `OneHotEncoder(drop='first', handle_unknown='ignore')` with Kolkata as the baseline reference. Regulators easily audited coefficients (e.g. beta_Siliguri = -0.42 log-odds vs Kolkata). Passed RBI model governance with all Variance Inflation Factors VIF &lt; 2.5.
            </p>
          </div>

          {/* Case 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Case 3: Dark Store Demand Forecasting</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                Howrah & Kalyani
              </span>
            </div>
            <h3 className="text-base font-bold text-white">Hyperlocal Produce Demand per Pincode</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context & Challenge:</strong> Mahima oversees inventory replenishment across dark stores in Howrah and Kalyani. 140+ postal delivery zones created an ultra-sparse matrix that diluted Random Forest feature splits (the mtry hazard).
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Implementation & Impact:</strong> Replaced sparse One-Hot vectors with Bayesian Target Encoding (m=5.0) predicting average daily basket size. LightGBM inference latency dropped from 45ms to 4ms per request, and training time was slashed by 74%.
            </p>
          </div>

          {/* Case 4 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Case 4: Digital Health Triage</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Siliguri & North Bengal
              </span>
            </div>
            <h3 className="text-base font-bold text-white">Tea Garden Medical Tele-Consultation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context & Challenge:</strong> Abhronila manages patient triage analytics for remote clinics across Darjeeling tea gardens and urban Siliguri. Patient records regularly featured variable town spellings and missing gender.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Implementation & Impact:</strong> Implemented a fuzzy string matching layer prior to encoding, and modeled gender as a ternary feature {`{Female: 0, Male: 1, Unknown: 2}`}. Eliminated 99.2% of cold-start crash exceptions during monsoon surges.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: DIAGNOSTIC ASSESSMENT QUIZ (5 SCENARIO QUESTIONS)
      ===================================================================== */}
      <section id="quiz" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/20 rounded-xl border border-amber-500/30 text-amber-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              5. Diagnostic Assessment Quiz
            </h2>
            <p className="text-sm text-slate-400">
              5 scenario-based examination questions testing theoretical mastery and production decision-making
            </p>
          </div>
        </div>

        <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-300">Test Your Knowledge:</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                5 Scenarios
              </span>
            </div>

            {quizSubmitted && (
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-300">Your Score:</span>
                <span
                  className={clsx(
                    "text-sm font-extrabold px-3 py-1 rounded-xl border",
                    quizScore >= 4
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      : quizScore >= 3
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                      : "bg-rose-500/20 text-rose-300 border-rose-500/40"
                  )}
                >
                  {quizScore} / 5 ({((quizScore / 5) * 100).toFixed(0)}%)
                </span>
              </div>
            )}
          </div>

          {/* Quiz Question Cards */}
          <div className="space-y-6">
            {quizQuestions.map((q, idx) => {
              const selectedOpt = quizAnswers[q.id];
              const isCorrect = selectedOpt === q.correct;

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/70 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                      Scenario #{idx + 1}
                    </span>
                    {quizSubmitted && (
                      <span
                        className={clsx(
                          "text-xs font-bold px-2.5 py-0.5 rounded-full",
                          isCorrect
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                        )}
                      >
                        {isCorrect ? "Correct ✓" : "Incorrect ✗"}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    "{q.scenario}"
                  </p>

                  <h4 className="text-sm font-semibold text-white">{q.prompt}</h4>

                  <div className="space-y-2 pt-1">
                    {q.options.map(opt => {
                      const isOptionSelected = selectedOpt === opt.key;
                      let btnStyle = "bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-700/80";

                      if (quizSubmitted) {
                        if (opt.key === q.correct) {
                          btnStyle = "bg-emerald-950/60 border-emerald-500/60 text-emerald-200 font-semibold";
                        } else if (isOptionSelected && !isCorrect) {
                          btnStyle = "bg-rose-950/60 border-rose-500/60 text-rose-200";
                        } else {
                          btnStyle = "bg-slate-800/40 border-slate-800 text-slate-500";
                        }
                      } else if (isOptionSelected) {
                        btnStyle = "bg-indigo-600/30 border-indigo-400 text-white font-semibold";
                      }

                      return (
                        <button
                          key={opt.key}
                          disabled={quizSubmitted}
                          onClick={() => handleQuizSelect(q.id, opt.key)}
                          className={clsx(
                            "w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-3",
                            btnStyle
                          )}
                        >
                          <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                            {opt.key}
                          </span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                      <p className="font-bold text-indigo-300">Explanation & Conceptual Rationale:</p>
                      <p className="text-slate-400">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                setQuizAnswers({});
                setQuizSubmitted(false);
              }}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all border border-slate-700"
            >
              Reset Quiz
            </button>

            {!quizSubmitted ? (
              <button
                disabled={Object.keys(quizAnswers).length < 5}
                onClick={() => setQuizSubmitted(true)}
                className={clsx(
                  "px-6 py-2.5 text-xs font-bold rounded-xl transition-all shadow-lg",
                  Object.keys(quizAnswers).length === 5
                    ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/30"
                    : "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
                )}
              >
                Submit Answers ({Object.keys(quizAnswers).length}/5 Answered)
              </button>
            ) : (
              <span className="text-xs font-semibold text-emerald-400">
                Evaluation Complete! Review explanations above.
              </span>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: PRODUCTION PITFALLS & LEAKAGE PATTERNS
      ===================================================================== */}
      <section id="pitfalls" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/20 rounded-xl border border-rose-500/30 text-rose-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              6. Production Pitfalls & Anti-Patterns
            </h2>
            <p className="text-sm text-slate-400">
              Crucial architectural traps: data leakage, cold-start exceptions, and tree feature dilution
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Pitfall 1 */}
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <span>⚠ Pitfall 1: Label Encoding Nominal Cities in Linear Models</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Applying `LabelEncoder` or integer mapping to nominal geographic attributes. Imposes artificial Euclidean distances and forces linear slopes to predict monotonic trends across alphabetically sorted cities.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-rose-300 border border-rose-900/30">
              # DANGEROUS LABEL ENCODING ON NOMINAL DATA<br />
              df['city_enc'] = LabelEncoder().fit_transform(df['city'])
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/40 font-mono text-[11px] text-emerald-300 border border-emerald-800/40">
              # PRODUCTION BEST PRACTICE<br />
              from sklearn.preprocessing import OneHotEncoder<br />
              ohe = OneHotEncoder(drop='first', handle_unknown='ignore')<br />
              X_encoded = ohe.fit_transform(df[['city']])
            </div>
          </div>

          {/* Pitfall 2 */}
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <span>⚠ Pitfall 2: Unhandled Cold-Start Categories in Production Serving</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Default `handle_unknown='error'` crashes web APIs when an online user inputs an unlisted town (e.g., 'Asansol'). Must always configure graceful fallback guards.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-rose-300 border border-rose-900/30">
              # RUNTIME CRASH HAZARD<br />
              ohe = OneHotEncoder() # Defaults to handle_unknown='error'
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/40 font-mono text-[11px] text-emerald-300 border border-emerald-800/40">
              # PRODUCTION BEST PRACTICE<br />
              ohe = OneHotEncoder(handle_unknown='ignore') # Outputs safe all-zeros!
            </div>
          </div>

          {/* Pitfall 3 */}
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <span>⚠ Pitfall 3: In-Sample Target Encoding Leakage</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Calculating category target averages without cross-validation or Bayesian smoothing. A single customer in a rare city who defaulted gives that city a 100% risk rating, causing extreme memorization and training overfitting.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-rose-300 border border-rose-900/30">
              # MEMORIZATION & TARGET LEAKAGE<br />
              df['city_enc'] = df.groupby('city')['target'].transform('mean')
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/40 font-mono text-[11px] text-emerald-300 border border-emerald-800/40">
              # PRODUCTION BEST PRACTICE<br />
              from category_encoders import TargetEncoder<br />
              enc = TargetEncoder(smoothing=5.0, cv=5)<br />
              X_train['city_enc'] = enc.fit_transform(X_train['city'], y_train)
            </div>
          </div>

          {/* Pitfall 4 */}
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <span>⚠ Pitfall 4: The mtry Feature Dilution Hazard in Random Forests</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              One-hot encoding high-cardinality postal codes into 200 sparse dummy columns. Random Forests evaluate only sqrt(p) features per split, meaning tree splits are dominated by empty dummy indicators while informative continuous features are never chosen.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-rose-300 border border-rose-900/30">
              # MATRIX DILUTION IN ENSEMBLES<br />
              # 200 sparse dummy columns drown out Age and Income!
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/40 font-mono text-[11px] text-emerald-300 border border-emerald-800/40">
              # PRODUCTION BEST PRACTICE<br />
              # Use Bayesian Target Encoding or native LightGBM categorical features
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7: LABORATORY CODE, STUDY NOTES & 30 GRADED QUESTIONS
      ===================================================================== */}
      <section id="resources" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 rounded-xl border border-indigo-500/30 text-indigo-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              7. Academic Laboratory & Resource Hub
            </h2>
            <p className="text-sm text-slate-400">
              Pure Python engine, comprehensive study handbook, 30 graded questions, and instructor bio
            </p>
          </div>
        </div>

        {/* Resource Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
          {[
            { id: "lab", label: "Python Laboratory Code" },
            { id: "notes", label: "Comprehensive Study Notes (400+ Lines)" },
            { id: "questions", label: "30 Graded Examination Questions" },
            { id: "author", label: "Instructor Profile" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setResourceTab(tab.id)}
              className={clsx(
                "flex-1 min-w-[180px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all",
                resourceTab === tab.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-2xl">
          {resourceTab === "lab" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Pure Python Simulation Engine (Zero External Dependencies)
                  </h3>
                  <p className="text-xs text-slate-400">
                    File: <code className="text-indigo-300">worked_example_3_encoding_city_and_gender_columns_lab.py</code>
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                  Verified: Exit Code 0
                </span>
              </div>
              <PythonFileLoader code={labCode} filename="worked_example_3_encoding_city_and_gender_columns_lab.py" />
            </div>
          )}

          {resourceTab === "notes" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Official MAKAUT Masterclass Academic Study Handbook
                  </h3>
                  <p className="text-xs text-slate-400">
                    File: <code className="text-indigo-300">topic23_note.txt</code> • 400+ Lines
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-mono">
                  Syllabus BCAC701B
                </span>
              </div>
              <div className="max-h-[600px] overflow-y-auto rounded-xl border border-slate-800 p-4 bg-slate-950/70">
                <PlainTextPrint text={noteText} />
              </div>
            </div>
          )}

          {resourceTab === "questions" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    30 Graded Assessment Questions with Step-by-Step Solutions
                  </h3>
                  <p className="text-xs text-slate-400">
                    Curated across 4 Rigorous Tiers: Foundation, Mechanics, Architecture, and Scalability
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                  30 Graded Questions
                </span>
              </div>
              <FAQTemplate questions={questions} />
            </div>
          )}

          {resourceTab === "author" && (
            <div className="space-y-4">
              <Teacher />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Topic23;
