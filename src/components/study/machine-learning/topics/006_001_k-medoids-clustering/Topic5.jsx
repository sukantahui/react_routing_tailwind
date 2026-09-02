import React, { useState, useId } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic5_files/medoid_selection_update_lab.py?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions.js";

export default function Topic5() {
  const [activeTab, setActiveTab] = useState("theory");
  const [candidateIndex, setCandidateIndex] = useState(2);
  const svgId = useId();

  // 5 cluster points with their total intra-cluster distances
  const clusterMembers = [
    { id: 0, label: "P0 (2, 3)", distSum: 14 },
    { id: 1, label: "P1 (3, 4)", distSum: 10 },
    { id: 2, label: "P2 (4, 5)", distSum: 8 },  // Optimal Medoid!
    { id: 3, label: "P3 (5, 4)", distSum: 10 },
    { id: 4, label: "P4 (8, 9)", distSum: 22 }  // Outlier
  ];

  const selectedCandidate = clusterMembers[candidateIndex];

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-12">
      {/* 1. Header Section */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Advanced ML • Module 006_001 • Topic 5
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Intra-Cluster Optimization
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Medoid Selection and Intra-Cluster Update Procedure
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Master the systematic recalculation of cluster centers. Discover how each cluster independently identifies the optimal internal exemplar minimizing total intra-cluster dissimilarity, enabling fast Voronoi alternation and stable local convergence.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Update Mechanics" },
              { id: "interactive", label: "2. Candidate Search Studio" },
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
              Teacher's Corner: Electing the Optimal Local Team Leader
            </h2>
            <p className="text-xs text-indigo-300/80">
              Classroom discussion by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
            </p>
          </div>
        </div>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            In our lab, <strong>Mahima</strong> and <strong>Susmita</strong> asked: <em>"Once students are grouped into a study team, how do they elect the most central team representative?"</em>
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              🤝 The Intra-Team Distance Election
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              Every student in the team calculates their travel distance to every teammate.
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              The student whose house minimizes the total travel time for all teammates combined is elected as the team's <strong>Updated Medoid</strong>!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Intra-Cluster Medoid Optimization
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Evaluating Candidates within Cluster $C_k$: Finding $m_k^* = \arg\min \sum D(x, y)$
            </text>

            {/* Candidate Evaluation Grid */}
            <g transform="translate(60, 50)">
              <rect x="0" y="0" width="400" height="180" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="200" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs font-mono">Cluster $C_k$ Member Space (5 Points)</text>

              {/* Point P0 */}
              <circle cx="60" cy="80" r="6" fill="#94a3b8" />
              <text x="60" y="100" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-mono">P0</text>

              {/* Point P1 */}
              <circle cx="120" cy="110" r="6" fill="#94a3b8" />
              <text x="120" y="130" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-mono">P1</text>

              {/* Optimal Medoid P2 */}
              <circle cx="190" cy="90" r="11" fill="#10b981" stroke="#fff" strokeWidth="2" />
              <text x="190" y="70" textAnchor="middle" fill="#6ee7b7" className="text-xs font-bold font-mono">P2 (Optimal Medoid)</text>

              {/* Distances from P2 */}
              <line x1="190" y1="90" x2="60" y2="80" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="190" y1="90" x2="120" y2="110" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="190" y1="90" x2="260" y2="100" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="190" y1="90" x2="340" y2="140" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />

              {/* Point P3 */}
              <circle cx="260" cy="100" r="6" fill="#94a3b8" />
              <text x="260" y="120" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-mono">P3</text>

              {/* Outlier Point P4 */}
              <circle cx="340" cy="140" r="6" fill="#f43f5e" />
              <text x="340" y="160" textAnchor="middle" fill="#fca5a5" className="text-[10px] font-mono">P4 (Outlier)</text>
            </g>

            {/* Right Distance Sum Table */}
            <g transform="translate(490, 50)">
              <rect x="0" y="0" width="370" height="180" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
              <text x="185" y="25" textAnchor="middle" fill="#a5b4fc" className="font-bold text-xs font-mono">Intra-Cluster Distance Sums</text>

              {[
                { label: "P0 (2, 3)", sum: "14.00", status: "Sub-optimal" },
                { label: "P1 (3, 4)", sum: "10.00", status: "Close" },
                { label: "P2 (4, 5)", sum: "8.00", status: "OPTIMAL MEDOID", highlight: true },
                { label: "P3 (5, 4)", sum: "10.00", status: "Close" },
                { label: "P4 (8, 9)", sum: "22.00", status: "High Dispersal" },
              ].map((row, idx) => (
                <g key={idx} transform={`translate(20, ${38 + idx * 27})`}>
                  <rect x="0" y="0" width="330" height="23" rx="4" fill={row.highlight ? "#064e3b" : "#0f172a"} stroke={row.highlight ? "#10b981" : "#334155"} />
                  <text x="15" y="16" fill={row.highlight ? "#34d399" : "#cbd5e1"} className="text-[11px] font-mono font-bold">{row.label}</text>
                  <text x="150" y="16" fill={row.highlight ? "#34d399" : "#cbd5e1"} className="text-[11px] font-mono">Sum = {row.sum}</text>
                  <text x="260" y="16" fill={row.highlight ? "#a7f3d0" : "#94a3b8"} className="text-[10px] font-bold">{row.status}</text>
                </g>
              ))}
            </g>

            {/* Explanatory footer */}
            <rect x="60" y="240" width="800" height="35" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="460" y="262" textAnchor="middle" fill="#38bdf8" className="text-xs font-mono">
              • Point P2 achieves the global minimum intra-cluster distance sum (8.00) and becomes the updated medoid!
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Medoid Selection Mathematical Formalism
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Formulas, pairwise sum matrix extraction, and intra-cluster search dynamics
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Intra-Cluster Argmin</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              For each cluster $C_k$ containing $N_k$ observations, the updated medoid $m_k^*$ is the element that minimizes the sum of distances to all other points within $C_k$:
            </p>
            <div className="text-[12px] font-mono text-indigo-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
              m_k^* = \arg\min_{y \in C_k} \sum_{x \in C_k} D(x, y)
            </div>
            <p className="text-xs text-slate-400">
              Computational complexity per cluster is $O(N_k^2 \cdot d)$.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Monotonic Non-Increasing Cost</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Since the update step explicitly selects the minimum over all current cluster members, the new intra-cluster cost is guaranteed to be less than or equal to the previous cost:
            </p>
            <div className="text-[12px] font-mono text-emerald-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
              \sum_{x \in C_k} D(x, m_k^*) \le \sum_{x \in C_k} D(x, m_k^{\text{old}})
            </div>
            <p className="text-xs text-slate-400">
              Guarantees that total clustering cost never degrades during medoid updates.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Live Interactive Candidate Search Studio */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Live Intra-Cluster Candidate Evaluation Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Select different member points in Cluster $C_k$ and see why Point P2 achieves the global minimum intra-cluster distance sum
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300">Selected Candidate Member:</span>
            <span className="text-cyan-400 font-bold">{selectedCandidate.label}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {clusterMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => setCandidateIndex(member.id)}
                className={clsx(
                  "px-4 py-2 text-xs font-bold font-mono rounded-lg transition-all cursor-pointer",
                  candidateIndex === member.id
                    ? "bg-indigo-600 text-white shadow-md border border-indigo-400"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                )}
              >
                {member.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Candidate Point</span>
              <div className="text-lg font-bold font-mono text-white">{selectedCandidate.label}</div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-amber-900/50 space-y-1">
              <span className="text-[11px] font-bold text-amber-400 uppercase">Intra-Cluster Distance Sum</span>
              <div className="text-2xl font-bold font-mono text-amber-300">{selectedCandidate.distSum} units</div>
            </div>

            <div className={clsx(
              "p-4 rounded-lg border space-y-1",
              selectedCandidate.id === 2
                ? "bg-emerald-950/50 border-emerald-500/50"
                : "bg-rose-950/40 border-rose-900/50"
            )}>
              <span className="text-[11px] font-bold uppercase text-slate-300">Medoid Status</span>
              <div className="text-base font-bold font-mono text-white">
                {selectedCandidate.id === 2 ? "✅ OPTIMAL MEDOID (Lowest Sum: 8)" : "❌ Sub-optimal Candidate"}
              </div>
            </div>
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
              Applied medoid selection procedures across West Bengal enterprises
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Shyamnagar Logistics Hub</span>
            <h3 className="text-base font-bold text-white">Dispatch Depot Re-centering</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Sachin recalculated the central distribution warehouse among 40 regional retail stores, updating the medoid to an industrial park location that reduced total weekly delivery transit by 450 km.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Kolkata Salt Lake Sector V</span>
            <h3 className="text-base font-bold text-white">IT Service Ticket Canonical Exemplar</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu updated the medoid ticket across 500 database incident reports to serve as the master troubleshooting documentation template for helpdesk engineers.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Jadavpur Medical Hub</span>
            <h3 className="text-base font-bold text-white">Benchmark Patient Profiling</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mahima updated the medoid clinical record for asthma cohorts, selecting an actual patient whose respiratory parameters reflected the cluster center for medication dosage modeling.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Barrackpore Academic Lab</span>
            <h3 className="text-base font-bold text-white">Student Peer Mentor Selection</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Susmita identified the student whose programming habits were most representative of their study group, assigning them to coordinate lab code reviews.
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
              Key engineering guidelines for intra-cluster medoid updates
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Recomputing pairwise distances on the fly instead of slicing the precomputed distance matrix.</li>
              <li>Searching for updated medoids outside the cluster members (violates cluster boundary guarantees).</li>
              <li>Using non-deterministic tie-breaking when two members have identical minimal distance sums.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Extract distance submatrices using NumPy indexing `D[np.ix_(members, members)]`.</li>
              <li>Parallelize cluster medoid updates across $K$ processes for rapid multicore execution.</li>
              <li>Track medoid index convergence to terminate iterations early when centers stabilize.</li>
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
          Why does the medoid update step scale quadratically ($O(N_k^2)$) with cluster size $N_k$, while K-Means centroid update scales linearly ($O(N_k)$)? How does this trade-off explain why K-Medoids is slightly slower but far more robust?
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
              Interactive standalone lab script for Intra-Cluster Medoid Search &amp; Selection
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="medoid_selection_update_lab.py"
          highlightLines={[14, 15, 16, 20, 35]}
        />
      </section>

      {/* 10. FAQ Template */}
      <section className="space-y-4">
        <FAQTemplate
          title="Medoid Selection &amp; Update — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* 11. Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Medoid Selection and Update Procedure"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 5 Note"
          downloadFileName="module_006_001_topic5_note.txt"
        />
      </section>

      {/* 12. Teacher Note */}
      <section>
        <Teacher
          note="Medoid selection is where each cluster independently discovers its true physical anchor. By evaluating pairwise distances within the group, K-Medoids guarantees that the cluster leader is an optimal, uncorrupted data exemplar! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
