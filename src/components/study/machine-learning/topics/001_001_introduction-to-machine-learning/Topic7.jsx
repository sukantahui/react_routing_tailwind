import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic7_files/classification_and_regression_overview_lab.py?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions.js";

const Topic7 = () => {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");

  // Novice Classroom State
  const [selectedLessonTab, setSelectedLessonTab] = useState("intuition");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Dual-Mode Interactive Simulator State
  const [interactiveMode, setInteractiveMode] = useState("classification");
  const [thresholdInput, setThresholdInput] = useState(0.50);
  const [regAreaInput, setRegAreaInput] = useState(1200);

  const svgId = useId();

  // Smooth scroll handler
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Sample Classification Loan Applicants in Kolkata
  const loanApplicants = [
    { name: "Mamata (Barrackpore)", rawScore: 0.88, actual: 1 },
    { name: "Mahima (Kolkata)", rawScore: 0.74, actual: 1 },
    { name: "Debangshu (Salt Lake)", rawScore: 0.42, actual: 0 },
    { name: "Susmita (Ichapur)", rawScore: 0.62, actual: 1 },
    { name: "Abhronila (Jadavpur)", rawScore: 0.28, actual: 0 }
  ];

  // Evaluate confusion matrix live based on thresholdInput
  const evalClassification = useMemo(() => {
    let tp = 0, fp = 0, tn = 0, fn = 0;
    const evaluated = loanApplicants.map((app) => {
      const pred = app.rawScore >= thresholdInput ? 1 : 0;
      if (pred === 1 && app.actual === 1) tp++;
      else if (pred === 1 && app.actual === 0) fp++;
      else if (pred === 0 && app.actual === 0) tn++;
      else if (pred === 0 && app.actual === 1) fn++;
      return { ...app, pred, isCorrect: pred === app.actual };
    });
    const precision = tp + fp > 0 ? +((tp / (tp + fp)) * 100).toFixed(1) : 100.0;
    const recall = tp + fn > 0 ? +((tp / (tp + fn)) * 100).toFixed(1) : 0.0;
    const f1 = precision + recall > 0 ? +((2 * (precision * recall) / (precision + recall))).toFixed(1) : 0.0;
    return { evaluated, tp, fp, tn, fn, precision, recall, f1 };
  }, [thresholdInput]);

  // Regression calculation: Price = 0.045 * Area + 15 Lakhs
  const predictedFlatPrice = +(0.045 * regAreaInput + 15.0).toFixed(2);

  // Comprehensive Jargon Glossary Data
  const jargonTerms = [
    {
      id: "continuous-vs-discrete",
      term: "Continuous vs Discrete Target (y)",
      category: "core",
      badge: "Target Taxonomy",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      pronunciation: "kənˈtɪn.ju.əs vs dɪˈskriːt",
      plainEnglish: "Continuous targets are measurable smooth numbers with decimals (e.g. ₹64.5 Lakhs, 38.2°C). Discrete targets are separate categories or counts (e.g. Grade A/B/C, 0 or 1).",
      everydayAnalogy: "Measuring water volume with a measuring cylinder is Continuous. Counting the number of water bottles is Discrete.",
      whyItMatters: "The fundamental criteria deciding whether you must use Regression or Classification."
    },
    {
      id: "rmse-mae",
      term: "RMSE vs MAE",
      category: "regression",
      badge: "Regression Metrics",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "R-M-S-E vs M-A-E",
      plainEnglish: "MAE is the simple average error in real units. RMSE squares the errors first, penalizing large outlier blunders much more severely.",
      everydayAnalogy: "If a delivery driver is 5 minutes late 4 times, MAE is 5 min. But if they are 1 hour late once, RMSE shoots up drastically.",
      whyItMatters: "RMSE is used when big prediction errors are dangerous (e.g. medical dosage, flight fuel estimation)."
    },
    {
      id: "r2-score",
      term: "R² Score (Coefficient of Determination)",
      category: "regression",
      badge: "Goodness of Fit",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-800",
      pronunciation: "ɑːr skweəd skɔːr",
      plainEnglish: "A score from 0.0 to 1.0 (or 0% to 100%) indicating how much of the target's variance is explained by your feature inputs.",
      everydayAnalogy: "An R² of 0.85 means 85% of flat price variations in Kolkata are explained by area and location, while 15% is random noise.",
      whyItMatters: "The standard universal benchmark for evaluating any regression model."
    },
    {
      id: "precision-recall",
      term: "Precision vs Recall (Sensitivity)",
      category: "classification",
      badge: "The Great Tradeoff",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      pronunciation: "prɪˈsɪʒ.ən vs rɪˈkɔːl",
      plainEnglish: "Precision measures: 'Of all alarms we sounded, how many were real fires?' Recall measures: 'Of all actual fires that occurred, how many did we catch?'",
      everydayAnalogy: "A doctor who flags every slight cough as pneumonia has 100% Recall (catches every case) but terrible Precision (90% false alarms).",
      whyItMatters: "You cannot maximize both simultaneously; you must tune the decision threshold depending on whether false alarms or missed cases are worse."
    },
    {
      id: "f1-score",
      term: "F1-Score",
      category: "classification",
      badge: "Harmonic Balance",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "ɛf wʌn skɔːr",
      plainEnglish: "The harmonic mean balancing Precision and Recall into a single fair number (F1 = 2 × (P × R) / (P + R)).",
      everydayAnalogy: "Like a decathlon athlete: you only get a high overall score if you are good at both sprinting (Precision) and endurance (Recall).",
      whyItMatters: "The gold standard metric for imbalanced datasets (e.g. credit card fraud, disease screening)."
    },
    {
      id: "roc-auc",
      term: "ROC Curve & AUC Score",
      category: "classification",
      badge: "Threshold Invariant",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "R-O-C  A-U-C",
      plainEnglish: "A curve plotting True Positive Rate vs False Positive Rate across all possible thresholds. AUC is the area under that curve (1.0 = perfect model, 0.5 = random coin toss).",
      everydayAnalogy: "Testing how well a student ranks answers correctly, regardless of how strictly or leniently the teacher sets the pass mark.",
      whyItMatters: "Measures the pure discriminative power of a classifier independent of any specific threshold."
    },
    {
      id: "multiclass-vs-multilabel",
      term: "Multiclass vs Multilabel Classification",
      category: "classification",
      badge: "Classification Types",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "ˈmʌl.ti.klɑːs vs ˈmʌl.tiˌleɪ.bəl",
      plainEnglish: "Multiclass means exactly ONE choice out of many (e.g. Is this image a Cat OR Dog OR Bird?). Multilabel means MULTIPLE tags can apply simultaneously (e.g. A movie is Action AND Comedy).",
      everydayAnalogy: "A multiple-choice exam with radio buttons (Multiclass) vs a grocery checklist with checkboxes (Multilabel).",
      whyItMatters: "Multiclass uses Softmax; Multilabel uses independent Sigmoids for each class."
    },
    {
      id: "confusion-matrix",
      term: "Confusion Matrix",
      category: "classification",
      badge: "Diagnosis Grid",
      badgeColor: "bg-slate-900 text-slate-300 border-slate-700",
      pronunciation: "kənˈfjuː.ʒən ˈmeɪ.trɪks",
      plainEnglish: "A 2x2 grid breaking down model predictions into True Positives (TP), False Positives (FP), True Negatives (TN), and False Negatives (FN).",
      everydayAnalogy: "The doctor's official scorecard: Correct Diagnoses vs False Alarms vs Missed Illnesses.",
      whyItMatters: "Reveals exactly where and how your classifier is making its mistakes."
    }
  ];

  // Filtered Jargon List
  const filteredJargon = useMemo(() => {
    return jargonTerms.filter((item) => {
      const matchesCat = selectedJargonCategory === "all" || item.category === selectedJargonCategory;
      const matchesSearch =
        item.term.toLowerCase().includes(jargonSearchQuery.toLowerCase()) ||
        item.plainEnglish.toLowerCase().includes(jargonSearchQuery.toLowerCase()) ||
        item.everydayAnalogy.toLowerCase().includes(jargonSearchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedJargonCategory, jargonSearchQuery]);

  // Novice Classroom Lessons
  const classroomLessons = {
    intuition: {
      id: "intuition",
      title: "1. The Big Picture: Measuring vs Sorting",
      tagline: "Buying Mangoes at Barrackpore Market",
      icon: "🥭",
      intro: "Imagine you are at the bustling fruit market in Barrackpore. You pick up a sweet Himsagar mango. There are two distinct questions you can ask about it:",
      steps: [
        {
          num: "Question 1 (Regression)",
          title: "How much does this mango weigh?",
          desc: "You place it on a digital scale: 342.5 grams. The answer is a continuous, smooth numerical measurement along a scale."
        },
        {
          num: "Question 2 (Classification)",
          title: "Is this mango ripe, unripe, or rotten?",
          desc: "You smell it and look at its skin color to place it in one of three discrete buckets: [Ripe, Unripe, Rotten]."
        },
        {
          num: "The Core Rule",
          title: "Continuous vs Categorical",
          desc: "If the output is a continuous number that can be measured on a ruler/tape, it is Regression. If the output is a discrete category/bucket, it is Classification."
        },
        {
          num: "The Math Split",
          title: "Different Loss Functions",
          desc: "Regression uses distance loss (Mean Squared Error). Classification uses probability loss (Cross-Entropy)."
        }
      ],
      coreTakeaway: "Regression measures quantities along an unbroken line; Classification draws decision walls between distinct categories."
    },
    regressionDeepDive: {
      id: "regressionDeepDive",
      title: "2. Deep Dive: Regression & Its Scorecards",
      tagline: "MSE, RMSE, MAE, and R² Score",
      icon: "📈",
      intro: "In regression, our goal is to draw a smooth line or curve through data points such that predicted numbers (ŷ) are as close as possible to real numbers (y).",
      cards: [
        {
          title: "Mean Absolute Error (MAE)",
          desc: "The direct average difference in actual units (e.g. 'On average, our apartment valuation misses the true price by ₹2.5 Lakhs').",
          formula: "MAE = (1/N) ∑ |ŷ - y|"
        },
        {
          title: "Root Mean Squared Error (RMSE)",
          desc: "Squares differences before averaging, which heavily penalizes catastrophic outlier misses.",
          formula: "RMSE = √( (1/N) ∑ (ŷ - y)² )"
        },
        {
          title: "R² Score (Goodness of Fit)",
          desc: "Scores between 0.0 (useless model) and 1.0 (perfect fit), measuring what fraction of target variance was captured.",
          formula: "R² = 1 - (SS_res / SS_tot)"
        }
      ],
      coreTakeaway: "Always report both MAE (for business stakeholders) and RMSE (to detect extreme error outliers)."
    },
    classificationDeepDive: {
      id: "classificationDeepDive",
      title: "3. Deep Dive: Classification & Confusion Matrix",
      tagline: "The Fire Alarm and Doctor Diagnoses",
      icon: "🎯",
      intro: "Classification models output probabilities between 0.0 and 1.0. We use a decision threshold (default = 0.50) to make the final discrete call.",
      cards: [
        {
          title: "True Positive (TP) & True Negative (TN)",
          desc: "The successes! Model said Fire and there was Fire (TP); Model said Safe and it was Safe (TN)."
        },
        {
          title: "False Positive (FP - False Alarm / Type I Error)",
          desc: "Model rang the fire alarm, but someone was just burning toast. Harmless in hospitals, annoying in spam filters."
        },
        {
          title: "False Negative (FN - Missed Detection / Type II Error)",
          desc: "Model said Safe, but the house caught fire! In medical diagnosis, this is catastrophic (sending a sick patient home)."
        }
      ],
      coreTakeaway: "Accuracy is misleading on imbalanced data. In medical screening, prioritize Recall; in spam filtering, prioritize Precision."
    }
  };

  // Diagnostic Quiz Questions
  const quizQuestions = [
    {
      id: 0,
      title: "Diagnostic 1: Student Semester Percentage vs Pass/Fail",
      scenario: "A university in Kolkata wants two AI models: Model A predicts the exact final exam percentage (e.g. 78.4%), while Model B predicts whether the student receives a Distinction, First Class, or Pass certificate. How should you classify these two models?",
      options: [
        { id: "correct", label: "Model A is Regression; Model B is Multiclass Classification", isCorrect: true, explanation: "Correct! Model A predicts a continuous real number (percentage), which is Regression. Model B assigns students to 3 discrete category buckets, which is Multiclass Classification." },
        { id: "wrong1", label: "Both models are Regression tasks", isCorrect: false, explanation: "Incorrect. Certificate tier (Distinction/First Class/Pass) is a discrete categorical label, not a continuous variable." },
        { id: "wrong2", label: "Both models are Unsupervised Clustering", isCorrect: false, explanation: "Incorrect. Historical exam percentage and award tiers are supervised ground-truth labels." }
      ]
    },
    {
      id: 1,
      title: "Diagnostic 2: Rare Disease Screening Metric Selection",
      scenario: "Abhronila is deploying an AI system in a Jadavpur hospital to detect a deadly, fast-spreading viral infection from blood samples. Missing an infected patient (False Negative) could lead to an epidemic outbreak. Which metric should she maximize?",
      options: [
        { id: "recall", label: "Recall (Sensitivity) — To ensure zero infected patients are missed", isCorrect: true, explanation: "Spot on! In life-threatening medical screening, Recall is paramount. You want Recall ≥ 99% so that virtually every true positive case is caught, even if it causes a few harmless false alarms (lower Precision)." },
        { id: "rawAcc", label: "Raw Classification Accuracy", isCorrect: false, explanation: "Incorrect. If only 0.1% of patients have the infection, a dummy model that predicts 'Healthy' for everyone gets 99.9% accuracy while letting all infected patients slip through." },
        { id: "r2", label: "R² Score", isCorrect: false, explanation: "Incorrect. R² Score is an evaluation metric for continuous Regression, not disease Classification." }
      ]
    }
  ];

  const currentQuiz = quizQuestions[selectedQuizIndex];
  const activeClassroomLesson = classroomLessons[selectedLessonTab];

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
              BCAC701B • Module 1 • Topic 7
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Foundational ML
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full">
              Classification &amp; Regression
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
              Beginner-to-Master Edition
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Classification &amp; Regression: The Complete Overview
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Understand the two foundational pillars of predictive modeling. Master the mathematical and practical differences between predicting continuous numbers (<span className="text-cyan-400 font-semibold">Regression</span>) and categorical class boundaries (<span className="text-indigo-400 font-semibold">Classification</span>), complete with interactive metric simulators and a novice jargon buster.
          </p>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "noviceMasterclass", label: "🎓 Novice Classroom & Jargon Buster" },
              { id: "interactiveStudio", label: "1. Interactive Dual-Mode Metric Studio" },
              { id: "theory", label: "2. Formal Mathematical Foundations" },
              { id: "caseStudies", label: "3. Regional Industrial Cases" },
              { id: "diagnosticQuiz", label: "4. Interactive Diagnostic Quiz" },
              { id: "bestPractices", label: "5. Pitfalls & Best Practices" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={clsx(
                  "px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer",
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400 scale-105"
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
      {/* DEDICATED SECTION: TEACHER SUKANTA'S NOVICE CLASSROOM & JARGON BUSTER */}
      {/* ========================================================================= */}
      <section id="noviceMasterclass" className="bg-slate-900/95 p-6 sm:p-8 rounded-2xl border border-indigo-500/40 shadow-2xl space-y-8 scroll-mt-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-cyan-500/30 border border-cyan-400">
              ⚖️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  The Master Teacher&apos;s Novice Classroom: Classification vs Regression
                </h2>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                  Zero Jargon Barrier
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Demystifying continuous prediction vs category sorting with plain English and clear analogies
              </p>
            </div>
          </div>
          <div className="text-xs text-cyan-300 bg-cyan-950/70 border border-cyan-800 px-3.5 py-1.5 rounded-xl font-mono">
            Teacher Sukanta Hui • Barrackpore
          </div>
        </div>

        {/* Warm Conversational Teacher Welcome */}
        <div className="bg-gradient-to-r from-slate-950 via-blue-950/40 to-slate-950 p-6 rounded-2xl border border-blue-900/60 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <span>💬</span>
            <span>Teacher Sukanta to a Curious Student:</span>
          </div>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            &quot;Whenever you start any machine learning project, the very first question you must answer is: <strong>What kind of answer does my client want?</strong> If they want to predict a price, a temperature, or a percentage, you are building a <strong>Regression engine</strong>. If they want to sort objects into buckets like Yes/No, Spam/Ham, or Disease A/B, you are building a <strong>Classification engine</strong>. Let us master both!&quot;
          </p>
        </div>

        {/* 3 Interactive Lesson Selector Tabs */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "intuition", title: "1. The Big Picture", icon: "🥭", subtitle: "Measuring vs Sorting" },
              { id: "regressionDeepDive", title: "2. Regression Deep Dive", icon: "📈", subtitle: "MSE, RMSE & R²" },
              { id: "classificationDeepDive", title: "3. Classification Deep Dive", icon: "🎯", subtitle: "Precision, Recall & F1" }
            ].map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setSelectedLessonTab(lesson.id)}
                className={clsx(
                  "p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-2.5",
                  selectedLessonTab === lesson.id
                    ? "bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/50 shadow-xl shadow-cyan-600/20 scale-102"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{lesson.icon}</span>
                  <span className={clsx(
                    "text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase",
                    selectedLessonTab === lesson.id ? "bg-cyan-600 text-white" : "bg-slate-900 text-slate-400"
                  )}>
                    Module {lesson.id === "intuition" ? "1" : lesson.id === "regressionDeepDive" ? "2" : "3"}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{lesson.title}</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">{lesson.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Lesson Content Card */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-blue-900/60 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{activeClassroomLesson.icon}</span>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">{activeClassroomLesson.title}</h3>
                <span className="text-xs text-cyan-300 font-medium">{activeClassroomLesson.tagline}</span>
              </div>
            </div>
            <span className="text-xs font-mono bg-slate-900 text-slate-400 px-3 py-1 rounded-lg border border-slate-800">
              Interactive Lesson Module
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            {activeClassroomLesson.intro}
          </p>

          {/* Module 1: Intuition Steps */}
          {selectedLessonTab === "intuition" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeClassroomLesson.steps.map((st, idx) => (
                <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">{st.num}</span>
                    <h4 className="text-xs sm:text-sm font-bold text-white mt-1">{st.title}</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed mt-2">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Module 2: Regression Cards */}
          {selectedLessonTab === "regressionDeepDive" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {activeClassroomLesson.cards.map((c, idx) => (
                <div key={idx} className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2.5">
                  <h4 className="text-sm sm:text-base font-bold text-white">{c.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{c.desc}</p>
                  <div className="text-[11px] font-mono text-cyan-300 bg-slate-950 p-2.5 rounded border border-slate-800">
                    {c.formula}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Module 3: Classification Cards */}
          {selectedLessonTab === "classificationDeepDive" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {activeClassroomLesson.cards.map((c, idx) => (
                <div key={idx} className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2.5">
                  <h4 className="text-sm sm:text-base font-bold text-white">{c.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Core Takeaway */}
          {activeClassroomLesson.coreTakeaway && (
            <div className="bg-cyan-950/30 p-3.5 rounded-xl border border-cyan-800/50 flex items-center gap-2.5 text-xs text-cyan-200">
              <span className="text-base">💡</span>
              <span><strong>Teacher&apos;s Golden Takeaway:</strong> {activeClassroomLesson.coreTakeaway}</span>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* SUB-SECTION: JARGON BUSTER & NOVICE GLOSSARY */}
        {/* ========================================================================= */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📚</span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Classification &amp; Regression Jargon Buster
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Every evaluation metric and mathematical concept translated into everyday plain English
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "all", label: "All Terms" },
                { id: "core", label: "Core Foundations" },
                { id: "regression", label: "Regression Metrics" },
                { id: "classification", label: "Classification Metrics" }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedJargonCategory(cat.id)}
                  className={clsx(
                    "px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer",
                    selectedJargonCategory === cat.id
                      ? "bg-cyan-600 text-white font-bold"
                      : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={jargonSearchQuery}
              onChange={(e) => setJargonSearchQuery(e.target.value)}
              placeholder="🔍 Search any technical term (e.g. 'Precision', 'Recall', 'RMSE', 'F1-Score', 'R2')..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
            {jargonSearchQuery && (
              <button
                onClick={() => setJargonSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕ Clear
              </button>
            )}
          </div>

          {/* Term Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJargon.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 hover:border-cyan-500/60 transition-all duration-300 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-white font-mono">{item.term}</h4>
                    <span className={clsx("text-[9px] font-mono font-bold px-2 py-0.5 rounded border shrink-0", item.badgeColor)}>
                      {item.badge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wide">
                      In Plain English:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.plainEnglish}
                    </p>
                  </div>

                  <div className="space-y-1 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1">
                      <span>💡</span> Everyday Analogy:
                    </span>
                    <p className="text-[11px] text-slate-400 italic leading-relaxed">
                      &quot;{item.everydayAnalogy}&quot;
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                  <span className="text-cyan-300 font-semibold">Why it matters: </span>
                  {item.whyItMatters}
                </div>
              </div>
            ))}
          </div>

          {filteredJargon.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs">
              No matching technical terms found for &quot;{jargonSearchQuery}&quot;. Try searching for &quot;Precision&quot;, &quot;Recall&quot;, or &quot;RMSE&quot;.
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: INTERACTIVE DUAL-MODE METRIC STUDIO */}
      {/* ========================================================================= */}
      <section id="interactiveStudio" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Dual-Mode Metric Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Toggle between Classification Threshold Tuning and Continuous Flat Price Regression
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
          {/* Mode Switcher */}
          <div className="flex gap-2">
            <button
              onClick={() => setInteractiveMode("classification")}
              className={clsx(
                "px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer",
                interactiveMode === "classification"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
              )}
            >
              Mode A: Classification Threshold &amp; Confusion Matrix
            </button>
            <button
              onClick={() => setInteractiveMode("regression")}
              className={clsx(
                "px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer",
                interactiveMode === "regression"
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 border border-cyan-400"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
              )}
            >
              Mode B: Continuous Flat Price Regression
            </button>
          </div>

          {/* Classification Mode View */}
          {interactiveMode === "classification" && (
            <div className="space-y-6">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-indigo-300 font-bold">Decision Probability Threshold (θ):</span>
                  <span className="text-cyan-400 font-bold text-sm">{(thresholdInput * 100).toFixed(0)}% (θ = {thresholdInput})</span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="0.90"
                  step="0.05"
                  value={thresholdInput}
                  onChange={(e) => setThresholdInput(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <p className="text-[11px] text-slate-400">
                  Slide left (e.g. 20%) to maximize Recall (catch every default); slide right (e.g. 80%) to maximize Precision (fewer false rejections).
                </p>
              </div>

              {/* Metric Scorecards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1 text-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Precision</span>
                  <div className="text-2xl font-mono font-bold text-cyan-400">{evalClassification.precision}%</div>
                  <span className="text-[10px] text-slate-500">TP / (TP + FP)</span>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1 text-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Recall (Sensitivity)</span>
                  <div className="text-2xl font-mono font-bold text-emerald-400">{evalClassification.recall}%</div>
                  <span className="text-[10px] text-slate-500">TP / (TP + FN)</span>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1 text-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">F1-Score (Harmonic Mean)</span>
                  <div className="text-2xl font-mono font-bold text-purple-400">{evalClassification.f1}%</div>
                  <span className="text-[10px] text-slate-500">2 × (P × R) / (P + R)</span>
                </div>
              </div>

              {/* Confusion Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-[11px] bg-slate-900/60">
                      <th className="p-3">Applicant Name</th>
                      <th className="p-3">Model Risk Score</th>
                      <th className="p-3">Decision (θ = {thresholdInput})</th>
                      <th className="p-3">Actual Status</th>
                      <th className="p-3">Diagnosis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {evalClassification.evaluated.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40">
                        <td className="p-3 font-sans font-medium text-white">{row.name}</td>
                        <td className="p-3">{(row.rawScore * 100).toFixed(0)}%</td>
                        <td className="p-3 font-bold" style={{ color: row.pred === 1 ? "#f43f5e" : "#34d399" }}>
                          {row.pred === 1 ? "Flagged Default (1)" : "Approved (0)"}
                        </td>
                        <td className="p-3">{row.actual === 1 ? "Defaulted" : "Paid Clean"}</td>
                        <td className="p-3">
                          {row.isCorrect ? (
                            <span className="text-emerald-400 font-bold">✔ Correct</span>
                          ) : row.pred === 1 ? (
                            <span className="text-amber-400 font-bold">⚠️ False Alarm (FP)</span>
                          ) : (
                            <span className="text-rose-400 font-bold">❌ Missed Default (FN)</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Regression Mode View */}
          {interactiveMode === "regression" && (
            <div className="space-y-6">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-cyan-300 font-bold">Apartment Carpet Area (sq.ft):</span>
                  <span className="text-cyan-400 font-bold text-sm">{regAreaInput} sq.ft</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="3500"
                  step="50"
                  value={regAreaInput}
                  onChange={(e) => setRegAreaInput(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div className="bg-gradient-to-r from-slate-900 via-cyan-950/50 to-slate-900 p-6 rounded-2xl border border-cyan-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs font-mono text-slate-400 uppercase font-bold">Regression Equation:</span>
                  <div className="text-xs font-mono text-cyan-300">Price = (0.045 × Area) + ₹15.0 Lakhs</div>
                  <p className="text-[11px] text-slate-400">Trained on 18,000 apartment registries in Kolkata Salt Lake</p>
                </div>
                <div className="text-center sm:text-right bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Estimated Valuation:</span>
                  <span className="text-2xl font-bold text-cyan-400 font-mono">₹{predictedFlatPrice} Lakhs</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: FORMAL MATHEMATICAL FOUNDATIONS */}
      {/* ========================================================================= */}
      <section id="theory" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Formal Mathematical Foundations
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Cross-Entropy vs Mean Squared Error optimization objectives
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Regression Objective (L2 Squared Loss)</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Minimizes continuous residual variance between ground truth $y \in \mathbb{R}$ and hypothesis $h(x)$:
            </p>
            <div className="text-xs font-mono text-cyan-300 bg-slate-900 p-3 rounded border border-slate-800 overflow-x-auto">
              {"L_{MSE}(w) = (1/N) ∑_{i=1}^N (wᵀ x_i + b - y_i)²"}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Classification Objective (Binary Cross-Entropy)</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Minimizes negative log likelihood over Bernoulli probability output $\hat{y} = \sigma(w^\top x)$:
            </p>
            <div className="text-xs font-mono text-indigo-300 bg-slate-900 p-3 rounded border border-slate-800 overflow-x-auto">
              {"L_{BCE}(w) = -(1/N) ∑_{i=1}^N [ y_i log(ŷ_i) + (1 - y_i) log(1 - ŷ_i) ]"}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: REAL-WORLD REGIONAL CASE STUDIES */}
      {/* ========================================================================= */}
      <section id="caseStudies" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">
            03
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Real-World Regional Industrial Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Concrete implementations in West Bengal banking, real-estate, and retail
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400">Case 1 • Kolkata Real Estate</span>
              <span className="text-[10px] px-2 py-0.5 bg-cyan-950 text-cyan-300 rounded border border-cyan-800">Regression</span>
            </div>
            <h3 className="text-base font-bold text-white">Apartment Resale Price Estimation</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu engineered a multi-variable Ridge regression model predicting residential market prices in New Town and Salt Lake with an R² of 0.89 and an MAE of ₹2.4 Lakhs.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400">Case 2 • Barrackpore Retail Banking</span>
              <span className="text-[10px] px-2 py-0.5 bg-indigo-950 text-indigo-300 rounded border border-indigo-800">Binary Classification</span>
            </div>
            <h3 className="text-base font-bold text-white">Credit Card Default Risk Scoring</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mamata and Mahima deployed an XGBoost classifier evaluating CIBIL history and monthly salary in ₹ to predict 12-month default risk, achieving an ROC-AUC of 94.8%.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: INTERACTIVE DIAGNOSTIC QUIZ */}
      {/* ========================================================================= */}
      <section id="diagnosticQuiz" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-lg">
            04
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Problem Formulation Diagnostic Quiz
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Test your engineering intuition: Choose the right paradigm and metrics
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-5">
          <div className="flex flex-wrap gap-2">
            {quizQuestions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => {
                  setSelectedQuizIndex(idx);
                  setUserAnswer(null);
                  setShowFeedback(false);
                }}
                className={clsx(
                  "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  selectedQuizIndex === idx
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                )}
              >
                Question {idx + 1}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Scenario Problem</span>
              <h3 className="text-base sm:text-lg font-bold text-white">{currentQuiz.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                {currentQuiz.scenario}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 block">Select the correct engineering decision:</span>
              <div className="grid grid-cols-1 gap-2.5">
                {currentQuiz.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setUserAnswer(opt.id);
                      setShowFeedback(true);
                    }}
                    className={clsx(
                      "p-3.5 rounded-xl border text-left transition-all text-xs sm:text-sm font-medium cursor-pointer flex items-center justify-between",
                      userAnswer === opt.id
                        ? opt.isCorrect
                          ? "bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40"
                          : "bg-rose-950/70 border-rose-500 text-rose-200 ring-2 ring-rose-500/40"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                    )}
                  >
                    <span>{opt.label}</span>
                    {showFeedback && userAnswer === opt.id && (
                      <span className="font-bold text-sm">
                        {opt.isCorrect ? "✅ Correct!" : "❌ Try again"}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {showFeedback && userAnswer && (
              <div className={clsx(
                "p-4 rounded-xl border space-y-1.5 animate-fadeIn text-xs sm:text-sm",
                currentQuiz.options.find((o) => o.id === userAnswer)?.isCorrect
                  ? "bg-emerald-950/40 border-emerald-800 text-emerald-200"
                  : "bg-rose-950/40 border-rose-800 text-rose-200"
              )}>
                <div className="font-bold flex items-center gap-1.5">
                  <span>💡 Teacher&apos;s Feedback:</span>
                </div>
                <p className="leading-relaxed">
                  {currentQuiz.options.find((o) => o.id === userAnswer)?.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: PITFALLS & BEST PRACTICES */}
      {/* ========================================================================= */}
      <section id="bestPractices" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">
            05
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Common Pitfalls &amp; Industry Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Key engineering guidelines for classification and regression
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Accuracy Blindness:</strong> Evaluating 99% imbalanced fraud datasets with accuracy instead of Precision-Recall AUC.</li>
              <li><strong className="text-white">Target Leakage in Regression:</strong> Including future downstream features (like actual sale date) that are unavailable at prediction time.</li>
              <li><strong className="text-white">Treating IDs as Numbers:</strong> Passing zip codes or customer IDs as continuous numbers into linear regression.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Industry Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Cost-Weighted Thresholds:</strong> Always tune the classification threshold θ to reflect the real financial cost of False Positives vs False Negatives.</li>
              <li><strong className="text-white">Residual Analysis:</strong> In regression, plot residuals (ŷ - y) to verify that errors are normally distributed with no systemic bias.</li>
              <li><strong className="text-white">Log Transformations:</strong> Apply log1p transforms to heavy-tailed continuous targets (like house prices) to stabilize gradient descent.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: PYTHON LABORATORY */}
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
              Interactive standalone lab script executing regression and classification pipelines
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="classification_and_regression_overview_lab.py"
          highlightLines={[25, 26, 35, 45]}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: FAQ TEMPLATE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <FAQTemplate
          title="Classification & Regression — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: PRINTABLE NOTE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Classification and Regression Study Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 7 Note"
          downloadFileName="topic7_note.txt"
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: TEACHER NOTE */}
      {/* ========================================================================= */}
      <section>
        <Teacher
          note="Classification and Regression are the two workhorses of commercial machine learning. Remember: a machine doesn't care whether it is predicting a house price or a cancer diagnosis—it only understands loss functions and gradients! As the architect, your responsibility is to choose the correct scorecard (RMSE for continuous scales, Precision-Recall/F1 for discrete decisions) and tune the decision threshold to protect your users from costly errors."
        />
      </section>
    </div>
  );
};

export default Topic7;
