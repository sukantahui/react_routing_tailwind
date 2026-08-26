import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import horizontalScalingCode from "./topic6_files/horizontal_scaling_stateless_architecture.py?raw";
import cachingCode from "./topic6_files/caching_strategies_and_invalidation.py?raw";
import rateLimitingCode from "./topic6_files/rate_limiting_and_token_bucket.py?raw";
import distributedBackendCaseCode from "./topic6_files/institutional_distributed_backend_case_study.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic6_files/topic6_note.txt?raw";

// FAQ Questions
import questions from "./topic6_files/topic6_questions";

/**
 * Topic6: System design basics for Python backends
 * Module: 004_004_capstone-projects
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic6() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("systemTopology");

  // Interactive Laboratory State
  const [trafficLoadMode, setTrafficLoadMode] = useState("NORMAL"); // NORMAL | PEAK | SURGE

  let rpsMetric = "1,000 req/sec";
  let activeWorkers = "3 Stateless Instances";
  let cacheHitRate = "98.5% (Redis)";
  let dbLoadPercent = "12% CPU (Master + 2 Replicas)";
  let rateLimitStatus = "0 requests throttled (Normal)";

  if (trafficLoadMode === "NORMAL") {
    rpsMetric = "1,200 req/sec";
    activeWorkers = "3 Stateless Gunicorn Instances";
    cacheHitRate = "98.5% (Redis Cluster)";
    dbLoadPercent = "14% CPU (Master Writes + Replicas)";
    rateLimitStatus = "0 requests throttled (Normal flow)";
  } else if (trafficLoadMode === "PEAK") {
    rpsMetric = "45,000 req/sec";
    activeWorkers = "18 Auto-Scaled Pods (Kubernetes)";
    cacheHitRate = "99.4% (Cache-Aside + Mutex Lock)";
    dbLoadPercent = "48% CPU (Read Replicas Absorb Queries)";
    rateLimitStatus = "120 abusive IPs throttled (Token Bucket)";
  } else if (trafficLoadMode === "SURGE") {
    rpsMetric = "250,000 req/sec";
    activeWorkers = "60 Max Auto-Scaled Instances";
    cacheHitRate = "99.8% (Edge CDN + Redis Cluster)";
    dbLoadPercent = "72% CPU (Celery Queue Buffers Writes)";
    rateLimitStatus = "14,500 brute-force calls dropped (HTTP 429)";
  }

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
            Segment 4 • Module 004_004
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 6
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Capstone Projects, Portfolio &amp; Interview Mastery
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          System Design Basics for <span className="text-teal-400">Python Backends</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master the architectural foundations of highly scalable, fault-tolerant Python distributed backend systems: stateless application server tiers behind load balancers (Round Robin, Least Connections), Cache-Aside lazy loading with Redis, defending against Thundering Herd cache stampedes, Token Bucket rate limiting, database scaling with Read Replicas and Connection Pooling, asynchronous task queues with Celery, and CAP Theorem tradeoffs.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚖️ Horizontal Load Balancing
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Redis Cache-Aside &amp; Stampede Defense
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Token Bucket Rate Limiting
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🌐 Read Replicas &amp; CAP Theorem
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: ARCHITECTURAL PILLARS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Distributed Python Backend Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Designing backend architectures capable of scaling from 1,000 to 1,000,000 users relies on modular, decoupled components:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Stateless App Tier</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">Load Balancers + NGINX</code>
                <p className="text-[11px] text-slate-300">
                  Zero session state in server RAM; sessions externalized to Redis, allowing seamless elastic auto-scaling.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Caching &amp; Stampede</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">Cache-Aside + Mutex</code>
                <p className="text-[11px] text-slate-300">
                  Redis in-memory caching with TTLs and distributed locks preventing database overload when popular keys expire.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ API Rate Limiting</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">Token Bucket (HTTP 429)</code>
                <p className="text-[11px] text-slate-300">
                  Protects backend endpoints from denial-of-service surges, brute force attacks, and runaway scrapers.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ Async Task Queues</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">Celery + RabbitMQ/Redis</code>
                <p className="text-[11px] text-slate-300">
                  Offloads slow tasks (PDF generation, bulk emails, payment webhooks) to background workers for instant API responses.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The CAP Theorem in a Nutshell
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                When network partitions (P) occur in distributed databases, you must choose between <span className="text-teal-300 font-bold">Consistency (C)</span> (all nodes return exact latest state or fail) vs <span className="text-cyan-300 font-bold">Availability (A)</span> (all nodes respond immediately, though possibly with slightly stale data). Financial ledgers pick CP; social feeds pick AP.
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
                2. Visualizing Multi-Tier Topologies, Cache Flows &amp; CAP Theorem
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("systemTopology")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "systemTopology"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Multi-Tier Distributed Topology
              </button>
              <button
                onClick={() => setActiveInteractiveTab("cacheFlow")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "cacheFlow"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Cache-Aside &amp; Stampede Defense
              </button>
              <button
                onClick={() => setActiveInteractiveTab("capMatrix")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "capMatrix"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                CAP Theorem Tradeoff Matrix
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining edge reverse proxies, stateless app clusters, distributed in-memory caches, and database replication:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "systemTopology" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  HIGH-CONCURRENCY DISTRIBUTED PYTHON BACKEND TOPOLOGY
                </text>

                {/* Tier 1: Clients & API Gateway */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="160" height="235" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="15" y="25" fill="#ffffff" fontSize="11" fontWeight="bold">Tier 1: Edge &amp; Gateway</text>
                  
                  <rect x="10" y="45" width="140" height="50" rx="4" fill="#082f49" />
                  <text x="15" y="65" fill="#38bdf8" fontSize="9" fontWeight="bold">Clients / Mobile Apps</text>
                  <text x="15" y="80" fill="#bae6fd" fontSize="8">HTTPS / WebSockets</text>

                  <rect x="10" y="115" width="140" height="105" rx="4" fill="#082f49" />
                  <text x="15" y="135" fill="#38bdf8" fontSize="9" fontWeight="bold">NGINX / API Gateway</text>
                  <text x="15" y="152" fill="#e0f2fe" fontSize="8">• SSL Termination</text>
                  <text x="15" y="169" fill="#e0f2fe" fontSize="8">• Token Bucket Rate Limit</text>
                  <text x="15" y="186" fill="#e0f2fe" fontSize="8">• Round Robin Routing</text>
                </g>

                {/* Arrow to Tier 2 */}
                <path d="M 200 160 L 230 160" stroke="#14b8a6" strokeWidth="3" markerEnd="url(#arrow)" />

                {/* Tier 2: Stateless App Workers */}
                <g transform="translate(240, 50)">
                  <rect x="0" y="0" width="220" height="235" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="15" y="25" fill="#5eead4" fontSize="11" fontWeight="bold">Tier 2: Stateless App Pods</text>

                  {/* Worker 1 */}
                  <rect x="10" y="45" width="200" height="48" rx="4" fill="#022c22" stroke="#0d9488" />
                  <text x="15" y="65" fill="#a7f3d0" fontSize="9" fontFamily="monospace">Gunicorn 1 (Barrackpore)</text>
                  <text x="15" y="80" fill="#ccfbf1" fontSize="8">Uvicorn ASGI Workers</text>

                  {/* Worker 2 */}
                  <rect x="10" y="105" width="200" height="48" rx="4" fill="#022c22" stroke="#0d9488" />
                  <text x="15" y="125" fill="#a7f3d0" fontSize="9" fontFamily="monospace">Gunicorn 2 (Kolkata)</text>
                  <text x="15" y="140" fill="#ccfbf1" fontSize="8">Uvicorn ASGI Workers</text>

                  {/* Worker 3 */}
                  <rect x="10" y="165" width="200" height="48" rx="4" fill="#022c22" stroke="#0d9488" />
                  <text x="15" y="185" fill="#a7f3d0" fontSize="9" fontFamily="monospace">Gunicorn 3 (Ichapur)</text>
                  <text x="15" y="200" fill="#86efac" fontSize="8">Auto-Scaled Cluster ✅</text>
                </g>

                {/* Arrow to Tier 3 */}
                <path d="M 470 160 L 500 160" stroke="#14b8a6" strokeWidth="3" markerEnd="url(#arrow)" />

                {/* Tier 3: Caching & Message Queue */}
                <g transform="translate(510, 50)">
                  <rect x="0" y="0" width="160" height="235" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="15" y="25" fill="#f3e8ff" fontSize="11" fontWeight="bold">Tier 3: Cache &amp; Queue</text>

                  {/* Redis Cache */}
                  <rect x="10" y="45" width="140" height="80" rx="4" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="15" y="65" fill="#e0e7ff" fontSize="9" fontWeight="bold">Redis Cache Cluster</text>
                  <text x="15" y="82" fill="#c7d2fe" fontSize="8">• Sub-millisecond reads</text>
                  <text x="15" y="99" fill="#c7d2fe" fontSize="8">• Externalized Sessions</text>
                  <text x="15" y="116" fill="#86efac" fontSize="8">99% Hit Ratio ✅</text>

                  {/* Celery Task Queue */}
                  <rect x="10" y="140" width="140" height="80" rx="4" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="15" y="160" fill="#e0e7ff" fontSize="9" fontWeight="bold">Celery Workers</text>
                  <text x="15" y="177" fill="#c7d2fe" fontSize="8">• Background Invoices</text>
                  <text x="15" y="194" fill="#c7d2fe" fontSize="8">• SMS/Email Notifications</text>
                </g>

                {/* Arrow to Tier 4 */}
                <path d="M 680 160 L 710 160" stroke="#14b8a6" strokeWidth="3" markerEnd="url(#arrow)" />

                {/* Tier 4: Database Layer */}
                <g transform="translate(720, 50)">
                  <rect x="0" y="0" width="130" height="235" rx="6" fill="#1e293b" stroke="#64748b" />
                  <text x="10" y="25" fill="#f8fafc" fontSize="10" fontWeight="bold">Tier 4: DB Layer</text>

                  {/* Master DB */}
                  <rect x="10" y="45" width="110" height="75" rx="4" fill="#0f172a" stroke="#3b82f6" />
                  <text x="15" y="65" fill="#60a5fa" fontSize="8" fontWeight="bold">Primary Master</text>
                  <text x="15" y="80" fill="#93c5fd" fontSize="7">Writes &amp; Transactions</text>
                  <text x="15" y="100" fill="#86efac" fontSize="7">ACID Strict ✅</text>

                  {/* Read Replicas */}
                  <rect x="10" y="135" width="110" height="85" rx="4" fill="#0f172a" stroke="#10b981" />
                  <text x="15" y="155" fill="#34d399" fontSize="8" fontWeight="bold">Read Replicas</text>
                  <text x="15" y="170" fill="#6ee7b7" fontSize="7">Sync Replication</text>
                  <text x="15" y="187" fill="#6ee7b7" fontSize="7">High-Volume Queries</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "cacheFlow" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  CACHE-ASIDE LAZY LOADING PATTERN &amp; MUTEX STAMPEDE DEFENSE
                </text>

                {/* Cache Flow Grid */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Step 1: App Check */}
                  <rect x="25" y="35" width="230" height="180" rx="6" fill="#0369a1" stroke="#38bdf8" />
                  <text x="35" y="60" fill="#ffffff" fontSize="11" fontWeight="bold">1. Read Request</text>
                  <text x="35" y="85" fill="#e0f2fe" fontSize="8" fontFamily="monospace">val = redis.get(key)</text>
                  <text x="35" y="115" fill="#86efac" fontSize="8" fontWeight="bold">Case A: Cache Hit (98%)</text>
                  <text x="35" y="132" fill="#bae6fd" fontSize="8">Return sub-ms response instantly</text>
                  <text x="35" y="160" fill="#fca5a5" fontSize="8" fontWeight="bold">Case B: Cache Miss (2%)</text>
                  <text x="35" y="177" fill="#bae6fd" fontSize="8">Proceed to Mutex Lock ➔</text>
                </g>

                {/* Arrow 1 */}
                <path d="M 295 125 L 325 125" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* Step 2: Mutex Lock */}
                <g transform="translate(335, 50)">
                  <rect x="0" y="35" width="220" height="180" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="15" y="60" fill="#5eead4" fontSize="11" fontWeight="bold">2. Stampede Mutex Lock</text>
                  <text x="15" y="85" fill="#ccfbf1" fontSize="8">Acquire distributed lock:</text>
                  <text x="15" y="105" fill="#a7f3d0" fontSize="8" fontFamily="monospace">with lock.acquire(key):</text>
                  <text x="15" y="130" fill="#ccfbf1" fontSize="8">• Only 1 process queries DB</text>
                  <text x="15" y="150" fill="#ccfbf1" fontSize="8">• Other 999 requests wait</text>
                  <text x="15" y="180" fill="#86efac" fontSize="8" fontWeight="bold">Prevents DB Crash ✅</text>
                </g>

                {/* Arrow 2 */}
                <path d="M 565 125 L 595 125" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* Step 3: DB Fetch & Cache Populate */}
                <g transform="translate(605, 50)">
                  <rect x="0" y="35" width="215" height="180" rx="6" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="15" y="60" fill="#e0e7ff" fontSize="11" fontWeight="bold">3. Fetch &amp; Re-populate</text>
                  <text x="15" y="85" fill="#c7d2fe" fontSize="8" fontFamily="monospace">data = db.query(key)</text>
                  <text x="15" y="105" fill="#c7d2fe" fontSize="8" fontFamily="monospace">redis.setex(key, 300, data)</text>
                  <text x="15" y="135" fill="#e0e7ff" fontSize="8">Sets 5-minute TTL.</text>
                  <text x="15" y="155" fill="#e0e7ff" fontSize="8">Releases lock.</text>
                  <text x="15" y="180" fill="#86efac" fontSize="8" fontWeight="bold">Cache Warm &amp; Ready ✅</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  THE CAP THEOREM DISTRIBUTED TRADEOFF MATRIX
                </text>

                {/* CAP Triangle Grid */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* CP System */}
                  <rect x="25" y="35" width="240" height="180" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="35" y="60" fill="#5eead4" fontSize="11" fontWeight="bold">1. CP (Consistency + Partition)</text>
                  <text x="35" y="85" fill="#ccfbf1" fontSize="8">• Strict Data Correctness</text>
                  <text x="35" y="105" fill="#ccfbf1" fontSize="8">• Rejects writes on network split</text>
                  <text x="35" y="125" fill="#a7f3d0" fontSize="8">• Examples: PostgreSQL, Redis, HBase</text>
                  <text x="35" y="150" fill="#fde047" fontSize="8">• Use: Student Fee &amp; Ledger Transfers</text>
                  <text x="35" y="195" fill="#86efac" fontSize="8" fontWeight="bold">Zero Balance Inconsistencies ✅</text>

                  {/* AP System */}
                  <rect x="290" y="35" width="240" height="180" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="300" y="60" fill="#e0f2fe" fontSize="11" fontWeight="bold">2. AP (Availability + Partition)</text>
                  <text x="300" y="85" fill="#bae6fd" fontSize="8">• 100% Uptime Guaranteed</text>
                  <text x="300" y="105" fill="#bae6fd" fontSize="8">• Eventual Consistency</text>
                  <text x="300" y="125" fill="#bae6fd" fontSize="8">• Examples: Cassandra, DynamoDB, DNS</text>
                  <text x="300" y="150" fill="#fde047" fontSize="8">• Use: Campus Noticeboard &amp; Social</text>
                  <text x="300" y="195" fill="#38bdf8" fontSize="8" fontWeight="bold">Never Drops Client Traffic ✅</text>

                  {/* CA System */}
                  <rect x="555" y="35" width="240" height="180" rx="6" fill="#4c0519" stroke="#f43f5e" />
                  <text x="565" y="60" fill="#fda4af" fontSize="11" fontWeight="bold">3. CA (Single Node Only)</text>
                  <text x="565" y="85" fill="#fecdd3" fontSize="8">• Consistency + Availability</text>
                  <text x="565" y="105" fill="#fca5a5" fontSize="8">• Impossible in Distributed Networks!</text>
                  <text x="565" y="125" fill="#fecdd3" fontSize="8">• Only exists on single monolithic DB</text>
                  <text x="565" y="150" fill="#fb7185" fontSize="8">• Network partitions are inevitable</text>
                  <text x="565" y="195" fill="#fb7185" fontSize="8" fontWeight="bold">Not Fault Tolerant ⚠️</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE SYSTEM DESIGN TRAFFIC SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive High-Concurrency Traffic &amp; Scaling Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Adjust incoming traffic loads to observe automatic worker pod scaling, Redis cache hit efficiencies, and Token Bucket rate limiting throttling:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Load Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Select Simulation Traffic Scenario:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: "NORMAL", label: "Normal Daily Load (1k RPS)", desc: "Standard multi-campus operations" },
                  { id: "PEAK", label: "Admission Surge (45k RPS)", desc: "Merit result publishing day" },
                  { id: "SURGE", label: "DDoS Surge (250k RPS)", desc: "Brute-force attack & massive traffic" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTrafficLoadMode(item.id)}
                    className={clsx(
                      "p-3 rounded-xl border text-left transition-all",
                      trafficLoadMode === item.id
                        ? item.id === "SURGE"
                          ? "bg-rose-950/60 border-rose-500 shadow-md shadow-rose-950/50"
                          : "bg-teal-950/60 border-teal-500 shadow-md shadow-teal-950/50"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                    )}
                  >
                    <div className="text-xs font-bold text-slate-200">{item.label}</div>
                    <div className="text-[10px] text-cyan-400 font-mono mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Architecture Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-teal-900/50">
                <div className="text-[11px] text-teal-400 font-medium mb-1">Throughput Rate</div>
                <div className="text-lg font-bold font-mono text-teal-300">{rpsMetric}</div>
              </div>

              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-cyan-900/50">
                <div className="text-[11px] text-cyan-400 font-medium mb-1">Active Backend Pods</div>
                <div className="text-xs font-bold font-mono text-cyan-300">{activeWorkers}</div>
              </div>

              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-purple-900/50">
                <div className="text-[11px] text-purple-400 font-medium mb-1">Cache Hit Ratio</div>
                <div className="text-xs font-bold font-mono text-purple-300">{cacheHitRate}</div>
              </div>

              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-amber-900/50">
                <div className="text-[11px] text-amber-400 font-medium mb-1">Database CPU Load</div>
                <div className="text-xs font-bold font-mono text-amber-300">{dbLoadPercent}</div>
              </div>
            </div>

            {/* Rate Limiting Firewall Banner */}
            <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold">API Gateway Token Bucket Filter:</span>
              <span className={clsx(
                "px-2.5 py-1 rounded font-semibold",
                trafficLoadMode === "SURGE" ? "bg-rose-950 text-rose-300 border border-rose-800" : "bg-emerald-950 text-emerald-300 border border-emerald-800"
              )}>
                {rateLimitStatus}
              </span>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: DEEP DIVE CODE LABS (PYTHON FILE LOADERS) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Production Code Labs &amp; Distributed Backend Engines
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade system design labs covering load balancing algorithms, Cache-Aside with stampede protection, Token Bucket rate limiting, and the complete institutional distributed backend case study:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: Load Balancing &amp; Stateless Worker Dispatch
                </h3>
                <p className="text-sm text-slate-400">
                  Implementing Round Robin and Least Connections request distribution across multi-campus stateless backend instances.
                </p>
              </div>
              <PythonFileLoader
                fileModule={horizontalScalingCode}
                title="horizontal_scaling_stateless_architecture.py"
                highlightLines={[18, 30, 44, 58]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: Cache-Aside Pattern, TTL Invalidation &amp; Mutex Stampede Defense
                </h3>
                <p className="text-sm text-slate-400">
                  Defending databases against Thundering Herd spikes using distributed mutex locking and automatic TTL expiration.
                </p>
              </div>
              <PythonFileLoader
                fileModule={cachingCode}
                title="caching_strategies_and_invalidation.py"
                highlightLines={[20, 36, 52, 68]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: Token Bucket Rate Limiting Algorithm &amp; Throttling
                </h3>
                <p className="text-sm text-slate-400">
                  Thread-safe Token Bucket algorithm accommodating traffic bursts while throttling abusive requests with HTTP 429.
                </p>
              </div>
              <PythonFileLoader
                fileModule={rateLimitingCode}
                title="rate_limiting_and_token_bucket.py"
                highlightLines={[12, 22, 34, 46]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Complete Institutional Distributed Backend Hub Case Study
                </h3>
                <p className="text-sm text-slate-400">
                  End-to-end backend architecture coordinating master write pathways, cache invalidation, and 500+ cached queries for Mamata across Barrackpore and Kolkata.
                </p>
              </div>
              <PythonFileLoader
                fileModule={distributedBackendCaseCode}
                title="institutional_distributed_backend_case_study.py"
                highlightLines={[18, 30, 48, 62]}
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: COMMON PITFALLS & ANTI-PATTERNS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Backend System Design Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Stateful Application Servers
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Storing user login sessions in server RAM breaks horizontal auto-scaling and drops user logins when servers restart.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: global_sessions[user_id] = session{'\n'}
                # BEST PRACTICE: Store in Redis Key-Value Store
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Unbounded Cache Without TTL
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Writing items into in-memory caches without TTLs or eviction policies causes Redis to run out of memory (OOM crash).
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: redis.set(key, val) (No TTL!){'\n'}
                # BEST PRACTICE: redis.setex(key, 300, val)
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Direct Database Hits on Every Request
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Querying the SQL database for static data (like course catalogs) on every HTTP request brings the master DB down during traffic spikes.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: Use Cache-Aside pattern + Read Replicas
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Synchronous Heavy I/O in HTTP Handlers
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Generating 50-page PDF invoices inside the HTTP request handler blocks web worker threads from processing incoming traffic.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: Offload to Celery: generate_pdf_task.delay(sid)
              </pre>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: BEST PRACTICES CHECKLIST */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">✅</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              6. Backend System Design Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Keep Web Servers Stateless:</strong> Externalize all session tokens and cache keys to Redis or Memcached.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Implement Cache-Aside with Mutex:</strong> Prevent Thundering Herd database crashes on cache misses.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Rate-Limit Gateway Endpoints:</strong> Use Token Bucket algorithms to protect APIs from abuse and DoS attacks.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Asynchronous Task Offloading:</strong> Use Celery workers to handle slow I/O and PDF generation.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="System Design &amp; Scalable Python Backends FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 6: System Design Basics for Python Backends Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "Building software that works for 10 users is easy; building software that maintains sub-millisecond response times during a 50,000-student admission surge requires rigorous system design. In our institutional multi-campus architecture across Barrackpore, Kolkata, Ichapur, and Jadavpur, combining stateless Gunicorn workers, Redis Cache-Aside, Token Bucket rate limiting, and primary-replica database replication guarantees that Mamata, Mahima, and Susmita can check merit rankings and settle tuition fees instantly without system downtime."
            }
          />
        </section>

      </div>
    </div>
  );
}
