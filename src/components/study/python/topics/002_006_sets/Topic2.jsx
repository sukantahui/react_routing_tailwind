import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import uniquenessDemo from "./topic2_files/uniqueness_in_action.py?raw";
import hashEquality from "./topic2_files/hash_equality_identity.py?raw";
import voterDeduplication from "./topic2_files/voter_deduplication.py?raw";
import customClassHashing from "./topic2_files/custom_class_hashing.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic2_files/topic2_note.txt?raw";

// FAQ Questions
import questions from "./topic2_files/topic2_questions";

/**
 * Topic2: Unique Nature of Sets in Python
 * Module: 002_006_sets
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Deep dive into the mathematical and algorithmic mechanisms behind
 * Python set uniqueness, hash invariants, equivalence rules, and custom class deduplication.
 */
export default function Topic2() {
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("decision");

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
            Topic 2
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Data Structure Invariants
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          The Unique Nature of Sets
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Mastering the <span className="text-emerald-400 font-semibold">Two-Step Uniqueness Engine</span>, hash invariants, numerical equivalence (why <code className="text-sky-400 font-mono">1 == True</code>), and custom class deduplication.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚖️ Two-Step Equality Engine
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔢 1 == 1.0 == True Equivalence
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏷️ __eq__ and __hash__ Invariant
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Case-Sensitivity Rules
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE TWO-STEP DUPLICATE DETECTION ENGINE */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Two-Step Duplicate Detection Engine
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              How does Python know if an incoming object is a duplicate of something already in the set? It does <strong className="text-white">NOT</strong> do a slow linear scan of all existing elements. Instead, it executes an ultra-fast <strong className="text-emerald-400">Two-Step Verification Protocol</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6 not-prose">
              {/* Step 1 */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:border-emerald-500">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg mb-2">
                  <span>1️⃣</span> Step 1: Hash Address Lookup
                </div>
                <p className="text-sm text-slate-300">
                  Python computes <code className="font-mono text-emerald-300">hash(new_item)</code>. It immediately jumps directly to that specific hash bucket. If the bucket is empty, the item is inserted as a new unique element.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-sky-800/60 shadow-lg shadow-sky-950/30 transition-all duration-300 hover:border-sky-500">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-lg mb-2">
                  <span>2️⃣</span> Step 2: Exact Equality Check
                </div>
                <p className="text-sm text-slate-300">
                  If the bucket is already occupied (same hash), Python checks <code className="font-mono text-sky-300">new_item == existing_item</code>. If equality returns <strong className="text-white">True</strong>, it's a confirmed duplicate and discarded!
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-emerald-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-2">
                The Golden Hash Invariant Contract:
              </h3>
              <p className="text-sm sm:text-base text-slate-300">
                If two objects compare equal (<code className="text-emerald-400 font-mono">a == b</code>), then their hash codes <strong className="text-white">MUST</strong> be identical (<code className="text-emerald-400 font-mono">hash(a) == hash(b)</code>). If a developer violates this rule in custom classes, sets will fail to detect duplicates!
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: INTERACTIVE SVG DECISION FLOW */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔀</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Duplicate Evaluation Protocol
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("decision")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "decision"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Decision Logic Flowchart
              </button>
              <button
                onClick={() => setActiveTab("equiv")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "equiv"
                    ? "bg-sky-900/50 text-sky-300 border border-sky-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                1 vs 1.0 vs True Equivalence
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeTab === "decision" ? (
              <svg viewBox="0 0 850 360" className="w-full h-auto min-w-[650px] font-sans">
                {/* Step 1: Input Object */}
                <rect x="30" y="50" width="180" height="60" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="50" y="78" fill="#f8fafc" fontSize="13" fontWeight="bold">Incoming Item: x</text>
                <text x="50" y="98" fill="#94a3b8" fontSize="11">e.g. "Susmita"</text>

                <path d="M 210 80 L 280 80" stroke="#38bdf8" strokeWidth="2" fill="none" />

                {/* Step 2: Compute Hash */}
                <rect x="280" y="45" width="220" height="70" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <text x="300" y="73" fill="#34d399" fontSize="13" fontWeight="bold">Step 1: Compute hash(x)</text>
                <text x="300" y="95" fill="#94a3b8" fontSize="11">Find Target Bucket in Table</text>

                <path d="M 500 80 L 570 80" stroke="#10b981" strokeWidth="2" fill="none" />

                {/* Step 3: Bucket check */}
                <rect x="570" y="40" width="250" height="80" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="590" y="70" fill="#fbbf24" fontSize="13" fontWeight="bold">Is Bucket Occupied?</text>
                <text x="590" y="95" fill="#94a3b8" fontSize="11">Check hash collision / match</text>

                {/* Branch: NO -> Store as Unique */}
                <path d="M 695 120 L 695 180" stroke="#10b981" strokeWidth="2" fill="none" />
                <text x="705" y="150" fill="#10b981" fontSize="11" fontWeight="bold">NO (Empty)</text>

                <rect x="590" y="180" width="220" height="50" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="610" y="210" fill="#a7f3d0" fontSize="12" fontWeight="bold">✓ Store as New Element</text>

                {/* Branch: YES -> Equality Check */}
                <path d="M 570 80 L 390 180" stroke="#f59e0b" strokeWidth="2" fill="none" />
                <text x="440" y="135" fill="#fbbf24" fontSize="11" fontWeight="bold">YES (Occupied)</text>

                <rect x="260" y="180" width="260" height="70" rx="10" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="280" y="208" fill="#c084fc" fontSize="13" fontWeight="bold">Step 2: Check (x == existing)</text>
                <text x="280" y="230" fill="#94a3b8" fontSize="11">Exact value verification</text>

                {/* True -> Duplicate discarded */}
                <path d="M 260 215 L 140 215" stroke="#ef4444" strokeWidth="2" fill="none" />
                <text x="175" y="205" fill="#ef4444" fontSize="11" fontWeight="bold">TRUE</text>

                <rect x="30" y="190" width="180" height="50" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                <text x="45" y="220" fill="#fca5a5" fontSize="12" fontWeight="bold">⚡ DUPLICATE! (Discard)</text>

                {/* False -> Collision probe */}
                <path d="M 390 250 L 390 300" stroke="#38bdf8" strokeWidth="2" fill="none" />
                <text x="400" y="280" fill="#38bdf8" fontSize="11" fontWeight="bold">FALSE</text>

                <rect x="260" y="300" width="260" height="45" rx="8" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="280" y="328" fill="#bae6fd" fontSize="12" fontWeight="bold">Collision Probe → Next Bucket</text>
              </svg>
            ) : (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">Understanding {1, 1.0, True, 1 + 0j} Collapse</text>

                {/* Item Cards */}
                <rect x="30" y="65" width="160" height="70" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <text x="45" y="95" fill="#34d399" fontSize="14" fontWeight="bold">Integer: 1</text>
                <text x="45" y="118" fill="#94a3b8" fontSize="11">hash(1) = 1</text>

                <rect x="220" y="65" width="160" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="235" y="95" fill="#38bdf8" fontSize="14" fontWeight="bold">Float: 1.0</text>
                <text x="235" y="118" fill="#94a3b8" fontSize="11">hash(1.0) = 1</text>

                <rect x="410" y="65" width="160" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="425" y="95" fill="#fbbf24" fontSize="14" fontWeight="bold">Boolean: True</text>
                <text x="425" y="118" fill="#94a3b8" fontSize="11">hash(True) = 1</text>

                <rect x="600" y="65" width="180" height="70" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
                <text x="615" y="95" fill="#c084fc" fontSize="14" fontWeight="bold">Complex: 1+0j</text>
                <text x="615" y="118" fill="#94a3b8" fontSize="11">hash(1+0j) = 1</text>

                {/* Convergence Arrow */}
                <path d="M 110 135 L 425 200" stroke="#10b981" strokeWidth="1.5" fill="none" />
                <path d="M 300 135 L 425 200" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
                <path d="M 490 135 L 425 200" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
                <path d="M 690 135 L 425 200" stroke="#a855f7" strokeWidth="1.5" fill="none" />

                {/* Final Target Bucket */}
                <rect x="230" y="200" width="390" height="80" rx="12" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="250" y="235" fill="#a7f3d0" fontSize="14" fontWeight="bold">Same Hash (1) + All Compare Equal (==)</text>
                <text x="250" y="260" fill="#ffffff" fontSize="13">→ Set stores only 1 element: {'{1}'} (Length: 1)</text>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: CODE DEMONSTRATIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 space-y-8"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Practical Python Uniqueness Demos
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Demo A: Uniqueness in Action & Numeric Collapses
              </h3>
              <PythonFileLoader
                fileModule={uniquenessDemo}
                title="uniqueness_in_action.py"
                highlightLines={[6, 11, 15, 20]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Demo B: The Two-Step Hash vs Equality Verification
              </h3>
              <PythonFileLoader
                fileModule={hashEquality}
                title="hash_equality_identity.py"
                highlightLines={[7, 13, 20]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Demo C: Real-World Voter Registry Deduplication & Election Grant in ₹
              </h3>
              <PythonFileLoader
                fileModule={voterDeduplication}
                title="voter_deduplication.py"
                highlightLines={[16, 20, 25]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Demo D: Custom Class Uniqueness with __eq__ and __hash__
              </h3>
              <PythonFileLoader
                fileModule={customClassHashing}
                title="custom_class_hashing.py"
                highlightLines={[11, 17, 27]}
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: REAL-WORLD SCENARIOS IN WEST BENGAL */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Real-World Case Studies in Industry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🗳️</span> 1. Civic Polling Station Verification
              </div>
              <p className="text-sm text-slate-300">
                When Debangshu and Susmita process 12,000 raw voter logs across <strong>Barrackpore</strong> polling booths, sets eliminate accidental double-submissions, ensuring an accurate logistics allocation of <strong className="text-emerald-300">₹150 per verified voter</strong>.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">💳</span> 2. Double-Click Payment Idempotency
              </div>
              <p className="text-sm text-slate-300">
                Payment gateways store processed transaction idempotency keys in a set. When a customer clicks "Pay ₹4,500" twice in 200 milliseconds, the set rejects the second transaction in <span className="font-semibold text-emerald-400">O(1)</span> time.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">📈</span> 3. Unique Visitor Analytics (DAU)
              </div>
              <p className="text-sm text-slate-300">
                Web server telemetry records client IP addresses in a memory set. At midnight, calling <code className="font-mono text-purple-400">len(unique_ips)</code> gives the exact Daily Active Users metric with zero double-counting.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🏥</span> 4. Hospital Patient Registration
              </div>
              <p className="text-sm text-slate-300">
                Hospital portals in <strong>Kolkata</strong> and <strong>Jadavpur</strong> wrap medical records into custom classes with <code className="font-mono text-amber-400">__hash__</code> keyed on National Health IDs, preventing duplicate patient profile generation.
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
              5. Pitfalls & Tricky Uniqueness Edge Cases
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 1: Assuming True != 1 in Sets
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">{"{1, True}"}</code> yields only <code className="font-mono text-emerald-400">{"{1}"}</code> because <code className="font-mono">True == 1</code> and both share the same hash code (1).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 2: Mutating Objects After Insertion
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                If an object's attribute changes after being added to a set, its hash changes, stranding it in the wrong bucket and permanently breaking lookup checks!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 3: Case-Sensitivity Assumptions
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">{"{'Kolkata', 'kolkata'}"}</code> has length 2. Strings are case-sensitive; normalize with <code className="font-mono text-emerald-400">.casefold()</code> if case-insensitivity is needed.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 4: Implementing __eq__ without __hash__
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Overriding <code className="font-mono text-slate-200">__eq__</code> without defining <code className="font-mono text-slate-200">__hash__</code> sets hash to None, preventing your custom objects from being stored in sets.
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
            title="Topic 2: Unique Nature of Sets Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Printable Study Note"
            downloadFileName="topic2_unique_nature_of_sets_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS (30 COMPREHENSIVE QUESTIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Topic 2 • Unique Nature of Sets: Master Viva & Review Questions"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note="Teacher's Wisdom: Uniqueness in Python sets is not magic—it's pure mathematical discipline. Always remember: hash code lands you in the bucket, but value equality (==) settles the duplicate verdict. When Susmita, Mamata, and Debangshu design custom classes in Barrackpore, always tie __eq__ and __hash__ to immutable identifiers!"
          />
        </section>

      </div>
    </div>
  );
}
