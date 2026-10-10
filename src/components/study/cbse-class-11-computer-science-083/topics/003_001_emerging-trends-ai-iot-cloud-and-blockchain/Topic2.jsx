import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic2Questions } from "./topic2_files/topic2_questions";

export default function Topic2() {
  // Interactive State for ML Sandbox
  const [activeTab, setActiveTab] = useState("supervised");
  
  // Supervised Regression Demo
  const [studyHours, setStudyHours] = useState(6);
  const predictedScore = Math.min(100, Math.round(35 + studyHours * 7.5));

  // Supervised Classification Demo
  const [emailSpamKeywords, setEmailSpamKeywords] = useState(["free", "winner"]);
  const [emailText, setEmailText] = useState("Congratulations! You are a winner of a free laptop gift voucher.");
  const isSpam = emailSpamKeywords.some((kw) => emailText.toLowerCase().includes(kw));

  // Unsupervised Clustering Demo
  const [selectedClusterK, setSelectedClusterK] = useState(3);
  const rawDataPoints = [
    { id: 1, x: 20, y: 30, cluster: 1 },
    { id: 2, x: 25, y: 35, cluster: 1 },
    { id: 3, x: 80, y: 85, cluster: 2 },
    { id: 4, x: 85, y: 90, cluster: 2 },
    { id: 5, x: 50, y: 55, cluster: 3 },
    { id: 6, x: 55, y: 60, cluster: 3 },
  ];

  // Reinforcement Learning GridWorld Demo
  const [agentPos, setAgentPos] = useState({ r: 0, c: 0 });
  const [agentScore, setAgentScore] = useState(0);
  const [gameMessage, setGameMessage] = useState("Move agent to Goal (+100) avoiding Trap (-50)");

  const moveAgent = (dr, dc) => {
    const nr = Math.max(0, Math.min(2, agentPos.r + dr));
    const nc = Math.max(0, Math.min(2, agentPos.c + dc));
    setAgentPos({ r: nr, c: nc });

    if (nr === 2 && nc === 2) {
      setAgentScore((s) => s + 100);
      setGameMessage("🌟 Goal Reached! Reward: +100");
    } else if (nr === 1 && nc === 1) {
      setAgentScore((s) => s - 50);
      setGameMessage("⚠️ Penalty Trap Hit! Reward: -50");
    } else {
      setAgentScore((s) => s - 1);
      setGameMessage("🚶 Step taken. Living cost: -1");
    }
  };

  const resetRL = () => {
    setAgentPos({ r: 0, c: 0 });
    setAgentScore(0);
    setGameMessage("Environment reset. Ready for next episode.");
  };

  // Deep Learning ANN Visualizer
  const [inputX1, setInputX1] = useState(0.8);
  const [inputX2, setInputX2] = useState(0.5);
  const [weightW1, setWeightW1] = useState(0.6);
  const [weightW2, setWeightW2] = useState(-0.4);
  const [biasB, setBiasB] = useState(0.2);

  const netInput = Number((inputX1 * weightW1 + inputX2 * weightW2 + biasB).toFixed(3));
  const sigmoidOutput = Number((1 / (1 + Math.exp(-netInput))).toFixed(4));
  const reluOutput = Number(Math.max(0, netInput).toFixed(4));

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic2Questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-900 border border-emerald-500/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-400/30">
            CBSE Class 11 CS (083) • Unit 3: Emerging Trends
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Topic 2: Machine Learning & Deep Learning
          </h1>
          <p className="text-emerald-100/80 text-base md:text-lg max-w-3xl leading-relaxed">
            Unravel how intelligent algorithms learn from empirical patterns without manual rule coding. Master 
            <strong> Supervised</strong>, <strong>Unsupervised</strong>, and <strong>Reinforcement Learning</strong>, 
            along with multi-layered <strong>Artificial Neural Networks (ANN, CNN, RNN)</strong>.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10">
        {/* Section 1: Conceptual Hierarchy (AI vs ML vs DL) */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 text-sm">01</span>
            The Conceptual Hierarchy: AI vs. ML vs. Deep Learning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-xl hover:border-emerald-500/50 transition">
              <div className="text-emerald-400 font-bold text-lg mb-2">1. Artificial Intelligence (AI)</div>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                The broad umbrella discipline of engineering systems capable of simulating human-like cognition, problem solving, logic deduction, and reasoning.
              </p>
              <div className="text-xs bg-slate-900 px-3 py-2 rounded text-slate-400">
                Includes: Expert Systems, Heuristic Search, Knowledge Graphs, ML, DL.
              </div>
            </div>

            <div className="bg-slate-800/60 border border-teal-700/60 p-5 rounded-xl hover:border-teal-500/50 transition">
              <div className="text-teal-300 font-bold text-lg mb-2">2. Machine Learning (ML)</div>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                A vital subset of AI where mathematical models automatically learn statistical patterns from data rather than following static, hardcoded conditional rules.
              </p>
              <div className="text-xs bg-slate-900 px-3 py-2 rounded text-slate-400">
                Includes: Linear Regression, Decision Trees, SVM, K-Means Clustering.
              </div>
            </div>

            <div className="bg-slate-800/60 border border-cyan-700/60 p-5 rounded-xl hover:border-cyan-500/50 transition">
              <div className="text-cyan-300 font-bold text-lg mb-2">3. Deep Learning (DL)</div>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                A high-performance subfield of ML driven by deep Artificial Neural Networks with multiple hidden layers capable of automatic feature extraction from raw data.
              </p>
              <div className="text-xs bg-slate-900 px-3 py-2 rounded text-slate-400">
                Includes: Multi-Layer Perceptrons, CNNs (Vision), RNNs/Transformers (Language).
              </div>
            </div>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-4 text-sm text-emerald-200">
            💡 <strong>Key Board Exam Distinction:</strong> Traditional Programming takes <em>Data + Rules &rarr; Answers</em>. Machine Learning takes <em>Data + Answers &rarr; Rules (Trained Model)</em>.
          </div>
        </section>

        {/* Section 2: The Three Paradigms of Machine Learning */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 text-sm">02</span>
            The Three Core Paradigms of Machine Learning
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Supervised */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-3">
                <span className="px-2 py-0.5 bg-emerald-500/20 rounded text-xs">SUPERVISED</span>
              </div>
              <h3 className="font-semibold text-white text-base mb-2">Learning with a Teacher</h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-3">
                Trained on paired input features <code>X</code> and ground-truth output labels <code>Y</code>.
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside mb-4">
                <li><strong>Classification:</strong> Predict discrete labels (e.g., Spam vs Ham, Cat vs Dog).</li>
                <li><strong>Regression:</strong> Predict continuous numeric values (e.g., Stock price, House value).</li>
              </ul>
              <div className="text-[11px] text-emerald-300/80 bg-emerald-950/50 p-2 rounded">
                Algorithms: Linear Regression, Logistic Regression, Decision Trees, SVM, Random Forest.
              </div>
            </div>

            {/* Unsupervised */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center gap-2 text-teal-400 font-bold mb-3">
                <span className="px-2 py-0.5 bg-teal-500/20 rounded text-xs">UNSUPERVISED</span>
              </div>
              <h3 className="font-semibold text-white text-base mb-2">Discovering Hidden Patterns</h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-3">
                Trained on unlabelled data <code>X</code> with no predefined answer keys or supervisor feedback.
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside mb-4">
                <li><strong>Clustering:</strong> Grouping similar entities (e.g., Customer segmentation).</li>
                <li><strong>Association:</strong> Market basket rule mining (e.g., Bread &rarr; Butter).</li>
                <li><strong>Anomaly Detection:</strong> Fraud identification in banking.</li>
              </ul>
              <div className="text-[11px] text-teal-300/80 bg-teal-950/50 p-2 rounded">
                Algorithms: K-Means, Hierarchical Clustering, PCA, Apriori.
              </div>
            </div>

            {/* Reinforcement */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center gap-2 text-cyan-400 font-bold mb-3">
                <span className="px-2 py-0.5 bg-cyan-500/20 rounded text-xs">REINFORCEMENT</span>
              </div>
              <h3 className="font-semibold text-white text-base mb-2">Learning by Trial & Error</h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-3">
                An autonomous agent interacts with an environment, observing states and maximizing cumulative rewards.
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside mb-4">
                <li><strong>Agent:</strong> The decision-making learner.</li>
                <li><strong>Environment:</strong> The world the agent navigates.</li>
                <li><strong>Reward / Penalty:</strong> Feedback guiding policy updates.</li>
              </ul>
              <div className="text-[11px] text-cyan-300/80 bg-cyan-950/50 p-2 rounded">
                Applications: Game playing (AlphaGo, Chess), Robotics, Autonomous driving.
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Learning Paradigm Simulator */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 text-sm">03</span>
                Interactive ML Paradigm & Neural Network Sandbox
              </h2>
              <p className="text-slate-400 text-xs md:text-sm">
                Experiment live with Supervised Regression/Classification, Unsupervised Clustering, RL Agent, and Deep ANN neuron math.
              </p>
            </div>
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("supervised")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === "supervised"
                    ? "bg-emerald-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Supervised Demo
              </button>
              <button
                onClick={() => setActiveTab("unsupervised")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === "unsupervised"
                    ? "bg-teal-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Unsupervised Demo
              </button>
              <button
                onClick={() => setActiveTab("reinforcement")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === "reinforcement"
                    ? "bg-cyan-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Reinforcement Grid
              </button>
              <button
                onClick={() => setActiveTab("deeplearning")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === "deeplearning"
                    ? "bg-purple-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Deep ANN Neuron
              </button>
            </div>
          </div>

          {/* Tab 1: Supervised Demo */}
          {activeTab === "supervised" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/70 p-6 rounded-xl border border-slate-800">
              {/* Regression Box */}
              <div className="bg-slate-900 p-5 rounded-lg border border-slate-800">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">1. Regression Simulator</span>
                <h4 className="text-white font-semibold text-sm mt-1 mb-3">Exam Score Prediction by Study Hours</h4>
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Study Hours / Day:</span>
                    <span className="font-bold text-emerald-400">{studyHours} hrs</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={studyHours}
                    onChange={(e) => setStudyHours(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
                <div className="bg-slate-950 p-4 rounded border border-emerald-500/30 text-center">
                  <div className="text-xs text-slate-400 uppercase">Predicted Exam Score (y = mx + c)</div>
                  <div className="text-3xl font-black text-emerald-400 mt-1">{predictedScore}%</div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    Mathematical Model: <code>Score = 35 + (StudyHours &times; 7.5)</code>
                  </p>
                </div>
              </div>

              {/* Classification Box */}
              <div className="bg-slate-900 p-5 rounded-lg border border-slate-800">
                <span className="text-xs uppercase tracking-wider text-teal-400 font-bold">2. Classification Simulator</span>
                <h4 className="text-white font-semibold text-sm mt-1 mb-2">Spam vs. Ham Email Filter</h4>
                <div className="mb-3">
                  <label className="text-xs text-slate-300 block mb-1">Email Body Content:</label>
                  <textarea
                    rows={2}
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div className={`p-4 rounded border text-center ${isSpam ? "bg-red-950/40 border-red-500/50" : "bg-emerald-950/40 border-emerald-500/50"}`}>
                  <div className="text-xs text-slate-400 uppercase">Binary Classification Result</div>
                  <div className={`text-2xl font-bold mt-1 ${isSpam ? "text-red-400" : "text-emerald-400"}`}>
                    {isSpam ? "🚨 SPAM DETECTED" : "✅ HAM (SAFE INBOX)"}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Keywords tracked: {emailSpamKeywords.join(", ")}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Unsupervised Demo */}
          {activeTab === "unsupervised" && (
            <div className="bg-slate-950/70 p-6 rounded-xl border border-slate-800">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                  <h4 className="text-white font-semibold text-sm">Customer Clustering via Unsupervised K-Means</h4>
                  <p className="text-slate-400 text-xs">Points are grouped naturally based on geometric proximity in feature space without labels.</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span>Number of Clusters (K):</span>
                  <select
                    value={selectedClusterK}
                    onChange={(e) => setSelectedClusterK(Number(e.target.value))}
                    className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100"
                  >
                    <option value={2}>K = 2</option>
                    <option value={3}>K = 3</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {rawDataPoints.map((pt) => {
                  const assignedColor =
                    pt.cluster === 1
                      ? "border-emerald-500/60 bg-emerald-950/30 text-emerald-300"
                      : pt.cluster === 2
                      ? "border-cyan-500/60 bg-cyan-950/30 text-cyan-300"
                      : "border-purple-500/60 bg-purple-950/30 text-purple-300";
                  return (
                    <div key={pt.id} className={`p-3 rounded border ${assignedColor} text-xs`}>
                      <div className="font-bold">Customer #{pt.id}</div>
                      <div>Annual Spend: ${pt.x}k</div>
                      <div>Visit Frequency: {pt.y}/yr</div>
                      <div className="mt-1 font-semibold text-[11px]">Cluster Group: #{pt.cluster <= selectedClusterK ? pt.cluster : 1}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 3: Reinforcement Grid */}
          {activeTab === "reinforcement" && (
            <div className="bg-slate-950/70 p-6 rounded-xl border border-slate-800">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                  <h4 className="text-white font-semibold text-sm">RL Agent GridWorld Environment</h4>
                  <p className="text-slate-400 text-xs">Navigate the autonomous agent to maximize cumulative policy score.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-xs bg-slate-900 px-3 py-1.5 rounded border border-slate-800">
                    Cumulative Reward: <span className="font-bold text-cyan-400">{agentScore}</span>
                  </div>
                  <button
                    onClick={resetRL}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition"
                  >
                    Reset Environment
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* 3x3 Grid */}
                <div className="grid grid-cols-3 gap-2 max-w-[280px] mx-auto bg-slate-900 p-2 rounded-xl border border-slate-800">
                  {[0, 1, 2].map((r) =>
                    [0, 1, 2].map((c) => {
                      const isAgent = agentPos.r === r && agentPos.c === c;
                      const isGoal = r === 2 && c === 2;
                      const isTrap = r === 1 && c === 1;
                      return (
                        <div
                          key={`${r}-${c}`}
                          className={`w-20 h-20 rounded-lg flex flex-col items-center justify-center font-bold text-xs border transition ${
                            isAgent
                              ? "bg-cyan-600 text-white border-cyan-400 shadow-lg scale-105"
                              : isGoal
                              ? "bg-emerald-950/60 border-emerald-500 text-emerald-300"
                              : isTrap
                              ? "bg-red-950/60 border-red-500 text-red-300"
                              : "bg-slate-950 border-slate-800 text-slate-500"
                          }`}
                        >
                          {isAgent ? "🤖 AGENT" : isGoal ? "🌟 GOAL (+100)" : isTrap ? "💣 TRAP (-50)" : `(${r},${c})`}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Controller & Status */}
                <div className="space-y-4">
                  <div className="text-xs bg-slate-900 p-3 rounded border border-slate-800 text-slate-300">
                    <strong>Status:</strong> {gameMessage}
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => moveAgent(-1, 0)}
                      className="w-24 py-1.5 bg-slate-800 hover:bg-cyan-700 text-white rounded text-xs font-semibold"
                    >
                      ▲ UP
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => moveAgent(0, -1)}
                        className="w-24 py-1.5 bg-slate-800 hover:bg-cyan-700 text-white rounded text-xs font-semibold"
                      >
                        ◀ LEFT
                      </button>
                      <button
                        onClick={() => moveAgent(0, 1)}
                        className="w-24 py-1.5 bg-slate-800 hover:bg-cyan-700 text-white rounded text-xs font-semibold"
                      >
                        RIGHT ▶
                      </button>
                    </div>
                    <button
                      onClick={() => moveAgent(1, 0)}
                      className="w-24 py-1.5 bg-slate-800 hover:bg-cyan-700 text-white rounded text-xs font-semibold"
                    >
                      ▼ DOWN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Deep Learning ANN Neuron */}
          {activeTab === "deeplearning" && (
            <div className="bg-slate-950/70 p-6 rounded-xl border border-slate-800">
              <div className="mb-4">
                <h4 className="text-white font-semibold text-sm">Artificial Neuron (Perceptron) Activation Calculator</h4>
                <p className="text-slate-400 text-xs">
                  A biological neuron receives inputs via dendrites, sums them with synaptic weights plus bias, and triggers an activation function.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Inputs & Weights */}
                <div className="space-y-3 bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs">
                  <div className="font-bold text-purple-400">1. Inputs & Synaptic Weights</div>
                  <div>
                    <label className="block text-slate-400">Input X1: {inputX1}</label>
                    <input
                      type="range"
                      min="-1"
                      max="1"
                      step="0.1"
                      value={inputX1}
                      onChange={(e) => setInputX1(parseFloat(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400">Weight W1: {weightW1}</label>
                    <input
                      type="range"
                      min="-1"
                      max="1"
                      step="0.1"
                      value={weightW1}
                      onChange={(e) => setWeightW1(parseFloat(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400">Input X2: {inputX2}</label>
                    <input
                      type="range"
                      min="-1"
                      max="1"
                      step="0.1"
                      value={inputX2}
                      onChange={(e) => setInputX2(parseFloat(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400">Weight W2: {weightW2}</label>
                    <input
                      type="range"
                      min="-1"
                      max="1"
                      step="0.1"
                      value={weightW2}
                      onChange={(e) => setWeightW2(parseFloat(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400">Bias b: {biasB}</label>
                    <input
                      type="range"
                      min="-1"
                      max="1"
                      step="0.1"
                      value={biasB}
                      onChange={(e) => setBiasB(parseFloat(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                  </div>
                </div>

                {/* Computation Step */}
                <div className="space-y-3 bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs">
                  <div className="font-bold text-purple-400">2. Linear Summation (Z)</div>
                  <p className="text-slate-300">
                    <code>Z = &Sigma;(X<sub>i</sub> &times; W<sub>i</sub>) + b</code>
                  </p>
                  <div className="bg-slate-950 p-3 rounded border border-slate-800 space-y-1 font-mono text-[11px] text-slate-300">
                    <div>({inputX1} &times; {weightW1}) = {(inputX1 * weightW1).toFixed(3)}</div>
                    <div>+ ({inputX2} &times; {weightW2}) = {(inputX2 * weightW2).toFixed(3)}</div>
                    <div>+ Bias ({biasB})</div>
                    <div className="pt-2 border-t border-slate-700 text-purple-300 font-bold">
                      Net Input Z = {netInput}
                    </div>
                  </div>
                </div>

                {/* Activations */}
                <div className="space-y-3 bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs">
                  <div className="font-bold text-purple-400">3. Activation Outputs</div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-800">
                    <div className="text-slate-400 font-semibold mb-1">Sigmoid Function: 1 / (1 + e<sup>-Z</sup>)</div>
                    <div className="text-xl font-mono font-bold text-emerald-400">{sigmoidOutput}</div>
                    <div className="text-[10px] text-slate-500">Maps output strictly to (0, 1) probability range.</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-800">
                    <div className="text-slate-400 font-semibold mb-1">ReLU Function: max(0, Z)</div>
                    <div className="text-xl font-mono font-bold text-cyan-400">{reluOutput}</div>
                    <div className="text-[10px] text-slate-500">Standard for hidden layers in deep neural networks.</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section 4: Deep Learning Architectures (ANN, CNN, RNN) */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm">04</span>
            Deep Learning Architectures: ANN vs. CNN vs. RNN
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl">
              <h3 className="text-emerald-400 font-bold mb-2">ANN (Artificial Neural Network)</h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-3">
                Standard fully-connected Feedforward network with input, multiple hidden layers, and output.
              </p>
              <div className="text-xs text-slate-400 space-y-1">
                <div><strong>Input:</strong> Tabular / structured records.</div>
                <div><strong>Use case:</strong> Credit scoring, risk prediction, simple classification.</div>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl">
              <h3 className="text-cyan-400 font-bold mb-2">CNN (Convolutional Neural Network)</h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-3">
                Uses 2D convolutional filter matrices to capture spatial hierarchies, edges, textures, and shapes.
              </p>
              <div className="text-xs text-slate-400 space-y-1">
                <div><strong>Input:</strong> Grid data like 2D/3D images, video frames.</div>
                <div><strong>Use case:</strong> Facial recognition, medical X-ray scans, autonomous vision.</div>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl">
              <h3 className="text-purple-400 font-bold mb-2">RNN & Transformers</h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-3">
                Features internal feedback loops and attention mechanisms to maintain temporal context across sequences.
              </p>
              <div className="text-xs text-slate-400 space-y-1">
                <div><strong>Input:</strong> Sequential streams, text tokens, audio waveforms.</div>
                <div><strong>Use case:</strong> Machine translation, speech-to-text, stock forecasting.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Overfitting vs Underfitting */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 text-sm">05</span>
            Model Generalization: Overfitting vs. Underfitting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="bg-slate-950/80 border border-red-500/30 p-5 rounded-xl">
              <div className="text-red-400 font-bold text-sm mb-1">Underfitting (High Bias)</div>
              <p className="text-slate-300 text-xs leading-relaxed mb-2">
                Model is too simplistic to capture underlying patterns. Performs poorly on both training and test data.
              </p>
              <div className="text-[11px] text-slate-400">
                <em>Remedy:</em> Use more complex models, add features, decrease regularization.
              </div>
            </div>

            <div className="bg-slate-950/80 border border-emerald-500/40 p-5 rounded-xl">
              <div className="text-emerald-300 font-bold text-sm mb-1">Optimal Fit (Balanced)</div>
              <p className="text-slate-300 text-xs leading-relaxed mb-2">
                Model captures general underlying trends without memorizing random noise. Performs well on unseen test data.
              </p>
              <div className="text-[11px] text-emerald-400">
                <em>Goal:</em> High generalization accuracy on real-world inputs.
              </div>
            </div>

            <div className="bg-slate-950/80 border border-amber-500/30 p-5 rounded-xl">
              <div className="text-amber-400 font-bold text-sm mb-1">Overfitting (High Variance)</div>
              <p className="text-slate-300 text-xs leading-relaxed mb-2">
                Model memorizes training data including noise (100% train accuracy), but fails drastically on new test data.
              </p>
              <div className="text-[11px] text-slate-400">
                <em>Remedy:</em> More training data, cross-validation, dropout, regularization.
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Python Simulation Script Loader */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 text-sm">06</span>
            Python Companion Simulation: ML & Neural Network Engine
          </h2>
          <p className="text-slate-300 text-sm mb-4">
            Inspect the pure Python implementation of Linear Regression, K-Means Clustering, and Single-Neuron Backpropagation.
          </p>
          <PythonFileLoader
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic2_files/ml_paradigms_engine.py"
            title="ml_paradigms_engine.py"
          />
        </section>

        {/* Section 7: PlainText Board Notes */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm">07</span>
            Quick Revision Notes (CBSE Class 11 Exam Guide)
          </h2>
          <PlainTextPrint
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic2_files/topic2_note.txt"
            title="Topic 2 Revision Notes"
          />
        </section>

        {/* Section 8: Interactive 25-MCQ Board Drill */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 text-sm">08</span>
                Interactive Board Practice Drill (25 MCQs)
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                Test your conceptual mastery on Supervised, Unsupervised, Reinforcement Learning, and Neural Networks.
              </p>
            </div>
            <button
              onClick={() => setShowResults(!showResults)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs md:text-sm font-bold shadow-lg transition"
            >
              {showResults ? "Hide Evaluation" : "Submit & Evaluate"}
            </button>
          </div>

          {showResults && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center">
              <div className="text-sm text-slate-300">Your Score:</div>
              <div className="text-3xl font-black text-emerald-400 my-1">
                {calculateScore()} / {topic2Questions.length}
              </div>
              <div className="text-xs text-slate-400">
                Percentage: {Math.round((calculateScore() / topic2Questions.length) * 100)}%
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic2Questions.map((q, qIndex) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border transition ${
                    showResults
                      ? isCorrect
                        ? "bg-emerald-950/20 border-emerald-500/40"
                        : "bg-red-950/20 border-red-500/40"
                      : "bg-slate-950/60 border-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="font-semibold text-white text-sm">
                      Q{qIndex + 1}. {q.question}
                    </span>
                    {showResults && (
                      <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${isCorrect ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`}>
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAnswer === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`text-left p-2.5 rounded-lg text-xs transition border ${
                            isSelected
                              ? "bg-emerald-600/30 border-emerald-500 text-white font-medium"
                              : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <span className="font-mono mr-2 text-slate-400">{String.fromCharCode(65 + optIdx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                      <div className="text-emerald-400">
                        <strong>Explanation (EN):</strong> {q.explanationEn}
                      </div>
                      <div className="text-teal-300">
                        <strong>ব্যাখ্যা (বাংলা):</strong> {q.explanationBn}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 9: FAQ Section */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 text-sm">09</span>
            Frequently Asked Questions (FAQs)
          </h2>
          <FAQTemplate
            faqs={[
              {
                q: "What is the primary difference between Supervised and Unsupervised learning?",
                a: "Supervised learning uses labeled training datasets (input features paired with target answers) to learn a mapping function. Unsupervised learning processes unlabeled data to discover hidden clusters, associations, and inherent geometric patterns."
              },
              {
                q: "Why do Deep Learning models need vast amounts of data and GPUs?",
                a: "Deep neural networks contain millions (or billions) of synaptic weight parameters. Training them requires millions of matrix multiplication operations across large datasets, which can be executed in parallel using GPU tensor cores."
              },
              {
                q: "What role does an activation function play in a neural network?",
                a: "Without activation functions (like ReLU or Sigmoid), a neural network would just be a linear regression model regardless of how many layers it has. Activation functions introduce non-linearities, allowing networks to learn complex decision boundaries."
              },
              {
                q: "How does Reinforcement Learning differ from standard supervised learning?",
                a: "Supervised learning provides immediate correct target labels for every single example. In Reinforcement Learning, the agent is not told what action to take; it must discover which actions yield the highest reward by interacting with an environment over time."
              }
            ]}
          />
        </section>

        {/* Section 10: Teacher Guidance */}
        <Teacher
          name="Sukanta Hui"
          designation="Senior Computer Science Educator"
          message="Machine Learning is transforming software engineering from writing static logic to training data-driven mathematical models. When preparing for Class 11 CBSE examinations, be very clear on distinguishing classification vs regression, clustering vs association, and the fundamental mechanics of neural networks."
        />
      </div>
    </div>
  );
}
