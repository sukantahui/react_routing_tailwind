import React, { useState } from "react";
import {
  DownloadCloud,
  Terminal,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sparkles,
  Layers,
  Cpu,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

import pyCode1 from "./topic1_files/01_pip_install_scipy.py?raw";
import pyCode2 from "./topic1_files/02_import_submodules.py?raw";
import pyCode3 from "./topic1_files/03_system_check_and_versions.py?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions.js";

const submodulesList = [
  { name: "scipy.stats", role: "Probability distributions, hypothesis tests, descriptive metrics", color: "#38bdf8" },
  { name: "scipy.spatial", role: "KD-Tree, spatial distances (Euclidean, Manhattan, Cosine)", color: "#818cf8" },
  { name: "scipy.linalg", role: "Direct LAPACK/BLAS wrappers, matrix inversion, eigenvalue solver", color: "#34d399" },
  { name: "scipy.optimize", role: "Minimization routines, BFGS, least-squares curve fitting", color: "#f59e0b" },
  { name: "scipy.sparse", role: "Memory-efficient matrices (CSR, CSC, COO) for high-dimensional ML", color: "#ec4899" },
  { name: "scipy.integrate", role: "Definite numerical integrals, quad, ODE solvers", color: "#a855f7" }
];

export default function Topic1() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive controls
  const [manager, setManager] = useState("pip");
  const [selectedSubmodule, setSelectedSubmodule] = useState(submodulesList[0]);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_pip_install_scipy.py", code: pyCode1 },
    { name: "02_import_submodules.py", code: pyCode2 },
    { name: "03_system_check_and_versions.py", code: pyCode3 }
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

  const commands = {
    pip: "$ pip install -U scipy",
    conda: "$ conda install -c conda-forge scipy",
    poetry: "$ poetry add scipy",
    pipenv: "$ pipenv install scipy"
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <DownloadCloud className="w-4 h-4" />
                <span>Machine Learning Module 009_006 • Topic 1</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Installing and Importing SciPy
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Set up your high-performance scientific Python environment. Master explicit submodule loading, hardware BLAS/LAPACK linking, and avoid common namespace pitfalls.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Installation & Import Studio", icon: Sparkles },
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
            {/* Terminal Package Manager Selector */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <Terminal className="w-4 h-4" />
                  <span>Package Manager Installation Command</span>
                </div>
                <div className="flex gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  {["pip", "conda", "poetry", "pipenv"].map((mgr) => (
                    <button
                      key={mgr}
                      onClick={() => setManager(mgr)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                        manager === mgr ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {mgr}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                <code className="font-mono text-xs md:text-sm text-emerald-400">{commands[manager]}</code>
                <button
                  onClick={() => copyCode(commands[manager])}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Submodule Import Rules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Common Pitfall vs Best Practice */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>The SciPy Explicit Import Gotcha</span>
                </div>
                <div className="bg-rose-950/30 border border-rose-900/50 rounded-xl p-4 space-y-2 text-xs">
                  <div className="font-bold text-rose-300">❌ Incorrect Top-Level Loading:</div>
                  <pre className="font-mono text-rose-200 bg-slate-950 p-2.5 rounded-lg border border-rose-900/40">
                    {`import scipy\n\n# Raises AttributeError:\n# module 'scipy' has no attribute 'stats'\nresult = scipy.stats.zscore([1, 2, 3])`}
                  </pre>
                </div>
                <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-xl p-4 space-y-2 text-xs">
                  <div className="font-bold text-emerald-300">✅ Idiomatic Explicit Submodule Loading:</div>
                  <pre className="font-mono text-emerald-200 bg-slate-950 p-2.5 rounded-lg border border-emerald-900/40">
                    {`from scipy import stats\nfrom scipy import spatial\n\n# Works seamlessly!\nz = stats.zscore([1, 2, 3])`}
                  </pre>
                </div>
              </div>

              {/* Submodules Quick Reference */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <Layers className="w-4 h-4" />
                  <span>Essential ML Submodules</span>
                </div>
                <div className="space-y-2">
                  {submodulesList.map((sub, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedSubmodule(sub)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedSubmodule.name === sub.name
                          ? "bg-emerald-950/60 border-emerald-500"
                          : "bg-slate-950 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-emerald-300">{sub.name}</span>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sub.color }} />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{sub.role}</p>
                    </div>
                  ))}
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
