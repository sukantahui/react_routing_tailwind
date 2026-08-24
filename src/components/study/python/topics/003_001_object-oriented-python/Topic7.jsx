import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import propertyFundamentals from "./topic7_files/property_decorator_fundamentals.py?raw";
import computedCaching from "./topic7_files/computed_attributes_and_caching.py?raw";
import uniformAccess from "./topic7_files/refactoring_from_attributes_to_properties.py?raw";
import smartThermostat from "./topic7_files/smart_thermostat_and_energy_monitor.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic7_files/topic7_note.txt?raw";

// FAQ Questions
import questions from "./topic7_files/topic7_questions";

/**
 * Topic7: Properties & Getters/Setters with @property
 * Module: 003_001_object-oriented-python
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic7() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("uniform");

  // Interactive Smart Thermostat Simulator State
  const [celsius, setCelsius] = useState(22.0);
  const [errorMsg, setErrorMsg] = useState("");

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

  // Bi-Directional Conversion Logic
  const fahrenheit = (celsius * 9) / 5 + 32;
  const powerWatts = 150 + Math.abs(25.0 - celsius) * 85.0;
  const isOverheat = celsius > 35.0;

  const handleCelsiusChange = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return;
    if (num < -50 || num > 100) {
      setErrorMsg(`ValueError: ${num}°C is outside physical limits (-50°C to 100°C)!`);
      return;
    }
    setErrorMsg("");
    setCelsius(num);
  };

  const handleFahrenheitChange = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return;
    const convertedC = ((num - 32) * 5) / 9;
    if (convertedC < -50 || convertedC > 100) {
      setErrorMsg(`ValueError: ${num}°F converts to ${convertedC.toFixed(1)}°C, which is out of range!`);
      return;
    }
    setErrorMsg("");
    setCelsius(convertedC);
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
            Segment 3 • Module 003_001
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 7
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Object-Oriented Programming (OOP) in Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Properties &amp; Getters/Setters with <code className="text-teal-400 font-mono">@property</code>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Pythonic attribute encapsulation: replacing Java boilerplate with <code className="text-teal-300 font-mono">@property</code>, validated mutators with <code className="text-cyan-300 font-mono">@setter</code>, the Uniform Access Principle, avoiding the fatal infinite recursion trap, and optimizing performance with <code className="text-purple-300 font-mono">@cached_property</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 The @property Getter &amp; Setter Pipeline
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 The Uniform Access Principle
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚠️ Infinite Recursion Setter Guard
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ functools.cached_property Optimization
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE PYTHONIC WAY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💎</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Pythonic Way: Replacing Java Boilerplate with Properties
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In languages like Java or C++, developers are forced to write verbose <code className="text-slate-400 font-mono">get_price()</code> and <code className="text-slate-400 font-mono">set_price()</code> methods upfront just in case validation is needed later. Python solves this elegantly with <strong>Properties</strong> and the <strong>Uniform Access Principle</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Getter */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-base mb-1">1️⃣ The Getter (@property)</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">@property def price(self):</code>
                <p className="text-[11px] text-slate-300">
                  Turns a method into a managed attribute accessed with dot syntax (<code className="text-teal-300">obj.price</code>).
                </p>
              </div>

              {/* Setter */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-base mb-1">2️⃣ The Setter (@setter)</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">@price.setter def price(self, v):</code>
                <p className="text-[11px] text-slate-300">
                  Intercepts assignment (<code className="text-cyan-300">obj.price = 500</code>) to enforce validation and type checks.
                </p>
              </div>

              {/* Deleter */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-base mb-1">3️⃣ The Deleter (@deleter)</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">@price.deleter def price(self):</code>
                <p className="text-[11px] text-slate-300">
                  Intercepts attribute deletion (<code className="text-purple-300">del obj.price</code>) for state cleanup.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-rose-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Fatal Setter Recursion Trap
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Inside <code className="text-rose-400 font-mono">@price.setter</code>, you must assign to the protected backing variable <code className="text-emerald-400 font-mono">self._price = val</code>. Assigning to <code className="text-rose-400 font-mono">self.price = val</code> recursively calls the setter until Python crashes with a <code className="text-rose-400">RecursionError</code>!
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
                2. Visualizing Property Descriptors &amp; Refactoring
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("uniform")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "uniform"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Uniform Access Principle
              </button>
              <button
                onClick={() => setActiveInteractiveTab("descriptor")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "descriptor"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                @property Descriptor Pipeline
              </button>
              <button
                onClick={() => setActiveInteractiveTab("cached")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "cached"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                @cached_property Engine
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining syntax bridges, descriptor interception, and memoized property caches:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "uniform" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">THE UNIFORM ACCESS PRINCIPLE: NON-BREAKING REFACTORING</text>

                {/* V1 Stage */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">V1: Simple Attribute Prototype</text>
                  <text x="20" y="60" fill="#ecfdf5" fontSize="10 font-mono">class Product:</text>
                  <text x="40" y="85" fill="#ecfdf5" fontSize="10 font-mono">def __init__(self, price):</text>
                  <text x="60" y="110" fill="#34d399" fontSize="10 font-mono font-bold">self.price = price</text>
                  
                  <rect x="20" y="145" width="340" height="70" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="170" fill="#a7f3d0" fontSize="10 font-bold">Client Call:</text>
                  <text x="30" y="195" fill="#ecfdf5" fontSize="10 font-mono">p.price = 500  # Direct RAM write</text>
                </g>

                {/* V2 Stage */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="30" fill="#a5f3fc" fontSize="12" fontWeight="bold">V2: Production Refactored to @property</text>
                  <text x="20" y="60" fill="#ecfdf5" fontSize="10 font-mono">@property</text>
                  <text x="20" y="80" fill="#ecfdf5" fontSize="10 font-mono">def price(self): return self._price</text>
                  <text x="20" y="105" fill="#ecfdf5" fontSize="10 font-mono">@price.setter</text>
                  <text x="20" y="125" fill="#38bdf8" fontSize="10 font-mono">def price(self, v): validate(v)...</text>

                  <rect x="20" y="145" width="340" height="70" rx="4" fill="#090d16" stroke="#0284c7" />
                  <text x="30" y="170" fill="#38bdf8" fontSize="10 font-bold">SAME Client Call (Zero Changes!):</text>
                  <text x="30" y="195" fill="#34d399" fontSize="10 font-mono">p.price = 500  # Automatically calls setter!</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "descriptor" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">HOW @property DESCRIPTORS INTERCEPT ATTRIBUTE ACCESS</text>

                {/* Left: Client actions */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="360" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Developer Action</text>
                  
                  <rect x="20" y="60" width="320" height="45" rx="4" fill="#090d16" stroke="#475569" />
                  <text x="30" y="88" fill="#a7f3d0" fontSize="11 font-mono">1. Read: x = obj.fee</text>

                  <rect x="20" y="120" width="320" height="45" rx="4" fill="#090d16" stroke="#475569" />
                  <text x="30" y="148" fill="#38bdf8" fontSize="11 font-mono">2. Write: obj.fee = 20000</text>

                  <rect x="20" y="180" width="320" height="45" rx="4" fill="#090d16" stroke="#475569" />
                  <text x="30" y="208" fill="#fda4af" fontSize="11 font-mono">3. Delete: del obj.fee</text>
                </g>

                {/* Right: Hook Routing */}
                <g transform="translate(450, 50)">
                  <rect x="0" y="0" width="400" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">CPython Property Descriptor Hooks</text>

                  <rect x="20" y="60" width="360" height="45" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="88" fill="#ecfdf5" fontSize="10 font-mono">→ Calls property.__get__ → @property getter</text>

                  <rect x="20" y="120" width="360" height="45" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="148" fill="#ecfdf5" fontSize="10 font-mono">→ Calls property.__set__ → @fee.setter</text>

                  <rect x="20" y="180" width="360" height="45" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="208" fill="#ecfdf5" fontSize="10 font-mono">→ Calls property.__delete__ → @fee.deleter</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">functools.cached_property PERFORMANCE OPTIMIZATION</text>

                {/* 1st Read vs 2nd Read */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">First Access: obj.heavy_report</text>
                  <text x="20" y="65" fill="#fca5a5" fontSize="10 font-mono">• Executes calculation function</text>
                  <text x="20" y="90" fill="#fca5a5" fontSize="10 font-mono">• Parses large dataset / heavy I/O</text>
                  
                  <rect x="20" y="125" width="340" height="90" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="30" y="150" fill="#ffe4e6" fontSize="10 font-bold">Caching Step:</text>
                  <text x="30" y="170" fill="#ffe4e6" fontSize="9 font-mono">Writes result into obj.__dict__['heavy_report']</text>
                  <text x="30" y="195" fill="#ffe4e6" fontSize="9 font-mono">Replaces descriptor lookup with direct dictionary read!</text>
                </g>

                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Subsequent Accesses: obj.heavy_report</text>
                  <text x="20" y="65" fill="#34d399" fontSize="11 font-bold">⚡ Zero Computation Delay!</text>
                  <text x="20" y="95" fill="#cbd5e1" fontSize="10 font-mono">• Served directly from instance __dict__</text>

                  <rect x="20" y="135" width="340" height="80" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="160" fill="#a7f3d0" fontSize="10 font-bold">Cache Invalidation:</text>
                  <text x="30" y="185" fill="#ecfdf5" fontSize="9 font-mono">del obj.heavy_report (Triggers recalculation on next read)</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE THERMOSTAT PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Smart Thermostat &amp; Bi-Directional Property Playground
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Adjust temperature via either property slider to witness bi-directional conversion and validated setter guards in real time:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Input Controls */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block font-bold">
                Bi-Directional Property Controls
              </span>

              {/* Celsius Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">@celsius.setter:</span>
                  <span className="text-teal-300 font-bold">{celsius.toFixed(1)} °C</span>
                </div>
                <input
                  type="range"
                  min="-20"
                  max="60"
                  step="0.5"
                  value={celsius}
                  onChange={(e) => handleCelsiusChange(e.target.value)}
                  className="w-full accent-teal-500"
                />
              </div>

              {/* Fahrenheit Slider */}
              <div className="space-y-1 pt-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">@fahrenheit.setter:</span>
                  <span className="text-cyan-300 font-bold">{fahrenheit.toFixed(1)} °F</span>
                </div>
                <input
                  type="range"
                  min="-4"
                  max="140"
                  step="1"
                  value={fahrenheit}
                  onChange={(e) => handleFahrenheitChange(e.target.value)}
                  className="w-full accent-cyan-500"
                />
              </div>

              {/* Error Alert if out of bounds */}
              {errorMsg && (
                <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-lg text-xs font-mono text-rose-300">
                  {errorMsg}
                </div>
              )}
            </div>

            {/* Computed State Telemetry */}
            <div className="space-y-3 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Computed Properties &amp; Telemetry
              </span>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2.5 text-xs font-mono flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Canonical Storage (_celsius):</span>
                  <span className="text-teal-300 font-bold">{celsius.toFixed(2)} °C</span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                  <span className="text-slate-400">Computed Fahrenheit:</span>
                  <span className="text-cyan-300 font-bold">{fahrenheit.toFixed(2)} °F</span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                  <span className="text-slate-400">HVAC Power Load:</span>
                  <span className="text-purple-300 font-bold">{powerWatts.toFixed(1)} Watts</span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                  <span className="text-slate-400">Thermal Hazard Status:</span>
                  <span className={clsx("font-bold px-2 py-0.5 rounded", isOverheat ? "bg-rose-950 text-rose-300 border border-rose-700" : "bg-emerald-950 text-emerald-300 border border-emerald-700")}>
                    {isOverheat ? "⚠️ CRITICAL OVERHEAT" : "✓ OPTIMAL TEMPERATURE"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER PROPERTIES MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Properties &amp; Decorators Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Decorator</th>
                  <th className="py-3.5 px-4 font-bold">Signature</th>
                  <th className="py-3.5 px-4 font-bold">Triggered By</th>
                  <th className="py-3.5 px-4 font-bold">Primary Architectural Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">@property</td>
                  <td className="py-3 px-4 font-mono text-slate-200">def attr(self):</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">val = obj.attr</td>
                  <td className="py-3 px-4">Managed getter, computed state, read-only protection</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">@attr.setter</td>
                  <td className="py-3 px-4 font-mono text-slate-200">def attr(self, val):</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">obj.attr = val</td>
                  <td className="py-3 px-4">Validated mutator, data normalization, invariant guards</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">@attr.deleter</td>
                  <td className="py-3 px-4 font-mono text-slate-200">def attr(self):</td>
                  <td className="py-3 px-4 font-mono text-purple-300">del obj.attr</td>
                  <td className="py-3 px-4">Attribute deletion interceptor, state cleanup hooks</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">@cached_property</td>
                  <td className="py-3 px-4 font-mono text-slate-200">def attr(self):</td>
                  <td className="py-3 px-4 font-mono text-amber-300">val = obj.attr</td>
                  <td className="py-3 px-4">Memoizes expensive calculations on the instance dictionary</td>
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
            Explore 4 production-grade Python scripts demonstrating property getters, setters, deleters, computed caching, and smart thermostats:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "property_decorator_fundamentals.py",
                code: propertyFundamentals,
                description: "The @property getter, setter, and deleter descriptors with input validation and recursion protection.",
              },
              {
                filename: "computed_attributes_and_caching.py",
                code: computedCaching,
                description: "Dynamically computed properties, read-only attributes, and functools.cached_property performance optimization.",
              },
              {
                filename: "refactoring_from_attributes_to_properties.py",
                code: uniformAccess,
                description: "The Uniform Access Principle: non-breaking refactoring from plain attributes to validated @property setters.",
              },
              {
                filename: "smart_thermostat_and_energy_monitor.py",
                code: smartThermostat,
                description: "Enterprise Server Room Smart Thermostat with bi-directional Celsius/Fahrenheit properties and power metrics.",
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
                <span>❌</span> Trap 1: The Setter Infinite Recursion Bug
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Assigning to <code className="text-rose-300 font-mono">self.price = val</code> inside <code className="text-rose-300 font-mono">@price.setter</code> re-invokes the setter continuously until Python crashes with a <code className="text-rose-300 font-mono">RecursionError</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Assign to internal backing variable <code className="text-emerald-300">self._price = val</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Heavy I/O in Property Getters
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Developers expect <code className="text-amber-300 font-mono">obj.attr</code> to be instantaneous. Executing network requests or database queries in a getter introduces hidden latency.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use explicit <code className="text-emerald-300">fetch_report()</code> methods or <code className="text-emerald-300">@cached_property</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Returning Mutable Lists from Getters
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Returning <code className="text-purple-300 font-mono">return self._items</code> allows callers to append items directly without triggering any setter validation.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Return defensive copies: <code className="text-emerald-300">return list(self._items)</code> or tuples.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Stale @cached_property Caches
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If underlying state changes, a <code className="text-cyan-300 font-mono">@cached_property</code> continues to return the old cached value until invalidated.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Invalidate manually via <code className="text-emerald-300">del obj.cached_attr</code> when modifying data.
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
            Comprehensive question-and-answer repository covering properties, getters, setters, deleters, cached properties, and the Uniform Access Principle:
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
            Download or print the complete reference sheet with property descriptors, setter validation recipes, and thermostat patterns:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic7_properties_and_getters_setters_notes.txt"
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
