import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import callCounterLogging from "./topic3_files/custom_logging_and_call_count_decorators.py?raw";
import executionTiming from "./topic3_files/execution_timing_and_profiling_decorators.py?raw";
import rbacDecorators from "./topic3_files/authentication_and_rbac_decorators.py?raw";
import securityPortal from "./topic3_files/institutional_examination_security_portal_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic3_files/topic3_note.txt?raw";

// FAQ Questions
import questions from "./topic3_files/topic3_questions";

/**
 * Topic3: Writing custom decorators (logging, timing execution, authentication)
 * Module: 003_003_decorators-generators
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic3() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("rbac");

  // Interactive Security Simulator State
  const [userRole, setUserRole] = useState("STUDENT");
  const [selectedAction, setSelectedAction] = useState("view_report");
  const [callCount, setCallCount] = useState(0);
  const [rateLimitMax] = useState(3);
  const [portalLogs, setPortalLogs] = useState([]);

  const handleExecuteAction = () => {
    const newLogs = [];
    const t0 = performance.now();
    const newCount = callCount + 1;
    setCallCount(newCount);

    // 1. Rate Limiter Decorator Check
    if (newCount > rateLimitMax) {
      newLogs.push({
        type: "ERROR",
        text: `[RATE LIMIT EXCEEDED] RuntimeError: Rate limit of ${rateLimitMax} calls exceeded! Throttling request.`,
      });
      setPortalLogs(newLogs);
      return;
    }

    // 2. Authentication Check
    if (userRole === "GUEST") {
      newLogs.push({
        type: "ERROR",
        text: `[AUTH FAILED] PermissionError: User is not authenticated. Please log in first!`,
      });
      setPortalLogs(newLogs);
      return;
    }

    // 3. RBAC Decorator Check
    if (selectedAction === "lock_grades" && userRole !== "ADMIN") {
      newLogs.push({
        type: "ERROR",
        text: `[RBAC DENIED] PermissionError: Role '${userRole}' is unauthorized for \`finalize_and_lock_grades\`. Required: ['ADMIN']`,
      });
      setPortalLogs(newLogs);
      return;
    }

    if (selectedAction === "publish_schedule" && !["ADMIN", "FACULTY"].includes(userRole)) {
      newLogs.push({
        type: "ERROR",
        text: `[RBAC DENIED] PermissionError: Role '${userRole}' is unauthorized for \`publish_exam_schedule\`. Required: ['ADMIN', 'FACULTY']`,
      });
      setPortalLogs(newLogs);
      return;
    }

    // 4. Success Execution
    let resultText = "";
    if (selectedAction === "view_report") {
      resultText = "Retrieved Student Grade Sheet: Score 94.5% (Distinction Certificate Awarded)";
    } else if (selectedAction === "publish_schedule") {
      resultText = "Published Official Examination Schedule for Batch 2026 (Room 102, AI Lab)";
    } else {
      resultText = "Cryptographically Locked & Sealed All Final Examination Grades (45 Candidates)";
    }

    const elapsed = ((performance.now() - t0) * 10).toFixed(2);
    newLogs.push({
      type: "SUCCESS",
      text: `[AUDIT PASS] Action \`${selectedAction}\` executed successfully by role '${userRole}'.`,
    });
    newLogs.push({
      type: "RESULT",
      text: `[RESPONSE DATA] ${resultText}`,
    });
    newLogs.push({
      type: "TIMER",
      text: `[BENCHMARK] Executed in ${elapsed} microseconds. (Session Call #${newCount}/${rateLimitMax})`,
    });

    setPortalLogs(newLogs);
  };

  const handleResetSession = () => {
    setCallCount(0);
    setPortalLogs([]);
    setUserRole("STUDENT");
  };

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
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-teal-500/30 selection:text-teal-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
        }
        @keyframes pulseGlowTeal {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(20, 184, 166, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(20, 184, 166, 0.8)); }
        }
        .animate-glow-teal {
          animation: pulseGlowTeal 3s infinite ease-in-out;
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
          <span className="text-xs sm:text-sm font-mono font-semibold bg-teal-950/80 text-teal-300 px-3 py-1 rounded-full border border-teal-800/80 shadow-sm shadow-teal-950/50">
            Segment 3 • Module 003_003
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 3
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Decorators, Generators &amp; Iterators
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Writing Custom Decorators: <span className="text-teal-400">Logging, Timing &amp; Auth</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master building production-grade custom decorators: structured audit logging, stateful call counters, high-precision latency profiling with <code className="text-teal-300 font-mono">perf_counter()</code>, Role-Based Access Control (RBAC), and rate-limiting throttles.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔒 RBAC &amp; Authentication Guards
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⏱️ High-Precision Performance Timers
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔢 Stateful Call Counters
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🚦 Sliding-Window Rate Limiting
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: CUSTOM DECORATOR PATTERNS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🛠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The 4 Essential Production Decorator Patterns
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In production backend services, custom decorators allow you to enforce security, monitoring, and rate limiting uniformly across dozens of endpoints without duplicating code:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pattern 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Audit Logging</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">@audit_logger</code>
                <p className="text-[11px] text-slate-300">
                  Records timestamp, input args, and return status for compliance.
                </p>
              </div>

              {/* Pattern 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Latency Timer</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">@benchmark_timer</code>
                <p className="text-[11px] text-slate-300">
                  Measures microsecond latency with <code className="text-cyan-300">perf_counter()</code> and alerts on slow calls.
                </p>
              </div>

              {/* Pattern 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Security &amp; RBAC</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">@require_role('ADMIN')</code>
                <p className="text-[11px] text-slate-300">
                  Enforces authentication and permission checks before method entry.
                </p>
              </div>

              {/* Pattern 4 */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 shadow-lg">
                <div className="text-emerald-400 font-bold text-sm mb-1">4️⃣ Rate Limiting</div>
                <code className="text-xs font-mono text-emerald-300 block mb-1">@rate_limit(max=5)</code>
                <p className="text-[11px] text-slate-300">
                  Throttles excessive invocations to prevent brute-force attacks.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Stateful Function Attributes
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Because Python functions are mutable objects, decorators can attach state directly to the wrapper function object (e.g. <code className="text-teal-300 font-mono">wrapper.calls = 0</code>; <code className="text-teal-300 font-mono">wrapper.calls += 1</code>) to track lifetime invocation metrics without global variables!
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: INTERACTIVE VISUAL ARCHITECTURE (SVG TABS) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📐</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Security, Profiling &amp; Stateful Interception
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("rbac")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "rbac"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                RBAC Security Interceptor
              </button>
              <button
                onClick={() => setActiveInteractiveTab("counter")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "counter"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Stateful Metric Tracking
              </button>
              <button
                onClick={() => setActiveInteractiveTab("ratelimit")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "ratelimit"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Rate-Limiting Throttling
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining security verification gates, metric accumulation, and rate-limiting throttles:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "rbac" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">ROLE-BASED ACCESS CONTROL (RBAC) SECURITY INTERCEPTION</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1: User Request */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11 font-bold">1. Client Invocation</text>
                  <text x="15" y="60" fill="#ecfdf5" fontSize="8 font-mono">finalize_grades("PY-301")</text>
                  <text x="15" y="85" fill="#cbd5e1" fontSize="8">• Active Role: `STUDENT`</text>
                  
                  <rect x="15" y="130" width="220" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="25" y="155" fill="#c4b5fd" fontSize="9 font-bold">Caller Context:</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">Context extracted from</text>
                  <text x="25" y="190" fill="#cbd5e1" fontSize="8">request session or JWT token.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2: RBAC Gatekeeper */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="310" y="30" fill="#fda4af" fontSize="11 font-bold">2. `@require_role('ADMIN')`</text>
                  <text x="310" y="60" fill="#fca5a5" fontSize="8 font-mono">if role not in allowed:</text>
                  <text x="325" y="85" fill="#fda4af" fontSize="8 font-mono font-bold">raise PermissionError()</text>

                  <rect x="310" y="130" width="220" height="85" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="320" y="155" fill="#ffe4e6" fontSize="9 font-bold">Instant Gatekeeper Guard:</text>
                  <text x="320" y="175" fill="#fca5a5" fontSize="8">Blocks unauthorized roles</text>
                  <text x="320" y="190" fill="#fca5a5" fontSize="8">before business logic runs!</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3: Protected Core */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="605" y="30" fill="#a7f3d0" fontSize="11 font-bold">3. Core Admin Logic</text>
                  <text x="605" y="60" fill="#ecfdf5" fontSize="8 font-mono">lock_exam_database()</text>
                  <text x="605" y="85" fill="#34d399" fontSize="8 font-mono font-bold">return "SEALED"</text>

                  <rect x="605" y="130" width="200" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="615" y="155" fill="#34d399" fontSize="9 font-bold">Secure Execution:</text>
                  <text x="615" y="175" fill="#cbd5e1" fontSize="8">Only authorized admins</text>
                  <text x="615" y="190" fill="#cbd5e1" fontSize="8">can ever reach this line.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "counter" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">STATEFUL METRIC TRACKING VIA FUNCTION ATTRIBUTES</text>

                {/* Left: Code Structure */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">Call Counter Decorator Code</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="8 font-mono">def count_calls(func):</text>
                  <text x="35" y="80" fill="#cbd5e1" fontSize="8 font-mono">def wrapper(*args, **kw):</text>
                  <text x="50" y="100" fill="#34d399" fontSize="8 font-mono font-bold">wrapper.calls += 1  # INCREMENT</text>
                  <text x="50" y="120" fill="#cbd5e1" fontSize="8 font-mono">return func(*args, **kw)</text>
                  <text x="35" y="145" fill="#34d399" fontSize="8 font-mono font-bold">wrapper.calls = 0  # ATTACH ATTRIBUTE</text>
                  <text x="35" y="165" fill="#ecfdf5" fontSize="8 font-mono">return wrapper</text>

                  <rect x="20" y="185" width="340" height="40" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="210" fill="#a7f3d0" fontSize="8 font-mono">Functions are mutable objects in Python!</text>
                </g>

                {/* Arrow */}
                <g transform="translate(425, 140)">
                  <text x="0" y="0" fill="#38bdf8" fontSize="12" fontWeight="bold">stores state</text>
                  <text x="25" y="25" fill="#38bdf8" fontSize="26" fontWeight="bold">→</text>
                </g>

                {/* Right: State Readout */}
                <g transform="translate(480, 50)">
                  <rect x="0" y="0" width="370" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="30" fill="#a5f3fc" fontSize="12" fontWeight="bold">Function Object State in Memory</text>

                  <rect x="20" y="60" width="330" height="155" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="35" y="85" fill="#ecfdf5" fontSize="9 font-mono">issue_ticket("STU-101") -&gt; `calls = 1`</text>
                  <text x="35" y="110" fill="#ecfdf5" fontSize="9 font-mono">issue_ticket("STU-102") -&gt; `calls = 2`</text>
                  <text x="35" y="135" fill="#ecfdf5" fontSize="9 font-mono">issue_ticket("STU-103") -&gt; `calls = 3`</text>
                  <text x="35" y="165" fill="#38bdf8" fontSize="9 font-mono font-bold">print(issue_ticket.calls) -&gt; 3</text>
                  <text x="35" y="195" fill="#a5f3fc" fontSize="8 font-bold">✓ Zero global variables required!</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">SLIDING-WINDOW RATE LIMITING DECORATOR ARCHITECTURE</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11 font-bold">1. Timestamp Ingestion</text>
                  <text x="15" y="60" fill="#ecfdf5" fontSize="8 font-mono">now = time.time()</text>
                  <text x="15" y="85" fill="#cbd5e1" fontSize="8">• Purge timestamps</text>
                  <text x="15" y="100" fill="#cbd5e1" fontSize="8">older than 60s</text>

                  <rect x="15" y="130" width="220" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="25" y="155" fill="#c4b5fd" fontSize="9 font-bold">Sliding Window:</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">Maintains rolling history</text>
                  <text x="25" y="190" fill="#cbd5e1" fontSize="8">of call timestamps.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="310" y="30" fill="#fda4af" fontSize="11 font-bold">2. Threshold Evaluation</text>
                  <text x="310" y="60" fill="#fca5a5" fontSize="8 font-mono">if len(history) &gt;= max:</text>
                  <text x="325" y="85" fill="#fda4af" fontSize="8 font-mono font-bold">raise RuntimeError()</text>

                  <rect x="310" y="130" width="220" height="85" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="320" y="155" fill="#ffe4e6" fontSize="9 font-bold">Throttling Tripwire:</text>
                  <text x="320" y="175" fill="#fca5a5" fontSize="8">Protects database from</text>
                  <text x="320" y="190" fill="#fca5a5" fontSize="8">brute-force request floods.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="605" y="30" fill="#a7f3d0" fontSize="11 font-bold">3. Forward &amp; Execute</text>
                  <text x="605" y="60" fill="#ecfdf5" fontSize="8 font-mono">history.append(now)</text>
                  <text x="605" y="85" fill="#34d399" fontSize="8 font-mono font-bold">return func(*args)</text>

                  <rect x="605" y="130" width="200" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="615" y="155" fill="#34d399" fontSize="9 font-bold">Controlled Flow:</text>
                  <text x="615" y="175" fill="#cbd5e1" fontSize="8">Smooth, predictable API</text>
                  <text x="615" y="190" fill="#cbd5e1" fontSize="8">rate consumption.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE SECURITY PORTAL PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Examination Security &amp; RBAC Portal Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select a session user role and attempt to invoke secured examination methods to witness RBAC and rate-limiting decorators in action:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Active Session Credentials
                </span>
                <button
                  onClick={handleResetSession}
                  className="text-[11px] font-mono text-slate-400 hover:text-white underline"
                >
                  Reset Session &amp; Rate Limit
                </button>
              </div>

              {/* Role Chooser */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["ADMIN", "FACULTY", "STUDENT", "GUEST"].map((role) => (
                  <button
                    key={role}
                    onClick={() => setUserRole(role)}
                    className={clsx(
                      "p-2 rounded-lg text-center text-xs font-mono border transition-all",
                      userRole === role
                        ? "bg-teal-950 border-teal-500 text-teal-200 font-bold"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    )}
                  >
                    {role}
                  </button>
                ))}
              </div>

              {/* Method Chooser */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  2. Select Decorated Target Method:
                </span>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedAction("view_report")}
                    className={clsx(
                      "p-2.5 rounded-lg text-left text-xs font-mono border transition-all",
                      selectedAction === "view_report"
                        ? "bg-cyan-950/80 border-cyan-500 text-cyan-200"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    )}
                  >
                    <div className="font-bold text-cyan-300">view_own_report_card(student_id)</div>
                    <div className="text-[10px] text-slate-500">Decorated with: `@require_authenticated`</div>
                  </button>

                  <button
                    onClick={() => setSelectedAction("publish_schedule")}
                    className={clsx(
                      "p-2.5 rounded-lg text-left text-xs font-mono border transition-all",
                      selectedAction === "publish_schedule"
                        ? "bg-purple-950/80 border-purple-500 text-purple-200"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    )}
                  >
                    <div className="font-bold text-purple-300">publish_exam_schedule(code, date)</div>
                    <div className="text-[10px] text-slate-500">Decorated with: `@require_role('ADMIN', 'FACULTY')`</div>
                  </button>

                  <button
                    onClick={() => setSelectedAction("lock_grades")}
                    className={clsx(
                      "p-2.5 rounded-lg text-left text-xs font-mono border transition-all",
                      selectedAction === "lock_grades"
                        ? "bg-rose-950/80 border-rose-500 text-rose-200"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    )}
                  >
                    <div className="font-bold text-rose-300">finalize_and_lock_grades(code, count)</div>
                    <div className="text-[10px] text-slate-500">Decorated with: `@require_role('ADMIN')`, `@rate_limit(3)`</div>
                  </button>
                </div>
              </div>

              {/* Action Trigger */}
              <button
                onClick={handleExecuteAction}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg text-xs font-mono transition-all shadow-lg shadow-teal-950/50"
              >
                Invoke Method (Execute Through Decorator Pipeline)
              </button>
            </div>

            {/* Live Security & Telemetry Console */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Token Gauge Readout */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Rate Limit &amp; Security Gatekeeper Status:
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Authenticated Role:</span>
                  <span className="text-teal-300 font-bold">{userRole}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Session Rate Limit Usage:</span>
                  <span className={clsx("font-bold", callCount > rateLimitMax ? "text-rose-400" : "text-emerald-400")}>
                    {callCount} / {rateLimitMax} calls consumed
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={clsx(
                      "h-full transition-all duration-300",
                      callCount > rateLimitMax ? "bg-rose-500" : "bg-teal-500"
                    )}
                    style={{ width: `${Math.min((callCount / rateLimitMax) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Execution Trace Output */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[180px] space-y-1.5 font-mono text-xs">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">
                  Telemetry &amp; Security Interception Log:
                </span>
                {portalLogs.length === 0 ? (
                  <div className="text-slate-500 italic text-[11px]">
                    Click "Invoke Method" to execute secured call.
                  </div>
                ) : (
                  portalLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={clsx(
                        "p-1.5 rounded text-[11px] leading-relaxed",
                        log.type === "ERROR" && "bg-rose-950/60 border border-rose-800 text-rose-300 font-bold",
                        log.type === "SUCCESS" && "text-emerald-300 font-bold",
                        log.type === "RESULT" && "text-teal-200",
                        log.type === "TIMER" && "text-cyan-300 text-[10px]"
                      )}
                    >
                      {log.text}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER CUSTOM DECORATORS MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Custom Decorator Design Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Implementation Strategy</th>
                  <th className="py-3.5 px-4 font-bold">Key Mechanism</th>
                  <th className="py-3.5 px-4 font-bold">Production Benefit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Audit Logging</td>
                  <td className="py-3 px-4 font-mono text-slate-200">def wrapper(*a, **kw): log(a, kw); return fn(*a, **kw)</td>
                  <td className="py-3 px-4">Pre/Post execution serialization</td>
                  <td className="py-3 px-4">Zero business logic pollution</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Latency Profiler</td>
                  <td className="py-3 px-4 font-mono text-slate-200">t0 = perf_counter(); res = fn(); log(perf_counter()-t0)</td>
                  <td className="py-3 px-4">Monotonic hardware timing</td>
                  <td className="py-3 px-4">Immediate slow-query detection</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">RBAC Security</td>
                  <td className="py-3 px-4 font-mono text-slate-200">if user.role not in allowed: raise PermissionError</td>
                  <td className="py-3 px-4">Early authorization gatekeeper</td>
                  <td className="py-3 px-4">Declarative, secure endpoints</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">Call Counter</td>
                  <td className="py-3 px-4 font-mono text-slate-200">wrapper.calls += 1; return fn(*a, **kw)</td>
                  <td className="py-3 px-4">Function object attribute mutation</td>
                  <td className="py-3 px-4">In-memory metric telemetry</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: LIVE PYTHON CODE LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Interactive Code Lab: Production Scripts
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Explore 4 production-grade Python scripts demonstrating call counters, execution profiling, RBAC security, and institutional examination portals:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "custom_logging_and_call_count_decorators.py",
                code: callCounterLogging,
                description: "Stateful call counter decorator using function attributes and structured audit logging.",
              },
              {
                filename: "execution_timing_and_profiling_decorators.py",
                code: executionTiming,
                description: "High-precision performance timer with perf_counter() and slow-execution warning alerts.",
              },
              {
                filename: "authentication_and_rbac_decorators.py",
                code: rbacDecorators,
                description: "Authentication and Role-Based Access Control (RBAC) security decorators enforcing permissions.",
              },
              {
                filename: "institutional_examination_security_portal_suite.py",
                code: securityPortal,
                description: "Enterprise Examination Security Portal with stacked rate-limiting, RBAC, and forensic telemetry.",
              },
            ]}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: COMMON TRAPS & EDGE CASES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              6. Common Traps, Anti-Patterns &amp; Edge Cases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trap 1 */}
            <div className="p-6 rounded-xl bg-rose-950/30 border border-rose-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                <span>❌</span> Trap 1: Swallowing Exceptions in Decorators
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Catching errors inside a decorator without re-raising hides critical backend crashes and corrupts database transactions.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Log errors with <code className="text-emerald-300">logger.exception()</code> and re-raise.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Leaking Passwords in Audit Logs
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Blindly logging <code className="text-amber-300 font-mono">f"kwargs={kwargs}"</code> can write raw passwords and credit cards into plain text log files!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Sanitize sensitive keys (<code className="text-emerald-300">'password', 'token'</code>) before logging.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Using `time.time()` for Benchmarking
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                System clock adjustments (NTP syncs) can cause <code className="text-purple-300 font-mono">time.time()</code> to produce negative or wildly inaccurate durations.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always use monotonic <code className="text-emerald-300">time.perf_counter()</code> for benchmarking.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Thread Race in Stateful Counters
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Mutating <code className="text-cyan-300 font-mono">wrapper.calls += 1</code> in multi-threaded servers causes race conditions without locks.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Synchronize shared counter access using <code className="text-emerald-300">threading.Lock()</code>.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQ & INTERVIEW REVIEW QUESTIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">❓</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              7. Master Review &amp; Interview Questions (25 FAQs)
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Comprehensive question-and-answer repository covering custom decorators, audit logging, performance timers, and RBAC authentication:
          </p>

          <FAQTemplate questions={questions} />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: STUDY NOTES, PRINTABLE HANDOUT & TEACHER BIO */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📄</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              8. Study Notes, Printable Handout &amp; Teacher Profile
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Download or print the complete reference sheet with custom decorator templates, timing recipes, and RBAC blueprints:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic3_custom_decorators_notes.txt"
              title="Print Topic 3 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
