import React, { useState, useId } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import tradVsMlLab from "./topic1_files/trad_vs_ml_lab.py?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions.js";

const Topic1 = () => {
  const [activeView, setActiveView] = useState("comparison");
  
  // Interactive Simulator State
  const [cibilScore, setCibilScore] = useState(695);
  const [annualIncome, setAnnualIncome] = useState(12.5);
  const [debtRatio, setDebtRatio] = useState(18);
  const [selectedApplicant, setSelectedApplicant] = useState("abhronila");

  const svgId = useId();

  // Preset candidates
  const applicants = {
    mamata: { name: "Mamata (Barrackpore)", cibil: 760, income: 9.5, dti: 25, trueStatus: "Approved" },
    mahima: { name: "Mahima (Kolkata)", cibil: 810, income: 14.0, dti: 18, trueStatus: "Approved" },
    abhronila: { name: "Abhronila (Jadavpur)", cibil: 695, income: 12.5, dti: 15, trueStatus: "Approved (Compensating Factor)" },
    susmita: { name: "Susmita (Ichapur)", cibil: 710, income: 4.8, dti: 22, trueStatus: "Approved (Low Risk Profile)" },
    debangshu: { name: "Debangshu (Salt Lake)", cibil: 620, income: 3.5, dti: 55, trueStatus: "Rejected (High Default Risk)" }
  };

  const handleSelectApplicant = (key) => {
    setSelectedApplicant(key);
    const app = applicants[key];
    setCibilScore(app.cibil);
    setAnnualIncome(app.income);
    setDebtRatio(app.dti);
  };

  // Traditional Rule Engine Execution
  const runTraditionalRules = (cibil, income, dti) => {
    const reasons = [];
    if (cibil < 700) reasons.push(`CIBIL score (${cibil}) is below 700 threshold`);
    if (income < 5.0) reasons.push(`Annual income (₹${income}L) is below ₹5.0L threshold`);
    if (dti > 40) reasons.push(`Debt-to-Income ratio (${dti}%) exceeds 40% threshold`);

    const isApproved = reasons.length === 0;
    return {
      approved: isApproved,
      verdict: isApproved ? "Approved" : "Rejected",
      rationale: isApproved ? "Satisfies all 3 deterministic threshold conditions." : reasons.join("; ")
    };
  };

  // ML Logistic Model Execution
  const runMLModel = (cibil, income, dti) => {
    // Normalization
    const cibilNorm = (cibil - 300) / 600.0;
    const incomeNorm = income / 20.0;
    const dtiNorm = 1.0 - (dti / 100.0);

    // Learned weights from laboratory training
    const w1 = 3.45; // CIBIL weight
    const w2 = 2.80; // Income weight
    const w3 = 2.15; // Clean DTI weight
    const bias = -3.20;

    const z = (w1 * cibilNorm) + (w2 * incomeNorm) + (w3 * dtiNorm) + bias;
    const prob = 1.0 / (1.0 + Math.exp(-Math.max(Math.min(z, 20.0), -20.0)));
    const isApproved = prob >= 0.50;

    return {
      approved: isApproved,
      prob: +(prob * 100).toFixed(1),
      verdict: isApproved ? "Approved" : "Rejected",
      rationale: `Multi-factor probability: ${+(prob * 100).toFixed(1)}%. Model weighed ₹${income}L income alongside ${cibil} CIBIL score.`
    };
  };

  const tradResult = runTraditionalRules(cibilScore, annualIncome, debtRatio);
  const mlResult = runMLModel(cibilScore, annualIncome, debtRatio);

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
              BCAC701B • Module 1 • Topic 1
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Deductive vs Inductive
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Architectural Inversion
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Machine Learning vs Traditional Programming
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Examine the structural differences between human-crafted deductive rules and data-driven inductive statistical synthesis. Discover where traditional rule-based algorithms break and why modern software engineering blends deterministic engines with probabilistic Machine Learning.
          </p>

          {/* Tab navigation */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "comparison", label: "1. Core Architectural Differences" },
              { id: "simulator", label: "2. Interactive Dual-Engine Simulator" },
              { id: "failureModes", label: "3. Where Rules Fail (High-Dim Data)" },
              { id: "caseStudies", label: "4. Real-World Decision Cases" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={clsx(
                  "px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer",
                  activeView === tab.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400"
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
      {/* SECTION 1: ARCHITECTURAL COMPARISON & INVERSION */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The Fundamental Architectural Inversion
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Contrasting Deductive (Data + Rules ➔ Answers) vs Inductive (Data + Answers ➔ Model)
            </p>
          </div>
        </div>

        {/* Inversion Comparison Diagrams */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Traditional Card */}
          <div className="bg-slate-950 p-6 rounded-xl border border-amber-900/40 space-y-4 hover:border-amber-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Traditional Software Engineering
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono">
                Deductive Logic
              </span>
            </div>

            <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-center">
                <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">Data</span>
                <span className="text-amber-400 font-bold">+</span>
                <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">Rules (Human)</span>
                <span className="text-slate-500 font-bold">➔</span>
                <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Answers</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              A software developer writes explicit instructions (if/else ladders, loops, formulas). The system executes the logic deterministically.
            </p>

            <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
              <li><strong className="text-slate-200">Execution:</strong> 100% deterministic with bitwise reproducibility.</li>
              <li><strong className="text-slate-200">Strengths:</strong> Ideal for GST tax billing, banking ledgers (TallyPrime), payroll.</li>
              <li><strong className="text-slate-200">Weakness:</strong> Fails completely when explicit rules cannot be formulated by humans.</li>
            </ul>
          </div>

          {/* Machine Learning Card */}
          <div className="bg-slate-950 p-6 rounded-xl border border-indigo-900/40 space-y-4 hover:border-indigo-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                Machine Learning Engineering
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
                Inductive Synthesis
              </span>
            </div>

            <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-center">
                <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">Data (X)</span>
                <span className="text-indigo-400 font-bold">+</span>
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold">Answers (y)</span>
                <span className="text-slate-500 font-bold">➔</span>
                <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">Model h(x)</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              An optimization algorithm ingests historical data and outcomes, iteratively adjusting weights to synthesize a statistical mapping model.
            </p>

            <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
              <li><strong className="text-slate-200">Execution:</strong> Probabilistic scoring with statistical confidence $P(Y|X)$.</li>
              <li><strong className="text-slate-200">Strengths:</strong> Excels in computer vision, NLP, credit scoring, fraud detection.</li>
              <li><strong className="text-slate-200">Weakness:</strong> Requires thousands of clean labeled samples; black-box opacity.</li>
            </ul>
          </div>
        </div>

        {/* Detailed Comprehensive Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-slate-800 bg-slate-950 rounded-xl overflow-hidden">
            <thead className="bg-slate-900 text-slate-300 border-b border-slate-800 font-mono text-[11px] uppercase">
              <tr>
                <th className="p-3.5 border-r border-slate-800">Architectural Attribute</th>
                <th className="p-3.5 border-r border-slate-800 text-amber-300">Traditional Programming</th>
                <th className="p-3.5 text-indigo-300">Machine Learning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-900/50">
                <td className="p-3 font-semibold text-white border-r border-slate-800">Source of Logic</td>
                <td className="p-3 border-r border-slate-800">Handcoded by human software engineers &amp; domain experts</td>
                <td className="p-3">Inferred automatically from historical data via optimization</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="p-3 font-semibold text-white border-r border-slate-800">Output Nature</td>
                <td className="p-3 border-r border-slate-800">Deterministic, exact, boolean truth or fixed arithmetic value</td>
                <td className="p-3">Probabilistic, statistical confidence interval $P(Y \mid X)$</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="p-3 font-semibold text-white border-r border-slate-800">Handling High Dimensions</td>
                <td className="p-3 border-r border-slate-800">Fails rapidly beyond 5–10 variables due to rule complexity</td>
                <td className="p-3">Scales effortlessly to millions of features (pixels, text tokens)</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="p-3 font-semibold text-white border-r border-slate-800">Adaptation to Drift</td>
                <td className="p-3 border-r border-slate-800">Requires manual code alteration, testing, and recompilation</td>
                <td className="p-3">Automated retraining pipelines (MLOps) over new data partitions</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="p-3 font-semibold text-white border-r border-slate-800">Failure Mode</td>
                <td className="p-3 border-r border-slate-800">Explicit crash, unhandled runtime exception, or syntax failure</td>
                <td className="p-3">Silent failure: confident incorrect probabilistic outputs</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="p-3 font-semibold text-white border-r border-slate-800">Explainability &amp; Audit</td>
                <td className="p-3 border-r border-slate-800">100% white-box traceable with line-by-line debugger</td>
                <td className="p-3">Black-box or complex mathematical weights requiring SHAP/LIME</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: INTERACTIVE DUAL-ENGINE SIMULATOR */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Dual-Engine Loan Assessment Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Observe how a rigid rule-based engine rejects borderline candidates that an ML classifier accurately approves
            </p>
          </div>
        </div>

        {/* Applicant Quick Preset Buttons */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Select Test Applicant Profile:</div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {Object.keys(applicants).map((key) => (
              <button
                key={key}
                onClick={() => handleSelectApplicant(key)}
                className={clsx(
                  "p-2.5 text-xs rounded-xl border text-left transition-all duration-300 cursor-pointer space-y-0.5",
                  selectedApplicant === key
                    ? "bg-indigo-950 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                )}
              >
                <div className="font-bold truncate">{applicants[key].name}</div>
                <div className="text-[10px] text-slate-500 truncate">CIBIL: {applicants[key].cibil} | ₹{applicants[key].income}L</div>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Feature Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-slate-950 p-5 rounded-xl border border-slate-800">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">CIBIL Score:</span>
              <span className="text-indigo-400 font-bold">{cibilScore} / 900</span>
            </div>
            <input
              type="range"
              min="300"
              max="900"
              value={cibilScore}
              onChange={(e) => {
                setCibilScore(Number(e.target.value));
                setSelectedApplicant("");
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="text-[10px] text-slate-500">Traditional Threshold: Min 700</div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Annual Income:</span>
              <span className="text-emerald-400 font-bold">₹ {annualIncome} Lakhs</span>
            </div>
            <input
              type="range"
              min="2.0"
              max="25.0"
              step="0.1"
              value={annualIncome}
              onChange={(e) => {
                setAnnualIncome(Number(e.target.value));
                setSelectedApplicant("");
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="text-[10px] text-slate-500">Traditional Threshold: Min ₹5.0 Lakhs</div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Debt-to-Income (DTI):</span>
              <span className="text-purple-400 font-bold">{debtRatio}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="70"
              value={debtRatio}
              onChange={(e) => {
                setDebtRatio(Number(e.target.value));
                setSelectedApplicant("");
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="text-[10px] text-slate-500">Traditional Threshold: Max 40%</div>
          </div>
        </div>

        {/* Real-time Side-by-Side Dual Execution Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional Result */}
          <div className={clsx(
            "p-5 rounded-xl border space-y-3 transition-all duration-300",
            tradResult.approved
              ? "bg-emerald-950/20 border-emerald-800"
              : "bg-rose-950/20 border-rose-800"
          )}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase">Engine 1: Traditional Rule System</span>
              <span className={clsx(
                "px-2.5 py-0.5 rounded text-xs font-bold font-mono",
                tradResult.approved ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
              )}>
                {tradResult.verdict}
              </span>
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <p><strong className="text-white">Rule Logic Evaluation:</strong></p>
              <p className="text-slate-400 italic">{tradResult.rationale}</p>
            </div>

            <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800">
              Evaluation: Boolean IF (CIBIL ≥ 700 &amp;&amp; Income ≥ 5.0 &amp;&amp; DTI ≤ 40%)
            </div>
          </div>

          {/* ML Result */}
          <div className={clsx(
            "p-5 rounded-xl border space-y-3 transition-all duration-300",
            mlResult.approved
              ? "bg-indigo-950/30 border-indigo-800"
              : "bg-rose-950/20 border-rose-800"
          )}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Engine 2: Machine Learning Classifier</span>
              <span className={clsx(
                "px-2.5 py-0.5 rounded text-xs font-bold font-mono",
                mlResult.approved ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40" : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
              )}>
                {mlResult.verdict} ({mlResult.prob}%)
              </span>
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <p><strong className="text-white">Statistical Model Output:</strong></p>
              <p className="text-slate-400 italic">{mlResult.rationale}</p>
            </div>

            <div className="text-[11px] font-mono text-indigo-400/80 pt-2 border-t border-slate-800">
              Hypothesis: P(Approve | x) = &sigma;(3.45 x&#8321; + 2.80 x&#8322; + 2.15 x&#8323; - 3.20)
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: WHERE RULES FAIL IN HIGH DIMENSIONS */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">
            03
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Where Traditional Programming Breaks: High-Dimensional Sensory Data
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Why handwritten digits, audio speech, and natural language defeat rule-based code
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">1. Computer Vision</span>
            <h3 className="text-base font-bold text-white">Combinatorial Pixel Explosion</h3>
            <p className="text-xs text-slate-300">
              A standard $28 \times 28$ grayscale digit has 784 pixels. Each pixel has 256 intensity levels. The number of possible images is $256^{784}$ (far exceeding the number of atoms in the observable universe). Writing if/else conditions for digit recognition is impossible.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">2. Natural Language</span>
            <h3 className="text-base font-bold text-white">Context, Sarcasm &amp; Dialects</h3>
            <p className="text-xs text-slate-300">
              A regex search for the word &quot;bad&quot; misclassifies &quot;Not bad at all for the price!&quot; as negative. Human language relies on syntax trees, sarcasm, and localized Bengali slang in Kolkata that static string matching cannot decode.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">3. Real-Time Fraud</span>
            <h3 className="text-base font-bold text-white">Adversarial Evasion of Rules</h3>
            <p className="text-xs text-slate-300">
              When a fintech company in Salt Lake creates a static rule &quot;flag if transaction &gt; ₹50,000&quot;, fraudsters instantly split amounts into multiple ₹49,999 transactions. Machine learning detects velocity anomalies and behavioral graph shifts automatically.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: REAL-WORLD REGIONAL CASE STUDIES */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">
            04
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Real-World Industrial Decision Studies
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Examining real engineering choices between deterministic code and ML pipelines
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Case 1 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400">Case 1 • Barrackpore Academic Lab</span>
              <span className="text-[10px] px-2 py-0.5 bg-indigo-950 text-indigo-300 rounded border border-indigo-800">Hybrid System</span>
            </div>
            <h3 className="text-base font-bold text-white">Attendance Rules vs Risk Prediction</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mamata and Mahima implemented a hybrid system. Traditional code enforces mandatory statutory exam attendance criteria (≥ 75%), while an ML model predicts which students need additional tutorial support based on homework submission rhythms and quiz performance.
            </p>
          </div>

          {/* Case 2 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400">Case 2 • Kolkata Real Estate</span>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded border border-emerald-800">ML Regression</span>
            </div>
            <h3 className="text-base font-bold text-white">Municipal Tax vs Market Valuation</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu uses traditional code to calculate exact Kolkata Municipal Corporation (KMC) property tax based on published government circle rates (₹ per sq.ft), but uses a Gradient Boosted ML model to estimate volatile open market selling prices.
            </p>
          </div>

          {/* Case 3 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-400">Case 3 • Ichapur Retail Analytics</span>
              <span className="text-[10px] px-2 py-0.5 bg-purple-950 text-purple-300 rounded border border-purple-800">Dynamic Recommendation</span>
            </div>
            <h3 className="text-base font-bold text-white">GST Invoicing vs Voucher Recommendation</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Susmita generates GST-compliant Tax Invoices using deterministic accounting software (TallyPrime), while deploying an ML collaborative filter to recommend personalized discount offers to retail customers.
            </p>
          </div>

          {/* Case 4 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-400">Case 4 • Jadavpur Energy Grid</span>
              <span className="text-[10px] px-2 py-0.5 bg-rose-950 text-rose-300 rounded border border-rose-800">Time-Series Forecast</span>
            </div>
            <h3 className="text-base font-bold text-white">Breaker Trips vs Load Forecasting</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Abhronila uses deterministic circuit breaker logic to cut power instantaneously during electrical short-circuits (zero latency), while an ML LSTM model forecasts peak power grid demand 24 hours in advance across South Kolkata.
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
              Engineering Pitfalls &amp; Decision Principles
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Architectural rules for selecting the right paradigm
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Misconceptions &amp; Bad Practices
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">The &quot;AI for Everything&quot; Trap:</strong> Replacing deterministic tax/payroll math with ML neural networks.</li>
              <li><strong className="text-white">Ignoring Silent Failures:</strong> Forgetting that drifted ML models output valid JSON with wrong predictions without throwing errors.</li>
              <li><strong className="text-white">Underestimating Data Debt:</strong> Expecting ML to work without building robust data ingestion pipelines first.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Professional Architecture Rules
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Apply Occam&apos;s Razor:</strong> If 10 lines of if/else code achieve 100% precision, do not train a model.</li>
              <li><strong className="text-white">Hybrid Tiering:</strong> Place deterministic hard filters first; feed ambiguous cases to the ML model.</li>
              <li><strong className="text-white">Monitor Data Drift:</strong> Implement statistical validation tests on incoming data payloads in production.</li>
            </ul>
          </div>
        </div>

        {/* Instructor Note / Checklist */}
        <div className="bg-gradient-to-r from-slate-950 to-indigo-950/60 p-5 rounded-xl border border-indigo-800/40 space-y-2 text-xs">
          <div className="font-bold text-indigo-300 flex items-center gap-1.5">
            <span>💡</span> Instructor Tip &amp; Golden Rule:
          </div>
          <p className="text-slate-300 italic">
            &quot;In commercial software engineering, Traditional Programming and Machine Learning are complementary allies, not rivals. Traditional software builds the secure walls, databases, and APIs; Machine Learning provides the intelligent sensory perception and pattern recognition inside them.&quot;
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: PYTHON LABORATORY LOADER */}
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
              Benchmark traditional rule scoring vs ML logistic classification with boundary applicant datasets
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={tradVsMlLab}
          title="trad_vs_ml_lab.py"
          highlightLines={[19, 20, 21, 38, 39, 40, 75, 92, 105]}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: FAQ ACCORDION TEMPLATE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <FAQTemplate
          title="Machine Learning vs Traditional Programming — FAQs"
          questions={questions}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: PRINTABLE PLAIN TEXT STUDY NOTE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Machine Learning vs Traditional Programming"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 1 Study Note"
          downloadFileName="topic1_note.txt"
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: TEACHER'S NOTE */}
      {/* ========================================================================= */}
      <section>
        <Teacher
          note="A great software engineer knows when NOT to use Machine Learning. If your task has explicit legal formulas or strict arithmetic rules (like GST calculations or banking ledgers in TallyPrime), write traditional deterministic code. Save Machine Learning for complex pattern recognition, perception, and multi-factor trade-offs where human-crafted rules break down."
        />
      </section>
    </div>
  );
};

export default Topic1;
