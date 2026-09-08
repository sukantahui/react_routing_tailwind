import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic1_files/01_installing_and_verifying_pandas.py?raw";
import pyCode2 from "./topic1_files/02_import_conventions_and_namespaces.py?raw";
import pyCode3 from "./topic1_files/03_pandas_environment_diagnostics.py?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_installing_and_verifying_pandas.py",
    title: "1. Installation & Environment Verification",
    badge: "Install & Verify",
    code: pyCode1,
    summary: "Demonstrates pip/conda installation commands, checking pd.__version__, and running a sanity check DataFrame.",
  },
  {
    id: "part2",
    fileName: "02_import_conventions_and_namespaces.py",
    title: "2. Import Conventions & PyArrow Backend",
    badge: "PEP 8 & PyArrow",
    code: pyCode2,
    summary: "Explains standard alias 'import pandas as pd', key core namespaces, and optional PyArrow engine capabilities.",
  },
  {
    id: "part3",
    fileName: "03_pandas_environment_diagnostics.py",
    title: "3. Display Configuration (pd.set_option)",
    badge: "Display Options",
    code: pyCode3,
    summary: "Configures max columns, max rows, and precision settings for optimal exploratory data analysis in ML.",
  },
];

const INSTALL_OPTIONS = [
  {
    id: "pip_standard",
    manager: "pip (Standard)",
    cmd: "pip install pandas",
    desc: "Installs core Pandas along with required NumPy, python-dateutil, and pytz dependencies.",
  },
  {
    id: "conda_forge",
    manager: "Conda (Anaconda / Miniconda)",
    cmd: "conda install -c conda-forge pandas",
    desc: "Installs pre-compiled binaries optimized with Intel MKL or OpenBLAS matrix libraries.",
  },
  {
    id: "pip_full",
    manager: "pip (Full High-Performance Bundle)",
    cmd: 'pip install "pandas[performance,excel,parquet]"',
    desc: "Includes openpyxl (Excel I/O), pyarrow (Arrow memory backend), and numba (JIT apply acceleration).",
  },
];

const Topic1 = () => {
  const [activeTab, setActiveTab] = useState("install_explorer");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [selectedInstall, setSelectedInstall] = useState("pip_standard");
  const [maxCols, setMaxCols] = useState(10);
  const [precision, setPrecision] = useState(2);
  const [copied, setCopied] = useState(false);

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];
  const activeInstall = INSTALL_OPTIONS.find((o) => o.id === selectedInstall) || INSTALL_OPTIONS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeInstall.cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-teal-900/60 via-slate-900 to-indigo-900/60 border border-teal-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-teal-500/20 text-teal-300 text-xs font-semibold rounded-full border border-teal-500/40">
                Module 009_002 • Pandas Essentials
              </span>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/40">
                Topic 1 • Installation &amp; Setup
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-200 via-cyan-100 to-indigo-300 bg-clip-text text-transparent">
              Installing &amp; Importing Pandas
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
              Set up a high-performance Pandas environment, master standard <code className="text-teal-300 font-mono">import pandas as pd</code> conventions, configure global EDA display options, and unlock PyArrow acceleration.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-800 pt-4">
          {[
            { id: "install_explorer", label: "Installation & Setup Hub", icon: "📦" },
            { id: "python_suite", label: "Python Multi-Script Suite", icon: "🐍" },
            { id: "teacher_notes", label: "Teacher's Classroom Notes", icon: "📝" },
            { id: "faqs_questions", label: "Quizzes & Questions", icon: "💡" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/25 scale-105"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Installation & Setup Hub */}
      {activeTab === "install_explorer" && (
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Package Manager Selector */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <h3 className="text-base font-bold text-teal-300 flex items-center justify-between">
              <span>1. Choose Package Manager / Installation Flavor</span>
              <span className="text-xs px-2.5 py-0.5 bg-slate-800 text-slate-400 font-mono rounded">Terminal Commands</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {INSTALL_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedInstall(opt.id)}
                  className={`p-4 rounded-xl border text-left transition ${
                    selectedInstall === opt.id
                      ? "bg-teal-500/20 border-teal-400 text-teal-200 shadow-md shadow-teal-500/10"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="font-bold text-xs text-slate-200">{opt.manager}</div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">{opt.desc}</div>
                </button>
              ))}
            </div>

            {/* Terminal Command Display */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="font-mono text-xs text-emerald-400 flex items-center gap-2">
                <span className="text-slate-600 select-none">$</span>
                <span>{activeInstall.cmd}</span>
              </div>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 rounded-lg text-xs font-semibold transition"
              >
                {copied ? "✓ Copied!" : "📋 Copy Command"}
              </button>
            </div>
          </div>

          {/* Interactive pd.set_option Simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <h4 className="text-base font-bold text-slate-200">
                2. Live Display Config: <code className="text-teal-300 font-mono">pd.set_option()</code>
              </h4>

              {/* Max Columns Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5 text-xs">
                  <span className="text-slate-300 font-semibold font-mono">display.max_columns:</span>
                  <span className="text-teal-400 font-mono font-bold">{maxCols === 20 ? "None (Show All)" : maxCols}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="2"
                  value={maxCols}
                  onChange={(e) => setMaxCols(Number(e.target.value))}
                  className="w-full accent-teal-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Precision Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5 text-xs">
                  <span className="text-slate-300 font-semibold font-mono">display.precision:</span>
                  <span className="text-cyan-400 font-mono font-bold">{precision} decimal places</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={precision}
                  onChange={(e) => setPrecision(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <p className="text-slate-500"># Generated Python Configuration:</p>
                <p className="text-teal-300">pd.set_option('display.max_columns', {maxCols === 20 ? "None" : maxCols})</p>
                <p className="text-cyan-300">pd.set_option('display.precision', {precision})</p>
              </div>
            </div>

            {/* Live Terminal Output Preview */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-200 mb-3">
                  Terminal Output Preview (Simulated `df.head()`)
                </h4>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto space-y-2">
                  <p className="text-slate-500"># DataFrame print preview:</p>
                  <div className="text-emerald-400">
                    &nbsp;&nbsp;&nbsp;&nbsp;Student&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score&nbsp;&nbsp;&nbsp;&nbsp;Percentile<br />
                    0&nbsp;&nbsp;Debangshu&nbsp;&nbsp;{(88.12345).toFixed(precision)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{(92.4567).toFixed(precision)}<br />
                    1&nbsp;&nbsp;Susmita&nbsp;&nbsp;&nbsp;&nbsp;{(94.98765).toFixed(precision)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{(98.1234).toFixed(precision)}<br />
                    2&nbsp;&nbsp;Swadeep&nbsp;&nbsp;&nbsp;&nbsp;{(72.44444).toFixed(precision)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{(75.8912).toFixed(precision)}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-teal-950/30 border border-teal-900/60 rounded-xl text-xs text-teal-200">
                💡 Tip: Use <code className="text-white font-mono">pd.reset_option('all')</code> to restore standard defaults anytime!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Python Multi-Script Suite */}
      {activeTab === "python_suite" && (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PYTHON_SCRIPTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedScriptId(s.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedScriptId === s.id
                    ? "bg-teal-950/40 border-teal-500 shadow-lg shadow-teal-500/10 scale-102"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    {s.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">.py</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200 mb-1">{s.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{s.summary}</p>
              </button>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-teal-300">{activeScript.title}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{activeScript.fileName}</p>
              </div>
              <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                Setup &amp; Environment Suite
              </span>
            </div>
            <PythonFileLoader fileModule={activeScript.code} title={activeScript.fileName} />
          </div>
        </div>
      )}

      {/* Tab 3: Teacher Notes */}
      {activeTab === "teacher_notes" && (
        <div className="max-w-5xl mx-auto space-y-6">
          <Teacher
            name="Sukanta Hui"
            title="Senior ML Instructor, Barrackpore Lab"
            quote="Setting up a clean Python virtual environment with Pandas and its optional accelerators (like PyArrow and openpyxl) is step one for every data science project. Always stick to the standard 'import pandas as pd' alias to keep your codebase consistent and Kaggle/industry standard."
          />
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-teal-300 mb-4 flex items-center gap-2">
              <span>📚 Comprehensive Topic Notes</span>
            </h3>
            <PlainTextPrint content={noteText} />
          </div>
        </div>
      )}

      {/* Tab 4: Quizzes & FAQs */}
      {activeTab === "faqs_questions" && (
        <div className="max-w-5xl mx-auto space-y-6">
          <FAQTemplate questions={questions} />
        </div>
      )}
    </div>
  );
};

export default Topic1;
