import React, { useState } from "react";
import {
  IndianRupee,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  RotateCcw,
  Activity,
  CheckCircle2,
  TrendingUp,
  Percent,
  Award,
  BarChart3
} from "lucide-react";

import pyCode1 from "./topic18_files/01_end_to_end_regression.py?raw";
import pyCode2 from "./topic18_files/02_regressor_benchmark_and_tuning.py?raw";
import pyCode3 from "./topic18_files/03_residual_analysis_and_export.py?raw";
import noteText from "./topic18_files/topic18_note.txt?raw";
import questions from "./topic18_files/topic18_questions.js";

const regressorLeaderboard = [
  { name: "Random Forest Regressor", r2: "0.912", rmse: "₹0.65L", mae: "₹0.48L", icon: "🌲" },
  { name: "Ridge Regression (α=1.0)", r2: "0.884", rmse: "₹0.78L", mae: "₹0.58L", icon: "📈" },
  { name: "Linear Regression (OLS)", r2: "0.875", rmse: "₹0.82L", mae: "₹0.62L", icon: "📐" },
  { name: "Lasso Regression (α=0.1)", r2: "0.840", rmse: "₹0.95L", mae: "₹0.71L", icon: "✂️" }
];

export default function Topic18() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Live Input State
  const [hours, setHours] = useState(24);
  const [projects, setProjects] = useState(4);
  const [certTier, setCertTier] = useState("Advanced"); // 'None' | 'Basic' | 'Advanced'
  const [location, setLocation] = useState("Kolkata"); // 'Barrackpore' | 'Kolkata' | 'Shyamnagar'

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_end_to_end_regression.py", code: pyCode1 },
    { name: "02_regressor_benchmark_and_tuning.py", code: pyCode2 },
    { name: "03_residual_analysis_and_export.py", code: pyCode3 }
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

  // Salary Prediction Formula (Emulating fitted Ridge pipeline)
  // Base intercept ~ 2.5 Lakhs
  const certBonus = certTier === "Advanced" ? 2.4 : certTier === "Basic" ? 1.1 : 0.0;
  const locBonus = location === "Kolkata" ? 1.2 : location === "Barrackpore" ? 0.6 : 0.2;
  const predictedSalary = 2.2 + hours * 0.18 + projects * 0.65 + certBonus + locBonus;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-400 border border-blue-500/30">
            <IndianRupee className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                Topic 18 • Worked Example 2
              </span>
              <span className="text-xs text-slate-400 font-mono">End-to-End Regression</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              Case Study: Placement Salary Expectation Regressor
            </h1>
          </div>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Explore continuous salary estimation in production. Learn how to combine numerical study indicators and
          one-hot categorical features in a single Scikit-learn Pipeline to predict annual placement packages.
        </p>
      </div>

      {/* Main Tabs */}
      <div className="max-w-6xl mx-auto">
        <div className="flex border-b border-slate-800 mb-6 gap-2">
          <button
            onClick={() => setActiveTab("interactive")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "interactive"
                ? "border-blue-400 text-blue-400 bg-blue-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Live Salary Studio
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "code"
                ? "border-blue-400 text-blue-400 bg-blue-500/10"
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
                ? "border-blue-400 text-blue-400 bg-blue-500/10"
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
                ? "border-blue-400 text-blue-400 bg-blue-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Knowledge Check
          </button>
        </div>

        {/* TAB 1: INTERACTIVE SALARY STUDIO */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Candidate Features Form */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                    <Sliders className="w-4 h-4 text-blue-400" />
                    Student Profile Attributes
                  </h3>

                  {/* Study hours */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Weekly Lab &amp; Study Hours:</span>
                      <span className="font-mono text-blue-300 font-bold">{hours} hrs/week</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="40"
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="w-full accent-blue-400 cursor-pointer"
                    />
                  </div>

                  {/* Portfolio Projects */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Portfolio Projects Built:</span>
                      <span className="font-mono text-blue-300 font-bold">{projects} projects</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={projects}
                      onChange={(e) => setProjects(Number(e.target.value))}
                      className="w-full accent-blue-400 cursor-pointer"
                    />
                  </div>

                  {/* Certification */}
                  <div className="mb-4">
                    <div className="text-xs text-slate-300 mb-1.5">Certification Level:</div>
                    <div className="grid grid-cols-3 gap-2">
                      {["None", "Basic", "Advanced"].map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => setCertTier(lvl)}
                          className={`py-2 rounded-lg text-xs font-semibold transition-all border ${
                            certTier === lvl
                              ? "bg-blue-500/20 border-blue-500/60 text-blue-300"
                              : "bg-slate-950 border-slate-800 text-slate-400"
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <div className="text-xs text-slate-300 mb-1.5">Job Location:</div>
                    <div className="grid grid-cols-3 gap-2">
                      {["Barrackpore", "Kolkata", "Shyamnagar"].map((loc) => (
                        <button
                          key={loc}
                          onClick={() => setLocation(loc)}
                          className={`py-2 rounded-lg text-xs font-semibold transition-all border ${
                            location === loc
                              ? "bg-blue-500/20 border-blue-500/60 text-blue-300"
                              : "bg-slate-950 border-slate-800 text-slate-400"
                          }`}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Prediction Card */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <div className="text-xs text-slate-400 mb-1">Pipeline Predicted Annual Package:</div>
                  <div className="text-3xl font-extrabold font-mono text-emerald-400 flex items-center gap-1">
                    <span>₹{predictedSalary.toFixed(2)}</span>
                    <span className="text-sm font-sans font-medium text-slate-400">Lakhs / annum</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-1">
                    Monthly Gross: ~₹{Math.round((predictedSalary * 100000) / 12).toLocaleString()} / month
                  </div>
                </div>
              </div>

              {/* Right Column: Leaderboard & Residual Metrics */}
              <div className="lg:col-span-7 space-y-4">
                {/* Benchmark Leaderboard */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                    <Award className="w-4 h-4 text-blue-400" />
                    5-Fold Cross-Validated Regressor Leaderboard
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-950/80 text-slate-400 font-mono border-b border-slate-800">
                        <tr>
                          <th className="p-2.5">Candidate Model</th>
                          <th className="p-2.5 text-emerald-400">R² Score</th>
                          <th className="p-2.5 text-amber-400">RMSE</th>
                          <th className="p-2.5 text-sky-400">MAE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {regressorLeaderboard.map((m, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-2.5 font-sans font-medium text-slate-200 flex items-center gap-2">
                              <span>{m.icon}</span>
                              <span>{m.name}</span>
                            </td>
                            <td className="p-2.5 text-emerald-300 font-bold bg-emerald-500/5">
                              {m.r2}
                            </td>
                            <td className="p-2.5 text-amber-300 font-semibold">{m.rmse}</td>
                            <td className="p-2.5 text-sky-300">{m.mae}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Preprocessing Architecture Box */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 font-mono text-xs space-y-2 text-slate-300">
                  <div className="text-slate-400 font-sans font-semibold">End-to-End Pipeline Blueprint:</div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                    <div className="text-blue-400 font-bold">1. ColumnTransformer:</div>
                    <div className="pl-4 text-slate-400">• num: ['study_hours', 'projects'] → StandardScaler()</div>
                    <div className="pl-4 text-slate-400">• cat: ['certifications', 'location'] → OneHotEncoder(drop='first')</div>
                    <div className="text-blue-400 font-bold pt-1">2. Regressor:</div>
                    <div className="pl-4 text-emerald-400">• Ridge(alpha=1.0)</div>
                  </div>
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
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
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
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400 transition-colors"
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
                <BookOpen className="w-5 h-5 text-blue-400" />
                Classroom Revision Notes: Worked Example 2 (Regression)
              </h3>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400"
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
                    <HelpCircle className="w-5 h-5 text-blue-400" />
                    Topic 18 Quiz: End-to-End Regression
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Evaluate your knowledge of regression pipelines, negative scoring metrics, and residual diagnostics.
                  </p>
                </div>
                {submittedQuiz && (
                  <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-xl text-center">
                    <div className="text-xs uppercase text-blue-300 font-semibold">Your Score</div>
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
                        <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono mt-0.5">
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
                            optStyle = "bg-blue-500/20 border-blue-500/50 text-blue-200";
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
                          <strong className="text-blue-300 block mb-1">Explanation:</strong>
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
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-blue-600/20"
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
