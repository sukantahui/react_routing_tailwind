import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic20_files/short_questions_lab.py?raw";
import noteText from "./topic20_files/topic20_note.txt?raw";
import questions from "./topic20_files/topic20_questions.js";

const Topic20 = () => {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");

  // Novice Classroom Tab State
  const [selectedLessonTab, setSelectedLessonTab] = useState("vivaBank");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Viva Interactive Bank State
  const [activeQuestionId, setActiveQuestionId] = useState(1);
  const [vivaCategoryFilter, setVivaCategoryFilter] = useState("all");
  const [revealedAnswers, setRevealedAnswers] = useState({});

  const toggleAnswer = (id) => {
    setRevealedAnswers((prev) => ({
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

  // 8 High-Yield University Exam & Viva Questions
  const vivaQuestions = [
    {
      id: 1,
      category: "Foundations",
      badge: "Viva Classic",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      question: "1. What is the fundamental difference between Parametric and Non-Parametric models?",
      conciseAnswer: "Parametric models summarize data through a fixed number of parameters (e.g., weights w in Linear/Logistic Regression), making assumptions about the underlying distribution. Non-parametric models (e.g., KNN, Decision Trees) do not assume a fixed functional form; their parameter count grows with dataset size N.",
      mathProof: "Parametric: |θ| = constant (O(1) in N). Non-Parametric: Capacity scales with dataset N.",
      memoryTrick: "Parametric = Rigid cookie cutter mold; Non-parametric = Flexible clay molding to every curve.",
      examTip: "Always give Linear Regression vs KNN as the dual textbook examples."
    },
    {
      id: 2,
      category: "Optimization",
      badge: "Core Theory",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      question: "2. What is the Bias-Variance Trade-off?",
      conciseAnswer: "Bias is the error from overly simplistic assumptions (Underfitting: model cannot capture patterns). Variance is error from hypersensitivity to small training fluctuations (Overfitting: model memorizes noise). Total Expected Test Error = Bias² + Variance + Irreducible Noise.",
      mathProof: "𝔼[(y - h(x))²] = (Bias[h(x)])² + Var[h(x)] + σ²",
      memoryTrick: "High Bias = Blind stubbornness; High Variance = Paranoid over-imagination.",
      examTip: "State that regularization λ acts as the primary tuning dial to balance this trade-off."
    },
    {
      id: 3,
      category: "Classification",
      badge: "Interview Favorite",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      question: "3. Why is Logistic Regression called a 'Linear Classifier' when the Sigmoid curve is clearly non-linear?",
      conciseAnswer: "Because its decision boundary is a linear hyperplane in feature space. The decision cutoff occurs at P = 0.50, which corresponds to the linear logit z = w^T x + b = 0 (a straight line in 2D or hyperplane in higher dimensions).",
      mathProof: "Decision boundary: P(y=1|x) = 0.50 ⟺ 1/(1+e^(-z)) = 0.50 ⟺ z = 0 ⟺ w^T x + b = 0 (Linear).",
      memoryTrick: "The output probability is curved (S-shape), but the dividing fence between classes is razor straight.",
      examTip: "Draw a 2D scatter plot showing a straight line separating 0s and 1s."
    },
    {
      id: 4,
      category: "Foundations",
      badge: "Geometry",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      question: "4. What is the Curse of Dimensionality and why does it degrade distance-based algorithms?",
      conciseAnswer: "As the number of feature dimensions d increases, the volume of feature space grows exponentially, making data points extremely sparse. In high dimensions, Euclidean distances between all pairs of points become nearly identical, rendering distance metrics (like KNN and k-Means) ineffective.",
      mathProof: "lim_{d → ∞} (dist_max - dist_min) / dist_min = 0 (Distance concentration phenomenon).",
      memoryTrick: "Searching for a friend in a small room (1D/2D) is easy; searching for them across an infinite empty cosmos (1000D) is hopeless.",
      examTip: "Mention PCA (Principal Component Analysis) and feature selection as the standard cures."
    },
    {
      id: 5,
      category: "Evaluation",
      badge: "Critical Metric",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      question: "5. Why should Accuracy never be used alone to evaluate models on imbalanced datasets?",
      conciseAnswer: "On a dataset with 99% healthy patients and 1% rare disease patients, a naive dummy model that predicts 'Healthy' for 100% of cases achieves 99% accuracy while detecting ZERO sick patients. Precision, Recall, and ROC-AUC are required.",
      mathProof: "Accuracy = (TP + TN) / Total. If TN ≫ TP, accuracy reflects class distribution rather than model diagnostic power.",
      memoryTrick: "A broken clock is 100% accurate twice a day, but useless as a timepiece.",
      examTip: "Always recommend F1-Score or ROC-AUC for fraud detection, disease diagnosis, and churn models."
    },
    {
      id: 6,
      category: "Optimization",
      badge: "Regularization",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      question: "6. What is the practical difference between L1 (Lasso) and L2 (Ridge) Regularization?",
      conciseAnswer: "L1 Regularization (Lasso, penalty = λ ∑|w_j|) drives uninformative feature weights to EXACT ZERO, performing automatic feature selection and creating sparse models. L2 Regularization (Ridge, penalty = λ ∑w_j²) shrinks weights smoothly toward zero without setting them to exact zero.",
      mathProof: "L1: Ω(w) = ||w||_1 (Diamond constraint); L2: Ω(w) = ||w||_2^2 (Spherical constraint).",
      memoryTrick: "L1 = Pruning shears (cuts away whole branches); L2 = Weight-loss diet (shrinks everyone proportionally).",
      examTip: "Use L1 when you want feature selection; use L2 when features are correlated and all share signal."
    },
    {
      id: 7,
      category: "Data Hygiene",
      badge: "Engineering",
      badgeColor: "bg-teal-950 text-teal-300 border-teal-800",
      question: "7. What is Data Leakage and what is the single most effective way to prevent it?",
      conciseAnswer: "Data leakage occurs when information from outside the training dataset (such as test set statistics or future timestamps) contaminates model fitting, producing artificially inflated lab accuracy that collapses in production. Prevent it by splitting Train/Val/Test before doing ANY transformations and encapsulating transformations inside scikit-learn Pipelines.",
      mathProof: "Scaler fitted on X_all: μ = mean(X_train ∪ X_test) ➔ violates P(X_train) independence.",
      memoryTrick: "Leaking final exam answers into the practice quiz booklet.",
      examTip: "Always mention: 'Fit scalers on X_train only, then transform X_test.'"
    },
    {
      id: 8,
      category: "Optimization",
      badge: "Gradient Descent",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-800",
      question: "8. Compare Batch Gradient Descent, Stochastic Gradient Descent (SGD), and Mini-Batch Gradient Descent.",
      conciseAnswer: "Batch GD computes gradients across ALL N training samples per step (smooth, deterministic, but slow on big data). SGD computes gradients on 1 sample per step (fast, noisy, jumps out of local minima). Mini-Batch GD computes gradients on small batches (e.g. 32 to 256 samples), combining GPU vectorized hardware efficiency with stable convergence.",
      mathProof: "Batch: |B| = N ; SGD: |B| = 1 ; Mini-Batch: 16 ≤ |B| ≤ 512.",
      memoryTrick: "Batch = Cooking for whole wedding at once; SGD = Tasting 1 grain of rice; Mini-Batch = Tasting a small bowl.",
      examTip: "Mini-batch SGD is the undisputed industry standard for training deep neural networks."
    }
  ];

  // Comprehensive Jargon Glossary
  const jargonTerms = [
    {
      id: "parametric-model",
      term: "Parametric vs Non-Parametric",
      category: "theory",
      badge: "Model Architecture",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      pronunciation: "ˌpær.əˈmɛt.rɪk",
      plainEnglish: "Parametric: Fixed equation with fixed number of knobs (weights). Non-parametric: Flexible structure that grows with dataset size.",
      everydayAnalogy: "Parametric = A pre-set recipe; Non-parametric = Cooking by improvising with whatever ingredients are on the table.",
      whyItMatters: "Dictates memory consumption, training speed, and generalization capacity."
    },
    {
      id: "bias-variance-jargon",
      term: "Bias-Variance Decomposition",
      category: "theory",
      badge: "Core Law",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "ˈbaɪ.əs ˈvɛə.ri.əns",
      plainEnglish: "The mathematical law proving that model error always comes from either being too simple (bias) or too sensitive to noise (variance).",
      everydayAnalogy: "An archer who always shoots too far left (bias) vs an archer whose arrows scatter wildly in every direction (variance).",
      whyItMatters: "The universal compass for diagnosing why an AI model is failing and deciding how to fix it."
    },
    {
      id: "sparsity",
      term: "Feature Sparsity (L1 Lasso)",
      category: "optimization",
      badge: "Model Compression",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "ˈspɑː.sə.ti",
      plainEnglish: "Having a large majority of weight coefficients set to exactly zero, meaning the model completely ignores irrelevant columns.",
      everydayAnalogy: "Packing a travel suitcase with only the 3 essential items you actually need, leaving the other 97 unnecessary items behind.",
      whyItMatters: "Produces fast, lightweight models that can run on tiny embedded chips."
    },
    {
      id: "stochasticity",
      term: "Stochasticity in Gradient Descent",
      category: "optimization",
      badge: "Random Sampling",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "stɒˈkæs.tɪk",
      plainEnglish: "Introducing random batch sampling into gradient calculations, creating beneficial noise that helps the optimizer escape saddle points.",
      everydayAnalogy: "Shaking a tray of marbles so they don't get stuck in tiny shallow dents, helping them roll to the deepest center bowl.",
      whyItMatters: "Enables training massive million-sample neural networks in parallel on modern GPUs."
    }
  ];

  // Diagnostic Quiz Questions
  const quizQuestions = [
    {
      question: "Which regularization technique forces uninformative feature weights to EXACT ZERO, effectively performing automatic feature selection?",
      options: [
        "L2 Ridge Regularization (λ ∑ w_j²)",
        "L1 Lasso Regularization (λ ∑ |w_j|)",
        "StandardScaler Normalization",
        "Early Stopping"
      ],
      correctIndex: 1,
      explanation: "L1 Lasso regularization utilizes an absolute value penalty whose geometric diamond-shaped constraint boundary hits axes at sharp corners, driving non-essential weight coefficients to exact zero."
    },
    {
      question: "In the Bias-Variance Trade-off, what does a model with High Variance suffer from?",
      options: [
        "Underfitting (too simplistic to learn true patterns).",
        "Overfitting (hypersensitive to training data noise; fails on unseen test sets).",
        "Slow internet speed.",
        "Zero empirical training error without any code."
      ],
      correctIndex: 1,
      explanation: "High Variance means the model's predictions vary wildly depending on small changes in the training set. It memorizes noise and specific sample quirks (Overfitting), leading to high test error."
    },
    {
      question: "Why is Mini-Batch Gradient Descent (e.g. batch size 64) preferred over full Batch Gradient Descent on massive datasets?",
      options: [
        "Full Batch GD would require loading millions of samples into RAM simultaneously, causing memory bottlenecks and slow updates.",
        "Mini-batch GD is only supported on Apple computers.",
        "Mini-batch GD eliminates all mathematical errors completely.",
        "Full batch GD produces negative weights."
      ],
      correctIndex: 0,
      explanation: "Full Batch GD requires computing predictions across the entire dataset (e.g. 50 million images) before taking a single weight step, which is computationally prohibitive. Mini-batch GD updates weights frequently while fully utilizing GPU parallel matrix multipliers."
    }
  ];

  // Filtered Viva Questions
  const filteredViva = useMemo(() => {
    return vivaQuestions.filter((q) => {
      const matchesCat = vivaCategoryFilter === "all" || q.category.toLowerCase() === vivaCategoryFilter.toLowerCase();
      const matchesSearch =
        q.question.toLowerCase().includes(jargonSearchQuery.toLowerCase()) ||
        q.conciseAnswer.toLowerCase().includes(jargonSearchQuery.toLowerCase()) ||
        q.memoryTrick.toLowerCase().includes(jargonSearchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [vivaCategoryFilter, jargonSearchQuery]);

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

  return (
    <div className="space-y-10 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16 px-4 sm:px-6">
      {/* HEADER BANNER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-3xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Module 1 • Topic 20
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Viva &amp; Exam Master Bank
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              High-Yield Concepts
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Short Questions: University Exam &amp; Viva Master Bank
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            A comprehensive, high-yield repository of essential conceptual questions covering the Bias-Variance trade-off, parametric models, decision boundaries, L1/L2 regularization, and gradient descent mechanics.
          </p>

          <div className="flex flex-wrap gap-2 pt-3">
            {[
              { id: "noviceMasterclass", label: "🎓 Master Teacher's Classroom", icon: "👨‍🏫" },
              { id: "vivaStudio", label: "⚡ Interactive Viva Bank", icon: "🔬" },
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
                How to Ace the Machine Learning Viva Examination
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/90 px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 font-mono">
            <span>⏱️ 12 min exam prep guide</span>
          </div>
        </div>

        {/* Teacher's Welcome Dialogue */}
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/60 p-6 rounded-2xl border border-indigo-800/40 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <span>👋 Welcome, student! Here is my golden recipe for answering viva and interview questions.</span>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            When an external university examiner or senior tech interviewer asks you a short question, they are not looking for a memorized 10-line textbook paragraph. They look for <strong>clarity of thought</strong> in 3 sentences:
          </p>
          <ol className="text-xs sm:text-sm text-indigo-200 list-decimal list-inside space-y-1 font-mono">
            <li><strong>The One-Sentence Definition:</strong> State the core concept directly without rambling.</li>
            <li><strong>The Mathematical/Geometric Truth:</strong> State the formula or geometric intuition.</li>
            <li><strong>The Real-World Example:</strong> Connect it to an everyday engineering problem.</li>
          </ol>
        </div>

        {/* Sub-Lesson Tabs */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
            {[
              { id: "vivaBank", label: "1. Core Viva Categories", icon: "🏛️" },
              { id: "jargon", label: "2. Conceptual Jargon Buster", icon: "📖" }
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

          {selectedLessonTab === "vivaBank" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Foundations</span>
                <p className="text-xs text-slate-300">Parametric vs Non-parametric, Curse of Dimensionality, Hypothesis spaces.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Optimization</span>
                <p className="text-xs text-slate-300">Bias-Variance tradeoff, Gradient Descent variants, L1 vs L2 regularization.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Evaluation</span>
                <p className="text-xs text-slate-300">Precision vs Recall, Confusion matrix, ROC-AUC, Class imbalance metrics.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase">Data Hygiene</span>
                <p className="text-xs text-slate-300">Data Leakage prevention, Imputation, One-Hot Encoding, StandardScaler.</p>
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

      {/* SECTION 1: INTERACTIVE VIVA BANK */}
      <section
        id="vivaStudio"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive University Exam &amp; Viva Question Bank
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Filter by category, search keywords, and expand comprehensive answers with mathematical proofs and teacher hints
            </p>
          </div>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Questions (8)" },
              { id: "foundations", label: "Foundations" },
              { id: "optimization", label: "Optimization" },
              { id: "evaluation", label: "Evaluation" },
              { id: "data hygiene", label: "Data Hygiene" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setVivaCategoryFilter(cat.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  vivaCategoryFilter === cat.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-slate-800 text-slate-400 hover:text-slate-200"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              value={jargonSearchQuery}
              onChange={(e) => setJargonSearchQuery(e.target.value)}
              className="w-full sm:w-64 bg-slate-950 border border-slate-700 text-xs px-3.5 py-2 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            {jargonSearchQuery && (
              <button
                onClick={() => setJargonSearchQuery("")}
                className="absolute right-3 top-2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Questions Accordion List */}
        <div className="space-y-4">
          {filteredViva.map((item) => {
            const isExpanded = revealedAnswers[item.id];
            return (
              <div
                key={item.id}
                className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-lg transition-all"
              >
                <button
                  onClick={() => toggleAnswer(item.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/40 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={clsx("px-2 py-0.5 text-[10px] font-mono font-bold rounded border uppercase", item.badgeColor)}>
                        {item.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-400">Category: {item.category}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white">{item.question}</h3>
                  </div>
                  <span className="text-lg font-bold text-cyan-400 font-mono">
                    {isExpanded ? "▲" : "▼"}
                  </span>
                </button>

                {isExpanded && (
                  <div className="p-5 pt-0 border-t border-slate-800/80 space-y-4 animate-fadeIn">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider">
                        Concise Model Answer (Viva / Exam Ready):
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {item.conciseAnswer}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 font-mono space-y-1">
                        <span className="text-cyan-400 font-bold uppercase">Mathematical Formulation:</span>
                        <div className="text-indigo-300 text-[11px] overflow-x-auto">{item.mathProof}</div>
                      </div>

                      <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-amber-400 font-bold uppercase font-mono">Everyday Memory Trick:</span>
                        <p className="text-slate-300 text-[11px]">{item.memoryTrick}</p>
                      </div>
                    </div>

                    <div className="text-xs font-mono text-purple-300 bg-purple-950/40 p-2.5 rounded-lg border border-purple-800/60">
                      💡 Exam Scoring Tip: {item.examTip}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
              How conceptual ML theory drives real engineering decisions across West Bengal technology centers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Barrackpore Academic Lab</span>
            <h3 className="text-base font-bold text-white">Engineering Interview Placement Coaching</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mamata and Mahima organized peer-to-peer technical interview mock sessions covering bias-variance decomposition and regularized loss formulations, boosting final placement selection rates by 35%.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Salt Lake Sector V Tech Enterprise</span>
            <h3 className="text-base font-bold text-white">Architecture Design Review Standards</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Debangshu instituted strict code-review checklists requiring every production model to document its Bias-Variance diagnostic curves, preventing over-parameterized models from deploying to production.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Ichapur Retail Center</span>
            <h3 className="text-base font-bold text-white">Feature Selection with L1 Lasso</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Susmita applied L1 Lasso regression to prune 120 promotional coupon variables down to the 8 most impactful features, cutting compute costs by 70%.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Jadavpur Clinical Research</span>
            <h3 className="text-base font-bold text-white">Clinical Triage Metric Standardization</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Abhronila enforced Sensitivity/Recall as the primary benchmark metric for diagnostic radiology AI models, eliminating deceptive Accuracy claims on rare pathology datasets.
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
              Test your understanding of core conceptual viva questions, regularization, and optimization
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
            <span>Question {selectedQuizIndex + 1} of {quizQuestions.length}</span>
            <span className="text-indigo-400 font-bold">Concept Check</span>
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
              Viva &amp; Exam Pitfalls &amp; Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Crucial guidelines for scoring top grades in conceptual assessments
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> 4 Common Viva Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-rose-300">Confusing Bias with Variance:</strong> Calling an overfitted model "biased" when it actually has high variance.</li>
              <li><strong className="text-rose-300">Claiming Logistic Regression is Non-Linear:</strong> Forgetting that its decision boundary in feature space is a straight line.</li>
              <li><strong className="text-rose-300">Vague Jargon Dumping:</strong> Using buzzwords like "deep AI" without stating concrete mathematical definitions.</li>
              <li><strong className="text-rose-300">Ignoring Edge Cases:</strong> Failing to explain what happens when training samples N approach infinity.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> 4 Golden Viva Rules
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-emerald-300">State Definitions First:</strong> Give a clear 1-sentence answer before detailing technical math.</li>
              <li><strong className="text-emerald-300">Connect to Equations:</strong> Cite the loss function or optimization objective (e.g. MSE, BCE).</li>
              <li><strong className="text-emerald-300">Provide Real-World Concrete Examples:</strong> Mention email spam, house pricing, or fraud detection.</li>
              <li><strong className="text-emerald-300">Contrast Opposites:</strong> Compare L1 vs L2, SGD vs Batch GD, or Supervised vs Unsupervised.</li>
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
              Interactive standalone lab script verifying core conceptual viva questions
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="short_questions_lab.py"
          highlightLines={[15, 25, 36, 48]}
        />
      </section>

      {/* FAQ TEMPLATE */}
      <section className="space-y-4">
        <FAQTemplate
          title="Short Questions — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* PRINTABLE NOTE */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Short Questions"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 20 Note"
          downloadFileName="topic20_note.txt"
        />
      </section>

      {/* TEACHER NOTE */}
      <section>
        <Teacher
          note="Short conceptual questions test the depth and agility of your understanding. When preparing for university vivas or technical job interviews, practice explaining concepts concisely in plain English first, followed by mathematical proof and real-world application!"
        />
      </section>
    </div>
  );
};

export default Topic20;
