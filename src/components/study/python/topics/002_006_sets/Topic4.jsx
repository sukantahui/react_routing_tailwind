import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import addSingle from "./topic4_files/add_single_element.py?raw";
import updateMultiple from "./topic4_files/update_multiple_iterables.py?raw";
import addVsUpdatePitfalls from "./topic4_files/add_vs_update_pitfalls.py?raw";
import inventoryBatch from "./topic4_files/inventory_batch_addition.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic4_files/topic4_note.txt?raw";

// FAQ Questions
import questions from "./topic4_files/topic4_questions";

/**
 * Topic4: Adding Elements: add() and update()
 * Module: 002_006_sets
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * In-depth guide to mutating sets in Python: set.add() vs set.update(),
 * variadic iterables, in-place mutation, the None return value trap,
 * and string-splitting pitfalls.
 */
export default function Topic4() {
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("mechanics");

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
            Topic 4
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Set Mutation Methods
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Adding Elements: <code className="text-emerald-400 font-mono">add()</code> vs <code className="text-sky-400 font-mono">update()</code>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Mastering in-place set expansion: adding single items with <code className="text-emerald-400 font-mono">.add()</code>, bulk multi-iterable ingestion with <code className="text-sky-400 font-mono">.update()</code>, and avoiding string-splitting bugs.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 O(1) Single Item Insertion
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📦 Variadic Multi-Iterable Ingestion
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚠️ The String Splitting Gotcha
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🚫 In-Place None Return Trap
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: ADD VS UPDATE COMPARISON */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. Method Comparison: <code className="text-emerald-400">add()</code> vs <code className="text-sky-400">update()</code>
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Python sets are mutable collections that can expand dynamically. Depending on whether you want to insert a <strong className="text-emerald-400">single discrete value</strong> or <strong className="text-sky-400">merge elements from collections</strong>, Python provides two distinct methods:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6 not-prose">
              {/* Card 1: add() */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:border-emerald-500">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
                    <span>➕</span> set.add(element)
                  </div>
                  <span className="text-xs font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                    O(1) Time
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-3">
                  Takes exactly <strong className="text-white">one hashable item</strong> and inserts it as a single member into the set.
                </p>
                <div className="text-xs font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-slate-400 space-y-1">
                  <div><span className="text-emerald-400">✓</span> <code className="text-emerald-300">s.add("Python")</code> -> {"{'Python'}"}</div>
                  <div><span className="text-emerald-400">✓</span> <code className="text-emerald-300">s.add((1, 2))</code> -> {"{(1, 2)}"}</div>
                </div>
              </div>

              {/* Card 2: update() */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-sky-800/60 shadow-lg shadow-sky-950/30 transition-all duration-300 hover:border-sky-500">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-lg">
                    <span>📥</span> set.update(*iterables)
                  </div>
                  <span className="text-xs font-mono bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">
                    O(K) Bulk
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-3">
                  Takes <strong className="text-white">one or more iterables</strong>, unpacks every child item, and inserts them all into the set.
                </p>
                <div className="text-xs font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-slate-400 space-y-1">
                  <div><span className="text-sky-400">✓</span> <code className="text-sky-300">s.update([10, 20])</code> -> {"{10, 20}"}</div>
                  <div><span className="text-sky-400">✓</span> <code className="text-sky-300">s.update(tuple1, list2)</code> -> Multi-source!</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-amber-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-2">
                ⚠️ The #1 Mutation Trap: In-Place Modification Returns None!
              </h3>
              <p className="text-sm sm:text-base text-slate-300">
                Both <code className="text-emerald-400 font-mono">.add()</code> and <code className="text-sky-400 font-mono">.update()</code> modify the set in place and return <code className="text-rose-400 font-mono">None</code>. Never write <code className="text-rose-300 font-mono font-bold bg-rose-950/50 px-1.5 py-0.5 rounded">s = s.add(x)</code>, as this will destroy your set by turning <code className="font-mono text-white">s</code> into <code className="font-mono text-rose-400">None</code>!
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
              <span className="text-3xl">🔀</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Insertion: <code className="text-emerald-400">add()</code> vs <code className="text-sky-400">update()</code>
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("mechanics")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "mechanics"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                add() vs update() Mechanics
              </button>
              <button
                onClick={() => setActiveTab("stringtrap")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "stringtrap"
                    ? "bg-amber-900/50 text-amber-300 border border-amber-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                The String Splitting Trap
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeTab === "mechanics" ? (
              <svg viewBox="0 0 850 340" className="w-full h-auto min-w-[650px] font-sans">
                {/* Method 1: set.add */}
                <text x="30" y="30" fill="#34d399" fontSize="13" fontWeight="bold">METHOD 1: set.add(item) → ATOMIC 1-ITEM INSERTION</text>

                <rect x="30" y="45" width="220" height="50" rx="8" fill="#1e293b" stroke="#059669" strokeWidth="1.5" />
                <text x="45" y="75" fill="#f8fafc" fontSize="13" fontWeight="bold">Single Item: "Kolkata"</text>

                <path d="M 250 70 L 330 70" stroke="#10b981" strokeWidth="2" fill="none" />
                <text x="260" y="62" fill="#10b981" fontSize="10">hash("Kolkata")</text>

                <rect x="330" y="45" width="480" height="50" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="350" y="75" fill="#a7f3d0" fontSize="13" fontWeight="bold">Inserts into 1 Hash Bucket → Result: {"{'Kolkata'}"}</text>

                {/* Method 2: set.update */}
                <text x="30" y="160" fill="#38bdf8" fontSize="13" fontWeight="bold">METHOD 2: set.update(*iterables) → UNPACKS & BULK INSERTS</text>

                <rect x="30" y="175" width="220" height="135" rx="8" fill="#1e293b" stroke="#0284c7" strokeWidth="1.5" />
                <text x="45" y="200" fill="#38bdf8" fontSize="12" fontWeight="bold">Incoming Iterables:</text>
                <text x="45" y="225" fill="#cbd5e1" fontSize="11">1. List: ["Ichapur", "Jadavpur"]</text>
                <text x="45" y="250" fill="#cbd5e1" fontSize="11">2. Tuple: ("Barrackpore",)</text>
                <text x="45" y="275" fill="#cbd5e1" fontSize="11">3. Range: range(700120, 700122)</text>

                <path d="M 250 240 L 330 240" stroke="#38bdf8" strokeWidth="2" fill="none" />
                <text x="255" y="232" fill="#38bdf8" fontSize="10">Unpack All</text>

                <rect x="330" y="175" width="480" height="135" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
                <text x="350" y="205" fill="#38bdf8" fontSize="12" fontWeight="bold">Unpacked Stream Inserted in Parallel:</text>
                <text x="350" y="235" fill="#94a3b8" fontSize="12">• Unpacks "Ichapur" → Hash & Insert</text>
                <text x="350" y="255" fill="#94a3b8" fontSize="12">• Unpacks "Jadavpur" → Hash & Insert</text>
                <text x="350" y="275" fill="#94a3b8" fontSize="12">• Unpacks "Barrackpore", 700120, 700121...</text>
                <text x="350" y="295" fill="#34d399" fontSize="12" fontWeight="bold">Result: Consolidated Multi-Source Set!</text>
              </svg>
            ) : (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">The Classic Trap: Passing Strings to .add() vs .update()</text>

                {/* Left: s.add('Kolkata') */}
                <rect x="30" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="50" y="95" fill="#34d399" fontSize="15" fontWeight="bold">s.add("Kolkata")  (INTENDED)</text>

                <rect x="50" y="115" width="340" height="45" rx="6" fill="#064e3b" stroke="#10b981" />
                <text x="65" y="142" fill="#a7f3d0" fontSize="13" fontWeight="bold">Result: {'{"Kolkata"}'} (Len: 1 element)</text>

                <text x="50" y="185" fill="#cbd5e1" fontSize="12">• Treats the string as a complete, atomic word.</text>
                <text x="50" y="210" fill="#cbd5e1" fontSize="12">• Adds the entire city name into 1 bucket.</text>
                <text x="50" y="235" fill="#34d399" fontSize="12" fontWeight="bold">✓ Correct method for adding words or tags!</text>

                {/* Right: s.update('Kolkata') */}
                <rect x="440" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                <text x="460" y="95" fill="#fca5a5" fontSize="15" fontWeight="bold">s.update("Kolkata")  (THE BUG)</text>

                <rect x="460" y="115" width="340" height="45" rx="6" fill="#450a0a" stroke="#ef4444" />
                <text x="475" y="142" fill="#fecaca" fontSize="13" fontWeight="bold">Result: {'{"K", "o", "l", "k", "a", "t"}'} (Len: 6)</text>

                <text x="460" y="185" fill="#cbd5e1" fontSize="12">• Strings are iterables! update() unpacks characters.</text>
                <text x="460" y="210" fill="#cbd5e1" fontSize="12">• Shatters the word into individual letters.</text>
                <text x="460" y="235" fill="#fca5a5" fontSize="12" fontWeight="bold">❌ Unintended word shattering bug!</text>
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
                Lab A: Single Item Insertion with .add() & In-Place Mutation
              </h3>
              <PythonFileLoader
                fileModule={addSingle}
                title="add_single_element.py"
                highlightLines={[6, 10, 14, 18, 26]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab B: Bulk Ingestion from Multiple Iterables with .update()
              </h3>
              <PythonFileLoader
                fileModule={updateMultiple}
                title="update_multiple_iterables.py"
                highlightLines={[6, 12, 17, 26]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab C: Common Traps: String Shattering & List in add()
              </h3>
              <PythonFileLoader
                fileModule={addVsUpdatePitfalls}
                title="add_vs_update_pitfalls.py"
                highlightLines={[10, 14, 19, 27]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab D: Real-World Multi-Branch Batch Ingestion & Revenue in ₹
              </h3>
              <PythonFileLoader
                fileModule={inventoryBatch}
                title="inventory_batch_addition.py"
                highlightLines={[10, 16, 21]}
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
            <span className="text-3xl">🏢</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Industry Applications in West Bengal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🎓</span> 1. Multi-Branch Admission Merging
              </div>
              <p className="text-sm text-slate-300">
                When Susmita, Mamata, and Debangshu collect student registrations across <strong>Barrackpore</strong>, <strong>Ichapur</strong>, and <strong>Kolkata</strong>, calling <code className="font-mono text-emerald-400">active_students.update(batch1, batch2, batch3)</code> consolidates all batches into an accurate fee roster in Indian Rupees (<strong className="text-emerald-300">₹4,500/student</strong>).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🛒</span> 2. E-Commerce Product Tag Aggregation
              </div>
              <p className="text-sm text-slate-300">
                E-commerce backends update catalog search keywords using <code className="font-mono text-sky-400">catalog_tags.update(item.keywords)</code>, ingesting product attributes on the fly without creating duplicate index entries.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">📡</span> 3. IoT Sensor Node Whitelisting
              </div>
              <p className="text-sm text-slate-300">
                Smart grid controllers in <strong>Jadavpur</strong> research centers add dynamic sensor device IDs as new telemetry nodes come online using <code className="font-mono text-purple-400">authorized_nodes.add(node_id)</code> in O(1) time.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🔒</span> 4. Real-Time Security Blacklists
              </div>
              <p className="text-sm text-slate-300">
                Web security firewalls append offending IP addresses to an active memory blacklist with <code className="font-mono text-amber-400">banned_ips.add(client_ip)</code>, instantly blocking subsequent malicious HTTP requests.
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
              5. Pitfalls & Tricky Gotchas with <code className="text-emerald-400">add()</code> and <code className="text-sky-400">update()</code>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 1: Word Shattering in update()
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Calling <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">s.update("Python")</code> shatters the word into characters {'{P, y, t, h, o, n}'}. Always use <code className="font-mono text-emerald-400">s.add("Python")</code> for complete strings!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 2: Reassigning to Return Value
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">s = s.add("React")</code> sets <code className="font-mono text-white">s</code> to <code className="font-mono text-rose-400">None</code>. Both <code className="font-mono">add()</code> and <code className="font-mono">update()</code> mutate in place and return <code className="font-mono">None</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 3: Passing Lists Directly to add()
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">s.add([1, 2])</code> crashes with <code className="text-rose-400 font-bold">TypeError: unhashable type: 'list'</code>. Use <code className="font-mono text-emerald-400">s.update([1, 2])</code> to unpack elements.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 4: Method Chaining Attempts
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">s.add(1).add(2)</code> fails with <code className="text-rose-400 font-bold">AttributeError: 'NoneType' object has no attribute 'add'</code>. Use <code className="font-mono text-emerald-400">s.update([1, 2])</code> instead.
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
            title="Topic 4: Adding Elements Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Printable Study Note"
            downloadFileName="topic4_adding_elements_add_update_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS (30 COMPREHENSIVE QUESTIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Topic 4 • Adding Elements (add & update): Master Viva & Review Questions"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note="Teacher's Rule of Thumb: Remember the golden distinction—use .add() for a single discrete value (like adding a student roll number or city name), and use .update() whenever you want to unpack collections like lists, tuples, or database query records. And always avoid s = s.add(x) to prevent turning your variable into None!"
          />
        </section>

      </div>
    </div>
  );
}
