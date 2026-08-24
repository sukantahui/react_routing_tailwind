import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import subsetDemo from "./topic12_files/subset_superset_demo.py?raw";
import properSubsetDemo from "./topic12_files/proper_subset_superset.py?raw";
import isdisjointDemo from "./topic12_files/isdisjoint_performance.py?raw";
import rbacAudit from "./topic12_files/rbac_security_audit.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic12_files/topic12_note.txt?raw";

// FAQ Questions
import questions from "./topic12_files/topic12_questions";

/**
 * Topic12: Set Comparison: Subset, Superset, Disjoint Sets
 * Module: 002_006_sets
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * In-depth guide to relational set logic: subset (<= / issubset),
 * superset (>= / issuperset), strict proper comparisons (< and >),
 * and disjoint set evaluation (isdisjoint) with short-circuit optimization.
 */
export default function Topic12() {
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("containment");

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
            Topic 12
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Relational Set Algebra
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Set Comparisons: Subset, Superset & Disjoint
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Mastering relational set logic: verifying prerequisites with <code className="text-emerald-400 font-mono">&lt;=</code>, asserting capabilities with <code className="text-sky-400 font-mono">&gt;=</code>, and detecting zero-overlap schedules with <code className="text-purple-400 font-mono">isdisjoint()</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⊆ Subset (&lt;= / issubset)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⊇ Superset (&gt;= / issuperset)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⊂ Strict Proper Subset (&lt;)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Short-Circuit isdisjoint()
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: RELATIONAL SET OPERATORS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚖️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. Relational Set Comparisons
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Unlike sequence equality which checks element-by-element order, set comparisons verify <strong className="text-emerald-400">containment hierarchies</strong> and <strong className="text-purple-400">mutual exclusivity</strong>:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
              {/* Card 1: Subset */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:border-emerald-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
                    <span>⊆</span> Subset: A &lt;= B
                  </div>
                  <span className="text-xs font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                    A.issubset(B)
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  True if <strong className="text-white">every element of A exists in B</strong>. Allows A == B.
                </p>
                <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-2 rounded">
                  {'{1, 2} <= {1, 2, 3}'} -&gt; True
                </div>
              </div>

              {/* Card 2: Proper Subset */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-teal-800/60 shadow-lg shadow-teal-950/30 transition-all duration-300 hover:border-teal-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-teal-400 font-bold text-lg">
                    <span>⊂</span> Proper Subset: A &lt; B
                  </div>
                  <span className="text-xs font-mono bg-teal-950 text-teal-300 px-2 py-0.5 rounded border border-teal-800">
                    Operator Only!
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  True if A &lt;= B <strong className="text-white">AND A != B</strong> (A is strictly smaller).
                </p>
                <div className="text-xs font-mono text-teal-300 bg-slate-900 p-2 rounded">
                  {'{1, 2} < {1, 2}'} -&gt; False
                </div>
              </div>

              {/* Card 3: Superset */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-sky-800/60 shadow-lg shadow-sky-950/30 transition-all duration-300 hover:border-sky-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-lg">
                    <span>⊇</span> Superset: A &gt;= B
                  </div>
                  <span className="text-xs font-mono bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">
                    A.issuperset(B)
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  True if <strong className="text-white">A contains every element of B</strong>.
                </p>
                <div className="text-xs font-mono text-sky-300 bg-slate-900 p-2 rounded">
                  {'{1, 2, 3} >= {1, 2}'} -&gt; True
                </div>
              </div>

              {/* Card 4: Disjoint */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-purple-800/60 shadow-lg shadow-purple-950/30 transition-all duration-300 hover:border-purple-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-lg">
                    <span>⚡</span> Disjoint: isdisjoint()
                  </div>
                  <span className="text-xs font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800">
                    Zero Overlap
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  True if sets share <strong className="text-white">ZERO common items</strong> (A ∩ B == ∅).
                </p>
                <div className="text-xs font-mono text-purple-300 bg-slate-900 p-2 rounded">
                  {'{1, 2}.isdisjoint({3, 4})'} -&gt; True
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
                2. Visualizing Containment Hierarchies & Disjoint Testing
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("containment")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "containment"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Subset Containment (A &lt;= B)
              </button>
              <button
                onClick={() => setActiveTab("disjointflow")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "disjointflow"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Disjoint Short-Circuit Flow
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeTab === "containment" ? (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">
                  Subset Containment: Set A (Prerequisites) nested completely inside Set B (Candidate Skills)
                </text>

                {/* Outer Circle B (Superset) */}
                <circle cx="425" cy="170" r="115" fill="#0369a133" stroke="#0ea5e9" strokeWidth="2" />
                <text x="340" y="85" fill="#38bdf8" fontSize="13" fontWeight="bold">Set B: Candidate Skills (Superset)</text>
                <text x="340" y="105" fill="#94a3b8" fontSize="11">{'{"FastAPI", "React", "Docker", ...}'}</text>

                {/* Inner Circle A (Subset) */}
                <circle cx="425" cy="180" r="65" fill="#04785744" stroke="#10b981" strokeWidth="2.5" />
                <text x="365" y="175" fill="#a7f3d0" fontSize="12" fontWeight="bold">Set A: Core Prereqs</text>
                <text x="375" y="195" fill="#ffffff" fontSize="11">{'{"Python", "SQL"}'}</text>

                {/* Outer Skills */}
                <text x="490" y="140" fill="#cbd5e1" fontSize="11">"FastAPI"</text>
                <text x="330" y="210" fill="#cbd5e1" fontSize="11">"Docker"</text>
                <text x="480" y="230" fill="#cbd5e1" fontSize="11">"React"</text>

                {/* Result Box */}
                <rect x="30" y="275" width="790" height="35" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="50" y="297" fill="#34d399" fontSize="12" fontWeight="bold">
                  A &lt;= B is True (A is a subset of B) • A &lt; B is True (A is a strict proper subset) • B &gt;= A is True (B is superset)
                </text>
              </svg>
            ) : (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">
                  Disjoint Set Evaluation: Testing Zero Mutual Overlap
                </text>

                {/* Left Circle A */}
                <circle cx="280" cy="160" r="90" fill="#9333ea22" stroke="#a855f7" strokeWidth="2" />
                <text x="220" y="140" fill="#f5d0fe" fontSize="13" fontWeight="bold">Morning Shift</text>
                <text x="210" y="165" fill="#cbd5e1" fontSize="11">{'{"Susmita", "Mamata"}'}</text>

                {/* Right Circle B */}
                <circle cx="570" cy="160" r="90" fill="#9333ea22" stroke="#a855f7" strokeWidth="2" />
                <text x="520" y="140" fill="#f5d0fe" fontSize="13" fontWeight="bold">Night Shift</text>
                <text x="510" y="165" fill="#cbd5e1" fontSize="11">{'{"Tanmay", "Bikram"}'}</text>

                {/* Middle Gap */}
                <path d="M 380 160 L 470 160" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
                <text x="395" y="150" fill="#34d399" fontSize="11" fontWeight="bold">0 Overlap</text>

                {/* Result Box */}
                <rect x="30" y="275" width="790" height="35" rx="6" fill="#0f172a" stroke="#a855f7" />
                <text x="50" y="297" fill="#f5d0fe" fontSize="12" fontWeight="bold">
                  morning_shift.isdisjoint(night_shift) -&gt; True (Zero scheduling conflict between shifts!)
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
                Lab A: issubset() & issuperset() Prerequisite Readiness Testing
              </h3>
              <PythonFileLoader
                fileModule={subsetDemo}
                title="subset_superset_demo.py"
                highlightLines={[6, 14, 19, 24]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab B: Proper / Strict Subset (&lt;) vs Standard Subset (&lt;=)
              </h3>
              <PythonFileLoader
                fileModule={properSubsetDemo}
                title="proper_subset_superset.py"
                highlightLines={[6, 11, 16, 21]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab C: isdisjoint() Short-Circuit Evaluation & Shift Auditing
              </h3>
              <PythonFileLoader
                fileModule={isdisjointDemo}
                title="isdisjoint_performance.py"
                highlightLines={[6, 12, 16]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab D: Real-World RBAC Access Clearance & Security Audit in ₹
              </h3>
              <PythonFileLoader
                fileModule={rbacAudit}
                title="rbac_security_audit.py"
                highlightLines={[6, 15, 20, 26]}
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
                <span className="text-xl">🔐</span> 1. Enterprise RBAC Access Clearance
              </div>
              <p className="text-sm text-slate-300">
                Security platforms in <strong>Kolkata</strong> verify financial operator roles using <code className="font-mono text-emerald-400">user_perms &gt;= FINANCE_PERMS</code>, while asserting <code className="font-mono text-emerald-400">user_perms.isdisjoint(BANNED_ACTIONS)</code> to prevent privilege escalation.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🎓</span> 2. Student Prerequisite Gateways
              </div>
              <p className="text-sm text-slate-300">
                Academic ERPs in <strong>Barrackpore</strong> check whether candidates have mastered foundational prerequisites (<code className="font-mono text-sky-400">core_prereqs &lt;= student_skills</code>) before unlocking advanced tracks (<strong className="text-emerald-300">₹6,500 Data Science Track</strong>).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🗓️</span> 3. Employee Shift Collision Detection
              </div>
              <p className="text-sm text-slate-300">
                Hospital and institute scheduling engines verify <code className="font-mono text-purple-400">shift_a.isdisjoint(shift_b)</code> in <strong>Ichapur</strong>, guaranteeing zero double-booking staffing errors.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">📋</span> 4. API Request Schema Validation
              </div>
              <p className="text-sm text-slate-300">
                FastAPI microservices in <strong>Jadavpur</strong> validate incoming JSON payloads by checking <code className="font-mono text-amber-400">required_keys &lt;= payload.keys()</code> in O(len(req)) time.
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
              5. Pitfalls & Tricky Gotchas in Set Comparisons
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 1: No Method for Strict Proper Subsets
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Calling <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">s.ispropersubset(other)</code> raises <code className="text-rose-400 font-bold">AttributeError</code>! You must use the <code className="font-mono text-emerald-400">&lt;</code> operator.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 2: Comparing Unrelated Sets
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">{'{1, 2}'} &lt; {'{3, 4}'}</code> returns <strong className="text-rose-400 font-bold">False</strong> because set comparisons test subset containment, not numerical element magnitudes!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 3: TypeError on Lists with Operators
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">s &lt;= [1, 2]</code> fails with TypeError. Use <code className="font-mono text-emerald-400">s.issubset([1, 2])</code> when passing non-set iterables.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 4: Slow bool(A & B) vs isdisjoint()
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">not (A &amp; B)</code> allocates a brand new intersection set. Use <code className="font-mono text-emerald-400">A.isdisjoint(B)</code> for instant short-circuit speed!
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
            title="Topic 12: Set Comparison Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Printable Study Note"
            downloadFileName="topic12_set_comparisons_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS (30 COMPREHENSIVE QUESTIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Topic 12 • Set Comparisons (Subset, Superset, Disjoint): Master Viva & Review Questions"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note="Teacher's Verification Rule: Set comparison methods are your primary defense when writing robust security authorization and prerequisite engines. Remember: required <= user_perms tests access in O(len(req)), and isdisjoint() guarantees zero privilege escalation with short-circuiting speed. Keep your permission matrices clean and your code will stay bulletproof!"
          />
        </section>

      </div>
    </div>
  );
}
