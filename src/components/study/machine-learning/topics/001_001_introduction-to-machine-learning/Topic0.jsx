import React, { useState, useId } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";
import MathSymbolDictionary, { mathSymbolsData } from "../../../../../common/MathSymbolDictionary";

import studyHoursLab from "./topic0_files/study_hours_regression_lab.py?raw";
import meaningScopeLab from "./topic0_files/meaning_scope_ml_lab.py?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions.js";

const Topic0 = () => {
  const [activeParadigm, setActiveParadigm] = useState("ml");
  const [selectedDomain, setSelectedDomain] = useState("academic");
  const [experienceLevel, setExperienceLevel] = useState(25);
  const [activeTab, setActiveTab] = useState("theory");
  const [activePiece, setActivePiece] = useState(1);
  const [activeLabTab, setActiveLabTab] = useState("sklearn");

  // Floating Quick-Reference Modal State
  const [isSymbolModalOpen, setIsSymbolModalOpen] = useState(false);

  // House Price Interactive Demo State
  const [demoSize, setDemoSize] = useState(1800);
  const [demoBeds, setDemoBeds] = useState(3);
  const [demoAge, setDemoAge] = useState(4);

  // Study Hours vs Marks Interactive Demo State
  const [studyHoursInput, setStudyHoursInput] = useState(5.5);

  const svgId1 = useId();
  const svgId2 = useId();

  // Smooth scroll handler for tabs
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Calculated predicted house price: Price = 0.03 * Size + 5 * Beds - 2 * Age + 10
  const predictedHousePrice = +(0.03 * demoSize + 5 * demoBeds - 2 * demoAge + 10).toFixed(2);

  // Calculated predicted marks: Marks = 7.2976 * Hours + 26.2857
  const predictedStudyMarks = Math.min(100, +(7.2976 * studyHoursInput + 26.2857).toFixed(1));

  // Historical study hours dataset
  const studyData = [
    { hours: 1, marks: 35 },
    { hours: 2, marks: 40 },
    { hours: 3, marks: 48 },
    { hours: 4, marks: 55 },
    { hours: 5, marks: 62 },
    { hours: 6, marks: 70 },
    { hours: 7, marks: 78 },
    { hours: 8, marks: 85 }
  ];


  // Domains for Tom Mitchell's T-P-E Formulation
  const domains = {
    academic: {
      title: "Student Performance Prediction (Barrackpore Lab)",
      task: "Predict whether a student (e.g. Mamata, Mahima, Debangshu) will pass the semester exam with distinction.",
      performance: "Classification Accuracy (%) & F1-Score on unseen test assessments.",
      experience: "Historical database of 2,500 student records with attendance %, test marks, and study hours.",
      inputFeatures: "x = [Attendance %, Weekly Study Hours, Internal Mock Score, Assignment Completion Rate]",
      targetVariable: "y ∈ {1 (Distinction), 0 (Regular / Needs Support)}",
      mathForm: "P(y = 1 | x) = σ(w₁x₁ + w₂x₂ + w₃x₃ + w₄x₄ + b)",
      realWorldContext: "Deployed across colleges in Barrackpore and Ichapur to provide proactive early intervention."
    },
    realEstate: {
      title: "Property Valuation Engine (Kolkata & Salt Lake)",
      task: "Estimate the fair commercial market price of residential apartments in ₹ Lakhs.",
      performance: "Root Mean Squared Error (RMSE) in ₹ Lakhs & R² Score.",
      experience: "Registry database of 18,000 verified property sales across Kolkata, Salt Lake, and New Town.",
      inputFeatures: "x = [Carpet Area (sq.ft), Distance to Metro (km), Age of Building (years), Floor Number]",
      targetVariable: "y ∈ ℝ⁺ (Continuous Price in ₹ Lakhs)",
      mathForm: "ŷ = w₁·Area + w₂·MetroDist + w₃·Age + w₄·Floor + b",
      realWorldContext: "Used by real-estate valuation platforms operating in Kolkata and Rajarhat."
    },
    medical: {
      title: "Diabetic Retinopathy Screening (Jadavpur Health Hub)",
      task: "Detect retinal microaneurysms and lesions from fundus retinal photographs.",
      performance: "Sensitivity (Recall) ≥ 98.5% and Area Under ROC Curve (AUC-ROC).",
      experience: "45,000 expert-ophthalmologist annotated digital fundus color images.",
      inputFeatures: "x ∈ ℝ²²⁴ˣ²²⁴ˣ³ (High-resolution pixel color intensity matrix)",
      targetVariable: "y ∈ {0: No DR, 1: Mild, 2: Moderate, 3: Severe, 4: Proliferative}",
      mathForm: "ŷ = Softmax(f_CNN(x; θ))",
      realWorldContext: "Assists community diagnostic clinics in Jadavpur for early blindness prevention."
    },
    fraudDetection: {
      title: "UPI Financial Fraud Prevention (Salt Lake Sector V)",
      task: "Flag fraudulent digital banking and UPI transactions in real time (sub-50ms).",
      performance: "Precision-Recall AUC (PR-AUC) and False Positive Rate ≤ 0.05%.",
      experience: "Stream of 10,000,000 anonymized transaction histories with verified fraud reports.",
      inputFeatures: "x = [Transaction Amount (₹), Device IP Velocity, Geolocation Distance (km), Hour of Day]",
      targetVariable: "y ∈ {1 (Fraud Attack), 0 (Legitimate Transaction)}",
      mathForm: "Loss = -[y log(ŷ) + (1-y) log(1-ŷ)] + λ||w||₂²",
      realWorldContext: "Embedded in fintech payment gateways across Kolkata Salt Lake Sector V tech corridor."
    }
  };

  // Empirical convergence calculations based on slider (Experience E)
  const currentDomainData = domains[selectedDomain];
  const simulatedSamples = experienceLevel * 100;
  const simulatedAccuracy = Math.min(99.2, +(52.0 + 47.0 * (1 - Math.exp(-experienceLevel / 12))).toFixed(1));
  const simulatedLoss = Math.max(0.045, +(1.45 * Math.exp(-experienceLevel / 10)).toFixed(3));

  // The 8 Piece-by-Piece Educational Steps
  const pieceTabs = [
    { id: 1, title: "1. What are X & y?", icon: "📊" },
    { id: 2, title: "2. Historical Data (X ➔ y)", icon: "🔄" },
    { id: 3, title: "3. Hypothesis h(x)", icon: "🎯" },
    { id: 4, title: "4. What is wᵀx?", icon: "✖️" },
    { id: 5, title: "5. Gradient Optimization", icon: "📉" },
    { id: 6, title: "6. The Golden Rule", icon: "⭐" },
    { id: 7, title: "7. Simple Email Example", icon: "📧" },
    { id: 8, title: "8. In One Sentence", icon: "💡" }
  ];

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16 relative">
      {/* ========================================================================= */}
      {/* FLOATING QUICK-REFERENCE BUTTON */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsSymbolModalOpen(true)}
          className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-4 py-2.5 rounded-full shadow-2xl border border-purple-400/50 flex items-center gap-2.5 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-purple-500/40 group"
          title="Open Math Symbol & Pronunciation Dictionary"
        >
          <span className="text-xl group-hover:rotate-12 transition-transform">🔣</span>
          <span className="text-xs sm:text-sm font-bold tracking-wide">Math Symbol Dictionary</span>
          <span className="bg-purple-950/80 text-[10px] font-mono px-2 py-0.5 rounded-full border border-purple-700">
            {mathSymbolsData.length}
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* QUICK-REFERENCE MODAL OVERLAY */}
      {/* ========================================================================= */}
      {isSymbolModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-purple-500/50 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 sticky top-0 bg-slate-900 z-10">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔣</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Mathematical Symbol &amp; Pronunciation Dictionary</h3>
                  <p className="text-xs text-slate-400">Quick-lookup table with phonetic pronunciations and ML meanings</p>
                </div>
              </div>
              <button
                onClick={() => setIsSymbolModalOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <MathSymbolDictionary />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* HEADER SECTION */}
      {/* ========================================================================= */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Module 1 • Topic 0
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Foundation Theory
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
              Core Principles &amp; T-P-E Formulation
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full">
              🔣 Math Symbol Dictionary
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Meaning and Scope of Machine Learning
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Explore the foundational transition from traditional deterministic programming to inductive statistical learning. Break down core mathematical concepts piece by piece, master all mathematical symbols with phonetic pronunciations, understand Arthur Samuel&apos;s classical vision and Tom Mitchell&apos;s <span className="text-indigo-400 font-semibold">(T, P, E)</span> formulation.
          </p>

          {/* Quick Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Classical Foundations & Definitions" },
              { id: "pieceByPiece", label: "2. Core Principles Piece-by-Piece" },
              { id: "symbols", label: "🔣 3. Math Symbols & Pronunciation Dictionary" },
              { id: "mitchell", label: "4. Interactive T-P-E Formulation Studio" },
              { id: "scope", label: "5. Taxonomy & Industry Scope" },
              { id: "labs", label: "6. Executable Python Labs" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={clsx(
                  "px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer",
                  activeTab === tab.id
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
      {/* SECTION 1: CLASSICAL FOUNDATIONS & DEFINITIONS */}
      {/* ========================================================================= */}
      <section id="theory" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Foundational Definitions of Machine Learning
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              From Arthur Samuel&apos;s pioneering concept to Tom Mitchell&apos;s mathematical formulation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Arthur Samuel Box */}
          <div className="bg-slate-950 p-6 rounded-xl border border-indigo-900/50 space-y-3 hover:border-indigo-500/60 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
                Classical Vision (1959)
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                Arthur Samuel (IBM 704)
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
              &quot;Learning Without Being Explicitly Programmed&quot;
            </h3>
            <blockquote className="border-l-2 border-indigo-500 pl-3.5 py-1 text-sm text-slate-300 italic">
              &quot;Machine Learning is the subfield of computer science that gives computers the ability to learn without being explicitly programmed.&quot;
            </blockquote>
            <p className="text-xs text-slate-400 leading-relaxed">
              Arthur Samuel programmed an IBM 704 to play checkers. Rather than encoding millions of opening moves and endgame trees by hand, he programmed an evaluation function that scored board configurations and adjusted its heuristics over thousands of self-play games.
            </p>
          </div>

          {/* Tom Mitchell Box */}
          <div className="bg-slate-950 p-6 rounded-xl border border-emerald-900/50 space-y-3 hover:border-emerald-500/60 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Formal Engineering Definition (1997)
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Prof. Tom M. Mitchell (CMU)
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
              The (T, P, E) Learning Triad
            </h3>
            <blockquote className="border-l-2 border-emerald-500 pl-3.5 py-1 text-sm text-slate-300 italic">
              &quot;A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E.&quot;
            </blockquote>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs font-mono text-emerald-300">
              Condition: d P(T) / d E &gt; 0 (Monotonic improvement with empirical data)
            </div>
          </div>
        </div>

        {/* Mitchell Triad SVG Flow Diagram */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Visual Blueprint: Tom Mitchell&apos;s Formal Learning Loop</span>
            <span className="font-mono text-[11px] text-indigo-400">Closed-Loop Empirical Optimization</span>
          </div>

          <svg viewBox="0 0 820 220" className="w-full h-auto max-h-56 bg-slate-900/80 rounded-lg p-2 border border-slate-800">
            <defs>
              <linearGradient id={`${svgId1}-tGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id={`${svgId1}-pGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id={`${svgId1}-eGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Task Node */}
            <g>
              <rect x="30" y="45" width="200" height="130" rx="10" fill={`url(#${svgId1}-tGrad)`} stroke="#3b82f6" strokeWidth="1.5" />
              <text x="130" y="75" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold">Task (T)</text>
              <text x="130" y="100" textAnchor="middle" fill="#cbd5e1" fontSize="11">The Concrete Problem</text>
              <text x="130" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9.5">• Exam Pass Prediction</text>
              <text x="130" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9.5">• Kolkata Flat Pricing (₹)</text>
              <text x="130" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9.5">• Retinopathy Diagnosis</text>
            </g>

            {/* Arrow T -> P */}
            <g>
              <line x1="230" y1="110" x2="300" y2="110" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
              <polygon points="305,110 295,105 295,115" fill="#64748b" />
              <text x="265" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">Executes</text>
            </g>

            {/* Performance Node */}
            <g>
              <rect x="310" y="45" width="200" height="130" rx="10" fill={`url(#${svgId1}-pGrad)`} stroke="#10b981" strokeWidth="1.5" />
              <text x="410" y="75" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="bold">Performance (P)</text>
              <text x="410" y="100" textAnchor="middle" fill="#cbd5e1" fontSize="11">Quantitative Metric</text>
              <text x="410" y="125" textAnchor="middle" fill="#a7f3d0" fontSize="9.5">• Accuracy (%) / F1-Score</text>
              <text x="410" y="145" textAnchor="middle" fill="#a7f3d0" fontSize="9.5">• Root Mean Sq Error (RMSE)</text>
              <text x="410" y="165" textAnchor="middle" fill="#a7f3d0" fontSize="9.5">• AUC-ROC / Sensitivity</text>
            </g>

            {/* Arrow P -> E */}
            <g>
              <line x1="510" y1="110" x2="580" y2="110" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
              <polygon points="585,110 575,105 575,115" fill="#64748b" />
              <text x="545" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">Evaluates</text>
            </g>

            {/* Experience Node */}
            <g>
              <rect x="590" y="45" width="200" height="130" rx="10" fill={`url(#${svgId1}-eGrad)`} stroke="#8b5cf6" strokeWidth="1.5" />
              <text x="690" y="75" textAnchor="middle" fill="#c084fc" fontSize="14" fontWeight="bold">Experience (E)</text>
              <text x="690" y="100" textAnchor="middle" fill="#cbd5e1" fontSize="11">Training Corpus / History</text>
              <text x="690" y="125" textAnchor="middle" fill="#ddd6fe" fontSize="9.5">• Labeled Dataset D=(x,y)</text>
              <text x="690" y="145" textAnchor="middle" fill="#ddd6fe" fontSize="9.5">• 50,000 Patient Scans</text>
              <text x="690" y="165" textAnchor="middle" fill="#ddd6fe" fontSize="9.5">• 10M UPI Transaction Logs</text>
            </g>

            {/* Feedback Loop Arc E -> T */}
            <path d="M 690 175 Q 410 225 130 175" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 3" />
            <polygon points="125,175 137,170 135,180" fill="#a855f7" />
            <text x="410" y="210" textAnchor="middle" fill="#e9d5ff" fontSize="10" fontWeight="bold">
              Gradient Descent &amp; Parameter Updates (Iterative Learning)
            </text>
          </svg>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: CORE PRINCIPLES BROKEN DOWN PIECE-BY-PIECE */}
      {/* ========================================================================= */}
      <section id="pieceByPiece" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Deconstructing Machine Learning: Piece by Piece
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              An intuitive, step-by-step masterclass on features X, targets y, hypothesis h(x), weights w, and optimization
            </p>
          </div>
        </div>

        {/* Master Statement Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950/70 to-slate-950 p-5 rounded-xl border border-indigo-500/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider">
              The Core Sentence Deconstructed
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-900/80 text-indigo-200 border border-indigo-700 font-mono">
              The Foundational Paradigm
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
            &quot;The machine learning algorithm consumes historical input vectors <strong className="text-cyan-300">X</strong> and observed outcomes <strong className="text-emerald-300">y</strong>. Using gradient optimization, it synthesizes the hypothesis function <strong className="text-indigo-300 font-mono">h(x) = wᵀx + b</strong> automatically. The programmer defines the learning algorithm and architecture, not the business decision rules.&quot;
          </p>
        </div>

        {/* Piece Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {pieceTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePiece(tab.id)}
              className={clsx(
                "p-2.5 rounded-xl border text-center transition-all duration-300 cursor-pointer space-y-1",
                activePiece === tab.id
                  ? "bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              )}
            >
              <div className="text-base">{tab.icon}</div>
              <div className="text-[11px] font-bold truncate">{tab.title}</div>
            </button>
          ))}
        </div>

        {/* Dynamic Piece Content */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
          {/* PIECE 1 */}
          {activePiece === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-cyan-400">1.</span> What are X and y?
                </h3>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Input Features &amp; Observed Outcomes
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300">
                Suppose we want to predict residential apartment prices in Kolkata and Salt Lake. Our historical dataset might look like:
              </p>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-slate-800 bg-slate-900/90 rounded-xl overflow-hidden font-mono">
                  <thead className="bg-slate-800 text-slate-200 uppercase text-[11px]">
                    <tr>
                      <th className="p-3 border-r border-slate-700 text-cyan-300">Size (sq ft) [x₁]</th>
                      <th className="p-3 border-r border-slate-700 text-cyan-300">Bedrooms [x₂]</th>
                      <th className="p-3 border-r border-slate-700 text-cyan-300">Age (years) [x₃]</th>
                      <th className="p-3 text-emerald-300 bg-emerald-950/40">Actual Price (y)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 border-r border-slate-800">1000</td>
                      <td className="p-3 border-r border-slate-800">2</td>
                      <td className="p-3 border-r border-slate-800">10</td>
                      <td className="p-3 text-emerald-400 font-bold bg-emerald-950/20">₹ 40 Lakhs</td>
                    </tr>
                    <tr className="bg-indigo-950/20 hover:bg-indigo-950/40 border-l-2 border-indigo-500">
                      <td className="p-3 border-r border-slate-800 font-bold text-white">1500</td>
                      <td className="p-3 border-r border-slate-800 font-bold text-white">3</td>
                      <td className="p-3 border-r border-slate-800 font-bold text-white">5</td>
                      <td className="p-3 text-emerald-400 font-bold bg-emerald-950/30">₹ 60 Lakhs</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 border-r border-slate-800">2000</td>
                      <td className="p-3 border-r border-slate-800">4</td>
                      <td className="p-3 border-r border-slate-800">3</td>
                      <td className="p-3 text-emerald-400 font-bold bg-emerald-950/20">₹ 85 Lakhs</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 border-r border-slate-800">2500</td>
                      <td className="p-3 border-r border-slate-800">4</td>
                      <td className="p-3 border-r border-slate-800">2</td>
                      <td className="p-3 text-emerald-400 font-bold bg-emerald-950/20">₹ 110 Lakhs</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-900 rounded-xl border border-cyan-900/50 space-y-2">
                  <div className="font-bold text-cyan-300 text-xs uppercase font-mono">X = Input Features Matrix</div>
                  <p className="text-xs text-slate-300">
                    The measurable characteristics describing the item: <strong className="text-white">house size</strong>, <strong className="text-white">number of bedrooms</strong>, and <strong className="text-white">building age</strong>.
                  </p>
                  <p className="text-xs font-mono text-cyan-200">
                    Conceptually: X = [size, bedrooms, age]
                  </p>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-emerald-900/50 space-y-2">
                  <div className="font-bold text-emerald-300 text-xs uppercase font-mono">y = Observed Outcome (Ground Truth)</div>
                  <p className="text-xs text-slate-300">
                    The true historical target we want to predict: the <strong className="text-white">actual selling price</strong> of the house.
                  </p>
                  <p className="text-xs font-mono text-emerald-200">
                    Conceptually: y = actual price (₹ Lakhs)
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono">
                💡 <strong className="text-white">Input Vector:</strong> Each single row of X is called an <em>input vector</em> <span className="text-cyan-300">x = [1500, 3, 5]</span>, and its corresponding observed outcome is <span className="text-emerald-400">y = ₹60 Lakhs</span>.
              </div>
            </div>
          )}

          {/* PIECE 2 */}
          {activePiece === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-indigo-400">2.</span> What does &quot;Historical Input Vectors X and Observed Outcomes y&quot; Mean?
                </h3>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  Learning from Past Experience (E)
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                It simply means we feed the algorithm a collection of past verified examples where we already know both the input conditions and the final answers:
              </p>

              {/* Visual Mapping Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-2">
                  <span className="text-[10px] text-slate-400 uppercase">Example 1</span>
                  <div className="text-cyan-300 font-bold">[1000, 2, 10]</div>
                  <div className="text-slate-500 font-bold">➔</div>
                  <div className="text-emerald-400 font-bold text-sm">₹ 40 Lakhs</div>
                </div>

                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-2">
                  <span className="text-[10px] text-slate-400 uppercase">Example 2</span>
                  <div className="text-cyan-300 font-bold">[1500, 3, 5]</div>
                  <div className="text-slate-500 font-bold">➔</div>
                  <div className="text-emerald-400 font-bold text-sm">₹ 60 Lakhs</div>
                </div>

                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-2">
                  <span className="text-[10px] text-slate-400 uppercase">Example 3</span>
                  <div className="text-cyan-300 font-bold">[2000, 4, 3]</div>
                  <div className="text-slate-500 font-bold">➔</div>
                  <div className="text-emerald-400 font-bold text-sm">₹ 85 Lakhs</div>
                </div>

                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-2">
                  <span className="text-[10px] text-slate-400 uppercase">Example 4</span>
                  <div className="text-cyan-300 font-bold">[2500, 4, 2]</div>
                  <div className="text-slate-500 font-bold">➔</div>
                  <div className="text-emerald-400 font-bold text-sm">₹ 110 Lakhs</div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-indigo-950/60 to-slate-900 rounded-xl border border-indigo-800/40 text-xs sm:text-sm text-slate-300 space-y-2">
                <p>
                  The Machine Learning algorithm studies thousands of these past examples and automatically tries to discover the underlying mathematical pattern connecting <strong className="text-cyan-300">X</strong> to <strong className="text-emerald-300">y</strong>.
                </p>
              </div>
            </div>
          )}

          {/* PIECE 3 */}
          {activePiece === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-emerald-400">3.</span> What is the Hypothesis Function?
                </h3>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  The Learned Prediction Rule
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The <strong className="text-white">hypothesis</strong> is simply the <strong className="text-emerald-300">prediction rule</strong> learned by the machine. For a standard linear model:
              </p>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 text-center font-mono text-lg sm:text-xl font-bold text-cyan-300">
                h(x) = wᵀx + b
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Don&apos;t let the linear algebra notation intimidate you! It simply means:
              </p>

              <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-center font-mono text-sm text-amber-300 font-bold">
                Prediction = (Weighted combination of inputs) + Bias
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">Concrete House Price Example:</span>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed space-y-1">
                  <div>Price = <span className="text-cyan-400 font-bold">0.03</span> &times; Size + <span className="text-cyan-400 font-bold">5</span> &times; Bedrooms - <span className="text-cyan-400 font-bold">2</span> &times; Age + <span className="text-amber-400 font-bold">10</span></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                    • The numbers <span className="font-mono text-cyan-400 font-bold">0.03, 5, -2</span> are the <strong className="text-white">Weights (w)</strong>.
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                    • The number <span className="font-mono text-amber-400 font-bold">10</span> is the baseline <strong className="text-white">Bias (b)</strong>.
                  </div>
                </div>
              </div>

              {/* Live Interactive Predictor */}
              <div className="p-5 bg-gradient-to-r from-slate-950 to-indigo-950/60 rounded-xl border border-indigo-800/40 space-y-3">
                <span className="text-xs font-mono font-bold text-indigo-300 uppercase">Test the Learned Hypothesis Live:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="space-y-1">
                    <span className="text-slate-400">Size (sq.ft): {demoSize}</span>
                    <input
                      type="range"
                      min="800"
                      max="3000"
                      step="50"
                      value={demoSize}
                      onChange={(e) => setDemoSize(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded accent-cyan-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400">Bedrooms: {demoBeds}</span>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={demoBeds}
                      onChange={(e) => setDemoBeds(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded accent-cyan-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400">Age: {demoAge} yrs</span>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={demoAge}
                      onChange={(e) => setDemoAge(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded accent-cyan-500"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300">Hypothesis Output h(x):</span>
                  <span className="text-emerald-400 font-bold text-base">₹ {predictedHousePrice} Lakhs</span>
                </div>
              </div>
            </div>
          )}

          {/* PIECE 4 */}
          {activePiece === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-purple-400">4.</span> What does wᵀx Mean?
                </h3>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  Vector Dot Product
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Suppose our input vector and weight vector have 3 elements each:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs text-center">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block mb-1">Input Feature Vector:</span>
                  <span className="text-cyan-300 font-bold text-sm">x = [x₁, x₂, x₃]</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block mb-1">Learnable Weight Vector:</span>
                  <span className="text-indigo-300 font-bold text-sm">w = [w₁, w₂, w₃]</span>
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                <div className="text-slate-400">Then the matrix multiplication <strong className="text-white">wᵀx</strong> means:</div>
                <div className="p-3 bg-slate-950 rounded-lg text-sm text-center text-cyan-300 font-bold">
                  wᵀx = (w₁ &times; x₁) + (w₂ &times; x₂) + (w₃ &times; x₃)
                </div>
                <div className="text-slate-400 pt-2 border-t border-slate-800">So the full hypothesis equation is:</div>
                <div className="p-3 bg-slate-950 rounded-lg text-sm text-center text-emerald-400 font-bold">
                  h(x) = w₁x₁ + w₂x₂ + w₃x₃ + b
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
                <strong className="text-white uppercase font-mono block">In our Kolkata House Pricing Model:</strong>
                <p className="font-mono text-slate-300">
                  h(x) = (weight₁ &times; size) + (weight₂ &times; bedrooms) + (weight₃ &times; age) + bias
                </p>
                <p className="text-indigo-300 pt-1">
                  ⭐ <strong className="text-white">The Crucial Takeaway:</strong> The programmer does <em>not</em> choose these weights manually. The optimization algorithm discovers them automatically from the data!
                </p>
              </div>
            </div>
          )}

          {/* PIECE 5 */}
          {activePiece === 5 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-amber-400">5.</span> What does Gradient Optimization Do?
                </h3>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  The Learning Process
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                This is the actual &quot;learning&quot; part of Machine Learning. Initially, the model starts with terrible or random weights (e.g. w₁ = 0, w₂ = 0, w₃ = 0, b = 0). Therefore, its initial predictions are completely wrong.
              </p>

              {/* Step-by-Step Flowchart */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                <div className="text-xs font-bold text-amber-400 uppercase">The Iterative Optimization Loop:</div>
                <div className="grid grid-cols-1 sm:grid-cols-7 gap-2 text-center items-center">
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Step 1</span>
                    <strong className="text-white text-[11px]">Initial Weights</strong>
                  </div>
                  <div className="text-slate-500 font-bold">➔</div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Step 2</span>
                    <strong className="text-cyan-300 text-[11px]">Predict h(x)</strong>
                  </div>
                  <div className="text-slate-500 font-bold">➔</div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Step 3</span>
                    <strong className="text-rose-400 text-[11px]">Loss vs Actual y</strong>
                  </div>
                  <div className="text-slate-500 font-bold">➔</div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Step 4</span>
                    <strong className="text-emerald-400 text-[11px]">Update Weights w</strong>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  1. The algorithm compares <strong className="text-cyan-300 font-mono">Predicted Value h(x)</strong> vs <strong className="text-emerald-300 font-mono">Actual Value y</strong>.
                </p>
                <p>
                  2. It calculates how wrong predictions are using a <strong className="text-white">Loss / Cost Function</strong>.
                </p>
                <p>
                  3. Gradient Descent computes the slope (derivative) and adjusts the weights in the direction that reduces error:
                  <span className="font-mono text-cyan-300 bg-slate-900 px-2 py-0.5 rounded ml-1 border border-slate-800">w := w - &alpha; &nabla;Loss</span>
                </p>
                <p>
                  4. Over hundreds of iterations, the algorithm arrives at optimal weights: <span className="font-mono text-emerald-300 font-bold">w = [0.03, 5, -2], b = 10</span>.
                </p>
              </div>
            </div>
          )}

          {/* PIECE 6 */}
          {activePiece === 6 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-rose-400">6.</span> The Most Important Sentence
                </h3>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800">
                  Architectural Distinction
                </span>
              </div>

              <blockquote className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-500/50 text-xs sm:text-sm text-indigo-200 font-medium italic leading-relaxed">
                &quot;The programmer defines the learning algorithm and architecture, not the business decision rules.&quot;
              </blockquote>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                {/* Traditional Box */}
                <div className="p-5 bg-slate-900 rounded-xl border border-amber-900/40 space-y-3">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                    Traditional Programming (Rules Handcrafted)
                  </span>
                  <p className="text-xs text-slate-300">
                    The programmer explicitly writes every conditional branch:
                  </p>
                  <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-amber-300 overflow-x-auto">
{`IF income > ₹50,000
AND age > 25
AND credit_score > 750
THEN approve_loan()
ELSE reject_loan()`}
                  </pre>
                  <div className="text-[11px] text-slate-400 font-mono text-center pt-1">
                    Programmer ➔ Handcrafted Rules + Data ➔ Output
                  </div>
                </div>

                {/* ML Box */}
                <div className="p-5 bg-slate-900 rounded-xl border border-indigo-900/40 space-y-3">
                  <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider block">
                    Machine Learning (Rules Synthesized)
                  </span>
                  <p className="text-xs text-slate-300">
                    The programmer provides historical data and an optimization engine:
                  </p>
                  <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-indigo-300 overflow-x-auto">
{`# Programmer sets architecture & loss:
model = LinearRegression()
model.fit(X_historical, y_historical)

# Weights are discovered automatically!
# w = [0.03, 5, -2], b = 10`}
                  </pre>
                  <div className="text-[11px] text-slate-400 font-mono text-center pt-1">
                    Historical Data (X, y) + Learning Algorithm ➔ Learned Model h(x) ➔ Output
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PIECE 7 */}
          {activePiece === 7 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-cyan-400">7.</span> A Very Simple Example: Email Spam Classifier
                </h3>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Binary Classification in Action
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Imagine teaching a computer to distinguish between Spam and Legitimate emails. You provide thousands of historical emails:
              </p>

              {/* Mapping List */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-800 pb-1 text-slate-400 font-bold text-[11px]">
                  <span>Email Feature Vector (X)</span>
                  <span>Observed Result (y)</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-cyan-300">[5 exclamation marks, 10 dollar signs, 2 links, ...]</span>
                  <span className="text-rose-400 font-bold">➔ Spam</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-cyan-300">[1 exclamation mark, 2 dollar signs, 0 links, ...]</span>
                  <span className="text-emerald-400 font-bold">➔ Not Spam</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-cyan-300">[8 exclamation marks, 15 dollar signs, 4 links, ...]</span>
                  <span className="text-rose-400 font-bold">➔ Spam</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-cyan-300">[2 exclamation marks, 1 dollar sign, 0 links, ...]</span>
                  <span className="text-emerald-400 font-bold">➔ Not Spam</span>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-slate-950 to-indigo-950/60 rounded-xl border border-indigo-800/40 space-y-2 text-xs sm:text-sm text-slate-300">
                <p>
                  1. The algorithm adjusts parameters until it constructs the hypothesis: <span className="font-mono text-cyan-300">h(x) = &sigma;(wᵀx + b)</span>.
                </p>
                <p>
                  2. Now a brand-new incoming email arrives: <span className="font-mono text-white">[6, 12, 3, ...]</span>.
                </p>
                <p>
                  3. The learned model calculates: <span className="font-mono text-emerald-400 font-bold">h(x) = 0.94</span> &rarr; <strong className="text-white">94% probability of Spam</strong>!
                </p>
                <p className="text-slate-400 italic text-[11px] pt-1">
                  The programmer created the learning mechanism. The training data allowed the system to learn the parameters.
                </p>
              </div>
            </div>
          )}

          {/* PIECE 8 */}
          {activePiece === 8 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-emerald-400">8.</span> In One Sentence: The Grand Synthesis
                </h3>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Executive Summary
                </span>
              </div>

              <div className="p-6 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 rounded-2xl border border-indigo-500/50 shadow-xl space-y-3">
                <span className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider block">
                  The Core Takeaway of Supervised Machine Learning
                </span>
                <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
                  &quot;Instead of programming the exact prediction rules by hand, we give the machine historical examples <span className="text-cyan-300 font-mono">(X, y)</span>, and an optimization algorithm automatically learns the parameters <span className="text-amber-300 font-mono">w</span> and <span className="text-amber-300 font-mono">b</span> that produce a useful prediction function <span className="text-emerald-300 font-mono">h(x) = wᵀx + b</span>.&quot;
                </p>
              </div>

              {/* Side-by-side memory anchor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 bg-slate-900 rounded-xl border border-amber-900/40 text-center space-y-1">
                  <span className="text-amber-400 font-bold uppercase text-[10px] block">Traditional Programming:</span>
                  <div className="text-slate-200 text-sm font-bold pt-1">Rules + Data ➔ Output</div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-indigo-900/40 text-center space-y-1">
                  <span className="text-indigo-400 font-bold uppercase text-[10px] block">Machine Learning:</span>
                  <div className="text-cyan-300 text-sm font-bold pt-1">Data + Answers + Algorithm ➔ Learned Model ➔ Output</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: MATHEMATICAL SYMBOLS, PRONUNCIATION & MEANING DICTIONARY */}
      {/* ========================================================================= */}
      <section id="symbols" className="scroll-mt-6">
        <MathSymbolDictionary />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: INTERACTIVE T-P-E FORMULATION STUDIO */}
      {/* ========================================================================= */}
      <section id="mitchell" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            04
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Tom Mitchell (T, P, E) Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Select real-world industry domains and observe mathematical convergence with Experience (E)
            </p>
          </div>
        </div>

        {/* Domain Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: "academic", label: "Student Grade (Barrackpore)", icon: "🎓" },
            { id: "realEstate", label: "Flat Valuation (Kolkata)", icon: "🏢" },
            { id: "medical", label: "Retinopathy (Jadavpur)", icon: "🔬" },
            { id: "fraudDetection", label: "UPI Fraud (Salt Lake)", icon: "💳" }
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDomain(d.id)}
              className={clsx(
                "p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer space-y-1",
                selectedDomain === d.id
                  ? "bg-indigo-950/80 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              )}
            >
              <div className="text-xl">{d.icon}</div>
              <div className="text-xs font-bold">{d.label}</div>
            </button>
          ))}
        </div>

        {/* Detailed Domain Breakdown Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950 p-5 rounded-xl border border-blue-900/40 space-y-2">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" /> 1. Task (T)
            </span>
            <p className="text-xs sm:text-sm text-slate-200">{currentDomainData.task}</p>
            <div className="text-[11px] font-mono text-blue-300/80 pt-2 border-t border-slate-800">
              Target: {currentDomainData.targetVariable}
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> 2. Performance (P)
            </span>
            <p className="text-xs sm:text-sm text-slate-200">{currentDomainData.performance}</p>
            <div className="text-[11px] font-mono text-emerald-300/80 pt-2 border-t border-slate-800">
              Formula: {currentDomainData.mathForm}
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-purple-900/40 space-y-2">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" /> 3. Experience (E)
            </span>
            <p className="text-xs sm:text-sm text-slate-200">{currentDomainData.experience}</p>
            <div className="text-[11px] font-mono text-purple-300/80 pt-2 border-t border-slate-800">
              Vector: {currentDomainData.inputFeatures}
            </div>
          </div>
        </div>

        {/* Interactive Experience (E) Slider & Convergence Simulator */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Simulate Experience Accumulation (Dataset Scale N)
              </h3>
              <p className="text-xs text-slate-400">
                Observe how empirical risk minimization drives loss down and accuracy up
              </p>
            </div>
            <div className="text-right font-mono text-xs text-indigo-400 font-bold bg-indigo-950 px-3 py-1.5 rounded-lg border border-indigo-800">
              Experience Dataset: {simulatedSamples.toLocaleString()} Samples
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="50"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>100 Samples (Cold Start / High Variance)</span>
              <span>2,500 Samples</span>
              <span>5,000+ Samples (Asymptotic Convergence)</span>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Model Generalization Accuracy</span>
              <div className="text-2xl font-black font-mono text-emerald-400">{simulatedAccuracy}%</div>
              <div className="text-[10px] text-slate-500">Evaluated on held-out test partition</div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Empirical Cross-Entropy Loss</span>
              <div className="text-2xl font-black font-mono text-cyan-400">{simulatedLoss}</div>
              <div className="text-[10px] text-slate-500">Loss function L(w, b) penalty</div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Learning Regime Status</span>
              <div className="text-base font-bold text-indigo-300 font-mono">
                {experienceLevel < 8
                  ? "Underfitting (High Bias)"
                  : experienceLevel > 42
                  ? "Asymptotic Optimal State"
                  : "Stable Empirical Learning"}
              </div>
              <div className="text-[10px] text-slate-500">
                {experienceLevel < 8
                  ? "Insufficient data to capture manifold"
                  : "Parameters successfully converged"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: TAXONOMY & INDUSTRY SCOPE */}
      {/* ========================================================================= */}
      <section id="scope" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-lg">
            05
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Taxonomy and Global Scope of Machine Learning
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              The four foundational learning paradigms governing modern artificial intelligence
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Supervised */}
          <div className="bg-slate-950 p-5 rounded-xl border border-blue-900/40 space-y-3 hover:border-blue-500/60 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-400">Supervised</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">Labeled (x, y)</span>
              </div>
              <h3 className="text-base font-bold text-white">Regression &amp; Classification</h3>
              <p className="text-xs text-slate-300">
                Learns a mapping function from input features x to target labels y provided by human ground truth.
              </p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded text-[11px] font-mono text-slate-400 space-y-1">
              <div>• Linear/Logistic Regression</div>
              <div>• Random Forests, XGBoost</div>
              <div>• Deep Neural Networks</div>
            </div>
          </div>

          {/* Unsupervised */}
          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3 hover:border-emerald-500/60 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">Unsupervised</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Unlabeled {'{x}'}</span>
              </div>
              <h3 className="text-base font-bold text-white">Clustering &amp; Dimensionality</h3>
              <p className="text-xs text-slate-300">
                Discovers hidden structures, probability density modes, customer segments, and low-rank manifolds without target labels.
              </p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded text-[11px] font-mono text-slate-400 space-y-1">
              <div>• k-Means, DBSCAN Clustering</div>
              <div>• PCA, t-SNE, UMAP</div>
              <div>• Isolation Forest Anomalies</div>
            </div>
          </div>

          {/* Semi-Supervised */}
          <div className="bg-slate-950 p-5 rounded-xl border border-purple-900/40 space-y-3 hover:border-purple-500/60 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-400">Semi-Supervised</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">Small D_L + Big D_U</span>
              </div>
              <h3 className="text-base font-bold text-white">Label Propagation</h3>
              <p className="text-xs text-slate-300">
                Leverages massive unannotated data geometric manifolds alongside a small seed of expensive expert-labeled ground truths.
              </p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded text-[11px] font-mono text-slate-400 space-y-1">
              <div>• Graph-based Label Spreading</div>
              <div>• Pseudo-Labeling</div>
              <div>• Self-Supervised Pretext Tasks</div>
            </div>
          </div>

          {/* Reinforcement Learning */}
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3 hover:border-rose-500/60 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-400">Reinforcement</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">Action-Reward</span>
              </div>
              <h3 className="text-base font-bold text-white">Sequential Decision Agents</h3>
              <p className="text-xs text-slate-300">
                An autonomous agent interacts with dynamic environments, executing actions to maximize cumulative discounted rewards over time.
              </p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded text-[11px] font-mono text-slate-400 space-y-1">
              <div>• Q-Learning, SARSA</div>
              <div>• Deep Q-Networks (DQN)</div>
              <div>• Proximal Policy Opt (PPO)</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: PYTHON LABORATORY LOADER */}
      {/* ========================================================================= */}
      <section id="labs" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            06
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Executable Python Laboratory Simulations
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Compare Scikit-Learn standard industry pipelines against pure Python first-principles optimization
            </p>
          </div>
        </div>

        {/* Interactive 2D Visual Regression Studio */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                Live Interactive Visual Regression: Study Hours vs Exam Marks
              </span>
              <p className="text-xs text-slate-400">
                Observe the linear hypothesis line <span className="font-mono text-cyan-300">h(x) = 7.30 &times; Hours + 26.29</span> predicting test marks
              </p>
            </div>
            <div className="font-mono text-xs text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-800">
              Model Fit: R² = 99.65%
            </div>
          </div>

          {/* Interactive SVG Plot */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-2/3">
              <svg viewBox="0 0 500 280" className="w-full h-auto bg-slate-950 rounded-lg p-2 border border-slate-800">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line key={`h-${i}`} x1="45" y1={40 + i * 40} x2="480" y2={40 + i * 40} stroke="#334155" strokeDasharray="3 3" strokeWidth="0.75" />
                ))}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <line key={`v-${i}`} x1={45 + i * 50} y1="40" x2={45 + i * 50} y2="240" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.75" />
                ))}

                {/* Y-Axis Labels (Marks: 20 to 100) */}
                <text x="35" y="244" textAnchor="end" fill="#94a3b8" fontSize="9">20</text>
                <text x="35" y="204" textAnchor="end" fill="#94a3b8" fontSize="9">40</text>
                <text x="35" y="164" textAnchor="end" fill="#94a3b8" fontSize="9">60</text>
                <text x="35" y="124" textAnchor="end" fill="#94a3b8" fontSize="9">80</text>
                <text x="35" y="84" textAnchor="end" fill="#94a3b8" fontSize="9">100</text>

                {/* X-Axis Labels (Hours: 1 to 9) */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((h) => (
                  <text key={`xl-${h}`} x={45 + (h - 1) * 50} y="258" textAnchor="middle" fill="#94a3b8" fontSize="9">{h}h</text>
                ))}

                {/* Regression Line: from (1h, 33.6m) to (9h, 92.0m) */}
                <line
                  x1={45}
                  y1={240 - ((33.58 - 20) / 80) * 160}
                  x2={45 + 8 * 50}
                  y2={240 - ((91.96 - 20) / 80) * 160}
                  stroke="#ef4444"
                  strokeWidth="2.5"
                />

                {/* Actual Historical Scatter Points */}
                {studyData.map((pt, idx) => {
                  const cx = 45 + (pt.hours - 1) * 50;
                  const cy = 240 - ((pt.marks - 20) / 80) * 160;
                  return (
                    <g key={idx}>
                      <circle cx={cx} cy={cy} r="5" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
                      <text x={cx} y={cy - 8} textAnchor="middle" fill="#cbd5e1" fontSize="8" fontWeight="bold">
                        {pt.marks}m
                      </text>
                    </g>
                  );
                })}

                {/* Live Predicted Star for Unseen Student */}
                {(() => {
                  const starX = 45 + (studyHoursInput - 1) * 50;
                  const starY = 240 - ((predictedStudyMarks - 20) / 80) * 160;
                  return (
                    <g>
                      <circle cx={starX} cy={starY} r="8" fill="#10b981" fillOpacity="0.4" className="animate-ping" />
                      <circle cx={starX} cy={starY} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Live Slider & Predictions */}
            <div className="w-full md:w-1/3 space-y-4 font-mono text-xs">
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <div className="text-slate-400 uppercase text-[10px] font-bold">Adjust Unseen Study Hours (X):</div>
                <div className="text-cyan-300 font-bold text-lg">{studyHoursInput} Hours / Day</div>
                <input
                  type="range"
                  min="1"
                  max="9"
                  step="0.5"
                  value={studyHoursInput}
                  onChange={(e) => setStudyHoursInput(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="p-3.5 bg-emerald-950/40 rounded-lg border border-emerald-800/60 space-y-1">
                <div className="text-slate-400 uppercase text-[10px] font-bold">Predicted Exam Marks (ŷ):</div>
                <div className="text-emerald-400 font-bold text-2xl font-mono">{predictedStudyMarks} / 100</div>
                <div className="text-[10px] text-slate-400">h({studyHoursInput}) = 7.30 &times; {studyHoursInput} + 26.29</div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-[11px] text-slate-400 space-y-0.5">
                <div>• <strong className="text-slate-200">Weight (w):</strong> 7.30 marks/hour</div>
                <div>• <strong className="text-slate-200">Bias (b):</strong> 26.29 baseline marks</div>
              </div>
            </div>
          </div>
        </div>

        {/* Laboratory Code Switcher Tabs */}
        <div className="flex gap-2 p-1.5 bg-slate-950 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveLabTab("sklearn")}
            className={clsx(
              "flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer",
              activeLabTab === "sklearn"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            🔬 Lab 1: Scikit-Learn Regression (Pandas &amp; Matplotlib)
          </button>
          <button
            onClick={() => setActiveLabTab("firstprinciples")}
            className={clsx(
              "flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer",
              activeLabTab === "firstprinciples"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            ⚙️ Lab 2: Multi-Feature Gradient Descent Lab
          </button>
        </div>

        {activeLabTab === "sklearn" ? (
          <PythonFileLoader
            fileModule={studyHoursLab}
            title="study_hours_regression_lab.py"
            highlightLines={[19, 29, 39, 44, 45, 52, 60]}
          />
        ) : (
          <PythonFileLoader
            fileModule={meaningScopeLab}
            title="meaning_scope_ml_lab.py"
            highlightLines={[27, 36, 44, 56, 95, 131, 151, 193]}
          />
        )}
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: FAQ TEMPLATE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <FAQTemplate
          title="Meaning and Scope of Machine Learning — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: PRINTABLE NOTE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Meaning and Scope of Machine Learning"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 0 Study Note"
          downloadFileName="topic0_note.txt"
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: TEACHER NOTE */}
      {/* ========================================================================= */}
      <section>
        <Teacher
          note="Always remember: In traditional programming, YOU write the logic rules. In Machine Learning, you provide the data (X, y) and an optimization engine, and the COMPUTER discovers the logic weights w and bias b. Master the hypothesis function h(x) = wᵀx + b, understand how gradient descent reduces loss, and you will understand the essence of all artificial intelligence!"
        />
      </section>
    </div>
  );
};

export default Topic0;
