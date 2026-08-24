import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import removeVsDiscard from "./topic5_files/remove_vs_discard.py?raw";
import popAndClear from "./topic5_files/pop_and_clear_demo.py?raw";
import removalEdgeCases from "./topic5_files/removal_edge_cases.py?raw";
import studentDeregistration from "./topic5_files/student_deregistration.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic5_files/topic5_note.txt?raw";

// FAQ Questions
import questions from "./topic5_files/topic5_questions";

/**
 * Topic5: Removing Elements: remove(), discard(), pop(), clear()
 * Module: 002_006_sets
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Master guide to deleting set members: KeyError handling in remove(),
 * idempotent safe deletions in discard(), arbitrary extraction via pop(),
 * total reset via clear(), and bulk difference_update() operations.
 */
export default function Topic5() {
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("comparison");

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
            Topic 5
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Set Deletion & Cleanup
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Removing Elements: <code className="text-rose-400 font-mono">remove()</code>, <code className="text-emerald-400 font-mono">discard()</code>, <code className="text-sky-400 font-mono">pop()</code>, <code className="text-amber-400 font-mono">clear()</code>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Mastering set deletion operations: strict removal with <code className="text-rose-400 font-mono">KeyError</code> trapping, idempotent safe cleanup with <code className="text-emerald-400 font-mono">.discard()</code>, arbitrary extraction with <code className="text-sky-400 font-mono">.pop()</code>, and total reset with <code className="text-amber-400 font-mono">.clear()</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Safe Idempotent Deletion
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚠️ KeyError Trapping
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎲 Arbitrary Extraction via pop()
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧹 Memory Reset via clear()
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE 4 REMOVAL METHODS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🗑️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The 4 Set Deletion Methods Compared
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Python provides four distinct built-in methods for removing elements from a set. Understanding when each raises an exception vs when it acts silently is critical for writing robust, crash-free applications:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
              {/* Method 1: remove */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-rose-800/60 shadow-lg shadow-rose-950/30 transition-all duration-300 hover:border-rose-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-lg">
                    <span>❌</span> s.remove(x)
                  </div>
                  <span className="text-xs font-mono bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800">
                    Strict Deletion
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Deletes <code className="text-rose-300 font-mono">x</code>. If <code className="text-rose-300 font-mono">x</code> is absent, <strong className="text-rose-400">RAISES KeyError!</strong>
                </p>
                <div className="text-xs font-mono text-slate-400">
                  Use when absence of the item represents a critical bug.
                </div>
              </div>

              {/* Method 2: discard */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:border-emerald-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
                    <span>🛡️</span> s.discard(x)
                  </div>
                  <span className="text-xs font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                    Safe Idempotent
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Deletes <code className="text-emerald-300 font-mono">x</code>. If absent, <strong className="text-emerald-400">SILENT NO-OP</strong> (Never crashes).
                </p>
                <div className="text-xs font-mono text-slate-400">
                  Use for defensive cleanup without try/except blocks.
                </div>
              </div>

              {/* Method 3: pop */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-sky-800/60 shadow-lg shadow-sky-950/30 transition-all duration-300 hover:border-sky-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-lg">
                    <span>🎲</span> s.pop()
                  </div>
                  <span className="text-xs font-mono bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">
                    Arbitrary Pop
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Removes & returns an <strong className="text-sky-300">arbitrary element</strong>. If empty, raises <strong className="text-rose-400">KeyError</strong>.
                </p>
                <div className="text-xs font-mono text-slate-400">
                  Use for draining task queues or picking worker items.
                </div>
              </div>

              {/* Method 4: clear */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-amber-800/60 shadow-lg shadow-amber-950/30 transition-all duration-300 hover:border-amber-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-lg">
                    <span>🧹</span> s.clear()
                  </div>
                  <span className="text-xs font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
                    Total Reset
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Empties all buckets in place, leaving <code className="text-amber-300 font-mono">set()</code> with <strong className="text-white">len = 0</strong>.
                </p>
                <div className="text-xs font-mono text-slate-400">
                  Use to recycle existing memory sets across loops.
                </div>
              </div>
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
                2. Visualizing Deletion Behaviors
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("comparison")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "comparison"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                remove() vs discard()
              </button>
              <button
                onClick={() => setActiveTab("popflow")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "popflow"
                    ? "bg-sky-900/50 text-sky-300 border border-sky-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                pop() & clear() Mechanics
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeTab === "comparison" ? (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">Behavior When Deleting a Non-Existent Element: "UnknownCity"</text>

                {/* Left: remove() */}
                <rect x="30" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                <text x="50" y="95" fill="#fca5a5" fontSize="15" fontWeight="bold">s.remove("UnknownCity")</text>

                <rect x="50" y="115" width="340" height="45" rx="6" fill="#450a0a" stroke="#ef4444" />
                <text x="65" y="142" fill="#fecaca" fontSize="13" fontWeight="bold">💥 CRASH: KeyError: 'UnknownCity'</text>

                <text x="50" y="185" fill="#cbd5e1" fontSize="12">• Computes hash("UnknownCity").</text>
                <text x="50" y="210" fill="#cbd5e1" fontSize="12">• Inspects bucket → Finds item is absent.</text>
                <text x="50" y="235" fill="#fca5a5" fontSize="12" fontWeight="bold">• Immediately raises KeyError and terminates execution!</text>

                {/* Right: discard() */}
                <rect x="440" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="460" y="95" fill="#34d399" fontSize="15" fontWeight="bold">s.discard("UnknownCity")</text>

                <rect x="460" y="115" width="340" height="45" rx="6" fill="#064e3b" stroke="#10b981" />
                <text x="475" y="142" fill="#a7f3d0" fontSize="13" fontWeight="bold">🛡️ SAFE NO-OP: Returns None (Zero Error)</text>

                <text x="460" y="185" fill="#cbd5e1" fontSize="12">• Computes hash("UnknownCity").</text>
                <text x="460" y="210" fill="#cbd5e1" fontSize="12">• Inspects bucket → Finds item is absent.</text>
                <text x="460" y="235" fill="#34d399" fontSize="12" fontWeight="bold">• Silently exits without error. Program continues safely!</text>
              </svg>
            ) : (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">set.pop() vs set.clear() Internal Memory Actions</text>

                {/* Left: pop() */}
                <rect x="30" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="50" y="95" fill="#38bdf8" fontSize="15" fontWeight="bold">item = s.pop()  (Arbitrary Extraction)</text>

                <rect x="50" y="115" width="340" height="45" rx="6" fill="#0c4a6e" stroke="#0ea5e9" />
                <text x="65" y="142" fill="#bae6fd" fontSize="12" fontWeight="bold">Extracts 1st Occupied Bucket → Returns Element</text>

                <text x="50" y="185" fill="#cbd5e1" fontSize="12">• Removes 1 item from hash table.</text>
                <text x="50" y="210" fill="#cbd5e1" fontSize="12">• Returns the extracted element to caller.</text>
                <text x="50" y="235" fill="#fca5a5" fontSize="12" fontWeight="bold">• Raises KeyError if set is already empty!</text>

                {/* Right: clear() */}
                <rect x="440" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="460" y="95" fill="#fbbf24" fontSize="15" fontWeight="bold">s.clear()  (Total In-Place Reset)</text>

                <rect x="460" y="115" width="340" height="45" rx="6" fill="#451a03" stroke="#f59e0b" />
                <text x="475" y="142" fill="#fde68a" fontSize="12" fontWeight="bold">Deallocates all Buckets → Resets len(s) == 0</text>

                <text x="460" y="185" fill="#cbd5e1" fontSize="12">• Wipes all table elements in place.</text>
                <text x="460" y="210" fill="#cbd5e1" fontSize="12">• Keeps existing memory object reference alive.</text>
                <text x="460" y="235" fill="#34d399" fontSize="12" fontWeight="bold">• 100% Safe even if set is already empty!</text>
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
                Lab A: KeyError Trapping in remove() vs Safe discard()
              </h3>
              <PythonFileLoader
                fileModule={removeVsDiscard}
                title="remove_vs_discard.py"
                highlightLines={[6, 12, 19, 23]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab B: Arbitrary Removal with pop() & Resetting with clear()
              </h3>
              <PythonFileLoader
                fileModule={popAndClear}
                title="pop_and_clear_demo.py"
                highlightLines={[6, 11, 20, 26]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab C: Bulk Removal with difference_update() and -= Operator
              </h3>
              <PythonFileLoader
                fileModule={removalEdgeCases}
                title="removal_edge_cases.py"
                highlightLines={[16, 20]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab D: Real-World Student Deregistration & Tuition Refund in ₹
              </h3>
              <PythonFileLoader
                fileModule={studentDeregistration}
                title="student_deregistration.py"
                highlightLines={[12, 19, 24]}
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
                <span className="text-xl">🎓</span> 1. Defensive Student Deregistration
              </div>
              <p className="text-sm text-slate-300">
                When student roll numbers withdraw from course batches in <strong>Barrackpore</strong>, calling <code className="font-mono text-emerald-400">roster.discard(student_id)</code> processes refunds (<strong className="text-emerald-300">₹4,500/student</strong>) defensively without crashing if the student was already removed.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">⚙️</span> 2. Worker Queue Task Draining
              </div>
              <p className="text-sm text-slate-300">
                Background processing daemons drain incoming PDF generation jobs using <code className="font-mono text-sky-400">while job_set: job = job_set.pop()</code>, processing asynchronous invoices in rapid O(1) steps until the set is completely empty.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🔐</span> 3. Revoking Granular API Scopes
              </div>
              <p className="text-sm text-slate-300">
                Authentication microservices revoke expired permission scopes using <code className="font-mono text-purple-400">user_scopes -= revoked_scopes</code>, adjusting access permissions in real time in <strong>Kolkata</strong> tech hubs.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🧹</span> 4. User Session Cache Recycling
              </div>
              <p className="text-sm text-slate-300">
                High-throughput web servers reset active user session sets on user logout using <code className="font-mono text-amber-400">active_tokens.clear()</code>, reclaiming memory immediately without creating new object references.
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
              5. Pitfalls & Tricky Deletion Edge Cases
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 1: Unhandled KeyError in remove()
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Calling <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">s.remove("absent_item")</code> crashes with <code className="text-rose-400 font-bold">KeyError</code>. Use <code className="font-mono text-emerald-400">s.discard("absent_item")</code> whenever absence is expected or harmless.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 2: Popping from Empty Set
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Calling <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">set().pop()</code> raises <code className="text-rose-400 font-bold">KeyError: 'pop from an empty set'</code>. Always verify <code className="font-mono text-emerald-400">if my_set:</code> before calling pop().
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 3: Reassigning to None
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">s = s.discard("A")</code> destroys <code className="font-mono text-white">s</code> by setting it to <code className="font-mono text-rose-400">None</code>. Call deletion methods as standalone statements!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 4: del s[0] Syntax Error
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">del s[0]</code> fails with <code className="text-rose-400 font-bold">TypeError: 'set' object doesn't support item deletion</code> because sets have no indices.
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
            title="Topic 5: Removing Elements Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Printable Study Note"
            downloadFileName="topic5_removing_elements_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS (30 COMPREHENSIVE QUESTIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Topic 5 • Removing Elements: Master Viva & Review Questions"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note="Teacher's Golden Rule for Deletions: If you aren't 100% sure whether an item exists in the set, default to .discard()—it guarantees your program will never crash with a KeyError! Use .remove() only when an element's absence indicates a serious bug in your business logic. When Susmita and Debangshu process student batch dropouts in Barrackpore, .discard() is your safest guardian!"
          />
        </section>

      </div>
    </div>
  );
}
