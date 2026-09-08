import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic1_files/01_install_and_verification.py?raw";
import pyCode2 from "./topic1_files/02_import_conventions_and_namespaces.py?raw";
import pyCode3 from "./topic1_files/03_ml_environment_sanity_check.py?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_install_and_verification.py",
    title: "1. Install & BLAS Hardware Verification",
    badge: "Hardware & BLAS",
    code: pyCode1,
    summary: "Checks installed NumPy version, Python path, and prints underlying BLAS / LAPACK linear algebra acceleration configs.",
  },
  {
    id: "part2",
    fileName: "02_import_conventions_and_namespaces.py",
    title: "2. Import Conventions vs Namespace Pollution",
    badge: "Namespaces",
    code: pyCode2,
    summary: "Demonstrates standard 'import numpy as np' and why 'from numpy import *' creates dangerous collisions with Python built-ins.",
  },
  {
    id: "part3",
    fileName: "03_ml_environment_sanity_check.py",
    title: "3. ML Stack Sanity & Linear Model Test",
    badge: "ML Stack Test",
    code: pyCode3,
    summary: "Performs full environment verification across pandas/sklearn/scipy and runs an end-to-end vectorized matrix-dot product smoke test.",
  },
];

// ─── Environment rows ────────────────────────────────────────────────────────
const ENVIRONMENTS = [
  { env: "Local Python (pip)",        cmd: "pip install numpy",       note: "Standard installation" },
  { env: "Anaconda / Miniconda",      cmd: "conda install numpy",     note: "MKL-optimized version" },
  { env: "Google Colab",              cmd: "Pre-installed",           note: "Just import and use" },
  { env: "Jupyter Notebook",          cmd: "!pip install numpy",      note: "! prefix for shell" },
  { env: "VS Code + Python ext.",     cmd: "pip install numpy",       note: "Run in terminal" },
  { env: "Upgrade existing install",  cmd: "pip install --upgrade numpy", note: "Get latest version" },
];

// ─── Common errors ───────────────────────────────────────────────────────────
const ERRORS = [
  {
    error: "ModuleNotFoundError: No module named 'numpy'",
    cause: "NumPy not installed in current Python environment",
    fix:   "pip install numpy",
    color: "border-rose-800",
  },
  {
    error: "numpy.core.multiarray failed to import",
    cause: "Corrupted or incompatible NumPy C extension",
    fix:   "pip install --upgrade numpy",
    color: "border-amber-800",
  },
  {
    error: "AttributeError: module 'numpy' has no attribute 'bool'",
    cause: "np.bool was removed in NumPy 1.24",
    fix:   "Use np.bool_ (with underscore)",
    color: "border-orange-800",
  },
];

// ─── Import styles comparison ────────────────────────────────────────────────
const IMPORTS = [
  { code: "import numpy as np",        verdict: "✔ CORRECT",   color: "text-emerald-400", bg: "bg-emerald-950/30 border-emerald-800" },
  { code: "import numpy",              verdict: "✗ Verbose",   color: "text-amber-400",   bg: "bg-amber-950/30 border-amber-800" },
  { code: "from numpy import *",       verdict: "✗ NEVER",     color: "text-rose-400",    bg: "bg-rose-950/30 border-rose-800" },
  { code: "import numpy as num",       verdict: "✗ Non-standard", color: "text-rose-400", bg: "bg-rose-950/30 border-rose-800" },
];

// ─────────────────────────────────────────────────────────────────────────────
const Topic1 = () => {
  const [activeTab, setActiveTab] = useState("install");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  const tabs = [
    { id: "install", label: "Installation" },
    { id: "import",  label: "Import Convention" },
    { id: "verify",  label: "Verification" },
    { id: "errors",  label: "Common Errors" },
  ];

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-12">

      {/* HEADER */}
      <header className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Segment 9 • Module 1 • Topic 1
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Easy
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Setup
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Installing and Importing NumPy</h1>
          <p className="text-base text-slate-300 max-w-4xl">
            Before writing a single line of ML code, you need NumPy installed and imported correctly.
            Learn the one-time installation, the universal import convention, how to verify your setup,
            and how to diagnose common installation errors.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* INSTALL TAB */}
      {activeTab === "install" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-xl font-bold text-white">Installation by Environment</h2>
              <p className="text-xs text-slate-400">One-time setup — install NumPy before your first ML script</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-800 bg-slate-950 rounded-xl overflow-hidden">
              <thead className="bg-slate-900 text-slate-300 border-b border-slate-800 font-mono text-[11px] uppercase">
                <tr>
                  <th className="p-3 border-r border-slate-800 text-left">Environment</th>
                  <th className="p-3 border-r border-slate-800 text-left">Command</th>
                  <th className="p-3 text-left">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {ENVIRONMENTS.map((e) => (
                  <tr key={e.env} className="hover:bg-slate-900/50">
                    <td className="p-3 text-white font-semibold border-r border-slate-800">{e.env}</td>
                    <td className="p-3 font-mono text-cyan-300 border-r border-slate-800">{e.cmd}</td>
                    <td className="p-3 text-slate-400">{e.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Installation note */}
          <div className="bg-slate-950 p-5 rounded-xl border border-indigo-800/30 space-y-3">
            <div className="font-mono text-sm text-slate-300 space-y-1">
              <div className="text-slate-500"># Step 1: Open terminal / command prompt</div>
              <div className="text-emerald-400">pip install numpy</div>
              <div className="mt-2 text-slate-500"># Step 2: Verify installation</div>
              <div className="text-slate-200">python -c "import numpy as np; print(np.__version__)"</div>
              <div className="mt-2 text-slate-500"># Step 3: You are ready to code!</div>
              <div className="text-slate-200">import numpy as np  <span className="text-slate-500"># always at top of your script</span></div>
            </div>
          </div>
        </section>
      )}

      {/* IMPORT TAB */}
      {activeTab === "import" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">02</div>
            <div>
              <h2 className="text-xl font-bold text-white">The Import Convention</h2>
              <p className="text-xs text-slate-400">Why 'np' is sacred in the data science community</p>
            </div>
          </div>

          <div className="space-y-3">
            {IMPORTS.map((imp) => (
              <div key={imp.code} className={`p-4 rounded-xl border ${imp.bg} flex items-center justify-between gap-4`}>
                <code className="font-mono text-sm text-white">{imp.code}</code>
                <span className={`text-sm font-bold shrink-0 ${imp.color}`}>{imp.verdict}</span>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white">Why "np" is the only correct alias</h3>
            <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
              <li>Every NumPy tutorial, documentation page, and Stack Overflow answer uses <code className="text-cyan-300">np</code></li>
              <li>Scikit-learn, Pandas, Matplotlib documentation all write <code className="text-cyan-300">np.array()</code></li>
              <li>Saves typing — <code className="text-cyan-300">np.zeros(5)</code> vs <code className="text-slate-500">numpy.zeros(5)</code></li>
              <li>IDE auto-complete suggests <code className="text-cyan-300">np.</code> functions correctly</li>
              <li>Code reviewers, professors, and colleagues expect <code className="text-cyan-300">np</code></li>
            </ul>
          </div>

          {/* Standard ML import block */}
          <div className="bg-slate-950 p-5 rounded-xl border border-indigo-800/30 space-y-2">
            <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-3">Standard ML Script Header (memorize this)</div>
            <div className="font-mono text-xs space-y-1">
              <div className="text-emerald-400">import numpy as np</div>
              <div className="text-amber-400">import pandas as pd</div>
              <div className="text-cyan-400">import matplotlib.pyplot as plt</div>
              <div className="text-purple-400">import seaborn as sns</div>
              <div className="text-blue-400">from sklearn.model_selection import train_test_split</div>
              <div className="text-rose-400">from sklearn.linear_model import LinearRegression</div>
            </div>
            <p className="text-xs text-slate-400 mt-3">All six libraries rely on NumPy arrays internally.</p>
          </div>
        </section>
      )}

      {/* VERIFY TAB */}
      {activeTab === "verify" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">03</div>
            <div>
              <h2 className="text-xl font-bold text-white">Verifying Your Installation</h2>
              <p className="text-xs text-slate-400">Always verify before starting a new project</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { check: "Version",          code: "np.__version__",     eg: "'1.26.4'",  desc: "Current installed version" },
              { check: "File path",        code: "np.__file__",        eg: "'/usr/.../numpy/__init__.py'", desc: "Where NumPy is installed" },
              { check: "BLAS config",      code: "np.show_config()",   eg: "blas_opt...", desc: "Which BLAS is linked" },
              { check: "Namespace count",  code: "len(dir(np))",       eg: "~600+",     desc: "Total attributes & functions" },
            ].map((c) => (
              <div key={c.check} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-emerald-700/50 transition-all duration-300">
                <div className="text-xs font-semibold text-emerald-400 uppercase">{c.check}</div>
                <div className="font-mono text-sm text-white">{c.code}</div>
                <div className="font-mono text-xs text-slate-400">→ {c.eg}</div>
                <div className="text-xs text-slate-400">{c.desc}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
            <div className="text-slate-400 text-[11px] uppercase font-semibold mb-2">Complete verification script</div>
            <div className="text-slate-200">import numpy as np</div>
            <div className="text-slate-200">print("NumPy version  :", np.__version__)</div>
            <div className="text-slate-200">print("Install path   :", np.__file__)</div>
            <div className="text-slate-200">arr = np.array([1, 2, 3])</div>
            <div className="text-slate-200">print("Test array     :", arr)</div>
            <div className="text-slate-200">print("Test dtype     :", arr.dtype)</div>
            <div className="text-emerald-400"># If no errors → NumPy is working correctly ✔</div>
          </div>
        </section>
      )}

      {/* ERRORS TAB */}
      {activeTab === "errors" && (
        <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">04</div>
            <div>
              <h2 className="text-xl font-bold text-white">Common Installation Errors</h2>
              <p className="text-xs text-slate-400">Diagnose and fix the most frequent NumPy errors</p>
            </div>
          </div>

          <div className="space-y-4">
            {ERRORS.map((e) => (
              <div key={e.error} className={`bg-slate-950 p-5 rounded-xl border ${e.color} space-y-3`}>
                <div className="font-mono text-sm text-rose-300 font-bold">{e.error}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold">Cause: </span>
                    <span className="text-slate-300">{e.cause}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold">Fix: </span>
                    <code className="text-emerald-400 font-mono">{e.fix}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PITFALLS */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-5">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">⚠️ Pitfalls &amp; Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-2">
            <h3 className="text-sm font-bold text-rose-400">❌ Common Mistakes</h3>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
              <li>Using <code className="text-rose-300">from numpy import *</code> — causes namespace pollution</li>
              <li>Forgetting to run pip in the right virtual environment</li>
              <li>Using <code className="text-rose-300">np.bool</code> instead of <code className="text-emerald-300">np.bool_</code> in NumPy ≥1.24</li>
              <li>Installing NumPy globally instead of in a virtual environment</li>
            </ul>
          </div>
          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-2">
            <h3 className="text-sm font-bold text-emerald-400">✔ Best Practices</h3>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
              <li>Always use <code className="text-emerald-300">import numpy as np</code> — nothing else</li>
              <li>Create a virtual environment per project: <code className="text-cyan-300">python -m venv myenv</code></li>
              <li>Pin your version in requirements.txt: <code className="text-cyan-300">numpy==1.26.4</code></li>
              <li>Verify with <code className="text-emerald-300">print(np.__version__)</code> at the start of projects</li>
            </ul>
          </div>
        </div>
      </section>

      {/* HINT */}
      <section className="bg-gradient-to-r from-slate-900 to-indigo-950/40 p-6 rounded-2xl border border-indigo-800/30 space-y-3">
        <h2 className="text-lg font-bold text-indigo-300">💡 Think About This…</h2>
        <p className="text-sm text-slate-300">
          Swadeep asked: <em>"Why should I bother with <code className="text-cyan-300">import numpy as np</code>
          instead of just <code className="text-cyan-300">import numpy</code>?"</em>
        </p>
        <p className="text-sm text-slate-300">
          Sukanta replied: <em>"You'll write <code className="text-cyan-300">np.array()</code>,
          <code className="text-cyan-300">np.zeros()</code>, <code className="text-cyan-300">np.mean()</code>
          thousands of times in a single ML project. The alias saves you 4 characters every time.
          More importantly — every colleague, every textbook, every StackOverflow answer uses 'np'.
          Consistency is a professional standard, not just convenience."</em>
        </p>
      </section>

      {/* PYTHON LAB */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">💻</div>
          <div>
            <h2 className="text-xl font-bold text-white">Python Code Demonstration Suite (3 Focused Scripts)</h2>
            <p className="text-xs text-slate-400">Select a script below to inspect environment checks, import rules, or ML stack verification</p>
          </div>
        </div>

        {/* Script Selection Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PYTHON_SCRIPTS.map((script) => (
            <button
              key={script.id}
              onClick={() => setSelectedScriptId(script.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedScriptId === script.id
                  ? "bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-950/40 scale-[1.02]"
                  : "bg-slate-950/70 border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                    selectedScriptId === script.id
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                      : "bg-slate-800 text-slate-500 border-slate-700"
                  }`}
                >
                  {script.badge}
                </span>
              </div>
              <p className="text-xs font-bold text-white truncate">{script.title}</p>
            </button>
          ))}
        </div>

        {/* Active Script Description Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400">
                {activeScript.fileName}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">{activeScript.summary}</p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={activeScript.code}
          title={activeScript.fileName}
        />
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <FAQTemplate title="Installing &amp; Importing NumPy — FAQs" questions={questions} />
      </section>

      {/* PLAIN TEXT NOTE */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Installing and Importing NumPy — Quick Revision Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 1 Study Note"
          downloadFileName="numpy_install_note.txt"
        />
      </section>

      {/* TEACHER */}
      <section>
        <Teacher
          note="The import statement 'import numpy as np' is non-negotiable. You will write it at the top of every single Python file in this course. Treat it like signing your name — it signals to every reader that this is a professional data science script. Skip it or change the alias and you immediately mark yourself as an amateur. — Sukanta Hui, Coder & AccoTax, Barrackpore"
        />
      </section>
    </div>
  );
};

export default Topic1;
