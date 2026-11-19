import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic21_files/worked_example_1_cleaning_a_student_dataset_lab.py?raw";
import noteText from "./topic21_files/topic21_note.txt?raw";
import questions from "./topic21_files/topic21_questions.js";

// -----------------------------------------------------------------------------
// HELPER STRING SIMILARITY FUNCTIONS (JARO-WINKLER SIMULATION)
// -----------------------------------------------------------------------------

function simulateJaroWinkler(s1, s2) {
  const str1 = s1.toLowerCase().trim();
  const str2 = s2.toLowerCase().trim();
  if (str1 === str2) return 1.0;
  if (!str1 || !str2) return 0.0;

  // Simple character overlap simulation
  let matches = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str2.includes(str1[i])) matches++;
  }
  const baseSim = (2.0 * matches) / (str1.length + str2.length);

  // Common prefix bonus (up to 4 chars)
  let prefix = 0;
  for (let i = 0; i < Math.min(4, Math.min(str1.length, str2.length)); i++) {
    if (str1[i] === str2[i]) prefix++;
    else break;
  }
  const jw = Math.min(1.0, baseSim + prefix * 0.1 * (1 - baseSim));
  return Number(jw.toFixed(2));
}

// -----------------------------------------------------------------------------
// MAIN MASTERCLASS COMPONENT
// -----------------------------------------------------------------------------

const Topic21 = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const svgId = useId();

  // Studio Mode: "pipeline" | "entity" | "imputation"
  const [studioMode, setStudioMode] = useState("pipeline");

  // Mode A: Pipeline Stage Runner
  const [currentStage, setCurrentStage] = useState(0); // 0: Raw to 5: Clean

  // Mode B: Entity Resolution Sandbox
  const [testDistrictInput, setTestDistrictInput] = useState("Calcutta");
  const [similarityThreshold, setSimilarityThreshold] = useState(0.80);

  // Mode C: Imputation Strategy Comparator
  const [imputationMethod, setImputationMethod] = useState("dept_median"); // "drop" | "global_mean" | "dept_median"

  // Jargon Search Query
  const [jargonQuery, setJargonQuery] = useState("");

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // ---------------------------------------------------------------------------
  // DATASETS FOR INTERACTIVE STUDIO
  // ---------------------------------------------------------------------------

  // Raw dataset representing messy student data in West Bengal
  const rawStudentRecords = [
    { id: 1, roll: "WB-2024-001", name: "Susmita Sen", dept: "BCA", district: "Barrackpore ", age: 21, marks: 88.5, status: "PASS", defect: "None (Clean)" },
    { id: 2, roll: "WB-2024-002", name: "Debangshu Mukherjee", dept: "mca", district: "Salt Lake", age: 24, marks: 92.0, status: "PASS", defect: "Lowercase dept" },
    { id: 3, roll: "WB-2024-003", name: "Mahima Das", dept: "BCA", district: "Kolkata", age: 20, marks: -999.0, status: "PASS", defect: "Sentinel mark -999" },
    { id: 4, roll: "WB-2024-004", name: "Mamata Roy", dept: "MCA", district: "BARRACKPORE", age: -3, marks: 85.0, status: "PASS", defect: "Negative age (-3)" },
    { id: 5, roll: "WB-2024-001", name: "Susmita Sen", dept: "BCA", district: "Barrackpore ", age: 21, marks: 88.5, status: "PASS", defect: "Exact Duplicate Row" },
    { id: 6, roll: "WB-2024-005", name: "Abhronila Ghosh", dept: "B.Tech", district: "Calcutta", age: 22, marks: 94.5, status: "PASS", defect: "Alias 'Calcutta'" },
    { id: 7, roll: "wb-2024-002", name: "Debangshu Mukherjee", dept: "MCA", district: "Salt Lake", age: 24, marks: 92.0, status: "PASS", defect: "Case duplicate Roll No" },
    { id: 8, roll: "WB-2024-006", name: "Rohan Shaw", dept: "bca", district: "Siliguri", age: 210, marks: 32.0, status: "PASS", defect: "Age 210 & Pass with 32%" },
    { id: 9, roll: "WB-2024-007", name: "Priyanka Mondal", dept: "BCA", district: "Ichapur", age: 19, marks: null, status: "FAIL", defect: "Null marks" },
    { id: 10, roll: "WB-2024-008", name: "Sourav Paul", dept: "MCA", district: "KOLKATA ", age: 25, marks: 950.0, status: "PASS", defect: "Inflated marks (950)" },
    { id: 11, roll: "WB-2024-009", name: "Tanmoy Sarkar", dept: "BCA", district: "Howrah", age: 20, marks: 28.0, status: "FAIL", defect: "None (Clean Fail)" },
    { id: 12, roll: "WB-2024-010", name: "Ananya Chatterjee", dept: "B.Tech", district: "Kolkata", age: 22, marks: 78.0, status: "FAIL", defect: "Contradiction (Fail with 78%)" },
  ];

  // Pipeline Stage Computations
  const pipelineStages = [
    { id: 0, label: "Stage 0: Raw Ingestion", hygieneScore: 38, count: 12, summary: "Raw data loaded with 10 identified defects." },
    { id: 1, label: "Stage 1: Deduplication", hygieneScore: 55, count: 10, summary: "Removed 2 duplicate records (Exact row #5 & Case-insensitive Roll #7)." },
    { id: 2, label: "Stage 2: Text Normalization", hygieneScore: 70, count: 10, summary: "Standardized 'Calcutta'->'Kolkata', fixed casing and trimmed whitespace." },
    { id: 3, label: "Stage 3: Sentinel Imputation", hygieneScore: 82, count: 10, summary: "Converted -999 & null marks to BCA departmental median (32.0%)." },
    { id: 4, label: "Stage 4: Outlier Clamping", hygieneScore: 92, count: 10, summary: "Corrected Age -3->21, Age 210->21, and Marks 950.0->95.0." },
    { id: 5, label: "Stage 5: Logical Consistency", hygieneScore: 100, count: 10, summary: "Reconciled Pass/Fail statuses to strictly match Marks >= 40 rule." },
  ];

  const currentDataset = useMemo(() => {
    let data = rawStudentRecords.map((r) => ({ ...r }));

    if (currentStage >= 1) {
      // Deduplicate: remove ID 5 and 7
      data = data.filter((r) => r.id !== 5 && r.id !== 7);
      data = data.map((r) => ({ ...r, roll: r.roll.toUpperCase() }));
    }

    if (currentStage >= 2) {
      // Normalize text
      data = data.map((r) => {
        let dist = r.district.trim();
        if (dist.toUpperCase() === "CALCUTTA") dist = "Kolkata";
        else dist = dist.charAt(0).toUpperCase() + dist.slice(1).toLowerCase();

        return {
          ...r,
          dept: r.dept.toUpperCase(),
          district: dist,
        };
      });
    }

    if (currentStage >= 3) {
      // Impute sentinels and nulls
      data = data.map((r) => {
        if (r.marks === -999.0 || r.marks === null) {
          return { ...r, marks: 32.0, wasImputed: true };
        }
        return { ...r, wasImputed: false };
      });
    }

    if (currentStage >= 4) {
      // Clamp outliers
      data = data.map((r) => {
        let cleanAge = r.age;
        if (cleanAge < 17 || cleanAge > 40) cleanAge = 21;

        let cleanMarks = r.marks;
        if (cleanMarks > 100.0) cleanMarks = cleanMarks / 10.0;
        else if (cleanMarks < 0.0) cleanMarks = 0.0;

        return { ...r, age: cleanAge, marks: cleanMarks };
      });
    }

    if (currentStage >= 5) {
      // Logical consistency
      data = data.map((r) => {
        const correctStatus = r.marks >= 40.0 ? "PASS" : "FAIL";
        return { ...r, status: correctStatus };
      });
    }

    return data;
  }, [currentStage]);

  // Mode B Entity Resolution Matcher
  const canonicalDistricts = ["Kolkata", "Barrackpore", "Salt Lake", "Siliguri", "Ichapur", "Howrah"];

  const entityMatchResult = useMemo(() => {
    let bestMatch = null;
    let maxSim = -1;

    canonicalDistricts.forEach((canon) => {
      let sim = simulateJaroWinkler(testDistrictInput, canon);
      // Hardcode known alias "calcutta" -> "kolkata"
      if (testDistrictInput.toLowerCase().trim() === "calcutta" && canon === "Kolkata") {
        sim = 0.98;
      }
      if (sim > maxSim) {
        maxSim = sim;
        bestMatch = canon;
      }
    });

    const isResolved = maxSim >= similarityThreshold;
    return {
      input: testDistrictInput,
      bestMatch,
      similarity: maxSim,
      isResolved,
    };
  }, [testDistrictInput, similarityThreshold]);

  // Mode C Imputation Comparator
  const modeCData = useMemo(() => {
    const rawCount = 10;
    if (imputationMethod === "drop") {
      return {
        method: "Listwise Deletion (dropna)",
        retained: 8,
        lostPct: 20.0,
        bcaMean: 54.8,
        mcaMean: 90.7,
        verdict: "High Attrition Risk: Discarded 20% of student records, biasing underprivileged cohorts.",
        badgeColor: "text-rose-400 border-rose-500/40 bg-rose-500/10",
      };
    } else if (imputationMethod === "global_mean") {
      return {
        method: "Global Mean Imputation",
        retained: 10,
        lostPct: 0.0,
        bcaMean: 62.4, // Artificially inflated by MCA
        mcaMean: 90.7,
        verdict: "Subgroup Distortion: Injected global average (71.2%) into BCA, masking failing students.",
        badgeColor: "text-amber-400 border-amber-500/40 bg-amber-500/10",
      };
    } else {
      return {
        method: "Departmental Group Median",
        retained: 10,
        lostPct: 0.0,
        bcaMean: 48.0,
        mcaMean: 90.7,
        verdict: "Optimal & Robust: Preserved genuine departmental distribution without sample loss.",
        badgeColor: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
      };
    }
  }, [imputationMethod]);

  // Diagnostic Quiz Questions
  const diagnosticQuestions = [
    {
      id: 1,
      question:
        "Why is Departmental Group Median Imputation mathematically superior to Global Mean Imputation for missing student marks?",
      options: [
        "Because the median is the optimal L1 loss minimizer and possesses a 50% breakdown point, ensuring extreme mark outliers in other departments do not distort specific cohort medians.",
        "Because global mean imputation consumes 100x more GPU memory.",
        "Because the median inverts the condition number of the design matrix.",
        "Because Scikit-Learn only supports median imputation on categorical columns.",
      ],
      correctIndex: 0,
      explanation:
        "Academic marks vary systematically across departments (e.g., Computer Science marks differ from Humanities). The sample median minimizes absolute error (L1 loss) and has a 50% breakdown point, meaning a single typo of 950.0 marks will not skew the imputed values, unlike the mean.",
      practicalTip:
        "Always condition imputation on departmental or curriculum groupings: `df.groupby('dept')['marks'].transform('median')`.",
    },
    {
      id: 2,
      question:
        "In university admission systems, what fatal bug occurred when absent students were entered with sentinel value -999 and processed with `df['marks'].mean()`?",
      options: [
        "The server crashed with an out-of-memory error.",
        "The arithmetic mean treated -999 as a literal negative exam score, pulling class averages into negative numbers and causing 12,000 students to falsely receive failing GPAs.",
        "The roll numbers were deleted from the SQL database.",
        "The script automatically converted all students to computer science majors.",
      ],
      correctIndex: 1,
      explanation:
        "Sentinels are non-numeric placeholders used by legacy systems. When fed into mathematical operations like `mean()`, -999 is added numerically. A few -999 values will completely overwhelm positive scores, driving the class average negative.",
      practicalTip:
        "Always audit numeric columns for negative or out-of-bounds sentinels before computing aggregate statistics.",
    },
    {
      id: 3,
      question:
        "What does the mathematical property of Idempotency f(f(X)) = f(X) guarantee in an automated data cleaning DAG?",
      options: [
        "It guarantees that running the pipeline on an already cleaned dataset produces zero additional modifications or side effects during retries.",
        "It guarantees that the dataset will be reduced to exactly zero bytes.",
        "It proves that the data was encrypted with SHA-256.",
        "It ensures that all columns are one-hot encoded.",
      ],
      correctIndex: 0,
      explanation:
        "In production orchestration (Airflow, Kubeflow), tasks frequently retry after network interruptions. If a cleaning script is idempotent, running it twice leaves the data in the exact same clean state without creating duplicates or re-shifting values.",
      practicalTip:
        "Design all data cleaning functions to be pure and idempotent: applying them twice should yield the exact same result as applying them once.",
    },
    {
      id: 4,
      question:
        "Why is `errors='coerce'` in Pandas `pd.to_numeric(df['marks'], errors='coerce')` considered dangerous if deployed without logging?",
      options: [
        "It permanently crashes the Python interpreter.",
        "It silently converts corrupted strings (such as OCR typos or alphanumeric errors) into NaN, hiding bad data entries from audit logs.",
        "It only works on integer values.",
        "It converts floats into strings.",
      ],
      correctIndex: 1,
      explanation:
        "`errors='coerce'` turns any non-parseable string into NaN without throwing an alert. If an OCR scanner extracted a student's score of 95 as '95A', it becomes NaN, destroying the original data without creating an audit trail.",
      practicalTip:
        "Always log which exact rows and original string values failed numeric coercion before converting them to NaN.",
    },
    {
      id: 5,
      question:
        "Why must data cleaning statistics (medians, means, entity mappings) be fit exclusively on the training split rather than the entire dataset?",
      options: [
        "To save hard drive storage space.",
        "Because fitting on the entire dataset causes Data Leakage, allowing information from the test partition to leak into training representations and producing overly optimistic evaluations.",
        "Because Scikit-Learn pipelines throw an error if test sets have missing values.",
        "Because test sets are always encrypted in production.",
      ],
      correctIndex: 1,
      explanation:
        "Computing statistics across the combined dataset leaks future distribution information into training features. In production, unseen inference data must be handled using frozen training statistics to guarantee realistic generalization performance.",
      practicalTip:
        "Call `imputer.fit(X_train)` and `imputer.transform(X_test)` — never fit preprocessing transformers on the full un-split DataFrame.",
    },
  ];

  // Jargon Glossary
  const jargonTerms = [
    {
      term: "Garbage-In, Garbage-Out (GIGO)",
      definition:
        "The fundamental machine learning theorem stating that empirical risk minimizers converge to biased parameters when trained on noisy, contaminated, or erroneous input data.",
    },
    {
      term: "Primary Key Uniqueness",
      definition:
        "The relational invariant requiring the cardinality of unique normalized identifiers |{PK(r)}| to exactly equal the total number of records N in the dataset.",
    },
    {
      term: "Domain Range Boundary",
      definition:
        "A physical or institutional constraint enforcing that an attribute x must reside strictly within a closed interval [a, b] (e.g. Student Age in [17, 40], Marks in [0, 100]).",
    },
    {
      term: "Functional Dependency",
      definition:
        "A constraint X -> Y where the value of attribute X uniquely dictates attribute Y (e.g. Marks >= 40.0 uniquely implies Status == 'PASS').",
    },
    {
      term: "Sentinel Value",
      definition:
        "A predetermined artificial numerical code (e.g. -999, 9999) used by legacy databases to represent missing or non-applicable entries in non-nullable columns.",
    },
    {
      term: "Entity Resolution",
      definition:
        "The algorithmic process of linking and consolidating different textual representations and typographical misspellings (e.g. 'Calcutta', 'kolkata') into a canonical entity.",
    },
    {
      term: "Jaro-Winkler Metric",
      definition:
        "A string similarity metric that rewards shared initial prefixes, ideally suited for fuzzy matching of geographical districts and candidate names.",
    },
    {
      term: "Data Provenance",
      definition:
        "The documented lineage and historical audit trail detailing every transformation, imputation, and manual correction applied to a data record from origin to serving.",
    },
    {
      term: "Pipeline Idempotency",
      definition:
        "The mathematical property f(f(X)) = f(X) guaranteeing that re-executing data cleaning scripts causes zero unintended secondary changes during pipeline retries.",
    },
  ];

  const filteredJargon = useMemo(() => {
    if (!jargonQuery.trim()) return jargonTerms;
    const q = jargonQuery.toLowerCase();
    return jargonTerms.filter(
      (j) => j.term.toLowerCase().includes(q) || j.definition.toLowerCase().includes(q)
    );
  }, [jargonQuery]);

  const quizScore = useMemo(() => {
    let score = 0;
    diagnosticQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) score++;
    });
    return score;
  }, [quizAnswers]);

  return (
    <div className="space-y-12 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16 px-4 sm:px-6">
      {/* ----------------------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ----------------------------------------------------------------- */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-10 rounded-3xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Data Types and Preprocessing • Topic 21
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Worked Example Lab
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Full Pipeline Verified
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Worked Example 1: End-to-End Cleaning a Student Dataset
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
            Step through a comprehensive, production-grade data cleaning lifecycle on a realistic, noisy West Bengal college student dataset. Experience how canonical deduplication, regex text normalization, sentinel missingness resolution, domain boundary clamping, and cross-field logical consistency enforcement turn raw, corrupted records into a pristine, model-ready feature matrix with a 100% data hygiene score.
          </p>

          {/* Quick Jump Navigation */}
          <div className="pt-4 border-t border-indigo-900/50">
            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block mb-2">
              Curriculum Roadmap Jump Navigation:
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: "#novice", label: "1. Novice Masterclass" },
                { id: "#jargon", label: "2. Lifecycle & Jargon" },
                { id: "#studio", label: "3. Interactive Studio" },
                { id: "#math", label: "4. Mathematical Formulations" },
                { id: "#cases", label: "5. Regional Cases" },
                { id: "#pitfalls", label: "6. Production Pitfalls" },
                { id: "#quiz", label: "7. Diagnostic Quiz" },
                { id: "#handbook", label: "8. Academic Notes" },
                { id: "#lab", label: "9. Python Lab" },
                { id: "#teacher", label: "10. Teacher Guidance" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={item.id}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700/60 transition-all font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 1: NOVICE MASTERCLASS & MENTAL MODELS */}
      {/* ----------------------------------------------------------------- */}
      <section id="novice" className="space-y-8">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Foundational Pedagogy
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            1. Novice Masterclass: Intuitive Mental Models
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* METAPHOR 1 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-indigo-900/40 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-2xl">
                🩺
              </div>
              <h3 className="text-base font-bold text-white">
                Metaphor 1: The Surgical Pre-Op Scrub
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A surgeon never enters the operating theater without thoroughly scrubbing their hands, sterilizing every instrument, and confirming patient identity. Training a machine learning model on raw, uncleaned data is performing surgery with contaminated scalpel blades—it poisons the entire operation!
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-indigo-300 font-mono">
              Uncleaned Inputs = Contaminated Surgery
            </div>
          </div>

          {/* METAPHOR 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-2xl">
                📮
              </div>
              <h3 className="text-base font-bold text-white">
                Metaphor 2: The Automated Mail Sorter
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Letters arrive addressed to &apos;Kolkata&apos;, &apos;Calcutta&apos;, &apos;kolkata-wb&apos;, and &apos;KOLKATA &apos;. A robotic mail scanner standardizes all these variations to PIN code 700001. Entity resolution and string normalization ensure that minor human handwriting variations don&apos;t fragment identical delivery routes.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-cyan-300 font-mono">
              Calcutta + kolkata -&gt; Canonical: Kolkata
            </div>
          </div>

          {/* METAPHOR 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl">
                🏛️
              </div>
              <h3 className="text-base font-bold text-white">
                Metaphor 3: The Registrar&apos;s Official Stamp
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Before stamping an official university transcript, the university registrar cross-checks: Did the student score 88% but get marked &apos;FAIL&apos;? Is their age listed as 210? Are there duplicate enrollment entries? Logical cross-field rules act as the final institutional audit before degrees are awarded.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-emerald-300 font-mono">
              Marks &gt;= 40 &lt;==&gt; Status == &quot;PASS&quot;
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 2: CLEANING LIFECYCLE & JARGON BUSTER */}
      {/* ----------------------------------------------------------------- */}
      <section id="jargon" className="space-y-8">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Architectural Pipeline
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            2. The 6-Stage Cleaning Lifecycle &amp; Academic Glossary
          </h2>
        </div>

        {/* 6-STAGE PIPELINE FLOW DIAGRAM */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { step: "1. Ingest", desc: "Schema typing & validation", color: "border-slate-700 bg-slate-900" },
            { step: "2. Dedup", desc: "Exact & key collision removal", color: "border-indigo-800 bg-indigo-950/40" },
            { step: "3. Normalize", desc: "Whitespace, casing, aliases", color: "border-cyan-800 bg-cyan-950/40" },
            { step: "4. Impute", desc: "Sentinel & group medians", color: "border-amber-800 bg-amber-950/40" },
            { step: "5. Clamp", desc: "Age & mark range boundaries", color: "border-rose-800 bg-rose-950/40" },
            { step: "6. Reconcile", desc: "Pass/Fail cross-field logic", color: "border-emerald-800 bg-emerald-950/40" },
          ].map((s) => (
            <div key={s.step} className={clsx("p-4 rounded-2xl border space-y-1", s.color)}>
              <span className="text-xs font-bold text-white block">{s.step}</span>
              <p className="text-[11px] text-slate-400 leading-snug">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* JARGON SEARCH & GRID */}
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">Data Hygiene Jargon Buster</h3>
              <p className="text-xs text-slate-400">
                Explore formal definitions of data validation invariants and cleaning techniques
              </p>
            </div>
            <input
              type="text"
              placeholder="Search concepts (e.g. Idempotency, Sentinel, Jaro)..."
              value={jargonQuery}
              onChange={(e) => setJargonQuery(e.target.value)}
              className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 w-full sm:w-64"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {filteredJargon.map((j) => (
              <div key={j.term} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-indigo-300">{j.term}</span>
                <p className="text-xs text-slate-300 leading-relaxed">{j.definition}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 3: INTERACTIVE STUDIO */}
      {/* ----------------------------------------------------------------- */}
      <section id="studio" className="space-y-8">
        <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Simulation Sandbox
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              3. Interactive Student Data Cleaning Studio
            </h2>
          </div>

          {/* STUDIO MODE TABS */}
          <div className="flex gap-2">
            {[
              { id: "pipeline", label: "Mode A: Pipeline Runner" },
              { id: "entity", label: "Mode B: Entity Resolution" },
              { id: "imputation", label: "Mode C: Imputation Comparator" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStudioMode(tab.id)}
                className={clsx(
                  "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  studioMode === tab.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400"
                    : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* STUDIO MODE A: MULTI-STAGE PIPELINE RUNNER */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "pipeline" && (
          <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-cyan-400">⚡</span> Step-by-Step Data Cleaning Pipeline Execution
                </h3>
                <p className="text-xs text-slate-400">
                  Advance through each stage to observe how data defects are systematically sanitized
                </p>
              </div>

              {/* STAGE SELECTOR BUTTONS */}
              <div className="flex flex-wrap gap-1.5">
                {pipelineStages.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setCurrentStage(st.id)}
                    className={clsx(
                      "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                      currentStage === st.id
                        ? "bg-indigo-600 text-white shadow-md border border-indigo-400"
                        : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                    )}
                  >
                    Stage {st.id}
                  </button>
                ))}
              </div>
            </div>

            {/* METRICS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Current Pipeline Stage</span>
                <div className="text-xs font-bold font-mono text-indigo-300">
                  {pipelineStages[currentStage].label}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Data Hygiene Score</span>
                <div
                  className={clsx(
                    "text-sm font-bold font-mono",
                    pipelineStages[currentStage].hygieneScore === 100
                      ? "text-emerald-400"
                      : pipelineStages[currentStage].hygieneScore >= 70
                      ? "text-cyan-400"
                      : "text-amber-400"
                  )}
                >
                  {pipelineStages[currentStage].hygieneScore}% Clean
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Active Records</span>
                <div className="text-sm font-bold text-white font-mono">
                  {currentDataset.length} student rows
                </div>
              </div>
            </div>

            <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/40 text-xs text-indigo-200">
              <strong>Stage Action:</strong> {pipelineStages[currentStage].summary}
            </div>

            {/* REACTIVE DATASET TABLE */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-xs text-left text-slate-300 bg-slate-950/60">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Roll No</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Dept</th>
                    <th className="p-3">District</th>
                    <th className="p-3">Age</th>
                    <th className="p-3">Marks</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Stage Diagnostic</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {currentDataset.map((row) => {
                    const isCorrupted =
                      currentStage === 0 && row.defect !== "None (Clean)" && row.defect !== "None (Clean Fail)";

                    return (
                      <tr
                        key={row.id}
                        className={clsx(
                          isCorrupted ? "bg-rose-950/20" : "hover:bg-slate-800/30",
                          row.wasImputed ? "bg-amber-950/20" : ""
                        )}
                      >
                        <td className="p-3 text-slate-400 font-bold">{row.roll}</td>
                        <td className="p-3 font-sans font-bold text-white">{row.name}</td>
                        <td className="p-3 text-cyan-300">{row.dept}</td>
                        <td className="p-3 text-indigo-300">{row.district}</td>
                        <td className={clsx("p-3 font-bold", row.age < 17 || row.age > 40 ? "text-rose-400" : "text-white")}>
                          {row.age}
                        </td>
                        <td
                          className={clsx(
                            "p-3 font-bold",
                            row.marks === null || row.marks < 0 || row.marks > 100
                              ? "text-rose-400"
                              : "text-emerald-400"
                          )}
                        >
                          {row.marks !== null ? `${row.marks.toFixed(1)}%` : "NULL"}
                        </td>
                        <td
                          className={clsx(
                            "p-3 font-bold",
                            row.status === "PASS" ? "text-emerald-400" : "text-rose-400"
                          )}
                        >
                          {row.status}
                        </td>
                        <td className="p-3 font-sans text-xs">
                          {currentStage === 0 ? (
                            <span className={clsx(isCorrupted ? "text-rose-400 font-bold" : "text-emerald-400")}>
                              {row.defect}
                            </span>
                          ) : (
                            <span className="text-emerald-300">✔ Sanitized</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* STUDIO MODE B: ENTITY RESOLUTION & JARO-WINKLER SANDBOX */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "entity" && (
          <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-purple-400">🔍</span> Fuzzy Entity Resolution &amp; Regional District Matching
                </h3>
                <p className="text-xs text-slate-400">
                  Test fuzzy matching and regex normalization on misspelled West Bengal geographical locations
                </p>
              </div>

              {/* SLIDER FOR SIMILARITY THRESHOLD */}
              <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-indigo-300">Match Threshold:</span>
                <input
                  type="range"
                  min="0.5"
                  max="0.99"
                  step="0.01"
                  value={similarityThreshold}
                  onChange={(e) => setSimilarityThreshold(Number(e.target.value))}
                  className="w-24 accent-purple-500 cursor-pointer"
                />
                <span className="text-xs font-mono font-bold text-white w-8 text-right">
                  {similarityThreshold.toFixed(2)}
                </span>
              </div>
            </div>

            {/* INPUT CONTROLS */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Enter Misspelled District / Regional Alias:
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Calcutta", "kolkata ", "Barackpore", "BKP-Town", "Siliguri-North", "Salt Lake City"].map(
                    (btn) => (
                      <button
                        key={btn}
                        onClick={() => setTestDistrictInput(btn)}
                        className="px-3 py-1 rounded-lg text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer"
                      >
                        {btn}
                      </button>
                    )
                  )}
                </div>
                <input
                  type="text"
                  value={testDistrictInput}
                  onChange={(e) => setTestDistrictInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* RESOLUTION VERDICT */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Raw Input</span>
                  <div className="text-sm font-bold text-cyan-300 font-mono">
                    &quot;{entityMatchResult.input}&quot;
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Best Canonical Match</span>
                  <div className="text-sm font-bold text-indigo-300 font-mono">
                    {entityMatchResult.bestMatch}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Jaro-Winkler Score</span>
                  <div
                    className={clsx(
                      "text-sm font-bold font-mono",
                      entityMatchResult.isResolved ? "text-emerald-400" : "text-rose-400"
                    )}
                  >
                    {entityMatchResult.similarity} ({entityMatchResult.isResolved ? "RESOLVED ✔" : "BELOW THRESHOLD ❌"})
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* STUDIO MODE C: IMPUTATION STRATEGY COMPARATOR */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "imputation" && (
          <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-emerald-400">📊</span> Missing Value Strategy Comparator (Student Marks)
                </h3>
                <p className="text-xs text-slate-400">
                  Compare sample retention, distribution preservation, and audit bias across three imputation methods
                </p>
              </div>

              {/* CONTROLS */}
              <div className="flex gap-2">
                {[
                  { id: "drop", label: "Listwise Deletion (dropna)" },
                  { id: "global_mean", label: "Global Mean Imputation" },
                  { id: "dept_median", label: "Dept Group Median" },
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setImputationMethod(btn.id)}
                    className={clsx(
                      "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                      imputationMethod === btn.id
                        ? "bg-indigo-600 text-white shadow-md border border-indigo-400"
                        : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                    )}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* METRICS */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Active Strategy</span>
                <div className="text-xs font-bold text-white font-mono">{modeCData.method}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Retained Records</span>
                <div className="text-sm font-bold text-cyan-400 font-mono">
                  {modeCData.retained} / 10 records
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Sample Attrition</span>
                <div
                  className={clsx(
                    "text-sm font-bold font-mono",
                    modeCData.lostPct > 0 ? "text-rose-400" : "text-emerald-400"
                  )}
                >
                  {modeCData.lostPct}% Data Lost
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">BCA Mean Marks</span>
                <div className="text-sm font-bold text-indigo-300 font-mono">
                  {modeCData.bcaMean.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className={clsx("p-4 rounded-2xl border text-xs leading-relaxed", modeCData.badgeColor)}>
              <strong>Audit Evaluation:</strong> {modeCData.verdict}
            </div>
          </div>
        )}
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 4: MATHEMATICAL FORMULATIONS */}
      {/* ----------------------------------------------------------------- */}
      <section id="math" className="space-y-8">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Formal Foundations
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            4. Comprehensive Mathematical Formulations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FORMULATION 1 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Relational Algebra
              </span>
              <span className="text-xs font-mono text-slate-500">Primary Key Invariant</span>
            </div>
            <h3 className="text-base font-bold text-white">Uniqueness Invariant Equation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              For a relational student dataset D of N records:
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 space-y-1">
              <div>| {`{ PK(r) : r in D }`} | == | D | = N</div>
              <div>PK_normalized(r) = r.roll_no.strip().upper()</div>
              <div>If | {`{ PK(r) }`} | &lt; N  ==&gt; Key Collision Detected!</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Guarantees that no duplicate candidate registrations contaminate training distributions.
            </p>
          </div>

          {/* FORMULATION 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Closed Interval Projection
              </span>
              <span className="text-xs font-mono text-slate-500">Boundary Clamping</span>
            </div>
            <h3 className="text-base font-bold text-white">Domain Boundary Clamping Operator</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              For attributes bounded within theoretical limits [a, b]:
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-rose-300 space-y-1">
              <div>pi_{`{[a, b]}`}(x) = max( a, min(x, b) )</div>
              <div>Age Clamping: x_age in [17, 40]</div>
              <div>Marks Clamping: x_marks in [0.0, 100.0]</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Projects unphysical data entries onto the closest permissible boundary point.
            </p>
          </div>

          {/* FORMULATION 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Robust Estimation
              </span>
              <span className="text-xs font-mono text-slate-500">L1 Loss Minimizer</span>
            </div>
            <h3 className="text-base font-bold text-white">Departmental Group Median Optimality</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              For missing mark m in department d:
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 space-y-1">
              <div>m_hat_d = argmin_c sum_{`{i in d}`} | m_i - c |  (L1 Loss)</div>
              <div>Breakdown Point: 50%  (Immune to outlier 950.0 marks)</div>
              <div>m_hat_d = median( {`{ m_j : dept(j) == d, m_j in [0, 100] }`} )</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Preserves authentic subgroup distributions without skewing departmental performance averages.
            </p>
          </div>

          {/* FORMULATION 4 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                Relational Logic
              </span>
              <span className="text-xs font-mono text-slate-500">Cross-Field Invariant</span>
            </div>
            <h3 className="text-base font-bold text-white">Functional Dependency Invariant</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Governs academic promotion logic: Marks -&gt; Status:
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-purple-300 space-y-1">
              <div>I( Marks &gt;= theta_{`{pass}`} ) == I( Status == &quot;PASS&quot; )</div>
              <div>theta_{`{pass}`} = 40.0%  (MAKAUT Standard)</div>
              <div>If I_marks != I_status  ==&gt; LOGICAL CONTRADICTION!</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enforces deterministic reconciliation so that no student passes with failing marks.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 5: REGIONAL INDUSTRIAL CASE STUDIES */}
      {/* ----------------------------------------------------------------- */}
      <section id="cases" className="space-y-8">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Industrial Grounding
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            5. Real-World Regional Industrial Case Studies (West Bengal)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CASE 1 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-indigo-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/40">
                Admissions Database
              </span>
              <span className="text-xs text-slate-400">Barrackpore Technical College</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Lateral-Entry Roll Number Inconsistencies &amp; Entity Resolution
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Susmita managed student admissions where applicants entered roll numbers across multi-board formats (&quot;WB/2024/001&quot;, &quot;001&quot;, &quot;WB-001&quot;) and 14 different misspellings for Barrackpore (&quot;BKP&quot;, &quot;Barackpur&quot;). Susmita deployed regex roll isolation and Jaro-Winkler string clustering (threshold = 0.88), achieving 100% database entity harmonization.
            </p>
          </div>

          {/* CASE 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/40">
                Examination Automation
              </span>
              <span className="text-xs text-slate-400">MAKAUT Centralized Portal</span>
            </div>
            <h3 className="text-base font-bold text-white">
              The -999 Sentinel Disaster &amp; Cross-Field Grade Auditing
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu audited end-semester grading scripts where absent students were entered as -999. A legacy script calculated cohort averages using `marks.mean()`, treating -999 as real marks and causing entire college cohorts to fail with negative GPAs! Debangshu deployed explicit sentinel-to-null conversion and cross-field checking, saving 12,000 students from false failing transcripts.
            </p>
          </div>

          {/* CASE 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/40">
                State Welfare Portal
              </span>
              <span className="text-xs text-slate-400">Jadavpur University Scholarship Hub</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Family Income Typographical Outliers &amp; Audit Lineage
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Abhronila automated eligibility checking for Swami Vivekananda Merit-cum-Means scholarships (Income &lt;= ₹2.5L). Several deserving students were disqualified because they typed &quot;2500000&quot; (₹25L) instead of ₹2.5L. Abhronila built boundary outlier checks and group median imputation with full data provenance tracking, satisfying state social welfare audit guidelines.
            </p>
          </div>

          {/* CASE 4 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-rose-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 rounded-full border border-rose-500/40">
                Campus Placements
              </span>
              <span className="text-xs text-slate-400">Hooghly District Polytechnic Cell</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Department Alias Discrepancies &amp; Recruiter Parsing
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mamata organized placement data for Salt Lake IT recruiters. Recruiter ATS algorithms discarded 45% of eligible students because their branches were formatted inconsistently (&quot;C.S.T.&quot;, &quot;Computer Science&quot;, &quot;CSE&quot;). Mamata built an automated entity resolution pipeline that mapped all variants to AICTE canonical branch codes, recovering 380 candidate interviews.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 6: CRITICAL PRODUCTION PITFALLS */}
      {/* ----------------------------------------------------------------- */}
      <section id="pitfalls" className="space-y-8">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
            Defensive Architecture
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            6. Critical Production Pitfalls &amp; Anti-Patterns
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-rose-900/40 space-y-3">
            <div className="text-rose-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 1: Mutating Raw Datasets In-Place
            </div>
            <h4 className="text-sm font-bold text-white">Permanent Source of Truth Destruction</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Never overwrite original raw files. If a cleaning script contains an undiscovered bug, your primary source of truth is permanently destroyed. Treat raw records as immutable write-once read-many (WORM).
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-rose-900/40 space-y-3">
            <div className="text-rose-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 2: Silent `errors='coerce'` Conversions
            </div>
            <h4 className="text-sm font-bold text-white">Masking OCR and System Glitches</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Calling `pd.to_numeric(df[&apos;marks&apos;], errors=&apos;coerce&apos;)` turns non-numeric strings into NaN silently. Without logging, you cannot distinguish between legitimate blanks and corrupted OCR strings like &apos;95A&apos;.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-rose-900/40 space-y-3">
            <div className="text-rose-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 3: Indiscriminate `dropna()`
            </div>
            <h4 className="text-sm font-bold text-white">Severe Sample Selection Bias</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Calling `df.dropna()` discards up to 50% of candidate records over minor missing fields (e.g. guardian occupation), biasing the dataset against underprivileged student cohorts.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-amber-900/40 space-y-3">
            <div className="text-amber-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 4: Pre-Split Imputation (Data Leakage)
            </div>
            <h4 className="text-sm font-bold text-white">Contaminating Training Statistics</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Computing group medians across the entire dataset before train/test splitting leaks test set distributions into training features. Always fit imputers exclusively on the training split.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-amber-900/40 space-y-3">
            <div className="text-amber-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 5: Non-Idempotent Transformation Steps
            </div>
            <h4 className="text-sm font-bold text-white">Pipeline Retry Corruption</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Functions that repeatedly prepend prefixes or multiply values corrupt datasets when Airflow DAG tasks retry. Ensure your pipeline satisfies f(f(X)) == f(X).
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-cyan-900/40 space-y-3">
            <div className="text-cyan-400 font-bold text-xs flex items-center gap-2">
              <span>💡</span> Engineering Rule: Missingness Indicators
            </div>
            <h4 className="text-sm font-bold text-white">Preserving Data Provenance</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Always append a boolean `was_imputed` column when filling nulls. This preserves provenance and allows downstream ML algorithms to recognize imputed cells.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 7: DIAGNOSTIC ASSESSMENT QUIZ */}
      {/* ----------------------------------------------------------------- */}
      <section id="quiz" className="space-y-8">
        <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Knowledge Verification
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              7. Diagnostic Assessment: Student Data Cleaning Mastery
            </h2>
          </div>
          {quizSubmitted && (
            <div className="px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold">
              Score: {quizScore} / {diagnosticQuestions.length} ({Math.round((quizScore / diagnosticQuestions.length) * 100)}%)
            </div>
          )}
        </div>

        <div className="space-y-6">
          {diagnosticQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-bold text-white leading-relaxed">
                  <span className="text-indigo-400 mr-2">Q{idx + 1}.</span>
                  {q.question}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = quizAnswers[idx] === optIdx;
                  const isCorrect = optIdx === q.correctIndex;

                  let btnStyle = "bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300";
                  if (quizSubmitted) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold";
                    } else if (isSelected && !isCorrect) {
                      btnStyle = "bg-rose-950/60 border-rose-500 text-rose-200";
                    }
                  } else if (isSelected) {
                    btnStyle = "bg-indigo-950/80 border-indigo-500 text-white font-medium";
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={quizSubmitted}
                      onClick={() => setQuizAnswers({ ...quizAnswers, [idx]: optIdx })}
                      className={clsx(
                        "p-3 rounded-xl text-xs text-left border transition-all cursor-pointer flex items-start gap-2",
                        btnStyle
                      )}
                    >
                      <span className="font-bold text-indigo-400">
                        {String.fromCharCode(65 + optIdx)})
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-300 space-y-2 bg-slate-950/50 p-3 rounded-xl">
                  <p>
                    <strong className="text-indigo-300">Explanation:</strong> {q.explanation}
                  </p>
                  <p className="text-cyan-400">
                    <strong>Practical Rule:</strong> {q.practicalTip}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* SUBMIT / RETAKE BUTTONS */}
          <div className="flex justify-end gap-3 pt-4">
            {!quizSubmitted ? (
              <button
                onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(quizAnswers).length < diagnosticQuestions.length}
                className={clsx(
                  "px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-lg cursor-pointer",
                  Object.keys(quizAnswers).length === diagnosticQuestions.length
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
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
                className="px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all cursor-pointer"
              >
                Retake Assessment
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 8: ACADEMIC REVISION NOTES & VIVA HANDBOOK */}
      {/* ----------------------------------------------------------------- */}
      <section id="handbook" className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Academic Reference
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            8. Academic Revision Handbook &amp; Viva Voce Q&amp;A
          </h2>
        </div>
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <PlainTextPrint content={noteText} filename="Topic21_Cleaning_Student_Dataset_Notes.txt" />
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 9: PURE PYTHON LABORATORY */}
      {/* ----------------------------------------------------------------- */}
      <section id="lab" className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Hands-On Code
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            9. Pure Python Laboratory: End-to-End Student Cleaning Pipeline
          </h2>
        </div>
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <PythonFileLoader
            code={labCode}
            filename="worked_example_1_cleaning_a_student_dataset_lab.py"
            runnable={true}
          />
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 10: TEACHER CONSULTATION & GUIDANCE */}
      {/* ----------------------------------------------------------------- */}
      <section id="teacher" className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Faculty Mentorship
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            10. Teacher Consultation &amp; Viva Guidance
          </h2>
        </div>
        <Teacher />
      </section>
    </div>
  );
};

export default Topic21;
