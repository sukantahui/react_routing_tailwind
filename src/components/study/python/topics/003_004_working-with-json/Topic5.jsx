import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import nestedTraversal from "./topic5_files/deep_nested_json_traversal_and_safe_get.py?raw";
import transformingEnvelopes from "./topic5_files/filtering_transforming_nested_api_payloads.py?raw";
import piiMasker from "./topic5_files/recursive_json_schema_masker_and_sanitizer.py?raw";
import multicampusPipeline from "./topic5_files/institutional_multicampus_admission_payload_pipeline.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic5_files/topic5_note.txt?raw";

// FAQ Questions
import questions from "./topic5_files/topic5_questions";

/**
 * Topic5: Working with nested JSON structures and API payloads
 * Module: 003_004_working-with-json
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic5() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("traversal");

  // Interactive Deep Traversal Laboratory State
  const sampleNestedData = {
    universitySystem: {
      systemName: "Coder & AccoTax",
      campuses: [
        {
          campusId: "BP-01",
          campusName: "Barrackpore Main Campus",
          students: [
            {
              id: "STU-101",
              fullName: "Sourav Mukherjee",
              academics: { gpa: 9.45, courses: ["Python AI", "Generators"] },
              billing: { feePaid: 28000.0, bankAccount: "123456789012", userPassword: "secretPassword123" }
            },
            {
              id: "STU-102",
              fullName: "Priyanka Sen",
              academics: { gpa: 9.10, courses: ["Data Science"] },
              billing: { feePaid: 32000.0, bankAccount: "987654321098", userPassword: "mySecretPass456" }
            }
          ]
        }
      ]
    }
  };

  const [queryPath, setQueryPath] = useState("universitySystem.campuses.0.students.0.fullName");
  const [queryResult, setQueryResult] = useState("Sourav Mukherjee");
  const [redactPii, setRedactPii] = useState(true);
  const [normalizeKeys, setNormalizeKeys] = useState(true);
  const [flattenOutput, setFlattenOutput] = useState(false);

  // Helper to query path
  const executePathQuery = (pathStr) => {
    try {
      const tokens = pathStr.split(".").map((t) => (!isNaN(Number(t)) ? Number(t) : t));
      let curr = sampleNestedData;
      for (const token of tokens) {
        if (curr && typeof curr === "object") {
          curr = curr[token];
        } else {
          return "NOT_FOUND (None / Out of Bounds)";
        }
      }
      return curr !== undefined ? JSON.stringify(curr) : "NOT_FOUND (None)";
    } catch {
      return "ERROR: Malformed Path Query";
    }
  };

  const handleRunQuery = () => {
    const res = executePathQuery(queryPath);
    setQueryResult(res);
  };

  // Build transformed view
  const getTransformedOutput = () => {
    let result = JSON.parse(JSON.stringify(sampleNestedData));

    // Recursive helper for keys and PII
    const transformNode = (node) => {
      if (Array.isArray(node)) {
        return node.map(transformNode);
      } else if (node !== null && typeof node === "object") {
        const transformed = {};
        for (const [k, v] of Object.entries(node)) {
          let newKey = k;
          if (normalizeKeys) {
            // camelToSnake
            newKey = k.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
          }

          if (redactPii && (newKey.includes("password") || newKey.includes("bank") || newKey.includes("token"))) {
            transformed[newKey] = "********";
          } else {
            transformed[newKey] = transformNode(v);
          }
        }
        return transformed;
      }
      return node;
    };

    result = transformNode(result);

    if (flattenOutput) {
      const flat = {};
      const flattenHelper = (obj, prefix = "") => {
        for (const [k, v] of Object.entries(obj)) {
          const fullKey = prefix ? `${prefix}.${k}` : k;
          if (v !== null && typeof v === "object") {
            flattenHelper(v, fullKey);
          } else {
            flat[fullKey] = v;
          }
        }
      };
      flattenHelper(result);
      return JSON.stringify(flat, null, 2);
    }

    return JSON.stringify(result, null, 2);
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
            Topic 5
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Working with JSON &amp; External Data APIs
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Nested JSON Structures &amp; <span className="text-teal-400">API Payloads</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master navigating, transforming, and securing complex nested JSON hierarchies: safe path traversal without <code className="text-rose-400 font-mono">KeyError</code>, flattening multi-tier hierarchies, unpacking REST API envelopes, and recursive PII data masking.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧭 Safe Path Traversal (`safe_get`)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📄 Flattening Nested Trees
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Recursive PII Redaction
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 Key Normalization (camelCase -&gt; snake_case)
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: NESTED DATA FOUNDATIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧭</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. Navigating Deeply Nested JSON Trees Safely
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In real-world REST APIs, responses contain multiple nested dictionaries and arrays. Direct chained indexing (<code className="text-rose-400 font-mono">data["campuses"][0]["students"][0]</code>) is extremely fragile:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Safe Path Lookup</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">safe_get_path(d, ["a", 0, "b"])</code>
                <p className="text-[11px] text-slate-300">
                  Safely checks intermediate keys and array bounds, returning a fallback default on missing nodes.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Recursive PII Redaction</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">mask_pii(data)</code>
                <p className="text-[11px] text-slate-300">
                  Recursively masks passwords, auth tokens, and banking accounts throughout arbitrary depth trees.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Tree Flattening</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">flatten_nested_json(d)</code>
                <p className="text-[11px] text-slate-300">
                  Flattens multi-tier nested objects into single-level dot-delimited key mappings for tabular analysis.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Intermediate None Trap
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Writing <code className="text-rose-400">data.get("profile").get("email")</code> raises <code className="text-rose-400">AttributeError: 'NoneType' object has no attribute 'get'</code> if <code className="text-slate-300">profile</code> is missing or null. Always use safe path helpers or default fallbacks: <code className="text-teal-300 font-mono">(data.get("profile") or &#123;&#125;).get("email")</code>.
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
                2. Visualizing Path Traversal, PII Redaction &amp; Flattening
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("traversal")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "traversal"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Safe Path Traversal
              </button>
              <button
                onClick={() => setActiveInteractiveTab("masking")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "masking"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Recursive PII Redaction
              </button>
              <button
                onClick={() => setActiveInteractiveTab("flattening")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "flattening"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Hierarchical Flattening
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining safe tree path queries, recursive security maskers, and flat dot-delimited key transformations:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "traversal" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">SAFE PATH TRAVERSAL PATTERN (`safe_get_path(data, path, default)`)</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11 font-bold">1. Query Path Array</text>
                  <text x="15" y="55" fill="#34d399" fontSize="8 font-mono">["campuses", 0, "students", 0, "name"]</text>
                  <text x="15" y="75" fill="#cbd5e1" fontSize="8">Specifies exact multi-tier</text>
                  <text x="15" y="90" fill="#cbd5e1" fontSize="8">dictionary &amp; index lookup sequence.</text>

                  <rect x="15" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="25" y="135" fill="#c4b5fd" fontSize="9 font-bold">Fragile Chaining Danger:</text>
                  <text x="25" y="155" fill="#fca5a5" fontSize="8">• `data["a"]["b"]` crashes on missing</text>
                  <text x="25" y="170" fill="#fca5a5" fontSize="8">• `data["items"][0]` crashes on empty</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Defensive Step Evaluator</text>
                  <text x="310" y="55" fill="#38bdf8" fontSize="8 font-mono">isinstance(curr, dict) -&gt; get()</text>
                  <text x="310" y="75" fill="#38bdf8" fontSize="8 font-mono">isinstance(curr, list) -&gt; bounds</text>
                  <text x="310" y="95" fill="#ecfdf5" fontSize="8 font-mono">if curr is None: return default</text>

                  <rect x="310" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="135" fill="#38bdf8" fontSize="9 font-bold">Fault-Tolerant Step:</text>
                  <text x="320" y="155" fill="#cbd5e1" fontSize="8">Catches missing branches &amp;</text>
                  <text x="320" y="170" fill="#cbd5e1" fontSize="8">empty arrays automatically.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="605" y="30" fill="#a7f3d0" fontSize="11 font-bold">3. Guaranteed Result</text>
                  <text x="605" y="55" fill="#34d399" fontSize="9 font-mono font-bold">"Sourav Mukherjee"</text>
                  <text x="605" y="75" fill="#cbd5e1" fontSize="8">or fallback value: `None`</text>

                  <rect x="605" y="110" width="200" height="105" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="615" y="135" fill="#34d399" fontSize="9 font-bold">Zero Crash Guarantee:</text>
                  <text x="615" y="155" fill="#cbd5e1" fontSize="8">Production web servers</text>
                  <text x="615" y="170" fill="#cbd5e1" fontSize="8">never raise unhandled 500s.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "masking" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">RECURSIVE PII REDACTION &amp; KEY NORMALIZATION PIPELINE</text>

                {/* Left: Raw Incoming */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Raw Incoming JSON (Exposed PII + camelCase)</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="8 font-mono">&#123;</text>
                  <text x="35" y="78" fill="#fca5a5" fontSize="8 font-mono font-bold">"userPassword": "SuperSecret123",</text>
                  <text x="35" y="96" fill="#fca5a5" fontSize="8 font-mono font-bold">"bankAccount": "123456789012"</text>
                  <text x="20" y="114" fill="#ecfdf5" fontSize="8 font-mono">&#125;</text>

                  <rect x="20" y="135" width="340" height="85" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="160" fill="#fda4af" fontSize="9 font-bold">Security Violation:</text>
                  <text x="30" y="180" fill="#cbd5e1" fontSize="8">• Leaks credentials to logging services &amp; SIEM</text>
                  <text x="30" y="195" fill="#cbd5e1" fontSize="8">• Violates data privacy standards (GDPR/DPDP)</text>
                </g>

                {/* Right: Masked & Normalized */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Sanitized Output (Redacted PII + snake_case)</text>

                  <text x="20" y="60" fill="#ecfdf5" fontSize="8 font-mono">&#123;</text>
                  <text x="35" y="78" fill="#34d399" fontSize="8 font-mono font-bold">"user_password": "********",</text>
                  <text x="35" y="96" fill="#34d399" fontSize="8 font-mono font-bold">"bank_account": "********"</text>
                  <text x="20" y="114" fill="#ecfdf5" fontSize="8 font-mono">&#125;</text>

                  <rect x="20" y="135" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="160" fill="#34d399" fontSize="9 font-bold">Certified Enterprise Sanitation:</text>
                  <text x="30" y="180" fill="#cbd5e1" fontSize="8">• 100% Safe for logging, debug traces, and telemetry</text>
                  <text x="30" y="195" fill="#a7f3d0" fontSize="8">• Standardizes camelCase keys to Pythonic snake_case</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">HIERARCHICAL FLATTENING INTO TABULAR DOT-DELIMITED SCHEMAS</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11 font-bold">1. Deep Nested Hierarchy</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="8 font-mono">campus.students[0].name</text>
                  <text x="15" y="75" fill="#cbd5e1" fontSize="8">Tree structure with variable</text>
                  <text x="15" y="90" fill="#cbd5e1" fontSize="8">depth and nested arrays.</text>

                  <rect x="15" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="25" y="135" fill="#c4b5fd" fontSize="9 font-bold">Tree Model:</text>
                  <text x="25" y="155" fill="#cbd5e1" fontSize="8">Difficult to export directly to</text>
                  <text x="25" y="170" fill="#cbd5e1" fontSize="8">SQL tables or CSV reports.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Flattening Engine</text>
                  <text x="310" y="55" fill="#38bdf8" fontSize="8 font-mono">prefix = f"&#123;parent&#125;.&#123;k&#125;"</text>
                  <text x="310" y="75" fill="#38bdf8" fontSize="8 font-mono">array = f"&#123;parent&#125;[&#123;i&#125;]"</text>

                  <rect x="310" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="135" fill="#38bdf8" fontSize="9 font-bold">Dot-Delimited Path Generator:</text>
                  <text x="320" y="155" fill="#cbd5e1" fontSize="8">Recursively collapses branches</text>
                  <text x="320" y="170" fill="#cbd5e1" fontSize="8">into single-level keys.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="605" y="30" fill="#a7f3d0" fontSize="11 font-bold">3. 1D Flat Grid Mapping</text>
                  <text x="605" y="55" fill="#34d399" fontSize="8 font-mono">campus.students[0].name</text>
                  <text x="605" y="75" fill="#34d399" fontSize="8 font-mono">= "Sourav Mukherjee"</text>

                  <rect x="605" y="110" width="200" height="105" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="615" y="135" fill="#34d399" fontSize="9 font-bold">Tabular Integration:</text>
                  <text x="615" y="155" fill="#cbd5e1" fontSize="8">Instant conversion to pandas</text>
                  <text x="615" y="170" fill="#cbd5e1" fontSize="8">DataFrames and SQL columns.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE NESTED TRAVERSAL LABORATORY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Deep Traversal, Query &amp; PII Redactor Lab
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Execute safe path queries on deep JSON nodes, toggle recursive PII masking, and convert hierarchical structures into flat tabular schemas:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Deep Path Query Bar
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={queryPath}
                  onChange={(e) => setQueryPath(e.target.value)}
                  className="flex-1 bg-slate-900 text-slate-100 font-mono text-xs p-2.5 rounded-lg border border-slate-800 focus:border-teal-500 focus:outline-none"
                  placeholder="e.g. universitySystem.campuses.0.students.0.fullName"
                />
                <button
                  onClick={handleRunQuery}
                  className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold rounded-lg transition-all"
                >
                  Query Path
                </button>
              </div>

              {/* Quick Query Presets */}
              <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-400">
                <span>Presets:</span>
                <button
                  onClick={() => {
                    const p = "universitySystem.campuses.0.students.0.fullName";
                    setQueryPath(p);
                    setQueryResult(executePathQuery(p));
                  }}
                  className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded hover:text-white"
                >
                  Student 0 Name
                </button>
                <button
                  onClick={() => {
                    const p = "universitySystem.campuses.0.students.0.billing.bankAccount";
                    setQueryPath(p);
                    setQueryResult(executePathQuery(p));
                  }}
                  className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded hover:text-white"
                >
                  Student 0 Bank
                </button>
                <button
                  onClick={() => {
                    const p = "universitySystem.campuses.99.missing";
                    setQueryPath(p);
                    setQueryResult(executePathQuery(p));
                  }}
                  className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded hover:text-white"
                >
                  Missing Branch 99
                </button>
              </div>

              {/* Transformation Toggles */}
              <div className="space-y-2 text-xs font-mono pt-2 border-t border-slate-800">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">
                  Recursive Transformation Filters:
                </span>

                <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={redactPii}
                    onChange={(e) => setRedactPii(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Redact Sensitive PII (passwords, bank accounts, tokens)</span>
                </label>

                <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={normalizeKeys}
                    onChange={(e) => setNormalizeKeys(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Normalize Keys to Pythonic `snake_case` (e.g. `fullName` -&gt; `full_name`)</span>
                </label>

                <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={flattenOutput}
                    onChange={(e) => setFlattenOutput(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Flatten Nested Hierarchy into Dot-Delimited Keys</span>
                </label>
              </div>
            </div>

            {/* Output Inspection */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Query Result Box */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Path Query Evaluation:
                </div>
                <div className="text-emerald-400 font-bold text-sm truncate">
                  {queryResult}
                </div>
              </div>

              {/* Transformed Document Preview */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[220px] font-mono text-xs space-y-1">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">
                  Transformed Document Preview:
                </span>
                <pre className="text-slate-200 text-[11px] leading-relaxed">
                  {getTransformedOutput()}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER NESTED TRAVERSAL MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Nested Traversal &amp; Transformation Patterns
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Traversal Pattern</th>
                  <th className="py-3.5 px-4 font-bold">Syntax Recipe</th>
                  <th className="py-3.5 px-4 font-bold">Failure Mode Avoided</th>
                  <th className="py-3.5 px-4 font-bold">Primary Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Safe Path Traversal</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`safe_get(d, ["a", 0, "b"])`</td>
                  <td className="py-3 px-4 text-emerald-400">KeyError &amp; IndexError</td>
                  <td className="py-3 px-4">Deep nested API payload navigation</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Nested Comprehensions</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`[s for c in camps for s in c]`</td>
                  <td className="py-3 px-4 text-emerald-400">High memory allocation</td>
                  <td className="py-3 px-4">Aggregating child items across list elements</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Recursive PII Masking</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`mask_pii(node)`</td>
                  <td className="py-3 px-4 text-rose-300">Security / Credential Leaks</td>
                  <td className="py-3 px-4">Sanitizing webhooks before logging</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Tree Flattening</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`flatten_nested_json(d)`</td>
                  <td className="py-3 px-4 text-cyan-300">Schema mismatch in SQL</td>
                  <td className="py-3 px-4">Loading JSON into relational DBs / CSVs</td>
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
            Explore 4 production-grade Python scripts demonstrating safe nested path lookups, API envelope unpacking, recursive PII masking, and multi-campus pipelines:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "deep_nested_json_traversal_and_safe_get.py",
                code: nestedTraversal,
                description: "Safe path lookup without KeyError/IndexError and flattening nested trees.",
              },
              {
                filename: "filtering_transforming_nested_api_payloads.py",
                code: transformingEnvelopes,
                description: "Unpacking REST API response envelopes and aggregating nested collection metrics.",
              },
              {
                filename: "recursive_json_schema_masker_and_sanitizer.py",
                code: piiMasker,
                description: "Recursive PII credential masking and camelCase to snake_case key transformation.",
              },
              {
                filename: "institutional_multicampus_admission_payload_pipeline.py",
                code: multicampusPipeline,
                description: "Multi-campus university admission pipeline with financial aggregation and PII redaction.",
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
                <span>❌</span> Trap 1: Chained `.get()` NoneType Crash
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">data.get("a").get("b")</code> crashes with <code className="text-rose-300 font-mono">AttributeError: 'NoneType' object has no attribute 'get'</code> if key <code className="text-slate-300">"a"</code> returns None.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">(data.get("a") or &#123;&#125;).get("b")</code> or a safe path traversal helper.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Hardcoded Index Crash on Empty Arrays
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-amber-300 font-mono">data["items"][0]["name"]</code> on an empty list <code className="text-amber-300 font-mono">items: []</code> raises an unhandled <code className="text-rose-400 font-mono">IndexError</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always check <code className="text-emerald-300">if items := data.get("items"): ...</code> before indexing.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Leaking Passwords to Application Logs
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Printing raw webhook payloads exposes client passwords, API tokens, and banking credentials in log files.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Pass all untrusted JSON through a recursive PII redactor before logging.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Shallow Copy Mutation Bugs
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-cyan-300 font-mono">d2 = d1.copy()</code> leaves nested dictionaries shared; mutating <code className="text-cyan-300 font-mono">d2["user"]["score"]</code> modifies <code className="text-cyan-300 font-mono">d1</code>!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">copy.deepcopy(nested_dict)</code> for independent duplicate trees.
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
            Comprehensive question-and-answer repository covering nested path traversal, safe navigation, API envelope processing, and PII masking:
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
            Download or print the complete reference sheet with safe path navigation recipes, flattening patterns, and PII masking templates:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic5_nested_json_structures_notes.txt"
              title="Print Topic 5 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
