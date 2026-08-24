import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import compositionCode from "./topic7_files/generator_pipeline_composition_and_streaming.py?raw";
import fluentDslCode from "./topic7_files/fluent_pipeline_builder_and_method_chaining.py?raw";
import resilientDlqCode from "./topic7_files/resilient_pipeline_with_error_quarantine.py?raw";
import institutionalEtlCode from "./topic7_files/institutional_admission_etl_pipeline_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic7_files/topic7_note.txt?raw";

// FAQ Questions
import questions from "./topic7_files/topic7_questions";

/**
 * Topic7: Building clean data transformation pipelines
 * Module: 003_005_advance-comprehensions
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic7() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("conveyor");

  // Interactive Laboratory State
  const rawBatch = [
    { app_id: "APP-901", name: "sourav mukherjee", course: "PY-AI", campus: "Barrackpore", fee: 30000.0, valid: true },
    { app_id: "APP-902", name: "priyanka sen", course: "DS-ML", campus: "Kolkata", fee: 35000.0, valid: true },
    { app_id: "APP-903", name: "corrupt record", course: "PY-AI", campus: "Barrackpore", fee: "invalid_num", valid: false, error: "Non-numeric fee literal" },
    { app_id: "APP-904", name: "debolina roy", course: "PY-AI", campus: "Barrackpore", fee: 28000.0, valid: true },
    { app_id: "APP-905", name: "low fee student", course: "WEB-DEV", campus: "Kolkata", fee: 5000.0, valid: false, error: "Fee below threshold" },
  ];

  const [activeStage, setActiveStage] = useState(4); // 1: Extract, 2: Validate/DLQ, 3: Tax, 4: Load Audit
  const [gstTaxRate, setGstTaxRate] = useState(0.18);
  const [minFeeCutoff, setMinFeeCutoff] = useState(10000);

  // Compute pipeline stage data
  const validatedRecords = [];
  const dlqRecords = [];

  rawBatch.forEach((r) => {
    if (!r.valid) {
      dlqRecords.push({ ...r, rejection_reason: r.error });
    } else if (typeof r.fee === "number" && r.fee < minFeeCutoff) {
      dlqRecords.push({ ...r, rejection_reason: `Fee INR ${r.fee} below threshold INR ${minFeeCutoff}` });
    } else {
      const gross = Math.round(r.fee * (1 + gstTaxRate) * 100) / 100;
      const gst = Math.round((gross - r.fee) * 100) / 100;
      validatedRecords.push({
        ...r,
        name: r.name.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        base_fee: r.fee,
        gst_amount: gst,
        gross_fee: gross,
      });
    }
  });

  const totalBase = validatedRecords.reduce((acc, r) => acc + r.base_fee, 0);
  const totalGst = validatedRecords.reduce((acc, r) => acc + r.gst_amount, 0);
  const totalGross = validatedRecords.reduce((acc, r) => acc + r.gross_fee, 0);

  const generatedPythonPipeline = `# Multi-Stage Streaming Generator Pipeline:
def stage_extract(batch): yield from batch
def stage_sanitize(stream):
    for r in stream:
        if r.get('fee') >= ${minFeeCutoff}: yield r
def stage_tax(stream):
    for r in stream:
        yield {**r, 'gross': round(r['fee'] * (1 + ${gstTaxRate}), 2)}

pipeline = stage_tax(stage_sanitize(stage_extract(raw_batch)))
cleared = list(pipeline) # Pull-based streaming execution!`;

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
            Segment 3 • Module 003_005
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 7
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Advanced Comprehensions &amp; Functional Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Building Clean <span className="text-teal-400">Data Transformation Pipelines</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master end-to-end data transformation pipeline architecture in Python: multi-stage generator streaming conveyors, pull-based <code className="text-teal-300 font-mono">O(1)</code> constant memory scaling, fluent method-chaining DSLs (<code className="text-cyan-300 font-mono">Pipeline.map().filter().collect()</code>), resilient error handling with Dead-Letter Queues (DLQ), and institutional financial ETL pipelines.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 Generator Stream Conveyors
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔗 Fluent Method-Chaining DSL
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Dead-Letter Queue (DLQ)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📊 Institutional ETL Telemetry
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: PIPELINE ARCHITECTURE OVERVIEW */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏭</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Anatomy of Modern Python Data Pipelines
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Data pipelines connect modular, single-responsibility transformation stages that pull data lazily through generator iterators:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Ingest &amp; Normalize</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">stage_extract(source)</code>
                <p className="text-[11px] text-slate-300">
                  Streams raw bytes, JSON payloads, or DB records without loading full files into RAM.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Sanitize &amp; Quarantine</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">stage_validate(stream)</code>
                <p className="text-[11px] text-slate-300">
                  Validates schemas and routes dirty records to Dead-Letter Queues (DLQ) without crashing.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Enrich &amp; Load</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">stage_enrich(stream)</code>
                <p className="text-[11px] text-slate-300">
                  Applies tax, currency conversions, and emits audited records to database or reports.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The In-Memory Eager List Disaster
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Materializing intermediate stages with <code className="text-rose-400 font-mono">list()</code> (e.g. <code className="text-rose-400">s2 = [clean(x) for x in s1]</code>) creates multi-gigabyte lists in memory. Always chain lazy generators <code className="text-teal-300 font-mono">s2 = (clean(x) for x in s1)</code> to stream multi-gigabyte datasets with constant <code className="text-teal-300">O(1)</code> memory!
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
                2. Visualizing Streaming Conveyors, Memory &amp; DLQ
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("conveyor")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "conveyor"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Streaming Conveyor
              </button>
              <button
                onClick={() => setActiveInteractiveTab("memoryProfile")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "memoryProfile"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Memory Profile
              </button>
              <button
                onClick={() => setActiveInteractiveTab("dlqFlow")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "dlqFlow"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                DLQ Quarantine Flow
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining multi-stage generator streaming pipes, constant memory scaling, and error quarantine routing:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "conveyor" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">MULTI-STAGE GENERATOR STREAMING CONVEYOR PIPELINE</text>

                {/* 3 Step Conveyor */}
                <g transform="translate(30, 50)">
                  {/* Stage 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">1. Extract &amp; Ingest</text>
                  <text x="15" y="55" fill="#38bdf8" fontSize="8 font-mono">Source: Raw JSON Feed</text>
                  <text x="15" y="75" fill="#38bdf8" fontSize="8 font-mono">Stream: yield record</text>
                  <text x="15" y="95" fill="#34d399" fontSize="8 font-mono">PULL ON DEMAND</text>

                  <rect x="15" y="115" width="220" height="100" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="140" fill="#34d399" fontSize="9 font-bold">Zero Buffering:</text>
                  <text x="25" y="160" fill="#cbd5e1" fontSize="8">Emits records one-by-one</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">as downstream requests.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Stage 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Sanitize &amp; Validate</text>
                  <text x="310" y="55" fill="#38bdf8" fontSize="8 font-mono">Check fee &gt;= threshold</text>
                  <text x="310" y="75" fill="#ecfdf5" fontSize="8 font-mono">Invalid -&gt; DLQ list</text>
                  <text x="310" y="95" fill="#34d399" fontSize="8 font-mono">Valid -&gt; yield clean</text>

                  <rect x="310" y="115" width="220" height="100" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="140" fill="#38bdf8" fontSize="9 font-bold">Error Resilience:</text>
                  <text x="320" y="160" fill="#cbd5e1" fontSize="8">Pipeline NEVER crashes</text>
                  <text x="320" y="175" fill="#cbd5e1" fontSize="8">on single corrupt items.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Stage 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="605" y="30" fill="#c4b5fd" fontSize="11 font-bold">3. Financial Enrich &amp; Load</text>
                  <text x="605" y="55" fill="#c084fc" fontSize="8 font-mono">Apply 18% GST Tax</text>
                  <text x="605" y="75" fill="#34d399" fontSize="10 font-mono font-bold">Audit Ledger Output</text>

                  <rect x="605" y="115" width="200" height="100" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="615" y="140" fill="#c4b5fd" fontSize="9 font-bold">Terminal Load:</text>
                  <text x="615" y="160" fill="#cbd5e1" fontSize="8">Writes to transactional</text>
                  <text x="615" y="175" fill="#cbd5e1" fontSize="8">database or audit ledger.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "memoryProfile" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">MEMORY PROFILING: EAGER LISTS VS LAZY STREAMING CONVEYOR</text>

                {/* Left: Eager Lists */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Eager List Pipeline (Anti-Pattern)</text>
                  
                  <text x="20" y="65" fill="#fca5a5" fontSize="8 font-mono">Stage 1: Allocates 10M List in RAM (420 MB)</text>
                  <text x="20" y="85" fill="#fca5a5" fontSize="8 font-mono">Stage 2: Allocates Cleaned List (420 MB)</text>
                  <text x="20" y="105" fill="#f43f5e" fontSize="8 font-mono font-bold">Total Memory: &gt; 1.2 GB RAM (Crash!)</text>

                  <rect x="20" y="135" width="340" height="80" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="160" fill="#fda4af" fontSize="9 font-bold">High Memory Overhead:</text>
                  <text x="30" y="180" fill="#cbd5e1" fontSize="8">Allocates massive intermediate arrays between stages.</text>
                </g>

                {/* Right: Lazy Generator Pipeline */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Lazy Streaming Pipeline (Optimal)</text>

                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">Stage 1: Streams record 1 (104 bytes)</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono">Stage 2: Transforms record 1</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono font-bold">Total Memory: Constant 4 KB RAM!</text>

                  <rect x="20" y="135" width="340" height="80" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="160" fill="#34d399" fontSize="9 font-bold">O(1) Memory Invariant:</text>
                  <text x="30" y="180" fill="#cbd5e1" fontSize="8">Processes 100M records without exceeding 4 KB memory.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">DEAD-LETTER QUEUE (DLQ) STREAM PARTITIONING</text>

                {/* Flow Diagram */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Partitioning Stream into Valid Stream vs Quarantine DLQ</text>

                  <g transform="translate(20, 55)">
                    {/* Ingestion */}
                    <rect x="0" y="30" width="180" height="100" rx="6" fill="#090d16" stroke="#6d28d9" />
                    <text x="10" y="55" fill="#a78bfa" fontSize="10 font-bold">Mixed Input Stream</text>
                    <text x="10" y="80" fill="#cbd5e1" fontSize="8 font-mono">Raw JSON payloads</text>

                    {/* Splitter */}
                    <text x="200" y="85" fill="#38bdf8" fontSize="20" fontWeight="bold">→</text>

                    {/* Guard Stage */}
                    <rect x="240" y="15" width="220" height="130" rx="6" fill="#090d16" stroke="#0284c7" />
                    <text x="250" y="40" fill="#38bdf8" fontSize="10 font-bold">Validation Guard</text>
                    <text x="250" y="65" fill="#cbd5e1" fontSize="8 font-mono">try parse fee</text>
                    <text x="250" y="85" fill="#34d399" fontSize="8 font-mono">Valid: yield</text>
                    <text x="250" y="105" fill="#f43f5e" fontSize="8 font-mono">Error: dlq.append()</text>

                    {/* Branch Green */}
                    <text x="480" y="45" fill="#10b981" fontSize="16" fontWeight="bold">↗ Valid</text>
                    <rect x="560" y="0" width="220" height="70" rx="6" fill="#064e3b" stroke="#10b981" />
                    <text x="570" y="25" fill="#34d399" fontSize="9 font-bold">Main Pipeline Stream</text>
                    <text x="570" y="45" fill="#cbd5e1" fontSize="8">Enrichment &amp; Financial Ledger</text>

                    {/* Branch Red */}
                    <text x="480" y="120" fill="#f43f5e" fontSize="16" fontWeight="bold">↘ Corrupt</text>
                    <rect x="560" y="85" width="220" height="70" rx="6" fill="#4c0519" stroke="#f43f5e" />
                    <text x="570" y="110" fill="#fda4af" fontSize="9 font-bold">Dead-Letter Queue (DLQ)</text>
                    <text x="570" y="130" fill="#cbd5e1" fontSize="8">Quarantined for Admin Audit</text>
                  </g>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE ETL PIPELINE LABORATORY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Admission ETL &amp; Financial Audit Laboratory
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Configure pipeline thresholds, step through transformation stages, observe Dead-Letter Queue (DLQ) quarantine, and inspect live financial ledger telemetry:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              {/* Stage Step Navigator */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Step Through Transformation Stages:
                </span>
                <div className="grid grid-cols-4 gap-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[
                    { id: 1, label: "1. Ingest" },
                    { id: 2, label: "2. Validate" },
                    { id: 3, label: "3. Tax" },
                    { id: 4, label: "4. Audit" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveStage(s.id)}
                      className={clsx(
                        "py-1.5 rounded transition-all",
                        activeStage === s.id
                          ? "bg-teal-900/60 text-teal-300 font-bold border border-teal-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tax Rate Selector */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  2. GST Tax Parameter:
                </span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {[0.0, 0.05, 0.12, 0.18].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setGstTaxRate(rate)}
                      className={clsx(
                        "flex-1 py-1 rounded transition-all",
                        gstTaxRate === rate
                          ? "bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {rate * 100}% GST
                    </button>
                  ))}
                </div>
              </div>

              {/* Min Fee Cutoff Slider */}
              <div className="space-y-1 pt-1 border-t border-slate-800">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Minimum Fee Cutoff (Validation Guard):</span>
                  <span className="text-teal-300 font-bold">INR {minFeeCutoff.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={25000}
                  step={2500}
                  value={minFeeCutoff}
                  onChange={(e) => setMinFeeCutoff(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>

              {/* Live Telemetry KPI Metrics */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-xs font-mono">
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase">Ingested</div>
                  <div className="text-white font-bold text-base">{rawBatch.length}</div>
                </div>
                <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/60 rounded-lg">
                  <div className="text-emerald-400 text-[10px] uppercase">Cleared</div>
                  <div className="text-emerald-300 font-bold text-base">{validatedRecords.length}</div>
                </div>
                <div className="p-2.5 bg-rose-950/40 border border-rose-800/60 rounded-lg">
                  <div className="text-rose-400 text-[10px] uppercase">Quarantined</div>
                  <div className="text-rose-300 font-bold text-base">{dlqRecords.length}</div>
                </div>
              </div>
            </div>

            {/* Generated Python Pipeline Code & Audit Inspector */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Python Code Display */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Generated Streaming ETL Pipeline Code:
                </div>
                <pre className="text-teal-300 text-[11px] leading-relaxed break-all font-mono overflow-x-auto">
                  {generatedPythonPipeline}
                </pre>
              </div>

              {/* Pipeline Financial Audit Inspector */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] font-mono text-xs space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>Financial Audit Summary:</span>
                  <span className="text-emerald-400">Loaded State</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Total Net Base Revenue:</span>
                    <span className="text-white font-bold">INR {totalBase.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Total GST Collected ({gstTaxRate * 100}%):</span>
                    <span className="text-cyan-300 font-bold">INR {totalGst.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-1">
                    <span className="text-teal-300 font-bold">Total Gross Bank Deposit:</span>
                    <span className="text-emerald-300 font-bold">INR {totalGross.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER PIPELINE MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Pipeline Architecture Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Pipeline Stage</th>
                  <th className="py-3.5 px-4 font-bold">Evaluation Mode</th>
                  <th className="py-3.5 px-4 font-bold">Memory Footprint</th>
                  <th className="py-3.5 px-4 font-bold">Primary Responsibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">1. Extract (Ingest)</td>
                  <td className="py-3 px-4 text-emerald-400">Lazy Iterator (`yield`)</td>
                  <td className="py-3 px-4 text-emerald-400">Constant O(1)</td>
                  <td className="py-3 px-4">Stream raw byte chunks / API lines</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">2. Validate &amp; Quarantine</td>
                  <td className="py-3 px-4 text-emerald-400">Lazy Filter + DLQ</td>
                  <td className="py-3 px-4 text-emerald-400">Constant O(1)</td>
                  <td className="py-3 px-4">Schema verification &amp; dirty record capture</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">3. Transform (Enrich)</td>
                  <td className="py-3 px-4 text-emerald-400">Lazy Map (`yield`)</td>
                  <td className="py-3 px-4 text-emerald-400">Constant O(1)</td>
                  <td className="py-3 px-4">Financial tax, currency, and discount calculation</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">4. Load (Terminal)</td>
                  <td className="py-3 px-4 text-amber-300">Eager Consumer (`reduce`/`collect`)</td>
                  <td className="py-3 px-4 text-slate-300">Proportional to output</td>
                  <td className="py-3 px-4">Persist to database / emit audit report</td>
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
            Explore 4 production-grade Python scripts demonstrating generator conveyor pipelines, fluent method chaining DSLs, resilient Dead-Letter Queues, and institutional ETL engines:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "generator_pipeline_composition_and_streaming.py",
                code: compositionCode,
                description: "Multi-stage generator streaming conveyors.",
              },
              {
                filename: "fluent_pipeline_builder_and_method_chaining.py",
                code: fluentDslCode,
                description: "Generic fluent pipeline builder with method chaining.",
              },
              {
                filename: "resilient_pipeline_with_error_quarantine.py",
                code: resilientDlqCode,
                description: "Error interception, dead-letter queues, and stream validation.",
              },
              {
                filename: "institutional_admission_etl_pipeline_suite.py",
                code: institutionalEtlCode,
                description: "End-to-end multi-stage ETL pipelines, tax computation, and DLQ quarantine.",
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
                <span>❌</span> Trap 1: Materializing Intermediate Lists
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-rose-300 font-mono">list()</code> between intermediate stages allocates full collections in RAM, defeating O(1) generator streaming.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Keep intermediate stages lazy with <code className="text-emerald-300">yield</code> or generator expressions.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Bare `except: pass` in Pipeline Stages
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Silently suppressing exceptions causes corrupt records to vanish without audit logs or alert metrics.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Route failed payloads to a Dead-Letter Queue (DLQ) with error details.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Reading Entire Files with `f.readlines()`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                <code className="text-purple-300 font-mono">f.readlines()</code> loads the entire file into RAM at once, crashing on large multi-gigabyte logs.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Iterate directly over the file object: <code className="text-emerald-300">for line in f: yield line</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Non-Idempotent Transformation Stages
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Re-running a pipeline on the same dataset produces double billing or duplicate records if stages are not idempotent.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use unique deduplication keys and pure deterministic transformations.
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
            Comprehensive question-and-answer repository covering generator pipelines, fluent method chaining, dead-letter queues, memory profiling, and ETL architecture:
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
            Download or print the complete reference sheet with streaming pipeline recipes, fluent DSL builders, and DLQ quarantine templates:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic7_data_transformation_pipelines_notes.txt"
              title="Print Topic 7 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
