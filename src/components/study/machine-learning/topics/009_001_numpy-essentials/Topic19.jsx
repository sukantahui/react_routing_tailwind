import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic19_files/01_min_max_scaling_manual_implementation.py?raw";
import pyCode2 from "./topic19_files/02_zscore_standardization_manual_implementation.py?raw";
import pyCode3 from "./topic19_files/03_l2_vector_unit_norm_scaling.py?raw";
import noteText from "./topic19_files/topic19_note.txt?raw";
import questions from "./topic19_files/topic19_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_min_max_scaling_manual_implementation.py",
    title: "1. Min-Max Scaling Implementation",
    badge: "Min-Max [0, 1]",
    code: pyCode1,
    summary: "Manually implements (X - X_min) / (X_max - X_min) with zero-span protection and custom target scaling ranges.",
  },
  {
    id: "part2",
    fileName: "02_zscore_standardization_manual_implementation.py",
    title: "2. Z-Score Standardization (StandardScaler)",
    badge: "Z-Score (μ=0, σ=1)",
    code: pyCode2,
    summary: "Builds a production-grade ManualStandardScaler class with fit and transform methods to prevent ML data leakage.",
  },
  {
    id: "part3",
    fileName: "03_l2_vector_unit_norm_scaling.py",
    title: "3. L2 Unit Vector Normalization",
    badge: "L2 Norm (||x||=1)",
    code: pyCode3,
    summary: "Performs sample-wise Euclidean unit length normalization for text embeddings and calculates pairwise Cosine Similarities.",
  },
];

const RAW_STUDENTS = [
  { name: "Debangshu", age: 20, income: 25000, score: 85 },
  { name: "Susmita",   age: 22, income: 48000, score: 92 },
  { name: "Swadeep",   age: 19, income: 15000, score: 65 },
  { name: "Tuhina",    age: 24, income: 60000, score: 88 },
];

const Topic19 = () => {
  const [activeTab, setActiveTab] = useState("interactive_scaler");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [scalingMethod, setScalingMethod] = useState("zscore"); // "raw", "minmax", "zscore", "l2norm"

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Column Statistics
  const ages = RAW_STUDENTS.map((s) => s.age);
  const incomes = RAW_STUDENTS.map((s) => s.income);
  const scores = RAW_STUDENTS.map((s) => s.score);

  const getStats = (arr) => {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    const std = Math.sqrt(arr.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / arr.length);
    return { min, max, mean, std };
  };

  const ageStats = getStats(ages);
  const incomeStats = getStats(incomes);
  const scoreStats = getStats(scores);

  // Scaled Data Generator
  const getTransformedRows = () => {
    return RAW_STUDENTS.map((s) => {
      if (scalingMethod === "raw") {
        return { name: s.name, age: s.age, income: s.income, score: s.score };
      }
      if (scalingMethod === "minmax") {
        return {
          name: s.name,
          age: parseFloat(((s.age - ageStats.min) / (ageStats.max - ageStats.min)).toFixed(3)),
          income: parseFloat(((s.income - incomeStats.min) / (incomeStats.max - incomeStats.min)).toFixed(3)),
          score: parseFloat(((s.score - scoreStats.min) / (scoreStats.max - scoreStats.min)).toFixed(3)),
        };
      }
      if (scalingMethod === "zscore") {
        return {
          name: s.name,
          age: parseFloat(((s.age - ageStats.mean) / ageStats.std).toFixed(3)),
          income: parseFloat(((s.income - incomeStats.mean) / incomeStats.std).toFixed(3)),
          score: parseFloat(((s.score - scoreStats.mean) / scoreStats.std).toFixed(3)),
        };
      }
      if (scalingMethod === "l2norm") {
        const norm = Math.sqrt(s.age * s.age + s.income * s.income + s.score * s.score);
        return {
          name: s.name,
          age: parseFloat((s.age / norm).toFixed(6)),
          income: parseFloat((s.income / norm).toFixed(6)),
          score: parseFloat((s.score / norm).toFixed(6)),
        };
      }
      return s;
    });
  };

  const transformedRows = getTransformedRows();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-amber-900/60 via-slate-900 to-orange-900/60 border border-amber-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-semibold rounded-full border border-amber-500/40">
                Topic 19 • Practical Case Study
              </span>
              <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-xs font-semibold rounded-full border border-orange-500/40">
                Worked Example 3
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-amber-200 via-orange-100 to-yellow-300 bg-clip-text text-transparent">
              Worked Example 3: Normalizing a Dataset Manually
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
              Construct manual data preprocessing pipelines from scratch: Min-Max feature rescaling to <code className="text-amber-300 font-mono">[0, 1]</code>, Z-Score standardization (<code className="text-orange-300 font-mono">μ=0, σ=1</code>), sample L2 vector normalization, and leakage prevention.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-800 pt-4">
          {[
            { id: "interactive_scaler", label: "Interactive Dataset Scaler", icon: "📐" },
            { id: "python_suite", label: "Python Multi-Script Suite", icon: "🐍" },
            { id: "teacher_notes", label: "Teacher's Classroom Notes", icon: "📝" },
            { id: "faqs_questions", label: "Quizzes & Questions", icon: "💡" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-105"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Interactive Dataset Scaler */}
      {activeTab === "interactive_scaler" && (
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Method Selector Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-3">
              Select Normalization / Scaling Algorithm:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: "raw", title: "Raw Features", formula: "Unnormalized X", color: "slate" },
                { id: "minmax", title: "Min-Max Scaler", formula: "(X - X_min) / (X_max - X_min)", color: "amber" },
                { id: "zscore", title: "Z-Score (StandardScaler)", formula: "(X - μ) / σ", color: "orange" },
                { id: "l2norm", title: "L2 Unit Norm", formula: "X / ||X||_2", color: "yellow" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setScalingMethod(m.id)}
                  className={`p-3.5 rounded-xl border text-left transition ${
                    scalingMethod === m.id
                      ? "bg-amber-500/20 border-amber-400 text-amber-200 shadow-md shadow-amber-500/10"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="font-bold text-xs text-slate-200">{m.title}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1 truncate">{m.formula}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Data Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-slate-200">
                  Feature Matrix Output: <span className="text-amber-300 font-mono">{scalingMethod.toUpperCase()}</span>
                </h4>
                <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-400 font-mono rounded">
                  4 Samples × 3 Features
                </span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
                <table className="w-full text-center text-xs font-mono">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800">
                      <th className="p-2 text-left">Student</th>
                      <th className="p-2 text-amber-400 font-bold">Age (Years)</th>
                      <th className="p-2 text-orange-400 font-bold">Income (INR)</th>
                      <th className="p-2 text-yellow-400 font-bold">Score (Marks)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transformedRows.map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-900">
                        <td className="p-2.5 text-slate-400 font-sans text-left text-xs font-semibold">
                          {row.name}
                        </td>
                        <td className="p-2.5 bg-slate-900/60 text-slate-200">{row.age}</td>
                        <td className="p-2.5 bg-slate-900/60 text-slate-200">{row.income}</td>
                        <td className="p-2.5 bg-slate-900/60 text-slate-200">{row.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                <span className="text-amber-400 font-semibold font-mono">🔍 Mathematical Note:</span> Raw Income (~45,000 INR) completely dominates Age (~20) by a factor of 2000x! Scaling eliminates gradient explosion and ensures fair feature weighting during ML model optimization.
              </div>
            </div>

            {/* Column Statistics Panel */}
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-amber-300 mb-4">Feature Column Statistics (Training Set)</h4>
                <div className="space-y-4 text-xs font-mono">
                  {/* Age */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-amber-400 font-bold block mb-1">Feature: Age</span>
                    <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-400">
                      <span>Min: {ageStats.min}</span>
                      <span>Max: {ageStats.max}</span>
                      <span>Mean (μ): {ageStats.mean.toFixed(2)}</span>
                      <span>Std (σ): {ageStats.std.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Income */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-orange-400 font-bold block mb-1">Feature: Income</span>
                    <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-400">
                      <span>Min: {incomeStats.min}</span>
                      <span>Max: {incomeStats.max}</span>
                      <span>Mean (μ): {incomeStats.mean.toFixed(2)}</span>
                      <span>Std (σ): {incomeStats.std.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-yellow-400 font-bold block mb-1">Feature: Score</span>
                    <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-400">
                      <span>Min: {scoreStats.min}</span>
                      <span>Max: {scoreStats.max}</span>
                      <span>Mean (μ): {scoreStats.mean.toFixed(2)}</span>
                      <span>Std (σ): {scoreStats.std.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-amber-950/30 border border-amber-900/60 rounded-xl text-[11px] text-amber-200">
                ⚠️ Store <code className="text-white font-mono">scaler.mean_</code> and <code className="text-white font-mono">scaler.std_</code> to normalize incoming inference test queries identically!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Python Multi-Script Suite */}
      {activeTab === "python_suite" && (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PYTHON_SCRIPTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedScriptId(s.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedScriptId === s.id
                    ? "bg-amber-950/40 border-amber-500 shadow-lg shadow-amber-500/10 scale-102"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
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
                <h3 className="text-lg font-bold text-amber-300">{activeScript.title}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{activeScript.fileName}</p>
              </div>
              <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                Worked Example 3 Suite
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
            quote="Features with radically different scales (like Income in thousands vs Age in tens) cause gradient descent to bounce erratically and stretch Euclidean distance metrics in KNN or K-Means. Building your own robust StandardScaler in pure NumPy gives you deep intuition for how Scikit-Learn transformers work under the hood."
          />
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-amber-300 mb-4 flex items-center gap-2">
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

export default Topic19;
