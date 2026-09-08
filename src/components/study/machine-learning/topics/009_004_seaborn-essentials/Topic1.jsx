import React, { useState } from "react";
import {
  DownloadCloud,
  Terminal,
  Package,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sparkles,
  Layers,
  Cpu,
  CheckCircle2
} from "lucide-react";

import pyCode1 from "./topic1_files/01_pip_install_seaborn.py?raw";
import pyCode2 from "./topic1_files/02_standard_imports.py?raw";
import pyCode3 from "./topic1_files/03_version_and_deps_check.py?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions.js";

const dependencies = [
  { name: "numpy", version: ">= 1.17", role: "High-performance N-dimensional array processing and linear algebra", color: "#38bdf8" },
  { name: "scipy", version: ">= 1.3", role: "Kernel density estimations, statistical fits, and matrix math", color: "#818cf8" },
  { name: "pandas", version: ">= 0.25", role: "Tabular DataFrame ingestion, indexing, and groupby operations", color: "#34d399" },
  { name: "matplotlib", version: ">= 3.1", role: "Underlying graphical canvas, rendering backend, and Figure/Axes primitives", color: "#f472b6" }
];

export default function Topic1() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive state
  const [installManager, setInstallManager] = useState("pip");
  const [themeContext, setThemeContext] = useState("notebook");
  const [themeStyle, setThemeStyle] = useState("darkgrid");
  const [selectedDep, setSelectedDep] = useState(dependencies[0]);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_pip_install_seaborn.py", code: pyCode1 },
    { name: "02_standard_imports.py", code: pyCode2 },
    { name: "03_version_and_deps_check.py", code: pyCode3 }
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

  const installCommands = {
    pip: "$ pip install seaborn",
    conda: "$ conda install seaborn -c conda-forge",
    poetry: "$ poetry add seaborn",
    pipenv: "$ pipenv install seaborn"
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <DownloadCloud className="w-4 h-4" />
                <span>Machine Learning Module • Topic 1</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Installing &amp; Importing Seaborn
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Set up your Python data science environment. Understand pip/conda packages, dependency tree resolution, and modern import configurations.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Setup Simulator & Stack", icon: Sparkles },
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
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
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

        {/* Tab 1: Interactive Setup Simulator */}
        {activeTab === "interactive" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Terminal Command Selector */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <Terminal className="w-4 h-4" />
                <span>Package Manager Selection</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {["pip", "conda", "poetry", "pipenv"].map((mgr) => (
                  <button
                    key={mgr}
                    onClick={() => setInstallManager(mgr)}
                    className={`px-3 py-2 rounded-lg text-xs font-mono uppercase transition-all ${
                      installManager === mgr
                        ? "bg-blue-600 text-white border border-blue-400 shadow"
                        : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                    }`}
                  >
                    {mgr}
                  </button>
                ))}
              </div>

              {/* Terminal Preview */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 pb-2 border-b border-slate-800 text-slate-500 text-[10px] font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-slate-400">bash terminal</span>
                </div>
                <div className="font-mono text-xs text-emerald-400">
                  {installCommands[installManager]}
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Successfully installed seaborn-0.13.2 pandas-2.2.0 matplotlib-3.8.3
                </div>
              </div>

              {/* Standard Import Snippet */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono text-xs text-slate-300">
                <div className="text-blue-400 font-semibold text-[11px]"># Python Import Template:</div>
                <div className="text-slate-400">import numpy as np</div>
                <div className="text-slate-400">import pandas as pd</div>
                <div className="text-slate-400">import matplotlib.pyplot as plt</div>
                <div className="text-cyan-300 font-bold">import seaborn as sns</div>
                <div className="pt-2 text-indigo-300">sns.set_theme(style="{themeStyle}")</div>
              </div>
            </div>

            {/* Dependency Ecosystem & Architecture Explorer */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-blue-400" />
                  Seaborn Dependency Architecture Tree
                </span>
                <span className="text-xs font-mono text-slate-400">Layer 1 Ecosystem</span>
              </div>

              {/* Interactive Tree Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dependencies.map((dep) => {
                  const isSelected = selectedDep.name === dep.name;
                  return (
                    <div
                      key={dep.name}
                      onClick={() => setSelectedDep(dep)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "bg-slate-950 border-blue-500 shadow-md shadow-blue-500/10"
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: dep.color }}
                          />
                          <span className="font-mono text-sm font-bold text-white">{dep.name}</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {dep.version}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{dep.role}</p>
                    </div>
                  );
                })}
              </div>

              {/* Selected Dependency Spotlight */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-xs font-semibold text-white">
                      Integration Focus: <span className="font-mono text-blue-400">{selectedDep.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Seaborn delegates data management to Pandas and visual layout rendering to Matplotlib.
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block text-xs font-mono text-emerald-400">
                  Status: Ready ✓
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Python Code Lab */}
        {activeTab === "code" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex flex-wrap gap-2">
                {scripts.map((sc, idx) => (
                  <button
                    key={sc.name}
                    onClick={() => setSelectedScript(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      selectedScript === idx
                        ? "bg-blue-600 text-white shadow"
                        : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                    }`}
                  >
                    {sc.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => copyCode(scripts[selectedScript].code)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Script"}
              </button>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-[480px]">
                {scripts[selectedScript].code}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Revision Notes */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Topic 1 Summary &amp; Theoretical Notes</span>
              </div>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied Notes!" : "Copy Notes"}
              </button>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[520px] overflow-y-auto">
              {noteText}
            </div>
          </div>
        )}

        {/* Tab 4: Knowledge Check */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Topic 1 Knowledge Assessment (4 Questions)</span>
              </div>
              {submittedQuiz && (
                <div className="px-3.5 py-1 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold">
                  Score: {calculateScore()} / {questions.length}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {questions.map((q, idx) => {
                const userAns = selectedAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div key={q.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="font-medium text-sm text-slate-200">
                      {idx + 1}. {q.question}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAns === optIdx;
                        let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800";
                        if (submittedQuiz) {
                          if (optIdx === q.correctAnswer) {
                            btnStyle = "bg-emerald-950/70 border-emerald-500 text-emerald-300";
                          } else if (isSelected) {
                            btnStyle = "bg-rose-950/70 border-rose-500 text-rose-300";
                          }
                        } else if (isSelected) {
                          btnStyle = "bg-blue-600/30 border-blue-500 text-blue-200";
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(q.id, optIdx)}
                            className={`p-3 rounded-lg border text-left text-xs transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {submittedQuiz && (
                      <div
                        className={`p-3 rounded-lg text-xs leading-relaxed ${
                          isCorrect
                            ? "bg-emerald-950/40 text-emerald-300 border border-emerald-900/50"
                            : "bg-rose-950/40 text-rose-300 border border-rose-900/50"
                        }`}
                      >
                        <span className="font-semibold">{isCorrect ? "✓ Correct: " : "✗ Incorrect: "}</span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setSubmittedQuiz(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
              >
                Reset
              </button>
              <button
                onClick={() => setSubmittedQuiz(true)}
                disabled={Object.keys(selectedAnswers).length < questions.length}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all"
              >
                Submit Answers
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
