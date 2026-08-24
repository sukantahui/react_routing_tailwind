import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import keyCoercion from "./topic1_files/python_json_type_coercion_and_keys.py?raw";
import specialFloats from "./topic1_files/handling_special_floats_and_allow_nan.py?raw";
import roundtripFidelity from "./topic1_files/roundtrip_type_fidelity_and_type_restoration.py?raw";
import recordSanitizer from "./topic1_files/institutional_course_enrollment_type_sanitizer.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic1_files/topic1_note.txt?raw";

// FAQ Questions
import questions from "./topic1_files/topic1_questions";

/**
 * Topic1: JSON in Python: Mapping Python types to JSON types
 * Module: 003_004_working-with-json
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic1() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("keys");

  // Interactive Type Sanitizer Playground State
  const [includeTupleKey, setIncludeTupleKey] = useState(false);
  const [includeNaN, setIncludeNaN] = useState(false);
  const [enableSanitizer, setEnableSanitizer] = useState(true);
  const [allowNanFlag, setAllowNanFlag] = useState(true);
  const [skipKeysFlag, setSkipKeysFlag] = useState(true);
  const [stage, setStage] = useState("raw"); // raw | serialized | deserialized

  // Build simulated Python Object
  const getPythonObject = () => {
    const obj = {
      student_id: 101,
      name: "Sourav Mukherjee",
      coordinates: [22.76, 88.37], // represented as tuple in python
      badges: ["AI_MASTER", "DECORATOR_PRO"], // represented as set in python
      score: includeNaN ? NaN : 94.5,
      catalog: { 101: "Python Core", 102: "AI" },
    };
    if (includeTupleKey) {
      obj["('batch_2026', 'barrackpore')"] = "AI Cohort";
    }
    return obj;
  };

  const [currentOutput, setCurrentOutput] = useState("");
  const [statusMessage, setStatusMessage] = useState("Click 'Serialize to JSON' to inspect type transformations.");
  const [hasError, setHasError] = useState(false);

  const handleSerialize = () => {
    if (includeTupleKey && !skipKeysFlag) {
      setHasError(true);
      setStatusMessage("TypeError: keys must be str, int, float, bool or None, not tuple! (Enable skipkeys=True or remove tuple key)");
      setCurrentOutput("Traceback (most recent call last):\n  TypeError: keys must be str, int, float, bool or None, not tuple");
      setStage("raw");
      return;
    }

    if (includeNaN && !allowNanFlag) {
      setHasError(true);
      setStatusMessage("ValueError: Out of range float values are not JSON compliant (NaN)! (Enable allow_nan=True or sanitize floats)");
      setCurrentOutput("Traceback (most recent call last):\n  ValueError: Out of range float values are not JSON compliant: nan");
      setStage("raw");
      return;
    }

    setHasError(false);
    const raw = getPythonObject();

    // Sanitized version
    const serializable = {
      student_id: raw.student_id,
      name: raw.name,
      coordinates: raw.coordinates, // array
      badges: raw.badges, // list
      score: isNaN(raw.score) ? (enableSanitizer ? null : "NaN") : raw.score,
      catalog: { "101": "Python Core", "102": "AI" },
    };

    if (includeTupleKey && !skipKeysFlag) {
      serializable["('batch_2026', 'barrackpore')"] = "AI Cohort";
    }

    const jsonStr = JSON.stringify(serializable, null, 2);
    setCurrentOutput(jsonStr);
    setStage("serialized");
    setStatusMessage("Successfully serialized Python data to RFC 8259 JSON document.");
  };

  const handleDeserialize = () => {
    if (stage !== "serialized") {
      handleSerialize();
    }
    setStage("deserialized");
    setStatusMessage("Deserialized back to Python. Notice: tuples became lists and int keys became strings!");
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
            Topic 1
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Working with JSON &amp; External Data APIs
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Mapping Python Types <span className="text-teal-400">to JSON Specifications</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master the mechanics of Python-to-JSON type translation: dictionary key coercion, bypassing non-basic keys with <code className="text-teal-300 font-mono">skipkeys=True</code>, strict special float handling (<code className="text-cyan-300 font-mono">allow_nan=False</code>), and tuple-to-list round-trip mutations.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔑 Dictionary Key Stringification
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ skipkeys=True Parameter
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 Special Floats (NaN / Inf) &amp; allow_nan
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 Tuple-to-Array Asymmetry
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: KEY COERCION & RULES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🔑</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. Key Coercion, `skipkeys` &amp; Type Mapping
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              When serializing Python data to JSON, automatic type coercion applies to dictionary keys and scalar primitives:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Key Stringification</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">&#123;101: "A"&#125; -&gt; &#123;"101": "A"&#125;</code>
                <p className="text-[11px] text-slate-300">
                  Python <code className="text-teal-300">int</code>, <code className="text-teal-300">float</code>, and <code className="text-teal-300">bool</code> keys become strings automatically.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Tuple Keys &amp; `skipkeys`</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">skipkeys=True</code>
                <p className="text-[11px] text-slate-300">
                  Tuple and custom object keys raise <code className="text-rose-400">TypeError</code> unless <code className="text-cyan-300">skipkeys=True</code> is specified.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Special Floats (`NaN`/`Inf`)</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">allow_nan=False</code>
                <p className="text-[11px] text-slate-300">
                  Enforces strict RFC 8259 compliance by raising <code className="text-purple-300">ValueError</code> on NaN or Infinity values.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Tuple-to-Array Asymmetry Round-Trip Gotcha
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Python tuples <code className="text-teal-300 font-mono">(1, 2)</code> are serialized into JSON arrays <code className="text-teal-300 font-mono">[1, 2]</code>. When parsed back via <code className="text-teal-300 font-mono">json.loads()</code>, they become Python <strong>lists</strong>! To restore tuple immutability, apply a schema post-processor: <code className="text-teal-300 font-mono">tuple(doc["coords"])</code>.
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
                2. Visualizing Key Coercion, Special Floats &amp; Round-Trips
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("keys")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "keys"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Key Coercion &amp; `skipkeys`
              </button>
              <button
                onClick={() => setActiveInteractiveTab("floats")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "floats"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Special Floats &amp; `allow_nan`
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
                Round-Trip Mutation Audit
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining key coercion flows, float boundary compliance, and post-processor type restorations:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "keys" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">DICTIONARY KEY COERCION &amp; `skipkeys=True` FILTERING</text>

                {/* 3 Step Pipeline */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11 font-bold">1. Python Dict with Mixed Keys</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="8 font-mono">101: "Sourav" (int key)</text>
                  <text x="15" y="75" fill="#ecfdf5" fontSize="8 font-mono">True: "Paid" (bool key)</text>
                  <text x="15" y="95" fill="#fca5a5" fontSize="8 font-mono font-bold">("batch", 2026): "AI" (tuple key!)</text>

                  <rect x="15" y="125" width="220" height="90" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="25" y="150" fill="#c4b5fd" fontSize="9 font-bold">Heterogeneous Keys:</text>
                  <text x="25" y="170" fill="#cbd5e1" fontSize="8">Python permits any hashable</text>
                  <text x="25" y="185" fill="#cbd5e1" fontSize="8">object as dictionary keys.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Serialization Strategy</text>
                  <text x="310" y="55" fill="#38bdf8" fontSize="8 font-mono">101 -&gt; "101" (Coerced)</text>
                  <text x="310" y="75" fill="#38bdf8" fontSize="8 font-mono">True -&gt; "true" (Coerced)</text>
                  <text x="310" y="95" fill="#fca5a5" fontSize="8 font-mono">tuple key -&gt; TypeError!</text>

                  <rect x="310" y="125" width="220" height="90" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="150" fill="#38bdf8" fontSize="9 font-bold">Handling Complex Keys:</text>
                  <text x="320" y="170" fill="#cbd5e1" fontSize="8">With `skipkeys=True`, the</text>
                  <text x="320" y="185" fill="#cbd5e1" fontSize="8">tuple key is safely skipped!</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="605" y="30" fill="#a7f3d0" fontSize="11 font-bold">3. Valid Output JSON</text>
                  <text x="605" y="55" fill="#ecfdf5" fontSize="8 font-mono">&#123;</text>
                  <text x="615" y="75" fill="#34d399" fontSize="8 font-mono">"101": "Sourav",</text>
                  <text x="615" y="95" fill="#34d399" fontSize="8 font-mono">"true": "Paid"</text>
                  <text x="605" y="115" fill="#ecfdf5" fontSize="8 font-mono">&#125;</text>

                  <rect x="605" y="130" width="200" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="615" y="155" fill="#34d399" fontSize="9 font-bold">100% Valid RFC 8259:</text>
                  <text x="615" y="175" fill="#cbd5e1" fontSize="8">All keys are double-quoted</text>
                  <text x="615" y="190" fill="#cbd5e1" fontSize="8">strings without crashes.</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "floats" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">SPECIAL FLOATS: `NaN`, `Infinity` &amp; `allow_nan=False` COMPLIANCE</text>

                {/* Left: Default Python */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Default Python: `allow_nan=True` (Non-compliant)</text>
                  
                  <text x="20" y="60" fill="#fca5a5" fontSize="9 font-mono">payload = &#123;"score": float("nan")&#125;</text>
                  <text x="20" y="85" fill="#fca5a5" fontSize="9 font-mono font-bold">Output: &#123;"score": NaN&#125;</text>

                  <rect x="20" y="120" width="340" height="95" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="145" fill="#fda4af" fontSize="9 font-bold">Syntax Violation in Web APIs:</text>
                  <text x="30" y="165" fill="#cbd5e1" fontSize="8">• Unquoted `NaN` and `Infinity` are ILLEGAL in JSON</text>
                  <text x="30" y="180" fill="#cbd5e1" fontSize="8">• JavaScript `JSON.parse()` crashes with SyntaxError</text>
                  <text x="30" y="195" fill="#cbd5e1" fontSize="8">• Breaks strict REST API contracts</text>
                </g>

                {/* Right: Strict Python */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">Strict Mode: `allow_nan=False`</text>
                  
                  <text x="20" y="60" fill="#34d399" fontSize="9 font-mono">json.dumps(payload, allow_nan=False)</text>
                  <text x="20" y="85" fill="#34d399" fontSize="9 font-mono font-bold">Raises: ValueError (Catches corruption)</text>

                  <rect x="20" y="120" width="340" height="95" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="145" fill="#34d399" fontSize="9 font-bold">Sanitization Recipe:</text>
                  <text x="30" y="165" fill="#cbd5e1" fontSize="8">• Convert `NaN` to `null` before serialization</text>
                  <text x="30" y="180" fill="#cbd5e1" fontSize="8">• Convert `Infinity` to strings: `"Infinity"`</text>
                  <text x="30" y="195" fill="#cbd5e1" fontSize="8">• 100% Browser &amp; Microservice compatible</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">ROUND-TRIP TYPE MUTATIONS &amp; SCHEMA RESTORATION</text>

                {/* 3 Step Flow */}
                <g transform="translate(30, 50)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="30" fill="#c4b5fd" fontSize="11 font-bold">1. Original Python Object</text>
                  <text x="15" y="55" fill="#ecfdf5" fontSize="8 font-mono">"coords": (22.76, 88.37) [tuple]</text>
                  <text x="15" y="75" fill="#ecfdf5" fontSize="8 font-mono">"catalog": &#123;101: "AI"&#125; [int key]</text>

                  <rect x="15" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="25" y="135" fill="#c4b5fd" fontSize="9 font-bold">Python Domain Types:</text>
                  <text x="25" y="155" fill="#cbd5e1" fontSize="8">Rich native types with</text>
                  <text x="25" y="170" fill="#cbd5e1" fontSize="8">tuple immutability &amp; int keys.</text>

                  {/* Arrow 1 */}
                  <text x="265" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="295" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="310" y="30" fill="#a5f3fc" fontSize="11 font-bold">2. Restored by `json.loads()`</text>
                  <text x="310" y="55" fill="#fca5a5" fontSize="8 font-mono">"coords": [22.76, 88.37] [list]</text>
                  <text x="310" y="75" fill="#fca5a5" fontSize="8 font-mono">"catalog": &#123;"101": "AI"&#125; [str key]</text>

                  <rect x="310" y="110" width="220" height="105" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="320" y="135" fill="#38bdf8" fontSize="9 font-bold">Type Mutations Occurred:</text>
                  <text x="320" y="155" fill="#cbd5e1" fontSize="8">Tuples became lists;</text>
                  <text x="320" y="170" fill="#cbd5e1" fontSize="8">Integer keys became strings.</text>

                  {/* Arrow 2 */}
                  <text x="560" y="125" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="590" y="0" width="230" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="605" y="30" fill="#a7f3d0" fontSize="11 font-bold">3. Type Restoration Hook</text>
                  <text x="605" y="55" fill="#34d399" fontSize="8 font-mono">tuple(doc["coords"])</text>
                  <text x="605" y="75" fill="#34d399" fontSize="8 font-mono">&#123;int(k): v for k,v in doc&#125;</text>

                  <rect x="605" y="110" width="200" height="105" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="615" y="135" fill="#34d399" fontSize="9 font-bold">100% Type Fidelity:</text>
                  <text x="615" y="155" fill="#cbd5e1" fontSize="8">Restores original domain</text>
                  <text x="615" y="170" fill="#cbd5e1" fontSize="8">types for business logic.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE TYPE SANITIZER PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Python Type Sanitizer &amp; Round-Trip Inspector
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Configure test flags to observe how Python's <code className="text-teal-300 font-mono">json.dumps()</code> handles complex keys, NaN floats, and type mutations across round-trips:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Serialization Flags &amp; Data Invariant Toggles
                </span>
              </div>

              {/* Toggles */}
              <div className="space-y-2 text-xs font-mono">
                <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeTupleKey}
                    onChange={(e) => setIncludeTupleKey(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Inject Tuple Key: `('batch_2026', 'barrackpore'): 'AI Cohort'`</span>
                </label>

                <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={skipKeysFlag}
                    onChange={(e) => setSkipKeysFlag(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Enable `skipkeys=True` (Bypass non-string keys safely)</span>
                </label>

                <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeNaN}
                    onChange={(e) => setIncludeNaN(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Inject `float('nan')` in score metric</span>
                </label>

                <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowNanFlag}
                    onChange={(e) => setAllowNanFlag(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>`allow_nan=True` (False raises ValueError on NaN)</span>
                </label>

                <label className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableSanitizer}
                    onChange={(e) => setEnableSanitizer(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Enable Pre-Serialization Sanitizer (`NaN` -&gt; `null`)</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSerialize}
                  className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold rounded-lg transition-all shadow-lg shadow-teal-950/50"
                >
                  Execute `json.dumps()`
                </button>
                <button
                  onClick={handleDeserialize}
                  className="flex-1 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold rounded-lg transition-all shadow-lg shadow-cyan-950/50"
                >
                  Execute `json.loads()`
                </button>
              </div>
            </div>

            {/* Output Inspection */}
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
                <div className="font-bold text-[11px] uppercase mb-1">Execution Status:</div>
                <div className="text-[11px] leading-relaxed">{statusMessage}</div>
              </div>

              {/* Live Output Console */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[180px] font-mono text-xs space-y-1.5">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">
                  {stage === "raw" ? "Raw Python Data Object:" : stage === "serialized" ? "JSON Serialized Document (RFC 8259):" : "Deserialized Python Dictionary (Restored Types):"}
                </span>

                <pre className={clsx("text-[11px] leading-relaxed", hasError ? "text-rose-400" : "text-slate-200")}>
                  {currentOutput || JSON.stringify(getPythonObject(), null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER PYTHON VS JSON CONVERSION MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Parameter &amp; Behavior Matrix in `json.dumps()`
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Parameter</th>
                  <th className="py-3.5 px-4 font-bold">Default Value</th>
                  <th className="py-3.5 px-4 font-bold">RFC 8259 Compliance Effect</th>
                  <th className="py-3.5 px-4 font-bold">Production Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">skipkeys</td>
                  <td className="py-3 px-4 font-mono text-slate-200">False</td>
                  <td className="py-3 px-4">Omits non-basic dictionary keys safely</td>
                  <td className="py-3 px-4 text-emerald-400">Set `True` on untrusted mixed dicts</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">allow_nan</td>
                  <td className="py-3 px-4 font-mono text-slate-200">True (Non-compliant)</td>
                  <td className="py-3 px-4 text-rose-300">Emits invalid unquoted `NaN`/`Inf`</td>
                  <td className="py-3 px-4 text-emerald-400">Set `False` on public REST APIs</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">sort_keys</td>
                  <td className="py-3 px-4 font-mono text-slate-200">False</td>
                  <td className="py-3 px-4">Alphabetical deterministic ordering</td>
                  <td className="py-3 px-4 text-cyan-300">Set `True` for testing &amp; hashing</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">separators</td>
                  <td className="py-3 px-4 font-mono text-slate-200">`(", ", ": ")`</td>
                  <td className="py-3 px-4">Controls inter-token whitespace</td>
                  <td className="py-3 px-4 text-emerald-400">Use `(',', ':')` for minification</td>
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
            Explore 4 production-grade Python scripts demonstrating dictionary key coercion, special floats, round-trip fidelity, and recursive type sanitizers:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "python_json_type_coercion_and_keys.py",
                code: keyCoercion,
                description: "Dictionary key coercion, tuple keys, and skipkeys=True in Python JSON serialization.",
              },
              {
                filename: "handling_special_floats_and_allow_nan.py",
                code: specialFloats,
                description: "Handling NaN, Infinity, -Infinity, and enforcing RFC 8259 strict compliance with allow_nan=False.",
              },
              {
                filename: "roundtrip_type_fidelity_and_type_restoration.py",
                code: roundtripFidelity,
                description: "Auditing type mutations across JSON round-trips and restoring tuples and int keys.",
              },
              {
                filename: "institutional_course_enrollment_type_sanitizer.py",
                code: recordSanitizer,
                description: "Enterprise recursive pre-serialization type sanitizer for sets, datetimes, and decimals.",
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
                <span>❌</span> Trap 1: Integer Keys Disappear on Roundtrip
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Serializing <code className="text-rose-300 font-mono">&#123;101: "A"&#125;</code> and calling <code className="text-rose-300 font-mono">json.loads()</code> yields <code className="text-rose-300 font-mono">&#123;"101": "A"&#125;</code>; lookup with <code className="text-rose-300 font-mono">data[101]</code> raises <code className="text-rose-300 font-mono">KeyError</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use string keys <code className="text-emerald-300 font-mono">data["101"]</code> or post-process with <code className="text-emerald-300 font-mono">&#123;int(k): v for k,v in d.items()&#125;</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Emitting Unquoted NaN in REST APIs
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Default <code className="text-amber-300 font-mono">json.dumps()</code> emits unquoted <code className="text-amber-300 font-mono">NaN</code>, crashing browser JavaScript <code className="text-amber-300 font-mono">JSON.parse()</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Set <code className="text-emerald-300">allow_nan=False</code> or sanitize <code className="text-emerald-300">NaN -&gt; None</code> before serialization.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Tuple Key Crashes
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Passing dictionaries with tuple keys <code className="text-purple-300 font-mono">&#123;('a', 'b'): 1&#125;</code> raises <code className="text-purple-300 font-mono">TypeError: keys must be str, int...</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Use <code className="text-emerald-300">skipkeys=True</code> or convert tuple keys to strings before dumping.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Loss of Decimal Precision
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Casting financial <code className="text-cyan-300 font-mono">Decimal("28500.50")</code> to binary float can introduce IEEE-754 precision drift.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> In high-precision financial ledgers, serialize Decimals as formatted strings: <code className="text-emerald-300">str(dec)</code>.
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
            Comprehensive question-and-answer repository covering Python-to-JSON type mapping, key coercion, skipkeys, allow_nan, and round-trip fidelity:
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
            Download or print the complete reference sheet with type mapping rules, skipkeys flags, and special float recipes:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic1_type_mapping_notes.txt"
              title="Print Topic 1 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
