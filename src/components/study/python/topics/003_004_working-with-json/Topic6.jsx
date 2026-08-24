import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import urllibApi from "./topic6_files/consuming_apis_with_standard_urllib.py?raw";
import requestsApi from "./topic6_files/consuming_apis_with_requests_library.py?raw";
import resilientClient from "./topic6_files/resilient_api_client_with_retry_and_timeout.py?raw";
import forexConsumer from "./topic6_files/institutional_weather_and_forex_api_consumer.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic6_files/topic6_note.txt?raw";

// FAQ Questions
import questions from "./topic6_files/topic6_questions";

/**
 * Topic6: Consuming REST API data using urllib / requests
 * Module: 003_004_working-with-json
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic6() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("comparison");

  // Interactive REST API Client Laboratory State
  const [endpoint, setEndpoint] = useState("/api/v1/forex/inr-rates");
  const [clientLib, setClientLib] = useState("requests"); // requests | urllib
  const [timeoutSec, setTimeoutSec] = useState(5.0);
  const [enableBackoff, setEnableBackoff] = useState(true);
  const [enableCache, setEnableCache] = useState(true);
  const [cacheStore, setCacheStore] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [responseLog, setResponseLog] = useState({
    status: 200,
    statusText: "OK",
    latencyMs: 142,
    isCacheHit: false,
    attempts: 1,
    data: {
      base_currency: "INR",
      rates: { USD: 0.0118, EUR: 0.0109, GBP: 0.0093 },
      timestamp: "2026-08-24T10:00:00Z",
    },
  });

  const handleSendRequest = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const now = Date.now();

      // Check Cache
      if (enableCache && cacheStore[endpoint]) {
        const ageSec = (now - cacheStore[endpoint].timestamp) / 1000;
        if (ageSec < 30) {
          setResponseLog({
            status: 200,
            statusText: "200 OK (Cache Hit)",
            latencyMs: 4,
            isCacheHit: true,
            attempts: 1,
            data: cacheStore[endpoint].data,
          });
          return;
        }
      }

      // Simulate Network Request
      if (endpoint === "/api/v1/weather/barrackpore") {
        const resData = {
          campus: "Barrackpore Main Campus",
          weather: "Clear Skies",
          temp_celsius: 31.4,
          humidity_pct: 68,
          timestamp: new Date().toISOString(),
        };
        if (enableCache) {
          setCacheStore((prev) => ({ ...prev, [endpoint]: { data: resData, timestamp: now } }));
        }
        setResponseLog({
          status: 200,
          statusText: "200 OK",
          latencyMs: Math.floor(Math.random() * 80) + 110,
          isCacheHit: false,
          attempts: 1,
          data: resData,
        });
      } else if (endpoint === "/api/v1/forex/inr-rates") {
        const resData = {
          base_currency: "INR",
          rates: { USD: 0.0118, EUR: 0.0109, GBP: 0.0093 },
          tuition_usd: 336.3,
          tuition_eur: 310.65,
          timestamp: new Date().toISOString(),
        };
        if (enableCache) {
          setCacheStore((prev) => ({ ...prev, [endpoint]: { data: resData, timestamp: now } }));
        }
        setResponseLog({
          status: 200,
          statusText: "200 OK",
          latencyMs: Math.floor(Math.random() * 90) + 120,
          isCacheHit: false,
          attempts: 1,
          data: resData,
        });
      } else if (endpoint === "/api/v1/admissions/verify") {
        const resData = {
          status: "VERIFIED",
          student_id: "STU-101",
          course: "Python AI & Decorators",
          token: "SEAL-2026-AUTH-TOKEN-OK",
        };
        setResponseLog({
          status: 201,
          statusText: "201 Created",
          latencyMs: Math.floor(Math.random() * 120) + 160,
          isCacheHit: false,
          attempts: 1,
          data: resData,
        });
      } else {
        // Flakey 503 endpoint
        if (enableBackoff) {
          const resData = {
            status: "OK_AFTER_RETRIES",
            server: "srv-backup-barrackpore",
            message: "Recovered from 503 Service Unavailable via Exponential Backoff (Attempt #3)",
          };
          setResponseLog({
            status: 200,
            statusText: "200 OK (Recovered via Retries)",
            latencyMs: 740,
            isCacheHit: false,
            attempts: 3,
            data: resData,
          });
        } else {
          setResponseLog({
            status: 503,
            statusText: "503 Service Unavailable",
            latencyMs: 210,
            isCacheHit: false,
            attempts: 1,
            data: { error: "Gateway Busy: Connection refused on primary server." },
          });
        }
      }
    }, 280);
  };

  const handlePurgeCache = () => {
    setCacheStore({});
    setResponseLog((prev) => ({
      ...prev,
      isCacheHit: false,
      statusText: prev.statusText.replace(" (Cache Hit)", ""),
    }));
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
            Segment 3 • Module 003_004
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 6
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Working with JSON &amp; External Data APIs
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Consuming REST APIs: <span className="text-teal-400">`urllib` vs `requests`</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master production REST API consumption in Python: standard library <code className="text-teal-300 font-mono">urllib.request</code> vs modern <code className="text-teal-300 font-mono">requests</code>, automatic JSON payloads (<code className="text-cyan-300 font-mono">json=&#123;...&#125;</code>), error handling with <code className="text-cyan-300 font-mono">response.raise_for_status()</code>, timeouts, exponential backoff retries, and local TTL disk caching.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📦 `urllib.request` (Zero-Deps)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ `requests.get()` &amp; `.json()`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⏱️ Mandatory Timeouts (`timeout=5.0`)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 Exponential Backoff &amp; TTL Cache
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: URLLIB VS REQUESTS FOUNDATIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🌐</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. REST API Consumption: `urllib` vs `requests`
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Python provides two primary mechanisms to interact with HTTP/JSON REST APIs:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ `urllib.request`</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">urllib.request.urlopen()</code>
                <p className="text-[11px] text-slate-300">
                  Built-in standard library with zero external dependencies. Reads raw response byte streams.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ `requests` Library</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">res = requests.get(...)</code>
                <p className="text-[11px] text-slate-300">
                  Human-friendly third-party library with automatic JSON serialization, headers, and connection pooling.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ `raise_for_status()`</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">res.raise_for_status()</code>
                <p className="text-[11px] text-slate-300">
                  Essential status check preventing unhandled 4xx/5xx HTTP errors from propagating silently.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Infinite Timeout Hazard
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                By default, both <code className="text-teal-300 font-mono">urllib.request.urlopen()</code> and <code className="text-teal-300 font-mono">requests.get()</code> have NO default timeout. A stalled server or broken network socket will block the Python thread indefinitely. Always specify <code className="text-cyan-300 font-mono">timeout=5.0</code> in production!
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
                2. Visualizing HTTP Pipelines, Backoff Retries &amp; TTL Cache
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("comparison")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "comparison"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                `urllib` vs `requests`
              </button>
              <button
                onClick={() => setActiveInteractiveTab("lifecycle")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "lifecycle"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                HTTP Request Lifecycle
              </button>
              <button
                onClick={() => setActiveInteractiveTab("resilience")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "resilience"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Retry &amp; TTL Cache
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining syntax differences, HTTP connection lifecycles, and resilient exponential backoff retry patterns:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "comparison" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">`urllib.request` (BUILT-IN) VS `requests` (THIRD-PARTY)</text>

                {/* Left: urllib */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">1. Standard Library `urllib.request`</text>
                  
                  <text x="20" y="58" fill="#ecfdf5" fontSize="8 font-mono">{"req = urllib.request.Request(url, headers={...})"}</text>
                  <text x="20" y="75" fill="#34d399" fontSize="8 font-mono">with urllib.request.urlopen(req, timeout=5) as res:</text>
                  <text x="35" y="92" fill="#34d399" fontSize="8 font-mono">data = json.load(res)</text>

                  <rect x="20" y="115" width="340" height="100" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="138" fill="#34d399" fontSize="9 font-bold">Standard Library Characteristics:</text>
                  <text x="30" y="158" fill="#cbd5e1" fontSize="8">• 0 external dependencies (Standard Python install)</text>
                  <text x="30" y="173" fill="#cbd5e1" fontSize="8">• Low-level byte stream handling (requires json.load)</text>
                  <text x="30" y="188" fill="#cbd5e1" fontSize="8">• Manual URL encoding via urllib.parse.urlencode()</text>
                </g>

                {/* Right: requests */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="30" fill="#a5f3fc" fontSize="12" fontWeight="bold">2. Third-Party `requests`</text>

                  <text x="20" y="58" fill="#ecfdf5" fontSize="8 font-mono">{"res = requests.get(url, params={...}, timeout=5)"}</text>
                  <text x="20" y="75" fill="#38bdf8" fontSize="8 font-mono">res.raise_for_status()</text>
                  <text x="20" y="92" fill="#38bdf8" fontSize="8 font-mono">data = res.json()</text>

                  <rect x="20" y="115" width="340" height="100" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="30" y="138" fill="#38bdf8" fontSize="9 font-bold">Industry Standard Characteristics:</text>
                  <text x="30" y="158" fill="#cbd5e1" fontSize="8">• Human-friendly API with automatic JSON serialization</text>
                  <text x="30" y="173" fill="#cbd5e1" fontSize="8">• Connection pooling and automatic keep-alive sessions</text>
                  <text x="30" y="188" fill="#cbd5e1" fontSize="8">• Native response.json() and raise_for_status()</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "lifecycle" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">HTTP CLIENT-SERVER REQUEST/RESPONSE LIFECYCLE</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11 font-bold">1. Outgoing Request</text>
                  <text x="15" y="55" fill="#38bdf8" fontSize="8 font-mono">POST /api/v1/admissions</text>
                  <text x="15" y="75" fill="#ecfdf5" fontSize="8 font-mono">Headers: Content-Type: json</text>
                  <text x="15" y="95" fill="#34d399" fontSize="8 font-mono">Body: &#123;"student": "Sourav"&#125;</text>

                  <rect x="15" y="115" width="220" height="100" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="25" y="140" fill="#c4b5fd" fontSize="9 font-bold">Client Serialization:</text>
                  <text x="25" y="160" fill="#cbd5e1" fontSize="8">Dict converted to UTF-8</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">bytes over TCP socket.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Server Processing</text>
                  <text x="310" y="55" fill="#ecfdf5" fontSize="8 font-mono">HTTP 201 Created</text>
                  <text x="310" y="75" fill="#38bdf8" fontSize="8 font-mono">Headers: App/JSON</text>
                  <text x="310" y="95" fill="#34d399" fontSize="8 font-mono">Body: &#123;"token": "SEAL-OK"&#125;</text>

                  <rect x="310" y="115" width="220" height="100" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="140" fill="#38bdf8" fontSize="9 font-bold">Remote Execution:</text>
                  <text x="320" y="160" fill="#cbd5e1" fontSize="8">Database transaction</text>
                  <text x="320" y="175" fill="#cbd5e1" fontSize="8">committed on server.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="605" y="30" fill="#a7f3d0" fontSize="11 font-bold">3. Ingestion &amp; Deserialization</text>
                  <text x="605" y="55" fill="#34d399" fontSize="8 font-mono">res.raise_for_status()</text>
                  <text x="605" y="75" fill="#34d399" fontSize="8 font-mono">data = res.json()</text>
                  <text x="605" y="95" fill="#ecfdf5" fontSize="8 font-mono">print(data["token"])</text>

                  <rect x="605" y="115" width="200" height="100" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="615" y="140" fill="#34d399" fontSize="9 font-bold">Parsed Native Python:</text>
                  <text x="615" y="160" fill="#cbd5e1" fontSize="8">Ready for business</text>
                  <text x="615" y="175" fill="#cbd5e1" fontSize="8">logic execution.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">EXPONENTIAL BACKOFF RETRY &amp; LOCAL TTL DISK CACHE</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="15" y="30" fill="#a5f3fc" fontSize="11 font-bold">1. Check Local TTL Cache</text>
                  <text x="15" y="55" fill="#38bdf8" fontSize="8 font-mono">if now - cached_at &lt; 300:</text>
                  <text x="15" y="75" fill="#34d399" fontSize="8 font-mono font-bold">return cache["forex"]</text>

                  <rect x="15" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="25" y="135" fill="#38bdf8" fontSize="9 font-bold">Cache Hit (4ms):</text>
                  <text x="25" y="155" fill="#cbd5e1" fontSize="8">Eliminates network latency</text>
                  <text x="25" y="170" fill="#cbd5e1" fontSize="8">and preserves API quota.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="310" y="30" fill="#fda4af" fontSize="11 font-bold">2. Transient 503 Flake</text>
                  <text x="310" y="55" fill="#fca5a5" fontSize="8 font-mono">Attempt #1: 503 -&gt; Sleep 0.5s</text>
                  <text x="310" y="75" fill="#fca5a5" fontSize="8 font-mono">Attempt #2: 503 -&gt; Sleep 1.0s</text>

                  <rect x="310" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="320" y="135" fill="#fda4af" fontSize="9 font-bold">Exponential Delay:</text>
                  <text x="320" y="155" fill="#cbd5e1" fontSize="8">Doubles wait interval to</text>
                  <text x="320" y="170" fill="#cbd5e1" fontSize="8">prevent server thundering herd.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="605" y="30" fill="#a7f3d0" fontSize="11 font-bold">3. Successful Ingestion</text>
                  <text x="605" y="55" fill="#34d399" fontSize="8 font-mono">Attempt #3: 200 OK</text>
                  <text x="605" y="75" fill="#34d399" fontSize="8 font-mono">Save to Cache + Return</text>

                  <rect x="605" y="110" width="200" height="105" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="615" y="135" fill="#34d399" fontSize="9 font-bold">Resilient Ingestion:</text>
                  <text x="615" y="155" fill="#cbd5e1" fontSize="8">Automated self-healing</text>
                  <text x="615" y="170" fill="#cbd5e1" fontSize="8">without downtime.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE REST API CLIENT LABORATORY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive REST API Client &amp; Local TTL Cache Laboratory
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Send live simulated HTTP requests to institutional weather, forex, admission, and flakey 503 endpoints, test exponential backoff self-healing, and observe local TTL cache performance:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Endpoint Selector
                </span>
                <button
                  onClick={handlePurgeCache}
                  className="text-[11px] text-rose-400 hover:text-white underline font-mono"
                >
                  Purge Local Cache
                </button>
              </div>

              <select
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="w-full bg-slate-900 text-slate-100 font-mono text-xs p-2.5 rounded-lg border border-slate-800 focus:border-teal-500 focus:outline-none"
              >
                <option value="/api/v1/forex/inr-rates">GET /api/v1/forex/inr-rates (Forex Exchange Rates)</option>
                <option value="/api/v1/weather/barrackpore">GET /api/v1/weather/barrackpore (Campus Weather)</option>
                <option value="/api/v1/admissions/verify">POST /api/v1/admissions/verify (Enrollment Verification)</option>
                <option value="/api/v1/server/flakey-503">GET /api/v1/server/flakey-503 (Transient 503 Server Gateway)</option>
              </select>

              {/* Client Library & Options */}
              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-300">Client Engine:</span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  <button
                    onClick={() => setClientLib("requests")}
                    className={clsx(
                      "flex-1 py-1.5 rounded transition-all",
                      clientLib === "requests"
                        ? "bg-teal-900/60 text-teal-300 font-bold border border-teal-700/80"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    `requests` (Recommended)
                  </button>
                  <button
                    onClick={() => setClientLib("urllib")}
                    className={clsx(
                      "flex-1 py-1.5 rounded transition-all",
                      clientLib === "urllib"
                        ? "bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-700/80"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    `urllib.request` (Zero-Deps)
                  </button>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-2 text-xs font-mono pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableBackoff}
                    onChange={(e) => setEnableBackoff(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Enable Exponential Backoff Retries on 503 Errors</span>
                </label>

                <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableCache}
                    onChange={(e) => setEnableCache(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Enable Local Disk TTL Cache (30s Expiration)</span>
                </label>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendRequest}
                disabled={isLoading}
                className="w-full py-3 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-800 text-white font-mono text-xs font-bold rounded-lg transition-all shadow-lg shadow-teal-950/50"
              >
                {isLoading ? "Sending HTTP Request..." : `Execute ${clientLib.toUpperCase()} Request`}
              </button>
            </div>

            {/* Response Inspector */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Telemetry Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Status Code</span>
                  <span className={clsx("font-bold text-sm", responseLog.status < 400 ? "text-emerald-400" : "text-rose-400")}>
                    {responseLog.status}
                  </span>
                </div>

                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Latency</span>
                  <span className="font-bold text-sm text-cyan-300">
                    {responseLog.latencyMs} ms
                  </span>
                </div>

                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Cache Source</span>
                  <span className={clsx("font-bold text-sm", responseLog.isCacheHit ? "text-purple-300" : "text-slate-400")}>
                    {responseLog.isCacheHit ? "CACHE HIT" : "NETWORK"}
                  </span>
                </div>
              </div>

              {/* Response Body Preview */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[190px] font-mono text-xs space-y-1">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase text-slate-400 mb-1">
                  <span>Deserialized JSON Response:</span>
                  <span>Attempts: {responseLog.attempts}</span>
                </div>
                <pre className="text-slate-200 text-[11px] leading-relaxed">
                  {JSON.stringify(responseLog.data, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER REST API CLIENT MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master REST API Client Feature Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Operation</th>
                  <th className="py-3.5 px-4 font-bold">Standard `urllib.request`</th>
                  <th className="py-3.5 px-4 font-bold">Third-Party `requests`</th>
                  <th className="py-3.5 px-4 font-bold">Best Practice Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">GET Request</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`urlopen(url, timeout=5)`</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono">`requests.get(url, timeout=5)`</td>
                  <td className="py-3 px-4">Use `requests.get()` for clean syntax</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">JSON POST Body</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`Request(url, data=bytes)`</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono">`requests.post(url, json=dict)`</td>
                  <td className="py-3 px-4">{"`json={...}`"} sets headers &amp; serializes automatically</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">JSON Parsing</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`json.load(response)`</td>
                  <td className="py-3 px-4 text-purple-300 font-mono">`response.json()`</td>
                  <td className="py-3 px-4">Both are direct in-memory parsers</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Status Code Check</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`except HTTPError as e`</td>
                  <td className="py-3 px-4 text-amber-300 font-mono">`response.raise_for_status()`</td>
                  <td className="py-3 px-4">Always invoke `raise_for_status()`</td>
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
            Explore 4 production-grade Python scripts demonstrating standard urllib, modern requests, resilient retry clients, and institutional forex &amp; weather caching engines:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "consuming_apis_with_standard_urllib.py",
                code: urllibApi,
                description: "Consuming REST APIs with built-in urllib.request, custom headers, and stream parsing.",
              },
              {
                filename: "consuming_apis_with_requests_library.py",
                code: requestsApi,
                description: "Modern REST API consumption with requests.get, requests.post, json=, and response.json().",
              },
              {
                filename: "resilient_api_client_with_retry_and_timeout.py",
                code: resilientClient,
                description: "Resilient API client with mandatory timeouts, exponential backoff retries, and fallbacks.",
              },
              {
                filename: "institutional_weather_and_forex_api_consumer.py",
                code: forexConsumer,
                description: "Institutional Forex & Weather API consumer with local disk TTL caching engine.",
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
                <span>❌</span> Trap 1: Omission of Request Timeouts
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                By default, requests has NO timeout. If a remote server hangs, your worker thread is trapped indefinitely, causing catastrophic thread pool starvation.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> ALWAYS pass <code className="text-emerald-300">timeout=5.0</code> to every HTTP call.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Silent Failures Without `raise_for_status()`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If an API returns 404 or 500 with a JSON error body, calling <code className="text-amber-300 font-mono">res.json()</code> succeeds and processes error messages as valid data!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always invoke <code className="text-emerald-300">res.raise_for_status()</code> before parsing.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Retry Storms Without Backoff
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Retrying immediately in a tight loop during server outages overwhelms the struggling server and causes permanent blackouts.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use exponential backoff (<code className="text-emerald-300">time.sleep(backoff); backoff *= 2</code>).
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Exhausting Rate Limit Quotas
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Re-fetching static exchange rates or weather feeds on every user hit triggers HTTP 429 Too Many Requests and exhausts billable API quotas.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Cache responses locally with a Time-To-Live (TTL) timestamp.
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
            Comprehensive question-and-answer repository covering urllib, requests, timeouts, exponential backoff, raise_for_status, and TTL caching:
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
            Download or print the complete reference sheet with urllib and requests recipes, exponential backoff templates, and TTL cache implementations:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic6_consuming_rest_apis_notes.txt"
              title="Print Topic 6 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
