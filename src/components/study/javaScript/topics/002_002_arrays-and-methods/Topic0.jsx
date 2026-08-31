import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import demoCode from "./topic0_files/CreatingArraysArrayFromOfLengthMechanicsDemoDemo.js?raw";

export default function Topic0() {
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
      { threshold: 0.08 }
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

  return (
    <>
      <style>{`
        .reveal-section {
          opacity: 0.99;
          transform: translateY(0);
          transition: opacity 0.4s ease-out, transform 0.4s ease-out;
        }
        .reveal-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-amber-500/30 selection:text-amber-200">
        
        {/* ─── SECTION 1: HEADER & METADATA ─────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-700/60 text-amber-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>⚡</span>
            <span>Module 002_002_arrays-and-methods · Topic 0</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-sky-300 tracking-tight leading-tight">
            {"Creating Arrays, Array Literals, Array.from(), Array.of() & Length Mechanics"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {"Master array creation semantics in JavaScript: literal syntax vs Array constructor gotchas, Array.from() mapping over iterables/array-likes, Array.of() arity guarantees, and dynamic length manipulation."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-amber-400">Course Code: JS-PRO-101</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Center: Coder &amp; AccoTax (Barrackpore Lab)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* ─── SECTION 2: DETAILED CONCEPT DISCUSSION & MENTAL MODELS ── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg hover:border-slate-700 transition-all">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-400 mb-4 flex items-center gap-2">
              <span>💡</span> Detailed Discussion &amp; Conceptual Foundation
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-4">
              {"Master array creation semantics in JavaScript: literal syntax vs Array constructor gotchas, Array.from() mapping over iterables/array-likes, Array.of() arity guarantees, and dynamic length manipulation."} In high-scale frontend and backend applications, understanding array memory mechanics and transformation algorithms is essential for building efficient data pipelines.
            </p>

            <p className="text-slate-300 leading-relaxed mb-4">
              The V8 JavaScript engine optimizes continuous packed arrays as fast C++ buffers, enabling direct hardware-level memory access while abstracting complexity behind clean ECMAScript method APIs.
            </p>

            {/* Classroom Story with Code/State */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-900/40 text-sm text-slate-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span>🏫</span>
                <span>Classroom Scenario (Barrackpore Lab):</span>
              </div>
              <p>
                {"Swadeep used `new Array(5)` expecting an array with `[5]` but created a sparse array of 5 empty slots."}
              </p>
              <p>
                {"Sukanta Hui demonstrated `Array.of(5)` for single-element arrays and `Array.from({ length: 5 }, (_, i) =&gt; i + 1)` for sequence generation."}
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TOPIC-SPECIFIC SEMANTIC SVG DIAGRAM ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
              <span>📊</span> Runtime Architecture &amp; Execution Pipeline Diagram
            </h2>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 800 240" className="w-full h-auto" role="img" aria-label={"Creating Arrays, Array Literals, Array.from(), Array.of() & Length Mechanics"}>
                <defs>
                  <linearGradient id="arrGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#b45309" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="arrGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="arrGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <rect width="800" height="240" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <text x="400" y="30" fill="#f8fafc" fontSize="14" fontWeight="bold" textAnchor="middle">&#123;"Creating Arrays, Array Literals, Array.from(), Array.of() & Length Mechanics"&#125; · Pipeline Architecture</text>

                {/* Box 1 */}
                <rect x="40" y="70" width="200" height="110" rx="12" fill="url(#arrGrad1)" stroke="#f59e0b" strokeWidth="1" />
                <text x="140" y="105" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Phase 1: Input Structure</text>
                <text x="140" y="135" fill="#fef3c7" fontSize="11" textAnchor="middle">&#123;"Iterable / Array-Like Source"&#125;</text>

                {/* Arrow 1 */}
                <path d="M 250 125 L 290 125" stroke="#f59e0b" strokeWidth="2" />

                {/* Box 2 */}
                <rect x="300" y="70" width="200" height="110" rx="12" fill="url(#arrGrad2)" stroke="#38bdf8" strokeWidth="1" />
                <text x="400" y="105" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Phase 2: V8 Operation</text>
                <text x="400" y="135" fill="#e0f2fe" fontSize="11" textAnchor="middle">&#123;"Array.from() / Array.of() V8 Allocation"&#125;</text>

                {/* Arrow 2 */}
                <path d="M 510 125 L 550 125" stroke="#38bdf8" strokeWidth="2" />

                {/* Box 3 */}
                <rect x="560" y="70" width="200" height="110" rx="12" fill="url(#arrGrad3)" stroke="#10b981" strokeWidth="1" />
                <text x="660" y="105" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Phase 3: Result Memory</text>
                <text x="660" y="135" fill="#d1fae5" fontSize="11" textAnchor="middle">&#123;"Continuous Packed Array in Heap"&#125;</text>
              </svg>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Figure: Step-by-step architectural execution for {"Creating Arrays, Array Literals, Array.from(), Array.of() & Length Mechanics"}.
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: DEEP TECHNICAL BREAKDOWN & SPECIFICATIONS ───── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <span>🔬</span> Deep Technical Know-How, Spec Invariants &amp; Mechanics
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-6">
              The ECMAScript specification defines strict abstract operations for {"Creating Arrays, Array Literals, Array.from(), Array.of() & Length Mechanics"}. The table below compares spec behavior, engine mechanics, and senior best practices.
            </p>

            {/* Specifications Comparison Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm text-slate-300 border-collapse border border-slate-800">
                <thead className="bg-slate-900/90 text-amber-300 uppercase text-xs">
                  <tr>
                    <th className="p-3 border border-slate-800">Feature / Phase</th>
                    <th className="p-3 border border-slate-800">ECMAScript Spec Rule</th>
                    <th className="p-3 border border-slate-800">Runtime / Engine Behavior</th>
                    <th className="p-3 border border-slate-800">Developer Invariant &amp; Best Practice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400">{"Array Literal []"}</td>
                    <td className="p-3 text-slate-300 font-sans">{"Direct evaluation creating packed array"}</td>
                    <td className="p-3 text-amber-300 font-sans">{"Fastest path with initial PACKED_SMI element kind"}</td>
                    <td className="p-3 text-emerald-400 font-sans">{"Standard for general array creation"}</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400">{"Array.from()"}</td>
                    <td className="p-3 text-slate-300 font-sans">{"Converts iterable or array-like with optional mapFn"}</td>
                    <td className="p-3 text-amber-300 font-sans">{"Iterates Symbol.iterator or indexed length properties"}</td>
                    <td className="p-3 text-emerald-400 font-sans">{"NodeLists, Set/Map to Array, range generators"}</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400">{"Array.of()"}</td>
                    <td className="p-3 text-slate-300 font-sans">{"Creates array from variable arguments without size ambiguity"}</td>
                    <td className="p-3 text-amber-300 font-sans">{"Consistent regardless of argument count or type"}</td>
                    <td className="p-3 text-emerald-400 font-sans">{"Dynamic factory functions and variadic arrays"}</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 text-sky-400">{"array.length = N"}</td>
                    <td className="p-3 text-slate-300 font-sans">{"Mutates internal length slot; truncates or appends empty holes"}</td>
                    <td className="p-3 text-amber-300 font-sans">{"Shrinks memory view or de-optimizes array to HOLEY"}</td>
                    <td className="p-3 text-emerald-400 font-sans">{"Fast array clearing (`arr.length = 0`)"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Exceptions & Quirks Subsection */}
            <div className="mt-6 p-5 rounded-xl bg-slate-900/80 border border-rose-900/40 space-y-3">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️</span> Exceptions, Quirks &amp; Corner Cases to Know
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 leading-relaxed">
                <li><strong className="text-rose-300">{"RangeError: Invalid array length:"}</strong> {"Assigning negative numbers, non-integers, or numbers >= 2^32 to `length`."}</li>
                <li><strong className="text-rose-300">{"Array Constructor Single Argument Trap:"}</strong> {"`new Array(5)` creates 5 empty slots, whereas `new Array('5')` creates `['5']`."}</li>
                <li><strong className="text-rose-300">{"Holey De-Optimization:"}</strong> {"Setting an index beyond length (e.g. `arr[100] = 'x'`) converts the array to a slow hash dictionary in V8."}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: HANDS-ON MONACO CODE RUNNER (5+ EXAMPLES) ──── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-400 flex items-center gap-2">
              <span>💻</span> Interactive Monaco Playground: 5+ Practical Working Examples
            </h2>
            <span className="text-xs font-mono px-3 py-1 rounded bg-amber-950/60 border border-amber-800 text-amber-300">
              Live In-Browser Execution
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-2xl bg-slate-900">
            <JavaScriptEditableCodeBlock
              initialCode={demoCode}
              title="CreatingArraysArrayFromOfLengthMechanicsDemoDemo.js"
            />
          </div>
        </section>

        {/* ─── SECTION 6: COMMON PITFALLS & SENIOR BEST PRACTICES ─────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-rose-400 flex items-center gap-2">
            <span>⚖️</span> Common Pitfalls vs Senior Best Practices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pitfall Anti-Pattern */}
            <div className="bg-rose-950/20 border border-rose-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <span>❌</span>
                <span>Anti-Pattern: {"Using 'new Array(n)' for Initialized Collections"}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Empty slots cannot be traversed by `.map()` or `.filter()`."}
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-rose-900/50 text-xs font-mono text-rose-300 overflow-x-auto">
{"// ❌ AVOID: map skips empty holes\nconst zeroes = new Array(5).map(() =&gt; 0); // Still 5 empty slots!"}
              </pre>
            </div>

            {/* Senior Best Practice */}
            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>✓</span>
                <span>Senior Pro Practice: {"Use Array.from() or Array.fill()"}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Always fill or map over explicitly initialized slots."}
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 text-xs font-mono text-emerald-300 overflow-x-auto">
{"// ✓ RECOMMENDED: Explicit initial values\nconst zeroes = Array.from({ length: 5 }, () =&gt; 0); // [0, 0, 0, 0, 0]"}
              </pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: 💎 JAVASCRIPT HIDDEN GEMS & PRO TRICKS ──────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-amber-950/30 via-slate-900 to-purple-950/20 border border-amber-500/30 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xl shadow-md">
                💎
              </span>
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold block">
                  JavaScript Hidden Gem &amp; Senior Pro Secret
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {"Generating Sequential Numeric Ranges with Array.from()"}
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {"One-line idiom for generating custom stepped arithmetic ranges without external helper libraries."}
            </p>

            <div className="rounded-xl border border-amber-900/50 bg-slate-950 p-4 font-mono text-xs text-amber-200 overflow-x-auto">
              <pre>{"const range = (start, stop, step = 1) =&gt;\n  Array.from({ length: Math.ceil((stop - start) / step) }, (_, i) =&gt; start + i * step);\nconsole.log(range(10, 50, 10)); // [10, 20, 30, 40]"}</pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: THINKING & ARCHITECTURAL CHALLENGE ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-indigo-950/20 border border-indigo-800/40 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold text-indigo-300 mb-3 flex items-center gap-2">
              <span>🤔</span> Architectural Mental Challenge: Think About This...
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
              {"What happens when you execute `const a = []; a[2] = 'x'; console.log(a.map(v =&gt; v));`?"}
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-indigo-900/50 text-xs sm:text-sm text-indigo-300 font-mono">
              💡 Hint: {"Array prototype methods like `map` skip empty unassigned slots entirely."}
            </div>
          </div>
        </section>

        {/* ─── SECTION 9: COMPREHENSIVE FAQ SECTION (25-30 ITEMS) ─────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={"Frequently Asked Questions · " + "Creating Arrays, Array Literals, Array.from(), Array.of() & Length Mechanics"}
            subtitle="Explore 25+ comprehensive questions from basic concepts to senior enterprise architecture"
            questions={questions}
          />
        </section>

        {/* ─── SECTION 10: PLAIN TEXT PRINTABLE STUDY NOTE ─────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title={"JavaScript Master Note · " + "Creating Arrays, Array Literals, Array.from(), Array.of() & Length Mechanics"}
            downloadFileName="002-002-topic0-note.txt"
          />
        </section>

        {/* ─── SECTION 11: TEACHER'S NOTE & MENTORSHIP ────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            note={"In my 27+ years of mentoring software engineers at Coder & AccoTax in Barrackpore, I have consistently seen that mastering " + "Creating Arrays, Array Literals, Array.from(), Array.of() & Length Mechanics" + " separates code monkeys from genuine software engineers. " + "Array allocation in V8 is all about element kinds (PACKED vs HOLEY). Write clean literal code to keep your arrays in high-performance continuous memory."}
          />
        </section>

      </div>
    </>
  );
}
