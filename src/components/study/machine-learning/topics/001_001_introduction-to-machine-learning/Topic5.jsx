import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic5_files/unsupervised_learning_lab.py?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions.js";

const Topic5 = () => {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");

  // Novice Classroom State
  const [selectedLessonTab, setSelectedLessonTab] = useState("intuition");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Interactive k-Means Cluster Simulation Studio
  const [kClusters, setKClusters] = useState(3);
  const [selectedCustomerSegment, setSelectedCustomerSegment] = useState("all");

  const svgId = useId();

  // Smooth scroll handler
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 10 Customer shopper records from Ichapur & Kolkata retail stores
  const shoppersData = [
    { id: 1, name: "Mamata (Barrackpore)", spend: 1200, visits: 2, clusterK2: "Budget Shoppers", clusterK3: "Occasional Budget", colorK3: "#38bdf8" },
    { id: 2, name: "Mahima (Kolkata)", spend: 1500, visits: 3, clusterK2: "Budget Shoppers", clusterK3: "Occasional Budget", colorK3: "#38bdf8" },
    { id: 3, name: "Debangshu (Salt Lake)", spend: 1800, visits: 1, clusterK2: "Budget Shoppers", clusterK3: "Occasional Budget", colorK3: "#38bdf8" },
    { id: 4, name: "Susmita (Ichapur)", spend: 6500, visits: 12, clusterK2: "High-Value Frequent", clusterK3: "Loyal Regulars", colorK3: "#34d399" },
    { id: 5, name: "Abhronila (Jadavpur)", spend: 7200, visits: 14, clusterK2: "High-Value Frequent", clusterK3: "Loyal Regulars", colorK3: "#34d399" },
    { id: 6, name: "Tanmoy (Shyamnagar)", spend: 5800, visits: 10, clusterK2: "High-Value Frequent", clusterK3: "Loyal Regulars", colorK3: "#34d399" },
    { id: 7, name: "Priyanka (New Town)", spend: 18500, visits: 6, clusterK2: "High-Value Frequent", clusterK3: "VIP Luxury Splurgers", colorK3: "#c084fc" },
    { id: 8, name: "Rohan (Rajarhat)", spend: 22000, visits: 8, clusterK2: "High-Value Frequent", clusterK3: "VIP Luxury Splurgers", colorK3: "#c084fc" },
    { id: 9, name: "Ananya (Dum Dum)", spend: 19500, visits: 5, clusterK2: "High-Value Frequent", clusterK3: "VIP Luxury Splurgers", colorK3: "#c084fc" },
    { id: 10, name: "Siddhartha (Kalyani)", spend: 950, visits: 1, clusterK2: "Budget Shoppers", clusterK3: "Occasional Budget", colorK3: "#38bdf8" }
  ];

  // Comprehensive Jargon Glossary Data for Unsupervised Learning
  const jargonTerms = [
    {
      id: "unlabeled-data",
      term: "Unlabeled Dataset {x}",
      category: "core",
      badge: "No Answer Key",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "ʌnˈleɪ.bəld ˈdeɪ.tə",
      plainEnglish: "A collection of data points containing only feature columns (x) with zero target answers or predefined categories (no y).",
      everydayAnalogy: "A carton of 5,000 mixed postage stamps from around the world with no album, no country tags, and no catalog.",
      whyItMatters: "More than 90% of all data created on earth is unlabeled because human annotation is slow and costly."
    },
    {
      id: "clustering",
      term: "Clustering (Grouping)",
      category: "clustering",
      badge: "Pattern Discovery",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "ˈklʌs.tə.rɪŋ",
      plainEnglish: "Automatically partitioning unannotated data into natural groups where points inside the same group are very similar to each other.",
      everydayAnalogy: "Entering a wedding banquet hall and watching guests naturally divide themselves into college friends, office colleagues, and relatives.",
      whyItMatters: "Allows businesses to uncover customer segments, market personas, and document themes without human bias."
    },
    {
      id: "centroid",
      term: "Centroid (μ_k)",
      category: "clustering",
      badge: "Cluster Anchor",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "ˈsɛn.trɔɪd",
      plainEnglish: "The mathematical average center point of all data points belonging to a specific cluster.",
      everydayAnalogy: "The imaginary center table in a food court where a group of friends leaves their bags while ordering food.",
      whyItMatters: "k-Means works by repeatedly moving these centroids until they sit dead-center in each cluster."
    },
    {
      id: "euclidean-distance",
      term: "Euclidean Distance",
      category: "clustering",
      badge: "Distance Metric",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-800",
      pronunciation: "juːˈklɪd.i.ən ˈdɪs.təns",
      plainEnglish: "The straight-line ruler distance between two points in geometry (d = √(Δx₁² + Δx₂² + ... + Δxₙ²)).",
      everydayAnalogy: "Measuring the straight-line distance across the sky from Barrackpore Station to Ichapur Station with a laser pointer.",
      whyItMatters: "Clustering algorithms assume that items separated by small Euclidean distances belong to the same real-world concept."
    },
    {
      id: "wcss",
      term: "Inertia / WCSS (Within-Cluster Sum of Squares)",
      category: "clustering",
      badge: "Clustering Loss",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "ɪˈnɜː.ʃə / WCSS",
      plainEnglish: "The total sum of squared distances from every data point to its assigned cluster centroid. Measures how tight the clusters are.",
      everydayAnalogy: "Measuring how closely students huddle around their teacher in a crowded school playground.",
      whyItMatters: "Lower WCSS means tighter, more cohesive clusters. Used in the Elbow Method to pick the best number of clusters (k)."
    },
    {
      id: "elbow-method",
      term: "The Elbow Method",
      category: "clustering",
      badge: "Hyperparameter k",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      pronunciation: "ˈɛl.bəʊ ˈmɛθ.əd",
      plainEnglish: "A visual graph plotting WCSS against the number of clusters (k). The 'elbow' bend is the point of diminishing returns where adding more clusters no longer helps much.",
      everydayAnalogy: "Deciding how many heaters to place in a community hall: 1 is too few, 3 is cozy, 20 is a waste of electricity. The elbow is 3.",
      whyItMatters: "Helps engineers scientifically determine the ideal value of k without blind guessing."
    },
    {
      id: "dim-reduction",
      term: "Dimensionality Reduction",
      category: "dimReduction",
      badge: "Data Compression",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "daɪˌmɛn.ʃəˈnæl.ə.ti rɪˈdʌk.ʃən",
      plainEnglish: "Compressing a table with 300 feature columns down to 2 or 3 principal features while preserving the essential shape and variance.",
      everydayAnalogy: "Creating a 2D world map from the 3D globe of planet Earth so it fits inside a pocket atlas.",
      whyItMatters: "Eliminates redundant correlations, speeds up algorithms by 100x, and allows humans to plot high-dimensional data on a computer screen."
    },
    {
      id: "pca",
      term: "Principal Component Analysis (PCA)",
      category: "dimReduction",
      badge: "Linear Projection",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "P-C-A",
      plainEnglish: "A mathematical technique that rotates the data axes to find the directions of maximum spread (variance) and projects data onto them.",
      everydayAnalogy: "Taking a photograph of an airplane from an angle that captures its full wingspan and fuselage length in a single picture.",
      whyItMatters: "The most widely used linear feature compression technique in data science."
    },
    {
      id: "anomaly-detection",
      term: "Anomaly Detection (Outlier Hunting)",
      category: "anomaly",
      badge: "Outlier Discovery",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "əˈnɒm.ə.li dɪˈtɛk.ʃən",
      plainEnglish: "Spotting rare, unusual observations that deviate drastically from the normal baseline distribution of the crowd.",
      everydayAnalogy: "Spotting someone trying to buy ₹5,00,000 worth of gold jewelry using a credit card in Salt Lake at 3:30 AM when the cardholder normally spends ₹500 on groceries.",
      whyItMatters: "Crucial for catching financial fraud, manufacturing defects in turbines, and network cyberattacks."
    },
    {
      id: "dbscan",
      term: "DBSCAN (Density-Based Clustering)",
      category: "clustering",
      badge: "Arbitrary Shapes",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "diː-biː-skæn",
      plainEnglish: "A clustering algorithm that groups points based on how densely packed they are, and automatically flags lone points in empty space as noise.",
      everydayAnalogy: "Finding islands and archipelagoes on an ocean map by looking at land density, ignoring single stray rocks in deep water.",
      whyItMatters: "Unlike k-Means (which only finds circular blobs), DBSCAN can find complex crescent, ring, and spiral clusters."
    },
    {
      id: "association-rules",
      term: "Association Rule Mining (Market Basket)",
      category: "patterns",
      badge: "Co-occurrence",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      pronunciation: "əˌsəʊ.siˈeɪ.ʃən ruːlz",
      plainEnglish: "Finding hidden relationships between items that frequently occur together in transaction logs (If Item A ➔ then Item B).",
      everydayAnalogy: "A grocery store in Barrackpore noticing that 85% of customers who buy tea leaves also buy Marie biscuits, so they place them on the same shelf.",
      whyItMatters: "Powers e-commerce recommendation carousels ('Frequently bought together')."
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

  // Novice Classroom Step-by-Step Lessons
  const classroomLessons = {
    intuition: {
      id: "intuition",
      title: "1. The Big Picture: Exploring the Unlabeled World",
      tagline: "The Antique Stamp Collector Analogy",
      icon: "🧭",
      intro: "Imagine you walk into your grandfather's attic in Kolkata and find a dusty trunk containing 10,000 antique stamps. There are no country labels, no date stamps, and no price tags. Nobody is there to tell you what is valuable or where each stamp came from. How do you start organizing them?",
      steps: [
        {
          num: "Step 1",
          title: "Examining Raw Features (Clues X)",
          desc: "You look at physical features: stamp shape, paper color, ink type, perforation count, and size."
        },
        {
          num: "Step 2",
          title: "Looking for Natural Proximity (Distance)",
          desc: "You place stamps with blue ink and royal portraits on the left table, and triangular stamps with floral prints on the right table."
        },
        {
          num: "Step 3",
          title: "Forming Piles (Cluster Emergence)",
          desc: "Without anyone telling you the country names, 4 distinct neat piles emerge on your floor."
        },
        {
          num: "Step 4",
          title: "Spotting Oddities (Anomaly Detection)",
          desc: "You notice one stamp made of silk cloth with gold foil. It belongs to none of the 4 piles—it is an outlier!"
        }
      ],
      coreTakeaway: "Unsupervised Learning does not predict an external answer; it uncovers the natural geometric skeleton and hidden groups already sleeping inside the data!"
    },
    theBigThree: {
      id: "theBigThree",
      title: "2. The Three Pillars of Unsupervised Learning",
      tagline: "Clustering, Dimensionality Reduction, & Outlier Detection",
      icon: "🏛️",
      intro: "Unsupervised learning is divided into three major functional pillars depending on what type of pattern discovery you want to achieve.",
      pillars: [
        {
          title: "Pillar 1: Clustering (Grouping Friends)",
          badge: "Grouping",
          color: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300",
          desc: "Splitting unannotated records into cohesive clusters based on geometric closeness.",
          examples: ["Customer spend segmentation in retail", "Topic modeling across 100,000 news articles", "Genetic disease subtype discovery"],
          algorithms: "k-Means, Hierarchical Agglomerative, DBSCAN, Gaussian Mixture Models (GMM)"
        },
        {
          title: "Pillar 2: Dimensionality Reduction (Smart Compression)",
          badge: "Compression",
          color: "border-purple-500/50 bg-purple-950/20 text-purple-300",
          desc: "Condensing 500 feature columns into 2 or 3 essential dimensions without losing core variance.",
          examples: ["Projecting patient health metrics onto a 2D dashboard", "Image compression and noise removal", "Visualizing high-dimensional embeddings"],
          algorithms: "PCA (Principal Component Analysis), t-SNE, UMAP, Autoencoders"
        },
        {
          title: "Pillar 3: Anomaly Detection (Finding the Odd One)",
          badge: "Outlier Hunting",
          color: "border-rose-500/50 bg-rose-950/20 text-rose-300",
          desc: "Identifying rare, abnormal events that deviate drastically from normal baseline cluster behavior.",
          examples: ["Credit card banking fraud triage in Salt Lake", "Turbine motor vibration defect warning in factory", "Network cyberattack intrusion detection"],
          algorithms: "Isolation Forest, One-Class SVM, Local Outlier Factor (LOF)"
        }
      ],
      coreTakeaway: "Clustering groups similar points together; Dimensionality Reduction compresses feature width; Anomaly Detection catches the rare exceptions."
    },
    kmeansWalkthrough: {
      id: "kmeansWalkthrough",
      title: "3. How k-Means Works: The Panchayat Meeting Analogy",
      tagline: "The Simple 4-Step Iterative Dance",
      icon: "📍",
      intro: "k-Means is the most famous clustering algorithm in history. Let's understand it with a simple village story: 3 village panchayat leaders (Centroids) need to choose the best meeting spots so villagers don't have to walk too far.",
      steps: [
        {
          num: "1. Initialization",
          title: "Random Centroid Placement",
          desc: "You choose k=3. Three random meeting tents (Centroids) are pitched anywhere in the village."
        },
        {
          num: "2. Assignment",
          title: "Villagers Walk to Nearest Tent",
          desc: "Every villager (Data point) measures their straight-line distance and joins the closest meeting tent."
        },
        {
          num: "3. Update",
          title: "Moving Tents to the Center",
          desc: "Each leader packs up their tent and moves it to the exact geographical average center of all their assigned villagers."
        },
        {
          num: "4. Convergence",
          title: "Stability Reached",
          desc: "Repeat steps 2 and 3 until the tents stop moving. The optimal clusters have been found!"
        }
      ],
      coreTakeaway: "k-Means is an Expectation-Maximization dance: Assign points to nearest centers ➔ Recompute centers ➔ Repeat until stability."
    }
  };

  // Interactive Diagnostic Quiz for Unsupervised Learning
  const quizQuestions = [
    {
      id: 0,
      title: "Diagnostic 1: Customer Persona Discovery",
      scenario: "A retail supermarket chain in Ichapur has 50,000 loyalty card records with [Monthly Spend in ₹, Shopping Frequency, Items per Basket]. They have no predefined categories or customer labels. They want to create targeted promotional discount tiers. What should they use?",
      options: [
        { id: "kmeans", label: "Unsupervised k-Means Clustering", isCorrect: true, explanation: "Correct! There are zero predefined target labels (y). The goal is to discover natural groupings among shoppers based on spend and frequency features. This is textbook Unsupervised Clustering." },
        { id: "linearReg", label: "Supervised Linear Regression", isCorrect: false, explanation: "Incorrect. You have no continuous target column y to predict. You cannot run regression without ground-truth values." },
        { id: "cnn", label: "Supervised Convolutional Neural Network", isCorrect: false, explanation: "Incorrect. CNNs are for computer vision with image labels. This is a tabular unsupervised clustering problem." }
      ]
    },
    {
      id: 1,
      title: "Diagnostic 2: ATM Card Fraud with 99.9% Clean Data",
      scenario: "A banking hub in Kolkata processes 10,000,000 transactions. Fraud is extremely rare (0.01% of transactions) and fraudsters invent brand new never-before-seen patterns daily. Management wants to flag suspicious transactions. What technique fits best?",
      options: [
        { id: "anomaly", label: "Unsupervised Anomaly Detection (Isolation Forest / One-Class SVM)", isCorrect: true, explanation: "Spot on! Because fraud is ultra-rare and dynamic, unsupervised anomaly detection models normal spending patterns and flags any point in low-density space as a suspicious outlier." },
        { id: "supervisedAcc", label: "Supervised Binary Classifier measuring raw Accuracy", isCorrect: false, explanation: "Incorrect. With 99.99% normal transactions, a naive supervised model predicting 'Not Fraud' for everything gets 99.99% accuracy while catching 0 frauds!" },
        { id: "marketBasket", label: "Market Basket Association Rules", isCorrect: false, explanation: "Incorrect. Association rules find items bought together in grocery carts, not fraud anomalies." }
      ]
    },
    {
      id: 2,
      title: "Diagnostic 3: Visualizing 800 Patient Features on a 2D Screen",
      scenario: "Abhronila is analyzing genomic sequencing records with 800 DNA feature columns per patient. Her team needs to visualize whether disease subgroups exist on a 2D computer monitor scatter plot. What technique should she apply first?",
      options: [
        { id: "pca", label: "Dimensionality Reduction via PCA or t-SNE", isCorrect: true, explanation: "Masterful! Humans cannot visualize 800 dimensions. Dimensionality reduction compresses 800 columns down to 2 principal components while retaining maximum data variance." },
        { id: "kMeansK800", label: "k-Means with k = 800", isCorrect: false, explanation: "Incorrect. Setting k=800 creates 800 tiny clusters, which does not compress the 800 feature axes onto a 2D screen." },
        { id: "linearReg", label: "Logistic Regression", isCorrect: false, explanation: "Incorrect. Logistic regression performs supervised classification; it does not compress feature dimensions for 2D visualization." }
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
              BCAC701B • Module 1 • Topic 5
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Foundational ML
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Unsupervised Learning
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
              Beginner-to-Master Edition
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Unsupervised Learning: The Pattern Discovery Masterclass
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Explore the art of extracting intelligence from raw, unannotated data. Master the core pillars of <span className="text-emerald-400 font-semibold">Clustering (k-Means &amp; DBSCAN)</span>, <span className="text-purple-400 font-semibold">Dimensionality Reduction (PCA)</span>, and <span className="text-rose-400 font-semibold">Anomaly Detection</span>, demystified with clear stories, interactive simulations, and a complete novice jargon-buster.
          </p>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "noviceMasterclass", label: "🎓 Novice Classroom & Jargon Buster" },
              { id: "interactiveStudio", label: "1. Interactive Customer Cluster Studio" },
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
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-emerald-500/30 border border-emerald-400">
              🎓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  The Master Teacher&apos;s Novice Classroom: Unsupervised Learning
                </h2>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                  Zero Jargon Barrier
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Discovering structure, clusters, and hidden patterns in data without any human labels
              </p>
            </div>
          </div>
          <div className="text-xs text-emerald-300 bg-emerald-950/70 border border-emerald-800 px-3.5 py-1.5 rounded-xl font-mono">
            Teacher Sukanta Hui • Barrackpore
          </div>
        </div>

        {/* Warm Conversational Teacher Welcome */}
        <div className="bg-gradient-to-r from-slate-950 via-emerald-950/40 to-slate-950 p-6 rounded-2xl border border-emerald-900/60 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <span>💬</span>
            <span>Teacher Sukanta to a Curious Student:</span>
          </div>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            &quot;Imagine waking up on an uninhabited island with 5,000 exotic plants. Nobody has named them or told you which ones are edible or poisonous. What do you do? You don&apos;t panic; you start observing similarities! You group plants with large waxy leaves in one pile, thorny bushes in another, and flowering vines in a third. That pure, natural instinct of organizing chaos without human instructions is <strong>Unsupervised Learning</strong>.&quot;
          </p>
        </div>

        {/* 3 Interactive Lesson Selector Tabs */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "intuition", title: "1. The Big Picture", icon: "🧭", subtitle: "Grandfather's Stamp Trunk" },
              { id: "theBigThree", title: "2. The Three Pillars", icon: "🏛️", subtitle: "Clustering, PCA & Outliers" },
              { id: "kmeansWalkthrough", title: "3. How k-Means Works", icon: "📍", subtitle: "The Village Panchayat Tents" }
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
                    Module {lesson.id === "intuition" ? "1" : lesson.id === "theBigThree" ? "2" : "3"}
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
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-emerald-900/60 shadow-xl space-y-6">
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

          {/* Module 1: Intuition Steps */}
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

          {/* Module 2: The Three Pillars */}
          {selectedLessonTab === "theBigThree" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {activeClassroomLesson.pillars.map((p, idx) => (
                <div key={idx} className={clsx("p-5 rounded-xl border space-y-3", p.color)}>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm sm:text-base font-bold text-white">{p.title}</h4>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950 text-white font-bold">{p.badge}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
                  <div className="space-y-1 pt-1 border-t border-slate-800/80">
                    <span className="text-[10px] font-mono text-cyan-300 font-bold block">Real Use Cases:</span>
                    <ul className="text-[10px] text-slate-400 space-y-0.5 list-disc list-inside">
                      {p.examples.map((ex, exIdx) => (
                        <li key={exIdx}>{ex}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-[10px] font-mono text-slate-300 bg-slate-950 p-2 rounded border border-slate-800">
                    <strong>Standard Algorithms:</strong> {p.algorithms}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Module 3: k-Means Walkthrough */}
          {selectedLessonTab === "kmeansWalkthrough" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeClassroomLesson.steps.map((st, idx) => (
                <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase">{st.num}</span>
                  <h4 className="text-sm font-bold text-white">{st.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Golden Takeaway */}
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
                  Unsupervised Learning Jargon Buster
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Every technical term in Unsupervised Learning translated into everyday plain English
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "all", label: "All Terms" },
                { id: "core", label: "Core Principles" },
                { id: "clustering", label: "Clustering & Centroids" },
                { id: "dimReduction", label: "Dimensionality (PCA)" },
                { id: "anomaly", label: "Anomaly Detection" }
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
              placeholder="🔍 Search any technical term (e.g. 'Centroid', 'WCSS', 'PCA', 'DBSCAN', 'Elbow Method')..."
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
              No matching technical terms found for &quot;{jargonSearchQuery}&quot;. Try searching for &quot;Centroid&quot;, &quot;PCA&quot;, or &quot;DBSCAN&quot;.
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: INTERACTIVE CUSTOMER CLUSTER STUDIO */}
      {/* ========================================================================= */}
      <section id="interactiveStudio" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Customer Persona Clustering Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Live k-Means clustering over 10 retail shoppers in Ichapur &amp; Kolkata (Adjust k to see how clusters form)
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
          {/* Cluster Count Selector (k = 2 vs k = 3) */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Number of Clusters (k):</span>
              <p className="text-xs text-slate-400">Toggle cluster granularity to see how data naturally splits</p>
            </div>
            <div className="flex gap-2">
              {[2, 3].map((val) => (
                <button
                  key={val}
                  onClick={() => setKClusters(val)}
                  className={clsx(
                    "px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer",
                    kClusters === val
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400"
                      : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
                  )}
                >
                  k = {val} Clusters
                </button>
              ))}
            </div>
          </div>

          {/* 2D Cluster Visualization SVG */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
              <span>Feature X: Monthly Spend (₹1,000 - ₹25,000)</span>
              <span>Feature Y: Store Visits/Month (1 - 15)</span>
            </div>
            <svg viewBox="0 0 500 200" className="w-full h-56 bg-slate-900 rounded-xl p-2 border border-slate-800">
              {/* Grid Lines */}
              <line x1="50" y1="20" x2="50" y2="170" stroke="#334155" strokeWidth="1" />
              <line x1="50" y1="170" x2="470" y2="170" stroke="#334155" strokeWidth="1" />
              <text x="470" y="185" fill="#64748b" fontSize="9" textAnchor="end">Spend (₹) ➔</text>
              <text x="45" y="25" fill="#64748b" fontSize="9" textAnchor="end">Visits ➔</text>

              {/* Cluster 1: Occasional Budget (Bottom Left) */}
              <circle cx="80" cy="150" r="28" fill="#38bdf8" fillOpacity="0.12" stroke="#38bdf8" strokeDasharray="3 3" />
              <circle cx="70" cy="155" r="5" fill="#38bdf8" />
              <circle cx="85" cy="148" r="5" fill="#38bdf8" />
              <circle cx="95" cy="160" r="5" fill="#38bdf8" />
              <circle cx="65" cy="162" r="5" fill="#38bdf8" />
              <text x="80" y="120" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">Cluster A (Budget)</text>

              {/* Cluster 2: Loyal Regulars (Top Center) */}
              <circle cx="210" cy="65" r="30" fill="#34d399" fillOpacity="0.12" stroke="#34d399" strokeDasharray="3 3" />
              <circle cx="200" cy="70" r="5" fill="#34d399" />
              <circle cx="215" cy="60" r="5" fill="#34d399" />
              <circle cx="225" cy="75" r="5" fill="#34d399" />
              <text x="210" y="30" fill="#34d399" fontSize="9" textAnchor="middle" fontWeight="bold">Cluster B (Loyals)</text>

              {/* Cluster 3 (if k=3): VIP Luxury Splurgers (Bottom Right) */}
              <circle cx="410" cy="115" r="32" fill={kClusters === 3 ? "#c084fc" : "#34d399"} fillOpacity="0.12" stroke={kClusters === 3 ? "#c084fc" : "#34d399"} strokeDasharray="3 3" />
              <circle cx="395" cy="120" r="5" fill={kClusters === 3 ? "#c084fc" : "#34d399"} />
              <circle cx="425" cy="110" r="5" fill={kClusters === 3 ? "#c084fc" : "#34d399"} />
              <circle cx="415" cy="125" r="5" fill={kClusters === 3 ? "#c084fc" : "#34d399"} />
              <text x="410" y="75" fill={kClusters === 3 ? "#c084fc" : "#34d399"} fontSize="9" textAnchor="middle" fontWeight="bold">
                {kClusters === 3 ? "Cluster C (VIPs)" : "Merged Cluster B"}
              </text>
            </svg>
          </div>

          {/* Shoppers Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] bg-slate-900/60">
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Monthly Spend (₹)</th>
                  <th className="p-3">Store Visits / Month</th>
                  <th className="p-3">Unsupervised Assigned Cluster ({kClusters === 2 ? "k=2" : "k=3"})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                {shoppersData.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-900/40">
                    <td className="p-3 font-sans font-medium text-white">{s.name}</td>
                    <td className="p-3">₹{s.spend.toLocaleString()}</td>
                    <td className="p-3">{s.visits} visits</td>
                    <td className="p-3 font-bold" style={{ color: kClusters === 3 ? s.colorK3 : "#38bdf8" }}>
                      {kClusters === 3 ? s.clusterK3 : s.clusterK2}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              Formal Mathematical Foundations
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              k-Means objective function, WCSS minimization, and PCA eigenvalue formulations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">k-Means Objective: Within-Cluster Variance</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {"k-Means partitions N observations into k disjoint clusters S = {S_1, S_2, ..., S_k} minimizing the sum of squared Euclidean distances to cluster centroids μ_i:"}
            </p>
            <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-3 rounded border border-slate-800 overflow-x-auto">
              {"J = ∑_{i=1}^k ∑_{x ∈ S_i} ||x - μ_i||²"}
            </div>
            <p className="text-[11px] text-slate-400">
              {"Where μ_i = (1 / |S_i|) ∑_{x ∈ S_i} x is the empirical mean vector of cluster S_i."}
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">PCA Maximum Variance Projection</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Principal Component Analysis finds orthogonal projection vectors $v$ that maximize projected data variance over covariance matrix $\Sigma$:
            </p>
            <div className="text-xs font-mono text-purple-300 bg-slate-900 p-3 rounded border border-slate-800 overflow-x-auto">
              {"Σ v = λ v  where  Σ = (1/N) Xᵀ X"}
            </div>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1 list-disc list-inside pt-1">
              <li><strong className="text-white">$\lambda$:</strong> Eigenvalues representing variance captured.</li>
              <li><strong className="text-white">$v$:</strong> Eigenvectors forming the new orthogonal axes.</li>
            </ul>
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
              Applied unsupervised learning deployments across Bengal industrial hubs
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400">Case 1 • Ichapur Retail Hub</span>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded border border-emerald-800">k-Means Clustering</span>
            </div>
            <h3 className="text-base font-bold text-white">Customer RFM Behavioral Segmentation</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Susmita applied k-Means (k=4) on 40,000 loyalty transaction logs across Ichapur, automatically grouping customers into Champions, Potential Loyalists, and Dormant Shoppers for targeted weekend discounts.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400">Case 2 • Salt Lake Sector V</span>
              <span className="text-[10px] px-2 py-0.5 bg-cyan-950 text-cyan-300 rounded border border-cyan-800">Isolation Forest</span>
            </div>
            <h3 className="text-base font-bold text-white">Digital Payment Real-Time Fraud Triage</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu deployed an Isolation Forest anomaly detector on 5,000,000 UPI payment logs in Salt Lake, isolating abnormal geolocation velocity attacks without needing historical fraud labels.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-400">Case 3 • Jadavpur Genomic Research</span>
              <span className="text-[10px] px-2 py-0.5 bg-purple-950 text-purple-300 rounded border border-purple-800">PCA &amp; t-SNE</span>
            </div>
            <h3 className="text-base font-bold text-white">High-Dimensional DNA Sequence Visualization</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Abhronila used PCA to compress 1,200 genomic biomarker dimensions onto a 2D interactive scatter plot, revealing 3 previously undiscovered diabetic retinopathy patient sub-types.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400">Case 4 • Barrackpore Heavy Machinery</span>
              <span className="text-[10px] px-2 py-0.5 bg-amber-950 text-amber-300 rounded border border-amber-800">DBSCAN</span>
            </div>
            <h3 className="text-base font-bold text-white">Industrial Turbine Vibration Sensor Anomaly</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mamata and Mahima implemented DBSCAN on continuous acoustic turbine telemetry, clustering normal harmonic baseline frequencies and immediately alerting engineers to bearing micro-fracture noise.
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
              Interactive Unsupervised Learning Diagnostic Quiz
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Test your engineering knowledge: Solve real-world problem formulations
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-5">
          {/* Diagnostic Tabs */}
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
              Key engineering guidelines for robust unsupervised machine learning
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Unscaled Features:</strong> Running k-Means on unstandardized data (e.g. Income in ₹ vs Age in years) where large numbers completely dominate Euclidean distances.</li>
              <li><strong className="text-white">Expecting Semantic Names:</strong> Expecting k-Means to output &quot;VIP Buyers&quot;; algorithms only output numbers (Cluster 0, 1). Humans must interpret business meaning.</li>
              <li><strong className="text-white">Blindly Picking k:</strong> Guessing the number of clusters without plotting the Elbow Curve or Silhouette score.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Industry Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Always Standardize First:</strong> Apply StandardScaler (Z-score normalization) before running any distance-based algorithm.</li>
              <li><strong className="text-white">Combine with PCA:</strong> Use PCA to reduce high-dimensional noise before running k-Means or DBSCAN clustering.</li>
              <li><strong className="text-white">Silhouette Validation:</strong> Validate cluster cohesion and separation using Silhouette coefficients between -1 and +1.</li>
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
              Interactive standalone lab script executing unsupervised k-Means clustering over retail customer cohorts
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="unsupervised_learning_lab.py"
          highlightLines={[20, 21, 35, 45]}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: FAQ TEMPLATE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <FAQTemplate
          title="Unsupervised Learning — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: PRINTABLE NOTE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Unsupervised Learning Study Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 5 Note"
          downloadFileName="topic5_note.txt"
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: TEACHER NOTE */}
      {/* ========================================================================= */}
      <section>
        <Teacher
          note="Unsupervised learning is the bedrock of exploratory data science. When you receive a raw, unorganized dataset from a client in Kolkata or abroad, never jump straight into supervised modeling! First run PCA to visualize the dimensions and k-Means to discover the natural cohorts sleeping inside the data. Standardize your features, use the Elbow method, and let the data reveal its own story!"
        />
      </section>
    </div>
  );
};

export default Topic5;
