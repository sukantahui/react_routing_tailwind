import React, { useState } from "react";
import {
  DownloadCloud,
  Terminal,
  BookOpen,
  Code2,
  HelpCircle,
  Sparkles,
  Layers,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  PackageCheck
} from "lucide-react";

import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic1_files/01_pip_install_scipy.py?raw";
import pyCode2 from "./topic1_files/02_import_submodules.py?raw";
import pyCode3 from "./topic1_files/03_system_check_and_versions.py?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions.js";

const submodulesList = [
  { name: "scipy.stats", alias: "import scipy.stats as stats", role: "Probability distributions, hypothesis tests, descriptive metrics", color: "#38bdf8" },
  { name: "scipy.spatial", alias: "import scipy.spatial.distance as pdist", role: "KD-Tree, spatial distances (Euclidean, Manhattan, Cosine)", color: "#818cf8" },
  { name: "scipy.linalg", alias: "import scipy.linalg as la", role: "Direct LAPACK/BLAS wrappers, matrix inversion, eigenvalue solver", color: "#34d399" },
  { name: "scipy.optimize", alias: "import scipy.optimize as opt", role: "Minimization routines, BFGS, least-squares curve fitting", color: "#f59e0b" },
  { name: "scipy.sparse", alias: "import scipy.sparse as sp", role: "Memory-efficient matrices (CSR, CSC, COO) for high-dimensional ML", color: "#ec4899" },
  { name: "scipy.integrate", alias: "import scipy.integrate as integrate", role: "Definite numerical integrals, quad, ODE solvers", color: "#a855f7" }
];

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_pip_install_scipy.py",
    title: "1. Installation & Environment Verification",
    badge: "Install & Setup",
    code: pyCode1,
    summary: "Standard pip and conda installation verification, version checking, and path location."
  },
  {
    id: "part2",
    fileName: "02_import_submodules.py",
    title: "2. Explicit Submodule Import Conventions",
    badge: "Namespaces & Imports",
    code: pyCode2,
    summary: "Demonstrates why explicit subpackage imports are mandatory and contrasts with dangerous wildcard imports."
  },
  {
    id: "part3",
    fileName: "03_system_check_and_versions.py",
    title: "3. BLAS & Hardware Acceleration Sanity",
    badge: "System Configuration",
    code: pyCode3,
    summary: "Inspects show_config() and checks compiler flags and OpenBLAS/MKL acceleration linkage."
  }
];

export default function Topic1() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [manager, setManager] = useState("pip");
  const [selectedSubmodule, setSelectedSubmodule] = useState(submodulesList[0]);

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 border border-sky-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <DownloadCloud className="w-4 h-4" />
                <span>Machine Learning Module 009_006 • Topic 1</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Installation &amp; Submodule Architecture
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Mastering the installation pipelines, explicit submodule importing standards, lazy-loading conventions, and hardware BLAS/LAPACK linking in SciPy.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Interactive Setup Studio", icon: Sparkles },
              { id: "code", label: "Python Code Lab", icon: Code2 },
              { id: "notes", label: "Revision Notes", icon: BookOpen },
              { id: "quiz", label: "Practice & FAQs", icon: HelpCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs md:text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-sky-600 text-white shadow-lg shadow-sky-600/30"
                      : "bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Interactive Setup Studio */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            {/* Terminal Installation Simulator */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-sky-400" />
                  <span>Package Manager Terminal Command Builder</span>
                </h3>
                <div className="flex gap-2">
                  {["pip", "conda", "poetry", "docker"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setManager(m)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase transition ${
                        manager === m
                          ? "bg-sky-500/20 text-sky-300 border border-sky-500/40"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                <p className="text-slate-500"># Run in your activated virtual environment terminal:</p>
                <div className="text-emerald-400 font-bold text-sm bg-slate-900 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span>
                    {manager === "pip" && "$ pip install --upgrade pip && pip install scipy numpy pandas"}
                    {manager === "conda" && "$ conda install -c conda-forge scipy numpy pandas"}
                    {manager === "poetry" && "$ poetry add scipy numpy pandas"}
                    {manager === "docker" && "$ RUN pip install --no-cache-dir scipy numpy pandas"}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  💡 All binary wheels are pre-compiled with OpenBLAS / LAPACK runtime acceleration for instant installation.
                </p>
              </div>
            </div>

            {/* Submodule Explorer */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                  Select Submodule
                </h3>
                <div className="space-y-2">
                  {submodulesList.map((sub) => {
                    const isSelected = selectedSubmodule.name === sub.name;
                    return (
                      <button
                        key={sub.name}
                        onClick={() => setSelectedSubmodule(sub)}
                        className={`w-full p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "bg-slate-850 border-sky-500 text-white shadow-md shadow-sky-950/40"
                            : "bg-slate-900/70 border-slate-800 hover:bg-slate-850 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-sky-300">{sub.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">Subpackage</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{sub.role}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submodule Details Card */}
              <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedSubmodule.name}</h3>
                    <p className="text-xs text-slate-400">{selectedSubmodule.role}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/10 text-sky-300 border border-sky-500/30">
                    Production Canonical Alias
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                    Recommended Python Import Syntax:
                  </span>
                  <code className="text-emerald-400 font-mono text-sm font-bold block bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    {selectedSubmodule.alias}
                  </code>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200/90 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-amber-300">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Why Lazy Loading Matters:</span>
                  </div>
                  <p>
                    SciPy intentionally does not import subpackages upon <code>import scipy</code>. Subpackages must be imported explicitly (e.g. <code>import scipy.stats as stats</code>) to prevent loading hundreds of megabytes of compiled C/Fortran libraries on application startup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Python Code Lab */}
        {activeTab === "code" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PYTHON_SCRIPTS.map((script) => (
                <button
                  key={script.id}
                  onClick={() => setSelectedScriptId(script.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedScriptId === script.id
                      ? "bg-sky-950/40 border-sky-500 shadow-md shadow-sky-950/40 scale-[1.02]"
                      : "bg-slate-900/80 border-slate-800 hover:bg-slate-850 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        selectedScriptId === script.id
                          ? "bg-sky-500/20 text-sky-300 border-sky-500/40"
                          : "bg-slate-800 text-slate-500 border-slate-700"
                      }`}
                    >
                      {script.badge}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">.py</span>
                  </div>
                  <p className="text-xs font-bold text-white truncate">{script.title}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">{script.summary}</p>
                </button>
              ))}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-sky-300">{activeScript.title}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{activeScript.fileName}</p>
                </div>
                <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                  Installation &amp; Import Suite
                </span>
              </div>
              <PythonFileLoader fileModule={activeScript.code} title={activeScript.fileName} />
            </div>
          </div>
        )}

        {/* Tab 3: Notes */}
        {activeTab === "notes" && (
          <div className="space-y-6">
            <Teacher
              note={
                "A common pitfall for beginners is typing `import scipy` and expecting `scipy.stats` to be accessible. Always use explicit submodule imports. This ensures clean code, avoids namespace collisions, and keeps memory overhead minimal. — Sukanta Hui, Barrackpore ML Lab"
              }
            />
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <PlainTextPrint
                content={noteText}
                title="Installation & Submodule Structure — Study Note"
                stampEnabled={true}
                showDownload={true}
                downloadButtonText="Download Topic 1 Study Note"
                downloadFileName="scipy_install_and_submodules_note.txt"
              />
            </div>
          </div>
        )}

        {/* Tab 4: Practice & FAQs */}
        {activeTab === "quiz" && (
          <div className="space-y-6">
            <FAQTemplate
              title="Installation & Submodule Architecture — Domain FAQs"
              subtitle="Master package managers, explicit namespace imports, lazy loading, and BLAS verification"
              questions={questions}
            />
          </div>
        )}
      </div>
    </div>
  );
}
