import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import activeUsers from "./topic18_files/unique_active_users_tracker.py?raw";
import tagEngine from "./topic18_files/tag_filtering_engine.py?raw";
import rbacGuard from "./topic18_files/enterprise_rbac_guard.py?raw";
import socialGraph from "./topic18_files/social_graph_recommendations.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic18_files/topic18_note.txt?raw";

// FAQ Questions
import questions from "./topic18_files/topic18_questions";

/**
 * Topic18: Real-World Use Cases (Unique Users, Tags, Permissions)
 * Module: 002_006_sets
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Capstone exploration of Python sets in industrial production systems:
 * Unique Active Users (DAU), E-Commerce Multi-Tag Search,
 * Enterprise RBAC Access Control, and Social Graph Friend Recommendations.
 */
export default function Topic18() {
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("architectures");

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
            Topic 18
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Industrial Systems Capstone
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Real-World Use Cases: Unique Users, Tags &amp; Permissions
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          The ultimate capstone of Python set theory: deploying sets across 4 production pillars—DAU metrics, multi-tag e-commerce filtering, enterprise RBAC authorization, and social graph recommendation engines.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            👥 Daily Active Users (DAU)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏷️ Multi-Tag Search Engines
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔐 Enterprise RBAC Clearance
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🌐 Social Graph Recommendations
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE FOUR INDUSTRIAL PILLARS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Four Industrial Application Pillars
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In production Python backends, set algebra powers four critical software architectures:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6 not-prose">
              {/* Card 1: Unique User Tracking */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:border-emerald-500">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg mb-2">
                  <span>👥</span> 1. Real-Time DAU Analytics
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Tracks unique session logins. Uses set difference (<code className="text-emerald-300 font-mono">Day1 - Day2</code>) for churn analysis and intersection (<code className="text-emerald-300 font-mono">Day1 &amp; Day2</code>) for retention.
                </p>
                <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-2 rounded">
                  dau = set(); dau.add(user_id)
                </div>
              </div>

              {/* Card 2: Tag Search */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-sky-800/60 shadow-lg shadow-sky-950/30 transition-all duration-300 hover:border-sky-500">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-lg mb-2">
                  <span>🏷️</span> 2. Faceted Multi-Tag Search
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Executes AND queries with subset (<code className="text-sky-300 font-mono">query &lt;= item_tags</code>) and OR queries with disjoint (<code className="text-sky-300 font-mono">not query.isdisjoint(item_tags)</code>).
                </p>
                <div className="text-xs font-mono text-sky-300 bg-slate-900 p-2 rounded">
                  [i for i in catalog if q &lt;= i['tags']]
                </div>
              </div>

              {/* Card 3: RBAC */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-purple-800/60 shadow-lg shadow-purple-950/30 transition-all duration-300 hover:border-purple-500">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-lg mb-2">
                  <span>🔐</span> 3. Enterprise RBAC Clearance
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Aggregates user permissions across multiple assigned roles via set union (<code className="text-purple-300 font-mono">role1 | role2</code>), checking access in O(1) time.
                </p>
                <div className="text-xs font-mono text-purple-300 bg-slate-900 p-2 rounded">
                  required_perm in effective_perms
                </div>
              </div>

              {/* Card 4: Social Graph */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-amber-800/60 shadow-lg shadow-amber-950/30 transition-all duration-300 hover:border-amber-500">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-2">
                  <span>🌐</span> 4. Social Graph Recommendations
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Finds mutual friends via intersection (<code className="text-amber-300 font-mono">u1 &amp; u2</code>) and recommends non-friend candidates via set difference.
                </p>
                <div className="text-xs font-mono text-amber-300 bg-slate-900 p-2 rounded">
                  candidates = friends_of_friend - user_friends
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
              <span className="text-3xl">🏗️</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Production System Architectures
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("architectures")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "architectures"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                RBAC Union Flow
              </button>
              <button
                onClick={() => setActiveTab("social")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "social"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Social Graph Recommendation
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeTab === "architectures" ? (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">
                  Enterprise RBAC Architecture: Role Union &amp; O(1) Security Access Guard
                </text>

                {/* Role 1 */}
                <rect x="30" y="65" width="220" height="110" rx="8" fill="#1e293b" stroke="#38bdf8" />
                <text x="45" y="90" fill="#38bdf8" fontSize="13" fontWeight="bold">Role 1: STUDENT</text>
                <text x="45" y="115" fill="#cbd5e1" fontSize="11">• VIEW_COURSE</text>
                <text x="45" y="135" fill="#cbd5e1" fontSize="11">• SUBMIT_ASSIGNMENT</text>
                <text x="45" y="155" fill="#cbd5e1" fontSize="11">• ASK_QUESTION</text>

                {/* Role 2 */}
                <rect x="30" y="190" width="220" height="100" rx="8" fill="#1e293b" stroke="#a855f7" />
                <text x="45" y="215" fill="#c084fc" fontSize="13" fontWeight="bold">Role 2: MENTOR</text>
                <text x="45" y="240" fill="#cbd5e1" fontSize="11">• GRADE_ASSIGNMENT</text>
                <text x="45" y="260" fill="#cbd5e1" fontSize="11">• CREATE_LESSON</text>

                {/* Arrow */}
                <path d="M 260 170 L 320 170" stroke="#10b981" strokeWidth="2.5" />
                <text x="265" y="160" fill="#34d399" fontSize="11" fontWeight="bold">UNION ( | )</text>

                {/* Effective Perms Set */}
                <rect x="330" y="65" width="280" height="225" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="345" y="95" fill="#34d399" fontSize="14" fontWeight="bold">Effective Permissions Set</text>
                <text x="345" y="125" fill="#a7f3d0" fontSize="11">1. VIEW_COURSE</text>
                <text x="345" y="145" fill="#a7f3d0" fontSize="11">2. SUBMIT_ASSIGNMENT</text>
                <text x="345" y="165" fill="#a7f3d0" fontSize="11">3. ASK_QUESTION</text>
                <text x="345" y="185" fill="#a7f3d0" fontSize="11">4. GRADE_ASSIGNMENT</text>
                <text x="345" y="205" fill="#a7f3d0" fontSize="11">5. CREATE_LESSON</text>
                <text x="345" y="250" fill="#ffffff" fontSize="12" fontWeight="bold">✓ 5 Deduplicated Grants</text>

                {/* Guard Decision */}
                <rect x="630" y="65" width="190" height="225" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="645" y="95" fill="#fbbf24" fontSize="13" fontWeight="bold">API Gateway Guard</text>
                <text x="645" y="130" fill="#cbd5e1" fontSize="11">Action: GRADE_ASSIGNMENT</text>
                <text x="645" y="160" fill="#34d399" fontSize="12" fontWeight="bold">✓ ALLOWED (in set)</text>
                <text x="645" y="200" fill="#cbd5e1" fontSize="11">Action: REFUND_FEE</text>
                <text x="645" y="230" fill="#ef4444" fontSize="12" fontWeight="bold">❌ 403 FORBIDDEN</text>
              </svg>
            ) : (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">
                  Social Graph: Susmita&apos;s Connections &amp; Recommendation Engine
                </text>

                {/* User node */}
                <circle cx="200" cy="160" r="50" fill="#0369a133" stroke="#0ea5e9" strokeWidth="2.5" />
                <text x="175" y="165" fill="#38bdf8" fontSize="13" fontWeight="bold">Susmita</text>

                {/* Direct Friends */}
                <circle cx="420" cy="90" r="40" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="385" y="95" fill="#a7f3d0" fontSize="11" fontWeight="bold">Debangshu</text>

                <circle cx="420" cy="230" r="40" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="395" y="235" fill="#a7f3d0" fontSize="11" fontWeight="bold">Mamata</text>

                {/* Edges to Direct */}
                <line x1="250" y1="140" x2="380" y2="100" stroke="#10b981" strokeWidth="2" />
                <line x1="250" y1="180" x2="380" y2="220" stroke="#10b981" strokeWidth="2" />

                {/* Candidate Node */}
                <circle cx="650" cy="160" r="50" fill="#581c87" stroke="#c084fc" strokeWidth="2.5" />
                <text x="630" y="165" fill="#f5d0fe" fontSize="13" fontWeight="bold">Rohan</text>

                {/* Edges from Mutuals to Candidate */}
                <line x1="460" y1="100" x2="605" y2="140" stroke="#c084fc" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="460" y1="220" x2="605" y2="180" stroke="#c084fc" strokeWidth="2" strokeDasharray="3 3" />

                {/* Result Callout */}
                <rect x="520" y="240" width="300" height="60" rx="6" fill="#0f172a" stroke="#c084fc" />
                <text x="535" y="262" fill="#f5d0fe" fontSize="11" fontWeight="bold">
                  Recommended: Rohan (Score: 2 Mutuals)
                </text>
                <text x="535" y="282" fill="#94a3b8" fontSize="10">
                  Mutual Friends: {'{"Debangshu", "Mamata"}'}
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
                Lab A: Daily Active Users (DAU) Tracking &amp; Cohort Retention
              </h3>
              <PythonFileLoader
                fileModule={activeUsers}
                title="unique_active_users_tracker.py"
                highlightLines={[6, 14, 21, 27]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab B: E-Commerce Multi-Tag Search &amp; Course Fees in ₹
              </h3>
              <PythonFileLoader
                fileModule={tagEngine}
                title="tag_filtering_engine.py"
                highlightLines={[6, 27, 31, 38]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab C: Enterprise Role-Based Access Control (RBAC) Security System
              </h3>
              <PythonFileLoader
                fileModule={rbacGuard}
                title="enterprise_rbac_guard.py"
                highlightLines={[6, 17, 24, 30]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab D: Social Graph Mutual Friend Detection &amp; Recommendations
              </h3>
              <PythonFileLoader
                fileModule={socialGraph}
                title="social_graph_recommendations.py"
                highlightLines={[6, 16, 20, 34]}
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
              4. Industry Applications in West Bengal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">📊</span> 1. Educational Portal DAU &amp; Retention
              </div>
              <p className="text-sm text-slate-300">
                Online learning platforms in <strong>Barrackpore</strong> track daily active students and compute cohort retention percentages across course batches (<strong className="text-emerald-300">₹4,500 enrollment</strong>) using set operations.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🛍️</span> 2. E-Commerce Faceted Search
              </div>
              <p className="text-sm text-slate-300">
                Retail portals in <strong>Kolkata</strong> filter multi-attribute product catalogs in milliseconds using subset (<code className="font-mono text-sky-400">selected_tags &lt;= product.tags</code>) and disjoint queries.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🔐</span> 3. Financial Microservice RBAC
              </div>
              <p className="text-sm text-slate-300">
                Accounting gateways in <strong>Ichapur</strong> resolve multi-role permissions with set union (<code className="font-mono text-purple-400">role_a | role_b</code>), guarding refund endpoints with O(1) checks.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🌐</span> 4. Study Cohort Recommendation Graphs
              </div>
              <p className="text-sm text-slate-300">
                Peer study platforms in <strong>Jadavpur</strong> recommend study partners by ranking mutual shared course connections with set intersection.
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
              5. Production Architecture Pitfalls
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 1: Mutable Security Roles
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Defining roles as mutable sets allows accidental runtime modification. Always seal system roles using <code className="font-mono text-emerald-400">frozenset([...])</code>!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 2: Re-computing Effective Perms on Every Request
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Re-unioning roles on every HTTP request adds CPU overhead. Cache the resolved effective set in the user session object!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 3: Casing Mismatches in Tag Search
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="font-mono text-rose-300">&quot;Python&quot;</code> and <code className="font-mono text-rose-300">&quot;python&quot;</code> have different hashes. Always lowercase tags during indexing and searching!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 4: Memory Bloat in Long-Running DAU Sets
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                A single in-memory DAU set tracking 100M users will consume gigabytes of RAM. For massive web scale, transition to HyperLogLog or Redis sets!
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
            title="Topic 18: Real-World Set Use Cases Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Printable Study Note"
            downloadFileName="topic18_real_world_use_cases_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS (30 COMPREHENSIVE QUESTIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Topic 18 • Real-World Set Use Cases (DAU, Tags, RBAC): Master Viva & Review Questions"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note="Teacher's Master Graduation Note: Congratulations on conquering Module 002_006: Sets! You have advanced from fundamental set definitions to industrial-grade architectures—building real-time DAU trackers, e-commerce search engines, enterprise RBAC security guards, and social connection graphs for Susmita, Mamata, Debangshu, and Abhronila across Barrackpore and Kolkata. Master these concepts, and you are ready to engineer world-class software backends!"
          />
        </section>

      </div>
    </div>
  );
}
