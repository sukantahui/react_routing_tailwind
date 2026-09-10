import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic19_files/practice_problems_lab.py?raw";
import noteText from "./topic19_files/topic19_note.txt?raw";
import questions from "./topic19_files/topic19_questions.js";

const Topic19 = () => {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");

  // Novice Classroom Tab State
  const [selectedLessonTab, setSelectedLessonTab] = useState("problems");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Practice Problem Interactive State
  const [activeProblemId, setActiveProblemId] = useState(1);
  const [revealedSolutions, setRevealedSolutions] = useState({});

  const toggleRevealSolution = (id) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const svgId = useId();

  // Smooth scroll handler
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 4 Comprehensive Worked Calculation Problems
  const practiceProblems = [
    {
      id: 1,
      title: "Problem 1: Logistic Regression Sigmoid & Log-Loss Calculation",
      category: "Classification Math",
      difficulty: "Foundational",
      statement: "A student feature vector is x = [0.80, 0.90]^T (Attendance = 80%, Study = 90%). The model weights are w = [2.0, 3.0]^T and bias b = -3.5. The student actually passed (y = 1). Calculate: (a) Linear Logit z, (b) Predicted Probability ŷ = σ(z), and (c) Binary Cross-Entropy Loss L.",
      steps: [
        { step: "1. Calculate Linear Logit z", formula: "z = w₁·x₁ + w₂·x₂ + b = (2.0 × 0.80) + (3.0 × 0.90) - 3.5 = 1.60 + 2.70 - 3.5 = +0.80" },
        { step: "2. Calculate Sigmoid Probability ŷ", formula: "ŷ = 1 / (1 + e^(-z)) = 1 / (1 + e^(-0.80)) = 1 / (1 + 0.4493) = 1 / 1.4493 ≈ 0.6900 (69.0%)" },
        { step: "3. Calculate Binary Cross-Entropy Loss", formula: "Since y = 1: L = -ln(ŷ) = -ln(0.6900) ≈ 0.3711" }
      ],
      finalAnswer: "Logit z = 0.80, Predicted Pass Probability = 69.0%, Binary Cross-Entropy Loss = 0.3711",
      teacherTip: "Notice that because the student passed and the model predicted 69% (above 50%), the loss is modest (0.3711). If the model had predicted 10%, the loss would have exploded to -ln(0.10) = 2.3026."
    },
    {
      id: 2,
      title: "Problem 2: Linear Regression 1-Step Gradient Descent Update",
      category: "Regression Optimization",
      difficulty: "Intermediate",
      statement: "Given a single training sample (x = 4, y = 15). The current model parameters are weight w = 2.0, bias b = 3.0. The learning rate is α = 0.05. Compute the updated weight w_new and bias b_new after one gradient descent step using MSE loss L = (1/2)(ŷ - y)².",
      steps: [
        { step: "1. Calculate Current Prediction ŷ", formula: "ŷ = w·x + b = (2.0 × 4) + 3.0 = 8.0 + 3.0 = 11.0" },
        { step: "2. Calculate Prediction Residual Error", formula: "Error = (ŷ - y) = (11.0 - 15.0) = -4.0 (Underestimated)" },
        { step: "3. Compute Gradient Gradients", formula: "∂L/∂w = (ŷ - y)·x = (-4.0) × 4 = -16.0 ; ∂L/∂b = (ŷ - y) = -4.0" },
        { step: "4. Apply Gradient Update Rule", formula: "w_new = w - α·(∂L/∂w) = 2.0 - (0.05 × -16.0) = 2.0 + 0.80 = 2.80\nb_new = b - α·(∂L/∂b) = 3.0 - (0.05 × -4.0) = 3.0 + 0.20 = 3.20" }
      ],
      finalAnswer: "Updated Weight w_new = 2.80, Updated Bias b_new = 3.20",
      teacherTip: "Observe how the negative error (-4.0) caused the weights to increase (from 2.0 to 2.80), which pushes the next prediction higher toward the true target of 15!"
    },
    {
      id: 3,
      title: "Problem 3: Confusion Matrix Precision, Recall & F1-Score",
      category: "Evaluation Metrics",
      difficulty: "Foundational",
      statement: "A fraud detection model evaluated on 1,000 credit card transactions produced the following Confusion Matrix: True Positives (TP) = 40, False Positives (FP) = 10, False Negatives (FN) = 20, True Negatives (TN) = 930. Calculate: (a) Precision, (b) Recall, and (c) F1-Score.",
      steps: [
        { step: "1. Calculate Precision", formula: "Precision = TP / (TP + FP) = 40 / (40 + 10) = 40 / 50 = 0.8000 (80.0%)" },
        { step: "2. Calculate Recall", formula: "Recall = TP / (TP + FN) = 40 / (40 + 20) = 40 / 60 = 0.6667 (66.67%)" },
        { step: "3. Calculate F1-Score (Harmonic Mean)", formula: "F1 = 2 · (Prec · Rec) / (Prec + Rec) = 2 · (0.80 × 0.6667) / (0.80 + 0.6667) = 1.0667 / 1.4667 ≈ 0.7273" }
      ],
      finalAnswer: "Precision = 80.0%, Recall = 66.67%, F1-Score = 0.7273",
      teacherTip: "Standard Accuracy is (40 + 930) / 1000 = 97.0%. But notice how the model missed 33.3% of all fraud (Recall is only 66.7%). This illustrates why F1-score is superior to Accuracy for imbalanced problems."
    },
    {
      id: 4,
      title: "Problem 4: k-Means Cluster Centroid Recomputation",
      category: "Unsupervised Clustering",
      difficulty: "Foundational",
      statement: "In 2D customer space (Recency, Monetary), Cluster 1 currently contains 3 customer points: A(2, 40), B(4, 50), C(6, 30). Recompute the updated centroid coordinates μ₁ for Cluster 1.",
      steps: [
        { step: "1. Calculate Mean Recency Coordinate", formula: "μ_{1,R} = (2 + 4 + 6) / 3 = 12 / 3 = 4.0" },
        { step: "2. Calculate Mean Monetary Coordinate", formula: "μ_{1,M} = (40 + 50 + 30) / 3 = 120 / 3 = 40.0" }
      ],
      finalAnswer: "Updated Centroid Coordinates μ₁ = (4.0, 40.0)",
      teacherTip: "Centroid update in k-Means is purely the center of mass (arithmetic average) of all member vectors along each feature dimension."
    }
  ];

  // Comprehensive Jargon Glossary
  const jargonTerms = [
    {
      id: "gradient-step",
      term: "Gradient Step (Weight Update)",
      category: "math",
      badge: "Optimization",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      pronunciation: "ˈɡreɪ.di.ənt stɛp",
      plainEnglish: "Subtracting the learning rate times the slope of the error function from the current weight: w_new = w - α·(∂L/∂w).",
      everydayAnalogy: "Taking one deliberate step downward along a mountain slope toward the lowest valley.",
      whyItMatters: "The core iterative calculation executed millions of times to train modern machine learning models."
    },
    {
      id: "harmonic-mean",
      term: "Harmonic Mean (F1-Score)",
      category: "metrics",
      badge: "Metric Math",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "hɑːˈmɒn.ɪk miːn",
      plainEnglish: "A type of average that gives heavier penalty when one of the numbers is very close to zero: F1 = 2·(P·R)/(P+R).",
      everydayAnalogy: "A car traveling 100 km/h one way and 10 km/h return. The average trip speed is governed heavily by the slow crawl, not the high speed.",
      whyItMatters: "Prevents a model with 99% Precision and 1% Recall from claiming a high average score."
    },
    {
      id: "partial-derivative",
      term: "Partial Derivative (∂L/∂w)",
      category: "math",
      badge: "Calculus",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "ˈpɑː.ʃəl dɪˈrɪv.ə.tɪv",
      plainEnglish: "A mathematical tool measuring how much the total error increases or decreases when we nudge only one specific weight while holding all other weights constant.",
      everydayAnalogy: "Turning only the treble knob on a sound system to see how it specifically alters sound clarity without touching the bass knob.",
      whyItMatters: "Tells the optimization algorithm exactly which direction and how far to adjust each individual weight."
    },
    {
      id: "log-loss-arithmetic",
      term: "Log-Loss Logarithm Arithmetic",
      category: "math",
      badge: "Loss Math",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "lɒɡ lɒs əˈrɪθ.mə.tɪk",
      plainEnglish: "Using natural logarithms -ln(ŷ) to compute error penalties for classification probabilities.",
      everydayAnalogy: "A penalty meter where a 10% drop in confidence doubles the financial fine.",
      whyItMatters: "Provides smooth gradient curves with no flat plateau regions."
    }
  ];

  // Diagnostic Quiz Questions
  const quizQuestions = [
    {
      question: "If a Linear Regression model predicts ŷ = 20 for a true target of y = 25, what is the residual error (ŷ - y)?",
      options: [
        "+5.0",
        "-5.0 (Underestimation)",
        "0.80",
        "500"
      ],
      correctIndex: 1,
      explanation: "Residual error is defined as predicted value minus actual value: Error = ŷ - y = 20 - 25 = -5.0. The negative sign indicates that the model underestimated the true value by 5 units."
    },
    {
      question: "If a classifier has Precision = 1.0 (100%) and Recall = 0.0 (0%), what is its F1-score?",
      options: [
        "0.50 (50%)",
        "0.00 (0%) because harmonic mean collapses when either term is zero.",
        "1.00 (100%)",
        "Undefined"
      ],
      correctIndex: 1,
      explanation: "F1 = 2·(1.0 × 0.0) / (1.0 + 0.0) = 0.0 / 1.0 = 0.0. The harmonic mean properly reflects that a model with zero recall is completely dysfunctional."
    },
    {
      question: "Why do we multiply by the learning rate α in gradient descent: w_new = w - α·(∂L/∂w)?",
      options: [
        "To make the computer clock faster.",
        "To control step size and prevent overshooting or exploding past the minimum.",
        "To force weights to always be negative.",
        "Because α converts floating-point numbers into integers."
      ],
      correctIndex: 1,
      explanation: "The learning rate α scales the magnitude of the update step. If α is too large, gradient descent overshoots the minimum and diverges; if α is too small, convergence is agonizingly slow."
    }
  ];

  // Filtered Jargon Glossary
  const filteredJargon = useMemo(() => {
    return jargonTerms.filter((item) => {
      const matchesCategory =
        selectedJargonCategory === "all" || item.category === selectedJargonCategory;
      const matchesSearch =
        item.term.toLowerCase().includes(jargonSearchQuery.toLowerCase()) ||
        item.plainEnglish.toLowerCase().includes(jargonSearchQuery.toLowerCase()) ||
        item.everydayAnalogy.toLowerCase().includes(jargonSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedJargonCategory, jargonSearchQuery]);

  const activeProblem = practiceProblems.find((p) => p.id === activeProblemId) || practiceProblems[0];

  return (
    <div className="space-y-10 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16 px-4 sm:px-6">
      {/* HEADER BANNER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-3xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Module 1 • Topic 19
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Hands-On Calculation Lab
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Mathematical Mastery
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Practice Problems: Step-by-Step Mathematical Solutions
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Strengthen your foundational knowledge through rigorous pen-and-paper numerical practice problems: Sigmoid activations, gradient descent steps, confusion matrix metrics, and k-Means centroid updates.
          </p>

          <div className="flex flex-wrap gap-2 pt-3">
            {[
              { id: "noviceMasterclass", label: "🎓 Master Teacher's Classroom", icon: "👨‍🏫" },
              { id: "problemsStudio", label: "⚡ Step-by-Step Problem Studio", icon: "🔬" },
              { id: "caseStudies", label: "🏭 Regional Industrial Cases", icon: "🏢" },
              { id: "diagnosticQuiz", label: "📝 Knowledge Diagnostic Check", icon: "✨" },
              { id: "bestPractices", label: "🛡️ Pitfalls & Best Practices", icon: "⚠️" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={clsx(
                  "px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer",
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 border border-indigo-400"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60"
                )}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* SECTION 0: MASTER TEACHER'S CLASSROOM */}
      <section
        id="noviceMasterclass"
        className="bg-slate-900/95 p-6 sm:p-10 rounded-3xl border border-indigo-900/50 shadow-2xl space-y-8 relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-2xl shadow-lg shadow-indigo-600/30">
              👨‍🏫
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">
                Teacher Sukanta Hui's Foundational Lecture
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                The Pen-and-Paper Secret: Why Calculations Build True Intuition
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/90 px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 font-mono">
            <span>⏱️ 12 min calculation guide</span>
          </div>
        </div>

        {/* Teacher's Welcome Dialogue */}
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/60 p-6 rounded-2xl border border-indigo-800/40 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <span>👋 Welcome, student! Let us master the arithmetic behind machine learning algorithms.</span>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Anyone can type <code className="text-cyan-300 bg-slate-950 px-1 rounded">model.fit(X, y)</code> in Python. But a true AI engineer understands what the computer is calculating at every microsecond. When you solve a single gradient descent step or calculate a confusion matrix with your own hands, the mathematical fear disappears completely.
          </p>
          <p className="text-sm text-indigo-200 font-medium">
            Work through these 4 curated university exam problems step by step below!
          </p>
        </div>

        {/* Sub-Lesson Tabs */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
            {[
              { id: "problems", label: "1. Core Calculation Categories", icon: "📐" },
              { id: "jargon", label: "2. Calculation Jargon Buster", icon: "📖" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedLessonTab(tab.id)}
                className={clsx(
                  "px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer",
                  selectedLessonTab === tab.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-slate-800 text-slate-400 hover:text-slate-200"
                )}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Sub-Lesson Content */}
          {selectedLessonTab === "problems" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">1. Logistic Logit &amp; Sigmoid Probability</span>
                <p className="text-xs sm:text-sm text-slate-300">
                  Computing weighted sums {"z = w^T x + b"}, squashing via {"σ(z) = 1/(1+e^{-z})"}, and evaluating logarithmic loss {"-ln(ŷ)"}.
                </p>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">2. Gradient Descent Weight Updates</span>
                <p className="text-xs sm:text-sm text-slate-300">
                  Calculating prediction residual errors {"(ŷ - y)"}, partial derivatives {"∂L/∂w"}, and executing update steps with learning rate α.
                </p>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">3. Confusion Matrix Metric Derivations</span>
                <p className="text-xs sm:text-sm text-slate-300">
                  Deconstructing TP, FP, TN, FN counts into exact Precision, Recall, and Harmonic Mean F1-scores.
                </p>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase">4. k-Means Centroid Recomputation</span>
                <p className="text-xs sm:text-sm text-slate-300">
                  Computing multi-dimensional center of mass averages across clustered feature coordinate vectors.
                </p>
              </div>
            </div>
          )}

          {selectedLessonTab === "jargon" && (
            <div className="space-y-6 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredJargon.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all space-y-3 shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-wide">{item.term}</h4>
                        <span className="text-[11px] font-mono text-slate-400">{item.pronunciation}</span>
                      </div>
                      <span className={clsx("px-2 py-0.5 text-[10px] font-mono uppercase font-bold rounded border", item.badgeColor)}>
                        {item.badge}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div>
                        <strong className="text-cyan-400 font-medium">Simple Meaning: </strong>
                        <span className="text-slate-300">{item.plainEnglish}</span>
                      </div>
                      <div>
                        <strong className="text-amber-400 font-medium">Everyday Analogy: </strong>
                        <span className="text-slate-300">{item.everydayAnalogy}</span>
                      </div>
                      <div>
                        <strong className="text-indigo-400 font-medium">Why It Matters: </strong>
                        <span className="text-slate-400">{item.whyItMatters}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 1: INTERACTIVE PROBLEM STUDIO */}
      <section
        id="problemsStudio"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Step-by-Step Practice Problem Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Select a practice problem, attempt the solution on paper, and reveal verified step-by-step mathematical proofs
            </p>
          </div>
        </div>

        {/* Problem Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {practiceProblems.map((prob) => (
            <button
              key={prob.id}
              onClick={() => setActiveProblemId(prob.id)}
              className={clsx(
                "p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-2 flex flex-col justify-between",
                activeProblemId === prob.id
                  ? "bg-indigo-600/30 border-indigo-400 text-white shadow-lg shadow-indigo-600/30"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
              )}
            >
              <div className="text-xs font-bold leading-tight">{prob.title.split(":")[0]}</div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300">
                {prob.category}
              </span>
            </button>
          ))}
        </div>

        {/* Active Problem Card */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">{activeProblem.category}</span>
              <h3 className="text-lg font-bold text-white">{activeProblem.title}</h3>
            </div>
            <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
              {activeProblem.difficulty}
            </span>
          </div>

          {/* Problem Statement Box */}
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase font-mono tracking-wider">Problem Statement:</span>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-mono">
              {activeProblem.statement}
            </p>
          </div>

          {/* Solution Reveal Toggle */}
          <div className="space-y-4">
            <button
              onClick={() => toggleRevealSolution(activeProblem.id)}
              className={clsx(
                "w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2",
                revealedSolutions[activeProblem.id]
                  ? "bg-slate-800 text-slate-300 border border-slate-700"
                  : "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-600/30 hover:opacity-95"
              )}
            >
              <span>{revealedSolutions[activeProblem.id] ? "🔒 Hide Step-by-Step Solution" : "🔓 Reveal Step-by-Step Solution"}</span>
            </button>

            {/* Revealed Steps */}
            {revealedSolutions[activeProblem.id] && (
              <div className="space-y-4 pt-2 animate-fadeIn">
                <div className="space-y-3">
                  {activeProblem.steps.map((st, idx) => (
                    <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5">
                      <span className="text-xs font-bold text-emerald-400 uppercase font-mono">{st.step}</span>
                      <pre className="text-xs sm:text-sm font-mono text-cyan-300 whitespace-pre-wrap leading-relaxed">
                        {st.formula}
                      </pre>
                    </div>
                  ))}
                </div>

                <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-800 text-emerald-200 text-xs sm:text-sm font-mono font-bold">
                  ✔ Final Answer: {activeProblem.finalAnswer}
                </div>

                <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/60 text-xs text-slate-300 space-y-1">
                  <span className="text-amber-400 font-bold uppercase font-mono">Teacher Sukanta Hui's Hint:</span>
                  <p className="leading-relaxed">{activeProblem.teacherTip}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: REGIONAL INDUSTRIAL CASE STUDIES */}
      <section
        id="caseStudies"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Real-World Regional Industrial Applications
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              How numerical mathematical optimization translates into industrial AI systems in West Bengal
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Barrackpore Academic Lab</span>
            <h3 className="text-base font-bold text-white">Classroom Exam Grading Validation</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mamata and Mahima manually verified gradient descent step equations on whiteboard sessions, writing automated unit tests to benchmark Python numerical routines.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Salt Lake Sector V Tech Center</span>
            <h3 className="text-base font-bold text-white">Embedded C++ Inference Benchmarking</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Debangshu translated hand-calculated Sigmoid logit routines into vectorized AVX2 SIMD instructions in C++, achieving 1.2 million evaluations/sec for financial fraud scoring.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Ichapur Retail Analytics</span>
            <h3 className="text-base font-bold text-white">Manual RFM Segment Calibration</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Susmita validated k-Means centroid distances manually before deploying automated retail segmentation to verify that distance calculations were mathematically sound.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Jadavpur Educational Research</span>
            <h3 className="text-base font-bold text-white">Confusion Matrix Cost Optimization</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Abhronila implemented weighted cost matrices balancing Precision against Recall for medical screening triage systems across regional diagnostic clinics.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: DIAGNOSTIC QUIZ */}
      <section
        id="diagnosticQuiz"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">
            03
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Knowledge Diagnostic Check
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Test your understanding of core machine learning calculations, residuals, and metrics
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
            <span>Question {selectedQuizIndex + 1} of {quizQuestions.length}</span>
            <span className="text-indigo-400 font-bold">Calculation Concept Check</span>
          </div>

          <p className="text-base sm:text-lg font-bold text-white">
            {quizQuestions[selectedQuizIndex].question}
          </p>

          <div className="space-y-3">
            {quizQuestions[selectedQuizIndex].options.map((opt, idx) => {
              const isSelected = userAnswer === idx;
              const isCorrect = idx === quizQuestions[selectedQuizIndex].correctIndex;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setUserAnswer(idx);
                    setShowFeedback(true);
                  }}
                  className={clsx(
                    "w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between",
                    showFeedback
                      ? isCorrect
                        ? "bg-emerald-950/80 border-emerald-500 text-emerald-200"
                        : isSelected
                        ? "bg-rose-950/80 border-rose-500 text-rose-200"
                        : "bg-slate-900 border-slate-800 text-slate-400"
                      : isSelected
                      ? "bg-indigo-600/30 border-indigo-400 text-white"
                      : "bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300"
                  )}
                >
                  <span>{opt}</span>
                  {showFeedback && isCorrect && <span className="font-bold text-emerald-400">✔ Correct</span>}
                  {showFeedback && isSelected && !isCorrect && <span className="font-bold text-rose-400">❌ Incorrect</span>}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase font-mono">Teacher's Explanation:</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {quizQuestions[selectedQuizIndex].explanation}
              </p>
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => {
                setSelectedQuizIndex((prev) => Math.max(0, prev - 1));
                setUserAnswer(null);
                setShowFeedback(false);
              }}
              disabled={selectedQuizIndex === 0}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-xs font-semibold rounded-lg border border-slate-700 text-slate-300 cursor-pointer"
            >
              ← Previous Question
            </button>
            <button
              onClick={() => {
                setSelectedQuizIndex((prev) => Math.min(quizQuestions.length - 1, prev + 1));
                setUserAnswer(null);
                setShowFeedback(false);
              }}
              disabled={selectedQuizIndex === quizQuestions.length - 1}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-xs font-semibold rounded-lg text-white cursor-pointer"
            >
              Next Question →
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: PITFALLS & BEST PRACTICES */}
      <section
        id="bestPractices"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">
            04
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Mathematical Pitfalls &amp; Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Essential guidelines for manual and algorithmic calculations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> 4 Common Mathematical Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-rose-300">Sign Reversal in Gradient Descent:</strong> Adding gradients instead of subtracting: {"w + α·(∂L/∂w)"} (causes gradient ascent / explosion).</li>
              <li><strong className="text-rose-300">Denominator Zero in F1:</strong> Forgetting to handle cases where Precision + Recall = 0.</li>
              <li><strong className="text-rose-300">Forgetting Bias in Logit:</strong> Omitting the intercept term b, forcing predictions through origin.</li>
              <li><strong className="text-rose-300">Unclamped Sigmoid Exponents:</strong> Passing extreme values like {"e^{1000}"} causing memory overflow errors.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> 4 Best Practice Mathematical Rules
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-emerald-300">Clamp Logits Before Sigmoid:</strong> Restrict z between [-20, +20] to prevent arithmetic overflow.</li>
              <li><strong className="text-emerald-300">Use Epsilon in Log-Loss:</strong> Add small {"ε = 10^{-12}"} to prevent evaluating {"ln(0)"}.</li>
              <li><strong className="text-emerald-300">Double Check Unit Dimensions:</strong> Ensure weights match feature units before multiplying.</li>
              <li><strong className="text-emerald-300">Perform Hand Sanity Checks:</strong> Test extreme inputs (x = 0, x = max) to verify model sanity bounds.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PYTHON LABORATORY */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            05
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Executable Python Laboratory Simulation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Interactive standalone lab script verifying manual practice problem calculations
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="practice_problems_lab.py"
          highlightLines={[18, 28, 42, 56]}
        />
      </section>

      {/* FAQ TEMPLATE */}
      <section className="space-y-4">
        <FAQTemplate
          title="Practice Problems — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* PRINTABLE NOTE */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Practice Problems"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 19 Note"
          downloadFileName="topic19_note.txt"
        />
      </section>

      {/* TEACHER NOTE */}
      <section>
        <Teacher
          note="Practice makes permanence! Never rely solely on high-level Python libraries without understanding the underlying matrix arithmetic. Solve each of these 4 problems by hand with paper and pen, and you will develop the intuitive confidence of a seasoned machine learning practitioner."
        />
      </section>
    </div>
  );
};

export default Topic19;
