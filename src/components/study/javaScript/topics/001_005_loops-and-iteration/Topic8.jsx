import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";
import demoCode from "./topic8_files/ForofVsForinVsForeachVsTraditionalForLoopsDemo.js?raw";

/**
 * Topic8 – for...of vs for...in vs forEach vs Traditional for Loops
 * Module: 001_005_loops-and-iteration
 * Subject: JavaScript (Core Foundations, ES6+, Web APIs, Async JS, DOM & Ecosystem)
 * Educator: Sukanta Hui | Coder & AccoTax
 */
export default function Topic8() {
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
            <span>Module 001_005_loops-and-iteration · Topic 8</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-sky-300 tracking-tight leading-tight">
            {"for...of vs for...in vs forEach vs Traditional for Loops"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A comprehensive architectural comparison of JavaScript's four iteration paradigms. Master iterator protocols, enumerable prototype traversals, execution call stack mechanics, and asynchronous event loop behaviors.
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
              <span>💡</span> Detailed Discussion &amp; Conceptual Foundations
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-4">
              JavaScript has evolved through four major eras of loop design: from the raw imperative control of ES3's <code className="text-amber-300">for</code> and <code className="text-amber-300">for...in</code>, to ES5's functional <code className="text-amber-300">Array.prototype.forEach</code>, to modern ES6's declarative <code className="text-amber-300">for...of</code> with the native <code className="text-sky-300">Symbol.iterator</code> protocol. Selecting the wrong loop is one of the most common causes of silent data bugs, prototype pollution traps, and unhandled asynchronous race conditions in production systems.
            </p>

            <p className="text-slate-300 leading-relaxed mb-4">
              The fundamental mental model relies on answering three architectural questions: <strong>(1)</strong> Are you iterating over <em>values</em> (iterables) or <em>property names</em> (object keys)? <strong>(2)</strong> Do you require early termination control (<code className="text-emerald-400">break</code>, <code className="text-emerald-400">continue</code>, <code className="text-emerald-400">return</code>)? <strong>(3)</strong> Are you performing synchronous calculations or sequential <code className="text-sky-400">await</code> promise calls?
            </p>

            {/* Classroom Story with Realistic Technical Code */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-900/40 text-sm text-slate-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span>🏫</span>
                <span>Classroom Scenario (Barrackpore Lab):</span>
              </div>
              <p>
                During an intensive lab test, student <strong>Swadeep</strong> used <code className="text-rose-400">for...in</code> to sum student marks stored in an array: <code className="text-slate-200">let total = 0; for (let i in marks) &#123; total += marks[i + 1]; &#125;</code>.
              </p>
              <p>
                The program produced completely unexpected results because <code className="text-amber-300">for...in</code> returns index keys as <strong>Strings</strong>, converting <code className="text-rose-300">'0' + 1</code> into <code className="text-rose-300">'01'</code> (undefined array access)! Additionally, a third-party prototype polyfill was enumerated as a property. Mentor <strong>Sukanta Hui</strong> demonstrated on the whiteboard why <code className="text-emerald-400">for...of</code> and index-based <code className="text-emerald-400">for</code> loops eliminate these pitfalls completely.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: BESPOKE RUNTIME ARCHITECTURE SVG DIAGRAM ────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
              <span>📊</span> Runtime Architecture &amp; Execution Pipeline Diagram
            </h2>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 880 340" className="w-full h-auto" role="img" aria-label="Comparison of 4 JavaScript Loop Execution Architectures">
                <defs>
                  <linearGradient id="forGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="forOfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="forInGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#b45309" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="forEachGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#be185d" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                <rect width="880" height="340" rx="16" fill="#0b1120" stroke="#1e293b" strokeWidth="1.5" />
                <text x="440" y="30" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">
                  JavaScript Loop Paradigms · Execution Mechanics &amp; Memory Access Paths
                </text>

                {/* ─── COLUMN 1: Traditional For ─── */}
                <g transform="translate(20, 50)">
                  <rect width="195" height="265" rx="10" fill="url(#forGrad)" stroke="#38bdf8" strokeWidth="1.2" />
                  <text x="97" y="24" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">1. Traditional for</text>
                  <text x="97" y="40" fill="#94a3b8" fontSize="10" textAnchor="middle">Raw Index / CPU Register</text>
                  
                  {/* Pipeline Step 1 */}
                  <rect x="12" y="55" width="171" height="42" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="20" y="72" fill="#7dd3fc" fontSize="10" fontWeight="bold">let i = 0 (Counter)</text>
                  <text x="20" y="88" fill="#94a3b8" fontSize="9">Direct Register Binding</text>
                  
                  {/* Pipeline Step 2 */}
                  <rect x="12" y="105" width="171" height="48" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="20" y="122" fill="#e2e8f0" fontSize="10">arr[i] Direct Lookup</text>
                  <text x="20" y="138" fill="#34d399" fontSize="9">Fast SMI Array Packing</text>
                  
                  {/* Pipeline Step 3 */}
                  <rect x="12" y="161" width="171" height="52" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="20" y="178" fill="#fbbf24" fontSize="10">Flow: break / continue</text>
                  <text x="20" y="195" fill="#94a3b8" fontSize="9">Full Native Control</text>

                  {/* Summary Tag */}
                  <rect x="12" y="222" width="171" height="32" rx="6" fill="#0369a1" fillOpacity="0.4" />
                  <text x="97" y="242" fill="#bae6fd" fontSize="10" fontWeight="bold" textAnchor="middle">⚡ Highest Raw Speed</text>
                </g>

                {/* ─── COLUMN 2: for...of ─── */}
                <g transform="translate(230, 50)">
                  <rect width="195" height="265" rx="10" fill="url(#forOfGrad)" stroke="#10b981" strokeWidth="1.2" />
                  <text x="97" y="24" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">2. for...of</text>
                  <text x="97" y="40" fill="#94a3b8" fontSize="10" textAnchor="middle">ES6 Iterator Protocol</text>
                  
                  {/* Pipeline Step 1 */}
                  <rect x="12" y="55" width="171" height="42" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="20" y="72" fill="#6ee7b7" fontSize="10" fontWeight="bold">[Symbol.iterator]()</text>
                  <text x="20" y="88" fill="#94a3b8" fontSize="9">Acquires Iterator Object</text>
                  
                  {/* Pipeline Step 2 */}
                  <rect x="12" y="105" width="171" height="48" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="20" y="122" fill="#e2e8f0" fontSize="10">iterator.next()</text>
                  <text x="20" y="138" fill="#6ee7b7" fontSize="9">Extracts &#123; value, done &#125;</text>
                  
                  {/* Pipeline Step 3 */}
                  <rect x="12" y="161" width="171" height="52" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="20" y="178" fill="#fbbf24" fontSize="10">Flow: break + await</text>
                  <text x="20" y="195" fill="#94a3b8" fontSize="9">Auto iterator.return()</text>

                  {/* Summary Tag */}
                  <rect x="12" y="222" width="171" height="32" rx="6" fill="#047857" fillOpacity="0.4" />
                  <text x="97" y="242" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">✓ Best for Collections &amp; Async</text>
                </g>

                {/* ─── COLUMN 3: for...in ─── */}
                <g transform="translate(440, 50)">
                  <rect width="195" height="265" rx="10" fill="url(#forInGrad)" stroke="#f59e0b" strokeWidth="1.2" />
                  <text x="97" y="24" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">3. for...in</text>
                  <text x="97" y="40" fill="#94a3b8" fontSize="10" textAnchor="middle">Object Property Key Walker</text>
                  
                  {/* Pipeline Step 1 */}
                  <rect x="12" y="55" width="171" height="42" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="20" y="72" fill="#fcd34d" fontSize="10" fontWeight="bold">Key Enumeration</text>
                  <text x="20" y="88" fill="#f87171" fontSize="9">Yields Strings (e.g. "0")</text>
                  
                  {/* Pipeline Step 2 */}
                  <rect x="12" y="105" width="171" height="48" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="20" y="122" fill="#e2e8f0" fontSize="10">Walks [[Prototype]]</text>
                  <text x="20" y="138" fill="#f87171" fontSize="9">Visits Inherited Properties</text>
                  
                  {/* Pipeline Step 3 */}
                  <rect x="12" y="161" width="171" height="52" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="20" y="178" fill="#fbbf24" fontSize="10">Requires Safety Guard</text>
                  <text x="20" y="195" fill="#cbd5e1" fontSize="9">Object.hasOwn(obj, key)</text>

                  {/* Summary Tag */}
                  <rect x="12" y="222" width="171" height="32" rx="6" fill="#b45309" fillOpacity="0.4" />
                  <text x="97" y="242" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">⚠️ Plain Objects Only</text>
                </g>

                {/* ─── COLUMN 4: forEach ─── */}
                <g transform="translate(650, 50)">
                  <rect width="205" height="265" rx="10" fill="url(#forEachGrad)" stroke="#ec4899" strokeWidth="1.2" />
                  <text x="102" y="24" fill="#f472b6" fontSize="12" fontWeight="bold" textAnchor="middle">4. Array.forEach</text>
                  <text x="102" y="40" fill="#94a3b8" fontSize="10" textAnchor="middle">Functional Callback Model</text>
                  
                  {/* Pipeline Step 1 */}
                  <rect x="12" y="55" width="181" height="42" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="20" y="72" fill="#f472b6" fontSize="10" fontWeight="bold">Callback Invocation</text>
                  <text x="20" y="88" fill="#94a3b8" fontSize="9">New Stack Frame Per Item</text>
                  
                  {/* Pipeline Step 2 */}
                  <rect x="12" y="105" width="181" height="48" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="20" y="122" fill="#e2e8f0" fontSize="10">(val, idx, arr) Params</text>
                  <text x="20" y="138" fill="#f472b6" fontSize="9">Skips Holes (Sparse)</text>
                  
                  {/* Pipeline Step 3 */}
                  <rect x="12" y="161" width="181" height="52" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="20" y="178" fill="#f87171" fontSize="10">No break / continue!</text>
                  <text x="20" y="195" fill="#f87171" fontSize="9">Async executes concurrently</text>

                  {/* Summary Tag */}
                  <rect x="12" y="222" width="181" height="32" rx="6" fill="#be185d" fillOpacity="0.4" />
                  <text x="102" y="242" fill="#fbcfe8" fontSize="10" fontWeight="bold" textAnchor="middle">⚙️ Simple In-Line Actions</text>
                </g>
              </svg>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Figure 8.1: Architectural execution pipeline, iterator protocols, prototype traversal, and call stack mechanics across all 4 loop types.
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
              The ECMAScript specification dictates strict invariants for each loop construct. Understanding these runtime differences guarantees optimal CPU cache utilization, avoids prototype pollution, and prevents memory leaks.
            </p>

            {/* Comprehensive Comparison Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm text-slate-300 border-collapse border border-slate-800">
                <thead className="bg-slate-900/90 text-amber-300 uppercase text-xs font-mono">
                  <tr>
                    <th className="p-3 border border-slate-800">Loop Paradigm</th>
                    <th className="p-3 border border-slate-800">Target Type</th>
                    <th className="p-3 border border-slate-800">Yielded Output</th>
                    <th className="p-3 border border-slate-800">break / continue</th>
                    <th className="p-3 border border-slate-800">Async / Await</th>
                    <th className="p-3 border border-slate-800">V8 Performance Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-xs">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-mono font-bold text-sky-400">Traditional for</td>
                    <td className="p-3">Arrays, Strings, Buffers</td>
                    <td className="p-3">Manual via index <code className="text-amber-300">arr[i]</code></td>
                    <td className="p-3 text-emerald-400 font-semibold">✓ Supported (Native)</td>
                    <td className="p-3 text-emerald-400 font-semibold">✓ Sequential</td>
                    <td className="p-3 text-slate-300">Fastest (Direct SMI Registers)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-mono font-bold text-emerald-400">for...of</td>
                    <td className="p-3">All Iterables (Array, Map, Set, Gen)</td>
                    <td className="p-3">Element Values directly</td>
                    <td className="p-3 text-emerald-400 font-semibold">✓ Supported (Auto cleanup)</td>
                    <td className="p-3 text-emerald-400 font-semibold">✓ Sequential (<code className="text-sky-300">for await</code>)</td>
                    <td className="p-3 text-slate-300">High (Optimized Iterator inline)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-mono font-bold text-amber-400">for...in</td>
                    <td className="p-3">Plain Objects</td>
                    <td className="p-3">Property Keys (Strings)</td>
                    <td className="p-3 text-emerald-400 font-semibold">✓ Supported</td>
                    <td className="p-3 text-emerald-400 font-semibold">✓ Sequential</td>
                    <td className="p-3 text-rose-400">Slow (Prototype Chain Walker)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-mono font-bold text-pink-400">Array.forEach</td>
                    <td className="p-3">Arrays Only</td>
                    <td className="p-3">Value, Index, Array Reference</td>
                    <td className="p-3 text-rose-400 font-semibold">❌ Not Supported (Throws)</td>
                    <td className="p-3 text-rose-400 font-semibold">❌ Fire &amp; Forget (Concurrent)</td>
                    <td className="p-3 text-slate-300">Moderate (Stack Frame Per Item)</td>
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
                <li><strong className="text-rose-300">TypeError: obj is not iterable:</strong> Thrown when <code className="text-amber-300">for...of</code> is used directly on a plain object <code className="text-slate-300">&#123; a: 1 &#125;</code>. Plain objects do not implement <code className="text-sky-300">[Symbol.iterator]</code> by default. Fix with <code className="text-emerald-400">Object.entries(obj)</code>.</li>
                <li><strong className="text-amber-300">The Array for...in String Concatenation Trap:</strong> In <code className="text-amber-300">for (const i in arr)</code>, <code className="text-slate-200">typeof i</code> is always <code className="text-amber-300">'string'</code>. Evaluating <code className="text-rose-300">i + 1</code> yields <code className="text-rose-300">'01'</code> instead of arithmetic <code className="text-emerald-300">1</code>!</li>
                <li><strong className="text-sky-300">Sparse Array Holes:</strong> <code className="text-emerald-300">for...of</code> visits missing slots in <code className="text-slate-300">[1, , 3]</code> yielding <code className="text-slate-300">undefined</code>, whereas <code className="text-pink-400">forEach</code> and <code className="text-amber-400">for...in</code> silently skip the holes.</li>
                <li><strong className="text-purple-300">Async forEach Trap:</strong> <code className="text-slate-300">items.forEach(async (x) =&gt; await save(x))</code> does NOT pause outer execution. The outer function returns immediately while all async requests trigger in parallel.</li>
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
              title="ForofVsForinVsForeachVsTraditionalForLoopsDemo.js"
            />
          </div>
        </section>

        {/* ─── SECTION 6: COMMON PITFALLS & SENIOR BEST PRACTICES ─────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-rose-400 flex items-center gap-2">
            <span>⚖️</span> Common Pitfalls vs Senior Best Practices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pitfall 1 */}
            <div className="bg-rose-950/20 border border-rose-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <span>❌</span>
                <span>Anti-Pattern: for...in on Arrays</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Iterating an array with <code className="text-rose-300">for...in</code> visits non-numeric properties, inherited prototype methods, and returns indices as strings.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-rose-900/50 text-xs font-mono text-rose-300 overflow-x-auto">
{`// ❌ AVOID:
for (const i in scores) {
  total += scores[i + 1]; // "0" + 1 = "01" -&gt; Bug!
}`}
              </pre>
            </div>

            {/* Best Practice 1 */}
            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>✓</span>
                <span>Senior Best Practice: for...of with entries()</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Use <code className="text-emerald-300">for...of</code> for direct values, or destructure <code className="text-emerald-300">arr.entries()</code> when you need numeric indices.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 text-xs font-mono text-emerald-300 overflow-x-auto">
{`// ✓ RECOMMENDED:
for (const [idx, score] of scores.entries()) {
  console.log(idx + 1, score); // Numeric idx!
}`}
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="bg-rose-950/20 border border-rose-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <span>❌</span>
                <span>Anti-Pattern: Async Callbacks in forEach</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Passing an async function to <code className="text-rose-300">forEach</code> creates an un-awaited fire-and-forget loop that breaks sequential ordering.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-rose-900/50 text-xs font-mono text-rose-300 overflow-x-auto">
{`// ❌ AVOID: Outer function continues immediately
users.forEach(async (u) => {
  await sendEmail(u);
});`}
              </pre>
            </div>

            {/* Best Practice 2 */}
            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>✓</span>
                <span>Senior Best Practice: for...of for Async Flow</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <code className="text-emerald-300">for...of</code> natively suspends execution on each iteration until the promise resolves cleanly.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 text-xs font-mono text-emerald-300 overflow-x-auto">
{`// ✓ RECOMMENDED: Strict sequential flow
for (const user of users) {
  await sendEmail(user);
}`}
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
                  Asynchronous Streaming with for await...of &amp; Symbol.asyncIterator
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              When processing gigabyte-scale datasets, HTTP response streams, or WebSocket event buffers in Node.js and modern browsers, senior architects use <code className="text-amber-300">for await...of</code>. It consumes async iterables with built-in backpressure, pausing the producer stream until the current loop iteration finishes processing.
            </p>

            <div className="rounded-xl border border-amber-900/50 bg-slate-950 p-4 font-mono text-xs text-amber-200 overflow-x-auto">
              <pre>{`// 💎 SENIOR SECRET: High-Performance Async Generator with Backpressure
async function* fetchChunkStream(urls) {
  for (const url of urls) {
    const res = await fetch(url);
    yield await res.json(); // Pauses until consumed!
  }
}

// Seamlessly consumed with for await...of
for await (const chunk of fetchChunkStream(apiUrls)) {
  processPayload(chunk);
}`}</pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: THINKING & ARCHITECTURAL CHALLENGE ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <div className="bg-indigo-950/20 border border-indigo-800/40 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold text-indigo-300 mb-3 flex items-center gap-2">
              <span>🤔</span> Architectural Mental Challenge: Short-Circuiting Functional Loops
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
              Since <code className="text-indigo-300">Array.prototype.forEach</code> does not support <code className="text-amber-300">break</code>, how can you write a functional array iteration pipeline that cleanly terminates as soon as a target condition is met without throwing artificial errors?
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-indigo-900/50 text-xs sm:text-sm text-indigo-300 font-mono">
              💡 Hint: Replace <code className="text-amber-300">forEach</code> with <code className="text-emerald-400">Array.prototype.some()</code> (which stops immediately when returning <code className="text-emerald-400">true</code>) or <code className="text-emerald-400">Array.prototype.every()</code> (which stops when returning <code className="text-rose-400">false</code>).
            </div>
          </div>
        </section>

        {/* ─── SECTION 9: COMPREHENSIVE FAQ SECTION (25 ITEMS) ────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={"Frequently Asked Questions · for...of vs for...in vs forEach vs Traditional for"}
            subtitle="Explore 25 comprehensive questions covering iterator protocols, prototype chains, and engine optimizations"
            questions={questions}
          />
        </section>

        {/* ─── SECTION 10: PLAIN TEXT PRINTABLE STUDY NOTE ─────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title={"JavaScript Master Note · Loop Paradigms Comparison"}
            downloadFileName="001_005_loops-and-iteration-topic8-note.txt"
          />
        </section>

        {/* ─── SECTION 11: TEACHER'S NOTE & MENTORSHIP ────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <Teacher
            note={"In my 27+ years of training software engineers at Coder & AccoTax in Barrackpore, I have seen more bugs caused by mixing up 'for...in' and 'for...of' than almost any other fundamental concept. Remember the golden rule: 'for...of' for values and collections; 'for...in' strictly for object keys with Object.hasOwn; and traditional 'for' when raw microsecond performance is critical."}
          />
        </section>

      </div>
    </>
  );
}
