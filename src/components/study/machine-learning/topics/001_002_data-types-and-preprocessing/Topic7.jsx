import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic7_files/data_cleaning_lab.py?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions.js";

// =============================================================================
// SYNTHETIC RAW & CLEANED DATASETS FOR INTERACTIVE STUDIO
// =============================================================================

const INITIAL_RAW_CITIZENS = [
  { id: "KMC-001", name: "Sukanta Hui", ward: 12, locality: "  Barrackpore  ", age: 42, exp: 18, tax: 14500.0, status: "Paid", phone: "+91-9432456083", hasSentinel: false, isDupe: false, hasLogicErr: false },
  { id: "KMC-002", name: "S. Hui", ward: 12, locality: "barrackpore", age: 42, exp: 18, tax: 14500.0, status: "PAID", phone: "9432456083", hasSentinel: false, isDupe: true, hasLogicErr: false },
  { id: "KMC-003", name: "Anirban Banerjee", ward: "WARD-08", locality: "Salt Lake Sector V", age: -999, exp: 7, tax: 28400.0, status: "Pending", phone: "9830112233", hasSentinel: true, isDupe: false, hasLogicErr: false },
  { id: "KMC-004", name: "Debjani Chakraborty", ward: 45, locality: "Calcutta", age: 9, exp: 15, tax: -500.0, status: "N/A", phone: "Unknown", hasSentinel: true, isDupe: false, hasLogicErr: true },
  { id: "KMC-005", name: "Anirban Banerjee", ward: 8, locality: "Salt Lake Sector V", age: 34, exp: 7, tax: 28400.0, status: "Pending", phone: "9830112233", hasSentinel: false, isDupe: true, hasLogicErr: false },
  { id: "KMC-006", name: "Subhasis Roy", ward: 62, locality: "Howrah", age: 55, exp: 25, tax: 999999.0, status: "Overdue", phone: "+91-9874561230", hasSentinel: true, isDupe: false, hasLogicErr: true },
  { id: "KMC-007", name: "Priyanka Sen", ward: 19, locality: "Bidhannagar", age: 29, exp: 4, tax: 12000.0, status: "Paid", phone: "+91-9123456789", hasSentinel: false, isDupe: false, hasLogicErr: false },
];

const JARGON_TERMS = [
  { term: "Data Scrubbing (Cleansing)", tag: "Core Concept", desc: "The computational detection, diagnosis, and removal of corrupt, inaccurate, incomplete, duplicated, or improperly formatted records." },
  { term: "Hidden Sentinel Value", tag: "Defect Type", desc: "A valid constant (e.g. -999, 9999, 'N/A') used by legacy databases to represent missing data that bypasses standard null checks." },
  { term: "Exact Deduplication", tag: "Deduplication", desc: "Evicting rows that match 100% byte-for-byte across primary keys, hashes, or contact identifiers." },
  { term: "Fuzzy Deduplication", tag: "Entity Resolution", desc: "Identifying and resolving records representing the identical physical entity using edit distance thresholds (e.g. 'S. Hui' vs 'Sukanta Hui')." },
  { term: "Levenshtein Edit Distance", tag: "String Metric", desc: "The minimum single-character insertions, deletions, and substitutions required to transform string s1 into string s2." },
  { term: "Jaro-Winkler Similarity", tag: "String Metric", desc: "A character-based distance metric that gives higher similarity weight to shared initial prefixes, optimal for human names." },
  { term: "Attenuation Bias", tag: "Statistical Hazard", desc: "When input features contain random measurement noise, estimated regression slopes beta_hat are systematically shrunk toward zero." },
  { term: "Listwise Deletion", tag: "Cleaning Method", desc: "Discarding every observation with at least one missing attribute (e.g. df.dropna()), often causing severe sample loss and bias." },
  { term: "Survivorship Bias", tag: "Statistical Hazard", desc: "When dropping dirty or missing records selectively discards vulnerable or high-risk populations, skewing training distributions." },
  { term: "Canonicalization", tag: "Standardization", desc: "Mapping multiple synonymous surface variants (e.g., 'Calcutta', 'kol', 'Kolkata') to a single standardized ground-truth dictionary key." },
  { term: "Cross-Field Constraint", tag: "Integrity Rule", desc: "Logical validation asserting that interdependent columns do not contradict physical reality (e.g., Experience <= Age - 16)." },
  { term: "Audit Trail (Lineage)", tag: "Governance", desc: "An immutable log recording every cell modification, original value, corrected value, and triggered business rule." },
];

const PRESET_FUZZY_PAIRS = [
  { s1: "Sukanta Hui", s2: "S. Hui", domain: "Citizen Name" },
  { s1: "Ballygunge Circular Road", s2: "Ballygunge Cir Rd", domain: "Street Address" },
  { s1: "Debjani Chakraborty", s2: "D. Chakraborti", domain: "Citizen Name" },
  { s1: "Salt Lake Sector V", s2: "SaltLake Sec 5", domain: "Locality" },
  { s1: "Barrackpore Municipality", s2: "Bkp Muncipality", domain: "Civic Body" },
];

const DIAGNOSTIC_QUIZ_QUESTIONS = [
  {
    id: 1,
    scenario: "A data scientist inspecting patient records from North 24 Parganas District Hospital notices that `patient_age.isna().sum()` returns 0. However, calculating `patient_age.mean()` gives 14.2 years, despite all patients being adults. What data defect caused this?",
    options: [
      { id: "A", text: "The dataset was normalized with MinMax scaler prior to cleaning." },
      { id: "B", text: "The legacy system recorded missing ages with sentinel value -999, which Python treated as a valid number, skewing the mean." },
      { id: "C", text: "The dataset contains duplicate records with identical positive ages." },
      { id: "D", text: "The column was encoded using ordinal integers instead of one-hot vectors." }
    ],
    correct: "B",
    explanation: "Legacy databases frequently insert sentinel numbers (-999, 9999) instead of explicit null pointers. Python reads -999 as a real integer, so `isna()` returns False, while the arithmetic mean drops drastically due to the large negative numbers.",
    mentorTip: "Sukanta Hui says: Always inspect minimum and maximum values (`df.describe()`)! If you see -999, 9999, or -1 in positive physical quantities, you've found hidden sentinels."
  },
  {
    id: 2,
    scenario: "An analyst working on Kolkata citizen survey data executes `df.dropna()` on a 10,000-row dataset with 45 columns. Only 1,850 rows remain. Why did this happen?",
    options: [
      { id: "A", text: "The dropna function automatically drops columns rather than rows." },
      { id: "B", text: "Listwise deletion discards every row with even one missing value; multiple columns with small independent missingness collectively wiped out 81.5% of the data." },
      { id: "C", text: "The data contained infinite float values which caused a memory overflow." },
      { id: "D", text: "The dataset had severe attenuation bias." }
    ],
    correct: "B",
    explanation: "Complete-case analysis (listwise deletion) compound-multiplies missingness: N_clean = N * prod(1 - p_j). With 45 columns each having a mere 3-4% random null rate, over 80% of rows contain at least one null, leading to massive, unacceptable information destruction.",
    mentorTip: "Never call `df.dropna()` blindly! Profile column-by-column missingness first: impute features with < 30% nulls, and only drop columns with > 70% nulls."
  },
  {
    id: 3,
    scenario: "Why is Jaro-Winkler string similarity generally superior to standard Levenshtein distance for resolving duplicate Indian citizen names?",
    options: [
      { id: "A", text: "Jaro-Winkler runs in O(1) time whereas Levenshtein takes O(N^3)." },
      { id: "B", text: "Jaro-Winkler gives higher similarity weighting to matching initial prefixes, which matches human naming patterns where typos typically occur near the end of surnames." },
      { id: "C", text: "Levenshtein distance only works on ASCII text and crashes on Unicode characters." },
      { id: "D", text: "Jaro-Winkler automatically translates Bengali script to English." }
    ],
    correct: "B",
    explanation: "In citizen registries, typos and transliteration variations (e.g. 'Banerjee' vs 'Banerji', 'Mukherjee' vs 'Mukherji') overwhelmingly preserve the first 3-4 characters. Jaro-Winkler applies an explicit prefix bonus (Winkler bonus), yielding much higher match confidence on names.",
    mentorTip: "For human names and entity resolution, Jaro-Winkler or Double Metaphone beats standard Levenshtein every single time!"
  },
  {
    id: 4,
    scenario: "You discover a citizen record with `Age = 8` and `Years_Employed = 15`. How should an automated cleaning pipeline handle this semantic contradiction?",
    options: [
      { id: "A", text: "Ignore it, because Decision Trees can learn around contradictory records." },
      { id: "B", text: "Flag the record in an audit log, trigger a cross-field constraint rule, and either set invalid employment to 0 or flag the record for human review." },
      { id: "C", text: "Multiply both numbers together to create an interaction feature." },
      { id: "D", text: "Run Z-score standardization on the age column." }
    ],
    correct: "B",
    explanation: "An 8-year-old child cannot biologically or legally possess 15 years of professional work experience. Cross-field validation checks inter-column dependencies and either corrects the physically impossible field using deterministic domain rules or routes the record to an exception queue.",
    mentorTip: "Cross-field validation rules are the hallmark of professional data engineers. Never let logical contradictions silently poison your models!"
  },
  {
    id: 5,
    scenario: "In an agricultural forecasting project in Howrah Mandi, crop price telemetry is corrupted by random transmission sensor noise. What happens to the estimated regression slope if the data is left uncleaned?",
    options: [
      { id: "A", text: "The slope becomes infinite and causes gradient explosion." },
      { id: "B", text: "The estimated slope beta_hat suffers from Attenuation Bias and is systematically shrunk toward zero, underestimating the true relationship." },
      { id: "C", text: "The R^2 score increases to 1.0." },
      { id: "D", text: "The model automatically converts from regression to classification." }
    ],
    correct: "B",
    explanation: "Under the classical Errors-in-Variables theorem, input measurement noise Delta adds variance to the denominator: E[beta_hat] = beta * (sigma_X^2 / (sigma_X^2 + sigma_Delta^2)). Because sigma_Delta^2 > 0, the estimated coefficient is artificially flattened towards zero.",
    mentorTip: "Clean the noise! Noisy inputs make your models believe genuine signals are weaker than they actually are."
  }
];

// Helper: Compute Levenshtein Matrix
function computeLevenshtein(s1, s2) {
  const m = s1.length;
  const n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1].toLowerCase() === s2[j - 1].toLowerCase() ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,       // Deletion
        dp[i][j - 1] + 1,       // Insertion
        dp[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  const distance = dp[m][n];
  const maxLen = Math.max(m, n) || 1;
  const similarity = Number((1.0 - distance / maxLen).toFixed(3));
  return { distance, similarity, dp };
}

// =============================================================================
// MAIN COMPONENT: TOPIC 7 MASTERCLASS
// =============================================================================

const Topic7 = () => {
  // Navigation State
  const [activeSection, setActiveSection] = useState("noviceMasterclass");

  // Novice Classrooms Subtab State
  const [noviceSubtab, setNoviceSubtab] = useState("metaphor");
  const [jargonSearch, setJargonSearch] = useState("");

  // Studio Mode State
  const [studioMode, setStudioMode] = useState("cleaningFlow"); // 'cleaningFlow' | 'fuzzyLab' | 'attenuation'

  // Cleaning Pipeline Step State (0 = Raw, 1 = Sentinels, 2 = Canonical, 3 = Constraints, 4 = Deduplicated)
  const [cleaningStep, setCleaningStep] = useState(0);

  // Fuzzy Lab State
  const [fuzzyPairIdx, setFuzzyPairIdx] = useState(0);
  const [customStr1, setCustomStr1] = useState(PRESET_FUZZY_PAIRS[0].s1);
  const [customStr2, setCustomStr2] = useState(PRESET_FUZZY_PAIRS[0].s2);

  // Attenuation Bias Noise State
  const [noiseVariance, setNoiseVariance] = useState(1.5); // sigma_delta^2

  // Diagnostic Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  // ---------------------------------------------------------------------------
  // FILTERED JARGON
  // ---------------------------------------------------------------------------
  const filteredJargon = useMemo(() => {
    if (!jargonSearch.trim()) return JARGON_TERMS;
    const q = jargonSearch.toLowerCase();
    return JARGON_TERMS.filter(
      (j) => j.term.toLowerCase().includes(q) || j.desc.toLowerCase().includes(q) || j.tag.toLowerCase().includes(q)
    );
  }, [jargonSearch]);

  // ---------------------------------------------------------------------------
  // COMPUTED CLEANING PIPELINE ROWS
  // ---------------------------------------------------------------------------
  const computedCleaningRows = useMemo(() => {
    let rows = INITIAL_RAW_CITIZENS.map((r) => ({ ...r }));

    // Step 1: Detect & Replace Sentinels
    if (cleaningStep >= 1) {
      rows = rows.map((r) => ({
        ...r,
        age: r.age === -999 ? null : r.age,
        tax: r.tax === 999999.0 ? 28400.0 : r.tax,
        status: r.status === "N/A" ? "Pending" : r.status,
        phone: r.phone === "Unknown" ? null : r.phone,
        hasSentinel: false,
      }));
    }

    // Step 2: Canonicalize Text & Phone
    if (cleaningStep >= 2) {
      rows = rows.map((r) => {
        let loc = r.locality.trim();
        if (loc.toLowerCase() === "calcutta") loc = "Kolkata";
        if (loc.toLowerCase() === "barrackpore") loc = "Barrackpore";

        let ph = r.phone;
        if (ph && !ph.startsWith("+91-")) ph = `+91-${ph}`;

        let wardNum = r.ward;
        if (typeof wardNum === "string") wardNum = 8;

        return {
          ...r,
          locality: loc,
          phone: ph,
          ward: wardNum,
          status: r.status.charAt(0).toUpperCase() + r.status.slice(1).toLowerCase(),
        };
      });
    }

    // Step 3: Validate Constraints & Logical Integrity
    if (cleaningStep >= 3) {
      rows = rows.map((r) => {
        let age = r.age;
        let exp = r.exp;
        let tax = r.tax;

        // Invert impossible negative tax
        if (tax !== null && tax < 0) tax = Math.abs(tax);

        // Fix Age 9 with 15 yrs exp
        if (age !== null && age < 18) {
          age = null; // Mark for adult median imputation
          exp = 0;
        }

        return {
          ...r,
          age,
          exp,
          tax,
          hasLogicErr: false,
        };
      });
    }

    // Step 4: Deduplicate Exact & Fuzzy Entities
    if (cleaningStep >= 4) {
      // Evict KMC-002 (fuzzy dupe of KMC-001) and KMC-005 (exact phone dupe of KMC-003)
      rows = rows.filter((r) => r.id !== "KMC-002" && r.id !== "KMC-005");
    }

    return rows;
  }, [cleaningStep]);

  // Cleanliness Score Calculation
  const cleanlinessMetric = useMemo(() => {
    switch (cleaningStep) {
      case 0: return { score: 24, label: "Raw & Heavily Corrupted", color: "text-red-400", bg: "bg-red-500" };
      case 1: return { score: 48, label: "Sentinels Neutralized", color: "text-amber-400", bg: "bg-amber-500" };
      case 2: return { score: 70, label: "Strings Canonicalized", color: "text-yellow-300", bg: "bg-yellow-500" };
      case 3: return { score: 88, label: "Logic & Bounds Verified", color: "text-cyan-400", bg: "bg-cyan-500" };
      case 4: return { score: 100, label: "Golden Sanitized Dataset", color: "text-emerald-400", bg: "bg-emerald-500" };
      default: return { score: 24, label: "Raw", color: "text-red-400", bg: "bg-red-500" };
    }
  }, [cleaningStep]);

  // ---------------------------------------------------------------------------
  // FUZZY LAB CALCULATION
  // ---------------------------------------------------------------------------
  const fuzzyResult = useMemo(() => {
    return computeLevenshtein(customStr1, customStr2);
  }, [customStr1, customStr2]);

  // ---------------------------------------------------------------------------
  // ATTENUATION BIAS CALCULATION
  // ---------------------------------------------------------------------------
  const attenuationMetrics = useMemo(() => {
    const sigmaX2 = 1.0; // True feature variance
    const trueBeta = 3.0; // True causal relationship slope
    const shrinkageFactor = sigmaX2 / (sigmaX2 + noiseVariance);
    const attenuatedBeta = Number((trueBeta * shrinkageFactor).toFixed(2));
    const biasLossPct = Number(((1 - shrinkageFactor) * 100).toFixed(1));

    return {
      trueBeta,
      attenuatedBeta,
      shrinkageFactor: shrinkageFactor.toFixed(3),
      biasLossPct,
    };
  }, [noiseVariance]);

  // Quiz Handling
  const handleSelectQuiz = (qId, optId) => {
    setQuizAnswers((prev) => ({ ...prev, [qId]: optId }));
  };

  const quizScore = useMemo(() => {
    let count = 0;
    DIAGNOSTIC_QUIZ_QUESTIONS.forEach((q) => {
      if (quizAnswers[q.id] === q.correct) count++;
    });
    return count;
  }, [quizAnswers]);

  return (
    <div className="space-y-12 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16 px-3 sm:px-6">
      {/* ===================================================================== */}
      {/* HEADER HERO SECTION */}
      {/* ===================================================================== */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-10 rounded-3xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Data Types and Preprocessing • Topic 7
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Academic Masterclass
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
              Data Integrity &amp; Fidelity
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Data Cleaning &amp; Rectification Architecture
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-4xl">
            Transform noisy, contradictory, and duplicate raw records into sanitized golden datasets. 
            Master the mathematical detection of hidden sentinel nulls, exact &amp; fuzzy entity resolution, 
            cross-field logical constraints, and prevention of attenuation bias in linear models.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              KMC Civic &amp; Property Tax Registry
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Interactive Levenshtein Edit Matrix
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Attenuation Bias Simulator
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Curriculum Aligned (MAKAUT)
            </span>
          </div>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* STICKY QUICK NAVIGATION BAR */}
      {/* ===================================================================== */}
      <nav className="sticky top-2 z-40 bg-slate-900/90 backdrop-blur-md p-2 rounded-2xl border border-slate-800 shadow-xl flex items-center gap-1 overflow-x-auto text-xs sm:text-sm font-medium">
        {[
          { id: "noviceMasterclass", label: "1. Novice Class" },
          { id: "interactiveStudio", label: "2. Cleaning Studio" },
          { id: "theory", label: "3. Theory & Math" },
          { id: "caseStudies", label: "4. Case Studies" },
          { id: "diagnosticQuiz", label: "5. Diagnostic Quiz" },
          { id: "bestPractices", label: "6. Best Practices" },
          { id: "labSection", label: "7. Python Lab" },
          { id: "faqSection", label: "8. FAQ & Notes" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveSection(item.id);
              document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className={clsx(
              "px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all duration-200",
              activeSection === item.id
                ? "bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* ===================================================================== */}
      {/* SECTION 1: NOVICE MASTERCLASS (3 SUBTABS) */}
      {/* ===================================================================== */}
      <section id="noviceMasterclass" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold border border-indigo-500/30">
                01
              </span>
              The Novice Masterclass
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Build foundational intuition before diving into edit distance matrices and validation logic.
            </p>
          </div>

          <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs font-semibold">
            {[
              { id: "metaphor", label: "Real-World Metaphors" },
              { id: "dirtTaxonomy", label: "4 Forms of Data Dirt" },
              { id: "jargon", label: "Jargon Buster" },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setNoviceSubtab(st.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  noviceSubtab === st.id
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* SUBTAB 1: METAPHORS */}
        {noviceSubtab === "metaphor" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center text-2xl font-bold">
                🏺
              </div>
              <h3 className="text-lg font-bold text-white">Archaeological Restoration</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                When archaeologists unearth ancient terracotta statues at Chandraketugarh (North 24 Parganas), 
                the artifacts are encrusted in caked mud, salt crystals, and fractures. Restorers use fine brushes 
                and gentle solvents to reveal authentic carvings without altering the original historic substance.
              </p>
              <div className="pt-2 text-xs text-amber-300/80 font-mono">
                Formula: Excavated Mud (Dirt) → Ultrasonic Bath (Cleaning) → Preserved Artifact (Integrity)
              </div>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-2xl font-bold">
                🕵️
              </div>
              <h3 className="text-lg font-bold text-white">Forensic Crime Decontamination</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Forensic detectives at Lalbazar Police HQ never analyze a crime scene without sanitizing protocols. 
                If bystander fingerprints and external dust contaminate physical evidence, innocent people are convicted 
                while real criminals escape. Data cleaning purges external artifacts so models reflect truth.
              </p>
              <div className="pt-2 text-xs text-cyan-300/80 font-mono">
                Formula: Contaminated Evidence → DNA Isolation → Unimpeachable Forensic Ground Truth
              </div>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 hover:border-emerald-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-2xl font-bold">
                🚰
              </div>
              <h3 className="text-lg font-bold text-white">Sediment &amp; Carbon Water Filtration</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                In Barrackpore households, drinking water purifiers employ multi-stage cartridges: a coarse spun-sediment 
                filter to catch rust and silt (structural deduplication), followed by an activated carbon block that absorbs 
                invisible chemical toxins and chlorine (hidden sentinel detection).
              </p>
              <div className="pt-2 text-xs text-emerald-300/80 font-mono">
                Formula: Turbid Raw Water → Coarse Mesh → Carbon Block → 100% Pure Drinking Water
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: 4 FORMS OF DATA DIRT */}
        {noviceSubtab === "dirtTaxonomy" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Class 1</span>
                <h4 className="text-base font-bold text-white">Structural &amp; Syntactic</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Inconsistent casings ('KOLKATA' vs 'kolkata'), hidden non-breaking spaces ('\u00a0'), 
                  conflicting date formats ('DD/MM/YYYY' vs 'YYYY-MM-DD'), and unstandardized phone digits.
                </p>
              </div>

              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Class 2</span>
                <h4 className="text-base font-bold text-white">Semantic Contradictions</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Impossible real-world facts: Age = 8 with 15 years experience, Negative property tax dues (-Rs 500), 
                  or Hospital discharge dates occurring prior to admission timestamps.
                </p>
              </div>

              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Class 3</span>
                <h4 className="text-base font-bold text-white">Hidden Sentinels</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Legacy database constants (-999, 9999, 'N/A', '?') representing missing values. Because they are 
                  valid numeric floats or strings, automated `.isna()` routines fail to catch them.
                </p>
              </div>

              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Class 4</span>
                <h4 className="text-base font-bold text-white">Entity Duplicates</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Exact duplicate rows created by network re-try loops, plus fuzzy near-duplicates ('Sukanta Hui' 
                  vs 'S. Hui', 'Ballygunge Circular Rd' vs 'Ballygunge Cir Rd').
                </p>
              </div>
            </div>

            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-2">
              <h4 className="font-bold text-indigo-300 flex items-center gap-2">
                <span>💡</span> Clean Data vs Preprocessed Data
              </h4>
              <p>
                A dataset can be completely preprocessed (e.g., scaled to [0, 1] and one-hot encoded) but still be 
                <strong className="text-rose-400"> completely dirty</strong> if it contains duplicated citizens, 
                impossible negative ages, or unstandardized sentinels. Cleaning is the prerequisite foundation of fidelity!
              </p>
            </div>
          </div>
        )}

        {/* SUBTAB 3: JARGON BUSTER */}
        {noviceSubtab === "jargon" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search vocabulary (e.g. sentinel, Levenshtein, attenuation, deduplication)..."
                value={jargonSearch}
                onChange={(e) => setJargonSearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              {jargonSearch && (
                <button
                  onClick={() => setJargonSearch("")}
                  className="px-3 py-2 text-xs bg-slate-800 text-slate-400 hover:text-white rounded-lg"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJargon.map((item, idx) => (
                <div key={idx} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400">{item.tag}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{item.term}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* SECTION 2: INTERACTIVE DATA CLEANING & RECTIFICATION STUDIO */}
      {/* ===================================================================== */}
      <section id="interactiveStudio" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold border border-cyan-500/30">
                02
              </span>
              Interactive Data Cleaning &amp; Rectification Studio
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Test sequential pipeline rectifications, explore dynamic Levenshtein edit distance matrices, and simulate attenuation bias.
            </p>
          </div>

          <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs font-semibold">
            {[
              { id: "cleaningFlow", label: "Pipeline Rectifier" },
              { id: "fuzzyLab", label: "Levenshtein Matrix Lab" },
              { id: "attenuation", label: "Attenuation Bias Simulator" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setStudioMode(m.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  studioMode === m.id
                    ? "bg-cyan-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* MODE A: PIPELINE RECTIFIER */}
        {studioMode === "cleaningFlow" && (
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Select Cleaning Pipeline Stage:
                </span>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full", cleanlinessMetric.color, "bg-slate-800")}>
                  Dataset Cleanliness: {cleanlinessMetric.score}% ({cleanlinessMetric.label})
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={clsx("h-full transition-all duration-500", cleanlinessMetric.bg)}
                  style={{ width: `${cleanlinessMetric.score}%` }}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                {[
                  { step: 0, title: "0. Raw Telemetry", subtitle: "Corrupted records" },
                  { step: 1, title: "1. Sentinel Extraction", subtitle: "Neutralize -999 & 'N/A'" },
                  { step: 2, title: "2. Canonicalize Text", subtitle: "Standardize City & Phone" },
                  { step: 3, title: "3. Constraint Check", subtitle: "Fix Age 9 & Neg Tax" },
                  { step: 4, title: "4. Entity Resolution", subtitle: "Purge exact & fuzzy dupes" },
                ].map((s) => (
                  <button
                    key={s.step}
                    onClick={() => setCleaningStep(s.step)}
                    className={clsx(
                      "p-2.5 rounded-xl text-left border transition-all",
                      cleaningStep === s.step
                        ? "bg-cyan-950/80 border-cyan-500/60 shadow-lg shadow-cyan-950/50"
                        : "bg-slate-800/60 border-slate-700/60 hover:bg-slate-800"
                    )}
                  >
                    <div className="text-xs font-bold text-white">{s.title}</div>
                    <div className="text-[10px] text-slate-400 truncate">{s.subtitle}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Data Table */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Active Roster: {computedCleaningRows.length} Civic Registry Records</span>
                <span className="font-mono text-cyan-300">
                  {cleaningStep === 0 && "Raw ingestion: Notice sentinel -999, negative tax -500, archaic 'Calcutta', duplicate S. Hui"}
                  {cleaningStep === 1 && "Sentinels removed: -999 -> null, 999999.0 capped, 'N/A' -> Pending"}
                  {cleaningStep === 2 && "Text canonicalized: 'Calcutta' -> Kolkata, phone numbers prefixed with +91-"}
                  {cleaningStep === 3 && "Logical rules verified: Age 9 experience set to 0, negative tax inverted to positive"}
                  {cleaningStep === 4 && "Entity resolution: KMC-002 (fuzzy dupe) and KMC-005 (exact phone dupe) safely purged"}
                </span>
              </div>

              <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/60">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400">
                    <tr>
                      <th className="p-2.5">Record ID</th>
                      <th className="p-2.5">Citizen Name</th>
                      <th className="p-2.5">Ward</th>
                      <th className="p-2.5">Locality</th>
                      <th className="p-2.5">Age</th>
                      <th className="p-2.5">Experience</th>
                      <th className="p-2.5">Annual Tax (INR)</th>
                      <th className="p-2.5">Payment Status</th>
                      <th className="p-2.5">Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {computedCleaningRows.map((row, idx) => (
                      <tr
                        key={idx}
                        className={clsx(
                          "transition-colors",
                          row.isDupe && cleaningStep < 4 && "bg-red-950/30 text-red-300",
                          row.hasSentinel && "bg-purple-950/30 text-purple-300",
                          row.hasLogicErr && "bg-amber-950/30 text-amber-300"
                        )}
                      >
                        <td className="p-2.5 font-bold text-white flex items-center gap-1.5">
                          {row.id}
                          {row.isDupe && cleaningStep < 4 && (
                            <span className="text-[10px] bg-red-500/20 px-1.5 py-0.5 rounded text-red-300">DUPE</span>
                          )}
                        </td>
                        <td className="p-2.5">{row.name}</td>
                        <td className="p-2.5">Ward {row.ward}</td>
                        <td className="p-2.5">{row.locality}</td>
                        <td className="p-2.5">
                          {row.age === null ? (
                            <span className="text-purple-400 font-bold">NULL (Sanitized)</span>
                          ) : (
                            <span className={clsx(row.age === -999 && "text-purple-400 font-bold")}>
                              {row.age} yrs {row.age === -999 && "⚠️ SENTINEL"}
                            </span>
                          )}
                        </td>
                        <td className="p-2.5">{row.exp} yrs</td>
                        <td className="p-2.5">
                          {row.tax < 0 ? (
                            <span className="text-amber-400 font-bold">₹ {row.tax} ⚠️ NEGATIVE</span>
                          ) : (
                            <span>₹ {row.tax.toLocaleString()}</span>
                          )}
                        </td>
                        <td className="p-2.5">
                          <span
                            className={clsx(
                              "px-2 py-0.5 rounded-full text-[10px] font-semibold",
                              row.status.toLowerCase() === "paid" && "bg-emerald-500/20 text-emerald-300",
                              row.status.toLowerCase() === "pending" && "bg-yellow-500/20 text-yellow-300",
                              row.status.toLowerCase() === "overdue" && "bg-rose-500/20 text-rose-300",
                              row.status === "N/A" && "bg-purple-500/20 text-purple-300"
                            )}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="p-2.5 text-slate-400">{row.phone || "None"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* MODE B: LEVENSHTEIN MATRIX LAB */}
        {studioMode === "fuzzyLab" && (
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Select Benchmark Near-Duplicate Pair:
                </span>
                <span className="text-xs font-mono text-cyan-300">
                  Levenshtein Recurrence: D(i, j) = min(Insert, Delete, Replace)
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {PRESET_FUZZY_PAIRS.map((pair, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setFuzzyPairIdx(idx);
                      setCustomStr1(pair.s1);
                      setCustomStr2(pair.s2);
                    }}
                    className={clsx(
                      "px-3 py-1.5 rounded-xl text-xs font-medium border transition-all",
                      fuzzyPairIdx === idx
                        ? "bg-cyan-600 border-cyan-400 text-white shadow-md shadow-cyan-600/30"
                        : "bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white"
                    )}
                  >
                    {pair.domain}: "{pair.s1}" vs "{pair.s2}"
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs text-slate-400 font-semibold">String 1 (Target Entity):</label>
                  <input
                    type="text"
                    value={customStr1}
                    onChange={(e) => setCustomStr1(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold">String 2 (Observed Variant):</label>
                  <input
                    type="text"
                    value={customStr2}
                    onChange={(e) => setCustomStr2(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Matrix & Metric Output */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
                  Matching Diagnostics
                </div>

                <div>
                  <div className="text-slate-500">Raw Edit Distance:</div>
                  <div className="text-xl font-extrabold text-white mt-1">
                    {fuzzyResult.distance} edits
                  </div>
                </div>

                <div>
                  <div className="text-slate-500">Normalized Similarity:</div>
                  <div className="text-2xl font-extrabold text-cyan-400 mt-1">
                    {(fuzzyResult.similarity * 100).toFixed(1)}%
                  </div>
                </div>

                <div>
                  <div className="text-slate-500">Deduplication Verdict (Threshold ≥ 70%):</div>
                  <div className="mt-1">
                    {fuzzyResult.similarity >= 0.7 ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        ✓ MATCH (Same Entity)
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        ✗ DISTINCT (Different Entities)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Dynamic Programming Grid Preview */}
              <div className="md:col-span-2 bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-2 overflow-x-auto font-mono text-xs">
                <div className="text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
                  Dynamic Programming Matrix ({customStr1.length + 1} × {customStr2.length + 1})
                </div>

                <div className="pt-2 overflow-x-auto">
                  <table className="text-center border-collapse">
                    <tbody>
                      <tr>
                        <td className="p-1 font-bold text-slate-500 bg-slate-900">ε</td>
                        <td className="p-1 font-bold text-slate-500 bg-slate-900">ε</td>
                        {customStr2.split("").map((c, j) => (
                          <td key={j} className="p-1 font-bold text-cyan-400 bg-slate-900 min-w-6">
                            {c}
                          </td>
                        ))}
                      </tr>
                      {fuzzyResult.dp.slice(0, 12).map((row, i) => (
                        <tr key={i}>
                          <td className="p-1 font-bold text-indigo-400 bg-slate-900 min-w-6">
                            {i === 0 ? "ε" : customStr1[i - 1]}
                          </td>
                          {row.slice(0, 12).map((val, j) => (
                            <td
                              key={j}
                              className={clsx(
                                "p-1.5 border border-slate-800/80",
                                i === customStr1.length && j === customStr2.length
                                  ? "bg-cyan-600 text-white font-bold"
                                  : "text-slate-300 hover:bg-slate-800"
                              )}
                            >
                              {val}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {(customStr1.length > 11 || customStr2.length > 11) && (
                    <div className="text-[10px] text-slate-500 italic pt-1">
                      (Matrix display truncated to 12x12 for visual clarity. Final edit cost: {fuzzyResult.distance})
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE C: ATTENUATION BIAS SIMULATOR */}
        {studioMode === "attenuation" && (
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>📉</span> Measurement Noise &amp; Attenuation Bias
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  When input sensor measurements contain random noise <code className="text-cyan-300 font-mono">X_dirty = X_true + ε</code>, 
                  the estimated regression slope <code className="text-cyan-300 font-mono">β̂</code> is mathematically shrunk toward zero. 
                  Adjust the noise variance below to see how noise erodes the true relationship.
                </p>

                <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Sensor Noise Variance (σ_Δ²):</span>
                    <span className="text-cyan-300 font-mono">{noiseVariance.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="5.0"
                    step="0.25"
                    value={noiseVariance}
                    onChange={(e) => setNoiseVariance(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>0.0 (Pure Clean Signal)</span>
                    <span>2.5 (Moderate Sensor Noise)</span>
                    <span>5.0 (Extreme Noise Contamination)</span>
                  </div>
                </div>
              </div>

              {/* Attenuation Diagnostics Dashboard */}
              <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
                  Theoretical Shrinkage Calculations
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-slate-500">True Causal Slope (β):</div>
                    <div className="text-lg font-bold text-emerald-400 mt-1">{attenuationMetrics.trueBeta.toFixed(2)}</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-slate-500">Attenuated Slope (β̂):</div>
                    <div className="text-lg font-bold text-amber-400 mt-1">{attenuationMetrics.attenuatedBeta}</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-slate-500">Shrinkage Factor (λ):</div>
                    <div className="text-base font-bold text-white mt-1">{attenuationMetrics.shrinkageFactor}</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-slate-500">Signal Dilution Loss:</div>
                    <div className="text-base font-bold text-rose-400 mt-1">-{attenuationMetrics.biasLossPct}%</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg text-xs leading-relaxed border bg-slate-900/90 border-slate-800 text-slate-300">
                  <strong>MATHEMATICAL LAW:</strong> E[β̂] = β · [σ_X² / (σ_X² + σ_Δ²)]. 
                  Because uncleaned sensor noise inflates the denominator, the model falsely concludes the feature is 
                  <strong className="text-rose-400"> {attenuationMetrics.biasLossPct}% weaker</strong> than it actually is in reality!
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* SECTION 3: MATHEMATICAL FOUNDATIONS & THEORETICAL PROOFS */}
      {/* ===================================================================== */}
      <section id="theory" className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-bold border border-purple-500/30">
              03
            </span>
            Mathematical Foundations &amp; Theoretical Proofs
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Formal mathematical equations underpinning string edit distances, attenuation bias, and data loss curves.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Levenshtein DP */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-indigo-400 flex items-center gap-2">
              <span>📐</span> 1. Levenshtein Dynamic Programming Recurrence
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-cyan-300">Edit Distance Formulation:</span>
                <div className="text-sm font-mono text-white py-1">
                  {"D(i, j) = \\min \\begin{cases} D(i-1, j) + 1 & \\text{(Deletion)} \\\\ D(i, j-1) + 1 & \\text{(Insertion)} \\\\ D(i-1, j-1) + \\mathbb{I}(s_1[i] \\neq s_2[j]) & \\text{(Substitution)} \\end{cases}"}
                </div>
                <p className="text-[11px] text-slate-400">
                  Computes the minimal cost path through the alignment lattice in O(|s1| · |s2|) space and time.
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-emerald-300">Normalized Similarity Metric:</span>
                <div className="text-sm font-mono text-white py-1">
                  {"\\text{Sim}(s_1, s_2) = 1.0 - \\frac{D(s_1, s_2)}{\\max(|s_1|, |s_2|)} \\in [0.0, 1.0]"}
                </div>
                <p className="text-[11px] text-slate-400">
                  Produces a bounded similarity score suitable for automated entity resolution thresholds.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Errors-in-Variables Theorem */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-purple-400 flex items-center gap-2">
              <span>⚡</span> 2. Attenuation Bias &amp; Listwise Information Loss
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-amber-300">Errors-in-Variables (Attenuation Bias):</span>
                <div className="text-sm font-mono text-white py-1">
                  {"\\mathbb{E}[\\hat{\\beta}] = \\beta \\left( \\frac{\\sigma_X^2}{\\sigma_X^2 + \\sigma_\\Delta^2} \\right) < \\beta"}
                </div>
                <p className="text-[11px] text-slate-400">
                  Uncleaned sensor measurement noise directly shrinks the estimated model weights toward zero.
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-purple-300">Listwise Deletion Loss Equation:</span>
                <div className="text-sm font-mono text-white py-1">
                  {"N_{\\text{clean}} = N \\prod_{j=1}^d (1 - p_j)"}
                </div>
                <p className="text-[11px] text-slate-400">
                  Demonstrates why running `df.dropna()` on high-dimensional data annihilates the majority of samples.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 4: REGIONAL INDUSTRIAL CASE STUDIES */}
      {/* ===================================================================== */}
      <section id="caseStudies" className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold border border-amber-500/30">
              04
            </span>
            Regional West Bengal Industrial Case Studies
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Real enterprise data cleaning workflows deployed across Kolkata, Bidhannagar, Howrah, and Barrackpore.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Case 1 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">MUNICIPAL GOVERNANCE</span>
              <span className="text-xs text-slate-500 font-mono">Kolkata Municipal Corp (KMC)</span>
            </div>
            <h3 className="text-lg font-bold text-white">Property Tax Registry Entity Resolution</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Problem:</strong> Property assessment ledgers across 144 civic wards contained fuzzy street variations: 
              "Ballygunge Circular Rd", "Ballygunge Cir Rd", "B.C. Road", and "Ballygunge Cir. Road", causing duplicate assessment 
              accounts and unlinked tax arrears.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
              <div>Cleaning Solution:</div>
              <div className="text-slate-400">• Ward-based blocking to reduce pairwise checks from 10^12 to 10^7</div>
              <div className="text-slate-400">• Levenshtein &amp; token-set ratio matching with similarity threshold ≥ 0.82</div>
              <div className="text-slate-400">• Resolved 12,000 duplicate taxpayer accounts, recovering Rs 4.2 Cr in dues</div>
            </div>
          </div>

          {/* Case 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400">PUBLIC DISTRIBUTION (PDS)</span>
              <span className="text-xs text-slate-500 font-mono">WBFACS Khadya Sathi</span>
            </div>
            <h3 className="text-lg font-bold text-white">Transliteration Normalization &amp; De-duplication</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Problem:</strong> Digitizing 8.5 Crore ration cards created thousands of phonetic transliteration 
              errors when translating Bengali names into English (e.g. "Bondopadhyay" vs "Banerjee", "Chowdhury" vs "Choudhuri").
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
              <div>Cleaning Solution:</div>
              <div className="text-slate-400">• Indic-tailored Double Metaphone phonetic indexing</div>
              <div className="text-slate-400">• Aadhaar UIDAI deterministic linkage to detect duplicate beneficiary ghost cards</div>
              <div className="text-slate-400">• Purged 3.8 lakh fraudulent cards, saving public subsidy funds</div>
            </div>
          </div>

          {/* Case 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">EMERGENCY HEALTHCARE</span>
              <span className="text-xs text-slate-500 font-mono">North 24 Parganas District Hospital</span>
            </div>
            <h3 className="text-lg font-bold text-white">ICU Multi-Sensor Lead Disconnect Triage</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Problem:</strong> ICU telemetry recorded zero heart rates (0 bpm) whenever ECG chest leads detached 
              as patients moved in bed, triggering false cardiac arrest alarms.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
              <div>Cleaning Solution:</div>
              <div className="text-slate-400">• Multi-sensor agreement rule: verify ECG 0 bpm against SpO2 and Blood Pressure</div>
              <div className="text-slate-400">• Classified isolated ECG drops as mechanical disconnect artifacts</div>
              <div className="text-slate-400">• Forward-filled missing values without triggering false alarm models</div>
            </div>
          </div>

          {/* Case 4 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400">AGRICULTURAL COMMODITIES</span>
              <span className="text-xs text-slate-500 font-mono">Howrah Wholesale Fish Mandi</span>
            </div>
            <h3 className="text-lg font-bold text-white">Legacy Unit Extraction &amp; Price Standardization</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Problem:</strong> Daily wholesale trade ledgers mixed traditional Bengali weight units 
              (Maund = 37.32 kg, Seer = 0.933 kg) with modern metric Kilograms and Quintals (100 kg).
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
              <div>Cleaning Solution:</div>
              <div className="text-slate-400">• Regex unit-extraction parser mapping all historical units to SI kilograms</div>
              <div className="text-slate-400">• Inverted negative cash balance slips and sanitized punctuation</div>
              <div className="text-slate-400">• Fed consistent price matrices to downstream demand forecasting models</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 5: DIAGNOSTIC SELF-ASSESSMENT QUIZ */}
      {/* ===================================================================== */}
      <section id="diagnosticQuiz" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold border border-emerald-500/30">
                05
              </span>
              Diagnostic Self-Assessment Quiz
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Test your mastery of data cleaning, hidden sentinels, and entity deduplication.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono">
              Score: <strong className="text-emerald-400">{quizScore}</strong> / {DIAGNOSTIC_QUIZ_QUESTIONS.length}
            </span>
            <button
              onClick={() => setShowQuizResults((prev) => !prev)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/30"
            >
              {showQuizResults ? "Hide Explanations" : "Show All Answers"}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {DIAGNOSTIC_QUIZ_QUESTIONS.map((q, idx) => {
            const selectedOpt = quizAnswers[q.id];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = selectedOpt === q.correct;

            return (
              <div
                key={q.id}
                className={clsx(
                  "p-6 rounded-2xl border transition-all space-y-4",
                  isAnswered
                    ? isCorrect
                      ? "bg-slate-900/90 border-emerald-500/50"
                      : "bg-slate-900/90 border-rose-500/50"
                    : "bg-slate-900/70 border-slate-800"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                      Scenario Question #{idx + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                      {q.scenario}
                    </h3>
                  </div>

                  {isAnswered && (
                    <span
                      className={clsx(
                        "px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap",
                        isCorrect ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
                      )}
                    >
                      {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                    </span>
                  )}
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {q.options.map((opt) => {
                    const isSelected = selectedOpt === opt.id;
                    const isTargetCorrect = opt.id === q.correct;

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectQuiz(q.id, opt.id)}
                        className={clsx(
                          "p-3.5 rounded-xl text-left text-xs sm:text-sm border transition-all flex items-start gap-3",
                          isSelected
                            ? isTargetCorrect
                              ? "bg-emerald-950/80 border-emerald-500 text-emerald-200"
                              : "bg-rose-950/80 border-rose-500 text-rose-200"
                            : showQuizResults && isTargetCorrect
                            ? "bg-emerald-950/40 border-emerald-500/60 text-emerald-300"
                            : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white"
                        )}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-700/80 flex items-center justify-center font-bold text-[10px] text-white shrink-0 mt-0.5">
                          {opt.id}
                        </span>
                        <span className="leading-snug">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card */}
                {(isAnswered || showQuizResults) && (
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2 mt-2">
                    <div>
                      <strong className="text-emerald-400">Correct Answer ({q.correct}): </strong>
                      {q.explanation}
                    </div>
                    <div className="text-indigo-300/90 italic font-mono pt-1">
                      💡 {q.mentorTip}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 6: PRODUCTION PITFALLS & BEST PRACTICES */}
      {/* ===================================================================== */}
      <section id="bestPractices" className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-sm font-bold border border-rose-500/30">
              06
            </span>
            Production Pitfalls &amp; Engineering Best Practices
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Avoid the critical traps that cause data leakage and survivorship bias during data cleaning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-rose-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span>⚠️</span> Pitfall 1: Blind Row Dropping
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Executing <code className="text-rose-300 font-mono">df.dropna()</code> without profiling can destroy 80% of your 
              dataset, biasing models towards wealthy or non-vulnerable citizens. Always compute column null percentages first.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-rose-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span>⚠️</span> Pitfall 2: Silent In-Place Mutation
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mutating raw DataFrames in-place destroys data lineage and prevents compliance auditing. Always record an 
              immutable audit trail documenting the original value, corrected value, and rule triggered.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-rose-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span>⚠️</span> Pitfall 3: Hidden Whitespace
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unicode non-breaking spaces (<code className="text-cyan-300 font-mono">\u00a0</code>) bypass standard ASCII strip routines, 
              causing identical strings to fail joins. Always run <code className="text-cyan-300 font-mono">unicodedata.normalize('NFKD')</code>.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 7: PYTHON LABORATORY CODE VIEWER */}
      {/* ===================================================================== */}
      <section id="labSection" className="space-y-4">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold border border-cyan-500/30">
              07
            </span>
            Python Laboratory Implementation
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Executable pure Python implementation of Sentinel Sanitizer, Text Canonicalizer, Constraint Validator, 
            and Fuzzy Deduplicator on KMC citizen records.
          </p>
        </div>

        <PythonFileLoader
          code={labCode}
          fileName="data_cleaning_lab.py"
        />
      </section>

      {/* ===================================================================== */}
      {/* SECTION 8: FAQ ACCORDION */}
      {/* ===================================================================== */}
      <section id="faqSection" className="space-y-4">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold border border-indigo-500/30">
              08
            </span>
            Frequently Asked Questions &amp; Technical Deep-Dive
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            30 comprehensive questions and answers covering conceptual definitions, string algorithms, and production cleaning pipelines.
          </p>
        </div>

        <FAQTemplate questions={questions} />
      </section>

      {/* ===================================================================== */}
      {/* SECTION 9: REVISION NOTES HANDBOOK */}
      {/* ===================================================================== */}
      <section id="notesSection" className="space-y-4">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-bold border border-purple-500/30">
              09
            </span>
            Downloadable Revision Notes &amp; Exam Handbook
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Complete revision handbook aligned with MAKAUT semester syllabus BCAC701B.
          </p>
        </div>

        <PlainTextPrint
          content={noteText}
          fileName="topic7_data_cleaning_handbook.txt"
        />
      </section>

      {/* ===================================================================== */}
      {/* SECTION 10: TEACHER SUKANTA HUI MENTOR NOTE */}
      {/* ===================================================================== */}
      <Teacher />
    </div>
  );
};

export default Topic7;
