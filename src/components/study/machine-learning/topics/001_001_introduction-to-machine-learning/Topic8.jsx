import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic8_files/clustering_overview_lab.py?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions.js";

const Topic8 = () => {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");

  // Novice Classroom State
  const [selectedLessonTab, setSelectedLessonTab] = useState("intuition");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Interactive Studio State
  const [clusteringParadigm, setClusteringParadigm] = useState("kmeans");
  const [kChoice, setKChoice] = useState(3);
  const [epsilonRadius, setEpsilonRadius] = useState(30);

  const svgId = useId();

  // Smooth scroll handler
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Comprehensive Jargon Glossary Data
  const jargonTerms = [
    {
      id: "cluster-centroid",
      term: "Centroid & Medoid",
      category: "core",
      badge: "Center Anchor",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "ˈsɛn.trɔɪd & ˈmiː.dɔɪd",
      plainEnglish: "A Centroid is the mathematical average center point (mean vector). A Medoid is an actual real data point located closest to the center.",
      everydayAnalogy: "In a book club: a centroid is the average reading speed of all members; a medoid is the actual member whose speed is closest to the average.",
      whyItMatters: "k-Means uses centroids; k-Medoids uses real points to resist extreme outlier distortion."
    },
    {
      id: "wcss-inertia",
      term: "Inertia / WCSS (Within-Cluster Sum of Squares)",
      category: "metrics",
      badge: "Compactness Metric",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "ɪˈnɜː.ʃə",
      plainEnglish: "The total squared distance from every data point to its assigned cluster centroid. Measures how tightly packed each cluster is.",
      everydayAnalogy: "Measuring how closely students huddle around their teacher in a crowded school playground.",
      whyItMatters: "The objective function minimized during k-Means optimization."
    },
    {
      id: "silhouette-score",
      term: "Silhouette Coefficient",
      category: "metrics",
      badge: "Quality Score",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-800",
      pronunciation: "ˌsɪl.uˈɛt ˌkəʊ.ɪˈfɪʃ.ənt",
      plainEnglish: "A score between -1.0 and +1.0 measuring how close a point is to its own cluster compared to neighboring clusters (+1 = great fit, 0 = on boundary, -1 = wrong cluster).",
      everydayAnalogy: "Asking a wedding guest: 'Do you feel more comfortable at your assigned table (+1.0) or are you eyeing the table next door (-1.0)?'",
      whyItMatters: "The most reliable mathematical metric for evaluating clustering quality without true labels."
    },
    {
      id: "dendrogram",
      term: "Dendrogram & Hierarchical Clustering",
      category: "hierarchical",
      badge: "Tree Hierarchy",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "ˈdɛn.drə.ɡræm",
      plainEnglish: "A tree diagram showing how individual points progressively merge into larger and larger clusters step-by-step.",
      everydayAnalogy: "A family genealogy tree: starting from individual cousins, merging into family branches, and ending at a single great-grandparent.",
      whyItMatters: "Allows engineers to pick the number of clusters after seeing the full hierarchical tree structure."
    },
    {
      id: "dbscan-core-noise",
      term: "DBSCAN: Core, Border, & Noise Points",
      category: "density",
      badge: "Density Roles",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "diː-biː-skæn",
      plainEnglish: "Core points have many neighbors within radius ε. Border points touch a core point. Noise points sit alone in empty space and are ignored as noise.",
      everydayAnalogy: "At a music festival: Core points are dancers in the dense mosh pit; Border points are people standing at the edge; Noise points are individuals sitting alone by the parking lot.",
      whyItMatters: "Allows DBSCAN to discover arbitrary non-linear shapes (like concentric circles) while filtering noisy sensor spikes."
    },
    {
      id: "linkage-criteria",
      term: "Linkage Criteria (Ward, Complete, Single)",
      category: "hierarchical",
      badge: "Distance Rule",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      pronunciation: "ˈlɪŋ.kɪdʒ kraɪˈtɪə.ri.ə",
      plainEnglish: "The mathematical rule defining how distance is measured between two entire clusters of points (Ward minimizes variance; Single uses closest points; Complete uses farthest points).",
      everydayAnalogy: "Measuring distance between two schools: by the distance between their closest gates (Single), farthest gates (Complete), or their main administration centers (Ward).",
      whyItMatters: "Dictates whether hierarchical clusters form compact round balls or long chaining ribbons."
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
      title: "1. The Big Picture: Discovering Natural Tribes",
      tagline: "The School Playground on Day One",
      icon: "🏕️",
      intro: "Imagine 200 fresh students arriving at a college campus in Barrackpore on Day One. Nobody knows each other. By lunch hour, without any teacher assigning groups, you see 4 distinct friend circles form: the football players on the field, the coding enthusiasts around laptops, the musicians near the auditorium, and the debate team in the cafeteria. That natural self-organization is Clustering.",
      steps: [
        {
          num: "No Supervisor",
          title: "Zero External Guidance",
          desc: "Nobody tells the algorithm what the groups should be named or how many people belong in each group."
        },
        {
          num: "Similarity Law",
          title: "High Intra-Cluster Similarity",
          desc: "Points within the same cluster share very similar feature attributes (close together in distance)."
        },
        {
          num: "Separation Law",
          title: "High Inter-Cluster Separation",
          desc: "Different clusters are located far away from each other with clear empty gaps between them."
        },
        {
          num: "Business Interpretation",
          title: "Human Gives the Name",
          desc: "The computer outputs 'Cluster 0, 1, 2'; you as the data scientist inspect the points and name them 'VIP Buyers, Budget Shoppers'."
        }
      ],
      coreTakeaway: "Clustering is the automated discovery of natural cohorts based on feature similarity without human labels."
    },
    threeFamilies: {
      id: "threeFamilies",
      title: "2. The Three Families of Clustering Algorithms",
      tagline: "Partitioning vs Hierarchy vs Density",
      icon: "🏛️",
      intro: "There is no single clustering algorithm that works for every shape. Data scientists choose between 3 major algorithmic families:",
      cards: [
        {
          title: "1. Partitioning (k-Means)",
          badge: "Fast & Spherical",
          desc: "Splits space into k compact spherical regions around centroids. Fast (O(N)), but assumes round clusters and struggles with non-linear shapes.",
          bestFor: "Customer RFM segmentation, large tabular data, fast baselines."
        },
        {
          title: "2. Hierarchical (Agglomerative)",
          badge: "Tree-Based",
          desc: "Builds a nested tree (Dendrogram) by repeatedly merging closest pairs of clusters. No need to pre-specify k upfront.",
          bestFor: "Biological taxonomy, document topic hierarchies, small datasets."
        },
        {
          title: "3. Density-Based (DBSCAN)",
          badge: "Arbitrary Shapes & Noise",
          desc: "Grows clusters along continuous high-density chains. Handles crescent and donut shapes effortlessly and filters outlier noise.",
          bestFor: "Geospatial GPS traffic clusters, sensor anomaly detection, irregular shapes."
        }
      ],
      coreTakeaway: "Use k-Means for large round tabular blobs; use Hierarchical for tree structures; use DBSCAN for complex shapes and noisy data."
    },
    howToPickK: {
      id: "howToPickK",
      title: "3. How to Choose k: The Elbow & Silhouette Methods",
      tagline: "Finding the Sweet Spot Without Guessing",
      icon: "📐",
      intro: "Beginners often ask: 'How do I know whether k should be 3, 4, or 10?' Here are the two scientific methods:",
      cards: [
        {
          title: "The Elbow Method (Inertia vs k)",
          badge: "Visual Heuristic",
          desc: "Plot WCSS on the y-axis against k on the x-axis. As k increases, error drops. Look for the sharp 'elbow' bend where diminishing returns set in.",
          tip: "Pick the value of k right at the elbow joint."
        },
        {
          title: "Silhouette Analysis",
          badge: "Mathematical Rigor",
          desc: "Calculates a cohesion-separation score from -1.0 to +1.0 for each sample. Average Silhouette > 0.6 indicates strong, distinct clusters.",
          tip: "Pick the k that maximizes the average Silhouette score across the dataset."
        }
      ],
      coreTakeaway: "Never guess k blindly. Always validate using the Elbow bend and peak Silhouette score."
    }
  };

  // Diagnostic Quiz Questions
  const quizQuestions = [
    {
      id: 0,
      title: "Diagnostic 1: Concentric Rings & Crescent Clusters",
      scenario: "Mamata is analyzing satellite radar data in Barrackpore where vehicles travel along circular concentric ring roads. She runs k-Means (k=2) and finds that the algorithm draws a straight split through the middle, completely cutting across both rings. What algorithm should she switch to?",
      options: [
        { id: "dbscan", label: "DBSCAN (Density-Based Clustering)", isCorrect: true, explanation: "Correct! k-Means assumes spherical convex blobs and cannot handle non-linear circular or crescent shapes. DBSCAN groups points by continuous density pathways, tracing concentric rings effortlessly." },
        { id: "kmeansK4", label: "k-Means with k = 4", isCorrect: false, explanation: "Incorrect. Increasing k still forces k-Means to create linear Voronoi partitions; it cannot trace curved concentric rings." },
        { id: "linearRegression", label: "Linear Regression", isCorrect: false, explanation: "Incorrect. Linear regression is a supervised technique for continuous target prediction, not clustering." }
      ]
    },
    {
      id: 1,
      title: "Diagnostic 2: Interpreting Silhouette Scores",
      scenario: "Debangshu clusters 10,000 banking customers with k=5 and computes an average Silhouette score of -0.24. What does this negative score indicate?",
      options: [
        { id: "badFit", label: "Severe Misclustering: Data points are closer to neighboring clusters than their assigned cluster", isCorrect: true, explanation: "Spot on! A negative Silhouette score (-1 to 0) indicates that points have been placed into the wrong clusters and are actually closer to neighboring clusters. He should rethink k or scale his features." },
        { id: "perfectFit", label: "The clusters are exceptionally tight and perfect", isCorrect: false, explanation: "Incorrect. A perfect cluster fit yields a score near +1.0, not negative numbers." },
        { id: "syntaxError", label: "A Python floating-point overflow error", isCorrect: false, explanation: "Incorrect. Negative silhouette scores are mathematically valid indicators of poor cluster separation." }
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
              BCAC701B • Module 1 • Topic 8
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Foundational ML
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Clustering Overview
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
              Beginner-to-Master Edition
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Clustering Overview: Algorithms, Metrics &amp; Mechanics
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Explore the algorithmic science of grouping unannotated data. Master <span className="text-emerald-400 font-semibold">Partitioning (k-Means)</span>, <span className="text-purple-400 font-semibold">Hierarchical Trees (Dendrograms)</span>, and <span className="text-cyan-400 font-semibold">Density-Based (DBSCAN)</span> clustering, accompanied by the Elbow method, Silhouette analysis, and a novice jargon buster.
          </p>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "noviceMasterclass", label: "🎓 Novice Classroom & Jargon Buster" },
              { id: "interactiveStudio", label: "1. Interactive Multi-Paradigm Studio" },
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
              🏕️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  The Master Teacher&apos;s Novice Classroom: Clustering
                </h2>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                  Zero Jargon Barrier
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Demystifying k-Means, Hierarchical trees, and DBSCAN density clustering with everyday stories
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
            &quot;Clustering is one of the most exciting tools in all of artificial intelligence. It gives you the superpower to take 100,000 complex customer transactions, medical records, or audio files, and let the algorithm reveal the hidden tribes sleeping inside the data. Let us explore how it works!&quot;
          </p>
        </div>

        {/* 3 Interactive Lesson Selector Tabs */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "intuition", title: "1. The Big Picture", icon: "🏕️", subtitle: "The Campus Playground" },
              { id: "threeFamilies", title: "2. Three Algorithm Families", icon: "🏛️", subtitle: "k-Means, Trees, & DBSCAN" },
              { id: "howToPickK", title: "3. How to Pick k", icon: "📐", subtitle: "Elbow & Silhouette" }
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
                    Module {lesson.id === "intuition" ? "1" : lesson.id === "threeFamilies" ? "2" : "3"}
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

          {/* Module 2: Three Algorithm Families */}
          {selectedLessonTab === "threeFamilies" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {activeClassroomLesson.cards.map((c, idx) => (
                <div key={idx} className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm sm:text-base font-bold text-white">{c.title}</h4>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950 text-emerald-300 border border-slate-800">{c.badge}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{c.desc}</p>
                  <div className="text-[11px] font-mono text-cyan-300 bg-slate-950 p-2 rounded border border-slate-800">
                    <strong>Best for:</strong> {c.bestFor}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Module 3: How to Pick k */}
          {selectedLessonTab === "howToPickK" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {activeClassroomLesson.cards.map((c, idx) => (
                <div key={idx} className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white">{c.title}</h4>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950 text-amber-300 border border-slate-800">{c.badge}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{c.desc}</p>
                  <div className="text-xs font-mono text-emerald-300 bg-slate-950 p-2.5 rounded border border-slate-800">
                    💡 <strong>Teacher Tip:</strong> {c.tip}
                  </div>
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
                  Clustering Jargon Buster
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Every clustering concept and distance metric translated into plain English
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "all", label: "All Terms" },
                { id: "core", label: "Core Anchors" },
                { id: "metrics", label: "Loss & Scores" },
                { id: "hierarchical", label: "Hierarchical Trees" },
                { id: "density", label: "Density & DBSCAN" }
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
              placeholder="🔍 Search any technical term (e.g. 'Silhouette', 'Dendrogram', 'WCSS', 'DBSCAN', 'Linkage')..."
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
              No matching technical terms found for &quot;{jargonSearchQuery}&quot;. Try searching for &quot;Centroid&quot;, &quot;DBSCAN&quot;, or &quot;Silhouette&quot;.
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: INTERACTIVE MULTI-PARADIGM STUDIO */}
      {/* ========================================================================= */}
      <section id="interactiveStudio" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Multi-Paradigm Clustering Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Compare k-Means Partitioning vs DBSCAN Density Exploration on real-time simulated 2D spaces
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
          <div className="flex gap-2">
            <button
              onClick={() => setClusteringParadigm("kmeans")}
              className={clsx(
                "px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer",
                clusteringParadigm === "kmeans"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
              )}
            >
              Mode 1: k-Means Centroid Tuning (k = {kChoice})
            </button>
            <button
              onClick={() => setClusteringParadigm("dbscan")}
              className={clsx(
                "px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer",
                clusteringParadigm === "dbscan"
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 border border-cyan-400"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
              )}
            >
              Mode 2: DBSCAN Density Radius (ε = {epsilonRadius}px)
            </button>
          </div>

          {/* k-Means View */}
          {clusteringParadigm === "kmeans" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs font-mono">
                <span className="text-emerald-300 font-bold">Adjust Number of Centroids (k):</span>
                <div className="flex gap-2">
                  {[2, 3, 4].map((val) => (
                    <button
                      key={val}
                      onClick={() => setKChoice(val)}
                      className={clsx(
                        "px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer",
                        kChoice === val
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
                      )}
                    >
                      k = {val}
                    </button>
                  ))}
                </div>
              </div>

              <svg viewBox="0 0 500 180" className="w-full h-52 bg-slate-900 rounded-xl p-2 border border-slate-800">
                {/* Cluster A */}
                <circle cx="100" cy="90" r="35" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeDasharray="3 3" />
                <circle cx="90" cy="85" r="5" fill="#38bdf8" />
                <circle cx="110" cy="95" r="5" fill="#38bdf8" />
                <circle cx="100" cy="105" r="5" fill="#38bdf8" />
                <polygon points="100,75 106,87 94,87" fill="#fbbf24" stroke="#d97706" />
                <text x="100" y="140" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">Cluster 1 Centroid</text>

                {/* Cluster B */}
                <circle cx="260" cy="90" r="35" fill="#34d399" fillOpacity="0.15" stroke="#34d399" strokeDasharray="3 3" />
                <circle cx="250" cy="85" r="5" fill="#34d399" />
                <circle cx="270" cy="95" r="5" fill="#34d399" />
                <circle cx="260" cy="105" r="5" fill="#34d399" />
                <polygon points="260,75 266,87 254,87" fill="#fbbf24" stroke="#d97706" />
                <text x="260" y="140" fill="#34d399" fontSize="9" textAnchor="middle" fontWeight="bold">Cluster 2 Centroid</text>

                {/* Cluster C (if k>=3) */}
                {kChoice >= 3 && (
                  <g>
                    <circle cx="410" cy="90" r="35" fill="#c084fc" fillOpacity="0.15" stroke="#c084fc" strokeDasharray="3 3" />
                    <circle cx="400" cy="85" r="5" fill="#c084fc" />
                    <circle cx="420" cy="95" r="5" fill="#c084fc" />
                    <circle cx="410" cy="105" r="5" fill="#c084fc" />
                    <polygon points="410,75 416,87 404,87" fill="#fbbf24" stroke="#d97706" />
                    <text x="410" y="140" fill="#c084fc" fontSize="9" textAnchor="middle" fontWeight="bold">Cluster 3 Centroid</text>
                  </g>
                )}
              </svg>
            </div>
          )}

          {/* DBSCAN View */}
          {clusteringParadigm === "dbscan" && (
            <div className="space-y-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-cyan-300 font-bold">Epsilon Neighborhood Radius (ε):</span>
                  <span className="text-cyan-400 font-bold">{epsilonRadius}px</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="5"
                  value={epsilonRadius}
                  onChange={(e) => setEpsilonRadius(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <svg viewBox="0 0 500 180" className="w-full h-52 bg-slate-900 rounded-xl p-2 border border-slate-800">
                {/* Crescent Chain 1 */}
                <path d="M 60,130 Q 150,30 240,130" fill="none" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" />
                <circle cx="60" cy="130" r="6" fill="#06b6d4" />
                <circle cx="100" cy="80" r="6" fill="#06b6d4" />
                <circle cx="150" cy="50" r="6" fill="#06b6d4" />
                <circle cx="200" cy="80" r="6" fill="#06b6d4" />
                <circle cx="240" cy="130" r="6" fill="#06b6d4" />
                <text x="150" y="30" fill="#06b6d4" fontSize="9" textAnchor="middle" fontWeight="bold">DBSCAN Density Crescent A</text>

                {/* Noise Point (Isolated) */}
                <circle cx="360" cy="40" r="6" fill="#f43f5e" />
                <circle cx="360" cy="40" r={epsilonRadius} fill="none" stroke="#f43f5e" strokeDasharray="2 2" />
                <text x="360" y="25" fill="#fda4af" fontSize="9" textAnchor="middle">Filtered Noise Outlier</text>

                {/* Cluster 2 */}
                <circle cx="400" cy="120" r="6" fill="#a855f7" />
                <circle cx="430" cy="125" r="6" fill="#a855f7" />
                <circle cx="415" cy="140" r="6" fill="#a855f7" />
                <text x="415" y="160" fill="#a855f7" fontSize="9" textAnchor="middle">Cluster B Core</text>
              </svg>
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
              k-Means WCSS minimization and Silhouette score coefficient definitions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">k-Means WCSS Objective</span>
            <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-3 rounded border border-slate-800 overflow-x-auto">
              {"WCSS = ∑_{i=1}^k ∑_{x ∈ C_i} ||x - μ_i||²"}
            </div>
            <p className="text-[11px] text-slate-400">
              Minimizes total squared Euclidean distances from all points $x$ to their assigned cluster centroid $\mu_i$.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Silhouette Score Formula</span>
            <div className="text-xs font-mono text-cyan-300 bg-slate-900 p-3 rounded border border-slate-800 overflow-x-auto">
              {"s(i) = (b(i) - a(i)) / max(a(i), b(i))"}
            </div>
            <p className="text-[11px] text-slate-400">
              Where $a(i)$ is mean intra-cluster distance and $b(i)$ is mean distance to the nearest neighboring cluster.
            </p>
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
              Clustering deployments across retail loyalty and smart traffic management
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400">Case 1 • Ichapur Supermarket</span>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded border border-emerald-800">k-Means RFM</span>
            </div>
            <h3 className="text-base font-bold text-white">Shopper RFM Behavioral Segmentation</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Susmita clustered 50,000 loyalty transaction logs into 4 distinct groups (Champions, Loyalists, Dormant Shoppers, and Bargain Seekers) to automate personalized weekend discount SMS delivery.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400">Case 2 • Kolkata Traffic Grid</span>
              <span className="text-[10px] px-2 py-0.5 bg-cyan-950 text-cyan-300 rounded border border-cyan-800">DBSCAN Geospatial</span>
            </div>
            <h3 className="text-base font-bold text-white">Rush-Hour Congestion Hotspot Detection</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu deployed DBSCAN on real-time GPS telemetry from 12,000 public buses in Kolkata, dynamically detecting dense bottleneck clusters along the EM Bypass without predefining cluster shapes.
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
              Interactive Clustering Diagnostic Quiz
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Test your engineering intuition: Solve real-world problem formulations
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
              Key engineering guidelines for clustering algorithms
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Unscaled Distance Distortion:</strong> Running k-Means on raw numbers where ₹1,00,000 spend completely overrides customer age (25 years).</li>
              <li><strong className="text-white">Assuming All Data is Round:</strong> Applying k-Means to long crescent, ring, or snake shapes where DBSCAN is required.</li>
              <li><strong className="text-white">Ignoring Outlier Sensitivity:</strong> Allowing a single extreme outlier to drag k-Means centroids far away from the true cluster center.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Industry Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Standardize Before Distance:</strong> Always apply StandardScaler (mean=0, variance=1) prior to calculating Euclidean distance.</li>
              <li><strong className="text-white">Combine with PCA:</strong> Preprocess high-dimensional features with PCA to eliminate correlation noise before clustering.</li>
              <li><strong className="text-white">Scientific k Selection:</strong> Cross-verify the Elbow curve bend with peak average Silhouette coefficients.</li>
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
              Interactive standalone lab script executing k-Means clustering over student cohorts
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="clustering_overview_lab.py"
          highlightLines={[25, 26, 35, 45]}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: FAQ TEMPLATE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <FAQTemplate
          title="Clustering Overview — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: PRINTABLE NOTE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Clustering Overview Study Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 8 Note"
          downloadFileName="topic8_note.txt"
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: TEACHER NOTE */}
      {/* ========================================================================= */}
      <section>
        <Teacher
          note="Clustering is the most powerful exploratory weapon in an ML engineer's arsenal. When exploring unannotated data, start with k-Means as your quick benchmark. If your clusters have complex non-linear shapes or noisy outliers, switch to DBSCAN. If you need a hierarchical tree for taxonomy, use Agglomerative clustering. Always standardize your features and validate your clusters with the Silhouette score!"
        />
      </section>
    </div>
  );
};

export default Topic8;
