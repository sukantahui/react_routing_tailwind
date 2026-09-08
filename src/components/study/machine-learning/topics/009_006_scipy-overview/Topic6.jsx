import React, { useState } from "react";
import {
  HelpCircle,
  Sparkles,
  BookOpen,
  Code2,
  Copy,
  Check,
  Scale,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ArrowRight
} from "lucide-react";

import pyCode1 from "./topic6_files/01_null_vs_alt_hypothesis.py?raw";
import pyCode2 from "./topic6_files/02_p_value_interpretation_alpha.py?raw";
import pyCode3 from "./topic6_files/03_type1_type2_errors_demo.py?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions.js";

export default function Topic6() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls
  const [alpha, setAlpha] = useState(0.05);
  const [pVal, setPVal] = useState(0.024);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_null_vs_alt_hypothesis.py", code: pyCode1 },
    { name: "02_p_value_interpretation_alpha.py", code: pyCode2 },
    { name: "03_type1_type2_errors_demo.py", code: pyCode3 }
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

  const isReject = pVal < alpha;

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
                <span>Machine Learning Module 009_006 • Topic 6</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Hypothesis Testing Basics
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Master statistical significance, the Null vs Alternative Hypothesis framework ($H_0$ vs $H_1$), p-value thresholds ($\alpha$), Type I / II errors, and ML model A/B validation.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Hypothesis Decision Studio", icon: Sparkles },
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
            {/* Interactive Decision Slider Box */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <Scale className="w-4 h-4" />
                  <span>Hypothesis Decision Engine Simulator</span>
                </div>
                <div className="flex gap-2">
                  {[0.01, 0.05, 0.10].map((a) => (
                    <button
                      key={a}
                      onClick={() => setAlpha(a)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        alpha === a ? "bg-emerald-600 text-white" : "bg-slate-950 text-slate-400 hover:text-white"
                      }`}
                    >
                      α = {a}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Simulated p-value:</span>
                      <span className="font-mono text-emerald-400 font-bold">{pVal.toFixed(3)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.001"
                      max="0.200"
                      step="0.001"
                      value={pVal}
                      onChange={(e) => setPVal(parseFloat(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
                    <div><b>Null Hypothesis ($H_0$):</b> No difference between models / treatments.</div>
                    <div><b>Significance Level ($\alpha$):</b> Threshold for false alarm tolerance ({alpha * 100}%).</div>
                  </div>
                </div>

                {/* Verdict Card */}
                <div
                  className={`p-6 rounded-2xl border transition-all ${
                    isReject
                      ? "bg-emerald-950/40 border-emerald-500"
                      : "bg-amber-950/40 border-amber-500"
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-wider mb-2">
                    {isReject ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> REJECT NULL HYPOTHESIS (H0)
                      </span>
                    ) : (
                      <span className="text-amber-400 font-bold flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" /> FAIL TO REJECT H0
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {isReject
                      ? `Statistically Significant Result (p = ${pVal.toFixed(3)} < α = ${alpha})`
                      : `Inconclusive / No Significant Effect (p = ${pVal.toFixed(3)} ≥ α = ${alpha})`}
                  </div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {isReject
                      ? "The probability of observing this data purely by random chance is under your threshold. You have sufficient evidence to accept the Alternative Hypothesis (H1)."
                      : "Observed variation could easily occur by random sampling noise. Retain the status quo or collect larger sample sizes."}
                  </p>
                </div>
              </div>
            </div>

            {/* Error Taxonomy Matrix (Type I vs Type II) */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <ShieldAlert className="w-4 h-4" />
                <span>Hypothesis Error Matrix &amp; Relation to ML</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950 border border-rose-900/50 rounded-xl p-4 space-y-2">
                  <div className="font-bold text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Type I Error ($\alpha$ / False Positive)</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Rejecting a true Null Hypothesis. Example in ML: Deploying a new feature because an A/B test falsely indicated higher user engagement due to random noise.
                  </p>
                </div>

                <div className="bg-slate-950 border border-amber-900/50 rounded-xl p-4 space-y-2">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Type II Error ($\beta$ / False Negative)</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Failing to reject a false Null Hypothesis. Example in ML: Discarding a genuinely superior neural net model because the evaluation test was underpowered.
                  </p>
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
