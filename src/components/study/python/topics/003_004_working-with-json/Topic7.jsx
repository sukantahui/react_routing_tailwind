import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import schemaEngine from "./topic7_files/json_schema_validation_engine_jsonschema.py?raw";
import pureValidator from "./topic7_files/lightweight_pure_python_schema_validator.py?raw";
import pydanticCoercion from "./topic7_files/pydantic_schema_validation_and_coercion.py?raw";
import admissionSuite from "./topic7_files/institutional_admission_application_validator_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic7_files/topic7_note.txt?raw";

// FAQ Questions
import questions from "./topic7_files/topic7_questions";

/**
 * Topic7: Validating and sanitizing JSON data schemas
 * Module: 003_004_working-with-json
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic7() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("schema");

  // Interactive Validation & Sanitization Laboratory State
  const goldenValidPayload = `{
  "student_id": "STU-101",
  "full_name": "Sourav Mukherjee",
  "email": "sourav@codernaccotax.co.in",
  "course_code": "PY-AI",
  "tuition_fee": 28500.0,
  "age": 22
}`;

  const maliciousPayload = `{
  "student_id": "S1",
  "full_name": "<script>alert('xss')</script>Priyanka Sen",
  "email": "invalid_email_format",
  "course_code": "ILLEGAL_COURSE",
  "tuition_fee": 500.0,
  "age": 12,
  "hacker_field": "unauthorized_data"
}`;

  const [payloadInput, setPayloadInput] = useState(goldenValidPayload);
  const [enableXssSanitizer, setEnableXssSanitizer] = useState(true);
  const [enforceStrictSchema, setEnforceStrictSchema] = useState(true);
  const [rejectAdditionalProps, setRejectAdditionalProps] = useState(true);
  const [validationErrors, setValidationErrors] = useState([]);
  const [sanitizedJson, setSanitizedJson] = useState(null);
  const [validationPassed, setValidationPassed] = useState(true);

  const runValidation = () => {
    try {
      const doc = JSON.parse(payloadInput);
      const errors = [];
      const sanitized = {};

      // 1. Check additionalProperties
      const allowedKeys = new Set(["student_id", "full_name", "email", "course_code", "tuition_fee", "age"]);
      if (rejectAdditionalProps) {
        for (const k of Object.keys(doc)) {
          if (!allowedKeys.has(k)) {
            errors.push(`AdditionalProperty: '${k}' is not allowed by schema (additionalProperties: False)`);
          }
        }
      }

      // 2. student_id validation
      if (!doc.student_id || typeof doc.student_id !== "string" || doc.student_id.length < 5) {
        errors.push("student_id: Must be a string with at least 5 characters (e.g. STU-101)");
      } else {
        sanitized.student_id = doc.student_id;
      }

      // 3. full_name validation & XSS sanitization
      if (!doc.full_name || typeof doc.full_name !== "string" || doc.full_name.length < 3) {
        errors.push("full_name: Must be at least 3 characters long");
      } else {
        if (enableXssSanitizer) {
          sanitized.full_name = doc.full_name.replace(/<[^>]*>/g, "").trim();
        } else {
          sanitized.full_name = doc.full_name;
        }
      }

      // 4. email validation
      const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!doc.email || !emailRegex.test(doc.email)) {
        errors.push("email: Must be a valid email format matching standard RFC pattern");
      } else {
        sanitized.email = doc.email.toLowerCase().trim();
      }

      // 5. course_code enum validation
      const allowedCourses = ["PY-AI", "DS-ML", "FULL-STACK"];
      if (!allowedCourses.includes(doc.course_code)) {
        errors.push(`course_code: Value '${doc.course_code}' must be one of ${JSON.stringify(allowedCourses)}`);
      } else {
        sanitized.course_code = doc.course_code;
      }

      // 6. tuition_fee range
      const fee = Number(doc.tuition_fee);
      if (isNaN(fee) || fee < 10000.0 || fee > 100000.0) {
        errors.push(`tuition_fee: Fee (${doc.tuition_fee}) must be between INR 10,000 and INR 100,000`);
      } else {
        sanitized.tuition_fee = fee;
      }

      // 7. age range
      if (doc.age !== undefined) {
        const age = Number(doc.age);
        if (isNaN(age) || age < 16 || age > 80) {
          errors.push(`age: Value (${doc.age}) must be between 16 and 80`);
        } else {
          sanitized.age = age;
        }
      }

      setValidationErrors(errors);
      setValidationPassed(errors.length === 0);
      setSanitizedJson(sanitized);
    } catch {
      setValidationErrors(["JSONParseError: Invalid JSON syntax in payload editor"]);
      setValidationPassed(false);
      setSanitizedJson(null);
    }
  };

  useEffect(() => {
    runValidation();
  }, [payloadInput, enableXssSanitizer, enforceStrictSchema, rejectAdditionalProps]);

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
            Topic 7
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Working with JSON &amp; External Data APIs
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          JSON Schema: <span className="text-teal-400">Validation &amp; Sanitization</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master contract validation and data sanitization in Python: the formal JSON Schema standard (<code className="text-teal-300 font-mono">Draft 2020-12</code>), constraint keywords (<code className="text-cyan-300 font-mono">minimum</code>, <code className="text-cyan-300 font-mono">enum</code>, <code className="text-cyan-300 font-mono">pattern</code>), Pydantic type coercion, defense-in-depth XSS sanitization, and quarantined batch error isolation.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📜 JSON Schema Draft 2020-12
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ `additionalProperties: False`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧹 Anti-XSS Sanitization
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🚨 Quarantine Error Isolation
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: SCHEMA VALIDATION FOUNDATIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📜</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. JSON Schema Specification &amp; Sanitization Principles
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Schema validation acts as the first line of defense at the API boundary, ensuring invalid or malicious data is caught before reaching core business logic:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ JSON Schema Contract</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">validate(data, schema)</code>
                <p className="text-[11px] text-slate-300">
                  IETF declarative standard defining required keys, data types, numeric ranges, and regex patterns.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Security Sanitization</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">html.escape(strip_tags(s))</code>
                <p className="text-[11px] text-slate-300">
                  Strips malicious HTML and script tags to prevent Cross-Site Scripting (XSS) in stored records.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Quarantined Isolation</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">quarantine.append(record)</code>
                <p className="text-[11px] text-slate-300">
                  Isolates rejected records in a diagnostic log without dropping or crashing the entire batch process.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The `additionalProperties: False` Security Invariant
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Always include <code className="text-teal-300">"additionalProperties": false</code> in your JSON Schemas. This prevents Mass Assignment attacks where attackers inject unauthorized fields (e.g. <code className="text-rose-400">"is_admin": true</code>) into registration endpoints.
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
                2. Visualizing Validation Flows, Coercion &amp; Anti-XSS
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("schema")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "schema"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                JSON Schema Contract
              </button>
              <button
                onClick={() => setActiveInteractiveTab("pydantic")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "pydantic"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Pydantic Coercion
              </button>
              <button
                onClick={() => setActiveInteractiveTab("sanitizer")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "sanitizer"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Anti-XSS Defense
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining declarative contract gates, automatic type coercion pipelines, and XSS sanitizers:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "schema" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">JSON SCHEMA VALIDATION GATEWAY (`Draft 2020-12`)</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11 font-bold">1. Incoming JSON Payload</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="8 font-mono">&#123;</text>
                  <text x="25" y="72" fill="#38bdf8" fontSize="8 font-mono">"student_id": "STU-101",</text>
                  <text x="25" y="89" fill="#34d399" fontSize="8 font-mono">"fee": 28500.0</text>
                  <text x="15" y="106" fill="#ecfdf5" fontSize="8 font-mono">&#125;</text>

                  <rect x="15" y="115" width="220" height="100" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="25" y="140" fill="#c4b5fd" fontSize="9 font-bold">Untrusted Client Input:</text>
                  <text x="25" y="160" fill="#cbd5e1" fontSize="8">May contain corrupt types,</text>
                  <text x="25" y="175" fill="#cbd5e1" fontSize="8">missing fields, or attacks.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Schema Specification</text>
                  <text x="310" y="55" fill="#38bdf8" fontSize="8 font-mono">required: ["student_id", ...]</text>
                  <text x="310" y="75" fill="#38bdf8" fontSize="8 font-mono">fee: minimum: 10000.0</text>
                  <text x="310" y="95" fill="#34d399" fontSize="8 font-mono">additionalProperties: false</text>

                  <rect x="310" y="115" width="220" height="100" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="140" fill="#38bdf8" fontSize="9 font-bold">Declarative Gate:</text>
                  <text x="320" y="160" fill="#cbd5e1" fontSize="8">Inspects every property</text>
                  <text x="320" y="175" fill="#cbd5e1" fontSize="8">against type and bound rules.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="605" y="30" fill="#a7f3d0" fontSize="11 font-bold">3. Validated Database Ingestion</text>
                  <text x="605" y="55" fill="#34d399" fontSize="8 font-mono">VALIDATION_PASSED [OK]</text>
                  <text x="605" y="75" fill="#ecfdf5" fontSize="8 font-mono">Safe for SQL Persistence</text>

                  <rect x="605" y="115" width="200" height="100" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="615" y="140" fill="#34d399" fontSize="9 font-bold">Zero Corrupt Records:</text>
                  <text x="615" y="160" fill="#cbd5e1" fontSize="8">Database guaranteed to</text>
                  <text x="615" y="175" fill="#cbd5e1" fontSize="8">hold 100% compliant data.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "pydantic" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">PYDANTIC MODEL VALIDATION &amp; TYPE COERCION PIPELINE</text>

                {/* Left: Input */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">1. Raw Unformatted HTTP Payload</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="8 font-mono">&#123;</text>
                  <text x="35" y="78" fill="#fca5a5" fontSize="8 font-mono">"full_name": "  sourav mukherjee  ",</text>
                  <text x="35" y="96" fill="#fca5a5" fontSize="8 font-mono">"tuition_fee": "28500.50",</text>
                  <text x="35" y="114" fill="#fca5a5" fontSize="8 font-mono">"email": "SOURAV@CODER.IN"</text>
                  <text x="20" y="132" fill="#ecfdf5" fontSize="8 font-mono">&#125;</text>

                  <rect x="20" y="150" width="340" height="70" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="172" fill="#34d399" fontSize="9 font-bold">Unformatted Data:</text>
                  <text x="30" y="190" fill="#cbd5e1" fontSize="8">Strings submitted via web forms require cleanup.</text>
                </g>

                {/* Right: Coerced Model */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">2. Strongly-Typed Validated Instance</text>

                  <text x="20" y="60" fill="#34d399" fontSize="8 font-mono font-bold">StudentRecordModel(</text>
                  <text x="35" y="78" fill="#ecfdf5" fontSize="8 font-mono">full_name="Sourav Mukherjee",</text>
                  <text x="35" y="96" fill="#38bdf8" fontSize="8 font-mono">tuition_fee=Decimal('28500.50'),</text>
                  <text x="35" y="114" fill="#ecfdf5" fontSize="8 font-mono">email="sourav@coder.in"</text>
                  <text x="20" y="132" fill="#34d399" fontSize="8 font-mono font-bold">)</text>

                  <rect x="20" y="150" width="340" height="70" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="172" fill="#c4b5fd" fontSize="9 font-bold">Automatic Coercion:</text>
                  <text x="30" y="190" fill="#cbd5e1" fontSize="8">Trimmed whitespace, normalized case, Decimal fee.</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">DEFENSE-IN-DEPTH ANTI-XSS SANITIZATION &amp; STRIPPING</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="15" y="30" fill="#fda4af" fontSize="11 font-bold">1. Malicious Injected String</text>
                  <text x="15" y="55" fill="#fca5a5" fontSize="8 font-mono font-bold">&lt;script&gt;alert(1)&lt;/script&gt;</text>
                  <text x="15" y="75" fill="#ecfdf5" fontSize="8 font-mono">Sourav Mukherjee</text>

                  <rect x="15" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="25" y="135" fill="#fda4af" fontSize="9 font-bold">Attack Vector:</text>
                  <text x="25" y="155" fill="#cbd5e1" fontSize="8">Stored XSS attacking admin</text>
                  <text x="25" y="170" fill="#cbd5e1" fontSize="8">dashboards viewing student records.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Sanitization Pipeline</text>
                  <text x="310" y="55" fill="#38bdf8" fontSize="8 font-mono">clean = re.sub(r"&lt;[^&gt;]*&gt;", "")</text>
                  <text x="310" y="75" fill="#38bdf8" fontSize="8 font-mono">clean = html.escape(clean)</text>

                  <rect x="310" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="135" fill="#38bdf8" fontSize="9 font-bold">Tag Stripper &amp; Escaper:</text>
                  <text x="320" y="155" fill="#cbd5e1" fontSize="8">Completely neutralizes HTML</text>
                  <text x="320" y="170" fill="#cbd5e1" fontSize="8">and script tags automatically.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="605" y="30" fill="#a7f3d0" fontSize="11 font-bold">3. Cleaned Safe String</text>
                  <text x="605" y="55" fill="#34d399" fontSize="8 font-mono font-bold">"Sourav Mukherjee"</text>
                  <text x="605" y="75" fill="#cbd5e1" fontSize="8">100% Safe for DB &amp; UI</text>

                  <rect x="605" y="110" width="200" height="105" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="615" y="135" fill="#34d399" fontSize="9 font-bold">Clean Persistent Entity:</text>
                  <text x="615" y="155" fill="#cbd5e1" fontSize="8">No threat of client-side</text>
                  <text x="615" y="170" fill="#cbd5e1" fontSize="8">execution on student portals.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE SCHEMA VALIDATION & SANITIZER LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive JSON Schema Validator &amp; Sanitizer Laboratory
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Test validating JSON payloads against strict enterprise constraints, observe anti-XSS stripping, and inspect quarantined field-level violations:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls & Payload Editor */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Incoming Admission JSON Payload Editor
                </span>
                <div className="flex gap-2 text-[11px] font-mono">
                  <button
                    onClick={() => setPayloadInput(goldenValidPayload)}
                    className="text-teal-400 hover:text-white underline"
                  >
                    Load Golden Valid
                  </button>
                  <button
                    onClick={() => setPayloadInput(maliciousPayload)}
                    className="text-rose-400 hover:text-white underline"
                  >
                    Load Malicious
                  </button>
                </div>
              </div>

              <textarea
                value={payloadInput}
                onChange={(e) => setPayloadInput(e.target.value)}
                rows={10}
                className="w-full bg-slate-900 text-slate-100 font-mono text-xs p-3 rounded-lg border border-slate-800 focus:border-teal-500 focus:outline-none leading-relaxed"
              />

              {/* Toggles */}
              <div className="space-y-2 text-xs font-mono pt-1">
                <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableXssSanitizer}
                    onChange={(e) => setEnableXssSanitizer(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Enable Anti-XSS Sanitizer (Strips &lt;script&gt; and HTML tags)</span>
                </label>

                <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rejectAdditionalProps}
                    onChange={(e) => setRejectAdditionalProps(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Enforce `additionalProperties: False` (Rejects undeclared keys)</span>
                </label>
              </div>
            </div>

            {/* Validation & Sanitization Inspector */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Validation Status Banner */}
              <div
                className={clsx(
                  "p-3 rounded-xl border font-mono text-xs space-y-1.5",
                  validationPassed
                    ? "bg-emerald-950/60 border-emerald-800 text-emerald-300"
                    : "bg-rose-950/60 border-rose-800 text-rose-300"
                )}
              >
                <div className="font-bold text-[11px] uppercase flex items-center justify-between">
                  <span>Validation Gate Status:</span>
                  <span>{validationPassed ? "[PASSED • 100% COMPLIANT]" : `[REJECTED • ${validationErrors.length} ERRORS]`}</span>
                </div>

                {validationErrors.length > 0 && (
                  <div className="space-y-1 pt-1 border-t border-rose-800/60 max-h-[90px] overflow-y-auto">
                    {validationErrors.map((err, idx) => (
                      <div key={idx} className="text-[10px] text-rose-300 leading-snug">
                        • {err}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sanitized Clean Output */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] font-mono text-xs space-y-1">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">
                  Sanitized &amp; Cleaned Document Output:
                </span>
                <pre className="text-slate-200 text-[11px] leading-relaxed">
                  {sanitizedJson ? JSON.stringify(sanitizedJson, null, 2) : "Parsing failed: Malformed JSON syntax"}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER SCHEMA VALIDATION MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master JSON Schema Validation &amp; Constraint Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Constraint Keyword</th>
                  <th className="py-3.5 px-4 font-bold">JSON Schema Syntax</th>
                  <th className="py-3.5 px-4 font-bold">Pydantic Equivalent</th>
                  <th className="py-3.5 px-4 font-bold">Enforced Guarantee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">required</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`required: ["id", "fee"]`</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono">`id: str` (no default)</td>
                  <td className="py-3 px-4">Guarantees mandatory keys are present</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">minimum / maximum</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`minimum: 10000`</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono">`Field(ge=10000, le=100000)`</td>
                  <td className="py-3 px-4">Guarantees numeric values stay within boundaries</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">pattern</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`pattern: "^STU-\\d&#123;3&#125;$"`</td>
                  <td className="py-3 px-4 text-purple-300 font-mono">`Field(pattern=r"...")`</td>
                  <td className="py-3 px-4">Guarantees string matches exact regex format</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">enum</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`enum: ["PY", "DS"]`</td>
                  <td className="py-3 px-4 text-amber-300 font-mono">`course: CourseEnum`</td>
                  <td className="py-3 px-4">Restricts values to explicit allowable choices</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-rose-300 font-semibold">additionalProperties</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`additionalProperties: false`</td>
                  <td className="py-3 px-4 text-rose-300 font-mono">`extra='forbid'`</td>
                  <td className="py-3 px-4">Blocks unauthorized/unexpected extra fields</td>
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
            Explore 4 production-grade Python scripts demonstrating JSON Schema validators, lightweight pure Python rules, Pydantic type coercion, and institutional admission validation suites:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "json_schema_validation_engine_jsonschema.py",
                code: schemaEngine,
                description: "JSON Schema specification validator with required keys, enums, and regex patterns.",
              },
              {
                filename: "lightweight_pure_python_schema_validator.py",
                code: pureValidator,
                description: "Zero-dependency pure Python schema validator with HTML sanitization.",
              },
              {
                filename: "pydantic_schema_validation_and_coercion.py",
                code: pydanticCoercion,
                description: "Pydantic-style schema validation, automatic type coercion, and structured field errors.",
              },
              {
                filename: "institutional_admission_application_validator_suite.py",
                code: admissionSuite,
                description: "Institutional Admission Application validator with XSS stripping and quarantined isolation.",
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
                <span>❌</span> Trap 1: Omitting `additionalProperties: False`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                By default, JSON Schema permits arbitrary extra keys. Attackers can inject unauthorized fields (e.g. <code className="text-rose-300 font-mono">is_admin: true</code>) into registration endpoints.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always set <code className="text-emerald-300">"additionalProperties": false</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Relying Solely on Client-Side Checks
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                HTML5 form constraints can be bypassed in seconds with curl or Postman. Backend server-side validation is non-negotiable.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always re-validate and sanitize on the server.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Stored XSS Script Injections
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Accepting raw text fields (e.g. <code className="text-purple-300 font-mono">&lt;script&gt;...&lt;/script&gt;</code>) without stripping HTML tags allows attackers to execute code in administrator web dashboards.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Strip HTML tags and run <code className="text-emerald-300">html.escape()</code> before storage.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Crashing Entire Batches on Single Bad Record
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Raising an unhandled exception on record #50 in a 1,000-record batch rolls back the entire transaction.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Quarantine invalid records and process valid ones.
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
            Comprehensive question-and-answer repository covering JSON Schema, Pydantic, XSS sanitization, additionalProperties, and quarantined isolation:
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
            Download or print the complete reference sheet with JSON Schema recipes, Pydantic coercion patterns, and anti-XSS sanitizer implementations:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic7_json_schema_validation_notes.txt"
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
