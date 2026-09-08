import React, { useState } from "react";
import {
  GraduationCap,
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
  Percent,
  Play,
  Layers,
  Award,
  Zap,
  ShieldCheck
} from "lucide-react";

import pyCode1 from "./topic17_files/01_end_to_end_classification.py?raw";
import pyCode2 from "./topic17_files/02_model_comparison_pipeline.py?raw";
import pyCode3 from "./topic17_files/03_production_inference_pipeline.py?raw";
import noteText from "./topic17_files/topic17_note.txt?raw";
import questions from "./topic17_files/topic17_questions.js";

const benchmarkModels = [
  { name: "Random Forest Classifier", acc: "94.2%", std: "±2.1%", f1: "0.93", icon: "🌲" },
  { name: "Logistic Regression", acc: "91.5%", std: "±3.0%", f1: "0.90", icon: "📈" },
  { name: "K-Nearest Neighbors (K=5)", acc: "88.0%", std: "±4.2%", f1: "0.87", icon: "👥" },
  { name: "Decision Tree (max_depth=3)", acc: "86.5%", std: "±3.8%", f1: "0.85", icon: "🌿" }
];

export default function Topic17() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Live Applicant Input State
  const [attendance, setAttendance] = useState(82);
  const [quizScore, setQuizScore] = useState(74);
  const [labCompleted, setLabCompleted] = useState("Yes");
  const [priorExp, setPriorExp] = useState("Intermediate");

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_end_to_end_classification.py", code: pyCode1 },
    { name: "02_model_comparison_pipeline.py", code: pyCode2 },
    { name: "03_production_inference_pipeline.py", code: pyCode3 }
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

  // Inference Calculation
  const labFactor = labCompleted === "Yes" ? 25 : -20;
  const expBonus = priorExp === "Advanced" ? 15 : priorExp === "Intermediate" ? 8 : 0;
  const rawScore = attendance * 0.45 + quizScore * 0.45 + labFactor + expBonus;

  // Sigmoid probability calculation
  const z = (rawScore - 65) / 12;
  const probPass = 1 / (1 + Math.exp(-z));
  const isCertified = probPass >= 0.5;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-emerald-500/20 rounded-xl text-emerald-400 border border-emerald-500/30">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Topic 17 • Worked Example 1
              </span>
              <span className="text-xs text-slate-400 font-mono">End-to-End Classification</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              Case Study: Student Certification Predictor
            </h1>
          </div>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Walk through a production-grade classification workflow at Coder &amp; AccoTax (Barrackpore).
          From data ingestion and stratified splitting to ColumnTransformer preprocessing, ensemble modeling, and live inference serving.
        </p>
      </div>

      {/* Main Tabs */}
      <div className="max-w-6xl mx-auto">
        <div className="flex border-b border-slate-800 mb-6 gap-2">
          <button
            onClick={() => setActiveTab("interactive")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "interactive"
                ? "border-emerald-400 text-emerald-400 bg-emerald-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Live Case Study Simulator
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "code"
                ? "border-emerald-400 text-emerald-400 bg-emerald-500/10"
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
                ? "border-emerald-400 text-emerald-400 bg-emerald-500/10"
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
                ? "border-emerald-400 text-emerald-400 bg-emerald-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Knowledge Check
          </button>
        </div>

        {/* TAB 1: INTERACTIVE CASE STUDY */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Applicant Form Inputs */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                    <Sliders className="w-4 h-4 text-emerald-400" />
                    Applicant Raw Features (X_new)
                  </h3>

                  {/* Attendance */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Attendance Rate (%):</span>
                      <span className="font-mono text-emerald-300 font-bold">{attendance}%</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="100"
                      value={attendance}
                      onChange={(e) => setAttendance(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  {/* Quiz Average */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Quiz Average Score:</span>
                      <span className="font-mono text-emerald-300 font-bold">{quizScore} pts</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      value={quizScore}
                      onChange={(e) => setQuizScore(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  {/* Lab Completion */}
                  <div className="mb-4">
                    <div className="text-xs text-slate-300 mb-1.5">Lab Practical Submissions:</div>
                    <div className="grid grid-cols-2 gap-2">
                      {["Yes", "No"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setLabCompleted(opt)}
                          className={`py-2 rounded-lg text-xs font-semibold transition-all border ${
                            labCompleted === opt
                              ? "bg-emerald-500/20 border-emerald-500/60 text-emerald-300"
                              : "bg-slate-950 border-slate-800 text-slate-400"
                          }`}
                        >
                          {opt === "Yes" ? "Completed (Yes)" : "Incomplete (No)"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Prior Experience */}
                  <div>
                    <div className="text-xs text-slate-300 mb-1.5">Prior Experience Level:</div>
                    <div className="grid grid-cols-3 gap-2">
                      {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => setPriorExp(lvl)}
                          className={`py-2 rounded-lg text-xs font-semibold transition-all border ${
                            priorExp === lvl
                              ? "bg-emerald-500/20 border-emerald-500/60 text-emerald-300"
                              : "bg-slate-950 border-slate-800 text-slate-400"
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Inference Decision Box */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-slate-400">Certification Decision:</span>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-bold font-mono ${
                        isCertified
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                      }`}
                    >
                      {isCertified ? "PASS: CERTIFIED" : "REVIEW: NEEDS RETAKE"}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-300 font-mono">
                      <span>Model Confidence:</span>
                      <span className="font-bold text-emerald-400">{(probPass * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div
                        style={{ width: `${probPass * 100}%` }}
                        className={`h-full transition-all duration-300 ${
                          isCertified ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Model Benchmarking Table & Pipeline Blueprint */}
              <div className="lg:col-span-7 space-y-4">
                {/* Benchmark Leaderboard */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                    <Award className="w-4 h-4 text-emerald-400" />
                    5-Fold Stratified Cross-Validation Leaderboard
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-950/80 text-slate-400 font-mono border-b border-slate-800">
                        <tr>
                          <th className="p-2.5">Candidate Model</th>
                          <th className="p-2.5 text-emerald-400">Mean Accuracy</th>
                          <th className="p-2.5 text-slate-400">Stability (σ)</th>
                          <th className="p-2.5 text-sky-400">F1-Score</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {benchmarkModels.map((m, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-2.5 font-sans font-medium text-slate-200 flex items-center gap-2">
                              <span>{m.icon}</span>
                              <span>{m.name}</span>
                            </td>
                            <td className="p-2.5 text-emerald-300 font-bold bg-emerald-500/5">
                              {m.acc}
                            </td>
                            <td className="p-2.5 text-slate-400">{m.std}</td>
                            <td className="p-2.5 text-sky-300 font-semibold">{m.f1}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* End-to-end Architecture Blueprint */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3 font-mono text-xs">
                  <div className="text-slate-300 font-sans font-semibold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Production Pipeline Architecture
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-slate-300">
                    <div className="text-emerald-400 font-bold">1. ColumnTransformer:</div>
                    <div className="pl-4 text-slate-400">
                      • Numeric ['attendance_pct', 'quiz_avg'] → SimpleImputer(median) → StandardScaler()
                    </div>
                    <div className="pl-4 text-slate-400">
                      • Categorical ['lab_completed', 'prior_exp'] → OneHotEncoder(handle_unknown='ignore')
                    </div>
                    <div className="text-emerald-400 font-bold pt-1">2. Master Pipeline:</div>
                    <div className="pl-4 text-slate-400">
                      • Pipeline([('prep', preprocessor), ('clf', RandomForestClassifier())])
                    </div>
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
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
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
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
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
                <BookOpen className="w-5 h-5 text-emerald-400" />
                Classroom Revision Notes: Worked Example 1 (Classification)
              </h3>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400"
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
                    <HelpCircle className="w-5 h-5 text-emerald-400" />
                    Topic 17 Quiz: End-to-End Classification
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Assess your mastery of end-to-end ML workflows, column transformers, and deployment practices.
                  </p>
                </div>
                {submittedQuiz && (
                  <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-center">
                    <div className="text-xs uppercase text-emerald-300 font-semibold">Your Score</div>
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
                        <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono mt-0.5">
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
                            optStyle = "bg-emerald-500/20 border-emerald-500/50 text-emerald-200";
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
                          <strong className="text-emerald-300 block mb-1">Explanation:</strong>
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
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-emerald-600/20"
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
