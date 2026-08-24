import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import infiniteStreams from "./topic11_files/infinite_stream_generators_and_itertools.py?raw";
import chunkedFileStreamer from "./topic11_files/chunked_large_file_and_log_streamer.py?raw";
import slidingMetrics from "./topic11_files/sliding_window_realtime_metrics_aggregator.py?raw";
import enterpriseMonitor from "./topic11_files/institutional_enterprise_telemetry_stream_monitor.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic11_files/topic11_note.txt?raw";

// FAQ Questions
import questions from "./topic11_files/topic11_questions";

/**
 * Topic11: Infinite streams and large data processing with generators
 * Module: 003_003_decorators-generators
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic11() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("infinite");

  // Interactive Telemetry Stream Simulator State
  const sampleEndpoints = [
    { ip: "103.21.14.50", path: "/api/v1/auth/login", status: 200, latency: 32.5 },
    { ip: "103.21.14.50", path: "/api/v1/student/dashboard", status: 200, latency: 48.0 },
    { ip: "45.122.90.11", path: "/admin/config/db_dump", status: 403, latency: 14.2 },
    { ip: "103.21.14.88", path: "/api/v1/exam/submit", status: 200, latency: 85.0 },
    { ip: "45.122.90.11", path: "/.env", status: 404, latency: 9.5 },
    { ip: "103.21.14.92", path: "/api/v1/certificates/download", status: 500, latency: 420.0 },
    { ip: "103.21.14.50", path: "/api/v1/fee/receipt", status: 200, latency: 38.0 },
  ];

  const [streamSeq, setStreamSeq] = useState(0);
  const [isLiveRunning, setIsLiveRunning] = useState(false);
  const [filterAnomaliesOnly, setFilterAnomaliesOnly] = useState(false);
  const [windowSize, setWindowSize] = useState(4);
  const [recentEvents, setRecentEvents] = useState([]);
  const [rollingBuffer, setRollingBuffer] = useState([]);

  // Generate next stream item
  const stepNextEvent = () => {
    setStreamSeq((prevSeq) => {
      const nextSeq = prevSeq + 1;
      const raw = sampleEndpoints[(nextSeq - 1) % sampleEndpoints.length];
      const isAnomaly = raw.status >= 400 || raw.latency >= 300.0;

      const event = {
        seq: nextSeq,
        reqId: `REQ-${String(nextSeq).padStart(6, "0")}`,
        ip: raw.ip,
        path: raw.path,
        status: raw.status,
        latency: raw.latency,
        isAnomaly,
      };

      setRecentEvents((prev) => [event, ...prev.slice(0, 19)]); // Keep last 20

      setRollingBuffer((prevBuf) => {
        const newBuf = [...prevBuf, raw.latency].slice(-windowSize);
        return newBuf;
      });

      return nextSeq;
    });
  };

  // Auto-stream interval timer
  useEffect(() => {
    let timer = null;
    if (isLiveRunning) {
      timer = setInterval(() => {
        stepNextEvent();
      }, 750);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isLiveRunning, windowSize]);

  // Rolling Average
  const movingAvgLatency =
    rollingBuffer.length > 0
      ? (rollingBuffer.reduce((a, b) => a + b, 0) / rollingBuffer.length).toFixed(1)
      : "0.0";

  const displayedEvents = filterAnomaliesOnly
    ? recentEvents.filter((e) => e.isAnomaly)
    : recentEvents;

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
            Topic 11 • Final Topic
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Decorators, Generators &amp; Iterators
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Infinite Streams &amp; <span className="text-teal-400">Large Data Processing</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master high-throughput streaming architectures in Python: generating unbounded streams (<code className="text-teal-300 font-mono">while True: yield</code>), safe stream bounding with <code className="text-cyan-300 font-mono">itertools.islice</code> and <code className="text-cyan-300 font-mono">itertools.takewhile</code>, chunked multi-gigabyte log streaming with <code className="text-purple-300 font-mono">try...finally</code> cleanup, and real-time sliding window metrics.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ♾️ Infinite Streams (while True)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ✂️ itertools.islice &amp; takewhile
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📁 Chunked Large File Streaming
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ try...finally &amp; gen.close() Cleanup
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: INFINITE STREAMS FOUNDATIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🌊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Architecture of Infinite Data Streams
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In production systems, real-world data feeds (IoT telemetry, stock tickers, web server access logs) are infinite. Generators provide the only memory-safe mechanism to process unbounded streams:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Unbounded Generator</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">while True: yield data</code>
                <p className="text-[11px] text-slate-300">
                  Produces elements continuously on demand. Memory stays constant <code className="text-teal-300">O(1)</code>.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ itertools Slicing</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">itertools.islice(gen, N)</code>
                <p className="text-[11px] text-slate-300">
                  Safely bounds consumption to N items without loading or freezing Python.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Guaranteed Teardown</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">try...finally: close()</code>
                <p className="text-[11px] text-slate-300">
                  <code className="text-purple-300">gen.close()</code> raises <code className="text-purple-300">GeneratorExit</code> to safely close sockets and file descriptors.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                How Generators Handle Backpressure Automatically
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Because Python generators are <strong>pull-based</strong> (evaluating solely upon <code className="text-teal-300 font-mono">next()</code> calls), fast producers never overwhelm slow consumers. Data is generated only at the exact rate the consumer processes it!
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
                2. Visualizing Slicing, File Streaming &amp; Rolling Deques
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("infinite")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "infinite"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                `itertools.islice` Slicing
              </button>
              <button
                onClick={() => setActiveInteractiveTab("chunked")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "chunked"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Chunked File Streaming
              </button>
              <button
                onClick={() => setActiveInteractiveTab("rolling")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "rolling"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Rolling `deque(maxlen=N)`
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining unbounded stream bounding, leak-free file streaming, and fixed-capacity rolling sliding windows:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "infinite" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">BOUNDING INFINITE STREAM GENERATORS SAFELY WITH `itertools.islice`</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">1. Infinite Stream Source</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="8 font-mono">def heartbeat_stream():</text>
                  <text x="30" y="75" fill="#34d399" fontSize="8 font-mono font-bold">while True: yield ping()</text>

                  <rect x="15" y="110" width="220" height="105" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="135" fill="#34d399" fontSize="9 font-bold">Unbounded Producer:</text>
                  <text x="25" y="155" fill="#cbd5e1" fontSize="8">Emits telemetry continuous</text>
                  <text x="25" y="170" fill="#cbd5e1" fontSize="8">without internal stop condition.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. `itertools.islice(gen, 5)`</text>
                  <text x="310" y="55" fill="#ecfdf5" fontSize="8 font-mono">counts items: 1, 2, 3, 4, 5</text>
                  <text x="310" y="75" fill="#38bdf8" fontSize="8 font-mono font-bold">raises StopIteration at 5</text>

                  <rect x="310" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="135" fill="#38bdf8" fontSize="9 font-bold">Safe Stream Governor:</text>
                  <text x="320" y="155" fill="#cbd5e1" fontSize="8">Intercepts consumption and</text>
                  <text x="320" y="170" fill="#cbd5e1" fontSize="8">halts after exactly N yields.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="605" y="30" fill="#c4b5fd" fontSize="11 font-bold">3. Consumer Finishes</text>
                  <text x="605" y="55" fill="#ecfdf5" fontSize="8 font-mono">for ping in islice_gen:</text>
                  <text x="620" y="75" fill="#34d399" fontSize="8 font-mono font-bold">process(ping)</text>

                  <rect x="605" y="110" width="200" height="105" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="615" y="135" fill="#c4b5fd" fontSize="9 font-bold">Clean Termination:</text>
                  <text x="615" y="155" fill="#cbd5e1" fontSize="8">No freezing, no infinite loops,</text>
                  <text x="615" y="170" fill="#cbd5e1" fontSize="8">and zero memory leakage.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "chunked" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">CHUNKED LARGE FILE STREAMING WITH GUARANTEED CLEANUP (`try...finally`)</text>

                {/* Left: Code Box */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">Generator Function with `try...finally`</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="9 font-mono">f = open("100GB_server.log", "r")</text>
                  <text x="20" y="80" fill="#34d399" fontSize="9 font-mono">try:</text>
                  <text x="35" y="100" fill="#ecfdf5" fontSize="9 font-mono">for line in f: yield parse(line)</text>
                  <text x="20" y="125" fill="#fca5a5" fontSize="9 font-mono font-bold">finally:</text>
                  <text x="35" y="145" fill="#fda4af" fontSize="9 font-mono font-bold">f.close()  # Guaranteed Teardown!</text>

                  <rect x="20" y="165" width="340" height="55" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="185" fill="#34d399" fontSize="9 font-bold">Resource Safety:</text>
                  <text x="30" y="202" fill="#ecfdf5" fontSize="8 font-mono">File closes even if consumer crashes or exits early!</text>
                </g>

                {/* Arrow */}
                <g transform="translate(425, 140)">
                  <text x="0" y="0" fill="#38bdf8" fontSize="12" fontWeight="bold">protects</text>
                  <text x="25" y="25" fill="#38bdf8" fontSize="26" fontWeight="bold">→</text>
                </g>

                {/* Right: Consumer Box */}
                <g transform="translate(480, 50)">
                  <rect x="0" y="0" width="370" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Consumer Early Exit via `gen.close()`</text>

                  <text x="20" y="60" fill="#ecfdf5" fontSize="9 font-mono">gen = stream_logs()</text>
                  <text x="20" y="80" fill="#ecfdf5" fontSize="9 font-mono">first_log = next(gen)</text>
                  <text x="20" y="105" fill="#c4b5fd" fontSize="9 font-mono font-bold">gen.close()  # Triggers GeneratorExit</text>

                  <rect x="20" y="135" width="330" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="160" fill="#c4b5fd" fontSize="9 font-bold">Zero Descriptor Leaks:</text>
                  <text x="30" y="180" fill="#cbd5e1" fontSize="8 font-mono">CPython raises `GeneratorExit` inside gen frame,</text>
                  <text x="30" y="198" fill="#a7f3d0" fontSize="8 font-mono">immediately executing `finally: f.close()`.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">REAL-TIME SLIDING WINDOW METRICS WITH `collections.deque(maxlen=N)`</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11 font-bold">1. Live Metric Influx</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="8 font-mono">incoming latency: 420.0 ms</text>
                  <text x="15" y="75" fill="#cbd5e1" fontSize="8">Appended to fixed-size deque.</text>

                  <rect x="15" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="25" y="135" fill="#c4b5fd" fontSize="9 font-bold">Stream Event:</text>
                  <text x="25" y="155" fill="#cbd5e1" fontSize="8">Continuous time-series latency</text>
                  <text x="25" y="170" fill="#cbd5e1" fontSize="8">measurements arrive.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. `deque(maxlen=4)`</text>
                  <text x="310" y="55" fill="#ecfdf5" fontSize="8 font-mono">auto-discards oldest item</text>
                  <text x="310" y="75" fill="#38bdf8" fontSize="8 font-mono font-bold">buffer = [32, 48, 85, 420]</text>

                  <rect x="310" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="135" fill="#38bdf8" fontSize="9 font-bold">Fixed Ring Buffer:</text>
                  <text x="320" y="155" fill="#cbd5e1" fontSize="8">Memory never grows beyond 4</text>
                  <text x="320" y="170" fill="#cbd5e1" fontSize="8">items regardless of stream size.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="605" y="30" fill="#a7f3d0" fontSize="11 font-bold">3. Yield Enriched Event</text>
                  <text x="605" y="55" fill="#ecfdf5" fontSize="8 font-mono">moving_avg = 146.2 ms</text>
                  <text x="605" y="75" fill="#34d399" fontSize="8 font-mono font-bold">is_spike = True (Alert!)</text>

                  <rect x="605" y="110" width="200" height="105" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="615" y="135" fill="#34d399" fontSize="9 font-bold">Enriched Telemetry:</text>
                  <text x="615" y="155" fill="#cbd5e1" fontSize="8">Emits actionable telemetry</text>
                  <text x="615" y="170" fill="#cbd5e1" fontSize="8">to downstream dashboards.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE ENTERPRISE TELEMETRY PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Enterprise Portal Telemetry Stream Monitor
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Monitor a live infinite stream of student portal traffic, calculate rolling average latencies with <code className="text-teal-300 font-mono">deque(maxlen=N)</code>, and intercept HTTP security anomalies in real time:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Stream Engine Controls
                </span>
                <button
                  onClick={() => {
                    setIsLiveRunning(false);
                    setStreamSeq(0);
                    setRecentEvents([]);
                    setRollingBuffer([]);
                  }}
                  className="text-[11px] font-mono text-slate-400 hover:text-white underline"
                >
                  Reset Telemetry Stream
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsLiveRunning(!isLiveRunning)}
                  className={clsx(
                    "flex-1 py-2.5 rounded-lg text-xs font-mono font-bold transition-all shadow-lg",
                    isLiveRunning
                      ? "bg-rose-600 hover:bg-rose-500 text-white"
                      : "bg-teal-600 hover:bg-teal-500 text-white shadow-teal-950/50"
                  )}
                >
                  {isLiveRunning ? "⏸️ Pause Live Stream" : "▶️ Start Live Auto-Stream (750ms)"}
                </button>
                <button
                  onClick={stepNextEvent}
                  disabled={isLiveRunning}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-mono font-bold transition-all"
                >
                  Step Single `next()`
                </button>
              </div>

              {/* Filter Anomaly Toggle */}
              <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer p-2 bg-slate-900 rounded border border-slate-800">
                <input
                  type="checkbox"
                  checked={filterAnomaliesOnly}
                  onChange={(e) => setFilterAnomaliesOnly(e.target.checked)}
                  className="accent-teal-500 rounded"
                />
                <span>Filter Security Threats &amp; HTTP Anomalies Only (Status &gt;= 400 or Latency &gt;= 300ms)</span>
              </label>

              {/* Sliding Window Size */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-xs font-mono text-slate-300">
                  <span>Rolling Deque Window Capacity (`maxlen`):</span>
                  <span className="text-cyan-300 font-bold">{windowSize} Requests</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="1"
                  value={windowSize}
                  onChange={(e) => setWindowSize(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Output & Telemetry Gauge */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Internal Metrics */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Real-Time Stream Metrics:
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Streamed Requests:</span>
                  <span className="text-teal-300 font-bold">{streamSeq} Requests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Rolling Moving Average Latency:</span>
                  <span className="text-emerald-400 font-bold">{movingAvgLatency} ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Stream Generator Memory:</span>
                  <span className="text-cyan-300 font-bold">112 Bytes (Constant O(1) RAM)</span>
                </div>
              </div>

              {/* Stream Event List */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] space-y-1.5 font-mono text-xs">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">
                  Recent Telemetry Events (Live Stream Window):
                </span>

                {displayedEvents.length === 0 ? (
                  <div className="text-slate-500 italic text-[11px]">
                    Click "Start Live Auto-Stream" or "Step Single next()" to ingest telemetry.
                  </div>
                ) : (
                  displayedEvents.map((e) => (
                    <div
                      key={e.seq}
                      className={clsx(
                        "p-1.5 rounded border flex justify-between text-[11px] transition-all",
                        e.isAnomaly
                          ? "bg-rose-950/60 border-rose-800 text-rose-200 font-bold"
                          : "bg-slate-950 border-slate-800 text-slate-300"
                      )}
                    >
                      <div>
                        <span>[{e.reqId}] {e.path}</span>
                        <span className="text-[10px] text-slate-500 block">IP: {e.ip}</span>
                      </div>
                      <div className="text-right">
                        <span className={clsx("font-bold", e.status >= 400 ? "text-rose-400" : "text-emerald-400")}>
                          HTTP {e.status}
                        </span>
                        <span className="text-[10px] text-slate-400 block">{e.latency} ms</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER STREAMING TOOLS MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Infinite Streaming &amp; itertools Toolkit
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Streaming Tool / Construct</th>
                  <th className="py-3.5 px-4 font-bold">Syntax Signature</th>
                  <th className="py-3.5 px-4 font-bold">Stopping / Bounding Behavior</th>
                  <th className="py-3.5 px-4 font-bold">Primary Production Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">itertools.islice</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`islice(gen, stop)`</td>
                  <td className="py-3 px-4">Stops after exact count N</td>
                  <td className="py-3 px-4">Sampling N events from infinite telemetry</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">itertools.takewhile</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`takewhile(predicate, gen)`</td>
                  <td className="py-3 px-4">Stops permanently on first False</td>
                  <td className="py-3 px-4">Consuming until threshold breach or timeout</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">collections.deque</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`deque(maxlen=N)`</td>
                  <td className="py-3 px-4">Auto-discards oldest in O(1)</td>
                  <td className="py-3 px-4">Rolling average &amp; sliding window statistics</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">try...finally / close()</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`gen.close()` -&gt; GeneratorExit</td>
                  <td className="py-3 px-4">Immediate resource teardown</td>
                  <td className="py-3 px-4">Leak-free socket and multi-GB file streaming</td>
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
            Explore 4 production-grade Python scripts demonstrating infinite stream generators, chunked log file streaming, sliding window metrics, and enterprise telemetry monitors:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "infinite_stream_generators_and_itertools.py",
                code: infiniteStreams,
                description: "Infinite heartbeat streams, itertools.islice, takewhile, and round-robin cycle rotators.",
              },
              {
                filename: "chunked_large_file_and_log_streamer.py",
                code: chunkedFileStreamer,
                description: "Chunked multi-GB server log file streaming with guaranteed try...finally cleanup.",
              },
              {
                filename: "sliding_window_realtime_metrics_aggregator.py",
                code: slidingMetrics,
                description: "Real-time sliding window moving average metrics calculation with collections.deque.",
              },
              {
                filename: "institutional_enterprise_telemetry_stream_monitor.py",
                code: enterpriseMonitor,
                description: "Enterprise Server Telemetry Stream Monitor with security anomaly detection.",
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
                <span>❌</span> Trap 1: Calling `list()` on Infinite Stream
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Running <code className="text-rose-300 font-mono">list(infinite_gen)</code> freezes Python in an infinite loop and crashes the server with Out-Of-Memory.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always bound infinite streams using <code className="text-emerald-300">itertools.islice()</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Leaking File Handles on Early Exit
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If an infinite generator opens a file or socket without <code className="text-amber-300 font-mono">try...finally</code>, closing the stream early leaks open OS descriptors.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always wrap open streams in <code className="text-emerald-300">try...finally: file.close()</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Yielding inside `except GeneratorExit`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                When <code className="text-purple-300 font-mono">close()</code> is called, attempting to <code className="text-purple-300 font-mono">yield</code> inside <code className="text-purple-300 font-mono">except GeneratorExit</code> raises <code className="text-purple-300 font-mono">RuntimeError: generator ignored GeneratorExit</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> In <code className="text-emerald-300">GeneratorExit</code> blocks, only perform cleanup and exit.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Memory Growth in Rolling Window Lists
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Using a regular list for a moving window (<code className="text-cyan-300 font-mono">window.append(x); window.pop(0)</code>) causes <code className="text-cyan-300 font-mono">O(N)</code> memory copying overhead on every pop.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">collections.deque(maxlen=N)</code> for constant <code className="text-emerald-300">O(1)</code> ring buffers.
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
            Comprehensive question-and-answer repository covering infinite streams, itertools utilities, chunked file streaming, and sliding window aggregations:
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
            Download or print the complete reference sheet with infinite stream bounding recipes, chunked file patterns, and sliding window templates:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic11_infinite_streams_notes.txt"
              title="Print Topic 11 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
