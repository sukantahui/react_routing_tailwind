import React, { useState } from "react";
import {
  Sliders,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Play,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
  Wand2,
  AlertTriangle
} from "lucide-react";

import pyCode1 from "./topic4_files/01_preprocessing_overview.py?raw";
import pyCode2 from "./topic4_files/02_numeric_scaling_and_binarizer.py?raw";
import pyCode3 from "./topic4_files/03_imputation_and_pipeline_prep.py?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions.js";

const sampleStudents = [
  { name: "Debangshu", hours: 12, score: 45 },
  { name: "Susmita", hours: 35, score: 92 },
  { name: "Swadeep", hours: 8, score: 38 },
  { name: "Tuhina", hours: 24, score: 78 },
  { name: "Sachin", hours: 18, score: 62 },
  { name: "Mahima", hours: 28, score: 84 },
  { name: "Abhronila", hours: 15, score: 55 }
];

export default function Topic4() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Preprocessing Interactive State
  const [selectedTransformer, setSelectedTransformer] = useState("standard");
  const [outlierValue, setOutlierValue] = useState(150); // extreme score outlier
  const [includeOutlier, setIncludeOutlier] = useState(false);
  const [binarizeThreshold, setBinarizeThreshold] = useState(60);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_preprocessing_overview.py", code: pyCode1 },
    { name: "02_numeric_scaling_and_binarizer.py", code: pyCode2 },
    { name: "03_imputation_and_pipeline_prep.py", code: pyCode3 }
  ];

  const copyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectAnswer = (qId, optionIdx) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  // Compute stats on score
  const dataset = includeOutlier
    ? [...sampleStudents, { name: "Outlier Case", hours: 45, score: outlierValue }]
    : sampleStudents;

  const rawScores = dataset.map((d) => d.score);
  const meanScore = rawScores.reduce((a, b) => a + b, 0) / rawScores.length;
  const stdScore = Math.sqrt(
    rawScores.map((x) => Math.pow(x - meanScore, 2)).reduce((a, b) => a + b, 0) / rawScores.length
  );
  const minScore = Math.min(...rawScores);
  const maxScore = Math.max(...rawScores);

  // Median & IQR
  const sortedScores = [...rawScores].sort((a, b) => a - b);
  const mid = Math.floor(sortedScores.length / 2);
  const medianScore =
    sortedScores.length % 2 !== 0
      ? sortedScores[mid]
      : (sortedScores[mid - 1] + sortedScores[mid]) / 2;
  const q25 = sortedScores[Math.floor(sortedScores.length * 0.25)];
  const q75 = sortedScores[Math.floor(sortedScores.length * 0.75)];
  const iqr = q75 - q25 || 1;

  // Transform scores according to selected transformer
  const transformedRows = dataset.map((item) => {
    let val = 0;
    let desc = "";
    if (selectedTransformer === "standard") {
      val = (item.score - meanScore) / (stdScore || 1);
      desc = `z = (x - ${meanScore.toFixed(1)}) / ${stdScore.toFixed(1)}`;
    } else if (selectedTransformer === "minmax") {
      val = (item.score - minScore) / (maxScore - minScore || 1);
      desc = `(x - ${minScore}) / (${maxScore} - ${minScore})`;
    } else if (selectedTransformer === "robust") {
      val = (item.score - medianScore) / iqr;
      desc = `(x - ${medianScore.toFixed(1)}) / IQR(${iqr.toFixed(1)})`;
    } else if (selectedTransformer === "binarizer") {
      val = item.score >= binarizeThreshold ? 1 : 0;
      desc = `x >= ${binarizeThreshold} ? 1 : 0`;
    } else if (selectedTransformer === "poly") {
      // Polynomial [x, x^2]
      val = Math.pow(item.score / 10, 2);
      desc = `(score/10)^2 = ${val.toFixed(1)}`;
    }
    return {
      ...item,
      transformed: typeof val === "number" ? val.toFixed(2) : val,
      desc
    };
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-sky-500/20 rounded-xl text-sky-400 border border-sky-500/30">
            <Wand2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                Topic 4 • Scikit-learn Overview
              </span>
              <span className="text-xs text-slate-400 font-mono">sklearn.preprocessing</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              Data Preprocessing &amp; Feature Transformations
            </h1>
          </div>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Explore the rich arsenal of <code className="text-sky-300 font-mono">sklearn.preprocessing</code> tools.
          Understand when and why to apply scaling, robust transformations, discretization, and polynomial feature expansions.
        </p>
      </div>

      {/* Main Tabs */}
      <div className="max-w-6xl mx-auto">
        <div className="flex border-b border-slate-800 mb-6 gap-2">
          <button
            onClick={() => setActiveTab("interactive")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "interactive"
                ? "border-sky-400 text-sky-400 bg-sky-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Preprocessing Studio
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "code"
                ? "border-sky-400 text-sky-400 bg-sky-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <Code2 className="w-4 h-4" />
            Python Code Lab ({scripts.length})
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "notes"
                ? "border-sky-400 text-sky-400 bg-sky-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Revision Notes
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "quiz"
                ? "border-sky-400 text-sky-400 bg-sky-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Knowledge Check
          </button>
        </div>

        {/* TAB 1: INTERACTIVE PREPROCESSING STUDIO */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            {/* Top Transformer Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {[
                { id: "standard", name: "StandardScaler", desc: "Z-score (μ=0, σ=1)" },
                { id: "minmax", name: "MinMaxScaler", desc: "Bounded in [0, 1]" },
                { id: "robust", name: "RobustScaler", desc: "Median & IQR (Outlier Proof)" },
                { id: "binarizer", name: "Binarizer", desc: "Threshold to 0 or 1" },
                { id: "poly", name: "PolynomialFeatures", desc: "Power / Interaction Terms" }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTransformer(t.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedTransformer === t.id
                      ? "bg-sky-500/15 border-sky-500/60 shadow-lg shadow-sky-950/50"
                      : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="font-semibold text-slate-200 text-xs font-mono">{t.name}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{t.desc}</div>
                </button>
              ))}
            </div>

            {/* Interactive Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Transformation Controls & Mathematical Formulations */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                    <Sliders className="w-4 h-4 text-sky-400" />
                    Experiment Controls
                  </h3>

                  {/* Outlier Toggle */}
                  <div className="p-3.5 bg-slate-950/80 rounded-lg border border-slate-800/80 mb-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-200 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        Inject Extreme Outlier
                      </span>
                      <input
                        type="checkbox"
                        checked={includeOutlier}
                        onChange={(e) => setIncludeOutlier(e.target.checked)}
                        className="w-4 h-4 rounded text-sky-500 focus:ring-sky-400 bg-slate-900 border-slate-700"
                      />
                    </div>

                    {includeOutlier && (
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Outlier Score Value:</span>
                          <span className="font-mono text-amber-300">{outlierValue}</span>
                        </div>
                        <input
                          type="range"
                          min="100"
                          max="300"
                          step="10"
                          value={outlierValue}
                          onChange={(e) => setOutlierValue(Number(e.target.value))}
                          className="w-full accent-amber-400 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>

                  {/* Binarizer Threshold */}
                  {selectedTransformer === "binarizer" && (
                    <div className="p-3.5 bg-slate-950/80 rounded-lg border border-slate-800/80 mb-4 space-y-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Binarizer Threshold:</span>
                        <span className="font-mono text-sky-300 font-bold">{binarizeThreshold}</span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="90"
                        step="5"
                        value={binarizeThreshold}
                        onChange={(e) => setBinarizeThreshold(Number(e.target.value))}
                        className="w-full accent-sky-400 cursor-pointer"
                      />
                      <div className="text-[11px] text-slate-400">
                        Values &gt;= {binarizeThreshold} become <strong className="text-emerald-400">1</strong>,
                        otherwise <strong className="text-slate-400">0</strong>.
                      </div>
                    </div>
                  )}

                  {/* Mathematical Stats */}
                  <div className="p-3.5 bg-slate-950/60 rounded-lg border border-slate-800 font-mono text-xs space-y-1.5 text-slate-300">
                    <div className="text-slate-400 font-semibold mb-1">Dataset Statistics:</div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Mean (μ):</span>
                      <span className="text-sky-300">{meanScore.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Std Dev (σ):</span>
                      <span className="text-sky-300">{stdScore.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Median / IQR:</span>
                      <span className="text-emerald-300">
                        {medianScore.toFixed(1)} / {iqr.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Min / Max:</span>
                      <span className="text-amber-300">
                        {minScore} / {maxScore}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Formula Highlight */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-xs space-y-2">
                  <div className="font-semibold text-slate-300">Formula in action:</div>
                  <div className="p-2.5 bg-slate-950 rounded font-mono text-sky-300 border border-slate-800">
                    {selectedTransformer === "standard" && "z = (x - mean) / standard_deviation"}
                    {selectedTransformer === "minmax" && "x_scaled = (x - min) / (max - min)"}
                    {selectedTransformer === "robust" && "x_robust = (x - median) / IQR"}
                    {selectedTransformer === "binarizer" && `f(x) = 1 if x >= ${binarizeThreshold} else 0`}
                    {selectedTransformer === "poly" && "f(x) = x^2 (degree=2 non-linear expansion)"}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Table & Visual Comparison */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Activity className="w-4 h-4 text-sky-400" />
                      Live Preprocessing Transformation Table
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      {dataset.length} samples
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-950/80 text-slate-400 font-mono border-b border-slate-800">
                        <tr>
                          <th className="p-2.5">Student</th>
                          <th className="p-2.5">Study Hrs</th>
                          <th className="p-2.5">Raw Score</th>
                          <th className="p-2.5 text-sky-400">Transformed Output</th>
                          <th className="p-2.5 text-slate-400">Calculation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {transformedRows.map((row, idx) => (
                          <tr
                            key={idx}
                            className={`hover:bg-slate-800/40 transition-colors ${
                              row.name.includes("Outlier") ? "bg-amber-500/10 text-amber-200" : ""
                            }`}
                          >
                            <td className="p-2.5 font-sans font-medium text-slate-200">
                              {row.name}
                            </td>
                            <td className="p-2.5 text-slate-400">{row.hours}h</td>
                            <td className="p-2.5 text-slate-300 font-semibold">{row.score}</td>
                            <td className="p-2.5 text-sky-300 font-bold bg-sky-500/5">
                              {row.transformed}
                            </td>
                            <td className="p-2.5 text-[11px] text-slate-400 truncate max-w-[150px]">
                              {row.desc}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Key Observation */}
                <div className="p-4 bg-gradient-to-r from-sky-950/30 to-slate-900 border border-sky-500/20 rounded-xl text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white block mb-1">
                    {selectedTransformer === "robust" && "Why RobustScaler shines here:"}
                    {selectedTransformer === "standard" && "Notice StandardScaler behavior:"}
                    {selectedTransformer === "minmax" && "Notice MinMaxScaler behavior:"}
                    {selectedTransformer === "binarizer" && "Notice Binarizer behavior:"}
                    {selectedTransformer === "poly" && "Notice Polynomial expansion:"}
                  </strong>
                  {selectedTransformer === "robust" && (
                    "When the outlier is enabled, notice how the scores for Debangshu and Susmita remain well-scaled because the median & IQR are unaffected by the 150+ outlier!"
                  )}
                  {selectedTransformer === "standard" && (
                    "When an outlier is injected, the mean shifts upward and standard deviation inflates, dragging all ordinary scores towards negative z-scores."
                  )}
                  {selectedTransformer === "minmax" && (
                    "MinMaxScaler compresses the normal range into a tiny cluster near 0 when an extreme upper outlier is introduced."
                  )}
                  {selectedTransformer === "binarizer" && (
                    "Converts quantitative grades into a binary classification flag (e.g. Pass/Distinction thresholding)."
                  )}
                  {selectedTransformer === "poly" && (
                    "Generates non-linear transformations allowing linear models (LinearRegression / LogisticRegression) to learn parabolic decision boundaries."
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CODE LAB */}
        {activeTab === "code" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
              {scripts.map((script, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedScript(idx)}
                  className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all ${
                    selectedScript === idx
                      ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                      : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  {script.name}
                </button>
              ))}
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400">
                  {scripts[selectedScript].name}
                </span>
                <button
                  onClick={() => copyCode(scripts[selectedScript].code)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-400 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-xs md:text-sm font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-[500px]">
                {scripts[selectedScript].code}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: REVISION NOTES */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-sky-400" />
                Classroom Revision Notes: sklearn.preprocessing
              </h3>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-400"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Notes</span>
              </button>
            </div>
            <pre className="text-xs md:text-sm font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
              {noteText}
            </pre>
          </div>
        )}

        {/* TAB 4: KNOWLEDGE CHECK */}
        {activeTab === "quiz" && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-sky-400" />
                    Topic 4 Quiz: Preprocessing Concepts
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Evaluate your knowledge of scalers, transformers, and data leakage safeguards.
                  </p>
                </div>
                {submittedQuiz && (
                  <div className="px-4 py-2 bg-sky-500/20 border border-sky-500/30 rounded-xl text-center">
                    <div className="text-xs uppercase text-sky-300 font-semibold">Your Score</div>
                    <div className="text-xl font-bold text-white">
                      {calculateScore()} / {questions.length}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {questions.map((q, idx) => {
                  const isSelected = selectedAnswers[q.id] !== undefined;
                  const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
                  return (
                    <div key={q.id} className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
                      <div className="text-sm font-semibold text-slate-200 mb-3 flex items-start gap-2">
                        <span className="text-xs px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono mt-0.5">
                          Q{idx + 1}
                        </span>
                        <span>{q.question}</span>
                      </div>

                      <div className="space-y-2 mb-3">
                        {q.options.map((opt, optIdx) => {
                          const checked = selectedAnswers[q.id] === optIdx;
                          let optStyle = "bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-900";
                          if (submittedQuiz) {
                            if (optIdx === q.correctAnswer) {
                              optStyle = "bg-emerald-500/20 border-emerald-500/50 text-emerald-200";
                            } else if (checked && !isCorrect) {
                              optStyle = "bg-rose-500/20 border-rose-500/50 text-rose-200";
                            }
                          } else if (checked) {
                            optStyle = "bg-sky-500/20 border-sky-500/50 text-sky-200";
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectAnswer(q.id, optIdx)}
                              className={`w-full text-left p-3 rounded-lg border text-xs md:text-sm transition-all flex items-center justify-between ${optStyle}`}
                            >
                              <span>{opt}</span>
                              {submittedQuiz && optIdx === q.correctAnswer && (
                                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {submittedQuiz && (
                        <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-xs text-slate-400">
                          <strong className="text-sky-300 block mb-1">Explanation:</strong>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                {submittedQuiz ? (
                  <button
                    onClick={() => {
                      setSelectedAnswers({});
                      setSubmittedQuiz(false);
                    }}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-all flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Quiz
                  </button>
                ) : (
                  <button
                    onClick={() => setSubmittedQuiz(true)}
                    disabled={Object.keys(selectedAnswers).length === 0}
                    className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-sky-600/20"
                  >
                    Submit Answers
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
