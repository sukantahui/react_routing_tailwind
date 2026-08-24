import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import createLiteral from "./topic1_files/create_literal_demo.py?raw";
import createConstructor from "./topic1_files/create_constructor_demo.py?raw";
import emptySetDemo from "./topic1_files/empty_set_demo.py?raw";
import iterableConversion from "./topic1_files/iterable_conversion_demo.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic1_files/topic1_note.txt?raw";

// FAQ Questions
import questions from "./topic1_files/topic1_questions";

/**
 * Topic1: Creating Sets (Set Literal and Set Constructor)
 * Module: 002_006_sets
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Comprehensive exploration of set literals {}, the set() constructor,
 * the empty set trap, iterable conversions, and bytecode BUILD_SET optimizations.
 */
export default function Topic1() {
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("syntax");

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
            Topic 1
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Set Construction & Syntax
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Creating Sets: Literals vs Constructors
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Mastering set literal syntax <code className="text-emerald-400 font-mono">{"{ ... }"}</code>, the built-in <code className="text-sky-400 font-mono">set()</code> constructor, dynamic iterable conversions, and avoiding the dreaded empty dictionary trap.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ BUILD_SET Opcode Optimization
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 Iterable Unpacking
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚠️ {"{}"} vs set() Empty Trap
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧩 Dict Keys/Values/Items
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: TWO ROADS TO SET CREATION */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🛣️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. Two Pathways to Set Creation
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In Python, you have two complementary ways to instantiate a set object. Choosing the right one depends on whether you have <strong className="text-emerald-400">static compile-time constants</strong> or <strong className="text-sky-400">dynamic runtime iterables</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6 not-prose">
              {/* Card 1: Literal */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-emerald-500">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
                    <span>✨</span> Set Literal Syntax
                  </div>
                  <span className="text-xs font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                    Faster (BUILD_SET)
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-3">
                  Encloses comma-separated hashable elements in curly braces: <code className="font-mono text-emerald-300">{"s = {10, 20, 30}"}</code>.
                </p>
                <div className="text-xs font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                  <span className="text-emerald-400">✓</span> Best for: Known constants, short configs, inline lookup sets.
                </div>
              </div>

              {/* Card 2: Constructor */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-sky-800/60 shadow-lg shadow-sky-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-sky-500">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-lg">
                    <span>🏗️</span> set() Constructor
                  </div>
                  <span className="text-xs font-mono bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">
                    Universal Adapter
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-3">
                  Calls the built-in type constructor on any iterable: <code className="font-mono text-sky-300">s = set(iterable)</code>.
                </p>
                <div className="text-xs font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                  <span className="text-sky-400">✓</span> Best for: Empty set creation (<code className="text-sky-300">set()</code>), converting lists/strings/dicts/ranges.
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
                2. Visualizing Set Construction Mechanics
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("syntax")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "syntax"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Literal vs Constructor Flow
              </button>
              <button
                onClick={() => setActiveTab("emptytrap")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "emptytrap"
                    ? "bg-amber-900/50 text-amber-300 border border-amber-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                The Empty Set Anatomy
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeTab === "syntax" ? (
              <svg viewBox="0 0 850 340" className="w-full h-auto min-w-[650px] font-sans">
                {/* Method 1: Set Literal */}
                <text x="30" y="35" fill="#34d399" fontSize="14" fontWeight="bold">METHOD 1: SET LITERAL {"{ 'A', 'B', 'C' }"}</text>

                <rect x="30" y="55" width="220" height="50" rx="8" fill="#1e293b" stroke="#059669" strokeWidth="1.5" />
                <text x="45" y="85" fill="#f8fafc" fontSize="13" fontWeight="bold">{"{'Kolkata', 'Barrackpore'}"}</text>

                <path d="M 250 80 L 320 80" stroke="#10b981" strokeWidth="2" fill="none" />
                <text x="260" y="72" fill="#10b981" fontSize="10">BUILD_SET</text>

                <rect x="320" y="55" width="490" height="50" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="340" y="85" fill="#a7f3d0" fontSize="13" fontWeight="bold">Direct Stack Allocation → Instant Set Object created!</text>

                {/* Method 2: Constructor Unpacking */}
                <text x="30" y="160" fill="#38bdf8" fontSize="14" fontWeight="bold">METHOD 2: CONSTRUCTOR set("BANANA")</text>

                <rect x="30" y="180" width="220" height="50" rx="8" fill="#1e293b" stroke="#0284c7" strokeWidth="1.5" />
                <text x="45" y="210" fill="#f8fafc" fontSize="13" fontWeight="bold">String "BANANA"</text>

                <path d="M 250 205 L 320 205" stroke="#38bdf8" strokeWidth="2" fill="none" />
                <text x="255" y="197" fill="#38bdf8" fontSize="10">Iterate & Hash</text>

                {/* Stream Box */}
                <rect x="320" y="170" width="490" height="135" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
                <text x="340" y="195" fill="#38bdf8" fontSize="12" fontWeight="bold">Stream Unpacking Step-by-Step:</text>

                <text x="340" y="220" fill="#94a3b8" fontSize="12">'B' → Hash bucket created (1st item)</text>
                <text x="340" y="240" fill="#94a3b8" fontSize="12">'A' → Hash bucket created (2nd item)</text>
                <text x="340" y="260" fill="#94a3b8" fontSize="12">'N' → Hash bucket created (3rd item)</text>
                <text x="340" y="280" fill="#fca5a5" fontSize="12">'A', 'N', 'A' → Collisions discarded as duplicates!</text>
                <text x="590" y="280" fill="#34d399" fontSize="12" fontWeight="bold">Result: {'{"B", "A", "N"}'}</text>
              </svg>
            ) : (
              <svg viewBox="0 0 850 320" className="w-full h-auto min-w-[650px] font-sans">
                <text x="30" y="35" fill="#f8fafc" fontSize="15" fontWeight="bold">The Crucial Distinction: {"{}"} vs set()</text>

                {/* Empty Braces Card */}
                <rect x="30" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                <text x="50" y="95" fill="#fca5a5" fontSize="15" fontWeight="bold">x = {"{}"}  (Empty Braces)</text>

                <rect x="50" y="115" width="340" height="40" rx="6" fill="#450a0a" border="1" stroke="#ef4444" />
                <text x="65" y="140" fill="#fecaca" fontSize="13" fontWeight="bold">Type: &lt;class 'dict'&gt; (DICTIONARY!)</text>

                <text x="50" y="185" fill="#cbd5e1" fontSize="12">• Does NOT create an empty set.</text>
                <text x="50" y="210" fill="#cbd5e1" fontSize="12">• Creates a hash map expecting key:value pairs.</text>
                <text x="50" y="235" fill="#fca5a5" fontSize="12" fontWeight="bold">• Calling x.add(5) will crash with AttributeError!</text>

                {/* Constructor Card */}
                <rect x="440" y="65" width="380" height="220" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="460" y="95" fill="#34d399" fontSize="15" fontWeight="bold">x = set()  (Constructor)</text>

                <rect x="460" y="115" width="340" height="40" rx="6" fill="#064e3b" stroke="#10b981" />
                <text x="475" y="140" fill="#a7f3d0" fontSize="13" fontWeight="bold">Type: &lt;class 'set'&gt; (TRUE SET!)</text>

                <text x="460" y="185" fill="#cbd5e1" fontSize="12">• The ONLY standard way to create an empty set.</text>
                <text x="460" y="210" fill="#cbd5e1" fontSize="12">• Has len(x) == 0.</text>
                <text x="460" y="235" fill="#34d399" fontSize="12" fontWeight="bold">• Ready for x.add(5), x.update([...]) operations!</text>
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
              3. Interactive Python Code Labs
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab A: Set Literal Syntax & Heterogeneous Elements
              </h3>
              <PythonFileLoader
                fileModule={createLiteral}
                title="create_literal_demo.py"
                highlightLines={[6, 11, 15, 20]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab B: Converting Strings, Tuples, Lists & Ranges with set()
              </h3>
              <PythonFileLoader
                fileModule={createConstructor}
                title="create_constructor_demo.py"
                highlightLines={[7, 12, 18, 23]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab C: The Empty Set Trap (isinstance & Type Checks)
              </h3>
              <PythonFileLoader
                fileModule={emptySetDemo}
                title="empty_set_demo.py"
                highlightLines={[7, 13, 18]}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Lab D: Dictionary Keys, Values, Items & Generator Conversions
              </h3>
              <PythonFileLoader
                fileModule={iterableConversion}
                title="iterable_conversion_demo.py"
                highlightLines={[14, 18, 22, 26]}
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: REAL-WORLD INDUSTRY APPLICATIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🌐</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Real-World Applications in Indian Industry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">💰</span> 1. Course Fee Tier Consolidation
              </div>
              <p className="text-sm text-slate-300">
                When auditing 50 courses across <strong>Barrackpore</strong> and <strong>Jadavpur</strong>, calling <code className="font-mono text-emerald-400">set(course_fees.values())</code> extracts distinct pricing tiers (e.g. <strong className="text-emerald-300">₹3,500, ₹4,500, ₹6,500</strong>) for fee structure planning.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">📊</span> 2. SQL Query Record Deduplication
              </div>
              <p className="text-sm text-slate-300">
                Backend microservices querying thousands of transaction tuples from MySQL convert database cursor rows to sets <code className="font-mono text-sky-400">set(cursor.fetchall())</code> to eliminate duplicate order payloads before invoice processing.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">🔤</span> 3. Unique Character Vocabulary in NLP
              </div>
              <p className="text-sm text-slate-300">
                Natural language processing engines pass multilingual text corpora into <code className="font-mono text-purple-400">set(text)</code> to build distinct token dictionaries and alphabet character sets in Bengali and English.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500">
              <div className="flex items-center gap-2 font-bold text-white text-base mb-2">
                <span className="text-xl">⚡</span> 4. Config Whitelist Initialization
              </div>
              <p className="text-sm text-slate-300">
                Microservices initialize static whitelists using set literals <code className="font-mono text-amber-400">ALLOWED_HOSTS = {"{'api.codernaccotax.co.in', 'auth.codernaccotax.co.in'}"}</code> at boot time for zero-overhead validation.
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
              5. Pitfalls, Traps & Compiler Quirks
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 1: Passing Non-Iterable to set()
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Writing <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">set(500)</code> raises <code className="text-rose-400 font-bold">TypeError: 'int' object is not iterable</code>. Use <code className="font-mono text-slate-200">{"{500}"}</code> or <code className="font-mono text-slate-200">set([500])</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 2: Nested Mutable Literals
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">{"{ {1, 2}, {3, 4} }"}</code> fails because sets are unhashable. Wrap nested sets with <code className="font-mono text-emerald-400">frozenset()</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 3: Dict Values Extraction Omission
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">set(my_dict)</code> takes keys only. If you need unique values, explicitly specify <code className="font-mono text-emerald-400">set(my_dict.values())</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60">
              <div className="font-bold text-rose-400 mb-1">
                ❌ Pitfall 4: Tuple String Packing Confusion
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">set('hello')</code> gives 4 characters, while <code className="bg-rose-900/40 px-1 py-0.5 rounded font-mono text-rose-200">set(('hello',))</code> preserves the 1 complete string.
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
            title="Topic 1: Creating Sets Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Printable Study Note"
            downloadFileName="topic1_creating_sets_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS (30 COMPREHENSIVE QUESTIONS) */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Topic 1 • Creating Sets: Master Viva & Review Questions"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note="Teacher's Tip: Use set literals {...} whenever you define constant lookups in your code—they compile directly to the lightning-fast BUILD_SET opcode. When Debangshu, Susmita, and Mamata convert runtime data from files or databases in Barrackpore and Kolkata, pass the list or generator into set()!"
          />
        </section>

      </div>
    </div>
  );
}
