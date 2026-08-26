import React, { useState, useId } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic14_files/worked_example_1_student_pass_fail_prediction_lab.py?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions.js";

const Topic14 = () => {
  const [activeTab, setActiveTab] = useState("theory");
  const [selectedFormulaElement, setSelectedFormulaElement] = useState("all");

  // Interactive Simulator State - Student Features
  const [attendance, setAttendance] = useState(85); // 0-100%
  const [studyHours, setStudyHours] = useState(14); // 0-20 hours/week
  const [quizScore, setQuizScore] = useState(80); // 0-100%
  const [selectedStudent, setSelectedStudent] = useState("mamata");

  // Interactive Simulator State - Model Parameters
  const [weight1, setWeight1] = useState(2.50); // Attendance weight
  const [weight2, setWeight2] = useState(3.00); // Study hours weight
  const [weight3, setWeight3] = useState(1.80); // Quiz score weight
  const [bias, setBias] = useState(-3.20); // Bias threshold
  const [lambdaReg, setLambdaReg] = useState(0.02); // Regularization hyperparameter

  const svgId = useId();

  // Preset Student Profiles
  const studentPresets = {
    mamata: {
      name: "Mamata (Barrackpore)",
      attendance: 90,
      hours: 17,
      quiz: 88,
      actual: 1,
      profile: "High attendance & strong consistent study rhythm"
    },
    mahima: {
      name: "Mahima (Kolkata)",
      attendance: 95,
      hours: 18,
      quiz: 92,
      actual: 1,
      profile: "Exemplary academic record across all biomarkers"
    },
    abhronila: {
      name: "Abhronila (Jadavpur)",
      attendance: 82,
      hours: 14,
      quiz: 78,
      actual: 1,
      profile: "Solid performer with steady homework and quiz scores"
    },
    susmita: {
      name: "Susmita (Ichapur)",
      attendance: 72,
      hours: 12,
      quiz: 65,
      actual: 1,
      profile: "Borderline attendance compensated by focused study hours"
    },
    debangshu: {
      name: "Debangshu (Salt Lake)",
      attendance: 45,
      hours: 5,
      quiz: 35,
      actual: 0,
      profile: "Low attendance & irregular mock tests (At-Risk Profile)"
    }
  };

  const handleSelectPreset = (key) => {
    setSelectedStudent(key);
    const s = studentPresets[key];
    setAttendance(s.attendance);
    setStudyHours(s.hours);
    setQuizScore(s.quiz);
  };

  // Normalization
  const x1 = attendance / 100.0;
  const x2 = studyHours / 20.0;
  const x3 = quizScore / 100.0;

  // 1. Compute Linear Logit z
  const z = (weight1 * x1) + (weight2 * x2) + (weight3 * x3) + bias;

  // 2. Compute Sigmoid Activation y_hat = h(x; w, b)
  const zClamped = Math.max(Math.min(z, 20.0), -20.0);
  const prob = 1.0 / (1.0 + Math.exp(-zClamped));
  const probPct = +(prob * 100).toFixed(1);

  // 3. Compute Binary Cross-Entropy Loss for current student
  const actualLabel = selectedStudent && studentPresets[selectedStudent] ? studentPresets[selectedStudent].actual : (prob &ge; 0.5 ? 1 : 0);
  const eps = 1e-12;
  const probSafe = Math.max(Math.min(prob, 1.0 - eps), eps);
  const bceLoss = -(actualLabel * Math.log(probSafe) + (1 - actualLabel) * Math.log(1.0 - probSafe));

  // 4. Compute L2 Regularization Penalty
  const regPenalty = (weight1 * weight1) + (weight2 * weight2) + (weight3 * weight3);
  const regLoss = lambdaReg * regPenalty;

  // 5. Total Objective Component
  const totalCost = bceLoss + regLoss;

  const isApproved = prob >= 0.50;

  // Comprehensive Dictionary of All 11 Formula Elements
  const formulaElements = [
    {
      id: "min",
      badge: "min_w,b",
      name: "1. The Optimization Operator",
      tag: "Optimizer Search Goal",
      tagColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      mathDef: "argmin_{w ∈ ℝ^d, b ∈ ℝ} 𝒥(w, b)",
      plainEnglish: "Instructs the algorithm to search through all possible weight values to find the exact combination (w*, b*) that produces the lowest total penalty.",
      studentContext: "Instead of a human instructor manually guessing how much attendance or study hours should count, Gradient Descent automatically tests weight changes to find the mathematically optimal decision boundary.",
      extremeCase: "If the optimization algorithm gets stuck or diverges due to a bad learning rate, the model fails to learn the optimal pass/fail threshold."
    },
    {
      id: "cost",
      badge: "𝒥(w, b)",
      name: "2. The Global Cost Function",
      tag: "Total Loss Metric",
      tagColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      mathDef: "𝒥(w, b) = (1/N) ∑ L_i + λ Ω(w)",
      plainEnglish: "The overarching numerical scorecard that quantifies how well the current model is performing across the entire student body, including penalty for excessive model complexity.",
      studentContext: "A single scalar score: lower J means the model makes highly accurate predictions for Mamata, Debangshu, and others while keeping weights modest and robust.",
      extremeCase: "A cost of J = 0.0 on training data without regularization usually indicates extreme overfitting rather than true general intelligence."
    },
    {
      id: "n_sample",
      badge: "N",
      name: "3. The Cohort Sample Size",
      tag: "Dataset Count",
      tagColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      mathDef: "N = |𝒟_train| ∈ ℕ^+",
      plainEnglish: "The total count of historical student records available in the training database.",
      studentContext: "In our worked laboratory, N = 8 students. In a production university system in Barrackpore, N might be 2,500 historical student semester records.",
      extremeCase: "If N is too small (e.g. N = 2), the model cannot infer true general patterns and will memorize noise."
    },
    {
      id: "mean_sum",
      badge: "(1 / N) ∑",
      name: "4. The Mean Empirical Aggregator",
      tag: "Scale Invariance",
      tagColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      mathDef: "(1/N) ∑_{i=1}^N L(h(x_i), y_i)",
      plainEnglish: "Computes the arithmetic average of individual student prediction errors across the cohort.",
      studentContext: "Why divide by N? If we did not divide by N, a college with 10,000 students would have a loss 1,000x larger than a college with 10 students, blowing up gradient steps. Dividing by N makes the cost independent of cohort size.",
      extremeCase: "Without 1/N, changing batch size requires manually recalibrating the learning rate α."
    },
    {
      id: "features",
      badge: "x_i",
      name: "5. The Student Feature Vector",
      tag: "d-Dimensional Input",
      tagColor: "bg-amber-950 text-amber-300 border-amber-800",
      mathDef: "x_i = [x_i1, x_i2, ..., x_id]^T ∈ ℝ^d",
      plainEnglish: "The set of numerical measurements and biomarkers collected for the i-th student.",
      studentContext: "x_i = [Attendance Rate (0.85), Weekly Study Hours (0.70), Mock Quiz Score (0.80)]^T. All values are normalized between 0.0 and 1.0.",
      extremeCase: "If features are not normalized (e.g. study hours in raw minutes 1200 vs attendance 0.85), regularization unfairly penalizes features with smaller numeric ranges."
    },
    {
      id: "weights",
      badge: "w",
      name: "6. Feature Importance Weights",
      tag: "Learnable Slope Vector",
      tagColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      mathDef: "w = [w_1, w_2, ..., w_d]^T ∈ ℝ^d",
      plainEnglish: "The adjustable parameters that determine the direction, steepness, and relative importance of each feature.",
      studentContext: "w_1 = 2.50 (Attendance importance), w_2 = 3.00 (Study hours importance), w_3 = 1.80 (Quiz score importance). A positive weight means increasing that feature increases the probability of passing.",
      extremeCase: "If weights grow to extreme values (e.g. w_1 = 85.0), the decision boundary becomes a sharp cliff, causing high variance (overfitting)."
    },
    {
      id: "bias",
      badge: "b",
      name: "7. Threshold Offset (Bias)",
      tag: "Baseline Prior Scalar",
      tagColor: "bg-amber-950 text-amber-300 border-amber-800",
      mathDef: "b ∈ ℝ (Intercept)",
      plainEnglish: "The baseline offset independent of any feature inputs, determining the default threshold hurdle.",
      studentContext: "b = -3.20. It represents the inherent academic rigor of the exam. A student with 0 attendance and 0 study hours gets a negative logit z = -3.20 (P(Pass) = 3.9%), correctly predicting failure.",
      extremeCase: "If bias is mistakenly regularized, the model is penalized for adjusting its baseline threshold to match natural class imbalances."
    },
    {
      id: "hypothesis",
      badge: "h(x_i; w, b)",
      name: "8. The Hypothesis Function",
      tag: "Sigmoid Probability Model",
      tagColor: "bg-pink-950 text-pink-300 border-pink-800",
      mathDef: "ŷ_i = σ(w^T x_i + b) = 1 / (1 + e^{-(w^T x_i + b)})",
      plainEnglish: "The mathematical engine that takes student features, computes the linear logit score z, and squashes it into a calibrated probability between 0% and 100%.",
      studentContext: "For Mamata, z = +2.465, so h(x; w, b) = σ(2.465) = 0.9217 (92.17% predicted chance of passing).",
      extremeCase: "Using linear output instead of sigmoid produces unbounded scores like 240% or -45%, which cannot represent valid probabilities."
    },
    {
      id: "label",
      badge: "y_i",
      name: "9. Ground-Truth Target Label",
      tag: "Supervisory Target",
      tagColor: "bg-teal-950 text-teal-300 border-teal-800",
      mathDef: "y_i ∈ {0, 1} (Binary Indicator)",
      plainEnglish: "The verified, real-world historical outcome for student i.",
      studentContext: "y_i = 1 represents 'Student Passed the Semester'; y_i = 0 represents 'Student Failed or Required Remediation'.",
      extremeCase: "If ground-truth labels contain human grading noise or labeling errors, the model learns corrupted decision boundaries."
    },
    {
      id: "loss",
      badge: "L(ŷ_i, y_i)",
      name: "10. Binary Cross-Entropy Loss",
      tag: "Instantaneous Error Metric",
      tagColor: "bg-rose-950 text-rose-300 border-rose-800",
      mathDef: "L = - [ y_i ln(ŷ_i) + (1 - y_i) ln(1 - ŷ_i) ]",
      plainEnglish: "The logarithmic error penalty for a single student prediction. It is nearly 0 for confident correct predictions, but asymptotically explodes toward infinity for confident wrong predictions.",
      studentContext: "If Mamata passes (y=1) and model predicts 92.17%, loss is tiny (0.0815). If the model arrogantly predicted 5% pass chance, loss would be massive (-ln(0.05) = 2.996).",
      extremeCase: "Using Mean Squared Error instead of BCE creates non-convex wavy loss surfaces with multiple false local traps."
    },
    {
      id: "reg",
      badge: "λ Ω(w)",
      name: "11. Regularization Term & Penalty",
      tag: "Overfitting Shield",
      tagColor: "bg-purple-950 text-purple-300 border-purple-800",
      mathDef: "λ Ω(w) = λ ∑_{j=1}^d w_j^2 (L2 Ridge)",
      plainEnglish: "Penalizes unnecessarily large weight magnitudes. λ is the tuning dial set by the engineer that balances data accuracy against parameter simplicity.",
      studentContext: "With λ = 0.02 and weights [2.5, 3.0, 1.8], the penalty is 0.02 * (6.25 + 9.0 + 3.24) = 0.3698. It discourages weights from blowing up to fit noisy individual students.",
      extremeCase: "If λ = 0, model overfits (high variance). If λ is too large (e.g. λ = 10.0), weights collapse to zero, predicting every student has the same outcome (underfitting)."
    }
  ];

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-12">
      {/* ========================================================================= */}
      {/* HEADER */}
      {/* ========================================================================= */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Module 1 • Topic 14
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Mathematical Optimization
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Empirical Risk Minimization + Regularization
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Worked Example 1: Student Pass/Fail Prediction
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            A comprehensive, rigorous walkthrough of the fundamental Machine Learning optimization equation: <span className="font-mono text-cyan-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">min_w (1/N) &sum; L(h(x_i; w), y_i) + &lambda; &Omega;(w)</span>. Understand the ultimate goal of learning, deconstruct every symbol with formal definitions, and test parameter dynamics in an interactive simulator.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Formula Goal & Complete Dictionary" },
              { id: "workedExample", label: "2. Step-by-Step Numerical Example" },
              { id: "simulator", label: "3. Interactive Optimization Studio" },
              { id: "caseStudies", label: "4. Regional Case Studies" },
              { id: "bestPractices", label: "5. Pitfalls & Best Practices" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer",
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60"
                )}
              &gt;
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SECTION 1: THE ULTIMATE GOAL & COMPLETE SYMBOL-BY-SYMBOL DICTIONARY */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The Master Optimization Formula: Goal &amp; Deconstruction
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Why this formula exists, what it accomplishes, and an exhaustive definition of every element
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SUBSECTION 1.1: WHAT IS THE ULTIMATE GOAL OF THIS FORMULA? */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-br from-indigo-950/80 via-slate-950 to-slate-950 p-6 rounded-2xl border border-indigo-500/50 shadow-2xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-800/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎯</span>
              <span className="text-sm font-mono font-bold text-indigo-300 uppercase tracking-wider">
                The Ultimate Goal of This Optimization Objective
              </span>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
              The Core Problem of Supervised Learning
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Goal Card 1 */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold font-mono text-cyan-400 flex items-center gap-1.5">
                <span>1.</span> Predictive Generalization
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The real objective of machine learning is <strong className="text-white">not to memorize historical students</strong> in our training dataset. The true goal is to learn a generalizable mathematical decision boundary <span className="font-mono text-cyan-300">(w*, b*)</span> that accurately predicts whether a <strong className="text-white">brand-new, unseen student</strong> enrolling next semester will pass or fail.
              </p>
            </div>

            {/* Goal Card 2 */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold font-mono text-emerald-400 flex items-center gap-1.5">
                <span>2.</span> The Tug-of-War Compromise
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The formula resolves a fundamental dilemma between two opposing forces:
                <br />
                • <strong className="text-emerald-300">Force A (Data Loss):</strong> Pulls weights to fit every training point.
                <br />
                • <strong className="text-purple-300">Force B (Regularizer):</strong> Pulls weights to 0 for simplicity.
                <br />
                Minimizing their sum finds the optimal balance where the model captures true trends without memorizing noise.
              </p>
            </div>

            {/* Goal Card 3 */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold font-mono text-amber-400 flex items-center gap-1.5">
                <span>3.</span> Smooth Convex Optimization
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                While humans want to maximize &quot;% of students correctly classified&quot;, 0-1 step accuracy has zero gradients everywhere. By formulating this continuous loss <span className="font-mono text-amber-300">J(w, b)</span> with Binary Cross-Entropy, the loss surface forms a smooth convex bowl where <strong className="text-white">Gradient Descent is mathematically guaranteed</strong> to slide down to the global optimal weights.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SUBSECTION 1.2: THE MASTER FORMULA DISPLAY */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950/70 to-slate-950 p-6 rounded-2xl border border-indigo-500/40 shadow-inner space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              The Master Equation: Regularized Empirical Risk Minimization
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded bg-indigo-900/80 text-indigo-200 border border-indigo-700 font-mono">
              Click Any Element Below to Inspect
            </span>
          </div>

          {/* Interactive Formula Bar */}
          <div className="p-5 bg-slate-900/90 rounded-xl border border-slate-700/80 text-center overflow-x-auto">
            <div className="text-lg sm:text-2xl font-bold font-mono text-cyan-300 tracking-wide inline-block">
              <button
                onClick={() => setSelectedFormulaElement("min")}
                className="hover:text-cyan-200 hover:underline cursor-pointer transition-colors p-1"
                title="Click to inspect: Optimization Search"
              &gt;
                min<sub>w,b</sub>
              </button>
              &nbsp;
              <button
                onClick={() => setSelectedFormulaElement("cost")}
                className="text-indigo-300 hover:text-indigo-100 hover:underline cursor-pointer transition-colors p-1"
                title="Click to inspect: Total Cost J"
              &gt;
                J(w, b)
              </button>
              &nbsp;=&nbsp;
              <button
                onClick={() => setSelectedFormulaElement("min")}
                className="hover:text-cyan-200 hover:underline cursor-pointer transition-colors p-1"
              &gt;
                min<sub>w,b</sub>
              </button>
              &nbsp;
              <span className="text-amber-300">[</span>
              &nbsp;
              <button
                onClick={() => setSelectedFormulaElement("mean_sum")}
                className="text-emerald-300 hover:text-emerald-100 hover:underline cursor-pointer transition-colors p-1"
                title="Click to inspect: Sample Mean Normalizer"
              &gt;
                <span className="text-slate-400 font-normal">&#40;1 / N&#41;</span> &sum;<sub>i=1</sub><sup>N</sup>
              </button>
              &nbsp;
              <button
                onClick={() => setSelectedFormulaElement("loss")}
                className="text-rose-300 hover:text-rose-100 hover:underline cursor-pointer transition-colors p-1"
                title="Click to inspect: Binary Cross-Entropy Loss"
              &gt;
                L&#40;
                <span className="text-pink-300">h&#40;x<sub>i</sub>; w, b&#41;</span>
                ,
                <span className="text-teal-300"> y<sub>i</sub></span>
                &#41;
              </button>
              &nbsp;+&nbsp;
              <button
                onClick={() => setSelectedFormulaElement("reg")}
                className="text-purple-300 hover:text-purple-100 hover:underline cursor-pointer transition-colors p-1"
                title="Click to inspect: Regularization Penalty"
              &gt;
                &lambda; &Omega;&#40;w&#41;
              </button>
              &nbsp;
              <span className="text-amber-300">]</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-[11px] font-mono pt-4 text-slate-400">
              <span className="text-emerald-400 flex items-center gap-1">
                <span>▲</span> Part 1: Empirical Data Loss (Data Fidelity)
              </span>
              <span className="text-purple-400 flex items-center gap-1">
                <span>▲</span> Part 2: Complexity Regularizer (Overfitting Shield)
              </span>
            </div>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-mono text-slate-400">Filter Element:</span>
            <button
              onClick={() => setSelectedFormulaElement("all")}
              className={clsx(
                "px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer",
                selectedFormulaElement === "all"
                  ? "bg-indigo-600 text-white font-bold"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              )}
            &gt;
              Show All (11 Elements)
            </button>
            {formulaElements.map((el) => (
              <button
                key={el.id}
                onClick={() => setSelectedFormulaElement(el.id)}
                className={clsx(
                  "px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer",
                  selectedFormulaElement === el.id
                    ? "bg-cyan-600 text-white font-bold"
                    : "bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                )}
              &gt;
                {el.badge}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SUBSECTION 1.3: EXHAUSTIVE DEFINITION OF ALL 11 FORMULA ELEMENTS */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>📖</span> Exhaustive Mathematical Symbol Dictionary &amp; Definitions
            </h3>
            <span className="text-xs text-slate-400">
              Showing {selectedFormulaElement === "all" ? "all 11" : "1 selected"} element details
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {formulaElements
              .filter((el) => selectedFormulaElement === "all" || selectedFormulaElement === el.id)
              .map((el) => (
                <div
                  key={el.id}
                  className={clsx(
                    "bg-slate-950 p-5 rounded-xl border transition-all duration-300 space-y-3",
                    selectedFormulaElement === el.id
                      ? "border-cyan-500 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500"
                      : "border-slate-800 hover:border-slate-700"
                  )}
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-300 font-mono font-bold text-xs">
                        {el.badge}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white">{el.name}</span>
                    </div>
                    <span className={clsx("text-[10px] px-2 py-0.5 rounded border font-mono", el.tagColor)}>
                      {el.tag}
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800/80 font-mono text-[11px] text-cyan-300">
                    <strong>Formula:</strong> {el.mathDef}
                  </div>

                  <div className="space-y-2 text-xs text-slate-300">
                    <p>
                      <strong className="text-white">Plain English Definition:</strong> {el.plainEnglish}
                    </p>
                    <p className="text-slate-400 bg-slate-900/40 p-2.5 rounded border border-slate-800/50">
                      <strong className="text-indigo-300">Student Pass/Fail Context:</strong> {el.studentContext}
                    </p>
                    <p className="text-rose-400 text-[11px]">
                      <strong>⚠️ If Misconfigured:</strong> {el.extremeCase}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SUBSECTION 1.4: VISUAL END-TO-END COMPUTATIONAL PIPELINE */}
        {/* ========================================================================= */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              Visual Dataflow: How a Student Moves Through the Optimization Equation
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono">
              Forward Pass Pipeline
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs font-mono">
            {/* Step 1 */}
            <div className="p-3 bg-slate-900 rounded-xl border border-amber-900/50 space-y-1">
              <span className="text-[10px] text-amber-400 uppercase font-bold">1. Feature Input x_i</span>
              <p className="text-white font-bold">[Att, Hours, Quiz]</p>
              <span className="text-[10px] text-slate-500">[0.85, 0.70, 0.80]</span>
            </div>

            {/* Step 2 */}
            <div className="p-3 bg-slate-900 rounded-xl border border-indigo-900/50 space-y-1">
              <span className="text-[10px] text-indigo-400 uppercase font-bold">2. Linear Logit z</span>
              <p className="text-cyan-300 font-bold">z = w^T x + b</p>
              <span className="text-[10px] text-slate-500">2.5(0.85)+3(0.7)... = +2.465</span>
            </div>

            {/* Step 3 */}
            <div className="p-3 bg-slate-900 rounded-xl border border-pink-900/50 space-y-1">
              <span className="text-[10px] text-pink-400 uppercase font-bold">3. Sigmoid Prob ŷ</span>
              <p className="text-emerald-400 font-bold">ŷ = σ(z) = 1/(1+e^-z)</p>
              <span className="text-[10px] text-slate-500">σ(2.465) = 92.17%</span>
            </div>

            {/* Step 4 */}
            <div className="p-3 bg-slate-900 rounded-xl border border-rose-900/50 space-y-1">
              <span className="text-[10px] text-rose-400 uppercase font-bold">4. BCE Loss L_i</span>
              <p className="text-rose-300 font-bold">-ln(ŷ) vs True y</p>
              <span className="text-[10px] text-slate-500">-ln(0.9217) = 0.0815</span>
            </div>

            {/* Step 5 */}
            <div className="p-3 bg-slate-900 rounded-xl border border-purple-900/50 space-y-1">
              <span className="text-[10px] text-purple-400 uppercase font-bold">5. Total Cost J</span>
              <p className="text-purple-300 font-bold">(1/N)∑L + λ||w||²</p>
              <span className="text-[10px] text-slate-500">Mean Loss + 0.3698</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: STEP-BY-STEP WORKED NUMERICAL EXAMPLE */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Step-by-Step Worked Numerical Calculation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Hand-evaluating the objective function on 2 real student examples from Barrackpore &amp; Salt Lake
            </p>
          </div>
        </div>

        {/* Given Initial Configuration */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
          <div className="text-indigo-400 font-bold uppercase">Current Model Configuration (Given Parameters):</div>
          <div className="text-slate-300">
            • Weights: <span className="text-white">w&#8321; = 2.50</span> (Attendance), <span className="text-white">w&#8322; = 3.00</span> (Study Hours), <span className="text-white">w&#8323; = 1.80</span> (Quiz Score)
          </div>
          <div className="text-slate-300">
            • Bias: <span className="text-white">b = -3.20</span> &nbsp;|&nbsp; Regularization Coefficient: <span className="text-purple-400 font-bold">&lambda; = 0.02</span> (L2 Ridge)
          </div>
        </div>

        {/* 2 Worked Case Walkthroughs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Student 1: Mamata */}
          <div className="bg-slate-950 p-6 rounded-xl border border-emerald-900/40 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Student 1: Mamata (Barrackpore)</span>
                <p className="text-[11px] text-slate-400">Actual Outcome: Passed (<span className="text-emerald-300 font-bold">y&#8321; = 1</span>)</p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Ground Truth: Pass
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-900 rounded-lg space-y-1">
                <span className="font-bold text-white block">Step 1: Normalized Inputs</span>
                <p className="font-mono text-slate-400">
                  x&#8321;&#8321; = 0.85 (85% attendance), x&#8321;&#8322; = 0.70 (14 hrs / 20 hrs), x&#8321;&#8323; = 0.80 (80% quiz)
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg space-y-1">
                <span className="font-bold text-white block">Step 2: Linear Logit Score (z)</span>
                <p className="font-mono text-cyan-300">
                  z&#8321; = (2.50 &times; 0.85) + (3.00 &times; 0.70) + (1.80 &times; 0.80) - 3.20
                </p>
                <p className="font-mono text-slate-400">
                  z&#8321; = 2.125 + 2.100 + 1.440 - 3.20 = <strong className="text-emerald-400">+2.465</strong>
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg space-y-1">
                <span className="font-bold text-white block">Step 3: Sigmoid Activation (Probability)</span>
                <p className="font-mono text-cyan-300">
                  y&#770;&#8321; = &sigma;(2.465) = 1 / (1 + e<sup>-2.465</sup>) = 1 / (1 + 0.0850)
                </p>
                <p className="font-mono text-emerald-400 font-bold">
                  y&#770;&#8321; &approx; 0.9217 (92.17% Pass Probability)
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg space-y-1">
                <span className="font-bold text-white block">Step 4: Binary Cross-Entropy Loss (L&#8321;)</span>
                <p className="font-mono text-slate-300">
                  L&#8321; = - [ 1 &times; ln(0.9217) + 0 &times; ln(0.0783) ]
                </p>
                <p className="font-mono text-emerald-400 font-bold">
                  L&#8321; = - (-0.0815) = 0.0815 (Extremely low error penalty)
                </p>
              </div>
            </div>
          </div>

          {/* Student 2: Debangshu */}
          <div className="bg-slate-950 p-6 rounded-xl border border-rose-900/40 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-rose-400 uppercase">Student 2: Debangshu (Salt Lake)</span>
                <p className="text-[11px] text-slate-400">Actual Outcome: Failed (<span className="text-rose-300 font-bold">y&#8322; = 0</span>)</p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800">
                Ground Truth: Fail
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-900 rounded-lg space-y-1">
                <span className="font-bold text-white block">Step 1: Normalized Inputs</span>
                <p className="font-mono text-slate-400">
                  x&#8322;&#8321; = 0.45 (45% attendance), x&#8322;&#8322; = 0.20 (4 hrs / 20 hrs), x&#8322;&#8323; = 0.35 (35% quiz)
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg space-y-1">
                <span className="font-bold text-white block">Step 2: Linear Logit Score (z)</span>
                <p className="font-mono text-rose-300">
                  z&#8322; = (2.50 &times; 0.45) + (3.00 &times; 0.20) + (1.80 &times; 0.35) - 3.20
                </p>
                <p className="font-mono text-slate-400">
                  z&#8322; = 1.125 + 0.600 + 0.630 - 3.20 = <strong className="text-rose-400">-0.845</strong>
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg space-y-1">
                <span className="font-bold text-white block">Step 3: Sigmoid Activation (Probability)</span>
                <p className="font-mono text-rose-300">
                  y&#770;&#8322; = &sigma;(-0.845) = 1 / (1 + e<sup>+0.845</sup>) = 1 / (1 + 2.3280)
                </p>
                <p className="font-mono text-rose-400 font-bold">
                  y&#770;&#8322; &approx; 0.3005 (30.05% Pass Probability &rarr; Correctly Predicts Fail)
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg space-y-1">
                <span className="font-bold text-white block">Step 4: Binary Cross-Entropy Loss (L&#8322;)</span>
                <p className="font-mono text-slate-300">
                  L&#8322; = - [ 0 &times; ln(0.3005) + 1 &times; ln(1 - 0.3005) ] = - ln(0.6995)
                </p>
                <p className="font-mono text-rose-400 font-bold">
                  L&#8322; = - (-0.3574) = 0.3574
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Regularization & Total Objective Combination */}
        <div className="bg-slate-950 p-6 rounded-xl border border-purple-900/40 space-y-3 font-mono text-xs">
          <span className="font-bold text-purple-300 uppercase tracking-wider block">
            Step 5 &amp; 6: Total Cost J(w, b) Computation across Cohort (N = 2)
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase">1. Mean Data Loss (1/N) &sum; L</span>
              <p className="text-white">(0.0815 + 0.3574) / 2</p>
              <p className="text-emerald-400 font-bold text-sm">= 0.2195</p>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase">2. L2 Regularizer &lambda; &Omega;(w)</span>
              <p className="text-white">0.02 &times; (2.50<sup>2</sup> + 3.00<sup>2</sup> + 1.80<sup>2</sup>)</p>
              <p className="text-purple-400 font-bold text-sm">= 0.02 &times; 18.49 = 0.3698</p>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase">3. Total Regularized Objective J</span>
              <p className="text-white">0.2195 + 0.3698</p>
              <p className="text-cyan-400 font-bold text-sm">= 0.5893</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: INTERACTIVE OPTIMIZATION SIMULATOR */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">
            03
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Live Mathematical Optimization Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Adjust student biomarkers, weight parameters, and &lambda; to see instantaneous mathematical reactions
            </p>
          </div>
        </div>

        {/* Student Preset Selectors */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Select Student Profile Preset:</div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {Object.keys(studentPresets).map((key) => (
              <button
                key={key}
                onClick={() => handleSelectPreset(key)}
                className={clsx(
                  "p-2.5 text-xs rounded-xl border text-left transition-all duration-300 cursor-pointer space-y-0.5",
                  selectedStudent === key
                    ? "bg-indigo-950 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                )}
              &gt;
                <div className="font-bold truncate">{studentPresets[key].name}</div>
                <div className="text-[10px] text-slate-500">Att: {studentPresets[key].attendance}% | {studentPresets[key].hours}h</div>
              </button>
            ))}
          </div>
        </div>

        {/* Dual Input Grids: Features + Parameters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Student Features */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
              1. Student Feature Vector (x)
            </span>

            {/* Attendance */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Class Attendance Rate (x&#8321;):</span>
                <span className="text-cyan-400 font-bold">{attendance}% (norm: {x1.toFixed(2)})</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={attendance}
                onChange={(e) => {
                  setAttendance(Number(e.target.value));
                  setSelectedStudent("");
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              /&gt;
            </div>

            {/* Study Hours */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Weekly Study Hours (x&#8322;):</span>
                <span className="text-emerald-400 font-bold">{studyHours} hrs/wk (norm: {x2.toFixed(2)})</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={studyHours}
                onChange={(e) => {
                  setStudyHours(Number(e.target.value));
                  setSelectedStudent("");
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              /&gt;
            </div>

            {/* Quiz Score */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Mock Quiz Score (x&#8323;):</span>
                <span className="text-purple-400 font-bold">{quizScore}% (norm: {x3.toFixed(2)})</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={quizScore}
                onChange={(e) => {
                  setQuizScore(Number(e.target.value));
                  setSelectedStudent("");
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              /&gt;
            </div>
          </div>

          {/* Right Column: Model Parameters (w, b, lambda) */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider block">
              2. Learned Weights (w), Bias (b) &amp; Regularization (&lambda;)
            </span>

            {/* Weight 1 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Attendance Weight (w&#8321;):</span>
                <span className="text-indigo-400 font-bold">{weight1.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-2.0"
                max="5.0"
                step="0.1"
                value={weight1}
                onChange={(e) => setWeight1(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              /&gt;
            </div>

            {/* Weight 2 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Study Hours Weight (w&#8322;):</span>
                <span className="text-indigo-400 font-bold">{weight2.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-2.0"
                max="5.0"
                step="0.1"
                value={weight2}
                onChange={(e) => setWeight2(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              /&gt;
            </div>

            {/* Bias */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Baseline Threshold Bias (b):</span>
                <span className="text-amber-400 font-bold">{bias.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-6.0"
                max="2.0"
                step="0.1"
                value={bias}
                onChange={(e) => setBias(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              /&gt;
            </div>

            {/* Lambda */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Regularization Coefficient (&lambda;):</span>
                <span className="text-purple-400 font-bold">{lambdaReg.toFixed(3)}</span>
              </div>
              <input
                type="range"
                min="0.000"
                max="0.100"
                step="0.005"
                value={lambdaReg}
                onChange={(e) => setLambdaReg(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              /&gt;
            </div>
          </div>
        </div>

        {/* Real-time Dynamic Mathematical Output Dashboard */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Live Mathematical Output &amp; Loss Breakdown
            </span>
            <span className={clsx(
              "px-3 py-1 rounded text-xs font-bold font-mono",
              isApproved
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
            )}>
              {isApproved ? "PREDICTION: PASS ✔" : "PREDICTION: FAIL ❌"} ({probPct}%)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Metric 1: Logit z */}
            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Linear Logit (z)</span>
              <div className="text-xl font-bold font-mono text-cyan-300">{z.toFixed(3)}</div>
              <div className="text-[10px] text-slate-500 truncate">w&#8321;x&#8321; + w&#8322;x&#8322; + w&#8323;x&#8323; + b</div>
            </div>

            {/* Metric 2: Sigmoid Probability */}
            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Pass Prob P(y=1|x)</span>
              <div className="text-xl font-bold font-mono text-emerald-400">{probPct}%</div>
              <div className="text-[10px] text-slate-500 truncate">&sigma;(z) = 1 / (1 + e<sup>-z</sup>)</div>
            </div>

            {/* Metric 3: Individual BCE Loss */}
            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Sample BCE Loss</span>
              <div className="text-xl font-bold font-mono text-rose-400">{bceLoss.toFixed(4)}</div>
              <div className="text-[10px] text-slate-500 truncate">-ln(y&#770;) (for true y={actualLabel})</div>
            </div>

            {/* Metric 4: Total Objective */}
            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Total Cost J(w,b)</span>
              <div className="text-xl font-bold font-mono text-purple-300">{totalCost.toFixed(4)}</div>
              <div className="text-[10px] text-slate-500 truncate">Loss + &lambda;||w||&#178; ({regLoss.toFixed(3)})</div>
            </div>
          </div>

          {/* Probability Bar */}
          <div className="space-y-1 pt-2">
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>Failure Zone (0% - 49.9%)</span>
              <span className="text-white font-bold">Decision Boundary: 50.0%</span>
              <span>Pass Zone (50.0% - 100%)</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 flex">
              <div
                className={clsx(
                  "h-full rounded-full transition-all duration-300",
                  isApproved ? "bg-gradient-to-r from-emerald-500 to-cyan-400" : "bg-gradient-to-r from-rose-600 to-amber-500"
                )}
                style={{ width: `${Math.max(Math.min(prob * 100, 100), 2)}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: REAL-WORLD REGIONAL CASE STUDIES */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">
            04
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Real-World Regional Industrial Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Applying the regularized student pass/fail optimization pipeline in regional educational &amp; corporate institutes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Case 1 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400">Case 1 • Barrackpore Academic Lab</span>
              <span className="text-[10px] px-2 py-0.5 bg-indigo-950 text-indigo-300 rounded border border-indigo-800">Early Intervention</span>
            </div>
            <h3 className="text-base font-bold text-white">Proactive Academic Mentoring</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mamata and Mahima deployed this regularized classifier across 1,200 undergraduate engineering students in Barrackpore. By flagging students with pass probabilities under 40% four weeks before final exams, faculty scheduled remedial tutorial sessions, boosting overall cohort pass rates by 18.5%.
            </p>
          </div>

          {/* Case 2 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400">Case 2 • Salt Lake Sector V IT Hub</span>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded border border-emerald-800">Corporate Assessment</span>
            </div>
            <h3 className="text-base font-bold text-white">Onboarding Certification Readiness</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu engineered an automated pass/fail predictor for corporate IT trainee batches in Salt Lake. Trainees with low mock code-review scores and irregular LMS login intervals receive targeted debugging modules before attempting high-stakes client accreditation exams.
            </p>
          </div>

          {/* Case 3 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-400">Case 3 • Ichapur Vocational Polytechnic</span>
              <span className="text-[10px] px-2 py-0.5 bg-purple-950 text-purple-300 rounded border border-purple-800">Skill Competency</span>
            </div>
            <h3 className="text-base font-bold text-white">Practical Lab Examination Forecasting</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Susmita applied L2-regularized logistic regression to predict student outcomes in hands-on CNC machining and electronics laboratories in Ichapur, successfully balancing workshop attendance against theory test marks to optimize lab equipment scheduling.
            </p>
          </div>

          {/* Case 4 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-400">Case 4 • Jadavpur Medical Diagnostic Center</span>
              <span className="text-[10px] px-2 py-0.5 bg-rose-950 text-rose-300 rounded border border-rose-800">Biomarker Triage</span>
            </div>
            <h3 className="text-base font-bold text-white">Clinical Screening Analogy</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Abhronila noted that the mathematical formula for student pass/fail prediction is identical to clinical triage (Disease Present = 1 vs Absent = 0), using the exact same BCE loss and L2 penalty to ensure that high-dimensional patient indicators do not overfit on sparse cohorts.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: PITFALLS & BEST PRACTICES */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">
            05
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Common Optimization Pitfalls &amp; Engineering Rules
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Critical rules to remember when formulating Machine Learning objective functions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Critical Mathematical Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Regularizing the Bias (b):</strong> Penalizing the bias term shifts the baseline decision threshold toward zero without reducing model curvature, leading to severe underfitting.</li>
              <li><strong className="text-white">Unnormalized Feature Inputs:</strong> If study hours (0-20) and attendance (0-100) are unscaled, the regularizer penalizes weights unevenly.</li>
              <li><strong className="text-white">Using MSE for Binary Classification:</strong> Combining Mean Squared Error with Sigmoidal activations creates non-convex surfaces full of local traps. Always use Binary Cross-Entropy.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Professional Architecture Rules
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Always Normalize Features:</strong> Standardize all features (zero mean, unit variance) so the L2 penalty applies uniformly across all weights.</li>
              <li><strong className="text-white">Cross-Validate &lambda;:</strong> Tune the regularization hyperparameter &lambda; over held-out validation folds (e.g. 5-Fold Cross-Validation).</li>
              <li><strong className="text-white">Tune the Decision Threshold:</strong> If failing a student carries severe consequences, adjust the classification cutoff from 0.50 to 0.65 to ensure high remedial sensitivity.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: EXECUTABLE PYTHON LABORATORY */}
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
              Interactive standalone lab script implementing gradient descent over the regularized objective function
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="worked_example_1_student_pass_fail_prediction_lab.py"
          highlightLines={[25, 41, 48, 54, 76, 85, 96]}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: FAQ TEMPLATE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <FAQTemplate
          title="Worked Example 1: Student Pass/Fail Prediction — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: PRINTABLE NOTE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Worked Example 1: Student Pass/Fail Prediction"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 14 Study Note"
          downloadFileName="topic14_student_pass_fail_note.txt"
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: TEACHER NOTE */}
      {/* ========================================================================= */}
      <section>
        <Teacher
          note="Remember the Golden Rule of Machine Learning optimization: A model doesn't just memorize training examples—it balances empirical fidelity (low BCE loss) with structural simplicity (L2 weight regularization). When you understand every term in min_w (1/N) ∑ L_i + λ Ω(w), you hold the mathematical key to all supervised learning algorithms!"
        />
      </section>
    </div>
  );
};

export default Topic14;
