import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import vennOverview from "./topic9_files/venn_diagram_overview.py?raw";
import methodsVsOperators from "./topic9_files/methods_vs_operators_rules.py?raw";
import multiChaining from "./topic9_files/multi_set_chaining.py?raw";
import communityStats from "./topic9_files/community_membership_stats.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic9_files/topic9_note.txt?raw";

// FAQ Questions
import questions from "./topic9_files/topic9_questions";

/**
 * Topic9: Mathematical Set Operations Overview
 * Module: 002_006_sets
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Comprehensive foundation to set algebra in Python: Union (|),
 * Intersection (&), Difference (-), Symmetric Difference (^),
 * strict operator type rules vs polymorphic methods, and in-place mutating variants.
 */
export default function Topic9() {
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("union");

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
            Topic 9
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Set Algebra & Venn Logic
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Mathematical Set Operations Overview
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Mastering discrete mathematics set algebra in Python: Union (<code className="text-emerald-400 font-mono">|</code>), Intersection (<code className="text-sky-400 font-mono">&amp;</code>), Difference (<code className="text-rose-400 font-mono">-</code>), and Symmetric Difference (<code className="text-purple-400 font-mono">^</code>).
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ∪ Union (|)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ∩ Intersection (&amp;)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ∖ Difference (-)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            Δ Symmetric Difference (^)
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE 4 PILLARS OF SET ALGEBRA */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📐</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The 4 Fundamental Mathematical Operations
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Python sets directly implement standard mathematical set theory. Every operation can be executed either with a <strong className="text-emerald-400">concise algebraic operator</strong> or a <strong className="text-sky-400">flexible built-in method</strong>:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
              {/* Card 1: Union */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:border-emerald-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
                    <span>∪</span> Union: A | B
                  </div>
                  <span className="text-xs font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                    A.union(B)
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Combines all elements from both sets. Eliminates duplicates automatically.
                </p>
                <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-2 rounded">
                  {'{1, 2} | {2, 3}'} -&gt; {'{1, 2, 3}'}
                </div>
              </div>

              {/* Card 2: Intersection */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-sky-800/60 shadow-lg shadow-sky-950/30 transition-all duration-300 hover:border-sky-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-lg">
                    <span>∩</span> Intersection: A &amp; B
                  </div>
                  <span className="text-xs font-mono bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">
                    A.intersection(B)
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Extracts only the common elements present in BOTH sets simultaneously.
                </p>
                <div className="text-xs font-mono text-sky-300 bg-slate-900 p-2 rounded">
                  {'{1, 2} & {2, 3}'} -&gt; {'{2}'}
                </div>
              </div>

              {/* Card 3: Difference */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-rose-800/60 shadow-lg shadow-rose-950/30 transition-all duration-300 hover:border-rose-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-lg">
                    <span>∖</span> Difference: A - B
                  </div>
                  <span className="text-xs font-mono bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800">
                    A.difference(B)
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Subtracts all elements of B from A (Relative Complement).
                </p>
                <div className="text-xs font-mono text-rose-300 bg-slate-900 p-2 rounded">
                  {'{1, 2, 3} - {2, 3}'} -&gt; {'{1}'}
                </div>
              </div>

              {/* Card 4: Symmetric Difference */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-purple-800/60 shadow-lg shadow-purple-950/30 transition-all duration-300 hover:border-purple-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-lg">
                    <span>Δ</span> Sym Diff: A ^ B
                  </div>
                  <span className="text-xs font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800">
                    A.sym_diff(B)
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Retains elements present in either A or B, but NOT in both!
                </p>
                <div className="text-xs font-mono text-purple-300 bg-slate-900 p-2 rounded">
                  {'{1, 2} ^ {2, 3}'} -&gt; {'{1, 3}'}
                </div>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-amber-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-2">
                ⚖️ Operators vs Methods: The Universal Typing Rule
              </h3>
              <p className="text-sm sm:text-base text-slate-300">
                <strong className="text-white">Operators (<code className="text-amber-300 font-mono">|, &amp;, -, ^</code>)</strong> strictly enforce type matching and require both operands to be set instances. <strong className="text-white">Methods (<code className="text-sky-300 font-mono">.union(), .intersection()</code>)</strong> are polymorphic and accept any iterable (lists, tuples, ranges, generators).
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: INTERACTIVE SVG VENN DIAGRAM VISUALIZER */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📊</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Interactive Venn Diagram Explorer
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex flex-wrap bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold gap-1">
              <button
                onClick={() => setActiveTab("union")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "union"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Union (A | B)
              </button>
              <button
                onClick={() => setActiveTab("intersection")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "intersection"
                    ? "bg-sky-900/50 text-sky-300 border border-sky-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Intersection (A &amp; B)
              </button>
              <button
                onClick={() => setActiveTab("difference")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "difference"
                    ? "bg-rose-900/50 text-rose-300 border border-rose-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Difference (A - B)
              </button>
              <button
                onClick={() => setActiveTab("symdiff")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "symdiff"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Sym Diff (A ^ B)
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
              <text x="30" y="30" fill="#f8fafc" fontSize="15" fontWeight="bold">
                Cohort A: Python Pro (Barrackpore) vs Cohort B: Cloud Architecture (Kolkata)
              </text>

              {/* Set Circles */}
              {/* Circle A */}
              <circle
                cx="340"
                cy="160"
                r="110"
                fill={
                  activeTab === "union" || activeTab === "difference" || activeTab === "symdiff"
                    ? (activeTab === "difference" ? "#e11d4833" : (activeTab === "symdiff" ? "#9333ea33" : "#05966933"))
                    : "#1e293b55"
                }
                stroke={activeTab === "difference" ? "#f43f5e" : (activeTab === "symdiff" ? "#a855f7" : "#10b981")}
                strokeWidth="2.5"
              />

              {/* Circle B */}
              <circle
                cx="510"
                cy="160"
                r="110"
                fill={
                  activeTab === "union" || activeTab === "symdiff"
                    ? (activeTab === "symdiff" ? "#9333ea33" : "#05966933")
                    : "#1e293b55"
                }
                stroke={activeTab === "symdiff" ? "#a855f7" : "#0ea5e9"}
                strokeWidth="2.5"
              />

              {/* Intersection Highlight when active */}
              {activeTab === "intersection" && (
                <ellipse cx="425" cy="160" rx="45" ry="80" fill="#0284c788" stroke="#38bdf8" strokeWidth="2" />
              )}

              {/* Labels inside Circle A only */}
              <text x="270" y="145" fill="#f8fafc" fontSize="12" fontWeight="bold">Susmita</text>
              <text x="260" y="175" fill="#94a3b8" fontSize="11">(Only Python)</text>

              {/* Labels inside Intersection */}
              <text x="400" y="140" fill="#f8fafc" fontSize="12" fontWeight="bold">Mamata</text>
              <text x="390" y="165" fill="#f8fafc" fontSize="12" fontWeight="bold">Debangshu</text>
              <text x="395" y="190" fill="#f8fafc" fontSize="12" fontWeight="bold">Abhronila</text>

              {/* Labels inside Circle B only */}
              <text x="560" y="145" fill="#f8fafc" fontSize="12" fontWeight="bold">Rohan</text>
              <text x="555" y="175" fill="#94a3b8" fontSize="11">(Only Cloud)</text>

              {/* Circle Titles */}
              <text x="260" y="70" fill="#34d399" fontSize="13" fontWeight="bold">Set A (Python Pro)</text>
              <text x="520" y="70" fill="#38bdf8" fontSize="13" fontWeight="bold">Set B (Cloud Architecture)</text>

              {/* Dynamic Result Box at bottom */}
              <rect x="30" y="275" width="790" height="35" rx="6" fill="#0f172a" stroke="#334155" />
              <text x="50" y="297" fill="#38bdf8" fontSize="12" fontWeight="bold">
                {activeTab === "union" && "Union (A | B) Result: 5 Unique Students -> {'Susmita', 'Debangshu', 'Mamata', 'Abhronila', 'Rohan'}"}
                {activeTab === "intersection" && "Intersection (A & B) Result: 3 Dual-Enrolled Students -> {'Mamata', 'Debangshu', 'Abhronila'}"}
                {activeTab === "difference" && "Difference (A - B) Result: 1 Student in Python only -> {'Susmita'}"}
                {activeTab === "symdiff" && "Symmetric Diff (A ^ B) Result: 2 Students in exactly 1 course -> {'Susmita', 'Rohan'}"}
              </text>
            </svg>
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
                Lab A: The 4 Core Operations in Action
              </h3>
              <PythonFileLoader
                fileModule={vennOverview}
                title="venn_diagram_overview.py"
                highlightLines={[6, 14, 18, 22, 26]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab B: Methods (.union) vs Operators (|) Type Enforcement
              </h3>
              <PythonFileLoader
                fileModule={methodsVsOperators}
                title="methods_vs_operators_rules.py"
                highlightLines={[6, 13, 19]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab C: Multi-Set Chaining Across Multiple Center Cohorts
              </h3>
              <PythonFileLoader
                fileModule={multiChaining}
                title="multi_set_chaining.py"
                highlightLines={[6, 12, 16, 20]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab D: Real-World Student Community Overlap & Revenue in ₹
              </h3>
              <PythonFileLoader
                fileModule={communityStats}
                title="community_membership_stats.py"
                highlightLines={[6, 14, 21]}
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
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Real-World Applications in West Bengal Industry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">💰</span> 1. Course Enrollment Overlap & Fee Audit
              </div>
              <p className="text-sm text-slate-300">
                Coaching institutes in <strong>Barrackpore</strong> calculate aggregate revenue by separating dual-enrolled students (<code className="font-mono text-emerald-400">A &amp; B</code>) from single-course students (<code className="font-mono text-emerald-400">A ^ B</code>) in Indian Rupees (<strong className="text-emerald-300">₹4,500 + ₹6,500</strong>).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">👥</span> 2. Multi-Branch Lead Deduplication
              </div>
              <p className="text-sm text-slate-300">
                Marketing teams in <strong>Kolkata</strong> and <strong>Ichapur</strong> merge customer lead lists using <code className="font-mono text-sky-400">leads_all = leads_wb | leads_online</code>, avoiding duplicate email campaigns.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🔐</span> 3. RBAC Effective Permission Resolution
              </div>
              <p className="text-sm text-slate-300">
                Security middlewares resolve user access by evaluating <code className="font-mono text-purple-400">effective_perms = (role_perms | user_perms) - revoked_perms</code> in instant O(1) steps per check.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🔍</span> 4. Missing JSON Schema Field Detection
              </div>
              <p className="text-sm text-slate-300">
                REST API input validators detect missing mandatory payload parameters using <code className="font-mono text-amber-400">missing = required_fields - set(payload.keys())</code> in <strong>Jadavpur</strong> microservices.
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
              5. Pitfalls & Tricky Gotchas in Set Algebra
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 1: Passing Lists to Operators
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">my_set | [1, 2]</code> fails with <code className="text-rose-400 font-bold">TypeError</code>. Use <code className="font-mono text-emerald-400">my_set.union([1, 2])</code> or convert with <code className="font-mono text-emerald-400">set([1, 2])</code>!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 2: Confusing A - B with B - A
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Set difference is <strong className="text-rose-400">non-commutative</strong>! <code className="font-mono">{'{1, 2} - {2, 3}'}</code> gives <code className="font-mono">{'{1}'}</code>, while <code className="font-mono">{'{2, 3} - {1, 2}'}</code> gives <code className="font-mono">{'{3}'}</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 3: Multi-Args in sym_diff()
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">s.sym_diff(s1, s2)</code> raises <code className="text-rose-400 font-bold">TypeError</code> (takes 1 arg only). Chain with operators: <code className="font-mono text-emerald-400">s ^ s1 ^ s2</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 4: Operator Precedence Surprise
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="font-mono">&amp;</code> binds tighter than <code className="font-mono">|</code> and <code className="font-mono">^</code>. Always use parentheses <code className="font-mono text-emerald-400">(A | B) &amp; C</code> to guarantee intended logic!
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
            title="Topic 9: Mathematical Set Operations Overview Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Printable Study Note"
            downloadFileName="topic9_mathematical_set_operations_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS (30 COMPREHENSIVE QUESTIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Topic 9 • Mathematical Set Operations: Master Viva & Review Questions"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note="Teacher's Algebraic Rule: Mathematical set operations turn complex data filtering queries into single-line masterpieces. Remember: when you write operators like A | B or A & B, Python enforces that both sides are sets. When you use methods like A.union(B), Python is happy to unpack any list, tuple, or database stream you throw at it. Keep your types aligned, and set algebra will do the heavy lifting for you!"
          />
        </section>

      </div>
    </div>
  );
}
