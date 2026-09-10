import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic14_files/worked_example_1_student_pass_fail_prediction_lab.py?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions.js";

const Topic14 = () => {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");
  const [selectedFormulaElement, setSelectedFormulaElement] = useState("all");

  // Novice Classroom State
  const [selectedLessonTab, setSelectedLessonTab] = useState("intuition");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

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

  // Smooth scroll handler
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
  const actualLabel = selectedStudent && studentPresets[selectedStudent] ? studentPresets[selectedStudent].actual : (prob >= 0.5 ? 1 : 0);
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
      tag: "Input Attributes",
      tagColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      mathDef: "x_i = [x_{i1}, x_{i2}, ..., x_{id}]^T ∈ ℝ^d",
      plainEnglish: "The profile of numerical measurements describing student i.",
      studentContext: "x_i = [Attendance %, Study Hours, Mock Score]. For Mamata: [0.90, 0.85, 0.88].",
      extremeCase: "Missing critical features (e.g., student health or prior exam base) limits maximum achievable accuracy."
    },
    {
      id: "weights",
      badge: "w",
      name: "6. Feature Weight Coefficients",
      tag: "Feature Importances",
      tagColor: "bg-amber-950 text-amber-300 border-amber-800",
      mathDef: "w = [w_1, w_2, ..., w_d]^T ∈ ℝ^d",
      plainEnglish: "The learned importance multipliers assigned to each feature.",
      studentContext: "If w_2 (Study Hours) = 3.0 and w_1 (Attendance) = 2.5, study hours have a stronger mathematical impact on passing probability.",
      extremeCase: "If weights grow to extreme numbers (e.g. w = 1000), the model becomes hypersensitive to minor noise."
    },
    {
      id: "bias",
      badge: "b",
      name: "7. The Decision Bias Intercept",
      tag: "Baseline Threshold",
      tagColor: "bg-amber-950 text-amber-300 border-amber-800",
      mathDef: "b ∈ ℝ (Scalar Offset)",
      plainEnglish: "The baseline difficulty threshold of the academic program when all feature inputs are zero.",
      studentContext: "A negative bias (b = -3.20) means passing is not guaranteed by default; a student must demonstrate sufficient attendance and study hours to overcome this negative offset.",
      extremeCase: "Without bias (b=0), the decision boundary is forced through the origin (0,0), crippling flexibility."
    },
    {
      id: "hypo",
      badge: "h(x_i; w, b)",
      name: "8. The Hypothesis Function (Sigmoid)",
      tag: "Probability Predictor",
      tagColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      mathDef: "h(x_i) = σ(w^T x_i + b) = 1 / (1 + e^{-(w^T x_i + b)})",
      plainEnglish: "Takes the raw linear score z and squashes it into a calibrated probability percentage between 0% and 100%.",
      studentContext: "Translates z = 2.45 into P(Pass) = 92.06%. If P ≥ 50%, predict PASS; else FAIL.",
      extremeCase: "Without the sigmoid function, linear regression outputs values like -1.4 or +3.8, which make no sense as probabilities."
    },
    {
      id: "label",
      badge: "y_i",
      name: "9. Ground-Truth Target Label",
      tag: "Supervisory Target",
      tagColor: "bg-teal-950 text-teal-300 border-teal-800",
      mathDef: "y_i ∈ {0, 1} (Binary Indicator)",
      plainEnglish: "The verified, real-world historical outcome for student i.",
      studentContext: "y_i = 1 represents 'Student Passed'; y_i = 0 represents 'Student Failed / Needs Remediation'.",
      extremeCase: "If ground-truth labels contain grading errors, the model learns corrupted decision boundaries."
    },
    {
      id: "loss",
      badge: "L(ŷ_i, y_i)",
      name: "10. Binary Cross-Entropy Loss",
      tag: "Instantaneous Error Metric",
      tagColor: "bg-rose-950 text-rose-300 border-rose-800",
      mathDef: "L = - [ y_i ln(ŷ_i) + (1 - y_i) ln(1 - ŷ_i) ]",
      plainEnglish: "The logarithmic error penalty for a single student prediction. It is nearly 0 for confident correct predictions, but asymptotically explodes toward infinity for confident wrong predictions.",
      studentContext: "If Mamata passes (y=1) and model predicts 92%, loss is tiny (0.08). If model predicted 5%, loss explodes to 3.00.",
      extremeCase: "Using Mean Squared Error instead of BCE creates non-convex wavy loss surfaces with multiple false local traps."
    },
    {
      id: "reg",
      badge: "λ Ω(w)",
      name: "11. Regularization Term & Penalty",
      tag: "Overfitting Shield",
      tagColor: "bg-purple-950 text-purple-300 border-purple-800",
      mathDef: "λ Ω(w) = λ ∑_{j=1}^d w_j^2 (L2 Ridge)",
      plainEnglish: "Penalizes unnecessarily large weight magnitudes to prevent overfitting.",
      studentContext: "With λ = 0.02 and weights [2.5, 3.0, 1.8], penalty = 0.02 * (6.25 + 9.0 + 3.24) = 0.3698. It discourages weights from blowing up to memorize noisy students.",
      extremeCase: "If λ = 0, model overfits (high variance). If λ = 10, weights collapse to 0, predicting identical probabilities for everyone."
    }
  ];

  // Comprehensive Jargon Glossary
  const jargonTerms = [
    {
      id: "logistic-regression",
      term: "Logistic Regression",
      category: "core",
      badge: "Classification Core",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      pronunciation: "ləˈdʒɪs.tɪk rɪˈɡrɛʃ.ən",
      plainEnglish: "A fundamental supervised algorithm for predicting binary outcomes (Yes/No, Pass/Fail) by passing a linear equation through a Sigmoid curve.",
      everydayAnalogy: "Like a sports referee calculating an overall penalty score and blowing the whistle if the score crosses a strict threshold.",
      whyItMatters: "The most widely deployed baseline classification algorithm in industry due to its interpretability and speed."
    },
    {
      id: "sigmoid-activation",
      term: "Sigmoid / Logistic Function σ(z)",
      category: "math",
      badge: "Probability S-Curve",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "ˈsɪɡ.mɔɪd ˌæk.tɪˈveɪ.ʃən",
      plainEnglish: "An S-shaped mathematical function that compresses any real number from -∞ to +∞ into a clean probability between 0.0 (0%) and 1.0 (100%).",
      everydayAnalogy: "A voltage regulator that prevents an electric current from going below 0V or above 100V no matter how high the surge.",
      whyItMatters: "Converts unbounded linear numbers into valid, interpretable event probabilities."
    },
    {
      id: "cross-entropy",
      term: "Binary Cross-Entropy (Log Loss)",
      category: "loss",
      badge: "Information Loss",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "ˈbaɪ.nə.ri krɒs ˈɛn.trə.pi",
      plainEnglish: "The standard loss function for classification that severely punishes models when they are confidently wrong.",
      everydayAnalogy: "A strict teacher who takes away 1 mark for an honest guess, but deducts 50 marks if you arrogantly argue a completely false answer.",
      whyItMatters: "Guarantees a smooth convex bowl-shaped loss surface with a single global minimum."
    },
    {
      id: "decision-boundary",
      term: "Decision Boundary (Threshold = 0.5)",
      category: "math",
      badge: "Dividing Hyperplane",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      pronunciation: "dɪˈsɪʒ.ən ˈbaʊn.dər.i",
      plainEnglish: "The mathematical line (or plane) where predicted probability is exactly 50% (z = 0). Points on one side are classified as Class 1; points on the other are Class 0.",
      everydayAnalogy: "The passing mark line on an exam sheet (e.g. 40%). Score 40 or higher ➔ Pass; below 40 ➔ Fail.",
      whyItMatters: "Can be adjusted (e.g., threshold = 0.3) if missing a positive case carries a heavy cost (e.g. cancer diagnosis)."
    },
    {
      id: "l2-regularization",
      term: "L2 Ridge Regularization (λ Ω(w))",
      category: "optimization",
      badge: "Weight Decay",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "ɛl tuː ˌrɛɡ.jʊ.lə.raɪˈzeɪ.ʃən",
      plainEnglish: "Adding the sum of squared weights to the loss function to prevent the model from assigning wildly gigantic weights to single noisy features.",
      everydayAnalogy: "A coach telling players: 'Win the game, but keep your movements smooth and balanced without taking reckless, dangerous leaps.'",
      whyItMatters: "Prevents overfitting and guarantees stable model generalization."
    }
  ];

  // Diagnostic Quiz Questions
  const quizQuestions = [
    {
      question: "In Logistic Regression, why do we pass the linear combination z = w^T x + b through the Sigmoid function σ(z)?",
      options: [
        "To make the computation run 100 times faster.",
        "To compress the unbounded linear score into a valid probability strictly between 0.0 and 1.0.",
        "To convert floating-point numbers into strings.",
        "To eliminate all negative weights."
      ],
      correctIndex: 1,
      explanation: "A linear equation w^T x + b produces unbounded numbers from -∞ to +∞. The Sigmoid function σ(z) = 1/(1+e^(-z)) cleanly compresses this output into the [0, 1] range, representing a valid probability."
    },
    {
      question: "If a student passes (y = 1) but the model predicted a pass probability of only 0.01 (1%), what happens to the Binary Cross-Entropy Loss?",
      options: [
        "The loss becomes 0 because the student passed.",
        "The loss becomes a huge penalty (-ln(0.01) ≈ 4.60) because the model was confidently wrong.",
        "The loss becomes negative.",
        "The computer resets the weights to zero."
      ],
      correctIndex: 1,
      explanation: "Binary Cross-Entropy Loss L = -ln(y_hat) when y=1. If y_hat = 0.01, -ln(0.01) ≈ 4.605, heavily penalizing the model for making a confident, incorrect prediction."
    },
    {
      question: "What is the primary role of the bias term 'b' in the equation z = w_1 x_1 + w_2 x_2 + w_3 x_3 + b?",
      options: [
        "It acts as a baseline offset / threshold, allowing the decision boundary to shift without passing through the origin.",
        "It calculates the student's name length.",
        "It sets the learning rate for gradient descent.",
        "It forces all weights to be positive."
      ],
      correctIndex: 0,
      explanation: "Without the bias term b, the decision line w^T x = 0 is forced to pass through the origin (0, 0, 0). The bias term b acts as an intercept, shifting the decision plane to the optimal threshold."
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

  return (
    <div className="space-y-10 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16 px-4 sm:px-6">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-3xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
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

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Worked Example 1: Student Pass/Fail Prediction
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            A complete step-by-step deconstruction of the master Machine Learning optimization formula: <span className="font-mono text-cyan-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">{"min_w (1/N) ∑ L(h(x_i; w), y_i) + λ Ω(w)"}</span>. Learn how Logistic Regression, Sigmoid activation, Binary Cross-Entropy, and L2 regularization predict student academic success.
          </p>

          <div className="flex flex-wrap gap-2 pt-3">
            {[
              { id: "noviceMasterclass", label: "🎓 Master Teacher's Classroom", icon: "👨‍🏫" },
              { id: "simulator", label: "⚡ Interactive Optimization Studio", icon: "🔬" },
              { id: "theory", label: "📐 11-Element Mathematical Deconstruction", icon: "📖" },
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
                How Logistic Regression Decides: The Academic Mentor Analogy
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/90 px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 font-mono">
            <span>⏱️ 12 min intuitive guide</span>
          </div>
        </div>

        {/* Teacher's Welcome Dialogue */}
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/60 p-6 rounded-2xl border border-indigo-800/40 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <span>👋 Welcome, student! Let us take apart our first complete Machine Learning system piece by piece.</span>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Imagine an experienced professor at a Barrackpore college who has taught for 20 years. When the professor looks at a student's attendance record (e.g. 90%), weekly study hours (17 hrs), and midterm quiz marks (88%), their brain combines these clues, weighs their relative importance, and intuitively estimates: <em>"This student has a 92% chance of clearing the semester."</em>
          </p>
          <p className="text-sm text-indigo-200 font-medium">
            Logistic Regression is nothing more than turning this intuitive teacher wisdom into an exact mathematical formula!
          </p>
        </div>

        {/* Sub-Lesson Tabs */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
            {[
              { id: "intuition", label: "1. The 3-Step Decision Recipe", icon: "🍳" },
              { id: "lossIntuition", label: "2. The BCE Loss Penalty Intuition", icon: "⚖️" },
              { id: "jargon", label: "3. Jargon Buster Glossary", icon: "📖" }
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

          {/* Sub-Lesson 1: The 3-Step Decision Recipe */}
          {selectedLessonTab === "intuition" && (
            <div className="space-y-6 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🍳</span> The 3-Step Mathematical Recipe for Classification
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Step 1: The Weighted Sum (Logit z)</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Multiply each feature by its importance weight and add the baseline bias:
                    </p>
                    <div className="text-xs font-mono text-cyan-300 bg-slate-950 p-2 rounded border border-slate-800">
                      {"z = w₁·x₁ + w₂·x₂ + w₃·x₃ + b"}
                    </div>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Step 2: The Sigmoid Squasher</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Squash the unbounded number z into a clean probability percentage between 0% and 100%:
                    </p>
                    <div className="text-xs font-mono text-emerald-300 bg-slate-950 p-2 rounded border border-slate-800">
                      {"P(Pass) = 1 / (1 + e^(-z))"}
                    </div>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase">Step 3: The Decision Threshold</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Compare the probability against the 50% cutoff mark:
                    </p>
                    <div className="text-xs font-mono text-amber-300 bg-slate-950 p-2 rounded border border-slate-800">
                      {"P ≥ 0.50 ➔ PASS (1)"}<br />
                      {"P < 0.50 ➔ FAIL (0)"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Lesson 2: BCE Loss Intuition */}
          {selectedLessonTab === "lossIntuition" && (
            <div className="space-y-4 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-rose-900/40 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>⚖️</span> Why Binary Cross-Entropy Punishes Arrogant Mistakes
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Suppose a student actually passed the semester ({"y = 1"}). Notice how the loss behaves as the model's confidence changes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs font-mono">
                  <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-800 text-emerald-300 space-y-1">
                    <div>P(Pass) = 95%</div>
                    <div>Loss = -ln(0.95) = <strong>0.051</strong></div>
                    <div className="text-[10px] text-slate-400">Tiny penalty for confident correct prediction.</div>
                  </div>
                  <div className="bg-amber-950/60 p-3 rounded-xl border border-amber-800 text-amber-300 space-y-1">
                    <div>P(Pass) = 50%</div>
                    <div>Loss = -ln(0.50) = <strong>0.693</strong></div>
                    <div className="text-[10px] text-slate-400">Moderate penalty for unsure guess.</div>
                  </div>
                  <div className="bg-rose-950/60 p-3 rounded-xl border border-rose-800 text-rose-300 space-y-1">
                    <div>P(Pass) = 1%</div>
                    <div>Loss = -ln(0.01) = <strong>4.605</strong></div>
                    <div className="text-[10px] text-slate-400">Massive penalty for confident wrong prediction!</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Lesson 3: Jargon Buster */}
          {selectedLessonTab === "jargon" && (
            <div className="space-y-6 pt-2">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "All Terms" },
                    { id: "core", label: "Core" },
                    { id: "math", label: "Activation" },
                    { id: "loss", label: "Loss Function" },
                    { id: "optimization", label: "Regularization" }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedJargonCategory(cat.id)}
                      className={clsx(
                        "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                        selectedJargonCategory === cat.id
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
                    placeholder="Search Worked Example 1 jargon..."
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

      {/* SECTION 1: INTERACTIVE OPTIMIZATION STUDIO */}
      <section
        id="simulator"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Student Pass/Fail Optimization Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Select student profiles, tweak weights, observe Sigmoid curve activations, and trace live Binary Cross-Entropy loss
            </p>
          </div>
        </div>

        {/* Student Preset Selectors */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Select a Student Cohort Profile:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {Object.keys(studentPresets).map((key) => {
              const s = studentPresets[key];
              return (
                <button
                  key={key}
                  onClick={() => handleSelectPreset(key)}
                  className={clsx(
                    "p-3 rounded-xl border text-left transition-all cursor-pointer space-y-1",
                    selectedStudent === key
                      ? "bg-indigo-600/30 border-indigo-400 text-white shadow-lg shadow-indigo-600/30"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  )}
                >
                  <div className="text-xs font-bold leading-tight line-clamp-1">{s.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {s.attendance}% Att • {s.hours}h • {s.quiz}%
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Sliders & Live Computation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
          {/* Controls: Student Attributes & Model Weights */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
              1. Student Attributes (Normalized Inputs x_i)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Attendance:</span>
                  <span className="text-cyan-400 font-bold">{attendance}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={attendance}
                  onChange={(e) => {
                    setAttendance(Number(e.target.value));
                    setSelectedStudent("");
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <span className="text-[10px] text-slate-500">x₁ = {(attendance / 100).toFixed(2)}</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Study Hours:</span>
                  <span className="text-emerald-400 font-bold">{studyHours}h/wk</span>
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
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <span className="text-[10px] text-slate-500">x₂ = {(studyHours / 20).toFixed(2)}</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Quiz Score:</span>
                  <span className="text-purple-400 font-bold">{quizScore}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={quizScore}
                  onChange={(e) => {
                    setQuizScore(Number(e.target.value));
                    setSelectedStudent("");
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <span className="text-[10px] text-slate-500">x₃ = {(quizScore / 100).toFixed(2)}</span>
              </div>
            </div>

            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono pt-3 border-t border-slate-800">
              2. Model Weights &amp; Regularization (Tuned by Optimizer)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">w₁ (Attendance Weight):</span>
                  <span className="text-white font-bold">{weight1.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="-2.0"
                  max="6.0"
                  step="0.1"
                  value={weight1}
                  onChange={(e) => setWeight1(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">w₂ (Study Hours Weight):</span>
                  <span className="text-white font-bold">{weight2.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="-2.0"
                  max="6.0"
                  step="0.1"
                  value={weight2}
                  onChange={(e) => setWeight2(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">w₃ (Quiz Score Weight):</span>
                  <span className="text-white font-bold">{weight3.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="-2.0"
                  max="6.0"
                  step="0.1"
                  value={weight3}
                  onChange={(e) => setWeight3(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">b (Bias Intercept):</span>
                  <span className="text-white font-bold">{bias.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="-8.0"
                  max="4.0"
                  step="0.1"
                  value={bias}
                  onChange={(e) => setBias(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Real-Time Mathematical Output Card */}
          <div className="lg:col-span-5 bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Live Prediction &amp; Loss Response
              </span>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs space-y-1 text-slate-300">
                <div>Linear Logit z = {z.toFixed(3)}</div>
                <div className="text-emerald-400 font-bold text-sm">
                  P(Pass) = σ(z) = {probPct}%
                </div>
              </div>

              <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={clsx(
                    "h-full transition-all duration-300",
                    isApproved ? "bg-emerald-500" : "bg-rose-500"
                  )}
                  style={{ width: `${probPct}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">Classification Outcome:</span>
                <span
                  className={clsx(
                    "px-2.5 py-1 rounded font-bold uppercase",
                    isApproved
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                      : "bg-rose-950 text-rose-300 border border-rose-800"
                  )}
                >
                  {isApproved ? "✔ PASS PREDICTED" : "❌ FAIL / REMEDIATION"}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs font-mono space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>BCE Loss L(ŷ, y):</span>
                <span className="text-rose-400 font-bold">{bceLoss.toFixed(4)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>L2 Penalty λ·Ω(w):</span>
                <span className="text-purple-400 font-bold">{regLoss.toFixed(4)}</span>
              </div>
              <div className="flex justify-between text-white font-bold pt-1 border-t border-slate-800">
                <span>Total Objective 𝒥(w,b):</span>
                <span className="text-cyan-400">{totalCost.toFixed(4)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: 11-ELEMENT MATHEMATICAL DECONSTRUCTION */}
      <section
        id="theory"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The Master Optimization Formula: Complete 11-Element Dictionary
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Deconstructing every single mathematical operator, symbol, and hyperparameter
            </p>
          </div>
        </div>

        {/* Master Formula Display Banner */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-indigo-900/50 text-center space-y-3 shadow-inner">
          <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">
            The Central Optimization Equation of Machine Learning
          </span>
          <div className="text-lg sm:text-2xl font-mono text-cyan-300 font-extrabold tracking-wide overflow-x-auto py-2">
            {"min_{w,b}  (1 / N) ∑_{i=1}^N  L( h(x_i; w, b), y_i )  +  λ Ω(w)"}
          </div>
          <p className="text-xs text-slate-400 max-w-2xl mx-auto">
            Click any symbol card below to inspect its exact mathematical definition, plain English translation, and classroom context.
          </p>
        </div>

        {/* 11 Formula Element Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formulaElements.map((el) => (
            <div
              key={el.id}
              className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-indigo-500/50 transition-all shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-white">{el.name}</h3>
                <span className={clsx("px-2 py-0.5 text-xs font-mono font-bold rounded border", el.tagColor)}>
                  {el.badge}
                </span>
              </div>

              <div className="text-xs font-mono text-indigo-300 bg-slate-900 p-2.5 rounded border border-slate-800">
                {el.mathDef}
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div>
                  <strong className="text-cyan-400">Plain English: </strong>
                  <span>{el.plainEnglish}</span>
                </div>
                <div>
                  <strong className="text-amber-400">Classroom Context: </strong>
                  <span>{el.studentContext}</span>
                </div>
                <div>
                  <strong className="text-rose-400">Extreme Risk: </strong>
                  <span className="text-slate-400">{el.extremeCase}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: REGIONAL INDUSTRIAL CASE STUDIES */}
      <section
        id="caseStudies"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">
            03
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Real-World Regional Industrial Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Applied logistic regression and pass/fail prediction pipelines engineered across West Bengal
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Barrackpore Academic Hub</span>
            <h3 className="text-base font-bold text-white">College Semester Retention Pipeline</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mamata and Mahima deployed a regularized Logistic Regression classifier analyzing 1,200 undergraduate engineering students. By identifying at-risk students 6 weeks before semester exams, personalized remedial mentoring improved overall pass rates by 18%.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Salt Lake Sector V Corporate LMS</span>
            <h3 className="text-base font-bold text-white">IT Trainee Certification Prediction</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Debangshu engineered an automated onboarding scoring system predicting whether software engineering recruits would clear cloud certification exams, tuning the decision threshold to 0.40 to minimize false positives.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Ichapur Vocational Institute</span>
            <h3 className="text-base font-bold text-white">Technical Skills Practical Exam Predictor</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Susmita applied logistic regression with L2 regularization on workshop attendance and lab practical scores, accurately predicting pass/fail outcomes across 400 mechanical diploma candidates.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Jadavpur Educational Research</span>
            <h3 className="text-base font-bold text-white">Multi-Year Student Dropout Warning System</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Abhronila designed a longitudinal student monitoring model utilizing normalized feature vectors and Binary Cross-Entropy loss to flag early academic burnout across multiple university departments.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: DIAGNOSTIC QUIZ */}
      <section
        id="diagnosticQuiz"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">
            04
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Knowledge Diagnostic Check
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Test your understanding of Logistic Regression, Sigmoid activation, and Binary Cross-Entropy loss
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
            <span>Question {selectedQuizIndex + 1} of {quizQuestions.length}</span>
            <span className="text-indigo-400 font-bold">Optimization Concept Check</span>
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

      {/* SECTION 5: PITFALLS & BEST PRACTICES */}
      <section
        id="bestPractices"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">
            05
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Optimization Pitfalls &amp; Engineering Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Crucial guidelines for training stable, well-calibrated logistic classifiers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> 4 Dangerous Optimization Traps
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-rose-300">Using MSE for Binary Classification:</strong> Results in non-convex loss surfaces with local minima traps.</li>
              <li><strong className="text-rose-300">Omitting Feature Scaling:</strong> Features with large ranges (e.g. 0-1000) dominate gradient updates over small ones (0-1).</li>
              <li><strong className="text-rose-300">Setting λ = 0:</strong> Leaving linear weights unconstrained can lead to severe overfitting on noisy data.</li>
              <li><strong className="text-rose-300">Fixing Threshold at 0.5 Blindly:</strong> Fails when false positives and false negatives carry unequal financial or health costs.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> 4 Best Practice Optimization Rules
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-emerald-300">Always Standardize Features:</strong> Scale all numerical inputs with StandardScaler or MinMaxScaler.</li>
              <li><strong className="text-emerald-300">Use Binary Cross-Entropy (Log Loss):</strong> Guarantees smooth, convex loss optimization for gradient descent.</li>
              <li><strong className="text-emerald-300">Tune Regularization λ via Cross-Validation:</strong> Prevent weight explosion while preserving predictive capacity.</li>
              <li><strong className="text-emerald-300">Calibrate Probabilities with Platt Scaling:</strong> Ensure predicted 80% genuinely corresponds to 8 out of 10 cases.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PYTHON LABORATORY */}
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
              Interactive standalone lab script for logistic regression and binary classification optimization
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="worked_example_1_student_pass_fail_prediction_lab.py"
          highlightLines={[25, 32, 45, 60]}
        />
      </section>

      {/* FAQ TEMPLATE */}
      <section className="space-y-4">
        <FAQTemplate
          title="Worked Example 1: Student Pass/Fail Prediction — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* PRINTABLE NOTE */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Worked Example 1: Student Pass/Fail Prediction"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 14 Note"
          downloadFileName="topic14_note.txt"
        />
      </section>

      {/* TEACHER NOTE */}
      <section>
        <Teacher
          note="Worked Example 1 demonstrates the heart of supervised learning: combining linear weighted evidence with the Sigmoid activation and optimizing weights via Binary Cross-Entropy. Master these 11 formula components and you understand how machine learning systems make decisions across the world!"
        />
      </section>
    </div>
  );
};

export default Topic14;
