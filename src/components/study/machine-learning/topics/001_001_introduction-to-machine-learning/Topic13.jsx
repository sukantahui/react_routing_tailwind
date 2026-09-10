import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic13_files/real_world_machine_learning_examples_lab.py?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions.js";

const Topic13 = () => {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");

  // Novice Classroom Tab State
  const [selectedLessonTab, setSelectedLessonTab] = useState("archetypes");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Interactive System Architecture State
  const [selectedArchitecture, setSelectedArchitecture] = useState("streaming");
  const [requestVolume, setRequestVolume] = useState(1500); // Req/sec

  const svgId = useId();

  // Smooth scroll handler
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 4 Real-World Architecture Archetypes
  const systemArchetypes = {
    streaming: {
      id: "streaming",
      title: "1. Real-Time Streaming Inference (<50ms)",
      icon: "⚡",
      badge: "Sub-50ms SLA",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      description: "Low-latency scoring triggered instantly by user actions (e.g. UPI payment swipe, credit card fraud check, biometric login).",
      dataPipeline: "Kafka Stream ➔ Online Feature Store (Redis) ➔ ONNX / C++ Runtime ➔ Instant Decision",
      exampleCase: "UPI Fraud Detection in Kolkata Salt Lake Sector V checking 2,500 transactions/sec.",
      tradeoff: "Extreme low latency requirement prevents running heavy deep neural networks; lightweight gradient boosted trees (LightGBM) or compiled linear models are favored."
    },
    batch: {
      id: "batch",
      title: "2. Batch Offline Scoring (Nightly/Hourly)",
      icon: "📦",
      badge: "High Throughput",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      description: "High-volume scheduled scoring running over millions of historical customer records without tight latency constraints (e.g. churn risk scores, credit limits).",
      dataPipeline: "Data Warehouse (Snowflake / BigQuery) ➔ PySpark / Dask Cluster ➔ SQL Table Output",
      exampleCase: "Weekly customer churn risk scoring for 500,000 telecom subscribers across West Bengal.",
      tradeoff: "Latency is not an issue (can take 2 hours to compute), allowing complex ensemble models, but predictions are pre-computed and not dynamic to immediate clicks."
    },
    recommender: {
      id: "recommender",
      title: "3. Two-Stage Candidate Retrieval & Ranking",
      icon: "🎯",
      badge: "Funnel Architecture",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      description: "Two-stage funnel for search and feeds: Stage 1 filters 10 million items down to 500 candidates via approximate nearest neighbors (ANN), Stage 2 ranks top 5 using a heavy model.",
      dataPipeline: "10M Products ➔ Fast Vector Search (Faiss / HNSW) ➔ 500 Candidates ➔ Deep Cross-Network ➔ Top-10 Feed",
      exampleCase: "E-commerce product recommendation on Bengali festival apparel in Ichapur and Barrackpore.",
      tradeoff: "Balances extreme scalability with deep personalization accuracy."
    },
    edge: {
      id: "edge",
      title: "4. Embedded Edge & On-Device Vision",
      icon: "📱",
      badge: "Offline Edge AI",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      description: "Models quantized and compressed to execute directly on smartphones, drones, or microcontrollers without internet connectivity.",
      dataPipeline: "Smartphone Camera Sensor ➔ Quantized INT8 MobileNet / TensorFlow Lite ➔ Instant On-Screen Box",
      exampleCase: "Smartphone crop pest detection for farmers in rural Hooghly paddy fields.",
      tradeoff: "Zero cloud server costs and 100% offline privacy, but model size must be under 20MB with quantized weights."
    }
  };

  const activeArch = systemArchetypes[selectedArchitecture];

  // Comprehensive Jargon Glossary
  const jargonTerms = [
    {
      id: "candidate-retrieval",
      term: "Two-Stage Retrieval & Ranking Funnel",
      category: "systems",
      badge: "Scalability Engine",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "ˈkæn.dɪ.dət rɪˈtriː.vəl",
      plainEnglish: "A two-step recommender design: Step 1 uses fast vector math to quickly grab 200 candidates from 10 million items; Step 2 uses a rich neural network to rank the top 5.",
      everydayAnalogy: "A library: First picking 10 books on history from the shelf (retrieval), then carefully reading their summaries to pick the single best 1 book (ranking).",
      whyItMatters: "Scoring 10 million products with a deep neural net on every search query would crash servers; this funnel solves that bottleneck."
    },
    {
      id: "feature-store",
      term: "Feature Store (Online vs Offline)",
      category: "systems",
      badge: "MLOps Backbone",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "ˈfiː.tʃər stɔː",
      plainEnglish: "A centralized repository that stores and serves cleaned features: an ultra-fast in-memory cache (Redis) for live inference and a big database for training.",
      everydayAnalogy: "A restaurant's prepped ingredient bar where chefs can grab chopped garlic in 1 second during dinner rush rather than peeling it on demand.",
      whyItMatters: "Guarantees that training data and live production inference use the exact same feature definitions without discrepancies."
    },
    {
      id: "sla-latency",
      term: "SLA (Service Level Agreement) Latency",
      category: "systems",
      badge: "Production Metric",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "ɛs-ɛl-eɪ ˈleɪ.tən.si",
      plainEnglish: "The strict contractual maximum time limit (in milliseconds) a machine learning model is allowed to take to return a prediction to the user.",
      everydayAnalogy: "A pizza guarantee: 'Delivered in 30 minutes or it is free!' In payment gateways: 'Return fraud score in 40ms or approve transaction!'",
      whyItMatters: "A 99% accurate model is useless if it takes 5 seconds to load and frustrates the user into abandoning the app."
    },
    {
      id: "quantization",
      term: "Model Quantization & Pruning",
      category: "edge",
      badge: "Model Compression",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      pronunciation: "ˌkwɒn.tɪˈzeɪ.ʃən",
      plainEnglish: "Converting heavy 32-bit floating-point weights into compact 8-bit integers, shrinking model file size by 75% so it fits on mobile phones.",
      everydayAnalogy: "Compressing a 50MB raw photograph into a 2MB JPEG that still looks crystal clear on your phone screen.",
      whyItMatters: "Enables complex computer vision models to run inside smart cameras and mobile apps without draining battery."
    },
    {
      id: "cold-start",
      term: "Cold Start Problem",
      category: "systems",
      badge: "Recommender Pitfall",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "kəʊld stɑːt",
      plainEnglish: "The difficulty a recommender system faces when a brand new user registers or a new product is uploaded, having zero past interaction history.",
      everydayAnalogy: "Trying to guess what a complete stranger wants to drink when they walk into your coffee shop for the first time.",
      whyItMatters: "Requires fallback strategies like popularity ranking or category onboarding surveys."
    }
  ];

  // Diagnostic Quiz Questions
  const quizQuestions = [
    {
      question: "In a real-time payment fraud detection system processing 5,000 transactions per second, why can't we run a massive 100-layer transformer model?",
      options: [
        "Banks are legally prohibited from using transformers.",
        "The model's inference latency would exceed the strict sub-50ms SLA, crashing the payment gateway.",
        "Transformers cannot multiply floating point numbers.",
        "Payment gateways only support Python 2.7."
      ],
      correctIndex: 1,
      explanation: "Real-time payment systems operate under strict Service Level Agreements (typically <50ms total response time). A massive deep model takes hundreds of milliseconds, which would create unacceptable checkout delays and timeout errors."
    },
    {
      question: "What is the primary architectural purpose of a Two-Stage (Retrieval + Ranking) Recommender System?",
      options: [
        "To make the user click two buttons before seeing recommendations.",
        "To quickly filter millions of items down to a few hundred candidates, and then rank those candidates with a precise model.",
        "To train the model twice a day automatically.",
        "To separate training data into two equal halves."
      ],
      correctIndex: 1,
      explanation: "Scoring 10,000,000 items with a complex model is computationally impossible in 100ms. Stage 1 (Retrieval) uses fast approximate vector search to pick ~200 items, and Stage 2 (Ranking) applies deep scoring to select the top 5."
    },
    {
      question: "Which of the following describes an 'Edge AI' deployment?",
      options: [
        "A large GPU cluster running in a cloud data center in Mumbai.",
        "A model quantized to 8-bit integers running directly on an Android smartphone without internet access.",
        "A nightly SQL batch script running on a Snowflake data warehouse.",
        "A live REST API hosted on Amazon Web Services."
      ],
      correctIndex: 1,
      explanation: "Edge AI refers to deploying compressed, quantized machine learning models directly onto local client devices (smartphones, IoT sensors, cameras) to provide instant offline inferences with zero cloud server costs."
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
              BCAC701B • Introduction to Machine Learning • Topic 13
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Production Architectures
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Real-World Systems
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Real-World Machine Learning Architectures &amp; Systems
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Understand how Machine Learning models operate in high-throughput industrial environments: streaming inference, batch scoring pipelines, two-stage recommender funnels, and edge AI deployment.
          </p>

          {/* Quick Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-3">
            {[
              { id: "noviceMasterclass", label: "🎓 Master Teacher's Classroom", icon: "👨‍🏫" },
              { id: "interactiveStudio", label: "⚡ Architecture System Studio", icon: "🔬" },
              { id: "theory", label: "📐 Systems Mathematical Formulation", icon: "⚙️" },
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
                How Machine Learning Powers the Modern World
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/90 px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 font-mono">
            <span>⏱️ 15 min real-world tour</span>
          </div>
        </div>

        {/* Teacher's Welcome Dialogue */}
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/60 p-6 rounded-2xl border border-indigo-800/40 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <span>👋 Welcome, student! Let us see how algorithms leave the classroom and run cities.</span>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            In academic textbooks, Machine Learning often looks like a tiny Python script scoring 100 rows in a Jupyter Notebook. But in the real world, when you tap your phone to make a UPI payment at a tea stall in Barrackpore, an ML system evaluates dozens of fraud features and gives an approval signal in less than <strong>30 milliseconds</strong>!
          </p>
          <p className="text-sm text-indigo-200 font-medium">
            Let us explore the 4 major architectural patterns used by Google, Netflix, Amazon, and Indian fintech unicorns to deploy ML models at scale.
          </p>
        </div>

        {/* Sub-Lesson Tabs */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
            {[
              { id: "archetypes", label: "1. The 4 System Archetypes", icon: "🏛️" },
              { id: "funnel", label: "2. The Search & Recs Funnel", icon: "🎯" },
              { id: "latency", label: "3. The Latency vs Accuracy Dilemma", icon: "⏱️" },
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

          {/* Sub-Lesson 1: The 4 System Archetypes */}
          {selectedLessonTab === "archetypes" && (
            <div className="space-y-6 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🏛️</span> The 4 Real-World ML Deployment Patterns
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {Object.values(systemArchetypes).map((arch) => (
                    <div key={arch.id} className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xl">{arch.icon}</span>
                        <span className={clsx("text-[10px] font-mono font-bold px-2 py-0.5 rounded border", arch.badgeColor)}>
                          {arch.badge}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{arch.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{arch.description}</p>
                      <div className="text-xs text-cyan-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono">
                        Pipeline: {arch.dataPipeline}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sub-Lesson 2: The Search & Recs Funnel */}
          {selectedLessonTab === "funnel" && (
            <div className="space-y-4 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🎯</span> The Two-Stage Recommender Funnel
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  How does YouTube find the top 10 videos you want to watch out of 1,000,000,000 available videos in 100 milliseconds?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-cyan-950/40 p-4 rounded-xl border border-cyan-800/60 space-y-2">
                    <span className="text-xs font-bold text-cyan-300 uppercase">Stage 1: Candidate Retrieval (10M ➔ 500)</span>
                    <p className="text-xs text-slate-300">
                      Uses ultra-fast vector dot products and approximate nearest neighbors (HNSW/Faiss). Runs in &lt;10ms to discard 99.99% of irrelevant videos.
                    </p>
                  </div>
                  <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/60 space-y-2">
                    <span className="text-xs font-bold text-emerald-300 uppercase">Stage 2: Precision Ranking (500 ➔ 10)</span>
                    <p className="text-xs text-slate-300">
                      Applies a deep neural network with hundreds of features (historical watch time, device, time of day) on the 500 candidates to select the top 10.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Lesson 3: Latency vs Accuracy */}
          {selectedLessonTab === "latency" && (
            <div className="space-y-4 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-indigo-900/40 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>⏱️</span> The Production Trade-Off: Latency vs Model Size
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  In academia, a model with 98.5% accuracy is always ranked higher than a 97.0% model. In industry, if the 98.5% model takes 800ms to run while the 97.0% model takes 8ms, the 97.0% model is chosen every single time!
                </p>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                  <p>
                    <strong className="text-amber-400">Amazon's Discovery: </strong>
                    Amazon found that every 100 milliseconds of latency cost them 1% in total retail revenue. Speed is a critical feature of any real-world AI system.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Lesson 4: Jargon Buster */}
          {selectedLessonTab === "jargon" && (
            <div className="space-y-6 pt-2">
              {/* Category Filter Pills & Search */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "All Terms" },
                    { id: "systems", label: "System Design" },
                    { id: "edge", label: "Edge & Compression" }
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
                    placeholder="Search systems jargon..."
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

      {/* SECTION 1: INTERACTIVE ARCHITECTURE STUDIO */}
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
              Interactive Production Architecture Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Inspect real-world data pipelines, latency budgets, and infrastructure tradeoffs
            </p>
          </div>
        </div>

        {/* Archetype Selector Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.values(systemArchetypes).map((arch) => (
            <button
              key={arch.id}
              onClick={() => setSelectedArchitecture(arch.id)}
              className={clsx(
                "p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-2 flex flex-col justify-between",
                selectedArchitecture === arch.id
                  ? "bg-indigo-600/30 border-indigo-400 text-white shadow-lg shadow-indigo-600/30"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
              )}
            >
              <span className="text-2xl">{arch.icon}</span>
              <div>
                <h4 className="text-xs font-bold text-white leading-tight">{arch.title}</h4>
                <span className="text-[10px] font-mono text-cyan-400">{arch.badge}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Architecture Deep-Dive */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>{activeArch.icon}</span> {activeArch.title}
            </h3>
            <span className={clsx("px-2.5 py-0.5 text-xs font-mono font-bold rounded border", activeArch.badgeColor)}>
              {activeArch.badge}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">System Pipeline Flow:</span>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-indigo-300">
                {activeArch.dataPipeline}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{activeArch.description}</p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Industrial Trade-Off Analysis:</span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                {activeArch.tradeoff}
              </p>
              <div className="text-xs text-emerald-400 font-mono pt-1">
                Regional Benchmark: {activeArch.exampleCase}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THEORY & SYSTEMS FORMULATION */}
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
              Theoretical Formulation of Large-Scale Systems
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Mathematical representation of candidate retrieval funnels and latency objective constraints
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">1. Two-Stage Retrieval Optimization</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Given a total inventory of items {"|ℐ| = M (e.g. 10^7)"}, the stage-1 retrieval function maps user vector {"u"} to candidate subset {"𝒞 ⊂ ℐ"} with {"|𝒞| = k ≪ M"}:
            </p>
            <div className="text-xs font-mono text-indigo-300 bg-slate-900 p-3 rounded-lg border border-slate-800 overflow-x-auto">
              {"𝒞 = argtop-k_{i ∈ ℐ} ⟨ v_u, v_i ⟩"}
            </div>
            <p className="text-xs text-slate-400">
              Followed by deep ranking scoring: {"s_i = f_{θ}(x_u, x_i) ∀ i ∈ 𝒞"}.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">2. Constrained Empirical Utility</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Production ML maximizes task utility subject to maximum latency SLA and memory capacity constraints:
            </p>
            <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-3 rounded-lg border border-slate-800 overflow-x-auto">
              {"max_w 𝔼_{(x,y)} [ Utility(h(x; w), y) ]"}<br />
              {"s.t.  Latency(h(x; w)) ≤ T_{SLA} (e.g. 50ms)"}
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
              Applied high-performance ML systems engineered in West Bengal
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Salt Lake Sector V Fintech Hub</span>
            <h3 className="text-base font-bold text-white">Sub-30ms Real-Time UPI Fraud Engine</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Debangshu engineered a multi-core C++ ONNX runtime inference microservice connected to an in-memory Redis feature store, evaluating 45 behavioral risk features in 28ms for 2,500 transactions/sec.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Barrackpore Academic Lab</span>
            <h3 className="text-base font-bold text-white">LMS Course Recommendation Engine</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mamata and Mahima implemented a two-stage recommendation funnel for 15,000 university students across 800 online learning modules, boosting elective course completion by 34%.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Ichapur Retail Center</span>
            <h3 className="text-base font-bold text-white">Nightly PySpark Batch Demand Forecaster</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Susmita built a nightly PySpark batch pipeline scoring 120,000 SKU item combinations across 12 grocery outlets, feeding replenishment purchase orders directly into supplier ERP systems.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Jadavpur Agri-Tech Research</span>
            <h3 className="text-base font-bold text-white">Offline Android Edge Vision for Paddy Blight</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Abhronila deployed an INT8 quantized MobileNetV3 model embedded in a lightweight Android APK, allowing rural farmers in Hooghly to detect rice leaf blight completely offline with 94% precision.
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
              Test your understanding of production architectures, SLAs, and recommender funnels
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
            <span>Question {selectedQuizIndex + 1} of {quizQuestions.length}</span>
            <span className="text-indigo-400 font-bold">Systems Concept Check</span>
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
              Systems Engineering Pitfalls &amp; Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Crucial production guidelines for architecting real-world ML systems
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> 4 Production Systems Pitfalls
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-rose-300">Ignoring Latency SLAs:</strong> Designing heavy neural nets that cause payment timeouts.</li>
              <li><strong className="text-rose-300">Training-Serving Skew:</strong> Computing features differently in Python training vs Java live runtime.</li>
              <li><strong className="text-rose-300">Ignoring Cold Start:</strong> Failing to handle brand-new users with zero prior history.</li>
              <li><strong className="text-rose-300">No Fallback Heuristics:</strong> Letting the user see an error page when an ML microservice times out.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> 4 Best Practice System Rules
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-emerald-300">Deploy Centralized Feature Stores:</strong> Ensure training and inference pull identical feature logic.</li>
              <li><strong className="text-emerald-300">Implement Graceful Degradation:</strong> Fall back to simple popularity ranking if complex models timeout.</li>
              <li><strong className="text-emerald-300">Quantize Edge Models:</strong> Convert 32-bit floats to 8-bit integers for mobile performance.</li>
              <li><strong className="text-emerald-300">Monitor Latency p99:</strong> Track 99th percentile latency rather than average response time.</li>
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
              Interactive standalone lab script for real-world high-throughput inference simulation
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="real_world_machine_learning_examples_lab.py"
          highlightLines={[20, 28, 38, 52]}
        />
      </section>

      {/* FAQ TEMPLATE */}
      <section className="space-y-4">
        <FAQTemplate
          title="Real-World Machine Learning Examples — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* PRINTABLE NOTE */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Real-World Machine Learning Examples"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 13 Note"
          downloadFileName="topic13_note.txt"
        />
      </section>

      {/* TEACHER NOTE */}
      <section>
        <Teacher
          note="Real-world Machine Learning is where mathematical beauty meets engineering reality. Always consider latency, feature store consistency, and failover fallbacks. A simple model running in 10 milliseconds reliably will always beat an unserved, crashing deep neural network!"
        />
      </section>
    </div>
  );
};

export default Topic13;
