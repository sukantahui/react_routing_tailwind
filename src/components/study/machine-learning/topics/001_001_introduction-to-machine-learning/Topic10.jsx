import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic10_files/machine_learning_workflow_lab.py?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions.js";

const Topic10 = () => {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");

  // Novice Classroom Tab State
  const [selectedLessonTab, setSelectedLessonTab] = useState("pipeline");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Interactive Pipeline Studio State
  const [currentPipelineStage, setCurrentPipelineStage] = useState(0);
  const [dataCleanLevel, setDataCleanLevel] = useState(80); // 0 to 100%
  const [featureScaleEnabled, setFeatureScaleEnabled] = useState(true);
  const [trainTestSplitRatio, setTrainTestSplitRatio] = useState(80); // 80% train, 20% test
  const [modelComplexity, setModelComplexity] = useState(3); // 1: Underfit, 3: Optimal, 5: Overfit

  const svgId = useId();

  // Smooth scroll handler
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 7-Stage End-to-End Machine Learning Lifecycle
  const pipelineStages = [
    {
      id: 0,
      name: "1. Problem Framing",
      icon: "🎯",
      tag: "Business & Mathematical Objective",
      color: "from-blue-500/20 to-indigo-500/20 border-blue-500/40 text-blue-300",
      description: "Translating a vague human or business problem into a concrete ML task (Classification, Regression, Clustering, or RL) with measurable metrics.",
      keyQuestions: ["Is ML actually needed?", "What is the target variable y?", "What is the business cost of a False Positive vs False Negative?"],
      deliverable: "Project Scope Document + Baseline Success Criteria (e.g. F1 > 0.85, Latency < 50ms)"
    },
    {
      id: 1,
      name: "2. Data Ingestion & Collection",
      icon: "📥",
      tag: "Raw Sensor & Database Extraction",
      color: "from-cyan-500/20 to-teal-500/20 border-cyan-500/40 text-cyan-300",
      description: "Gathering raw historical records, logs, SQL tables, REST APIs, or IoT streams while ensuring temporal integrity and label correctness.",
      keyQuestions: ["Is there sampling bias?", "Are labels human-annotated or automatically recorded?", "Are historical records sufficient?"],
      deliverable: "Raw Data Lake / Raw CSV / SQL Data Dump with Metadata Schema"
    },
    {
      id: 2,
      name: "3. Exploratory Data Analysis & Cleaning",
      icon: "🧹",
      tag: "Data Quality & Hygiene",
      color: "from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-300",
      description: "Inspecting distributions, handling missing values (imputation), clipping extreme outliers, and identifying target leakage before touching any model.",
      keyQuestions: ["Why are values missing (MCAR, MAR, MNAR)?", "Are there corrupted timestamps or duplicate keys?", "What is the correlation with y?"],
      deliverable: "Cleaned Dataset + Comprehensive EDA Distribution & Correlation Matrix"
    },
    {
      id: 3,
      name: "4. Feature Engineering & Scaling",
      icon: "⚙️",
      tag: "Mathematical Transformation",
      color: "from-emerald-500/20 to-green-500/20 border-emerald-500/40 text-emerald-300",
      description: "Transforming raw columns into informative numerical representations: One-Hot Encoding, StandardScaler, TF-IDF, log-transforms, and polynomial interactions.",
      keyQuestions: ["Does feature scaling prevent gradient explosion?", "Are scalers fit ONLY on training data?", "Can we extract domain features?"],
      deliverable: "Engineered Design Matrix X_train, X_val, X_test + Serialized Scaler Pipelines"
    },
    {
      id: 4,
      name: "5. Model Training & Selection",
      icon: "🧠",
      tag: "Hypothesis Optimization",
      color: "from-purple-500/20 to-indigo-500/20 border-purple-500/40 text-purple-300",
      description: "Fitting multiple candidate model architectures (Linear Models, Decision Trees, Ensembles, Deep Neural Nets) and minimizing empirical risk via optimization.",
      keyQuestions: ["Which inductive bias fits the dataset shape?", "What loss function aligns with business risk?", "Is learning converging smoothly?"],
      deliverable: "Trained Model Weights w* and Hyperparameter Grid Search Logs"
    },
    {
      id: 5,
      name: "6. Rigorous Validation & Testing",
      icon: "⚖️",
      tag: "Generalization Audit",
      color: "from-rose-500/20 to-pink-500/20 border-rose-500/40 text-rose-300",
      description: "Auditing model performance on completely untouched held-out test splits and k-fold cross-validation to diagnose Underfitting vs Overfitting.",
      keyQuestions: ["Is there a large gap between Train and Test loss?", "Does the model perform fairly across sub-demographics?", "Is it robust to noise?"],
      deliverable: "Confusion Matrix, ROC Curves, Residual Plots, and Final Model Sign-Off Report"
    },
    {
      id: 6,
      name: "7. Deployment, MLOps & Monitoring",
      icon: "🚀",
      tag: "Production Serving & Drift Defense",
      color: "from-sky-500/20 to-blue-600/20 border-sky-500/40 text-sky-300",
      description: "Packaging the model into REST APIs / Docker containers, serving low-latency inferences, tracking data drift, and triggering automated re-training.",
      keyQuestions: ["Is latency under SLA?", "Has consumer behavior shifted (Concept Drift)?", "Are edge cases logged for triage?"],
      deliverable: "Live Microservice Endpoint + Prometheus Drift Alarms + Automated CI/CD Pipeline"
    }
  ];

  // Comprehensive Jargon Glossary
  const jargonTerms = [
    {
      id: "crisp-dm",
      term: "CRISP-DM (Cross-Industry Standard Process)",
      category: "lifecycle",
      badge: "Lifecycle Standard",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      pronunciation: "krɪsp diː-ɛm",
      plainEnglish: "A battle-tested 6-phase blueprint for planning, executing, and delivering data science and machine learning projects from business idea to deployed software.",
      everydayAnalogy: "Like the standard architectural blueprint used to design, lay foundation, erect pillars, wire electricity, and inspect a building before residents move in.",
      whyItMatters: "Prevents data teams from blindly coding algorithms without clear business objectives or validation protocols."
    },
    {
      id: "data-leakage",
      term: "Data Leakage (Information Contamination)",
      category: "engineering",
      badge: "Critical Pitfall",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "ˈdeɪ.tə ˈliː.kɪdʒ",
      plainEnglish: "When information from the future or from the test set accidentally leaks into the training phase, giving the model artificially high exam scores that collapse in the real world.",
      everydayAnalogy: "A teacher accidentally giving students a copy of the final exam questions inside the practice homework booklet. The students score 100% on practice, but fail on new unseen questions.",
      whyItMatters: "The #1 reason why ML models look brilliant in Jupyter notebooks but fail disastrously upon production deployment."
    },
    {
      id: "data-imputation",
      term: "Data Imputation (Handling Missing Values)",
      category: "engineering",
      badge: "Data Hygiene",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      pronunciation: "ˈdeɪ.tə ˌɪm.pjʊˈteɪ.ʃən",
      plainEnglish: "The mathematical process of replacing missing, blank, or NaN (Not-a-Number) data points with plausible substitute values (such as column median, mean, or KNN estimation).",
      everydayAnalogy: "If one student forgot to fill in their height on a sports form, estimating their height based on the average height of their same-age classmates rather than throwing away their entire enrollment form.",
      whyItMatters: "Most ML algorithms (like Logistic Regression, Neural Networks, and SVMs) crash with error codes if given missing NaN values."
    },
    {
      id: "feature-engineering",
      term: "Feature Engineering & Extraction",
      category: "engineering",
      badge: "Model Fuel",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "ˈfiː.tʃər ˌɛn.dʒɪˈnɪə.rɪŋ",
      plainEnglish: "The craft of transforming messy raw columns into clean, highly informative numerical clues that make it easy for an algorithm to find underlying patterns.",
      everydayAnalogy: "Taking raw milk and churning it into clarified butter (Ghee)—converting raw ingredients into a concentrated, high-potency form.",
      whyItMatters: "Good features often matter far more than choosing a fancy, complex algorithm. Simple models with great features beat deep models with garbage features."
    },
    {
      id: "concept-drift",
      term: "Concept Drift & Covariate Shift",
      category: "deployment",
      badge: "MLOps",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "ˈkɒn.sɛpt drɪft",
      plainEnglish: "When real-world conditions, consumer habits, or environmental variables change over time, making an old model's learned patterns inaccurate.",
      everydayAnalogy: "A fashion recommender trained in 2018 trying to predict 2026 trending clothing styles. What people liked back then has drifted completely.",
      whyItMatters: "Proves that ML models cannot be deployed and forgotten; they must be monitored and periodically retrained."
    },
    {
      id: "train-test-split",
      term: "Train-Validation-Test Split",
      category: "validation",
      badge: "Validation Core",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "treɪn tɛst splɪt",
      plainEnglish: "Dividing your total dataset into distinct subsets: Training set (for learning), Validation set (for tuning knobs/hyperparameters), and Test set (for the final unseen exam).",
      everydayAnalogy: "Study textbook chapters (Train), attempt mock practice quizzes to adjust study strategy (Validation), and take the final unseen university board exam (Test).",
      whyItMatters: "Guarantees that your evaluation measures genuine generalization to new situations, not mere memorization."
    }
  ];

  // Diagnostic Quiz Data
  const quizQuestions = [
    {
      question: "Which of the following describes the fatal mistake known as 'Data Leakage'?",
      options: [
        "A database hacker stealing sensitive customer email addresses from the server.",
        "Fitting a StandardScaler on both the training and test sets combined before splitting.",
        "Using 80% of the dataset for training and 20% for testing.",
        "Imputing missing numerical values using the median of the training set only."
      ],
      correctIndex: 1,
      explanation: "Fitting scalers, encoders, or imputation statistics on the entire dataset (combining train + test) allows the model to peek into test set statistics during training. Scalers must ALWAYS be fit strictly on X_train only and then used to transform X_test."
    },
    {
      question: "In what phase of the ML lifecycle should you inspect distributions, missing values, and potential label errors?",
      options: [
        "Model Deployment and MLOps",
        "Hyperparameter Optimization",
        "Exploratory Data Analysis (EDA) & Data Cleaning",
        "Final Production Latency Benchmarking"
      ],
      correctIndex: 2,
      explanation: "Exploratory Data Analysis (EDA) and Data Cleaning occurs immediately after data ingestion. It ensures data quality and hygiene before any mathematical modeling begins."
    },
    {
      question: "Why can't an ML model simply be trained once, deployed to production, and left unattended forever?",
      options: [
        "Computers automatically erase machine learning weights after 30 days.",
        "Real-world data and user behavior change over time (Concept & Data Drift), causing accuracy to degrade.",
        "Gradient descent requires continuous internet connection to keep weights stabilized.",
        "Linear regression models become too large to store on hard drives over time."
      ],
      correctIndex: 1,
      explanation: "Due to Concept Drift and Covariate Shift (changing market trends, economic shifts, seasonal cycles), production models slowly degrade and require ongoing MLOps monitoring and retraining."
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

  // Derived interactive model simulation calculations
  const effectiveDataQuality = (dataCleanLevel / 100) * (featureScaleEnabled ? 1.0 : 0.75);
  const rawTrainLoss = 1.8 * Math.exp(-modelComplexity * 0.6) * (1.1 - effectiveDataQuality * 0.4);
  const rawTestLoss = (0.2 + (modelComplexity === 5 ? 0.9 : modelComplexity === 1 ? 0.7 : 0.05)) * (1.4 - effectiveDataQuality * 0.5);

  const trainLoss = Math.max(0.02, rawTrainLoss).toFixed(3);
  const testLoss = Math.max(0.04, rawTestLoss).toFixed(3);
  const healthStatus =
    modelComplexity === 1
      ? "Underfitting (High Bias) — Model is too simplistic to capture real patterns."
      : modelComplexity === 5
      ? "Overfitting (High Variance) — Model memorized training noise; fails on test data."
      : "Optimal Generalization (Balanced Bias & Variance) — High real-world accuracy.";

  return (
    <div className="space-y-10 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16 px-4 sm:px-6">
      {/* HEADER BANNER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-3xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Introduction to Machine Learning • Topic 10
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Full Lifecycle Engineering
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              CRISP-DM &amp; MLOps
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            The Complete Machine Learning Workflow
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            From business problem formulation and raw data ingestion to feature engineering, empirical loss optimization, rigorous validation splits, and continuous production monitoring.
          </p>

          {/* Quick Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-3">
            {[
              { id: "noviceMasterclass", label: "🎓 Master Teacher's Classroom", icon: "👨‍🏫" },
              { id: "interactiveStudio", label: "⚡ Lifecycle Pipeline Studio", icon: "🔬" },
              { id: "theory", label: "📐 Formal Engineering Lifecycle", icon: "⚙️" },
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
                Mastering the Machine Learning Workflow: Step-by-Step
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/90 px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 font-mono">
            <span>⏱️ 15 min deep conceptual dive</span>
          </div>
        </div>

        {/* Teacher's Welcome Dialogue */}
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/60 p-6 rounded-2xl border border-indigo-800/40 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <span>👋 Welcome, my student! Let us demystify how real Machine Learning works.</span>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Beginners often make a big mistake: they believe Machine Learning is 95% about writing complex mathematical algorithms like Neural Networks or Random Forests. In actual industrial practice, building a successful ML system is like running a professional five-star restaurant kitchen. If the raw ingredients are rotten (bad data), no amount of Michelin-star chef cooking (fancy algorithms) will make the dish edible!
          </p>
          <p className="text-sm text-indigo-200 font-medium">
            Let us walk together through every single stage of the Machine Learning lifecycle—from framing the question to keeping the deployed model healthy in production.
          </p>
        </div>

        {/* Sub-Lesson Tabs */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
            {[
              { id: "pipeline", label: "1. The 7-Stage Kitchen Analogy", icon: "🍳" },
              { id: "leakage", label: "2. The Danger of Data Leakage", icon: "⚠️" },
              { id: "drift", label: "3. Concept Drift & Production Life", icon: "🔄" },
              { id: "jargon", label: "4. Jargon Buster Glossary", icon: "📖" }
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

          {/* Sub-Lesson Content 1: The 7-Stage Kitchen Analogy */}
          {selectedLessonTab === "pipeline" && (
            <div className="space-y-6 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🍳</span> The 5-Star Restaurant Analogy: Building an ML Solution
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Think of the 7 stages of Machine Learning as operating an elite dining restaurant in Kolkata:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-blue-400 uppercase">Stage 1: Menu Planning (Problem Formulation)</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Before buying groceries, you decide what cuisine you are serving. In ML: Decide if you are predicting a number (Price regression) or category (Spam/Not Spam classification).
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Stage 2: Wholesale Market Sourcing (Data Ingestion)</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Purchasing fresh fish and vegetables from wholesale vendors. In ML: Querying relational SQL databases, IoT sensors, and historical logs.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase">Stage 3: Washing & Peeling (Data Cleaning & EDA)</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Discarding rotten potatoes and scrubbing mud off carrots. In ML: Removing duplicates, imputing missing values, and eliminating outliers.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Stage 4: Chopping & Marinating (Feature Engineering)</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Cutting spices into fine paste and marinating meat so heat penetrates easily. In ML: Standardizing scales, One-Hot Encoding text, and creating polynomial ratios.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-purple-400 uppercase">Stage 5: Master Cooking (Model Training)</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Applying flame and stirring constantly to blend flavors. In ML: Gradient Descent optimizing weights to minimize empirical error.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-rose-400 uppercase">Stage 6: Head Chef Tasting (Validation & Testing)</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Tasting a small untouched spoonful before sending it to customers. In ML: Testing the model on a strictly isolated test split to ensure it does not overfit.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2 md:col-span-2">
                    <span className="text-xs font-mono font-bold text-sky-400 uppercase">Stage 7: Table Serving & Quality Patrol (Deployment & MLOps)</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Serving guests at tables, collecting feedback, and replacing suppliers if quality drops next season. In ML: Packaging into microservices, monitoring live latency, and retraining on concept drift.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Lesson Content 2: The Danger of Data Leakage */}
          {selectedLessonTab === "leakage" && (
            <div className="space-y-4 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-rose-900/40 space-y-4">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                  <span>🚨</span> The Cardinal Sin of Machine Learning: Data Leakage
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Data leakage occurs whenever test information or future signals bleed into the training pipeline. It produces deceptive models that achieve 99.8% accuracy during development, but utterly fail when real users interact with them.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-rose-950/40 p-4 rounded-xl border border-rose-800/60 space-y-2">
                    <span className="text-xs font-bold text-rose-300 uppercase">❌ The Fatal Mistake (Preprocessing First)</span>
                    <p className="text-xs text-slate-300 leading-relaxed font-mono">
                      scaler = StandardScaler()<br />
                      X_scaled = scaler.fit_transform(X) # WRONG! Peeked at test set<br />
                      X_train, X_test = train_test_split(X_scaled)
                    </p>
                    <p className="text-xs text-rose-200/90">
                      The mean and standard deviation of the entire dataset contaminated the training phase.
                    </p>
                  </div>

                  <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/60 space-y-2">
                    <span className="text-xs font-bold text-emerald-300 uppercase">✔ The Golden Engineering Rule</span>
                    <p className="text-xs text-slate-300 leading-relaxed font-mono">
                      X_train, X_test = train_test_split(X)<br />
                      scaler = StandardScaler()<br />
                      X_train_scaled = scaler.fit_transform(X_train)<br />
                      X_test_scaled = scaler.transform(X_test) # Transform ONLY
                    </p>
                    <p className="text-xs text-emerald-200/90">
                      The test set remains a 100% pristine, unseen vault until evaluation time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Lesson Content 3: Concept Drift */}
          {selectedLessonTab === "drift" && (
            <div className="space-y-4 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🔄</span> Why Models Decay in Production: Drift &amp; Shift
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Unlike traditional software where code runs identically forever, Machine Learning models make predictions based on probability distributions. When the world changes, old distributions become obsolete.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-purple-400 uppercase">Covariate Shift (Input Drift)</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      The distribution of input features {"P(X)"} changes, while the relationship {"P(y|X)"} remains similar. For example: A flood in monsoon season suddenly triples daily rainfall measurements.
                    </p>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Concept Drift (Target Drift)</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      The underlying relationship between inputs and targets {"P(y|X)"} fundamentally shifts. For example: Due to inflation, a monthly salary that was considered wealthy 15 years ago is now middle-income.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Lesson Content 4: Jargon Buster */}
          {selectedLessonTab === "jargon" && (
            <div className="space-y-6 pt-2">
              {/* Category Filter Pills & Search */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "All Terms" },
                    { id: "lifecycle", label: "Lifecycle" },
                    { id: "engineering", label: "Data & Features" },
                    { id: "validation", label: "Validation" },
                    { id: "deployment", label: "MLOps" }
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
                    placeholder="Search workflow jargon..."
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

              {/* Glossary Grid */}
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

      {/* SECTION 1: INTERACTIVE WORKFLOW STUDIO */}
      <section
        id="interactiveStudio"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Machine Learning Lifecycle Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Simulate the impact of data cleaning, feature scaling, model complexity, and train/test splits in real-time
            </p>
          </div>
        </div>

        {/* 7 Pipeline Stage Stepper */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Explore 7 Lifecycle Stages (Click any stage below):
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {pipelineStages.map((stg) => (
              <button
                key={stg.id}
                onClick={() => setCurrentPipelineStage(stg.id)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1",
                  currentPipelineStage === stg.id
                    ? "bg-indigo-600/30 border-indigo-400 text-white shadow-lg shadow-indigo-600/30"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                )}
              >
                <div className="text-xl">{stg.icon}</div>
                <div className="text-xs font-bold leading-tight line-clamp-2">{stg.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Active Stage Deep-Dive Card */}
        {(() => {
          const active = pipelineStages[currentPipelineStage];
          return (
            <div className={clsx("p-6 rounded-2xl border bg-gradient-to-r space-y-4", active.color)}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>{active.icon}</span> {active.name}
                </h3>
                <span className="text-xs font-mono px-2.5 py-1 bg-slate-900/80 rounded-md border border-slate-700">
                  {active.tag}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{active.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-bold text-amber-400 uppercase">Core Engineering Questions</span>
                  <ul className="text-xs text-slate-300 list-disc list-inside mt-1 space-y-1">
                    {active.keyQuestions.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase">Tangible Deliverable</span>
                  <p className="text-xs text-slate-300 mt-1 font-mono">{active.deliverable}</p>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Pipeline Parameter Tuning & Loss Response */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-cyan-400">
            Live Hyperparameter &amp; Data Quality Simulator
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Control 1: Data Cleanliness */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Data Hygiene &amp; Cleaning:</span>
                <span className="text-emerald-400 font-bold">{dataCleanLevel}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={dataCleanLevel}
                onChange={(e) => setDataCleanLevel(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <span className="text-[11px] text-slate-500">Removes null values, noisy records, and extreme outliers</span>
            </div>

            {/* Control 2: Model Capacity / Complexity */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Model Complexity:</span>
                <span className="text-indigo-400 font-bold">
                  {modelComplexity === 1 ? "1 (Linear/Simple)" : modelComplexity === 3 ? "3 (Balanced Tree)" : "5 (Over-parameterized Deep Net)"}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="2"
                value={modelComplexity}
                onChange={(e) => setModelComplexity(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <span className="text-[11px] text-slate-500">Degree of polynomials / model parameter capacity</span>
            </div>

            {/* Control 3: Feature Scaling Toggle */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 block">Feature Standardization:</span>
              <button
                onClick={() => setFeatureScaleEnabled(!featureScaleEnabled)}
                className={clsx(
                  "w-full py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2",
                  featureScaleEnabled
                    ? "bg-emerald-950 text-emerald-300 border-emerald-700"
                    : "bg-rose-950 text-rose-300 border-rose-700"
                )}
              >
                <span>{featureScaleEnabled ? "✔ StandardScaler Enabled" : "❌ Unscaled Raw Features"}</span>
              </button>
              <span className="text-[11px] text-slate-500">Normalizes feature ranges to prevent gradient dominance</span>
            </div>
          </div>

          {/* Model Response Metric Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Training Loss (Empirical Risk)</span>
              <div className="text-2xl font-bold font-mono text-cyan-400">{trainLoss}</div>
              <span className="text-[10px] text-slate-500">Lower is better on training partition</span>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Held-Out Test Loss (Generalization)</span>
              <div className="text-2xl font-bold font-mono text-amber-400">{testLoss}</div>
              <span className="text-[10px] text-slate-500">True unseen real-world error score</span>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Pipeline Diagnostic State</span>
              <div className="text-xs font-bold font-mono text-emerald-300 leading-snug">{healthStatus}</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THEORY & MATHEMATICAL FORMULATION */}
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
              Theoretical Foundation &amp; Pipeline Mathematics
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Mathematical representation of feature matrices, loss minimization, and generalization bounds
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">1. Design Matrix Formulation</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Given an raw dataset of N records with d features, we construct the design matrix {"X ∈ ℝ^(N×d)"} and target vector {"y ∈ ℝ^N"}:
            </p>
            <div className="text-xs font-mono text-indigo-300 bg-slate-900 p-3 rounded-lg border border-slate-800 overflow-x-auto">
              {"X = [ x_1^T ; x_2^T ; ... ; x_N^T ] , where x_i ∈ ℝ^d"}
            </div>
            <p className="text-xs text-slate-400">
              Feature transformation functions {"ϕ: ℝ^d → ℝ^k"} project raw inputs into rich linear or non-linear spaces.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">2. Empirical Risk Minimization (ERM)</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The model hypothesis {"h(x; w)"} parameterized by weights w is optimized by minimizing empirical risk combined with a regularization penalty:
            </p>
            <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-3 rounded-lg border border-slate-800 overflow-x-auto">
              {"w* = argmin_w [ (1/N) ∑_{i=1}^N L(h(x_i; w), y_i) + λ Ω(w) ]"}
            </div>
            <p className="text-xs text-slate-400">
              Where {"L(·)"} is task-specific loss (e.g., MSE or Cross-Entropy) and {"Ω(w)"} controls hypothesis complexity.
            </p>
          </div>
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
              Applied end-to-end ML workflows engineered across West Bengal technology hubs
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Barrackpore Academic Lab</span>
            <h3 className="text-base font-bold text-white">End-to-End Student Dropout Prediction</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mamata and Mahima implemented a 7-stage workflow analyzing weekly LMS login patterns, assignment submission latency, and quiz grades. By isolating test splits and applying SMOTE class balancing during feature engineering, they achieved an 89% early warning detection rate 4 weeks before semester finals.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Kolkata Salt Lake Sector V</span>
            <h3 className="text-base font-bold text-white">High-Throughput UPI Payment Fraud Engine</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Debangshu deployed a real-time ML inference service handling 2,500 transactions/sec. The workflow featured automated feature scaling pipelines, continuous drift monitoring using Prometheus, and automated model rollback if false positive rate spiked above 0.5%.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Ichapur Retail Center</span>
            <h3 className="text-base font-bold text-white">Supermarket Demand Forecasting &amp; Perishables</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Susmita developed a time-series regression workflow predicting daily vegetable and dairy demand across 12 neighborhood outlets. Careful rolling-window cross-validation eliminated temporal data leakage, cutting perishable food waste by 31%.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Jadavpur Medical Diagnostic Lab</span>
            <h3 className="text-base font-bold text-white">Chest X-Ray Pneumonia Triage Pipeline</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Abhronila engineered a Computer Vision diagnostic pipeline with strict DICOM metadata de-identification, histogram equalization preprocessing, and multi-radiologist validation consensus to assist clinical triage.
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
              Test your understanding of the machine learning workflow, data hygiene, and lifecycle best practices
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
            <span>Question {selectedQuizIndex + 1} of {quizQuestions.length}</span>
            <span className="text-indigo-400 font-bold">Workflow Concept Check</span>
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
              Common Engineering Pitfalls &amp; Industry Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Crucial rules for avoiding catastrophic pipeline failure
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> 4 Critical Pipeline Pitfalls
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-rose-300">Premature Optimization:</strong> Jumping directly to complex deep neural networks before testing simple Logistic/Ridge baselines.</li>
              <li><strong className="text-rose-300">Feature Contamination:</strong> Fitting scalers, encoders, or imputers across train and test partitions simultaneously.</li>
              <li><strong className="text-rose-300">Ignoring Class Imbalance:</strong> Relying on simple Accuracy for 99:1 imbalanced datasets (e.g. Fraud detection).</li>
              <li><strong className="text-rose-300">Zero Drift Strategy:</strong> Deploying an ML API without telemetry alarms for detecting live covariate shifts.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> 4 Golden Workflow Rules
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-emerald-300">Isolate Test Set First:</strong> Split your raw dataset into Train/Val/Test before doing ANY transformations.</li>
              <li><strong className="text-emerald-300">Encapsulate in Pipelines:</strong> Use <code className="text-cyan-300 bg-slate-900 px-1 rounded">sklearn.pipeline.Pipeline</code> to lock transforms and estimators together.</li>
              <li><strong className="text-emerald-300">Establish Strong Baselines:</strong> Always build a heuristic or dummy classifier to benchmark true ML value.</li>
              <li><strong className="text-emerald-300">Log Model Artifacts:</strong> Track all experiments with tools like MLflow or Weights &amp; Biases for reproducibility.</li>
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
              Interactive standalone lab script for end-to-end workflow execution
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="machine_learning_workflow_lab.py"
          highlightLines={[25, 26, 35, 45]}
        />
      </section>

      {/* FAQ TEMPLATE */}
      <section className="space-y-4">
        <FAQTemplate
          title="Machine Learning Workflow — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* PRINTABLE NOTE */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Machine Learning Workflow"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 10 Note"
          downloadFileName="topic10_note.txt"
        />
      </section>

      {/* TEACHER NOTE */}
      <section>
        <Teacher
          note="Mastering the end-to-end Machine Learning workflow is what separates a true AI engineer from a novice. Always remember the Golden Rule of Data Science: Garbage In, Garbage Out. Protect your test partitions like gold, never leak future statistics, and build robust preprocessing pipelines!"
        />
      </section>
    </div>
  );
};

export default Topic10;
