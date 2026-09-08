import React, { useState } from "react";
import {
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  RotateCcw,
  Activity,
  Percent,
  CheckCircle2,
  BrainCircuit,
  Compass,
  Zap
} from "lucide-react";

import pyCode1 from "./topic11_files/01_gaussian_nb_basics.py?raw";
import pyCode2 from "./topic11_files/02_naive_bayes_variants_comparison.py?raw";
import pyCode3 from "./topic11_files/03_inspecting_nb_parameters_and_priors.py?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions.js";

export default function Topic11() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Gaussian NB State
  const [queryHeight, setQueryHeight] = useState(172);
  const [priorAthlete, setPriorAthlete] = useState(0.5); // P(C0)

  // Gaussian Parameters:
  // Class 0 (Athlete): Mean = 182cm, Std = 6cm
  // Class 1 (General): Mean = 162cm, Std = 7cm
  const mu0 = 182;
  const sigma0 = 6;
  const mu1 = 162;
  const sigma1 = 7;

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_gaussian_nb_basics.py", code: pyCode1 },
    { name: "02_naive_bayes_variants_comparison.py", code: pyCode2 },
    { name: "03_inspecting_nb_parameters_and_priors.py", code: pyCode3 }
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

  // Gaussian PDF: f(x) = (1 / (sigma * sqrt(2*pi))) * exp(-0.5 * ((x - mu)/sigma)^2)
  const gaussianPdf = (x, mu, sigma) => {
    const factor = 1 / (sigma * Math.sqrt(2 * Math.PI));
    const exponent = -0.5 * Math.pow((x - mu) / sigma, 2);
    return factor * Math.exp(exponent);
  };

  const likelihood0 = gaussianPdf(queryHeight, mu0, sigma0);
  const likelihood1 = gaussianPdf(queryHeight, mu1, sigma1);

  const priorGeneral = 1 - priorAthlete;
  const unnorm0 = likelihood0 * priorAthlete;
  const unnorm1 = likelihood1 * priorGeneral;
  const totalEvidence = unnorm0 + unnorm1 || 0.00001;

  const posterior0 = (unnorm0 / totalEvidence) * 100;
  const posterior1 = (unnorm1 / totalEvidence) * 100;
  const predictedClass = posterior0 >= 50 ? "Athlete (Class 0)" : "General (Class 1)";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-purple-500/20 rounded-xl text-purple-400 border border-purple-500/30">
            <BrainCircuit className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                Topic 11 • Scikit-learn Overview
              </span>
              <span className="text-xs text-slate-400 font-mono">sklearn.naive_bayes.GaussianNB</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              Gaussian Naive Bayes &amp; Probabilistic Inference
            </h1>
          </div>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Explore probabilistic classification driven by Bayes' Theorem and Gaussian normal likelihoods.
          Observe how class priors (<code className="text-purple-300 font-mono">class_prior_</code>) and continuous distribution curves (<code className="text-purple-300 font-mono">theta_</code>, <code className="text-purple-300 font-mono">var_</code>) shape posterior probabilities.
        </p>
      </div>

      {/* Main Tabs */}
      <div className="max-w-6xl mx-auto">
        <div className="flex border-b border-slate-800 mb-6 gap-2">
          <button
            onClick={() => setActiveTab("interactive")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "interactive"
                ? "border-purple-400 text-purple-400 bg-purple-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Gaussian Likelihood Studio
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "code"
                ? "border-purple-400 text-purple-400 bg-purple-500/10"
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
                ? "border-purple-400 text-purple-400 bg-purple-500/10"
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
                ? "border-purple-400 text-purple-400 bg-purple-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Knowledge Check
          </button>
        </div>

        {/* TAB 1: INTERACTIVE GAUSSIAN STUDIO */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Sliders & Bayes Breakdown */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                    <Sliders className="w-4 h-4 text-purple-400" />
                    Inference Query &amp; Class Priors
                  </h3>

                  {/* Query Height Slider */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Query Height (x):</span>
                      <span className="font-mono text-purple-300 font-bold">{queryHeight} cm</span>
                    </div>
                    <input
                      type="range"
                      min="145"
                      max="200"
                      value={queryHeight}
                      onChange={(e) => setQueryHeight(Number(e.target.value))}
                      className="w-full accent-purple-400 cursor-pointer"
                    />
                  </div>

                  {/* Prior Probability Slider */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Prior P(Athlete):</span>
                      <span className="font-mono text-emerald-300 font-bold">
                        {(priorAthlete * 100).toFixed(0)}% (General: {(priorGeneral * 100).toFixed(0)}%)
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="0.9"
                      step="0.05"
                      value={priorAthlete}
                      onChange={(e) => setPriorAthlete(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  {/* Bayes Posterior Calculations */}
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2.5 font-mono text-xs">
                    <div className="text-slate-400 font-semibold font-sans">
                      Bayes Step-by-Step Breakdown:
                    </div>

                    <div className="flex justify-between text-slate-300">
                      <span>1. P(x | Athlete) Likelihood:</span>
                      <span className="text-emerald-400">{likelihood0.toFixed(4)}</span>
                    </div>

                    <div className="flex justify-between text-slate-300">
                      <span>2. P(x | General) Likelihood:</span>
                      <span className="text-sky-400">{likelihood1.toFixed(4)}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-900 flex justify-between text-slate-200">
                      <span className="font-sans font-bold">Posterior P(Athlete | x):</span>
                      <span className="text-emerald-300 font-bold text-sm">
                        {posterior0.toFixed(1)}%
                      </span>
                    </div>

                    <div className="flex justify-between text-slate-200">
                      <span className="font-sans font-bold">Posterior P(General | x):</span>
                      <span className="text-sky-300 font-bold text-sm">
                        {posterior1.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Predicted Class */}
                  <div className="mt-4 p-3.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Final Classification:</span>
                    <span className="text-xs px-2.5 py-1 rounded-full font-bold font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {predictedClass}
                    </span>
                  </div>
                </div>

                {/* Learned Parameters Box */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2 font-mono text-xs">
                  <div className="text-slate-400 font-semibold font-sans">Learned Class Gaussians:</div>
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-800/80 text-emerald-300">
                    <div>Athlete: μ = {mu0}cm, σ = {sigma0}cm (var = {sigma0 * sigma0})</div>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-800/80 text-sky-300">
                    <div>General: μ = {mu1}cm, σ = {sigma1}cm (var = {sigma1 * sigma1})</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Gaussian Bell Curves SVG */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Activity className="w-4 h-4 text-purple-400" />
                      Class Gaussian Likelihood Curves
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      ● General (Sky) | ● Athlete (Emerald)
                    </span>
                  </div>

                  <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 flex items-center justify-center">
                    <svg viewBox="140 0 70 200" className="w-full h-[300px]">
                      {/* Axes */}
                      <line x1="140" y1="180" x2="210" y2="180" stroke="#334155" strokeWidth="0.8" />

                      {/* Ticks */}
                      {[150, 160, 170, 180, 190, 200].map((tick) => (
                        <g key={tick}>
                          <line x1={tick} y1="178" x2={tick} y2="182" stroke="#64748b" strokeWidth="0.6" />
                          <text x={tick} y="192" fill="#94a3b8" fontSize="3.5" textAnchor="middle" fontFamily="monospace">
                            {tick}
                          </text>
                        </g>
                      ))}

                      {/* Class 1 (General) Gaussian Curve (Sky) */}
                      {(() => {
                        const pts = [];
                        for (let x = 140; x <= 210; x += 1) {
                          const y = 180 - gaussianPdf(x, mu1, sigma1) * 2600;
                          pts.push(`${x},${y}`);
                        }
                        return (
                          <polyline
                            fill="none"
                            stroke="#0284c7"
                            strokeWidth="1.5"
                            points={pts.join(" ")}
                          />
                        );
                      })()}

                      {/* Class 0 (Athlete) Gaussian Curve (Emerald) */}
                      {(() => {
                        const pts = [];
                        for (let x = 140; x <= 210; x += 1) {
                          const y = 180 - gaussianPdf(x, mu0, sigma0) * 2600;
                          pts.push(`${x},${y}`);
                        }
                        return (
                          <polyline
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="1.5"
                            points={pts.join(" ")}
                          />
                        );
                      })()}

                      {/* Vertical Indicator at queryHeight */}
                      {(() => {
                        const yIntersect0 = 180 - likelihood0 * 2600;
                        const yIntersect1 = 180 - likelihood1 * 2600;
                        return (
                          <g>
                            <line
                              x1={queryHeight}
                              y1="20"
                              x2={queryHeight}
                              y2="180"
                              stroke="#c084fc"
                              strokeWidth="1"
                              strokeDasharray="2 2"
                            />
                            {/* Athlete Intersect dot */}
                            <circle cx={queryHeight} cy={yIntersect0} r="1.8" fill="#10b981" />
                            {/* General Intersect dot */}
                            <circle cx={queryHeight} cy={yIntersect1} r="1.8" fill="#0284c7" />

                            <text
                              x={queryHeight}
                              y="15"
                              fill="#e9d5ff"
                              fontSize="3.8"
                              fontWeight="bold"
                              textAnchor="middle"
                              fontFamily="monospace"
                            >
                              x = {queryHeight}cm
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>

                  <div className="text-[11px] text-slate-400 mt-2 text-center">
                    The vertical purple line samples the Gaussian probability densities $P(x|General)$ and $P(x|Athlete)$ to form the joint evidence.
                  </div>
                </div>

                {/* Insight Callout */}
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white block mb-1">Bayes Theorem in Action:</strong>
                  Even if $x=172\text{cm}$ produces a slightly higher likelihood under the Athlete curve, shifting the Prior $P(Athlete)$ down to 20% will overturn the decision to General. Prior belief matters!
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
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
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
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-purple-400 transition-colors"
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
                <BookOpen className="w-5 h-5 text-purple-400" />
                Classroom Revision Notes: GaussianNB
              </h3>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-purple-400"
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
                    <HelpCircle className="w-5 h-5 text-purple-400" />
                    Topic 11 Quiz: Naive Bayes
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Evaluate your knowledge of Bayes' theorem, Gaussian parameters, and Naive Bayes variants.
                  </p>
                </div>
                {submittedQuiz && (
                  <div className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-xl text-center">
                    <div className="text-xs uppercase text-purple-300 font-semibold">Your Score</div>
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
                        <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono mt-0.5">
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
                            optStyle = "bg-purple-500/20 border-purple-500/50 text-purple-200";
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
                          <strong className="text-purple-300 block mb-1">Explanation:</strong>
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
                    className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-purple-600/20"
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
