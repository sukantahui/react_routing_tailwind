import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic9_files/applications_of_machine_learning_lab.py?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions.js";

const Topic9 = () => {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");

  // Novice Classroom State
  const [selectedLessonTab, setSelectedLessonTab] = useState("intuition");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Interactive Industry Explorer State
  const [selectedIndustry, setSelectedIndustry] = useState("healthcare");

  const svgId = useId();

  // Smooth scroll handler
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 6 Real-World Industry Application Domains
  const industryDomains = {
    healthcare: {
      id: "healthcare",
      title: "Healthcare & Diagnostics",
      icon: "🏥",
      badge: "Medical AI",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      problem: "Early detection of diabetic retinopathy and pneumonia from radiological scans in community health centers.",
      inputs: "High-resolution fundus retinal color photographs (224x224x3 RGB pixel tensors), patient age, HbA1c blood sugar level.",
      mlParadigm: "Supervised Deep Learning (Convolutional Neural Networks - CNN)",
      output: "Disease Severity Grade {0: Healthy, 1: Mild, 2: Moderate, 3: Severe} + Saliency Heatmap",
      regionalCase: "Deployed in Jadavpur and Barrackpore diagnostic labs to assist ophthalmologists in triaging 500 patients daily."
    },
    fintech: {
      id: "fintech",
      title: "Fintech & Digital Banking",
      icon: "💳",
      badge: "Fraud & Risk",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      problem: "Sub-50ms real-time payment fraud detection on UPI transactions across West Bengal payment corridors.",
      inputs: "Transaction amount in ₹, device fingerprint, IP velocity, geo-distance from previous transaction, hour of day.",
      mlParadigm: "Hybrid (Supervised XGBoost + Unsupervised Isolation Forest Anomaly Detection)",
      output: "Fraud Probability Score (0.0 to 1.0) ➔ Block / Step-up OTP Authentication / Instant Approve",
      regionalCase: "Embedded in fintech payment gateways in Salt Lake Sector V processing 2,000,000 daily transactions."
    },
    retail: {
      id: "retail",
      title: "Retail & E-Commerce",
      icon: "🛒",
      badge: "Personalization",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      problem: "Product recommendation and inventory demand forecasting for multi-outlet retail chains.",
      inputs: "Customer purchase history, item view duration, basket co-occurrences, seasonal festival calendars (Durga Puja / New Year).",
      mlParadigm: "Collaborative Filtering + Matrix Factorization + LightGBM Regressor",
      output: "Top-5 Recommended Products list + Weekly Store Stock Quantity in Units",
      regionalCase: "Deployed across retail supermarket outlets in Ichapur and Barrackpore, boosting average cart size by 24%."
    },
    smartGrid: {
      id: "smartGrid",
      title: "Smart Energy & Grid Arbitrage",
      icon: "⚡",
      badge: "Clean Energy",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      problem: "Optimizing solar battery storage charge/discharge cycles against dynamic power grid tariffs.",
      inputs: "Hourly solar radiation forecast, temperature, real-time power tariff (₹/kWh), battery state of charge (SoC %).",
      mlParadigm: "Reinforcement Learning (Deep Q-Network - DQN Agent)",
      output: "Optimal Action at time t: {Charge Battery, Discharge to Grid, Idle Storage}",
      regionalCase: "Deployed on a 5 MW rooftop solar microgrid in Barrackpore, increasing annual clean power revenue by 28%."
    },
    agriculture: {
      id: "agriculture",
      title: "Agri-Tech & Crop Protection",
      icon: "🌾",
      badge: "Smart Farming",
      badgeColor: "bg-green-950 text-green-300 border-green-800",
      problem: "Automated identification of pest infestations and fungal blight from smartphone photos of paddy leaves.",
      inputs: "Smartphone camera photo of rice crop leaf taken by local farmers, humidity and rainfall metrics.",
      mlParadigm: "Edge Computer Vision (MobileNetV3 Classifier running offline on Android)",
      output: "Disease Name (e.g. Brown Spot / Bacterial Leaf Blight) + Recommended Organic Pesticide Treatment",
      regionalCase: "Used by agricultural cooperatives in Hooghly and North 24 Parganas to assist 15,000 smallholder farmers."
    },
    nlp: {
      id: "nlp",
      title: "Natural Language & Bengali AI",
      icon: "🗣️",
      badge: "Language AI",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      problem: "Automated Bengali-to-English translation and voice customer service assistant for government public portals.",
      inputs: "Bengali voice audio recordings from citizen callers or digital text inquiries.",
      mlParadigm: "Sequence-to-Sequence Transformer Models (Whisper + Fine-Tuned LLMs)",
      output: "Accurate English transcription and automated citizen grievance department routing",
      regionalCase: "Integrated in citizen service kiosks across Kolkata and district municipal administrative centers."
    }
  };

  const activeDomain = industryDomains[selectedIndustry];

  // Comprehensive Jargon Glossary Data
  const jargonTerms = [
    {
      id: "collaborative-filtering",
      term: "Collaborative Filtering (Recommenders)",
      category: "retail",
      badge: "E-Commerce",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "kəˈlæb.ə.rə.tɪv ˈfɪl.tər.ɪŋ",
      plainEnglish: "Recommending items to User A based on what similar users (who bought the same things in the past) also enjoyed.",
      everydayAnalogy: "If you and your friend both love Biryani and Mishti Doi, and your friend tries a new Sweet Shop and loves it, the system recommends that shop to you.",
      whyItMatters: "Powers recommendation feeds on Amazon, Netflix, Spotify, and Flipkart."
    },
    {
      id: "computer-vision",
      term: "Computer Vision (CV) & OCR",
      category: "vision",
      badge: "Visual Perception",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "kəmˈpjuː.tər ˈvɪʒ.ən",
      plainEnglish: "Giving computers the ability to inspect images or videos, recognize objects, read written text (OCR), and identify faces.",
      everydayAnalogy: "A security guard looking at a CCTV screen and instantly recognizing authorized employee badges.",
      whyItMatters: "Enables self-driving cars, MRI tumor triage, automated vehicle toll plazas, and photo search."
    },
    {
      id: "nlp-llm",
      term: "Natural Language Processing (NLP)",
      category: "language",
      badge: "Language AI",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "ˈnætʃ.ər.əl ˈlæŋ.ɡwɪdʒ",
      plainEnglish: "The field of machine learning focused on reading, understanding, translating, and generating human language (text and speech).",
      everydayAnalogy: "A fluent bilingual interpreter who can read an official document and summarize it clearly in another language.",
      whyItMatters: "Powers conversational search engines, chatbots, automated translation, and voice assistants."
    },
    {
      id: "edge-ai",
      term: "Edge AI (On-Device Inference)",
      category: "systems",
      badge: "Mobile & IoT",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      pronunciation: "ɛdʒ eɪ-aɪ",
      plainEnglish: "Running machine learning models directly on small local devices (smartphones, drones, cameras) without sending data to the cloud.",
      everydayAnalogy: "Having a pocket calculator on a farm with no internet connection that can instantly compute your crop yield.",
      whyItMatters: "Guarantees zero network latency, preserves privacy, and works in remote rural areas with no internet."
    },
    {
      id: "latency-throughput",
      term: "Inference Latency & Throughput",
      category: "systems",
      badge: "System Speed",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "ˈleɪ.tən.si & ˈθruː.pʊt",
      plainEnglish: "Latency is the time it takes to get one single prediction (e.g. 15 milliseconds). Throughput is how many predictions the server can handle per second (e.g. 10,000 queries/sec).",
      everydayAnalogy: "Latency is how fast one chef serves your plate; Throughput is how many customers the entire restaurant serves per hour.",
      whyItMatters: "UPI payment fraud detection requires latency < 50ms, otherwise customers will abandon their payments."
    },
    {
      id: "concept-drift",
      term: "Concept Drift & Data Drift",
      category: "production",
      badge: "Model Aging",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      pronunciation: "ˈkɒn.sɛpt drɪft",
      plainEnglish: "When real-world human behavior or economic conditions change over time, causing an older model's predictions to become outdated and inaccurate.",
      everydayAnalogy: "Using a 2019 restaurant spending model during the 2020 pandemic lockdowns: shopping habits changed overnight!",
      whyItMatters: "Production models must be monitored and retrained periodically to maintain accuracy."
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
      title: "1. The Big Picture: How AI Solves Real Human Problems",
      tagline: "The 3-Step Problem-to-AI Mapping Framework",
      icon: "🌐",
      intro: "Whenever an engineer or business leader comes to you with a problem, you don't start by writing code. You translate their human problem into a clear mathematical machine learning formulation using 3 simple questions:",
      steps: [
        {
          num: "Question 1",
          title: "What are the Sensory Clues? (Features X)",
          desc: "What data exists? Is it tabular numbers, text documents, audio frequencies, or camera pixel images?"
        },
        {
          num: "Question 2",
          title: "Do We Have Historical Answers? (Supervision Signal)",
          desc: "If yes ➔ Supervised Learning; If no ➔ Unsupervised Clustering; If trial-and-error environment ➔ Reinforcement Learning."
        },
        {
          num: "Question 3",
          title: "What is the Actionable Output? (Target y)",
          desc: "Are we predicting a continuous number (Regression), choosing a category (Classification), or finding groups (Clustering)?"
        },
        {
          num: "Question 4",
          title: "Where Will It Run? (Deployment Constraints)",
          desc: "Does it need sub-50ms real-time latency (like UPI fraud), or can it run overnight in a batch job (like customer segmentation)?"
        }
      ],
      coreTakeaway: "Every real-world ML application is built by methodically mapping domain data inputs X to an actionable mathematical output y."
    },
    verticalsOverview: {
      id: "verticalsOverview",
      title: "2. The 6 Pillars of Modern Applied Machine Learning",
      tagline: "From Healthcare to Agriculture",
      icon: "🏗️",
      intro: "Machine Learning is not confined to tech companies. It powers critical operations across every major sector of the modern economy:",
      cards: [
        {
          title: "1. Healthcare & Life Sciences",
          desc: "Diagnosing retinal disease, predicting sepsis in ICUs, screening CT scans, and discovering new cancer drug molecules.",
          impact: "Saves lives by catching deadly diseases months before physical symptoms manifest."
        },
        {
          title: "2. Banking & Digital Payments",
          desc: "Blocking UPI credit fraud in milliseconds, automated KYC verification, loan default scoring, and algorithmic market trading.",
          impact: "Protects millions of citizens from financial theft and expands credit to underserved populations."
        },
        {
          title: "3. Smart Energy & Green Transition",
          desc: "Optimizing solar battery storage charging schedules, forecasting grid load, and cooling server farms efficiently.",
          impact: "Reduces carbon emissions and cuts commercial energy waste by 30%."
        }
      ],
      coreTakeaway: "Applied ML creates the highest economic value when deployed to automate high-stakes, repetitive, or life-critical decisions."
    }
  };

  // Diagnostic Quiz Questions
  const quizQuestions = [
    {
      id: 0,
      title: "Diagnostic 1: Offline Farm Pest Identification",
      scenario: "A rural development agency wants to deploy an AI crop pest diagnostic tool for smallholder farmers in remote villages of West Bengal with zero internet connectivity. What deployment architecture is required?",
      options: [
        { id: "edge", label: "Edge AI (On-Device Mobile Inference using lightweight quantized models)", isCorrect: true, explanation: "Correct! Edge AI runs lightweight computer vision models directly on the farmer's smartphone chip without requiring internet connection or cloud servers." },
        { id: "cloudHeavy", label: "Heavy Cloud Server requiring 5G broadband connectivity", isCorrect: false, explanation: "Incorrect. Remote rural farms have spotty or zero cellular connectivity; cloud-dependent AI will fail in the field." },
        { id: "batchHadoop", label: "Nightly batch processing on a Hadoop mainframe", isCorrect: false, explanation: "Incorrect. Farmers need instantaneous real-time advice while standing in their field, not overnight batch reports." }
      ]
    },
    {
      id: 1,
      title: "Diagnostic 2: UPI Fraud Latency Constraint",
      scenario: "A payment gateway engineer in Salt Lake Sector V wants to add a 100-layer deep neural network to inspect transactions. The model takes 1,200 milliseconds (1.2 seconds) to evaluate each transaction. Why will this be rejected in production?",
      options: [
        { id: "latencyBreach", label: "Latency Violation: Payment gateways require sub-50ms decisions to prevent user checkout abandonment", isCorrect: true, explanation: "Spot on! In live digital banking, an added 1.2-second lag will cause payment gateways to time out and customers to abandon purchases. Fraud models must evaluate in under 50 milliseconds using fast models like XGBoost." },
        { id: "costError", label: "The neural network will always output 0% fraud", isCorrect: false, explanation: "Incorrect. The issue is execution latency, not model accuracy." },
        { id: "pythonError", label: "Python cannot run models with 100 layers", isCorrect: false, explanation: "Incorrect. Python can run large models, but the server hardware latency violates real-time SLAs." }
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
              BCAC701B • Module 1 • Topic 9
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Real-World AI
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Applications of Machine Learning
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
              Beginner-to-Master Edition
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Applications of Machine Learning in Industry
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Explore how artificial intelligence transforms modern society. Master end-to-end applications across <span className="text-rose-400 font-semibold">Healthcare Diagnostics</span>, <span className="text-cyan-400 font-semibold">Fintech &amp; Banking</span>, <span className="text-emerald-400 font-semibold">Retail &amp; E-Commerce</span>, <span className="text-amber-400 font-semibold">Clean Energy Grids</span>, <span className="text-green-400 font-semibold">Agriculture</span>, and <span className="text-purple-400 font-semibold">NLP</span>, paired with regional case studies and an applications jargon buster.
          </p>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "noviceMasterclass", label: "🎓 Novice Classroom & Jargon Buster" },
              { id: "industryStudio", label: "1. Interactive Industry Explorer Studio" },
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
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-cyan-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-emerald-500/30 border border-emerald-400">
              🌐
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  The Master Teacher&apos;s Novice Classroom: Real-World Applications
                </h2>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                  Zero Jargon Barrier
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                How to translate any messy real-world human problem into a working Machine Learning system
              </p>
            </div>
          </div>
          <div className="text-xs text-emerald-300 bg-emerald-950/70 border border-emerald-800 px-3.5 py-1.5 rounded-xl font-mono">
            Teacher Sukanta Hui • Barrackpore
          </div>
        </div>

        {/* Warm Conversational Teacher Welcome */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950 p-6 rounded-2xl border border-indigo-900/60 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <span>💬</span>
            <span>Teacher Sukanta to a Curious Student:</span>
          </div>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            &quot;Machine learning is not just equations in research papers—it is the invisible intelligence running the modern world! Every time your UPI payment approves in 30 milliseconds, every time YouTube recommends a great lecture, and every time a rural doctor screens an X-ray on a tablet, machine learning is working for humanity. Let us explore the major application domains!&quot;
          </p>
        </div>

        {/* 2 Interactive Lesson Selector Tabs */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: "intuition", title: "1. The 3-Step Problem-to-AI Mapping", icon: "🌐", subtitle: "Translating human needs to ML" },
              { id: "verticalsOverview", title: "2. The 6 Major Industry Verticals", icon: "🏗️", subtitle: "Healthcare to Smart Grids" }
            ].map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setSelectedLessonTab(lesson.id)}
                className={clsx(
                  "p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-2.5",
                  selectedLessonTab === lesson.id
                    ? "bg-slate-900 border-emerald-400 ring-2 ring-emerald-500/50 shadow-xl shadow-emerald-600/20 scale-102"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{lesson.icon}</span>
                  <span className={clsx(
                    "text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase",
                    selectedLessonTab === lesson.id ? "bg-emerald-600 text-white" : "bg-slate-900 text-slate-400"
                  )}>
                    Module {lesson.id === "intuition" ? "1" : "2"}
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
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-indigo-900/60 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{activeClassroomLesson.icon}</span>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">{activeClassroomLesson.title}</h3>
                <span className="text-xs text-emerald-300 font-medium">{activeClassroomLesson.tagline}</span>
              </div>
            </div>
            <span className="text-xs font-mono bg-slate-900 text-slate-400 px-3 py-1 rounded-lg border border-slate-800">
              Interactive Lesson Module
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            {activeClassroomLesson.intro}
          </p>

          {/* Module 1: Steps */}
          {selectedLessonTab === "intuition" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeClassroomLesson.steps.map((st, idx) => (
                <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">{st.num}</span>
                    <h4 className="text-xs sm:text-sm font-bold text-white mt-1">{st.title}</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed mt-2">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Module 2: Verticals */}
          {selectedLessonTab === "verticalsOverview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {activeClassroomLesson.cards.map((c, idx) => (
                <div key={idx} className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2.5">
                  <h4 className="text-sm sm:text-base font-bold text-white">{c.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{c.desc}</p>
                  <div className="text-[11px] font-mono text-emerald-300 bg-slate-950 p-2 rounded border border-slate-800">
                    💡 <strong>Real Impact:</strong> {c.impact}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Core Takeaway */}
          {activeClassroomLesson.coreTakeaway && (
            <div className="bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-800/50 flex items-center gap-2.5 text-xs text-emerald-200">
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
                  Applications &amp; Systems Jargon Buster
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Every applied AI architecture and deployment term translated into plain English
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "all", label: "All Terms" },
                { id: "retail", label: "Recommenders" },
                { id: "vision", label: "Vision & OCR" },
                { id: "language", label: "NLP & Speech" },
                { id: "systems", label: "Systems & Latency" }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedJargonCategory(cat.id)}
                  className={clsx(
                    "px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer",
                    selectedJargonCategory === cat.id
                      ? "bg-emerald-600 text-white font-bold"
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
              placeholder="🔍 Search any application term (e.g. 'Collaborative Filtering', 'Edge AI', 'Latency', 'Drift')..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
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
                className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 hover:border-emerald-500/60 transition-all duration-300 space-y-3 flex flex-col justify-between"
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
                  <span className="text-emerald-300 font-semibold">Why it matters: </span>
                  {item.whyItMatters}
                </div>
              </div>
            ))}
          </div>

          {filteredJargon.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs">
              No matching application terms found for &quot;{jargonSearchQuery}&quot;. Try searching for &quot;Edge&quot;, &quot;Latency&quot;, or &quot;Vision&quot;.
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: INTERACTIVE INDUSTRY EXPLORER STUDIO */}
      {/* ========================================================================= */}
      <section id="industryStudio" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Industry Domain Explorer
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Click through 6 real-world enterprise applications to inspect inputs, models, outputs, and regional cases
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
          {/* Industry Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {Object.entries(industryDomains).map(([key, domain]) => (
              <button
                key={key}
                onClick={() => setSelectedIndustry(key)}
                className={clsx(
                  "p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5",
                  selectedIndustry === key
                    ? "bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/40 text-white shadow-lg shadow-emerald-500/20"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                )}
              >
                <span className="text-2xl">{domain.icon}</span>
                <span className="text-xs font-bold leading-tight">{domain.title.split(" ")[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Domain Deep-Dive Card */}
          <div className="bg-slate-900 p-6 rounded-xl border border-emerald-900/40 space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">{activeDomain.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{activeDomain.title}</h3>
                  <span className={clsx("text-[10px] font-mono font-bold px-2 py-0.5 rounded border", activeDomain.badgeColor)}>
                    {activeDomain.badge}
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-cyan-300 bg-slate-950 px-3 py-1 rounded border border-slate-800">
                {activeDomain.mlParadigm}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-1.5">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase">1. Real-World Problem</span>
                <p className="text-xs text-slate-300 leading-relaxed">{activeDomain.problem}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-1.5">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Raw Input Features (X)</span>
                <p className="text-xs font-mono text-slate-300 leading-relaxed">{activeDomain.inputs}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-1.5">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">3. Actionable Model Output (y)</span>
                <p className="text-xs font-mono text-slate-300 leading-relaxed">{activeDomain.output}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-1.5">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">4. Regional Enterprise Case</span>
                <p className="text-xs text-slate-300 leading-relaxed">{activeDomain.regionalCase}</p>
              </div>
            </div>
          </div>
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
              Formal Mathematical Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              General empirical objective formulation across real-world application pipelines
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Production Loss Formulation</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Industrial ML systems optimize regularized expected risk balancing empirical fidelity with latency constraints:
            </p>
            <div className="text-xs font-mono text-cyan-300 bg-slate-900 p-3 rounded border border-slate-800 overflow-x-auto">
              {"w* = argmin_w [ (1/N) ∑_{i=1}^N L(f(x_i; w), y_i) + λ Ω(w) ]"}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Matrix Factorization (Recommenders)</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Decomposes user-item interaction matrix $R \approx U \cdot V^\top$ into low-rank latent taste vectors:
            </p>
            <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-3 rounded border border-slate-800 overflow-x-auto">
              {"min_{U,V} ∑_{(u,i) ∈ R} (R_{ui} - u_u^T v_i)² + λ (||u_u||² + ||v_i||²)"}
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
              Enterprise deployments operating across West Bengal technology sectors
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-400">Case 1 • Jadavpur Medical Diagnostics</span>
              <span className="text-[10px] px-2 py-0.5 bg-rose-950 text-rose-300 rounded border border-rose-800">Healthcare CNN</span>
            </div>
            <h3 className="text-base font-bold text-white">Diabetic Retinopathy Automated Screening</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Abhronila implemented a DenseNet-121 model deployed in primary health clinics in Jadavpur, processing retinal photographs with 98.4% sensitivity and alerting doctors to microaneurysms before vision loss occurs.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400">Case 2 • Salt Lake Sector V Fintech Hub</span>
              <span className="text-[10px] px-2 py-0.5 bg-cyan-950 text-cyan-300 rounded border border-cyan-800">Sub-50ms Fintech</span>
            </div>
            <h3 className="text-base font-bold text-white">Real-Time UPI Payment Fraud Blocker</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu engineered an on-premise XGBoost classifier evaluating 15 velocity features in 18 milliseconds, blocking ₹4.5 Crore in fraudulent transactions over its first 6 months of live deployment.
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
              Interactive Application Architecture Diagnostic Quiz
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Test your engineering intuition: Solve real-world deployment challenges
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
              Key engineering guidelines for production machine learning deployment
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Deployment Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Ignoring Latency Budgets:</strong> Deploying giant neural networks into live checkout flows where sub-50ms latency is mandatory.</li>
              <li><strong className="text-white">Neglecting Concept Drift:</strong> Forgetting to retrain models as customer habits and economic patterns shift over months.</li>
              <li><strong className="text-white">Lack of Fallback Rules:</strong> Failing to provide a simple deterministic heuristic fallback when the AI service experiences network downtime.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Production Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Quantization &amp; Edge Optimization:</strong> Quantize 32-bit floats to 8-bit integers (INT8) for 4x faster on-device mobile inference.</li>
              <li><strong className="text-white">Continuous Monitoring:</strong> Track input feature distributions daily with Evidently AI or Prometheus to catch data drift early.</li>
              <li><strong className="text-white">A/B Testing Deployments:</strong> Gradually route 5% of production traffic to the new ML model before rolling it out to 100% of users.</li>
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
              Interactive standalone lab script executing multi-domain ML applications in pure Python
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="applications_of_machine_learning_lab.py"
          highlightLines={[25, 26, 35, 45]}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: FAQ TEMPLATE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <FAQTemplate
          title="Applications of Machine Learning — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: PRINTABLE NOTE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Applications of Machine Learning Study Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 9 Note"
          downloadFileName="topic9_note.txt"
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: TEACHER NOTE */}
      {/* ========================================================================= */}
      <section>
        <Teacher
          note="As a machine learning engineer, always remember: models do not create value by sitting in Jupyter Notebooks! They create value when deployed reliably into production systems to serve real people—whether it's diagnosing a patient in Jadavpur, securing a digital payment in Salt Lake, or managing clean energy in Barrackpore. Master the end-to-end pipeline from data cleaning to edge deployment to become a truly impactful AI engineer!"
        />
      </section>
    </div>
  );
};

export default Topic9;
