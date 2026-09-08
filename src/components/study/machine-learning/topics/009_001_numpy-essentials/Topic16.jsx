import React, { useState, useMemo } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic16_files/01_rand_randn_randint_distributions.py?raw";
import pyCode2 from "./topic16_files/02_random_seed_and_generator_reproducibility.py?raw";
import pyCode3 from "./topic16_files/03_choice_and_permutation_sampling.py?raw";
import pyCode4 from "./topic16_files/04_ml_synthetic_dataset_and_weight_init.py?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_rand_randn_randint_distributions.py",
    title: "1. Core Random Distributions",
    badge: "Distributions",
    code: pyCode1,
    summary: "Explores continuous uniform (rand, uniform), Gaussian bell-curve (randn, normal), and discrete integers (randint).",
  },
  {
    id: "part2",
    fileName: "02_random_seed_and_generator_reproducibility.py",
    title: "2. Seed & Modern default_rng (PCG64)",
    badge: "Reproducibility",
    code: pyCode2,
    summary: "Contrasts legacy global np.random.seed(42) with modern isolated generator instances (default_rng) for reproducible ML experiments.",
  },
  {
    id: "part3",
    fileName: "03_choice_and_permutation_sampling.py",
    title: "3. Choice, Replacement & Shuffling",
    badge: "Discrete Sampling",
    code: pyCode3,
    summary: "Demonstrates sampling with and without replacement, weighted class probabilities, and permutation vs in-place shuffle.",
  },
  {
    id: "part4",
    fileName: "04_ml_synthetic_dataset_and_weight_init.py",
    title: "4. ML Synthetic Data & Xavier Init",
    badge: "ML Data & Weights",
    code: pyCode4,
    summary: "Synthesizes regression datasets with ground-truth weights plus Gaussian noise and calculates Xavier/Glorot weight matrices.",
  },
];

const Topic16 = () => {
  const [activeTab, setActiveTab] = useState("distribution_sandbox");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [distType, setDistType] = useState("normal"); // "uniform", "normal", "integers"
  const [sampleCount, setSampleCount] = useState(500);
  const [randomSeed, setRandomSeed] = useState(42);

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Pseudo-random number generator simulation based on seed
  const samples = useMemo(() => {
    // Simple Mulberry32 seeded PRNG
    let s = randomSeed + 12345;
    const nextRandom = () => {
      s |= 0;
      s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t >>> 0) / 4294967296);
    };

    const arr = [];
    if (distType === "uniform") {
      for (let i = 0; i < sampleCount; i++) {
        arr.push(parseFloat((nextRandom() * 100).toFixed(2))); // [0, 100)
      }
    } else if (distType === "normal") {
      // Box-Muller transform for normal distribution
      for (let i = 0; i < sampleCount; i += 2) {
        const u1 = Math.max(1e-15, nextRandom());
        const u2 = nextRandom();
        const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
        // Scaled to Mean=70, Std=10
        arr.push(parseFloat((70 + z0 * 10).toFixed(2)));
        if (arr.length < sampleCount) {
          arr.push(parseFloat((70 + z1 * 10).toFixed(2)));
        }
      }
    } else if (distType === "integers") {
      for (let i = 0; i < sampleCount; i++) {
        arr.push(Math.floor(nextRandom() * 6) + 1); // [1..6]
      }
    }
    return arr;
  }, [distType, sampleCount, randomSeed]);

  // Statistics calculation
  const mean = (samples.reduce((a, b) => a + b, 0) / samples.length).toFixed(2);
  const variance = samples.reduce((acc, v) => acc + Math.pow(v - Number(mean), 2), 0) / samples.length;
  const std = Math.sqrt(variance).toFixed(2);
  const minVal = Math.min(...samples);
  const maxVal = Math.max(...samples);

  // Histogram Bins calculation
  const binCount = distType === "integers" ? 6 : 10;
  const bins = useMemo(() => {
    if (distType === "integers") {
      const counts = [0, 0, 0, 0, 0, 0];
      samples.forEach((v) => counts[v - 1]++);
      return counts.map((count, i) => ({
        label: `Die ${i + 1}`,
        count,
        percent: ((count / samples.length) * 100).toFixed(1),
      }));
    } else {
      const range = maxVal - minVal || 1;
      const step = range / binCount;
      const counts = new Array(binCount).fill(0);
      samples.forEach((v) => {
        let bIdx = Math.floor((v - minVal) / step);
        if (bIdx >= binCount) bIdx = binCount - 1;
        counts[bIdx]++;
      });
      return counts.map((count, i) => ({
        label: `${(minVal + i * step).toFixed(0)} - ${(minVal + (i + 1) * step).toFixed(0)}`,
        count,
        percent: ((count / samples.length) * 100).toFixed(1),
      }));
    }
  }, [samples, distType, binCount, minVal, maxVal]);

  const maxBinCount = Math.max(...bins.map((b) => b.count)) || 1;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-violet-900/60 via-slate-900 to-indigo-900/60 border border-violet-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-violet-500/20 text-violet-300 text-xs font-semibold rounded-full border border-violet-500/40">
                Topic 16 • Probability &amp; Sampling
              </span>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/40">
                np.random &amp; default_rng
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-violet-200 via-indigo-100 to-purple-300 bg-clip-text text-transparent">
              NumPy Random Module Basics
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
              Master statistical sampling across Uniform, Gaussian Normal, and Discrete distributions, understand modern <code className="text-violet-300 font-mono">default_rng(seed)</code> reproducibility, and explore real-world ML dataset generation and weight initialization.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-800 pt-4">
          {[
            { id: "distribution_sandbox", label: "Live Distribution Sandbox", icon: "📊" },
            { id: "python_suite", label: "Python Multi-Script Suite", icon: "🐍" },
            { id: "teacher_notes", label: "Teacher's Classroom Notes", icon: "📝" },
            { id: "faqs_questions", label: "Quizzes & Questions", icon: "💡" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-violet-500 text-slate-950 shadow-lg shadow-violet-500/25 scale-105"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Live Distribution Sandbox */}
      {activeTab === "distribution_sandbox" && (
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Controls Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Distribution Selector */}
              <div>
                <label className="text-xs font-bold text-violet-300 uppercase tracking-wider block mb-2">
                  1. Distribution Function
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "normal", label: "Normal (randn)", sub: "Bell Curve" },
                    { id: "uniform", label: "Uniform (rand)", sub: "Flat [0, 100)" },
                    { id: "integers", label: "Dice (randint)", sub: "Discrete [1..6]" },
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDistType(d.id)}
                      className={`p-2.5 rounded-xl border text-center transition ${
                        distType === d.id
                          ? "bg-violet-500/20 border-violet-400 text-violet-200 font-bold shadow-md shadow-violet-500/10"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <div className="text-xs font-mono">{d.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{d.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sample Count Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                    2. Sample Size (N)
                  </label>
                  <span className="text-xs font-mono text-indigo-400 font-bold">{sampleCount} samples</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="50"
                  value={sampleCount}
                  onChange={(e) => setSampleCount(Number(e.target.value))}
                  className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>50</span>
                  <span>1000</span>
                  <span>2000</span>
                </div>
              </div>

              {/* Seed Modifier */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                    3. Random Seed (PRNG)
                  </label>
                  <button
                    onClick={() => setRandomSeed((prev) => prev + 1)}
                    className="text-xs px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded border border-purple-500/30 hover:bg-purple-500/30 transition"
                  >
                    🎲 Re-Roll Seed
                  </button>
                </div>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between font-mono text-xs text-purple-300">
                  <span>default_rng(seed={randomSeed})</span>
                  <span className="text-[10px] text-slate-500">Deterministic</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1">Empirical Mean (μ)</span>
              <span className="text-xl font-bold font-mono text-violet-300">{mean}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Expected: {distType === "normal" ? "70.0" : distType === "uniform" ? "50.0" : "3.5"}</span>
            </div>
            <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1">Empirical Std (σ)</span>
              <span className="text-xl font-bold font-mono text-indigo-300">{std}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Expected: {distType === "normal" ? "10.0" : distType === "uniform" ? "28.87" : "1.71"}</span>
            </div>
            <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1">Min Sample</span>
              <span className="text-xl font-bold font-mono text-emerald-300">{minVal}</span>
            </div>
            <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1">Max Sample</span>
              <span className="text-xl font-bold font-mono text-amber-300">{maxVal}</span>
            </div>
          </div>

          {/* Histogram Visualization */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-200">Empirical Frequency Distribution (Histogram)</h3>
                <p className="text-xs text-slate-400">
                  Displays binned sample distribution matching theoretical probability density.
                </p>
              </div>
              <span className="text-xs font-mono text-violet-400 px-3 py-1 bg-violet-500/10 rounded-full border border-violet-500/20">
                {bins.length} Frequency Bins
              </span>
            </div>

            <div className="space-y-3">
              {bins.map((bin, i) => (
                <div key={i} className="flex items-center gap-3 text-xs font-mono">
                  <span className="w-24 text-right text-slate-400 truncate">{bin.label}</span>
                  <div className="flex-1 bg-slate-950 rounded-lg h-6 p-0.5 overflow-hidden border border-slate-800/80">
                    <div
                      className="bg-gradient-to-r from-violet-600 to-indigo-500 h-full rounded-md transition-all duration-300 flex items-center justify-end pr-2"
                      style={{ width: `${(bin.count / maxBinCount) * 100}%` }}
                    >
                      {bin.count > 0 && (
                        <span className="text-[10px] text-white font-bold">{bin.count}</span>
                      )}
                    </div>
                  </div>
                  <span className="w-12 text-slate-400 text-right">{bin.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Python Multi-Script Suite */}
      {activeTab === "python_suite" && (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PYTHON_SCRIPTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedScriptId(s.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedScriptId === s.id
                    ? "bg-violet-950/40 border-violet-500 shadow-lg shadow-violet-500/10 scale-102"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    {s.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">.py</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200 mb-1">{s.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{s.summary}</p>
              </button>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-violet-300">{activeScript.title}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{activeScript.fileName}</p>
              </div>
              <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                NumPy Probability Suite
              </span>
            </div>
            <PythonFileLoader fileModule={activeScript.code} title={activeScript.fileName} />
          </div>
        </div>
      )}

      {/* Tab 3: Teacher Notes */}
      {activeTab === "teacher_notes" && (
        <div className="max-w-5xl mx-auto space-y-6">
          <Teacher
            name="Sukanta Hui"
            title="Senior ML Instructor, Barrackpore Lab"
            quote="Randomness is the catalyst that enables machine learning models to break symmetry. Without randomized weight initialization, all neurons in a layer would compute the exact same gradient and learn identical representations! Always seed your random number generators with default_rng(seed) to guarantee that your research experiments are 100% reproducible."
          />
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-violet-300 mb-4 flex items-center gap-2">
              <span>📚 Comprehensive Topic Notes</span>
            </h3>
            <PlainTextPrint content={noteText} />
          </div>
        </div>
      )}

      {/* Tab 4: Quizzes & FAQs */}
      {activeTab === "faqs_questions" && (
        <div className="max-w-5xl mx-auto space-y-6">
          <FAQTemplate questions={questions} />
        </div>
      )}
    </div>
  );
};

export default Topic16;
