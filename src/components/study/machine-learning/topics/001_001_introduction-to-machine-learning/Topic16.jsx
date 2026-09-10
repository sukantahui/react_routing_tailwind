import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic16_files/worked_example_3_customer_churn_prediction_lab.py?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions.js";

const Topic16 = () => {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");

  // Novice Classroom Tab State
  const [selectedLessonTab, setSelectedLessonTab] = useState("intuition");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Interactive Churn Simulator State
  const [tenureMonths, setTenureMonths] = useState(8); // 1 to 72 months
  const [monthlyCharge, setMonthlyCharge] = useState(850); // ₹199 to ₹2500
  const [supportCalls, setSupportCalls] = useState(4); // 0 to 10 calls
  const [contractType, setContractType] = useState("month-to-month"); // "month-to-month", "one-year", "two-year"
  const [decisionThreshold, setDecisionThreshold] = useState(0.40); // 0.10 to 0.90
  const [selectedCustomerPreset, setSelectedCustomerPreset] = useState("atRisk");

  const svgId = useId();

  // Presets
  const customerPresets = {
    atRisk: {
      name: "Debangshu (Salt Lake) - At-Risk Subscriber",
      tenure: 5,
      monthly: 999,
      calls: 5,
      contract: "month-to-month",
      profile: "High monthly bill, frequent complaints, short tenure"
    },
    loyal: {
      name: "Mamata (Barrackpore) - Loyal Family Plan",
      tenure: 48,
      monthly: 499,
      calls: 0,
      contract: "two-year",
      profile: "Long tenure, 2-year contract, zero complaints"
    },
    borderline: {
      name: "Susmita (Ichapur) - Mid-Tier Broadband",
      tenure: 18,
      monthly: 699,
      calls: 2,
      contract: "one-year",
      profile: "Moderate usage, occasional network speed inquiries"
    }
  };

  const handleSelectPreset = (key) => {
    setSelectedCustomerPreset(key);
    const c = customerPresets[key];
    setTenureMonths(c.tenure);
    setMonthlyCharge(c.monthly);
    setSupportCalls(c.calls);
    setContractType(c.contract);
  };

  // Smooth scroll handler
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Model weights (Tuned via Logistic / Random Forest model)
  const contractPenalty = contractType === "month-to-month" ? 1.8 : contractType === "one-year" ? -0.5 : -1.8;
  const rawZ = (-0.05 * tenureMonths) + (0.002 * (monthlyCharge - 500)) + (0.60 * supportCalls) + contractPenalty - 0.20;
  const churnProb = 1.0 / (1.0 + Math.exp(-Math.max(-20, Math.min(20, rawZ))));
  const churnProbPct = +(churnProb * 100).toFixed(1);
  const willChurn = churnProb >= decisionThreshold;

  // Comprehensive Jargon Glossary
  const jargonTerms = [
    {
      id: "customer-churn",
      term: "Customer Churn (Attrition)",
      category: "core",
      badge: "Business Risk",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "ˈkʌs.tə.mər tʃɜːn",
      plainEnglish: "When a subscriber cancels their service, closes their account, or switches to a competitor telecom/broadband network.",
      everydayAnalogy: "A regular customer at a local sweets shop stopping their daily visit and buying sweets from a new competitor across the street.",
      whyItMatters: "Acquiring a new customer costs 5 to 7 times more than retaining an existing customer via proactive retention discounts."
    },
    {
      id: "precision-recall",
      term: "Precision vs Recall Trade-off",
      category: "metrics",
      badge: "Metric Balance",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      pronunciation: "prɪˈsɪʒ.ən vɜː.səs rɪˈkɔːl",
      plainEnglish: "Precision: Out of all customers we flagged as churning, how many actually left? Recall: Out of all customers who actually left, how many did our model catch?",
      everydayAnalogy: "A police searchlight: High precision means only shining light on actual thieves; High recall means catching every possible thief even if you shine light on a few innocent passersby.",
      whyItMatters: "In churn management, high recall ensures you don't let profitable customers slip away unnoticed."
    },
    {
      id: "confusion-matrix",
      term: "Confusion Matrix (TP, FP, TN, FN)",
      category: "metrics",
      badge: "Evaluation Grid",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      pronunciation: "kənˈfjuː.ʒən ˈmeɪ.trɪks",
      plainEnglish: "A 2x2 scorecard table comparing actual outcomes against model predictions: True Positives (caught churners), False Positives (falsely alarmed), False Negatives (missed churners), and True Negatives (retained).",
      everydayAnalogy: "A doctor's diagnostic scorecard: Sick patients correctly diagnosed vs healthy patients mistakenly given medication.",
      whyItMatters: "Exposes the exact types of mistakes an algorithm makes rather than hiding behind a single accuracy score."
    },
    {
      id: "roc-auc",
      term: "ROC Curve & AUC Score",
      category: "metrics",
      badge: "Threshold-Free Metric",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "ɑː-əʊ-siː eɪ-juː-siː",
      plainEnglish: "A plot showing True Positive Rate vs False Positive Rate across every possible decision threshold (from 0.0 to 1.0). AUC (Area Under Curve) ranges from 0.5 (random guess) to 1.0 (perfect classifier).",
      everydayAnalogy: "An archer's overall shooting skill score across windy, rainy, and sunny conditions, independent of a single target distance.",
      whyItMatters: "The gold standard metric for evaluating imbalanced classification models."
    },
    {
      id: "threshold-tuning",
      term: "Decision Threshold Tuning",
      category: "optimization",
      badge: "Business Calibration",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "dɪˈsɪʒ.ən ˈθrɛʃ.həʊld ˈtjuː.nɪŋ",
      plainEnglish: "Moving the classification boundary away from the default 0.50 (e.g., lowering to 0.35) to catch more at-risk customers when customer loss is expensive.",
      everydayAnalogy: "Setting a smoke detector's sensitivity higher in a chemical warehouse than in a kitchen where harmless toast smoke is common.",
      whyItMatters: "Aligns mathematical model predictions with financial ROI."
    }
  ];

  // Diagnostic Quiz Questions
  const quizQuestions = [
    {
      question: "Why is standard Accuracy a deceptive metric for a customer churn model where only 5% of users churn each month?",
      options: [
        "Accuracy cannot be calculated on decimal percentages.",
        "A dumb 'lazy' model that blindly predicts 'No Churn' for everyone achieves 95% accuracy while catching ZERO actual churners.",
        "Telecom companies only use logarithmic metrics.",
        "Accuracy requires equal numbers of male and female customers."
      ],
      correctIndex: 1,
      explanation: "On heavily imbalanced datasets (e.g. 95% retained, 5% churned), a trivial baseline model predicting 0 for all customers achieves 95% accuracy but is completely useless in practice. Precision, Recall, and ROC-AUC must be used instead."
    },
    {
      question: "If retaining an at-risk customer is critical and offering a ₹100 discount coupon is cheap, should the telecom company lower or raise the decision threshold from 0.50?",
      options: [
        "Raise the threshold to 0.90 to give coupons to fewer people.",
        "Lower the threshold to 0.30 or 0.35 to maximize Recall and catch more at-risk customers.",
        "Thresholds can never be changed from 0.50 in machine learning.",
        "Set the threshold to 0.00 to disconnect all customers."
      ],
      correctIndex: 1,
      explanation: "Lowering the decision threshold (e.g. to 0.30) increases Recall (sensitivity). Since the cost of missing a churner (losing recurring monthly revenue) is much higher than the cheap ₹100 retention discount, maximizing Recall is financially optimal."
    },
    {
      question: "What does a False Negative represent in customer churn prediction?",
      options: [
        "A customer whom the model predicted would stay, but who actually cancelled their service and left.",
        "A loyal customer whom the model mistakenly flagged as leaving.",
        "A customer who paid their bill on time.",
        "A database connection failure."
      ],
      correctIndex: 0,
      explanation: "False Negative means the model predicted Negative (will NOT churn / will stay), but the ground truth was Positive (customer actually churned). This is the costliest mistake for retention teams."
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
              BCAC701B • Module 1 • Topic 16
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-full">
              Imbalanced Classification
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Precision, Recall &amp; ROC-AUC
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Worked Example 3: Customer Churn Prediction
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            A comprehensive, hands-on walkthrough of subscriber retention analytics. Learn how to handle class imbalance, analyze confusion matrices, evaluate Precision vs Recall trade-offs, and tune decision thresholds for enterprise telecommunications and banking.
          </p>

          <div className="flex flex-wrap gap-2 pt-3">
            {[
              { id: "noviceMasterclass", label: "🎓 Master Teacher's Classroom", icon: "👨‍🏫" },
              { id: "simulator", label: "⚡ Interactive Churn Studio", icon: "🔬" },
              { id: "theory", label: "📐 Evaluation Metrics & ROC-AUC", icon: "⚙️" },
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
                Predicting Customer Loyalty: The Neighborhood Tea Stall Analogy
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/90 px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 font-mono">
            <span>⏱️ 14 min business deep-dive</span>
          </div>
        </div>

        {/* Teacher's Welcome Dialogue */}
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/60 p-6 rounded-2xl border border-indigo-800/40 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <span>👋 Welcome, student! Let us understand one of the highest-paying machine learning jobs in business: Customer Retention.</span>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Think of a popular tea stall in Barrackpore. The stall owner knows who their loyal customers are. If a regular customer who visits twice daily suddenly doesn't show up for 4 days, or complained yesterday that the tea was cold, the smart shopkeeper immediately notices and offers them a warm greeting or complimentary biscuit when they next walk by.
          </p>
          <p className="text-sm text-indigo-200 font-medium">
            In a giant telecom company with 10 million broadband subscribers, human staff cannot observe everyone individually. Machine Learning models automatically monitor support tickets, usage drops, and billing spikes to flag at-risk subscribers 30 days before they cancel!
          </p>
        </div>

        {/* Sub-Lesson Tabs */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
            {[
              { id: "intuition", label: "1. The 4 Churn Indicators", icon: "🚩" },
              { id: "matrix", label: "2. The Confusion Matrix Demystified", icon: "📊" },
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

          {/* Sub-Lesson 1: The 4 Churn Indicators */}
          {selectedLessonTab === "intuition" && (
            <div className="space-y-6 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🚩</span> The 4 High-Signal Features of Customer Churn
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">1. Customer Tenure (Months)</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      New subscribers (1-6 months) have a significantly higher churn risk. Customers who have stayed for 3+ years have ingrained habits and very low churn probability.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-rose-400 uppercase">2. Customer Support Escalations</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      If a user calls technical support 4 or more times in a single month regarding slow internet or billing discrepancies, frustration spikes and churn probability jumps past 80%.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase">3. Contract Term Structure</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Month-to-month contracts have zero cancellation friction. 1-year and 2-year contracted users exhibit high switching barriers and lower monthly churn.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase">4. Monthly Billing Surges</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Unexpected overage charges or premium plan increases trigger price sensitivity, prompting subscribers to comparison-shop rival broadband providers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Lesson 2: Confusion Matrix */}
          {selectedLessonTab === "matrix" && (
            <div className="space-y-4 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>📊</span> The 2x2 Confusion Matrix Scorecard
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Every binary prediction falls into one of 4 buckets:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-800 space-y-1">
                    <span className="text-emerald-300 font-bold uppercase">True Positive (TP) — Successful Catch</span>
                    <p className="text-slate-300">Model predicted CHURN, and customer was actually about to leave. Retention team saves the account!</p>
                  </div>

                  <div className="bg-amber-950/60 p-4 rounded-xl border border-amber-800 space-y-1">
                    <span className="text-amber-300 font-bold uppercase">False Positive (FP) — False Alarm</span>
                    <p className="text-slate-300">Model predicted CHURN, but customer was happy. Cost: Sent a ₹50 discount coupon unnecessarily.</p>
                  </div>

                  <div className="bg-rose-950/60 p-4 rounded-xl border border-rose-800 space-y-1">
                    <span className="text-rose-300 font-bold uppercase">False Negative (FN) — Costly Miss</span>
                    <p className="text-slate-300">Model predicted STAY, but customer quietly cancelled and left. Worst financial mistake!</p>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-cyan-300 font-bold uppercase">True Negative (TN) — Normal Retention</span>
                    <p className="text-slate-300">Model predicted STAY, and customer stayed happily. Business as usual.</p>
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
                    { id: "core", label: "Business" },
                    { id: "metrics", label: "Scorecards" },
                    { id: "optimization", label: "Tuning" }
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
                    placeholder="Search Worked Example 3 jargon..."
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

      {/* SECTION 1: INTERACTIVE CHURN STUDIO */}
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
              Interactive Subscriber Churn &amp; Threshold Tuning Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Simulate customer profile risk factors, adjust decision thresholds, and observe classification alarms in real-time
            </p>
          </div>
        </div>

        {/* Customer Preset Selectors */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Select a Subscriber Profile:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.keys(customerPresets).map((key) => {
              const c = customerPresets[key];
              return (
                <button
                  key={key}
                  onClick={() => handleSelectPreset(key)}
                  className={clsx(
                    "p-3.5 rounded-xl border text-left transition-all cursor-pointer space-y-1",
                    selectedCustomerPreset === key
                      ? "bg-indigo-600/30 border-indigo-400 text-white shadow-lg shadow-indigo-600/30"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  )}
                >
                  <div className="text-xs font-bold leading-tight">{c.name}</div>
                  <div className="text-[11px] text-slate-400">{c.profile}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature Inputs & Decision Threshold */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
              1. Customer Behavioral Attributes
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Tenure:</span>
                  <span className="text-cyan-400 font-bold">{tenureMonths} Months</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="72"
                  value={tenureMonths}
                  onChange={(e) => {
                    setTenureMonths(Number(e.target.value));
                    setSelectedCustomerPreset("");
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Monthly Bill:</span>
                  <span className="text-emerald-400 font-bold">₹{monthlyCharge}/mo</span>
                </div>
                <input
                  type="range"
                  min="199"
                  max="2499"
                  step="50"
                  value={monthlyCharge}
                  onChange={(e) => {
                    setMonthlyCharge(Number(e.target.value));
                    setSelectedCustomerPreset("");
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Support Complaints:</span>
                  <span className="text-rose-400 font-bold">{supportCalls} Calls</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={supportCalls}
                  onChange={(e) => {
                    setSupportCalls(Number(e.target.value));
                    setSelectedCustomerPreset("");
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-slate-400 block">Contract Duration:</span>
                <select
                  value={contractType}
                  onChange={(e) => {
                    setContractType(e.target.value);
                    setSelectedCustomerPreset("");
                  }}
                  className="w-full bg-slate-900 border border-slate-700 text-xs px-2.5 py-1 rounded text-white font-mono"
                >
                  <option value="month-to-month">Month-to-Month (High Risk)</option>
                  <option value="one-year">1-Year Contract (Moderate)</option>
                  <option value="two-year">2-Year Contract (Low Risk)</option>
                </select>
              </div>
            </div>

            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono pt-3 border-t border-slate-800">
              2. Business Decision Threshold Tuning Dial
            </h3>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Decision Threshold Cutoff (τ):</span>
                <span className="text-amber-400 font-bold">{(decisionThreshold * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.10"
                max="0.90"
                step="0.05"
                value={decisionThreshold}
                onChange={(e) => setDecisionThreshold(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-[11px] text-slate-500 block">
                Lowering cutoff (e.g. 35%) triggers retention outreach earlier to prevent customer loss.
              </span>
            </div>
          </div>

          {/* Right Output Scorecard */}
          <div className="lg:col-span-5 bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Model Churn Risk Score
              </span>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-center space-y-1">
                <span className="text-xs text-slate-400 uppercase">Predicted Churn Probability</span>
                <div className={clsx("text-3xl font-extrabold", churnProb >= decisionThreshold ? "text-rose-400" : "text-emerald-400")}>
                  {churnProbPct}%
                </div>
                <span className="text-[11px] text-slate-500">
                  Threshold Cutoff: {(decisionThreshold * 100).toFixed(0)}%
                </span>
              </div>

              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={clsx("h-full transition-all duration-300", churnProb >= decisionThreshold ? "bg-rose-500" : "bg-emerald-500")}
                  style={{ width: `${churnProbPct}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs font-mono pt-1">
                <span className="text-slate-400">Automated Action:</span>
                <span
                  className={clsx(
                    "px-2.5 py-1 rounded font-bold uppercase",
                    willChurn
                      ? "bg-rose-950 text-rose-300 border border-rose-800"
                      : "bg-emerald-950 text-emerald-300 border border-emerald-800"
                  )}
                >
                  {willChurn ? "🚨 SEND 20% RETENTION OFFER" : "✔ STANDARD LOYALTY TIER"}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
              <strong className="text-cyan-400 font-mono">Business Impact: </strong>
              {willChurn
                ? "Flagged for proactive retention intervention before the billing cycle closes."
                : "Customer health is strong; no intervention required."}
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
              Mathematical Formulation: Evaluation Metrics &amp; ROC-AUC
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Formulas for Precision, Recall, F1-Score, and Receiver Operating Characteristic curves
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Precision (Positive Predictive Value)</span>
            <div className="text-xs font-mono text-cyan-300 bg-slate-900 p-2.5 rounded border border-slate-800">
              {"Precision = TP / (TP + FP)"}
            </div>
            <p className="text-xs text-slate-400">
              Percentage of predicted churners who actually cancelled. High precision prevents wasting budget on false alarms.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Recall (Sensitivity / True Positive Rate)</span>
            <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-2.5 rounded border border-slate-800">
              {"Recall = TP / (TP + FN)"}
            </div>
            <p className="text-xs text-slate-400">
              Percentage of actual churners successfully caught by the model. High recall prevents losing revenue.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">F1-Score (Harmonic Mean)</span>
            <div className="text-xs font-mono text-purple-300 bg-slate-900 p-2.5 rounded border border-slate-800">
              {"F1 = 2 · (Prec · Rec) / (Prec + Rec)"}
            </div>
            <p className="text-xs text-slate-400">
              Balances Precision and Recall into a single harmonized scalar score.
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
              Applied customer retention engines across West Bengal commercial enterprises
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Salt Lake Sector V Broadband Provider</span>
            <h3 className="text-base font-bold text-white">Fiber-to-the-Home Churn Defense</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Debangshu deployed an XGBoost churn classifier monitoring 250,000 fiber broadband subscribers. By tuning threshold to 0.35 and triggering automated WhatsApp technician visits for users experiencing packet loss, churn dropped by 22%.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Barrackpore SaaS EdTech</span>
            <h3 className="text-base font-bold text-white">Monthly Subscription Renewal Warning</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mamata and Mahima implemented a churn risk dashboard for an online tutorial portal, identifying students who hadn't logged in for 10 consecutive days and triggering personalized mentor check-in calls.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Ichapur Retail Loyalty Program</span>
            <h3 className="text-base font-bold text-white">Supermarket Inactive Shopper Reactivation</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Susmita constructed an RFM churn classifier identifying customers whose monthly visit frequency dropped by over 50%, distributing targeted SMS festival discount coupons.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Kolkata Regional Cooperative Bank</span>
            <h3 className="text-base font-bold text-white">Salary Account Dormancy Prediction</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Abhronila engineered a Random Forest model predicting deposit account dormancy based on transaction velocity slowdowns, alerting relationship managers 60 days in advance.
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
              Test your understanding of customer churn, precision/recall trade-offs, and decision thresholds
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
            <span>Question {selectedQuizIndex + 1} of {quizQuestions.length}</span>
            <span className="text-indigo-400 font-bold">Retention Concept Check</span>
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
              Churn Analytics Pitfalls &amp; Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Crucial guidelines for building high-ROI customer retention models
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> 4 Critical Churn Traps
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-rose-300">Using Accuracy on Imbalanced Data:</strong> Celebrates 95% accuracy while missing all churners.</li>
              <li><strong className="text-rose-300">Blind 0.50 Threshold:</strong> Missing at-risk customers whose loss costs ₹5,000 in monthly revenue.</li>
              <li><strong className="text-rose-300">Target Leakage with Cancellation Dates:</strong> Including features logged after the user already cancelled.</li>
              <li><strong className="text-rose-300">Ignoring Churn Reasonability:</strong> Reaching out to customers who moved to another state where your network does not operate.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> 4 Best Practice Rules
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-emerald-300">Evaluate with ROC-AUC &amp; PR-AUC:</strong> Measure true ranking capability across all thresholds.</li>
              <li><strong className="text-emerald-300">Apply SMOTE or Class Weighting:</strong> Penalize false negatives heavily during model loss calculation.</li>
              <li><strong className="text-emerald-300">Align Threshold with ROI:</strong> Choose the decision threshold that maximizes net financial savings.</li>
              <li><strong className="text-emerald-300">Deploy Uplift Modeling:</strong> Distinguish customers who stay only if contacted from those who stay anyway.</li>
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
              Interactive standalone lab script for customer churn classification and ROC-AUC evaluation
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="worked_example_3_customer_churn_prediction_lab.py"
          highlightLines={[22, 30, 44, 58]}
        />
      </section>

      {/* FAQ TEMPLATE */}
      <section className="space-y-4">
        <FAQTemplate
          title="Worked Example 3: Customer Churn Prediction — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* PRINTABLE NOTE */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Worked Example 3: Customer Churn Prediction"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 16 Note"
          downloadFileName="topic16_note.txt"
        />
      </section>

      {/* TEACHER NOTE */}
      <section>
        <Teacher
          note="Customer Churn Prediction is where data science directly impacts enterprise profitability. Never be satisfied with simple Accuracy—always check your Confusion Matrix, prioritize Recall when customer loss is expensive, and calibrate your decision threshold to maximize real business ROI!"
        />
      </section>
    </div>
  );
};

export default Topic16;
