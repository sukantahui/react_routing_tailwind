import React, { useState } from "react";
import {
  Filter,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Building,
  CheckCircle2,
  AlertTriangle,
  Layers
} from "lucide-react";

import pyCode1 from "./topic11_files/01_worked_example_zscore_pipeline.py?raw";
import pyCode2 from "./topic11_files/02_multivariate_zscore_filtering.py?raw";
import pyCode3 from "./topic11_files/03_production_anomaly_detector.py?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions.js";

const propertyData = [
  { id: 1, location: "Barrackpore Sadar Bazar", price: 3200 },
  { id: 2, location: "Chandan Pukur Station Road", price: 3450 },
  { id: 3, location: "Shyamnagar Ghoshpara", price: 3100 },
  { id: 4, location: "Ichapur Main Road", price: 3600 },
  { id: 5, location: "Barrackpore River View", price: 3300 },
  { id: 6, location: "Naihati Anandapuri", price: 3550 },
  { id: 7, location: "Titagarh BT Road", price: 3250 },
  { id: 8, location: "Kolkata Salt Lake Extension", price: 95000 }, // Typo Outlier
  { id: 9, location: "Palta Old Market", price: 3400 },
  { id: 10, location: "Barrackpore Cantonment", price: 3350 },
  { id: 11, location: "Shyamnagar Feeder Rd", price: 150 }, // Typo Outlier
  { id: 12, location: "Ichapur Rifle Factory Colony", price: 3500 }
];

export default function Topic11() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls
  const [threshold, setThreshold] = useState(2.0);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_worked_example_zscore_pipeline.py", code: pyCode1 },
    { name: "02_multivariate_zscore_filtering.py", code: pyCode2 },
    { name: "03_production_anomaly_detector.py", code: pyCode3 }
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

  // Math calculations
  const rawPrices = propertyData.map((p) => p.price);
  const rawMean = rawPrices.reduce((a, b) => a + b, 0) / rawPrices.length;
  const rawStd = Math.sqrt(rawPrices.reduce((acc, val) => acc + Math.pow(val - rawMean, 2), 0) / rawPrices.length);

  const processed = propertyData.map((p) => {
    const z = rawStd > 0 ? (p.price - rawMean) / rawStd : 0;
    const isOutlier = Math.abs(z) > threshold;
    return { ...p, zScore: z, isOutlier };
  });

  const cleanData = processed.filter((p) => !p.isOutlier);
  const cleanMean = cleanData.length > 0 ? cleanData.reduce((a, b) => a + b.price, 0) / cleanData.length : 0;
  const cleanStd =
    cleanData.length > 1
      ? Math.sqrt(cleanData.reduce((acc, val) => acc + Math.pow(val.price - cleanMean, 2), 0) / cleanData.length)
      : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <Filter className="w-4 h-4" />
                <span>Machine Learning Module 009_006 • Topic 11</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Worked Example 1: Computing Z-Scores with SciPy
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                End-to-end data cleaning and outlier filtering on real-estate property valuations in North 24 Parganas using <code className="text-emerald-400 font-mono">scipy.stats.zscore</code>.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Interactive Pipeline Studio", icon: Sparkles },
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
            {/* Control Threshold Bar */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <Filter className="w-4 h-4" />
                  <span>Outlier Filter Threshold (|Z| &gt; {threshold.toFixed(1)})</span>
                </div>
                <div className="flex gap-2">
                  {[1.5, 2.0, 2.5, 3.0].map((t) => (
                    <button
                      key={t}
                      onClick={() => setThreshold(t)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        threshold === t ? "bg-emerald-600 text-white" : "bg-slate-950 text-slate-400 hover:text-white"
                      }`}
                    >
                      |Z| &gt; {t.toFixed(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Before vs After Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-rose-900/40">
                  <span className="text-[11px] text-slate-400">Raw Mean Price / Sq.Ft.</span>
                  <div className="text-lg font-bold text-rose-400 font-mono mt-0.5">₹{rawMean.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</div>
                  <span className="text-[10px] text-rose-500">Distorted by typos!</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/40">
                  <span className="text-[11px] text-slate-400">Cleaned Mean Price</span>
                  <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">₹{cleanMean.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</div>
                  <span className="text-[10px] text-emerald-400">True market trend</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Cleaned Std Dev</span>
                  <div className="text-lg font-bold text-teal-400 font-mono mt-0.5">₹{cleanStd.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</div>
                  <span className="text-[10px] text-slate-500">Reduced variance</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Filtered Outliers</span>
                  <div className="text-lg font-bold text-amber-400 font-mono mt-0.5">{processed.length - cleanData.length} entries</div>
                  <span className="text-[10px] text-slate-500">{cleanData.length} valid rows retained</span>
                </div>
              </div>
            </div>

            {/* Dataset Table */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <Building className="w-4 h-4" />
                <span>Real Estate Feature Matrix Inspection</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">Property Locality</th>
                      <th className="py-2.5 px-3 text-right">Price (₹/sq.ft)</th>
                      <th className="py-2.5 px-3 text-right">Computed Z-Score</th>
                      <th className="py-2.5 px-3 text-center">Pipeline Verdict</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {processed.map((row) => (
                      <tr
                        key={row.id}
                        className={`transition-colors ${
                          row.isOutlier
                            ? "bg-rose-950/30 text-rose-200"
                            : "hover:bg-slate-800/50 text-slate-300"
                        }`}
                      >
                        <td className="py-2.5 px-3 text-slate-500">{row.id}</td>
                        <td className="py-2.5 px-3 font-sans font-medium text-white">{row.location}</td>
                        <td className="py-2.5 px-3 text-right font-bold">
                          ₹{row.price.toLocaleString("en-IN")}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          {row.zScore > 0 ? `+${row.zScore.toFixed(2)}` : row.zScore.toFixed(2)}σ
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          {row.isOutlier ? (
                            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[10px] font-bold">
                              OUTLIER FLAGGED
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
                              VALID SAMPLE
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
