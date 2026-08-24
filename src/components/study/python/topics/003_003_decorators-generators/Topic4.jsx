import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import threeTierFactories from "./topic4_files/decorator_factories_three_tier_architecture.py?raw";
import retryDecorators from "./topic4_files/retry_and_resilience_decorator_with_arguments.py?raw";
import cacheTTL from "./topic4_files/cache_memoization_decorator_with_ttl.py?raw";
import policyEngine from "./topic4_files/institutional_tuition_discount_policy_decorator.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic4_files/topic4_note.txt?raw";

// FAQ Questions
import questions from "./topic4_files/topic4_questions";

/**
 * Topic4: Decorators with arguments & functools.wraps preservation
 * Module: 003_003_decorators-generators
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic4() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("threetier");

  // Interactive Policy Decorator Playground State
  const [campus, setCampus] = useState("BARRACKPORE");
  const [requestedDiscount, setRequestedDiscount] = useState(20);
  const [baseTuition, setBaseTuition] = useState(25000);
  const [maxRetries, setMaxRetries] = useState(3);
  const [policyLogs, setPolicyLogs] = useState([]);
  const [calculationResult, setCalculationResult] = useState(null);

  const campusCeilings = {
    BARRACKPORE: 25,
    KOLKATA: 20,
    ONLINE: 15,
  };

  const handleCalculatePolicyFee = () => {
    const logs = [];
    const ceiling = campusCeilings[campus];
    const discountRate = requestedDiscount / 100;
    const discountAmount = baseTuition * discountRate;
    const netFee = baseTuition - discountAmount;

    // Step 1: Decorator Factory Parameter Ingestion (Tier 1)
    logs.push({
      tier: "TIER 1 (FACTORY)",
      text: `[FACTORY CONFIG] Initialized \`enforce_ceiling(max=${ceiling}%, campus='${campus}')\` & \`retry(max=${maxRetries})\``,
    });

    // Step 2: Policy Ceiling Validation
    if (requestedDiscount > ceiling) {
      logs.push({
        tier: "TIER 3 (WRAPPER)",
        type: "ERROR",
        text: `[POLICY GUARD FAILED] ValueError: Requested discount ${requestedDiscount}% exceeds ${campus} campus ceiling of ${ceiling}%!`,
      });
      setCalculationResult(null);
      setPolicyLogs(logs);
      return;
    }

    // Step 3: Success Execution
    logs.push({
      tier: "TIER 3 (WRAPPER)",
      type: "SUCCESS",
      text: `[POLICY VERIFIED] Discount ${requestedDiscount}% is within ${campus} limit (${ceiling}%). Proceeding...`,
    });

    logs.push({
      tier: "TIER 3 (WRAPPER)",
      type: "AUDIT",
      text: `[LEDGER AUDIT] Base: INR ${baseTuition.toLocaleString()} | Concession: INR ${discountAmount.toLocaleString()} | Net: INR ${netFee.toLocaleString()}`,
    });

    if (discountAmount >= 5000) {
      logs.push({
        tier: "TIER 3 (WRAPPER)",
        type: "ALERT",
        text: `[MANAGEMENT NOTICE] Concession of INR ${discountAmount.toLocaleString()} flagged for Director Review.`,
      });
    }

    setCalculationResult({
      base: baseTuition,
      discountPct: requestedDiscount,
      discountAmt: discountAmount,
      netPayable: netFee,
      campus: campus,
    });

    setPolicyLogs(logs);
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
            Topic 4
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Decorators, Generators &amp; Iterators
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Decorators with Arguments &amp; <span className="text-teal-400">functools.wraps</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master the 3-Tier Decorator Factory architecture in Python: parameterized retry logic with exponential backoff, configurable TTL cache eviction, and deep metadata preservation with <code className="text-purple-300 font-mono">functools.wraps</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏗️ 3-Tier Factory Architecture
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔁 Exponential Backoff Retries
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⏳ Configurable TTL In-Memory Caches
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Deep Metadata Preservation
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: 3-TIER ARCHITECTURE */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The 3-Tier Decorator Factory Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              When a decorator needs custom arguments (e.g. <code className="text-teal-300 font-mono">@repeat(num_times=3)</code>), Python requires a <strong>3-tier nested hierarchy</strong> of functions:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Tier 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">Tier 1: Factory</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">def repeat(num=3):</code>
                <p className="text-[11px] text-slate-300">
                  Accepts decorator arguments and returns the middle decorator.
                </p>
              </div>

              {/* Tier 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">Tier 2: Decorator</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">def decorator(func):</code>
                <p className="text-[11px] text-slate-300">
                  Accepts the target callable and returns the innermost wrapper.
                </p>
              </div>

              {/* Tier 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">Tier 3: Wrapper</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">def wrapper(*args):</code>
                <p className="text-[11px] text-slate-300">
                  Accepts runtime parameters and executes the wrapped logic.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                How Python Evaluates `@repeat(num_times=3)`
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                1. <span className="text-teal-300">decorator = repeat(num_times=3)</span> (Invokes Tier 1 to get Tier 2)<br />
                2. <span className="text-cyan-300">wrapper = decorator(target_function)</span> (Invokes Tier 2 to get Tier 3)<br />
                3. <span className="text-purple-300">target_function = wrapper</span> (Rebinds identifier)
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
                2. Visualizing 3-Tier Calls, Retries &amp; TTL Eviction
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("threetier")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "threetier"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                3-Tier Hierarchy
              </button>
              <button
                onClick={() => setActiveInteractiveTab("retry")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "retry"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Exponential Retry
              </button>
              <button
                onClick={() => setActiveInteractiveTab("ttl")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "ttl"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                TTL Cache Eviction
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining 3-tier factory scoping, retry backoff algorithms, and in-memory TTL caching lifecycles:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "threetier" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">THE 3-TIER DECORATOR FACTORY HIERARCHY</text>

                {/* 3 Concentric Tier Blocks */}
                <g transform="translate(30, 50)">
                  {/* Tier 1: Outer Factory */}
                  <rect x="0" y="0" width="820" height="240" rx="10" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="25" fill="#99f6e4" fontSize="11 font-bold">TIER 1: DECORATOR FACTORY (`def repeat(num_times=3):`)</text>
                  <text x="20" y="42" fill="#a7f3d0" fontSize="8 font-mono">Receives decorator configuration arguments. Encloses `num_times` in lexical scope.</text>

                  {/* Tier 2: Middle Decorator */}
                  <rect x="30" y="60" width="760" height="165" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="50" y="82" fill="#a5f3fc" fontSize="11 font-bold">TIER 2: DECORATOR FUNCTION (`def decorator(func):`)</text>
                  <text x="50" y="99" fill="#bae6fd" fontSize="8 font-mono">Receives target function `func`. Applies `@functools.wraps(func)`.</text>

                  {/* Tier 3: Inner Wrapper */}
                  <rect x="60" y="115" width="700" height="95" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="80" y="140" fill="#c4b5fd" fontSize="11 font-bold">TIER 3: INNER WRAPPER FUNCTION (`def wrapper(*args, **kwargs):`)</text>
                  <text x="80" y="162" fill="#ecfdf5" fontSize="8 font-mono">Executes loop `for _ in range(num_times): result = func(*args, **kwargs)`</text>
                  <text x="80" y="182" fill="#34d399" fontSize="8 font-mono font-bold">Returns computed `result` to the caller!</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "retry" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">PARAMETERIZED RETRY WITH EXPONENTIAL BACKOFF</text>

                {/* 4 Attempts Flow */}
                <g transform="translate(30, 50)">
                  {/* Attempt 1 */}
                  <rect x="0" y="0" width="180" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="15" y="30" fill="#fda4af" fontSize="11 font-bold">Attempt #1</text>
                  <text x="15" y="55" fill="#fca5a5" fontSize="8 font-mono">Call db_query()</text>
                  <text x="15" y="75" fill="#f87171" fontSize="8 font-bold">❌ ConnectionError</text>
                  <rect x="15" y="110" width="150" height="100" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="25" y="135" fill="#ffe4e6" fontSize="8 font-bold">Backoff Delay:</text>
                  <text x="25" y="155" fill="#ecfdf5" fontSize="8 font-mono">delay = 0.010s</text>
                  <text x="25" y="180" fill="#ecfdf5" fontSize="8 font-mono">sleep(10ms)</text>

                  {/* Arrow 1 */}
                  <text x="190" y="125" fill="#38bdf8" fontSize="20" fontWeight="bold">→</text>

                  {/* Attempt 2 */}
                  <rect x="215" y="0" width="180" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="230" y="30" fill="#fda4af" fontSize="11 font-bold">Attempt #2 (2x)</text>
                  <text x="230" y="55" fill="#fca5a5" fontSize="8 font-mono">Call db_query()</text>
                  <text x="230" y="75" fill="#f87171" fontSize="8 font-bold">❌ TimeoutError</text>
                  <rect x="230" y="110" width="150" height="100" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="240" y="135" fill="#ffe4e6" fontSize="8 font-bold">Exponential Scale:</text>
                  <text x="240" y="155" fill="#ecfdf5" fontSize="8 font-mono">delay = 0.020s</text>
                  <text x="240" y="180" fill="#ecfdf5" fontSize="8 font-mono">sleep(20ms)</text>

                  {/* Arrow 2 */}
                  <text x="405" y="125" fill="#38bdf8" fontSize="20" fontWeight="bold">→</text>

                  {/* Attempt 3 */}
                  <rect x="430" y="0" width="180" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="445" y="30" fill="#fda4af" fontSize="11 font-bold">Attempt #3 (4x)</text>
                  <text x="445" y="55" fill="#fca5a5" fontSize="8 font-mono">Call db_query()</text>
                  <text x="445" y="75" fill="#f87171" fontSize="8 font-bold">❌ PortBusy</text>
                  <rect x="445" y="110" width="150" height="100" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="455" y="135" fill="#ffe4e6" fontSize="8 font-bold">Exponential Scale:</text>
                  <text x="455" y="155" fill="#ecfdf5" fontSize="8 font-mono">delay = 0.040s</text>
                  <text x="455" y="180" fill="#ecfdf5" fontSize="8 font-mono">sleep(40ms)</text>

                  {/* Arrow 3 */}
                  <text x="620" y="125" fill="#38bdf8" fontSize="20" fontWeight="bold">→</text>

                  {/* Attempt 4 */}
                  <rect x="645" y="0" width="175" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="660" y="30" fill="#a7f3d0" fontSize="11 font-bold">Attempt #4 (Success)</text>
                  <text x="660" y="55" fill="#ecfdf5" fontSize="8 font-mono">Call db_query()</text>
                  <text x="660" y="75" fill="#34d399" fontSize="8 font-bold">✓ 200 OK (PAID)</text>
                  <rect x="660" y="110" width="145" height="100" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="670" y="135" fill="#34d399" fontSize="8 font-bold">Recovered!</text>
                  <text x="670" y="155" fill="#ecfdf5" fontSize="8 font-mono">Returns record</text>
                  <text x="670" y="180" fill="#a7f3d0" fontSize="8 font-mono">transparently.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">TTL IN-MEMORY CACHING &amp; EVICTION LIFECYCLE</text>

                {/* 3 Step Lifecycle */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11 font-bold">1. First Call: Cache Miss</text>
                  <text x="15" y="60" fill="#ecfdf5" fontSize="8 font-mono">compute_scholarship(3.8)</text>
                  <text x="15" y="85" fill="#cbd5e1" fontSize="8">• Computes fresh value</text>
                  <text x="15" y="105" fill="#cbd5e1" fontSize="8">• Stores `(timestamp, result)`</text>

                  <rect x="15" y="130" width="220" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="25" y="155" fill="#c4b5fd" fontSize="9 font-bold">Cache Entry Created:</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">key = (3.8,)</text>
                  <text x="25" y="190" fill="#34d399" fontSize="8">timestamp = 22:45:00</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="310" y="30" fill="#a7f3d0" fontSize="11 font-bold">2. Immediate Call: Cache Hit</text>
                  <text x="310" y="60" fill="#ecfdf5" fontSize="8 font-mono">compute_scholarship(3.8)</text>
                  <text x="310" y="85" fill="#34d399" fontSize="8 font-mono">now - timestamp &lt; TTL (5s)</text>

                  <rect x="310" y="130" width="220" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="320" y="155" fill="#34d399" fontSize="9 font-bold">Instant O(1) Return:</text>
                  <text x="320" y="175" fill="#ecfdf5" fontSize="8">Bypasses calculation.</text>
                  <text x="320" y="190" fill="#ecfdf5" fontSize="8">`hits += 1`</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="605" y="30" fill="#fda4af" fontSize="11 font-bold">3. Call after 6s: TTL Expired</text>
                  <text x="605" y="60" fill="#fca5a5" fontSize="8 font-mono">now - timestamp &gt; 5s</text>
                  <text x="605" y="85" fill="#fda4af" fontSize="8 font-mono font-bold">Cache Invalidated!</text>

                  <rect x="605" y="130" width="200" height="85" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="615" y="155" fill="#ffe4e6" fontSize="9 font-bold">Automatic Eviction:</text>
                  <text x="615" y="175" fill="#fca5a5" fontSize="8">Recomputes fresh data</text>
                  <text x="615" y="190" fill="#fca5a5" fontSize="8">and updates timestamp.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE POLICY DECORATOR PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Tuition Concession Policy Decorator Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Configure campus discount limits and pass parameters through the 3-tier decorator pipeline (<code className="text-teal-300 font-mono">@enforce_ceiling</code>, <code className="text-cyan-300 font-mono">@audit_ledger</code>) to inspect live runtime enforcement:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Form Controls */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block">
                1. Decorator Factory &amp; Function Parameters
              </span>

              {/* Campus Selector */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400 block">Campus Center (Sets Decorator Ceiling):</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(campusCeilings).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCampus(c)}
                      className={clsx(
                        "p-2 rounded-lg text-center text-xs font-mono border transition-all",
                        campus === c
                          ? "bg-teal-950 border-teal-500 text-teal-200 font-bold"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      )}
                    >
                      {c}
                      <span className="block text-[10px] text-slate-500">Max {campusCeilings[c]}%</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Requested Discount Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Requested Concession Rate:</span>
                  <span className={clsx("font-bold", requestedDiscount > campusCeilings[campus] ? "text-rose-400" : "text-teal-300")}>
                    {requestedDiscount}% (Campus Cap: {campusCeilings[campus]}%)
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="5"
                  value={requestedDiscount}
                  onChange={(e) => setRequestedDiscount(Number(e.target.value))}
                  className="w-full accent-teal-500"
                />
              </div>

              {/* Base Fee Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Base Tuition Fee:</span>
                  <span className="text-slate-200 font-bold">INR {baseTuition.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="50000"
                  step="2500"
                  value={baseTuition}
                  onChange={(e) => setBaseTuition(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>

              {/* Action Button */}
              <button
                onClick={handleCalculatePolicyFee}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg text-xs font-mono transition-all shadow-lg shadow-teal-950/50"
              >
                Execute Parameterized Decorator Pipeline
              </button>
            </div>

            {/* Output & Trace */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Financial Breakdown */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Certified Financial Invoice Breakdown:
                </div>
                {calculationResult ? (
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Base Tuition:</span>
                      <span className="text-slate-200">INR {calculationResult.base.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Approved Concession ({calculationResult.discountPct}%):</span>
                      <span className="text-teal-300">- INR {calculationResult.discountAmt.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-800 font-bold">
                      <span className="text-emerald-400">Final Net Payable:</span>
                      <span className="text-emerald-400 text-sm">INR {calculationResult.netPayable.toLocaleString()}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-500 italic text-[11px]">
                    No valid calculation generated yet or policy guard blocked request.
                  </div>
                )}
              </div>

              {/* 3-Tier Execution Log */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] space-y-1.5 font-mono text-xs">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">
                  3-Tier Execution Pipeline Trace:
                </span>
                {policyLogs.length === 0 ? (
                  <div className="text-slate-500 italic text-[11px]">
                    Click "Execute Parameterized Decorator Pipeline" to run.
                  </div>
                ) : (
                  policyLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={clsx(
                        "p-1.5 rounded text-[11px] leading-relaxed",
                        log.type === "ERROR" && "bg-rose-950/60 border border-rose-800 text-rose-300 font-bold",
                        log.type === "SUCCESS" && "text-emerald-300 font-bold",
                        log.type === "AUDIT" && "text-cyan-300",
                        log.type === "ALERT" && "text-amber-300 font-bold",
                        !log.type && "text-slate-400"
                      )}
                    >
                      <span className="text-[9px] text-slate-500 block font-bold">{log.tier}</span>
                      {log.text}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER 3-TIER MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master 3-Tier Decorator Architecture Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Tier Layer</th>
                  <th className="py-3.5 px-4 font-bold">Input Parameter</th>
                  <th className="py-3.5 px-4 font-bold">Returned Value</th>
                  <th className="py-3.5 px-4 font-bold">Execution Timing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Tier 1: Factory</td>
                  <td className="py-3 px-4">Decorator Config (e.g. `retries=3, ttl=5`)</td>
                  <td className="py-3 px-4 text-emerald-400">Middle Decorator Function</td>
                  <td className="py-3 px-4 text-slate-300">Module definition time</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Tier 2: Decorator</td>
                  <td className="py-3 px-4">Target Function (`func`)</td>
                  <td className="py-3 px-4 text-emerald-400">Innermost Wrapper Function</td>
                  <td className="py-3 px-4 text-slate-300">Module definition time</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Tier 3: Wrapper</td>
                  <td className="py-3 px-4">Runtime Arguments (`*args, **kwargs`)</td>
                  <td className="py-3 px-4 text-emerald-400">Original Computed Result</td>
                  <td className="py-3 px-4 text-amber-300">Runtime (On every call)</td>
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
            Explore 4 production-grade Python scripts demonstrating 3-tier factories, retry backoffs, TTL caching, and multi-campus tuition policies:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "decorator_factories_three_tier_architecture.py",
                code: threeTierFactories,
                description: "The 3-tier decorator factory architecture and functools.wraps preservation.",
              },
              {
                filename: "retry_and_resilience_decorator_with_arguments.py",
                code: retryDecorators,
                description: "Parameterized retry decorator with exponential backoff and exception filtering.",
              },
              {
                filename: "cache_memoization_decorator_with_ttl.py",
                code: cacheTTL,
                description: "Parameterized in-memory caching decorator with TTL expiration and cache info telemetry.",
              },
              {
                filename: "institutional_tuition_discount_policy_decorator.py",
                code: policyEngine,
                description: "Multi-Campus Dynamic Tuition Concession Policy Engine using stacked parameterized decorators.",
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
                <span>❌</span> Trap 1: Forgetting `return decorator`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If the outermost Tier 1 factory forgets to return Tier 2, Python raises <code className="text-rose-300 font-mono">TypeError: 'NoneType' object is not callable</code> at import time.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Tier 1 must return Tier 2; Tier 2 must return Tier 3!
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Placing `@wraps` on Wrong Tier
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Placing <code className="text-amber-300 font-mono">@functools.wraps</code> above Tier 2 instead of Tier 3 fails to preserve metadata on the final wrapper.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Place <code className="text-emerald-300">@functools.wraps(func)</code> directly above Tier 3 wrapper.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Mutable Defaults in Tier 1
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-purple-300 font-mono">def factory(tags=[]):</code> shares the same list across all decorated functions in the app.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Use <code className="text-emerald-300">tags=None</code> and initialize inside the factory.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Route Name Collisions in Web APIs
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                In FastAPI/Flask, forgetting wraps causes all route endpoints to be registered as <code className="text-cyan-300 font-mono">"wrapper"</code>, crashing with route collisions.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always use <code className="text-emerald-300">@functools.wraps(func)</code> in web middleware.
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
            Comprehensive question-and-answer repository covering 3-tier decorator factories, parameterized retries, TTL caching, and functools.wraps:
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
            Download or print the complete reference sheet with 3-tier factory blueprints, retry templates, and TTL cache recipes:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic4_decorators_with_arguments_notes.txt"
              title="Print Topic 4 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
