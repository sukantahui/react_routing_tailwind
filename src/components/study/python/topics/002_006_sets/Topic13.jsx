import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import frozensetBasics from "./topic13_files/frozenset_basics.py?raw";
import frozensetDictKeys from "./topic13_files/frozenset_as_dict_keys.py?raw";
import nestedSets from "./topic13_files/nested_sets_demo.py?raw";
import securityWhitelist from "./topic13_files/immutable_security_whitelist.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic13_files/topic13_note.txt?raw";

// FAQ Questions
import questions from "./topic13_files/topic13_questions";

/**
 * Topic13: Frozen Sets (Immutable Sets)
 * Module: 002_006_sets
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Comprehensive guide to frozenset: immutability, __hash__() implementation,
 * order-independent dictionary keys, nested sets of sets,
 * thread-safe configuration constants, and mixed operand return types.
 */
export default function Topic13() {
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("hashable");

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
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
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
          <span className="text-xs sm:text-sm font-mono font-semibold bg-emerald-950/80 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800/80 shadow-sm shadow-emerald-950/50">
            Segment 2 • Module 002_006
          </span>
          <span className="text-xs sm:text-sm font-mono bg-sky-950/80 text-sky-300 px-3 py-1 rounded-full border border-sky-800/80 shadow-sm shadow-sky-950/50">
            Topic 13
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Immutable &amp; Hashable Sets
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Frozen Sets: <code className="text-emerald-400 font-mono">frozenset</code>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Mastering immutable set collections in Python: unlocking <code className="text-emerald-400 font-mono">__hash__()</code> capabilities, order-independent dictionary keys, nested sets of sets, and thread-safe security constants.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔒 100% Immutable Container
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔑 Valid Dictionary Keys
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📦 Nested Sets-of-Sets
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Tamper-Proof Constants
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: WHAT IS A FROZENSET */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Immutable Sibling: <code className="text-emerald-400">frozenset</code>
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In Python, standard sets are mutable containers: they cannot be hashed, cannot be used as dictionary keys, and cannot be nested inside other sets. <strong className="text-emerald-400">frozenset</strong> solves this architectural gap by freezing set contents upon creation:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6 not-prose">
              {/* Card 1: Standard Set */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-rose-800/60 shadow-lg shadow-rose-950/30 transition-all duration-300 hover:border-rose-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-lg">
                    <span>🔓</span> Standard Set: set()
                  </div>
                  <span className="text-xs font-mono bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800">
                    Mutable
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Can call <code className="text-rose-300 font-mono">.add()</code> and <code className="text-rose-300 font-mono">.remove()</code>. <strong className="text-rose-400">Unhashable</strong> (Raises TypeError on hash()).
                </p>
                <div className="text-xs font-mono text-slate-400">
                  ❌ Cannot be a Dict Key • ❌ Cannot be in another Set.
                </div>
              </div>

              {/* Card 2: Frozen Set */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:border-emerald-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
                    <span>🔒</span> Frozen Set: frozenset()
                  </div>
                  <span className="text-xs font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                    Immutable &amp; Hashable
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Read-only upon creation. <strong className="text-emerald-400">Hashable</strong> (Implements <code className="text-emerald-300 font-mono">__hash__()</code>).
                </p>
                <div className="text-xs font-mono text-emerald-300">
                  ✓ Valid Dict Key • ✓ Valid Nested Set Element • ✓ Thread-Safe!
                </div>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-emerald-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-2">
                Order-Independent Dictionary Lookups
              </h3>
              <p className="text-sm sm:text-base text-slate-300">
                Because <code className="text-emerald-300 font-mono">frozenset(["A", "B"]) == frozenset(["B", "A"])</code>, using a frozenset as a dictionary key allows looking up course bundles, multi-attribute combinations, or product tags in <strong className="text-emerald-400">any arbitrary order</strong>!
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: INTERACTIVE SVG VISUALIZER */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔬</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing frozenset Internals &amp; Dict Key Mapping
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("hashable")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "hashable"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Hashability &amp; Nesting
              </button>
              <button
                onClick={() => setActiveTab("dictkey")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "dictkey"
                    ? "bg-sky-900/50 text-sky-300 border border-sky-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Order-Free Dict Key Lookup
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeTab === "hashable" ? (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">
                  Why Sets Cannot Nest vs How Frozensets Enable Nested Sets
                </text>

                {/* Left: Mutable Set Nesting Attempt */}
                <rect x="30" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                <text x="50" y="95" fill="#fca5a5" fontSize="14" fontWeight="bold">ILLEGAL: {'{ {"A"}, {"B"} }'}</text>

                <rect x="50" y="115" width="340" height="45" rx="6" fill="#450a0a" stroke="#ef4444" />
                <text x="65" y="142" fill="#fecaca" fontSize="12" fontWeight="bold">💥 TypeError: unhashable type: 'set'</text>

                <text x="50" y="185" fill="#cbd5e1" fontSize="12">• Outer set requires hash of each inner element.</text>
                <text x="50" y="210" fill="#cbd5e1" fontSize="12">• Mutable inner set has NO hash code!</text>
                <text x="50" y="235" fill="#fca5a5" fontSize="12" fontWeight="bold">❌ Immediate runtime crash!</text>

                {/* Right: Frozenset Nesting Solution */}
                <rect x="440" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="460" y="95" fill="#34d399" fontSize="14" fontWeight="bold">LEGAL: {'{ frozenset(["A"]), frozenset(["B"]) }'}</text>

                <rect x="460" y="115" width="340" height="45" rx="6" fill="#064e3b" stroke="#10b981" />
                <text x="475" y="142" fill="#a7f3d0" fontSize="12" fontWeight="bold">✓ SUCCESS: Valid Nested Set-of-Sets!</text>

                <text x="460" y="185" fill="#cbd5e1" fontSize="12">• frozenset implements <code className="font-mono text-emerald-300">__hash__()</code>.</text>
                <text x="460" y="210" fill="#cbd5e1" fontSize="12">• Outer set computes hash and stores bucket in O(1).</text>
                <text x="460" y="235" fill="#34d399" fontSize="12" fontWeight="bold">✓ 100% Valid &amp; Pythonic!</text>
              </svg>
            ) : (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">
                  Order-Independent Dictionary Key Lookup with frozenset
                </text>

                {/* Dict Entry */}
                <rect x="30" y="65" width="420" height="220" rx="10" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="50" y="95" fill="#38bdf8" fontSize="14" fontWeight="bold">Dictionary Mapping in Memory</text>
                <rect x="50" y="115" width="380" height="50" rx="6" fill="#0c4a6e" stroke="#0ea5e9" />
                <text x="65" y="145" fill="#bae6fd" fontSize="12" fontWeight="mono">KEY: frozenset({'{"Python", "React"}'}) -&gt; VAL: ₹11,000</text>
                <text x="50" y="190" fill="#cbd5e1" fontSize="12">• Stored with hash of combination {'{"Python", "React"}'}.</text>
                <text x="50" y="215" fill="#cbd5e1" fontSize="12">• Hash depends purely on elements, not insertion order.</text>

                {/* Query */}
                <rect x="480" y="65" width="340" height="220" rx="10" fill="#090d16" stroke="#10b981" strokeWidth="1.5" />
                <text x="500" y="95" fill="#34d399" fontSize="14" fontWeight="bold">Incoming User Query (Swapped Order!)</text>
                <rect x="500" y="115" width="300" height="50" rx="6" fill="#064e3b" stroke="#10b981" />
                <text x="515" y="145" fill="#a7f3d0" fontSize="12" fontWeight="mono">d.get(frozenset({'{"React", "Python"}'}))</text>
                <text x="500" y="195" fill="#cbd5e1" fontSize="12">✓ Hash matches stored key exactly.</text>
                <text x="500" y="220" fill="#cbd5e1" fontSize="12">✓ Direct O(1) jump -&gt; Returns ₹11,000 fee!</text>
                <text x="500" y="250" fill="#34d399" fontSize="12" fontWeight="bold">⚡ Perfect order-free multi-tag lookup!</text>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: CODE LABS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 space-y-8"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Python Code Labs
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab A: frozenset Creation, Immutability &amp; Hashability
              </h3>
              <PythonFileLoader
                fileModule={frozensetBasics}
                title="frozenset_basics.py"
                highlightLines={[6, 12, 17, 22]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab B: frozenset as Dictionary Keys &amp; Course Package Fees in ₹
              </h3>
              <PythonFileLoader
                fileModule={frozensetDictKeys}
                title="frozenset_as_dict_keys.py"
                highlightLines={[6, 15, 19]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab C: Constructing Valid Sets-of-Sets with frozenset
              </h3>
              <PythonFileLoader
                fileModule={nestedSets}
                title="nested_sets_demo.py"
                highlightLines={[6, 12, 18]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab D: Thread-Safe Immutable Security Whitelists in Barrackpore
              </h3>
              <PythonFileLoader
                fileModule={securityWhitelist}
                title="immutable_security_whitelist.py"
                highlightLines={[6, 12, 19]}
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: REAL-WORLD APPLICATIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Industry Applications in West Bengal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">💳</span> 1. Multi-Course Combo Pricing Engine
              </div>
              <p className="text-sm text-slate-300">
                Tuition portals in <strong>Barrackpore</strong> use <code className="font-mono text-emerald-400">frozenset(selected_courses)</code> as dictionary keys, enabling students to select course bundles in any order and receive discounted package pricing in Indian Rupees (<strong className="text-emerald-300">₹11,000 bundle</strong>).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🛡️</span> 2. Tamper-Proof Security Constants
              </div>
              <p className="text-sm text-slate-300">
                Fintech microservices in <strong>Kolkata</strong> declare system-level root permissions as <code className="font-mono text-sky-400">frozenset([...])</code>, guaranteeing that buggy helper functions cannot mutate privileged roles at runtime.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🕸️</span> 3. Undirected Graph Edge Storage
              </div>
              <p className="text-sm text-slate-300">
                Graph traversal algorithms in <strong>Jadavpur</strong> store undirected network edges as <code className="font-mono text-purple-400">frozenset({'{u, v}'})</code>, automatically collapsing duplicate reverse edges (v, u) into a single edge set.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">⚡</span> 4. Thread-Safe Global State Caching
              </div>
              <p className="text-sm text-slate-300">
                FastAPI web servers in <strong>Ichapur</strong> share read-only taxonomy categories across worker threads as a global frozenset without requiring expensive thread lock mutexes.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: COMMON PITFALLS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Pitfalls &amp; Tricky Gotchas in frozenset
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 1: Attempting frozenset.add()
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Calling <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">fs.add(x)</code> raises <code className="text-rose-400 font-bold">AttributeError</code>. frozensets are immutable; construct a new frozenset via <code className="font-mono text-emerald-400">fs | frozenset([x])</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 2: Expecting Literal Syntax
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Python has no <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">f{'{1, 2}'}</code> literal! Always instantiate explicitly using <code className="font-mono text-emerald-400">frozenset([1, 2])</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 3: Unhashable Elements Inside
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">frozenset([ [1, 2] ])</code> fails with <code className="text-rose-400 font-bold">TypeError</code>. Every item inside a frozenset must itself be hashable!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 4: Mixed Binary Return Types
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="font-mono">set | frozenset</code> returns a <strong className="text-emerald-400">mutable set</strong>, while <code className="font-mono">frozenset | set</code> returns a <strong className="text-sky-400">frozenset</strong>! The left operand dictates return type.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: PRINTABLE STUDY NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 13: Frozen Sets Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Printable Study Note"
            downloadFileName="topic13_frozensets_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS (30 COMPREHENSIVE QUESTIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Topic 13 • Frozen Sets (frozenset): Master Viva & Review Questions"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note="Teacher's Immutability Rule: Think of frozenset as the tuple version of a set! Whenever Susmita, Mamata, and Debangshu in Barrackpore need to store set collections inside dictionaries or create multi-level nested sets, frozenset is the only key that unlocks the door. Use standard sets for dynamic scratchpads, and seal them with frozenset for dictionaries and security constants!"
          />
        </section>

      </div>
    </div>
  );
}
