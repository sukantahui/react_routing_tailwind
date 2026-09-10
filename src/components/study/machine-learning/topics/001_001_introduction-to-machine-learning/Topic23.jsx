import React, { useState, useMemo } from "react";
import clsx from "clsx";
import {
  FileText,
  Download,
  BookOpen,
  Award,
  Search,
  CheckCircle2,
  Sparkles,
  Copy,
  Check,
  Calculator,
  GraduationCap,
  Layers,
  ChevronDown,
  ChevronUp,
  Sliders,
  Compass,
  Zap,
  Target,
  FileCheck,
  Printer
} from "lucide-react";

import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";
import noteText from "./topic23_files/topic23_note.txt?raw";
import questions from "./topic23_files/topic23_questions";

// Curated Master Definitions Database for Quick Examination Lookup
const masterDefinitions = [
  {
    id: "def-1",
    term: "Machine Learning (Arthur Samuel)",
    category: "Foundations & Paradigms",
    examSignificance: "High - Must quote verbatim in Section A/B",
    definition:
      "The subfield of Computer Science that gives computers the ability to learn without being explicitly programmed (Arthur Samuel, 1959).",
    math: "Deductive if-else -> Inductive empirical generalization",
    vivaTip:
      "Mention that Samuel demonstrated this through his self-learning Checkers program at IBM.",
  },
  {
    id: "def-2",
    term: "Machine Learning Formal Tuple (Tom Mitchell)",
    category: "Foundations & Paradigms",
    examSignificance: "Critical - Core 5-mark university question",
    definition:
      "A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E (Tom Mitchell, 1997).",
    math: "<T, P, E>",
    vivaTip:
      "Always give a concrete tuple: T = Spam email classification, P = F1-score / Accuracy, E = 50,000 labeled emails.",
  },
  {
    id: "def-3",
    term: "Supervised Learning",
    category: "Foundations & Paradigms",
    examSignificance: "High - Fundamental distinction",
    definition:
      "A machine learning paradigm where the algorithm is provided with a training dataset of input features paired with verified ground-truth labels {(x_i, y_i)} to learn a predictive mapping function f(x).",
    math: "f : \\mathcal{X} \\rightarrow \\mathcal{Y}, \\quad y_i \\in \\mathbb{R} \\text{ or } y_i \\in \\{C_1, \\dots, C_K\\}",
    vivaTip:
      "Remember: It splits into Regression (continuous target) and Classification (discrete category).",
  },
  {
    id: "def-4",
    term: "Unsupervised Learning",
    category: "Foundations & Paradigms",
    examSignificance: "High - Key Viva Topic",
    definition:
      "A paradigm where the algorithm discovers latent geometric structures, natural clusters, probability densities, or low-dimensional manifolds from unlabeled data points {x_i} without ground-truth supervisory signals.",
    math: "\\min_{C, \\mu} \\sum_{k=1}^K \\sum_{x_i \\in C_k} \\|x_i - \\mu_k\\|^2",
    vivaTip:
      "Never say 'labels are hidden'. Emphasize that ground truth labels are completely absent.",
  },
  {
    id: "def-5",
    term: "Semi-Supervised Learning",
    category: "Foundations & Paradigms",
    examSignificance: "Medium - Modern Industry Standard",
    definition:
      "A learning paradigm combining a small set of expensive labeled data D_L with a vastly larger corpus of inexpensive unlabeled data D_U to construct superior decision boundaries by exploiting data manifold geometry.",
    math: "|D_U| \\gg |D_L|, \\quad W_{ij} = \\exp(-\\|x_i - x_j\\|^2 / 2\\sigma^2)",
    vivaTip:
      "State the 3 core axioms: 1. Smoothness, 2. Cluster Assumption, 3. Low-Density Separation.",
  },
  {
    id: "def-6",
    term: "Reinforcement Learning",
    category: "Foundations & Paradigms",
    examSignificance: "High - Emerging BCA/MCA favorite",
    definition:
      "A goal-directed computational framework where an autonomous agent learns an optimal behavioral policy \\pi(a|s) through sequential trial-and-error environmental interactions to maximize cumulative scalar reward.",
    math: "\\text{MDP} = \\langle S, A, P, R, \\gamma \\rangle, \\quad G_t = \\sum_{k=0}^\\infty \\gamma^k R_{t+k+1}",
    vivaTip:
      "Distinguish evaluative feedback (scalar reward/penalty) from prescriptive feedback (correct answer label).",
  },
  {
    id: "def-7",
    term: "Empirical Risk Minimization (ERM)",
    category: "Math & Optimization",
    examSignificance: "High - Theoretical Core",
    definition:
      "The statistical learning principle where model parameters w* are chosen to minimize the average loss (empirical risk) computed over the observed training dataset.",
    math: "w^* = \\arg\\min_w \\left[ \\frac{1}{N} \\sum_{i=1}^N L(f(x_i; w), y_i) + \\lambda \\Omega(w) \\right]",
    vivaTip:
      "Mention that ERM without regularization \\Omega(w) can lead directly to overfitting on small datasets.",
  },
  {
    id: "def-8",
    term: "Mean Squared Error (MSE)",
    category: "Math & Optimization",
    examSignificance: "Critical - Standard calculation question",
    definition:
      "A regression loss function calculating the arithmetic mean of the squared differences between actual ground-truth values and model predictions.",
    math: "\\text{MSE} = \\frac{1}{N} \\sum_{i=1}^N (y_i - \\hat{y}_i)^2",
    vivaTip:
      "Explain why MSE penalizes large errors quadratically and is therefore sensitive to outliers.",
  },
  {
    id: "def-9",
    term: "Binary Cross-Entropy Loss (Log Loss)",
    category: "Math & Optimization",
    examSignificance: "Critical - Logistic Regression derivation",
    definition:
      "The standard loss function for binary classification that quantifies the divergence between true binary labels and predicted probabilities.",
    math: "L_{\\text{BCE}} = -\\frac{1}{N} \\sum_{i=1}^N \\left[ y_i \\ln(p_i) + (1 - y_i) \\ln(1 - p_i) \\right]",
    vivaTip:
      "Explain why MSE is non-convex for Logistic Regression, while BCE is strictly convex with a global minimum.",
  },
  {
    id: "def-10",
    term: "Logistic Sigmoid Function",
    category: "Math & Optimization",
    examSignificance: "High - Standard viva activation question",
    definition:
      "An S-shaped mathematical activation function that maps any real-valued linear score z \\in (-\\infty, +\\infty) monotonically into a valid probability p \\in (0, 1).",
    math: "\\sigma(z) = \\frac{1}{1 + e^{-z}}, \\quad \\sigma'(z) = \\sigma(z)(1 - \\sigma(z))",
    vivaTip:
      "Derivative property \\sigma'(z) = \\sigma(z)(1-\\sigma(z)) makes backpropagation very computationally efficient.",
  },
  {
    id: "def-11",
    term: "Feature Matrix (Design Matrix X)",
    category: "Math & Vectors",
    examSignificance: "High - Linear Algebra Representation",
    definition:
      "A structured 2-dimensional mathematical matrix of shape N x d where each row i represents an individual sample/observation vector and each column j represents an input feature.",
    math: "X \\in \\mathbb{R}^{N \\times d}, \\quad x_i = [x_{i1}, x_{i2}, \\dots, x_{id}]^T",
    vivaTip:
      "Remember: N = number of samples (rows), d = number of features/dimensions (columns).",
  },
  {
    id: "def-12",
    term: "Vector Dot Product & Cosine Similarity",
    category: "Math & Vectors",
    examSignificance: "High - Core geometric concept",
    definition:
      "The algebraic sum of component-wise products of two vectors, representing their directional alignment scaled by magnitudes. Cosine similarity normalizes the dot product by Euclidean norms.",
    math: "u \\cdot v = \\sum u_i v_i = \\|u\\| \\|v\\| \\cos(\\theta), \\quad \\text{CosSim}(u,v) = \\frac{u \\cdot v}{\\|u\\|_2 \\|v\\|_2}",
    vivaTip:
      "Cosine similarity is independent of vector magnitude, making it the industry standard for text/embedding comparisons.",
  },
  {
    id: "def-13",
    term: "Data Leakage",
    category: "Pipeline & Engineering",
    examSignificance: "Critical - Top Viva & Interview Trap",
    definition:
      "A catastrophic methodological error where information from outside the training dataset (such as test features or target values) contaminates the model training process, artificially inflating evaluation scores.",
    math: "\\text{Leakage: } \\text{fit}(X_{\\text{all}}) \\rightarrow \\text{split}(X) \\quad \\text{vs. Correct: } \\text{split}(X) \\rightarrow \\text{fit}(X_{\\text{train}})",
    vivaTip:
      "Always state the golden rule: Split your dataset into train/test BEFORE calculating means, scalers, or imputations.",
  },
  {
    id: "def-14",
    term: "Confusion Matrix & F1-Score",
    category: "Evaluation & Metrics",
    examSignificance: "Critical - Mandatory numerical in every exam",
    definition:
      "A contingency table tabulating True Positives (TP), False Positives (FP), True Negatives (TN), and False Negatives (FN). The F1-Score is the harmonic mean of Precision and Recall.",
    math: "\\text{Precision} = \\frac{TP}{TP+FP}, \\quad \\text{Recall} = \\frac{TP}{TP+FN}, \\quad F_1 = \\frac{2 \\cdot P \\cdot R}{P + R}",
    vivaTip:
      "Explain why harmonic mean is used instead of arithmetic mean (it penalizes severe imbalance between Precision and Recall).",
  },
  {
    id: "def-15",
    term: "Stratified K-Fold Cross-Validation",
    category: "Evaluation & Metrics",
    examSignificance: "High - Model Selection",
    definition:
      "A statistical resampling technique that partitions data into K equal folds while ensuring every single fold preserves the exact class percentage distribution of the overall dataset.",
    math: "P(y = c \\mid \\text{Fold}_k) \\approx P(y = c \\mid D) \\quad \\forall k \\in \\{1, \\dots, K\\}",
    vivaTip:
      "Crucial for imbalanced datasets (e.g. 1% fraud) to prevent folds with zero positive instances.",
  },
  {
    id: "def-16",
    term: "Silhouette Coefficient",
    category: "Evaluation & Metrics",
    examSignificance: "High - Unsupervised Evaluation",
    definition:
      "A cluster validation metric measuring how well-separated and tightly cohesive clusters are, calculated per sample and averaged across the dataset.",
    math: "s(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))}, \\quad s \\in [-1.0, +1.0]",
    vivaTip:
      "a(i) = mean intra-cluster distance; b(i) = mean nearest other cluster distance. Score > 0.5 indicates solid clustering.",
  },
  {
    id: "def-17",
    term: "Parameters vs. Hyperparameters",
    category: "Pipeline & Engineering",
    examSignificance: "Critical - 2-mark distinction in almost all papers",
    definition:
      "Parameters (weights w, bias b) are learned automatically from training data via optimization. Hyperparameters (learning rate \\alpha, cluster count k, regularization \\lambda) are set manually by the engineer before training.",
    math: "w \\leftarrow w - \\alpha \\nabla_w L \\quad (w = \\text{param}, \\alpha = \\text{hyperparam})",
    vivaTip:
      "Use this simple memory trick: Parameters are 'Data-Learned', Hyperparameters are 'Human-Tuned'.",
  },
  {
    id: "def-18",
    term: "Polanyi's Paradox",
    category: "Foundations & Paradigms",
    examSignificance: "Medium - Conceptual Philosophy",
    definition:
      "The philosophical and cognitive observation that 'we know more than we can tell'—humans perform complex perceptual tasks (recognizing faces, understanding tone) without conscious awareness of the explicit mathematical rules.",
    math: "\\text{Tacit Knowledge } \\gg \\text{Articulable Rules}",
    vivaTip:
      "Cite this to justify why machine learning is indispensable for computer vision and speech recognition.",
  },
];

const categories = [
  "All",
  "Foundations & Paradigms",
  "Math & Optimization",
  "Math & Vectors",
  "Evaluation & Metrics",
  "Pipeline & Engineering",
];

const goldenExamRules = [
  {
    num: 1,
    title: "Always Quote the Tom Mitchell <T, P, E> Formal Tuple",
    desc: "When asked to define Machine Learning, provide Arthur Samuel's intuitive definition first, then immediately write Mitchell's formal definition with a labeled example tuple (Task T, Performance P, Experience E).",
  },
  {
    num: 2,
    title: "Clearly Distinguish Regression vs. Classification",
    desc: "State unequivocally: Regression predicts a continuous quantitative real number (e.g. house price in Lakhs), whereas Classification predicts a discrete qualitative category (e.g. Pass/Fail, Spam/Ham).",
  },
  {
    num: 3,
    title: "Highlight the Danger of Data Leakage",
    desc: "In any workflow or preprocessing question, explicitly mention that feature scaling, mean imputation, and encoding must be fitted ONLY on the training split, never on the full dataset before splitting.",
  },
  {
    num: 4,
    title: "Explain Why Accuracy Fails on Imbalanced Data",
    desc: "Always give the 99% fraud example: In a dataset with 990 legitimate and 10 fraud transactions, a naive model predicting 'Legitimate' 100% of the time scores 99% accuracy while failing 100% of fraud detection.",
  },
  {
    num: 5,
    title: "Define Parameters vs. Hyperparameters Explicitly",
    desc: "Parameters are learned automatically by the optimizer (weights, biases). Hyperparameters are configured externally prior to fitting (learning rate, k in k-Means, tree depth).",
  },
  {
    num: 6,
    title: "Write Index Summations Explicitly",
    desc: "Always specify the limits on sigma notations: \\sum_{i=1}^N instead of a naked \\sum to demonstrate mathematical rigor to the university examiner.",
  },
  {
    num: 7,
    title: "State the 3 Semi-Supervised Geometric Axioms",
    desc: "Memorize the trifecta: 1. Smoothness Assumption, 2. Cluster Assumption, 3. Low-Density Separation Assumption.",
  },
  {
    num: 8,
    title: "Detail the 3-Way Dataset Split Rationale",
    desc: "Explain why a validation set is needed in addition to a test set: Hyperparameter tuning on test data causes data snooping and model overfitting. The test set must be evaluated only ONCE.",
  },
  {
    num: 9,
    title: "Provide Real-World Concrete Examples",
    desc: "Anchor your theoretical answers to concrete applications: UPI fraud detection (<50ms SLA), chest X-ray pneumonia classification (high recall requirement), and telecom subscriber churn.",
  },
  {
    num: 10,
    title: "Master Vector Dot Products & Cosine Similarity",
    desc: "Know the difference: Dot product is magnitude-dependent, while Cosine Similarity is purely directional (normalized by L2 norms) and bounded in [-1.0, +1.0].",
  },
];

const formulaCheatSheet = [
  {
    concept: "Linear Model Hypothesis",
    formula: "\\hat{y} = w^T x + b = \\sum_{j=1}^d w_j x_j + b",
    application: "Linear & Logistic Regression base linear combiner",
  },
  {
    concept: "Mean Squared Error (MSE)",
    formula: "\\text{MSE} = \\frac{1}{N} \\sum_{i=1}^N (y_i - \\hat{y}_i)^2",
    application: "Continuous regression loss minimization",
  },
  {
    concept: "Binary Cross-Entropy (Log Loss)",
    formula: "L = -\\frac{1}{N} \\sum_{i=1}^N [y_i \\ln p_i + (1-y_i) \\ln(1-p_i)]",
    application: "Binary classification loss with convex gradient",
  },
  {
    concept: "Logistic Sigmoid Activation",
    formula: "\\sigma(z) = \\frac{1}{1 + e^{-z}}",
    application: "Maps linear score to probability in (0, 1)",
  },
  {
    concept: "Precision & Recall",
    formula: "P = \\frac{TP}{TP+FP}, \\quad R = \\frac{TP}{TP+FN}",
    application: "Classification evaluation under imbalanced distributions",
  },
  {
    concept: "F1-Score (Harmonic Mean)",
    formula: "F_1 = 2 \\cdot \\frac{P \\cdot R}{P + R} = \\frac{2 TP}{2 TP + FP + FN}",
    application: "Balanced evaluation metric for classification",
  },
  {
    concept: "Vector L2 Norm (Euclidean)",
    formula: "\\|u\\|_2 = \\sqrt{\\sum_{j=1}^d u_j^2}",
    application: "Vector magnitude and Euclidean distance calculation",
  },
  {
    concept: "Cosine Similarity",
    formula: "\\text{CosSim}(u, v) = \\frac{u \\cdot v}{\\|u\\|_2 \\|v\\|_2}",
    application: "Directional alignment of text/image vector embeddings",
  },
  {
    concept: "k-Means WCSS Objective",
    formula: "J = \\sum_{k=1}^K \\sum_{x_i \\in C_k} \\|x_i - \\mu_k\\|^2",
    application: "Centroid-based clustering inertia minimization",
  },
  {
    concept: "Silhouette Coefficient",
    formula: "s(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))}",
    application: "Cluster cohesion vs. separation quality measurement",
  },
];

export default function Topic23() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [activeTab, setActiveTab] = useState("definitions"); // 'definitions' | 'formulas' | 'rules' | 'note' | 'viva'

  const filteredDefinitions = useMemo(() => {
    return masterDefinitions.filter((item) => {
      const matchesCat =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.vivaTip.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyDefinition = (item) => {
    const textToCopy = `${item.term}\nCategory: ${item.category}\nDefinition: ${item.definition}\nFormula: ${item.math}\nViva Key Tip: ${item.vivaTip}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 md:p-10 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* =========================================================================
            HEADER SECTION
        ========================================================================= */}
        <header className="text-center space-y-4 pt-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/50 text-indigo-300 text-xs font-semibold uppercase tracking-wider shadow-lg shadow-indigo-950/40">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span>BCAC701B · Module 001 · Examination Special Topic</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Examination Ready Note &amp; Complete Definitions Handbook
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Downloadable, printable, and search-indexed revision handbook covering the foundational concepts, definitions, mathematical formulations, and viva voce points across all 22 topics of this module.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-medium text-slate-400">
            <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-emerald-400 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5" /> 100% Syllabus Aligned
            </span>
            <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-cyan-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> 50+ Formal Definitions
            </span>
            <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-indigo-400 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" /> Complete Formula Suite
            </span>
            <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-amber-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> Downloadable Plain-Text Note
            </span>
          </div>
        </header>

        {/* =========================================================================
            TEACHER'S EXAMINATION STRATEGY MASTERCLASS
        ========================================================================= */}
        <section className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900/90 border border-indigo-500/30 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-2xl shrink-0 shadow-inner">
              👨‍🏫
            </div>
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <span>Teacher Sukanta Hui's Examination &amp; Viva Strategy Guide</span>
                </h2>
                <span className="text-xs px-2.5 py-1 rounded bg-indigo-900/60 border border-indigo-700/50 text-indigo-300 font-mono">
                  Coder &amp; AccoTax · Barrackpore
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Dear Students, in university examinations (BCA / B.Tech / MCA) as well as technical job interviews, examiners look for three hallmarks of excellence: <strong className="text-indigo-300">Exact Formal Definitions</strong>, <strong className="text-cyan-300">Mathematical Notation Rigor</strong>, and <strong className="text-emerald-300">Real-World Case Grounding</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-indigo-400 flex items-center gap-1">
                    <Target className="w-3.5 h-3.5" /> 1. Definitions
                  </div>
                  <p className="text-slate-400">
                    Always write Tom Mitchell's <code className="text-indigo-300">&lt;T, P, E&gt;</code> tuple along with Arthur Samuel's classic 1959 statement.
                  </p>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-cyan-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> 2. Equations
                  </div>
                  <p className="text-slate-400">
                    Write sigma summation limits clearly (<code className="text-cyan-300">\sum_{`i=1`}^N</code>) and specify parameter dimensions (<code className="text-cyan-300">X \in \mathbb{`R`}^{`N \times d`}</code>).
                  </p>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 3. Data Leakage
                  </div>
                  <p className="text-slate-400">
                    Never forget to mention why preprocessing (scaling, imputation) MUST occur strictly after splitting the dataset.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            NAVIGATION TABS
        ========================================================================= */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab("definitions")}
            className={clsx(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2",
              activeTab === "definitions"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
            )}
          >
            <BookOpen className="w-4 h-4" />
            <span>Master Definitions Dictionary ({masterDefinitions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("formulas")}
            className={clsx(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2",
              activeTab === "formulas"
                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
            )}
          >
            <Calculator className="w-4 h-4" />
            <span>Formula Quick Reference</span>
          </button>

          <button
            onClick={() => setActiveTab("rules")}
            className={clsx(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2",
              activeTab === "rules"
                ? "bg-amber-600 text-white shadow-lg shadow-amber-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
            )}
          >
            <Award className="w-4 h-4" />
            <span>10 Golden Exam Rules</span>
          </button>

          <button
            onClick={() => setActiveTab("viva")}
            className={clsx(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2",
              activeTab === "viva"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
            )}
          >
            <Sparkles className="w-4 h-4" />
            <span>High-Yield Viva Q&amp;A</span>
          </button>

          <button
            onClick={() => setActiveTab("note")}
            className={clsx(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2",
              activeTab === "note"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
            )}
          >
            <Download className="w-4 h-4" />
            <span>Download &amp; Print Full Note</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: MASTER DEFINITIONS DICTIONARY
        ========================================================================= */}
        {activeTab === "definitions" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search any definition or concept..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Found: <strong className="text-white">{filteredDefinitions.length}</strong> definitions</span>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                      selectedCategory === cat
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Definitions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredDefinitions.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 space-y-3.5 transition-all hover:shadow-xl hover:shadow-indigo-950/20 group flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {item.term}
                      </h3>
                      <button
                        onClick={() => handleCopyDefinition(item)}
                        title="Copy Exam Definition"
                        className="p-1.5 rounded-lg bg-slate-950 hover:bg-indigo-950 text-slate-400 hover:text-indigo-300 border border-slate-800 shrink-0 transition-colors"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800/60">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40">
                        {item.examSignificance}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.definition}
                    </p>

                    {item.math && (
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-indigo-300 overflow-x-auto">
                        <code>{item.math}</code>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-800/70 text-[11px] text-slate-400 flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold shrink-0">💡 Viva Tip:</span>
                    <span>{item.vivaTip}</span>
                  </div>
                </div>
              ))}
            </div>

            {filteredDefinitions.length === 0 && (
              <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400 space-y-2">
                <Search className="w-8 h-8 mx-auto text-slate-600" />
                <p>No definitions found matching &quot;{searchQuery}&quot;.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="text-xs text-indigo-400 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 2: FORMULA QUICK REFERENCE
        ========================================================================= */}
        {activeTab === "formulas" && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-cyan-400" />
                <span>Essential Mathematical Formulations Cheat Sheet</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Memorize these core formulas for numerical problems, derivation questions, and viva voce examinations.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider font-semibold">
                      <th className="p-4">Concept / Metric</th>
                      <th className="p-4">Mathematical Equation</th>
                      <th className="p-4">Examination Application</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-xs sm:text-sm">
                    {formulaCheatSheet.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-bold text-white whitespace-nowrap">
                          {row.concept}
                        </td>
                        <td className="p-4 font-mono text-cyan-300 whitespace-nowrap bg-slate-950/40">
                          <code>{row.formula}</code>
                        </td>
                        <td className="p-4 text-slate-300">
                          {row.application}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: 10 GOLDEN EXAM RULES
        ========================================================================= */}
        {activeTab === "rules" && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>10 Golden Rules for Securing 100% Marks in ML Examinations</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Key presentation guidelines, common traps to avoid, and essential examiner checkpoints curated by Sukanta Hui.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {goldenExamRules.map((rule) => (
                <div
                  key={rule.num}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2.5 flex items-start gap-4 hover:border-amber-500/40 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-950 border border-amber-700/60 text-amber-300 font-bold text-sm flex items-center justify-center shrink-0">
                    {rule.num}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white">
                      {rule.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {rule.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: VIVA RAPID-FIRE QUESTIONS
        ========================================================================= */}
        {activeTab === "viva" && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>High-Yield Viva Voce &amp; Technical Interview Flashcards</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Rapid-fire questions frequently asked by university external examiners and technical interview panels.
              </p>
            </div>

            <div className="space-y-4">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm sm:text-base font-bold text-white flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-purple-950 text-purple-400 border border-purple-800 flex items-center justify-center text-xs shrink-0 mt-0.5">
                        Q{q.id}
                      </span>
                      <span>{q.question}</span>
                    </h3>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-950 text-purple-400 border border-slate-800 shrink-0">
                      {q.level}
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                    <div className="text-xs font-bold text-emerald-400">
                      Direct Examination Model Answer:
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {q.shortAnswer}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong className="text-indigo-300">Examiner Deep-Dive Rationale:</strong> {q.explanation}
                  </p>

                  {q.codeExample && (
                    <pre className="p-2.5 bg-slate-950 rounded-lg text-xs font-mono text-cyan-300 overflow-x-auto border border-slate-800/80">
                      <code>{q.codeExample}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: PLAIN TEXT PRINT & DOWNLOAD WORKBENCH
        ========================================================================= */}
        {activeTab === "note" && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-emerald-400" />
                <span>Downloadable Plain-Text Examination Note</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                You can directly download this note as a clean UTF-8 text file (<code className="text-emerald-300">.txt</code>), copy the text to your clipboard, or print it out with one click for offline study.
              </p>
            </div>

            <PlainTextPrint
              content={noteText}
              filename="001_001_introduction_to_machine_learning_master_exam_notes.txt"
              title="BCAC701B: Module 001 - Introduction to Machine Learning Master Exam Notes"
              hidePreview={false}
              showDownload={true}
            />
          </div>
        )}

        {/* =========================================================================
            TEACHER'S CLOSING ENCOURAGEMENT
        ========================================================================= */}
        <section className="pt-4">
          <Teacher
            note={
              "Mastering Machine Learning is not about memorizing complex Python libraries—it is about building an unshakable intuitive foundation of how algorithms generalize from data. " +
              "Review these definitions and formulas consistently before your university examinations and interviews. When your theoretical foundation is solid, any implementation becomes easy. Best of luck in your ML journey!"
            }
          />
        </section>

        {/* =========================================================================
            FOOTER
        ========================================================================= */}
        <footer className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 space-y-1">
          <p>
            Module 001: Introduction to Machine Learning · Examination Handbook &amp; Study Notes
          </p>
          <p>
            Course: BCAC701B · Coder &amp; AccoTax, Barrackpore, West Bengal · Author: Sukanta Hui
          </p>
        </footer>

      </div>
    </div>
  );
}
