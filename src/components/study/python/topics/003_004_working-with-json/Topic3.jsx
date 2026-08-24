import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import loadVsLoads from "./topic3_files/json_load_vs_loads_file_and_string_deserializer.py?raw";
import customDecoding from "./topic3_files/custom_number_decoding_parse_float_parse_int.py?raw";
import defensiveLoader from "./topic3_files/defensive_json_file_loader_with_recovery.py?raw";
import auditStreamLoader from "./topic3_files/institutional_examination_audit_stream_loader.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic3_files/topic3_note.txt?raw";

// FAQ Questions
import questions from "./topic3_files/topic3_questions";

/**
 * Topic3: Deserialization: json.load() vs json.loads()
 * Module: 003_004_working-with-json
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic3() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("deserializers");

  // Interactive Deserializer & Financial Precision Laboratory State
  const defaultLedgerJson = `{
  "transaction_id": 9223372036854775807,
  "student_id": "STU-101",
  "tuition_fee": 28500.10,
  "gst_tax": 5130.018,
  "discount_rebate": 1500.05
}`;

  const [ledgerInput, setLedgerInput] = useState(defaultLedgerJson);
  const [sourceMode, setSourceMode] = useState("loads"); // loads | load
  const [useDecimal, setUseDecimal] = useState(true);
  const [useStrInt, setUseStrInt] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);
  const [parsedDoc, setParsedDoc] = useState(null);

  // Financial calculations
  const calculateFees = (doc) => {
    if (!doc) return null;
    const fee = doc.tuition_fee || 0;
    const gst = doc.gst_tax || 0;
    const discount = doc.discount_rebate || 0;

    // Standard Float calculation
    const floatTotal = (Number(fee) + Number(gst) - Number(discount)).toFixed(6);

    // Exact Decimal string simulation
    const feeCents = Math.round(Number(fee) * 1000);
    const gstCents = Math.round(Number(gst) * 1000);
    const discCents = Math.round(Number(discount) * 1000);
    const exactDecimalTotal = ((feeCents + gstCents - discCents) / 1000).toFixed(3);

    return { floatTotal, exactDecimalTotal };
  };

  const handleParse = () => {
    try {
      const parsed = JSON.parse(ledgerInput);
      setParsedDoc(parsed);
      setHasError(false);
      setErrorDetails(null);
    } catch (err) {
      setHasError(true);
      setParsedDoc(null);
      setErrorDetails({
        msg: err.message,
        line: 3,
        col: 18,
      });
    }
  };

  useEffect(() => {
    handleParse();
  }, [ledgerInput, useDecimal, useStrInt]);

  const mathResults = calculateFees(parsedDoc);

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
            Topic 3
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Working with JSON &amp; External Data APIs
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          JSON Deserialization: <span className="text-teal-400">`json.load()` vs `json.loads()`</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master high-fidelity JSON parsing in Python: in-memory string and UTF-8 byte parsing (<code className="text-teal-300 font-mono">json.loads</code>), stream deserialization (<code className="text-teal-300 font-mono">json.load</code>), precision financial decoding (<code className="text-cyan-300 font-mono">parse_float=Decimal</code>), large integer preservation (<code className="text-cyan-300 font-mono">parse_int=str</code>), and defensive backup recovery.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📥 `json.loads()` (Strings &amp; Bytes)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📁 `json.load()` (Stream Files)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            💰 `parse_float=Decimal` (Zero Drift)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Defensive Recovery &amp; JSONDecodeError
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: LOAD VS LOADS FOUNDATIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📥</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. `json.loads()` vs `json.load()` Mechanics
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Deserialization converts JSON formatted text into native Python data structures (dictionaries, lists, numbers, booleans):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ `json.loads(s)`</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">doc = json.loads(payload)</code>
                <p className="text-[11px] text-slate-300">
                  Parses string (<code className="text-teal-300">str</code>) or raw UTF-8 <code className="text-teal-300">bytes</code> resident in memory.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ `json.load(f)`</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">doc = json.load(file_obj)</code>
                <p className="text-[11px] text-slate-300">
                  Reads and parses directly from open readable disk files, network sockets, or <code className="text-cyan-300">io.StringIO</code>.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ `parse_float=Decimal`</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">parse_float=Decimal</code>
                <p className="text-[11px] text-slate-300">
                  Decodes floating-point numbers into exact <code className="text-purple-300">Decimal</code> objects, eliminating binary IEEE-754 rounding errors.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Pinpointing Errors with `json.JSONDecodeError`
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                When parsing corrupt JSON, Python raises <code className="text-rose-400">json.JSONDecodeError</code> exposing <code className="text-cyan-300">exc.lineno</code>, <code className="text-cyan-300">exc.colno</code>, and <code className="text-cyan-300">exc.msg</code> for instant diagnostic logging.
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
                2. Visualizing Deserializers, Decimal Precision &amp; Recovery
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("deserializers")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "deserializers"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                `load` vs `loads` Parsers
              </button>
              <button
                onClick={() => setActiveInteractiveTab("precision")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "precision"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Financial Decimal Precision
              </button>
              <button
                onClick={() => setActiveInteractiveTab("recovery")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "recovery"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Defensive Recovery Flow
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining in-memory string vs direct disk streaming, financial decimal accuracy, and automatic backup recovery:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "deserializers" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">`json.loads()` (MEMORY STR/BYTES) VS `json.load()` (DISK STREAM)</text>

                {/* Left Box: loads */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">1. `json.loads(s)`: String / Bytes</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="9 font-mono">doc = json.loads(api_response_str)</text>
                  <text x="20" y="80" fill="#34d399" fontSize="9 font-mono">doc = json.loads(b'{"key": "val"}')</text>

                  <rect x="20" y="110" width="340" height="105" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="135" fill="#34d399" fontSize="9 font-bold">In-Memory Parsing:</text>
                  <text x="30" y="155" fill="#cbd5e1" fontSize="8">• Input: Python `str`, `bytes`, `bytearray`</text>
                  <text x="30" y="170" fill="#cbd5e1" fontSize="8">• Source: Web API Responses (FastAPI/Flask), Redis, Sockets</text>
                  <text x="30" y="185" fill="#cbd5e1" fontSize="8">• Directly parses raw UTF-8 payloads</text>
                </g>

                {/* Right Box: load */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="30" fill="#a5f3fc" fontSize="12" fontWeight="bold">2. `json.load(f)`: File Stream</text>

                  <text x="20" y="60" fill="#ecfdf5" fontSize="9 font-mono">with open("registry.json", "r") as f:</text>
                  <text x="35" y="80" fill="#38bdf8" fontSize="9 font-mono font-bold">doc = json.load(f)</text>

                  <rect x="20" y="110" width="340" height="105" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="30" y="135" fill="#38bdf8" fontSize="9 font-bold">File Stream Parsing:</text>
                  <text x="30" y="155" fill="#cbd5e1" fontSize="8">• Input: Open readable file stream object (`.read()`)</text>
                  <text x="30" y="170" fill="#cbd5e1" fontSize="8">• Source: Database dumps, System Config files</text>
                  <text x="30" y="185" fill="#cbd5e1" fontSize="8">• Avoids allocating the full raw string in RAM</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "precision" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">FINANCIAL PRECISION: `parse_float=Decimal` VS BINARY IEEE-754 FLOAT</text>

                {/* Left: Standard Float */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Default: Binary `float` (IEEE-754)</text>
                  
                  <text x="20" y="60" fill="#fca5a5" fontSize="8 font-mono">fee = 28500.10 + 5130.018 - 1500.05</text>
                  <text x="20" y="85" fill="#fca5a5" fontSize="9 font-mono font-bold">Result: 32130.068000000004 (DRIFT!)</text>

                  <rect x="20" y="120" width="340" height="95" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="145" fill="#fda4af" fontSize="9 font-bold">Precision Failure in Accounting:</text>
                  <text x="30" y="165" fill="#cbd5e1" fontSize="8">• Binary fractions cause fractional cent errors</text>
                  <text x="30" y="180" fill="#cbd5e1" fontSize="8">• Cumulative ledger discrepancies over millions of txs</text>
                  <text x="30" y="195" fill="#cbd5e1" fontSize="8">• Fails statutory banking audit compliance</text>
                </g>

                {/* Right: Decimal */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Strict: `parse_float=Decimal`</text>

                  <text x="20" y="60" fill="#34d399" fontSize="8 font-mono">json.loads(s, parse_float=Decimal)</text>
                  <text x="20" y="85" fill="#34d399" fontSize="9 font-mono font-bold">Result: Decimal('32130.068') (100% EXACT)</text>

                  <rect x="20" y="120" width="340" height="95" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="145" fill="#34d399" fontSize="9 font-bold">Institutional Financial Standard:</text>
                  <text x="30" y="165" fill="#cbd5e1" fontSize="8">• Exact base-10 decimal mathematics</text>
                  <text x="30" y="180" fill="#cbd5e1" fontSize="8">• Zero rounding loss on sub-cent tax fractions</text>
                  <text x="30" y="195" fill="#cbd5e1" fontSize="8">• 100% Auditable Coder &amp; AccoTax ledger integrity</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">DEFENSIVE JSON FILE INGESTION &amp; AUTOMATIC BACKUP RESTORATION</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">1. Primary Ingestion</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="8 font-mono">with open("reg.json") as f:</text>
                  <text x="15" y="75" fill="#34d399" fontSize="8 font-mono font-bold">data = json.load(f)</text>

                  <rect x="15" y="110" width="220" height="105" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="135" fill="#34d399" fontSize="9 font-bold">Standard Happy Path:</text>
                  <text x="25" y="155" fill="#cbd5e1" fontSize="8">Loads database into Python</text>
                  <text x="25" y="170" fill="#cbd5e1" fontSize="8">heap dictionaries directly.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="310" y="30" fill="#fda4af" fontSize="11 font-bold">2. Corrupt / 0-Byte Crash</text>
                  <text x="310" y="55" fill="#fca5a5" fontSize="8 font-mono">except JSONDecodeError:</text>
                  <text x="310" y="75" fill="#fda4af" fontSize="8 font-mono font-bold">log_alert_and_quarantine()</text>

                  <rect x="310" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="320" y="135" fill="#fda4af" fontSize="9 font-bold">Fault Interception:</text>
                  <text x="320" y="155" fill="#cbd5e1" fontSize="8">Catches incomplete writes,</text>
                  <text x="320" y="170" fill="#cbd5e1" fontSize="8">power cuts, or syntax errors.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="605" y="30" fill="#c4b5fd" fontSize="11 font-bold">3. Backup Recovery</text>
                  <text x="605" y="55" fill="#ecfdf5" fontSize="8 font-mono">with open("reg.bak") as bak:</text>
                  <text x="605" y="75" fill="#34d399" fontSize="8 font-mono font-bold">return json.load(bak)</text>

                  <rect x="605" y="110" width="200" height="105" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="615" y="135" fill="#c4b5fd" fontSize="9 font-bold">Zero Downtime Recovery:</text>
                  <text x="615" y="155" fill="#cbd5e1" fontSize="8">Restores valid state without</text>
                  <text x="615" y="170" fill="#cbd5e1" fontSize="8">crashing the web application.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE DESERIALIZATION LABORATORY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Financial Deserializer &amp; Precision Inspector
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Test precision differences between standard binary floats vs <code className="text-teal-300 font-mono">parse_float=Decimal</code>, preserve 64-bit integer IDs, and diagnose malformed JSON strings in real time:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls & Editor */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400 font-bold uppercase">
                <span>Financial Ledger JSON Input:</span>
                <button
                  onClick={() => setLedgerInput(defaultLedgerJson)}
                  className="text-[11px] text-teal-400 hover:text-white underline"
                >
                  Reset Ledger Payload
                </button>
              </div>

              <textarea
                value={ledgerInput}
                onChange={(e) => setLedgerInput(e.target.value)}
                rows={9}
                className="w-full bg-slate-900 text-slate-100 font-mono text-xs p-3 rounded-lg border border-slate-800 focus:border-teal-500 focus:outline-none leading-relaxed"
              />

              {/* Toggles */}
              <div className="space-y-2 text-xs font-mono">
                <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useDecimal}
                    onChange={(e) => setUseDecimal(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Enable `parse_float=Decimal` (Zero IEEE-754 precision loss)</span>
                </label>

                <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useStrInt}
                    onChange={(e) => setUseStrInt(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Enable `parse_int=str` (Preserve 64-bit large integer IDs)</span>
                </label>
              </div>
            </div>

            {/* Output & Financial Math Inspection */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Financial Math Comparison Box */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Financial Accounting Audit Comparison:
                </div>

                {hasError ? (
                  <div className="p-2.5 bg-rose-950/60 rounded border border-rose-800 text-rose-300 text-[11px] leading-relaxed">
                    <span className="font-bold">JSONDecodeError:</span> {errorDetails?.msg}
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Transaction ID:</span>
                      <span className="text-purple-300 font-bold">{useStrInt ? `"${parsedDoc?.transaction_id}" (str)` : `${parsedDoc?.transaction_id} (int)`}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Standard Float Total:</span>
                      <span className="text-rose-400 font-bold">INR {mathResults?.floatTotal} (Float drift!)</span>
                    </div>
                    <div className="flex justify-between text-[11px] pt-1 border-t border-slate-800">
                      <span className="text-slate-400">Exact Decimal Total:</span>
                      <span className="text-emerald-400 font-bold">INR {mathResults?.exactDecimalTotal} (100% Exact!)</span>
                    </div>
                  </>
                )}
              </div>

              {/* Parsed Inspection */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[140px] font-mono text-xs space-y-1">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">
                  Deserialized Python Dictionary:
                </span>
                <pre className="text-slate-200 text-[11px] leading-relaxed">
                  {hasError ? "Parsing failed: Malformed JSON syntax" : JSON.stringify(parsedDoc, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER DESERIALIZATION PARAMETERS MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Parameter Matrix in `json.load` / `json.loads`
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Parameter</th>
                  <th className="py-3.5 px-4 font-bold">Default Callable</th>
                  <th className="py-3.5 px-4 font-bold">Custom Override Recipe</th>
                  <th className="py-3.5 px-4 font-bold">Primary Production Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">parse_float</td>
                  <td className="py-3 px-4 font-mono text-slate-200">float</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono">parse_float=Decimal</td>
                  <td className="py-3 px-4">Financial ledgers, currency transactions, tax rates</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">parse_int</td>
                  <td className="py-3 px-4 font-mono text-slate-200">int</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono">parse_int=str</td>
                  <td className="py-3 px-4">64-bit Snowflake entity IDs, large barcodes</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">parse_constant</td>
                  <td className="py-3 px-4 font-mono text-slate-200">None (Emits float)</td>
                  <td className="py-3 px-4 text-purple-300 font-mono">parse_constant=lambda c: None</td>
                  <td className="py-3 px-4">Sanitizing non-standard `NaN` / `Infinity` values</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">object_hook</td>
                  <td className="py-3 px-4 font-mono text-slate-200">None (Emits dict)</td>
                  <td className="py-3 px-4 text-amber-300 font-mono">object_hook=Student.from_dict</td>
                  <td className="py-3 px-4">Direct instantiation into custom domain classes</td>
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
            Explore 4 production-grade Python scripts demonstrating load vs loads mechanics, custom numeric decoding, defensive loaders, and examination audit streams:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "json_load_vs_loads_file_and_string_deserializer.py",
                code: loadVsLoads,
                description: "json.load vs json.loads mechanics, UTF-8 byte parsing, and JSONDecodeError inspection.",
              },
              {
                filename: "custom_number_decoding_parse_float_parse_int.py",
                code: customDecoding,
                description: "Custom numeric decoding with parse_float=Decimal and parse_int=str.",
              },
              {
                filename: "defensive_json_file_loader_with_recovery.py",
                code: defensiveLoader,
                description: "Defensive JSON file loader with corrupt payload detection and automatic backup restoration.",
              },
              {
                filename: "institutional_examination_audit_stream_loader.py",
                code: auditStreamLoader,
                description: "Institutional Examination Audit Stream Deserializer with exact Decimal fee reconciliation.",
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
                <span>❌</span> Trap 1: Floating Point Drift in Monetary Calculations
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Relying on standard floats causes cumulative rounding errors (e.g. <code className="text-rose-300 font-mono">0.1 + 0.2 = 0.30000000000000004</code>) in financial statements.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always pass <code className="text-emerald-300">parse_float=Decimal</code> when decoding currency fields.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Application Crashes on Empty 0-Byte Files
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-amber-300 font-mono">json.load(f)</code> on an empty file raises <code className="text-amber-300 font-mono">JSONDecodeError: Expecting value: line 1 column 1</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Check <code className="text-emerald-300">os.path.getsize()</code> or wrap in a defensive fallback loader.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Catastrophic RCE via `eval()`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Using <code className="text-purple-300 font-mono">eval(untrusted_str)</code> to parse JSON allows attackers to execute arbitrary system commands.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> NEVER use <code className="text-rose-400">eval()</code>; always use <code className="text-emerald-300">json.loads()</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Extra Data Error on Concatenated JSON
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Passing concatenated JSON streams (<code className="text-cyan-300 font-mono">&#123;"a":1&#125;&#123;"b":2&#125;</code>) raises <code className="text-cyan-300 font-mono">JSONDecodeError: Extra data</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Stream line-by-line (NDJSON / JSON Lines) calling <code className="text-emerald-300">json.loads(line)</code> per line.
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
            Comprehensive question-and-answer repository covering `json.load`, `json.loads`, `parse_float=Decimal`, `parse_int`, `JSONDecodeError`, and recovery patterns:
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
            Download or print the complete reference sheet with deserializer recipes, precision decoding patterns, and JSONDecodeError diagnostic guides:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic3_json_deserialization_notes.txt"
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
