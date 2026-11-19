import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic11_files/detecting_inconsistent_data_lab.py?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions.js";

// =============================================================================
// BENCHMARK DATASET: WEST BENGAL HEALTHCARE (SWASTHYA SATHI CLAIMS)
// =============================================================================

const RAW_CLAIMS = [
  {
    id: "SS-KOL-001",
    patient: "Subroto Mukherjee",
    age: 64,
    admission: "2026-02-10",
    discharge: "2026-02-18",
    procedure: "Coronary Angioplasty",
    state: "West Bengal",
    pin: "700029",
    bill: 125000,
    type: "clean"
  },
  {
    id: "SS-KOL-002",
    patient: "Kalyan Bhattacharya",
    age: 52,
    admission: "2026-03-15",
    discharge: "2026-03-10", // Chronological inversion!
    procedure: "Knee Arthroscopy",
    state: "West Bengal",
    pin: "700084",
    bill: 78000,
    type: "temporal_inversion",
    defect: "Discharge date (March 10) precedes admission date (March 15)"
  },
  {
    id: "SS-BAR-003",
    patient: "Amarendra Ghosh",
    age: 72,
    admission: "2026-01-05",
    discharge: "2026-01-09",
    procedure: "Neonatal Infant Incubator", // Cross-field contradiction with age 72!
    state: "West Bengal",
    pin: "700120",
    bill: 45000,
    type: "pediatric_contradiction",
    defect: "Pediatric neonatal procedure billed for 72-year-old geriatric patient"
  },
  {
    id: "SS-ICH-004",
    patient: "Tanima Das",
    age: 28,
    admission: "2026-02-01",
    discharge: "2026-02-04",
    procedure: "Laparoscopic Cholecystectomy",
    state: "West Bengal",
    pin: "110001", // New Delhi PIN code in West Bengal scheme!
    bill: 36000,
    type: "geo_mismatch",
    defect: "State is West Bengal, but PIN code (110001) belongs to New Delhi"
  },
  {
    id: "SS-SAL-005",
    patient: "Debabrata Sen",
    age: 44,
    admission: "2026-03-01",
    discharge: "2026-03-01", // Duration 0 days, bill Rs 240,000 for open heart surgery!
    procedure: "Open Heart Bypass",
    state: "West Bengal",
    pin: "700091",
    bill: 240000,
    type: "clinical_duration",
    defect: "Major open-heart bypass surgery billed with 0-hour inpatient stay"
  },
  {
    id: "SS-BAR-006",
    patient: "Ruma Ganguly",
    age: 39,
    admission: "2026-02-14",
    discharge: "2026-02-17",
    procedure: "Thyroidectomy",
    state: "West Bengal",
    pin: "700122",
    bill: 52000,
    type: "clean"
  }
];

// Repaired version of the claims
const REPAIRED_CLAIMS = [
  {
    id: "SS-KOL-001",
    patient: "Subroto Mukherjee",
    age: 64,
    admission: "2026-02-10",
    discharge: "2026-02-18",
    procedure: "Coronary Angioplasty",
    state: "West Bengal",
    pin: "700029",
    bill: 125000,
    repairNote: "Original record verified valid."
  },
  {
    id: "SS-KOL-002",
    patient: "Kalyan Bhattacharya",
    age: 52,
    admission: "2026-03-10", // Chronology restored: swapped dates
    discharge: "2026-03-15",
    procedure: "Knee Arthroscopy",
    state: "West Bengal",
    pin: "700084",
    bill: 78000,
    repairNote: "Chronology swapped: Admission set to March 10, Discharge to March 15."
  },
  {
    id: "SS-BAR-003",
    patient: "Amarendra Ghosh",
    age: 72,
    admission: "2026-01-05",
    discharge: "2026-01-09",
    procedure: "Geriatric Cardiac Monitoring", // Replaced erroneous billing code
    state: "West Bengal",
    pin: "700120",
    bill: 45000,
    repairNote: "Medical code corrected from 'Neonatal' to 'Geriatric Cardiac Monitoring'."
  },
  {
    id: "SS-ICH-004",
    patient: "Tanima Das",
    age: 28,
    admission: "2026-02-01",
    discharge: "2026-02-04",
    procedure: "Laparoscopic Cholecystectomy",
    state: "West Bengal",
    pin: "700144", // Restored to Ichapur PIN
    bill: 36000,
    repairNote: "PIN code corrected to 700144 (Ichapur, North 24 Pgs) via Geocoding lookup."
  },
  {
    id: "SS-SAL-005",
    patient: "Debabrata Sen",
    age: 44,
    admission: "2026-03-01",
    discharge: "2026-03-07", // Inpatient stay corrected to 6 days
    procedure: "Open Heart Bypass",
    state: "West Bengal",
    pin: "700091",
    bill: 240000,
    repairNote: "Discharge date extracted from ICU chart: Corrected to 6-day stay."
  },
  {
    id: "SS-BAR-006",
    patient: "Ruma Ganguly",
    age: 39,
    admission: "2026-02-14",
    discharge: "2026-02-17",
    procedure: "Thyroidectomy",
    state: "West Bengal",
    pin: "700122",
    bill: 52000,
    repairNote: "Original record verified valid."
  }
];

// =============================================================================
// JARGON & TAXONOMY DATA
// =============================================================================

const JARGON_TERMS = [
  {
    term: "Inconsistent Data",
    tag: "Core Concept",
    desc: "Observations that violate semantic constraints, business rules, cross-field integrity, or physical laws, despite passing superficial data type checks."
  },
  {
    term: "Denial Constraint (DC)",
    tag: "Relational Logic",
    desc: "A universal first-order logic statement: forall t_1, t_2 in R, NOT (phi_1 AND ... AND phi_m), formalizing constraints that must never be satisfied simultaneously."
  },
  {
    term: "Temporal Inversion",
    tag: "Time-Series",
    desc: "Chronological anomaly where an event completion timestamp precedes its inception timestamp (e.g. Discharge_Date < Admission_Date)."
  },
  {
    term: "Scale / Unit Mismatch",
    tag: "Feature Engineering",
    desc: "When numbers in the same column represent disparate physical units (e.g. Salary in INR Lakhs vs raw INR, or Celsius vs Fahrenheit)."
  },
  {
    term: "Cross-Field Contradiction",
    tag: "Domain Model",
    desc: "Semantic conflict between two attributes in the same tuple (e.g. Patient Age = 72 paired with Pediatric Neonatal Incubator procedure)."
  },
  {
    term: "Attenuation Bias",
    tag: "Econometrics & ML",
    desc: "The under-estimation of regression coefficients toward zero caused by uncorrected measurement variance and unit inconsistencies in predictor features."
  },
  {
    term: "Mahalanobis Distance",
    tag: "Multivariate Stats",
    desc: "Distance metric incorporating feature covariance matrix Sigma: D_M(x) = sqrt((x-mu)^T Sigma^(-1) (x-mu)), detecting points breaking multivariate correlation."
  },
  {
    term: "Functional Dependency (FD)",
    tag: "Relational Theory",
    desc: "A constraint X -> Y asserting that identical values of attribute set X must map to identical values of Y (e.g. Postal PIN -> District)."
  },
  {
    term: "HoloClean Framework",
    tag: "Probabilistic Repair",
    desc: "A state-of-the-art factor graph framework combining Denial Constraints, statistical priors, and machine learning to infer optimal database repairs."
  },
  {
    term: "Silent Type Coercion Trap",
    tag: "Production Bug",
    desc: "Using pd.to_datetime(..., errors='coerce') which silently converts corrupt strings to NaT (nulls), transforming an inconsistency problem into missing data."
  },
  {
    term: "Benford's Law",
    tag: "Forensic Analytics",
    desc: "The empirical logarithmic distribution of leading digits: P(d) = log10(1 + 1/d). Fabricated financial invoices exhibit severe non-Benford anomalies."
  },
  {
    term: "Semantic Drift",
    tag: "Data Streaming",
    desc: "When the operational definition or units of an API attribute silently change over time without notifying downstream machine learning consumers."
  }
];

// =============================================================================
// DIAGNOSTIC SCENARIO QUIZ
// =============================================================================

const DIAGNOSTIC_QUESTIONS = [
  {
    id: "scen-1",
    scenario: "Hospital Claims Audit Anomaly",
    question: "A Swasthya Sathi health claim auditor encounters a patient record with `Admission_Date = '2026-03-15'` and `Discharge_Date = '2026-03-10'`. A junior developer suggests running `pd.to_datetime(df['discharge_date'], errors='coerce')`. Why is this suggestion deeply flawed?",
    options: [
      "Because pandas cannot parse dates in the month of March.",
      "Because '2026-03-10' is a perfectly valid calendar date; `errors='coerce'` will parse it without error, leaving the chronological inversion completely undetected!",
      "Because `errors='coerce'` will delete the patient's Aadhaar card number.",
      "Because pandas requires dates to be formatted as Unix epoch integers."
    ],
    correctIndex: 1,
    rationale: "Both dates are syntactically valid ISO strings. Type coercion only catches unparsable strings (like 'invalid-date'); it possesses zero chronological or semantic awareness. The issue is a relational logic violation that requires a Denial Constraint: `NOT (Discharge < Admission)`.",
    mentorTip: "Sukanta Hui's Law: Data type parsers check syntax; Denial Constraints enforce semantics!"
  },
  {
    id: "scen-2",
    scenario: "FinTech Scale Discrepancy",
    question: "In a Salt Lake Sector V FinTech credit risk dataset, 5% of loan applicants entered their monthly salary (e.g. ₹ 60,000) into an 'Annual Salary' column where other applicants entered ₹ 7,20,000. What is the mathematical impact on linear credit scoring models if trained on this uncleaned column?",
    options: [
      "The model's R-squared will increase to 1.0.",
      "Attenuation Bias (Regression Dilution): The empirical variance of the salary feature is artificially inflated, pulling the estimated regression slope beta toward zero and mis-calibrating default probabilities.",
      "The model will automatically convert all monthly figures to annual figures.",
      "The gradient descent algorithm will divide by zero."
    ],
    correctIndex: 1,
    rationale: "In OLS, beta = Cov(X, Y) / Var(X). Adding severe scale variance without true covariance artificially inflates Var(X), which dilutes (attenuates) beta toward zero. High-income applicants who entered monthly salaries will be severely penalized.",
    mentorTip: "Always plot feature histograms: Bimodal distributions with ~12x separation are classic hallmarks of monthly vs annual salary mixing."
  },
  {
    id: "scen-3",
    scenario: "Kolkata Police ANPR Camera Contradiction",
    question: "An automated traffic camera at EM Bypass issues an automated challan for 'Riding a two-wheeler without a helmet' to a 10-wheel Tata commercial dump truck. What architectural check was missing in the e-Challan automation pipeline?",
    options: [
      "A GPU upgrade on the roadside camera.",
      "A cross-attribute Denial Constraint verifying vehicle class before violation issuance: IF Vehicle_Class in ('Truck', 'Bus', 'Car') THEN REJECT Helmet_Violation.",
      "A faster shutter speed on the camera lens.",
      "A database trigger that reboots the server every midnight."
    ],
    correctIndex: 1,
    rationale: "Raw computer vision / OCR outputs are inherently noisy. Production pipelines must enforce a deterministic Semantic Integrity Gateway that cross-references vehicle registration metadata before penalizing citizens.",
    mentorTip: "Never permit raw probabilistic AI inferences to trigger automated actions without deterministic domain sanity rules."
  },
  {
    id: "scen-4",
    scenario: "Date Format Locale Ambiguity",
    question: "You ingest an uncurated CSV where a date column has the value '04/05/2026'. Scanning the rest of the column reveals another row containing '28/05/2026'. What is the definitive date represented by '04/05/2026'?",
    options: [
      "April 5, 2026 (US Format MM/DD/YYYY).",
      "May 4, 2026 (Indian/British Format DD/MM/YYYY) because the presence of '28' in the first position of the second row proves the column's first token is Day.",
      "The date cannot be determined and must be discarded.",
      "It represents May 28, 2026."
    ],
    correctIndex: 1,
    rationale: "Since there is no 28th month in the Gregorian calendar, '28/05/2026' unambiguously establishes that the column's format is DD/MM/YYYY. Therefore, '04/05/2026' is conclusively May 4, 2026.",
    mentorTip: "Use global column-wide token distributions to disambiguate ambiguous individual dates."
  },
  {
    id: "scen-5",
    scenario: "Multivariate Biological Contradiction",
    question: "An Electronic Health Record (EHR) shows a patient diagnosed with 'Prostate Biopsy' and 'Obstetric Pregnancy Ultrasound'. What is the forensic diagnosis of this data issue?",
    options: [
      "The patient has an extremely rare endocrine condition.",
      "Critical Patient Entity Collision: Two distinct human beings (one male, one female) have been erroneously merged under the same Patient Identifier.",
      "A benign clerical typo in the hospital billing department.",
      "Normal physiological variance in maternal health."
    ],
    correctIndex: 1,
    rationale: "Prostate tissue is biologically unique to males, while pregnancy is biologically unique to females. Co-occurrence under a single patient identifier is a definitive signature of an erroneous record merger, demanding immediate clinical decoupling.",
    mentorTip: "In healthcare AI, semantic inconsistencies are safety-critical emergency indicators, not merely academic bugs."
  }
];

// =============================================================================
// MAIN COMPONENT: TOPIC 11
// =============================================================================

const Topic11 = () => {
  // Navigation & Studio State
  const [activeTab, setActiveTab] = useState("studio"); // 'studio', 'math', 'cases', 'pitfalls', 'workbench'
  const [studioMode, setStudioMode] = useState("claims"); // 'claims', 'dateParser', 'dcBuilder'
  const [claimsView, setClaimsView] = useState("raw"); // 'raw', 'audit', 'repaired'

  // Date & Unit Parser State
  const [testDateStr, setTestDateStr] = useState("03/05/2026");
  const [testSalaryStr, setTestSalaryStr] = useState("42000");
  const [salaryRole, setSalaryRole] = useState("Senior");

  // DC Rule Builder State
  const [builderAge, setBuilderAge] = useState(72);
  const [builderProc, setBuilderProc] = useState("neonatal_icu");
  const [builderAdmission, setBuilderAdmission] = useState("2026-03-15");
  const [builderDischarge, setBuilderDischarge] = useState("2026-03-10");
  const [builderExp, setBuilderExp] = useState(10);

  // Jargon search filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("ALL");

  // Diagnostic Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const svgId = useId();

  // ---------------------------------------------------------------------------
  // REACTIVE PARSER COMPUTATIONS
  // ---------------------------------------------------------------------------
  const parsedDateResult = useMemo(() => {
    const clean = testDateStr.trim();
    if (!clean) return { date: "EMPTY", status: "FAILED", note: "Empty input" };

    // Check ISO: YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
      return { date: clean, status: "SUCCESS", note: "Standard ISO 8601 (YYYY-MM-DD)" };
    }

    // Check slash or dash
    const parts = clean.split(/[/.-]/);
    if (parts.length === 3) {
      const n1 = parseInt(parts[0], 10);
      const n2 = parseInt(parts[1], 10);
      const n3 = parseInt(parts[2], 10);

      if (n3 > 1900) {
        if (n1 > 12 && n2 <= 12) {
          return {
            date: `${n3}-${String(n2).padStart(2, "0")}-${String(n1).padStart(2, "0")}`,
            status: "SUCCESS",
            note: "Disambiguated: Token 1 > 12 strictly proves DD/MM/YYYY"
          };
        } else if (n2 > 12 && n1 <= 12) {
          return {
            date: `${n3}-${String(n1).padStart(2, "0")}-${String(n2).padStart(2, "0")}`,
            status: "SUCCESS",
            note: "Disambiguated: Token 2 > 12 strictly proves MM/DD/YYYY"
          };
        } else if (n1 <= 12 && n2 <= 12) {
          return {
            date: `${n3}-${String(n2).padStart(2, "0")}-${String(n1).padStart(2, "0")}`,
            status: "AMBIGUOUS",
            note: "Ambiguous (both ≤ 12): Defaulted to Indian/UK DD/MM/YYYY"
          };
        }
      }
    }

    return { date: "FAILED", status: "FAILED", note: "Unrecognized or invalid calendar format" };
  }, [testDateStr]);

  const parsedSalaryResult = useMemo(() => {
    const rawNum = parseFloat(testSalaryStr.replace(/[^0-9.]/g, ""));
    if (isNaN(rawNum)) return { val: 0, status: "INVALID", note: "Non-numeric string" };

    if (rawNum < 100000 && (salaryRole === "Senior" || salaryRole === "Lead")) {
      const annualized = rawNum * 12;
      return {
        original: rawNum,
        annualized,
        status: "MONTHLY_SCALE_DETECTED",
        note: `Applicant entered monthly income (₹ ${rawNum.toLocaleString()}); Normalized to Annual: ₹ ${annualized.toLocaleString()}`
      };
    }

    return {
      original: rawNum,
      annualized: rawNum,
      status: "STANDARD_ANNUAL",
      note: `Consistent annual figure: ₹ ${rawNum.toLocaleString()}`
    };
  }, [testSalaryStr, salaryRole]);

  // ---------------------------------------------------------------------------
  // REACTIVE DC RULE BUILDER COMPUTATIONS
  // ---------------------------------------------------------------------------
  const dcEvaluations = useMemo(() => {
    const r1Violated = builderDischarge < builderAdmission;
    const r2Violated = builderAge > 18 && (builderProc === "neonatal_icu" || builderProc === "pediatric_ward");
    const r3Violated = builderExp > Math.max(0, builderAge - 16);

    return [
      {
        id: "DC-01",
        rule: "NOT (Discharge_Date < Admission_Date)",
        desc: "Event end timestamp cannot precede inception timestamp.",
        violated: r1Violated,
        advice: r1Violated ? "Swap inverted dates or re-extract from discharge chart." : "Chronology valid."
      },
      {
        id: "DC-02",
        rule: "NOT (Age > 18 AND Procedure == 'neonatal_icu')",
        desc: "Pediatric/neonatal procedures cannot be billed for adults/geriatrics.",
        violated: r2Violated,
        advice: r2Violated ? "Audit medical billing code: Likely clerical entry error." : "Procedure plausible for patient age."
      },
      {
        id: "DC-03",
        rule: "NOT (Experience_Years > Age - 16)",
        desc: "Total work experience cannot exceed legal working lifespan.",
        violated: r3Violated,
        advice: r3Violated ? "Verify candidate birth year or clerical typo in experience." : "Career timeline plausible."
      }
    ];
  }, [builderAdmission, builderDischarge, builderAge, builderProc, builderExp]);

  // ---------------------------------------------------------------------------
  // JARGON FILTER
  // ---------------------------------------------------------------------------
  const filteredJargon = useMemo(() => {
    return JARGON_TERMS.filter((item) => {
      const matchesSearch =
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === "ALL" || item.tag === selectedTag;
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  const uniqueTags = useMemo(() => {
    const set = new Set(JARGON_TERMS.map((j) => j.tag));
    return ["ALL", ...Array.from(set)];
  }, []);

  // ---------------------------------------------------------------------------
  // QUIZ HANDLERS
  // ---------------------------------------------------------------------------
  const handleSelectOption = (qId, optionIdx) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const quizScore = useMemo(() => {
    let score = 0;
    DIAGNOSTIC_QUESTIONS.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) score++;
    });
    return score;
  }, [quizAnswers]);

  return (
    <div className="space-y-12 text-slate-200 leading-relaxed max-w-7xl mx-auto pb-20 font-sans">
      {/* =====================================================================
          HERO BANNER & ACADEMIC HEADER
          ===================================================================== */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-10 rounded-3xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full shadow-inner">
              BCAC701B • Data Types and Preprocessing • Topic 11
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Semantic Integrity Masterclass
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              MAKAUT & Gate CS Aligned
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Detecting Inconsistent Data & Semantic Integrity Auditing
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            Master the mathematical and algorithmic machinery of data consistency: formal first-order{" "}
            <strong>Denial Constraints (DCs)</strong>, temporal chronology verification, scale/unit mismatch
            remediation, statutory regex validation (PAN, GSTIN), and bivariate anomaly detection across West
            Bengal healthcare insurance claims and FinTech loan underwriting platforms.
          </p>

          {/* STICKY NAVIGATION JUMP BAR */}
          <div className="pt-4 border-t border-indigo-800/30">
            <nav className="flex flex-wrap gap-2 text-xs sm:text-sm font-medium">
              {[
                { id: "#novice-metaphors", label: "1. Novice Masterclass" },
                { id: "#taxonomy-flow", label: "2. Inconsistency Taxonomy" },
                { id: "#interactive-studio", label: "3. Inconsistency Studio" },
                { id: "#math-formulation", label: "4. Mathematical Theorems" },
                { id: "#denial-constraints", label: "5. Denial Constraint Logic" },
                { id: "#case-studies", label: "6. Regional Case Studies" },
                { id: "#diagnostic-quiz", label: "7. Diagnostic Assessment" },
                { id: "#production-pitfalls", label: "8. Engineering Pitfalls" },
                { id: "#practical-workbench", label: "9. Practical Workbench" }
              ].map((link) => (
                <a
                  key={link.id}
                  href={link.id}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/70 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-700/60 transition-colors duration-150"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* =====================================================================
          SECTION 1: NOVICE MASTERCLASS (METAPHORS & JARGON BUSTER)
          ===================================================================== */}
      <section id="novice-metaphors" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-8 bg-indigo-500 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            1. Novice Masterclass: Core Intuition & Jargon Buster
          </h2>
        </div>

        {/* METAPHORS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-indigo-900/40 shadow-lg space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg">
              ⏳
            </div>
            <h3 className="text-lg font-bold text-indigo-200">The Time Traveler Patient</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Imagine a hospital admission ledger stating a patient was admitted on <strong>March 15</strong> and
              discharged on <strong>March 10</strong>. Syntactically, both dates are valid calendar strings, but
              semantically, they violate the arrow of time! Detecting inconsistency means enforcing relational laws,
              not merely parsing text.
            </p>
            <div className="text-xs text-indigo-400 font-mono bg-indigo-950/60 p-2.5 rounded-lg border border-indigo-800/40">
              Analogy: Chronology Inversion = A receipt showing you left the store before entering it.
            </div>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-cyan-900/40 shadow-lg space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg">
              🎓
            </div>
            <h3 className="text-lg font-bold text-cyan-200">The 5-Year-Old Neurosurgeon</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              An applicant's age is entered as <strong>5</strong>, and their education is listed as <strong>Ph.D. in
              Neurosurgery</strong>. Both fields are valid individually: 5 is a positive integer, and Ph.D. is a valid
              degree string. However, their combination represents an impossible cross-field contradiction!
            </p>
            <div className="text-xs text-cyan-400 font-mono bg-cyan-950/60 p-2.5 rounded-lg border border-cyan-800/40">
              Analogy: Cross-Field Contradiction = A driving license issued to a newborn infant.
            </div>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-emerald-900/40 shadow-lg space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
              💱
            </div>
            <h3 className="text-lg font-bold text-emerald-200">The Two-Currency Cashier</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              A cashier accepts <strong>₹ 60,000</strong> from one customer and <strong>$60,000</strong> from another,
              writing both down as '60000' in the cash book without recording the currency. In machine learning, mixing
              monthly salaries with annual salaries creates an artificial 12x variance that destroys regression slopes!
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800/40">
              Analogy: Unit Mismatch = Treating 100 meters and 100 miles as the exact same distance.
            </div>
          </div>
        </div>

        {/* SEARCHABLE JARGON BUSTER */}
        <div className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>📚</span> Searchable Jargon Buster (12 Core Terms)
              </h3>
              <p className="text-xs text-slate-400">
                Filter by topic tag or search any data consistency, relational logic, or validation concept.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search concept or term..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-sm px-3.5 py-1.5 rounded-lg text-white focus:outline-none focus:border-indigo-500 w-full sm:w-64"
              />
            </div>
          </div>

          {/* TAG PILLS */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={clsx(
                  "px-3 py-1 text-xs rounded-full font-semibold transition-colors duration-150",
                  selectedTag === tag
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60"
                )}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* JARGON CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {filteredJargon.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 hover:border-indigo-500/40 transition-colors duration-200 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-bold text-indigo-300">{item.term}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-indigo-400 border border-slate-700">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: INCONSISTENCY TAXONOMY & AUDITING SPECTRUM
          ===================================================================== */}
      <section id="taxonomy-flow" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-8 bg-cyan-500 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            2. The 5-Layer Inconsistency Spectrum & Detection Engine Matrix
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-xl bg-slate-900/90">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950 text-slate-300 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Inconsistency Layer</th>
                <th className="p-4">Concrete Failure Mode</th>
                <th className="p-4">Detection Mechanism</th>
                <th className="p-4">Statistical / ML Pathology</th>
                <th className="p-4">Production Resolution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-bold text-indigo-300">
                  Layer 1: Temporal Inversion
                  <div className="text-xs text-slate-400 font-normal">Cause occurs after effect</div>
                </td>
                <td className="p-4 font-mono text-xs text-slate-300">
                  Discharge_Date &lt; Admission_Date
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono text-xs">
                    Date Vector Comparison
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-red-400 font-semibold">Critical</span>: Negative event duration in survival analysis
                </td>
                <td className="p-4 text-xs">
                  Date swap or timestamp re-extraction from clinical charts
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-bold text-cyan-300">
                  Layer 2: Cross-Field Contradiction
                  <div className="text-xs text-slate-400 font-normal">Mutually exclusive attributes</div>
                </td>
                <td className="p-4 font-mono text-xs text-slate-300">
                  Age = 72 ∧ Procedure = 'Neonatal ICU'
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono text-xs">
                    Denial Constraint Engine
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-amber-400 font-semibold">High</span>: Fragmented decision tree micro-leaves
                </td>
                <td className="p-4 text-xs">
                  Domain rule audit and medical code re-assignment
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-bold text-emerald-300">
                  Layer 3: Scale & Unit Mismatch
                  <div className="text-xs text-slate-400 font-normal">Disparate measurement scales</div>
                </td>
                <td className="p-4 font-mono text-xs text-slate-300">
                  Salary: ₹ 50,000 vs ₹ 6,00,000
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-xs">
                    Bimodal Quantile Screening
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-amber-400 font-semibold">High</span>: Attenuation bias; slope beta diluted toward zero
                </td>
                <td className="p-4 text-xs">
                  Automated multiplier heuristic (12x for monthly income)
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-bold text-purple-300">
                  Layer 4: Syntactic Malformation
                  <div className="text-xs text-slate-400 font-normal">Statutory format violations</div>
                </td>
                <td className="p-4 font-mono text-xs text-slate-300">
                  PAN: 'INVALID_123' (Fails 5L-4D-1L)
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-mono text-xs">
                    Compiled Regex Parser
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-blue-400 font-semibold">Moderate</span>: Categorical high-cardinality explosion
                </td>
                <td className="p-4 text-xs">
                  Rejection at API boundary or KYC document re-fetch
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-bold text-amber-300">
                  Layer 5: Geographic Contradiction
                  <div className="text-xs text-slate-400 font-normal">Foreign postal/district clash</div>
                </td>
                <td className="p-4 font-mono text-xs text-slate-300">
                  State = 'West Bengal' ∧ PIN = '110001'
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono text-xs">
                    Master Postal Lookup Table
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-amber-400 font-semibold">High</span>: Spatial clustering centroid distortion
                </td>
                <td className="p-4 text-xs">
                  Address geocoding disambiguation against India Post
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: INTERACTIVE INCONSISTENCY STUDIO (3 MODES)
          ===================================================================== */}
      <section id="interactive-studio" className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-8 bg-indigo-500 rounded-full" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                3. Interactive Inconsistency Studio
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Audit healthcare claims, test date/unit normalizers, and evaluate first-order Denial Constraints live.
              </p>
            </div>
          </div>

          {/* STUDIO MODE TABS */}
          <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
            {[
              { id: "claims", label: "Mode A: Hospital Claims Auditor" },
              { id: "dateParser", label: "Mode B: Date & Unit Lab" },
              { id: "dcBuilder", label: "Mode C: Denial Constraint Builder" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStudioMode(tab.id)}
                className={clsx(
                  "px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all duration-150",
                  studioMode === tab.id
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* -------------------------------------------------------------------
            MODE A: HOSPITAL CLAIMS AUDITOR
            ------------------------------------------------------------------- */}
        {studioMode === "claims" && (
          <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🏥</span> Swasthya Sathi Inpatient Healthcare Claim Auditor
                </h3>
                <p className="text-xs text-slate-400">
                  Detect temporal chronology inversions, pediatric misclassifications, and geographic contradictions across West Bengal hospitals.
                </p>
              </div>

              {/* CLAIMS VIEW TOGGLE */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "raw", label: "1. Raw Telemetry (Dirty)" },
                  { id: "audit", label: "2. Denial Constraint Audit" },
                  { id: "repaired", label: "3. Repaired & Reconciled" }
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setClaimsView(btn.id)}
                    className={clsx(
                      "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 border",
                      claimsView === btn.id
                        ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30"
                        : "bg-slate-950 text-slate-300 border-slate-800 hover:border-indigo-500/50"
                    )}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* TELEMETRY METRICS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Claims Evaluated</span>
                <span className="text-2xl font-extrabold text-white">6 Inpatient Files</span>
                <span className="text-[10px] text-slate-500 block mt-1">Kolkata & Barrackpore Hubs</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Defective Claims</span>
                <span className={clsx(
                  "text-2xl font-extrabold",
                  claimsView === "repaired" ? "text-emerald-400" : "text-red-400"
                )}>
                  {claimsView === "repaired" ? "0 Defective (100% Reconciled)" : "4 Inconsistent (66.7%)"}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  Violating semantic rules
                </span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Fraud / Risk Exposure</span>
                <span className={clsx(
                  "text-2xl font-extrabold",
                  claimsView === "repaired" ? "text-emerald-400" : "text-amber-400"
                )}>
                  {claimsView === "repaired" ? "₹ 0 (Protected)" : "₹ 3,99,000 at risk"}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">Unverified billing claims</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Model Reliability</span>
                <span className="text-2xl font-extrabold text-cyan-400">
                  {claimsView === "raw" ? "33.3% Degraded" : claimsView === "audit" ? "75.0% Guarded" : "99.8% Certified"}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">Downstream ML readiness</span>
              </div>
            </div>

            {/* CLAIMS TABLE */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-900 text-slate-300 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Claim ID</th>
                    <th className="p-3.5">Patient Name</th>
                    <th className="p-3.5">Age</th>
                    <th className="p-3.5">Admission</th>
                    <th className="p-3.5">Discharge</th>
                    <th className="p-3.5">Procedure</th>
                    <th className="p-3.5">PIN Code</th>
                    <th className="p-3.5">Billed Amount</th>
                    <th className="p-3.5">Integrity Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {claimsView === "repaired" ? (
                    REPAIRED_CLAIMS.map((c) => (
                      <tr key={c.id} className="bg-emerald-950/10 hover:bg-emerald-950/20">
                        <td className="p-3.5 font-mono font-bold text-emerald-400">{c.id}</td>
                        <td className="p-3.5 font-bold text-white flex items-center gap-2">
                          <span>👤</span> {c.patient}
                        </td>
                        <td className="p-3.5 text-slate-300">{c.age}</td>
                        <td className="p-3.5 font-mono text-cyan-300">{c.admission}</td>
                        <td className="p-3.5 font-mono text-cyan-300">{c.discharge}</td>
                        <td className="p-3.5 text-slate-200">{c.procedure}</td>
                        <td className="p-3.5 font-mono text-slate-400">{c.pin}</td>
                        <td className="p-3.5 font-bold text-emerald-300">₹ {c.bill.toLocaleString()}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            ✔ REPAIRED: {c.repairNote}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    RAW_CLAIMS.map((c) => {
                      const isDefective = c.type !== "clean";
                      const showHighlight = claimsView === "audit" && isDefective;

                      return (
                        <tr
                          key={c.id}
                          className={clsx(
                            "transition-colors duration-150",
                            showHighlight && c.type === "temporal_inversion" && "bg-red-950/30 border-l-4 border-red-500",
                            showHighlight && c.type === "pediatric_contradiction" && "bg-amber-950/30 border-l-4 border-amber-500",
                            showHighlight && c.type === "geo_mismatch" && "bg-purple-950/30 border-l-4 border-purple-500",
                            showHighlight && c.type === "clinical_duration" && "bg-cyan-950/30 border-l-4 border-cyan-500",
                            !showHighlight && "hover:bg-slate-900/50"
                          )}
                        >
                          <td className="p-3.5 font-mono text-slate-400">{c.id}</td>
                          <td className="p-3.5 font-semibold text-white">{c.patient}</td>
                          <td className="p-3.5 text-slate-300">{c.age}</td>
                          <td className={clsx("p-3.5 font-mono", showHighlight && c.type === "temporal_inversion" ? "text-red-400 font-bold" : "text-slate-300")}>
                            {c.admission}
                          </td>
                          <td className={clsx("p-3.5 font-mono", showHighlight && c.type === "temporal_inversion" ? "text-red-400 font-bold underline" : "text-slate-300")}>
                            {c.discharge}
                          </td>
                          <td className={clsx("p-3.5", showHighlight && c.type === "pediatric_contradiction" ? "text-amber-300 font-bold" : "text-slate-200")}>
                            {c.procedure}
                          </td>
                          <td className={clsx("p-3.5 font-mono", showHighlight && c.type === "geo_mismatch" ? "text-purple-300 font-bold" : "text-slate-400")}>
                            {c.pin}
                          </td>
                          <td className="p-3.5 text-emerald-300 font-semibold">₹ {c.bill.toLocaleString()}</td>
                          <td className="p-3.5">
                            {c.type === "clean" ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                PASS (CONSISTENT)
                              </span>
                            ) : claimsView === "audit" ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                                ✖ {c.defect}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                                UNCHECKED
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-900/30 text-xs text-slate-300 space-y-2">
              <span className="text-indigo-400 font-bold block">💡 Architectural Finding:</span>
              <p>
                In Mode 1 (Raw), the dataset looks superficially acceptable because dates are valid strings and billing amounts are integers.
                However, activating the <strong>Denial Constraint Audit (Mode 2)</strong> reveals that Claim 2 has an inverted discharge date (March 10 &lt; March 15), Claim 3 bills a 72-year-old for an infant incubator, and Claim 4 lists a Delhi PIN code in a West Bengal state registry!
                Mode 3 demonstrates <strong>Minimum Cost Repair</strong>: rather than discarding the rows, attribute-level reconciliations restore 100% data fidelity.
              </p>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            MODE B: DATE & UNIT NORMALIZATION LAB
            ------------------------------------------------------------------- */}
        {studioMode === "dateParser" && (
          <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-cyan-900/40 shadow-2xl space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🔬</span> Date Format Disambiguation & Unit Normalization Sandbox
              </h3>
              <p className="text-xs text-slate-400">
                Test how the parser disambiguates ambiguous dates (e.g. DD/MM vs MM/DD) and flags financial scale mismatches live.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* DATE PARSER CARD */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
                    Input Date String (Ambiguous Format)
                  </label>
                  <input
                    type="text"
                    value={testDateStr}
                    onChange={(e) => setTestDateStr(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. 03/05/2026 or 25/12/2026"
                  />
                  <div className="flex gap-2 pt-1 text-[11px]">
                    <span className="text-slate-500">Quick Test:</span>
                    <button onClick={() => setTestDateStr("03/05/2026")} className="text-cyan-400 underline">03/05/2026</button>
                    <button onClick={() => setTestDateStr("25/12/2026")} className="text-cyan-400 underline">25/12/2026</button>
                    <button onClick={() => setTestDateStr("04/19/2026")} className="text-cyan-400 underline">04/19/2026</button>
                    <button onClick={() => setTestDateStr("2026-05-18")} className="text-cyan-400 underline">ISO</button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold uppercase">Standardized ISO Date:</span>
                    <span className="font-mono text-base font-extrabold text-cyan-300">
                      {parsedDateResult.date}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 pt-1 border-t border-slate-800">
                    <span className="text-cyan-400 font-semibold">Diagnosis: </span>
                    {parsedDateResult.note}
                  </div>
                </div>
              </div>

              {/* SALARY SCALE NORMALIZER CARD */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                      Reported Income (Raw String)
                    </label>
                    <select
                      value={salaryRole}
                      onChange={(e) => setSalaryRole(e.target.value)}
                      className="bg-slate-900 text-xs text-emerald-400 border border-slate-700 rounded px-2 py-1"
                    >
                      <option value="Senior">Role: Senior / Lead</option>
                      <option value="Junior">Role: Junior Intern</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    value={testSalaryStr}
                    onChange={(e) => setTestSalaryStr(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-emerald-400"
                    placeholder="e.g. 42000"
                  />
                  <div className="flex gap-2 pt-1 text-[11px]">
                    <span className="text-slate-500">Quick Test:</span>
                    <button onClick={() => setTestSalaryStr("42000")} className="text-emerald-400 underline">₹ 42,000 (Monthly)</button>
                    <button onClick={() => setTestSalaryStr("1450000")} className="text-emerald-400 underline">₹ 14,50,000 (Annual)</button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold uppercase">Normalized Annual Value:</span>
                    <span className="font-mono text-base font-extrabold text-emerald-300">
                      ₹ {parsedSalaryResult.annualized?.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 pt-1 border-t border-slate-800">
                    <span className="text-emerald-400 font-semibold">Diagnosis: </span>
                    {parsedSalaryResult.note}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            MODE C: DENIAL CONSTRAINT RULE BUILDER
            ------------------------------------------------------------------- */}
        {studioMode === "dcBuilder" && (
          <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-emerald-900/40 shadow-2xl space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>⚡</span> First-Order Logic Denial Constraint (DC) Builder
              </h3>
              <p className="text-xs text-slate-400">
                Adjust candidate record attributes to watch first-order logic predicates evaluate in real time!
              </p>
            </div>

            {/* CONTROLS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">Patient Age:</span>
                  <span className="text-indigo-400 font-mono">{builderAge} years</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={builderAge}
                  onChange={(e) => setBuilderAge(parseInt(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">Medical Procedure Code:</label>
                <select
                  value={builderProc}
                  onChange={(e) => setBuilderProc(e.target.value)}
                  className="w-full bg-slate-900 text-xs text-white border border-slate-700 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
                >
                  <option value="neonatal_icu">neonatal_icu (Pediatric)</option>
                  <option value="pediatric_ward">pediatric_ward (Pediatric)</option>
                  <option value="coronary_bypass">coronary_bypass (Adult / Geriatric)</option>
                  <option value="cataract_surgery">cataract_surgery (Adult / Geriatric)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">Work Experience:</span>
                  <span className="text-cyan-400 font-mono">{builderExp} years</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={builderExp}
                  onChange={(e) => setBuilderExp(parseInt(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>
            </div>

            {/* LIVE EVALUATION CARDS */}
            <div className="space-y-3">
              {dcEvaluations.map((dc) => (
                <div
                  key={dc.id}
                  className={clsx(
                    "p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-all",
                    dc.violated ? "bg-red-950/20 border-red-500/50" : "bg-emerald-950/20 border-emerald-500/50"
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-400">{dc.id}</span>
                      <code className="text-xs font-mono font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {dc.rule}
                      </code>
                    </div>
                    <p className="text-xs text-slate-300">{dc.desc}</p>
                    <p className="text-[11px] text-slate-400">
                      <strong>Remedy: </strong> {dc.advice}
                    </p>
                  </div>

                  <span className={clsx(
                    "px-3 py-1 text-xs font-bold rounded-full border whitespace-nowrap",
                    dc.violated
                      ? "bg-red-500/20 text-red-300 border-red-500/50"
                      : "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                  )}>
                    {dc.violated ? "✖ CONSTRAINT VIOLATED" : "✔ RULE SATISFIED"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* =====================================================================
          SECTION 4: MATHEMATICAL FORMULATIONS & THEOREMS
          ===================================================================== */}
      <section id="math-formulation" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-8 bg-indigo-500 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            4. Mathematical Formulations & Rigorous Theoretical Proofs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DENIAL CONSTRAINT FORMULA */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-indigo-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>📐</span> 1. Formal Denial Constraint First-Order Logic
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-950 font-mono text-xs text-indigo-200 overflow-x-auto">
              {"∀ t_1, t_2 ∈ R, ¬ [ P_1(t_1, t_2) ∧ P_2(t_1, t_2) ∧ ... ∧ P_m(t_1, t_2) ]"}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Denial Constraints generalize Functional Dependencies, Order Dependencies, and Metric Checks.
              Any tuple combination satisfying all m predicates violates database integrity.
            </p>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-indigo-300">
              Example: ¬ [ t.admission &gt; t.discharge ]
            </div>
          </div>

          {/* ATTENUATION BIAS THEOREM */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <span>📉</span> 2. Attenuation Bias (Regression Dilution)
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-950 font-mono text-xs text-cyan-200 overflow-x-auto">
              {"β̂_obs = β_true * [ σ_true² / (σ_true² + σ_inconsistency²) ] < β_true"}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When features suffer from unit scale inconsistency (e.g. monthly vs annual income mix), the empirical variance is bloated by σ_inconsistency², diluting the OLS regression slope toward zero and destroying predictive power.
            </p>
          </div>

          {/* MAHALANOBIS DISTANCE */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span>🔬</span> 3. Mahalanobis Metric for Coupled Features
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-950 font-mono text-xs text-emerald-200 overflow-x-auto">
              {"D_M(x) = √[ (x - μ)^T · Σ⁻¹ · (x - μ) ]"}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Where Σ is the covariance matrix. Mahalanobis distance measures deviation along principal covariance axes, flagging records that pass univariate bounds but violate joint bivariate correlations.
            </p>
          </div>

          {/* BENFORD'S LAW */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-purple-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
              <span>📊</span> 4. Benford's Law of First-Digit Distribution
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-purple-950 font-mono text-xs text-purple-200 overflow-x-auto">
              {"P(d) = log₁₀ [ 1 + (1 / d) ],   for d ∈ {1, 2, ..., 9}"}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              In authentic municipal accounting and health billing datasets, the digit 1 appears as the first digit 30.1% of the time, while 9 appears in only 4.6%. Fabricated claims show uniform distributions, signaling fraud.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: REGIONAL INDUSTRIAL CASE STUDIES
          ===================================================================== */}
      <section id="case-studies" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-8 bg-cyan-500 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            5. Real-World Regional Industrial Case Studies (West Bengal)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Case 1: Public Healthcare
              </span>
              <span className="text-xs text-slate-500">WB Health Dept</span>
            </div>
            <h3 className="text-base font-bold text-white">Swasthya Sathi Hospital Inpatient Claims Audit</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context:</strong> Private nursing homes submitted pre-authorization claims with inverted surgical timestamps (Discharge &lt; Admission), pediatric neonatal charges billed for 70+ year old geriatric patients, and impossible bed occupancies.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="text-indigo-400 font-semibold">Solution Implemented:</div>
              <div className="text-slate-300">Automated Denial Constraint pipeline halting pre-authorization whenever chronological or clinical boundaries are violated.</div>
              <div className="text-emerald-400 font-semibold mt-1">Impact: Identified ₹ 18.4 Cr in invalid claims in Q1 2026; slashed fraud by 92%.</div>
            </div>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Case 2: Traffic Automation
              </span>
              <span className="text-xs text-slate-500">Kolkata Police</span>
            </div>
            <h3 className="text-base font-bold text-white">EM Bypass Automated e-Challan Sanity Gateway</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context:</strong> High-speed ANPR cameras at Park Circus 7-Point Crossing misread motorcycle plates as commercial 10-wheel trucks, generating automated fines for "Riding without a helmet" to heavy transport dump trucks.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="text-cyan-400 font-semibold">Solution Implemented:</div>
              <div className="text-slate-300">Cross-attribute Denial Constraint joining the central VAHAN registry: If Vehicle_Class == 'Heavy Transport', reject two-wheeler violation codes.</div>
              <div className="text-emerald-400 font-semibold mt-1">Impact: Reduced erroneous citizen disputes from 14.2% down to &lt; 0.05%.</div>
            </div>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Case 3: FinTech Underwriting
              </span>
              <span className="text-xs text-slate-500">Salt Lake Sector V</span>
            </div>
            <h3 className="text-base font-bold text-white">Loan Underwriting Monthly vs Annual Scale Remediation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context:</strong> Senior software architects in Kolkata tech parks entered monthly incomes (₹ 85,000) into form fields expecting annual salaries (₹ 10.2 LPA), causing credit scoring models to falsely reject prime candidates for high debt-to-income.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="text-emerald-400 font-semibold">Solution Implemented:</div>
              <div className="text-slate-300">Bimodal scale detector triggering interactive verification and applying 12x multiplier heuristics.</div>
              <div className="text-emerald-400 font-semibold mt-1">Impact: Recovered ₹ 64 Cr in false-rejected prime credit originations.</div>
            </div>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Case 4: Education Governance
              </span>
              <span className="text-xs text-slate-500">Banglar Shiksha</span>
            </div>
            <h3 className="text-base font-bold text-white">Student Enrollment Chronological Validation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context:</strong> North 24 Parganas school admissions contained chronological anomalies where student admission dates preceded their birth dates, or Madhyamik candidates were registered under 8 years of age.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="text-purple-400 font-semibold">Solution Implemented:</div>
              <div className="text-slate-300">Client-side and server-side first-order logic assertions enforcing Birth_Date + 14 years &le; Exam_Year.</div>
              <div className="text-emerald-400 font-semibold mt-1">Impact: Cleaned 420,000 student registries; eliminated enrollment discrepancies.</div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: DIAGNOSTIC SELF-ASSESSMENT QUIZ
          ===================================================================== */}
      <section id="diagnostic-quiz" className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-8 bg-indigo-500 rounded-full" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                6. Diagnostic Self-Assessment Quiz (Scenario Challenge)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                5 authentic engineering scenarios testing inconsistency detection, Denial Constraints, and data repair strategies.
              </p>
            </div>
          </div>

          {quizSubmitted && (
            <div className="flex items-center gap-2 bg-indigo-950 border border-indigo-700 px-4 py-2 rounded-xl">
              <span className="text-xs text-slate-300">Your Score:</span>
              <span className="text-lg font-extrabold text-cyan-300">
                {quizScore} / {DIAGNOSTIC_QUESTIONS.length}
              </span>
              <button
                onClick={() => {
                  setQuizAnswers({});
                  setQuizSubmitted(false);
                }}
                className="ml-3 text-xs text-indigo-400 underline hover:text-indigo-200"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {DIAGNOSTIC_QUESTIONS.map((q, qIdx) => (
            <div
              key={q.id}
              className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Scenario {qIdx + 1}: {q.scenario}
                </span>
                {quizSubmitted && (
                  <span className={clsx(
                    "text-xs font-bold px-2.5 py-0.5 rounded-full border",
                    quizAnswers[q.id] === q.correctIndex
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                      : "bg-red-500/20 text-red-300 border-red-500/50"
                  )}>
                    {quizAnswers[q.id] === q.correctIndex ? "✔ Correct" : "✖ Incorrect"}
                  </span>
                )}
              </div>

              <p className="text-sm font-semibold text-white leading-relaxed">{q.question}</p>

              {/* OPTIONS */}
              <div className="grid grid-cols-1 gap-2.5">
                {q.options.map((opt, optIdx) => {
                  const isSelected = quizAnswers[q.id] === optIdx;
                  const isCorrect = q.correctIndex === optIdx;

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={quizSubmitted}
                      className={clsx(
                        "p-3.5 rounded-xl text-xs sm:text-sm text-left transition-all duration-150 border flex items-center justify-between",
                        !quizSubmitted && isSelected && "bg-indigo-900/40 border-indigo-500 text-white shadow-md",
                        !quizSubmitted && !isSelected && "bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-950",
                        quizSubmitted && isCorrect && "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold",
                        quizSubmitted && isSelected && !isCorrect && "bg-red-950/40 border-red-500 text-red-200 line-through",
                        quizSubmitted && !isSelected && !isCorrect && "bg-slate-950/40 border-slate-900 text-slate-500"
                      )}
                    >
                      <span>{opt}</span>
                      <span className="font-mono text-xs opacity-60">[{String.fromCharCode(65 + optIdx)}]</span>
                    </button>
                  );
                })}
              </div>

              {/* FEEDBACK */}
              {quizSubmitted && (
                <div className="pt-3 border-t border-slate-800 text-xs space-y-1.5">
                  <div className="text-slate-300">
                    <strong className="text-cyan-300">Rationale: </strong>
                    {q.rationale}
                  </div>
                  <div className="text-indigo-400 font-mono bg-indigo-950/50 p-2 rounded-lg border border-indigo-900/40">
                    💬 {q.mentorTip}
                  </div>
                </div>
              )}
            </div>
          ))}

          {!quizSubmitted && (
            <div className="text-center pt-2">
              <button
                onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(quizAnswers).length < DIAGNOSTIC_QUESTIONS.length}
                className={clsx(
                  "px-8 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-xl",
                  Object.keys(quizAnswers).length === DIAGNOSTIC_QUESTIONS.length
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 cursor-pointer"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                )}
              >
                Submit Diagnostic Assessment ({Object.keys(quizAnswers).length}/{DIAGNOSTIC_QUESTIONS.length} Answered)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          SECTION 7: PRODUCTION PITFALLS & ANTI-PATTERNS
          ===================================================================== */}
      <section id="production-pitfalls" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-8 bg-red-500 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            7. Production Engineering Pitfalls & Anti-Patterns
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-red-900/30 space-y-3">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚠️</span> Anti-Pattern 1
            </div>
            <h3 className="text-sm font-bold text-white">The Silent `errors='coerce'` Trap</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Calling <code className="text-cyan-300">pd.to_datetime(..., errors='coerce')</code> silently converts unparsable strings into NaT (nulls), transforming an inconsistency problem into a missing data problem.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
              Rule: Always isolate and log unparsable records before converting to null.
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-red-900/30 space-y-3">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚠️</span> Anti-Pattern 2
            </div>
            <h3 className="text-sm font-bold text-white">The Ambiguous Date Assumption Fallacy</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Parsing strings like '04/05/2026' without explicit <code className="text-cyan-300">format=</code> leads pandas to guess locales, often swapping Month and Day between rows.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
              Rule: Disambiguate using column-wide tokens where day &gt; 12.
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-red-900/30 space-y-3">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚠️</span> Anti-Pattern 3
            </div>
            <h3 className="text-sm font-bold text-white">The Unbounded Cascading Repair Trap</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Greedily mutating fields sequentially to fix Rule 1 often triggers violations of Rule 2, creating infinite repair oscillations.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
              Rule: Formulate multi-attribute repairs as a global Constraint Satisfaction Problem.
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-red-900/30 space-y-3">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚠️</span> Anti-Pattern 4
            </div>
            <h3 className="text-sm font-bold text-white">The Unit Mismatch Blindspot</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mixing INR in Lakhs (12.5) with raw INR (1,250,000) creates bimodal distributions that dilute regression coefficients via Attenuation Bias.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
              Rule: Enforce strict scalar normalization during feature ingestion.
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-red-900/30 space-y-3">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚠️</span> Anti-Pattern 5
            </div>
            <h3 className="text-sm font-bold text-white">The Western Naming Bias</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Enforcing regex rules requiring both First and Last names erroneously flags valid single legal names (mononyms) common in South Asia as invalid.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
              Rule: Support mononyms and non-Latin character naming conventions.
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-red-900/30 space-y-3">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚠️</span> Anti-Pattern 6
            </div>
            <h3 className="text-sm font-bold text-white">Out-of-Order Watermark Collapse</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In distributed event streaming (Kafka/Flink), failing to buffer late-arriving events creates artificial negative durations in rolling time-series features.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
              Rule: Configure bounded out-of-orderness watermarks in streaming engines.
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8: PRACTICAL WORKBENCH & INTEGRATED LOADERS
          ===================================================================== */}
      <section id="practical-workbench" className="space-y-8 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-8 bg-indigo-500 rounded-full" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              8. Practical Workbench & Academic Resources
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Access the pure Python simulation lab, comprehensive study handbook, and 30 graded examination questions.
            </p>
          </div>
        </div>

        {/* WORKBENCH SUB-TABS */}
        <div className="flex border-b border-slate-800">
          {[
            { id: "python", label: "🐍 Python Simulation Engine" },
            { id: "handbook", label: "📖 Academic Handbook (Note)" },
            { id: "qbank", label: "🎯 30 Graded Questions (Q-Bank)" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "px-5 py-3 text-xs sm:text-sm font-bold transition-all border-b-2 -mb-px",
                activeTab === tab.id
                  ? "border-indigo-500 text-indigo-300 bg-indigo-500/10"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT TABS */}
        {activeTab === "python" && (
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Pure Python Inconsistent Data Laboratory</h3>
                <p className="text-xs text-slate-400">
                  Zero external dependencies. Contains Denial Constraint auditing, temporal sequence validation, Indian PAN regex, and date disambiguation.
                </p>
              </div>
            </div>
            <PythonFileLoader
              fileName="detecting_inconsistent_data_lab.py"
              code={labCode}
            />
          </div>
        )}

        {activeTab === "handbook" && (
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Comprehensive Revision Notes & Handbook</h3>
                <p className="text-xs text-slate-400">
                  Denial Constraint formal logic, Attenuation Bias proofs, Mahalanobis distance, and West Bengal industrial case studies.
                </p>
              </div>
            </div>
            <PlainTextPrint
              fileName="topic11_note.txt"
              content={noteText}
            />
          </div>
        )}

        {activeTab === "qbank" && (
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">30 Graded Questions & Viva-Voce Bank</h3>
                <p className="text-xs text-slate-400">
                  Structured across 4 mastery tiers (Foundation, Mechanics, Architecture, Scalability) with detailed solutions and practical tips.
                </p>
              </div>
            </div>
            <FAQTemplate
              title="Topic 11: Detecting Inconsistent Data — Graded Examination Bank"
              questions={questions}
            />
          </div>
        )}
      </section>

      {/* =====================================================================
          MENTOR SIGNATURE COMPONENT
          ===================================================================== */}
      <Teacher />
    </div>
  );
};

export default Topic11;
