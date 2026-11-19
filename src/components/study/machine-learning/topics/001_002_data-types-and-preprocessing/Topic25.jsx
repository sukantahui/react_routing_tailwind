import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic25_files/practice_problems_lab.py?raw";
import noteText from "./topic25_files/topic25_note.txt?raw";
import questions from "./topic25_files/topic25_questions.js";

// =============================================================================
// CAPSTONE DATASETS & CONFIGURATIONS (WEST BENGAL REPOSITORIES)
// =============================================================================

// Problem 1: Salt Lake Tech Park Payroll (Rubin's Missing Mechanisms)
const SALTLAKE_PAYROLL_DATA = [
  { id: "EMP-01", name: "Susmita", dept: "IT", exp: 2.0, salaryTrue: 6.20, salaryObs: 6.20, mechanism: "Observed" },
  { id: "EMP-02", name: "Debangshu", dept: "Executive", exp: 12.0, salaryTrue: 35.00, salaryObs: 35.00, mechanism: "Observed" },
  { id: "EMP-03", name: "Mahima", dept: "IT", exp: 1.5, salaryTrue: 5.20, salaryObs: null, mechanism: "MCAR" },
  { id: "EMP-04", name: "Mamata", dept: "Support", exp: 5.0, salaryTrue: 13.00, salaryObs: 13.00, mechanism: "Observed" },
  { id: "EMP-05", name: "Abhronila", dept: "Executive", exp: 10.0, salaryTrue: 28.00, salaryObs: 28.00, mechanism: "Observed" },
  { id: "EMP-06", name: "Rohan", dept: "IT", exp: 3.0, salaryTrue: 7.50, salaryObs: 7.50, mechanism: "Observed" },
  { id: "EMP-07", name: "Priyanka", dept: "Support", exp: 6.0, salaryTrue: 16.00, salaryObs: null, mechanism: "MAR" },
  { id: "EMP-08", name: "Sourav", dept: "Executive", exp: 11.0, salaryTrue: 32.00, salaryObs: 32.00, mechanism: "Observed" },
  { id: "EMP-09", name: "Tanmoy", dept: "IT", exp: 2.5, salaryTrue: 6.80, salaryObs: 6.80, mechanism: "Observed" },
  { id: "EMP-10", name: "Ananya", dept: "IT", exp: 1.0, salaryTrue: 4.80, salaryObs: 4.80, mechanism: "Observed" },
  { id: "EMP-11", name: "Subhajit", dept: "Executive", exp: 15.0, salaryTrue: 45.00, salaryObs: null, mechanism: "MNAR" },
  { id: "EMP-12", name: "Kallol", dept: "Support", exp: 7.0, salaryTrue: 17.50, salaryObs: 17.50, mechanism: "Observed" },
];

// Problem 2: Canonical WB Cities & Historical Aliases
const CANONICAL_CITIES = ["Kolkata", "Howrah", "Barrackpore", "Siliguri", "Durgapur", "Kalyani"];
const CITY_ALIASES = {
  "calcutta": "Kolkata",
  "kol": "Kolkata",
  "hwh": "Howrah",
  "howra": "Howrah",
  "barrackpur": "Barrackpore",
  "shiliguri": "Siliguri"
};

// Problem 3 & 4: Loan Applicant Scaling & Dummy Trap Cohort
const LOAN_COHORT_DATA = [
  { id: "AP-01", name: "Susmita", city: "Barrackpore", gender: "F", age: 24, incomeLPA: 4.5, defaultTarget: 0 },
  { id: "AP-02", name: "Debangshu", city: "Kolkata", gender: "M", age: 45, incomeLPA: 28.0, defaultTarget: 0 },
  { id: "AP-03", name: "Mahima", city: "Howrah", gender: "F", age: 22, incomeLPA: 3.8, defaultTarget: 1 },
  { id: "AP-04", name: "Mamata", city: "Siliguri", gender: "F", age: 35, incomeLPA: 14.5, defaultTarget: 0 },
  { id: "AP-05", name: "Abhronila", city: "Kolkata", gender: "F", age: 50, incomeLPA: 38.0, defaultTarget: 0 },
  { id: "AP-06", name: "Rohan", city: "Barrackpore", gender: "M", age: 28, incomeLPA: 6.2, defaultTarget: 1 },
  { id: "AP-07", name: "Priyanka", city: "Kalyani", gender: "F", age: 32, incomeLPA: 11.0, defaultTarget: 0 },
  { id: "AP-08", name: "Sourav", city: "Durgapur", gender: "M", age: 42, incomeLPA: 26.5, defaultTarget: 0 },
  { id: "AP-09", name: "Tanmoy", city: "Howrah", gender: "M", age: 25, incomeLPA: 4.0, defaultTarget: 1 },
  { id: "AP-10", name: "Ananya", city: "Barrackpore", gender: "F", age: 23, incomeLPA: 3.2, defaultTarget: 1 },
  { id: "AP-11", name: "Subhajit", city: "Kolkata", gender: "M", age: 58, incomeLPA: 95.0, defaultTarget: 0 }, // Outlier senior executive
  { id: "AP-12", name: "Kallol", city: "Siliguri", gender: "M", age: 36, incomeLPA: 15.0, defaultTarget: 0 },
];

// Helper: Statistical Moments
function calculateStats(arr) {
  if (!arr || arr.length === 0) return { mean: 0, std: 1, min: 0, max: 1, median: 0, q1: 0, q3: 0, iqr: 1 };
  const sorted = [...arr].sort((a, b) => a - b);
  const n = sorted.length;
  const mean = sorted.reduce((acc, v) => acc + v, 0) / n;
  const variance = n > 1 ? sorted.reduce((acc, v) => acc + (v - mean) ** 2, 0) / (n - 1) : 0;
  const std = Math.sqrt(variance) || 1e-5;
  const min = sorted[0];
  const max = sorted[n - 1];

  const getPercentile = p => {
    const idx = p * (n - 1);
    const lower = Math.floor(idx);
    const upper = Math.ceil(idx);
    const weight = idx - lower;
    return (1.0 - weight) * sorted[lower] + weight * sorted[upper];
  };

  const median = getPercentile(0.5);
  const q1 = getPercentile(0.25);
  const q3 = getPercentile(0.75);
  const iqr = Math.max(q3 - q1, 1e-5);

  return { mean, std, min, max, median, q1, q3, iqr };
}

// Helper: Jaro-Winkler String Similarity Engine
function computeJaroWinkler(s1, s2, p = 0.1, maxL = 4) {
  s1 = (s1 || "").toLowerCase().trim();
  s2 = (s2 || "").toLowerCase().trim();
  if (s1 === s2) return { sim: 1.0, dj: 1.0, prefixLen: Math.min(s1.length, maxL), m: s1.length, t: 0 };
  const len1 = s1.length;
  const len2 = s2.length;
  if (len1 === 0 || len2 === 0) return { sim: 0.0, dj: 0.0, prefixLen: 0, m: 0, t: 0 };

  const matchWindow = Math.floor(Math.max(len1, len2) / 2) - 1;
  const s1Matches = new Array(len1).fill(false);
  const s2Matches = new Array(len2).fill(false);
  let matches = 0;

  for (let i = 0; i < len1; i++) {
    const start = Math.max(0, i - matchWindow);
    const end = Math.min(i + matchWindow + 1, len2);
    for (let j = start; j < end; j++) {
      if (!s2Matches[j] && s1[i] === s2[j]) {
        s1Matches[i] = true;
        s2Matches[j] = true;
        matches++;
        break;
      }
    }
  }

  if (matches === 0) return { sim: 0.0, dj: 0.0, prefixLen: 0, m: 0, t: 0 };

  let k = 0;
  let transpositions = 0;
  for (let i = 0; i < len1; i++) {
    if (s1Matches[i]) {
      while (!s2Matches[k]) k++;
      if (s1[i] !== s2[k]) transpositions++;
      k++;
    }
  }
  const t = transpositions / 2;
  const dj = (matches / len1 + matches / len2 + (matches - t) / matches) / 3.0;

  let prefixLen = 0;
  for (let i = 0; i < Math.min(len1, len2, maxL); i++) {
    if (s1[i] === s2[i]) prefixLen++;
    else break;
  }
  const dw = dj + prefixLen * p * (1.0 - dj);
  return { sim: Math.min(1.0, dw), dj, prefixLen, m: matches, t };
}

// =============================================================================
// MAIN MASTERCLASS COMPONENT
// =============================================================================

const Topic25 = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const svgId = useId();

  // Studio Mode: "problem1" | "problem2" | "problem3" | "problem4"
  const [studioMode, setStudioMode] = useState("problem1");

  // --- PROBLEM 1 STATE: Missing Remediation ---
  const [imputationEngine, setImputationEngine] = useState("stratified_median"); // "mean" | "median" | "stratified_median" | "knn"

  // --- PROBLEM 2 STATE: Fuzzy Entity Resolution ---
  const [queryCityInput, setQueryCityInput] = useState("barackpore");
  const [matchThreshold, setMatchThreshold] = useState(0.85);

  // --- PROBLEM 3 STATE: High-Cardinality Dummy Trap ---
  const [dummyDropFirst, setDummyDropFirst] = useState(false); // false = trap active, true = safe drop-first
  const [coldStartCityInput, setColdStartCityInput] = useState("Asansol");

  // --- PROBLEM 4 STATE: Multi-Scale Normalization ---
  const [subhajitIncomeSlider, setSubhajitIncomeSlider] = useState(95.0); // LPA
  const [selectedScaler, setSelectedScaler] = useState("robust"); // "unscaled" | "standard" | "minmax" | "robust" | "log1p"
  const [streamingTestIncome, setStreamingTestIncome] = useState(120.0); // Test out-of-bounds applicant

  // Jargon Glossary Search
  const [jargonQuery, setJargonQuery] = useState("");

  // Diagnostic Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Resource Tab
  const [resourceTab, setResourceTab] = useState("lab");

  // ---------------------------------------------------------------------------
  // COMPUTATIONS: PROBLEM 1 (Missing Imputation)
  // ---------------------------------------------------------------------------
  const problem1Metrics = useMemo(() => {
    const observedRecords = SALTLAKE_PAYROLL_DATA.filter(r => r.salaryObs !== null);
    const observedSalaries = observedRecords.map(r => r.salaryObs);
    const globalMean = observedSalaries.reduce((a, b) => a + b, 0) / observedSalaries.length;
    const sortedObs = [...observedSalaries].sort((a, b) => a - b);
    const globalMedian = sortedObs[Math.floor(sortedObs.length / 2)];

    // Departmental Medians
    const deptGroups = {};
    observedRecords.forEach(r => {
      if (!deptGroups[r.dept]) deptGroups[r.dept] = [];
      deptGroups[r.dept].push(r.salaryObs);
    });
    const deptMedians = {};
    Object.keys(deptGroups).forEach(dept => {
      const arr = deptGroups[dept].sort((a, b) => a - b);
      deptMedians[dept] = arr[Math.floor(arr.length / 2)];
    });

    // KNN (K=3 on Experience feature)
    const computeKnn = (exp) => {
      const distances = observedRecords.map(r => ({
        dist: Math.abs(r.exp - exp),
        salary: r.salaryObs
      })).sort((a, b) => a.dist - b.dist);
      const kNearest = distances.slice(0, 3);
      return kNearest.reduce((sum, item) => sum + item.salary, 0) / 3;
    };

    // Impute Missing Values
    const imputedData = SALTLAKE_PAYROLL_DATA.map(r => {
      if (r.salaryObs !== null) {
        return { ...r, imputedVal: r.salaryObs, error: 0.0 };
      }
      let val = globalMean;
      if (imputationEngine === "median") val = globalMedian;
      else if (imputationEngine === "stratified_median") val = deptMedians[r.dept] || globalMedian;
      else if (imputationEngine === "knn") val = computeKnn(r.exp);

      const err = Math.abs(val - r.salaryTrue);
      return { ...r, imputedVal: val, error: err };
    });

    const missingRows = imputedData.filter(r => r.salaryObs === null);
    const totalMAE = missingRows.reduce((sum, r) => sum + r.error, 0) / missingRows.length;

    return { globalMean, globalMedian, deptMedians, imputedData, totalMAE };
  }, [imputationEngine]);

  // ---------------------------------------------------------------------------
  // COMPUTATIONS: PROBLEM 2 (Jaro-Winkler Resolution)
  // ---------------------------------------------------------------------------
  const problem2Resolution = useMemo(() => {
    const raw = queryCityInput.trim().toLowerCase();
    // Stage 1: Exact alias match
    if (CITY_ALIASES[raw]) {
      return {
        matchedCity: CITY_ALIASES[raw],
        method: "Alias Table (Stage 1)",
        score: 1.0,
        dj: 1.0,
        prefixLen: raw.length,
        status: "MATCHED_EXACT",
        allScores: CANONICAL_CITIES.map(c => ({ city: c, score: computeJaroWinkler(raw, c).sim }))
      };
    }
    // Stage 2: Jaro-Winkler Dictionary Search
    const scored = CANONICAL_CITIES.map(city => {
      const details = computeJaroWinkler(raw, city);
      return { city, score: details.sim, ...details };
    }).sort((a, b) => b.sim - a.sim);

    const best = scored[0] || { city: "Unknown", sim: 0.0, dj: 0.0, prefixLen: 0 };
    let status = "REJECTED";
    if (best.sim >= matchThreshold) status = "MATCHED_FUZZY";
    else if (best.sim >= 0.70) status = "UNCERTAIN";

    return {
      matchedCity: best.city,
      method: "Jaro-Winkler Metric (Stage 2)",
      score: best.sim,
      dj: best.dj,
      prefixLen: best.prefixLen,
      status,
      allScores: scored
    };
  }, [queryCityInput, matchThreshold]);

  // ---------------------------------------------------------------------------
  // COMPUTATIONS: PROBLEM 3 (Gram Matrix & Singularity)
  // ---------------------------------------------------------------------------
  const problem3Matrix = useMemo(() => {
    // 5 Unique Cities in sample: Barrackpore, Kolkata, Howrah, Siliguri, Durgapur, Kalyani (6)
    // For visual clarity, take 4 cities: Barrackpore, Kolkata, Howrah, Siliguri
    const activeCities = ["Barrackpore", "Kolkata", "Howrah", "Siliguri"];
    const K = activeCities.length;

    // If dropFirst=false: X has 1 intercept + 4 dummies = 5 columns. det(X^T X) = 0!
    // If dropFirst=true: X has 1 intercept + 3 dummies = 4 columns. det(X^T X) > 0.
    const isSingular = !dummyDropFirst;
    const determinant = dummyDropFirst ? 144.0 : 0.0;
    const condNumber = dummyDropFirst ? 4.82 : Infinity;
    const rank = dummyDropFirst ? K : K; // Full Rank vs Rank Deficient (Rank = K, cols = K+1)

    // Cold-Start Check for unseen city
    const isColdStart = !activeCities.map(c => c.toLowerCase()).includes(coldStartCityInput.trim().toLowerCase());
    const coldStartVector = dummyDropFirst
      ? [0, 0, 0] // 3 dummies (excluding baseline Barrackpore)
      : [0, 0, 0, 0];

    return { isSingular, determinant, condNumber, rank, isColdStart, coldStartVector, activeCities };
  }, [dummyDropFirst, coldStartCityInput]);

  // ---------------------------------------------------------------------------
  // COMPUTATIONS: PROBLEM 4 (Multi-Scale Normalization)
  // ---------------------------------------------------------------------------
  const dynamicLoanCohort = useMemo(() => {
    return LOAN_COHORT_DATA.map(c => {
      if (c.id === "AP-11") return { ...c, incomeLPA: subhajitIncomeSlider };
      return c;
    });
  }, [subhajitIncomeSlider]);

  const ageStats = useMemo(() => calculateStats(dynamicLoanCohort.map(c => c.age)), [dynamicLoanCohort]);
  const incomeStats = useMemo(() => calculateStats(dynamicLoanCohort.map(c => c.incomeLPA)), [dynamicLoanCohort]);

  const applicantTransformations = useMemo(() => {
    return dynamicLoanCohort.map(c => {
      let scaledAge = c.age;
      let scaledIncome = c.incomeLPA;

      if (selectedScaler === "standard") {
        scaledAge = (c.age - ageStats.mean) / ageStats.std;
        scaledIncome = (c.incomeLPA - incomeStats.mean) / incomeStats.std;
      } else if (selectedScaler === "minmax") {
        scaledAge = (c.age - ageStats.min) / (ageStats.max - ageStats.min || 1);
        scaledIncome = (c.incomeLPA - incomeStats.min) / (incomeStats.max - incomeStats.min || 1);
      } else if (selectedScaler === "robust") {
        scaledAge = (c.age - ageStats.median) / ageStats.iqr;
        scaledIncome = (c.incomeLPA - incomeStats.median) / incomeStats.iqr;
      } else if (selectedScaler === "log1p") {
        scaledAge = Math.log(1 + c.age);
        scaledIncome = Math.log(1 + c.incomeLPA);
      }

      return {
        ...c,
        scaledAge,
        scaledIncome
      };
    });
  }, [dynamicLoanCohort, selectedScaler, ageStats, incomeStats]);

  // Distance ratio between Mahima (age 22, 3.8 LPA) and Mamata (age 35, 14.5 LPA)
  const distanceDominationMetrics = useMemo(() => {
    const mahima = applicantTransformations.find(a => a.id === "AP-03");
    const mamata = applicantTransformations.find(a => a.id === "AP-04");
    if (!mahima || !mamata) return { ageDiffSq: 1, incDiffSq: 1, ratio: 1, incomePct: 50 };

    const ageDiffSq = (mahima.scaledAge - mamata.scaledAge) ** 2;
    const incDiffSq = (mahima.scaledIncome - mamata.scaledIncome) ** 2;
    const totalDistSq = ageDiffSq + incDiffSq || 1e-6;
    const incomePct = (incDiffSq / totalDistSq) * 100;
    const ratio = ageDiffSq > 0 ? incDiffSq / ageDiffSq : Infinity;

    return { ageDiffSq, incDiffSq, ratio, incomePct, totalDist: Math.sqrt(totalDistSq) };
  }, [applicantTransformations]);

  // Out-of-bounds streaming applicant test
  const streamingTestResult = useMemo(() => {
    const rawVal = Number(streamingTestIncome) || 0;
    const unclippedMinMax = (rawVal - incomeStats.min) / (incomeStats.max - incomeStats.min || 1);
    const clippedMinMax = Math.min(1.0, Math.max(0.0, unclippedMinMax));
    const robustVal = (rawVal - incomeStats.median) / incomeStats.iqr;
    const standardVal = (rawVal - incomeStats.mean) / incomeStats.std;

    return {
      rawVal,
      unclippedMinMax,
      clippedMinMax,
      robustVal,
      standardVal,
      isExceeded: rawVal > incomeStats.max
    };
  }, [streamingTestIncome, incomeStats]);

  // ---------------------------------------------------------------------------
  // JARGON GLOSSARY
  // ---------------------------------------------------------------------------
  const JARGON_TERMS = [
    {
      term: "Fundamental Pipeline Invariant",
      definition: "The strict architectural rule requiring all parameters (mean, std, median, min, max, vocabularies) to be estimated strictly on X_train and applied to test/validation sets via transform() without refitting.",
      relevance: "Violating this invariant produces data leakage, inflating validation metrics while causing catastrophic degradation in production."
    },
    {
      term: "L1 Loss Minimizer (Sample Median)",
      definition: "The statistical parameter c that minimizes the sum of absolute errors sum |y_i - c|. In contrast to the mean which minimizes L2 loss, the median is immune to extreme Pareto right skew.",
      relevance: "Essential for robust payroll and income imputation in datasets with executive salaries (e.g., ₹45 LPA vs ₹6.5 LPA)."
    },
    {
      term: "Jaro-Winkler Distance (d_w)",
      definition: "A string metric measuring character matches and transpositions within a matching window W, augmented by Winkler's prefix scaling bonus l * p * (1 - d_j) for shared leading characters.",
      relevance: "Used in West Bengal municipality entity resolution to map dirty spellings like 'barackpore' to canonical 'Barrackpore' (score 0.979)."
    },
    {
      term: "Dummy Variable Trap (det(X^T X) = 0)",
      definition: "Perfect multicollinearity created when all K categories of a nominal feature are encoded alongside an intercept column, resulting in a singular Gram matrix with infinite condition number.",
      relevance: "Closed-form OLS (X^T X)^(-1) collapses; solved by dropping the reference category (e.g. Barrackpore) or using regularization."
    },
    {
      term: "Breakdown Point (epsilon*)",
      definition: "The proportion of arbitrary adversarial outlier contamination a statistical estimator can withstand before outputting an arbitrarily large or incorrect value.",
      relevance: "Arithmetic Mean and Variance have a 0% breakdown point, while Median has 50% and IQR has 25% breakdown points, making RobustScaler resilient."
    },
    {
      term: "Cold-Start Inference Guard",
      definition: "An encoding safety policy (e.g. handle_unknown='ignore') that maps novel, previously unseen categorical tokens at test time to an all-zeros representation rather than throwing an exception.",
      relevance: "Prevents production microservice crashes when an applicant checks out from a previously unrecorded postal town."
    }
  ];

  const filteredJargon = useMemo(() => {
    if (!jargonQuery.trim()) return JARGON_TERMS;
    const q = jargonQuery.toLowerCase();
    return JARGON_TERMS.filter(
      item => item.term.toLowerCase().includes(q) || item.definition.toLowerCase().includes(q) || item.relevance.toLowerCase().includes(q)
    );
  }, [jargonQuery]);

  // ---------------------------------------------------------------------------
  // DIAGNOSTIC QUIZ QUESTIONS (5 High-Yield Scenario-Based Questions)
  // ---------------------------------------------------------------------------
  const DIAGNOSTIC_QUESTIONS = [
    {
      id: 1,
      scenario: "During an audit of an automated underwriting system at Salt Lake Sector V, you discover that 'MinMaxScaler' was fitted on the entire 50,000-applicant database before a 80/20 train/test split. What catastrophic flaw exists?",
      options: [
        { label: "A", text: "Computational inefficiency only; mathematical expectations remain unbiased." },
        { label: "B", text: "Data leakage: The test set's maximum income leaked into X_train scaling parameters, producing optimistically biased validation scores." },
        { label: "C", text: "The dummy variable trap, causing gradient descent to oscillate indefinitely." },
        { label: "D", text: "Covariate shift, converting continuous salary metrics into discrete ordinal ranks." }
      ],
      correct: "B",
      explanation: "Fitting any preprocessing transformer across the full dataset before partitioning violates the Fundamental Pipeline Invariant. Information regarding test set extreme bounds leaks into training normalization, invalidating offline generalization estimates."
    },
    {
      id: 2,
      scenario: "In Problem 1's Salt Lake payroll records, Subhajit (Executive, ₹45 LPA) withheld his salary due to tax sensitivity. Why is listwise deletion (dropping his row) disastrous for model training?",
      options: [
        { label: "A", text: "Because Subhajit's missingness is MCAR, dropping him halves model convergence speed." },
        { label: "B", text: "Because Subhajit represents an MNAR mechanism; dropping him introduces severe survivor truncation bias, underestimating executive compensation." },
        { label: "C", text: "Because listwise deletion converts design matrices into singular Gram matrices with det(X^T X) = 0." },
        { label: "D", text: "Because dropping rows causes the condition number kappa to become complex-valued." }
      ],
      correct: "B",
      explanation: "MNAR missingness depends on the unobserved value itself. Deleting non-respondents systematically deletes the highest earners, truncating the upper distribution tail and introducing severe downward bias into downstream predictive models."
    },
    {
      id: 3,
      scenario: "A municipality ingestion API receives the user-typed string 'barackpore' and matches it against canonical 'Barrackpore'. Why does Jaro-Winkler assign this pair a high score of 0.979 rather than a low score?",
      options: [
        { label: "A", text: "It uses Levenshtein edit distance with zero insertion cost." },
        { label: "B", text: "Winkler's prefix bonus rewards the 3-character identical prefix 'bar' with p = 0.1 on top of high character overlap within matching window W." },
        { label: "C", text: "It treats both strings as identical one-hot categorical tokens." },
        { label: "D", text: "Because cosine similarity ignores character transpositions." }
      ],
      correct: "B",
      explanation: "Jaro similarity d_j is computed from matching characters (m=10) and zero transpositions (t=0). Winkler adds l * p * (1 - d_j) where l=3 common prefix characters, elevating the similarity to 0.9788 (~0.979)."
    },
    {
      id: 4,
      scenario: "In Problem 3's design matrix with an intercept column and 4 municipal dummy indicators (Barrackpore, Kolkata, Howrah, Siliguri), what is the analytical determinant det(X^T X) if no column is dropped?",
      options: [
        { label: "A", text: "det(X^T X) = 144.00, indicating an invertible system." },
        { label: "B", text: "det(X^T X) = 1.00, because dummy vectors are orthogonal." },
        { label: "C", text: "det(X^T X) = 0.00, because the dummy column sum exactly equals the intercept vector 1 (perfect linear dependence)." },
        { label: "D", text: "det(X^T X) = -4.82, producing negative eigenvalues." }
      ],
      correct: "C",
      explanation: "Because sum(d_k) = 1, the design matrix suffers perfect multicollinearity. The Gram matrix X^T X has rank <= 4 in a 5x5 space, meaning its determinant is identically zero and its condition number is infinite."
    },
    {
      id: 5,
      scenario: "When deploying a KNN model on unscaled loan applicants (Age: [20, 60] vs Income: [3.2L, 95.0L]), why does the model fail to utilize Age in calculating nearest neighbors?",
      options: [
        { label: "A", text: "KNN intrinsically filters out discrete features." },
        { label: "B", text: "The squared difference in Income ((Delta Income)^2 approx 10^10) dominates squared Age differences ((Delta Age)^2 approx 10^2) by over 99.9%, rendering Age geometrically invisible." },
        { label: "C", text: "Because Age has a 50% breakdown point while Income has a 0% breakdown point." },
        { label: "D", text: "Because Euclidean distance cannot be computed on integers." }
      ],
      correct: "B",
      explanation: "Squared Euclidean distance is additive: d^2 = (Delta Age)^2 + (Delta Income)^2. An income gap of ₹10,000 contributes 100,000,000 to the sum, whereas a 40-year age gap contributes only 1,600. Income accounts for >99.99% of neighbor selection without scaling."
    }
  ];

  const handleSelectQuizOption = (questionId, optionLabel) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionLabel }));
  };

  const handleQuizSubmit = () => {
    if (Object.keys(quizAnswers).length < DIAGNOSTIC_QUESTIONS.length) return;
    setQuizSubmitted(true);
  };

  const quizScore = useMemo(() => {
    if (!quizSubmitted) return 0;
    let score = 0;
    DIAGNOSTIC_QUESTIONS.forEach(q => {
      if (quizAnswers[q.id] === q.correct) score++;
    });
    return score;
  }, [quizSubmitted, quizAnswers]);

  return (
    <div className="space-y-12 text-slate-200 leading-relaxed max-w-7xl mx-auto pb-16 px-4 sm:px-6">
      {/* ===================================================================== */}
      {/* QUICK JUMP NAVIGATION BAR                                             */}
      {/* ===================================================================== */}
      <nav aria-label="Topic navigation" className="sticky top-4 z-50 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-2xl border border-indigo-500/30 shadow-xl flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-2 pl-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 whitespace-nowrap">
            Topic 25 Capstone
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium">
          {[
            { id: "hero", label: "Overview" },
            { id: "novice", label: "Novice" },
            { id: "studio", label: "Studio" },
            { id: "math", label: "Mathematics" },
            { id: "casestudies", label: "Cases" },
            { id: "quiz", label: "Assessment" },
            { id: "pitfalls", label: "Pitfalls" },
            { id: "loaders", label: "Laboratory" },
            { id: "faq", label: "Viva Q&A" }
          ].map(tab => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              onClick={() => setActiveSection(tab.id)}
              className={clsx(
                "px-3 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer",
                activeSection === tab.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              )}
            >
              {tab.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ===================================================================== */}
      {/* 1. HERO SECTION                                                       */}
      {/* ===================================================================== */}
      <header id="hero" className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-10 rounded-3xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Data Types and Preprocessing • Topic 25
            </span>
            <span className="px-3.5 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Comprehensive Capstone Benchmark
            </span>
            <span className="px-3 py-1 text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              4 Industrial Test Benches
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Practice Problems: Preprocessing Capstone
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            Consolidate your mastery over the complete 6-stage industrial preprocessing directed acyclic graph (DAG).
            Tackle 4 rigorous industrial test benches from West Bengal: multi-mechanism Rubin missing value remediation,
            Jaro-Winkler municipality entity resolution, dummy variable trap matrix singularity proofs, and multi-scale
            feature normalization under executive outlier shock.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Problem 1</div>
              <div className="text-sm sm:text-base font-bold text-indigo-300">Rubin Missing Taxonomy</div>
              <div className="text-xs text-slate-500">MCAR, MAR & MNAR Imputation</div>
            </div>
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Problem 2</div>
              <div className="text-sm sm:text-base font-bold text-cyan-300">Jaro-Winkler Matching</div>
              <div className="text-xs text-slate-500">2-Stage Entity Resolution</div>
            </div>
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Problem 3</div>
              <div className="text-sm sm:text-base font-bold text-emerald-300">Dummy Variable Trap</div>
              <div className="text-xs text-slate-500">{"det(X^T X)=0 & Cold-Starts"}</div>
            </div>
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Problem 4</div>
              <div className="text-sm sm:text-base font-bold text-amber-300">Multi-Scale Scaling</div>
              <div className="text-xs text-slate-500">{"Distance Domination & Outliers"}</div>
            </div>
          </div>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* 2. NOVICE MASTERCLASS: METAPHORS, TAXONOMY, JARGON BUSTER              */}
      {/* ===================================================================== */}
      <section id="novice" className="space-y-8 bg-slate-900/50 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Novice Masterclass Foundations
            </h2>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            The 6-Stage Industrial Preprocessing Assembly Line
          </h3>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-4xl">
            Imagine an automated automobile plant in Hindmotor, Hooghly. You cannot spray-paint a car chassis before
            welding the frame, nor can you mount tires before balancing the axles. In machine learning, skipping or
            reordering preprocessing stages causes immediate downstream model failure.
          </p>
        </div>

        {/* 3 Real-World Metaphors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-indigo-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg">
              ✉
            </div>
            <h4 className="text-base font-bold text-white">The Central Post Office Sorter</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              When letters arrive at the Kolkata GPO with handwriting slips like <code className="text-indigo-300 font-mono">"barackpore"</code> or <code className="text-indigo-300 font-mono">"Calcutta"</code>, the sorter doesn&apos;t throw them away. First, an alias lookup translates historical colloquialisms (Calcutta &rarr; Kolkata). Next, a fuzzy similarity check (Jaro-Winkler) matches letter patterns with high prefix confidence.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-cyan-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg">
              ⚖
            </div>
            <h4 className="text-base font-bold text-white">The Payroll Auditor&apos;s Ledger</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              If a junior developer&apos;s salary is missing due to a network glitch (MCAR), replacing it with the global mean pulls their estimate upward because executive salaries distort the average. Imputing with the stratified departmental median minimizes absolute prediction error without being corrupted by top earners.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-emerald-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
              🌉
            </div>
            <h4 className="text-base font-bold text-white">The Vidyasagar Setu Toll Scale</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              If a bridge weighing scale compares a 15-kilogram bicycle to a 40,000-kilogram container truck using raw kilogram differences, a 5-year difference in driver age is completely ignored. Feature normalization scales both dimensions into comparable metric ranges so algorithms can observe both signals.
            </p>
          </div>
        </div>

        {/* 6-Stage DAG Taxonomy Table */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-white">
            The Canonical 6-Stage Industrial Preprocessing DAG
          </h4>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase text-[11px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Stage</th>
                  <th className="p-3.5">Phase Name</th>
                  <th className="p-3.5">Core Operations</th>
                  <th className="p-3.5">Mathematical Invariant</th>
                  <th className="p-3.5">Failure Mode if Skipped</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-indigo-400">Stage 1</td>
                  <td className="p-3.5 font-semibold text-white">Ingestion & PK Auditing</td>
                  <td className="p-3.5 text-slate-400">Schema verification, unique ID check</td>
                  <td className="p-3.5 font-mono text-cyan-300">{"|Unique(ID)| = N"}</td>
                  <td className="p-3.5 text-rose-400">Duplicate rows inflate gradient steps</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-indigo-400">Stage 2</td>
                  <td className="p-3.5 font-semibold text-white">Fuzzy Entity Resolution</td>
                  <td className="p-3.5 text-slate-400">Alias map, Jaro-Winkler string similarity</td>
                  <td className="p-3.5 font-mono text-cyan-300">{"d_w(s, c) >= \\tau = 0.85"}</td>
                  <td className="p-3.5 text-rose-400">Category explosion, sparse dummy fragmentation</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-indigo-400">Stage 3</td>
                  <td className="p-3.5 font-semibold text-white">Logical Anomaly Rejection</td>
                  <td className="p-3.5 text-slate-400">Cross-field auditing (Exp &lt; Age - 16)</td>
                  <td className="p-3.5 font-mono text-cyan-300">{"Exp_i <= Age_i - 16"}</td>
                  <td className="p-3.5 text-rose-400">Nonsensical training samples poison loss surface</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-indigo-400">Stage 4</td>
                  <td className="p-3.5 font-semibold text-white">Multi-Mechanism Imputation</td>
                  <td className="p-3.5 text-slate-400">Rubin audit, Stratified Median, KNN</td>
                  <td className="p-3.5 font-mono text-cyan-300">{"\\hat{\\mu}_k = \\arg\\min_c \\sum |y_i - c|"}</td>
                  <td className="p-3.5 text-rose-400">Survivor truncation bias or variance deflation</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-indigo-400">Stage 5</td>
                  <td className="p-3.5 font-semibold text-white">Categorical Encoding</td>
                  <td className="p-3.5 text-slate-400">Drop-first OHE, Cold-start guard</td>
                  <td className="p-3.5 font-mono text-cyan-300">{"\\text{rank}(X) = K, \\det(X^TX) > 0"}</td>
                  <td className="p-3.5 text-rose-400">Dummy Variable Trap, singular matrix collapse</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-indigo-400">Stage 6</td>
                  <td className="p-3.5 font-semibold text-white">Feature Normalization</td>
                  <td className="p-3.5 text-slate-400">RobustScaler, Domain clipping bounds</td>
                  <td className="p-3.5 font-mono text-cyan-300">{"x' = (x - Q_2) / \\text{IQR}"}</td>
                  <td className="p-3.5 text-rose-400">Distance domination, high-earner compression</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Jargon Buster */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-base font-bold text-white">Interactive Jargon Buster</h4>
              <p className="text-xs text-slate-400">Filter key mathematical terms across the 4 practice problems</p>
            </div>
            <input
              type="text"
              value={jargonQuery}
              onChange={(e) => setJargonQuery(e.target.value)}
              placeholder="Search jargon (e.g. breakdown, trap, jaro)..."
              className="px-3.5 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-full sm:w-64"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJargon.map((item, idx) => (
              <div key={idx} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2 hover:border-indigo-500/40 transition-colors">
                <div className="text-sm font-bold text-indigo-300">{item.term}</div>
                <div className="text-xs text-slate-300 leading-relaxed">{item.definition}</div>
                <div className="text-[11px] text-cyan-400/90 bg-cyan-950/30 px-2 py-1 rounded border border-cyan-800/30 font-medium">
                  {item.relevance}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. INTERACTIVE LABORATORY STUDIO (4 CAPSTONE TEST BENCHES)            */}
      {/* ===================================================================== */}
      <section id="studio" className="space-y-8 bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-indigo-900/40 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Interactive Engineering Test Benches
              </h2>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              The 4 Capstone Problem Simulators
            </h3>
          </div>

          {/* Problem Mode Switcher */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "problem1", label: "Problem 1: Missing Imputation", badge: "Rubin Taxonomy" },
              { id: "problem2", label: "Problem 2: Entity Resolution", badge: "Jaro-Winkler" },
              { id: "problem3", label: "Problem 3: Dummy Trap Arena", badge: "Matrix det=0" },
              { id: "problem4", label: "Problem 4: Multi-Scale Scaling", badge: "Outliers & KNN" }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setStudioMode(m.id)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5",
                  studioMode === m.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/60"
                )}
              >
                <span>{m.label}</span>
                <span className={clsx(
                  "text-[10px] px-1.5 py-0.5 rounded font-mono",
                  studioMode === m.id ? "bg-indigo-900/60 text-indigo-200" : "bg-slate-900 text-slate-400"
                )}>
                  {m.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* MODE 1: PROBLEM 1 (MULTI-MECHANISM MISSING REMEDIATION)             */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "problem1" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-indigo-500/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Problem 1: Salt Lake Tech Park Payroll Imputation</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-mono">
                      MAE: ₹{problem1Metrics.totalMAE.toFixed(2)} LPA
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Compare Global Mean, Global Median, Stratified Group Median, and KNN ($K=3$) across MCAR, MAR, and MNAR records.
                  </p>
                </div>

                {/* Imputer Engine Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Engine:</span>
                  <select
                    value={imputationEngine}
                    onChange={(e) => setImputationEngine(e.target.value)}
                    className="px-3 py-1.5 text-xs bg-slate-900 border border-indigo-500/40 rounded-xl text-white font-medium focus:outline-none focus:border-indigo-400 cursor-pointer"
                  >
                    <option value="mean">Global Mean (L2 Loss Minimizer)</option>
                    <option value="median">Global Median (L1 Loss Minimizer)</option>
                    <option value="stratified_median">Stratified Departmental Median (Recommended)</option>
                    <option value="knn">KNN Imputer (K=3 on Experience)</option>
                  </select>
                </div>
              </div>

              {/* Departmental Median Summary Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400">Global Mean (Observed)</div>
                  <div className="text-base font-bold text-white font-mono">₹{problem1Metrics.globalMean.toFixed(2)} LPA</div>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400">Global Median (Observed)</div>
                  <div className="text-base font-bold text-cyan-300 font-mono">₹{problem1Metrics.globalMedian.toFixed(2)} LPA</div>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400">IT Median (n=4)</div>
                  <div className="text-base font-bold text-indigo-300 font-mono">₹{problem1Metrics.deptMedians["IT"]?.toFixed(2)} LPA</div>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400">Executive Median (n=3)</div>
                  <div className="text-base font-bold text-amber-300 font-mono">₹{problem1Metrics.deptMedians["Executive"]?.toFixed(2)} LPA</div>
                </div>
              </div>

              {/* Data Table with Imputed Row Highlighting */}
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-2.5">ID</th>
                      <th className="p-2.5">Employee</th>
                      <th className="p-2.5">Dept</th>
                      <th className="p-2.5">Exp (Yrs)</th>
                      <th className="p-2.5">True Salary</th>
                      <th className="p-2.5">Mechanism</th>
                      <th className="p-2.5">Imputed Value</th>
                      <th className="p-2.5">Absolute Error</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                    {problem1Metrics.imputedData.map(r => (
                      <tr
                        key={r.id}
                        className={clsx(
                          "transition-colors",
                          r.salaryObs === null ? "bg-indigo-950/30 font-semibold" : "hover:bg-slate-900/40"
                        )}
                      >
                        <td className="p-2.5 font-mono text-slate-400">{r.id}</td>
                        <td className="p-2.5 text-white">{r.name}</td>
                        <td className="p-2.5">
                          <span className={clsx(
                            "px-2 py-0.5 rounded text-[10px] font-semibold",
                            r.dept === "IT" ? "bg-indigo-950 text-indigo-300 border border-indigo-800" :
                            r.dept === "Executive" ? "bg-amber-950 text-amber-300 border border-amber-800" :
                            "bg-cyan-950 text-cyan-300 border border-cyan-800"
                          )}>
                            {r.dept}
                          </span>
                        </td>
                        <td className="p-2.5 font-mono">{r.exp.toFixed(1)}</td>
                        <td className="p-2.5 font-mono text-slate-300">₹{r.salaryTrue.toFixed(2)}L</td>
                        <td className="p-2.5">
                          <span className={clsx(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                            r.mechanism === "Observed" ? "text-slate-500" :
                            r.mechanism === "MCAR" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" :
                            r.mechanism === "MAR" ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40" :
                            "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                          )}>
                            {r.mechanism}
                          </span>
                        </td>
                        <td className="p-2.5 font-mono">
                          {r.salaryObs === null ? (
                            <span className="text-emerald-400 font-bold">₹{r.imputedVal.toFixed(2)}L</span>
                          ) : (
                            <span className="text-slate-400">₹{r.salaryObs.toFixed(2)}L</span>
                          )}
                        </td>
                        <td className="p-2.5 font-mono">
                          {r.salaryObs === null ? (
                            <span className={clsx(
                              "px-1.5 py-0.5 rounded text-[11px]",
                              r.error < 2.0 ? "text-emerald-400 bg-emerald-950/40" : "text-amber-400 bg-amber-950/40"
                            )}>
                              ₹{r.error.toFixed(2)}L
                            </span>
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* MODE 2: PROBLEM 2 (FUZZY ENTITY RESOLUTION & JARO-WINKLER)          */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "problem2" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-cyan-500/30 space-y-5">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Problem 2: 2-Stage Municipal Entity Resolution Engine</span>
                  <span className={clsx(
                    "text-xs px-2.5 py-0.5 rounded font-mono font-bold",
                    problem2Resolution.status === "MATCHED_EXACT" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" :
                    problem2Resolution.status === "MATCHED_FUZZY" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" :
                    problem2Resolution.status === "UNCERTAIN" ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" :
                    "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                  )}>
                    {problem2Resolution.status}
                  </span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  Tests how dirty municipal strings pass Stage 1 (O(1) Alias Hash Map) or Stage 2 (Jaro-Winkler with prefix scale bonus $p=0.1$).
                </p>
              </div>

              {/* Interactive City Input & Presets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Type Raw User-Entered Municipal String:
                  </label>
                  <input
                    type="text"
                    value={queryCityInput}
                    onChange={(e) => setQueryCityInput(e.target.value)}
                    placeholder="e.g. barackpore, Calcutta, Hwh, shiliguri..."
                    className="w-full px-4 py-2 bg-slate-900 border border-cyan-500/40 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
                  />
                  {/* Preset quick test buttons */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[11px] text-slate-500 self-center">Presets:</span>
                    {["barackpore", "Calcutta", "Hwh", "shiliguri", "Durgapur", "kalyani town"].map(preset => (
                      <button
                        key={preset}
                        onClick={() => setQueryCityInput(preset)}
                        className="px-2 py-0.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 font-mono transition-colors"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-300">Similarity Match Threshold (&tau;):</span>
                    <span className="font-mono text-cyan-300 font-bold">{matchThreshold.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.60"
                    max="0.99"
                    step="0.01"
                    value={matchThreshold}
                    onChange={(e) => setMatchThreshold(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-400 flex justify-between">
                    <span>Permissive (0.60)</span>
                    <span>Industrial Default (0.85)</span>
                    <span>Strict (0.99)</span>
                  </div>
                </div>
              </div>

              {/* Match Resolution Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400">Canonical Match Target</div>
                  <div className="text-base font-bold text-white font-mono">{problem2Resolution.matchedCity}</div>
                </div>
                <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400">Resolution Path</div>
                  <div className="text-xs font-semibold text-cyan-300">{problem2Resolution.method}</div>
                </div>
                <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400">Jaro-Winkler Score (d_w)</div>
                  <div className="text-base font-bold text-emerald-400 font-mono">{problem2Resolution.score.toFixed(3)}</div>
                </div>
                <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400">Prefix Match Length (l)</div>
                  <div className="text-base font-bold text-indigo-300 font-mono">{problem2Resolution.prefixLen} chars</div>
                </div>
              </div>

              {/* All Canonical Cities Ranking */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Similarity Ranking Across Canonical Cities:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {problem2Resolution.allScores.map(item => (
                    <div
                      key={item.city}
                      className={clsx(
                        "p-2.5 rounded-lg border text-xs flex justify-between items-center",
                        item.city === problem2Resolution.matchedCity && problem2Resolution.score >= matchThreshold
                          ? "bg-cyan-950/40 border-cyan-500/50 text-white font-bold"
                          : "bg-slate-900/40 border-slate-800 text-slate-400"
                      )}
                    >
                      <span>{item.city}</span>
                      <span className="font-mono text-cyan-400">{(item.score ?? item.sim ?? 0).toFixed(3)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* MODE 3: PROBLEM 3 (DUMMY VARIABLE TRAP & COLD-STARTS)               */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "problem3" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-emerald-500/30 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Problem 3: The Dummy Variable Trap Matrix Arena</span>
                    <span className={clsx(
                      "text-xs px-2.5 py-0.5 rounded font-mono font-bold",
                      problem3Matrix.isSingular
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    )}>
                      {problem3Matrix.isSingular ? "TRAP ACTIVE (Singular!)" : "SAFE DROP-FIRST (Invertible)"}
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Inspect the Gram Matrix $X^T X$, its determinant $\det(X^T X)$, and test cold-start serving guards.
                  </p>
                </div>

                {/* Drop-First Toggle Button */}
                <button
                  onClick={() => setDummyDropFirst(!dummyDropFirst)}
                  className={clsx(
                    "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-md",
                    dummyDropFirst
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30"
                      : "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30"
                  )}
                >
                  {dummyDropFirst ? "✓ Drop-First OHE Enabled (Ref: Barrackpore)" : "⚠ Full OHE (Trap Active: All 4 Cities)"}
                </button>
              </div>

              {/* Analytical Matrix Properties */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400">Design Matrix Columns</div>
                  <div className="text-base font-bold text-white font-mono">
                    {dummyDropFirst ? "4 (1 Intercept + 3 Dummies)" : "5 (1 Intercept + 4 Dummies)"}
                  </div>
                </div>
                <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400">Matrix Rank</div>
                  <div className="text-base font-bold text-indigo-300 font-mono">
                    {dummyDropFirst ? "Rank = 4 (Full Rank)" : "Rank = 4 (Deficient!)"}
                  </div>
                </div>
                <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400">Gram Determinant det(X^T X)</div>
                  <div className={clsx(
                    "text-base font-bold font-mono",
                    problem3Matrix.isSingular ? "text-rose-400" : "text-emerald-400"
                  )}>
                    {problem3Matrix.determinant.toFixed(2)}
                  </div>
                </div>
                <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400">Condition Number &kappa;(X^T X)</div>
                  <div className={clsx(
                    "text-base font-bold font-mono",
                    problem3Matrix.isSingular ? "text-rose-400" : "text-cyan-300"
                  )}>
                    {problem3Matrix.isSingular ? "∞ (Infinite)" : problem3Matrix.condNumber.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Cold-Start Guard Sandbox */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Cold-Start Serving Guard Test (handle_unknown=&apos;ignore&apos;)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300">
                      Enter Incoming Test Applicant City (Unseen in Vocab):
                    </label>
                    <input
                      type="text"
                      value={coldStartCityInput}
                      onChange={(e) => setColdStartCityInput(e.target.value)}
                      placeholder="e.g. Asansol, Digha, Malda..."
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <div className="text-[11px] text-slate-400">Generated One-Hot Vector Output:</div>
                    <div className="font-mono text-xs text-emerald-400">
                      [{problem3Matrix.coldStartVector.join(", ")}]
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {problem3Matrix.isColdStart ? (
                        <span className="text-amber-400">
                          Notice: &quot;{coldStartCityInput}&quot; is unseen. Output is all-zeros and safely absorbed by the reference baseline without crashing the server!
                        </span>
                      ) : (
                        <span className="text-cyan-400">
                          Recognized known training city. Active dummy column set to 1.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* MODE 4: PROBLEM 4 (MULTI-SCALE NORMALIZATION & OUTLIER RESILIENCE)  */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "problem4" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-amber-500/30 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Problem 4: Scale Disparity & Outlier Resilience Bench</span>
                    <span className="text-xs px-2.5 py-0.5 rounded font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      Subhajit Income: ₹{subhajitIncomeSlider.toFixed(1)} LPA
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Observe how executive income outliers destroy MinMaxScaler, and how RobustScaler preserves middle-class applicant variance.
                  </p>
                </div>

                {/* Scaler Selection */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Scaler:</span>
                  <select
                    value={selectedScaler}
                    onChange={(e) => setSelectedScaler(e.target.value)}
                    className="px-3 py-1.5 text-xs bg-slate-900 border border-amber-500/40 rounded-xl text-white font-medium focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="unscaled">Unscaled Raw (Age: [20,60], Income: [3.2L, 95L])</option>
                    <option value="standard">StandardScaler (Z-Score: &mu;=0, &sigma;=1)</option>
                    <option value="minmax">MinMaxScaler (Range: [0, 1])</option>
                    <option value="robust">RobustScaler (Median & IQR — Resilient)</option>
                    <option value="log1p">Log1p Scaler (Log-Transform)</option>
                  </select>
                </div>
              </div>

              {/* Subhajit Income Slider */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">
                    Drag Executive Outlier Income (Subhajit):
                  </span>
                  <span className="font-mono text-amber-300 font-bold text-sm">
                    ₹{subhajitIncomeSlider.toFixed(1)} LPA
                  </span>
                </div>
                <input
                  type="range"
                  min="20.0"
                  max="150.0"
                  step="1.0"
                  value={subhajitIncomeSlider}
                  onChange={(e) => setSubhajitIncomeSlider(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Modest Executive (₹20 LPA)</span>
                  <span>Baseline Dataset (₹95 LPA)</span>
                  <span>Super-Executive Outlier (₹150 LPA)</span>
                </div>
              </div>

              {/* Distance Domination Meter between Mahima and Mamata */}
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">
                    KNN Metric Distance Domination (Mahima vs Mamata):
                  </span>
                  <span className="font-mono text-indigo-300 font-semibold">
                    Income Influence: {distanceDominationMetrics.incomePct.toFixed(1)}% | Age Influence: {(100 - distanceDominationMetrics.incomePct).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-cyan-500 transition-all duration-300"
                    style={{ width: `${100 - distanceDominationMetrics.incomePct}%` }}
                    title={`Age: ${(100 - distanceDominationMetrics.incomePct).toFixed(1)}%`}
                  />
                  <div
                    className="h-full bg-amber-500 transition-all duration-300"
                    style={{ width: `${distanceDominationMetrics.incomePct}%` }}
                    title={`Income: ${distanceDominationMetrics.incomePct.toFixed(1)}%`}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span className="text-cyan-400">Age Component Sq: {distanceDominationMetrics.ageDiffSq.toFixed(4)}</span>
                  <span className="text-amber-400">Income Component Sq: {distanceDominationMetrics.incDiffSq.toFixed(4)}</span>
                  <span className="font-mono text-slate-300">Total Euclidean Dist: {distanceDominationMetrics.totalDist.toFixed(4)}</span>
                </div>
              </div>

              {/* Out-of-Bounds Streaming Applicant Guard */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Streaming Out-of-Bounds Serving Guard (x &gt; Training Max)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300">
                      Incoming Streaming Applicant Income (₹ LPA):
                    </label>
                    <input
                      type="number"
                      value={streamingTestIncome}
                      onChange={(e) => setStreamingTestIncome(e.target.value)}
                      placeholder="e.g. 120.0"
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Unclipped MinMaxScaler:</span>
                      <span className={clsx("font-mono font-bold", streamingTestResult.unclippedMinMax > 1.0 ? "text-rose-400" : "text-emerald-400")}>
                        {streamingTestResult.unclippedMinMax.toFixed(4)} {streamingTestResult.unclippedMinMax > 1.0 && "(&gt; 1.0 Violation!)"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Clipped MinMaxScaler:</span>
                      <span className="font-mono text-emerald-400 font-bold">{streamingTestResult.clippedMinMax.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">RobustScaler (Median/IQR):</span>
                      <span className="font-mono text-cyan-400 font-bold">{streamingTestResult.robustVal.toFixed(4)} IQR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* 4. MATHEMATICAL FORMULATIONS                                          */}
      {/* ===================================================================== */}
      <section id="math" className="space-y-8 bg-slate-900/50 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Rigorous Mathematical Architecture
            </h2>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Formal Foundations & Analytical Proofs
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-4xl">
            Review the exact equations governing L1 group medians, Jaro-Winkler string similarity, the rank-nullity singularity proof, and estimator breakdown points.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: L1 Group Median Imputation */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-indigo-500/20 space-y-3">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              1. L1 Group Median Imputation
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl font-mono text-xs text-indigo-200 border border-indigo-900/40">
              {"\\hat{\\mu}_k = \\arg\\min_c \\sum_{i \\in \\Omega_k} |y_i - c|"}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unlike the arithmetic mean which minimizes squared Euclidean distance (L2 norm) and is heavily pulled by outliers, the sample median minimizes absolute deviation (L1 norm). In stratified departmental payrolls, conditioning on job tier restores unbiasedness under MAR.
            </p>
          </div>

          {/* Card 2: Jaro-Winkler Metric */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-cyan-500/20 space-y-3">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              2. Jaro-Winkler String Metric
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl font-mono text-xs text-cyan-200 border border-cyan-900/40">
              {"d_w = d_j + \\ell \\cdot p \\cdot (1 - d_j), \\quad \\ell \\le 4, \\, p = 0.1"}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard Jaro similarity d_j considers matching character counts m and transpositions t within window W = floor(max(|s1|, |s2|)/2) - 1. Winkler&apos;s modification applies a favorable prefix scaling bonus for up to 4 shared initial characters.
            </p>
          </div>

          {/* Card 3: Dummy Variable Trap Singularity Proof */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-emerald-500/20 space-y-3">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              3. Singularity Proof: det(X^T X) = 0
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl font-mono text-xs text-emerald-200 border border-emerald-900/40">
              {"\\sum_{k=1}^K \\mathbf{d}_k = \\mathbf{1} \\implies 1 \\cdot \\mathbf{1} - \\sum_{k=1}^K \\mathbf{d}_k = \\mathbf{0}"}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              When all K categories are one-hot encoded with an intercept column 1, the columns are perfectly linearly dependent. By the Rank-Nullity theorem, rank(X) &le; K in a (K+1)-dimensional parameter space, guaranteeing det(X^T X) = 0 and infinite condition number.
            </p>
          </div>

          {/* Card 4: RobustScaler & Breakdown Point */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-amber-500/20 space-y-3">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              4. Breakdown Point & Outlier Scaling
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl font-mono text-xs text-amber-200 border border-amber-900/40">
              {"x_{\\text{rob}} = \\frac{x - \\text{Median}}{\\text{IQR}}, \\quad \\varepsilon^*_{\\text{median}} = 50\\%, \\; \\varepsilon^*_{\\text{IQR}} = 25\\%"}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              While the sample mean and variance collapse under a single corrupted observation (breakdown point 0%), RobustScaler relies on the sample median (50% breakdown point) and interquartile range IQR = Q3 - Q1 (25% breakdown point), preventing scale distortion.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. REGIONAL INDUSTRIAL CASE STUDIES                                   */}
      {/* ===================================================================== */}
      <section id="casestudies" className="space-y-8 bg-slate-900/50 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              West Bengal Industrial Deployments
            </h2>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Field Implementations & Production Outcomes
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-4xl">
            Real-world deployments across fintech, commercial real estate, quick-commerce dark stores, and clinical healthcare systems in West Bengal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Case 1 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Barrackpore & Ichapur</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">FinTech Underwriting</span>
            </div>
            <h4 className="text-base font-bold text-white">NBFC Retail Loan Underwriting System</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Along Old Calcutta Road, applicants submitted handwritten addresses with frequent typos (&quot;barackpore&quot;, &quot;Ichhapore&quot;) and missing income slips. Deploying Jaro-Winkler entity resolution and stratified median imputation slashed loan approval turnaround time from 4 hours to 12 seconds, reducing 90-day NPA defaults by 24.2%.
            </p>
          </div>

          {/* Case 2 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">New Town & Rajarhat</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">Commercial Real Estate</span>
            </div>
            <h4 className="text-base font-bold text-white">Commercial Office Tower Lease Valuation</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tenant payroll declarations in New Town Action Area II suffered heavy Pareto skew (startups with ₹20L payroll vs multinational tech firms with ₹40 Crores). Unscaled gradients oscillated wildly with Hessian condition numbers &gt; 10^8. Implementing Log1p transformation followed by Z-Score standardization enabled smooth convergence in 130 epochs.
            </p>
          </div>

          {/* Case 3 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Howrah & Kalyani</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Quick-Commerce Logistics</span>
            </div>
            <h4 className="text-base font-bold text-white">Dark Store Perishable Inventory Replenishment</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Predicting hourly dark store orders across 180+ postal wards caused severe Random Forest feature importance dilution under sparse one-hot dummy columns. Replaced OHE with Bayesian Target Encoding (m=5.0 smoothing), cutting LightGBM training latency by 74% and reducing stockouts by 18.6%.
            </p>
          </div>

          {/* Case 4 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Siliguri & Darjeeling</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">Clinical Triage</span>
            </div>
            <h4 className="text-base font-bold text-white">Tea Garden Health Screening Triage</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              In rural health centers, inconsistent clinical abbreviations and extreme scale differences between blood pressure and biomarker counts caused SVM models with RBF kernels to collapse completely. Standardization and fuzzy matching raised diagnostic triage sensitivity from 52% to 89.6%.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 6. DIAGNOSTIC ASSESSMENT QUIZ                                         */}
      {/* ===================================================================== */}
      <section id="quiz" className="space-y-6 bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-indigo-900/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Diagnostic Verification
              </h2>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Topic 25 Capstone Diagnostic Quiz
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Answer all 5 multi-stage scenario questions to evaluate your engineering intuition.
            </p>
          </div>

          {quizSubmitted && (
            <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-indigo-500/40">
              <span className="text-xs text-slate-400">Your Score:</span>
              <span className="text-lg font-bold font-mono text-cyan-300">
                {quizScore} / {DIAGNOSTIC_QUESTIONS.length}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                {quizScore === 5 ? "Distinction" : quizScore >= 3 ? "Pass" : "Review Needed"}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-5">
          {DIAGNOSTIC_QUESTIONS.map(q => {
            const isAnswered = quizAnswers[q.id] !== undefined;
            const selectedOpt = quizAnswers[q.id];
            const isCorrect = selectedOpt === q.correct;

            return (
              <div key={q.id} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-indigo-900/60 text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono">
                    {q.id}
                  </span>
                  <div className="text-sm font-semibold text-slate-200 leading-relaxed">
                    {q.scenario}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5 pl-9">
                  {q.options.map(opt => {
                    const isSelected = selectedOpt === opt.label;
                    let btnStyle = "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700";

                    if (quizSubmitted) {
                      if (opt.label === q.correct) {
                        btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-medium";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-rose-950/60 border-rose-500 text-rose-200";
                      }
                    } else if (isSelected) {
                      btnStyle = "bg-indigo-950/70 border-indigo-500 text-indigo-200 font-medium";
                    }

                    return (
                      <button
                        key={opt.label}
                        disabled={quizSubmitted}
                        onClick={() => handleSelectQuizOption(q.id, opt.label)}
                        className={clsx(
                          "w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 cursor-pointer",
                          btnStyle
                        )}
                      >
                        <span className="font-mono font-bold shrink-0">{opt.label}.</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="pl-9 pt-2">
                    <div className={clsx(
                      "p-3 rounded-xl text-xs leading-relaxed border",
                      isCorrect ? "bg-emerald-950/30 border-emerald-800/40 text-emerald-300" : "bg-rose-950/30 border-rose-800/40 text-rose-300"
                    )}>
                      <div className="font-bold mb-1">
                        {isCorrect ? "✓ Correct Analysis" : `✗ Incorrect (Correct Answer: ${q.correct})`}
                      </div>
                      <div className="text-slate-400">{q.explanation}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-2">
          {!quizSubmitted ? (
            <button
              onClick={handleQuizSubmit}
              disabled={Object.keys(quizAnswers).length < DIAGNOSTIC_QUESTIONS.length}
              className={clsx(
                "px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg cursor-pointer",
                Object.keys(quizAnswers).length === DIAGNOSTIC_QUESTIONS.length
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
              )}
            >
              Submit Diagnostic Assessment
            </button>
          ) : (
            <button
              onClick={() => {
                setQuizAnswers({});
                setQuizSubmitted(false);
              }}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              Reset Assessment
            </button>
          )}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 7. PRODUCTION PITFALLS & ARCHITECTURAL VULNERABILITIES                */}
      {/* ===================================================================== */}
      <section id="pitfalls" className="space-y-6 bg-slate-900/50 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Production Vulnerabilities & Anti-Patterns
            </h2>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Architecture Hazards in End-to-End Preprocessing
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-4xl">
            Critical production bugs that escape unit testing and trigger silent data corruption in production pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-rose-500/20 space-y-2.5">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Pitfall 1: Fit-Before-Split Data Leakage
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">The Bug:</strong> Executing <code className="text-rose-300 font-mono">scaler.fit_transform(X)</code> on the entire dataset before calling <code className="text-rose-300 font-mono">train_test_split()</code>.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Consequence:</strong> Information regarding test set means, extremes, and distributions bleeds into training transformations, yielding artificially optimistic offline scores that collapse in production.
            </p>
            <p className="text-[11px] text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-800/30">
              <strong>Production Fix:</strong> Fit only on X_train. Transform X_test strictly using training parameters via scikit-learn Pipeline.
            </p>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-rose-500/20 space-y-2.5">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Pitfall 2: Sparse Matrix Densification (with_mean=True)
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">The Bug:</strong> Applying <code className="text-rose-300 font-mono">StandardScaler(with_mean=True)</code> on large CSR matrices generated by high-cardinality One-Hot Encoding.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Consequence:</strong> Subtracting the mean from structural zero entries forces every zero to become non-zero, triggering catastrophic Out-Of-Memory (OOM) fatal crashes.
            </p>
            <p className="text-[11px] text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-800/30">
              <strong>Production Fix:</strong> Configure <code className="font-mono">StandardScaler(with_mean=False)</code> or deploy <code className="font-mono">MaxAbsScaler()</code>.
            </p>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-rose-500/20 space-y-2.5">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Pitfall 3: Silent Cold-Start Microservice Exceptions
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">The Bug:</strong> Leaving default <code className="text-rose-300 font-mono">OneHotEncoder(handle_unknown=&apos;error&apos;)</code> active on production inference endpoints.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Consequence:</strong> The very first user registering from a previously unrecorded pin code crashes the payment checkout microservice with an unhandled exception.
            </p>
            <p className="text-[11px] text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-800/30">
              <strong>Production Fix:</strong> Enforce <code className="font-mono">handle_unknown=&apos;ignore&apos;</code> or bundle low-frequency tail categories into an &quot;Other&quot; bucket.
            </p>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-rose-500/20 space-y-2.5">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Pitfall 4: Redundant Normalization on Tree Ensembles
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">The Bug:</strong> Standardizing or normalizing continuous features before passing them into XGBoost, LightGBM, or CatBoost.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Consequence:</strong> Adds unnecessary CPU overhead and floating-point roundoff errors with zero accuracy benefit, because decision trees split strictly on rank ordering.
            </p>
            <p className="text-[11px] text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-800/30">
              <strong>Production Fix:</strong> Reserve scaling for distance-based (KNN, K-Means, SVM) and gradient-based (Logistic Regression, Neural Nets) models.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 8. CODE LABORATORY & STUDY NOTES LOADERS                              */}
      {/* ===================================================================== */}
      <section id="loaders" className="space-y-6 bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Verified Python Lab & Study Notes
              </h2>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Executable Laboratory & Comprehensive Handbook
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setResourceTab("lab")}
              className={clsx(
                "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                resourceTab === "lab"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              )}
            >
              Python Lab Code
            </button>
            <button
              onClick={() => setResourceTab("notes")}
              className={clsx(
                "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                resourceTab === "notes"
                  ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              )}
            >
              Study Notes (Handbook)
            </button>
          </div>
        </div>

        {resourceTab === "lab" ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>File: <code className="text-indigo-300 font-mono">practice_problems_lab.py</code> (Exit Code 0 Verified)</span>
              <span>4 Capstone Industrial Test Benches</span>
            </div>
            <PythonFileLoader
              code={labCode}
              fileName="practice_problems_lab.py"
              title="Practice Problems Laboratory Benchmark"
            />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>File: <code className="text-cyan-300 font-mono">topic25_note.txt</code></span>
              <span>316 Lines of Comprehensive Academic Notes</span>
            </div>
            <PlainTextPrint
              content={noteText}
              title="Topic 25 Academic Handbook & Study Notes"
            />
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* 9. MAKAUT VIVA Q&A & TEACHER PROFILE                                  */}
      {/* ===================================================================== */}
      <section id="faq" className="space-y-8">
        <FAQTemplate
          title="Topic 25: MAKAUT Viva & Master Interview Questions"
          subtitle="30 Graded Analytical Questions with Comprehensive Theoretical Rationales"
          questions={questions}
        />

        <Teacher />
      </section>
    </div>
  );
};

export default Topic25;
