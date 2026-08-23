import React, { useState, useId } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import typesOfMlLab from "./topic3_files/types_of_ml_lab.py?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions.js";

const Topic3 = () => {
  const [selectedParadigm, setSelectedParadigm] = useState("supervised");
  const [activeTab, setActiveTab] = useState("taxonomy");
  
  // Interactive Simulator State for Paradigms
  const [rlStep, setRlStep] = useState(0);
  const [semiSpreadLevel, setSemiSpreadLevel] = useState(1);

  const svgId = useId();

  // Paradigm Information Data
  const paradigms = {
    supervised: {
      id: "supervised",
      title: "Supervised Learning",
      tagline: "Direct Feedback from Labeled Ground-Truth",
      badge: "Labeled Pairs (x, y)",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-800",
      icon: "🎯",
      dataRequirement: "D = {(x₁, y₁), (x₂, y₂), ..., (x_N, y_N)} where x_i ∈ ℝᵈ, y_i ∈ Y",
      feedback: "Direct, immediate, instance-by-instance ground-truth supervision.",
      objective: "min_w (1/N) ∑ L(h(x_i; w), y_i) + λ Ω(w)",
      subcategories: [
        { name: "Regression", desc: "Predicts continuous real-valued targets (e.g. flat prices in ₹ Lakhs, temperature, stock index)." },
        { name: "Classification", desc: "Predicts discrete categorical class labels (e.g. Spam vs Ham, Loan Default 0/1, Grade A/B/C)." }
      ],
      algorithms: ["Linear & Logistic Regression", "Decision Trees & Random Forests", "XGBoost & LightGBM", "Support Vector Machines (SVM)", "Convolutional Neural Networks (CNN)"],
      realWorldExample: "Predicting semester exam distinction qualification for students in Barrackpore using labeled historical records."
    },
    unsupervised: {
      id: "unsupervised",
      title: "Unsupervised Learning",
      tagline: "Structure & Pattern Discovery from Unlabeled Data",
      badge: "Unlabeled Features {x}",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      icon: "🔍",
      dataRequirement: "D = {x₁, x₂, ..., x_N} where x_i ∈ ℝᵈ (No target column y)",
      feedback: "Zero external supervisory feedback; self-guided optimization.",
      objective: "min_C ∑ ||x_i - μ_c||² (Cluster variance minimization / density estimation)",
      subcategories: [
        { name: "Clustering", desc: "Groups similar instances together based on distance/density metrics (k-Means, DBSCAN, Hierarchical)." },
        { name: "Dimensionality Reduction", desc: "Compresses high-dimensional feature spaces while preserving maximum variance (PCA, t-SNE, UMAP)." },
        { name: "Anomaly Detection", desc: "Identifies rare low-density outliers in unlabeled data streams (Isolation Forest, One-Class SVM)." }
      ],
      algorithms: ["k-Means & k-Medoids", "DBSCAN & HDBSCAN", "Principal Component Analysis (PCA)", "Isolation Forest", "Autoencoders"],
      realWorldExample: "Segmenting 40,000 retail shoppers in Ichapur into 4 distinct behavioral clusters based on RFM spend habits."
    },
    semiSupervised: {
      id: "semiSupervised",
      title: "Semi-Supervised Learning",
      tagline: "Leveraging Sparse Labeled Seeds with Massive Unlabeled Pools",
      badge: "Small D_L + Massive D_U",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      icon: "🌱",
      dataRequirement: "D_L = {(x_i, y_i)}_{i=1}^l (1-5% labeled) + D_U = {x_j}_{j=l+1}^{l+u} (95% unlabeled)",
      feedback: "Direct supervisory signal on seed instances; propagated to unlabeled pool via geometric smoothness.",
      objective: "min_f [ Loss(f(D_L), y_L) + γ_smoothness · Smoothness_Manifold(f(D_U)) ]",
      subcategories: [
        { name: "Label Propagation", desc: "Propagates labels across high-density graph neighborhoods along the data manifold." },
        { name: "Pseudo-Labeling", desc: "Iteratively assigns artificial labels to high-confidence model predictions on unlabeled points." },
        { name: "Consistency Regularization", desc: "Enforces identical predictions under stochastic data augmentations (FixMatch)." }
      ],
      algorithms: ["Label Propagation & Spreading", "Self-Training with Pseudo-Labels", "Co-Training", "FixMatch & MixMatch"],
      realWorldExample: "Classifying 50,000 chest X-rays in Jadavpur where only 1,000 have been manually annotated by expert radiologists."
    },
    reinforcement: {
      id: "reinforcement",
      title: "Reinforcement Learning",
      tagline: "Sequential Decision Making via Action-Reward Interactions",
      badge: "State-Action-Reward (MDP)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      icon: "🕹️",
      dataRequirement: "Markov Decision Process (MDP): (S, A, P, R, γ) with trajectory logs (s_t, a_t, r_t, s_{t+1})",
      feedback: "Evaluative scalar reward / penalty signals r_t delayed over time steps.",
      objective: "max_π E [ ∑_{k=0}^∞ γ^k · r_{t+k+1} ] (Maximize expected cumulative discounted return)",
      subcategories: [
        { name: "Value-Based Methods", desc: "Learns optimal state-action value function Q*(s, a) (Q-Learning, Deep Q-Networks)." },
        { name: "Policy Gradient Methods", desc: "Directly optimizes parameter weights of the policy network π_θ(a|s) (REINFORCE, PPO)." },
        { name: "Actor-Critic Architectures", desc: "Combines a policy actor with a value-function critic for stable optimization (A2C, SAC)." }
      ],
      algorithms: ["Q-Learning & SARSA", "Deep Q-Networks (DQN)", "Proximal Policy Optimization (PPO)", "Soft Actor-Critic (SAC)", "Deep Deterministic Policy Gradient (DDPG)"],
      realWorldExample: "Optimizing charging, storage, and selling decisions for a smart battery microgrid in Barrackpore to maximize power revenue."
    }
  };

  const currentParadigm = paradigms[selectedParadigm];

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
              BCAC701B • Module 1 • Topic 3
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Taxonomy &amp; Paradigms
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Core ML Taxonomy
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Types of Machine Learning
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Explore the foundational classification of Machine Learning into <span className="text-blue-400 font-semibold">Supervised</span>, <span className="text-emerald-400 font-semibold">Unsupervised</span>, <span className="text-purple-400 font-semibold">Semi-Supervised</span>, and <span className="text-rose-400 font-semibold">Reinforcement Learning</span>. Understand their mathematical objectives, feedback signals, data prerequisites, and industry deployment contexts.
          </p>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "taxonomy", label: "1. The 4-Paradigm Taxonomy" },
              { id: "interactiveStudio", label: "2. Interactive Paradigm Studio" },
              { id: "foundationCycle", label: "3. Modern Foundation AI Lifecycle" },
              { id: "caseStudies", label: "4. Real-World Regional Cases" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer",
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400"
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
      {/* SECTION 1: THE 4-PARADIGM TAXONOMY */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The Four Foundational Machine Learning Paradigms
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Categorized by Training Data Annotation Structure and the Presence of Feedback Signals
            </p>
          </div>
        </div>

        {/* 4 Paradigm Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: "supervised", title: "Supervised", badge: "Labels (x, y)", icon: "🎯", color: "blue", border: "border-blue-800 hover:border-blue-500" },
            { id: "unsupervised", title: "Unsupervised", badge: "No Labels {x}", icon: "🔍", color: "emerald", border: "border-emerald-800 hover:border-emerald-500" },
            { id: "semiSupervised", title: "Semi-Supervised", badge: "Sparse Labels", icon: "🌱", color: "purple", border: "border-purple-800 hover:border-purple-500" },
            { id: "reinforcement", title: "Reinforcement", badge: "Action-Reward", icon: "🕹️", color: "rose", border: "border-rose-800 hover:border-rose-500" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedParadigm(item.id)}
              className={clsx(
                "p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer space-y-2 flex flex-col justify-between",
                selectedParadigm === item.id
                  ? "bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/40 shadow-xl shadow-indigo-500/20"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                  {item.badge}
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-[11px] text-slate-400">{paradigms[item.id].tagline}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Paradigm Detailed Breakdown Card */}
        <div className="bg-slate-950 p-6 rounded-xl border border-indigo-900/50 space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className={clsx("text-xs font-mono font-bold uppercase px-2.5 py-1 rounded border", currentParadigm.badgeColor)}>
                {currentParadigm.badge}
              </span>
              <h3 className="text-xl font-bold text-white mt-2">
                {currentParadigm.title} — {currentParadigm.tagline}
              </h3>
            </div>
            <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              Feedback: {currentParadigm.feedback}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Mathematical Objective</span>
              <div className="text-xs font-mono text-indigo-300 bg-slate-950 p-2.5 rounded border border-slate-800 overflow-x-auto">
                {currentParadigm.objective}
              </div>
              <div className="text-[11px] text-slate-400 pt-1">
                Data Format: <span className="font-mono text-slate-300">{currentParadigm.dataRequirement}</span>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Subcategories &amp; Tasks</span>
              <div className="space-y-1.5 text-xs text-slate-300">
                {currentParadigm.subcategories.map((sub, idx) => (
                  <div key={idx}>
                    <strong className="text-white">• {sub.name}:</strong> {sub.desc}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1.5">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase">Representative Algorithms</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentParadigm.algorithms.map((algo, idx) => (
                  <span key={idx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                    {algo}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Regional Industrial Case</span>
              <p className="text-xs text-slate-300">{currentParadigm.realWorldExample}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: INTERACTIVE PARADIGM STUDIO */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Learning Paradigm Simulation Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Live visual demonstration of how each learning paradigm operates on its respective data representation
            </p>
          </div>
        </div>

        {/* Dynamic Simulation Box based on selectedParadigm */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          {selectedParadigm === "supervised" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-blue-400 uppercase">Supervised Decision Boundary ($w^\top x + b = 0$)</span>
                <span className="text-slate-400 font-mono">Blue = Pass (1) | Red = Fail (0)</span>
              </div>
              <svg viewBox="0 0 400 180" className="w-full h-48 bg-slate-900 rounded-lg border border-slate-800">
                {/* Decision boundary line */}
                <line x1="40" y1="160" x2="360" y2="20" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 2" />
                <text x="220" y="70" fill="#60a5fa" fontSize="10" fontStyle="italic">Learned Decision Boundary</text>

                {/* Positive Points (Blue) */}
                <circle cx="280" cy="50" r="6" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
                <circle cx="320" cy="40" r="6" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
                <circle cx="340" cy="70" r="6" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
                <circle cx="260" cy="80" r="6" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
                <text x="310" y="95" fill="#93c5fd" fontSize="9">Class 1: Pass</text>

                {/* Negative Points (Red) */}
                <circle cx="80" cy="140" r="6" fill="#f43f5e" stroke="#fda4af" strokeWidth="1.5" />
                <circle cx="120" cy="150" r="6" fill="#f43f5e" stroke="#fda4af" strokeWidth="1.5" />
                <circle cx="70" cy="110" r="6" fill="#f43f5e" stroke="#fda4af" strokeWidth="1.5" />
                <circle cx="140" cy="120" r="6" fill="#f43f5e" stroke="#fda4af" strokeWidth="1.5" />
                <text x="70" y="165" fill="#fda4af" fontSize="9">Class 0: Fail</text>
              </svg>
              <div className="text-xs text-slate-400">
                Every data instance has a known label $y$. The algorithm adjusts weights $w$ to draw a separating hyperplane.
              </div>
            </div>
          )}

          {selectedParadigm === "unsupervised" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-400 uppercase">Unsupervised k-Means Centroid Discovery</span>
                <span className="text-slate-400 font-mono">No labels supplied (Self-Organized)</span>
              </div>
              <svg viewBox="0 0 400 180" className="w-full h-48 bg-slate-900 rounded-lg border border-slate-800">
                {/* Cluster 1 Core (Green) */}
                <circle cx="100" cy="90" r="45" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeDasharray="3 3" />
                <circle cx="80" cy="80" r="5" fill="#34d399" />
                <circle cx="110" cy="70" r="5" fill="#34d399" />
                <circle cx="95" cy="110" r="5" fill="#34d399" />
                <polygon points="100,82 108,98 92,98" fill="#fbbf24" stroke="#d97706" />
                <text x="60" y="150" fill="#34d399" fontSize="9">Cluster A (Budget Shoppers)</text>

                {/* Cluster 2 Core (Purple) */}
                <circle cx="290" cy="90" r="45" fill="#8b5cf6" fillOpacity="0.15" stroke="#8b5cf6" strokeDasharray="3 3" />
                <circle cx="270" cy="80" r="5" fill="#a78bfa" />
                <circle cx="310" cy="75" r="5" fill="#a78bfa" />
                <circle cx="285" cy="110" r="5" fill="#a78bfa" />
                <polygon points="290,82 298,98 282,98" fill="#fbbf24" stroke="#d97706" />
                <text x="240" y="150" fill="#a78bfa" fontSize="9">Cluster B (Premium VIPs)</text>
              </svg>
              <div className="text-xs text-slate-400">
                The algorithm calculates centroids (yellow triangles) and groups points by Euclidean distance without ground-truth labels.
              </div>
            </div>
          )}

          {selectedParadigm === "semiSupervised" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-purple-400 uppercase">Semi-Supervised Label Propagation Wave</span>
                <button
                  onClick={() => setSemiSpreadLevel((prev) => (prev >= 3 ? 1 : prev + 1))}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-xs cursor-pointer font-semibold"
                >
                  Step Wave Spread (Step {semiSpreadLevel}/3)
                </button>
              </div>
              <svg viewBox="0 0 400 180" className="w-full h-48 bg-slate-900 rounded-lg border border-slate-800">
                {/* Seed Node 1 */}
                <circle cx="60" cy="90" r="8" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                <text x="60" y="70" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">Seed (Pass)</text>

                {/* Graph Edges */}
                <line x1="60" y1="90" x2="130" y2="60" stroke="#475569" strokeWidth="1.5" />
                <line x1="60" y1="90" x2="130" y2="120" stroke="#475569" strokeWidth="1.5" />
                <line x1="130" y1="60" x2="200" y2="90" stroke="#475569" strokeWidth="1.5" />
                <line x1="130" y1="120" x2="200" y2="90" stroke="#475569" strokeWidth="1.5" />

                {/* Step 1 Propagation Nodes */}
                <circle cx="130" cy="60" r="7" fill={semiSpreadLevel >= 2 ? "#3b82f6" : "#64748b"} />
                <circle cx="130" cy="120" r="7" fill={semiSpreadLevel >= 2 ? "#3b82f6" : "#64748b"} />

                {/* Step 2 Propagation Node */}
                <circle cx="200" cy="90" r="7" fill={semiSpreadLevel >= 3 ? "#3b82f6" : "#64748b"} />

                {/* Unlabeled Right Cluster */}
                <circle cx="340" cy="90" r="8" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
                <text x="340" y="70" textAnchor="middle" fill="#fda4af" fontSize="9" fontWeight="bold">Seed (Fail)</text>
                <line x1="340" y1="90" x2="270" y2="90" stroke="#475569" strokeWidth="1.5" />
                <circle cx="270" cy="90" r="7" fill={semiSpreadLevel >= 2 ? "#f43f5e" : "#64748b"} />
              </svg>
              <div className="text-xs text-slate-400">
                Notice how knowledge from 2 labeled seed nodes flows along density graph paths to annotate all unlabeled gray nodes.
              </div>
            </div>
          )}

          {selectedParadigm === "reinforcement" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-rose-400 uppercase">Reinforcement Learning 1D Q-Agent Gridworld</span>
                <button
                  onClick={() => setRlStep((prev) => (prev >= 4 ? 0 : prev + 1))}
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs cursor-pointer font-semibold"
                >
                  Execute Agent Step (State: S{rlStep})
                </button>
              </div>

              {/* 5-Cell Grid */}
              <div className="grid grid-cols-5 gap-2 p-3 bg-slate-900 rounded-lg border border-slate-800">
                {[0, 1, 2, 3, 4].map((cellIdx) => (
                  <div
                    key={cellIdx}
                    className={clsx(
                      "h-20 rounded-lg border flex flex-col items-center justify-center font-mono text-xs transition-all duration-300",
                      rlStep === cellIdx
                        ? "bg-rose-950 border-rose-500 shadow-lg shadow-rose-500/30 text-white scale-105"
                        : cellIdx === 4
                        ? "bg-emerald-950/40 border-emerald-700 text-emerald-300"
                        : "bg-slate-950 border-slate-800 text-slate-500"
                    )}
                  >
                    <div className="text-[10px]">State S{cellIdx}</div>
                    <div className="text-lg">
                      {rlStep === cellIdx ? "🤖" : cellIdx === 4 ? "🏆" : "▫️"}
                    </div>
                    <div className="text-[9px]">
                      {cellIdx === 4 ? "Reward +10" : "Penalty -1"}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-slate-400">
                The agent receives a scalar penalty (-1) at each step to discourage looping, receiving a +10 reward upon reaching Goal State S4.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: THE MODERN FOUNDATION AI LIFECYCLE */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">
            03
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The Modern Foundation AI Lifecycle (Combining All Paradigms)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              How state-of-the-art Generative AI pipelines unify Self-Supervised, Supervised, and Reinforcement Learning
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2.5">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Stage 1: Pre-training</span>
            <h3 className="text-base font-bold text-white">Self-Supervised Pretext</h3>
            <p className="text-xs text-slate-300">
              The model ingests terabytes of raw text or images, optimizing next-token or masked-patch prediction without human labels, learning generalized grammar, world facts, and visual primitives.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2.5">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Stage 2: Fine-Tuning</span>
            <h3 className="text-base font-bold text-white">Supervised Instruction Tuning (SFT)</h3>
            <p className="text-xs text-slate-300">
              Human experts write 50,000 high-quality question-answer dialogues. The pre-trained model is fine-tuned with supervised cross-entropy loss to follow instructions and generate clean code/answers.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2.5">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Stage 3: Alignment</span>
            <h3 className="text-base font-bold text-white">RLHF / PPO Policy Alignment</h3>
            <p className="text-xs text-slate-300">
              Human evaluators rank response candidates. A reward model is trained on these preferences, and Reinforcement Learning (PPO) optimizes the model to maximize helpfulness and eliminate hallucinations.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: REAL-WORLD REGIONAL CASE STUDIES */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">
            04
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Real-World Regional Industrial Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Concrete enterprise deployments matching each learning paradigm
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Case 1: Supervised */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-blue-400">Case 1 • Kolkata Banking Hub</span>
              <span className="text-[10px] px-2 py-0.5 bg-blue-950 text-blue-300 rounded border border-blue-800">Supervised Classification</span>
            </div>
            <h3 className="text-base font-bold text-white">Retail Loan Default Risk Scoring</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mamata and Mahima built an XGBoost classifier on 100,000 historical bank applicants in Kolkata. Given CIBIL score, monthly income in ₹, and repayment histories, the model predicts default probability with 94.8% ROC-AUC.
            </p>
          </div>

          {/* Case 2: Unsupervised */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400">Case 2 • Ichapur Retail Center</span>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded border border-emerald-800">Unsupervised k-Means</span>
            </div>
            <h3 className="text-base font-bold text-white">Shopper RFM Behavioral Segmentation</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Susmita clustered 40,000 unlabeled loyalty card transaction logs across Ichapur into 4 distinct groups (Champions, Loyal Spenders, Dormant Accounts, At-Risk Shoppers) to automate personalized discount vouchers.
            </p>
          </div>

          {/* Case 3: Semi-Supervised */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-400">Case 3 • Jadavpur Medical Lab</span>
              <span className="text-[10px] px-2 py-0.5 bg-purple-950 text-purple-300 rounded border border-purple-800">Semi-Supervised Spreading</span>
            </div>
            <h3 className="text-base font-bold text-white">Chest Radiograph Anomaly Triage</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Abhronila leveraged 1,000 radiologist-annotated X-rays combined with 49,000 unlabeled hospital scans. Using label propagation on deep visual embeddings, the model achieved diagnostic sensitivity matching full supervised models at a 90% labeling cost reduction.
            </p>
          </div>

          {/* Case 4: Reinforcement Learning */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-400">Case 4 • Barrackpore Solar Farm</span>
              <span className="text-[10px] px-2 py-0.5 bg-rose-950 text-rose-300 rounded border border-rose-800">Reinforcement Learning</span>
            </div>
            <h3 className="text-base font-bold text-white">Microgrid Battery Charge Arbitrage</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu trained a Deep Q-Network (DQN) agent optimizing battery charge/discharge cycles in Barrackpore based on real-time grid electricity tariffs (₹/kWh) and solar forecasts, increasing annual clean energy revenue by 28%.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: PITFALLS & BEST PRACTICES */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">
            05
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Common Pitfalls &amp; Paradigm Selection Rules
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Criteria for selecting the right paradigm without wasting computational budget
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Mistakes &amp; Misconceptions
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Using RL for Static Data:</strong> Applying complex reinforcement learning to tabular datasets where supervised regression is 100x faster.</li>
              <li><strong className="text-white">Ignoring Semi-Supervised Assumptions:</strong> Running label propagation when class clusters overlap densely in feature space.</li>
              <li><strong className="text-white">Confusing Clustering with Classification:</strong> Expecting unsupervised k-Means to output predefined human business labels automatically.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Industry Best Practices
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Data-First Selection:</strong> If ground-truth labels exist, always start with Supervised Learning (e.g. Random Forest).</li>
              <li><strong className="text-white">Exploratory Clustering:</strong> Use unsupervised PCA and k-Means during initial EDA to discover hidden dataset groupings.</li>
              <li><strong className="text-white">Pre-train then Fine-tune:</strong> Use self-supervised pre-training to bootstrap performance on small domain datasets.</li>
            </ul>
          </div>
        </div>

        {/* Instructor Tip */}
        <div className="bg-gradient-to-r from-slate-950 to-indigo-950/60 p-5 rounded-xl border border-indigo-800/40 space-y-2 text-xs">
          <div className="font-bold text-indigo-300 flex items-center gap-1.5">
            <span>💡</span> Instructor Tip &amp; Golden Rule:
          </div>
          <p className="text-slate-300 italic">
            &quot;The four learning paradigms are not isolated silos—they form a cohesive spectrum. When building production AI systems, you will often pre-train on unlabeled data (Self-Supervised), fine-tune on domain samples (Supervised), and refine the policy via action feedback (Reinforcement Learning). Master all four to become a complete ML engineer.&quot;
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: PYTHON LABORATORY LOADER */}
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
              Interactive simulation executing Supervised, Unsupervised, Semi-Supervised, and RL agents in pure Python
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={typesOfMlLab}
          title="types_of_ml_lab.py"
          highlightLines={[20, 21, 40, 50, 75, 80, 100, 115]}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: FAQ ACCORDION TEMPLATE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <FAQTemplate
          title="Types of Machine Learning — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: PRINTABLE PLAIN TEXT STUDY NOTE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Types of Machine Learning"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 3 Study Note"
          downloadFileName="topic3_note.txt"
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: TEACHER'S NOTE */}
      {/* ========================================================================= */}
      <section>
        <Teacher
          note="Whenever a student asks me 'Which type of Machine Learning is best?', I tell them: The best type is the one dictated by your data annotation reality! If you have clean labeled targets, use Supervised Learning. If your data is unannotated, use Unsupervised Clustering. If labeling is costly, use Semi-Supervised methods. If you are controlling dynamic physical robots or games, use Reinforcement Learning. Master the taxonomy to always choose the right tool!"
        />
      </section>
    </div>
  );
};

export default Topic3;
