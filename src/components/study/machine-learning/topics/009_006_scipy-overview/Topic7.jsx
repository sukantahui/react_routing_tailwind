import React, { useState } from "react";
import {
  Scale,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Split,
  BarChart2,
  Activity,
  CheckCircle2
} from "lucide-react";

import pyCode1 from "./topic7_files/01_one_sample_ttest_1samp.py?raw";
import pyCode2 from "./topic7_files/02_independent_two_sample_ttest_ind.py?raw";
import pyCode3 from "./topic7_files/03_paired_ttest_rel_model_eval.py?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions.js";

export default function Topic7() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls
  const [testMode, setTestMode] = useState("2samp"); // 1samp | 2samp
  const [hypoMean, setHypoMean] = useState(75);
  const [groupAInput, setGroupAInput] = useState("88, 89, 87, 90, 88, 89, 87, 90, 88, 89");
  const [groupBInput, setGroupBInput] = useState("82, 83, 81, 84, 82, 83, 81, 84, 82, 83");

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_one_sample_ttest_1samp.py", code: pyCode1 },
    { name: "02_independent_two_sample_ttest_ind.py", code: pyCode2 },
    { name: "03_paired_ttest_rel_model_eval.py", code: pyCode3 }
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

  const parseArr = (str) =>
    str
      .split(",")
      .map((x) => parseFloat(x.trim()))
      .filter((n) => !isNaN(n));

  const arrA = parseArr(groupAInput);
  const arrB = parseArr(groupBInput);

  const calcMean = (arr) => (arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
  const calcVar = (arr, m) =>
    arr.length > 1 ? arr.reduce((acc, val) => acc + Math.pow(val - m, 2), 0) / (arr.length - 1) : 0;

  const meanA = calcMean(arrA);
  const varA = calcVar(arrA, meanA);
  const nA = arrA.length;

  const meanB = calcMean(arrB);
  const varB = calcVar(arrB, meanB);
  const nB = arrB.length;

  // t-test calculations
  let tStat = 0;
  let df = 1;
  if (testMode === "1samp" && nA > 1) {
    const se = Math.sqrt(varA / nA);
    tStat = se > 0 ? (meanA - hypoMean) / se : 0;
    df = nA - 1;
  } else if (testMode === "2samp" && nA > 1 && nB > 1) {
    // Welch's t-test
    const se = Math.sqrt(varA / nA + varB / nB);
    tStat = se > 0 ? (meanA - meanB) / se : 0;
    const num = Math.pow(varA / nA + varB / nB, 2);
    const denom = Math.pow(varA / nA, 2) / (nA - 1) + Math.pow(varB / nB, 2) / (nB - 1);
    df = denom > 0 ? num / denom : 1;
  }

  // Two-tailed p-value approximation using standard normal for quick demo visualizer
  const normalCDF = (z) => {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp((-z * z) / 2);
    const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z > 0 ? 1 - p : p;
  };
  const approxPVal = Math.min(1.0, 2 * (1 - normalCDF(Math.abs(tStat))));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <Scale className="w-4 h-4" />
                <span>Machine Learning Module 009_006 • Topic 7</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                scipy.stats.ttest_ind &amp; ttest_1samp
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Perform Student’s and Welch’s t-tests in Python. Compare sample means against target benchmarks and statistically validate ML model cross-validation benchmarks.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "t-Test Calculation Engine", icon: Sparkles },
              { id: "code", label: "Python Code Lab", icon: Code2 },
              { id: "notes", label: "Revision Notes", icon: BookOpen },
              { id: "quiz", label: "Knowledge Check", icon: HelpCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs md:text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                      : "bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Interactive Studio */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            {/* Mode Switcher */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <Split className="w-4 h-4" />
                  <span>Select Test Method</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTestMode("2samp")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      testMode === "2samp" ? "bg-emerald-600 text-white" : "bg-slate-950 text-slate-400"
                    }`}
                  >
                    2-Sample Independent (ttest_ind)
                  </button>
                  <button
                    onClick={() => setTestMode("1samp")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      testMode === "1samp" ? "bg-emerald-600 text-white" : "bg-slate-950 text-slate-400"
                    }`}
                  >
                    1-Sample Benchmark (ttest_1samp)
                  </button>
                </div>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">
                    {testMode === "2samp" ? "Group A / Model 1 Scores (e.g. Random Forest %):" : "Sample Measurements:"}
                  </label>
                  <input
                    type="text"
                    value={groupAInput}
                    onChange={(e) => setGroupAInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-[10px] text-slate-400">Mean: {meanA.toFixed(2)} | n = {nA}</span>
                </div>

                {testMode === "2samp" ? (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300">
                      Group B / Model 2 Scores (e.g. Decision Tree %):
                    </label>
                    <input
                      type="text"
                      value={groupBInput}
                      onChange={(e) => setGroupBInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-cyan-400 focus:outline-none focus:border-emerald-500"
                    />
                    <span className="text-[10px] text-slate-400">Mean: {meanB.toFixed(2)} | n = {nB}</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300">Hypothesized Population Mean (\mu_0):</label>
                    <input
                      type="number"
                      value={hypoMean}
                      onChange={(e) => setHypoMean(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-cyan-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Results Display */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-1">
                <span className="text-xs text-slate-400 font-mono">t-Statistic</span>
                <div className="text-2xl font-bold text-emerald-400 font-mono">{tStat.toFixed(4)}</div>
                <span className="text-[11px] text-slate-500">Degrees of freedom: {df.toFixed(1)}</span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-1">
                <span className="text-xs text-slate-400 font-mono">Two-Tailed p-Value</span>
                <div className="text-2xl font-bold text-teal-400 font-mono">
                  {approxPVal < 0.0001 ? "< 0.0001" : approxPVal.toFixed(4)}
                </div>
                <span className="text-[11px] text-slate-500">Significance Level \alpha = 0.05</span>
              </div>

              <div
                className={`border rounded-2xl p-5 space-y-1 ${
                  approxPVal < 0.05
                    ? "bg-emerald-950/40 border-emerald-500"
                    : "bg-amber-950/40 border-amber-500"
                }`}
              >
                <span className="text-xs font-bold font-mono">
                  {approxPVal < 0.05 ? "STATISTICALLY SIGNIFICANT" : "NOT SIGNIFICANT"}
                </span>
                <div className="text-xs text-slate-300 leading-relaxed mt-1">
                  {approxPVal < 0.05
                    ? `Reject H0: The difference of ${(Math.abs(meanA - (testMode === "2samp" ? meanB : hypoMean))).toFixed(2)} is real and unlikely due to noise.`
                    : "Fail to reject H0: Not enough statistical evidence to claim difference."}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Code Lab */}
        {activeTab === "code" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
              <div className="flex flex-wrap gap-2">
                {scripts.map((script, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedScript(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      selectedScript === idx
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                        : "bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800"
                    }`}
                  >
                    {script.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => copyCode(scripts[selectedScript].code)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Code"}</span>
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 overflow-x-auto font-mono text-xs leading-relaxed text-slate-300">
              <pre>{scripts[selectedScript].code}</pre>
            </div>
          </div>
        )}

        {/* Tab 3: Notes */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Classroom Printable Notes</span>
              </div>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Notes"}</span>
              </button>
            </div>
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 overflow-x-auto font-mono text-xs leading-relaxed text-slate-300 whitespace-pre-wrap">
              {noteText}
            </div>
          </div>
        )}

        {/* Tab 4: Knowledge Quiz */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Concept Validation &amp; Knowledge Check</span>
              </div>
              {submittedQuiz && (
                <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-semibold">
                  Score: {calculateScore()} / {questions.length}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {questions.map((q, idx) => {
                const selected = selectedAnswers[q.id];
                return (
                  <div key={q.id} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                    <h3 className="text-sm font-semibold text-white">
                      {idx + 1}. {q.question}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt, optIdx) => {
                        let btnClass = "bg-slate-900 hover:bg-slate-800/80 border-slate-800 text-slate-300";
                        if (selected === optIdx) {
                          btnClass = "bg-emerald-950 border-emerald-500 text-white";
                        }
                        if (submittedQuiz) {
                          if (optIdx === q.correctAnswer) {
                            btnClass = "bg-emerald-900/80 border-emerald-500 text-white font-semibold";
                          } else if (selected === optIdx && selected !== q.correctAnswer) {
                            btnClass = "bg-rose-950 border-rose-500 text-rose-200";
                          }
                        }
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(q.id, optIdx)}
                            className={`p-3 rounded-lg border text-left text-xs transition-all ${btnClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {submittedQuiz && (
                      <div className="mt-3 p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1">
                        <span className="font-semibold text-emerald-400">Explanation: </span>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                onClick={() => setSubmittedQuiz(!submittedQuiz)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-lg shadow-emerald-600/30"
              >
                {submittedQuiz ? "Reset Quiz" : "Submit Answers"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
