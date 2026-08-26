import React, { useState, useId } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic7_files/data_cleaning_lab.py?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions.js";

const Topic7 = () => {
  const [activeTab, setActiveTab] = useState("theory");
  const [parameterScale, setParameterScale] = useState(50);
  const svgId = useId();

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-12">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Data Types and Preprocessing • Topic 7
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Academic Core
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Data cleaning
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Explore Data cleaning within the comprehensive framework of Data Types and Preprocessing. Understand mathematical principles, algorithmic formulations, loss optimization, and industrial case studies across West Bengal.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Conceptual Foundations" },
              { id: "interactive", label: "2. Interactive Laboratory Studio" },
              { id: "caseStudies", label: "3. Regional Industrial Cases" },
              { id: "bestPractices", label: "4. Pitfalls & Best Practices" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer",
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* SECTION 1: THEORY */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Theoretical Foundation: Data cleaning
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Fundamental principles, mathematical representations, and optimization dynamics
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Conceptual Architecture</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              In Data Types and Preprocessing, data cleaning establishes mathematical mapping functions between high-dimensional feature vectors and target prediction spaces, adjusting weights iteratively via empirical loss minimization.
            </p>
            <div className="text-[11px] font-mono text-indigo-300 bg-slate-900 p-2.5 rounded border border-slate-800">
              Optimization: min_w (1/N) ∑ L(h(x_i; w), y_i) + λ Ω(w)
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Key Learning Outcomes</span>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-2 list-disc list-inside">
              <li><strong className="text-white">Empirical Formulation:</strong> Formulating mathematical objectives over feature matrices.</li>
              <li><strong className="text-white">Loss Surface Dynamics:</strong> Navigating loss functions with gradient descent optimization.</li>
              <li><strong className="text-white">Generalization Guarantee:</strong> Validating model stability on held-out test splits.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE STUDIO */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Data cleaning Simulation Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Live mathematical response visualizer for parameter tuning
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300">Optimization Parameter Scale:</span>
            <span className="text-cyan-400 font-bold">{parameterScale}%</span>
          </div>

          <input
            type="range"
            min="10"
            max="100"
            value={parameterScale}
            onChange={(e) => setParameterScale(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Effective Capacity</span>
              <div className="text-xl font-bold font-mono text-emerald-400">{(parameterScale * 1.25).toFixed(1)}%</div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Empirical Loss</span>
              <div className="text-xl font-bold font-mono text-cyan-400">{(1.5 * Math.exp(-parameterScale / 30)).toFixed(3)}</div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Convergence State</span>
              <div className="text-sm font-bold font-mono text-indigo-300">
                {parameterScale < 35 ? "Under-converged" : parameterScale > 80 ? "Optimal State" : "Stable Learning"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: REGIONAL CASE STUDIES */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">
            03
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Real-World Regional Industrial Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Applied case studies across education, healthcare, finance, and commerce
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Barrackpore Academic Lab</span>
            <h3 className="text-base font-bold text-white">Student Academic Analytics</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mamata and Mahima implemented data cleaning models analyzing assignment submission rhythms, attendance rates, and weekly quiz scores to provide proactive academic mentoring.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Kolkata Salt Lake Sector V</span>
            <h3 className="text-base font-bold text-white">Enterprise Financial Analytics</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu deployed data cleaning pipelines in corporate payment gateways to evaluate real-time transaction risks and predict market valuation in ₹ Lakhs.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Ichapur Retail Center</span>
            <h3 className="text-base font-bold text-white">Retail Consumer Intelligence</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Susmita applied data cleaning algorithms on 40,000 retail transaction histories to personalize promotional discount allocations.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Jadavpur Medical Hub</span>
            <h3 className="text-base font-bold text-white">Clinical Diagnostic Systems</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Abhronila engineered data cleaning classifiers to evaluate high-resolution diagnostic imaging, maximizing diagnostic sensitivity.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: PITFALLS & BEST PRACTICES */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">
            04
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Common Pitfalls &amp; Industry Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Key engineering guidelines for Data cleaning
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Fitting data scalers or transformers on test partitions (Data Leakage).</li>
              <li>Ignoring class imbalances when computing evaluation metrics.</li>
              <li>Evaluating models solely on training loss without cross-validation.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Always isolate the test set before executing any data transformation.</li>
              <li>Establish a simple baseline before training complex models.</li>
              <li>Continuously monitor input feature distributions for concept drift.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PYTHON LABORATORY */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            05
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Executable Python Laboratory Simulation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Interactive standalone lab script for Data cleaning
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="data_cleaning_lab.py"
          highlightLines={[25, 26, 35, 45]}
        />
      </section>

      {/* FAQ TEMPLATE */}
      <section className="space-y-4">
        <FAQTemplate
          title="Data cleaning — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* PRINTABLE NOTE */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Data cleaning"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 7 Note"
          downloadFileName="topic7_note.txt"
        />
      </section>

      {/* TEACHER NOTE */}
      <section>
        <Teacher
          note="Mastering Data cleaning in Data Types and Preprocessing is essential for building scalable, reliable Machine Learning systems. Focus on understanding how mathematical optimization interfaces with real-world feature matrices. Practice the laboratory code, verify the step-by-step derivations, and remember: data cleanliness and rigorous validation are 80% of machine learning success!"
        />
      </section>
    </div>
  );
};

export default Topic7;
