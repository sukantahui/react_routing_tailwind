import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic18_files/01_value_counts_frequencies_and_normalized.py?raw";
import pyCode2 from "./topic18_files/02_unique_nunique_cardinality.py?raw";
import pyCode3 from "./topic18_files/03_binning_continuous_variables.py?raw";
import noteText from "./topic18_files/topic18_note.txt?raw";
import questions from "./topic18_files/topic18_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_value_counts_frequencies_and_normalized.py",
    title: "1. value_counts(), Normalization & NaNs",
    badge: "value_counts()",
    code: pyCode1,
    summary: "Audit categorical frequency distributions, calculate percentage shares with normalize=True, and inspect missing data with dropna=False.",
  },
  {
    id: "part2",
    fileName: "02_unique_nunique_cardinality.py",
    title: "2. unique(), nunique() & Zero-Variance Pruning",
    badge: "unique() & nunique()",
    code: pyCode2,
    summary: "Extract distinct value arrays, profile feature cardinalities across DataFrames, and detect uninformative zero-variance constant features.",
  },
  {
    id: "part3",
    fileName: "03_binning_continuous_variables.py",
    title: "3. Discretization with value_counts(bins) & pd.cut",
    badge: "Numeric Binning",
    code: pyCode3,
    summary: "Discretize continuous numerical features into equal-width interval histograms or custom domain-specific performance tiers.",
  },
];

const RAW_DATA = [
  { id: 101, name: "Debangshu", locality: "Barrackpore", dept: "CSE", grade: "A", score: 85 },
  { id: 102, name: "Susmita",   locality: "Shyamnagar",  dept: "CSE", grade: "A+", score: 92 },
  { id: 103, name: "Swadeep",   locality: "Ichapur",      dept: "Commerce", grade: "B", score: 65 },
  { id: 104, name: "Tuhina",    locality: "Barrackpore", dept: "Science", grade: "A", score: 88 },
  { id: 105, name: "Sachin",    locality: "Kolkata",      dept: "Commerce", grade: "B", score: 78 },
  { id: 106, name: "Mahima",    locality: "Barrackpore", dept: "CSE", grade: "A+", score: 90 },
  { id: 107, name: "Abhronila", locality: "Titagarh",    dept: "Science", grade: "A", score: 84 },
  { id: 108, name: "Debangshu", locality: "Barrackpore", dept: "CSE", grade: "A", score: 80 },
  { id: 109, name: "Aniket",    locality: null,          dept: "CSE", grade: "A", score: 82 },
  { id: 110, name: "Priyanka",  locality: "Shyamnagar",  dept: "Science", grade: "A+", score: 95 },
];

const Topic18 = () => {
  const [activeTab, setActiveTab] = useState("counts_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");

  // Interactive controls
  const [selectedColumn, setSelectedColumn] = useState("dept"); // 'dept', 'locality', 'grade', 'score_bins'
  const [normalize, setNormalize] = useState(false);
  const [includeNaN, setIncludeNaN] = useState(false);

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Calculate frequency distributions
  const getFrequencies = () => {
    let countsMap = {};
    let total = 0;

    if (selectedColumn === "score_bins") {
      // 3 bins: 60-75, 76-85, 86-100
      const bins = [
        { label: "60 - 75 (Passing)", count: 0 },
        { label: "76 - 85 (Proficient)", count: 0 },
        { label: "86 - 100 (Mastery)", count: 0 },
      ];
      RAW_DATA.forEach((r) => {
        if (r.score <= 75) bins[0].count++;
        else if (r.score <= 85) bins[1].count++;
        else bins[2].count++;
        total++;
      });
      return bins.map((b) => ({
        key: b.label,
        count: b.count,
        percent: ((b.count / total) * 100).toFixed(1),
      }));
    }

    RAW_DATA.forEach((r) => {
      let val = r[selectedColumn];
      if (val === null) {
        if (includeNaN) {
          countsMap["NaN (Missing)"] = (countsMap["NaN (Missing)"] || 0) + 1;
          total++;
        }
      } else {
        countsMap[val] = (countsMap[val] || 0) + 1;
        total++;
      }
    });

    const entries = Object.entries(countsMap).map(([k, count]) => ({
      key: k,
      count,
      percent: ((count / total) * 100).toFixed(1),
    }));

    return entries.sort((a, b) => b.count - a.count);
  };

  const frequencies = getFrequencies();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-amber-900/40 via-yellow-900/30 to-slate-900/60 border border-amber-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                  Distribution &amp; Cardinality
                </span>
                <span className="text-xs text-slate-400 font-mono">Module 009_002 &bull; Topic 18</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Value Counts and Unique Values in Pandas
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-3xl">
                Audit categorical distributions and class balance: examine frequencies with{" "}
                <code className="text-amber-300 bg-slate-800 px-1 py-0.5 rounded">value_counts()</code>, profile cardinalities with{" "}
                <code className="text-amber-300 bg-slate-800 px-1 py-0.5 rounded">nunique()</code>, and discretize continuous variables into bins.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-700 flex items-center justify-center text-white font-mono text-xl font-bold shadow-lg shadow-amber-500/20">
                📊 #
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("counts_studio")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "counts_studio"
                ? "bg-amber-600 text-white shadow-lg shadow-amber-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            📊 Distribution Profiler Studio
          </button>
          <button
            onClick={() => setActiveTab("python_code")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "python_code"
                ? "bg-amber-600 text-white shadow-lg shadow-amber-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🐍 Python Code Lab ({PYTHON_SCRIPTS.length} Scripts)
          </button>
          <button
            onClick={() => setActiveTab("theory_notes")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "theory_notes"
                ? "bg-amber-600 text-white shadow-lg shadow-amber-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            📖 Comprehensive Notes
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "quiz"
                ? "bg-amber-600 text-white shadow-lg shadow-amber-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🧠 Quiz &amp; Assessment ({questions.length})
          </button>
        </div>

        {/* TAB 1: DISTRIBUTION STUDIO */}
        {activeTab === "counts_studio" && (
          <div className="space-y-6">
            {/* Interactive Selector Controls */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>🎛️</span> Configure Frequency Analysis Target
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Column Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Target Column (df[col])
                  </label>
                  <select
                    value={selectedColumn}
                    onChange={(e) => setSelectedColumn(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-amber-300 focus:outline-none focus:border-amber-500 font-mono"
                  >
                    <option value="dept">Department (Categorical)</option>
                    <option value="locality">Locality (Contains NaN)</option>
                    <option value="grade">Grade (Classification Target)</option>
                    <option value="score_bins">Score (Continuous Binned)</option>
                  </select>
                </div>

                {/* Normalize Toggle */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Frequency Representation (normalize=...)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setNormalize(false)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold font-mono transition-all ${
                        !normalize
                          ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      Raw Counts
                    </button>
                    <button
                      onClick={() => setNormalize(true)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold font-mono transition-all ${
                        normalize
                          ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      Percentages (%)
                    </button>
                  </div>
                </div>

                {/* dropna Toggle */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Missing Value Audit (dropna=...)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      disabled={selectedColumn === "score_bins"}
                      onClick={() => setIncludeNaN(false)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold font-mono transition-all ${
                        !includeNaN
                          ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                      } disabled:opacity-50`}
                    >
                      dropna=True
                    </button>
                    <button
                      disabled={selectedColumn === "score_bins"}
                      onClick={() => setIncludeNaN(true)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold font-mono transition-all ${
                        includeNaN
                          ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                      } disabled:opacity-50`}
                    >
                      dropna=False
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Python Code */}
              <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-amber-300">
                <span className="text-slate-500"># Executed Python command:</span>
                <div className="mt-1 font-bold">
                  {selectedColumn === "score_bins"
                    ? "df['Score'].value_counts(bins=3)"
                    : `df['${selectedColumn === "dept" ? "Department" : selectedColumn === "locality" ? "Locality" : "Grade"}'].value_counts(normalize=${normalize ? "True" : "False"}, dropna=${!includeNaN})`}
                </div>
              </div>
            </div>

            {/* Distribution Visualization Cards */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h3 className="text-md font-bold text-white flex items-center gap-2 mb-4">
                <span>📊</span> Value Frequency Distribution Bars
              </h3>

              <div className="space-y-4">
                {frequencies.map((item) => (
                  <div key={item.key} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-200 font-semibold">{item.key}</span>
                      <span className="text-amber-300 font-bold">
                        {normalize ? `${item.percent}%` : `${item.count} students (${item.percent}%)`}
                      </span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-3.5 border border-slate-800 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sukanta Hui Pedagogical Card */}
            <Teacher
              topic="Class Imbalance & Cardinality in ML Preprocessing"
              text="In machine learning classification, checking df['Target'].value_counts(normalize=True) is the first mandatory sanity check! If one class represents 95% of data, standard accuracy will give a false sense of success. Also, always check df.nunique() across all features: columns with nunique() == 1 offer zero signal, while high-cardinality columns (>1000 unique values) should not be one-hot encoded blindly!"
            />
          </div>
        )}

        {/* TAB 2: PYTHON CODE LAB */}
        {activeTab === "python_code" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PYTHON_SCRIPTS.map((script) => (
                <button
                  key={script.id}
                  onClick={() => setSelectedScriptId(script.id)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    selectedScriptId === script.id
                      ? "bg-amber-950/60 border-amber-500 text-white shadow-lg shadow-amber-500/10"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
                    {script.badge}
                  </div>
                  <div className="font-bold text-sm text-slate-100">{script.title}</div>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-2">{script.summary}</div>
                </button>
              ))}
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div>
                  <h3 className="text-md font-bold text-white font-mono">{activeScript.fileName}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{activeScript.summary}</p>
                </div>
              </div>
              <PythonFileLoader fileModule={activeScript.code} title={activeScript.fileName} />
            </div>
          </div>
        )}

        {/* TAB 3: NOTES */}
        {activeTab === "theory_notes" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <PlainTextPrint text={noteText} title="Topic 18 Revision Notes: Value Counts &amp; Unique Values" />
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <FAQTemplate questions={questions} title="Topic 18 Knowledge Check: Value Counts &amp; Unique Values" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic18;
