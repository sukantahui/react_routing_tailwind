import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – Comprehensive Example: Employee Skills and Spoken Languages (EmpID ->> Skill, EmpID ->> Language)
 * Module: 006_006_fourth-normal-form-4nf
 *
 * @component
 * @returns {JSX.Element} Rich interactive tutorial component.
 */
const Topic4 = () => {
  const [selectedTab, setSelectedTab] = useState("tab1");
  const [copiedCode, setCopiedCode] = useState(false);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <>
      <style>{`
        .reveal-section {
          opacity: 0.99;
          transform: translateY(0);
          transition: opacity 0.4s ease-out, transform 0.4s ease-out;
        }
        .reveal-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-teal-500/30 selection:text-teal-200">
        {/* ─── Header ─────────────────────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/70 border border-teal-700/60 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg">
            <span>📐</span>
            <span>Relational Normalization Masterclass · Topic 4</span>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-4">
            Comprehensive Example: Employee Skills and Spoken Languages (EmpID {"->>"} Skill, EmpID {"->>"} Language)
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Explore Fourth Normal Form (4NF). Learn the nature of multivalued dependencies (MVD), how multiple independent 1-to-many relationships cause Cartesian explosion in a single table, and how to decompose into 4NF.
          </p>
        </header>

        {/* ─── Architectural Pillars ──────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-teal-400">🏛️</span> Core Architectural Pillars
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-base font-bold text-teal-300 mb-2">Single Source of Truth</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every business attribute is stored in exactly one relation, preventing desynchronization bugs.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-teal-400">Zero Redundancy</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="text-base font-bold text-teal-300 mb-2">Formal Invariants</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Strict adherence to functional and relational dependencies eliminates modification anomalies.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-teal-400">Mathematically Proven</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="text-base font-bold text-teal-300 mb-2">Lossless Join Property</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Natural joins of decomposed tables reconstruct the original relation with zero spurious records.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-teal-400">Non-Loss Certified</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300">
              <div className="text-2xl mb-2">🚀</div>
              <h3 className="text-base font-bold text-teal-300 mb-2">High-Throughput OLTP</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Compact normalized tables optimize InnoDB buffer pool utilization and minimize row-level lock conflicts.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-teal-400">Production Tested</div>
            </div>
          </div>
        </section>

        {/* ─── Interactive Normalization Simulator ────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">⚡</span> Interactive Relational Transformation Simulator
          </h2>
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-2xl">
            {/* Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/60 overflow-x-auto">
              <button
                onClick={() => setSelectedTab("tab1")}
                className={clsx(
                  "px-4 py-3.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border-b-2 flex items-center gap-2",
                  selectedTab === "tab1" ? "border-rose-400 text-rose-300 bg-slate-900" : "border-transparent text-slate-400 hover:text-slate-200"
                )}
              >
                <span>🚫</span>
                <span>MULTIVALUED DEPENDENCY</span>
              </button>

              <button
                onClick={() => setSelectedTab("tab2")}
                className={clsx(
                  "px-4 py-3.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border-b-2 flex items-center gap-2",
                  selectedTab === "tab2" ? "border-amber-400 text-amber-300 bg-slate-900" : "border-transparent text-slate-400 hover:text-slate-200"
                )}
              >
                <span>⚠️</span>
                <span>CARTESIAN EXPLOSION</span>
              </button>

              <button
                onClick={() => setSelectedTab("tab3")}
                className={clsx(
                  "px-4 py-3.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border-b-2 flex items-center gap-2",
                  selectedTab === "tab3" ? "border-teal-400 text-teal-300 bg-slate-900" : "border-transparent text-slate-400 hover:text-slate-200"
                )}
              >
                <span>🔍</span>
                <span>MVD INFERENCE</span>
              </button>

              <button
                onClick={() => setSelectedTab("tab4")}
                className={clsx(
                  "px-4 py-3.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border-b-2 flex items-center gap-2",
                  selectedTab === "tab4" ? "border-emerald-400 text-emerald-300 bg-slate-900" : "border-transparent text-slate-400 hover:text-slate-200"
                )}
              >
                <span>✅</span>
                <span>4NF NORMALIZED</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <span className={clsx(
                    "px-2.5 py-1 rounded text-xs font-mono font-bold border",
                    selectedTab === "tab4" ? "bg-emerald-950/80 text-emerald-300 border-emerald-800" : "bg-rose-950/80 text-rose-300 border-rose-800"
                  )}>
                    {selectedTab === "tab1" ? conf.badge1 : selectedTab === "tab2" ? conf.badge2 : selectedTab === "tab3" ? conf.badge3 : conf.badge4}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-2">
                    {selectedTab === "tab1" ? conf.title1 : selectedTab === "tab2" ? conf.title2 : selectedTab === "tab3" ? conf.title3 : conf.title4}
                  </h3>
                </div>

                <button
                  onClick={() => handleCopy(selectedTab === "tab4" ? conf.sql4 : conf.sql1)}
                  className="px-3 py-1.5 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                >
                  {copiedCode ? "✓ SQL Copied" : "📋 Copy SQL Code"}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs sm:text-sm space-y-2">
                <p className="text-slate-300">
                  <strong className="text-teal-300">Scenario Problem:</strong> {selectedTab === "tab1" ? conf.prob1 : selectedTab === "tab2" ? conf.prob2 : selectedTab === "tab3" ? conf.prob3 : conf.prob4}
                </p>
                <p className="text-slate-400">
                  <strong className="text-amber-300">Relational Mechanics:</strong> {selectedTab === "tab1" ? conf.cause1 : selectedTab === "tab2" ? conf.cause2 : selectedTab === "tab3" ? conf.cause3 : conf.cause4}
                </p>
              </div>

              {/* Data Table */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Relation State Matrix ({selectedTab === "tab4" ? "Normalized 3NF / Target State" : "Unnormalized / Violation State"})
                </h4>
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-900 border-b border-slate-800 text-slate-300">
                      <tr>
                        <th className="p-3">emp_id (PK)</th>
                        <th className="p-3">emp_name</th>
                        <th className="p-3">skill (MVD 1)</th>
                        <th className="p-3">language (MVD 2)</th>
                        <th className="p-3">Row Multiplier</th>
                        <th className="p-3">4NF Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {(selectedTab === "tab4" ? conf.rows4 : conf.rows1).map((r, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/40">
                          <td className="p-3 font-semibold text-teal-400">{r.c1}</td>
                          <td className="p-3">{r.c2}</td>
                          <td className="p-3">{r.c3}</td>
                          <td className="p-3 text-amber-400 font-semibold">{r.c4}</td>
                          <td className="p-3">{r.c5}</td>
                          <td className="p-3 text-emerald-400 font-bold">{r.c6}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SQL Code */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Executable SQL Architecture & Schema Transformation
                </h4>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                  {selectedTab === "tab4" ? conf.sql4 : conf.sql1}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Real-World West Bengal Case Studies ────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-amber-400">🏢</span> Real-World Engineering Scenarios (West Bengal Context)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/60 text-amber-300">
                    BARRACKPORE E-COMMERCE
                  </span>
                  <span className="text-xs text-slate-400">Barrackpore Hub</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Inventory Ledger Normalization</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Susmita refactored an online grocery order pipeline handling ₹25 Lakh daily turnover in Barrackpore.
                  Decomposing order lines and snapshotting historical item purchase prices eliminated billing discrepancies across cash registers.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                100% Audit Reconciliation Maintained
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-teal-950/60 border border-teal-800/60 text-teal-300">
                    SALT LAKE FINTECH
                  </span>
                  <span className="text-xs text-slate-400">Sector V, Kolkata</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">High-Throughput Ledger Architecture</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Debangshu normalized a multi-currency payment ledger supporting 10,000 requests/sec.
                  Isolating customer identity from transaction lines prevented database lock contention during concurrent UPI transfers.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300">
                Sub-3ms P99 Transaction Latency
              </div>
            </div>
          </div>
        </section>

        {/* ─── Senior Pitfalls & Best Practices ──────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-rose-400">🛡️</span> Senior Pitfalls & Production Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-4">
              <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Common Pitfalls & Antipatterns
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Incomplete Candidate Key Evaluation:</strong>
                Failing to test functional dependencies against all candidate keys leaves hidden anomalies in production.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Premature Denormalization:</strong>
                Duplicating columns before observing concrete query bottleneck metrics causes desynchronization and phantom updates.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>✓</span> Production Best Practices
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Default to 3NF/BCNF for All OLTP Tables:</strong>
                Enforce clean relational boundaries first; leverage Redis or Read Replicas for high-volume read acceleration.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Strict Declarative Foreign Keys:</strong>
                Always declare explicit foreign key constraints with appropriate ON DELETE RESTRICT rules to protect relational integrity.
              </div>
            </div>
          </div>
        </section>

        {/* ─── Printable Study Note ──────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <PlainTextPrint
            content={noteText}
            title="Comprehensive Example: Employee Skills and Spoken Languages (EmpID ->> Skill, EmpID ->> Language)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Plain Text Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

        {/* ─── Teacher's Master Note ─────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "In my classes at Barrackpore and Kolkata, I remind engineers that database design is mathematics in action. " +
              "Every table must represent exactly one cohesive business concept. When you master normalization, your application " +
              "code becomes simpler, bugs disappear, and your system scales effortlessly across millions of transactions!"
            }
          />
        </section>

        {/* ─── FAQ & Practice Questions ───────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Comprehensive Example: Employee Skills and Spoken Languages (EmpID ->> Skill, EmpID ->> Language) – Practice Questions"
            questions={questions}
            subtitle="Test your comprehension with 30 deep-dive questions"
            showPrint
            showExpandAll
            showSearch
            showProgress
          />
        </section>

        {/* ─── Footer ─────────────────────────────────────────── */}
        <footer className="max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>
            Topic 4 · Comprehensive Example: Employee Skills and Spoken Languages (EmpID {"->>"} Skill, EmpID {"->>"} Language) · RDBMS MySQL Masterclass · Coder &amp; AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic4;
