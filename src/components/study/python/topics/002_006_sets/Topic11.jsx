import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import symDiffBasics from "./topic11_files/symmetric_difference_basics.py?raw";
import symDiffUpdate from "./topic11_files/symmetric_difference_update_demo.py?raw";
import disjointAuditing from "./topic11_files/disjoint_exclusive_auditing.py?raw";
import bankRecon from "./topic11_files/bank_reconciliation_anomaly.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic11_files/topic11_note.txt?raw";

// FAQ Questions
import questions from "./topic11_files/topic11_questions";

/**
 * Topic11: Symmetric Difference Deep Dive
 * Module: 002_006_sets
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * In-depth exploration of Symmetric Difference (A ^ B / symmetric_difference),
 * in-place mutations (A ^= B), XOR logic, state toggling patterns,
 * three-way odd-multiplicity chaining, and bank reconciliation anomaly detection.
 */
export default function Topic11() {
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("xor");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
        }
      `}</style>

      {/* ==================================================================== */}
      {/* HEADER SECTION */}
      {/* ==================================================================== */}
      <header
        ref={addToRefs}
        className="section-hidden max-w-5xl mx-auto mb-12 pb-8 border-b border-slate-800/80"
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs sm:text-sm font-mono font-semibold bg-emerald-950/80 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800/80 shadow-sm shadow-emerald-950/50">
            Segment 2 • Module 002_006
          </span>
          <span className="text-xs sm:text-sm font-mono bg-sky-950/80 text-sky-300 px-3 py-1 rounded-full border border-sky-800/80 shadow-sm shadow-sky-950/50">
            Topic 11
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Exclusive Disjunctive Logic
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Symmetric Difference: <code className="text-purple-400 font-mono">^</code> & <code className="text-emerald-400 font-mono">^=</code>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Mastering set XOR algebra: isolating elements in either set but NOT in both (<code className="text-purple-400 font-mono">(A | B) - (A &amp; B)</code>), state toggling patterns, and bank reconciliation anomaly detection.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            Δ Disjunctive Union (XOR)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 State Toggling Pattern (s ^= {'{item}'})
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏦 Bank Ledger Reconciler
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📐 Self-Inverting: A ^ A == set()
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: WHAT IS SYMMETRIC DIFFERENCE */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">Δ</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Logic of Symmetric Difference (XOR)
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In set theory, <strong className="text-purple-400">Symmetric Difference (A Δ B)</strong> answers the question: <em className="text-white">"Which items exist in exactly ONE of these two sets, but are NOT shared between them?"</em>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6 not-prose">
              {/* Card 1: Math Equation */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-purple-800/60 shadow-lg shadow-purple-950/30 transition-all duration-300 hover:border-purple-500">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-lg mb-2">
                  <span>📐</span> Mathematical Formula
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Mathematically equivalent to subtracting the shared intersection from the full union:
                </p>
                <div className="text-xs font-mono text-purple-300 bg-slate-900 p-2.5 rounded border border-purple-900/50">
                  A ^ B == (A | B) - (A &amp; B) == (A - B) | (B - A)
                </div>
              </div>

              {/* Card 2: State Toggle Pattern */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:border-emerald-500">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg mb-2">
                  <span>💡</span> The State Toggle Pattern
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Writing <code className="text-emerald-300 font-mono">selected ^= {'{item}'}</code> adds <code className="text-white font-mono">item</code> if absent, and deletes it if already present.
                </p>
                <div className="text-xs font-mono text-slate-400">
                  Eliminates verbose <code className="text-slate-300 font-mono">if item in s: s.remove(item) else: s.add(item)</code> branches!
                </div>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-purple-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-2">
                🌟 Crucial Algebraic Properties
              </h3>
              <ul className="text-sm sm:text-base text-slate-300 space-y-1 list-disc list-inside">
                <li><strong className="text-white">Commutative:</strong> <code className="text-purple-300 font-mono">A ^ B == B ^ A</code> (Operand order never matters).</li>
                <li><strong className="text-white">Self-Inversion:</strong> <code className="text-purple-300 font-mono">A ^ A == set()</code> (Any set XORed with itself cancels to empty).</li>
                <li><strong className="text-white">Identity:</strong> <code className="text-purple-300 font-mono">A ^ set() == A</code> (Empty set is identity).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: INTERACTIVE SVG VISUALIZER */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📊</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Symmetric Difference & Delta Auditing
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("xor")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "xor"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                XOR Venn Lobes (A ^ B)
              </button>
              <button
                onClick={() => setActiveTab("audit")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "audit"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Bank Ledger Discrepancy Flow
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeTab === "xor" ? (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="30" fill="#f8fafc" fontSize="15" fontWeight="bold">
                  Symmetric Difference (A ^ B): Highlighting Exclusive Lobes, Excluding Shared Core
                </text>

                {/* Circle A (Left Lobe Highlighted) */}
                <circle cx="340" cy="160" r="110" fill="#9333ea33" stroke="#a855f7" strokeWidth="2.5" />

                {/* Circle B (Right Lobe Highlighted) */}
                <circle cx="510" cy="160" r="110" fill="#9333ea33" stroke="#a855f7" strokeWidth="2.5" />

                {/* Dark Center Cutout representing Intersection (Excluded from XOR) */}
                <ellipse cx="425" cy="160" rx="45" ry="80" fill="#020617" stroke="#334155" strokeWidth="1.5" />

                {/* Left Lobe Elements (Kept) */}
                <text x="270" y="150" fill="#f5d0fe" fontSize="13" fontWeight="bold">"Susmita"</text>
                <text x="260" y="175" fill="#a855f7" fontSize="11">✓ KEPT (Only A)</text>

                {/* Intersection Elements (Excluded) */}
                <text x="395" y="145" fill="#64748b" fontSize="11" textDecoration="line-through">"Mamata"</text>
                <text x="390" y="170" fill="#64748b" fontSize="11" textDecoration="line-through">"Debangshu"</text>
                <text x="395" y="195" fill="#ef4444" fontSize="10">❌ EXCLUDED</text>

                {/* Right Lobe Elements (Kept) */}
                <text x="550" y="150" fill="#f5d0fe" fontSize="13" fontWeight="bold">"Rohan"</text>
                <text x="545" y="175" fill="#a855f7" fontSize="11">✓ KEPT (Only B)</text>

                {/* Circle Headers */}
                <text x="260" y="70" fill="#c084fc" fontSize="13" fontWeight="bold">Set A (Morning Batch)</text>
                <text x="520" y="70" fill="#c084fc" fontSize="13" fontWeight="bold">Set B (Evening Batch)</text>

                {/* Result Bar */}
                <rect x="30" y="275" width="790" height="35" rx="6" fill="#0f172a" stroke="#a855f7" strokeWidth="1" />
                <text x="50" y="297" fill="#f5d0fe" fontSize="12" fontWeight="bold">
                  Result of A ^ B: {'{"Susmita", "Rohan"}'} (Students attending strictly ONE session!)
                </text>
              </svg>
            ) : (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">
                  One-Line Bank Reconciliation: erp_txns ^ bank_txns
                </text>

                {/* Left: ERP Record */}
                <rect x="30" y="65" width="380" height="190" rx="8" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="50" y="95" fill="#38bdf8" fontSize="14" fontWeight="bold">Internal ERP System (Barrackpore)</text>
                <text x="50" y="125" fill="#cbd5e1" fontSize="11">• TXN-801 (Cleared)</text>
                <text x="50" y="145" fill="#cbd5e1" fontSize="11">• TXN-802 (Cleared)</text>
                <text x="50" y="170" fill="#fbbf24" fontSize="12" fontWeight="bold">• TXN-803 (Un-cleared in Bank: ₹4,500)</text>

                {/* Right: Bank Record */}
                <rect x="440" y="65" width="380" height="190" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <text x="460" y="95" fill="#34d399" fontSize="14" fontWeight="bold">Bank Statement (SBI Barrackpore)</text>
                <text x="460" y="125" fill="#cbd5e1" fontSize="11">• TXN-801 (Cleared)</text>
                <text x="460" y="145" fill="#cbd5e1" fontSize="11">• TXN-802 (Cleared)</text>
                <text x="460" y="170" fill="#fbbf24" fontSize="12" fontWeight="bold">• TXN-999 (Unrecorded Deposit: ₹4,500)</text>

                {/* Result Bar */}
                <rect x="30" y="270" width="790" height="40" rx="6" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="50" y="295" fill="#fde68a" fontSize="12" fontWeight="bold">
                  erp ^ bank Discrepancies: {'{"TXN-803", "TXN-999"}'} (Total Anomaly Under Audit: ₹9,000)
                </text>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: CODE LABS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 space-y-8"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Python Code Labs
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab A: Symmetric Difference Basics, Math Equivalence & Commutativity
              </h3>
              <PythonFileLoader
                fileModule={symDiffBasics}
                title="symmetric_difference_basics.py"
                highlightLines={[6, 14, 18, 22, 27]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab B: In-Place Mutation with ^= and Feature Flag Delta Detection
              </h3>
              <PythonFileLoader
                fileModule={symDiffUpdate}
                title="symmetric_difference_update_demo.py"
                highlightLines={[6, 10, 16, 22]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab C: Three-Way Chaining (A ^ B ^ C) & Odd-Multiplicity Inclusion
              </h3>
              <PythonFileLoader
                fileModule={disjointAuditing}
                title="disjoint_exclusive_auditing.py"
                highlightLines={[6, 14, 18]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab D: Real-World Bank Reconciliation & Audit Anomaly in ₹
              </h3>
              <PythonFileLoader
                fileModule={bankRecon}
                title="bank_reconciliation_anomaly.py"
                highlightLines={[6, 15, 24, 32]}
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: REAL-WORLD APPLICATIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏢</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Industry Applications in West Bengal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🏦</span> 1. Automated Bank Reconciliation
              </div>
              <p className="text-sm text-slate-300">
                Auditors in <strong>Barrackpore</strong> execute <code className="font-mono text-purple-400">erp_txns ^ bank_txns</code> to isolate un-cleared checks and unrecorded deposits, balancing books in Indian Rupees (<strong className="text-emerald-300">₹4,500/discrepancy</strong>).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">⚙️</span> 2. DevOps Config Drift Detection
              </div>
              <p className="text-sm text-slate-300">
                Cloud engineers in <strong>Kolkata</strong> compare active server feature flags against staging environments using <code className="font-mono text-emerald-400">prod_flags ^ staging_flags</code> to verify release readiness before zero-downtime deployments.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🔄</span> 3. Bi-Directional Database Sync
              </div>
              <p className="text-sm text-slate-300">
                Mobile apps syncing offline SQLite caches with cloud PostgreSQL backends compute <code className="font-mono text-sky-400">local_ids ^ cloud_ids</code> in <strong>Ichapur</strong> to push and pull modified records.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🔘</span> 4. Atomic UI Feature Toggling
              </div>
              <p className="text-sm text-slate-300">
                Frontend event listeners in <strong>Jadavpur</strong> toggle multi-select filter tags using <code className="font-mono text-amber-400">active_filters ^= {'{tag_id}'}</code>, flipping active state in 1 clean line.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: COMMON PITFALLS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Pitfalls & Tricky Gotchas in Symmetric Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 1: Multi-Arguments in Method
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Calling <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">A.symmetric_difference(B, C)</code> raises <code className="text-rose-400 font-bold">TypeError</code>. Chain with operator <code className="font-mono text-emerald-400">A ^ B ^ C</code> instead.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 2: Reassigning to ^=
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">s = s.symmetric_difference_update(other)</code> destroys <code className="font-mono text-white">s</code> by setting it to <code className="font-mono text-rose-400">None</code>!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 3: Assuming 3-Way XOR is Strictly 1-Set
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="font-mono">A ^ B ^ C</code> includes elements present in <strong className="text-white">all 3 sets</strong> (odd count). To strictly get 1-set items, unite pairwise differences.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 4: Type Errors with Lists
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">my_set ^ [1, 2]</code> fails with <code className="text-rose-400 font-bold">TypeError</code>. Use <code className="font-mono text-emerald-400">my_set.symmetric_difference([1, 2])</code>!
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: PRINTABLE STUDY NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 11: Symmetric Difference Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Printable Study Note"
            downloadFileName="topic11_symmetric_difference_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS (30 COMPREHENSIVE QUESTIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Topic 11 • Symmetric Difference: Master Viva & Review Questions"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note="Teacher's XOR Maxim: Symmetric Difference is the ultimate discrepancy detector. Whenever Susmita in Barrackpore wants to reconcile banking spreadsheets with internal course fee records, A ^ B will instantly expose every un-cleared transaction and unrecorded deposit. And for frontend developers, s ^= {tag} is the cleanest, branch-free toggle trick in Python!"
          />
        </section>

      </div>
    </div>
  );
}
