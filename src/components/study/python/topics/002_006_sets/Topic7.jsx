import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import basicIteration from "./topic7_files/basic_for_loop_iteration.py?raw";
import enumerateUnpacking from "./topic7_files/enumerate_and_unpacking.py?raw";
import mutationError from "./topic7_files/mutation_during_iteration_error.py?raw";
import batchSmsNotification from "./topic7_files/batch_sms_notification.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic7_files/topic7_note.txt?raw";

// FAQ Questions
import questions from "./topic7_files/topic7_questions";

/**
 * Topic7: Iterating Through Sets
 * Module: 002_006_sets
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * In-depth guide to traversing sets: Iterator Protocol (__iter__, __next__),
 * enumerate counters, tuple unpacking, trapping RuntimeError during mutation,
 * and sorted non-mutating iteration.
 */
export default function Topic7() {
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("traversal");

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
            Topic 7
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Iterator Protocol & Traversal
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Iterating Through Sets
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Mastering set traversal mechanics: the <code className="text-emerald-400 font-mono">__iter__</code> protocol, <code className="text-sky-400 font-mono">enumerate()</code> loop counters, tuple unpacking, and avoiding <code className="text-rose-400 font-mono">RuntimeError</code> mutation traps.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 Iterator Protocol (__iter__ / __next__)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚠️ RuntimeError Mutation Trap
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📦 Tuple Unpacking in Sets
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔡 Non-Mutating sorted() Traversal
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: HOW SET ITERATION WORKS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🔁</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Set Iterator Protocol
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Sets are full-featured Python iterables. Under the hood, a standard for-loop <code className="text-emerald-400 font-mono">for item in my_set:</code> invokes the <strong className="text-white">Python Iterator Protocol</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6 not-prose">
              {/* Card 1 */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:border-emerald-500">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg mb-2">
                  <span>⚙️</span> The set_iterator Protocol
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Calling <code className="font-mono text-emerald-300">iter(my_set)</code> yields a <code className="font-mono text-emerald-300">set_iterator</code>. Calling <code className="font-mono text-emerald-300">next()</code> traverses internal hash buckets, skipping empty slots and returning each populated item.
                </p>
                <div className="text-xs font-mono text-slate-400">
                  Raises <strong className="text-emerald-300">StopIteration</strong> cleanly when all buckets are exhausted.
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-sky-800/60 shadow-lg shadow-sky-950/30 transition-all duration-300 hover:border-sky-500">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-lg mb-2">
                  <span>🎲</span> Non-Deterministic Traversal Order
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Items emerge in the order their hash codes placed them into memory buckets. Due to <code className="font-mono text-sky-300">PYTHONHASHSEED</code>, string iteration sequence can change between interpreter runs.
                </p>
                <div className="text-xs font-mono text-slate-400">
                  Use <code className="text-sky-300">sorted(my_set)</code> whenever you require predictable sequential order.
                </div>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-rose-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-2">
                ⚠️ The Fatal Trap: Modifying Set Size During Iteration
              </h3>
              <p className="text-sm sm:text-base text-slate-300">
                Never call <code className="text-rose-400 font-mono">.add()</code>, <code className="text-rose-400 font-mono">.remove()</code>, or <code className="text-rose-400 font-mono">.pop()</code> inside an active for-loop over that same set! Doing so raises <code className="text-rose-300 font-mono font-bold bg-rose-950/50 px-1.5 py-0.5 rounded">RuntimeError: Set changed size during iteration</code>. Always iterate over <code className="text-emerald-300 font-mono">my_set.copy()</code> or rebuild via a set comprehension.
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
              <span className="text-3xl">🔍</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Iterator Bucket Traversal
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("traversal")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "traversal"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Iterator Protocol Step Flow
              </button>
              <button
                onClick={() => setActiveTab("mutationtrap")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "mutationtrap"
                    ? "bg-rose-900/50 text-rose-300 border border-rose-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                RuntimeError Mutation Trap
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeTab === "traversal" ? (
              <svg viewBox="0 0 850 340" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="30" fill="#34d399" fontSize="13" fontWeight="bold">ITERATOR PROTOCOL: SKIPPING EMPTY BUCKETS & YIELDING OCCUPIED ENTRIES</text>

                {/* Bucket Array */}
                <rect x="30" y="50" width="790" height="70" rx="8" fill="#1e293b" stroke="#334155" />

                {/* Slots */}
                <rect x="40" y="58" width="90" height="54" rx="4" fill="#0f172a" stroke="#334155" />
                <text x="50" y="80" fill="#64748b" fontSize="11" fontWeight="bold">[0] Empty</text>
                <text x="50" y="98" fill="#475569" fontSize="9">SKIPPED</text>

                <rect x="140" y="58" width="130" height="54" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="150" y="80" fill="#34d399" fontSize="11" fontWeight="bold">[1] "Barrackpore"</text>
                <text x="150" y="98" fill="#a7f3d0" fontSize="9">✓ YIELD STEP 1</text>

                <rect x="280" y="58" width="90" height="54" rx="4" fill="#0f172a" stroke="#334155" />
                <text x="290" y="80" fill="#64748b" fontSize="11" fontWeight="bold">[2] Empty</text>
                <text x="290" y="98" fill="#475569" fontSize="9">SKIPPED</text>

                <rect x="380" y="58" width="130" height="54" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="390" y="80" fill="#34d399" fontSize="11" fontWeight="bold">[3] "Kolkata"</text>
                <text x="390" y="98" fill="#a7f3d0" fontSize="9">✓ YIELD STEP 2</text>

                <rect x="520" y="58" width="90" height="54" rx="4" fill="#0f172a" stroke="#334155" />
                <text x="530" y="80" fill="#64748b" fontSize="11" fontWeight="bold">[4] Empty</text>
                <text x="530" y="98" fill="#475569" fontSize="9">SKIPPED</text>

                <rect x="620" y="58" width="130" height="54" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="630" y="80" fill="#34d399" fontSize="11" fontWeight="bold">[5] "Ichapur"</text>
                <text x="630" y="98" fill="#a7f3d0" fontSize="9">✓ YIELD STEP 3</text>

                {/* Explanation Card */}
                <rect x="30" y="145" width="790" height="170" rx="8" fill="#090d16" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="50" y="175" fill="#38bdf8" fontSize="13" fontWeight="bold">Step-by-Step Iterator Execution:</text>
                <text x="50" y="205" fill="#cbd5e1" fontSize="12">1. <code className="font-mono text-emerald-300">iter(my_set)</code> initializes internal bucket offset pointer at 0.</text>
                <text x="50" y="230" fill="#cbd5e1" fontSize="12">2. <code className="font-mono text-emerald-300">next()</code> skips bucket 0 (empty) -> finds "Barrackpore" at bucket 1 -> yields item.</text>
                <text x="50" y="255" fill="#cbd5e1" fontSize="12">3. Subsequent <code className="font-mono text-emerald-300">next()</code> calls skip empty slots until all items are yielded.</text>
                <text x="50" y="280" fill="#34d399" fontSize="12" fontWeight="bold">4. End of table reached -> Raises StopIteration cleanly to terminate loop!</text>
              </svg>
            ) : (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">Why Modifying Sets During Iteration Triggers RuntimeError</text>

                {/* Left: The Crash */}
                <rect x="30" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                <text x="50" y="95" fill="#fca5a5" fontSize="14" fontWeight="bold">THE DANGEROUS CODE</text>

                <rect x="50" y="115" width="340" height="45" rx="6" fill="#450a0a" stroke="#ef4444" />
                <text x="60" y="142" fill="#fecaca" fontSize="11" fontWeight="mono">for num in numbers: numbers.remove(num)</text>

                <text x="50" y="185" fill="#cbd5e1" fontSize="12">• Deletion mutates internal set structure.</text>
                <text x="50" y="210" fill="#cbd5e1" fontSize="12">• Table may resize or shift active bucket offsets.</text>
                <text x="50" y="235" fill="#fca5a5" fontSize="12" fontWeight="bold">💥 Crashes: RuntimeError: Set changed size during iteration!</text>

                {/* Right: The Solution */}
                <rect x="440" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="460" y="95" fill="#34d399" fontSize="14" fontWeight="bold">THE SAFE SOLUTIONS</text>

                <rect x="460" y="115" width="340" height="45" rx="6" fill="#064e3b" stroke="#10b981" />
                <text x="470" y="142" fill="#a7f3d0" fontSize="11" fontWeight="mono">for num in numbers.copy(): numbers.remove(num)</text>

                <text x="460" y="185" fill="#cbd5e1" fontSize="12">• Fix 1: Loop iterates over independent clone.</text>
                <text x="460" y="210" fill="#cbd5e1" fontSize="12">• Fix 2: Use set comprehension <code className="font-mono text-emerald-300">{"{x for x in s if cond}"}</code>.</text>
                <text x="460" y="235" fill="#34d399" fontSize="12" fontWeight="bold">✓ 100% Bug-Free, Clean & Safe Execution!</text>
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
                Lab A: For-Loop Traversal & Manual Iterator Protocol
              </h3>
              <PythonFileLoader
                fileModule={basicIteration}
                title="basic_for_loop_iteration.py"
                highlightLines={[6, 12, 16, 22]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab B: Enumerate Counters & Multi-Attribute Tuple Unpacking
              </h3>
              <PythonFileLoader
                fileModule={enumerateUnpacking}
                title="enumerate_and_unpacking.py"
                highlightLines={[6, 11, 20]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab C: RuntimeError Trapping & Safe Copy / Comprehension Fixes
              </h3>
              <PythonFileLoader
                fileModule={mutationError}
                title="mutation_during_iteration_error.py"
                highlightLines={[6, 11, 17, 23]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab D: Real-World Exam Alert SMS Dispatch & Gateway Cost in ₹
              </h3>
              <PythonFileLoader
                fileModule={batchSmsNotification}
                title="batch_sms_notification.py"
                highlightLines={[6, 18, 24]}
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: REAL-WORLD SCENARIOS */}
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
                <span className="text-xl">📱</span> 1. Broadcast SMS Notifications
              </div>
              <p className="text-sm text-slate-300">
                Exam controllers in <strong>Barrackpore</strong> iterate through sets of verified candidate phone numbers to dispatch admit card alerts without sending duplicate messages, tracking telecom billing in Indian Rupees (<strong className="text-emerald-300">₹0.25/SMS</strong>).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🎓</span> 2. Multi-Attribute Student Tuple Processing
              </div>
              <p className="text-sm text-slate-300">
                Academic ERP systems loop over structured tuple sets <code className="font-mono text-sky-400">for name, course, fee in student_records:</code> to generate consolidated invoice receipts across <strong>Kolkata</strong> and <strong>Jadavpur</strong>.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🧹</span> 3. Safe In-Memory Cache Invalidation
              </div>
              <p className="text-sm text-slate-300">
                Backend services clean up expired auth tokens by iterating over a clone <code className="font-mono text-purple-400">for token in active_tokens.copy():</code> to evict stale user sessions without triggering <code className="font-mono text-rose-300">RuntimeError</code> crashes.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">📑</span> 4. Deterministic Report Generation
              </div>
              <p className="text-sm text-slate-300">
                Auditors wrap category sets in <code className="font-mono text-amber-400">sorted(category_set)</code> before writing to financial PDF ledgers, guaranteeing identical chronological row ordering across monthly accounting statements.
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
              5. Pitfalls & Tricky Traps with Set Iteration
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 1: Mutating Set Inside Loop
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Calling <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">s.remove(x)</code> or <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">s.add(x)</code> inside <code className="font-mono">for x in s:</code> crashes with <code className="text-rose-400 font-bold">RuntimeError: Set changed size during iteration</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 2: Expecting Fixed Order
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Never write unit tests that check <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">list(my_set)</code> directly without sorting. String hash randomization causes test orders to scramble across environments!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 3: Calling reversed() on Sets
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">reversed(my_set)</code> fails with <code className="text-rose-400 font-bold">TypeError: 'set' object is not reversible</code>. Use <code className="font-mono text-emerald-400">sorted(s, reverse=True)</code> instead.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 4: Misinterpreting enumerate Index
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                The index in <code className="font-mono">enumerate(my_set)</code> is just a temporary loop counter (1, 2, 3...), NOT a permanent index of the element in the set!
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
            title="Topic 7: Iterating Through Sets Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Printable Study Note"
            downloadFileName="topic7_iterating_through_sets_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS (30 COMPREHENSIVE QUESTIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Topic 7 • Iterating Through Sets: Master Viva & Review Questions"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note="Teacher's Master Traversal Rule: Set iteration is your best friend when order is irrelevant and you want to visit every unique item once. But remember the ultimate commandment: NEVER mutate a set while looping over it! If Susmita, Mamata, and Debangshu in Barrackpore need to prune elements, iterate over my_set.copy() or use a clean set comprehension!"
          />
        </section>

      </div>
    </div>
  );
}
