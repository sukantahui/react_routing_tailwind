import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import customEncoder from "./topic4_files/custom_json_encoder_subclassing.py?raw";
import objectHook from "./topic4_files/deserializing_custom_objects_with_object_hook.py?raw";
import dataclassCodec from "./topic4_files/bidirectional_custom_codec_dataclass_pipeline.py?raw";
import portfolioSuite from "./topic4_files/institutional_student_portfolio_codec_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic4_files/topic4_note.txt?raw";

// FAQ Questions
import questions from "./topic4_files/topic4_questions";

/**
 * Topic4: Handling custom Python objects with custom JSONEncoders & object_hook
 * Module: 003_004_working-with-json
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic4() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("encoder");

  // Interactive Codec Laboratory State
  const [encoderMode, setEncoderMode] = useState("custom"); // standard | custom
  const [decoderMode, setDecoderMode] = useState("hook"); // generic | hook
  const [stage, setStage] = useState("object"); // object | json | restored
  const [hasError, setHasError] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Ready to serialize custom StudentPortfolio instance.");
  const [meritGrantResult, setMeritGrantResult] = useState(null);

  const sampleStudent = {
    className: "StudentPortfolio",
    student_id: "STU-101",
    full_name: "Sourav Mukherjee",
    total_fees_paid: "35000.00 (Decimal)",
    enrollment_dt: "2026-08-24T10:30:00 (datetime)",
    skill_tags: ["PYTHON_CORE", "AI_PRO", "DECORATORS_MASTER"],
    certificates: [
      { cert_code: "CERT-PY-01", title: "Python AI Engineering", honors_tier: "PLATINUM" },
      { cert_code: "CERT-DB-02", title: "Database Systems", honors_tier: "GOLD" },
    ],
  };

  const sampleSerializedJson = `{
  "__model__": "StudentPortfolio",
  "student_id": "STU-101",
  "full_name": "Sourav Mukherjee",
  "total_fees_paid": 35000.0,
  "enrollment_dt": "2026-08-24T10:30:00",
  "skill_tags": [
    "AI_PRO",
    "DECORATORS_MASTER",
    "PYTHON_CORE"
  ],
  "certificates": [
    {
      "__model__": "AcademicCertificate",
      "cert_code": "CERT-PY-01",
      "title": "Python AI Engineering",
      "honors_tier": "PLATINUM"
    },
    {
      "__model__": "AcademicCertificate",
      "cert_code": "CERT-DB-02",
      "title": "Database Systems",
      "honors_tier": "GOLD"
    }
  ]
}`;

  const handleSerialize = () => {
    if (encoderMode === "standard") {
      setHasError(true);
      setStage("object");
      setStatusMessage("TypeError: Object of type StudentPortfolio is not JSON serializable! (Switch to Custom Enterprise JSONEncoder)");
      setMeritGrantResult(null);
    } else {
      setHasError(false);
      setStage("json");
      setStatusMessage("Successfully serialized custom domain object using EnterpriseJSONEncoder.");
      setMeritGrantResult(null);
    }
  };

  const handleDeserialize = () => {
    if (stage !== "json") {
      if (encoderMode === "standard") {
        handleSerialize();
        return;
      }
    }
    setHasError(false);
    setStage("restored");
    if (decoderMode === "hook") {
      setStatusMessage("Reconstructed StudentPortfolio instance with live callable methods via object_hook!");
    } else {
      setStatusMessage("Deserialized into generic Python dict. Notice: Business logic methods are NOT available!");
    }
    setMeritGrantResult(null);
  };

  const handleExecuteMethod = () => {
    if (stage !== "restored" || decoderMode !== "hook") {
      setStatusMessage("Cannot execute method! Generic dicts have no 'calculate_merit_grant()' method. Use object_hook!");
      return;
    }
    // Calculate 25% of 35000
    setMeritGrantResult("INR 8,750.00 (25% Platinum Merit Grant)");
    setStatusMessage("Executed student.calculate_merit_grant() on restored instance successfully!");
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
            Topic 4
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Working with JSON &amp; External Data APIs
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Custom Python Objects: <span className="text-teal-400">`JSONEncoder` &amp; `object_hook`</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master custom object serialization and deserialization in Python: subclassing <code className="text-teal-300 font-mono">json.JSONEncoder</code>, overriding <code className="text-teal-300 font-mono">default()</code> to encode complex types (<code className="text-cyan-300 font-mono">datetime</code>, <code className="text-cyan-300 font-mono">Decimal</code>, <code className="text-cyan-300 font-mono">UUID</code>, <code className="text-cyan-300 font-mono">set</code>), and reconstructing rich Python class instances with <code className="text-purple-300 font-mono">object_hook</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧬 Subclassing `json.JSONEncoder`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚙️ Overriding `default(self, o)`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 Deserializing with `object_hook`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 Bidirectional Dataclass Codecs
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: CUSTOM CODEC ARCHITECTURE */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧬</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. Custom Object Serialization &amp; Deserialization Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              By default, Python's <code className="text-teal-300 font-mono">json</code> module only serializes native primitive types. Custom domain classes, datetimes, decimals, and sets require a dual-stage Codec architecture:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ `JSONEncoder.default()`</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">def default(self, o): ...</code>
                <p className="text-[11px] text-slate-300">
                  Transforms custom classes into dictionaries containing serializable primitives and a type tag.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Type Discriminator</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">"__type__": "StudentRecord"</code>
                <p className="text-[11px] text-slate-300">
                  Embeds metadata into the JSON payload identifying which Python class to reconstruct.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ `object_hook` Factory</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">object_hook=custom_hook</code>
                <p className="text-[11px] text-slate-300">
                  Re-instantiates rich Python class instances with live methods from parsed JSON dictionaries.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Mandatory `super().default(o)` Fallback
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                When subclassing <code className="text-teal-300">json.JSONEncoder</code>, always end your <code className="text-teal-300">default()</code> method with <code className="text-cyan-300">return super().default(o)</code>. This ensures unhandled objects correctly raise standard <code className="text-rose-400">TypeError</code> instead of causing infinite recursion or corrupt output.
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
                2. Visualizing Encoder Subclasses, `object_hook` &amp; Codecs
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("encoder")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "encoder"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                `JSONEncoder` Subclass
              </button>
              <button
                onClick={() => setActiveInteractiveTab("hook")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "hook"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                `object_hook` Factory
              </button>
              <button
                onClick={() => setActiveInteractiveTab("roundtrip")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "roundtrip"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Bidirectional Dataclass Codec
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining encoder dispatch hierarchies, bottom-up object hooks, and dataclass round-trip codecs:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "encoder" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">CUSTOM `JSONEncoder` SUBCLASS ARCHITECTURE (`default()` OVERRIDE)</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11 font-bold">1. Custom Python Object</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="8 font-mono">student = StudentRecord(...)</text>
                  <text x="15" y="75" fill="#cbd5e1" fontSize="8">Contains Decimal, Datetime,</text>
                  <text x="15" y="90" fill="#cbd5e1" fontSize="8">Sets, and nested Certificates.</text>

                  <rect x="15" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="25" y="135" fill="#c4b5fd" fontSize="9 font-bold">Standard Encoder:</text>
                  <text x="25" y="155" fill="#fca5a5" fontSize="8">• Raises TypeError</text>
                  <text x="25" y="170" fill="#fca5a5" fontSize="8">• Cannot serialize domain classes</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. `default(self, o)` Dispatch</text>
                  <text x="310" y="55" fill="#38bdf8" fontSize="8 font-mono">if isinstance(o, Student):</text>
                  <text x="325" y="70" fill="#ecfdf5" fontSize="8 font-mono">return &#123;"__type__": ...&#125;</text>
                  <text x="310" y="90" fill="#38bdf8" fontSize="8 font-mono">elif isinstance(o, Decimal):</text>
                  <text x="325" y="105" fill="#ecfdf5" fontSize="8 font-mono">return float(o)</text>

                  <rect x="310" y="125" width="220" height="90" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="150" fill="#38bdf8" fontSize="9 font-bold">Recursive Primitive Reduction:</text>
                  <text x="320" y="170" fill="#cbd5e1" fontSize="8">Converts rich objects to</text>
                  <text x="320" y="185" fill="#cbd5e1" fontSize="8">native JSON data primitives.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="605" y="30" fill="#a7f3d0" fontSize="11 font-bold">3. Valid JSON Output</text>
                  <text x="605" y="55" fill="#ecfdf5" fontSize="8 font-mono">&#123;</text>
                  <text x="615" y="75" fill="#34d399" fontSize="8 font-mono">"__type__": "Student",</text>
                  <text x="615" y="95" fill="#34d399" fontSize="8 font-mono">"fee": 35000.0</text>
                  <text x="605" y="115" fill="#ecfdf5" fontSize="8 font-mono">&#125;</text>

                  <rect x="605" y="130" width="200" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="615" y="155" fill="#34d399" fontSize="9 font-bold">Preserved Metadata:</text>
                  <text x="615" y="175" fill="#cbd5e1" fontSize="8">Ready for network transfer</text>
                  <text x="615" y="190" fill="#cbd5e1" fontSize="8">or database storage.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "hook" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">`object_hook` DESERIALIZATION &amp; DOMAIN CLASS FACTORY PIPELINE</text>

                {/* Left: JSON Input */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">1. Parsed JSON Dictionaries (Bottom-Up)</text>
                  
                  <text x="20" y="60" fill="#ecfdf5" fontSize="8 font-mono">&#123;</text>
                  <text x="35" y="78" fill="#34d399" fontSize="8 font-mono font-bold">"__type__": "StudentRecord",</text>
                  <text x="35" y="96" fill="#ecfdf5" fontSize="8 font-mono">"student_id": "STU-101",</text>
                  <text x="35" y="114" fill="#ecfdf5" fontSize="8 font-mono">"fee_paid": 35000.0</text>
                  <text x="20" y="132" fill="#ecfdf5" fontSize="8 font-mono">&#125;</text>

                  <rect x="20" y="150" width="340" height="70" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="172" fill="#34d399" fontSize="9 font-bold">Hook Trigger:</text>
                  <text x="30" y="190" fill="#cbd5e1" fontSize="8">`object_hook` receives every decoded dictionary.</text>
                </g>

                {/* Right: Class Reconstitution */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">2. Restored Domain Model Instance</text>

                  <text x="20" y="60" fill="#38bdf8" fontSize="8 font-mono font-bold">return StudentRecord(</text>
                  <text x="35" y="78" fill="#ecfdf5" fontSize="8 font-mono">student_id=dct["student_id"],</text>
                  <text x="35" y="96" fill="#ecfdf5" fontSize="8 font-mono">fee_paid=Decimal(str(dct["fee"])),</text>
                  <text x="20" y="114" fill="#38bdf8" fontSize="8 font-mono font-bold">)</text>

                  <rect x="20" y="135" width="340" height="85" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="160" fill="#c4b5fd" fontSize="9 font-bold">Method &amp; Property Restoration:</text>
                  <text x="30" y="180" fill="#cbd5e1" fontSize="8">• `student.calculate_merit_grant()` is callable!</text>
                  <text x="30" y="195" fill="#a7f3d0" fontSize="8">• Restores Decimal precision and Set uniqueness</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">BIDIRECTIONAL DATACLASS CODEC ROUND-TRIP FIDELITY</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="15" y="30" fill="#a5f3fc" fontSize="11 font-bold">1. `@dataclass` Instance</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="8 font-mono">course = AcademicCourse(...)</text>
                  <text x="15" y="75" fill="#38bdf8" fontSize="8 font-mono">tier: CourseTier.ADVANCED</text>

                  <rect x="15" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="25" y="135" fill="#38bdf8" fontSize="9 font-bold">Dataclass Definition:</text>
                  <text x="25" y="155" fill="#cbd5e1" fontSize="8">Rich type hints and Enum</text>
                  <text x="25" y="170" fill="#cbd5e1" fontSize="8">tier values in Python.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="310" y="30" fill="#99f6e4" fontSize="11 font-bold">2. `Codec.serialize(obj)`</text>
                  <text x="310" y="55" fill="#ecfdf5" fontSize="8 font-mono">Uses `asdict(obj)` +</text>
                  <text x="310" y="75" fill="#34d399" fontSize="8 font-mono font-bold">"__dataclass__": "Course"</text>

                  <rect x="310" y="110" width="220" height="105" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="320" y="135" fill="#34d399" fontSize="9 font-bold">Lossless Encoding:</text>
                  <text x="320" y="155" fill="#cbd5e1" fontSize="8">Serializes Enums to strings</text>
                  <text x="320" y="170" fill="#cbd5e1" fontSize="8">and dates to ISO strings.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="605" y="30" fill="#c4b5fd" fontSize="11 font-bold">3. `Codec.deserialize(str)`</text>
                  <text x="605" y="55" fill="#ecfdf5" fontSize="8 font-mono">Rebuilds `AcademicCourse`</text>
                  <text x="605" y="75" fill="#34d399" fontSize="8 font-mono font-bold">`restored == original` [True]</text>

                  <rect x="605" y="110" width="200" height="105" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="615" y="135" fill="#c4b5fd" fontSize="9 font-bold">100% Roundtrip Match:</text>
                  <text x="615" y="155" fill="#cbd5e1" fontSize="8">Zero data loss or type drift</text>
                  <text x="615" y="170" fill="#cbd5e1" fontSize="8">across serialization.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE CUSTOM CODEC LABORATORY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Custom Object Codec &amp; Method Restoration Lab
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Test serializing a rich <code className="text-teal-300 font-mono">StudentPortfolio</code> domain instance, observe how standard encoders fail vs custom encoders, and execute methods on restored class objects:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Codec Mode Configuration
                </span>
              </div>

              {/* Encoder Mode */}
              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-300">Serialization Encoder:</span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  <button
                    onClick={() => setEncoderMode("custom")}
                    className={clsx(
                      "flex-1 py-1.5 rounded transition-all",
                      encoderMode === "custom"
                        ? "bg-teal-900/60 text-teal-300 font-bold border border-teal-700/80"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    Custom `EnterpriseJSONEncoder`
                  </button>
                  <button
                    onClick={() => setEncoderMode("standard")}
                    className={clsx(
                      "flex-1 py-1.5 rounded transition-all",
                      encoderMode === "standard"
                        ? "bg-rose-900/60 text-rose-300 font-bold border border-rose-700/80"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    Standard `json.dumps()` (Fails)
                  </button>
                </div>
              </div>

              {/* Decoder Mode */}
              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-300">Deserialization Strategy:</span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  <button
                    onClick={() => setDecoderMode("hook")}
                    className={clsx(
                      "flex-1 py-1.5 rounded transition-all",
                      decoderMode === "hook"
                        ? "bg-purple-900/60 text-purple-300 font-bold border border-purple-700/80"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    Domain `object_hook` (Restores Class)
                  </button>
                  <button
                    onClick={() => setDecoderMode("generic")}
                    className={clsx(
                      "flex-1 py-1.5 rounded transition-all",
                      decoderMode === "generic"
                        ? "bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-700/80"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    Generic `dict` (No Methods)
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <div className="flex gap-2">
                  <button
                    onClick={handleSerialize}
                    className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold rounded-lg transition-all shadow-lg shadow-teal-950/50"
                  >
                    1. Execute `json.dumps()`
                  </button>
                  <button
                    onClick={handleDeserialize}
                    className="flex-1 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold rounded-lg transition-all shadow-lg shadow-cyan-950/50"
                  >
                    2. Execute `json.loads()`
                  </button>
                </div>

                <button
                  onClick={handleExecuteMethod}
                  className="w-full py-2.5 bg-purple-700 hover:bg-purple-600 text-white font-mono text-xs font-bold rounded-lg transition-all shadow-lg shadow-purple-950/50"
                >
                  3. Invoke `student.calculate_merit_grant()`
                </button>
              </div>
            </div>

            {/* Output & State Inspection */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Status Banner */}
              <div
                className={clsx(
                  "p-3 rounded-xl border font-mono text-xs",
                  hasError
                    ? "bg-rose-950/60 border-rose-800 text-rose-300"
                    : "bg-slate-900 border-slate-800 text-teal-300"
                )}
              >
                <div className="font-bold text-[11px] uppercase mb-1">Codec Status:</div>
                <div className="text-[11px] leading-relaxed">{statusMessage}</div>
                {meritGrantResult && (
                  <div className="mt-2 p-2 bg-purple-950 rounded border border-purple-800 text-purple-200 font-bold">
                    Method Result: {meritGrantResult}
                  </div>
                )}
              </div>

              {/* Output Preview */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[180px] font-mono text-xs space-y-1.5">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">
                  {stage === "object"
                    ? "Live Python Domain Instance (`StudentPortfolio`):"
                    : stage === "json"
                    ? "Serialized JSON String Document (`__model__` Tagged):"
                    : decoderMode === "hook"
                    ? "Restored Python Domain Class (Methods Live):"
                    : "Deserialized Generic Python Dictionary:"}
                </span>

                <pre className="text-slate-200 text-[11px] leading-relaxed">
                  {stage === "object"
                    ? JSON.stringify(sampleStudent, null, 2)
                    : stage === "json"
                    ? sampleSerializedJson
                    : decoderMode === "hook"
                    ? `<StudentRecord STU-101 (Sourav Mukherjee) | Fees: Decimal('35000.00') | Badges: 3 | Methods: [calculate_merit_grant]>`
                    : JSON.stringify(sampleStudent, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER CUSTOM CODEC MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Custom Object Type Handling Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Python Complex Type</th>
                  <th className="py-3.5 px-4 font-bold">`JSONEncoder.default()` Recipe</th>
                  <th className="py-3.5 px-4 font-bold">`object_hook` Restoration Recipe</th>
                  <th className="py-3.5 px-4 font-bold">Fidelity Invariant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">datetime / date</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`o.isoformat()`</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono">`datetime.fromisoformat(val)`</td>
                  <td className="py-3 px-4">Preserves exact timezone &amp; seconds</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Decimal</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`float(o)` or `str(o)`</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono">`Decimal(str(val))`</td>
                  <td className="py-3 px-4">Zero sub-cent currency rounding loss</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">uuid.UUID</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`str(o)`</td>
                  <td className="py-3 px-4 text-purple-300 font-mono">`uuid.UUID(val)`</td>
                  <td className="py-3 px-4">Standard 36-char canonical hex string</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Enum</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`o.value`</td>
                  <td className="py-3 px-4 text-amber-300 font-mono">`MyEnum(val)`</td>
                  <td className="py-3 px-4">Restores type-safe enum constants</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-rose-300 font-semibold">Custom Domain Class</td>
                  <td className="py-3 px-4 font-mono text-slate-200">{"`{\"__type__\": \"Class\", ...}`"}</td>
                  <td className="py-3 px-4 text-cyan-300 font-mono">`Student(**dct)`</td>
                  <td className="py-3 px-4">Restores all methods &amp; behaviors</td>
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
            Explore 4 production-grade Python scripts demonstrating custom JSONEncoder subclasses, object_hook deserialization, dataclass codecs, and institutional portfolio suites:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "custom_json_encoder_subclassing.py",
                code: customEncoder,
                description: "Subclassing json.JSONEncoder and overriding default(self, o) for domain objects.",
              },
              {
                filename: "deserializing_custom_objects_with_object_hook.py",
                code: objectHook,
                description: "Reconstructing rich domain class instances and callable methods with object_hook.",
              },
              {
                filename: "bidirectional_custom_codec_dataclass_pipeline.py",
                code: dataclassCodec,
                description: "Unified bidirectional serializer & deserializer for Python Dataclasses.",
              },
              {
                filename: "institutional_student_portfolio_codec_suite.py",
                code: portfolioSuite,
                description: "Enterprise Student Portfolio Codec with multi-model restoration and method execution.",
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
                <span>❌</span> Trap 1: Omitting `super().default(o)`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If unhandled objects are not passed to <code className="text-rose-300 font-mono">super().default(o)</code>, Python re-invokes <code className="text-rose-300 font-mono">default()</code> until crashing with <code className="text-rose-300 font-mono">RecursionError</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Always end <code className="text-emerald-300">default()</code> with <code className="text-emerald-300">return super().default(o)</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Security RCE with `globals()[type]`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Blindly instantiating classes with <code className="text-amber-300 font-mono">globals()[dct["__type__"]]</code> in <code className="text-amber-300 font-mono">object_hook</code> allows attackers to inject malicious classes.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always use an explicit whitelist dictionary of approved domain classes.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Private Attribute Name Mangling
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Serializing private attributes with <code className="text-purple-300 font-mono">o.__dict__</code> outputs mangled keys like <code className="text-purple-300 font-mono">_Student__secret</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Explicitly map domain properties or use dataclasses with <code className="text-emerald-300">asdict()</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Loss of Methods on Generic Dicts
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Deserializing without <code className="text-cyan-300 font-mono">object_hook</code> produces raw dicts; calling <code className="text-cyan-300 font-mono">data.calculate_grant()</code> raises <code className="text-cyan-300 font-mono">AttributeError: 'dict' object has no attribute</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">object_hook</code> to restore actual class instances.
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
            Comprehensive question-and-answer repository covering `JSONEncoder`, `default()`, `object_hook`, `object_pairs_hook`, dataclass serialization, and domain object restoration:
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
            Download or print the complete reference sheet with custom JSONEncoder recipes, object_hook patterns, and dataclass codec templates:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic4_custom_json_codecs_notes.txt"
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
