import React, { useState, useId } from "react";
import clsx from "clsx";
import { InlineMath, BlockMath } from "react-katex";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic11_files/practice_problems_lab.py?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions.js";

export default function Topic11() {
  const [activeTab, setActiveTab] = useState("theory");
  const [activeProblem, setActiveProblem] = useState(1);
  const svgId = useId();

  const practiceSet = [
    {
      id: 1,
      title: "Problem 1: Retail Shopper Segmentation (₹ & Frequency)",
      description: "Cluster 5 retail shoppers: C1(2, 5), C2(3, 8), C3(8, 2), C4(9, 3), C5(20, 20) with K=2 Manhattan distance.",
      clue: "Construct 5x5 matrix D. Check if outlier C5 distorts the normal shopper medoids.",
      solution: "Medoids: C1(2, 5) and C4(9, 3). Total Cost = ₹4.00 (Excluding C5's own distance). Outlier C5 does not corrupt normal medoids!"
    },
    {
      id: 2,
      title: "Problem 2: 4-Point Diamond Metric Invariance",
      description: "Points arranged in a diamond: (0,2), (2,0), (0,-2), (-2,0). Prove rotational symmetry for K=1.",
      clue: "Calculate Euclidean and Manhattan row sums for all 4 vertices.",
      solution: "Due to 4-fold rotational symmetry, all 4 vertices achieve identical row sums. Any point is an equally optimal medoid!"
    },
    {
      id: 3,
      title: "Problem 3: Distance-to-Medoid Anomaly Filter",
      description: "Formulate a threshold rule: Flag point as anomaly if D(x, medoid) > 2.5 * Median Distance.",
      clue: "Calculate median intra-cluster distance and apply threshold.",
      solution: "Anomalous transactions or outliers naturally land far from their cluster medoids, making K-Medoids a powerful anomaly detector."
    }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pt-6 pb-12">
      {/* 1. Header Section */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Advanced ML • Module 006_001 • Topic 11
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Self-Assessment &amp; Practice
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Practice Problems &amp; Independent Assessment
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Test and solidify your algorithmic problem-solving abilities. Tackle multi-attribute customer clustering, analyze metric invariance on geometric shapes, and design distance-to-medoid anomaly detection filters.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Problem Repository" },
              { id: "interactive", label: "2. Live Practice Studio" },
              { id: "caseStudies", label: "3. Regional Industrial Cases" },
              { id: "bestPractices", label: "4. Pitfalls & Best Practices" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
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
              Teacher's Corner: The True Test of Engineering Fluency
            </h2>
            <p className="text-xs text-indigo-300/80">
              Classroom discussion by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
            </p>
          </div>
        </div>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            In our lab, <strong>Swadeep</strong> and <strong>Tuhina</strong> tackled real-world retail problems. <strong>Sukanta Hui</strong> emphasized:
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              💡 The Retail Practice Challenge
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              When clustering customer purchases in Barrackpore Bazaar (spending in ₹ and visit counts), there is always a high-net-worth VIP customer who spends $10\times$ more than everyone else.
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              Your practice challenge is to verify that K-Medoids keeps normal shopper clusters clean and authentic, without allowing the VIP customer to distort typical buyer personas!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Practice Problem Solving Architecture
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Practice Architecture: Problem Specification → Algorithmic Deduction → Verified Solution
            </text>

            {/* Left Card */}
            <g transform="translate(60, 50)">
              <rect x="0" y="0" width="240" height="180" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="120" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs font-mono">1. Problem Specification</text>
              <rect x="15" y="45" width="210" height="50" rx="4" fill="#0f172a" />
              <text x="25" y="65" fill="#cbd5e1" className="text-[11px] font-mono">Customer Data (₹, Freq)</text>
              <text x="25" y="85" fill="#cbd5e1" className="text-[11px] font-mono">Outlier C5(20, 20)</text>
              <text x="120" y="150" textAnchor="middle" fill="#7dd3fc" className="text-[10px]">Real Retail Data</text>
            </g>

            {/* Arrow 1 */}
            <path d="M 300 140 L 340 140" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />

            {/* Middle Card */}
            <g transform="translate(345, 50)">
              <rect x="0" y="0" width="250" height="180" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="125" y="25" textAnchor="middle" fill="#f59e0b" className="font-bold text-xs font-mono">2. PAM Deduction</text>
              <rect x="15" y="45" width="220" height="55" rx="4" fill="#0f172a" />
              <text x="25" y="68" fill="#cbd5e1" className="text-[11px] font-mono">1st Medoid: C1(2, 5)</text>
              <text x="25" y="88" fill="#fcd34d" className="text-[11px] font-mono">2nd Medoid: C4(9, 3)</text>
              <text x="125" y="150" textAnchor="middle" fill="#34d399" className="text-[10px] font-bold">Robust Medoids Locked</text>
            </g>

            {/* Arrow 2 */}
            <path d="M 595 140 L 635 140" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />

            {/* Right Card */}
            <g transform="translate(640, 50)">
              <rect x="0" y="0" width="240" height="180" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <text x="120" y="25" textAnchor="middle" fill="#10b981" className="font-bold text-xs font-mono">3. Verified Solution</text>
              <rect x="15" y="45" width="210" height="55" rx="4" fill="#0f172a" />
              <text x="120" y="68" textAnchor="middle" fill="#34d399" className="font-bold text-xs font-mono">J = ₹4.00</text>
              <text x="120" y="88" textAnchor="middle" fill="#cbd5e1" className="text-[10px]">Zero Outlier Distortion</text>
              <text x="120" y="150" textAnchor="middle" fill="#34d399" className="text-xs font-bold font-mono">✓ Verified!</text>
            </g>

            {/* Explanatory footer */}
            <rect x="40" y="240" width="840" height="35" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="460" y="262" textAnchor="middle" fill="#38bdf8" className="text-xs font-mono">
              • Practice problems validate theoretical knowledge through real-world business scenarios!
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section id="theory" className="scroll-mt-6 bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Structured Practice Problem Repository
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Selected challenges designed for self-assessment and algorithm verification
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {practiceSet.map((prob) => (
            <div key={prob.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Challenge {prob.id}</span>
              <h3 className="text-sm font-bold text-white">{prob.title}</h3>
              <p className="text-xs text-slate-300">{prob.description}</p>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase">Hint &amp; Clue</span>
                <p className="text-[11px] text-slate-400">{prob.clue}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Live Interactive Practice Studio */}
      <section id="interactive" className="scroll-mt-6 bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Live Practice Problem Evaluation Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Select a challenge to view its detailed analytical deduction and verified solution
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap gap-2">
            {practiceSet.map((prob) => (
              <button
                key={prob.id}
                onClick={() => setActiveProblem(prob.id)}
                className={clsx(
                  "px-4 py-2 text-xs font-bold font-mono rounded-lg transition-all cursor-pointer",
                  activeProblem === prob.id
                    ? "bg-indigo-600 text-white shadow-md border border-indigo-400"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                )}
              >
                Challenge {prob.id}
              </button>
            ))}
          </div>

          <div className="bg-slate-900 p-5 rounded-lg border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Verified Solution</span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
              {currentProblem.solution}
            </p>
          </div>
        </div>
      </section>

      {/* 6. Regional Industrial Case Studies */}
      <section id="caseStudies" className="scroll-mt-6 bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">
            03
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Real-World Regional Industrial Applications
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Applied customer segmentation and outlier filtering across Bengal businesses
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Barrackpore Retail Store</span>
            <h3 className="text-base font-bold text-white">Loyalty Member Persona Discovery</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Sachin segmented 3,000 monthly grocery shoppers using K-Medoids. Actual medoid customer records were used by the marketing team to design personalized discount coupon booklets.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Shyamnagar E-Commerce</span>
            <h3 className="text-base font-bold text-white">Bulk Order Anomaly Filtering</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu applied distance-to-medoid filtering to flag unusual bulk purchase orders (e.g. ₹50,000 in one transaction) for anti-scalping inventory protection.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Kolkata IT Training Hub</span>
            <h3 className="text-base font-bold text-white">Curriculum Difficulty Customization</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Susmita clustered student Python test results into 3 skill levels, tailoring weekly problem sets to match the medoid skill profile of each cohort.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Jadavpur Medical Lab</span>
            <h3 className="text-base font-bold text-white">Drug Response Clustering</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mahima clustered pharmaceutical clinical test outcomes to identify non-responder patient groups for modified therapy dosage testing.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Common Pitfalls & Best Practices */}
      <section id="bestPractices" className="scroll-mt-6 bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">
            04
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Common Pitfalls &amp; Engineering Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Key tips for solving practice problems and engineering test suites
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Forgetting that currency features (in ₹) need scaling if combined with low-range counts (visits).</li>
              <li>Assuming symmetric shapes have a single unique medoid (symmetrical points share identical sums).</li>
              <li>Discarding outliers before evaluating their business value as high-value anomaly personas.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Always normalize purchase features using `MinMaxScaler` or `StandardScaler`.</li>
              <li>Use distance-to-medoid percentiles (e.g. 95th percentile) for robust anomaly detection.</li>
              <li>Include automated pytest test cases for all practice datasets in your code repositories.</li>
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
          In customer clustering, if an outlier shopper spends ₹100,000, why does K-Medoids gracefully assign them to the closest medoid without dragging the medoid away from everyday ₹500 shoppers?
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
              Interactive standalone lab script for Practice Problem Automated Verification
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="practice_problems_lab.py"
          highlightLines={[15, 20, 30, 45]}
        />
      </section>

      {/* 10. FAQ Template */}
      <section className="space-y-4">
        <FAQTemplate
          title="Practice Problems — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* 11. Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Practice Problems & Independent Assessment"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 11 Note"
          downloadFileName="module_006_001_topic11_note.txt"
        />
      </section>

      {/* 12. Teacher Note */}
      <section>
        <Teacher
          note="Independent practice is the bridge that turns classroom theory into production engineering competence. Tackle these challenges, verify your matrix calculations, and you'll possess unshakeable confidence in clustering machine learning! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
