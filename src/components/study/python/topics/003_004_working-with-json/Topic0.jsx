import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import jsonSyntaxCode from "./topic0_files/json_syntax_standards_and_data_types.py?raw";
import typeEquivalences from "./topic0_files/json_vs_python_data_type_equivalences.py?raw";
import schemaFundamentals from "./topic0_files/json_schema_validation_fundamentals.py?raw";
import portalApiSpec from "./topic0_files/institutional_student_portal_api_schema_spec.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic0_files/topic0_note.txt?raw";

// FAQ Questions
import questions from "./topic0_files/topic0_questions";

/**
 * Topic0: JSON Format overview: types, syntax, and schema standards
 * Module: 003_004_working-with-json
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic0() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("types");

  // Interactive JSON Validator Playground State
  const samplePresets = {
    valid: `{
  "student_id": "STU-101",
  "name": "Sourav Mukherjee",
  "course": "Python Full-Stack",
  "score": 94.5,
  "fee_paid": 28000.0,
  "is_enrolled": true,
  "scholarship": null,
  "skills": ["Python", "Decorators", "Generators"]
}`,
    singleQuotes: `{
  'student_id': 'STU-102',
  'name': 'Priyanka Sen',
  'course': 'Data Science'
}`,
    trailingComma: `{
  "student_id": "STU-103",
  "name": "Rahul Verma",
  "courses": ["Core Python", "Data Structures",],
}`,
    schemaViolation: `{
  "student_id": "STU-104",
  "name": "Debolina Roy",
  "score": 145.0,
  "fee_paid": "NOT_PAID"
}`
  };

  const [jsonInput, setJsonInput] = useState(samplePresets.valid);
  const [validationResult, setValidationResult] = useState({
    isValid: true,
    message: "Valid RFC 8259 JSON Syntax & Schema Compliant",
    parsed: null,
    errors: [],
  });

  const handleValidate = () => {
    try {
      // 1. Syntax Check
      const parsed = JSON.parse(jsonInput);

      // 2. Mock Schema Check
      const schemaErrors = [];
      if (!parsed.student_id) schemaErrors.push("Missing required field: 'student_id'");
      if (!parsed.name) schemaErrors.push("Missing required field: 'name'");
      if (typeof parsed.score === "number" && (parsed.score < 0 || parsed.score > 100)) {
        schemaErrors.push(`Score range violation: ${parsed.score} is not between 0 and 100.`);
      }
      if (parsed.fee_paid !== undefined && typeof parsed.fee_paid !== "number") {
        schemaErrors.push(`Type mismatch on 'fee_paid': Expected number, got ${typeof parsed.fee_paid}.`);
      }

      if (schemaErrors.length > 0) {
        setValidationResult({
          isValid: false,
          message: "JSON Syntax Valid, but Schema Contract Violated",
          parsed,
          errors: schemaErrors,
        });
      } else {
        setValidationResult({
          isValid: true,
          message: "100% Valid RFC 8259 JSON & Schema Compliant",
          parsed,
          errors: [],
        });
      }
    } catch (exc) {
      setValidationResult({
        isValid: false,
        message: `JSON Syntax Error: ${exc.message}`,
        parsed: null,
        errors: [exc.message],
      });
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed));
      handleValidate();
    } catch {
      handleValidate();
    }
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
      handleValidate();
    } catch {
      handleValidate();
    }
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
            Topic 0 • Module Launch
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Working with JSON &amp; External Data APIs
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          JSON Format Overview: <span className="text-teal-400">Types, Syntax &amp; Schema Standards</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master the official JSON (RFC 8259) standard: the 6 native JSON data types, strict syntax constraints (double quotes, no trailing commas, no comments), Python-to-JSON type mapping equivalences, and declarative schema contracts.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📜 RFC 8259 Standard Spec
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧩 6 Native JSON Data Types
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 Python ↔ JSON Type Matrix
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ JSON Schema Contract Validation
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE 6 NATIVE DATA TYPES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧱</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The 6 Fundamental JSON Data Types (RFC 8259)
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              JSON supports exactly 6 primitive and composite data structures. Any other data type (such as Python's <code className="text-rose-400 font-mono">datetime</code>, <code className="text-rose-400 font-mono">set</code>, or <code className="text-rose-400 font-mono">bytes</code>) must be converted into one of these 6 formats:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* String */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ String</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">"name": "Sourav"</code>
                <p className="text-[11px] text-slate-300">
                  Unicode characters enclosed in MANDATORY double quotes.
                </p>
              </div>

              {/* Number */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Number</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">"age": 24, "gpa": 9.45</code>
                <p className="text-[11px] text-slate-300">
                  Integers or IEEE-754 floating-point decimals. (No NaN/Infinity).
                </p>
              </div>

              {/* Object */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Object</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">&#123;"city": "Kolkata"&#125;</code>
                <p className="text-[11px] text-slate-300">
                  Unordered key-value mappings where all keys MUST be strings.
                </p>
              </div>

              {/* Array */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 shadow-lg">
                <div className="text-emerald-400 font-bold text-sm mb-1">4️⃣ Array</div>
                <code className="text-xs font-mono text-emerald-300 block mb-1">["Python", "AI", 100]</code>
                <p className="text-[11px] text-slate-300">
                  Ordered lists of values of arbitrary mixed types.
                </p>
              </div>

              {/* Boolean */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">5️⃣ Boolean</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">"enrolled": true</code>
                <p className="text-[11px] text-slate-300">
                  Strictly lowercase literals <code className="text-amber-300">true</code> or <code className="text-amber-300">false</code>.
                </p>
              </div>

              {/* Null */}
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 shadow-lg">
                <div className="text-rose-400 font-bold text-sm mb-1">6️⃣ Null</div>
                <code className="text-xs font-mono text-rose-300 block mb-1">"expiry": null</code>
                <p className="text-[11px] text-slate-300">
                  Strictly lowercase literal <code className="text-rose-300">null</code> (maps to Python's <code className="text-slate-200 font-mono">None</code>).
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Strict JSON Syntax Invariants (RFC 8259)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                • <span className="text-rose-400 font-bold">No Single Quotes</span>: <code className="text-slate-400">'key': 'value'</code> is ILLEGAL.<br />
                • <span className="text-rose-400 font-bold">No Trailing Commas</span>: <code className="text-slate-400">[1, 2, 3,]</code> is ILLEGAL.<br />
                • <span className="text-rose-400 font-bold">No Comments</span>: <code className="text-slate-400">// comment</code> causes <code className="text-cyan-300">JSONDecodeError</code>.
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
                2. Visualizing JSON Types, Mappings &amp; Schema Contracts
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("types")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "types"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                6 Native Types
              </button>
              <button
                onClick={() => setActiveInteractiveTab("mapping")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "mapping"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Python ↔ JSON Matrix
              </button>
              <button
                onClick={() => setActiveInteractiveTab("schema")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "schema"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Schema Contract Flow
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining data type specifications, round-trip serialization conversions, and API schema contracts:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "types" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">THE 6 NATIVE JSON DATA TYPES (RFC 8259 GRAMMAR)</text>

                {/* 6 Type Cards in 2 rows of 3 */}
                <g transform="translate(30, 50)">
                  {/* Card 1: String */}
                  <rect x="0" y="0" width="250" height="110" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="25" fill="#99f6e4" fontSize="11 font-bold">1. String</text>
                  <text x="15" y="48" fill="#34d399" fontSize="9 font-mono font-bold">"student": "Sourav"</text>
                  <text x="15" y="70" fill="#cbd5e1" fontSize="8">• Mandatory double quotes</text>
                  <text x="15" y="85" fill="#cbd5e1" fontSize="8">• Backslash escape sequences</text>

                  {/* Card 2: Number */}
                  <rect x="285" y="0" width="250" height="110" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="300" y="25" fill="#a5f3fc" fontSize="11 font-bold">2. Number</text>
                  <text x="300" y="48" fill="#38bdf8" fontSize="9 font-mono font-bold">"age": 24, "fee": 28000.50</text>
                  <text x="300" y="70" fill="#cbd5e1" fontSize="8">• Integers &amp; standard decimals</text>
                  <text x="300" y="85" fill="#cbd5e1" fontSize="8">• No NaN or Infinity literals</text>

                  {/* Card 3: Object */}
                  <rect x="570" y="0" width="250" height="110" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="585" y="25" fill="#c4b5fd" fontSize="11 font-bold">3. Object</text>
                  <text x="585" y="48" fill="#c4b5fd" fontSize="9 font-mono font-bold">&#123;"city": "Barrackpore"&#125;</text>
                  <text x="585" y="70" fill="#cbd5e1" fontSize="8">• Key-Value dictionary maps</text>
                  <text x="585" y="85" fill="#cbd5e1" fontSize="8">• Keys MUST be double-quoted strings</text>

                  {/* Card 4: Array */}
                  <rect x="0" y="130" width="250" height="110" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="15" y="155" fill="#a7f3d0" fontSize="11 font-bold">4. Array</text>
                  <text x="15" y="178" fill="#34d399" fontSize="9 font-mono font-bold">["Python", "Generators"]</text>
                  <text x="15" y="200" fill="#cbd5e1" fontSize="8">• Ordered list of values</text>
                  <text x="15" y="215" fill="#cbd5e1" fontSize="8">• No trailing commas allowed</text>

                  {/* Card 5: Boolean */}
                  <rect x="285" y="130" width="250" height="110" rx="8" fill="#451a03" stroke="#f59e0b" />
                  <text x="300" y="155" fill="#fde68a" fontSize="11 font-bold">5. Boolean</text>
                  <text x="300" y="178" fill="#fbbf24" fontSize="9 font-mono font-bold">"is_enrolled": true</text>
                  <text x="300" y="200" fill="#cbd5e1" fontSize="8">• Strictly `true` or `false`</text>
                  <text x="300" y="215" fill="#cbd5e1" fontSize="8">• All lowercase characters</text>

                  {/* Card 6: Null */}
                  <rect x="570" y="130" width="250" height="110" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="585" y="155" fill="#fda4af" fontSize="11 font-bold">6. Null</text>
                  <text x="585" y="178" fill="#fda4af" fontSize="9 font-mono font-bold">"scholarship": null</text>
                  <text x="585" y="200" fill="#cbd5e1" fontSize="8">• Strictly lowercase `null`</text>
                  <text x="585" y="215" fill="#cbd5e1" fontSize="8">• Represents absence of value</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "mapping" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">PYTHON TYPE ↔ JSON TYPE BIDIRECTIONAL MAPPING MATRIX</text>

                {/* Left: Python Types */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="340" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Python Data Structures</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="9 font-mono">dict ({"{'a': 1}"})</text>
                  <text x="20" y="85" fill="#ecfdf5" fontSize="9 font-mono">list / tuple ([1, 2] / (1, 2))</text>
                  <text x="20" y="110" fill="#ecfdf5" fontSize="9 font-mono">str ("hello")</text>
                  <text x="20" y="135" fill="#ecfdf5" fontSize="9 font-mono">int / float (100 / 94.5)</text>
                  <text x="20" y="160" fill="#ecfdf5" fontSize="9 font-mono">True / False</text>
                  <text x="20" y="185" fill="#ecfdf5" fontSize="9 font-mono">None</text>
                  <text x="20" y="210" fill="#fca5a5" fontSize="8 font-mono">set, datetime, bytes (Unsupported!)</text>
                </g>

                {/* Arrow */}
                <g transform="translate(395, 140)">
                  <text x="0" y="0" fill="#38bdf8" fontSize="12" fontWeight="bold">json.dumps()</text>
                  <text x="15" y="25" fill="#38bdf8" fontSize="28" fontWeight="bold">⇆</text>
                  <text x="-5" y="45" fill="#38bdf8" fontSize="11 font-mono">json.loads()</text>
                </g>

                {/* Right: JSON Types */}
                <g transform="translate(510, 50)">
                  <rect x="0" y="0" width="340" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">JSON Representation (RFC 8259)</text>

                  <text x="20" y="60" fill="#34d399" fontSize="9 font-mono">object (&#123;"a": 1&#125;)</text>
                  <text x="20" y="85" fill="#34d399" fontSize="9 font-mono">array ([1, 2]) *Tuples become lists!</text>
                  <text x="20" y="110" fill="#34d399" fontSize="9 font-mono">string ("hello")</text>
                  <text x="20" y="135" fill="#34d399" fontSize="9 font-mono">number (100 / 94.5)</text>
                  <text x="20" y="160" fill="#34d399" fontSize="9 font-mono">true / false (lowercase)</text>
                  <text x="20" y="185" fill="#34d399" fontSize="9 font-mono">null (lowercase)</text>
                  <text x="20" y="210" fill="#fda4af" fontSize="8 font-mono">TypeError (Needs Custom JSONEncoder)</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">JSON SCHEMA CONTRACT &amp; PAYLOAD VALIDATOR FLOW</text>

                {/* 3 Step Flow */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11 font-bold">1. Raw JSON Input</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="8 font-mono">`POST /api/v1/admissions`</text>
                  <text x="15" y="75" fill="#cbd5e1" fontSize="8">Incoming payload string from</text>
                  <text x="15" y="90" fill="#cbd5e1" fontSize="8">frontend client application.</text>

                  <rect x="15" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="25" y="135" fill="#c4b5fd" fontSize="9 font-bold">Syntax Parsing:</text>
                  <text x="25" y="155" fill="#cbd5e1" fontSize="8">Calls `json.loads()`</text>
                  <text x="25" y="170" fill="#cbd5e1" fontSize="8">Catches JSONDecodeError.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Schema Contract Guard</text>
                  <text x="310" y="55" fill="#ecfdf5" fontSize="8 font-mono">1. Required keys check</text>
                  <text x="310" y="75" fill="#ecfdf5" fontSize="8 font-mono">2. Field type verification</text>
                  <text x="310" y="95" fill="#38bdf8" fontSize="8 font-mono font-bold">3. Range &amp; enum constraints</text>

                  <rect x="310" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="135" fill="#38bdf8" fontSize="9 font-bold">Business Validation:</text>
                  <text x="320" y="155" fill="#cbd5e1" fontSize="8">Ensures score in [0, 100]</text>
                  <text x="320" y="170" fill="#cbd5e1" fontSize="8">and fee_paid is positive.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="605" y="30" fill="#a7f3d0" fontSize="11 font-bold">3. Certified Execution</text>
                  <text x="605" y="55" fill="#ecfdf5" fontSize="8 font-mono">status: "REGISTERED"</text>
                  <text x="605" y="75" fill="#34d399" fontSize="8 font-mono font-bold">Inserts into PostgreSQL / DB</text>

                  <rect x="605" y="110" width="200" height="105" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="615" y="135" fill="#34d399" fontSize="9 font-bold">Zero Corrupted Data:</text>
                  <text x="615" y="155" fill="#cbd5e1" fontSize="8">Protects backend databases</text>
                  <text x="615" y="170" fill="#cbd5e1" fontSize="8">from invalid API payloads.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE JSON VALIDATOR PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive JSON Syntax &amp; Schema Validation Laboratory
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Test and diagnose common JSON syntax hazards (single quotes, trailing commas, invalid types) against our institutional student schema rules in real time:
          </p>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs font-mono text-slate-400 py-1.5 font-bold uppercase">Presets:</span>
            <button
              onClick={() => {
                setJsonInput(samplePresets.valid);
                setTimeout(handleValidate, 50);
              }}
              className="px-3 py-1 bg-teal-950 border border-teal-700/80 text-teal-300 rounded text-xs font-mono hover:bg-teal-900"
            >
              1. Valid Student JSON
            </button>
            <button
              onClick={() => {
                setJsonInput(samplePresets.singleQuotes);
                setTimeout(handleValidate, 50);
              }}
              className="px-3 py-1 bg-rose-950 border border-rose-700/80 text-rose-300 rounded text-xs font-mono hover:bg-rose-900"
            >
              2. Single Quotes Error
            </button>
            <button
              onClick={() => {
                setJsonInput(samplePresets.trailingComma);
                setTimeout(handleValidate, 50);
              }}
              className="px-3 py-1 bg-amber-950 border border-amber-700/80 text-amber-300 rounded text-xs font-mono hover:bg-amber-900"
            >
              3. Trailing Comma Error
            </button>
            <button
              onClick={() => {
                setJsonInput(samplePresets.schemaViolation);
                setTimeout(handleValidate, 50);
              }}
              className="px-3 py-1 bg-purple-950 border border-purple-700/80 text-purple-300 rounded text-xs font-mono hover:bg-purple-900"
            >
              4. Schema Range Violation
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Editor */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400 font-bold uppercase">
                <span>JSON Payload Input Editor:</span>
                <div className="flex gap-2">
                  <button
                    onClick={handleFormat}
                    className="text-[11px] text-teal-400 hover:text-white underline"
                  >
                    Format (indent=2)
                  </button>
                  <button
                    onClick={handleMinify}
                    className="text-[11px] text-cyan-400 hover:text-white underline"
                  >
                    Minify
                  </button>
                </div>
              </div>

              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={12}
                className="w-full bg-slate-900 text-slate-100 font-mono text-xs p-3 rounded-lg border border-slate-800 focus:border-teal-500 focus:outline-none leading-relaxed"
                placeholder="Enter JSON string here..."
              />

              <button
                onClick={handleValidate}
                className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold rounded-lg transition-all shadow-lg shadow-teal-950/50"
              >
                Validate JSON Syntax &amp; Schema Contract
              </button>
            </div>

            {/* Diagnostic Output */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Validation Status Banner */}
              <div
                className={clsx(
                  "p-4 rounded-xl border font-mono text-xs space-y-2",
                  validationResult.isValid
                    ? "bg-teal-950/60 border-teal-700 text-teal-200"
                    : "bg-rose-950/60 border-rose-800 text-rose-200"
                )}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  <span>{validationResult.isValid ? "✅" : "❌"}</span>
                  <span>{validationResult.isValid ? "VALIDATION PASSED" : "VALIDATION REJECTED"}</span>
                </div>
                <div className="text-[11px] leading-relaxed">{validationResult.message}</div>
              </div>

              {/* Error Details / Parsed Inspection */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[180px] font-mono text-xs space-y-1.5">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">
                  {validationResult.isValid ? "Parsed Object Inspection:" : "Validation Error Diagnostics:"}
                </span>

                {validationResult.isValid ? (
                  <div className="space-y-1 text-slate-300 text-[11px]">
                    <div><span className="text-teal-300 font-bold">Student ID:</span> {validationResult.parsed?.student_id}</div>
                    <div><span className="text-teal-300 font-bold">Name:</span> {validationResult.parsed?.name}</div>
                    <div><span className="text-teal-300 font-bold">Score:</span> {validationResult.parsed?.score}%</div>
                    <div><span className="text-teal-300 font-bold">Fee Paid:</span> INR {validationResult.parsed?.fee_paid?.toLocaleString()}</div>
                    <div><span className="text-teal-300 font-bold">Enrolled:</span> {String(validationResult.parsed?.is_enrolled)}</div>
                  </div>
                ) : (
                  <div className="space-y-1 text-rose-300 text-[11px]">
                    {validationResult.errors.map((err, idx) => (
                      <div key={idx} className="p-1.5 bg-rose-950/40 rounded border border-rose-800/60">
                        • {err}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER PYTHON VS JSON MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Python Types vs JSON Types Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Python Type</th>
                  <th className="py-3.5 px-4 font-bold">JSON Data Type</th>
                  <th className="py-3.5 px-4 font-bold">Round-Trip Restored Python Type</th>
                  <th className="py-3.5 px-4 font-bold">Serialization Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">dict</td>
                  <td className="py-3 px-4 font-mono text-slate-200">object</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono">dict</td>
                  <td className="py-3 px-4">All keys converted to strings</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">list</td>
                  <td className="py-3 px-4 font-mono text-slate-200">array</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono">list</td>
                  <td className="py-3 px-4">Direct mapping</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">tuple</td>
                  <td className="py-3 px-4 font-mono text-slate-200">array</td>
                  <td className="py-3 px-4 text-rose-300 font-mono">list (Tuple Asymmetry!)</td>
                  <td className="py-3 px-4 text-amber-300">Loses tuple immutability</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">str</td>
                  <td className="py-3 px-4 font-mono text-slate-200">string</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono">str</td>
                  <td className="py-3 px-4">Double-quoted UTF-8 Unicode</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">int / float</td>
                  <td className="py-3 px-4 font-mono text-slate-200">number</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono">int / float</td>
                  <td className="py-3 px-4">No NaN or Infinity literals</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-slate-300 font-semibold">True / False</td>
                  <td className="py-3 px-4 font-mono text-slate-200">true / false</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono">bool</td>
                  <td className="py-3 px-4">Lowercase booleans in JSON</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-slate-400 font-semibold">None</td>
                  <td className="py-3 px-4 font-mono text-slate-200">null</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono">NoneType</td>
                  <td className="py-3 px-4">Lowercase null in JSON</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-rose-400 font-semibold">set, datetime, bytes</td>
                  <td className="py-3 px-4 text-rose-400">TypeError</td>
                  <td className="py-3 px-4 text-rose-400">N/A</td>
                  <td className="py-3 px-4 text-rose-300">Requires Custom JSONEncoder</td>
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
            Explore 4 production-grade Python scripts demonstrating JSON data types, type equivalences, schema validation engines, and institutional student portal APIs:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "json_syntax_standards_and_data_types.py",
                code: jsonSyntaxCode,
                description: "The 6 JSON data types, RFC 8259 syntax rules, and catching JSONDecodeError.",
              },
              {
                filename: "json_vs_python_data_type_equivalences.py",
                code: typeEquivalences,
                description: "Bidirectional Python-to-JSON type mapping, tuple asymmetry, and unsupported type errors.",
              },
              {
                filename: "json_schema_validation_fundamentals.py",
                code: schemaFundamentals,
                description: "Declarative JSON schema definitions, type checks, and value range constraints.",
              },
              {
                filename: "institutional_student_portal_api_schema_spec.py",
                code: portalApiSpec,
                description: "Institutional Student Portal JSON API Schema Contract with certified output formatting.",
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
                <span>❌</span> Trap 1: Single Quotes in JSON
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">{"\"{'name': 'Sourav'}\""}</code> causes <code className="text-rose-300 font-mono">JSONDecodeError: Expecting property name enclosed in double quotes</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> JSON keys and strings MUST use double quotes <code className="text-emerald-300 font-mono">"..."</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Trailing Commas in Arrays/Objects
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-amber-300 font-mono">[1, 2, 3,]</code> or <code className="text-amber-300 font-mono">&#123;"a": 1,&#125;</code> is invalid JSON and raises decode errors.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Never leave trailing commas after the last element.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Tuple Asymmetry
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Serializing a tuple <code className="text-purple-300 font-mono">(1, 2)</code> produces a JSON array <code className="text-purple-300 font-mono">[1, 2]</code>, which re-parses as a <code className="text-purple-300 font-mono">list</code>, losing tuple immutability.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Explicitly cast back: <code className="text-emerald-300">tuple(parsed["items"])</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Direct Serialization of `set` / `datetime`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Passing sets or datetimes to <code className="text-cyan-300 font-mono">json.dumps()</code> crashes with <code className="text-cyan-300 font-mono">TypeError: Object of type ... is not JSON serializable</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Convert sets to lists and datetimes to <code className="text-emerald-300">dt.isoformat()</code>.
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
            Comprehensive question-and-answer repository covering JSON specifications, RFC 8259, data types, and schema validation:
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
            Download or print the complete reference sheet with JSON grammar rules, type mapping matrices, and schema templates:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic0_json_overview_notes.txt"
              title="Print Topic 0 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
