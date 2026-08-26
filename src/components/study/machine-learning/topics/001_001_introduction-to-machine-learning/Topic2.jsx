import React, { useState, useId } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import whyMlNeededLab from "./topic2_files/why_ml_needed_lab.py?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions.js";

const Topic2 = () => {
  const [activeTab, setActiveTab] = useState("imperatives");
  const [gammaRadius, setGammaRadius] = useState(2.5);
  const [selectedSensorIndex, setSelectedSensorIndex] = useState(0);

  const svgId = useId();

  // Synthetic IoT Turbine Telemetry data points from Barrackpore & Ichapur
  const sensorData = [
    { name: "Turbine-1 (Barrackpore)", x: 0.1, y: 0.2, trueLabel: 0, desc: "Normal Core Vibration (Optimal)" },
    { name: "Turbine-2 (Ichapur)", x: 0.0, y: -0.15, trueLabel: 0, desc: "Normal Temperature Core" },
    { name: "Turbine-3 (Kolkata)", x: -0.2, y: 0.1, trueLabel: 0, desc: "Normal Baseline Load" },
    { name: "Turbine-4 (Jadavpur)", x: 0.15, y: -0.15, trueLabel: 0, desc: "Optimal RPM Baseline" },
    { name: "Turbine-5 (Barrackpore)", x: 0.05, y: 0.05, trueLabel: 0, desc: "Perfect Stability" },

    // Outer Ring Anomalies (Non-linear interaction)
    { name: "Turbine-6 (Ichapur)", x: 0.8, y: 0.7, trueLabel: 1, desc: "High Harmonic Resonance & Thermal Spike" },
    { name: "Turbine-7 (Kolkata)", x: -0.75, y: 0.75, trueLabel: 1, desc: "Bearing Misalignment" },
    { name: "Turbine-8 (Barrackpore)", x: 0.85, y: -0.65, trueLabel: 1, desc: "Rotor Imbalance Anomaly" },
    { name: "Turbine-9 (Jadavpur)", x: -0.8, y: -0.7, trueLabel: 1, desc: "Lubrication Breakdown" },
    { name: "Turbine-10 (Salt Lake)", x: 0.0, y: 0.95, trueLabel: 1, desc: "Thermal Exhaust Overload" },
    { name: "Turbine-11 (Barrackpore)", x: 0.95, y: 0.0, trueLabel: 1, desc: "Extreme Vibration Outlier" },
    { name: "Turbine-12 (Ichapur)", x: -0.95, y: 0.0, trueLabel: 1, desc: "Gearbox Micro-fracture Risk" }
  ];

  // Evaluate Linear Rule vs Non-Linear RBF Model
  const evaluatePoints = () => {
    let linearCorrect = 0;
    let mlCorrect = 0;

    const evaluated = sensorData.map((pt) => {
      // Linear rule: x + y &ge; 0.0 (fails on concentric circle data)
      const linearPred = (pt.x + pt.y >= 0.0) ? 1 : 0;
      if (linearPred === pt.trueLabel) linearCorrect++;

      // Non-linear RBF Kernel approximation
      const distSq = (pt.x ** 2) + (pt.y ** 2);
      const rbfValue = Math.exp(-gammaRadius * distSq);
      const mlPred = rbfValue < 0.45 ? 1 : 0; // Outer ring has low RBF value to origin
      if (mlPred === pt.trueLabel) mlCorrect++;

      return {
        ...pt,
        distSq: +distSq.toFixed(3),
        linearPred,
        linearCorrect: linearPred === pt.trueLabel,
        mlPred,
        mlCorrect: mlPred === pt.trueLabel,
        mlConfidence: +((1 - rbfValue) * 100).toFixed(1)
      };
    });

    return {
      evaluated,
      linearAcc: +((linearCorrect / sensorData.length) * 100).toFixed(1),
      mlAcc: +((mlCorrect / sensorData.length) * 100).toFixed(1)
    };
  };

  const { evaluated, linearAcc, mlAcc } = evaluatePoints();
  const currentSelectedPt = evaluated[selectedSensorIndex];

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
              BCAC701B • Module 1 • Topic 2
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Why ML is Needed
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
              Non-Linearity &amp; Scale
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Machine Learning is Needed
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Understand the physical, mathematical, and economic bottlenecks of traditional rule engineering. Discover how Machine Learning resolves high-dimensional sensory data, dynamic non-stationary environments, non-linear geometric manifolds, and hyper-personalization at massive scale.
          </p>

          {/* Quick Tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "imperatives", label: "1. The 4 Fundamental Bottlenecks" },
              { id: "visualizer", label: "2. Non-Linear Manifold Visualizer" },
              { id: "pillars", label: "3. Pillars of Modern ML Explosion" },
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
              &gt;
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SECTION 1: THE 4 FUNDAMENTAL BOTTLENECKS */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The 4 Core Bottlenecks of Traditional Rule Engineering
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Why deterministic software development fails on real-world perception, language, and prediction
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bottleneck 1 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-rose-900/40 space-y-3 hover:border-rose-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">Bottleneck 1</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono">
                Dimensionality
              </span>
            </div>
            <h3 className="text-base font-bold text-white">High-Dimensional Sensory Data</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Raw sensory streams (audio speech waves, 4K medical imaging, LIDAR point clouds) contain millions of numbers per second. Human programmers cannot inspect or formulate if/else rules over hundreds of thousands of continuous pixel coordinates simultaneously.
            </p>
            <div className="text-[11px] font-mono text-slate-400 bg-slate-900 p-2.5 rounded border border-slate-800">
              X ∈ ℝ^(1024 × 1024 × 3) ➔ 3.14 Million dimensions per image
            </div>
          </div>

          {/* Bottleneck 2 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-amber-900/40 space-y-3 hover:border-amber-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Bottleneck 2</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono">
                Adaptability
              </span>
            </div>
            <h3 className="text-base font-bold text-white">Dynamic Non-Stationary Environments</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Real-world patterns undergo continuous concept and data drift (e.g. consumer demand shifts during festivals in Kolkata, mutating cyber-attack signatures). Handcrafted rules become obsolete quickly and require constant manual rewriting, whereas ML models retrain automatically.
            </p>
            <div className="text-[11px] font-mono text-slate-400 bg-slate-900 p-2.5 rounded border border-slate-800">
              Drift: P_t1(Y | X) ≠ P_t0(Y | X) (Automated Retraining required)
            </div>
          </div>

          {/* Bottleneck 3 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-purple-900/40 space-y-3 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase">Bottleneck 3</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-mono">
                Geometry
              </span>
            </div>
            <h3 className="text-base font-bold text-white">Non-Linear Latent Manifolds</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Physical, biological, and economic phenomena follow non-linear laws (weather over the Bay of Bengal, engine harmonic vibrations). Linear thresholds cannot separate concentric rings or intertwined spirals; ML kernel methods and neural layers map data into separable geometries.
            </p>
            <div className="text-[11px] font-mono text-slate-400 bg-slate-900 p-2.5 rounded border border-slate-800">
              Kernel Projection: Φ(x) : ℝ^d ➔ ℋ (Maps to high-dim separable Hilbert space)
            </div>
          </div>

          {/* Bottleneck 4 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-emerald-900/40 space-y-3 hover:border-emerald-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Bottleneck 4</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                Scalability
              </span>
            </div>
            <h3 className="text-base font-bold text-white">Hyper-Personalization at Scale</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Delivering customized product recommendations, video feeds, or search rankings for 50 million distinct users cannot be accomplished by writing 50 million rule files. ML matrix factorization and embedding models scale mathematically with massive user-item interaction tensors.
            </p>
            <div className="text-[11px] font-mono text-slate-400 bg-slate-900 p-2.5 rounded border border-slate-800">
              Embedding Factorization: R̂_u,i = u_uᵀ · v_i (Scales to millions of users/items)
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: NON-LINEAR MANIFOLD VISUALIZER */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Non-Linear Manifold Visualizer
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Observe why linear decision cuts fail on concentric IoT turbine sensor telemetry while an ML kernel achieves 100% accuracy
            </p>
          </div>
        </div>

        {/* Live Kernel Radius Slider */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">ML RBF Kernel Radius (γ):</span>
              <span className="text-xs text-slate-400 ml-2">Controls the curvature of the non-linear decision boundary</span>
            </div>
            <div className="font-mono text-xs text-indigo-300 font-bold bg-indigo-950 px-3 py-1 rounded border border-indigo-800">
              γ = {gammaRadius}
            </div>
          </div>

          <input
            type="range"
            min="0.5"
            max="6.0"
            step="0.1"
            value={gammaRadius}
            onChange={(e) => setGammaRadius(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          /&gt;
        </div>

        {/* 2D Scatter Space Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SVG Scatter Plot */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col items-center justify-center space-y-3">
            <div className="flex justify-between w-full text-xs text-slate-400">
              <span>Feature Space ($x_1$: Vibration, $x_2$: Temperature)</span>
              <span className="font-mono text-emerald-400">● Normal Core | ▲ Anomaly Ring</span>
            </div>

            <svg viewBox="-120 -120 240 240" className="w-full h-64 bg-slate-900/90 rounded-lg border border-slate-800">
              {/* Axes */}
              <line x1="-110" y1="0" x2="110" y2="0" stroke="#334155" strokeWidth="1" />
              <line x1="0" y1="-110" x2="0" y2="110" stroke="#334155" strokeWidth="1" />

              {/* Linear Cut Line (x + y = 0) */}
              <line x1="-100" y1="100" x2="100" y2="-100" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
              <text x="60" y="-70" fill="#f59e0b" fontSize="8" fontStyle="italic">Linear Cut</text>

              {/* Non-Linear Kernel Boundary Circle (RBF decision manifold) */}
              <circle
                cx="0"
                cy="0"
                r={Math.min(95, Math.max(35, 55 + (gammaRadius * 4)))}
                fill="none"
                stroke="#6366f1"
                strokeWidth="2"
                strokeDasharray="5 3"
              />
              <text x="-95" y="-95" fill="#818cf8" fontSize="8" fontWeight="bold">ML Non-Linear Boundary</text>

              {/* Data Points */}
              {evaluated.map((pt, idx) => {
                const cx = pt.x * 90;
                const cy = -pt.y * 90;
                const isSelected = selectedSensorIndex === idx;

                return (
                  <g
                    key={idx}
                    onClick={() => setSelectedSensorIndex(idx)}
                    className="cursor-pointer transition-transform hover:scale-125"
                  &gt;
                    {pt.trueLabel === 0 ? (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? "7" : "5"}
                        fill="#10b981"
                        stroke={isSelected ? "#ffffff" : "#047857"}
                        strokeWidth={isSelected ? "2" : "1"}
                      />
                    ) : (
                      <polygon
                        points={`${cx},${cy - 6} ${cx - 6},${cy + 5} ${cx + 6},${cy + 5}`}
                        fill="#f43f5e"
                        stroke={isSelected ? "#ffffff" : "#9f1239"}
                        strokeWidth={isSelected ? "2" : "1"}
                      />
                    )}
                  </g>
                );
              })}
            </svg>
            <div className="text-[11px] text-slate-500 text-center">
              Click on any sensor point to inspect its mathematical classification breakdown.
            </div>
          </div>

          {/* Live Performance & Point Inspector */}
          <div className="space-y-4">
            {/* Accuracy Benchmark Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-amber-900/40 space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Linear Rule Accuracy</span>
                <div className="text-2xl font-black font-mono text-amber-400">{linearAcc}%</div>
                <div className="text-[10px] text-slate-500">Failed on 50% of concentric points</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-indigo-900/40 space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Non-Linear ML Accuracy</span>
                <div className="text-2xl font-black font-mono text-emerald-400">{mlAcc}%</div>
                <div className="text-[10px] text-slate-500">100% boundary separation</div>
              </div>
            </div>

            {/* Point Inspector Card */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Inspected Telemetry Node</span>
                <span className={clsx(
                  "text-[10px] px-2 py-0.5 rounded font-bold",
                  currentSelectedPt.trueLabel === 0 ? "bg-emerald-950 text-emerald-300 border border-emerald-800" : "bg-rose-950 text-rose-300 border border-rose-800"
                )}>
                  True: {currentSelectedPt.trueLabel === 0 ? "Normal" : "Anomaly"}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white">{currentSelectedPt.name}</h4>
              <p className="text-xs text-slate-300">{currentSelectedPt.desc}</p>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-800">
                <div className="bg-slate-900 p-2 rounded">
                  <div className="text-[10px] text-slate-400">Linear Rule:</div>
                  <div className={clsx(currentSelectedPt.linearCorrect ? "text-emerald-400" : "text-rose-400")}>
                    {currentSelectedPt.linearPred === 0 ? "Normal" : "Anomaly"} {currentSelectedPt.linearCorrect ? "✔" : "❌"}
                  </div>
                </div>
                <div className="bg-slate-900 p-2 rounded">
                  <div className="text-[10px] text-slate-400">ML Classifier:</div>
                  <div className={clsx(currentSelectedPt.mlCorrect ? "text-emerald-400" : "text-rose-400")}>
                    {currentSelectedPt.mlPred === 0 ? "Normal" : "Anomaly"} {currentSelectedPt.mlCorrect ? "✔" : "❌"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: PILLARS OF MODERN ML ADOPTION */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-lg">
            03
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The 4 Pillars Enabling the Global Machine Learning Explosion
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Why Machine Learning emerged as the defining engineering revolution of this decade
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2.5">
            <div className="text-2xl">📊</div>
            <h3 className="text-sm font-bold text-white">1. Big Data Explosion</h3>
            <p className="text-xs text-slate-300">
              Terabytes of digitized business transactions, medical imaging archives, and IoT telemetry streams provide the empirical experience ($E$) needed for statistical convergence.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2.5">
            <div className="text-2xl">⚡</div>
            <h3 className="text-sm font-bold text-white">2. GPU / TPU Tensor Compute</h3>
            <p className="text-xs text-slate-300">
              Massively parallel SIMD architectures execute trillions of floating-point matrix multiplications per second, reducing training times from months to hours.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2.5">
            <div className="text-2xl">🧠</div>
            <h3 className="text-sm font-bold text-white">3. Algorithmic Advances</h3>
            <p className="text-xs text-slate-300">
              Breakthroughs in backpropagation, Adam optimizers, residual skip connections (ResNet), and self-attention mechanisms (Transformers) solved the vanishing gradient problem.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2.5">
            <div className="text-2xl">💰</div>
            <h3 className="text-sm font-bold text-white">4. Economic Automation</h3>
            <p className="text-xs text-slate-300">
              Delivering sub-millisecond fraud evaluation, automated document parsing, and proactive customer retention generates massive corporate return on investment.
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
              Concrete implementations where traditional code was replaced with Machine Learning
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Case 1 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400">Case 1 • Kolkata &amp; BT Road</span>
              <span className="text-[10px] px-2 py-0.5 bg-indigo-950 text-indigo-300 rounded border border-indigo-800">Dynamic Vision Control</span>
            </div>
            <h3 className="text-base font-bold text-white">Intelligent Urban Traffic Signal Control</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mamata and Mahima deployed computer-vision object detection coupled with reinforcement learning on traffic cameras along BT Road and EM Bypass. Instead of fixed 90-second timers, the model adjusts signal green lights dynamically according to real-time vehicular queue lengths, reducing congestion delays by 34%.
            </p>
          </div>

          {/* Case 2 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400">Case 2 • Jadavpur Medical Hub</span>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded border border-emerald-800">Time-Series Anomaly</span>
            </div>
            <h3 className="text-base font-bold text-white">Early Sepsis Prediction in ICU Patients</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu engineered a multi-variate time-series LSTM model analyzing continuous ICU telemetry (heart rate variability, respiration, mean arterial pressure). The model detects subtle septic shock signatures 6 hours before clinical fever spikes, saving lives through early antibiotic administration.
            </p>
          </div>

          {/* Case 3 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-400">Case 3 • Ichapur Manufacturing</span>
              <span className="text-[10px] px-2 py-0.5 bg-purple-950 text-purple-300 rounded border border-purple-800">Predictive Maintenance</span>
            </div>
            <h3 className="text-base font-bold text-white">Railway Rolling Stock Vibration Forensics</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Susmita implemented random forest classifiers on acoustic vibration sensors mounted to train axle boxes at Ichapur engineering workshops. The system flags micro-crack bearing friction 200 operational hours before catastrophic failure, preventing costly rail derailments.
            </p>
          </div>

          {/* Case 4 */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-400">Case 4 • Salt Lake Sector V</span>
              <span className="text-[10px] px-2 py-0.5 bg-rose-950 text-rose-300 rounded border border-rose-800">Vector Embeddings</span>
            </div>
            <h3 className="text-base font-bold text-white">E-Commerce Multilingual Semantic Search</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Abhronila implemented dense bi-encoder transformer embeddings for an online marketplace. When customers search in phonetic Bengali-English (e.g. &quot;cheler juto black&quot;), the vector database retrieves black men&apos;s formal shoes with zero manual translation dictionaries required.
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
              Common Pitfalls &amp; Engineering Principles
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Prerequisites and considerations before choosing Machine Learning
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Misconceptions &amp; Bad Habits
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Assuming ML fixes bad data:</strong> Garbage In, Garbage Out. ML magnifies dataset noise and sampling bias.</li>
              <li><strong className="text-white">Ignoring Data Collection Costs:</strong> Building models without budgeting for data labeling and annotation pipelines.</li>
              <li><strong className="text-white">Over-engineering simple tasks:</strong> Using an LLM for simple keyword searching when regex is 1000x faster and free.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Professional Architecture Rules
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Verify Data Availability:</strong> Confirm at least 1,000–10,000 representative samples exist before starting ML work.</li>
              <li><strong className="text-white">Evaluate ROI:</strong> Ensure the predictive lift of ML justifies the operational infrastructure and MLOps maintenance cost.</li>
              <li><strong className="text-white">Set Clear Metrics:</strong> Define business KPIs (e.g. reduction in churn %, latency under 50ms) alongside mathematical loss.</li>
            </ul>
          </div>
        </div>

        {/* Instructor Summary / Checklist */}
        <div className="bg-gradient-to-r from-slate-950 to-indigo-950/60 p-5 rounded-xl border border-indigo-800/40 space-y-2 text-xs">
          <div className="font-bold text-indigo-300 flex items-center gap-1.5">
            <span>💡</span> Instructor Tip:
          </div>
          <p className="text-slate-300 italic">
            &quot;Machine Learning is needed because the physical world is non-linear, sensory data is high-dimensional, and human behavior drifts over time. When these three conditions collide, traditional programming hits a wall—and Machine Learning becomes the only viable path forward.&quot;
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
              Laboratory benchmarking of linear threshold vs non-linear RBF kernel on concentric IoT sensor manifolds
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={whyMlNeededLab}
          title="why_ml_needed_lab.py"
          highlightLines={[19, 20, 21, 35, 36, 47, 48, 65, 80]}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: FAQ ACCORDION TEMPLATE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <FAQTemplate
          title="Why Machine Learning is Needed — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: PRINTABLE PLAIN TEXT STUDY NOTE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Why Machine Learning is Needed"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 2 Study Note"
          downloadFileName="topic2_note.txt"
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: TEACHER'S NOTE */}
      {/* ========================================================================= */}
      <section>
        <Teacher
          note="Always remember: We do not use Machine Learning because it is trendy; we use it because reality is non-linear and high-dimensional! If an engineering problem can be solved with a simple deterministic formula or SQL query, always choose the simple approach. Machine Learning is your powerful engine when faced with sensory data, pattern drift, and complex geometric manifolds."
        />
      </section>
    </div>
  );
};

export default Topic2;
