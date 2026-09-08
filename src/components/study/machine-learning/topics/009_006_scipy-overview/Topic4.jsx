import React, { useState } from "react";
import {
  LineChart,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  Layers,
  Activity,
  CheckCircle2
} from "lucide-react";

import pyCode1 from "./topic4_files/01_continuous_distributions_norm.py?raw";
import pyCode2 from "./topic4_files/02_discrete_distributions_binom_poisson.py?raw";
import pyCode3 from "./topic4_files/03_distribution_methods_pdf_cdf_ppf_rvs.py?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions.js";

export default function Topic4() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls
  const [distType, setDistType] = useState("norm"); // norm | binom | poisson
  const [mu, setMu] = useState(100);
  const [sigma, setSigma] = useState(15);
  const [evalX, setEvalX] = useState(115);

  // Binomial params
  const [nTrials, setNTrials] = useState(10);
  const [probP, setProbP] = useState(0.3);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_continuous_distributions_norm.py", code: pyCode1 },
    { name: "02_discrete_distributions_binom_poisson.py", code: pyCode2 },
    { name: "03_distribution_methods_pdf_cdf_ppf_rvs.py", code: pyCode3 }
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

  // Normal PDF & CDF Approximations
  const normalPDF = (x, m, s) => {
    return (1 / (s * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - m) / s, 2));
  };

  const normalCDF = (x, m, s) => {
    const z = (x - m) / s;
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp((-z * z) / 2);
    const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z > 0 ? 1 - p : p;
  };

  const currentPDF = normalPDF(evalX, mu, sigma);
  const currentCDF = normalCDF(evalX, mu, sigma);
  const currentSF = 1 - currentCDF;

  // Generate SVG curve points for normal distribution
  const svgWidth = 500;
  const svgHeight = 180;
  const xMin = mu - 3.5 * sigma;
  const xMax = mu + 3.5 * sigma;
  const maxPDF = normalPDF(mu, mu, sigma);

  const points = [];
  const shadePoints = [];
  const steps = 60;
  for (let i = 0; i <= steps; i++) {
    const currX = xMin + (i / steps) * (xMax - xMin);
    const currY = normalPDF(currX, mu, sigma);
    const px = ((currX - xMin) / (xMax - xMin)) * svgWidth;
    const py = svgHeight - (currY / (maxPDF * 1.15)) * svgHeight;
    points.push(`${px},${py}`);

    if (currX <= evalX) {
      shadePoints.push(`${px},${py}`);
    }
  }

  const evalPx = ((evalX - xMin) / (xMax - xMin)) * svgWidth;
  const evalPy = svgHeight - (currentPDF / (maxPDF * 1.15)) * svgHeight;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <LineChart className="w-4 h-4" />
                <span>Machine Learning Module 009_006 • Topic 4</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                scipy.stats: Probability Distributions
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Explore continuous and discrete probability distributions. Master the unified object-oriented API: <code className="text-emerald-400 font-mono">pdf()</code>, <code className="text-emerald-400 font-mono">cdf()</code>, <code className="text-emerald-400 font-mono">ppf()</code>, and <code className="text-emerald-400 font-mono">rvs()</code>.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Distribution Visualizer Studio", icon: Sparkles },
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Parameters Control Panel */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Sliders className="w-4 h-4" />
                <span>Distribution Parameters</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Location / Mean (<code className="text-emerald-400 font-mono">loc=\mu</code>):</span>
                    <span className="font-mono text-emerald-400 font-bold">{mu}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={mu}
                    onChange={(e) => setMu(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Scale / Std Dev (<code className="text-emerald-400 font-mono">scale=\sigma</code>):</span>
                    <span className="font-mono text-emerald-400 font-bold">{sigma}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={sigma}
                    onChange={(e) => setSigma(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Evaluation Cutoff (<code className="text-emerald-400 font-mono">x</code>):</span>
                    <span className="font-mono text-emerald-400 font-bold">{evalX}</span>
                  </div>
                  <input
                    type="range"
                    min={Math.round(xMin)}
                    max={Math.round(xMax)}
                    value={evalX}
                    onChange={(e) => setEvalX(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>

              {/* API Methods quick cheatsheet */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2 text-[11px] text-slate-400">
                <div className="font-bold text-slate-200">Universal SciPy Methods:</div>
                <div><code className="text-emerald-400">dist.pdf(x)</code> : Height of curve at x</div>
                <div><code className="text-teal-400">dist.cdf(x)</code> : P(X ≤ x) shaded area</div>
                <div><code className="text-cyan-400">dist.ppf(q)</code> : Value at quantile q</div>
                <div><code className="text-amber-400">dist.rvs(n)</code> : Generate n samples</div>
              </div>
            </div>

            {/* Interactive SVG Curve & Metrics */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <Activity className="w-4 h-4" />
                  <span>Gaussian Probability Density &amp; Cumulative Shading</span>
                </div>
                <span className="text-xs font-mono text-slate-400">P(X ≤ {evalX}) = {(currentCDF * 100).toFixed(2)}%</span>
              </div>

              {/* SVG Graphic */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex justify-center">
                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-44 overflow-visible">
                  {/* Shaded Cumulative Region P(X <= evalX) */}
                  {shadePoints.length > 0 && (
                    <polygon
                      points={`0,${svgHeight} ${shadePoints.join(" ")} ${evalPx},${svgHeight}`}
                      fill="rgba(16, 185, 129, 0.25)"
                    />
                  )}

                  {/* Bell Curve Line */}
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    points={points.join(" ")}
                  />

                  {/* Cutoff Vertical Line */}
                  <line
                    x1={evalPx}
                    y1="0"
                    x2={evalPx}
                    y2={svgHeight}
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />

                  {/* Evaluated Point Node */}
                  <circle cx={evalPx} cy={evalPy} r="5" fill="#38bdf8" />
                </svg>
              </div>

              {/* Calculated Outputs Table */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">PDF Height: stats.norm.pdf({evalX})</span>
                  <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">{currentPDF.toFixed(4)}</div>
                  <span className="text-[10px] text-slate-500">Density at point x</span>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Cumulative: stats.norm.cdf({evalX})</span>
                  <div className="text-lg font-bold text-teal-400 font-mono mt-0.5">{(currentCDF * 100).toFixed(2)}%</div>
                  <span className="text-[10px] text-slate-500">P(X ≤ {evalX}) probability</span>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400">Survival: stats.norm.sf({evalX})</span>
                  <div className="text-lg font-bold text-cyan-400 font-mono mt-0.5">{(currentSF * 100).toFixed(2)}%</div>
                  <span className="text-[10px] text-slate-500">P(X &gt; {evalX}) tail probability</span>
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
