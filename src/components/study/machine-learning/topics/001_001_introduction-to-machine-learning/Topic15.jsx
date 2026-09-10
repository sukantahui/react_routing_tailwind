import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic15_files/worked_example_2_house_price_prediction_lab.py?raw";
import noteText from "./topic15_files/topic15_note.txt?raw";
import questions from "./topic15_files/topic15_questions.js";

const Topic15 = () => {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");

  // Novice Classroom Tab State
  const [selectedLessonTab, setSelectedLessonTab] = useState("intuition");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Interactive Simulator State - House Features
  const [areaSqFt, setAreaSqFt] = useState(1200); // 500 to 3000 sqft
  const [bedrooms, setBedrooms] = useState(3); // 1 to 5 BHK
  const [distMetroKm, setDistMetroKm] = useState(1.5); // 0.2 to 10 km
  const [ageYears, setAgeYears] = useState(4); // 0 to 30 years
  const [selectedPropertyPreset, setSelectedPropertyPreset] = useState("barrackpore");

  // Interactive Simulator State - Model Weights (Tuned via Gradient Descent)
  const [weightArea, setWeightArea] = useState(0.045); // ₹ Lakhs per sqft (e.g. ₹4,500/sqft)
  const [weightBedrooms, setWeightBedrooms] = useState(4.20); // ₹ Lakhs per additional room
  const [weightMetroDist, setWeightMetroDist] = useState(-2.50); // ₹ Lakhs penalty per km from metro
  const [weightAge, setWeightAge] = useState(-0.80); // ₹ Lakhs depreciation per year
  const [biasIntercept, setBiasIntercept] = useState(12.0); // Baseline land value in ₹ Lakhs

  const svgId = useId();

  // Preset Properties in West Bengal
  const propertyPresets = {
    barrackpore: {
      name: "Barrackpore Riverside Apartment",
      area: 1150,
      bhk: 3,
      metro: 1.2,
      age: 3,
      actualPrice: 62.5,
      location: "Near Barrackpore Station"
    },
    saltlake: {
      name: "Salt Lake Sector V Tech Condo",
      area: 1650,
      bhk: 3,
      metro: 0.5,
      age: 2,
      actualPrice: 98.0,
      location: "Heart of IT Corridor"
    },
    jadavpur: {
      name: "Jadavpur South Kolkata Flat",
      area: 950,
      bhk: 2,
      metro: 2.0,
      age: 8,
      actualPrice: 48.0,
      location: "Near University Campus"
    },
    ichapur: {
      name: "Ichapur Suburban Home",
      area: 1400,
      bhk: 4,
      metro: 4.5,
      age: 12,
      actualPrice: 52.0,
      location: "Calm Residential Zone"
    }
  };

  const handleSelectPreset = (key) => {
    setSelectedPropertyPreset(key);
    const p = propertyPresets[key];
    setAreaSqFt(p.area);
    setBedrooms(p.bhk);
    setDistMetroKm(p.metro);
    setAgeYears(p.age);
  };

  // Smooth scroll handler
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 1. Multiple Linear Regression Hypothesis
  // y_hat = w1*area + w2*bhk + w3*metro + w4*age + b
  const predictedPrice = Math.max(
    5.0,
    (weightArea * areaSqFt) +
    (weightBedrooms * bedrooms) +
    (weightMetroDist * distMetroKm) +
    (weightAge * ageYears) +
    biasIntercept
  );

  const actualPrice = selectedPropertyPreset && propertyPresets[selectedPropertyPreset]
    ? propertyPresets[selectedPropertyPreset].actualPrice
    : 60.0;

  const residualError = predictedPrice - actualPrice;
  const squaredError = residualError * residualError;
  const absError = Math.abs(residualError);

  // Comprehensive Jargon Glossary
  const jargonTerms = [
    {
      id: "multiple-linear-regression",
      term: "Multiple Linear Regression",
      category: "core",
      badge: "Regression Core",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      pronunciation: "ˈmʌl.tɪ.pəl ˈlɪn.i.ər rɪˈɡrɛʃ.ən",
      plainEnglish: "A foundational machine learning model that predicts a continuous number (e.g. Price in ₹) by computing a weighted sum of multiple input clues.",
      everydayAnalogy: "A fruit vendor calculating the total bill: (Price per kg apple × Apple kg) + (Price per dozen banana × Banana count).",
      whyItMatters: "The most interpretable and mathematically transparent regression model in all of data science."
    },
    {
      id: "mean-squared-error",
      term: "Mean Squared Error (MSE) Loss",
      category: "loss",
      badge: "Loss Function",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "miːn skweəd ˈɛr.ər",
      plainEnglish: "The average of the squared differences between actual prices and predicted prices: L = (1/2N) ∑ (ŷ_i - y_i)².",
      everydayAnalogy: "If you guess a price ₹5 off, penalty is 25. If you guess ₹10 off, penalty is 100. Squaring heavily punishes massive miscalculations.",
      whyItMatters: "Its derivative is simple and linear, making gradient descent updates smooth and stable."
    },
    {
      id: "r2-score",
      term: "R-Squared (Coefficient of Determination R²)",
      category: "metrics",
      badge: "Goodness of Fit",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "ɑː skweəd",
      plainEnglish: "A score between 0.0 (0%) and 1.0 (100%) indicating how much of the variance in house prices is explained by your input features.",
      everydayAnalogy: "R² = 0.88 means your features explain 88% of the price differences in the neighborhood; the remaining 12% is random unobserved variation.",
      whyItMatters: "The primary standardized metric for evaluating regression model explanatory power."
    },
    {
      id: "residual-error",
      term: "Residual Error (e_i = ŷ_i - y_i)",
      category: "metrics",
      badge: "Error Delta",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "rɪˈzɪd.ju.əl ˈɛr.ər",
      plainEnglish: "The exact difference between what the model predicted and what the house actually sold for.",
      everydayAnalogy: "You estimated a flat would cost ₹60 Lakhs, but it actually sold for ₹62.5 Lakhs. Residual is -₹2.5 Lakhs (underestimated).",
      whyItMatters: "Plotting residuals helps identify whether model errors are random white noise or systematic biases."
    },
    {
      id: "gradient-descent-reg",
      term: "Gradient Descent Optimization",
      category: "optimization",
      badge: "Weight Tuning",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      pronunciation: "ˈɡreɪ.di.ənt dɪˈsɛnt",
      plainEnglish: "An iterative algorithm that steps downhill in the error landscape by adjusting each weight in the direction that reduces the MSE loss most rapidly.",
      everydayAnalogy: "Walking down a foggy hill in the dark by feeling with your feet which direction slopes downward with each step.",
      whyItMatters: "Automatically discovers the optimal ₹-per-sqft and ₹-per-BHK multipliers directly from historical sales data."
    }
  ];

  // Diagnostic Quiz Questions
  const quizQuestions = [
    {
      question: "In the house price prediction equation ŷ = w₁·Area + w₂·Bedrooms + w₃·MetroDist + b, why is the weight for distance to metro (w₃) typically negative?",
      options: [
        "Negative numbers are easier for Python to multiply.",
        "As distance from the metro station increases, convenience drops, which decreases the market valuation of the property.",
        "Because metro tickets are expensive.",
        "Distance in kilometers cannot be represented as a positive number."
      ],
      correctIndex: 1,
      explanation: "Properties located further away from transportation hubs suffer from lower commuting convenience, resulting in lower market prices. A negative weight w₃ reflects this inverse relationship (higher distance ➔ lower price)."
    },
    {
      question: "What does an R² (R-squared) score of 0.85 indicate about our house price model?",
      options: [
        "The model took 85 seconds to train.",
        "85% of the variation in house prices is successfully explained by the model's input features.",
        "The model made mistakes on 85 houses.",
        "House prices will increase by 85% next year."
      ],
      correctIndex: 1,
      explanation: "R² (Coefficient of Determination) measures the proportion of variance in the dependent target variable that is predictable from the independent features. R² = 0.85 means 85% of price variation is accounted for."
    },
    {
      question: "Why do we use Mean Squared Error (MSE) instead of Mean Absolute Error (MAE) as the primary differentiable loss function during gradient descent?",
      options: [
        "MAE cannot be computed on modern computers.",
        "MSE has a smooth, continuously differentiable quadratic derivative (2(ŷ - y)), whereas MAE has a sharp corner at zero error.",
        "MSE guarantees 100% accuracy on every training sample.",
        "MSE ignores all outliers completely."
      ],
      correctIndex: 1,
      explanation: "The derivative of (ŷ - y)² is simple, linear, and smooth everywhere. In contrast, absolute value |ŷ - y| has a sharp non-differentiable corner at zero, which can cause gradient oscillation near the minimum."
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
      {/* HEADER BANNER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-3xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Module 1 • Topic 15
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Continuous Regression
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Multiple Linear Regression + MSE
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Worked Example 2: House Price Prediction
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            A comprehensive, hands-on walkthrough of continuous variable prediction using Multiple Linear Regression. Understand feature multipliers, residual error calculations, Mean Squared Error minimization, and property appraisal dynamics across West Bengal.
          </p>

          <div className="flex flex-wrap gap-2 pt-3">
            {[
              { id: "noviceMasterclass", label: "🎓 Master Teacher's Classroom", icon: "👨‍🏫" },
              { id: "simulator", label: "⚡ Interactive Valuation Studio", icon: "🔬" },
              { id: "theory", label: "📐 Mathematical Formulation & MSE", icon: "⚙️" },
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
                How Regression Estimates Value: The Property Appraiser Analogy
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/90 px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 font-mono">
            <span>⏱️ 14 min intuitive guide</span>
          </div>
        </div>

        {/* Teacher's Welcome Dialogue */}
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/60 p-6 rounded-2xl border border-indigo-800/40 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <span>👋 Welcome, student! Let us learn how algorithms estimate continuous quantities like money in ₹ Lakhs.</span>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            When a property appraiser in Kolkata estimates the fair market value of an apartment, they don't give a simple "Yes/No". They give a specific continuous number, like <strong>₹62.5 Lakhs</strong>. How do they calculate this? They start with a baseline land cost (the <strong>bias b</strong>), add ₹4,500 for every square foot (weight {"w₁"}), add ₹4.2 Lakhs for each bedroom (weight {"w₂"}), and subtract money if the property is far from the railway or metro station (weight {"w₃"}).
          </p>
          <p className="text-sm text-indigo-200 font-medium">
            Multiple Linear Regression is the exact mathematical science of discovering these exact weight multipliers from historical property deed sales!
          </p>
        </div>

        {/* Sub-Lesson Tabs */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
            {[
              { id: "intuition", label: "1. The Linear Pricing Equation", icon: "🏠" },
              { id: "mse", label: "2. Mean Squared Error (MSE) Intuition", icon: "📐" },
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

          {/* Sub-Lesson 1: The Linear Pricing Equation */}
          {selectedLessonTab === "intuition" && (
            <div className="space-y-6 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🏠</span> Deconstructing the Property Valuation Formula
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">1. Positive Contributors (Adding Value)</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Features like Carpet Area (sqft) and Number of Bedrooms (BHK) increase utility and living comfort. Their weight coefficients {"w₁"} and {"w₂"} are strictly positive numbers.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-rose-400 uppercase">2. Negative Contributors (Depreciation &amp; Distance)</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Distance to Metro (km) and Property Age (years) decrease property appeal. Their weight coefficients {"w₃"} and {"w₄"} are negative numbers that subtract from the valuation.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2 md:col-span-2">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase">3. The Intercept Bias (b = Baseline Land Value)</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      The bias {"b = 12.0"} represents the foundational plot/registration cost before factoring in building construction. It prevents a 0-bedroom plot from having a price of ₹0.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Lesson 2: MSE Intuition */}
          {selectedLessonTab === "mse" && (
            <div className="space-y-4 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>📐</span> Why We Square Errors in Regression (MSE)
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Why not just add up regular errors? Notice what happens if we don't square:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-rose-950/40 p-4 rounded-xl border border-rose-800/60 space-y-2">
                    <span className="text-xs font-bold text-rose-300 uppercase">❌ Naive Sum of Errors (Cancellation Trap)</span>
                    <p className="text-slate-300">
                      House 1: Overestimated by +₹5 Lakhs.<br />
                      House 2: Underestimated by -₹5 Lakhs.<br />
                      Total sum: (+5) + (-5) = <strong>₹0 Error!</strong> The model appears 100% perfect despite being ₹5 Lakhs wrong on every house.
                    </p>
                  </div>

                  <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/60 space-y-2">
                    <span className="text-xs font-bold text-emerald-300 uppercase">✔ Mean Squared Error (MSE)</span>
                    <p className="text-slate-300">
                      House 1: (+5)² = 25<br />
                      House 2: (-5)² = 25<br />
                      Average MSE = (25 + 25) / 2 = <strong>25.0</strong>. Negative errors cannot cancel out positive errors!
                    </p>
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
                    { id: "core", label: "Regression" },
                    { id: "loss", label: "Loss Function" },
                    { id: "metrics", label: "Metrics & Error" },
                    { id: "optimization", label: "Optimization" }
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
                    placeholder="Search Worked Example 2 jargon..."
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

      {/* SECTION 1: INTERACTIVE VALUATION STUDIO */}
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
              Interactive House Price Valuation &amp; Residual Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Customize property attributes, adjust linear regression weight coefficients, and monitor instantaneous prediction error in ₹ Lakhs
            </p>
          </div>
        </div>

        {/* Property Presets */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Select a West Bengal Real Estate Profile:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.keys(propertyPresets).map((key) => {
              const p = propertyPresets[key];
              return (
                <button
                  key={key}
                  onClick={() => handleSelectPreset(key)}
                  className={clsx(
                    "p-3 rounded-xl border text-left transition-all cursor-pointer space-y-1",
                    selectedPropertyPreset === key
                      ? "bg-indigo-600/30 border-indigo-400 text-white shadow-lg shadow-indigo-600/30"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  )}
                >
                  <div className="text-xs font-bold leading-tight line-clamp-1">{p.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {p.area} sqft • {p.bhk} BHK • ₹{p.actualPrice}L
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Property Feature Controls & Output Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
          {/* Left: Input Attributes & Weight Sliders */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
              1. Property Features (Input Vector x_i)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Carpet Area:</span>
                  <span className="text-cyan-400 font-bold">{areaSqFt} sq.ft</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="3000"
                  step="50"
                  value={areaSqFt}
                  onChange={(e) => {
                    setAreaSqFt(Number(e.target.value));
                    setSelectedPropertyPreset("");
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Bedrooms (BHK):</span>
                  <span className="text-emerald-400 font-bold">{bedrooms} BHK</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={bedrooms}
                  onChange={(e) => {
                    setBedrooms(Number(e.target.value));
                    setSelectedPropertyPreset("");
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Distance to Metro/Station:</span>
                  <span className="text-amber-400 font-bold">{distMetroKm} km</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="10.0"
                  step="0.2"
                  value={distMetroKm}
                  onChange={(e) => {
                    setDistMetroKm(Number(e.target.value));
                    setSelectedPropertyPreset("");
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Property Age:</span>
                  <span className="text-purple-400 font-bold">{ageYears} yrs</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={ageYears}
                  onChange={(e) => {
                    setAgeYears(Number(e.target.value));
                    setSelectedPropertyPreset("");
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>
            </div>

            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono pt-3 border-t border-slate-800">
              2. Learned Weight Coefficients (Gradient Descent)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">w₁ (Rate per sqft in ₹L):</span>
                  <span className="text-white font-bold">{weightArea.toFixed(3)}</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.10"
                  step="0.005"
                  value={weightArea}
                  onChange={(e) => setWeightArea(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">w₂ (Value per BHK in ₹L):</span>
                  <span className="text-white font-bold">{weightBedrooms.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.2"
                  value={weightBedrooms}
                  onChange={(e) => setWeightBedrooms(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">w₃ (Metro Distance Penalty):</span>
                  <span className="text-white font-bold">{weightMetroDist.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="-6.0"
                  max="0.0"
                  step="0.2"
                  value={weightMetroDist}
                  onChange={(e) => setWeightMetroDist(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">b (Baseline Plot Value in ₹L):</span>
                  <span className="text-white font-bold">{biasIntercept.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="30.0"
                  step="1.0"
                  value={biasIntercept}
                  onChange={(e) => setBiasIntercept(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Right: Output Prediction & Loss Dashboard */}
          <div className="lg:col-span-5 bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Continuous Regression Output
              </span>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-center space-y-1">
                <span className="text-xs text-slate-400 uppercase">Predicted Valuation (ŷ)</span>
                <div className="text-3xl font-extrabold text-emerald-400">
                  ₹{predictedPrice.toFixed(2)} Lakhs
                </div>
                <span className="text-[11px] text-slate-500">
                  Actual Recorded Deed: ₹{actualPrice.toFixed(2)} Lakhs
                </span>
              </div>

              {/* Price Breakdown Stack */}
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Area Contribution ({areaSqFt} × {weightArea.toFixed(3)}):</span>
                  <span className="text-cyan-300">+₹{(areaSqFt * weightArea).toFixed(2)}L</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>BHK Contribution ({bedrooms} × {weightBedrooms.toFixed(2)}):</span>
                  <span className="text-emerald-300">+₹{(bedrooms * weightBedrooms).toFixed(2)}L</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Metro Distance ({distMetroKm} × {weightMetroDist.toFixed(2)}):</span>
                  <span className="text-rose-300">₹{(distMetroKm * weightMetroDist).toFixed(2)}L</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Property Age ({ageYears} × {weightAge.toFixed(2)}):</span>
                  <span className="text-rose-300">₹{(ageYears * weightAge).toFixed(2)}L</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Baseline Plot Intercept (b):</span>
                  <span className="text-amber-300">+₹{biasIntercept.toFixed(2)}L</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs font-mono space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Residual Error (ŷ - y):</span>
                <span className={clsx("font-bold", residualError >= 0 ? "text-amber-400" : "text-cyan-400")}>
                  {residualError >= 0 ? `+₹${residualError.toFixed(2)}L` : `-₹${Math.abs(residualError).toFixed(2)}L`}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Squared Error (ŷ - y)²:</span>
                <span className="text-rose-400 font-bold">{squaredError.toFixed(2)} (Lakhs)²</span>
              </div>
              <div className="flex justify-between text-white font-bold pt-1 border-t border-slate-800">
                <span>Absolute Deviation |ŷ - y|:</span>
                <span className="text-emerald-400">₹{absError.toFixed(2)} Lakhs</span>
              </div>
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
              Mathematical Formulation: Multiple Linear Regression &amp; MSE
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Closed-form Normal Equation and iterative Gradient Descent derivations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">1. Vectorized Hypothesis &amp; MSE Cost</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              For a batch of N properties with d features, the hypothesis matrix equation and Mean Squared Error cost function are:
            </p>
            <div className="text-xs font-mono text-indigo-300 bg-slate-900 p-3 rounded-lg border border-slate-800 overflow-x-auto space-y-1">
              <div>{"ŷ = X w + b 1_N"}</div>
              <div className="text-emerald-300">{"𝒥(w, b) = (1 / 2N) || X w + b 1_N - y ||_2^2"}</div>
            </div>
            <p className="text-xs text-slate-400">
              The factor of 1/2 cancels cleanly when computing the derivative with respect to weights.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">2. Gradient Descent Weight Update</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              At each step, weights are updated proportional to learning rate α and the partial derivative of cost 𝒥:
            </p>
            <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-3 rounded-lg border border-slate-800 overflow-x-auto">
              {"w_j ← w_j - α · (1 / N) ∑_{i=1}^N (h(x_i) - y_i) · x_{ij}"}
            </div>
            <p className="text-xs text-slate-400">
              Closed-form analytical solution (Normal Equation): {"w* = (X^T X)^{-1} X^T y"}.
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
              Applied real estate valuation and continuous regression systems across West Bengal
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Salt Lake Sector V PropTech</span>
            <h3 className="text-base font-bold text-white">Automated Commercial Office Valuation</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Debangshu engineered a multi-feature regression model pricing commercial office spaces in New Town and Sector V, incorporating proximity to metro stations, floor elevation, and building green energy certifications.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Barrackpore Urban Housing Board</span>
            <h3 className="text-base font-bold text-white">Suburban Residential Land Appraiser</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mamata and Mahima trained a Ridge Regression model across 3,500 historical registry deeds in North 24 Parganas, achieving an R² of 0.89 and automating stamp duty assessment recommendations.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Ichapur Retail Property Hub</span>
            <h3 className="text-base font-bold text-white">Retail Shop Lease Rental Forecaster</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Susmita applied linear regression to predict monthly square foot rental yields for commercial storefronts, weighting street footfall volume and road frontage width.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Jadavpur Housing Analytics</span>
            <h3 className="text-base font-bold text-white">Heritage Property Depreciation Estimation</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Abhronila implemented a non-linear polynomial regression pipeline modeling structural building aging curves to adjust municipal tax assessments for older residential buildings.
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
              Test your understanding of Multiple Linear Regression, MSE loss, and residual error analysis
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
            <span>Question {selectedQuizIndex + 1} of {quizQuestions.length}</span>
            <span className="text-indigo-400 font-bold">Regression Concept Check</span>
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
              Regression Pitfalls &amp; Industry Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Key engineering guidelines for training robust linear regression models
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> 4 Critical Regression Traps
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-rose-300">Multicollinearity:</strong> Feeding two identical features (e.g. Area in sq.ft and Area in sq.m), causing unstable matrix inversion.</li>
              <li><strong className="text-rose-300">Extreme Outliers:</strong> Massive mansion sales distorting MSE gradients and pulling the regression line off true market averages.</li>
              <li><strong className="text-rose-300">Unscaled Features:</strong> Area (1500) overpowering Bedrooms (3) during gradient updates.</li>
              <li><strong className="text-rose-300">Negative Predicted Prices:</strong> Failing to apply logarithmic price transforms or lower bounds on small properties.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> 4 Best Practice Regression Rules
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-emerald-300">Log-Transform Skewed Prices:</strong> Train models on <code className="text-cyan-300 bg-slate-900 px-1 rounded">log(price)</code> to stabilize variance.</li>
              <li><strong className="text-emerald-300">Standardize Input Features:</strong> Use <code className="text-cyan-300 bg-slate-900 px-1 rounded">StandardScaler</code> before fitting gradient descent.</li>
              <li><strong className="text-emerald-300">Inspect Variance Inflation Factors (VIF):</strong> Remove heavily redundant collinear features.</li>
              <li><strong className="text-emerald-300">Evaluate with MAE &amp; RMSE:</strong> Combine R² with interpretable metrics expressed directly in ₹ Lakhs.</li>
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
              Interactive standalone lab script for Multiple Linear Regression and MSE gradient descent
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="worked_example_2_house_price_prediction_lab.py"
          highlightLines={[18, 26, 38, 50]}
        />
      </section>

      {/* FAQ TEMPLATE */}
      <section className="space-y-4">
        <FAQTemplate
          title="Worked Example 2: House Price Prediction — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* PRINTABLE NOTE */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Worked Example 2: House Price Prediction"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 15 Note"
          downloadFileName="topic15_note.txt"
        />
      </section>

      {/* TEACHER NOTE */}
      <section>
        <Teacher
          note="Multiple Linear Regression is the cornerstone of quantitative forecasting. Remember that real-world relationships are often multi-faceted: square footage, room count, and transit access all contribute simultaneously. Always check your residuals and ensure your features are properly scaled!"
        />
      </section>
    </div>
  );
};

export default Topic15;
