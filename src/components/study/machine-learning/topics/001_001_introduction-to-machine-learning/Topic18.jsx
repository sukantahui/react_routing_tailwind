import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic18_files/worked_example_5_customer_segmentation_lab.py?raw";
import noteText from "./topic18_files/topic18_note.txt?raw";
import questions from "./topic18_files/topic18_questions.js";

const Topic18 = () => {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");

  // Novice Classroom Tab State
  const [selectedLessonTab, setSelectedLessonTab] = useState("intuition");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Interactive Segmentation Studio State
  const [selectedK, setSelectedK] = useState(3); // k = 2, 3, 4
  const [selectedCustomerIndex, setSelectedCustomerIndex] = useState(0);

  const svgId = useId();

  // Synthetic Customer Population across West Bengal Retail Outlets
  const retailCustomers = [
    { id: 1, name: "Mamata (Barrackpore)", recency: 4, frequency: 28, monetary: 42000, persona: "VIP Champions" },
    { id: 2, name: "Mahima (Salt Lake)", recency: 6, frequency: 32, monetary: 58000, persona: "VIP Champions" },
    { id: 3, name: "Debangshu (Kolkata)", recency: 95, frequency: 2, monetary: 3500, persona: "Hibernating At-Risk" },
    { id: 4, name: "Susmita (Ichapur)", recency: 12, frequency: 18, monetary: 14000, persona: "Budget Loyalists" },
    { id: 5, name: "Abhronila (Jadavpur)", recency: 8, frequency: 22, monetary: 19500, persona: "Budget Loyalists" },
    { id: 6, name: "Rohan (Kalyani)", recency: 120, frequency: 1, monetary: 1800, persona: "Hibernating At-Risk" },
    { id: 7, name: "Priya (Howrah)", recency: 3, frequency: 4, monetary: 8500, persona: "Recent New Shoppers" },
    { id: 8, name: "Sourav (Dum Dum)", recency: 7, frequency: 5, monetary: 9200, persona: "Recent New Shoppers" }
  ];

  // Cluster Personas
  const clusterDefinitions = {
    3: [
      {
        clusterId: 0,
        name: "Cluster 0: VIP Champions (Gold Tier)",
        color: "bg-emerald-950 border-emerald-700 text-emerald-300",
        badge: "Highest Lifetime Value",
        description: "High annual spend (>₹40,000), frequent weekly visits (>25/yr), highly engaged.",
        marketingAction: "Exclusive VIP lounge invites, early access to festive Durga Puja collections, priority home delivery."
      },
      {
        clusterId: 1,
        name: "Cluster 1: Budget Loyalists (Silver Tier)",
        color: "bg-indigo-950 border-indigo-700 text-indigo-300",
        badge: "Steady Volume Shoppers",
        description: "Moderate spend (₹12k - ₹25k), consistent monthly grocery purchases, high price sensitivity.",
        marketingAction: "Bulk purchase discounts, loyalty cashback points, seasonal staple item bundles."
      },
      {
        clusterId: 2,
        name: "Cluster 2: Hibernating Shoppers (At-Risk)",
        color: "bg-rose-950 border-rose-700 text-rose-300",
        badge: "Reactivation Needed",
        description: "Have not shopped for >90 days, low annual orders (<3/yr), low monetary contribution.",
        marketingAction: "Win-back SMS coupons (Flat 25% off), customer satisfaction survey to diagnose service issues."
      }
    ]
  };

  // Smooth scroll handler
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Comprehensive Jargon Glossary
  const jargonTerms = [
    {
      id: "rfm-model",
      term: "RFM (Recency, Frequency, Monetary) Model",
      category: "core",
      badge: "Segmentation Core",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      pronunciation: "ɑː-ɛf-ɛm ˈmɒd.əl",
      plainEnglish: "A proven marketing behavioral model: Recency (how recently they bought), Frequency (how often they buy), and Monetary (how much money they spend).",
      everydayAnalogy: "A doctor's vital health triage: Checking blood pressure, pulse, and temperature to categorize patient status.",
      whyItMatters: "Converts messy transactional receipt logs into compact 3D customer profile vectors for clustering."
    },
    {
      id: "k-means-clustering",
      term: "k-Means Clustering",
      category: "clustering",
      badge: "Unsupervised Engine",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "keɪ miːnz ˈklʌs.tər.ɪŋ",
      plainEnglish: "An unsupervised algorithm that automatically groups N data points into k natural clusters by iteratively moving k cluster center-points (centroids).",
      everydayAnalogy: "A teacher setting up 3 study tables in a hall and having students sit at whichever table is physically closest to them.",
      whyItMatters: "Discovers hidden natural customer segments without needing any human labels or training supervision."
    },
    {
      id: "elbow-method",
      term: "Elbow Method (Inertia Curve)",
      category: "validation",
      badge: "k-Selection",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "ˈɛl.bəʊ ˈmɛθ.əd",
      plainEnglish: "Plotting the within-cluster sum of squares (Inertia) for k = 1, 2, 3, 4, 5... and choosing the 'elbow' kink where adding more clusters yields diminishing returns.",
      everydayAnalogy: "Finding the sweet spot between serving 1 generic meal to everyone vs cooking 500 individual customized meals.",
      whyItMatters: "Helps engineers choose the optimal number of customer clusters objectively."
    },
    {
      id: "silhouette-score",
      term: "Silhouette Score (-1 to +1)",
      category: "validation",
      badge: "Cluster Quality",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "ˌsɪl.uˈɛt skɔː",
      plainEnglish: "A score measuring how tightly grouped samples are inside their own cluster compared to how well separated they are from neighboring clusters.",
      everydayAnalogy: "Checking that students at Table A are talking closely with each other and sitting comfortably far away from Table B.",
      whyItMatters: "Scores near +1.0 indicate crisp, well-separated, distinct customer personas."
    },
    {
      id: "centroid",
      term: "Cluster Centroid (μ_k)",
      category: "clustering",
      badge: "Prototype Vector",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      pronunciation: "ˈsɛn.trɔɪd",
      plainEnglish: "The mathematical average / center point of all data points belonging to a specific cluster.",
      everydayAnalogy: "The 'Archetype' or average representative persona of a customer group (e.g. Average Gold VIP spends ₹48,000/yr).",
      whyItMatters: "Marketing campaigns are designed specifically around the centroid profile of each segment."
    }
  ];

  // Diagnostic Quiz Questions
  const quizQuestions = [
    {
      question: "Why MUST feature scaling (e.g. StandardScaler) be applied before running k-Means clustering on RFM data?",
      options: [
        "Because k-Means only accepts numbers between 0 and 1.",
        "Monetary values (₹40,000) have vastly larger scales than Frequency (20 visits), causing distance calculations to be 99.9% dominated by money alone.",
        "Without scaling, Python throws a syntax error.",
        "It makes the dataset file size smaller."
      ],
      correctIndex: 1,
      explanation: "k-Means uses Euclidean distance: d = √((ΔR)² + (ΔF)² + (ΔM)²). If Monetary is measured in ₹ tens of thousands while Frequency is 1 to 30, the Monetary dimension will completely overpower the distance metric, making Recency and Frequency irrelevant."
    },
    {
      question: "In the Elbow Method for selecting k in k-Means, what does the 'elbow' point represent?",
      options: [
        "The point where training loss reaches exactly zero.",
        "The optimal number of clusters k where inertia reduction transitions from rapid progress to diminishing returns.",
        "The point where all clusters have identical numbers of samples.",
        "The computer's maximum CPU capacity."
      ],
      correctIndex: 1,
      explanation: "As k increases, within-cluster variance (Inertia) naturally drops. The 'elbow' is the point of inflection where adding another cluster provides minimal additional structural benefit."
    },
    {
      question: "What is the primary difference between Supervised Classification (Topic 16 Churn) and Unsupervised Segmentation (Topic 18)?",
      options: [
        "Supervised uses Python; Unsupervised uses R.",
        "Supervised learns from known ground truth target labels (y); Unsupervised discovers natural groupings from features alone (X) without any target labels.",
        "Unsupervised models are always 100% accurate.",
        "Supervised learning cannot process tabular numbers."
      ],
      correctIndex: 1,
      explanation: "In customer churn, we have a clear target label y ∈ {0, 1} indicating whether each customer left. In customer segmentation, there are no target labels y—the algorithm groups customer vectors X purely by geometric proximity in feature space."
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

  const activeCustomer = retailCustomers[selectedCustomerIndex];

  return (
    <div className="space-y-10 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16 px-4 sm:px-6">
      {/* HEADER BANNER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-3xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Module 1 • Topic 18
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Unsupervised Learning
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              RFM Modeling &amp; k-Means
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Worked Example 5: Customer Segmentation
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            A comprehensive, hands-on walkthrough of unsupervised customer clustering. Master the RFM (Recency, Frequency, Monetary) behavioral model, k-Means centroid optimization, Elbow method selection, and marketing persona activation.
          </p>

          <div className="flex flex-wrap gap-2 pt-3">
            {[
              { id: "noviceMasterclass", label: "🎓 Master Teacher's Classroom", icon: "👨‍🏫" },
              { id: "simulator", label: "⚡ Interactive RFM Studio", icon: "🔬" },
              { id: "theory", label: "📐 k-Means Centroid Mathematics", icon: "⚙️" },
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
                How Unsupervised AI Discovers Groups: The Market Stall Analogy
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
            <span>👋 Welcome, student! Let us explore how AI finds patterns without any teacher or labels.</span>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Imagine you manage a large supermarket chain in Ichapur and Barrackpore with 50,000 customers. Nobody gave you a label saying <em>"This person is a VIP"</em> or <em>"This person is a bargain hunter"</em>. But by looking at their receipt transaction history—how recently they visited (<strong>Recency</strong>), how many times they bought this year (<strong>Frequency</strong>), and their total expenditure in ₹ (<strong>Monetary</strong>)—unsupervised clustering automatically groups them into natural cohorts!
          </p>
          <p className="text-sm text-indigo-200 font-medium">
            Let us explore how the k-Means algorithm discovers these marketing personas automatically.
          </p>
        </div>

        {/* Sub-Lesson Tabs */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
            {[
              { id: "intuition", label: "1. The RFM Behavioral Pillars", icon: "📊" },
              { id: "kmeans", label: "2. The k-Means Dance (Iterative Centroids)", icon: "🔄" },
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

          {/* Sub-Lesson 1: RFM Pillars */}
          {selectedLessonTab === "intuition" && (
            <div className="space-y-6 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>📊</span> The 3 Pillars of Customer RFM Modeling
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">1. Recency (R)</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Days since the customer's last purchase. Lower number = highly active and engaged. High number (&gt;90 days) = at risk of permanent churning.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase">2. Frequency (F)</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Total count of completed transactions over a 12-month period. Demonstrates customer loyalty and routine habit strength.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase">3. Monetary (M)</span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Total cumulative revenue generated in ₹. Helps businesses differentiate high-margin premium spenders from casual bargain shoppers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Lesson 2: k-Means Dance */}
          {selectedLessonTab === "kmeans" && (
            <div className="space-y-4 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🔄</span> How k-Means Optimizes Clusters in 2 Steps
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The algorithm iterates through a simple two-step dance until convergence:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/60 space-y-2">
                    <span className="text-xs font-bold text-indigo-300 uppercase">Step 1: Assignment Step</span>
                    <p className="text-slate-300">
                      Every customer is assigned to the nearest cluster centroid based on Euclidean distance in normalized RFM space.
                    </p>
                  </div>
                  <div className="bg-cyan-950/40 p-4 rounded-xl border border-cyan-800/60 space-y-2">
                    <span className="text-xs font-bold text-cyan-300 uppercase">Step 2: Update Step</span>
                    <p className="text-slate-300">
                      Each centroid is recomputed as the exact mathematical mean (average position) of all customers assigned to that cluster.
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
                    { id: "core", label: "RFM Core" },
                    { id: "clustering", label: "Clustering" },
                    { id: "validation", label: "Validation" }
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
                    placeholder="Search Worked Example 5 jargon..."
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

      {/* SECTION 1: INTERACTIVE RFM SEGMENTATION STUDIO */}
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
              Interactive RFM Customer Segmentation Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Inspect retail customer profiles, adjust cluster count k, and explore actionable marketing persona strategies
            </p>
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 overflow-x-auto">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300 font-bold">Select a Customer to View Persona Mapping:</span>
            <span className="text-indigo-400">N = 8 Sample Customers</span>
          </div>

          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase bg-slate-900/60">
                <th className="p-3">Customer ID</th>
                <th className="p-3">Customer Name</th>
                <th className="p-3">Recency (R)</th>
                <th className="p-3">Frequency (F)</th>
                <th className="p-3">Monetary (M)</th>
                <th className="p-3 text-emerald-400">Assigned Persona</th>
              </tr>
            </thead>
            <tbody>
              {retailCustomers.map((cust, idx) => (
                <tr
                  key={cust.id}
                  onClick={() => setSelectedCustomerIndex(idx)}
                  className={clsx(
                    "border-b border-slate-900 cursor-pointer transition-all",
                    selectedCustomerIndex === idx
                      ? "bg-indigo-950/60 text-white font-semibold"
                      : "hover:bg-slate-900/40 text-slate-300"
                  )}
                >
                  <td className="p-3 font-mono text-cyan-400">CUST-0{cust.id}</td>
                  <td className="p-3">{cust.name}</td>
                  <td className="p-3 font-mono">{cust.recency} days</td>
                  <td className="p-3 font-mono">{cust.frequency} orders/yr</td>
                  <td className="p-3 font-mono">₹{cust.monetary.toLocaleString()}</td>
                  <td className="p-3 font-mono font-bold text-emerald-300">{cust.persona}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Persona Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {clusterDefinitions[3].map((cluster) => (
            <div key={cluster.clusterId} className={clsx("p-5 rounded-2xl border space-y-3", cluster.color)}>
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono">{cluster.name}</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700">
                  {cluster.badge}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{cluster.description}</p>
              <div className="pt-2 border-t border-slate-800 text-xs">
                <strong className="text-amber-400">Recommended Marketing Strategy:</strong>
                <p className="text-slate-300 mt-1">{cluster.marketingAction}</p>
              </div>
            </div>
          ))}
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
              Mathematical Formulation: k-Means &amp; Inertia Objective
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Within-cluster sum of squares (WCSS) minimization and centroid derivations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">1. Objective Function (WCSS Inertia)</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              k-Means partitions N data points into k disjoint sets {"S = {S_1, S_2, ..., S_k}"} to minimize within-cluster sum of squares:
            </p>
            <div className="text-xs font-mono text-indigo-300 bg-slate-900 p-3 rounded-lg border border-slate-800 overflow-x-auto">
              {"𝒥_{k-means} = ∑_{i=1}^k ∑_{x ∈ S_i} || x - μ_i ||_2^2"}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">2. Centroid Update Equation</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              At each step, each centroid {"μ_i"} is updated as the center of mass of its assigned cluster partition:
            </p>
            <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-3 rounded-lg border border-slate-800 overflow-x-auto">
              {"μ_i = (1 / |S_i|) ∑_{x ∈ S_i} x"}
            </div>
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
              Applied customer segmentation and RFM clustering deployed across West Bengal
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Ichapur Supermarket Chain</span>
            <h3 className="text-base font-bold text-white">Loyalty Card Behavioral Clustering</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Susmita segmented 45,000 retail loyalty shoppers into 4 RFM clusters, tailoring WhatsApp weekly discount leaflets by persona. Customer visit frequency rose by 26% across 6 suburban branches.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Salt Lake Sector V E-Commerce</span>
            <h3 className="text-base font-bold text-white">Festive Puja Apparel Buyer Personas</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Debangshu deployed k-Means clustering on 120,000 online shoppers during Durga Puja season, identifying high-spending ethnic wear shoppers and optimizing targeted digital advertising spend.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Barrackpore Academic Lab</span>
            <h3 className="text-base font-bold text-white">Student Study Rhythm Clustering</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mamata and Mahima clustered 1,500 college students based on LMS assignment turnaround times and online quiz attempts, identifying distinct learner profiles for personalized mentoring.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Kolkata Regional Banking</span>
            <h3 className="text-base font-bold text-white">Credit Card Spend Persona Segmentation</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Abhronila implemented RFM clustering on credit card transaction logs, creating tailored reward programs for Travel Enthusiasts, Dining Lovers, and Essential Grocery Shoppers.
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
              Test your understanding of RFM segmentation, k-Means clustering, and Elbow method selection
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
            <span>Question {selectedQuizIndex + 1} of {quizQuestions.length}</span>
            <span className="text-indigo-400 font-bold">Segmentation Concept Check</span>
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
              Clustering Pitfalls &amp; Industry Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Key engineering guidelines for reliable customer segmentation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> 4 Critical Segmentation Traps
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-rose-300">Unscaled RFM Dimensions:</strong> Letting monetary spend in ₹ dominate distance metrics.</li>
              <li><strong className="text-rose-300">Random Initialization Traps:</strong> Bad initial centroid placement causing local minima convergence.</li>
              <li><strong className="text-rose-300">Arbitrary k-Selection:</strong> Guessing k = 5 without verifying Elbow or Silhouette plots.</li>
              <li><strong className="text-rose-300">Ignoring Outliers:</strong> Single wholesale purchases distorting centroid coordinates.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> 4 Best Practice Clustering Rules
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-emerald-300">Standardize Features with StandardScaler:</strong> Equalize variance across R, F, and M dimensions.</li>
              <li><strong className="text-emerald-300">Use k-Means++ Initialization:</strong> Spread initial centroids far apart to guarantee faster, better convergence.</li>
              <li><strong className="text-emerald-300">Combine Elbow &amp; Silhouette Analysis:</strong> Choose k with high silhouette score and distinct business meaning.</li>
              <li><strong className="text-emerald-300">Profile Centroid Personas:</strong> Translate centroid numbers into clear actionable marketing playbooks.</li>
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
              Interactive standalone lab script for RFM customer segmentation and k-Means clustering
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="worked_example_5_customer_segmentation_lab.py"
          highlightLines={[18, 26, 38, 52]}
        />
      </section>

      {/* FAQ TEMPLATE */}
      <section className="space-y-4">
        <FAQTemplate
          title="Worked Example 5: Customer Segmentation — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* PRINTABLE NOTE */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Worked Example 5: Customer Segmentation"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 18 Note"
          downloadFileName="topic18_note.txt"
        />
      </section>

      {/* TEACHER NOTE */}
      <section>
        <Teacher
          note="Customer segmentation demonstrates the power of unsupervised learning to turn unorganized customer transactions into strategic marketing insights. Always standardize your RFM features, verify your optimal k with the Elbow method, and give your clusters clear persona names so marketing teams can act on them!"
        />
      </section>
    </div>
  );
};

export default Topic18;
