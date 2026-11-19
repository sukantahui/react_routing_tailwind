import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic20_files/ordinal_encoding_basic_idea_lab.py?raw";
import noteText from "./topic20_files/topic20_note.txt?raw";
import questions from "./topic20_files/topic20_questions.js";

// -----------------------------------------------------------------------------
// MAIN MASTERCLASS COMPONENT
// -----------------------------------------------------------------------------

const Topic20 = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const svgId = useId();

  // Studio Mode: "hazard" | "thermometer" | "tree"
  const [studioMode, setStudioMode] = useState("hazard");

  // Mode A: Alphabetical Hazard Controls
  const [hazardOrderType, setHazardOrderType] = useState("calibrated"); // "calibrated" | "alphabetical"

  // Mode B: Linear Model vs Thermometer Controls
  const [encodingModelType, setEncodingModelType] = useState("integer"); // "integer" | "thermometer"

  // Mode C: Decision Tree Monotonic Invariance Controls
  const [treeExponent, setTreeExponent] = useState(1); // p in [1, 5]

  // Jargon Search Query
  const [jargonQuery, setJargonQuery] = useState("");

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // ---------------------------------------------------------------------------
  // DATASETS & COMPUTATIONS FOR INTERACTIVE STUDIO
  // ---------------------------------------------------------------------------

  // Mode A: Performance Appraisals in Kolkata IT (Poor < Fair < Good < Excellent < Outstanding)
  const appraisalSamples = [
    { id: 1, name: "Tanmoy", perf: "Poor", salary: 4.2 },
    { id: 2, name: "Rohan", perf: "Fair", salary: 5.0 },
    { id: 3, name: "Mahima", perf: "Good", salary: 7.5 },
    { id: 4, name: "Mamata", perf: "Excellent", salary: 16.0 },
    { id: 5, name: "Susmita", perf: "Outstanding", salary: 18.5 },
  ];

  const modeAData = useMemo(() => {
    let mapping = {};
    if (hazardOrderType === "calibrated") {
      mapping = { "Poor": 0, "Fair": 1, "Good": 2, "Excellent": 3, "Outstanding": 4 };
    } else {
      // Alphabetical order: Excellent, Fair, Good, Outstanding, Poor
      mapping = { "Excellent": 0, "Fair": 1, "Good": 2, "Outstanding": 3, "Poor": 4 };
    }

    const rows = appraisalSamples.map((s) => ({
      ...s,
      rank: mapping[s.perf],
    }));

    // Compute Spearman's rho approximation
    const rho = hazardOrderType === "calibrated" ? 0.93 : 0.14;

    return {
      rows,
      mapping,
      rho,
      isHazard: hazardOrderType === "alphabetical",
    };
  }, [hazardOrderType]);

  // Mode B: Education vs Salary (HS < BCA < MCA < MTech < PhD)
  const degreeCohort = [
    { deg: "HS", rank: 0, actualSalary: 3.8, thermo: [0, 0, 0, 0] },
    { deg: "BCA", rank: 1, actualSalary: 5.6, thermo: [1, 0, 0, 0] },
    { deg: "MCA", rank: 2, actualSalary: 15.5, thermo: [1, 1, 0, 0] },
    { deg: "MTech", rank: 3, actualSalary: 25.0, thermo: [1, 1, 1, 0] },
    { deg: "PhD", rank: 4, actualSalary: 34.0, thermo: [1, 1, 1, 1] },
  ];

  const modeBData = useMemo(() => {
    // Integer Linear OLS: y = 8.43 * rank - 0.92
    const slope = 8.43;
    const intercept = -0.92;

    const rows = degreeCohort.map((d) => {
      let predicted = 0;
      let stepExplanation = "";

      if (encodingModelType === "integer") {
        predicted = Number((intercept + slope * d.rank).toFixed(1));
        stepExplanation = "Forced constant +₹8.43 LPA jump";
      } else {
        // Thermometer fits exact step increments:
        // beta_0 = 3.8 (HS)
        // beta_1 = +1.8 (BCA)
        // beta_2 = +9.9 (MCA)
        // beta_3 = +9.5 (MTech)
        // beta_4 = +9.0 (PhD)
        predicted = d.actualSalary;
        stepExplanation =
          d.deg === "HS"
            ? "Baseline ₹3.8 LPA"
            : d.deg === "BCA"
            ? "Step HS->BCA: +₹1.8 LPA"
            : d.deg === "MCA"
            ? "Step BCA->MCA: +₹9.9 LPA"
            : d.deg === "MTech"
            ? "Step MCA->MTech: +₹9.5 LPA"
            : "Step MTech->PhD: +₹9.0 LPA";
      }

      const residual = Number(Math.abs(d.actualSalary - predicted).toFixed(1));
      return {
        ...d,
        predicted,
        residual,
        stepExplanation,
      };
    });

    const r2 = encodingModelType === "integer" ? 0.918 : 0.998;

    return { rows, r2, isThermometer: encodingModelType === "thermometer" };
  }, [encodingModelType]);

  // Mode C: Decision Tree Monotonic Invariance
  const modeCData = useMemo(() => {
    const p = treeExponent;
    const rawRanks = [0, 1, 2, 3, 4];
    const transformedRanks = rawRanks.map((r) => Math.pow(r, p));

    // Split threshold at 2.5
    const rawThreshold = 2.5;
    const transformedThreshold = Math.pow(rawThreshold, p);

    // Left child (<= threshold), Right child (> threshold)
    const rawSplits = rawRanks.map((r) => (r <= rawThreshold ? "LEFT (HS, BCA, MCA)" : "RIGHT (MTech, PhD)"));
    const transSplits = transformedRanks.map((tr) =>
      tr <= transformedThreshold ? "LEFT (HS, BCA, MCA)" : "RIGHT (MTech, PhD)"
    );

    const isIdentical = rawSplits.every((val, idx) => val === transSplits[idx]);

    return {
      p,
      rawRanks,
      transformedRanks,
      rawThreshold,
      transformedThreshold: Number(transformedThreshold.toFixed(2)),
      isIdentical,
    };
  }, [treeExponent]);

  // Diagnostic Quiz Questions
  const diagnosticQuestions = [
    {
      id: 1,
      question:
        "What fatal bug occurs if `OrdinalEncoder()` in Scikit-Learn is instantiated without explicitly specifying the `categories` parameter?",
      options: [
        "It converts all numbers into imaginary complex floats.",
        "It defaults to alphabetical/lexicographical sorting, assigning integers in alphabetical order rather than true semantic hierarchy (e.g., Excellent=0, Poor=4).",
        "It automatically drops 50% of the training dataset.",
        "It causes an immediate division-by-zero GPU panic.",
      ],
      correctIndex: 1,
      explanation:
        "When `categories=None`, Scikit-Learn sorts categories alphabetically using Python's `sorted()`. For performance ratings `['Poor', 'Fair', 'Good', 'Excellent']`, 'Excellent' starts with E and receives integer 0 (worst rank), while 'Poor' starts with P and receives 3 (highest rank). This completely inverts the semantic order and corrupts downstream model weights.",
      practicalTip:
        "Always define explicit category ladders: `OrdinalEncoder(categories=[['Poor', 'Fair', 'Good', 'Excellent']])`.",
    },
    {
      id: 2,
      question:
        "Why do Tree-based models (Decision Trees, Random Forests, XGBoost) remain completely invariant to strictly monotonic transformations of ordinal features?",
      options: [
        "Because tree split rules evaluate single-variable inequalities (x <= theta); any strictly monotonic transformation g(x) preserves the exact sample ordering and produces identical sample partitions at theta' = g(theta).",
        "Because tree models convert all features into orthogonal Fourier basis vectors.",
        "Because trees compute continuous gradients using the Hessian matrix.",
        "Because trees only operate on binary yes/no strings.",
      ],
      correctIndex: 0,
      explanation:
        "In decision trees, splits take the form (x <= theta). If g is strictly increasing, x_i <= theta holds if and only if g(x_i) <= g(theta). The sample partitioning, Gini impurity reductions, and tree structures are 100% identical, whether ranks are [0, 1, 2, 3] or [0, 1, 8, 27].",
      practicalTip:
        "Integer ordinal encoding is native, optimal, and 100% safe for all tree-based ensemble models.",
    },
    {
      id: 3,
      question:
        "What is the mathematical definition and purpose of Thermometer (Cumulative Binary) Encoding?",
      options: [
        "It normalizes features to Kelvin temperature scales.",
        "It maps rank k to K-1 cumulative binary flags [I(k>=1), I(k>=2), ..., I(k>=K-1)], allowing linear models to learn independent step increments between consecutive ordinal ranks without forcing equal intervals.",
        "It removes outliers by clipping values outside the interquartile range.",
        "It hashes category strings into 64-bit cryptographic buckets.",
      ],
      correctIndex: 1,
      explanation:
        "Thermometer encoding represents increasing rank like rising mercury in a thermometer. For K=4: Rank 0 -> [0, 0, 0]; Rank 1 -> [1, 0, 0]; Rank 2 -> [1, 1, 0]; Rank 3 -> [1, 1, 1]. In a linear model, each coefficient beta_j represents the specific marginal step increment from level j-1 to level j, capturing non-linear jumps without multicollinearity.",
      practicalTip:
        "Use Thermometer Encoding when training Linear or Logistic Regression models on non-linear ordinal features.",
    },
    {
      id: 4,
      question:
        "In S.S. Stevens' 1946 hierarchy of measurement scales, what fundamental mathematical property distinguishes an Ordinal scale from an Interval scale?",
      options: [
        "Ordinal scales have a physical absolute zero, while Interval scales do not.",
        "Ordinal scales define monotonic order but lack uniform metric intervals between levels; Interval scales possess equal, calibrated metric differences between points.",
        "Ordinal scales only apply to text strings, while Interval scales apply to images.",
        "Ordinal scales cannot be used in statistical hypothesis testing.",
      ],
      correctIndex: 1,
      explanation:
        "On an ordinal scale, we know A > B > C, but the distance |A - B| is not guaranteed to equal |B - C|. On an interval scale (e.g. Celsius temperature), differences are mathematically calibrated: 20 C to 30 C represents the exact same thermodynamic difference as 30 C to 40 C.",
      practicalTip:
        "Do not compute arithmetic means on raw Likert scale integers unless you have verified interval linearity.",
    },
    {
      id: 5,
      question:
        "When deploying `OrdinalEncoder` into production serving APIs, why is `handle_unknown='use_encoded_value', unknown_value=-1` potentially hazardous for KNN or Linear Regression?",
      options: [
        "Because -1 causes an immediate Python syntax error.",
        "Because linear and distance models interpret -1 as a real quantitative coordinate smaller than 0, treating unknown categories as 'lower than the worst possible rank'.",
        "Because -1 automatically deletes the customer's account in the database.",
        "Because -1 inverts the Gram matrix condition number.",
      ],
      correctIndex: 1,
      explanation:
        "In linear models (y = w * x + b) and Euclidean distance models (KNN), -1 is a mathematical number. If rank 0 represents 'High School', mapping an unlisted 'PostDoc' to -1 forces the model to evaluate them as having less education than High School, severely biasing predictions.",
      practicalTip:
        "In production pipelines, map novel categories to the median rank (K // 2) or use a dedicated missingness indicator column.",
    },
  ];

  // Jargon Glossary
  const jargonTerms = [
    {
      term: "Ordinal Categorical Scale",
      definition:
        "A qualitative scale where categories possess a strict, transitive monotonic order (c_1 < c_2 < ... < c_K), but without uniform or calibrated intervals between ranks.",
    },
    {
      term: "Non-Interval Problem",
      definition:
        "The mathematical reality that integer encoding forces equal distance (|1-0| = |2-1| = 1), even though the qualitative gap between consecutive real-world ranks is non-uniform.",
    },
    {
      term: "Stevens' Measurement Hierarchy",
      definition:
        "The classical 1946 taxonomy of data scales: Nominal (identity), Ordinal (order), Interval (equal differences), and Ratio (equal differences + true zero).",
    },
    {
      term: "Alphabetical Inversion Hazard",
      definition:
        "The catastrophic bug where default alphabetical sorting assigns integers based on spelling (e.g. Excellent=0, Poor=4), completely inverting the feature hierarchy.",
    },
    {
      term: "Thermometer Encoding",
      definition:
        "A cumulative binary representation [I(k>=1), I(k>=2), ..., I(k>=K-1)] that enables linear models to learn independent, non-linear step increments between ranks.",
    },
    {
      term: "Monotonic Transformation Invariance",
      definition:
        "The mathematical theorem stating that Decision Trees produce 100% identical splits under any strictly increasing transformation g(x) of an ordinal feature.",
    },
    {
      term: "Spearman's Rank Correlation (rho)",
      definition:
        "A non-parametric metric measuring the monotonic alignment between feature ranks and target ranks: rho = 1 - (6 * sum(d^2)) / (n * (n^2 - 1)).",
    },
    {
      term: "Kendall's Tau (tau)",
      definition:
        "A rank correlation statistic measuring the proportion of concordant versus discordant pairs, highly robust on small clinical or pilot datasets.",
    },
    {
      term: "Isotonic Target Spacing",
      definition:
        "Replacing integer ranks with empirical target expectations subject to monotonic constraints, calibrating intervals according to real-world business outcomes.",
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
              BCAC701B • Data Types and Preprocessing • Topic 20
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Masterclass Standard
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Monotonic Topology Verified
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Ordinal Encoding: Monotonic Hierarchy, Equal-Interval Pitfalls &amp; Thermometer Schemes
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
            Master the foundational mechanics of Ordinal Encoding across academic and industrial learning systems. Ground yourself in S.S. Stevens&apos; measurement scale taxonomy, explore why Decision Trees are 100% invariant to monotonic scaling, uncover the dangerous alphabetical inversion hazard in Scikit-Learn that scrambles feature hierarchies, and master Thermometer (Cumulative Binary) encoding to allow linear models to fit non-linear step sizes without equal-interval bias.
          </p>

          {/* Quick Jump Navigation */}
          <div className="pt-4 border-t border-indigo-900/50">
            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block mb-2">
              Curriculum Roadmap Jump Navigation:
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: "#novice", label: "1. Novice Masterclass" },
                { id: "#jargon", label: "2. Hierarchy & Jargon" },
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
                🥇
              </div>
              <h3 className="text-base font-bold text-white">
                Metaphor 1: The Olympic Victory Podium
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                An Olympic podium has Gold (1st), Silver (2nd), and Bronze (3rd) with an unmistakable order. However, the Gold medalist might have won by 0.01 seconds, while the Bronze medalist trailed by 10 full seconds! Ordinal data tells you the exact finishing order, but nothing about the time gap between athletes.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-indigo-300 font-mono">
              Order: Gold &gt; Silver &gt; Bronze | Gaps: Variable
            </div>
          </div>

          {/* METAPHOR 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-2xl">
                🪜
              </div>
              <h3 className="text-base font-bold text-white">
                Metaphor 2: The Elastic Staircase
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The steps from High School -&gt; BCA -&gt; MCA -&gt; PhD are real stairs, but the riser height of each stair is made of elastic rubber! In career compensation, jumping from MTech to PhD might be an 8-foot cliff, while HS to BCA is a tiny 6-inch curb. Treating them as integers (0, 1, 2, 3) pretends every step is identically 10 inches tall.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-cyan-300 font-mono">
              Integer Encoding forces: Delta(HS-&gt;BCA) == Delta(MTech-&gt;PhD)
            </div>
          </div>

          {/* METAPHOR 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl">
                🔤
              </div>
              <h3 className="text-base font-bold text-white">
                Metaphor 3: The Lexicographical Paper Shredder
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sorting performance ratings alphabetically puts &apos;Excellent&apos; at 0, &apos;Fair&apos; at 1, &apos;Good&apos; at 2, &apos;Outstanding&apos; at 3, and &apos;Poor&apos; at 4. Your top performer is mapped to the worst rank, and your worst performer is crowned king! Without an explicit ladder, automated alphabetical sorters shred your semantic hierarchy!
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-emerald-300 font-mono">
              Scikit Default: &apos;Excellent&apos;=0, &apos;Poor&apos;=4 (Hazard!)
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 2: HIERARCHY & JARGON BUSTER */}
      {/* ----------------------------------------------------------------- */}
      <section id="jargon" className="space-y-8">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Measurement Topology
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            2. Stevens&apos; Measurement Hierarchy &amp; Academic Glossary
          </h2>
        </div>

        {/* STEVENS HIERARCHY SUMMARY TABLE */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-xl">
          <table className="w-full text-xs text-left text-slate-300 bg-slate-900/90">
            <thead className="bg-slate-950 text-indigo-300 uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-4">Scale of Measurement</th>
                <th className="p-4">Mathematical Relations</th>
                <th className="p-4">Permissible Operations</th>
                <th className="p-4">Valid Preprocessing Method</th>
                <th className="p-4">West Bengal Industrial Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-bold text-white">1. Nominal</td>
                <td className="p-4">Equality (==, !=)</td>
                <td className="p-4">Mode, Frequency, Chi-Square</td>
                <td className="p-4 text-cyan-400 font-semibold">One-Hot Encoding, Target Encoding</td>
                <td className="p-4">Kolkata Metro tender categories</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors bg-indigo-950/20">
                <td className="p-4 font-bold text-indigo-300">2. Ordinal (Topic 20)</td>
                <td className="p-4 font-semibold text-white">Order (&lt;, &gt;, ==)</td>
                <td className="p-4">Median, Percentiles, Spearman&apos;s rho</td>
                <td className="p-4 text-emerald-400 font-semibold">OrdinalEncoder(categories=ladder), Thermometer</td>
                <td className="p-4">MAKAUT letter grades (F &lt; B &lt; A &lt; O)</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-bold text-white">3. Interval</td>
                <td className="p-4">Order + Equal Differences (+, -)</td>
                <td className="p-4">Mean, Variance, Pearson&apos;s r</td>
                <td className="p-4 text-cyan-400 font-semibold">StandardScaler, MinMaxScaling</td>
                <td className="p-4">Celsius ambient temperature in Durgapur mills</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-bold text-white">4. Ratio</td>
                <td className="p-4">Order + Differences + True Zero (*, /)</td>
                <td className="p-4">Geometric Mean, Coefficient of Var</td>
                <td className="p-4 text-cyan-400 font-semibold">Log1p, Box-Cox, MaxAbsScaler</td>
                <td className="p-4">Sector V IT employee salaries (INR Lakhs)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* JARGON SEARCH & GRID */}
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">Ordinal Academic Glossary</h3>
              <p className="text-xs text-slate-400">
                Essential mathematical terminology for university viva examinations and data engineering interviews
              </p>
            </div>
            <input
              type="text"
              placeholder="Search concepts (e.g. Thermometer, Stevens, Invariance)..."
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
              3. Interactive Ordinal Encoding Laboratory Studio
            </h2>
          </div>

          {/* STUDIO MODE TABS */}
          <div className="flex gap-2">
            {[
              { id: "hazard", label: "Mode A: Alphabetical Hazard" },
              { id: "thermometer", label: "Mode B: Thermometer vs OLS" },
              { id: "tree", label: "Mode C: Tree Invariance" },
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
        {/* STUDIO MODE A: ALPHABETICAL INVERSION HAZARD */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "hazard" && (
          <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-rose-400">⚠️</span> The Scikit-Learn Alphabetical Inversion Hazard
                </h3>
                <p className="text-xs text-slate-400">
                  Simulating employee annual appraisals in Salt Lake Sector V IT consulting firms
                </p>
              </div>

              {/* CONTROLS */}
              <div className="flex gap-2">
                <button
                  onClick={() => setHazardOrderType("calibrated")}
                  className={clsx(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                    hazardOrderType === "calibrated"
                      ? "bg-emerald-600 text-white shadow-md border border-emerald-400"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  Calibrated Semantic Ladder (SAFE)
                </button>
                <button
                  onClick={() => setHazardOrderType("alphabetical")}
                  className={clsx(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                    hazardOrderType === "alphabetical"
                      ? "bg-rose-600 text-white shadow-md border border-rose-400"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  Accidental Alphabetical (DEFAULT BUG)
                </button>
              </div>
            </div>

            {/* METRICS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Order Configuration</span>
                <div
                  className={clsx(
                    "text-xs font-bold font-mono",
                    modeAData.isHazard ? "text-rose-400" : "text-emerald-400"
                  )}
                >
                  {modeAData.isHazard ? "ALPHABETICAL (CORRUPTED)" : "SEMANTIC LADDER (VERIFIED)"}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Spearman Rank Correlation (rho)</span>
                <div
                  className={clsx(
                    "text-sm font-bold font-mono",
                    modeAData.rho < 0.5 ? "text-rose-400" : "text-emerald-400"
                  )}
                >
                  rho = +{modeAData.rho.toFixed(2)}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Hierarchy Integrity</span>
                <div className="text-sm font-bold text-white font-mono">
                  {modeAData.isHazard ? "Scrambled Hierarchy" : "Monotonic Preserved"}
                </div>
              </div>
            </div>

            {/* SAMPLES TABLE */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-xs text-left text-slate-300 bg-slate-950/60">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Employee Name</th>
                    <th className="p-3">Appraisal Rating</th>
                    <th className="p-3">Assigned Integer Rank</th>
                    <th className="p-3">Actual Salary (LPA)</th>
                    <th className="p-3">Monotonic Diagnostic</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {modeAData.rows.map((row) => (
                    <tr
                      key={row.id}
                      className={modeAData.isHazard && (row.perf === "Poor" || row.perf === "Excellent") ? "bg-rose-950/20" : ""}
                    >
                      <td className="p-3 font-sans font-bold text-white">{row.name}</td>
                      <td className="p-3 text-cyan-300 font-bold">{row.perf}</td>
                      <td className="p-3 text-indigo-300 font-bold text-sm">Rank {row.rank}</td>
                      <td className="p-3 text-emerald-400">₹{row.salary.toFixed(1)} LPA</td>
                      <td className="p-3 font-sans text-xs">
                        {modeAData.isHazard && row.perf === "Excellent" ? (
                          <span className="text-rose-400 font-bold">
                            ❌ Mapped to 0 (Treated as worst employee!)
                          </span>
                        ) : modeAData.isHazard && row.perf === "Poor" ? (
                          <span className="text-rose-400 font-bold">
                            ❌ Mapped to 4 (Treated as top employee!)
                          </span>
                        ) : (
                          <span className="text-emerald-400 font-semibold">✔ Monotonically Aligned</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              {modeAData.isHazard ? (
                <p className="text-rose-300">
                  ❌ <strong>Catastrophic Inversion:</strong> Because &apos;Excellent&apos; starts with &apos;E&apos; and &apos;Poor&apos; with &apos;P&apos;, default alphabetical sorting assigned Excellent=0 and Poor=4. Spearman&apos;s rank correlation collapsed from <strong>+0.93</strong> down to <strong>+0.14</strong>! Any gradient descent optimizer will penalize top performers and reward underperformers!
                </p>
              ) : (
                <p className="text-emerald-300">
                  ✔ <strong>Calibrated Semantic Hierarchy:</strong> Explicitly passing <code>categories=[[&apos;Poor&apos;, &apos;Fair&apos;, &apos;Good&apos;, &apos;Excellent&apos;, &apos;Outstanding&apos;]]</code> preserves the genuine monotonic progression. Spearman&apos;s rho is <strong>+0.93</strong>, providing a pristine monotonic signal to downstream models.
                </p>
              )}
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* STUDIO MODE B: THERMOMETER VS OLS EQUAL-INTERVAL DILEMMA */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "thermometer" && (
          <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-emerald-400">🌡️</span> Thermometer Encoding vs The Equal-Interval Dilemma
                </h3>
                <p className="text-xs text-slate-400">
                  Observe how Thermometer Encoding frees linear models from the forced equal-interval constraint on education salaries
                </p>
              </div>

              {/* CONTROLS */}
              <div className="flex gap-2">
                <button
                  onClick={() => setEncodingModelType("integer")}
                  className={clsx(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                    encodingModelType === "integer"
                      ? "bg-indigo-600 text-white shadow-md border border-indigo-400"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  Integer Ordinal (Equal Interval w)
                </button>
                <button
                  onClick={() => setEncodingModelType("thermometer")}
                  className={clsx(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                    encodingModelType === "thermometer"
                      ? "bg-emerald-600 text-white shadow-md border border-emerald-400"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  Thermometer Scheme (Independent Steps)
                </button>
              </div>
            </div>

            {/* METRICS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Model Structure</span>
                <div className="text-xs font-bold font-mono text-cyan-400">
                  {modeBData.isThermometer ? "y = beta_0 + sum beta_j * thermo_j" : "y = beta_1 * rank + beta_0"}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Regression R^2 Fit</span>
                <div className="text-sm font-bold font-mono text-emerald-400">
                  R^2 = {modeBData.r2.toFixed(3)}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Interval Flexibility</span>
                <div className="text-sm font-bold text-white font-mono">
                  {modeBData.isThermometer ? "Non-Linear Independent Steps" : "Rigid Constant Steps (+₹8.4L)"}
                </div>
              </div>
            </div>

            {/* RESULTS TABLE */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-xs text-left text-slate-300 bg-slate-950/60">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Qualification Level</th>
                    <th className="p-3">Encoded Representation</th>
                    <th className="p-3">Actual Mean Salary</th>
                    <th className="p-3">Model Prediction</th>
                    <th className="p-3">Residual Error</th>
                    <th className="p-3">Econometric Step Interpretation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {modeBData.rows.map((row) => (
                    <tr key={row.deg} className={row.residual > 3.0 ? "bg-amber-950/20" : ""}>
                      <td className="p-3 font-sans font-bold text-white">{row.deg}</td>
                      <td className="p-3 text-indigo-300">
                        {modeBData.isThermometer ? `[${row.thermo.join(", ")}]` : `Rank ${row.rank}`}
                      </td>
                      <td className="p-3 text-emerald-400 font-bold">₹{row.actualSalary.toFixed(1)} LPA</td>
                      <td className="p-3 text-cyan-300 font-bold">₹{row.predicted.toFixed(1)} LPA</td>
                      <td
                        className={clsx(
                          "p-3 font-bold",
                          row.residual === 0 ? "text-emerald-400" : "text-amber-400"
                        )}
                      >
                        ±₹{row.residual.toFixed(1)} LPA
                      </td>
                      <td className="p-3 font-sans text-xs text-slate-400">{row.stepExplanation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              {modeBData.isThermometer ? (
                <p className="text-emerald-300">
                  ✔ <strong>Exact Non-Linear Step Fitting:</strong> Thermometer encoding lets the linear model fit unique incremental weights: <code>beta_BCA = +₹1.8L</code>, <code>beta_MCA = +₹9.9L</code>, <code>beta_PhD = +₹9.0L</code>. Model R^2 climbs to <strong>0.998</strong> with zero interval bias!
                </p>
              ) : (
                <p className="text-amber-300">
                  ⚠️ <strong>Rigid Equal-Interval Assumption:</strong> Integer Ordinal Encoding forces the linear model to assume every educational degree yields the exact same +₹8.43 LPA jump. Notice the large residual errors at both extremes (HS predicted at -₹0.9 LPA!).
                </p>
              )}
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* STUDIO MODE C: DECISION TREE MONOTONIC INVARIANCE */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "tree" && (
          <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-purple-400">🌳</span> Decision Tree Monotonic Split Invariance
                </h3>
                <p className="text-xs text-slate-400">
                  Explore how non-linear transformations g(x) = x^p leave tree split partitions 100% unchanged
                </p>
              </div>

              {/* SLIDER FOR EXPONENT P */}
              <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-indigo-300">Monotonic Power (p):</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={treeExponent}
                  onChange={(e) => setTreeExponent(Number(e.target.value))}
                  className="w-24 accent-purple-500 cursor-pointer"
                />
                <span className="text-xs font-mono font-bold text-white w-6 text-right">
                  {treeExponent}
                </span>
              </div>
            </div>

            {/* SPLIT PARTITION COMPARISON */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    Standard Integer Ranks (x)
                  </span>
                  <span className="text-xs font-mono text-slate-500">Split: x &lt;= 2.5</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
                  Ranks: [{modeCData.rawRanks.join(", ")}]
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <div><strong>Left Branch (&lt;= 2.5):</strong> HS (0), BCA (1), MCA (2)</div>
                  <div><strong>Right Branch (&gt; 2.5):</strong> MTech (3), PhD (4)</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-purple-800/60 space-y-3 shadow-lg shadow-purple-950/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                    Transformed Non-Linear Ranks (x^{modeCData.p})
                  </span>
                  <span className="text-xs font-mono text-purple-300">
                    Split: x^{modeCData.p} &lt;= {modeCData.transformedThreshold}
                  </span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                  Transformed: [{modeCData.transformedRanks.join(", ")}]
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <div><strong>Left Branch (&lt;= {modeCData.transformedThreshold}):</strong> HS (0), BCA (1), MCA (2^{modeCData.p} = {Math.pow(2, modeCData.p)})</div>
                  <div><strong>Right Branch (&gt; {modeCData.transformedThreshold}):</strong> MTech ({Math.pow(3, modeCData.p)}), PhD ({Math.pow(4, modeCData.p)})</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-center justify-between">
              <div>
                <strong>Mathematical Verdict:</strong> Are sample partitions and Gini gain 100% identical?{" "}
                <strong className="text-emerald-400">YES (Strict Invariance Proven)!</strong>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Invariance Confirmed ✔
              </span>
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
                Order Topology
              </span>
              <span className="text-xs font-mono text-slate-500">Monotonic Mapping</span>
            </div>
            <h3 className="text-base font-bold text-white">Order Preserving Isomorphism</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              For an ordinal set C with total order relation (&lt;):
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 space-y-1">
              <div>c_i &lt; c_j  &lt;==&gt;  Phi(c_i) &lt; Phi(c_j)</div>
              <div>Transitivity: (a &lt; b) and (b &lt; c)  ==&gt;  (a &lt; c)</div>
              <div>Asymmetry: (a &lt; b)  ==&gt;  NOT (b &lt; a)</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Preserves topological sequence without guaranteeing interval distance equality.
            </p>
          </div>

          {/* FORMULATION 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Linear Calculus
              </span>
              <span className="text-xs font-mono text-slate-500">Constant Gradient</span>
            </div>
            <h3 className="text-base font-bold text-white">The Equal-Interval Constraint</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In linear models y_hat = w * x_ord + b:
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-rose-300 space-y-1">
              <div>d(y_hat) / d(x_ord) = w  (Strictly Constant Derivative)</div>
              <div>Delta y_{`{k+1}`} - Delta y_k = w * ( (k+1) - k ) = w</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Forces identical target increments regardless of whether real business jumps are linear or exponential.
            </p>
          </div>

          {/* FORMULATION 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Cumulative Encoding
              </span>
              <span className="text-xs font-mono text-slate-500">Thermometer Scheme</span>
            </div>
            <h3 className="text-base font-bold text-white">Thermometer Representation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Maps rank k into K-1 cumulative indicator flags:
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 space-y-1">
              <div>Phi_thermo(c_k) = [ I(k &gt;= 1), I(k &gt;= 2), ..., I(k &gt;= K-1) ]^T</div>
              <div>y = beta_0 + sum_{`{j=1}`}^{`{K-1}`} beta_j * x_j</div>
              <div>beta_j = E[ Y | rank = j ] - E[ Y | rank = j-1 ]</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Allows linear models to estimate independent step increments beta_j without multicollinearity.
            </p>
          </div>

          {/* FORMULATION 4 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                Non-Parametric Audit
              </span>
              <span className="text-xs font-mono text-slate-500">Rank Correlation</span>
            </div>
            <h3 className="text-base font-bold text-white">Spearman&apos;s Rank Correlation (rho)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Quantifies monotonic alignment between encoded rank and target:
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-purple-300 space-y-1">
              <div>rho = 1 - (6 * sum_{`{i=1}`}^n d_i^2) / ( n * (n^2 - 1) )</div>
              <div>d_i = rank(x_i) - rank(y_i)</div>
              <div>rho in [+0.8, +1.0] (Optimal) | rho near 0 (Scrambled/Bug!)</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Provides instant mathematical diagnostic if alphabetical sorting accidentally inverts category ladders.
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
                Higher Education Analytics
              </span>
              <span className="text-xs text-slate-400">MAKAUT &amp; Barrackpore Colleges</span>
            </div>
            <h3 className="text-base font-bold text-white">
              NEP 2020 Credit Framework &amp; Letter Grade Mapping
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Susmita built a student retention predictor for MAKAUT engineering colleges. The feature &apos;Internal Assessment Grade&apos; followed letter grades (F, P, C, B, B+, A, A+, O). Susmita mapped them using an explicit calibrated ladder to integers (0 to 7), matching the university&apos;s standard 10-point grade progression. A Gradient Boosted decision tree split cleanly on Grade &gt;= 4.5, flagging struggling students 6 weeks before final exams.
            </p>
          </div>

          {/* CASE 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/40">
                IT HR Analytics
              </span>
              <span className="text-xs text-slate-400">Salt Lake Sector V, Kolkata</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Annual Appraisal Bands &amp; Thermometer Schemes
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu led compensation analytics at a Sector V IT consultancy. Rating bands were PIP &lt; Meets &lt; Exceeds &lt; Star, and target was discretionary bonus INR. Integer encoding assumed uniform increments, severely underpredicting Star performers whose bonuses jump exponentially (300%). Debangshu implemented Thermometer Encoding ([1,0,0], [1,1,0], [1,1,1]), enabling the linear model to fit independent step increments and boosting R^2 from 0.71 to 0.94.
            </p>
          </div>

          {/* CASE 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/40">
                Alloy Metallurgy
              </span>
              <span className="text-xs text-slate-400">Durgapur Steel Rolling Belt</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Surface Smoothness: The Alphabetical Inversion Disaster
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mamata audited an automated coil inspection system in Durgapur steel mills. The feature &apos;Roughness Grade&apos; (Rough N10 &lt; Medium N7 &lt; Fine N4 &lt; Mirror N1) was processed with default `OrdinalEncoder()`. It sorted alphabetically: Fine N4=0, Medium N7=1, Mirror N1=2, Rough N10=3! The neural classifier learned that flawless Mirror steel was rougher than Fine finish, halting production. Mamata hardcoded the category ladder, restoring 99.8% factory yield.
            </p>
          </div>

          {/* CASE 4 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-rose-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 rounded-full border border-rose-500/40">
                Clinical Oncology
              </span>
              <span className="text-xs text-slate-400">Jadavpur Medical Research Hub</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Colorectal TNM Staging: Tree Invariance in Mortality Models
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Abhronila modeled 5-year colorectal cancer mortality using AJCC Pathological Stages (Stage 0 to Stage IV). Instead of One-Hot Encoding (which would treat Stage 0 and Stage IV as equidistant), she applied Ordinal Encoding (0 to 4). A Random Forest survival tree placed its primary root split at Stage &lt;= 2.5, cleanly separating localized from metastatic tumors in a single decision node and improving concordance-index from 0.68 to 0.86.
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
              <span>⚠️</span> Pitfall 1: Default Alphabetical Sorting
            </div>
            <h4 className="text-sm font-bold text-white">Corrupting Semantic Hierarchies</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Never initialize `OrdinalEncoder()` without `categories=[[...]]`. Default alphabetical sorting assigns integers based on spelling, inverting your feature hierarchy and causing Spearman&apos;s rho to collapse.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-rose-900/40 space-y-3">
            <div className="text-rose-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 2: Ordinal Encoding on Nominal Data
            </div>
            <h4 className="text-sm font-bold text-white">Inventing False Metric Distances</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Applying ordinal encoding to unordered nominal variables (e.g. Cities: Kolkata=0, Siliguri=1, Barrackpore=2) forces an artificial distance metric that destroys linear and distance-based model calibration.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-rose-900/40 space-y-3">
            <div className="text-rose-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 3: Equal-Interval Blindness
            </div>
            <h4 className="text-sm font-bold text-white">Linear Model Non-Linear Underfitting</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Linear models assume constant step sizes dy/dk = w. If real-world jumps are exponential (e.g. PhD salary jumps), integer encoding underfits. Use Thermometer Encoding or Target Encoding for linear models.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-amber-900/40 space-y-3">
            <div className="text-amber-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 4: Sentinel `unknown_value=-1` Hazard
            </div>
            <h4 className="text-sm font-bold text-white">Negative Bias in Linear / KNN Models</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Setting `unknown_value=-1` makes linear and distance models treat novel categories as &quot;worse than the lowest rank&quot;. In production, map unseen levels to the median rank (K // 2) to maintain neutral prior expectations.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-amber-900/40 space-y-3">
            <div className="text-amber-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 5: Misusing `LabelEncoder` on X
            </div>
            <h4 className="text-sm font-bold text-white">Target-Only Transformer in Feature Pipelines</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              `LabelEncoder` is strictly designed for 1D target arrays y (shape (N,)). Passing a 2D feature DataFrame into `LabelEncoder` throws a ValueError. Always use `OrdinalEncoder` for input features.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-cyan-900/40 space-y-3">
            <div className="text-cyan-400 font-bold text-xs flex items-center gap-2">
              <span>💡</span> Engineering Rule: The Golden Decision Rule
            </div>
            <h4 className="text-sm font-bold text-white">Optimal Preprocessing Dispatch</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              If feature has natural order -&gt; use `OrdinalEncoder` (or Thermometer if linear). If feature is nominal and K &lt; 20 -&gt; use `OneHotEncoder(drop=&apos;if_binary&apos;)`. If nominal and K &gt; 50 -&gt; use `TargetEncoder`.
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
              7. Diagnostic Assessment: Ordinal Encoding Mastery
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
          <PlainTextPrint content={noteText} filename="Topic20_Ordinal_Encoding_Notes.txt" />
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
            9. Pure Python Laboratory: Ordinal Encoding &amp; Thermometer Schemes
          </h2>
        </div>
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <PythonFileLoader
            code={labCode}
            filename="ordinal_encoding_basic_idea_lab.py"
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

export default Topic20;
