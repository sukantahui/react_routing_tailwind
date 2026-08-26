import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – Memory profiling and reducing object footprint with __slots__
 * Module: 004_002_performance-optimization (Performance Optimization, Profiling & Big-O Thinking)
 * Track: Python from Basic to Pro
 *
 * @component
 * @returns {JSX.Element} Interactive tutorial component with concept simulator,
 *                        Semantic SVGs, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic4 = () => {
  const [activeTab, setActiveTab] = useState("concept");
  const [filterThreshold, setFilterThreshold] = useState(70000);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const sampleEmployees = [
    { id: 101, name: "Mamata", center: "Barrackpore", salary: 75000, score: 4.8 },
    { id: 102, name: "Debangshu", center: "Jadavpur", salary: 85000, score: 4.9 },
    { id: 103, name: "Susmita", center: "Kolkata", salary: 92000, score: 4.7 },
    { id: 104, name: "Mahima", center: "Ichapur", salary: 68000, score: 4.6 }
  ];

  const filteredList = sampleEmployees.filter((e) => e.salary &ge; filterThreshold);

  return (
    <>
      <style>{`
        .reveal-section {
          transform: translateY(0);
          transition: transform 0.4s ease-out;
        }
        .reveal-section.is-visible {
          transform: translateY(0);
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-teal-500/30 selection:text-teal-200">
        
        {/* ─── 1. Header Section ──────────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/70 border border-teal-700/60 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg">
            <span>🐍</span>
            <span>Python Masterclass · Module 002 · Topic 4</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Memory profiling and reducing object footprint with __slots__
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master algorithm analysis, Big-O complexity, performance profiling with cProfile, and high-speed data structures.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              ⚡ Pythonic Architecture
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              🧮 Clean Code &amp; Idioms
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-indigo-300">
              🔄 Robust Error Handling
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              💾 Production Scalability
            </span>
          </div>
        </header>

        {/* ─── 2. Classroom Teacher Masterclass Section ───────── */}
        <section
          ref={addRef}
          className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-teal-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl shadow-teal-950/20"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 font-bold text-lg">
              👨‍🏫
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Teacher's Concept Breakdown: Memory profiling and reducing object footprint with __slots__
              </h2>
              <p className="text-xs text-slate-400">
                Understanding Python mechanics and design patterns from first principles
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5 mb-2">
                  <span>💡</span> Architectural Insight
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  In modern software engineering, <strong className="text-teal-300">Memory profiling and reducing object footprint with __slots__</strong> provides the idiomatic abstractions necessary to build clean, maintainable, and high-performance applications.
                </p>
                <div className="my-2 p-3 rounded-lg bg-teal-950/40 border border-teal-800/60 font-mono text-xs sm:text-sm text-teal-200 text-center font-bold">
                  Readable Syntax · Deterministic Execution · Fast Prototyping
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  By adhering to PEP 8 standards and leveraging Python's rich standard library, developers eliminate boilerplate and deliver enterprise-grade code.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200">
                🎯 <strong>Teacher's Law:</strong> <em>"Readability counts! Simple is better than complex, and complex is better than complicated."</em>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                  <span>🏫</span> Real-World Engineering Analogy
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Imagine an automated logistics dispatch office in Barrackpore:
                </p>
                <ul className="text-xs text-slate-400 mt-2 space-y-2 list-disc list-inside">
                  <li>
                    <strong className="text-slate-200">Structured Data:</strong> Every consignment has a labeled tracking slip (Dictionary / Class) containing destination, weight, and value.
                  </li>
                  <li>
                    <strong className="text-slate-200">Standardized Pipeline:</strong> Packages are sorted, validated, and dispatched through deterministic routing channels.
                  </li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200">
                ✨ <strong>Engineering Gain:</strong> Zero delivery ambiguity and 100% operational transparency!
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Interactive Code Simulator ──────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">⚡</span> Interactive Python Workbench: Memory profiling and reducing object footprint with __slots__
          </h2>
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">View:</span>
                <button
                  onClick={() => setActiveTab("concept")}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition",
                    activeTab === "concept" ? "bg-teal-900/80 border-teal-500 text-teal-200" : "bg-slate-950 border-slate-800 text-slate-400"
                  )}
                &gt;
                  Structured View
                </button>
                <button
                  onClick={() => setActiveTab("json")}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition",
                    activeTab === "json" ? "bg-teal-900/80 border-teal-500 text-teal-200" : "bg-slate-950 border-slate-800 text-slate-400"
                  )}
                &gt;
                  Raw Dictionary JSON
                </button>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Filter Minimum Salary (₹):
                </label>
                <select
                  value={filterThreshold}
                  onChange={(e) => setFilterThreshold(Number(e.target.value))}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-teal-400 focus:outline-none"
                &gt;
                  <option value={60000}>₹60,000+ (All 4 Records)</option>
                  <option value={75000}>₹75,000+ (3 Records)</option>
                  <option value={85000}>₹85,000+ (2 Records)</option>
                  <option value={90000}>₹90,000+ (Top Earner)</option>
                </select>
              </div>
            </div>

            {activeTab === "concept" ? (
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-2">ID</th>
                      <th className="pb-2">Employee</th>
                      <th className="pb-2">Location</th>
                      <th className="pb-2">Salary</th>
                      <th className="pb-2">Performance</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-slate-300">
                    {filteredList.map((emp) => (
                      <tr key={emp.id} className="hover:bg-slate-900/40">
                        <td className="py-2.5 text-slate-500">{emp.id}</td>
                        <td className="py-2.5 font-bold text-white">{emp.name}</td>
                        <td className="py-2.5 text-cyan-300">{emp.center}</td>
                        <td className="py-2.5 text-slate-300 font-mono">₹{emp.salary.toLocaleString('en-IN')}</td>
                        <td className="py-2.5">
                          <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/60">
                            ⭐ {emp.score}
                          </span>
                        </td>
                        <td className="py-2.5 text-emerald-400 font-bold">Active</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <pre className="font-mono text-xs text-teal-300 overflow-x-auto">
                  {JSON.stringify(filteredList, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </section>

        {/* ─── 4. Real-World West Bengal Engineering Scenarios ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-amber-400">🏢</span> Real-World Engineering Scenarios (West Bengal Context)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/60 text-amber-300">
                    BARRACKPORE ENTERPRISE
                  </span>
                  <span className="text-xs text-slate-400">Barrackpore Hub</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Automated Billing &amp; Invoicing Microservice</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Mamata implemented automated PDF invoice generation in Barrackpore processing ₹45 Lakh monthly commercial revenue, utilizing clean Python dictionaries and file streams with zero downtime.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                100% Automated Financial Auditing
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-teal-950/60 border border-teal-800/60 text-teal-300">
                    JADAVPUR ROBOTICS
                  </span>
                  <span className="text-xs text-slate-400">Jadavpur University</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Real-Time Sensor Telemetry Ingestion</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Debangshu programmed IoT telemetry logging across Arduino microcontrollers and Python backends over serial streams, logging 10,000 telemetry packets per second with robust exception recovery.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300">
                Sub-Millisecond Telemetry Ingestion
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. Senior Pitfalls & Best Practices ────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-rose-400">🛡️</span> Common Pitfalls &amp; Production Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-4">
              <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Common Beginner Pitfalls
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Mutable Default Arguments:</strong>
                Using <code className="text-rose-300 font-mono">def fn(item, arr=[])</code> shares the exact same list instance across all calls. Always use <code className="text-rose-300 font-mono">arr=None</code>!
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Bare Except Clauses:</strong>
                Using <code className="text-rose-300 font-mono">except:</code> silently catches keyboard interrupts (Ctrl+C) and system exits. Always catch specific exceptions!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>✓</span> Production Best Practices
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Leverage Context Managers:</strong>
                Always open files and database connections with <code className="text-emerald-300 font-mono">with open(...) as f:</code> to guarantee resource closure even on unexpected crashes.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Static Type Annotations:</strong>
                Add Python 3.12+ type hints (<code className="text-emerald-300 font-mono">def add(x: int, y: int) -&gt; int:</code>) to catch runtime type mismatches early via MyPy.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. FAQ & Practice Questions ────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Memory profiling and reducing object footprint with __slots__ FAQs"
            questions={questions}
            subtitle="Test your comprehension with 30 deep-dive questions"
            showPrint
            showExpandAll
            showSearch
            showProgress
          />
        </section>

        {/* ─── 7. Printable Plain Text Note ───────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <PlainTextPrint
            content={noteText}
            title="Memory profiling and reducing object footprint with __slots__"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

        {/* ─── 8. Teacher's Note ──────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "In software development, simplicity is the ultimate sophistication. " +
              "Mastering Python core fundamentals and writing clean, idiomatic code makes you a 10x more productive engineer in any domain, from web backends to data science and AI!"
            }
          />
        </section>

        {/* ─── 9. Footer ──────────────────────────────────────── */}
        <footer className="max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>
            Topic 4 · Memory profiling and reducing object footprint with __slots__ · Python Masterclass · Coder &amp; AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic4;
