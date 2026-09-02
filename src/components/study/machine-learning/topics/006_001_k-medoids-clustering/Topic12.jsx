import React, { useState, useId } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic12_files/short_questions_lab.py?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions.js";

export default function Topic12() {
  const [activeTab, setActiveTab] = useState("theory");
  const [quizIndex, setQuizIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const svgId = useId();

  const rapidQuiz = [
    {
      q: "1. What is the fundamental difference between a centroid and a medoid?",
      a: "A centroid is a virtual arithmetic mean vector (may not exist in dataset); a medoid is always an actual observed data instance."
    },
    {
      q: "2. What is the breakdown point of K-Medoids compared to K-Means?",
      a: "K-Medoids has a 50% breakdown point (extreme outlier resistance); K-Means has a 0% breakdown point (single outlier corrupts center)."
    },
    {
      q: "3. What are the two phases of the PAM algorithm?",
      a: "1. The BUILD phase (greedy initialization of initial K medoids) and 2. The SWAP phase (iterative cost-decreasing medoid replacements)."
    },
    {
      q: "4. How does CLARA enable K-Medoids to scale to big data?",
      a: "By drawing multiple small random subsamples (e.g. 40 + 2k), running PAM on each sample, and selecting the medoids with minimal total dataset cost."
    },
    {
      q: "5. What distance metric is best for high-dimensional text documents in K-Medoids?",
      a: "Cosine Distance (measures angular document similarity independent of document length)."
    }
  ];

  const currentQuizItem = rapidQuiz[quizIndex];

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-12">
      {/* 1. Header Section */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Advanced ML • Module 006_001 • Topic 12
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Rapid Review &amp; Short Questions
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Short Questions &amp; Rapid-Fire Concept Review
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Consolidate your mastery of K-Medoids Clustering. Review core definitions, mathematical loss formulas, algorithmic complexities, and design trade-offs for university exams and machine learning technical interviews.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Summary Cards" },
              { id: "interactive", label: "2. Live Flashcard Studio" },
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

      {/* 2. Dedicated Topic Description (What, Why, How, When) + CNAT Classroom */}
      <section className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border-2 border-indigo-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-3 border-b border-indigo-500/20 pb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 text-xl border border-indigo-500/30">
            🧑‍🏫
          </span>
          <div>
            <h2 className="text-2xl font-black text-indigo-200 tracking-tight">
              Teacher's Corner: The Complete Module 006_001 Graduation
            </h2>
            <p className="text-xs text-indigo-300/80">
              Classroom discussion by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
            </p>
          </div>
        </div>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            Congratulations! Across all 13 topics of Module 006_001, <strong>Sachin, Mahima, Susmita, Abhronila, Debangshu, Swadeep, and Tuhina</strong> have mastered:
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              🎓 The 5 Pillars of K-Medoids Mastery
            </h3>
            <ul className="text-xs md:text-sm text-slate-300 space-y-1 list-disc list-inside">
              <li><strong>1. Discrete Exemplars:</strong> Medoids are 100% authentic observations.</li>
              <li><strong>2. Outlier Immunity:</strong> 50% breakdown point via absolute distance minimization.</li>
              <li><strong>3. Metric Freedom:</strong> Native execution on Manhattan, Cosine, and arbitrary graph matrices.</li>
              <li><strong>4. Algorithmic Rigor:</strong> Deterministic BUILD initialization and cost-reducing SWAP optimization.</li>
              <li><strong>5. Scalability Engineering:</strong> Scaling via FastPAM and CLARA sampling for big data.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual SVG Diagram: Module Roadmap Overview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: The Complete K-Medoids Algorithmic Framework
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              The Complete K-Medoids Clustering Framework (Topics 0 to 12)
            </text>

            {/* Pillar 1 */}
            <g transform="translate(40, 50)">
              <rect x="0" y="0" width="180" height="180" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="90" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs font-mono">1. Foundations</text>
              <rect x="10" y="40" width="160" height="40" rx="4" fill="#0f172a" />
              <text x="20" y="65" fill="#cbd5e1" className="text-[11px] font-mono">Medoid vs Centroid</text>
              <rect x="10" y="90" width="160" height="40" rx="4" fill="#0f172a" />
              <text x="20" y="115" fill="#cbd5e1" className="text-[11px] font-mono">Metric Spaces</text>
              <text x="90" y="155" textAnchor="middle" fill="#7dd3fc" className="text-[10px]">Topics 0, 1, 2</text>
            </g>

            {/* Pillar 2 */}
            <g transform="translate(260, 50)">
              <rect x="0" y="0" width="180" height="180" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="90" y="25" textAnchor="middle" fill="#f59e0b" className="font-bold text-xs font-mono">2. PAM Engine</text>
              <rect x="10" y="40" width="160" height="40" rx="4" fill="#0f172a" />
              <text x="20" y="65" fill="#cbd5e1" className="text-[11px] font-mono">BUILD &amp; SWAP</text>
              <rect x="10" y="90" width="160" height="40" rx="4" fill="#0f172a" />
              <text x="20" y="115" fill="#cbd5e1" className="text-[11px] font-mono">Cost Delta $\Delta C$</text>
              <text x="90" y="155" textAnchor="middle" fill="#fcd34d" className="text-[10px]">Topics 3, 4, 5</text>
            </g>

            {/* Pillar 3 */}
            <g transform="translate(480, 50)">
              <rect x="0" y="0" width="180" height="180" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
              <text x="90" y="25" textAnchor="middle" fill="#818cf8" className="font-bold text-xs font-mono">3. Dynamics &amp; Scaling</text>
              <rect x="10" y="40" width="160" height="40" rx="4" fill="#0f172a" />
              <text x="20" y="65" fill="#cbd5e1" className="text-[11px] font-mono">Convergence Stability</text>
              <rect x="10" y="90" width="160" height="40" rx="4" fill="#0f172a" />
              <text x="20" y="115" fill="#cbd5e1" className="text-[11px] font-mono">K-Means Benchmark</text>
              <text x="90" y="155" textAnchor="middle" fill="#a5b4fc" className="text-[10px]">Topics 6, 7, 8</text>
            </g>

            {/* Pillar 4 */}
            <g transform="translate(700, 50)">
              <rect x="0" y="0" width="180" height="180" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <text x="90" y="25" textAnchor="middle" fill="#10b981" className="font-bold text-xs font-mono">4. Mastery &amp; Practice</text>
              <rect x="10" y="40" width="160" height="40" rx="4" fill="#0f172a" />
              <text x="20" y="65" fill="#cbd5e1" className="text-[11px] font-mono">Worked Numerical 1</text>
              <rect x="10" y="90" width="160" height="40" rx="4" fill="#0f172a" />
              <text x="20" y="115" fill="#cbd5e1" className="text-[11px] font-mono">Practice &amp; Review</text>
              <text x="90" y="155" textAnchor="middle" fill="#34d399" className="text-[10px] font-bold">Topics 9, 10, 11, 12</text>
            </g>

            {/* Explanatory footer */}
            <rect x="40" y="240" width="840" height="35" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="460" y="262" textAnchor="middle" fill="#38bdf8" className="text-xs font-mono">
              • Complete Module 006_001 Syllabus Verified: Comprehensive Theory, Mathematics, Labs, &amp; Exercises!
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section: Core Summary Cards */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Core Concept Summary Cards
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Essential high-yield formulas, properties, and definitions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Loss Formulation</span>
            <div className="text-[11px] font-mono text-cyan-300 bg-slate-900 p-2 rounded border border-slate-800">
              J = \sum_{i=1}^N D(x_i, m_{y_i})
            </div>
            <p className="text-xs text-slate-400">Minimizes absolute pairwise dissimilarity.</p>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">PAM Swap Condition</span>
            <div className="text-[11px] font-mono text-amber-300 bg-slate-900 p-2 rounded border border-slate-800">
              \Delta C = C_{\text{new}} - C_{\text{curr}} &lt; 0
            </div>
            <p className="text-xs text-slate-400">Monotonically decreases total cost.</p>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Silhouette Score</span>
            <div className="text-[11px] font-mono text-emerald-300 bg-slate-900 p-2 rounded border border-slate-800">
              s(i) = \frac{b(i) - a(i)}{\max(a(i), b(i))}
            </div>
            <p className="text-xs text-slate-400">Values &gt; 0.5 indicate strong cohesion.</p>
          </div>
        </div>
      </section>

      {/* 5. Live Interactive Flashcard Studio */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Live Rapid-Fire Concept Flashcard Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Test your recall across core definitions and reveal the complete model answer
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300">Question {quizIndex + 1} of {rapidQuiz.length}:</span>
            <span className="text-cyan-400 font-bold">Concept Flashcard</span>
          </div>

          <div className="p-5 bg-slate-900 rounded-xl border border-indigo-900/50 space-y-3">
            <h3 className="text-base font-bold text-white">{currentQuizItem.q}</h3>
            {showAnswer ? (
              <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/40 rounded-lg text-emerald-300 text-xs sm:text-sm font-mono">
                {currentQuizItem.a}
              </div>
            ) : (
              <button
                onClick={() => setShowAnswer(true)}
                className="px-4 py-2 text-xs font-bold font-mono bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all cursor-pointer"
              >
                Reveal Model Answer
              </button>
            )}
          </div>

          <div className="flex justify-between gap-2 pt-2">
            <button
              onClick={() => {
                setQuizIndex((prev) => (prev > 0 ? prev - 1 : rapidQuiz.length - 1));
                setShowAnswer(false);
              }}
              className="px-4 py-2 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
            >
              ← Previous Card
            </button>

            <button
              onClick={() => {
                setQuizIndex((prev) => (prev < rapidQuiz.length - 1 ? prev + 1 : 0));
                setShowAnswer(false);
              }}
              className="px-4 py-2 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
            >
              Next Card →
            </button>
          </div>
        </div>
      </section>

      {/* 6. Regional Industrial Case Studies */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">
            03
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Real-World Regional Industrial Applications
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Summary of K-Medoids enterprise implementations across West Bengal
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Kolkata IT &amp; Legal Tech</span>
            <h3 className="text-base font-bold text-white">Legal Patent Thematic Grouping</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Cosine-based K-Medoids clustering identified benchmark patent filings to serve as authoritative thematic archetypes for intellectual property attorneys.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Shyamnagar Logistics</span>
            <h3 className="text-base font-bold text-white">Physical Courier Depot Optimization</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Manhattan-based K-Medoids located optimal warehouse address coordinates among commercial real estate listings, cutting regional delivery times.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Jadavpur Medical Hub</span>
            <h3 className="text-base font-bold text-white">Clinical Phenotype Discovery</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              50% breakdown point clustering extracted genuine representative patient vitals from noisy intensive care recordings.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Barrackpore Academic Hub</span>
            <h3 className="text-base font-bold text-white">Student Peer Group Allocation</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Standardized Euclidean K-Medoids matched programming students with peer mentors whose coding habits served as exemplary study templates.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Common Pitfalls & Best Practices */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">
            04
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Common Pitfalls &amp; Engineering Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Master checklist for enterprise clustering deployment
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Top 3 Pitfalls
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Running full PAM on massive datasets ($N &gt; 20,000$) without sampling.</li>
              <li>Neglecting feature standardization before computing distance matrices.</li>
              <li>Failing to use multi-start seeds (`n_init=10`) to escape poor local minima.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Top 3 Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Deploy `scikit-learn-extra` with FastPAM for exact, high-performance clustering.</li>
              <li>Use CLARA when scaling to hundreds of thousands of observations.</li>
              <li>Validate cluster boundaries and separation using Silhouette Analysis.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why has K-Medoids become the gold standard for responsible, auditable, and interpretable AI in healthcare and finance, where stakeholders reject black-box virtual averages?
        </p>
      </section>

      {/* 9. Executable Python Laboratory */}
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
              Interactive standalone lab script for Rapid-Fire Concept Review
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="short_questions_lab.py"
          highlightLines={[10, 20, 30, 40]}
        />
      </section>

      {/* 10. FAQ Template */}
      <section className="space-y-4">
        <FAQTemplate
          title="Short Questions &amp; Rapid Review — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* 11. Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Short Questions & Rapid-Fire Concept Review"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 12 Note"
          downloadFileName="module_006_001_topic12_note.txt"
        />
      </section>

      {/* 12. Teacher Note */}
      <section>
        <Teacher
          note="You have completed the entire K-Medoids Clustering module! You have mastered distance metrics, the PAM engine, Voronoi partitioning, convergence dynamics, and real-world deployment. Take this knowledge forward and build robust, interpretable machine learning systems with pride! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
