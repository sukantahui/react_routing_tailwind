import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic6_files/semi_supervised_learning_basic_idea_lab.py?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions.js";

const Topic6 = () => {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");

  // Novice Classroom State
  const [selectedLessonTab, setSelectedLessonTab] = useState("intuition");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Interactive Label Propagation Wave Studio State
  const [propagationStep, setPropagationStep] = useState(1);

  const svgId = useId();

  // Smooth scroll handler
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Comprehensive Jargon Glossary Data for Semi-Supervised Learning
  const jargonTerms = [
    {
      id: "labeled-seed",
      term: "Labeled Seed Set (D_L)",
      category: "core",
      badge: "1-5% of Data",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "ˈleɪ.bəld siːd sɛt",
      plainEnglish: "The tiny fraction of the dataset that has been manually verified, stamped, and labeled by human domain experts.",
      everydayAnalogy: "A doctor taking 2 hours out of their busy schedule to carefully annotate 50 chest scans out of a hospital archive of 10,000.",
      whyItMatters: "Provides the golden ground-truth anchor signal from which all other predictions will spread."
    },
    {
      id: "unlabeled-pool",
      term: "Unlabeled Pool (D_U)",
      category: "core",
      badge: "95-99% of Data",
      badgeColor: "bg-slate-900 text-slate-300 border-slate-700",
      pronunciation: "ʌnˈleɪ.bəld puːl",
      plainEnglish: "The massive collection of free raw observations that contain feature measurements (x) but have no verified target answers (no y).",
      everydayAnalogy: "The remaining 9,950 unreviewed chest X-rays sitting on the hospital server with no diagnosis stamped yet.",
      whyItMatters: "Semi-supervised learning exists specifically to extract value from this free mountain of unlabeled data."
    },
    {
      id: "label-propagation",
      term: "Label Propagation",
      category: "algorithms",
      badge: "Graph Spreading",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "ˈleɪ.bəl ˌprɒp.əˈɡeɪ.ʃən",
      plainEnglish: "An algorithm that treats data points as nodes on a connected web graph and spreads known labels to neighboring nodes along dense pathways.",
      everydayAnalogy: "Dropping a single drop of blue food coloring into a web of wet paper towels: the blue color naturally flows along the wet fibers to neighboring spots.",
      whyItMatters: "Allows instant annotation of thousands of points without training complex heavy neural networks."
    },
    {
      id: "pseudo-labeling",
      term: "Pseudo-Labeling (Self-Training)",
      category: "algorithms",
      badge: "Self-Bootstrapping",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "ˈsjuː.dəʊ ˈleɪ.bəl.ɪŋ",
      plainEnglish: "Training a model on the 2% labeled data, having it predict the 98% unlabeled data, taking only the 99% confident predictions as temporary ground truth, and retraining.",
      everydayAnalogy: "A student who learns 5 math rules, solves 100 practice problems, marks the ones they are 100% sure about, and adds them to their study revision notebook.",
      whyItMatters: "Bootstraps a weak initial model into a much more accurate production model for zero extra labeling cost."
    },
    {
      id: "smoothness-assumption",
      term: "The Smoothness Assumption",
      category: "theory",
      badge: "Core Axiom 1",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "ˈsmuːð.nəs əˈsʌmp.ʃən",
      plainEnglish: "If two data points are very close to each other in a dense region of feature space, they almost certainly share the exact same label.",
      everydayAnalogy: "If two houses in Barrackpore are located on the same street corner with identical architecture, their market price per square foot will be almost identical.",
      whyItMatters: "The foundational mathematical justification allowing labels to spread to close neighbors."
    },
    {
      id: "cluster-assumption",
      term: "The Cluster Assumption (Low-Density Separation)",
      category: "theory",
      badge: "Core Axiom 2",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      pronunciation: "ˈklʌs.tər əˈsʌmp.ʃən",
      plainEnglish: "The true boundary separating different classes naturally passes through empty, low-density valleys, rather than cutting through crowded dense clusters.",
      everydayAnalogy: "A state border line drawn along a wide river or empty mountain ridge, rather than cutting right through the living room of a crowded apartment building.",
      whyItMatters: "Unlabeled data shows the model where the dense clusters are, helping it place the decision boundary in the empty gap."
    },
    {
      id: "manifold-hypothesis",
      term: "The Manifold Hypothesis",
      category: "theory",
      badge: "Core Axiom 3",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      pronunciation: "ˈmæn.ɪ.fəʊld haɪˈpɒθ.ə.sɪs",
      plainEnglish: "High-dimensional data (e.g. 1000-pixel images) actually lies on a much lower-dimensional smooth surface or ribbon embedded within that big space.",
      everydayAnalogy: "A 2D sheet of paper twisted into a 3D ribbon: you only need 2 coordinates along the paper surface to navigate anywhere on it.",
      whyItMatters: "Allows semi-supervised models to trace data paths along the ribbon to propagate labels safely."
    },
    {
      id: "confidence-threshold",
      term: "Confidence Threshold (τ - Tau)",
      category: "algorithms",
      badge: "Quality Filter",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      pronunciation: "ˈkɒn.fɪ.dəns ˈθrɛʃ.həʊld",
      plainEnglish: "A strict cutoff percentage (e.g. 95% or 99%) below which the model refuses to pseudo-label an unannotated sample.",
      everydayAnalogy: "A cautious detective who only enters a clue into the official police logbook if they are at least 95% certain it is genuine.",
      whyItMatters: "Prevents 'confirmation bias' where the model introduces noisy false labels into its own training set."
    },
    {
      id: "transductive-vs-inductive",
      term: "Transductive vs Inductive Learning",
      category: "theory",
      badge: "Scope of Inference",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-800",
      pronunciation: "trænzˈdʌk.tɪv vs ɪnˈdʌk.tɪv",
      plainEnglish: "Transductive only cares about labeling the specific unlabeled points already in the dataset. Inductive learns a general mathematical rule h(x) that can predict future unseen samples.",
      everydayAnalogy: "Transductive is solving just this week's 50 homework questions. Inductive is understanding the physics formula so you can solve any question next year.",
      whyItMatters: "Label Propagation is transductive; Pseudo-labeling with neural networks is inductive."
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
      title: "1. The Big Picture: The ₹10 Lakh Doctor Dilemma",
      tagline: "Why 98% Unlabeled Data is Pure Gold",
      icon: "🩺",
      intro: "Imagine you are the director of a major medical hospital in Jadavpur, Kolkata. You have 50,000 chest X-rays stored on hospital hard drives. You want to build an AI to diagnose pneumonia. A senior radiologist charges ₹1,000 per scan to review and label them. Labeling all 50,000 would cost ₹5 Crore (₹50 Million) and take 3 years!",
      steps: [
        {
          num: "The Dilemma",
          title: "The Human Annotation Bottleneck",
          desc: "You can only afford to have the radiologist label 1,000 scans (2% of the dataset). The other 49,000 scans are completely unlabeled."
        },
        {
          num: "The Mistake",
          title: "Throwing Away the 49,000 Scans",
          desc: "Naive engineers throw away the 49,000 scans and train only on the 1,000 labeled scans. The model performs poorly because 1,000 samples is too small."
        },
        {
          num: "The Solution",
          title: "Semi-Supervised Synergy",
          desc: "Semi-Supervised Learning uses the 49,000 unlabeled scans to learn the natural visual shape and variations of human lungs, and uses the 1,000 labeled scans to anchor the diagnosis."
        },
        {
          num: "The Result",
          title: "95% Accuracy at 2% of the Cost",
          desc: "The hybrid model reaches senior-radiologist accuracy while saving 98% of the data labeling budget!"
        }
      ],
      coreTakeaway: "Semi-Supervised Learning marries a small labeled seed set (D_L) with a massive unlabeled pool (D_U) to achieve enterprise-grade AI at a fraction of the cost."
    },
    theTwoMethods: {
      id: "theTwoMethods",
      title: "2. The Two Core Engines: Label Propagation & Pseudo-Labeling",
      tagline: "The Whisper Chain vs The Confident Self-Teacher",
      icon: "🔄",
      intro: "There are two primary ways semi-supervised algorithms extract knowledge from unlabeled data.",
      methods: [
        {
          title: "Method A: Label Propagation (The Whisper Chain)",
          badge: "Graph-Based",
          color: "border-purple-500/50 bg-purple-950/20 text-purple-300",
          desc: "Every data point is treated as a person in a crowded room connected by invisible string to their nearest neighbors. If the 2 seed people at the front know the secret exam date, they whisper it to their connected friends, who whisper to their friends, until the entire room is labeled.",
          howItWorks: "Constructs an affinity matrix W based on Gaussian distance e^(-||x_i - x_j||² / 2σ²) and iteratively propagates label distributions."
        },
        {
          title: "Method B: Pseudo-Labeling (Self-Training Bootstrapping)",
          badge: "Model-Based",
          color: "border-cyan-500/50 bg-cyan-950/20 text-cyan-300",
          desc: "Train a standard model on your 2% labeled seed data. Run predictions on all 98% unlabeled records. Whenever the model is 99% confident (e.g. probability ≥ 0.99), stamp that prediction as a 'pseudo-label' and add it to the training set. Repeat!",
          howItWorks: "Iterative student-teacher training loop: Model teaches itself on high-confidence predictions to expand its effective training volume."
        }
      ],
      coreTakeaway: "Label Propagation spreads labels directly across geometric graph networks; Pseudo-Labeling uses model confidence to generate synthetic training data."
    },
    threeAssumptions: {
      id: "threeAssumptions",
      title: "3. The 3 Golden Assumptions (When Does It Work?)",
      tagline: "Smoothness, Low-Density Valley, & Manifold Ribbon",
      icon: "📐",
      intro: "Semi-supervised learning is not magic. It relies on 3 fundamental mathematical properties of real-world data distributions.",
      assumptions: [
        {
          num: "Axiom 1",
          name: "Smoothness Assumption",
          desc: "Points close together in high-density regions share the same label. If patient X has identical lung density to patient Y, both have pneumonia."
        },
        {
          num: "Axiom 2",
          name: "Cluster Assumption (Low-Density Separation)",
          desc: "The true boundary between healthy lungs and diseased lungs lies in an empty gap between clusters, not right through a cluster core."
        },
        {
          num: "Axiom 3",
          name: "Manifold Assumption",
          desc: "Even though images have 1,000,000 pixels, human chest anatomy lives on a simple lower-dimensional structural manifold."
        }
      ],
      coreTakeaway: "If classes are hopelessly overlapping with no empty valleys between them, semi-supervised learning cannot help."
    }
  };

  // Interactive Diagnostic Quiz
  const quizQuestions = [
    {
      id: 0,
      title: "Diagnostic 1: Hospital Chest X-Ray Triage",
      scenario: "A diagnostic clinic in Barrackpore has 30,000 historical X-ray scans. Radiologists had time to annotate only 600 scans with disease tags. The remaining 29,400 scans are unannotated. Which approach is mathematically and economically optimal?",
      options: [
        { id: "semi", label: "Semi-Supervised Learning (Label Propagation / Pseudo-labeling)", isCorrect: true, explanation: "Correct! You have a small labeled seed set (600 scans = 2%) and a massive unlabeled pool (29,400 scans = 98%). Semi-supervised methods leverage the unannotated scans to reach high diagnostic accuracy at minimal cost." },
        { id: "pureSupervised", label: "Supervised Learning on 600 scans only, discarding the 29,400 scans", isCorrect: false, explanation: "Incorrect. Discarding 98% of your data leads to severe overfitting and poor generalization. The 29,400 unlabeled scans contain immense structural value." },
        { id: "discardLabels", label: "Unsupervised k-Means clustering, ignoring all 600 doctor labels", isCorrect: false, explanation: "Incorrect. Ignoring doctor-verified labels throws away ground truth." }
      ]
    },
    {
      id: 1,
      title: "Diagnostic 2: The Pseudo-Labeling Confirmation Trap",
      scenario: "Debangshu runs pseudo-labeling with NO confidence threshold (he accepts any prediction with probability > 50%). What severe failure will his model experience?",
      options: [
        { id: "errorAccumulation", label: "Error Accumulation & Confirmation Bias (Model trains on its own false guesses)", isCorrect: true, explanation: "Spot on! If the threshold is low (50%), the model will make wrong guesses, treat those wrong guesses as official ground-truth, and reinforce its own mistakes on the next training iteration." },
        { id: "underfitting", label: "Instant High-Bias Underfitting", isCorrect: false, explanation: "Incorrect. The issue is not high bias; it is toxic error accumulation from noisy false labels." },
        { id: "hardwareCrash", label: "GPU hardware memory failure", isCorrect: false, explanation: "Incorrect. This is a mathematical statistical failure, not a hardware fault." }
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
              BCAC701B • Module 1 • Topic 6
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Foundational ML
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full">
              Semi-Supervised Learning
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
              Beginner-to-Master Edition
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Semi-Supervised Learning: The Basic Idea &amp; Mechanics
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Understand how artificial intelligence leverages sparse labeled seeds alongside massive unannotated datasets. Master <span className="text-purple-400 font-semibold">Label Propagation</span>, <span className="text-cyan-400 font-semibold">Pseudo-Labeling (Self-Training)</span>, the 3 core geometric assumptions, and regional medical case studies across West Bengal.
          </p>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "noviceMasterclass", label: "🎓 Novice Classroom & Jargon Buster" },
              { id: "interactiveStudio", label: "1. Interactive Label Propagation Wave Studio" },
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
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-purple-500/30 border border-purple-400">
              🌱
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  The Master Teacher&apos;s Novice Classroom: Semi-Supervised Learning
                </h2>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                  Zero Jargon Barrier
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                How a handful of human-verified seeds can illuminate a mountain of unlabeled data
              </p>
            </div>
          </div>
          <div className="text-xs text-purple-300 bg-purple-950/70 border border-purple-800 px-3.5 py-1.5 rounded-xl font-mono">
            Teacher Sukanta Hui • Barrackpore
          </div>
        </div>

        {/* Warm Conversational Teacher Welcome */}
        <div className="bg-gradient-to-r from-slate-950 via-purple-950/40 to-slate-950 p-6 rounded-2xl border border-purple-900/60 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
            <span>💬</span>
            <span>Teacher Sukanta to a Curious Student:</span>
          </div>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            &quot;In school, you are taught that Machine Learning is either Supervised (with full labels) or Unsupervised (with zero labels). But in the real world, almost every company lives in the <strong>Semi-Supervised middle zone</strong>! You almost never have enough budget to label 100,000 files, but you can easily label 500 of them. Let us learn how algorithms turn a 2% seed spark into a 100% intelligence fire!&quot;
          </p>
        </div>

        {/* 3 Interactive Lesson Selector Tabs */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "intuition", title: "1. The Big Picture", icon: "🩺", subtitle: "The ₹10 Lakh Doctor Dilemma" },
              { id: "theTwoMethods", title: "2. The Two Engines", icon: "🔄", subtitle: "Propagation vs Pseudo-Labeling" },
              { id: "threeAssumptions", title: "3. The 3 Core Axioms", icon: "📐", subtitle: "Smoothness & Valleys" }
            ].map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setSelectedLessonTab(lesson.id)}
                className={clsx(
                  "p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-2.5",
                  selectedLessonTab === lesson.id
                    ? "bg-slate-900 border-purple-400 ring-2 ring-purple-500/50 shadow-xl shadow-purple-600/20 scale-102"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{lesson.icon}</span>
                  <span className={clsx(
                    "text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase",
                    selectedLessonTab === lesson.id ? "bg-purple-600 text-white" : "bg-slate-900 text-slate-400"
                  )}>
                    Module {lesson.id === "intuition" ? "1" : lesson.id === "theTwoMethods" ? "2" : "3"}
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
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-purple-900/60 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{activeClassroomLesson.icon}</span>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">{activeClassroomLesson.title}</h3>
                <span className="text-xs text-purple-300 font-medium">{activeClassroomLesson.tagline}</span>
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
                    <span className="text-[10px] font-mono font-bold text-purple-400 uppercase">{st.num}</span>
                    <h4 className="text-xs sm:text-sm font-bold text-white mt-1">{st.title}</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed mt-2">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Module 2: The Two Engines */}
          {selectedLessonTab === "theTwoMethods" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeClassroomLesson.methods.map((m, idx) => (
                <div key={idx} className={clsx("p-5 rounded-xl border space-y-3", m.color)}>
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white">{m.title}</h4>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950 text-white font-bold">{m.badge}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{m.desc}</p>
                  <div className="text-[11px] font-mono text-slate-300 bg-slate-950 p-2.5 rounded border border-slate-800">
                    <strong className="text-white">Under the Hood:</strong> {m.howItWorks}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Module 3: Three Assumptions */}
          {selectedLessonTab === "threeAssumptions" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeClassroomLesson.assumptions.map((a, idx) => (
                <div key={idx} className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-mono font-bold text-purple-400 uppercase">{a.num}</span>
                  <h4 className="text-sm font-bold text-white">{a.name}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Core Takeaway */}
          {activeClassroomLesson.coreTakeaway && (
            <div className="bg-purple-950/30 p-3.5 rounded-xl border border-purple-800/50 flex items-center gap-2.5 text-xs text-purple-200">
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
                  Semi-Supervised Learning Jargon Buster
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Every complex mathematical concept translated into everyday plain English
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "all", label: "All Terms" },
                { id: "core", label: "Core Setup" },
                { id: "algorithms", label: "Algorithms" },
                { id: "theory", label: "Geometric Axioms" }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedJargonCategory(cat.id)}
                  className={clsx(
                    "px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer",
                    selectedJargonCategory === cat.id
                      ? "bg-purple-600 text-white font-bold"
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
              placeholder="🔍 Search any technical term (e.g. 'Pseudo-Labeling', 'Propagation', 'Manifold', 'Smoothness')..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
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
                className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 hover:border-purple-500/60 transition-all duration-300 space-y-3 flex flex-col justify-between"
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
                  <span className="text-purple-300 font-semibold">Why it matters: </span>
                  {item.whyItMatters}
                </div>
              </div>
            ))}
          </div>

          {filteredJargon.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs">
              No matching technical terms found for &quot;{jargonSearchQuery}&quot;. Try searching for &quot;Pseudo&quot;, &quot;Manifold&quot;, or &quot;Seed&quot;.
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: INTERACTIVE LABEL PROPAGATION WAVE STUDIO */}
      {/* ========================================================================= */}
      <section id="interactiveStudio" className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 scroll-mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Label Propagation Wave Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Live simulation showing how 2 seed nodes annotate an entire unannotated network in 3 sequential propagation waves
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-purple-400 uppercase">Propagation Wave Progress:</span>
              <p className="text-xs text-slate-400">Step through the wave to see affinity-based label dissemination</p>
            </div>
            <button
              onClick={() => setPropagationStep((prev) => (prev >= 3 ? 1 : prev + 1))}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-lg transition-all shadow-lg shadow-purple-600/30 cursor-pointer"
            >
              Execute Next Propagation Wave (Step {propagationStep}/3)
            </button>
          </div>

          <svg viewBox="0 0 500 200" className="w-full h-56 bg-slate-900 rounded-xl p-2 border border-slate-800">
            {/* Seed Node 1 (Blue - Clean Transaction) */}
            <circle cx="80" cy="100" r="12" fill="#3b82f6" stroke="#ffffff" strokeWidth="2.5" />
            <text x="80" y="75" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="bold">Seed 1 (Legitimate)</text>

            {/* Seed Node 2 (Red - Fraud Transaction) */}
            <circle cx="420" cy="100" r="12" fill="#f43f5e" stroke="#ffffff" strokeWidth="2.5" />
            <text x="420" y="75" textAnchor="middle" fill="#fda4af" fontSize="10" fontWeight="bold">Seed 2 (Fraud Attack)</text>

            {/* Connecting Graph Edges */}
            <line x1="80" y1="100" x2="170" y2="60" stroke="#475569" strokeWidth="2" />
            <line x1="80" y1="100" x2="170" y2="140" stroke="#475569" strokeWidth="2" />
            <line x1="170" y1="60" x2="250" y2="100" stroke="#475569" strokeWidth="2" />
            <line x1="170" y1="140" x2="250" y2="100" stroke="#475569" strokeWidth="2" />

            <line x1="420" y1="100" x2="330" y2="100" stroke="#475569" strokeWidth="2" />

            {/* Unlabeled Wave 1 Nodes */}
            <circle cx="170" cy="60" r="10" fill={propagationStep >= 2 ? "#3b82f6" : "#64748b"} />
            <text x="170" y="42" textAnchor="middle" fill={propagationStep >= 2 ? "#93c5fd" : "#94a3b8"} fontSize="9">
              {propagationStep >= 2 ? "Propagated (Clean)" : "Unlabeled Node A"}
            </text>

            <circle cx="170" cy="140" r="10" fill={propagationStep >= 2 ? "#3b82f6" : "#64748b"} />
            <text x="170" y="162" textAnchor="middle" fill={propagationStep >= 2 ? "#93c5fd" : "#94a3b8"} fontSize="9">
              {propagationStep >= 2 ? "Propagated (Clean)" : "Unlabeled Node B"}
            </text>

            {/* Unlabeled Wave 2 Node */}
            <circle cx="250" cy="100" r="10" fill={propagationStep >= 3 ? "#3b82f6" : "#64748b"} />
            <text x="250" y="80" textAnchor="middle" fill={propagationStep >= 3 ? "#93c5fd" : "#94a3b8"} fontSize="9">
              {propagationStep >= 3 ? "Propagated (Clean)" : "Unlabeled Node C"}
            </text>

            {/* Unlabeled Wave 1 (Right Fraud) */}
            <circle cx="330" cy="100" r="10" fill={propagationStep >= 2 ? "#f43f5e" : "#64748b"} />
            <text x="330" y="80" textAnchor="middle" fill={propagationStep >= 2 ? "#fda4af" : "#94a3b8"} fontSize="9">
              {propagationStep >= 2 ? "Propagated (Fraud)" : "Unlabeled Node D"}
            </text>
          </svg>

          <p className="text-xs text-slate-400">
            Notice how knowledge from 2 labeled seed nodes flows through the graph structure, automatically annotating all 4 unannotated gray nodes without human intervention.
          </p>
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
              Graph harmonic functions, Dirichlet energy, and manifold regularization
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Manifold Regularized Objective</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Semi-supervised optimization balances supervised empirical loss on labeled seeds $D_L$ with a manifold smoothness penalty over all samples $D_L \cup D_U$:
            </p>
            <div className="text-xs font-mono text-purple-300 bg-slate-900 p-3 rounded border border-slate-800 overflow-x-auto">
              {"min_f [ ∑_{i=1}^l L(f(x_i), y_i) + γ_I ∑_{i,j=1}^{l+u} W_{ij} (f(x_i) - f(x_j))² + γ_A ||f||_K² ]"}
            </div>
            <p className="text-[11px] text-slate-400">
              Where $W_{ij}$ is the graph edge weight reflecting geometric similarity between points $x_i$ and $x_j$.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Harmonic Solution via Graph Laplacian</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The harmonic function solution on unlabeled nodes $f_u$ satisfies:
            </p>
            <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-3 rounded border border-slate-800 overflow-x-auto">
              {"f_u = (D_{uu} - W_{uu})^{-1} W_{ul} y_l"}
            </div>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1 list-disc list-inside pt-1">
              <li><strong className="text-white">$D$:</strong> Degree matrix measuring node connectivity.</li>
              <li><strong className="text-white">$y_l$:</strong> Vector of ground truth seed annotations.</li>
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
              Semi-supervised deployments across healthcare, law, and cybersecurity
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-400">Case 1 • Jadavpur Medical Diagnostic Lab</span>
              <span className="text-[10px] px-2 py-0.5 bg-purple-950 text-purple-300 rounded border border-purple-800">Label Spreading</span>
            </div>
            <h3 className="text-base font-bold text-white">Chest Radiograph Anomaly Triage</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Abhronila leveraged 1,000 radiologist-annotated X-rays combined with 49,000 unannotated hospital scans. Using label propagation over deep visual embeddings, the model matched fully supervised diagnostic accuracy at a 90% labeling budget reduction.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400">Case 2 • Salt Lake Legal Tech Hub</span>
              <span className="text-[10px] px-2 py-0.5 bg-cyan-950 text-cyan-300 rounded border border-cyan-800">Pseudo-Labeling</span>
            </div>
            <h3 className="text-base font-bold text-white">Commercial Contract Clause Triage</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu classified 80,000 corporate legal contracts where only 400 had been reviewed by senior attorneys. Using FixMatch consistency regularization, high-confidence pseudo-labels expanded the training corpus to 75,000 verified clauses.
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
              Interactive Semi-Supervised Diagnostic Quiz
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
              Key engineering guidelines for semi-supervised machine learning
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Low Confidence Threshold:</strong> Accepting pseudo-labels below 95% confidence, creating a feedback loop of toxic false training labels.</li>
              <li><strong className="text-white">Violating Cluster Assumption:</strong> Forcing semi-supervised learning when classes overlap heavily in high-density regions.</li>
              <li><strong className="text-white">Unbalanced Seed Sampling:</strong> Sampling all seed labels from just one class, causing all unlabeled points to skew toward that class.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Industry Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Strict Confidence Filtering:</strong> Set pseudo-label thresholds high (τ ≥ 0.95 or 0.99) to keep the training data pure.</li>
              <li><strong className="text-white">Consistency Regularization:</strong> Apply random augmentations (noise, rotation) and enforce that the model predicts identical pseudo-labels.</li>
              <li><strong className="text-white">Balanced Seed Sets:</strong> Ensure human annotators label an equal number of seed examples across all classes.</li>
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
              Interactive standalone lab script executing label propagation across student cohorts
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="semi_supervised_learning_basic_idea_lab.py"
          highlightLines={[25, 26, 35, 45]}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: FAQ TEMPLATE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <FAQTemplate
          title="Semi-Supervised Learning — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: PRINTABLE NOTE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Semi-Supervised Learning Study Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 6 Note"
          downloadFileName="topic6_note.txt"
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: TEACHER NOTE */}
      {/* ========================================================================= */}
      <section>
        <Teacher
          note="Semi-supervised learning is the pragmatic bridge between costly human annotation and massive real-world data volume. Whenever you build commercial AI systems in Kolkata, Bangalore, or Silicon Valley, don't let 95% of your unlabeled records collect dust. Use label propagation and high-confidence pseudo-labeling with consistency checks to build world-class AI at a fraction of the cost!"
        />
      </section>
    </div>
  );
};

export default Topic6;
