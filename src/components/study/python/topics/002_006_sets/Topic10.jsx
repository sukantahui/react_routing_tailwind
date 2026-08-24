import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import unionDeepDive from "./topic10_files/union_deep_dive.py?raw";
import intersectionDeepDive from "./topic10_files/intersection_deep_dive.py?raw";
import differenceDeepDive from "./topic10_files/difference_deep_dive.py?raw";
import crossCohortAnalytics from "./topic10_files/cross_cohort_analytics.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic10_files/topic10_note.txt?raw";

// FAQ Questions
import questions from "./topic10_files/topic10_questions";

/**
 * Topic10: Union, Intersection, Difference Deep Dive
 * Module: 002_006_sets
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * In-depth mastery of the core set algebraic triad: Union (| / union),
 * Intersection (& / intersection), and Difference (- / difference),
 * in-place mutations (|=, &=, -=), algorithmic complexities, and HR skill matching.
 */
export default function Topic10() {
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("triad");

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
            Topic 10
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            The Core Set Triad
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Union, Intersection & Difference
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Deep dive into the fundamental triad of set algebra: aggregating data with <code className="text-emerald-400 font-mono">|</code>, finding mutual criteria with <code className="text-sky-400 font-mono">&amp;</code>, and isolating missing attributes with <code className="text-rose-400 font-mono">-</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ∪ Union (A | B)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ∩ Intersection (A &amp; B)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ∖ Difference (A - B)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ In-Place Mutations (|=, &amp;=, -=)
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE CORE TRIAD BREAKDOWN */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧩</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Three Fundamental Set Operations
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In production Python systems, Union, Intersection, and Difference solve 90% of data aggregation and filtering challenges:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Card 1: Union */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:border-emerald-500">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg mb-2">
                  <span>∪</span> 1. Union: A | B
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Aggregates all unique items across sets.
                </p>
                <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-2 rounded">
                  Time: O(len(A) + len(B))
                </div>
              </div>

              {/* Card 2: Intersection */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-sky-800/60 shadow-lg shadow-sky-950/30 transition-all duration-300 hover:border-sky-500">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-lg mb-2">
                  <span>∩</span> 2. Intersection: A &amp; B
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Filters elements present in ALL input sets.
                </p>
                <div className="text-xs font-mono text-sky-300 bg-slate-900 p-2 rounded">
                  Time: O(min(len(A), len(B)))
                </div>
              </div>

              {/* Card 3: Difference */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-rose-800/60 shadow-lg shadow-rose-950/30 transition-all duration-300 hover:border-rose-500">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-lg mb-2">
                  <span>∖</span> 3. Difference: A - B
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Subtracts members of B from A (Non-commutative!).
                </p>
                <div className="text-xs font-mono text-rose-300 bg-slate-900 p-2 rounded">
                  Time: O(len(A))
                </div>
              </div>
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
              <span className="text-3xl">🔬</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Memory Operations & In-Place Mutations
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("triad")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "triad"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                The Triad Flows
              </button>
              <button
                onClick={() => setActiveTab("inplace")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "inplace"
                    ? "bg-sky-900/50 text-sky-300 border border-sky-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                In-Place Mutations (|=, &amp;=, -=)
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeTab === "triad" ? (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">
                  Memory Flow: A = {'{"Python", "React"}'} | B = {'{"React", "Docker"}'}
                </text>

                {/* Operation 1: Union */}
                <rect x="30" y="65" width="250" height="220" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <text x="45" y="95" fill="#34d399" fontSize="14" fontWeight="bold">1. UNION (A | B)</text>
                <text x="45" y="125" fill="#cbd5e1" fontSize="11">Merges all unique keys:</text>
                <rect x="45" y="140" width="220" height="40" rx="6" fill="#064e3b" stroke="#10b981" />
                <text x="55" y="165" fill="#a7f3d0" fontSize="11" fontWeight="bold">{'{"Python", "React", "Docker"}'}</text>
                <text x="45" y="210" fill="#94a3b8" fontSize="11">• Combines both pools.</text>
                <text x="45" y="235" fill="#94a3b8" fontSize="11">• Eliminates duplicate "React".</text>
                <text x="45" y="260" fill="#34d399" fontSize="11" fontWeight="bold">Result Count: 3 items</text>

                {/* Operation 2: Intersection */}
                <rect x="300" y="65" width="250" height="220" rx="8" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="315" y="95" fill="#38bdf8" fontSize="14" fontWeight="bold">2. INTERSECTION (A &amp; B)</text>
                <text x="315" y="125" fill="#cbd5e1" fontSize="11">Extracts shared keys:</text>
                <rect x="315" y="140" width="220" height="40" rx="6" fill="#0c4a6e" stroke="#0ea5e9" />
                <text x="365" y="165" fill="#bae6fd" fontSize="12" fontWeight="bold">{'{"React"}'}</text>
                <text x="315" y="210" fill="#94a3b8" fontSize="11">• Loops over smaller set B.</text>
                <text x="315" y="235" fill="#94a3b8" fontSize="11">• Checks A bucket in O(1).</text>
                <text x="315" y="260" fill="#38bdf8" fontSize="11" fontWeight="bold">Result Count: 1 item</text>

                {/* Operation 3: Difference */}
                <rect x="570" y="65" width="250" height="220" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="585" y="95" fill="#fca5a5" fontSize="14" fontWeight="bold">3. DIFFERENCE (A - B)</text>
                <text x="585" y="125" fill="#cbd5e1" fontSize="11">Subtracts B from A:</text>
                <rect x="585" y="140" width="220" height="40" rx="6" fill="#450a0a" stroke="#f43f5e" />
                <text x="635" y="165" fill="#fecaca" fontSize="12" fontWeight="bold">{'{"Python"}'}</text>
                <text x="585" y="210" fill="#94a3b8" fontSize="11">• Keeps A items not in B.</text>
                <text x="585" y="235" fill="#94a3b8" fontSize="11">• B - A would give {'{"Docker"}'}.</text>
                <text x="585" y="260" fill="#fca5a5" fontSize="11" fontWeight="bold">Result Count: 1 item</text>
              </svg>
            ) : (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">In-Place Augmented Mutations (Zero New Object Allocation)</text>

                {/* Left: |= */}
                <rect x="30" y="65" width="250" height="220" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <text x="45" y="95" fill="#34d399" fontSize="14" fontWeight="bold">A |= B (update)</text>
                <text x="45" y="125" fill="#cbd5e1" fontSize="11">• Mutates Set A directly.</text>
                <text x="45" y="150" fill="#cbd5e1" fontSize="11">• Adds new buckets from B.</text>
                <text x="45" y="175" fill="#cbd5e1" fontSize="11">• Returns None.</text>
                <rect x="45" y="200" width="220" height="40" rx="4" fill="#064e3b" stroke="#10b981" />
                <text x="55" y="225" fill="#a7f3d0" fontSize="11" fontWeight="bold">A becomes A ∪ B</text>

                {/* Middle: &= */}
                <rect x="300" y="65" width="250" height="220" rx="8" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="315" y="95" fill="#38bdf8" fontSize="14" fontWeight="bold">A &amp;= B (intersect_update)</text>
                <text x="315" y="125" fill="#cbd5e1" fontSize="11">• Mutates Set A directly.</text>
                <text x="315" y="150" fill="#cbd5e1" fontSize="11">• Deletes items absent in B.</text>
                <text x="315" y="175" fill="#cbd5e1" fontSize="11">• Returns None.</text>
                <rect x="315" y="200" width="220" height="40" rx="4" fill="#0c4a6e" stroke="#0ea5e9" />
                <text x="325" y="225" fill="#bae6fd" fontSize="11" fontWeight="bold">A becomes A ∩ B</text>

                {/* Right: -= */}
                <rect x="570" y="65" width="250" height="220" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="585" y="95" fill="#fca5a5" fontSize="14" fontWeight="bold">A -= B (diff_update)</text>
                <text x="585" y="125" fill="#cbd5e1" fontSize="11">• Mutates Set A directly.</text>
                <text x="585" y="150" fill="#cbd5e1" fontSize="11">• Deletes items present in B.</text>
                <text x="585" y="175" fill="#cbd5e1" fontSize="11">• Returns None.</text>
                <rect x="585" y="200" width="220" height="40" rx="4" fill="#450a0a" stroke="#f43f5e" />
                <text x="595" y="225" fill="#fecaca" fontSize="11" fontWeight="bold">A becomes A ∖ B</text>
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
                Lab A: Union Deep Dive: Operators, Multi-Args & In-Place |=
              </h3>
              <PythonFileLoader
                fileModule={unionDeepDive}
                title="union_deep_dive.py"
                highlightLines={[6, 12, 16, 23]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab B: Intersection Deep Dive: Candidate Skill Matching & &=
              </h3>
              <PythonFileLoader
                fileModule={intersectionDeepDive}
                title="intersection_deep_dive.py"
                highlightLines={[6, 14, 21, 26]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab C: Difference Deep Dive: Missing Skills Analysis & -=
              </h3>
              <PythonFileLoader
                fileModule={differenceDeepDive}
                title="difference_deep_dive.py"
                highlightLines={[6, 11, 15, 24]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab D: Real-World Cross-Cohort Accounting & Combo Discounts in ₹
              </h3>
              <PythonFileLoader
                fileModule={crossCohortAnalytics}
                title="cross_cohort_analytics.py"
                highlightLines={[6, 13, 17, 21, 29]}
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
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">💼</span> 1. Automated Job Skill Matching
              </div>
              <p className="text-sm text-slate-300">
                Recruitment portals in <strong>Kolkata</strong> evaluate applicant profiles against tech criteria using <code className="font-mono text-emerald-400">matched = job_req &amp; candidate_skills</code>, ranking candidates by percentage fit.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🎓</span> 2. Student Combo Discount Ledger
              </div>
              <p className="text-sm text-slate-300">
                Accounts departments in <strong>Barrackpore</strong> calculate combo fee discounts (<strong className="text-emerald-300">₹1,000 combo rebate</strong>) for dual-enrolled students identified via <code className="font-mono text-sky-400">python_batch &amp; react_batch</code>.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">📧</span> 3. Marketing Campaign Exclusions
              </div>
              <p className="text-sm text-slate-300">
                Email engines dispatch promotional newsletters to non-buyers using <code className="font-mono text-purple-400">targets = all_subscribers - active_customers</code> in <strong>Ichapur</strong>.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🔒</span> 4. Security Scope Invalidation
              </div>
              <p className="text-sm text-slate-300">
                Auth engines invalidate compromised privileges using in-place difference <code className="font-mono text-amber-400">user_perms -= blacklisted_scopes</code> in <strong>Jadavpur</strong> microservices.
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
              5. Pitfalls & Tricky Gotchas in the Set Triad
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 1: Difference Direction Trap
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Remember that <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">A - B</code> is <strong className="text-white">NOT</strong> <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">B - A</code>! Subtracting in the wrong order inverts your filtered output completely.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 2: Reassigning to Mutating Variants
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">A = A.intersection_update(B)</code> destroys <code className="font-mono text-white">A</code> by assigning <code className="font-mono text-rose-400">None</code> to it!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 3: TypeError on Non-Set Operands
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">A &amp; ['Python']</code> crashes with TypeError. Use <code className="font-mono text-emerald-400">A.intersection(['Python'])</code> when handling non-set containers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 4: Operator Precedence Misunderstanding
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="font-mono">&amp;</code> evaluates before <code className="font-mono">|</code> and <code className="font-mono">-</code>. Always wrap expressions in parentheses <code className="font-mono text-emerald-400">(A | B) - C</code> for explicit logic.
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
            title="Topic 10: Union, Intersection, Difference Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Printable Study Note"
            downloadFileName="topic10_union_intersection_difference_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS (30 COMPREHENSIVE QUESTIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Topic 10 • Union, Intersection, Difference: Master Viva & Review Questions"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note="Teacher's Algebraic Insight: Master the triad! Use Union (|) when you want to bring everyone together into a single cohort. Use Intersection (&) when Susmita and Debangshu need to find common skill matches for tech placements in Kolkata. And use Difference (-) whenever you need to find who hasn't paid their course fees or what mandatory fields were missed in a form submission. These three tools will make your backend logic unbreakable!"
          />
        </section>

      </div>
    </div>
  );
}
