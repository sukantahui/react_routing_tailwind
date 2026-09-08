import React, { useState } from "react";
import {
  HelpCircle,
  Sparkles,
  BookOpen,
  Code2,
  Copy,
  Check,
  Award,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Layers
} from "lucide-react";

import pyCode1 from "./topic14_files/01_viva_qa_suite1.py?raw";
import pyCode2 from "./topic14_files/02_viva_qa_suite2.py?raw";
import pyCode3 from "./topic14_files/03_scipy_interview_cheatsheet.py?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions.js";

const vivaCards = [
  {
    q: "1. What is SciPy and how does it relate to NumPy in Machine Learning?",
    a: "NumPy provides the fundamental N-dimensional array (ndarray) and element-wise math. SciPy builds on top of NumPy arrays to provide high-level, compiled scientific algorithms (stats, spatial, linalg, optimize, integrate). Libraries like Scikit-learn rely heavily on SciPy internally.",
    category: "Architecture"
  },
  {
    q: "2. Why is explicit submodule importing mandatory in SciPy?",
    a: "To keep startup fast and memory lightweight, top-level 'import scipy' does not auto-populate subpackages. Developers must explicitly write 'from scipy import stats, spatial, linalg, optimize' to load the corresponding compiled C/Fortran modules.",
    category: "Imports & Setup"
  },
  {
    q: "3. What is the universal distribution API in scipy.stats?",
    a: "All continuous and discrete distributions follow a consistent API: .pdf(x)/.pmf(k) for density/mass, .cdf(x) for cumulative P(X<=x), .sf(x) for survival P(X>x), .ppf(q) for quantiles (inverse CDF), and .rvs(n) for random sampling.",
    category: "Statistics"
  },
  {
    q: "4. What is a Z-score and why is it essential for distance-based ML models?",
    a: "Z = (X - μ) / σ. It standardizes variables to mean=0 and std=1. Without Z-score standardization, features with larger numerical magnitudes (e.g. Salary ₹50,000) would completely overwhelm features with small magnitudes (e.g. Age 25) in Euclidean distance calculations.",
    category: "Data Preprocessing"
  },
  {
    q: "5. What is the decision rule for p-values in hypothesis testing?",
    a: "If p-value < α (standard 0.05), reject the Null Hypothesis (H0) and conclude statistical significance. If p-value >= α, fail to reject H0 due to insufficient evidence.",
    category: "Hypothesis Testing"
  },
  {
    q: "6. Difference between scipy.spatial.distance.cdist and pdist?",
    a: "cdist(XA, XB) computes cross-distances between two separate matrices XA (M rows) and XB (N rows) returning an (M x N) matrix. pdist(X) computes pairwise distances between observations within a single matrix.",
    category: "Spatial Metrics"
  },
  {
    q: "7. Why is scipy.linalg.solve(A, b) preferred over inv(A) @ b?",
    a: "solve() uses direct LAPACK LU decomposition, which runs ~2x faster and avoids the numerical floating-point precision loss inherent to computing explicit matrix inverses.",
    category: "Linear Algebra"
  },
  {
    q: "8. What algorithm does scipy.optimize.minimize use for smooth convex loss functions?",
    a: "BFGS and L-BFGS-B (Limited-memory BFGS), which approximate the inverse Hessian matrix using gradient evaluations to achieve quadratic convergence.",
    category: "Optimization"
  }
];

export default function Topic14() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls
  const [expandedCard, setExpandedCard] = useState(null);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_viva_qa_suite1.py", code: pyCode1 },
    { name: "02_viva_qa_suite2.py", code: pyCode2 },
    { name: "03_scipy_interview_cheatsheet.py", code: pyCode3 }
  ];

  const copyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectAnswer = (qId, optionIdx) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <Award className="w-4 h-4" />
                <span>Machine Learning Module 009_006 • Topic 14</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                SciPy Short Questions &amp; Viva Guide
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Comprehensive viva exam preparation, technical interview flashcards, and conceptual cheat sheets covering the full SciPy scientific stack.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Interactive Viva Flashcards", icon: Sparkles },
              { id: "code", label: "Python Code Lab", icon: Code2 },
              { id: "notes", label: "Revision Notes", icon: BookOpen },
              { id: "quiz", label: "Knowledge Check", icon: HelpCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs md:text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                      : "bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Interactive Studio */}
        {activeTab === "interactive" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-400">
                Core Conceptual Flashcards ({vivaCards.length} Questions)
              </span>
              <span className="text-xs text-slate-500">Click card to toggle answer</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vivaCards.map((card, idx) => {
                const isOpen = expandedCard === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setExpandedCard(isOpen ? null : idx)}
                    className={`bg-slate-900/90 border rounded-2xl p-5 cursor-pointer transition-all ${
                      isOpen
                        ? "border-emerald-500 shadow-lg shadow-emerald-950/50 bg-slate-900"
                        : "border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                          {card.category}
                        </span>
                        <h3 className="text-xs md:text-sm font-semibold text-white mt-1 leading-snug">
                          {card.q}
                        </h3>
                      </div>
                      <div className="text-slate-400 mt-1 shrink-0">
                        {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>

                    {isOpen && (
                      <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
                        <p>{card.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Code Lab */}
        {activeTab === "code" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
              <div className="flex flex-wrap gap-2">
                {scripts.map((script, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedScript(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      selectedScript === idx
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                        : "bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800"
                    }`}
                  >
                    {script.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => copyCode(scripts[selectedScript].code)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Code"}</span>
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 overflow-x-auto font-mono text-xs leading-relaxed text-slate-300">
              <pre>{scripts[selectedScript].code}</pre>
            </div>
          </div>
        )}

        {/* Tab 3: Notes */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Classroom Printable Notes</span>
              </div>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Notes"}</span>
              </button>
            </div>
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 overflow-x-auto font-mono text-xs leading-relaxed text-slate-300 whitespace-pre-wrap">
              {noteText}
            </div>
          </div>
        )}

        {/* Tab 4: Knowledge Quiz */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Concept Validation &amp; Knowledge Check</span>
              </div>
              {submittedQuiz && (
                <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-semibold">
                  Score: {calculateScore()} / {questions.length}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {questions.map((q, idx) => {
                const selected = selectedAnswers[q.id];
                return (
                  <div key={q.id} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                    <h3 className="text-sm font-semibold text-white">
                      {idx + 1}. {q.question}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt, optIdx) => {
                        let btnClass = "bg-slate-900 hover:bg-slate-800/80 border-slate-800 text-slate-300";
                        if (selected === optIdx) {
                          btnClass = "bg-emerald-950 border-emerald-500 text-white";
                        }
                        if (submittedQuiz) {
                          if (optIdx === q.correctAnswer) {
                            btnClass = "bg-emerald-900/80 border-emerald-500 text-white font-semibold";
                          } else if (selected === optIdx && selected !== q.correctAnswer) {
                            btnClass = "bg-rose-950 border-rose-500 text-rose-200";
                          }
                        }
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(q.id, optIdx)}
                            className={`p-3 rounded-lg border text-left text-xs transition-all ${btnClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {submittedQuiz && (
                      <div className="mt-3 p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1">
                        <span className="font-semibold text-emerald-400">Explanation: </span>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                onClick={() => setSubmittedQuiz(!submittedQuiz)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-lg shadow-emerald-600/30"
              >
                {submittedQuiz ? "Reset Quiz" : "Submit Answers"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
